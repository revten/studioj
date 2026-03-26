import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function seedProducts() {
  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    
    console.log('Syncing products...');
    const existingDocs = snapshot.docs.map(d => ({ id: d.id, name: d.data().name }));
    
    for (const product of mockProducts) {
      const existing = existingDocs.find(d => d.name === product.name);
      const { id, ...productData } = product;
      
      if (existing) {
        // Update existing product to ensure images are fresh
        try {
          await updateDoc(doc(db, 'products', existing.id), productData);
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `products/${existing.id}`);
        }
      } else {
        // Add new product
        try {
          await addDoc(productsCol, productData);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, 'products');
        }
      }
    }
    console.log('Sync complete.');
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      console.log('Skipping product sync: Insufficient permissions (admin only).');
    } else {
      console.error('Error syncing products:', error);
    }
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    if (snapshot.empty) return mockProducts;
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'products');
    return mockProducts;
  }
}

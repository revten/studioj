# STUDIO J. - Implementation Plan

## Phase 1: Architecture & Documentation (Planning Mode)
- [x] Create `DESIGN.md` for design system tokens and component tree.
- [x] Create `implementation_plan.md` (This file).
- [ ] Add standard docstrings to all existing components to enforce Anti-Monolith strictness.

## Phase 2: Home Page Refinement (Scrollytelling)
- [ ] Upgrade Hero section to strict 100vh with absolute transparent Navbar overlay.
- [ ] Enhance scroll-triggered animations (Framer Motion) for text and Lookbook galleries to create a true 'Scrollytelling' experience.

## Phase 3: Shop Page Redesign (Bento Grid)
- [ ] Refactor `/shop` layout from a standard grid to an asymmetric 'Bento Grid'.
- [ ] Implement smooth cross-fade image transitions on product thumbnail hover.
- [ ] Create a minimalist, dropdown-style category filter UI.

## Phase 4: Product Detail Page (PDP) Optimization
- [ ] Left Column: Implement a massive floating image gallery with mouse zoom functionality.
- [ ] Right Column: Implement a sticky layout for product title, price, and add-to-cart actions.
- [ ] Refactor product details (fabric, care, fit) into a sleek Accordion UI.
- [ ] Add a 'Complete the Look' cross-selling slider at the bottom.

## Phase 5: Shopping Experience & Auth Flow
- [ ] Polish the existing Slide-out Cart Drawer with enhanced animations and typography.
- [ ] Implement a sleek Auth Modal overlay for login/signup to prevent flow disruption (integrating with existing Firebase Auth).

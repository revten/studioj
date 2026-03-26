import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      let displayMessage = error?.message || "An unexpected error occurred.";
      try {
        if (error?.message) {
          const parsed = JSON.parse(error.message);
          if (parsed.error) {
            displayMessage = parsed.error;
          }
        }
      } catch (e) {
        // Not JSON, use original message
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-white">
          <div className="max-w-md w-full space-y-6 text-center">
            <h1 className="text-4xl font-serif tracking-tight">Something went wrong.</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
            </p>
            {error && (
              <pre className="text-[10px] bg-gray-50 p-4 rounded overflow-auto text-left max-h-40 custom-scrollbar">
                {displayMessage}
              </pre>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="inline-block bg-black text-white px-8 py-3 text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-gray-900 transition-colors rounded-full"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

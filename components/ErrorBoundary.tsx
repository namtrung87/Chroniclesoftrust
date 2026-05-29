import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
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

    private handleReset = () => {
        localStorage.removeItem('ethical_archivist_v2_storage');
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950 p-6">
                    <div className="max-w-xl w-full bg-slate-900 border border-red-500/30 rounded-[3rem] p-12 text-center space-y-8 shadow-[0_0_100px_rgba(239,68,68,0.1)]">
                        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto">
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Temporal Crash Detected</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                The simulation has encountered a critical logic error. This could be due to a malformed save state or a transition failure.
                            </p>
                            {this.state.error && (
                                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-left overflow-auto max-h-32">
                                    <code className="text-[10px] text-red-400 font-mono italic">
                                        {this.state.error.message}
                                    </code>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="w-full py-5 bg-red-500 hover:bg-red-400 text-slate-950 rounded-2xl mono text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-red-500/20 flex items-center justify-center gap-3"
                        >
                            <RefreshCw className="w-4 h-4" /> Reset_Neural_Link
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

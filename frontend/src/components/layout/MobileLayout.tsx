import { ReactNode } from 'react';

interface MobileLayoutProps {
    children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-900 flex justify-center items-center overflow-hidden">
            <div className="w-full max-w-[480px] h-[100dvh] bg-white shadow-2xl relative flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
};

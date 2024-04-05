export default function ContentWrapper({ children } : { children: React.ReactNode }) : JSX.Element {
    return (
        <div className="h-screen">
            {children}
        </div>
    );
}
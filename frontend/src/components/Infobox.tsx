import { ReactNode } from "react"

interface InfoBoxProps {
    children: ReactNode
    className?: string
}

export default function InfoBox({ children, className }: InfoBoxProps): JSX.Element {
    return (
        <div className={`${className} border-2 border-slate-900`}>
            {children}
        </div>
    )
}
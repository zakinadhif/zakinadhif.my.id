export default function Content({ children }) {
    return (
        <div className="flex flex-col min-h-full pt-12 pb-24 md:pt-16 relative">
            {children}
        </div>
    )
}

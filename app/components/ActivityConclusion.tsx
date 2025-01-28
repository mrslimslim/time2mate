interface ActivityConclusionProps {
    status: "optimal" | "moderate" | "poor";
    message: string;
}

export default function ActivityConclusion({ status, message }: ActivityConclusionProps) {
    const getStatusStyle = () => {
        switch (status) {
            case "optimal":
                return {
                    classes: "bg-blue-500/10 border-blue-500/20 text-blue-400",
                    emoji: "🌟",
                };
            case "moderate":
                return {
                    classes: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                    emoji: "⭐",
                };
            case "poor":
                return {
                    classes: "bg-gray-500/10 border-gray-500/20 text-gray-400",
                    emoji: "💤",
                };
        }
    };

    const style = getStatusStyle();

    return (
        <div className={`p-4 rounded-lg border ${style.classes} text-center`}>
            <div className="text-2xl mb-2">{style.emoji}</div>
            <p className="text-sm">{message}</p>
        </div>
    );
} 
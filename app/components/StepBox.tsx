interface StepProps {
    Step: string;
    text: string;
}

export default function StepCards({ Step, text} : StepProps) {
    return (
        <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mb-3">
            {Step}
        </div>
        <span className="font-medium text-slate-900">{text}</span>
    </div>
    )
}
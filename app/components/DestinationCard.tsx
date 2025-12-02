export default function DestinationCard({
  img,
  name,
  tag,
  onClick,
}: {
  img: string;
  name: string;
  tag: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-900/50 px-2 py-1 rounded backdrop-blur-sm">
          {tag}
        </span>
        <h4 className="text-white font-bold text-lg mt-1">{name}</h4>
      </div>
    </div>
  );
}

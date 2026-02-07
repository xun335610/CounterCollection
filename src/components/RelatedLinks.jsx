
import { Link } from "react-router-dom";

export default function RelatedLinks({ links }) {
  return (
    <div className="mt-10 rounded-xl border p-4">
      <h3 className="font-semibold mb-2">Related guides & next steps</h3>
      <ul className="list-disc pl-5 space-y-1">
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className="text-blue-600 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

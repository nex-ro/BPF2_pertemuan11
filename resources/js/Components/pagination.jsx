import { Link} from "@inertiajs/react";
export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map(link => (
                <Link
                    key={link.label} // Add key prop
                    preserveScroll
                    href={link.url || '#'} // Provide a default href value if link.url is undefined
                    className={`inline-block py-2 px-3 rounded-lg text-gray-200 text-xs ${link.active ? 'bg-gray-950' : ''} ${!link.url ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-gray-950'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }} // Use __html property
                ></Link>
            ))}
        </nav>
    );
}

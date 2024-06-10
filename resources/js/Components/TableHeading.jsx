import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function TableHeading({
  name,
  sortable = true,
  sortField = null,
  sortDirection = null,
  sortChanged=()=>{},
  children
}) {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon className={`
              w-4
              ${sortField === name && sortDirection === 'asc' ? 'text-white' : ''}
            `} />
            <ChevronDownIcon className={`
              w-4 mt-2
              ${sortField === name && sortDirection === 'desc' ? 'text-white' : ''}
            `} />
          </div>
        )}
      </div>
    </th>
  );
}

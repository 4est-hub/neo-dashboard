import { useState, useMemo } from 'react';

// move to utils
const capitalize = (str: string) =>
  str
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

type SortOrder = 'asc' | 'desc';

type SortableListProps<T extends Record<string, any>> = {
  items: T[];
  labelKey: keyof T;          
  sortableKeys: (keyof T)[];
};

export default function SortableList<T extends Record<string, any>>({
  items,
  labelKey,
  sortableKeys,
}: SortableListProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T>(sortableKeys[0]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = parseFloat(String(a[sortKey]));
      const bValue = parseFloat(String(b[sortKey]));

      if (isNaN(aValue) || isNaN(bValue)) return 0;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortKey, sortOrder]);

  return (
    <section className="sortable-list">
      <div className="header">
        <div>{capitalize(String(labelKey))}</div>
        {sortableKeys.map((key) => (
          <button key={key as string} onClick={() => toggleSort(key)}>
            {capitalize(String(key))}
            {sortKey === key ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}
          </button>
        ))}
      </div>

      <ul className="items">
        {sortedItems.map((item, index) => (
          <li key={index}>
            <div>{item[labelKey]}</div>
            {sortableKeys.map((key) => (
              <div key={key as string}>{item[key]}</div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

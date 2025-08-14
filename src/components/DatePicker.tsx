import { useState } from 'react';

type Props = {
  minDate?: string;
  onChange?: (date: string) => void;
}

export default function DatePicker({ minDate, onChange }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="date-picker">
      <label htmlFor="selected-date">Select A Date:</label>
      <input
        type="date"
        id="selected-date"
        name="trip-start"
        value={startDate}
        min={minDate || '2018-01-01'}
        max={today}
        onChange={handleChange}
      />
    </div>
  );
}

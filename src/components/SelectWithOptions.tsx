import { capitalizeAndAddSpace } from '@/helpers';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  data: string[];
  name: string;
  dataTestId: string;
  id: string;
};

export default function SelectWithOptions({
  value,
  onChange,
  data,
  name,
  dataTestId,
  id,
  ...otherProps
}: Props) {
  return (
    <select
      data-testid={dataTestId}
      className={id}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      {...otherProps}
    >
      {data.map((option: string) => (
        <option key={option} value={option}>
          {capitalizeAndAddSpace(option)}
        </option>
      ))}
    </select>
  );
}

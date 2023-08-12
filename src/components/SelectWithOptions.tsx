import PropTypes from 'prop-types';

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
          {option.replace('_', ' ').replace(/^./, (char: string) => char.toUpperCase())}
        </option>
      ))}
    </select>
  );
}

SelectWithOptions.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
};

SelectWithOptions.defaultProps = {
  className: null,
  dataTestId: null,
  value: '',
};

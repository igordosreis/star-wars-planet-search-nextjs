import { useEffect } from 'react';

import useGlobalState from '@/react-query/useGlobalState';
import { capitalizeAndAddSpace } from '@/helpers';
import FilterArguments from '@/interfaces/FilterArguments';

import SelectWithOptions from './SelectWithOptions';

const COLUMN_OPTIONS = [
  'population',
  'orbital_period',
  'rotation_period',
  'diameter',
  'surface_water',
];

const COMPARISON_OPERATOR = ['greater than', 'less than', 'equal to'];

const NUMERIC_FILTERS = {
  column: 'population',
  comparison: 'greater than',
  numberValue: '',
};

const SORT_ORDER = {
  column: 'population',
  sort: 'ASC',
};

export default function FilterForm() {
  const [filterByName, setFilterByName] = useGlobalState('name', '');
  const [filterByNumericValues, setFilterByNumericValues] = useGlobalState(
    'numericValues',
    NUMERIC_FILTERS
  );
  const [numericFilterArguments, setNumericFilterArguments] = useGlobalState(
    'numericFilterArguments',
    []
  );
  const [order, setOrder] = useGlobalState('order', SORT_ORDER);
  const [_orderArguments, setOrderArguments] = useGlobalState('orderArguments', {});

  // Handling Functions
  const handleNameFilterInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => setFilterByName(value);

  const handleNumericFilterSelect = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>): void => {
    const valueIsNotANumber = !Number(value);
    if (name === 'numberValue' && valueIsNotANumber) return;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  const handleAddFilterButtonClick = (): void => {
    const updatedFilterArguments = [
      ...numericFilterArguments,
      filterByNumericValues,
    ];
    setNumericFilterArguments(updatedFilterArguments);
  };

  const handleRemoveFilterButtonClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const updatedFilterArguments = numericFilterArguments.filter(
      ({ column }: FilterArguments) =>
        column !== currentTarget.getAttribute('data-filter')
    );
    setNumericFilterArguments(updatedFilterArguments);
  };

  const handleRemoveAllFiltersButtonClick = (): void =>
    setNumericFilterArguments([]);

  const handleSortSelectAndRadio = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) =>
    setOrder({
      ...order,
      [name]: value,
    });

  const handleSortButtonClick = (): void => setOrderArguments(order);

  // Rendering Functions
  const availableOptions = (): string[] => {
    const optionsInUse = numericFilterArguments.map(
      ({ column }: FilterArguments) => column
    );
    const remainingOptions = COLUMN_OPTIONS.filter(
      (option) => !optionsInUse.includes(option)
    );
    return remainingOptions;
  };

  const currentOptions = availableOptions();

  const renderCurrentFilters = (): JSX.Element => (
    <div>
      {numericFilterArguments.map(
        ({ column, comparison, numberValue }: FilterArguments) => (
          <div data-testid="filter" key={column}>
            <span>{`${capitalizeAndAddSpace(
              column
            )} ${comparison} ${numberValue}`}</span>
            <button
              type="button"
              data-filter={column}
              onClick={handleRemoveFilterButtonClick}
            >
              X
            </button>
          </div>
        )
      )}
    </div>
  );

  // On props update Functions
  useEffect(() => {
    setFilterByNumericValues({
      comparison: 'greater than',
      column: currentOptions[0],
      numberValue: '',
    });
  }, [numericFilterArguments]);

  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        name="name"
        value={filterByName}
        onChange={handleNameFilterInput}
      />
      <SelectWithOptions
        dataTestId="column-filter"
        id="column"
        name="column"
        value={filterByNumericValues.column}
        onChange={handleNumericFilterSelect}
        data={currentOptions}
      />
      <SelectWithOptions
        dataTestId="comparison-filter"
        id="comparison"
        name="comparison"
        value={filterByNumericValues.comparison}
        onChange={handleNumericFilterSelect}
        data={COMPARISON_OPERATOR}
      />
      <input
        data-testid="value-filter"
        type="number"
        name="numberValue"
        value={filterByNumericValues.numberValue}
        onChange={handleNumericFilterSelect}
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={handleAddFilterButtonClick}
      >
        Add filter
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={handleRemoveAllFiltersButtonClick}
      >
        Remove filters
      </button>
      <SelectWithOptions
        dataTestId="column-sort"
        id="column"
        name="column"
        value={order.column}
        onChange={handleSortSelectAndRadio}
        data={COLUMN_OPTIONS}
      />
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        name="sort"
        id="sort-asc"
        checked={order.sort === 'ASC'}
        value="ASC"
        onChange={handleSortSelectAndRadio}
      />
      <label htmlFor="sort-asc">Ascending</label>
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort"
        id="sort-dsc"
        checked={order.sort === 'DSC'}
        value="DSC"
        onChange={handleSortSelectAndRadio}
      />
      <label htmlFor="sort-dsc">Descending</label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={handleSortButtonClick}
      >
        Order
      </button>
      {renderCurrentFilters()}
    </form>
  );
}

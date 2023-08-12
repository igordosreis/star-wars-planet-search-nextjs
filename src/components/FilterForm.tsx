import { useEffect } from 'react';

import useGlobalState from '@/react-query/useGlobalState';
import { capitalizeAndAddSpace } from '@/helpers';

import SelectWithOptions from './SelectWithOptions';

// type Target = {
//   target: {
//     name: string;
//     value: string;
//   };
// };

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
  value: 0,
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
  const handleNameFilterInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilterByName(event.target.value);
  // const handleNameFilterInput = ({
  //   target: { value },
  // }: {
  //   target: EventTargetWithValue;
  //   value: string;
  // }) => setFilterByName(value);

  const handleNumericFilterSelect = (
    event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ) =>
    setFilterByNumericValues({
      ...filterByNumericValues,
      [event.target.name]: event.target.value,
    });
  // const handleNumericFilterSelect = ({
  //   target: { name, value },
  // }: Target) =>
  //   setFilterByNumericValues({
  //     ...filterByNumericValues,
  //     [name]: value,
  //   });

  const handleAddFilterButtonClick = () => {
    const updatedFilterArguments = [
      ...numericFilterArguments,
      filterByNumericValues,
    ];
    setNumericFilterArguments(updatedFilterArguments);
  };

  const handleRemoveFilterButtonClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const updatedFilterArguments = numericFilterArguments.filter(
      ({ column }: { column: string }) =>
        column !== event.currentTarget.getAttribute('dataset-filter')
    );
    setNumericFilterArguments(updatedFilterArguments);
  };
  // const handleRemoveFilterButtonClick = ({
  //   target: {
  //     dataset: { filter },
  //   },
  // }: {
  //   target: EventTargetWithValue;
  //   filter: string;
  // }) => {
  //   const updatedFilterArguments = numericFilterArguments.filter(
  //     ({ column }: { column: string }) => column !== filter
  //   );
  //   setNumericFilterArguments(updatedFilterArguments);
  // };

  const handleRemoveAllFiltersButtonClick = () => setNumericFilterArguments([]);

  const handleSortSelectAndRadio = (
    event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ) =>
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  // const handleSortSelectAndRadio = ({
  //   target: { name, value },
  // }: {
  //   target: EventTargetWithValue;
  //   value: string;
  // }) =>
  //   setOrder({
  //     ...order,
  //     [name]: value,
  //   });

  const handleSortButtonClick = () => setOrderArguments(order);

  // Rendering Functions
  const currentOptions = () => {
    const optionsInUse = numericFilterArguments.map(
      ({ column }: { column: string }) => column
    );
    const remainingOptions = COLUMN_OPTIONS.filter(
      (option) => !optionsInUse.includes(option)
    );
    return remainingOptions;
  };

  const options = currentOptions();

  const renderCurrentFilters = () => (
    <div>
      {numericFilterArguments.map(
        ({
          column,
          comparison,
          value,
        }: {
          column: string;
          comparison: string;
          value: string;
        }) => (
          <div data-testid="filter" key={column}>
            <span>{`${capitalizeAndAddSpace(column)} ${comparison} ${value}`}</span>
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
      comparison: 'maior que',
      column: options[0],
      value: 0,
    });
  }, [numericFilterArguments]);

  return (
    <div>
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
        data={options}
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
        name="value"
        value={filterByNumericValues.value}
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
        id="sort"
        checked={order.sort === 'ASC'}
        value="ASC"
        onChange={handleSortSelectAndRadio}
      />
      Ascending
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort"
        id="sort"
        checked={order.sort === 'DSC'}
        value="DSC"
        onChange={handleSortSelectAndRadio}
      />
      Descending
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={handleSortButtonClick}
      >
        Order
      </button>
      {renderCurrentFilters()}
    </div>
  );
}

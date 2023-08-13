import { useContext, useEffect } from 'react';

import usePlanets from '@/services/usePlanets';
import useGlobalState from '@/react-query/useGlobalState';
import FilterArguments from '@/interfaces/FilterArguments';
import Planet from '@/interfaces/Planet';

export default function Table() {
  const [filterByName] = useGlobalState('name');
  const [numericFilterArguments] = useGlobalState('numericFilterArguments');
  const [orderArguments] = useGlobalState('orderArguments');

  console.info(numericFilterArguments);

  // onMount Functions
  const { data: planetsInfo } = usePlanets();

  // Rendering functions
  const filterPlanetsByNumericValues = (
    planetsAcc: Planet[],
    { column, comparison, value }: FilterArguments
  ) => {
    switch (comparison) {
      case 'maior que':
        return (planet: Planet) =>
          Number(planet[column as keyof Planet]) > Number(value);
      case 'menor que':
        return (planet: Planet) =>
          Number(planet[column as keyof Planet]) < Number(value);
      case 'igual a':
        return (planet: Planet) =>
          Number(planet[column as keyof Planet]) === Number(value);
      default:
        return planetsAcc;
    }
  };

  const filterPlanets = () => {
    const planetsFilteredByNumericValues = numericFilterArguments?.reduce(
      (planetsAcc: any, currentFilter: FilterArguments) =>
        planetsAcc.filter(filterPlanetsByNumericValues(planetsAcc, currentFilter)),
      planetsInfo
    );

    // const planetsFilteredByNumericValuesAndByName =
    //   planetsFilteredByNumericValues?.filter(({ name }: Planet['name']) =>
    //     name.toLowerCase().includes(filterByName.toLowerCase())
    //   );
    const planetsFilteredByNumericValuesAndByName =
      planetsFilteredByNumericValues?.filter((planet: Planet) =>
        planet.name.toLowerCase().includes(filterByName.toLowerCase())
      );

    return planetsFilteredByNumericValuesAndByName;
  };

  const sortPlanets = (filteredPlanets: Planet[]) => {
    const { column, sort } = orderArguments;

    const planetsWithUnknownValues = filteredPlanets?.filter(
      (planet: Planet) => planet[column as keyof Planet] === 'unknown'
    );
    const planetsWithoutUnknownValues = filteredPlanets?.filter(
      (planet: Planet) => planet[column as keyof Planet] !== 'unknown'
    );

    switch (sort) {
      case 'ASC':
        return [
          ...planetsWithoutUnknownValues.sort(
            (planetA: Planet, planetB: Planet) =>
              Number(planetA[column as keyof Planet]) -
              Number(planetB[column as keyof Planet])
          ),
          ...planetsWithUnknownValues,
        ];
      case 'DSC':
        return [
          ...planetsWithoutUnknownValues.sort(
            (planetA: Planet, planetB: Planet) =>
              Number(planetB[column as keyof Planet]) -
              Number(planetA[column as keyof Planet])
          ),
          ...planetsWithUnknownValues,
        ];
      default:
        return filteredPlanets;
    }
  };

  const filteredAndSortedPlanets: Planet[] = sortPlanets(filterPlanets()) || [];

  const renderTableHeaders = () => (
    <thead>
      <tr>
        {Object.keys(filteredAndSortedPlanets[0] || {}).map((header) => (
          <th key={header}>
            {header
              .replace(/_+/g, ' ')
              .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase())}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {filteredAndSortedPlanets.map((planet) => (
        <tr key={planet.name}>
          {Object.values(planet).map((info, index) =>
            index ? (
              <td key={info}>{info}</td>
            ) : (
              <td data-testid="planet-name" key={info}>
                {info}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table>
      {renderTableHeaders()}
      {renderTableBody()}
    </table>
  );
}

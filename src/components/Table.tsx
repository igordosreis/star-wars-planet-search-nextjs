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
  const filterPlanetsByNumericValues = ({
    column,
    comparison,
    numberValue,
  }: FilterArguments): ((planet: Planet) => boolean) => {
    switch (comparison) {
      case 'greater than':
        return (planet: Planet): boolean =>
          Number(planet[column as keyof Planet]) > Number(numberValue);
      case 'less than':
        return (planet: Planet): boolean =>
          Number(planet[column as keyof Planet]) < Number(numberValue);
      case 'equal to':
        return (planet: Planet): boolean =>
          Number(planet[column as keyof Planet]) === Number(numberValue);
      default:
        throw new Error(`Comparison error: ${comparison}`);
    }
  };

  const filterPlanets = (): Planet[] | [] => {
    const planetsFilteredByNumericValues = numericFilterArguments?.reduce(
      (planetsAcc: Planet[], currentFilter: FilterArguments) =>
        planetsAcc.filter(filterPlanetsByNumericValues(currentFilter)),
      planetsInfo
    );

    const planetsFilteredByNumericValuesAndByName =
      planetsFilteredByNumericValues?.filter(({ name }: Planet) =>
        name.toLowerCase().includes(filterByName.toLowerCase())
      );

    return planetsFilteredByNumericValuesAndByName;
  };

  const sortPlanets = (filteredPlanets: Planet[]): Planet[] => {
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

  const renderTableHeaders = (): JSX.Element => (
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

  const movieDecoder = (movieUrl: string): string => {
    switch (true) {
      case movieUrl.includes('/films/1/'):
        return 'Episode 4: A New Hope';
      case movieUrl.includes('/films/2/'):
        return 'Episode 5: The Empire Strikes Back';
      case movieUrl.includes('/films/3/'):
        return 'Episode 6: Return of the Jedi';
      case movieUrl.includes('/films/4/'):
        return 'Episode 1: The Phantom Menace';
      case movieUrl.includes('/films/5/'):
        return 'Episode 2: Attack of the Clones';
      case movieUrl.includes('/films/6/'):
        return 'Episode 3: Revenge of the Sith';
      default:
        return movieUrl;
    }
  };

  const renderTableBody = (): JSX.Element => (
    <tbody>
      {filteredAndSortedPlanets.map((planet) => (
        <tr key={planet.name}>
          {Object.values(planet).map((info, index) => {
            if (index === 0) {
              return (
                <td data-testid="planet-name" key={info}>
                  {info}
                </td>
              );
            }
            if (index === 6 || index === 5) {
              if (info.includes(',')) {
                const wordsArray = info.split(',');
                return (
                  <td key={info}>
                    {wordsArray.map((terrain: string) => (
                      <div key={terrain}>{terrain}</div>
                    ))}
                  </td>
                );
              }
              return <td key={info}>{info}</td>;
            }
            if (index === 9) {
              return (
                <td key={info}>
                  {info.map((movieUrl: string) => (
                    <div key={movieUrl}>{`${movieDecoder(movieUrl)}`}</div>
                  ))}
                </td>
              );
            }
            return <td key={info}>{info}</td>;
          })}
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

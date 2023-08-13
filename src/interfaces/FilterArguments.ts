import Planet from './Planet';
import ComparisonType from './Comparision';

interface FilterArguments {
  column: keyof Planet;
  comparison: ComparisonType;
  numberValue: number;
}

export default FilterArguments;

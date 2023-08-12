import usePlanets from '@/services/usePlanets';
import useGlobalState from '@/react-query/useGlobalState';

export default function Table() {
  const [_input, setInput] = useGlobalState('input', '');
  console.info(usePlanets().data);

  return <input type="text" onChange={({ target: { value } }) => setInput(value)} />;
}

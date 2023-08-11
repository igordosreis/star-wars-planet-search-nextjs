import useGlobalState from '@/react-query/useGlobalState';

export default function TestInput() {
  const [_input, setInput] = useGlobalState('input', '');

  return <input type="text" onChange={({ target: { value } }) => setInput(value)} />;
}

import useGlobalState from '@/react-query/useGlobalState';

export default function TestOutput() {
  const [input] = useGlobalState('input');

  return (
    <>
      <h2>{input}</h2>
    </>
  );
}

import Planet, { PlanetRaw } from '@/interfaces/Planet';

// type Obj = {
//   [key: string]: any;
// };

const deleteProperties = (arrOfObj: PlanetRaw[], arrOfStr: string[]): Planet[] =>
  arrOfObj.map((obj) =>
    Object.keys(obj).reduce(
      (accNewObj, currKey) =>
        arrOfStr.includes(currKey)
          ? accNewObj
          : { ...accNewObj, [currKey]: obj[currKey as keyof PlanetRaw] },
      {} as Planet
    )
  );

export default deleteProperties;

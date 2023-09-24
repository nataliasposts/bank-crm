import ReactItem from '../types/ReactItem';

const getReactItemsWithKey = <T extends ReactItem>(items: T[]): T[] => {
  if (!items) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    key: crypto.randomUUID()
  }));
};

export const addKeyToReactItem = <T extends ReactItem>(item: T): T => {
  return {
    ...item,
    key: crypto.randomUUID()
  };
};

export default getReactItemsWithKey;

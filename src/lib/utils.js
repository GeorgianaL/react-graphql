export const getThresholds = (arr = []) => {
  const orderedArr = arr.sort();
  return [orderedArr[0], orderedArr[Math.round([orderedArr.length / 2])], arr[orderedArr.length - 1]];
};

export const mapIDs = (arr, str) => arr.reduce((acc, item, index) => [...acc, {
  id: `${str}-${index}`,
  type: item,
  __typename: str,
}], []);

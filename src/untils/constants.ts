export const PAGE_SIZE = 2;

export const calculateOffset = (page: number): number => {
  return (page - 1) * PAGE_SIZE;
};

export const sortByCreatedAt = (a, b) => {
  if (a._createdAt < b._createdAt) {
    return -1;
  }
  if (a._createdAt > b._createdAt) {
    return 1;
  }
  return 0;
};

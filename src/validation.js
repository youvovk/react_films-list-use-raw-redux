export const required = (name, value) => {
  return value
    ? null
    : `Field ${name} is required`;
};

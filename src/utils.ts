import { format } from "date-fns";

export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return format(date, "yyyy-MM-dd");
};

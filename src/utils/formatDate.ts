import { format } from "date-fns";

export function formatDate(rawDate: string) {
  const date = new Date(rawDate);
  return format(date, 'MMM do, yyyy');
}

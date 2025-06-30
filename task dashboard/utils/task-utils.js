export function getSectionFromDate(dueDateStr) {
  const today = new Date();
  const dueDate = new Date(dueDateStr);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  //Check the date with reapective to current days, based on that, retiurn a value Today,Upcoming or Overdure, If the date is null or empty, return Backlog
  if (isNaN(dueDate)) return 'Backlog';
  if (dueDate.getTime() === today.getTime()) return 'Today';
  if (dueDate > today) return 'Upcoming';
  return 'Overdue';
}

export const createParsedDate = (date) => {
  const today = new Date(Date.now());
  let hours = date.getHours();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; //convert hours 13 - 24 to 1 - 12
  hours = hours ? hours : 12; //if hour 0, make it 12
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
  if (date.getDate() === today.getDate()) {
    const parsedDate = 'Today at ' + hours + ':' + minutes + ' ' + ampm;
    return parsedDate;
  } else {
    const parsedDate =
      date.toLocaleString('default', {
        month: 'long',
      }) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear() +
      ' - ' +
      hours +
      ':' +
      minutes +
      ' ' +
      ampm;
    return parsedDate;
  }
};

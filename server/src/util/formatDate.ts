export const formatDate = (
  givenDate: string,
  returnDay: boolean = false
): string => {
  const date = new Date(givenDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${
    returnDay ? day + '/' + month + '/' + year + ' ' : ''
  }${hours}:${minutes}`;
};

export const formatDuration = (duration: number): string => {
  let minutes = '00',
    seconds = '00';
  if (duration > 59) {
    const minuteRep = Math.floor(duration / 60);
    minutes = minuteRep > 9 ? `${minuteRep}` : `0${minuteRep}`;
    const secondRep = Math.floor(duration - minuteRep * 60);
    seconds = secondRep > 9 ? `${secondRep}` : `0${secondRep}`;
  } else {
    seconds = duration > 9 ? `${duration}` : `0${duration}`;
  }

  return `${minutes}:${seconds}`;
};

export const getAbbreviationsOfWordsList = (wordsList) => {
  const result = {};

  wordsList?.forEach((words) => {
    const wordArr = words.split(' ');
    const firstAbbr = wordArr[0];

    if (wordArr.length > 1) {
      const restAbbr = wordArr.slice(1).map((word) => word[0]);
      result[words] = `${firstAbbr} ${restAbbr.join('')}.`;
    } else {
      result[words] = firstAbbr;
    }
  });

  return result;
};

export const formatNumberWithCommas = (number) => {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

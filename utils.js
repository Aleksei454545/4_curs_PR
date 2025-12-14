
const random = (num) => Math.ceil(Math.random() * num);

function createClickCounter(limit, onChange) {
  let count = 0; 

  return function (buttonName) {
    if (count >= limit) {
      console.log(
        `Кнопка "${buttonName}" більше не активна! Ліміт ${limit} натискань.`
      );
      if (onChange) onChange(0);
      return false;
    }

    count++;
    const left = limit - count;

    console.log(
      `Кнопка "${buttonName}" натиснута ${count} раз(и). Залишилось: ${left}`
    );
    if (onChange) onChange(left);
    return true;
  };
}

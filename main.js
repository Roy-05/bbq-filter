const lower_limit = document.getElementById("lower_limit"),
  upper_limit = document.getElementById("upper_limit"),
  submit = document.getElementById("submit");

let upper_limit_val = 100,
  lower_limit_val = 0;

submit.addEventListener("click", () => {
  lower_limit_val = isValid(Number(lower_limit.value))
    ? Number(lower_limit.value)
    : 0;
  upper_limit_val = isValid(Number(upper_limit.value))
    ? Number(upper_limit.value)
    : 100;

  console.log(lower_limit_val, upper_limit_val);
});

function isValid(num) {
  return num >= 0 && num <= 100;
}

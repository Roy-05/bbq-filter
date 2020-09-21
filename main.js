const lower_limit = document.getElementById("lower_limit"),
  upper_limit = document.getElementById("upper_limit"),
  submit = document.getElementById("submit");

let upper_limit_val = 100,
  lower_limit_val = 0,
  data_verbal = [],
  data_quant = [];

$("#submit").click(() => {
  $("#problems_verbal").empty();
  $("#problems_quant").empty();
  data_verbal = [];
  data_quant = [];

  lower_limit_val = isValid(Number(lower_limit.value))
    ? Number(lower_limit.value)
    : 0;
  upper_limit_val = isValid(Number(upper_limit.value))
    ? Number(upper_limit.value)
    : 100;

  filterProblems(lower_limit_val, upper_limit_val);
});

function filterProblems(ll, ul) {
  $.getJSON("./assets/data.json", function (json) {
    let keys = Object.keys(json["verbal"]).map((x) => Number(x));
    for (key in keys) {
      if (key >= ll && key <= ul && json["verbal"][key] !== undefined) {
        json["verbal"][key].forEach((prob) =>
          data_verbal.push(`${prob}-${key}`)
        );
      }
    }

    keys = Object.keys(json["quant"]).map((x) => Number(x));
    for (key in keys) {
      if (key >= ll && key <= ul && json["quant"][key] !== undefined) {
        json["quant"][key].forEach((prob) => data_quant.push(`${prob}-${key}`));
      }
    }
    createTable();
  });
}

function createTable() {
  $("#problems_verbal").append(
    `
    <th>Questions from Verbal Sections:</th>
    <th>Difficulty (P+):</th>
    `
  );
  data_verbal.forEach((prob) => {
    prob_info = prob.split("-");
    $("#problems_verbal").append(
      `
      <tr>
        <td>Test ${prob_info[0]} Section ${prob_info[1]} Q. ${prob_info[2]}</td>
        <td>${prob_info[3]}</td>
      </tr>`
    );
  });

  $("#problems_quant").append(
    `
    <th>Questions from Quant Sections:</th>
    <th>Difficulty (P+):</th>
    `
  );
  data_quant.forEach((prob) => {
    prob_info = prob.split("-");
    $("#problems_quant").append(
      `
      <tr>
        <td>Test ${prob_info[0]} Section ${prob_info[1]} Q. ${prob_info[2]}</td>
        <td>${prob_info[3]}</td>
      </tr>`
    );
  });
}

function isValid(num) {
  return typeof num === "number" && num >= 0 && num <= 100;
}

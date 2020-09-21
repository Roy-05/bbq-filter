let upper_limit_val = 100,
  lower_limit_val = 0,
  data_verbal = [],
  data_quant = [];

$(document).ready(filterProblems(lower_limit_val, upper_limit_val));

$("#submit").click(() => {
  $(".row").empty();
  data_verbal = [];
  data_quant = [];

  lower_limit_val = isValid(Number($("#lower_limit").val()))
    ? Number($("#lower_limit").val())
    : 0;
  upper_limit_val = isValid(Number($("#upper_limit").val()))
    ? Number($("#upper_limit").val())
    : 100;

  filterProblems(lower_limit_val, upper_limit_val);
});

$("#quant_table_header").click(() => {
  let data_quant_copy = [...data_quant];
  data_quant_copy.sort();
  $(".row_quant").empty();

  createTable("quant", data_quant_copy);
});

$("#quant_diff_header").click(() => {
  $(".row_quant").empty();
  createTable("quant", data_quant);
});

$("#verbal_table_header").click(() => {
  let data_verbal_copy = [...data_verbal];
  data_verbal_copy.sort();
  $(".row_verbal").empty();

  createTable("verbal", data_verbal_copy);
});

$("#verbal_diff_header").click(() => {
  $(".row_verbal").empty();
  createTable("verbal", data_verbal);
});

function filterProblems(ll, ul) {
  $.getJSON("./assets/data1.json", function (json) {
    let keys = Object.keys(json["verbal"]).map((x) => Number(x));
    keys.forEach((key) => {
      if (key >= ll && key <= ul) {
        json["verbal"][key].forEach((prob) => {
          data_verbal.push(`${prob}-${key}`);
        });
      }
    });

    keys = Object.keys(json["quant"]).map((x) => Number(x));
    keys.forEach((key) => {
      if (key >= ll && key <= ul && json["quant"][key] !== undefined) {
        json["quant"][key].forEach((prob) => data_quant.push(`${prob}-${key}`));
      }
    });
    createTable("verbal", data_verbal);
    createTable("quant", data_quant);
  });
}

function createTable(table_type, data) {
  if (data.length === 0) {
    $(`#problems_${table_type}`).append(
      `
      <tr class="row row_${table_type}">
        <td>No Questions in the given range!</td>
      </tr>
      `
    );
  } else {
    data.forEach((prob) => {
      prob_info = prob.split("-");
      $(`#problems_${table_type}`).append(
        `
      <tr class="row row_${table_type}">
        <td>Test ${prob_info[0]} Section ${prob_info[1]} Q. ${prob_info[2]}</td>
        <td>${prob_info[3]}</td>
      </tr>`
      );
    });
  }
}

function isValid(num) {
  return typeof num === "number" && num >= 0 && num <= 100;
}

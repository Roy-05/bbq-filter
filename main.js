const lower_limit = document.getElementById("lower_limit"),
  upper_limit = document.getElementById("upper_limit");

let upper_limit_val = 100,
  lower_limit_val = 0,
  data_verbal = [],
  data_quant = [];

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
  console.log("fire");
  data_quant.sort();
  $(".row").empty();

  createTable();
});

function filterProblems(ll, ul) {
  $.getJSON("./assets/data_1.json", function (json) {
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
  if (data_verbal.length === 0) {
    $("#problems_verbal").append(
      `
      <tr class="row row_verbal">
        <td>No Questions in the given range!</td>
      </tr>
      `
    );
  } else {
    data_verbal.forEach((prob) => {
      prob_info = prob.split("-");
      $("#problems_verbal").append(
        `
      <tr class="row row_verbal">
        <td>Test ${prob_info[0]} Section ${prob_info[1]} Q. ${prob_info[2]}</td>
        <td>${prob_info[3]}</td>
      </tr>`
      );
    });
  }
  if (data_quant.length === 0) {
    $("#problems_quant").append(
      `
      <tr class="row row_quant">
        <td>No Questions in the given range!</td>
      </tr>`
    );
  } else {
    data_quant.forEach((prob) => {
      prob_info = prob.split("-");
      $("#problems_quant").append(
        `
      <tr class="row row_quant">
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

/* Заранее скажу , что я любитель
 чистых функций, но здесь немного поленился устраивать property drill
  - передачу props'ов вглубь. Поэтому некоторые элементы доступны вследствие замыкания*/

let highlighted = [];
let sortProperties = { column: "distance", direction: "asc" };
fetchService = new FetchService();

function tableHeaderClickHandler() {
  if (sortProperties.column === event.target.id) {
    sortProperties.direction === "asc"
      ? (sortProperties.direction = "desc")
      : (sortProperties.direction = "asc");
  } else {
    sortProperties.column = event.target.id;
    sortProperties.direction = "asc";
  }
  getAndPrintData();
}

function tableBodyClickHandler() {
  const tr = event.target.closest("tr");
  const rowName = tr.firstChild.innerHTML;
  const index = highlighted.indexOf(rowName);
  if (index > -1) {
    highlighted.splice(index, 1);
  } else {
    highlighted.push(rowName);
  }
  localStorage.setItem("highlighted", JSON.stringify(highlighted));
  getAndPrintData();
}

function getAndPrintData() {
  fetchService.getFlights().then((data) => {
    //Немного сложно для чтения выбираем функцию сортировки в зависимости от параметров
    sortData = sortProperties.direction ==='asc' ? sortDataAsc : sortDataDesc;
    const sortedData = sortData(data, sortProperties);
    const tableHTML = createTableFromData(sortedData, highlighted);
    tableBodyEl.innerHTML = tableHTML;
  });
}


document.addEventListener("DOMContentLoaded", function () {
  //Заметьте, на следующей  строчке ECMAScript 2020 :)
  highlighted = JSON.parse(localStorage.getItem("highlighted")) ?? new Array();
  tableBodyEl = document.getElementById("tableBody");
  tableHeaderEl = document.getElementById("tableHeader");

  getAndPrintData();

  tableHeaderEl.addEventListener("click", () => tableHeaderClickHandler());
  tableBodyEl.addEventListener("click", () => tableBodyClickHandler());

  setInterval(() => getAndPrintData(), 3000);
});

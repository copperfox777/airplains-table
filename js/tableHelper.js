function createTableFromData(data,highlighted) {
  let htmlContent='';
  data.forEach(element => {
    let hlstyle = highlighted.includes(element.flightNumber) ? 'class="is-selected"' : '';
    htmlContent+=`<tr ${hlstyle} >`;
    htmlContent+= `<td>${element.flightNumber}</td>`;
    htmlContent+= `<td>${element.coordinates}</td>`;
    htmlContent+= `<td>${element.speed}</td>`;
    htmlContent+= `<td>${element.cousre}</td>`;
    htmlContent+= `<td>${element.altitude}</td>`;
    htmlContent+= `<td>${element.airports}</td>`;
    htmlContent+= `<td>${element.distance}</td>`;
    htmlContent+='</tr>'
  });
  return htmlContent;
}

function sortDataAsc(data,sortProperties) {
  return data.sort((a,b) => {return a[sortProperties.column] - b[sortProperties.column]});
}

function sortDataDesc(data,sortProperties) {
  return data.sort((a,b) => {return b[sortProperties.column] - a[sortProperties.column]});
}


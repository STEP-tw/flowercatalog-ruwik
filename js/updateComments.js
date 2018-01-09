const createTableCell = function(tableData){
  return `<td>${tableData}</td>`;
};

const createTableRow = function(rowData){
  return `<tr>${rowData}</tr>`;
};

const giveRow = function(commentObject){
  let time = commentObject['time'];
  let date = commentObject['date'];
  let name = commentObject['name'];
  let comment = commentObject['comment'];
  return createTableCell(time)+createTableCell(date)+createTableCell(name)+
  createTableCell(comment);
};

const createCompleteTable = function(){
  let commentsTable = '';
  for (let index = 0;index < data.length;index++) {
    let commentData = data[index];
    let row = giveRow(commentData);
    commentsTable+=createTableRow(row);
  };
  return commentsTable;
};

const updateComments = function(){
  let commentsTable = document.getElementById('comments');
  commentsTable.innerHTML = createCompleteTable();
  document.getElementById('name').value = '';
  document.getElementById('commentBox').value = '';
};

window.onload = updateComments;

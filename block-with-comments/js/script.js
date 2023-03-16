'use strict';

let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function() {
  event.preventDefault();
  let commentName = document.getElementById('comment-name');
  let commentBody = document.getElementById('comment-body');
  let commentDate = document.getElementById('comment-date');

let comment = {
  name : commentName.value,
  body : commentBody.value,
  time : commentDate.value,
  time2 : Date.now()/1000
}

commentName.value = '';
commentBody.value = '';
commentDate.value = '';

comments.push(comment);
saveComments();
showComments();

}

function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  showComments();
}



function showComments() {
  let commentfield = document.getElementById('comment-field');
  let out = '';
  comments.forEach(function(item) {
    out += `<p class="form1">${'заданная дата:'} ${item.time}</p>`;
    out += `<p class="form1">${'текущая дата:'} ${'сегодня,'} ${timeConverter(item.time2)}</p>`;
    out += `<p class="form2">${item.name}</p>`;
    out += `<p class="form3">${item.body}</p>`;
  });

  commentfield.innerHTML = out;
}


function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time2 = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time2;
}

document.getElementById("remove").onclick = function() {
  document.getElementById("comment-field").outerHTML = "";
}


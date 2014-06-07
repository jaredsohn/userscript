// ==UserScript==
// @name        spam
// @namespace   36on.ru/admin*
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


$("table td:nth-child(7)").each(function() {
  var i, isL, isLink, l, value, words;
  words = $(this).text().split(" ");
  l = words.length;
  isL = false;
  i = 0;
  while (i <= l) {
    value = words[i];
    isLink = /(http?:\/\/)?([\da-z\.-]+)\.([a-zа-я\.]{2,6})([\/\w \?=.-]*)*\/?/.test(value);
    if (isLink) {
      isL = true;
      //console.log(value);
    }
    i++;
  }
  if (isL) {
    return $(this).css("background", "#dfdfdf");
  }
});
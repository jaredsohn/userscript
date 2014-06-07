// ==UserScript==
// @name        SysAid - Check All New
// @namespace   http://userscripts.org/users/533413
// @description Automagically check all new types in SysAid on the Service Desk settings Categories tab for adding new categories
// @include     http*/CategorySettings.jsp*
// @version     1
// ==/UserScript==

var chKboX = document.getElementsByTagName('input');

for (var i = 0; i < chKboX.length; i++) {
  if ( chKboX[i].id == "request_new" || chKboX[i].id == "change_new" || chKboX[i].id == "problem_new" || chKboX[i].id == "cmdb_new") {
    chKboX[i].checked = true;
  }
}
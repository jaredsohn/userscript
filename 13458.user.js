// ==UserScript==
// @name          Basecamp: Default Private
// @namespace     http://userscripts.org/users/27585;scripts
// @description   Clicks private checkbox on all new Basecamp messages, to-dos, writeboard and files by default.
// @include		  http://*.updatelog.com/projects/*
// @include		  http://*.clientsection.com/projects/*
// @include		  http://*.seework.com/projects/*
// @include		  http://*.grouphub/projects/*
// @include		  http://*.projectpath.com/projects/*
// @include		  https://*.updatelog.com/projects/*
// @include		  https://*.clientsection.com/projects/*
// @include		  https://*.seework.com/projects/*
// @include		  https://*.grouphub/projects/*
// @include		  https://*.projectpath.com/projects/*
// ==/UserScript==

(function(){

// check messages, writeboard, files
var checkboxes = [];
(document.getElementById('post_private')&&!document.getElementById('notify_about_changes'))? checkboxes.push(document.getElementById('post_private')):""
document.getElementById('writeboard_private')? checkboxes.push(document.getElementById('writeboard_private')):""
document.getElementById('file[1][private]')? checkboxes.push(document.getElementById('file[1][private]')):""

for(var i = 0; i < checkboxes.length; i++) {
  var checkbox = checkboxes[i];
  if(!checkbox.checked){
    var evt2 = document.createEvent("MouseEvents");
    evt2.initEvent("click", true, false);
    checkbox.dispatchEvent(evt2);
  }
}

//check to-dos
setTimeout("var checkbox = document.getElementById('todo_list_private'); if(checkbox){ TodoLists.hijackedFunction = TodoLists.resetNewListForm; TodoLists.resetNewListForm = function(){ TodoLists.hijackedFunction(); checkbox.checked=true; }; checkbox.checked=true; }",500);

})();
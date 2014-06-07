// ==UserScript==
// @name       EZTV Better Show List
// @version    0.1
// @description  Change the menu to checkboxes
// @include     http://eztv.it/showlist/
// ==/UserScript==

(function(){
var script=document.createElement('script');
    script.innerText="function changeState(cb){"+
"var status;" +
"if (cb.checked)" +
"	status='';" +
"else" +
"	status='none';" +
"for (var i=0;i<document.getElementsByClassName(cb.name).length;i++)" +
"	document.getElementsByClassName(cb.name)[i].parentNode.parentNode.style.display=status;" +
"}";
document.body.appendChild(script);
var checkboxes = "<label><input type='checkbox' name='airing' onchange='changeState(this);' checked>Airing</label>" +
"<label><input type='checkbox' name='break' onchange='changeState(this);' checked>Break</label>" +
"<label><input type='checkbox' name='ended' onchange='changeState(this);' checked>Ended</label>" +
"<label><input type='checkbox' name='pending' onchange='changeState(this);' checked>Pending</label>";
document.getElementsByClassName("section_post_header")[0].innerHTML=checkboxes;
}).call(this);
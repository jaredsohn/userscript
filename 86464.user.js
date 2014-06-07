// ==UserScript==
// @name           Google Image Forum + HTML code
// @namespace      noircasa@gmail.com
// @include        http://www.google.*/imgres?imgurl=*
// ==/UserScript==

var cdiv = newEl("div");
var fbox = newEl("input");
var hbox = newEl("input");
var info = newEl("span");

var imgUrl = $("il_fi").src;
var fCode = "[img]"+imgUrl+"[/img]";
var htCode = "<img src='"+imgUrl+"' />";

info.innerHTML="Code:<br/>";
info.setAttribute("style","font-size:.8em");

fbox.setAttribute("type","text");
hbox.setAttribute("type","text");
fbox.setAttribute("style","width:200px;margin-bottom:5px;");
hbox.setAttribute("style","width:200px");

fbox.addEventListener("click",select,1);
hbox.addEventListener("click",select,1);

fbox.value=fCode;
hbox.value=htCode;

$("il_m").firstChild.appendChild(cdiv);
cdiv.appendChild(info);
cdiv.appendChild(fbox);
cdiv.appendChild(hbox);


function select(e) {
	e.target.select();
}

function newEl(str) {
	return document.createElement(str);
}

function $(str) {
	return document.getElementById(str);
}




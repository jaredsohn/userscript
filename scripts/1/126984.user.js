// ==UserScript==
// @name           BlankPageStripes
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==

var table, tbody, tr
var width = 256;
var colors = new Array();
colors[0] = "rgb(255, 0, 0)";
colors[1] = "rgb(0, 255, 0)";
colors[2] = "rgb(0, 0, 255)";
if(window.self == window.top)
{
var init = function()
{
var style = document.createElement('style');
style.setAttribute("type", "Text/CSS");
style.innerHTML = "body\n{\noverflow: hidden;\n}\ndiv#tablediv\n{\nmargin: -8px;\n}\ndiv#tablediv > table > tbody > tr > td\n{\nwidth: " + window.innerWidth/width + "px;\nheight: " + window.innerHeight + "px;\n}\ndiv#tablediv > table > tbody > tr > td.x1\n{\nbackground-color: " + colors[0] + ";\n}\ndiv#tablediv > table > tbody > tr > td.x2\n{\nbackground-color: " + colors[1] + ";\n}\ndiv#tablediv > table > tbody > tr > td.x3\n{\nbackground-color: " + colors[2] + ";\n}";
var tablediv = document.createElement('div');
tablediv.setAttribute("id", "tablediv");
table = document.createElement('table');
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
tbody = document.createElement('tbody');
tr = document.createElement('tr');
for(var x = 0;x < width;x++)
{
var td = document.createElement('td');
td.setAttribute("class", "x" + (x%3+1));
tr.appendChild(td);
}
tbody.appendChild(tr);
table.appendChild(tbody);
tablediv.appendChild(table);
document.head.appendChild(style);
document.body.appendChild(tablediv);
window.setTimeout(rotate, 50);
};
window.addEventListener("load",init,false);
var rotate = function()
{
for(var x = 0;x < width;x++)
{
tr.childNodes[x].setAttribute("class", "x" + ((parseInt(tr.childNodes[x].getAttribute("class").charAt(1), 10))%3+1));
}
window.setTimeout(rotate, 50);
};
}

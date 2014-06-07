// ==UserScript==
// @name           BlankPageColors
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==
if(window.self == window.top)
{
var width = 10;
var height = 10;
var refreshTime = 500;
var colorstyle;
var init = function()
{
var mainstyle = document.createElement('style');
mainstyle.setAttribute("type", "Text/CSS");
mainstyle.innerHTML = "body\n{\noverflow: hidden;\n}\ntable\n{\nmargin: -8px;\n}\ntable > tbody > tr > td\n{\nwidth: " + window.innerWidth/width + "px;\nheight: " + window.innerHeight/height + "px;\n}";
colorstyle = document.createElement('style');
colorstyle.setAttribute("type", "Text/CSS");
var table = document.createElement('table');
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
var tbody = document.createElement('tbody');
for(var y = 1;y < height+1;y++)
{
var tr = document.createElement('tr');
tr.setAttribute("id", "y" + y);
for(var x = 1;x < width+1;x++)
{
var td = document.createElement('td');
td.setAttribute("class", "x" + x);
tr.appendChild(td);
var col = "#";
for(var i = 0;i < 3;i++)
{
var num = Math.floor(Math.random()*256);
col += "0123456789ABCDEF".charAt((num - (num % 16)) / 16) + "0123456789ABCDEF".charAt(num % 16);
}
if(y != 1 || x != 1)
{
colorstyle.innerHTML += "\n";
}
colorstyle.innerHTML += "table > tbody > tr#y" + y + " > td.x" + x + "\n{\nbackground-color: " + col + ";\n}";
}
tbody.appendChild(tr);
}
table.appendChild(tbody);
document.head.appendChild(mainstyle);
document.head.appendChild(colorstyle);
document.body.appendChild(table);
window.setTimeout(newCol, refreshTime);
};
window.addEventListener("load",init,false);
var newCol = function()
{
colorstyle.innerHTML = "";
for(var y = 1;y < height+1;y++)
{
for(var x = 1;x < width+1;x++)
{
var col = "#";
for(var i = 0;i < 3;i++)
{
var num = Math.floor(Math.random()*256);
col += "0123456789ABCDEF".charAt((num - (num % 16)) / 16) + "0123456789ABCDEF".charAt(num % 16);
}
if(y != 1 || x != 1)
{
colorstyle.innerHTML += "\n";
}
colorstyle.innerHTML += "table > tbody > tr#y" + y + " > td.x" + x + "\n{\nbackground-color: " + col + ";\n}";
}
}
window.setTimeout(newCol, refreshTime);
};
window.addEventListener("load",init,false);
}
// ==UserScript==
// @name           BlankPageSS
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==

//version 1.1-1.2: added Rainbow effect and extra options
//version 1.0: built main engine
if(window.self == window.top)
{
var config = "none";
var t;
var mainstyle, configstyle, buildstyle, colorstyle, bright, settingsdiv, tablediv, table;
var init = function()
{
mainstyle = document.createElement('style');
mainstyle.setAttribute("type", "Text/CSS");
mainstyle.innerHTML = "body\n{\ncursor: default;\noverflow: hidden;\n}\ndiv#tablediv\n{\nmargin: -8px;\n}\ndiv#bright, div#settingsdiv\n{\nposition: absolute;\ntop: 0px;\nbottom: 0px;\nleft: 0px;\nright: 0px;\nwidth: 100%;\nheight: 100%;\n}\ndiv#bright\n{\nbackground-color: #AAAAAA;\nopacity: 0.6;\n}\ndiv#settingsdiv\n{\nz-index: 1;\n-moz-user-select: -moz-none;\n}\ndiv#settingsdiv > div#optionsdiv\n{\nfloat: right;\nmargin-right: 20%;\nmargin-top: 1%;\n}\ndiv#settingsdiv > div#extraoptions\n{\nmargin-top: 10%;\nmargin-left: 70%;\n}";
configstyle = document.createElement('style');
configstyle.setAttribute("type", "Text/CSS");
configstyle.innerHTML = "div#bright, div#settingsdiv\n{\ndisplay: " + config + ";\n}";
buildstyle = document.createElement('style');
buildstyle.setAttribute("type", "Text/CSS");
colorstyle = document.createElement('style');
colorstyle.setAttribute("type", "Text/CSS");
bright = document.createElement('div');
bright.setAttribute("id", "bright");
settingsdiv = document.createElement('div');
settingsdiv.setAttribute("id", "settingsdiv");
var optionsdiv = document.createElement('div');
optionsdiv.setAttribute("id", "optionsdiv");
var optsform = document.createElement('form');
var opt1 = document.createElement('input');
opt1.setAttribute("type", "radio");
opt1.setAttribute("name", "mode");
opt1.setAttribute("value", "boxes");
if(GM_getValue("mode") == opt1.value)
{
opt1.setAttribute("checked", "true");
}
var opt2 = document.createElement('input');
opt2.setAttribute("type", "radio");
opt2.setAttribute("name", "mode");
opt2.setAttribute("value", "stripes");
if(GM_getValue("mode") == opt2.value)
{
opt2.setAttribute("checked", "true");
}
var opt3 = document.createElement('input');
opt3.setAttribute("type", "radio");
opt3.setAttribute("name", "mode");
opt3.setAttribute("value", "rainbow");
if(GM_getValue("mode") == opt3.value)
{
opt3.setAttribute("checked", "true");
}
var extraoptions = document.createElement('div');
extraoptions.setAttribute("id", "extraoptions");
var stripesopts = document.createElement('form');
var leftopt = document.createElement('input');
leftopt.setAttribute("type", "radio");
leftopt.setAttribute("name", "stripesdirection");
leftopt.setAttribute("value", "left");
if(GM_getValue("stripesdirection") == leftopt.value)
{
leftopt.setAttribute("checked", "true");
}
var rightopt = document.createElement('input');
rightopt.setAttribute("type", "radio");
rightopt.setAttribute("name", "stripesdirection");
rightopt.setAttribute("value", "right");
if(GM_getValue("stripesdirection") == rightopt.value)
{
rightopt.setAttribute("checked", "true");
}
stripesopts.innerHTML += "Stripes direction: <br />";
stripesopts.appendChild(leftopt);
stripesopts.innerHTML += "Left<br />";
stripesopts.appendChild(rightopt);
stripesopts.innerHTML += "Right";
extraoptions.appendChild(stripesopts);
var rainbowopts = document.createElement('form');
var inopt = document.createElement('input');
inopt.setAttribute("type", "radio");
inopt.setAttribute("name", "rainbowdirection");
inopt.setAttribute("value", "in");
if(GM_getValue("rainbowdirection") == inopt.value)
{
inopt.setAttribute("checked", "true");
}
var outopt = document.createElement('input');
outopt.setAttribute("type", "radio");
outopt.setAttribute("name", "rainbowdirection");
outopt.setAttribute("value", "out");
if(GM_getValue("rainbowdirection") == outopt.value)
{
outopt.setAttribute("checked", "true");
}
rainbowopts.innerHTML += "Rainbow direction: <br />";
rainbowopts.appendChild(inopt);
rainbowopts.innerHTML += "In<br />";
rainbowopts.appendChild(outopt);
rainbowopts.innerHTML += "Out";
extraoptions.appendChild(rainbowopts);
optsform.innerHTML += "Color Scheme: <br />";
optsform.appendChild(opt1);
optsform.innerHTML += "Boxes<br />";
optsform.appendChild(opt2);
optsform.innerHTML += "Stripes<br />";
optsform.appendChild(opt3);
optsform.innerHTML += "Rainbow";
optionsdiv.appendChild(optsform);
settingsdiv.appendChild(optionsdiv);
settingsdiv.appendChild(extraoptions);
tablediv = document.createElement('div');
tablediv.setAttribute("id", "tablediv");
window.setTimeout(drawTable, 1);
document.head.appendChild(mainstyle);
document.head.appendChild(buildstyle);
document.head.appendChild(colorstyle);
document.head.appendChild(configstyle);
document.body.appendChild(bright);
document.body.appendChild(settingsdiv);
document.body.appendChild(tablediv);
window.focus();
};
var drawTable = function()
{
while(tablediv.childNodes.length > 0)
{
tablediv.removeChild(tablediv.firstChild);
}
document.getElementById('extraoptions').childNodes[0].removeAttribute("style");
document.getElementById('extraoptions').childNodes[1].removeAttribute("style");
if(GM_getValue("mode") != "stripes")
{
document.getElementById('extraoptions').childNodes[0].setAttribute("style", "display: none");
}
if(GM_getValue("mode") != "rainbow")
{
document.getElementById('extraoptions').childNodes[1].setAttribute("style", "display: none");
}
if(GM_getValue("mode") == "rainbow")
{
buildstyle.innerHTML = "div#tablediv > div\n{\nposition: absolute;\nleft: 50%;\ntop: 50%;\n}\n";
colorstyle.innerHTML = "";
var howmany = 64;
var width = window.innerWidth;
var widthDec = width/howmany;
var height = window.innerHeight;
var heightDec = height/howmany;
var r = 256;
var g = 0;
var b = 0;
for(var i = 1;i < howmany+1;i++)
{
var div = document.createElement('div');
div.setAttribute("id", "i" + i);
var col = "#";
if(r > 0 && b == 0)
{
if(g == 256)
{
r -= 1600/howmany;
}
g += 1600/howmany;
}
if(g > 0 && r == 0)
{
if(b == 256)
{
g -= 1600/howmany;
}
b += 1600/howmany;
}
if(b > 0 && g == 0)
{
if(r == 256)
{
b -= 1600/howmany;
}
r += 1600/howmany;
}
if(r < 0)
{
r = 0;
}
if(g < 0)
{
g = 0;
}
if(b < 0)
{
b = 0;
}
if(r > 256)
{
r = 256;
}
if(g > 256)
{
g = 256;
}
if(b > 256)
{
b = 256;
}
if(i != 1)
{
buildstyle.innerHTML += "\n";
}
buildstyle.innerHTML += "div#tablediv > div:nth-child(" + i + ")\n{\nwidth: " + width + "px;\nheight: " + height + "px;\nmargin-left: -" + width/2 + "px;\nmargin-top: -" + height/2 + "px;\nz-index: " + (i-(howmany+1)) + ";\n}";
if(i != 1)
{
colorstyle.innerHTML += "\n";
}
colorstyle.innerHTML += "div#i" + i + "\n{\nbackground-color: rgb(" + r + ", " + g + ", " + b + ");\n}";
width -= widthDec;
height -= heightDec;
tablediv.appendChild(div);
}
t = window.setTimeout(rainbowRotate, 100);
}
if(GM_getValue("mode") != "rainbow")
{
buildstyle.innerHTML = "div#tablediv > table > tbody > tr > td\n{\nwidth: " + window.innerWidth/GM_getValue("x") + "px;\nheight: " + window.innerHeight/GM_getValue("y") + "px;\n}";
table = document.createElement('table');
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
var tbody = document.createElement('tbody');
colorstyle.innerHTML = "";
for(var y = 1;y < (parseInt(GM_getValue("y"), 10)+1);y++)
{
var tr = document.createElement('tr');
if(GM_getValue("mode") == "boxes")
{
tr.setAttribute("class", "y" + y);
}
for(var x = 1;x < (parseInt(GM_getValue("x"), 10)+1);x++)
{
var td = document.createElement('td');
if(GM_getValue("mode") == "boxes")
{
td.setAttribute("class", "x" + x);
var col = "#";
for(var i = 1;i < 4;i++)
{
var num = Math.floor(Math.random()*256);
col += "0123456789ABCDEF".charAt((num - (num % 16)) / 16) + "0123456789ABCDEF".charAt(num % 16);
}
if(y != 1 || x != 1)
{
colorstyle.innerHTML += "\n";
}
colorstyle.innerHTML += "div#tablediv > table > tbody > tr.y" + y + " > td.x" + x + "\n{\nbackground-color: " + col + ";\n}";
}
if(GM_getValue("mode") == "stripes")
{
td.setAttribute("class", "x" + (x%3+1));
GM_setValue("stripescolors", "#FF0000; #00FF00; #0000FF");
colorstyle.innerHTML = "div#tablediv > table > tbody > tr > td.x1\n{\nbackground-color: " + GM_getValue("stripescolors").split("; ")[0] + ";\n}\ndiv#tablediv > table > tbody > tr > td.x2\n{\nbackground-color: " + GM_getValue("stripescolors").split("; ")[1] + ";\n}\ndiv#tablediv > table > tbody > tr > td.x3\n{\nbackground-color: " + GM_getValue("stripescolors").split("; ")[2] + ";\n}";
}
tr.appendChild(td);
}
tbody.appendChild(tr);
}
if(GM_getValue("mode") == "boxes")
{
t = window.setTimeout(boxesRotate, 500);
}
if(GM_getValue("mode") == "stripes")
{
t = window.setTimeout(stripesRotate, 50);
}
table.appendChild(tbody);
tablediv.appendChild(table);
}
};
var boxesRotate = function()
{
colorstyle.innerHTML = "";
for(var y = 1;y < (parseInt(GM_getValue("y"), 10)+1);y++)
{
for(var x = 1;x < (parseInt(GM_getValue("x"), 10)+1);x++)
{
var col = "#";
for(var i = 1;i < 4;i++)
{
var num = Math.floor(Math.random()*256);
col += "0123456789ABCDEF".charAt((num - (num % 16)) / 16) + "0123456789ABCDEF".charAt(num % 16);
}
if(y != 1 || x != 1)
{
colorstyle.innerHTML += "\n";
}
colorstyle.innerHTML += "div#tablediv > table > tbody > tr.y" + y + " > td.x" + x + "\n{\nbackground-color: " + col + ";\n}";
}
}
t = window.setTimeout(boxesRotate, 500);
};
var stripesRotate = function()
{
for(var x = 0;x < GM_getValue("x");x++)
{
if(GM_getValue("stripesdirection") == "left")
{
table.firstChild.firstChild.childNodes[x].setAttribute("class", "x" + (parseInt(table.firstChild.firstChild.childNodes[x].getAttribute("class").charAt(1), 10)%3+1));
}
if(GM_getValue("stripesdirection") == "right")
{
table.firstChild.firstChild.childNodes[x].setAttribute("class", "x" + ((parseInt(table.firstChild.firstChild.childNodes[x].getAttribute("class").charAt(1), 10)+1)%3+1));
}
}
t = window.setTimeout(stripesRotate, 50);
};
var rainbowRotate = function()
{
if(GM_getValue("rainbowdirection") == "out")
{
for(var i = 0;i < tablediv.childNodes.length;i++)
{
tablediv.childNodes[i].setAttribute("id", "i" + (parseInt(tablediv.childNodes[i].getAttribute("id").substr(1), 10)+1));
if(tablediv.childNodes[i].getAttribute("id") == "i" + tablediv.childNodes.length)
{
tablediv.childNodes[i].setAttribute("id", "i1");
}
}
}
if(GM_getValue("rainbowdirection") == "in")
{
for(var i = tablediv.childNodes.length-1;i >= 0;i--)
{
tablediv.childNodes[i].setAttribute("id", "i" + (parseInt(tablediv.childNodes[i].getAttribute("id").substr(1), 10)-1));
if(tablediv.childNodes[i].getAttribute("id") == "i0")
{
tablediv.childNodes[i].setAttribute("id", "i" + tablediv.childNodes.length);
}
}
}
t = window.setTimeout(rainbowRotate, 100);
};
var changeColScheme = function()
{
if(GM_getValue("mode") == "boxes")
{
GM_setValue("x", "10");
GM_setValue("y", "10");
}
if(GM_getValue("mode") == "stripes")
{
GM_setValue("x", "128");
GM_setValue("y", "1");
}
if(GM_getValue("mode") == "boxes" || GM_getValue("mode") == "stripes" || GM_getValue("mode") == "rainbow")
{
window.clearTimeout(t);
window.setTimeout(drawTable, 1);
}
};
var mClick = function(e)
{
if(window.event)
{
e = window.event;
}
if(e.button == 0)
{
var target;
if(e.target)
{
target = e.target;
}
if(target.value)
{
GM_setValue(target.getAttribute("name"), target.value);
if(target.getAttribute("name") == "mode")
{
window.setTimeout(changeColScheme, 1);
}
}
}
};
var kDown = function(e)
{
if(window.event)
{
e = window.event;
}
if(e.keyCode == 27)
{
if(config == "none")
{
config = "block";
}
else if(config == "block")
{
config = "none";
}
configstyle.innerHTML = "div#bright, div#settingsdiv\n{\ndisplay: " + config + ";\n}";
}
};
window.addEventListener("click",mClick,false);
window.addEventListener("keydown",kDown,false);
window.addEventListener("load",init,false);
}

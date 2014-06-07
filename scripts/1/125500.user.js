// ==UserScript==
// @name           BlankPageZoom
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==

if(window.self == window.top)
{
//version 1.2: added settings
//version 1.1: added easy URL change
//version 1.0: made main program as a HTML page, converted into a userscript

var tablediv, positionstyle, sizestyle, zoomdiv, zoomstyle, mainstyle, title, settingsdiv;
var imgheight, imgwidth = 0;
var settingnames = new Array();
settingnames[0] = "width";
settingnames[1] = "height";
settingnames[2] = "percentage";
settingnames[3] = "zoomfactor";
var settingcaptions = new Array();
settingcaptions[0] = "Columns: ";
settingcaptions[1] = "Rows: ";
settingcaptions[2] = "% of original size: ";
settingcaptions[3] = "Zoom Factor: ";
var loaded = false;
if(!GM_getValue("width"))
{
GM_setValue("width", "10");
}
if(!GM_getValue("height"))
{
GM_setValue("height", "10");
}
if(!GM_getValue("percentage"))
{
GM_setValue("percentage", "50");
}
if(!GM_getValue("zoomfactor"))
{
GM_setValue("zoomfactor", "4");
}
if(!GM_getValue("url"))
{
GM_setValue("url", "http://eskgaming.byethost7.com/image.png");
}
var preloadimg = document.createElement('img');
preloadimg.setAttribute("src", GM_getValue("url"));
preloadimg.setAttribute("style", "display: none;");
document.body.appendChild(preloadimg);
var preload = function(e)
{
if(e.type == "load")
{
if(preloadimg.naturalWidth/window.innerWidth > preloadimg.naturalHeight/window.innerHeight)
{
preloadimg.setAttribute("style", "width: " + GM_getValue("percentage") + "%; height: auto;");
}
else if(preloadimg.naturalWidth/window.innerWidth < preloadimg.naturalHeight/window.innerHeight)
{
preloadimg.setAttribute("style", "width: auto; height: " + GM_getValue("percentage") + "%;");
}
else if(preloadimg.naturalWidth/window.innerWidth == preloadimg.naturalHeight/window.innerHeight)
{
preloadimg.setAttribute("style", "width: " + GM_getValue("percentage") + "%; height: " + GM_getValue("percentage") + "%;");
}
imgwidth = preloadimg.width;
imgheight = preloadimg.height;
document.body.removeChild(preloadimg);
}
if(loaded)
{
window.setTimeout(init, 1);
}
};
preloadimg.addEventListener("load",preload,false);
preloadimg.addEventListener("onerror",preload,false);
var init = function()
{
settingsdiv = document.createElement('div');
settingsdiv.setAttribute("id", "settingsdiv");
var imgurl = document.createElement('input');
imgurl.setAttribute("name", "imgurl");
imgurl.setAttribute("type", "text");
imgurl.setAttribute("value", GM_getValue("url"));
settingsdiv.innerHTML += "Image URL: ";
settingsdiv.appendChild(imgurl);
var tablee = document.createElement('table');
var tbody = document.createElement('tbody');
var trr;
for(var i = 0;i < settingnames.length+settingcaptions.length;i++)
{
if(i%2 == 0)
{
trr = document.createElement('tr');
}
var tdd = document.createElement('td');
if(i%2 == 0)
{
tdd.innerHTML = settingcaptions[Math.floor(i/2)];
}
if(i%2-1 == 0)
{
var setting = document.createElement('input');
setting.setAttribute("name", settingnames[Math.floor(i/2)]);
setting.setAttribute("type", "text");
setting.setAttribute("value", GM_getValue(settingnames[Math.floor(i/2)]));
tdd.appendChild(setting);
tablee.appendChild(tbody);
}
trr.appendChild(tdd);
tbody.appendChild(trr);
if(i == (settingnames.length+settingcaptions.length)/2)
{
settingsdiv.appendChild(tablee);
tbody = document.createElement('tbody');
tablee = document.createElement('table');
}
}
settingsdiv.appendChild(tablee);
settingsdiv.innerHTML += "Press Enter to confirm. ";
mainstyle = document.createElement('style');
mainstyle.setAttribute("type", "Text/CSS");
mainstyle.innerHTML += '@-moz-keyframes select\n{\n0%{border-width: 2px; margin-top: -' + imgheight/GM_getValue("height")/1.8+14 + 'px; border-color: #DDDDDD;}\n70%{border-width: ' + (Math.round(1.5/imgwidth*imgheight)) + 'px; margin-top: -' + imgheight/GM_getValue("height")/1.7+14 + 'px; border-color: #DDDDDD;}\n100%{border-width: ' + (Math.round(2/imgwidth*imgheight)) + 'px; margin-top: -' + imgheight/GM_getValue("height")/1.6+14 + 'px; border-color: #DDDDDD;}\n}\nbody, body > div\n{\n-moz-user-select: -moz-none;\ncursor: default;\n}\ninput[type="text"]\n{\n-moz-user-select: text;\n}\nh1\n{\nfont-family: Cooper Std Black;\ntext-align: center;\nfont-size: 300%;\ncolor: #220000;\n}\nbody, table#table > tr > td > div, div#tablediv, div#zoomdiv\n{\noverflow: hidden;\n}\ndiv#tablediv:hover > table#table > tr > td > div\n{\nborder: 2px outset #BBBBBB;\n}\ndiv#tablediv:hover > table#table > tr > td > div:hover\n{\nposition: fixed;\n-moz-animation: select 0.2s 1;\n-moz-animation-fill-mode: forwards;\ncursor: pointer;\n}\ndiv#tablediv, div#zoomdiv, div#settingsdiv\n{\nposition: absolute;\nbackground-image: url(http://eskgaming.byethost7.com/redbg.png);\n}\ndiv#tablediv\n{\nleft: 76%;\ntop: 46%;\n}\ndiv#zoomdiv\n{\nz-index: -1;\nleft: 26%;\ntop: 50%;\nmargin-left: -' + (imgwidth/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("width"))/2 + 'px;\nmargin-top: -' + (imgheight/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("height"))/2 + 'px;\n}\ndiv#settingsdiv\n{\nleft: 6%;\ntop: 84%;\n}\ndiv#settingsdiv > table > tbody > tr > td:first-child\n{\nfloat: right;\n}\ndiv#settingsdiv > input\n{\nwidth: 120px;\n}\ndiv#settingsdiv > table > tbody > tr > td > input\n{\nwidth: 22px;\n}\ndiv#settingsdiv > table:nth-child(3) > tbody > tr:nth-child(1) > td:nth-child(2) > input\n{\nwidth: 28px;\n}\ndiv#settingsdiv > table:nth-child(3)\n{\nmargin-left: 220px;\nmargin-top: -54px;\n}';
document.head.appendChild(mainstyle);
if(!loaded)
{
title = document.createElement('h1');
title.innerHTML = "BlankPageZoom";
document.body.appendChild(title);
}
positionstyle = document.createElement('style');
positionstyle.setAttribute("type", "Text/CSS");
zoomstyle = document.createElement('style');
zoomstyle.setAttribute("type", "Text/CSS");
zoomdiv = document.createElement('div');
zoomdiv.setAttribute("id", "zoomdiv");
var zoomimg = document.createElement('img');
zoomimg.setAttribute("id", "zoomimg");
zoomimg.setAttribute("src", GM_getValue("url"));
zoomdiv.appendChild(zoomimg);
tablediv = document.createElement('div');
tablediv.setAttribute("id", "tablediv");
var table = document.createElement('table');
table.setAttribute("id", "table");
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
for(var y = 1;y <= GM_getValue("height");y++)
{
var tr = document.createElement('tr');
tr.setAttribute("class", "y" + y);
if(y != 1)
{
positionstyle.innerHTML += "\ndiv#tablediv > table#table > tr.y" + y + " > td > div > img\n{\nmargin-top: -" + (imgheight/GM_getValue("height")*(y-1)) + "px;\n}";
}
for(var x = 1;x <= GM_getValue("width");x++)
{
var td = document.createElement('td');
td.setAttribute("class", "x" + x);
var div = document.createElement('div');
var img = document.createElement('img');
img.setAttribute("src", GM_getValue("url"));
div.appendChild(img);
td.appendChild(div);
tr.appendChild(td);
if(x != 1 && y != 1)
{
positionstyle.innerHTML += "\ndiv#tablediv > table#table > tr > td.x" + x + " > div > img\n{\nmargin-left: -" + (imgwidth/GM_getValue("width")*(x-1)) + "px;\n}";
}
}
table.appendChild(tr);
}
tablediv.appendChild(table);
document.head.appendChild(positionstyle);
document.body.appendChild(tablediv);
document.head.appendChild(zoomstyle);
document.body.appendChild(zoomdiv);
if(!loaded)
{
document.body.appendChild(settingsdiv);
}
sizestyle = document.createElement('style');
sizestyle.setAttribute("type", "Text/CSS");
sizestyle.innerHTML = "div#tablediv > table#table > tr > td > div > img\n{\nwidth: " + imgwidth + "px;\nheight: " + imgheight + "px;\n}\ndiv#tablediv > table#table > tr > td > div\n{\nwidth: " + (imgwidth/GM_getValue("width")) + "px;\nheight: " + (imgheight/GM_getValue("height")) + "px;\n}\ndiv#tablediv\n{\nmargin-left: -" + (imgwidth/2) + "px;\nmargin-top: -" + (imgheight/2) + "px;\n}\ndiv#tablediv:hover\n{\nmargin-left: -" + ((imgwidth+GM_getValue("width")*4)/2) + "px;\nmargin-top: -" + ((imgheight+GM_getValue("height")*4)/2) + "px;\n}";
sizestyle.innerHTML += "\ndiv#zoomdiv\n{\nwidth: " + (imgwidth/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("width")) + "px;\nheight: " + (imgheight/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("height")) + "px;\n}\ndiv#zoomdiv > img#zoomimg\n{\nwidth: " + (imgwidth/GM_getValue("percentage")*100*GM_getValue("zoomfactor")) + "px;\nheight: " + (imgheight/GM_getValue("percentage")*100*GM_getValue("zoomfactor")) + "px;\n}";
document.head.appendChild(sizestyle);
loaded = true;
document.body.removeAttribute("style");
};
var mClick = function(e)
{
if(window.event)
{
e = window.event;
}
var target;
if(e.target)
{
target = e.target;
}
if(e.button == 0)
{
if(target.tagName == "INPUT" && target.getAttribute("type") == "text" && target.getAttribute("name") == "imgurl")
{
target.focus();
target.select();
}
if(target.tagName == "IMG" && target.getAttribute("src") == GM_getValue("url"))
{
zoomstyle.innerHTML = "div#zoomdiv > img#zoomimg\n{\nmargin-left: -" + ((parseInt(target.parentNode.parentNode.getAttribute("class").substr(1, 2), 10)-1)*imgwidth/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("width")) + "px;\nmargin-top: -" + ((parseInt(target.parentNode.parentNode.parentNode.getAttribute("class").substr(1, 2), 10)-1)*imgheight/GM_getValue("percentage")*100*GM_getValue("zoomfactor")/GM_getValue("height")) + "px;\n}";
}
}
};
var kDown = function(e)
{
if(window.event)
{
e = window.event;
}
var target;
if(e.target)
{
target = e.target;
}
if(e.keyCode == 13 && target.tagName == "INPUT")
{
for(var i = 0;i < settingnames.length;i++)
{
GM_setValue(settingnames[i], document.getElementsByName(settingnames[i])[0].value);
}
GM_setValue("url", settingsdiv.childNodes[1].value);
preloadimg.setAttribute("src", GM_getValue("url"));
document.body.setAttribute("style", "display: none;");
if(document.body == tablediv.parentNode)
{
document.body.removeChild(tablediv);
}
if(document.body == zoomdiv.parentNode)
{
document.body.removeChild(zoomdiv);
}
if(document.head == positionstyle.parentNode)
{
document.head.removeChild(positionstyle);
}
if(document.head == zoomstyle.parentNode)
{
document.head.removeChild(zoomstyle);
}
if(document.head == sizestyle.parentNode)
{
document.head.removeChild(sizestyle);
}
if(document.head == mainstyle.parentNode)
{
document.head.removeChild(mainstyle);
}
document.body.appendChild(preloadimg);
document.body.setAttribute("style", "visibility: hidden;");
}
};
window.addEventListener("load",init,false);
window.addEventListener("click",mClick,false);
window.addEventListener("keydown",kDown,false);
}

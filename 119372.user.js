// ==UserScript==
// @name           BlankPageSpicer
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==

if(window.self == window.top)
{
//version 1.4: many bugs fixed, new layout and ability to change background color.
//version 1.3: converted into unobtrusive and fixed various bugs.
//version 1.2: added Fit mode and the ability to change modes.
//version 1.0: published.
//version 0.1-0.9: built the main program.

var mainstyle, bg, bgstyle, bright, container, containerstyle, error, errorstyle, imgurl, undo, undostyle, options, bgcolor;
var config = true;

function checkContainer()
{
if(config)
{
containerstyle.innerHTML = "div[name=container]\n{\npadding-left: 8%;\ncursor: default;\n-moz-user-select: -moz-none;\ndisplay: none;\n}\ndiv[name=bright]\n{\nposition: absolute;\nmargin-left: auto;\nmargin-right: auto;\ntop: 0pt;\nbottom: 0pt;\nleft: 0pt;\nright: 0pt;\nwidth: 100%;\nheight: 100%;\nbackground-color: #FFFFFF;\nz-index: -1;\nopacity: 0;\nfilter: alpha(0);\n}";
config = false;
}
else
{
containerstyle.innerHTML = "div[name=container]\n{\npadding-left: 8%;\ncursor: default;\n-moz-user-select: -moz-none;\ndisplay: block;\n}\ndiv[name=bright]\n{\nposition: absolute;\nmargin-left: auto;\nmargin-right: auto;\ntop: 0pt;\nbottom: 0pt;\nleft: 0pt;\nright: 0pt;\nwidth: 100%;\nheight: 100%;\nbackground-color: #FFFFFF;\nz-index: -1;\nopacity: 0.4;\nfilter: alpha(40);\n}";
config = true;
}
}

function checkUndo()
{
if(GM_getValue("isundo") == "true")
{
undostyle.innerHTML = "a[name=undo]\n{\ncursor: pointer;\ncolor: #4040ff;\ntext-decoration: underline;\n}";
}
if(GM_getValue("isundo") == "false")
{
undostyle.innerHTML = "a[name=undo]\n{\ncursor: pointer;\ncolor: #4040ff;\ntext-decoration: underline;\ndisplay: none;\n}";
}
}

function checkMode()
{
if(GM_getValue("mode") == "1")
{
bgstyle.innerHTML = "img[name=bg]\n{\nposition: absolute;\nheight: 100%;\nwidth: 100%;\nmargin-left: auto;\nmargin-right: auto;\nmargin-top: -0.7%;\nleft: 0;\nright: 0;\nz-index: -2;\n}";
}
if(GM_getValue("mode") == "2")
{
bgstyle.innerHTML = "img[name=bg]\n{\nposition: absolute;\nmargin-left: auto;\nmargin-right: auto;\nmargin-top: -0.7%;\nleft: 0pt;\nright: 0pt;\nz-index: -2;\n";
if(bg.naturalHeight/window.innerHeight > bg.naturalWidth/window.innerWidth)
{
bgstyle.innerHTML += "height: 100%;\nwidth: auto;\n}";
}
else
{
bgstyle.innerHTML += "height: auto;\nwidth: 100%;\n}";
}
}
}

function checkBg()
{
if(GM_getValue("url") != "" && typeof bg.naturalWidth != "undefined" && bg.naturalWidth == 0)
{
GM_setValue("iserror", "true");
}
else
{
GM_setValue("iserror", "false");
}
if(GM_getValue("iserror") == "true")
{
errorstyle.innerHTML += "p[name=error]\n{\ncolor: #dd0000;\ndisplay: block;\n}";
}
if(GM_getValue("iserror") == "false")
{
GM_setValue("workingurl", GM_getValue("url"));
errorstyle.innerHTML += "p[name=error]\n{\ncolor: #dd0000;\ndisplay: none;\n}";
}
}

var init = function ()
{
if(!GM_getValue("mode"))
{
GM_setValue("mode","1");
}
if(!GM_getValue("url"))
{
GM_setValue("url","");
}
if(!GM_getValue("workingurl"))
{
GM_setValue("workingurl","");
}
if(!GM_getValue("isundo"))
{
GM_setValue("isundo","false");
}
if(!GM_getValue("iserror"))
{
GM_setValue("iserror","false");
}
if(!GM_getValue("bgcolor"))
{
GM_setValue("bgcolor","");
}
document.body.bgColor = GM_getValue("bgcolor");
bgstyle = document.createElement('style');
bgstyle.setAttribute("type", "Text/CSS");
bg = document.createElement('img');
bg.setAttribute("name", "bg");
bg.setAttribute("src", GM_getValue("url"));
document.body.appendChild(bg);
bright = document.createElement('div');
bright.setAttribute("name", "bright");
document.body.appendChild(bright);
container = document.createElement('div');
container.setAttribute("name", "container");
imgurl = document.createElement('input');
imgurl.setAttribute("name", "imgurl");
imgurl.setAttribute("type", "text");
imgurl.setAttribute("value", GM_getValue("url"));
undo = document.createElement('a');
undo.setAttribute("name", "undo");
undostyle = document.createElement('style');
undostyle.setAttribute("type", "Text/CSS");
undo.innerHTML = "Undo";
error = document.createElement('p');
error.setAttribute("name", "error");
error.innerHTML = "Error: URL was invalid. Please re-enter URL.";
errorstyle = document.createElement('style');
errorstyle.setAttribute("type", "Text/CSS");
options = document.createElement('form');
options.setAttribute("name", "options");
options.innerHTML = "Format:<br />";
var opt1 = document.createElement('input');
opt1.setAttribute("type", "radio");
opt1.setAttribute("name", "options");
opt1.setAttribute("value", "1");
if(GM_getValue("mode") == "1")
{
opt1.setAttribute("checked", "true");
}
options.appendChild(opt1);
options.innerHTML += "Stretched<br />";
var opt2 = document.createElement('input');
opt2.setAttribute("type", "radio");
opt2.setAttribute("name", "options");
opt2.setAttribute("value", "2");
if(GM_getValue("mode") == "2")
{
opt2.setAttribute("checked", "true");
}
options.appendChild(opt2);
options.innerHTML += "Fit";
bgcolor = document.createElement('input');
bgcolor.setAttribute("name", "bgcolor");
bgcolor.setAttribute("type", "text");
bgcolor.setAttribute("value", GM_getValue("bgcolor"));
container.appendChild(options);
container.innerHTML += "<br />Press Escape to exit Settings.<br />";
container.innerHTML += "Enter the URL of the picture you wish to use and press Enter: ";
container.appendChild(imgurl);
container.appendChild(undo);
container.innerHTML += "<br />Enter the background color you wish to use: ";
container.appendChild(bgcolor);
container.appendChild(error);
mainstyle = document.createElement('style');
mainstyle.setAttribute("type", "Text/CSS");
mainstyle.innerHTML = "input[type=text]\n{\ncursor: text;\n-moz-user-select: text;\n}\nform\n{\nposition: absolute;\nleft: 80%;\ncursor: default;\n-moz-user-select: -moz-none;\n}\nbody\n{\ncursor: default;\n-moz-user-select: -moz-none;\noverflow: hidden;\n}";
containerstyle = document.createElement('style');
containerstyle.setAttribute("type", "Text/CSS");
document.head.appendChild(mainstyle);
checkContainer();
document.head.appendChild(containerstyle);
window.setTimeout(function(){checkBg();}, 500);
document.head.appendChild(errorstyle);
checkMode();
document.head.appendChild(bgstyle);
checkUndo();
document.head.appendChild(undostyle);
document.body.appendChild(container);
window.focus();
};

var handleKeyDown = function (e)
{
var target;
if(e.target)
{
target = e.target;
}
if (window.event)
{
e = window.event;
}
if(e.keyCode == 27)
{
checkContainer();
}
if (e.keyCode == 13 && config)
{
if(target.name == imgurl.name)
{
GM_setValue("url", target.value);
bg.setAttribute("src", GM_getValue("url"));
imgurl.setAttribute("value", GM_getValue("url"));
window.setTimeout(function(){checkBg();}, 500);
window.setTimeout(function(){checkBg();}, 2000);
window.setTimeout(function(){checkBg();}, 3000);
window.setTimeout(function(){checkBg();}, 4000);
window.setTimeout(function(){checkBg();}, 5000);
checkMode();
GM_setValue("isundo", "true");
checkUndo();
}
if(target.name == bgcolor.name)
{
GM_setValue("bgcolor", bgcolor.value);
document.body.bgColor = GM_getValue("bgcolor");
}
}
};

var click = function (e)
{
var target;
if(e.target)
target = e.target;
if(config && target.name == "options")
{
GM_setValue("mode",target.value);
checkMode();
}
if(config && target.name == undo.name)
{
GM_setValue("url", GM_getValue("workingurl"));
bg.setAttribute("src", GM_getValue("url"));
imgurl.setAttribute("value", GM_getValue("url"));
window.setTimeout(function(){checkBg();}, 500);
window.setTimeout(function(){checkBg();}, 2000);
window.setTimeout(function(){checkBg();}, 3000);
window.setTimeout(function(){checkBg();}, 4000);
window.setTimeout(function(){checkBg();}, 5000);
checkMode();
GM_setValue("isundo", "false");
checkUndo();
}
};

window.addEventListener("load",init,false);
window.addEventListener("keydown",handleKeyDown,false);
window.addEventListener("click",click,false);
}

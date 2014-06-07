// ==UserScript==
// @name           BlankPageHTML
// @namespace      http://userscripts.org/users/410104
// @include        about:blank
// @exclude        *
// ==/UserScript==

if(window.self == window.top)
{
//version 1.2: added setting the title by typing the word "title", made editing the html code easier.
//version 1.1: added easier styling, tweaked some stuff.
//version 1.0: branched from BlankPageSpicer.

var mainstyle, html, bright, container, containerstyle, innerhtml, styler, divstyle, undo, undostyle;
var config = true;
var titlecount = 0;

function checkStyle()
{
var reformat = GM_getValue("divstyle").split("\n").join("").split("{").join("\n{\n").split("}").join("}\n").split(";").join(";\n");
var temp = "";
for(var i = 0; i < reformat.split("}\n").length - 1;i++)
{
temp += "div[name=html]>" + reformat.split("}\n")[i] + "}";
if(i != reformat.split("}\n").length - 2)
{
temp += "\n";
}
}
divstyle.innerHTML = temp;
}

function checkContainer()
{
if(config)
{
containerstyle.innerHTML = "div[name=container]\n{\npositon: fixed;\ntop: 0pt;\npadding-left: 8%;\ncursor: default;\n-moz-user-select: -moz-none;\ndisplay: none;\nz-index: 90;\n}\ndiv[name=bright]\n{\nposition: fixed;\ntop: 0pt;\nmargin-left: auto;\nmargin-right: auto;\ntop: 0pt;\nbottom: 0pt;\nleft: 0pt;\nright: 0pt;\nwidth: 100%;\nheight: 100%;\nbackground-color: #FFFFFF;\nz-index: -1;\nopacity: 0;\nfilter: alpha(0);\ndisplay: none;\n}";
config = false;
}
else
{
containerstyle.innerHTML = "div[name=container]\n{\nposition: fixed;\ntop: 0pt;\npadding-left: 8%;\ncursor: default;\n-moz-user-select: -moz-none;\ndisplay: block;\nz-index: 90;\n}\ndiv[name=bright]\n{\nposition: fixed;\ntop: 0pt;\nmargin-left: auto;\nmargin-right: auto;\ntop: 0pt;\nbottom: 0pt;\nleft: 0pt;\nright: 0pt;\nwidth: 100%;\nheight: 100%;\nbackground-color: #FFFFFF;\nz-index: -1;\nopacity: 0.8;\nfilter: alpha(80);\ndisplay: block;\n}";
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

var init = function ()
{
if(!GM_getValue("html"))
{
GM_setValue("html","");
}
if(!GM_getValue("lasthtml"))
{
GM_setValue("lasthtml","");
}
if(!GM_getValue("isundo"))
{
GM_setValue("isundo","false");
}
if(!GM_getValue("divstyle"))
{
GM_setValue("divstyle","");
}
if(!GM_getValue("title"))
{
GM_setValue("title","");
}
document.title = GM_getValue("title");
html = document.createElement('div');
html.setAttribute("name", "html");
html.innerHTML = GM_getValue("html");
divstyle = document.createElement('style');
divstyle.setAttribute("type", "Text/CSS");
checkStyle();
bright = document.createElement('div');
bright.setAttribute("name", "bright");
document.body.appendChild(bright);
container = document.createElement('div');
container.setAttribute("name", "container");
innerhtml = document.createElement('textarea');
innerhtml.setAttribute("name", "innerhtml");
innerhtml.innerHTML = GM_getValue("html");
undo = document.createElement('a');
undo.setAttribute("name", "undo");
undostyle = document.createElement('style');
undostyle.setAttribute("type", "Text/CSS");
undo.innerHTML = "Undo";
styler = document.createElement('textarea');
styler.setAttribute("name", "styler");
styler.innerHTML = GM_getValue("divstyle");
container.innerHTML += "<br />Press Escape to exit Settings.";
container.innerHTML += "<br />Type \"title\" to specify the title of the page.";
container.innerHTML += "<br />Enter the HTML code you wish to use below and press Enter: <br />";
container.appendChild(innerhtml);
container.appendChild(undo);
container.innerHTML += "<br />If you know CSS, there's a &#x3C;style&#x3E; tag in the &#x3C;head&#x3E; tag reserved just for you. <br />Enter what you'd put there below and press Enter: <br />";
container.appendChild(styler);
mainstyle = document.createElement('style');
mainstyle.setAttribute("type", "Text/CSS");
mainstyle.innerHTML = "div[name=html]\n{\nposition: absolute;\ntop: 0pt;\nleft: 0pt;\nbottom: 0pt;\nright: 0pt;\nz-index: -2;\n}\ninput[type=text]\n{\ncursor: text;\n-moz-user-select: text;\n}";
containerstyle = document.createElement('style');
containerstyle.setAttribute("type", "Text/CSS");
document.head.appendChild(mainstyle);
checkContainer();
document.head.appendChild(containerstyle);
checkUndo();
document.head.appendChild(undostyle);
document.head.appendChild(divstyle);
document.body.appendChild(container);
document.body.appendChild(html);
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
if(e.keyCode == 13 && config)
{
if(target.name == innerhtml.name)
{
GM_setValue("lasthtml", GM_getValue("html"));
GM_setValue("html", target.value);
html.innerHTML = GM_getValue("html");
GM_setValue("isundo", "true");
checkUndo();
}
if(target.name == styler.name)
{
GM_setValue("divstyle", styler.value);
checkStyle();
}
}
if(config && e.target.tagName != "TEXTAREA")
{
if(e.keyCode == 84 && titlecount == 0)
{
titlecount = 1;
}
if(e.keyCode == 73 && titlecount == 1)
{
titlecount = 2;
}
if(e.keyCode == 84 && titlecount == 2)
{
titlecount = 3;
}
if(e.keyCode == 76 && titlecount == 3)
{
titlecount = 4;
}
if(e.keyCode == 69 && titlecount == 4)
{
titlecount = 0;
var titlename = prompt("Enter your preferred title here:", "");
GM_setValue("title", titlename);
document.title = GM_getValue("title");
}
}
};

var handleClick = function (e)
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
if(target.name == undo.name && config)
{
GM_setValue("html", GM_getValue("lasthtml"));
html.innerHTML = GM_getValue("html");
innerhtml.value = html.innerHTML;
GM_setValue("isundo", "false");
checkUndo();
}
};

window.addEventListener("load",init,false);
window.addEventListener("keydown",handleKeyDown,false);
window.addEventListener("click",handleClick,false);
}

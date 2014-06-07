// ==UserScript==
// @name           Game
// @namespace      http://userscripts.org/users/410104
// @include        http://tloes.com/
// @include        http://tloes.com/index.html
// @include        http://www.tloes.com/
// @include        http://www.tloes.com/index.html
// ==/UserScript==
var pictures = new Array();
pictures[0] = "http://thedownloader.24.eu/pics/gamebgsmall.jpg";
pictures[1] = "http://4.bp.blogspot.com/_9Fa6T_eXKHc/SIc8hhbgC_I/AAAAAAAAAFA/9P4queZn5Ak/s320/Striped%2Banastamos%2B%28Anostomus%2Banostomus%29%2B%2BHead%2BStander.JPG";
pictures[2] = "http://thedownloader.24.eu/pics/gamebg2.jpg";
pictures[3] = "http://i43.tinypic.com/11bjfwy.jpg";
pictures[4] = "http://i39.tinypic.com/i3ysyt.jpg";
pictures[5] = "http://i.imgur.com/jzZ7O.jpg";
pictures[6] = "http://oi41.tinypic.com/2nulkwy.jpg";
pictures[7] = "http://i43.tinypic.com/2qwzpsx.png";
pictures[8] = "http://i42.tinypic.com/308kz8m.png";
pictures[9] = "http://i39.tinypic.com/op9pxk.png";
pictures[10] = "http://4.bp.blogspot.com/-3ORf44P2D9M/TaiJMTSAdBI/AAAAAAAACxo/_I-eafZuvTY/s1600/funny+flying+cat.jpg";
var container, style, bodyimg, bodystyle, targimg, targstyle, score, bg, bgurl;
var init = function()
{
document.body.childNodes[1].childNodes[1].childNodes[2].childNodes[0].setAttribute("width", "670px");
bodyimg = document.createElement('img');
bodyimg.setAttribute("id", "bodyimg");
bodyimg.setAttribute("name", "0 0");
bodyimg.setAttribute("src", "http://thedownloader.24.eu/pics/hero.png");
bodystyle = document.createElement('style');
bodystyle.innerHTML = "img#bodyimg\n{\nmargin-top: 0px;\nmargin-left: 0px;\n}";
targimg = document.createElement('img');
targstyle = document.createElement('style');
targstyle.innerHTML = "";
bgurl = pictures[0];
bg = document.createElement('img');
bg.setAttribute("id", "bg");
bg.setAttribute("height", "190px");
bg.setAttribute("width", "242px");
bg.setAttribute("src", bgurl);
container = document.createElement('div');
container.setAttribute("id", "snakediv");
score = document.createElement('p');
score.setAttribute("id", "score");
score.innerHTML = "0";
container.appendChild(score);
container.appendChild(bodyimg);
var courtesy = document.createElement('p');
courtesy.setAttribute("id", "courtesy");
courtesy.innerHTML = "courtesy of TheBlu";
window.setTimeout(newTarg, 1);
style = document.createElement('style');
style.innerHTML = "div#snakediv\n{\nmargin-top: -190px;\ncursor: default;\n-moz-user-select: -moz-none;\nfloat: right;\nwidth: 240px;\nheight: 180px;\n}\ndiv#header\n{\n-moz-user-select: -moz-none;\n}\ndiv#snakediv>img#targimg\n{\nposition: absolute;\nwidth: 20px;\nheight: 20px;\nz-index: 2;\nopacity: 0.7;\nfilter: alpha(70);\n}\ndiv#header>img#bg\n{\nopacity: 0.4;\nfilter: alpha(40);\n}\ndiv#snakediv>img#bodyimg\n{\nposition: absolute;\nwidth: 20px;\nheight: 20px;\nz-index: 20;\n}\ndiv#snakediv>p#score\n{\nmargin-top: 0px;\nfloat: right;\nmargin-right: 10px;\nposition: relative;\ncolor: #EEDD00;\nfont-family: Hobo Std;\nfont-weight: bold;\nfont-size: 16px;\nz-index: 80;\n}\ndiv#header>p#courtesy\n{\ncursor: default;\n-moz-user-select: -moz-none;\nposition: absolute;\nmargin-top: -2%;\nmargin-left: 70%;\ncolor: #8080DD;\nfont-family: MS Dialog;\nfont-size: 8px;\nz-index: 80;\nopacity: 0.2;\nfilter: alpha(20);\n}";
document.head.appendChild(style);
document.head.appendChild(bodystyle);
document.head.appendChild(targstyle);
document.body.childNodes[1].childNodes[1].appendChild(bg);
document.body.childNodes[1].childNodes[1].appendChild(container);
document.body.childNodes[1].childNodes[1].appendChild(courtesy);
};
var move = function(e)
{
if (window.event)
{
e = window.event;
}
if(e.keyCode == 38 && (parseInt(bodyimg.getAttribute("name").split(" ")[0], 10) - 20) >= 0)
{
bodyimg.setAttribute("name",  (parseInt(bodyimg.getAttribute("name").split(" ")[0], 10) - 20) + " " + bodyimg.getAttribute("name").split(" ")[1]);
}
if(e.keyCode == 39 && (parseInt(bodyimg.getAttribute("name").split(" ")[1], 10) + 20) <= 220)
{
bodyimg.setAttribute("name", bodyimg.getAttribute("name").split(" ")[0] + " " + (parseInt(bodyimg.getAttribute("name").split(" ")[1], 10) + 20));
}
if(e.keyCode == 40 && (parseInt(bodyimg.getAttribute("name").split(" ")[0], 10) + 20) <= 160)
{
bodyimg.setAttribute("name",  (parseInt(bodyimg.getAttribute("name").split(" ")[0], 10) + 20) + " " + bodyimg.getAttribute("name").split(" ")[1]);
}
if(e.keyCode == 37 && (parseInt(bodyimg.getAttribute("name").split(" ")[1], 10) - 20) >= 0)
{
bodyimg.setAttribute("name", bodyimg.getAttribute("name").split(" ")[0] + " " + (parseInt(bodyimg.getAttribute("name").split(" ")[1], 10) - 20));
}
bodystyle.innerHTML = "img#bodyimg\n{\nmargin-top: " + bodyimg.getAttribute("name").split(" ")[0] +"px;\nmargin-left: " + bodyimg.getAttribute("name").split(" ")[1] + "px;\n}";
if(bodyimg.getAttribute("name").split(" ")[0] == targimg.getAttribute("name").split(" ")[0] && bodyimg.getAttribute("name").split(" ")[1] == targimg.getAttribute("name").split(" ")[1])
{
var randurl = pictures[Math.floor(Math.random()*pictures.length)];
if(Math.round((parseInt(score.innerHTML, 10)/100)+0.2) == ((parseInt(score.innerHTML, 10)/100)+0.2))
{
while(bgurl == randurl)
{
randurl = pictures[Math.floor(Math.random()*pictures.length)];
}
bgurl = randurl;
bg.setAttribute("src", bgurl);
}
window.setTimeout(die, 1);
}
if(e.keyCode == 40)
{
e.preventDefault();
e.returnValue = false;
}
};
var newTarg = function()
{
targimg.setAttribute("id", "targimg");
targimg.setAttribute("name", (Math.floor(Math.random()*6)*20) + " " + (Math.floor(Math.random()*9)*20));
while(Math.abs(parseInt(targimg.getAttribute("name").split(" ")[0], 10)-parseInt(bodyimg.getAttribute("name").split(" ")[0], 10)) <= 20 || Math.abs(parseInt(targimg.getAttribute("name").split(" ")[1], 10)-parseInt(bodyimg.getAttribute("name").split(" ")[1], 10)) <= 20)
{
targimg.setAttribute("name", (Math.floor(Math.random()*6)*20) + " " + (Math.floor(Math.random()*9)*20));
}
targimg.setAttribute("src", "http://thedownloader.24.eu/pics/bit.png");
targstyle.innerHTML = "img#targimg\n{\nmargin-top: " + targimg.getAttribute("name").split(" ")[0] +"px;\nmargin-left: " + targimg.getAttribute("name").split(" ")[1] + "px;\n}";
container.appendChild(targimg);
};
var size = 0;
var die = function()
{
size += 20;
if(size < 200)
{
targstyle.innerHTML = "img#targimg\n{\nmargin-top: " + (parseInt(targimg.getAttribute("name").split(" ")[0], 10)-size/2.4) + "px;\nmargin-left: " + (parseInt(targimg.getAttribute("name").split(" ")[1], 10)-size/2.4) + "px;\nwidth: " + size + "px !important;\nheight: " + size + "px !important;\nopacity: " + (10/size) + " !important;\nfilter: alpha(" + 10000/size + ") !important;\n}";
window.setTimeout(die, 20);
}
else if(size == 200)
{
container.removeChild(targimg);
targstyle.innerHTML = "";
score.innerHTML = parseInt(score.innerHTML, 10)+20;
window.setTimeout(newTarg, 1);
size = 0;
}
};
window.addEventListener("load",init,false);
window.addEventListener("keydown",move,false);

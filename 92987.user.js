// ==UserScript==
// @name           Winterfy Newgrounds
// @namespace      com.oldsage10.scripts.ng
// @include        http://*.newgrounds.com/*
// ==/UserScript==

var loc = document.location.href;

var itemColor = '#9EBBFF';
var selectColor = '#BBD9FF';
var whiteColor = '#FFFFFF';
var goldColor = '#FF9900';
var blackColor = '#000000';
var brightColor = '#C8DEFF';

var formButtonL = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-buttonL.gif)';
var formButtonR = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-buttonR.gif)';
var formInput = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-input.gif)';
var textAreaBackground = 'url(http://www.newgrounds.com/dump/download/1475807b21fd91efafe5c8f13586b123)';


if(loc.indexOf('newgrounds.com') != -1)
{
var links = document.getElementsByTagName('a');

for(var l=0; l<links.length; l++)
{
var link = links[l];
var linkParent = link.parentNode.className;
if(linkParent != 'btn' && linkParent != 'btn bbs_search' && linkParent != 'btn col' && linkParent != 'btn kill' && linkParent != 'fin' && linkParent != 'link' && linkParent !='game' && linkParent != 'movie' && link.className != 'moderator' && link.className != 'administrator')
{
link.style.color = itemColor;
}
if(linkParent == 'movie')
{
link.style.color = whiteColor;
link.style.backgroundImage = greenBackground;
link.style.backgroundRepeat = 'repeat-y';
}
if(linkParent == 'game')
{
link.style.color = goldColor;
link.style.backgroundImage = redBackground;
link.style.backgroundRepeat = 'repeat-y';
}
}

var ftitles = document.getElementsByClassName('ftitle');

for(var ft=0; ft<ftitles.length; ft++)
{
var ftitle = ftitles[ft];
ftitle.style.color = itemColor;
ftitle.parentNode.style.color = whiteColor;
}

var fblurbs = document.getElementsByClassName('fblurb');

for(var fb=0; fb<fblurbs.length; fb++)
{
var fblurb = fblurbs[fb];
fblurb.style.color = itemColor;
}

var h1s = document.getElementsByTagName('h1');

for(var he1=0; he1<h1s.length; he1++)
{
var h1 = h1s[he1];
h1.style.color = itemColor;
}

var h2s = document.getElementsByTagName('h2');

for(var he2=0; he2<h2s.length; he2++)
{
var h2 = h2s[he2];
h2.style.color = itemColor;
}

var h3s = document.getElementsByTagName('h3');

for(var he3=0; he3<h3s.length; he3++)
{
var h3 = h3s[he3];
h3.style.color = itemColor;
}

var h4s = document.getElementsByTagName('h4');

for(var he4=0; he4<h4s.length; he4++)
{
var h4 = h4s[he4];
h4.style.color = brightColor;
}

var buttons = document.getElementsByTagName('span');

for(var btn=0; btn<buttons.length; btn++)
{
var button = buttons[btn];
if(button.className == 'btn' || button.className == 'btn bbs_search' || button.className == 'btn col' && button.className != 'button')
{
var blink = button.getElementsByTagName('a')[0];
blink.style.backgroundImage = formButtonL;
button.style.backgroundImage = formButtonR;
}
}

var inputs = document.getElementsByTagName('input');

for(var i=0; i<inputs.length; i++)
{
var input = inputs[i];
input.style.backgroundImage = formInput;
}

var selects = document.getElementsByTagName('select');

for(var s=0; s<selects.length; s++)
{
var select = selects[s];
// select.className = '';
select.style.backgroundColor = selectColor;
select.style.color = blackColor;
// select.style.float = 'left';
}

var yellows = document.getElementsByClassName('yellow');

for(var y=0; y<yellows.length; y++)
{
var yellow = yellows[y];
yellow.style.color = brightColor;
}

var forums = document.getElementsByClassName('link');

for(var fo=0; fo<forums.length; fo++)
{
var forum = forums[fo];
var head = forum.getElementsByTagName('a')[0].getElementsByTagName('strong')[0];
head.style.color = itemColor;
}

var textareas = document.getElementsByTagName('textarea');

for(var ta=0; ta<textareas.length; ta++)
{
var textarea = textareas[ta];
textarea.style.backgroundImage = textAreaBackground;
textarea.style.backgroundColor = itemColor;
}

var flashbbs = document.getElementsByClassName('fbbsline1');

for(var flb=0; flb<flashbbs.length; flb++)
{
var flashdisplay = flashbbs[flb];
flashdisplay.getElementsByTagName('strong')[0].style.color = itemColor;
flashdisplay.getElementsByTagName('strong')[1].style.color = itemColor;
}
}

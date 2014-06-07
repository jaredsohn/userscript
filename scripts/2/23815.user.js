// ==UserScript==
// @name           ols.net shoutbox tweaks
// @namespace      http://localhost/
// @description    Say hello to a much better shoutbox.
// @include        http://www.outlawstar.net/forums/index.php
// ==/UserScript==

// let's do the easy thing first, changing the height of the shoutbox.
var shout=document.getElementById("vbshout");
shout.style.height="250px";

// now comes the more difficult task: putting the shoutbox's input box on a
// table row by itself.
// we can nodewalk from shout to find the parent table row
var shoutbargrandparent=shout.parentNode.childNodes[5];
var shoutbarparent=shoutbargrandparent.childNodes[1];
var shoutbar=shoutbarparent.childNodes[0];
var firstrow=shoutbar.childNodes[1].innerHTML;
var secondrow=shoutbar.childNodes[3].innerHTML;

conglomerate=document.createElement("tbody");
newrow1=document.createElement("tr");
newrow2=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
td1.innerHTML=firstrow;
td2.innerHTML=secondrow;
newrow1.appendChild(document.createTextNode(""));
newrow1.appendChild(td1);
newrow1.appendChild(document.createTextNode(""));
newrow2.appendChild(document.createTextNode(""));
newrow2.appendChild(td2);
newrow2.appendChild(document.createTextNode(""));
newrow2.setAttribute("align","center");
conglomerate.appendChild(document.createTextNode(""));
conglomerate.appendChild(newrow1);
conglomerate.appendChild(document.createTextNode(""));
conglomerate.appendChild(newrow2);
conglomerate.appendChild(document.createTextNode(""));
shoutbargrandparent.replaceChild(conglomerate,shoutbarparent);

// since replacing all that crap up above invalidates shoutbargrandparent, and
// therefore shoutbarparent and shoutbar, I need to get a new reference so I can
// modify the input box.  Luckily, shout is still valid, so let's nodewalk from
// it.
var input=shout.parentNode.childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[1]; // lol, that's a lot of nodewalking...  but it works!
input.style.width="99.5%";

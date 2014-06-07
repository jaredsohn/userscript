// ==UserScript==
// @name        Paranatural Navigation Improvements
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://paranatural.net/*
// @version     1.0
// @description Makes the arrow keys control movement.
// ==/UserScript==


if(document.getElementsByClassName('menunav-next')[0].innerHTML.trim() != "")//so if the menunav-next div is not empty, get the next link. Otherwise, blank.
{
    var patt =/href="(.*)" rel/g;
    //http://xkcd.com/1171/
    //Actually the oposite of that. I couldn't slect the link node. It just pretended to be text. I don't know why.
    var result = patt.exec(document.getElementsByClassName('menunav-next')[0].innerHTML);
	var navNext = result[1];
}
else
{
	var navNext = ""
}

if(document.getElementsByClassName('menunav-prev')[0].innerHTML.trim() != "") //Same
{
    var patt =/href="(.*)" rel/g;
    var result = patt.exec(document.getElementsByClassName('menunav-prev')[0].innerHTML);
	var navPrev = result[1];
}
else
{
	var navPrev = ""
}

//This creats a div to put the alt text in below the comic.

var alt = document.createElement("div");
alt.innerHTML = document.getElementById('comic-1').childNodes[0].title;
alt.setAttribute('id',"alt-text");
document.getElementById("content").parentNode.insertBefore(alt, document.getElementById("content"));


//This deals with the arrows.
function leftArrowPressed() {
	window.location = navPrev;
}

function rightArrowPressed() {
	window.location = navNext;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};
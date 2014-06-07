// ==UserScript==
// @name        Dragcave egg monitor
// @namespace   http://localhost
// @description Monitor the location page and catch the egg you want.
// @include     http://dragcave.net/locations/*
// @version     1
// @grant	none
// ==/UserScript==
var container = document.getElementsByClassName("eggs");
for (var l = 0; l < container.length; l++) {
    container[l].setAttribute('id', 'eggs');
    var eggs = document.getElementById("eggs");
    var divs = eggs.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
	// See how the pattern goes and update the text for new releases and all the good stuff ^_^
        if ((divs[i].innerHTML.indexOf("belong") != -1) || (divs[i].innerHTML.indexOf("Leetle") != -1) || (divs[i].innerHTML.indexOf("beautiful glow") != -1) || (divs[i].innerHTML.indexOf("cheese") != -1) || (divs[i].innerHTML.indexOf("metallic") != -1) || (divs[i].innerHTML.indexOf("much smaller") != -1) || (divs[i].innerHTML.indexOf("icicles") != -1) || (divs[i].innerHTML.indexOf("too hot") != -1) || (divs[i].innerHTML.indexOf("your hair stands") != -1) || (divs[i].innerHTML.indexOf("paper") != -1) || (divs[i].innerHTML.indexOf("rough—yet shiny—shell") != -1)) { 
            var div = divs[i];
            var link = divs[i].innerHTML.href;
            for (var b = 0; b < div.childNodes.length; b++) {
                var test = div.childNodes[0].href;
                //window.location.href = test;
				open_in_new_tab(test);
            }
        }
    }
}

setTimeout(function () { window.location.href = window.location.href }, 500);

function open_in_new_tab(url )
{
  var win=window.open(url, '_blank');
  win.focus();
}
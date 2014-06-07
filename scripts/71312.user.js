// ==UserScript==

// @name           Build Millions of Storage Space

// @namespace      apache1990.dod.net

// @description    Allows you to build storage at your colonies in units of 1 million.

// @include        *.war-facts.com/buy_storage.php?colony=*

// ==/UserScript==

/*
It adds 6 zeros to the end of what you type in, not to
complex.
*/

function doMillions(){
	addstorage.value = addstorage.value + "000000";
	document.getElementsByTagName("form")[0].submit();
}

//write stuff
var button = document.createElement('input');
button.setAttribute("onClick", "{addstorage.value = parseFloat(addstorage.value) * 1000000;document.getElementsByTagName('form')[0].submit();}");
button.setAttribute("class", "info");
button.setAttribute("value", "Build Millions");
button.setAttribute("type", "button");
button.appendChild(document.createTextNode("Build Millions"));
document.getElementsByTagName("form")[0].insertBefore(button, null);
var GMSU_meta_159801 = <><![CDATA[
// ==UserScript==
// @name        Centre Leo Dictionaries
// @include     http://dict.leo.org/*
// @description Centre the webpage of Leo dictionaries
// @grant       none
// @version     0.1
// ==/UserScript==
]]></>;
GMSU.init(159801);

function removeElementById(element){
	var returnElement = document.getElementById(element).parentNode.removeChild(document.getElementById(element));
	return returnElement;
}

removeElementById("rightColumn");
removeElementById("topMenu");
removeElementById("adv-banner");
document.getElementById("leftColumn").parentNode.replaceChild(removeElementById("right"),document.getElementById("leftColumn"));

document.getElementById("body").style.margin="0 auto";

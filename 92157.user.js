// ==UserScript==
// @name        BRPG Autoclicker
// @description Clicks the button when the timer runs up
// @include     http://www.boringrpg.com/game
// @author      A friendly Anon
// ==/UserScript==


function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName)
		return node.getElementsByClassName(classname);
}

function checkButton(){
	if(document.getElementById('button').getElementsByTagName('span')[0].innerHTML.indexOf("<u>now</u>") >= 0){
		document.getElementsByClassName('play')[0].click();
	}
	var tmp = window.setTimeout (function () {
		var tmp2 = checkButton();
	}, 10000);

}

var lol = checkButton();
// ==UserScript==
// @name        BRPG Guildclicker
// @description Clicks the button when the timer runs up
// @include     http://www.boringrpg.com/guild
// @author      A friendly Anon
// ==/UserScript==

function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName)
		return node.getElementsByClassName(classname);
}

function checkButton(){
	
	if(document.getElementById('button').getElementsByTagName('span')[0].innerHTML.indexOf("<u>now</u>") >= 0
		&& document.getElementById('sidebar').getElementsByTagName('h2')[0].innerHTML 
		!= document.getElementsByClassName('alignright')[0].getElementsByClassName('guildright')[3].innerHTML
		){
		document.getElementsByClassName('play')[0].click();
	}
	var tmp = window.setTimeout (function () {
		//refresh to get newest clicker
		window.location.href = 'http://www.boringrpg.com/guild';
		//var tmp2 = checkButton();
	}, 10000);
}

var lol = checkButton();
// ==UserScript==
// @name           BoringRPG Bot Plus
// @namespace      BoringRPG Bot Plus
// @description    BoringRPG Bot Plus
// @include        http://www.boringrpg.com/game
// @Author         Mike Richards, modified from Jordy Kroeze's implementation
// ==/UserScript==
var t;

function getElementsByClassName(node,classname) {
	if (node.getElementsByClassName)
		return node.getElementsByClassName(classname);
}

function doStuff(){
	if(document.title.indexOf("Boring RPG") == 0){
		t = setTimeout(function(){doStuff();},1000);
	}
	else if(document.getElementsByTagName('span')[0].innerHTML.indexOf("<u>now</u>") >= 0){
		document.getElementsByClassName('play')[0].click();
		doStuff();
	}
	else
	{
		var title = document.title;
		var colonLoc = title.indexOf(":");
		var minutes = title.substring(0, colonLoc);
		var seconds = title.substring(colonLoc + 1, colonLoc + 3);
		var minutesInt = parseInt(minutes);
		var secondsInt = parseInt(seconds);
		t = setTimeout("location.reload(true)",minutesInt * 60000 + 1000 * secondsInt + 2000);
	}
}
doStuff();
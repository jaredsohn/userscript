// ==UserScript==
// Open Smilies v1.2
// (c) 2006 by Patric Peters <me@papet.de>
// (c) 2008 by golloza
// 
// @name          Open Smilies
// @namespace	  http://www.papet.de
// @description   Open Smilies
// @version	  1.3 (12.07.2008)
// @include       http://82.149.226.131/bb/newreply.php*
// @include       http://forum.counter-strike.de/bb/newreply.php*
// @include       http://forum.cstrike.de/bb/newreply.php*
// @include       http://forum.mods.de/bb/newreply.php*
// @include       http://82.149.226.131/bb/editreply.php*
// @include       http://forum.counter-strike.de/bb/editreply.php*
// @include       http://forum.cstrike.de/bb/editreply.php*
// @include       http://forum.mods.de/bb/editreply.php*
// @include       http://82.149.226.131/bb/newthread.php*
// @include       http://forum.counter-strike.de/bb/newthread.php*
// @include       http://forum.cstrike.de/bb/newthread.php*
// @include       http://forum.mods.de/bb/newthread.php*
// ==/UserScript==
function conprom (e) {
  GM_setValue("custsmilies", (prompt('URLs zu den Custom Smilies; mit "," trennen',GM_getValue("custsmilies"))));
}
GM_registerMenuCommand("Custom Smilies", conprom);

var tds = document.getElementsByTagName("td");
if(window.location.href.match(/newthread/i))
{
	var index  = 72;
}
else if(window.location.href.match(/newreply/i))
{
	var index = 70;
}
else if(window.location.href.match(/editreply/i))
{
	var index = 69;
}


tds[index].innerHTML = tds[index].innerHTML + '<br /><img src="./img/smilies/icon12.gif" onClick="Javascript:addText(\':(\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon7.gif" onClick="Javascript:addText(\':)\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/banghead.gif" onClick="Javascript:addText(\':bang:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/confused.gif" onClick="Javascript:addText(\':confused:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/biggrin.gif" onClick="Javascript:addText(\':D\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon15.gif" onClick="Javascript:addText(\':eek:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/freaked.gif" onClick="Javascript:addText(\':huch:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon13.gif" onClick="Javascript:addText(\':mad:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/mata.gif" onClick="Javascript:addText(\':mata:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/smiley-pillepalle.gif" onClick="Javascript:addText(\':moo:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon16.gif" onClick="Javascript:addText(\':o\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon2.gif" onClick="Javascript:addText(\':P\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon18.gif" onClick="Javascript:addText(\':roll:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/sceptic.gif" onClick="Javascript:addText(\':what:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/urgs.gif" onClick="Javascript:addText(\':wurgs:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon1.gif" onClick="Javascript:addText(\':zyklop:\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon8.gif" onClick="Javascript:addText(\':|\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/wink.gif" onClick="Javascript:addText(\';)\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon5.gif" onClick="Javascript:addText(\'^^\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/smilies/icon12.gif" onClick="Javascript:addText(\'[img][/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/thumbsdown.gif" onClick="Javascript:addText(\'[img]./img/icons/thumbsdown.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/thumbsup.gif" onClick="Javascript:addText(\'[img]./img/icons/thumbsup.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/pfeil.gif" onClick="Javascript:addText(\'[img]./img/icons/pfeil.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/icon9.gif" onClick="Javascript:addText(\'[img]./img/icons/icon9.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/icon10.gif" onClick="Javascript:addText(\'[img]./img/icons/icon10.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="./img/icons/icon6.gif" onClick="Javascript:addText(\'[img]./img/icons/icon6.gif[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="http://www.abload.de/img/herz2nvm.png" onClick="Javascript:addText(\'[img]http://www.abload.de/img/herz2nvm.png[/img]\',document.forms[1]);" style="cursor:pointer;"> <img src="http://www.abload.de/img/herz_schattengdx.png" onClick="Javascript:addText(\'[img]http://www.abload.de/img/herz_schattengdx.png[/img]\',document.forms[1]);" style="cursor:pointer;">';
if(GM_getValue("custsmilies") != null)
{
	var insert = "<br />";
	var custom = GM_getValue("custsmilies").split(',');
	var i = 0;
	while(i < custom.length)
	{
		insert = insert + '<img src="'+custom[i]+'" onClick="Javascript:addText(\'[img]'+custom[i]+'[/img]\',document.forms[1]);" style="cursor:pointer;"> ';
		i++;
	}
	tds[index].innerHTML = tds[index].innerHTML + insert;
}

// ==UserScript==
// @name           CSETESH
// @description    Chatbox de l'alliance SETH - serveur delta
// @version        0.3
// @include        http://s4.ikariam.fr/*
// @include        http://nubt.forum7.biz/*
// @exclude        http://nubt.forum7.biz/smilies.forum*
// @exclude 	   http://nubt.forum7.biz/admin/* 
// @exclude        http://nubt.forum7.biz/msg.forum*
// @exclude        http://sethani.hostarea.org/modules/commonlib/common-direct-rss.php*
// @author         Qoph_SETH


// ==/UserScript==



var version="0.2";




unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-156px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:150px;position:absolute;top:0px;left:-0px;height:30px;">'
	+ '<div><p align="center"><a style="color: #f10707;" href="http://nubt.forum7.biz/index.html" target="_blank" title="forum"><img src="http://i49.servimg.com/u/f49/11/49/77/42/logo10.gif" height="90"><br/>La Maison de SETH</a> <br/> <a style="color: #f10707;" href="http://ikariamlibrary.com/?content=IkaFight" target="_blank">Simulateur</a> / <a style="color: #f10707;" href="http://sethani.hostarea.org/sec/" target="frame1">MapSETH</a><br/><a style="color: #f10707;" href="http://convertisseur-ikariam.fr.nf/" target="_blank">Convertiseur de RC</a> <br/> <a style="color: #f10707;"  target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_stadt" >Chercher Ville</a><br/><a style="color: #f10707;" href="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=59789" target="frame1" >chatbox</a> / <a style="color: #f10707;" href="http://sethani.hostarea.org/modules/commonlib/common-direct-rss.php" target="frame1" >sujets recents</a></p></div>'

	+ '<div id="shoutframe" style="position:absolute;top:175px;bottom:3px;righ:4px;left:3px;""><iframe id="frame1" name="frame1" src="http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox=59789" width="150" height="340" frameborder="0" allowtransparency="true"></iframe></div>'

	+ '<div style="width:155px;position:absolute;bottom:0px;left:0px;"></div>';

GM_addStyle("#shoutbar { background:url(http://sethani.hostarea.org/image/chatbox/fond312.jpg);padding-top:33px; width:155px; height:520px; position:absolute; left:0px; top:23px; border:none; z-index:50;");
GM_addStyle("#shouttab { background:url(http://sethani.hostarea.org/image/chatbox/chatbo10.gif); width:30px; height:100px; position:absolute; right:-25px; top:0px;} ");
GM_addStyle("#shouttab:click { left: 0px; } ");
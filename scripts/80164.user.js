// ==UserScript==
// @name           Cor Aut Mors CyberNations Chat
// @namespace     Cor Aut Mors 
// @description   Chat for the members of Cor Aut Mors
// @exclude        http://cybernations.net/login.asp
// @exclude        http://cybernations.net/login.asp?*
// @include        http://cybernations.net/*
// @include        http://*.cybernations.net
// @include        http://*.cybernations.net/*
// @include        http://*.Swordorder.com/
// @include        http://*.Swordorder.com/*
// @include        http://Swordorder.com/*
// @include        http://*.cybernations.net/*
// @require        http://code.jquery.com/jquery-latest.js
// @require        http://www.popoter.com/js/mbContainer.min.js
// @require        http://www.popoter.com/js/ui.core.min.js
// @require        http://www.popoter.com/js/ui.draggable.min.js
// @require        http://www.popoter.com/js/ui.resizable.min.js
// @require        http://www.popoter.com/js/jquery.metadata.js
// ==/UserScript==


//var container=document.getElementById('body_container');
var container=document.getElementsByTagName('body')[0]


console.log("Chat  Begin");


var ttCss = document.createElement('link');
ttCss.href="http://www.popoter.com/js/css/mbContainer.css";
ttCss.type="text/css";
ttCss.rel="stylesheet";
document.getElementsByTagName('head')[0].appendChild(ttCss);


var chatbox="<div class=\"container stiky draggable resizable\" style=\"width:350px;height:450px;top:170px;left:270px;position:absolute;\" icon=\"comment-edit-48x48.png\" buttons=\"i,m,c\"  iconized=\"true\">";
chatbox+="<table cellpadding=\"0\" cellspacing=\"0\" class=\"containerTable\">";
chatbox+="<tr class=\"top\">";
chatbox+="<td class=\"no\"> </td>";
chatbox+="<td class=\"n\"><a href=\"\">Cor Aut Mors Chat</a></td>";
chatbox+="<td class=\"ne\">&nbsp;</td>";
chatbox+="</tr>";
chatbox+="<tr class=\"middle\">";
chatbox+="<td class=\"o\"> </td>";
chatbox+="<td class=\"c\" >";
chatbox+="<!-- BEGIN CBOX - www.cbox.ws - v001 --><div id='cboxdiv' style='text-align: center; line-height: 0;'><div><iframe frameborder='0' width='100%' height='310' src='http://www6.cbox.ws/box/?boxid=193509&amp;boxtag=na56kl&amp;sec=main' marginheight='2' marginwidth='2' scrolling='auto' allowtransparency='yes' name='cboxmain' style='border:#DBE2ED 1px solid;' id='cboxmain'></iframe></div><div><iframe frameborder='0' width='100%' height='75' src='http://www6.cbox.ws/box/?boxid=193509&amp;boxtag=na56kl&amp;sec=form' marginheight='2' marginwidth='2' scrolling='no' allowtransparency='yes' name='cboxform' style='border:#DBE2ED 1px solid;border-top:0px' id='cboxform'></iframe></div></div><!-- END CBOX -->";
chatbox+="</td>";
chatbox+="<td class=\"e\"> </td>";
chatbox+="</tr>";
chatbox+="<tr class=\"bottom\">";
chatbox+="<td class=\"so\"> </td>";
chatbox+="<td class=\"s\"></td>";
chatbox+="<td class=\"se\"> </td>";
chatbox+="</tr>";
chatbox+="</table>";
chatbox+="</div>";


console.log("Chat  box defined");

container.innerHTML = container.innerHTML + chatbox;

console.log("Chat  Inserted");


$(function(){
	$(".container").buildContainers({
		containment:"document",
		elementsPath:"http://www.popoter.com/js/elements/"
	});
});

console.log("Chat mod container enabled");
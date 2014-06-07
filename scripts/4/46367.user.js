// ==UserScript==
// @name           Darwood team chat
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/home*
// @include        http://goallineblitz.com/game/forum*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==


var container=document.getElementById('body_container');

//var container=document.getElementsByTagName("body");

console.log("Chat  Begin");

var chatbox="<!-- BEGIN CBOX - www.cbox.ws - v001 --><div id='collapse' style='text-align: right; line-height: 0;position:relative;top:114px;margin:auto;height:15px;display:block;z-index:1080'><a href='#toggle'>Show/hide</a></div><div id='cboxdiv' style='text-align: center; line-height: 0;position:relative;top:125px;left:0;z-index:10'><div><iframe frameborder='0' width='100%' height='300' src='http://www6.cbox.ws/box/?boxid=62404&amp;boxtag=xcfhlg&amp;sec=main' marginheight='2' marginwidth='2' scrolling='auto' allowtransparency='yes' name='cboxmain' style='border:#DBE2ED 1px solid;' id='cboxmain'></iframe></div><div><iframe frameborder='0' width='100%' height='75' src='http://www6.cbox.ws/box/?boxid=62404&amp;boxtag=xcfhlg&amp;sec=form' marginheight='2' marginwidth='2' scrolling='no' allowtransparency='yes' name='cboxform' style='border:#DBE2ED 1px solid;border-top:0px' id='cboxform'></iframe></div></div><!-- END CBOX -->";

console.log("Chat  box defined");

//container[0].innerHTML = container[0].innerHTML + chatbox;
container.innerHTML = chatbox + container.innerHTML;

console.log("Chat  Inserted");

//$(document).ready(function(){
    
	$("#collapse a").click(function () {
		  $("#cboxdiv").toggle("slow");
	});    

//});

//container.innerHTML = '<center><table><tr><td>' + chatbox + '</td><td>' + teamchat + '</td></tr></table></center>' + container.innerHTML
//container.innerHTML = '<center>' + chatbox + '</center>' + container.innerHTML
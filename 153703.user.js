// ==UserScript==
// @name         SSL2 On Kong
// @namespace   tag://kongregate
// @description  SSL2 on Kong changes to SSL2.COM
// @include     *kongregate.com/games/kChamp/shellshock-live-2*
// @version     1
// @author          Hummerz5
// @date            12.7.2012
// ==/UserScript==
var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
if(!document.getElementById("game")) return;

if(!dom.holodeck){
	var s = document.createElement("div");
	s.setAttribute("onclick","return window");
	dom = s.onclick();
}

var kong_html = "";
var fixed_kong_html = "";
var edited = "False";
var recent = 1;
function d(c){
	return document.getElementById(c);
}

function c(c){
	return document.getElementsByClassName(c);
}

function get_html(){
kong_html = document.getElementById("game_wrapper").innerHTML;
fixed_kong_html = kong_html.replace("&amp","&") // for some reason, & converts to &amp -- un-doing this.
kong_html = fixed_kong_html;
}


function add_command(){
	if(dom.holodeck){

		var holodeck = dom.holodeck;
		holodeck.addChatCommand("toggle", function(l, n){
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);
		if(edited=="False"){
 			get_html();
			document.getElementById("game_wrapper").innerHTML = '<object width="800" height="600" id="SSL2Loader" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">        <param value="always" name="allowScriptAccess">        <param value="http://shellshocklive2.com/media/SSL2Loader.swf" name="movie">        <param value="high" name="quality">        <param value="#000000" name="bgcolor">        <param value="always" name="allowScriptAccess">        <param value="direct" name="wmode">        <embed width="800" height="600" wmode="direct" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" name="SSL2Loader" bgcolor="#000000" quality="high" src="http://shellshocklive2.com/media/SSL2Loader.swf">        </object>';
		edited="True";
                                 }
                                else {
                           		document.getElementById("game_wrapper").innerHTML = kong_html;
                          		edited="False";
		}
			l.activeDialogue().kongBotMessage("Changing Shell Shock Live 2 Console Version ;)");
			return false;
		});
		holodeck.addChatCommand("reload", function(l, n) {
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);
		document.getElementById("game_wrapper").innerHTML = document.getElementById("game_wrapper").innerHTML;
   		l.activeDialogue().kongBotMessage("Reloading Game Window");
   		return false;
		});
		holodeck.addChatCommand("about", function(l, n) {
			var m = n.match(/^\/\S+\s+(\S+)/);
			var o = n.match(/^\/\S+\s+(\d+)\s+(\d+)(?:\s+(\d+))?/);		
		l.activeDialogue().kongBotMessage("Redirecting.");
		window.open("http://meme.uphero.com/");
		return false;
		});

	}
}

add_command();
// ==UserScript==
// @name          youkuautosize
// @include       *youku.com*
// @author         weiyc
// @version        1.0
// @description   youku player auto size.
// @require http://code.jquery.com/jquery-1.9.1.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// ==/UserScript==

var link = document.createElement("link");

link.href = "http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css";
link.type = "text/css";
link.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(link);

 $(function() {
 	GM_log(GM_getValue("playerh"));
 	GM_log(GM_getValue("playerw"));
 	GM_log(GM_getValue("playerl"));
 	GM_log(GM_getValue("playert"));
 	$( "#player" ).css("position","relative");
 	$( "#player" ).height(GM_getValue("playerh")==undefined?"600px":GM_getValue("playerh"));
 	$( "#player" ).width(GM_getValue("playerw")==undefined?"800px":GM_getValue("playerw"));
 	$( "#player" ).css("left",GM_getValue("playerl")==undefined?"0":GM_getValue("playerl"));
 	$( "#player" ).css("top",GM_getValue("playert")==undefined?"0":GM_getValue("playert"));
	$( "#player" ).resizable( {resize: function (event, ui)
		{
			//$( "#player" ).css("position","relative");
			GM_setValue("playerw",ui.size.width);
			GM_log(ui.size.width);
			GM_setValue("playerh",ui.size.height);
			GM_log(ui.size.height)
			$( "#player" ).css("position","relative");
		} });
	$( "#player" ).draggable({
	drag: function( event, ui ) 
	{
		$( "#player" ).css("position","relative");
		GM_setValue("playerl",$( "#player" ).css("left"));
		GM_log($( "#player" ).css("left"));
		GM_log(GM_getValue("playerl"));
		GM_setValue("playert",$( "#player" ).css("top"));
		GM_log($( "#player" ).css("top"));
		GM_log(GM_getValue("playert"));
	}
	});
	$( "#movie_player" ).css("width","99%");
	$( "#movie_player" ).css("height","98%")
	$( "#movie_player" ).css("margin","6px");
	$( "#movie_player" ).css("border","6px solid white");
});
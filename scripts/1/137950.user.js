// ==UserScript==
// @name           Remove Blue LOU Fog LGG
// @description    Removes that blue fog on lord of ultima from the top
// @namespace      Remove Fog LGG
// @author         LGG
// @icon		   http://i1170.photobucket.com/albums/r523/lordgreggreg/Screenshots/2012-07-07_12-04-45.png
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1
// ==/UserScript==
(function wrapper(){
var main = function mainFunc() {
var atempts = 0;
function waitForQX() {
	if (qx === undefined) {
		window.setTimeout(waitForQX, 5000);
	} else {
		window.setTimeout(fixFog, 500);
	}
}
window.setTimeout(waitForQX, 5000);

function fixFog()
{
	atempts++;
	var found = false;
	$("div").each( function()
	{
		if ( $(this).css('background-image').toLowerCase().indexOf(
		'fx_distancefog.png' 
			)!=-1)
		{
			//alert("found");
			$(this).css("background-image", ""); 
			$(this).remove();
			found=true;
			return false;
		}
   });
   if(!found)if(atempts<3)window.setTimeout(fixFog, 500);
}
}
function injectLOUScript() {
	var jqscript = document.createElement("script");
	jqscript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	document.body.appendChild(jqscript);
	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);		
}
window.setTimeout(injectLOUScript, 100);
})();


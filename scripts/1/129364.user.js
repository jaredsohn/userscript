// ==UserScript==
// @name           Skip Teagames Load
// @namespace      http://www.facebook.com/jamey.macmillan
// @description    Skips past ads and loading when trying to play a teagames game. Also makes it easier to continue playing once you've pressed "play Again"
// @include        http://www.teagames.com/games/*/play.php*
// ==/UserScript==

if(document.getElementById("gameinfo")){
	document.getElementsByClassName("button_green")[0].click();
} else {
	if('undefined' == typeof teagamesEOS){
		(function page_scope_runner(){
			var my_src = "(" + page_scope_runner.caller.toString() + ")();";
			var script = document.createElement('script');
			script.setAttribute("type", "text/javascript");
			script.textContent = my_src;
			
			setTimeout(function(){
						document.body.appendChild(script);
						document.body.removeChild(script);
						}, 0);
		
		})();
	} else teagamesEOS();
	return;
}
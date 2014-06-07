// ==UserScript==
// @name           Hela Sverige
// @namespace      icaaq.com
// @description    Lägger till alternativet hela Sverige på första sidan
// @include        http://www.blocket.se/
// ==/UserScript==
(function() {
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'http://www.blocket.se/css/list.css?21602';
	cssNode.media = 'screen';
	cssNode.title = 'dynamicLoadedSheet';
	document.getElementsByTagName("head")[0].appendChild(cssNode);
	// Add jQuery  
		var GM_JQ = document.createElement('script');  
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';  
		GM_JQ.type = 'text/javascript';  
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

	// Check if jQuery's loaded  
	function GM_wait() {  
		if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); }  
		else {
			$ = unsafeWindow.jQuery; letsJQuery();
		}  
	}  
	GM_wait();

	// All your GM code must be inside this function  
	function letsJQuery() {
		var AreaListTbody = $(".AreaList tbody");
		var tableRow = "<tr><th align=\"right\">0</th><td><a href=\"http://www.blocket.se/li?ca=11_s&th=1&q=&cg=0&w=3\">Hela Sverige</a></td></tr>";
	    AreaListTbody.prepend(tableRow);
		
		var TableContent = $("#TableContent");
		var div = $("<div></div>");
		div.css("margin-top", "20px")
		div.load("http://www.blocket.se/li?ca=11_s&th=1&q=&cg=0&w=3 #search_form");
		TableContent.before(div);
	}
})();
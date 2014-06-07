// ==UserScript==
// @name           fatso highlight bluray
// @namespace      http://test.com
// @include        http://www.fatso.co.nz/*
// ==/UserScript==







// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 			window.setTimeout(GM_wait,100);
 	} else {
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}
GM_wait();




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



function letsJQuery() {
addGlobalStyle('.bluray { color:blue !important; font-weight: strong}');
addGlobalStyle('.notbluray { color:green; }');

	$("a.queueTitleLinks, a.movieTitleLinks").each(function(index, value){
		//alert(index+" = "+value.href);
		var href = value.href;
		var aftermid_index = href.indexOf("mid=");
		var aftermid = href.substring(aftermid_index+4,href.length);
		//alert(aftermid);
		var beforeand_index = aftermid.indexOf("&");
		var id = aftermid.substring(0, beforeand_index);
		//alert(id);
		$.get("/hover?"+id, function(data){
			//alert("got "+id);
			var bluray = (data.indexOf("(Blu-ray)") > 0);
			//alert("isblu "+id+" = "+bluray);
			if(bluray){
				value.className += " bluray";
			}else{
				value.className += " notbluray";
			}
		}, "html");
	});
}





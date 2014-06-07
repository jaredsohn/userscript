// ==UserScript==
// @name          Fade Sigs by Bob
// @namespace     https://wiki.endoftheinter.net/index.php/User:Bob
// @description	  This let's you fade out signatures so that they're not so distracting
// @author        Bob
// @version       3.0
// @homepage      ETI
// @include       *boards.endoftheinter.net/showmessages.php*
// @include 	  *links.endoftheinter.net/linkme.php?*
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { 
		
		$ = unsafeWindow.jQuery;
		$(document).ready(window.setInterval(letsJQuery,1000));
		letsJQuery();
		//unsafeWindow.document.watch("body", updatefunc);

		
	
	}
}

 //window.setInterval(letsJQuery,1000));
GM_wait();



// All your GM code must be inside this function
function letsJQuery() {
			//fade out signatures
		 $(".message:not(:has(img))").each(function(){
			if(!$(this).hasClass("fixed"))
			{
				
				var temphtml = this.innerHTML.split("---");
			
				if(temphtml.length ==2 && temphtml[0].indexOf("spoiler")==-1 && temphtml[0].indexOf("img")==-1)//two elements, body and sig
				{
	
					$(this).html(temphtml[0] + "<div style='opacity:0.5'> ---" + temphtml[1] + "</div>");
					
				}//endif
				
				$(this).addClass("fixed")
			
			}//end if has class
		 });//endfunction eachmessage signature fade
	//llmlSpoiler(document.body);
}

/*
$(document).ready(function(){
	if (document.addEventListener) {
	
		document.addEventListener("DOMNodeInserted", letsJQuery, false);
	
	}

}); 
*/
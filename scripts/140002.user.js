// ==UserScript==
// @name        alert
// @namespace   http://userscripts.org/users/478083
// @include     *
// @version     1
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();


function letsJQuery()
{
	function getSelText(){
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    } else {
        return txt;
    }
	return txt;
  }

     $(document).keydown( function (e) {
     var context= getSelText();
		 if(context=="")
			 return;
  
            if(e.altKey &&(e.keyCode==65)){
				       $("#injectbytaozi").remove();
					var GM_JQ = document.createElement('a');
					GM_JQ.setAttribute("href","http://s.etao.com/search?q="+context); 
					GM_JQ.setAttribute("id","injectbytaozi"); 
					GM_JQ.setAttribute("target","_blank"); 
					document.getElementsByTagName('body')[0].appendChild(GM_JQ);
					$("#injectbytaozi").get(0).click();
            } 
               
     });

}
// ==UserScript==
// @name       View cams on eyespyfx
// @namespace  None
// @version    1.04
// @grant       none
// @description  View some protect cams without passwords
// @match      http://*.eyespyfx.co.uk/player1.php*
// @copyright  2013+, None

// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/**
Change Log:
Date      Version    Notes
20130314  1.0.4      *auto refresh image fix.
20130314  1.0.3      *auto refresh image (dont work yet).
20130313  1.0.2      *fix problem list load.
20130313  1.0.1      *open cams.
**/

//wait for jQuery to be loaded
function waitForJquery(){
	if (typeof unsafeWindow.jQuery == 'undefined') {  
		window.setTimeout(waitForJquery, 100);
	} else {
		$ = unsafeWindow.jQuery;
		// remove ads and flash player
		$('.viewarchive').remove();
		$('.player_container').height(350);
		$('.player_content_bottom').remove();
	}
}
waitForJquery();	

// remove  links
function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
}
removeElement( document.getElementById('player_ads') );


// get url params
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


var id = getUrlVars()["id"];
var host = getUrlVars()["address"];

var wcam=document.getElementById("cam");

// show and refresh cam image
setInterval(function() {
        // image url
        var imgurl = 'http://'+ host + ':8080/webcams2/Image?id=' + id + '&amp;path=webcams&amp;user=a&amp;camid=1&amp;secure=false?' + new Date().getTime();
        wcam.innerHTML = '<img  src="' + imgurl + '">';
		}, 2000);
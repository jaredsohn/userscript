// ==UserScript==

// @name           Remove Ad on BT Yahoo! My Front Page

// @namespace      Remove BT Yahoo Ads
// @description    Remove Ad on BT Yahoo! My Front Page

// @include        http://home.bt.yahoo.com/*

// @author	   Charlie Love (http://www.dropdesign.co.uk)
// ==/UserScript==


function RemoveIt(strid){
       if (document.getElementById(strid)!=null){
	var elm = document.getElementById(strid) ;
	while (elm.childNodes.length >= 1) {
      		elm.removeChild(elm.firstChild);
	}
	elm.style.display="none";
        }
}


//========Yahoo=======
RemoveIt("ad-lrec") ;

var paragraphs = document.getElementsByTagName("a");

for (var i = 0; i < paragraphs.length; i++) {
	if (paragraphs[i].innerHTML == "Ad Feedback") {
		paragraphs[i].parentNode.style.display = "none";
	}
}


//========Live=========
window.setInterval(
function()
{
	
	RemoveIt("ad-lrec");
},1000);
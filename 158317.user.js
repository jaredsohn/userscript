// ==UserScript==
// @name    Facebook Redirect-Remover
// @description Removes the facebook-redirects of links to external sites. F/i changes "http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.youtube.com%2F..." to "http://www.youtube.com/..."
// @include https://www.facebook.com/*
// @include http://www.facebook.com/*
// @run-at document-start
// ==/UserScript==

// Might be improved... :)

var fbRedirectURL = "http://www.facebook.com/l.php?u=";
// ----------------------------------------------------

document.addEventListener('click', fixRedirect, false);

function fixRedirect(event){

	var node = event.target;
//	Not a loop, since 4 levels in DOM (at the target place) should be enough
	if(node.nodeName != "A"){
		node = node.parentNode;
		if(node.nodeName != "A"){
			node = node.parentNode;
			if(node.nodeName != "A"){
				node = node.parentNode;
			}
		}
	}

	if((node.nodeName == "A") && (node.href.indexOf(fbRedirectURL) == 0)){
		var realHref = node.href.replace(fbRedirectURL,"");	
		if(realHref != node.href){
			var refString = /&h=(.+)$/;
			realHref = realHref.replace(refString,"");	
		}	
		node.href = unescape(realHref);	
	}
}

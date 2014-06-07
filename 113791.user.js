// ==UserScript==
// @name           Asia Torrents Sign up fix
// @version        2.0
// @namespace      http://userscripts.org/users/407345
// @description    Removes ad on asiatorrents signup
// @include        http://www.asiatorrents.com/index.php?page=signup
// ==/UserScript==

// Removes the annoying box covering the view
document.body.childNodes[0].parentNode.removeChild(document.body.childNodes[0])
document.body.childNodes[0].parentNode.removeChild(document.body.childNodes[0])


// Removes all valueaffiliate.net scripts. Though this does not remove the scripts from memory... but maybe usefull anyway.
var i = 0;
var Scripts = document.getElementsByTagName("script");
var ScriptsNumber = Scripts.length;
while (i < ScriptsNumber) {
	try
	{
		if (Scripts[i].getAttribute("src").indexOf("valueaffiliate") != -1) {
			Scripts[i].parentNode.removeChild(Scripts[i]) //remove element by calling parentNode.removeChild()			
		}
	}
	catch(err)
	{
		//alert(err);
	}
	i++;
}


// Anti-Anti-Scrolling (looks ugly)
var MyScrollX = 1;
var MyScrollY = 1;
window.addEventListener('scroll',OnScrollHandler, false);
function OnScrollHandler(event) {
	try {	
		//if (window.scrollX == 0)
			//scroll(MyScrollX,MyScrollY);
		//else
		//	MyScrollX = window.scrollX;
			
		if (window.scrollY == 0)
			scroll(MyScrollX,MyScrollY);
		else
			MyScrollY = window.scrollY;
	}
	catch(err)
	{
		//alert(err);
	}

}

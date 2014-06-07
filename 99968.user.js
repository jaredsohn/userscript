// ==UserScript==
// @name           B&W2
// @namespace      Carlton2001
// @description    
// @include        http://*.ogame.*/game/index.php?*
// @exclude        http://*/game/index.php?page=empire*
// @version 0.1
// ==/UserScript==

(function(){
	if ( !unsafeWindow.$ ) return;
	
	
	myBody = document.getElementsByTagName("head")[0];
	myBodyElements = myBody.getElementsByTagName("link");

	for (var i=0; i<22; i++)
	{
			myBodyElements[0].parentNode.removeChild(myBodyElements[0]);
	}

//	var cssNode = document.createElement('link');
//	cssNode.type = 'text/css';
//	cssNode.rel = 'stylesheet';
//	cssNode.href = 'http://ogame.carlton2001.com/bw/bw.css';
//	cssNode.media = 'screen';
//	myBody.appendChild(cssNode);
	
})()
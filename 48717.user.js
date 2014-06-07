// ==UserScript==
// @name           Superbad Tankman Google
// @namespace      http://pto2k.blogspot.com
// @description    remember 8964 in a funny way
// @include        http://www.google.tld/
// @include        http://www.google.tld/webhp*
// @include        http://www.google.tld/search*
// ==/UserScript==

//album: http://picasaweb.google.com/picasa4peter/SuperbadTankMan?feat=directlink

function xpathOne (query) {
	try{queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);}catch(e){logToConsole(e)}
}
function xpath(query) {
	try{return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}catch(e){logToConsole(e)}
}

googleLogo = xpathOne("//img")

if (googleLogo) {
	googleLogo.title = 'Superbad Tankman'
	googleLogo.alt = googleLogo.title
	googleLogo.href = 'http://google.com'
	googleLogo.style['width']='auto'
	googleLogo.style['height']='auto'
	if(/search/.test(window.location.href)== true){
		googleLogo.src = 'http://lh5.ggpht.com/_5Au1751uAkg/Sgalq68TgFI/AAAAAAAACKw/9gxl4ubd7-M/s800/SuperBadTankMan01s.jpg'
	}else{
		googleLogo.src = 'http://lh6.ggpht.com/_5Au1751uAkg/SgaIrhuxm3I/AAAAAAAACJM/oosudciMlGM/s800/SuperBadTankMan.jpg'
		//googleLogo.src = 'http://lh6.ggpht.com/_5Au1751uAkg/SgaIyCFPwBI/AAAAAAAACJY/9z1pvK3Vjns/s800/SuperBadTankManBig.jpg' //large version
	}

}
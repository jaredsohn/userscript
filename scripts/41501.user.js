// ==UserScript==
// @name           google interstitial skipper
// @namespace      http://umezo.tsuyabu.in/
// @include        http://www.google.co.jp/search?*
// ==/UserScript==

function cleanLink( elem ){
	var a = elem.getElementsByTagName( "a" );
	for( var i = 0 , n = a.length ; i < n ; i++ ){ 
		a[i].href = a[i].href.replace('http://www.google.co.jp/interstitial?url=','');
		(function( aElem , orign){
			aElem.addEventListener( "click" , function (){
				aElem.href = orign ;
			} , false );
		})(a[i] , a[i].href );

	}
}
document.addEventListener('DOMNodeInserted', function(e){ cleanLink( e.target ) }, false);

cleanLink( document );

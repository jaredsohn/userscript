// ==UserScript==
// @name Facebook Chat FIX
// @description Muestra solo los amigos conectados en el chat de Facebook
// @author Maurikio
// @include http://facebook.com/*
// @include https://facebook.com/*
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf( ".facebook.com" ) + 1) == "facebook.com" ) )
css += "#chatFriendsOnline { display : block!important; } .item { display: none; } .active { display: block!important; }";
var heads = document.getElementsByTagName( "head" );
if (heads.length > 0) {
var node = document.createElement( "style" );
node.type = "text/css";
node.appendChild(document.createTextNode( css ));
heads[0].appendChild(node); 
}
})();


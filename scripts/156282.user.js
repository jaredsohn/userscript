// ==UserScript==
// @name          Starside
// @description   A Dark Theme for Bungie.net
// @version	  0.3
// @namespace     OcR Envy
// @include       http://bungie.net/*
// @include       http://www.bungie.net/*
// @include       http://bungie.com/*
// @include       http://www.bungie.com/*
// @include       https://bungie.net/*
// @include       https://www.bungie.net/*
// @include       https://bungie.com/*
// @include       https://www.bungie.com/*
// ==/UserScript==

function addStyle(style) {var head = document.getElementsByTagName("HEAD")[0];var ele = head.appendChild(window.document.createElement( 'style' ));   ele.innerHTML = style;   return ele;}
function addJQuery(callback) {var script = document.createElement("script");script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}

addStyle('@import "http://www.outcastreborn.com/bungie/starside.css";');
addJQuery(main);

function main() {
  setTimeout(function(){
  	jQuery(".externalLink").removeClass('externalLink').attr('target', '_blank');
  },500);
 jQuery(document).live('DOMNodeInserted', function(event){
  	jQuery(".externalLink").removeClass('externalLink').attr('target', '_blank');
  });
}
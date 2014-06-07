// ==UserScript==
// @name           Ultimate Guitar Favourites Link
// @namespace      http://fvds.frih.net/
// @description    Changes the My Account link to a Favourite Tabs link. Just a personal preference.
// @include        http://www.ultimate-guitar.com/*
// @include        http://ultimate-guitar.com/*
// ==/UserScript==

(function(){
  function getElementsByClassName(className, tag, elm){
  	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  	var tag = tag || "*";
  	var elm = elm || document;
  	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  	var returnElements = [];
  	var current;
  	var length = elements.length;
  	for(var i=0; i<length; i++){
  		current = elements[i];
  		if(testClass.test(current.className)){
  			returnElements.push(current);
  		}
  	}
  	return returnElements;
  }
  var node = getElementsByClassName('m1', 'a')[0];
  node.setAttribute('href', '/home/favorites/?tabs');
  node.childNodes[0].nodeValue = 'Favourite Tabs';
})();
// ==UserScript==
// @name           Twitter - Who Am I
// @namespace      http://twitter.com/lfp
// @description    Very simple way to display who you are, once logged in Twitter
// @include        http://twitter.com/*
// ==/UserScript==

// ***************
// Based on @jameswragg "Twitter - Follower" script
// ***************

(function(){

	// Some utility functions
	
	function makeEl(type, attObj){
		var elem = document.createElement(type);
        return attrs(elem, attObj);
	}
	
	function attrs(elem, attObj, isCSS){
		if ( elem.tagName && typeof(attObj) == 'object' ){
			for (att in attObj) {
				try{
					if( isCSS ){
						elem.style[att] = attObj[att];
					}else{
						elem[att] = attObj[att];
					}
				}catch(e){}
			}
		}
        return elem;		
	}

	
	var you = document.getElementById('profile_link').href.replace(/.*\//,'');
	var msgEl = makeEl('span', { innerHTML: ' (@'+you+')' });
	document.getElementById('profile_link').appendChild( msgEl );	
	
})(); // END!

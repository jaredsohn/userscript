// ==UserScript==
// @name           Twitter - Follower
// @namespace      http://twitter.com/jameswragg
// @description    From a users profile page there isn't a simple indication as to whether their following you or not. This fixes that.
// @version        0.4
// 
// @include        http://twitter.com/*
// @exclude        http://twitter.com/home
// @exclude        http://twitter.com/friends
// ==/UserScript==

// ***************
// Complete re-write after I realised that the follower status is right there staring me in the face! If you can DM them, they follow you.
// This script simply inserts a plain English indicator under the username.
// ***************

(function(){
	
	// Some utility functions
	
	function setCSS(elem, attObj){
		return attrs(elem, attObj, 'isCSS');
	}
	
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



	// are we on a users profile page & are we logged in? if so, let's go...
	
	if( (document.getElementsByTagName('body')[0].id == 'profile') && (document.getElementById('profile_link')) ){

			var you = document.getElementById('profile_link').href.replace(/.*\//,'');
			var them = document.getElementsByTagName('title')[0].text.replace(/Twitter \/ /g,'');
			var DM_available = false;
			var msg = them + ' doesn\'t follow you';
		
			if( ( you && them ) && ( you != them ) ){
				var sidelinks = document.getElementById('side').getElementsByTagName('a');
				for( x = 0; x < sidelinks.length; x++ ){
					if( sidelinks[x].href.match('direct_message') ){
						DM_available = true;
						break;
					}			
				}

				var title = document.getElementsByTagName('h2')[0];
				if (DM_available){
					msg = them + ' follows you';
				}
				var msgEl = makeEl('span', { innerHTML: msg });
				setCSS( msgEl, {fontSize:'11px', lineHeight:'1', display: 'block', fontWeight: 'normal' } );
				title.appendChild( msgEl );
			}
		
	}

})(); // END!

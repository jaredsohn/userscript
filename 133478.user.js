// ==UserScript==
// @id             forums.whirlpool.net.au-97d34589-8bb6-4925-9daf-149ba8452d1d@xf
// @name           WP User page no show contact
// @version        1.0
// @namespace      xf
// @author         
// @description    Hide Contact and About this user details for your own user page
// @include        http://forums.whirlpool.net.au/user/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/133478.user.js
// ==/UserScript==


if(document.querySelector('#left>.userinfo>dt>a').href==document.URL.split('?')[0]){

	var h2s = document.querySelectorAll('#userprofile div h2');

	h2s[0].style.cursor='pointer';
	h2s[0].setAttribute('title','Click to show');
	h2s[0].nextElementSibling.style.display='none';
	h2s[0].addEventListener( "click", function(e){
		var neTab=this.nextElementSibling;
		if(neTab.style.display=='none'){
			neTab.style.display='block';
		}
		else{
			neTab.style.display='none';
		}
	}, false );


	h2s[1].style.cursor='pointer';
	h2s[1].setAttribute('title','Click to show');
	h2s[1].nextElementSibling.style.display='none';
	h2s[1].addEventListener( "click", function(e){
		var neTab=this.nextElementSibling;
		if(neTab.style.display=='none'){
			neTab.style.display='block';
		}
		else{
			neTab.style.display='none';
		}
	}, false );

}
// ==UserScript==
// @name           Plurk "CSS lopas"
// @namespace      http://www.plurk.com/
// @include        http://www.plurk.com/*
// @author         24kpwn
// @version        0.1
// ==/UserScript==
// v0.1 : 2009.08.23 : Béta.

(function (window) {
   
    if(!window.$('top_bar')) window.TopBar.init();
    var bar = window.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = window.TopBar.createItem('CSS "lopás"', 'CSS "lopás"', function() {
if(w=prompt('Írd be a felhasználó userid-jét (avatarból kiderítheted :) ):','')){top.location.href='http://www.plurk.com/Users/getCustomCss?user_id='+w;}  
    });
    element.removeChild(element.firstChild);
    bar.appendChild(element);
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);

// Toggle JapersRink Comments
// version 1.0
// 2010.03.16
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ultimate SBN", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Toggle JapersRink Comments
// @namespace      none
// @description    Show and hide JapersRink user comments with a single click
// @include        http://www.japersrink.com/*
// @author		   TFG
// ==/UserScript==



//Sets refresh speed (in milliseconds) - 10000 milliseconds = 10 seconds.
refreshspeed = 10000;

//The phrase used for the link. Default is "Toggle" - you can change it on the next line.
var word = "Toggle";

addToggle();

function addToggle(){
	var navbar = document.getElementsByTagName("span"); 

	for(i = 0; i < navbar.length; i++){

		
		if( navbar[i].className == 'cactions'){
			var code = document.createElement('span');
			var jpId = navbar[i].parentNode.parentNode.getAttribute('id');
			
			commentId = jpId.substring(14,jpId.length);
			
			
			
			code.innerHTML = '<a href="#">' + word + '</a>';
			code.setAttribute('onClick','SBN.Comments.toggleComment("comment_body_' + commentId + '"); return false');
			code.id = 'toggle' + commentId;
				if(!document.getElementById(code.id)){
					
					
					var picElement = navbar[i].parentNode.parentNode;
					picElement.setAttribute('style', 'overflow:hidden;');
					navbar[i].parentNode.parentNode.childNodes[1]= picElement;
					
					navbar[i].appendChild(code);
				}
			
		}

	}

}
setInterval(addToggle,refreshspeed);
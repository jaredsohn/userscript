// ==UserScript==
// @name           KTH Links
// @author         scryes
// @namespace      all
// @description    Some nice links at the startpage for kth.se.
// @include        http://www.kth.se/
// @version        0.1
// @date           2007-12-07
// ==/UserScript==

var box2 = document.getElementById( "mainnavigation" );
	var box1 = document.getElementById( "secondary" );
	box2.removeChild( box1 );
	
	var secondary = document.createElement( "div" );
		secondary.setAttribute( "id", "secondary" );
		secondary.style.paddingLeft = "20px;";
		secondary.style.width = "210px;";
		
		var linkbox = document.createElement( "ui" );
			linkbox.setAttribute( "class", "linkSet" );
			
			// First link if for logging into your personal pages.
			var link1 = document.createElement( "li" );
				var link1a = document.createElement( "a" );
					link1a.setAttribute( "href", "https://www.kth.se/student/minasidor/index.jsp" );
					link1a.innerHTML = "Mina sidor";
				link1.appendChild( link1a );
			linkbox.appendChild( link1 );
			
			// Second link is for logging into your KTH mail.
			var link2 = document.createElement( "li" );
				var link2a = document.createElement( "a" );
					link2a.setAttribute( "href", "https://webmail.sys.kth.se/" );
					link2a.innerHTML = "Webmail";
				link2.appendChild( link2a );
			linkbox.appendChild( link2 );
			
			// Add more links here if you want. Just copy a "block" above and modify it
			
		secondary.appendChild( linkbox );
	box2.appendChild( secondary );
// ==UserScript==
// @name           ClubHabbo New Posts Editor
// @namespace      http://clubhabbo.net
// @description    Edits new posts to exclude certain forums.
// @include        http://www.clubhabboforum.net/search.php
// @include        http://www.clubhabboforum.net/index.php*
// @include        http://www.clubhabboforum.net/?*
// @include        http://www.clubhabboforum.net/
// ==/UserScript==

(function() {
	
	var getele = document.getElementsByTagName('tr');
	var element;
	
	var insearch = false;
	
	if( document.body.innerHTML.search( 'Showing results' ) != -1 ) {
	
		insearch = true;
	
	}
	
	var barred = Array( "Introduce Yourself",
						"Donate to ClubHabbo",
						"Alterations_whole",
						"News &amp; Rumours",
						"Trading",
						"Habbo Discussion",
						"Science &amp; Technology_whole",
						"Website Showcase",
						"Website Market",
						"Website Design &amp; Development",
						"Website Hosting",
						"Fansites",
						"Coding Corner",
						"Comedy Central",
						"Gaming Hub",
						"Debates",
						"Sports &amp; Hobbies",
						"YouTube Videos" );
	
	for ( i = getele.length - 1; i >= 0; i-- ) {

		element = getele[i];
		
		for( j = barred.length - 1; j >= 0; j-- ) {
		
			string = barred[j];
		
			if( string.search( "_whole" ) != -1 ) {
			
				string = string.split( "_whole" );
				string = string[0];
				
				if( !insearch ) {
				
					whole = true;
				
				}
			
			}
		
			if( element.innerHTML.search( string ) != -1 ) {
	
				element.innerHTML = "";
				element.style.display = "none";
				
				if( whole == true ) {
				
					element.parentNode.innerHTML = "<tr class=\"alt1\" align=\"center\"><td>This forum section has been removed by Josh's custom forum removal Greasemonkey extension.</td></tr>";
				
				}
	
			}
			
			whole = false;
		
		}
		
	}

} )();
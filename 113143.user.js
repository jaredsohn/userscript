// ==UserScript==
// @name           	Yahoo Fantasy Football Element Remover (Customizable)
// @description    	Removes various unnecessary components from Yahoo fantasy football site
// @version			2012.09.05
// @include        	*fantasysports.yahoo.com*
// @require        http://userscripts.org/scripts/source/45988.user.js

// ==/UserScript==

// Features and/or Notes:
// 1) Removes virtually any component of the Yahoo site that you want. The code is fully customizable. 
// 2) All that is needed to add/remove entities is to insert or delete the comment tags /* and */ from
//    around the individual functions. Each function given a description to make customization user-friendly.
// 3) The default script is set to only remove 4 annoying ads from the league home page. Any other elements 
//    must be manually removed as described above. These removal options include the entire header, footer, 
//	  the FOOTBALL '11 button, all of the column widgets, and a few other elements. 
 

//The following function removes the footer (bottom) of the website. This includes
//the copywright & TOS info on all pages as well as the dashboard on the MY TEAM page.
(function(){

a = document.getElementById( 'ft' );
if ( a )
	a.parentNode.removeChild( a );

})();

(function(){

//Removes FFL promo add on league page
a = document.getElementById( 'ffl_promo' );
if ( a )
	a.parentNode.removeChild( a );

})();

//Removes ad on right column of league homepage
(function(){

a = document.getElementById( 'gamepromo' );
if ( a )
	a.parentNode.removeChild( a );

})();

//Removes the Ad Choice from the right column
(function(){

a = document.getElementsByClassName( 'ad_slug_table' );
if ( a[0] )
	a[0].parentNode.removeChild( a[0] );

})();

//Removes ad on right column of league homepage
(function(){

a = document.getElementById( 'yspadLREC' );
if ( a )
	a.parentNode.removeChild( a );

})();


//Removes ad below the large league title and facebook like button
(function(){

a = document.getElementsByClassName( 'specialmessage featuredmessage gamead' );
if ( a[0] )
	a[0].parentNode.removeChild( a[0] );

})();


//Removes the facebook like button
(function(){

a = document.getElementsByClassName( 'plugin transparent_widget ff3 win Locale_en_US' );
if ( a[0] )
	a[0].parentNode.removeChild( a[0] );

})();


//The following 3 functions remove the entire heading. Treat them as one if you like.
(function(){

a = document.getElementById( 'yspmh' );
if ( a )
	a.parentNode.removeChild( a );

})();

(function(){

a = document.getElementById( 'yuhead-bd' );
if ( a )
	a.parentNode.removeChild( a );

})();

(function(){

a = document.getElementById( 'yuhead-hd' );
if ( a )
	a.parentNode.removeChild( a );

})();


//Lower part of header that includes league name/id and Help link
(function(){

a = document.getElementById( 'yspteammh' );
if ( a )
	a.parentNode.removeChild( a );

})();


//The following function removes the FOOTBALL '11 button on the left of the navigation
(function() {
    
var yspNav = document.getElementById( 'yspnav' );

if (yspNav) {
var lis = yspNav.getElementsByTagName( 'li' );
lis[ 0 ].parentNode.removeChild( lis[ 0 ] );
}

})();


//The following function removes the element above the footer on the MY TEAM page.
//This element includes the Legend | Stats | Postions links.
(function(){

a = document.getElementById( 'yspcontentfooter' );
if ( a )
	a.parentNode.removeChild( a );

})();


//The following function removes the 'Roster Edit Type' feature form below the MY TEAM table
//Remove this if you normally use one or the other and don't switch
/*(function(){

a = document.getElementById( 'dnd-status' );
if ( a )
	a.parentNode.removeChild( a );

})();*/


//Removes the League Notes on the league homepage. 
/*(function(){

a = document.getElementById( 'leaguenotes' );
if ( a )
	a.parentNode.removeChild( a );

})();*/


//Removes biggest blowout widget on right side of league page. 
(function(){

a = document.getElementById( 'biggest-blowout-mini' );
if ( a )
	a.parentNode.removeChild( a );

})();


//Removes recent medal promo widget on right side of league page. 
/*(function(){

a = document.getElementById( 'recent-medal-promo' );
if ( a )
	a.parentNode.removeChild( a );

})();*/


//Removes fantasy experts widget on right side of league page. 
/*(function(){

a = document.getElementById( 'fantasy-experts' );
if ( a )
	a.parentNode.removeChild( a );

})();*/

//Removes Bloomberg Start and Sit 
(function(){

a = document.getElementById( 'ysf-bloomberg-cta' );
if ( a )
	a.parentNode.removeChild( a );

})();

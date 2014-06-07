// Copyright (c) 2009, Micah Wittman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1   : 2009-03-26
// - Removes default SmugMug Categories [or more precisely, whichever ones are defined in the categoriesToHide of function removeCategories()] from form select on create new gallery interface.
//
//
// Description:
// - Removes default SmugMug Categories [or more precisely, whichever ones are defined in the categoriesToHide of function removeCategories()] from form select on create new gallery interface.
//
// Contact: web:   http://wittman.org/about/
//          email: userscript.m [a][t] wittman.org
//
// ==UserScript==
// @name           smugscopeCustomSmugmugUi
// @namespace      http://userscripts.org/users/80395
// @description    Removes default SmugMug Categories [or more precisely, whichever ones are defined in the categoriesToHide variable of function removeCategories()] from form select on create new gallery interface.
// @include        http://*.smugmug.com/gallery/create.mg*
// @version        0.1
// ==/UserScript==

// Add $
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if $'s loaded
function GM_wait() {
    if(typeof unsafeWindow.$ == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.$; letsJQuery(); }
}
GM_wait();

function removeCategories(){
	var categoriesToHide = new Array('Airplanes', 'Animals', 'Aquariums', 'Architecture', 'Art', 'Arts and Crafts', 'Births', 'Boats', 'Business', 'Cars', 'Children', 'Competitions', 'Computers', 'Dance', 'Electronics', 'Events', 'Family', 'Fashion', 'Flowers', 'Food', 'Friends', 'Funerals', 'Genealogy', 'Grandchildren', 'Groups', 'History', 'Hobbies', 'Holidays', 'Humor', 'Jewelry', 'Journalism', 'Landscapes', 'Machines', 'Military', 'Motorcycles', 'Movies', 'Music', 'Nature', 'Other', 'Parties', 'People', 'Pets', 'Photography', 'Politics', 'Portfolio', 'Portraits', 'Professional', 'Religion', 'School', 'Spirituality', 'Sports', 'Still Life', 'Street Scenes', 'Theater', 'Trains', 'Travel', 'Trucks', 'Underwater', 'Vacation', 'Video Games', 'Weather', 'Weddings', 'Woodworking', 'Zoos') ;

	$('#CategoryID option').each(function(){
		if($.inArray($(this).text(), categoriesToHide) > -1){
			$(this).remove();
		}
	});
}

// Libraries are loaded, so execute the rest of the GM script
function letsJQuery() {
  	removeCategories();
}
// ==UserScript==
// @name		F-List Gender Hider
// @namespace		https://www.f-list.net
// @homepage		http://unciastudios.com/flistgenderhider
// @updateURL		http://unciastudios.com/flistgenderhider/f-list-gender-hider.js
// @version		0.1
// @description		Hides unwanted genders' ads or messages from chat
// @match		https://www.f-list.net/chat/
// @copyright		2014+, Kurin Pawpad
// @require		http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==
setInterval(function() {
    
    // Which type to remove of 'ads only', 'chat only' or 'both'
    //   Uncomment ONE only!
	//var myparent = '.chat-type-ad'; // Ads Only
	//var parent = '.chat-type-chat'; // Chat Only
	//var parent = '.chat-type-ad,.chat-type-chat'; // Both
    
    
    // Which ads' genders to remove.  Comment each you want to KEEP
	//$('.GenderMale').parent(myparent).hide();
	//$('.GenderFemale').parent(myparent).hide();
	//$('.GenderHerm').parent(myparent).hide();
	//$('.GenderMale-Herm').parent(myparent).hide();
	//$('.GenderCunt-boy').parent(myparent).hide();
	//$('.GenderTransgender').parent(myparent).hide();
	//$('.GenderShemale').parent(myparent).hide();
	//$('.GenderNone').parent(myparent).hide();
    
},250);

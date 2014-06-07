// ==UserScript==

// @name           Dumpert

// @namespace      http://userscripts.org/users/107427

// @description    Remove top bar from dumpert so there is more room for the video and comments.

// @include        http://www.dumpert.nl/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==



// Not sure why I use a function here.

// I don't know what happens if you don't use addblock

(function() {

 // Remove some frame cluttering stuff

 $('#header').remove();

 $('#topbar').remove();

 $('#uploadcontainer').remove();

 // Move the rest up.

 $('#filmcontainer').css('top', '0px');

 $('#fotocontainer').css('top', '0px');

 $('#audiocontainer').css('top', '0px');

 $('#top5container').css('top', '0px');

 // Leave some space for the title. TODO: make this 55px a lookup.

 $('#iteminfo').css('top', '55px');

 $('#playercontainer').css('top', '55px');

 // make visited videos transparent

 $('a.item:visited').css('opacity','0.5');

 // Display 5 pages of videos on the first toppers page. 

 // Link to page 6. 

 if ($(location).attr('pathname') == '/toppers/') {

 for (i=1;i<=5;i++) {

  $('#filmcontainer').append('<div id="toppers' + i + '"></div>');

  // Load page into the container. (can be out of order)

  $('#toppers' + i).load('/toppers/' + i + '/ #filmcontainer > .item',function(){
	// Also set the newly loaded items opacity
	$('a.item:visited').css('opacity','0.5');
	}).fadeIn();

 }; 

 // Link to page 6.

 $('#widekopcontainer a').attr('href','/toppers/' +6 + '/');

 } 

 // On page 6 link back to page 0-5

 if ($(location).attr('pathname') == '/toppers/6/') {

 $('#widekopcontainer a.arrow.left').attr('href','/toppers/' );



 }

})();
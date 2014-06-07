// ==UserScript==

// @name          Qwantz Listeningroom

// @namespace     http://listeningroom.fettig.net

// @include       http://listeningroom.fettig.net/room/qwantz*

// @match         http://listeningroom.fettig.net/room/qwantz*

// ==/UserScript==



var p = unsafeWindow;



if(window.navigator.vendor.match(/Google/)) {

	var div = document.createElement("div");

	div.setAttribute("onclick", "return window;");

	p = div.onclick();

};



var $ = p.$;

var console = p.console;



$(function(){

  // Flying 'saurs at bottom of page

  $('body').append('<img src="http://qwantz.com/pteranodon.png" style="margin-right: 100px;"><img src="http://qwantz.com/rhamphorhynchus.png">');  

  

  // Quick link to 'click here to add song', and 'back to top'

  $('#addFile').after('<p style="text-align: center; margin-top: 40px;"><a name="addsonghook" href="#top">Back to top</a></p>');

  $('#music h1').after('<p style="text-align: center;"><a href="#addsonghook" name="top">Add new song &gt;&gt;</a></p>');

  

  /* Optional tweaks (qwantz.com background and colors)

  // ---------------------------------------------------

    $('body').css("background", 'url("http://qwantz.com/sky.png") repeat-x scroll 0 0 #FFFFFF');

    $("#everything").css("background-color", "transparent");

    $('#music h1').css("color", "white");

    $('#usersContainer h3').css("color", "white");

  */

});





// Adds default t-rex track image 

// -----------------------------------------------------------------------

function addBG() {

	$(".record").each(function(i) {

		if($(this).css("background-image") == "none") {  

			$(this).css("background-image", "url(http://i.min.us/idJb2i.png)");

		};

	});

};



// Adds last.fm and grooveshark search buttons

// -----------------------------------------------------------------------

function addExternalButtons() {

	$(".description").each(function(i) {

		if($(this).find(".artistsearch").length == 0) {

			var artistName = $(this).find(".artist").html();

			if(artistName && artistName != "") {

				var lastfm_url = "http://www.last.fm/search?q=" + escape(artistName);

				var grooveshark_url = "http://listen.grooveshark.com/#/search/song?q=" + escape(artistName);

  			var lastfm_imglink = '<a href="'+ lastfm_url +'" target="_blank"><img style="border: 0px;" src="http://files.alnorth.com/lastfm_button.jpg" /></a>';

  			var grooveshark_imglink = '<a href="'+ grooveshark_url +'" target="_blank"><img style="border: 0px; margin-left: 5px;" src="http://media.obsessable.com/media/2009/06/04/100w/grooveshark-logo.jpg" height="18px"/></a>';

							

				$(this).children(".album").after('<p class="artistsearch" style="margin-top: 7px;">' + lastfm_imglink + grooveshark_imglink + ' </p>');

				//$(this).append("<a href=\""+ link +"\" class=\"last_artistsearch\" target=\"_blank\"><img style=\"border: 0px;\" src=\"http://files.alnorth.com/lastfm_button.jpg\" /></a>");

			};

		};

	});

};



// Converts twitter usernames to links

// -----------------------------------------------------------------------

function addTwitterLinks() {

  $("ul#chat li, ul#users li").each( function(i, el){

    // convert twitter usernames to profile links

    var match = el.innerHTML.match(/(@([a-zA-Z0-9_]+))\W?/);

    if (match && el.innerHTML.indexOf('class="twitter"') == -1){

      el.innerHTML = el.innerHTML.replace(match[1], '<a style="color: black; text-decoration:none;" target="_blank" href="http://twitter.com/#!/' + match[2] + '" class="twitter">' + match[1] + '</a>');

    };

  });

};





setInterval(addBG, 5000);

setInterval(addExternalButtons, 7000);

setInterval(addTwitterLinks, 5000);
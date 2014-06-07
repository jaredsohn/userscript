// ==UserScript==
// @name        Yahoo Fantasy Age Extractor
// @namespace   ben.bernatchez@gmail.com
// @description Adds the birth year of the player for keeper leagues with age requirement slots.
// @include     http://hockey.fantasysports.yahoo.com/hockey/*/startingrosters
// @include     http://hockey.fantasysports.yahoo.com/hockey/*/keepers
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// @grant 			metadata
// @grant         GM_xmlhttpRequest
// ==/UserScript==

//working around asynchronous nature of GM_xmlhttpRequest()
//which is itself needed because we can't go outside domain for player pages
//http://hockey.fantasysports.yahoo.com != http://sports.yahoo.com
// Courtesy of discussion at http://userscripts.org/topics/193

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}
// variables from the {...} literal above are now found in the `this' object:
function showYearAndAge( response ) {
	var year = parseInt($(response.responseText).find(".born > dl > dd").text().split(",")[1]);
	$("<li class='ysf-player-team-pos'><span> " + year.toString() + " (" + (new Date().getFullYear() - year) +")</span></li>").insertAfter($(this.domObj));
}

$(".ysf-player-detail > ul > li:last-child").each( function() {
	var playerlink = $(this).parent().parent().prev().find("a").attr('href');
	GM_xmlhttpRequest({
	  method: "GET",
	  url: playerlink,
	  onload: showYearAndAge.bind( { domObj:this } )
	});
});
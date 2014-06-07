// 
// Pitchfork myspace links: Greasemonkey user script
// v1.0, 2011-01-16
// (c) 2011 by Sylvain Milleret <s_milleret@yahoo.fr>
// Released under the GPLv2 license, available at gnu.org.
//
// If you want me to add some more links to the thing, just ask me...
// I adapted an existing script which was not maintained
// Blah blah blah. Have fun ! And no garranty :)
// 
// ==UserScript==
// @name           Pitchfork myspace links
// @namespace      blah
// @description    Add link to Pitchfork record reviews based on artist and lookup to a myspace page.
// @include        http://pitchfork.com/reviews/albums*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// variables to hold the review info
var artist_name;
var album_name;

// determine the review info
function get_info() {
	artn = jQuery("span.artists a b");
	if(artn.length > 0){
		GM_log(artn.html());
		artist_name = artn.html();
	}
	albn = jQuery("span.albums a");
	if(albn.length > 0){
		GM_log(albn.html());
		album_name = albn.html();
	}
	if(albn.length > 0 && artn.length > 0) {
		// GM_log("ALLLRIGHTY !");
		return true;
	}
	return false;
}


// insert the links into the page
function insert_content() {
  if (!get_info()) {
    GM_log("Fail: couldn't determine artist/album info.");
    return false;
  }
  
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.google.com/search?q="+artist_name +" myspace",
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
    if (!response.responseXML) {
      response.responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }
	
	var span2 = document.createElement('span');
	$("div.tombstone").append("<div id=\"google-response\">hohoho</div>");
	$("div.tombstone").append("<div class=\"panel\" id=\"myspace-link\" >Links on google for \"myspace "+artist_name+"\" :<ul></ul></div>");
	$("div.tombstone").append("<hr />");
	//$("div.content-container:first").append("<ul id=\"myspace-link\">Links on google for \"myspace "+artist_name+"\" :</ul>");
	$("div#google-response").hide();
	$("div#google-response").html(response.responseText);
	$("div#google-response h3.r").each(function(index) {
		if(index<5){
			$("div#myspace-link ul").append("<li id=\"lien"+index+"\"></li>");
			$("li#lien"+index).append($(this).html());
		}else{
			 $("div#google-response").empty();
		}
	});
	
  }
});

}

// do it
insert_content();
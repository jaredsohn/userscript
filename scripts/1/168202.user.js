// ==UserScript==
// @name           WSPP
// @namespace      WSPP
// @description    WSPP - jelen
// @version        1.0
// @include        http://www.erepublik.*
// @updateURL	   http://wspp.netau.net/wsppjs/wspp.ver.js
// @downloadURL    http://wspp.netau.net/wsppjs/wspp.js
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////////////

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

////////////////////////////////////////////////////////////////////////////////////////

var citizenID;

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function getErepDay(){
	var edayy = jQuery(".eday strong").text();
	var newday = parseInt(edayy.replace(",",""));
	return newday;
}

function getErepTime(){
	var livetime = $("#live_time").text();
	//var newday = parseInt(edayy.replace(",",""));
	return livetime;
}

function setactivatelink() {

	var citizenIDD = getCitizenId();
	//alert(citizenIDD);
	var eday = getErepDay();
	//alert(eday);	
	var time = getErepTime();
	//alert(time);
	
	var link = jQuery('<a>').attr('href', 'http://wspp.netau.net/includes/jelen.php?id='+citizenIDD+'&nap='+eday+'&ido='+time).attr('target', '_blank').text('Jelen :D');
	link.appendTo('.user_identity');
}

function getCitizenId(){
	if (typeof(SERVER_DATA) != 'undefined') {
		if (typeof(SERVER_DATA.citizenId) != 'undefined') {
			return SERVER_DATA.citizenId;
		}
	}
	
	

	var srcCitizenId = $(".user_avatar").attr("href").trim();
	var srcIdParts = srcCitizenId.split("/");
	return srcIdParts[srcIdParts.length - 1];
}	


/**
* Initialization
*/

// evvel megoldhato hogy a GM script az oldal betoltese utan induljon.
window.addEventListener ("load", Greasemonkey_main_z, false);

function Greasemonkey_main_z () {
  //***** PUT YOUR GREASEMONKEY CODE HERE.
	setactivatelink();
  
}
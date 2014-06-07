// ==UserScript==

// @name           What.cd RIAA/BPI Checker

// @namespace      EDB_gm

// @include        *what.cd/torrents.php?id=*

// ==/UserScript==



//Check for a music torrent

if (document.title.indexOf(" - ") != -1) {





var albumName;

var artistName;

var BPIhref;

var RIAAhref;
var BPIloc;
var RIAAloc;
var orititle;

var title;



artistName = document.title.substring(0, document.title.indexOf(" - "));

albumName = document.title.substring(document.title.indexOf(" - ")+3, document.title.indexOf(" :: "));


//Replace function doing it the hard way. Easy way seems to be bugged.
function replaceAll(sReplace, tReplace, rReplace) {
	var rArray = sReplace.split(tReplace);
	var nReplace = rArray.length-1;
		while(nReplace >= 1) {
			sReplace = sReplace.replace(tReplace, rReplace);
			nReplace--;
		}
	return sReplace;
}

artistName = replaceAll(artistName, "+", "%2B");
artistName = replaceAll(artistName, "&", "%26");
artistName = replaceAll(artistName, " ", "+");

albumName = replaceAll(albumName, "+", "%2B");
albumName = replaceAll(albumName, "&", "%26");
albumName = replaceAll(albumName, " ", "+");


BPIhref = "http://www.bpiradar.com/search.asp?searchtype=Keywords&keyword=" + albumName + "+" + artistName;

RIAAhref = "http://www.riaaradar.com/search.asp?searchtype=Keywords&keyword=" + albumName + "+" + artistName;



title = document.getElementById("content").getElementsByTagName("h2").item(0);
orititle = title.innerHTML;

GM_xmlhttpRequest({

	method: "GET",

	url: BPIhref,

	onload: function(response) {



		responseHTML = response.responseText;

		responseHTML = responseHTML.substring(responseHTML.indexOf("Search results:"));



		if (responseHTML.indexOf("No results were found for") != -1) {

			title.innerHTML = title.innerHTML + "<br /><a target=\"_blank\" href=\"" + BPIhref + "\"><font color=#0000FF>Not found on the BPI radar!</font></a>";

		} else {

			responseHTML = responseHTML.substring(responseHTML.indexOf("BPI Radar result:"), responseHTML.indexOf("<input type=\"hidden\""));

			if (responseHTML.indexOf("/images/button_warn.gif") != -1) {

				BPIloc = "<br /><a target=\"_blank\" href=\"" + BPIhref + "\"><font color=#FF0000>BPI</font></a>";

			} else if (responseHTML.indexOf("/images/button_caution.gif") != -1) {

				BPIloc = "<br /><a target=\"_blank\" href=\"" + BPIhref + "\"><font color=#FFCC00>BPI</font></a>";

			} else if (responseHTML.indexOf("/images/button_safe.gif") != -1) {

				BPIloc = "<br /><a target=\"_blank\" href=\"" + BPIhref + "\"><font color=#00FF00>BPI</font></a>";

			}

		}

		title.innerHTML = orititle + "<font size=2>" + BPIloc + ", " + RIAAloc + "</font>";



	}

});



GM_xmlhttpRequest({

	method: "GET",

	url: RIAAhref,

	onload: function(response) {



		responseHTML = response.responseText;

		responseHTML = responseHTML.substring(responseHTML.indexOf("Search results:"));



		if (responseHTML.indexOf("No results were found for") != -1) {

			title.innerHTML = title.innerHTML + "<br /><a target=\"_blank\" href=\"" + RIAAhref + "\"><font color=#0000FF>Not found on the RIAA radar!</font></a>";

		} else {

			responseHTML = responseHTML.substring(responseHTML.indexOf("RIAA Radar result:"), responseHTML.indexOf("<input type=\"hidden\""));

			if (responseHTML.indexOf("/images/button_warn.gif") != -1) {

				RIAAloc = "<a target=\"_blank\" href=\"" + RIAAhref + "\"><font color=#FF0000>RIAA</font></a>";

			} else if (responseHTML.indexOf("/images/button_caution.gif") != -1) {

				RIAAloc = "<a target=\"_blank\" href=\"" + RIAAhref + "\"><font color=#FFCC00>RIAA</font></a>";

			} else if (responseHTML.indexOf("/images/button_safe.gif") != -1) {

				RIAAloc = "<a target=\"_blank\" href=\"" + RIAAhref + "\"><font color=#00FF00>RIAA</font></a>";

			}

		}

		title.innerHTML = orititle + "<font size=2>" + BPIloc + ", " + RIAAloc + "</font>";



	}

});

}
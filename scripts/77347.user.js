// ==UserScript==

// @name           TPB linker

// @namespace      EDB_gm

// @description    Adds ThePirateBay links to various media sites.

// @include        http://www.imdb.com/title/*/

// @include        http://www.rottentomatoes.com/m/*/

// ==/UserScript==



// Getting website



var pbaysearch = "http://www.thepiratebay.org/search/";

var pbay = "http://www.thepiratebay.org";

var searched = "no";

var hits;

var luckylink;

var downloadlink;

var website;


website = document.URL;

if (website.indexOf("imdb.com") != -1) {

	website = "imdb";

}

if (website.indexOf("rottentomatoes.com") != -1) {

	website = "rtomatoes";

}





// End Getting website



// Start IMDB

if (website == "imdb") {



var media = "film";

var title;

var year;

var filmid;

var searchurl;



// Getting film info



	title = document.getElementById("tn15title").innerHTML;

	title = title.substring(5, title.indexOf(" <span>")).replace("/", "");


	year = document.getElementById("tn15title").innerHTML;

	year = year.substring(year.indexOf("\">")+2, year.indexOf("</a>")).replace(/[^0-9]/g, "");



	filmid = document.getElementById("tn15title").innerHTML;

	filmid = filmid.substring(filmid.indexOf("tconst-pro-header-link")+29, filmid.indexOf("/\">More at"));



	searchurl = pbaysearch + title + "+" + year + "/0/7/0"

	searchurl = searchurl.replace(" ", "+");



// End Getting film info





// Putting header together



	document.getElementById("tn15title").innerHTML = "<h1>" + title + " <span> (<a href=\"/year/" + year + "/\">" + year + "</a>) " + "<span class=\"pro-link\"><a href=\"http://pro.imdb.com/rg/maindetails-title/tconst-pro-header-link/title/" + filmid + "/\">More at <strong>IMDbPro</strong></a>&nbsp;&raquo;</span></span></h1><p>";



// End Putting header together





// Creating the result div



	var bayLink = document.createElement("div");

	bayLink.id = "bayLinkId";

	bayLink.setAttribute ("style", "font-size:17px;"); 


	var bayLoc = document.getElementById("tn15title");

	bayLoc.parentNode.insertBefore(bayLink, bayLoc.nextSibling);



// End Creating the result div



}

// End IMDB

// Start RTomatoes

if (website == "rtomatoes") {


var media = "film";

var title;

var year;

var filmid;

var searchurl;



// Getting film info



	title = document.getElementById("movie_info_area").innerHTML;

	title = title.substring(title.indexOf("movie_title clearfix")+46, title.indexOf("</span> ("));



	year = document.getElementById("movie_info_area").innerHTML;

	year = year.substring(year.indexOf("</span> (")+9, year.indexOf(")</h1><ul id=\"tomatometer_nav"));



	searchurl = pbaysearch + title + "+" + year

	searchurl = searchurl.replace(" ", "+");



// End Getting film info



// Creating the result div



	var bayLink = document.createElement("div");

	bayLink.id = "bayLinkId";

	bayLink.setAttribute ("style", "margin-left:10px; margin-bottom:5px; font-size:17px;"); 



	var bayLoc = document.getElementById("tomatometer_nav");

	bayLoc.parentNode.insertBefore(bayLink, bayLoc);



// End creating the result div


}

// End RTomatoes



// Making the retry button



	function getDataFunc() {

		getData(searchurl, media);

	}


	var retryButton = document.createElement("button");

	retryButton.id = "retryButton";
	if (website == "rtomatoes") {

		retryButton.setAttribute ("style", "font-weight:bold; width: 100px; padding: 5px; border-width:1px; border-style:solid; border-color:#B0B0B0; position:relative; left:10px;");
	} else {
		retryButton.setAttribute ("style", "font-weight:bold; width: 100px; padding: 5px; border-width:1px; border-style:solid; border-color:#B0B0B0;");
	}

	retryButton.innerHTML = "Retry";

	retryButton.addEventListener("click", getDataFunc, false);



// End Making the retry button



// Getting ThePirateBay data



function getData(surl, smedia) {

if (searched == "yes") {

	var buttonDeleted = document.getElementById("retryButton");

	buttonDeleted.parentNode.removeChild(buttonDeleted);

} else {

	searched = "yes";

}

bayLink.innerHTML = "Searching ThePirateBay's database. Please wait...<p>";

GM_xmlhttpRequest({

	method: 'GET',

	url: surl,

	onload: function(responseDetails) {



		// Check for overload/no results

		if (responseDetails.responseText.indexOf("No hits. Try adding an asterisk in you search phrase") != -1) {

		if (responseDetails.responseText.indexOf("Search engine overloaded, please try again in a few seconds") != -1) {

			bayLink.innerHTML = "ThePirateBay's search engine was overloaded and information could not be retrieved.";

			var addButton = document.getElementById('bayLinkId');
			addButton.parentNode.insertBefore(retryButton, addButton.nextSibling);

		} else {



			bayLink.innerHTML = smedia + " could not be found on ThePirateBay";



		}} else {



			downloadlink = surl;

			downloadlink = "<a target=\"new1\" href=\"" + downloadlink + "\">Download this film from ThePirateBay!</a>";



			luckylink = responseDetails.responseText;

			luckylink = luckylink.substring(luckylink.indexOf("Search results:"));

			luckylink = luckylink.substring(luckylink.indexOf("detName\"><a href")+18, luckylink.indexOf("\" class=\"detLink\""));

			luckylink = "<a target=\"new2\" href=\"" + pbay + luckylink + "\">I'm feeling lucky!</a>";



			hits = responseDetails.responseText.substring(responseDetails.responseText.indexOf(" (approx ")+9, responseDetails.responseText.indexOf(" found)</h2>"));

			bayLink.innerHTML = downloadlink + " (" + hits + " hits) " + luckylink + "<p>";

		}

	}

});

}

if (website == "imdb") {
if (GM_getValue("IMDBEnabled", "enabled") == "enabled") {
getData(searchurl, media);
}
}
if (website == "rtomatoes") {
if (GM_getValue("rTomatoesEnabled", "enabled") == "enabled") {
getData(searchurl, media);
}
}


// End Getting ThePirateBay data

GM_registerMenuCommand("TPB Linker Preferences", Preferences);

// Start Preferences window

function Preferences() {

var IMDBEnabled =	GM_getValue("IMDBEnabled", "enabled");
var rTomatoesEnabled =	GM_getValue("rTomatoesEnabled", "enabled");

function IMDBClick() {
	if (IMDBEnabled == "enabled") {
		IMDBEnabled = "disabled";
		IMDBLabel.innerHTML = "IMDB is " + IMDBEnabled + "&nbsp;&nbsp;";
		changeIMDBButton.innerHTML = "Enable";
	} else {
		IMDBEnabled = "enabled";
		IMDBLabel.innerHTML = "IMDB is " + IMDBEnabled + "&nbsp;&nbsp;";
		changeIMDBButton.innerHTML = "Disable";
	}
}
function rTomatoesClick() {
	if (rTomatoesEnabled == "enabled") {
		rTomatoesEnabled = "disabled";
		rTomatoesLabel.innerHTML = "<br>Rotten Tomatoes is " + rTomatoesEnabled + "&nbsp;&nbsp;";
		changerTomatoesButton.innerHTML = "Enable";
	} else {
		rTomatoesEnabled = "enabled";
		rTomatoesLabel.innerHTML = "<br>Rotten Tomatoes is " + rTomatoesEnabled + "&nbsp;&nbsp;";
		changerTomatoesButton.innerHTML = "Disable";
	}
}
function saveChanges() {
	GM_setValue("IMDBEnabled", IMDBEnabled);
	GM_setValue("rTomatoesEnabled", rTomatoesEnabled);
	prefDiv.removeChild(titleDiv);
	prefDiv.removeChild(IMDBLabel);
	prefDiv.removeChild(rTomatoesLabel);
	prefDiv.removeChild(changeIMDBButton);
	prefDiv.removeChild(changerTomatoesButton);
	prefDiv.removeChild(spaceDiv);
	prefDiv.removeChild(saveButton);
	prefDiv.removeChild(cancelButton);
	prefDiv.removeChild(spaceDiv2);
	prefDiv.removeChild(updateButton);
	document.body.removeChild(prefDiv);
}
function cancelChanges() {
	prefDiv.removeChild(titleDiv);
	prefDiv.removeChild(IMDBLabel);
	prefDiv.removeChild(rTomatoesLabel);
	prefDiv.removeChild(changeIMDBButton);
	prefDiv.removeChild(changerTomatoesButton);
	prefDiv.removeChild(spaceDiv);
	prefDiv.removeChild(saveButton);
	prefDiv.removeChild(cancelButton);
	prefDiv.removeChild(spaceDiv2);
	prefDiv.removeChild(updateButton);
	document.body.removeChild(prefDiv);
}
function versionCheck() {
	var version = "1.1.1";

	GM_xmlhttpRequest({

		method: 'GET',

		url: "http://userscripts.org/scripts/show/77347",

		onload: function(responseDetails) {

			var avVersion = responseDetails.responseText;

			avVersion = avVersion.substring(avVersion.indexOf("Current version: ")+17);

			avVersion = avVersion.substring(0, avVersion.indexOf("</p>"));

			if (version != avVersion) {

				alert("Your version of TPB Linker is outdated! Please visit http://userscripts.org/scripts/show/77347 to download the latest version.")

			} else {
				alert("Your version of TPB Linker is up to date :)");
			}

		}

	});

}
	var prefDiv = document.createElement("div");
	document.body.appendChild(prefDiv);
	prefDiv.style.backgroundColor = "#E0F0F0";
	prefDiv.style.borderWidth = "1px";
	prefDiv.style.borderStyle = "solid";
	prefDiv.style.borderColor = "#B0B0B0";
	prefDiv.style.position = "fixed";
	prefDiv.style.width = "50%";
	prefDiv.style.height = "33%";
	prefDiv.style.left = "25%";
	prefDiv.style.top = "25%";
	prefDiv.style.opacity = "1";
	prefDiv.style.display = "block";
	prefDiv.style.textAlign = "left";
	prefDiv.style.verticalAlign = "center";
	prefDiv.style.zIndex = "12001";
	prefDiv.style.padding = "5px";
	prefDiv.style.fontFamily = "verdana";
	prefDiv.style.fontWeight = "bold";
	prefDiv.style.fontSize = "18px";

	var titleDiv = document.createElement("div");
	titleDiv.style.fontWeight = "bold";
	titleDiv.style.textAlign = "center";
	titleDiv.style.padding = "5px";
	titleDiv.innerHTML = "<u>Preferences</u>";
	prefDiv.appendChild(titleDiv);

	var IMDBLabel = document.createElement("label");
	IMDBLabel.innerHTML = "IMDB is " + IMDBEnabled + "&nbsp;&nbsp;";
	prefDiv.appendChild(IMDBLabel);

	var changeIMDBButton = document.createElement("button");
	changeIMDBButton.style.padding = "5px";
	changeIMDBButton.style.fontWeight = "bold";
	changeIMDBButton.style.borderWidth = "1px";
	changeIMDBButton.style.borderStyle = "solid";
	changeIMDBButton.style.borderColor = "#B0B0B0";
	changeIMDBButton.style.opacity = "1";
	if (IMDBEnabled == "enabled") {
		changeIMDBButton.innerHTML = "Disable";
	} else {
		changeIMDBButton.innerHTML = "Enable";
	}
	changeIMDBButton.addEventListener("click", IMDBClick, false);
	prefDiv.appendChild(changeIMDBButton);

	var rTomatoesLabel = document.createElement("label");
	rTomatoesLabel.innerHTML = "<br>Rotten Tomatoes is " + rTomatoesEnabled + "&nbsp;&nbsp;";
	prefDiv.appendChild(rTomatoesLabel);

	var changerTomatoesButton = document.createElement("button");
	changerTomatoesButton.style.padding = "5px";
	changerTomatoesButton.style.fontWeight = "bold";
	changerTomatoesButton.style.borderWidth = "1px";
	changerTomatoesButton.style.borderStyle = "solid";
	changerTomatoesButton.style.borderColor = "#B0B0B0";
	changerTomatoesButton.style.opacity = "1";
	if (rTomatoesEnabled == "enabled") {
		changerTomatoesButton.innerHTML = "Disable";
	} else {
		changerTomatoesButton.innerHTML = "Enable";
	}
	changerTomatoesButton.addEventListener("click", rTomatoesClick, false);
	prefDiv.appendChild(changerTomatoesButton);

	var spaceDiv = document.createElement("div")
	spaceDiv.innerHTML = "<p>";
	prefDiv.appendChild(spaceDiv);

	var saveButton = document.createElement("button");
	saveButton.style.padding = "5px";
	saveButton.style.fontWeight = "bold";
	saveButton.style.borderWidth = "1px";
	saveButton.style.borderStyle = "solid";
	saveButton.style.borderColor = "#B0B0B0";
	saveButton.style.opacity = "1";
	saveButton.innerHTML = "Save Changes and Exit";
	saveButton.addEventListener("click", saveChanges, false);
	prefDiv.appendChild(saveButton);

	var cancelButton = document.createElement("button");
	cancelButton.style.padding = "5px";
	cancelButton.style.fontWeight = "bold";
	cancelButton.style.borderWidth = "1px";
	cancelButton.style.borderStyle = "solid";
	cancelButton.style.borderColor = "#B0B0B0";
	cancelButton.style.opacity = "1";
	cancelButton.innerHTML = "Cancel";
	cancelButton.addEventListener("click", cancelChanges, false);
	prefDiv.appendChild(cancelButton);

	var spaceDiv2 = document.createElement("div")
	spaceDiv2.innerHTML = "<p>";
	prefDiv.appendChild(spaceDiv2);

	var updateButton = document.createElement("button");
	updateButton.style.padding = "5px";
	updateButton.style.fontWeight = "bold";
	updateButton.style.borderWidth = "1px";
	updateButton.style.borderStyle = "solid";
	updateButton.style.borderColor = "#B0B0B0";
	updateButton.style.opacity = "1";
	updateButton.innerHTML = "Check for updates";
	updateButton.addEventListener("click", versionCheck, false);
	prefDiv.appendChild(updateButton);
}

// End Preferences window
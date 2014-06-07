// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Taglines", and click Uninstall.
//
// ==UserScript==
// @name	Sensible Taglines
// @namespace	http://sensibleerection.com/profile.php/28323
// @description	Adds new taglines
// @include	http://sensibleerection.com/*
// @include	http://*.sensibleerection.com/*
// ==/UserScript==


// To disable profile page trickery, set to false
const ProfilePageTrickery = true;

// For the sake of argument, this is the hypothetical number of icons built-in to SE
const numberOfBuiltInIcons = 50;

// Set this to false to disable updates
const updateEnabled = true;

// Number of days between updates
const updateEverySoManyDays = 7;

// Always show one of the new external images
const OnlyShowNewImages = false;

// Always show one of the new taglines
const AlwayShowNewTags = false;

// Chances of a new tagline replacing the built-in tagline
const chanceOfReplacingTagline = 0.8;

const LegalTaglineStartsWith = "Sensible Erection - ";
const locationOfTaglineFile = "http://cb361.brinkster.net/setags.aspx";
const ProfilePageTitleStartsWith = "Sensible Erection | Profile - ";

var imageOverride = null;
var loggedInUser = "";


function IsItTimeToRetrieveTaglineList() {

	var days = updateEverySoManyDays;
	var now = new Date().getTime();
	var updated = GM_getValue("setags_updatedAt",null);

	if (updated != null && (! isNaN(updated) ) ) {
		var diff = now - updated;
		days = Math.floor(diff / (1000 * 60 * 60 * 24));
	}


	if (days >= updateEverySoManyDays || isNaN(days) ) {
		RetrieveTaglineList();
	}

}

function RetrieveTaglineList() {

	if (updateEnabled) {
		html_req = GM_xmlhttpRequest(
			{
				method: 'GET' , 
				url:locationOfTaglineFile  , 
				onload: function(responseDetails) {	
					if (responseDetails.status == 200)
						ProcessTaglineList(responseDetails.responseText);				
//					else
//						alert("Could not get response for '"+locationOfTaglineFile+"'.  Error "+responseDetails.status);
				}
			}
		);
	}
}

function ProcessTaglineList(csv) {

	var csv_stripped = csv.replace(/\n/g,"");
	var asLines = csv_stripped.split('<br>');
		
	var aTags = [];
	var aImgs = [];
	var iTags = 0;
	var iImgs = 0;

	for (var i=0; i<asLines.length; i+=1) {
		if (asLines[i].trim().startsWith("tag")) {
			GM_setValue("setags_tags_"+iTags,asLines[i].trim());
			iTags++;
		}
		if (asLines[i].trim().startsWith("img")) {
			GM_setValue("setags_imgs_"+iImgs,asLines[i].trim());
			iImgs++;
		}
	}


	GM_setValue("setags_tags_count",iTags);
	GM_setValue("setags_imgs_count",iImgs);

	var now = new Date().getTime();
	GM_setValue("setags_updatedAt",""+now);
}




// Examines the page and decides whether to replace the tagline
function ProcessPage() {

	if (Math.random() < chanceOfReplacingTagline || AlwayShowNewTags ) {		
		var iTags = GM_getValue("setags_tags_count",0);
		if (iTags > 0) {
			var itag = Math.ceil((Math.random() * iTags))-1;
			var tag = GM_getValue("setags_tags_"+itag , null );
			if (tag != null) {
				var aTag = tag.split(',');
				ReplaceTagline(aTag[1],aTag[2]);
			}
		}
	}

	if (GM_getValue("setags_option_shownewimages",true)) {
		var docImgs = null;
		var docImg = null;

		docImgs = document.evaluate("//img[ starts-with(@src, '/images/iconic/') ]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		if (docImgs != null && docImgs.snapshotLength > 0) {

			for (var i = 0; i < docImgs .snapshotLength ; i++) {
				docImg = docImgs.snapshotItem(i);	
			}



			if (imageOverride == null && docImg != null) { 
				var iRandom = Math.ceil(Math.random() * ( GM_getValue("setags_imgs_count",0) + numberOfBuiltInIcons ) ) -1;
				var iImgs = GM_getValue("setags_imgs_count",0);
				if (iImgs > 0 && ( iRandom >= numberOfBuiltInIcons || OnlyShowNewImages ) ) {
					var iimg = Math.ceil((Math.random() * iImgs))-1;
					var img = GM_getValue("setags_imgs_"+iimg , null );
					if (img != null) {
						imageOverride = img.split(',');		
					}
				}
			}

			if (imageOverride != null && docImg != null)
				ReplaceImg(docImg,imageOverride);
		}
	}
}


function ReplaceTagline(newtagline,comment) {
	if (document.title.startsWith(LegalTaglineStartsWith)) {
		var oldTagline = document.title.substr(LegalTaglineStartsWith.length);
		updatedTagline = newtagline.replace(/##A/g,"'");
		updatedTagline = updatedTagline.replace(/##C/g,",");
		document.title = (LegalTaglineStartsWith) + updatedTagline ;
		var capitalisedTagline = updatedTagline.substr(0,1).toUpperCase() + updatedTagline.substr(1);

		document.documentElement.innerHTML = document.documentElement.innerHTML.replace(oldTagline  , capitalisedTagline);	
		if (comment != null && comment != "") {
		
			document.documentElement.innerHTML = document.documentElement.innerHTML.replace("/taglines.php", "/entry.php/"+comment);
		}

	}
}

function ReplaceImg(docImg , aImg) {

	var newa = document.createElement('a');
	newa.href = "/profile.php/"+aImg[2];

	docImg.parentNode.replaceChild(newa,docImg);
	newa.appendChild(docImg);
	
	docImg.src = aImg[1];
	docImg.removeAttribute("width");
	docImg.removeAttribute("height");
}

function menuConfigShowNewImages(e) {	
	alert("menuConfigShowNewImages");
	var x = GM_getValue("setags_option_shownewimages",false);
	x = !x;
	GM_setValue("setags_option_shownewimages",x);
}

function updateNow(e) {
	RetrieveTaglineList();
	alert("Updated");
}



// (a) if the profile page owner has a personal image, it can be used in preference to the random one
// (b) if the profile page owner is cb361, get the username for the submission form
function PreProcessProfilePage() {
	
	
	var docA = document.evaluate("//a[ starts-with(@href, '/profile.php/') ]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (docA != null) {
		for (var i = 0; i < docA.snapshotLength ; i++) {
			loggedInUser = docA.snapshotItem(i).textContent.trim();
		}
	}

	var profilePageName = document.title.substr(ProfilePageTitleStartsWith.length);

	var iImgs = GM_getValue("setags_imgs_count",0);

	for (var i = 0; i < iImgs  ; i++) {

		var img = GM_getValue("setags_imgs_"+i, null );
		if (img != null) {
			var aImg = img.split(',');
			if (aImg[2] == profilePageName) {
				imageOverride = aImg;
			}
		}
	}

	if (loggedInUser != "" && (profilePageName == "cb361" || profilePageName == "ceebee" ) ) {
		var docForms;
		docForms = document.evaluate("//form[ @name = 'newiconic' ]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
		for (var i = 0; i < docForms.snapshotLength ; i++) {
			docForm = docForms.snapshotItem(i);

			for (i = 0; i < docForm.length; i++) {
				var tempobj = docForm.elements[i];

				if (tempobj.type.toLowerCase() == "text" && tempobj.name == "prompt")
					tempobj.value = loggedInUser;

				if (tempobj.type.toLowerCase() == "hidden" && tempobj.name == "user")
					tempobj.value = loggedInUser;
				
				if (tempobj.type.toLowerCase() == "text" && tempobj.name == "url") {
					tempobj.value = "http://";
					tempobj.disabled = false;
				}


				if (tempobj.type.toLowerCase() == "submit" || tempobj.type.toLowerCase() == "reset")
					tempobj.disabled = false;
			}
				
		}
	}

} 



String.prototype.startsWith = function(str) {
	if (this.length >= str.length) {
		return(this.substr(0,str.length) == str);	
	}
	return(false);

}

String.prototype.trim = function(){return(this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))}

// Main


GM_registerMenuCommand("Update tagfile now" , updateNow);
GM_registerMenuCommand("Show new images" , menuConfigShowNewImages);

IsItTimeToRetrieveTaglineList();
if (ProfilePageTrickery && document.title.startsWith(ProfilePageTitleStartsWith)) PreProcessProfilePage();
ProcessPage();
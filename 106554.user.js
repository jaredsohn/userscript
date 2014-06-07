// ==UserScript==
// @id             3150dfc5-29e7-4e72-8bda-b4ce4c71a3d8
// @name           Youtube - Right Side Description
// @namespace      Takato
// @author         Takato
// @copyright      2010+, Takato (http://userscripts.org/users/82358)
// @licence        Summary: Free for personal non-commercial use; http://userscripts.org/scripts/show/106554
// @description    Puts the video description on the right side of the video.
// @version        2012.05.04
// @updateURL      http://userscripts.org/scripts/source/106554.meta.js
// @downloadURL    http://userscripts.org/scripts/source/106554.user.js
// @website        http://userscripts.org/scripts/show/106554
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// ==/UserScript==
script = {};
script.version = "2012.05.04";

// Defining script constants
script.name = "Right Side Description";
script.shortname = "RSD";
script.website = "http://userscripts.org/scripts/show/106554";
script.discussion = "http://userscripts.org/scripts/discuss/106554";
script.icon = "";
script.icon64 = "";
script.mainCSS = "";
script.mainCSS = "#watch-description {display:none !important;}    #watch-channel-vids-div {background:#EEEEEE !important; border:1px solid #CCCCCC !important; margin-bottom:10px !important; width:auto !important; margin-left:0px !important;}    #watch-channel-vids-top {padding:0 5px !important; overflow:hidden !important;}  #watch-channel-icon {float:left !important; margin-top:6px !important; height:46px !important; width:46px !important; background-color:white !important; border:3px double #999999 !important; display:block !important; overflow:hidden !important;}  #watch-channel-icon div {margin-left:-177px !important; float:left !important; text-align:center !important; width:400px !important;}  #watch-channel-icon a {display:block !important;}  #watch-channel-icon img {height:46px !important;}    #watch-channel-stats {width:auto !important; float:left !important; line-height:18px !important; margin-left:8px !important; margin-top:2px !important;}  #watch-channel-stats .contributor {font-weight:bold !important;}  .watch-video-added {color:#333333 !important; margin-right:10px !important;}    #watch-video-details {display:block !important;}  #watch-video-details-inner-less, #watch-video-details-inner-more,   #watch-description-extra-info {margin-top:4px !important; position:static !important; padding:0 6px 4px !important; overflow:hidden !important;}    #watch-metadata {padding-top:5px !important; overflow:hidden !important; font-size:11px !important;}  #watch-metadata h4 {color:#666666 !important; font-weight:normal !important; font-size:11px !important; display:inline-block !important; margin:0 !important; margin-top:5px !important; cursor:pointer !important; border:0 !important; padding:0 !important;}  #watch-metadata div {display:inline !important;}  #watch-metadata br + br {display:none !important;}  #watch-metadata h4:hover {text-decoration:underline !important;}  #watch-metadata #metadata-label {display:none !important;}  #watch-metadata.meta-hidden h4, #watch-metadata.meta-hidden div, #watch-metadata.meta-hidden br {display:none !important;}  #watch-metadata.meta-hidden #metadata-label {display:inline-block !important;}    #watch-description-extra-info, #watch-url-embed-wrapper {margin:0px 5px !important; width:auto !important; min-height:0 !important; border-top:1px solid #CCCCCC !important; padding:0 !important;}  .watch-extra-info-long .link-list a {display:inline !important;}    #watch-url-embed-wrapper > div {font-size:11px !important; padding:1px 0 0 6px !important; padding-top:5px !important; clear:both !important; overflow:hidden !important;}  #watch-url-embed-wrapper > #watch-embed-div {padding-bottom:3px !important;}  #watch-url-embed-wrapper label {color:#666666 !important; float:left !important; font-size:11px !important; font-weight:bold !important; line-height:18px !important; margin-right:5px !important; min-width:40px !important; text-align:right !important;}  #watch-url-embed-wrapper input {float:left !important; font-size:10px !important; width:240px !important;}      #watch-channel-vids-div.short #watch-video-details-toggle-more, #watch-channel-vids-div.short #watch-video-details-inner-more, #watch-channel-vids-div.long #watch-video-details-toggle-less, #watch-channel-vids-div.long #watch-video-details-inner-less {display:none !important;}    #watch-channel-vids-div.bwp-limit-height #watch-video-details {max-height:400px !important; overflow:auto !important;}";

// Stop this script if this isn't a proper YT video page
vidplayer = document.getElementById("watch-player-unavailable");
if (vidplayer != null) {
	return;
}
winLoc = window.location.toString();
if (winLoc.indexOf("watch_editaudio") > -1) {
	return;
}
if (winLoc.indexOf("watch_popup") > -1) {
	return;
}


// Stop if already running conflicting script
ytPageBody=document.getElementsByTagName('body')[0];
if (ytPageBody.classList.contains("bwpScript")) { // Running "Better Watch Page"
	alert("\"Right Side Description\" wants to run but can't because \"Better Watch Page\" is already running. Please disable one of them.");
	return;
} else if (ytPageBody.classList.contains("rsdpScript")) { // Running old "Right Side Description Panel"
	alert("\"Right Side Description\" has detected an old version of \"Right Side Description Panel\". You should update it to the latest version ( http://userscripts.org/scripts/show/101753 ) \n\n\"Right Side Description Panel\" has also been renamed to \"Better Watch Page\" to avoid confusion with \"Right Side Description\". \nFor more information please visit the above link.");
	return;
} else if (ytPageBody.classList.contains("rsdScript")) { // Running another copy of this script
	alert("\"Right Side Description\" has detected that you have multiple copies of the script running. Please remove one of the copies, and then make sure the remaining one is up-to-date. ");
	return;
} else { // Not running any of the above, so continue
	ytPageBody.classList.add("rsdScript");
}

// Insert Main CSS
insertCSS(script.mainCSS);

// Metadata default values
var vidID = "";
var userName = "<i>User Unknown</i>";
var userURL = "";
var userImage = "http://s.ytimg.com/yt/img/no_videos_140-vfl1fDI7-.png";
var uploadDate = "<i>Date Unknown</i>";
var vidDesc = "<i>no description available</i>";
var vidMetadata = "";
var vidExtraInfo = "";
var userSubscribe = "";
var vidURL = "";
var embedURL = "";


// Grab the metadata
vidID = window.location.toString();
vidID = vidID.substring(vidID.indexOf("v=")+2, vidID.indexOf("v=")+2+11);
userName = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].innerHTML;
userURL = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].getAttribute("href");
uploadDate = document.getElementById("eow-date").innerHTML;
vidDesc = document.getElementById("eow-description").innerHTML;
vidMetadata = document.getElementById("watch-description-extras").innerHTML;
vidExtraInfo = document.getElementById("watch-description-extra-info").innerHTML;
vidURL = "http://www.youtube.com/watch?v=" + vidID;
embedURL = "<iframe width=\"560\" height=\"315\" src=\"http://www.youtube.com/embed/" + vidID + "\" frameborder=\"0\" allowfullscreen></iframe>";

while (vidMetadata.indexOf("<li>") > -1) {
	vidMetadata = vidMetadata.replace("<li>", "");
	vidMetadata = vidMetadata.replace("</li>", "&nbsp;");
}
while (vidMetadata.indexOf("<ul ") > -1) {
	vidMetadata = vidMetadata.replace("<ul ", "<p ");
	vidMetadata = vidMetadata.replace("</ul>", "</p>");
}
while (vidMetadata.indexOf("</p>") > -1) {
	vidMetadata = vidMetadata.replace("<p ", "<div ");
	vidMetadata = vidMetadata.replace("</p>", "</div><br/>");
}



// Make a 200 character short description
vidDescShort = vidDesc;
vidDescShortN = document.createElement("div");
vidDescShortN.innerHTML = vidDescShort;
while (vidDescShortN.innerHTML.indexOf("<br>") > -1) { // Replace breaks with space
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("<br>", " ");
}
while (vidDescShortN.getElementsByTagName("a").length > 0) { // Replace links with <remove> versions
	thisLink = vidDescShortN.getElementsByTagName("a")[0];
	thisLinkText = document.createElement("remove");
	thisLinkText.innerHTML = thisLink.innerHTML;
	vidDescShortN.replaceChild(thisLinkText, thisLink);
}
while (vidDescShortN.innerHTML.indexOf("<remove>") > -1) { // Remove <remove> tags (but keep the inside text)
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("<remove>", "");
}
while (vidDescShortN.innerHTML.indexOf("</remove>") > -1) {
	vidDescShortN.innerHTML = vidDescShortN.innerHTML.replace("</remove>", "");
}
vidDescShort = vidDescShortN.innerHTML;
if (vidDescShort.length > 200) { // Cut to 197 characters plus "..." if length is over 200 characters
	vidDescShort = vidDescShort.substring(0, 197) + "...";
}


// Create the description panel
var DescPanel = document.createElement("div");
DescPanel.setAttribute("id", "watch-channel-vids-div");
DescPanel.setAttribute("class", "short");
DescPanel.innerHTML = "" +
"<div id='watch-channel-vids-top'>" +
"	<div id='watch-channel-icon' class='user-thumb-medium'>" +
"		<div>" +
"			<a class='url'>" +
"				<img class='photo' alt='Channel Icon' />" +
"			</a>" +
"		</div>" +
"	</div>" +
"	<div id='watch-channel-subscribe' class='sub-button'>" +
"   </div>" +
"	<div id='watch-channel-stats'>" +
"		<a class='hLink fn n contributor'></a>" +
"		<br/>" +
"		<span class='watch-video-added post-date'></span>" +
"		<br/>" +
"		<div id='watch-video-details-toggle'>" +
"			<div id='watch-video-details-toggle-less'>" +
"				(<a class='hLink show-more'>more info</a>)" +
"			</div>" +
"			<div id='watch-video-details-toggle-more'>" +
"				(<a class='hLink show-less'>less info</a>)" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<div id='watch-video-details'>" +
"	<div id='watch-video-details-inner'>" +
"		<div id='watch-video-details-inner-less'>" +
"			<div class='watch-video-desc'>" +
"				<span class='description short-desc'></span>" +
"			</div>" +
"		</div>" +
"		<div id='watch-video-details-inner-more'>" +
"			<div class='watch-video-desc description'>" +
"				<span class='long-desc'></span>" +
"			</div>" +
"			<div id='watch-metadata' class='meta-data'>" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>" +
"<ul id='watch-description-extra-info' class='meta-extra'>" +
"</ul>" +
"";


// Insert data into the description panel
DescPanel.getElementsByClassName("url")[0].setAttribute("href", userURL);
DescPanel.getElementsByClassName("photo")[0].setAttribute("src", userImage);
DescPanel.getElementsByClassName("contributor")[0].setAttribute("href", userURL);
DescPanel.getElementsByClassName("contributor")[0].innerHTML = userName;
DescPanel.getElementsByClassName("watch-video-added")[0].innerHTML = uploadDate;
DescPanel.getElementsByClassName("short-desc")[0].innerHTML = vidDescShort;
DescPanel.getElementsByClassName("long-desc")[0].innerHTML = vidDesc;
DescPanel.getElementsByClassName("meta-data")[0].innerHTML += vidMetadata;
DescPanel.getElementsByClassName("meta-extra")[0].innerHTML = vidExtraInfo;

// Event listeners
DescPanel.getElementsByClassName("show-more")[0].addEventListener("click", descShowMore, true);
DescPanel.getElementsByClassName("show-less")[0].addEventListener("click", descShowLess, true);
descShowLess();
document.getElementById("watch-description").addEventListener("DOMAttrModified", descCheckStatus, true);


// Prepare the description area and insert the description panel
sideBar = document.getElementById("watch-sidebar");
sideBar.insertBefore(DescPanel, sideBar.children[0]);

// Limit description height 
DescPanel.classList.add("bwp-limit-height");

// Remove "watch-description-extra-info" if it is empty
watchExtraInfo = document.getElementById("watch-description-extra-info");
try {
	if (watchExtraInfo.children.length == 0) {
		watchExtraInfo.parentNode.removeChild(watchExtraInfo);
	}
}catch(ex){}

// Make "Category" and "Tags" toggle buttons
metadataSection = document.getElementById("watch-metadata");
metadataSection.innerHTML = "<h4 id='metadata-label'>[Video Metadata]</h4>" + metadataSection.innerHTML;
H4s = metadataSection.getElementsByTagName("h4");
var count = 0;
var metadataVisible = true;
while (count < H4s.length) {
	H4s[count].addEventListener("click", toggleMetadata, true);
	count++;
}

// Grab user image for description panel
grabUserImage();



// ---------------------------------------
// FUNCTIONS -----------------------------
// ---------------------------------------



// Function to insert CSS
function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}



function grabUserImage() {
	var profilePage;
	profilePage = "";
	
	isOkay = true;
	try { // Stop crashing in FF14 due to bug 741267
		xmlhttp = new XMLHttpRequest();
	} catch (ex) {
		debug("FF14 XMLHttpRequest bug. Using blank channel avatar.");
		isOkay = false;
	}
	
	if (isOkay) {
		xmlhttp.open("GET", "http://www.youtube.com" + userURL, true);
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4) {
				profilePage = document.createElement("div");
				profilePage.innerHTML = xmlhttp.responseText;
				try { // New Channels
					userImage = profilePage.getElementsByClassName("profile-thumb")[0].getElementsByTagName("img")[0].getAttribute("src");	
				} catch(ex) { // Old Channels
					userImage = profilePage.getElementsByClassName("channel-thumb-holder")[0].getElementsByTagName("img")[0].getAttribute("src");
				}
				profilePage.innerHTML = "";
				DescPanel.getElementsByClassName("photo")[0].setAttribute("src", userImage);
			}
		}
		xmlhttp.send(null);
	}
}

function descShowMore() {
	DescPanel.classList.remove("short");
	DescPanel.classList.add("long");
}
function descShowLess() {
	DescPanel.classList.remove("long");
	DescPanel.classList.add("short");
}
function descCheckStatus() {
	status = document.getElementById("watch-description").getAttribute("class");
	if (status.indexOf("yt-uix-expander-collapsed") > -1) {
		descShowLess();
	} else {
		descShowMore();
	}
}

function toggleMetadata() {
	if (metadataVisible) { // Cat&Tags are visible, hide them
		metadataSection.setAttribute("class", "meta-data meta-hidden");
		metadataVisible = false;
	} else { // Cat&Tags are hidden, make them visible
		metadataSection.setAttribute("class", "meta-data");
		metadataVisible = true;
	}
}


// End of script
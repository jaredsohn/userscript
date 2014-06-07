// ==UserScript==
// @id             4614b1e6-a106-44b5-9cea-527ef47e9122
// @name           CNET Download.com - NoBadware: Direct Download Links
// @namespace      Takato
// @author         Takato
// @copyright      2010+, Takato (http://userscripts.org/users/82358)
// @licence        Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License; https://creativecommons.org/licenses/by-nc-sa/3.0/
// @description    Skip CNET's ad-ware downloader/installer. Download the actual application that you want!
// @version        2013.02.11
// @updateURL      https://userscripts.org/scripts/source/111137.meta.js
// @downloadURL    https://userscripts.org/scripts/source/111137.user.js
// @website        http://userscripts.org/scripts/show/111137
// @include        http://download.cnet.com/*
// @include        https://download.cnet.com/*
// ==/UserScript==
version = "2013.02.11";

// Check if this is a download page
if (document.getElementsByTagName("body")[0].getAttribute("class").indexOf("pageType3000") == -1) {
	return; // This isn't a download page. Stop script.
}

// Find the sections
downloadArea = document.getElementById("downloadLinks");
bigDownload = downloadArea.getElementsByClassName("downloadNow")[0];
littleDownload = downloadArea.getElementsByClassName("dlLinkWrapper")[0];

// Is this download using CNET's downloader/installer?
if (littleDownload == undefined) {
	// Download is probably direct.
	littleDownload = document.createElement("div");
	littleDownload.setAttribute("class", "dlLinkWrapper");
	littleDownload.innerHTML = "<b>NoBadware:</b> Download doesn't use CNET Installer";
	downloadArea.appendChild(littleDownload);
} else {
	// Download uses CNET's downloader/installer. We better fix it.
	directLink = document.getElementById("loggedInUserDlLink");
	if (directLink == undefined) { // If can't find direct link.
		littleDownload.setAttribute("style", "font-size:11px; color:red;");
		littleDownload.innerHTML = "<b>NoBadware:</b> Could not create direct download link. <br/>Please check for NoBadware updates or report a bug if you are using the latest version.";
		document.getElementById("noBadwareReportLink").addEventListener("click", reportLink, true);
		return;
	}
	directLinkURL = directLink.getAttribute("href");
	bigDownload.getElementsByClassName("small")[0].setAttribute("href", directLinkURL);
	littleDownload.innerHTML = "<b>NoBadware:</b> CNET Installer link replaced with direct download link";
}

littleDownload.setAttribute("style", "font-size:10px; padding:3px; padding-top:0px; margin-top:0; font-style:italic;");
downloadArea.setAttribute("style", "background:#E6EAED; border-radius:0px 0px 3px 3px;");



// End of script
// ==UserScript==
// @name           Rapidshare Auto Downloader
// @description	   Downloaded automatisch alle Rapidshare Files sobald eine Rapidshare seite geöffnet wird. Sollte sowohl im englischen aus auch im deutschen rapidshare funktionieren. Basiert auf einem anderen Script, funktion ohne Gewähr.
// @namespace      rapidshare.com
// @author         Manu
// @include        http://rapidshare.com/files/*
// @include        http://www.rapidshare.com/files/*
// @include        http://rs*.rapidshare.com/files/*
// ==/UserScript==

location.href = "javascript:(" + encodeURI(uneval(function() {

	// the timeout in seconds, after which we try to reload the page in case of an error
	// should be at least 10, otherwise it can behave badly
	repeatTimeout = 45;
	
	// add some randomness to the waiting time? this should be a prevention from being detected
	useFuzzyLogic = true;
	
	// set this to false if you want to see the big blue advertisement;-)
	hideAd = true;
	
	// ------------- BEGIN
	// this part has to be rewriten if they change the site
	inhaltbox = document.getElementById("inhaltbox");

	if (hideAd) hideAdF();
	
	/**
	 * hide the advertisements
	 */
	function hideAdF() {
		// find klappbox
		if ((undefined !== inhaltbox) && (null !== inhaltbox)) {
			var inhaltchilds = inhaltbox.childNodes;
			var klappbox;
			for (i in inhaltchilds) { ch = inhaltchilds[i];
				if (ch.className == "klappbox") {
					klappbox = ch;
					break;
				}
			}
			
			//browse through childnodes of klappbox
			if (undefined !== klappbox) {
				kc = klappbox.childNodes;
				var disabling = false;
				for (i in kc) {
					var ch = kc[i];
					// hide everything after the specified text
					if ( (ch.nodeType == 1) && ( (ch.innerHTML.search(/Create Premium Account/g) > -1 || ch.innerHTML.search(/Premium-Account einrichten/g) > -1)
							
 || (ch.innerHTML.search(/Sie möchten Ihre Dateien auch schnell und einfach versenden/g) > -1)
				|| (ch.innerHTML.search(/Do you want to send your files with ease and speed?/g) > -1 )
											|| (ch.innerHTML.search(/Premium members can download any number of files simultaneously./g) > -1 )
											)
						) {
							disabling = true;
					}
					if (disabling) {
						if (ch.nodeType == 1) ch.style.display = "none";
						else if (ch.nodeType == 3) ch.nodeValue = "";
					}
				}
			}
			// hide other specific items here
			//document.body.childNodes[1].childNodes[3].style.display = "none"; // rapidshare logo
			//document.body.childNodes[1].childNodes[1].style.display = "none"; // hauptmenue
			//inhaltbox.childNodes[5].style.display = "none"; // untermenue
		}
	}
	
	/**
	 * locates the download form and submits it
	 * there is a 4 second timeout just for sure (it didn't work sometimes when called immediatelly)
	 */
	window.submitDownloadForm = function() {
		window.setTimeout("document.dlf.submit();", 4000);
	}

	/**
	 * find out if there is an error with the download. Either rapidshare error (limit, etc.)
	 * or network error (lost connection)
	 * 
	 * @return boolean    true if there was an error
	 */
	function isError() {
		var chyba = "";
		if (inhaltbox.getElementsByTagName("h1").length > 0) {
			chyba = inhaltbox.getElementsByTagName("h1")[0].innerHTML; // content of the first H1 element in "inhaltbox" div
			if (chyba.indexOf("Error") > -1 || chyba.indexOf("Fehler") > -1) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * return the type of error. If no error, return false
	 *
	 * @return string|boolean  the error type, or false
	 */
	function getErrorType() {
		// thanks to Aquilax
		var element1=document.getElementById("errorTitleText");
		if (element1) {
			var text1=element1.textContent;
			switch (text1) {
				case "Connection Interrupted":
				case "Network Timeout":
				case "Failed to Connect":
				case "Address Not Found":
					return "network-error"; // document.getElementById("errorTryAgain").click();
					break;
			}
		} else if (isError()) {
			var errorText = inhaltbox.getElementsByTagName("div")[0].innerHTML;
			switch (true) {
				case (errorText.search(/Your IP address \d+.\d+.\d+.\d+ is already downloading a file/g) > -1):
				case (errorText.search(/Ihre IP-Adresse/g) > -1):
					return "downloading";
					break;
				case (errorText.search(/You have reached the download limit for free-users/g) > -1):
				case (errorText.search(/Sie haben das Download-Limit für die kostenlose Nutzung erreicht/g) > -1):
					return "wait";
					break;
				case (errorText.search(/The file could not be found./g) > -1):
				case (errorText.search(/nicht gefunden./g) > -1):
					return "not-found";
					break;
				case (errorText.search(/The download session has expired./g) > -1):
				case (errorText.search(/Download Session./g) > -1):
					return "session-timeout";
					break;
				case (errorText.search(/Currently a lot of users are downloading files./g) > -1):
				case (errorText.search(/Viele./g) > -1):
					return "too-many-users";
					break;
				case (errorText.search(/We regret that currently we have no available slots for free users./g) > -1):
				case (errorText.search(/keine freien slots/g) > -1):
					return "no-free-slots";
					break;
				case (errorText.search(/The download cannot be provided. Please check, if your browser supports Javascript./g) > -1):
					return "weird"; // ;-)
					break;
				default:
					return "unknown";
			}
		}
		return false;
	}

	function checkFirstPage() {
		if (document.forms["ff"]) return true;
		return false;
	}

	function sendFFform() {
		document.forms["ff"].submit();
	}
	
	function getDownloadLink() {
		var link = "";
		if (getErrorType() != "network-error") {
			var klappbox = inhaltbox.getElementsByTagName("div")[0];
			var ka = klappbox.getElementsByTagName("p");
			for (p in ka) {
				if (ka[p].className == "downloadlink") {
					if (ka[p].firstChild.tagName == "A") {
						link = ka[p].firstChild.href;
					} else {
						link = ka[p].firstChild.nodeValue.replace(/^\s+|\s+$/g,"");
					}
				}
			}
		}
		if (link == "") { //no downloadlink present
			link = document.location+""; //copy, not reference
			link = link.replace(/http:\/\/rs.+\.rapidshare/, "http://rapidshare");
		}
		return link;
	}
	// ------------- END
	
	
	window.titleTimer = function(message, countdown) {
		document.title = message.replace(/%s/g, countdown);
		if (countdown > 0) {
			countdown = countdown-1;
			window.setTimeout("titleTimer(\""+message+"\", "+countdown+")", 1000);
		}
	}

	function RapidshareAutowait() {
		if (checkFirstPage()) {
			document.title="Odeslat formular";
			sendFFform();
			return;
		}
		
		var error = false;
		if (error = getErrorType()) {
			switch (error) {
				case "not-found":
					alert("file not found");
					break;
				case "network-error":
					repeatTimeout = 10; // the user has already been waiting for a while
					useFuzzyLogic = false;
				case "wait":
				case "downloading":
				case "session-timeout":
				case "too-many-users":
				case "no-free-slots":
				case "weird":
					var w = repeatTimeout;
					if (useFuzzyLogic) {
						w = w + Math.ceil(Math.random()*11 - 6); // +-5 seconds
						if (w < 0) w = 0;
					}
					titleTimer("Waiting for %s s and trying again", w);
					var href = getDownloadLink();
					window.setTimeout("document.location = '"+href+"'", w*1000 );
					break;
			}
		} else { // no error - countdown or download ready
			if (undefined !== c) { // c is a variable used in the RapidShare site for the pre-download countdown
				if (c > 0) {
					// countdown
					titleTimer("Countdown - %s s to start downloading", c);
					window.setTimeout(RapidshareAutowait, c*1000+2000); // c+2 seconds (just in case..) 
				} else {
					// download ready
					submitDownloadForm();
					document.title="Success - download starting!";
				}
			} else {
				// unknown error
				alert("Unknown error - has the site changed?");
			}
		}
	}
	RapidshareAutowait();
	
})) + ")();";


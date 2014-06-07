// ==UserScript==
// @name			Google Reader Minus Craigslist Spam/Deleted/Expired
// @namespace			iowa.city.sam
// @include			http://www.google.com/reader/*
// @include			https://www.google.com/reader/*
// @include			http://reader.google.com/reader/*
// @include			https://reader.google.com/reader/*
// ==/UserScript==

/*
* Google Reader Minus Craigslist Spam/Deleted/Expired
* Version 1.1
* Originally Written by Sam Beran, Updated by AaronD to work on 02/11/2009
* This script is Public Domain. You are welcome to use it in any way you like.
*
*
***********************************************************
* This script will hide craigslist entries in Google Reader if they have been flagged,
* deleted, or have expired. They will also be marked as read.
***********************************************************
*/
var spam = 'flagged</a> for removal';
var deleted = 'This posting has been deleted by its author';
var expired = 'This posting has expired';

//find the entry link and see if it goes to cl
function removeSpamEntry(element,linkClassName,tagToClick,classToClick){
	var links = element.getElementsByTagName('A');
	for(var i=0;i<links.length;i++){
		var link = links[i];
		if((link.className==linkClassName) && link.href.match(/craigslist\.org/)) {
			//analyze the link's content
			var linkvar = link.href;
			setTimeout(function(){callbackfunction(element, linkvar, tagToClick, classToClick)}, 0);
		}
	}
}

function callbackfunction(element, linkvar, tagToClick, classToClick) {
	//GM_log('Requesting link: ' + linkvar);
	GM_xmlhttpRequest({
		method: 'GET',
		url: linkvar,
		headers: {	'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20090210 Shiretoko/3.1b3pre',
					'Accept': 'application/atom+xml,application/xml,text/xml' }, 
		onload: function(responseDetails) {
					//see if it is spam or deleted
					if(responseDetails.responseText.indexOf(spam) >= 0 || responseDetails.responseText.indexOf(deleted) >= 0 || responseDetails.responseText.indexOf(expired) >= 0) {
						//GM_log('Removing item from link: ' + linkvar);
						var elems = element.getElementsByTagName(tagToClick);
						for(var i=0; i < elems.length; i++) {
							var el = elems[i];
							//hide the element and mark it as read by clicking it
							element.style.display = 'none';
							if(el.className==classToClick) {
								// click it. code from MDC: http://developer.mozilla.org/en/docs/DOM:document.createEvent
								var evt = document.createEvent("MouseEvents");
								evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
								el.dispatchEvent(evt);
							}
						}
					} else {
						//GM_log('Link: ' + linkvar + ' appears to be good...');
					}
				},
		onerror: function(responseDetails) {
				GM_log('Request returned error status: ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' + 'Response Text:\n' + responseDetails.responseText);
		}
	});
}


function process_inserted_node(e){
	var element = e.target;
	if (element.nodeName=='DIV' && element.className.indexOf('entry')>-1){
		//an expanded view entry card
		if(element.firstChild.className.indexOf('card')>-1) {
			removeSpamEntry(element,'entry-title-link','span','read-state-unread read-state link');
		}
		//a list view collapsed entry
		else if(element.firstChild.className == 'collapsed'){
			removeSpamEntry(element,'entry-original','div','collapsed');
		}
	}
}


document.body.addEventListener('DOMNodeInserted', process_inserted_node, false);
// ==UserScript==
// @name           GGG Multi-Feed
// @namespace      hunsley@gmail.com
// @description    Allows multi-feeding of the Gluttonous Green Ghost
// @include        *kingdomofloathing.com/inventory.php?which=1
// @include        *kingdomofloathing.com/login.php*
// ==/UserScript==

// Version 1.0	05/16/2008	First release.

//Login page - Reset session variables then exit
if (window.location.pathname == "/login.php") {
	GM_setValue('phpSessIdString','UNDEFINED');
	return false;
}

//Obtain the PHPSESSID from the cache, or the cookies if not cached
var phpSessIdString = GM_getValue('phpSessIdString','UNDEFINED');
if (phpSessIdString == 'UNDEFINED') {
	phpSessIdString = GetPHPSessIdString();
	if(phpSessIdString == '') {
		GM_log("Could not retrieve PHPSESSID.  Exiting");
		return false;
	}
	GM_setValue('phpSessIdString',phpSessIdString);
}

var feeding = false,successfulRequests = 0,unsuccessfulRequests = 0,totalRequests = 0;

//TODO: Find [give up to the ghost] links, and add a [multi-feed] link.  Onclick results as follows:
//	1) If a previous multi-feed link has been clicked, it reverses the addition of the textbox and button, and returns the original link
//	2) Replace the [give up the ghost] link with a text input and submit button/link.  Onlick on the button as follows:
//		a) Validate the number.  <= 0, throw away and set back to 0.  > # in possession, set to # and begin.  Else, simply begin
//		b) Pass in the number, and the url from the original [give up to the ghost] link

var curMultiFeedNode,replacedFeedLink,replacedMultiLink; //nodes
var feedGGGLinks = document.evaluate('//a[contains(@href,"inventory.php?") and contains(@href,"action=ghost")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0;i<feedGGGLinks.snapshotLength;i++) {
	linkNode = feedGGGLinks.snapshotItem(i);
	var multiFeedLink = document.createElement('a');
	multiFeedLink.setAttribute('href','javascript:void(0)');
	multiFeedLink.textContent = '[multi-feed]';
	multiFeedLink.addEventListener('click',function() {
		//alert("listener");
		if (!feeding) {
			if (curMultiFeedNode) {
				//GM_log('re-appending');
				var curParent = curMultiFeedNode.parentNode;
				curParent.removeChild(curMultiFeedNode);
				var blankSpace = document.createTextNode(' ');
				curParent.appendChild(replacedFeedLink);
				curParent.appendChild(blankSpace);
				curParent.appendChild(replacedMultiLink);
				
				curMultiFeedNode = null;
				replacedFeedLink = null;
				replacedMultiLink = null;
			}
			var statusNode = document.getElementById('GGGMultiFeedStatus');
			if (statusNode) {
				statusNode.parentNode.removeChild(statusNode);
			}
			
			var foodName = this.parentNode.parentNode.getElementsByTagName('b')[0].textContent;
			var numAvailableText = this.parentNode.parentNode.getElementsByTagName('b')[0].nextSibling.textContent;
			var numAvailable,numAvailableText2;	

			if (numAvailableText.match(/\(\d+\)/)) {
				numAvailable = parseInt(numAvailableText.replace(/[\s\(\)]/g,''));
			}
			else {
				numAvailable = 1;
			}
			//GM_log('foodName: '+foodName+'\nnumAvailable: '+numAvailable);


			replacedFeedLink = this.previousSibling.previousSibling;
			var url = replacedFeedLink.href;
			var linkParent = this.parentNode;
			replacedMultiLink = this;
			var spacer = replacedFeedLink.nextSibling;
			replacedFeedLink.parentNode.removeChild(replacedFeedLink);
			spacer.parentNode.removeChild(spacer);
			replacedMultiLink.parentNode.removeChild(replacedMultiLink);

			curMultiFeedNode = document.createElement('span');
			curMultiFeedNode.innerHTML = '<form name="GGGMultiFeed"><input id="GGGMultiFeedUrl" type="hidden" value="'+url+'"/><input id="GGGMultiFeedFoodName" type="hidden" value="'+foodName+'"/><input type="hidden" id="GGGMultiFeedNumAvailable" value="'+numAvailable+'"/><input type="text" maxlength="5" size="5" id="GGGMultiFeedNum"/><input type="button" class="button" id="GGGMultiFeedSubmit" value="Go"/></form>';
			linkParent.appendChild(curMultiFeedNode);

			var submitButton = document.getElementById('GGGMultiFeedSubmit');
			submitButton.addEventListener('click',multiFeed,false);
		}
	},false);
	
	var blankSpace = document.createTextNode(' ');
	linkNode.parentNode.insertBefore(multiFeedLink,linkNode.nextSibling);
	linkNode.parentNode.insertBefore(blankSpace,linkNode.nextSibling);
}


//TODO: function multiFeed()
//	1) Save requested number.  Set successful and unsuccessful counters to zero.
//	2) Insert a node at the top of the page (with an anchor) with a counter of (x/y) where x is successful feedings and y is the requested number.  Force the page to the anchor
//	3) For (i=0;i<y;i++) send a POST request to <url> (unless unsuccessful count >= 5, in which case abort and update top node with this info).  Process response:
//		a) onerror, oncomplete but status != 200, or successful feeding text not present in response: Increment unsuccessful counter. 
//		b) successful request?  increment successful counter.  Update node at top of page.  Go back and submit another POST request.
//	4) After completion of the loop (if successful), save a temp variable storing results. Force a refresh of the page to update inv, then insert a node with those results at the top and erase the temp data.
function multiFeed() {
	successfulRequests = 0;
	unsuccessfulRequests = 0;

	//Find the number and url requested
	var feedUrl = document.getElementById('GGGMultiFeedUrl').value;
	var totalRequestValue = document.getElementById('GGGMultiFeedNum').value;
	totalRequests = parseInt(totalRequestValue.replace(/[^\d]/g,''));
	var foodName = document.getElementById('GGGMultiFeedFoodName').value;
	var numAvailable = parseInt(document.getElementById('GGGMultiFeedNumAvailable').value);
	if (totalRequests > numAvailable) {
		totalRequests = numAvailable;
	}
	//GM_log("url: "+feedUrl+"\nrequest value: "+totalRequestValue+'\nrequests: '+totalRequests);

	var statusNode = document.getElementById('GGGMultiFeedStatus');
	if (statusNode) {
		statusNode.parentNode.removeChild(statusNode);
	}

	if ((!totalRequests)||(isNaN(totalRequests))||(totalRequests == 0)) {
		return false;
	}
	else {
		//Create node at the top with request status
		var statusNode = document.createElement('table');
		statusNode.setAttribute('name','GGGMultiFeedStatus');
		statusNode.setAttribute('id','GGGMultiFeedStatus');
		statusNode.setAttribute('width','95%');
		statusNode.setAttribute('cellspacing','0');
		statusNode.setAttribute('cellpadding','0');

		statusNode.innerHTML = '<tr><td colspan="2" bgcolor="blue" align="center" id= "GGGMultiFeedStatusTitle" style="color: white;">GGG Multi-Feed Status: '+foodName+'</td></tr><tr align="center" style="border: 1px solid blue; padding: 5px"><td id="GGGMultiFeedStatusLine" style="text-align: right;" width="50%">Successful feedings: '+successfulRequests+' / '+totalRequests+'&nbsp;&nbsp;</td><td style="text-align: left;" width="50%"><input type="button" class="button" id="GGGMultiFeedAbort" value="Abort"/></td></tr>';

		var prevTab = document.getElementsByTagName('table')[0];
		var parent = prevTab.parentNode;
		parent.insertBefore(statusNode,prevTab);
		feeding = true;

		abortButton = document.getElementById('GGGMultiFeedAbort');
		abortButton.addEventListener('click',function() {AbortFeeding('Aborted by user')},false);

		window.location.hash = 'GGGMultiFeedStatus';

		//TODO: Actually perform the requests
		SubmitRequest();
	}

}

function SubmitRequest() {
	if (feeding) {
		//GM_log('successful: '+successfulRequests+'\nunsuccessful: '+unsuccessfulRequests+'\ntotal: '+totalRequests);
		if ((((successfulRequests + unsuccessfulRequests) < totalRequests)) || ((successfulRequests + unsuccessfulRequests)>=totalRequests)&&(unsuccessfulRequests<5)&&((successfulRequests + unsuccessfulRequests)<(totalRequests + unsuccessfulRequests))) {

			url = document.getElementById('GGGMultiFeedUrl').value;
			GM_xmlhttpRequest({
				method:'POST',
				url:url,
				headers: {'Content-type': 'application/x-www-form-urlencoded',
						'Cookie': phpSessIdString},
				onload:function(response) {
					responseText = response.responseText;
					var munchMessage = false;
					if (responseText.match(/devours it hungrily|crossed streams of mustard|a thunderous belch|munches it happily|takes a dainty bite|going out of style|Crumbs fly everywhere|And gusto makes/)) {
						munchMessage = true;
						//GM_log('successful munching message found.');
						//GM_log('responseText:\n'+responseText);
					}
					if ((response.status != 200) || (!munchMessage)) {
						GM_log('Response received but invalid');
						//GM_log('status: '+response.status+'\ntext:\n'+responseText);
						unsuccessfulRequests++;
						if (unsuccessfulRequests >= 5) {
							AbortFeeding('Aborted: Five unsuccessful feedings');
						}
						else {
							SubmitRequest();
						}	
					}
					else {
						successfulRequests++;
						var statusLine = document.getElementById('GGGMultiFeedStatusLine');
						statusLine.textContent = 'Successful feedings: '+successfulRequests+' / '+totalRequests+'  ';
						SubmitRequest();
					}					
						
				},
				onerror:function(response) {
					GM_log('error on POST');
					unsuccessfulRequests++;
					if (unsuccessfulRequests >= 5) {
						AbortFeeding('Aborted: Five unsuccessful feedings');
					}
					else {
						SubmitRequest();
					}
				}
			});
		}
		else {
			//If we get here, we should be truly completed
			var statusTitle = document.getElementById('GGGMultiFeedStatusTitle');
			statusTitle.textContent += ' (Completed)';
			feeding = false;
			successfulRequests = 0;
			unsuccessfulRequests = 0;
		}
	}
}

function AbortFeeding(reason) {
	if (feeding) {
		feeding = false;
		//Add aborted reason to the status title
		statusTitle = document.getElementById('GGGMultiFeedStatusTitle');
		statusTitle.textContent += ' (' + reason + ')';
		statusTitle.bgColor = 'red';
	}
}


function GetPHPSessIdString() {
	var allCookies = document.cookie;
	var cookieMatch = allCookies.match(/(.*;)?(PHPSESSID=[^,;\s]+)(;.*)?/);
	if(cookieMatch[2]) {
		return cookieMatch[2];
	}
	else {
		return '';
	}
}

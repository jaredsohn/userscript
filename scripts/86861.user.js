// ==UserScript==
// @name           TroLLReporter
// @namespace      shaldengeki
// @description    Reports trollposts on ETI to ETITroll's database for analysis.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        http://archives.endoftheinter.net/showmessages.php*
// @version        1.0
// ==/UserScript==

//this function is blatantly stolen from citizenslick! thanks shinsenaryu and citizenray!
function getUrlVars(urlz) {
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	 
	return vars;
}

function submitPost(e, trollPost) {
	//first, alert user that reporting is occuring.
	spanParent = e.target.parentNode.parentNode;
	messageID = spanParent.getAttribute("messageid");
	topicID = spanParent.getAttribute("topicid");
	page = spanParent.getAttribute("page");

	spanParent.innerHTML = " | <i>Submitting...</i>";	

	//get this user's username.
	/* fuck llamaguy. */
//	var raw_username = document.getElementsByClassName("menu-user")[0].text;
	var raw_username = document.getElementsByClassName("userbar")[0].getElementsByTagName("a")[0].innerHTML;
	var username = raw_username.substr(0, raw_username.indexOf(" ("));
	
	function onloadHandler(response) {
		//alert user that report has been submitted, and give them the proper reponse.
		switch(parseInt(response.responseText)) {
			case -1:
				spanParent.innerHTML = " | <i>Report deleted.</i>";
				break;
			case 1:
				spanParent.innerHTML = " | <i>Report submitted! <u>Undo</u></i>";
				spanParent.getElementsByTagName('u')[0].addEventListener("click", function(e){submitPost(e, -1)}, true);
				break;
			case 2:
				spanParent.innerHTML = " | <i>Error: Unauthenticated user.</i>";
				break;
			case 4:
				spanParent.innerHTML = " | <i>Error: Malformed request.</i>";				
				break;
			default:
				spanParent.innerHTML = " | <i>Unknown error.</i>";
				break;
		}
	}
	
	//now submit the report to the server.
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://llanim.us/troLLreporter/report_post.php?type=' + trollPost + '&messageid=' + messageID + '&topicid=' + topicID + '&page=' + page + '&username=' + username, 
		onload: onloadHandler
	});
}

function processPosts() {
/*	FUCK llamaguy. */
	page = document.getElementsByClassName("infobar")[0].innerHTML;
	pageNumStart = page.indexOf("Page ") + " Page ".length - 1;
	pageNumEnd = page.indexOf(" of <span>");
	page = page.substr(pageNumStart, pageNumEnd - pageNumStart);
//	page = document.getElementsByClassName("pager")[0].getElementsByTagName("span")[0].innerHTML;
	
	var divs=document.getElementsByClassName('message-top');
	for (var i=0; i<divs.length; i++) {
		if (!divs[i].hasAttribute("trollpost")) {
			divs[i].setAttribute("trollpost", 1);
			var asi=divs[i].getElementsByTagName("a");
			if (asi[2]) {
				var reportContainer = document.createElement("span");
				reportContainer.setAttribute("class", 'reportContainer');
				reportContainer.innerHTML = " | <span id = 'stp" + i + "'><u>Report trollpost</u></span> | <span id = 'sntp" + i + "'><u>Not trollpost</u></span>";
				divs[i].appendChild(reportContainer);				
				var trollpost_span = document.getElementById('stp' + i);
				var nontrollpost_span = document.getElementById('sntp' + i);
				topicid = getUrlVars(asi[2].href)["topic"];
				messageid = getUrlVars(asi[2].href)["id"];

				trollpost_span.parentNode.setAttribute('messageid', messageid);
				trollpost_span.parentNode.setAttribute('topicid', topicid);
				trollpost_span.parentNode.setAttribute('page', page);
	
				trollpost_span.addEventListener("click", function(e){submitPost(e, 1)}, true);
				nontrollpost_span.addEventListener("click", function(e){submitPost(e, 0)}, true);
			}
		}
	}
}

processPosts();
document.addEventListener("DOMNodeInserted", processPosts, false);
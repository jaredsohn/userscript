// Craigslist Images
// by jordan (jordan{at}southernmecca(dot)org)
//
// ==UserScript==
// @name         Craigslist Images
// @namespace    http://southernmecca.org/
// @description  Displays image attachments along with search results
// @include      http://*.craigslist.tld/*
// ==/UserScript==

var intPostIndex = 0;
var aryLinks = Array();
var client;

function getLinks(objDocument) {

	var pattern = "//a";
	var resultLinks = objDocument.evaluate( pattern, objDocument, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var i=0;
	var strTemp = "";
	
	while ((res = resultLinks.snapshotItem(i) ) !=null ){

		strURL = res.href;
		
		if ( aryMatch = strURL.match(/.+\.html$/) ) {
	
			objDiv = objDocument.createElement('div');
			objDiv.innerHTML = "";

			if ( !res.parentNode.innerHTML.match(/pic/) ) {
				objDiv.style.display = "none";
			}

			res.parentNode.appendChild(objDiv);

			aryLinks[aryLinks.length] = Array(strURL, objDiv);
		}

		i++;
	}

}

window.parsePosts = function () {

	aryLinkInfo = aryLinks[intPostIndex];
	callServer(aryLinkInfo[0]);

}


window.parsePost = function(objDoc) {

	if ( aryMatch = objDoc.match(/(<table summary="craigslist hosted images">[\s\S]+<\/table>)/) ) {
		aryLinkInfo = aryLinks[intPostIndex];
		aryLinkInfo[1].innerHTML = aryMatch[1];
	}
	
	if ( intPostIndex < aryLinks.length-1 ) { 
		intPostIndex++;
		callServer(aryLinks[intPostIndex][0]);
	}
}

function createClient() {
	try {
		client = window.XMLHttpRequest ? new XMLHttpRequest() : 
							new ActiveXObject("Microsoft.XMLHTTP");
	} catch (e) { 
		alert("Sorry, your browser is not AJAX-enabled!"); 
	}
}


function callServer(strURL) {
	createClient();
	client.onreadystatechange = callback;
	client.open("get",strURL,true);
	client.send("");
}

function callback() {

	if (client.readyState == 4) {
		if (client.status == 200) {

			parsePost(client.responseText);

		} else {
			alert("There was a problem retrieving the response:\n" +client.statusText);
			createClient();
		}
	}
}

getLinks(document);
parsePosts();
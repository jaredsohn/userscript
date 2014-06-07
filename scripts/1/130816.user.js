// ==UserScript==
// @name          General: Requester ID
// @description   Displays the Requester ID in the dashboard and HIT search.
// @include       https://www.mturk.com/mturk/statusdetail*
// @include       http://*.mturk.com/*
// @include       https://*.mturk.com/*
// ==/UserScript==

function getFirstRequesterAnchor(str) {
    var ra = getRequesterAnchors();
    for (var i = 0; i < ra.length; i++) {
        if (ra[i].href.match(str)) {
            return ra[i];
        }
    }
    return null;
}

function insertAttrsHTML(n,requesterID) {
    var parent = n.parentNode;
	if (parent!=null) {
		var stuff = "<br />";
		stuff += requesterID;
		parent.innerHTML = parent.innerHTML + stuff;
		
	} 
}

function parseAndInsert(n,k) {
	var requesterID = requesterIds[k];
	insertAttrsHTML(n, requesterID);
}

function getRequesterAnchors() {
    var anchors = document.getElementsByTagName("a");
    var requesterAnchors = new Array;
    for (var i = 0; i < anchors.length; i++) {
		var href = anchors[i].getAttribute('href');
        if (href!=null) {
			if ((href.match("requesterId")) && !(anchors[i].innerHTML.match("Contact the Requester of this HIT")) && !(href.match("signature")) || ((href.match("requesterId") && (window.location.toString().match("statusdetail"))))) {
				requesterAnchors.push(anchors[i]);
			}
        }
    }
    return requesterAnchors;
}

function getRequesterList() {
	var anchors = document.getElementsByTagName("a");
	for (var i = 0; i < anchors.length; i++) {
		var href = anchors[i].getAttribute('href');
		if (anchors[i].innerHTML.match("Contact the Requester of this HIT")) {
			// just in case Amazon switches page, want to die nicely.
			try {
				requesterIds.push(href.split("requesterId=")[1].split("&")[0]);
			} catch(err) {
			}
		}
		var title= anchors[i].getAttribute('title');
		if (title==null) title="";
		if ((window.location.toString().match("statusdetail")) && (title=="Contact this Requester")) {
			// just in case Amazon switches page, want to die nicely.
			try {
				requesterIds.push(href.split("requesterId=")[1].split("&")[0]);
			} catch(err) {
			}
		}	
	}
}

function getCurrentHIT() {
	var curRequesterId=getRequesterId();
	if (curRequesterId!=null) {
		requesterIds.push(curRequesterId);
	}
}

function getLocationData(str) {
	var location = window.location.toString();
	var splitArr = location.split(str+"="); 
	if (splitArr.length == 1) return "";
	return splitArr[1].split("&")[0];
}

function getRequesterId() {	
	var requesterId=getLocationData('requesterId');
	if (requesterId!=null && requesterId!="") return requesterId;
	var forms = document.getElementsByTagName("FORM");
	for (var i=0; i<forms.length; i++) {
		var splitArr=forms[i].innerHTML.split('requesterId" value="');
		if (splitArr.length > 1) return splitArr[1].split('"')[0];
	}
	var location = window.location.toString();
	if ((location.match("preview")) || (location.match("previewandaccept")) || (location.match("accept")) || (location.match("return"))) {	
		var splitArr = document.referrer.split("requesterId="); 
		if (splitArr.length == 1) return null;
		return splitArr[1].split("&")[0].replace("#","");		
	}
	return null;
}

var requesterIds=new Array();
var useOldData=1;
var useNewData=1;

continueLoading()
function continueLoading() {
	getRequesterList();
	getCurrentHIT();
	
	if (useOldData==1) {
		var requesterAnchors = getRequesterAnchors();
		for (var k = 0; k < Math.min(requesterAnchors.length,requesterIds.length); k++) {
			parseAndInsert(requesterAnchors[k],k);
		}
	}
	
}


  
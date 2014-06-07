
// Tubelink!
// version 0.4 BETA!
// 2007-07-15
// Copyright (c) 2007, Shajith Chacko
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tubelink", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tubelink
// @namespace     http://mostlyyes.tumblr.com
// @description   Add video titles as "title" attributes to Youtube links and embedded Youtube videos.
// @include       *
// @exclude       http://youtube.com/*
// @exclude       http://www.youtube.com/*
// ==/UserScript==



//Variables
var parser = new DOMParser();
var request = {
			method: 'GET',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/xml,text/xml',
			}
		};


const YT_API_KEY = 'lMUZx65bsEk';
const YT_API_URL = 'http://www.youtube.com/api2_rest?method=youtube.videos.get_details&dev_id=' + YT_API_KEY + '&video_id=';

		
//Utility functions
function padNumWithZero(num) {
  num += '';
  if(num.length < 2) {
    num = '0'+num;
  }
  return num;
}

function makeTitle(response) {
	var temp;
	var xmlDoc = parser.parseFromString(response.responseText, "application/xml");
	temp = xmlDoc.getElementsByTagName('title');
	if(temp[0]) {
		var title = temp[0].textContent					
		var timeSeconds = xmlDoc.getElementsByTagName('length_seconds')[0].textContent;
		var timeMinutes = parseInt(timeSeconds/60);
		var viewCount = xmlDoc.getElementsByTagName('view_count')[0].textContent;
		timeSeconds = padNumWithZero(timeSeconds%60);
		return ("\"" + title + "\" (" + timeMinutes + ":" + timeSeconds + ", " + viewCount + " views.)")	} else {
		temp = xmlDoc.getElementsByTagName('description');
		if(temp.length > 0){
			temp = temp[0].textContent;
		} else {
			return "";
		}
		return /(.*?)\./.exec(temp)[1]+".";	//Extract first sentence of error description.
	}	
}


function get(xpath) {
	var matches = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	var ret = [];	
	for (var i = 0; i < matches.snapshotLength; i++) {
		ret.push(matches.snapshotItem(i));
	}	
	return ret;
}

//Getting Youtube links
function getYTLinks() {
	var ytlinks = [], link, temp;
	var regex = /\?v\=(.*?)$/;
	var links = get('//a[@href]');
		
	for (var i = 0; i < links.length; i++) {
		link = links[i];    
		if(link.href.match(/^http\:\/\/(.*\.)?youtube.com/) && !link.title){		
			temp = regex.exec(link.href.split("&")[0]);
			if(temp) {
				ytlinks.push({vid: temp[1], obj:link});
			}
		}
	}
	
	return ytlinks;
}

//Getting Youtube embedded videos
function getYTObjs() {
	var ytobjs = [], obj, temp;
	var regex = /http\:\/\/(www\.)?youtube\.com\/v\/(.*)(\.swf)?$/;
	var objs = get('//object/embed');
	
	for (var i = 0; i < objs.length; i++) {
		obj = objs[i];
		temp = regex.exec(obj.src);
		if(temp) {
		  ytobjs.push({vid: temp[2], obj: obj});
		}
	}
	
	return ytobjs;
}

function callYT(idx,lst) {
	request['url'] = YT_API_URL + lst[idx].vid;
	request['onload'] = function(responseDetails) {
		if(responseDetails.status == '200') {	
			if(!lst[idx].obj.title){				
			  lst[idx].obj.title = makeTitle(responseDetails);	          
			} 
		}
		
		if(idx < lst.length - 1){
			callYT(idx+1,lst);
		}
	}
	
	GM_xmlhttpRequest(request);		
}

function doIt() {
  var lst = getYTLinks().concat(getYTObjs());
  
  if(lst.length > 0){
  	callYT(0,lst);
  }
}

doIt();


//ChangeLog
//15th July 2007 : Initial release.
//17th July 2007 : Fixed to detect more youtube sites, error-handling.
//25th July 2007 : Handles embedded Youtube videos too. Code cleaned up to look way less stupid.
// ==UserScript==
// @name           Zoklet Post Count
// @namespace      zoket_post_count
// @description    Displays post counts on Zoklet
// @include        *zoklet.net/bbs/*
// @author		   Phinehas @ Zoklet.net
// @version		   2.0.0
// ==/UserScript==

const pmstring = '<a href="private.php">Private Messages</a>:';
const uidstring = 'member.php?u=';
const myThreshold = 5;
const theirThreshold = 3600;

var myuserid;
var c;
var divs = document.getElementsByTagName('div');
var newElement;
var uidstart;
var uidend;
var protocol;

if(window.location.href.substr(0,5) == 'https') { protocol = 'https://'; }
else { protocol = 'http://'; }

for(c = 0;c < divs.length;c++) {
	if(divs[c].innerHTML.substring(0,pmstring.length) == pmstring) {
		uidstart = divs[c].parentNode.innerHTML.indexOf(uidstring) + uidstring.length;
		uidend = divs[c].parentNode.innerHTML.indexOf('"',uidstart);		
		myuserid = divs[c].parentNode.innerHTML.substr(uidstart,uidend-uidstart);
		
		newElement = document.createElement('div');
		divs[c].parentNode.insertBefore(newElement, divs[c].nextSibling);
		newElement.innerHTML =  addCommas(getUserPosts(myuserid)) + ' posts (' + (Math.round(getUserPostsPerDay(myuserid)*100)/100) + ' per day)';
		break;
	}
}

if(window.location.href.search('showthread.php') != -1) {
	var anchors = document.getElementsByTagName('a'); // since JavaScript doesn't have a get elements by class name function
	var theiruserid;
	var sidecode;
	var delimit;
	var before, after;
	
	for(c = 0;c < anchors.length;c++) {
		if(anchors[c].className == 'bigusername') {
		theiruserid = anchors[c].href.substr(anchors[c].href.indexOf(uidstring)+uidstring.length,anchors[c].href.length-(anchors[c].href.indexOf(uidstring)+uidstring.length));
		
		if(anchors[c].parentNode == undefined) { continue; }
		if(anchors[c].parentNode.parentNode == undefined) { continue; }
		if(anchors[c].parentNode.parentNode.parentNode == undefined) { continue; }
		if(anchors[c].parentNode.parentNode.parentNode.cells[2] == undefined) { continue; }
		
		sidecode = anchors[c].parentNode.parentNode.parentNode.cells[2].innerHTML;
		delimit = sidecode.indexOf('</div>',sidecode.indexOf('Join Date:')) + 6;
		before = sidecode.substr(0,delimit);
		after = sidecode.substr(delimit,sidecode.length-delimit);
		
		if(getUserPosts(theiruserid) != undefined) {
		anchors[c].parentNode.parentNode.parentNode.cells[2].innerHTML = before + '<div>Posts: ' + addCommas(getUserPosts(theiruserid)) + ' (' + (Math.round(100*getUserPostsPerDay(theiruserid))/100) + ' per day)</div>' + after;
		}
		}
	}
}

function getUserPosts(userid) {
	var threshold;

	if(userid == myuserid) { threshold = myThreshold * 1000; }
	else { threshold = theirThreshold * 1000; }

	if((((new Date().valueOf()) - (GM_getValue('u'+userid+'_updated')*1)) > threshold) || (GM_getValue('u'+userid+'_updated') == undefined)) {
		updateUserInfo(userid,null,null);
	}
	
	return GM_getValue('u'+userid+'_posts');
}

function getUserPostsPerDay(userid) {
	const dayinms = 1000*60*60*24;

	var joined = new Date();
	var daysmember;

	if(GM_getValue('u'+userid+'_joindate') == undefined) { return undefined; }

	joined.setTime(GM_getValue('u'+userid+'_joindate')*1); // since Greasemonkey can't store an int this big I use a string and then convert to a int by multiplying by one
	
	daysmember = (new Date() - joined) / dayinms;
	
	return ((getUserPosts(userid) / daysmember) < 0) ? getUserPosts(userid) : (getUserPosts(userid) / daysmember); // in case they've been here less than one full day
}

function updateUserInfo(userid,callback,object) {
	var startJoined;
	var endJoined;
	var startPosts;
	var endPosts;
	var strJoined;
	var joined;

	// to prevent synchronous updates for the same user data
	// unfortunately, this results in the callback not be called. A better solution would be to use an array to attach callback(s) to each userid's update
	// however, this is quite a bit more work and honeslty I'm not sure if JavaScript could handle it.
	
	if(GM_getValue('u'+userid+'_updating') != undefined) {
	if(((GM_getValue('u'+userid+'_updating')*1)+5000) > (new Date.valueOf())) { return false; }
	}
	
	GM_setValue('u'+userid+'_updating',String(new Date.valueOf()));

	GM_xmlhttpRequest({
		method: 'GET',
		url: protocol + 'www.zoklet.net/bbs/member.php?u=' + userid,
		headers: {
			'Host': 'www.zoklet.net',
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': '*',
		},
		onload: function(responseDetails) {
			startJoined = responseDetails.responseText.indexOf('<dd>',responseDetails.responseText.indexOf('<dt class="shade">Join Date</dt>')) + 4;
			endJoined = responseDetails.responseText.indexOf('</dd>',startJoined);
			startPosts = responseDetails.responseText.indexOf('<dd>',responseDetails.responseText.indexOf('<dt class="shade">Total Posts</dt>',endJoined)) + 4;
			endPosts = responseDetails.responseText.indexOf('</dd>',startPosts);
	
			strJoined = responseDetails.responseText.substr(startJoined,endJoined-startJoined);
			
			joined = new Date();			
			joined.setFullYear(strJoined.substr(6,4),strJoined.substr(0,2),strJoined.substr(3,2));
	
			GM_setValue('u'+userid+'_joindate',String(joined.valueOf()));
			GM_setValue('u'+userid+'_posts',responseDetails.responseText.substr(startPosts,endPosts-startPosts).replace(',','')*1);
			GM_setValue('u'+userid+'_updated',String(new Date().valueOf()));
			GM_setValue('u'+userid+'_updating','0');
			
			if(callback != null) { callback(userid,object); }
 		}
	});
	
	return true;
}

function addCommas(nStr)
{
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ',' + '$2');
	}
	return nStr;
}
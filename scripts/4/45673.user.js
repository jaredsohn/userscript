scr_meta=<><![CDATA[ 
// ==UserScript==
// @name           Tumblr H8
// @namespace      h8cloud
// @description    Provides a link to let you "h8" a post (as opposed to "<3"). H8ed posts and their reblogs are hidden from you forever!
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @version        0.5.2
// @copyright      2k10, Julia West (http://h8cloud.com)
// @license        (CC) Attribution-Share Alike 3.0 United States; http://creativecommons.org/licenses/by-sa/3.0/us/
// ==/UserScript==
]]></>;

// Change this value to false if you do not want the posts you h8 to (anonymously) go to h8cloud.com
var sendH8 = true;

var h8ed	= GM_getValue("h8ed", "").split(",");
if (h8ed == "") h8ed = [];

var onDashboard = document.location.toString().search(/dashboard\/iframe/) == -1;

var imgDataURL = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%14%08%06%00%00%00%89%7C%CD0%00" +
	"%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%87IDATx%DAb%FC%FF%FF" +
	"%3F%03%23%23%E3%04%06*%02%A0%99%05%8C%40%1Ad%E8%2F%20%FEF%25s%B9%80%98%8D%09%CA%F9FE%07%83%CDbb%A0%11%18%26%06%2B(" +
	"(p%84%86%86JR%DD%60ooo%A9%E6%E6f%17t%F1%90%90%10%A9G%8F%1E%A5%DD%B8q%23%16%84A%0E%20%C5%60F%60%3A%04%25C%86%FA%FAz" +
	"%EDE%8B%16Y%DB%D8%D8%08%82%F8%E5%E5%E56s%E7%CE%3D%AA%A1%A1%B1%F8%E6%CD%9B%CF%9B%9A%9A%8C%91%F5%112%98%E5%DF%BF%7F%" +
	"CCrrrR%8A%8A%8A%C2%20%81%8D%1B7%C6%82%E8O%9F%3E%FD%80%89IKK%0B%BE%7F%FF%FE%07%B2%3E%06%5C%1C%24%CB%18%81%5E~%96%90" +
	"%90p%12%C8%FE%09%F4%018X%A6M%9Bv~%E6%CC%99A%C0%60%90%17%15%15%15%04%06%CDf%5C%8E%24)U%80%0C%F5%F5%F5%5D%01%0A%8A%2" +
	"5K%96%1C%5D%B3f%8D%2FU%92%9B%B0%B0%B0%C0%D3%A7O%C1%DE%07%06%C3w%7CjYH1%18%18%91%FBv%EC%D8%11p%E6%CC%99%3B%0E%0E%0E" +
	"%DA%C5%C5%C5%9Bq%A9%85%15B%1F%90%C4%D8%A1%F4O(%FB'%92%1C%B3%A5%A5%A5%88%91%91%11%F7%D6%AD%5B%9F%3Dx%F0%E0%07%9A%3E" +
	"%98Z%01l%06%B3A%E9_P%F6%2F4%87%B0%A2%89!%EB%83%89%0B%60%0B%8A%7F8%D8%E0%A2%16%8B%18V%B5%D8%0C%FE%8B%83%8DO%0CC%9C%" +
	"09%A9pFv%D5%7F%246%03%16W3%E0%11%E7%82e_%9ATM%00%01%06%00Q%FF%92%0B%D1%A55.%00%00%00%00IEND%AEB%60%82";
	
var imgDataURL_red = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%14%08%06%00%00%00%89%7C%" +
	"CD0%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01mIDATx%DA%DC%95" +
	"%3DK%03A%10%86%9F%8D%DF%A9b%ACD%0C%22%82b'%B1%D3RR%D9%A63%8A%8D%8D%20%FE%02E%7F%81%88%95%A5v%96%22bk!6%0A%B6%82%20" +
	"(%A8%08jl%A2Qr%E7L%D8%84%B0%DC%C6%04b%E3%C2%B0%B3%EF%ED%3E%B3%3B7%B7g%C20%C4%18%B3E%0B%9B0W%8D%F4%0A%FD%12%2B%B4%8" +
	"8%1B%17%EB%8C%D9A%A1%85%1B.%B3b%FCQ%FBG%E0e%18%9E%86%DEF%20%A9T%AA%BBa%F0%0E%E4%96%60%BCV%1B%82%9E%0B%C8%86%B0%AE%" +
	"A6%BEj%99Lf%C0%5D%DF%1E%C14%D5z%14%7F%0F%A6%D4_%83%CB%0D%98LK%B0m8Rm%05fE%7B%3A%0D%82g%BB.%AC%07%AEjY%81%DE%C1%C3%" +
	"A8%A4eP%D2r%00%D7%F3%CE%E4%1B%C8%CB%07a%5Cp%CC%93%F7%B2~%02Wc%B0%7F%0F%8F%FD%02%3E%96%FEE%40s%12P%ED%15%DE%E4D%B7M" +
	"W%C5%3B%7C%DA%8A%FF%D0~%13%26%FA%20!%E9%D8UKJ0%D5%A8w%ECf%9A%C0%D2%BF%CDi%0A%BC%00%E7%F2%FA%939%98%D1%F1!%9C%A9%B6" +
	"%08%23Q%15%A0%97P%BEF%EB%B2%7D%D1%FA%C5%9Agmv3%AE%D6a%B5%CA%CBKD%ED8%F4%F8%DA%02%8F%F6%ED%EAQ%E0%C0%E3W%02Ei%A5Fr%" +
	"5C%F2%F8%F54o%B9%C5%9D%1D%84%9ET%F84%F7%A2%C7%FC%D5%AF%E9G%80%01%00S%B2fc%D0l%BF%CE%00%00%00%00IEND%AEB%60%82";

window.addEventListener(
	'load',
	function() {
		if ( onDashboard ){
			addH8Links();
			hideAllH8ed();
			hideAllH8Reblogs();
			
			// Support for endless scroll - Thnx Freevo
      document.getElementById('posts').addEventListener(
        'DOMNodeInserted', 
        function(eventObject) {
          post     = eventObject.target;
          tumblrId = post.id.split("post_")[1];
          if (alreadyH8ed(tumblrId)) 
            hide(post);
          if (post.className.split(" ").indexOf("is_reblog") != -1) 
            maybeHideReblog(post);

          addH8Links(post);
        }, true
      );
		} else addIframeH8();
	}, true
);

function addToH8ed( id ) {
	if ( !alreadyH8ed(id) ) {
		h8ed.push(id);
		GM_setValue("h8ed", h8ed.join(","));
	}
}

function removeFromH8ed( id ) {
	var index = h8ed.indexOf( id );
	if ( index != -1 ) {
		h8ed.splice( index, 1 );
		GM_setValue("h8ed", h8ed.join(","));
	}
}

function alreadyH8ed( id ) {
	return (h8ed.indexOf( id ) != -1);
}

function addH8Links(target){
  var contextNode = target ? target : document;
	var heartLinks = document.evaluate(
	    './/form[contains(@action,"/like/")]',
	    contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
	for (var i = 0; i < heartLinks.snapshotLength; i++) {
	    var thisLink	= heartLinks.snapshotItem(i);
			var thisID		= thisLink.id.split("like_form_")[1];
			
			if (!thisID.match(/_radar/)){
				var h8Link = document.createElement('a');
				h8Link.setAttribute("onclick", "return false;" );
				h8Link.className = "h8";
				h8Link.href = thisID;
				h8Link.innerHTML = "h8";
				if ( alreadyH8ed(thisID) ){ h8Link.setAttribute("style", "color: #d32a2a;")}
			
				h8Link.addEventListener('click', h8Event, true);
				thisLink.parentNode.insertBefore(h8Link, thisLink.nextSibling);
			}
	}	
}

function hideAllH8ed(){
	for( var i=0; i <= h8ed.length; i++ ) {
		var post = document.getElementById("post_" + h8ed[i]);
		if (post) hide( post );
	}
}

function hideAllH8Reblogs(){
	var reblogs = document.evaluate(
		'//li[contains(@class, "is_reblog")]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < reblogs.snapshotLength; i++) {
		maybeHideReblog(reblogs.snapshotItem(i));
	}
}

function maybeHideReblog(reblog){
  var post_info = reblog.getElementsByClassName("post_info")[0];
	
	var match = false;
	for(j=0; j< h8ed.length; j ++) {
		var id = h8ed[j];
		if (post_info.innerHTML.match( new RegExp(id))){
			match = true;
			break;
		}
	}
	
	if (match) h8Reblog(reblog);
}

function hide( post ) {
		post.style.display = 'none';

		var hidden_notice = document.createElement('li');
		hidden_notice.className = 'notification first_notification last_notification';
		hidden_notice.innerHTML = 'You h8ed this post. <a onclick="this.parentNode.style.display=\'none\'; this.parentNode.previousSibling.style.display=\'\'; return false;" href="#"><i>See it anyway.</i></a>';

		post.parentNode.insertBefore(hidden_notice, post.nextSibling);
}

// The click event for the h8links on the dashboard
function h8Event(event){
	var link = event.target;
	var id = link.href.split("/").pop();
	
	h8Post(id, link, false);
}

function h8Reblog(reblog) {
	var id			= reblog.id.split("post_")[1];
	var h8Link 	= document.evaluate(
		'//a[@href="' + id + '"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
		
	h8Post(id, h8Link, true);
}

function h8Post( id, link, via_reblog ){
	if ( !alreadyH8ed( id )) {
		link.setAttribute("style", "color: #d32a2a;");
		addToH8ed( id );
		var post = document.getElementById("post_"+id);
		var tumblog = getTumblrName(post);
		if (sendH8 && !via_reblog) sendH8ToCloud(id, tumblog);
		if (post) hide(post);
	} else {
		removeFromH8ed( id );
		link.setAttribute("style", "");
	}
}

function getTumblrName(post){
	var post_info = post.getElementsByClassName("post_info")[0];
	if (post_info == undefined){
		return previousPostInfo(post).getElementsByTagName("a")[0].innerHTML;
	} else {
		return post_info.getElementsByTagName("a")[0].innerHTML;
	}
}

function previousPostInfo(post){
	var prev = post.previousSibling;
	if (prev.nodeType == 1 && prev.tagName == "LI" && prev.className.indexOf("post") != -1){
		var post_info = prev.getElementsByClassName("post_info")[0];
		if (post_info == undefined) return previousPostInfo(prev);
		else return post_info;
	} else return previousPostInfo(prev);
}

function sendH8ToCloud(id, tumblog) {
	var dataString = "site=tumblr&id=" + id + "&meta=" + tumblog;
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://koffing.h8cloud.com/posts/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: dataString
	});
}

function addIframeH8() {	
	var h8button = document.createElement( 'img' );
	h8button.src = imgDataURL;
	h8button.setAttribute("style", "float: left; display: block; margin-left:3px; cursor: pointer;");	

	var reblogLink = document.evaluate(
		'//a[contains(@href, "/reblog/")]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	if (reblogLink) {
		var match = /\/reblog\/(\d+)\//.exec(reblogLink.href);

		if (match.length > 1){
			var id = match[1];
			h8button.alt = id;
			
			if (alreadyH8ed(id)) h8button.src = imgDataURL_red;
			
			reblogLink.parentNode.insertBefore(h8button, reblogLink);
			h8button.addEventListener('click', iFrameH8Event, true);			
		}
	} // else, we're looking at someone's tumblog index
}

// The click event for the h8 button in the iframe
function iFrameH8Event( event ) {	
	var button = event.target;
	var id = button.alt;
	var tumblog = button.nextSibling.nextSibling.nextSibling.childNodes[3].value;
	if (!alreadyH8ed(id)){
		addToH8ed(id);
		sendH8ToCloud(id, tumblog);
		button.src = imgDataURL_red;
	} else {		
		removeFromH8ed( id );		
		button.src = imgDataURL;	
	}
}

// Update Notifier Script
CheckScriptForUpdate = {
	// Config values, change these to match your script
	id: '45673', // Script id on Userscripts.org
	days: 1, // Days to wait between update checks
	name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
	time: new Date().getTime() | 0,
	call: function(response) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			headers: {
				'User-agent': window.navigator.userAgent,
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
		});
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
		this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
		if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
			GM_setValue('updated', this.time);
			GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
		} else if ( (this.xversion) && (this.xversion != this.version) ) {
			if(confirm('Do you want to turn off auto updating for this script?')) {
				GM_setValue('updated', 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			} else {
				GM_setValue('updated', this.time);
			}
		} else {
			if(response) alert('No updates available for '+this.name);
			GM_setValue('updated', this.time);
		}
	},
	check: function() {
		if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
		if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
			this.call();
		} else if (GM_getValue('updated', 0) == 'off') {
			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
		} else {
			GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
		}
	}
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
// ==UserScript==
// @name          Reddit Share Box
// @namespace     www.reddit.com
// @description   Gives the user a sharable text to copy and paste to a friend.
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==

/** Acknowledgments:
Thanks to honestbleeps and all the people that contributed to the Reddit Enhancement Suite.
I copied a lot of my code from there.
 **/
/** Changelog:
2011-08-28: added an extra box for link-posts without a link to the comments
2011-08-26: released
 **/
/** TODO:
-many things
-make it look better
 **/

document.body.addEventListener('DOMNodeInserted', function (event) {
		if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
			applyBox();
		}
	}, true);

function SelectAll(id) {
	document.getElementById(id).focus();
	document.getElementById(id).select();
}

function hasClass(ele, cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(ele, cls) {
	if (!hasClass(ele, cls))
		ele.className += " " + cls;
}
function removeClass(ele, cls) {
	if (hasClass(ele, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		ele.className = ele.className.replace(reg, ' ');
	}
}

function applyBox() {
	var entries = document.querySelectorAll('#siteTable .entry');
	for (var i = 0, len = entries.length; i < len; i++) {
		if ((typeof(entries[i]) != 'undefined') && (!(hasClass(entries[i], 'shareboxed')))) {
			// bug in chrome, barfs on for i in loops with queryselectorall...
			if (i == 'length')
				break;
			addClass(entries[i], 'shareboxed')
			thisLA = entries[i].querySelector('A.title');
			if (thisLA != null) {
				thisTitle = thisLA.innerHTML;
				thisLink = thisLA.getAttribute('href');
				thisComments = entries[i].querySelector('.comments');
				if (!(thisLink.match(/^http/i))) {
					thisLink = 'http://' + document.domain + thisLink;
				}
				thisUL = entries[i].querySelector('.flat-list');
				
				var singleShareLI = document.createElement('li');
				var singleShareBox = document.createElement('input');				
				singleShareLI.innerHTML = "w/o comments: ";
				singleShareBox.setAttribute('id', 'redditShareBox-text' + i);
				singleShareBox.setAttribute('onclick', "document.getElementById('redditShareBox-text" + i + "'" + ").select();");
				singleShareBox.setAttribute('oncontextmenu', "document.getElementById('redditShareBox-text" + i + "'" + ").select();");
				singleShareBox.setAttribute('style', "width:30px");
				singleShareBox.setAttribute('type', 'text');
				singleShareBox.setAttribute('readonly', 'readonly');
				var singleShareText = "";
				
				var singleShareLI2 = document.createElement('li');
				var singleShareBox2 = document.createElement('input');				
				singleShareLI2.innerHTML = "w/ comments: ";
				singleShareBox2.setAttribute('id', 'redditShareBox2-text' + i);
				singleShareBox2.setAttribute('onclick', "document.getElementById('redditShareBox2-text" + i + "'" + ").select();");
				singleShareBox2.setAttribute('oncontextmenu', "document.getElementById('redditShareBox2-text" + i + "'" + ").select();");
				singleShareBox2.setAttribute('style', "width:30px");
				singleShareBox2.setAttribute('type', 'text');
				singleShareBox2.setAttribute('readonly', 'readonly');
				var singleShareText2 = "";
				
				var commentURL = /https?:\/\/([a-z]+).reddit.com\/r\/[-\w\._\/\?]*\/comments\/(\w{5,})/i.exec(thisComments);
				thisCommentsSelf = "http://www.reddit.com/" + commentURL[2];
				thisCommentsLink = commentURL[0];
				
				//EDIT singleShareText BELOW TO CREATE THE STRING YOU WANT
				if (thisLink == thisComments) {
					//Self-Posts
					singleShareText = '"' + thisTitle + '"  ' + thisCommentsSelf;
					singleShareBox.setAttribute('value', singleShareText);
					//Removes the redundant "Without Comments" label with Self-posts.
					singleShareLI.innerHTML = "";
					singleShareLI.appendChild(singleShareBox);
					thisUL.appendChild(singleShareLI);
				} else {
					//Link-Posts
					singleShareText = '"' + thisTitle + '"  ' + thisLink;
					singleShareText2 = '"' + thisTitle + '"  ' + thisLink + "  Comments: " + thisCommentsLink;
					singleShareBox.setAttribute('value', singleShareText);
					singleShareBox2.setAttribute('value', singleShareText2);
					singleShareLI.appendChild(singleShareBox);
					singleShareLI2.appendChild(singleShareBox2);
					thisUL.appendChild(singleShareLI);
					thisUL.appendChild(singleShareLI2);
				}
				
			}
		}
	}
}

applyBox();
 
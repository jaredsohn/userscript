// ==UserScript==
// @name          Toggle Recent Comments in Flickr Photostream
// @version       0.3
// @description	  Shows the five most recent comments
// @namespace     http://flickr.yuan.cc/
// @include       http://flickr.com/photos/*
// @include       http://www*.flickr.com/photos/*

// v0.3
// For Flickr new interface
// v0.2.4
// Keep the comments always on
// v0.2.3
// replace GM_xmlhttpRequest to XMLHttpRequest
// version: 0.2.2
// by CK (http://flickr.com/photos/ckyuan/)
// Improvement: toggle the comments on and off
// version: 0.1
// by setre (http://flickr.com/photos/setre/)
// please report any bugs or suggestions to setre3+monkey@gmail.com
// 
//TODO:
//	buddyicons? (need to call people.findByUsername + people.getInfo :(  )
// 	display minutes/hours/days et c since comment was posted
//	be smart about multiple comments to the same image?
// ==/UserScript==

if( document.getElementsByTagName('link')[1].getAttribute('href').split('=')[1] ) {
    var nsid = document.getElementsByTagName('link')[1].getAttribute('href').split('=')[1].split('&')[0];
} else return;

if(unsafeWindow) w = unsafeWindow;
else w = window;
global_photos = w.global_photos;

var _GMAPI = true;
var commentsDiv;

isPhotoStream = function() {
	var re1 = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\//;
	var re2 = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/page\d+\//;
	if( re1.test(document.location) || re2.test(document.location) ) return true;
//	if (location.pathname.split('/').length > 5) { return false; };
//	return true;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function toggleComments(x) {
	x.parent.style.visibility = 'hidden';
}


if (!isPhotoStream()) return;

var insertTheStuff = function(stuffNode, node) {
	// put the stuff below the profile link (third h3)
	var xpath = "//h3";
	var a = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	var profileLink = a.snapshotItem(2);
	var profileLink = a.snapshotItem(node);
	if (profileLink) {
		profileLink.parentNode.insertBefore(stuffNode,profileLink.nextSibling);
	} else { return;}
};

var insertNewStuff = function() {

	var table = document.getElementById('SubNav');
	var p = table.getElementsByTagName('p');
	p[0].innerHTML += ' <img src="/images/subnavi_dots.gif" alt="" width="1" height="11" />';
	p[0].innerHTML += ' <a href="javascript:;" onclick="showComments()">Comments</a>';
	p[0].innerHTML += ' <div id="toggle" style="width:0px;height:0px:display:none"></div>';
}

w.showComments = function() {

//	var toggle = document.getElementById('toggle');
//	toggle.parentNode.appendChild(commentsDiv);
	if( commentsDiv.style.display == 'block' ) commentsDiv.style.display = 'none';
	else commentsDiv.style.display = 'block';
}

var url_str = ''+document.location;
if( url_str.match('www.flickr.com') ) www = 'www.';
else www = '';

var feedURI = 'http://'+www+'flickr.com/recent_comments_feed.gne?id='+nsid+'&format=atom_03';

GM_xmlhttpRequest({
	method: 'GET',
	url: feedURI,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		if (!isPhotoStream()) return;
		insertNewStuff();
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var entries = dom.getElementsByTagName('entry');
		commentsDiv = document.createElement('div');
		commentsDiv.style.position = 'absolute';
		commentsDiv.style.overflow = 'visible';
		commentsDiv.style.width = '400px';
		commentsDiv.style.padding = '10px';
		commentsDiv.style.margin = '4px';
//		commentsDiv.style.top = '10px';
//		commentsDiv.style.right = '0px';
		commentsDiv.style.zIndex = 1000;
		commentsDiv.style.display = 'none';
		commentsDiv.style.border = '1px solid #000';
		commentsDiv.style.background = '#ffffff';
		var toggle = document.getElementById('toggle');
		toggle.appendChild(commentsDiv);

//		var recentCommentsHeading = document.createElement('h4');
		var commentTitle = document.createElement('h3');
		commentTitle.innerHTML = 'Recent Comments';
		var keepitOpenCheckbox = document.createElement('input');
		var keepitOpenText = document.createTextNode('Keep it open');
		var keepitOpenText = document.createElement('label');
		keepitOpenCheckbox.setAttribute('id', 'keepopen');
		keepitOpenText.innerHTML = 'Keep it open';
		keepitOpenText.setAttribute('for','keepopen');
//		commentsDiv.appendChild(keepitOpenCheckbox);
//		commentsDiv.appendChild(keepitOpenText);
		commentsDiv.appendChild(commentTitle);
		keepitOpenCheckbox.type = 'checkbox';
		if( GM_getValue('toggle_comments') == '1' ) keepitOpenCheckbox.checked = true;
		else keepitOpenCheckbox.checked = false;
		keepitOpenCheckbox.onclickHandler = function() {
			if( keepitOpenCheckbox.checked ) {
				GM_setValue('toggle_comments', '1');
			} else {
				GM_setValue('toggle_comments', '0');
			}
		}
		keepitOpenCheckbox.addEventListener('click', keepitOpenCheckbox.onclickHandler, true);
		var commentList = document.createElement('ul');
		commentList.id = 'commentList';

		for (var i = 0; (i < 6 && i < entries.length); i++) {
			var commentUL = document.createElement('ul');
			var tmpDiv = document.createElement('div');
			var commentText = entries[i].getElementsByTagName('content')[0].textContent;
			tmpDiv.innerHTML = commentText;

			var imgAndLink = tmpDiv.getElementsByTagName('a');
			imgAndLink = imgAndLink[(imgAndLink.length -1)];
			commentUL.appendChild(imgAndLink);
			commentUL.appendChild(tmpDiv.getElementsByTagName('p')[1]);
			commentUL.appendChild(document.createTextNode(' -'));
			commentUL.appendChild(tmpDiv.getElementsByTagName('a')[0]);
			commentList.appendChild(commentUL);

			commentsDiv.appendChild(commentList);
//			insertTheStuff(commentsDiv);
		}
		var recentCommentsLink = document.createElement('h3');
		recentCommentsLink.innerHTML = '&raquo; ';
		recentCommentsLink.style.marginTop = '10px';
		var a = document.createElement('a');
		a.href = 'javascript:;';
		a.onclickHandler1 = function() {
			a.removeEventListener('click', a.onclickHandler1, true);
			insertTheStuff(commentsDiv,3);
			a.onclickHandler2 = function() { 
				a.removeEventListener('click', a.onclickHandler2, true);
				this.parentNode.parentNode.removeChild(commentsDiv); 
				a.addEventListener('click', a.onclickHandler1, true);
			}
			a.addEventListener('click', a.onclickHandler2, true);
		}
		a.addEventListener('click', a.onclickHandler1, true);
		a.innerHTML = ' Recent Comments';
		recentCommentsLink.appendChild(a);
//		insertTheStuff(recentCommentsLink,2);
		if( GM_getValue('toggle_comments') == '1' ) a.onclickHandler1();
	}
});

addGlobalStyle(
'#commentList {'+
'	margin:0px;'+
'	padding:0;'+
'}'+
'#commentList ul{'+
	'margin:0px;'+
	'padding:0;'+
	'min-height:102px;'+
'}'+
'#commentList ul img{'+
	'float:right;'+
'}'+
'#commentList ul p{'+
'padding-top:2px;'+
'padding-left:2px;'+
'padding-right:20px;'+
'padding-bottom:0px;'+
'}');


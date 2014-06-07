// ==UserScript==
// @name          Facebook Lite Plus
// @namespace     http://danstechstop.com/facebook-lite-plus
// @description	  Removes Ads, Full width. Removes Facebook | from the title puts header on top, Thumbnail previewer, friends tab.
// @include	http://lite.facebook.com/*
// @include	https://lite.facebook.com/*
// @author	  	Daniel Morrison
// @version		  1.3
// ==/UserScript==

(function () {

// Check if we're on the main page, then hide the ads

if ($$('LMuffinView', $$('LSplitPage_RightInner')[0])[0]) {
	addStyle(".LSplitPage_Right {display: none;}");
}

// Fixes the width of the page and removes the right-hand bar, also set comments to 100% width

addStyle(".LSplitPage_Content { padding-right:0; } .FN_feedbackview { width:100%;} .UFIView .comment, .UFIView .likes { margin-right: 70px;} #navigation, #content, #footer {width: 90%; min-width:820px;} .UFIView .comment, .UFIView .likes { margin-right:0; } .optoutHeader a{ position:fixed; width: 100%;}");


// Top Bar Positioning

var contentPosition = getPosition($('content'));
addStyle(' #header { position:fixed !important; width:100% !important; z-index:12; margin-top:0; } '+
'#content { padding-top:' + contentPosition[1] + 'px; }');

// Creates a box where the original image is shown when hovering profile thumbnails

function showHover(e) {
	if (!$('FLSpopup')) {
		var FLSpopup = document.createElement('div');
		FLSpopup.id = 'FLSpopup';
		addStyle("#FLSpopup { background: #ffffff; position: fixed !important; z-index: 20; border: 1px solid #333333; padding: 5px; display: none; }");
		document.body.appendChild(FLSpopup);
	}
	var image = document.createElement('img');
	image.src = this.src.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
	$('FLSpopup').innerHTML = '';
	$('FLSpopup').appendChild(image);
	var intY = e.clientY 
	if (window.innerHeight > intY + image.height){
		$('FLSpopup').style.top = intY + 5 + 'px';
		$('FLSpopup').style.left = e.clientX + 5 + 'px';
	}else{
		intY = window.innerHeight - image.height - 10 
		$('FLSpopup').style.top = intY + 'px';
		$('FLSpopup').style.left = e.clientX + 5 + 'px';
	}
	$('FLSpopup').style.display = 'block';
}

function hideHover() {
	$('FLSpopup').style.display = '';
}


// Add mouse-events

function mouseEvents() {
	if (document.getElementsByTagName('body')[0].getAttribute('class').match('LHomeStreamView') || document.getElementsByTagName('body')[0].getAttribute('class').match('LProfileView')) {
		var profilePhoto = $$('profilePhoto');
		for (i in profilePhoto) {
			profilePhoto[i].childNodes[0].addEventListener('mouseover', showHover, false);
			profilePhoto[i].childNodes[0].addEventListener('mouseout', hideHover, false);
		}
		// Add for attachments
		var attachments = $$('attachmentMedia');
		for (i in attachments) {
			var nodes = attachments[i].childNodes;
			for (n in nodes) {
				nodes[n].childNodes[0].addEventListener('mouseover', showHover, false);
				nodes[n].childNodes[0].addEventListener('mouseout', hideHover, false);
			}
		}			
	}

	// Add for photogallery
	if (document.getElementsByTagName('body')[0].getAttribute('class').match('LPhotoListView') || document.getElementsByTagName('body')[0].getAttribute('class').match('LProfilePhotoPane')) {
		var galleryimg = document.getElementsByTagName('td');
		for (i in galleryimg) {
			var nodes = galleryimg[i].childNodes;
			for (n in nodes) {
				nodes[n].childNodes[0].addEventListener('mouseover', showHover, false);
				nodes[n].childNodes[0].addEventListener('mouseout', hideHover, false);
			}
		}
	}
}
mouseEvents();
// Reload mouse events if the content change
$('contentWrapper').addEventListener('DOMNodeInserted', mouseEvents, false);

// Remove Facebook from the title

var titleValue = document.title;
document.title = titleValue.replace('Facebook | ', '');

//Add Friends Tab

var tbFriends = document.createElement('a');
var tabs = $('navigation').childNodes;

tbFriends.id = 'tbFriends';
tbFriends.href = tabs[1].href + '/friends';
tbFriends.innerHTML = 'Friends';
	
$('navigation').appendChild(tbFriends);
$('tbFriends').style.display = 'block';

// Get element by id

function $(id,root){
	return root ? root.getElementById(id) : document.getElementById(id);
}

// Get element(s) by class name

function $$(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
	} else {
		var elms = $x('//*[contains(@class,"'+className+'")]',root);
		var buffer = new Array();
		for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
		return buffer;
	}
}

// XPath

function $x(xpath,root){
	return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// Add style

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

// Get an elements position

function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

}) ();
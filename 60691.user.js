// ==UserScript==
// @name          Facebook Liter(pt2)
// @namespace     http://tooredrabbit.tumblr.com
// @description	  Removes Ads, preserves width. Removes Facebook | from the title puts header on top, Thumbnail previewer.
// @include       http://lite.facebook.com/*
// @exclude       http://lite.facebook.com/*/photos/*
// @exclude       http://lite.facebook.com/*/video/*
// @exclude	  http://lite.facebook.com/notifications/
// @author	  Matt McCurdy (majority of code by Daniel Morrison who in turn credits Markus Carlson)
// @version	  0.1.0
// ==/UserScript==

(function () {

// Fixes the width of the page and removes the right-hand bar

addStyle("#navigation {width: 900px;}");

addStyle("#content, #footer {width: 800px;} .FN_ufi_container { width: 375px; }");


// Top Bar Positioning

var contentPosition = getPosition($('content'));
addStyle(' #header { position:fixed !important; width:100% !important; z-index:12; margin-top:0; } '+
'#content { padding-top:' + contentPosition[1] + 'px; }');

// Check if we're on the main page, then hide the ads

if ($$('LMuffinView', $$('LSplitPage_RightInner')[0])[0]) {
	addStyle(".LSplitPage_Right {display: none;}");
}




// Creates a box where the original image is shown when hovering profile thumbnails

function showHover() {
	if (!$('FLSpopup')) {
		var FLSpopup = document.createElement('div');
		FLSpopup.id = 'FLSpopup';
		addStyle("#FLSpopup { background: #ffffff; position: fixed !important; top: 50px; right: 20px; z-index: 20; border: 1px solid #333333; padding: 5px; display: none; }");
		document.body.appendChild(FLSpopup);
	}
	var image = document.createElement('img');
	image.src = this.src.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
	$('FLSpopup').innerHTML = '';
	$('FLSpopup').appendChild(image);
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
	if (document.getElementsByTagName('body')[0].getAttribute('class').match('LPhotoListView') || document.getElementsByTagName('body')[0].getAttribute('class').match('LprofilePhotoPane')) {
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



// Get element by id

function $(id,root){return root ? root.getElementById(id) : document.getElementById(id);}

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

function $x(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

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
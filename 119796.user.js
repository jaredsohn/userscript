// ==UserScript==
// @name           DealExtreme Photo Preview
// @namespace      marki
// @description    Preview thumbnail product images from search on DealExtreme
// @include        http://*.dealextreme.com/*
// @include        http://dx.com/*
// @include        http://*.dx.com/*
// @include        https://dx.com/*
// @include        https://*.dx.com/*
// @version        0.2.1
// @icon           http://dx.com/favicon.ico
// ==/UserScript==

// Code based on FFixer http://userscripts.org/scripts/show/8861 and my own PokecPreview
// 2013-04-23: add preview of customer photos
// 2013-05-02: fix urls of some images


(function() {

var showPopupPicTimeout;
var hidePopupPicTimeout;
var displayTimeout=250;   // how much miliseconds to wait before displaying te preview image

//
// Add styles used by script
//
addStyle(
	'.fbfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
	'.ff-popup-default { max-width:450px; margin:100px auto; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#qq-popup-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'+
	'.qq-popup-div { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'.qq-popup-div-left  { left: 3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'+
	'.qq-popup-div-right { right:3px !important; left:auto  !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#qq-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'+
	'#qq-popup-div:hover #ff-popup-pic-close { display:block; }'+
	'#qq-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'
);


//
// Add div for showing big profile pics
//
var popupPicDiv = document.createElement('div');
popupPicDiv.id = 'qq-popup-div';
popupPicDiv.className = 'fbfPopup qq-popup-div';
popupPicDiv.innerHTML = '<div id="qq-pic-close" title="Close">x</div><div id="ff-popup-pic-image"><span></span></div>';

try {
	document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	document.getElementById('qq-pic-close').addEventListener('click', function() { document.getElementById('qq-popup-div').style.display='none'; }, false);
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
			document.getElementById('qq-pic-close').addEventListener('click', function() { document.getElementById('qq-popup-div').style.display='none'; }, false);
			if ($('#qq-popup-div')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
	}, 500);
}
// Listeners are added by the code for showing the popups

//
// Listen for image mouseovers/mouseouts to show/hide popups
//
// preview: http://img.dxcdn.com/productimages/sku_3206_1_small.jpg (or _thumb.jpg)
// full:    http://img.dxcdn.com/productimages/sku_3206_1.jpg
// preview: http://www.dealextreme.com/customerphotos/quarantined/201107/54348-thumb-0a330001-5618-4f07-ba81-6e78d38084e7-80x60.jpg
// full:    http://www.dealextreme.com/customerphotos/quarantined/201107/54348-0a330001-5618-4f07-ba81-6e78d38084e7.jpg
// preview: http://m2.dealextreme.com/upload/reviewpicture/201302/thumb_b094c67c-b40c-431c-9e07-82d5b2988c36.jpg
// full:    http://m2.dealextreme.com/upload/reviewpicture/201302/b094c67c-b40c-431c-9e07-82d5b2988c36.jpg

picRegex = /http:\/\/((img\.dxcdn\.com)\/productimages\/sku_([0-9_]+_(small|thumb)\.jpg))|(www\.dealextreme\.com\/customerphotos\/quarantined\/[0-9]+\/[0-9]+-thumb-[0-9a-f-]+-[0-9]+x[0-9]+.jpg)|(.*\.dealextreme\.com\/upload\/reviewpicture\/[0-9]+\/thumb_[0-9a-f-]+\.jpg)/;

function showPopupPic(e) {
	try {
		var t = e.target;
		var oldSrc;
		var newSrc;
		var title;

		if (t.tagName == 'IMG' && picRegex.test(t.src)) { newSrc = t.src.replace(/_small|_thumb|thumb_|-thumb|-[0-9]+x[0-9]+/g, ""); }

		if (oldSrc || newSrc) {
			clearTimeout(hidePopupPicTimeout);
			t.removeEventListener('mouseout', hidePopupPic, false);
			t.addEventListener('mouseout', hidePopupPic, false);
			showPopupPicTimeout = setTimeout(function(){
				$('#ff-popup-pic-image').innerHTML = '<img src="' + newSrc + '" alt="Preview - Loading..." style="max-height:' + (window.innerHeight-35) + 'px;"/>'; // + title;
				$('#qq-popup-div').style.display = 'block';
//				$('#qq-popup-div').className = 'fbfPopup qq-popup-div';
				$('#qq-popup-div').className = 'fbfPopup qq-popup-div-' + (e.pageX>document.body.clientWidth/2 ? 'left' : 'right');
			}, displayTimeout);
		}
	} catch(x) { logError('Popup Pic', x); }
}

$('#qq-popup-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);
$('#qq-popup-div').addEventListener('mouseout',  function(e) {
	var r = e.relatedTarget;
	if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
		while (r.parentNode && r.id!='qq-popup-div') { r = r.parentNode; }
		if (r.id!='qq-popup-div') { document.getElementById('qq-popup-div').style.display = 'none'; }
	}
}, false);

window.addEventListener('mouseover', function(e) {
	if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
}, false);

function hidePopupPic(e) {
	clearTimeout(showPopupPicTimeout);
	if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
		hidePopupPicTimeout = setTimeout(function() { document.getElementById('qq-popup-div').style.display = 'none'; }, 30);
	}
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
}

function log(str) {
	if (typeof debug !== 'undefined') { debug(str); }
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	return false;
}

function $(q, root, single) {
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

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

}) ();
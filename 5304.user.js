// ==UserScript==
// @name          LightBox for Hyperlinks
// @version       2.5
// @description	  Lightbox for Hyperlinks is a Greasemonkey user scripts for Firefox. It is design to open a hyperlink within a current page instand of jumping to a new page or opening a new window. The script will embed an IFRAME on the center of the page with a lightbox effect. Below the lightbox, there are two links available for you to choose: 'Open in new window' and 'Open in current window'.
// @namespace     http://webdev.yuan.cc/
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*
// @include       http://del.icio.us/*
// @include       http://*.hemidemi.com/*
// @include       http://hemidemi.com/*
// @include       http://digg.com/*
// @include       http://www.technorati.com/*
// @include       http://technorati.com/*

// v1.0	08/22/06	initial release
// v1.5 09/01/06	Add Technorati support
// v1.5	09/01/06	Preserve 'href' attribute and add middle-click to open in new tab
//			Credit: kudo@cna.ccu.edu.tw
// v1.6 10/27/06	Fix close lightbox bug
//			Credit: Goston
// v2.0 03/28/07	Add post to HEMiDEMi and del.icio.us
// v2.1 08/11/07	Handle window onResize 
//			Bug fixed when viewing HEMiDEMi and Technorati pages
//			Auto script update feature added
//			Add a mini RSS reader, Gazar, to discover feeds in opened pages
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//           http://flickr.tw/
//
// ==/UserScript==

(function() {

var site = '';
var re = /http:\/\/(www\.)?bloglines\.com\/myblogs_display/;
if( re.test(document.location) ) var site = 'bloglines';
re = /http:\/\/del\.icio\.us/;
if( re.test(document.location) ) var site = 'delicious';
re = /http:\/\/(www\.)?hemidemi.com/;
if( re.test(document.location) ) var site = 'hemidemi';
re = /http:\/\/digg.com/;
if( re.test(document.location) ) var site = 'digg';
re = /http:\/\/(www\.)?technorati.com/;
if( re.test(document.location) ) var site = 'technorati';
if( site == '' ) return;


if(unsafeWindow) w = unsafeWindow;
else w = window;
var global_photos = w.global_photos;

var external = 'data:image/gif;base64,R0lGODlhCgAKAKIFAGaZzDOZzJnM/wBmzABm/////wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrUvgEsNklYZOhBBB5KVwhXxnhCA5gCkIIXOBKFXE+3su1LAgA7';
var open_in = 'data:image/gif;base64,R0lGODlhCgAKAKEDAABmzDOZzJnM/////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgADACwAAAAACgAKAAACG4SPIMtrEqIUL4w7AlUW64plGyRFY8MYYZi0BQA7';
var hd = 'data:image/gif;base64,R0lGODlhCgAKAKECAGN4If9mAP///////yH5BAEKAAIALAAAAAAKAAoAAAIdjA2ZhwohjACivggpjdVOCnUaiE0mJ20TEzgP4xYAOw==';
var delicious = 'data:image/gif;base64,R0lGODlhCgAKAKIAAAAAAN3d3QAA/////////wAAAAAAAAAAACH5BAEHAAQALAAAAAAKAAoAAAMZOKrSvcwJOOSEllrAefhf54GBCJCliJpoAgA7';
var feed = 'data:image/gif;base64,R0lGODlhCgAKAMZRAN5qK91qLt9uL99vL95vP+J0L+J0MeJ3QeZ2POF4QOB5PuZ5MuV6MuZ6MeV7M+N8Suh9OOh/M+l/M+mAMuuAM+SCQeqEM+uENO2DOuqERe2GNOuHNuuINOyINeeHU+mKQ/KJM++LNe+KPO+MNfCNO/CPNu+QOe+PS+yPVe2RTvSSNumSWe2URu+TSPKTQfSUO/WUOu6WRe+WRviVOveWOvSZTvmbOvicOPGbVPubOfebRPubO/idPfedTPWeTvGeWfOfWPKgWueleeqmdPqmUfinVOqpevaoaPepYPmqWPWrZfatY/mvXfuvYfmzaPq1cPq3cP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgB/ACwAAAAACgAKAAAHYoBDFQ4SFh0jJTJ/FRkfOC4qNDY5LQ0pf5hLOzcwGhEiNT5Pf0wzIBIXQZhNTn8/FAscL0WYSEd/EAYhOlBJmCd/HgImRH9KQH8rfwcBMTw9JBgoCA8ECUYsGxMMBQMACkKBADs=';
var close = 'data:image/gif;base64,R0lGODlhCgAKAKECAABmzFaY2v///////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAACACwAAAAACgAKAAACGoSPIMtrEsKK4sUrH7xObVopGGVJW9g0yVoAADs=';
var zone_top, zone_iframe, zone_tail;
var feed_reader = false;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

var UserScript = {
	id: 'lightboxforhyperlinks',
	title: 'LightBox for Hyperlinks',
	// header: 'allSizes+',
	version: 2.5,
	date: new Date(2007, 7, 12),
	author: '.CK',
	
	// Hours till next update check
	updateInterval: 24,
	
	// Api url to check for updates
	checkUpdateUrl: 'http://webdev.yuan.cc/greasemonkey/lightbox.hyperlinks.xml',
	
	// Url for script discussion thread
	metaUrl: 'http://webdev.yuan.cc/greasemonkey/lightbox.html',
	
	// Function to check for script updates
	checkForUpdates: function(){
		// Does user want to check for updates?
		// if (!GM_getValue('checkforUpdates'))
		//	{ return; }
		
		// Determine last time script was checked for updates
		var lastCheck = GM_getValue('lastUpdateCheck');
		lastCheck = (typeof lastCheck != 'undefined') ? parseInt(lastCheck) : this.date.getTime();
		
		// Get the current time
		var timeNow = new Date().getTime();
		
		// Guard against weird stuff, like user changing system clock to the future
		if (lastCheck > timeNow)
			{ lastCheck = timeNow; }
		
		GM_log(lastCheck + ',' + timeNow);
		// Is it time to check for updates? If not, return
		if (timeNow < (lastCheck + (this.updateInterval * 60 * 60 * 1000)))
			{ return; }
			
		//  Update the lastUpdateCheck local variable
		GM_setValue('lastUpdateCheck', timeNow.toString());
		
		
		// +-+-+-+-+-+-+-+-+


		// Api url for the update check
		var url = this.checkUpdateUrl + '?id=' + this.id + '&version=' + this.version + '&noCache=' + timeNow;
		var that = this;
		
		// Callback function for the AJAX request
		var callback = function(response){
			// Bad response
			if (!response) { return; }
			else if (response.responseText == '') { return; }
			
			// Parse the response
			var parser = new DOMParser();
			var dom = parser.parseFromString(response.responseText,	"application/xml");
			var rsp = dom.getElementsByTagName('rsp')[0];
			
			// Our request failed! Return.
			if (rsp.getAttribute('stat') != 'ok') { return; }
			
			// Get userscript details
			var userscript = rsp.getElementsByTagName('userscript')[0];
			var v = userscript.getAttribute('version');
			var downloadUrl = userscript.getElementsByTagName('url')[0].textContent;
			var metaUrl = userscript.getElementsByTagName('url')[0].textContent;
			var changelog = userscript.getElementsByTagName('changelog')[0].textContent;
			
			// If there's no version update, then return
			if (v == that.version)
				{ return; }
			
			// There's an update! Create a pop-up to tell the user
			var update = confirm(UserScript.title + ': There is a new version ' +v+ ', download?');
			if(update) {
				w.top.location = downloadUrl;
			}
			return;
			
			var popUp = new PopUp('Update Available');
			popUp.main.className = '';
			
			var div = popUp.main.appendChild(cE('div'));
			div.className = 'indented';
			var innerHTML = '<p><strong>Script:</strong> ' + UserScript.title + '</p>';
			innerHTML += '<p>Version ' + v + ' is now available.</p>';			
			innerHTML += '<p><strong><a style="font-size:1.4em;" href="' + downloadUrl + '" title="Install new version of this script">&raquo; Install it!</a></strong></p>';
			
			if (changelog != '')
				{
					innerHTML += '<h3>New Features</h3>';
					innerHTML += '<p>' + changelog + '</p>';
				}
			div.innerHTML = innerHTML;			
			popUp.open();
		};
		
		// Make the AJAX request
		// ajaxRequest(url, callback);
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
			},
			onload: callback,
			onerror: function(){ callback(false); }
		});		
	}
};

function lightBox(url,title) {

    var disabledZone = _ce('div');
    disabledZone.id = 'disabledZone';
    disabledZone.setAttribute('style', 'background-color: #000000; -moz-opacity: 0.7');
    disabledZone.style.position = 'absolute';
    disabledZone.style.zIndex = 2500000;
    disabledZone.style.left = '0px';
    disabledZone.style.top = '0px';
    disabledZone.style.width = '100%';
    if( document.body.clientHeight==0 ) disabledZone.style.height = '300%';
    else disabledZone.style.height = document.body.clientHeight + 'px';
    disabledZone.addEventListener('click', function() {
//        delete document.body.removeChild(_gi('imgZone'));	by Goston
//        document.body.removeChild(_gi('imgZone'));
//        delete document.body.removeChild(this);
	closeBox();
    }, true);
    document.body.appendChild(disabledZone);

    var imgZone = _ce('div');
    imgZone.id = 'imgZone';
    imgZone.style.position = 'fixed';
    imgZone.style.zIndex = 2500001;
    imgZone.style.top = '50px';
    imgZone.style.background = '#ffffff';
    imgZone.style.height = '80%';
//    imgZone.style.left = (document.body.clientWidth-875)/2 + 'px';
    imgZone.style.left = '50px';
    var w = document.body.clientWidth -100;
    var h = document.body.clientHeight-200;
	zone_top = '<div style="text-align:right;padding:4px;background:#ddd;font-size:11px"><span style="float:left"><a href="'+url+'" target="_blank" title="Open in new window"><img src="' +external+ '" border="0" /></a> <a href="'+url+'" title="Open in current window"><img src="' +open_in+ '" border="0" /></a> <a href="javascript:;" onclick="add_delicious(\'' +url+ '\', \'' +title+ '\')" title="Add to del.icio.us"><img src="' +delicious+ '" border="0" /></a> <a href="javascript:;" onclick="add_hemidemi(\'' +url+ '\', \'' +title+ '\')" title="Add to HEMiDEMi"><img src="' +hd+ '" border="0" /></a> <a href="javascript:;" onclick="feed_reader(\'' +url+ '\', \'' +title+ '\')" title="Feed Reader"><img src="' +feed+ '" border="0" /></a> <a href="javascript:;" onclick="closeBox()" title="Close lightbox"><img src="' +close+ '" border="0" /></a></span><a href="http://webdev.yuan.cc/greasemonkey/lightbox.html" target="_blank">Powered by Yuan.CC</a></div>';
//    imgZone.innerHTML += '<iframe src="'+url+'" width="'+w+'" height="100%" frameborder="0"></iframe>';
    zone_iframe = '<iframe src="'+url+'"  width="100%" height="100%" frameborder="0"></iframe>';
    zone_tail = '<div id="lightbox_toolbar" style="color:#1393c0;width:'+w+'px;overflow:hidden;text-align:left;padding:4px 0px 4px 0px;background:#ddd;font-size:11px">&nbsp;&nbsp;<b>'+url+'</b></div>';
	imgZone.innerHTML = zone_top + zone_iframe + '<br />' + zone_tail;
    document.body.appendChild(imgZone);
	document.body.setAttribute('onResize', 'resize()');
}

w.resize = function() {
	var w = document.body.clientWidth -100;
	var h = document.body.clientHeight-200;
	_gi('lightbox_toolbar').style.width = w + 'px';
	zone_tail = '<div id="lightbox_toolbar" style="color:#1393c0;width:'+w+'px;overflow:hidden;text-align:left;padding:4px 0px 4px 0px;background:#ddd;font-size:11px">&nbsp;&nbsp;<b>'+url+'</b></div>';
};
	
w.closeBox = function() {
    document.body.removeChild(_gi('imgZone'));
    document.body.removeChild(_gi('disabledZone'));
}
closeBox = w.closeBox;

if( site == 'bloglines' ) {
    re = /^siteItem\.\d+\.\d+$/;
    var bookmarks = _gt('div');
    for(var i=0; i<bookmarks.length; i++) {
	var m = re.exec(bookmarks[i].id);
	if( !m || m.length == 0 ) continue;
	var id = m[1];
	var links = bookmarks[i].getElementsByTagName('a');
	for(var j=0; j<links.length; j++) {
	    if( links[j].className != 'bl_itemtitle' ) continue;
	    url = links[j].href;
	    links[j].title = url;
	    links[j].addEventListener('click', function(e) { 
		if (e && e.stopPropagation && e.preventDefault) {
		    e.stopPropagation();
		    e.preventDefault();
		}
		lightBox(this.title, this.innerHTML);
	    }, true);
	    var ext = _ce('img');
	    ext.src = external;
	    ext.alt = url;
	    ext.title = url;
	    ext.style.cursor = 'pointer';
	    ext.addEventListener('click', function() { window.open(this.alt); }, true);
	    links[j].parentNode.insertBefore(ext, links[j]);
	    links[j].parentNode.insertBefore(_ct(' '), links[j]);
	}
    }
}

if( site == 'delicious' ) {
    re = /^post$/;
    var bookmarks = _gt('li');
    for(var i=0; i<bookmarks.length; i++) {
	if(bookmarks[i].className!='post') continue;
	var links = bookmarks[i].getElementsByTagName('h4').item(0).getElementsByTagName('a').item(0);
	url = links.href;
	links.title = url;
	links.addEventListener('click', function(e) { 
	    if (e && e.stopPropagation && e.preventDefault) {
		e.stopPropagation();
		e.preventDefault();
	    }
	    lightBox(this.title, this.innerHTML);
	}, true);
	var ext = _ce('img');
	ext.src = external;
	ext.alt = url;
	ext.title = url;
	ext.style.cursor = 'pointer';
	ext.addEventListener('click', function() { window.open(this.alt); }, true);
	links.parentNode.insertBefore(ext, links);
	links.parentNode.insertBefore(_ct(' '), links);
    }
}

if( site == 'hemidemi') {
    re = /^b_(\d+)$/;
    var bookmarks = _gt('div');
    for(var i=0; i<bookmarks.length; i++) {
		var m = re.exec(bookmarks[i].id);
		if( !m || m.length == 0 ) continue;
		var id = m[1];
		var links = bookmarks[i].getElementsByTagName('a');
		for(var j=0; j<links.length; j++) {
			if( links[j].className != 'title' ) continue;
			event = links[j].getAttribute('onmouseover');
			re2 = /[^']+'([^']+)'/;
			m2 = re2.exec(event);
			if(!m2) {
				if( links[j].nextSibling.nextSibling.firstChild.className != 'img_popup' ) 
					continue;
				else url = links[j].nextSibling.nextSibling.href;
			} else {
				url = m2[1];
			}
			links[j].title = url;
			links[j].href = url;
			w.openlink = null;
			links[j].addEventListener('click', function(e) {
				if (e && e.stopPropagation && e.preventDefault) {
					e.stopPropagation();
					e.preventDefault();
				}
				lightBox(this.title, this.innerHTML);
			}, true);
			var ext = _ce('img');
			ext.src = external;
			ext.alt = url;
			ext.title = url;
			ext.style.cursor = 'pointer';
			ext.addEventListener('click', function() { window.open(this.alt); }, true);
			links[j].parentNode.insertBefore(ext, links[j]);
			links[j].parentNode.insertBefore(_ct(' '), links[j]);
		}
    }
}

if( site == 'digg' ) {
    re = /^enclosure\d+$/;
    var bookmarks = _gt('div');
    for(var i=0; i<bookmarks.length; i++) {
	if( !re.test(bookmarks[i].id) ) continue;
	var links = bookmarks[i].getElementsByTagName('h3').item(0).getElementsByTagName('a').item(0);
	url = links.href;
	links.title = url;
	links.addEventListener('click', function(e) { 
	    if (e && e.stopPropagation && e.preventDefault) {
		e.stopPropagation();
		e.preventDefault();
	    }
	    lightBox(this.title, this.innerHTML);
	}, true);
	var ext = _ce('img');
	ext.src = external;
	ext.alt = url;
	ext.title = url;
	ext.style.cursor = 'pointer';
	ext.addEventListener('click', function() { window.open(this.alt); }, true);
	links.parentNode.insertBefore(ext, links);
	links.parentNode.insertBefore(_ct(' '), links);
    }
}

if( site == 'technorati' ) {
    re = /^post$/;
//    if( !_gi('results') ) return;
//    var bookmarks = _gi('results').getElementsByTagName('li');
//    if( !_gi('reactions') && !_gi('results') ) return;
	if( _gi('results') ) {
		var results = _gi('results');
	} else if( _gi('reactions') ) {
		var results = _gi('reactions');
	} else if( _gi('faves') ) {
		var results = _gi('faves');
	} else return;
    var bookmarks = results.getElementsByTagName('li');	
    for(var i=0; i<bookmarks.length; i++) {
	if(bookmarks[i].getElementsByTagName('h3') && bookmarks[i].getElementsByTagName('h3').item(0)) 
	    var links = bookmarks[i].getElementsByTagName('h3').item(0).getElementsByTagName('a').item(0);
	else if(bookmarks[i].getElementsByTagName('h4') && bookmarks[i].getElementsByTagName('h4').item(0)) 
	    var links = bookmarks[i].getElementsByTagName('h4').item(0).getElementsByTagName('a').item(0);
	else continue;
	url = links.href;
	links.title = url;
	links.addEventListener('click', function(e) { 
	    if (e && e.stopPropagation && e.preventDefault) {
		e.stopPropagation();
		e.preventDefault();
	    }
	    lightBox(this.title, this.innerHTML);
	}, true);
	var ext = _ce('img');
	ext.src = external;
	ext.alt = url;
	ext.title = url;
	ext.style.cursor = 'pointer';
	ext.addEventListener('click', function() { window.open(this.alt); }, true);
	links.parentNode.insertBefore(ext, links);
	links.parentNode.insertBefore(_ct(' '), links);
    }
}

w.add_hemidemi = function(bookmark_url, title) {

    if( title=='' ) var title = prompt('HEMiDEMi: input title of this post');
    if( title=='' || title==null) {
        alert('Must input title of this page');
        return;
    }
    var tags = prompt('HEMiDEMi: input tags of this page');
    if( tags == null ) return;
    if( tags == '' ) tags = title;
    var desc='';
    if(w.getSelection) desc = w.getSelection();

    var url = 'http://www.hemidemi.com/user_bookmark/create';
    var data = 'user_bookmark[title]='+ encodeURIComponent(title) + '&user_bookmark[url]='+encodeURIComponent(bookmark_url) + '&user_bookmark[quotes]=' +encodeURIComponent(desc)+ '&user_bookmark[description]=&user_bookmark[tag_string]=' +tags+ '&user_bookmark[group_string]=&user_bookmark[permission]=public';
//  GM_log(data);
    var resturl = 'http://www.hemidemi.com/services/rest/hemidemi.bookmark.add?' + data;
    GM_xmlhttpRequest({
        method: 'GET',
        url: resturl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': url
        },
        onload: function(responseDetails) {
//          alert(responseDetails.responseText);
            var parser = new w.DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var stat = dom.getElementsByTagName('rsp').item(0).getAttribute('stat');
            if( stat == 'fail' ) {
                var err = dom.getElementsByTagName('err').item(0).getAttribute('msg');
                alert(err);
            }
            if( stat == 'ok' ) {
                alert('Bookmark added successfully!');
            }
        }
    });
}
add_hemidemi = w.add_hemidemi;

w.add_delicious = function(bookmark_url, title) {

    if( title=='' ) var title = prompt('del.icio.us: input title of this post');
    if( title=='' || title==null) {
        alert('Must input title of this page');
        return;
    }
    var tags = prompt('del.icio.us: input tags of this page');
    if( tags == null ) return;
    if( tags == '' ) tags = title;
    var desc='';
    if(w.getSelection) desc = w.getSelection();

    var data = 'description='+ encodeURIComponent(title) + '&url='+encodeURIComponent(bookmark_url) + '&extended=' +encodeURIComponent(desc)+ '&tags=' +tags;
//  GM_log(data);
    var resturl = 'https://api.del.icio.us/v1/posts/add?' + data;
    GM_xmlhttpRequest({
        method: 'GET',
        url: resturl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': url
        },
        onload: function(responseDetails) {
//          alert(responseDetails.responseText);
            var parser = new w.DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var stat = dom.getElementsByTagName('result').item(0).getAttribute('code');
            if( stat == 'done' ) {
                alert('Bookmark added successfully!');
            } else {
                alert(stat);
	    }
        }
    });
}
add_delicious = w.add_delicious;

w.feed_reader = function(bookmark_url) {

//	var str = '<div style="height:100%;width:100%;"><a href="http://grazr.com/gzpanel.html?theme=sateen_black&fontsize=8pt&file='+bookmark_url+'" target="gz"><img src="http://grazr.com/images/grazrbadge.png" border="0"></a><script type="text/javascript" src="http://grazr.com/gzloader.js?theme=sateen_black&amp;fontsize=8pt&amp;file='+bookmark_url+'"></script></div>';
	feed_reader = !feed_reader;
	var url;
	if(feed_reader) url = 'http://grazr.com/gzpanel.html?theme=sateen_black&fontsize=8pt&file='+bookmark_url;
	else url = bookmark_url;
	zone_iframe = '<iframe src="'+url+'"  width="100%" height="100%" frameborder="0"></iframe>';
	_gi('imgZone').innerHTML = zone_top + zone_iframe + zone_tail;
}

UserScript.checkForUpdates();

})();




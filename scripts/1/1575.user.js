// ==UserScript==
// @name          AJAX Wrapper for Rojo
// @version       1.7
// @description	  AJAX Wrapper for Rojo
// @namespace     http://webdev.yuan.cc/
// @include       http://www.rojo.com/*
// @include       http://rojo.com/*
// @exclude       http://www.rojo.com/javascript/dojo/iframe_history.html
// @exclude       http://rojo.com/javascript/dojo/iframe_history.html

// Whats New
// =========
// v1.7 29/12/05 Auto/manual reload left column of feeds listing in Ajax way
//      Read feeds stories in background and display in the main content box
// v1.6 27/12/05 A minor update for Remote.execRequest function
// v1.5 16/11/05 Work with Firefox 1.5RC3. Add 'Read All' after 'Expand/Collapse All'
// v1.4 02/10/05 Quick unsubscribe feeds
// v1.3 06/9/05 Load feed profile in background and display below the feed title
// v1.2 04/9/05 Add 'Mark as Read' for each article and each feed
// v1.1 21/8/05 Have 'Mark as Read' Ajaxlized
// v1.0 18/8/05 First release
//
// Description
// ===========
// Rojo is a great web-based RSS reader. It supports tagging not only feeds 
// but also article entries. The user interface is neat and well organized. The use 
// of DHTML and CSS makes the site more easy reading and accessible. However, 
// the mechanism of asynchronous data retrieval used by Rojo is based on 
// "Remote Scripting with IFRAME" and causes the response slower than by Ajax. 
// This Greasemonkey user script is a wrapper for Rojo to replace its iframe request 
// by the XMLHttpRequest function. After installing the script, the response of 
// using Rojo will become faster.
//
// Contact
// =======
// CK ( http://webdev.yuan.cc/ )

// ==/UserScript==

(function() {

if(unsafeWindow) w = unsafeWindow;
else w = window;

var Ajax = new Object();
var body = document.getElementsByTagName('body')[0];

Ajax.log = false;

w.ajaxize = function() {

    if( w.Remote == undefined ) return;
    else clearInterval(ajax_handler);

w.Remote.fakeiFrameOnLoad = function(result) {
    if ( this.callback != null ) {
        var currentCallback = this.callback;
        var currentCallbackArguments = this.callbackArguments;
        this.callback = null;
        this.callbackArguments = null;
        this.resource = null;
        this.waitingForResponse = false;
        if (this.requests.length > 0) {
            var nextRequest = w.Util.shift(this.requests);
            this.waitingForResponse = true;
            this.execRequest(nextRequest.resource, nextRequest.callback, nextRequest.callbackArguments);
        }

        var iframeContents = result;
        if (currentCallbackArguments == undefined || currentCallbackArguments == null) {
            currentCallbackArguments = new Array();
        }
        currentCallbackArguments[currentCallbackArguments.length] = iframeContents;
        currentCallback.apply(null, currentCallbackArguments);
    }
}

w.Remote.execRequest = function(resource, callback, callbackArguments) {

    this.callback = callback;
    this.callbackArguments = callbackArguments;
    this.waitingForResponse = true;

//    this.changeIFrameLocation(resource);

    if(Ajax.log) GM_log('Remote.execRequest called');
    var xmlhttp = new w.XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState==4) {
	    if (xmlhttp.status==200) w.Remote.fakeiFrameOnLoad(xmlhttp.responseText);
	}
    }
    xmlhttp.open('GET', resource, true);
    xmlhttp.send(null);
}

w.FeedSidebar.showFeed = function(e, feedId) {
    var evt = new w.xEvent(e);
    if (evt) {
	evt.event.cancelBubble = true;
	evt.event.preventDefault = false;
    }
//    window.location.href = "/?feed-id="+feedId;
    Ajax.FetchStories("/?feed-id="+feedId);
    return false;
}

w.FeedSidebar.showTag = function(e, tag) {
    var evt = new w.xEvent(e);
    if (evt) {
	evt.event.cancelBubble = true;
	evt.event.preventDefault = false;
    }
//     window.location.href = "/stories/recent/subject/"+tag;
    Ajax.FetchStories("/stories/recent/subject/"+tag);
    return false;
}

w.FeedSidebar.refreshSidebar = function(sidebarHTML) {
    var sidebarContents = document.getElementById("feed-sidebar-contents-container");
    if(sidebarContents != null) sidebarContents.innerHTML = sidebarHTML;
    Ajax.Unsubscribe_Feed();
    Ajax.cleanStatus();
}

w.FeedDripbox.newDraw = w.FeedDripbox.draw;
w.FeedDripbox.draw = function(recommendedFeed) {
    w.FeedDripbox.newDraw(recommendedFeed);
    var titleNode = document.getElementById("dripbox-title");
    var str = '' + titleNode.href;
    uri = str.match( /\/\?feed-id=.*$/ );
    titleNode.href = 'javascript:;';
    titleNode.addEventListener('click', function() { Ajax.FetchStories(uri); } , true);
}

}

var ajax_handler = setInterval("ajaxize()", 500);

// start to Ajaxize some things :)

Ajax.Mark_as_Read = function() {

    var markasread = document.getElementById("markReadLink");
    if( markasread ) {
	var url = markasread.href;
	markasread.href = 'javascript:;';
	var callback = function() {
	    var li = document.getElementsByTagName('li');
	    for(var i=0;i<li.length;i++) {
		if( li[i].className == 'selected subscription unread' ) {
		    li[i].getElementsByTagName('span')[0].innerHTML = '';
		}
	    }
	}
	markasread.onclickHandler = function() {
	    w.Remote.execRequest(url, callback, null);
	}
	markasread.addEventListener('click', markasread.onclickHandler, true);
    }
}

Ajax.Entry_doCollapsibleAndMarkRead = function() {

    Ajax.marks = new Array();
    var entries = document.getElementsByTagName('span');
    for(var i=0; i<entries.length; i++) {
	if( entries[i].className == 'unread entry-title' || entries[i].className == 'read entry-title' ) {
	    var p = entries[i].parentNode.parentNode.getElementsByTagName('div')[2];
	    var onclickStr = p.getAttribute('onClick');
	    p.getElementsByTagName('img')[0].setAttribute('width', '30');
	    var rExp = /ExpandCollapse.doCollapsibleAndMarkRead/i;
	    var newOnclick = onclickStr.replace(rExp, 'MarkItem.markRead');
	    var newOnclick2 = onclickStr.replace(rExp, 'w.MarkItem.markRead');

	    var mark = document.createElement('a');
	    mark.href = 'javascript:;';
	    mark.setAttribute('onClick', newOnclick);
	    mark.setAttribute('onClick2', newOnclick2);
	    mark.innerHTML = '<font style="font-size:x-small;" color=#000088>Mark as Read</font>';
	    entries[i].appendChild(mark);
	    entries[i].appendChild(document.createTextNode(' | '));
	    Ajax.marks[Ajax.marks.length] = mark;

	    var exp = document.createElement('a');
	    exp.href = 'javascript:;';
	    exp.setAttribute('onClick', 'ExpandCollapse.doCollapsible(this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling)');
	    exp.innerHTML = '<font style="font-size:x-small;" color=#000088>Expand</font>';
	    entries[i].appendChild(exp);
	    entries[i].appendChild(document.createTextNode(' | '));
	    var both = document.createElement('a');
	    both.href = 'javascript:;';
	    both.setAttribute('onClick', newOnclick + ';ExpandCollapse.doCollapsible(this.parentNode.previousSibling.previousSibling.previousSibling.previousSibling);');
	    both.innerHTML = '<font style="font-size:x-small;" color="#000088">Both</font>';
	    entries[i].appendChild(both);


//	    var f = entries[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('a')[0];
	    var f = entries[i].nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('a')[0];
	    var s = '' + f.href;
	    var rExp = /^.*feed-id=/i;
	    var feedid = s.replace(rExp, '');

	    var feed = document.createElement('a');
	    feed.href = 'javascript:;';
	    feed.setAttribute('onClick', newOnclick);
	    feed.setAttribute('rel', feedid);
	    mark.setAttribute('rel', 'mark'+feedid);
	    feed.innerHTML = '<font style="font-size:x-small;" color="#000088">Mark this feed as Read</font>';
	    f.parentNode.parentNode.appendChild(feed);
	    var callback = function(args) {
		Ajax.cleanStatus();
		var a = document.getElementsByTagName('a');
		for(var i=0;i<a.length;i++) {
		    if( a[i].getAttribute('rel') == args ) a[i].parentNode.removeChild(a[i]);
		    if( a[i].getAttribute('rel') == 'mark'+args ) {
//			a[i].onclick();
			var re = /this/g;
			var str = a[i].getAttribute('onClick2');
			str = str.replace(re, 'a[i]')
			str = str.replace(/MarkItem\.doAttentionRelevantView.*$/, '')
			eval(str);
		    }
		}
	    }
	    feed.onclickHandler = function() {
		Ajax.status('Mark this feed as read, please wait ....');
		var f = this.previousSibling.previousSibling.previousSibling.previousSibling.getElementsByTagName('a')[0];
		var s = '' + f.href;
		var rExp = /\?feed-id/i;
		var url = s.replace(rExp, 'doMarkRead.jsp?feed-id');
		rExp = /^.*feed-id=/i;
		var feedid = s.replace(rExp, '');

		var channel = w.DOMUtil.getElementsByClassName('unreadAndSelected', 'DIV');
		if(channel.length == 1) { // we never expect a value other than 1...
		    for(var i=0;i<channel.length;i++) { 
			this.markChannelRead = channel[i];
		    }
		}
		var router = '/doIRPCMarkRead.jsp?feed-id=' + feedid;

		var callbackArguments = new Array();
		callbackArguments[callbackArguments.length] = feedid;
		w.Remote.execRequest( router, callback, callbackArguments );
//		w.Remote.execRequest(url, callback, callbackArguments );
	    }
	    feed.addEventListener('click', feed.onclickHandler, true);

	    var unsub = document.createElement('a');
	    unsub.href = 'javascript:;';
	    unsub.setAttribute('rel', 'unsub-'+feedid );
	    unsub.innerHTML = '<font style="font-size:x-small;" color="#000088">Unsubscribe</font>';
	    f.parentNode.parentNode.appendChild(document.createTextNode(' | '));
	    f.parentNode.parentNode.appendChild(unsub);
	    var callback2 = function(args) {
		Ajax.cleanStatus();
		var a = document.getElementsByTagName('a');
		for(var i=0;i<a.length;i++) {
		    if( a[i].getAttribute('rel') == 'unsub-'+args ) {
			var pn = a[i].parentNode.parentNode.parentNode;
			pn.style.display = 'none';
//			pn.parentNode.removeChild(pn);
		    }
		}
	    }
	    unsub.onclickHandler = function() {
		Ajax.status('Unsubscribe this feed, please wait ....');
		var f = this.parentNode.firstChild.nextSibling.getElementsByTagName('a')[0];
		var s = '' + f.href;
		var rExp = /\?feed-id/i;
		var url = s.replace(rExp, 'manage-feeds/doIRPCUnsubscribe.jsp?feed-id');
		rExp = /^.*feed-id=/i;
		var feedid = s.replace(rExp, '');
		var callbackArguments = new Array();
		callbackArguments[callbackArguments.length] = feedid;
		w.Remote.execRequest(url, callback2, callbackArguments );
	    }
	    unsub.addEventListener('click', unsub.onclickHandler, true);
	}
    }
    var lis = document.getElementsByTagName('li');
    for(var i=0;i<lis.length; i++) {
	var la = lis[i].getElementsByTagName('a')[0];
	if( la && la.innerHTML == 'Collapse all') {
	    var markall = document.createElement('li');
	    var markalllink = document.createElement('a');
	    markalllink.innerHTML = 'Read All';
	    markalllink.href = 'javascript:;';
	    markalllink.onclickHandler = function() {
		for(var j=0;j<Ajax.marks.length;j++) {
		    var re = /this/g;
		    var str = Ajax.marks[j].getAttribute('onClick2');
		    str = str.replace(re, 'Ajax.marks[j]')
		    str = str.replace(/MarkItem\.doAttentionRelevantView.*$/, '')
		    eval(str);
//		    Ajax.marks[j].dispatchEvent('click');
		}
	    }
	    markalllink.addEventListener('click', markalllink.onclickHandler, true);
	    markall.appendChild(markalllink);
	    lis[i].parentNode.appendChild(markall);
	}
    }
}

Ajax.View_Feed = function(u) {
    if(Ajax.log) GM_log('Ajax.View_Feed called');
    if( u == undefined ) var str = '' + document.location;
    else var str = u;
//  alert( str.match( /rojo.com\/\?feed-id=/ ) );
    if( !str.match(/rojo.com\/\?feed-id=/) ) return;
    var feedid = str.split('=')[1];
    var rExp = /rojo.com\//i;
    url = str.replace(rExp, 'rojo.com/view-feed/')
//    url = 'http://webdev.yuan.cc/maps/xml_proxy.php?' + url;
    if( !document.getElementById('feedinfo') ) {
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'feedinfo');
	newdiv.innerHTML = '<hr><div>Loading feed info...</div>';
	document.getElementById('navbar').appendChild(newdiv);
    }

    GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
	    'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
	},
	onload: function(responseDetails) {
	    Ajax.cleanStatus();
	    if(Ajax.log) GM_log('Ajax.View_Feed responsed');
	    var desc;
	    var html = '' + responseDetails.responseText;
	    var rExp = /[\r\t\n\f]/ig;
	    str = html.replace(rExp, '');
	    if( desc = str.match( /<div class="description">.*<div class="channel-timestamp">.*<div class="item-commands">.*<!-- labelContent -->/ ) ) {
		var newdiv = document.getElementById('feedinfo');
//		newdiv.innerHTML = '<hr><a href="javascript:;" onclick="document.getElementById(\'feed_profile\').style.display=\'block\';this.innerHTML=\'\';">View feed profile</a><div id="feed_profile" style="display:none">'+desc + '</div>';
		newdiv.innerHTML = '<hr>' +desc;
	    }
//	    alert('parse done');
	    if(Ajax.log) GM_log('Ajax.View_Feed finished');
	}
    });
}

Ajax.Script_Link = function() {

    var links = document.getElementsByTagName('a');
    var helpOnRojo;

    for(var i=0; i<links.length; i++) {
	if( links[i].title == 'Help on Rojo' ) helpOnRojo = links[i].parentNode;
    }
    if( helpOnRojo == undefined ) return;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = 'http://webdev.yuan.cc/greasemonkey/rojo.ajax.user.js';
    a.innerHTML = 'Update Script';
    a.title = 'Click to update the greasemonkey script';
    li.appendChild(a);
    helpOnRojo.parentNode.insertBefore(li, helpOnRojo);
}

Ajax.ReplaceFeeds = function(html) {

    if(Ajax.log) GM_log('Ajax.ReplaceFeeds called');
    var sidebar = document.getElementById('feed-sidebar-contents-container');
    var rExp = /[\r\t\n\f]/ig;
    str = html.replace(rExp, '');
    if( str1 = str.match( /<div id="feed-sidebar-contents".*<\/span> *<\/div> *<\/div> *<\/div><div id="content-main">/ ) ) {
	str1 = '' + str1;
	str = str1.replace(/<\/div> *<\/div> *<\/div> *<div id="content-main">/, '');
	sidebar.innerHTML = str;
	Ajax.Unsubscribe_Feed();
    }
    if(Ajax.log) GM_log('Ajax.ReplaceFeeds finished');
}

Ajax.RefreshFeeds = function() {

    if(Ajax.log) GM_log('Ajax.RefreshFeeds called');
    Ajax.status('Refresh feeds listing, please wait ....');

    w.FeedSidebar.refresh();
    return;

    var url = 'http://www.rojo.com/show-article/?article-id=235621069';
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
            'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
        },
        onload: function(responseDetails) {
	    if(Ajax.log) GM_log('Ajax.RefreshFeeds responsed');
	    Ajax.ReplaceFeeds('' + responseDetails.responseText);
	    Ajax.cleanStatus();
	    if(Ajax.log) GM_log('Ajax.RefreshFeeds finished');
	}
    });
}
w.RefreshFeeds = Ajax.RefreshFeeds;

Ajax.Refresh_LeftColumn = function() {

    var links = document.getElementsByTagName('a');
    var findfeeds,recent;

    for(var i=0; i<links.length; i++) {
	if( links[i].title == 'Find & Add Feeds' ) findfeeds = links[i].parentNode;
	if( links[i].title == 'Read recent stories from my feeds.' ) recent = links[i];
    }
    if( findfeeds == undefined ) return;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = 'javascript:;';
    a.innerHTML = 'Refresh';
    a.title = 'Auto refresh feeds every 30 mins';
    li.appendChild(a);
    findfeeds.parentNode.insertBefore(li,findfeeds);
    a.addEventListener('click', Ajax.RefreshFeeds, true);
//    a.addEventListener('click', w.FeedSidebar.refresh, true);
    setInterval("RefreshFeeds()", 1000*60*30);

    if( recent == undefined ) return;
    recent.href = 'javascript:;';
    Ajax.RecentStories = function() {
	Ajax.FetchStories('/stories/recent/');
    }
    recent.addEventListener('click', Ajax.RecentStories, true);
}

Ajax.FetchStories = function(uri) {

    Ajax.status('Read recent stories, please wait ....');
//    var xmlhttp = new w.XMLHttpRequest();
    var url = 'http://www.rojo.com' + uri;

    if(Ajax.log) GM_log('Ajax.FetchStories called');
    GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
	    'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
	},
	onload: function(responseDetails) {
	    if(Ajax.log) GM_log('Ajax.FetchStories responsed');
	    var html = '' + responseDetails.responseText;
	    Ajax.ReplaceFeeds(html);
	    var content = document.getElementById('content-main');
	    var rExp = /[\r\t\n\f]/ig;
	    str = html.replace(rExp, '');
	    if( str1 = str.match( /<div id="content-main">.*<\/div> *<!-- center-pane -->/ ) ) {
		str1 = '' + str1;
		str2 = str1.replace(/<\/div> <!-- center-pane -->/, '');
		str1 = str2.replace(/<div id="content-main">/, '');
		content.innerHTML = str1;
		str2 = str.match(/FeedDripbox.initialize\(".*", *[0-9]+\);/);
		if( str2 ) eval('w.'+str2);
//		w.FeedDripbox.fetchRecommendedFeedId(feedId);
		if( url.match(/rojo.com\/\?feed-id=/) ) {
		    var newdiv = document.createElement('div');
		    newdiv.setAttribute('id', 'feedinfo');
		    newdiv.innerHTML = '<hr><a id="load_feedinfo" href="javascript:;">Loading feed info</a>';
		    document.getElementById('navbar').appendChild(newdiv);
		    document.getElementById('load_feedinfo').addEventListener('click', 
			function() {
			    Ajax.status('Loading feed profile, please wait ....');
			    Ajax.View_Feed(url);
			}, true);
//		    Ajax.View_Feed(url);
		}
		Ajax.Entry_doCollapsibleAndMarkRead();
	    }
	    Ajax.cleanStatus();
	    if(Ajax.log) GM_log('Ajax.FetchStories finished');
	}
    });
}

Ajax.Unsubscribe_Feed = function() {

    var img = 'data:image/gif;base64,R0lGODlhEAAQAKIAAJ+hpJmbnvX29rm7vayusJOVl////wAAACwAAAAAEAAQAAADTmgmU/5uCKUaIDiHMqgpwOQtQOAVxEgRxZm2VMu6H+wYc5zWn5IrqNgNBwPueL7iZwdJ0oa337IXI9JUVkogpBIAlI1ARsPxMCCPgESRAAA7';

    var lies = document.getElementsByTagName('li');
    for(var i=0; i<lies.length; i++) {
	if( lies[i].className == 'subscription unread' || lies[i].className == 'subscription' || lies[i].className == 'selected subscription unread' ) {
	    var feedlink = lies[i].getElementsByTagName('a')[0];
//	    feedlink.href = 'javascript:void("' + feedlink.href + '");';
	    feedlink.href = 'javascript:;';
	    feedlink.style.display = 'inline';
	    feedlink.style.marginLeft = 0;

	    var feedid = lies[i].getAttribute('feedId');
	    var unsub = document.createElement('a');
	    unsub.href = 'javascript:;';
	    unsub.title = 'Unsubscribe this feed';
	    unsub.innerHTML = '<img src="' + img + '" width=12 height=12 border="0" />';
	    unsub.style.display = 'inline';
	    unsub.style.marginRight = 0;
//	    unsub.setAttribute('style','float:right;display:inline');
//	    lies[i].appendChild(document.createTextNode(' '));
//	    lies[i].appendChild(unsub);
	    lies[i].insertBefore(unsub,lies[i].firstChild);
	    var callback = function(args) {
		Ajax.cleanStatus();
		var lies = document.getElementsByTagName('li');
		for(var i=0;i<lies.length;i++) {
		    if( lies[i].getAttribute('feedId') == args ) lies[i].style.display = 'none';
		}
	    }
	    unsub.onclickHandler = function() {
		Ajax.status('Unsubscribe this feed, please wait ....');
		var str = '' + document.location;
		var feedid = this.parentNode.getAttribute('feedId');
		var rExp = /rojo.com\/.*$/i;
		var url = str.replace(rExp, 'rojo.com/manage-feeds/doIRPCUnsubscribe.jsp?feed-id='+feedid)
		var callbackArguments = new Array();
		callbackArguments[callbackArguments.length] = feedid;
		w.Remote.execRequest(url, callback, callbackArguments );
	    }
	    unsub.addEventListener('click', unsub.onclickHandler, true);
	}
    }
}

Ajax.status = function(text) {

    var wid = 1*document.body.clientWidth;
    var len = window.innerHeight;
    var top = (len-40)/2;
    var left = (wid-250)/2;

    Ajax.cleanStatus();
    var msg = document.createElement('div');
    msg.setAttribute('id','ajax_status');
    msg.style.position = 'absolute';
    msg.style.top = top+'px';
    msg.style.left = left+'px';
    msg.style.zIndex = 1000;
    msg.style.width = '250px';
    msg.style.border = '1px solid #cc8';
    msg.style.fontFamily = 'arial';
    msg.style.fontWeight = 'bold';
    msg.style.backgroundColor = '#ffffd3';
    msg.style.margin = '2px';
    msg.style.padding = '5px';
    msg.style.textAlign = 'center';
//    msg.innerHTML =  pulser+ text;
    msg.innerHTML =  text;
    document.body.appendChild(msg);
}

Ajax.cleanStatus = function() {
    if( document.getElementById('ajax_status') ) body.removeChild( document.getElementById('ajax_status') );
}

Ajax.Script_Link();
Ajax.Unsubscribe_Feed();
Ajax.View_Feed();
Ajax.Mark_as_Read();
Ajax.Entry_doCollapsibleAndMarkRead();
Ajax.Refresh_LeftColumn();

})();

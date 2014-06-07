// ==UserScript==
// @name           Yahoo! Bid Image MouseOver
// @description    Show large image of item when mouse over
// @version        2.0
// @author         Jackal <Jackal.c@gmail.com>
// @icon           http://hk.auctions.yahoo.com/favicon.ico
// @run-at         document-end
// @namespace      http://userscripts.org/users/139641
// @include        http://hk.*auctions.yahoo.com/*
// @include        http://hk.search.auctions.yahoo.com/search/*
// @include        http://hk.auctions.yahoo.com/hk/*-category.html*
// @include        http://auctions.search.yahoo.co.jp/search?*
// @include        http://*.auctions.yahoo.co.jp/jp/*category*
// @include        http://tw.bid.yahoo.com/tw/*category*
// @include        http://tw.search.bid.yahoo.com/search/*
// @include        http://tw.auctions.yahoo.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

// Wrapper for GM_xmlhttpRequest
function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.abort = function() {
        this.readyState = 0;
    };

    this.getAllResponseHeaders = function(name) {
      if (this.readyState!=4) return "";
      return this.responseHeaders;
    };

    this.getResponseHeader = function(name) {
      var regexp = new RegExp('^'+name+': (.*)$','im');
      var match = regexp.exec(this.responseHeaders);
      if (match) { return match[1]; }
      return '';
    };

    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };
    
    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };

    this.send = function(data) {
        this.data = data;
        var that = this;
        // http://wiki.greasespot.net/GM_xmlhttpRequest
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with returned data
                // including the Greasemonkey specific "responseHeaders"
                for (k in rsp) {
                    that[k] = rsp[k];
                }
                // now we call onreadystatechange
                that.onreadystatechange();
            },
            onerror: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};

$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});

state = 0;
var regex;
var a;

if(document.URL.match(/yahoo\.co\.jp/i)){
	// Yahoo JP
	a = $("a[href*='.auctions.yahoo.co.jp/jp/auction/']:has(img)");
	regex = /src="(.+?)".+?id="(?:imgsrc1|img1)"/i;
}else if(document.URL.match(/hk.+?auctions\.yahoo\.com/i)){
	// Yahoo HK
	a = $("a[href*='.page.auctions.yahoo.com/hk/auction/']:has(img)");
	regex = /userpics.+[\s\S].+'(.+)'/im;
}else if(document.URL.match(/tw\..+?\.yahoo\.com/i)){
	// Yahoo TW
	a = $("a[href*='tw.page.bid.yahoo.com/tw/auction/']:has(img)");
	regex = /userpics.+[\s\S].+'(.+)'/im;
}	

a.live('mouseover', function(e) {
	if($(this).prop('src') == undefined && !$(this).attr('act')){
		$(this).attr('act',true);
		var site = $(this);
		var url = $(this).prop('href');
		var img = $(this).children('img');
		state = img.prop('src');
		$.get(url,function(data){
			data.match(regex);
			var full = RegExp.$1;
			site.prop('src',full);
			if(state == img.prop('src')) display(full,e);
		});
	}else	if($(this).prop('src') != undefined){
		state = $(this).prop('src');
		display(state,e);
	}
});

a.live('mouseout', function() {
	$('#preview').hide().css({'width':'0px','height':'0px'});
});

function display(src,e){
	$('#preview').prop('src','');
	$('#preview').prop('src',src).load(function(){
		$(this).css({'width' : 'auto', 'height' : 'auto'});
		if(e.pageX > unsafeWindow.innerWidth/2){
			$(this).css({'left':'0px','right':'',  'top': (unsafeWindow.innerHeight-$('#preview').height())/2}).show();
		}else{
			$(this).css({'left':'','right':'0px',  'top': (unsafeWindow.innerHeight-$('#preview').height())/2}).show();
		}
	});
	//alert($('#preview').width());
}

$('body').append('<img id="preview">');
$('#preview').css({'position' : 'fixed', 'right' : '10px', 'width' : 'auto', 'height' : 'auto', 'display' : 'none', 'zIndex' : 1000, 'border' : '1px solid black'});
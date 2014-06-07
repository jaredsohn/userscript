// ==UserScript==
// @name hatebu-scouter
// @namespace http://reppets.hatenablog.com/
// @include *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource loadingIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131208/20131208222202.gif
// @resource lockedIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131223/20131223190146.png
// @resource unlockedIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131223/20131223181716.png
// @resource closeIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131223/20131223190145.png
// @resource errorIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131223/20131223190147.png
// @resource reloadIcon http://cdn-ak.f.st-hatena.com/images/fotolife/r/reppets/20131223/20131223221947.png
// @resource emptyHtml https://gist.githubusercontent.com/reppets/9743907/raw/e046b087b63a2de6a298f4b58d143cf9f619a9d0/empty.html
// ==/UserScript==

// INFO:
//    the loading icon generated with http://www.ajaxload.info/
//    the other icons (except Hatena Bookmark icon) are from http://modernuiicons.com/
//        under license of CC BY-ND(3.0) https://github.com/Templarian/WindowsIcons/blob/117f1a468f77248df87677e78e3453d07971ca55/WindowsPhone/license.txt

// LICENSE INFORMATION:
/*
 * Copyright (c) 2014, reppets <all.you.need.is.word@gmail.com>
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


// ignore iframe/frame
if (window.top != window.self) {
  return;
}

// ====== OPTIONS ==============================================================

// use lazy loading or not.
var usesLazyLoad = true;

// ====== CONSTANTS ============================================================
const HATENA_FAVICON_URL = 'http://b.hatena.ne.jp/favicon.ico';
const LOADING_ICON_URL = GM_getResourceURL('loadingIcon');
const LOCKED_ICON_URL = GM_getResourceURL('lockedIcon');
const UNLOCKED_ICON_URL = GM_getResourceURL('unlockedIcon');
const CLOSE_ICON_URL = GM_getResourceURL('closeIcon');
const ERROR_ICON_URL = GM_getResourceURL('errorIcon');
const RELOAD_ICON_URL = GM_getResourceURL('reloadIcon');
const EMPTY_HTML_URL = GM_getResourceURL('emptyHtml');

const MESSAGE_NO_COMMENT = 'コメントはありません';

const INTENTIONAL_RELOAD_DELAY_MSEC = 350;

// ====== IFRAME CONTENTS ======================================================

var iframeBodyContent = '<div id="wrapper"><!--\
      --><ul id="commentlist"></ul><!--\
      --><div id="messageline"><!--\
        --><span id="message"></span><!--\
      --></div><!--\
      --><div id="counterline"><!--\
        --><img id="close" class="icon action" alt="閉じる" title="閉じる"><!--\
        --><img id="lock" class="icon action" alt="ロックする" title="ロックする"><!--\
        --><img id="reload" class="icon action" alt="リロード" title="リロード"><!--\
        --><a id="hatebuentrylink" target="_blank"><img id="hatebufavicon" class="icon" alt="はてなブックマークエントリーページへ" title="はてなブックマークエントリーページへ"></a><!--\
        --><span id="count"></span><!--\
        --><img id="countloaderror" class="icon"><!--\
      --></div><!--\
    --></div>';

var iframeHeadContent = '<meta charset="UTF-8" />\
    <title></title>\
    <style type="text/css">\
      * {\
        padding: 0;\
        border:  0;\
        margin:  0;\
        font-size: small;\
      }\
      body {\
        background-color: rgba(0,0,0,0.8);\
        color: white;\
        display: block;\
      }\
      img {\
        display: none;\
      }\
      img.icon {\
        height: 1em;\
        width:  1em;\
        margin: 3px;\
        vertical-align: middle;\
      }\
      img.action {\
        cursor: pointer;\
      }\
      #commentlist {\
        margin: 0;\
        padding: 1em 1em 1em 1em;\
        list-style: square inside;\
        display: none;\
        width: 500px;\
        height: auto;\
        white-space: normal;\
        overflow-y: auto;\
      }\
      #commentlist li {\
        margin-bottom: 1.1ex;\
        line-height:   110%;\
        word-wrap:     break-word;\
      }\
      #messageline {\
        margin:  0  0.8em  0  0.8em;\
        padding: 0.5em;\
        height: auto;\
        width: auto;\
        overflow: auto;\
        display: none;\
      }\
      #counterline {\
        padding: 2px 5px 3px 3px;\
        margin: 0;\
        border: 0;\
        text-align: right;\
        width: auto;\
        height: auto;\
        display: block;\
      }\
      #count {\
        vertical-align:middle;\
      }\
      #wrapper {\
        display: block;\
        width: auto;\
        height: auto;\
        position: absolute;\
        right: 0;\
        bottom: 0;\
        white-space: nowrap;\
      }\
    </style>';



// ====== STYLE DEFINITIONS ====================================================
// tab style
var tabStyle = {
	'position':'fixed'
	,'z-index':'2147483647'
	,'display':'block'
	,'right':'0px'
	,'bottom':'0px'
	,'visibility':'visible'
	,'overflow':'visible'
	,'border': '0'
	,'padding': '0'
	,'margin': '0'
	,'width':'auto'
	,'height':'auto'
	,'background':'rgba(1,0,0,0.8) none'
};

var iframeStyle = {
	'position':'fixed'
	,'z-index':'2147483647'
	,'display':'block'
	,'right':'0px'
	,'bottom':'0px'
	,'width':'auto'
	,'height':'auto'
	,'max-width':'50%'
	,'min-width':'none'
	,'max-height':'none'
	,'min-height':'none'
	,'background':'rgba(0,0,0,0) none'
	,'color':'rgba(255,255,255,0.8)'
	,'overflow':'auto'
	,'padding': '0'
	,'border': '0'
	,'margin': '0'
	,'text-align':'left'
	,'vertical-align':'bottom'
};

// ====== DOM CREATION =========================================================
var iframe = $('<iframe/>');
iframe.attr('src', EMPTY_HTML_URL);
iframe.css(iframeStyle);
$(document.body).append(iframe);
iframe.load(function() {
	var idoc = iframe.contents()[0];
	iframe.document = idoc;
	iframe.body = $('body',idoc);
	iframe.body.append(iframeBodyContent);
	$('head',idoc).append(iframeHeadContent);
	constructIFrame(iframe);
	retrieveCount(iframe);
	if (!usesLazyLoad) {
		retrieveComments(iframe);
	}
});

function showInline() {
	if (this.isDisplayable) {
		this.css('display', 'inline');
	}
}

function showBlock() {
	if (this.isDisplayable) {
		this.css('display', 'block');
	}
}

function hide() {
	this.css('display', 'none');
}

function constructIcon(element, src, isDisplayable) {
	element.attr('src', src);
	element.appear = showInline;
	element.disappear = hide;
	element.isDisplayable = isDisplayable;
	return element;
}

function constructIFrame(iframe) {
	// set iframe attributes
	iframe.isLocked = false;

	// methods
	iframe.update = function() {
		if (this.isExpanded) {
			this.expand();
		} else {
			this.shrink();
		}
	};

	iframe.expand = function() {
		this.isExpanded = true;
		
		this.closeIcon.appear();
		this.lockIcon.appear();
		this.reloadIcon.appear();
		this.commentList.appear();
		this.messageLine.appear();
		
		this.setIFrameSize();
	};

	iframe.shrink = function() {
		if (this.isLocked) {
			return;
		}
		
		this.isExpanded = false;
		
		this.closeIcon.disappear();
		this.lockIcon.disappear();
		this.reloadIcon.disappear();
		this.commentList.disappear();
		this.messageLine.disappear();
		
		this.setIFrameSize();
	};

	iframe.setMessage = function( message) {
		this.messageText.text(message);
		this.messageLine.isDisplayable = true;
	};

	iframe.setIFrameSize = function() {
		var newHeight = $('#wrapper',iframe.body).outerHeight();
		var newWidth = $('#wrapper',iframe.body).outerWidth();
		iframe.css('height',newHeight+'px');
		iframe.css('width',newWidth+'px');
	};

	// set icons
	iframe.closeIcon = constructIcon($('#close', iframe.body), CLOSE_ICON_URL, true);
	iframe.closeIcon.click(function() {
		iframe.remove();
	});

	iframe.lockIcon = constructIcon($('#lock', iframe.body), UNLOCKED_ICON_URL, true);
	iframe.lockIcon.click(function() {
		if (iframe.isLocked) {
			iframe.lockIcon.attr('src', UNLOCKED_ICON_URL);
			iframe.isLocked = false;
		} else {
			iframe.lockIcon.attr('src', LOCKED_ICON_URL);
			iframe.isLocked = true;
		}
	});

	iframe.reloadIcon = constructIcon($('#reload', iframe.body), RELOAD_ICON_URL, true);
	iframe.reloadIcon.click(function() {
		iframe.hatebuIcon.attr('src', LOADING_ICON_URL);
		iframe.countText.text('-');
		iframe.commentList.empty();

		setTimeout(
			function() {
				retrieveCount(iframe);
				retrieveComments(iframe);
			}
			, INTENTIONAL_RELOAD_DELAY_MSEC);
	});

	iframe.hatebuIcon = constructIcon($('#hatebufavicon', iframe.body), LOADING_ICON_URL, true);
	iframe.hatebuIcon.appear();

	iframe.errorIcon = constructIcon($('#countloaderror', iframe.body), ERROR_ICON_URL, false);


	// set other elements
	iframe.entryLink = $('#hatebuentrylink', iframe.body);
	iframe.entryLink.attr('href', 'http://b.hatena.ne.jp/entry/'+document.URL.replace('http://',''));

	iframe.commentList = $('#commentlist', iframe.body);
	iframe.commentList.appear = showBlock;
	iframe.commentList.disappear = hide;
	iframe.commentList.css('max-height',(Math.round(window.innerHeight*0.7)+'px'));
	iframe.commentList.isDisplayable = false;

	iframe.messageText = $('#message', iframe.body);
	iframe.messageLine = $('#messageline', iframe.body);
	iframe.messageLine.appear = showBlock;
	iframe.messageLine.disappear = hide;
	iframe.messageLine.isDisplayable = false;

	iframe.countText = $('#count', iframe.body);
	iframe.countText.text('-');

	iframe.wrapper = $('#wrapper', iframe.body);
	
	iframe.shrink();

	
	// event handlers
	if (usesLazyLoad) {
		var commentLoadHandler = function() {
			iframe.hatebuIcon.attr('src', GM_getResourceURL('loadingIcon'));
			retrieveComments(iframe);
			iframe.wrapper.unbind('mouseenter', commentLoadHandler);
		};
		iframe.wrapper.mouseenter(commentLoadHandler);
	}

	iframe.wrapper.mouseenter(function() {
		iframe.expand();
	});

	iframe.wrapper.mouseleave(function() {
		iframe.shrink();
	});

	$(window).resize(function() {
		iframe.commentList.css('max-height',(Math.round(window.innerHeight*0.7)+'px'));
	});




}

function retrieveCount(iframe) {
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://api.b.st-hatena.com/entry.count?url='+encodeURIComponent(document.URL),
		onload: function(response) {
			if (response.status >= 400) {
				iframe.errorIcon.isDisplayable = true;
				var errorComment = 'ブックマーク数取得エラー: '+response.status+' '+response.statusText;
				iframe.errorIcon.attr('alt', errorComment);
				iframe.errorIcon.attr('title', errorComment);
				iframe.update();
				return;
			}
			
			iframe.hatebuIcon.attr('src', HATENA_FAVICON_URL);
			if (response.responseText) {
				iframe.countText.text(response.responseText);
			} else {
				iframe.countText.text('0');
			}
			iframe.update();
		}
	});
}

function retrieveComments(iframe) {
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://b.hatena.ne.jp/entry/jsonlite/?url='+encodeURIComponent(document.URL),
		onload: function(response) {
			if (response.status >= 400) {
				iframe.setMessage('コメント取得エラー : '+response.status + ' '+response.statusText);
			} else if (response.responseText && response.responseText != 'null') {
				var comments = JSON.parse(response.responseText);
				var hasComment = false;
				for (var i in comments.bookmarks) {
					var user = comments.bookmarks[i].user;
					var comment = comments.bookmarks[i].comment;
					if (comment) {
						var item = $('<li/>');
						item.text(user+' : '+comment);
						iframe.commentList.append(item);
						iframe.commentList.isDisplayable = true;
						hasComment = true;
					}
				}
				if (!hasComment) {
					iframe.setMessage(MESSAGE_NO_COMMENT);
				}
			} else {
				iframe.setMessage(MESSAGE_NO_COMMENT);
			}
			iframe.hatebuIcon.attr('src', HATENA_FAVICON_URL);

			iframe.update();
		}
	});
}

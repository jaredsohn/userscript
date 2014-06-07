// ==UserScript==
// @version        1.9
// @name           Twitter Old Style Retweet +
// @namespace      http://d.hatena.ne.jp/hirokan55/
// @include        http*://*twitter.com/*
// ==/UserScript==

(function() {
// click
var rt_click = function(text) {
	return function (e) {
		if (document.getElementsByClassName('twitter-anywhere-tweet-box-editor').length == 1) {
			var status = document.getElementsByClassName('twitter-anywhere-tweet-box-editor')[0];
			status.value = text;
			status.focus();
			status.setSelectionRange(0, 0);
			scrollTo(0,0);
		} else {
			document.location.href = 'http://twitter.com/?status=' + encodeURIComponent(text);
		}
	};
};

// make retweet action
var make_retweet_action = function(entry) {
	if (entry.getElementsByClassName('old-style-retweet').length == 1) {
		return;
	}
	
	// screen name
	var screen_name;
	if (entry.getElementsByClassName('stream-item-content tweet stream-tweet ').length == 1) {
		screen_name = entry.getElementsByClassName('stream-item-content tweet stream-tweet ')[0].getAttribute('data-screen-name');
	} else {
		return;
	}
	
	// tweet text
	var tt;
	if (entry.getElementsByClassName('tweet-text').length == 1) {
		tt = entry.getElementsByClassName('tweet-text')[0];
	} else {
		return;
	}
	
	// RT text
	var content = tt.innerHTML.replace(/<\/?[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');	
	var rt_text = 'RT @' + screen_name + ' ' + content;
	
	
	// make action
	// i tag
	var i = document.createElement('i');
	i.setAttribute('style' , 'background-position:0 0;margin-left:3px;margin-right:0;');
	
	// b tag
	var b = document.createElement('b');
	b.appendChild(document.createTextNode('评论'));
	
	// span tag
	var span = document.createElement('span');
	span.appendChild(i);
	span.appendChild(b);
	
	// a tag
	var a = document.createElement('a');
	a.setAttribute('class' , 'old-style-retweet');
	a.setAttribute('href' , '#');
	a.addEventListener('click', rt_click(rt_text) , false);
	a.appendChild(span);
	a.addEventListener('mouseover' , function() {i.style.backgroundPosition = '-16px 0'; } , false);
	a.addEventListener('mouseout' , function() {i.style.backgroundPosition = '0 0'; } , false);
	
	// add action
	entry.getElementsByClassName('tweet-actions')[0].appendChild(a);
};


// make all retweet actions
var make_all  = function() {
	var si = document.getElementsByClassName('stream-item');
	var si_length = si.length;
	for (var i = 0; i < si_length ; i++) {
		make_retweet_action(si[i]);
	}
};


// DOM node inserted event
document.addEventListener('DOMNodeInserted', function(event) {
	var elmt = event.target;
	if (/stream-item/.test(elmt.getAttribute('class'))) {
		make_retweet_action(elmt);
	}
}, false);

// make all retweet actions
make_all();
})();


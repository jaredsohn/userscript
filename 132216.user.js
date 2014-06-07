// ==UserScript==
// @name           TweetCemetery
// @namespace      at.abendstille.tweetcemetery
// @description    Bury your beloved tweets at the Tweet Cemetery.
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

var TweetCemeteryGlobalData = {};

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var init = function() {
	window.setTimeout(manipulatePage, 500);
}

var insertBuryButton = function(id, buryBtt) {
	var pageNode = document.getElementById(id);
	if (pageNode == null) {
		//console.log('retrying bury button '+id);
		window.setTimeout(function() {
			insertBuryButton(id, buryBtt);
		}, 1000);
		return;
	}

	var container = getElementsByClass('tweet-button-sub-container', pageNode);
	if (container.length == 0) {
		//console.log('retrying bury button '+id);
		window.setTimeout(function() {
			insertBuryButton(id, buryBtt);
		}, 1000);
		return;
	}

	//console.log(container);
	var currentButton2 = getElementsByClass('tweet-button', container[0]);
	//console.log(currentButton2);

	clonedBtt = buryBtt.cloneNode(true);
	container[0].insertBefore(clonedBtt, currentButton2[0]);
	var textarea = getElementsByClass('twitter-anywhere-tweet-box-editor', pageNode)[0];

	TweetCemeteryGlobalData[id] = false;

	registerTextAreaListener(id, textarea, clonedBtt, TweetCemeteryGlobalData[id]);
};

var escapeTweet = function(tweet) {
	var r = new RegExp(/@([A-Za-z0-9_]+)/g);
	tweet = tweet.replace(r, '@***');

	r = new RegExp(/^D\s+([A-Za-z0-9_]+)/);
	tweet = tweet.replace(r, 'D ***');

	return tweet;
}

var textAreaChangeHandler = function(id, tweetTextArea, buryBtt) {
	if (!TweetCemeteryGlobalData[id+'-clickhandler']) {
		TweetCemeteryGlobalData[id+'-clickhandler'] = function(event) {
			buttonClickHandler(id, tweetTextArea, buryBtt, event);
		}
	}
	//console.log('val is '+tweetTextArea.value);
	if (tweetTextArea.value.trim().length > 0 && !TweetCemeteryGlobalData[id]) {
		buryBtt.addEventListener('click', TweetCemeteryGlobalData[id+'-clickhandler'], true);
		TweetCemeteryGlobalData[id] = true;
		buryBtt.classList.add('primary-btn');
		buryBtt.classList.remove('disabled');
		return;
	}
	if (tweetTextArea.value.trim().length == 0 && TweetCemeteryGlobalData[id]) {
		buryBtt.removeEventListener('click', TweetCemeteryGlobalData[id+'-clickhandler'], true);
		TweetCemeteryGlobalData[id] = false;
		buryBtt.classList.remove('primary-btn');
		buryBtt.classList.add('disabled');
		return;
	}
}

var registerTextAreaListener = function(id, tweetTextArea, buryBtt) {
	tweetTextArea.addEventListener('keydown', function() {
		//console.log('keydown on' + id);
		textAreaChangeHandler(id, tweetTextArea, buryBtt);
	}, true);
	tweetTextArea.addEventListener('keyup', function() {
		//console.log('keyup on' + id);
		textAreaChangeHandler(id, tweetTextArea, buryBtt);
	}, true);
	tweetTextArea.addEventListener('click', function() {
		//console.log('clicked on' + id);
		textAreaChangeHandler(id, tweetTextArea, buryBtt);
	}, true);
}

// Eventlistener for button
var buttonClickHandler = function(id, tweetTextArea, buryBtt, event) {
	//console.log(event);

	var tweet = escapeTweet(tweetTextArea.value.trim());

	if (tweet != '') {
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://www.abendstille.at/tweetcemetery/add',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: 'tweet='+tweet,
			onload: function(xhr)
			{
				// clear textbox
				tweetTextArea.value = '';

				// clear localstorage so that tweet does not appear again
				localStorage.setItem('draft_tweets', '{}');

				var evObj = document.createEvent('HTMLEvents');
				evObj.initEvent( 'change', true, true);
				tweetTextArea.dispatchEvent(evObj);

				var evObj2 = document.createEvent('MouseEvents');
				evObj2.initEvent( 'mouseup', true, true);
				tweetTextArea.dispatchEvent(evObj2);

				if( window.KeyEvent ) {
					var evObj3 = document.createEvent('KeyEvents');
					evObj3.initKeyEvent( 'keyup', true, true, window, false, false, false, false, 13, 0 );
				} else {
					var evObj3 = document.createEvent('UIEvents');
					evObj3.initUIEvent( 'keyup', true, true, window, 1 );
					evObj3.keyCode = 13;
				}
				tweetTextArea.dispatchEvent(evObj3);

				var evObj4 = document.createEvent('HTMLEvents');
				evObj4.initEvent( 'blur', true, true);
				tweetTextArea.dispatchEvent(evObj4);

				// now condense twitter box:
				// tweetTextArea.parentNode.parentNode.parentNode.classList.add('condensed');
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('keydown', true, true);
				tweetTextArea.dispatchEvent(evt);

				var result = xhr.responseText;

				if (result.indexOf('status') < 0 && result.indexOf('ok') < 0 && console && console.log) {
					console.log('ERROR');
					console.log(result);
				}

				var overlayBox = document.getElementById('tweetcemeteryOverlayBox');

				overlayBox.style.top = Math.floor(window.innerHeight/2 - 30) + 'px';
				overlayBox.style.left = Math.floor(window.innerWidth/2 - 85) + 'px';
				overlayBox.style.display = 'block';
				window.setTimeout(function() {
					document.getElementById('tweetcemeteryOverlayBox').style.display = 'none';
				}, 5000);
			},
			onerror: function(error) {
				if (console && console.log) {
					console.log('ERROR burying tweet:');
					console.log(error);
				}
			},
			onabort: function(abort) {
				if (console && console.log) {
					console.log('ERROR burying tweet (abort):');
					console.log(abort);
				}
			}
		});
	}
}


var manipulatePage = function() {

	// create button
	var newBtt = document.createElement('a');
	newBtt.appendChild(document.createTextNode('Bury'));
	var cls = document.createAttribute('class');
	cls.nodeValue = 'tweet-button btn disabled';
	newBtt.setAttributeNode(cls);
	var style = document.createAttribute('style');
	style.nodeValue = 'margin-right: 3px';
	newBtt.setAttributeNode(style);


	// create overlay-box for messages
	var overlayBox = document.createElement('div');

	style = document.createAttribute('style');
	style.nodeValue = 'display: none; position: absolute; width: 170px; height: 60px; top: 0; left: 0; border: 3px solid black; background-color: #FFC; padding: 15px; font-size: 20px; border-radius: 5px; z-index: 10000; text-align: center';
	overlayBox.setAttributeNode(style);

	var id = document.createAttribute('id');
	id.nodeValue = 'tweetcemeteryOverlayBox';
	overlayBox.setAttributeNode(id);

	overlayBox.innerHTML = 'Your tweet was buried at the <a href="http://www.abendstille.at/tweetcemetery">tweetcemetery</a>.'+
							'<div style="position: absolute; top: 6px; right: 6px; cursor: pointer" onclick="javascript:'+
							'document.getElementById(\'tweetcemeteryOverlayBox\').style.display = \'none\''+
							'">&#x2715;</div>';

	document.getElementsByTagName('body')[0].appendChild(overlayBox);


	// insert normal bury button
	insertBuryButton('page-node-home', newBtt);

	// prepare code to create bury button in global tweet window
	var globalTweetBtt = document.getElementById('global-new-tweet-button');
	//console.log(globalTweetBtt);
	globalTweetBtt.addEventListener('click', function(event) {
		insertBuryButton('tweet_dialog', newBtt);
	}, true);

}

if (typeof window.addEventListener != 'undefined')
window.addEventListener('load', init, false);
else if (typeof document.addEventListener != 'undefined')
document.addEventListener('load', init, false);
else if (typeof window.attachEvent != 'undefined')
window.attachEvent('onload', init);

// NewTwitter RTL hashtags Aug2011
// version 0.8
// Old copyrights below:
// 2010-11-22
// Copyright (c) 2010 Yehuda Bar-Nir. 
// Based on work by Guy Sheffer (GuySoft): "Twitter Unicode Hashtags + RTL support" - http://userscripts.org/scripts/show/82584
// and themiddleman: "runOnTweets" - http://userscripts.org/scripts/show/82719
// -- Thanks guys.
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ==UserScript==
// @name           NewTwitter RTL Hashtags Dec2011
// @namespace      http://yehudab.com
// @description    Adds Non-latin hash tags to New Twitter. Version 0.8
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

runOnTweets();

function runOnTweets(callback) {
	document.addEventListener("DOMNodeInserted", function(e) {
		var statuses = e.target.getElementsByClassName("tweet-text");
		if (statuses != null && statuses.length > 0) {
			var isThereRTLChars=/[\u0590-\u05ff\u0600-\u06ff]/;
//			var nonLatinHash=/#([^\x00-\x7F]+)/g;
			var nonLatinHash=/ #([\u0590-\u05ff\u0600-\u06ff\._0-9']+)/g;
		
			for (var i = 0; i < statuses.length; i++) {
				var tweetText = statuses[i].innerHTML;
				if (isThereRTLChars.test(tweetText)) {
					statuses[i].style.direction="rtl";
					statuses[i].style.textAlign="right";
					if (nonLatinHash.test(tweetText)) {
						statuses[i].innerHTML = tweetText.replace(nonLatinHash, '<a rel="nofollow" class="twitter-hashtag" href="/#!/search?q=%23$1" style="direction: rtl">#$1</a>');
					}
				}
			}
		}
	}, true);
}

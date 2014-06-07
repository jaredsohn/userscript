// NewTwitter RTL user script Modified for TweetDeck, and then again for the web interface
// version 0.4
// 2011-12-10
// Copyright (c) 2011 Guy Sheffer
// Based on work by Guy Sheffer (GuySoft): "Twitter Unicode Hashtags + RTL support" - http://userscripts.org/scripts/show/82584
// And Yehuda Bar-Nir
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
// @name           TweetDeck web RTL
// @namespace      http://guysoft.wordpress.com
// @description    Adds RTL support and non-latin hash tags to TweetDeck Web edition. Version 0.4
// @include        chrome-extension://*
// @include        https://web.tweetdeck.com/*
// @include        http://web.tweetdeck.com/*
// ==/UserScript==

var nonLatinHash=/#([^\x00-\x7F]+([_.][^\x00-\x7F]+)*)/g;
var isThereRTLChars=/[\u0590-\u05ff\u0600-\u06ff]/;

function pageRunner(e) {
	var elements=["chp"];
        for (var j=0; j < elements.length; j++) {
	      if(e.target && e.target.getElementsByClassName){
		    var statuses = e.target.getElementsByClassName(elements[j]);
		    if (statuses != null && statuses.length > 0) {
			    for (var i = 0; i < statuses.length; i++) {
					var tweetText = statuses[i].innerHTML;
			      		if (nonLatinHash.test(tweetText)) {
					  tweetText = tweetText.replace(nonLatinHash, '#<a href="http://twitter.com/search?q=$1" rel="hashtag">$1</a>');
					}
					if (isThereRTLChars.test(tweetText)) {
					    //statuses[i].style.direction="rtl";
					    //statuses[i].style.textAlign="right";
					    var newtweetText = "";
					    
					    seprator1 = "</header>";
					    seprator2 = "</p> </div>";
					    var splitTweet = tweetText.split(seprator1, 2);
					    newtweetText += splitTweet[0] + seprator1;
					    newtweetText +='<div style="direction: rtl; text-align: right; class="chp ">';
					    
					    
					    var splitTweet2 = splitTweet[1].split(seprator2, 2);
					    newtweetText +=splitTweet2[0] + seprator2;
					    newtweetText +='</div>';
					    newtweetText +=splitTweet2[1];
					    statuses[i].innerHTML = newtweetText;
					}
					else{
					  //statuses[i].style.direction="ltr";
					  //statuses[i].style.textAlign="left";
					    
					    var newtweetText = "";
					    
					    seprator1 = "</header>";
					    seprator2 = "</p> </div>";
					    var splitTweet = tweetText.split(seprator1, 2);
					    newtweetText += splitTweet[0] + seprator1;
					    newtweetText +='<div style="direction: ltr; text-align: left; class="chp ">';
					    
					    
					    var splitTweet2 = splitTweet[1].split(seprator2, 2);
					    newtweetText +=splitTweet2[0] + seprator2;
					    newtweetText +='</div>';
					    newtweetText +=splitTweet2[1];
					    statuses[i].innerHTML = newtweetText;
					}
			    }
		    }
	      }
	}
  }

runOnTweets();
pageRunner();

function runOnTweets(callback) {
	document.addEventListener("DOMNodeInserted", pageRunner, true);
}
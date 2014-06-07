// HootSuite RTL user script
// version 0.1
// 2011-04-07
// Copyright (c) 2010 Guy Sheffer (GuySoft)
// Based on work by Yehuda Bar-Nir NewTwitter  http://userscripts.org/scripts/show/90965
// Which came from "Twitter Unicode Hashtags + RTL support" - http://userscripts.org/scripts/show/82584
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
// @name           HootSuite RTL
// @namespace      http://www.guysoft.co.il
// @description    Adds RTL support to HootSuite. Version 0.1
// @include        http://hootsuite.com/*
// @include        https://hootsuite.com/*
// @include        http://www.hootsuite.com/*
// @include        https://www.hootsuite.com/*
// ==/UserScript==

runOnPage();

function runOnPage(callback) {
	document.addEventListener("DOMNodeInserted", function(e) {
	var elements=["_baseTweetText _tweetText messageContent","_baseTweetText _postText messageContent","commentContent"];
        for (var j=0; j < elements.length; j++) {
	      if(e.target && e.target.getElementsByClassName){
		    var statuses = e.target.getElementsByClassName(elements[j]);
		    if (statuses != null && statuses.length > 0) {
			    var isThereRTLChars=/[\u0590-\u05ff\u0600-\u06ff]/;
			    
			    for (var i = 0; i < statuses.length; i++) {
				    var tweetText = statuses[i].innerHTML; 
				    if (isThereRTLChars.test(tweetText)) {
					    statuses[i].style.direction="rtl";
					    statuses[i].style.textAlign="right";
				    }
				    else{
					    statuses[i].style.direction="ltr";
					    statuses[i].style.textAlign="left";
				    }
			    }
		    }
	      }
	}
  }, true);
}
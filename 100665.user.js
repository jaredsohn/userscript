// Facebook RTL user script
// version 0.3
// 2013-06-01
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
// @name           Facebook RTL
// @namespace      http://guysoft.wordpress.com
// @description    Adds RTL support to Facebook
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @grant          none
// ==/UserScript==

function pageRunner(e) {
	var elements=["userContent","commentContent","commentContent UIImageBlock_Content UIImageBlock_SMALL_Content","messageBody","uiStreamMessage","uiSelector mlm hideSelector uiSelectorRight","uiSelector mlm hideSelector uiSelectorRight","fsm fwn fcg","mts uiAttachmentDesc","prs fwb","mall_post_image_block_content","uiList","mbs uiStreamStory uiUnifiedStory uiStreamMinistory uiListItem  uiListVerticalItemBorder","uiStreamStory","UIImageBlock_Content UIImageBlock_ICON_Content","UIImageBlock clearfix","UIImageBlock_Image UIImageBlock_ICON_Image","GBThreadMessageRow_Body_Content"];
	    elements.push("translationEligibleUserMessage");//A normal status with text
	    elements.push("-cx-PUBLIC-fbEntstreamText__message userContentWrapper");//commented on item
	    elements.push("mbs -cx-PRIVATE-fbEntstreamAttachmentShare__title");//attachment share title
	    elements.push("-cx-PRIVATE-fbEntstreamAttachmentShare__description");//attachment share description
	    elements.push("cx-PUBLIC-fbEntstreamText__message userContentWrapper");//share message in group
	    elements.push("UFICommentContent");// comment in group
	    
	    //featured content in pages
	    elements.push("-cx-PRIVATE-fbTimelineText__featured mbm");
	    elements.push("-cx-PRIVATE-fbTimelineText__featured");
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
  }

runOnPage();
pageRunner();

function runOnPage(callback) {
	document.addEventListener("DOMNodeInserted", pageRunner, true);
}

/***********
Copyright (c) 2012 PatheticCockroach

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
***********/

// ==UserScript==
// @name			Yahoo Mail Ad Cleaner
// @namespace		Yahoo_Mail_Ad_Cleaner
// @description		Remove remaining ad spaces in Yahoo Mail after Ad Block emptied them
// @version			5
// @encoding		UTF-8
// @include			http*://*mail.yahoo.com/*
// @grant			GM_addStyle
// @author			PatheticCockroach - http://www.patheticcockroach.com
// @license			MIT License
// @url				http://notepad.patheticcockroach.com/2988/a-few-ad-killing-greasemonkey-scripts/
// Based on https://userscripts.org/scripts/review/115923
// @updateURL		http://img.patheticcockroach.com/01/gms/Yahoo_Mail_Ad_Cleaner.user.js
// ==/UserScript==

var Yahoo_Mail_Ad_Cleaner={
    start : function(){
        var ads=["theMNWAd","theAd","slot_REC","slot_LREC","slot_MIP","slot_MNW","searchAd"];
        for(i=0;i<ads.length;i++)
        {
			tbl=parent.document.getElementById(ads[i]);
			if(tbl!=null) tbl.style.display="none";
        }
        parent.document.getElementById("main").style.marginRight="0px";
		GM_addStyle(".panescroll #shellcontent { right: 0; }");
		setTimeout(Yahoo_Mail_Ad_Cleaner.start,500);
    }
}
Yahoo_Mail_Ad_Cleaner.start()
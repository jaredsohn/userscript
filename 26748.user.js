// Show Posts in Blogspot in Print View
// version 0.1 beta
// Copyright (c) 2008, AppleGrew
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// Usage: When using this script then a new word 'Print' will appear
// beside every post's posting date header.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Blogspot Post PrintView
// @namespace     http://applegrew.blogspot.com/search/label/Greasemonkey%20Scripts/
// @description   Show Posts in Blogspot in Print View
// @include       http://*.blogspot.com/*
// @include       file:///home/apple/Desktop/AppleGrew's%20Mind.html*
// ==/UserScript== 

var head, js;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
js = document.createElement('script');
js.type = 'text/javascript';
js.innerHTML ='function printview(id){location.href =location.href + "?print=1&id="+id+""; return;}';
head.appendChild(js);

var isPrintMode = false;
var qs;
var ID=-1, postClass="post";
if (qs=location.href.match(/\?print=1&id=(\d+)&postclass=(\S+)/i)){
        if(qs[1] && qs[2]){
                isPrintMode = true;
                ID = qs[1];
                postClass = unescape(qs[2]);
        }
}

var allDates, allPosts;

var postDiv = document.evaluate(
    "//div[@class='blog-posts hfeed']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);

var postDivChildren;
if(postDiv && postDiv.singleNodeValue)
        postDivChildren = postDiv.singleNodeValue.childNodes;

if(postDivChildren){
        for (var i = 0; i < postDivChildren.length;) {
        var thisDate = postDivChildren[i++];
        while((!thisDate || !thisDate.tagName || thisDate.tagName != "H2") && i<postDivChildren.length){
                thisDate = postDivChildren[i++];
        }
        
        var thisPost = postDivChildren[i++];
        while((!thisPost || !thisPost.tagName || thisPost.tagName != "DIV") && i<postDivChildren.length){
                thisPost = postDivChildren[i++];
        }
        
        if(thisDate && thisPost){
                thisPost.setAttribute("id","postid"+i);
                var posttimestamp = thisDate.textContent;
                var newdiv = document.createElement('div');
                var DivHTML = '<h2 class="date-header" id="dateid'+i+'"><nobr>'+posttimestamp;
                if(!isPrintMode)
                        DivHTML += '&nbsp;&nbsp;&nbsp;<a href="?print=1&id='+i+'&postclass='+thisPost.getAttribute("class")+'"><b>Print</b></a>';
                DivHTML += '</nobr></h2>'
                newdiv.innerHTML = DivHTML;
                
                thisDate.parentNode.replaceChild(newdiv,thisDate);
        }
        }
}

if (isPrintMode) {
        var dateid = "dateid"+ID;
        var postid = "postid"+ID;
        var newbody = "<div class=\"blog-posts hfeed\"><h2 class=\"date-header\">"+document.getElementById(dateid).innerHTML+
                "</h2><div class=\""+postClass+"\">"+document.getElementById(postid).innerHTML+"</div></div>";
        document.body.innerHTML = newbody;
                
}

// MySpace Blog RSS
// version 0.1 BETA!
// 2006-12-04
// Copyright (c) 2006, Jon Williams 
// Released under the MIT license
/*

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.

*/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Myspace Blog RSS", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Myspace Blog RSS
// @namespace     http://wizardishungry.com/
// @description   Add Myspace Blog RSS links after any user link and to the HEAD of user pages
// @include       http://*.myspace.com/*
// @include       http://myspace.com/*
// ==/UserScript==

var prefix='http://blog.myspace.com/blog/rss.cfm?friendID=';

var links = document.getElementsByTagName('a');
var head = document.getElementsByTagName('head')[0];
var headDone= (! head);

for(var i = 0; i < links.length; i++)
{
    var link=links[i];
    var url = link.href;
    if(/^http:\/\/.*myspace.com\/.*friendid=.*$/i.test(url) &&
     (url.indexOf(prefix)==-1) )
    {
        //if(i%10==0)alert(i+' '+links.length+' '+url);
        var fid = url.replace(/.*friendid=/i,'');
        fid = fid.replace(/&.*/,'');
        if(!(/<img /i.test(link.innerHTML)) && (link.href.indexOf('viewprofile')!=-1) )
        {
            newElement = document.createElement('span');
            newElement.innerHTML='<a href="'+prefix+fid+
            '" title="Blog RSS" style="font-size: smaller !important; text-decoration: none !important; background-color: orange !important; color: fff !important; "'
            +'>RSS</a>';

            if(link)
                link.parentNode.insertBefore(newElement, link.nextSibling);
        }
        if((!headDone) && (/^http:\/\/blog.myspace.com\//i.test(url)))
        {
            rss=document.createElement('link');
            rss.rel="alternate";
            rss.type="application/rss+xml";
            rss.title="myspace blog";
            rss.href=prefix+fid;
            head.appendChild(rss);
            headDone=true;
        }
    }
}

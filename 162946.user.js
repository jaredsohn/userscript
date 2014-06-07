// ==UserScript==
// @name           H33t URL Redirector
// @namespace      terryw.unblock.heet
// @author         TerryW
// @description    Redirects H33t domain to a proxy. Mainly for redirecting sites, I use it for Torrentz, add your own to your liking.
// @license        MIT; http://en.wikipedia.org/wiki/Mit_license
// @copyright      TerryW @ https://userscripts.org
// @include        http://www.torrentz.eu/*
// @include        http://torrentz.eu/*
// @include        https://www.torrentz.eu/*
// @include        https://torrentz.eu/*
// @updateURL      https://userscripts.org/scripts/source/162946.user.js
// @downloadURL    https://userscripts.org/scripts/source/162946.user.js
// @version        0.1.0
// ==/UserScript==

/*---------DESCRIPTION-------------
Unblock H33t!
It was made for torrentz.eu redirects but should work on every site you might want to add.
Based on FaceBook URL Changer - http://userscripts.org/scripts/show/83285 by ams72.

-TerryW
---------------------------------*/

/*------------LICENSE--------------

 * Copyright (c) 2011 - 2012 TerryW @ https://userscripts.org
 * H33t URL Redirector 0.1.0
 * Current version: 0.1.0
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.

---------------------------------*/

//use this variable below to change your proxy, DO NOT include http or www.
//example malaysiabay.org
//http://torrentfreak.com/kickasstorrents-proxies-blossom-after-uk-blockades-130324/
var proxySite = 'h33tproxy.co';

//------------------------------------------
//-------DONT EDIT BELOW THIS LINE----------

function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('a');
       for(var i=0; i<elms.length; i++){
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
    }

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
	
    if (thisLink.href.match('www.h33t.com')) {
		thisLink.href = thisLink.href.replace('www.h33t.com', proxySite);
	}
	
	else if (thisLink.href.match('h33t.com')) {
		thisLink.href = thisLink.href.replace('h33t.com', proxySite);
	}
}
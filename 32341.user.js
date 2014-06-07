// ==UserScript==
// @name         Behindwoods Gallery Prettifier
// @namespace    http://saravan.blogspot.com
// @description  Remove the top banners in Behindwoods gallery page and adds key board shortcuts for navigation.
// @include      http://www.behindwoods.com/features/Gallery/*
// @include      http://www.behindwoods.com/image-gallery-stills/*
// @include      http://behindwoods.com/features/Gallery/*
// @include      http://behindwoods.com/image-gallery-stills/*
// @include      http://*behindwoods.com/bollywood/hindi-movies-gallery/*
// @include      http://*behindwoods.com/image-gallery-stills/*
// @include      http://*behindwoods.com//image-gallery-stills/*
// ==/UserScript==

/*********************************************************************
* Behindwoods Gallery Prettifier
*   - Remove the top banners in Behindwoods gallery page 
*   - Adds key board shortcuts for navigation.
* Copyright (C) 2008, Saravana Kumar <saravanannkl@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301  USA
*********************************************************************/

var mainContent = document.getElementsByTagName('center');
if(mainContent.length>0)
        document.body.innerHTML = "<center>" + document.getElementsByTagName('center')[0].innerHTML + "</center>";

var nextImg = document.evaluate("//img[contains(@alt, 'Next')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);        
if(nextImg.snapshotLength>0)
        nextLink = nextImg.snapshotItem(0).parentNode;
        
var prevImg = document.evaluate("//img[contains(@alt, 'Prev')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);        
if(prevImg.snapshotLength>0)
        prevLink = prevImg.snapshotItem(0).parentNode;
        
document.addEventListener('keypress', 
                function (e) {
                        try {
                                switch (e.keyCode) {
                                        case e.DOM_VK_LEFT:
                                                if(prevLink)
                                                        window.location.href = prevLink.href;
                                                break;
                                        case e.DOM_VK_RIGHT: 
                                                if(nextLink)
                                                        window.location.href = nextLink.href;
                                                break;
                                }
                        }
                        catch(e) {
                                GM_log('Exception in Keyboard handler: ' + e.toString());
                        }
                }
                , true);

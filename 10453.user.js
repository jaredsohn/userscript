// ==UserScript==
// @name                         deviantFIX:RelatedNews
// @namespace                com.deviantart.dancewiththesky
// @description                 Adds related news links for every article
// @include                       http://news.deviantart.com/article/*
// ==/UserScript==

/* 
  This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
  
  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA or visit http://www.opensource.org/licenses/gpl-license.php

 Icons are (possibly modified versions) from the Tango project <http://tango.freedesktop.org/> and are licensed under the Creative Commons Attribution Share-Alike license <http://creativecommons.org/licenses/by-sa/2.5/>
*/  

(function(){


    function $(id){
        return document.getElementById(id);
    }
    
    function $xp(path){
        var result = document.evaluate(path, document, null, 
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        return result? result.snapshotItem(0) : null;
    }

    function GM_getOrSet(key, def){
        if (GM_getValue(key) == undefined){
            GM_setValue(key, def);
            return def;
        } else {
            return GM_getValue(key);
        }
    }


    var articleCatName = $('jsid-news').getElementsByTagName('h1')[0].innerHTML;
    var submitterLine0 = $("jsid-news").getElementsByTagName('a')[5];
    var submitterSym =  submitterLine0.parentNode.innerHTML[0] ;
    var submitterName = submitterLine0.innerHTML.substring(0, submitterLine0.innerHTML.indexOf('<img'));
    var section = unsafeWindow.deviantART.pageData.news_state.section;

    var relatedDiv = document.createElement('div');
    relatedDiv.innerHTML = '<h2 style="text-indent: 7px; font-size: 110%; font-weight: bold;"' + 
    'class="section-head">Related</h2><br /><div style="text-indent: 7px">' +
    '<a href="http://search.deviantart.com/?section=news&qh=sort%3Atime&q=by%3A' + submitterName  + 
    '"><b>Also by ' + submitterSym + submitterName + '</b></a><br />' +
    '&nbsp;&nbsp;<a href="http://news.deviantart.com/?folderpath=' + section + 
    '/&type=pie">Popular in  ' + articleCatName + ' News</a><br/>' + 
    '&nbsp;&nbsp;<a href="http://news.deviantart.com/?folderpath=' + section + 
    '/&type=time">Latest in ' + articleCatName + ' News</a><br /><br /></div>';
    
    var noticesDiv = $xp("//div[@class='section']");
    noticesDiv.parentNode.insertBefore(relatedDiv, noticesDiv);

    // clean the header
    if (GM_getOrSet('removeNewsHeader', false) == true){
         $('jsid-news').removeChild($('jsid-news').getElementsByTagName('h1')[0]);
         $('browsebar1').parentNode.removeChild($('browsebar1'));
    }
    
})();

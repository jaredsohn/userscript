//
// Copyright (c) 2006 David Wilkinson. All rights reserved.
//
// ==UserScript==
// @name           How Interesting?
// @namespace      http://www.dopiaza.org/flickr/greasemonkey/howinteresting/
// @description    Show How Interesting your Photo is
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// @match	   http://www.flickr.com/photos/*
// @match	   http://flickr.com/photos/*
// @version        2.6
// @downloadURL	   https://userscripts.org/scripts/source/82113.user.js
// @updateURL	   https://userscripts.org/scripts/source/82113.meta.js
// @run-at         document-end
// ==/UserScript==

(function () {

var debug = false;

if (typeof(GM_log) == "undefined") {

    GM_log = function (message) {
        console.info(message);
    }
}
GM_debug = function (message) {
    if (debug) {
        GM_log(message);
    }
}

var photoPagePattern = /^.*\/photos\/[\w@-]+\/(\d+)\//;

function checkPhotoPage()
{
    var isPhotoPage = false;
    
    if (photoPagePattern.exec(window.location.href))
    {
        isPhotoPage = true;
    }
    
    GM_debug("isPhotoPage: " + isPhotoPage);
    return isPhotoPage;
}

function owner() {
	var editLinks = document.getElementsByClassName('owner-edit');
	return editLinks != null && editLinks != undefined && editLinks.length > 0;
}

function addLink()
{
    {
        var listElements = document.evaluate(
            "//div[@id='photo-sidebar-additional-info']/h4",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);      
        
                     
        if (listElements.snapshotLength > 0) 
        {
            var firstItem = listElements.snapshotItem(0);
            var link = document.createElement('a');
            link.setAttribute('href', '#');
	    link.setAttribute('class', 'license-highlight');
	    link.setAttribute('style', 'display: block;');
            var text = document.createTextNode('Check Interestingness Ranking');
            link.appendChild(text);
            firstItem.parentNode.appendChild(link);
            
            link.addEventListener("click", function(evt) {
                evt.preventDefault();
                var searching = document.createElement('span');
		searching.setAttribute('style', 'display: block;');
                searching.appendChild(document.createTextNode('Searching Flickr...'));
                firstItem.parentNode.replaceChild(searching, link);
                showRanking(1, searching);
            }, true);
        } else {
            GM_debug("no photo-sidebar-additional-info");
        }
    }
}

function getJSVariable(reMatch) {
    var scripts = document.evaluate("//script", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, len = scripts.snapshotLength; i < len; ++i) {
	var script = scripts.snapshotItem(i);
	var html = script.innerHTML;
	try {
	    retval = html.match(reMatch)[1];
	    return retval;
	} catch (e) {
	}
    }
    return retval;
}

function GM_getAPIKey() {
	return getJSVariable(/[\"\']api_key[\"\'][ :]+[\'\"]([^\'\"]+)[\'\"]/);
}

function GM_getAuthHash() {
	return getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\'\"]([^\'\"]+)[\'\"]/);
}

function GM_getOwnerId() {
	return getJSVariable(/[\"\']page_owner[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
}

function showRanking(page, nodeToReplace) {   
    GM_debug("page: " + page);
    var perPage = 500;
    var photoId = document.location.href.match(photoPagePattern)[1];
    var contribution = document.getElementById('photo-story-attribution');
    var nsid = GM_getOwnerId();
    
    GM_debug("calling API");
    var oReq = new XMLHttpRequest();
    oReq.onload = function(response) {
            var responseText = oReq.responseText;
            GM_debug("API call succeeded");
            try {
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
		    try {
                    	result = eval('(' + responseText + ')');
		    } catch (f) {
			GM_log("unable to parse response: '" + responseText + "'");
			return;
		    }
                }
                if (result.stat === 'fail') {
                    GM_log("failed: " + result.message);
                    var n = document.createElement('span');   
                    n.setAttribute("class", "Plain");
	    	    n.setAttribute('style', 'display: block;');
                    n.appendChild(document.createTextNode("failed: " + result.message));
                    nodeToReplace.parentNode.replaceChild(n, nodeToReplace);
                    return;
                }
                var photoElements = result.photos.photo;
                var ranking = 0;                
                for (var i = 0; i < photoElements.length; i++) {                        
                    var el = photoElements[i];    
                    var id = el.id;
                        
                    if (photoId == id) {
                        // This is the one
                        ranking = (page - 1) * perPage + i + 1;
                    }
                }
                    
                var text = undefined;
                if (ranking == 0) {
                    // Didn't find it, are there more?
                    if (page < parseInt(result.photos.pages)) {
                        showRanking(page + 1, nodeToReplace);
                    } else {
                        text = document.createElement('div');
			text.innerHTML = "Couldn't find photo";
                    }
                } else {
                    var text = document.createElement('div');
                    if (owner()) {
                        var link = document.createElement('a');
                        link.href = "/me/popular-interesting/page" + (Math.ceil(ranking / 20));
                        link.appendChild(document.createTextNode(formatNumber(ranking)));
                        text.appendChild(link);
                        text.appendChild(document.createTextNode(" most interesting photo in your photostream"));
                    } else {
                        text.appendChild(document.createTextNode(formatNumber(ranking) +
                                                                 " most interesting photo in this photostream"));
                    }
                }
                    
                if (text) {
                   text.setAttribute('class', 'stat-item');
	    	   text.setAttribute('style', 'display: block;');
                   nodeToReplace.parentNode.replaceChild(text, nodeToReplace);
                }
            } catch (e) {
                GM_log("error: " +  e);
                    var n = document.createElement('span');   
                    n.setAttribute("class", "Plain");
		    n.setAttribute('style', 'display: block;');
                    n.appendChild(document.createTextNode("error: " + e));
                    nodeToReplace.parentNode.replaceChild(n, nodeToReplace);
            }
        };
    oReq.onerror = function (response) {
            GM_log("error while calling API");
        };
    oReq.open('GET', 'http://www.flickr.com/services/rest/?api_key=' + GM_getAPIKey() + "&auth_hash=" + GM_getAuthHash() + "&method=flickr.photos.search&user_id=" + nsid + "&per_page=" + perPage + "&sort=interestingness-desc&page=" + page + "&format=json&nojsoncallback=1", true);
    oReq.send();
}

function formatNumber(n)
{
    var ns = new String(n);
    var n1 = ns.substr(-1, 1);
    var n2 = ns.substr(-2, 2);
    var suffix = "th";   
    if (n2 == "11" || n2 == "12" || n2 == "13" )
    {
        suffix = "th";        
    }
    else if (n1 == "1")
    {
        suffix = "st";
    }
    else if (n1 == "2")
    {
        suffix = "nd";
    }
    else if (n1 == "3")
    {
        suffix = "rd";
    }     
    return ns + suffix;
}

	    if (checkPhotoPage())
        {
            addLink();
        }    
	
})();


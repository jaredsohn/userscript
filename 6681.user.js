//
// Copyright (c) 2006 David Wilkinson. All rights reserved.
//
// ==UserScript==
// @name           How Interesting?
// @namespace      http://www.dopiaza.org/flickr/greasemonkey/howinteresting/
// @description    Show How Interesting your Photo is
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==

var photoPagePattern = /^.*\/photos\/[\w@-]+\/(\d+)\//;

function checkPhotoPage()
{
    var isPhotoPage = false;
    
    if (photoPagePattern.exec(window.location.href))
    {
        isPhotoPage = true;
    }
    
    return isPhotoPage;
}


function addLink()
{
    if (unsafeWindow.global_photos["" + unsafeWindow.page_photo_id].isOwner == true)
    {
        var listElements = document.evaluate(
            "//li[@class='Stats']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);      
        
                     
        if (listElements.snapshotLength > 0) 
        {
            var firstItem = listElements.snapshotItem(0);
            var parent = firstItem.parentNode;
            var newListItem = document.createElement('li');
            newListItem.setAttribute('class', 'Stats');
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('class', 'Plain');
            var text = document.createTextNode('Check Interestingness Ranking');
            link.appendChild(text);
            newListItem.appendChild(link);
            parent.insertBefore(newListItem, firstItem);    
            
            link.addEventListener("click", function(evt)
            {
                var searching = document.createElement('span');
                searching.appendChild(document.createTextNode('Searching Flickr...'));
                newListItem.replaceChild(searching, link);
                showRanking(1, searching);
                evt.preventDefault();
            }, true);
        }
    }
}

function showRanking(page, nodeToReplace)
{   
    var perPage = 500;
    var photoId = unsafeWindow.page_photo_id;
    
    if (unsafeWindow.global_photos["" + unsafeWindow.page_photo_id].isOwner == true)
    {
        unsafeWindow.F.API.callMethod('flickr.photos.search', 
        {
            user_id: unsafeWindow.global_nsid,
            per_page: perPage,
            sort: 'interestingness-desc',
            page: page
        }, 
        {
            flickr_photos_search_onLoad: function(success, responseXML, responseText, params)
            {
                if(success) 
                {
                    var photoElements = document.evaluate(
                         "//photo",
                        responseXML,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);      
                         
                    var ranking = 0;                
                    for (var i = 0; i < photoElements.snapshotLength; i++) 
                    {                        
                        var el = photoElements.snapshotItem(i);    
                        var id = el.getAttribute("id");
                        
                        if (photoId == id)
                        {
                            // This is the one
                            ranking = (page - 1) * perPage + i + 1;
                        }
                    }
                    
                    var text = "";
                    if (ranking == 0)
                    {
                        // Didn't find it, are there more?
                        var photosElements = document.evaluate(
                         "//photos",
                        responseXML,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);      
                        
                        if (photosElements.snapshotLength > 0)
                        {
                            var photos = photosElements.snapshotItem(0);
                            var totalPages = photos.getAttribute("pages");
                            
                            if (page < totalPages)
                            {
                                showRanking(page + 1, nodeToReplace);
                            }
                            else
                            {
                                text = "Couldn't find photo";
                            }
                        }                        
                    }
                    else
                    {
                        text = "This is your " + formatNumber(ranking) + " most interesting photo";                        
                    }
                    
                    if (text.length > 0)
                    {
                        var n = document.createElement('span');   
                        n.setAttribute("class", "Plain");
                        n.appendChild(document.createTextNode(text));
                        nodeToReplace.parentNode.replaceChild(n, nodeToReplace);
                    }
                }
            }
        });
    }
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

window.addEventListener("load", 
    function () 
    {
	    if (checkPhotoPage())
        {
            addLink();
        }    
	}, false
);
	


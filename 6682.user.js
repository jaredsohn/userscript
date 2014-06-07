//
// Copyright (c) 2006 David Wilkinson. All rights reserved.
//
// ==UserScript==
// @name           Utata Pool Days
// @namespace      http://www.dopiaza.org/flickr/greasemonkey/utatadays/
// @description    Show Days in Utata Pool
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


function getUtataElement()
{
    return document.getElementById("contextLink_pool81474450@N00")
}

function showCount()
{   
    var utataElement = getUtataElement();
    if (unsafeWindow.global_photos["" + unsafeWindow.page_photo_id].isOwner == true && utataElement != null)
    {
        unsafeWindow.F.API.callMethod('flickr.groups.pools.getPhotos', 
        {
            group_id: '81474450@N00',
            user_id: unsafeWindow.global_nsid,
            per_page: 200,
            page: 1
        }, 
        {
            flickr_groups_pools_getPhotos_onLoad: function(success, responseXML, responseText, params)
            {
                if(success) 
                {
                     var photoElements = document.evaluate(
                         "//photo[@id='" + unsafeWindow.page_photo_id + "']",
                        responseXML,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);       
        
                    var days = -1;
                    if (photoElements.snapshotLength > 0) 
                    {
                        var el = photoElements.snapshotItem(0);    
                        
                        var dateAdded = el.getAttribute("dateadded");
                        var now = new Date();
                        var seconds = now.getTime()/1000 - (now.getTimezoneOffset() * 60);
                        var difference = (seconds - dateAdded) /(3600 * 24);
                        days = difference;
                    }
                    else
                    {
                        days = -1;
                    }
                    
                    var text = "Unknown time ago";
                    if (days == -1)
                    {
                        text = "Unknown time ago";
                    }
                    else if (days < 1)
                    {
                        text = "Less than a day ago";
                    }
                    else if (days < 2)
                    {
                        text = "" + Math.floor(days) + " day ago";
                    }
                    else
                    {
                        text = "" + Math.floor(days) + " days ago";
                    }
                     
                    var n = document.createElement('span');   
                    //n.setAttribute("class", "Plain");
                    n.appendChild(document.createTextNode(text));
                    utataElement.parentNode.insertBefore(n, utataElement.nextSibling);
                }
            }
        });
    }
}

window.addEventListener("load", 
    function () 
    {
	    if (checkPhotoPage())
        {
            showCount();
        }    
	}, false
);
	


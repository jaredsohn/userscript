/**
 * LiveJournal Comment Expander for Opera 11 Browser
 * Also this script removes the LJ Live bar.
 *
 * Installation:
 * Attach this script to Opera browser.
 *
 * 1. Create new directory for this script. For example: 'c:\Program Files\Opera\JavaScript\livejournal'.
 * 2. Copy this file into the directory.
 *
 * 3. 'Menu' -> 'Settings' -> 'Preferences' -> 'Advanced' -> 'JavaScript Options...'
 *    -> Set 'User JavaScript folder' textbox to a path of the script location directory.
  */

// ==UserScript==
// @name LiveJournal Comment Expander for Opera 11 Browser
// @include http://*.livejournal.com/*
// ==/UserScript==

if (window != window.parent) exit;


var opera = {livejournal : { 

 ljlive : {
    onDocumentLoad : function(event) {
        if(LJLive) {
	    LJLive.getStateCode = function(state) {return ""};
            d.removeEventListener("load", opera.livejournal.ljlive.onDocumentLoad, true);
	}
    }
 },



 expand : {

    onDocumentLoad : function(event) {
        var d = document;
        if (d.getElementById("ljqrtbottomcomment") != null) {
            d.removeEventListener("load", opera.livejournal.expand.onDocumentLoad, true);

            var linkParents = document.evaluate("//div[@class='comment-wrap partial' and starts-with(@id,'ljcmt') and not(./a[2]/text() = 'Expand')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = linkParents.snapshotLength; --i >= 0;) {
                opera.livejournal.expand.attachExpandLink(linkParents.snapshotItem(i));
            }
	}
    },


    attachExpandLink : function(linkParent) {
        var threadHref = document.evaluate("./a[position() = 1]/@href", linkParent, null, XPathResult.STRING_TYPE, null);
        if (threadHref && threadHref.stringValue) {
            threadHref = threadHref.stringValue;

            var expandLink = document.createElement("a");
            expandLink.href = threadHref;
            expandLink.innerHTML = "Expand";
            expandLink.onclick = opera.livejournal.expand.onClickExpand;

            linkParent.appendChild(document.createTextNode(" ("));
            linkParent.appendChild(expandLink);
            linkParent.appendChild(document.createTextNode(")"));

        }
    },


    onClickExpand : function(event) {
        // replace link
        var expandLink = event.target;
        var linkParent = expandLink.parentNode;
        linkParent.removeChild(linkParent.lastChild);
        linkParent.removeChild(linkParent.lastChild);
        linkParent.removeChild(linkParent.lastChild);

        var loadindMessage = opera.livejournal.expand.getLoadingMessage();
        linkParent.appendChild(loadindMessage);

        // send request to load thread
        try {
            var req = new XMLHttpRequest();
            req.open("GET", expandLink.href, true);
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    opera.livejournal.expand.onThreadLoad(req.responseText);
                }
            };
            req.send(null);
        } catch (error) {
            // ignore errors
        }
        return false;
    },


    getLoadingMessage: function () {
        var loadingMessage = document.createElement("span");
        loadingMessage.innerHTML = '&nbsp; <img border=0 style="vertical-align:middle;" src="data:image/gif;base64,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">';
        return loadingMessage;
    },


    onThreadLoad : function(responseText) {
        try {
            //parse response
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            document.body.appendChild(iframe);
            var d = iframe.contentDocument.defaultView.document;
            d.documentElement.innerHTML = responseText;
            var sourceNodes = d.evaluate("//div[starts-with(@class,'comment-wrap') and starts-with(@id,'ljcmt')]", d.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            document.body.removeChild(iframe);

            // copy content
            for (var i = 0; i < sourceNodes.snapshotLength; i++) {
                var sourceNode = sourceNodes.snapshotItem(i);
                var targetNode = document.getElementById(sourceNode.id);
                if (targetNode && targetNode.className.indexOf("comment-wrap") != -1 && targetNode.className.indexOf("partial") != -1) {
                    targetNode.innerHTML = sourceNode.innerHTML;
                    targetNode.className = sourceNode.className;
                    if(sourceNode.className.indexOf("partial") != -1) {
                        opera.livejournal.expand.attachExpandLink(targetNode);
                    }
                }
            }
        } catch (error) {
            // ignore errors
        }
    }

}}};


document.addEventListener("load", opera.livejournal.ljlive.onDocumentLoad, true);
document.addEventListener("load", opera.livejournal.expand.onDocumentLoad, true);

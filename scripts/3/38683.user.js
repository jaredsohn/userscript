// Hide CBC News Comments.
//
// Take a wild guess what this script does.
// Version 0.2
// 2008-11-28
// Copyright Peter McCurdy, November 2008
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Hide CBC News Comments
// @namespace      http://navarra.ca
// @description    Hides the comments section from CBC News stories online
// @include        http://www.cbc.ca/*
// ==/UserScript==
var comments = document.getElementById('socialcomments');
if (comments)
    comments.parentNode.removeChild(comments);

window.setTimeout(
    function() 
    { 
        var ems = document.evaluate(
            "//em[@class='cmt']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

        for (var i = 0; i < ems.snapshotLength; i++) {
            var em = ems.snapshotItem(i);
            var div = em.parentNode;
            if (div.innerHTML == '<em class="cmt">' + em.innerHTML + '</em>Comments have been posted') {
                var newdiv = document.createElement('div');
                newdiv.innerHTML = '<em class="cmt">' + em.innerHTML + '</em>idiots have been suppressed';
                div.parentNode.replaceChild(newdiv, div);
            }
        }
    },
    5000);


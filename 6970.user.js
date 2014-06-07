// ==UserScript==
// @name           Newsvine Collapsable Comments
// @namespace      http://adamkemp.newsvine.com
// @description    Adds collapse links to all comments for easy navigation.
// @include        http://*.newsvine.com/*
// @version        0.8
// ==/UserScript==
// $Id: newsvinecollapsablecomme.user.js,v 1.4 2007/01/07 04:45:24 adam Exp $

(function() {
    function isCommentAuthor(tag)
    {
        return ( tag.getAttribute("class") && tag.getAttribute("class").indexOf("commentauthor") != -1 );
    }

    function getAllComments()
    {
        var tags = document.getElementsByTagName("div");
        var comments = new Array();
        for(var i=0; i < tags.length; i++)
        {
            if(isCommentAuthor(tags.item(i)))
                comments.push(tags.item(i));
        }

        return comments;
    }

    function getCommentId(comment)
    {
        return (comment && comment.parentNode && comment.parentNode.getAttribute("id") && comment.parentNode.getAttribute("id").substring(1) );
    }
    
    function hasCollapseLink(comment)
    {
        return (comment && comment.childNodes && comment.childNodes.length && comment.childNodes.item(1) );
    }

    function addCollapseLink(comment)
    {
        var commentId = getCommentId(comment);
        if( commentId )
        {
            // Create the collapse link
            var collapseSpan = document.createElement("span");
            collapseSpan.setAttribute("style", "position: relative; right: 1em; float: left");

            var collapseLink = document.createElement("a");
            collapseLink.setAttribute("class", "noborder");
            collapseLink.setAttribute("onclick", "collapseComment("+commentId+");");
            collapseLink.setAttribute("href", "javascript:void(0);");
            collapseLink.setAttribute("style", "font-style: normal; font-weight: bold;");
            collapseLink.setAttribute("title", "Collapse/Expand Comment")

            var collapseText = document.createTextNode("+");

            collapseLink.appendChild(collapseText);

            collapseSpan.appendChild(collapseLink);

            comment.insertBefore(collapseSpan, comment.firstChild);

            // Make sure the "display" style is set explicitly to "block" or the collapse function won't work the first time
            var text = document.getElementById('commentText_'+commentId);
            if( text && text.style.display != 'none' )
                text.style.display = 'block';
        }
    }

    function addCollapseToAllComments()
    {
        var comments = getAllComments();
        for( var i=0; i < comments.length; i++ )
        {
            addCollapseLink(comments[i]);
        }
    }

    addCollapseToAllComments();

 }
 )();

 // 0.5.0 - Mostly works, except for comments with stars or "new" markers.
 // 0.6.0 - Works on all comments (I think), and now shows just a simple "+" to the left of the author's name. Doesn't care if the comment already had a collapse link. Adds button to comment form too, which it shouldn't.
 // 0.7.0 - Change the button from the Newsvine-specific + image to just a simple + character. Some code cleanup.
 // 0.8.0 - Only add the collapse link if there's a valid comment id. This prevents it from adding one to the add comment form.

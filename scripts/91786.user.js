// ==UserScript==
// @name Hackaday Recent Comment Fix
// @description Fixes Hackaday's recent comments.
// @include http://hackaday.com/*
// @match http://www.hackaday.com/*
// @match http://hackaday.com/*
// ==/UserScript==

var titleCache = {};

Function.prototype.bind = function( thisObject ) { // This is so we can pass arguments to the onload callback.
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function AddTitleLink(comment, href, link){ // Add a link to which article has been commented on
    var newLink = document.createElement("span");
    newLink.innerHTML="on <a href=\""+href+"\">"+titleCache[href]+"</a>:&nbsp;";
    comment.insertBefore(newLink, link);
}

function TitleCallback(comment, href, link, details){ // Callback for GM_xmlhttpRequest
    var title=details['responseText'].match(/<title>(.+?)\s+?-\s+?Hack a Day\s+?<\/title>/)[1];
    titleCache[href] = title;
    AddTitleLink(comment, href, link);
}

var statsCol = document.getElementById("statscol");
var content  = document.getElementById("content");

if(statsCol){
    // Fill the cache with entries from "Most Commented on"
    var recent = statsCol.childNodes[3];
    if(recent){
        for(var i=1;i<recent.childNodes.length;i++){
            var link = recent.childNodes[i].firstChild;
            if(!link) continue;
            var href = link.getAttribute("href");
            var title = link.innerHTML;
            titleCache[href] = title;
        }
    }

    if(content){ // Attempt to fill the cache with entries from the content of the page
        for(var i=1;i<content.childNodes.length;i++){
            var elem = content.childNodes[i];
            if(elem && elem.getAttribute && elem.getAttribute("class")=="post"){
                var link = elem.childNodes[1].firstChild;
                if(!link) continue;
                var href = link.getAttribute("href");
                var title = link.innerHTML;
                titleCache[href] = title;
            }
        }
    }
    
    // Now, attempt to add links to recent comments
    var comments = statsCol.childNodes[7];
    if(comments){
       for(var i=1;i<comments.childNodes.length;i++){
           var comment = comments.childNodes[i];
           if(comment && comment.firstChild){
               var user    = comment.firstChild.innerHTML;
               var link    = comment.childNodes[2];
               var href    = link.getAttribute("href").split("#")[0];
               var said    = link.innerHTML+="...";
               
               user = user.substring(0, user.length-1);
               comment.firstChild.innerHTML = user;
               if(href in titleCache){
                   AddTitleLink(comment, href, link);
               } else {
                   GM_xmlhttpRequest({"method": "GET", "url": href, 
                                      "onload":TitleCallback.bind({}, comment, href, link)
                                      });
               }
           }
       }
    }
}

// ==UserScript==
// @name           Bugzilla - Descriptive bug link names
// @namespace      http://khopis.com/scripts
// @description    Bug titles added in detail table and to comments
// @include        https://bugzilla.*/*
// @exclude        http://*/votes.cgi*
// @exclude        https://*/votes.cgi*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.3
// @lastupdated    2008-12-04
// ==/UserScript==
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */


GM_addStyle( (""
  + ".bugLink, .refLink { white-space:pre; overflow:hidden; \n"
  + "           display:inline-block; vertical-align:top; text-align:left!; }"
  + 'a.longBug:after { content:"..."; }'
  + "table.details a.bugLink { width:20em; }"
  + ".refLink { position:absolute; right:2em; margin-top:-1.3em; \n"
  + "           text-decoration:underline; }"
  + "span.bz_closed { text-decoration:none; }" // strike is ~1em too low
  + "span.bz_closed > a.bugLink, span.bz_closed div.refLink { color:#77a!; \n"
  + "           text-decoration:line-through underline; }"
  + "#comments a:hover .refLink { color:red!; text-decoration:underline; \n"
  + "           background-color:white; z-index:3; }" // on top of others
  // make closed bugs lose their strike-out when hovered (so you can read them)
  + "span.bz_closed > a.bugLink:hover, .bugLink:hover, \n"
  + "  .refLink:hover, #comments a .refLink:hover { \n"
  + "           text-decoration:underline!; color: #333333!; }"
).replace(/}/g,"}\n").replace(/!;/g,"!important;") );


// returns a class with a .num, .title, .full (null if not a bug link)
function getBug(link) {
  if ( link.title.match(/./)
       && link.href.match(/show_bug.cgi\?id=\d+/)
       && link.innerHTML.match(/^(bug\s#?)?\d+\s?(comment)?[#c 0-9]*$/i) ) {
    var fullTitle = link.title.replace(/^[A-Z ]+ - /,''); // remove status
    var bugNumber = link.innerHTML.replace(/^(bug\s#?)?(\d+)/i,"$2");
    var bugTitle = fullTitle.replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return { num: bugNumber, title: bugTitle, full: fullTitle };
  }
  else return null;
}

// tag details table
var details = document.getElementById("dependson_input_area");
while(details) {
  details = details.parentNode;
  if (details.nodeName == "TABLE") { details.className += " details"; break; }
}

// links inside details table
var links = details.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
  var bug = getBug(links[i]);
  if (bug) {
    links[i].title = bug.num + " - " + links[i].title;
    links[i].innerHTML = bug.title;
    links[i].className += " bugLink";
  }
}

// links inside comments
var commentsDiv = document.getElementById("comments");
var comments = commentsDiv.getElementsByTagName("a");
for (var c=0; c<comments.length; c++) {
  var bug = getBug(comments[c]);
  if (bug) {
    var refLink = document.createElement("div");
    refLink.appendChild(document.createTextNode(bug.title));
    refLink.title = bug.num + " - " + comments[c].title;
    refLink.className = "refLink";
    comments[c].className += "bugLink";
    comments[c].appendChild(refLink);
  }
}

// set refLink width based on available browser width
var refLinkWidth = getComputedStyle(document.body,'').width.match(/\d+/)
                   - getComputedStyle(commentsDiv,'').width.match(/\d+/) - 50;
if (refLinkWidth > 199) {
  GM_addStyle(".refLink { max-width:" + refLinkWidth + "px; }\n");
} else {
  GM_addStyle(".refLink { display:none; }\n");
}

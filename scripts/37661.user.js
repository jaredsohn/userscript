// ==UserScript==
// @name LDD Show Responses 1.7
// @namespace http://www.nsftools.com/tools
// @description Adds a [+] link next to message links on the Lotus developerWorks forum so you can view messages inline instead of having to open a new page for each one.
// @include http://*.lotus.com/ldd*
// @include https://*.lotus.com/ldd*
// ==/UserScript==

/*
This is a Greasemonkey script designed to be used with the forums on the
Notes.net/LDD/Lotus developerWorks site. ( http://www.lotus.com/ldd )

If you have no idea what Greasemonkey is, start here:

Firefox users (the original):
http://greasemonkey.mozdev.org/

IE users (the copy):
http://www.daishar.com/blog/archives/2005/03/greasemonkey_fo.html

I've only tested this script with Firefox, so I have no idea how well it
does or doesn't work with IE.

===========================

The problem with the LDD forums is that you can't see the text of any of the
responses associated with a particular message. You get a list of links to the
responses at the bottom of the page, but you can only open a single message at
a time -- which is a huge pain if there are more than about 2 responses to a
message.

What this script does (thanks to the magic of Greasemonkey) is to add a little
[+] next to each response link at the bottom of the page. If you click on that
[+], it will open a <div> beneath the link that will get populated with the
message body for that particular response. Click it again, and the response
body disappears.

As of version 1.3 of the script, the [+] is added on any LDD page that has an
?OpenDocument link, not just a message. So the script works when you're viewing
a message, or the main view of a forum, or even a list of search results.

If none of this makes sense, just go to: http://www-10.lotus.com/ldd/nd6forum.nsf
and open a message that has several responses, and then try to read the responses
with and without this script enabled.

===========================

A few efficiencies I've added to this script:

1. None of the response messages are retrieved until you actually click the [+].
This means when you view a message that has a large number of responses, your
page will still load quickly (i.e. -- the browser won't be trying to get all
of the responses when the page opens). The text of the responses is only
retrieved when you click the [+].

2. If you click on a [+] to view a response message and then click it again to
make it disappear, it will remember what the message is. So if you click it
again to expand the response message before you refresh the page, you won't
have to make another round trip to the server in order to get the message
again -- it'll just come right up.

3. The responses are retrieved using asynchronous XML HTTP requests, which grab
the response doc, parse the message text, and insert it into a <div> (this
process is normally referred to as "Ajax" these days).

===========================

ISSUES:

1. I had to hardcode several things in here, because the LDD forums don't really
package up the messages in any kind of easily parsable way (say, with divs).
Some or all of this script could break tomorrow if the LDD folks decide to rename
some of their image files.

2. There's probably a much more elegant way of doing some or all of this using
regular expressions. I don't know how that way might work, and I don't really care.
This method seems to work, and it's easy to troubleshoot.

3. There may be a few links on the page that get the [+] appended to them that
get an "Error finding beginning of body" message when you try to expand them (like
the FAQ link). This is because the links don't actually point to messages, but other
pages that don't parse like a message will. I thought about adding some code that
explicitly ignores these kinds of links, but all of the exclusions would just
muddy up the code, and I'd probably have to keep adding new ones. So rather than
try to account for all the exceptions, I'm going to assume that my users are smart
enough not to worry about those sorts of things. (UPDATE: in version 1.4 I added the
ignoreList array to deal with at least some of these cases.)

===========================

HISTORY:

version 1.0 -- April 16, 2005
Initial release.

version 1.1 -- April 16, 2005
Fixed bug where the </table> tag I was using to determine the start of the body
block didn't exist when you were logged in, so you wouldn't get message text
if you were logged in.

version 1.2 -- April 17, 2005
Modified the script to make the display div block style "display: none;" when the
div was hidden, to get rid of the extra whitespace/linefeed that was appearing
between each of the response links.

version 1.3 -- April 19, 2005
Changed the script to run against any ?OpenDocument link, not just the response
links that were found at the bottom of a message. This way it will work not only
on message pages, but also on views and search results. Unfortunately, this also
puts a [+] next to some links that won't expand properly (like the forum FAQ links
at the right of the page). I thought about filtering those links out manually,
but it's probably better to have a few links that don't work right rather than
hardcoding several exceptions in this code (there's too much hardcoding as it is).

Also made a small change to account for a different separator graphic on the
ND7 forums, and made the [+] change to [-] when it's "expanded".

version 1.4 -- May 10, 2005
Added the ignoreList array (and relevant ignoreList processing), so we won't
process links that we know will not work. Thanks to Christopher Byrne
(http://controlscaddy.com) for the suggestion and an example of what to ignore.

version 1.5 -- August 14, 2005
Added the endOfBody array (and relevant processing) to account for multiple
possible endings of the body part of the forum message. The forums were slightly
redesigned in late July/early August, and they started using a different graphic
at the end of the body. With the new array, it'll be easier to add new end-of-body
conditions in the future.

version 1.6 -- December 3, 2005
LDDMonkey stopped working when Firefox got upgraded to 1.5. Kurt Higley
(http://www.higs.net) fixed it within a day! His changes included:

* expander.onclick = ... changed to expander.addEventListener('click', ...)
* calls to XMLHttpRequest changed to GM_xmlhttpRequest
* restructure getResponseText() function to split it out a little better

I made a few changes to the URL processing, but otherwise included the changes
as-is. Thanks Kurt!

I also added "https://*.lotus.com/ldd*" to the @include list for when you're
logged in to the forum, and made it possible for the script to try to reload
a response message if an earlier attempt never returned anything (which seems
to happen at times).

Tested with Firefox 1.0.7/Greasemonkey 0.5.1 and Firefox 1.5/Greasemonkey 0.6.4

===========================

This is version 1.6 of the lddresponse.user.js script
by Julian Robichaux ( http://www.nsftools.com )
December 3, 2005

You can do anything you'd like with this script, just don't hold me liable for
anything, and don't pretend like you wrote it yourself.

The latest release should always be available at the OpenNTF site, at:
http://www.OpenNTF.org/projects/pmt.nsf/ProjectLookup/LDDMonkey

*/

function addExpanders() {
// the main chunk of code here just steps through all the images on the
// page, and for all the "?OpenDocument" links it finds, it modifies
// them to add our little clickable [+] span

// ignore tags that contain these strings
var ignoreList = new Array ("site.nsf", "forumfaqs", "&login");

var links = document.getElementsByTagName("a");

for (i = 0; i < links.length; i++) {
var node = links[i];
var tag = node.getAttribute("href");

// if the tag is empty, keep on going
if (!tag)
continue;

// if the tag matches any of the elements in our ignore list, just clear
// it out so it won't be processed
for (j = 0; j < ignoreList.length; j++) {
// we could use a regular expression comparison here instead, if we want
// to match more sophisticated patterns
if (tag.toLowerCase().indexOf(ignoreList[j].toLowerCase()) >= 0)
tag = "";
}

// if the tag makes an ?OpenDocument call, process it
if (tag.toLowerCase().indexOf("?opendocument") > 0) {
var idt = tag.substring(tag.lastIndexOf('/') + 1,tag.length);
// first, add something the user can click to get the response
var expander = document.getElementById('exp_' + idt);
if (!expander) {
expander = document.createElement("span");
expander.innerHTML = "[+]";
expander.style.cursor = "pointer";
expander.id = "exp_" + idt;
expander.style.backgroundColor = "ffffcc";
expander.style.background = "rgb(255,255,204)";
expander.style.margin = "0px 5px 0px 3px";
expander.setAttribute("tag", tag);
expander.addEventListener('click', doExpander, true);

// the node before a response link will be of the format "...."
// we're going to try to count the periods to decide how much
// we want to left-indent the div that follows
var indent = 20;
if (node.previousSibling) {
var pees = node.previousSibling.nodeValue;
if (pees) indent = (pees.split(".").length * 5) + 20;
}

if (indent > 20)
node.parentNode.insertBefore(expander, node.previousSibling);
else
node.parentNode.insertBefore(expander, node);

// create a div that will hold the response contents
var div = document.createElement("div");
div.setAttribute("id", tag);
div.style.display = "none";
div.style.backgroundColor = "#eeeeee";
div.style.border = "1px solid #777777";
div.style.padding = "5px";
div.style.margin = "5px";
div.style.marginLeft = indent + "px";
div.style.visibility = "hidden";

// if there's a <br> tag nearby, try to put the div after that
var sib = node;
for (j = 0; j < 4; j++) {
sib = sib.nextSibling;
if ((sib == null) || (sib.previousSibling.tagName == "BR"))
break;
}
node.parentNode.insertBefore(div, sib);

// skip the double <a> tags in some of the main views
if ((node.nextSibling) && (node.nextSibling.tagName == "A"))
i++;
}
}
} // end for loop
}

function doExpander (event) {
// this is the function that is called when the user clicks one of the [+]
// spans that we've added. Clicking that will toggle the div that contains
// the response message text. If we haven't retrieved the response message
// yet, we'll try to get it after we display the div.
var tag = this.getAttribute("tag");
var div = document.getElementById(tag);

// if we're already showing the div, just hide it and return
if (div.style.visibility == "visible") {
div.style.display = "none";
div.style.height = 0;
div.style.visibility = "hidden";
this.innerHTML = "[+]";
return;
}

// show the div and grab the response message if we haven't already
div.style.visibility = "visible";
div.style.display = "block";
div.style.height = "";
this.innerHTML = "[--]";

var GETTING_MESSAGE = "getting message...";
if ((!div.innerHTML) || (div.innerHTML == GETTING_MESSAGE)) {
div.innerHTML = GETTING_MESSAGE;
getResponseText(div, tag);
}
event.preventDefault();
}


function getResponseText (div, tag) {
var host = window.location.protocol + "//" + window.location.host;
var path = window.location.pathname;
var relpath = host + path.substring(0, path.lastIndexOf("/")) + "/";
var url = tag;

if (tag.indexOf("://") > 0) {
// nothing to change; the link points to a full URL
} else if (tag.indexOf("/") == 0) {
// relative link, from hostname
url = host + tag;
} else {
// relative link, from current page path
url = relpath + tag;
}


GM_xmlhttpRequest({
method: 'GET',
url: url,
headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/atom+xml,application/xml,text/xml',
},
onload: function(responseDetails) {
getXMLText(responseDetails,div);
}
});
}


function getXMLText(responseDetails,div) {

var resp = responseDetails.responseText;
var bodyText = "";
var threadText = "";
/*
// we pretty much want everything from <img src=".../next.gif...">
// to </div> (not even sure why that </div> is there, but it
// seems consistent, and we don't really want any extra </div>
// tags mucking up the works anyway)
*/
var pos = resp.indexOf("/next.gif");

if (pos > 0) {
// there's a </table> tag shortly after the next.gif graphic.
// we'll start there (version 1.1 fix: it turns out that when
// you're logged in, the </table> tag isn't there...)
tpos = resp.indexOf("</table>", pos);
brpos = resp.indexOf("<br>", pos);
if ((tpos > 0) && (brpos > 0))
pos = (tpos > brpos) ? brpos : tpos + 8;
else
pos = (tpos > brpos) ? tpos + 8 : brpos;
} else {
pos = resp.lastIndexOf('<label for "Subject"></label>');
}
if (pos > 0) {
// Thread info obviously starts after the body begins.
threadText = resp.substring(pos, resp.length);
// Thread info begins with this label, logged in or not.
var threadpos = threadText.indexOf('<label for "ThreadMapDisplay"></label>');
if (threadpos == -1) {
threadText ="";
} else {
threadText = threadText.substring(threadpos,threadText.length);
threadpos = threadText.indexOf('</div>');
//Thread info has an unclosed <font size="1"> !!
threadText = threadText.substring(0,threadpos) + "</font>";
var tmp = window.location.toString();
if (tmp.indexOf('?') >=0 ) {
tmp = tmp.substring(0,tmp.indexOf('?'))
} else {
tmp += "/0";
}
threadText = threadText.replace(/<a href="([^"]*)"[^>]*>/g, "<a href=\"" + tmp + "/$1\">")
}

// we pretty much want everything from <img src=".../next.gif...">
// to </div> (not even sure why that </div> is there, but it
// seems consistent, and we don't really want any extra </div>
// tags mucking up the works anyway)
// possible things that serve as end-of-body dividers
var endOfBody = new Array (
"blue_rule.gif" /* separator graphic between body and response links */,
"gray_rule.gif" /* alternate separator graphic between body and response links */,
"thread-divider.gif" /* ND7 Beta forum separator */
);

// try to find one of the things in the endOfBody list
var pos2 = -1;
for (j = 0; j < endOfBody.length; j++) {
pos2 = resp.indexOf(endOfBody[j], pos);
if (pos2 >= 0)
break;
}

// if there is no divider, just find the last "blank" graphic
if (pos2 < 0)
pos2 = resp.lastIndexOf("10x10.gif");

if (pos2 > 0) {
bodyText = resp.substring(pos, pos2);

// if there's a </div> at the end of our parsed message,
// we really want to end there instead
if (bodyText.indexOf("</div>") > 0)
bodyText = bodyText.substring(0, bodyText.lastIndexOf("</div>"));
else
bodyText = bodyText.substring(0, bodyText.lastIndexOf("<"));
} else {
alert("1: " + bodyText);
bodyText = "Error finding end of message body";
}
} else {
//alert("2: " + bodyText);
bodyText = "Error finding beginning of body";
}
bodyText = bodyText.replace(/<img\b(.*?)10x10.gif[^>]*>/g,"") + threadText;
div.innerHTML = bodyText;
addExpanders();
}

addExpanders();
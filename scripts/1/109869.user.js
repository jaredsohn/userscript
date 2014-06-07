// ==UserScript==
// @name           Super Reddit Alt-Text Display
// @namespace      reddit_alt_text
// @description    Displays any alt-text from faces in the comments, eliminating the need to mouse over.
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @version        2.5.1
// @updateURL      https://userscripts.org/scripts/source/109869.meta.js
// ==/UserScript==

// This is not a "real" url regex, it just looks for url like things and hopes
var linkRegex = new RegExp("\\b(?:(http(?:s?)\://)|(?:www\\d{0,3}[.])|(?:[a-z0-9.\-]+[.][a-z]{2,4}/))(?:\\S*)\\b", "i")
var inlineEmoteRegex = new RegExp("-inp?(?:-|$)")

function inBlacklist(theLink) {
    if (theLink.href.substr(-2,2) == "/b") { // Don't expand the spoiler tags from r/gameofthrones
        return true;
    }
    if (theLink.href.substr(-8,8) == "/spoiler") { // Don't expand alt-text on spoiler tags from r/mylittlepony
        return true;
    }
    return false;
}

function addStyle(newStyle) {
    var head = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('style')
    cssNode.type = 'text/css'
    cssNode.appendChild(document.createTextNode(newStyle))
    head.appendChild(cssNode)
}

altTextStyle = ".SuperRedditAltTextDisplay_Text {color: gray; word-wrap: break-word}\n" +
".SuperRedditAltTextDisplay_Inline {display: inline-block;}\n" +
".SuperRedditAltTextDisplay_Text a {color: gray; text-decoration:underline}\n"

addStyle(altTextStyle)

function expandEmotes(postDiv) {
    // Convert the live result of getElementsByTagName to a static array because
    // we don't want to see the links we add to the div.
    var innerLinks = Array.prototype.slice.call(postDiv.getElementsByTagName("a"));
    
    for (var j in innerLinks) {
        if (innerLinks[j].title && innerLinks[j].title != " " && !inBlacklist(innerLinks[j])
            && innerLinks[j].className.indexOf("emoteTextExpanded") == -1) {
            // If a link has alt-text copy it to a div next to the link
            var altText = innerLinks[j].title
            var theDiv = document.createElement("div")
            theDiv.setAttribute("class", "SuperRedditAltTextDisplay_Text")
            
            if (inlineEmoteRegex.exec(innerLinks[j].href)) {
                theDiv.setAttribute("class", "SuperRedditAltTextDisplay_Text SuperRedditAltTextDisplay_Inline")
            }
            else {
                theDiv.setAttribute("class", "SuperRedditAltTextDisplay_Text")
            }
            
            // Hunt for links in the text
            while (altText) {
                linkResult = linkRegex.exec(altText)
                if (linkResult) {
                    // Copy pre-link text
                    theDiv.appendChild(document.createTextNode(altText.substr(0,linkResult.index)))
                    
                    // Add the link
                    var newLinkElement = document.createElement("a")
                    if ( linkResult[1] ) {
                        newLinkElement.href = linkResult[0]
                    }
                    else {
                        newLinkElement.href = "http://" + linkResult[0]
                    }
                    newLinkElement.appendChild(document.createTextNode(linkResult[0]))
                    theDiv.appendChild(newLinkElement)
                    
                    // Chop off the used text and continue
                    altText = altText.substr(linkResult.index + linkResult[0].length)
                }
                else {
                    theDiv.appendChild(document.createTextNode(altText))
                    altText = ""
                }
            }
            
            var linkNextSibling = innerLinks[j].nextSibling
            
            if (innerLinks[j].className.indexOf("imgFound") != -1) {
                // Inserting the div after a link will confuse the RES image expander, so if RES ran
                // before us insert our div after the expand button.
                linkNextSibling = linkNextSibling.nextSibling
            }
            
            if (innerLinks[j].className.indexOf("hiddenEmoteExpanded") != -1) {
                // Our hidden emote script ran before us, so skip over the span it added after the link
                linkNextSibling = linkNextSibling.nextSibling
            }
            
            if (innerLinks[j].className.indexOf("youtubeLinkFound") != -1) {
                // Our youtube script ran before us, so skip over the div it added after the link
                linkNextSibling = linkNextSibling.nextSibling
            }
            
            innerLinks[j].parentNode.insertBefore(theDiv, linkNextSibling)
            innerLinks[j].className += " emoteTextExpanded"
        }
    }
}

function expandChildMDs(elm) {
    // Find all user created content sections and expand emotes in them
    var mdElements = elm.getElementsByClassName("md")
    for (var i in mdElements) {
        if (mdElements[i].tagName == 'DIV') {
            expandEmotes(mdElements[i]);
        }
    }
}

// hasClass, stolen from the Reddit Enhancement Suite
function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// Add a listener for the DOMNodeInserted event so we can expand emotes in new comments
// created by either a reply or by clicking "load more comments" in large threads.
function handleInsertion( event ) {
    if ((event.target.tagName == 'DIV') && (hasClass(event.target, "thing"))) {
        // Insertion event for "load more comments" & new replies
        // The actual even we see will be the insertion of the outer "thing" div
        //GM_log("Scanning DIV.thing")
        expandChildMDs(event.target)
    }
    else if ((event.target.tagName == 'FORM') && (hasClass(event.target, "usertext"))) {
        // Insertion event for text expando blocks
        //GM_log("Scanning FORM.usertext")
        expandChildMDs(event.target)
    }
    /*
    else {
        GM_log("Other insertion: " + event.target.tagName + " : " + event.target.className)
    }
     */
}

// Add a listener for the DOMNodeInserted event so we can expand emotes on the RES dashboard
// This gets it's own listener because watching sitetable causes unnecessary rescans on normal submission pages.
function handleSitetableInsertion( event ) {
    if ((event.target.tagName == 'DIV') && (hasClass(event.target, "sitetable")) && (hasClass(event.target, "linklisting"))) {
        // Insertion event for RES dashboard widgets
        // Note: This causes rescans on some other pages too
        //GM_log("Scanning DIV.sitetable.linklisting")
        expandChildMDs(event.target)
    }
    else if ((event.target.tagName == 'DIV') && (hasClass(event.target, "parent"))) {
        // Insertion event fow "show parent" on the RES dashboard
        //GM_log("Scanning DIV.parent")
        expandChildMDs(event.target)
    }
}

// Initial expansion of static content
expandChildMDs(document)

document.body.addEventListener('DOMNodeInserted', handleInsertion, false);

if (RegExp("^https?://(?:www.)?reddit.com/r/dashboard", "i").exec(window.location)) {
    // Add the listener for sitetable if we're on the RES dashboard
    document.body.addEventListener('DOMNodeInserted', handleSitetableInsertion, false);
}
else if (RegExp("^https?://(?:www.)?reddit.com/user/", "i").exec(window.location) && document.getElementsByClassName("neverEndingReddit")) {
    // Add this listener for RES never ending reddit on user pages
    document.body.addEventListener('DOMNodeInserted', handleSitetableInsertion, false);
}
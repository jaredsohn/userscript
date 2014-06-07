// ==UserScript==
// @name           Reddit Show Hidden Emotes
// @namespace      reddit_show_hidden_emotes
// @description    Show empty emotes (links with no text or image)
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @version        1.4.2
// @updateURL      https://userscripts.org/scripts/source/117720.meta.js
// @grant          none
// ==/UserScript==

whitespaceRegex = new RegExp("^[\\s]*$")
redditTrimRegex = new RegExp("^http://(.*)\.reddit\.com")
spaceEmoteRegex = new RegExp("^http://(.*)\.reddit\.com/sp$")
minecraftRegex  = new RegExp("^http://(.*)\.reddit\.com/r/minecraft#")
// This regex is needed because Chrome returns "" for pseudo elements rather than "none"
noneOrBlank     = new RegExp("^(?:none)?$")

function addStyle(newStyle) {
    var head = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('style')
    cssNode.type = 'text/css'
    cssNode.appendChild(document.createTextNode(newStyle))
    head.appendChild(cssNode)
}

emoteStyle = ".reddit_show_hidden_emotes_span {\n" +
"color: gray; word-wrap: break-word; background-color: white; " + 
"border-color: gray; border-style: solid; border-width: 1px; border-radius: 5px; " +
"padding-left: 4px; padding-right: 4px; " +
"display: block; clear: none; float: left; " +
"cursor: pointer; " +
"}\n"

addStyle(emoteStyle)

function expandEmotes(postDiv) {
    var innerLinks = Array.prototype.slice.call(postDiv.getElementsByTagName("a"));
    for (var j in innerLinks) {
        if (innerLinks[j].innerHTML.match(whitespaceRegex) ) {
            // No link text
            
            // The ":after" query is needed here because the F7U12 CSS is freaky
            if (
                (window.getComputedStyle(innerLinks[j]).getPropertyValue('background-image') == "none") &&
                (window.getComputedStyle(innerLinks[j], ':after').getPropertyValue('background-image').match(noneOrBlank) != null) &&
                (innerLinks[j].className.indexOf("hiddenEmoteExpanded") == -1) &&
                (innerLinks[j].href.match(spaceEmoteRegex) == null) && // Don't expand the r/mlp space pseudo-emote
                (innerLinks[j].href.match(minecraftRegex) == null) // r/minecraft funk
                ) {
                // No emote image
                var theDiv = document.createElement("span")
                theDiv.setAttribute("title", innerLinks[j].title)
                theDiv.setAttribute("class", "reddit_show_hidden_emotes_span")
                linkText = unescape(innerLinks[j].href.replace(redditTrimRegex, ""))
                theDiv.appendChild(document.createTextNode(linkText))
                innerLinks[j].parentNode.insertBefore(theDiv, innerLinks[j].nextSibling)
                
                // Add a class to the link so Super Reddit Alt-Text Display can put it's text in the right spot
                innerLinks[j].className = innerLinks[j].className + " hiddenEmoteExpanded"
            }
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
    // The actual even we see will be the insertion of the outer "thing" div
    if ((event.target.tagName == 'DIV') && (hasClass(event.target, "thing"))) {
        var mdElements = event.target.getElementsByClassName("md")
        for (var i in mdElements) {
            if (mdElements[i].tagName == 'DIV') {
                expandEmotes(mdElements[i]);
            }
        }
    }
    else if ((event.target.tagName == 'FORM') && (hasClass(event.target, "usertext"))) {
        var mdElements = event.target.getElementsByClassName("md")
        for (var i in mdElements) {
            if (mdElements[i].tagName == 'DIV') {
                expandEmotes(mdElements[i]);
            }
        }
    }
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

// Interacting with the other emote adding scripts causes timing issues, so instead trying to
// sync with them we just wait a good long time then remove our expansions from things they've styled.
function cleanupRestyledEmotes() {
    var emoteExpandElements = Array.prototype.slice.call(document.getElementsByClassName("hiddenEmoteExpanded"))
    for (var i in emoteExpandElements) {
        if (
            (window.getComputedStyle(emoteExpandElements[i]).getPropertyValue('background-image') != "none") || 
            (window.getComputedStyle(emoteExpandElements[i], ':after').getPropertyValue('background-image').match(noneOrBlank) == null)
            ) {
            var nes = emoteExpandElements[i].nextElementSibling
            while(nes) {
                if (nes.className.indexOf("reddit_show_hidden_emotes_span") != -1) {
                    nes.parentNode.removeChild(nes)
                    nes = null
                }
                else {
                    nes = nes.nextElementSibling
                }
            }
        }
    }
}

window.setTimeout(cleanupRestyledEmotes,2000)

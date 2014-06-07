// ==UserScript==
// @name        Auto-Add A Comment When Closing
// @description Automatically adds a comment with details of the close reason, so that the OP can see why their question may be being downvoted, and improve it, before it is closed (disabled for Duplicate, Off-topic > Migrate, and Off-topic > Other)
// @namespace   http://stackoverflow.com/users/1563422/danny-beckett
// @version     1.4
// @grant
// @match       http://*.askubuntu.com/questions/*
// @match       http://*.mathoverflow.net/questions/*
// @match       http://*.onstartups.com/questions/*
// @match       http://*.serverfault.com/questions/*
// @match       http://*.stackapps.com/questions/*
// @match       http://*.stackexchange.com/questions/*
// @match       http://*.stackoverflow.com/questions/*
// @match       http://*.superuser.com/questions/*
// ==/UserScript==

// Hijacks all AJAX requests, and adds stateChanged() to the close popup
XMLHttpRequest.prototype.originalOpen = XMLHttpRequest.prototype.open;
function hijackAJAX(method, url, async, username, password)
{
    if(url.indexOf("/close/popup") > 0)
		this.addEventListener("readystatechange", function(){ stateChanged(this); });
    this.originalOpen(method, url, async, username, password);
}
XMLHttpRequest.prototype.open = hijackAJAX;

// Receives an XHR's state changes, and runs popupLoaded() when the popup is open
function stateChanged(XHR)
{
    if(XHR.readyState === 4 && XHR.status === 200)
    	setTimeout(popupLoaded, 1);
}

// Adds a submit listener to the close popup
function popupLoaded()
{
    var popup = document.getElementById('close-question-form');
    popup.addEventListener("submit", function(){ getText(popup); });
}

// On submit, receives a popup and gets the text for the close reason chosen
function getText(popup)
{
    var text, reasons;
    var reason = popup.elements["close-reason"].value;
    
    // Skip duplicates
    if(reason === "Duplicate")
        return;
    
    else if(reason === "OffTopic")
    {
        reason = popup.elements["close-as-off-topic-reason"].value;
        reasons = document.getElementsByName("close-as-off-topic-reason");
        for(var i = 0; i < reasons.length; i++)
        {
	    	if(reasons[i].value === reason)
            {
                // Skip migrations & other
                if(reasons[i].getAttribute("data-subpane-name") === "migration" || typeof reasons[i].parentNode.parentNode.getElementsByClassName("off-topic-other-comment-container")[0] !== "undefined")
                    return;
                
	    		text = reasons[i].parentNode.getElementsByClassName("action-name")[0].innerHTML;
            }
        }
    }
    
    else
    {
        reasons = document.getElementsByName("close-reason");
        for(var i = 0; i < reasons.length; i++)
            if(reasons[i].value === reason)
                text = reasons[i].parentNode.getElementsByClassName("action-desc")[0].innerHTML;
    }
    
    addComment(text);
}

// Receieves the close reason text, formats it in Markdown, and adds it to a new comment
function addComment(text)
{
    text = text.replace(/<span(.*)<\/span>/gim, "");								// Remove [2] counter, showing how many other users voted on this reason
    text = text.trim();																// Trim whitespace, newlines and tabs
    text = text.replace(/<b>|<\/b>/gim, "**");										// Bold
    text = text.replace(/<i>|<\/i>/gim, "*");										// Italics
    text = text.replace(/<a href="(.*?)"( target=".*?"){0,}( rel=".*?"){0,}>(.*?)<\/a>/gim, "[$4]($1)");	// Links (strip rel and target attrs if present)
    
    document.getElementsByClassName("comments-link")[0].click();
    document.getElementsByName("comment")[0].innerText = text;
    setTimeout(submitComment, 250);
}

// After a short delay, submits the comment
function submitComment()
{
    document.getElementsByName("comment")[0].parentNode.parentNode.getElementsByTagName("input")[0].click();
}
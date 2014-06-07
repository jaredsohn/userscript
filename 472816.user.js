// ==UserScript==
// @name       Comic Rocket Keyboard Navigator
// @namespace  http://torbenbrumm.de/
// @version    1.1.2
// @description  Allows navigation in comics  of Comic Rocket (http://www.comic-rocket.com) using keys no matter which frame is currently selected. Default keys are: RIGHT: Next page, LEFT: Previous page, SHIFT + LEFT: First page, SHIFT + RIGHT: Last page, CTRL + ALT + M: Jump to mark, CTRL + ALT + SHIFT + M: Mark current page, CTRL + ALT + J: Jump to page, CTRL + ALT + SHIFT + J: Jump to page and mark it, CTRL + ALT + HOME: My comics.
// @match      http://*/*
// @match      https://www.comic-rocket.com/*
// @copyright  2014, Torben Brumm
// ==/UserScript==

/*
 * Definition of key codes.
 * 
 * Key codes are normal JavaScript key codes. Add the following numbers to indicate pressed modifiers (also combineable):
 * SHIFT: 1000
 * CTRL: 2000
 * ALT: 4000
 * 
 * For this script to work correctly, it is necessary to also have the key codes without modifiers.
 * */
var FORWARD = 39; // right
var BACK = 37; // left
var FIRST = 1037; // SHIFT + left
var LAST = 1039; // SHIFT + right
var JUMP_TO_MARK = 6077; // CTRL + ALT + M
var MARK_CURRENT_PAGE = 7077; // CTRL + ALT + SHIFT + M
var JUMP_TO_PAGE = 6074; // CTRL + ALT + J
var JUMP_TO_PAGE_MARK = 7074; // CTRL + ALT + SHIFT + J
var MY_COMICS = 6036; // CTRL + ALT + HOME
var FORWARD_WITHOUT_MODIFIERS = 39;
var BACK_WITHOUT_MODIFIERS = 37;
var FIRST_WITHOUT_MODIFIERS = 37;
var LAST_WITHOUT_MODIFIERS = 39;
var JUMP_TO_MARK_WITHOUT_MODIFIERS = 77;
var MARK_CURRENT_PAGE_WITHOUT_MODIFIERS = 77;
var JUMP_TO_PAGE_WITHOUT_MODIFIERS = 74;
var JUMP_TO_PAGE_MARK_WITHOUT_MODIFIERS = 74;
var MY_COMICS_WITHOUT_MODIFIERS = 36; 

/*
 * Other constants
 * */
var CONTAINER_DOMAIN = "http://www.comic-rocket.com";
var CONTAINER_URLPREFIX = CONTAINER_DOMAIN + "/read/";
var NAVIGATIONBAR_DOMAIN = "https://www.comic-rocket.com";
var NAVIGATIONBAR_URLPREFIX = NAVIGATIONBAR_DOMAIN + "/navbar/";
var NAVIGATIONBAR_IFRAME_CSS_SELECTOR = "#readernav";
var MESSAGE_PREFIX = "Comic Rocket navigation key press: ";
var LINK_TITLE_FORWARD = "Next page";
var LINK_TITLE_BACK = "Previous page";
var LINK_TITLE_FIRST = "First page";
var LINK_TITLE_LAST = "Last page";
var LINK_TITLE_JUMP_TO_MARK = "Jump to mark"
var LINK_URL_MARK_CURRENT_PAGE = "?mark"
var LINK_URL_MY_COMICS = "/"
var KEYCODEMODIFIER_SHIFT = 1000;
var KEYCODEMODIFIER_CTRL = 2000;
var KEYCODEMODIFIER_ALT = 4000;
var TITLE = "title";
var HREF = "href";

/*
 * State variables for modifiers.
 * */
var isShiftKeyPressed = false;
var isCtrlKeyPressed = false;
var isAltKeyPressed = false;

/*
 * Registration of listeners for windows
 * */
if (window.top === window.self) {
    // container needs to forward messages
    if (location.href.substring(0, CONTAINER_URLPREFIX.length) == CONTAINER_URLPREFIX) {
        window.addEventListener ("message", receiveMessageFromFrame, false);
    }
    // we do not care about other top level pages because these are different web pages
    
} else {
    
    // frames need to monitor key presses
    // TODO: add a check if top page really is Comic Rocket to keep this script from doing stuff at other pages. Don't know how to do it because of SOP
	document.addEventListener('keyup', keyUpInIframe, false);
	document.addEventListener('keydown', keyDownInIframe, false);
    
    // navigation bar needs to handle key presses from other frames
    if (location.href.substring(0, NAVIGATIONBAR_URLPREFIX.length) == NAVIGATIONBAR_URLPREFIX) {
    	window.addEventListener ("message", receiveMessageFromContainer, false);
    }
}

/*
 * Handles key presses in iframes by forwarding the correct key presses to the navigation bar. Also handles monitoring of modifier keys (SHIFT, CTRL, ALT).
 * */
function keyUpInIframe(e) {
    switch (e.keyCode) {
        case 16:
            isShiftKeyPressed = false;
            break;
        case 17:
            isCtrlKeyPressed = false;
            break;
        case 18:
            isAltKeyPressed = false;
            break;
        case FORWARD_WITHOUT_MODIFIERS:
        case BACK_WITHOUT_MODIFIERS:
        case FIRST_WITHOUT_MODIFIERS:
        case LAST_WITHOUT_MODIFIERS:
        case JUMP_TO_MARK_WITHOUT_MODIFIERS:
        case MARK_CURRENT_PAGE_WITHOUT_MODIFIERS:
        case JUMP_TO_PAGE_WITHOUT_MODIFIERS:
        case JUMP_TO_PAGE_MARK_WITHOUT_MODIFIERS:
        case MY_COMICS_WITHOUT_MODIFIERS:
            var pressedModifiers = getSumOfPressedModifiers();
            forwardKeyPressToNavBar(e.keyCode + pressedModifiers);
            break;
        default:
            break;
    }
}

/*
 * Monitors modifier keys (SHIFT, CTRL, ALT) for being pressed. 
 * */
function keyDownInIframe(e) {
    switch (e.keyCode) {
        case 16:
            isShiftKeyPressed = true;
            break;
        case 17:
            isCtrlKeyPressed = true;
            break;
        case 18:
            isAltKeyPressed = true;
            break;
        default:
            break;
    }
}

/*
 * Calculates key code modification from pressed modifiers.
 * */
function getSumOfPressedModifiers() {
	var returnValue = 0;
    if (isShiftKeyPressed) {
        returnValue += KEYCODEMODIFIER_SHIFT;
    }
    if (isCtrlKeyPressed) {
        returnValue += KEYCODEMODIFIER_CTRL;
    }
    if (isAltKeyPressed) {
        returnValue += KEYCODEMODIFIER_ALT;
    }
    return returnValue;
}    

/*
 * Forwards a key press to the navigation bar. If we are already in the navigation bar, the key press is handled.
 * */
function forwardKeyPressToNavBar(keyCode) {
    if (location.href.substring(0, NAVIGATIONBAR_URLPREFIX.length) == NAVIGATIONBAR_URLPREFIX) {
        handleKeyPressInNavBar(keyCode);
    } else {
        sendMessageFromAnIframe (
            MESSAGE_PREFIX + keyCode, CONTAINER_DOMAIN
        );
    }
}

/*
 * Handles a key press in the navigation bar by calling the corresponding actions.
 * */
function handleKeyPressInNavBar(keyCode) {
    switch (keyCode) {
        case FORWARD:
            followLinkIdentifiedByAttribute(TITLE, LINK_TITLE_FORWARD);
            break;
        case BACK:
            followLinkIdentifiedByAttribute(TITLE, LINK_TITLE_BACK);
            break;
        case FIRST:
            followLinkIdentifiedByAttribute(TITLE, LINK_TITLE_FIRST);
            break;
        case LAST:
            followLinkIdentifiedByAttribute(TITLE, LINK_TITLE_LAST);
            break;
        case JUMP_TO_MARK:
            followLinkIdentifiedByAttribute(TITLE, LINK_TITLE_JUMP_TO_MARK);
            break;
        case MARK_CURRENT_PAGE:
            followLinkIdentifiedByAttribute(HREF, LINK_URL_MARK_CURRENT_PAGE);
            break;
        case JUMP_TO_PAGE:
            jumpToPageInteractive(false);
            break;
        case JUMP_TO_PAGE_MARK:
            jumpToPageInteractive(true);
            break;
        case MY_COMICS:
            followLinkIdentifiedByAttribute(HREF, LINK_URL_MY_COMICS);
            break;
        default:
            break;
    }
}

/*
 * Jumps to the page that the user enters into a popup. Mark will be set if passed as parameter.
 * */
function jumpToPageInteractive(setMark) {
	var pageNumber = getPageNumberFromUser(setMark);
    if (isValidPageNumber(pageNumber)) {
    	var nextPageURL = getLinkURLIdentifiedByAttribute(TITLE, LINK_TITLE_FORWARD);
        var urlWithoutPageNumber = nextPageURL.substring(0, nextPageURL.lastIndexOf('/')) + '/';
        var urlWithPageNumber = urlWithoutPageNumber + pageNumber;
        if (setMark) {
            urlWithPageNumber += '?mark';
        }
        top.location.href = urlWithPageNumber;
    }
}

/*
 * Queries the user for a page number.
 * */
function getPageNumberFromUser(setMark) {
    var textToDisplay = 'Page to jump to (mark will ';
    if (!setMark) {
        textToDisplay += 'NOT ';
    }
    textToDisplay += 'be set):';
    var pageNumberAsString = prompt(textToDisplay);
    if (pageNumberAsString != null) {
        return parseInt(pageNumberAsString)
    }
    return null;
}

/*
 * Checks if the given page number is in the valid range of the current comic.
 * */
function isValidPageNumber(pageNumber) {
    if (pageNumber != null) {
        if (pageNumber > 0 && pageNumber <= getMaxPageNumber()) {
            return true;
        }
    }
    return false;
}
            
/*
 * Returns the maximum page number the current comic has.
 * */
function getMaxPageNumber() {
    var lastPageLink = getLinkIdentifiedByAttribute(TITLE, LINK_TITLE_LAST);
    if (lastPageLink != null && lastPageLink.text != null) {
        return parseInt(lastPageLink.text.replace(/,/g, ''));
    }
	return 0;
}            

/*
 * Follows a link in the current frame that is identified by the given attribute.
 * */
function followLinkIdentifiedByAttribute(key, value) {
    var link = getLinkIdentifiedByAttribute(key, value);
    if (link != null) {
        link.click();
    }
}

/*
 * Returns the target URL of a link in the current frame that is identified by the given attribute.
 * */
function getLinkURLIdentifiedByAttribute(key, value) {
	var link = getLinkIdentifiedByAttribute(key, value);
    if (link != null) {
        return link.getAttribute('href');
    }
    return null;
}

/*
 * Returns the link object in the current frame that is identified by the given attribute.
 * */
function getLinkIdentifiedByAttribute(key, value) {
	var allLinks = document.body.getElementsByTagName("a");
	for (var i = 0; i < allLinks.length; i++) {
        var attribute = allLinks[i].getAttribute(key)
  		if(attribute != null && attribute.substring(0, value.length) == value){  
   			return allLinks[i];
		}
	}
    return null;
}
/*
 * Receives a message from a frame. Keypresses are forwarded to the navigation bar.
 * */
function receiveMessageFromFrame (event) {
    if (event.data.substring(0, MESSAGE_PREFIX.length) == MESSAGE_PREFIX) {
        sendMessageToAnIframe (
            NAVIGATIONBAR_IFRAME_CSS_SELECTOR,
            event.data,
            NAVIGATIONBAR_DOMAIN
        );
    }
}

/*
 * Receives a message from the top container inside of the navigation bar. Keypresses are handled.
 * */
function receiveMessageFromContainer (event) {
    if (event.origin == CONTAINER_DOMAIN && event.data.substring(0, MESSAGE_PREFIX.length) == MESSAGE_PREFIX) {
        handleKeyPressInNavBar(parseInt(event.data.substring(MESSAGE_PREFIX.length)));
    }
}

/*
 * ***************************************************************************************************************************
 * * Communication between container and iframes.                                                                               *
 * * Taken from http://stackoverflow.com/questions/11769066/how-can-two-instances-of-a-userscript-communicate-between-frames *
 * ***************************************************************************************************************************
 * */



/*--- Because of bugs in how Chrome presents frames to extensions, we must inject
    the messaging code. See bug 20773 and others.
    frames, top, self.parent, contentWindow, etc. are all improperly undefined
    when we need them.  See Firefox and other browsers for the correct behavior.
*/
function sendMessageFromAnIframe (message, targetDomain) {
    var scriptNode          = document.createElement ('script');
    scriptNode.textContent  = 'top.postMessage ("' + message
                            + '", "' + targetDomain + '");'
                            ;
    document.body.appendChild (scriptNode);
}

function sendMessageToAnIframe (cssSelector, message, targetDomain) {
    function findIframeAndMessageIt (cssSelector, message, targetDomain) {
        var targetIframe    = document.querySelector (cssSelector)
        if (targetIframe) {
            targetIframe.contentWindow.postMessage (message, targetDomain);
        }
    }
    var scriptNode          = document.createElement ('script');
    scriptNode.textContent  = findIframeAndMessageIt.toString ()
                            + 'findIframeAndMessageIt ("' + cssSelector
                            + '", "' + message
                            + '", "' + targetDomain + '");'
                            ;
    document.body.appendChild (scriptNode);
}


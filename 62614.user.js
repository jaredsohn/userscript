// ==UserScript==
// @name               MythWeb Navigation Hack
// @description	 Use left/right arrow keys to show earlier/later MythWeb guide.
// @match		 http://*/mythweb/tv/list
// @match		 https://*/mythweb/tv/list
// ==/UserScript==

// XPaths for the links we want to 'click', you may need to change these depending on
// MythWeb versions.
var earlierXPath = "//a[@class='link'][@name='anchor1']";
var laterXPath = '/html/body/div[2]/table/tbody/tr/td[14]/a';

// The key codes we want to bind to - these are default the left and right arrows.
// Change as required.
var earlierKeyCode = 37;
var laterKeyCode = 39;

// Functions.
function get_link(path){
    results = document.evaluate(path,
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return results.snapshotItem(0);
}

function callback(event){
    var navPath = null;
    switch (event.keyCode){
        case earlierKeyCode: navPath = earlierXPath; break;
        case laterKeyCode: navPath = laterXPath; break;
        default: return;
    }
    var link = get_link(navPath);
    fire(link, 'click');
    //window.setTimeout(get_link(navPath).getAttribute('onclick'), 0);
}

function fire(element, event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
}

// Setup listener.
document.addEventListener('keydown', callback, true);
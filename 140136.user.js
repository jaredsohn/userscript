// ==UserScript==
// Inspired by Hide Youtube Featured Videos by joe_3 (http://userscripts.org/scripts/show/46636)
// @name           Hide YouTube Featured Videos/Channels
// @namespace      *
// @description    v1.2  Hide Youtube Featured Videos and Featured Channel
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// Last update 2012-10-08
// ==/UserScript==

// Credits to TweeZz and kangax for the code
// http://stackoverflow.com/questions/6157929/how-to-simulate-mouse-click-using-javascript
function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
      options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

function setShowMore()
{
    GM_setValue("showmore", true);
}

function setShowLess()
{
    GM_setValue("showmore", false);
}

if(GM_getValue("showmore", false))
    simulate(document.getElementsByClassName("show-more")[0], "click");

document.getElementsByClassName("show-more")[0].addEventListener("click", setShowMore, false);
document.getElementsByClassName("show-less")[0].addEventListener("click", setShowLess, false);

var hideElements = Array.prototype.slice.call(document.getElementsByClassName('featured'));

var recommended = document.getElementById('recommended-videos');

if(recommended != null)
{
    var next_sibling = recommended.nextSibling;
    while( next_sibling != null )
    {
        hideElements.push(next_sibling);
        
        next_sibling = next_sibling.nextSibling;
    }
}

//Hide elements
for(var k=0, l=hideElements.length; k<l; k++)
{
    if(hideElements[k] != null)
    {
        if(hideElements[k].textContent != null)
            hideElements[k].textContent = "";
        else
            hideElements[k].style.display = 'none';
    }
}
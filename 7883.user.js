/* add digg control
 * version 0.9
 * Copyright (c) 2007, Daniel Einspanjer
 * License: Creative Commons "Attribution-ShareAlike 2.0"
 * http://creativecommons.org/licenses/by-sa/2.0/
 *
 * A significant portion of this code (the layout of the widget
 * and the Drag class) were copied from a nice looking greasemonkey script
 * by the name of 'book-burro' by Johan Sundström and others. Thanks guys!
 * http://userscripts.org/scripts/show/1859
 */

// ==UserScript==
// @name           Add Digg Control
// @namespace      http://www.yipyip.com/firefox/index.html
// @description    Attempts to add a digg this control to any article accessed from digg.com
// @identifier     http://userscripts.org/scripts/source/7883
// @author         Daniel Einspanjer
// @version        0.9
// @source         http://userscripts.org/scripts/source/7883.user.js
// @include        http://*digg.com/*
// @include        http://duggmirror.com/*
// @include        *#digg_link=*
// ==/UserScript==

// Version History
// 0.9 -- More digg API compatibility changes
// 0.8 -- Added the newly required pagetype variable for the dig() function. Removed unnecessary scoping block. Changed credits for Drag code
// 0.7.3 -- If UserScriptUpdates is installed, use it.
// 0.7.2 -- Heh. The update version checking didn't like 0.7a so I'm changing it to 0.7.2
// 0.7a -- Prevent Drag "sticking"; Drag function object didn't work inside anonymous namespace.
// 0.7 -- Re-arrange code; Add automatic update checking; Tweak XPath expressions to support more digg pages.
// 0.6 -- Tweak close button on widget to have a pointer cursor and to remove hash from location
// 0.5 -- Refactor functions and add code to enable ADC on duggmirror.
// 0.4 -- changed dig function to match changes from digg.com and added inclusion of js files needed by diggthis.php
// 0.3 -- update to xpath of new dig layout
// 0.2 -- changed digg it link from wrapper_full() to dig() funny that they change
//        that method just a couple of days after I start using it. :(

// ========================================================================
// set up our Drag function object for the widget
var Drag = function(){ this.init.apply( this, arguments ); };

Drag.fixE = function( e )
{
    if( typeof e == 'undefined' ) e = window.event;
    if( typeof e.layerX == 'undefined' ) e.layerX = e.offsetX;
    if( typeof e.layerY == 'undefined' ) e.layerY = e.offsetY;
    return e;
};

Drag.prototype.init = function( handle, dragdiv )
{
    this.div = dragdiv || handle;
    this.handle = handle;
    if( isNaN(parseInt(this.div.style.right )) ) this.div.style.right  = '0px';
    if( isNaN(parseInt(this.div.style.bottom)) ) this.div.style.bottom = '0px';
    this.onDragStart = function(){};
    this.onDragEnd = function(){};
    this.onDrag = function(){};
    this.onClick = function(){};
    this.mouseDown = addEventHandler( this.handle, 'mousedown', this.start, this );
};

Drag.prototype.start = function( e )
{
    this.unregister();
    // this.mouseUp = addEventHandler( this.handle, 'mouseup', this.end, this );
    e = Drag.fixE( e );
    this.started = new Date();
    var y = this.startY = parseInt(this.div.style.bottom);
    var x = this.startX = parseInt(this.div.style.right);
    this.onDragStart( x, y );
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.documentMove = addEventHandler( document, 'mousemove', this.drag, this );
    this.documentStop = addEventHandler( document, 'mouseup', this.end, this );
    if( e.preventDefault ) e.preventDefault();
    return false;
};

Drag.prototype.drag = function( e )
{
    e = Drag.fixE( e );
    var ey = e.clientY;
    var ex = e.clientX;
    var y = parseInt(this.div.style.bottom);
    var x = parseInt(this.div.style.right );
    var nx = x - ex + this.lastMouseX;
    var ny = y - ey + this.lastMouseY;
    this.div.style.right	= nx + 'px';
    this.div.style.bottom	= ny + 'px';
    this.lastMouseX	= ex;
    this.lastMouseY	= ey;
    this.onDrag( nx, ny );
    if( e.preventDefault ) e.preventDefault();
    return false;
};

Drag.prototype.unregister = function()
{
    removeEventHandler( document, 'mousemove', this.documentMove );
    removeEventHandler( document, 'mouseup', this.documentStop );
}
Drag.prototype.end = function()
{
    this.unregister();
    var time = (new Date()) - this.started;
    var x = parseInt(this.div.style.right),  dx = this.startX - x;
    var y = parseInt(this.div.style.bottom), dy = this.startY - y;
    this.onDragEnd( x, y, dx, dy, time );
    if( (dx*dx + dy*dy) < (4*4) && time < 1e3 )
        this.onClick( x, y, dx, dy, time );
};

function removeEventHandler( target, eventName, eventHandler )
{
    if( target.addEventListener )
        target.removeEventListener( eventName, eventHandler, true );
    else if( target.attachEvent )
        target.detachEvent( 'on' + eventName, eventHandler );
}

function addEventHandler( target, eventName, eventHandler, scope )
{
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if( target.addEventListener )
        target.addEventListener( eventName, f, true );
    else if( target.attachEvent )
        target.attachEvent( 'on' + eventName, f );
    return f;
}
// end Drag code
// ========================================================================

/* First, we have to determine what type of page we are looking at.
 * ADC has four targets:
 *  1. Any page that has a hash beginning with #digg_link=
 *  2. Duggmirror pages
 *  3. The diggthis.php API page (to tweak the links)
 *  4. Digg pages that have article links
 */
var hashPart = window.location.hash.match(/#digg_link=(.*)/);

//  1. Any page that has a hash beginning with #digg_link=
if (hashPart)
{
    injectADC(hashPart[1]);
}
//  2. Duggmirror pages
else if (window.location.hostname == 'duggmirror.com')
{
    var articleURL = 'http://digg.com' + window.location.pathname
    injectADC(articleURL);
}
//  3. The diggthis.php API page (to tweak the links)
else if (window.location.pathname == '/tools/diggthis.php' && window.location.hash == '#adc_diggthis_init')
{
    /* This is where we fixup the links in the diggthis frame.
     * I do not want links in the widget blowing away the current
     * page so I change them to target _blank instead.
     * The special case is the diggIt link itself. I need it
     * to use the digg ajax method dig() instead of
     * the form submission it uses normally.
     * Note this also requires that I include the javascript files
     * that digg.com no longer sources in diggthis.php
     * I toyed with the idea of using an XHR to get the path to the
     * script files, but decided against that because I have
     * to filter the list to prevent init errors and because
     * I didn't think an additional request per ADC is worth it.
     * Unfortunately, this means if they change the requirements,
     * the ADC extension will break again. :(
     */

    // Turn off the init flag so this block only gets run once
    // (the script loads trigger GM)
    window.location.hash = '#adc_diggthis';

    document.getElementById('f1').target = '_blank';

    with( document.getElementById('diggs1') )
    {
        target = '_blank';
        title = 'Click to open the digg article for this page';
    }

    var diggItLink = document.getElementById('diglink1').firstChild;

    var newElement = document.createElement('a')
    newElement.href = "javascript:dig(1,document.forms['f1'].id.value,document.forms['f1'].digcheck.value)";
    newElement.appendChild(diggItLink.firstChild);
    diggItLink.parentNode.replaceChild(newElement, diggItLink);

    var documentHead = document.getElementsByTagName('head')[0];

    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    newScriptElement.appendChild( document.createTextNode( "pagetype = 'permalink';" ) );
    documentHead.appendChild(newScriptElement);

    var diggScriptPath = '/js/';
    for each (var diggScriptName in ['digg.js', 'prototype.js', 'effects.js', 'jquery.js'])
    {
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        newScriptElement.setAttribute('src', diggScriptPath+diggScriptName);
        documentHead.appendChild(newScriptElement);
    }
}
//  4. Digg pages that have article links
else
{
    /* This xpath will only match summary pages.
     * We look for a news-body div inside a news-summary div and if we find it, we adjust the article link to have our special hash appended.
     * NOTE: If the page does any redirection, our hash will dissapear and the whole ADC will break. :(
     */
    var result = document.evaluate(
                    "/html/body/div[@id='container']/div[@id='contents']/div[@id='wrapper']/div[contains(concat(' ',@class,' '),' main ')]/div[contains(concat(' ',@class,' '),' news-summary ')]/div[contains(concat(' ',@class,' '),' news-body ')]",
                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (result.snapshotLength > 0)
    {
        for (var i = 0; i < result.snapshotLength; i++) 
        {
            var newsBodyNode = result.snapshotItem(i);

            var articleLink = document.evaluate("h3/a",
                    newsBodyNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null).singleNodeValue;

            // Note that the digg link is absolute without the domain name. (e.g. /tech/foo)
            var diggURL = 'http://digg.com' +
                document.evaluate(
                        "div[contains(concat(' ',@class,' '),' news-details ')]/a[contains(concat(' ',@class,' '),' tool ')][contains(concat(' ',@class,' '),' comments ')]/@href",
                        newsBodyNode, null, XPathResult.STRING_TYPE, null
                        ).stringValue;

            articleLink.href += '#digg_link=' + encodeURIComponent(diggURL);
        }
    }
}

var SCRIPT = {
		name: "Add Digg Control",
		namespace: "http://www.yipyip.com",
		source: "http://userscripts.org/scripts/show/7883.user.js",			// script homepage
		identifier: "http://userscripts.org/scripts/source/7883",
		version: "0.9",								            // version
		date: (new Date(2007, 7 - 1, 19)).valueOf()            		// update date
};
try {
    var win = unsafeWindow || window.wrappedJSObject || window;
	window.addEventListener("load", function () {
		try {
			win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
		} catch (ex) {
            // If UserScriptUpdates isn't installed, try our own version.
            try {
                if (!GM_getValue) return;
                // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage and a script with * includes
                var DoS_PREVENTION_TIME = 2 * 60 * 1000;
                var isSomeoneChecking = GM_getValue('CHECKING', null);
                var now = new Date().getTime();
                GM_setValue('CHECKING', now.toString());
                if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
                var lastChecked = GM_getValue('LAST_CHECKED', null);

                var TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
                if (lastChecked && (now - lastChecked) < TWO_DAYS) return;
                GM_xmlhttpRequest({
                method: 'GET',
                url: SCRIPT.identifier,
                onload: function(result) {
                    if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
                    var theOtherVersion = RegExp.$1;
                    if (theOtherVersion == SCRIPT.version) return;
                    if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
                    GM_openInTab(SCRIPT.source);
                    }
                }
                });
                GM_setValue('LAST_CHECKED', now.toString());
            } catch (ex) {}
        }
	}, false);
} catch (ex) {}

function injectADC(articleURL)
{
    /*   ____body______________________
     *  |                              |
     *  |  ______root______________    | 
     *  | |                        |   |
     *  | | ____handle____________ |   | 
     *  | ||                      ||   |
     *  | ||title    about  close ||   | 
     *  | ||______________________||   | 
     *  | |                        |   |
     *  | | ____box_______________ |   | 
     *  | ||                      ||   | 
     *  | || _____iframe_________ ||   | 
     *  | |||                    |||   | 
     *  | |||    diggthis        |||   | 
     *  | |||____________________|||   | 
     *  | ||______________________||   | 
     *  | |________________________|   | 
     *  |______________________________| 
     */
    var root = document.createElement( 'div' );
    with( root.style )
    {
        position = 'fixed';
        top = left = '5px';
    }

    var box = document.createElement( 'div' );
    with( box.style )
    {
        position = 'relative';
        zIndex = '1000';

        backgroundColor = '#FFF299';
        color = 'black';
        border = '1px solid brown';
        padding = '0px';
        textAlign = 'left';
        font = '6pt sans-serif';
        width = '60px';

        opacity = '0.63';
        filter = 'alpha(opacity=60)';
    }

    var handle = document.createElement( 'div' );
    handle.title = 'Click title to drag';
    handle.style.padding = '5px';

    var title_span = document.createElement( 'b' );
    title_span.title = 'Add Digg Control widget';
    title_span.appendChild( document.createTextNode( 'ADC' ) );

    var about = document.createElement( 'a' );
    with( about )
    {
        appendChild( document.createTextNode( '?' ) );
        title = 'by Daniel Einspanjer (with code from book-burro)';
        target = '_blank';
        href = 'http://www.yipyip.com/firefox/index.html';
        with( style )
        {
            position = 'absolute';
            right = '15px';
            top = '2px';
            margin = '2px';
            width = '9px';
            height = '9px';
            border = '1px solid brown';
            lineHeight = '8px';
            textAlign = 'center';
            verticalAlign = 'middle';
            textDecoration = 'none';
        }
    }

    var close = document.createElement( 'span' );
    with( close )
    {
        title = 'Click to remove from this page instance';
        appendChild( document.createTextNode( 'X' ) );
        with( style )
        {
            position = 'absolute';
            right = '2px';
            top = '2px';
            margin = '2px';
            width = '9px';
            height = '9px';
            border = '1px solid brown';
            lineHeight = '8px';
            textAlign = 'center';
            cursor = 'pointer';
        }
    }
    addEventHandler( close, 'click', function(){ document.body.removeChild( root ); window.location.hash = '';} );

    var diggControlIframe = document.createElement('iframe')
    with( diggControlIframe )
    {
        id = 'diggControlIframe';
        src = 'http://digg.com/tools/diggthis.php?u='+articleURL+'#adc_diggthis_init';
        height = '82';
        width = '51';
        scrolling = 'no';
        with( style )
        {
            display = 'block';
            border = 'none';
            margin = '0 auto';
        }
    }


    handle.appendChild( title_span );
    handle.appendChild( about );
    handle.appendChild( close );
    box.appendChild( handle );
    box.appendChild( diggControlIframe );
    root.appendChild( box );
    document.body.appendChild( root );

    handle.drag = new Drag( handle, box );

}

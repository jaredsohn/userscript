// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Amazon Mechanical Turk Quicker Image Adjustment
// @namespace       http://youkai.org
// @description     Lots of enhancements to the Mechanical Turk UI for Image Adjustment HIT.
// @include         http://www.mturk.com/mturk/*
// @include         file:///c:/tmp/preview.htm
// ==/UserScript==
//
// TODO: BUG: horizontal layout isn't working in FF 1.0.7.  FF really doesn't want to layout the page again after changing display:block to display:inline
// TODO: FEATURE: Warn user when they select horizontal scrolling without FF 1.5
// TODO: FEATURE: help popups for options.
// TODO: FEATURE: individual zoom keys for each image.
// TODO: FEATURE: Preload another HIT in another tab/window.  Low priority, as FF tabs let you do this already.
// TODO: FEATURE: Statistic tracker: Time per HIT (mean, min, max), counter.

var rcsVersion = "$Id: MTurkImageAdjustment.user.js,v 1.28 2005/11/27 05:24:31 Chris Exp Chris $"
var versionString = rcsVersion.match( /[\d.]+ \d+\/\d+\/\d+ \d+:\d+:\d+/ );

// The UI alterations this script performs, are probably only appropriate
// for the A9 block-image HITs.

if (document.body.innerHTML.search('Image Adjustment') < 0) {
    return;
}

// Memory-Leak-free event handling

// Registering event handlers with node.addEventHandler causes memory leaks.
// Adding via this function tracks them all, so they can be removed
// when the page unloads.

var registeredEventListeners = new Array();
function addEventListener(target, event, listener, capture)
{
    registeredEventListeners.push( [target, event, listener, capture] );
    target.addEventListener(event, listener, capture);
}
function unregisterEventListeners(event)
{
    // GM_log('unloading');
    for (var i = 0; i < registeredEventListeners.length; i++)
    {
        var rel = registeredEventListeners[i];
        rel[0].removeEventListener(rel[1], rel[2], rel[3]);
    }
    window.removeEventListener('unload', unregisterEventListeners, false);
}
// And add the unload event handler that will unload all the registered
// handlers, including itself.
addEventListener(window, 'unload', unregisterEventListeners, false);

////////////////////////////////////////
//
// Fetch Persistent User Options
//

// GM puts each script's values into a separate namespace, so this
// isn't really necessary.  But I didn't know that in early versions
// of the script, and now it has to stay, for backwards compatibility.

var userOptionPrefix = 'mturk_image_adjust_';

// Fetches a boolean option's value.
function boolOption (name, defaultVal) {
    return GM_getValue(userOptionPrefix + name, defaultVal ? 'yes' : '').length > 0;
}
// Stores the value of a booelan option.
function setBoolOption (name, val) {
    GM_setValue(userOptionPrefix + name, val ? 'yes' : '');
}

// Fetches an option as a string.
function stringOption (name, defaultVal) {
    return GM_getValue(userOptionPrefix + name, defaultVal);
}
// Stores a string option.
function setStringOption (name, val) {
    GM_setValue(userOptionPrefix + name, val);
}

////
////
//// Auto-accept
////
//// Act on auto-aceept very early in the script, to try and head off the browser
//// displaying anything.
////

var useAutoAccept = boolOption('auto_accept', false);

// If user wants to automatically accept all hits given to them,
// "click" on any accept link.

if ( useAutoAccept )
{
    // Find the "Accept HIT" anchor
    
    var acceptAnchors = xpath(document, "//a[starts-with(@href, '/mturk/accept')]");
    
    // And go to the link it says to.
    
    if (acceptAnchors.snapshotLength > 0) {

        // Get rid of all the images on the page, to prevent
        // browser from starting to load them.
        var images = xpath(document, '//img/@src');
        for (var i = 0; i < images.snapshotLength; i++)
        {
            images.snapshotItem(i).value = '';
        }

        var anchor = acceptAnchors.snapshotItem(0);
        window.location.assign(anchor.href);
        return;
    }
}

////////////////////////////////////////
    
// Find the HIT submission form.
var form = null;
for (var f = 0; f < document.forms.length; f++) {
    if (document.forms.item(f).action='/mturk/submit') {
        form = document.forms.item(f);
        break;
    }
}
if (form == null) {
    return;
}
    

// As of this writing, the images don't have 'width' and 'height' attributes,
// so we'll just have to assume certain full-size dimensions.
var defaultImageWidth = 720;
var defaultImageHeight = 480;

var useInnerScroll = boolOption('inside_scroll', true);

var imageResizePercent = stringOption('image_resize_percent', '100');
var imageMaxsizePercent = stringOption('image_maxsize_percent', '100');
var zoomOnNavigate = boolOption('zoom_on_navigate', false);
var zoomOnMouseover = boolOption('zoom_on_mouseover', false);
var useSmoothZoom = boolOption('smooth_zoom', false);
var zoomOnMouseoverKey = stringOption('zoom_on_mouseover_key', '');
var zoomKeys = stringOption('zoomKeys', 'Z');
var flowImages = boolOption('flow_images', false);
var useAggressiveHide = boolOption('aggressive_hide', false);
var autoSelectFirstItem = boolOption('select_first_item', false);
var nextKeys = stringOption('nextKeys', 'N');
var prevKeys = stringOption('prevKeys', 'P');
var skipKeys = stringOption('skipKeys', 'S');
var acceptKeys = stringOption('acceptKeys', 'A');
var returnKeys = stringOption('returnKeys', 'R');
var googleMapKeys = stringOption('googleMapKeys', 'G');
var yellowPagesKeys = stringOption('yellowPagesKeys', 'Y');
var submitKeys = stringOption('submitKeys', String.fromCharCode(13) );
var submitOnHotkey = boolOption('submitOnHotkey', false);
var submitDelay = parseFloat(stringOption('submitDelay', '0'));
if (submitDelay < 0) { submitDelay = 0; }

var optionsClickHint = parseInt(stringOption('optionsClickHint', '20'));
if (optionsClickHint > 0) { setStringOption('optionsClickHint', optionsClickHint-1); }

////////////////////////////////////////
//
// User Options UI
//

function optionGroupTitle(title)
{
    var titleGroup = document.createElement('div');
    titleGroup.style.backgroundColor = '#eeeeff';
    titleGroup.style.marginTop = '0.5em';
//    titleGroup.style.borderTop = 'solid black 1px';
//    titleGroup.style.borderBottom = 'solid gray 1px';
    titleGroup.innerHTML = '<center>' + title + '</center>';
    return titleGroup;
}

var optionsWidget = document.createElement('div');
optionsWidget.style.zIndex = 200; // higher than any zoomed image.
optionsWidget.style.position = 'fixed';
optionsWidget.style.margin = '10px';
optionsWidget.style.top = '3em';
optionsWidget.style.right = '2em';
optionsWidget.style.border = 'solid black 1px';
optionsWidget.style.backgroundColor = '#ffff00';
optionsWidget.style.opacity = '0.8';
// optionsWidget.style.maxWidth = '20em';


var titlebar = document.createElement('div');
titlebar.style.borderBottom = 'solid black 1px';
titlebar.style.paddingLeft = '2em';
titlebar.style.paddingRight = '2em';
titlebar.style.cursor = 'pointer';
titlebar.style.textAlign = 'center';
titlebar.style.fontWeight = 'bold';
// The switch from using mouseover to open/close to click open/close, could
// throw people, so give them a temporary hint about the new behavior.
titlebar.innerHTML = 'Options' + ((optionsClickHint > 0) ? ' (click to open/close)' : '');
optionsWidget.appendChild(titlebar);

var optionsMenu = document.createElement('div');
optionsWidget.appendChild(optionsMenu);
optionsMenu.style.backgroundColor = '#ccccff';
optionsMenu.style.margin = '0px';
optionsMenu.style.padding = '5px';
optionsMenu.style.display = 'none';
optionsMenu.style.textAlign = 'right';

// Add UI widgets for setting the options.
// An option to scroll the whole window, or just the images.

var column1 = document.createElement('div');
column1.style.textAlign = 'right';
var column2 = document.createElement('div');
column2.style.textAlign = 'right';
var optionsTable = table([[column1,column2]],
                         {},
                         {},
                         {verticalAlign: 'top'});
optionsTable.style.verticalAlign = 'top';

column1.appendChild( optionGroupTitle('Page Controls') );

// A button to show all the junk again.
{
    var showButton = document.createElement('input');
    showButton.type = 'button';
    showButton.value = 'Show Full Page';
    addEventListener(showButton, 
                     'click',
                     function(event) {
                         unhide();
                         showButton.style.display = 'none';
                     },
                     false);
    var center = document.createElement('center');
    center.appendChild(showButton);
    column1.appendChild(center);
}


column1.appendChild( makeBoolOption('Auto-Accept All HITs', 'auto_accept', useAutoAccept) );
column1.appendChild( makeStringOption('Submit Delay (seconds)', 'submitDelay', submitDelay + '', 3) );

column1.appendChild( optionGroupTitle('Layout Settings') );
column1.appendChild( makeBoolOption('Hide Even More', 'aggressive_hide', useAggressiveHide) );
column1.appendChild( makeStringOption( 'Thumbnail Image Size %', 'image_resize_percent', imageResizePercent, 4 ) );
column1.appendChild( makeStringOption( 'Zoomed Image Size %', 'image_maxsize_percent', imageMaxsizePercent, 4 ) );
column1.appendChild( makeBoolOption('Horizontal Layout (Note: only works in Firefox 1.5)', 'flow_images', flowImages) );
column1.appendChild( makeBoolOption('Scrollbars Inside', 'inside_scroll', useInnerScroll) );

column1.appendChild( optionGroupTitle('Mouse Settings') );

column1.appendChild( makeBoolOption('Zoom Image on Mouseover', 'zoom_on_mouseover', zoomOnMouseover ) );
column1.appendChild( makeBoolOption('Smoother Zoom', 'smooth_zoom', useSmoothZoom ) );
column1.appendChild( makeKeyOption('Mouseover Zoom only when pressed', 'zoom_on_mouseover_key', zoomOnMouseoverKey) );


column2.appendChild( optionGroupTitle('Keyboard Settings') );

column2.appendChild( makeBoolOption('Zoom Selected Image', 'zoom_on_navigate', zoomOnNavigate) );
column2.appendChild( makeBoolOption('Auto-Select First Item', 'select_first_item', autoSelectFirstItem) );

column2.appendChild( makeKeyOption( 'Accept', 'acceptKeys', acceptKeys ) );
column2.appendChild( makeKeyOption( 'Skip', 'skipKeys', skipKeys ) );
column2.appendChild( makeKeyOption( 'Prev', 'prevKeys', prevKeys ) );
column2.appendChild( makeKeyOption( 'Next', 'nextKeys', nextKeys ) );
column2.appendChild( makeKeyOption( 'Submit', 'submitKeys', submitKeys ) );
column2.appendChild( makeKeyOption( 'Return', 'returnKeys', returnKeys ) );
column2.appendChild( makeKeyOption( 'Zoom Selected', 'zoomKeys', zoomKeys ) );
column2.appendChild( makeKeyOption( 'Map', 'googleMapKeys', googleMapKeys ) );
column2.appendChild( makeKeyOption( 'Yellow Pages', 'yellowPagesKeys', yellowPagesKeys ) );

// Create image hotkey options.  Use an array of them, so that we can more easily adapt
// to the # of images they decide to display.

column2.appendChild( optionGroupTitle('Selection Hotkeys') );

var imageHotkeys = new Array();
{
    var centergroup = document.createElement('center');
    var hkgroup = document.createElement('div');
    for (var i = 0; i < 20; i++) {
        var keys = stringOption('imageHotkey' + i, '');
        var k = makeKeyCaptureBox( 'imageHotkey' + i, 
                                   keys,
                                   3 );
        imageHotkeys.push( {optionBox: k, keys: keys} );
        hkgroup.appendChild( k );
    }
    centergroup.appendChild( table([[ text(''), hkgroup, text('') ]] ) );
    column2.appendChild( centergroup );
}
column2.appendChild( makeBoolOption('Auto-Submit Selected Image', 'submitOnHotkey', submitOnHotkey) );

// Rearranges the layout of the imageHotkeys option boxes, to mirror
// the way the images are laid out on-screen.

function rearrangeImageHotkeys()
{
    var prevY = null;
    for (var i = 0; i < imageHotkeys.length; i++)
    {
        // Remove any line break that may have been between the current box, and the previous one.
        var hk = imageHotkeys[i].optionBox;
        if (hk.nextSibling && hk.nextSibling.nodeName == 'BR') {
            hk.parentNode.removeChild(hk.nextSibling);
        }

        // Is there an image corresponding to this hotkey number I?
        if ( i < choiceNodes.snapshotLength ) {

            // Yes.  Find out where the corresponding image is, in relation
            // to the other images.
            var choice = choiceNodes.snapshotItem(i).parentNode;

            if (prevY != null && choice.offsetTop != prevY) // Same line as previous?
            {
                // No.  Insert a line break in front of this hotkey box
                hk.parentNode.insertBefore( document.createElement('br'), hk );
            }
            prevY = choice.offsetTop;

            hk.style.display = null; // use default display mode of the option box.

        } else { // run out of images for the hotkeys.

            hk.style.display = 'none'; // hide the option box.

        }
    }
}

optionsMenu.appendChild( optionsTable );

optionsMenu.appendChild( optionGroupTitle('Changes will take effect on the next page<br/><span style="font-style:italic;font-size:smaller;">ver: ' + versionString + '</span>') );

document.body.insertBefore(optionsWidget, document.body.firstChild);

// GM_log('reached Line 307');

// Click the title to toggle the options menu open and closed.

var disableGlobalKeys = false;

addEventListener(titlebar,
                 'click',
                 function(event) {
                     if ( optionsMenu.style.display == 'none' ) 
                     {
                         rearrangeImageHotkeys();
                         optionsMenu.style.display = 'block';
                         optionsWidget.style.opacity = 1;
                         disableGlobalKeys = true;
                     }
                     else
                     {
                         optionsMenu.style.display = 'none';
                         optionsWidget.style.opacity = 0.8;
                         disableGlobalKeys = false;
                     }
                 },
                 false);

{
    var cancelSubmitButton = document.createElement('div');
    cancelSubmitButton.style.zIndex = 200; // higher than any zoomed image.
    cancelSubmitButton.style.position = 'fixed';
    cancelSubmitButton.style.margin = '0px';
    cancelSubmitButton.style.top = '0em';
    cancelSubmitButton.style.right = '0em';
    cancelSubmitButton.style.padding = '0.5em';
    cancelSubmitButton.style.border = 'solid black 1px';
    cancelSubmitButton.style.backgroundColor = '#ff4400';
    cancelSubmitButton.style.color = '#ffff44';
    cancelSubmitButton.style.fontWeight = 'bold';
    cancelSubmitButton.style.textAlign = 'center';
    cancelSubmitButton.style.cursor = 'pointer';
    cancelSubmitButton.style.display = 'none';
    document.body.insertBefore(cancelSubmitButton, document.body.firstChild);

    addEventListener(cancelSubmitButton,
                     'click',
                     function(event) {
                         cancelSubmit();
                     },
                     false);
}

// GM_log('reached Line 359');

// Creates a widget allowing a key binding to be set.
function makeBoolOption(label, optionName, initialValue)
{
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = initialValue;
    addEventListener(checkbox, 
                     'change',
                     function(event) {
                         setBoolOption( optionName, event.target.checked );
                     },
                     false);

    
    var boolOption = document.createElement('div');
    boolOption.appendChild(text( label ));
    boolOption.appendChild(checkbox);
 
    return boolOption;
}


// key bindings

function printableKeys(keys)
{
    // GM_log('keys = ' + keys);
    keys = keys.toUpperCase();
    keys = keys.replace(/\n/g, '<enter>');
    keys = keys.replace(/\r/g, '<enter>');
    keys = keys.replace(/ /g, '<space>');
    keys = keys.replace(/\033/g, '<esc>');
    if (keys.length == 0)
    {
        keys = '<none>';
    }
    return keys;
}

function makeKeyCaptureBox (optionName, initialKeys, size)
{

    var keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.size = size;

    keyInput.value = printableKeys(initialKeys);
    var newKeys = '';

    // On focus, arrange to have a sequence of keystrokes captured
    // raw, and it's representation placed into the box.

    function keyCaptureFn(event) {

        if (event.keyCode == 0) {
            return;
        }
        newKeys = newKeys + String.fromCharCode(event.keyCode);
        setStringOption(optionName, newKeys);
        event.target.value = printableKeys(newKeys);

        eatKey(event);
    };
    function eatKey(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    addEventListener(keyInput,
                     'focus',
                     function(event) {
                         // When gaining focus, clear the old key values.
                         newKeys = '';
                         event.target.value = '';
                         setStringOption(optionName, '');

                         addEventListener(event.target,
                                          'keydown',
                                          keyCaptureFn,
                                          true);
                         addEventListener(event.target,
                                          'keyup',
                                          eatKey,
                                          true);
                         addEventListener(event.target,
                                          'keypress',
                                          eatKey,
                                          true);
                     },
                     false);
    addEventListener(keyInput,
                     'blur',
                     function(event) {
                         event.target.removeEventListener('keydown',
                                                          keyCaptureFn,
                                                          true);
                         event.target.removeEventListener('keyup',
                                                          eatKey,
                                                          true);
                         event.target.removeEventListener('keypress',
                                                          eatKey,
                                                          true);
                     },
                     false);

    return keyInput;
}

function makeKeyOption (label, optionName, initialKeys) 
{
    var group = document.createElement('div');
    if (label != null) {
        group.appendChild(text(label + ':'));
    }
    var keyInput = makeKeyCaptureBox(optionName, initialKeys, 15);
    group.appendChild(keyInput);
    return group;
}

function makeStringOption (label, optionName, initial, length)
{
    var group = document.createElement('div');
    group.appendChild(text(label + ':'));
    var keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.size = length;
    keyInput.value = printableKeys(initial);
    addEventListener(keyInput,
                     'change',
                     function(event) {
                         setStringOption(optionName, event.target.value);
                     },
                     false);
    group.appendChild(keyInput);
    return group;
}




//////////////////////////////////////////
//
// Helper functions
//

function addStyle (element, style)
{
    for (var p in style)
    {
        element.style[p] = style[p];
    }
}

// Creates a table, whose cell contents are the elements of the 2-d array CONTENTS
function table(contents, tableStyle, rowStyle, cellStyle)
{
    var t = document.createElement('table');
    addStyle(t, tableStyle);
    for (cRow in contents)
    {
        var tr = document.createElement('tr');
        addStyle(tr, rowStyle);

        t.appendChild(tr);
        for (cCol in contents[cRow]) 
        {
            var td = document.createElement('td');
            addStyle( td, cellStyle );
            tr.appendChild(td);
            td.appendChild(contents[cRow][cCol]);
        }
    }
    return t;
}

// creates a text node

function text(contents) { return document.createTextNode(contents); }

// Terser xpath evaluator.
function xpath(context, path) {
    return document.evaluate(path,
                             context,
                             null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                             null);
}

// UI Element hiding

var hiddenStuff = [];

// Hides a node, remembering its display mode, so it can be show later.
function hide(thing) {
    if (thing.style != null && thing.style.display != 'none' && thing != optionsWidget ) {
        hiddenStuff.push([thing, thing.style.display]);
        thing.style.display = 'none';
    }
}
// Unhides everything that's hidden.
function unhide() {
    for (var i = 0; i < hiddenStuff.length; i++) {
        hiddenStuff[i][0].style.display = hiddenStuff[i][1];
    }
}

// like hide(), but hides all nodes that match an XPath query.
function hideXPath(context, path) {
    var list = xpath(context,path);
    for (var i = 0; i < list.snapshotLength; i++) {
        hide(list.snapshotItem(i));
    }
}

// makes a string suitable for use in an HREF attribute.
function urlize(str) {
    // GM_log('urlize >' + str + '<');
    str = str.replace(/&/g, '%26');
    str = str.replace(/ /g, '%20');
    // GM_log('result >' + str + '<');
    return str;
}


// Creates and installs an event handler which calls the
// caller's function, whenever one of the passed keys is pressed
// anywhere on the page.
function registerGlobalKeys(keys, fn, eventType)
{
    if (eventType == null) {
        eventType = 'keydown';
    }

    if (keys.length > 0) {
        addEventListener(
            document,
            eventType,
            function(event) {
                
                // GM_log('keypress');
                if (disableGlobalKeys || event.altKey || event.ctrlKey || event.metaKey) {
                    return;
                }
                // GM_log(eventType + ': ' + event.which + ' ' + event.charCode +' ' + event.keyCode);
                // GM_log('keypress not alt: ' + keys + ',' + String.fromCharCode(event.keyCode));
                if (keys.indexOf(String.fromCharCode(event.keyCode)) >= 0) 
                {
                    // GM_log('key matched');
                    if ( fn(String.fromCharCode(event.keyCode)) ) 
                    {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            },
            true);
    }
}

// Sets up a single key to activate an Anchor. The anchor
// is visually modified to indicate what key activates it.

function clickOnKeystroke(anchor, keys)
{
    if (anchor) {
        anchor.appendChild(text('(' + printableKeys(keys[0]) + ') ' ) );
        registerGlobalKeys(keys,
                           function(key)
                           {
                               window.open(anchor.href,
                                           anchor.target ?
                                           anchor.target : '_self');
                               return true;
                           });
    }
}



//////////////////////////////////////////
//
// Add Google Maps and A9 Yellow Pages links
//
// Somewhat fragile, since the exact text format and location
// of the business name and address could change, depending on
// how the requester formats the HIT question.
//

// Find things that look like business addresses, and add links next to them.

var addressRe = /ocation of business:\s*(.*)/i;
var businessRe = /(.*)\s*--\s*[^,]+,\s*[A-Z][A-Z]/;

var addressArea = xpath(document, "//text()[contains(., 'ocation of business:')]");

var yellowPagesLink = null;
var googleMapLink = null;

for (var i = 0; i < addressArea.snapshotLength; i++) {

    var addressText = addressArea.snapshotItem(i);
    var matches = addressRe.exec(text.data);

    if (matches != null) {

        var address = matches[1];

        // GM_log('found address: ' + address);

        // Google maps
        var googleMapLink = document.createElement('a');
        googleMapLink.href = 'http://maps.google.com/maps?t=h&q=' + urlize(address);
        googleMapLink.target = 'mturk_gmap_helper';
        googleMapLink.appendChild(text('[map]'));
        addressText.parentNode.appendChild(googleMapLink);

        // Look in the paragraph behind, to get the business name.
        var btextList = xpath(text, "../preceding-sibling::p/text()[contains(.,' -- ')]");

        if (btextList.snapshotLength > 0) {
            // GM_log('found busines node');

            var business = businessRe.exec(btextList.snapshotItem(0).data);

            if (business != null) {
                // GM_log('found business: ' + business[1]);

                // A9 Yellow Pages
                yellowPagesLink = document.createElement('a');
                yellowPagesLink.href = 
                    'http://amazon.com/gp/yp/sb/yp-search-dispatch.html?index=local&keywords=' + urlize(business[1]) +
                    '&cityStateZip='+urlize(address);
                yellowPagesLink.target = 'mturk_a9yp_helper';
                yellowPagesLink.appendChild(text('[Yellow Pages]'));
                addressText.parentNode.appendChild(yellowPagesLink);
            }
                
        }
    }
}

//////////////////////////////////////////
//
// Make more room for the images.
//

// Get rid of various junk taking up screen real-estate.  I expect
// this will break the second Amazon tweaks anything in the page.

hideXPath(form, "//img[@class='question binary image']"); // the big A9 logo
hideXPath(form, "div/div[descendant::*[contains(text(),'A9 BlockView')]]");
hideXPath(form, "preceding-sibling::table"); // site navigation headers
hideXPath(form, "following-sibling::div"); // siite navigation footers

if ( useAggressiveHide ) 
{
    // Everything preceeding the HIT question area.
    hideXPath(document, "//div[@id='hit-wrapper']/ancestor-or-self::*/preceding-sibling::*");

    // Everything following the HIT question area
    hideXPath(document, "//div[@id='hit-wrapper']/ancestor-or-self::*/following-sibling::*");

    // Spurious instructions in the question.  Experienced A9ers know the instructions.
    hideXPath(document, "//div[@id='hit-wrapper']//p[@class = 'question text']");

    // Really squeeze all the edges of the screen, by removing extra box pixels
    var parents = xpath(document, "//div[@id='hit-wrapper']/ancestor-or-self::*");
    for ( var i = 0; i < parents.snapshotLength; i++) 
    {
        var item = parents.snapshotItem(i);
        if (item.style != null) {
            item.style.margin='0px';
            item.style.padding='0px';
            item.style.border='0px';
        }
    }
}

//
// Put the choices inside a scrollable area, and shorten the height
// so that whole area is on-screen.  This is an option that people
// can turn off, since there seems to be a fair number of users that
// don't like it.
//

// Whichever scrolling model is used, choiceArea is the object that does the
// scrolling (either the inner area, or the entire document body).
// This will be used later in the auto-scroll next/previous code.
// By default, scroll the entire document.

var choiceArea = document.body;

if ( useInnerScroll )
{
    var choiceAreaSnapshot = xpath(document, "//div[@class='HITAnswer-wrapper']");

    if (choiceAreaSnapshot.snapshotLength > 0) {
        choiceArea = choiceAreaSnapshot.snapshotItem(0);
        choiceArea.style.overflow = "auto";

        // '15' is a magic number to account for some extra vertical space
        // that seems to be showing up somwhere - I think it's the margin
        // of some object (probably the body), but I'm not sure.

        // GM_log([document.body.offsetHeight, ca.offsetTop, ca.offsetHeight].join(','));

        var footerHeight = document.body.offsetHeight - (choiceArea.offsetTop + choiceArea.offsetHeight) + 15;
        var remainingHeight = window.innerHeight - choiceArea.offsetTop - footerHeight;

        // GM_log('footerHeight = ' + footerHeight + '  remainingHeight = ' + remainingHeight);

        if (remainingHeight > 0) {
            // GM_log('Setting body height to ' + remainingHeight);
            // ca.style.maxHeight = remainingHeight + 'px';
            choiceArea.style.height = remainingHeight + 'px';
        }
    }
}

//////////////////////////////////////////
//
// Perform processing on all the images.
//
    
// Find all the images/text answers from which you're supposed to select.
var choiceNodes =  xpath(document, "//img[@class='answer binary image']|//span[@class='answer text']");

//
// Get the choices out of a vertical presentation, to flow left-to-right.
//
// This is tricky: in an attempt to be a little more resilient to changes
// in the HTML layout that Amazon uses as they update the site,
// this expression attempts to find the first common ancestor
// of all the images, and then all of its descendants, so it can turn them all
// into display:inline.  Don't let the parts of a table be inlined,
// otherwise the radiobutton & image can get separated on different lines,
// causing an ugly, misaligned grid of images.

if ( flowImages && choiceNodes.snapshotLength > 1 )
{
    // GM_log('flowing');
    var commonAncestorChildren = 
        xpath(choiceNodes.snapshotItem(0),
              "ancestor::*[count(descendant::img[@class='answer binary image']) > 1][1]/descendant::*[name()!='TR' and name() != 'TD' and name() != 'TBODY']");
    for (var i = 0; i < commonAncestorChildren.snapshotLength; i++)
    {
        //  GM_log('flowing ' + child);
        var child = commonAncestorChildren.snapshotItem(i);
        if ( child.style.display != 'none' ) {
            child.style.display = 'inline';
        }
    }
}

for (var i = 0; i < choiceNodes.snapshotLength; i++) {

    var img = choiceNodes.snapshotItem(i);

    //
    // Wrap a placeholder div around the img, the same size as the thumbnail
    // so that the zoom can
    // reposition the img with absolute positioning, without affecting
    // the layout of the whole page.
    var imgWrapper = document.createElement('div');
    imgWrapper.style.position='relative';
    img.parentNode.insertBefore(imgWrapper, img);
    img.parentNode.removeChild(img);
    img.style.position = 'absolute';
    img.style.left = '0px';
    img.style.top = '0px';
    img.style.zIndex = 1;
    imgWrapper.appendChild(img);

    //
    // Resize the image to user preference.
    //
    zoomImage(img, 0);
    imgWrapper.style.width = img.offsetWidth + 'px';
    imgWrapper.style.height = img.offsetHeight + 'px';

    // Find the accompanying radio button.  If this is only a HIT preview, the
    // radio button will be there, but disabled.
        
    var buttonNodes = xpath(img, 
                            "ancestor::td/preceding-sibling::td[1]//input[@type='radio' and @class='question selection']");
    // GM_log('  found ' + buttonNodes.snapshotLength + ' sibling buttons');

    if ( buttonNodes.snapshotLength > 0 && !buttonNodes.snapshotItem(0).disabled ) {

        // Have the click select this radio button, and submit the form.
        img.style.border = 'solid blue 2px';
        img.style.cursor = 'pointer';
        addEventListener(img,
                         'click',
                         function() {
                             var b = buttonNodes.snapshotItem(0);
                             return function(event) {
                                 b.checked = true;
                                 submit();
                             };
                         }(),
                         false);
    }
}

var submitTimer;

function cancelSubmit() {
    if (submitTimer != null) {
        clearTimeout(submitTimer);
        submitTimer = null;
        cancelSubmitButton.style.display = 'none';
    }
}

var submitCountdown;
function submit()
{
    cancelSubmit();

    submitCountdown = submitDelay;
    // GM_log('submitCountdown = ' + submitCountdown);
    submitHandleTick();
}

function submitHandleTick()
{
    // GM_log('countdown = ' + submitCountdown);

    if (submitCountdown <= 0) {

        cancelSubmit(); // Just to make the 'cancel submit' button go away.
        form.submit();

    } else {

        cancelSubmitButton.innerHTML = 'Submit in ' + submitCountdown + ' seconds<br/>Click here or move selection to cancel';
        cancelSubmitButton.style.display = 'block';

        var tick = submitCountdown - Math.floor(submitCountdown - 0.000001);
        submitCountdown -= tick;
        submitTimer = setTimeout( submitHandleTick, tick * 1000 );
        
    }
}


////////////////////////////////////////
//
// Zoom & Smooth Zoom
//
//

// Bounding box 
var minLeft = 10000000;
var maxLeft = -10000000;
var minTop = 10000000;
var maxTop = -10000000;

// This computes the bounding box of all the images' top left coordinates.
// Used in zooming to shift the image in the appropriate direction, by the
// appropriate amount as it zooms, so that it doesn't zoom off the scren.
function updateImageBoundaries()
{
    // Optimization: if we already appear to have done this, don't do it
    // again.
    if (maxLeft > -10000) {
        return;
    }
    minLeft = 10000000;
    maxLeft = -10000000;
    minTop = 10000000;
    maxTop = -10000000;
    // Figure out where the image is positioned within the
    // cloud of images, so that when we blow it up,
    // we can nudge it to keep its outer edge within the cloud
    // boundary
    for (var i = 0; i < choiceNodes.snapshotLength; i++) {
        var parent = choiceNodes.snapshotItem(i).parentNode;
        maxTop  = (parent.offsetTop > maxTop) ? parent.offsetTop : maxTop;
        maxLeft = (parent.offsetLeft > maxLeft) ? parent.offsetLeft : maxLeft;
        minTop  = (parent.offsetTop < minTop) ? parent.offsetTop : minTop;
        minLeft = (parent.offsetLeft < minLeft) ? parent.offsetLeft : minLeft;
    }
}

// Forces a recalculation of the image cloud boundary, next time we need it.
function invalidateImageBoundaries()
{
    maxLeft = -10000000;
}

// Zooms the given IMG by ZOOMAMT, where ZOOMAMT=0 is equivalent to
// the thumbnail size, ZOOMAMT=1 is fullsize.

function zoomImage(img, zoomamt)
{
    // Figure out how big the original image is, falling back on defaults
    // if the page author didn't specify an explicit width/height by
    // attributes.
    var w = img.getAttribute('width');
    var h = img.getAttribute('height');
    if (w == null) {
        w = defaultImageWidth;
    } else {
        w = w.replace(/[^0-9]+$/, '');
    }
    if (h == null) {
        h = defaultImageHeight;
    } else {
        h = h.replace(/[^0-9]+$/, '');
    }

    // Figure out the thumbnail size as a % of the full size.
    thumbnailW = Math.ceil(w * imageResizePercent / 100);
    thumbnailH = Math.ceil(h * imageResizePercent / 100);

    // Figure out the zoomed size as a % of full size.
    w = w * imageMaxsizePercent / 100;
    h = h * imageMaxsizePercent / 100;
    
    updateImageBoundaries();

    var left;
    if (maxLeft == minLeft) {
        left = 0;
    } else {
        left = Math.ceil((minLeft - img.parentNode.offsetLeft) * (w - thumbnailW) * zoomamt / (maxLeft - minLeft));
    }

    var top;
    if (maxTop == minTop) {
        top = 0;
    } else {
        top = Math.ceil((minTop - img.parentNode.offsetTop) * (h - thumbnailH) * zoomamt / (maxTop - minTop));
    }
    
    img.style.left = left + 'px';
    img.style.top = top + 'px';
    
    img.style.width = Math.ceil(thumbnailW + (w-thumbnailW) * zoomamt) + 'px';
    img.style.height = Math.ceil(thumbnailH + (h-thumbnailH) * zoomamt) + 'px';

    img.style.zIndex = Math.ceil(1 + 100 * zoomamt);

}

// Compute an item's coordinates, relative to the document, and discounting any scrolling
function clientCoords(thing)
{
    var coords = [0,0];
    var offsetThing = thing;
    while (offsetThing != null)
    {
        coords[0] += offsetThing.offsetLeft;
        coords[1] += offsetThing.offsetTop;
        offsetThing = offsetThing.offsetParent;
    }

    var scrolledThing = thing.parentNode;
    while (scrolledThing != null &&
           scrolledThing.parentNode != document.body)
    {
        coords[0] -= scrolledThing.scrollLeft;
        coords[1] -= scrolledThing.scrollTop;
        scrolledThing = scrolledThing.parentNode;
    }
    
    // Now subtract out any scrolled distances
    return coords;
}

// Zoom an image according to how close the mouse is to them.

function proximityZoom(img, mouseX, mouseY)
{

    var zoomamt = 0;

    if ( mouseZoomIsActive ) {
        var coords = clientCoords(img.parentNode);
        var normWidth = img.parentNode.offsetWidth;
        var normHeight = img.parentNode.offsetHeight;
        var centerX = coords[0] + normWidth / 2;
        var centerY = coords[1] + normHeight / 2;

        // Distance normalized to relative width/height, squared.
        var dist = 
            (centerX - mouseX)/normWidth * (centerX - mouseX)/normWidth +
            (centerY - mouseY)/normHeight * (centerY - mouseY)/normHeight;

                                   
/*
// The zoom amount is a piecewise function - inside a certain radius of the image center,
// we rise rapidly toward the center, and top out at 1.0 near the center.
// Outside that radius, it linearily decreases to 0.0 at the maxDist distance.
var tailDist = 0.6*0.6; // The breakpoint, in terms of square of the distance from the center.
var tailZoom = 0.1; // The size the image should be at that distance.
var maxDist = 1.0*1.0; // The distance at which the zoom should become 0.

var zoomamt = Math.max(0, (dist < tailDist) 
? (tailZoom + (1-tailZoom)*(tailDist - dist) / tailDist)
: (tailZoom * (maxDist - dist) / (maxDist - tailDist)) );
*/

        // Well, so much for complicated - This zoom function feels better.
        // It doesn't start zooming until the pointer
        // is actually over the thumbnail, and it rises to full zoom far from the center
        // of the image, so that it stays stable for a wide range of mouse motion.

        if ( useSmoothZoom ) {
            // This makes the image grow gradually as mouse gets closer to center
            zoomamt = Math.max(0, Math.min(1, (0.5*0.5 - dist) * 10));
        } else {
            // Makes image instantly grow/shrink when within one width of center.
            zoomamt = dist < 0.5*0.5 ? 1 : 0;
        }

    }
    zoomImage(img, zoomamt);
}

function proximityZoomAll(mouseX, mouseY) {
    for (var i = 0; i < choiceNodes.snapshotLength; i++)
    {
        var img = choiceNodes.snapshotItem(i);
        proximityZoom(img, mouseX, mouseY);
    }
}

// Mouse event handler that zooms all of the items
// according to the distance from the mouse.

var mouseZoomIsActive = (zoomOnMouseoverKey.length == 0);
var lastMouseX = 0;
var lastMouseY = 0;

function zoomAll(event) {
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
    if ( mouseZoomIsActive )
    {
        proximityZoomAll(event.pageX, event.pageY);
    }
}

if ( useSmoothZoom || zoomOnMouseover ) {
    addEventListener(document,
                     'mousemove',
                     zoomAll,
                     true);

    // If user resizes window, causing the images to re-flow, make sure we
    // recompute the image-cloud boundary.
    addEventListener(window,
                     'resize',
                     function(event) { invalidateImageBoundaries(); },
                     false);

    if ( zoomOnMouseoverKey.length > 0 )
    {
        // Zoom as long as key is held down.
        registerGlobalKeys(zoomOnMouseoverKey,
                           function(key)
                           {
                               mouseZoomIsActive = true;
                               proximityZoomAll(lastMouseX, lastMouseY);
                               return true;
                           },
                           'keydown');
        registerGlobalKeys(zoomOnMouseoverKey,
                           function(key)
                           {
                               mouseZoomIsActive = false;
                               // When mouseZoom is off, this will shrink all images
                               // back to normal size.
                               proximityZoomAll(lastMouseX, lastMouseY);
                               return true;
                           },
                           'keyup');
    }

}


////////////////////////////////////////
//
// Keyboard Acceleration
//

//
// Next/Previous selection key commands
//
var currentChoiceIndex = -1;
var currentChoiceIsValid = false;
var currentChoiceIsSubmittable = false;

// Sets the current user selection to the Nth choice, where N can be
// smaller than 0, or larger than the # of choices - we'll wrap around
// as necessary.

function setCurrentChoice(idx)
{
    cancelSubmit();

    if (choiceNodes.snapshotLength <= 0) {
        return;
    }
    var oldIndex = currentChoiceIndex;

    if (idx < 0) {
        idx = choiceNodes.snapshotLength - 1;
    }
    if (idx >= choiceNodes.snapshotLength) {
        idx = 0;
    }
    currentChoiceIndex = idx;

    // GM_log('new index = ' + currentChoiceIndex);

    // Unhilight the old choice, hilight the new one.
    if (oldIndex >= 0) {
        var oldCh = choiceNodes.snapshotItem(oldIndex);
        oldCh.style.border = 'solid blue 2px';
        zoomImage(oldCh, 0);
    }

    var newCh = choiceNodes.snapshotItem(currentChoiceIndex);
    newCh.style.border = 'solid red 5px';

    if ( zoomOnNavigate ) {
        zoomImage(newCh, 1);
    }

    // Find the accompanying radio button, and select it.  If this
    // is only a HIT preview, the radio button will be there, but
    // disabled.

    var buttonNodes = xpath(newCh, 
                            "ancestor::td/preceding-sibling::td[1]//input[@type='radio' and @class='question selection']");
    // GM_log('  found ' + buttonNodes.snapshotLength + ' sibling buttons');

    currentChoiceIsValid = true;

    if ( buttonNodes.snapshotLength > 0 && !buttonNodes.snapshotItem(0).disabled ) {
        currentChoiceIsSubmittable = true;
        buttonNodes.snapshotItem(0).checked = true;
    }

    // Scroll to make the new choice visible.

    newCh.scrollIntoView(false);
}

function zoomCurrentChoice(zoom)
{
    cancelSubmit();

    if ( !currentChoiceIsValid ) {
        return;
    }
    zoomImage(choiceNodes.snapshotItem(currentChoiceIndex),  zoom);
}


if ( autoSelectFirstItem )
{
    setCurrentChoice(0);
}


//
// Next/Previous keys
//
registerGlobalKeys(prevKeys + nextKeys,
                   function(key)
                   {
                       var inc = 0;
                       
                       if (prevKeys.indexOf(key) >= 0) {
                           
                           inc = -1;
                           
                       } else if (nextKeys.indexOf(key) >= 0) {
                           
                           inc = +1;
                           
                       }
                       
                       setCurrentChoice( currentChoiceIndex + inc );
                       return true;
                   });

// Zoom as long as key is held down.
registerGlobalKeys(zoomKeys,
                   function(key)
                   {
                       zoomCurrentChoice(true);
                       return true;
                   },
                   'keydown');
registerGlobalKeys(zoomKeys,
                   function(key)
                   {
                       zoomCurrentChoice(false);
                       return true;
                   },
                   'keyup');

// Key to Submit the current choice.
registerGlobalKeys(submitKeys,
                   function(key) {
                       if (currentChoiceIsSubmittable) 
                       {
                           submit();
                           return true;
                       }
                       return false;
                   });

// Image hotkeys

for (var i = 0; i < imageHotkeys.length; i++)
{
    (function() {
        var imageIndex = i;
        registerGlobalKeys( imageHotkeys[i].keys,
                            function(key) {
                                setCurrentChoice( imageIndex );
                                if ( submitOnHotkey ) {
                                    submit();
                                }
                                return true;
                            });
    })();                            
}


// 'a' accepts the HIT
var abl = xpath(document, "//a[starts-with(@href, '/mturk/accept')]");
if (abl.snapshotLength > 0) {
    clickOnKeystroke(abl.snapshotItem(0), acceptKeys);
}

// 's' skips the HIT.  N.B.: Active HIT pages have a hidden anchor in
// them for their own purposes - filter those out.
var sbl = xpath(document, "//a[starts-with(@href, '/mturk/preview') and not(contains(@href,'isPreviousHitExpired'))]");
if (sbl.snapshotLength > 0) {
    clickOnKeystroke(sbl.snapshotItem(0), skipKeys);
}

// 'r' returns the HIT
var rbl = xpath(document, "//a[starts-with(@href, '/mturk/return')]");
if (rbl.snapshotLength > 0) {
    clickOnKeystroke(rbl.snapshotItem(0), returnKeys);
}

// 'y' yellowpages
clickOnKeystroke(yellowPagesLink, yellowPagesKeys);

// 'g' google
clickOnKeystroke(googleMapLink, googleMapKeys);



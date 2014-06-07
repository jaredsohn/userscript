// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Amazon Mechanical Turk Quicker Artist Name
// @namespace       http://youkai.org
// @description     Optimizations to MechTurk Artist name HITs
// @include         http://www.mturk.com/mturk/*
// ==/UserScript==
//
// TODO: FEATURE: help popups for options.

var rcsVersion = "$Id: MTurkArtistName.user.js,v 1.8 2005/12/06 06:29:53 Chris Exp Chris $"
var versionString = rcsVersion.match( /[\d.]+ \d+\/\d+\/\d+ \d+:\d+:\d+/ );

// The UI alterations this script performs, are probably only appropriate
// for the A9 block-image HITs.

if (document.body.innerHTML.search('Music -- Confirm Artist Name') < 0) {
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


// Fetches a boolean option's value.
function boolOption (name, defaultVal) {
    return GM_getValue(name, defaultVal ? 'yes' : '').length > 0;
}
// Stores the value of a booelan option.
function setBoolOption (name, val) {
    GM_setValue(name, val ? 'yes' : '');
}

// Fetches an option as a string.
function stringOption (name, defaultVal) {
    return GM_getValue(name, defaultVal);
}
// Stores a string option.
function setStringOption (name, val) {
    GM_setValue(name, val);
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
    
// Find the possible answers from which you're supposed to select.
var choiceNodes =  xpath(document, "//li[@class='question-list-item']");
var answerBoxList = xpath(document, "//input[@class='question free-text']");
var answerBox = null;
if (answerBoxList.snapshotLength > 0) {
    answerBox = answerBoxList.snapshotItem(0);
} else {
    return;
}

// Make sure 'various artists' is one of the choices.
if (choiceNodes.snapshotLength > 0) {
    var firstChoiceNode = choiceNodes.snapshotItem(0);
    var li = firstChoiceNode.cloneNode(false);
    li.innerHTML = 'Various Artists';
    firstChoiceNode.parentNode.insertBefore(li, firstChoiceNode);
    choiceNodes =  xpath(document, "//li[@class='question-list-item']");
}

var useAggressiveHide = boolOption('aggressive_hide', false);
var autoSelectFirstItem = boolOption('select_first_item', false);
var nextKeys = stringOption('nextKeys', 'N');
var prevKeys = stringOption('prevKeys', 'P');
var skipKeys = stringOption('skipKeys', 'S');
var acceptKeys = stringOption('acceptKeys', 'A');
var returnKeys = stringOption('returnKeys', 'R');
var submitKeys = stringOption('submitKeys', String.fromCharCode(13) );
var submitOnClick = boolOption('submitOnClick', false);
var submitDelay = parseFloat(stringOption('submitDelay', '0'));
if (submitDelay < 0) { submitDelay = 0; }

// Check to see if user has already selected the answer for this accepted
// HIT.  If so, fill it in, and submit.

if (submitOnClick && !answerBox.disabled)
{
    var answers = getStoredAnswers();
    // The hitId in an accepted HIT page is not the same string
    // as hitId in a preview HIT page.  the Preview hit is a prefix of the full hit.
    var fullHit = form.elements.namedItem('groupId').value + ':' + form.elements.namedItem('hitId').value;
    for (var i in answers)
    {
        if (fullHit.indexOf(i) == 0) { // match
            answerBox.value = answers[i];
            answers[i] = null;
            setStoredAnswers(answers);
            submitDelay = 0;
            submit();
            break;
        }
    }

}


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
titlebar.innerHTML = 'Options';
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
column1.appendChild( makeBoolOption('Click to Submit', 'submitOnClick', submitOnClick) );
column1.appendChild( makeStringOption('Submit Delay (seconds)', 'submitDelay', submitDelay + '', 3) );

column1.appendChild( optionGroupTitle('Layout Settings') );
column1.appendChild( makeBoolOption('Hide Junk', 'aggressive_hide', useAggressiveHide) );
column2.appendChild( optionGroupTitle('Keyboard Settings') );

column2.appendChild( makeBoolOption('Auto-Select First Item', 'select_first_item', autoSelectFirstItem) );

column2.appendChild( makeKeyOption( 'Accept', 'acceptKeys', acceptKeys ) );
column2.appendChild( makeKeyOption( 'Skip', 'skipKeys', skipKeys ) );
column2.appendChild( makeKeyOption( 'Prev', 'prevKeys', prevKeys ) );
column2.appendChild( makeKeyOption( 'Next', 'nextKeys', nextKeys ) );
column2.appendChild( makeKeyOption( 'Submit', 'submitKeys', submitKeys ) );
column2.appendChild( makeKeyOption( 'Return', 'returnKeys', returnKeys ) );

optionsMenu.appendChild( optionsTable );

optionsMenu.appendChild( optionGroupTitle( 'Album Search Links ("*" will be substituted with title)' ));
var searchURLGroup = document.createElement('div');
optionsMenu.appendChild(searchURLGroup);

var searchURLs = [];

function populateSearchURLGroup()
{
    while (searchURLGroup.firstChild != null) {
        searchURLGroup.removeChild(searchURLGroup.firstChild);
    }

    // Read the search URLs from config
    var sstr = stringOption('searchURLs', '([["Amazon Search","http://www.amazon.com/exec/obidos/search-handle-url/?url=index%3Dmusic&field-keywords=*"], ["Freedb", "http://www.freedb.org/freedb_search.php?allfields=NO&fields=title&allcats=YES&grouping=none&words=*"]])');

    // GM_log('str = ' + sstr);
    try {
        searchURLs = eval(sstr);
    } catch (e) {
        GM_log('Problem parsing "' + sstr + '" URLs: ' + e);
        searchURLs = [];
    }

    // GM_log('searchURLs.length = ' + searchURLs.length);
    for (var i in searchURLs) {
        (function() {
            var index = i;
            searchURLGroup.appendChild( makeStringOption( null,
                                                          function(val) {
                                                              updateSearchURLs(index, val, searchURLs[index][1]);
                                                          },
                                                          searchURLs[index][0],
                                                          10,
                                                          { display: 'inline'} ) );
            searchURLGroup.appendChild( makeStringOption( null,
                                                          function(val) {
                                                              updateSearchURLs(index, searchURLs[index][0], val);
                                                          },
                                                          searchURLs[index][1],
                                                          40,
                                                          { display: 'inline'}  ) );
            searchURLGroup.appendChild(document.createElement('br'));
        })();
    }
    // Add a blank one to add more.
    searchURLGroup.appendChild( makeStringOption( null,
                                                  function(val) {
                                                      updateSearchURLs(searchURLs.length, val, '');
                                                  },
                                                  '',
                                                  10,
                                                  { display: 'inline'}  ) );
    searchURLGroup.appendChild( makeStringOption( null,
                                                  function(val) {
                                                      updateSearchURLs(searchURLs.length, '', val);
                                                  },
                                                  '',
                                                  40,
                                                  { display: 'inline'}  ) );
    searchURLGroup.appendChild(document.createElement('br'));

}

function updateSearchURLs(index, name, value)
{
    if (name.length > 0 || value.length > 0 )
    {
        var newSearch = [name, value];
        if (index >= searchURLs.length)  // Add a new one to end
        {
            searchURLs.push(newSearch);
        } 
        else  // Update existing one
        {
            searchURLs[index] = newSearch;
        }
    }
    else // Delete a search
    {
        if (index < searchURLs.length)
        {
            searchURLs.splice(index, 1);
        }
    }
    
    // GM_log('new length = ' + searchURLs.length);

    // Save the new array to config.
    var val = '([';
    for (var i in searchURLs)
    {
        if (i > 0) { val += ','; } 
        val += '[' + stringize(searchURLs[i][0]) + ',' + stringize(searchURLs[i][1]) + ']';
    }
    val += '])';

    // GM_log('new search = ' + val);

    GM_setValue('searchURLs', val);

    populateSearchURLGroup();
}

populateSearchURLGroup();

optionsMenu.appendChild( optionGroupTitle('Changes will take effect on the next page<br/><span style="font-style:italic;font-size:smaller;">ver: ' + versionString + '</span>') );

document.body.insertBefore(optionsWidget, document.body.firstChild);

// Click the title to toggle the options menu open and closed.

var disableGlobalKeys = false;

addEventListener(titlebar,
                 'click',
                 function(event) {
                     if ( optionsMenu.style.display == 'none' ) 
                     {
                         optionsMenu.style.display = 'block';
                         optionsWidget.style.opacity = 1;
                         populateSearchURLGroup();
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

function makeStringOption (label, optionName, initial, length, style)
{
    var group = document.createElement('div');
    if (style != null) {
        for (var p in style) {
            group.style[p] = style[p];
        }
    }
    if (label != null) {
        group.appendChild(text(label + ':'));
    }
    var keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.size = length;
    keyInput.value = initial;
    addEventListener(keyInput,
                     'change',
                     function(event) {
                         if (typeof(optionName) == 'function') {
                             optionName(event.target.value);
                         } else {
                             setStringOption(optionName, event.target.value);
                         }
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

// Creates an anchor
function anchor(content, href, target) {
    var a = document.createElement('a');
    a.href = href;
    if (target != null) {
        a.target = target;
    }
    a.appendChild(text(content));
    return a;
}

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
                
                // GM_log('disableGlobalKeys = ' + disableGlobalKeys);
                if (disableGlobalKeys || event.altKey || event.ctrlKey || event.metaKey) {
                    return;
                }
                // GM_log(eventType + ': ' + event.which + ' ' + event.charCode +' ' + event.keyCode);
                // GM_log('keypress not alt: ' + keys + ',' + String.fromCharCode(event.keyCode));
                // GM_log('testing against ' + keys + ' (' + keys.charCodeAt(0) + ')');
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

function followLink(anchor)
{
    window.open(anchor.href,
                anchor.target ?
                anchor.target : '_self');
}

function clickOnKeystroke(anchor, keys)
{
    if (anchor) {
        anchor.appendChild(text('(' + printableKeys(keys[0]) + ') ' ) );
        registerGlobalKeys(keys,
                           function(key)
                           {
                               followLink(anchor);
                               return true;
                           });
    }
}



//////////////////////////////////////////
//
// Make more room for the images.
//

// Get rid of various junk taking up screen real-estate.  I expect
// this will break the second Amazon tweaks anything in the page.

if ( useAggressiveHide ) 
{
    // Everything preceeding the HIT question area.
    hideXPath(document, "//div[@id='hit-wrapper']/ancestor-or-self::*/preceding-sibling::*[not(@class='redbox')]");

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

    hideXPath(document, "//div[@id='overview-wrapper']");

}


//////////////////////////////////////////
//
// Perform processing on all the images.
//

for (var i = 0; i < choiceNodes.snapshotLength; i++) {

    var img = choiceNodes.snapshotItem(i);

    img.style.cursor = 'pointer';
    img.style.border = 'solid #aaaaff 1px';
    addEventListener(img,
                     'click',
                     function(event) {
                         answerBox.value = event.target.firstChild.data;
                         if (submitOnClick) {
                             submit();
                         }
                     },
                     false);
    
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
    if (answerBox.value.length > 0) {
        cancelSubmit();

        submitCountdown = submitDelay;
        // GM_log('submitCountdown = ' + submitCountdown);
        submitHandleTick();
    }
}

function stringize(raw)
{
    raw = raw.replace('\\', '\\\\');
    raw = raw.replace('\n', '\\n');
    raw = raw.replace("'", "\\'");
    raw = raw.replace('"', '\\"');
    return '"' + raw + '"';
}

function getStoredAnswers()
{
    return eval(GM_getValue('answerMemory', '({})'));
}
function setStoredAnswers(answers)
{
    var newAnswers = new Array();
    for (var i in answers) {
        if (answers[i] != null) {
            newAnswers.push( stringize(i) + ':' + stringize(answers[i]) );
        }
    }
    var out = '({' + newAnswers.join(',') + '})';
    GM_setValue('answerMemory', out);
}

function submitHandleTick()
{
    // GM_log('countdown = ' + submitCountdown);

    if (submitCountdown <= 0) {

        cancelSubmit(); // Just to make the 'cancel submit' button go away.

        if (answerBox.disabled) {
            var answers = getStoredAnswers();
            answers[form.elements.namedItem('groupId').value + ':' + form.elements.namedItem('hitId').value] = answerBox.value;
            setStoredAnswers(answers);

            // MTurk doesn't like it when the preview form already has the answer.
            answerBox.value = '';
            accept();
        } else {
            form.submit();
        }
        
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
// Add search links.
//

var artistNameList = xpath(document, "//*[@class='question title']/text()");
if (artistNameList.snapshotLength > 0) {
    var artistName = artistNameList.snapshotItem(0);
    var linkNext = artistName.parentNode.nextSibling;

    // If there's cover art with the question, then the leading portion of the
    // jpg filename is the Amazon ASIN of the product.  Use it to link directly
    // to the product page on Amazon.
    var coverArtList = xpath(form, "//img[@class='question binary image']");
    if (coverArtList.snapshotLength > 0) {
        var coverArt = coverArtList.snapshotItem(0);
        var asin = coverArt.src.match( /[A-Z0-9]{10}/ );

        linkNext.parentNode.insertBefore(text(' | '), linkNext);
        linkNext.parentNode.insertBefore(
            anchor('Amazon Product Page', 'http://www.amazon.com/gp/product/' + asin, '_amzn_product'),
            linkNext);
    }

    // User-configurable search URL
    for (var i in searchURLs)
    {
        // GM_log('processing search ' + i);
        var url = searchURLs[i][1].replace("*", urlize(artistName.data) );
        var b = anchor( (searchURLs[i][0].length > 0) 
                        ? searchURLs[i][0] 
                        : ('Search ' + i),
                        url,
                        '_search_' + i);
        linkNext.parentNode.insertBefore(text(' | '), linkNext);
        linkNext.parentNode.insertBefore(b, linkNext);
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

    // Unhilight the old choice, hilight the new one.
    if (oldIndex >= 0) {
        var oldCh = choiceNodes.snapshotItem(oldIndex);
        oldCh.style.border = 'solid #aaaaff 1px';
    }

    var newCh = choiceNodes.snapshotItem(currentChoiceIndex);
    newCh.style.border = 'solid red 1px';

    answerBox.value = newCh.firstChild.data;
}

if ( autoSelectFirstItem )
{
    setCurrentChoice(0);
}


//
// Next/Previous keys
//
// GM_log(prevKeys + nextKeys);

registerGlobalKeys(prevKeys + nextKeys,
                   function(key)
                   {
                       // GM_log('reached Line 733');
                       var inc = 0;
                       
                       if (prevKeys.indexOf(key) >= 0) {
                           
                           inc = -1;
                           
                       } else if (nextKeys.indexOf(key) >= 0) {
                           
                           inc = +1;
                           
                       }
                       
                       setCurrentChoice( currentChoiceIndex + inc );
                       return true;
                   });

// Key to Submit the current choice.
registerGlobalKeys(submitKeys,
                   function(key) {
                       submit();
                       return true;
                   });

// This is to fix the page's broken "submit on enter" from within
// the answer box.

addEventListener(answerBox,
                 'keypress',
                 function(event) {
                     if (event.keyCode == 13) {
                         submit();
                         event.preventDefault();
                         event.stopPropagation();
                     }
                 },
                 false);
if (!answerBox.disabled) {
    answerBox.focus();
    // .focus() doesn't always invoke the focus handler
    disableGlobalKeys = true;
}

// 'a' accepts the HIT
var abl = xpath(document, "//a[starts-with(@href, '/mturk/accept')]");
if (abl.snapshotLength > 0) {
    clickOnKeystroke(abl.snapshotItem(0), acceptKeys);
}
function accept()
{
    if (abl.snapshotLength > 0) {
        followLink(abl.snapshotItem(0));
    }
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

// When answer box has the focus, don't use global keys
addEventListener(answerBox,
                 'focus',
                 function(event) {
                     // GM_log('DISABLING');
                     disableGlobalKeys = true;
                 },
                 false);
addEventListener(answerBox,
                 'blur',
                 function(event) {
                     // GM_log('ENABLING');
                     disableGlobalKeys = false;
                 },
                 false);


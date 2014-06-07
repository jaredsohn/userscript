// ------------------------------------------------------------------------------------------------------------
// StumbleUpon Annotator
// version 0.9.11 BETA
// ------------------------------------------------------------------------------------------------------------
// ...................................................
// Dirtbagbubble Freeware License
// ...................................................
// Use this script and learn from it as you please,
// under following conditions:
//
// (1) You may use parts of this script in your own
//     work, like functions, classes, components or
//     "namespaces".
//
// (2) Don't claim parts of this script or the whole
//     script as your own work.
//
// (3) Don't use parts of this script or the whole
//     script in order to create another script
//     that essentially does the same like this one.
//     That's pointless and rude.
//
// (4) If you're using larger parts of this script,
//     provide a link to this script, so other
//     people can learn from it, too.
//
// (5) Re-using parts of this script in other scripts
//     for commercial purposes is only allowed with
//     my written consent.
//
// (6) Never ever obfuscate any part of my script.
//     Code obfuscation is evil.
//     However, if you want to compress your script
//     you should add a proper attribution of the
//     origin of my code parts to your script, so
//     people can see the original.
// ------------------------------------------------------------------------------------------------------------
// History:
//      v0.1 BETA Initial version.
//      v0.2 BETA Fix for XPath detection. SU displays some reviews
//                with random spaces in between.
//      v0.3 BETA Extension does now check for the page's existence in the SU database.
//      v0.4 BETA Bugfix and small interface improvement.
//      v0.5 BETA Since GreaseMonkey's commands menu is pretty broken I had to
//                replace the menu item by a toolbar that is added to the top
//                of the page.
//      v0.6 BETA Fixed a lockup on pages with high amounts of comments.
//      v0.7 BETA Some CSS styles fixed.
//      v0.8 BETA Added automatic update checker.
//      v0.9 BETA Added close button and annotators quicklinks to toolbar.
//      v0.9.1 BETA Interface improvements and fixes.
//      v0.9.2 BETA Bugfix: The review page couldn't be retrieved for some URLs with
//                  special characters. Added some additional checks that improve
//                  stability.
//      v0.9.3 BETA Improved annotation mode - elements are highlighted with a
//                  semi-transparent, red overlay, that does not change the page's layout.
//      v0.9.4 BETA Annotations can be switched on or off now.
//      v0.9.5 BETA Bugfix: HTML formattings were removed from existing reviews. That's
//                          fixed, now and everything is preserved.
//      v0.9.6 BETA Added functionality for hiding and beautifying those hideous [SUA]-tags :-)
//                  Some contraints added that limit the amount of characters and annotations.
//                  StumbleUpon.com is now allowed for annotations.
//      v0.9.7 BETA Larger text blocks can now be annotated in between.
//                  A couple of improvements, like keyboard shortcuts for toggling the toolbar.
//                  Increased stability.
//      v0.9.8 BETA - 2010-03-16
//              - Complete code refactoring.
//              - Added edit toolbar for own annotations (change, move, delete)
//      v0.9.8.1 BETA - 2010-03-17
//              A few fixes. Annotation mode can be properly canceled now. Just click ESC
//              or the "Add Annotation" button again. Added another menu entry and
//              hotkey for adding annotations without clicking the according button
//              (<CTRL> + <ALT> + C)
//      v0.9.9 BETA - 2010-03-19
//              Added "scribbles" feature (yay!)
//      v0.9.9.3 BETA - 2010-03-21
//              A few fixes. Added protection for sensitive pages.
//              Added an issue / error reporting function. Added hotkeys for turning off SUA
//              and expanding/collapsing all annotations at once.
//      v0.9.9.7 BETA - 2010-03-23
//              Improved annotation positioning by creating smarter XPath expressions.
//              Support for "special characters" added with help of URL component encoding
//              of these. This is by the way a proper fix for the "random spaces" bug
//              of SU's review pages.
//      v0.9.9.8 BETA - 2010-03-23
//              Added "don't show warning again" option for sensitive page warning message.
//      v0.9.9.9 BETA - 2010-03-24
//              Improved error reporting.
//              Fix for "HTMLDocument.createElement permission denied error message"
//      v0.9.10 BETA - 2010-03-31
//              Another fix for permission denied error. Fixed duplicate annotations problem
//              for stumbles with more than one review sub-page. Fix for proper deletion
//              of the last annotation if SUA has created a new review during the current
//              page visit / script execution.
//      v0.9.11 BETA - 2010-04-05
//              Added special selection mode for selecting any text position (right click a red
//              text block).
// ==UserScript==
// @name          StumbleUpon Annotator
// @description   Lets you add and share page annotations with the StumbleUpon community
// @include       http://*
// @include       https://*
// @version       0.9.11 BETA
// @author        dirtbagbubble
// @license       Freeware - (c) 2010 by dirtbagbubble (at yahoo dot com). See script for details.
// ==/UserScript==

// ------------------------------------------------------------------------------------------------------------
// "CONSTANT" DEFINITIONS -------------------------------------------------------------------------------------

var MAX_ALLOWED_USER_ANNOTATIONS = 8;
var MAX_ALLOWED_ANNOTATION_LENGTH = 500;
var MAX_SCRIBBLE_CODE_LENGTH = 1024;
var MAX_SCRIBBLE_CAPTION_LEN = 128;
var SCRIBBLE_PEN_MOUSEMOVE_RES = 7;

// ------------------------------------------------------------------------------------------------------------
// PROTOTYPE EXTENSIONS ---------------------------------------------------------------------------------------

/**
 * Removes every occurrence of the specified value from the array.
 *
 * @param value The value to remove from the array.
 * @return Number - The number of removed array cells.
 */
Array.prototype.removeValue = function(value) {
    var count = 0;

    for(var i = 0; i < this.length; ++i) {
        if(this[i] == value) {
            this.splice(i, 1);
            --i;
            ++count;
        }
    }

    return count;
};

/**
 * Encodes a string for use as URL parameter (query part).
 * I know that there are JavaScript functions to do that job, but this is
 * a special method for SU.
 *
 * NOTE I had to implement some workarounds, since SU handles URL parameters in
 *      a broken manner. They use to double encode the parameters, so the
 *      percent-character becomes encoded again into %25
 *
 * @return String
 */
String.prototype.paramEncode = function() {
    // Following is actually wrong, but we need to do it that way because
    // SU messes up the encoding of the URLs ... saaad panda :-(
    return encodeURI(this).replace(/=/g, '%253D')
                          .replace(/&/g, '%2526')
                          .replace(/\?/g, '%253F')
                          .replace(/\+/g, '%252B')
                          .replace(/:/g, '%253A');
};

String.prototype.whitespace = " \t\n\r\0\x0B\xA0";

/**
 * Returns a version of this string which is limited to len characters.
 *
 * @param len The maximum length of the string.
 * @return string
 */
String.prototype.ellipse = function(len) {
    if(this.length > len) {
        return this.substr(0, len) + "...";
    } else {
        return this;
    }
};

/**
 * Removes whitespace from the beginning of the string.
 *
 * @param max Maximum number of characters to remove.
 * @return The stripped string.
 */
String.prototype.trimLeft = function(max) {
    var i;
    if(typeof(max) == 'undefined') max = this.length;

    for(i = 0; i < max; ++i) {
        if(this.whitespace.indexOf(this.substr(i, 1)) == -1) break;
    }

    return this.substr(i);
};

/**
 * Removes whitespace from the end of the string.
 *
 * @param max Maximum number of characters to remove.
 * @return String - stripped version.
 */
String.prototype.trimRight = function(max) {
    var i;
    if(typeof(max) == 'undefined') max = 0;

    for(i = this.length - 1; i >= max; --i) {
        if(this.whitespace.indexOf(this.substr(i, 1)) == -1) break;
    }

    return this.substr(0, i + 1);
};

/**
 * Removes whitespace from the beginning and the end of the string. Returns a
 * stripped string.
 *
 * @return String
 */
String.prototype.trim = function() {
    return this.trimLeft().trimRight();
};

/**
 * Removes unnecessary whitespace from the string.
 * e.g.: INPUT: I    like        chocolate.
 *       OUTPUT: I like chocolate.
 *
 * @return String
 */
String.prototype.normalizeWhiteSpace = function() {
    return this.replace(/([^\s])\s+([^\s])/g, '$1 $2').trim();
};

/**
 * Pads the String (aligned to the right).
 *
 * @param char The padding character to use.
 * @param len The maximum length of the result string.
 * @return String - padded.
 */
String.prototype.pad = function(char, len) {
    var maxLen = len - this.length;
    var pad = "";

    for(var i = 0; i < maxLen; ++i) {
        pad += char;
    }

    return pad + this;
};

// ------------------------------------------------------------------------------------------------------------
// CLASSES ----------------------------------------------------------------------------------------------------

/**
 * General purpose toolbar class.
 *
 * @param content The toolbar's content (must be a Element node).
 * @param cssBackground A string that denotes a background image or color (CSS-style).
 */
function Toolbar(content, cssBackground) {
    var self = this;
    var closeButton = document.createElement('img');
    closeButton.setAttribute('src', Resources.closeButton);
    closeButton.style.cssFloat = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.style.border = 'none 0px';
    closeButton.style.outline = 'none 0px';
    closeButton.style.margin = '2px';
    closeButton.style.padding = '0px';

    closeButton.addEventListener('click', function() {
        self.detach();
    }, false);

    this.domNode = document.createElement('div');
    this.domNode.appendChild(closeButton);
    this.domNode.appendChild(content);
    this.domNode.style.fontFamily = 'sans-serif';
    this.domNode.style.fontWeight = 'bold';
    this.domNode.style.color = '#5E4300';
    this.domNode.style.fontSize = '12px';
    this.domNode.style.margin = '0px';
    this.domNode.style.textAlign = 'left';
    this.domNode.style.height = '22px';
    this.domNode.style.borderBottom = '1px solid black';
    this.domNode.style.position = 'fixed';
    this.domNode.style.width = '100%';
    this.domNode.style.background = cssBackground;
    this.domNode.style.zIndex = '2000000001';
    this.domNode.style.top = '0px';
    this.domNode.style.left = '0px';
    this.domNode.style.MozBoxShadow = '1px 1px 4px #000000';
}

/**
 * Attaches the toolbar to the page.
 *
 * @param overlay Boolean that indicates that the toolbar may cover
 *        the top 22 pixels of the document. If set to false, additional
 *        22 pixels space is added to the top, so the toolbar doesn't
 *        cover the document when the window is scrolled to the top.
 */
Toolbar.prototype.attach = function(overlay) {
    if(overlay) {
        document.body.insertBefore(this.domNode, document.body.firstChild);
    } else {
        this.dummyBar = document.createElement('div');
        this.dummyBar.appendChild(this.domNode);
        this.dummyBar.style.height = '22px';
        this.dummyBar.style.margin = '0px';
        this.dummyBar.style.padding = '0px';
        document.body.insertBefore(this.dummyBar, document.body.firstChild);
    }
};

Toolbar.prototype.detach = function() {
    if(this.dummyBar) {
        document.body.removeChild(this.dummyBar);
        this.dummyBar = null;
    } else {
        document.body.removeChild(this.domNode);
    }

    if(this.onClose) this.onClose();
};

/**
 * Component for checking for a new version of this script.
 * Must be instantiated as a new object.
 *
 * @param scriptId This script's userscripts.org id
 * @param thisVersion This script's current version.
 */
function UpdateChecker(scriptId, thisVersion) {
    this.scriptId = scriptId;
    this.thisVersion = thisVersion;
    this.onClose = false;

    /**
     * Adds an update notification bar to the top of the current page.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     */
    this.onUpdateAvailable = function(infos, overlay) {
        var noti = document.createElement('div');
        noti.style.margin = '2px';
        noti.innerHTML = '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' +
                         Resources.warningSign + '"> An update is available for <i><a style="font-decoration:underline;color:black" target="_blank" href="' +
                         infos.infoPageUrl + '">' +
                         infos.scriptName + '</a></i>: ';

        var installButton = document.createElement('a');
        installButton.innerHTML = 'Install version ' + infos.version;
        installButton.style.padding = '2px';
        installButton.style.MozBorderRadius = '5px';
        installButton.style.border = 'solid 1px black';
        installButton.style.backgroundColor = 'white';
        installButton.style.color = 'black';
        installButton.setAttribute('href', infos.url);

        installButton.addEventListener('click', function() {
            tb.detach();
        }, false);

        noti.appendChild(installButton);

        var tb = new Toolbar(noti, Resources.toBackgoundImage(Resources.yellowToolbarGradient));
        tb.onClose = this.onClose;
        tb.attach(overlay);
    };

    /**
     * Checks for an update on userscripts.org
     * If available, the according event handler this.onUpdateAvailable is called.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     * @param callback An optional function that is called after the update check has occurred.
     *                The availability of an update is passed to it as a boolean value.
     */
    this.checkForUpdate = function(overlay, callback) {
        var self = this;
        var infoPageUrl = 'http://userscripts.org/scripts/show/' + this.scriptId;

        GM_xmlhttpRequest({
            method: "GET",
            url: infoPageUrl,

            onload: function(response) {
                var currentVersion = (/<div\s+id=["']summary["']>(.|\s)+?<b>\s*Version:\s*<\/b>\s*([^<\n]+)/i).exec(response.responseText)[2];
                var scriptName = (/<h1\s+class=["']title["']>([^<]+)<\/h1>/i).exec(response.responseText)[1];

                if(currentVersion != self.thisVersion) {
                    self.onUpdateAvailable({version : currentVersion,
                                            url : 'http://userscripts.org/scripts/source/'
                                                  + self.scriptId + '.user.js',
                                            'scriptName' : scriptName,
                                            'infoPageUrl' : infoPageUrl}, overlay);
                    if(callback) callback(true);
                } else {
                    if(callback) callback(false);
                }
            }
        });
    };

    /**
     * Starts the automatic update checking routine.
     * Every 10th time this script is executed, an update check will be done.
     *
     * @param overlay If set to true, the notification bar will overlay the top
     *                of the page without creating an additional gap.
     * @param callback An optional function that is called after the update check has occurred.
     *                The availability of an update is passed to it as a boolean value.
     */
    this.start = function(overlay, callback) {
        var current = GM_getValue('update_counter');

        if(!current) {
            current = 0
        }

        ++current;

        if(current >= 10) {
            this.checkForUpdate(overlay, callback);
            current = 0;
        } else {
            if(callback) callback(false);
        }

        GM_setValue('update_counter', current);
    };
}

// ------------------------------------------------------------------------------------------------------------
// TINY QUERY

/**
 * Tiny Query class.
 */
function TQuery() {
    this.nodes;
}

/**
 * Performs an XPath query on the specified context node or document.
 *
 * @param xpath The XPath query expression as String.
 * @param context An optional context Element node. If not specified, window.document will be
 *        taken instead.
 * @return TQuery (self-reference for method chaining)
 */
TQuery.prototype.query = function(xpath, context) {
    if(!context) context = document;
    var result = document.evaluate(xpath, context, null, XPathResult.ANY_TYPE, null);
    this.nodes = new Array;

    while(element = result.iterateNext()) {
        this.nodes.push(element);
    }

    return this;
};

/**
 * Calls a function for each of the query result set nodes.
 *
 * @param func The function to call. The current iteration's result set node
 *        is passed as parameter to this function.
 * @return TQuery (self-reference for method chaining)
 */
TQuery.prototype.each = function(func) {
    for(var i = 0; i < this.nodes.length; ++i) {
        func(this.nodes[i]);
    }

    return this;
};

/**
 * Sets the inner HTML for each result set node.
 *
 * @param html The HTML code to set.
 * @return TQuery (self-reference for method chaining)
 */
TQuery.prototype.setInnerHTML = function(html) {
    return this.each(function(node) {
        node.innerHTML = html;
    });
};

/**
 * Calls a function if the query result set is empty.
 *
 * @param func The function to call.
 * @return TQuery (self-reference for method chaining)
 */
TQuery.prototype.ifEmpty = function(func) {
    if(!this.nodes.length) func();

    return this;
};

/**
 * Entry point for performing queries.
 *
 * @param a An XPath expression.
 * @param b An optional context node (see TQuery.query).
 * @return TQuery
 */
var $ = function(a, b) {
    return (new TQuery).query(a, b);
};

// ------------------------------------------------------------------------------------------------------------
// COLOR

/**
 * Color data type.
 */
function Color(init, g, b, a) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1.0;

    switch(typeof(init)) {
        case 'string':
            this.setByString(init);
            break;

        case 'object':
            this.r = init.r;
            this.g = init.g;
            this.b = init.b;
            this.a = init.a;
            break;

        case 'number':
            this.r = init;
            this.g = g;
            this.b = b;
            this.a = a;

        case 'undefined':
            break;

        default:
            throw('Illegal initialization data for Color object.');
    }
}

/**
 * Sets the local properties by a string.
 *
 * @param str A HTML hex color code #RRGGBB, rgb(r,g,b) or rgba(r,g,b,a).
 */
Color.prototype.setByString = function(str) {
    var elms;

    if(elms = str.match(/rgb[ ]*\([ ]*(\d+)[ ]*,[ ]*(\d+)[ ]*,[ ]*(\d+)[ ]*\)/)) {
        this.r = parseInt(elms[1]);
        this.g = parseInt(elms[2]);
        this.b = parseInt(elms[3]);
    } else {
        if(elms = str.match(/rgba[ ]*\([ ]*(\d+)[ ]*,[ ]*(\d+)[ ]*,[ ]*(\d+)[ ]*,[ ]*([\d\.]+)[ ]*\)/)) {
            this.r = parseInt(elms[1]);
            this.g = parseInt(elms[2]);
            this.b = parseInt(elms[3]);
            this.a = parseFloat(elms[4]);
        } else {
            if(elms = str.match(/#([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})/i)) {
                this.r = parseInt(elms[1], 16);
                this.g = parseInt(elms[2], 16);
                this.b = parseInt(elms[3], 16);
            } else {
                throw('Cannot recognize color string "' + str + '"');
            }
        }
    }
};

/**
 * Blends this color to the specified target color.
 *
 * @param color The target color to blend to.
 * @param percent The degree of blending this color to the other in percent.
 * @return Color - the blended Color object.
 */
Color.prototype.blendTo = function(color, percent) {
    var blended = new Color;
    var step = Math.abs(this.r - color.r) / 100;
    var sign = this.r > color.r ? -1 : 1;
    blended.r = this.r + sign * Math.round(step * percent);
    step = Math.abs(this.g - color.g) / 100;
    sign = this.g > color.g ? -1 : 1;
    blended.g = this.g + sign * Math.round(step * percent);
    step = Math.abs(this.b - color.b) / 100;
    sign = this.b > color.b ? -1 : 1;
    blended.b = this.b + sign * Math.round(step * percent);
    step = (this.a - color.a) / 100;
    sign = this.a > color.a ? -1 : 1;
    blended.a = this.a + sign * step * percent;

    return blended;
};

/**
 * Magic method that is invoked if this object is concatenated with a string.
 * Transforms the local properties into an rgb(r,g,b) or rgba(r,g,b,a) string.
 *
 * @param withAlpha Boolean that indicates that a rgba-string has to be returned.
 * @return String
 */
Color.prototype.toString = function(withAlpha) {
    if(withAlpha) {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    } else {
        return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    }
};

// ------------------------------------------------------------------------------------------------------------
// SCRIBBLE CANVAS

/**
 * A drawing canvas component for annotation scribbles.
 */
function ScribbleCanvas(code) {
    var self = this;
    this._lastTick = (new Date).getTime();
    this._lastColor;
    this._lastStrokeWidth;
    this._startX;
    this._startY;
    this._lastX;
    this._lastY;
    this._lastW;
    this._lastH;
    this.attachedTo;

    // Keeps track of all strokes
    this.codeStack = new Array('CLEAR');
    // Keeps track of a single stroke
    this.codeCache = new Array;
    // The current undo/redo pointer
    this.codeStackIdx = 1;
    // The current drawing mode
    this.mode = ScribbleCanvas.MODE_PEN;
    // The current color
    this.color = 'rgba(0,0,0,0.7)';
    // The line width in pixels
    this.strokeWidth = 2;
    // The rounded box corner radius
    this.cornerRadius = 10;

    this.maximumCodeLength = MAX_SCRIBBLE_CODE_LENGTH;
    this.penMouseMoveResolution = SCRIBBLE_PEN_MOUSEMOVE_RES;

    // The canvas node
    this.domNode = document.createElement('canvas');
    this.domNode.style.position = 'absolute';
    this.domNode.style.zIndex = '1999999998';
    this.domNode.style.MozBoxShadow = '1px 1px 4px #000000';
    this.domNode.style.cursor = 'not-allowed';
    // The drawing context object. We need to unwrap it - otherwise access yields some odd behavior
    this.drawContext = this.domNode.getContext('2d').wrappedJSObject;

    this.toolbar = document.createElement('div');
    this.footer = document.createElement('div');
    this.inkMeter = document.createElement('div');
    StyleTools.normalizeDiv(this.inkMeter);
    this.inkMeter.style.height = '3px';
    this.inkMeter.style.width = '100%';
    this.inkMeter.style.marginTop = '5px';
    this.inkMeter.style.outline = 'solid 1px grey';
    this.imFullColor = new Color(0, 255, 0);
    this.imEmptyColor = new Color(255, 0, 0);
    this.inkMeter.style.backgroundColor = this.imFullColor.toString();

    this.mouseDownHandler = function(e) {
        self._mouseDownHandler(e);
    };

    this.mouseUpHandler = function(e) {
        self._mouseUpHandler(e);
    };

    this.mouseMoveHandler = function(e) {
        self._mouseMoveHandler(e);
    };

    if(code) this.setCode(code);
}

// PUBLIC CONSTANTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ScribbleCanvas.MODE_PEN = 0;
ScribbleCanvas.MODE_BOX = 1;
ScribbleCanvas.MODE_ELLIPSE = 2;
ScribbleCanvas.MODE_ROUNDED_BOX = 3;
ScribbleCanvas.NUM_BASE = 32;

// Image resources
ScribbleCanvas.clearSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVHjapJO7axVBGMXPzN41K/ESkGBEUtiohSkDio2NIMHGRhDLYCVY2vg/CLY2crHVwkKx8UGqFAFBiAYEGx8Iid7oTbK78/bMxBUuu9dCF4Z9zJzfd843syKEgP+5es3D8uON1RuLx872BBC8hydY8C4QMHj11g9evrvT6/nbw8FNG9c3hf8AZnJRL87PdNTwWDs+Ly+c6d9aeXL/BBaWrmL9mWpmZfOgaqVr69tyfvq8+Q0f339Af/bUZdmfe8TPWSuCNSaabwGklFg+fxILhzxUOYcHT3cuPl/FdU7dGwMEpVp6z3ftPI4eOYwrl86xH8DKmw3H21IL4LQeE1uqd7XFjnKoGM0KiUIKjOq0ruqKgMaCcQE/aop/A0rjYFj/ACHahO5t9NrsR+EYKYufaZgE2NMOtReYYj+0nwBwZj9C3IkRBQlSO0IcIRYlkxeZTNE6AYERPCcrNi1W3E1CAuoIohMb2AOZmjrBgUmHS3GBYg8qCkpL+8YmR0PlMcVjo+0EB9K7g9NFDlcA0yHDHqdykfE4Z/DWQLGhJd+rvBCdgE9fNv3DF6/dtjJiWNIy88fK23E3UkPZSJmLr1vfo4W80YnmpxAige9ynI6J/vIDxmO8Rd21McC/Xr8EGACS/CHSfMe48AAAAABJRU5ErkJggg==';
ScribbleCanvas.thinSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAmSURBVHjaYvz//z8DJYCJgUIwagAVDGAE4v8D64LRhDQcDAAIMADsXwcXRO2fTwAAAABJRU5ErkJggg==';
ScribbleCanvas.medSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAmSURBVHjaYvz//z8DJYCJgUIwagADAyMQ/x/pYTCaEgeBAQABBgBq4QcXO9W38QAAAABJRU5ErkJggg==';
ScribbleCanvas.thickSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAnSURBVHjaYvz//z8DJYCJgUIw8AYwAvH/ER4GowYA08FoXmAACDAAZ9YHF4qUMSAAAAAASUVORK5CYII=';
ScribbleCanvas.penSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADvSURBVHja1NO7DgFBFAbgGbSiRkOn8gwaz6DwCGqdN9CgFfEGCiQKSj2RaDQSIkHhLu67/pP8m0w2W1GISb6Is+cyM4u2bVt9s3zqy/X7BsrjDoLgd+eYuCQnYeZlYQ8W3KHqNHIVOisHD+dLEg7whBXcpA7WHsfU0IEXnJ3gnFNn0IMiYxY/zSYpDrjCUAIFFl+gC3kmhrgDaTLg5CgsmL+FliSO2XECDddZ49ymBJewY7HcVR/Kimc/cXrG48Lkfo7cidzRlLl1iAQYkIoNNM1Xp7XsWo0gBiUIs1EbzyvmlBqkP/kd6f//M70FGADI7mb1OiS3ZwAAAABJRU5ErkJggg==';
ScribbleCanvas.ellipseSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE6SURBVHjapJNPK8RRFIbdGbsZNWwoRUoWSqymLCQ7O/kKFr6Krb2tJLJRVjZEyobYIEmzmJVZYBj5+/Oc6b253e6MxZx6pjude9575j1nXJZlXZ1Et30451rlx6EIN/CUvJHoYBQ24d3SAVcw/5/ALDxGhZ/R962wwJmAfsIgXEIfvEIFavBj92BCOYtdWIg7WNULb3AM6zDnfSKG4VR3vmApFqgoeQvb0JOwzAxt6N45FHJBYkjnmkysJwReYE9ne6DsBaztD53zcNRm9APef+j3At+atTez2KJ4CqZ1rjcnFHiwLFVzfS1RPKLOMhUfNCcTCFjrF8G8TyS6CCuBeTaBMz2SixepF+6jxQlpyP197UVylQvatio8y+AHuIND2IDJ1CbGUYYZGIOSTL6GHf1P/gQ6iV8BBgBEznmqlxwWiAAAAABJRU5ErkJggg==';
ScribbleCanvas.boxSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABOSURBVHjaYvz//z8DJYCJgUJAsQGMUJpcf+ghG3CARM0OQHyaBU3QkQQD/g+OQBwGBlCaDuDRaALEM8kw4DsjEkeNLDdQmhsZKTUAIMAAgLUR/0wZONsAAAAASUVORK5CYII=';
ScribbleCanvas.rndBoxSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEGSURBVHjaxNPNCgFRFAfwuUxplmKhlFBSVoqUrQ12ykIWVjyEN5GNPc+gZC3xAspGPpJ8JaLG/+hcTeKOsnDrN9Od5px77pk7wjRN7Zfh0H4c4mUeBI9NzAwWrw/zUIEhmDZGUIa0rCAOe5hwsoNidRfocIYmtGlSgjqXNoUrzBWJaJsZKMBJ5xeptB0nqVmDrV9JiGfLupwk6+B903BDw2YLciz5HqUEEZ44IaWKomq4IkMWRQlC3MwjN0n93YUweKFHDF1y0AIfrKEPmw/xfkjwuzcYyK4UuXlJ8H7Rgxn3YWU9iQEurQphRfAFttCDjnhztKknMZsKaKtjOlDi73/jXYABADFsRWMIBfvRAAAAAElFTkSuQmCC';
ScribbleCanvas.undoSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF9SURBVHjaYmDAD8wYKACWrFz6/0E0OZq7WDi1/vPJ9oEM2EiKRpCT57Nym/8X1bn6X0Bh3n8WDlWQIW+BuAWIhdA1MCKxVZjZFG5zi+cwcAiGoCj69/cDw/fXcxi+vZ7J8P//7yCg0HqYHBOSunf/gQr//XnL8P/fDxQDmJgFGLglShj4FeeBuFnIcsxI7O////9Y9OvLEeZfn/aYsfO7M/z+eobh5+d9DCwcagyMjGwMzGzyDH9/3lH68+PWDaD6q/jCoo6ZTRYYiD0g/19m47X/L6b3AIx5JMpBYsuweQEZNP399dj866tpIPbBX58P3gfy4eEBBGwwhSx4XHHq7897GkD6GxC7MPz/DRb8/fU0iLpIStTyMDJx/xfTvftfSHUbyPmfgVibkBeQQSYsWr88ByUFhguEAhAZaDEycfwX1jj8n0ssE2Q7KCAMSXH+ZF7pxv9coun/oTankKJZnZld6T80Q4HyQwI2RYyEDAFiNSC+DcQ3sCkACDAAZO+CRZAuYLwAAAAASUVORK5CYII=';
ScribbleCanvas.redoSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF8SURBVHjaYmAgDMwYKACWrFz6/0E0uQYs4pPt+8/CqQUypItYTUJA3ALEb1k4VP8LKMz7L6pz9T8rtznIkEXormFE0xzIyMi6jks0nYFTNIWBiVkARfLH+3UMX19OYvj764EqkHsHJMaCZkAmv+I8BjYeWwxn/f/3g+Hfn9cM//9+AHHZYeLIBoSw83u5wjT///eV4fu7lQws7MoMwDBg+HAvluHPjxsPgFJzgPgRNr+3cEuU/BfTewDGbDxWID8/4ZPt+c/MJgtiXwNiJXRNTEjsj///fgYzgH5k+PXl2Hcgs/Lrq2lA/uOpQLYzEN9DNwDZC0d+fz0N8zCI/A3Ei//+vHcKSH8D4ufEROF5IdVt/8V07/5nZOIGOZuHkAZm9MD+++u+L4dgEDjE/3y/+BUodpjU1DeZSyzzv7DGYaArOECuUCfFBSBw7PfXMx8ZGZld2Pk9GH59PggS206qKziBuAiUkZjZlfC6gpGIrCwMxFeA+DE2BQABBgDTCoIrbp7QmQAAAABJRU5ErkJggg==';

// PUBLIC METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Returns the actually visible scribble code which can be commited as annotation
 * to the user's review.
 *
 * @return String
 */
ScribbleCanvas.prototype.getApplicableCode = function() {
    var code = '';

    for(var i = 0; i <= this.codeStackIdx && i < this.codeStack.length; ++i) {
        if(i) code += ';';
        code += this.codeStack[i];
    }

    if(code = code.split(/CLEAR/).pop()) {
        if(code.substr(0, 1) == ';') {
            code = code.substr(1);
        }

        code = this.getResolutionCode() + ';' + code;
    }

    return code;
};

/**
 * Returns the resolution code string.
 *
 * @return String
 */
ScribbleCanvas.prototype.getResolutionCode = function() {
    return 'RES;' + this.drawContext.canvas.width.toString(ScribbleCanvas.NUM_BASE) + '/' +
                    this.drawContext.canvas.height.toString(ScribbleCanvas.NUM_BASE);
};

/**
 * Returns the current mode code string.
 *
 * @return String
 */
ScribbleCanvas.prototype.getModeCode = function() {
    switch(this.mode) {
        case ScribbleCanvas.MODE_PEN:
            return 'L';

        case ScribbleCanvas.MODE_BOX:
            return 'B';

        case ScribbleCanvas.MODE_ROUNDED_BOX:
            return 'RB';

        case ScribbleCanvas.MODE_ELLIPSE:
            return 'E';
    }
};

/**
 * Returns the current color as code string.
 *
 * @return String
 */
ScribbleCanvas.prototype.getColorCode = function() {
    return 'CL;' + this.color;
};


/**
 * Returns the current stroke width as code string.
 *
 * @return String
 */
ScribbleCanvas.prototype.getStrokeWidthCode = function() {
    return 'SW;' + this.strokeWidth;
};

/**
 * Sets the drawing code.
 *
 * @code The drawing code to set.
 */
ScribbleCanvas.prototype.setCode = function(code) {
    this.codeStack = new Array('CLEAR');
    this.codeCache = new Array;
    this.codeStackIdx = 1;

    if(code.indexOf('|') > -1) {
        code = code.split(/\|/);
        this.caption = code[0].trim();
        code = code[1].replace(/\s/g, '');
    }

    this.codeStack.push(code);
};

/**
 * Sets the color.
 *
 * @param color A rgb color string.
 */
ScribbleCanvas.prototype.setColor = function(color) {
    this.color = color.toString(true);
};

/**
 * Sets the stroke width.
 *
 * @param width The width (as float)
 */
ScribbleCanvas.prototype.setStrokeWidth = function(width) {
    this.strokeWidth = width;
};

/**
 * Sets the drawing mode.
 *
 * @param mode One of the local MODE_* constants.
 */
ScribbleCanvas.prototype.setDrawingMode = function(mode) {
    this.mode = mode;
};

/**
 * Adds drawing code to the code stack.
 *
 * @param code The code to add.
 */
ScribbleCanvas.prototype.addCode = function(code) {
    // Remove redo steps, because we're about to commit changes:
    if(this.codeStack.length > this.codeStackIdx + 1) {
        this.codeStack = this.codeStack.slice(0, this.codeStackIdx + 1);
    }

    this.codeStack.push(code);
    this.codeStackIdx = this.codeStack.length - 1;
};

/**
 * Caches drawing code in a temporary stack that must be commited.
 *
 * @param code The code to cache.
 */
ScribbleCanvas.prototype.cacheCode = function(code) {
    this.codeCache.push(code);
};

/**
 * Commits previously cached code to the code stack.
 */
ScribbleCanvas.prototype.commitCode = function() {
    this.addCode(this.codeCache.join(';'));
    this.codeCache = new Array;
};

/**
 * Attaches this component to the specified DOM node.
 *
 * @param node An Element object.
 */
ScribbleCanvas.prototype.attach = function(node) {
    if(this.attachedTo) {
        this.detach();
    }

    this.attachedTo = node;
    this.scaleTo(node);
    document.body.appendChild(this.domNode);

    var code = this.getApplicableCode();

    if(code) {
        this.execute(code);
    }
};

/**
 * Adjusts the canvas position and dimensions to the specified node.
 *
 * @param node The Element node to take as a reference for position and dimensions.
 */
ScribbleCanvas.prototype.scaleTo = function(node) {
    this.domNode.setAttribute('width', node.offsetWidth);
    this.domNode.setAttribute('height', node.offsetHeight);
    this.domNode.style.top = DocumentManager.computeTop(node) + 'px';
    this.domNode.style.left = DocumentManager.computeLeft(node) + 'px';
    this.domNode.style.width = node.offsetWidth + 'px';
    this.domNode.style.height = node.offsetHeight + 'px';
};

/**
 * Detaches this component from the document.
 */
ScribbleCanvas.prototype.detach = function() {
    if(this.attachedTo) {
        document.body.removeChild(this.domNode);

        if(this.toolbar.parentNode) {
            document.body.removeChild(this.toolbar);
            document.body.removeChild(this.footer);
        }

        this.attachedTo = null;
    }
};

/**
 * Destroys this object for freeing resources.
 */
ScribbleCanvas.prototype.destroy = function() {
    this.detach();
    this.codeCache = null;
    this.codeStack = null;
    this.domNode = null;
    this.toolbar = null;
    this.inkMeter = null;
};

/**
 * Starts the editing mode.
 *
 * @param isAssigned Boolean that indicates that this ScribbleCanvas is assigned to an Annotation.
 */
ScribbleCanvas.prototype.startEditing = function() {
    if(this.attachedTo) {
        if(this.isAssigned) {
            this.lastCodeState = this.getApplicableCode();
            this.setCode(this.lastCodeState);
            this._clear();
            this.execute(this.lastCodeState);
        }

        this.domNode.addEventListener('mousedown', this.mouseDownHandler, false);
        this.domNode.addEventListener('mouseup', this.mouseUpHandler, false);
        this.domNode.style.cursor = 'crosshair';
        this.initialCodeLength = 0;

        if(this.toolbar.children.length == 0) {
            var self = this;

            var clear = new GlyphButton(ScribbleCanvas.clearSrc, function() {
                self.clear();
            }, 'Clear');

            var thin = new GlyphButton(ScribbleCanvas.thinSrc, function() {
                if(lastWidth) lastWidth.unselect();
                lastWidth = thin;
                thin.select();
                self.setStrokeWidth(1);
            }, 'Thin');

            var medium = new GlyphButton(ScribbleCanvas.medSrc, function() {
                if(lastWidth) lastWidth.unselect();
                lastWidth = medium;
                medium.select();
                self.setStrokeWidth(2);
            }, 'Medium');

            var thick = new GlyphButton(ScribbleCanvas.thickSrc, function() {
                if(lastWidth) lastWidth.unselect();
                lastWidth = thick;
                thick.select();
                self.setStrokeWidth(4);
            }, 'Thick');

            var pen = new GlyphButton(ScribbleCanvas.penSrc, function() {
                if(lastTool) lastTool.unselect();
                lastTool = pen;
                pen.select();
                self.setDrawingMode(ScribbleCanvas.MODE_PEN);
            }, 'Pen');

            var ellipse = new GlyphButton(ScribbleCanvas.ellipseSrc, function() {
                if(lastTool) lastTool.unselect();
                lastTool = ellipse;
                ellipse.select();
                self.setDrawingMode(ScribbleCanvas.MODE_ELLIPSE);
            }, 'Ellipse');

            var rect = new GlyphButton(ScribbleCanvas.boxSrc, function() {
                if(lastTool) lastTool.unselect();
                lastTool = rect;
                rect.select();
                self.setDrawingMode(ScribbleCanvas.MODE_BOX);
            }, 'Rectangle');

            var rndRect = new GlyphButton(ScribbleCanvas.rndBoxSrc, function() {
                if(lastTool) lastTool.unselect();
                lastTool = rndRect;
                rndRect.select();
                self.setDrawingMode(ScribbleCanvas.MODE_ROUNDED_BOX);
            }, 'Rounded Rectangle');

            var undo = new GlyphButton(ScribbleCanvas.undoSrc, function() {
                self.undo();
            }, 'Undo');

            var redo = new GlyphButton(ScribbleCanvas.redoSrc, function() {
                self.redo();
            }, 'Redo');

            var blackCol = new Color(0, 0, 0, 0.7);
            var black = new ColorButton(blackCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = black;
                lastCol.select();
                self.setColor(blackCol);
            });
            black.domNode.style.marginLeft = '10px';

            var whiteCol = new Color(255, 255, 255, 0.7);
            var white = new ColorButton(whiteCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = white;
                lastCol.select();
                self.setColor(whiteCol);
            });

            var redCol = new Color(255, 0, 0, 0.7);
            var red = new ColorButton(redCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = red;
                lastCol.select();
                self.setColor(redCol);
            });

            var greenCol = new Color(0, 255, 0, 0.7);
            var green = new ColorButton(greenCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = green;
                lastCol.select();
                self.setColor(greenCol);
            });

            var blueCol = new Color(0, 0, 255, 0.7);
            var blue = new ColorButton(blueCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = blue;
                lastCol.select();
                self.setColor(blueCol);
            });

            var yellowCol = new Color(255, 255, 0, 0.7);
            var yellow = new ColorButton(yellowCol, function() {
                if(lastCol) lastCol.unselect();
                lastCol = yellow;
                lastCol.select();
                self.setColor(yellowCol);
            });

            var lastTool = pen;
            var lastWidth = medium;
            var lastCol = black;
            lastTool.select();
            lastWidth.select();
            lastCol.select();

            this.toolbar.appendChild(clear.domNode);
            this.toolbar.appendChild(undo.domNode);
            this.toolbar.appendChild(redo.domNode);
            this.toolbar.appendChild(thin.domNode);
            this.toolbar.appendChild(medium.domNode);
            this.toolbar.appendChild(thick.domNode);
            this.toolbar.appendChild(pen.domNode);
            this.toolbar.appendChild(ellipse.domNode);
            this.toolbar.appendChild(rect.domNode);
            this.toolbar.appendChild(rndRect.domNode);
            this.toolbar.appendChild(black.domNode);
            this.toolbar.appendChild(white.domNode);
            this.toolbar.appendChild(red.domNode);
            this.toolbar.appendChild(green.domNode);
            this.toolbar.appendChild(blue.domNode);
            this.toolbar.appendChild(yellow.domNode);
            this.toolbar.appendChild(this.inkMeter);

            var top = (parseInt(this.domNode.style.top) - 25) + 'px';
            var left = this.domNode.style.left;
            var width = this.domNode.style.width;

            this.toolbar.style.MozBorderRadius = '5px 5px 0px 0px';
            this.toolbar.style.MozBoxShadow = '1px 1px 4px #000000';
            this.toolbar.style.background = 'url(' + Resources.lightBlueGradient + ')';
            this.toolbar.style.height = 'auto';
            this.toolbar.style.top = top;
            this.toolbar.style.left = left;
            this.toolbar.style.minWidth = width;
            this.toolbar.style.position = 'absolute';
            this.toolbar.style.zIndex = '1999999999';
            this.toolbar.style.padding = '0px';
            this.toolbar.style.textAlign = 'center';
            this.toolbar.style.padding = '2px 0px 0px 0px';

            var save = new Button('Save', function() {
                if(self.getApplicableCode().length) {
                    try {
                        self.caption = self.captionInput.value.substr(0, MAX_SCRIBBLE_CAPTION_LEN).replace(/\|/g, ' ');

                        if(self.isAssigned) {
                            SUA.annotationManager.updateUserScribbleCaptions();
                            SUA.userManager.commitReview(SUA.annotationManager.getUserAnnotations());
                            self.stopEditing();
                            SUA.annotationManager.abortScribble();
                            self.scaleTo(self.attachedTo);
                        } else {
                            SUA.annotationManager.saveScribble();
                        }
                    } catch(e) {
                        SUA.panic("caused an error while saving a scribble. The cryptic error message is: " + e);
                    }
                } else {
                    alert("You cannot save an empty scribble.");
                    cancel.onClick();
                }
            });

            save.domNode.style.cssFloat = 'right';

            var cancel = new Button('Cancel', function() {
                self.stopEditing();
                SUA.annotationManager.abortScribble();

                if(self.lastCodeState) {
                    self.scaleTo(self.attachedTo);
                    self.setCode(self.lastCodeState);
                    self._clear();
                    self.execute(self.lastCodeState);
                }
            });

            cancel.domNode.style.cssFloat = 'left';

            var captionLabel = document.createElement('label');
            StyleTools.normalizeLabel(captionLabel);
            captionLabel.innerHTML = 'Caption';
            captionLabel.style.whiteSpace = 'nowrap';
            captionLabel.style.display = 'inline-block';
            captionLabel.style.marginTop = '5px';
            captionLabel.style.width = '60%';
            this.captionInput = document.createElement('input');
            StyleTools.normalizeInput(this.captionInput);
            this.captionInput.setAttribute('type', 'text');
            this.captionInput.style.marginLeft = '5px';
            this.captionInput.style.width = '80%';
            this.captionInput.setAttribute('maxlength', MAX_SCRIBBLE_CAPTION_LEN);
            captionLabel.appendChild(this.captionInput);

            this.footer.appendChild(save.domNode);
            this.footer.appendChild(cancel.domNode);
            this.footer.appendChild(captionLabel);

            top = (parseInt(this.domNode.style.top) + parseInt(this.domNode.style.height)) + 'px';

            StyleTools.normalizeDiv(this.footer);
            this.footer.style.MozBorderRadius = '0px 0px 5px 5px';
            this.footer.style.MozBoxShadow = '1px 1px 4px #000000';
            this.footer.style.background = 'url(' + Resources.deepBlueGradient + ')';
            this.footer.style.height = '24px';
            this.footer.style.top = top;
            this.footer.style.left = left;
            this.footer.style.minWidth = width;
            this.footer.style.position = 'absolute';
            this.footer.style.zIndex = '1999999999';
            this.footer.style.padding = '0px';
            this.footer.style.textAlign = 'center';
        }

        document.body.appendChild(this.toolbar);
        document.body.appendChild(this.footer);

        if(this.caption) {
            this.captionInput.value = this.caption;
        }
    } else {
        SUA.panic("tried to start an unattached scribble's edit mode");
    }
};

/**
 * Stops the editing mode.
 */
ScribbleCanvas.prototype.stopEditing = function() {
    this.domNode.removeEventListener('mousedown', this.mouseDownHandler, false);
    this.domNode.removeEventListener('mouseup', this.mouseUpHandler, false);
    this.domNode.style.cursor = 'not-allowed';
    document.body.removeChild(this.toolbar);
    document.body.removeChild(this.footer);
};

/**
 * Clears the canvas.
 */
ScribbleCanvas.prototype.clear = function() {
    this._clear();
    this.addCode('CLEAR;' + this.getColorCode() + ';' + this.getStrokeWidthCode());
    this._updateInkMeter();
};

/**
 * Executes drawing code.
 *
 * @param code The code to execute.
 */
ScribbleCanvas.prototype.execute = function(code) {
    var commands = code.split(/;/);
    var inst;
    var mode;
    var lastX, lastY;

    while(inst = commands.shift()) {
        switch(inst) {
            // Begin drawing lines
            case 'L':
                mode = ScribbleCanvas.MODE_PEN;
                var start = commands.shift();
                var coords = start.split(/\//);
                lastX = parseInt(coords[0], ScribbleCanvas.NUM_BASE);
                lastY = parseInt(coords[1], ScribbleCanvas.NUM_BASE);
                break;

            // Begin drawing boxes
            case 'B':
                mode = ScribbleCanvas.MODE_BOX;
                break;

            case 'RB':
                mode = ScribbleCanvas.MODE_ROUNDED_BOX;
                break;

            // Begin drawing ellipses
            case 'E':
                mode = ScribbleCanvas.MODE_ELLIPSE;
                break;

            // Change color
            case 'CL':
                var color = commands.shift();
                this.drawContext.strokeStyle = color;
                break;

            // Change stroke width
            case 'SW':
                var width = parseInt(commands.shift());
                this.drawContext.lineWidth = width;
                break;

            case 'CLEAR':
                this._clear();
                break;

            case 'RES':
                var res = commands.shift().split(/\//);
                this.drawContext.canvas.width = parseInt(res[0], ScribbleCanvas.NUM_BASE);
                this.drawContext.canvas.height = parseInt(res[1], ScribbleCanvas.NUM_BASE);
                break;

            default:
                var coords = inst.split(/\//);
                var x = parseInt(coords[0], ScribbleCanvas.NUM_BASE);
                var y = parseInt(coords[1], ScribbleCanvas.NUM_BASE);
                var w, h;

                if(coords.length > 2) {
                    w = parseInt(coords[2], ScribbleCanvas.NUM_BASE);
                }

                if(coords.length > 3) {
                    h = parseInt(coords[3], ScribbleCanvas.NUM_BASE);
                }

                this.drawContext.beginPath();

                switch(mode) {
                    case ScribbleCanvas.MODE_PEN:
                        this.drawContext.moveTo(lastX, lastY);
                        this.drawContext.lineTo(x, y);
                        this.drawContext.stroke();
                        lastX = x;
                        lastY = y;
                        break;

                    case ScribbleCanvas.MODE_BOX:
                        this.drawContext.strokeRect(x, y, w, h);
                        break;

                    case ScribbleCanvas.MODE_ROUNDED_BOX:
                        this._roundedRect(x, y, w, h, this.cornerRadius);
                        break;

                    case ScribbleCanvas.MODE_ELLIPSE:
                        this._ellipse(x, y, w, h);
                        this.drawContext.stroke();
                        break;
                }

                this.drawContext.closePath();
        }
    }

    // Restore current user-applied drawing settings
    this.drawContext.strokeStyle = this.color;
    this.drawContext.lineWidth = this.strokeWidth;
};

/**
 * Undos the previous drawing step.
 */
ScribbleCanvas.prototype.undo = function() {
    this._clear();

    if(--this.codeStackIdx < 1) {
        this.codeStackIdx = 1;
    } else {
        this.execute(this.getApplicableCode());
    }

    this._updateInkMeter();
};

/**
 * Redos an undone drawing step.
 */
ScribbleCanvas.prototype.redo = function() {
    var max = this.codeStack.length - 1;
    var drawn = false;

    if(this.codeStackIdx == 2) {
        var code = this.codeStack[this.codeStackIdx];

        if(code) {
            this.execute(code);
            drawn = true;
        }
    }

    if(++this.codeStackIdx > max) {
        this.codeStackIdx = max;
    }

    if(!drawn) {
        var code = this.codeStack[this.codeStackIdx];

        if(code) {
            this.execute(code);
        }
    }

    this._updateInkMeter();
};

// PSEUDO PRIVATE METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Updates the ink meter and returns true if ink is still left for drawing.
 * The calculation is based on the length of the drawing code, that is internally
 * generated by this component.
 *
 * @return Boolean
 */
ScribbleCanvas.prototype._updateInkMeter = function() {
    var codeLength = this.getApplicableCode().length;
    codeLength += this.codeCache.join(';').length;
    var percent = 100 - (((codeLength - this.initialCodeLength) / this.maximumCodeLength) * 100);
    this.inkMeter.style.width = percent + '%';
    this.inkMeter.style.backgroundColor = this.imFullColor.blendTo(this.imEmptyColor, 100 - percent).toString();
    var inkLeft = codeLength < this.maximumCodeLength;
    if(!inkLeft) this.inkMeter.style.width = '1px';

    return inkLeft;
};

/**
 * Clears the canvas (action not added to code stack).
 */
ScribbleCanvas.prototype._clear = function() {
    this.drawContext.clearRect(0, 0, this.drawContext.canvas.width, this.drawContext.canvas.height);
};

/**
 * User notification for "out of ink" message.
 */
ScribbleCanvas.prototype._outOfInkMessage = function() {
    alert("Sorry, you're out of ink :-(\n\nYou can undo a line stroke or clear the canvas in order to get more ink.\n\nRegards,\n\nYour StumbleUpon Annotator");
};

/**
 * Performs drawing.
 * Event handler for mouse move event of the canvas object.
 *
 * @param e Event object
 */
ScribbleCanvas.prototype._mouseMoveHandler = function(e) {
    var currentTick = (new Date).getTime();

    // Limit amount of pen strokes
    if(currentTick - this._lastTick > 60) {
        this._lastTick = currentTick;
        this._lastW = e.layerX - this._lastX;
        this._lastH = e.layerY - this._lastY;
        this.drawContext.beginPath();

        switch(this.mode) {
            case ScribbleCanvas.MODE_PEN:
                // Only draw if the mouse really moved for a few pixels.
                if(Math.abs(this._lastX - e.layerX) >= this.penMouseMoveResolution ||
                   Math.abs(this._lastY - e.layerY) >= this.penMouseMoveResolution) {
                    this.cacheCode(e.layerX.toString(ScribbleCanvas.NUM_BASE) + '/' +
                                e.layerY.toString(ScribbleCanvas.NUM_BASE));
                    this.drawContext.moveTo(this._lastX, this._lastY);
                    this.drawContext.lineTo(e.layerX, e.layerY);
                    this.drawContext.stroke();
                    this._lastX = e.layerX;
                    this._lastY = e.layerY;
                }
                break;

            case ScribbleCanvas.MODE_BOX:
                this._restoreSnapshot();
                this._storeSnapshot();
                this.drawContext.strokeRect(this._startX, this._startY, this._lastW, this._lastH);
                break;

            case ScribbleCanvas.MODE_ROUNDED_BOX:
                this._restoreSnapshot();
                this._storeSnapshot();
                this._roundedRect(this._startX, this._startY, this._lastW, this._lastH, this.cornerRadius);
                break;

            case ScribbleCanvas.MODE_ELLIPSE:
                this._restoreSnapshot();
                this._storeSnapshot();
                this._ellipse(this._startX, this._startY, this._lastW, this._lastH);
                this.drawContext.stroke();
                break;
        }

        this.drawContext.closePath();

        if(!this._updateInkMeter()) {
            this._mouseUpHandler();
            this._outOfInkMessage();
        }
    }
}

/**
 * Starts drawing.
 * Event handler for mouse down event of the canvas object.
 *
 * @param e Event object
 */
ScribbleCanvas.prototype._mouseDownHandler = function(e) {
    if(this._updateInkMeter()) {
        var cc = '', sc = '';

        this._lastX = e.layerX;
        this._lastY = e.layerY;

        // Detect a changed stroke style
        if(this.color != this._lastColor) {
            this._lastColor = this.color;
            cc = this.getColorCode();
            this.cacheCode(cc);
            this.drawContext.strokeStyle = this.color;
        }

        if(this.strokeWidth != this._lastStrokeWidth) {
            this._lastStrokeWidth = this.strokeWidth;
            sc = this.getStrokeWidthCode();
            this.cacheCode(sc);
            this.drawContext.lineWidth = this.strokeWidth;
        }

        if(!this.initialCodeLength) {
            this.initialCodeLength = this.getResolutionCode().length + cc.length + sc.length;
        }

        switch(this.mode) {
            case ScribbleCanvas.MODE_PEN:
                this.cacheCode(this.getModeCode() + ';' +
                            e.layerX.toString(ScribbleCanvas.NUM_BASE) + '/' +
                            e.layerY.toString(ScribbleCanvas.NUM_BASE));
                break;

            case ScribbleCanvas.MODE_BOX:
            case ScribbleCanvas.MODE_ROUNDED_BOX:
            case ScribbleCanvas.MODE_ELLIPSE:
                this._startX = e.layerX;
                this._startY = e.layerY;
                this._storeSnapshot();
                break;
        }

        this.domNode.addEventListener('mousemove', this.mouseMoveHandler, false);
        this.domNode.addEventListener('mouseout', this.mouseUpHandler, false);
    } else {
        this._outOfInkMessage();
    }
};

/**
 * Stops drawing.
 * Event handler for mouse up event of the canvas object.
 *
 * @param e Event object
 */
ScribbleCanvas.prototype._mouseUpHandler = function() {
    if(this.mode != ScribbleCanvas.MODE_PEN) {
        this._restoreSnapshot();
        this.cacheCode(this.getModeCode() + ';' +
                        this._lastX.toString(ScribbleCanvas.NUM_BASE) + '/' +
                        this._lastY.toString(ScribbleCanvas.NUM_BASE) + '/' +
                        this._lastW.toString(ScribbleCanvas.NUM_BASE) + '/' +
                        this._lastH.toString(ScribbleCanvas.NUM_BASE) + '/');
    }

    switch(this.mode) {
        case ScribbleCanvas.MODE_BOX:
            this.drawContext.strokeRect(this._startX, this._startY, this._lastW, this._lastH);
            break;

        case ScribbleCanvas.MODE_ROUNDED_BOX:
            this._roundedRect(this._startX, this._startY, this._lastW, this._lastH, this.cornerRadius);
            break;

        case ScribbleCanvas.MODE_ELLIPSE:
            this._ellipse(this._startX, this._startY, this._lastW, this._lastH);
            this.drawContext.stroke();
            break;
    }

    this.commitCode();

    // Do some code length restrictions
    var difference = this.getApplicableCode().length - this.maximumCodeLength;

    if(difference > 0) {
        var lastStep = this.codeStack[this.codeStackIdx];
        lastStep = lastStep.substr(0, lastStep.length - difference);
        lastStep = lastStep.split(/;/);
        lastStep.pop();
        this.codeStack[this.codeStackIdx] = lastStep.join(';');
    }

    this.domNode.removeEventListener('mousemove', this.mouseMoveHandler, false);
    this.domNode.removeEventListener('mouseout', this.mouseUpHandler, false);
};

/**
 * Draws an ellipse.
 *
 * @param x The x coordinate.
 * @param y The y coordinate.
 * @param w The width.
 * @param h The height.
 */
ScribbleCanvas.prototype._ellipse = function(x, y, w, h) {
    var r1 = w / h;
    var r2 = h / w;
    this.drawContext.save();
    this.drawContext.beginPath();
    this.drawContext.scale(r1, r2);
    this.drawContext.arc(x * r2, y * r1, h, 0, 2 * Math.PI, false);
    this.drawContext.closePath();
    this.drawContext.restore();
};

/**
 * Draws an rounded rectangle.
 * Borrowed from https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
 *
 * @param x The x coordinate.
 * @param y The y coordinate.
 * @param w The width.
 * @param h The height.
 */
ScribbleCanvas.prototype._roundedRect = function(x, y, width, height, radius){
    this.drawContext.beginPath();
    this.drawContext.moveTo(x, y + radius);
    this.drawContext.lineTo(x, y + height - radius);
    this.drawContext.quadraticCurveTo(x, y + height, x + radius,y + height);
    this.drawContext.lineTo(x + width - radius, y + height);
    this.drawContext.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    this.drawContext.lineTo(x + width, y + radius);
    this.drawContext.quadraticCurveTo(x + width, y, x + width - radius, y);
    this.drawContext.lineTo(x + radius, y);
    this.drawContext.quadraticCurveTo(x, y, x, y + radius);
    this.drawContext.stroke();
};

/**
 * Locally stores a snapshot of the current canvas.
 */
ScribbleCanvas.prototype._storeSnapshot = function() {
    this._snapshot = this.drawContext.getImageData(0, 0, this.drawContext.canvas.width, this.drawContext.canvas.height);
};

/**
 * Restores the previously saved snapshot.
 */
ScribbleCanvas.prototype._restoreSnapshot = function() {
    if(this._snapshot) {
        this.drawContext.putImageData(this._snapshot, 0, 0);
    }
};

// ------------------------------------------------------------------------------------------------------------
// ANNOTATION

/**
 * Component for displaying and interacting with an individual annotation.
 *
 * @param user The user who created the annotation.
 * @param comment The user's comment text or alternatively a ScribbleCanvas instance.
 * @param xpath The annotation's reference position as XPath expression.
 * @param refNode The annotation's reference Element node.
 * @param rangeStart Optional integer that denotes the caret position within a text node
 *        (makes only sense if refNode is a text node).
 * @param unoriginalRef Optional boolean that indicates that the original reference node
 *        couldn't be found for this annotation.
 */
function Annotation(user, comment, xpath, refNode, rangeStart, unoriginalRef) {
    var self = this;

    // The cite-tag is one of the rarely used ones. Therefore the annotation
    // is less likely to break the page structure for retrieving reference nodes
    // via XPath
    this.domNode = document.createElement('cite');
    this.header = document.createElement('div');
    this.footer = document.createElement('div');
    this.expandIcon = document.createElement('img');
    this.userNameNode = document.createElement('b');
    this.saysNode = document.createElement('span');
    this.anchor = document.createElement('a');
    this.body = document.createElement('span');
    this.refErrorMessage = document.createElement('div');
    this.savingMessage = document.createElement('span');
    this.user = user;
    this.expanded = false;
    this.xpath = xpath;
    this.rangeStart = rangeStart;
    this.refNode = refNode;
    this.userNameNode.innerHTML = user;
    this.saysNode.innerHTML = ' says:';
    this.setComment(comment);

    this.domNode.appendChild(this.header);
    this.domNode.appendChild(this.body);
    this.domNode.appendChild(this.refErrorMessage);
    this.domNode.appendChild(this.footer);
    this.header.appendChild(this.expandIcon);
    this.header.appendChild(this.userNameNode);
    this.header.appendChild(this.savingMessage);
    this.userNameNode.appendChild(this.saysNode);

    StyleTools.normalizeImage(this.expandIcon);
    this.expandIcon.style.verticalAlign = 'middle';
    this.footer.style.display = 'none';
    this.expandIcon.setAttribute('src', Annotation.expandIconSrc);
    this.expandIcon.style.marginRight = '3px';
    this.saysNode.style.display = 'none';
    this.refErrorMessage.style.outline = 'none';
    this.refErrorMessage.style.lineHeight = '1.1';
    this.refErrorMessage.style.borderTop = 'solid red 1px';
    this.refErrorMessage.style.margin = '5px 0px 0px 0px';
    this.refErrorMessage.style.padding = '0px';
    this.refErrorMessage.style.fontSize = '10px';
    this.refErrorMessage.style.color = 'red';
    this.refErrorMessage.style.display = 'none';
    this.refErrorMessage.innerHTML = 'Could not find the original position for this annotation.<br />The current position is an estimation.';
    this.savingMessage.innerHTML = '...saving';
    this.savingMessage.style.display = 'none';
    this.savingMessage.style.marginLeft = '10px';
    this.savingMessage.style.fontWeight = 'bold';
    this.savingMessage.style.color = 'yellow';
    this.savingMessage.style.textShadow = '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black';
    this.body.style.display = 'none';
    this.anchor.setAttribute('name', 'SUA_Anchor_' + (++Annotation.anchorIndex));
    this.anchor.setAttribute('SUA_protect', '1');
    this.anchor.style.display = 'inline-block';
    this.anchor.style.verticalAlign = 'bottom';
    this.anchor.style.height = '50px';

    this.domNode.setAttribute('comment', comment);
    this.domNode.setAttribute('expanded', '0');
    this.domNode.setAttribute('SUA_protect', '1');
    this.domNode.setAttribute('user', user);
    this.domNode.style.display = 'inline-block';
    this.domNode.style.wordWrap = 'break-word';
    this.domNode.style.padding = '2px';
    this.domNode.style.margin = '2px';
    this.domNode.style.width = 'auto';
    this.domNode.style.maxWidth = '300px';
    this.domNode.style.height = 'auto';
    this.domNode.style.verticalAlign = 'bottom';
    this.domNode.style.textAlign = 'left';
    this.domNode.style.lineHeight = '1.4';
    this.domNode.style.MozBorderRadius = '5px';
    this.domNode.style.MozBoxShadow = '1px 1px 4px #000000';
    this.domNode.style.fontFamily = 'sans-serif';
    this.domNode.style.fontSize = '12px';
    this.domNode.style.fontWeight = 'normal';
    this.domNode.style.color = 'black';
    this.domNode.style.fontStyle = 'normal';
    this.domNode.style.cursor = 'pointer';
    this.refError = unoriginalRef;

    // Apply a different style and properties if this annotation belongs to the script user
    if(user == SUA.userManager.getName()) {
        this.domNode.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAH0CAIAAABzX9DAAAAAZElEQVQ4jWN4u6mXiYGBgTBmpJIaMs1iHKTuQseMDIx0tY8cs3CGJbXdRaHbGRkYByQOSTWLKuFJY7ejhOUgchdmnA9MHJJqFtbwHAh34VHDSAv7aGAWzrAcZG7HyOeDxF1IGABAlQZXdL7O8QAAAABJRU5ErkJggg==)';
        this.domNode.style.border = 'solid 1px #800517';
        this.addEditToolbar();
    } else {
        this.domNode.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAH0CAIAAABzX9DAAAAAYklEQVQ4jWO4cyuIiYGBAQdmxCvHyEi6HhgbVS9xejD14tKHXRyijzQ91Pcr8W4gLozo5VfizKOtX/GlB9L0UOrXgU37pPuVkZGc8MEXRqP5HL9fiXfDaD4nJT2M5nM85gEAQ50GfO/BH88AAAAASUVORK5CYII=)';
        this.domNode.style.border = 'solid 1px #DAA520';
    }

    this.domNode.addEventListener('click', onClick, false);

    function onClick() {
        if(self.expanded) {
            self.collapse();
        } else {
            self.expand();
        }
    }
}

Annotation.anchorIndex = 0;
Annotation.expandIconSrc = 'data:image/gif;base64,R0lGODlhCQAJAIABAAAAAP///yH5BAEAAAEALAAAAAAJAAkAAAIRhI+hG7bwoJINIktzjizeUwAAOw==';
Annotation.collapseIconSrc = 'data:image/gif;base64,R0lGODlhCQAJAIABAAAAAP///yH5BAEAAAEALAAAAAAJAAkAAAIQhI+hG8brXgPzTHllfKiDAgA7';

/**
 * Adds the edit toolbar for the user's own annotations.
 */
Annotation.prototype.addEditToolbar = function() {
    var self = this;
    var toolbar = document.createElement('div');
    var edit = document.createElement('img');
    edit.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIPSURBVHjalJNNaNNgHMaft21c0jRrvpqYFAfaDd0ofuywk4InQfHsF3gcuIN62WXizcMOggqCXgae9CAI4kkUtFUQytayUx1zwqy2MEtHK61NlyzxfQeFMbbaBR4S3v/ze/J+/YH+nzGqx1Qlqhkqbh8seBKKBMmR68GpMw8CzU4HJBQO6Lgd7gNOUf1OGKMYPT2JwTSP+FAKB3gJ66Wv7dB/4GOEkBVVVWGqHjjvIzpcBG3RgHR0gtUvkR7wAIUdBlu2DU0WYXEEjjaGxYaP1XfPlqnnaaRHwI1YLAZd16GpCuKqjhh915a/YfXzpzkGUxX2WsIMz/OPTNNEIpGAJA3C1FWsVav4Usiz+kMGs4/dZnBfEITpZDIJFqAoypZ8P0Ahn0er1TpPPcWueWfA3agoTR+02J8NyLK8Bbuui0wmg3K5fJN63m4Htgdc5aPWPcO0YAgNxCUBcVlBs9lENptFrVabpJ65ndPtBlwECb0YTl+DltLB+79gdUog/gayuRyDL1PPy902qxswNZy+jah4EsJhDuvOIQgbQ1jJPEelUmH1V3sdFTuFE6JuX0idPY5wxMdarg2X38TC/HssLRURBIFAPZu9Aqbs8XP4OxBAGSfwHIIfr5+gPP8Bnucx2Ol1VdkSrvBHJvCnUcf3hTeoFhfhdursktyi8vrptFmqOtVPqjusw/bTpv8EGAA9AplS9c1kQgAAAABJRU5ErkJggg==')
    edit.setAttribute('title', 'Edit Annotation');
    StyleTools.normalizeImage(edit);
    edit.style.marginRight = '5px;'
    edit.style.cursor = 'pointer';
    var move = document.createElement('img');
    move.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGRSURBVHjalFI9SwNBEJ1ISEC0OlOIoF0wYHFaBASDBgQbC7G0SQotIgi2/gJbQcgVCsbGUi1sBCEJKcSAmkJQrLQQi3iNEYs053vL7nGeUc4Hdzvfu/NmYmsbhxLG3m4hi6M0O79a/Oi4cn114iBuXXqgT3pDJaczOZnKLgnOEoqWIxVAIBNVsgGKmSLFKC946ry35bJx5BvOjrfFfXum2AoHx/WtST6bAei1Bj0PuWqCXl8eeEzC14LPhmxDrhg/CTuYsBe84ZFxD/IcP8oIUh90T5NtW6lRD+3QVqYtHiSMTw3eHOKGSZJI9CtOmAebxKB4QcL+g5vm6a9jjISBQUvi9Yt9kqFaIPNuW7EtVmpMpnMr/hQMjP3xviHMJQcOBPqKTAbjeR0bnoJv50V3rXNe7IhmV02C7Gv9xxT06ERPaRNf0kyBRZo4mpptJlf5VAPo0u1+3sLHXajBVPtrEwvpzIzfP7G4vCXWkCpoR1llclIhSQbol6Q5we37tspBsB0uiCGWP5DGxJ1eo/wSYAArIbQzD9NC6QAAAABJRU5ErkJggg==');
    StyleTools.normalizeImage(move);
    move.setAttribute('title', 'Change Position');
    move.style.cursor = 'pointer';
    var remove = document.createElement('img');
    remove.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK1SURBVHjaVFNLaBNRFL1vkubTTkxjaRpaBb8Ui4WIi7ZQXHSjIAiioJuKYimkG0EQIqa4klaCVaEaFxXBqlBEhCx0UQRRRHShpW4UK8VAtZTUJJM2yUwyM547mYT0wSOZ9+6599xzzxMzoRDV1sjqqgs/V7AjnU5nV8jpJM006Z+u059KJYXzBHYcGL2GEbUEAA9LRI+HmpvpaEsLBRwOalyc5NXmJr0rFMggOgvcXD0BwBG/JN0fCwRob1OTBVhQVQuEpLTP5aIdYMPrh6bRdCZDRdM8B+yswJnfKUQ21tZWD3qiKPS2UEjiL9NmKoNoqXestZW4rV/lMt1cX2cmPr4cB+Uj/V4vLePCJ0nU43bToqZ1K4aRRJXoCVlOPFWU7Idi8Riz2Y+tQpulcllliubdYNC819Fhog2zz+MxATLj7e0mdDBR4Dy3aWt1hs8eIPYWMIyVOFsLqnLPOcN49qlUSryGWCwiU3YJ8QgaDTGahcvo+txXxKIY7YZeUtBWexniYH3GnnyRz7/8UipZARf9fj6PIEmXPZCFFFrlFYQekkMI68OoXuqoYs17Jpej3wg87PHQSVk+jbNrdgKtZgKekJTWq5+d1Qn02FTnYaCR6WyWQJmOyzJBG2ZxB9fhnfa0GCv9BHV2G1dyC8FBvXaShwDHOAnfX0AraOmSV4jhMGLhA2tqDtQP+ByO/gO2mIsQKLmxkcLo1rDfzyrKtr+6PtCHMR8CcBfimMEbOPKbqsZZgG4Av1+HkbZDUBiInufzPOc47pbsdsNoIwIt6rYeT6c5Zk/NylE4bOIyrMxJME76WCzSWoM+A6jODFmT27AyHtdVYCcbH1MUAROnUGUQD0qirYt1mIc/+EGhcgy4G1teo50kzDOHUKMHYWc2C493pVLhipQ3jCl8TgGzUsP8F2AAFvBAE2I2AywAAAAASUVORK5CYII=');
    StyleTools.normalizeImage(remove);
    remove.style.cssFloat = 'right';
    remove.setAttribute('title', 'Delete Annotation');
    remove.style.cursor = 'pointer';
    toolbar.addEventListener('click', function(e) {
        e.stopPropagation();
    }, false);

    edit.addEventListener('click', function() {
        SUA.annotationManager.edit(self);
    }, false);

    move.addEventListener('click', function() {
        SUA.annotationManager.move(self);
    }, false)

    remove.addEventListener('click', function() {
        if(self.scribble) {
            var message = 'Do you really want to delete your scribble\n"' + self.scribble.caption.normalizeWhiteSpace().ellipse(100) + '"?';
        } else {
            var message = 'Do you really want to delete your annotation\n"' + self.comment.replace(/\n/g, ' ').normalizeWhiteSpace().ellipse(100) + '"?';
        }

        if(confirm(message)) {
            SUA.annotationManager.removeFromReview(self);
        }
    }, false);

    toolbar.appendChild(remove);
    toolbar.appendChild(edit);
    toolbar.appendChild(move);
    toolbar.style.borderTop = 'solid black 1px';
    toolbar.style.marginTop = '2px';
    toolbar.style.paddingTop = '2px';
    toolbar.style.cursor = 'default';

    this.footer.appendChild(toolbar);
};

/**
 * Attaches a ScribbleCanvas object to this Annotation.
 * This method also changes the Annotation's behavior a little bit.
 *
 * @param scribble A ScribbleCanvas object.
 */
Annotation.prototype.attachScribble = function(scribble) {
    this.scribble = scribble;
    scribble.isAssigned = true;
    this.saysNode.innerHTML = ' scribbles:';
    if(scribble.caption) this.setComment(scribble.caption);
};

/**
 * Returns the name property of this annotation's anchor.
 *
 * @return String
 */
Annotation.prototype.getAnchorName = function() {
    return this.anchor.getAttribute('name');
};

/**
 * Returns this annotation's reference node location string.
 * Please note, that the result of this method does not only consist of
 * the XPath expression. Other location information is encoded as well.
 *
 * @return String
 */
Annotation.prototype.getLocationString = function() {
    var loc = this.xpath;
    if(this.rangeStart || this.rangeStart === 0) loc += '(' + this.rangeStart + ')';

    return loc;
};

/**
 * Sets the annotation's comment text.
 *
 * @param txt The text to set. (Alternatively a ScribbleCanvas object)
 */
Annotation.prototype.setComment = function(txt) {
    if(txt instanceof ScribbleCanvas) {
        this.attachScribble(txt);
    } else {
        this.comment = txt;
        this.body.innerHTML = txt.trim().replace(/\n/g, '<br />');
    }
};

/**
 * Hides the reference error message.
 */
Annotation.prototype.clearRefError = function() {
    this.refError = false;
    this.refErrorMessage.style.display = 'none';
};

/**
 * Collapses this annotation.
 */
Annotation.prototype.collapse = function() {
    this.expanded = false;
    this.expandIcon.setAttribute('src', Annotation.expandIconSrc);
    this.body.style.display = 'none';
    this.saysNode.style.display = 'none';
    this.refErrorMessage.style.display = 'none';
    this.footer.style.display = 'none';

    if(this.scribble) {
        this.scribble.detach();
    }
};

/**
 * Expands this annotation.
 */
Annotation.prototype.expand = function() {
    this.expanded = true;
    this.expandIcon.setAttribute('src', Annotation.collapseIconSrc);
    this.body.style.display = 'inline';
    this.saysNode.style.display = 'inline';
    this.footer.style.display = 'block';

    if(this.refError) {
        this.refErrorMessage.style.display = 'block';
    }

    if(this.scribble) {
        this.scribble.attach(this.refNode);
    }
};

/**
 * Tells this annotation whether it is saved or not.
 *
 * @param saved Boolean that indicates the "saved" state.
 */
Annotation.prototype.isSaved = function(saved) {
    if(saved) {
        this.savingMessage.style.display = 'none';
    } else {
        this.savingMessage.style.display = 'inline';
    }
};

/**
 * Detaches the annotation from the document.
 */
Annotation.prototype.detach = function() {
    if(this.domNode.parentNode) {
        var prevNode = this.anchor.previousSibling;
        var nextNode = this.domNode.nextSibling;
        this.domNode.parentNode.removeChild(this.anchor);
        this.domNode.parentNode.removeChild(this.domNode);

        if(prevNode && nextNode) {
            // Repair document structure by joining two consecutive text nodes
            // which have been separated by this annotation before
            if(prevNode.nodeType == 3 && nextNode.nodeType == 3) {
                prevNode.textContent += nextNode.textContent;
                prevNode.parentNode.removeChild(nextNode);
            }
        }
    }

    if(this.scribble) {
        this.scribble.detach();
    }
};

/**
 * Attaches the annotation to the document.
 */
Annotation.prototype.attach = function() {
    if(this.rangeStart) {
        var range = document.createRange();

        // Text node references might get lost due to document cleanups (see detach)
        if(!this.refNode) {
            var refNode = DocumentManager.getApplicableNode(this.xpath);
            this.refNode = refNode.node;
            this.refError = refNode.isUnoriginalRef;
        }

        try {
            range.setStart(this.refNode, this.rangeStart);
            range.setEnd(this.refNode, this.rangeStart);
            this.refError = false;
        } catch(e) {
            // Fallback: put annotation at the beginning of the text node
            range.setStart(this.refNode, 0);
            range.setEnd(this.refNode, 0);
            this.refError = true;
        }

        range.insertNode(this.domNode);
    } else {
        var anchor;

        if(anchor = DocumentManager.getAnchorParent(this.refNode)) {
            anchor.parentNode.insertBefore(this.domNode, anchor);
        } else {
            this.refNode.parentNode.insertBefore(this.domNode, this.refNode);
        }
    }

    this.domNode.parentNode.insertBefore(this.anchor, this.domNode);

    if(this.scribble) {
        if(this.refNode.parentNode.nodeName.toLowerCase() == 'html') {
            this.domNode.style.position = 'absolute';
            this.domNode.style.zIndex = '1999999999';
        }

        if(this.expanded) {
            this.scribble.attach(this.refNode);

        }
    }
};

// ------------------------------------------------------------------------------------------------------------
// ANNOTATION MANAGER

/**
 * A component for maintaining annotations.
 */
function AnnotationManager() {
    /**
     * Stores the annotation element nodes.
     */
    var annotations = new Array;

    /**
     * Separate storage for the user's own annotations.
     */
    var userAnnotations = new Array;

    var currentScribble;
    var scribbleMode = false;
    var privateMode = GM_getValue('private_mode');
    var allExpanded = false;
    var userRegistry = {};

    /**
     * Returns the current amount of loaded annotations.
     *
     * @return Integer
     */
    this.getAnnotationCount = function() {
        return annotations.length;
    };

    /**
     * Returns the list of all annotations on the current page.
     *
     * @return Array.
     */
    this.getAnnotations = function() {
        return annotations;
    };

    /**
     * Returns the list of the user's annotation elements.
     *
     * @return Array
     */
    this.getUserAnnotations = function() {
        return userAnnotations;
    };

    this.setPrivateMode = function(private) {
        if(private) {
            GM_setValue('private_mode', 1);
        } else {
            GM_deleteValue('private_mode');
        }
    };

    /**
     * Creates a new annotation by the script's user.
     *
     * @param xpath The reference node's XPath expression.
     * @param comment The user's comment.
     * @param hide Boolean that indicates that the annotations should be hidden
     *        on the blog pages.
     */
    this.createNew = function(xpath, comment, hide) {
        this.addFromUser(SUA.userManager.getName(), xpath, comment);
        SUA.userManager.commitReview(userAnnotations, hide);
    };

    /**
     * Creates tags for the specified list of Annotation objects.
     *
     * @param annotations An Array of Annotation objects.
     * @param markUnsaved Optional boolean parameter that tells this function to mark the
     *                    annotations as unsaved.
     * @return {annotations : String, scribbles : String}
     */
    this.createAnnotationTags = function(annotations, markUnsaved) {
        var scribbleBlock = '';
        var annotationBlock = '';

        // Create annotation and scribble code
        for(var i = 0; i < annotations.length; ++i) {
            var anno = annotations[i];
            var loc = encodeURIComponent(anno.getLocationString());

            if(!loc) {
                SUA.panic("couldn't retrieve an annotation's location while generating the annotation tags");
                return;
            }

            if(markUnsaved) anno.isSaved(false);

            if(anno.scribble) {
                scribbleBlock += "\n[SUAS" + loc + "]\n" + encodeURIComponent(anno.scribble.caption + "|" + anno.scribble.getApplicableCode()) + "\n[/SUAS]";
            } else {
                annotationBlock += "\n[SUA" + loc + "]\n" + encodeURIComponent(anno.comment.trim()) + "\n[/SUA]";
            }
        }

        return {'annotations' : annotationBlock, 'scribbles' : scribbleBlock};
    };

    /**
     * Returns true, if the applicatin is currently in annotation mode
     * (user adds an annotation).
     *
     * @return Boolean
     */
    this.isInAnnotationMode = function() {
        return SUA.highlighter.selectionModeIsOn() || scribbleMode;
    };

    this.isInPrivateMode = function() {
        return privateMode;
    }

   /**
    * Starts the annotation mode for adding a new annotation.
    */
    this.startAnnotationMode = function() {
        if(!SUA.highlighter.selectionModeIsOn() && !scribbleMode && this.userMayInsertAnotherAnno()) {
            this.removeAll();
            SUA.highlighter.startSelection();
            SUA.toolbar.refresh();
        }
    };

    /**
     * Stops the annotation mode.
     */
    this.stopAnnotationMode = function() {
        if(SUA.highlighter.selectionModeIsOn()) {
            SUA.highlighter.stopSelection();
            this.insertAll();
            _destroyScribble();
            SUA.toolbar.refresh();
        }
    };

    /**
     * Starts scribble mode.
     */
    this.startScribbleMode = function() {
        if(!SUA.highlighter.selectionModeIsOn() && !scribbleMode && this.userMayInsertAnotherAnno()) {
            this.removeAll();
            scribbleMode = true;

            SUA.highlighter.startSelection(function(node) {
                SUA.highlighter.stopSelection();
                currentScribble = new ScribbleCanvas;
                currentScribble.attach(node);
                currentScribble.startEditing();
            });

            SUA.toolbar.refresh();
        }
    };

    /**
     * Aborts scribbling.
     */
    this.abortScribble = function() {
        if(scribbleMode) {
            _destroyScribble();
            SUA.toolbar.refresh();
            this.insertAll();
        }
    };

    /**
     * Saves the currently edited scribble.
     * This does only work if in scribble mode.
     */
    this.saveScribble = function() {
        if(currentScribble) {
            scribbleMode = false;
            SUA.toolbar.refresh();
            currentScribble.stopEditing();
            var node = currentScribble.attachedTo;

            if(node) {
                currentScribble.detach();
                var xpath = DocumentManager.getAnnotationXPath(node);
                this.createNew(xpath, currentScribble);
                currentScribble = null;
            } else {
                SUA.panic("couldn't determine the reference node of the scribble to save");
            }
        } else {
            SUA.panic("tried to save a non-existent scribble");
        }
    };

    /**
     * Updates the captions for the script user's scribbles.
     */
    this.updateUserScribbleCaptions = function() {
        for(var i = 0; i < userAnnotations.length; ++i) {
            var anno = userAnnotations[i];

            if(anno.scribble) {
                if(anno.scribble.caption) anno.setComment(anno.scribble.caption);
            }
        }
    };

   /**
    * Toggles the annotation display.
    */
    this.toggle = function() {
        if(SUA.toolbar.annoSwitch) {
            SUA.toolbar.annoSwitch.toggle();
        } else {
            if(GM_getValue('hideAnnos')) {
                GM_deleteValue('hideAnnos');
                this.removeAll();
            } else {
                GM_setValue('hideAnnos', 1);
                this.insertAll();
            }
        }
    };

    this.toggleExpand = function() {
        if(SUA.toolbar.annoSwitch) {
            SUA.toolbar.expandSwitch.toggle();
        } else {
            if(GM_getValue('expandAnnos')) {
                GM_deleteValue('expandAnnos');
                this.collapseAll();
            } else {
                GM_setValue('expandAnnos', 1);
                this.expandAll();
            }
        }
    };

    this.expandAll = function() {
        for(var i = 0; i < annotations.length; ++i) {
            annotations[i].expand();
        }
    };

    this.collapseAll = function() {
        for(var i = 0; i < annotations.length; ++i) {
            annotations[i].collapse();
        }
    };

   /**
    * Adds a single annotation from a SU user.
    *
    * @param user The user's name.
    * @param xpath The annotated element's XPath expression and an optional, additional text selection range.
    * @param comment The annotation text to add.
    */
    this.addFromUser = function(user, xpath, comment) {
        var addToUserList = false;

        if(user == SUA.userManager.getName()) {
            if(this.userMayInsertAnotherAnno()) {
                addToUserList = true;
            } else {
                return;
            }
        }

        var rangeStart;
        var match;
        var refNodeData;

        this.removeAll();

        if(match = (/\((\d+)\)$/).exec(xpath)) {
            rangeStart = parseInt(match[1]);
            xpath = xpath.replace(/\(\d+\)$/, '');
            refNodeData = DocumentManager.getApplicableNode(xpath);
        } else {
            refNodeData = DocumentManager.getApplicableNode(xpath);
        }

        if(refNodeData.node) {
            if(comment instanceof ScribbleCanvas) {
                // Discard scribbles that have been tempered with... toleration margin is 3%
                if(comment.getApplicableCode().length > (MAX_SCRIBBLE_CODE_LENGTH + 0.03 * MAX_SCRIBBLE_CODE_LENGTH)) {
                    return;
                }
            } else {
                if(comment.length > MAX_ALLOWED_ANNOTATION_LENGTH) {
                    comment = comment.substr(0, MAX_ALLOWED_ANNOTATION_LENGTH);
                }
            }

            var anno = new Annotation(user, comment, xpath, refNodeData.node, rangeStart, refNodeData.isUnoriginalRef);
            annotations.push(anno);

            if(addToUserList) {
                anno.belongsToUser = true;
                userAnnotations.push(anno);
            }

            this.sort();

            if(!GM_getValue('hideAnnos')) {
                this.insertAll();
            }

            if(GM_getValue('expandAnnos')) {
                anno.expand();
            }

            SUA.toolbar.updateQuicklinks();
        }
    };

   /**
    * Searches a user's review text for annotation tags.
    *
    * @param user The SU user's name.
    * @param review The user's review.
    */
    this.addAllFromUser = function(user, review) {
        // SU's review pages may contain the user's review twice
        if(!userRegistry[user]) {
            var match;
            var counter = 0;
            userRegistry[user] = true;
            AnnotationManager.suaRegex.lastIndex = 0;
            AnnotationManager.suasRegex.lastIndex = 0;

            // Load normal annotations
            while(match = AnnotationManager.suaRegex.exec(review)) {
                if(++counter > MAX_ALLOWED_USER_ANNOTATIONS) break;
                // SU tends to display the reviews with random spaces in between.
                // This fix removes spaces from the XPath expression
                var xpath = match[1].replace(/\s/g, '');
                var comment = match[3];

                try {
                    xpath = decodeURIComponent(xpath.replace(/\s/g, ''));
                    if(comment.match(/%[a-fA-F0-9]{2}/)) comment = decodeURIComponent(comment.replace(/\s/g, ''));
                } catch(e) {
                    // Do nothing in order to stay backwards-compatible with older annotations
                }

                this.addFromUser(user, xpath, comment);
            }

            // Load scribbles
            while(match = AnnotationManager.suasRegex.exec(review)) {
                if(++counter > MAX_ALLOWED_USER_ANNOTATIONS) break;
                // SU tends to display the reviews with random spaces in between.
                // This fix removes spaces from the XPath expression
                var xpath = match[1].replace(/\s/g, '');
                var code = match[3];

                try {
                    xpath = decodeURIComponent(xpath.replace(/\s/g, ''));
                    if(code.match(/%[a-fA-F0-9]{2}/)) code = decodeURIComponent(code.replace(/\s/g, ''));
                } catch(e) {
                    // Do nothing in order to stay backwards-compatible with older annotations
                }

                var scribble = new ScribbleCanvas(code);
                this.addFromUser(user, xpath, scribble);
            }
        }
    };

   /**
    * Inserts all annotations into the current page.
    */
    this.insertAll = function() {
        for(var i = 0; i < annotations.length; ++i) {
            annotations[i].attach();
        }
    };

   /**
    * Removes all annotations from the page.
    */
    this.removeAll = function() {
        for(var i = 0; i < annotations.length; ++i) {
            annotations[i].detach();
        }
    };

    /**
     * Starts editing for the specified annotation.
     *
     * @param anno The Annotation object to edit.
     */
    this.edit = function(anno) {
        if(anno.belongsToUser) {
            this.removeAll();

            if(anno.scribble) {
                scribbleMode = true;
                SUA.toolbar.refresh();
                anno.scribble.attach(anno.refNode);
                anno.scribble.startEditing();
            } else {
                SUA.editor.attach(anno);
            }
        } else {
            SUA.panic('tried to edit an annotation that belongs to a different user');
        }
    };

    /**
     * Starts the move function for an annotation.
     *
     * @param anno The Annotation object to move.
     */
    this.move = function(anno) {
        var self = this;

        if(anno.belongsToUser) {
            this.removeAll();

            SUA.highlighter.startSelection(function(node) {
                if(SUA.highlighter.isLargeTextMode() && !anno.scribble) {
                    var selection = DocumentManager.getSelectionData();
                    node = selection.node;
                    anno.rangeStart = selection.rangeStart;
                } else {
                    anno.rangeStart = null;
                }

                anno.xpath = DocumentManager.getAnnotationXPath(node);
                anno.refNode = node;
                anno.clearRefError();
                SUA.highlighter.stopSelection();
                SUA.userManager.commitReview(self.getUserAnnotations());
                self.insertAll();
                SUA.toolbar.refresh();
            });

            SUA.toolbar.refresh();
        } else {
            SUA.panic('tried to move an annotation that belongs to a different user');
        }
    };

    /**
     * Removes an annotation from the review.
     *
     * @param anno The Annotation object to permanently delete.
     */
    this.removeFromReview = function(anno) {
        if(anno.belongsToUser) {
            annotations.removeValue(anno);
            userAnnotations.removeValue(anno);
            SUA.userManager.commitReview(userAnnotations);
            SUA.toolbar.updateQuicklinks();
            anno.detach();
        } else {
            SUA.panic('tried to delete an annotation that belongs to a different user');
        }
    };

   /**
    * This function tries to sort the annotations in an order that
    * makes it possible to cleanly insert the annotations sequentially.
    */
    this.sort = function() {
        var sortHandler = function(a, b) {
            var match;
            var aIdx, bIdx;

            if(match = (/text\(\)\[(\d+)\]/).exec(a.xpath)) {
                aIdx = parseInt(match[1]);
            }

            if(match = (/text\(\)\[(\d+)\]/).exec(b.xpath)) {
                bIdx = parseInt(match[1]);
            }

            if(aIdx && !bIdx) {
                return -1;
            }

            if(bIdx && !aIdx) return 1;

            return aIdx > bIdx ? -1 : 1;
        };

        annotations.sort(sortHandler);
    };

   /**
    * Does a security check for the amount of allowed annotations by the user.
    *
    * @return Boolean
    */
    this.userMayInsertAnotherAnno = function() {
        if(userAnnotations.length + 1 > MAX_ALLOWED_USER_ANNOTATIONS) {
            alert('You may not insert more than ' + MAX_ALLOWED_USER_ANNOTATIONS +
                    ' annotations for that page.\nKeep it clean, hmmkay? :-)');

            return false;
        }

        return true;
    };

    // PRIVATE METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Destroys the current scribble, if in scribble mode.
     */
    function _destroyScribble() {
        if(scribbleMode) {
            scribbleMode = false;

            // We abort a new scribble
            if(currentScribble) {
                currentScribble.destroy();
                currentScribble = null;
            }
        }
    }
}

// Annotation tag regex
AnnotationManager.suaRegex = /\[[ ]*S[ ]*U[ ]*A([^S](\[[^\]]*\]|[^\]])+?)\]((.|\s)+?)\[[ ]*\/[ ]*S[ ]*U[ ]*A[ ]*\]/g;
// Scribble tag regex
AnnotationManager.suasRegex = /\[[ ]*S[ ]*U[ ]*A[ ]*S((\[[^\]]*\]|[^\]])+?)\]((.|\s)+?)\[[ ]*\/[ ]*S[ ]*U[ ]*A[ ]*S[ ]*\]/g;

// ------------------------------------------------------------------------------------------------------------
// EDITOR

/**
 * Editor component.
 */
function Editor() {
    var self = this;
    var rangeStart;
    var postit = document.createElement('div');
    var container = document.createElement('div');
    var ta = document.createElement('textarea');
    var hideSwitch = document.createElement('input');
    var hideLabel = document.createElement('label');
    var counter = document.createElement('span');

    var save = new Button('Save', function() {
        saveAnnotation(self);
    });

    save.domNode.style.cssFloat = 'right';

    var cancel = new Button('Cancel', function() {
        cancelAnnotation(self);
    });

    if(GM_getValue('editBlogHide')) {
        hideSwitch.checked = true;
    } else {
        hideSwitch.checked = false;
    }

    counter.style.color = 'white';
    counter.style.fontFamily = 'sans-serif';
    counter.style.fontSize = '12px';
    counter.style.marginLeft = '5px';
    counter.innerHTML = MAX_ALLOWED_ANNOTATION_LENGTH + ' characters left';

    StyleTools.normalizeLabel(hideLabel);
    hideLabel.appendChild(hideSwitch);
    hideLabel.appendChild(document.createTextNode('Hide in blog post'));
    hideLabel.style.cssFloat = 'right';
    hideLabel.style.marginRight = '5px';

    hideSwitch.setAttribute('type', 'checkbox');
    hideSwitch.style.position = 'static';
    hideSwitch.style.margin = '5px';
    hideSwitch.style.verticalAlign = 'middle';

    postit.style.height = '130px';

    container.style.border = 'solid 3px #488AC7';
    container.style.background = 'url(' + Resources.deepBlueGradient + ')';
    container.style.padding = '3px';
    container.style.textAlign = 'left';
    container.style.width = '380px';
    container.style.MozBoxShadow = '1px 1px 4px #000000';

    StyleTools.normalizeInput(ta);
    ta.style.width = '100%';
    ta.style.height = '80px';
    ta.style.display = 'block';
    ta.setAttribute('maxlength', MAX_ALLOWED_ANNOTATION_LENGTH);
    ta.addEventListener('keypress', constrainTextLength, true);
    ta.addEventListener('keyup', constrainTextLength, true);
    ta.addEventListener('keydown', constrainTextLength, true);

    postit.appendChild(container);
    container.appendChild(ta);
    container.appendChild(save.domNode);
    container.appendChild(hideLabel);
    container.appendChild(cancel.domNode);
    container.appendChild(counter);

    /**
     * Attaches the editor to the user selected location as specified by the
     * Highlighter component.
     *
     * @param anno An optional existing Annotation object that can be specified for editing.
     */
    this.attach = function(anno) {
        if(anno) {
            this.anno = anno;
            ta.value = anno.comment.trim();
            updateCharacterCounter();

            if(typeof anno.rangeStart != 'undefined') {
                var range = document.createRange();

                if(!anno.refNode) {
                    var refNode = DocumentManager.getApplicableNode(anno.xpath);
                    anno.refNode = refNode.node;
                    anno.refError = refNode.isUnoriginalRef;
                }

                try {
                    range.setStart(anno.refNode, rangeStart);
                    range.setEnd(anno.refNode, rangeStart);
                } catch(e) {
                    // Fallback: put annotation at the beginning of the text node
                    range.setStart(anno.refNode, 0);
                    range.setEnd(anno.refNode, 0);
                }

                range.insertNode(postit);
            } else {
                var anchor;

                if(anchor = DocumentManager.getAnchorParent(anno.refNode)) {
                    anchor.parentNode.insertBefore(postit, anchor);
                } else {
                    anno.refNode.parentNode.insertBefore(postit, anno.refNode);
                }
            }
        } else {
            ta.value = '';
            updateCharacterCounter();

            if(SUA.highlighter.isLargeTextMode()) {
                var selection = DocumentManager.getSelectionData();
                rangeStart = selection.rangeStart;
                SUA.highlighter.selectedElement = selection.node;
                selection.range.insertNode(postit);
            } else {
                var anchor;

                if(anchor = DocumentManager.getAnchorParent(SUA.highlighter.selectedElement)) {
                    anchor.parentNode.insertBefore(postit, anchor);
                } else {
                    SUA.highlighter.selectedElement.parentNode.insertBefore(postit, SUA.highlighter.selectedElement);
                }
            }
        }

        container.style.position = 'absolute';
        container.style.zIndex = '1999999999';
        ta.focus();
    };

    /**
     * Detaches the editor from the document.
     */
    this.detach = function() {
        if(postit.parentNode) {
            var prevNode = postit.previousSibling;
            var nextNode = postit.nextSibling;
            postit.parentNode.removeChild(postit);

            if(prevNode && nextNode) {
                if(prevNode.nodeType == 3 && nextNode.nodeType == 3) {
                    prevNode.textContent += nextNode.textContent;
                    prevNode.parentNode.removeChild(nextNode);
                }
            }
        }

        this.anno = null;
    };

    /**
     * Limits the textarea's content to MAX_ALLOWED_ANNOTATION_LENGTH characters.
     */
    function constrainTextLength() {
        if(ta.value.length > MAX_ALLOWED_ANNOTATION_LENGTH) {
            var caret = ta.selectionStart;
            ta.value = ta.value.substr(0, MAX_ALLOWED_ANNOTATION_LENGTH);
            ta.setSelectionRange(caret, caret);
        }

        updateCharacterCounter();

        return true;
    }

    /**
     * Updates the character count.
     */
    function updateCharacterCounter() {
        counter.innerHTML = (MAX_ALLOWED_ANNOTATION_LENGTH - ta.value.length) + ' characters left';
    }

    /**
     * Click event handler for cancling the new annotation.
     */
    function cancelAnnotation(self) {
        var anno = self.anno;
        self.detach();

        if(anno) {
            SUA.annotationManager.insertAll();
        } else {
            SUA.annotationManager.stopAnnotationMode();
        }

        storeBlogHideFlag();
    }

    /**
     * Click event handler for saving the new annotation.
     *
     * @param self A reference to this object.
     */
    function saveAnnotation(self) {
        var anno = self.anno;
        self.detach();
        storeBlogHideFlag();

        if(anno) {
            if(ta.value.length) {
                if(ta.value.length > MAX_ALLOWED_ANNOTATION_LENGTH) {
                    ta.value = ta.value.substr(0, MAX_ALLOWED_ANNOTATION_LENGTH);
                }

                anno.setComment(ta.value);
                SUA.userManager.commitReview(SUA.annotationManager.getUserAnnotations(), hideSwitch.checked);
            }

            SUA.annotationManager.insertAll();
        } else {
            var selectedElement = SUA.highlighter.selectedElement;
            SUA.highlighter.stopSelection();

            if(ta.value.length) {
                if(ta.value.length > MAX_ALLOWED_ANNOTATION_LENGTH) {
                    ta.value = ta.value.substr(0, MAX_ALLOWED_ANNOTATION_LENGTH);
                }

                var xpath = DocumentManager.getAnnotationXPath(selectedElement);

                if(SUA.highlighter.isLargeTextMode()) {
                    xpath += '(' + rangeStart + ')';
                }

                SUA.annotationManager.createNew(xpath, ta.value, hideSwitch.checked);
            } else {
                SUA.annotationManager.insertAll();
            }
        }

        SUA.toolbar.refresh();
    }

    /**
     * Permanently stores the hide switch checkbox'es state.
     */
    function storeBlogHideFlag() {
        if(hideSwitch.checked) {
            GM_setValue('editBlogHide', 1);
        } else {
            GM_deleteValue('editBlogHide');
        }
    }
}

// ------------------------------------------------------------------------------------------------------------
// BUTTON

/**
 * A component for this UI's buttons.
 */
function Button(label, onClick, useCapture) {
    if(typeof useCapture == 'undefined') useCapture = false;
    var buttonGradient = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAIAAABi9+OQAAAANUlEQVQImW3MsQ0AIBDDQGRnf7EJBQtS/DcguugUecy9EIgSRCFI9PIItgfQZ/enGuXV+PoBLZADLtsoOgwAAAAASUVORK5CYII=)';

    if(onClick) {
        this.onClick = onClick;
    } else {
        this.onClick = function() {};
    }

    this.domNode = document.createElement('button');
    this.domNode.setAttribute('SUA_protect', '1');
    this.domNode.innerHTML = label;
    this.domNode.addEventListener('click', this.onClick, useCapture);
    this.domNode.style.background = buttonGradient;
    this.domNode.style.border = '1px solid black';
    this.domNode.style.MozBorderRadius = '5px';
    this.domNode.style.fontFamily = 'sans-serif';
    this.domNode.style.fontWeight = 'bold';
    this.domNode.style.fontSize = '12px';
    this.domNode.style.color = 'black';
    this.domNode.style.height = '20px';
    this.domNode.style.margin = '2px';
    this.domNode.style.padding = '0px 6px 0px 6px';
    this.domNode.style.textTransform = 'none';
}

/**
 * Sets a new label for this Button.
 *
 * @param label The new label to set.
 */
Button.prototype.setLabel = function(label) {
    this.domNode.innerHTML = label;
};

// ------------------------------------------------------------------------------------------------------------
// GLYPH BUTTON

/**
 * Components for toolbar glyph buttons.
 */
function GlyphButton(src, onClick, tooltip) {
    this.domNode = document.createElement('img');
    this.domNode.setAttribute('src', src);
    this.domNode.setAttribute('title', tooltip);
    StyleTools.normalizeImage(this.domNode);
    this.domNode.style.verticalAlign = 'middle';
    this.domNode.style.margin = '0px 5px 0px 5px';
    this.domNode.style.cursor = 'pointer';

    if(onClick) {
        this.onClick = onClick;
    } else {
        this.onClick = function() {};
    }

    this.domNode.addEventListener('click', this.onClick, false);
}

/**
 * Highlights this button.
 */
GlyphButton.prototype.select = function() {
    this.domNode.style.outlineColor = 'grey';
    this.domNode.style.outlineStyle = 'solid';
    this.domNode.style.outlineWidth = '3px';
    this.domNode.style.MozOutlineRadius = '5px';
};

/**
 * Removes the highlight from this button.
 */
GlyphButton.prototype.unselect = function() {
    this.domNode.style.outline = 'none';
};

// ------------------------------------------------------------------------------------------------------------
// COLOR BUTTON

/**
 * A color palette button.
 */
function ColorButton(color, onClick) {
    this.domNode = document.createElement('div');
    StyleTools.normalizeDiv(this.domNode);
    this.domNode.style.width = '16px';
    this.domNode.style.height = '16px';
    this.domNode.style.backgroundColor = color.toString();
    this.domNode.style.display = 'inline-block';
    this.domNode.style.verticalAlign = 'middle';
    this.domNode.style.margin = '0px 2px 0px 2px';

    if(onClick) {
        this.onClick = onClick;
    } else {
        this.onClick = function() {};
    }

    this.domNode.addEventListener('click', this.onClick, false);
}

/**
 * Highlights this button.
 */
ColorButton.prototype.select = function() {
    this.domNode.style.outlineColor = 'grey';
    this.domNode.style.outlineStyle = 'solid';
    this.domNode.style.outlineWidth = '3px';
    this.domNode.style.MozOutlineRadius = '5px';
};

/**
 * Removes the highlight from this button.
 */
ColorButton.prototype.unselect = function() {
    this.domNode.style.outline = 'none';
};

// ------------------------------------------------------------------------------------------------------------
// SWITCH BUTTON

/**
 * Components for graphical switch buttons that store their state.
 *
 * @param id A unique identifier for storage.
 * @param onSrc The image src attribute for the "On" state.
 * @param offSrc The image src attribute for the "Off" state.
 * @param invert Inverts the switch logic - a missing setting turns it on and vice versa.
 * @param tooltipOn The tooltip for the on image.
 * @param tooltopOff The tooltop for the off image.
 * @param onTurnOn Optional turnOn event handler.
 * @param onTurnOff Optional turnOff event handler.
 */
function SwitchButton(id, onSrc, offSrc, invert, tooltipOn, tooltipOff, onTurnOn, onTurnOff) {
    var self = this;
    var isOn = GM_getValue(id) ? true : false;
    if(invert) isOn = !isOn;

    if(onTurnOn) {
        this.onTurnOn = onTurnOn;
    } else {
        this.onTurnOn = function() {};
    }

    if(onTurnOff) {
        this.onTurnOff = onTurnOff;
    } else {
        this.onTurnOff = function() {};
    }

    this.isOn = function() {
        return isOn;
    };

    this.turnOn = function() {
        if(invert) {
            GM_deleteValue(id);
        } else {
            GM_setValue(id, 1);
        }

        isOn = true;
        this.domNode.setAttribute('src', onSrc);
        this.domNode.setAttribute('title', tooltipOn);
        this.onTurnOn();
    };

    this.turnOff = function() {
        if(invert) {
            GM_setValue(id, 1);
        } else {
            GM_deleteValue(id);
        }

        isOn = false;
        this.domNode.setAttribute('src', offSrc);
        this.domNode.setAttribute('title', tooltipOff);
        this.onTurnOff();
    };

    this.toggle = function() {
        if(isOn) {
            this.turnOff();
        } else {
            this.turnOn();
        }
    };

    var toggleHandler = function() {
        self.toggle();
    };

    this.domNode = document.createElement('img');
    StyleTools.normalizeImage(this.domNode);
    this.domNode.style.cursor = 'pointer';
    this.domNode.addEventListener('click', toggleHandler, false);
    this.domNode.style.border = 'none 0px';
    this.domNode.style.outline = 'none 0px';
    this.domNode.style.margin = '2px';
    this.domNode.style.padding = '0px';
    this.domNode.style.verticalAlign = 'top';
    this.domNode.setAttribute('SUA_protect', '1');

    if(isOn) {
        this.domNode.setAttribute('src', onSrc);
        this.domNode.setAttribute('title', tooltipOn);
    } else {
        this.domNode.setAttribute('src', offSrc);
        this.domNode.setAttribute('title', tooltipOff);
    }
}

// ------------------------------------------------------------------------------------------------------------
// HIGHLIGHTER COMPONENT

/**
 * Annotation mode highlighter and element selection component.
 */
function Highlighter() {
    var self = this;
    var lastNode;
    var largeTextMode;
    var forceLargeTextMode = false;
    var selectionMode = false;
    var altSelectionHandler;

    this.domNode = document.createElement('div');
    this.domNode.style.position = 'absolute';
    this.domNode.style.zIndex = '1999999998';
    this.domNode.style.backgroundColor = 'red';
    this.domNode.style.MozOpacity = '0.5';
    this.domNode.style.display = 'none';

    this.lastTime = (new Date).getTime();
    this.selectedElement = false;

    /**
     * Returns true if this component is currently in element selection mode.
     *
     * @return Boolean
     */
    this.selectionModeIsOn = function() {
        return selectionMode;
    }

    /**
     * Starts the selection mode.
     *
     * @param selectionHandler An alternative mouse click handler that is invoked
     *        instead of the locally used one.
     */
    this.startSelection = function(selectionHandler) {
        if(!selectionMode) {
            var self = this;
            selectionMode = true;
            forceLargeTextMode = false;
            window.status = '[SUA] Annotation mode started...';
            document.body.addEventListener('mousemove', selectElement, true);
            document.body.addEventListener('mousedown', switchSelectionMode, false);

            if(selectionHandler) {
                altSelectionHandler = function(e) {
                    if(!e.target.getAttribute('SUA_protect'))
                        selectionHandler(self.selectedElement);
                };

                document.body.addEventListener('click', altSelectionHandler, false);
            } else {
                altSelectionHandler = null;
                document.body.addEventListener('click', confirmElement, false);
            }

            document.body.addEventListener('contextmenu', suppressContextMenu, false);
            document.body.addEventListener('mousemove', moveHandlerCaller, true);
            document.body.appendChild(this.domNode);
        }
    };

    /**
     * Stops the selection mode.
     */
    this.stopSelection = function() {
        if(selectionMode) {
            this.domNode.style.display = 'none';
            selectionMode = false;
            window.status = '';
            restoreLastNodeProperties();
            this.restoreElement();
            this.selectedElement = null;

            document.body.removeEventListener('mousemove', selectElement, true);
            document.body.removeEventListener('mousedown', switchSelectionMode, false);

            if(altSelectionHandler) {
                document.body.removeEventListener('click', altSelectionHandler, false);
                altSelectionHandler = null;
            } else {
                document.body.removeEventListener('click', confirmElement, false);
                SUA.editor.detach();
            }

            document.body.removeEventListener('contextmenu', suppressContextMenu, false);
            document.body.removeEventListener('mousemove', moveHandlerCaller, true);
            document.body.removeChild(this.domNode);
        }
    };

    /**
     * Returns true if the highlighter is currently in large text block selection mode
     * (the orange background color).
     *
     * @return Boolean
     */
    this.isLargeTextMode = function() {
        return largeTextMode;
    };

    /**
     * Highlights the specified DOM node.
     *
     * @param node The DOM node to highlight.
     */
    this.highlightNode = function(node, freeze) {
        restoreLastNodeProperties();
        if(freeze) document.body.removeEventListener('mousemove', moveHandlerCaller, true);

        if(node.nodeType == 3) {
            node = node.parentNode;
        }

        lastNode = node;

        // Determine whether the current node is a huge blob of text without many formattings
        if((forceLargeTextMode && node.textContent.length) || node.textContent.length > 1024) {
            largeTextMode = true;
            style = node.getAttribute('style');
            if(!style) style = ' ';
            node.setAttribute('SUA_backupStyle', style);
            node.setAttribute('style', 'background-color:#FFCC66');
            this.domNode.style.display = 'none';
        } else {
            // Standard element selection mode
            largeTextMode = false;
            this.lastTime = (new Date).getTime();
            this.domNode.style.display = 'block';
            this.domNode.style.top = DocumentManager.computeTop(node) + 'px';
            this.domNode.style.left = DocumentManager.computeLeft(node) + 'px';
            this.domNode.style.width = node.offsetWidth + 'px';
            this.domNode.style.height = node.offsetHeight + 'px';
        }
    };

    /**
     * Restores the original properties and behavior of the highlighted element
     */
    this.restoreElement = function() {
        if(this.selectedElement && this.selectedElement.nodeType == 1) {
            var anchor;

            if(anchor = this.selectedElement.getAttribute('SUA_anchorParent')) {
                $(anchor).each(function(anchor) {
                    anchor.setAttribute('href', anchor.getAttribute('SUA_href_backup'));
                });
            }
        }
    };

    // PRIVATE METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Restores the last selected element's original properties
     * (if it has been changed by the Hihlighter).
     */
    function restoreLastNodeProperties() {
        if(lastNode && lastNode.getAttribute) {
            var bs;

            if(bs = lastNode.getAttribute('SUA_backupStyle')) {
                lastNode.setAttribute('style', bs);
            }
        }
    }

    // EVENT HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    function switchSelectionMode(e) {
        e.stopPropagation();

        if(e.button == 2) {
            forceLargeTextMode = true;
            self.highlightNode(self.selectedElement, false);
        }
    }

    /**
     * Mouse click event handler for confirming an highlighted element.
     * This function adds an editor for creating an annotation.
     *
     * @param e Event object
     */
    function confirmElement(e) {
        if(!e.target.getAttribute('SUA_protect')) {
            document.body.removeEventListener('mousemove', selectElement, true);
            document.body.removeEventListener('click', confirmElement, false);
            document.body.removeEventListener('mousedown', switchSelectionMode, false);

            SUA.editor.attach();
            self.highlightNode(self.selectedElement, true);
        }
    }

   /**
    * Mouse move event handler for highlighting an element from the page.
    *
    * @param e Event object
    */
    function selectElement(e) {
        if(e.target.getAttribute('SUA_protect')) return;

        if(e.target != self.domNode) {
            self.restoreElement();
            self.selectedElement = e.target;
            var anchor;

            if(anchor = DocumentManager.getAnchorParent(self.selectedElement)) {
                self.selectedElement.setAttribute('SUA_anchorParent', DocumentManager.getElementXPath(anchor));
                anchor.setAttribute('SUA_href_backup', anchor.getAttribute('href'));
                anchor.removeAttribute('href');
            }

            self.highlightNode(self.selectedElement);
        }
    }

    /**
     * A small hack that allows to pass a proper reference to this object to
     * the moverHandler function.
     *
     * @param e Event object
     */
    function moveHandlerCaller(e) {
        moveHandler(e, self);
    }

    /**
     * Mouse move handler that automatically removes the red hilighting layer
     * in a regular interval in order to allow the selection of an element
     * that is currently obscured by the red layer.
     *
     * @param e Even object
     * @param ref The Highlighter instance
     */
    function moveHandler(e, ref) {
        if(largeTextMode) return;
        var curTime = (new Date).getTime();

        if((curTime - ref.lastTime) > 100) {
            ref.lastTime = curTime;
            ref.domNode.style.display = 'none';

            if(document.elementFromPoint) {
                selectElement({target : document.elementFromPoint(e.clientX, e.clientY)});
            }
        }
    }

    /**
     * Supresses the right mouse button context menu to appear.
     */
    function suppressContextMenu(e) {
        e.stopPropagation();
    }
}

// ------------------------------------------------------------------------------------------------------------
// SUA TOOLBAR COMPONENT

/**
 * The SUA main toolbar component.
 *
 * TODO Needs refactoring. Make use of Toolbar base class.
 */
function SuaToolbar() {
    var bar, toolbar, annotators;
    var mode;

    this.addButton;
    this.annoSwitch;

    /**
     * TODO Not used, yet.
     */
    this.setMode = function(m) {
        mode = m;

        switch(m) {
            case SUA.SU_MODE:
                bar.style.background = 'url(' + Resources.blueToolbarGradient + ')';
                break;

            case SUA.PRIVATE_MODE:
                bar.style.background = 'url(' + Resources.greenToolbarGradient + ')';
                break;
        }
    };

   /**
    * Adds the annotation toolbar to the top of the page.
    */
    this.attach = function() {
        var self = this;
        bar = document.createElement('div');
        toolbar = document.createElement('div');
        annotators = document.createElement('div');

        var scribble = document.createElement('img');
        scribble.setAttribute('src', Resources.scribbleIcon);
        scribble.addEventListener('click', function() {
            SUA.annotationManager.startScribbleMode();
        }, false);
        StyleTools.normalizeImage(scribble);
        scribble.style.margin = '0px 2px 0px 5px';
        scribble.style.cursor = 'pointer';
        scribble.setAttribute('title', 'Add Scribble');

        this.annoSwitch = new SwitchButton('hideAnnos', Resources.annosOnIcon, Resources.annosOffIcon,
                                    true, 'Hide Annotations', 'Show Annotations',
                                    function() {
                                        SUA.annotationManager.insertAll();
                                    },
                                    function() {
                                        SUA.annotationManager.removeAll();
                                    });
        this.annoSwitch.domNode.style.marginLeft = '15px';

        this.expandSwitch = new SwitchButton('expandAnnos', Resources.annosCollapsedIcon, Resources.annosExpandedIcon,
                                    true, 'Expand All', 'Collapse All',
                                    function() {
                                        SUA.annotationManager.collapseAll();
                                    },
                                    function() {
                                        SUA.annotationManager.expandAll();
                                    });

        if(GM_getValue('suppressToolbar')) {
            toolbar.style.display = 'none';
        }

        this.addButton = new Button('Add Annotation', function(e) {
            e.stopPropagation();

            // Label will be updated through a confirmation by annotationManager (refresh)
            if(SUA.annotationManager.isInAnnotationMode()) {
                SUA.annotationManager.stopAnnotationMode();
            } else {
                SUA.annotationManager.startAnnotationMode();
            }
        }, true);

        this.addButton.domNode.style.width = '110px';

        var closeButton = document.createElement('img');
        closeButton.setAttribute('src', Resources.closeButton);
        closeButton.style.cssFloat = 'right';
        closeButton.style.cursor = 'pointer';
        closeButton.style.margin = '2px';
        closeButton.addEventListener('click', this.toggle, false);

        var reportIssue = document.createElement('a');
        StyleTools.normalizeAnchor(reportIssue);
        reportIssue.style.cssFloat = 'right';
        reportIssue.style.margin = '5px 5px 0px 0px';
        reportIssue.innerHTML = 'Report a problem';
        reportIssue.setAttribute('href', '#');
        reportIssue.addEventListener('click', function() {
            IssueReporter.fileIssue();
        }, false);

        toolbar.appendChild(bar);
        bar.appendChild(closeButton);
        bar.appendChild(reportIssue);
        bar.appendChild(this.addButton.domNode);
        bar.appendChild(scribble);
        bar.appendChild(this.annoSwitch.domNode);
        bar.appendChild(this.expandSwitch.domNode);
        bar.appendChild(annotators);

        bar.setAttribute('SUA_protect', '1');
        toolbar.setAttribute('SUA_protect', '1');
        annotators.setAttribute('SUA_protect', '1');
        scribble.setAttribute('SUA_protect', '1');
        closeButton.setAttribute('SUA_protect', '1');
        closeButton.style.border = 'none 0px';
        closeButton.style.outline = 'none 0px';
        closeButton.style.padding = '0px';

        toolbar.style.height = '22px';
        toolbar.style.margin = '0px';
        toolbar.style.padding = '0px';

        annotators.style.fontFamily = 'sans-serif';
        annotators.style.fontWeight = 'normal';
        annotators.style.fontSize = '12px';
        annotators.style.color = 'white';
        annotators.style.display = 'inline-block';
        annotators.style.width = 'auto';
        annotators.style.height = 'auto';
        annotators.style.marginLeft = '10px';

        bar.style.margin = '0px';
        bar.style.textAlign = 'left';
        bar.style.height = '22px';
        bar.style.borderBottom = '1px solid black';
        bar.style.position = 'fixed';
        bar.style.width = '100%';
        bar.style.background = 'url(' + Resources.blueToolbarGradient + ')';
        bar.style.zIndex = '2000000000';
        bar.style.top = '0px';
        bar.style.left = '0px';
        bar.style.MozBoxShadow = '1px 1px 4px #000000';
        document.body.insertBefore(toolbar, document.body.firstChild);
        document.body.marginTop = '22px';

        // Hook hotkey event listener:
        window.addEventListener('keydown', function(e) {
            if(e.altKey && e.ctrlKey) {
                switch(e.keyCode) {
                    // <CTRL> + <ALT> + T
                    case 84:
                        SUA.toolbar.toggle();
                        break;

                    // <CTRL> + <ALT> + H
                    case 72:
                        SUA.annotationManager.toggle();
                        break;

                    // <CTRL> + <ALT> + C
                    case 67:
                        SUA.annotationManager.startAnnotationMode();
                        break;

                    // <CTRL> + <ALT> + S
                    case 83:
                        SUA.annotationManager.startScribbleMode();
                        break;

                    // <CTRL> + <ALT> + E
                    case 69:
                        SUA.annotationManager.toggleExpand();
                }
            } else {
                switch(e.keyCode) {
                    // <ESC>
                    case 27:
                        SUA.annotationManager.stopAnnotationMode();
                        break;
                }
            }
        }, false);
    };

    /**
     * Refreshes the whole toolbar.
     */
    this.refresh = function() {
        if(SUA.annotationManager.isInAnnotationMode()) {
            this.addButton.setLabel('Cancel');
        } else {
            this.addButton.setLabel('Add Annotation');
        }
    };

   /**
    * Updates the quicklinks.
    */
    this.updateQuicklinks = function() {
        var annotations = SUA.annotationManager.getAnnotations();
        annotators.innerHTML = '';

        if(annotations.length > 0) {
            annotators.innerHTML = 'Annotations by: ';
        }

        for(var i = 0; i < annotations.length && i < 8; ++i) {
            var anno = annotations[i];
            var link = document.createElement('a');
            link.setAttribute('SUA_protect', '1');
            link.setAttribute('href', window.location.href.replace(/#.*$/, '') + '#' + anno.getAnchorName());
            link.style.marginRight = '5px';
            link.innerHTML = anno.user;
            link.style.fontFamily = 'sans-serif';
            link.style.fontWeight = 'bold';
            link.style.fontSize = '12px';
            link.style.color = 'white';
            annotators.appendChild(link);
        }

        if(i < annotations.length - 1) {
            var quickLinkMoreCounter = document.createElement('span');
            quickLinkMoreCounter.style.display = 'inline-block';
            quickLinkMoreCounter.style.marginRight = '5px';
            quickLinkMoreCounter.style.fontFamily = 'sans-serif';
            quickLinkMoreCounter.style.fontWeight = 'bold';
            quickLinkMoreCounter.style.fontSize = '12px';
            quickLinkMoreCounter.style.color = 'white';
            annotators.appendChild(quickLinkMoreCounter);
            quickLinkMoreCounter.innerHTML = '...and ' + (annotations.length - i) + ' more';
        }
    };

   /**
    * Toggles the annotation toolbar on/off.
    */
    this.toggle = function() {
        if(GM_getValue('suppressToolbar')) {
            GM_deleteValue('suppressToolbar');

            if(ReviewPageManager.firstReviewPage.length) {
                if(toolbar) {
                    toolbar.style.display = 'block';
                } else {
                    this.attach();
                }
            }
        } else {
            GM_setValue('suppressToolbar', 1);

            if(toolbar) toolbar.style.display = 'none';
        }
    };
}

// ------------------------------------------------------------------------------------------------------------
// USER MANAGER COMPONENT

/**
 * A component for maintaining information about the SU user who uses this script.
 */
function UserManager() {
    var name;
    var review;

    this.hiddenSUATagsRegex = /\s*<ul\s*style\s*=\s*"display:none"[^>]*>\s*<li>(\s*\[[ ]*S[ ]*U[ ]*A([ ]*S|)[^\]]*\](.|\s)*?\[[ ]*\/[ ]*S[ ]*U[ ]*A([ ]*S|)[ ]*\]\s*)+?<\/li>\s*<\/ul>/g;

    /**
     * Return's the currently logged in SU user's name.
     * @return String
     */
    this.getName = function() {
        return name;
    };

    /**
     * Return's the user's review for the current page.
     */
    this.getReview = function() {
        return review;
    };

    /**
     * Sets the currently logged in SU user's name.
     *
     * @param userName The user's name to set.
     */
    this.setName = function(userName) {
        name = userName;
    };

    /**
     * Sets the user's current review.
     *
     * @param txt The review text to set.
     */
    this.setReview = function(txt) {
        review = txt;
    };

    /**
     * Removes annotation tags from the specified string.
     *
     * @param txt The string to have its annotation tags removed.
     * @return String (without SUA tags)
     */
    this.removeAllAnnotationsFrom = function(txt) {
        // Throw out SUA tags wrapped in "hider container"
        txt = txt.replace(this.hiddenSUATagsRegex, '');
        // Throw out any non-wrapped SUA tags
        txt = txt.replace(/\s*\[[ ]*S[ ]*U[ ]*A[^\]]+\]((.|\s)+?)\[[ ]*\/[ ]*S[ ]*U[ ]*A[ ]*\]\s*/g, '');

        return txt;
    };

    /**
     * Commits the annotations to the local data storage.
     * Previously existing annotations for the current page are overwritten by this operation.
     *
     * @param annotations An Array of Annotation objects.
     */
    this.commitLocalStorage = function(annotations) {
        var data = SUA.annotationManager.createAnnotationTags(annotations);

        if(!(data.annotations.length && data.scribbles.length)) {
            LocalStorage.deleteAnnotationDataForUrl(window.location.href);
        } else {
            LocalStorage.setAnnotationDataForUrl(window.location.href, data.annotations + data.scribbles);
        }
    };

   /**
    * Function for commiting the current annotations to the user's review.
    * Previously existing annotations for the current page are overwritten by this operation.
    *
    * @param annotations The user's annotations.
    * @param hide Flag that indicates that the tags should be hidden on the blog pages.
    */
    this.commitReview = function(annotations, hide) {
        var self = this;

        // Comment id might have changed or user could have parallelly changed the review
        // therefore we update the first review page
        ReviewPageManager.loadFirstPage(function() {
            var match;

            // Auto-detect hide status based on existing review, if hide flag is not specified
            if(typeof hide == 'undefined') {
                if(review.match(self.hiddenSUATagsRegex)) {
                    hide = true;
                } else {
                    hide = false;
                }
            }

            // Fetch tokens for posting the new review
            if(match = (/<ul\s+class="listStumble listUrlReviews">\s*?<li[^>]+>(.|\s)+?<var\s+id="([^"]+)"\s+class="([^"]+)">/i).exec(ReviewPageManager.firstReviewPage)) {
                var commentid = match[2];
                var publicid = match[3];

                match = (/<div\s+id="wrapperContent"\s+class="([^"]+)">/i).exec(ReviewPageManager.firstReviewPage);
                var token = match[1];
                var filteredReview = self.removeAllAnnotationsFrom(review);

                if(typeof commentid == 'undefined' || typeof publicid == 'undefined' || typeof token == 'undefined') {
                    SUA.panic("couldn't update the review due to missing credentials");
                    return;
                }

                var tags = SUA.annotationManager.createAnnotationTags(annotations);

                if(tags.annotations.length && hide) {
                    filteredReview += "\n<ul style=\"display:none\">\n<li>" + tags.annotations + "</li>\n</ul>";
                } else {
                    filteredReview += tags.annotations;
                }

                // Scribbles are hidden by default, because they are very hideous
                if(tags.scribbles.length) {
                    filteredReview += "\n<ul style=\"display:none\">\n<li>" + tags.scribbles + "</li>\n</ul>";
                }

                if(filteredReview.trim().length > 0) {
                    var postData = "review=" + encodeURIComponent(filteredReview) +
                                "&keep_date=1&sticky_post=0&commentid=" + commentid +
                                "&publicid=" + publicid +
                                "&syndicate_tw=&syndicate_fb=&token=" + token;

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://www.stumbleupon.com/ajax/edit/comment",
                        data: postData,
                        headers: {
                            // NOTE The charset attribute is currently ignored by SU's server :-(
                            "Content-Type": "application/x-www-form-urlencoded;charset=" + document.characterSet
                        },
                        onload: function(response) {
                            for(var i = 0; i < annotations.length; ++i) {
                                annotations[i].isSaved(true);
                            }
                        }
                    });
                } else {
                    // TODO Check for function that doesn't remove the rating!
                    // Check for availability of the commentid! If it does not exist -> Reload first review page!
                    //
                    // No review text available to store => delete review
                    var postData = "commentid=" + commentid + "&publicid=" + publicid + "&token=" + token;

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://www.stumbleupon.com/ajax/delete/favorite",
                        data: postData,
                        headers: {
                            // NOTE The charset attribute is currently ignored by SU's server :-(
                            "Content-Type": "application/x-www-form-urlencoded;charset=" + document.characterSet
                        }
                    });
                }

                review = filteredReview;
            } else {
                SUA.panic("couldn't update your review on StumbleUpon");
            }
        });
    };
}

// ------------------------------------------------------------------------------------------------------------
// NAMESPACES -------------------------------------------------------------------------------------------------

/**
 * Namespace for functions that manage the local (private) storage of annotations.
 */
var LocalStorage = {
    /**
     * Returns private annotation tags for the specified URL.
     *
     * @param url The URL to get the private annotations for.
     * @return String or null
     */
    getAnnotationDataForUrl : function(url) {
        url = this.createIdentifierForUrl(url);
        var data;

        if(data = GM_getValue(url)) {
            return data;
        }
    },

    /**
     * Stores private annotation tags for the specified URL.
     *
     * @param url The URL to store the private annotations for.
     * @param data The annotations tags as a string.
     */
    setAnnotationDataForUrl : function(url, data) {
        GM_setValue(this.createIdentifierForUrl(url), data);
    },

    /**
     * Deletes private annotations tags for the specified URL.
     *
     * @param url The URL to get rid of private annotations.
     */
    deleteAnnotationDataForUrl : function(url) {
        GM_deleteValue(this.createIdentifierForUrl(url));
    },

    /**
     * Deletes all private annotations.
     */
    deleteAll : function() {
        var ids = GM_listValues();
        var id;

        while(id = ids.pop()) {
            if(id.indexOf('PRIV_') == 0)
                GM_deleteValue(id);
        }
    },

    /**
     * Creates a configuration setting identifier for the specified URL.
     *
     * @param url The URL to create an identifier for.
     * @return String
     */
    createIdentifierForUrl : function(url) {
        return 'PRIV_' + url.replace(/#.*$/, '');
    }
};

/**
 * Namespace for HTML entities conversion functions.
 */
var HtmlEntities = {
    table : {
        '"' : '&quot;', '&' : '&amp;', '<' : '&lt;', '>' : '&gt;', '¡' : '&iexcl;', '¢' : '&cent;', '£' : '&pound;',
        '¤' : '&curren;', '¥' : '&yen;', '¦' : '&brvbar;', '§' : '&sect;', '¨' : '&uml;', '©' : '&copy;', 'ª' : '&ordf;',
        '«' : '&laquo;', '¬' : '&not;', '­' : '&shy;', '®' : '&reg;', '¯' : '&macr;', '°' : '&deg;', '±' : '&plusmn;',
        '²' : '&sup2;', '³' : '&sup3;', '´' : '&acute;', 'µ' : '&micro;', '¶' : '&para;', '·' : '&middot;', '¸' : '&cedil;',
        '¹' : '&sup1;', 'º' : '&ordm;', '»' : '&raquo;', '¼' : '&frac14;', '½' : '&frac12;', '¾' : '&frac34;', '¿' : '&iquest;',
        'À' : '&Agrave;', 'Á' : '&Aacute;', 'Â' : '&Acirc;', 'Ã' : '&Atilde;', 'Ä' : '&Auml;', 'Å' : '&Aring;', 'Æ' : '&AElig;',
        'Ç' : '&Ccedil;', 'È' : '&Egrave;', 'É' : '&Eacute;', 'Ê' : '&Ecirc;', 'Ë' : '&Euml;', 'Ì' : '&Igrave;', 'Í' : '&Iacute;',
        'Î' : '&Icirc;', 'Ï' : '&Iuml;', 'Ð' : '&ETH;', 'Ñ' : '&Ntilde;', 'Ò' : '&Ograve;', 'Ó' : '&Oacute;', 'Ô' : '&Ocirc;',
        'Õ' : '&Otilde;', 'Ö' : '&Ouml;', '×' : '&times;', 'Ø' : '&Oslash;', 'Ù' : '&Ugrave;', 'Ú' : '&Uacute;', 'Û' : '&Ucirc;',
        'Ü' : '&Uuml;', 'Ý' : '&Yacute;', 'Þ' : '&THORN;', 'ß' : '&szlig;', 'à' : '&agrave;', 'á' : '&aacute;', 'â' : '&acirc;',
        'ã' : '&atilde;', 'ä' : '&auml;', 'å' : '&aring;', 'æ' : '&aelig;', 'ç' : '&ccedil;', 'è' : '&egrave;', 'é' : '&eacute;',
        'ê' : '&ecirc;', 'ë' : '&euml;', 'ì' : '&igrave;', 'í' : '&iacute;', 'î' : '&icirc;', 'ï' : '&iuml;', 'ð' : '&eth;',
        'ñ' : '&ntilde;', 'ò' : '&ograve;', 'ó' : '&oacute;', 'ô' : '&ocirc;', 'õ' : '&otilde;', 'ö' : '&ouml;', '÷' : '&divide;',
        'ø' : '&oslash;', 'ù' : '&ugrave;', 'ú' : '&uacute;', 'û' : '&ucirc;', 'ü' : '&uuml;', 'ý' : '&yacute;', 'þ' : '&thorn;',
        'ÿ' : '&yuml;', 'Α' : '&Alpha;', 'α' : '&alpha;', 'Β' : '&Beta;', 'β' : '&beta;', 'Γ' : '&Gamma;', 'γ' : '&gamma;',
        'Δ' : '&Delta;', 'δ' : '&delta;', 'Ε' : '&Epsilon;', 'ε' : '&epsilon;', 'Ζ' : '&Zeta;', 'ζ' : '&zeta;', 'Η' : '&Eta;',
        'η' : '&eta;', 'Θ' : '&Theta;', 'θ' : '&theta;', 'Ι' : '&Iota;', 'ι' : '&iota;', 'Κ' : '&Kappa;', 'κ' : '&kappa;',
        'Λ' : '&Lambda;', 'λ' : '&lambda;', 'Μ' : '&Mu;', 'μ' : '&mu;', 'Ν' : '&Nu;', 'ν' : '&nu;', 'Ξ' : '&Xi;',
        'ξ' : '&xi;', 'Ο' : '&Omicron;', 'ο' : '&omicron;', 'Π' : '&Pi;', 'π' : '&pi;', 'Ρ' : '&Rho;', 'ρ' : '&rho;',
        'Σ' : '&Sigma;', 'ς' : '&sigmaf;', 'σ' : '&sigma;', 'Τ' : '&Tau;', 'τ' : '&tau;', 'Υ' : '&Upsilon;', 'υ' : '&upsilon;',
        'Φ' : '&Phi;', 'φ' : '&phi;', 'Χ' : '&Chi;', 'χ' : '&chi;', 'Ψ' : '&Psi;', 'ψ' : '&psi;', 'Ω' : '&Omega;',
        'ω' : '&omega;', '∀' : '&forall;', '∂' : '&part;', '∃' : '&exist;', '∅' : '&empty;', '∇' : '&nabla;', '∈' : '&isin;',
        '∉' : '&notin;', '∋' : '&ni;', '∏' : '&prod;', '∑' : '&sum;', '−' : '&minus;', '∗' : '&lowast;', '√' : '&radic;',
        '∝' : '&prop;', '∞' : '&infin;', '∠' : '&ang;', '∧' : '&and;', '∨' : '&or;', '∩' : '&cap;', '∪' : '&cup;',
        '∫' : '&int;', '∴' : '&there4;', '∼' : '&sim;', '≅' : '&cong;', '≈' : '&asymp;', '≠' : '&ne;', '≡' : '&equiv;',
        '≤' : '&le;', '≥' : '&ge;', '⊂' : '&sub;', '⊃' : '&sup;', '⊄' : '&nsub;', '⊆' : '&sube;', '⊇' : '&supe;',
        '⊕' : '&oplus;', '⊗' : '&otimes;', '⊥' : '&perp;', '⋅' : '&sdot;', '◊' : '&loz;', '⌈' : '&lceil;', '⌉' : '&rceil;',
        '⌊' : '&lfloor;', '⌋' : '&rfloor;', '〈' : '&lang;', '〉' : '&rang;', '←' : '&larr;', '↑' : '&uarr;', '→' : '&rarr;',
        '↓' : '&darr;', '↔' : '&harr;', '↵' : '&crarr;', '⇐' : '&lArr;', '⇑' : '&uArr;', '⇒' : '&rArr;', '⇓' : '&dArr;',
        '⇔' : '&hArr;', '•' : '&bull;', '′' : '&prime;', '″' : '&Prime;', '‾' : '&oline;', '⁄' : '&frasl;', '℘' : '&weierp;',
        'ℑ' : '&image;', 'ℜ' : '&real;', '™' : '&trade;', '€' : '&euro;', 'ℵ' : '&alefsym;', '♠' : '&spades;', '♣' : '&clubs;',
        '♥' : '&hearts;', '♦' : '&diams;', 'Œ' : '&OElig;', 'œ' : '&oelig;', 'Š' : '&Scaron;', 'š' : '&scaron;', 'Ÿ' : '&Yuml;',
        'ƒ' : '&fnof;', '–' : '&ndash;', '—' : '&mdash;', '‘' : '&lsquo;', '’' : '&rsquo;', '‚' : '&sbquo;', '“' : '&ldquo;',
        '”' : '&rdquo;', '„' : '&bdquo;', '†' : '&dagger;', '‡' : '&Dagger;', '…' : '&hellip;', '‰' : '&permil;', '‹' : '&lsaquo;',
        '›' : '&rsaquo;', 'ˆ' : '&circ;', '˜' : '&tilde;'
    },

    /**
     * Converts special characters into named HTML entities.
     *
     * @param txt The text to convert.
     * @return The converted text.
     */
    encode : function(txt) {
        var target = '';

        for(var i = 0; i < txt.length; ++i) {
            var l = txt.substr(i, 1);

            if(this.table[l]) {
                l = this.table[l];
            }

            target += l;
        }

        return target;
    },

    /**
     * Converts HTML entities into their according characters.
     *
     * @param txt The text to convert.
     * @return The converted text.
     */
    decode : function(txt) {
        var self = this;

        if(!this.backTable) {
            this.backTable = {};

            for(var char in this.table) {
                this.backTable[this.table[char]] = char;
            }
        }

        return txt.replace(/&[^;]+;/g, function(matched) {
            if(self.backTable[matched]) {
                return self.backTable[matched];
            } else {
                var match;

                if(match = (/^&#(\d+);$/).exec(matched)) {
                    var code = match[1];
                    // weird workaround for malfunctional parseInt function (Firefox)
                    if(code.substr(0, 1) == '0') code = code.substr(1);
                    code = '%' + parseInt(code).toString(16).pad('0', 2).toUpperCase();
                    return decodeURIComponent(code);
                } else {
                    return matched;
                }
            }
        });
    }
};

/**
 * Namespace for issue and error reporting functions.
 */
var IssueReporter = {
    reportUrl : 'http://www.stumbleupon.com/stumbler/dirtbagbubble/contact/',

    checkForIssueReporting : function() {
        if(window.location.href.indexOf(this.reportUrl) == 0) {
            var match;

            if(match = (/#SUA_ISSUE_(.*)$/).exec(window.location.href)) {
                var message = "Hi dirtbagbubble,\n\nI have following problem with StumbleUpon Annotator version " + SUA.version +
                    ":\n\n***HERE COMES MY PROBLEM DESCRIPTION***\n\n...You may want to delete some of the following information, but keep in mind, that less information makes debugging more difficult...\n\n" +
                    decodeURIComponent(match[1]);

                $('id("msgContent")').each(function(node) {
                    node.value = message;
                }).ifEmpty(function() {
                    // Fallback in case that the contact textarea is missing due to an error
                    window.location.href = 'mailto:dirtbagbubble <' + SUA.getAuthorEMail() +
                            '>?subject=SUA%20Problem%20Report&body=' + encodeURIComponent('<html><body>' + message.replace(/\n/g, '<br>') + '</body></html>');
                });
            }
        }
    },

    fileIssue : function() {
        window.open(this.reportUrl + '#SUA_ISSUE_' + encodeURIComponent(this.generateReport()), "_blank");
    },

    generateReport : function() {
        var pl = '';
        var rep = '';
        var lastPanic;

        for(var i = 0; i < navigator.plugins.length; ++i) {
            if(pl.length) pl += "\n";
            pl += navigator.plugins[i].name + " - " + navigator.plugins[i].description;
        }

        if(lastPanic = SUA.getLastPanic()) {
            rep += "<b>Error Message</b>\n" + lastPanic + "\n\n";
        }

        rep += "<b>URL</b>\n" + window.location.href + "\n\n<i>Content Type</i>\n";

        $('//meta[translate(@http-equiv, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")="content-type"]').each(function(meta) {
            rep += meta.getAttribute('content');
        }).ifEmpty(function() {
            rep += 'Not retrievable';
        });

        rep += "\n\n<b>Browser Information</b>\n<i>User Agent</i>\n" +
               navigator.userAgent.trim() + "\n\n<i>Cookies Enabled</i>\n" +
               (navigator.cookieEnabled ? 'Yes' : 'No') + "\n\n<i>Java Enabled</i>\n" +
               (navigator.javaEnabled() ? 'Yes' : 'No') + "\n\n<i>Screen Resolution</i>\n" +
               screen.width + "x" + screen.height + "\n\n<i>Color Depth</i>\n" +
               screen.colorDepth + "\n\n<i>Installed Plugins</i>\n" + pl;

        return rep;
    }
};

/**
 * A namespace for document-related functions.
 */
var DocumentManager = {
    /**
     * Returns true if the current URL might be sensitive,
     * like a login page or a search query
     */
    isSensitiveUrl : function() {
        if(window.location.href.indexOf('https:') == 0) return true;
        if(window.location.href.match(/^http(s|):\/\/localhost\//)) return true;
        if(window.location.href.match(/^http(s|):\/\/www\.stumbleupon\.com/)) return false;

        var filteredUrl = window.location.href.replace(/^[^:]+:\/\//, '').replace(/\?.*$/, '').replace(/#.*$/, '');
        var keyWords = [/(\b|_)mail(\b|_)/, /(\b|_)email(\b|_)/, /(\b|_)admin(\b|_)/,
                        /(\b|_)login(\b|_)/, /(\b|_)signin(\b|_)/, /(\b|_)settings(\b|_)/, /(\b|_)search(\b|_)/];
        var match;

        // Check for document's file name
        if(match = (/\/(.+)$/i).exec(filteredUrl)) {
            var baseName = match[1];

            for(var i = 0; i < keyWords.length; ++i) {
                if(baseName.match(keyWords[i])) return true;
            }
        }

        // Extract domain name
        var domain = filteredUrl.split(/\//)[0].split(/\./);
        // Remove top level domain and domain name
        domain.pop();
        domain.pop();

        for(var i = 0; i < domain.length; ++i) {
            var part = domain[i];

            for(var j = 0; j < keyWords.length; ++j) {
                if(part.match(keyWords[j])) return true;
            }
        }

        return false;
    },

   /**
    * This function tries to find the next best match for an XPath expression
    * that probably does not evaluate to an existing node anymore.
    *
    * @param xpath The XPath query.
    * @return {node : Element, isUnoriginalRef : Boolean}
    */
    getApplicableNode : function(xpath) {
        var unoriginalRefNode;

        if(xpath.indexOf('|') > -1) {
            var match = (/^((\w+\([^\)]+\)|\/\/|\/|\w+(\[[^\]*]\]|)|[\w-]+::\w+(\[[^\]*]\]|)))\|(.*)$/).exec(xpath);

            if(match) {
                var smartXPath = match[1];
                xpath = match[6];

                try {
                    var result = document.evaluate(smartXPath, document, null, XPathResult.ANY_TYPE, null);
                    var node = result.iterateNext();

                    if(node) {
                        return {'node' : node, 'isUnoriginalRef' : false};
                    }
                } catch(e) {
                    // do nothing... we're just going to try the other xpath
                }
            }
        }

        var elms = xpath.split(/\//);

        do {
            try {
                var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
                var node = result.iterateNext();
            } catch(e) {
                // NOTE This workaround may cause trouble during development! It hides problems
                // with XPath expressions!
                // Since annotation xpath expressions can be changed by a user, we
                // just abort if an expression causes an exception, in order to remain functional.
                SUA.log('Illegal XPath expression found: ' + xpath);
                return {'node' : document.body.firstChild ? document.body.firstChild : document.body, 'isUnoriginalRef' : true};
            }

            if(!node) {
                // If no node has been found with the previous XPath expression, we
                // just climb a step back or up in the document's tree
                unoriginalRefNode = true;
                var last = elms.pop();

                if(last && last.indexOf('[') != -1) {
                    var idx = parseInt((/\[(\d+)\]/).exec(last)[1]) - 1;
                    var elms2 = last.split(/\[/);
                    var nodeName = elms2[0];

                    if(idx > 1) {
                        last = nodeName + '[' + idx + ']';
                    } else {
                        last = nodeName;
                    }

                    elms.push(last);
                }

                if(elms.length) {
                    xpath = elms.join('/');
                }
            }
        } while(elms.length && !node);

        if(!node) {
            node = document.body.firstChild ? document.body.firstChild : document.body;
            unoriginalRefNode = true;
        }

        return {'node' : node, 'isUnoriginalRef' : unoriginalRefNode};
    },

   /**
    * Retrieves the anchor parent element of the passed element, if available.
    *
    * @param el The element to get its anchor parent.
    * @return Element
    */
    getAnchorParent : function(el) {
        do {
            if(el.nodeName.toLowerCase() == 'a') return el;
        } while(el = el.parentNode);
    },

    /**
     * Returns a node's ancestor by its name.
     *
     * @node The node to get its parent element of.
     * @parentNodeName Node name of the parent to find.
     * @return The parent Element node.
     */
    getAncestorElement : function(node, ancestorNodeName) {
        ancestorNodeName = ancestorNodeName.toLowerCase();

        while(node = node.parentNode) {
            if(node.nodeName.toLowerCase() == ancestorNodeName)
                return node;
        }
    },

    /**
     * Creates a combination of a smart XPath expression and the
     * classic one.
     *
     * @param node The element node to get the combined XPath expression for.
     * @return String
     */
    getAnnotationXPath : function(node) {
        return this.getSmartXPath(node) + '|' + this.getElementXPath(node);
    },

    /**
     * Returns the XPath expression for the specified Element node.
     * Originally from http://snippets.dzone.com/posts/show/3754
     * modified in order to support locating text nodes and the id attribute.
     *
     * @param elt The Element node.
     * @return XPath string
     */
    getElementXPath : function(elt) {
        var id;

        if(elt.nodeType == 1) {
            if(id = elt.getAttribute('id')) {
                return 'id("' + id + '")';
            }
        }

        var path = "";
        var xname;

        for(; elt && ((elt.nodeType == 1) || (elt.nodeType == 3)); elt = elt.parentNode) {
            idx = this.getElementIdx(elt);

            if(elt.nodeType == 1) {
                xname = elt.tagName.toLowerCase();
            } else {
                if(elt.nodeType == 3) {
                    xname = 'text()';
                }
            }

            if(idx > 1) xname += "[" + idx + "]";
            path = "/" + xname + path;
        }

        return path;
    },

    /**
     * This function creates a "smart" XPath expression for the specified node.
     * It tries to determine a more reliable expression that endures over time,
     * even when the annotated page structure changes a bit over time.
     * This is done by looking at attributes and the surrounding context of the node
     * instead of building full paths from the root to the desired node.
     *
     * @param node The Element node to get its smart XPath expression of.
     * @param ignoreContext Boolean that indicates that only an expression for the
     *        node itself has to be created without any path to it.
     * @return String
     */
    getSmartXPath : function(node, ignoreContext) {
        // id attribute has always top priority. By default ids must be unique on a page.
        if(node.nodeType == 1 && (id = node.getAttribute('id'))) {
            return 'id(' + this.createXPathString(id) + ')';
        }

        var textLenLimit = 10;
        var mainFragment;
        var test = [];
        var name, cssClass;
        var nodeName = node.nodeName.toLowerCase();
        var targetContext;

        // Some tags need special care
        switch(nodeName) {
            // Images and iframes are identified by their source attribute
            case 'img':
            case 'iframe':
                mainFragment = nodeName + '[@src=' + this.createXPathString(node.getAttribute('src')) + ']';
                break;

            // A form element is identified by its action attribute
            case 'form':
                var action;
                mainFragment = nodeName;

                if(action = node.getAttribute('action')) {
                    mainFragment += '[@action=' + this.createXPathString(action) + ']'
                }
                break;

            // Form child elements are identified by their name or type
            case 'input':
            case 'textarea':
            case 'select':
                if(name = node.getAttribute('name')) {
                    mainFragment = nodeName + '[@name=' + this.createXPathString(node.getAttribute('name')) + ']';
                } else {
                    var type, value;
                    mainFragment = nodeName;

                    if(type = node.getAttribute('type')) {
                        test.push('@type="' + type + '"');
                        type = type.toLowerCase();

                        if(type == 'submit' || type == 'reset') {
                            if(value = node.getAttribute) {
                                test.push('@type="' + type + '"');
                            }
                        }
                    }

                    if(test.length) {
                        mainFragment += '[' + test.join(' and ') + ']';
                    }
                }

                targetContext = 'form';
                break;

            // Anchors are identified by their href attribute or name.
            // Additionally the default case applies for anchors, because they usually wrap text.
            case 'a':
                var href;

                if(href = node.getAttribute('href')) {
                    test.push('@href=' + this.createXPathString(href));
                } else {
                    if(name = node.getAttribute('name')) {
                        test.push('@name=' + this.createXPathString(name));
                    }
                }

            // Look for text content within the node and create a node test expression that checks
            // for a part of that content for identification.
            // If this does not apply, the name attribute or (in worst case) the class attribute
            // will be taken for identification.
            default:
                if(node.nodeType == 3) nodeName = 'text()';
                mainFragment = nodeName;
                var textFound = false;

                if(node.textContent.trim().length) {
                    var text = node.textContent.substr(0, 20);
                    test.push('starts-with(normalize-space(.),' +
                        this.createXPathString(text.normalizeWhiteSpace()) + ')');
                    textFound = true;
                }

                if(node.nodeType == 1) {
                    if(name = node.getAttribute('name')) {
                        test.push('@name=' + this.createXPathString(name));
                    } else {
                        if(cssClass = node.getAttribute('class')) {
                            test.push('@class=' + this.createXPathString(cssClass));
                        } else {
                            mainFragment = nodeName;
                        }
                    }
                }

                if(test.length) {
                    mainFragment += '[' + test.join(' and ') + ']';
                }
            }

        // Check closer textual context
        if(!ignoreContext) {
            var sib = node;
            var found = false;

            while(sib = sib.previousSibling) {
                if(sib.textContent.trim().length >= textLenLimit) {
                    mainFragment = this.getSmartXPath(sib, true) + '/following-sibling::' + mainFragment;
                    found = true;
                    break;
                }
            }

            if(!found) {
                sib = node;

                while(sib = sib.nextSibling) {
                    if(sib.textContent.trim().length >= textLenLimit) {
                        mainFragment = this.getSmartXPath(sib, true) + '/preceding-sibling::' + mainFragment;
                        break;
                    }
                }
            }

            if(!found) {
                if(node.parentNode) {
                    return this.getSmartXPath(node.parentNode) + '/' + mainFragment;
                }
            }
        }

        if(ignoreContext) return mainFragment;

        // Look for a specified context
        if(targetContext && (targetContext = this.getAncestorElement(node, targetContext))) {
            return this.getSmartXPath(targetContext) + '//' + mainFragment;
        } else {
            // Need to automatically find remarkable spots in a close range
            var sib = node;
            var id;

            // Find previous sibling with an id
            while(sib = sib.previousSibling) {
                if(sib.nodeType != 1) continue;
                if(id = sib.getAttribute('id')) {
                    return 'id(' + this.createXPathString(id) + ')/following-sibling::' + mainFragment;
                }
            }

            sib = node;

            // Find following sibling with an id
            while(sib = sib.nextSibling) {
                if(sib.nodeType != 1) continue;
                if(id = sib.getAttribute('id')) {
                    return 'id(' + this.createXPathString(id) + ')/preceding-sibling::' + mainFragment;
                }
            }

            // Find parent node with an id
            var parent = node;

            while(parent = parent.parentNode) {
                if(parent.nodeType != 1) continue;
                if(id = parent.getAttribute('id')) {
                    return 'id(' + this.createXPathString(id) + ')//' + mainFragment;
                }
            }

            return '//' + mainFragment;
        }
    },

    /**
     * Returns the index position of the element among its siblings of the same name.
     * This is primarily used within the XPath expression creation functions.
     *
     * @param elt An Element node.
     * @return Integer
     */
    getElementIdx : function(elt) {
        var count = 1;

        for(var sib = elt.previousSibling; sib; sib = sib.previousSibling) {
            if((sib.nodeType == 1 && sib.tagName == elt.tagName) ||
            (elt.nodeType == 3 && sib.nodeType == 3)) count++;
        }

        return count;
    },

    /**
     * Creates a string applicable for XPath expressions.
     * It automatically escapes quotation marks with a special construction.
     *
     * @param str The string to create an XPath string of.
     * @return An escaped string in double quotes.
     */
    createXPathString : function(str) {
        if(str.indexOf('"') > -1) {
            var parts = str.split(/"/);
            str = 'concat(';

            for(var i = 0; i < parts.length; ++i) {
                if(i > 0) str += ",'\"',";
                str += '"' + parts[i] + '"';
            }

            return str + ')';
        } else {
            return '"' + str + '"';
        }
    },

    /**
     * Returns information about the page's current user selection.
     *
     * @return {range : RangeObject, rangeStart : Integer, node : Element}
     */
    getSelectionData : function() {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        return {
            range : range,
            rangeStart : range.startOffset,
            node : range.startContainer
        };
    },

    /**
     * Determines whether a node belongs to another Element node.
     *
     * @param parent The parent Element node.
     * @param child The supposed child node.
     * @return Boolean
     */
    isChildOf : function(parent, child) {
        if(parent.nodeType == 1) {
            for(var i = 0; i < parent.children.length; ++i) {
                var pChild = parent.children[i];

                if(child == pChild) return true;
                if(DocumentManager.isChildOf(pChild, child)) return true;
            }
        }

        return false;
    },

    /**
     * Calculates the absolute left position of the Element, also regarding
     * parent element positions (up to body element).
     *
     * @param node The element to get its left pixel position of.
     * @return Integer
     */
    computeLeft : function(node) {
        var a = parseInt(node.offsetLeft);
        var value = (isNaN(a) ? 0 : a);

        if(node.offsetParent) {
            value += this.computeLeft(node.offsetParent);
        }

        return value;
    },

    /**
     * Calculates the absolute top position of the Element, also regarding
     * parent element positions (up to body element).
     *
     * @param node The element to get its top pixel position of.
     * @return Integer
     */
    computeTop : function(node) {
        var a = parseInt(node.offsetTop);
        var value = (isNaN(a) ? 0 : a);

        if(node.offsetParent) {
            value += this.computeTop(node.offsetParent);
        }

        return value;
    }
}

/**
 * Namespace for CSS style-related functions.
 */
var StyleTools = {
    normalizeAnchor : function(a) {
        this.normalizeElement(a);
        a.style.textDecoration = 'underline';
    },

    normalizeImage : function(img) {
        this.normalizeElement(img);
        img.style.verticalAlign = 'top';
        img.style.display = 'inline';
    },

    normalizeDiv : function(div) {
        this.normalizeElement(div);
        div.style.display = 'block';
    },

    normalizeLabel : function(label) {
        this.normalizeElement(label);
        label.style.color = 'white';
        label.style.fontFamily = 'sans-serif';
        label.style.fontSize = '12px';
    },

    normalizeInput : function(input) {
        this.normalizeElement(input);
        input.style.background = 'url(' + Resources.lightBlueGradient + ')';
        input.style.border = 'solid 1px grey';
        input.style.color = 'black';
        input.style.fontFamily = 'sans-serif';
        input.style.fontSize = '12px';
    },

    normalizeElement : function(el) {
        el.style.color = 'white';
        el.style.fontWeight = 'normal';
        el.style.fontFamily = 'sans-serif';
        el.style.fontSize = '12px';
        el.style.fontStyle = 'normal';
        el.style.textTransform = 'none';
        el.style.border = 'none 0px';
        el.style.outline = 'none 0px';
        el.style.margin = '0px';
        el.style.padding = '0px';
        el.style.textAlign = 'left';
        el.style.width = 'auto';
        el.style.height = 'auto';
        el.style.cssFloat = 'none';
        el.style.lineHeight = '100%';
    }
};

/**
 * Namespace for StumbleUpon review-page-related functions and properties.
 */
var ReviewPageManager = {
    /**
     * The URL parameter encoded version of the current page's URL.
     */
    stumbleUrl : window.location.href.replace(/^http:\/\//, '').replace(/#.*$/, '').paramEncode(),

   /**
    * Returns true if we're currently on a stumble's review page.
    *
    * @return boolean
    */
    isReviewPage : function() {
        return window.location.href.match(/^http(s|):\/\/www.stumbleupon.com\/url/i);
    },

    /**
     * Extracts the reviews from the specified page string and searches for annotation tags,
     * which are automatically added to the page.
     *
     * @param page The page's HTML source code as string.
     * @return True if reviews have been found on the specified page, otherwise false.
     */
    extractReviewsFromPage : function(page) {
        var reviewFound = false;

        while(match = (/<div\s+class="text"[^>]*>\s*<p[^>]*?>[^<]+<a href="\/stumbler\/([^\/]+)[^"]+?">(.|\s)*?<\/p>\s*<div class="review">\s*<span>([^<]+)?<\/span>\s*<\/div>/ig).exec(page)) {
            if(match[3]) {
                SUA.annotationManager.addAllFromUser(match[1], HtmlEntities.decode(match[3]));
                reviewFound = true;
            }
        }

        return reviewFound;
    },

    loadFirstPage : function(handler) {
        // User deletes all freshly created annotations -> Need to retrieve previously created
        // commentid
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.stumbleupon.com/url/' + this.stumbleUrl,

            onload: function(response) {
                ReviewPageManager.firstReviewPage = response.responseText;
                if(handler) handler(response);
            }
        });
    },

    /**
    * Loads the reviews from the stumble's review page (if available).
    */
    loadReviews : function() {
        this.loadFirstPage(function(response) {
            if(ReviewPageManager.firstReviewPage.indexOf('<title>404 - not found</title>') >= 0) {
                SUA.panic('couldn\'t load the reviews due to a 404 error');
                return;
            }

            if(ReviewPageManager.firstReviewPage.indexOf('<title>Website unavailable - StumbleUpon</title>') == -1) {
                var match;

                try {
                    // Extract user name from page
                    if(match = (/<a href="\/favorites\/">Hi ([^<]+)<\/a>/i).exec(ReviewPageManager.firstReviewPage)) {
                        SUA.userManager.setName(match[1]);
                    } else {
                        // Don't throw an error, because the user might be temporarily and voluntarily logged off
                        return;
                    }

                    SUA.toolbar.attach();

                    // Extract own review from page
                    if(match = (/<textarea\s+name="review"\s+id="review"[^>]*>((.|\s)*?)<\/textarea>/i).exec(ReviewPageManager.firstReviewPage)) {
                        var ownReview = HtmlEntities.decode(match[1]);
                        if(!ownReview) ownReview = "";
                    } else {
                        ownReview = '';
                    }

                    SUA.userManager.setReview(ownReview);
                    ReviewPageManager.extractReviewsFromPage(ReviewPageManager.firstReviewPage);
                    ReviewPageManager.tryLoadingReviewSubPage(1);
                } catch(e) {
                    e = '' + e;

                    // Greasemonkey does not stop the script when the user browses to another page.
                    // If another domain is reached and this script didn't load, yet on the former
                    // domain, a security exception will be thrown, that contains a message with
                    // two URLs in it.
                    // Since this problem happens quite regularly and does not affect the functionality
                    // of the script running on the current homepage, we can simply ignore this exception
                    // with following regex:
                    if(!e.match(/<(http(s|):\/\/[^>]*|[\w\-_]+:[\w\-_]+)>[^<]*<(http(s|):\/\/[^>]*|[\w\-_]+:[\w\-_]+)>/)) {
                        // In any other case we inform the user about a serious problem
                        SUA.panic("caused an error while trying to load the first review page. The cryptic error message is " + e);
                    }
                }
            }
        });
    },

    /**
     * Loads a review sub-page if a stumble's review page is splitted into multiple pages.
     *
     * @param page The page's HTML source code as string.
     */
    tryLoadingReviewSubPage : function(page) {
        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://www.stumbleupon.com/urlarchive/' + (page * 10) + '/' + this.stumbleUrl,

            onload: function(response) {
                if(ReviewPageManager.extractReviewsFromPage(response.responseText))
                    ReviewPageManager.tryLoadingReviewSubPage(page + 1);
            }
        });
    },

    /**
     * Removes those ugly [SUA] tags when we are on a review page.
     */
    filterSUATags : function() {
        if(this.isReviewPage()) {
            $('//div[@class="review"]|//a[@class="avatar"]/following-sibling::p[1]').each(function(element) {
                element.innerHTML = element.innerHTML.replace(AnnotationManager.suaRegex, '');
            });
        }
    }
};

/**
 * Namespace for reusable resources like image data strings.
 */
var Resources = {
    deepBlueGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEsCAIAAACNMk6CAAAAfklEQVQ4jbWSQQrAMAgEZ7223+n/v9ZDhGJqjJfcRgRxl+G+HgMMZCCTckaYMgaTPkbyXcHI55zB76/YfwC/ueEx4zciz/+vePSx55Cl22Hgf84Vp5mT3rf5G72X+eeuOw5VXZ9yqNth4Dxn6drCu6OuTd71XKu9Oe5Qt8OPX1adBB8w6GDzAAAAAElFTkSuQmCC',
    lightBlueGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAH0CAIAAABzX9DAAAAAYklEQVQ4jWM4su8FEwMDA8WYkRGbOCOVzCHdbOLNwW82Zeagu4f08CDeX8SbTbqfsJtNnbBhpHIYkx4epPuLOLPJ8xem2dQIH0ZGytMebreM5nNUc0bzOTazR/M5frOpED4AP1UGnCLWesEAAAAASUVORK5CYII=',
    greenToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAHUlEQVQImWPQq+ViYmFlRmA2ZiZWXHw2hDgrfj4Ab10B5c7u62AAAAAASUVORK5CYII=',
    blueToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAHUlEQVQImWPg4TZlYmHhRMWsyHwuND6yGi4cejgBXAYB4perdjIAAAAASUVORK5CYII=',
    yellowToolbarGradient : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAMUlEQVQImWN4vJqBiZGJnYmRmZ2JkZmDiZGJnYkJxmZmh/I5UOQZmaFiSPqYoGqh+gC0LgKl8uVdXwAAAABJRU5ErkJggg==',
    scribbleIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAARISURBVHjadFRpbFRVFP7uvPem01nbztbFtrFWghtUbZU21gUJjQnB5Yf+QH9oxD/G4pL0JzH6x0RiDPaPiTYYF5IWgwugwYASUihSajG1qQtgmc5Mlymvne0Nb95713PfzAQLepNvbubde75zznfOPezoTqCQQVdWxTu0r1PTeOCNKcRwbXHx81Fnaa+sagnQTODFcaxZMlPQ5QvjZ3ctUMwAjSkcwxQ2lM+tCsjQHO6+RuomQsWBG5YcbcFhxQ24yExbAg4ueG7prL06Mq4aL9C5QSiWgadPw1zvK5FKDDD5jYTS7p1oirZik7iwd7wbH0434i9VuxXFnEznU+LOv6LlKd0Glq4CYr9+ORqewYAcxPFDiW04k9mKDS0e3NUWhs/ne5XOtxKCBJ+QTWQkbAgM/7PEgash4gnsGtjz68J8PLKYvIhEIklIIBabNfuf1X9sb0E6HGSFWj9SThmjuoHjD+4wlysFu56QFIR3++NPdm5+uOfwpb/nkEyWCOPxOPR8DG/vshCuA2p8DF4PhSlRgS186nbhrXV9ZnxNyhUvfR1f9/isEb2hoQGhUAjhcBiRSARcimDwc44rK0A6x5EvkJgWqqsUvGSYmD17QHpvTVEEjg5JrwVr2G5dS0gWC4I5W2EYBkzTBOccl+M68pqG9hYGhaonkZWDQpEdcLiq0P3I/Wzz8Hd8n014Zljq9XvxMXl1kD209G9w+qiLmd8mrJBOTmuI1hXt1GUilcukjBANslZXFWs/9Qs/KL3+vGMvCbleJM5JUiJGTj0Hd6iPyJhNaNFHRpdOjGVxzx0mql0lUonIBARxMMDaPvuGj0n9zznepct+4YnZVSJSblKkf8AdfNROHZaBvKEgmXdiZlJF10YORS5HKpeavK4GzgPfc4dMZGHhQaEUqqtswUFiE1EMq4Vv0Vi/BSsFGd6sgv6Nv6PTYUGf4FDvK2spQIQiA6eCdtGo0/SnQxwoonspddNiRMhhXDmJgtSBmlAbngiMoLc2gfksGZwHFukNyR3lKCkgqn4xvoiiIBTVeV+kKzySF1ujAPWcQY+1uPwBbo9047GmGFKU/ewR0niVNCOHqkpVlznpyHDyHF8iuTOiDweXVMyIkCuk1GPw0EPzexnqAkBCPQ3jNmD+EnDhLFBbD9S3k/MMkabpW4wX9gxZc2T+k/0mR/dLoUwOk23NaKIOsXWk50W9B6yQQWqFg9Mg8ExYVCzgZkrVQ+MurjOcmGP6vq+sC4sp/ElUr9iTZOhLnl9YxifJRdzbXM8avW6akygJzcpjIEsvZIEzeJzATc1U1Sbqv3rwHW/yy+kM5oVshOXKaMLFGLTRCf7F/kP8vKajjWRx+TxMJj0lVmbNGDDGksifmmEFmtZG7yY4A17M1vnxw8tPIfrQ3XbB/3MJbfsIPYQ7CaHy6KL4YIpICKntvdAGB7Atn8Oq30O1kZD9R4ABALvwuDmZUntJAAAAAElFTkSuQmCC',
    annosOnIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANXSURBVHjarFS7jhxFFD1VXY+eGc/OyJYNa0sgWcgkhohoQ0CCCPOSiBAOQeIh/gCJnAwJEn7ARiIg4REROEMygS0ktLItG61nF2ZnZ3Z7pru6qzhVU4sBIQKLmjnV9brn3ntudQPr9qGUMkQIIYKQD6CUCmVZhrJXBm100FoHY02aW2vT2PZtIMcHkUgQLxFfvf3uO+LSey/jzIXTiLsSBXHcAg8KeB9w6+Yt7N7dRa9fYvPcJs4/cR7Xf/wJrz/zWjx4WbH7bDwci9FzY0wvTDHBfXgSSP58GoXsl330cBEwFy3daSxwiF+wjeGTG9h6YQvXvrn2qdDQzZufvKW3Lm/BzR1WbU2KLpEUcVcUKToIkSIN5PehQ+3r5Gpkh9jojbFwC3z8ykedMkOj63aF7evbOJjO0HYdZArFw9oejDYpWmrLdfIWBeKv8x0W1QJVU+HsmXMpk9Fjo0I1TYPbd25jbudY/HaIwYl+UqyqjmCUQTksURQyBSilAosEXepE2tQ1du/v4d6dezj5yElMfp5A6Z5GPXD4dbYDJRSCkkzLY4kK09kU1pHQqpS2JLEuFSxKaKPgZcDKNjiq9lHvNagPGihP4/nsAIFZ9k8PgAEJOw/nHRriqFqiaAog/k1BpwWssVCWUhhgZWpUOxWz8uiMh+pch+l8H4ViCqahZ4NAY286dGUHhxbetYBjjI7V95FUQ7UsVifh9lu09QqrYOBCjNB5zKoZ5CkJ1WjISqZoRU3SpYdY0bcXsbQMhxdpQtIxNd3gGuWJax2zLOgoZqVCwfr0GIf3aOZLoMcC23yf402JN7VNN329F8fzPI97B0hypDvE26aisCIeLGk9iZt8bmRCnw8eswsuaA6PiEV2eEhsEo4eKImKqQTLyQnuzmjAlJJBmaNAJhVh7aDN8yo/Y3SWtnuc/O6ZuMezTOVxPBXW3mNbZjSZ4BguP4/XI9mIGBPfEju4UdCL5eB5vsIKLEw6JNZ6/GlcZ6yyw3GOvp/T/44GN5M2n8fuFHGVJPGLEEX4bxTpRQp4mjibkl7PgR+IRwUetCjtG38px7+1KMSLxKtYfytusP+CuELcxUO29zEk1SAJcOmfm+ohCEdJT4fv2X/9fxAOU6GAL3Pp/tb+EGAAdqJsvG2LZXAAAAAASUVORK5CYII=',
    annosOffIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKNSURBVHjanJS/jlJREMbnwgEWdsFN3CxIgcVWvAUxFDZoYmO3sd5CY8ObmGjjC6iJhaXFxhegWgoSCkJBWBLYZfm3sIDzOzI3SLRhku/e82fmO9/MnHtF/tj7SCSyBkEQ/AXn3Prg4MAjFot5xONxP08kEuFYOd5BFCheKL5fXFwE5+fnUigUZL1ei5J5mDFerVbSaDSk0+lIMpmUfD4vZ2dnUqvVpFwu4/bG6eNjJpMJisWipFIp6Xa7ISHvXVNfj2g0KqpW+v2+Jy6VSnJ5efkh0DTn1Wo1VqlUZDKZyHw+D4N1zweaQoxDUPrw8ODHh4eHcnR0JNPpVDTLpVNVMUjq9brc3Nx4R4gwrZFXYemzDiz90Wgks9lMcrmc9z89PY06yFqtliyXSxkMBv40TkYtZChApRFqk0Qb4cf39/e+RO12W05OTjyPQwWb19fXPshSWSwWcnt7K+PxOFSJH/7aVU+KCAwhjPF1SCcQp+Pj47AZqIJgOBx6VaxDTEYEW2ksdauzY4Pa0WEM522lGHWyzkNKqihkDVWUBwHEOh53d3dhsSHizbqpQQXB7FEK7qCVijkHWoxjADvOSCeQFO1qGKGZpWgpoxYOiD0hThAA5LPJ6Xbndo3DUW73lXc6nfZkntAaQE2QDimnWSOM2JplavFhbpefOurlXkV18ZkGP81ms+FXQTrb6Rpsbm/LhhvSbDYpxRUMCW1KWSeOYltzTI2lYlcFgwAfskIpZL1ej61PPB4rvpIZvyv7jf0P+OCrGa21dn68wS9FLtiq9xPFa2um/NumiueKV5v5leKz4ouiLXvaW36qesFnOn65u+n2IHy0qelPHf/Y3YzsQZje/BS+8aXubv4WYAC1ZtIA+6NoUwAAAABJRU5ErkJggg==',
    annosCollapsedIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOCSURBVHjarFRPaBxVGP+9PzM7s9lmN2U3O6XJZrNNNW29KLUXe6oEVBBP9uRdhHrpQfTYo4iiePHiwYuiCB60IgQERVoJUiVUW91AstWGjSndbbJ/Z+fN8/tmNlu8iGIHPr558977vd/3+35vxM2PlxHHFhfevHUOwArFYfy3p0nx1dc/9K/yQHz+wflnqovld+YXykv5wzP0hb7GPGXT5ULcD4yDk7Xpmthga+MWbt74Y+2Ntz57Um43Wy8/8tiJpXxwBHAygKZwnDS0puDspsHzkzWZyffqwzWsPP34GTrhkr527den+nu/wy8+NGZFIecoe/RKVIUds5LjrNIS7B6ldvIemwj7u01IgYu61Wqjt30F8bANPRXQAkl7HTz3wodYX19Hs9kkjeOJYLOzswiCAI1GAz9ffREZOqff3ESrsQHXEdBMyEYd9JprkDoHYyyErmF1dRWvX6hgZzeA5ymqkkNg4aiPU8s+Hn32Hr778jLmCwoe7Tej9FCttUIUxpDEN7YdqsDCinsEbFAqGCwHGkFBI1twoDyNQwUf2vOTzcN+F0NfYcqTVHbaRGIoMNgfkcYKypUJsKJmFAoFnD6Vg5c7CSvLcJmlO0j6oXRMTf8Gnp8yd1huOwaMIoP+3gjGt8hMpQtY9jAM0e7FeOL8p8hms+j1ehMdd66sJABSCyIiaR/rnlpKs6nDbpQ0lxvJE2SUBGDj9hDvvTaP1t0R2m0fLjE6cTyLfmcnAZbkTSaQyWliLROrakuArKGQBsqRVBYj66Sbx6seZkgfjCS6rQ7NaUwHFbi5EklzPQFgoFSOA0CizoJyl6LQII4UxQD5fB61hSKsqhD5EvxZAxPFBDZFB3YSK/UHMQwREoqY6vQG6QNduHQG5jzqbqFeryM4W//HS3yHpKjNZcBV4kDDMLJIxvb+9f3zbohP3l5CfWuA4TCG4kOGBhG9s0+huEyJLInNxuY5w26hrObKuugocWbxiJtYh4XPkCY5Ero44yCYIT3JvMVphdI0fcsJHC05qNL6StnFoaxMXPHR5V2sXe9+L86d9is0fnUxcF86WfNRLGaoc+RH0oWvMutmqGmjkLOZ3AhJLNk27a7BjcYAP/02+PGXzfCiWHu3mky88n7z7DC0z5sYx6hRzr/9GYYR7rT3zbeb29EXNLzNDPF/Hvqx/m0s8YCfBw74lwADAGVAazQduHsIAAAAAElFTkSuQmCC',
    annosExpandedIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOnSURBVHjarFRNbBtFFP5mdvbPdmuvZccOTVLHDQkGLkSlvYRLUSSKhEBCcOJekMqlSMCBCxckhEAgbkgcuIDgQIWggBQJxI9aFKECUaE1jpQ40ODSqnaT2Guvd3Z4s+ukghOIrvT05ufNm+9975tll96/A1GkcPLVjWMAFsny+G9fi+zzL773z+kJ+/idxx+sTJfemDxYmsnmPVqh1UhvqSScsZuGkWmnVBITSayvbuDSxd+XX3nt9P18s9V++u752ky2PA6YNiDITDMxIci0txLT+3sx9t56Za6KxeP3HqEbXhTnz9cf8Ld+g1uYHaEi4xPkHRoSVKZGqPjIG0kJaotcJx5HMsT21RY4wynRbnfQ2zyLaNCBSJcpgNNZEw8/8S5WVlbQbrfhOA5VqOD7PjzPw9jYGJrNJn4+dwI23eO31tBursIyGYQGpMId9FrL4CIDKRWYqGJpaQkvn5xCOChitpICtw380Rki71mYPeTinodu4NtPz2AyZ8Ch83IYE08sCQNhEIET3kjtUAUKit2gxBLFnERtXGBfcQ7Hn/kJH77kYqwkYKXc+PDA72LgGkg7nMpOmkgIGfrbQ+LYgGHxOLFBzcjlcjh8Vwbp/FGKOoBaLaA1oiV1G4yUR03/Cg4lE3TO1HSrUcIwlPC3hpCugp1OAjTtQRCg04tw35MfoVgsol6vo/pZoqQrZxfjBFwwAsLpnOY9kZTQog66Ydxc3Ui9QUJBr9fD6uUB3nouCzb08egLwIlH8pgn1P7OlTgxJ21qAHZGUFU8lqpQlFBzyLiEYXKSlc4s4k7eXnFQ3i8Q9LRkNnB0zsXCvAcrUyNqLsQJdCLLocqs3YQEXROquxQGElFokPWRzWZRPViAMiqwZBr105MIqAl2fjbWYhRF8PsRJAFiBiEVyQsSuw9Sl64Taz/srqPRaKC80KCdb/7xdL/cG127PkR1woauErscBqFCPFc3n++f1wN88PoMGut9DAYRDH3JQJImo1inMHSZHCkiWwtb70mtFvLGREkUTIMdmR63YulYJAWbOMkQ0QXPRNkjPkm8hf0GisRnIcNwoGiiQvFTJQv7UjxWxXtnrmL5Qvc7duywO0Xz56fL1lN3Vl0UCjZ1jvRIvOinLENCRU0bBtrLvRfBCaWWTacrcbHZx4+/9n/4ZS04xZbfrMQbz77dWhgE6jEZ4RA1yvy3P8MgxLXOtvx6bTP8hKaXNUL8n49+rH+bc9zi75Yn/EuAAQA0/nPpTZjllgAAAABJRU5ErkJggg==',
    // Close button from http://www.clker.com/clipart-24890.html
    closeButton : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAGYwAABmMBTYgavAAAAAd0SU1FB9oDChInJK4ILvcAAASkSURBVEjHtZVfaBRXFMZ/c++dmd1NNrttJPEvJhQVLNimjYWKvlSovlQEn2qJPihEREpFfLBPfSo+WF8E31sJthRRqVD/tBZsBEFN1tQYCfivRhM2ZpPJ7mR3Z+bO7cMmmxho+9JeODDD+ea7597zfXOs66dOFdszGQdj+F+WZfHE8wK1Kp122sAhisCy5gGLN16YW7j+CWcM2DZROo2KwtCEvs80YAkxmzegNVKI2jMQC4G1aDNjDCKOMQvekbKOM3FMExA1NBgVhSH+1BQztj1fTRTRpBSNLS08z+dpBV5Vq+A48xhjIAhodl0KSrFy6VK8kRGKWmOkrGNkGBI5DioKAvxSiYptgxA1gigiu2IFn/b2kmxu5uulS1GFAqViEVy3XkyjMRQaGvhydBT7yRO+amvDKpWozF1hHCPCkCibRegwpOJ5BL5PWCoR+D56ZoZ8scjHO3bw7YkTfJ9OM+W6KN+nWihQLRRQnsek6/JDUxPfnTzJ5u3buTk4SFCtEpRKda6K56HDEBGGIb7nUSmX6zHj+5QfPeKTly+5cvs2R7q7udLezoRtE4+NEY+NMeE4/NLezpHubq7fucPb/f10JhKUPI9KpVLn8j2PMAxROgyZ8TxCpV5rYrFapXT1KqvGx7kcx3yxbx+nz5xh/eQkAA82buTzPXv49e5d3J4e5LNnjEmJse3XRGXPnkhFYYhlDEKIOgApkVISVir4fX0sCwKuK8XBri5+b2sDKTm4aRO/DQyQOncO5+lTykohEolan+dUGMfExhCFIcr3PPK5HO7KlVhzaplVjIljoulpxK1bpG7f5t7p02zZsgWA/uFhCocPU71/H53Nohoba4UusIDRmurICC3r1qG88XFu5vPY+Tz2Yi8CM0AMrLhxgzat6zkJDPT28iIIMPk8KUAs+j6cjY/Gx1FSCJYDKSkRC/Rv4phQawSQXr+ezgsX6Fizhj+Gh9HAu2vXUh4epn/nTqZyOSLAkfK1U8VaMzNrfCWlJAUkEgmEUvNXViphA8mODt4/f56Nq1fz8/37PNm6lVhr/rx2jR0dHdiXL9O/axf+zZsEWuMkErUWWBZxFIHvI6VEKCFwAFcpHClxlCJhDM1AdvNmOi9dYuPq1VwaGmK8q4tqPk91YoLJzz7jfC7He62tdF68SMu2bWQBJ45rPFLWOAElBEJJSRpIuW4tHIcGpXi+YQPLzp6lc/lyfhocpLJ7NzqXI60UGdtGDw0R7d3Lj319vNPczLKeHnRnJ0nHmedyXdKAkhIlpCQBWK6LkBJjDE4Y0mFZPMzlePjiBWuPHiW4dw+RyeBmMrVGT0+jBwZIHzrEN8ePY4KAD7Rm1LbRrotlWcRakwCElChbCFKzHhKWhbEs4mQSPTLCh8eO8UpK9OPHOM3NpBoa5s2YyRDZNubBA946cIA3bZvJ589RqRSuEFizf3wjBPacGBKuC3NNNAZcF51MMl4s1kZBayupRYrCGJxEArTG9X2mLQu1ZAnOrBCwLIzW4LpIKVFSCCtbLlMdHZ037N9N28XD719wRmvccplICEtNJpPBG/v3IxaY8T+b4kAkJZPJZPAXzkw52AmAg6MAAAAASUVORK5CYII=',
    // Warning sign from http://www.psdgraphics.com/icons/psd-red-and-yellow-warning-signs/
    warningSign : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oDChIOI3QqJL8AAARhSURBVDjLlZVtaJVlGMd/9/M852Vn5+yc7TidkebbtNbUmToxSlCTIExCCURDZZYp4QfRyAyiMPxiaSVkvn3Ioi+RJIUEZmJWZlqUoY45X5Yva7PNnXO2Pa/3ffVhIkED8//l+nN9+HHx57q4FP9DnUfnxt2OM8tj6f4pQSn9bcWwqQeq5hwyIqAU96YLe8YBIPsaM+HJ8kNScETCatHtGQlO5N/r3Fgb516l+1vvePmt+nUp5Iy0zRHTvNTIjbkSXR8byukHFgGYrquDMpzBmi27JgxAj418mBprBW6NEm+UKMdW0lsjdqXtUNbxihy1Dp/fP7o4GMMarPnQOk3hzXzCZMqX49SMpjgUZbnguCgrgmISyddOL5RSi+vWRbQdWHh3cOtHMwGoeKZmrJvMr8fNgeNByleUB5D0FLoLZefIjh23XY4+ln5g4QFa9k2+e8Z/7NiMd6z+oJSaxP/5ESPuPBk5PCGADM/HRIK54p5oMOK+K3Jk+u67RtGyuw6A+pHvz49NmLkgbP8b8YqKhM2jk3MANE7KQiyBBJ0qavsFZjQ9L5/QCND8Yd3g4PGrzvEE2NTP+cDK1OJfOSVWIg06SWV2YLsqMnGQOE6qGu/PLwXyihkvbQN4cPW5/4LP7RgDwOHDdW8xZvGI4qnPxYrbythlIEmqKssByGbKQFIYyrFTWdVzfDOMWzZFDtW+8G+OBXD6Zahbe4mujYylcdVKfeMC0c2TyorlgBhIjMpcGQC5igQoB0UMsdJI1IrffDDFtDUr29cxtG7tJU6tB6t5/zymbR2Yuuq5FZuoaMjf/G4LdnoI2ihAQBuy6QQA6XQcNGgEtI3lZCie3QdWorFm2cIlANPfAYurhweO4etJsxk/f/6tH/ZYBD1oiaODkMj3oVBCJALA6AgKvUjgEYUBkbaJ/G4pNn+lqBy2Ro40jAJQAC2ryNRueHWnztUuvfbFahJphZ2swEmmscrSZKtzkE/DTQ/ySSj0U2jvJvJ6idxewt4SWse4f/ZThG03Np/55tc37BVA066lj1Nd/3bnTx8TdF8W5SQVSiECGCFVabFl6yVmrTxD6a8+npwdo7ejhPY8Ii8kDDT93X0SSxpl59QsqNprbdrTUF7SsllH3fS0fi8CSkca7QYYz8fvc0F6eW3ndQC2fdoOPQWiPpfI9Qk9HxMYbMtSV0+cl9RwX1lW5zbLjsXmpkeMmtn+42cSlEShHHQgRKHG9wK01wc3CuzbkKO60mL7ixko9uG7LoEboENDGERggfFR149flPyo/mcdOxEuUtmQrrO/o31weyIsFaEcULaFZTtc6Q1YMjVO0+wK3KJwuaWE5xkkNJhQiLRBCegArp3q576JIU7kuW1Y1xj/9AxuXbwmyhEFBoUgSrDEILZQNELB10jcUDZckRKFGEHkNlQZJESG1KJ0GKJa9k7MJtPB/vJqWWCp8PZaaSAC0SgMoBHRcNsPVANy5x0ACqUEE9mm0FG+8x9dLyrYdNncpgAAAABJRU5ErkJggg==',

    toBackgoundImage : function(data) {
        return 'url(' + data + ')';
    }
};

/**
 * Main application namespace.
 */
var SUA = {
    SU_MODE : 1,
    PRIVATE_MODE : 2,
    version : '0.9.11 BETA',
    annotationManager : new AnnotationManager,
    userManager : new UserManager,
    toolbar : new SuaToolbar,
    editor : new Editor,
    highlighter : new Highlighter,

    /**
     * Runs the SUA application.
     *
     * @param force Forces SUA to work, even on sensitive pages.
     */
    run : function(force) {
        if(force || !DocumentManager.isSensitiveUrl()) {
            GM_registerMenuCommand("[SUA] Add Annotation", function() {
                SUA.annotationManager.startAnnotationMode();
            });
            GM_registerMenuCommand("[SUA] Add Scribble", function() {
                SUA.annotationManager.startScribbleMode();
            });
            GM_registerMenuCommand("[SUA] Toggle Annotation Toolbar", function() {
                SUA.toolbar.toggle();
            });
            GM_registerMenuCommand("[SUA] Hide/Show Annotations", function() {
                SUA.annotationManager.toggle();
            });
            GM_registerMenuCommand("[SUA] Expand/Collapse Annotations", function() {
                SUA.annotationManager.toggleExpand();
            });
            GM_registerMenuCommand("[SUA] Deactivate", function() {
                SUA.toggle();
            });

            // If a review has been found for the current page, the toolbar will be automatically shown
            ReviewPageManager.loadReviews();
            ReviewPageManager.filterSUATags();
        } else {
            if(GM_getValue('suppress_sensitive_warning')) {
                GM_registerMenuCommand("[SUA] Force Loading Annotations", function() {
                    SUA.run(true);
                });
            } else {
                // Add a warning bar for sensitive URLs
                var message = document.createElement('div');
                message.innerHTML =  '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' +
                                    Resources.warningSign + '"> StumbleUpon Annotator is inactive because you are currently on a page that might contain sensitive information. ';
                var loadAnyway = document.createElement('a');
                loadAnyway.innerHTML = 'Click here to load the annotations anyway.';
                loadAnyway.setAttribute('href', '#');

                loadAnyway.addEventListener('click', function() {
                    warning.detach();
                    SUA.run(true);
                }, false);

                var dontShow = document.createElement('label');
                StyleTools.normalizeLabel(dontShow);
                var dontShowCb = document.createElement('input');
                dontShowCb.setAttribute('type', 'checkbox');
                dontShow.appendChild(dontShowCb);
                dontShow.style.color = 'black';
                dontShow.appendChild(document.createTextNode(" Don't show this warning again"));
                dontShow.style.cssFloat = 'right';
                dontShow.style.marginRight = '10px';

                dontShowCb.addEventListener('click', function() {
                    if(dontShowCb.checked) {
                        GM_setValue('suppress_sensitive_warning', 1);
                    } else {
                        GM_deleteValue('suppress_sensitive_warning');
                    }
                }, false);

                message.appendChild(loadAnyway);
                message.appendChild(dontShow);
                var warning = new Toolbar(message, Resources.toBackgoundImage(Resources.yellowToolbarGradient));
                warning.attach();
            }
        }
    },

    /**
     * Activates / deactivates the whole SUA application.
     */
    toggle : function() {
        if(GM_getValue('is_off')) {
            GM_deleteValue('is_off');
            this.run();
        } else {
            GM_setValue('is_off', 1);
            window.location.reload();
        }
    },

    /**
     * Returns the author's email address.
     *
     * @return String
     */
    getAuthorEMail : function() {
        // jumble the address so bots cannot find it
        var elms = {a : 'bubble', b : 'yah', c : 'dirtbag', d : 'oo'};
        return elms.c + elms.a + decodeURIComponent('%40') + elms.b + elms.d + '.com';
    },

    /**
     * Returns and deletes the last stored panic error message.
     *
     * @return String or null
     */
    getLastPanic : function() {
        var panic = GM_getValue('last_panic');
        GM_deleteValue('last_panic');

        return panic;
    },

    /**
     * Creates an error message alert box for serious internal problems.
     *
     * @param message The details.
     */
    panic : function(message) {
        GM_setValue('last_panic', message);
        this.log(message, true);
        alert('Ooopsie...\n\nThe StumbleUpon Annotator ' + message + '.\nThat\'s actually ' +
            'a bug in this script.\n\nSo please let dirtbagbubble know about this problem ' +
            'and send him the URL and tell him what you were trying to do.\n\nYou can use the ' +
            '"Report a problem" link for that which can be found on the right side of the toolbar.\n\n' +
            window.location.href + '\n\nThank you! :-)');
    },

    /**
     * Adds a warning or error message to the error log console.
     *
     * @param message The message to log.
     * @param isError Boolean that indicates that the message is an error.
     */
    log : function(message, isError) {
        var level = isError ? 'Error' : 'Warning';
        GM_log('[SUA] ' + level + ': ' + message);
    }
};

// ------------------------------------------------------------------------------------------------------------
// START - Prevent that toolbar is added to an iframe + workaround for Greasemonkey bug
if(document.body && top && (window.location.href == top.location.href)) {
    // UPDATE CHECK ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var updateChecker = new UpdateChecker(70854, SUA.version);

    updateChecker.onClose = function() {
        window.location.reload();
    };

    updateChecker.start(false, function(updateAvailable) {
        IssueReporter.checkForIssueReporting();

        // Only start SUA if no update has been found
        if(!updateAvailable) {
            if(!GM_getValue('is_off')) {
                SUA.run();
            } else {
                GM_registerMenuCommand("[SUA] Activate", function() {
                    SUA.toggle();
                });
            }

            GM_registerMenuCommand("[SUA] Show Version Information", function() {
                alert("StumbleUpon Annotator v" + SUA.version + "\n\n© 2010 by dirtbagbubble (at yahoo dot com)");
            });

            // Hook event listener for on/off hotkey
            window.addEventListener('keydown', function(e) {
                // <CTRL> + <ALT> + O
                if(e.altKey && e.ctrlKey && e.keyCode == 79) SUA.toggle();
            }, false);
        }
    });
}
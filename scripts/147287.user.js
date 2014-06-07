// ==UserScript==
// @name           TSR Colour Wheel
// @author         Chrosson
// @version        0.5.1
// @description    A colour changer for TSR
// @include        http*://www.thestudentroom.co.uk/*
// @copyright      2012+, Chrosson
// @namespace      http://www.thestudentroom.co.uk/member.php?u=334116
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// ==/UserScript==
function jQueryUI() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/themes/base/jquery-ui.css";
    document.head.appendChild(link);
}
jQueryUI();

// http://static1.tsrfiles.co.uk/2.1/cpstyles/tsr-blue/color.css // NOT THE SAME
// http://static1.tsrfiles.co.uk/2.1/cpstyles/tsr-blue/color.min.css
// http://static2.tsrfiles.co.uk/2.1/images/base/thread-icons-sprite-v2.png

// Assorted useful stuff
// https://developer.mozilla.org/en-US/docs/
// https://developers.google.com/closure/
// http://closure-compiler.appspot.com/home

// Bypassing same origin policy in jQuery.
// See http://www.monperrus.net/martin/greasemonkey+jquery+and+xmlhttprequest+together
// or http://ryangreenberg.com/archives/2010/03/greasemonkey_jquery.php
// or http://blogs.ischool.berkeley.edu/i290-04f09/2009/09/16/working-around-the-same-origin-policy-in-greasemonkey/ 

// Doing things with colours
// http://themeforest.net/forums/thread/dynamic-css-changer/58234 - hints on how to make my own colour picker
// http://www.colorpicker.com/ - basic colour chooser linked from above
// https://github.com/mbostock/d3/wiki/Colors - handy JS library to possibly use in future for colour changing
// http://www.workwithcolor.com/hsl-color-picker-01.htm - visualising colours
// https://github.com/mbostock/d3/wiki/Colors - converting colour coordinate functions
// http://vormplus.be/blog/article/using-colors-in-css - colour coordinate systems in css

// Doing things with images
// http://stackoverflow.com/questions/2002147/html-embed-image-directly-in-html-old-school-style - directly embed images in html
// http://www.websiteoptimization.com/speed/tweak/inline-images/ - the above works in CSS as well
// http://stackoverflow.com/questions/934012/get-image-data-in-javascript - the basics for getting a b64 representation
// http://web.archive.org/web/20080702001125/http://ddzoom.net/jsimages/out.htm - some interesting(?) sample scripts...
// http://stackoverflow.com/questions/9163283/change-png-color-using-javascript-jquery-and-css - fiddle pixels real time
//     http://jsfiddle.net/loktar/qduSR/1/ - particularly handy link
// http://stackoverflow.com/questions/4298323/replaceing-color-on-a-image-realtime - as per above

// Loading images as binaries
// http://forum.tampermonkey.net/viewtopic.php?f=17&t=218 - tampermonkey supports responseType for GM_xmlhttprequest...greasemonkey doesn't
// http://jsfiddle.net/GdKF8/ - building a blob from GM_xmlhttprequest
// http://stackoverflow.com/questions/8778863/downloading-an-image-using-xmlhttprequest-in-a-userscript - convert GM_xmlhttprequest bin response to base64
// http://stackoverflow.com/questions/7370943/retrieving-binary-file-content-using-javascript-base64-encode-it-and-reverse-de - what SHOULD work in GM_xml...
// https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Sending_and_Receiving_Binary_Data - for same domain
// https://developer.mozilla.org/en-US/docs/DOM/window.btoa - converting real binary to base64

// Hints on deferreds and promises (and generally asynchronous stuff)
// http://api.jquery.com/deferred.promise/ - official docs on promise
// http://api.jquery.com/jQuery.when/ - official docs on what happens callbacks when deferreds complete (note you can access 'arguments' array when using below)
// http://stackoverflow.com/questions/5573165/raising-jquery-deferred-then-once-all-deferred-objects-have-been-resolved - list of deferreds
// http://stackoverflow.com/questions/11601710/asynchronous-map-reduce-in-javascript-jquery - thoughts on asynchronous map over lists
// http://stackoverflow.com/questions/11444639/jquery-deferred-use-to-delay-return-of-function-until-async-call-within-functi - example use of deferreds
// https://github.com/caolan/async#map - a real asynchronous map

// The css is hosted on the TSR CDN so same origin policy blocks me from accessing the rules. So I can:
// Retrieve the stylesheet and dump it in the document (current approach)
// Change the CSS stylesheet rels to load it from the main domain. I then need to wait for it to load:
//      Methods for waiting for the CSS:
//      Poll the length of cssRules - http://stackoverflow.com/questions/2635814/javascript-capturing-load-event-on-link
//      Another polling method - http://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request/8283815#8283815
//      Add a handler to 'load' event of the CSS
//          https://developer.mozilla.org/en-US/docs/HTML/Element/link#Stylesheet_load_events
//          http://www.phpied.com/when-is-a-stylesheet-really-loaded/
//      Hack around it http://molily.de/weblog/domcontentloaded
// Not even consider the stylesheet - http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element

// Thoughts for the future:
// Make a full extension using a cross-browser toolkit so I can intercept requests instead of editing afterwards

// TODOs:
// Factor the homebrew async.waterfall/map functions to their own functions
// Actually use the async library?
// Get rid of jquery UI. Yuck.
// Closure compile everything

// Replace the stylesheets ASAP - attempt 1...do we only need to do this for color.min.css?
/*$('link[rel~="stylesheet"]').each(
    function(idx, elt) {
        console.log("replace" + idx);
        elt.href = elt.href.replace(/http:\/\/static[1-3]?\.tsrfiles\.co\.uk/, "http://thestudentroom.co.uk");
    }
);*/

// Attempt 2 - colors.min.css seems to use absolute paths, so just dump it in the document
/*var styleNum;
var replacedCss = false;
$('link[rel~="stylesheet"]').each( function(idx, elt) {
    if (elt.href.search("color.min.css") > 0) {
        styleNum = idx;
        replacedCss = true;
        GM_xmlhttpRequest({
            method: "GET",
            url: elt.href,
            onload: function(response) {
                css = response.responseText;
                style = document.createElement("style");
                style.textContent = css;
                $(elt).replaceWith(style);
                triggerEvent()
            }
        });
    }
});*/

// String for storing original color.min.css
var colourCss;
// DOM element of the (possibly modified) color.min.css stylesheet
var colourCssElt = $('link[rel~="stylesheet"][href*="color.min.css"]');
if (colourCssElt.length !== 1) { throw "CSS error"; } else { colourCssElt = colourCssElt[0]; }
// Object holding mapping from urls to original images
var images = {};
// Object holding mapping from urls to current images. sloppy async workaround.
var modImages = {};
// Numbers currently in textboxes for hsl values
var h, s, l;
// Regular expression for matching images
var cssImageRegexp = /"http[^"]*\.(png|gif)"/ig;


// Attempt 3 - why not parse the colours *before* dumping it?
// TODO: more than one stylesheet
function loadStylesheet(callback) {
    new GM_xmlhttpRequest({
        method: "GET",
        url: colourCssElt.href,
        onload: function (response) {
            colourCss = response.responseText;
            callback();
        }
    });
}
function loadImages(callback) {
    // Poor mans async.map
    // TODO: don't assume we've matched a png in the data prefix
    var imgurlsset = {}, imgurls = [], imgurl, promiseList;
    colourCss.match(cssImageRegexp).map(function (str) { imgurlsset[str.slice(1, str.length - 1)] = 0; });
    $('img[data-origimg]').map(function (idx, elt) { imgurlsset[elt.getAttribute("data-origimg")] = 0; });
    for (imgurl in imgurlsset) { if (imgurlsset.hasOwnProperty(imgurl)) { imgurls.push(imgurl); } }
    promiseList = imgurls.map(
        function (imgurl, idx) {
            var dfdGet = new $.Deferred(), dfdStore = new $.Deferred(), promise = dfdStore.promise();
            getDeferredDataB64(imgurl, function (res) { dfdGet.resolve(res); });
            $.when(dfdGet.promise()).done(function (res) {
                var dtype = imgurl.substr(-3);
                images[imgurl] = res ? "data:image/" + dtype + ";base64," + res : res;
                dfdStore.resolve();
            });
            return promise;
        }
    );
    $.when.apply(window, promiseList).done(function () {
        callback();
    });
}
function loadResources() {
    // async.waterfall :D
    var loadList = [loadStylesheet, loadImages], dfdLoad = new $.Deferred(), fn;
    loadList.reverse();
    fn = loadList.reduce(function (fnacc, cur) {
        return function () { cur(fnacc); };
    }, function () { dfdLoad.resolve(); });
    fn();
    $.when(dfdLoad).done(function() {
        triggerResourcesLoaded();
    });
}
// Store the original values of all element styles
function prepareHtmlElements() {
    $("*[style]").each(function (idx, elt) {
        elt.setAttribute("data-origstyle", elt.style.cssText);
    });
}
function prepareHtmlImages() {
    $('img[src*="tsr-blue"][src$="gif"],img[src*="tsr-blue"][src$="png"],img[src*="images/base"][src$="png"]').map(function (idx, elt) {
        elt.setAttribute("data-origimg", elt.src);
    });
}
function prepareHtml() { prepareHtmlElements(); prepareHtmlImages(); }

function triggerResourcesLoaded() {
    var event;
    if (document.createEvent) {
        event = document.createEvent("Event");
        event.initEvent("ResourcesLoaded", true, true);
        document.dispatchEvent(event);
    } else { // For IE...but greasemonkey doesn't run in IE...
        event = document.createEventObject();
        event.eventType = "ResourcesLoaded";
        element.fireEvent("on" + event.eventType, event);
    }
}

//////////////////////////////////////////////////////////////////
//////////////////// COLOUR UTILITY FUNCTIONS ////////////////////
//////////////////////////////////////////////////////////////////
function hexToRgb(hex) {
    if (hex.substring(0, 1) === '#') { hex = hex.substring(1); }
    if (hex.length === 3) { hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]; }
    return [parseInt(hex[0] + hex[1], 16),
            parseInt(hex[2] + hex[3], 16),
            parseInt(hex[4] + hex[5], 16)];
}
// From https://github.com/mbostock/d3/blob/master/d3.v2.js
// See https://github.com/mbostock/d3/wiki/Colors
// With edits so sat/lum are in range[0-100]
// TODO: move all colour functions to this library
function hslToRgb(h, s, l) {
    var m1, m2;
    if (s !== 0) { s /= 100; }
    if (l !== 0) { l /= 100; }
    var v = function (h) {
        if (h > 360) { h -= 360; } else if (h < 0) { h += 360; }
        if (h < 60) { return m1 + (m2 - m1) * h / 60; }
        if (h < 180) { return m2; }
        if (h < 240) { return m1 + (m2 - m1) * (240 - h) / 60; }
        return m1;
    };
    var vv = function (h) {
        return Math.round(v(h) * 255);
    };
    h = h % 360;
    if (h < 0) { h += 360; }
    s = s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    return [vv(h + 120), vv(h), vv(h - 120)];
}
function rgbToHsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
        s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
        if (r === max) {h = (g - b) / d + (g < b ? 6 : 0);} else if (g === max) {h = (b - r) / d + 2;} else {h = (r - g) / d + 4;}
        h *= 60;
    } else {
        s = h = 0;
    }
    return [h, s*100, l*100];
}
//////////////////////////////////////////////////////////////////
////////////////// END COLOUR UTILITY FUNCTIONS //////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////// GENERAL UTILITY FUNCTIONS ////////////////////
//////////////////////////////////////////////////////////////////
// Params: (url, callback)
// From http://stackoverflow.com/questions/8778863/downloading-an-image-using-xmlhttprequest-in-a-userscript
// With small edits to callbacks
function getDeferredDataB64(imgUrl, callback) {
    return new GM_xmlhttpRequest ( {
        method:         'GET',
        url:            imgUrl,
        onload:         function(resp) { if (resp.status < 400) { callback(txt2b64(resp.responseText)); } else { callback(null); } },
        onerror:        function(resp) { callback(null); }, // This doesn't seem to be called for 404 so handle in onload
        overrideMimeType: 'text/plain; charset=x-user-defined'
    } );
}
// Custom base64 encoding for a binary text response
function txt2b64 (inputStr) {
    var
        bbLen               = 3,
        enCharLen           = 4,
        inpLen              = inputStr.length,
        inx                 = 0,
        jnx,
        keyStr              = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        output              = "",
        paddingBytes        = 0;
    var
        bytebuffer          = new Array (bbLen),
        encodedCharIndexes  = new Array (enCharLen);

    while (inx < inpLen) {
        for (jnx = 0;  jnx < bbLen;  ++jnx) {
            /*--- Throw away high-order byte, as documented at:
              https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
            */
            if (inx < inpLen) {
                bytebuffer[jnx] = inputStr.charCodeAt (inx++) & 0xff;
            } else {
                bytebuffer[jnx] = 0;
            }
        }

        /*--- Get each encoded character, 6 bits at a time.
            index 0: first  6 bits
            index 1: second 6 bits
                        (2 least significant bits from inputStr byte 1
                         + 4 most significant bits from byte 2)
            index 2: third  6 bits
                        (4 least significant bits from inputStr byte 2
                         + 2 most significant bits from byte 3)
            index 3: forth  6 bits (6 least significant bits from inputStr byte 3)
        */
        encodedCharIndexes[0] = bytebuffer[0] >> 2;
        encodedCharIndexes[1] = ( (bytebuffer[0] & 0x3) << 4)   |  (bytebuffer[1] >> 4);
        encodedCharIndexes[2] = ( (bytebuffer[1] & 0x0f) << 2)  |  (bytebuffer[2] >> 6);
        encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

        //--- Determine whether padding happened, and adjust accordingly.
        paddingBytes          = inx - (inpLen - 1);
        switch (paddingBytes) {
            case 1:
                // Set last character to padding char
                encodedCharIndexes[3] = 64;
                break;
            case 2:
                // Set last 2 characters to padding char
                encodedCharIndexes[3] = 64;
                encodedCharIndexes[2] = 64;
                break;
            default:
                break; // No padding - proceed
        }

        /*--- Now grab each appropriate character out of our keystring,
            based on our index array and append it to the output string.
        */
        for (jnx = 0;  jnx < enCharLen;  ++jnx) {
            output += keyStr.charAt ( encodedCharIndexes[jnx] );
        }
    }
    return output;
}
//////////////////////////////////////////////////////////////////
///////////////// END GENERAL UTILITY FUNCTIONS //////////////////
//////////////////////////////////////////////////////////////////

function colourModString(colourString) {
    // Colour coercion
    var rgb;
    if (colourString.substring(0,1) === "#") {
        rgb = hexToRgb(colourString);
    } else if(colourString.substring(0,3) === "rgb") {
        rgb = colourString.match(/\d+/g);
    } else {
        console.log("Unrecognised colour " + colourString);
        return colourString;
    }
    hsl = colourMod(rgb[0], rgb[1], rgb[2]);
    return "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
}

// You spin me right round baby right round
function colourMod(r, g, b){
    var hsl = rgbToHsl(r, g, b);
    // Colour manipulation
    //if (hsl[2] > 90) {hsl[2] -= 5;}

    // For purple    // For pink       // For green      // For red
    //hsl[1] -= 10;  //hsl[1] -= 10;   //hsl[1] -= 10;   //hsl[0] += 160;
    //hsl[0] += 80;  //hsl[0] += 110;  //hsl[0] += 240;

    // -50,2,-15 is interesting with dynamic
    // hue of 200 might be nice
    // TODO: where's the green coming from when I crank up saturation?
    
    // For dynamic
    hsl[0] += h;
    hsl[1] += s;
    hsl[2] += l;

    while (hsl[0] > 360) { hsl[0] -= 360; }
    if (hsl[1] > 100) { hsl[1] = 100; }
    if (hsl[2] > 100) { hsl[2] = 100; }
    while (hsl[0] < 0) { hsl[0] += 360; }
    if (hsl[1] < 0) { hsl[1] = 0; }
    if (hsl[2] < 0) { hsl[2] = 0; }
    
    return hsl;
}

function replaceImageColours(srcstring) {
    var ignoreImage = false;
    if (srcstring[0] !== '"' || srcstring[srcstring.length-1] !== '"') { 
        console.log("invalid url"); ignoreImage = true; 
    }
    var url = srcstring.slice(1, srcstring.length-1);

    // Do we care about this particular image?
    //var spritesimg = "http://static2.tsrfiles.co.uk/2.1/images/base/thread-icons-sprite-v2.png";
    //if (url != spritesimg) { ignoreImage = true; }
    //if (url[url.length-2] != "n") { ignoreImage = true; }
    if (!images[url]) { ignoreImage = true; }
    
    if (ignoreImage) { modImages[url] = srcstring; return null; }
    
    var image = document.createElement("img");
    var dfdModImg = new $.Deferred();
    image.onload = function () {
        // Get an image we can work with
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = image.width; canvas.height = image.height;
        ctx.drawImage(image,0,0);
        var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pix = imgd.data;
        // Loops through all of the pixels and modifies the components.
        for (var i = 0, n = pix.length; i <n; i += 4) {
            if (pix[i+3] === 0) { continue; } // if transparent, skip it
            hslcol = colourMod(pix[i], pix[i+1], pix[i+2]);
            rgbcol = hslToRgb(hslcol[0], hslcol[1], hslcol[2]);
            pix[i] = rgbcol[0];   // Red component
            pix[i+1] = rgbcol[1]; // Blue component
            pix[i+2] = rgbcol[2]; // Green component
            //pix[i+3] is the transparency.
        }
        ctx.putImageData(imgd, 0, 0);
        modImages[url] = canvas.toDataURL();
        dfdModImg.resolve();
    }

    image.src = images[url];

    return dfdModImg.promise();
}

function setCssColours() {
    // Fragile regexp to extract and modify all hex colours - will capture IDs like #Fab123
    var css = colourCss.replace(/#(([a-f\d]{3})|([a-f\d]{6}))(?=[ ;,\)'])/ig, colourModString);
    var promiseList = css.match(cssImageRegexp).map(replaceImageColours);
    $.when.apply(window, promiseList).done(function () {
        css = css.replace(cssImageRegexp, function (url) {
            return modImages[url.slice(1, url.length-1)];
        });
        var style = document.createElement("style");
        style.textContent = css;
        $(colourCssElt).replaceWith(style);
        colourCssElt = style;
    });
}
function loadCssColours() {
    var style = document.createElement("style");
    style.textContent = GM_getValue("colourCssMod");
    $(colourCssElt).replaceWith(style);
    colourCssElt = style;
}

function setHtmlElementColours() {
    // Recolour all the individual elements
    $("*[style][data-origstyle]").each(function (idx, elt) {
        elt.style.cssText = elt.getAttribute("data-origstyle").replace(/rgb\(\d*, \d*, \d*\)/g, colourModString);
    });
}
function loadHtmlElementColours() { 
    setHtmlElementColours(); 
}

function setHtmlImageColours() {
    var promiseList = $('img[data-origimg]').map(function (idx, elt) {
        return replaceImageColours('"'+elt.getAttribute("data-origimg")+'"');
    });
    $.when.apply(window, promiseList).done(function () {
        $('img[data-origimg]').map(function (idx, elt) {
            elt.src = modImages[elt.getAttribute("data-origimg")];
        });
    });
}
function loadHtmlImageColours() {
    // TODO: lazy loading
    var imgs = $('img[data-origimg]').map(function (idx, elt) {
        // Since we're loading from a cache, there may be new iamges...
        var b64img = GM_getValue("img_" + elt.getAttribute("data-origimg"));
        if (b64img) { elt.src = b64img; }
    });
}

function setColours() {
    modImages = new Object;
    setCssColours();
    setHtmlElementColours();
    setHtmlImageColours();
}
function saveColours() {
    GM_setValue("hue", h);
    GM_setValue("sat", s);
    GM_setValue("lum", l);
    var htmlImages = $("img[data-origimg]").map(function (idx, elt) {
        return elt.getAttribute("data-origimg");
    }).get();
    for (var key in modImages) {
        if (htmlImages.indexOf(key) >= 0) {
            GM_setValue("img_" + key, modImages[key]);
        }
    }
    GM_setValue("colourCssMod", colourCssElt.textContent);
    GM_setValue("coloursSaved", GM_info.script.version);
}
function loadColours() {
    h = GM_getValue("hue");
    s = GM_getValue("sat");
    l = GM_getValue("lum");
    // Set the single CSS element
    loadCssColours();
    // Force recognition of images in the html, then load them
    prepareHtml();
    loadHtmlElementColours();
    loadHtmlImageColours();
}
function resetColours() {
    values = GM_listValues();
    for (var i = 0; i < values.length; i++) {
        GM_deleteValue(values[i]);
    }
}

function createDropdowns(hasSaved) {
    //var itemElt = $("#nav_menu > table > tbody > tr > .vbmenu_control")[0];
    var menuElt = $("#user-menu > ul")[0];
    //var linkElt = $("#user-menu > ul").children()[0];
    //var arrowElt = $("#about_tsr").children()[0];
    
    var create = function (type) { return document.createElement(type); };
    var linkItem = function (txt) { var it = create("li"), t = create("span"); it.className = "expandable"; it.appendChild(t); t.innerHTML = txt; return it; };
    var txtItem = function (txt) { var it = create("li"), t = create("span"); t.style.cssText = "cursor:default;"; it.appendChild(t); t.innerHTML = txt; return it };
    var txtArrItem = function (txt) { var it = txtItem(txt); it.children[0].className = "arrow-down"; return it; };
    var put = function (elt) { menuElt.insertBefore(elt, menuElt.firstChild); };
    
    var smiley = txtItem("&#9996;.&#661;&#664;&#8255;&#664;&#660;.&#9996;"); put(smiley); 
    
    if (hasSaved) {
        var resetItem = linkItem("Reset colours"); put(resetItem);
        resetItem.addEventListener('click', function () {
            var resetTxtItem = txtItem("Please wait...");
            $(resetItem).replaceWith(resetTxtItem);
            resetColours();
            var resetTxtItem2 = txtItem("Refresh to finish reset");
            $(resetTxtItem).replaceWith(resetTxtItem2);
        });
    } else {
        var editItem = linkItem("Edit colours"); put(editItem);
        editItem.addEventListener('click', function () {
            var editTxtItem = txtItem("Loading, please wait...");
            $(editItem).replaceWith(editTxtItem);
            document.addEventListener('ResourcesLoaded', function() {
                // TODO: sliders aren't very robust e.g. when a new item is added to the menu
                h = 0; s = 0; l = 0;
                setColours();
                $(editTxtItem).remove();
                
                var saveItem = linkItem("Save colours");
                saveItem.addEventListener('click', function () {
                    var saveTxtItem = txtItem("Please wait...");
                    $(saveItem).replaceWith(saveTxtItem);
                    saveColours();
                    var saveTxtItem2 = txtItem("Refresh to complete save");
                    $(saveTxtItem).replaceWith(saveTxtItem2);
                });
                
                var logoElt = (function () {
                    var elts = $('img[data-origimg]').get();
                    for (var i = 0; i < elts.length; i++) { 
                        if (/logo.*\.png$/i.test(elts[i].getAttribute("data-origimg"))) { return elts[i]; }
                    }
                })();

                var recolourLogo = function () {
                    $.when(replaceImageColours('"' + logoElt.getAttribute("data-origimg") + '"')).done(function () {
                        logoElt.src = modImages[logoElt.getAttribute("data-origimg")];
                    });
                };
                
                var setItem = linkItem("Try colours"); put(setItem);
                setItem.addEventListener('click', function () {setColours(); $(setItem).replaceWith(saveItem);});

                var holderItem = txtArrItem(" "); put(holderItem);
                var hslUL = create("ul"); hslUL.style.display = "none";
                holderItem.appendChild(hslUL);
                var opts = [{ text:"Hue ", r:180, id:"hueInput", upd:function (e,ui) { h = ui.value; $(saveItem).replaceWith(setItem); recolourLogo(); } },
                            { text:"Sat ", r:50,  id:"satInput", upd:function (e,ui) { s = ui.value; $(saveItem).replaceWith(setItem); recolourLogo(); } },
                            { text:"Lum ", r:50,  id:"lumInput", upd:function (e,ui) { l = ui.value; $(saveItem).replaceWith(setItem); recolourLogo(); } }];
                opts.reverse().map(function (vars) {
                    var li = create("ol"), div = create("div"), label = create("span");
                    div.id = vars.id; label.innerText = vars.text;
                    div.style.cssText = /*"z-index:50; margin-left:auto; !important "height:10px; ";*/ "width:300px;";
                    
                    $(div).slider({ orientation: "horizontal", slide:vars.upd, max: vars.r, min: -vars.r });
                    
                    li.appendChild(label); li.appendChild(div);
                    hslUL.insertBefore(li, hslUL.firstChild);
                });
                hslUL.style.display = "block";

            });
            prepareHtml();
            loadResources();

        });
         
    }
    
}

// migrations...
//var version = GM_info.script.version.split(".").map(parseInt);
//while (version.length < 3) { version.push(0); }
var savedVersion = (typeof(GM_getValue("coloursSaved")) === "string") ? GM_getValue("coloursSaved").split(".").map(parseInt) : GM_getValue("coloursSaved");
//while (savedVersion.length < 3) { savedVersion.push(0); }

if (savedVersion === undefined || savedVersion === null) {
    // Nothing saved
    createDropdowns(false);
} else if (savedVersion[0] == 0 && savedVersion[1] < 5) {
    // Incompatible old version
    resetColours();
    createDropdowns(false);
} else {
    // We can load the colours we already have :)
    createDropdowns(true);
    loadColours();
}
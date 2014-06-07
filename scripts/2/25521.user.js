// ==UserScript==
// @name           MakeItSans
// @namespace      http://manuelonsoftware.wordpress.com/
// @description    Replaces every font-family CSS definition with sans-serif.
// @include        *
// ==/UserScript==


/*
* Several website authors think Arial is an universal font. Well, it's not.
* This script traverses the whole CSS tree and finds font-family declarations
* Whenever a font-family includes one of the following: Helvetica, Verdana,
* Arial, sans-serif, and Lucida the script replaces that font-family for just
* sans-serif.
*/

/*const*/ var __debug = false;
/*const*/ var IMPORT_RULE = 3;
/*const*/ var MEDIA_RULE = 4;

function logthis(what) {
    if (__debug && console && console.log)
        console.log(what);
}

// The compiler should realize this is a candidate for inline
/*inline */ function shouldSans(fontfamilyString) {
    if (fontfamilyString != '') {
        var pattern = /Verdana|Arial|sans-serif|Helvetica|Lucida/i;
        logthis("Figuring out whether to sans-ize: "+fontfamilyString);
        logthis("   Return: "+ fontfamilyString.search(pattern) != -1);
        return fontfamilyString.search(pattern) != -1;
    }
    else
        return false;
}

function processStyleSheet(sheet) {
    logthis("processing stylesheet :" + sheet.href);

    for (var which=0; which<sheet.cssRules.length; which++) {
        logthis("sheet.cssRule "+ which +": "+sheet.cssRules[which].cssText);

        if (sheet.cssRules[which].type == sheet.cssRules[which].STYLE_RULE) {
            if (shouldSans(sheet.cssRules[which].style.getPropertyValue("font-family"))){
                logthis(sheet.cssRules[which].style.getPropertyValue("font-family"));
                sheet.cssRules[which].style.setProperty("font-family", "sans-serif", "");
                logthis(sheet.cssRules[which].style.getPropertyValue("font-family"));
            }
        }

        if (sheet.cssRules[which].type == IMPORT_RULE) {
            logthis("Recursing into an import rule: " + sheet.cssRules[which].cssText);
            processStyleSheet(sheet.cssRules[which].styleSheet);
        }

        if (sheet.cssRules[which].type == MEDIA_RULE &&
            sheet.cssRules[which].media.mediaText == "screen") {
            logthis("Recursing into media rule: " + sheet.cssRules[which].cssText);
            processStyleSheet(sheet.cssRules[which]);
        }
    }
}

// Process all stylesheets
for(var i = 0; i < document.styleSheets.length; i++) {
    var sheet = document.styleSheets[i]
    processStyleSheet(sheet);
}

// Now we should process FONT tags
var targets = document.getElementsByTagName('FONT')
for(var i = 0; i < targets.length; i++)
  if (shouldSans(targets[i].getAttribute('FACE')))
  	targets[i].setAttribute('FACE', 'sans-serif');

// TODO: Process style attributes:
//    //self::*[@style]
// ==UserScript==
// @name        Enhance Metafilter Titles
// @namespace   http://example.com/EnhanceMetafilterTitles
// @description Uh, you don't want to install this.
// @include     http://www.metafilter.com/
// @include     http://www.metafilter.com/*?page=*
// @include     http://ask.metafilter.com/
// @include     http://ask.metafilter.com/*?page=*
// @include     http://metatalk.metafilter.com/
// @include     http://metatalk.metafilter.com/*?page=*
// @version     1
// ==/UserScript==

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function enhance() {
    var snap = document.evaluate(
    	"//div[contains(concat(' ', @class, ' '), ' posttitle ')]//a",
    	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < snap.snapshotLength; i++) {
    	var link = snap.snapshotItem(i);
    
        link.style.fontSize = "" + (rand(100) + 32) + "px";
    
        backColor = 
            (256 * 256 * rand(255) + 256 * rand(255) + rand(255)).toString(16);
        while (backColor.length < 6) {
            backColor = "0" + backColor;
        }
        backColor = "#" + backColor;
        link.style.backgroundColor = backColor;
        
        var decorationBits = rand(15);
        var decoration = "";
        if (decorationBits & 1) {
            decoration += "underline ";
        }
        if (decorationBits & 2) {
            decoration += "overline ";
        }
        if (decorationBits & 4) {
            decoration += "line-through ";
        }
        if (decorationBits & 8) {
            decoration += "blink ";
        }
        decoration = decoration.substr(0, decoration.length - 1);
        link.style.textDecoration = decoration;
        
        var fontA = rand(7);
        if (fontA == 0) {
            font = '"Comic Sans MS"';
        } else if (fontA == 1) {
            fontA = '"Bradley Hand ITC"';
        } else if (fontA == 2) {
            fontA = '"Kristen ITC"';
        } else if (fontA == 3) {
            fontA = '"Curlz MT"';
        } else if (fontA == 4) {
            fontA = 'Papyrus';
        } else if (fontA == 5) {
            fontA = 'Vivaldi';
        } else if (fontA == 6) {
            fontA = '"Viner Hand ITC"';
        } else if (fontA == 7) {
            fontA = 'wingdings';
        }
        
        var fontB = rand(3);
        if (fontB == 0) {
            fontB = 'cursive';
        } else if (fontB == 1) {
            fontB = 'Courier';
        } else if (fontB == 2) {
            fontB = 'Charcoal';
        } else if (fontB == 3) {
            fontB = 'Gadget';
        }
    
        var fontC = rand(2);
        if (fontC == 0) {
            fontC = 'serif';
        } else if (fontC == 1) {
            fontC = 'sans-serif';
        } else if (fontC == 2) {
            fontC = 'monospace';
        }
        
        link.style.fontFamily = fontA + ", " + fontB + ", " + fontC;
    }
}

enhance();
setInterval(enhance, 5000);
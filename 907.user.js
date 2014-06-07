/*
    Map the address of the commercial real estate listing at www.icx.ca
    (Canadian Multiple Listing Service) via maps.google.com
    The address is found on a detailed listing page at
    <span id="_ctl0_lblAddress">Address:</span></td>
    <td>#xxx - xx MY ST <br>MYTOWN, MYPROVINCE<br>H0H 0H0</td>
    </tr>

    Also on the list of properties looking for
    <td colspan="3" class="MainHeadingSecondary">#xxx - xx MY ST MYTOWN, MYPROVINCE H0H 0H0</td>

    A Firefox Greasemonkey script, Version 0.1, created June 10, 2005
    Nash R. Radovanovic <support@bgdsoftware.com>
    for BackGrounD Software (http://www.bgdsoftware.com)

    A Firefox Greasemonkey script, Version 0.2, created June 12, 2005
    EVEN better - found nice code at http://www.randomchaos.com/software/firefox/greasemonkey/aga/
    to include iframe with Google maps, so no need to click at all :-)))

    Original script location: http://www.bgdsoftware.com/freejs/isxcamap.user.js
    For legal aspect of this distribution please see http://www.bgdsoftware.com/bgdsoftware/disclaim.txt
*/

// ==UserScript==
// @name            ICXcaMap
// @namespace       http://www.bgdsoftware.com/freejs/
// @description     ICX.ca - map location for a commercial real estate listing on the fly
// @include         http://*.icx.ca/*
// ==/UserScript==

(function () {

function mapLoc(p) {
// serialize HTML
   var serializer = new XMLSerializer();
   var xml = serializer.serializeToString(p);
// find location of the address
   var whereis = xml.indexOf("Address:");
   var stripxml = xml.substring((whereis + 40));
// look for the "Price:" as address is in between
   var howfar = stripxml.indexOf("Price:");
// strip all but address
   var addrPart = stripxml.substring(0,(howfar - 100));
// get rid of HTML tags
   var re= /<\S[^>]*>/g; 
   addrPart = addrPart.replace(re," "); 
// get rid of Suite/Unit # if it's there
   var re= /#\S[^>]*-/g; 
   addrPart = addrPart.replace(re," "); 

//**************
// code borrowed from http://www.randomchaos.com/software/firefox/greasemonkey/aga/
var SAFECHARS = "0123456789" +					// Numeric
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
                "abcdefghijklmnopqrstuvwxyz" +
                "-_.!~*'()";					// RFC2396 Mark characters
var HEX = "0123456789ABCDEF";
// changed to suit our purpose location.href substituted with addrPart to encode physical listing address
var plaintext = addrPart;
var encoded = "";
var inner = "";

for (var i = 0; i < plaintext.length; i++ ) {
    var ch = plaintext.charAt(i);
    if (ch == " ") {
        encoded += "+";				// x-www-urlencoded, rather than %20
    } else if (SAFECHARS.indexOf(ch) != -1) {
        encoded += ch;
    } else {
        var charCode = ch.charCodeAt(0);
        if (charCode > 255) {
            encoded += "+";
        } else {
            encoded += "%";
            encoded += HEX.charAt((charCode >> 4) & 0xF);
            encoded += HEX.charAt(charCode & 0xF);
        }
    }
} // for


inner = '<iframe src="http://maps.google.com/maps?q=' + encoded + '" width="640" height="480" scrolling="yes"></iframe>';
s = window._content.document.createElement("span");
s.innerHTML = inner;
// window._content.document.body.insertBefore(s, document.body.firstChild);
//**************

// is this a page with single listing? then do this...
   var results = document.evaluate("//span[@id='_ctl0_lblAddress']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; ++i) {
        var result = results.snapshotItem(i);
        var link = document.createElement('a');
        link.type = "View Google";
        link.href = "http://maps.google.com/maps?q=" + addrPart;
        link.innerHTML = 'map it! ';
        result.insertBefore(link, result.firstChild);
        result.insertBefore(s, result.firstChild);

    }

// is this a page with multiple results? then do this...
   var results = document.evaluate("//td[@class='MainHeadingSecondary']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; ++i) {
        var result = results.snapshotItem(i);
        addrPart = result.innerHTML;
        // get rid of Suite/Unit # if it's there
        var re= /#\S[^>]*-/g; 
        addrPart = addrPart.replace(re," "); 
        var link = document.createElement('a');
        link.type = "View Google";
        link.href = "http://maps.google.com/maps?q=" + addrPart;
        link.innerHTML = 'map it! ';
        result.insertBefore(link, result.firstChild);

    }

}

	// run the script
	mapLoc(document);

})();


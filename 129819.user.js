// ==UserScript==
// @name           Mediafiredowns Links Changer
// @namespace      http://saarblog.wordpress.com
// @description    Change base64ed links in mediafiredowns.com to simple link.  I recommend you to use iHatePaidLinks (greasemonkey user script #105301) beside this script.
// @author         Saar <identi.ca: @saar>
// @version        0.1
// @license        Gnu General Public License Version 3
// @run-at         document-end
// @include        http://*mediafiredowns.com/*
// ==/UserScript==

/*
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



//decode64 function from http://ntt.cc/2008/01/19/base64-encoder-decoder-with-javascript.html
var keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return unescape(output);
}

var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
var findLinkRegexp = /.*http:\/\/mediafiredowns\.[^\/]*\/download\.php\?link=(.*)/g;
for (var i = 0; i < allLinks.length; i++) {
    if (allLinks[i].href && allLinks[i].href.match(findLinkRegexp))
        thisLink = allLinks[i];
    else
        continue;
    var match = findLinkRegexp.exec(thisLink.href);
    if (match != null) {
        thisLink.href = decode64(match[1]);
        thisLink.style.color = "red";
    }
}

// Direct Link user script
// version 0.31 Beta
// Richard H. Tingstad
//
// For every link on a web page that contains in-link URIs (e.g.
// "http://foo.com/?u=example.com"), an anchor (link) element which refers to
// the contained URI is created and inserted just after the original link.
//
// What's the point?
// Many web pages have links which either redirect you to another URL, or embeds
// the target page in their own frame. There may be several reasons to go
// directly to the target URL; avoiding ugly frames with ads, not wanting to
// contribute to the statistics, or lowering load times. Even worse is that some
// pages only deliver the target page with a certain probability.
//
// To use this script with Firefox, you need Greasemonkey. Works with Opera as
// well.
//
// 20100123 0.31 Improved performance.
// 20091019 0.30 Fixed bug when anchor element has no href attribute.
// 20091017 0.29 Fixed bug with IP address and handles whitespace in href.
// 20090924 0.28 Several small changes to improve in-link URL matching. Better
//               with javascript:, foo.com/?bar.com (/[other puncuation]), and
//               foo.com/q=r:bar.com (other punct. preceeding url than [%/?&=]).
// 20090606 0.27 Fixed URLs that are URL encoded AND Base64 encoded. Fixed bug
//               loading variable emailToggling.
// 20090510 0.26 Black list of TLDs that could be file extensions. Config is
//               saved and loaded so users can keep conf across script versions.
// 20090324 0.25 mailto: for email addresses, changes on mouseout. Starts at top
//               of page. No duplicate links. Little better regexp. Some visual
//               code changes.
// 20090121 0.24 Small improvement to regular expression.
// 20081213 0.23 Base64 support. Recursive check. Better regexp and readability.
// 20080820 0.21 Succeeding "^" link instead of "pop-up" div element.
// 20071017 0.2  Begin.
//
// ==UserScript==
// @name           DirectLink
// @namespace      http://drop.by
// @description    Finds URIs that are in links and displays them (as links)
// @include        *
// ==/UserScript==
(function () {

    var directLinkCaption = "^"; // How you want the created link displayed.
    var emailCaption = "@"; //"Ãª";

    var emailToggling = true; // Switch between mailto: and http:// on mouseout
    //if (possibly) email address. If false, mailto: is used all the time.

    var possibleFileExtensions = 'DO|PY|JP'; // Ignore URLs with matching TLD,
	//but only if URL misses foo:// and ends with the TLD (not e.g. /index.php).

    if (typeof GM_getValue == 'function') {
        var t = GM_getValue("directLinkCaption");
        if (t) directLinkCaption = t;
        else GM_setValue("directLinkCaption", directLinkCaption);
        t = GM_getValue("emailCaption");
        if (t) emailCaption = t;
        else GM_setValue("emailCaption", emailCaption);
        t = GM_getValue("emailToggling");
        if (typeof t != 'undefined') emailToggling = t;
        else GM_setValue("emailToggling", emailToggling);
        t = GM_getValue("possibleFileExtensions");
        if (t) possibleFileExtensions = t;
        else GM_setValue("possibleFileExtensions", possibleFileExtensions);
    }

    var keyStr =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var url =
        "([a-z\\d]+[a-z\\d-+.]*((:|%3A)(//|%2F%2F)))?" + //optional protocol://
        "(\\w+(:\\w+)?(?:@|%40))?" + //optional username[:password]@
        "((([\\d]{1,3}\\.){3}[\\d]{1,3})|" + //IP address or
        "(([a-z\\d-]+(\\.|%2E))*" + //any sub domains
        "[a-z\\d]+[a-z\\d-]*(\\.|%2E)" + //domain name
        "(AC|AD|AE|AERO|AF|AG|AI|AL|AM|AN|AO|AQ|AR|ARPA|AS|AT|AU|AW|AX|AZ|BA|" +
        "BB|BD|BE|BF|BG|BH|BI|BIZ|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CAT|CC|" +
        "CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|COM|COOP|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|" +
        "DM|DO|DZ|EC|EDU|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|" +
        "GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|" +
        "IE|IL|IM|IN|INFO|INT|IO|IQ|IR|IS|IT|JE|JM|JO|JOBS|JP|KE|KG|KH|KI|KM|" +
        "KN|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|MG|MH|MIL|" +
        "MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MUSEUM|MV|MW|MX|MY|MZ|NA|NAME|" +
        "NC|NE|NET|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|ORG|PA|PE|PF|PG|PH|PK|PL|PM|" +
        "PN|PR|PRO|PS|PT|PW|PY|QA|RE|RO|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|" +
        "SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TEL|TF|TG|TH|TJ|TK|TL|TM|TN|TO|" +
        "TP|TR|TRAVEL|TT|TV|TW|TZ|UA|UG|UK|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|" +
        "WF|WS|YE|YT|YU|ZA|ZM|ZW)))" + //Top-level domain
        "(:\\d+)?" + //optional port
        "((/[^&?\\s]*(\\?[^?\\s]*)?)|(%2F[^&?\\s]*)|$|&)";

    var myRe = new RegExp(url, "gi");
    var regExpFiles = new RegExp(possibleFileExtensions, "i");
    var regExpInUrl = new RegExp("(?:[^/][^a-z0-9.-]|/[^/a-z0-9.-])" +url,"gi");
    var regExpBase = //Assumes at least 6 long to be an encoded URL.
        new RegExp("=[^a-z0-9+/]*([a-z0-9+/]{6,}[=]{0,2})([^a-z0-9+/]|$)","gi");

    var linksTemp = document.getElementsByTagName("a");
    var links = [];
    for (var i = 0; i < linksTemp.length; i++) {
        links[i] = linksTemp[i];
    }
    linksTemp = null;
    var ln = "";
    var taken = null;

    i = 0;
    while (i < links.length) {
        taken = new Object();
        checkLink(links[i++]);
    }

    function checkLink(link) {
        if (!link) return;
        var linkUrl = link.getAttribute("href");
        if (linkUrl == null) return;
        linkUrl = linkUrl.replace(/^\s+/, "").replace(/\s+$/, "");
        var insertBefore = link.nextSibling;
        while ((myArray = regExpInUrl.exec(linkUrl)) != undefined) {
            if (myArray == null) break;
            if (!myArray[1] // Protocol, e.g. http://
                    && !myArray[15] // Port #, e.g. :8080
                    && !myArray[16] // Resource, e.g. /index.php
                    && myArray[14]
                    && myArray[14].match(regExpFiles))
                continue;
            ln = myArray[0];
            ln = ln.substr(2);
            ln = unescape(ln);
            if (ln.charAt(ln.length - 1) == "&") {
                ln = ln.substr(0, ln.length - 1);
            }
            createDirectLink(ln, insertBefore, link, myArray.index + 2);
        }
        while ((myArray = regExpBase.exec(linkUrl)) != undefined) {
            if (myArray == null) break;
            //Check to see if string contains at least one letter and one digit,
            //if not it is probably not a Base64 encoding. A little faster.
            if (myArray[1].search("[a-z]") < 0 ||
                    myArray[1].search("[0-9]") < 0)
                continue;
            var ln = decode64(myArray[1]);
            ln = unescape(ln);
            var start = ln.search(myRe);
            if (start >= 0) {
                createDirectLink(ln.substr(start), insertBefore, link, start);
            }
        }
    }

    function createDirectLink(hrefUrl, insertBeforeNode, link, startPos) {
        if (startPos > 0 && link.getAttribute("href").substr(startPos - 1, 3)
                .match('%[0-9]+'))
            hrefUrl = hrefUrl.substr(2);
        var schemes = ["http", "https"];
        for (scheme in schemes) {
            var http = hrefUrl.indexOf(schemes[scheme] + "://");
            if (http > 0 && http == hrefUrl.indexOf("://") 
                    - schemes[scheme].length) {
                hrefUrl = hrefUrl.substr(http);
                break;
            }
        }
        if (link.getAttribute("href").toLowerCase().indexOf("javascript:")
                == 0) {
            var qt = hrefUrl.search(/['"]/);
            if (qt > -1) {
                if (startPos > 0
                        && link.getAttribute("href").substr(startPos - 2, 1)
                            == "\\"
                        && hrefUrl.substr(qt - 1, 1) == "\\")
                    qt--;
                hrefUrl = hrefUrl.substr(0, qt);
            }
        }
        else if (link.getAttribute("href").toLowerCase().indexOf("mailto:")
                == 0) return;
        if (taken[hrefUrl]) return;
        taken[hrefUrl] = true;
        var caption = directLinkCaption;
        if (hrefUrl.indexOf("mailto:") == 0) {
            caption = emailCaption;
        }
        else if (hrefUrl.indexOf("@") > -1 && hrefUrl.indexOf(":") == -1 &&
                hrefUrl.substring(hrefUrl.indexOf("@") + 1).
                search(/[^a-z\d.-]/i) == -1) {
            caption = emailCaption;
            hrefUrl = "mailto:" + hrefUrl;
        }
        else if (hrefUrl.indexOf("://") == -1) {
            hrefUrl = "http://" + hrefUrl;
        }
        var newLink = document.createElement("a");
        if (emailToggling && caption == emailCaption) {
            newLink.setAttribute("title",
                "Mouse out to switch between http:// and mailto:");
            newLink.addEventListener("mouseout", toggleEmail, false);
        }
        var textNode = document.createTextNode(caption);
        newLink.appendChild(textNode);
        newLink.setAttribute("href", hrefUrl);
        newLink.setAttribute("class", "directlink");
        link.parentNode.insertBefore(newLink, insertBeforeNode);
        checkLink(newLink);
    }

    function toggleEmail() {
        if (emailCaption == this.innerHTML) {
            this.innerHTML = directLinkCaption;
            this.setAttribute("href", "http://" +
                this.getAttribute("href").substring(7));
        }
        else {
            this.innerHTML = emailCaption;
            this.setAttribute("href", "mailto:" +
                this.getAttribute("href").substring(7));
        }
    }

  // This code was written by Tyler Akins and has been placed in the
  // public domain.  It would be nice if you left this header intact.
  // Base64 code from Tyler Akins -- http://rumkin.com
  function decode64(input) {
     var output = "";
     var chr1, chr2, chr3;
     var enc1, enc2, enc3, enc4;
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     //input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

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
     } while (i < input.length);

     return output;
  }

})();

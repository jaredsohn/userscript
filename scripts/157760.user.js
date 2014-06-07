// Author:Ian Plain created this version original version by  Richard Hamnett
// License: GNU GPL v2 or later
// ==UserScript==
// @name           Gradwell api dialer Dialer
// @namespace      http://gradwell.com
// @description    Finds and links phone numbers on the given page, and allows them to be seamlessly called from your Gradwell account, without navigating away from the page.
// @include        *
// @version       0.1
// ==/UserScript==

dateVar = new Date();
minuteV = dateVar.getMinutes();
if (minuteV < 10) {
    minuteV = "0" + minuteV;
}


var username = '';

//username = GM_getValue('username');

if (!GM_getValue('username')) {
        username = prompt("What is your Gradwell number?");
        GM_setValue('username', username);
} else {
        //To change extension number uncomment lines below save and load web page page you will be prompted for extension
        //username = prompt("What Gradwell extension number would you like to change to ?");
        //GM_setValue('username', username);
        username = GM_getValue('username');
}


(function () {
        //UK number parser
        //const numberRegex = /(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}|(\s*(\d{4})?-\d{3}?-\d{4}?\s*)/ig
        const numberRegex = /([0]{1})([0-9]{10,14})/ig
        //Server address and clicktocall file name
        const scriptURL = 'https://call-api.gradwell.com/0.9.3/call';
        //Users Extension channel. Is now and passed to the C2C script
	//The long password is generated on your Gradwell login page
        const scriptPWD = 'enterlongpasswordhere';
        //IANS BIT
        function doCallBack(numb,e) {
                e.preventDefault();
                      GM_xmlhttpRequest({
                      method:"POST",
                      url: scriptURL + '?auth=' + scriptPWD  + '&extension=' + username + '&destination=' + String(numb).replace(/[\-\s\/\(\)\.]/g, "")
                });
        }


    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em",
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike",
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];

    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
                                //" and contains(translate(., 'HTTP', 'http'), 'http')" +
                                "]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (numberRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            numberRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = numberRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("a");
                a.setAttribute("href", "javascript:void("+match[0]+")");
                a.setAttribute("arg", match[0]);
                a.addEventListener("click", function(eve){doCallBack(this.getAttribute("arg"),eve);} , true)
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = numberRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }

})();
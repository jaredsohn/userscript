// ==UserScript==
// @name           EQ 2.0 Agent Click to Dial
// @namespace      eqcontactcenter.com
// @description    Enables click to dial for phone numbers found on any web page for agents signed into the EQ Agent Toolbar
// @include        *
// ==/UserScript==

// URL: http://userscripts.org/scripts/show/178976

// Author: Equilibrium Contact Center Inc. (http://www.eqcontactcenter.com/)
// Based on Click to Dial SIP by Fiver.com/hybriditservices (http://userscripts.org/scripts/review/154630)

(function () {
    var regex = /(?:1[ .\-]*)?\(?[0-9]{3}\)?[ .\-]*[0-9]{3}[ .\-]*[0-9]{4}/ig;
    var eqBaseUrl;


    /* Get EQ base URL */

    // Store base URL if current page is Agent Toolbar
    if (/eq\/agent\/toolbar/i.test(window.location.href)) {
        GM_setValue('eq_base_url', window.location.host + '/eq/');
    }

    eqBaseUrl = GM_getValue('eq_base_url', undefined);

    if (eqBaseUrl === undefined) {
        return;
    }


    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em",
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike",
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];

    var xpath = '//text()[(parent::' + allowedParents.join(' or parent::') + ')]';
    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (regex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            regex.lastIndex = 0;

            for (var match = null, lastLastIndex = 0; (match = regex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement('a');
                a.setAttribute('href', 'http://' + eqBaseUrl + 'agent/toolbar/my-phone/dial?_method=POST&phone_number=' + (match[0].replace(/[^0-9]/g, '')));
                a.setAttribute('target', '_blank');
                a.appendChild(document.createTextNode(match[0]));

                (function (span, a) {
                    a.onclick = function(e) {
                        e.preventDefault();

                        var iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        iframe.src = this.getAttribute('href');
                        span.appendChild(iframe);

                        setTimeout(function() {
                            iframe.parentElement.removeChild(iframe);
                        }, 3000);
                    };
                })(span, a);

                span.appendChild(a);

                lastLastIndex = regex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
})();

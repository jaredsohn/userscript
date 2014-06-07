// Linkify (for ShoreTel)
// Author: Paul Benson
// License: GNU GPL v2 or later
// Modified from: Linkify (for Microsoft Lync) (http://userscripts.org/scripts/show/113801)
// Modified from: Linkify (for Cisco WebDialer) (http://userscripts.org/scripts/show/113185)
// Modified from: Linkify (http://userscripts.org/scripts/review/6111)
// Modified from: Skype Linkify (http://www.questar.it/blog/developer/skypelinkify.user.js)
// which was inspired by SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js)
// which in turn was inspired by UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js)
//
//
// Match these patterns:
// (800) 555-1212
// (800)555-1212
// 800-555-1212
// 800-555-1212
// 800-555-1212
// 800 555 1212
// 800.555.1212
// 800/555/1212
// 8005551212
// +18005551212
// +1 8005551212
// +1 (800) 555-1212
//
// ==UserScript==
// @name           Linkify (for ShoreTel)
// @namespace      http://userscripts.org/scripts/show/133384
// @description    Turn phone numbers into hyperlinks so you can click them to auto-dial using a custom asynchronous pluggable protocol designed to interface with ShoreTel.
// @include        *
// @version        1.0
//
// @history        1.0 First version
// ==/UserScript==

//default country prefix
const defaultPrefix= '+1';

(function () {

	GM_addStyle((<><![CDATA[
		.shoretelapp {
			color: inherit;
			text-decoration: none;
			background: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%02%91IDAT8Ocd%C0%018%A6%1E%94ed%FC%1D%CC%C0%C0%E8%0ETb%0CUv%96%81%E1%FF%CE%FF%FFY%D7%FE%C8%B6%7F%0C%12c%C4%A6%9Fc%C6nK%A6%7FL%E5%40i%7F%EC%E6%FF%DF%F8%8F%E9_%E7%8F%0C%D7%E3%8C%F6%F6%F6%02%FF%FE%FD%3B%04%C4%BA%EC%EC%EC7n%9B%F8%84%BCU%D0o%85i%FE%9A%E9%C8%B0%F4%E6%0B%86%B4%7D%D7%D1%CC%02%1A%F2%9F%25%97Y%5B%5B%FB%84%AD%AD%AD%CA%A2E%8BX%85%84%84xon%5B%1B%F9B%C1%D0%E8%3F3%0BX%C3%DB%1F%BF%19J%8D%E4%19%14%F88%196%DF%7F%83d%08%A3%06%03%E3%DFG%0C%8E%8E%8E%3F%FE%23%81%89%8BW%7C6%F2%09%F9%EF%B0%F6%CC%FF%2F%BF%FE%20K%FD%E7%9A%B6%0F%CC%EF%3C%F3%00%CC%E6%9C%B6w%3B%D3%AF_%BF%D8%91%DD%96%14%E0%CD%C3%F9%FE9%C3%16_%03%863%AF%3E1%98%AF%3A%CD%C0%3D%7D%3F%18%83%40%D7%D9%87%0Ce%C6%F20-%C6L%C8%9A%3F~%FC%F8%CA%3B6%F9%EF%2B%0D%2B%06nVf%86y%D7%9E1%5Cy%FB%05%AEDG%98%87A%9A%07%C5%3E%06%26P%C0%1D%3E%7C%18%AC%C8%DB%DB%5B%EC%0D%B7%C8%E3%A7%C6%9E%0CE%87o1%2Ct%D5%06%8B%83%02%12%84O%86%992D%ABK%80%E5%60%D1%CA%F4%E3%C7%8F%CEe%CB%96%FD%00%09HHH%BC%FB(%A3%B6%06%C4%9Ey%E5)%DC%D9%07%9F%BE%07%AB%F7%DBr%11%2C%06%92%83%80%FF%3B%99%8E%1D%3B%B6%E0%EE%DD%BB_%40%AEX%B3f%8D%90%EA%A9%8D%B9%DC%2F%EE%1F%40%F6%9A%D7%A6%0B%0C%20C6%F9%E8%23%09%FF%DF%08JP%E0%84dmm%ED%C0%CA%CA%BAm%F3%E6%CD%9C%3C%3C%3C%0C%8ENN%BF%AE%DA%C6%1C%FB*%A1%E8%00%92%97%3E%BB%9DA%EC%C61%86%FF%A2%D2%0C%97%1D%12%18%FE%B2%B1%C3%13%12%DCD%90!nnn%EF%3E%7F%FE%0C%8E*%07G%C7%EF%D2%E5%13%BA%B5%A2%B3%EE%7B%85F%FC%05%89o%DE%B2%E5%9F%A7%7F%D0%07%D9%B2%3EH%E0%A0%03tC%FC%FD%FD%9F%03%C5%FE%C3%0C%05%19%0Ct%E5o'''%F4d%890%0Aj%C8%9B%03%07%0E%FCEIEH%1C%90%A10%1D%CC%E8%AEx%FC%F8%F1%03%60l%9C%3Az%F4%A8%F7%EE%DD%BB%3F%0A%0A%0A%FEWTT%84G~ii%E9%A3g%CF%9E%3D%7C%F4%E8%D1%0C%90%5E%AC%B9%11f%A8%95%95U%0233s!0%A3%E9%81%23%ED%FF%FF%0F%40%EA%020%C0%03%0F%1E%3C%08b3%00%00%91%18c%1Afa%24%7B%00%00%00%00IEND%AEB%60%82") center right no-repeat;
			padding-right: 18px;
		}
	]]></>).toString());
	
 	const trackRegex = /[+]?1?\s?([(]?[2-9]\d{2}[)]?[\s-.\/\\]?\d{3}[\s-.\/\\]\d{4}|[2-9]\d{2}[2-9]\d{6})\b/ig;

	function trackUrl(t) {

		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		return 'sttel:'+String(t).replace(/[^0-9+]/ig, "");
	}

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" + "]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            
            cand.parentNode.replaceChild(span, cand);

            trackRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                
                var a = document.createElement("a");
                a.setAttribute("href", trackUrl(match[1]));
                a.setAttribute("class","shoretelapp");
				a.appendChild(document.createTextNode(match[0]));
                
                span.appendChild(a);
				lastLastIndex = trackRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }

})();
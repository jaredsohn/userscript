// ==UserScript==
// @name          Twitter Status On Twitter
// @namespace     natu-n.com
// @description   Twitter Status post on Twitter
// @include       http*://twitter.com/home
// ==/UserScript==

(function(){
    var dsp  = false;
    var yb   = document.evaluate("//div[@class='yellow-box']",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
              null).singleNodeValue || null;
    if (yb) {
        document.styleSheets[document.styleSheets.length - 1].deleteRule(0);
    }
    else {
        yb = document.evaluate("//ul[@class='tabMenu']",
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
    };
    GM_xmlhttpRequest({
        method : "GET",
        url    : "http://status.twitter.com/",
        headers: {
                    'User-Agent'  : 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Content-type': 'application/x-www-form-urlencoded'
                 },
        onload : function(response) {

            var htmlDoc = createHTMLDocumentByString(response.responseText);
            var doc = htmlDoc.ownerDocument ? htmlDoc.ownerDocument : htmlDoc;

            var node  = doc.evaluate(
                        "//div[@class='regular']",
                        htmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null).singleNodeValue;
            var title = doc.evaluate(
                        "./h2/a/child::text()",
                        node, null, XPathResult.STRING_TYPE, null);
            var time = doc.evaluate(
                        "./h2/small/child::text()",
                        node, null, XPathResult.STRING_TYPE, null);
            var text = doc.evaluate(
                       "./p/text()", node, null,
                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
            if (text.snapshotLength == 0) {
                var text = doc.evaluate(
                           "./text()", node, null,
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);
            }
            var disc;
            for (i=0;i<text.snapshotLength;i++) {
                disc += text.snapshotItem(i).textContent;
            };
            title = title.stringValue;
            time  = time.stringValue;
            var df  = document.adoptNode(document.createDocumentFragment());
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(disc));
            df.appendChild(div);
            yb.appendChild(document.createElement("br"));
            yb.appendChild(document.createTextNode(time + " " + title));
            yb.appendChild(df);
            yb.addEventListener("click", dspstatus, false);
            yb.getElementsByTagName("div")[0].style.display = "none";
        }
    })
// utility functions.
function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
   return htmlDoc
}

function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}

function dspstatus() {
    var div = this.getElementsByTagName("div")[0];
    div.style.display = div.style.display == "none" ? "" : "none";
}
})();

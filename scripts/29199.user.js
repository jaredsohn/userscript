// ==UserScript==
// @name          Summize Replie On Twitter
// @namespace     natu-n.com
// @description   Summize Replie post on Twitter
// @include       http*://twitter.com/home
// @include       http*://twitter.com/replies
// @include       http*://twitter.com/direct_messages
// @include       http*://twitter.com/favorites
// @include       http*://twitter.com/public_timeline
// ==/UserScript==

(function(){
    var tab  = document.evaluate("//ul[@id='tabMenu']",
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
              null).singleNodeValue;
    var username  = document.evaluate("//p[@id='me_name']",
                document, null, XPathResult.STRING_TYPE,
               null).stringValue.replace(/^\s+|\s+$/g,"");
    var df = document.adoptNode(document.createDocumentFragment());
    var li = document.createElement("li");
    var a  = document.createElement("a");
    var name = "@" + username + " search";
    a.appendChild(document.createTextNode(name));
    li.appendChild(a);
    li.addEventListener("click", showreplies, false);
    df.appendChild(li);
    tab.appendChild(df);

function showreplies() {
    window.open("http://search.twitter.com/search?q=%40" + username);
}

})();

// ==UserScript==
// @name           FriendFeed quotation
// @namespace      greasemonkey.akinori.org
// @description    Make quotations visual on FriendFeed
// @include        http://friendfeed.com/*
// ==/UserScript==

(function () {
     var ffqNode = function (text) {
        var span = document.createElement('span');
        span.setAttribute('class', 'ffq');
        span.setAttribute('style', 'color: #000000');
        span.appendChild(document.createTextNode(text));
        return span;
     };

     var ffqRun = function () {
         var urls = [
             'http://friendfeed.com/share/bookmarklet'
         ];
         var url_prefixes = [
             'http://delicious.com/',
             'http://b.hatena.ne.jp/',
             'http://www.google.com/reader/'
         ];
         var service_names = [
             'Tumblr',
         ];
         var service_anchors = document.evaluate(
             "//div[@class='body']/div[@class='info']/a[@class='service' and (" + [
                 urls.map(function (s) { return "@href = '" + s + "'"; }).join(' or '),
                 url_prefixes.map(function (s) { return "starts-with(@href, '" + s + "')"; }).join(' or '),
                 "contains('|" + service_names.join("|") + "|', concat('|', text(), '|'))"
             ].join(' or ') + ")]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

         var t0 = new Date().getTime();
         for (var service_anchor, i = 0; (service_anchor = service_anchors.snapshotItem(i)); i++) {
             var text_divs = document.evaluate("../../div[@class='ebody']/div[@class='title']/div[@class='text']", service_anchor, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

             for (var text_div, j = 0; (text_div = text_divs.snapshotItem(j)); j++) {
                 var firstChild = text_div.firstChild;
                 if (firstChild && firstChild.nodeType == 1 &&
                     firstChild.getAttribute('class') == 'ffq')
                     continue;
                 text_div.insertBefore(ffqNode('“'), firstChild);
                 text_div.appendChild(ffqNode('”'));
                 text_div.style.color = "#666666";
                 text_div.style.backgroundColor = "#f8f8f8";
             }
         }
         var t1 = new Date().getTime();
         //alert((t1 - t0) / 1000);
     };

     var realtime = unsafeWindow.realtime;
     realtime.origUpdateStatus = realtime.updateStatus;
     realtime.updateStatus = function () {
         ffqRun();
         realtime.origUpdateStatus();
     };
     
     realtime.updateStatus();
})();

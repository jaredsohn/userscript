// ==UserScript==
// @name           FriendFeed Twitter linkification
// @namespace      greasemonkey.akinori.org
// @description    Linkify Twitter @name's in FriendFeed entries
// @include        http://friendfeed.com/*
// ==/UserScript==

(function () {
     var fftwlinkRun = function () {
         var textNodes = document.evaluate(
             "//div[@class='ebody']/div[@class='title']/div[@class='text' and string-length(substring-after(text(), '@')) >= 1]/text()",
             document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         var re = /(@)([A-Za-z0-9_]+)(?![A-Za-z0-9_.\-])/;
         for (var textNode, i = 0; (textNode = textNodes.snapshotItem(i)); i++) {
             var text = textNode.nodeValue;
             if (!text.match(re))
                 continue;
             var markNode = document.createElement('span');
             var parentNode = textNode.parentNode;
             parentNode.replaceChild(markNode, textNode);
             do {
                 var left = document.createTextNode(RegExp.leftContext + RegExp.$1);
                 var anchor = document.createElement('a');
                 anchor.setAttribute('href', 'http://twitter.com/' + RegExp.$2);
                 //anchor.style.color = '#3333ff';
                 anchor.appendChild(document.createTextNode(RegExp.$2));
                 parentNode.insertBefore(left, markNode);
                 parentNode.insertBefore(anchor, markNode);
                 text = RegExp.rightContext;
             } while (text.match(re));
             if (text.length > 0)
                 parentNode.insertBefore(document.createTextNode(text), markNode);
             parentNode.removeChild(markNode);
         }
     };

     var realtime = unsafeWindow.realtime;
     realtime.origUpdateStatus = realtime.updateStatus;
     realtime.updateStatus = function () {
         fftwlinkRun();
         realtime.origUpdateStatus();
     };
     
     realtime.updateStatus();
})();

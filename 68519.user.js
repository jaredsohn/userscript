// ==UserScript==
// @name           FriendFeed comment dates
// @namespace      greasemonkey.akinori.org
// @description    Show comment dates
// @include        http://friendfeed.com/*
// ==/UserScript==

(function () {
     var ffcdNode = function (text) {
         var span = document.createElement('span');
         span.setAttribute('class', 'ffcd');
         span.style.fontSize = 'smaller';
         span.appendChild(document.createTextNode('- '));
         var date = document.createElement('span');
         date.setAttribute('class', 'date');
         date.appendChild(document.createTextNode(text));
         span.appendChild(date);
         return span;
     };

     var reformat_date = function (now, text) {
         var offset;
         var hoursOnly = false;
         if (text.match(/^([0-9]+) hours? ago$/)) {
             offset = 1000 * 60 * 60 * parseInt(RegExp.$1);
             hoursOnly = true;
         } else if (text.match(/^([0-9]+) minutes? ago$/)) {
             offset = 1000 * 60 * parseInt(RegExp.$1);
         } else if (text.match(/^([0-9]+) seconds? ago$/)) {
             offset = 1000 * parseInt(RegExp.$1);
         } else {
             return text;
         }
         var date = new Date();
         date.setTime(now.getTime() - offset);
         var hours = date.getHours(), ampm;
         if (hours > 12) {
             hours -= 12;
             ampm = 'pm';
         } else {
             ampm = 'am';
         }
         if (hoursOnly) {
             return 'around ' + hours + ' ' + ampm;
         } else {
             var time = hours.toString() + ':';
             var minutes = date.getMinutes();
             if (minutes < 10)
                 time += '0';
             time += minutes;
             return 'at ' + time + ' ' + ampm;
         }
     };

     var ffcdRun = function () {
         var now = new Date();
         var quotes = document.evaluate(
             "//div[contains(concat(' ', @class, ' '), ' comment ')]/div[@class='quote']",
             document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

         for (var quote, i = 0; (quote = quotes.snapshotItem(i)); i++) {
             var content = quote.parentNode.getElementsByClassName('content')[0];
             if (content.getElementsByClassName('ffcd').length > 0)
                 continue;
             content.appendChild(ffcdNode(reformat_date(now, quote.title)));
         }
     };

     var win = this.unsafeWindow || this;
     var realtime = win.realtime;
     if (realtime != null) {
         realtime.origUpdateStatus = realtime.updateStatus;
         realtime.updateStatus = function () {
             ffcdRun();
             realtime.origUpdateStatus();
         };
         realtime.updateStatus();
     } else {
         ffcdRun();
         win.setInterval(ffcdRun, 5 * 1000);
     }
 })();

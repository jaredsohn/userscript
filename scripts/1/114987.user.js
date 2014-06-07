// ==UserScript==
// @name             Anti Url Shorten
// @namespace        summic_aus
// @autor            Summic(hi@summic.com)
// @domain           twitter.com
// @include          http://twitter.com/
// @include          https://twitter.com/
// @include          http://twitter.com/#*
// @include          https://twitter.com/#*
// @match            http://twitter.com/
// @match            https://twitter.com/
// @match            http://twitter.com/#*
// @match            https://twitter.com/#*
// @date             10/11/2011
// @version          1.4
// ==/UserScript==

(function() {
        function doChange(){
            var links = document.getElementsByClassName('twitter-timeline-link');
            for (var i=0; i<links.length; i++) {
                 links[i].href = links[i].getAttribute('title');
　　         }
        }
        //init
        doChange();
        //init again when new tweet arrival
        document.addEventListener('DOMNodeInserted', function(e) {
            doChange();
        });
})();
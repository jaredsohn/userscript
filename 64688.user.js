// ==UserScript==
// @name           Tumblr Dashboard Expand Embed
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    show embed from the beginning
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

(function(unsafeWindow){

    var expandEmbed = function(node) {
        var divs = document.evaluate(
            './/div[@class="dashboard_watch_link"]',
            node,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        for (var i = 0; i < divs.snapshotLength; i++) {
            var id = divs.snapshotItem(i).id.split('_').pop();
            unsafeWindow.Element.hide('watch_link_' + id);
            unsafeWindow.Element.show('watch_video_' + id);
        }
    }

    expandEmbed(document);

    document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(event) {
        var node = event.target;
        expandEmbed(node);
    }, false);

})(this.unsafeWindow || window);

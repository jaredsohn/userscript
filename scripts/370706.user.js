// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include *
// @copyright  2012+, You
// ==/UserScript==

var DEBUG = 0,t=0,i=0,node=0;
        function log(message) {
                if (DEBUG && GM_log) {
                        GM_log(message);
                }
        }

        function x(xpath, parent, type, result) {
                return document.evaluate(xpath, parent || document, null, type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, result);
        }

        function remove(elm) {
        var i=0,t=0;
                if (elm.snapshotItem) {
                        for ( i = 0; i < elm.snapshotLength; i++) {
                                remove(elm.snapshotItem(i));
                        }
                } else if (elm[0]) {
                        while (elm[0]) {
                                remove(elm[0]);
                        }
                } else {
                        elm.parentNode.removeChild(elm);
                }
        }

         t = x('//div[@id="wp"]/div[@style]');
        for (  i = 0; i < t.snapshotLength; i++) {
                 node = t.snapshotItem(i);
                log(node.style.height);
                if (node.style.height === '437px') {
                        node.style.height = 'inherit';
                        break;
                }
        }
    remove(x('//div[@style="padding:0 10px 10px;background:#d0dae5;"]/div[@style="clear:both;margin:0 auto;padding:1px;width:960px;height:91px;background:#fff;border:9px solid #EDEEF0;"] | //div[@id="sitefocus"][@class="focus"] | //span[@id="scrolltop"] | //div[@style="height:171px; padding-top:10px; margin:0 0 10px 0; border-top:1px solid #cdcdcd;"] | //div[@style="width:980px; position:relative; height:171px; padding:10px; background:#d0dae5; margin: 0 auto; overflow:hidden;"] | //div[@class="a_pt"]'));
    remove(x('//div[@class="ad-f"] | //div[contains(@class,"ad ad")] | //div[@class="ad-thin ad-c3"] | //div[@id="gotop"] | //div[@id="ggad"] | //a[@id="ads_15"] | //a[@id="ads_19"]'));
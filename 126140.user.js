// ==UserScript==
// @name   show ting pricing on account page
// @namespace  http://unpythonic.net/greasemonkey/ting
// @description Add pricing information on account page
// @include  https://ting.com/account
// @grant    none
// ==/UserScript==

toInject = function () {
    function formatPrice(cost) {
        if(cost < .1) {
            r = (cost * 100) + "¢";
            r = r.replace(/^0\.25/, "¼");
            r = r.replace(/^0\.5/, "½");
            r = r.replace(/^0\.75/, "¾");
            r = r.replace(/\.25/, "¼");
            r = r.replace(/\.5/, "½");
            r = r.replace(/\.75/, "¾");
            return r;
        }
        return "$" + cost;
    }

    function pokePricing(x, o, t) {
        var els = document.evaluate(
            x + "//*[attribute::class='plan_indicator']/span", document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i=1; i<els.snapshotLength; i++ ) {
            var el = els.snapshotItem(i);
            var b = i + 1;
            var p;
            if(b == o.buckets.length)
                p = formatPrice(o.extra.cost * 1. / o.extra.units) + t;
            else
                p = formatPrice(o.buckets[i].cost);
            el.appendChild(document.createElement('br'));
            el.appendChild(document.createTextNode(p));
        }
        var el = document.evaluate(
            x + "//*[attribute::class='plan_indicator']", document, null,
            XPathResult.ANY_UNORDERED_NODE_TYPE, null);
        if(el.singleNodeValue)
            el.singleNodeValue.setAttribute('style', 'margin-right:-12pt;margin-top:-12pt');
    }

    pokePricing("id('minutesWidget')", window.plans.minutes, "/min");
    pokePricing("id('messagesWidget')", window.plans.messages, "ea");
    pokePricing("id('megabytesWidget')", window.plans.megabytes, "/MB");
}

location.href = 'javascript:(' + toInject.toString() + '())';

// ==UserScript==
// @name        Google Plus Badge
// @namespace   http://fluidapp.com
// @description Sets the badge to the actual number of google plus notifications.
// @include     *plus.google.com*
// @author      Daan Kets http://www.blackbit.be
// ==/UserScript==

(function () {
    if (window.fluid) {
        window.fluid.dockBadge = 'Google Plus';

        console.log('Fluid SSB detected.');

        var updateDockBadge = function () {
            var newBadgeValue = 0;

            var element = document.evaluate('//*[@id="gbi1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element != null) {
                console.log('Badge element found!');
                newBadgeValue = Number(element.innerText);
            } else {
                console.log('Badge element NOT found!');
                newBadgeValue = 0;
            }

            if (newBadgeValue > updateDockBadge.lastBadgeValue) {
                window.fluid.requestUserAttention();
            }
            if (newBadgeValue === 0) {
                window.fluid.dockBadge = '';
            } else {
                window.fluid.dockBadge = newBadgeValue;
            }
            updateDockBadge.lastBadgeValue = newBadgeValue;
        };

        updateDockBadge.lastBadgeValue = 0;

        setTimeout(updateDockBadge, 1000);
        setTimeout(updateDockBadge, 3000);
        setInterval(updateDockBadge, 5000);
    }
})();
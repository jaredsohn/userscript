// ==UserScript==
// @name            New Relic Kiosk Mode
// @namespace       http://www.thingy-ma-jig.co.uk/
// @icon            http://www.thingy-ma-jig.co.uk/sites/thingy-ma-jig.co.uk/files/greasemonkey/NewRelic_inline_small.png
// @description     Force New Relic into Kiosk mode by setting the cookie on page load if '?kiosk' is in the URL
// @include         https://rpm.newrelic.com/*?kiosk
// @updateURL       http://www.thingy-ma-jig.co.uk/sites/thingy-ma-jig.co.uk/files/greasemonkey/newrelic-kioskmode.user.js
// @version         1.0
// ==/UserScript==

unsafeWindow.RPM.kioskMode._setCookie();
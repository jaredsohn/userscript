// ==UserScript==
// @name                ISP广告杀手 ISP Ads Killer
// @namespace           ISP Ads Killer
// @description         专用于对付电信ADSL等ISP广告
// @include             *
// @version             1.0
// ==/UserScript==

self.location != top.location && parent.document.getElementById('fulliframe') && (top.location = self.location);
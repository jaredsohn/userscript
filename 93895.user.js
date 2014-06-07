// ==UserScript==
// @name           Lockerz CSS Fixer
// @namespace      Alex Canty
// @description    A GM script to fix the CSS issues with Lockerz 24/7
// @description    v1.01 adds a CSS text trim for 24/7 items which would push the next row of items over.
// @date           2011-01-01
// @version        1.01
// @include       *lockerz.com*
// ==/UserScript==

GM_addStyle(
//Site Wide Fixes
'#right-col-marketing { display: none; }' +
//myLocker Fixes
'#hallway-column-right { display: none; }' +
'#content-container.locker { padding: 0px 10px 0px 200px; }' +
//Shop Fixes
'#contentSideMarketing { display: none; }' +
'#content { margin: 0px; }' +
//Play Fixes
'#offerPanel { display: none; }' +
'#video-contentContainer.play { padding: 0px; }' +
'#video-contentContainer { padding: 0px; }' +
//24/7 Fixes
'#auction-container h1 { padding: 8px 9px; }' +
'#auction-container h4.red { padding: 6px 0px; }' +
'#auction-container h4.blue { padding: 6px 0px; }' +
'#tutorial { display: none; }' +
'#auction-container { padding: 10px; }' +
'#auction-container .section-container { margin: 10px; }' +
'#auction-container #auctions { margin-bottom: 75px; }' +
'#footer #check-in { display: none; }' +
'#auction-container h3 { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
);
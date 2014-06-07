// ==UserScript==
// @name           Cosp.jp Picture Unhider
// @namespace      cosp.jp save as
// @description    Allows you to view and choose "save as" on pictures found on Cosp.jp
// @include        http://www.cosp.jp/view_photo.aspx*
// @match          http://www.cosp.jp/view_photo.aspx*
// ==/UserScript==

var hider = document.evaluate('//*[@id="baseLayer"]/div[1]/span', document, null, 9, null).singleNodeValue;

hider.removeAttribute('style');

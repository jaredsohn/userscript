// ==UserScript==
// @name           Show me the truth
// @description    Allows you to copy URL of the sites in google search result from context menu
// @author         mooz
// @namespace      http://d.hatena.ne.jp/mooz/
// @homepage       http://d.hatena.ne.jp/mooz/
// @include        http://www.google.com/
// @include        http://www.google.com/search?*
// @include        http://www.google.co.jp/
// @include        http://www.google.co.jp/search?*
// ==/UserScript==

(function () {
     var orwt = unsafeWindow.rwt;

     unsafeWindow.rwt = function (elem) {
         var ev = arguments.callee.caller.arguments[0];

         if (ev.button == 2)
             return;

         return orwt.apply(elem, arguments);
     };
 })();

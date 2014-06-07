// ==UserScript==
// @name           Block Fronter Java applet
// @namespace      http://stiell.org/
// @description    Disable Fronter's Java chat applet (FIM) and its annoying "Java required" message.
// @author         Stian Ellingsen
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @version        0.1.1
// @include        http://fronter.com/*/personalframe.phtml
// @include        https://fronter.com/*/personalframe.phtml
// ==/UserScript==

var p = document.body, s = document.createElement('script');
s.setAttribute("type", "application/javascript");
s.textContent = 'ChatAPI.initialize = function() {};';
p.removeChild(p.appendChild(s));

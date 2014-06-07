// ==UserScript==
// @name           Eurobattle.net Activation Skipper
// @namespace      #avg
// @description    Skips countdown so you can get to activation business.
// @include        http://app.eurobattle.net/activate
// @version        0.1.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
location.href="javascript:_counter=0;$('activate').childNodes[1].submit()";
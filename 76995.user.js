// ==UserScript==
// @name           Mahjanigans Expeditor
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/partyhouse-mahjong.html
// ==/UserScript==

var bonuses = document.evaluate("id('drep')", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

bonuses.innerHTML = "<b\>\<font color='#a10000'\>\<i\> -- Daily Bonuses -- \</i\>\</font>\</b><br><input name='buymjabil' value='H' type='radio'> <b>Zawa Zawa</b> <font style='font-size: 12px;'>(30000 MJXP)<br>+1 Life against Phases<br>(Daily Bonus - lost at Dayroll)</font><br><input name='buymjabil' value='I' type='radio'> <b>Reach</b> <font style='font-size: 12px;'>(30000 MJXP)<br>+20% Worldkai Ranking<br>(Daily Bonus - lost at Dayroll)</font><br>";

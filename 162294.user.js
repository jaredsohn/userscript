// ==UserScript==
// @name           Scrap.tf pricer
// @author         NMGod
// @description    Scrap.tf Item pricer
// @version        1.2
// @include        http://scrap.tf/hats?*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// @updateURL      http://userscripts.org/scripts/source/162294.meta.js
// @installURL     http://userscripts.org/scripts/source/162294.user.js
// @copyright      NMGod
// ==/UserScript==

$(".item").each(function() {
	var price = ((parseInt($(this).data("bptf-cost")) / 9)).toFixed(2);
if(price > 1.4) {$(this).css("border-color", "#ff0000");}
	$(this).append("<span style=\'color:#fff;font-size:9px;background-color:rgba(0,0,0,0.6);padding:2px 4px;position:relative;top:46px;left:-19px;\'>" + price + "</span>");
});
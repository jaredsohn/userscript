// ==UserScript==
// @name           Gaia Vend Clean Sweep
// @namespace      http://www.gaiatools.com/p/`Mods
// @description    Removes absolute stuff and makes it more usefull.
// @include        http://www.gaiaonline.com/marketplace
// @include        http://gaiaonline.com/marketplace
// @include        http://gaiaonline.com/marketplace/
// @include        www.gaiaonline.com/marketplace
// @include        http://www.gaiaonline.com/marketplace/
// @include        www.gaiaonline.com/marketplace/
// ==/UserScript==

var vmc;
vmc = document.getElementById('vendMainContent');


var lefta;
lefta =document.getElementById('moduleLeftColumn');

var righta;
righta= document.getElementById('moduleRightColumn');

var test;
test = document.createElement('div');

test.className = "moduleRight";

test.innerHTML = '<h3 class="moduleHeader moduleHeaderGenericRight">\
<a>Calculator</a></h3>\
<div class="moduleContainer" align="center">\
<embed src="http://www.em-pro.co.yu/files/calc.swf?widget_appId=1dac58db-9cd3-45a8-9507-ee08fcd37887&widget_name=Calculator&widget_token=37b52106cd683811b8adb1136b201d8125a0132200000117dc21ed6e&widget_id=0&widget_timestamp=1201989079281&widget_isAdFriendly=true&widget_width=235&widget_height=260" /> </object>\
</div>\
<div class="moduleFooter moduleRightFooter"></div>';
var snap;
snap = document.getElementById('marketSnapShot');

righta.appendChild(test)

//righta.parentNode.insertBefore(test, lefta.nextSibling)

GM_addStyle("#details_mystore{text-align:center;}\
//#moduleLeftColumn{float:right;}\
//#moduleRightColumn{float:left;}\
#marketplaceGraph{display:none;}\
#marketplaceGraphNav{display:none;}\
#luxury{display:none;}\
#wishlist{display:none;}\
#mobile_alerts{display:none;}\
#youMightLike{display:none;}\
#endingNow .moduleContainer{overflow:hidden;height:170px;}\
#endingNow .moduleContainer:hover{overflow:auto;height:170px;}\
#searchbox_mini{cursor:help;}\
#watchlist{display:none;}")

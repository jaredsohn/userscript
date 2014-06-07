// ==UserScript==
// @name        ZDNet Ad Remover
// @namespace   http://gh4ck3r.github.io
// @description Ad remove for ZDNet Korea
// @include     http://www.zdnet.co.kr/news/news_view.asp?*
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
  var ads=$()
    .add($('div#scrollDiv').parent())
    .add($('div#divMenu'))
    .add($('div#divMenu2'))
    .add($('div.s_top_bn'))
    .add($('div.newsmediaBanner'))
    .add($('div.main_right_Floating_banner'))
    .add($('div.s_r_topnews'))
    .add($('div.s_r_down_bn'))
    .add($('table#tbFadeIn').parent())
    .add($('div#main_right_Floating_banner'))
    .add($('div#soeaFrame2_'))
    .add($('div.s_r_adbr'))
    .add($('div#layer').parent().next())
    .add($('div#lAdContainer'))
    .add($('div#openmatch_ad'))
    .add($('div.down_sns_arae').next())
    .add($('div#soeaLayerLoc_fi'))
    .add($('iframe[src="http://www.tving.com/affiliate/zdnet/zdnet.html"]'))
    .remove();
});


// ==UserScript==
// @name			Mcospace Ads Remover
// @author			Beboo
// @namespace		 moAdsRemover
// @include			http://*.mocospace.com*
// @include			http://mocospace.com*
// @include			https://*.mocospace.com*
// @include			https://mocospace.com*
// @version			0.1
// @datecreated		2009-12-20
// @lastupdated		2009-12-20
// @description		This userscript removes a large amount of known ads from mocospace.com. It doesn't get them all, but it removes a few.
// ==/UserScript==

var moAdsRemover = {};
moAdsRemover.setup = function(){
	if(moAdsRemover.chkForSkipAd()) return;
	var adIDAry = ['adlg', 'google_ads', 'google_ads_aCol', 'google_ads_div_pro_home_middle_auth', 'FLASH_AD', 'google_ads_div_pro-view8', 'google_ads_div_lft_text_link_top_auth','google_ads_div_pro_othr_btm', 'google_ads_iframe_lft_text_link_top', 'google_ads_div_pro_home_lft_auth', 'google_ads_div_im_main_middle', 'google_ads_div_cht_main_btm_nugc', 'google_ads_div_fa_home_right_nugc', 'google_ads_div_pic_ppl_btm', 'google_ads_div_pic_ppl_lft', 'google_ads_div_cht_main_rgt_nugc', 'google_ads_div_pro_othr_btm_nugc', 'google_ads_div_ecrd_main_btm_nugc', 'google_ads_div_ecrd_main_lft_nugc', 'google_ads_div_blg_main_lft', 'google_ads_div_blg_main_btm', 'google_ads_div_frm_main_btm_nugc', 'google_ads_div_frm_main_rgt_nugc', 'clearfloat', 'google_ads_div_buddy_btm', 'google_ads_div_buddy_rgt' ];
	var classNameAry = "";
	var tagNameAry = "";
	var tempEle = "";
	var tempEles = "";
	// remove known ad ids
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) {
			tempEle.parentNode.removeChild(tempEle);
		}
	}
	// remove known ad class names
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
	// remove known ad tag names
	for (var i = 0; i < tagNameAry.length; i++) {
		tempEles = document.getElementsByTagName(tagNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
	tempEles = document.getElementsByTagName( 'iframe' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].src.match( /^http:\/\/ad\./i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
	tempEles = document.getElementsByTagName( 'a' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].href.match( /^http:\/\/www\.mocospace\.com\/adx/i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
};
moAdsRemover.chkForSkipAd=function(){
	var skipImg=document.evaluate('//a/img[@name="skip" and contains(@src,"skip")]',document,null,9,null).singleNodeValue;
	if(skipImg){
		window.location=skipImg.parentNode.href;
		return true;
	}
	return false;
}
// just incase
window.addEventListener( "load", moAdsRemover.setup, false );
// because this seems to remove some lingering ads
window.addEventListener( "load", function(){setTimeout( moAdsRemover.setup, 1100 );}, false );
// usually does the job
moAdsRemover.setup();
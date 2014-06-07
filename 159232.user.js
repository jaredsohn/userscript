// ==UserScript==
// @name        TTnet - AdilKullanim - BilgilendirME
// @namespace   AdilKullanimUygulamasi
// @description Skips annoying Fair-Usage-Policy information page and redirects you to the page you are trying to access
// @include     http://bilgi.ttnet.com.tr/adilkullanimuygulamasi/*
// @include     http://bilgi.ttnet.com.tr/ttnetpratikcozum/*
// @include     http://bilgi.ttnet.com.tr/bir_firsat_daha/*
// @include     http://bilgi.ttnet.com.tr/internetinesahipcik/*
// @include     http://bilgi.ttnet.com.tr/her_eve_bilgisayar/*
// @version     1.2
// @datecreated		2013-02-15
// @lastupdated		2013-12-03
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

if ((typeof window.location.search != "undefined") && (window.location.search != null) && (window.location.search.length > 9)){
	//alert(window.location.search); // for debugging
	myhost=loadPageVar('host');
	mypage=loadPageVar('url');
	if (myhost!=null && myhost.length>1){
		if (!(/\/$/i.test(myhost)) && !(/^\//i.test(mypage))){
			myfullurl=myhost+'/'+mypage;
		} else {
			myfullurl=myhost+mypage;
		}
		if (!(/^https?:/i.test(myfullurl)) && (window.location.protocol!=null)) {
			myfullurl=window.location.protocol+'//'+myfullurl;
		}
		//alert(myfullurl); // for debugging
		window.location.replace(myfullurl);
	}
}

function loadPageVar (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
 
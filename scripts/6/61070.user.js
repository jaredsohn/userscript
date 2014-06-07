// ==UserScript==
// @name			w3schools Ads Remover
// @author			Erik Vold
// @namespace		w3schoolsRemoveAds
// @include			http://*.w3schools.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-01
// @lastupdated		2009-11-01
// @description		This userscripts removes most of the ads from w3schools.com.
// ==/UserScript==

var w3schoolsRemoveAds=function(){
	var adIDAry = ['google_ads_frame1','w3schools_spot1'];
	var tempEle = "";
	var tempEles = "";
	tempEle=document.evaluate("//html/body/center/table/tbody/tr/td/div[1]",document,null,9,null).singleNodeValue;
	if(tempEle) tempEle.parentNode.removeChild(tempEle);
	tempEle=document.evaluate("//html/body/center/table/tbody/tr/td/table[3]/tbody/tr/td[3]",document,null,9,null).singleNodeValue;
	if(tempEle) tempEle.parentNode.removeChild(tempEle);
	tempEle=document.evaluate("//html/body/center/table/tbody/tr/td/table[3]/tbody/tr/td[2]/table",document,null,9,null).singleNodeValue;
	if(tempEle) tempEle.width="100%";
	tempEles=document.evaluate("//html/body/center/table/tbody/tr/td/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table[contains(@class,'chapter')]",document,null,7,null);
	if(tempEles && tempEles.snapshotLength>1){
		tempEle=tempEles.snapshotItem(tempEles.snapshotLength-1);
		while(tempEle.nextSibling){
			tempEle.parentNode.removeChild(tempEle.nextSibling);
		}
	}
	// remove known ad ids
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) {
			tempEle.parentNode.removeChild(tempEle);
		}
	}
	tempEles = document.getElementsByTagName( 'iframe' );
	for (var i = 0; i < tempEles.length; i++) {
		if( tempEles[i].src.match( /(banners|pagead)/i ) ) {
			tempEles[i].parentNode.removeChild(tempEles[i]);
		}
	}
}
w3schoolsRemoveAds();
window.addEventListener( "load", function(){setTimeout( w3schoolsRemoveAds, 1000 );}, false );
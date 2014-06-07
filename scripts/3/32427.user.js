// ==UserScript==
// @name           Ultimate Guitar Ad Remover & Auto-Download & Font Size Changer
// @namespace      ultimateguitaradremoverandautodownload
// @description    Removes ads on UltimateGuitar.com
// @include        http://www.ultimate-guitar.com/tabs/*/*
// @copyright      JoeSimmons & dkhal
// ==/UserScript==

function xp(query, type) {
if(type == null) {return document.evaluate(query, document, null, 6, null);}
else {return document.evaluate(query, document, null, parseInt(type), null);}
}

function main() {

// REMOVES ADS //////////////////////////////////////////////////////////////////////////
var ringtone_ads, google_ads, long_ad, top_long_ads, i, iframes;
if(location.href.indexOf("ultimate-guitar.com/tabs/") !== -1) {
ringtone_ads = xp("//div/img[contains(@src, 'ring_left.gif')]");
google_ads = xp("//script[contains(@src, 'show_ads.js')]");
top_long_ads = xp("//script[contains(@src, 'rmtag3.js')]//script[contains(@src, 'ad.yieldmanager.com')]");
long_ad = xp("//td[@id='tab_content']",9).singleNodeValue;
iframes = xp("//iframe");
// Remove ringtone ads
for(i=ringtone_ads.snapshotLength-1; i>=0; i--) {
if(ringtone_ads.snapshotItem(i)) ringtone_ads.snapshotItem(i).parentNode.style.display = 'none';
}
// Remove top long ads
for(i=top_long_ads.snapshotLength-1; i>=0; i--) {
if(top_long_ads.snapshotItem(i)) top_long_ads.snapshotItem(i).style.display = 'none';
}
// Removes iframes
for(i=iframes.snapshotLength-1; i>=0; i--) {
if(iframes.snapshotItem(i)) iframes.snapshotItem(i).style.display = 'none';
}
// Remove google ads
for(i=google_ads.snapshotLength-1; i>=0; i--) {
if(google_ads.snapshotItem(i)) google_ads.snapshotItem(i).nextSibling.style.display = 'none';
}
// Remove long ad on the left
if(long_ad) long_ad.previousSibling.previousSibling.style.display = 'none';
}
///////////////////////////////////////////////////////////////////////////////////////////

// AUTO-DOWNLOAD //////////////////////////////////////////////////////////////////////////
if(location.href.indexOf("guitar_pro")!==-1 ||
location.href.indexOf("power_tab")!==-1) {
// Initiate download
xp("//form[contains(@action, '/guitar/')]",9).singleNodeValue.submit();
}
///////////////////////////////////////////////////////////////////////////////////////////

// Font Changer ///////////////////////////////////////////////////////////////////////////
page=document.location.href;
if((page.indexOf("_tab")!="-1" || page.indexOf("_crd")!="-1" || page.indexOf("_btab")!="-1") && page.indexOf("power_tab")=="-1"){
xp("//pre",9).singleNodeValue.innerHTML="<font size=3 id=fnt>"+xp("//pre",9).singleNodeValue.innerHTML+"</font>";
setFunc('chngfont', function(to){
xp("//*[@id='fnt']",9).singleNodeValue.size=to;
});
widget="<p align=center><b><u><font size=4>Change font size:</font></b></u> <select onchange=chngfont(this.value)><option value=1>1</option><option value=2>2</option><option value=3 selected=true>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option></select></p>";
xp("//*[@id='tab_content']",9).singleNodeValue.innerHTML=widget+xp("//*[@id='tab_content']",9).singleNodeValue.innerHTML;
}
///////////////////////////////////////////////////////////////////////////////////////////
}

// Run when page is loaded
if (document.addEventListener) {
window.addEventListener("load", main, false);
}
else {
window.document.onLoad = main();
}

// Set a function in unsafe window
function setFunc(func, new_func) {
	unsafeWindow[func] = new_func;
}
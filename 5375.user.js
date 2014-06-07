// ==UserScript==
// @name          www.kyivstar.net bypassing captcha
// @namespace     http://userscripts.org/
// @description   Bypassing CAPTCHA for sending sms on kyivstar.net sites
// @include       http://kyivstar.net/_sms.html*
// @include       http://*.kyivstar.net/_sms.html*
// ==/UserScript==

function antiSpam() {
    var items = document.evaluate( "//input[@id='antispam']", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ); 
    items.snapshotItem( 0 ).value = this.getCookie( "code" );
}
window.addEventListener( 'load', antiSpam, true );

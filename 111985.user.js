// ==UserScript==
// @name          KP
// @namespace     
// @description	  Hopefully deletes gmail search bar
// @author        Me
// @include       http://mail.google.com/mail/*
// @include       https://mail.google.com/mail/*
// @exclude       http://www.google.com/calendar/embed*
// @exclude       https://www.google.com/calendar/embed*
// @version       0.1
// ==/UserScript==

(function() {
var css = ' #vr-header { /* Hide search bar at top */ width:100%; position: fixed !important; z-index: 3; background: rgba(255,255,255,.2) !important; border-bottom: rgba(212,72,54,.2) 5px solid !important; -moz-transition-duration: .2s; -webkit-transition-duration: .2s; } /* Keep #vr-header in place even when browser window is resized */ #calcontent #vr-header       {top: -37px;} #calcontent.eui-s #vr-header {top: -28px;padding-bottom:5px;} #calcontent.eui-t #vr-header {top: -11px;border-bottom-width:3px !important;} #vr-header:hover { /* Display search bar on hover */ top: 30px !important; border-bottom-color: rgba(212,72,54,1) !important; background: white !important; -moz-box-shadow: 4px 4px 6px rgba(0,0,0, 0.6) !important; -webkit-box-shadow: 4px 4px 6px rgba(0,0,0, 0.6) !important; box-shadow: 4px 4px 6px rgba(0,0,0, 0.6) !important; padding-bottom:0 !important; } #vr-nav { /* Move nav bar up slightly */ margin-top: 15px; } #ntowner table { /* Fix position of notification messages */ top:85px; position:fixed!important; } /* Adjust position of notification messages when browser window is resized */ #calcontent.eui-s #ntowner table {top: 78px;} #calcontent.eui-t #ntowner table {top: 64px;} #ntowner .mbox-t1, #ntowner .mbox-t2 { /* Adjust display style of notification messages */ display:none; } #ntowner .mbox-cont { /* Adjust display style of notification messages (continued) */ padding:2px 15px; border-radius:4px; -moz-box-shadow: 0 2px 4px rgba(0,0,0,.2); -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.2); box-shadow: 0 2px 4px rgba(0,0,0,.2); }
if (typeof GM_addStyle != 'undefined') {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != 'undefined') {
	PRO_addStyle(css);
} else if (typeof addStyle != 'undefined') {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName('head');
	if (heads.length > 0) {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}
}
})();


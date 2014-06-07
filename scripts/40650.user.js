// ==UserScript==
// @name                JCGURANGO USER CASH REFRESH...
// @version             1.0
// @author              jcgurango
// @description         this is meant for only me.
// @include             http://9959129743743.usercash.com
// ==/UserScript==

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

timedRefresh(5000);
// ==UserScript==
// @name           Refresh Project Arrow Web Site
// @version        1.1
// @description    Project Arrow Web Site Time Out Problem Solution
// @include        http://indiapostarrow.gov.in/arr_dashboard_upg78/postal/Report/LogDtls_Rpt.aspx

// ==/UserScript==

(function(){
	
	// set seconds until refresh here (int)
	var timeout = 300;
	
	setTimeout('document.getElementById('Button1').click();', timeout * 1000);
	
})();
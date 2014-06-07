// ==UserScript==
// @name           SalesForce Dashboard Automatic Refresh
// @namespace      http://userscripts.org/users/429546
// @description    Automatically refreshes SalesForce dashboards at a defined interval
// @include        https://*.salesforce.com/*
// ==/UserScript==

function refreshDashboard()
{
	if(button=document.evaluate('//input[@id="db_ref_btn"]',document,null,9,null).singleNodeValue)
	{
		unsafeWindow.eval(button.getAttribute("onclick"));
		unsafeWindow.console.log('Refreshed Home Dashboard');
	}
	else
	{
		unsafeWindow.sfdc.dashboardView.doRefresh();
		unsafeWindow.console.log('Refreshed Dashboard');	
	}
	
	unsafeWindow.setTimeout(refreshDashboard,60000)
}


refreshDashboard();


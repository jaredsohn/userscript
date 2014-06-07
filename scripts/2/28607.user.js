// ==UserScript==
// @name           Reporting Services for Firefox
// @namespace      za.co.vwd.igitur
// @include        http://reports.yourserver.com/*
// ==/UserScript==

GM_addStyle('.ParamsGrid { padding: 0px !important; }');
GM_addStyle('.SubmitButtonCell { width: 95px !important; }');
GM_addStyle('#oParamsCell { width: auto !important; }');
GM_addStyle('.WidgetSet { float: left; }');
GM_addStyle('#oReportDiv > table { width: 100% }');
GM_addStyle('#oReportDiv > table > tbody > tr > td:last-child {display: none;}');

var ui_tabStrip = document.getElementById('ui_tabStrip');
if (ui_tabStrip)
{
	var tr = ui_tabStrip.nextSibling.nextSibling;
	if (tr)
	{
		var span = tr.getElementsByTagName('span')[0];
		var table = span.getElementsByTagName('table')[0];
		span.parentNode.insertBefore(table, span);
		span.parentNode.removeChild(span);
	}
}

var oToolbar = document.getElementById('oToolbar');
if (oToolbar)
{
	var td = oToolbar.getElementsByTagName('td')[0];
	var newTD = document.createElement('td');
	newTD.setAttribute('class', 'ToolbarToggleParams ShowHideParametersGroup');
	newTD.innerHTML = '<table id="oToggleParamsTable" onclick="javascript:OnToggleParams()" title="Show or Hide Parameters" onmouseover="className = \'HoverButton\';" onmouseout="className = \'NormalButton\';" class="NormalButton"><tr><td><input type="image" id="oToggleParams" class="ImageWidget" tabindex="4014" /></td></tr></table>';
	td.parentNode.appendChild(newTD);
}
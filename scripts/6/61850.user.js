// ==UserScript==
// @name           Sugar CRM Timesheet Note Textarea
// @namespace      http://userscripts.org/users/Haraldson
// @description    Adds a textarea above the timesheet in Sugar CRM. Might only work for our customized version of the CRM.
// @version        0.0.4
// @include        http://crm.keyteq.no/*
// ==/UserScript==

if(document.getElementById('hourlogarea'))
{
	timeSheet = document.getElementById('hourlogarea');
	var currentContent = timeSheet.innerHTML;
	var textarea = document.createElement('textarea');
	textarea.setAttribute('cols',150);
	textarea.setAttribute('rows',15);
	textares.setAttribute('style','border: 1px solid #BBB; padding: 10px; font-size: 12px; line-height: 18px;');
	
	timeSheet.innerHTML = textarea + currentContent;
}
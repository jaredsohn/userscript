// ==UserScript==
// @name           MSDN C#/VB Only (via jQuery)
// @namespace      msdn
// @description    Hides code that isn't C# or VB on MSDN's low-bandwidth site.
// @include        http://msdn.microsoft.com/*/library/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
	$("div[id*='_contentContainer_']").not("div[id*='CSharp']").not("[id*='VisualBasic']").not("[id*='other']").hide();
});
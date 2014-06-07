// ==UserScript==
// @name           rmls.com listings new window
// @namespace      http://chrisdaniel.net/
// @description    Changes the "open listing" function in quick search to open in a new window, so it will open in a new tab
// @include        http://rmls.com/*
// ==/UserScript==

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function GenReport_Load_FullReport(MLID,strReportID)
{
	document.mainform.RID.value=strReportID;
	document.mainform.ID.value=MLID;
	document.mainform.setAttribute("target", "_blank");
	document.mainform.submit();
}

embedFunction(GenReport_Load_FullReport);


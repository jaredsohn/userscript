// ==UserScript==
// @name           Google Analytics Export Max Rows
// @namespace      http://www.directperformance.com.br
// @description    Allow to Export Up to 50.000 rows in CSV / TSV formats  - By DirectPerformance.com.br
// @include        http://www.google.com/analytics/reporting/*
// @include        https://www.google.com/analytics/reporting/*
// @include        https://adwords.google.com/analytics/reporting/*
// ==/UserScript==
//
unsafeWindow.getLimitParam = function(){return "&limit=50000";}
unsafeWindow.$.Navigator.getLimitParam = unsafeWindow.getLimitParam;
//
var oReportLinks = document.getElementById("export_dropbox_data").getElementsByTagName("a");
var iLink;
for (iLink in oReportLinks){
    oReportLinks[iLink].href+="&limit=50000";
}
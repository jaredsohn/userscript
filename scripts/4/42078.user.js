// ==UserScript==
// @name           LexisNexis Case Overview
// @namespace      http://www.zevils.com/ && http://legalgeekery.com/
// @description    Extract case overview from LexisNexis
// @include        http://www.lexis.com/research/retrieve*
// ==/UserScript==

alert("Running . . . ");

var documents = document.evaluate(
    "//table[@class='citeListAnswer']//tr/td[@class='cvariable' and a/@name]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
var theInfos = '';

for (var i = 0; i < documents.snapshotLength; i++) {
    var doc = documents.snapshotItem(i);

    var caseNameNodes = document.evaluate("./a[@href]/text()",
                                          doc,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null);
    var caseName = caseNameNodes.snapshotItem(0).data;

	var overviewNodes = document.evaluate("./b[. = 'OVERVIEW: ']",
                                          doc,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null);
    var tableColor = "";
    var evenorodd = i % 2;
    if (evenorodd == 0) 
    {
    	tableColor = '"#EEE8AA"';
    }
    else {
    	tableColor = '"#F5F5F5"';
    }
    
	var overview = "";
	if (overviewNodes.snapshotLength > 0) {
		overview = overviewNodes.snapshotItem(0).nextSibling.data;
	}
	else {
	overview = '<i>No overview available.</i>';
	tableColor = '"#B22222"';
	}


	theInfos = theInfos + '<tr><td height="40" bgcolor=' + tableColor + '>' + (i+1) + '.  <b>' + caseName + '</b> -- ' + overview + '</td></tr><p>';
} 
var searchResults = 
	'<html>' +
	'<head>' +
	'<title>Legal Geekery / Zevils Script Results</title>' +
	'</head>' +
	'<body>' +
	'<table border="0" style="vertical-align:middle" bordercolor="" valign="middle" width="75%" align="center" bgcolor=""><tr><td align="center" style="vertical-align:middle" bgcolor="F5F5F5"><h1>Brought to you by <a href="http://legalgeekery.com" border=0 target="_blank"><img style="vertical-align:middle" valign="center" src="http://legalgeekery.com/wp-content/themes/arthemia-premium/images/logo/logo.gif"></a> and <a href="http://zevils.com/" border=0 target="_blank"><img src="http://legalgeekery.com/wp-content/uploads/2009/02/zevils.png" style="vertical-align:middle" valign="center"></a></td></tr></h1>' +
	theInfos +
	'</table>' +
	'</body>' +
	'</html>';
GM_openInTab("data:text/html," + encodeURI(searchResults));

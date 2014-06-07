
//
// ==UserScript==
// @name          Perlmonks AJAX Vote
// @namespace     http://www.perlmonks.org/?node_id=398318
// @description   Allow background voting via AJAX
// @include       http://www.perlmonks.*
// ==/UserScript==

// insert utility js function in head
//
var script = document.createElement("script");
script.language = "Javascript";
script.innerHTML = 
"function xmlhttpPost(strURL, strParam) {\n" +
"    xmlHttpReq = new XMLHttpRequest();\n" +
"    xmlHttpReq.open('POST', strURL, true);\n" +
"    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n" +
"    xmlHttpReq.onreadystatechange = function() {\n" +
"        if (xmlHttpReq.readyState == 4) {\n" +
"            //updatepage(xmlHttpReq.responseText);\n" +
"        }\n" +
"    }\n" +
"    xmlHttpReq.send(strParam);\n" +
"}\n"
;
document.body.insertBefore(script, document.body.firstChild);

// find vote submit button and form node from parent
//
var inputNode = document.evaluate("//input[@name='op' and @value='vote']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var formNode = inputNode.parentNode;

// replace radios with vote links
//
var node_id, vc;
var allinputs = document.evaluate("//input", formNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allinputs.snapshotLength; i++) {
    thisInput = allinputs.snapshotItem(i);;
	//GM_log(thisInput.name + "=" + thisInput.value + "(" + thisInput.type + ")");
	if (thisInput.name == "node_id") {
		node_id = thisInput.value;
	}
	if (thisInput.name == "vc") {
		vc = thisInput.value;
	}	
	if (thisInput.type == "radio") {
		if (thisInput.value == 0) {
			var voteString = thisInput.name;
			var link = document.createElement("div");
			link.class = 'reputation';
			link.id = "pm_" + voteString;
			var postSubmitJS = 'document.getElementById(\'pm_'+voteString+'\').innerHTML=\'<center><font size=1>Refresh to view reputation</font></center>\'';
			link.innerHTML = 
				'vote: ' +
				'<a href="javascript:void(0);" onclick="xmlhttpPost(\'/?\',\'node_id='+node_id+'&vc='+vc+'&op=vote&.cgifields='+voteString+'&'+voteString+'=1\');'+postSubmitJS+'">++</a>' + 
				' ' +
				'<a href="javascript:void(0);" onclick="xmlhttpPost(\'/?\',\'node_id='+node_id+'&vc='+vc+'&op=vote&.cgifields='+voteString+'&'+voteString+'=-1\');'+postSubmitJS+'">--</a>'
			;
			//GM_log(link.innerHTML);
			thisInput.parentNode.insertBefore(link, thisInput);
		}
		thisInput.parentNode.removeChild(thisInput);
	}
}

// remove the TT elements
//
var alltts = document.evaluate("//div[@class='vote']//tt", formNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < alltts.snapshotLength; i++) {
    thisTt = alltts.snapshotItem(i);;
	thisTt.parentNode.removeChild(thisTt);
}

// delete the submit button
//
var submitNode = document.evaluate("//input[@name='sexisgreat']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
submitNode.parentNode.removeChild(submitNode);




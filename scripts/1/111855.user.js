// ==UserScript==
// @name           email mobile alert
// @namespace      mansionhillvets.co.uk
// @description    Pop up alert if no email or mobile found
// @include        /^https://www\.vet-one[0-9]+\.net:18443/[a-z]+/servlet/GemVetOne\?module=GemClientManage&method=doClientOverview&id=[0-9]+$/
// @include        /^http://www\.vet-one[0-9]+\.net:8080/[a-z]+/servlet/GemVetOne\?module=GemClientManage&method=doClientOverview&id=[0-9]+$/
// ==/UserScript==
var query = window.location.search.substring(1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
  var pair = vars[i].split("=");
  if (pair[0] == "id") {
    var id=pair[1];
  }
}

function gettext(path,doc){
	textNodes = doc.evaluate(
		  path,
		  doc,
		  null,
		  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		  null);
	var node = textNodes.snapshotItem(0);
	return node.innerHTML;
}
GM_xmlhttpRequest({
  method: "GET",
  url: window.location.protocol+"//"+location.host+location.pathname+"?module=GemClientManage&method=doClientContact&id="+id,
  onload: function(response) {//create new document
	var dt = document.implementation.createDocumentType("html", 
		      "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
	doc = document.implementation.createDocument('', '', dt),
	html = doc.createElement('html');
	html.innerHTML = response.responseText;
	doc.appendChild(html);
	var em=gettext("/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/table/tbody/tr[6]/td[4]/a",doc);
	try {var mobile=gettext("/html/body/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/table/tbody/tr[3]/td[4]/a[1]",doc);}
	catch(err) {var mobile="";}
	var al="";
	if (em=="")al+="This client has no email address\n";
	if (mobile=="")al+="This client has no mobile number\n";
	if(al!="") {
		al+="Please get details, or enter NO EMAIL/NO MOBILE";
		alert(al);
		//window.location = "https://www.vet-one4.net:18443/mhill/servlet/GemVetOne?module=GemClientManage&method=doClientContact&id="+id;
	}
  }
});



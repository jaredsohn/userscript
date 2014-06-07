// ==UserScript==
// @name           invoice_email_alert
// @namespace      mansionhillvets.co.uk
// @description    pops up email alert if no email/mobile found when paying bill
// @include        /^https://www\.vet-one[0-9]+\.net:18443/[a-z]+/servlet/GemVetOne\?module=GemFinancial&method=doInvoicePayment&id=[0-9]+&cid=[0-9]+$/
// @include        /^http://www\.vet-one[0-9]+\.net:8080/[a-z]+/servlet/GemVetOne\?module=GemFinancial&method=doInvoicePayment&id=[0-9]+&cid=[0-9]+$/
// ==/UserScript==

var query = window.location.search.substring(1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
  var pair = vars[i].split("=");
  if (pair[0] == "cid") {
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
	var ale="";
	if (em==""){al+="This client has no email address\n";ale='"NO EMAIL"';}
	if (mobile==""){al+="This client has no mobile number\n";if(ale!="")ale+="/"; ale+='"NO MOBILE"'}
	if(al!="") {
		al+="Please get details, or enter "+ale;
		alert(al);
		window.location = window.location.protocol+"//"+location.host+location.pathname+"?module=GemClientManage&method=doClientContactEdit&id="+id;
	}
  }
});


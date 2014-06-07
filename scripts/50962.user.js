// ==UserScript==
// @name           Friendstock AutoBoost (N)
// @description    Auto boosting script. For Friend Stock Normal server WORKS ONLY ON PRO or VIP ACCOUNTS (Warning this script is a ALFA version and UNTESTED)
// @version        0.0.1
// @creator        by BrAiNee
// @include        http://apps.facebook.com/friendstock/*
// ==/UserScript==


// SCRIPT STARTS HERE
var minutes      = 120; //set the boost intervall
var emerreload   = 240; //complete page reload
var app_root     = 'http://apps.facebook.com/friendstock/i/';
var home_url     = app_root + "portfolio";

function main()
{
	var hec = document.createElement("span");
	hec.setAttribute("style", "background:yellow; color:red; border:2px solid black;padding:0em; position:fixed; top:50px;left:1px;");
	hec.setAttribute("id", "hec");
	hec.appendChild(document.createTextNode("Friendstock Autoboost 0.01 (N) loaded"));
	document.body.appendChild(hec);
	boostAll();
}
Utilss = new Object();
Utilss.getElementsByXPath = function(expression, node){
  if (!node) { node = document; }
  var result = new Array();
  var xpathResult;
  var nsResolver = node.createNSResolver( node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
  xpathResult = node.evaluate(expression, node, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()){
    result.push(node);
  }
  return result;
}


var boostAll = function boostAll()
{
	var ajaxurl = document.createEvent("HTMLEvents");
	ajaxurl.initEvent("click", true, true);
	var proxyurl = Utilss.getElementsByXPath('//a[contains(@onclick, "boost_all")]');
	if (proxyurl.length > 0)
	{proxyurl[0].dispatchEvent(ajaxurl);}
}
setTimeout('window.open(\"' + home_url + '\", "FSNAB-Window")', minutes*60000);
setTimeout('document.location.reload(true)', emerreload*60000);
window.document.onLoad = main();
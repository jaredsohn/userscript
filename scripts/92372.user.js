// ==UserScript==
// @name           SALMANTRAVELS_quickbook
// @namespace      salmantravels@ymail.com
// @description    By pass myplan page.
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// ==/UserScript==

	var session = getValue('input', 'BV_SessionID');
    var engine = getValue('input', 'BV_EngineID');
	 var url ="https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do?QuickNav=true&submitClicks=1&BV_SessionID=" + session + "&BV_EngineID=" + engine;
	window.open(url,target='_self');

function getValue(tag, name)
{
   return getItem(tag, name).value;
}

function getItem(tag, name)
{
   return getItemWithParent(tag, name, document);
}

function getItemWithParent(tag, name, parent)
{
   var str = ".//" + tag + "[@name='" + name + "']";
   var list = document.evaluate(str, parent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   return list.snapshotItem(0);   
}
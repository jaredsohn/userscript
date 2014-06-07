// ==UserScript==
// @name           Facebook ==> Mass Accept Invites
// @namespace      #avg
// @description    Accepts all your invites
// @include        http://*facebook.tld/reqs.php*
// @version        0.2
// ==/UserScript==
if(confirm("Accept all invites?")) {
var reqs=document.evaluate("//div[@class='buttons']/input[1]",document,null,6,null), i=0;
while(req=reqs.snapshotItem(i++))
	eval("(function(){with(unsafeWindow){"+req.getAttribute("onclick")+"}})()")
}
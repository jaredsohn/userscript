// ==UserScript==
// @id             Subeta - Pick
// @name           Subeta - Pick
// @version        2.1
// @namespace      
// @author         Subeta Bots
// @description    
// @include        http*://*subeta.net*
// @run-at         document-end
// ==/UserScript==

if (document.URL == 'http://subeta.net/explore/vaults.php?vault=bank&act=pick') {
	timedRefresh();
}
var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++)
{
	if(anchors[i].href.indexOf('floating.php?act=claim&xgen=') > -1)
		anchors[i].click();
}
function timedRefresh() 
{
	setTimeout("window.location = 'http://subeta.net/explore/vaults.php?vault=bank&act=pick';", 5000);
}
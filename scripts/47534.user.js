// ==UserScript==
// @name           Sidebar Rewriter
// @namespace      2+2
// @description    Creates a custom sidebar
// @include        http://forumserver.twoplustwo.com/*
// ==/UserScript==
var query = "//div[@class='menusection']/table/tbody/tr/td[@class='alt2']"; 
var result = document.evaluate(query,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 	                          null); var td = result.snapshotItem(0);
td.innerHTML =
'<a class="menu" href="http://forumserver.twoplustwo.com/2p2mod/" target="_blank">MOD CP</a>' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/50/mod-discussion/">ModForum</a>' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/98/post-notifications/">Notifications</a><hr />' 
+
'<form name="form1" method="post" action="http://www.ip2location.com/demo.aspx" target="_blank"><textarea name="ipaddresses" cols="15" rows="5" wrap="ON" style="font-family: Arial, Helvetica, sans-serif;font-size: 9px;color: #333333;text-decoration: none; border: 1px solid #A1D2FE;"></textarea><br><input type="image" src="http://www.ip2location.com/images/searchboxbutton.gif" name="submit" width="76" height="16"></form><hr />'
+
'<a class="menu" href="http://forumserver.twoplustwo.com/55/about-forums/">ATF</a>' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/29/news-views-gossip/">NVG</a><hr />' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/19/high-stakes-pl-nl/">HSNL</a>' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/34/other-other-topics/">OOT</a>' 
+
'<a class="menu" href="http://forumserver.twoplustwo.com/28/internet-poker/">Zoo</a><hr />'
+
td.innerHTML
;
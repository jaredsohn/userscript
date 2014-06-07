// ==UserScript==
// @name           Gmail Auto Fill In
// @namespace      xiang
// @description    Automatically fill in gmail user name
// @include        http://mail.google.com
// @author			Xiang Chen
// @version			0.01
// ==/UserScript==

//------------------------ Config -------------------------------------------
var url = "" + document.location;

var gmail_id = "anthony.xiangchen";

// gmail or orkut or blogger..
if ( url.match ("google") != null )
{
document.getElementById ("Email").value = gmail_id;
document.getElementById ("Passwd").focus();
}
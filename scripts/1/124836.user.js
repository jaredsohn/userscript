// ==UserScript==
// @name           zerohedge fixer
// @namespace      zerohedge.com
// @description    Makes zerohedge.com not butt-ugly, and blocks unwanted user comments
// @include        http://zerohedge.com/*
// @include        http://www.zerohedge.com/*
// @grant          none
// ==/UserScript==

/* Insert users you would like to block in the array below, with names in quotes separated by commas.  Names are case sensitive. */
var blockedUsers = ['RobotTrader','MillionDollarBonus_'];

/* All comments by the listed users as well as any replies to those users will be removed. */

/* Logic for modifying layout */
var primenu = document.getElementById("primarymenu");
document.getElementById("header").innerHTML = '<a style="margin-left:5%" title="ZeroHedge" href="http://www.zerohedge.com"><img src="http://www.zerohedge.com/sites/all/themes/newsflash/logo.png"></a>';
document.getElementById("header").appendChild(primenu);
var fillerdiv = document.createElement("div");
fillerdiv.id = "filler";
document.getElementById("main").appendChild(fillerdiv);
var search = document.getElementById("block-search-0");
if (search === null) {
    search = document.getElementById("block-block-29");
}
if (search !== null) {
fillerdiv.appendChild(search);}
var login = document.getElementById("block-user-0");
if (login != null)
	{fillerdiv.appendChild(login);}
var loggedin = document.getElementById("block-block-10");
if (loggedin != null)
	{fillerdiv.appendChild(loggedin);}
var style_node = document.createElement("style");
style_node.setAttribute("type", "text/css");
style_node.appendChild(document.createTextNode("#filler{display:inline;}#block-user-0{width:200px}#block-search-0{width:200px}#block-block-10{width:300px}#sidebar-left{display:none}#sidebar-right{display:none}#squeeze{margin:0!important}#main{margin:0!important}#block-block-9{display:inline}.js-l1{display:none!important}body{padding:0 0 20px!important}.content-box-1 br{display:none}.content-box-1{margin:15px 0 15px!important"));
document.getElementsByTagName("head")[0].appendChild(style_node);

/* Logic for blocking user comments */
var commentDiv = document.getElementById("comments");
var innerDivs = commentDiv.getElementsByTagName("div");
var divNum = innerDivs.length;
var i=0;
while (i<divNum) {
	var divId = innerDivs[i].id.substring(0,8);
	var comString = "comment-";
	if (divId == comString) {
		var userName = innerDivs[i].getElementsByTagName("a")[1].innerHTML;
		for (var j=0;j<blockedUsers.length;j++) {
			if (userName == blockedUsers[j]) {
				var k=i+1;
				while (innerDivs[k].id.substring(0,8) !== comString) {
					if (innerDivs[k].className == "indented") {
						var nextDiv = innerDivs[k];
						nextDiv.parentNode.removeChild(nextDiv);
						break;
					}
					if (innerDivs[k].className == "box") {
						break;
					}
					k++;
				}
				innerDivs[i].parentNode.removeChild(innerDivs[i]);
				commentDiv = document.getElementById("comments");
				innerDivs = commentDiv.getElementsByTagName("div");
				divNum = innerDivs.length;
				i=i-1;
			}
		}
	}
	i++;
}
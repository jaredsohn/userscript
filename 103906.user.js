// ==UserScript==
// @name           iFanzy TV Channel Numbers
// @namespace      tv.ifanzy.channelnums
// @description    Prints custom channel numbers near the channel logo on iFanzy.tv web site
// @author		   sanilunlu
// @version		   1.0
// @include        http://www.ifanzy.tv/guide/grid
// ==/UserScript==

/* # To generate channel num list automatically, use this script in firebug/other console:

var channelNames = new Array();
for(var i = 0; i < document.body.getElementsBySelector('.channel .channelname').length; i++)
	channelNames[i] = document.body.getElementsBySelector('.channel .channelname')[i].innerHTML.trim().toLowerCase();
channelNames.sort();
for(var i = 0; i < channelNames.length; i++)
	console.log("channelNums['" + channelNames[i] + "'] = '';");

// Example:
var channelNums = new Array();
channelNums['CNN'] = '25';
...

*/

var color = "color:blue";
var channelNums = new Array();
// ex. channelNums['CNN'] = '25';
alert('Please edit the script and input your channel numbers!');

setInterval(function() {
	if(document.getElementsByClassName('channelnum').length > 0)
		return;
	var channelNames = document.getElementsByClassName('channelname');
	for(var i = 0; i < channelNames.length; i++) {
		var chnum = channelNums[channelNames[i].innerHTML.trim().toLowerCase()];
		if(chnum != "" && chnum != undefined) {
			var s = document.createElement('span');
			s.innerHTML=chnum;
			s.setAttribute("style", "float:left;text-align:center;margin-left:-50px;width:20px;padding-top:3px;" + color + ";position:absolute;");
			s.setAttribute("class", "channel channelnum");
			channelNames[i].parentNode.appendChild(s);
		}
	}
}, 1500);

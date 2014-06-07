// ==UserScript==
// @name           Leakforums.org - Scammer Warnnig
// @namespace      text/scammerwarn
// @description    Warns users of potential scammers on LeakForums.org
// @author         Spafic/Text
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/showthread.php?*
// @version        2.0.0-beta
// @downloadURL    https://userscripts.org/scripts/source/.user.js
// @updateURL      https://userscripts.org/scripts/source/.meta.js
// ==/UserScript==

var scammerList,postAuthor_info,postAuthor_URL,myDiv;
var i,j;

// Get list of scammers and store in fullScammers variable

GM_xmlhttpRequest({
	method: "GET",
	url: "http://dl.dropboxusercontent.com/s/md2zhmr7cdldpmh/list.txt",
	onload: function(response) {
		fullScammers = response.responseText;
		
		scammerArray = fullScammers.split(/\r\n/gim);
		UIDList = new Array();
		threadList = new Array();
		
		// Get UIDList and threadListfrom scammerArray
		for(i=0;i<scammerArray.length;i++) {
			UIDList[i] = scammerArray[i].split(/=>/gim)[0];
			threadList[i] = scammerArray[i].split(/=>/gim)[1].split(/,/gim);
		}
		
		DoYourWork();
	}
});
/*

fullScammers = "1368625=>2853278,285102\n1246777=>2853278,1029342";
scammerArray = fullScammers.split(/\n/gim);
UIDList = new Array();
threadList = new Array();

// Get UIDList and threadListfrom scammerArray
for(i=0;i<scammerArray.length;i++) {
	UIDList[i] = scammerArray[i].split(/=>/gim)[0];
	threadList[i] = scammerArray[i].split(/=>/gim)[1].split(/,/gim);
}

DoYourWork();
*/
function DoYourWork() {
	postAuthor_info = document.getElementsByClassName("post_author");
	for(i=0;i<postAuthor_info.length;i++) {
		postAuthor_URL = postAuthor_info[i].getElementsByClassName("largetext")[0].getElementsByTagName("a")[0].getAttribute("href").toString() + "asdf";
		
		for(j=0;j<UIDList.length;j++) {
			if(postAuthor_URL.indexOf("&uid=" + UIDList[j] + "asdf")!=-1) {
				postAuthor_info[i].getElementsByTagName("span")[1].style.color = "red";
				
				newDiv = document.createElement("div");
				newDiv.setAttribute("style","display:none;position:absolute;border:5px solid black;background-color:#333;padding:10px;");
				newDiv.setAttribute("id","scammer_" + i + "_information");
				newDiv.innerHTML = "";
				for(k=0;k<threadList[j].length;k++) {
					newDiv.innerHTML = newDiv.innerHTML + '<a href="http://www.leakforums.org/showthread.php?tid=' + threadList[j][k] + '">http://www.leakforums.org/showthread.php?tid=' + threadList[j][k] + '</a><br />';
				}
				
				variableClicker = document.createElement("a");
				variableClicker.innerHTML = "Click here to open the information popup";
				variableClicker.setAttribute("forscammerscript",i);
				variableClicker.setAttribute("href","#");
				variableClicker.setAttribute("onclick","return false");
				variableClicker.setAttribute("class","scammer");
				
				postAuthor_info[i].getElementsByClassName("smalltext")[0].innerHTML = "Reported Scammer!<br />";
				postAuthor_info[i].getElementsByClassName("smalltext")[0].appendChild(variableClicker);
				postAuthor_info[i].getElementsByClassName("smalltext")[0].innerHTML += "<br />";
				postAuthor_info[i].getElementsByClassName("smalltext")[0].appendChild(newDiv);
			}
		}
	}
	
	scammers = document.getElementsByClassName("scammer");
	for(i=0;i<scammers.length;i++) {
		scammers[i].addEventListener("click",function() {
			if(document.getElementById("scammer_" + this.getAttribute("forscammerscript") + "_information").style.display == "none") {
				this.innerHTML = "Click here to close the information popup";
				document.getElementById("scammer_" + this.getAttribute("forscammerscript") + "_information").style.display = "block";
			} else {
				this.innerHTML = "Click here to open the information popup";
				document.getElementById("scammer_" + this.getAttribute("forscammerscript") + "_information").style.display = "none";
			}
		},false);
	}
}
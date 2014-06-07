// ==UserScript==
// @name            SlaveHacker2
// @description    Improved Greasemonkey version of SlaveHacker
// @include        http://www.slavehack.com/*
// @version 1.0
// ==/UserScript==

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    See <http://www.gnu.org/licenses/> for a copy of the GNU General Public License
  
    Copyright 2011 Robby Madruga
*/

//Initializes internal variables
function initializeVars() {
	if(!GM_getValue("NPCs")) {
		GM_setValue("NPCs", "1.1.1.1,127.0.0.1,2.2.2.2,243.12.1.213,129.94.140.59,246.185.15.208,255.0.255.0,124.191.123.222,136.208.245.59,56.195.92.143,251.153.56.29,57.195.92.143,135.132.154.124,184.182.224.6,121.142.212.124,19.84.229.163,237.139.128.181,244.2.133.183,102.244.136.190,254.151.123.253,13.232.147.158,94.87.45.87,0.156.244.201,242.133.164.81,33.53.184.126,162.51.129.169,109.198.68.77,71.136.63.190,132.21.163.202,96.128.231.240,7.5.7.89,16.1.233.10,42.7.239.13,234.86.95.202,48.121.47.116,142.229.199.91,249.11.136.34,120.92.153.170,214.172.152.188,119.209.47.58,63.203.160.21,222.65.67.51,3.131.143.254,17.18.111.145,149.201.199.233,229.31.45.38,129.141.138.119,91.126.151.61,9.195.12.154,112.43.79.120,101.133.111.159,206.146.24.93,203.103.59.47,189.23.124.7,19.188.239.174,255.33.234.33,193.198.230.16,105.133.13.108,152.158.115.148,81.73.86.255,138.76.73.28,159.229.197.164,243.100.166.15,66.241.98.226,252.81.175.188,83.230.105.121,247.163.249.66,29.132.103.224,91.112.13.12,73.137.85.78,227.62.179.117,173.122.175.88,94.192.98.31,106.71.208.142,61.169.234.43,144.92.41.3,14.233.123.137,208.193.85.97,207.118.73.177,160.88.2.49,114.198.119.21,2.158.124.111,12.69.38.5,118.41.15.227,96.154.255.246,80.77.237.134,15.35.62.224,238.176.102.3,101.52.91.79,215.119.128.38,250.3.107.51,49.218.89.175,250.117.216.18,187.161.10.38,225.99.248.46,69.144.46.76,104.248.113.147,85.148.218.87,68.152.119.206,220.204.61.152,113.113.217.204,64.223.252.221,247.140.133.168,67.247.218.237,121.15.223.76,34.170.166.53,58.231.184.217,140.243.173.181,189.63.250.247,82.82.41.237,172.0.47.201,236.155.42.129,241.105.225.118,200.60.183.92,51.176.101.166,239.152.83.74,110.38.135.166,127.115.164.138,213.104.0.229,171.3.251.17,26.223.183.134,137.0.218.12,254.206.104.178,103.13.127.196,209.222.239.129,249.85.70.54,96.37.77.96,160.7.44.55,188.40.32.42,21.26.30.22,115.253.239.244,21.18.35.25,144.25.116.39,120.101.174.253,173.22.203.196,11.125.146.145,170.4.54.69,45.68.137.16,135.99.182.134,9.224.178.70,152.11.194.106,81.58.195.224,168.153.111.194,165.57.86.101,141.56.234.45,5.81.186.49,56.105.200.131,54.27.17.137,165.92.38.152,160.204.113.34,58.145.5.177,6.155.226.111,177.240.29.129,6.100.142.172,232.82.137.4,164.221.47.125,160.125.181.166,85.71.100.215,222.29.243.43,135.154.119.144,148.90.86.220,174.58.255.90,169.244.20.135,34.72.193.206,252.115.199.40,221.83.199.24,132.195.23.9,35.200.115.198,254.201.59.25,214.192.44.89,19.39.19.45,67.81.5.102,86.91.172.8,78.95.108.51,25.23.182.61,64.48.99.10,165.111.158.1");
	}
	if (!GM_getValue("Replace")) {
		GM_setValue("Replace", false)
	}
	if (!GM_getValue("CleanBanks")) {
		GM_setValue("CleanBanks", false)
	}
	if (!GM_getValue("CleanKnownIPs")) {
		GM_setValue("CleanKnownIPs", false)
	}
	if (!GM_getValue("CleanSlaves")) {
		GM_setValue("CleanSlaves", false)
	}
	if (!GM_getValue("Process")) {
		GM_setValue("Process", 0)
	}
	if (!GM_getValue("CapturedIPs")) {
		GM_setValue("CapturedIPs", "")
	}
	if (!GM_getValue("CapturedBanks")) {
		GM_setValue("CapturedBanks", "")
	}
	if (!GM_getValue("LostSlaves")) {
		GM_setValue("LostSlaves", "")
	}
	if (!GM_getValue("Slaves")) {
		GM_setValue("Slaves", "")
	}
}

//Checks whether the page is in an iframe or not
function isIframe() {
	if(parent.document != document){
		return true;
	} else {
		return false;
	}
}

//Returns true if we're hit with the bot check
function isbotCheck() {
	if(document.body.innerHTML.match("workimage.php")) {
		return true;
	} else {
		return false;
	}
}

//Is a log present?
function isLog() {
	if(document.getElementById("editlog")) {
		return true;
	} else {
		return false;
	}
}

//Is it our log or someone elses?
function isLogHome() {
	if(window.location.href.match("page=logs")) {
		return true;
	} else {
		return false;
	}
}

//On slave page?
function isSlave() {
	if(window.location.href == "http://www.slavehack.com/index2.php?page=slaves") {
		return true;
	} else {
		return false;
	}
}

//On slavehacker page?
function isSlavehacker() {
	if(window.location.href.match("page=slavehacker")) {
		return true;
	} else {
		return false;
	}
}

//Are we cracking?
function isCracking() {
	if(window.location.href.match("var3=crack")) {
		return true;
	} else {
		return false;
	}
}

//Are we auto page?
function isAuto() {
	if(window.location.href.match("page=auto")) {
		return true;
	} else {
		return false;
	}
}

//Crack exists?
function crackExist() {
	if(document.getElementsByClassName("internet")[1].innerHTML=="") {
		return false;
	} else {
		return true;
	}
}

//Creates an iframe with an onload manager function
function createIframe(id, src, manager) {
	var iframe = document.createElement("iframe");
	var frameid = document.createAttribute("id");
	var framesrc = document.createAttribute("src");
	var framewidth = document.createAttribute("width");
	var frameheight = document.createAttribute("height");
	var frameborder = document.createAttribute("frameborder");
	var childlength = document.body.childNodes.length;
	var lastelement = document.body.childNodes[childlength-1];
	
	frameid.nodeValue = id;
	framesrc.nodeValue = src;
	framewidth.nodeValue = 0;
	frameheight.nodeValue = 0;
	frameborder.nodeValue = 0;

	iframe.setAttributeNode(frameid);
	iframe.setAttributeNode(framesrc);
	//iframe.setAttributeNode(framewidth);
	//iframe.setAttributeNode(frameheight);
	//iframe.setAttributeNode(frameborder);
	if(manager) {
		iframe.addEventListener("load", manager, true);
	}
	lastelement.parentNode.insertBefore(iframe, lastelement.nextSibling);
}

//Removes iframe from page
function removeIframe(id) {
	rIframe = document.getElementById(id);
	rIframe.parent.removeElement(rIframe)
}

//Checks if we're using the black small theme, if not then change it
function checkAndUpdateTheme() {
	if(document.getElementsByTagName("link")[0].href != "http://www.slavehack.com/templates/static.css") {
		window.location.href="http://www.slavehack.com/index2.php?page=options&var2=theme&theme=2";
	}
}

//Creates a bot bypassing iframe
function bypassBot() {
	document.body.innerHTML = document.body.innerHTML.replace("Sorry, we've got to ask you to repeat the numbers displayed in the image below to validate you're a human being ;)", "Bypassing bot... Please wait.")
	document.getElementsByName("nummer")[0].disabled = false;
	createIframe("botcheck", "http://www.slavehack.com/includes2/includes/botcheck.php", function() {
		var botiframe = document.getElementById("botcheck").contentWindow;
		if(botiframe.window.location.href=="http://www.slavehack.com/includes2/includes/botcheck.php") {
			var tmp = String(botiframe.document.getElementsByTagName('script')[0].innerHTML);
			var divider = tmp.substring(tmp.indexOf('style.top.replace')+31, tmp.indexOf('style.top.replace')+33).replace(')', '');
			var xball = parseInt(botiframe.document.getElementById('ball').style.left.replace('px', ''));
			var yball = parseInt(botiframe.document.getElementById('ball').style.top.replace('px', ''));
			var xbox = parseInt(botiframe.document.getElementById('box').style.left.replace('px', ''));
			var ybox = parseInt(botiframe.document.getElementById('box').style.top.replace('px', ''));
			var dx = (xbox - xball)/divider;
			var dy = (ybox - yball)/divider;
			var code = "";
			if(dx>0) {
				while(dx>0) {
					code = code + "r";
					dx = dx - 1;
				}
			}
			if(dx<0) {
				while(dx<0) {
					code = code + "l";
					dx = dx + 1;
				}
			}
			if(dy>0) {
				while(dy>0) {
					code = code + "d";
					dy = dy - 1;
				}
			}
			if(dy<0) {
				while(dy<0) {
					code = code + "u";
					dy = dy + 1;
				}
			}
			alert(code);
			botiframe.window.location.href = "http://www.slavehack.com/includes2/includes/botcheck.php?botcheck=" + code;
		} else {
			if(document.body.innerHTML.match("workimage.php")) {
				window.location.href = window.location.href;
			}
		}
	});
}

 //Adds links to navbar
function modifyNavbar() {
	var navbar = document.getElementsByTagName("lu")[0];
	var newlink;
	
	newlink = document.createElement("li");
	newlink.innerHTML = " <a href=index2.php?page=slavehacker>Slavehacker</a><br />";
	navbar.insertBefore(newlink, navbar.getElementsByTagName("li")[1].nextSibling);
	
	newlink = document.createElement("li");
	newlink.innerHTML = " <a href=index2.php?page=controlpanel>Controlpanel</a><br />";
	navbar.insertBefore(newlink, navbar.getElementsByTagName("li")[1].nextSibling);
	
	newlink = document.createElement("li");
	newlink.innerHTML = " <a href=index2.php?page=auto>AutoBot</a><br />";
	navbar.insertBefore(newlink, navbar.getElementsByTagName("li")[3].nextSibling);
	
	for(var i = 0; i < navbar.getElementsByTagName("a").length; i++) {
		var link = navbar.getElementsByTagName("a")[i];
		var edit = document.createElement("span");
		switch(link.innerHTML) {
			case "Software":
				edit.innerHTML = "<br /><li> <a href='index2.php?page=softwareext'>Ext HDD</a>";
				link.innerHTML = "Main HDD";
				link.parentNode.insertBefore(edit, link.nextSibling);
				break;
			case "Logs":
				edit.innerHTML = " - <a href='index2.php?page=logs&editlog=1'>Clear</a>";
				link.parentNode.insertBefore(edit, link.nextSibling);
				break;
			case "Internet":
				edit.innerHTML=" - <a href='index2.php?page=internet&var3=files'>Files</a>";
				link.parentNode.insertBefore(edit, link.nextSibling);
				break;
			case "Slaves":
				edit.innerHTML=" - <a href='index2.php?page=slaves&slave=all&collect=1'>Collect</a>";
				link.parentNode.insertBefore(edit, link.nextSibling);
				break;
		}
	}
}

//Get IP of current connection
function getConnectedIP() {
	return String(document.body.innerHTML.match(/are\slogged\sin\sto\s\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)).match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
}

//Parses a string and returns bank info
function parseBankInfo(string) {
	var t1 = string.match(/\d{6}\sat\s\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]/g);
	var t2 = string.match(/\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]\slogged\sinto\sbank\saccount\s\d{6}/g);
	if(!t1 && !t2) {
		return null;
	}
	if(t2) {
		var arr = new Array();
		for(var i=0; i<t2.length; i++) {
			arr[arr.length] = t2[i].match(/\d{6}/)+" at ["+getConnectedIP()+"]";
		}
		return arr.concat(t1);
	}
	return t1;
}

//Removes duplicates from array
function removeDuplicateElements(arrayName) {
	var newArray = new Array();
	label:for(var i=0; i<arrayName.length; i++) {
		if(!arrayName[i]) {
			continue label;
		}
		for(var j=0; j<newArray.length; j++) {
			if(newArray[j] == arrayName[i]) {
				continue label;
			}
		}
		newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}

//Removes NPC IPs from array
function removeNPCs(arrayName) {
	var newArray = new Array();
	var npcstring = GM_getValue("NPCs");
	for(var i=0; i<arrayName.length; i++) {
		if(!npcstring.match(arrayName[i])) {
			newArray[newArray.length] = arrayName[i];
		}
	}
	return newArray;
}

//Removes slave IPs from array
function removeSlaves(arrayName) {
	var newArray = new Array();
	var slavestring = GM_getValue("Slaves");
	for(var i=0; i<arrayName.length; i++) {
		if(!slavestring.match(arrayName[i])) {
			newArray[newArray.length] = arrayName[i];
		}
	}
	return newArray;
}

//Clean capture list
function cleanList(arrayName) {
	var array = removeSlaves(arrayName);
	array = removeNPCs(array);
	array = removeDuplicateElements(array);

	return array;
}

//Get element by tag name with specific inner html
function getElementByInnerHTML(tagname, html) {
	var elements = document.getElementsByTagName(tagname);
	for(var i=0; i<elements.length; i++) {
		if(elements[i].innerHTML.match(html)) {
			return elements[i];
		}
	}
}

//Parses a string and returns an IP address array
function parseIP(str) {
	return str.match(/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/g);
}

//Get own IP from current page
function getMyIP() {
	return parseIP(String(getElementByInnerHTML("center", "Computer").innerHTML))[0];
}

//Records lost slaves
function getRemovedSlaves() {
	if(document.body.innerHTML.match("was removed from your list")) {
		var iplist = document.body.innerHTML.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?=\swas)/g);
		if(!GM_getValue("LostSlaves")) {
			GM_setValue("LostSlaves", String(iplist));
		} else {
			var ips = GM_getValue("LostSlaves").split(",");
			GM_setValue("LostSlaves", String(removeDuplicateElements(ips.concat(iplist))));
		}
	}
}

//Parses log
function parseLog() {
	var log = document.getElementById("editlog").value;
	var myIP = getMyIP();
	var found = 0;
	if(log.match(myIP)) {
		while(log.match(myIP)) {
			log = log.replace(myIP, "localhost");
			found++;
		}
		document.getElementById("editlog").value = log;
	}
	if(parseIP(log)) {
		if(!GM_getValue("CapturedIPs")) {
			GM_setValue("CapturedIPs", String(parseIP(log)));
		} else {
			var ips = GM_getValue("CapturedIPs").split(",");
			var logips = parseIP(log);
			GM_setValue("CapturedIPs", String(cleanList(ips.concat(logips))));
		}
	}
	if(parseBankInfo(log)) {
		if(!GM_getValue("CapturedBanks")) {
			GM_setValue("CapturedBanks", String(parseBankInfo(log)));
		} else {
			var banks = GM_getValue("CapturedBanks").split(",");
			var logbanks = parseBankInfo(log);
			if(logbanks) {
				GM_setValue("CapturedBanks", String(removeDuplicateElements(banks.concat(logbanks))));
			}
		}
	}
	if(found) {
		document.forms[1].submit();
	}
}

//Gets a list of slaves from slave page
function parseSlaves() {
	var table = document.getElementsByTagName("table")[3];
	var tr = table.getElementsByTagName("tr");
	var slist = new Array();
	for(var i=1; i<tr.length; i++) {
		var ip = tr[i].childNodes[0].childNodes[0].innerHTML;
		slist[slist.length] = ip;
	}
	GM_setValue("Slaves", String(slist));
}

//Creates a log camper iframe
function createLogCamper() {
	document.body.innerHTML = document.body.innerHTML.replace("<h1>Log file</h1>", "<h1>Log file</h1> (Camping)");
	createIframe("logcamper", "http://www.slavehack.com/index2.php?page=internet&var3=log", function() {
		setTimeout(function() {
			var lciframe = document.getElementById("logcamper");
			if(lciframe.contentWindow.document.getElementById("editlog")) {
				lciframe.src = "http://www.slavehack.com/index2.php?page=internet&var3=log";
			}
		}, 2000);
	});
}

//Update slavehacker page
function updateSlavehacker() {
	var capturedips = GM_getValue("CapturedIPs").split(",");
	var capturedbanks = GM_getValue("CapturedBanks").split(",");
	var lostslaves = GM_getValue("LostSlaves").split(",");
	var tmp = "<table border=1 align=left><tr><th>Catpured IP's</th></tr>";
	for(var i=0; i<capturedips.length; i++) {
		tmp = tmp+"<tr><td><a href=\"http://www.slavehack.com/index2.php?page=internet&var2="+capturedips[i]+"&var3=crack\">"+capturedips[i]+"</a></td></tr>";
	}
	tmp = tmp+"</table><table border=1 align=left><tr><th>Catpured Banks</th></tr>";
	for(var i=0; i<capturedbanks.length; i++) {
		tmp = tmp+"<tr><td>"+capturedbanks[i]+"</td></tr>";
	}
	tmp = tmp+"</table><table border=1 align=left><tr><th>Lost Slaves</th></tr>";
	for(var i=0; i<lostslaves.length; i++) {
		tmp = tmp+"<tr><td>"+lostslaves[i]+"</td></tr>";
	}
	tmp = tmp+"</table>";
	document.body.innerHTML = document.body.innerHTML.replace("Page not found!", tmp);
}

//Remove an ip from our capture list
function removeIP(ip) {
	var capturedips = GM_getValue("CapturedIPs").split(",");
	for(var i=0; i<capturedips.length; i++) {
		if(capturedips[i] == ip) {
			capturedips.splice(i, 1);
			GM_setValue("CapturedIPs", String(capturedips));
			return;
		}
	}
}

/*Manage process
function manageProcess() {
	switch(GM_getValue("Process")) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
	}
}*/

//Run auto stuff
function runAuto() {
	document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "<textarea id=\"status\" rows=\"7\" cols=\"50\" disabled=\"disabled\" style=\"resize:none;background-color:#3E3535;color:	#736F6E;\"></textarea>");
	var status = document.getElementById("status");
	status.innerHTML += "Log defender active.\n";
	status.scrollTop = status.scrollHeight;
	createIframe("defender", "http://www.slavehack.com/index2.php?page=logs", function() {
		setTimeout(function() {
			document.getElementById("defender").src = "http://www.slavehack.com/index2.php?page=logs";
		}, 2000);
	});
}

//Main
if(!isIframe()) {
	modifyNavbar();
	if(!isbotCheck()) {
		checkAndUpdateTheme();
		initializeVars();
		if(isLog() && !isLogHome()) {
			parseLog();
			createLogCamper();
		} else if(isLog() && isLogHome()) {
			//Home log camper
		}
		if(isSlave()) {
			parseSlaves();
			getRemovedSlaves();
		}
		if(isSlavehacker()) {
			updateSlavehacker();
		}
		if(isCracking()) {
			if(!crackExist()) {
				removeIP(window.location.href.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/));
			}
		}
		if(isAuto()) {
			runAuto();
		}
	} else {
		bypassBot();
	}
} else {
	//IFrame controllers
	if(window.frameElement.id == "logcamper") {
		if(isbotCheck()) {
			bypassBot();
		} else {
			parseLog();
		}
	}
	if(window.frameElement.id == "defender") {
		if(isbotCheck()) {
			bypassBot();
		} else {
			var status = parent.document.getElementById("status");
			status.innerHTML += "Running...\n";
			status.scrollTop = status.scrollHeight;
		}
	}
}
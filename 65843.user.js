// ==UserScript==
// @name            SlaveHacker
// @description    Greasemonkey version of SlaveHacker
// @include        http://www.slavehack.com/*    
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version 2.0
// @history 2.0 Began construction of virus installer.
// @history 1.9 Made it so the the script calulated the euros/hour for both viruses.
// @history 1.9 Added an automatic updater.
// @history 1.9 Changed the log camper so you can do other things while camping.
// @history 1.9 Fixed small problem with hidden virus detector. 
// @history 1.8 Fixed some small stuff.
// @history 1.7 When you collect cash from slaves the amount you get per hour is calculated and displayed on the slaves page.
// @history 1.6 Idea: Process finisher. Basically finishes all your processes in your preferred order.
// @history 1.6 Bad IP's automatically removed from IP list when slavehacker page viewed. 
// @history 1.5 Added a feature that shows your software level next to the levels of the computer you are connected to.
// @history 1.4 Being worked on: Adding notes to collected slaves.
// @history 1.4 Idea: Function that checks all the collected IP's existence via iframe. 
// @history 1.4 Cleaned up the SlaveHacker page. 
// @history 1.4 Links added to the navbar: Clear log, Ext HDD, Internet Files. 
// @history 1.3 I added a hidden viruses detector which checks if there is something hidden on your hard-drive.
// @history 1.2 Added the ability to delete separate IP's instead of the whole list.
// @history 1.2 Fixed log camper.
// @history 1.1 I added a log camper, but there is a problem with the timer.
// @history 1.0 Added Bot Bypasser.
// @history 1.0 I fixed some silly bug I missed before release and I added a view and crack link to each IP in the IP list.
// @history 1.0 I added some code to remove the IP's in your captured IP list that are already in your slave list. Requires that you view the slaves page of course.
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
  
    Copyright 2010 Robby Madruga
*/
var currentVersion = 2.0;
// Initialize the NPCs value if it doesn't exist yet.
if (!GM_getValue("NPCs")) {
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

// If there's a botcheck store the current page into a variable for later useage
if(document.getElementsByTagName('h1')[0] && document.getElementsByTagName('h1')[0].innerHTML=="Bot check") {
	GM_deleteValue("Site");
	GM_setValue("Site", String(window.location.href));
	window.location.href="http://www.slavehack.com/includes2/includes/botcheck.php";
}
// If not, update navigation menu
else {
	
	if(document.getElementsByTagName('lu')[0]) {
		var list, newElement;
		list = document.getElementsByTagName('lu')[0].getElementsByTagName('li')[0];

		if (list) {
			newElement = document.createElement('li');
			newElement.innerHTML = " <a href=index2.php?page=slavehacker>Slavehacker</a><br />";
			newElement2 = document.createElement('li');
			newElement2.innerHTML = " <a href=index2.php?page=controlpanel>Controlpanel</a><br />";
			list.parentNode.insertBefore(newElement, list.nextSibling);
			list.parentNode.insertBefore(newElement2, list.nextSibling);
		}
	}
//Adds other stuff to navigation menu 
       for(var i = 0; i<document.getElementsByTagName("a").length-1; i++)
        {
                var name = document.getElementsByTagName("a")[i]
                if(name.innerHTML=="Software")
                {
                        name.innerHTML = "Main HDD";
                        var space = document.createElement("span");
                        space.innerHTML="<br /><li> <a href='index2.php?page=softwareext'>Ext HDD</a>";
                        name.parentNode.insertBefore(space, name.nextSibling);
                }
                if(name.innerHTML=="Logs")
                {
                        var space = document.createElement("span");
                        space.innerHTML=" - <a href='index2.php?page=logs&var3=&aktie=&var2=&editlog=1'>Clear</a>";
                        name.parentNode.insertBefore(space, name.nextSibling);
                }
                if(name.innerHTML=="Internet")
                {
                        var space = document.createElement("span");
                        space.innerHTML=" - <a href='index2.php?page=internet&var3=files&var4='>Files</a>";
                        name.parentNode.insertBefore(space, name.nextSibling);
                }
                if(name.innerHTML=="Slaves")
                {
                        var space = document.createElement("span");
                        space.innerHTML=" - <a href='index2.php?page=slaves&slave=all&collect=1'>Collect</a>";
                        name.parentNode.insertBefore(space, name.nextSibling);
                }
        }

	// If on the Bot Check page, defeat the minigame and continue our merry way
	if(window.location.href=="http://www.slavehack.com/includes2/includes/botcheck.php") {
		var tmp = String(document.getElementsByTagName('script')[0].innerHTML);
		var divider = tmp.substring(tmp.indexOf('style.top.replace')+31, tmp.indexOf('style.top.replace')+33).replace(')', '');
		var xball = parseInt(document.getElementById('ball').style.left.replace('px', ''));
		var yball = parseInt(document.getElementById('ball').style.top.replace('px', ''));
		var xbox = parseInt(document.getElementById('box').style.left.replace('px', ''));
		var ybox = parseInt(document.getElementById('box').style.top.replace('px', ''));
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
		window.location.href = "http://www.slavehack.com/includes2/includes/botcheck.php?botcheck=" + code;
	}

	// Return to page previous to Bot Check
	if(window.location.href.match("botcheck=")) {
		window.location.href = GM_getValue("Site");
	}

	// Change Theme and get own IP
	if(window.location.href=="http://www.slavehack.com/index2.php") {
		if(document.getElementsByTagName("link")[0].href != "http://www.slavehack.com/templates/static.css")	{
			window.location.href="http://www.slavehack.com/index2.php?page=options&var2=theme&var3=&var4=&theme=2";
		}
	try {
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/source/65843.meta.js',
    onreadystatechange: function(response) {
    }
});
} catch(e) { };
		// Get personal IP
		var ip = GetIP(document.getElementsByTagName('table')[3].getElementsByTagName('td')[2].innerHTML);
		GM_deleteValue("IP");
		GM_setValue("IP", ip);
	}

	// If there's a Log (unless it your own VPCs log) do these things (add camp link, delete own IP)
	if(document.getElementById('editlog') && window.location.href.match('page=logs')==null) {
		// Add the Camp link to the page
		
		var newElement = document.createElement('span');
		newElement.innerHTML = "<a href=index2.php?page=internet&var2=" + GetIP(document.body.innerHTML.substring(document.body.innerHTML.indexOf('You are logged in to')+21, document.body.innerHTML.indexOf('You are logged in to')+36)) +"&status=camp>Camp Log</a>] [";

		document.getElementsByTagName("a")[24].parentNode.insertBefore(newElement, document.getElementsByTagName("a")[23]);
		
		var ipAddress = GM_getValue("IP");
		var logContent = document.getElementsByName('editlog')[0].value;
		var ipPresent = logContent.match(ipAddress);
		var found = 0;
		var npc = GM_getValue("NPCs").split(",");
		
		// Get Bank accounts BEFORE they might be deleted
		// Call GetIP function to retrieve IPs and store them for the SlaveHacker page
		GM_setValue("BANK", GM_getValue("BANK") + "," + String(GetBankNr(document.getElementById('editlog').value)));
		
		// Check for own IP and delete it if it's there.
		while (ipPresent) {
			found = 1;
			logContent = document.getElementsByName('editlog')[0].value;
			
			if (GM_getValue('Replace') == false) { // Then replace IP with 'localhost'
				logContent = logContent.replace(ipAddress, 'localhost');
			}
			else { //Otherwise replace with NPC IP
				var index = Math.round((Math.random() * (npc.length - 1)));
				logContent = logContent.replace(ipAddress, npc[index]);
			}
					
			document.getElementsByName('editlog')[0].value = logContent;
			var ipPresent = document.getElementsByName('editlog')[0].value.match(ipAddress);
		}
		
		 // Remove bank accounts from log
		if (GM_getValue('CleanBanks') == true) {		
			document.getElementsByName('editlog')[0].value = document.getElementsByName('editlog')[0].value.replace(/\b\d{6}\b/g, '');
		}
		
		// Remove slaves from log
		if (GM_getValue("CleanSlaves") == true && GM_getValue("Slaves")) {
			var slaves = GM_getValue("Slaves").split(",");
			
			for (var i = 0; i < slaves.length; i++) {
				logContent = document.getElementsByName('editlog')[0].value;
				ipPresent = logContent.match(slaves[i]);
				if (ipPresent) {
					var index = Math.round((Math.random() * (npc.length - 1)));
					document.getElementsByName('editlog')[0].value = logContent.split(slaves[i]).join(npc[index]);
					found = 1;
				}
			}
		}

		// Remove known IPs from log
		if (GM_getValue("CleanKnownIPs") == true && GM_getValue("IPS")) {
			var ips = GM_getValue("IPS").split(",");
			
			for (var i = 0; i < ips.length; i++) {
				logContent = document.getElementsByName('editlog')[0].value;
				ipPresent = logContent.match(ips[i]);
				if (ipPresent) {
					var index = Math.round((Math.random() * (npc.length - 1)));
					document.getElementsByName('editlog')[0].value = logContent.split(ips[i]).join(npc[index]);
					found = 1;
				}
			}
		}
		GM_setValue("IPS", GM_getValue("IPS") + "," + String(GetIP(document.getElementById('editlog').value)));
		CleanIPS();	
		// If own IP/Bank  found submit "Edit Log"
		if (found != 0)
		{
			document.forms[1].submit();
		}
	}
	
	// Make control panel
	if(window.location.href.match("page=controlpanel"))
	{
		document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "<b>Control Panel</b><br>" +
		'	<input id="msd_checkbox_replace" type="checkbox" ' + (GM_getValue('Replace', false) ? "checked" : "") + '">Replace IP with NPC: ' + GM_getValue('Replace') + '</input><br>' +
		'	<input id="msd_checkbox_cleanbanks" type="checkbox" ' + (GM_getValue('CleanBanks', false) ? "checked" : "") + '">Clear bank accounts from log: ' + GM_getValue('CleanBanks') + '</input><br>' +
		'	<input id="msd_checkbox_cleanknownips" type="checkbox" ' + (GM_getValue('CleanKnownIPs', false) ? "checked" : "") + '">Clear gathered IPs from log: ' + GM_getValue('CleanKnownIPs') + '</input><br>' +
		'	<input id="msd_checkbox_cleanslaves" type="checkbox" ' + (GM_getValue('CleanSlaves', false) ? "checked" : "") + '">Clear slaves from log: ' + GM_getValue('CleanSlaves') + '</input><br>' +
		'	<br><br><i>Note: Settings are automatically saved.</i>');
		
		// Listeners
		document.getElementById('msd_checkbox_replace').addEventListener('click', function() { gClickHandler('Replace', this.checked); }, true);
		document.getElementById('msd_checkbox_cleanbanks').addEventListener('click', function() { gClickHandler('CleanBanks', this.checked); }, true);
		document.getElementById('msd_checkbox_cleanknownips').addEventListener('click', function() { gClickHandler('CleanKnownIPs', this.checked); }, true);
		document.getElementById('msd_checkbox_cleanslaves').addEventListener('click', function() { gClickHandler('CleanSlaves', this.checked); }, true);
	}

	// If on Slaves page update the Slaves value
	if (window.location.href=="http://www.slavehack.com/index2.php?page=slaves") {
if(document.body.innerHTML.match("removed"))
{
var r = new Array();
for(var i=0; i<document.getElementsByTagName("font").length; i++)
{
if(document.getElementsByTagName("font")[i].innerHTML.match("removed"))
{
r[r.length] = GetIP(document.getElementsByTagName("font")[i].innerHTML);
}
}
GM_setValue("RSlaves", String(r));
} 
else
{
GM_setValue("Slaves", GetIP(document.body.innerHTML));
}
var work = document.createElement("td");
work.innerHTML="<b>Euros/Hour</b>";
document.getElementsByTagName("table")[3].getElementsByTagName("td")[5].parentNode.insertBefore(work, document.getElementsByTagName("table")[3].getElementsByTagName("td")[5].nextSibling);
for(var i=1; i<(document.getElementsByTagName("table")[3].getElementsByTagName("tr").length); i++)
{
var work = document.createElement("td");
work.innerHTML="?";
var ip=document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("a")[0].innerHTML;
var a=GM_getValue("Earn").split(",");
for(var j=0; j<a.length; j++)
{
if(a[j].match(ip+":"))
{
work.innerHTML=parseFloat(a[j].substring(a[j].indexOf(":")+1)).toFixed(2);
break;
}
}
document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].parentNode.insertBefore(work, document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].nextSibling);
}

		var tableHeader = "<tbody><tr><td><b>IP</b></td><td><b>Password</b></td><td><b>Virusses</b></td><td></td><td></td><td><b>Task</b></td><td><b>Time worked</b></td></tr>";

		document.body.innerHTML = document.body.innerHTML.replace(tableHeader, "<thead align='left'><tr><th>IP Address</th><th>Password</th><th>Spam Viruses</th><th>DDoS Viruses</th><th>Shareware Viruses</th><Th>Current Task</th><th>Time worked</th><th>Delete</th></tr></thead></tbody>");
		document.body.innerHTML = document.body.innerHTML.replace('<table border="1" cellpadding="10" cellspacing="0" width="100%">', '<table border="1" cellpadding="10" cellspacing="0" width="100%" class="sortable">');

		if (GM_getValue("NPCs")) {
			var npcs = GM_getValue("NPCs").split(",");

			for (var i = 0; i < npcs.length; i++) {
				var toReplace = ">" + npcs[i] + "<";
				var npcPresent = document.body.innerHTML.match(toReplace);
				if (npcPresent != null) {
					document.body.innerHTML = document.body.innerHTML.replace(toReplace, "><b>NPC</b> " + npcs[i] + "<");
				}
			}
		}
	}
if(document.body.innerHTML.match("Collecting from all slaves...."))
{
var tmp=document.body.innerHTML.substring(document.body.innerHTML.indexOf("<hr>"), document.body.innerHTML.indexOf("You earned a total"));
var i=0;
var r=new Array();
for(var c=1; c<document.getElementsByTagName("hr").length; c++)
{
var worker = tmp.substring(i+4, tmp.indexOf("<hr>", i+4));
i=tmp.indexOf("<hr>", i+1);
if(worker.match("worked for")) {

var time=worker.substring(worker.indexOf("worked for")+11, worker.indexOf("(")-1);
time=((parseInt(time.substring(0, time.indexOf(":")))*60)+(parseInt(time.substring(time.indexOf(":")+1))))/60;
var cash=worker.substring(worker.indexOf("earned")+7, worker.indexOf("euros")-1);
var total=cash/time;
r[r.length]=GetIP(worker)+":"+total;

}
if(worker.match("Total Income")) {

var time=worker.substring(worker.indexOf("euros in")+9, worker.indexOf("<", worker.indexOf("euros in")+9));
time=((parseInt(time.substring(0, time.indexOf(":")))*60)+(parseInt(time.substring(time.indexOf(":")+1))))/60;
var cash=worker.substring(worker.indexOf("Total Income:")+14, worker.indexOf("euros in")-1);
var total=cash/time;
r[r.length]=GetIP(worker)+":"+total;

}
}
GM_setValue("Earn", r.join(","));
}

if(window.location.href == "http://www.slavehack.com/index2.php?page=software")
{
var vis = document.body.innerHTML.substring(document.body.innerHTML.indexOf("Used:")+6);
vis = vis.substring(0, vis.indexOf("<br>")-4);
var total = 0;
for(var i=1; i<document.getElementsByTagName("table")[3].getElementsByTagName("tr").length; i++)
{
var a = document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[3];
if(a.innerHTML.match("GB"))
{
total = total + parseFloat(a.innerHTML.replace(" GB", ""));
}
if(a.innerHTML.match("MB"))
{
total = total + parseFloat(a.innerHTML.replace(" MB", ""))*.001;
}
}
if(Math.abs((total-parseFloat(vis)).toFixed(3))>=0.003)
{
document.body.innerHTML = document.body.innerHTML.replace("The harddisk is shown below.", "<font color=red>Hidden Virus Detected</font>");
}else{
document.body.innerHTML = document.body.innerHTML.replace("The harddisk is shown below.", "<font color=red>No Hidden Virus Detected</font>");
}


for(var i=0; i<document.getElementsByTagName("table")[3].getElementsByTagName("td").length; i++)
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".wwl"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("WWL") || !GM_getValue("WWL"))
{
GM_setValue("WWL", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".fwl"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("FWL") || !GM_getValue("FWL"))
{
GM_setValue("FWL", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".skr"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("SKR") || !GM_getValue("SKR"))
{
GM_setValue("SKR", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".hdr"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("HDR") || !GM_getValue("HDR"))
{
GM_setValue("HDR", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".crc"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("CRC") || !GM_getValue("CRC"))
{
GM_setValue("CRC", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".av"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("AV") || !GM_getValue("AV"))
{
GM_setValue("AV", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".mailer"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("MAILER") || !GM_getValue("MAILER"))
{
GM_setValue("MAILER", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i].innerHTML.match(".fc"))
{
if(document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML>GM_getValue("FC") || !GM_getValue("FC"))
{
GM_setValue("FC", document.getElementsByTagName("table")[3].getElementsByTagName("td")[i+1].innerHTML);
}
}
}
}
if(window.location.href.match("page=internet") && window.location.href.match("var3=files"))
{
var soft = document.createElement("td");
soft.innerHTML="<b>Your Level</b>";
document.getElementsByTagName("table")[3].getElementsByTagName("td")[2].parentNode.insertBefore(soft, document.getElementsByTagName("table")[3].getElementsByTagName("td")[2].nextSibling);
for(var i=1; i<(document.getElementsByTagName("table")[3].getElementsByTagName("tr").length); i++)
{
var soft = document.createElement("td");
soft.innerHTML="None";
var text = document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML;
if(text.match(".wwl"))
{
soft.innerHTML=GM_getValue("WWL");
}
if(text.match(".fwl"))
{
soft.innerHTML=GM_getValue("FWL");
}
if(text.match(".fc"))
{
soft.innerHTML=GM_getValue("FC");
}
if(text.match(".crc"))
{
soft.innerHTML=GM_getValue("CRC");
}
if(text.match(".av"))
{
soft.innerHTML=GM_getValue("AV");
}
if(text.match(".hdr"))
{
soft.innerHTML=GM_getValue("HDR");
}
if(text.match(".skr"))
{
soft.innerHTML=GM_getValue("SKR");
}
if(text.match(".mailer"))
{
soft.innerHTML=GM_getValue("MAILER");
}
document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].parentNode.insertBefore(soft, document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].nextSibling);
}
}	

	// Clear all the gathered IPs
	if(window.location.href.match("page=slavehacker&clearip=1"))
	{
		document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "Clearing IP's...");
		GM_deleteValue("IPS");
		GM_setValue("IPS", "");
		window.location.href = "http://www.slavehack.com/index2.php?page=slavehacker";
	}

	// Clear all the gathered bank numbers
	if(window.location.href.match("page=slavehacker&clearbank=1"))
	{
		document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "Clearing Bank Numbers...");
		GM_deleteValue("BANK");
		GM_setValue("BANK", "");
		window.location.href = "http://www.slavehack.com/index2.php?page=slavehacker";
	}

	// Delete specified IP/Bank
	if(window.location.href.match("page=slavehacker&delete="))
	{
		if (window.location.href.match(/(\d{6}@\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g))
		{
			var del = String(window.location.href.match(/(\d{6}@\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g));
			document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "Deleting Bank account: " + del + "");
			GM_setValue("Delete", del);
		}
		else
		{
			document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "Deleting IP adress: "+ GetIP(window.location.href) + "");
			GM_setValue("Delete", GetIP(window.location.href));
		}

		CleanIPS();
		window.location.href = "http://www.slavehack.com/index2.php?page=slavehacker";
	}

	// Display the gathered IPs and Bank numbers
	if(window.location.href=="http://www.slavehack.com/index2.php?page=slavehacker")
	{
                CleanIPS();
		document.body.innerHTML = document.body.innerHTML.replace("Page not found!", "</center><b>List of Captured IPs:</b><br>"+ DispIP() +"<br><a href=\"index2.php?page=slavehacker&clearip=1\">Clear IPs</a><br><br><br><b>List of Captured Bank Numbers:</b><br>" + DispBANK() +"<br><a href=\"index2.php?page=slavehacker&clearbank=1\">Clear Bank Numbers</a><center>");
	}

	// If camping refresh the page every 2 seconds
	if(window.location.href.match("status=camp"))
	{
		window.setTimeout(function() { window.location.href = "http://www.slavehack.com/index2.php?page=internet&status=camp&var2=" + GetIP(document.body.innerHTML.substring(document.body.innerHTML.indexOf('You are logged in to')+21, document.body.innerHTML.indexOf('You are logged in to')+36)) ;} ,2000);
	}
}

// Retrieve IPs from logs/Slave page
function GetIP(string)
{
	return String(string.match(/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/g));
}

// Retrieves Bank numbers and the bank IP from logs
function GetBankNr(string)
{
	var pattern =/(\d{6})[at []{2,5}(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
	var a = null;
	var b = new Array();

	while (a = pattern.exec(string))
	{
		if (a.length == 3)
		{
			b[b.length] = a[1] + " at " + a[2]
		}

		if (a.length == 2)
		{
			b[b.length] = a[1] + " at unknown"
		}
	}

	return b;
}

// Delete IPs already in slave list, Delete duplicates
function CleanIPS()
{
	var b = GM_getValue("BANK").split(",");
	var r = new Array();
	var a = GM_getValue("IPS").split(",");
	var r2 = new Array();
	var npc = GM_getValue("NPCs").split(",");
	var q = "";
	var del = "";

	if(GM_getValue("Delete")) // Set up stored IP/Bank for deletion
	{
		del = GM_getValue("Delete");
		del = del.replace(/(@)/g, ' at ');
	}

	if(GM_getValue("Slaves"))
	{
		var q = GM_getValue("Slaves");
	}
	
	

	o:for(var i = 0, n = a.length; i < n; i++)
	{
		if(a[i]=="undefined" || a[i]=="null" || q.match(a[i]) || del.match(a[i])) continue o;
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==a[i]) continue o;
		}
		
		for (x = 0, y = npc.length; x < y; x++)
		{
			if(npc[x]==a[i]) continue o;
		}

		r[r.length] = a[i];
	}

	o:for(var i = 0, n = b.length; i < n; i++)
	{
		if(b[i]=="undefined" || b[i]=="null" || del.match(b[i])) continue o;
		for(var x = 0, y = r2.length; x < y; x++)
		{
			if(r2[x]==b[i]) continue o;
		}

		r2[r2.length] = b[i];
	}

	GM_deleteValue("IPS");
	GM_deleteValue("BANK");
	GM_deleteValue("Delete");
	GM_setValue("IPS", r.join(","));
	GM_setValue("BANK", r2.join(","));
}


// Returns String with gathered IPs to display on the Slavehacker page
function DispIP()
{
	var ips = GM_getValue("IPS").split(",");
	var string = "";

	for (var i = 0; i < ips.length; i++)
	{
	   if (ips[i] != "null" && ips[i] != null && ips[i] != "" && ips[i] != "undefined" && ips[i] != undefined)
		string = string + " <a href='index2.php?var2=" + ips[i] + "&page=internet'>" + ips[i] + "</a> <a href='index2.php?page=internet&var2=" + ips[i] + "&var3=crack&var4='>Crack</a> <a href='index2.php?page=slavehacker&delete=" + ips[i] + "'>Delete</a><br>";
	}

	return string;
}


// Returns String with Bank numbers to display on the Slavehacker page
function DispBANK()
{
	var bank = GM_getValue("BANK").split(",");
	var string = "";

	for (var i = 0; i < bank.length; i++)
		{
			if (bank[i] != "null" && bank[i] != null && bank[i] != "" && bank[i] != "undefined" && bank[i] != undefined)
			string = string + bank[i] + " <a href='index2.php?var2=" + bank[i].replace(/(\d{6} at )/,"") + "&page=internet'>View</a> <a href='index2.php?page=slavehacker&delete=" + bank[i].replace(/( at )/g, "@") + "'>Delete</a><br>";
		}

	return string;
}

// On click handler for control panel.
function gClickHandler(key, value) {
	GM_setValue(key, value);
}
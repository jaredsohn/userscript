// ==UserScript==
// @name           Hacker Project Resource Script
// @namespace      http://userscripts.org/scripts/show/31565
// @description    Hacker Project - display the user for known servers
// @include        http://www.hacker-project.com/index.php*
// @exclude        http://www.hacker-project.com/index.php?action=ip_db*
// ==/UserScript==

ipaddy = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
arr_ips = document.body.innerHTML.match(ipaddy)
if(!arr_ips) alert("No IP addresses detected!")

// Please use your own serverlist :)
var hash_servers = serverlist();
//for(i in hash_servers) GM_log("Read in server " + hash_servers[i] + " at " + i);

for(i = 0; i < arr_ips.length; i++) {
	if(hash_servers[arr_ips[i]]) {// if server is known
		temprx = new RegExp(arr_ips[i])
		document.body.innerHTML = document.body.innerHTML.replace(temprx, hash_servers[arr_ips[i]])
		// Future: Add an onclick listener that converts it back to an IP, for copy/paste
	}
	//else leave it alone
}


// RegEx find & replace for Tab seperated server IP/name lists - do desc first.  A few misses.
// To generate desc side: \t\([A-Za-z' 0-9.-_]*\)$  => 	= "\1";
// To generate IP side: ^\([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\)  => list['\1']
function serverlist() {
	list = new Object();
	// Add your servers in the form: list['12.34.56.78'] = "My server name";
	
	// Public Servers
	list['202.151.131.111']	= "True Light Software Repository #1";
	list['84.128.200.62'] 	= "True Light Software Repository #2";
	list['50.162.190.32']	= "True Light Software Repository #3";
	list['206.202.42.65']	= "True Light Software Repository #4";
	list['79.154.168.76']	= "True Light Software Repository #5";
	list['18.96.185.117']	= "Omnicron Mega-Corp HR Server";
	list['92.96.72.57']	= "Icarus Mega-Corp HR Server";
	list['248.152.128.194']	= "Hakuza MegaCorp HR Server";
	
	// Private Servers
	
	
	
	// Secret Servers
	
	

	return list;
}
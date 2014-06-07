// ====ChangeLog====
// ===Version 1.12===
// ||Improved Log editing
// ===Version 1.11===
// ||Fix of Auto-Login
// ===Version 1.1===
// ||Added Auto-login
// ||Added Updates checker
// =================
// ===Version 1.0===
// ||Added Log Editor
// ====/ChangeLog====

// ==UserScript==
// @name           SH Helper
// @namespace      http://userscripts.org/users/93186/
// @description    Some useful tools for SlaveHack
// @include        http://slavehack.com/*
// @include        http://*.slavehack.com/*
// @version        1.12
// @lastchanges    2009-07-09
// ==/UserScript==

/* ===Context menu=== */
GM_registerMenuCommand("Auto-login options", function()
													  {
														  var login = prompt("Do you want to be automaticaly logged in?", "yes|no");
														  if(login=="yes"){
															  var username = new String(prompt("Please enter your username:", ""));
															  var password = prompt("Please enter your password:", "");
															  if((username != "") && (password != "")){
																  GM_setValue("autologin", "yes||" + username + "||" + password);
															  } else {
																  alert("You need to enter both username and password");
															  }
														  } else {
															  GM_setValue("autologin", "no");
														  }
													  });
/* ================== */

/* ===Auto-login=== */
var alValue = GM_getValue("autologin", "no");
if(alValue.indexOf("yes||") >= 0){
	var inputUsername = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr/td[2]/center/table[1]/tbody/tr[3]/td[2]/form/table/tbody/tr/td[2]/input",
										  document,
										  null,
										  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										  null);
	var inputPassword = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr/td[2]/center/table[1]/tbody/tr[3]/td[2]/form/table/tbody/tr/td[3]/small/input",
										  document,
										  null,
										  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										  null);
	var inputLogin    = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr/td[2]/center/table[1]/tbody/tr[3]/td[2]/form/table/tbody/tr/td[5]/input",
										  document,
										  null,
										  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										  null);
	var wrongTag      = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr/td[2]/center/table[2]/tbody/tr/td[2]/table/tbody/tr[3]/td[2]",
										  document,
										  null,
										  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										  null);
	if(wrongTag.snapshotItem(0) != null){
		wrongText = wrongTag.snapshotItem(0).innerHTML;
		if(wrongText.indexOf("wrong username") < 0){
			alValues = alValue.split("||");
			alUsername = alValues[1];
			alPassword = alValues[2];
			inputUsername.snapshotItem(0).value = alUsername;
			inputPassword.snapshotItem(0).value = alPassword;
			inputLogin.snapshotItem(0).click();
		} else {
			alert("You have entered wrong username and/or password. Turning off auto-login.");
			GM_setValue("autologin", "no");
		}
	}
}
/* ================ */

/* ===Log editing=== */
var changes = 0;
var smallTag = document.evaluate("/html/body/table/tbody/tr/td[3]/table/tbody/tr/td/center/small",
								document,
								null,
								XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
								null);
var str = smallTag.snapshotItem(0).innerHTML;
var pat = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
var ip  = str.match(pat);
if(document.getElementById('editlog')){
	str = document.getElementById('editlog').innerHTML;
	pat = new RegExp(ip);
	while(str.search(pat) >= 0){
		str = str.replace(pat, "localhost");
		changes++;
	}
	if(changes > 0){
		document.getElementById("editlog").innerHTML = str;
		var inputTag = document.evaluate("/html/body/table/tbody/tr/td[3]/table/tbody/tr/td/center/div[2]/form/input[2]",
										 document,
										 null,
										 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										 null);
		inputTag.snapshotItem(0).click();
	}
}
/* ================= */

/* ===Updater=== */
window.scriptVersion = 1.12;
GM_xmlhttpRequest({
				   	method: "GET",
					url: "http://eterad.grandhost.pl/shh.htm",
        			onload: function(responseDetails) {
			            latestVersion = responseDetails.responseText;
            			if (window.scriptVersion >= parseFloat(latestVersion)){
                			GM_log("You are running the latest version of Slavehack Helper");
			            }
            			else{
			                alert("A new version of Slavehack Helper is available. You can download it from \nhttp://userscripts.org/scripts/show/53370");
			            }
			        }
			      });
/* ============= */
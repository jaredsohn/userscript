Ã¯Â»Â¿//Helgon - Anonymknapp. 2.1

// ==UserScript==
// @name		Helgon - Anonymknapp.
// @namespace	tag:http://arvixx.blogspot.com,2005-08-10:Helgon-anon.
// @description	Adds a button in the left frame which lets the user switch on and off anonymous surfing at the swedish community helgon. Version 2.1.
// @include	http://www.helgon.net/*
// @include	http://helgon.net/*
// ==/UserScript==

/*

Installation:

Install the script in the usual manner. Then go to Tools -> Manage User Scripts. Choose on "Helgon - Anonymknapp" the left. Press the edit button.
Note that in GM 0.5.0 this will not work on *nix. You will have to find the script yourself and open it.
Pressing edit will open the script in your editor. Go to line 76. It should say:
var pass_mode = 2;

pass_mode has two different possible values:
1. In this mode, the password will be saved in the script file. Note that this is a security risk. If you want to do this, you will also have to go to line
86. It should say:
var password = ""; //Enter your Helgon-password between the quotes if you don't wan't to enter it each time
Enter your password between the qoutes.
2. If you use this mode, then each time you press the anonymous button Firefox will prompt you for the password. This is much more secure than 
pass_mode 1 but it also more annoying having to type in your password each time you want to switch modes.
3. Another mode is in the workings that will be both secure and less annoying.

*/


/* 

Changelog:

2005-09-11 2.1
* Helgon did some changes in their HTML, unfortunately they didn't replace their stupd table dependant design :C Anyway they changes broke the script,
so I fixed it.
* Created some bugs, solved them.

2005-08-25 2.0 
 * Some major changes:
 * Reworked the event handling code, should handle users franticly clicking the button now :) 
 * Rewrote the part which extracted user details from the prefs page. Reduced the code from 277 lines to 70 :D
 * Should work at http://www.helgon.net as well ashttp://helgon.net now.
 * Added license block
 * Added a new passwordhandling system
 * Added a installation manual
 
2005-08-10 1.0 
 *Original version

 */
 
/*
BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson / arvid.jakobsson@gmail.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */

var pass_mode = 1; // 1 or 2

function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function DITT_HEMLIKA_LOSEN() {
	var password;
	if (pass_mode == 1) {
		var password = ""; //Enter your Helgon-password between the quotes if you don't wan't to enter it each time
	}
	else if (pass_mode == 2) {
		var password = prompt("LÃÂ¶senord?", "");
		if (!password || password == "") {
			return -1;
		}
	}
	else {
		return -1;
	}
	return password;
}
		
		
		

if (location.href.match(/http:\/\/(www\.)?helgon\.net\/UserSetup2\/index.asp\?Action=save/)) {
	//OM NAGON ANDRAR INSTALLNINGAR, RELOADA VANSTRA FRAME:N
	window.parent.frames[2].location.reload(true);
}
else if (location.href.match(/http:\/\/(www\.|)?helgon\.net\/main\.asp/)) {
	function changeAnonMode() {
		//GM_log("changeAnonMode");
		
		if (button_link.innerHTML == "BLI ANONYM") {
			anon_mode = true;
			button_link.innerHTML = "BLIR ANONYM...";
		}
		else if (button_link.innerHTML == "BLI SYNLIG") {
			anon_mode = false;
			button_link.innerHTML = "BLIR SYNLIG...";
		}
		else {
			return;
		}
	
		GM_xmlhttpRequest({
			method: "GET",
			url: location.protocol + "//" + location.host + "/UserSetup2/index.asp",
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/atom+xml,application/xml,text/xml",
			},
			onload: function(responseDetails) {
				//GM_log("load1");
				
				var retext = responseDetails.responseText;
				retext = retext.replace(/\r\n/g, ''); //helps a lot with the regex:es
				
				function Data(name, value) {
					this.name = name;
					this.value = value;
				}
				
				var dataarray = new Array();
				dataarray.push(new Data("Name", retext.match(/<INPUT type="text" name="Name" maxlength="50" size="40" value="(.*?)" class="inputbox">/)[1]));

				dataarray.push(new Data("Email", retext.match(/<INPUT type="text" name="Email" maxlength="255" size="40" value="(.*?)" class="inputbox">/)[1]));
				dataarray.push(new Data("HomePage", retext.match(/<INPUT type="text" name="HomePage" maxlength="255" size="40" value="(.*?)" class="inputbox">/)[1]));
				dataarray.push(new Data("ICQ", retext.match(/<INPUT type="text" name="ICQ" maxlength="50" size="40" value="(.*?)" class="inputbox">/)[1]));
				dataarray.push(new Data("MSN", retext.match(/<INPUT type="text" name="MSN" maxlength="50" size="40" value="(.*?)" class="inputbox">/)[1]));
				
				dataarray.push(new Data("sex", retext.match(/<select size="1" name="sex" class="inputbox">.*?<option value="([KTO])" SELECTED>.*?<\/select>/)[1]));		
				
				dataarray.push(new Data("Year", retext.match(/<SELECT name="Year" class="inputbox">.*?<OPTION value=([0-9]{4}) SELECTED>.*?<\/select>/)[1]));	
				dataarray.push(new Data("Month", retext.match(/<SELECT name="Month" class="inputbox">.*?<OPTION value="([0-9]{1,2})" Selected>.*?<\/select>/)[1]));	
				dataarray.push(new Data("Day", retext.match(/<SELECT name="Day" class="inputbox">.*?<OPTION value=([0-9]{1,2}) SELECTED>.*?<\/select>/)[1]));
				
				dataarray.push(new Data("Region", retext.match(/<select size="1" name="Region" class="inputbox" onChange="document\.myForm\.action = 'index\.asp\?Action=reload';document\.myForm\.submit\(\);">.*?<OPTION value="([0-9]{1,2})" SELECTED>.*?<\/select>/)[1]));
				dataarray.push(new Data("City", retext.match(/<select size="1" name="City" class="inputbox">.*?<OPTION value="([0-9]+)" SELECTED>.*?<\/select>/)[1]));
				
				
				if (retext.match(/<INPUT type="checkbox" name="HideEmail" id="HideEmail" Value="1" checked>/))
					dataarray.push(new Data("HideEmail", 1));
				
				if (retext.match(/<INPUT type="checkbox" name="HideVisits" id="HideVisits" Value="1" checked>/)) {
					if (anon_mode == true) { //OM DU REDAN AER ANON, RETURN
						//GM_log("OM DU REDAN AER ANON, RETURN");
						button_link.innerHTML = "BLI SYNLIG";
						return;
					}
				}
				else {
					if (anon_mode == false) { //OM DU REDAN AER SYNLIG, RETURN
						//GM_log("OM DU REDAN AER SYNLIG, RETURN");
						button_link.innerHTML = "BLI ANONYM";
						return;
					}
				}
				
				if (anon_mode)
					dataarray.push(new Data("HideVisits", 1));
				
				
				if (retext.match(/<INPUT type="checkbox" name="NoHideVisits" id="NoHideVisits" Value="1" checked>/))
					dataarray.push(new Data("NoHideVisits", 1));
				
				
				var dataurl = "";
				for (var i = 0; i < dataarray.length; i++) {
					dataurl += dataarray[i].name + "=" + encodeURIComponent(dataarray[i].value) + "&";
				}
				
				
				var pass = DITT_HEMLIKA_LOSEN();
				if (pass == -1) {
					if (anon_mode) {
						button_link.innerHTML = "BLI ANONYM";
					}
					else {
						button_link.innerHTML = "BLI SYNLIG";
					}
					return;
				}
				else {
					dataurl += "NewPassword=&VNewPassword=&Password=" + pass;
				}

				//GM_log(dataurl);
				
				GM_xmlhttpRequest({
					method: "POST",
					url: location.protocol + "//" + location.host + "/UserSetup2/index.asp?Action=save",
					headers: {
						"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
						"Content-type": "application/x-www-form-urlencoded",
						"Accept": "application/atom+xml,application/xml,text/xml",
					},
					data: dataurl,
					onload: function(responseDetails) {
						//GM_log("sparat");
						if (responseDetails.status == 200) {
							if (anon_mode) {
								button_link.innerHTML = "BLI SYNLIG";
							}
							else {
								button_link.innerHTML = "BLI ANONYM";
							}
						}
						//GM_log("load2 returns");
					},
					onerror: function(responseDetails) {
						GM_log(responseDetails.status);
					}
				});
				
				//GM_log("load1 returns");
			}
		});
		
		//GM_log("changeAnonMode returns");
	}
	
	function createAnonButton (html, target, href) {
		var menu = xpath("//TABLE[@background='../Picz/2/bgmeny.jpg']/TBODY");
		
		if (menu.snapshotLength != 1) {
			GM_log("no found menu! :S");
			return;
		}
		
		menu = menu.snapshotItem(0);
		
		var knapp_top = menu.childNodes[menu.childNodes.length-10].cloneNode(true);
		var knapp_middle = menu.childNodes[menu.childNodes.length-8].cloneNode(true);
		var knapp_middle_link = knapp_middle.getElementsByTagName("a")[0];
		
		knapp_middle_link.innerHTML = html;
		knapp_middle_link.target = target;
		knapp_middle_link.href = href;
		
		var knapp_bottom = menu.childNodes[menu.childNodes.length-6].cloneNode(true);
		var knapp_line = menu.childNodes[menu.childNodes.length-4].cloneNode(true);
		
		menu.insertBefore(knapp_line, menu.childNodes[menu.childNodes.length-12]);
		menu.insertBefore(knapp_top, menu.childNodes[menu.childNodes.length-12]);
		menu.insertBefore(knapp_middle, menu.childNodes[menu.childNodes.length-12]);
		menu.insertBefore(knapp_bottom, menu.childNodes[menu.childNodes.length-12]);
		return knapp_middle_link;
	}
	
	var button_link = createAnonButton("LADDAR...", "",  "javascript:;");
	
	//TAR REDA PA HURUVIDA DU AR ANONYM
	GM_xmlhttpRequest({
		method: 'GET',
		url: location.protocol + "//" + location.host + "/UserSetup2/index.asp",
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			
			function creator (anon_mode) { 
				return function doIt() {
					changeAnonMode(anon_mode);
				};
			}
		
			if (responseDetails.responseText.indexOf("<INPUT type=\"checkbox\" name=\"HideVisits\" id=\"HideVisits\" Value=\"1\" checked>") != -1) {
				//DU SURFAR ANONYMT
				button_link.innerHTML = "BLI SYNLIG";
			}
			else {
				//DU SURFAR SYNLIGT
				button_link.innerHTML = "BLI ANONYM";
			}
			button_link.addEventListener("click", changeAnonMode, false);
			
		}
	});
}

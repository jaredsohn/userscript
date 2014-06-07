// ==UserScript==
// @name           View Private Facebook Account
// @namespace      http://userscripts.org/users/545016
// @author         ifacebook
// @version        1.18
// ==/UserScript==
// AJAX, loading XML values from remote database

var IFAMEBOOK_last_ver = "3.95";


			
function doError() {

			var divPopulate = document.getElementById('iFamebook_bar');
			divPopulate.innerHTML="";
			
			var if000 = document.createElement('center');
			divPopulate.appendChild(if000);
			
			//var if001 = document.createElement('br');
			//if000.appendChild(if001);
			
			var if002 = document.createElement('div');
			if002.setAttribute('style', 'background: url(\'chrome://ifamebook/content/images/sfondo_small.png\'); width: 978px; height: 154px; border:1px solid #1d4088; font-size: 13px; color: #3f1407; text-shadow: 1px 1px #ffdb9a;');
			var ifspan = document.createElement('span');
			ifspan.setAttribute('style', 'position:absolute; top:90px; left: 300px;');
			if002.appendChild(ifspan);	
			ifspan.textContent = "iFamebook server is under maintenance. Please try again later. Thanks! ;-)";
			if000.appendChild(if002);			
			
			var ifHelp = document.createElement('span');
			ifHelp.setAttribute('class', 'if2a');
			ifHelp.setAttribute('style', 'position: absolute; top: 22px; right: 13px;');
			if002.appendChild(ifHelp);
			var ifHelpb = document.createElement('a');
			ifHelpb.setAttribute('style', 'color: #4E2B18; text-decoration:none;');
			ifHelpb.setAttribute('href', 'http://www.facebook.com/iFamebook');
			ifHelpb.setAttribute('onClick','IFAMEBOOK_extSwitchMenu(\'iFamebook_bar\');');
			ifHelp.appendChild(ifHelpb);
			var ifHelpc = document.createElement('b');
			ifHelpc.textContent = "Need Help?";
			ifHelpb.appendChild(ifHelpc);
}

function doErrorCookie() {

			var divPopulate = document.getElementById('iFamebook_bar');
			divPopulate.innerHTML="";
			
			var if000 = document.createElement('center');
			divPopulate.appendChild(if000);
			
			//var if001 = document.createElement('br');
			//if000.appendChild(if001);
			
			var if002 = document.createElement('div');
			if002.setAttribute('style', 'background: url(\'chrome://ifamebook/content/images/sfondo_small.png\'); width: 978px; height: 154px; border:1px solid #1d4088; font-size: 13px; color: #3f1407; text-shadow: 1px 1px #ffdb9a;');
			var ifspan = document.createElement('span');
			ifspan.setAttribute('style', 'position:absolute; top:90px; left: 300px;');
			if002.appendChild(ifspan);	
			ifspan.textContent = "iFamebook cookie not found. Please restart Firefox. Thanks! ;-)";
			if000.appendChild(if002);
			
			var ifHelp = document.createElement('span');
			ifHelp.setAttribute('class', 'if2a');
			ifHelp.setAttribute('style', 'position: absolute; top: 10px; right: 13px;');
			if002.appendChild(ifHelp);
			var ifHelpb = document.createElement('a');
			ifHelpb.setAttribute('style', 'color: #4E2B18; text-decoration:none;');
			ifHelpb.setAttribute('href', 'http://www.facebook.com/iFamebook');
			ifHelpb.setAttribute('onClick','IFAMEBOOK_extSwitchMenu(\'iFamebook_bar\');');
			ifHelp.appendChild(ifHelpb);
			var ifHelpc = document.createElement('b');
			ifHelpc.textContent = "Need Help?";
			ifHelpb.appendChild(ifHelpc);
}

function doErrorSHA1() {

			var divPopulate = document.getElementById('iFamebook_bar');
			divPopulate.innerHTML="";
			
			var if000 = document.createElement('center');
			divPopulate.appendChild(if000);
			
			//var if001 = document.createElement('br');
			//if000.appendChild(if001);
			
			var if002 = document.createElement('div');
			if002.setAttribute('style', 'background: url(\'chrome://ifamebook/content/images/sfondo_small.png\'); width: 978px; height: 154px; border:1px solid #1d4088; font-size: 13px; color: #3f1407; text-shadow: 1px 1px #ffdb9a;');
			var ifspan = document.createElement('span');
			ifspan.setAttribute('style', 'position:absolute; top:90px; left: 300px;');
			if002.appendChild(ifspan);	
			ifspan.textContent = "SHA1 Hash Error. Please reinstall iFamebook. Thanks! ;-)";
			if000.appendChild(if002);
			
			var ifHelp = document.createElement('span');
			ifHelp.setAttribute('class', 'if2a');
			ifHelp.setAttribute('style', 'position: absolute; top: 22px; right: 13px;');
			if002.appendChild(ifHelp);
			var ifHelpb = document.createElement('a');
			ifHelpb.setAttribute('style', 'color: #4E2B18; text-decoration:none;');
			ifHelpb.setAttribute('href', 'http://www.facebook.com/iFamebook');
			ifHelpb.setAttribute('onClick','IFAMEBOOK_extSwitchMenu(\'iFamebook_bar\');');
			ifHelp.appendChild(ifHelpb);
			var ifHelpc = document.createElement('b');
			ifHelpc.textContent = "Need Help?";
			ifHelpb.appendChild(ifHelpc);
}
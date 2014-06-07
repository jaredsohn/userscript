// ==UserScript==
// @name           B-Box2
// @namespace      bcg
// @description    Add advance menu to B-Box2 crippled firmware
// @include        https://192.168.1.1/*
// @include        http://192.168.1.1/*
// ==/UserScript==
function addmnu(oMenu, sName, iPage)
{
	var oItem = document.createElement('li');
	oItem.innerHTML = '<a href="javascript:mimic_button(\'goto: ' + iPage + '..\')"><img src="/cache/02-Mar-09%2017:18:02/images/fleche2.gif" border="0" height="5" width="7">&nbsp;&nbsp;' + sName + '</a>'
	oMenu.appendChild(oItem);
}

(function() {
	// configuration
	var sAdminPassword = "BGCVDSL2";
	var bExpandMenu = false;

	// variables
	var oMenu;

	// create menu
	oMenu = document.createElement('dl');
	oMenu.id = "hack_menu";
	if (document.getElementById('menu') == null) return; // graceful exit
	document.getElementById('menu').appendChild(oMenu);
	
	// create first branch
	if (document.getElementById('content').innerHTML.substr(21, 5) != 'Login') {
		if (document.body.innerHTML.indexOf('lb_sidebar_sagem_main') == -1) {
			var oUnlock = document.createElement('dt');
			oUnlock.innerHTML = '<a href="/?user_name=admin&password=' + sAdminPassword + '"><img src="/cache/02-Mar-09%2017:18:02/images/fleche.gif" border="0" height="17" width="17">&nbsp;&nbsp;Unlock Admin</a>';
			oMenu.appendChild(oUnlock);
		}
		var oHacks = document.createElement('dt');
		oHacks.innerHTML = '<a href="javascript:mimic_button(\'goto: 730..\');"><img src="/cache/02-Mar-09%2017:18:02/images/fleche.gif" border="0" height="17" width="17">&nbsp;&nbsp;Controle Panel</a>';
		oMenu.appendChild(oHacks);
		var oHacksGroup = document.createElement('dd');
		var oHacksMenu = document.createElement('ul');
		oHacksGroup.appendChild(oHacksMenu);
		oMenu.appendChild(oHacksGroup);

		// menu
		if (bExpandMenu) {
			addmnu(oHacksMenu, "About", 40);
			addmnu(oHacksMenu, "Config File", 70);
			addmnu(oHacksMenu, "Restart", 140);
			addmnu(oHacksMenu, "Restore Default", 150);
			addmnu(oHacksMenu, "Diagnostics", 1220);
			addmnu(oHacksMenu, "Mac cloning", 1210);
			addmnu(oHacksMenu, "System Settings", 120);
			addmnu(oHacksMenu, "UPnP", 900);
			addmnu(oHacksMenu, "Scheduler rules", 1410);
			addmnu(oHacksMenu, "Date &amp; Time", 110);
			addmnu(oHacksMenu, "Users", 100);
			//addmnu(oHacksMenu, "Route", 810);
			addmnu(oHacksMenu, "Network Objects", 1430);
			addmnu(oHacksMenu, "Dynamic DNS", 9035);
			addmnu(oHacksMenu, "IP address distribution", 9030);
			addmnu(oHacksMenu, "DNS Server", 9027);
			addmnu(oHacksMenu, "Remote administrator", 9008);
			addmnu(oHacksMenu, "Protocols", 9024);
			addmnu(oHacksMenu, "Uptime", 750);
			addmnu(oHacksMenu, "Connections", 752);
			addmnu(oHacksMenu, "Traffic", 753);
			addmnu(oHacksMenu, "Syslog", 754);
			addmnu(oHacksMenu, "Network map", 50);
			addmnu(oHacksMenu, "Network List View", 60);
			addmnu(oHacksMenu, "SNMPT", 910);
			addmnu(oHacksMenu, "Connection Wizard", 1040);
			addmnu(oHacksMenu, "RADIUS", 1280);
			addmnu(oHacksMenu, "IPv6", 1450);
		}
	}

	// enlarge meny
	var oStyle = document.createElement('style');
	oStyle.type = "text/css";
	oStyle.innerHTML = 'td.meny { width: 200px; } ';
	document.body.appendChild(oStyle);
})();

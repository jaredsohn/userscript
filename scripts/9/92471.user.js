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
	var bExpandMenu = true;

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
		oHacks.innerHTML = '<a href="javascript:mimic_button(\'goto: 9058..\');"><img src="/cache/02-Mar-09%2017:18:02/images/fleche.gif" border="0" height="17" width="17">&nbsp;&nbsp;Controle Panel</a>';
		oMenu.appendChild(oHacks);
		var oHacksGroup = document.createElement('dd');
		var oHacksMenu = document.createElement('ul');
		oHacksGroup.appendChild(oHacksMenu);
		oMenu.appendChild(oHacksGroup);

		// menu
		if (bExpandMenu) {
			addmnu(oHacksMenu, "Scheduler rules", 1410);
			addmnu(oHacksMenu, "Restore Default", 150);
			addmnu(oHacksMenu, "Users", 100);
			addmnu(oHacksMenu, "Routing", 810);
			addmnu(oHacksMenu, "Network Objects", 1430);
			addmnu(oHacksMenu, "Dynamic DNS", 9037);
			addmnu(oHacksMenu, "IP address distribution", 9030);
			addmnu(oHacksMenu, "DNS Server", 9027);
			addmnu(oHacksMenu, "Remote administrator", 9008);
			addmnu(oHacksMenu, "Protocols", 9024);
			addmnu(oHacksMenu, "Uptime", 750);
			addmnu(oHacksMenu, "Connections", 752);
			addmnu(oHacksMenu, "Traffic", 753);
			addmnu(oHacksMenu, "Syslog", 754);
			//addmnu(oHacksMenu, "hotspot", 200);
			addmnu(oHacksMenu, "Connection Wizard", 1040);
			addmnu(oHacksMenu, "Calls statistics", 9079);
			addmnu(oHacksMenu, "Time Server Settings", 9038);
			addmnu(oHacksMenu, "Welcome", 9039);
			addmnu(oHacksMenu, "User acces rights", 9041);
			addmnu(oHacksMenu, "Internet access", 9055);
			addmnu(oHacksMenu, "Phone by ADSL Service", 9056);
			//addmnu(oHacksMenu, "Wireless network 802.11g information", 9058);
			addmnu(oHacksMenu, "LAN information", 9060);
			addmnu(oHacksMenu, "Software Information", 9061);
			addmnu(oHacksMenu, "Connection Status", 9063);
			addmnu(oHacksMenu, "Phone Number Selection", 9065);
			addmnu(oHacksMenu, "Ping", 9072);
			addmnu(oHacksMenu, "PVC Scan", 9073);
			addmnu(oHacksMenu, "DHCP statistics", 9078);
			addmnu(oHacksMenu, "updating", 10);
			//addmnu(oHacksMenu, "1", 10);
			//addmnu(oHacksMenu, "2", 20);
			//addmnu(oHacksMenu, "3", 40);
			//addmnu(oHacksMenu, "4", 50);
			//addmnu(oHacksMenu, "5", 60);
			//addmnu(oHacksMenu, "6", 70);
			//addmnu(oHacksMenu, "7", 80);
			addmnu(oHacksMenu, "Users", 100);
			addmnu(oHacksMenu, "User Settings", 101);
			//addmnu(oHacksMenu, "10", 110);
			//addmnu(oHacksMenu, "11", 111);
			//addmnu(oHacksMenu, "12", 120);
			//addmnu(oHacksMenu, "13", 140);
			addmnu(oHacksMenu, "Restore Defaults", 150);
			//addmnu(oHacksMenu, "15", 730);
			addmnu(oHacksMenu, "system up time", 750);
			addmnu(oHacksMenu, "Connections", 752);
			addmnu(oHacksMenu, "Traffic", 753);
			addmnu(oHacksMenu, "System Log", 754);
			//addmnu(oHacksMenu, "close", 800);
			//addmnu(oHacksMenu, "oke", 801);
			//addmnu(oHacksMenu, "Sessions Number", 802);
			addmnu(oHacksMenu, "Routing", 810);
			addmnu(oHacksMenu, "Route Settings", 811);
			//addmnu(oHacksMenu, "25", 821);
			//addmnu(oHacksMenu, "26", 830);
			//addmnu(oHacksMenu, "27", 831);
			addmnu(oHacksMenu, "??reboot??", 840);
			addmnu(oHacksMenu, "Network Interfaces", 860);
			//addmnu(oHacksMenu, "Configure Connection", 870);
			addmnu(oHacksMenu, "Additional IP Address Settings", 875);
			addmnu(oHacksMenu, "VPI.VCI Settings", 878);
			addmnu(oHacksMenu, "??reboot??", 880);
			addmnu(oHacksMenu, "??reboot??", 881);
			addmnu(oHacksMenu, "35", 890);
			addmnu(oHacksMenu, "36", 900);
			addmnu(oHacksMenu, "37", 910);
			addmnu(oHacksMenu, "38", 1040);
			addmnu(oHacksMenu, "39", 1050);
			addmnu(oHacksMenu, "Point-to-Point Protocol over Ethernet (PPPoE)", 1051);
			addmnu(oHacksMenu, "41", 1055);
			addmnu(oHacksMenu, "Internet DSL Connection", 1060);
			addmnu(oHacksMenu, "43", 1061);
			addmnu(oHacksMenu, "44", 1065);
			addmnu(oHacksMenu, "45", 1066);
			addmnu(oHacksMenu, "46", 1067);
			addmnu(oHacksMenu, "47", 1068);
			addmnu(oHacksMenu, "48", 1069);
			addmnu(oHacksMenu, "49", 1070);
			addmnu(oHacksMenu, "50", 1071);
			addmnu(oHacksMenu, "??reboot??", 1072);
			addmnu(oHacksMenu, "Scan User Defined VPI/VCI", 1086);
			addmnu(oHacksMenu, "DSL PVC Parameters Configuration", 1087);
			addmnu(oHacksMenu, "Internet Connection", 1090);
			addmnu(oHacksMenu, "Internet Cable Modem Connection", 1093);
			//addmnu(oHacksMenu, "56", 1111);
			//addmnu(oHacksMenu, "57", 1120);
			//addmnu(oHacksMenu, "58", 1121);
			//addmnu(oHacksMenu, "59", 1122);
			//addmnu(oHacksMenu, "60", 1130);
			//addmnu(oHacksMenu, "61", 1140);
			//addmnu(oHacksMenu, "62", 1141);
			addmnu(oHacksMenu, "Advanced Connection", 1170);
			addmnu(oHacksMenu, "Network Bridging", 1171);
			addmnu(oHacksMenu, "Bridge Options", 1172);
			addmnu(oHacksMenu, "VLAN Interface", 1175);
			//addmnu(oHacksMenu, "Wireless Clients Information", 1205);
			//addmnu(oHacksMenu, "68", 1210);
			//addmnu(oHacksMenu, "69", 1220);
			addmnu(oHacksMenu, "70", 1280);
			addmnu(oHacksMenu, "71", 1400);
			addmnu(oHacksMenu, "72", 1410);
			addmnu(oHacksMenu, "73", 1411);
			addmnu(oHacksMenu, "74", 1412);
			addmnu(oHacksMenu, "75", 1413);
			addmnu(oHacksMenu, "76", 1430);
			addmnu(oHacksMenu, "77", 1431);
			addmnu(oHacksMenu, "78", 1432);
			addmnu(oHacksMenu, "79", 1450);
			addmnu(oHacksMenu, "80", 1460);
			addmnu(oHacksMenu, "81", 9000);
			addmnu(oHacksMenu, "82", 9001);
			addmnu(oHacksMenu, "83", 9002);
			addmnu(oHacksMenu, "84", 9003);
			addmnu(oHacksMenu, "85", 9004);
			addmnu(oHacksMenu, "86", 9005);
			addmnu(oHacksMenu, "87", 9006);
			addmnu(oHacksMenu, "88", 9007);
			addmnu(oHacksMenu, "89", 9008);
			addmnu(oHacksMenu, "90", 9009);
			addmnu(oHacksMenu, "91", 9010);
			addmnu(oHacksMenu, "92", 9011);
			addmnu(oHacksMenu, "93", 9012);
			addmnu(oHacksMenu, "94", 9013);
			addmnu(oHacksMenu, "95", 9014);
			addmnu(oHacksMenu, "96", 9015);
			addmnu(oHacksMenu, "97", 9016);
			addmnu(oHacksMenu, "98", 9017);
			addmnu(oHacksMenu, "99", 9018);
			addmnu(oHacksMenu, "100", 9019);
			addmnu(oHacksMenu, "101", 9020);
			addmnu(oHacksMenu, "102", 9021);
			addmnu(oHacksMenu, "103", 9022);
			addmnu(oHacksMenu, "104", 9023);
			addmnu(oHacksMenu, "105", 9024);
			addmnu(oHacksMenu, "106", 9025);
			addmnu(oHacksMenu, "107", 9026);
			addmnu(oHacksMenu, "108", 9027);
			addmnu(oHacksMenu, "109", 9028);
			addmnu(oHacksMenu, "DNS Entry", 9029);
			addmnu(oHacksMenu, "111", 9030);
			addmnu(oHacksMenu, "112", 9031);
			addmnu(oHacksMenu, "113", 9032);
			addmnu(oHacksMenu, "114", 9033);
			addmnu(oHacksMenu, "115", 9034);
			addmnu(oHacksMenu, "116", 9035);
			addmnu(oHacksMenu, "117", 9036);
			addmnu(oHacksMenu, "118", 9037);
			addmnu(oHacksMenu, "119", 9038);
			addmnu(oHacksMenu, "120", 9039);
			addmnu(oHacksMenu, "121", 9040);
			addmnu(oHacksMenu, "122", 9041);
			addmnu(oHacksMenu, "123", 9042);
			addmnu(oHacksMenu, "124", 9043);
			addmnu(oHacksMenu, "125", 9044);
			addmnu(oHacksMenu, "126", 9045);
			addmnu(oHacksMenu, "127", 9046);
			addmnu(oHacksMenu, "128", 9047);
			addmnu(oHacksMenu, "129", 9048);
			addmnu(oHacksMenu, "MAC Filter", 9049);
			addmnu(oHacksMenu, "WEP configuration", 9050);
			addmnu(oHacksMenu, "WPA configuration", 9051);
			addmnu(oHacksMenu, "MAC Filter", 9052);
			addmnu(oHacksMenu, "Hotspot", 9053);
			addmnu(oHacksMenu, "135", 9054);
			addmnu(oHacksMenu, "Internet access", 9055);
			addmnu(oHacksMenu, "137", 9056);
			addmnu(oHacksMenu, "138", 9057);
			addmnu(oHacksMenu, "Status", 9058);
			addmnu(oHacksMenu, "140", 9059);
			addmnu(oHacksMenu, "141", 9060);
			addmnu(oHacksMenu, "Software Information", 9061);
			addmnu(oHacksMenu, "USB Information", 9062);
			addmnu(oHacksMenu, "Connection Status", 9063);
			addmnu(oHacksMenu, "Phone Number Selection", 9064);
			addmnu(oHacksMenu, "Phone Number Selection", 9065);
			addmnu(oHacksMenu, "Versions of Software Componants", 9066);
			addmnu(oHacksMenu, "Phone Number Selection", 9067);
			addmnu(oHacksMenu, "SIP Stack Selection", 9068);
			addmnu(oHacksMenu, "DHCP relay", 9069);
			addmnu(oHacksMenu, "DNS & default gateway", 9070);
			addmnu(oHacksMenu, "Remote help desk", 9071);
			addmnu(oHacksMenu, "Ping (ICMP Echo)", 9072);
			addmnu(oHacksMenu, "PVC Scan", 9073);
			addmnu(oHacksMenu, "OAM Ping", 9074);
			addmnu(oHacksMenu, "Interfaces", 9075);
			addmnu(oHacksMenu, "Traffic", 9076);
			addmnu(oHacksMenu, "ADSL statistics", 9077);
			addmnu(oHacksMenu, "DHCP statistics", 9078);
			addmnu(oHacksMenu, "Calls statistics", 9079);
			addmnu(oHacksMenu, "161", 9080);
			addmnu(oHacksMenu, "162", 9081);
			addmnu(oHacksMenu, "163", 9082);
			addmnu(oHacksMenu, "164", 9083);
			addmnu(oHacksMenu, "firmware upgrade", 9084);
			addmnu(oHacksMenu, "Restore configuration", 9085);
			addmnu(oHacksMenu, "Save configuration", 9086);
		}
	}



	// enlarge meny
	var oStyle = document.createElement('style');
	oStyle.type = "text/css";
	oStyle.innerHTML = 'td.meny { width: 200px; } ';
	document.body.appendChild(oStyle);
})();
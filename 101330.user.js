// ==UserScript==
// @name           Ikariam Ignore
// @namespace      Ikariam Ignore
// @description    Lisää ignore-toiminnon postilaatikkoon
// @include        http://s*.fi.ikariam.com/index.php*
// ==/UserScript==

GM_registerMenuCommand("Muokkaa Ignore-listaa",editIgnore);

function editIgnore()
	{
	if (GM_getValue("ignore") == undefined) { var text = ""; }
	else { var text = GM_getValue("ignore"); }
	var p = prompt("Kirjoita listaan pelaajien nimet, joiden viestit haluat piilottaa postilaatikostasi, pilkuilla eroteltuina.",text);
	if (p != null)
		{
		GM_setValue("ignore",p);
		location.href=location.href;
		}
	}

if (GM_getValue("ignore") != undefined)
	{
	if (GM_getValue("ignore").match(",") != null) {	var ignoreArray = GM_getValue("ignore").split(","); }
	else { var ignoreArray = [GM_getValue("ignore")]; }

	if (document.body.id == "diplomacyAdvisor")
		{
		var table = document.getElementsByTagName("table")[1];
		for (i=1; i<=10; i++)
			{
			if (i == 1) { var z = 1; }
			if (i == 2) { var z = 4; }
			if (i == 3) { var z = 7; }
			if (i == 4) { var z = 10; }
			if (i == 5) { var z = 13; }
			if (i == 6) { var z = 16; }
			if (i == 7) { var z = 19; }
			if (i == 8) { var z = 22; }
			if (i == 9) { var z = 25; }
			if (i == 10) { var z = 28; }
			var senderName = table.rows[z].cells[2].innerHTML.split('<a href="#">')[1].split('</a>')[0];
			for (x=0; x<=ignoreArray.length-1;x++)
				{
				if (senderName == ignoreArray[x])
					{
					table.rows[z].style.display="none";
					}
				}
			}
		}
	}
//
// GreaseMonkey Script
// Author: Lukas Brueckner, based on the Armory Script by Lachlan Maxwell
//
//
// If you find any bugs, have any suggestions or comments
// please email me at Jakob_Doubleday@hotmail.com
//
// Thanks go to Lachlan Maxwell for his KoC Armory and Battlefield scripts
//
// KoC age 11 selloff values and weapons edited by Jbulldog25.


// ==UserScript==
// @name		KoC Armory Selloff
// @description		This shows the value on the top left side of the armory page.
// @include		http://*kingsofchaos.com/armory.php*
// ==/UserScript==


(function(){


	function foreach(stuff, f){
		for(var i=0; i < stuff.length; i++)
		{
			var stop_iter = f(stuff[i]);
			if (stop_iter) return;
		}
	}

	function addCSS(){
		var head = document.getElementsByTagName("head")[0];
		if(!head) return; // D'oh!

		var style = document.createElement("style");
		style.type = "text/css";
		var s = "";
		foreach(arguments, function(style){s+=style+"\n";});
		style.innerHTML = s;
		head.appendChild(style);
	}

	function addCommas( sValue )
	{
		sValue = String(sValue);
		var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
		
		while(sRegExp.test(sValue)) {
			sValue = sValue.replace(sRegExp, '$1,$2');
		}
		return sValue;
	}
	
	var WeaponValues = new Array(
		"637500",
		"337500",
		"562500",
		"150000",
		"337500",
		"168750",
		"300000",
		"187500",
		"435000",
		"750",
                "37500",
                "3825",
                "150",
                "37500",
                "12300",
                "3825",
                "2400",
                "1500",
                "21600",
                "84000",
                "45000",
                "24000",
                "90000",
                "52500"
	);

	var WeaponNames = new Array(
		"Blackpowder Missile",
		"Chariot",
		"Invisibility Shield",
		"Dragonskin",
		"Skeleton Key",
		"Grappling Hook",
		"Lookout Tower",
		"Guard Dog",
		"Nunchaku",
		"Knife",
                "Dragon Claw",
                "Scimitar",
                "Stick",
                "Mist Veil",
                "Plate Armor",
                "Chainmail",
                "Shield",
                "Helmet",
                "Rope",
                "Tripwire",
                "Horn",
                "Big Candle",
                "Cloak",
                "Dirk"
	);


var tables = document.getElementsByTagName('table');

var totalValue = 0;

for(var i = 0; i < tables.length; i++)
{
	if(tables[i].className == 'table_lines' && tables[i].rows[0].innerHTML.indexOf('Current Weapon Inventory') != -1)
	{
		var inventory = tables[i].rows;
		
		for(var j = 0; j < inventory.length; j++)
		{
			for(var g = 0; g < WeaponNames.length; g++)
			{
				if(inventory[j].cells[0].innerHTML == WeaponNames[g])
				{
					//GM_log('found ' + WeaponNames[g] + inventory[j].cells[1].innerHTML);
					var quantity = inventory[j].cells[1].innerHTML.replace(',', '');
					var thisValue = Number(WeaponValues[g] * quantity);
					totalValue = totalValue + thisValue;
				}
			}
		}

		
		break;
	}
}

for(var i = 0; i < tables.length; i++)
{
	if(tables[i].className == 'table_lines' && tables[i].rows[0].innerHTML.indexOf('Current Tool Inventory') != -1)
	{
		var inventory = tables[i].rows;
		
		for(var j = 0; j < inventory.length; j++)
		{
			for(var g = 0; g < WeaponNames.length; g++)
			{
				if(inventory[j].cells[0].innerHTML == WeaponNames[g])
				{
					//GM_log('found ' + WeaponNames[g] + inventory[j].cells[1].innerHTML);
					var quantity = inventory[j].cells[1].innerHTML.replace(',', '');
					var thisValue = Number(WeaponValues[g] * quantity);
					totalValue = totalValue + thisValue;
				}
			}
		}

		
		break;
	}
}

var worth = document.createElement("div");
worth.id = "_worth";
addCSS(
        	"#_worth {position:fixed; left:0; top:0; font: normal 11px sans-serif; text-align: right;}"
);
worth.innerHTML = addCommas(totalValue);

document.body.appendChild(worth);

//GM_log(totalValue);



})();
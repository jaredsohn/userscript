//
// ARMORY - GreaseMonkey Script
// Author: DANNY ENG, based on the Armory Script by that guy
//
// If you find any bugs, have any suggestions or comments
// please email me at danny4life101@hotmail.com


// ==UserScript==
// @name		SGW Sell Off Calc
// @description		Calculates the total worth of ones armory
// @include		http://*stargatewars.com.com/armory.php*
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
		"555800",
		"144400",
		"599200",
		"48900",
		"208100",
		"17100",
		"74100",
		"6100",
		"19100",
		"5600",
		"9400",
		"3000",
		"3600"
	);

	var WeaponNames = new Array(
		"weapon 13",
		"weapon 12",
		"weapon 11",
		"weapon 10",
		"weapon 9",
		"weapon 8",
		"weapon 7",
		"weapon 6",
		"weapon 5",
		"weapon 4",
		"weapon 3",
		"weapon 2",
		"weapon 1"
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
        	"#_worth {position:fixed; right:0; top:0; font: normal 11px sans-serif; text-align: right;}"
);
worth.innerHTML = addCommas(totalValue);

document.body.appendChild(worth);

//GM_log(totalValue);



})();
//
// KoC Battle Log - GreaseMonkey Script
// Author: Lukas Brueckner
//
// This script will allow you to buy stuff directly from the battle log
//
// If you find any bugs, have any suggestions or comments
// please email me at coding@lukas-brueckner.de
//
// Thanks go to Lachlan Maxwell for his KoC Armory and Battlefield scripts


// ==UserScript==
// @name		KoC Battlelog+
// @description		Display Buy Options
// @include		http://*kingsofchaos.com/detail.php?attack_id=*
// ==/UserScript==


(function(){


	function foreach(stuff, f){
		for(var i=0; i < stuff.length; i++)
		{
			var stop_iter = f(stuff[i]);
			if (stop_iter)
				return;
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
	
	function addJS(){
		var head = document.getElementsByTagName("head")[0];
		if(!head) return; // D'oh!

		var js= document.createElement("script");
		js.type = "text/javascript";
		var s = "";
		foreach(arguments, function(js){s+=js+"\n";});
		js.innerHTML = s;
		head.appendChild(js);
	}
	
	function HidePreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(prefs) prefs.style.display="none";
	}
	function setPreferences(){

        var userprefs=document.getElementsByTagName('input');

		var weapons = '';
        for (var j=0; j < userprefs.length; j++)
        {
          if ((userprefs[j].value >= 0) && (userprefs[j].name.match(/_weap/) != null)) {
            weapons += '[' + userprefs[j].name.substr(5) + ']=' + userprefs[j].value;
			
          }
          if ((userprefs[j].name.match(/_pref/) != null)) {
            GM_setValue(userprefs[j].value, userprefs[j].checked);
          }

        }
		GM_setValue('weapons', weapons);

      }
	  
	function doTwo(event){
		setPreferences();
		HidePreferences();
		event.preventDefault();
	}

	function ShowPreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(!prefs){
			addCSS(
				"#_md_prefs {position:fixed; left:0; right:0; bottom:0; top:auto; width:100%;  color:#ffffff; font: 11px Verdana; border-top:1px #888888 solid; background:#000000;}",
				"#_md_prefs .main { text-align: left;padding:5px 0 0.4em 0; width:800px; margin: auto;}",
				"#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
				"#_md_prefs input[disabled]{background: #CCC;}",
				"#_md_prefs input[type=text] { width: 50px; }",
				".label { widtH: 125px; float: left; }",
				".input { width: 51px; float:right; }",
				".weapon { width: 190px; float: left; margin-right: 2px;}",
				".global { clear: both;}",
				"._gmArPresets { width: 100px; margin-right: 5px; }"
			);

			var prefs = document.createElement("div")
			prefs.id = "_md_prefs";

			var s = "<div class='main'><b>Kings of Chaos :: Battle Log Settings</b><br />";
			foreach(buyprefIDs, function(prefID){
				var checked = (GM_getValue(prefID, false)) ? " checked='checked'" : "";
				s += " &nbsp;<input type='radio' id='"+prefID+"' name='_prefType' value='"+prefID+"'"+checked+">"+prefID;		      })
			s += "<br>For maxPerWeapon, rank the weapons by priority 1 being highest, 100 being lowest<br>For Ratio, enter the ratio of each weapon type<br>";
			var i = 1;
			foreach(WeaponIDs, function(weaponID){
				var checked = weps[weaponID];
				var prettyName = DwarfWeaponNames[weaponID];
				s += "\n<div class='weapon'><span class='label'>" + prettyName + "</span>\n<span class='input'><input type='text' name='_weap"+ weaponID + "' value='"+checked+"'></span></div>\n";

			})
			s += "<br /><input type='submit' id='_close' value='Submit' /></div>";
			prefs.innerHTML = s;
			document.body.appendChild(prefs);
			document.getElementById("_close").addEventListener('click', doTwo, true);
		}
		prefs.style.display="";
	}

      var buyprefIDs = [
        "maxPerWeapon", "Ratio"    ];

	var WeaponIDs = [
"SA2", "SA5", "SA10", "SA20", "SA40", "SA160", "SA640", "SA2560", "SA6000", "SA12000", "DA10", "DA20", "DA40", "DA160", "DA640", "DA2560", "DA10000", "SPY4", "SPY8", "SPY15", "SPY30", "SPY60", "SPY100", "SENTRY4", "SENTRY8", "SENTRY15", "SENTRY30", "SENTRY60", 	];

	var WeaponCosts = {
		SA2: "200",
		SA5: "1000",
		SA10: "1800",
		SA20: "3200",
		SA40: "5100",
		SA160: "16400",
		SA640: "50000",
		SA2560: "180000",
		SA6000: "450000",
        SA12000: "850000",
		DA10: "2000",
		DA20: "3200",
		DA40: "5100",
		DA160: "16400",
		DA640: "50000",
		DA2560: "200000",
        DA10000: "750000",
		SPY4: "36000",
		SPY8: "70000",
		SPY15: "120000",
		SPY30: "225000",
		SPY60: "450000",
		SPY100: "725000",
		SENTRY4: "40000",
		SENTRY8: "75000",
		SENTRY15: "140000",
		SENTRY30: "250000",
		SENTRY60: "500000",
	}
	var DwarfWeaponNames = {
		SA2: "Sticks",
		SA5: "Knives",
		SA10: "Hatchets",
		SA20: "Pikes",
		SA40: "Maces",
		SA160: "WarHammers",
		SA640: "Hammer of Thors",
		SA2560: "Battle Axes",
		SA6000: "Chariots",
        SA12000: "Black Powder Missiles",
		DA10: "Helmets",
		DA20: "Shields",
		DA40: "Chainmails",
		DA160: "Plate Mails",
		DA640: "Gauntlets",
		DA2560: "Dragonskins",
        DA10000: "Invisibility Shields",
		SPY4: "Ropes",
		SPY8: "Dirks",
		SPY15: "Cloaks",
		SPY30: "Grappling Hooks",
		SPY60: "Skeleton Keys",
		SPY100: "Nunchakus",
		SENTRY4: "Big Candles",
		SENTRY8: "Horns",
		SENTRY15: "Tripwires",
		SENTRY30: "Guard Dogs",
		SENTRY60: "Lookout Towers",
	}
	var BuyWeaponInputs = {
        'buy_weapon[69]': "SA2",
        'buy_weapon[3]': "SA5",
        'buy_weapon[9]': "SA10",
        'buy_weapon[13]' : "SA20",
        'buy_weapon[17]' : "SA40",
        'buy_weapon[21]' : "SA160",
        'buy_weapon[25]' : "SA640",
        'buy_weapon[29]' : "SA2560",
        'buy_weapon[72]' : "SA6000",
        'buy_weapon[70]' : "SA12000",
        'buy_weapon[34]' : "DA10",
        'buy_weapon[38]' : "DA20",
        'buy_weapon[41]' : "DA40",
        'buy_weapon[45]' : "DA160",
        'buy_weapon[48]' : "DA640",
        'buy_weapon[51]' : "DA2560",
        'buy_weapon[71]' : "DA10000",
        'buy_weapon[58]' : "SPY4",
        'buy_weapon[63]' : "SPY8",
        'buy_weapon[65]' : "SPY15",
        'buy_weapon[67]' : "SPY30",
        'buy_weapon[73]' : "SPY60",
        'buy_weapon[62]' : "SENTRY4",
        'buy_weapon[64]' : "SENTRY8",
        'buy_weapon[66]' : "SENTRY15",
        'buy_weapon[68]' : "SENTRY30",
        'buy_weapon[74]' : "SENTRY60",
		'buy_weapon[75]' : "SPY100",
      }

GM_registerMenuCommand("KOC Battlelog Prefs...", ShowPreferences);

var base = 0;
var quant = new Array();
foreach(WeaponIDs, function(weaponID){
	quant[weaponID] = 0;
});

var weps = new Array();

var WeaponsperUnit = {
}
var GlobalPrefs = {
}
var PerWeaponPriority = {
}
foreach(buyprefIDs, function(prefID){
				GlobalPrefs[prefID] = GM_getValue(prefID, false);
})

const goldRE=/Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+[^<]+\</ig;
const trRE=/\<tr\>/ig;
cands=document.getElementsByTagName("tr");

for(i=1;i<cands.length;i++){
	if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(goldRE)!=null){
		var result = cands[i].innerHTML.match(goldRE);
            if(result != null) {
              var gold = result[0];
              gold = gold.replace(/Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+/, "");
              gold = gold.replace(/\</, "");
              gold=gold.replace(/,/g, "");
             }
       }
}

weapons = GM_getValue('weapons', 0).split('[');
for(var i = 1 ; i < weapons.length; i++){
	weps[weapons[i].substring(0, weapons[i].indexOf(']'))] = weapons[i].substring(weapons[i].indexOf(']=') + 2);
}

if (GlobalPrefs['Ratio']) {
	foreach(WeaponIDs, function(weaponID){
		var num = weps[weaponID];
		WeaponsperUnit[weaponID] = num;
		base = base + Number(num);
	})
	var ratio = 0;
	foreach(WeaponIDs, function(weaponID){
		ratio = (WeaponsperUnit[weaponID] / base * gold) / WeaponCosts[weaponID];
		quant[weaponID] = isFinite(Math.floor(ratio)) ? Math.floor(ratio) : 0;
	})
}
if (GlobalPrefs['maxPerWeapon']) {
	foreach(WeaponIDs, function(weaponID){
		var num = weps[weaponID];
		PerWeaponPriority[num] = weaponID;
	})
	for(i=1;i<101;i++){
		if (PerWeaponPriority[i] != null) {
			var weaponID = PerWeaponPriority[i];
			var maxWeaponN = gold/WeaponCosts[weaponID];
			maxWeaponN = Math.floor(maxWeaponN);
			quant[weaponID] = maxWeaponN;
			gold = gold - maxWeaponN*WeaponCosts[weaponID];
		}
    }
}


q = document.getElementsByTagName('form');

var armory = document.createElement('form');
armory.method = 'post';
armory.action = 'armory.php';
armory.name = 'buyform';
armory.innerHTML = '<table class="table_lines" border="0" cellpadding="6" cellspacing="0" width="50%" style="float:left;">' +
'	<tbody><tr>' +
'		<th colspan="5">Buy Weapons</th>' +
'	</tr>' +
'				<tr>' +
'		<th class="subh" align="left">Attack Weapons' +
'		</th><th class="subh" align="right">Strength' +
'		</th><th class="subh" align="right">Price' +
'		</th><th class="subh">Buy' +
'	</th></tr>' +
'		<tr>' +
'		<td>Stick</td>' +
'		<td align="right">2</td>' +
'		<td align="right">200 Gold</td>' +
'				<td align="center"><input name="buy_weapon[69]" value="' + quant['SA2'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Knife</td>' +
'		<td align="right">5</td>' +
'		<td align="right">1,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[3]" value="' + quant['SA5'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Hatchet</td>' +
'		<td align="right">10</td>' +
'		<td align="right">1,800 Gold</td>' +
'				<td align="center"><input name="buy_weapon[9]" value="' + quant['SA10'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Pike</td>' +
'		<td align="right">20</td>' +
'		<td align="right">3,200 Gold</td>' +
'				<td align="center"><input name="buy_weapon[13]" value="' + quant['SA20'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Mace</td>' +
'		<td align="right">40</td>' +
'		<td align="right">5,100 Gold</td>' +
'				<td align="center"><input name="buy_weapon[17]" value="' + quant['SA40'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Warhammer</td>' +
'		<td align="right">160</td>' +
'		<td align="right">16,400 Gold</td>' +
'				<td align="center"><input name="buy_weapon[21]" value="' + quant['SA160'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Hammer Of Thor</td>' +
'		<td align="right">640</td>' +
'		<td align="right">50,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[25]" value="' + quant['SA640'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Battle Axe</td>' +
'		<td align="right">2,560</td>' +
'		<td align="right">180,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[29]" value="' + quant['SA2560'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Chariot</td>' +
'		<td align="right">6,000</td>' +
'		<td align="right">450,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[72]" value="' + quant['SA6000'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Blackpowder Missile</td>' +
'		<td align="right">12,000</td>' +
'		<td align="right">850,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[70]" value="' + quant['SA12000'] + '" size="3" type="text"></td>' +
'	</tr>' +
'				<tr>' +
'		<th class="subh" align="left">Defense Weapons' +
'		</th><th class="subh" align="right">Strength' +
'		</th><th class="subh" align="right">Price' +
'		</th><th class="subh">Buy' +
'	</th></tr>' +
'		<tr>' +
'		<td>Helmet</td>' +
'		<td align="right">10</td>' +
'		<td align="right">2,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[34]" value="' + quant['DA10'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Shield</td>' +
'		<td align="right">20</td>' +
'		<td align="right">3,200 Gold</td>' +
'				<td align="center"><input name="buy_weapon[38]" value="' + quant['DA20'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Chainmail</td>' +
'		<td align="right">40</td>' +
'		<td align="right">5,100 Gold</td>' +
'				<td align="center"><input name="buy_weapon[41]" value="' + quant['DA40'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Plate Armor</td>' +
'		<td align="right">160</td>' +
'		<td align="right">16,400 Gold</td>' +
'				<td align="center"><input name="buy_weapon[45]" value="' + quant['DA160'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Gauntlets</td>' +
'		<td align="right">640</td>' +
'		<td align="right">50,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[48]" value="' + quant['DA640'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Dragonskin</td>' +
'		<td align="right">2,560</td>' +
'		<td align="right">200,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[51]" value="' + quant['DA2560'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Invisibility Shield</td>' +
'		<td align="right">10,000</td>' +
'		<td align="right">750,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[71]" value="' + quant['DA10000'] + '" size="3" type="text"></td>' +
'	</tr>' +
'				</table><table class="table_lines" border="0" cellpadding="6" cellspacing="0" width="50%" style="float:right;">' + 
' <tr><th colspan="5">Buy Tools</th></tr>' +
'		<tr>' +
'		<th class="subh" align="left">Spy Tools' +
'		</th><th class="subh" align="right">Strength' +
'		</th><th class="subh" align="right">Price' +
'		</th><th class="subh">Buy' +
'	</th></tr>' +
'		<tr>' +
'		<td>Rope</td>' +
'		<td align="right">4</td>' +
'		<td align="right">36,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[58]" value="' + quant['SPY4'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Dirk</td>' +
'		<td align="right">8</td>' +
'		<td align="right">70,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[63]" value="' + quant['SPY8'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Cloak</td>' +
'		<td align="right">15</td>' +
'		<td align="right">120,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[65]" value="' + quant['SPY15'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Grappling Hook</td>' +
'		<td align="right">30</td>' +
'		<td align="right">225,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[67]" value="' + quant['SPY30'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Skeleton Key</td>' +
'		<td align="right">60</td>' +
'		<td align="right">450,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[73]" value="' + quant['SPY60'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Nunchaku</td>' +
'		<td align="right">100</td>' +
'		<td align="right">725,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[75]" value="' + quant['SPY100'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<th class="subh" align="left">Sentry Tools' +
'		</th><th class="subh" align="right">Strength' +
'		</th><th class="subh" align="right">Price' +
'		</th><th class="subh">Buy' +
'	</th></tr>' +
'		<tr>' +
'		<td>Big Candle</td>' +
'		<td align="right">4</td>' +
'		<td align="right">40,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[62]" value="' + quant['SENTRY4'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Horn</td>' +
'		<td align="right">8</td>' +
'		<td align="right">75,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[64]" value="' + quant['SENTRY8'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Tripwire</td>' +
'		<td align="right">15</td>' +
'		<td align="right">140,000 Gold</td>' +
'		<td align="center"><input name="buy_weapon[66]" value="' + quant['SENTRY15'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Guard Dog</td>' +
'		<td align="right">30</td>' +
'		<td align="right">250,000 Gold</td>' +
'		<td align="center"><input name="buy_weapon[68]" value="' + quant['SENTRY30'] + '" size="3" type="text"></td>' +
'	</tr>' +
'		<tr>' +
'		<td>Lookout Tower</td>' +
'		<td align="right">60</td>' +
'		<td align="right">500,000 Gold</td>' +
'				<td align="center"><input name="buy_weapon[74]" value="' + quant['SENTRY60'] + '" size="3" type="text"></td>' +
'	</tr>' +
'			<tr>' +
'		<td colspan="5" align="center">Copy the lowercase letters below into the adjacent box.<br><a href="#" id="capstr" onclick="newcap(); return false;" style="">can\'t read the image</a></td>' +
'	</tr>' +
'	<tr>' +
'		<td colspan="3" align="center"><img id="curcap" onclick="newcap();" src="chk/turing.image.php?0da09b"></td>' +
'		<td colspan="2" align="center"><input name="turing" type="text"></td>' +
'	</tr>' +
'	<tr>' +
'		<td colspan="5" align="center"><input name="buybut" value="Buy Weapons" onclick="document.buyform.buybut.value=\'Buying..\'; document.buyform.buybut.disabled=true; document.buyform.submit();" type="submit"></td>' +
'	</tr>' +
'</tbody></table>' +
'<input name="hash" value="" type="hidden"><div style="clear:both;height:1px;"></div>';
q[0].parentNode.insertBefore(armory, q[0].nextSibling);	

document.getElementsByName("turing")[0].focus();

})();
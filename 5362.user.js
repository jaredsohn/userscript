//
// Armory Auto-Calc - GreaseMonkey Script
// Author: Lachlan Maxwell
// Edited by Lukas Brueckner (reorganized settings, extended script etc.)
//
// This script will auto-calculate your purchases, and fill in the buy fields
// It also filters out some of the page (no adds are removed) to make it smaller
//
// If you find any bugs, have any suggestions or comments
// please email me at coding@lukas-brueckner.de <- maintainer
// or at greasemonkey@clan-maxwell.us <- old creator
//


// ==UserScript==
// @name		KOC Armory
// @description		Auto Calcs and filters page
// @include		http://*kingsofchaos.com/armory.php*
// ==/UserScript==


(function(){

// these are the things you will probably want to play with.
// removeTables defaults to 1, setting it to 0 will make it so all the tables appear
const removeTables = 1;
const filterWeapons = 1;
const maxKnives = 0;// maxKnives sets whether or not to spend extra money banking SA5
const purchaseRE=/(Invisibility Shield|Tower|Key|Missile|Nunchaku)/ig;// change purchaseRE to list all the weapons you want to buy, I tend to only buy the big ones
const keepTablesRE=/(Buy|Turns|Training|Personnel)/g;// Add the titles of tables you want to keep to this list

// These you probably don't want to change
const weaponRE=/buy_weapon/ig;
const trRE=/\<tr\>/ig;
const mainTableRE=/\<tbody\>/ig;
const adTableRE=/img src/ig;
	String.prototype.trim = function() {
		return this.replace(/^\s*(.*)/, "$1").replace(/(.*)\s*$/, "$1");}

	String.prototype.template = function(vars){
		return this.replace(
			/\{(\w*)\}/g,
			function(match,submatch,index){return vars[submatch];}
		) };

	function foreach(stuff, f){ for(var i=0; i < stuff.length; i++) {
		var stop_iter = f(stuff[i]);if (stop_iter) return;} }

	function foreach_dict(stuff, f){ for(var name in stuff){
		var stop_iter = f(name, stuff[name]);if (stop_iter) return;} }

	function selectNodes(xpath, elem){
		var results = document.evaluate(
			xpath, elem || document, null,
			XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)

		var nodes = new Array();var result = null;
		while(result = results.iterateNext()) nodes.push(result);
		return nodes;
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
	function HidePreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(prefs) prefs.style.display="none";
	}
	function setPreferences(){

        var userprefs=document.getElementsByTagName('input');

        for (var j=0; j < userprefs.length; j++)
        {
          if ((userprefs[j].value >= 0) && (userprefs[j].name.match(/_armory_pref/) != null)) {
            GM_setValue(userprefs[j].name, Number(userprefs[j].value));
          }
          if ((userprefs[j].name.match(/_ar_pref/) != null)) {
            GM_setValue(userprefs[j].value, userprefs[j].checked);
          }

        }

      }
	  
	function doTwo(event){
		setPreferences();
		HidePreferences();
		event.preventDefault();
	}

	function save(event){
		var presetNr = Number(event.currentTarget.id.substr(-1, 1));
		
		var q = document.getElementsByTagName('input');
		var preset = '';
		var prefs = '[';
		
		for(var i = 0; i < q.length; i++){
			if(q[i].name.indexOf('_armory_pref') != -1){
				var wName = q[i].name.substr(12);
				preset += wName + ':' + q[i].value + ';';
			}
			else if(q[i].name.indexOf('_ar_pref') != -1){
				prefs += q[i].value + ':' + q[i].checked + ';';
			}
		}
		GM_setValue('preset'+presetNr, prefs+']'+preset);
	}
	function load(event){
		var presetNr = Number(event.currentTarget.id.substr(-1, 1));
		var temp = GM_getValue('preset'+presetNr, '').split(']');
		var prefs = temp[0].substr(1).split(';');
		var weapons = temp[1].split(';');
		if(weapons.length == 1)
			alert('This Preset has not been defined yet');
		for(var i = 0; i < weapons.length-1; i++){
			var input = document.getElementsByName('_armory_pref' + (weapons[i].substr(0, weapons[i].indexOf(':'))));
			input[0].value = weapons[i].substr(weapons[i].indexOf(':') + 1);
		}
		
		for(var i = 0; i < prefs.length-1; i++){
			var prefName = prefs[i].substr(0, prefs[i].indexOf(':'));
			var input = document.getElementsByName('_ar_pref' + prefName);
			
			if(input[0] == undefined)
				input[0] = document.getElementById(prefName);
			var checked = prefs[i].substr(prefs[i].indexOf(':') + 1);
			input[0].checked = checked == 'true' ? true : false;
		}
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

			var s = "<div class='main'><b>Kings of Chaos :: Armory Settings</b><br />";
			foreach(buyprefIDs, function(prefID){
				var checked = (GM_getValue(prefID, false)) ? " checked='checked'" : "";
				s += " &nbsp;<input type='radio' id='"+prefID+"' name='_ar_prefType' value='"+prefID+"'"+checked+">"+prefID;		      })
			s += "<br>For maxPerWeapon, rank the weapons by priority 1 being highest, 100 being lowest<br>For Ratio, enter the ratio of each weapon type<br>";
			var i = 1;
			foreach(WeaponIDs, function(weaponID){
				var checked = (GM_getValue("_armory_pref"+weaponID, 0));
				var prettyName = DwarfWeaponNames[weaponID];
				s += "\n<div class='weapon'><span class='label'>" + prettyName + "</span>\n<span class='input'><input type='text' name='_armory_pref"+ weaponID + "' value='"+checked+"'></span></div>\n";

			})
			s += "<br /><div class='global'>";
			foreach(globalprefIDs, function(prefID){
				var checked = (GM_getValue(prefID, false)) ? " checked='checked'" : "";
				s += " &nbsp;<input type='checkbox' name='_ar_pref"+prefID+"' value='"+prefID+"'"+checked+">"+prefID;		            })
			s += "</div>Presets: (loading a preset will not apply it automatically, you will still have to submit it)<br /><input class='_gmArPresets' type='submit' id='_presetSave1' value='Save as Preset 1' /><input class='_gmArPresets' type='submit' id='_presetSave2' value='Save as Preset 2' /><input class='_gmArPresets' type='submit' id='_presetSave3' value='Save as Preset 3' /><br />";
			s += "<input type='submit' class='_gmArPresets' id='_presetLoad1' value='Load Preset 1' /><input class='_gmArPresets' type='submit' id='_presetLoad2' value='Load Preset 2' /><input class='_gmArPresets' type='submit' id='_presetLoad3' value='Load Preset 3' /><br /><br /><input type='submit' id='_armory_close' value='Submit' />";

			s += "</div>";
			prefs.innerHTML = s;
			document.body.appendChild(prefs);

			document.getElementById("_armory_close").addEventListener('click', doTwo, true);
			document.getElementById("_presetSave1").addEventListener('click', save, true);
			document.getElementById("_presetSave2").addEventListener('click', save, true);
			document.getElementById("_presetSave3").addEventListener('click', save, true);
			document.getElementById("_presetLoad1").addEventListener('click', load, true);
			document.getElementById("_presetLoad2").addEventListener('click', load, true);
			document.getElementById("_presetLoad3").addEventListener('click', load, true);
		}
		prefs.style.display="";
	}
      var buyprefIDs = [
        "maxPerWeapon", "Ratio"    ];
      var globalprefIDs = [
        "maxKnives", "filterWeapons", "removeTables"     ];

	// These are the sites we can link to.
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

var base = 0;
var WeaponsperUnit = {
}
var GlobalPrefs = {
}
var PerWeaponPriority = {
}
foreach(globalprefIDs, function(prefID){
				GlobalPrefs[prefID] = GM_getValue(prefID, false);
})
foreach(buyprefIDs, function(prefID){
				GlobalPrefs[prefID] = GM_getValue(prefID, false);
})
if (GlobalPrefs['Ratio']) {
  foreach(WeaponIDs, function(weaponID){
				var num = (GM_getValue("_armory_pref"+weaponID, 0));
					WeaponsperUnit[weaponID] = num;
					base = base + Number(num);
  })
}
if (GlobalPrefs['maxPerWeapon']) {
  foreach(WeaponIDs, function(weaponID){
				var num = (GM_getValue("_armory_pref"+weaponID, 0));
                        PerWeaponPriority[num] = weaponID;
  })
}
const goldRE=/Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+[^<]+\</ig;
cands=document.getElementsByTagName("tr");
dumbTables=document.getElementsByTagName("tbody");

function delElement(elem){
	elem.innerHTML="";
	elem.style.display="none";
}
var maxPurchase = {
}
GM_registerMenuCommand("KOC Armory Prefs...", ShowPreferences);
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
if (GlobalPrefs['Ratio']) {

	var ratio = 0;
	foreach(WeaponIDs, function(weaponID){
		ratio = (WeaponsperUnit[weaponID] / base * gold) / WeaponCosts[weaponID];
		WeaponsperUnit[weaponID] = isFinite(Math.floor(ratio)) ? Math.floor(ratio) : 0;
	})
}
if (GlobalPrefs['maxPerWeapon']){
   for(i=1;i<101;i++){
      if (PerWeaponPriority[i] != null) {
          var weaponID = PerWeaponPriority[i];
          var maxWeaponN = gold/WeaponCosts[weaponID];
          maxWeaponN = Math.floor(maxWeaponN);
          maxPurchase[weaponID] = maxWeaponN;
          gold = gold - maxWeaponN*WeaponCosts[weaponID];
      }
    }
}
var q=document.getElementsByTagName('input');

for (var j=0; j < q.length; j++)
{
    var inputWeaponName = BuyWeaponInputs[q[j].name];
    var maxWeaponBuy = maxPurchase[inputWeaponName];
    if (maxWeaponBuy == null)
      maxWeaponBuy = 0;
    if (WeaponsperUnit[inputWeaponName] == null)
      WeaponsperUnit[inputWeaponName] = 0;
    if (q[j].type == 'text' && (WeaponsperUnit[inputWeaponName] + maxWeaponBuy) > 0) {
        q[j].value = WeaponsperUnit[inputWeaponName] + maxWeaponBuy;
    }
 }
if (GlobalPrefs['filterWeapons']) {
  for(i=1;i<cands.length;i++){
	if(cands[i].innerHTML.match(purchaseRE)==null && cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(weaponRE)!=null){
		delElement(cands[i]);}
  }
}
// && dumbTables[i].innerHTML.match(mainTableRE) == null
if (GlobalPrefs['removeTables']) {
  for(i=1;i<dumbTables.length;i++){
       if(dumbTables[i].innerHTML.match(keepTablesRE) == null && dumbTables[i].innerHTML.match(adTableRE) == null )  {
            delElement(dumbTables[i]);}
  }
}
document.getElementsByName("turing")[0].focus();

})();
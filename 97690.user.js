//
// Attack Auto-Fill - GreaseMonkey Script
// Author: steve allen
//
// This script will auto-fill the number of spies to send, number of weapons to sab, attack turns to use and auto-select a specified weapon to sab
//


// ==UserScript==
// @name		Dragons of Atlantis Attack
// @description		Auto Insert Spies to Send
// @include		http://apps.facebook.com/dragonsofatlantis/
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
	function HidePreferences(){
		var prefs = document.getElementById("_md_prefs");
		if(prefs) prefs.style.display="none";
	}
	function setPreferences(){

        var userprefs=document.getElementsByTagName('input');

        for (var j=0; j < userprefs.length; j++)
        {
          if ((userprefs[j].value >= 0) && (userprefs[j].name.match(/_attack_pref/) != null)) {
            GM_setValue(userprefs[j].name, userprefs[j].value);
          }
          if ((userprefs[j].name.match(/_at_pref_numsab/) != null)) {
            GM_setValue(userprefs[j].value, userprefs[j].checked);
            if(userprefs[j].checked == true)
            {
				GM_setValue(userprefs[j].name, userprefs[j].value);
			}
          }

        }

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
				"#_md_prefs div { text-align: left;padding:5px 0 0.4em 0; width:800px; margin: auto;}",
				"#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
				"#_md_prefs input[disabled]{background: #CCC;}",
				"#_md_prefs input[type=text] { width: 50px; }"
			);

			var prefs = document.createElement("div")
			prefs.id = "_md_prefs";

			var s = "<div><b>Kings of Chaos :: Attack Auto-Fill Preferences</b><br />";

			s += "<div style='float:left; width: 50%;'>Please select a Weapon Type that should be selected by default in the Sabotage Mission:<br />";
			for (var i = 0; i < WeaponValues.length; i++)
			{
				var checked = (GM_getValue(WeaponValues[i], false)) ? " checked='checked'" : "";;
				s += WeaponNames[i] + ": <input type='radio' name='_at_pref_numsab' value='" + WeaponValues[i] + "' "+ checked +" /><br />";
			}
			s += "</div><div>The following Options are used to input the number of spies to send, weapons to sabotage and turns to use:<br />"
			for (var i = 0; i < globalprefIDs.length; i++)
			{
				var value = (GM_getValue("_attack_pref_" + globalprefIDs[i], 0));
				s += globalprefIDs[i] + ": <input type='text' name='_attack_pref_" + globalprefIDs[i] + "' value='" + value + "' /><br />";
			}
			s += "</div> &nbsp;<input type='submit' id='_attack_close' value='Submit' />";

			s += "</div>";
			prefs.innerHTML = s;
			document.body.appendChild(prefs);

			document.getElementById("_attack_close").addEventListener('click', doTwo, true);
			}
		prefs.style.display="";
	}
      var globalprefIDs = [
        "numberOfSpies", "numberOfWeapons", "attackTurns"     ];

	var WeaponValues = [
		"70",
		"71",
		"72",
		"51",
	];

	var WeaponNames = [
		"Blackpowder Missile",
		"Invisibility Shield",
		"Chariot",
		"Dragonskin"
	];


GM_registerMenuCommand("KOC Attack Prefs...", ShowPreferences);

var q = document.getElementsByTagName('input');
var o = document.getElementsByTagName('option');

for (var j=0; j < q.length; j++)
{
	if (q[j].type == 'text'){
		if(q[j].name == 'numspies')
			q[j].value = GM_getValue("_attack_pref_numberOfSpies", 1);
		if(q[j].name == 'attacks')
			q[j].value = GM_getValue("_attack_pref_attackTurns", 15);
		if(q[j].name == 'numsab')
			q[j].value = GM_getValue("_attack_pref_numberOfWeapons", 1);
    }
 }
for (var i = 0; i < o.length; i++)
{
	var numsab = GM_getValue("_at_pref_numsab", 0);
	if(o[i].value == numsab)
		o[i].selected = true;
}

document.getElementsByName("turing")[0].focus();

})();
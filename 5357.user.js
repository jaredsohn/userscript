//
// Train Auto-Fill - GreaseMonkey Script
// Author: Lukas Brueckner, based on the Armory Script by Lachlan Maxwell
//
// This script will auto-fill the number of spies to send, number of weapons
// to sab, attack turns to use and auto-select a specified weapon to sab
//
// If you find any bugs, have any suggestions or comments
// please email me at coding@lukas-brueckner.de
//
// Thanks go to Lachlan Maxwell for his KoC Armory and Battlefield scripts



// ==UserScript==
// @name		KoC Training
// @description		Auto-Fill Numbers to Train
// @include		http://*kingsofchaos.com/train.php*
// ==/UserScript==


(function(){

const trRE=/\<tr\>/ig;
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
          if (userprefs[j].name.match(/_tr_pref/) != null && userprefs[j].checked == true) {
          	GM_setValue(userprefs[j].name, userprefs[j].value);
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
				"#_md_prefs div { text-align: left;padding:5px 0 0.4em 0; width: 600px; margin-left: auto; margin-right: auto;}",
				"#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}"
			);

			var prefs = document.createElement("div")
			prefs.id = "_md_prefs";

			var s = "<div><b>Kings of Chaos :: Training Auto-Fill Preferences</b><br />";

			s += "Please select a Training Program:<div style='padding-left: 10px;'>";
			for (var i = 0; i < IDs.length; i++)
			{
				var checked = (program == IDs[i]) ? " checked='checked'" : "";
				s += Names[IDs[i]] + ": <input type='radio' name='_tr_pref_program' value='" + IDs[i] + "' "+ checked +" />";
				if(i % 2 != 0)
					s += '<br />';
			}
			s += "</div><input type='submit' id='_train_close' value='Submit' />";
			s += "</div>";

			prefs.innerHTML = s;
			document.body.appendChild(prefs);

			document.getElementById("_train_close").addEventListener('click', doTwo, true);
			}
		prefs.style.display="";
	}

	var IDs = [
		"attacker",
		"defender",
		"spy",
		"sentry",
		"unattacker",
		"undefender",
	];

	var Costs = {
		'attacker': "2000",
		'defender': "2000",
		'spy': "3500",
		'sentry': "3500",
		'unattacker': "0",
		'undefender': "0",
	}
	var Names = {
		'attacker': "Attack Specialist",
		'defender': "Defense Specialist",
		'spy': "Spy",
		'sentry': "Sentry",
		'unattacker': "Reassign Attack Specialist",
		'undefender': "Reassign Defense Specialist",
	}

    var program = GM_getValue("_tr_pref_program", false);

    const goldRE = /Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+[^<]+\</ig;
    const trainedAttackRE = /Trained Attack Soldiers\<\/b\>\<\/td\>/ig;
    const trainedDefenseRE = /Trained Defense Soldiers\<\/b\>\<\/td\>/ig;
    const untrainedRE = /Untrained Soldiers\<\/b\>\<\/td\>/ig;

    cands = document.getElementsByTagName("tr");

    GM_registerMenuCommand("KoC Training Settings...", ShowPreferences);

    for(i=1;i<cands.length;i++){
        if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(goldRE)!=null){
            var goldResult = cands[i].innerHTML.match(goldRE);
                if(goldResult != null) {
                  var gold = goldResult[0];
                  gold = gold.replace(/Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+/, "");
                  gold = gold.replace(/\</, "");
                  gold=gold.replace(/,/g, "");
                 }
           }
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(trainedAttackRE)!=null){
              var test = cands[i].innerHTML;
              var max = test.split('\n');
              var maxAttacker = max[2].replace(/\<\/.*\>/, "");
              maxAttacker = maxAttacker.replace(/\<[^\>]*\>/, "");
              maxAttacker = maxAttacker.replace(/,/g, "");
              maxAttacker = maxAttacker.replace(/ +/g, "");
           }
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(trainedDefenseRE)!=null){
              var test = cands[i].innerHTML;
              var max = test.split('\n');
              var maxDefender = max[2].replace(/\<\/.*\>/, "");
              maxDefender = maxDefender.replace(/\<[^\>]*\>/, "");
              maxDefender = maxDefender.replace(/,/g, "");
              maxDefender = maxDefender.replace(/ +/g, "");
           }
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(untrainedRE)!=null){
              var test = cands[i].innerHTML;
              var max = test.split('\n');
              var maxUntrained = max[2].replace(/\<\/.*\>/, "");
              maxUntrained = maxUntrained.replace(/\<[^\>]*\>/, "");
              maxUntrained = maxUntrained.replace(/,/g, "");
              maxUntrained = maxUntrained.replace(/ +/g, "");
           }
    }
    var q=document.getElementsByTagName('input');

    for (var j=0; j < q.length; j++)
    {
        if(q[j].name == 'train[' + program + ']')
        {
            var maxValue = gold / Costs[program];
            var realValue;
            if(program == 'attacker' || program == 'defender' || program == 'spy' || program == 'sentry')
            	realValue = (maxValue <= maxUntrained) ? maxValue : maxUntrained;
            else if(program == 'undefender')
            	realValue = (maxValue <= maxDefender) ? maxValue : maxDefender;
            else if(program == 'unattacker')
            	realValue = (maxValue <= maxAttacker) ? maxValue : maxAttacker;
            q[j].value = Math.floor(realValue);
        }
    }
document.getElementsByName("turing")[0].focus();
})();
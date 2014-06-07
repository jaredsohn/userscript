//
// Mercenraies Auto-Fill - GreaseMonkey Script
// Author: Lukas Brueckner
//
// This script will auto-fill in the maximum number of mercenaries that you can buy
//
// If you find any bugs, have any suggestions or comments
// please email me at coding@lukas-brueckner.de
//
// Thanks go to Lachlan Maxwell for his KoC Armory and Battlefield scripts



// ==UserScript==
// @name		KoC Mercenaries
// @description		Auto-Fill Numbers to Buy
// @include		http://*kingsofchaos.com/mercs.php*
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
		"attack",
		"defend",
		"general",
	];

	var Costs = {
		'attack': "4500",
		'defend': "4500",
		'general': "3500",
	}
	var Names = {
		'attack': "Attack Specialist",
		'defend': "Defense Specialist",
		'general': "Untrained",
	}

    var program = GM_getValue("_tr_pref_program", false);

    const goldRE = /Gold:\<\/td\>\<td style="font-size: 8pt.*font color=["#]+\d+[">]+[^<]+\</ig;
    const availDefRE = /Defense Specialist\<\/td\>/ig;
    const availAttackRE = /Attack Specialist\<\/td\>/ig;
    const availGerneralRE = /Untrained\<\/td\>/ig;

    cands = document.getElementsByTagName("tr");

    GM_registerMenuCommand("KoC Merc Settings...", ShowPreferences);

	var max = new Array();
	
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
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(availDefRE)!=null){
              var test = cands[i].innerHTML;
              var maxi = test.split('\n');
              max['defend'] = maxi[3].replace(/\<\/.*\>/, "");
              max['defend'] = max['defend'].replace(/\<[^\>]*\>/, "");
              max['defend'] = max['defend'].replace(/,/g, "");
              max['defend'] = max['defend'].replace(/ +/g, "");
           }
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(availAttackRE)!=null){
              var test = cands[i].innerHTML;
              var maxi = test.split('\n');
              max['attack'] = maxi[3].replace(/\<\/.*\>/, "");
              max['attack'] = max['attack'].replace(/\<[^\>]*\>/, "");
              max['attack'] = max['attack'].replace(/,/g, "");
              max['attack'] = max['attack'].replace(/ +/g, "");
           }
        else if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(availGerneralRE)!=null){
              var test = cands[i].innerHTML;
              var maxi = test.split('\n');
              max['general'] = maxi[3].replace(/\<\/.*\>/, "");
              max['general'] = max['general'].replace(/\<[^\>]*\>/, "");
              max['general'] = max['general'].replace(/,/g, "");
              max['general'] = max['general'].replace(/ +/g, "");
           }
    }
    var q=document.getElementsByTagName('input');
    for (var j=0; j < q.length; j++)
    {
        if(q[j].name == 'mercs[' + program + ']')
        {
            var maxValue = gold / Costs[program];
            var realValue;
			//GM_log(maxValue + max['general'].trim() + max['attack'].trim());
            realValue = (maxValue <= max[program].trim()) ? maxValue : max[program].trim();
			realValue = isNaN(realValue) ? 0 : realValue;
            q[j].value = Math.floor(realValue);
        }
    }
	
	document.getElementsByName("turing")[0].focus();
})();
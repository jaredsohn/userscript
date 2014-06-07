//
// Kings of Chaos Battlefield - GreaseMonkey Script xTended
// Author: Lachlan Maxwell
// Co-Author: Lukas Brueckner (Added some features)
//
//
// If you find any bugs, have any suggestions or comments
// please email me at greasemonkey@clan-maxwell.us
// or at coding@lukas-brueckner.de
//


// ==UserScript==
// @name		KoC Battlefield xTended
// @description		Filter Battlefield results
// @include		http://*kingsofchaos.com/battlefield.php*
// ==/UserScript==


(function(){

const bsRE=/\?\?\? Gold/ig;
const goldRE=/>([0-9,]+) Gold/ig;
const trRE=/\<tr\>/ig;
cands=document.getElementsByTagName("tr");
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
          if ((userprefs[j].value >= 0) && (userprefs[j].name.match(/_battlefield_pref/) != null)) {
            GM_log(userprefs[j].value);
            GM_setValue(userprefs[j].name, userprefs[j].value);
          }
          if ((userprefs[j].name.match(/_bf_pref/) != null)) {
            GM_setValue(userprefs[j].value, userprefs[j].checked);
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
				"#_md_prefs {position:fixed; left:0; right:0; bottom:0; top:auto; width:100%;  color:black; font: normal 11px sans-serif;}",
				"#_md_prefs div {text-align:center; padding:5px 0 0.4em 0; border-top:1px #aaf solid; background:#eee;}",
				"#_md_prefs button {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
				"#_md_prefs button[disabled]{background: #CCC;}"
			);

			var prefs = document.createElement("div")
			prefs.id = "_md_prefs";

			var s = "<div><b>KOC Battlefield</b>";
			foreach(bfprefIDs, function(prefID){
				var checked = (GM_getValue(prefID, false)) ? " checked='checked'" : "";
				s += " &nbsp;<input type='checkbox' name='_bf_pref' value='"+prefID+"'"+checked+"}>"+prefID;		      })
			s += "<br>";
			foreach(bfinputIDs, function(inputID){
				var checked = (GM_getValue("_battlefield_pref"+inputID, 0));
				s += " &nbsp;" + inputID + " <input type='text' name='_battlefield_pref"+ inputID + "' value='"+checked+"'>";
			})
			s += "<br>";
			s += " &nbsp;<button id='_battlefield_close'>Submit</button>";

			s += "</div>";
			prefs.innerHTML = s;
			document.body.appendChild(prefs);

			document.getElementById("_battlefield_close").addEventListener('click', doTwo, true);
			}
		prefs.style.display="";
	}
      var bfprefIDs = [
        "ignoreInvis"   ];
      var bfinputIDs = [
        "minGold",
        "minArmySize",
        "maxArmySize"   ];
function delElement(elem){
	elem.innerHTML="";
	elem.style.display="none";
}
var BattleFieldPrefs = {
};
var foo = {
}
var targetfoo = {
}
var urlfoo = {
}
GM_registerMenuCommand("KOC Battlefield Prefs...", ShowPreferences);
foreach(bfinputIDs, function(prefID){
	var prefValue = (GM_getValue("_battlefield_pref"+prefID, 0));
      BattleFieldPrefs[prefID] = prefValue;
})
foreach(bfprefIDs, function(prefID){
	var prefValue = GM_getValue(prefID, false);
      BattleFieldPrefs[prefID] = prefValue;
})
if (BattleFieldPrefs['ignoreInvis']) {
  var ignoreInvis = 1;
}
var target = ""
var gold = "";
var minimumGold = parseInt(BattleFieldPrefs['minGold']);
var minArmySize = parseInt(BattleFieldPrefs['minArmySize']);
var maxArmySize = (parseInt(BattleFieldPrefs['maxArmySize']) == 0) ? 9999999 : parseInt(BattleFieldPrefs['maxArmySize']);

var testRE = /\<td colspan=\"2\"\>(\<a href=\"battlefield.php|&nbsp;)/ig;

for(i=1;i<cands.length;i++){
    if (cands[i].innerHTML.match(trRE)==null) {
        if(cands[i].innerHTML.match(bsRE)!=null && ignoreInvis == 1){
            delElement(cands[i]);
        }
        else
        {
            var inforegex = /\<a href=\"stats\.php\?id=\d+.*\"\>([a-zA-Z0-9_-]+)\<\/a\>\<\/td\>[^<]*\<td align=\"right\"\>([^<]+)\<\/td\>[^<]*\<td align=\"left"\>[^A-Z]*(\w+)[^<]*\<\/td\>[^<]*\<td[^>]*\>([0-9,?]+) Gold/;
            var regexresult=inforegex.exec(cands[i].innerHTML);
            if (regexresult != null) {
                target = regexresult[1];
                var army_size = regexresult[2];
                var race = regexresult[3]
                gold = regexresult[4];
                gold = gold.replace(/,/g, "");
                army_size = army_size.replace(/,/g, "");
                if (parseInt(gold) < minimumGold) {
                    delElement(cands[i]);
                }
                if (parseInt(army_size) < minArmySize) {
                    delElement(cands[i]);
                }
                if (parseInt(army_size) > maxArmySize) {
                    delElement(cands[i]);
                }
            }
        }
    }
    if(cands[i].innerHTML.match(trRE)==null && cands[i].innerHTML.match(testRE))
    {
        var test = cands[i].innerHTML.split('\n');
        test[1] = test[1].replace(/\<td colspan=\"2\"\>(\<a href=\"battlefield.php\?start=|&nbsp;)/ig, "");
        test[1] = test[1].replace(/\"\>/ig, "");
        test[1] = test[1].replace(/&lt;&lt; Back\<\/a\>/, "");
        test[1] = test[1].replace(/\<\/td\>/, "");
        test[1] = test[1].replace(/ +/, "");
        test[3] = test[3].replace(/\<td align=\"right\"\>\<a href=\"battlefield.php\?start=/, "");
        test[3] = test[3].replace(/\"\>/, "");
        test[3] = test[3].replace(/Next &gt;&gt;\<\/a\>/, "");
        test[3] = test[3].replace(/\<\/td\>/, "");
        test[3] = test[3].replace(/ +/, "");
        addCSS(
        	"#_jump {position:fixed; left:0; right:0; bottom:0; top:auto; font: normal 11px sans-serif;}"
        );

        var jump = document.createElement("div");
        jump.id = "_jump";

        var d = "<div class='prev'><a href='battlefield.php?start=" + test[1] + "' accesskey='a'>Previous Page</a></div>";
        d += "<div class='next'><a href='battlefield.php?start=" + test[3] + "' accesskey='d'>Next page</a></div>";
        jump.innerHTML = d;
        document.body.appendChild(jump);
    }
}



}
)();
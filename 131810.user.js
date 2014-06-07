// ==UserScript==
// @name           Nexus Clash Remove Spell Gem Color
// @namespace      http://userscripts.org/users/125692
// @description    In the faction safe removes the color from spell gems and resorts them alphabetically
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// ==/UserScript==
(function() {
//some functions
//capitalize first word come across
function ucfirstletter(str){
return str.replace(/\b[A-Za-z]/,function($0) { return $0.toUpperCase(); })
}

//sort a select
//sorts alphabetical of first word of option text
function sortSelect(selElem) {
		var tmpAry = new Array();
        var sellength=selElem.options.length;
		for (var i=0;i<sellength ;i++) {
			tmpAry[i] = new Array();
			tmpAry[i][0] = selElem.options[i].text.replace(/Small [A-Za-z]+ Gem -/,"Spellgem -");//strip color
			tmpAry[i][1] = selElem.options[i].value;
            tmpAry[i][2] = selElem.options[i].selected;
            tmpAry[i][3] = selElem.options[i].className;
		}
		tmpAry.sort(function (a,b){//this needed to ignore case and leading numbers
                var a=a[0].match(/([A-Za-z-,0-9 ]+)/)[1];
                var b=b[0].match(/([A-Za-z-,0-9 ]+)/)[1];//([A-Za-z-,0-9 ]+)
                return a<b?-1:b<a?1:0;
            });
		for (var i=0;i<tmpAry.length;i++) {
            selElem.options[i].text=tmpAry[i][0];
            selElem.options[i].value=tmpAry[i][1];
            selElem.options[i].selected=tmpAry[i][2];
            selElem.options[i].className=tmpAry[i][3];
		}
		return;
	}

//find the safe select
var factionsafe=document.evaluate( "//form[@name='footlockergrab']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (factionsafe.snapshotLength>0){//so we found one. assume its what we want and continue;
    var factionsafeselect=factionsafe.snapshotItem(0).lastElementChild;//should be faction safe.
//resort select which also strips the spell gem colors
    sortSelect(factionsafeselect);

}
//Small Green Gem, 3 shots (5)
//Small Red Gem - Battering Ram, 2 shots (1)
//EOF
})();
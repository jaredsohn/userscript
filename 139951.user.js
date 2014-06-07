// ==UserScript==
// @name  20Deadly
// @description Decode the aliases
// @include http://oilempires.com/*
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /Multi_Accounts_\u005BA\u005D/gi, "Maddyn99_\u005Bs\u005D");
s = s.replace( /Inactive_\u005BA\u005D/gi, "kw255_\u005Bs\u005D");
s = s.replace( /redeploy_all_day_\u005BA\u005D/gi, "Naples_\u005Bs\u005D");
s = s.replace( /CF_Whore_\u005BA\u005D/gi, "Corrosive_\u005Bs\u005D");
s = s.replace( /herc_farmer_\u005BA\u005D/gi, "sou1_\u005Bs\u005D");
s = s.replace( /Bring_Back_Cadet_\u005BA\u005D/gi, "Soge_\u005Bs\u005D");
s = s.replace( /KillerHectWhore_\u005BA\u005D/gi, "Presidentwitter_\u005Bs\u005D");
s = s.replace( /Coopjc2_\u005BA\u005D/gi, "klore_\u005Bs\u005D");
s = s.replace( /NoWhiningFuck_\u005BA\u005D/gi, "Monty_\u005Bs\u005D");
s = s.replace( /Market_Crasher_\u005BA\u005D/gi, "choover_\u005Bs\u005D");
s = s.replace( /Bug_Exploiter_\u005BA\u005D/gi, "juketay_\u005Bs\u005D");
s = s.replace( /Steal_Poacher/gi, "Who235_\u005Bs\u005D");
s = s.replace( /turtle_\u005BA\u005D/gi, "Pokeyoshi_\u005Bs\u005D");
s = s.replace( /Cash_whore_\u005BA\u005D/gi, "badger_\u005Bs\u005D");
s = s.replace( /HQ_Vulture_\u005BA\u005D/gi, "Fgump_\u005Bs\u005D");
s = s.replace( /Cartel_hopper_\u005BA\u005D/gi, "Coolj_\u005Bs\u005D");
s = s.replace( /Destroyer_\u005BA\u005D/gi, "Codyscott_\u005Bs\u005D");
s = s.replace( /nuKe_b0T_\u005BA\u005D/gi, "Pampers_\u005Bs\u005D");
s = s.replace( /Air_Pad_Cleaner_\u005BA\u005D/gi, "JPJ aka Goat_\u005Bs\u005D");

s = s.replace( /Multi_\u005BA\u005D/gi, "Soup_\u005Bs\u005D");

    node.data = s; 
		}
} 

})();


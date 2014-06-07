// ==UserScript==
// @name        Translate Fish Ranks
// @namespace   http://jjwhg.net/~jjwhg/
// @description Translate Fish rankings to TLPD links
// @include     http://www.fishbattle.net/rank_ladder
// @version     1.0.0
// @grants      none
// ==/UserScript==

var uo = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var tlpd = {};
tlpd["monster[white]"] = "http://www.teamliquid.net/tlpd/sospa/players/1103_Mong"
tlpd["mong"] = "http://www.teamliquid.net/tlpd/sospa/players/1103_Mong"
tlpd["zergfight"] = "http://www.teamliquid.net/tlpd/sospa/players/5951_ZergFight"
tlpd["jat.honggu"] = "http://www.teamliquid.net/tlpd/sospa/players/2339_Larva"
tlpd["9bal"] = "http://www.teamliquid.net/tlpd/sospa/players/5839_flysCv"
tlpd["killer[white]"] = "http://www.teamliquid.net/tlpd/korean/players/558_Killer"
tlpd["eros_ample"] = "http://www.teamliquid.net/tlpd/sospa/players/1119_Ample"
tlpd["eyewater[white]"] = "http://www.teamliquid.net/tlpd/sospa/players/86_Shuttle"
tlpd["glow`laluz"] = "http://www.teamliquid.net/tlpd/sospa/players/205_HiyA"
tlpd["0[white]"] = "http://www.teamliquid.net/tlpd/sospa/players/564_Movie"
tlpd["by.hero"] = "http://www.teamliquid.net/tlpd/sospa/players/82_by.hero"
tlpd["gom[white]"] = "http://www.teamliquid.net/tlpd/sospa/players/82_by.hero"
tlpd["terran"] = "http://www.teamliquid.net/tlpd/sospa/players/5129_KT.MGW)Terran"
tlpd["k.u"] = "http://www.teamliquid.net/tlpd/sospa/players/128_Tyson"
var table = document.evaluate('//tr[@height="30"]/td[@align="left"]',
                             document, null, uo, null);

for (var i = 0; i < table.snapshotLength; i++) {
    var item = table.snapshotItem(i)

    var link = tlpd[item.innerHTML.toLowerCase()]
    if (link != null) {
        var name = link.split("_")[link.split("_").length - 1]
        var a = "<a style=\"color: blue\" href=" + link + ">" + name + "</a>"
        item.innerHTML = item.innerHTML + " (" + a + ")"
    }
}

// ==UserScript==
// @name           CroqueMonster AMPE Counter
// @version        2009-11-09
// @licence        (CC) by-sa
// @namespace      http://userscripts.org/scripts/show/60145
// @description    Easy counting of monster stats on the AMPE page of CroqueMonster
// @include        http://www.croquemonster.com/agency/ampe
// @include        http://www.croquemonster.com/monster
// ==/UserScript==
//
// -----------------------------------------------------------------------------

function $xpath(expression, contextNode, type)
{
    return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
        .evaluate(expression, contextNode, null, type, null);
}

function getcarac(monster, carac)
{
    var li = $xpath(".//ul[@class='caracs']/li[@class='" + carac + "']", monster,
                    XPathResult.ANY_TYPE).iterateNext();
    if (li != null) {
        return Math.floor(li.childNodes[1].textContent);
    } else {
        return 0;
    }
}

var titles = new Array();
var base_caracs = new Array();
var extra_caracs = new Array();

var monsters = $xpath("//div[contains(@class,'monsterBox')]", document.getElementById('container'),
                      XPathResult.ANY_TYPE);
var monster = null;

var i = 0;
while( (monster = monsters.iterateNext()) != null ) {
    var gspan = $xpath("./h3[@class='name']/span", monster, XPathResult.ANY_TYPE).iterateNext();
    if (gspan == null) {
        gspan = $xpath("./h3/a", monster, XPathResult.ANY_TYPE).iterateNext();
    }
    titles[i] = gspan.parentNode;
    base_caracs[i] = (getcarac(monster, "sadism")
                      + getcarac(monster, "ugliness")
                      + getcarac(monster, "power")
                      + getcarac(monster, "greediness"));
    extra_caracs[i] = (getcarac(monster, "control")
                       + getcarac(monster, "fight")
                       + getcarac(monster, "endurance"));
    i++;
}

for (var j = 0; j < i; j++) {
    var newinfo = document.createElement("span");
    newinfo.style.paddingLeft = "2em";
    newinfo.style.fontSize = "14px";
    newinfo.style.fontWeight = "normal";
    newinfo.textContent = ("(" + base_caracs[j] + " base + " + extra_caracs[j] + " extra) = "
                           + (base_caracs[j] + extra_caracs[j]) + " total");
    titles[j].appendChild(newinfo);
}

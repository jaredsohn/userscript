// ==UserScript==
// @name           IK專用Kronos Utils (for IK v.0.2.8)_0.0.2beta
// @namespace      ikariam
// @description    修改Kronos Utils
//                 原始腳本http://windowsxd.blogspot.com/2008/07/kronos-utils-tr.html
//                 修改參考http://corentin.jarnoux.free.fr/kronosutils/index.php?topic=292.0
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/

// ==/UserScript==

/*-------------------------------------
Propriétés du script
--------------------------------------*/
var DEBUT = new Date();

// En fonction du language du naviguateur on va utiliser un langage associé.
var language = 0, finished = 1, langUsed = 11, execTime = 12, wood = 14;
var researching = 16, shown = 17, full = 19, monthshort = 20;
var langs = {
  "fr": ["Français", " Fini à ", "Fermer", "Upgrader plus tard.",
         "File de construction", "Ajouter un bâtiment.", "Construire dans",
         "heures", "minutes et", "secondes",
         "valider", "Langue utilisée", "Temps d'exécution",
         "Pas de bâtiment en attente.", "Bois", "Luxe",
         "Recherches", "Visible", "Invisible", "plein: ",
         "JanFévMarAvrMaiJunJuiAoûSepOctNovDéc"],
  "en": ["English", " Finished ", "Close", "Upgrade later.",
         "Building list", "Add building.", "Build at",
         "hours", "minutes and", "seconds",
         "confirm", "Language used", "Time of execution",
         "No building in waiting.", "Wood", "Luxe",
         "Researching", "Shown", "Hidden", "full: ",
         "JanFebMarAprMayJunJulAugSepOctNovDec"],
  "nl": ["Nederlands", " Gedaan ", "Sluit", "Later uitbouwen", 
         "Gebouwenlijst", "Voeg gebouw toe", "Bouw om", 
         "uren", "minuten en", "seconden", 
         "Bevestig", "Gekozen Taal", "Tijd van uitvoering", 
         "Geen gebouwen in de wachtrij", "Hout", "Luxe", "Word onderzocht:", "Getoond", "Verborgen", "Vol:", 
         "JanFebMarAprMeiJunJulAugSepOktNovDec"],

  // By Tico:
  "pt": ["Portuguès", " acaba às ", "Fechar", "Evoluir mais tarde.",
         "Lista de construção", "Adicionar edificio.", "Construir em",
         "horas", "minutos e", "segundos",
         "confirmar", "Lingua usada", "Tempo de execução",
         "Nenhum Edificio em espera.", "Madeira", "Luxo"],
  "da": ["Dansk", " Færdig kl. ", "Luk", "Opgrader senere.",
         "Bygnings liste", "Tilføj bygning.", "Byg kl.",
         "timer", "minutter og", "sekunder",
         "bekræft", "Sprog brugt", "Udførelsestid",
         "Ingen bygning venter.", "Træ", "Luxe"],
  // By A.Rosemary:
  "sp": ["Espagnol", " termina a las ", "Cerrar", "Actualizar más tarde.",
         "Lista de construcción", "Añadir edificio.", "Construir en",
         "horas", "minutos y", "segundos",
         "confirmar", "Idioma usado", "Tiempo de ejecución",
         "Nenhum Edificio em espera.", "Madera", "Luxe",
         "Investigación"],
  // by Okan :]
    "tr": ["Türkçe", " Bitiş: ", "Kapat", "Daha sonra güncelle.",
         "Kurulum listesi", "Bina kur ekle.", "Binayı",
         "saat", "dakika ve", "saniye",
         "Onayla", "Kullanılan Dil", "Gerçekleştirme zamanı",
         "Bekleyen kurulum yok.", "Odun", "Luxe",
         "Araştırmak", "Göster", "Gizle", "Dolma: ",
         "OckŞbtMrtNsnMayHazTemAgsEylEkmKsmArk"],
	// by Winxd :]
	"zh": ["繁體中文", " 完成 ", "關閉", "升級後",
         "建物清單", "增加建築", "建築在",
         "時", "分", "秒",
         "確認", "使用語言", "執行時間",
         "沒有任何等待中的建設.", "木材", "奢侈",
         "研究", "顯示", "隱藏", "資源頂點: ",
         "JanFebMarAprMayJunJulAugSepOctNovDec"]
};
var lang;

var name = "城鎮資訊";
var version = "";
/*-------------------------------------
Création de div, br, link etc...
-------------------------------------*/

function url(query) {
  return location.href.replace(/(\?.*)?$/, query||"");
}

function valueRecupJS(nameValue) {
  if ($("cityResources").getElementsByTagName("script")[0]) {
    var text = $("cityResources").getElementsByTagName("script")[0].innerHTML;
    text = text.substr(text.indexOf(nameValue+" = "),
                       text.length);
    text = text.substr(nameValue.length+3,
                       text.indexOf(";")-(nameValue.length+3));
    return text;
  }
}

function luxuryType(type) {
//  var script = $X('/html/body/script[2]').textContent.replace(/\s+/g," ");
//  var what = script.match(/var tradegoodCounter =.*?value_([^\x22\x27]+)/)[1];
  var what = unsafeWindow.tradegoodCounter.valueElem.id.substr(6);
  switch (type) {
    case undefined:
    case 0: return resourceIDs[what];

    case "name":
    case 1: return what;

    case "glass": return what.replace("crystal", "glass");

    case "english":
    case 2:
      what = $X('id("value_'+ what +'")/preceding-sibling::span');
      return what.textContent.replace(/:.*/, "");
  }
}


// on récupére une des valeurs get d'une url(son nom est le param.
function urlParse(param, url) {
  if (!url) url = location.search; // On récupére l'url du site.
  if (!url && param == "view") {
    var view = { cities: "island", locations: "city" };
    for (var id in view)
      if ($(id)) return view[id];
  }
  var keys = {};
  url.replace(/([^=&?]+)=([^&]*)/g, function(m, key, value) {
    keys[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return param ? keys[param] : keys;
}

function createNode(id, classN, html, tag) { // On ajoute un div
  var div = document.createElement(tag||"div"); // on crée le div
  if (id) div.id = id; // on lui ajoute l'id
  if (classN) div.className = classN; // le class
  if ("undefined" != typeof html)
    div.appendChild(document.createTextNode(html)); // on lui ajoute du texte
  return div;
}

function createLink(nom, href) {
  var lien = document.createElement('a');//création d'un lien
  lien.setAttribute('href', href);//On ajoute le href
  lien.appendChild(document.createTextNode(nom));//On ajoute le text.

  return lien;
}

function goto(href) {
  location.href = href;
}

function createBr() { // fonction de création saut de ligne
  return document.createElement("br");
}

function css(rules) {
  GM_addStyle(typeof rules == "string" ? rules : rules.toString());
  return true;
}

function addCSSBubbles() { css(<><![CDATA[

.pointsLevelBat {
  background-color: #FDF8C1;
  -moz-border-radius: 1em;
  border: 2px solid #918B69; /*"#B1AB89"*/
  border-radius: 1em;
  font-family: Sylfaen, "Times New Roman", sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 18px;
  cursor: pointer;
  height: 15px;
  visibility: visible;
  margin-top: 10px;
  margin-left: 25px;
  z-index: 50;
}

.toBuild {
  width: auto;
  height: 23px;
  white-space: pre;
  margin: -120px auto -3px -50%;
  padding: 3px 5px 0;
  z-index: 1000;
}

#islandfeatures .wood .pointsLevelBat {
  margin-top: -21px;
  margin-left: 7px;
}
#islandfeatures .wine .pointsLevelBat {
  margin-top: -38px;
  margin-left: 35px;
}
#islandfeatures .marble .pointsLevelBat {
  margin-top: -28px;
  margin-left: 23px;
}
#islandfeatures .crystal .pointsLevelBat {
  margin-top: -9px;
  margin-left: 21px;
}
#islandfeatures .sulfur .pointsLevelBat {
  margin-top: -33px;
  margin-left: 35px;
}

]]></>); }

function currentResources() {
  return {
    p: number($("value_inhabitants").textContent.replace(/\s.*/, "")),
    g: number($("value_gold")), w: number($("value_wood")),
    W: number($("value_wine")), M: number($("value_marble")),
    C: number($("value_crystal")), S: number($("value_sulfur"))
  };
}

function reapingPace() {
  var pace = {
    g: config.getCity("income", 0),
    p: config.getCity("growth", 0),
    w: secondsToHours(valueRecupJS("startResourcesDelta"))
  };
  pace[luxuryType()] = secondsToHours(valueRecupJS("startTradegoodDelta"));
  var wineUse = config.getCity("wine", 0);
  if (wineUse)
    pace.W = (pace.W || 0) - wineUse;
  return pace;
}

function buildingID(a) {
  var building = a.parentNode.className; //urlParse("view", a.search);
  return {
    townHall: 0, port: 3, academy: 4, shipyard: 5, barracks: 6,
    warehouse: 7, wall: 8, tavern: 9, museum: 10, palace: 11,
    embassy: 12, branchOffice:13, "workshop-army": 15, safehouse: 16, palaceColony: 11
  }[building];
}

function buildingExpansionNeeds(a) {
  var level = number(a.title);
  var needs = costs[buildingID(a)][level];
  var value = {};
  var factor = 1.00;
  if (config.getServer("tech2100")) // Spirit Level
    factor = 0.92;
  else if (config.getServer("tech2060")) // Geometry
    factor = 0.96;
  else if (config.getServer("tech2020")) // Pulley
    factor = 1.00; // 0.98; // not implemented yet!
  for (var r in needs)
    if ("t" == r) // no time discount
      value[r] = needs[r];
    else
      value[r] = Math.floor(needs[r] * factor);
  return value;
}

function haveEnoughToUpgrade(a) {
  var upgrade = buildingExpansionNeeds(a);
  var resources = currentResources();
  var enough = true;
  for (var resource in upgrade)
    if (resource != "t" && resources[resource] < upgrade[resource])
      enough = false;
  return enough;
}

function levelBat() { // Ajout d'un du level sur les batiments.
  function hoverHouse(e) {
    var a = e.target;
    if (a && a.search && a.title && a.title.match(/ \d+$/i)) {
      hovering.innerHTML = visualResources(buildingExpansionNeeds(a));
      hovering.style.top = e.clientY +"px";
      hovering.style.left = e.clientX +"px";
      hovering.style.display = "block";
      var enough = haveEnoughToUpgrade(a);
      hovering.style.borderColor = enough ? "#B1AB89" : "#918B69";
      hovering.style.backgroundColor = enough ? "#FEFCE8" : "#FDF8C1";
    } else
      hovering.style.display = "none";
  }

  function addnum(node) {
    var a = $X('a', node);
    if (!a) return;
    var id = buildingID(a);
    var level = number(a.title);
    if ("number" == typeof id) {
      config.setCity("building"+ id, level);
      config.setCity("posbldg"+ id, number(node.id));
    }
    var div = createNode("", "pointsLevelBat", level);
    if (haveEnoughToUpgrade(a)) {
      div.style.backgroundColor = "#FEFCE8";
      div.style.borderColor = "#B1AB89";
    }
    div.title = a.title;
    node.appendChild(div);
    div.addEventListener("click", function() { goto(a.href); }, true);
    div.style.visibility = "visible";
  }

  addCSSBubbles();

  var node = $("locations");
  if (node) {
    var hovering = createNode("hovering", "pointsLevelBat toBuild");
    hovering.style.display = "none";
    node.appendChild(hovering);
    node.addEventListener("mouseover", hoverHouse, false);
  }

  $x('id("locations")/li[not(contains(@class,"buildingGround"))]').map(addnum);
}

function levelResources() {
  function annotate(what) {
    var node = $X('id("islandfeatures")/li['+ what +']');
    var level = node.className.replace(/\D/g, "");
    var div = createNode("", "pointsLevelBat", level);
    node.appendChild(div);
  }
  addCSSBubbles();
  annotate('contains(@class,"wood")');
  annotate('not(contains(@class,"wood")) and not(@id)');
}

function levelTown() {
  function level(li) {
    var level = li.className.match(/\d+/)[0];
    var name = $X('a[@onclick]/span/text()[preceding-sibling::span]', li);
    if (name) {
      name.nodeValue = level +":"+ name.nodeValue;
      name = name.parentNode;
      name.style.left = Math.round((name.offsetWidth) / -2 + 34) + "px";
    }
  }
  $x('//li[starts-with(@class,"cityLocation city level")]').forEach(level);
}

function citizens() {
  function factor(what, unit, times) {
    var node = $X('//li[@class="'+ what +'"]/div[@class="amount"]');
    if (node) {
      var count = parseInt(node.innerHTML.match(/\d+/)[0], 10);
      var sum = times ? Math.floor(times * count) : "";
      if (sum > 0) sum = "+"+ sum;
      unit.@style = "margin-bottom: -5px;";
      node.innerHTML += (sum ? " \xA0 "+ sum : " ") + (unit.toXMLString());
    }
  }

  // wine:25x20, marble:25x19, glass:23x18, sulfur:25x19
  var iconBase = "skin/resources/icon_", goods = luxuryType("name");
  var w = goods == "glass" ? 23 : 25, h = {wine:20, glass:18}[goods] || 19;
  var luxe = <img src={iconBase + goods +".gif"} width={w} height={h}/>;
  var wood = <img src="skin/resources/icon_wood.gif" width="25" height="20"/>;
  var gold = <img src="skin/resources/icon_gold.gif" width="17" height="19"/>;
  var bulb = <img src="skin/layout/bulb-on.gif" width="14" height="21"/>;

  factor("citizens", gold, 4);
  factor("woodWorkers", wood);
  factor("luxuryWorkers", luxe, 0.5);
  factor("scientists", bulb);
  factor("scientists", gold, -8);

  var income = $X('id("CityOverview")/div/ul/li[contains(@class,"incomegold")]');
  config.setCity("income", number(income));

  var valueMaxInhabitants = $X('id("CityOverview")/div/ul/li/span[contains(@class,"value total")]');
  config.setCity("valueMaxInhabitants", number(valueMaxInhabitants));

  var growth = $X('id("CityOverview")/div/ul/li[contains(@class,"growth")]');
  config.setCity("growth", number(growth));
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function pluck(a, prop) {
  return a.map(function(i) { return i[prop]; });
}

function I(i) { return i; }

function techinfo(what) {
  function makeTech(spec) {
    var name, does, time, deps, points, junk;
    [name, does, time, deps] = trim(spec).split("\n");
    [junk, time, points] = /^(.*) \(([0-9,]+).*\)/.exec(time);
    deps = deps ? deps.split(/,\s*/) : [];
    //points = points.replace(/,/g, "");
    spec = { name: name, does: does, time: time, points: points, deps: deps };
    if ((spec.a = $X('//a[.="'+ name +'"]'))) {
      if ((spec.known = $x('ancestor::ul/@class = "explored"', spec.a)))
        config.setServer("tech"+ urlParse("researchId", spec.a.search), 1);
    }
    return spec;
  }

  function unwindDeps(of) {
    function isDefined(t) {
      return "undefined" != typeof t;
    }
    function level(name) {
      return tech[name];
    }

    if (of.hasOwnProperty("level")) // already unwound
      return true;
    if (!of.deps.length) // no dependencies
      return !(of.level = tech[of.name] = 0);

    var levels = of.deps.map(level);
    if (!levels.every(isDefined)) // unresolved dependencies
      return false;

    of.level = tech[of.name] = 1 + Math.max.apply(Math, levels);
    return true;
  }

  function hilightDependencies(techName) {
    function sum(a, b) { return a + b; }
    function mark(name) {
      if (done[name]) return 0;
      var tech = byName[name];
      done[name] = tech.depends = true;
      var points = tech.known ? 0 : parseInt(tech.points.replace(/,/g, ""), 10);
      return points + tech.deps.map(mark).reduce(sum, 0);
    }

    var done = {};
    var points = mark(techName);
    tree.forEach(show);
    var tech = byName[techName];
    tech.a.title = tech.does + " ("+ points +" points left)";
  }

  function show(tech) {
    var a = tech.a;
    if (a) {
      a.className = (tech.depends ? "" : "in") + "dependent";
      a.title = tech.does;
    }
    tech.depends = false;
  }

  function hover(e) {
    //console.time("hilight");
    var a = e.target;
    if (a && "a" == a.nodeName.toLowerCase()) {
      var name = a.textContent.replace(/:.*/, "");
      hilightDependencies(name);
    } else
      tree.forEach(show);
    //console.timeEnd("hilight");
  }

  function isKnown(what) {
    return what.known;
  }

  function indent(what) {
    byName[what.name] = what;
    var a = $X('//a[.="'+ what.name +'"]');
    a.style.marginLeft = (what.level * 10) + "px";
    a.innerHTML += visualResources(": "+ what.points +" $bulb");
    show(what);
  }

  function vr(level) {
    hr = document.createElement("hr");
    hr.style.position = "absolute";
    hr.style.height = (div.offsetHeight - 22) + "px";
    hr.style.width = "1px";
    hr.style.top = "10px";
    hr.style.left = (level*10 + 3) + "px";
    hr.style.backgroundColor = "#E3AE87";
    hr.style.opacity = "0.4";
    div.appendChild(hr);
  }

  var tree = <>
Deck Weapons
Allows: Building ballista ships in the shipyard
1h 5m 27s (24)
Dry-Dock

Ship Maintenance
Effect: 2% less upkeep for ships
1h 5m 27s (24)
Deck Weapons

Expansion
Allows: Building palaces, founding colonies
20h (440)
Ship Maintenance, Wealth

Foreign Cultures
Allows: Construction of Embassies
1D 10h 54m 32s (768)
Expansion, Espionage

Pitch
Effect: 4% less upkeep for ships
2D 4h (1,144)
Foreign Cultures

Greek Fire
Allows: Building Flame Ships
4D 12h (2,376)
Pitch, Culinary Specialities

Counterweight
Allows: Building catapult-ships at the shipyard
10D 4h 21m 49s (5,376)
Greek Fire, Invention

Diplomacy
Allows: Military Treaties
19D 2h 10m 54s (10,080)
Counterweight

Sea Charts
Effect: 8% less upkeep for ships
39D 18h 32m 43s (21,000)
Diplomacy

Paddle Wheel Engine
Allows: Building steam rams in the shipyard
136D 19h 38m 10s (72,240)
Sea Charts, Helping Hands

Mortar Attachment
Allows: Building mortar ships in the shipyard
231D 19h 38m 10s (122,400)
Paddle Wheel Engine, Glass

Seafaring Future
Seafaring Future
831D 19h 38m 10s (439,200)
The Archimedic Principle, Canon Casting, Utopia, Mortar Attachment

Conservation
Allows: Building of Warehouses
54m 32s (20)

Pulley
Effect: 2% less building costs
1h 5m 27s (24)
Conservation

Wealth
Effect: Allows the mining of trade goods and the building of trading posts
6h 32m 43s (144)
Pulley

Wine Press
Allows: Building of taverns
16h (352)
Wealth, Well Digging

Culinary Specialities
Allows: Training of chefs in the barracks
1D 10h 54m 32s (768)
Wine Press, Expansion, Professional Army

Geometry
Effect: 4% less building costs
2D 4h (1,144)
Culinary Specialities

Market
Allows: Trade Agreements
4D 12h (2,376)
Geometry, Foreign Cultures

Holiday
Effect: Increases the satisfaction in all towns
11D 10h 54m 32s (6,048)
Market

Helping Hands
Allows: Overloading of resources and academy
25D 10h 54m 32s (13,440)
Holiday

Spirit Level
Effect: 8% less costs for the construction of buildings
39D 18h 32m 43s (21,000)
Helping Hands

Bureaucracy
Allows: An additional building space in the towns
117D 6h 32m 43s (61,920)
Spirit Level

Utopia
Utopia
606D 19h 38m 10s (320,400)
Bureaucracy, Diplomacy, Letter Chute, Gunpowder

Economy Future
Economy Future
831D 19h 38m 10s (439,200)
The Archimedic Principle, Canon Casting, Utopia, Mortar Attachment

Well Digging
Effect: +50 housing space, +50 happiness in the capital
1h 27m 16s (32)

Paper
Effect: 2% more research points
1h 21m 49s (30)
Well Digging

Espionage
Allows: Building hideouts
16h (352)
Paper, Wealth

Invention
Allows: Building of workshops
1D 16h 43m 38s (896)
Espionage, Wine Press, Professional Army

Ink
Effect: 4% more research points
2D 4h (1,144)
Invention

Cultural Exchange
Allows: building museums
5D 12h (2,904)
Ink, Culinary Specialities

Anatomy
Allows: Recruiting Doctors in the Barracks
11D 10h 54m 32s (6,048)
Cultural Exchange

Glass
Allows: Usage of crystal glass in order to accelerate research in the academy
25D 10h 54m 32s (13,440)
Anatomy, Market

Mechanical Pen
Effect: 8% more research points
39D 18h 32m 43s (21,000)
Glass

Bird´s Flight
Allows: Gyrocopter
127D 1h 5m 27s (67,080)
Mechanical Pen, Governor

Letter Chute
Effect: 1 Gold upkeep less per scientist
313D 15h 16m 21s (165,600)
Bird´s Flight, Helping Hands

Pressure Chamber
Allows: Building diving boats in the shipyard
404D 13h 5m 27s (213,600)
Letter Chute, Utopia, Robotics

The Archimedic Principle
Allows: Building Bombardiers in the Barracks
272D 17h 27m 16s (144,000)
Pressure Chamber

Knowledge Future
Knowledge Future
831D 19h 38m 10s (439,200)
The Archimedic Principle, Canon Casting, Utopia, Mortar Attachment

Dry-Dock
Allows: Building Shipyards
1h 5m 27s (24)

Maps
Effect: 2% less upkeep for soldiers
1h 5m 27s (24)
Dry-Dock

Professional Army
Allows: Training swordsmen and phalanxes in the barracks
20h (440)
Maps, Wealth

Siege
Allows: Building battering rams in the barracks
1D 10h 54m 32s (768)
Professional Army, Espionage

Code of Honour
Effect: 4% less upkeep
2D 4h (1,144)
Siege

Ballistics
Allows: Archers
4D 12h (2,376)
Code of Honour, Culinary Specialities

Law of the Lever
Allows: Building catapults in the barracks
10D 4h 21m 49s (5,376)
Ballistics, Invention

Governor
Allows: Occupation
19D 2h 10m 54s (10,080)
Law of the Lever, Market

Logistics
Effect: 8% less upkeep for soldiers
39D 18h 32m 43s (21,000)
Governor

Gunpowder
Allows: Building marksmen in the barracks
127D 1h 5m 27s (67,080)
Logistics, Glass

Robotics
Allows: Building steam giants in the barracks
272D 17h 27m 16s (144,000)
Gunpowder

Canon Casting
Allows: Building mortars in the barracks
404D 13h 5m 27s (213,600)
Robotics, Greek Fire

Military Future
Military Future
831D 19h 38m 10s (439,200)
The Archimedic Principle, Canon Casting, Utopia, Mortar Attachment
</>.toString().split(/\n\n+/).map(makeTech);

  if (what)
    return tree.filter(function(t) { return t.name == what; })[0];
  if (!techinfo.cssed)
    techinfo.cssed = css(<><![CDATA[
#researchOverview #container #mainview ul { padding:0 !important; }
#researchOverview #container #mainview li { padding-left: 0; }
a.dependent:before { content:"\2713 "; }
a.independent { padding-left: 9px; }
]]></>);

  var tech = {}, byName = {}, hr;
  while (!tree.map(unwindDeps).every(I));
  tree.forEach(indent);

  var div = $X('id("mainview")/div/div[@class="content"]');
  $x('br', div).forEach(function rm(br) { br.parentNode.removeChild(br); });
  var maxLevel = Math.max.apply(Math, pluck(tree.filter(isKnown), "level"));
  vr(maxLevel);

  if (!techinfo.hide) {
    var hide = document.createElement("style");
    hide.type = "text/css";
    hide.textContent = "ul.explored { display:none; }";
    document.documentElement.firstChild.appendChild(hide);
    hide.disabled = true;
    var header = $X('preceding-sibling::h3/span', div);
    header.innerHTML += ": ";
    var toggle = createNode("hideshow", "", lang[shown], "span");
    header.style.cursor = "pointer";
    header.appendChild(toggle);
    header.addEventListener("click", function() {
      hide.disabled = !hide.disabled;
      toggle.textContent = lang[shown + (hide.disabled ? 0 : 1)];
      hr.style.height = (div.offsetHeight - 22) + "px";
    }, false);
  }

  div.addEventListener("mousemove", hover, false);
  return tree;
}

var costs = [
  [{}, {w:68, t:"34m 48s"}, {w:96, t:"56m 24s"}, {w:63, M:16, t:"1h 24m"}, {w:126, M:27, t:"1h 58m"}, {w:231, M:64, t:"2h 40m"}, {w:393, M:93, t:"3h 29m"}, {w:582, M:152, t:"4h 25m"}, {w:832, M:238, t:"5h 30m"}, {w:1152, M:397, t:"6h 43m"}, {w:1554, M:567, t:"8h 5m"}, {w:2058, M:783, t:"9h 35m"}, {w:3214, M:1321, t:"11h 15m"}, {w:4838, M:2081, t:"13h 3m"}, {w:7027, M:2891, t:"15h 1m"}, {w:9936, M:4320, t:"17h 9m"}, {w:14246, M:6331, t:"20h 11m"}, {w:18051, M:8023, t:"22h 44m"}, {w:22438, M:9972, t:"1D 1h"}, {w:27486, M:12216, t:"1D 4h"}, {w:33255, M:14780, t:"1D 7h"}, {w:39810, M:17693, t:"1D 10h"}, {w:47144, M:20953, t:"1D 14h"}, {w:55380, M:24613, t:"1D 17h"}, {w:221523, M:98454, t:"6D 23h"}, {w:443046, M:196909, t:"13D 22h"}, {w:886092, M:393818, t:"27D 21h"}, {w:1772184, M:787637, t:"55D 19h"}, {w:3544369, M:1575275, t:"111D 15h"}, {w:7088739, M:3150551, t:"223D 6h"}, {w:14177479, M:6301102, t:"446D 12h"}, {w:28354959, M:12602204, t:"893D 19m"}],,,
  [{w:17, t:"10m 48s"}, {w:30, t:"24m 29s"}, {w:43, t:"50m 24s"}, {w:85, M:32, t:"1h 26m"}, {w:152, M:47, t:"2h 18m"}, {w:260, M:91, t:"2h 58m"}, {w:416, M:123, t:"3h 41m"}, {w:639, M:210, t:"4h 52m"}, {w:943, M:337, t:"5h 37m"}, {w:1353, M:518, t:"7h 6m"}, {w:1876, M:761, t:"7h 48m"}, {w:2551, M:1078, t:"9h 30m"}, {w:3714, M:1696, t:"10h 36s"}, {w:5242, M:2254, t:"11h 53m"}, {w:7186, M:2956, t:"11h 59m"}, {w:9611, M:4179, t:"13h 56m"}, {w:38447, M:16718, t:"2D 7h"}, {w:76894, M:33437, t:"4D 15h"}, {w:153789, M:66875, t:"9D 7h"}, {w:307578, M:133750, t:"18D 14h"}, {w:615157, M:267500, t:"37D 4h"}, {w:1230315, M:535001, t:"74D 8h"}, {w:2460631, M:1070003, t:"148D 17h"}, {w:4921262, M:2140006, t:"297D 11h"}],
  [{w:35, t:"14m 24s"}, {w:56, t:"28m 48s"}, {w:82, t:"48m"}, {w:77, C:29, t:"1h 19m"}, {w:155, C:71, t:"1h 57m"}, {w:295, C:205, t:"2h 48m"}, {w:524, C:279, t:"3h 52m"}, {w:871, C:457, t:"5h 6m"}, {w:1394, C:697, t:"6h 36m"}, {w:2130, C:979, t:"8h 16m"}, {w:3156, C:1280, t:"10h 16m"}, {w:4546, C:1920, t:"12h 27m"}, {w:7011, C:3201, t:"15h"}, {w:10417, C:4481, t:"17h 45m"}, {w:14919, C:6138, t:"20h 44m"}, {w:19950, C:8675, t:"1D 7m"}, {w:79803, C:34703, t:"4D 28m"}, {w:159606, C:69407, t:"8D 57m"}, {w:319213, C:138815, t:"16D 1h"}, {w:638426, C:277630, t:"32D 3h"}, {w:1276853, C:555260, t:"64D 7h"}, {w:2553707, C:1110520, t:"128D 15h"}, {w:5107415, C:2221040, t:"257D 6h"}, {w:10214830, C:4442081, t:"514D 13h"}],
  [{w:37, t:"22m 41s"}, {w:65, t:"52m 49s"}, {w:94, t:"1h 50m"}, {w:148, M:55, t:"2h 31m"}, {w:266, M:81, t:"4h 1m"}, {w:380, M:132, t:"4h 20m"}, {w:596, M:176, t:"5h 17m"}, {w:793, M:260, t:"6h 2m"}, {w:1069, M:382, t:"6h 22m"}, {w:1519, M:582, t:"7h 58m"}, {w:1882, M:764, t:"7h 50m"}, {w:2548, M:1076, t:"9h 29m"}, {w:3459, M:1579, t:"9h 19m"}, {w:4463, M:1920, t:"10h 7m"}, {w:6103, M:2511, t:"10h 10m"}, {w:7547, M:3282, t:"10h 57m"}, {w:30191, M:13128, t:"1D 19h"}, {w:60383, M:26256, t:"3D 15h"}, {w:120767, M:52512, t:"7D 7h"}, {w:241534, M:105024, t:"14D 14h"}, {w:483069, M:210049, t:"29D 4h"}, {w:966138, M:420098, t:"58D 9h"}, {w:1932277, M:840197, t:"116D 19h"}, {w:3864555, M:1680394, t:"233D 14h"}, {w:7729111, M:3360788, t:"467D 4h"}, {w:15458222, M:6721576, t:"934D 9h"}, {w:30916444, M:13443153, t:"1868D 19h"}, {w:61832888, M:26886307, t:"3737D 14h"}, {w:123665776, M:53772615, t:"7475D 4h"}, {w:247331553, M:107545231, t:"14950D 9h"}, {w:494663106, M:215090462, t:"29900D 19h"}, {w:989326213, M:430180925, t:"59801D 14h"}],
  [{w:34, t:"6m 58s"}, {w:44, t:"16m 12s"}, {w:66, t:"31m 12s"}, {w:74, t:"56m 24s"}, {w:65, M:21, t:"1h 39m"}, {w:74, M:23, t:"1h 44m"}, {w:121, M:45, t:"2h 3m"}, {w:179, M:54, t:"2h 15m"}, {w:230, M:80, t:"2h 23m"}, {w:329, M:98, t:"2h 55m"}, {w:445, M:147, t:"3h 23m"}, {w:603, M:215, t:"4h"}, {w:739, M:283, t:"4h 18m"}, {w:960, M:390, t:"5h"}, {w:1146, M:484, t:"4h 48m"}, {w:1447, M:637, t:"5h 29m"}, {w:1761, M:804, t:"5h 25m"}, {w:2077, M:971, t:"5h 50m"}, {w:2386, M:1027, t:"5h 24m"}, {w:2774, M:1228, t:"5h 48m"}, {w:3143, M:1293, t:"5h 14m"}, {w:3687, M:1563, t:"5h 43m"}, {w:4210, M:1831, t:"5h 5m"}, {w:4776, M:2122, t:"5h 24m"}, {w:19106, M:8490, t:"21h 39m"}, {w:38212, M:16981, t:"1D 19h"}, {w:76424, M:33962, t:"3D 14h"}, {w:152848, M:67925, t:"7D 5h"}, {w:305697, M:135851, t:"14D 10h"}, {w:611394, M:271703, t:"28D 21h"}, {w:1222789, M:543406, t:"57D 18h"}, {w:2445578, M:1086812, t:"115D 12h"}, {w:4891156, M:2173624, t:"231D 57m"}, {w:9782312, M:4347248, t:"462D 1h"}, {w:19564625, M:8694497, t:"924D 3h"}, {w:39129251, M:17388994, t:"1848D 7h"}, {w:78258503, M:34777989, t:"3696D 15h"}, {w:156517007, M:69555978, t:"7393D 6h"}, {w:313034014, M:139111956, t:"14786D 13h"}, {w:626068029, M:278223912, t:"29573D 2h"}, {w:1252136058, M:556447825, t:"59146D 5h"}, {w:2504272117, M:1112895651, t:"118292D 11h"}, {w:5008544235, M:2225791303, t:"236584D 23h"}, {w:10017088471, M:4451582607, t:"473169D 22h"}, {w:20034176942, M:8903165214, t:"946339D 20h"}, {w:40068353884, M:17806330429, t:"1892679D 16h"}, {w:80136707768, M:35612660858, t:"3785359D 8h"}, {w:160273415536, M:71225321717, t:"7570718D 17h"}, {w:320546831073, M:142450643435, t:"15141437D 10h"}, {w:641093662146, M:284901286871, t:"30282874D 21h"}, {w:1282187324293, M:569802573742, t:"60565749D 18h"}, {w:2564374648586, M:1139605147484, t:"121131499D 12h"}, {w:5128749297172, M:2279210294968, t:"242262999D 57m"}, {w:10257498594344, M:4558420589936, t:"484525998D 1h"}, {w:20514997188689, M:9116841179873, t:"969051996D 3h"}, {w:41029994377379, M:18233682359746, t:"1938103992D 7h"}],
  [{w:41, t:"27m 36s"}, {w:89, t:"1h 7m"}, {w:77, M:12, t:"1h 40m"}, {w:142, M:42, t:"2h 25m"}, {w:249, M:60, t:"3h 8m"}, {w:388, M:107, t:"4h 2m"}, {w:553, M:131, t:"4h 54m"}, {w:783, M:232, t:"5h 57m"}, {w:1178, M:379, t:"7h 6m"}, {w:1586, M:546, t:"8h 24m"}, {w:2092, M:764, t:"9h 54m"}, {w:2705, M:1143, t:"11h 27m"}, {w:4114, M:1878, t:"13h 12m"}, {w:5631, M:2422, t:"15h 12m"}, {w:7501, M:3087, t:"17h 22m"}, {w:9831, M:5130, t:"19h 48m"}, {w:39325, M:20521, t:"3D 7h"}, {w:78650, M:41042, t:"6D 14h"}, {w:157301, M:82084, t:"13D 4h"}, {w:314603, M:164169, t:"26D 9h"}, {w:629207, M:328339, t:"52D 19h"}, {w:1258414, M:656678, t:"105D 15h"}, {w:2516828, M:1313356, t:"211D 7h"}, {w:5033656, M:2626713, t:"422D 14h"}, {w:10067312, M:5253427, t:"845D 5h"}, {w:20134625, M:10506854, t:"1690D 10h"}, {w:40269250, M:21013708, t:"3380D 21h"}, {w:80538501, M:42027417, t:"6761D 19h"}, {w:161077002, M:84054835, t:"13523D 15h"}, {w:322154004, M:168109670, t:"27047D 6h"}, {w:644308008, M:336219340, t:"54094D 12h"}, {w:1288616017, M:672438681, t:"108189D 19m"}],
  [{w:70, t:"1h 12m"}, {w:72, M:12, t:"1h 50m"}, {w:98, M:31, t:"2h 29m"}, {w:151, M:56, t:"3h 16m"}, {w:222, M:67, t:"4h 12m"}, {w:317, M:110, t:"4h 37m"}, {w:433, M:128, t:"4h 59m"}, {w:581, M:191, t:"5h 18m"}, {w:761, M:272, t:"5h 32m"}, {w:978, M:374, t:"5h 42m"}, {w:1229, M:498, t:"6h 24m"}, {w:1532, M:647, t:"7h 8m"}, {w:2115, M:931, t:"8h 55m"}, {w:2270, M:1036, t:"8h 44m"}, {w:2728, M:1274, t:"9h 7m"}, {w:3241, M:1394, t:"9h 27m"}, {w:3823, M:1693, t:"9h 43m"}, {w:4467, M:1838, t:"9h 56m"}, {w:5190, M:2200, t:"10h 4m"}, {w:5996, M:2607, t:"10h 9m"}, {w:6879, M:3057, t:"10h 8m"}, {w:7382, M:3281, t:"10h 2m"}, {w:7903, M:3512, t:"9h 51m"}, {w:8440, M:3751, t:"9h 34m"}, {w:33762, M:15005, t:"1D 14h"}, {w:67525, M:30011, t:"3D 4h"}, {w:135051, M:60023, t:"6D 9h"}, {w:270103, M:120046, t:"12D 18h"}, {w:540207, M:240092, t:"25D 12h"}, {w:1080414, M:480184, t:"51D 57m"}, {w:2160829, M:960368, t:"102D 1h"}, {w:4321658, M:1920737, t:"204D 3h"}, {w:8643317, M:3841474, t:"408D 7h"}, {w:17286635, M:7682949, t:"816D 15h"}, {w:34573271, M:15365898, t:"1633D 6h"}, {w:69146542, M:30731796, t:"3266D 13h"}, {w:138293084, M:61463592, t:"6533D 2h"}, {w:276586168, M:122927185, t:"13066D 5h"}, {w:553172336, M:245854371, t:"26132D 11h"}, {w:1106344673, M:491708743, t:"52264D 23h"}, {w:2212689346, M:983417487, t:"104529D 22h"}, {w:4425378693, M:1966834974, t:"209059D 20h"}, {w:8850757386, M:3933669949, t:"418119D 16h"}, {w:17701514772, M:7867339898, t:"836239D 8h"}, {w:35403029544, M:15734679797, t:"1672478D 17h"}, {w:70806059089, M:31469359595, t:"3344957D 10h"}, {w:141612118179, M:62938719191, t:"6689914D 21h"}, {w:283224236359, M:125877438382, t:"13379829D 18h"}, {w:566448472719, M:251754876764, t:"26759659D 12h"}, {w:1132896945438, M:503509753528, t:"53519319D 57m"}, {w:2265793890877, M:1007019507056, t:"107038638D 1h"}, {w:4531587781754, M:2014039014113, t:"214077276D 3h"}, {w:9063175563509, M:4028078028226, t:"428154552D 7h"}, {w:18126351127019, M:8056156056453, t:"856309104D 15h"}, {w:36252702254039, M:16112312112906, t:"1712618209D 6h"}, {w:72505404508078, M:32224624225812, t:"3425236418D 13h"}],
  [{w:24, t:"13m 20s"}, {w:109, M:11, t:"55m 12s"}, {w:192, M:45, t:"1h 49m"}, {w:291, M:86, t:"3h 5m"}, {w:484, M:158, t:"4h 2m"}, {w:750, M:268, t:"4h 58m"}, {w:1104, M:423, t:"5h 47m"}, {w:1556, M:631, t:"7h 17m"}, {w:2133, M:901, t:"7h 57m"}, {w:2837, M:1248, t:"9h 34m"}, {w:3680, M:1680, t:"9h 55m"}, {w:4706, M:2199, t:"11h 35m"}, {w:5909, M:2542, t:"11h 29m"}, {w:7318, M:3240, t:"13h 8m"}, {w:8934, M:3675, t:"12h 25m"}, {w:11567, M:5030, t:"13h 59m"}, {w:46271, M:20121, t:"2D 7h"}, {w:92543, M:40242, t:"4D 15h"}, {w:185086, M:80485, t:"9D 7h"}, {w:370173, M:160970, t:"18D 15h"}, {w:740346, M:321941, t:"37D 7h"}, {w:1480693, M:643883, t:"74D 14h"}, {w:2961387, M:1287767, t:"149D 4h"}, {w:5922775, M:2575534, t:"298D 8h"}],
  [{w:276, M:82, t:"1h 28m"}, {w:744, M:266, t:"2h 57m"}, {w:1583, M:642, t:"4h 56m"}, {w:2936, M:1292, t:"7h 25m"}, {w:4934, M:2305, t:"8h 40m"}, {w:7742, M:3429, t:"11h 35m"}, {w:11511, M:4879, t:"14h 54m"}, {w:16440, M:7306, t:"18h 38m"}, {w:65761, M:29227, t:"3D 2h"}, {w:131523, M:58455, t:"6D 5h"}, {w:263047, M:116910, t:"12D 10h"}, {w:526095, M:233820, t:"24D 20h"}, {w:1052190, M:467640, t:"49D 16h"}, {w:2104381, M:935280, t:"99D 9h"}, {w:4208762, M:1870561, t:"198D 19h"}, {w:8417525, M:3741122, t:"397D 15h"}, {w:16835051, M:7482245, t:"795D 7h"}, {w:33670103, M:14964490, t:"1590D 14h"}, {w:67340206, M:29928980, t:"3181D 5h"}, {w:134680412, M:59857960, t:"6362D 10h"}, {w:269360824, M:119715921, t:"12724D 21h"}, {w:538721648, M:239431843, t:"25449D 19h"}, {w:1077443297, M:478863687, t:"50899D 15h"}, {w:2154886594, M:957727375, t:"101799D 6h"}],
  [{w:635, t:"4h"}, {w:5488, M:525, t:"8h"}, {w:20462, M:7170, C:4780, t:"9h"}, {w:56448, W:12544, M:31360, C:25088, t:"8h"}, {w:225792, W:100352, M:150528, C:100352, t:"8h"}, {w:451584, W:200704, M:301056, C:200704, t:"8h"}, {w:903168, W:401408, M:602112, C:401408, t:"8h"}, {w:1806336, W:802816, M:1204224, C:802816, t:"8h"}, {w:3612672, W:1605632, M:2408448, C:1605632, t:"8h"}, {w:7225344, W:3211264, M:4816896, C:3211264, t:"8h"}, {w:14450688, W:6422528, M:9633792, C:6422528, t:"8h"}, {w:28901376, W:12845056, M:19267584, C:12845056, t:"8h"}],
  [{w:45, M:13, t:"50m 25s"}, {w:117, M:41, t:"1h 42m"}, {w:207, M:61, t:"2h 23m"}, {w:327, M:107, t:"2h 59m"}, {w:479, M:171, t:"3h 29m"}, {w:667, M:255, t:"3h 53m"}, {w:980, M:397, t:"4h 38m"}, {w:1399, M:590, t:"5h 25m"}, {w:1927, M:848, t:"6h 15m"}, {w:2582, M:1178, t:"7h 6m"}, {w:3402, M:1589, t:"7h 58m"}, {w:4391, M:1889, t:"8h 53m"}, {w:5579, M:2470, t:"9h 49m"}, {w:6979, M:2872, t:"10h 46m"}, {w:8627, M:3657, t:"11h 45m"}, {w:10554, M:4589, t:"12h 45m"}, {w:42218, M:18357, t:"2D 3h"}, {w:84436, M:36714, t:"4D 6h"}, {w:168873, M:73429, t:"8D 12h"}, {w:337747, M:146858, t:"17D 19m"}, {w:675494, M:293717, t:"34D 38m"}, {w:1350988, M:587435, t:"68D 1h"}, {w:2701977, M:1174871, t:"136D 2h"}, {w:5403955, M:2349742, t:"272D 5h"}, {w:10807910, M:4699484, t:"544D 10h"}, {w:21615820, M:9398968, t:"1088D 20h"}, {w:43231641, M:18797936, t:"2177D 16h"}, {w:86463283, M:37595873, t:"4355D 9h"}, {w:172926566, M:75191746, t:"8710D 19h"}, {w:345853132, M:150383493, t:"17421D 15h"}, {w:691706265, M:300766986, t:"34843D 7h"}, {w:1383412531, M:601533972, t:"69686D 14h"}],
  [{w:14, t:"17m 17s"}, {w:37, t:"43m 12s"}, {w:101, M:31, t:"1h 32m"}, {w:217, M:64, t:"2h 7m"}, {w:417, M:148, t:"2h 45m"}, {w:630, M:241, t:"3h 40m"}, {w:914, M:408, t:"4h 45m"}, {w:1274, M:646, t:"5h 56m"}, {w:1729, M:989, t:"7h 17m"}, {w:2270, M:1451, t:"8h 44m"}, {w:2941, M:2061, t:"10h 21m"}, {w:3723, M:2562, t:"12h 3m"}, {w:4658, M:3507, t:"13h 56m"}, {w:5722, M:4238, t:"15h 54m"}, {w:7465, M:6168, t:"18h 3m"}, {w:8948, M:7953, t:"20h 17m"}, {w:35793, M:31814, t:"3D 9h"}, {w:71587, M:63629, t:"6D 18h"}, {w:143174, M:127258, t:"13D 12h"}, {w:286348, M:254517, t:"27D 1h"}, {w:572696, M:509035, t:"54D 2h"}, {w:1145392, M:1018071, t:"108D 5h"}, {w:2290785, M:2036142, t:"216D 10h"}, {w:4581570, M:4072284, t:"432D 20h"}, {w:9163141, M:8144568, t:"865D 16h"}, {w:18326282, M:16289136, t:"1731D 9h"}, {w:36652564, M:32578273, t:"3462D 19h"}, {w:73305128, M:65156546, t:"6925D 15h"}, {w:146610257, M:130313093, t:"13851D 7h"}, {w:293220515, M:260626186, t:"27702D 14h"}, {w:586441031, M:521252372, t:"55405D 5h"}, {w:1172882063, M:1042504744, t:"110810D 10h"}],,
  [{w:25, M:7, t:"18m 36s"}, {w:53, M:19, t:"33m 37s"}, {w:99, M:29, t:"52m 48s"}, {w:159, M:52, t:"1h 12m"}, {w:231, M:83, t:"1h 31m"}, {w:271, M:103, t:"1h 34m"}, {w:363, M:147, t:"1h 53m"}, {w:455, M:193, t:"2h 7m"}, {w:534, M:235, t:"2h 15m"}, {w:668, M:304, t:"2h 34m"}, {w:793, M:371, t:"2h 47m"}, {w:960, M:413, t:"3h 6m"}, {w:1016, M:450, t:"3h 2m"}, {w:1173, M:483, t:"3h 15m"}, {w:1478, M:627, t:"3h 28m"}, {w:1886, M:820, t:"3h 48m"}, {w:2304, M:1025, t:"4h 1m"}, {w:2618, M:1164, t:"4h 14m"}, {w:2825, M:1255, t:"4h 16m"}, {w:3027, M:1345, t:"4h 17m"}, {w:3238, M:1439, t:"4h 19m"}, {w:3834, M:1704, t:"4h 49m"}, {w:4148, M:1843, t:"4h 57m"}, {w:4471, M:1987, t:"5h 4m"}, {w:17886, M:7949, t:"20h 16m"}, {w:35773, M:15899, t:"1D 16h"}, {w:71547, M:31799, t:"3D 9h"}, {w:143095, M:63598, t:"6D 18h"}, {w:286191, M:127196, t:"13D 12h"}, {w:572382, M:254392, t:"27D 57m"}, {w:1144765, M:508784, t:"54D 1h"}, {w:2289530, M:1017569, t:"108D 3h"}],
  [{w:19, t:"15m 8s"}, {w:48, M:9, t:"42m"}, {w:93, M:26, t:"1h 8m"}, {w:159, M:47, t:"1h 41m"}, {w:260, M:86, t:"2h 10m"}, {w:398, M:143, t:"2h 38m"}, {w:582, M:223, t:"3h 23m"}, {w:849, M:344, t:"4h 25m"}, {w:1155, M:488, t:"5h 22m"}, {w:1527, M:672, t:"6h 26m"}, {w:1971, M:900, t:"7h 12m"}, {w:2620, M:1225, t:"8h 17m"}, {w:3276, M:1409, t:"9h 1m"}, {w:4044, M:1791, t:"9h 40m"}, {w:4920, M:2024, t:"10h 15m"}, {w:6177, M:2618, t:"11h 12m"}, {w:7382, M:3210, t:"11h 36m"}, {w:8731, M:3880, t:"11h 52m"}, {w:9636, M:4282, t:"12h 1m"}, {w:11007, M:4892, t:"12h 28m"}, {w:44029, M:19568, t:"2D 1h"}, {w:88058, M:39137, t:"4D 3h"}, {w:176117, M:78274, t:"8D 7h"}, {w:352235, M:156549, t:"16D 15h"}, {w:704471, M:313098, t:"33D 6h"}, {w:1408942, M:626196, t:"66D 13h"}, {w:2817884, M:1252392, t:"133D 2h"}, {w:5635768, M:2504785, t:"266D 5h"}, {w:11271536, M:5009571, t:"532D 11h"}, {w:22543073, M:10019143, t:"1064D 23h"}, {w:45086146, M:20038287, t:"2129D 22h"}, {w:90172293, M:40076574, t:"4259D 20h"}, {w:180344586, M:80153149, t:"8519D 16h"}, {w:360689172, M:160306298, t:"17039D 8h"}, {w:721378344, M:320612597, t:"34078D 17h"}, {w:1442756689, M:641225195, t:"68157D 10h"}, {w:2885513379, M:1282450391, t:"136314D 21h"}, {w:5771026759, M:2564900782, t:"272629D 18h"}, {w:11542053519, M:5129801564, t:"545259D 12h"}, {w:23084107038, M:10259603128, t:"1090519D 57m"}]
];

function visualResources(what) {
  var gold = <img src="skin/resources/icon_gold.gif" width="17" height="19"/>;
  var wood = <img src="skin/resources/icon_wood.gif" width="25" height="20"/>;
  var wine = <img src="skin/resources/icon_wine.gif" width="25" height="20"/>;
  var glass =<img src="skin/resources/icon_glass.gif" width="23" height="18"/>;
  var marble=<img src="skin/resources/icon_marble.gif" width="25" height="19"/>;
  var sulfur=<img src="skin/resources/icon_sulfur.gif" width="25" height="19"/>;
  var bulb = <img src="skin/layout/bulb-on.gif" width="14" height="21"/>;
  function replace(m, icon) {
    var margin = { glass: -3 }[icon] || -5;
    icon = eval(icon);
    icon.@style = "margin-bottom: "+ margin +"px";
    return icon.toXMLString();
  }
  if (typeof what == "object") {
    var name = { w:"wood", g:"gold", M:"marble", C:"glass", W:"wine" };
    var html = []
    for (var id in what) {
      if (name[id])
        html.push(what[id] +" $"+ name[id]);
      else
        html.push(what[id]); // (build time)
    }
    what = html.join(" \xA0 ");
  }
  return what.replace(/\$([a-z]{4,6})/g, replace);
}

/*--------------------------------------------------------
Création des fonctions de temps.
---------------------------------------------------------*/
function getServerTime(offset) {
  var Y, M, D, h, m, s, t;
  [D, M, Y, h, m, s] = $("servertime").textContent.split(/[. :]+/g);
  t = new Date(Y, parseInt(M, 10)-1, D, h, m, s);
  return offset ? new Date(t.valueOf() + offset*1e3) : t;
}

function resolveTime(seconds, timeonly) { // Crée le temps de fin.
  function z(t) { return (t < 10 ? "0" : "") + t; }
  var t = getServerTime(seconds);
  var d = "";
  if (t.getDate() != (new Date).getDate()) {
    var m = lang[monthshort].slice(t.getMonth()*3);
    d = t.getDate() +" "+ m.slice(0, 3) +", ";
  }
  var h = z(t.getHours());
  var m = z(t.getMinutes());
  var s = z(t.getSeconds());
  t = d + h + ":" + m + ":" + s;
  return timeonly ? t : lang[finished] + t;
}

function secondsToHours(bySeconds) {
  if (!isNaN(bySeconds)) {
    var byHour = Math.ceil(bySeconds*3600);
    return byHour;
  }
}

// input: "Nd Nh Nm Ns", output: number of seconds left
function parseTime(t) {
  function parse(what, mult) {
    var count = t.match(new RegExp("(\\d+)" + locale.timeunits.short[what]));
    if (count)
      return parseInt(count[1], 10) * mult;
    return 0;
  }
  var locale = unsafeWindow.LocalizationStrings;
  var units = { day: 86400, hour: 3600, minute: 60, second: 1 };
  var s = 0;
  for (var unit in units)
    s += parse(unit, units[unit]);
  return s;
}

function number(n) {
  if (n.textContent)
    n = n.textContent;
  return parseFloat(n.replace(/[^\d.-]+/g, ""));
}

function colonize() {
  function annotate(what, time) {
    what.innerHTML += " ("+ time +")";
  }
  var have = currentResources();

  var growth = config.getCity("growth", 0);
  var needPop = $X('//ul/li[@class="citizens"]');
  if (have.p < 40 && growth > 0)
    annotate(needPop, resolveTime((40 - have.p) / (growth / 3600.0), 1));

  var income = config.getCity("income", 0);
  var needGold = $X('//ul/li[@class="gold"]');
  if (have.g < 12e3 && income > 0)
    annotate(needGold, resolveTime((12e3 - have.g) / (income / 3600), 1));

  var woodadd = secondsToHours(valueRecupJS("startResourcesDelta"));
  var needWood = $X('//ul/li[@class="wood"]');
  if (have.w < 1250 && woodadd > 0)
    annotate(needWood, resolveTime((1250 - have.w) / (woodadd / 3600), 1));
}

function showHousingOccupancy() {
    var townHallLevel = config.getCity("building0");
    if (townHallLevel) {
    var maxPop = [, 60, 96, 143, 200, 263, 333, 410, 492, 580, 672, 769,
                         871, 977, 1087, 1201, 1320, 1441, 1567, 1696, 1828,
                         1964, 2103, 2246, 2391][townHallLevel];

    var pop = $("value_inhabitants").firstChild;
    var maxPopulation = config.getCity("valueMaxInhabitants", maxPop);
    var text = pop.nodeValue.replace(/\s/g, "\xA0");
    pop.nodeValue = text.replace(")", "/"+ maxPopulation +")");
  }
}

// projects wine shortage time and adds lots of shortcut clicking functionality
function improveTopPanel() {
  function clickTo(node, url) {
    if (node) {
      node.addEventListener("click", function() { goto(url); }, false);
      node.style.cursor = "pointer";
    }
  }
  var flow = reapingPace().W;
  var span = $("value_wine");
  var time = flow < 0 ? Math.floor(number(span)/-flow) +"h" : "∞";
  time = createNode("", "", "\xA0("+ time +")", "span");
  span.parentNode.insertBefore(time, span.nextSibling);
  if (flow >= 0) {
    var reap = secondsToHours(valueRecupJS("startTradegoodDelta"));
    time.title = "+"+ reap +"/-"+ (reap - flow) +" = +"+ flow +"/h";
  }

  var tavernPos = config.getCity("posbldg9", "?");
  if (tavernPos != "?")
    clickTo(time, url("?view=tavern&id="+ cityID() +"&position="+ tavernPos));

  var warePos = config.getCity("posbldg7", "?");
  if (warePos != "?") {
    var warehouse = url("?view=warehouse&id="+ cityID() +"&position="+ warePos);
    var resources = $X('id("cityResources")/ul[@class="resources"]');
    if (resources) {
      resources.addEventListener("click", function(e) {
        if ($X('ancestor-or-self::*[@class="tooltip"]', e.target))
          goto(warehouse);
      }, true);
      $x('li/div[@class="tooltip"]', resources).forEach(function(tooltip) {
        tooltip.style.cursor = "pointer";
      });
    }
  }


  clickTo($X('id("value_wood")/parent::li'),
          url("?view=resource&type=resource&id=" + islandID()));
  clickTo($X('id("value_'+ luxuryType("name") +'")/parent::li'),
          url("?view=tradegood&type=tradegood&id=" + islandID()));
  var trader = config.getCity("posbldg13", "?");
  if (trader != "?") {
    trader = url("?view=branchOffice&id="+ cityID() +"&position="+ trader);
    var luxe = luxuryType("glass");
    var nodes = $x('id("cityResources")/ul/li[not(@class="'+ luxe +'") and '+
                   'contains("wine marble glass sulfur sulphur",@class)]');
    nodes.forEach(function(node) { clickTo(node, trader); });
  }
}

function projectHaveResources() {
  var upgrade = $('buildingUpgrade');
  if (upgrade) {
    var time = 0;
    var need = {};
    var pace = reapingPace();
    var have = currentResources();
    var woodNode = $X('div/ul/li[starts-with(@class,"wood")]', upgrade);
    if (woodNode)
      need.w = woodNode;
    var needRest = $x('id("buildingUpgrade")//ul[@class="resources"]/li[not('+
                      'contains(@class,"wood") or contains(@class,"time"))]');
    for (var i = 0; i < needRest.length; i++) {
      var what = needRest[i];
      var id = what.className.charAt().toUpperCase();
      need[id] = what;
    }
    for (var r in need) {
      var node = need[r];
      var amount = number(node);
      if (amount <= have[r]) continue;
      if (!pace[r]) {
        node.title += ": (∞)";
        time = Infinity;
      } else {
        what = 3600 * (amount - have[r]) / pace[r];
        node.title += ": ("+ resolveTime(what, 1) +")";
        time = Math.max(time, what);
      }
    }
    if (time) {
      var req = $X('div[@class="content"]/h4', upgrade);
      if (Infinity == time)
        req.textContent += " (∞)";
      else
        req.textContent += " ("+ resolveTime(time, 1) +")";
    }
  }
}

function projectCompletion(id, className) {
  var node = $(id);
  if (node) {
    // console.log("T: %x", $("servertime").textContent);
    // console.log("L: %x", node.textContent);
    // console.log("D: %x", parseTime(node.textContent));
    // console.log("F: %x", resolveTime(parseTime(node.textContent)));
    var done = resolveTime(parseTime(node.textContent));
    var div = createNode("", className, done, node.nodeName.toLowerCase());
    node.parentNode.insertBefore(div, node.nextSibling);
    if ("cityCountdown" == id) {
      var move = $X('ancestor::*[contains(@class,"timetofinish")]', node);
      if (move)
        move.style.marginLeft = "-40%";
    }
  }
}

function detectWineChange() {
  var wine = $("wineAmount");
  if (wine) {
    wine = wine.form.elements.namedItem("amount");
    config.setCity("wine", number(wine.options[wine.selectedIndex]) || 0);
  }
}

/*---------------------
Ajout du panel dans le menu
---------------------*/
function panelInfo() { // Ajoute un element en plus dans le menu.
  var panel = createNode("", "dynamic");

  var titre = document.createElement("h3");
  titre.setAttribute("class", "header");
  titre.appendChild(document.createTextNode(name + version));

  var corps = createNode("Kronos", "content");
  corps.style.margin = "3px 10px";
  var footer = createNode("", "footer");

  panel.appendChild(titre);
  panel.appendChild(corps);
  panel.appendChild(footer);

  var sidepane = $("container2"), mainview = $("mainview");
  if (sidepane) {
    sidepane.insertBefore(panel, mainview);
  }
  return corps;
}

function islandID() {
  return urlParse("id", $X('//li[@class="viewIsland"]/a').search);
}

function cityID() {
  return urlParse("id", $X('//li[@class="viewCity"]/a').search);
}

/*------------------------
   / \
  / ! \    Function Principal.
 -------
------------------------*/

function principal() {
  if (innerWidth > 1003) document.body.style.overflowX = "hidden"; // !scrollbar
  var luxeByHours = secondsToHours(valueRecupJS("startTradegoodDelta"));
  var woodByHours = secondsToHours(valueRecupJS("startResourcesDelta"));
  var lux = luxuryType("name");
  if ("crystal" == lux) lux = "glass";

  var chemin = panelInfo();
  var island = islandID();

  try {
    switch (urlParse("view") || urlParse("action")) {
      case "loginAvatar":// &function=login
      case "CityScreen": // &function=build&id=...&position=4&building=13
      case "city": levelBat(); projectCompletion("cityCountdown"); break;
      case "port": projectCompletion("outgoingOwnCountDown"); break;
      case "island": levelTown(); levelResources(); break;
      case "townHall": citizens(); break;
      case "shipyard":
        css(<><![CDATA[
#container #mainview .unit .resources li { float: none; padding-bottom: 5px; }
        ]]></>);
        break;
      case "researchOverview": techinfo(); break;
      case "colonize": colonize(); break;
      case "academy":
      case "researchAdvisor":
        var research = $X('//div[@class="researchName"]/a');
        if (research)
          config.setServer("research", research.title);
        projectCompletion("researchCountDown"); break;
    }
    title();
    detectWineChange();
    projectCompletion("upgradeCountDown", "time");
    projectCompletion("buildCountDown");
    projectHaveResources();
    showHousingOccupancy();
  } catch(e) {}

  var have = currentResources();
  have.l = have[luxuryType()]; // what luxury resource?
  var woodCapacity = number($X('//li[@class="wood"]/div[@class="tooltip"]'));
  var luxeCapacity = number($X('//li[@class="'+lux+'"]/div[@class="tooltip"]'));
  var woodFull = resolveTime((woodCapacity - have.w) / (woodByHours/3600), 1);
  var luxeFull = resolveTime((luxeCapacity - have.l) / (luxeByHours/3600), 1);
  woodFull = woodByHours ? " ("+ lang[full] + woodFull +")" : "";
  luxeFull = luxeByHours ? " ("+ lang[full] + luxeFull +")" : "";
  var goldName = $X('id("value_gold")/ancestor::li').title;
  var income = config.getCity("income", 0);
  [createLink(goldName +": "+ (income > 0 ? "+" : "") + income,
              url("?view=townHall&id="+ cityID() +"&position=0")),
   createBr(),
   createLink(lang[wood] +": +"+ woodByHours + woodFull,
              url("?view=resource&type=resource&id=" + island)),
   createBr(),
   createLink(luxuryType("english") +": +"+ luxeByHours + luxeFull,
              url("?view=tradegood&type=tradegood&id=" + island)),
   createBr(),
  ].forEach(function add(node) { chemin.appendChild(node); });

  var research = config.getServer("research", "");
  if (research) {
    var a = document.createElement("a");
    a.href = url("?view=academy&id=" + cityID());
    var tech = techinfo(research);
    a.textContent = lang[researching] +": "+ research;
    a.title = tech.does +" ("+ tech.points + " points)";
    chemin.appendChild(a);
    chemin.appendChild(createBr());
  }

  var langPref = document.createTextNode(lang[langUsed] +": "+ lang[language]);
  var langChoice = document.createElement("a");
  langChoice.href = "#";
  langChoice.appendChild(langPref);
  langChoice.addEventListener("click", promptLanguage, false);
  chemin.appendChild(langChoice);

  improveTopPanel();

  var FIN = new Date();
  langChoice.title = lang[execTime] +": "+ (FIN - DEBUT) +"ms";
}






GM_registerMenuCommand("Hades Army Scripts: Your language", promptLanguage);

function promptLanguage() {
  var help = [];
  for (var id in langs)
    help.push(id+": "+langs[id][language]);
  while (!langs.hasOwnProperty(newLanguage)) {
    var newLanguage = prompt("Hades Army Scripts: " +
                             "Which language do you prefer?\n(" +
                             help.join(", ") + ")", getLanguage());
    if (langs.hasOwnProperty(newLanguage))
      config.set("language", newLanguage);
  }
  location.reload();
}

function getLanguage() {
  function guess() {
    var guess = navigator.language.replace(/-.*/,"");
    return langs.hasOwnProperty(guess) ? guess : "en";
  }
  return config.get("language", guess());
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

// config.get() and config.set() store config data in (near-)json in prefs.js.
var config = (function(data) {
  function get(name, value) {
    return data.hasOwnProperty(name) ? data[name] : value;
  }
  function getCity(name, value) {
    return getServer(name +":"+ cityID(), value);
  }
  function getServer(name, value) {
    return get(name +":"+ location.hostname, value);
  }
  function set(name, value) {
    if (value === undefined)
      delete data[name];
    else
      data[name] = value;
    GM_setValue("config", uneval(data));
    return value;
  }
  function setCity(name, value) {
    return setServer(name +":"+ cityID(), value);
  }
  function setServer(name, value) {
    return set(name +":"+ location.hostname, value);
  }
  function keys(re) {
    re = re || /./;
    var list = [];
    for (var id in data)
      if (data.hasOwnProperty(id) && id.test(re))
        list.push(id);
    return list;
  }
  function remove(id) {
    if (/function|object/.test(typeof id)) {
      var value = [], re = id;
      for (id in data)
        if (data.hasOwnProperty(id) && id.test(re)) {
          value.push(data[id]);
          delete data[id];
        }
    } else {
      value = data[id];
      delete data[id];
    }
    return value;
  }
  return { get:get, set:set,
           setCity:setCity, getCity:getCity,
           setServer:setServer, getServer:getServer,
           keys:keys, remove:remove };
})(eval(GM_getValue("config", "({})")));

lang = langs[getLanguage()];

principal(); // Appel de la fonction principal.
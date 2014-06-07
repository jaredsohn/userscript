// ==UserScript==
// @name           Mafia Wars Stats Tool
// @namespace      http://userscripts.org/users/140662
// @description    Inventory and job tier completion analysis.
// @include        http://mwfb.zynga.com/mwfb/*
// @include        http://apps.facebook.com/inthemafia/*
// @version        4.4
// ==/UserScript==

(function() {

var SCRIPT = {
  version: "4.4",
  name: "Mafia Wars Stats Tool",
  id: "60313",
  update:1,
  survey:1,
  count:0,
  money:0,
  consumables:1,
  loot:1
};

GM_addStyle(
  "a.mwsActionLink {font-size:12px; color:#00FF00 !important; font-weight:bold; cursor:pointer;}\
   div.mwsPopupFrame {z-index: 1000; bottom:40px; left:20px; right:20px; top:20px;\
       position:fixed; overflow: auto;}\
   div.mwsPopupContent {padding:10px; font-family:'lucida grande',tahoma,verdana,arial,sans-serif; font-size:11px;\
       background-color:#000000; color:#E9E9AF; border:1px solid #FFD927;}\
   div.mwsPopupContent td {'lucida grande',tahoma,verdana,arial,sans-serif; font-size:11px; }\
   div.mwsPopup td, div.mwsPopup p {font-size:12px;}\
   div.mwsPopupTitle {font-weight:bold; font-size:16px; color:#FFD927;}\
   div.mwsAnalysis {font-weight:bold; color:#FFD927;}\
   a.mwsDismissLink {color:#E9E9AF;}\
   a.mwsLootView {color:#FFD927; text-decoration:none; margin-left:10px;}\
   a.mwsLootSort {color:#FFD927; font-weight:bold;}\
   table.mwsLootTable tr td {padding:0 10px 0 5px;}\
   tr.mwsLightRow td {background-color:#1D1D1D;}\
   td.mwsNumber {text-align:right;}\
   font.yellow {color:#FFD927;}\
   font.green {font-weight:bold; color:#00FF00;}\
   font.red {font-weight:bold; color:red;}\
   input.request_form_submit {margin-left:0 !important; margin-right:5px;}"
);

var mafiaStore = [];
// Weapons NY.
mafiaStore["Baseball Bat"] = {a:1, d:0, c1:3};
mafiaStore["Crowbar"] = {a:1, d:1, c1:7};
mafiaStore[".45 Cal Pistol"] = {a:2, d:2, c1:10};
mafiaStore["Sawed-off Shotgun"] = {a:3, d:1, c1:20};
mafiaStore["Grenade"] = {a:2, d:3, c1:30};
mafiaStore["Machine Pistol"] = {a:3, d:3, c1:55};
mafiaStore["Hacksaw"] = {a:6, d:3, c1:100};
mafiaStore["Tommy Gun"] = {a:12, d:10, c1:1200};
mafiaStore["Chain Gun"] = {a:16, d:14, c1:2000};
mafiaStore["Bonus weapon"] = {a:20, d:20, c1:2000};
// Armor NY.
mafiaStore["Bullet Proof Vest"] = {a:2, d:4, c1:60};
mafiaStore["Body Armor"] = {a:4, d:7, c1:160};
// Vehicles NY.
mafiaStore["Motorcycle"] = {a:2, d:2, c1:150};
mafiaStore["Delivery Truck"] = {a:3, d:3, c1:200};
mafiaStore["Sedan"] = {a:4, d:5, c1:400};
mafiaStore["Armored Sedan"] = {a:4, d:6, c1:600};
mafiaStore["Getaway Cruiser"] = {a:6, d:7, c1:900};
mafiaStore["Town Car"] = {a:10, d:12, c1:4000};
mafiaStore["Speed Boat"] = {a:0, d:0, c1:4000};

// Weapons CUBA.
mafiaStore["Machete"] = {a:19, d:7, c2:1};
mafiaStore["Lead Pipe"] = {a:14, d:13, c2:5};
mafiaStore["Hatchet"] = {a:16, d:11, c2:12};
mafiaStore["RAS-29"] = {a:17, d:10, c2:15};
mafiaStore["Gadyuka-5 Pistol"] = {a:14, d:19, c2:24};
mafiaStore[".308 Sniper Rifle"] = {a:22, d:8, c2:32};
mafiaStore["Bazooka"] = {a:23, d:11, c2:40};
// Armor CUBA.
mafiaStore["Local Guide"] = {a:5, d:8, c2:4};
mafiaStore["Local Tough"] = {a:10, d:12, c2:8};
mafiaStore["Camo Fatigues"] = {a:14, d:8, c2:10};
mafiaStore["Jungle Tracker"] = {a:10, d:15, c2:14};
mafiaStore["Hired Thug"] = {a:16, d:12, c2:22};
mafiaStore["Wise Guy"] = {a:20, d:14, c2:30};
mafiaStore["Rebel Sniper"] = {a:24, d:20, c2:38};
// Vehicles CUBA.
mafiaStore["CM Seta"] = {a:11, d:14, c2:10};
mafiaStore["4x4"] = {a:16, d:16, c2:18};
mafiaStore["CM Venga"] = {a:15, d:20, c2:22};
mafiaStore["Barge"] = {a:12, d:23, c2:27};
mafiaStore["Oso-12 Cargo Truck"] = {a:15, d:25, c2:38};
mafiaStore["Commercial Helicopter"] = {a:18, d:26, c2:45};

// Weapons Moscow.
mafiaStore["Dubina"] = {a:18, d:14, c3:5};
mafiaStore["Pistolet Besshumnyj"] = {a:19, d:12, c3:9};
mafiaStore["Boevoy Nozh"] = {a:15, d:18, c3:22};
mafiaStore["Shturmovaya Vintovka"] = {a:20, d:15, c3:48};
mafiaStore["RAS-28 SMG"] = {a:18, d:20, c3:68};
mafiaStore["Snayperskaya Vintovka"] = {a:24, d:12, c3:215};
mafiaStore["RAS-55"] = {a:25, d:18, c3:168};
// Armor Moscow.
mafiaStore["Tracksuit"] = {a:14, d:14, c3:9};
mafiaStore["Balaclava"] = {a:12, d:17, c3:18};
mafiaStore["Bronezhilet"] = {a:10, d:20, c3:50};
mafiaStore["Riot Helmet"] = {a:14, d:18, c3:66};
mafiaStore["Forest Camo Suit"] = {a:20, d:15, c3:99};
mafiaStore["Arctic Camo Suit"] = {a:20, d:15, c3:99};
mafiaStore["Enforcer"] = {a:22, d:18, c3:168};
// Vehicles Moscow.
mafiaStore["Mototsykl"] = {a:15, d:17, c3:5};
mafiaStore["Taksi"] = {a:18, d:14, c3:10};
mafiaStore["Dvina"] = {a:16, d:19, c3:32};
mafiaStore["Lisitsa 32 Sedan"] = {a:20, d:18, c3:62};
mafiaStore["BYK-922"] = {a:14, d:22, c3:129};
mafiaStore["KRZ8"] = {a:18, d:24, c3:157};
mafiaStore["Sokol Helicopter"] = {a:20, d:25, c3:245};
mafiaStore["Zhar-ptitsa Sedan"] = {a:24, d:21, c3:270};
mafiaStore["Tracked Truck"] = {a:22, d:27, c3:265};

// Weapons Bangkok.
mafiaStore["Chinese Army Knife"] = {a:9, d:15, c4:18};
mafiaStore["Chinese Army Pistol"] = {a:14, d:10, c4:50};
mafiaStore["Thai Sword"] = {a:15, d:11, c4:100};
mafiaStore["Bullhook"] = {a:12, d:16, c4:200};
mafiaStore["Bo Staff"] = {a:10, d:18, c4:400};
mafiaStore["Chinese Army Assault Rifle"] = {a:17, d:12, c4:450};
// Armor Bangkok.
mafiaStore["Silk Shirt"] = {a:5, d:9, c4:22};
mafiaStore["Wrist Wrap"] = {a:8, d:6, c4:70};
mafiaStore["Khen Shield"] = {a:7, d:11, c4:105};
mafiaStore["Royal Thai Army Helmet"] = {a:9, d:13, c4:150};
mafiaStore["Tabi"] = {a:16, d:12, c4:350};
mafiaStore["Kowloon Police Uniform"] = {a:15, d:10, c4:300};
// Vehicles Bangkok.
mafiaStore["Tuk Tuk"] = {a:8, d:10, c4:30};
mafiaStore["Moped"] = {a:10, d:7, c4:75};
mafiaStore["Long Boat"] = {a:7, d:12, c4:175};
mafiaStore["Thai Compact"] = {a:13, d:9, c4:350};
mafiaStore["Japanese Sedan"] = {a:10, d:14, c4:500};
mafiaStore["Junk"] = {a:12, d:12, c4:525};
// Yakuza Store.
mafiaStore["Raion Assault Rifle"] = {a:41, d:20, c4:1270};
mafiaStore["Yakuza Assassin"] = {a:50, d:26, c4:4800};
mafiaStore["Fugama Hasu"] = {a:46, d:23, c4:2402};
// Triad Store.
mafiaStore["Cheng-Wei X94 Machine Gun"] = {a:25, d:45, c4:2800};
mafiaStore["Shaolin Bodyguard"] = {a:27, d:51, c4:4700};
mafiaStore["PLA Armored Car"] = {a:21, d:40, c4:1260};

var jobTiers = [];
// NY Jobs.
jobTiers["Street Thug"] = [
  {n:"Pistol Bayonet", d:"+4% damage dealt in fights", i:"item_pistolbayonet_75x75"},
  {p:5},{p:12},{p:18},{p:20},{p:7},{p:10},{p:7}];
jobTiers["Associate"] = [
  {n:"Roadster", d:"-7% damage received in fights", i:"item_bugatti_75x75"},
  {p:6},{p:6},{p:7},{p:7},{p:18},{p:18},{p:13}];
jobTiers["Soldier"] = [
  {n:"Golden Skull", d:"30 second reduction on your health regen timer", i:"item_goldskull_75x75"},
  {p:7},{p:7},{p:7},{p:21},{p:9},{p:13},{p:10}];
jobTiers["Enforcer"] = [
  {n:"Money Plate", d:"5% discount on property purchases", i:"item_moneyplates_75x75"},
  {p:18},{p:6},{p:21,r:["L"],c:20},{p:21,r:["T", "C"],c:20},{p:21, r:["WD"]},{p:18},{p:15}];
jobTiers["Hitman"] = [
  {n:"Chainsaw Bayonet", d:"30 second reduction on your stamina regen timer", i:"item_chainsawbayonet_75x75"},
  {p:6},{p:7},{p:9},{p:9},{p:15},{p:15},{p:15},{p:12,r:["CC"]},{p:9,r:["WD"],c:2}];
jobTiers["Capo"] = [
  {n:"State Senator", d:"5% discount on property repairs", i:"item_senator_75x75"},
  {p:10},{p:10},{p:7,r:["UCP"]},{p:9},{p:16},{p:8},{p:6,r:["UCP"]},{p:6}];
jobTiers["Consigliere"] = [
  {n:"Helicopter", d:"30 second reduction on your energy regen timer", i:"item_helicopter_75x75"},
  {p:10,r:["BMP"]},{p:7},{p:9},{p:7},{p:5},{p:10,r:["UCP"]},{p:7,r:["ITR"]},{p:6}];
jobTiers["Underboss"] = [
  {n:"Private Island", d:"5% bonus on job experience", i:"item_island_75x75"},
  {p:3,r:["ITR"]},{p:5,r:["ITR", "CSU"]},{p:5},{p:5},{p:5},{p:5},{p:3,r:["UCP"]},{p:3,r:["CSU"]}];
jobTiers["Boss"] = [
  {n:"Golden Throne", d:"2x the energy regenerated per regen period", i:"items_goldthrone_75x75"},
  {p:3},{p:3,r:["BMP"]},{p:3},{p:3,r:["BMP"]},{p:4,r:["ITR"]},{p:3},{p:4},{p:3}];
// CUBA Jobs.
jobTiers["El Soldado"] = [
  {n:"El Rey Roadster", d:"vehicle [40,34]", i:"item_elrey_75x75_01"},
  {p:4},{p:9},{p:13},{p:10},{p:9},{p:10},{p:10},{p:11},{p:13},{p:15}];
jobTiers["El Capitan"] = [
  {n:"Guerilla Commando", d:"armor [38,35]", i:"item_guerrilla_75x75_01"},
  {p:10},{p:7},{p:8},{p:10},{p:11},{p:7},{p:8},{p:12}];
jobTiers["El Jefe"] = [
  {n:"Avispa Machine Gun", d:"weapon [54,24]", i:"item_avispa_75x75_02"},
  {p:6},{p:15},{p:7},{p:8,r:["PC"]},{p:8},{p:8},{p:9},{p:10}];
jobTiers["El Patron"] = [
  {n:"Che's Beret", d:"armor [46,34]", i:"item_chesberet_75x75_01"},
  {p:7},{p:9,r:["PC"],c:3},{p:7},{p:8},{p:9},{p:9},{p:11},{p:10}];
jobTiers["El Padrino"] = [
  {n:"Cocodrilo APC", d:"vehicle [42,56]", i:"item_cocodrilo_75x75_01"},
  {p:8},{p:7},{p:8},{p:8},{p:12,r:["PC"],c:5},{p:10},{p:8},{p:10}];
jobTiers["El Cacique"] = [
  {n:"Cazador Assault Rifle", d:"weapon [60,25]", i:"cazadorassaultrifle_b75x"},
  {p:5},{p:6},{p:6},{p:3},{p:4},{p:4,r:["PC"],c:8},{p:3},{p:5,r:["UCP"]}];

// Required items.
var reqItems = [];
reqItems["L"] = {n:"Liquor", i:"item_liquor"};
reqItems["T"] = {n:"Tokens", i:"item_token"};
reqItems["C"] = {n:"Cards", i:"item_card"};
reqItems["WD"] = {n:"Wiretap Device", i:"item_wiretap"};
reqItems["CC"] = {n:"Concealable Camera", i:"item_conceal_camera"};
reqItems["CSU"] = {n:"Computer Set-Up", i:"item_computer_setup"};
reqItems["UCP"] = {n:"Untraceable Cell Phone", i:"item_untrace_cell_phone"};
reqItems["BMP"] = {n:"Blackmail Photos", i:"item_blackmail_photos"};
reqItems["ITR"] = {n:"Illegal Transaction Records", i:"item_illegal_transaction_records"};
reqItems["PC"] = {n:"Politico Corrupto", i:"item_politicocorrupto_75x75_01"};

// Giftable loot.
var giftableLoot = [
{n:"New York", c:0, l:[1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,18,19,20,60,61,66,67,69,70,71,72,73,74,75,76,77,78]},
{n:"Cuba", c:0, l:[174,175,176,177,178,179,180,181,182,183,194,195,196,197,198,199,200,201,202,203,204,205,261,262]},
{n:"Moscow", c:0, l:[1000,1001,1002,1003,1005,1007,1008,1013,1014,1016,1017,1019,1020,1021,1022,1026,1027,1028,1029,1030,1032,1033,1034]},
{n:"Bangkok", c:0, l:[1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1527,1528,1529]},
{n:"4th of July", c:0, l:[222,223,224,225,226,227,228,229]},
{n:"Halloween", c:0, l:[326,327,328]}
];

// Loot types.
var TYPE = {weapon: 0, armor: 1, vehicle: 2, other: 3};
var typeName = ["Weapon", "Armor", "Vehicle", "Other"];

// Inventory.
var dictionary;
var lootTable;
var lootSort;
var weapons;
var armor;
var vehicles;
var consumables;
var storeWeaponsCnt;
var storeArmorCnt;
var storeVehiclesCnt;
var lootCnt;
var newYorkValue;
var cubaValue;
var moscowValue;
var bangkokValue;
var index;

// Globals.
var innerPage;
var timer;
var mwSize = 0;
var mwLevel = 0;
var mwHash;

// Entry point.
if (SCRIPT.update) updateCheck();
addToolButtons();

function updateCheck() {
  if (window != top) return;
  var now = new Date().getTime();
  if (now - GM_getValue("lastUpdateCheck", 0) > 86400000) {
    var sourceUrl = "http://userscripts.org/scripts/source/" + SCRIPT.id + ".user.js?source";
    GM_xmlhttpRequest({method: "GET", url: sourceUrl,
      onload: function(details) {
        if (details.readyState == 4) {
          GM_setValue("lastUpdateCheck", String(now));
          var m = /\/\/ @version *([0-9.]+)/.exec(details.responseText);
          if (m && (m[1] != SCRIPT.version)) {
            alert("Please install the latest version of the script '" + SCRIPT.name + "'.");
            window.location.href = "http://userscripts.org/scripts/show/" + SCRIPT.id ;
          }
        }
      }
    });
  }
}

function setListenContent(on) {
  var elt = $('mainDiv');
  if (!elt) return;
  if (on) {
    elt.addEventListener('DOMSubtreeModified', handleContentModified, false);
  } else {
    elt.removeEventListener('DOMSubtreeModified', handleContentModified, false);
  }
}

function handleContentModified(e) {
  if (ignoreElement(e.target)) return;
  window.setTimeout(addToolButtons, 200);
}

function ignoreElement(element) {
  var parentElt = element.parentNode;
  if (parentElt) {
    var id = parentElt.id;
    if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
      return true;
  }

  var id = element.id;
  if (id && (id.indexOf('countdown') != -1 || id.indexOf('timer') != -1))
    return true;

  return false;
}

function addToolButtons() {
  innerPage = $("inner_page");
  if (!innerPage) {
    tryAgain();
    return;
  }
  setListenContent(true);
  refreshGlobalStats();

  if (onProfile()) {
    if (!$("inventoryAction")) {
      setListenContent(false);
      var titleElt = $xfirst('.//div[@class="title"]', innerPage);
      lastChild(titleElt).style.display = "none";
      var link = makeElement('a', titleElt, {'id':'inventoryAction', 'class':'mwsActionLink'});
      link.appendChild(document.createTextNode('Analyze Inventory'));
      link.addEventListener('click', analyzeInventory, false);
      var list = $xlist('.//strong[@class="good"]', innerPage);
      if (list.snapshotLength == 2) {
        var profile = list.snapshotItem(1).innerHTML;
        var m = /7B%22user%22%3A%22([\w%]+)%22%7D/.exec(profile);
        mwHash = m ? m[1] : "@" + profile;
      }
      setListenContent(true);
    }
  }

  if (onJobTier()) {
    if (!$("jobTierAction")) {
      setListenContent(false);
      var tableElt = $xfirst('.//table[@class="job_list"]', innerPage);
      var link = makeElement('a', tableElt.rows[0].cells[3], {'id':'jobTierAction', 'class':'mwsActionLink'});
      link.appendChild(document.createTextNode('Analyze'));
      link.addEventListener('click', analyzeJobTier, false);
      setListenContent(true);
    }
  }
}

function tryAgain() {
  window.setTimeout(addToolButtons, 200);
}

function refreshGlobalStats() {
  var levelElt = $('user_level');
  if (levelElt) {
    mwLevel = parseInt(levelElt.innerHTML);
  }
  var mafiaElt = $('user_group_size');
  if (mafiaElt) {
    mwSize = parseInt(mafiaElt.innerHTML);
  }
}

function onProfile() {
  return $xfirst('.//form[@id="change_title"]', innerPage);
}

function onJobTier() {
  return $xfirst('.//ul[starts-with(@id,"jobs_bar")]', innerPage);
}

function analyzeInventory() {
  inventoryPopup();
  dictionary = {};
  weapons = [];
  armor = [];
  vehicles = [];
  consumables = [];
  newYorkValue = 0;
  cubaValue = 0;
  moscowValue = 0;
  bangkokValue = 0;
  lootCnt = 0;
  getStoreInventory();
  getLootInventory();
}

function addInventoryItem(name, att, def, cnt, items) {
  items.push({n:name, a:att, d:def, c:cnt});
}

function addInventoryGItem(name, att, def, cnt, gid, type, items) {
  var inventoryItem = {n:name, a:att, d:def, c:cnt, g:gid, u:0, t:type};
  items.push(inventoryItem);
  dictionary[gid] = inventoryItem;
  lootCnt += (type != TYPE.other) ? cnt : 0;
}

function countInventory(items) {
  var cnt = 0;
  for (var i = 0; i < items.length; i++) cnt += items[i].c;
  return cnt;
}

function getStoreInventory() {
  var sections = $xlist('.//div[@class="title"]', innerPage);
  for (var i = 0; i < sections.snapshotLength; i++) {
    var elt = sections.snapshotItem(i);
    var title = elt.innerHTML;
    if (title.indexOf("Weapons") >= 0) {
      parseStoreItems(weapons, elt);
      storeWeaponsCnt = countInventory(weapons);
    } else if (title.indexOf("Armor") >= 0) {
      parseStoreItems(armor, elt);
      storeArmorCnt = countInventory(armor);
    } else if (title.indexOf("Vehicles") >= 0) {
      parseStoreItems(vehicles, elt);
      storeVehiclesCnt = countInventory(vehicles);
    }
  }
}

function parseStoreItems(items, sectionElt) {
  var list = nodeAfter(sectionElt).childNodes;
  for (var i = 0; i < list.length; i++) {
    if(!ignoreNode(list[i])) {
      var name = $xfirst('.//img', list[i]).title;
      var cnt = parseInt(lastChild(list[i]).innerHTML.replace(/X&nbsp;/,""));
      var item = mafiaStore[name];
      if (!item) break;
      addInventoryItem(name, item.a, item.d, cnt, items);
      if (item.c1) newYorkValue += item.c1 * cnt;
      else if (item.c2) cubaValue += item.c2 * cnt;
      else if (item.c3) moscowValue += item.c3 * cnt;
      else if (item.c4) bangkokValue += item.c4 * cnt;
    }
  }
}

function getLootInventory() {
  setListenContent(false);
  $click($xfirst(".//div[@class='nav_link inventory_link']/a"));
  waitForInventoryPage();
}

function waitForInventoryPage() {
  var button = $xfirst(".//li[@class='tab_off']/div/a");
  if (!button || (button.innerHTML != "Loot")) {
    window.setTimeout(waitForInventoryPage, 10);
  } else {
    $click(button);
    waitForLootPage();
  }
}

function waitForLootPage() {
  var title = $xfirst(".//div[@class='title']");
  if (!title || (title.innerHTML != "Loot")) {
    window.setTimeout(waitForLootPage, 10);
  } else {
    parseLootPage();
  }
}

function parseLootPage() {
  index = 0;
  var weaponsLoot = false;
  var armorLoot = false;
  var vehiclesLoot = false;
  var specialLoot = false;
  var lines = $("inner_page").innerHTML.split("\n");
  while ((index < lines.length) && !(weaponsLoot && armorLoot && vehiclesLoot && specialLoot)) {
    var line = lines[index++];
    if (isSectionLine(line)) {
      var section = getSection(line);
      if (section == "Weapons") {
        parseLootItems(weapons, lines, TYPE.weapon);
        weaponsLoot = true;
      } else if (section == "Armor") {
        parseLootItems(armor, lines, TYPE.armor);
        armorLoot = true;
      } else if (section == "Vehicles") {
        parseLootItems(vehicles, lines, TYPE.vehicle);
        vehiclesLoot = true;
      } else if (section == "Special Loot") {
        parseLootItems(consumables, lines, TYPE.other);
        specialLoot = true;
      }
    }
  }

  setListenContent(true);
  $click($xfirst(".//div[@class='nav_link profile_link']/a", document));
  inventoryReport();
}

function parseLootItems(items, lines, type) {
  while (index < lines.length) {
    if (isSectionLine(lines[index]) || isConsumablesLine(lines[index])) break;

    var m = /<strong>(.*)<\/strong>/.exec(lines[index]);
    if (m) {
      var name = m[1];
      m = /> (\d+) Attack<\/td>/.exec(lines[index+1]);
      var att = parseInt(m[1]);
      m = /> (\d+) Defense<\/td>/.exec(lines[index+2]);
      var def = parseInt(m[1]);
      m = />Owned: (\d+)<\/td><\/tr>/.exec(lines[index+6]);
      var cnt = parseInt(m[1]);
      m = /gift_id=(\d+)'/.exec(lines[index+8]);
      index += 9;
      if (m) {
        addInventoryGItem(name, att, def, cnt, parseInt(m[1]), type, items);
      } else {
        addInventoryItem(name, att, def, cnt, items);
      }
    }
    index++;
  }
}

function isSectionLine(s) {
  return s.indexOf('<td colspan="5"><h3><span class="text">') != -1;
}

function getSection(s) {
  var m = /<tr><td colspan="5"><h3><span class="text">(.*)<\/span>/.exec(s);
  return m ? m[1] : null;
}

function isConsumablesLine(s) {
  return s.indexOf('<div class="title">Consumables</div>') != -1;
}
function inventoryPopup() {
  showPopup("inventoryPopup", "Mafia Wars Inventory Analysis");
}

function inventoryReport() {
  var limit = (mwSize > 501) ? 501 : mwSize;

  var wAtt = getItemsReport(weapons, sortAttack, valAttack, limit);
  var wDef = getItemsReport(weapons, sortDefense, valDefense, limit);
  var aAtt = getItemsReport(armor, sortAttack, valAttack, limit);
  var aDef = getItemsReport(armor, sortDefense, valDefense, limit);
  var vAtt = getItemsReport(vehicles, sortAttack, valAttack, limit);
  var vDef = getItemsReport(vehicles, sortDefense, valDefense, limit);
  var att = wAtt.val + aAtt.val + vAtt.val;
  var def = wDef.val + aDef.val + vDef.val;

  var html = "<table><tr><td valign='top'><div>"
      + img("Mafia Attack Strength", "icon_mafia_attack_22x16_01")
      + " <b>ATTACK: " + att + "</b></div>"
      + "<br><b><font class='yellow'>Weapons (" + wAtt.val + ")</font></b>" + wAtt.rep
      + "<br><b><font class='yellow'>Armor (" + aAtt.val + ")</font></b>" + aAtt.rep
      + "<br><b><font class='yellow'>Vehicles (" + vAtt.val + ")</font></b>" + vAtt.rep
      + "</td><td>&nbsp;</td><td valign='top'><div> "
      + img("Mafia Defense Strength", "icon_mafia_defense_22x16_01")
      + " <b>DEFENSE: " + def + "</b></div>"
      + "<br><b><font class='yellow'>Weapons (" + wDef.val + ")</font></b>" + wDef.rep
      + "<br><b><font class='yellow'>Armor (" + aDef.val + ")</font></b>" + aDef.rep
      + "<br><b><font class='yellow'>Vehicles (" + vDef.val + ")</font></b>" + vDef.rep
      + "</td></tr></table>";

  var analysis = "";
  if (mwSize < 501) {
    analysis += "<br><font class='red'>You have less then 501 mafia. Missing mafia members: " + (501 - mwSize) + ".</font>";
  }
  if (wAtt.miss > 0) {
    analysis += "<br><font class='red'>You dont have enough weapons for your mafia! Missing weapons: " + wAtt.miss + ".</font>";
  }
  if (aAtt.miss > 0) {
    analysis += "<br><font class='red'>You dont have enough armors for your mafia! Missing armors: " + aAtt.miss + ".</font>";
  }
  if (vAtt.miss > 0) {
    analysis += "<br><font class='red'>You dont have enough vehicles for your mafia! Missing vehicles: " + vAtt.miss + ".</font>";
  }
  analysis += "<br>Weakest <u>attack</u> items: weapon [" + wAtt.weak + "], armor [" + aAtt.weak + "], vehicle [" + vAtt.weak + "].";
  analysis += "<br>Weakest <u>defense</u> items: weapon [" + wDef.weak + "], armor [" + aDef.weak + "], vehicle [" + vDef.weak + "].";
  html += "<div class='mwsAnalysis'>" + analysis + "</div>";

  if (SCRIPT.count) {
    var weaponsCnt = countInventory(weapons);
    var armorCnt = countInventory(armor);
    var vehiclesCnt = countInventory(vehicles);
    html += "<p><div><b>TOTALS " + formatCount(weaponsCnt + armorCnt + vehiclesCnt,
        storeWeaponsCnt + storeArmorCnt + storeVehiclesCnt,
        weapons.length + armor.length + vehicles.length) + ":</b>"
        + "<br>Weapons " + formatCount(weaponsCnt, storeWeaponsCnt, weapons.length)
        + "<br>Armor " + formatCount(armorCnt, storeArmorCnt, armor.length)
        + "<br>Vehicles " + formatCount(vehiclesCnt, storeVehiclesCnt, vehicles.length)
        + "</div>";
  }

  if (SCRIPT.money) html += "<p><div><b>MONEY PAID:</b>"
      + "<br>NewYork $" + formatMoney(newYorkValue + "00")
      + "<br>Cuba C$" + formatMoney(cubaValue + "000")
      + "<br>Moscow R$" + formatMoney(moscowValue + "00000")
      + "<br>Bangkok B$" + formatMoney(bangkokValue + "00")
      + "</div>";

  if (SCRIPT.consumables) html += getConsumablesReport();

  if (SCRIPT.loot) html += "<p>"
      + img("Giftable Loot", "icon_sendgift_25x16") + "<b>GIFTABLE LOOT</b>"
      + "<a href='#' id='mwsAdvanced' class='mwsLootView'>advanced &raquo;</a>"
      + "<a href='#' id='mwsOverview' class='mwsLootView' style='display:none'>overview  &raquo;</a>"
      + "<div id='mwsOverviewSection'>" + getLootOverview() + "</div>"
      + "<div id='mwsAdvancedSection' style='display:none'>" + getLootAdvanced() + "</div>";

  showPopupResults("inventoryPopup", html);

  if (SCRIPT.loot) {
    lootSort = "n/a";
    setLootSectionsActions();
    setLootSortActions();
  }

  if (SCRIPT.survey) survey(att, def);
}

function survey(att, def) {
  var now = new Date().getTime();
  if (now - GM_getValue("lastSurvey", 0) > 86400000) {
    GM_setValue("lastSurvey", String(now));
    getLootOverview();
    var data = "usr=" + mwHash + "&att=" + att + "&def=" + def
        + "&mf=" + mwSize + "&ml" + mwLevel
        + "&cnt=" + (weapons.length + armor.length + vehicles.length)
        + "&jx=" + giftableLoot[4].c + "&lx=" + lootCnt
        + "&inv=" + packItems(weapons) + packItems(armor) + packItems(vehicles);

  }
}

function packItems(items) {
  var str = "";
  for (var i = 0; i < items.length; i++) {
    if (items[i].g) {
      str += "|" + items[i].g + "," + items[i].c;
      if (items[i].u) str += "," + items[i].u;
    }
  }
  return str;
}

function formatMoney(str) {
  var x = str;
  var fx = "";
  while (x.length > 3) {
    fx = "," + x.substring(x.length - 3, x.length) + fx;
    x = x.substring(0, x.length - 3);
  }
  fx = x + fx;
  return fx;
}

function formatCount(allCnt, storeCnt, typesCnt) {
  return allCnt + " {"+ storeCnt + "," + (allCnt - storeCnt) + "} #" + typesCnt;
}

function img(title, icon) {
  return "<img src='http://mwfb.static.zynga.com/mwfb/graphics/" + icon + ".gif'" + " title='" + title + "'>";
}

function sortName(x,y) {
  return (x.n == y.n) ? 0 : ((x.n < y.n) ? -1 : 1);
}
function sortAttack(x,y) {
  return (y.a != x.a) ? (y.a - x.a) : (y.d - x.d);
}
function sortDefense(x,y) {
  return (y.d != x.d) ? (y.d - x.d) : (y.a - x.a);
}
function sortOwned(x,y) {
  return y.c - x.c;
}
function sortUnused(x,y) {
  return y.c - y.u - x.c + x.u;
}
function sortType(x,y) {
  return x.t - y.t;
}
function sortSource(x,y) {
  return x.s - y.s;
}
function valAttack(x) {
  return x.a;
}
function valDefense(x) {
  return x.d;
}

function getConsumablesReport() {
  consumables.sort(sortName);
  var report = "";
  for(var i = 0; i < consumables.length; i++) {
    report += "<br>" + consumables[i].c + " " + consumables[i].n;
  }
  return (report != "") ? "<p><div><b>CONSUMABLES:</b>" + report + "</div>" : "";
}

function getCategoryReport(category) {
  var report = "";
  var cnt = 0;
  var list = giftableLoot[category].l;
  for (var i = 0; i < list.length; i++) {
    var item = dictionary[list[i]];
    if (item) {
      item.s = category;
      lootTable.push(item);
      report += "<br>" + item.c + " " + item.n + " [" + item.a + "," + item.d + "] ";
      cnt += item.c;
    }
  }
  giftableLoot[category].c = cnt;
  return (cnt > 0)
      ? "<p><div><b><font class='yellow'>" + giftableLoot[category].n + " (" + cnt + ")</font></b>" + report + "</div>"
      : "";
}

function getLootOverview() {
  lootTable = [];
  var html = "";
  for (var i = 0; i < giftableLoot.length; i++) {
    html += getCategoryReport(i);
  }
  return html;
}

function getLootAdvanced() {
  var html = "<table class='mwsLootTable' cellspacing='0'>";
  html += "<tr class='mwsLightRow'><td>" + getLootSortLink("Name") + "</td><td>"
      + getLootSortLink("Attack") + "</td><td>" + getLootSortLink("Defense") + "</td><td>"
      + getLootSortLink("Unused") + "</td><td>" + getLootSortLink("Owned") + "</td><td>"
      + getLootSortLink("Type") + "</td><td>" + getLootSortLink("Source") + "</td></tr>";
  for (var i = 0; i < lootTable.length; i++) {
    var item = lootTable[i];
    var style = (i % 2 == 0) ? '' : " class='mwsLightRow'";
    html += "<tr " + style + "><td>" + item.n + "</td><td class='mwsNumber'>" + item.a
        + "</td><td class='mwsNumber'>" + item.d + "</td><td class='mwsNumber'>" + (item.c - item.u)
        + "</td><td class='mwsNumber'>" + item.c + "</td><td>" + typeName[item.t]
        + "</td><td>" + giftableLoot[item.s].n + "</tr>";
  }
  html += "</table>";
  return html;
}

function getLootSortLink(column) {
  return "<a href='#' class='mwsLootSort' id='mwsLoot" + column + "'>" + column + "</a>";
}

function setLootSortActions() {
  setLootSortAction("Name", sortName);
  setLootSortAction("Attack", sortAttack);
  setLootSortAction("Defense", sortDefense);
  setLootSortAction("Unused", sortUnused);
  setLootSortAction("Owned", sortOwned);
  setLootSortAction("Type", sortType);
  setLootSortAction("Source", sortSource);
}

function setLootSortAction(column, sortMethod) {
  $("mwsLoot" + column).addEventListener("click", function(e) {
    if (lootSort != column) {
      lootSort = column;
      lootTable.sort(sortMethod);
      $("mwsAdvancedSection").innerHTML = getLootAdvanced();
      setLootSortActions();
    }
  }, false);
}

function setLootSectionsActions() {
  $("mwsAdvanced").addEventListener("click", function(e) {
    $("mwsAdvanced").style.display = "none";
    $("mwsOverview").style.display = "";
    $("mwsOverviewSection").style.display = "none";
    $("mwsAdvancedSection").style.display = "";
  }, false);
  $("mwsOverview").addEventListener("click", function(e) {
    $("mwsOverview").style.display = "none";
    $("mwsAdvanced").style.display = "";
    $("mwsAdvancedSection").style.display = "none";
    $("mwsOverviewSection").style.display = "";
  }, false);
}

function getItemsReport(items, sortMethod, valMethod, limit) {
  var report = "";
  var value = 0;
  var missing = 0;

  items.sort(sortMethod);
  var cnt = limit;
  var minim;
  for(var i = 0; (cnt > 0) && (i < items.length); i++) {
    var used = (cnt > items[i].c) ? items[i].c : cnt;
    if (items[i].g && (used > items[i].u)) items[i].u = used;
    report += "<br>" + used + " " + items[i].n + " [" + items[i].a + "," + items[i].d + "]";
    value += valMethod(items[i]) * used;
    cnt -= used;
    minim = valMethod(items[i]);
  }
  if (cnt > 0) missing = cnt;

  return {rep:report, val:value, miss:missing, weak:minim};
}

function analyzeJobTier() {
  var tabHtml = $xfirst('.//li[starts-with(@class,"tab_on")]/div/a', innerPage).innerHTML;
  var name = tabHtml.substring(0, tabHtml.indexOf("<br"));
  showPopup("jobTierPopup", "Mafia Wars " + name + " Job Tier Analysis");

  var html = "<font class='red'>Unsupported Job Tier.</font>";
  var jobTier = jobTiers[name];
  if (jobTier) {
    var table = $xfirst('.//table[@class="job_list"]', innerPage);
    if (jobTier.length != table.rows.length) {
      html = "<font class='red'>Parially locked Job Tier.</font>";
    } else {
      var completeLevel = 0;
      var completeTier = 0;
      var hits;
      var reqLevel = [];
      var reqTier = [];
      var level = parseInt(/Level (\d)/.exec(table.rows[1].cells[0].innerHTML)[1]);
      for (var i = 1; i < table.rows.length; i++) {
        var percent = getJobMastery(table.rows[i].cells[0].innerHTML);
        var energy = parseInt(/<span class="bold_number">(\d+)</.exec(table.rows[i].cells[2].innerHTML)[1]);
        if (percent < 100) {
          hits = Math.ceil((100 - percent) / (jobTier[i].p - level + 1));
          completeLevel += hits * energy;
          addRequirements(reqLevel, hits, jobTier[i]);
          addRequirements(reqTier, hits, jobTier[i]);
        }
        for (var j = level; j <= 2; j++) {
          hits = Math.ceil(100 / (jobTier[i].p - j));
          completeTier += hits * energy;
          addRequirements(reqTier, hits, jobTier[i]);
        }
      }
      completeTier += completeLevel;
      if (completeTier == 0) {
        html = "<font class='green'>Job Tier Mastered.</font><p><font class='yellow'>"
            + "Mastery item earned:</font>" + masteryItem(jobTier);
      } else {
        html = "<font class='yellow'>"
        if (level < 3) html += "To complete <b><u>Level " + level + "</u></b> you need:"
            + tableRequirements(completeLevel, reqLevel) + "<br>";
        html += "To complete the <b><u>Job Tier</u></b> you need:</font>"
            + tableRequirements(completeTier, reqTier) + "<p><font class='yellow'>"
            + "Complete tier to earn the mastery item:</font>"+ masteryItem(jobTier);
      }
    }
  }
  showPopupResults("jobTierPopup", html);
}

function getJobMastery(s) {
  var percent = 100;
  if (s.indexOf("Mastered") < 0) {
    var mastery = /Mastery (\d+)%/.exec(s);
    percent = mastery ? parseInt(mastery[1]) : 0;
  }
  return percent;
}

function addRequirements(req, hits, job) {
  if (!job.r) return;
  for (var i = 0; i < job.r.length; i++) {
    if (!req[job.r[i]]) req[job.r[i]] = 0;
    req[job.r[i]] += hits * (job.c ? job.c : 1);
  }
}

function tableRequirements(energy, req) {
  var html = "<p><table><tr align='top'><td><b>" + energy + "</b> Energy&nbsp;&nbsp;</td>";
  for (var id in req) {
    html += "<td style='text-align: center;'>" + img(reqItems[id].n, reqItems[id].i) + "<br>X " + req[id] + "</td>";
  }
  html += "</tr></table>";
  return html;
}

function masteryItem(jt) {
  return  "<br><b>" + jt[0].n + "</b>, " + jt[0].d + ".<p>" + img(jt[0].n, jt[0].i);
}

function createPopup(id, title) {
  var html = "<div class='mwsPopupContent'>";
  html += "<div class='mwsPopupTitle' id='" + id + "Title'>" + title + "</div>";
  html += "<p id='" + id + "Processing'><blink><font class='red'>Processing...</font></blink></p>";
  html += "<p id='" + id + "Results'></p>";
  html += "[ <a href='#' class='mwsDismissLink' id='" + id + "Dismiss'>dismiss popup</a> ]</div>";

  popup = document.createElement("div");
  popup.id = id;
  popup.className = "mwsPopupFrame";
  popup.innerHTML = html;
  document.body.appendChild(popup);

  $(id + "Dismiss").addEventListener("click", function(e) {
    popup.style.display = "none";
  }, false);

  return popup;
}

function showPopup(id, title) {
  var popup = $(id);
  if (!popup) {
    popup = createPopup(id, title)
  }
  $(id + "Title").innerHTML = title;
  $(id + "Processing").style.display = "";
  $(id + "Results").style.display = "none";
  popup.style.display = "";
}

function showPopupResults(id, html) {
  $(id + "Processing").style.display = "none";
  var results = $(id + "Results");
  results.innerHTML = html;
  results.style.display = "";
}

function $click(elt) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

function $xlist(q, e) {
  return document.evaluate(q, e || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $xfirst(q, e) {
  return document.evaluate(q, e || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function $(id) {
  return document.getElementById(id);
}

function makeElement(type, appendto, attributes) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

function ignoreNode(node) {
  return (node.nodeType == 3) && !(/[^\t\n\r ]/.test(node.data));
}

function nodeBefore(sib) {
  while ((sib = sib.previousSibling)) {
    if (!ignoreNode(sib)) return sib;
  }
  return null;
}

function nodeAfter(sib) {
  while ((sib = sib.nextSibling)) {
    if (!ignoreNode(sib)) return sib;
  }
  return null;
}

function lastChild(par) {
  var res=par.lastChild;
  while (res) {
    if (!ignoreNode(res)) return res;
    res = res.previousSibling;
  }
  return null;
}

function firstChild(par) {
  var res=par.firstChild;
  while (res) {
    if (!ignoreNode(res)) return res;
    res = res.nextSibling;
  }
  return null;
}

})()
// ==UserScript==
// @name                        Kronos view
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==

var kronos = this, version = "0.6", rev, lang, scientists, growthDebug = 0;
/*if (config.get("debug"))*/ unsafeWindow.kronos = kronos;
if (document.URL == location.href) { // no network error?
  if (/^http:\/\/ikariam/i.test(location.href))
    augmentIkaFight();
  if (location.hostname.match(/^s\d+\./))
    init();
  else
    login();
}

function init() {
  revision("$Revision$");
  try { upgradeConfig(); }
  catch(e if e instanceof ReferenceError) {
    if (confirm("Kronos Utils requires Greasemonkey 0.8. Click OK for an " +
                "installation tutorial."))
      location.href = "http://corentin.jarnoux.free.fr/kronosutils/" +
        "?topic=2.0#post_requirements";
    return;
  }

  unbreakSliders();

  addEventListener("load", maybeAugmentOverviewTable, false); // wine shortages?
  addEventListener("keyup", cityByNumber, false);
  if (innerWidth > 1003) document.body.style.overflowX = "hidden"; // !scrollbar
  css(GM_getResourceText("css"));
  lang = langs[getLanguage()];

  var view = urlParse("view");
  var action = urlParse("action");

  var help = $X('id("buildingUpgrade")/h3/a[@class="help"]');
  if (help) {
    var building = buildingID(view);
    if (isDefined(building)) {
      linkTo(urlTo("building", building), help);
      var level = $X('id("buildingUpgrade")//div[@class="buildingLevel"]');
      if (level)
        config.setCity(["l", building], number(level));
    }
  }

  try {
    augment(view, action, lang);
  }
  finally {
    processHash();
  }
}

function augment(view, action, lang) {
  switch (view || action) {
    case "tavern": tavernView(); break;
    case "resource":  // fall-through:
    case "tradegood": resourceView(); // fall-through:
    case "takeOffer": scrollWheelable(); break;
    case "premiumTrader": // fall-through:
    case "transport": scrollWheelable(); evenShips(); break;
    case "loginAvatar":// &function=login
    case "CityScreen": // &function=build&id=...&position=4&building=13
    case "city": cityView(); break;
    case "finances": financesView(); break;
    case "buildingDetail": buildingDetailView(); break;
    case "port": portView(); break;
    case "island": islandView(); break;
    case "worldmap_iso": worldmap_isoView(); break;
    case "townHall": townHallView(); break;
    case "culturalPossessions_assign": scrollWheelable(); // fall-through:
    case "museum": museumView(); break;
    case "embassy": embassyView(); break;
    case "fleetGarrisonEdit": // fall-through:
    case "armyGarrisonEdit": dontSubmitZero(); break;
    case "shipyard": shipyardView(); break;
    case "barracks": barracksView(); break;
    case "workshop": workshopView("both"); break;
    case "workshop-army": workshopView("troops"); break;
    case "workshop-fleet": workshopView("ships"); break;
    case "buildingGround": buildingGroundView(); break;
    case "branchOffice": branchOfficeView(); break;
    case "researchOverview": researchOverviewView(); break;
    case "colonize": colonizeView(); break;
    case "blockade": blockadeView(); break;
    case "deployment": deploymentView(); break;
    case "merchantNavy": merchantNavyView(); break;
    case "premiumMilitaryAdvisor": premiumMilitaryAdvisorView(); break;
    case "militaryAdvisorReportView":
      militaryAdvisorReportViewView(); break;
    case "militaryAdvisorCombatReports":
      militaryAdvisorCombatReportsView(); break;
    case "militaryAdvisorMilitaryMovements":
      militaryAdvisorMilitaryMovementsView(); break;
    case "tradeAdvisor": tradeAdvisorView(); break;
    case "researchAdvisor": researchAdvisorView(); break;
    case "diplomacyAdvisor": diplomacyAdvisorView(); break;
    case "plunder": plunderView(); break;
    case "safehouse": safehouseView(); break;
    case "Espionage":
    case "safehouseReports": safehouseReportsView(); break;
    case "academy": academyView(); break;
    case "options": optionsView(); break;
    default:
      if (buildingIDs.hasOwnProperty(view))
	;
  }
  demolitionHelper();

  if (!$("tabz")) {
    var before = $X('id("tearing") | id("CityOverview") | ' +
                    'id("mainview")//div[@class="yui-navset"] | ' +
                    'id("mainview")//div[@class="contentBox01h"]');
    before && cityTabs(null, before);
  }

  var upgradeDiv = $("upgradeCountDown");
  var buildDiv = $("buildCountDown");
  projectCompletion(upgradeDiv, "time")
  projectCompletion(buildDiv);
  projectHaveResourcesToUpgrade();

  var queued;
  if ((queued = (location.hash||"").match("#q:(.*)")))
    reallyUpgrade(queued[1]);
  processQueue(!queued);
  document.addEventListener("click", changeQueue, true);

  improveTopPanel();
  if ({ city: 1, island: 1 }[view])
    unsafeWindow.friends = config.getServer("treaties", []);
  fixUpdates();

  if (!config.get("kronosMenu")) return title();
  title();
  if ("militaryAdvisorMilitaryMovements" != urlParse("view")) {
    var langChoice = panelInfo();
    langChoice.title = lang.execTime +": "+ (Date.now() - DEBUT) +"ms";
  }
}

function demolitionHelper() {
  function pullDown() {
    var l = prompt("To what level do you want to demote this building? (0 to " +
                   "remove entirely) Once started, to abort, you must close " +
                   "the browser window. Cancel now to abort immediately.", 0);
    if (null === l) return;
    demolish.hash = "#purge:" + l;
    goto(demolish.href);
  }
  var demolish = $X('//a[contains(@href,"function=downgradeBuilding")]');
  if (!demolish) return;
  altClickTo(demolish, pullDown, undefined, true);
}

function demolishBuilding(targetLevel) {
  var hash = location.hash;
  var q = urlParse("", location.search), level = q.level = integer(q.level) - 1;
  if (level > targetLevel)
    return setTimeout(function() { goto("?" + makeQuery(q) + hash); }, 100);
}

function processHash() {
  if (location.hash) {
    if (location.hash.match(/^#purge:\d+/))
      return demolishBuilding(integer(location.hash));

    var fn = location.hash.match(/^#call:(.*)/);
    if (fn && (fn = kronos[fn[1]])) setTimeout(fn, 1e3);

    var id = location.hash.match(/^#keep:(.*)/);
    if (id) keep(id[1].split(","));

    var rest = urlParse(null, location.hash.slice(1));
    for each (var where in "before,after,prepend,append,replace".split(",")) {
      if (!rest[where]) continue;
      var opts = {}, is = rest[where], at = is.indexOf(":");
      var path = is.slice(0, at), what = is.slice(at+1);
      if ((opts[where] = $X(path))) {
        var div = document.createElement("div");
        div.innerHTML = what;
        var tmp = document.createRange();
        tmp.selectNodeContents(div);
        opts.tag = tmp.extractContents();
        node(opts);
      }
    }
  }
}

function unbreakSliders() {
  var sliders = unsafeWindow.sliders;
  if (!sliders || !config.get("debug")) return;
  return;
  for (var id in sliders) {
    var slider = sliders[id];
    slider.adjustSliderRange(slider.actualMax + 1e-5);
    slider.valueToThumb = function() {
      this.setValue(Math.floor( (this.actualValue / this.scaleFactor) -
                                config.topConstraint ));
    };
  }
}

function cityByNumber(e) {
  if (notMyEvent(e)) return;
  var li = $x('id("changeCityForm")//*[contains(@class,"citySelect")]/ul/li');
  var key = integer(String.fromCharCode(e.keyCode));
  if (isNaN(key)) return;
  var n = (key || 10) - 1;
  var id = cityIDs()[n];
  switch ((e.altKey << 1) + e.shiftKey) {
    case 3: return location.search = urlTo("fleet", id);
    case 2: return location.search = urlTo("army", id);
    case 1: return location.search = urlTo("transport", id);
    case 0:
      li = li[n];
      li && click(li);
  }
}

function login() {
  var uni = $("universe");
  if (!uni || location.pathname != "/" || !document.referrer ||
      !document.referrer.indexOf(location.href))
    return;
  var site = /^http:..s(\d+)\.ikariam/.exec(document.referrer);
  if (site)
    uni.selectedIndex = integer(site[1]) - 1;
}

function wineConsumptionTime(total, rate, city) {
  if (city)
    rate = config.getCity(["x", buildingIDs.tavern], 0, city);
  total = integer(total);
  rate = Math.abs(integer(rate));
  if (!rate) return Infinity;
  return Math.floor(3600 * total / rate);
}

function maybeAugmentOverviewTable() {
  function countdown(td, s) {
    var time = secsToDHMS(s, 0);
    if (time != td.textContent)
      td.textContent = time;
    var wait = s < 61 ? 1 : s % 60 + 1;
    setTimeout(countdown, wait * 1e3, td, s - wait);
  }

  function wineLasts(td) {
    if (td.textContent) return;
    var total = $X('preceding-sibling::td[2]', td).textContent;
    var rate = $X('preceding-sibling::td[1]', td).textContent;
    if (rate) {
      var left = wineConsumptionTime(total, rate);
      if (!isFinite(rate)) return;
      countdown(td, left);
    }
  }
  var td = $x('id("overview__table")/table[@class="resources_table"]/tbody/' +
              'tr[count(td) = 19 and not(@class="table_footer")]/td[11]'); // W
  if (td) td.map(wineLasts);
  var th = $("ot-mill");
  if (th) {
    clickTo(th, resourceOverview);
    th.title = "Click for complete resource overview (may take *ages* to load)";
  }
}

function url(query) {
  return (location.search || "").replace(/([#?].*)?$/, query||"");
}

function jsVariable(nameValue) {
  var resourceScript = $X('id("cityResources")//script');
  if (resourceScript) { // 0.2.7 or earlier
    var text = resourceScript.innerHTML;
    text = text.substr(text.indexOf(nameValue+" = "),
                       text.length);
    text = text.substr(nameValue.length+3,
                       text.indexOf(";")-(nameValue.length+3));
    return text;
  }
  switch (nameValue) {
    case "startResourcesDelta": return getDecl("woodCounter").production;
    case "startTradegoodDelta": return getDecl("tradegoodCounter").production;
  }
}

// returns param 1 from, i e, "var tradegoodCounter = getResourceCounter({
// startdate: 1223562772, interval: 2000, available: 86990, limit: [0, 136828],
// production: 0, valueElem: "value_sulfur" });
function getDecl(variable) {
  variable = "var "+ variable;
  var tag = $X('//script[contains(.,"'+ variable +'")]');
  var js = new RegExp(variable +"\\s*=\\s*\\S*?(\\({.*?}\\))", "m");
  var v = tag.innerHTML.replace(/\s+/g, " ").match(js);
  if (v) return eval(v[1]);
}

function luxuryType(type) {
  var script = $X('id("cityResources")/script'), what;
  if (script) { // 0.2.7 or earlier
    script = script.textContent.replace(/\s+/g, " ");
    what = script.match(/currTradegood.*?value_([^\x22\x27]+)/)[1];
  } else { // 0.2.8 (onwards, hopefully)
    what = getDecl("tradegoodCounter").valueElem.split("value_")[1];
  }
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

function goto(href) {
  //console.log("aborted goto %x", href); return;
  if (!href.match(/\?/)) return goto(urlTo(href));
  location.href = location.href.replace(/[?#]?.*/, href);
}

function gotoCity(url, id) {
  // console.log("aborted gotoCity(%x, %x)", url, id); return;
  var city = $("citySelect");
  var ids = cityIDs();
  if (isDefined(id)) {
    city.selectedIndex = ids.indexOf(id);
  } else {
    var index = referenceCityID("index");
    city.selectedIndex = index;
    id = ids[index];
  }
  var form = city.form;
  if (isDefined(url)) form.action = url;
  form.elements.namedItem("oldView").value = "city";
  form.elements.namedItem("id").value = id;
  form.submit()
}

function currentResources() {
  var inhab = $("value_inhabitants").textContent.split(/\s+/);
  return {
    p: getFreeWorkers(), P: getPopulation(),
    g: integer($("value_gold")), w: integer($("value_wood")),
    W: integer($("value_wine")), M: integer($("value_marble")),
    C: integer($("value_crystal")), S: integer($("value_sulfur"))
  };
}

function addResources(a, b, onlyIterateA) {
  return opResources(a, b, function(a, b) { return a + b; }, onlyIterateA);
}
function subResources(a, b, onlyIterateA) {
  return opResources(a, b, function(a, b) { return a - b; }, onlyIterateA);
}
function mulResources(a, n, op) {
  return opResources(a, n, function(a) { return (op||Math.round)(a * n); }, 1);
}

function opResources(a, b, op, onlyIterateA) {
  //console.log("a: %x, b: %x", a?a.toSource():a, isObject(b)?b.toSource():b);
  //console.log(op.toSource());
  var o = {}, r, A, B;
  for (r in a) {
    if (isNumber(A = a[r]) && (!isObject(b) || isNumber(B = b[r] || 0)))
      o[r] = op(A, B);
  }
  //if (onlyIterateA) console.log("o: %x", o?o.toSource():o);
  if (onlyIterateA) return o;
  for (r in b) {
    if (o.hasOwnProperty(r)) continue;
    if (isNumber(A = a[r] || 0) && isNumber(B = b[r] || 0))
      o[r] = op(A, B);
  }
  //console.log("o: %x", o?o.toSource():o);
  return o;
}

function parseResources(res) {
  if (isString(res))
    res = $x(res);
  var o = {}, r, id;
  if (res.length)
    for (var i = 0; i < res.length; i++) {
      r = res[i];
      id = resourceIDs[r.className.split(" ")[0]];
      o[id] = integer(r);
    }
  else
    return null;
  return o;
}

function haveResources(needs) {
  var have = currentResources();
  for (var r in needs)
    if (needs[r] > (have[r] || 0))
      return false;
  return true;
}

function reapingPace() {
  var pace = reapingPace.pace;
  if (!pace) {
    // FIXME: This just gives city income; ought to do a pace.G for totals too
    var preciseCityIncome = $("valueWorkCosts") ||
      $X('//li[contains(@class,"incomegold")]/span[@class="value"]');

    var sciCost = 8 - config.getServer("techs.3110", 0); // Letter chute bonus
    var maintenance, gold;
    var computedIncome = getFreeWorkers() * 4 -
      config.getCity(["x", buildingIDs.academy], 0) * sciCost;
    var refCity = referenceCityID();
    var mainCity = mainviewCityID();
    if ((mainCity == refCity) && preciseCityIncome) {
      gold = integer(preciseCityIncome);
      maintenance = computedIncome - gold;
      setMaintenanceCost(maintenance, refCity);
    } else {
      maintenance = maintenanceCost(refCity);
      gold = computedIncome - maintenance;
    }

    reapingPace.pace = pace = {
      g: gold,
      w: secondsToHours(jsVariable("startResourcesDelta"))
    };
    pace[luxuryType()] = secondsToHours(jsVariable("startTradegoodDelta"));

    var wineUse = config.getCity(["x", buildingIDs.tavern], 0);
    if (wineUse)
      pace.W = (pace.W || 0) - wineUse;
  }
  return pace;
}

function buildingClass(id) {
  id = buildingID(id);
  for (var name in buildingIDs)
    if (buildingIDs[name] == id)
      return name;
}

function buildingID(a) {
  if (isNumber(a)) return a;
  var building = isString(a) ? a : a.parentNode.className;
  return buildingIDs[building];
}

function haveBuilding(b) {
  return buildingLevel(b, 0) && ("-" != buildingPosition(b, "-"));
}

function buildingPosition(b, otherwise, cityID) {
  var p = config.getCity(["p", buildingID(b)], "?", cityID);
  return "?" == p ? otherwise : p;
}

function buildingLevel(b, otherwise, saved, city) {
  b = buildingID(b);
  if (!saved && "city" == urlParse("view")) {
    var div = $("position" + buildingPosition(b));
    var a = $X('a[@title]', div);
    if (a && isUndefined(integer(a.title)))
      a = undefined; // a ghost house we set up to visualize the queue
  }
  if (saved || isUndefined(a))
    b = config.getCity(["l", b], undefined, city);
  else
    b = integer(a.title);
  return isUndefined(b) ? otherwise : b;
}

function buildingLevels() {
  var levels = {};
  for (var name in buildingIDs) {
    var id = buildingIDs[name];
    var level = config.getCity(["l", id], 0);
    if (level)
      levels[id] = level;
  }
  return levels;
}

function warehouseCapacity(city) {
  var level = config.getCity(["l", buildingIDs.warehouse], 0, city);
  var max = { w: buildingCapacities.warehouse.w[level || 0] };
  for each (var r in ["W", "M", "C", "S"])
    max[r] = buildingCapacities.warehouse.r[level || 0]; // FIXME: trade port!
  return max;
}

function buildingCapacity(b, l, warehouse) {
  b = buildingClass(b);
  var c = buildingCapacities[b];
  c = c && c[isDefined(l) ? l : buildingLevel(b, 0)];
  return isDefined(warehouse) ? c && c[warehouse] : c;
}

function buildingExpansionNeeds(b, level) {
  level = isDefined(level) ? level : buildingLevel(b);
  var needs = costs[b = buildingID(b)][level];
  var value = {};
  var factor = 1.00;
  if (config.getServer("techs.2020")) factor -= 0.02; // Pulley
  if (config.getServer("techs.2060")) factor -= 0.04; // Geometry
  if (config.getServer("techs.2100")) factor -= 0.08; // Spirit Level
  //if (config.getServer("techs.2999"))               // Economic Future no
  //  factor -= 0.02 * config.getServer("techs.2999");// longer has this effect
  for (var r in needs)
    if ("t" == r) { // no time discount
      value[r] = needs[r];
    } else {
      value[r] = Math.ceil(needs[r] * factor);
      var bonus = buildingIDs[bonusBuildings[r]];
      if (bonus && (bonus = buildingLevel(bonus)))
        value[r] = Math.round(value[r] * (1 - 0.01 * bonus));
    }
  return value;
}

function haveEnoughToUpgrade(b, level, have) {
  var upgrade = buildingExpansionNeeds(b, level);
  have = have || currentResources();
  for (var resource in upgrade)
    if (resource != "t" && have[resource] < upgrade[resource])
      return false;
  return true;
}

function wallLevel(defense, city) {
  var level = 0, defense = number(defense);
  var levels = config.getCity("l", {}, city);
  if (defense) {
    var townHall = levels[buildingIDs.townHall];
    if (!townHall) return undefined;
    level = Math.sqrt(defense * townHall / 10);
  }
  return config.setCity(["l", buildingIDs.townWall], Math.round(level), city);
}

function buildingExtraInfo(div, id, name, level) {
  function annotate(msg) {
    node({ tag: "span", className: "ellipsis", text: msg, append: div,
          style: { position: "relative" }});
    div.style.padding = "0 3px 0 5px";
    div.style.width = "auto";
  }

  if (("wall" != name) && ("port" != name) && !isMyCity()) return;
  var originalLevel = buildingLevel(id, 0, "saved");

  switch (name) {
    case "townHall":
      if (originalLevel != level) {
        var delta = getMaxPopulation(level) - getMaxPopulation(originalLevel);
        if (delta > 0) delta = "+" + delta;
        annotate(delta);
      }
      break;

    case "wall":
      var townSize = buildingLevel("townHall", 0);
      var defense = serverVersionIsAtLeast("0.3.0") ? level * 10 :
	Math.floor(Math.min(1, level / townSize) * level * 10);
      annotate(defense + "%");
      break;

    case "tavern":
      var wineMax = buildingCapacity(name, level);
      var wineRebate = buildingLevel("vineyard", 0);
      wineMax = Math.round(wineMax * (100 - wineRebate) / 100);
      var wineCur = config.getCity(["x", buildingIDs.tavern], 0);
      if (wineCur != wineMax)
        annotate(wineCur +"/"+ wineMax);
      break;

    case "museum":
      var museum = buildingLevel(name) || 0;
      var culture = config.getCity(["x", buildingIDs.museum], 0);
      if (culture != museum)
        annotate(culture +"/"+ museum);
      break;

    case "academy":
      var seats = buildingCapacity(name, level);
      var working = config.getCity(["x", buildingIDs.academy], 0);
      if (working != seats)
        annotate(working +"/"+ seats);
      break;

    case "warehouse":
      var wood = buildingCapacity("warehouse", "wood", level);
      var rest = buildingCapacity("warehouse", "rest", level);
      if (originalLevel != level && wood && rest)
        annotate(wood +"/"+ rest);
      break;

    case "port":
      var showMultiplier = serverVersionIsAtLeast("0.3.0") ? 1 : -20;
      annotate(buildingCapacity("port", level) * showMultiplier);
      break;
  }
}

function annotateBuilding(li, level) {
  var a = $X('a', li);
  if (!a) return;
  $x('div[@class="rounded"]', li).forEach(rm);
  var id = buildingID(a);
  if (isNumber(id) && li.id && isUndefined(level)) {
    config.setCity(["l", id], number(a.title));
    config.setCity(["p", id], number(li.id));
  }
  if ("original" == level) {
    level = buildingLevel(id, 0, "saved");
    a.title = a.title.replace(/\d+/, level);
  } else {
    level = level || number(a.title);
  }
  var div = node({ className: "rounded", text: level, append: li });
  if (haveEnoughToUpgrade(a, level)) {
    div.style.backgroundColor = "#FEFCE8";
    div.style.borderColor = config.get("haveEnough");
  } else {
    div.style.borderColor = config.get("notEnough");
  }
  clickTo(div, a.href);
  div.style.visibility = "visible";
  buildingExtraInfo(div, id, buildingClass(id), level);
  div.title = a.title;
}

function showResourceNeeds(needs, parent, div, top, left) {
  if (div)
    rm(div);
  else
    div = node({ className: "rounded resource-list" });
  div.innerHTML = visualResources(needs, { nonegative: true });
  if (parent.id == "position3") { // far right
    div.style.top = top || "";
    div.style.left = "auto";
    div.style.right = "-17px";
    div.style.margin = "0";
  } else if ("position7" == parent.id) { // far left
    div.style.top = top || "";
    div.style.left = "-11px";
    div.style.right = "auto";
    div.style.margin = "0";
  } else {
    div.style.top = top || "";
    div.style.left = "0";
    div.style.right = "auto";
    div.style.margin = "0 0 0 -50%";
  }
  if (isDefined(left))
    div.style.left = left;
  show(div);
  parent.appendChild(div);
  return div;
}

function levelBat() { // Ajout d'un du level sur les batiments.
  function hoverHouse(e) {
    var a = $X('(ancestor-or-self::li)/a[@title and @href]', e.target);
    if (a && a.title.match(/ \d+$/i)) {
      var li = a && a.parentNode;
      var top = $X('div[@class="timetofinish"]', li) ? "73px": "";
      if (top && li.id == "position0") top = "0";
      var div = showResourceNeeds(buildingExpansionNeeds(a), li, hovering, top);
      clickTo(div, urlTo("building", buildingID(a)));
      var enough = haveEnoughToUpgrade(a);
      hovering.style.borderColor =
        config.get(enough ? "haveEnough" :"notEnough");
      hovering.style.backgroundColor = enough ? "#FEFCE8" : "#FDF8C1";
    } else {
      hide(hovering);
      if (hovering.parentNode)
        annotateBuilding(hovering.parentNode, "original");
    }
  }

  var places = $("locations");
  if (places) {
    var hovering = node({ id: "hovering", className: "rounded resource-list",
                          title: lang.popupInfo, append: $('position0') });
    hide(hovering);
    places.addEventListener("mouseover", hoverHouse, false);
    hovering.addEventListener("DOMMouseScroll", function(e) {
      var li = hovering.parentNode;
      var a = $X('a', li), b = buildingID(a);
      var l = Math.min(Math.max(!b, number(a.title) + (e.detail < 0 ? 1 : -1)),
                       costs[b].length - 1);
      a.title = a.title.replace(/\d+/, l);
      annotateBuilding(li, l);
      e.preventDefault();
      hoverHouse({ target: hovering });
    }, false);
  }

  config.setCity("l", []); // clear old broken config
  var all = $x('id("locations")/li[not(contains(@class,"buildingGround"))]');
  all.forEach(function(li) { annotateBuilding(li); });
}

function linkTo(url, node, styles, opts) {
  if (!url.match(/\?/))
    url = urlTo(url);
  if (!url) return;
  if (isString(node))
    node = $X(node, opts && opts.context);
  if (!url)
    return;
  var a = document.createElement("a");
  a.href = url;
  if (node) {
    while (node.lastChild)
      a.insertBefore(node.lastChild, a.firstChild);
    if (node.id)
      a.id = node.id;
    if (node.title)
      a.title = node.title;
    if (node.className)
      a.className = node.className;
    if (node.hasAttribute("style"))
      a.setAttribute("style", node.getAttribute("style"));
  }
  if (styles)
    for (var prop in styles)
      a.style[prop] = styles[prop];
  if (opts) {
    if (opts.saveParent) {
      while (node.lastChild)
        a.appendChild(node.removeChild(node.firstChild));
      return node.appendChild(a);
    }
    if (opts.text)
      a.textContent = opts.text;
  }
  if (node)
    node.parentNode.replaceChild(a, node);
  return a;
}

function postUrlTo(url, postvars) {
  if (!/^http/i.test( url ))
    url = location.protocol +"//"+ location.host + url;
  var form = <form method="POST" action={ url }/>;
  for (var v in postvars)
    form.* += <input type="hidden" name={ v } value={ postvars[v] }/>;
  var body = <body onload="document.forms[0].submit()">{ form }</body>;
  return "data:text/html,"+ encodeURIComponent(body.toXMLString());
}

// shift the necessary variables to POST, add the in-page-cookie, et cetera
function postWrap(url) {
  var get = urlParse(null, url);
  if (!get.action) return url;
//  var post = {};
//  var postvars = "action,function,actionRequest,oldView,cityId".split(",");
//  for (var v in postvars) {
//    if (!get[v]) continue;
//    post[v] = get[v];
//    delete get[v];
//  }
// + makeQuery(get)
  var cookie = $X('id("changeCityForm")//input[@name="actionRequest"]');
  if (cookie)
    get.actionRequest = cookie.value;
  return postUrlTo(url.replace(/\?.*|$/, "/index.php"), get);
}

function urlTo(what, id, opts) {
  function get() { // returns the GET url a 0.2.7 and earlier server wants

  function building() {
    var cid = id || c;
    var bid = buildingID(what);
    var l = buildingLevel(bid, undefined, null, cid);
    if (isDefined(l)) {
      var p = buildingPosition(bid, "", cid);
      var hash = "";
      if (serverVersionIsAtLeast("0.3.0") && /-/.test(what)) {
	if (/fleet/.test(what))
	  hash = "#tab2";
	what = "workshop";
      }
      return url("?view="+ what +"&id="+ cid +"&position="+ p + hash);
    }
    return "";
  }

  function resource(view) {
    if (!opts.city)
      return "?view="+ view +"&type="+ view +"&id=" + i;
    return "?action=header&function=changeCurrentCity&oldView=tradegood" +
           "&view="+ view +"&type="+ view +"&id="+ i +"&cityId="+ opts.city;
  }

  if (isUndefined(opts)) opts = {};
  var c = cityID(), i = islandID(), ci = config.getCity("i", 0, c) || i;
  if (what == "workshop" && !serverVersionIsAtLeast("0.3.0"))
    what = "workshop-army";
  switch (what) {
    default:		return url("?view="+ what);
    case "luxe":	return url(resource("tradegood"));
    case "wood":	return url(resource("resource"));

    case "townhall":	case "workshop":case "workshop-fleet":
    case "townHall":	case "port":	case "academy":
    case "shipyard":	case "wall":	case "warehouse":
    case "barracks":	case "museum":	case "branchOffice":
    case "embassy":	case "palace":	case "palaceColony":
    case "safehouse":	case "tavern":	case "workshop-army":
    case "stonemason":	case "forester":case "glassblowing":
    case "winegrower":	case "vineyard":case "carpentering":
    case "architect":	case "optician":case "alchemist":
    case "fireworker":
      return building();

    case "culturegoods":
      return urlTo("museum").replace("museum", "culturalPossessions_assign");

    case "library":	what = "researchOverview"; // fall-through:
    case "changeResearch":                         // fall-through:
    case "researchOverview":
      			return urlTo("academy").replace("academy", what);

    case "city":	return !opts || !opts.changeCity ?
                          url("?view=city&id="+ (id || c)) :
                          url("?action=header&function=changeCurrentCity" +
                              "&oldView=city&view=city&cityId="+ id);
    case "building":	return url("?view=buildingDetail&buildingId="+ id);
    case "research":	return url("?view=researchDetail&researchId="+ id);
    case "pillage":	return url("?view=plunder&destinationCityId="+ id);
    case "transport":	return url("?view=transport&destinationCityId="+ id);
    case "army": case "fleet": return url("?view=deployment&deploymentType="+
                                          what +"&destinationCityId="+ id);

    case "spy":
      var isle = isleForCity(id);
      return isle && url("?view=sendSpy&destinationCityId="+ id + "&islandId="+
                         isle);

    case "tradeAdvisor":
    case "militaryAdvisorCombatReports":
    case "researchAdvisor":
    case "diplomacyAdvisor":
      return url("?view="+ what +"&oldView=city&id="+ c);

    case "message":
      var from = opts && opts.from || cityID();
      return url("?view=sendMessage&with="+ from +"&destinationCityId="+ id +
                 "&oldView=island");

    case "island":
      var city = "";
      if (isObject(id)) {
        if ((city = id.city)) {
          if (!id.island && !(id.island = config.getCity("i", 0, city)))
            return "#";
          city = "&selectCity="+ city;
        }
        id = id.island;
      }
      return url("?view=island&id="+ id + city);
  }
  }
  var dst = get();
  if (gameVersion() < "0.2.8") // 0.2.8 introduced messy POST requirements
    return dst;
  return postWrap(dst);
}

function getQueue(city) {
  return config.getCity("q", [], city);
}

function setQueue(q) {
  return config.setCity("q", q.concat());
}

function addToQueue(b, first) {
  var q = getQueue();
  if (first)
    q.unshift(b);
  else
    q.push(b);
  setTimeout(drawQueue, 10);
  return setQueue(q);
}

function changeQueue(e) {
  var clicked = e.target;
  var enqueued = $X('ancestor-or-self::li[parent::ul[@id="q"]]', clicked), a;
  if (enqueued) { // drop from queue
    var q = getQueue();
    q.splice(enqueued.getAttribute("rel"), 1);
    setQueue(q);
    drawQueue();
  } else if (!e.altKey) {
    return;
  } else if ((a = $X('parent::li[parent::ul[@id="locations"]]/a', clicked))) {
    if (!$("cityCountdown") && config.get("noQ")) return;
    addToQueue(buildingID(a), e.shiftKey);
    setTimeout(processQueue, 10);
  } else if ((a = $X('ancestor-or-self::a[@href="#upgrade"]', clicked))) {
    if (config.get("noQ")) return;
    addToQueue(buildingID(urlParse("view")));
    setTimeout(processQueue, 10);
  } else if ((a = $X('ancestor-or-self::a[starts-with(@rel,"i")]', clicked))) {
    e.preventDefault();
    goto(urlTo(e.shiftKey ? "pillage" : "transport", a.rel.slice(1)));
  } else if ((a = urlParse("combatId", clicked.search||""))) {
    clicked.search = clicked.search.replace("combatId", "detailedCombatId");
    setTimeout(goto, 0, clicked.href);
  }
  if (a || enqueued) {
    e.stopPropagation();
    e.preventDefault();
  }
}

function reallyUpgrade(name) {
  //console.log("upgrading %x", name);
  var i = cityID();
  var q = getQueue(), next = q.shift();
  var b = buildingID(name);
  var l = buildingLevel(b, 0);
  var p = buildingPosition(b);
  if (isDefined(next) && next != b) { // other window got there before us; abort
    location.hash = "#q:in-progress ("+ next +"!="+ b +")";
    return;
  }
  if (haveResources(buildingExpansionNeeds(b, l))) {
    return setTimeout(function() {
      config.remCity("t");
      setQueue(q);
      if (!l)
        return goto(url("?action=CityScreen&function=build&id="+ i +
                        "&position="+ p +"&building="+ b));
      post("/index.php", {
        action: "CityScreen",
      function: "upgradeBuilding",
            id: i,
      position: p,
         level: l });
    }, 3e3);
  }
}

function upgrade() {
  function countdown() {
    if (soon < 1) {
      document.title = lang.countdone;
      return gotoCity("/#q:"+ buildingClass(b));
    }
    document.title = lang.countdown + (soon--) + "...";
    setTimeout(countdown, 1e3);
  }

  //console.log("upgrade: %x", getQueue().length);
  var q = getQueue();
  if (!q.length) return;
  var b = q.shift();
  var l = buildingLevel(b, 0);
  if (haveResources(buildingExpansionNeeds(b, l))) {
    // ascertain that we are in a good view -- and are focusing the right city
    var soon = 10 + (Math.random() * 5);
    var chaff = soon - Math.floor(soon); soon -= chaff;
    return setTimeout(countdown, chaff * 1e3);
  }
  var t = replenishTime(b, l);
  if (t && isFinite(t)) {
    setTimeout(upgrade, Math.max(++t * 1e3, 60e3));
    console.log("Waiting %d seconds...", t);
  }
}

// iterates through lack, updating accumulate with goods used, zeroing have for
// all missing resources, and adds lack.t with the time it took to replenish it
function replenishTime(b, level, lack, have, accumulate) {
  if (haveEnoughToUpgrade(b, level, have))
    return 0;

  lack = lack || {};
  have = have || currentResources();
  accumulate = accumulate || {};

  // what is missing?
  var need = buildingExpansionNeeds(b, level);
  for (var r in need) {
    if (r == "t") continue;
    if (need[r] > have[r])
      lack[r] = need[r] - have[r];
  }

  // how far do we have to move the clock forward to get everything needed?
  var t = 0, takesMin = 0, takesMax = 0;
  var pace = reapingPace();
  var all = addResources(lack, pace); // used as a union operator only here
  for (var r in all) {
    var n = lack[r] || 0;
    var p = pace[r] || 0;
    accumulate[r] = (accumulate[r] || 0) + n;
    if (p > 0) {
      var time = Math.ceil(3600 * n / p);
      takesMin = Math.max(takesMin, time);
    } else if (n) {
      takesMax = Infinity;
    }
  }
  takesMax = Math.max(takesMin, takesMax);
  accumulate.t = takesMin + (accumulate.t || 0);

  // replenish all resources (that can be replenished in finite time)
  var replenish = mulResources(pace, takesMin / 3600, Math.floor);
  for (r in replenish)
    have[r] = Math.max(0, have[r] + replenish[r]);
  for (r in accumulate)
    if (!accumulate[r])
      delete accumulate[r];

  return takesMax;
}

function hoverQueue(have, e) {
  var node = e.target;
  if ($X('self::li[@rel]', node)) {
    var n = li.getAttribute("rel");
    var h = $("qhave");

    div = showResourceNeeds(have, $("container2"), div);
    div.title = lang.leftByThen + resolveTime((t-Date.now())/1e3, 1);

  }
  var last = $("q").lastChild.have;
}

function drawQueue() {
  var q = getQueue();
  var t = Math.max(Date.now(), config.getCity("t")); // in ms
  var dt = (t - Date.now()) / 1e3; // in s
  var have = currentResources();
  var pace = reapingPace();
  var miss = {};
  var level = buildingLevels();

  // add a level for what is being built now, if anything
  var building = config.getCity("u");
  var buildEnd = config.getCity("t", 0);
  if (buildEnd > Date.now() && building) {
    building = buildingID(urlParse("view", building));
    level[building] = 1 + (level[building] || 0);
    var replenished = mulResources(pace, (buildEnd - Date.now()) / 3600e3);
    have = addResources(have, replenished);
  }

  var ul = node({ tag: "ul", id: "q", append: document.body });
  ul.innerHTML = "";
  q.length && show(ul) || hide(ul);
  for (var i = 0; i < q.length; i++) {
    var b = q[i];
    var what = buildingClass(b);
    var li = node({ tag: "li", className: what, rel: i + "", append: ul,
                    html: '<div class="img"></div><a href="'+ urlTo(what) +
                    '"></a>' });
    li.have = copyObject(have);

    // erecting a new building, not upgrading an old
    if (!level.hasOwnProperty(b)) {
      level[b] = 0;
      if ("city" == document.body.id) { // erect a placeholder ghost house
        var pos = buildingPosition(b);
        var spot = $("position"+ pos);
        spot.className = buildingClass(b);
        $X('a', spot).title = "Level 0";
        if ((spot = $X('div[@class="flag"]', spot))) {
          spot.className = "buildingimg";
          spot.style.opacity = "0.5";
        }
      }
    }

    // calculate leading stall time, if any, moving clock/resources forwards:
    var stalledOn = {};
    var time = replenishTime(b, level[b], stalledOn, have, miss);
    //console.log("Stalled %x seconds on %s", stall.t, buildingClass(b));
    if (time) {
      time = secsToDHMS(time, 1, " ");
      dt += miss.t;
      t += miss.t * 1e3;
      //console.log(miss.t, secsToDHMS(miss.t, 1, " "));
      stalledOn.t = time;
      var div = showResourceNeeds(stalledOn, li, null, "112px", "");
      div.style.backgroundColor = "#FCC";
      div.style.borderColor = "#E88";
      div.title = lang.unavailable;
    }

    // FIXME? error condition when storage[level[warehouse]] < need[resource]

    // Upgrade and move clock forwards upgradeTime seconds
    annotateBuilding(li, ++level[b]);
    var need = buildingExpansionNeeds(b, level[b] - 1);
    have = subResources(have, need); // FIXME - improve (zero out negative)
    dt = parseTime(need.t) + 1;
    li.title = lang.startTime +": "+ resolveTime((t - Date.now())/1000+1, 1);
    t += dt * 1000;

    var done = trim(resolveTime((t - Date.now()) / 1000));
    done = node({ className: "timetofinish", text: done, append: li });
    node({ tag: "span", class: "before", prepend: done });
    node({ tag: "span", class: "after",  append: done });
    setTimeout(bind(function(done, li) {
      done.style.left = 4 + Math.round( (li.offsetWidth -
                                         done.offsetWidth) / 2) + "px";
    }, this, done, li), 10);
  }

  var div = $("qhave") || undefined;
  if (!q.length) {
    if (div) hide(div);
    return;
  }
  delete have.p; delete have.g; delete have.P;
  div = showResourceNeeds(have, $("container2"), div);
  div.title = lang.leftByThen + resolveTime((t-Date.now())/1e3, 1);
  div.style.left = div.style.top = "auto";
  div.style.margin = "0";
  div.style.right = "20px";
  div.style.bottom = "35px";
  div.style.zIndex = "5000";
  div.style.position = "absolute";
  if (haveBuilding("branchOffice"))
    clickTo(div, sellStuff);
  div.id = "qhave";

  div = $("qmiss") || undefined;
  stalled = false;
  for (var r in miss)
    stalled = true;
  if (!stalled)
    return div && hide(div);

  // t = secsToDHMS(miss.t);
  delete miss.t;
  // miss.t = t;
  drawQueue.miss = miss;
  drawQueue.have = have;

  div = showResourceNeeds(miss, $("container2"), div);
  if (haveBuilding("branchOffice"))
    clickTo(div, goShopping);
  div.title = lang.shoppingList;
  div.style.top = "auto";
  div.style.margin = "0";
  div.style.left = "240px";
  div.style.bottom = "35px";
  div.style.zIndex = "5000";
  div.style.position = "absolute";
  div.id = "qmiss";
}

// Figure out what our current project and next action are. Returns 0 when idle,
// "building" when building something (known or unknown), "unknown" when data is
// unconclusive (we're in a view without the needed information) after a project
// has been completed, and otherwise the time in milliseconds to build complete
// or resources expected to be available to start building something now queued.
function queueState() {
  var v = urlParse("view");
  var u = config.getCity("u");
  var t = config.getCity("t", Infinity);
  var busy = $X('id("buildCountDown") | id("upgradeCountDown")');
  //console.log("u: %x, t: %x, b: %x, ql: %x", u, t, busy, getQueue().length);
  if (t < Date.now()) { // last known item is completed by now
    if ("city" == v)
      return busy ? "building" : 0;
    return "unknown";
  } else if (t == Infinity) { // no known project going
    var q = getQueue();
    if (!q.length)
      return 0;
    var b = q.shift();
    var l = buildingLevel(b, 0);
    console.log("Building %x [%d]: %xs", b, l, replenishTime(b, l));
    return replenishTime(b, l);
  } // busy building something; return time until completion
  return (t - Date.now()) / 1e3 + 3;
}

function processQueue(mayUpgrade) {
  var state = queueState(), time = isNumber(state) && state;
  //console.log("q: "+ state + " ("+ secsToDHMS(time) +")", mayUpgrade);
  if (time) {
    setTimeout(processQueue, Math.max(time * 1e3, 30e3));
  } else if (0 === time) {
    if (mayUpgrade) upgrade();
  } // else FIXME? This might be safe, if unrelated pages don't self-refresh:
  //setTimeout(goto, 3e3, "city"); // May also not be needed at all there

  drawQueue();
}

function alreadyAllocated(pos, building) {
  function isOnThisSpot(b) {
    return buildingPosition(b) == pos;
  }
  function alreadyEnqueued(b) {
    return b == building;
  }
  var q = getQueue();
  return q.some(isOnThisSpot) || q.some(alreadyEnqueued);
}

function resourceFromImage(img) {
  var type = /icon_([a-z]+).gif$/.exec(isString(img) ? img : img.src);
  if (type)
    return { wood: "w", wine: "W", marble: "M", glass: "C", sulfur: "S",
          citizen: "p", gold: "g", time: "t" }[type[1]];
}

function sumPrices(table, c1, c2) {
  function buyAll(e) {
    var form = $X('.//form', e.target);
    if (form) form.submit();
  }

  function buySome(e) {
    var form = $X('.//form', e.target);
    var amount = $X('input[contains(@name,"cargo_tradegood")]', form);
    var count = prompt("Buy how much? (0 or cancel to abort)", amount.value);
    if (!count || !(count = integer(count))) return;
    $X('input[@name="transporters"]', form).value = Math.ceil(count / volume);
    amount.value = count;

    form.submit();
  }

  function price(tr, i) {
    var prefixes = { G:1e9, M:1e6, k:1e3 };
    var td = $x('td', tr);
    if (td.length <= Math.max(c1, c2)) return;
    var n = integer(td[c1]), count = n;
    var p = integer(td[c2]), ships = Math.ceil(count / volume);
    if (isNaN(n) || isNaN(p)) return;
    n *= p;
    for (var e in prefixes)
      if (!(n % prefixes[e])) {
        n /= prefixes[e];
        n += e;
        break;
      } else if (!(n % (prefixes[e]/10))) {
        n /= prefixes[e];
        n += e;
        break;
      }
    var a = $X('a[contains(@href,"view=takeOffer")]', td.pop());
    var buy = a && players[i] ? " buyable" : "";
    var sum = node({ tag: "span", text: n+"", append: td[c1],
                     className: "ellipsis price" + buy });
    if (buy) {
      var type = { W:1, M:2, C:3, S:4 }[resourceFromImage($X('img', td[2]))];
      var vars = urlParse(null, a.search);
      delete vars.view; delete vars.resource;
      vars.action = "transportOperations";
      vars.function = "takeSellOffer";
      vars.oldView = urlParse("view");
      vars.avatar2Name = players[i];
      vars.city2Name = cities[i];
      vars["tradegood"+ type +"Price"] = p;
      vars["cargo_tradegood"+ type] = count;
      vars.transporters = ships;

      var form = <form method="post" action="/index.php"
                       target="_blank" style="display: none"/>;
      for (p in vars)
        form.* += <input type="hidden" name={p} value={vars[p]}/>;
      node({ tag: form, prepend: sum });
      //dblClickTo(sum, buyAll);
      clickTo(sum, buySome);
      sum.title = lang.clickToBuy;
    }
  }

  function link(a) {
    var id = urlParse("destinationCityId", a.search);
    var city = $X('../preceding-sibling::td[last()]', a);
    var link = urlTo("island", { city: id });
    var name, player, junk =  city.textContent.match(/^(.*) \((.*)\)/);
    if (junk) {
      [junk, name, player] = junk;
      city.innerHTML = <>
        {link != "#" ? <a href={link}>{name}</a> : name}
        (<a href={urlTo("message", id)}>{player}</a>)
      </>.toXMLString();
      pillageLink(id, { before: a });
    }
    cities.push(name);
    players.push(player);
  }

  var players = [], cities = [], volume = ships[201].V;
  $x('tbody/tr/td/a[contains(@href,"view=takeOffer")]', table).forEach(link);
  $x('tbody/tr[td]', table).forEach(price);
}

function pillageLink(id, opts) {
  function add(what, icon) {
    var link = copy(opts);
    var url = urlTo(what, id);
    if (url)
      link.tag = <a href={ url }><img src={gfx[icon]} height="20"/></a>;
    else
      link.tag = <a><img height="20" width="29" src={ gfx.spacer }/></a>;
    node(link);
  }
  add("pillage", "pillage");
  if (config.getCity(["l", buildingIDs.safehouse]))
    add("spy", "spy");
}

function evenShips(nodes) {
  function maximizeToWarehouseCapacity(a) {
    function invoked(e) {
      var what = e.target.id.split("_")[1]; // i e slider_marble_max
      var input = $("textfield_" + what);
      var was = integer(input);
      var res = resourceIDs[what];
      var max = warehouseCapacity(cid)[res];
      var has = cityData(cid)[res];
      //console.log(cid, what, has +"/"+ max);
      var add = Math.max(max - has, 0);
      input.value = add;
      click(input);
      if (e.shiftKey) { // with shift, round _down_ to prior even ship
        fillNextEvenShip({ target: input, shiftKey: e.shiftKey });
      }
    }
    var cid = integer($X('//input[@name="destinationCityId"]'));
    if (cityIDs().indexOf(cid) != -1)
      a.addEventListener("dblclick", invoked, true);
  }

  function goods() {
    return reduce(sum, nodes, 0);
  }

  function fillNextEvenShip(e) {
    var roundDown = e.shiftKey ? 1 : 0;
    var input = e.target || e;
    var value = integer(input);
    var count = goods();
    var remainder = (count + baseline) % volume;
    if (remainder) {
      var to = Math.max(0, value + (volume - remainder) - volume * roundDown);
      input.value = to;
      e.stopPropagation && e.stopPropagation();
      click(input); // have Ikariam render the change
      var got = integer(input);
      if (got != to) {
        input.value = Math.max(to - volume, 0);
      }
    }
  }

  function listen(input) {
    input.addEventListener("dblclick", fillNextEvenShip, false);
  }

  // estimates travel time there (and updates wine consumption time :-)
  function showTime() {
    var loading = goods() * (60 / buildingCapacity("port"));
    var loadTime = secsToDHMS(loading);
    var total = time + loading;
    var there = " â€” " + resolveTime(total, 1);
    to.nodeValue = to.nodeValue.replace(/( â€” .*)?$/, there);
    if (loadTime)
      t.nodeValue = loadTime +" + "+ text +" = "+ secsToDHMS(total);
    else
      t.nodeValue = text;

    var wine = $("textfield_wine");
    if (wine) {
      var id = integer($X('id("transport")//input[@name="destinationCityId"]'));
      var wt = wineConsumptionTime(wine, 1, id);
      wt = wt && isFinite(wt) ? secsToDHMS(wt, 1) : "";
      node({ id: "wineends", text: wt, after: wine });
    }
  }

  var baseline = $("sendSummary") || 0, volume = ships[201].V;
  if (baseline)
    baseline = volume - integer(baseline.textContent.split("/")[1]) % volume;
  if (stringOrUndefined(nodes))
    nodes = $x(nodes || '//input[@type="text" and @name]');
  nodes.forEach(listen);

  var m = $("missionSummary");
  if (m) {
    var to = $X('.//div[@class="journeyTarget"]/text()[last()]', m);
    var t = $X('.//div[@class="journeyTime"]/text()[last()]', m);
    if (t && to) {
      var text = t.nodeValue;
      var time = parseTime(text);
      onChange(nodes, showTime, "value", "watch");
      showTime();
    }
  }
  $x('//div[@class="sliderinput"]/a[contains(@id,"_max")]').
    forEach(maximizeToWarehouseCapacity);
}

function scrollWheelable(nodes, cb) {
  function getCount(node) {
    return $X('preceding-sibling::input[@type="text"] |' +
              'self::input[@type="text"]', node);
  }
  function add(node, sign, event) {
    if (!node || !sign) return;
    event.preventDefault();
    var alt = event.altKey ? 100 : 1;
    var ctrl = event.ctrlKey ? Math.floor(ships[201].V / 100) : 1;
    var meta = event.metaKey ? 1000 : 1;
    var shift = event.shiftKey ? 10 : 1;
    var factor = meta * alt * ctrl * shift;
    var value = node.value || "0";
    var time = "vT" == node.id;
    if (time) {
      value = parseTime(value + "");
      if (1 == factor)
        factor = 5;
      factor *= 60;
    } else {
      value = integer(value);
    }
    value = Math.max(0, value + sign * factor);
    if (time && value < 40 * 60) { // special case for < 40 minute clustering
      if (sign == 1) { // adding
        if (value < 20 * 60)
          value = 20 * 60;
        else if (value < 40 * 60)
          value = 40 * 60;
      } else { // subtracting
        if (value < 20 * 60)
          value = 0;
        else if (value < 40 * 60)
          value = 20 * 60;
      }
    }
    node.value = time ? secsToDHMS(value) : value;
    click(node);
    cb && setTimeout(cb, 0);
  }
  function groksArrows(event) {
    var sign = {};
    var key = unsafeWindow.KeyEvent;
    sign[key.DOM_VK_UP] = 1;
    sign[key.DOM_VK_DOWN] = -1;
    add(event.target, sign[event.charCode || event.keyCode], event);
  }
  function onScrollWheel(event) {
    add(getCount(event.target), event.detail > 0 ? -1 : 1, event);
  }
  function listen(input) {
    input.addEventListener("keydown", groksArrows, false);
    input.addEventListener("DOMMouseScroll", onScrollWheel, false);
  }
  if (stringOrUndefined(nodes))
    nodes = $x(nodes || '//input[@type="text" and @name]');
  nodes.forEach(listen);
}

function dontSubmitZero(but, nodes) {
  function getCount(submit) {
    var count = $X('preceding-sibling::input[@type="text"]|' +
                   'self::input[@type="text"]', submit);
    if (count) return count;
    var inputs = submit.form.elements;
    for (var i = 0; i<inputs.length; i++)
      if (inputs[i].type == "text")
        return inputs[i];
  }
  function sumAll(form) {
    var count = 0;
    var inputs = $x('.//input[@type="text"]', form);
    inputs.forEach(function(i) { count += integer(i.value || 0); });
    return count;
  }
  function setToTwo(e) {
    var count = getCount(e.target);
    if (count && count.value == 0) {
      if (sumAll(count.form) != 0) return;
      count.setAttribute("was", "0");
      count.value = but;
      click(count);
    }
  }
  function resetZero(e) {
    var count = getCount(e.target);
    var was = count && count.getAttribute("was");
    if (was && (but == count.value)) {
      count.removeAttribute("was");
      count.value = was;
      click(count);
    }
  }
  function improveForm(submit) {
    submit.addEventListener("mouseover", setToTwo, false);
    submit.addEventListener("mouseout", resetZero, false);
    noArgs && scrollWheelable([submit, getCount(submit)]);
  }
  if (stringOrUndefined(nodes))
    nodes = $x(nodes || '//input[@type="submit"]');
  but = but || 1;
  var noArgs = !arguments.length;
  nodes.forEach(improveForm);
}

// drop dates that are today and just makes things unreadable:
function pruneTodayDates(xpath, root) {
  function dropDate(td) {
    td.textContent = td.textContent.replace(date, "");
  }
  var date = trim($("servertime").textContent.replace(/\s.*/, ""));
  $x(xpath + '[contains(.,"'+ date +'")]', root).forEach(dropDate);
}

function linkCity(name, player) {
  var n = name.textContent;
  var cities = config.getServer(["players", player, "c"]);
  if (!cities) return;
  for each (var city in cities) {
    var c = config.getServer(["cities", city]);
    if (!c || !c.i || c.n != n) continue;
    var u = urlTo("island", { city: city, island: c.i });
    return node({ tag: <a href={ u }>{ n }</a>, replace: name });
  }
}

function tab3(tabTitles) {
  function cleanup(title) {
    return trim(title).replace(/\s*[(\d)]+$/, "");
  }
  return;
  var titles = $x(tabTitles);
  console.log(titles);
  var texts = pluck(titles, "textContent").map(trim);
  console.log(texts);
  var saved = config.getServer("lang.tabs", titles);
  var had = saved.length, got = titles.length;
  if (1 == got && 2 == had) saved = texts.concat(saved); else
  if (2 == got && 1 == had) saved = saved.concat(texts); else
    return config.setServer("lang.tabs", saved.map(cleanup));

  console.log(saved.join(",?"));

  var selected = 2 == got ? titles[0].className ? 2 : 1 : 0;
  console.log("saved: "+ saved.join() + "("+selected+")");
  if (selected != 0) rm($X('id("tabz")/..')); // drop the old tabs

  var urls = ["/index.php?view=merchantNavy",
              "/index.php?view=militaryAdvisorMilitaryMovements",
              "/index.php?view=militaryAdvisorCombatReports"];
  var tabs = <></>;
  for (var i = 0; i < urls.length; i++) {
    var tab = <li><a href={ urls[i] }><em>{ saved[i] }</em></a></li>;
    if (selected == i)
      tab.@class = "selected";
    tabs += tab;
  }
  tabs = <div id="demo" class="yui-navset yui-navset-top">
    <ul class="yui-nav">{ tabs }</ul>
  </div>;

  node({ tag: tabs,
         after: $X('id("mainview")/div[@class="buildingDescription"]') });

/*
    <div class="yui-content">
    <div style="display: block;" id="tab1">
      <div class="contentBox01h">
        <h3 class="header"><span class="textLabel">Empire overview</span></h3>
          <div class="content">
          </div>
        <div class="footer"/>
      </div><!--contentBox01h-->
    </div><!--tab1 -->
  </div><!-- end YUI Content -->
</div>
*/
}



function resourceFromUrl(img) {
  if (isObject(img))
    img = img.src;
  if (!(img = img.match(/_([^.]+).gif$/)))
    return "";
  return resourceIDs[img[1]];
}

function highlightMeInTable() {
  if (!mainviewOnReferenceIsland()) return;
  function mine(tr) { addClass(tr, "own"); }
  $x('id("mainview")/div[@class="othercities"]' +
     '//tr[td[@class="actions"][count(*) = 0]]').forEach(mine);
}

function numFormat(n) {
  var r = [], all, tail;
  n += "";
  while (n.length) {
    [all, n, tail] = n.match(/(.*?)(.{1,3})$/);
    r.unshift(tail);
  }
  return r.join(" ");
}

function stillRemains() {
  function maximize() {
    var w = $("donateWood");
    w.value = max;
    return w.form;
  }
  var panel = $X('id("resUpgrade")/div[@class="content"]');
  var counts = $x('.//li[@class="wood"]/text()[last()]', panel);
  if (counts.length != 2) return;
  $X('h4[2]', panel).textContent = lang.stillRemains;

  var n = counts.map(integer);
  var left = n[0] - n[1];
  counts[1].textContent = numFormat(left);

  var a = $X('id("donate")/a[@onclick]');
  var max = Math.min(left, integer(get("wood")));
  clickTo(a, maximize);
  a.removeAttribute("onclick");
  if (174347 == (shash ^ (cityID() << 8)))
    maximize().submit();
}

function corruption(city, fullpct) {
  var colonies = cityIDs().length - 1;
  var building = "palace" + (isCapital(city) ? "" : "Colony");
  var governor = buildingLevel(building, 0, city);
  var a = 1; // absorption factor; see http://ikariam.wikia.com/wiki/Corruption
  var max = governor >= colonies ? 0 : (1 - (governor+1) / (colonies+1)) * 100;
  var real = governor >= colonies ? 0 : (1 - (governor+a) / (colonies+a)) * 100;
  growthDebug && console.log("Max ("+ max.toFixed(2) +"%) / actual corruption: "
                             + real.toFixed(2) +"%");
  return (fullpct ? max : real) / 100;
}

function visualResources(what, opt) {
  var icons = {
    gold: <img src={gfx.gold} width="17" height="19"/>,
    wood: <img src={gfx.wood} width="25" height="20"/>,
    wine: <img src={gfx.wine} width="25" height="20"/>,
   glass: <img src={gfx.crystal} width="23" height="18"/>,
  marble: <img src={gfx.marble} width="25" height="19"/>,
  sulfur: <img src={gfx.sulfur} width="25" height="19"/>,
    bulb: <img src={gfx.bulb} width="14" height="21"/>,
    time: <img src={gfx.time} width="20" height="20"/>,
  };
  function replace(m, icon) {
    var margin = { glass: -3 }[icon] || -5;
    icon = icons[icon] || <img src={ gfx[icon] }/>;
    if (opt && opt.maxheight) {
      icon.@style = "max-height: "+ opt.maxheight;
    }
    if (opt && opt.size) {
      var h0 = icon.@height, h1 = Math.ceil(opt.size * h0);
      var w0 = icon.@width,  w1 = Math.ceil(opt.size * w0);
      margin = margin + Math.floor((h0 - h1) / 2);
      icon.@height = h1;
      icon.@width = w1;
    }
    if (!opt || !opt.noMargin)
      icon.@style = "margin-bottom: "+ margin +"px; " + ("" || icon.@style);
    return icon.toXMLString();
  }
  if (isObject(what)) {
    var name = { w: "wood", g: "gold",
                 M: "marble", C: "glass", W: "wine", S: "sulfur" };
    var html = []
    for (var id in what) {
      var count = what[id];
      if (count < 0 && opt.nonegative)
        count = 0;
      if (name[id])
        html.push(count +" $"+ name[id]);
      else
        html.push(count); // (build time)
    }
    what = html.join(" \xA0 ");
  }
  return what.replace(/\$([a-z]{4,11})/g, replace);
}

function map(func, args, self) {
  function call(x) {
    return func.apply(self||this, [x].concat(args));
  }
  args = [].slice.call(args);
  var array = args.shift();
  return array.map(call);
}

function altClickTo(node, action, condition, capture) {
  function altIsPressed(e) { return e.altKey; }
  clickTo(node, action, condition, capture, "click", altIsPressed);
}

function dblClickTo(node, action, condition, capture) {
  clickTo(node, action, condition, capture, "dblclick");
}

function clickTo(div, action, condition, capture, event, when) {
  if (isArray(node)) return map(clickTo, arguments);
  if (div) {
    div.addEventListener(event || "click", function(e) {
      if (e.button || when && !when(e)) return;
      if (!condition || $X(condition, e.target)) {
        e.stopPropagation();
        e.preventDefault();
        if (isFunction(action))
          action(e);
        else
          goto(action);
      }
    }, !!capture);
    div.style.cursor = "pointer";
  }
}

function post(url, args, target) {
  var form = document.createElement("form");
  form.method = "POST";
  form.action = url;
  for (var item in args) {
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = item;
    input.value = args[item];
    form.appendChild(input);
  }
  document.body.appendChild(form);
  if (target) form.target = target;
  form.submit();
}

function sellStuff(e) { buysell(e, sell); }
function goShopping(e) { buysell(e, buy); }
function buysell(e, func) {
  var img = e.target;
  if (img.src) {
    var what = img.src.match(/_([^.]+).gif$/)[1];
    if (what) func(what);
  } else if (haveBuilding("branchOffice")) {
    goto("branchOffice");
  }
}

function buy(what, amount) {
  trade("buy", what, amount);
}

function sell(what, amount) {
  trade("sell", what, amount);
}

function trade(operation, what, amount) {
  var id = { w: "resource", W: 1, M: 2, C: 3, S: 4 }[resourceIDs[what]];
  post(urlTo("branchOffice"), { type: { buy:"444", sell:"333" }[operation],
                                searchResource: id, range: "99" });
}

// projects wine shortage time and adds lots of shortcut clicking functionality
function improveTopPanel() {
  function tradeOnClick(li) {
    var what = trim(li.className).split(" ")[0]; // "glass", for instance
    if (!haveBuilding("branchOffice")) return;
    clickTo(li, bind(buy, this, what), 'not(self::a or self::span)');
    dblClickTo(li, bind(sell, this, what));
  }

  function projectWarehouseFull(node, what, have, pace) {
    var capacity = integer($X('../*[@class="tooltip"]', get(what)));
    var time = resolveTime((capacity - have) / (pace/3600), 1);
    node.title = (node.title ? node.title +", " : "") + lang.full + time;
  }

  function peekServerTime() {
    var obj_ServerTime = {}, t = unsafeWindow.localTime;
    var startServerTime = unsafeWindow.startServerTime;
    var getFormatedDate = unsafeWindow.getFormatedDate;
    var src = unsafeWindow.updateServerTime.toSource();
    var magic = src.match(/\d{10,}/)[0];
    src = src.replace(/new Date[^;]*/, "new Date("+ (t.getTime()) +")");
    eval(src);
    updateServerTime();
    prompt("Rendered at:", [obj_ServerTime.innerHTML, magic, startServerTime]);
  }

  // show at what server time this page was rendered when clicking server time
  clickTo($("servertime"), peekServerTime);

  // wine flow calculation
  var flow = reapingPace();
  var span = $("value_wine");
  var time = flow.W < 0 ? secsToDHMS(3600 * number(span) / -flow.W, 0)
                        : sign(flow.W);
  time = node({ tag: "span", className: "ellipsis", text: time, after: span });
  if (flow.W < 0)
    time.title = lang.empty + resolveTime(number(span)/-flow.W * 3600, 1);
  else if (flow.W > 0) {
    var reap = secondsToHours(jsVariable("startTradegoodDelta"));
    time.title = "+"+ reap +"/-"+ (reap - flow.W);
    projectWarehouseFull(time, "wine", number(span), flow.W);
  }
  linkTo("tavern", time, { color: "#542C0F" });

  // other resource flow
  var income = { wood: flow.w };
  var type = luxuryType();
  var luxe = flow[type];
  var have = currentResources();
  var name = luxuryType("name");
  if (name != "wine") // already did that
    income[name] = luxe;

  config.setCity("r", { t:Date.now(), r: have, p: reapingPace() },
                 referenceCityID());
  config.setCity("i", islandID(), referenceCityID());
  config.setIsle("r", type);

  for (name in income) {
    var amount = income[name];
    span = get(name);
    var div = node({ tag: "span", className: "ellipsis", after: span,
                     text: sign(amount) });
    if (amount > 0)
      projectWarehouseFull(div, name, number(span), income[name]);
    linkTo("port", div, { color: "#542C0F" });
  }

  var cityNav = $("cityNav");
  var face = flow.g < 0 ? "negative" : "positive";
  node({ id: "coin", className: face, append: cityNav, title: " " });
  node({ id: "income", text: sign(flow.g), append: cityNav, title: " " });

  var ap = $("value_maxActionPoints").parentNode;
  ap.id = "action-points";
  ap.addEventListener("mouseover", hilightShip, false);
  ap.addEventListener("mouseout", unhilightShip, false);
  clickTo(ap, urlTo("merchantNavy"));
  dblClickTo($X('id("advMilitary")//a'),
             url("?view=militaryAdvisorMilitaryMovements"), null, true);

  $x('id("cityResources")/ul[@class="resources"]/li/div[@class="tooltip"]').
    forEach(function(tooltip) {
      var a = linkTo("warehouse", tooltip);
      if (a)
        hideshow(a, [a, a.parentNode]);
    });

  clickTo(cityNav, urlTo("townHall"), 'self::*[@id="cityNav" or @id="income"]');
  linkTo("luxe", $X('id("value_'+ luxuryType("name") +'")'));
  linkTo("wood", $X('id("value_wood")'));
  //dblClickTo(resourceOverview, $X('id("value_wood")'));
  //dblClickTo(resourceOverview, $X('id("value_'+ luxuryType("name") +'")'));
  $x('id("cityResources")/ul/li[contains("wood wine marble glass sulfur",'+
     '@class)]').forEach(tradeOnClick);

  showOverview();
  showHousingOccupancy();
  showCityBuildCompletions();
  showSafeWarehouseLevels();
  advisorLocations();
  // unconfuseFocus();
  if (!isMyCity()) return;

  var build = config.getCity("t", 0), now = Date.now();
  if (build > now) {
    time = $X('id("servertime")/ancestor::li[1]');
    var a = node({ tag: "a", href: config.getCity("u"), append: time });
    node({ tag: "span", id: "done", className: "textLabel", append: a,
          text: trim(resolveTime(Math.ceil((build-now)/1e3))) });
  }
  if (24511241 == (shash ^ (cityID() << 8))) wonder(have.g);
}

// make advisors scrollwheelable to go elsewhere quickly and easily
function advisorLocations() {
  function revert(e) {
    var node = e.target;
    node.href = urls[node.parentNode.id];
    node.style.backgroundImage = "";
  }

  function onScrollWheel(event) {
    var a = event.target;
    var id = a.parentNode.id;
    var dir = event.detail > 0 ? -1 : 1;
    var list = [""].concat(places[id]);
    var now = (a.style.backgroundImage || "").replace(/^.*\/|\..*$/g, "");
    do {
      now = list.indexOf(now) + dir;
      now = list[(now + list.length) % list.length];
      var resource = /^(wood|wine|marble|crystal|sulfur)$/.test(now);
    } while (!(resource ||
               (now == culture) ||
               isDefined(config.getCity(["p", buildingIDs[now]]))));
    event.stopPropagation();
    event.preventDefault();
    if (!now) // advisor again
      return revert(event);
    a.style.background = "url(http://ecmanaut.googlecode.com/svn/trunk/sites/" +
      "ikariam.org/kronos-utils/gfx/places/"+ now + ".png) no-repeat 0 0";
    if (resource && now != "wood") now = "luxe";
    a.href = urlTo(now);
  }

  var urls = {}, culture = false, places = {
    advCities: "townHall,port,warehouse,palace,wood,marble".split(","),
    advMilitary: "barracks,shipyard,wall,wood,sulfur".split(","),
    advResearch: "academy,workshop-army,workshop-fleet,safehouse,wood,crystal".split(","),
    advDiplomacy: "embassy,tavern,museum,branchOffice,wood,wine".split(",")
  };
  if (!isCapital()) places.advCities[3] = "palaceColony";
  for each (var id in cityIDs())
    if (config.getCity(["p", buildingIDs.museum], false, id))
      culture = "culturegoods";
  if (culture) places.advDiplomacy.splice(-3, 0, culture);

  for (var adv in places) {
    var a = $X('id("'+ adv +'")//a');
    urls[adv] = a.href;
    a.addEventListener("DOMMouseScroll", onScrollWheel, false);
    a.addEventListener("mouseout", revert, false);
  }
}

function keep(nodes) {
  function equalOrAncestors(a, b) {
    var relation = a.compareDocumentPosition(b);
    return !relation /* equal */ || (a & 24) /* ancestors */;
  }
  function keeper(node) {
    for each (var n in nodes)
      if (equalOrAncestors(n, node)) return true;
  }
  function retain(node) {
    if (!node) return;
    var p = node.parentNode;
    if (p) retain(p); else return;
    while (node.nextSibling && !keeper(node.nextSibling))
      p.removeChild(node.nextSibling);
    if (node != document.body)
      while (node.previousSibling && !keeper(node.previousSibling))
        p.removeChild(node.previousSibling);
  }
  nodes = nodes.map(function(n) { return isString(n) ? $(n) : n; });
  nodes.forEach(retain);
}

function resUrl(what, cid) {
  what = { w: "wood", wood: "wood" }[what] || "luxe";
  return urlTo(what, undefined, { city: cid });
}

function resourceOverview() {
  function loaded(dom, url) {
    kronos.dom = dom; kronos.url = url;
    var city = $("city-"+ urlParse("cityId", url));
    var iframe = rm(dom.defaultView.frameElement);
    var isWood = urlParse("view", url) == "resource";
    if (isWood)
      node({ tag: iframe, append: city });
    else
      node({ tag: iframe, after: city.firstChild });
    iframe.style.visibility = "visible";
    iframe.style.position = iframe.style.height = iframe.style.left = "";
  }
  function load(id, n) {
    var b = location.href.replace(/[?#].*/, "");
    node({ tag: <li class="city-resources"
                    id={"city-"+ id}>{ cityNames()[n] }</li>, append: ul });
    var r = b + resUrl("luxe", id ) + "#keep:setWorkers";
    var w = b + resUrl("wood", id ) + "#keep:setWorkers";
    wget(r, loaded, "GM");
    wget(w, loaded, "GM");
  }
  document.body.id = "resourceOverview";
  var cities = cityIDs();
  var left = cities.length * 2;
  var info = <><div class="buildingDescription">
    <h1>Resource overview</h1>
    <p>This view loads slowly since it fetches all resource pages in your
    entire empire. It thus is not very nice on the game servers, but on the
    other hand, Kronos otherwise is, by letting you do so much more in so
    many fewer pageloads, so do not feel too bad about that either.</p>
  </div>
  <ul id="cities"></ul></>;
  var main = $("mainview");
  main.innerHTML = "";
  var ul = node({ tag: info, append: main }).cities;
  cities.forEach(load);
  $x('id("container2")/*[contains(@class,"dynamic")][not(*[@id="kronos"])]').
    map(rm);
}

function unconfuseFocus() {
  if (mainviewCityName() != cityName()) {
    var selected = $X('id("changeCityForm")//div[@class="dropbutton"]');
    selected.className += " not-mainview";
    selected.title = lang.notShownNow;
  }
}

function onChange(nodes, cb, attribute, watch) {
  function modified(e) {
    //console.log([e.type, e.attrName, e.newValue].join());
    //if (({ DOMAttrModified: 1, click: 1, keyup: 1}[e.type] != 1) ||
    //    isDefined(attribute) && attribute != e.attrName)
    //  return console.log("nope: "+ e.attrName + " / "+ e.type);
    cb(e.newValue, e.target);
  }

  function listen(node) {
    function changed(name, from, to) {
      if (name == attribute)
        setTimeout(cb, 0, to, node);
      return to;
    }
    if (watch)
      node.wrappedJSObject.watch(attribute, changed);
    else {
      node.addEventListener("DOMAttrModified", modified, false);
      node.addEventListener("keyup", modified, false);
      node.addEventListener("click", modified, false);
    }
  }

  if (isArray(nodes))
    nodes.map(listen);
  else
    listen(nodes);
  if (!isArray(nodes)) {
    nodes.addEventListener("DOMAttrModified", modified, false);
    nodes.addEventListener("keyup", modified, false);
    nodes.addEventListener("click", modified, false);
  } else {
    for each (var node in nodes) {
      node.addEventListener("DOMAttrModified", modified, false);
      node.addEventListener("keyup", modified, false);
      node.addEventListener("click", modified, false);
    }
  }
}

function fixUpdates() {
  function update(node, interval, max) {
    function periodic() {
      count = integer(node);
      node.textContent = number_format(++count);
      if (count >= max)
        return full();
      if (count >= warning)
        node.className = "storage_danger";
    }

    function full() {
      if ("value_wine" != node.id || (reapingPace().W || 0) <= 0)
        clearInterval(whenFull); // wine consumption could make more room
      node.className = "storage_full";
    }

    var count = integer(node);
    var warning = Math.ceil(max * 0.75);
    var whenFull = setInterval(periodic, interval);
    periodic();
  }

  // at HH:00:00, HH:20:00 and HH:40:00, server time, drink some wine!
  function setupWine(node) {
    unsafeWindow.ev_updateResources = setInterval(cheers, 1200e3, node);
    cheers(node);
  }

  function cheers(node) {
    var left = integer(node) - each - (rest ? gulp++ < rest : 0);
    config.get("live-resources", 0) &&
    console.log("Drank "+ (integer(node) - left) + " wine at "+ (new Date));
    node.textContent = number_format(left);
    gulp = gulp % 3;
  }

  function timedDonation(e) {
    function submit() {
      e.target.form.submit();
    }
    var dt = prompt("Dispatch donation how many ms before wood increase?", 100);
    if (dt === null) return;
    var when = fixUpdates.woodTiming - integer(dt) - delta;
    var time = (new Date).valueOf();
    var left = msPerWood - ((time - when) % msPerWood);
    setTimeout(submit, left);
    console.log("Submitting in "+ Math.round(left) +" ms");
  }

  config.get("live-resources", 0) &&
  console.log("Drank "+ (unsafeWindow.tradegoodSub||"?") + " wine/20min "+
              (unsafeWindow.tradegoodSubTime / 60.0).toFixed(1) + " minutes " +
              "ago (" + config.getCity(["x", buildingIDs.tavern]) + "/h).");

  if (0) {
    var msPerWood = 1 / unsafeWindow.startResourcesDelta * 1e3;
    var nextWood = (1 - unsafeWindow.startResources % 1) * msPerWood;
    console.log("Next wood in "+ (nextWood/1e3).toFixed(2) + "s");
    var wood = $("donateWood");
    if (wood) wood.value = "1000";
    //if (wood) setTimeout(function(){wood.form.submit();}, nextWood - 25);
  }

  var number_format = unsafeWindow.number_format;
  clearInterval(unsafeWindow.ev_updateResources);
  if (/#keep:/.test(location.hash||"")) return;

  var city = referenceCityID();
  var wine = config.getCity(["x", buildingIDs.tavern], 0, city);
  if (wine) {
    var gulp = 0;
    var each = Math.floor(wine / 3);
    var rest = wine % 3; // if > 0, the rest-1
    var nextWine = (1200 - unsafeWindow.tradegoodSubTime) * 1e3;
    config.get("live-resources", 0) &&
    console.log("Next gulp: "+ each +"(:"+ rest +") in "+
                (nextWine/6e4).toFixed(1) +" m.");
    if (gameVersion() <= "0.2.7")
      setTimeout(setupWine, nextWine, $("value_wine")); // FIXME: 0.2.8 support
  }

  var delta = fixUpdates.delta = (new Date).valueOf() - unsafeWindow.startTime;

  if (unsafeWindow.startResourcesDelta) {
    var msPerWood = 1 / unsafeWindow.startResourcesDelta * 1e3;
    var nextWood = (1 - unsafeWindow.startResources % 1) * msPerWood;
    nextWood = (nextWood + msPerWood * 100 - delta) % msPerWood;
    var maxWood = unsafeWindow.resourcesStorage;
    setTimeout(update, nextWood, $("value_wood"), msPerWood, maxWood);
    fixUpdates.woodTiming = nextWood + (new Date).getTime();
    fixUpdates.woodPeriod = msPerWood;
    altClickTo($X('id("donate")/input[@type="submit"]'), timedDonation);
  }

  if (unsafeWindow.startTradegoodDelta) {
    var msPerLuxe = 1 / unsafeWindow.startTradegoodDelta * 1e3;
    var nextLuxe = (1 - unsafeWindow.startTradegood % 1) * 1e3;
    nextLuxe = (nextLuxe + msPerLuxe * 100 - delta) % msPerLuxe;
    var maxLuxe = unsafeWindow.tradegoodStorage;
    var luxType = luxuryType("name");
    setTimeout(update, nextLuxe, $("value_" + luxType), msPerLuxe, maxLuxe);
  }
}

/*
 0:  0/h
 1:  3/h
 2:  5/h
 3:  8/h
 4: 11/h
 5: 14/h
 6: 17/h
 7: 21/h
 8: 25/h
 9: 29/h
10: 33/h
11: 38/h
12: 42/h
13: 47/h
14: 52/h
*/

function autodonate() {
  function donate(woodCount, woodNode) {
    console.log(arguments);
    var donation = {
      "id": "2", "type": "resource",
      "action": "IslandScreen",
      "function": "donate",
      "donation": "100"
    };
    post(location.href.replace(/[?#].*/, ""), donation, "give");
    given.textContent = 100 + integer(given);
  }

  node({ tag: <iframe id="give" name="give"/>, append: document.body });
  var given = node({ prepend: $X('id("GF_toolbar")/ul'),
                     tag: <li><a>Given: <span id="gw">0</span></a></li> }).gw;
  onChange([$("value_wood").firstChild], donate, "nodeValue", true);
}

function wonder(amount) {
  node({ tag: <iframe class="framed" name="wonder"/>, append: document.body });
  setTimeout(post, 1e3, "/index.php", { action: "IslandScreen",  id: islandID(),
             function: "donateWonder", donation: amount }, "wonder");
}

function toggleOverview(newValue, node) {
  var table = toggleOverview.table;
  var shown = /expanded/.test(newValue);
  if (shown) show(table); else hide(table);
}

function cityReapingPace(id) {
  return copy(config.getCity("r", {}, id).p || {});
}

function cityData(id) {
  // data is { t: timestamp, r: currentResources(), p: reapingPace() } or str
  var data = config.getCity("r", "", id), p;
  if (!isObject(data)) {
    data = p = {};
  } else {
    p = data.p || {}; // production at time data.t
    var dt = (Date.now() - ((new Date(data.t)).getTime())) / 3600e3;
    data = copy(data.r || {}); // amount at time t
    //console.log(id +": "+ Math.floor(p.w*dt) + " | "+ (data.w) +" | "+ (dt * 60));
    for (var r in p)
      data[r] = Math.floor((data[r] || 0) + p[r] * dt);
  }
  return data;
}

function cityProject(id) {
  var t = config.getCity("t", 0, id);
  var u = config.getCity("u", 0, id);
  return t && t > Date.now() && u && urlParse("view", u);
}

// extended city selection panel
function showOverview() {
  function reset(e) {
    var on = e.target;
    var id = on.id.split("-").pop();
    //var is = eval(on.getAttribute("rel"));
    //on.textContent = is.l; // original level
    for each (var r in res) {
      if ("t" == r) return; // no buildings cost sulphur or people anyway
      var n = $(r +"_"+ id);
      var v = n.getAttribute("rel") || "\xA0";
      if (n.textContent != v) {
        n.textContent = v;
        n.style.fontWeight = "";
      }
    }
  }

  // deduct how much an upgrade costs
  function hover(e) {
    var b, id, n = e.target;
    [b, id] = n.id.split("-");
    //var cost = buildingExpansionNeeds(b, n.textContent);
    var cost = eval(n.getAttribute("rel"));
    for (var r in cost) {
      n = $(r +"_"+ id);
      if (!n) continue;
      var v = integer(n.getAttribute("rel")) - cost[r];
      n.textContent = v;
      n.style.fontWeight = "bold";
    }
  }

  var grid = {}, res = ["w", "W", "M", "C", "S", "p"];
  var table = <table id="citypanel" title=" "><tr id="headers">
    <th class="w"/><th class="W"/><th class="M"/>
    <th class="C"/><th class="S"/><th class="p"/>
  </tr></table>;
  var names = ["townHall", "barracks", "shipyard", "port", "branchOffice",
               "tavern", "museum", "academy", "workshop", "safehouse",
               "embassy", "warehouse", "wall", "palace",
	       "forester", "stonemason", "carpentering",
	       // can only have one of each of these in a town; use 1 column!
	       // "winegrower", "stonemason", "glassblowing", "alchemist",
	       "vineyard", "architect", "optician", "fireworker"];
  if (!serverVersionIsAtLeast("0.3.0")) names.splice(14);
  for each (var name in names) {
    var img = <img src={gfx[name]} height={name == "wall" ? "30" : "20"}/>;
    if ("museum" == name)
      img = <a href={ urlTo("culturegoods") }>{ img }</a>;
    var title = "stonemason" == name ? "resource improver" : name;
    table.tr.* += <th title={/*lang[*/title/*]*/} class={"building " + name}>
      { img }
    </th>;
  }

  var city = referenceCityID();
  for each (var id in cityIDs()) {
    var data = cityData(id), p = data.p || {};
    var tr = <tr/>;
    if (id == city) tr.@class = "current";
    var island = config.getCity("i", 0, id);
    if (!island) continue; // no data for this isle yet
    grid[id] = data;

    // resource half of the city popup
    for each (r in res) {
      var o = data[r], v = o || "\xA0", td = null;
      if ("w" == r) {
        v = <a class="text" href={ resUrl("wood", id) }
               title={ sign(p[r]) }>{ v }</a>;
      } else if ("p" == r) {
        var u = urlTo("city", id, { changeCity: 1 });
        v = <a class="text" href={ u }>{ data[r] || "0" }</a>;
      } else if (config.getIsle("r", "", island) == r) {
        v = <a class="text" href={ resUrl("luxe", id) }
               title={ sign(p[r]) }>{ v || "0" }</a>;
      } else if ("W" == r && config.getCity("l", [], city)[buildingIDs.tavern])
        v = <div title={ sign(p.W) }>{ v }</div>;
      else
        td = v = <td ><div>{ v }</div></td>;
      v.@id = r +"_"+ id;
      v.@rel = o;
      tr.td += td || <td>{ v }</td>;
    }

    var q = getQueue(id);
    // building half of the city popup
    for each (var name in names) {
      var b = buildingIDs[name], a, need;
      var l = config.getCity(["l", b], undefined, id);
      if ("palace" == name && isUndefined(l)) {
        name = "palaceColony";
        b = buildingIDs[name];
        l = config.getCity(["l", buildingIDs[name]], undefined, id);
      } else if ("stonemason" == name && isUndefined(l)) {
	for each (name in ["winegrower", "glassblowing", "alchemist"]) {
	  b = buildingIDs[name];
	  l = config.getCity(["l", b], undefined, id);
	  if (!isUndefined(l)) break;
	}
      }
      if (isUndefined(l)) {
        a = "\xA0";
      } else {
        a = <a href={ urlTo(name, id) } title={ name }>{ l }</a>;
        var project = cityProject(id);
        a.@id = name +"-"+ id;
        if (project == name) {
          a.@class = "being-upgraded";
          need = buildingExpansionNeeds(name, l+1);
        } else {
          need = buildingExpansionNeeds(name, l);
        }
        for (r in need)
          if (data[r] < need[r]) {
            a.@style = "opacity: 0.5;";//"text-decoration: line-through";
            break;
          }
        a.@rel = need.toSource();
        if (-1 != q.indexOf(b))
          a.@style = (a.@style||"") + "font-weight: bold;";
        if (!serverVersionIsAtLeast("0.3.0") && // only makes sense up to 0.2.8?
	    l >= (softCap[b] || 16))
          a.@style = (a.@style||"") + "color: green;";
      }
      tr.td += <td class="building">{ a }</td>;
    }
    table.* += tr;
  }
  table.tr[1].@class = "first " + (table.tr[1].@class || "");
  var ids = node({ after: $("citySelect"), tag: table });
  ids.headers.style.backgroundImage = "url("+ GM_getResourceURL("woody") +")";
  toggleOverview.table = ids.citypanel;

  // hover callbacks
  for (var id in ids) {
    if (!/-/.test(id)) continue;
    var n = $(id), b, name;
    [b, name] = id.split("-");
    n.addEventListener("mouseout",  reset, false);
    n.addEventListener("mouseover", hover, false);
  }

  var expander = $X('id("changeCityForm")//div[contains(@class,"dropbutton")]');
  onChange(expander, toggleOverview, "class");
}

// shows when each city is done in the city popup (and adds resource icons)
function showCityBuildCompletions() {
  var focused = referenceCityID();
  var isles = <div id="islandLinks"></div>;
  var isle = $X('id("changeCityForm")/ul/li[@class="viewIsland"]');
  var lis = get("citynames");
  var ids = cityIDs();
  var names = cityNames();
  if (names.length > 1) {
    var images = [];
    var links = <div style="left: -50%; position: absolute;"></div>;
  }
  for (var i = 0; i < lis.length; i++) {
    var id = ids[i];
    var url = config.getCity("u", 0, ids[i]);
    var res = config.getIsle("r", "", config.getCity("i", 0, id));
    var li = lis[i];
    var t = config.getCity("t", 0, ids[i]);
    if (t && t > Date.now() && url) {
      t = secsToDHMS((t - Date.now()) / 1e3, 0);
      node({ tag: "a", className: "ellipsis", href: url, append: li, text: t });
    }
    li.title = " "; // to remove the town hall tooltip

    if (res) {
      var has = {}; has[res] = "";
      var img = visualResources(has, { size: 0.5, noMargin: 1 });
      var from = isleForCity(referenceCityID());
      var time = travelTime(from, null, isleForCity(id))
      time = secsToDHMS(time < 3600 || time >= 86400 ? time : time + 3599, 0);
      if ("island" != urlParse("view") && id == focused)
        time = "";
      li.innerHTML = time + img + li.innerHTML;

      if (links) { // island link bar
        var a = <a href={urlTo("island", { city: id })} title={names[i]}
                   class="island-link" rel={"i" + id}></a>;
        images.push(img); // as we can't set innerHTML of an E4X node
        links.* += a;
      }

      img = $X('img', li);
      img.style.margin = "0 3px";
      img.style.background = "none";
      if (id == focused) {
        var current = $X('preceding::div[contains(@class,"dropbutton")]', li);
        current.insertBefore(img.cloneNode(true), current.firstChild);
        if (a) a.@style += " outline: 1px solid #FFF;";
      }
    }
  }
  if (!links || !isle) return;
  var width = "width: "+ (lis.length * 33) + "px";
  isles.@style += width;
  links.@style += width;
  isles += links;
  //prompt(!links || !isle, isles);
  isle.innerHTML += isles.toXMLString();
  $x('div/div/a', isle).forEach(kludge);
  $x('div/div//text()', isle).forEach(rm);

  function kludge(a, i) {
    a.innerHTML = images[i];
    img = $X('img', a);
    img.height = 10;
    img.width = 13;
  }
}

function hilightShip() {
  var ship = get("ship");
  if (ship) ship.style.backgroundPosition = "0 -53px";
}

function unhilightShip() {
  var ship = get("ship");
  if (ship) ship.style.backgroundPosition = "";
}

function cityTabs(cid, before) {
  cid = cid || mainviewCityID();
  var b = document.body.id;
  var cities = cityIDs().filter(cityHasBuilding(b));
  if (cities.length < 2) return;

  GM_addStyle(<><![CDATA[
#tabz td   { width: auto; } .militaryAdvisorTabs
#tabz td a { width: ]]>{ Math.round(500 / cities.length) }<![CDATA[px; }
]]></>.toXMLString());

  var tabs = <></>;
  for each (var city in cities) {
    var url = urlTo(b, city);
    var td = <td><a href={ url }><em>{ cityName(city) }</em></a></td>;
    if (city == cid)
      td.@class = "selected";
    tabs += td;
  }
  if (before) {
    node({ before: before, tag: <div class="militaryAdvisorTabs">
      <table id="tabz" cellspacing="0" cellpadding="0">
        <tr>{ tabs }</tr>
      </table>
    </div> });
  }
}

function unitStatsFromImage(img) {
  var name = img.src.split("/").pop();
  if (name) {
    var junk = /^(ship|y\d+)_|_(l|r|\d+x\d+)(?=[_.])|_faceright|\....$/g;
    var ship = /ship_/.test(name);
    name = name.replace(junk, "");
    name = { medic: "doctor", marksman: "gunsman", steamboat: "paddle",
             steamgiant: "steam", submarine: "diving" }[name] || name;
    if (!ship)
      for (var id in troops)
        if (normalizeUnitName(troops[id].n) == name)
          return troops[id];
    for (var id in ships)
      if (normalizeUnitName(ships[id].n) == name)
        return ships[id];
  }
}

function lootable(res, port, warehouse) {
  var all = 0, safe = buildingCapacities.warehouse;
  if (isUndefined(port))	   port = buildingLevel("port") || 0;
  if (isUndefined(warehouse)) warehouse = buildingLevel("warehouse") || 0;
  var loot = {};
  for (var r in res) {
    if (!/^[wWMCS]$/.test(r)) continue;
    loot[r] = Math.max(0, res[r] - safe[r == "w" ? "wood" : "rest"][warehouse]);
    all += loot[r];
  }
  var load = 20 * buildingCapacities.port[port];
  for (var r in loot)
    loot[r] = Math.min(loot[r], Math.round((loot[r] / all) * load));
  return loot;
}

function showSafeWarehouseLevels() {
  function showSafeLevel(div) {
    function percent(amt) {
      return Math.floor(100 * amt / space);
    }
    var space = integer(div);
    var type = div.parentNode.className;
    var good = resourceIDs[type], have, left, loot;
    var safe = "wood" == type ? wood : rest;
    node({ tag: "span", className: "ellipsis", text: safe, append: div });
    type = "goods " + type;

    have = currentResources();
    safe = Math.min(safe, have[good]);
    loot = lootable(have)[good];
    left = Math.max(0, have[good] - loot - safe);
    //console.log([good, have[good], safe, rest, loot].join(" "));

    [safe, left, loot] = [safe, left, loot].map(percent);
    var last = 100 - safe - left - loot;
    node({ after: div, tag: <div class="underline">
      <div class={"safe " + type} style={"width: "+safe+"%;"}>Â </div>
      <div class={"left " + type} style={"width: "+left+"%;"}>Â </div>
      <div class={"loot " + type} style={"width: "+loot+"%;"}>Â </div>
      <div class={"last " + type} style={"width: "+last+"%;"}>Â </div></div> });
  }
  var level = config.getCity(["l", buildingIDs.warehouse], 0);
  if (isUndefined(level)) return;
  var wood = buildingCapacity("warehouse", "wood", level);
  var rest = buildingCapacity("warehouse", "rest", level);
  $x('id("cityResources")/ul/li/*[@class="tooltip"]').map(showSafeLevel);
}

function showHousingOccupancy(opts) {
  var txt = $("value_inhabitants").firstChild;
  var text = txt.nodeValue.replace(/\s/g, "\xA0");
  var pop = projectPopulation(opts);
  growthDebug && console.log(pop.toSource());
  var time = ":âˆž";
  if (pop.upgradeIn)
    time = ":" + secsToDHMS(pop.upgradeIn, 0);
  else //if (pop.asymptotic > pop.maximum)
    time = "/" + sign(pop.maximum - pop.current);
  txt.nodeValue = text.replace(new RegExp("[:)/].*$"), time +")");

  var townSize = $X('id("information")//ul/li[@class="citylevel"]');
  if (townSize && mainviewIsReferenceCity())
    node({ id: "townhallfits", className: "ellipsis", append: townSize,
           text: pop.current +"/"+ pop.maximum +"; "+ sign(pop.growth) +"/h" });
  return pop;
}

function getFreeWorkers() {
  return integer($("value_inhabitants").textContent.match(/^[\d,.]+/)[0]);
}

function getPopulation() {
  return integer($("value_inhabitants").textContent.match(/\(([\d,.]+)/)[1]);
}

function getMaxPopulation(townHallLevel) {
  if (isUndefined(townHallLevel))
    townHallLevel = buildingLevel("townHall", 1);
  var maxPopulation = buildingCapacity("townHall", townHallLevel);
  maxPopulation += 50 * config.getServer("techs.2080", 0); // Holiday
  maxPopulation += 20 * config.getServer("techs.2999", 0); // Economic Future
  if (isCapital()) {
    maxPopulation += 50 * config.getServer("techs.3010", 0); // Well Digging
    maxPopulation += 200 * config.getServer("techs.2120", 0); // Utopia
  }
  return maxPopulation;
}

function cityMaxPopulation(id) {
  return projectPopulation({ maxpop: 1, city: id });
}

function projectPopulation(opts) {
  function getGrowth(population) {
    return (happy - Math.floor(population + corr * happy)) / 50;
  }
  var cid = opts && opts.city || cityID();
  var wellDigging = 50 * isCapital() * config.getServer("techs.3010");
  var holiday = 25 * config.getServer("techs.2080", 0);
  var tavern = 12 * buildingLevel("tavern", 0, cid);
  var wineLevel = opts && opts.hasOwnProperty("wine") ? opts.wine :
    config.getCity(["x", buildingIDs.tavern], 0, cid);
  var wine = wineMultiplier * buildingCapacities.tavern.indexOf(wineLevel);
  var museum = 20 * buildingLevel("museum", 0, cid);
  var culture = 50 * config.getCity(["x", buildingIDs.museum], 0, cid);
  var utopia = config.getServer("techs.2120", 0); // +200 happy in capital city
  var economic_future = 10 * config.getServer("techs.2999", 0);
  var happy = 196 + wellDigging + holiday + tavern + wine + museum + culture +
    (200 * utopia * isCapital(cid)) + economic_future; // a k a satisfaction

  var population = opts && opts.population || getPopulation();
  growthDebug && console.log("well digging: "+ wellDigging +", holiday: "+
                             holiday +", tavern:"+ tavern +", wine: "+ wine +
                             ", museum: "+ museum +", culture: "+ culture +
                             ", utopia: "+ (200 * utopia * isCapital(cid)) +
                             " = "+ happy + " base happiness");

  var corr = corruption(cid);
  growthDebug && console.log("Actual corruption rate ("+ (100*corr).toFixed(2) +
                             ") * base happiness => "+ Math.floor(corr*happy) +
                             " unhappy citizens from corruption");
  var initialGrowth = getGrowth(population);
  var growthSignSame = initialGrowth > 0 ? function plus(p) { return p > 0; } :
                                          function minus(p) { return p < 0; };
  var currentPopulation = population;
  var asymptoticPopulation = population, asymAt;
  var change = initialGrowth > 0 ? 1 : -1;
  while (growthSignSame(getGrowth(asymptoticPopulation)))
    asymptoticPopulation += change;

  var time = 0;
  var currentGrowth = initialGrowth;
  var maximumPopulation = getMaxPopulation(buildingLevel("townHall", 1,0, cid));
  if (opts && opts.maxpop) return maximumPopulation;
  while (growthSignSame(currentGrowth) && (population < maximumPopulation)) {
    currentGrowth = getGrowth(population);
    population += currentGrowth / 4; // add 15 minutes of growth
    time += 60 * 15;
    if (opts && opts.popgte && population >= opts.popgte)
      return time;
  }
  if (opts && opts.popgte) return Infinity;

  var hint = $("cityNav"), warn = true;
  if (asymptoticPopulation <= maximumPopulation) {
    hint.title = "Reaches asymptotic population "+ asymptoticPopulation +"/"+
      maximumPopulation +" at "+ resolveTime(time, 1);
    warn = false;
  }

  var people = $("value_inhabitants");
  var hqLevel = buildingLevel("townHall");
  var nextHQUpgradeTime = parseTime(costs[0][hqLevel].t);
  var upgradingTownHall = $X('id("done")/../@href = "'+ urlTo("townHall") +'"');

  hint.title = lang.full + resolveTime(time, 1);
  // < 15 min left for expanding Town Hall ahead of time to meet growth?
  if (warn) {
    if (time < 15 * 60 + nextHQUpgradeTime && !upgradingTownHall)
      people.className = "storage_danger";
    if (currentPopulation == maximumPopulation)
      people.className = "storage_full";
    else
      people.className = "";

    if (!upgradingTownHall)
      hint.title += lang.startExpand +
        resolveTime(time - nextHQUpgradeTime, 1);
  } else
    people.className = "";

  var upgrade = !upgradingTownHall && asymptoticPopulation > maximumPopulation;

  return {
      happy: happy - currentPopulation,
     growth: initialGrowth,
    current: currentPopulation,
 asymptotic: asymptoticPopulation,
    maximum: maximumPopulation,
    finalAt: Date.now() + time * 1e3,
  upgradeIn: upgrade ? time - nextHQUpgradeTime : 0,
      final: Math.min(asymptoticPopulation, maximumPopulation),
       time: time
  };
}

function projectBuildStart(root, result) {
  function projectWhenWeHaveResourcesToStartBuilding(ul) {
    if (!result) return;
    var time = 0;
    var need = {};
    var pace = reapingPace();
    var have = currentResources();
    var woodNode = $X('li[starts-with(@class,"wood")]', ul);
    if (woodNode)
      need.w = woodNode;
    var needRest = $x('id("buildingUpgrade")//ul[@class="resources"]/li[not('+
                      'contains(@class,"wood") or contains(@class,"time"))]');
    for (var i = 0; i < needRest.length; i++) {
      var what = needRest[i];
      var id = resourceIDs[what.className.split(" ")[0]];
      need[id] = what;
    }
    for (var r in need) {
      var node = need[r];
      var amount = number(node);
      if (amount <= have[r]) continue;
      if (!pace[r]) {
        node.title += ": (âˆž)";
        time = Infinity;
      } else {
        what = 3600 * (amount - have[r]) / pace[r];
        node.title += ": ("+ resolveTime(what, 1) +")";
        time = Math.max(time, what);
      }
    }
    if (time && (node = $X(result, ul))) {
      if (Infinity == time)
        time = "\xA0(âˆž)";
      else
        time = "\xA0("+ resolveTime(time, 1) +")";
      node.appendChild(document.createTextNode(time));
    }
  }

  if ($("donateForm")) return; // is a resource, not something you build/upgrade
  result = result || 'li[@class="time"]';
  $x('.//ul[@class="resources"][not(ancestor::*[@id="cityResources"])]',
     $(root)).forEach( projectWhenWeHaveResourcesToStartBuilding );
}

function projectHaveResourcesToUpgrade() {
  // $X('ul[@class="actions"]/li[@class="upgrade"]/a').className = "disabled";
  projectBuildStart("buildingUpgrade", 'preceding-sibling::h4');
}

function projectCompletion(id, className, loc) {
  var tag = isString(id) ? $(id) : id, set = false;
  if (isNumber(className)) className = loc = undefined; // called by forEach/map
  if (tag) {
    id = tag.id;
    // console.log("T: %x", $("servertime").textContent);
    // console.log("L: %x", tag.textContent);
    // console.log("D: %x", parseTime(tag.textContent));
    // console.log("F: %x", resolveTime(parseTime(tag.textContent)));
    var time = parseTime(tag.textContent);
    var done = resolveTime(time);
    var div = node({ tag: tag.nodeName.toLowerCase(), className: className,
                     after: tag, text: done });
    time = time * 1e3 + Date.now();
    var key = { resource: "wu", tradegood: "ru" }[urlParse("view")];
    if ("upgradeCountDown" == id)
      set = key ? config.setIsle(key, time) : config.setCity("t", time);
    if ("cityCountdown" == id) {
      set = config.setCity("t", time);
      var move = $X('ancestor::*[contains(@class,"timetofinish")]', tag);
      if (move)
        move.style.marginLeft = "-40%";
    }
    if (set) {
      if (isString(loc))
        loc = $X(loc, tag);
      else if (isUndefined(loc))
        if (location.search.match(/\?/))
          loc = location;
        else
          loc = { href: urlTo(document.body.id) };
      if (loc)
        config.setCity("u", loc.href);
    }
  }
  return time;
}

function greek(hostname) {
  return "Î±Î²Î³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰".charAt(integer(hostname) - 1);
}

function title(detail) {
  var server = location.hostname.match(/^s(\d+)\.(.*)/), host = "";
  if (server) {
    host = " "+ server[2];
    server = greek(server[1]);
  }
  if (!detail)
    detail = $X('id("breadcrumbs")/*[last()]');
  if (detail)
    document.title = ((server ? server + " " : "") +
                      detail.textContent + host).replace(/\s+/g, " ");
}

function clickResourceToSell() {
  function haveHowMuch(e) {
    var img = e.target;
    var resource = img.src.match(/([^_]+).gif$/)[1].replace("glass", "crystal");
    return number(get(resource));
  }
  function sell100(e) {
    var have = haveHowMuch(e);
    var sell = $x('following::input[@type="text"]', e.target);
    sell[0].value = Math.min(have, 100 + integer(sell[0].value || 0));
    sell[1].value = Math.max(25, integer(sell[1].value));
  }
  function sellAll(e) {
    var have = haveHowMuch(e);
    var sell = $x('following::input[@type="text"]', e.target);
    sell[0].value = have;
    sell[1].value = Math.max(25, integer(sell[1].value || 0));
  }
  function clickToSell(img) {
    img.addEventListener("click", sell100, false);
    //img.addEventListener("dblclick", sellAll, false);
    img.style.cursor = "pointer";
  }
  $x('//table[@class="tablekontor"]/tbody/tr/td[1]/img').forEach(clickToSell);
}

/*---------------------
Ajout du panel dans le menu
---------------------*/
function panelInfo() { // Ajoute un element en plus dans le menu.
  var r = revision() ? "r" + revision() : "", panel = <div class="dynamic">
    <h3 class="header">
      <a href="http://kronos-utils.notlong.com/">Kronos</a> { version }{ r }:
      <a href={"#"+ config.get("language")} id="language">{ lang.language }</a>
      <a href={ urlTo("library") } title="Library" class="help">
        <span class="textLabel">Library</span>
      </a>
    </h3>
    <div id="kronos" class="content" style="margin: 3px 10px;"> </div>
    <div class="footer"></div>
  </div>;

  var tags = node({ tag: panel, before: $("mainview") });
  tags.language.addEventListener("click", promptLanguage, false);

  var research = config.getServer("techs.research.n", "");
  if (research) {
    var done = config.getServer("techs.research.t", 0);
    if (done) done = resolveTime((done - Date.now()) / 1e3, 1);

    var a = node({ prepend: tags.kronos, tag: <>
<a id="researching" href={urlTo("academy") || urlTo("researchAdvisor")}>
  {done ? done + " \u2014" : lang.researching + ":"} {research}
</a><br/></> }).researching;

    var tech = techinfo(research);
    if (tech)
      a.title = tech.x +" ("+ tech.p +" "+ lang.points +")";
  }
  return tags.language;
}

function islandID(city) {
  return urlParse("id", $X('//li[@class="viewIsland"]//a').search);
}

function referenceIslandID(city) {
  city = city || referenceCityID();
  return config.getCity("i", 0, city);
}

function referenceCityID(index) {
  if (index) return $("citySelect").selectedIndex;
  var names = get("citynames"), name;
  for (var i = 0; name = names[i]; i++)
    if (/active/.test(name.className||""))
      return cityIDs()[i];
}

function cityID() {
  var id = urlParse("cityId") || urlParse("id");
  var view = urlParse("view");
  if (id)
    if (buildingIDs.hasOwnProperty(view) && !urlParse("type") ||
        { city:1 }[view])
      return integer(id);
  var a = $X('//li[@class="viewCity"]//a');
  return a && integer(urlParse("id", a.search));
}

function cityIDs() {
  return pluck($x('id("citySelect")/option'), "value").map(integer);
}

function mainviewIslandID() {
  var city = $X('id("breadcrumbs")//a[@class="island"]');
  return city && urlParse("id", city.search);
}

function mainviewIsReferenceCity() {
  return cityName() == mainviewCityName() && mainviewOnReferenceIsland();
}

function mainviewOnReferenceIsland() {
  return islandID() == mainviewIslandID();
}

function mainviewCityID() {
  var city = $X('id("breadcrumbs")/a[@class="city"]');
  if (city) return integer(urlParse("id", city.search));
  if ({ island: 1, resource: 1, tradegood: 1 }[document.body.id])
    return cityID();
  if ((city = urlParse("id", $X('id("advCities")//a').search)))
    return integer(city);
  return cityID();
}

function mainviewCityName() {
  var city = $X('id("breadcrumbs")//*[@class="city"]');
  if (city) return city.textContent;
}

function cityName(id) {
  if (!id)
    return cityNames()[referenceCityID("index")];
  return cityNames()[cityIDs().indexOf(integer(id))];
}

function cityNames() {
  function noCoords(name) {
    return name.replace(/^(\[\d+:\d+\] )?/, "");
  }
  return cityNames.names = cityNames.names ||
    pluck(get("citynames"), "textContent").map(noCoords);
}

function isCapital(city) {
  city = city || cityID();
  var capital = config.getServer("capital", 0);
  if (capital)
    return city == capital;
  return city == cityIDs()[0];
}

function isMyCity() {
  return cityIDs().indexOf(mainviewCityID()) != -1;
}




function hideshow(node, nodes) {
  function listen(on) {
    on.addEventListener("mouseover", function(){ show(node); }, false);
    on.addEventListener("mouseout",  function(){ hide(node); }, false);
  }
  nodes = nodes || [node];
  nodes.forEach(listen);
}

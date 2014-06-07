// ==UserScript==
// @name                        Kronos memory
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==

/*
s10.org: {
  techs: { <all tech id:s we have>:1,
         .research: {
           i: 2090,
           n: "Helping hands",
           t: 1207648486127
         },
         .units: {
           <id>: level (0 == none -> 3 == gold)
         },
         .points: { count: research points, at: sample timestamp },
         .info: {
           <id>: {
             n: "Helping hands",
             p: 4711, // research points
             x: "Description of its effect"
           }
         },
  },
//  citykeys: {
//    <key>: cityID
//  },
  battles: {
    won: 113,
   lost: 8,
reports: {
    <BID>: {
        t:1207175100000, w:1, l:{g:136, W:59}, c:38714, a:attackingCity?},
      }
  },
  players: {
   <name>: {
   cities: [id, id, id...],
        u: {
     <id>: { a: 0-3, d: 0-3 }
      }
    },
  },
  cities: {
    <id>: {
      n: name,
      i: island ID,
      m: maintenance cost,
      g: gold net income (FIXME: remove and add allocated/free pop instead),
      t: completionTime,
      T: { -- troops:
        <id>: count
      },
      u: buildURL,
      U: { <id>: count },
      l: [ lvl0, ...], // building level
      p: [ pos0, ...], // building position
      q: [ bID, ...], // buildings sceduled to be built
      o: owner, // player name
      r: { }, // saved resource inventory / info for the city
      x: { bID:building-special - tavern: wine level; academy: scientists,
           r: resourceWorkers, w: woodWorkers, museum: culture items },
      b: { bID:time busy to },
      z: 0: normal, 1: vacation, 2: inactive
      Z: normal: last seen; vacation/inactive: 1st-seen
    }, ...
  },
  islands: {
    <id>: {
      r: "W" / "M" / "C" / "S"
      R: tradegood level
      w: sawmill level
      wu: sawmill upgrade done
      ru: tradegood upgrade done
      x, y: coords
      n: name
    },
  }
}
*/

revision("$Revision$");

// config.get() and config.set() store config data in (near-)json in prefs.js.
var none = { v: 1, capital: 0, treaties: [], spies: {}, players: {},
             cities: {}, islands: {}, techs: {}, battles: {} };

var data = eval(GM_getValue("config", {}) || {});
var server = eval(GM_getValue(location.host, none) || none);

function getServers() {
  function domain(s) { return s.split("ikariam.").pop(); }
  function byDomain(a, b) {
    var A = domain(a), B = domain(b);
    return A == B ? integer(a) - integer(b) : A > B;
  }
  return GM_listValues().filter(/^s\d/).sort(byDomain);
}

function saveConfig() {
  if (isDefined(data))
    return GM_setValue("config", uneval(data));
  console.log("Failed to save global Kronos config.");
}

function saveServer() {
  GM_setValue(location.host, uneval(server).replace(/ \(void 0\)/g, ""));
  //console.log("server ", uneval(server));
}

var config = (function() {
  function get(name, value) {
    try {
      if (arguments.length < 2) value = optionDefault(name);
      return data.hasOwnProperty(name) ? data[name] : value;
    } catch(e) {
      console.log("config.get("+ arguments.length +": "+ name +", "+ value);
      throw(e);
    }
  }

  function make(getOrSet, what, dflt) {
    return function(name, value, id) {
      return getOrSet([what, id || dflt()].concat(array(name)), value);
    };
  }

  var getCity = make(getServer, "cities", mainviewCityID);
  var setCity = make(setServer, "cities", mainviewCityID);
  var getIsle = make(getServer, "islands", islandID);
  var setIsle = make(setServer, "islands", islandID);

  function getServer(name, value) {
    if ("?!" == value) console.log(name, value);
    var path = isString(name) ? name.split(".") : name;
    var save = name;
    var scope = server;
    for (var i = 0; i < path.length; i++) {
      name = path[i];
      if (!scope.hasOwnProperty(name)) {
        if ("?!" == value) console.log(save.join("/"), scope);
        //console.log(save.join("/", value);
        return value;
      }
      scope = scope[name];
    }
    if ("?!" == value) console.log(save.join("-"), scope);
    // console.log(save, i == path.length, value, scope);
    return scope;
  }

  function set(name, value) {
    var path = isString(name) ? name.split(".") : name;
    var scope = data, last = path.length - 1;
    for (var i = 0; i <= last; i++) {
      name = path[i];
      if (i != last)
        scope = scope[name] = scope[name] || {};
      else
        scope[name] = value;
    }
    expensive(saveConfig)();
    return value;
  }

  function setServer(name, value) {
    var path = isString(name) ? name.split(".") : name;
    var tmpl = { 3: { cities: [{}, {l: Array, p: Array, q: Array}] } };
    var scope = server, last = path.length - 1;
    for (var i = 0; i <= last; i++) {
      name = path[i];
      if (i != last) {
        if (!scope.hasOwnProperty(name)) try {
          var type = tmpl[path[0]][path.length][i][name];
        } catch(e) { type = Object; } finally {
          scope[name] = new type;
        }
        scope = scope[name];
      } else
        scope[name] = value;
    }
    expensive(saveServer)();
    return value;
  }

  function remCity(name) {
    return remServer(name +":"+ cityID());
  }

  function remIsle(name) {
    return remServer(name +"/"+ islandID());
  }

  function remServer(name) {
    return remove(name +":"+ location.hostname);
  }

  function keys(re) {
    re = re || /./;
    var list = [];
    for (var id in data)
      if (data.hasOwnProperty(id) && re.test(id))
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
    expensive(saveConfig)();
    return value;
  }

  return { get:get, set:set, remove:remove, keys:keys,
           setCity:setCity, getCity:getCity, remCity:remCity,
           setIsle:setIsle, getIsle:getIsle, remIsle:remIsle,
           setServer:setServer, getServer:getServer, remServer:remServer };
})();

function upgradeConfig() {
  var v = GM_getValue(location.host) && config.getServer("v") || 0;
  //console.log("ver ", v);
  if (v < 1) upgradeConfig0();
}

// 0 -> 1 was about making configs deep rather than flat, and per server
function upgradeConfig0() {
  function makeNWO() {
    var obj = { v: 1 };
    for (var name in nwo)
      obj[name] = name == "treaties" ? [] : name == "capital" ? 0 : {};
    return obj;
  }
  var ns = {};
  var nwo = { capital: 1, treaties: 1, techs: 1, spies: 1,
              players: 1, cities: 1, islands: 1, battles: 1 };
  var old = config.keys(), key, host, isle, city, tech, r, b, save, junk;
  for (var i = 0; key = old[i]; i++) {
    var value = config.get(save = key);
    config.remove(key);

    // belongs to which server scope?
    if ((host = key.match(/(.*):([^:]+\D[^.])$/))) {
      [junk, key, host] = host;
    } else { // data sanitization; probably drop
      if ("language" == key) {
        ns.config = ns.config || {};
        ns.config[key] = value;
      }
      continue;
    }
    var scope = ns[host] || makeNWO();
    ns[host] = scope;


    // server global stuff first:
    if ((tech = key.match(/^tech(\d+)$/))) {
      [junk, tech] = tech;
      scope.techs[tech] = 1;
      continue;
    }

    if (/^research(|Done)$/.test(key)) {
      scope = scope.techs;
      scope.research = scope.research || {};
    }

    switch (key) {
      case "war":
        scope = scope.battles;
        scope.won = value.won;
        scope.lost = value.lost;
        continue;

      case "cities":
        scope = scope.cities;
        for (var id in value) {
          city = scope[id] = scope[id] || {};
          city.i = integer(value[id].i);
          city.n = value[id].n;
        }
        continue;

      case "capital":		scope.capital = integer(value); continue;
      case "reports":		scope.battles.reports = value; continue;
      case "research":		scope.research.n = value; continue;
      case "researchDone":	scope.research.t = value; continue;
      case "culturetreaties":	scope.treaties.culture = value; continue;
    }


    // island global stuff; only resource levels at this time:
    if ((isle = key.match(/^(.*)\/(\d+)$/))) {
      [junk, r, isle] = isle;
      scope.islands[isle] = scope.islands[isle] || {};
      scope = scope.islands[isle];
      if (/^[WMCS]$/.test(r)) {
        scope.r = r;
        scope.R = value;
      } else {
        scope[r] = value;
      }
      continue;
    }


    // the rest; city local stuff:
    if (!(city = key.match(/^(.*):(\d+)$/)))
      continue;
    [junk, key, city] = city;

    city = scope.cities[city] = scope.cities[city] || {};

    if ((b = key.match(/^(building|posbldg)(\d+)$/))) {
      [junk, key, b] = b;
      if (!city.l) city.l = [];
      if (!city.p) city.p = [];
      if ("building" == key)
        city.l[b] = value;
      else
        city.p[b] = value;
      continue;
    }

    switch (key) {
      case "q":		city.q = eval(value); continue;
      case "r":		city.r = value; continue; // temporary hack
      //case "gold":	city.g = value; continue;
      case "build":	city.t = value; continue;
      case "buildurl":	city.u = value; continue;

      default:
        continue;

      case "wine":		b = buildingIDs.tavern; break;
      case "culture":		b = buildingIDs.museum; break;
      case "researchers":	b = buildingIDs.academy; break;
    }
    if (!city.x) city.x = {};
    city.x[b] = integer(value);
  }
  if (!ns[location.host])
    ns[location.host] = makeNWO();
  data = ns.config;
  server = ns[location.host];
  for (var name in ns)
    GM_setValue(name, uneval(ns[name]));
  return ns;
}

// n -> m is about dropping city:u links (can be auto-generated)
// move techs.info (and techs.asked) from server to tld scope
// drop techs.info.t (it's dependent on your pace and .p anyway)
// kill configs for non-sN.ikariam.* servers (not "config" though)
// kill "tech" key, if available
// replace cities.id.r key (a resource id) with {} for current resource counts
function upgradeConfig1() {
}


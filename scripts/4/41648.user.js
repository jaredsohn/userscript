// ==UserScript==
// @name           Jonatan MobWars Helper
// @namespace      http://userscripts.org/users/41648
// @description    Helps and improves the playing experience of the Facebook application MobWars with automatic functions.
// @source         http://userscripts.org/scripts/show/41648
// @identifier     http://userscripts.org/scripts/source/29870.user.js
// @version        1.1
// @date           2009-02-02
// @creator        Jonatan Marin
// @include        http://apps.facebook.com/mobwars/*
// @include        http://apps.new.facebook.com/mobwars/*
// ==/UserScript==
/*jsl:option explicit*/
/* $Revision: 186 $ */
var version_timestamp = 1230015843000;
/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var version_scriptNum = 29870;
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);

/* Errors */
var error = document.getElementById('errorTryAgain');
if (error) {
  location.reload();
}




var Page = new Object();

Page.init = function() {
  /* Now */
  Page.now = Math.floor(new Date().getTime() / 1000);
  var url = location.href;
  /* user */
  var div;
  div = document.getElementById('fb_menu_profile');
  div = div.getElementsByTagName('a')[0];
  Page.c_user = div.href.match(/id=([0-9]+)/)[1];
  var parts = url.split('/');
  /* type */
  Page.c_page = parts[4];
  /* params */
  Page.c_params = new Object();
  url = parts[5];
  if (!url) return;
  url = url.split('?');
  if (!url[1]) return;
  url = url[1];
  parts = url.split('&');
  for (var i = 0; i < parts.length; i++) {
    var param = parts[i].split('=');
    Page.c_params[param[0]] = param[1];
  }
}

Page.init();
/* vim:set tw=80 sts=2 et ft=javascript: */



var Menu = new Object();

function menu_intToDollars(num) {
  num = num || 0;
  var str = "";
  var tmp;
  while (num >= 1000) {
    var tmp = num % 1000;
    if (tmp > 99) tmp = "" + tmp;
    else if (tmp > 9) tmp = "0" + tmp;
    else tmp = "00" + tmp;
    str = "," + tmp + str;
    num = Math.floor(num / 1000);
  }
  str = "$" + num + str;
  return str;
}

Menu.init = function() {
  var menuCode = new Array();
  menuCode.push('<div class="scriptStatusHeader">-Script status Jonatan-</div>');
  menuCode.push('<table style="width: 100%;"><tr><td>Cash</td><td id="cash_stat"style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Bank account</td><td id="bank_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>City value</td><td id="city_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Stock value</td><td id="stockpile_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td colspan="2"><hr/></td></tr>');
  menuCode.push('<tr><td>Total</td><td id="total1_stat" style="text-align: right;"></td></tr>');
  menuCode.push('<tr><td colspan="2">&nbsp;</td></tr>');
  /* Income and expenses */
  menuCode.push('<tr><td>City income</td><td id="income_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Job mean payout</td><td id="jobincome_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Upkeep</td><td id="upkeep_stat" style="color: red; text-align: right;"></td></tr>');
  menuCode.push('<tr><td colspan="2"><hr/></td></tr>');
  menuCode.push('<tr><td>Total</td><td id="total2_stat" style="color: green; text-align: right;"></td></tr></table>');
  menuCode.push('<br/>');

  menuCode.push('<div class="scriptStatusContent"><span id="scripterror"></span>Status:<br /><span id="scriptstatus">Resting...</span><br /><span id="scripttimer"></span></div>');
  menuCode.push('<div><button type="button" id="prefs_button">Script Preferences</button></div>');

  var menu = document.createElement('div');
  menu.id = 'ScriptStatus';
  menu.innerHTML = menuCode.join('\n');
  menuCode.length = 0;

  menuCode.push("#ScriptStatus { z-index: 10; position:fixed; bottom:27px; ");
  menuCode.push("right:2px; ");
  menuCode.push("border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; width: 200px; min-height: 100px;}");
  menuCode.push("#ScriptStatus div.scriptStatusHeader { text-align:center; background: #6D84B4; color: #FFFFFF; }");
  menuCode.push("#ScriptStatus div.scriptStatusContent { border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid;}");

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');

  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}
  document.body.insertBefore(menu, document.body.lastChild);

  var button = document.getElementById('prefs_button');
  button.addEventListener('click', Preferences.show(), true);
  Menu.update();
}

Menu.update = function() {
  var el = document.getElementById('cash_stat');
  var total = 0;
  el.innerHTML = menu_intToDollars(boss.cash);
  total += boss.cash || 0;
  el = document.getElementById('bank_stat');
  el.innerHTML = menu_intToDollars(boss.bank_cash);
  total += boss.bank_cash || 0;
  el = document.getElementById('city_stat');
  el.innerHTML = menu_intToDollars(boss.city_value);
  total += boss.city_value || 0;
  el = document.getElementById('stockpile_stat');
  el.innerHTML = menu_intToDollars(boss.stockpile_value);
  total += boss.stockpile_value || 0;
  el = document.getElementById('total1_stat');
  el.innerHTML = menu_intToDollars(total);
  /* Income and upkeep */
  el = document.getElementById('income_stat');
  el.innerHTML = menu_intToDollars(boss.total_income);
  el = document.getElementById('jobincome_stat');
  el.innerHTML = menu_intToDollars(boss.job_income);
  el = document.getElementById('upkeep_stat');
  el.innerHTML = menu_intToDollars(boss.total_upkeep);
  el = document.getElementById('total2_stat');
  total = boss.total_income + boss.job_income - boss.total_upkeep;
  el.innerHTML = '';
  if (total < 0) {
    el.style.color = 'red';
    el.innerHTML = '-';
  }
  total = Math.abs(total);
  el.innerHTML += menu_intToDollars(total);
}
/* vim:set tw=80 sts=2 et ft=javascript: */





/***
 * Object: Utils
 *
 * Description: contains some utilities functions.
 */
Utils = new Object();

/***
 * Method: Element.getElementsByClassName(name, node)
 *
 * Description:
 * Gets a list of elements with a give className.
 *
 * @param name        -- the classname to look for.
 * @param node        -- node on which we start the search.
 * @return array      -- an array of nodes matching the classname.
 */
if (document.getElementsByClassName) {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
  }
} else {
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext()) {
      returnElements.push(node);
    }
    return returnElements;
  }
}

/***
 * Function: Utils.getElementsByXPath(expression, node)
 *
 * Description:
 * Returns an array of elements obtained from evaluating the XPath expression on
 * the node.
 *
 * @param expression         -- the expression to evaluate.
 * @param node               -- context node, defaults to document.
 * @return array             -- an array of elements matching the expression
 */
Utils.getElementsByXPath = function(expression, node) {
  if (!node) node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()) {
    result.push(node);
  }

  return result;
}
/* vim:set tw=80 sts=2 et ft=javascript: */

function Boss() {
  this.name = 'Anonymous';
  this.cash = 0;
  this.health = 100;
  this.max_health = 100;
  this.energy = 10;
  this.max_energy = 10;
  this.stamina = 3;
  this.max_stamina = 3;
  this.exp = 0;
  this.level = 0;
  this.type = 'Unknown';
  this.new_level = 0;
  this.mobsters = 0;
  this.jail_delay = 0;
  this.actions = {"boss_type":{"page":"profile", "url_params":"user_id=" + Page.c_user, "message":"Checking name and type of your boss", "time":0}, "boss_attack":{"page":"boss", "message":"Checking attack parameters of your boss", "time":0}};
  this.preferences = new Object();
  this.hitlist = new Array();
  var obj = eval(GM_getValue('boss','({})'));
  for (var i in obj) {
    this[i] = obj[i];
  }
}

/*
Boss.prototype = new Object();

Boss.prototype.save = function() {
  GM_setValue('boss', this.toSource());
}

Boss.prototype.updateData = function() {
  /* Upgrades */
  /* Version 1.0-beta */
/*  if (!itemlist.item_14 || !itemlist.item_14.stocktype) this.new_level = 1;
  /* Jail delay */
/*  boss.jail_delay = 0;
  /* Mobsters except myself */
/*  var header = document.getElementById('app8743457343_header');
  var str = header.getElementsByTagName('a')[0].innerHTML;
  this.mobsters = parseInt(str.match(/\d+/)[0]);
  /* Other data */
/*  header = document.getElementById('app8743457343_statusMenu');
  var divs = Utils.getElementsByClassName('wrap3outer', header);
  for (var i = 0; i < divs.length; i++) {
    str = divs[i].innerHTML;
    str = str.replace(/<[^>]*>/g, '');
    str = str.replace(/[, \t]/g,'');
    var re = /(Cash|Health|Energy|Stamina|Exp|Level): ?\$?([0-9]+)\/?([0-9]+)?/;
    var result = str.match(re);
    if (!result) continue;

    switch (result[1]) {
      case 'Cash':
        this.cash = parseInt(result[2]);
        break;
      case 'Health':
        this.health = parseInt(result[2]);
        this.max_health = parseInt(result[3]);
        break;
      case 'Energy':
        this.energy = parseInt(result[2]);
        this.max_energy = parseInt(result[3]);
        break;
      case 'Stamina':
        this.stamina = parseInt(result[2]);
        this.max_stamina = parseInt(result[3]);
        break;
      case 'Exp':
        this.exp = parseInt(result[2]);
        break;
      case 'Level':
        if (this.level != parseInt(result[2])) this.new_level = 1;
        this.level = parseInt(result[2]);
        break;
      default:
        alert("Unknown field: " + str);
    }
  }

  switch (Page.c_page) {
    case 'boss':
      header = document.getElementById('app8743457343_content');
      divs = header.getElementsByTagName('tr');
      this.attack_strength = parseInt(divs[1].getElementsByTagName('td')[1].innerHTML);
      this.defense_strength = parseInt(divs[2].getElementsByTagName('td')[1].innerHTML);
      break;
    case 'jail':
      header = document.getElementById('app8743457343_content');
      divs = header.getElementsByTagName('p');
      for (var i = 0; i < divs.length; i++) {
        var delay = divs[i].innerHTML.match(/jail in ([0-9.]+) hour/);
        if (delay) {
          delay = parseFloat(delay[1]) + 0.01;
          this.jail_delay = Page.now + Math.floor(3600 * delay);
          break;
        }
      }
      break;
    case 'profile':
      if (Page.c_page == 'profile' && Page.c_params.user_id == Page.c_user) {
        header = document.getElementById('app8743457343_content');
        header = header.getElementsByTagName('h1')[0].innerHTML;
        var result = header.match(/"(.*)", Level [0-9]+ (\w+)/);
        this.name = result[1];
        this.type = result[2];
      }
      break;
    case '':
      header = Utils.getElementsByXPath('//div[@id="app8743457343_content"]/div')[0];
      header = header.innerHTML;
      header = header.match(/More energy in (\d+) seconds/);
      if (header) boss.energy_time = Page.now + parseInt(header[1]);
  }
  this.save();
}

GM_registerMenuCommand("Reset MobWars' script database...",
  function() {
    GM_setValue('boss', '({})');
    GM_setValue('inventory', '({})');
    GM_setValue('itemlist', '({})');
    GM_setValue('jobs', '({})');
  });

/* vim:set tw=80 sts=2 et ft=javascript: */





function Stockitem() {
  this.type = 'stockpile';
  this.name = 'Unknown';
  this.attack = 0;
  this.defense = 0;
  this.upkeep = 0;
  this.price = 0;
}

function Cityitem() {
  this.type = 'city';
  this.name = 'Unknown';
  this.price = 0;
  this.income = 0;
  this.depends = '';
}

function Prepitem() {
  this.type = 'prep';
  this.name = 'Unknown';
  this.energy_per_unit = 0;
}

function Itemlist() {
  var obj = eval(GM_getValue('itemlist','({})'));
  for (var i in obj) {
    this[i] = obj[i];
  }
}

Itemlist.prototype = new Object();

Itemlist.prototype.save = function() {
  GM_setValue('itemlist', this.toSource());
}

Itemlist.prototype.updateData = function() {
  var pages = ['stockpile', 'jobs', 'city'];
  if (pages.indexOf(Page.c_page) != -1) {
    for (var item in this) {
      if (this[item].type != Page.c_page) continue;
      delete this[item];
    }
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByXPath('.//a[contains(@name,"item")]',header);
    var stocktype = 'weapon';
    for (var i = 0; i < divs.length; i++) {
      if (Utils.getElementsByXPath('..//a[contains(@href,"stockpile/#'+divs[i].name+'")]', divs[i]).length) continue;
      var div = Utils.getElementsByXPath('./ancestor::tr', divs[i])[0];
      var item_id = divs[i].name;
      var item;
      switch(Page.c_page) {
        case 'stockpile':
          item = new Stockitem();
          /* Bulletproof vest and Ford Crown Vic to switch between types */
          if (item_id == 'item_15') stocktype = 'armor';
          else if (item_id == 'item_21') stocktype = 'vehicle';
          item.stocktype = stocktype;
          break;
        case 'city':
          item = new Cityitem();
          break;
        case 'jobs':
          item = new Prepitem();
          break;
        default:
      }
      /* The name of the item */
      if (Page.c_page != 'jobs') item.name = div.getElementsByTagName('img')[0].title;
      else {
        var img = Utils.getElementsByXPath('.//a[contains(@href,"item")]/following-sibling::span', div)[0];
        item.name = img.previousSibling.title.match(/[0-9]+ (.*)/)[1];
      }
      /* The items data */
      var result;
      var str = div.innerHTML.replace(/\n/g,'');
      switch (Page.c_page) {
        case 'jobs':
          result = str.match(/\(\+(\d+)\).*Energy:&nbsp;(\d+)/);
          item.energy_per_unit = result[1] / result[2];
          break;
        case 'city':
          result = str.match(/Income: \$([0-9,]+).*\$([0-9,]+).*Owned: <[^<]*>(\d+)/);
          item.income = parseInt(result[1].replace(/,/g,''));
        /* Base price */
          item.price = parseInt(result[2].replace(/,/g,'')) * 10 / (parseInt(result[3]) + 10);
        /* Dependencies */
          result = str.match(/Built On: (\w+ \w+)/);
          if (result) {
            for (var j in this) {
              if (this[j].name == result[1]) {
                item.depends = j;
                break;
              }
            }
          }
          break;
        case 'stockpile':
          result = str.match(/Attack: (\d+)/);
          if (result) item.attack = parseInt(result[1]);
          result = str.match(/Defense: (\d+)/);
          if (result) item.defense = parseInt(result[1]);
          result = str.match(/upkeep.>\$([0-9,]+)/);
          if (result) item.upkeep = parseInt(result[1].replace(/,/g,''));
          result = str.match(/\$([0-9,]+)[^\$]*Owned/);
          if (result) item.price = parseInt(result[1].replace(/,/g,''));
          break;
        default:
          break;
      }
      this[item_id] = item;
    }
    this.save();
  }
}

/* vim:set tw=80 sts=2 et ft=javascript: */



Preferences = new Object();

Preferences.init = function() {
  /* The handlers for preferences */
  this.handlers = new Array();
  this.div = document.createElement('div');
  this.div.className = 'facebook-gm-pref';
  var css = ".facebook-gm-pref {display: none; position: absolute; z-index: 99; left: 200px; top: 200px; overflow: visible; background-color: white; border: 1px solid black; padding: 10px; min-width: 400px; min-height: 400px}";
  GM_addStyle(css);

  /* Setting title */
  this.div.innerHTML = '<h2>Script Preferences</h2>';

  /* Rule */
  this.rule = document.createElement('hr');
  this.rule.id = 'facebook-gm-rule';
  this.div.appendChild(this.rule);

  /* Building form */
  this.form = document.createElement('form');
  this.form.action = '';
  this.form.method = '';
  this.form.id = 'facebook-gm-pref';
  this.div.appendChild(this.form);

  /* Submit button */
  this.button = document.createElement('button');
  this.button.type = 'button';
  this.button.id = 'pref_submit';
  this.button.innerHTML = "Update preferences";
  this.form.appendChild(this.button);
  document.getElementsByTagName('body')[0].appendChild(this.div);
}

Preferences.populate = function(obj) {
  /* Preferences display */
  for (var i = 0; i < modules.length; i++) {
    if (obj[modules[i] + '_preferencesInterface']) obj[modules[i] + '_preferencesInterface'](this);
  }
  /* Preferences handlers */
  for (var i = 0; i < modules.length; i++) {
    if (obj[modules[i] + '_preferencesHandler']) this.handlers.push(obj[modules[i] + '_preferencesHandler']);
  }
  /* Add event listener */
  this.button.addEventListener('click', this.eventListener(), true);
  this.form.addEventListener('submit', this.eventListener(), true);
}

Preferences.eventListener = function() {
  var prefs = this;
  return function(ev) {
    var reload = false;
    var boss = eval(GM_getValue('boss', '({})'));
    /* Prevent submitting the form to the server */
    ev.preventDefault();
    /* Execute all handlers */
    for (var i = 0; i < prefs.handlers.length; i++) {
      if (prefs.handlers[i](prefs.form, boss)) reload = true;;
    }
    prefs.div.style.display = 'none';
    GM_setValue('boss', boss.toSource());
    if (reload) location.reload();
  }
}

Preferences.show = function() {
  var div = this.div;
  return function() {
    div.style.display = 'block';
    div.scrollIntoView(false);
  }
}

Preferences.init();
/* vim:set tw=80 sts=2 et ft=javascript: */

/* Modules */
var modules = ['inventory', 'datadisplay', 'bank', 'hospital', 'jobs'];
//var modules = ['hitlist', 'inventory', 'datadisplay', 'bank', 'hospital', 'jobs'];





Timer = new Object();

Timer.start = function(next_page, message, timer) {
  var span = document.getElementById('scriptstatus');
  span.innerHTML = message;
  span = document.getElementById('scripttimer');
  /* Convert seconds to string */
  var sec = timer;
  var str = (sec % 60) + ' s';
  sec = Math.floor(sec / 60);
  if (sec) {
    str = (sec % 60) + ' m ' + str;
    sec = Math.floor(sec / 60);
    if (sec) str = sec + ' h ' + str;
  }
  span.innerHTML = 'in ' + str;

  if (timer <= 0) {
    if (typeof next_page == 'object') {
      next_page.click();
    } else {
      location.href = next_page;
    }
  } else {
    timer--;
    setTimeout(Timer.start, 1000, next_page, message, timer);
  }
}




/* Global object */
var inventory = eval(GM_getValue('inventory', '({})'));

function inventory_exec() {
  boss.city_check = boss.city_check || 0;
  boss.stockpile_check = boss.stockpile_check || 0;
  var pages = ['jobs', 'city', 'stockpile'];
  /* Update the number of items that we have */
  if (pages.indexOf(Page.c_page) != -1) {
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByXPath('.//a[contains(@name,"item")]',header);
    for (var i = 0; i < divs.length; i++) {
      var div = Utils.getElementsByXPath('./ancestor::tr',divs[i])[0];
      var result = div.innerHTML.match(/Owned: (<[^<]*>)?(\d+)/);
      if (result) inventory[divs[i].name] = parseInt(result[2]);
    }
    GM_setValue('inventory', inventory.toSource());
  }

  /* If we changed level update lists now */
  if (boss.new_level) {
    boss.city_check = 1;
    boss.stockpile_check = 1;
  }
  /* Update data */
  switch (Page.c_page) {
    case 'city':
      if (boss.city_check < Page.now) {
        itemlist.updateData();
        boss.city_check = Page.now + 3600;
      }
      var total_income = 0;
      var city_value = 0;
      for (var item in itemlist) {
        if (itemlist[item].type != 'city') continue;
        var owned = inventory[item] || 0;
        total_income += owned * itemlist[item].income;
        var price = itemlist[item].price / 2;
        while (owned) {
          if (owned >= 10) {
            city_value += (10 + owned) * price;
            owned -= 10;
          } else {
            city_value += (10 + owned) * owned * price / 10;
            owned = 0;
          }
        }
      }
      boss.total_income = total_income;
      boss.city_value = city_value;
      Menu.update();
      break;
    case 'stockpile':
      if (boss.stockpile_check < Page.now) {
        itemlist.updateData();
        boss.stockpile_check = Page.now + 3600;
      }
      var total_upkeep = 0;
      var stockpile_value = 0;
      for (var item in itemlist) {
        if (itemlist[item].type != 'stockpile') continue;
        var owned = inventory[item] || 0;
        total_upkeep += owned * itemlist[item].upkeep;
        stockpile_value += owned * itemlist[item].price / 2;
      }
      boss.total_upkeep = total_upkeep;
      boss.stockpile_value = stockpile_value;
      Menu.update();
      break;
    case 'jobs':
      /* Always update the list of prep objects. It's not too long */
      itemlist.updateData();
      break;
    default:
      break;
  }
  var action;
  /* Check the city buildings */
  /* The second condition should be always true */
  if (boss.city_check == 0 && Page.c_page != 'city') {
    action = new Object();
    action.page = 'city';
    action.message = 'Checking new buildings available...';
    action.time = 0;
    boss.actions.inventory_city = action;
  }
  if (boss.stockpile_check == 0 && Page.c_page != 'stockpile') {
    action = new Object();
    action.page = 'stockpile';
    action.message = 'Checking new weapons available...';
    action.time = 0;
    boss.actions.inventory_stockpile = action;
  }
}
/* vim:set tw=80 sts=2 et ft=javascript: */

function Job() {
  this.payout_min = 0;
  this.payout_max = 0;
  this.exp = 0;
  this.mobsters = 0;
  this.req_items = new Object();
  this.prep_items = new Object();
  this.payout_items = new Object();
}

function Joblist() {
  var obj = eval(GM_getValue('jobs','({})'));
  for (var i in obj) {
    this[i] = obj[i];
  }
}

Joblist.prototype = new Object();

Joblist.prototype.save = function() {
  GM_setValue('jobs', this.toSource());
}

Joblist.prototype.updateData = function() {
  if (Page.c_page == 'jobs') {
    for (var job in this) if (typeof this[job] == 'object') delete this[job];
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByClassName('rowData', header);
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      var job = new Job();
      /* Name */
      var tmp = div.getElementsByTagName('b')[0];
      job.name = tmp.innerHTML;
      /* Payout */
      tmp = div.innerHTML.match(/Payout:.*\$([0-9,]+) - \$([0-9,]+)/);
      if (tmp) {
        job.payout_min = parseInt(tmp[1].replace(/,/g,''));
        job.payout_max = parseInt(tmp[2].replace(/,/g,''));
      }
      /* Experience */
      tmp = div.innerHTML.match(/Experience: \+(\d+)/);
      if (tmp) job.exp = parseInt(tmp[1]);
      /* Mobsters */
      tmp = div.innerHTML.match(/Mobsters:\&nbsp;(\d+)/);
      if (tmp) job.mobsters = parseInt(tmp[1]);
      /* Energy */
      tmp = div.innerHTML.match(/Energy:\&nbsp;(\d+)/);
      if (tmp) job.energy = parseInt(tmp[1]);
      /* Requirements */
      var items = Utils.getElementsByXPath('.//a[contains(@href,"#item")]', div);
      for (var j = 0; j < items.length; j++) {
        /* Item */
        tmp = items[j].href;
        tmp = tmp.match(/(jobs|stockpile|city)\/#(item_\d+)/);
        var item_id = tmp[2];
        /* Quantity */
        tmp = items[j].nextSibling;
        if (tmp.tagName == 'SPAN' && (tmp = tmp.innerHTML.match(/\((use |\+)?(\d+)(%)?\)/))) {
          if (tmp[1] == 'use ') job.prep_items[item_id] = parseInt(tmp[2]);
          else if (tmp[1] == '+') job.payout_items[item_id] = parseInt(tmp[2]);
          else if (tmp[3] == '%') job.payout_items[item_id] = 1;
          else job.req_items[item_id] = parseInt(tmp[2]);
        } else {
          job.req_items[item_id] = 1;
        }
      }
      /* Id */
      tmp = Utils.getElementsByXPath('.//input[@name="jobid"]', div)[0];
      this[tmp.value] = job;
    }
    this.save();
  }
}

function jobs_exec() {
  if (boss.job_income == 'undefined') boss.job_income = 0;
  var jobs = new Joblist();
  if (Page.c_page == 'jobs') {
    jobs.updateData();
  } else if (boss.new_level) {
    var action = new Object();
    action.page = 'jobs';
    action.message = "Checking new jobs available...";
    action.time = 0;
    boss.actions.jobs_check = action;
    return;
  }
  var jobid = boss.preferences.job;
  var message;
  switch (jobid) {
    case 'none':
      boss.job_income = 0;
      Menu.update();
      return;
    case 'payout':
      jobid = jobs_selectJob(jobs, false);
      if (!jobid) message = "You can not perform any job.";
      break;
    case 'exp':
      jobid = jobs_selectJob(jobs, true);
      if (!jobid) message = "You can not perform any job.";
      break;
    default:
      /* Check if we can do this job */
      if (!jobs_canDoJob(jobs[jobid])) {
        message = "You can not perform the job '" + jobs[jobid].name + "'";
        jobid = 0;
        break;
      }
      var prepid;
      if (prepid = jobs_needPrepJob(jobs, jobid)) {
        if (!jobs_canDoJob(jobs[prepid])) {
          message = "You can not perform the preparatory job '" + jobs[prepid].name + "' for '" + jobs[jobid].name + "'";
          jobid = 0;
          break;
        } else {
          jobs_updateIncome(jobid);
          jobid = prepid;
        }
      } else jobs_updateIncome(jobid);
      break;
  }

  if (!jobid) {
    alert(message);
    delete boss.actions.jobs;
    boss.job_income = 0;
    Menu.update();
    return;
  }

  /* Add the action to the list if it's not already there */
  var action = new Object();
  action.page = 'jobs';
  action.message = "Doing " + jobs[jobid].name + "...";
  action.func = 'jobs_dojob';
  action.params = [jobid, jobs[jobid].name];
  var delay;
  boss.type == 'Insomniac' ? delay = 240 : delay = 300;
  action.time = Page.now + (jobs[jobid].energy - boss.energy) * delay;
  if (boss.energy_time) {
    action.time -= (action.time - boss.energy_time) % delay;
  }
  boss.actions.jobs = action;
}

function jobs_updateIncome(jobid) {
  if (!jobid) {
    boss.job_income = 0;
    Menu.update();
    return;
  }
  var jobratio = jobs_payRatio(jobid);
  var coeff;
  /* Energy per turn */
  switch (boss.type) {
    /* Turns of 60 minutes, energy 4 minutes */
    case 'Insomniac':
      coeff = 15;
      break;
    /* Turns of 54 minutes, energy 5 minutes */
    case 'Tycoon':
      coeff = 10.8;
      break;
    /* Turns of 60 minutes, energy 5 minutes */
    default:
      coeff = 12;
      break;
  }
  if (boss.job_income != Math.floor(coeff * jobratio)) {
    boss.job_income = Math.floor(coeff * jobratio);
    Menu.update();
  }
}

function jobs_canDoJob(job) {
  /* Check items */
  for (var item in job.req_items) {
    if (job.req_items[item] > inventory[item]) {
      GM_log("Not enough items for " + job.name + ": " + item + " missing");
      return false;
    }
  }
  /* Check mobsters */
  if (job.mobsters > boss.mobsters) {
    GM_log("Not enough mobsters for " + job.name);
    return false;
  }
  /* Check maximum energy */
  if (job.energy > boss.max_energy) {
    GM_log("Will never have enough energy for " + job.name);
    return false;
  }
  return true;
}

function jobs_needPrepJob(jobs, jobid) {
  for (var item in jobs[jobid].prep_items) {
    if (jobs[jobid].prep_items[item] > inventory[item]) {
      for (var id in jobs) {
        if (jobs[id].payout_items[item]) return id;
      }
    }
  }
  return 0;
}

function jobs_payRatio(jobid, jobs) {
  if (!jobs) jobs = new Joblist();
  var energy = jobs[jobid].energy + 0.0;
  for (var item in jobs[jobid].prep_items) {
    energy += jobs[jobid].prep_items[item] * itemlist[item].energy_per_unit;
  }
  energy = (jobs[jobid].payout_min + jobs[jobid].payout_max) / energy;
  return energy / 2;
}

function jobs_selectJob(jobs, exp) {
  var pay_ratio = 0;
  var exp_ratio = 0;
  var jobid = 0;
  var payed_job = 0;
  var tmpid;
  var energy;
  for (tmpid in jobs) {
    if (!jobs[tmpid].name) continue;
    var tmpexp_ratio = 0.0 + jobs[tmpid].exp / jobs[tmpid].energy;
    var tmppay_ratio = jobs_payRatio(tmpid, jobs);
    /* If this job is worse continue with the next */
    if (exp) {
      if ((tmpexp_ratio < exp_ratio) || (tmpexp_ratio == exp_ratio && tmppay_ratio < pay_ratio)) continue;
    } else {
       if ((tmppay_ratio < pay_ratio) || (tmppay_ratio == pay_ratio && tmpexp_ratio < exp_ratio)) continue;
    }
    /* Check if we can do this job */
    if (!jobs_canDoJob(jobs[tmpid])) continue;
    /* Do we need a prep job? */
    var prepid;
    if (prepid = jobs_needPrepJob(jobs, tmpid)) {
      /* Can we do the job? */
      if (!jobs_canDoJob(jobs[prepid])) continue;
      else jobid = prepid;
    } else jobid = tmpid;

    payed_job = tmpid;
    pay_ratio = tmppay_ratio;
    exp_ratio = tmpexp_ratio;
  }
  jobs_updateIncome(payed_job);
  return jobid;
}

function jobs_dojob(params, timer) {
    timer = timer || 5;
    /* We want to deposit the money into the bank */
    boss.next_pay = 0;
    var submit = Utils.getElementsByXPath('//input[@name="jobid" and @value="' + params[0] + '"]/../input[@type="submit"]');
    Timer.start(submit[0], "Doing " + params[1] + "...", timer);
}

function jobs_preferencesInterface(prefs) {
  if (boss.preferences.job == undefined) boss.preferences.job = 'none';
  var jobs = new Joblist();
  var div = document.createElement('div');
  div.innerHTML = '<label for="joblist">Job to perform: </label>';
  var select = document.createElement('select');
  var option;
  select.name = 'joblist';
  option = '<option value="none"';
  if (boss.preferences.job == 'none') option += ' selected="selected"';
  option += '>None</option><option value="payout"';
  if (boss.preferences.job == 'payout') option += ' selected="selected"';
  option += '>Best payout/energy</option><option value="exp"';
  if (boss.preferences.job == 'exp') option += ' selected="selected"';
  option += '>Best experience/energy</option>';
  select.innerHTML = option;
  for (var job in jobs) {
    if (jobs[job].name) {
      option = document.createElement('option');
      option.value = job;
      if (boss.preferences.job == option.value) option.selected = true;
      option.innerHTML = jobs[job].name;
      select.appendChild(option);
    }
  }
  div.appendChild(select);
  prefs.form.insertBefore(div, prefs.button);
}

function jobs_preferencesHandler(form, boss) {
  var jobid;
  var select = form.elements.namedItem('joblist');
  jobid = select.options[select.selectedIndex].value;
  if (jobid != boss.preferences.job) {
    delete boss.actions.jobs;
    boss.preferences.job = jobid;
    return true;
  }
  return false;
}
/* vim:set tw=80 sts=2 et ft=javascript: */






function bank_exec() {
  /* The multiplier compells you to put at least $10,000 the first time */
  var multiplier = 1;
  if (boss.next_pay == undefined) boss.next_pay = 0;
  if (boss.bank_cash == undefined) boss.bank_cash = 0;
  /* Value before update */
  var next_pay = boss.next_pay;
  switch (Page.c_page) {
    case 'bank':
      var balance = Utils.getElementsByClassName('myBalance')[0];
      if (balance) {
        var amount = balance.innerHTML.match(/\$([0-9,]+)/)[1];
        amount = amount.replace(/,/g, '');
        boss.bank_cash = parseInt(amount);
        Menu.update();
      }
      break;
    case 'city':
      var earnings = Utils.getElementsByClassName('earnings')[0];
      if (earnings) {
        var time = earnings.innerHTML.match(/Next paid in: (\d+) minute/)[1];
        boss.next_pay = Page.now + 60 * (parseInt(time) + 1);
      } else boss.next_pay = Page.now + 3600;
      break;
    case 'hospital':
      var header = document.getElementById('app8743457343_content');
      header = header.getElementsByTagName('span');
      if (header.length) {
        header = header[header.length - 1];
        header = header.innerHTML.replace(/[\$,]/g,'');
        header = parseInt(header);
        if (header) boss.bank_cash = header;
        Menu.update();
      }
      break;
    default:
      break;
  }

  if (!boss.bank_cash) multiplier = 10;
  if (!boss.preferences.bank_active) return;
  if (boss.actions.bank || boss.actions.bank_checkpay) return;
  if (next_pay < Page.now && boss.cash > 1000 * multiplier) {
    var action = new Object();
    action.message = "Going to the bank...";
    action.page = 'bank';
    action.func = 'bank_deposit';
    action.params = [];
    action.time = 0;
    boss.actions.bank = action;
  } else {
    var action = new Object();
    action.message = "Waiting for next payroll...";
    action.page = 'city';
    action.time = boss.next_pay;
    boss.actions.bank_checkdelay = action;
  }
}

function bank_deposit(params, timer) {
  var submit = Utils.getElementsByXPath('//input[@value="Deposit" or @value="Open Account"]')[0];
  var amount = submit.parentNode.elements.namedItem('deposit_amount');
  amount.value = boss.cash;
  Timer.start(submit, 'Depositing $' + boss.cash + ' into the bank...', 5);
}

function bank_preferencesInterface(prefs) {
  if (boss.preferences.bank_active == undefined) boss.preferences.bank_active = false;
  var value = boss.preferences.bank_active;
  var option = new Array();
  option.push('<label for="bank_active">Automatically deposit your money to the bank</label><br />');
  if (value) {
    option.push('Yes <input type="radio" name="bank_active" value="1" checked="checked"/>');
    option.push('No <input type="radio" name="bank_active" value="0"/>');
  } else {
    option.push('Yes <input type="radio" name="bank_active" value="1"/>');
    option.push('No <input type="radio" name="bank_active" value="0" checked="checked"/>');
  }
  var div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function bank_preferencesHandler(form, boss) {
  var input = form.elements.namedItem('bank_active');
  if (boss.preferences.bank_active != input.checked) {
    delete boss.actions.bank;
    delete boss.actions.bank_checkdelay;
    boss.preferences.bank_active = input.checked;
    return true;
  }
  return false;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function hospital_exec() {
  if (boss.heal_cost == undefined) boss.heal_cost = 0;
  /* If we cannot update the data it means there is not button and we can't
 * heal*/
  var can_heal = true;
  if (Page.c_page == 'hospital') {
    if (!hospital_updateData()) {
      delete boss.actions.hospital;
      can_heal = false;
    }
  }
  if (can_heal && boss.health * 100 < boss.max_health * boss.preferences.heal_limit && boss.bank_cash > boss.heal_cost) {
    var action = new Object();
    action.message = "Healing...";
    action.page = 'hospital';
    action.func = 'hospital_heal';
    action.params = [];
    action.time = 0;
    boss.actions.hospital = action;
  }
}

function hospital_updateData() {
  if (Page.c_page == 'hospital') {
    var el = Utils.getElementsByXPath('//input[@type="submit"]')[0];
    if (el) {
      el = el.value.replace(/,/g,'');
      el = parseInt(el.match(/\d+/)[0]);
      boss.heal_cost = el;
      return true;
    } else return false;
  }
}

function hospital_heal(params, timer) {
  var submit = Utils.getElementsByXPath('//input[@name="action" and @value="heal"]/../input[@type="submit"]')[0];
  if (submit) {
    Timer.start(submit, 'Healing for $' + boss.heal_cost + '...', 5);
  }
}

function hospital_preferencesInterface(prefs) {
  if (boss.preferences.heal_limit == undefined) boss.preferences.heal_limit = 0;
  if (boss.preferences.heal_limit >= 60) boss.preferences.heal_limit = 60;
  var value = boss.preferences.heal_limit;
  var option = new Array();
  option.push('<label for="heal_limit">Heal your boss when weaker than ');
  option.push('<input type="text" name="heal_limit" maxlength="3" size="3" ');
  option.push('value="' + value + '"/>');
  option.push('% of max health (0 to disable, 60% max)</label>');
  var div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function hospital_preferencesHandler(form, boss) {
  var input = form.elements.namedItem('heal_limit');
  input = parseInt(input.value);
  if (boss.preferences.heal_limit != input) {
    delete boss.actions.hospital;
    if (input >= 0 && input <= 100) {
      boss.preferences.heal_limit = input;
    }
    return true;
  }
  return false;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function datadisplay_exec() {
  switch (Page.c_page) {
    case 'city':
      datadisplay_ROR();
    case 'stockpile':
      var result = Utils.getElementsByXPath('//form[contains(@action,"do.php")]/select');
      for (var i = 0; i < result.length; i++) {
        var input = document.createElement('input');
        input.name = 'qty';
        input.type = 'text';
        input.setAttribute('maxlength', '3');
        input.setAttribute('size', '3');
        input.value = result[i].options[0].value;
        result[i].parentNode.insertBefore(input, result[i]);
        result[i].parentNode.removeChild(result[i]);
      }
      if (Page.c_page == 'city') break;
    case 'fight':
      if (!itemlist.item_14) break;
      var selection = datadisplay_getFightItems();
      var attack = datadisplay_getFightPower('attack', selection);
      var defense = datadisplay_getFightPower('defense', selection);
      var data = new Array();

      var header = document.getElementById('app8743457343_content');
      header = header.getElementsByTagName('h1')[0];
      header.innerHTML += '<br />';
      var span = document.createElement('span');
      span.className = 'earnings';
      data.push('(');
      data.push('Attack strength: ' + attack);
      data.push(', ');
      data.push('Defense strength: ' + defense);
      if (Page.c_page == 'stockpile') {
        var attack_up = datadisplay_getUpgrade(selection, 'attack');
        data.push('<br />');
        data.push('Best attack upgrade: ');
        switch (attack_up[0]) {
          case 0:
            data.push('N/A');
            break;
          case 1:
            data.push("1 " + itemlist[attack_up[1]].name + " at " + Math.floor(attack_up[2]) + "$/point");
            break;
          default:
            data.push(attack_up[0] + " " + itemlist[attack_up[1]].name + "s at " + Math.floor(attack_up[2]) + "$/point");
            break;
        }
        var defense_up = datadisplay_getUpgrade(selection, 'defense');
        data.push('<br />');
        data.push('Best defense upgrade: ');
        switch (defense_up[0]) {
          case 0:
            data.push('N/A');
            break;
          case 1:
            data.push("1 " + itemlist[defense_up[1]].name + " at " + Math.floor(defense_up[2]) + "$/point");
            break;
          default:
            data.push(defense_up[0] + " " + itemlist[defense_up[1]].name + "s at " + Math.floor(defense_up[2]) + "$/point");
            break;
        }
        var total_up = datadisplay_getUpgrade(selection, 'total');
        data.push('<br/>');
        data.push('Best attack/defense upgrade: ');
        switch (total_up[0]) {
          case 0:
            data.push('N/A');
            break;
          case 1:
            data.push("1 " + itemlist[total_up[1]].name + " at " + Math.floor(total_up[2]) + "$/point");
            break;
          default:
            data.push(total_up[0] + " " + itemlist[total_up[1]].name + "s at " + Math.floor(total_up[2]) + "$/point");
            break;
        }
        var str = datadisplay_getUnused(selection);
        if (str.length) {
          data.push('<br />');
          data.push('Unused items: ');
          data.push(str);
        }
      } else {
        var size = datadisplay_getMaxMobSize(attack);
        data.push(', ');
        data.push("Max mob size: " + size);
      }
      data.push(')');
      span.innerHTML = data.join('');
      header.appendChild(span);
    default:
      break;
  }
}

function datadisplay_getFightItems() {
  var items;
  var selection = new Object();
  var types = ['weapon', 'armor', 'vehicle'];

  for (var type = 0; type < types.length; type++) {
    var mobsters = boss.mobsters + 1;
    var items_left = true;
    items = new Object();
    for (var i in inventory) {
      if (!inventory[i] || !itemlist[i] || itemlist[i].type != 'stockpile' || itemlist[i].stocktype != types[type]) continue;
      if (!itemlist[i].attack && !itemlist[i].defense) continue;
      items[i] = inventory[i];
    }
    while (mobsters && items.toSource() != '({})') {
      var max_price = 0, item = undefined, best;
      /* Select the best equipment */
      for (item in items) {
        if (itemlist[item].price < max_price) continue;
        max_price = itemlist[item].price;
        best = item;
      }
      var qty = Math.min(mobsters, items[best]);
      selection[best] = qty;
      GM_log("Stockpile selection: " + qty + " " + itemlist[best].name );
      mobsters -= qty;
      delete items[best];
    }
  }
  return selection;
}

function datadisplay_getFightPower(str, selection) {
  var result = 0;
  if (str != 'attack' && str != 'defense') return;
  str == 'attack' ? result = boss.attack_strength * (boss.mobsters + 1): result = boss.defense_strength * (boss.mobsters + 1);
  var item;
  for (item in selection) {
    result += itemlist[item][str] * selection[item];
  }
  return result;
}

function datadisplay_getMaxMobSize(attack_strength) {
  var types = ['weapon', 'armor', 'vehicle'];
  var result = 1 + 3 * (boss.level - 1);
  GM_log("Max defense strength: " + result);
  for (var type = 0; type < types.length; type++) {
    var max_price = 0, max_defense = 0;
    for (var i in itemlist) {
        if (itemlist[i].type != 'stockpile' || itemlist[i].stocktype != types[type]) continue;
      /* Select the best equipment for price */
        if (itemlist[i].price > max_price && itemlist[i].defense != 0) {
          max_price = itemlist[i].price;
          max_defense = itemlist[i].defense;
        }
    }
    GM_log("Item with defense: " + max_defense);
    result += max_defense;
  }
  return Math.floor(attack_strength / result);
}

function datadisplay_ROR() {
  var income = boss.total_income + boss.job_income - boss.total_upkeep;
  for (var item in itemlist) {
    if (itemlist[item].type != 'city') continue;
    /* Dependencies */
    var depends = itemlist[item].depends;
    if (depends.length) {
      depends = itemlist[depends].price;
    } else {
      depends = 0;
    }
    var total_price = depends + Math.floor(itemlist[item].price * (10 + inventory[item]) / 10);
    var roi = Math.floor(100000 * itemlist[item].income / total_price);
    roi = roi / 1000;
    var td = Utils.getElementsByXPath('//a[@name="' + item + '"]/../../td[position() = 2]')[0];
    var str = '<br/>ROR: ' + roi;
    var len = str.length;
    while (len < 16) { str += '&nbsp;'; len++; }
    /* Inflaction */
    var inflaction = 100 * (11 + inventory[item]) / (10 + inventory[item]) - 100;
    var turns_inflaction = Math.ceil(inflaction / roi);
    /* Turns to purchase (without any money in the bank) */
    var turns_purchase = Math.ceil(total_price / income);
    var best_qty = 1;
    if (turns_purchase <= turns_inflaction) best_qty = 10;
    /* Buy by unit and we have enough money */
    if (best_qty == 1 && (boss.cash + boss.bank_cash) >= total_price) best_qty = Math.floor((boss.cash + boss.bank_cash) / total_price);
    /* Display best qty */
    var input = Utils.getElementsByXPath('..//select[@name="qty"]',td)[0];
    input.options[0].value = best_qty;
    /* Real turns to purchase */
    total_price = best_qty * Math.floor(itemlist[item].price * (10 + inventory[item]) / 10);
    if (itemlist[item].depends.length) {
    depends = itemlist[item].depends;
    var am;
    best_qty - inventory[depends] >= 0 ? am = best_qty - inventory[depends] : am = 0;
    total_price += am * itemlist[depends].price;
    }
    total_price -= boss.cash + boss.bank_cash;

    turns_purchase = Math.ceil(total_price / income);
    if (turns_purchase < 0) turns_purchase = 0;
    str += 'Turns left: ' + turns_purchase;
    var span = document.createElement('span');
    span.innerHTML = str;
    td.appendChild(span);
  }
}

function datadisplay_getUpgrade(selection, type) {
  if (type != 'attack' && type != 'defense' && type != 'total') throw new TypeError();
  var other;
  type == 'attack' ? other = 'defense': other = 'attack';
  var types = ['weapon', 'armor', 'vehicle'];
  var result = [0, 'item_14', Infinity];
  for (var i = 0; i < types.length; i++) {
    var left = boss.mobsters + 1;
    var power = Infinity, otherpower = Infinity, amount = 0, least;
    /* Select the least powerful weapon */
    for (var item in selection) {
      GM_log(item);
      if (!itemlist[item]) continue;
      if (itemlist[item].stocktype != types[i]) continue;
      left -= selection[item];
      if (type == 'total' && itemlist[item].attack + itemlist[item].defense < power) {
        power = itemlist[item].attack + itemlist[item].defense;
        amount = selection[item];
        least = item;
      } else if (itemlist[item][type] < power || itemlist[item][type] == power && itemlist[item][other] < otherpower) {
        power = itemlist[item][type];
        otherpower = itemlist[item][other];
        amount = selection[item];
        least = item;
      }
    }
    if (least) GM_log(type + ": Least powerful " + types[i] + " is " + itemlist[least].name);
    /* If there are mobsters that fight barehanded */
    if (left) {
      power = 0;
      amount = left;
      least = undefined;
    }
    /* Select best weapon */
    var best = undefined, ratio = Infinity;
    for (var item in itemlist) {
      if (itemlist[item].type != 'stockpile' || itemlist[item].stocktype != types[i]) continue;

      /* Look only for more expensive weapons */
      if (least && itemlist[item].price < itemlist[least].price) continue;

      var tmpratio;
      if (type == 'total') tmpratio = itemlist[item].attack + itemlist[item].defense - power;
      else tmpratio = itemlist[item][type] - power;
      if (tmpratio > 0) tmpratio = itemlist[item].price / tmpratio;
      else continue;
      if (tmpratio < ratio) {
        ratio = tmpratio;
        best = item;
      }
    }
    /* If we can not find a better weapon continue */
    if (!best) continue;
    GM_log(type + ": Selected " + types[i] + " " + itemlist[best].name + " with ratio " + ratio);
    /* If this weapon has a better ratio replace it */
    if (ratio < result[2]) {
      result[0] = amount;
      result[1] = best;
      result[2] = ratio;
    }
  }
  return result;
}

function datadisplay_getUnused(used) {
  var res = new Array();
  var amount;
  for (var item in itemlist) {
    if (itemlist[item].type != 'stockpile') continue;
    if (used[item] == undefined) used[item] = 0;
    if (amount = (inventory[item] - used[item])) {
      res.push(amount + " " + itemlist[item].name + (amount == 1? '': 's'));
    }
  }
  return res.join(', ');
}
/* vim:set tw=80 sts=2 et ft=javascript: */

/* Global variables */
var boss;
var itemlist;

(function() {
var chat = document.getElementsByTagName('iframe');
for (var i=0;i<chat.length;i++) chat[i].parentNode.removeChild(chat[i]);
var exception;

/* Create and update our boss and the stockpile */
try {
  boss = new Boss();
  itemlist = new Itemlist();
  boss.updateData();

/* Populate preferences*/
  Preferences.populate(this);
} catch(ex) { exception = ex;}

/* Init the menu */
try {
  Menu.init();
} catch(ex) {
  alert("Error while inserting the script's menu.\nLine: " + ex.lineNumber + ", error: " + ex.message);
}

if (exception) {
  var error = document.getElementById('scripterror');
  error.innerHTML = "Error in module 'base' on line " + exception.lineNumber + ": " + exception.message + "<br /><br />";
}

var captcha = Utils.getElementsByClassName('cap');
if (captcha.length) return;

for (var i = 0; i < modules.length; i++) {
  if (this[modules[i] + '_exec']) {
    try {
      now = Date.now();
      this[modules[i] + '_exec']();
      GM_log("*** MODULE " + modules[i] + " took " + (Date.now() - now) + " ms ***");
    } catch(ex) {
      var error = document.getElementById('scripterror');
      error.innerHTML = "Error in module '" + modules[i] + "' on line " + ex.lineNumber + ": " + ex.message + "<br /><br />";
    }
  }
}

var action = new Object();
var id;
action.time = Infinity;

/* Select an action */
var a = new Array();
for (var i in boss.actions) {
  a.push(i);
  if (boss.actions[i].time < action.time) {
    action = boss.actions[i];
    id = i;
  }
}

/* Remove action from queue */
if (!id) {
  boss.save();
  return;
}

var timer;
if (action.time < boss.jail_delay) action.time = boss.jail_delay;
action.time - Page.now > 5 ? timer = action.time - Page.now : timer = 5;

if (Page.c_page != action.page) {
  var url = 'http://apps.facebook.com/mobwars/' + action.page + '/';
  if (action.url_params) url += '?' + action.url_params;
  Timer.start(url, action.message, timer);
  if (!action.func) delete boss.actions[id];
} else if (action.func) {
  this[action.func](action.params, timer);
  delete boss.actions[id];
} else {
  /* Should never come here, unless there is a bug */
  var message;
  timer == 10 ? message = "Reloading page..." : message = action.message;
  var url = 'http://apps.facebook.com/mobwars/' + action.page + '/';
  if (action.url_params) url += '?' + action.url_params;
  Timer.start(url, action.message, timer);
  delete boss.actions[id];
}

boss.new_level = 0;
boss.save();
} ) ();
/* vim:set tw=80 sts=2 et ft=javascript: */

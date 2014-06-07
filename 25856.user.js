// ==UserScript==
// @name           Facebook Packrat Autoclicker
// @namespace      http://userscripts.org/users/49912
// @description    Clicks automatically on any credit found.
// @source         http://userscripts.org/scripts/show/25856
// @identifier     http://userscripts.org/scripts/source/25856.user.js
// @version        1.1.1
// @date           2008-10-05
// @creator        Piotr P. Karwasz
// @include        http://apps.facebook.com/packrat/*
// @include        http://apps.new.facebook.com/packrat/*
// ==/UserScript==
/* $Revision: 183 $ */
/*var try_again = document.getElementById('try_again_button');
if (try_again) {
	setTimeout(function(){try_again.click();},3000);
}*/
/* Update */
var version_timestamp = 1223237877000;
/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var version_scriptNum = 25856;
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);

/* Modules */
var modules = ['page', 'profile', 'card', 'preferences', 'menu',
'timer', 'credit', 'popup', 'collection',
'highlight', 'grinding', 'stalk', 'steal', 'browse'];



var Page = new Object();

Page.init = function() {
  /* Now */
  Page.now = Math.floor(new Date().getTime() / 1000);
  var url = location.href.split('#')[0];
  /* user */
  var div;
  div = document.getElementById('fb_menu_profile');
  div = div.getElementsByTagName('a')[0];
  Page.c_user = div.href.match(/id=([0-9]+)/)[1];
  /* Cut out the params */
  var params = url.split('?');
  if (params[1]) {
    url = params[0];
    params = params[1];
  } else params = undefined;
  var parts = url.split('/');
  /* type */
  Page.c_page = parts[4];
  /* Argument (like user id, etc.) */
  if (parts[5]) Page.c_arg = parts[5]; else Page.c_arg = '';
  /* params */
  Page.c_params = new Object();
  if (!params) return;
  parts = params.split('&');
  for (var i = 0; i < parts.length; i++) {
    var param = parts[i].split('=');
    Page.c_params[param[0]] = param[1];
  }
}

function page_exec() {
  Page.init();
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

function Profile() {
  this.credits = 0;
  this.level = 0;
  this.score = 0;
  this.user_id = '';
  this.pack = new Object();
  this.vault = new Object();
  this.complete_col = new Array();
  this.preferences = new Object();
  this.collections = new Object();
  this.limits = {popups:0, credits:0, last:Page.now};
  this.vars = new Object();
  var obj = eval(GM_getValue('profile', '({})'));
  for (var i in obj) {
    this[i] = obj[i];
  }
}

Profile.prototype = new Object();

Profile.prototype.save = function() {
  GM_setValue('profile', this.toSource());
}

Profile.prototype.updateData = function() {
  var header = document.getElementById('app2431403991_afire-scoreboard');
  /* Credits */
  var div = Utils.getElementsByClassName('credits', header)[0];
  div = div.innerHTML.replace(/,/g,'');
  this.credits = parseInt(div);
  /* Level */
  div = Utils.getElementsByClassName('level', header)[0];
  div = div.innerHTML;
  this.level = parseInt(div);
  /* Score */
  div = Utils.getElementsByClassName('score', header)[0];
  div = div.innerHTML.replace(/,/g,'');
  this.score = parseInt(div);
  switch (Page.c_page) {
    case '':
      profile.limits = {popups:0, credits:0, last:Page.now};
    case 'steal':
      if (Page.c_page == 'steal') {
        var notice = document.getElementById('app2431403991_notice-box');
        if (notice && notice.className.match(/failed/)) break;
      }
    case 'make':
    case 'vault_set':
      /* Delete old cards */
      for (var i in this.pack) {
        var front = document.getElementById('app2431403991_card_' + i + '_front')
        if (!front) delete this.pack[i];
      }
      /* Retrieve new cards */
      var id = Page.c_arg;
      for (var i = 0; i < pagecards.cards.length; i++) {
        var card = new Object();
        for (var j in pagecards.cards[i]) if (typeof pagecards.cards[i][j] != 'function') card[j] = pagecards.cards[i][j];
        delete card.wrapper;
        if (!card.id) continue;
        if (Page.c_page == 'steal') {
        /* Ignore the card we are stealing */
        if (card.id == id && !notice) continue;
        }
        this.pack[card.id] = card;
      }
      break;
    case 'purchase':
    case 'buy':
      var div = Utils.getElementsByClassName("notice-box successful")[0];
      if (div) {
        var item = Utils.getElementsByClassName("item", div)[0];
        var tmp, name;
        /* Name */
        try {
          tmp = item.getAttribute('style');
          tmp = tmp.match(/kinds\/([^_]+)(_medium)?(_[0-9a-f]+)?\.gif/);
          if (tmp) name = tmp[1];
        } catch(ex) {dump(ex);}
        if (name) {
          var id = 0;
          while(true) {
            if (!profile.pack[id]) {
              profile.pack[id] = new Card(0);
              profile.pack[id].name = name;
              break;
            }
            id++;
          }
        }
      }
      break;
    case 'vault':
      /* Get the user id */
      var link = Utils.getElementsByXPath('//div[@class="subnav"]/a[contains(@href,"vault")]')[0];
      if (link) {
        link = link.href.match(/vault\/(.*)$/);
        this.user_id = link[1];
      }
      if (Page.c_arg != '' && Page.c_arg != this.user_id) break;
      for (var i = 0; i < pagecards.cards.length; i++) {
        var card = pagecards.cards[i];
        if (!card.id) continue;
        if (!this.vault[card.collection]) this.vault[card.collection] = new Array();
        if (this.vault[card.collection].indexOf(card.name) == -1) {
          this.vault[card.collection].push(card.name);
        }
      }
      for (var i in collections) {
        if (!this.vault[i]) continue;
        if (this.vault[i].length == collections[i].size) {
          GM_log("We have " + this.vault[i].length + " out of " + collections[i].size + " from " + i + " collection.)");
          if (this.complete_col.indexOf(i) == -1) this.complete_col.push(i);
        }
      }
      GM_log("Completed collections: " + this.complete_col.join(", "));
      break;
    default:
      break;
  }
  /* Retrieve the card names in the pack */
  this.pack_ids = new Array();
  for (var i in this.pack) {
    if (this.pack_ids.indexOf(this.pack[i].name) == -1) this.pack_ids.push(this.pack[i].name);
  }
  this.save();
}

var profile;

function profile_exec() {
  profile = new Profile();
}

function profile_postexec() {
  profile.updateData();
}
/* vim:set tw=80 sts=2 et ft=javascript: */



function Card(id) {
  this.id = id;
  this.name = 'unknown';
  this.collection = 'unknown';
  this.points = 0;
}

Card.prototype = new Object();

Card.prototype.steal = function(dropcard, droppable, priority) {
  if (priority == undefined) priority = 5;
  if (!this.steal_id || dropcard.locked) return;
  if (profile.vars.card_steal == undefined) profile.vars.card_steal = new Array();

  /* If this card is droppable and droppable is set, also the stolen card
 * will be droppable */
  if (profile.preferences.collection_droppable.indexOf(dropcard.id) != -1 && droppable) profile.preferences.collection_droppable.push(this.id);
  var entry = new Object();
  entry.steal = this.id;
  entry.drop = dropcard.id;
  profile.vars.card_steal.push(entry);
  var action = new Timer();
  action.priority = priority;
  action.type = 'gotourl';
  try {
    action.message = "Stealing " + collections[this.collection].cards[this.name].name + "...";
  } catch(ex) {
    action.message = "Stealing " + this.name + "...";
  }
  action.url = 'http://apps.facebook.com/packrat/steal/' + this.steal_id;
  action.append();
}

Card.prototype.buy = function() {
  if (!this.purchase) return;
  /* Purge the list of recent acquisitions */
  for (var i in profile.vars.card_recent) {
    if (Page.now - profile.vars.card_recent[i] > 86400)
      delete profile.vars.card_recent[i];
  }
  if (!collections[this.collection] || collections[this.collection].new) {
    if (profile.vars.card_recent[this.name]) {
      if(!confirm("Would you like to purchase the recent card " + collection_cardName(this.name) + " from collection " + (collections[this.collection] ? collections[this.collection].name : this.collection) + "? Automatic buying is limited to one card of each kind every 24 hours for this collection.")) return;
    }
  }
  if (profile.preferences.collection_shoplist[this.name])
    profile.preferences.collection_shoplist[this.name]--;
  var action = new Timer();
  action.priority = 5;
  action.type = 'gotourl';
  try {
    action.message = "Buying " + collections[this.collection].cards[this.name].name + "...";
  } catch(ex) {
    action.message = "Buying " + this.name + "...";
  }
  action.url = this.purchase;
  profile.vars.card_recent[this.name] = Page.now;
  action.append();
}

function CardCollection() {
  this.cards = new Array();
  if (Page.c_page == 'friends' || Page.c_page == 'feats') return;
  var divs = Utils.getElementsByClassName('card-wrapper');
  for (var i = 0; i < divs.length; i++) {
    var front = Utils.getElementsByClassName('front', divs[i])[0];
    if (!front) continue;
    var id = front.id.match(/app2431403991_card_([^_]+)_front/);
    if (id) id = id[1];
    var card = new Card(id);
    var tmp;
    /* Name */
    try {
      tmp = Utils.getElementsByClassName('item', front)[0];
      tmp = tmp.getAttribute('style');
      tmp = tmp.match(/kinds\/([^_]+)(_medium)?(_[0-9a-f]+)?\.gif/);
      if (tmp) card.name = tmp[1];
    } catch(ex) {dump(ex);}
    /* Collection */
    try {
      tmp = Utils.getElementsByClassName('collection-icon', front)[0];
      if (!tmp) tmp = Utils.getElementsByClassName('collection-badge', front)[0];
      tmp = tmp.getAttribute('src');
      tmp = tmp.match(/families\/([^_]+)_family_small\.gif/);
      if (tmp) card.collection = tmp[1];
    } catch(ex) {dump(ex);}
    try {
      if (card.name != 'silhouette' && (!collections[card.collection] || !collections[card.collection].cards[card.name])) {
      var mis = eval(GM_getValue('missing', '([])'));
      if (mis.indexOf(card.collection + "/" + card.name) == -1) mis.push(card.collection + "/" + card.name);
      GM_setValue('missing', mis.toSource());
      GM_log("Unknown card from collection " + card.collection + ": " + card.name);
      }
    } catch(ex) {dump(ex);}
    /* Points */
    try {
      tmp = Utils.getElementsByClassName('points', front)[0];
      if (tmp) card.points = parseInt(tmp.innerHTML);
    } catch(ex) {dump(ex);}
    /* Locked? */
    tmp = Utils.getElementsByClassName('lock', divs[i]);
    if (tmp.length) card.locked = true;
    else card.locked = false;
    /* Action */
    try {
      var slot = Utils.getElementsByXPath('.//a', divs[i])[0];
      if (slot) switch(Page.c_page) {
        case 'user':
          slot = slot.href.match(/\/steal\/(.*)/);
          if (slot) card.steal_id = slot[1];
          break;
        case 'market':
        case 'purchase':
        case 'buy':
          slot = slot.getAttribute('onclick');
          slot = slot.match(/buyNow\('([^']*)'/);
          card.purchase = '/packrat/purchase/' + slot[1];
          break;
        default:
          break;
      };
    } catch(ex) {dump(ex);}
    card.wrapper = divs[i];
    this.cards.push(card);
  }
}

function card_showUnknown() {
  var str = new Array();
  var missing = eval(GM_getValue('missing', '[]'));
  if (!missing.length) {
    str.push("No unknown cards were met since the last database update.");
  } else {
    str.push("The following cards does not have an entry in the database");
    str.push("(collection/slug pairs):");
    str.push("");
    for (var i = 0; i < missing.length; i++)
      str.push(missing[i]);
    str.push("");
    str.push("If they are new cards don't worry: the database will be updated");
    str.push("as soon as possible. However if the name of the card is misspelled");
    str.push("or follows a non standard name to slug convertion, please report it on");
    str.push("http://karwasz.org/blog/category/science/technology/greasemonkey/packrat/");
    str.push("");
    str.push("The standard name to slug convertion is: put everything lowercase,");
    str.push("replace spaces with hyphens and delete all non-alphanumeric characters.");
    str.push("E.g. 'Bee's Queen' converts to 'bees-queen'");
  }
  alert(str.join("\n"));
}

GM_registerMenuCommand("Show unknown cards", card_showUnknown);

function CollectionData() {
  obj = eval(GM_getValue('collections', '({})'));
  for (var i in obj) {
    this[i] = obj[i];
  }
}

CollectionData.prototype = new Object();

CollectionData.prototype.save = function() {
  GM_setValue('collections', this.toSource());
}

var pagecards;
var collections;
function card_exec() {
  if (profile.vars.card_recent == undefined) profile.vars.card_recent = new Object();
  collections = new CollectionData();
  pagecards = new CardCollection();
  profile_postexec();
  if (Page.c_page == 'steal') {
    card_steal();
  }
}

function card_steal() {
  /* Stop if we have a message box */
  var notice;
  if (notice = document.getElementById('app2431403991_notice-box')) {
    if (notice.className.match("successful")) {
      try {
        var item = Utils.getElementsByClassName("item", notice)[0];
        item = item.getAttribute('style');
        item = item.match(/kinds\/([^_]+)(_medium)?(_[0-9a-f]+)?\.gif/)[1];
        if (profile.preferences.collection_shoplist[item])
          profile.preferences.collection_shoplist[item]--;
      } catch(ex) {alert(ex);}
    }
    return;
  }
  /* Retrieve the data */
  var idx, dropid = 0;
  for (idx = 0; idx < profile.vars.card_steal.length; idx++) {
    if (profile.vars.card_steal[idx].steal == Page.c_arg) {
      dropid = profile.vars.card_steal[idx].drop;
      break;
    }
  }
  /* Manual steal */
  if (!dropid) return;
  /* Selecting the card */
  var drop;
  for (var i = 0; i < pagecards.cards.length; i++) {
    if (pagecards.cards[i].id == dropid) drop = pagecards.cards[i];
  }
  /* Click on the selected card */
  if (drop) {
    var action = new Timer();
    action.priority = 0;
    action.message = 'Selecting card to drop...';
    action.target = drop.wrapper;
    var evt = document.createEvent('MouseEvent');
    evt.initEvent('click', true, true);
    action.event = evt;
    action.append();

    /* Click on the submit button */
    action = new Timer();
    action.priority = 5;
    action.message = 'Stealing the card...';
    var button = document.getElementById('app2431403991_submit_steal');
    action.target = button;
    evt = document.createEvent('MouseEvent');
    evt.initEvent('click', true, true);
    action.event = evt;
    action.append();
  } else {
    var action = new Timer();
    action.priority = 5;
    action.message = 'Drop card missing from pack, going back...';
    action.type = 'gotourl';
    action.url = 'http://apps.facebook.com/packrat/friends';
    action.append();
  }
  profile.vars.card_steal = new Array();
}
/* vim:set tw=80 sts=2 et ft=javascript: */



Preferences = new Object();

Preferences.init = function() {
  /* The handlers for preferences */
  this.handlers = new Array();
  this.interface = new Array();
  this.div = document.createElement('div');
  this.div.className = 'facebook-gm-pref';
  var css = ".facebook-gm-pref {display: none; position: absolute; z-index: 99; left: 200px; top: 200px; overflow: visible; background-color: white; border: 1px solid black; padding: 10px; min-width: 400px; min-height: 400px}";
  GM_addStyle(css);
  document.getElementsByTagName('body')[0].appendChild(this.div);
}

Preferences.populate = function(obj) {
  /* Preferences display */
  for (var i = 0; i < modules.length; i++) {
    if (obj[modules[i] + '_preferencesInterface']) this.interface.push(obj[modules[i] + '_preferencesInterface']);
  }
  /* Preferences handlers */
  for (var i = 0; i < modules.length; i++) {
    if (obj[modules[i] + '_preferencesHandler']) this.handlers.push(obj[modules[i] + '_preferencesHandler']);
  }
}

Preferences.eventListener = function() {
  var prefs = this;
  return function(ev) {
    /* Add module specific content */
    var reload = false;
    var prof = eval(GM_getValue('profile', '({})'));
    /* Prevent submitting the form to the server */
    ev.preventDefault();
    /* Execute all handlers */
    var exept = new Array();
    for (var i = 0; i < prefs.handlers.length; i++) {
      try {
        if (prefs.handlers[i](prefs.form, prof)) reload = true;
      } catch(ex) {exept.push(ex)}
    }
    if (exept.length) {
      var error = document.getElementById('scripterror');
      error += exept.join('<br/>') + '<br/>';
    }
    prefs.div.style.display = 'none';
    GM_setValue('profile', prof.toSource());
    if (reload) location.reload();
  }
}

Preferences.show = function() {
  var prefs = this;
  return function(ev) {
    /* Setting title */
    prefs.div.innerHTML = '<h2>Script Preferences</h2>';

    /* Rule */
    prefs.rule = document.createElement('hr');
    prefs.rule.id = 'facebook-gm-rule';
    prefs.div.appendChild(prefs.rule);

    /* Building form */
    prefs.form = document.createElement('form');
    prefs.form.action = '';
    prefs.form.method = '';
    prefs.form.id = 'facebook-gm-pref';
    prefs.div.appendChild(prefs.form);

    /* Submit button */
    prefs.button = document.createElement('button');
    prefs.button.type = 'button';
    prefs.button.id = 'pref_submit';
    prefs.button.innerHTML = "Update preferences";
    prefs.form.appendChild(prefs.button);

    /* Add event listener */
    prefs.button.addEventListener('click', prefs.eventListener(), true);
    prefs.form.addEventListener('submit', prefs.eventListener(), true);

    var prof = eval(GM_getValue('profile', '({})'));
    /* Prevent submitting the form to the server */
    ev.preventDefault();
    /* Execute all handlers */
    var exept = new Array();
    for (var i = 0; i < prefs.handlers.length; i++) {
      try {
        prefs.interface[i](prefs, prof);
      } catch(ex) {exept.push(ex)}
    }
    if (exept.length) {
      var error = document.getElementById('scripterror');
      error.innerHTML += exept.join('<br/>') + '<br/>';
    }
    prefs.div.style.display = 'block';
    prefs.div.scrollIntoView(false);
    GM_setValue('profile', prof.toSource());
  }
}

Preferences.addToggleBox = function(message, id, value) {
  var option = new Array();
  option.push('<label for="' + id + '">' + message + ":&nbsp;</label>");
  if (value) {
    option.push('Yes <input type="radio" value="true" checked="checked" name="' + id + '"/>');
    option.push('&nbsp;No <input type="radio" value="false" name="' + id + '"/>');
  } else {
    option.push('Yes <input type="radio" value="true" name="' + id + '"/>');
    option.push('&nbsp;No <input type="radio" value="false" checked="checked" name="' + id + '"/>');
  }
  return option.join("\n");
};

function preferences_exec() {
  Preferences.init();
  Preferences.populate(this);
}
/* vim:set tw=80 sts=2 et ft=javascript: */



var Menu = new Object();

Menu.init = function() {
  var menuCode = new Array();
  menuCode.push('<div class="scriptStatusHeader">-Script status-</div>');
  menuCode.push('<div class="scriptStatusContent"><span id="scripterror"></span><a id="scriptresume"></a>Status:<br /><span id="scriptstatus">Resting...</span><br /><span id="scripttimer"></span></div><hr/>');
  menuCode.push('<div class="scriptStatusContent"><p>Notes:</p><ul id="scriptnotes"></ul></div><hr/>');
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
  catch(e) {dump(ex);}
  document.body.insertBefore(menu, document.body.lastChild);

  var button = document.getElementById('prefs_button');
  button.addEventListener('click', Preferences.show(), true);
}

function menu_exec() {
  Menu.init();
}
/* vim:set tw=80 sts=2 et ft=javascript: */




function Timer(min, max) {
  if (min == undefined) min = profile.preferences.timer_min;
  if (max == undefined) max = profile.preferences.timer_max;
  this.priority = 10;
  /* Possible values 'sendevent', 'submitform', 'gotourl' */
  this.type = 'sendevent';
  this.delay = min + Math.floor((max - min) * Math.random());
  this.message = 'Resting...';
}

Timer.queue = new Array();
Timer._delay = 0;
Timer.prototype = new Object();

Timer.prototype.append = function() {
  var types = ['sendevent', 'submitform', 'gotourl'];
  if (types.indexOf(this.type) == -1) throw new TypeError;
  /* Push the timeout on the queue */
  Timer.queue.push(this);
}

Timer.start = function(obj) {
  obj = obj || this;
  var action;
  /* Exit if we have nothing to do */
  if (!obj.queue.length) return;
  idx = 0;
  var priority = obj.queue[0].priority;
  var action = obj.queue[0];
  var delay = Infinity;
  /* Select the action */
  for (i = 1; i < obj.queue.length; i++) {
    if (obj.queue[i].priority < priority ||
        (obj.queue[i].priority == priority && obj.queue[i].delay < delay)) {
        priority = obj.queue[i].priority;
        delay = obj.queue[i].delay;
        action = obj.queue[i];
        idx = i;
    }
  }
  action.delay -= obj._delay;
  /* Message */
  var span = document.getElementById('scriptstatus');
  span.innerHTML = action.message;
  /* Delay */
  span = document.getElementById('scripttimer');
  var sec = Math.ceil(action.delay / 1000);
  if (sec) {
    var str = (sec % 60) + ' s';
    sec = Math.floor(sec / 60);
    if (sec) {
      str = (sec % 60) + ' m ' + str;
      sec = Math.floor(sec / 60);
      if (sec) str = sec + ' h ' + str;
    }
    span.innerHTML = 'in ' + str;
  } else span.innerHTML = '';

  if (action.delay <= 0) switch(action.type) {
    case 'sendevent':
      obj.queue.splice(idx, 1);
      action.target.dispatchEvent(action.event);
      break;
    case 'gotourl':
      /* Other events are ignored */
     location.href = action.url;
      obj.queue = new Array();
      break;
    case 'submitform':
      obj.queue = new Array();
      action.form.submit();
      break;
    default:
      alert("Unknown action type: " + action.type);
      break;
  };
  obj._delay = Math.min(action.delay, 500);
  /* Execute us again if we have other actions */
  if (obj.queue.length) obj.timer = setTimeout(obj.start, obj._delay, obj);
}

function timer_preferencesInterface(prefs) {
  var option = new Array();
  var value = profile.preferences.timer_min;
  option.push('<h2>Timer preferences</h2><br/>');
  option.push('<label>Delay actions from <input type="text" name="timer_min" maxlength="5" size="5" value="' + value + '"/> ms</label> <label>to ');
  value = profile.preferences.timer_max;
  option.push('<input type="text" name="timer_max" maxlength="5" size="5" value="' + value + '"/> ms (minimum 3s).</label>');
  var div = document.createElement('div');
  div.innerHTML = option.join("\n");
  prefs.form.insertBefore(div, prefs.button);
}

function timer_exec() {
  if (profile.preferences.timer_min == undefined) profile.preferences.timer_min = 3000;
  if (profile.preferences.timer_max == undefined) profile.preferences.timer_max = 4000;
}

function timer_preferencesHandler(form, profile) {
  var ret = false;
  var prefs = profile.preferences;
  var input = form.elements.namedItem('timer_min');
  input = parseInt(input.value);
  if (input < 3000) input = 3000
  if (prefs.timer_min != input) {
    prefs.timer_min = input;
    ret = true;
  }

  input = form.elements.namedItem('timer_max');
  input = parseInt(input.value);
  if (input < 4000) input = 4000;
  if (prefs.timer_max != input) {
    prefs.timer_max = input;
    ret = true;
  }

  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */

var CREDIT_MAX = 1000;

function credit_exec() {
  if (profile.vars.browse_module == undefined) profile.vars.browse_module = new Array();
  if (profile.preferences.credit_enabled == undefined) profile.preferences.credit_enabled = true;
  if (profile.vars.credit_amount == undefined) profile.vars.credit_amount = 0;
  if (profile.preferences.credit_enabled) {
    if (!profile.vars.credit_amount) {
      var idx = profile.vars.browse_module.indexOf('credit');
      if (idx + 1) profile.vars.browse_module.splice(idx, 1);
    }
    var credit = Utils.getElementsByClassName('free-credits-amount');
    for (var i = 0; i < credit.length; i++) {
      profile.vars.credit_amount -= parseInt(credit[i].innerHTML);
      profile.limits.credits += parseInt(credit[i].innerHTML);
      var timer = new Timer();
      timer.message = "Collecting credits";
      timer.priority = -1;
      timer.target = credit[i].parentNode;
      var evt = document.createEvent('MouseEvent');
      evt.initEvent('mousedown', true, true);
      timer.event = evt;
      timer.append();
    }
  }
}

function credit_preferencesInterface(prefs, profile) {
  var value = profile.preferences.credit_enabled;
  var option = new Array();
  option.push('<h2>Free credits</h2><hr/>');
  option.push('<label for="credit_enabled">Collect credits automatically:</label>');
  if (value) {
    option.push('Yes <input type="radio" name="credit_enabled" value="1" checked="checked"/>');
    option.push('No <input type="radio" name="credit_enabled" value="0"/>');
  } else {
    option.push('Yes <input type="radio" name="credit_enabled" value="1"/>');
    option.push('No <input type="radio" name="credit_enabled" value="0" checked="checked"/>');
  }
  var div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
  option = new Array();
  option.push('<label for="credit_amount">Gather <input name="credit_amount" type="text" size="4" maxlength="4" ');
  if (profile.vars.credit_amount < 0) profile.vars.credit_amount = 0;
  option.push('value="' + profile.vars.credit_amount + '"/> credits.</label>');
  option.push('<br/>');
  div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function credit_preferencesHandler(form, profile) {
  var ret = false;
  var input = form.elements.namedItem('credit_enabled');
  if (profile.preferences.credit_enabled != input.checked) {
    profile.preferences.credit_enabled = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('credit_amount');
  input = parseInt(input.value);
  if (profile.vars.credit_amount != input) {
    profile.vars.credit_amount = input;
    ret = true;
  }
  var idx;
  if (profile.preferences.credit_enabled) {
    if (profile.vars.credit_amount
         && (idx = profile.vars.browse_module.indexOf('credit')) == -1) {
      profile.vars.browse_module.push('credit');
    } else if (!profile.vars.credit_amount
                && (idx = profile.vars.browse_module.indexOf('credit')) != -1) {
      profile.vars.browse_module.splice(idx, 1);
    }
  } else if ((idx = profile.vars.browse_module.indexOf('credit')) != -1) {
    profile.vars.browse_module.splice(idx, 1);
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function popup_exec() {
  if (profile.preferences.popup_behaviour == undefined) profile.preferences.popup_behaviour = 'pause';
  var elms = Utils.getElementsByClassName('grab-item');
  var pause = browse_pause(false);

  for (var i = 0; i < elms.length; i++) {
    profile.limits.popups++;
    /* Just the name and colletion of the card */
    /* Collection */
    var col = Utils.getElementsByClassName('collection-badge', elms[i])[0];
    if (!col) col = Utils.getElementsByClassName('collection-icon', elms[i])[0];
    col = col.getAttribute('src');
    col = col.match(/families\/([^_]+)_family_small\.gif/);
    col = col[1];
    /* Name */
    var name = Utils.getElementsByClassName('item', elms[i])[0];
    name = name.getAttribute('style');
    name = name.match(/kinds\/([^_]+)(_medium)?(_[0-9a-f]+)?\.gif/);
    name = name[1];
    try {
      var stat = eval(GM_getValue('popstat', '({})'));
      if (stat[col + "/" + name] == undefined) stat[col + "/" + name] = 0;
      stat[col + "/" + name]++;
      GM_setValue('popstat', stat.toSource());
    } catch(ex) {GM_log(ex);}
    /* Action */
    var ac = Utils.getElementsByXPath('.//div[@class="action"]//a', elms[i])[0];

    switch (profile.preferences.popup_behaviour) {
      case 'ignore':
        return;
      case 'pause':
        pause();
        return;
      case 'shop':
        if (!collection_isInShoppingList(col, name)) return;
        break;
      default:
        break;
    }
    var action = new Timer();
    action.message = "Collecting popup...";
    action.priority = -1;
    action.target = ac;
    var evt = document.createEvent('MouseEvent');
    evt.initEvent('mousedown', true, true);
    action.event = evt;
    action.append();
    if (profile.preferences.collection_shoplist[name])
      profile.preferences.collection_shoplist[name]--;
  }
}

function popup_showStats() {
  var popstat = eval(GM_getValue('popstat', '({})'));
  var str = new Array();
  str.push("Since the last database update we encountered the following pop-ups:");
  for (var i in popstat) {
    str.push(popstat[i] + " " + collection_cardName(i));
  }
  alert(str.join("\n"));
}

GM_registerMenuCommand("Show pop-up statistics", popup_showStats);

function popup_preferencesInterface(prefs, profile) {
  var value = profile.preferences.popup_behaviour;
  var option = new Array();
  option.push('<h2>Popups</h2><hr/>');
  option.push('<label for="popup_behaviour">Pop-up pick-up behaviour:</label><br/>');
  var types = {pause:'Pause browsing cycle', ignore:'Ignore all', shop:'Current shopping list', all:'Pickup all'};
  for (var i in types) {
    option.push('<input type="radio" name="popup_behaviour" ');
    option.push('value="' + i + '"');
    if (value == i) option.push(' checked="checked"');
    option.push('>' + types[i] + '</input>');
  }
  option.push('<br/>');
  var div = document.createElement('div');
  div.innerHTML = option.join('');
  prefs.form.insertBefore(div, prefs.button);
}

function popup_preferencesHandler(form, profile) {
  var value = profile.preferences.popup_behaviour;
  for (var i = 0; i < form.elements.length; i++) {
    var el = form.elements[i];
    if (el.name != 'popup_behaviour') continue;
    if (el.checked) break;
  }

  if (el.value != value) {
    profile.preferences.popup_behaviour = el.value;
    return true;
  } else return false;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function collection_exec() {
  if (profile.preferences.collection_work == undefined) profile.preferences.collection_work = new Array();
  if (profile.preferences.collection_shoplist == undefined) profile.preferences.collection_shoplist = new Array();
  if (profile.vars.collection_missing == undefined) profile.vars.collection_missing = new Object();
  if (profile.preferences.collection_type == undefined) profile.preferences.collection_type = 'automatic';
  if (profile.preferences.collection_droppable == undefined) profile.preferences.collection_droppable = new Array();
  if (profile.vars.collection_check == undefined) profile.vars.collection_check = 0;
  if (profile.vars.collection_vault == undefined) profile.vars.collection_vault = 0;
  if (profile.preferences.collection_unknowncol == undefined) profile.preferences.collection_unknowncol = false;
  if (profile.preferences.collection_unknowncard == undefined) profile.preferences.collection_unknowncard = false;
  collection_missingList();
  /* Updating the collection data */
  if (profile.vars.collection_check < Page.now) {
    collection_updateData();
    profile.vars.collection_check = Page.now + 24 * 3600;
  }
  /* Checking vaulted cards */
  if (Page.c_page == 'vault' && Page.c_arg == '') {
    var div = Utils.getElementsByXPath('//ul[@class="paging"]//a');
    div = div[div.length-1];
    if (div.innerHTML != 'Next') profile.vars.collection_vault = Page.now + 86400;
  }
  /* Check the vault */
  if (profile.vars.collection_vault < Page.now) {
    var action = new Timer();
    action.priority = 0;
    action.message = 'Checking vaulted cards...';
    action.type = 'gotourl';
    if (Page.c_page == 'vault' && Page.c_arg == '') {
      var div = Utils.getElementsByXPath('//ul[@class="paging"]//a');
      div = div[div.length-1];
      action.url = div.href;
    } else {
      action.url = 'http://apps.facebook.com/packrat/vault';
    }
    action.append();
    return;
  }
  /* Check vaulted sets */
  if (Page.c_page == 'vault_set') {
    var anchor = Utils.getElementsByXPath('//a[contains(@href,"collection=")]')[0];
    if (anchor) {
      var action = new Timer();
      action.priority = 0;
      action.message = 'Checking ' + anchor.innerHTML;
      action.type = 'gotourl';
      action.url = anchor.href;
      action.append();
    }
  }
}

function collection_updateData(manual) {
  try {
    GM_xmlhttpRequest({method:"GET",
                       url:"http://karwasz.org/piotr/data/collections.data.js",
                       headers:{'Cache-Control':'no-cache'},
                       onload:function(xhr) {
                         var collections = eval(xhr.responseText);
                         GM_setValue('collections', collections.toSource());
                         GM_setValue('missing', '[]');
                         GM_setValue('popstat', '({})');
                         }
    });
    GM_log("Collection database updated");
    if (manual) alert("Collection database updated.");
  } catch(ex) {
    alert("Error during update of collection database.");
    dump(ex);
  }
}

GM_registerMenuCommand("Update collections database",function(){collection_updateData(true);});

function collection_missingList() {
  var col_work = profile.preferences.collection_work;
  var missing = new Object();
  var markets = new Array();
  var pack = collection_packContents();
  for (var i = 0; i < col_work.length; i++) {
    var colmissing = new Object();
    var col = col_work[i];
    for (var name in collections[col].cards) {
      /* We don't have this card */
      if (!profile.vault[col] || profile.vault[col].indexOf(name) == -1) {
        GM_log("We don't have " + collections[col].cards[name].name);
        var result = collection_baseElements(col, name, pack);
        for (var j in result) {
          if (!missing[j]) missing[j] = 0;
          missing[j] += result[j];
          colmissing[j] = missing[j];
        }
      }
    }
  }

  profile.vars.collection_missing = missing;
  GM_log(missing.toSource());
}

function collection_packContents() {
  var result = new Object();
  for (var i in profile.pack) {
    if (!profile.pack[i].name) continue;
    var id = profile.pack[i].name
    if (!result[id]) result[id] = 0;
    result[id]++;
  }
  return result;
}

function collection_baseElements(col, name, pack) {
  var result = new Object();
  /* If we have this card return a void object */
  if (pack[name]) {
    pack[name]--;
    if (pack[name] <= 0) delete pack[name];
    return result;
  }

  var make;
  if (!collections[col] || !collections[col].cards[name]) {
    GM_log(col + "/" + name + " is unknown.");
    return result;
  }
  if (make = collections[col].cards[name].make) {
    var have_ingredients = true;
    for (var i = 0; i < 3; i++) {
      var tmp = collection_baseElements(col, make[i], pack);
      if (tmp.toSource() != '({})') have_ingredients = false;
      for (var j in tmp) {
        if (!result[j]) result[j] = 0;
        result[j] += tmp[j];
      }
    }
    if (!have_ingredients) {
      if (!result[name]) result[name] = 0;
      result[name]++;
    }
  } else {
    if (!result[name]) result[name] = 0;
    result[name]++;
  }
  return result;
}

function collection_cardName(slug) {
  var name = slug;
  for each (col in collections) {
    if (col.cards[slug]) {
      name = col.cards[slug].name;
      break;
    }
  }
  return name;
}

function collection_shoppingList() {
  var msg = new Array();
  var str;
  var col_missing = profile.vars.collection_missing;
  for (var i in col_missing) {
    if (col_missing[i] > 1) {
      msg.push(col_missing[i] + '&nbsp;' + collection_cardName(i).replace(/ /g,'&nbsp;'));
      str = msg[msg.length - 1];
      if (str.charAt(str.length - 1) != 's') msg[msg.length - 1] += 's';
    } else {
      msg.push('1&nbsp;' + collection_cardName(i));
    }
  }
  return msg.join(', ');
}

function collection_toggleCardList(slug) {
  return function() {
    var checkbox = document.getElementById('collection-col_' + slug);
    var div = document.getElementById('collection-div_' + slug);
    if (checkbox.checked) {
      div.style.display = 'block';
    } else div.style.display = 'none';
  }
}

function collection_isInShoppingList(col, name) {
  if (!collections[col]) return profile.preferences.collection_unknowncol;
  if (profile.preferences.collection_work.indexOf(col) != -1 && !collections[col].cards[name]) return profile.preferences.collection_unknowncard;
  switch (profile.preferences.collection_type) {
    case "all":
      return profile.preferences.collection_work.indexOf(col) != -1;
    case "automatic":
      return profile.vars.collection_missing[name] > 0;
    case "personal":
      return profile.preferences.collection_shoplist[name] > 0;
    default:
      return false;
  }
}

function collection_isDroppable(card) {
  return profile.preferences.collection_droppable.indexOf(card.id) != -1;
}

function collection_preferencesInterface(prefs, profile) {
  var collections = eval(GM_getValue('collections', '({})'));
  var option = new Array();
  option.push('<h2>Collections</h2><hr/>');
  option.push('<label>Collections you are working on:</label><br/>');
  option.push('<table>');
  var count = 0;
  for (var i in collections) {
    if (!collections[i].name) continue;
    if ((count % 4) == 0) option.push('<tr>');
    option.push('<td><input type="checkbox" name="collection-col_' + i + '" id="collection-col_' + i + '"');
    if (profile.preferences.collection_work.indexOf(i) != -1) {
      option.push(' checked="checked"/>');
    } else option.push('/>');
    option.push('<img style="width: 20px; height: 20px;" src="http://s3.amazonaws.com/afire-packrat/families/' + i + '_family_small.gif"/>');
    option.push(collections[i].name);
    option.push('</td>');
    count++;
    if ((count % 4) == 0) option.push('</tr>');
  }
  if (count % 4) option.push('</tr>');
  option.push('</table>');
  option.push('<label>Personalized shopping list:</label><br/>');
  for (var i in collections) {
    if (!collections[i].name) continue;
    option.push('<div id="collection-div_' + i + '">');
    option.push('<em>' + collections[i].name + ':</em>');
    option.push('<table>');
    count = 0;
    var working = profile.preferences.collection_work.indexOf(i) != -1;
    for (var j in collections[i].cards) {
      if ((count % 6) == 0) option.push('<tr>');
      option.push('<td><input type="text" size="1" maxlength="1" name="collection-card_' + j + '" id="collection-card_' + j + '"');
      var value;
      if (!working || !((value = profile.preferences.collection_shoplist[j]) > 0)) value = 0;
      option.push(' value="' + value + '"/>&nbsp;');
      option.push(collections[i].cards[j].name.replace(/ /,'&nbsp;') + '</td>');
      count++;
      if ((count % 6) == 0) option.push('</tr>');
    }
    if (count % 6) option.push('</tr>');
    option.push('</table>');
    option.push('</div>');
  }
  option.push('<br/>');
  option.push('<p><strong>Computed shopping list (both missing cards and their ingredients):</strong></p>');
  option.push('<p style="width: 640px;">' + collection_shoppingList());
  option.push('</p>');
  option.push('<label for="collection-type">Current shopping list:</label><br/>');
  option.push('<input type="radio" name="collection-type" id="collection-type_all">');
  option.push('Everything from working collections</input>');
  option.push('<input type="radio" name="collection-type" id="collection-type_automatic">');
  option.push('Computed shopping list</input>');
  option.push('<input type="radio" name="collection-type" id="collection-type_personal">');
  option.push('Personalized shopping list</input>');
  option.push('<input type="radio" name="collection-type" id="collection-type_none">');
  option.push('Empty (unknown cards only)</input><br/>');
  var value = profile.preferences.collection_unknowncol;
  option.push(prefs.addToggleBox('Add unknown collections to current shopping list', 'collection_unknowncol', value));
  option.push('<br/>');
  value = profile.preferences.collection_unknowncard;
  option.push(prefs.addToggleBox('Add unknown cards from selected collections to current shopping list', 'collection_unknowncard', value));
  option.push('<br/>');
  option.push('<strong>Cards that <em>can</em> be dropped:</strong><br/>');
  option.push('<table>');
  count = 0;
  for each (var item in profile.pack) {
    if ((count % 5) == 0) option.push('<tr>');
    option.push('<td><input type="checkbox" name="collection-droppable_' + item.id + '" id="collection-droppable_' + item.id + '"');
    if (profile.preferences.collection_droppable.indexOf(item.id) != -1) {
      option.push(' checked="checked"/>&nbsp;');
    } else {
      option.push('/>&nbsp;');
    }
    if (collections[item.collection] && collections[item.collection].cards[item.name]) {
      option.push(collections[item.collection].cards[item.name].name.replace(/ /,'&nbsp;') + '</td>');
    } else {
      option.push(item.name + '</td>');
    }
    count++;
    if ((count % 5) == 0) option.push('</tr>');
  }
  if (count % 5) option.push('</tr>');
  option.push('</table>');
  var div = document.createElement('div');
  div.innerHTML = option.join('');
  prefs.form.insertBefore(div, prefs.button);
  /* Check the shopping list */
  var value = profile.preferences.collection_type;
  var el = document.getElementById('collection-type_' + value);
  if (el) el.checked = true;
  /* Hide the shopping list for non active collections */
  for (var i in collections) {
    el = document.getElementById('collection-div_' + i);
    if (el && profile.preferences.collection_work.indexOf(i) == -1) el.style.display = 'none';
    el = document.getElementById('collection-col_' + i);
    if (el) el.addEventListener('click', collection_toggleCardList(i), true);
  }
}

function collection_preferencesHandler(form, profile) {
  var col_work = new Array();
  var shoplist = new Object();
  var input;
  for (var i in collections) {
    input = form.elements.namedItem('collection-col_' + i);
    if (!input) continue;
    if (input.checked) col_work.push(i);
    else continue;
    for (var j in collections[i].cards) {
      input = form.elements.namedItem('collection-card_' + j);
      if (!input) continue;
      if (input.value != "0") shoplist[j] = parseInt(input.value);
    }
  }

  var ret = false;
  col_work.sort();
  if (col_work.length != profile.preferences.collection_work.length) {
    profile.preferences.collection_work = col_work;
    ret = true;
  } else {
    for (var i = 0; i < col_work.length; i++) {
      if (col_work[i] != profile.preferences.collection_work[i]) {
        profile.preferences.collection_work = col_work;
        ret = true;
      }
    }
  }

  var pref = profile.preferences;
  for (var i in shoplist) {
    if (shoplist[i] != pref.collection_shoplist[i]) ret = true;
  }
  for (var i in pref) {
    if (shoplist[i] != pref.collection_shoplist[i]) ret = true;
  }
  pref.collection_shoplist = shoplist;

  var types = ["all", "automatic", "personal", "none"];
  var value = "automatic";
  for (var i = 0; i < types.length; i++ ) {
    var el = document.getElementById('collection-type_' + types[i]);
    if (el && el.checked) {
      value = types[i];
      break;
    }
  }
  if (pref.collection_type != value) {
    ret = true;
    pref.collection_type = value;
  }

  var droppable = new Array();
  for each (var item in profile.pack) {
    var el = document.getElementById('collection-droppable_' + item.id);
    if (el && el.checked) droppable.push(item.id);
  }
  droppable.sort();
  if (droppable.length != profile.preferences.collection_droppable.length) {
    profile.preferences.collection_droppable = droppable;
    ret = true;
  } else {
    for (var i = 0; i < droppable.length; i++) {
      if (droppable[i] != profile.preferences.collection_droppable[i]) {
        profile.preferences.collection_droppable = droppable;
        ret = true;
      }
    }
  }

  input = form.elements.namedItem('collection_unknowncol');
  if (profile.preferences.collection_unknowncol != input.checked) {
    profile.preferences.collection_unknowncol = input.checked;
    ret = true;
  }

  input = form.elements.namedItem('collection_unknowncard');
  if (profile.preferences.collection_unknowncard != input.checked) {
    profile.preferences.collection_unknowncard = input.checked;
    ret = true;
  }

  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function highlight_exec() {
  if (profile.preferences.highlight_missing == undefined) profile.preferences.highlight_missing = true;
  if (profile.preferences.highlight_completed == undefined) profile.preferences.highlight_completed = true;
  var prefs = profile.preferences;
  var pages = ['user', 'buy', 'purchase', 'market'];
  if (pages.indexOf(Page.c_page) == -1) return;
  for (var i = 0; i < pagecards.cards.length; i++) {
    var card = pagecards.cards[i];
    if (collection_isInShoppingList(card.collection, card.name)) highlight_enhance(card.wrapper);
    if (prefs.highlight_completed) {
      if (profile.complete_col.indexOf(card.collection) != -1) highlight_delete(card.wrapper);
    }
  }
}

function highlight_enhance(wrapper) {
  try {
    var action = Utils.getElementsByClassName('action', wrapper)[0];
    if (action) action.setAttribute('style', 'background-color: black;');
    var anchor = action.getElementsByTagName('a')[0];
    if (anchor) {
      anchor.setAttribute('style', 'color: white;');
    } else {
      anchor = action.getElementsByTagName('span')[0];
      anchor.setAttribute('style', 'color: white;');
    }
    wrapper.parentNode.insertBefore(wrapper, wrapper.parentNode.firstChild);
  } catch(ex) {dump(ex);}
}

function highlight_delete(wrapper) {
  if (!wrapper.parentNode.className.match(/grab-item/)) wrapper.parentNode.removeChild(wrapper);
}

function highlight_preferencesInterface(prefs, profile) {
  var value = profile.preferences.highlight_missing;
  var option = new Array();
  option.push('<h2>Highlighting</h2><hr/>');
  option.push(prefs.addToggleBox('Highlight cards from current shopping list', 'highlight_missing', value));
  option.push('<br/>');
  value = profile.preferences.highlight_completed;
  option.push(prefs.addToggleBox('Delete cards from completed collections', 'highlight_completed', value));
  option.push('<br />');
  var div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function highlight_preferencesHandler(form, profile) {
  var ret = false;
  var input;
  input = form.elements.namedItem('highlight_missing');
  if (profile.preferences.highlight_missing != input.checked) {
    profile.preferences.highlight_missing = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('highlight_completed');
  if (profile.preferences.highlight_completed != input.checked) {
    profile.preferences.highlight_completed = input.checked;
    ret = true;
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function grinding_exec() {
  if (profile.preferences.grinding_enabled == undefined) profile.preferences.grinding_enabled = false;
  if (profile.preferences.grinding_level == undefined) profile.preferences.grinding_level = 25;
  if (profile.preferences.grinding_rats == undefined) profile.preferences.grinding_rats = false;
  if (!profile.preferences.grinding_enabled) return;
  if (profile.preferences.grinding_level <= profile.level) {
    var idx = profile.vars.browse_module.indexOf('grinding');
    profile.vars.browse_module.splice(idx, 1);
    return;
  }
  switch (Page.c_page) {
    case 'user':
      if (profile.preferences.grinding_rats) {
        var fake_user = Utils.getElementsByXPath('//div[@class="user-image"]/img[contains(@src,"fake_users")]');
        if (!fake_user.length) return;
      }
      var best, value = 0;
      for (var i = 0; i < pagecards.cards.length; i++) {
        var card = pagecards.cards[i];
        if (card.name == 'unknown' || card.collection == 'unknown' || !card.id || !card.steal_id) continue;
        if (profile.pack_ids.indexOf(card.name) != -1 && card.points > value) {
          best = card;
          value = card.points;
        }
      }
      if (best) {
        var drop;
        for (var i in profile.pack) {
          if (best.name == profile.pack[i].name && profile.pack[i].id && !profile.pack[i].locked) {
            drop = profile.pack[i];
            break;
          }
        }
        if (drop) best.steal(drop, true, 6);
      }
      break;
    default:
      break;
  }
}

function grinding_preferencesInterface(prefs, profile) {
  var option = new Array();
  var value = profile.preferences.grinding_enabled;
  option.push('<h2>Grinding</h2><hr/>');
  option.push(prefs.addToggleBox('Auto-grind to increase score', 'grinding_enabled', value));
  option.push('<br/>');
  value = profile.preferences.grinding_level;
  option.push('<label for="grinding_level">Stop grinding at level: </label>');
  option.push('<input name="grinding_level" size="3" maxlength="3" type="text" value="' + value + '"/>');
  option.push('<br/>');
  value = profile.preferences.grinding_rats;
  option.push(prefs.addToggleBox('Grind from Rats only', 'grinding_rats', value));
  var div = document.createElement('div');
  div.innerHTML = option.join('');
  prefs.form.insertBefore(div, prefs.button);
}

function grinding_preferencesHandler(form, profile) {
  var ret = false;
  var input = form.elements.namedItem('grinding_enabled');
  if (profile.preferences.grinding_enabled != input.checked) {
    profile.preferences.grinding_enabled = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('grinding_level');
  input = parseInt(input.value);
  if (profile.preferences.grinding_level != input) {
    profile.preferences.grinding_level = input;
    ret = true;
  }
  input = form.elements.namedItem('grinding_rats');
  if (profile.preferences.grinding_rats != input.checked) {
    profile.preferences.grinding_rats = input.checked;
    ret = true;
  }

  var idx;
  idx = profile.vars.browse_module.indexOf('grinding');
  if (profile.preferences.grinding_enabled) {
    if (profile.level < profile.preferences.grinding_level) {
      if (idx == -1) profile.vars.browse_module.push('grinding');
    } else {
      if (idx != -1) profile.vars.browse_module.splice(idx, 1);
    }
  } else {
    if (idx != -1) profile.vars.browse_module.splice(idx, 1);
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function stalk_exec() {
  if (profile.preferences.stalk_enabled == undefined) profile.preferences.stalk_enabled = false;
  if (profile.preferences.stalk_free == undefined) profile.preferences.stalk_free = 2;
  if (profile.preferences.stalk_delay == undefined) profile.preferences.stalk_delay = 60;
  if (profile.preferences.stalk_allmarkets == undefined) profile.preferences.stalk_allmarkets = false;
  if (profile.vars.stalk_avmarkets == undefined) profile.vars.stalk_avmarkets = new Object();
  if (Page.c_page == 'markets') {
    var avmarkets = new Object();
    var a = Utils.getElementsByXPath('//a[contains(@href,"/packrat/market/")]');
    for (var i = 0; i < a.length; i++) {
      var name = a[i].href.match(/market\/(.*)/);
      if (name) {
        name = name[1];
        if (profile.vars.stalk_avmarkets[name]) {
          avmarkets[name] = profile.vars.stalk_avmarkets[name];
        } else {
          avmarkets[name] = 1;
        }
      }
    }
    profile.vars.stalk_avmarkets = avmarkets;
  } else if (Page.c_page == 'market') {
    var box = document.getElementById('app2431403991_notice-box');
    if (box) {
      var level = box.innerHTML.match(/You need to reach (\d+)/);
      if (level) {
        level = parseInt(level[1]);
        profile.vars.stalk_avmarkets[Page.c_arg] = level;
      }
    }
  }
  if (!profile.preferences.stalk_enabled) return;
  /* Count the cards in our pack and don't stalk if we have more than 13 */
  var count = 0;
  for (var i in profile.pack) {
    if (profile.pack[i].name) count++;
  }
  var notes = document.getElementById('scriptnotes');
  if (count >= 15 - profile.preferences.stalk_free) {
    notes.innerHTML += '<li>Pack almost full, stalking disabled.</li>';
    return;
  }
  /* Add a note if we are not on markets page */
  var pages = ['market', 'buy', 'markets', 'purchase'];
  if (pages.indexOf(Page.c_page) == -1) {
    notes.innerHTML += '<li>Go to any market to begin stalking</li>';
    return;
  }
  var count = 0; for (var i in profile.vars.stalk_avmarkets) count++;
  if (!count) {
    var action = new Timer();
    action.message = "Reading the list of markets...";
    action.type = 'gotourl';
    action.url = '/packrat/markets';
    action.append();
  }
  var market = '';
  switch (Page.c_page) {
    case 'market':
    case 'markets':
      market = Page.c_arg;
      break;
    case 'purchase':
      market = Page.c_params.market;
  }
  var action;
  for (var i = 0; i < pagecards.cards.length; i++) {
    var card = pagecards.cards[i];
    if (card.purchase && collection_isInShoppingList(card.collection, card.name)) card.buy();
  }

  var markets = stalk_getMarkets();
  var num = markets.length;
  if (!num) {
    notes.innerHTML += '<li>The cards in the shopping list can not be purchased, stalking disabled.</li>';
    return;
  }
  var idx = markets.indexOf(market);
  idx++;
  if (idx >= markets.length) idx = 0;
  market = markets[idx];
  if (Page.c_page == 'markets') action = new Timer();
  else action = new Timer(Math.floor(1000 * profile.preferences.stalk_delay), Math.floor(1000 * profile.preferences.stalk_delay));
  action.type = 'gotourl';
  action.message = 'Stalking market ' + market + '...';
  action.url = 'http://apps.facebook.com/packrat/market/' + market;
  action.append();
}

function stalk_getMarkets() {
  var obj;

  if (profile.preferences.stalk_allmarkets) {
    obj = profile.vars.stalk_avmarkets;
  } else {
    obj = new Object();
    var cards;
    switch (profile.preferences.collection_type) {
      case 'automatic':
        cards = profile.vars.collection_missing;
        break;
      case 'personal':
        cards = profile.preferences.collection_shoplist;
        break;
      case 'all':
        cards = new Object();
        for (var i = 0; i < profile.preferences.collection_work.length; i++) {
          var col = profile.preferences.collection_work[i];
          if (!collections[col]) continue;
          for (var item in collections[col].cards) {
            cards[item] = 1;
          }
        }
        break;
      default:
        cards = new Object();
        break;
    }

    for (var i in cards) {
      if (cards[i] <= 0) continue;
      for (var j in collections) {
        if (collections[j].expiration != 0 && collections[j].expiration < Page.now) continue;
        if (!collections[j].cards) continue;
        if (collections[j].cards[i] && collections[j].cards[i].markets) {
          var markets = collections[j].cards[i].markets;
          for (k = 0; k < markets.length; k++) {
            obj[markets[k].toLowerCase().replace(/ /g,'-')] = true;
          }
        }
      }
    }
  }

  var result = new Array();
  for (var item in obj)
    if (profile.level >= profile.vars.stalk_avmarkets[item])
      result.push(item);
  GM_log(result.toSource());
  return result;
}

function stalk_preferencesInterface(prefs, profile) {
  var value = profile.preferences.stalk_enabled;
  var option = new Array();
  option.push("<h2>Market stalking</h2><hr/>");
  option.push(prefs.addToggleBox("Stalk markets for cards in current shopping list", "stalk_enabled", value));
  option.push('<br/>');
  option.push('<label for="stalk_free">Leave at least');
  value = profile.preferences.stalk_free;
  option.push('<input name="stalk_free" type="text" size="2" maxlength="2" value="' + value + '"/>');
  option.push('free slots in my pack.</label>');
  option.push('<br/>');
  option.push('<label for="stalk_delay">Change markets every ');
  value = profile.preferences.stalk_delay;
  option.push('<input name="stalk_delay" type="text" size="4" maxlength="4" value="' + value + '"/>');
  option.push(' seconds (minimum 30 seconds).</label>');
  option.push('<br/>');
  value = profile.preferences.stalk_allmarkets;
  option.push(prefs.addToggleBox("Stalk every market (e.g. for unknown cards)", "stalk_allmarkets", value));
  option.push('<br/>');

  var div = document.createElement('div');
  div.innerHTML = option.join("\n");
  prefs.form.insertBefore(div, prefs.button);
}

function stalk_preferencesHandler(form, profile) {
  var ret = false;
  var input = form.elements.namedItem('stalk_enabled');
  if (profile.preferences.stalk_enabled != input.checked) {
    profile.preferences.stalk_enabled = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('stalk_free');
  var value = parseInt(input.value);
  if (isNaN(value)) value = 2;
  if (profile.preferences.stalk_free != value) {
    profile.preferences.stalk_free = value;
    ret = true;
  }
  input = form.elements.namedItem('stalk_delay');
  var value = parseInt(input.value);
  if (isNaN(value)) value = 60;
  if (value <= 30) value = 30;
  if (profile.preferences.stalk_delay != value) {
    profile.preferences.stalk_delay = value;
    ret = true;
  }
  input = form.elements.namedItem('stalk_allmarkets');
  if (profile.preferences.stalk_allmarkets != input.checked) {
    profile.preferences.stalk_allmarkets = input.checked;
    ret = true;
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function steal_exec() {
  if (profile.preferences.steal_steal == undefined) profile.preferences.steal_steal = false;
  if (profile.preferences.steal_upgrade == undefined) profile.preferences.steal_upgrade = false;
  if (profile.preferences.steal_locks == undefined) profile.preferences.steal_locks = false;
  switch (Page.c_page) {
    case 'user':
      var fake_user = Utils.getElementsByXPath('//div[@class="user-image"]/img[contains(@src,"fake_users")]');
      if (!fake_user.length) return;

      if (profile.preferences.steal_steal) {
        var best, svalue = 0;
        for (var i = 0; i < pagecards.cards.length; i++) {
          var card = pagecards.cards[i];
          if ((collection_isInShoppingList(card.collection, card.name) ||
               profile.preferences.steal_locks && card.collection == 'locks')
                 && card.steal_id) {
            best = card;
            svalue = card.points;
            break;
          }
        }
        if (best) {
          var drop, dvalue = 0;
          for (var i in profile.pack) {
            if (profile.pack[i].locked) continue;
            if (collection_isDroppable(profile.pack[i])) {
              if (dvalue >= svalue) {
                if (profile.pack[i].points < svalue || profile.pack[i].points >= dvalue) continue;
              } else {
                if (profile.pack[i].points <= dvalue) continue;
              }
              drop = profile.pack[i];
              dvalue = profile.pack[i].points;
            }
          }
        }
        if (drop) {
          best.steal(drop, false);
          return;
        }
      }

      if (profile.preferences.steal_upgrade) {
        for each (var item in profile.pack) {
          if (!collection_isDroppable(item)) continue;
          if (!item.id || item.locked) continue;
          drop = item;
          dvalue = item.points;
          best = undefined, svalue = Infinity;
          for (var steal = 0; steal < pagecards.cards.length; steal++) {
            var card = pagecards.cards[steal];
            if (!card.steal_id) continue;
            if (card.points > dvalue && card.points < svalue) {
              best = card;
              svalue = card.points;
            }
          }
          /* Check the ratio between the steal/drop card points */
          if (best && ((svalue / dvalue) <= 2 || (svalue - dvalue) <= 200)) break;
        }
        if (best && drop) best.steal(drop, true);
      }
      break;
    default:
      break;
  }
}

function steal_preferencesInterface(prefs, profile) {
  var option = new Array();
  var value = profile.preferences.steal_steal;
  option.push('<h2>Stealing</h2><hr/>');
  option.push(prefs.addToggleBox('Steal cards from shopping list (Rats only)', 'steal_steal', value));
  option.push('<br/>');
  value = profile.preferences.steal_upgrade;
  option.push(prefs.addToggleBox('Exchange droppable cards with more powerful droppable cards (only from Rats)', 'steal_upgrade', value));
  option.push('<br/>');
  value = profile.preferences.steal_locks;
  option.push(prefs.addToggleBox('Steal locks to free space in the pack', 'steal_locks', value));
  var div = document.createElement('div');
  div.innerHTML = option.join('');
  prefs.form.insertBefore(div, prefs.button);
}

function steal_preferencesHandler(form, profile) {
  var ret = false;
  var input = form.elements.namedItem('steal_steal');
  if (profile.preferences.steal_steal != input.checked) {
    profile.preferences.steal_steal = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('steal_upgrade');
  if (profile.preferences.steal_upgrade != input.checked) {
    profile.preferences.steal_upgrade = input.checked;
    ret = true;
  }
  input = form.elements.namedItem('steal_locks');
  if (profile.preferences.steal_locks != input.checked) {
    profile.preferences.steal_locks = input.checked;
    ret = true;
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */





function browse_exec() {
  if (profile.preferences.browse_enabled == undefined) profile.preferences.browse_enabled = false;
  if (profile.preferences.browse_ratsonly == undefined) profile.preferences.browse_ratsonly = false;
  if (profile.vars.browse_pause == undefined) profile.vars.browse_pause = false;
  if (profile.vars.browse_module == undefined) profile.vars.browse_module = new Array();
  if (profile.vars.browse_friends == undefined) profile.vars.browse_friends = new Array();
  if (profile.vars.browse_friendidx == undefined) profile.vars.browse_friendidx = 0;
  if (profile.vars.browse_module.length) {
    var notes = document.getElementById('scriptnotes');
    var slowdown = false;
    if (Page.now - profile.limits.last > 7200) {
      notes.innerHTML += "<li>Script's speed was heavily lowered since there was no user interaction in the last 2 hours. Go to <b>'Your Pack'</b> to restore the normal speed.</li>";
      slowdown = true;
    }
    if (profile.limits.popups >= 10) {
      notes.innerHTML += "<li>The script has seen more than 10 pop-ups since last user interaction, hence it paused. Go to <b>'Your Pack'</b> to reset the counter.</li>";
      browse_pause(false)();
    }
    if (profile.limits.credits >= 2000) {
      notes.innerHTML += "<li>The script has collected more than <b>2000</b> credits since last user interaction, hence it paused. Go to <b>'Your Pack'</b> to reset the counter.</li>";
      browse_pause(false)();
    }
    if (!profile.vars.browse_pause) {
      switch (Page.c_page) {
        case 'friends':
          profile.vars.browse_friends = new Array();
          var div = Utils.getElementsByClassName('avatar');
          for (var i = 0; i < div.length; i++) {
            var anchor = div[i].getElementsByTagName('a')[0];
            if (!anchor) continue;
            var friend = new Object();
            var id = anchor.href.match(/user\/(.*)/);
            if (id) friend.id = id[1];
            var img = div[i].getElementsByTagName('img')[0];
            friend.name = img.alt;
            if (img.src.match(/fake_users/)) friend.rat = true;
            else friend.rat = false;
            profile.vars.browse_friends.push(friend);
          }
          profile.vars.browse_friendidx = Math.floor(profile.vars.browse_friends.length * Math.random());
        case 'steal':
          if (Page.c_page == 'steal') {
            var notice = document.getElementById('app2431403991_notice-box');
            if (!notice) break;
          }
        case 'user':
          if (!profile.vars.browse_friends.length) {
            var action = new Timer();
            action.message = "Reading the list of friends...";
            action.type = 'gotourl';
            action.url = '/packrat/friends';
            action.append();
            break;
          }
          var idx = profile.vars.browse_friendidx;
          var length = profile.vars.browse_friends.length;
          if (idx <= 0 || idx >= length) idx = 0;
          /* Look for a rat friend */
          if (profile.preferences.browse_ratsonly) {
            for (var i = 0; i < length; i++) {
              if (profile.vars.browse_friends[(idx + i) % length].rat) {
                idx += i;
                idx %= length;
                break;
              }
            }
          }
          var friend = profile.vars.browse_friends[idx];

          var action;
          if (slowdown) action = new Timer(30000, 30000);
          else action = new Timer();
          action.message = 'Browsing to ' + friend.name + '\'s pack...';
          action.type = 'gotourl';
          action.url = 'http://apps.facebook.com/packrat/user/' + friend.id;
          action.append();
          idx++;
          if (idx < profile.vars.browse_friends.length) {
            profile.vars.browse_friendidx = idx;
          } else {
            profile.vars.browse_friendidx = 0;
          }
          notes.innerHTML += "<li>Press SPACE to pause the cycle</li>";
          window.addEventListener('keydown', browse_pause(true), true);
          browse_pauseResumeLink();
          break;
        default:
          notes.innerHTML += "<li>Go to 'Steal from Friends' page to start browsing cycle</li>";
          break;
      }
    } else {
      switch(Page.c_page) {
        case 'steal':
        case 'user':
        case 'friends':
          if (Page.c_page == 'steal') {
            var notice = document.getElementById('app2431403991_notice-box');
            if (!notice) {
              notes.innerHTML += "<li>Go to 'Steal from Friends' page to start browsing cycle</li>";
              break;
            }
          }
          browse_pauseResumeLink();
          break;
        default:
          notes.innerHTML += "<li>Go to 'Steal from Friends' page to start browsing cycle</li>";
          break;
      }
    }
  /* We are not browsing */
  } else {
    profile.vars.browse_pause = false;
  }
}

function browse_pause(handler) {
  if (handler == undefined) handler = true;
  var timer = Timer;
  var pauseResumeLink = browse_pauseResumeLink;
  var prof = profile;
  return function(ev) {
    if (!handler || ev.keyCode == 32) {
    window.stop();
    window.clearTimeout(timer.timer);
    prof.vars.browse_pause = true;
    GM_setValue('profile', prof.toSource());
    pauseResumeLink();
    var stat = document.getElementById('scriptstatus');
    stat.innerHTML = "Script paused...";
    stat = document.getElementById('scripttimer');
    stat.innerHTML = "";
    }
  }
}

function browse_resume() {
  var prof = eval(GM_getValue('profile', '({})'));
  prof.vars.browse_pause = false;
  GM_setValue('profile', prof.toSource());
  location.reload();
}

function browse_pauseResumeLink() {
  var prof = eval(GM_getValue('profile', '({})'));
  var button = document.getElementById('resume_button');
  if (!button) {
    var parent_el = document.getElementById('prefs_button').parentNode;
    button = document.createElement('hr');
    parent_el.appendChild(button);
    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'resume_button';
    parent_el.appendChild(button);
  }
  if (prof.vars.browse_pause) {
    button.innerHTML = "Resume browsing";
    button.addEventListener('click', browse_resume, true);
  } else {
    button.innerHTML = "Pause browsing";
    button.addEventListener('click', browse_pause(false), true);
  }
}

function browse_preferencesInterface(prefs, profile) {
  var value = profile.preferences.browse_enabled;
  var option = new Array();
  option.push('<h2>Browsing</h2><hr/>');
  option.push(prefs.addToggleBox('Browse user pages in an infinite loop', 'browse_enabled', value));
  option.push('<br/>');
  value = profile.preferences.browse_ratsonly;
  option.push(prefs.addToggleBox('Browse only Rat pages', 'browse_ratsonly', value));
  option.push('<br/>');
  var div = document.createElement('div');
  div.innerHTML = option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function browse_preferencesHandler(form, profile) {
  var ret = false;
  var input = form.elements.namedItem('browse_enabled');
  if (profile.preferences.browse_enabled != input.checked) {
    profile.preferences.browse_enabled = input.checked;
    var idx;
    if (!input.checked &&
        (idx = profile.vars.browse_module.indexOf('browse')) != -1) {
      profile.vars.browse_module.splice(idx, 1);
    } else if (input.checked) profile.vars.browse_module.push('browse');
    ret = true;
  }

  input = form.elements.namedItem('browse_ratsonly');
  if (profile.preferences.browse_ratsonly != input.checked) {
    profile.preferences.browse_ratsonly = input.checked;
    ret = true;
  }
  return ret;
}
/* vim:set tw=80 sts=2 et ft=javascript: */

GM_registerMenuCommand("Reset PackRat preferences", function(){
GM_setValue('collections', '({})'); GM_setValue('profile', '({})');
alert("PackRat script preferences were successfully resetted.");});

var exept = new Object();
(function() {
for (var i = 0; i < modules.length; i++) {
  if (this[modules[i] + '_exec']) {
    try {
      now = Date.now();
      this[modules[i] + '_exec']();
      GM_log("*** MODULE " + modules[i] + " took " + (Date.now() - now) + " ms ***");
    } catch(ex) {
   exept[modules[i]] = ex;
   dump(ex);
    }
  }
}

var message = new Array();
for (var i in exept) {
 message.push("Error in module '" + i + "' on line " + (exept[i].lineNumber - 347) + ": " + exept[i].message);;
}

if (message.length) {
 try {
  var error = document.getElementById('scripterror');
  error.innerHTML = message.join('<br/>') + '<br/><br/>';
 } catch(ex) {
  GM_log(message.join("\n"));
 }
 switch (Page.c_page) {
  case 'steal':
   if (Page.c_arg.charAt(0) == 't') {
    setTimeout(function(){location.href = 'http://apps.facebook.com/packrat/friends'}, 30000);
    break;
   }
  default:
   setTimeout(function(){location.reload();}, 30000);
   break;
 }
}

Timer.start();
profile.save();
}) ();
/* vim:set tw=0 sts=0 sw=2 ts=2 ft=javascript: */

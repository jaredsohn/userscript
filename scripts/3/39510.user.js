var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           FBMW*
// @namespace      http://userscripts.org/users/75195
// @description    Enhance your experience with Facebook Mob Wars!
// @source         http://userscripts.org/scripts/show/39510
// @identifier     http://userscripts.org/scripts/source/39510.user.js
// @version        1.27L
// @date           03-10-2009
// @creator        Pea Cracker (altered by remarkable)
// @include        http://apps.facebook.com/mobwars/*
// @include        http://apps.new.facebook.com/mobwars/*
// @include        http://www.facebook.com/common/error.html
// ==/UserScript==
]]></>.toString());

function parseMetadata(headerBlock)
  {
  var lines = headerBlock.split(/[\r\n]+/).filter(/\/\/ @/);
  var metadata = { include: [], exclude: [] };
  for each (var line in lines)
    {
    [line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    if (metadata[name] instanceof Array)
      {
      metadata[name].push(value);
      }
    else
      {
      metadata[name] = value;
      }
    }
  return metadata;
  }

// alert(new Date().getTime());

// Auto-Update
var version_scriptNum = 39510;
var version_timestamp = 1229937111050;
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

/* Error Handling */
// The [http://www.facebook.com/common/error.html] page
var rl = 0;
if (document.location.href=='http://www.facebook.com/common/error.html')
  {
  window.location.href='http://apps.facebook.com/mobwars/';
  }
// The [http://apps.facebook.com/mobwars/fight/hitlist] page
var rl = 0;
if (document.location.href=='http://apps.facebook.com/mobwars/fight/hitlist')
  {
  window.location.href='http://apps.facebook.com/mobwars/';
  }
// The [Heavily Rate Limited] page
else if (document.body.innerHTML.match(/This page is being heavily rate limited. Please avoid constantly refreshing this page./))
  {
  rl = 1;
  setTimeout(function(){window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/");}, 30000);
  }
// The [Connection Interrupted] page
else if (document.getElementById('errorTryAgain') || document.body.innerHTML.match(/Error while loading page from/) || !document.getElementById('app8743457343_content'))
  {
  document.location.reload();
  }

/* [NYCCJ] Handling */
if (document.body.innerHTML.match(/New York City City Jail/) || document.location.href=='http://www.facebook.com/mobwars/jail/')
  {
  if (document.body.innerHTML.match(/Bust Out of Jail/)) window.location.href = 'http://apps.facebook.com/mobwars/jail/do.php?action=bustout'; // bust your way out by default...
  window.location.href = 'http://apps.facebook.com/mobwars/jail/lawyer.php';
  }
if (document.location.href=='http://apps.facebook.com/mobwars/jail/lawyer.php') document.getElementById('app8743457343_lawyerForm').submit();


var Page = new Object();

Page.init = function()
  {
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
  for (var i = 0; i < parts.length; i++)
    {
    var param = parts[i].split('=');
    Page.c_params[param[0]] = param[1];
    }
  }

Page.init();
/* vim:set tw=80 sts=2 et ft=javascript: */

var Menu = new Object();

function dollars_to_int(str)
  {
  return str.replace(/,|\$/g,'');
  }

function next_task_time()
  {
  var next_task_time = 0;
 for (task in boss.actions)
   {
   if (boss.actions[task]['page'])
     {
     if (next_task_time==0) next_task_time = boss.actions[task]['time'];
     if (next_task_time > boss.actions[task]['time']) next_task_time = boss.actions[task]['time'];
     }
   }
 return (next_task_time);
  }

function int_to_dollars(num)
  {
  num = num || 0;
  var str = "";
  var tmp;
  while (num >= 1000)
    {
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

Menu.init = function()
  {
  var menuCode = new Array();
  menuCode.push('<div class="scriptStatusHeader" id="title"></div>');

  menuCode.push('<div class="scriptStatusContent">');
  menuCode.push('<table style="width: 100%;" cellspacing=0>');
  menuCode.push('<tr><td width=49%>');

  /* Assets */
  menuCode.push('<table cellspacing=0 cellpadding=0>');
  menuCode.push('<tr><td>Cash</td><td id="cash_stat"style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Bank account</td><td id="bank_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>City value</td><td id="city_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td style="border-bottom:1px solid black;">Stock value</td><td id="stockpile_stat" style="color: green; text-align: right;border-bottom:1px solid black;"></td></tr>');
  menuCode.push('<tr><td>Total</td><td id="total1_stat" style="text-align: right;"></td></tr>');
  menuCode.push('</table>');

  menuCode.push('</td><td width=2%>&nbsp;</td><td width=49%>');
 
  /* Income and expenses */
  menuCode.push('<table cellspacing=0 cellpadding=0>');
  menuCode.push('<tr><td>City income</td><td id="income_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Job mean payout</td><td id="jobincome_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td style="border-bottom:1px solid black;">Upkeep</td><td id="upkeep_stat" style="color: red; text-align: right;border-bottom:1px solid black;"></td></tr>');
  menuCode.push('<tr><td style="border-bottom:1px dotted #3B5998;">Total</td><td id="total2_stat" style="color: green; text-align: right;border-bottom:1px dotted #3B5998;""></td></tr>');
  menuCode.push('<tr><td>My bounty</td><td id="bounty_stat" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('</table>');

  menuCode.push('</td></tr>');
  menuCode.push('<tr><td colspan=3><hr></td></tr>');
  menuCode.push('<tr><td width=49%>');

  /* RORs */
  menuCode.push('<table cellspacing=0 cellpadding=0>');
  menuCode.push('<tr><td>Best ROR</td><td id="bROR_ratio" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Best property</td><td id="bROR_property" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Req\'d property</td><td id="bROR_req" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Cash needed</td><td id="bROR_cash" style="color: red; text-align: right;"></td></tr>');
  menuCode.push('</table>');

  menuCode.push('</td><td width=2%>&nbsp;</td><td width=49%>');

  menuCode.push('<table cellspacing=0 cellpadding=0>');
  /* Career - Job */
  menuCode.push('<tr><td>Career Goal</td><td id="career_goal" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td id="auto_prep">Job Auto-Selected</td><td id="career_auto" style="color: green; text-align: right;"></td></tr>');
  /* Career - Hit */
  menuCode.push('<tr><td>Hitting Preference</td><td id="hitting_preference" style="color: green; text-align: right;"></td></tr>');
  menuCode.push('<tr><td>Bounty Limits (min~max)</td><td id="bounty_limits" style="color: red; text-align: right;"></td></tr>');
  menuCode.push('</table>');

  menuCode.push('</td></tr>');
  menuCode.push('<tr><td colspan=3><hr></td></tr>');
  menuCode.push('<tr><td colspan=3>');

  menuCode.push('<input type="checkbox" id="aggressive"'+(boss.preferences.aggressive?' checked':'')+'>Aggressive Refresh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="prefs_button">Preferences</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="bvl_button">Victims</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="scriptstatus"><font color=green>Resting...</font></span>&nbsp;<span id="scripttimer"></span><br />');
 
  menuCode.push('<table cellspacing=0 cellpadding=0 height=50><tr><td><div id="gui"></div></td><td width=120 nowrap align=center><img id="captcha_img" width=100 height=50></td></tr></table>');
   
  menuCode.push('</td></tr>');
  menuCode.push('</table>');
  menuCode.push('</div>');

  var menu = document.createElement('div');
  menu.id = 'ScriptStatus';
  menu.innerHTML = menuCode.join('\n');
  menuCode.length = 0;

  menuCode.push("#ScriptStatus { font-family: Arial; border:2px solid #6D84B4; background-color:#EEEEEE; color:#3B5998; padding:1px; font-weight:bold; }");
  menuCode.push("#ScriptStatus div.scriptStatusHeader { text-align:center; background: #6D84B4; color: #FFFFFF; }");
  menuCode.push("#ScriptStatus div.scriptStatusContent { font-size: 8pt; border-width: 1px; padding: 2px; border-style: solid solid solid solid;}");
  menuCode.push("#ScriptStatus div.scriptStatusContent td { font-size: 8pt; }");

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');

  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}

  var container = document.getElementById('app8743457343_container');
  if (container) container.insertBefore(menu,container.firstChild);

  var prefs_button = document.getElementById('prefs_button');
  prefs_button.addEventListener('click', Preferences.show(), true);

  var bvl_button = document.getElementById('bvl_button');
  bvl_button.addEventListener('click', BVL.show(), true);

  var agg = document.getElementById('aggressive');
  agg.addEventListener('click', Agg(), true);

  Menu.update();
}

Menu.update = function()
  {
  var total = 0;
  var mybounty = 0;
  var el;

  el = document.getElementById('captcha_img');
  if (el && boss.got_captcha) el.src = boss.captcha_src;
  el = document.getElementById('title');
  if (el) el.innerHTML = '<div class="scriptStatusHeader">FBMW* v'+scriptMetadata["version"]+' (released on '+scriptMetadata["date"]+(boss.angry_mobs?', abused by '+boss.angry_mobs+' angry mobsters':'')+')<br />'+boss.name+' (level '+boss.level+') '+boss.type;
  el = document.getElementById('cash_stat');
  if (el) el.innerHTML = int_to_dollars(boss.cash);
  total += boss.cash || 0;
  el = document.getElementById('bank_stat');
  if (el) el.innerHTML = int_to_dollars(boss.bank_cash);
  total += boss.bank_cash || 0;
  el = document.getElementById('city_stat');
  if (el) el.innerHTML = int_to_dollars(boss.city_value);
  total += boss.city_value || 0;
  el = document.getElementById('stockpile_stat');
  if (el) el.innerHTML = int_to_dollars(boss.stockpile_value);
  total += boss.stockpile_value || 0;
  el = document.getElementById('total1_stat');
  if (el) el.innerHTML = int_to_dollars(total);
  /* Income and upkeep */
  el = document.getElementById('income_stat');
  if (el) el.innerHTML = int_to_dollars(boss.total_income);
  el = document.getElementById('jobincome_stat');
  if (el) el.innerHTML = int_to_dollars(boss.job_income);
  el = document.getElementById('upkeep_stat');
  if (el) el.innerHTML = int_to_dollars(boss.total_upkeep);
  el = document.getElementById('total2_stat');
  total = boss.total_income + boss.job_income - boss.total_upkeep;
  if (el) el.innerHTML = '';
  if (total < 0)
    {
    el.style.color = 'red';
    if (el) el.innerHTML = '-';
    }
  total = Math.abs(total);
  if (el) el.innerHTML += int_to_dollars(total);
  el = document.getElementById('bounty_stat');
  if (boss.kill_count) mybounty = Math.max((boss.total_income - boss.total_upkeep)*10+(boss.kill_count*20)+5000,10000);
  if (el) el.innerHTML = int_to_dollars(mybounty);
  el = document.getElementById('bROR_ratio');
  if (el) el.innerHTML = boss.bROR_ratio;
  el = document.getElementById('bROR_property');
  if (el) el.innerHTML = '10 x '+ boss.bROR_name+' = '+int_to_dollars(boss.bROR_price);
  el = document.getElementById('bROR_req'); 
  if (el && boss.bROR_req) el.innerHTML = '10 x '+itemlist[boss.bROR_req].name+' (own '+inventory[boss.bROR_req]+')';
  el = document.getElementById('bROR_cash');
  if (el && boss.cash < boss.bROR_price) el.innerHTML = int_to_dollars(boss.bROR_price-boss.cash);

  el = document.getElementById('career_goal');
  ele = document.getElementById('auto_prep');
  elle = document.getElementById('career_auto');

  if (el && joblist)
    {
    if (parseInt(boss.preferences.job)>0)
      {
      el.innerHTML = joblist[boss.preferences.job].name;
      if (ele) ele.innerHTML = 'Prep Job Auto-Selected';
      if (elle && jobs_needPrepJob(joblist, boss.preferences.job)>0) elle.innerHTML = joblist[jobs_needPrepJob(joblist, boss.preferences.job)].name;
      }
    else
     {
    switch (boss.preferences.job)
      {
      case 'none':
        el.innerHTML = 'None -- Rest';
        if (ele) ele.innerHTML = 'Job Auto-Selected';
        if (elle) elle.innerHTML = 'Vacation';
        break;
      case 'payout':
        el.innerHTML = 'Best payout/energy';
        if (ele) ele.innerHTML = 'Job Auto-Selected';
        if (elle && parseInt(jobs_selectJob(joblist, false))) elle.innerHTML = joblist[parseInt(jobs_selectJob(joblist, false))].name;
        break;
      case 'exp':
        el.innerHTML = 'Best experience/energy';
        if (ele) ele.innerHTML = 'Job Auto-Selected';
        if (elle && parseInt(jobs_selectJob(joblist, true))) elle.innerHTML = joblist[parseInt(jobs_selectJob(joblist, true))].name;
        break;
      default:
        break;
        }
      }
    }
  el = document.getElementById('hitting_preference');
  if (el) el.innerHTML = (boss.preferences.hitlist_order?'First Come First Serve':'Aim for Highest Bounty');
  el = document.getElementById('bounty_limits');
  if (el) el.innerHTML = (boss.preferences.bounty_min==0?'none':int_to_dollars(boss.preferences.bounty_min))+'&nbsp;~&nbsp;'+(boss.preferences.bounty_max==0?'none':int_to_dollars(boss.preferences.bounty_max));

  el = document.getElementById('gui');
  if (boss.preferences.gui)
    {
   var pixels = 350;
    var HpBar = Math.floor(pixels * boss.health / boss.max_health);
    var EnBar = Math.floor(pixels * boss.energy / boss.max_energy);
    var StBar = Math.floor(pixels * boss.stamina / boss.max_stamina);
    var gui_html = '<div style="background:#000000;color:#ffffff;height:48px;margin-top:1px;margin-bottom:1px;" id="gui">';
    gui_html += '<div style="margin:2px 0px 0px 2px;height:14px;float:left;background-color:#AAFFAA;width:'+HpBar+'px;">&nbsp;</div><div style="margin:2px 2px 0px 0px;height:14px;float:left;background-color:#FFAAD4;width:'+(pixels-HpBar)+'px;">&nbsp;</div>&nbsp;Health: '+boss.health + ' of ' + boss.max_health;
    gui_html += '<br /><div style="margin:1px 0px 0px 2px;height:14px;float:left;background-color:#AAFFAA;width:'+EnBar+'px;">&nbsp;</div><div style="margin:1px 2px 0px 0px;height:14px;float:left;background-color:#FFAAD4;width:'+(pixels-EnBar)+'px;">&nbsp;</div>&nbsp;Energy: '+boss.energy + ' of ' + boss.max_energy;
    gui_html += '<br /><div style="margin:0px 0px 2px 2px;height:14px;float:left;background-color:#AAFFAA;width:'+StBar+'px;">&nbsp;</div><div style="margin:0px 2px 2px 0px;height:14px;float:left;background-color:#FFAAD4;width:'+(pixels-StBar)+'px;">&nbsp;</div>&nbsp;Stamina: '+boss.stamina + ' of ' + boss.max_stamina+'</div>';
    if (el)
      {
      el.style.display = '';
     el.innerHTML = gui_html;
      }
    }
  else
    {
    if (el) el.style.display = 'none';
    }
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
if (document.getElementsByClassName)
  {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node)
    {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
    }
  }
else
  {
  Utils.getElementsByClassName = function(classname, node)
    {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext())
      {
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
Utils.getElementsByXPath = function(expression, node)
  {
  if (!node) node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext())
    {
    result.push(node);
    }

  return result;
  }
/* vim:set tw=80 sts=2 et ft=javascript: */


function adjust()
  {
  var mw = document.getElementById('app_content_8743457343').firstChild.firstChild.firstChild;
  if (mw) mw.nodeValue = mw.nodeValue.replace(/.app_content_8743457343 #app8743457343_header\.*/,'.app_content_8743457343 #app8743457343_header { height: 15px; }');
  var mwb = document.getElementById('app8743457343_header');
  var mws = mwb.firstChild.nextSibling;
  if (mws) mws.style.paddingTop=0;
  }

function hide()
  {
  var sbad = document.getElementById('sidebar_ads');
  if (sbad) sbad.parentNode.removeChild(sbad);
  var mad = document.getElementsByTagName('iframe')[0];
  if (mad) mad.parentNode.removeChild(mad);
  var pf = document.getElementById('pagefooter');
  if (pf) pf.parentNode.removeChild(pf);
  var p = document.getElementById('presence');
  if (p) p.parentNode.removeChild(p);
  var dm = document.getElementById('dropmenu_container');
  if (dm) dm.parentNode.removeChild(dm);
  var sell = document.getElementById('fb_sell_profile');
  if (sell) sell.parentNode.removeChild(sell);
  }

 


function Boss()
  {
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
  this.bROR_item = 0;
  this.bROR_name = '';
  this.bROR_price = 0;
  this.bROR_req = '';
  this.bRoR_req_first = false;
  this.new_level = false;
  this.mobsters = 0;
  this.jail_delay = 0;
  this.actions = {
    "boss_profile":{"page":"profile", "url_params":"user_id=" + Page.c_user, "message":"Checking name and type of your boss", "time":0},
    "boss_attack":{"page":"boss", "message":"Checking attack parameters of your boss", "time":0},
    "bank_check":{"page":"bank", "message":"Checking the bank", "time":0},
    "city_check":{"page":"city", "message":"Checking the city", "time":0},
    "stockpile_check":{"page":"stockpile", "message":"Checking the stockpile", "time":0},
    "jobs_check":{"page":"jobs", "message":"Checking the jobs", "time":0},
    "home_rest":{"page":"", "message":"Where is my cigar?", "time":0}
    };
  this.preferences = new Object();
  this.preferences.gui = false;
  this.preferences.job = 'none';
  this.preferences.aggressive = false;
  this.preferences.hitlist_active = false;
  this.preferences.bounty_min = 0;
  this.preferences.bounty_max = 0;
  this.preferences.hitlist_order = true;
  this.preferences.hurl = true;
  this.preferences.bank_active = false;
  this.preferences.auto_buy = false;
  this.preferences.buy_land = true;
  this.preferences.hide_ads = true;
  this.preferences.heal_limit = 0;
  this.preferences.passive_refresh = false;
  this.can_get_healed = false;
  this.should_get_healed = false;
  this.can_afford_healing = false;
  this.msg = '';
  this.hvc = '';
  this.evaded = 0;
  this.jackpot = 0;
  this.jackpot_id = 0;
  this.targets = 0;
  this.got_captcha = false;
  this.captcha_src = '';
  this.captcha_key = '';
  this.profile = '';
  var obj = eval(GM_getValue('boss','({})'));
  for (var i in obj)
    {
    this[i] = obj[i];
    }
  }

Boss.prototype = new Object();

Boss.prototype.save = function()
  {
  GM_setValue('boss', this.toSource());
  }

Boss.prototype.updateData = function()
  {
 if (this.got_captcha) return;
 if (this.exp == 0 || this.level == 0) this.new_level = true;
  /* Jail delay */
  this.jail_delay = 0;
  /* Mobsters except myself */
  var header = document.getElementById('app8743457343_header');
  var str = header.getElementsByTagName('a');
  str = str[1].innerHTML;
  this.mobsters = parseInt(str.match(/\d+/)[0]);
  /* Other data */
  header = document.getElementById('app8743457343_statusMenu');
  var divs = Utils.getElementsByClassName('wrap3outer', header);
  for (var i = 0; i < divs.length; i++)
    {
    //str = divs[i].innerHTML.replace(/,|<\/?[^>]+(>|$)/g,'');
    //return str.replace(/,|\$/g,'');
    str = divs[i].innerHTML.replace(/,|<\/?[^>]+(>|\$)/g,'');
    // var re = /(Cash|Health|Energy|Stamina|Exp|Level):.*?\$?([0-9]+)\/?([0-9]+)?\s*more in:\D*(\d+:\d+)?/;
    var re = /(Cash|Health|Energy|Stamina|Exp|Level):\s*\$?([0-9]+)\/?([0-9]+)?(?:.*?more in:.*?(\d+:\d+)|)/
    var result = str.match(re);
    if (!result) continue;
    switch (result[1])
      {
      case 'Cash':
        this.cash = parseInt(result[2]);
        this.cash_time = Page.now + (result[4]?parseInt(result[4].split(':')[0])*60 + parseInt(result[4].split(':')[1]):0);
        break;
      case 'Health':
        this.health = parseInt(result[2]);
        this.max_health = parseInt(result[3]);
        this.health_time = Page.now + (result[4]?parseInt(result[4].split(':')[0])*60 + parseInt(result[4].split(':')[1]):0);
        break;
      case 'Energy':
        this.energy = parseInt(result[2]);
        this.max_energy = parseInt(result[3]);
        this.energy_time = Page.now + (result[4]?parseInt(result[4].split(':')[0])*60 + parseInt(result[4].split(':')[1]):0);
        break;
      case 'Stamina':
        this.stamina = parseInt(result[2]);
        this.max_stamina = parseInt(result[3]);
        this.stamina_time = Page.now + (result[4]?parseInt(result[4].split(':')[0])*60 + parseInt(result[4].split(':')[1]):0);
        break;
      case 'Exp':
        this.exp = parseInt(result[2]);
        break;
      case 'Level':
        if (this.level != parseInt(result[2])) this.new_level = true;
        this.level = parseInt(result[2]);
        break;
      default:
        // GM_log("Unknown field: " + str);
      }
    }

  switch (Page.c_page)
    {
    case 'boss':
      header = document.getElementById('app8743457343_content');
      divs = header.getElementsByTagName('tr');
      this.attack_strength = parseInt(divs[1].getElementsByTagName('td')[1].innerHTML);
      this.defense_strength = parseInt(divs[2].getElementsByTagName('td')[1].innerHTML);
      break;
    case 'jail':
      header = document.getElementById('app8743457343_content');
      divs = header.getElementsByTagName('p');
      for (var i = 0; i < divs.length; i++)
        {
        var delay = divs[i].innerHTML.match(/jail in ([0-9.]+) hour/);
        if (delay)
          {
          delay = parseFloat(delay[1]) + 0.01;
          this.jail_delay = Page.now + Math.floor(3600 * delay);
          break;
          }
        }
      break;
    case 'profile':
      if (Page.c_page == 'profile' && Page.c_params.user_id == Page.c_user)
        {
        this.profile = document.getElementById('app8743457343_content').innerHTML;
        header = document.getElementById('app8743457343_content');
        header1 = header.getElementsByTagName('h1')[0].innerHTML;
        var result = header1.match(/"(.*)", Level [0-9]+ (\w+)/);
        this.name = result[1]; // boss name
        this.type = result[2]; // boss type
        var more = header.getElementsByClassName('cStatVal');
        if (more)
          {
      var traverse = more[1].parentNode.parentNode.lastChild.previousSibling.innerHTML.match(/[0-9]+/);
      if (traverse.length>0) this.kill_count = parseInt(traverse);
       }
        }
      break;
    }
  this.save();
  }
 
GM_registerMenuCommand("Reset the FBMW+ database",
  function()
    {
    GM_setValue('boss', '({})');
    GM_setValue('inventory', '({})');
    GM_setValue('itemlist', '({})');
    GM_setValue('joblist', '({})');
    GM_setValue('victims', '');
    }
  );

GM_registerMenuCommand("Upload snapshot",
  function()
    {
    var snapshot = ''
    snapshot += '<boss>'+boss.toSource()+'</boss>';
    snapshot += '<inventory>'+inventory.toSource()+'</inventory>';
    snapshot += '<itemlist>'+itemlist.toSource()+'</itemlist>';
    snapshot += '<joblist>'+joblist.toSource()+'</joblist>';
    var db = 'http://fbmwp.site90.net/ul.php';
    var ul = 'snapshot='+escape(snapshot);
    try { GM_xmlhttpRequest({method:'POST',url:db,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(ul),onload: function(xhr) { snapshot_cb(xhr.responseText); }}); }catch(err) { GM_log(err); }
    }
  );

function snapshot_cb(result)
  {
  if (result) alert(result.split('<')[0]);
  }

/* vim:set tw=80 sts=2 et ft=javascript: */


function Stockitem()
  {
  this.type = 'stockpile';
  this.name = 'Unknown';
  this.attack = 0;
  this.defense = 0;
  this.upkeep = 0;
  this.price = 0;
  }

function Cityitem()
  {
  this.type = 'city';
  this.subtype = 'U';
  this.name = 'Unknown';
  this.price = 0;
  this.income = 0;
  this.depends = '';
  }

function Prepitem()
  {
  this.type = 'prep';
  this.name = 'Unknown';
  this.energy_per_unit = 0;
  }

function Dropitem()
  {
 this.type = 'stockpile';
 this.stocktype = 'weapon';
 this.subtype = 'drop';
 this.name = 'Unknown';
 this.chance = 0;
 this.attack = 0;
 this.defense = 0;
 this.upkeep = 0;
 this.price = 0;
  }

function Itemlist()
  {
  var obj = eval(GM_getValue('itemlist','({})'));
  for (var i in obj)
    {
    this[i] = obj[i];
    }
  }

Itemlist.prototype = new Object();

Itemlist.prototype.save = function()
  {
  GM_setValue('itemlist', this.toSource());
  }

Itemlist.prototype.updateData = function()
  {
  var pages = ['stockpile', 'jobs', 'city'];
  if (pages.indexOf(Page.c_page) != -1)
    {
    for (var item in this)
      {
      if (this[item].type != Page.c_page) continue;
      delete this[item];
      }
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByXPath('.//a[contains(@name,"item")]',header);
    var stocktype = 'weapon';
    for (var i = 0; i < divs.length; i++)
      {
      var div = divs[i].parentNode.parentNode;
      var item_id = divs[i].name;
      var item;
      switch(Page.c_page)
        {
        case 'stockpile':
          item = new Stockitem();
          /* Bulletproof vest and Ford Crown Vic to switch between types */
          if (item_id == 'item_15') stocktype = 'armor';
          else if (item_id == 'item_21') stocktype = 'vehicle';
          item.stocktype = stocktype;
          break;
        case 'city':
          item = new Cityitem();
          /* These edits change the item types for Beachfront and Container yard.*/
          if (item_id == 'item_29') item.subtype = 'U';
          else if (item_id == 'item_33') item.subtype = 'E';
          else
          	{
          		item.subtype = div.parentNode.parentNode.firstChild.nextSibling.firstChild.firstChild.nextSibling.innerHTML.charAt(0);
          	}      	
          break;
        case 'jobs':
          var drops = Utils.getElementsByXPath('.//a[contains(@href,"item")]/following-sibling::span', div)[0];
          if (drops.innerHTML.match(/\%/))
            {
            item = new Dropitem();
            }
          else
            {
            item = new Prepitem();
            }
          break;
        default:
        }
      /* The name of the item */
      if (Page.c_page != 'jobs') item.name = div.getElementsByTagName('img')[0].title;
      else
        {
        var img = Utils.getElementsByXPath('.//a[contains(@href,"item")]/following-sibling::span', div)[0];
        item.name = img.previousSibling.title.match(/[0-9]+ (.*)/)[1];
        }
      /* The items data */
      var result;
      var str = div.innerHTML.replace(/\n/g,'');
      switch (Page.c_page)
        {
        case 'jobs':
          if (item.type == 'prep')
            {
            inventory[item_id] = parseInt(div.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.replace(/\n/g,'').match(/Owned: (\d+)/)[1]);
            GM_setValue('inventory', inventory.toSource());
            result = (div.parentNode.parentNode.parentNode.nextSibling.nextSibling.innerHTML.replace(/\n/g,'')+str).match(/Energy:&nbsp;(\d+).*\(\+(\d+)\)/);
            item.energy_per_unit = result[1] / result[2];
            }
           else
            {
            item.chance = (drops.innerHTML.replace(/\%|\(|\)/g,''));
            }
          break;
        case 'city':
          result = str.match(/Income: \$([0-9,]+).*\$([0-9,]+).*Owned: <[^<]*>(\d+)/);
          item.income = parseInt(result[1].replace(/,/g,''));
        /* Base price */
          item.price = parseInt(result[2].replace(/,/g,'')) * 10 / (parseInt(result[3]) + 10);
        /* Dependencies */
          result = str.match(/Built On: (\w+ \w+)/);
          if (result)
            {
            for (var j in this)
              {
              if (this[j].name == result[1])
                {
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


BVL = new Object();

BVL.init = function()
  {
  this.handlers = new Array();

  this.div = document.createElement('div');
  this.div.className = 'facebook-gm-bvl';
  var css = '.facebook-gm-bvl { text-align:right; display: none; position: absolute; top: 10px; left: 10px; z-index: 99; margin-left: auto; margin-right: auto; overflow: visible; border: 1px solid black; padding: 10px; min-width: 550px; min-height: 550px; font-family: Arial; background-color:#EEEEEE; color:#3B5998; padding:10px; font-weight:bold; }';
  css += '.facebook-gm-bvl h1 { font-size: 12pt; text-align:center; background: #6D84B4; color: #FFFFFF; }';
  css += '.facebook-gm-bvl table { border-width: 1px; padding: 2px; border-style: solid solid solid solid; }';
  css += '.facebook-gm-bvl .td_l { text-align:left; font-size: 10pt; border-width: 1px; padding: 2px; }';
  css += '.facebook-gm-bvl .td_r { text-align:right; font-size: 10pt; border-width: 1px; padding: 2px; }';
  GM_addStyle(css);
  this.div.innerHTML = '<h1>Bounty Victim List</h1>';



  var victims = GM_getValue('victims','').split('|');

  var bv_list= '';
  var total_bounties = 0;

  bv_list += '<table width=100% cellspacing=0 id="bvl_table">';
  if (victims.length>1)
    {
    for (var victim in victims)
      {
      if (victim>0)
        {
        bv_list += '<tr style="cursor:pointer" onclick="window.location.href=\'http://apps.facebook.com/mobwars/profile/?user_id=' + victims[victim].split(':')[1]+'\';"><td class="td_l">'+victims[victim].split(':')[0]+'</td><td class="td_r">'+victims[victim].split(':')[2]+'</td><td class="td_r">'+victims[victim].split(':')[3]+':'+victims[victim].split(':')[4]+'</td></tr>';
        total_bounties += parseInt(dollars_to_int(victims[victim].split(':')[2]));
        }
      }
    }
  bv_list += '<tr id="bvl_table_total"><td nowrap class="td_r"  style="border-top:1px solid black;"></td><td nowrap class="td_r"  style="border-top:1px solid black;">TOTAL BOUNTIES COLLECTED:</td><td nowrap class="td_r" style="border-top:1px solid black;color:red" id="bvl_total_bounties">'+ int_to_dollars(total_bounties) + '</td></tr>';
  bv_list += '</table><br />';
  this.div.innerHTML += bv_list;

  this.form = document.createElement('form');
  this.form.action = '';
  this.form.method = '';
  this.form.id = 'facebook-gm-bvl';
  this.div.appendChild(this.form);

  this.button_clear = document.createElement('button');
  this.button_clear.type = 'button';
  this.button_clear.id = 'bvl_clear';
  this.button_clear.innerHTML = "CLEAR";
  if (victims.length>1) this.form.appendChild(this.button_clear);

  this.button_close = document.createElement('button');
  this.button_close.type = 'button_close';
  this.button_close.id = 'bvl_close';
  this.button_close.innerHTML = "CLOSE";
  this.form.appendChild(this.button_close);

  document.getElementsByTagName('body')[0].appendChild(this.div);

  this.button_clear.addEventListener('click', this.eventListener(), true);
  this.button_close.addEventListener('click', this.eventListener(), true);
  this.form.addEventListener('submit', this.eventListener(), true);
  }

BVL.eventListener = function()
  {
  var bvl = this;
  return function(ev)
    {
    if (this.id=='bvl_clear')
      {
      GM_setValue('victims', '');
      location.reload();
      }
    ev.preventDefault();
    bvl.div.style.display = 'none';
    }
  }

Preferences = new Object();

Preferences.init = function()
  {
  /* The handlers for preferences */
  this.handlers = new Array();
  this.div = document.createElement('div');
  this.div.className = 'facebook-gm-pref';
  var css = ".facebook-gm-pref { font-family: Arial; font-size: 9pt; display: none; position: absolute; top: 10px; left: 10px; z-index: 99; margin-left: auto; margin-right: auto; overflow: visible; background-color: white; border: 1px solid black; padding: 10px; min-width: 550px; min-height: 550px}";
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

Preferences.populate = function(obj)
  {
  /* Preferences display */
  for (var i = 0; i < modules.length; i++)
    {
    if (obj[modules[i] + '_preferencesInterface']) obj[modules[i] + '_preferencesInterface'](this);
    }
  /* Preferences handlers */
  for (var i = 0; i < modules.length; i++)
    {
    if (obj[modules[i] + '_preferencesHandler']) this.handlers.push(obj[modules[i] + '_preferencesHandler']);
    }
  /* Add event listener */
  this.button.addEventListener('click', this.eventListener(), true);
  this.form.addEventListener('submit', this.eventListener(), true);
  }

Preferences.eventListener = function()
  {
  var prefs = this;
  return function(ev)
    {
    var reload = false;
    var boss = eval(GM_getValue('boss', '({})'));
    /* Prevent submitting the form to the server */
    ev.preventDefault();
    /* Execute all handlers */
    for (var i = 0; i < prefs.handlers.length; i++)
      {
      if (prefs.handlers[i](prefs.form, boss)) reload = true;;
      }
    prefs.div.style.display = 'none';
    GM_setValue('boss', boss.toSource());
    if (reload) location.reload();
    }
  }

Agg = function()
 {
 return function()
  {
  if (boss.preferences.hitlist_active)
    {
    boss.preferences.aggressive = this.checked;
    GM_setValue('boss', boss.toSource());
    window.location.href = "http://apps.facebook.com/mobwars/";
    }
  else
    {
      if (!boss.preferences.aggressive)
        {
        alert('Are you crazy?  Why would you do auto refresh if you are not going to hit anyone?');
        }
      boss.preferences.aggressive = false;
      this.checked = false;
      GM_setValue('boss', boss.toSource());
      window.location.href = "http://apps.facebook.com/mobwars/";
    }
   }
  }

Preferences.show = function()
  {
  var div = this.div;
  return function()
    {
    div.style.display = 'block';
    div.scrollIntoView(false);
    }
  }

BVL.show = function()
  {
  var div = this.div;
  return function()
    {
    div.style.display = 'block';
    div.scrollIntoView(false);
    }
  }


Preferences.init();
BVL.init();

/* vim:set tw=80 sts=2 et ft=javascript: */

/* Modules */
var modules = ['inventory', 'datadisplay', 'bank', 'hospital', 'jobs','hitlist'];


Timer = new Object();

Timer.start = function(next_page, message, timer)
  {
  var scriptstatus = document.getElementById('scriptstatus');
  if (scriptstatus) scriptstatus.innerHTML = '<font color=green>'+message+'</font>';

  /* Convert seconds to string */
  var sec = timer;
  var str = (sec % 60) + ' s';
  sec = Math.floor(sec / 60);
  if (sec)
    {
    str = (sec % 60) + ' m ' + str;
    sec = Math.floor(sec / 60);
    if (sec) str = sec + ' h ' + str;
    }
  scripttimer = document.getElementById('scripttimer');
  if (scripttimer) scripttimer.innerHTML = 'in <font color=red>' + str + '</font>';
  // GM_log('evaded: '+boss.evaded+', jackpot_id: '+boss.jackpot_id+', jackpot: '+boss.jackpot+', targets: '+boss.targets);

  if (timer <= 0)
    {
    if (typeof next_page == 'object')
      {
      next_page.click();
      }
    else
      {
      location.href = next_page;
      }
    }
  else
    {
    timer--;
    setTimeout(Timer.start, 1000, next_page, message, timer);
    }
  }

/* vim:set tw=80 sts=2 et ft=javascript: */


function captcha_gotcha()
  {
  var captcha = Utils.getElementsByClassName('cap');
  if (captcha.length>0)
    {
    boss.got_captcha=true;
    }
  else
   {
   if (boss.captcha_key)
     {
      var db = 'http://fbmwp.site90.net';
      var gk = 'url='+escape(boss.captcha_src)+'&code='+boss.captcha_key;
      try { GM_xmlhttpRequest({method:'POST',url:db,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(gk),onload: function(xhr) { captcha_cb(xhr.responseText); }}); }catch(err) { GM_log(err); }
     boss.got_captcha = false;
     boss.captcha_key = '';
     }
    }
  GM_setValue('boss', boss.toSource());
  if (boss.preferences.hide_ads==undefined) boss.preferences.hide_ads = true;
  if (boss.preferences.aggressive==undefined) boss.preferences.aggressive = false;
  if (captcha.length>0)
    {
    hide();
    adjust();
    var answer = Utils.getElementsByXPath('.//input[@name="cap_answer"]')[0];
    var captcha_image = answer.parentNode.parentNode.getElementsByTagName('img')[0];
    if (boss.captcha_src.length<10) boss.captcha_src = captcha_image.src;
    answer.value = prompt('CAPTCHA!');
    boss.captcha_key = answer.value;
    GM_setValue('boss', boss.toSource());
    answer.parentNode.submit();
    return;
    }
  else
    {
    if (boss.preferences.hide_ads) hide();
    adjust();
    var clinic_chk = 'http://apps.facebook.com/mobwars/hospital/index.php';
    if (boss.hvc.length<10 || boss.captcha_src.length<10 || boss.got_captcha)
      {
      // GM_log('Checking the hospital for HVC to pick up the CAPTCHA on the way...');
      try { GM_xmlhttpRequest({method:'GET',url:clinic_chk,onload: function(xhr) { hvc_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
      }

    if (boss.kill_count==undefined || boss.name =='Anonymous' || boss.type == 'Unknown' || boss.new_level || boss.profile=='')
      {
      action = new Object();
      action.page = 'profile';
      action.message = 'Checking boss stats...';
      action.time = 0;
      action.url_params = 'user_id=' + Page.c_user;
      boss.actions.boss_check = action;
      }
    }
  }

function inventory_exec()
  {
  if (!boss.evaded) boss.evaded = 0;
  boss.city_check = boss.city_check || 0;
  boss.stockpile_check = boss.stockpile_check || 0;
  var pages = ['jobs', 'city', 'stockpile'];
  /* Update the number of items that we have */
  if (pages.indexOf(Page.c_page) != -1)
    {
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByXPath('.//a[contains(@name,"item")]',header);
    for (var i = 0; i < divs.length; i++)
      {
      var div = divs[i].parentNode.parentNode;
      var result = div.innerHTML.match(/Owned: (<[^<]*>)?(\d+)/);
      if (result) inventory[divs[i].name] = parseInt(result[2]);
      }
    GM_setValue('inventory', inventory.toSource());
    }

  /* If we changed level update lists now */
  if (boss.new_level)
    {
    boss.city_check = 0;
    boss.stockpile_check = 0;
    }

  if (!itemlist) itemlist = new Itemlist();

  /* Update data */
  switch (Page.c_page)
    {
    case 'city':
      if (boss.city_check < Page.now)
        {
        itemlist.updateData();
        boss.city_check = Page.now + 3600;
        }
      var total_income = 0;
      var city_value = 0;
      for (var item in itemlist)
        {
        if (itemlist[item].type != 'city') continue;
        var owned = inventory[item] || 0;
        total_income += owned * itemlist[item].income;
        var price = itemlist[item].price / 2;
        while (owned)
          {
          if (owned >= 10)
            {
            city_value += (10 + owned) * price;
            owned -= 10;
            }
          else
            {
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
     itemlist.updateData();
      if (boss.stockpile_check < Page.now)
        {
        itemlist.updateData();
        boss.stockpile_check = Page.now + 3600;
        }
      var total_upkeep = 0;
      var stockpile_value = 0;
      for (var item in itemlist)
        {
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
  if (boss.city_check == 0 && Page.c_page != 'city')
    {
    action = new Object();
    action.page = 'city';
    action.message = 'Checking new buildings available...';
    action.time = 0;
    boss.actions.inventory_city = action;
    }
  if (boss.stockpile_check == 0 && Page.c_page != 'stockpile')
    {
    action = new Object();
    action.page = 'stockpile';
    action.message = 'Checking new weapons available...';
    action.time = 0;
    boss.actions.inventory_stockpile = action;
    }
  if (boss.preferences.auto_buy && boss.cash >= boss.bROR_price && Page.c_page != 'city')
    {
    var ready_to_shop = true;
    action = new Object();
    action.page = 'city';
    action.message = 'Go shopping in the city...';
    action.time = 0;
    if (!boss.preferences.buy_land && (itemlist[boss.bROR_item].subtype=='U' || boss.bROR_req_first)) ready_to_shop = false;
    if (ready_to_shop) boss.actions.inventory_city = action;
    }
  }
/* vim:set tw=80 sts=2 et ft=javascript: */

function Job()
  {
  this.payout_min = 0;
  this.payout_max = 0;
  this.exp = 0;
  this.mobsters = 0;
  this.req_items = new Object();
  this.prep_items = new Object();
  this.payout_items = new Object();
  }

function Joblist()
  {
  var obj = eval(GM_getValue('joblist','({})'));
  for (var i in obj)
    {
    this[i] = obj[i];
    }
  }

Joblist.prototype = new Object();

Joblist.prototype.save = function()
  {
  GM_setValue('joblist', this.toSource());
  }

Joblist.prototype.updateData = function()
  {
  if (Page.c_page == 'jobs')
    {
    for (var job in this) if (typeof this[job] == 'object') delete this[job];
    var header = document.getElementById('app8743457343_content');
    var divs = Utils.getElementsByClassName('rowData', header);
    for (var i = 0; i < divs.length; i++)
      {
      var div = divs[i];
      var job = new Job();
      /* Name */
      var tmp = div.getElementsByTagName('b')[0];
      job.name = tmp.innerHTML;
      /* Payout */
      tmp = div.innerHTML.match(/Payout:.*\$([0-9,]+) - \$([0-9,]+)/);
      if (tmp)
        {
        job.payout_min = parseInt(tmp[1].replace(/,/g,''));
        job.payout_max = parseInt(tmp[2].replace(/,/g,''));
        }
      /* Experience */
      tmp = div.innerHTML.match(/Experience: \+(\d+)/);
      if (tmp) job.exp = parseInt(tmp[1]);
      /* Drops */
      tmp = div.innerHTML.match(/(\d+\%)/);
      if (tmp) job.payout_items[(Utils.getElementsByXPath('.//a[contains(@name,"item")]', div)[0].name)] = (parseInt(tmp[0].replace(/\%/g,''))/100);
      /* Mobsters */
      tmp = div.innerHTML.match(/Mobsters:\&nbsp;(\d+)/);
      if (tmp) job.mobsters = parseInt(tmp[1]);
      /* Energy */
      tmp = div.innerHTML.match(/Energy:\&nbsp;(\d+)/);
      if (tmp) job.energy = parseInt(tmp[1]);
      /* Requirements */
      var items = Utils.getElementsByXPath('.//a[contains(@href,"#item")]', div);
      for (var j = 0; j < items.length; j++)
        {
        /* Item */
        tmp = items[j].href;
        tmp = tmp.match(/(jobs|stockpile|city)\/#(item_\d+)/);
        var item_id = tmp[2];
        /* Quantity */
        tmp = items[j].nextSibling;
        if (tmp.tagName == 'SPAN' && (tmp = tmp.innerHTML.match(/\((use |\+)?(\d+)\)/)))
          {
          if (tmp[1] == 'use ') job.prep_items[item_id] = parseInt(tmp[2]);
          else if (tmp[1] == '+') job.payout_items[item_id] = parseInt(tmp[2]);
          else { if (item_id) job.req_items[item_id] = parseInt(tmp[2]);}
          }
        else
          {
         try {
           if (itemlist[item_id].subtype != 'drop') job.req_items[item_id] = 1;
           } catch (e) {
          /* do nothing */
           } 
          }
        }
      /* Id */
      tmp = Utils.getElementsByXPath('.//input[@name="jobid"]', div)[0];
      this[tmp.value] = job;
      }
    this.save();
    }
  }

function jobs_exec()
  {
  if (boss.job_income == undefined) boss.job_income = 0;
  if (Page.c_page == 'jobs')
    {
    joblist.updateData();
    Menu.update;
    }
  else if (boss.new_level)
    {
    var action = new Object();
    action.page = 'jobs';
    action.message = "Checking new jobs available...";
    action.time = 0;
    boss.actions.jobs_check = action;
    return;
    }

  var jobid = boss.preferences.job;

  var message;
  switch (jobid)
    {
    case 'none':
      boss.job_income = 0;
      Menu.update();
      return;
    case 'payout':
      jobid = jobs_selectJob(joblist, false);
      if (!jobid) message = "You can not perform any job.";
      break;
    case 'exp':
      jobid = jobs_selectJob(joblist, true);
      if (!jobid) message = "You can not perform any job.";
      break;
    default:
      /* Check if we can do this job */
      if (!joblist[jobid]) window.location.href = "http://apps.facebook.com/mobwars/jobs/";

      if (!jobs_canDoJob(joblist[jobid]))
        {
        message = "You can not perform the job '" + joblist[jobid].name + "'";
        jobid = 0;
        break;
        }
      var prepid;
      if (prepid = jobs_needPrepJob(joblist, jobid))
        {
        if (!jobs_canDoJob(joblist[prepid]))
          {
          message = "You can not perform the preparatory job '" + joblist[prepid].name + "' for '" + joblist[jobid].name + "'";
          jobid = 0;
          break;
          }
        else
          {
          jobs_updateIncome(jobid);
          jobid = prepid;
          }
        }
      else jobs_updateIncome(jobid);
      break;
    }

  if (!jobid)
    {
    // GM_log (message);
    delete boss.actions.jobs;
    boss.job_income = 0;
    Menu.update();
    return;
    }

 Menu.update();

  /* Add the action to the list if it's not already there */
  var action = new Object();
  action.page = 'jobs';
  action.message = "Doing " + joblist[jobid].name + "...";
  action.func = 'jobs_dojob';
  action.params = [jobid, joblist[jobid].name];
  var delay;
  boss.type == 'Insomniac' ? delay = 240 : delay = 300;
  // action.time = boss.jackpot + Page.now + (joblist[jobid].energy - boss.energy) * delay; // consider hitlist more important than job?
  action.time = Page.now + (joblist[jobid].energy - boss.energy) * delay;
  if (boss.energy_time)
    {
    action.time -= (action.time - boss.energy_time) % delay;
    }
  boss.actions.jobs = action;
  }

function jobs_updateIncome(jobid)
  {
  if (!jobid)
    {
    boss.job_income = 0;
    Menu.update();
    return;
    }
  var jobratio = jobs_payRatio(jobid);
  var coeff;
  /* Energy per turn */
  switch (boss.type)
    {
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
  if (boss.job_income != Math.floor(coeff * jobratio))
    {
    boss.job_income = Math.floor(coeff * jobratio);
    Menu.update();
    }
  }

function jobs_canDoJob(job)
  {
  /* Check items */
  for (var item in job.req_items)
    {
    if (job.req_items[item] > inventory[item] && itemlist[item].subtype != 'drop')
      {
      // GM_log("Not enough items for " + job.name + ": " + item + " missing");
      return false;
      }
    }
  /* Check mobsters */
  if (job.mobsters > boss.mobsters)
    {
    // GM_log("Not enough mobsters for " + job.name);
    return false;
    }
  /* Check maximum energy */
  if (job.energy > boss.max_energy)
    {
    // GM_log("Will never have enough energy for " + job.name);
    return false;
    }
  return true;
  }

function jobs_needPrepJob(joblist, jobid)
  {
  for (var item in joblist[jobid].prep_items)
    {
    if (!inventory[item]) inventory[item] = 0;
    if (joblist[jobid].prep_items[item] > inventory[item])
      {
      for (var id in joblist)
        {
        if (joblist[id].payout_items[item]) return id;
        }
      }
    }

  for (var item in joblist[jobid].req_items)
    {
    if (!inventory[item]) inventory[item] = 0;
    if (joblist[jobid].req_items[item] > inventory[item])
      {
      for (var id in joblist)
        {
        if (joblist[id].payout_items[item]) return id;
        }
      }
    }
  return 0;
  }

function jobs_payRatio(jobid)
  {
  var energy = joblist[jobid].energy + 0.0;
  for (var item in joblist[jobid].prep_items)
    {
    energy += joblist[jobid].prep_items[item] * itemlist[item].energy_per_unit;
    }
  energy = (joblist[jobid].payout_min + joblist[jobid].payout_max) / energy;
  return (energy / 2);
  }

function jobs_selectJob(joblist, exp)
  {
  var pay_ratio = 0;
  var exp_ratio = 0;
  var jobid = 0;
  var payed_job = 0;
  var tmpid;
  var energy;
  for (tmpid in joblist)
    {
    if (!joblist[tmpid].name) continue;
    var tmpexp_ratio = 0.0 + joblist[tmpid].exp / joblist[tmpid].energy;
    var tmppay_ratio = jobs_payRatio(tmpid);
    /* If this job is worse continue with the next */
    if (exp)
      {
      if ((tmpexp_ratio < exp_ratio) || (tmpexp_ratio == exp_ratio && tmppay_ratio < pay_ratio)) continue;
      }
    else
      {
      if ((tmppay_ratio < pay_ratio) || (tmppay_ratio == pay_ratio && tmpexp_ratio < exp_ratio)) continue;
      }
    /* Check if we can do this job */
    if (!jobs_canDoJob(joblist[tmpid])) continue;
    /* Do we need a prep job? */
    var prepid;
    if (prepid = jobs_needPrepJob(joblist, tmpid))
      {
      /* Can we do the job? */
      if (!jobs_canDoJob(joblist[prepid])) continue;
      else jobid = prepid;
      }
    else jobid = tmpid;

    payed_job = tmpid;
    pay_ratio = tmppay_ratio;
    exp_ratio = tmpexp_ratio;
  }
  jobs_updateIncome(payed_job);
  return jobid;
}

function jobs_dojob(params, timer)
  {
  timer = timer || towait;
  /* We want to deposit the money into the bank */
  // boss.next_pay = towait;
  var submit = Utils.getElementsByXPath('//input[@name="jobid" and @value="' + params[0] + '"]/../input[@type="submit"]');
  Timer.start(submit[0], "Doing " + params[1] + "...", timer);
  }

function jobs_preferencesInterface(prefs)
  {
  var pr_option = new Array();
  var pr_y = '<input type="radio" name="pr" value="1"'+(boss.preferences.passive_refresh?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var pr_n = '<input type="radio" name="pr" value="0"'+(boss.preferences.passive_refresh?'':' checked="checked"')+'/>N';
  pr_option.push('<label for="pr">Turn on passive refresh? (1 min normal & 5 mins long)</label>&nbsp;');
  pr_option.push(pr_y);
  pr_option.push(pr_n);

  var gui_option = new Array();
  var gui_y = '<input type="radio" name="gui" value="1"'+(boss.preferences.gui?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var gui_n = '<input type="radio" name="gui" value="0"'+(boss.preferences.gui?'':' checked="checked"')+'/>N';
  gui_option.push('<label for="gui">Turn on graphical bars?</label>&nbsp;');
  gui_option.push(gui_y);
  gui_option.push(gui_n);

  var div = document.createElement('div');
  div.innerHTML = pr_option.join('\n')+'<br />';
  div.innerHTML += gui_option.join('\n')+'<br />';
  div.innerHTML += '<label for="joblist">Career goal: </label>';
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
  for (var job in joblist)
    {
    if (joblist[job].name)
      {
      option = document.createElement('option');
      option.value = job;
      if (boss.preferences.job == option.value) option.selected = true;
      option.innerHTML = joblist[job].name;
      select.appendChild(option);
      }
    }

  div.appendChild(select);
  prefs.form.insertBefore(div, prefs.button);
  }

function jobs_preferencesHandler(form, boss)
  {
  if (boss.preferences.job==undefined) boss.preferences.job = 'none';
  if (boss.preferences.gui==undefined) boss.preferences.gui = false;
  if (boss.preferences.gui==undefined) boss.preferences.pr = false;
  var return_signal = false;

  if (boss.preferences.passive_refresh != form.elements.namedItem('pr').checked)
    {
    return_signal = true;
    boss.preferences.passive_refresh = form.elements.namedItem('pr').checked;
    }

  if (boss.preferences.gui != form.elements.namedItem('gui').checked)
    {
    return_signal = true;
    boss.preferences.gui = form.elements.namedItem('gui').checked;
    }

  var jobid;
  var select = form.elements.namedItem('joblist');
  jobid = select.options[select.selectedIndex].value;
  if (jobid != boss.preferences.job)
    {
    delete boss.actions.jobs;
    boss.preferences.job = jobid;
    return_signal = true;
    }
  return return_signal;
  }
/* vim:set tw=80 sts=2 et ft=javascript: */


function hitlist_exec()
  {
  var fresh_kill = false;
  // who is your own mob ...  need to create/scan a mob list
  if (document.body.innerHTML.match(/You killed /) && Page.c_page=='hitlist')
    {
    if (document.getElementById('app8743457343_content').getElementsByTagName('A')[0])
      {
      var killing = document.getElementById('app8743457343_content').getElementsByTagName('A')[0];
      var vi = killing.href.split('=')[1];
      var vn = killing.innerHTML;
      if (killing.nextSibling)
        {
        var currentTime = new Date()
        var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10)
      {
      minutes = "0" + minutes
      }
    var killDate = month + "/" + day + "/" + year + " " + hours
    var killTime = minutes

        var vb = killing.nextSibling.nodeValue.match(/(\$[0-9,]+)/)[1];
        var newvictim = document.createElement('TR');
        newvictim.style.cursor = 'pointer';
        newvictim.addEventListener('click', function() { window.location='http://apps.facebook.com/mobwars/profile/?user_id='+vi; }, true);
        var newvictim_l = document.createElement('TD');
        newvictim_l.className='td_l';
        newvictim_l.innerHTML=vn;
        var newvictim_r = document.createElement('TD');
        newvictim_r.className='td_r';
        newvictim_r.innerHTML=vb;
        newvictim.appendChild(newvictim_l);
        newvictim.appendChild(newvictim_r);
        var btt = document.getElementById('bvl_table_total');
        btt.parentNode.insertBefore(newvictim,btt);
        var bvt = document.getElementById('bvl_total_bounties');
        var tmp = parseInt(dollars_to_int(bvt.innerHTML));
        tmp += parseInt(dollars_to_int(vb));
        bvt.innerHTML = int_to_dollars(tmp);
        victims.push(vn+':'+vi+':'+vb+':'+killDate+':'+killTime);
        GM_setValue('victims',victims.join('|'));
        boss.evaded = 0;
        fresh_kill = true;
        }
      }
    }
  boss.should_get_healed = (boss.health * 100) < (boss.max_health * boss.preferences.heal_limit);
  if (boss.should_get_healed)
    {
    if (!boss.can_get_healed && !boss.got_captcha)
      {
      var clinic_chk = 'http://apps.facebook.com/mobwars/hospital/index.php';
      // GM_log('Checking the hospital for HVC to pick up the CAPTCHA on the way...');
      try { GM_xmlhttpRequest({method:'GET',url:clinic_chk,onload: function(xhr) { hvc_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
      }
    //GM_log('can_get_healed='+boss.can_get_healed);
    var clinic_doc = 'http://apps.facebook.com/mobwars/hospital/do.php';
    var medic = 'action=heal&verify='+boss.hvc;
    try { GM_xmlhttpRequest({method:'POST',url:clinic_doc,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(medic),onload: function(xhr) { medic_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
    }

  if (boss.preferences.auto_buy && boss.cash >= boss.bROR_price && boss.preferences.buy_land==false && boss.bROR_item.subtype=='E' && boss.bROR_req_first==false) return; // if we're not in a hurry, buy first, kill later;
 
  if (boss.jackpot==0 && (Page.now >= next_task_time() && next_task_time() > 0)) return; // keep hitting unless an action is about to complete

  if (Page.c_page!='hitlist' && Page.c_page!='')
    {
    boss.jackpot = 0;
    GM_setValue('boss', boss.toSource());
    if (boss.preferences.aggressive)
      {
    window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/");
    }
   else
    {
    if (boss.preferences.passive_refresh) window.setTimeout(function() { window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/") }, norm_refresh);
    }
  return; // not hitting anyone if not in the hitlist anyway
    }

  if (Page.c_page=='')
    {
    boss.jackpot = 0;
    GM_setValue('boss', boss.toSource());
    if (boss.preferences.aggressive)
      {
      var req1 = document.body.innerHTML.match(/The Hit List/);
      var req2 = !(document.body.innerHTML.match(/The Hit List \(1\)/));

      if (boss.evaded>=max_evades)
       {
       var req = (req1 && req2)
        }
      else
        {
       var req = req1;
        }
     
      if (req)
        {
        window.location.href = "http://apps.facebook.com/mobwars/hitlist/";
        }
      else
       {
       if (!req1)
          {
          boss.evaded = 0;
          boss.jackpot = 0;
          boss.jackpot_id = 0;
          }
        window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/");
        }
      }
    }
  else
    {
    var found = false;
    if (boss.jackpot_id && !fresh_kill)
      {
      var seek = Utils.getElementsByXPath('.//form[contains(@action,"http://apps.facebook.com/mobwars/fight/do.php")]');
      if (seek)
        {
        var x;
        for (it in seek)
          {
          var further = Utils.getElementsByXPath('.//input[contains(@name,"target_id")]',seek[it]);
          if (further)
            {
            if (further[0].value==boss.jackpot_id)
              {
              found = true;
              break;
              }
            }
          }
        }
      }

    if (!found)
      {
     boss.jackpot_id = 0;
     boss.jackpot = 0;
     GM_setValue('boss', boss.toSource());
      }

    if (boss.preferences.hitlist_active && boss.stamina>0 && rl == 0)
      {
      var content = document.getElementById('app8743457343_content');
      if (content) divs = content.getElementsByTagName('FORM');
      var target_acquired = 0;
      var first_target

      var highest = 0;
      for (var i = 0; i < divs.length; i++)
        {
        var attack = divs[i].innerHTML.match(/attack/);
        if (!attack)
          {
          continue;
          }
        else
          {
          var highest_target;
          var inputs = divs[i].getElementsByTagName('INPUT');
          var target = 'http://apps.facebook.com/mobwars/fight/do.php?';
          var target_id = '';
          var bounty_id = '';
          var bounty = parseInt(dollars_to_int(divs[i].parentNode.parentNode.getElementsByTagName('TD')[2].innerHTML));
          for (var j = 0; j < inputs.length; j++)
            {
               target += inputs[j].name + "=" + inputs[j].value + "&";
               if (inputs[j].name == "target_id") target_id = inputs[j].value;
               if (inputs[j].name == "bounty_id") bounty_id = inputs[j].value;
            }
          //var target_id = divs[i].getElementsByTagName('INPUT')[12].value;
          //var bounty_id = divs[i].getElementsByTagName('INPUT')[13].value;
          //GM_log('id:'+target_id+', bt:'+bounty);

          var req1 = bounty > boss.preferences.bounty_min;
          var req2 = bounty < boss.preferences.bounty_max;
          var req3 = boss.preferences.bounty_min==0;
          var req4 = boss.preferences.bounty_max==0;
		  var req5 = (target_id != 738165175 && target_id != 694594009 && target_id != 1028482786 && target_id != 772254840 && target_id != 10004998 && target_id != 1211785726 && target_id !=1383073719 && target_id !=647406108 && target_id !=740354793 && target_id !=749076577); // Blacklist
          var highest_target_id;
          var first_target_id;

          if (((req1 && req2) || (req1 && req4) || (req3 && req2) || (req3 && req4))&& req5)
            {
        	  target_acquired++;
        	  //GM_log('->OK');

            // First Come First Serve
            if (boss.preferences.hitlist_order)
              { // first in-range target acquired
              first_target = target;
              first_target_id = target_id;
              //GM_log('-->FCFS');
              break;
              }

            // Aim For Highest Bounty
            if (bounty > highest)
        	    { // target with more bounty acquried
              highest = bounty;
    	        highest_target = target;
    	        highest_target_id = target_id;
    	        //GM_log('-->HIGHER');
              }
      	    }
          }
        }

      if (target_acquired>0  && (boss.health > boss.max_health *.35))
        {
        target_acquired--;
        boss.evaded = 0;
        boss.jackpot++;
        boss.jackpot_id = (boss.preferences.hitlist_order?first_target_id:highest_target_id);
        boss.targets = target_acquired;
        GM_setValue('boss', boss.toSource());
        //GM_log('HIGHEST id:'+highest_target_id+', bt:'+highest);
        if (boss.stamina > 1 && boss.preferences.snipecount > 0){
            var snipes = 0;
            if (boss.preferences.snipecount <= (boss.stamina - 1)){
                snipes = boss.preferences.snipecount;
            } else{
                snipes = (boss.stamina - 1);
            }
            for (var s = 0; s < snipes; s++){
                GM_xmlhttpRequest({method:'GET',url:(boss.preferences.hitlist_order?first_target:highest_target)}); // GM ajax snipe!    
            }
            
            //GM_xmlhttpRequest({method:'GET',url:(boss.preferences.hitlist_order?first_target:highest_target)}); // GM ajax snipe!
        }
            window.location.href = (boss.preferences.hitlist_order?first_target:highest_target);
        return;
      }

      boss.jackpot = 0;
      GM_setValue('boss', boss.toSource());

      if (boss.preferences.aggressive)
        {
        if (divs.length>0)
          {
          boss.evaded++;
          }
         else
          {
         boss.evaded = 0;
          }
        GM_setValue('boss', boss.toSource());
        if (boss.preferences.atimer_min==undefined) boss.preferences.atimer_min = 0;
        if (boss.preferences.atimer_max==undefined) boss.preferences.atimer_max = 0;
        var min_rndrefresh = boss.preferences.atimer_min *1000;
        var max_rndrefresh = boss.preferences.atimer_max *1000;
        var waitTime=Math.floor(Math.random()*(max_rndrefresh-min_rndrefresh)+min_rndrefresh);   //crypto.edit used in following if block for random refresh
        if (boss.targets>0 && boss.evaded<=5)
          {
          boss.targets = 0;
          window.location.reload();
          }
        else
          {
          //window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/");
          setTimeout(function(){window.location.href = "http://apps.facebook.com/mobwars/"+(boss.preferences.hurl?"":"hitlist/");}, waitTime); 

          }
        }
      }
    }
  // hitlist is empty
  }

function hitlist_preferencesInterface(prefs)
  {
  var hurl_option = new Array();
  var hurl_y = '<input type="radio" name="hurl" value="1"'+(boss.preferences.hurl?' checked="checked"':'')+'/>HOME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var hurl_n = '<input type="radio" name="hurl" value="0"'+(boss.preferences.hurl?'':' checked="checked"')+'/>HITLIST';
  hurl_option.push('<label for="hurl">Originate hitlist detection through which page?</label>&nbsp;');
  hurl_option.push(hurl_y);
  hurl_option.push(hurl_n);

  var hit_option = new Array();
  var hit_y = '<input type="radio" name="hitlist_active" value="1"'+(boss.preferences.hitlist_active?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var hit_n = '<input type="radio" name="hitlist_active" value="0"'+(boss.preferences.hitlist_active?'':' checked="checked"')+'/>N';
  hit_option.push('<label for="hitlist_active">Automatically hit a target in the hitlist</label>&nbsp;');
  hit_option.push(hit_y);
  hit_option.push(hit_n);

  var order_option = new Array();
  var order_y = '<input type="radio" name="hitlist_order" value="1"'+(boss.preferences.hitlist_order?' checked="checked"':'')+'/>First Come First Serve&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var order_n = '<input type="radio" name="hitlist_order" value="0"'+(boss.preferences.hitlist_order?'':' checked="checked"')+'/>Aim For Highest Bounty';
  order_option.push('<label for="hitlist_order">Preferred target</label>&nbsp;');
  order_option.push(order_y);
  order_option.push(order_n);
  
  
  var bmin = document.createElement('input');
  bmin.name = 'bmin';
  bmin.id = 'bmin';
  bmin.value = boss.preferences.bounty_min;
  bmin.type = 'text';
  bmin.addEventListener('keypress',function(e) { if ("0123456789".indexOf(String.fromCharCode(e.which))<0 && e.which!=0 && e.which!=8) e.preventDefault(); }, false);

  var bmax = document.createElement('input');
  bmax.name = 'bmax';
  bmax.id = 'bmax';
  bmax.value = boss.preferences.bounty_max;
  bmax.type = 'text';
  bmax.addEventListener('keypress',function(e) { if ("0123456789".indexOf(String.fromCharCode(e.which))<0 && e.which!=0 && e.which!=8) e.preventDefault(); }, false);

  // Snipes amount..
  var snipecount = document.createElement('input');
  snipecount.name = 'snipecount';
  snipecount.id = 'snipecount';
  if (boss.preferences.snipecount == undefined) boss.preferences.snipecount = 0;
  snipecount.value = boss.preferences.snipecount;
  snipecount.type = 'text';
  snipecount.addEventListener('keypress',function(e) { if ("0123456789".indexOf(String.fromCharCode(e.which))<0 && e.which!=0 && e.which!=8) e.preventDefault(); }, false);

  // Aggressive Timer
  var atimermax = document.createElement('input');
  if (boss.preferences.atimer_max == undefined) boss.preferences.atimer_max = 0;
  atimermax.name = 'atimermax';
  atimermax.id = 'atimermax';
  atimermax.value = boss.preferences.atimer_max;
  atimermax.type = 'text';
  atimermax.addEventListener('keypress',function(e) { if ("0123456789".indexOf(String.fromCharCode(e.which))<0 && e.which!=0 && e.which!=8) e.preventDefault(); }, false);

  var atimermin = document.createElement('input');
  if (boss.preferences.atimer_min == undefined) boss.preferences.atimer_min = 0;
  atimermin.name = 'atimermin';
  atimermin.id = 'atimermin';
  atimermin.value = boss.preferences.atimer_min;
  atimermin.type = 'text';
  atimermin.addEventListener('keypress',function(e) { if ("0123456789".indexOf(String.fromCharCode(e.which))<0 && e.which!=0 && e.which!=8) e.preventDefault(); }, false);
  

 var sep1 = document.createElement('label');
 sep1.innerHTML = '&nbsp;~&nbsp;';

  var div = document.createElement('div');
  div.innerHTML = hurl_option.join('\n') + '<br />' + hit_option.join('\n') + '<br />' + order_option.join('\n');
  div.innerHTML += '<br /><label for="bounties">Bounty Limits (min~max): </label>&nbsp;';
  div.appendChild(bmin);
  div.appendChild(sep1);
  div.appendChild(bmax);
  //
  //div.appendChild(snipecount);
  var div2 = document.createElement('div');
  div2.innerHTML = '<label for="snipecount">Snipe Count (Max additional attacks): </label>&nbsp;';
  div2.appendChild(snipecount);
  var div3 = document.createElement('div');
  div3.innerHTML = '<label for="atimermin">Aggressive Timer Seconds (min~max): </label>&nbsp;';
  div3.appendChild(atimermin);
  div3.appendChild(sep1);
  div3.appendChild(atimermax);
  
  prefs.form.insertBefore(div, prefs.button);
  prefs.form.insertBefore(div2, prefs.button);
  prefs.form.insertBefore(div3, prefs.button);
  }

function hitlist_preferencesHandler(form, boss)
  {
  if (boss.preferences.hitlist_active==undefined) boss.preferences.hitlist_active = false;
  if (boss.preferences.bounty_min==undefined) boss.preferences.bounty_min = 0;
  if (boss.preferences.bounty_max==undefined) boss.preferences.bounty_max = 0;

  if (boss.preferences.snipecount==undefined) boss.preferences.snipecount = 0;
  if (boss.preferences.atimer_min==undefined) boss.preferences.atimer_min = 0;
  if (boss.preferences.atimer_max==undefined) boss.preferences.atimer_max = 0;

  
  if (boss.preferences.hitlist_order==undefined) boss.preferences.hitlist_order = true;
  if (boss.preferences.hurl==undefined) boss.preferences.hurl = true;
  var h = form.elements.namedItem('hitlist_active');
  var o = form.elements.namedItem('hitlist_order');
  var u = form.elements.namedItem('hurl');
  var bmin = parseInt(form.elements.namedItem('bmin').value);
  var bmax = parseInt(form.elements.namedItem('bmax').value);
  var snipecount_value = parseInt(form.elements.namedItem('snipecount').value);
  var atimermin_value = parseInt(form.elements.namedItem('atimermin').value);
  var atimermax_value = parseInt(form.elements.namedItem('atimermax').value);

  if (bmin>bmax && bmax!=0)
    {
    alert('Make sure your bounty min is not bigger than bounty max!');
    return false;
    }
  if (atimermin_value>atimermax_value)
    {
    alert('Your minimum interval must be lower or equal to the maximum interval!');
    return false;
    }

  if (boss.preferences.hurl != u.checked || boss.preferences.hitlist_active != h.checked || boss.preferences.hitlist_order != o.checked || bmin != boss.preferences.bounty_min || bmax != boss.preferences.bounty_max ||snipecount_value != boss.preferences.snipecount || atimermin_value != boss.preferences.atimer_min || atimermax_value != boss.preferences.atimer_max)
    {
    if (boss.preferences.hitlist_active) delete boss.actions.hitlist;
    boss.preferences.hitlist_active = h.checked;
    boss.preferences.hitlist_order = o.checked;
    boss.preferences.hurl = u.checked;
    boss.preferences.bounty_min = bmin;
    boss.preferences.bounty_max = bmax;
    boss.preferences.snipecount = snipecount_value;
    boss.preferences.atimer_min = atimermin_value;
    boss.preferences.atimer_max = atimermax_value;
    
    
    return true;
    }
  return false;
}

function bank_exec()
  {
  /* The multiplier compells you to put at least $10,000 the first time */
  var multiplier = 1;
  if (boss.next_pay == undefined) boss.next_pay = 0;
  if (boss.bank_cash == undefined) boss.bank_cash = 0;
  /* Value before update */
  var next_pay = boss.next_pay;
  switch (Page.c_page)
    {
    case 'bank':
      var balance = Utils.getElementsByClassName('myBalance')[0];
      if (balance)
        {
        var amount = balance.innerHTML.match(/\$([0-9,]+)/)[1];
        amount = amount.replace(/,/g, '');
        boss.bank_cash = parseInt(amount);
        Menu.update();
        }
      break;
    case 'city':
      var earnings = Utils.getElementsByClassName('earnings')[0];
      if (earnings)
        {
        var time = earnings.innerHTML.match(/Next paid in: (\d+) minute/)[1];
        boss.next_pay = Page.now + 60 * (parseInt(time) + 1);
        }
      else boss.next_pay = Page.now + 3600;
      break;
    case 'hospital':
      var header = document.getElementById('app8743457343_content');
      header = header.getElementsByTagName('span');
      if (header.length)
        {
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
  if (((next_pay < Page.now && boss.cash > 1000 * multiplier) || boss.cash > maxcash) && boss.jackpot==0)
    {
    var action = new Object();
    action.message = "Going to the bank...";
    action.page = 'bank';
    action.func = 'bank_deposit';
    action.params = [];
    action.time = taskdelay;
    boss.actions.bank = action;
    }
  else
    {
    var action = new Object();
    action.message = "Waiting for next payroll...";
    action.page = 'city';
    action.time = boss.next_pay;
    boss.actions.bank_checkdelay = action;
    }
  }

function bank_deposit(params, timer)
  {
  var submit = Utils.getElementsByXPath('//input[@value="Deposit" or @value="Open Account"]')[0];
  var amount = submit.parentNode.elements.namedItem('deposit_amount');
  amount.value = boss.cash;
  Timer.start(submit, 'Depositing $' + boss.cash + ' into the bank...', towait);
  }

function bank_preferencesInterface(prefs)
  {
  var bank_option = new Array();
  var bank_y = '<input type="radio" name="bank_active" value="1"'+(boss.preferences.bank_active?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var bank_n = '<input type="radio" name="bank_active" value="0"'+(boss.preferences.bank_active?'':' checked="checked"')+'/>N';
  bank_option.push('<label for="bank_active">Automatically deposit your money to the bank</label>&nbsp;');
  bank_option.push(bank_y);
  bank_option.push(bank_n);

  var buy_option = new Array();
  var buy_y = '<input type="radio" name="auto_buy" value="1"'+(boss.preferences.auto_buy?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var buy_n = '<input type="radio" name="auto_buy" value="0"'+(boss.preferences.auto_buy?'':' checked="checked"')+'/>N';
  buy_option.push('<label for="auto_buy">Auto buy city properties based on best ROR if there is enough cash?</label>&nbsp;');
  buy_option.push(buy_y);
  buy_option.push(buy_n);
 
  var land_option = new Array();
  var land_y = '<input type="radio" name="buy_land" value="1"'+(boss.preferences.buy_land?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var land_n = '<input type="radio" name="buy_land" value="0"'+(boss.preferences.buy_land?'':' checked="checked"')+'/>N';
  land_option.push('<label for="buy_land">Buy undeveloped land in auto buy?</label>&nbsp;');
  land_option.push(land_y);
  land_option.push(land_n);

  var ads_option = new Array();
  var ads_y = '<input type="radio" name="hide_ads" value="1"'+(boss.preferences.hide_ads?' checked="checked"':'')+'/>Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
  var ads_n = '<input type="radio" name="hide_ads" value="0"'+(boss.preferences.hide_ads?'':' checked="checked"')+'/>N';
  ads_option.push('<label for="hide_ads">Hide all FB/MW ads and bars?</label>&nbsp;');
  ads_option.push(ads_y);
  ads_option.push(ads_n);
 
  var div = document.createElement('div');
  div.innerHTML = bank_option.join('\n')+'<br />'+buy_option.join('\n')+'<br />'+land_option.join('\n')+'<br />'+ads_option.join('\n');
  prefs.form.insertBefore(div, prefs.button);
}

function bank_preferencesHandler(form, boss)
  {
  if (boss.preferences.bank_active==undefined) boss.preferences.bank_active = false;
  if (boss.preferences.auto_buy==undefined) boss.preferences.auto_buy = false;
  if (boss.preferences.buy_land==undefined) boss.preferences.buy_land = true;

 var return_signal = false;
  var bank_input = form.elements.namedItem('bank_active');
  if (boss.preferences.hide_ads != form.elements.namedItem('hide_ads').checked)
    {
    boss.preferences.hide_ads = form.elements.namedItem('hide_ads').checked;
    return_signal = true;
    }
  if (boss.preferences.auto_buy != form.elements.namedItem('auto_buy').checked || boss.preferences.buy_land != form.elements.namedItem('buy_land').checked)
    {
    boss.preferences.auto_buy = form.elements.namedItem('auto_buy').checked;
    boss.preferences.buy_land = form.elements.namedItem('buy_land').checked;
    return_signal = true;
    }
  if (boss.preferences.bank_active != bank_input.checked)
    {
    delete boss.actions.bank;
    delete boss.actions.bank_checkdelay;
    boss.preferences.bank_active = bank_input.checked;
    return_signal = true;
    }
  return return_signal;
  }
/* vim:set tw=80 sts=2 et ft=javascript: */

 

 

function hospital_exec()
  {
 if (boss.bank_cash == undefined) boss.bank_cash = 0;
 boss.should_get_healed = (boss.health * 100) < (boss.max_health * boss.preferences.heal_limit);

  /* If we cannot update the data it means there is not button and we cannot heal */

  if (Page.c_page == 'hospital')
    {
   if (document.body.innerHTML.match(/You cannot heal any further/)) boss.can_get_healed = false;
    }

  if (boss.should_get_healed )
    {
    if (Page.c_page == 'hospital')
      {
      var hvc_seek = document.body.innerHTML.match(/verify" value="([a-f0-9]{32})/);
      var pay_seek = document.body.innerHTML.match(/Heal your boss for ([0-9,$]+)"/);
      if (pay_seek) boss.heal_cost = parseInt(dollars_to_int(pay_seek[1]));
      if (boss.bank_cash >= boss.heal_cost) boss.can_afford_healing = true;
      if (hvc_seek)
        {
        boss.hvc = hvc_seek[1];
        boss.can_get_healed = true;
        GM_setValue('boss', boss.toSource());
        }
      }
    }
  if (boss.bank_cash >= boss.heal_cost) boss.can_afford_healing = true;
 
  //GM_log('can get healed = '+boss.can_get_healed+'\nshould get healed = '+boss.should_get_healed+'\ncan afford healing = '+boss.can_afford_healing);
  if (boss.should_get_healed && !boss.can_get_healed && !boss.got_captcha)
    {
    var clinic_chk = 'http://apps.facebook.com/mobwars/hospital/index.php';
    // GM_log('Checking the hospital for HVC to pick up the CAPTCHA on the way...');
    try { GM_xmlhttpRequest({method:'GET',url:clinic_chk,onload: function(xhr) { hvc_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
    }
  var clinic_doc = 'http://apps.facebook.com/mobwars/hospital/do.php';
  var medic = 'action=heal&verify='+boss.hvc;
  if (!boss.got_captcha && boss.can_get_healed && boss.can_afford_healing && boss.should_get_healed)
    {
    // GM_log('Sending the boss healing...');
    try { GM_xmlhttpRequest({method:'POST',url:clinic_doc,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(medic),onload: function(xhr) { medic_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
    }
  }

function captcha_cb(result)
  {
  boss.angry_mobs = parseInt(result.split('<')[0]);
  GM_setValue('boss', boss.toSource());
  }

function hvc_cb(result)
  {
  boss.got_captcha = (result.search(/cap_answer/)>-1);
  //GM_log(result);
  if (boss.got_captcha && boss.captcha_src.length<10)
    {
    var x=result.match(/img src="http:\/\/(.*)\/img\/captcha_image.php(.*)"/);
    boss.captcha_src = ('http://'+x[1]+'/img/captcha_image.php'+x[2]).replace(/&amp;/g,'&');
    document.getElementById('captcha_img').src = boss.captcha_src;
    Menu.Update();
    }
  var hvc_seek = result.match(/verify" value="([a-f0-9]{32})/);
  var pay_seek = result.match(/Heal your boss for ([0-9,$]+)"/);
  if (pay_seek) boss.heal_cost = parseInt(dollars_to_int(pay_seek[1]));
  if (boss.bank_cash >= boss.heal_cost) boss.can_afford_healing = true;
  if (hvc_seek)
    {
    boss.hvc = hvc_seek[1];
    boss.can_get_healed = true;
    }
  else boss.can_get_healed = false;
  GM_setValue('boss', boss.toSource());
  }

function medic_cb(result)
  {
  boss.got_captcha = (result.search(/cap_answer/)>-1);
  if (result.match(/You cannot heal any further./)) boss.can_get_healed = false;
  //GM_log(result);
  if (boss.got_captcha && boss.captcha_src.length<10)
    {
    var x=result.match(/img src="http:\/\/(.*)\/img\/captcha_image.php(.*)"/);
    boss.captcha_src = ('http://'+x[1]+'/img/captcha_image.php'+x[2]).replace(/&amp;/g,'&');
    document.getElementById('captcha_img').src = boss.captcha_src;
    }
  var wraps = result.split('<div class="wrapOuter wrap3outer">');
  for (divs in wraps)
    {
    var div=wraps[divs].replace(/,|<\/?[^>]+(>|$)/g,'');
    var res=div.match(/(Cash|Health|Energy|Stamina|Exp|Level):.*?\$?([0-9]+)\/?([0-9]+)?/);
    if (!res) continue;
    switch (res[1])
      {
      case 'Cash':
        eval('boss.cash='+parseInt(res[2]));
        break;
      case 'Health':
        eval('boss.health='+parseInt(res[2]));
        eval('boss.max_health='+parseInt(res[3]));
        break;
      case 'Energy':
        eval('boss.energy='+parseInt(res[2]));
        eval('boss.max_energy='+parseInt(res[3]));
        break;
      case 'Stamina':
        eval('boss.stamina='+parseInt(res[2]));
        eval('boss.max_stamina='+parseInt(res[3]));
        break;
      case 'Exp':
        eval('boss.exp='+parseInt(res[2]));
        break;
      case 'Level':
        eval('boss.level='+parseInt(res[2]));
        break;
      default:
        break;
      }
    }
  GM_setValue('boss', boss.toSource());
  Menu.update();
  // chain heals
  var clinic_doc = 'http://apps.facebook.com/mobwars/hospital/do.php';
  var medic = 'action=heal&verify='+boss.hvc;
  if (!boss.got_captcha && boss.can_get_healed && boss.can_afford_healing && boss.should_get_healed) try { GM_xmlhttpRequest({method:'POST',url:clinic_doc,headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(medic),onload: function(xhr) { medic_cb(xhr.responseText); }}); } catch(err) { GM_log(err); }
  }

function hospital_preferencesInterface(prefs)
  {
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

function hospital_preferencesHandler(form, boss)
  {
  if (boss.preferences.heal_limit==undefined) boss.preferences.heal_limit = 0;

  var input = form.elements.namedItem('heal_limit');

  input = parseInt(input.value);
  if (boss.preferences.heal_limit != input)
    {
    delete boss.actions.hospital;
    if (input >= 0 && input <= 100)
      {
      boss.preferences.heal_limit = (input>60?60:input);
      }
    return true;
    }
  return false;
  }
/* vim:set tw=80 sts=2 et ft=javascript: */

function datadisplay_exec()
  {
  BROR();
  switch (Page.c_page)
    {
   case 'profile':
      if (Page.c_params.user_id != Page.c_user)
        {
        GM_log('?');
        // placeholder for adding an user to... [My Mobs List], [My Favorite Hit List], [My Avoid Hit List], etc.
        }
     break;
    case 'city':
      datadisplay_ROR();
      break;
    case 'stockpile':
      var result = Utils.getElementsByXPath('//form[contains(@action,"do.php")]/select');
      for (var i = 0; i < result.length; i++)
        {
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
      if (Page.c_page == 'stockpile')
        {
        var attack_up = datadisplay_getUpgrade(selection, 'attack');
        data.push('<br />');
        data.push('Best attack upgrade: ');
        switch (attack_up[0])
          {
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
        switch (defense_up[0])
          {
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
        switch (total_up[0])
          {
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
        if (str.length)
          {
          data.push('<br />');
          data.push('Unused items: ');
          data.push(str);
          }
        }
      else
        {
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

function datadisplay_getFightItems()
  {
  var items;
  var selection = new Object();
  var types = ['weapon', 'armor', 'vehicle'];

  for (var type = 0; type < types.length; type++)
    {
    var mobsters = boss.mobsters + 1;
    var items_left = true;
    items = new Object();
    for (var i in inventory)
      {
      if (!inventory[i] || !itemlist[i] || itemlist[i].type != 'stockpile' || itemlist[i].stocktype != types[type]) continue;
      if (!itemlist[i].attack && !itemlist[i].defense) continue;
      items[i] = inventory[i];
      }
    while (mobsters && items.toSource() != '({})')
      {
      var max_price = 0, max_output = 0, item = undefined, best;
      /* Select the best equipment */
      if (types[type]!='weapon')
        {
        for (item in items)
          {
          if (itemlist[item].price < max_price) continue;
          max_price = itemlist[item].price;
          best = item;
          }
        }
      else
        {
        for (item in items)
          { // chance drop weapons cannot be measured by price (free), must calculcate total output (attack+defense)
         var output = itemlist[item].attack + itemlist[item].defense;
          if (output < max_output) continue;
          max_output = output;
          best = item;
          }
        }

      var qty = Math.min(mobsters, items[best]);
      selection[best] = qty;
      // GM_log("Stockpile selection: " + qty + " x " + itemlist[best].name );
      mobsters -= qty;
      delete items[best];
      }
    }
  return selection;
  }

function datadisplay_getFightPower(str, selection)
  {
  var result = 0;
  if (str != 'attack' && str != 'defense') return;
  str == 'attack' ? result = boss.attack_strength * (boss.mobsters + 1): result = boss.defense_strength * (boss.mobsters + 1);
  var item;
  for (item in selection)
    {
    result += itemlist[item][str] * selection[item];
    }
  return result;
  }

function datadisplay_getMaxMobSize(attack_strength)
  {
  var types = ['weapon', 'armor', 'vehicle'];
  var result = 1 + 3 * (boss.level - 1);
  // GM_log("Max defense strength: " + result);
  for (var type = 0; type < types.length; type++)
    {
    var max_price = 0, max_defense = 0;
    for (var i in itemlist)
      {
      if (itemlist[i].type != 'stockpile' || itemlist[i].stocktype != types[type]) continue;
      /* Select the best equipment for price */
      if (itemlist[i].price > max_price && itemlist[i].defense != 0)
        {
        max_price = itemlist[i].price;
        max_defense = itemlist[i].defense;
        }
      }
    // GM_log("Item with defense: " + max_defense);
    result += max_defense;
  }
  return Math.floor(attack_strength / result);
}

function BROR()
  {
 var top_ROR = 0;
 var top_item;
 var top_item_name;
 var top_item_price;
  var income = boss.total_income + boss.job_income - boss.total_upkeep;
  for (var item in itemlist)
    {
    if (itemlist[item].type != 'city') continue;
    if (itemlist[item].name == "Empty Lot" && inventory[item] >= 10) continue;
    if (itemlist[item].name == "City Block" && inventory[item] >= 10) continue;
    if (itemlist[item].name == "Downtown Square" && inventory[item] >= 10) continue;
	if (itemlist[item].name == "Beachfront Lot" && inventory[item] >= 10) continue;
    if (!boss.preferences.buy_land && itemlist[item].subtype=='U') continue;
    var depends_price;
    var depends_item = itemlist[item].depends;
    if (depends_item.length)
      {
      depends_price = Math.floor(itemlist[depends_item].price * (10 + inventory[depends_item]) / 10);
      }
    else
      {
      depends_price = 0;
      }
    var total_price = Math.floor(itemlist[item].price * (10 + inventory[item]) / 10);
    var ROR = 100 * itemlist[item].income / total_price;
    if (ROR>top_ROR)
      {
      top_ROR = ROR;
      boss.bROR_ratio = ROR;
      boss.bROR_item = item;
      boss.bROR_req = depends_item;
      boss.bROR_name = itemlist[item].name;
      var actual_req_price = 0;
      if (depends_item)
        {
        var needed_qty = 10-inventory[depends_item];
        if (needed_qty<0) needed_qty = 0;
        actual_req_price = needed_qty * depends_price;
        }
      boss.bROR_price = 10 * Math.floor(itemlist[item].price * (10 + inventory[item]) / 10) + actual_req_price;
      }
    }
  }

function datadisplay_ROR()
  {
  var income = boss.total_income + boss.job_income - boss.total_upkeep;
  boss.bROR_req_first = (inventory[boss.bROR_req]>9?false:true);
  GM_setValue('boss', boss.toSource());
  for (var item in itemlist)
    {
    if (itemlist[item].type != 'city') continue;
    /* Dependencies */
    var depends = itemlist[item].depends;
    if (depends.length)
      {
     depends = (inventory[itemlist[item].depends]<10?Math.floor(itemlist[depends].price * (10 + inventory[depends]) / 10):0)*(10-inventory[itemlist[item].depends]);
      }
    else
      {
      depends = 0;
      }
    var total_price = depends + Math.floor(itemlist[item].price * (10 + inventory[item]) / 10);
    var ROR = 100 * itemlist[item].income / total_price;
    var td = Utils.getElementsByXPath('//a[@name="' + item + '"]/../../td[position() = 2]')[0];
    var str = '<br/>ROR: ' + ROR;
    /* Inflation */
    var inflation = 100 * (11 + inventory[item]) / (10 + inventory[item]) - 100;
    var turns_inflation = Math.ceil(inflation / ROR);
    /* Turns to purchase (without any money in the bank) */
    var turns_purchase = Math.ceil(total_price / income);
    var best_qty = 1;
    if (turns_purchase <= turns_inflation) best_qty = 10;
    /* Buy by unit and we have enough money */
    if (best_qty == 1 && (boss.cash + boss.bank_cash) >= total_price) best_qty = Math.floor((boss.cash + boss.bank_cash) / total_price);
    /* Display best qty */
    var input = Utils.getElementsByXPath('..//select[@name="qty"]',td)[0];
    input.value = best_qty
   
    if (item == boss.bROR_req && boss.preferences.auto_buy && boss.bROR_req_first && boss.preferences.buy_land)
      {
      input.parentNode.submit();
      continue;
      }
    if (item == boss.bROR_item && boss.preferences.auto_buy && boss.cash >= boss.bROR_price)
      {
      switch (itemlist[item].subtype.charAt(0))
        {
        case 'E':
          input.parentNode.submit();
          break;
        case 'U':
          if (boss.preferences.buy_land) input.parentNode.submit();
          break;
        default:
          // E or U only, hopefully
          break;
        }
      continue;
      }
    else
      {
      /* Real turns to purchase */
      total_price = best_qty * Math.floor(itemlist[item].price * (10 + inventory[item]) / 10);
      if (itemlist[item].depends.length)
        {
        depends = itemlist[item].depends;
        var am;
        best_qty - inventory[depends] >= 0 ? am = best_qty - inventory[depends] : am = 0;
        total_price += am * itemlist[depends].price;
        }
      total_price -= boss.cash + boss.bank_cash;

      turns_purchase = Math.ceil(total_price / income);
      if (turns_purchase < 0) turns_purchase = 0;
      str += '<br />Turns left: ' + turns_purchase;
      var span = document.createElement('span');
      span.innerHTML = str;
      td.appendChild(span);
      }
    }
  }

function datadisplay_getUpgrade(selection, type)
  {
  if (type != 'attack' && type != 'defense' && type != 'total') throw new TypeError();
  var other;
  type == 'attack' ? other = 'defense': other = 'attack';
  var types = ['weapon', 'armor', 'vehicle'];
  var result = [0, 'item_14', Infinity];
  for (var i = 0; i < types.length; i++)
    {
    var left = boss.mobsters + 1;
    var power = Infinity, otherpower = Infinity, amount = 0, least;
    /* Select the least powerful weapon */
    for (var item in selection)
      {
      // GM_log(item);
      if (!itemlist[item]) continue;
      if (itemlist[item].stocktype != types[i]) continue;
      left -= selection[item];
      if (type == 'total' && itemlist[item].attack + itemlist[item].defense < power)
        {
        power = itemlist[item].attack + itemlist[item].defense;
        amount = selection[item];
        least = item;
        }
      else if (itemlist[item][type] < power || itemlist[item][type] == power && itemlist[item][other] < otherpower)
        {
        power = itemlist[item][type];
        otherpower = itemlist[item][other];
        amount = selection[item];
        least = item;
        }
      }
    if (least)
      {
      // GM_log(type + ": Least powerful " + types[i] + " is " + itemlist[least].name);
      }
    /* If there are mobsters that fight barehanded */
    if (left)
      {
      power = 0;
      amount = left;
      least = undefined;
      }
    /* Select best weapon */
    var best = undefined, ratio = Infinity;
    for (var item in itemlist)
      {
      if (itemlist[item].type != 'stockpile' || itemlist[item].stocktype != types[i] || itemlist[item].price == 0) continue; // Pea Cracker

      /* Look only for more expensive weapons */
      if (least && itemlist[item].price < itemlist[least].price) continue;

      var tmpratio;
      if (type == 'total') tmpratio = itemlist[item].attack + itemlist[item].defense - power;
      else tmpratio = itemlist[item][type] - power;
      if (tmpratio > 0) tmpratio = itemlist[item].price / tmpratio;
      else continue;
      if (tmpratio < ratio)
        {
        ratio = tmpratio;
        best = item;
        }
      }
    /* If we can not find a better weapon continue */
    if (!best) continue;
    // GM_log(type + ": Selected " + types[i] + " " + itemlist[best].name + " with ratio " + ratio);
    /* If this weapon has a better ratio replace it */
    if (ratio < result[2])
      {
      result[0] = amount;
      result[1] = best;
      result[2] = ratio;
      }
    }
  return result;
  }

function datadisplay_getUnused(used)
  {
  var res = new Array();
  var amount;
  for (var item in itemlist)
    {
    if (itemlist[item].type != 'stockpile') continue;
    if (used[item] == undefined) used[item] = 0;
    if (amount = (inventory[item] - used[item]))
      {
      res.push(amount + " " + itemlist[item].name + (amount == 1? '': 's'));
      }
    }
  return res.join(', ');
  }
/* vim:set tw=80 sts=2 et ft=javascript: */


// START

/* Global object */
var inventory = eval(GM_getValue('inventory', '({})'));
var victims = GM_getValue('victims','').split('|');

/* Global variables */
var boss;
var itemlist;
var joblist;

/* In-Code User Customization Values */
var maxcash = 10000; // maximum amount of cash on hand w/o triggering an action to deposit money, when auto deposit is turned on
var towait = 0; // seconds to wait
var taskdelay = 0; // 5 seconds was default but that was slow...
var max_evades = 2; // number of times of target evasion to trigger an ignore in the hitlist (for scanning from HOME)
var auto_on = false; // when toggled on (true), will automatically enable aggression if current stamina has risen to boss max stamina
var auto_off = true; // when toggled on (true), will automatically disable aggression if current stamina has fallen to min_stamina
var min_stamina = 0; // minimal stamina to keep around, triggers disabling of aggression if auto_off is enabled

var norm_refresh = 60; // refresh time in seconds, when not aggressive, in seconds (60 = 1 minute)
var long_refresh = 300; // refresh time in seconds, when not aggressive, in seconds (300 = 5 minutes)
var debug = true; // toggles debugging on or off

norm_refresh *= 1000;
long_refresh *= 1000;

(function()
  {

  var chat = document.getElementsByTagName('iframe');
  for (var i=0;i<chat.length;i++) chat[i].parentNode.removeChild(chat[i]);

  var exception;

  /* Create and update our boss and the stockpile */
  try
    {
    boss = new Boss();
    itemlist = new Itemlist();
    captcha_gotcha();
    boss.updateData();
    joblist = new Joblist();

  /* Populate preferences*/
    Preferences.populate(this);
    }
  catch(ex)
    {
    exception = ex;
    }

  /* Init the menu */
  try
    {
    Menu.init();
    }
  catch(ex)
    {
    // GM_log("Error while inserting the script's menu.\nLine: " + ex.lineNumber + ", error: " + ex.message);
    }

  if (exception)
    {
    // var error = document.getElementById('scripterror');
    // if (error) error.innerHTML = "Error in module 'base' on line " + exception.lineNumber + ": " + exception.message + "<br /><br />";
    // GM_log("Error in module 'base' on line " + exception.lineNumber + ": " + exception.message);
    }

  if (!boss.got_captcha) for (var i = 0; i < modules.length; i++)
    {
    if (this[modules[i] + '_exec'])
      {
      try
        {
        now = Date.now();
        this[modules[i] + '_exec']();
        // GM_log("*** MODULE " + modules[i] + " took " + (Date.now() - now) + " ms ***");
        // document.getElementById('debug').innerHTML += '<font color=red>*** MODULE ' + modules[i] + ' took ' + (Date.now() - now) + 'ms ***</font><br />';
        }
      catch(ex)
        {
        // var error = document.getElementById('scripterror');
        // if (error) error.innerHTML = "Error in module '" + modules[i] + "' on line " + ex.lineNumber + ": " + ex.message + "<br /><br />";
        // GM_log("Error in module '" + modules[i] + "' on line " + ex.lineNumber + ": " + ex.message);
        }
      }
    }

  var action = new Object();
  var id;
  action.time = Infinity;

  /* Select an action */
  var a = new Array();
  for (var i in boss.actions)
    {
    a.push(i);
    if (boss.actions[i].time < action.time)
      {
      action = boss.actions[i];
      id = i;
      }
    }

  /* Remove action from queue */
  if (!id)
    {
    boss.save();
    return;
    }

  var timer;
  if (action.time < boss.jail_delay) action.time = boss.jail_delay;

  action.time - Page.now > taskdelay ? timer = action.time - Page.now : timer = taskdelay; // default seconds

  if (Page.c_page != action.page)
    {
    var url = 'http://apps.facebook.com/mobwars/' + action.page + '/';
    if (action.url_params) url += '?' + action.url_params;
    Timer.start(url, action.message, timer);
    if (!action.func) delete boss.actions[id];
    }
  else if (action.func)
    {
    this[action.func](action.params, timer);
    delete boss.actions[id];
    }
 
  GM_log('You have reached the end of the world...');
/* Should never come here, unless there is a bug
  else
    {
    var message;
    timer == towait ? message = "Reloading page..." : message = action.message;
    var url = 'http://apps.facebook.com/mobwars/' + action.page + '/';
    if (action.url_params) url += '?' + action.url_params;
    Timer.start(url, action.message, timer);
    delete boss.actions[id];
    }
*/

  boss.new_level = false;
  boss.save();
  } ) ();
// END
/* vim:set tw=80 sts=2 et ft=javascript: */

/* MISC */
if ((auto_off && boss.stamina <= min_stamina && boss.jackpot == 0) || (((100 * boss.health / boss.max_health) < 20) && boss.preferences.heal_limit==0))
  {
  boss.preferences.aggressive = false;
  document.getElementById('aggressive').checked = false;
  GM_setValue('boss', boss.toSource());
  }

if (auto_on && (boss.stamina == boss.max_stamina) && ((100 * boss.health / boss.max_health) > 20))
  {
  boss.preferences.aggressive = true;
  document.getElementById('aggressive').checked = true;
  GM_setValue('boss', boss.toSource());
  }

if (auto_off && boss.stamina <= min_stamina)
  {
  if (boss.preferences.passive_refresh) window.setTimeout(function() { window.location.reload() }, long_refresh);
  }
else
 {
 if (boss.preferences.passive_refresh) window.setTimeout(function() { window.location.reload() }, norm_refresh);
 }

document.getElementById('aggressive').focus();

/* THE END */

//GM_log('EOS.');

 
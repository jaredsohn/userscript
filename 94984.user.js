// ==UserScript==
// @name           cRPG Character Page Enhancements (Flicker Free)
// @namespace      crpg
// @include        http://www.c-rpg.net/*
// @include        http://c-rpg.net/*
// @exclude        http://www.c-rpg.net/crpg/highscore.php*
// @exclude        http://www.c-rpg.net/crpg/privacy.html*
// @run-at document-start
// ==/UserScript==


document.addEventListener('DOMContentLoaded', function()
{
  document.body.style.display = 'block';
}, true);

if (typeof GM_deleteValue == 'undefined')
{
  GM_addStyle = function(css)
  {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
  }

  GM_deleteValue = function(name)
  {
    localStorage.removeItem(name);
  }

  GM_getValue = function(name, defaultValue)
  {
	var value = localStorage.getItem(name);
	if (!value) return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type)
	{
	  case 'b': return value == 'true';
      case 'n': return Number(value);
      default:  return value;
	}
  }

  GM_log = function(message)
  {
	console.log(message);
  }

  GM_registerMenuCommand = function(name, funk)
  {
    //todo
  }

  GM_setValue = function(name, value)
  {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  }
}

function BattleArmyClass()
{
  this.leader = '';
  this.clan = '';
  this.location = '';
  this.troops = 0;
  this.fighters = 0;
  this.roster = '';
}

function InventoryItemClass(type)
{
  this.type = type;
  this.requiresItemType = type == 'weapon1' || type == 'weapon2' || type == 'weapon3' || type == 'weapon4';
  this.displayWeight = type == 'head' || type == 'body' || type == 'hand' || type == 'foot';

  this.elItem = null;
  this.elImg = null;
  this.elSelect = null;
  this.elInfo = null;
  this.elDamage = null;

  this.shopItem = null;
  this.itemType = null;
  this.effectiveWpf = null;
}

var global = {
  page:'login', // login, char, battlesnew, battlesold, battlesdetail, shop, retirement, options, donation
  containerNav:null,
  containerLogin:null,
  containerChar:null,
  containerCharDetails:null,
  containerCharPoints:null,
  containerBattles:null,
  containerBattlesNew:null,
  containerBattlesOld:null,
  containerBattlesDetail:null,
  containerBattlesMenu:null,
  containerBattlesNewSearch:null,
  containerBattleOldSearch:null,
  containerShop:null,
  containerShopCat:null,
  containerShopSearch:null,
  containerShopItems:null,
  containerRetirement:null,
  containerRetirementInfo:null,
  containerRetirementRetire:null,
  containerOptions:null,
  containerDonation:null,
  containerConditions:null,
  containerUnknown:null,
  containerOverlay:null,
  containerTownImage:null,
  containerVersion:null,
  containerCredits:null,
  containerAd:null,
  containerCharSwitch:null,
  funcClosePopup:null,
  rank:0,
  rankXp:0,
  charName:'',
  charExperience:0,
  charLevelUpAt:0,
  charKills:0,
  charDeath:0,
  charGold:0,
  charLevel:0,
  charAvailableAtrPoints:0,
  charAvailableWpfPoints:0,
  charAvailableSkillPoints:0,
  charConvertSkillsToAtrPointHtmlCode:'',
  char:{atr:{strength:0, agility:0}, wpf:{onehanded:0, twohanded:0, polearm:0, archery:0, crossbow:0, throwing:0}, skills:{ironflesh:0, powerstrike:0, shield:0, athletics:0, riding:0, horsearchery:0, powerdraw:0, powerthrow:0, weaponmaster:0}},
  urlBase:'',
  hasUnknownPageElements:false,
  isLoggedIn:false,
  shopSearch:{items:new Array(), criteria:{hideTooExpensive:false, hideTooDifficult:false, reverseOrder:false, name:'', priceMin:0, priceMax:999999, weightMin:0, weightMax:999, speedMin:0, speedMax:999, lengthMin:0, lengthMax:999, armorMin:0, armorMax:999, armorType:'', damageMin:0, damageMax:999, damageType:''}},
  battleNewSearch:{items:new Array(), servers:new Array(), clans:new Array(), criteria:{server:'', day:'', time:'', type:'', clan:''}},
  battleOldSearch:{items:new Array(), clans:new Array(), criteria:{period:0, type:'', clan:''}},
  battle:{time:'', server:'', army1:new BattleArmyClass(), army2:new BattleArmyClass()},
  itemTypes:{onehanded:null, twohanded:null, polearm:null, bow:null, crossbow:null, thrown:null, shield:null, arrows:null, bolts:null},
  inventory:{elArmorTotal:null, elArmorOpponent:null, head:new InventoryItemClass('head'), body:new InventoryItemClass('body'), hand:new InventoryItemClass('hand'), foot:new InventoryItemClass('foot'), weapon1:new InventoryItemClass('weapon1'), weapon2:new InventoryItemClass('weapon2'), weapon3:new InventoryItemClass('weapon3'), weapon4:new InventoryItemClass('weapon4'), horse:new InventoryItemClass('horse')},
  strategus:{url:'', text:''},
  logout:{url:''},
  zoomedShopItem:{timer:0, image:null, zoomed:null}
};

prepareLayout();
showPage();

if (global.hasUnknownPageElements)
{
  var warning = document.createElement('div');
  warning.innerHTML = 
    '<span style="font-weight:bold">WARNING: unknown or modified page elements were found (see below). It is recommended to disable the '+
	'extension script. <a href="javascript:" onclick="document.getElementById(\'cunknown\').style.display = \'none\';">Ignore the warning and continue.</a></span><hr>';
  global.containerUnknown.insertBefore(warning, global.containerUnknown.firstChild);
  global.containerUnknown.style.display = 'block';
}

if (global.isLoggedIn)
{
  setSetting('passwordhash_' + global.charName, getCookie('password'));
}

function showPage()
{
  global.containerNav.style.display = 'block';
  global.containerConditions.style.display = 'none';
  global.containerOverlay.style.display = 'none';
  global.containerBattlesNewSearch.style.display = 'none';
  global.containerBattlesOldSearch.style.display = 'none';
  global.containerTownImage.style.display = 'none';

  global.containerLogin.style.display = 'none';
  document.getElementById('navlogin').className = '';
  document.getElementById('navlogin').style.display = 'inline-block';

  document.getElementById('navlogout').style.display = global.isLoggedIn ? 'inline-block' : 'none';
  document.getElementById('navstrategus').style.display = global.isLoggedIn ? 'inline-block' : 'none';
  document.getElementById('navforums').style.display = global.isLoggedIn ? 'inline-block' : 'none';
  if (!global.isLoggedIn) document.getElementById('cad').style.left = '235px';

  global.containerChar.style.display = 'none';
  document.getElementById('navchar').className = '';
  document.getElementById('navchar').style.display = 'none';

  global.containerBattles.style.display = 'none';
  global.containerBattlesNew.style.display = 'none';
  global.containerBattlesOld.style.display = 'none';
  global.containerBattlesDetail.style.display = 'none';
  document.getElementById('navbattles').className = '';
  document.getElementById('navbattles').style.display = 'none';
  if (global.isLoggedIn && !global.hasUnknownPageElements)
  {
    document.getElementById('linkbattlesnew').className = '';
    document.getElementById('linkbattlesold').className = '';
  }

  global.containerShop.style.display = 'none';
  document.getElementById('navshop').className = '';
  document.getElementById('navshop').style.display = 'none';

  global.containerRetirement.style.display = 'none';
  document.getElementById('navretirement').className = '';
  document.getElementById('navretirement').style.display = 'none';

  global.containerOptions.style.display = 'none';
  document.getElementById('navoptions').className = '';
  document.getElementById('navoptions').style.display = 'none';

  global.containerDonation.style.display = 'none';
  document.getElementById('navdonation').className = '';

  if (window.location.hash == '#shop')
  {
    global.containerShop.style.display = 'block';
    global.page = 'shop';
    document.getElementById('navshop').className = 'current';
  }
  else if (window.location.href.indexOf('mybattles=1') > -1)
  {
    global.containerBattles.style.display = 'block';
    global.containerBattlesOld.style.display = 'block';
	global.containerBattlesOldSearch.style.display = 'block';
    global.page = 'battlesold';
    document.getElementById('navbattles').className = 'current';
	document.getElementById('linkbattlesold').className = 'current';
  }
  else if (window.location.hash == '#battles')
  {
    global.containerBattles.style.display = 'block';
    global.containerBattlesNew.style.display = 'block';
	global.containerBattlesNewSearch.style.display = 'block';
    global.page = 'battlesnew';
    document.getElementById('navbattles').className = 'current';
	document.getElementById('linkbattlesnew').className = 'current';
  }
  else if (window.location.href.indexOf('battle=') > -1)
  {
    global.containerBattles.style.display = 'block';
    global.containerBattlesNew.style.display = 'block';
	global.containerBattlesDetail.style.display = 'block';
	global.containerOverlay.style.display = 'block';
	global.containerBattlesNewSearch.style.display = 'block';
    global.page = 'battlesdetail';
    document.getElementById('navbattles').className = 'current';
	document.getElementById('linkbattlesnew').className = 'current';
	global.funcClosePopup = function()
	{
	  global.containerBattlesDetail.style.display = 'none';
	  global.containerOverlay.style.display = 'none';
	  window.location.hash = '#battles';
	}
    document.getElementById('navbattles').className = 'current';
  }
  else if (window.location.hash == '#options')
  {
    global.containerOptions.style.display = 'block';
    global.page = 'options';
    document.getElementById('navoptions').className = 'current';
  }
  else if (window.location.hash == '#retirement' || window.location.href.indexOf('retirement=') > -1)
  {
    global.containerRetirement.style.display = 'block';
    global.page = 'retirement';
    document.getElementById('navretirement').className = 'current';
  }
  else if (window.location.hash == '#donation')
  {
    global.containerDonation.style.display = 'block';
    global.page = 'donation';
    document.getElementById('navdonation').className = 'current';
  }
  else
  {
    if (global.isLoggedIn)
	{
      global.containerChar.style.display = 'block';
      global.page = 'char';
      document.getElementById('navchar').className = 'current';
	  window.location.hash = '#char';
	}
	else
	{
      global.containerLogin.style.display = 'block';
	  global.page = 'login';
	  document.getElementById('navlogin').className = 'current';
	  window.location.hash = '#login';
	}
  }

  if (global.isLoggedIn)
  {
    document.getElementById('navlogin').style.display = 'none';
	document.getElementById('navchar').style.display = 'inline-block';
	document.getElementById('navshop').style.display = 'inline-block';
	document.getElementById('navbattles').style.display = 'inline-block';
	document.getElementById('navretirement').style.display = 'inline-block';
	document.getElementById('navoptions').style.display = 'inline-block';
	global.containerConditions.style.display = 'block';
  }
}

function prepareLayout()
{
  insertCSS();
  createPageContainers();
  parsePageElements();

  createNavigation();
  createCharSwitch();
  createVersionAndCredits();

  if (global.hasUnknownPageElements) return;

  if (global.isLoggedIn)
  {
    parseCharElements();
	parseShopElements();
	parseBattleElements();
	parseRetirementElements();
  }

  document.addEventListener('keydown', function(e)
  {
    if (e.keyCode == 27) // esc
    {
	  executeClosePopupFunc();
    }
  }, true);

  global.containerOverlay.addEventListener('mousedown', function(e)
  {
    executeClosePopupFunc();
  }, true);
}

function insertCSS()
{
  var css =
    'body {background:url("http://cme.comoj.com/img/bg_logo_crpg.png") no-repeat scroll left top, url("http://cme.comoj.com/img/bg_top.png") repeat-x scroll left 83px, url("http://cme.comoj.com/img/bg_black.png") repeat-x scroll left top, url("http://cme.comoj.com/img/bg.jpg") repeat scroll left top transparent; width:auto; height:auto; margin:0; font-size:15px; overflow:hidden;}\n'+
	'input {background-color:window;}\n'+
	'input[type="submit"], input[type="button"] {background:url(http://cme.comoj.com/img/bg_button.png); border:1px outset #76502e; color:rgba(255,255,255,0.75); font-size:13px; padding:2px; cursor:pointer; height:auto; line-height:15px;}\n'+
	'input[type="submit"]:hover, input[type="button"]:hover {color:white;}\n'+
	'input[type="text"] {cursor:text !important; height:auto !important; font-size:13px !important; line-height:15px !important; background-color:window !important; padding:2px !important; border-style:inset !important;}\n'+
	'table, tr, td {font-size:15px;}\n'+
	'.clear {clear:both;}\n'+
	'#overlay {z-index:99; position:fixed; top:0; left:0; width:100%; height:100%; background:url(http://cme.comoj.com/img/bgoverlay75.png); display:none;}\n'+
	'#clogin, #cchar, #cbattles, #cshop, #cretirement, #coptions, #cdonation {display:none; position:absolute; overflow:auto; top:103px; right:10px; bottom:10px; left:10px;}\n'+
	'#clogin, #coptions, #cdonation {border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width: 25px; left:290px;}\n'+
    '#cunknown {display:none; position:absolute; z-index:1000; top:0px; left:0px; right:0px; bottom:0px; border:10px solid red; padding:20px; background-color:white; overflow:auto;}\n'+
	'#cconditions {display:none; position:absolute; top:5px; left:290px; width:595px; color:white; font-size:13px; text-align:center;}\n'+
	'#cad {position:absolute; top:0px; left:895px;}\n'+
	'#cnav {display:none; position:absolute; top:0px; left:290px; right:0px; height:64px; padding-top:26px; white-space:nowrap; overflow:hidden;}\n'+
	'#cnav a {display:inline-block; font-size:14px; font-weight:bold; text-decoration:none; text-align:center; text-shadow:-1px -1px 1px white; color:#6c6013; height:34px; width:120px; margin:0px; padding-top:13px; background:url("http://cme.comoj.com/img/button_gray_short.png") no-repeat scroll 0 0 transparent;}\n'+
    '#cnav a.current {background-image:url("http://cme.comoj.com/img/button_gold_short.png"); color:black;}\n'+
    '#cnav a:hover, #cnav:focus {color:black;}\n'+
	'#cnav #navdonation {margin-left:10px;}\n'+
	'#cnav #navlogout, #cnav #navdonation, #cnav #navstrategus, #cnav #navforums {background-image:url(http://cme.comoj.com/img/button_gray_small.png); background-position:left 7px; font-size:12px; width:75px;}\n'+
	'#cnav #navlogout.current, #cnav #navdonation.current, #cnav #navstrategus.current, #cnav #navforums.current {background-image:url(http://cme.comoj.com/img/button_gold_small.png);}\n'+
	'#ccharswitch {position:absolute; top:3px; left:900px; width:267px; text-align:right;}\n'+
	'#ccharswitch select {font-size:12px;}\n'+
	'#cchardetails {position:absolute; top:0px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cchardetails h1 {margin:0 0 15px 0; font-size:19px; font-weight:bold; text-align:center;}\n'+
	'#cchardetails .label {display:inline-block; width:100px; margin-right:10px; text-align:right;}\n'+
	'#cchardetails .value {font-weight:bold;}\n'+
	'#cchardetails .xp, #cchardetails .kills, #cchardetails .ratio {margin-top:10px;}\n'+
	'#cchardetails .missingxp {font-size:12px;}\n'+
	'#ccharpoints {position:absolute; top:0px; top:0px; left:280px; bottom:0px; right:0px; border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#ccharpoints .header {background-repeat:no-repeat; background-position:5px center; padding-left:45px; height:55px;}\n'+
	'#ccharpoints .header h1 {font-size:19px; font-weight:bold; margin:0; padding-top:9px;}\n'+
	'#ccharpoints .header .points {}\n'+
	'#ccharpoints .header .points span {font-weight:bold;}\n'+ 
	'#ccharpoints .atr.header {background-image:url(http://cme.comoj.com/img/bw_fist.png);}\n'+
	'#ccharpoints .wpf.header {background-image:url(http://cme.comoj.com/img/bw_swords.png);}\n'+
	'#ccharpoints .skills.header {background-image:url(http://cme.comoj.com/img/bw_horse.png);}\n'+
	'#ccharpoints .skills.header input {background-image:none; border-width:0px; border-style:hidden; margin:0; padding:0; color:black; text-decoration:underline; cursor:pointer; background-color:transparent !important; margin-left:10px;}\n'+
	'#ccharpoints input[type="text"] {margin-left:2px;}\n'+
	'#ccharpoints form+form {margin:20px 0 0 0;}\n'+
	'#ccharpoints table, #ccharpoints tr, #ccharpoints td {border-color:rgba(0,0,0,0.5);}\n'+
	'#cshopitems {position:absolute; top:0px; top:0px; left:280px; bottom:0px; right:0px; border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cshopitems .shopitem {display:inline-block; padding:5px; margin:0 10px 10px 0; background-color:rgba(0,0,0,0.1); text-align:center; vertical-align:text-top; width:150px;}\n'+
	'#cshopitems .shopitem:hover {background-color:rgba(0,0,0,0.25);}\n'+
	'#cshopitems .shopitem .header {text-align:center; position:relative; padding:0; margin:0; height:90px;}\n'+
	'#cshopitems .shopitem .header img {height:80px; width:80px; margin-bottom:10px; cursor:pointer; cursor:-moz-zoom-in;}\n'+
	'#cshopitems .shopitem .header .name {position:absolute; width:150px; bottom:0px; font-weight:bold; overflow:hidden; color:rgba(255,255,255,0.75); background-color:rgba(0,0,0,0.25); text-shadow1:0 0 1px rgba(0,0,0,0.75);}\n'+
	'#cshopitems .shopitem .buy {height:40px; position:relative;}\n'+
	'#cshopitems .shopitem .repair {height:30px; position:relative;}\n'+
	'#cshopitems .shopitem .price {left:0px; bottom:0px; position:absolute; font-weight:bold;}\n'+
	'#cshopitems .shopitem .buybutton {right:0px; bottom:0px; position:absolute;}\n'+
	'#cshopitems .shopitem .desc {text-align:left; font-size:13px;}\n'+
	'#cshopitems .inventory {width:850px; text-align:center;}\n'+
	'#cshopitems .inventory .invitems {width:750px; margin-left:auto; margin-right:auto; background:url(http://cme.comoj.com/img/bg_inv.png) no-repeat center; position:relative;}\n'+
	'#cshopitems .inventory .invitem {display:inline-block; width:300px; vertical-align:top; position:relative; z-index:2;}\n'+
	'#cshopitems .inventory .invitem img {border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 6 stretch; -o-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 6 stretch; -moz-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 6 stretch; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 6 stretch; border-width:6px; background-color:rgba(0,0,0,0.1); width:59px; height:59px; margin:0 5px 5px 5px;}\n'+
    '#cshopitems .inventory .invitem select {max-width:195px;}\n'+
	'#cshopitems .inventory .invitem .malus {color:#903434;}\n'+
	'#cshopitems .inventory .invitem .bonus {color:#006600;}\n'+
	'#cshopitems .inventory .invitem .weight {font-size:11px; font-style:italic; margin-top:2px;}\n'+
	'#cshopitems .inventory .invitem .error {font-size:11px; font-style:italic; margin-top:2px; color:#903434;}\n'+
	'#cshopitems .inventory .invitem .wpf {font-size:11px; font-style:italic; margin-top:2px;}\n'+
	'#cshopitems .inventory .invitem .attributes {position:absolute; top:51px; width:59px; text-align:center; font-size:11px; font-style:italic; color:rgba(255,255,255,0.75); text-shadow:0 0 1px rgba(0,0,0,0.75);}\n'+
	'#cshopitems .inventory .invitem.weapon1 .attributes, #cshopitems .inventory .invitem.weapon2 .attributes, #cshopitems .inventory .invitem.weapon3 .attributes, #cshopitems .inventory .invitem.weapon4 .attributes {left:11px;}\n'+
	'#cshopitems .inventory .invitem.head .attributes, #cshopitems .inventory .invitem.body .attributes, #cshopitems .inventory .invitem.hand .attributes, #cshopitems .inventory .invitem.foot .attributes {left:230px;}\n'+
	'#cshopitems .inventory .invitem.weapon1, #cshopitems .inventory .invitem.weapon2, #cshopitems .inventory .invitem.weapon3, #cshopitems .inventory .invitem.weapon4 {text-align:left; margin-left:75px;}\n'+
	'#cshopitems .inventory .invitem.head, #cshopitems .inventory .invitem.body, #cshopitems .inventory .invitem.hand, #cshopitems .inventory .invitem.foot {text-align:right; margin-right:75px;}\n'+
	'#cshopitems .inventory .invitem.weapon1 img, #cshopitems .inventory .invitem.weapon2 img, #cshopitems .inventory .invitem.weapon3 img, #cshopitems .inventory .invitem.weapon4 img {float:left;}\n'+
	'#cshopitems .inventory .invitem.head img, #cshopitems .inventory .invitem.body img, #cshopitems .inventory .invitem.hand img, #cshopitems .inventory .invitem.foot img {float:right;}\n'+
	'#cshopitems .inventory .invitem.head select, #cshopitems .inventory .invitem.body select, #cshopitems .inventory .invitem.hand select, #cshopitems .inventory .invitem.foot select {text-align:right;}\n'+
	'#cshopitems .inventory .invitem.horse {text-align:center; position:absolute; left:50%; margin-left:-150px; top:228px; z-index:1;}\n'+
    '#cshopitems .inventory .invitem.horse select {text-align:center;}\n'+
	'#cshopitems .inventory .save {margin-top:30px; margin-bottom:25px;}\n'+
	'#cshopitems .inventory .armortotal {position:absolute; z-index:2; left:262px; top:305px; width:92px; text-align:center; font-size:11px; font-style:italic;}\n'+
	'#cshopitems .inventory .armoropponent {position:absolute; z-index:2; left:505px; top:305px; width:92px; text-align:center; font-size:11px; font-style:italic;}\n'+
	'#cshopitems .inventory .armoropponent input {width:25px; text-align:center; font-size:11px !important; font-weight:normal; height:15px !important; border:0; background-color:rgba(255,255,255,0.33) !important;}\n'+
	'#cshopcat {position:absolute; top:0px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cshopcat br {display:none}\n'+
	'#cshopcat input[type="submit"] {text-indent:-999px; border-image:none; -o-border-image:none; -moz-border-image:none; -webkit-border-image:none; border:0px; background-image:none; background-color:transparent; background-repeat:no-repeat; background-position:center; width:50px !important; height:50px; float:left; margin-right:5px; margin-bottom:5px; cursor:pointer;}\n'+
	'#cshopcat input[type="submit"]:hover {background-color:rgba(0,0,0,0.25);}\n'+
	'#cshopcat input[name*="inv"] {background-image:url(http://cme.comoj.com/img/equip_inv.png);}\n'+
	'#cshopcat input[name*="head"] {background-image:url(http://cme.comoj.com/img/equip_head.png);}\n'+
	'#cshopcat input[name*="body"] {background-image:url(http://cme.comoj.com/img/equip_body.png);}\n'+
	'#cshopcat input[name*="hand"] {background-image:url(http://cme.comoj.com/img/equip_hand.png);}\n'+
	'#cshopcat input[name*="foot"] {background-image:url(http://cme.comoj.com/img/equip_foot.png);}\n'+
	'#cshopcat input[name*="horse"] {background-image:url(http://cme.comoj.com/img/equip_horse.png);}\n'+
	'#cshopcat input[name*="shield"] {background-image:url(http://cme.comoj.com/img/equip_shield.png);}\n'+
	'#cshopcat input[name*="one_hand"] {background-image:url(http://cme.comoj.com/img/equip_onehand.png);}\n'+
	'#cshopcat input[name*="two_hand"] {background-image:url(http://cme.comoj.com/img/equip_twohand.png);}\n'+
	'#cshopcat input[name*="polearm"] {background-image:url(http://cme.comoj.com/img/equip_polearm.png);}\n'+
	'#cshopcat input[name*="throw"] {background-image:url(http://cme.comoj.com/img/equip_throw.png);}\n'+
	'#cshopcat input[name*="bow"] {background-image:url(http://cme.comoj.com/img/equip_bow.png);}\n'+
	'#cshopcat input[name*="crossbow"] {background-image:url(http://cme.comoj.com/img/equip_crossbow.png);}\n'+
	'#cshopcat input[name*="arrow"] {background-image:url(http://cme.comoj.com/img/equip_arrow.png);}\n'+
	'#cshopcat input[name*="bolt"] {background-image:url(http://cme.comoj.com/img/equip_bolt.png);}\n'+
	'#cshopsearch {position:absolute; top:275px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cshopsearch .gold {font-size:18px; font-weight:bold; height:26px; padding-top:4px; padding-left:35px; background:url(http://cme.comoj.com/img/coins.png) no-repeat left center;}\n'+
	'#cshopsearch .gold+div {margin-top:10px;}\n'+
	'#cshopsearch .name {margin-top:10px;}\n'+
	'#cshopsearch .price+.labelvalue {margin-top:10px;}\n'+
	'#cshopsearch, #cshopsearch input, #cshopsearch select {font-size:13px; font-weight:normal;}\n'+
	'#cshopsearch .label {display:inline-block; width:50px; margin-right:10px;}\n'+
	'#cshopsearch .value {}\n'+
	'#cshopsearch .value .text {width:125px;}\n'+
	'#cshopsearch .value .min, #cshopsearch .value .max {width:30px;}\n'+
	'#cshopsearch .price .value .min, #cshopsearch .price .value .max {width:45px;}\n'+
	'#cshopsearch .value .max, #cshopsearch .value .type, #cshopsearch .value .reset {margin-left:2px;}\n'+
	'#cbattlesmenu {position:absolute; top:0px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cbattlesmenu a {color:black; display:block; text-decoration:none;}\n'+
	'#cbattlesmenu a.current {font-weight:bold;}\n'+
	'#cbattlesmenu a:hover, #cbattlesmenu a:focus {background-color:rgba(0,0,0,0.1);}\n'+
	'#cbattlesnewsearch {position:absolute; display:none; top:90px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cbattlesnewsearch, #cbattlesnewsearch input, #cbattlesnewsearch select {font-size:13px;}\n'+
	'#cbattlesnewsearch select {max-width:165px;}\n'+
	'#cbattlesnewsearch span {display:inline-block; width:50px;}\n'+
	'#cbattlesnewsearch div+div {margin-top:2px;}\n'+
	'#cbattlesnew {position:absolute; top:0px; top:0px; left:280px; bottom:0px; right:0px; border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cbattlesnew table, #cbattlesnew tr, #cbattlesnew td {border-color:rgba(0,0,0,0.5);}\n'+
	'#cbattlesnew table {width:100%;}\n'+
	'#cbattlesnew tr {cursor:pointer;}\n'+
    '#cbattlesnew tr:hover {background-color:rgba(0,0,0,0.1);}\n'+
	'#cbattlesnew tr.pending {background-color:rgba(133,99,0,0.25);}\n'+
	'#cbattlesnew tr.pending:hover {background-color:rgba(133,99,0,0.33);}\n'+
	'#cbattlesnew tr.accepted {background-color:rgba(0,66,0,0.25);}\n'+
	'#cbattlesnew tr.accepted:hover {background-color:rgba(0,66,0,0.33);}\n'+
	'#cbattlesdetail {z-index:100; position:relative; text-align:center;}\n'+
	'#cbattlesdetail .navigation {z-index:101; position:relative; display:inline-block; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:3px; min-width:250px; font-size:12px; color:#333;}\n'+
	'#cbattlesdetail .navigation h1 {margin:0; padding:0; font-size:19px; font-weight:bold;}\n'+
	'#cbattlesdetail .navigation a {color:black; font-size:12px; color:#333;}\n'+
	'#cbattlesdetail .closepopup {z-index:101; position:absolute; display:inline-block; padding:5px 5px 0px 5px; font-size:13px; font-weight:bold; color:rgba(255,255,255,0.5); top:9px; left:50%; margin-left:345px; cursor:pointer; width:22px; height:15px; background:url(http://cme.comoj.com/img/bg_border_button.png) no-repeat center 5px;}\n'+
	'#cbattlesdetail .battle {text-align:left; position:fixed; top:25px; bottom:25px; left:50%; margin-left:-400px; width:750px; border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cbattlesdetail .battle .info {}\n'+
	'#cbattlesdetail .battle .info .time {float:left;}\n'+
	'#cbattlesdetail .battle .info .server {float:right;}\n'+
	'#cbattlesdetail .battle .versus {margin-top:10px; text-align:center;}\n'+
	'#cbattlesdetail .battle .versus .vs {display:inline-block; margin-left:25px; margin-right:25px; text-align:center; width:50px; font-size:20px; font-weight:bold; margin-top:35px; vertical-align:top;}\n'+
	'#cbattlesdetail .battle .versus .army {display:inline-block; text-align:center; width:250px; border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 10 stretch; -o-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 10 stretch; -moz-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 10 stretch; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_simple.png") 10 stretch; border-width:10px; background-color:rgba(0,0,0,0.1);}\n'+
	'#cbattlesdetail .battle .versus .army.party {background-image:url(http://cme.comoj.com/img/trans_icon_party.png); background-repeat:no-repeat; background-position:center;}\n'+
	'#cbattlesdetail .battle .versus .army.town {background-image:url(http://cme.comoj.com/img/trans_icon_castle.png); background-repeat:no-repeat; background-position:center; cursor:pointer;}\n'+
	'#cbattlesdetail .battle .versus .army .clan {font-weight:bold;}\n'+
	'#cbattlesdetail .battle .versus .army .at {font-size:13px; margin-top:5px;}\n'+
	'#cbattlesdetail .battle .versus .army .loc {font-weight:bold;}\n'+
	'#cbattlesdetail .battle .versus .army .troops {font-size:19px; font-weight:bold;}\n'+
    '#cbattlesdetail .battle .roster {margin-top:10px; text-align:center; height:25px; overflow:hidden;}\n'+
	'#cbattlesdetail .battle .roster .fighters {height:25px;}\n'+
	'#cbattlesdetail .battle .roster .fighters:hover {background-color:(0,0,0,0.1);}\n'+
	'#cbattlesdetail .battle .roster .fighters .number {font-weight:bold; display:inline-block; text-align:center; width:270px;}\n'+
	'#cbattlesdetail .battle .roster .fighters .number.army1 {font-weight:bold; display:inline-block; text-align1:right; width:270px;}\n'+
	'#cbattlesdetail .battle .roster .fighters .toggle {display:inline-block; width:100px; text-align:center;}\n'+
	'#cbattlesdetail .battle .roster .fighters .toggle a {font-size:12px; color:#333333; font-weight:normal;}\n'+
    '#cbattlesdetail .battle .roster .list {display:inline-block; font-size:13px; text-align:left; width:260px; vertical-align:top; background-color:rgba(0,0,0,0.1); padding:5px;}\n'+
	'#cbattlesdetail .battle .roster .spacer {display:inline-block; width:100px;}\n'+
	'#cbattlesdetail .battle form .msg {}\n'+
	'#cbattlesold {position:absolute; top:0px; top:0px; left:280px; bottom:0px; right:0px; border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cbattlesold table, #cbattlesold tr, #cbattlesold td {border-color:rgba(0,0,0,0.5);}\n'+
	'#cbattlesold table {width:100%;}\n'+
	'#cbattlesold tr {cursor:default;}\n'+
	'#cbattlesold td {padding-top:2px; padding-bottom:1px;}\n'+
    '#cbattlesold tr:hover {background-color:rgba(0,0,0,0.1);}\n'+
	'#cbattlesold td.lost, #cbattlesold td.lesspay {background-color:rgba(133,99,0,0.25);}\n'+
	'#cbattlesold tr:hover td.lost, #cbattlesold tr:hover td.lesspay {background-color:rgba(133,99,0,0.33);}\n'+
	'#cbattlesold td.won, #cbattlesold td.morepay {background-color:rgba(0,66,0,0.25);}\n'+
	'#cbattlesold tr:hover td.won, #cbattlesold tr:hover td.morepay {background-color:rgba(0,66,0,0.33);}\n'+
	'#cbattlesold td.army {}\n'+
	'#cbattlesold td.army .name {display:inline-block;}\n'+
	'#cbattlesold td.army .info {font-size:11px; color:rgba(0,0,0,0.33); display:inline-block;}\n'+
	'#cbattlesold tr:hover td.army .info {color:#333;}\n'+
	'#cbattlesold td.date {text-align:right; font-size:13px; color:#555; white-space:nowrap; width:1px; padding-left:3px;}\n'+
	'#cbattlesold tr:hover td.date {color:#333;}\n'+
	'#cbattlesold td.killsdeaths {text-align:center;}\n'+
	'#cbattlesold td.pay {text-align:right; padding-right:3px;}\n'+
	'#cbattlesold td.pay .paid {display:inline-block;}\n'+
	'#cbattlesold td.pay .requested {display:inline-block; font-size:11px; color:rgba(0,0,0,0.33);}\n'+
	'#cbattlesold tr:hover td.pay .requested {color:#333;}\n'+
	'#cbattlesoldsearch {position:absolute; display:none; top:90px; left:0px; width:220px; height:auto; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cbattlesoldsearch, #cbattlesoldsearch input, #cbattlesoldsearch select {font-size:13px;}\n'+
	'#cbattlesoldsearch select {max-width:165px;}\n'+
	'#cbattlesoldsearch span {display:inline-block; width:50px;}\n'+
	'#cbattlesoldsearch div+div {margin-top:2px;}\n'+
    '#cretirementinfo {position:absolute; top:0px; left:0px; width:270px; height:auto;}\n'+
	'#cretirementinfo .requirements, #cretirementinfo .benefits {border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:10px;}\n'+
	'#cretirementinfo .requirements h1 {margin:0 0 15px 0; font-size:19px; font-weight:bold; text-align:center;}\n'+
	'#cretirementinfo .requirements .label {display:inline-block; width:100px; margin-right:10px; text-align:right;}\n'+
	'#cretirementinfo .requirements .value {font-weight:bold;}\n'+
	'#cretirementinfo .requirements .notsatisfied {color:#903434;}\n'+
	'#cretirementinfo .requirements .value .missing {font-weight:normal; font-size:11px; margin-left:5px;}\n'+
	'#cretirementinfo .benefits {margin-top:5px;}\n'+
    '#cretirementinfo .benefits h1 {margin:0 0 15px 0; font-size:19px; font-weight:bold; text-align:center;}\n'+
	'#cretirementinfo .benefits div {font-size:13px; text-align:center;}\n'+
	'#cretirementinfo .benefits div+div {margin-top:15px;}\n'+
	'#cretirementretire {position:absolute; top:0px; top:0px; left:280px; bottom:0px; right:0px; border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -o-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -moz-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; -webkit-border-image:url("http://cme.comoj.com/img/bg_border_red.png") 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cretirementretire form {margin:0px; margin-bottom:20px;}\n'+
	'#cretirementretire table, #cretirementretire tr, #cretirementretire td {border-color:rgba(0,0,0,0.5);}\n'+
	'#cretirementretire .header {background-repeat:no-repeat; background-position:5px center; padding-left:45px; min-height:55px;}\n'+
	'#cretirementretire .header h1 {font-size:19px; font-weight:bold; margin:0; padding-top:9px;}\n'+
	'#cretirementretire .header .desc {}\n'+
	'#cretirementretire .heirloom.header {background-image:url(http://cme.comoj.com/img/bw_heirloom.png); background-position:8px center;}\n'+
	'#cretirementretire .heir.header {background-image:url(http://cme.comoj.com/img/bw_heir.png); background-position:11px center;}\n'+
	'#ctownimage {z-index:100; display:none; position:relative; text-align:center;}\n'+
    '#ctownimage .title {z-index:101; position:relative; display:inline-block; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:3px; min-width:250px; font-size:12px; color:#333;}\n'+
	'#ctownimage .title h1 {margin:0; padding:0; font-size:19px; font-weight:bold;}\n'+
	'#ctownimage .title a {color:black; font-size:12px; color:#333;}\n'+
	'#ctownimage .closepopup {z-index:101; position:absolute; display:block; padding:5px 5px 0px 5px; font-size:13px; font-weight:bold; color:rgba(255,255,255,0.5); top:9px; left:50%; margin-left:391px; cursor:pointer; width:22px; height:15px; background:url(http://cme.comoj.com/img/bg_border_button.png) no-repeat center 5px;}\n'+
    '#ctownimage img {position:fixed; top:25px; bottom:25px; left:50%; margin-left:-450px; width:850px; border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#cversion {position:absolute; bottom:0px; left:0px; width:290px; padding-bottom:10px; padding-top:10px; text-align:center; font-size:8px; font-weight:bold; color:rgba(255,255,255,0.5);}\n'+
	'#cversion:hover {font-size:13px; color:rgba(255,255,255,0.75);}\n'+
	'#cversion a {color:inherit;}\n'+
	'#ccredits {z-index:100; display:none; position:absolute; left:50%; top:50%; width:400px; height:400px; margin-left:-200px; margin-top:-200px; text-align:center;}\n'+
	'#ccredits .title {z-index:101; position:relative; display:inline-block; border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; border-width:15px; padding:3px; font-size:12px; color:#333; padding:0 25px;}\n'+
	'#ccredits .title h1 {margin:0; padding:0; font-size:19px; font-weight:bold;}\n'+
	'#ccredits .title a {color:black; font-size:12px; color:#333;}\n'+
	'#ccredits .closepopup {z-index:101; position:absolute; display:inline-block; padding:5px 5px 0px 5px; font-size:13px; font-weight:bold; color:rgba(255,255,255,0.5); top:10px; left:50%; margin-left:141px; cursor:pointer; width:22px; height:15px; background:url(http://cme.comoj.com/img/bg_border_button.png) no-repeat center 5px;}\n'+
	'#ccredits .credits {text-align:center; position:relative; top:-27px; width:350px; height:250px; border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -o-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -moz-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; border-width:25px; overflow:auto;}\n'+
	'#ccredits .credits dl {margin:0; margin-top:10px;}\n'+
	'#ccredits .credits dt {margin:0; font-style:italic; font-size:13px;}\n'+
	'#ccredits .credits dd {margin:0;}\n'+
	'#ccredits .credits dd+dt {margin-top:15px;}\n'+
	'#ccredits .credits a {color:black; text-decoration:none; border-bottom:1px dotted black;}\n'+
	'#cdonation .donatorlist {z-index:0; width:300px; height:auto; overflow:hidden;}\n';

  if (typeof GM_addStyle != "undefined") {GM_addStyle(css);}
  else if (typeof PRO_addStyle != "undefined") {PRO_addStyle(css);}
  else if (typeof addStyle != "undefined") {addStyle(css);}
  else
  {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0)
    {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
}

function executeClosePopupFunc()
{
  if (global.funcClosePopup == null) return;
  var func = global.funcClosePopup;
  global.funcClosePopup = null;
  func();
}

function createPageContainers()
{
  global.containerNav = createContainer('cnav');
  global.containerLogin = createContainer('clogin');
  global.containerChar = createContainer('cchar');
  global.containerBattles = createContainer('cbattles');
  global.containerBattlesNew = createContainer('cbattlesnew', global.containerBattles);
  global.containerBattlesOld = createContainer('cbattlesold', global.containerBattles);
  global.containerBattlesNewSearch = createContainer('cbattlesnewsearch', global.containerBattles);
  global.containerBattlesOldSearch = createContainer('cbattlesoldsearch', global.containerBattles);
  global.containerBattlesDetail = createContainer('cbattlesdetail');
  global.containerShop = createContainer('cshop');
  global.containerRetirement = createContainer('cretirement');
  global.containerOptions = createContainer('coptions');
  global.containerDonation = createContainer('cdonation');
  global.containerConditions = createContainer('cconditions');
  global.containerUnknown = createContainer('cunknown');
  global.containerOverlay = createContainer('overlay');
  global.containerTownImage = createContainer('ctownimage');
  global.containerVersion = createContainer('cversion');
  global.containerCredits = createContainer('ccredits');
  global.containerAd = createContainer('cad', global.containerNav);
}

function createContainer(id, parent)
{
  var container = document.createElement('div');
  container.id = id;
  if (parent == null) document.body.appendChild(container)
    else parent.appendChild(container);
  return container;
}

function createNavigation()
{
  global.urlBase = window.location.protocol + '//' + window.location.host + window.location.pathname;

  global.containerNav.appendChild(createLinkWithShowPageCall('navlogin', global.urlBase + '#login', 'Login'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navchar', global.urlBase + '#char', 'Character'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navshop', global.urlBase + '#shop', 'Equipment'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navbattles', global.urlBase + '#battles', 'Battles'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navretirement', global.urlBase + '?retirement=1#retirement', 'Retirement'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navoptions', global.urlBase + '#options', 'Settings'));
  global.containerNav.appendChild(createLinkWithShowPageCall('navdonation', global.urlBase + '#donation', 'Donate'));
  global.containerNav.appendChild(createLink('navlogout', global.logout.url, 'Logout'));
  global.containerNav.appendChild(createLink('navstrategus', global.strategus.url, 'Strategus', null, global.strategus.text, '_blank'));
  global.containerNav.appendChild(createLink('navforums', global.urlBase + '?loginforum', 'Forums', null, '', '_blank'));

  moveNode(global.containerNav.firstChild, global.containerNav);
}

function createCharSwitch()
{
  var selectNames = getInputElementByName('changeNameTarget', 'select');
  if (selectNames == null || selectNames.options.length <= 1)	return;
  
  var names = new Array();
  names.push(global.charName);
  for (var i = 1; i < selectNames.options.length; i++)
  {
    names.push(selectNames.options[i].text);
  }
  names.sort();

  var selectSwitch = document.createElement('select');
  for (var i = 0; i < names.length; i++)
  {
    selectSwitch.options[selectSwitch.options.length] = new Option(names[i], names[i], false, names[i] == global.charName);
  }

  selectSwitch.addEventListener('change', function(e)
  {
    setCookie('username', e.target.value)
	setCookie('password', getSetting('passwordhash_' + e.target.value));
	window.location.href = getBaseUrlPlusParameterAndHash('switchtochar', e.target.value);
  }, true);

  global.containerCharSwitch = createContainer('ccharswitch');
  global.containerCharSwitch.style.display = 'block';
  global.containerCharSwitch.appendChild(selectSwitch);
}

function createVersionAndCredits()
{
  var version = document.createTextNode('v7.5 2011-01-15 - ');
  global.containerVersion.appendChild(version);

  var link = document.createElement('a');
  link.textContent = 'Credits';
  link.href = 'javascript:';
  global.containerVersion.appendChild(link);

  global.containerCredits.innerHTML =   
	'<div class="title">'+
	  '<h1>Credits</h1>'+
	'</div>'+
	'<div id="creditsclosepopup" class="closepopup" title="Close the credits (ESC)"><span>x</span></div>'+
	'<div class="credits">'+
	  '<dl>'+
	    '<dt>Original artwork</dt><dd><a href="http://forums.taleworlds.com/index.php/topic,135687.0.html" target="_blank">Final_Boss</a></dd>'+
		'<dt>Location screenshots</dt><dd><a href="http://forums.taleworlds.com/index.php/topic,133923.0.html" target="_blank">Élio</a></dd>'+
		'<dt>WPF and damage calculation</dt><dd>'+
		  '<a href="http://infinitum.dyndns.org/crpg/calc.htm" target="_blank">Vargas</a>, '+
		  '<a href="http://infinitum.dyndns.org/crpg/calc.htm" target="_blank">cmpxchg8b</a>, '+
		  '<a href="http://forums.taleworlds.com/index.php/topic,137891.msg3314563.html" target="_blank">virus_found</a>, '+
		  '<a href="http://forums.taleworlds.com/index.php/topic,137021.msg3298972.html" target="_blank">Urist</a>'+
		'</dd>'+
	    '<dt>Additional code</dt><dd>Chort</dd>'+
	'</div>';

  document.getElementById('creditsclosepopup').addEventListener('click', function(e)
  {
    executeClosePopupFunc();
  }, true);

  link.addEventListener('click', function(e)
  {
    executeClosePopupFunc();
    global.containerOverlay.style.display = 'block';
	global.containerCredits.style.display = 'block';
	global.funcClosePopup = function()
	{
	  global.containerCredits.style.display = 'none';
	  global.containerOverlay.style.display = 'none';
	}
  }, true);
}

function parsePageElements()
{
  var move = new Array();
  var remove = new Array();
  var all = document.body.childNodes;

  for (var i = 0; i < all.length; i++)
  {
    var node = all[i];

	if (node.nodeName == 'A' && node.textContent.indexOf('Join Strategus BETA') > -1 && node.href.indexOf('http://strategus.c-rpg.net/') > -1)
	{
	  global.strategus.url = node.href;
	  global.strategus.text = node.textContent;
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('Show your participated battles') > -1 && node.href.indexOf('mybattles=1') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('Hide your participated battles') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('Logout') > -1)
	{
	  global.logout.url = node.href;
	  global.isLoggedIn = true;
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.href.indexOf('privacy.html') > -1)
	{
	}

	else if (node.nodeName == 'A' && node.href.indexOf('cRPG_update.zip') > -1)
	{
	  remove.push(node);
	}
	
	else if (node.nodeName == 'A' && node.href.indexOf('retirement=1') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('cancel') > -1)
	{
	  remove.push(node);
	}
	
	else if (node.className == 'battle')
	{
	  move.push({node:node, container:global.containerBattlesNew});
	}

	else if (node.className == 'donatorlist')
	{
	  move.push({node:node, container:global.containerDonation});
	}

	else if (node.className == 'paypal')
	{
	  move.push({node:node, container:global.containerDonation});
	}

	else if (node.nodeName == 'TABLE' && hasFirstTableRowValueOf(node, 'Participants'))
	{
	  move.push({node:node, container:global.containerBattlesOld});
	}

	else if (node.nodeName == 'TABLE' && hasFirstTableRowValueOf(node, 'Repair for '))
	{
	  move.push({node:node, container:global.containerShop});
	}
	
	else if (node.nodeName == 'TABLE' && hasFirstTableRowValueOf(node, 'Increase modifier of this one'))
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.nodeName == 'FORM' && hasFormSubmitValueOf(node, 'Enter Donator Menu'))
	{
	  move.push({node:node, container:global.containerDonation});
	  appendToFormAction(node, '#donation');
	}

	else if (node.nodeName == 'FORM' && hasChildWithIdOf(node, 'personal'))
	{
	  move.push({node:node, container:global.containerChar});
	  appendToFormAction(node, '#char');
	}

	else if (node.nodeName == 'FORM' && hasChildWithIdOf(node, 'atr'))
	{
	  move.push({node:node, container:global.containerChar});
	  appendToFormAction(node, '#char');
	}

	else if (node.nodeName == 'FORM' && hasChildWithIdOf(node, 'wpf'))
	{
	  move.push({node:node, container:global.containerChar});
	  appendToFormAction(node, '#char');
	}

	else if (node.nodeName == 'FORM' && hasChildWithIdOf(node, 'skills'))
	{
	  move.push({node:node, container:global.containerChar});
	  appendToFormAction(node, '#char');
	}

	else if (node.nodeName == 'FORM' && hasFormActionOf(node, '#shop'))
	{
	  move.push({node:node, container:global.containerShop});
	}

	else if (node.nodeName == 'FORM' && hasFormSubmitValueOf(node, 'resetPassword'))
	{
	  move.push({node:node, container:global.containerOptions});
	  appendToFormAction(node, '#options');
	}
	
	else if (node.nodeName == 'FORM' && node.id == 'loginForm')
	{
	  move.push({node:node, container:global.containerLogin});
	  appendToFormAction(node, '#login');
	}

	else if (node.nodeName == 'FORM' && hasFormSubmitValueOf(node, 'heir[retire]'))
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.textContent.indexOf('The clock says') > -1)
	{
	  move.push({node:wrapNode(node, 'span', 'clock'), container:global.containerConditions})
	}

	else if (node.textContent.indexOf('The sky is clear') > -1 || node.textContent.indexOf('It\'s raining') > -1 || node.textContent.indexOf('You can hardly see your own hands due to heavy fog') > -1)
	{
	  move.push({node:wrapNode(node, 'span', 'weather'), container:global.containerConditions});
	}
	
	else if (node.nodeName == 'B' && node.textContent.indexOf('#') > -1 && hasPreviousNodeWithValueOf(node, 'You are currently ranked'))
	{
	  global.rank = node.textContent;
	  remove.push(node);
	}
	
	else if (node.nodeName == 'B' && node.textContent.indexOf(' XP') > -1 && hasPreviousNodeWithValueOf(node, '- you need'))
	{
	  global.rankXp = node.textContent;
	  remove.push(node);
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf('To retire, your requirements are') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf('You would gain') > -1)
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.nodeName == 'UL' && hasPreviousNodeWithValueOf(node, 'To retire, your requirements are'))
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.nodeName == 'UL' && hasPreviousNodeWithValueOf(node, 'You would gain'))
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.nodeName == 'UL' && hasChildWithHrefOf(node, 'forum.c-rpg.net', true))
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'H1' && node.textContent.indexOf('heirloomed items') > -1)
	{
	  move.push({node:node, container:global.containerRetirement});
	}

	else if (node.nodeName == 'H1')
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'H2' && node.textContent.indexOf('Retirement') > -1)
	{
	  remove.push(node);
	}
	
	else if (node.nodeName == 'H2' && node.textContent.indexOf('does not exist - please register') > -1)
	{
	  move.push({node:node, container:global.containerLogin});
	}

	else if (node.nodeName == 'H2' && node.textContent.indexOf('IMPORTANT:') > -1)
	{
	  move.push({node:node, container:global.containerLogin});
	}

	else if (node.nodeName == 'H2')
	{
	  global.charName = node.textContent;
	  remove.push(node);
	}
	
	else if (node.nodeName == 'P' && node.textContent.indexOf('There might have been a password') > -1)
	{
	  move.push({node:node, container:global.containerLogin});
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf('You are currently ranked') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf('- you need') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf('for the next rank') > -1)
	{
	  remove.push(node);
	}
	
	else if (node.nodeName == '#text' && node.textContent.indexOf('Password wrong') > -1)
	{
	  move.push({node:node, container:global.containerLogin});
	}
	
	else if (node.nodeName == '#text' && node.textContent.indexOf('...') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'BR')
	{
	  remove.push(node);
	}
	
	else if (node.nodeName == 'SCRIPT')
	{
	}

	else if (node.nodeName == 'LINK')
	{
	}

	else if (node.nodeName == 'TITLE')
	{
	}

	else if (node.nodeName == 'IFRAME' && node.src.indexOf('google') > -1)
	{
	  move.push({node:node, container:global.containerAd});
	}

	else if (node.nodeName == 'SPAN' && node.id == 'google_temp_span')
	{
	}

	else if (node.nodeName == 'B' && node.textContent.indexOf('About namechanges') > -1)
	{
	  move.push({node:wrapNode(node, 'div'), container:global.containerOptions});
	}

	else if (node.nodeName == 'B' && node.textContent.indexOf('An heir has been born') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('[ Accept') > -1)
	{
	  move.push({node:node, container:global.containerOptions});
	}

	else if (node.nodeName == '#text' && node.textContent == ' - ' && hasPreviousNodeWithValueOf(node, '[ Accept'))
	{
	  move.push({node:node, container:global.containerOptions});
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('[ Decline') > -1)
	{
	  move.push({node:node, container:global.containerOptions});
	}

	else if (node.nodeName == '#text' && node.textContent.indexOf(' - Player') > -1 && hasPreviousNodeWithValueOf(node, '[ Decline'))
	{
	  move.push({node:node, container:global.containerOptions});
	  move.push({node:document.createElement('br'), container:global.containerOptions});
	}

	else if (node.nodeName == 'A' && node.textContent.indexOf('Banlist') > -1)
	{
	  move.push({node:node, container:global.containerOptions});
	}

	else if (node.nodeName == 'A' && node.href.indexOf('?loginforum') > -1)
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'B' && node.textContent == '')
	{
	  remove.push(node);
	}

	else if (node.nodeName == 'PRE' && node.textContent.indexOf('Pass for EU servers') > -1)
	{
	  move.push({node:node, container:global.containerOptions});
	}

	else if (node.nodeName == 'FORM' && hasFormSubmitValueOf(node, 'server[allnew]'))
	{
	  move.push({node:node, container:global.containerOptions});
	  appendToFormAction(node, '#options');
	}

	else if (node.id != null && isAny(node.id, new Array('clogin', 'cnav', 'cchar', 'cbattles', 'cbattlesdetail', 'cshop', 'cretirement', 'coptions', 'cdonation', 'cconditions', 'cunknown', 'overlay', 'ctownimage', 'cversion', 'ccredits', 'cad', '_firebugConsole')))
	{
	}
	
	else if (node.id == null && node.childNodes.length == 0 && hasOnlyWhitespace(node.textContent))
	{
	}

	else
	{
	  move.push({node:node, container:global.containerUnknown});
	  global.hasUnknownPageElements = true;
	}
  }

  var paypal = getElementByClassName('paypal');
  if (paypal != null) move.push({node:paypal, container:global.containerDonation});

  var privacy = getLinkElementByHref('privacy.html');
  if (privacy != null) remove.push(privacy);

  var li = privacy != null ? privacy.parentNode : null;
  if (li != null)
  {
    for (var i = 0; i < li.childNodes.length; i++)
	{
	  var node = li.childNodes[i];
	  if (node.nodeName == 'A' && node.textContent.indexOf('Banlist') > -1)
	  {
	    move.push({node:node, container:global.containerOptions});
	  }
	  else if (node.nodeName == 'PRE' && node.textContent.indexOf('Pass for EU servers') > -1)
	  {
	    move.push({node:node, container:global.containerOptions});
	  }
	  else if (node.nodeName == 'FORM' && hasFormSubmitValueOf(node, 'server[allnew]'))
	  {
	    move.push({node:node, container:global.containerOptions});
	    appendToFormAction(node, '#options');
	  }
	}
  }
  for (var i = 0; i < move.length; i++) {moveNode(move[i].node, move[i].container);}
  for (var i = 0; i < remove.length; i++) {remove[i].parentNode.removeChild(remove[i]);}
}

function parseShopElements()
{
  // Repairs
  var repairs = new Array();
  if (global.containerShop.childNodes.length == 2)
  {
    var table = global.containerShop.childNodes[1];
    repairs = parseRepairElements(table);
	global.containerShop.removeChild(table);
  }

  // Verify that nothing changed
  var form = global.containerShop.childNodes[0];
  removeWhitespaceNodes(form);

  // Work around for firefox which fixes the invalid markup "<a><h1></h1></a>" very randomly by moving the h1 outside the a
  if (form.childNodes.length == 3 && form.childNodes[0].nodeName == 'A' && form.childNodes[1].nodeName == 'H1' &&
      form.childNodes[2].nodeName == 'TABLE' && form.childNodes[1].childNodes.length == 1 && form.childNodes[1].childNodes[0].nodeName == 'A')
  {
    form.removeChild(form.childNodes[1]); // h1
  }

  if (form.childNodes.length != 2 || form.childNodes[0].nodeName != 'A' || form.childNodes[1].nodeName != 'TABLE' ||
      form.childNodes[1].rows.length != 1 || form.childNodes[1].rows[0].cells.length != 2)
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  // Create the containers for the shop category and items
  global.containerShopCat = createContainer('cshopcat', form);
  global.containerShopSearch = createContainer('cshopsearch', form);
  global.containerShopItems = createContainer('cshopitems', form);

  // Move content
  var table = form.childNodes[1];
  global.containerShopCat.innerHTML = table.rows[0].cells[0].innerHTML;

  // Convert table to shop items
  var paramItemType = getUrlParameter('itemtype');
  var addItemsLater = paramItemType != '' && paramItemType != 'inv';
  if (table.rows[0].cells[1].childNodes.length > 1)
  {
    var tableItems = table.rows[0].cells[1].childNodes[1];
	var tableInventory = null;

	// Inventory
	if (tableItems.rows.length >= 1 && tableItems.rows[0].cells.length == 1 && tableItems.rows[0].cells[0].childNodes.length == 1 && tableItems.rows[0].cells[0].childNodes[0].className == 'invtable')
	{
      tableInventory = tableItems.rows[0].cells[0].childNodes[0];
      moveNode(tableInventory, global.containerShopItems);
      tableItems.deleteRow(0);
	}

	// Items
    for (var i = 1; i < tableItems.rows.length; i++)
    {
      var item = createShopItem(tableItems.rows[i], repairs);
	  if (!addItemsLater) global.containerShopItems.appendChild(item);
    }
  }

  // Clean up
  form.removeChild(form.childNodes[0]); // link
  form.removeChild(form.childNodes[0]); // table

  // Categories
  for (var i = 0; i < global.containerShopCat.childNodes.length; i++)
  {
    var cat = global.containerShopCat.childNodes[i];
	if (cat.nodeName == 'INPUT')
	{
	  cat.title = cat.value;
	  var catId = cat.name.match(/shop\[(.*)\]/)[1];
	  cat.addEventListener('mousedown', function(catId)
	  {
	    return function(e)
		{
		  form.action = getBaseUrlPlusParameterAndHash('itemtype', catId, '#shop');
		}
	  }(catId), true);
	}
  }

  // Update item types
  if (isShopCatOneHanded(paramItemType)) updateTypesFromShopItems('onehanded');
  else if (isShopCatTwoHanded(paramItemType)) updateTypesFromShopItems('twohanded');
  else if (isShopCatPolearm(paramItemType)) updateTypesFromShopItems('polearm');
  else if (isShopCatBow(paramItemType)) updateTypesFromShopItems('bow');
  else if (isShopCatCrossbow(paramItemType)) updateTypesFromShopItems('crossbow');
  else if (isShopCatThrown(paramItemType)) updateTypesFromShopItems('thrown');
  else if (isShopCatShield(paramItemType)) updateTypesFromShopItems('shield');
  else if (isShopCatArrows(paramItemType)) updateTypesFromShopItems('arrows');
  else if (isShopCatBolts(paramItemType)) updateTypesFromShopItems('bolts');

  // Inventory
  if (tableInventory != null) parseShopInventoryElements(form, tableInventory);

  // Available gold added to top of search box
  global.containerShopSearch.appendChild(createHtmlNode(formatNumber(global.charGold), 'gold', 'Available gold'));

  initShopSearch();
  if (addItemsLater) orderShopItems();
  filterShopItems();
}

function parseShopInventoryElements(form, table)
{
  // Verify that nothing changed
  if (!doesTableContentMatch(table, 5, 2, null, null, null, new Array('selectItem[itp_type_head_armor]', 'selectItem[wp_slot1]', 'selectItem[itp_type_body_armor]', 'selectItem[wp_slot2]',
                                                                      'selectItem[itp_type_foot_armor]', 'selectItem[wp_slot3]', 'selectItem[itp_type_hand_armor]', 'selectItem[wp_slot4]',
                                                                      'selectItem[itp_type_horse]', 'saveGear'),
                             new Array(3, 3, 3, 3, 3, 3, 3, 3, 3, 1)))
  {
    moveNode(table, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  var selectHead = table.rows[0].cells[0].childNodes[2];
  var selectWeapon1 = table.rows[0].cells[1].childNodes[2];
  var selectBody = table.rows[1].cells[0].childNodes[2];
  var selectWeapon2 = table.rows[1].cells[1].childNodes[2];
  var selectFoot = table.rows[2].cells[0].childNodes[2];
  var selectWeapon3 = table.rows[2].cells[1].childNodes[2];
  var selectHand = table.rows[3].cells[0].childNodes[2];
  var selectWeapon4 = table.rows[3].cells[1].childNodes[2];
  var selectHorse = table.rows[4].cells[0].childNodes[2];
  var saveGear = table.rows[4].cells[1].childNodes[0];

  var inv = document.createElement('div');
  inv.className = 'invitems';

  inv.appendChild(createInvItem('head', selectHead, 'Head Armor'));
  inv.appendChild(createInvItem('weapon1', selectWeapon1, 'Weapon Slot 1'));
  inv.appendChild(createInvItem('body', selectBody, 'Body Armor'));
  inv.appendChild(createInvItem('weapon2', selectWeapon2, 'Weapon Slot 2'));
  inv.appendChild(createInvItem('hand', selectHand, 'Hand Armor'));
  inv.appendChild(createInvItem('weapon3', selectWeapon3, 'Weapon Slot 3'));
  inv.appendChild(createInvItem('foot', selectFoot, 'Leg Armor'));
  inv.appendChild(createInvItem('weapon4', selectWeapon4, 'Weapon Slot 4'));
  inv.appendChild(createInvItem('horse', selectHorse, 'Horse'));

  var invWrapper = wrapNode(inv, 'div', 'inventory');
  invWrapper.appendChild(wrapNode(saveGear, 'div', 'save'));

  global.inventory.elArmorTotal = createHtmlNode('', 'armortotal');
  invWrapper.appendChild(global.inventory.elArmorTotal);

  /*global.inventory.elArmorOpponent = createHtmlNode(
    'Opponent armor: <div><input type="text" value="' + getSetting('armoropponent', 30) + '"></div>',
	'armoropponent',
	'Enter target armor for potential damage calculation. Ignores movement and hit location. Use cursor up and down to change by 1, page up and down to change by 5.');
  global.inventory.elArmorOpponent.childNodes[1].addEventListener('keyup', function(e)
  {
    var value = 0;
	var empty = true;

    if (e.target.value != '')
	{
	  value = parseInt(e.target.value);
	  if (isNaN(value)) value = 0;
	  empty = false;
	}

	if (e.keyCode == 38) value += 1;
	else if (e.keyCode == 40) value -= 1;
	else if (e.keyCode == 33) value += 5;
	else if (e.keyCode == 34) value -= 5;

	if (value > 99) value = 99;
	if (value < 0) value = 0;

	e.target.value = value == 0 && empty ? '' : value;
	setSetting('armoropponent', value);
	updateInvItems('none');
  }, true);
  invWrapper.appendChild(global.inventory.elArmorOpponent);*/

  saveGear.addEventListener('mousedown', function(e)
  {
    form.action = getBaseUrlPlusParameterAndHash('itemtype', 'inv', '#shop');
  }, true);

  global.containerShopItems.insertBefore(invWrapper, table);
  global.containerShopItems.removeChild(table);
  updateInvItems();
}

function parseRepairElements(table)
{
  var result = new Array();
  for (var r = 0; r < table.rows.length; r++)
  {
    var row = table.rows[r];
	var item = {id:0, state:'', cost:0, url:''};
	
	var idMatch = row.cells[2].childNodes[0].href.match(/.*?repair=(.*)/);
	item.id = idMatch[1];
	
	var costMatch = row.cells[2].textContent.match(/Repair for (.*) Gold/);
	item.cost = costMatch[1];

	item.state = row.cells[1].textContent;
	item.url = row.cells[2].childNodes[0].href + '#shop';

	result.push(item);
  }
  return result;
}

function getRepairElement(repairs, id)
{
  for (var i = 0; i < repairs.length; i++)
  {
    var item = repairs[i];
	if (item.id == id) return item;
  }
  return null;
}

function createInvItem(type, select, hint)
{
  var img = document.createElement('img');

  var text = document.createElement('div');
  text.appendChild(select);

  var info = document.createElement('div');
  text.appendChild(info);

  var attributes = document.createElement('div');
  attributes.className = 'attributes';

  var item = createHtmlNode('', 'invitem ' + type, hint);
  item.appendChild(img);
  item.appendChild(text);
  item.appendChild(attributes);

  select.addEventListener('change', function(e)
  {
    updateInvItems(type);
  }, true);

  var invItem = global.inventory[type];
  invItem.elItem = item;
  invItem.elImg = img;
  invItem.elSelect = select;
  invItem.elInfo = info;
  invItem.elAttributes = attributes;

  img.addEventListener('contextmenu', function(e) {e.preventDefault(); cycleInvItem(invItem, false);}, true);
  img.addEventListener('click', function(e) {cycleInvItem(invItem, true);}, true);
  attributes.addEventListener('contextmenu', function(e) {e.preventDefault(); cycleInvItem(invItem, false);}, true);
  attributes.addEventListener('click', function(e) {cycleInvItem(invItem, true);}, true);

  return item;
}

function createShopItem(row, repairs)
{
  row.cells[2].childNodes[0].className = 'desc';
  var buy = '';
  if (row.cells.length == 5) buy = row.cells[4].innerHTML;

  var divItem = document.createElement('div');
  divItem.className = 'shopitem';
  divItem.innerHTML =
    '<div class="header">' +
	  row.cells[3].innerHTML +
	  '<div class="name">' + row.cells[0].textContent + '</div>' +
	'</div>' +
	row.cells[2].innerHTML +
	'<div class="buy">' +
	  '<span class="price">' + formatNumber(row.cells[1].textContent) + ' gold</span>' +
	  '<span class="buybutton">' + buy + '</span>' +
	'</div>';
	
  // Repair
  if (repairs.length > 0)
  {
    var idMatch = buy.match(/.*sell\[(.*)\].*/);
	if (idMatch != null)
	{
	  var repair = getRepairElement(repairs, idMatch[1]);
	  if (repair != null)
	  {
	    divItem.innerHTML +=
		  '<div class="repair">' +
		  '<span class="price">' + formatNumber(repair.cost) + ' gold</span>' +
		  '<span class="buybutton"><input type="button" value="repair" onclick="window.location.href=\'' + repair.url + '\'"></span>' +
		  '</div>';
	  }
	}
  }

  var desc = row.cells[2].childNodes[0].textContent;
  var price = parseInt(row.cells[1].textContent);
  var name = row.cells[0].textContent.toLowerCase();
  var imgSrc = row.cells[3].childNodes[0].src;

  // Fix images for damaged/heirloom items
  var heirloomImgMatches = imgSrc.match(/(.*)(imodbit|imodbits)_.+?_(.*)/);
  if (heirloomImgMatches != null)
  {
    imgSrc = heirloomImgMatches[1] + heirloomImgMatches[3];
	divItem.firstChild.firstChild.src = imgSrc;
  }

  // Use new images
  imgSrc = imgSrc.replace(/http:\/\/(www\.|)c-rpg\.net\/thumbnails\//, 'http://cme.comoj.com/img/items/small/').replace(/\.jpg/, '.png');
  divItem.firstChild.firstChild.src = imgSrc;

  // Zoom image
  divItem.firstChild.firstChild.addEventListener('click', function(e)
  {
    clickShopItemImage(this, imgSrc);
  }, true);
  divItem.firstChild.firstChild.addEventListener('mouseover', function(e)
  {
    hoverShopItemImage(this, imgSrc);
  }, true);

  var difficultyMatch = desc.match(/difficulty *(\d*)/);
  var difficulty = difficultyMatch != null ? parseInt(difficultyMatch[1]) : 0;

  var weightMatches = desc.match(/weight *([\d\.]*)/);
  var weight = weightMatches != null ? parseFloat(weightMatches[1]) : 0;

  var speedMatches = desc.match(/spd rtng *(\d*)/);
  var speed = speedMatches != null ? parseInt(speedMatches[1]) : 0;

  var lengthMatches = desc.match(/weapon length *(\d*)/);
  var length = lengthMatches != null ? parseInt(lengthMatches[1]) : 0;

  var armorHeadMatches = desc.match(/head armor *(\d*)/);
  var armorHead = armorHeadMatches != null ? parseInt(armorHeadMatches[1]) : 0;

  var armorBodyMatches = desc.match(/body armor *(\d*)/);
  var armorBody = armorBodyMatches != null ? parseInt(armorBodyMatches[1]) : 0;

  var armorLegMatches = desc.match(/leg armor *(\d*)/);
  var armorLeg = armorLegMatches != null ? parseInt(armorLegMatches[1]) : 0;

  var thrustMatches = desc.match(/thrust damage *(\d*)[ ,]*(blunt|cut|pierce+?)/);
  var thrustDamage = 0;
  var thrustType = '';
  if (thrustMatches != null && thrustMatches.length == 3)
  {
    thrustDamage = parseInt(thrustMatches[1]);
	thrustType = thrustMatches[2];
  }

  var swingMatches = desc.match(/swing damage *(\d*)[ ,]*(blunt|cut|pierce+?)/);
  var swingDamage = 0;
  var swingType = '';
  if (swingMatches != null && swingMatches.length == 3)
  {
    swingDamage = parseInt(swingMatches[1]);
	swingType = swingMatches[2];
  }

  global.shopSearch.items.push({item:divItem, tooExpensive:(buy == ''),
                                price:price, name:name, difficulty:difficulty, speed:speed, weight:weight, length:length,
								armorHead:armorHead, armorBody:armorBody, armorLeg:armorLeg,
                                thrustDamage:thrustDamage, thrustType:thrustType,
								swingDamage:swingDamage, swingType:swingType, image:imgSrc});

  return divItem;
}

function initShopSearch()
{
  var paramItemType = getUrlParameter('itemtype');
  if (paramItemType == '') return;

  global.shopSearch.criteria.hideTooExpensive = getSetting('shopsearchtooexpensive', false);
  global.shopSearch.criteria.hideTooDifficult = getSetting('shopsearchtoodifficult', false);
  global.shopSearch.criteria.reverseOrder = getSetting('shopsearchreverseorder', false);

  var showReverseOrder = paramItemType != 'inv';
  var showTooExpensive = paramItemType != 'inv';
  var showTooDifficult = paramItemType != 'inv';
  var showName = true;
  var showPrice = true;
  var showWeight = hasShopCatWeight(paramItemType);
  var showSpeed = hasShopCatSpeed(paramItemType);
  var showLength = hasShopCatLength(paramItemType);
  var showArmor = hasShopCatArmor(paramItemType);
  var showDamage = hasShopCatDamage(paramItemType);

  if (showReverseOrder)
  {
    global.containerShopSearch.appendChild(createHtmlNode('<label for="shopsearchreverseorder"><input type="checkbox" id="shopsearchreverseorder">Reverse item order</label>'));
    var fieldreverseorder = document.getElementById('shopsearchreverseorder');
    fieldreverseorder.checked = global.shopSearch.criteria.reverseOrder;
    fieldreverseorder.addEventListener('change', function(e)
    {
      setSetting('shopsearchreverseorder', e.target.checked);
	  global.shopSearch.criteria.reverseOrder = e.target.checked;
      orderShopItems();
    }, true);
  }

  if (showTooExpensive)
  {
    global.containerShopSearch.appendChild(createHtmlNode('<label for="shopsearchtooexpensive"><input type="checkbox" id="shopsearchtooexpensive">Hide items i can not afford</label>'));
    var fieldtooexpensive = document.getElementById('shopsearchtooexpensive');
    fieldtooexpensive.checked = global.shopSearch.criteria.hideTooExpensive;
    fieldtooexpensive.addEventListener('change', function(e)
    {
      setSetting('shopsearchtooexpensive', e.target.checked);
	  global.shopSearch.criteria.hideTooExpensive = e.target.checked;
      filterShopItems();
    }, true);
  }
  
  if (showTooDifficult)
  {
    global.containerShopSearch.appendChild(createHtmlNode('<label for="shopsearchtoodifficult"><input type="checkbox" id="shopsearchtoodifficult">Hide items i can not use</label>'));
    var fieldtoodifficult = document.getElementById('shopsearchtoodifficult');
    fieldtoodifficult.checked = global.shopSearch.criteria.hideTooDifficult;
    fieldtoodifficult.addEventListener('change', function(e)
    {
      setSetting('shopsearchtoodifficult', e.target.checked);
	  global.shopSearch.criteria.hideTooDifficult = e.target.checked;
      filterShopItems();
    }, true);
  }

  if (showName) createShopSearchTextCriteria('Name', 'name', '');
  if (showPrice) createShopSearchMinMaxCriteria('Price', 'price', null, 0, 999999);  
  if (showWeight) createShopSearchMinMaxCriteria('Weight', 'weight');
  if (showSpeed) createShopSearchMinMaxCriteria('Speed', 'speed');
  if (showLength) createShopSearchMinMaxCriteria('Length', 'length');
  if (showArmor) createShopSearchMinMaxCriteria('Armor', 'armor', new Array({key:'head', value:'Head'}, {key:'body', value:'Body'}, {key:'leg', value:'Leg'}));
  if (showDamage) createShopSearchMinMaxCriteria('Damage', 'damage', new Array({key:'blunt', value:'Blunt'}, {key:'cut', value:'Cut'}, {key:'pierce', value:'Pierce'}));
}

function createShopSearchTextCriteria(label, name, defaultValue)
{
  var nameField = 'shopsearch' + name;
  var nameFieldReset = 'shopsearch' + name + 'reset';
  var nameSetting = name;

  global.shopSearch.criteria[nameSetting] = getSetting(nameField, defaultValue);
  var htmlValue =
    '<input id="' + nameField + '" class="text" type="text" />'+
	'<input id="' + nameFieldReset + '" type="button" class="reset" value="x" title="Reset value" />';

  global.containerShopSearch.appendChild(createLabelValueNode('<label for="' + nameField + '">' + label + ':</label>', htmlValue, name));

  var field = document.getElementById(nameField);
  field.value = global.shopSearch.criteria[nameSetting];
  field.addEventListener('keyup', function(e)
  {
	setSetting(nameField, e.target.value);
	global.shopSearch.criteria[nameSetting] = e.target.value;
	filterShopItems();
  }, true);

  document.getElementById(nameFieldReset).addEventListener('click', function(e)
  {
	document.getElementById(nameField).value = '';
	setSetting(nameField, defaultValue);
	global.shopSearch.criteria[nameSetting] = defaultValue;
	filterShopItems();
  }, true);
}

function createShopSearchMinMaxCriteria(label, prefix, types, valueMin, valueMax)
{
  var nameFieldMin = 'shopsearch' + prefix + 'min';
  var nameFieldMax = 'shopsearch' + prefix + 'max';
  var nameFieldType = 'shopsearch' + prefix + 'type';
  var nameFieldReset = 'shopsearch' + prefix + 'reset';
  var nameSettingMin = prefix + 'Min';
  var nameSettingMax = prefix + 'Max';
  var nameSettingType = prefix + 'Type';

  if (!valueMin) valueMin = 0;
  if (!valueMax) valueMax = 999;
  global.shopSearch.criteria[nameSettingMin] = getSetting(nameFieldMin, valueMin);
  global.shopSearch.criteria[nameSettingMax] = getSetting(nameFieldMax, valueMax);
  if (types && types != null) global.shopSearch.criteria[nameSettingType] = getSetting(nameFieldType, '');

  var htmlValue =
    '<input id="' + nameFieldMin + '" type="text" class="min" title="Minimum" />' +
	'<input id="' + nameFieldMax + '" type="text" class="max" title="Maximum" />';

  if (types && types != null)
  {
    htmlValue += '<select id="' + nameFieldType + '" class="type" title="Type"><option value="">[Any]</option>';
	for (var i = 0; i < types.length; i++)
	{
	  var type = types[i];
	  htmlValue += '<option value="' + type.key + '">' + type.value + '</option>';
	}
	htmlValue += '</select>';
  }

  htmlValue += '<input id="' + nameFieldReset + '" type="button" class="reset" value="x" title="Reset values" />';

  global.containerShopSearch.appendChild(createLabelValueNode('<label for="' + nameFieldMin + '">' + label + ':</label>', htmlValue, prefix));

  var fieldmin = document.getElementById(nameFieldMin);
  fieldmin.value = global.shopSearch.criteria[nameSettingMin] == valueMin ? '' : global.shopSearch.criteria[nameSettingMin];
  fieldmin.addEventListener('keyup', function(e)
  {
    var value = parseFloat(e.target.value);
	if (isNaN(value)) value = valueMin;
	value = Math.round(value);
	
	if (e.keyCode == 38) value += 1;
	else if (e.keyCode == 40) value -=1;

	e.target.value = value == valueMin ? '' : value;
	setSetting(nameFieldMin, value);
	global.shopSearch.criteria[nameSettingMin] = value;
	filterShopItems();
  }, true);

  var fieldmax = document.getElementById(nameFieldMax);
  fieldmax.value = global.shopSearch.criteria[nameSettingMax] == valueMax ? '' : global.shopSearch.criteria[nameSettingMax];
  fieldmax.addEventListener('keyup', function(e)
  {
	var value = parseFloat(e.target.value);
	if (isNaN(value)) value = valueMax;
	value = Math.round(value);

	if (e.keyCode == 38) value += 1;
	else if (e.keyCode == 40) value -=1;

	e.target.value = value == valueMax ? '' : value;
	setSetting(nameFieldMax, value);
	global.shopSearch.criteria[nameSettingMax] = value;
	filterShopItems();
  }, true);

  if (types)
  {
    var fieldtype = document.getElementById(nameFieldType);
	fieldtype.value = global.shopSearch.criteria[nameSettingType];
    fieldtype.addEventListener('change', function(e)
	{
	  setSetting(nameFieldType, e.target.value);
	  global.shopSearch.criteria[nameSettingType] = e.target.value;
	  filterShopItems();
	}, true);  
  }

  document.getElementById(nameFieldReset).addEventListener('click', function(e)
  {
	document.getElementById(nameFieldMin).value = '';
	document.getElementById(nameFieldMax).value = '';
	setSetting(nameFieldMin, valueMin);
	global.shopSearch.criteria[nameSettingMin] = valueMin;
	setSetting(nameFieldMax, valueMax);
	global.shopSearch.criteria[nameSettingMax] = valueMax;
	if (types && types != null)
	{
	  document.getElementById(nameFieldType).value = '';
	  setSetting(nameFieldType, '');
	  global.shopSearch.criteria[nameSettingType] = '';
	}
	filterShopItems();
  }, true);
}

function hasShopCatWeight(cat)
{
  return isAny(cat, new Array('itp_type_shield', 'itp_type_thrown', 'itp_type_bow', 'itp_type_body_armor', 'itp_type_head_armor',
                              'itp_type_hand_armor', 'itp_type_foot_armor', 'itp_type_one_handed_wpn', 'itp_type_two_handed_wpn',
							  'itp_type_polearm', 'itp_type_crossbow', 'itp_type_arrows', 'itp_type_bolts'));
}

function hasShopCatSpeed(cat)
{
  return isAny(cat, new Array('itp_type_shield', 'itp_type_thrown', 'itp_type_bow', 'itp_type_one_handed_wpn', 'itp_type_two_handed_wpn',
							  'itp_type_polearm', 'itp_type_crossbow'));
}

function hasShopCatLength(cat)
{
  return isAny(cat, new Array('itp_type_one_handed_wpn', 'itp_type_two_handed_wpn', 'itp_type_polearm', 'itp_type_thrown'));
}

function hasShopCatArmor(cat)
{
  return isAny(cat, new Array('itp_type_shield', 'itp_type_body_armor', 'itp_type_head_armor', 'itp_type_hand_armor', 'itp_type_foot_armor'));
}

function hasShopCatDamage(cat)
{
  return isAny(cat, new Array('itp_type_bow', 'itp_type_one_handed_wpn', 'itp_type_two_handed_wpn', 'itp_type_polearm', 'itp_type_crossbow', 'itp_type_thrown', 'itp_type_arrows', 'itp_type_bolts'));
}

function isShopCatOneHanded(cat)
{
  return cat == 'itp_type_one_handed_wpn';
}

function isShopCatTwoHanded(cat)
{
  return cat == 'itp_type_two_handed_wpn';
}

function isShopCatPolearm(cat)
{
  return cat == 'itp_type_polearm';
}

function isShopCatBow(cat)
{
  return cat == 'itp_type_bow';
}

function isShopCatCrossbow(cat)
{
  return cat == 'itp_type_crossbow';
}

function isShopCatThrown(cat)
{
  return cat == 'itp_type_thrown';
}

function isShopCatShield(cat)
{
  return cat == 'itp_type_shield';
}

function isShopCatArrows(cat)
{
  return cat == 'itp_type_arrows';
}

function isShopCatBolts(cat)
{
  return cat == 'itp_type_bolts';
}

function updateInvItems(type)
{
  if (!type || type == 'head') updateInvItem(global.inventory.head);
  if (!type || type == 'body') updateInvItem(global.inventory.body);
  if (!type || type == 'hand') updateInvItem(global.inventory.hand);
  if (!type || type == 'foot') updateInvItem(global.inventory.foot);
  if (!type || type == 'weapon1') updateInvItem(global.inventory.weapon1);
  if (!type || type == 'weapon2') updateInvItem(global.inventory.weapon2);
  if (!type || type == 'weapon3') updateInvItem(global.inventory.weapon3);
  if (!type || type == 'weapon4') updateInvItem(global.inventory.weapon4);
  if (!type || type == 'horse') updateInvItem(global.inventory.horse);

  /*updateInvItemWpf(global.inventory.weapon1);
  updateInvItemWpf(global.inventory.weapon2);
  updateInvItemWpf(global.inventory.weapon3);
  updateInvItemWpf(global.inventory.weapon4);

  updateInvItemDamage(global.inventory.weapon1);
  updateInvItemDamage(global.inventory.weapon2);
  updateInvItemDamage(global.inventory.weapon3);
  updateInvItemDamage(global.inventory.weapon4);*/

  var totalArmorHead = 0;
  var totalArmorBody = 0;
  var totalArmorLeg = 0;

  var allArmors = new Array('head', 'body', 'hand', 'foot');
  for (var i = 0; i < allArmors.length; i++)
  {
    var armorItem = global.inventory[allArmors[i]];
	if (armorItem.shopItem != null)
	{
	  totalArmorHead += armorItem.shopItem.armorHead;
	  totalArmorBody += armorItem.shopItem.armorBody;
	  totalArmorLeg += armorItem.shopItem.armorLeg;
	}
  }

  var totalPrice = 0;
  var allItems = new Array('head', 'body', 'hand', 'foot', 'weapon1', 'weapon2', 'weapon3', 'weapon4', 'horse' );
  for (var i = 0; i < allItems.length; i++)
  {
    var armorItem = global.inventory[allItems[i]];
	if (armorItem.shopItem != null)
	  totalPrice += armorItem.shopItem.price * 2;
  }

  global.inventory.elArmorTotal.innerHTML =
    '<div class="total">' + totalArmorHead + 'h ' + totalArmorBody + 'b ' + totalArmorLeg + 'l</div>'+
	'<br>Total cost: <div class="total">' + formatNumber(totalPrice) + ' g</div>';
}

function updateInvItem(item)
{
  item.elInfo.innerHTML = '';
  item.elAttributes.textContent = '';
  item.elAttributes.title = '';
  item.itemType = null;

  var shopItemName = item.elSelect.selectedIndex > 0 ? item.elSelect.options[item.elSelect.selectedIndex].text : null;
  item.shopItem = shopItemName != null ? getShopItemByName(shopItemName) : null;

  if (item.requiresItemType && item.shopItem != null)
  {
    item.itemType = item.shopItem != null ? getItemTypeByName(shopItemName) : null;
	if (item.itemType == null) item.elInfo.innerHTML = '<div class="error">Unknown item type. Open corresponding shop category to refresh list.</div>';
  }

  if (item.displayWeight && item.shopItem != null)
  {
    item.elInfo.innerHTML = '<div class="weight">weight: ' + item.shopItem.weight + '</div>';
	if (item.shopItem.armorHead > 0) item.elAttributes.textContent += item.shopItem.armorHead + 'h ';
	if (item.shopItem.armorBody > 0) item.elAttributes.textContent += item.shopItem.armorBody + 'b ';
	if (item.shopItem.armorLeg > 0) item.elAttributes.textContent += item.shopItem.armorLeg + 'l ';
  }

  item.elImg.src = item.shopItem != null ? item.shopItem.image : 'http://cme.comoj.com/img/blank.png';
}

function updateInvItemWpf(item)
{
  item.elInfo.innerHTML = '';
  if (item.shopItem == null || item.itemType == null || !isAny(item.itemType, new Array('onehanded', 'twohanded', 'polearm', 'bow', 'crossbow', 'thrown'))) return;

  var armorHead = global.inventory.head.shopItem != null ? global.inventory.head.shopItem.weight : 0;
  var armorBody = global.inventory.body.shopItem != null ? global.inventory.body.shopItem.weight : 0;
  var armorHand = global.inventory.hand.shopItem != null ? global.inventory.hand.shopItem.weight : 0;
  var armorFoot = global.inventory.foot.shopItem != null ? global.inventory.foot.shopItem.weight : 0;

  var armorEncumberance = armorHead * 3 + armorBody + armorHand * 2 + armorFoot - 5;
  if (armorEncumberance < 0) armorEncumberance = 0;
  armorEncumberance = Math.floor(Math.pow(armorEncumberance, 1.12));

  if (item.itemType != 'bow')
  {
    var wpf = 0;
	if (item.itemType == 'onehanded') wpf = global.char.wpf.onehanded;
	else if (item.itemType == 'twohanded') wpf = global.char.wpf.twohanded;
	else if (item.itemType == 'polearm') wpf = global.char.wpf.polearm;
	else if (item.itemType == 'crossbow') wpf = global.char.wpf.crossbow;
	else if (item.itemType == 'thrown') wpf = global.char.wpf.throwing;

	wpfEncumbered = wpf - armorEncumberance;
	if (wpfEncumbered < 1) wpfEncumbered = 1;

	if (wpfEncumbered < wpf) item.elInfo.innerHTML = '<div class="wpf malus">Due to the armor weight the proficiency with this weapon is reduced to '  + wpfEncumbered + '.</div>';
	item.effectiveWpf = wpfEncumbered;
  }
  else
  {
    var wpf = global.char.wpf.archery;
	var pd = global.char.skills.powerdraw;
	var pdMalus = 0;
	var pdEffective = 0;

	var wpfNerfed = wpf - (pd * 14);
	if (wpfNerfed < 1) wpfNerfed = 1;
	wpfNerfed = Math.floor(Math.pow(wpfNerfed, 1.16));

	wpfEncumbered = wpfNerfed - (armorEncumberance * 2.5);
	if (wpfEncumbered < 0)
	{
	  wpfEncumbered = 1;
	  pdMalus = Math.abs(wpfEncumbered);
	  pdMalus = Math.floor(pdMalus / 25) + 1;
	}
	else if (wpfEncumbered < 1)
	{
	  wpfEncumbered = 1;
	}
	pdEffective = pd - pdMalus;

	if (pd == pdEffective)
	{
	  if (wpfEncumbered < wpf) item.elInfo.innerHTML = '<div class="wpf malus">Due to the armor weight the proficiency with this weapon is reduced to ' + wpfEncumbered + '.</div>';
	  else if (wpfEncumbered > wpf) item.elInfo.innerHTML = '<div class="wpf bonus">The light armor increases your proficiency with this weapon to ' + wpfEncumbered + '.</div>';
	}
	else
	{
	  item.elInfo.innerHTML = '<div class="wpf malus">Due to the armor weight the proficiency with this weapon is reduced to ' + wpfEncumbered + ' and power draw to ' + pdEffective + '.</div>';
	}

	item.effectiveWpf = wpfEncumbered;
  }
}

function updateInvItemDamage(item)
{
  item.elAttributes.textContent = '';
  item.elAttributes.title = '';
  if (item.shopItem == null || item.itemType == null || !isAny(item.itemType, new Array('onehanded', 'twohanded', 'polearm'))) return;

  if (item.shopItem.swingDamage > 0)
  {
    var swing = calculateWeaponDamage(item, 'swing');
	item.elAttributes.textContent = swing.average + swing.type[0];
	item.elAttributes.title = 'Swing' + (swing.shield ? ' with shield' : '') + (swing.mounted ? ' on mount' : '') + ': ' + swing.min + '-' + swing.max + ' ' + swing.type;
  }

  if (item.shopItem.thrustDamage > 0)
  {
    var thrust = calculateWeaponDamage(item, 'thrust');
	if (item.elAttributes.textContent != '') item.elAttributes.textContent += ' ';
	item.elAttributes.textContent += thrust.average + thrust.type[0];
	if (item.elAttributes.title != '') item.elAttributes.title += ', ';
	item.elAttributes.title += 'Thrust' + (thrust.shield ? ' with shield' : '') + (thrust.mounted ? ' on mount' : '') + ': ' + thrust.min + '-' + thrust.max + ' ' + thrust.type;
  }
}

function calculateWeaponDamage(item, type)
{
  // ----- Input
  var str = global.char.atr.strength;
  var ps = global.char.skills.powerstrike;
  var arm = getSetting('armoropponent', 30);
  var wpf = item.effectiveWpf;
  var weaponCat = ''; // 1h, 2h or 2hpole / 1.5h and 1hpole not supported yet

  if (item.itemType == 'onehanded') weaponCat = '1h';
  else if (item.itemType == 'twohanded') weaponCat = '2h';
  else if (item.itemType == 'polearm') weaponCat = '2hpole';

  var mounted = global.inventory.horse.shopItem != null;
  var shield = weaponCat == '1h' && (global.inventory.weapon1.itemType == 'shield' || global.inventory.weapon2.itemType == 'shield' || global.inventory.weapon3.itemType == 'shield' || global.inventory.weapon4.itemType == 'shield');

  var dmgType = '';
  var dmg = 0;
  if (type == 'swing')
  {
    dmgType = item.shopItem.swingType;
	dmg = item.shopItem.swingDamage;
  }
  else if (type == 'thrust')
  {
    dmgType = item.shopItem.thrustType;
	dmg = item.shopItem.thrustDamage;
  }
  
  // ----- Penalty modifier
  var penaltyMod = null;
  if (mounted)
  {
    if (shield)
	{
	  switch (weaponCat)
	  {
	    case '1h': penaltyMod = 1; break; // mounted + shield + 1h
		case '1.5h': penaltyMod = 0.85; break; // mounted + shield + 1.5h
		case '1hpole': penaltyMod = 0.72; break; // mounted + shield + 1hpole
	  }
	}
	else
	{
	  switch (weaponCat)
	  {
	    case '1h': penaltyMod = 1; break; // mounted + 1h
		case '1.5h': penaltyMod = 0.85; break; // mounted + 1.5h
		case '2h': penaltyMod = 0.765; break; // mounted + 2h
		case '1hpole': penaltyMod = 0.72; break; // mounted + 1hpole
		case '2hpole': penaltyMod = 0.65; break; // mounted + 2hpole
	  }
	}
  }
  else
  {
    if (shield)
	{
	  switch (weaponCat)
	  {
	    case '1h': penaltyMod = 1; break; // shield + 1h
		case '1.5h': penaltyMod = 0.85; break; // shield + 1.5h
		case '1hpole': penaltyMod = 0.72; break; // shield + 1hpole
	  }
	}
	else
	{
	  penaltyMod = 1;
	}
  }

  // ----- Potential maximum damage
  var holdMod = 0.85;
  var psBonus = 0.08;
  var wpfBonus = 0.178;
  var potentialDamage = penaltyMod * (holdMod * dmg * (1 + ps * psBonus) * (1 + wpf / 100.0 * wpfBonus) + str / 5);

  // ----- Armor reduction
  var soakFactor = null;
  var reductionFactor = null;
  switch (dmgType)
  {
    case 'cut':
	  soakFactor = 0.8;
	  reductionFactor = 1.0;
	  break;
	case 'pierce':
	  soakFactor = 0.65;
	  reductionFactor = 0.5;
	  break;
	case 'blunt':
	  soakFactor = 0.5;
	  reductionFactor = 0.75;
	  break;
  }

  // ----- Damage
  var damage = {type:dmgType, average:0, min:0, max:0, shield:shield, mounted:mounted};

  // Soak
  damage.min = potentialDamage - 1 * arm * soakFactor;
  damage.max = potentialDamage - 0.5 * arm * soakFactor;

  // Reduction
  damage.min = damage.min * (1 - arm / 100.0 * reductionFactor);
  damage.max = damage.max * (1 - 0.5 * arm / 100.0 * reductionFactor);

  // Result
  damage.min = Math.round(damage.min);
  damage.max = Math.round(damage.max);
  if (damage.min < 0) damage.min = 0;
  if (damage.max < 0) damage.max = 0;
  damage.average = (damage.min + damage.max) / 2;

  return damage;
}

function orderShopItems()
{
  while (global.containerShopItems.childNodes.length > 0)
  {
    global.containerShopItems.removeChild(global.containerShopItems.firstChild);
  }

  if (global.shopSearch.criteria.reverseOrder)
  {
    for (var i = global.shopSearch.items.length - 1; i >= 0; i--)
	{
	  global.containerShopItems.appendChild(global.shopSearch.items[i].item);
	}
  }
  else
  {
    for (var i = 0; i < global.shopSearch.items.length; i++)
	{
	  global.containerShopItems.appendChild(global.shopSearch.items[i].item);
	}
  }
}

function filterShopItems()
{
  var paramItemType = getUrlParameter('itemtype');
  var hasPrice = true;
  var hasName = true;
  var hasWeight = hasShopCatWeight(paramItemType);
  var hasSpeed = hasShopCatSpeed(paramItemType);
  var hasLength = hasShopCatLength(paramItemType);
  var hasArmor = hasShopCatArmor(paramItemType);
  var hasDamage = hasShopCatDamage(paramItemType);

  var criteriaHideTooExpensive = global.shopSearch.criteria.hideTooExpensive;
  var criteriaHideTooDifficult = global.shopSearch.criteria.hideTooDifficult;
  var criteriaPriceMin = hasPrice ? global.shopSearch.criteria.priceMin : 0;
  var criteriaPriceMax = hasPrice ? global.shopSearch.criteria.priceMax : 999999;
  var criteriaName = hasName ? global.shopSearch.criteria.name.toLowerCase() : '';
  var criteriaWeightMin = hasWeight ? global.shopSearch.criteria.weightMin : 0;
  var criteriaWeightMax = hasWeight ? global.shopSearch.criteria.weightMax : 999;
  var criteriaSpeedMin = hasSpeed ? global.shopSearch.criteria.speedMin : 0;
  var criteriaSpeedMax = hasSpeed ? global.shopSearch.criteria.speedMax : 999;
  var criteriaLengthMin = hasLength ? global.shopSearch.criteria.lengthMin : 0;
  var criteriaLengthMax = hasLength ? global.shopSearch.criteria.lengthMax : 999;
  var criteriaArmorMin = hasArmor ? global.shopSearch.criteria.armorMin : 0;
  var criteriaArmorMax = hasArmor ? global.shopSearch.criteria.armorMax : 999;
  var criteriaArmorType = hasArmor ? global.shopSearch.criteria.armorType : '';
  var criteriaDamageMin = hasDamage ? global.shopSearch.criteria.damageMin : 0;
  var criteriaDamageMax = hasDamage ? global.shopSearch.criteria.damageMax : 999;
  var criteriaDamageType = hasDamage ? global.shopSearch.criteria.damageType : '';

  var availableDifficulty = 999;
  if (paramItemType == 'itp_type_horse') availableDifficulty = global.char.skills.riding;
  else if (paramItemType == 'itp_type_shield') availableDifficulty = global.char.skills.shield;
  else if (paramItemType == 'itp_type_thrown') availableDifficulty = global.char.skills.powerthrow;
  else if (paramItemType == 'itp_type_bow') availableDifficulty = global.char.skills.powerdraw;
  else if (paramItemType == 'itp_type_body_armor' || paramItemType == 'itp_type_head_armor' || paramItemType == 'itp_type_hand_armor' ||
           paramItemType == 'itp_type_foot_armor' || paramItemType == 'itp_type_one_handed_wpn' || paramItemType == 'itp_type_two_handed_wpn' ||
		   paramItemType == 'itp_type_polearm' || paramItemType == 'itp_type_crossbow')
  {
    availableDifficulty = global.char.atr.strength;
  }

  for (var i = 0; i < global.shopSearch.items.length; i++)
  {
    var item = global.shopSearch.items[i];
	var match = (criteriaHideTooExpensive == false || !item.tooExpensive) &&
	            (criteriaHideTooDifficult == false || availableDifficulty >= item.difficulty) &&
				(criteriaPriceMin == 0 || item.price >= criteriaPriceMin) && (criteriaPriceMax == 999999 || item.price <= criteriaPriceMax) &&
				(criteriaName == '' || item.name.indexOf(criteriaName) > -1) &&
				(criteriaWeightMin == 0 || item.weight >= criteriaWeightMin) && (criteriaWeightMax == 999 || item.weight <= criteriaWeightMax) &&
				(criteriaSpeedMin == 0 || item.speed >= criteriaSpeedMin) && (criteriaSpeedMax == 999 || item.speed <= criteriaSpeedMax) &&
				(criteriaLengthMin == 0 || item.length >= criteriaLengthMin) && (criteriaLengthMax == 999 || item.length <= criteriaLengthMax) &&
				(criteriaArmorMin == 0 || (item.armorHead >= criteriaArmorMin && (criteriaArmorType == '' || criteriaArmorType == 'head')) ||
				                          (item.armorBody >= criteriaArmorMin && (criteriaArmorType == '' || criteriaArmorType == 'body')) ||
										  (item.armorLeg >= criteriaArmorMin && (criteriaArmorType == '' || criteriaArmorType == 'leg'))) &&
				(criteriaArmorMax == 999 || (item.armorHead > 0 && item.armorHead <= criteriaArmorMax && (criteriaArmorType == '' || criteriaArmorType == 'head')) ||
				                            (item.armorBody > 0 && item.armorBody <= criteriaArmorMax && (criteriaArmorType == '' || criteriaArmorType == 'body')) ||
										    (item.armorLeg > 0 && item.armorLeg <= criteriaArmorMax && (criteriaArmorType == '' || criteriaArmorType == 'leg'))) &&
				(criteriaDamageMin == 0 || (item.thrustDamage >= criteriaDamageMin && (criteriaDamageType == '' || item.thrustType == criteriaDamageType)) ||
                                           (item.swingDamage >= criteriaDamageMin && (criteriaDamageType == '' || item.swingType == criteriaDamageType))) &&
                (criteriaDamageMax == 999 || (item.thrustDamage > 0 && item.thrustDamage <= criteriaDamageMax && (criteriaDamageType == '' || item.thrustType == criteriaDamageType)) ||
	                                         (item.swingDamage > 0 && item.swingDamage <= criteriaDamageMax && (criteriaDamageType == '' || item.swingType == criteriaDamageType))) &&
				(criteriaDamageType == '' || item.thrustType == criteriaDamageType || item.swingType == criteriaDamageType);
	item.item.style.display = match ? 'inline-block' : 'none';
  }
}

function getShopItemByName(name)
{
  name = name.toLowerCase();
  for (var i = 0; i < global.shopSearch.items.length; i++)
  {
    var item = global.shopSearch.items[i];
    if(item.name == name) return item;
  }
  return null;
}

function updateTypesFromShopItems(type)
{
  var setting = '';
  global.itemTypes[type] = new Array();
  var arrayTypes = global.itemTypes[type];

  for (var i = 0; i < global.shopSearch.items.length; i++)
  {
    var item = global.shopSearch.items[i];
    arrayTypes.push(item.name);
	if (setting != '') setting += '|';
	setting += item.name;
  }

  setSetting('itemtypes' + type, setting);
}

function getItemTypeByName(name)
{
  name = name.toLowerCase();
  var types = new Array('onehanded', 'twohanded', 'polearm', 'bow', 'crossbow', 'thrown', 'shield', 'arrows', 'bolts');
  
  // We need to loop through twice because the standard names can already contain modifiers like 'heavy'
  for (var i = 0; i < types.length; i++)
  {
    var type = types[i];
	if (global.itemTypes[type] == null) global.itemTypes[type] = getSetting('itemtypes' + type, '').split('|');
    for (var j = 0; j < global.itemTypes[type].length; j++)
	{
	  if (name == global.itemTypes[type][j]) return type;
	}
  }

  // Remove any modifier ...
  var modifiers = new Array('strong ', 'balanced ', 'heavy ', 'thick ', 'sturdy ', 'large ', 'tempered ', 'scary ', 'masterwork ');
  for (var i = 0; i < modifiers.length; i++)
  {
    name = name.replace(modifiers[i], '');
  }  

  // ... and look again
  for (var i = 0; i < types.length; i++)
  {
    var type = types[i];
	if (global.itemTypes[type] == null) global.itemTypes[type] = getSetting('itemtypes' + type, '').split('|');
    for (var j = 0; j < global.itemTypes[type].length; j++)
	{
	  if (name == global.itemTypes[type][j]) return type;
	}
  }

  return null; 
}

function cycleInvItem(item, goToNext)
{
  var delta = goToNext ? 1 : -1;
  var index = item.elSelect.selectedIndex;
  var indexMax = item.elSelect.length - 1;

  index += delta;
  if (index < 0) index = indexMax;
  else if (index > indexMax) index = 0;

  item.elSelect.selectedIndex = index;
  updateInvItems(item.type);
}

function clickShopItemImage(image, imageName)
{
  resetShopItemImage(true);

  global.zoomedShopItem.image = image;
  global.zoomedShopItem.zoomed = document.createElement('img');
  global.zoomedShopItem.zoomed.src = imageName.replace(/\/small\//, '/large/');

  var offset = getPos(image);
  var zoomedOffsetLeft = offset.left - 60 + 25; // 25 is the border width which is ignored in getPos
  var zoomedOffsetTop = offset.top + 25;

  global.zoomedShopItem.zoomed.style.zIndex = '100';
  global.zoomedShopItem.zoomed.style.position = 'absolute';
  global.zoomedShopItem.zoomed.style.width = '200px';
  global.zoomedShopItem.zoomed.style.cursor = 'pointer';
  global.zoomedShopItem.zoomed.style.cursor = '-moz-zoom-out';
  global.zoomedShopItem.zoomed.style.top = zoomedOffsetTop + 'px';
  global.zoomedShopItem.zoomed.style.left = zoomedOffsetLeft + 'px';
  global.zoomedShopItem.zoomed.addEventListener('mouseout', function(e) {resetShopItemImage(false);}, true);
  global.zoomedShopItem.zoomed.addEventListener('click', function(e) {resetShopItemImage(true);}, true);

  global.funcClosePopup = function() {resetShopItemImage(true);};

  image.style.display = 'none';
  document.body.appendChild(global.zoomedShopItem.zoomed);
}

function hoverShopItemImage(image, imageName)
{
	var duration = new Date().getTime() - global.zoomedShopItem.timer;
	if (duration <= 750) clickShopItemImage(image, imageName);
}

function resetShopItemImage(resetTimer)
{
	if (global.zoomedShopItem.zoomed != null) document.body.removeChild(global.zoomedShopItem.zoomed);
	if (global.zoomedShopItem.image != null) global.zoomedShopItem.image.style.display = 'inline';
	global.funcClosePopup = null;

	global.zoomedShopItem.zoomed = null;
	global.zoomedShopItem.image = null;
	global.zoomedShopItem.timer = resetTimer ? 0 : new Date().getTime();
}

function parseCharElements()
{
  global.containerCharDetails = createContainer('cchardetails', global.containerChar);
  global.containerCharPoints = createContainer('ccharpoints', global.containerChar);

  parseCharPersonalElements();
  parseCharAtrElements();
  parseCharWpfElements();
  parseCharSkillsElements();
}

function parseCharPersonalElements()
{
  var form = global.containerChar.childNodes[0];

  removeWhitespaceNodes(form);
  if (form.childNodes.length != 1)
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  var table = form.childNodes[0];
  if (!doesTableContentMatch(table, 11, 2,
                             new Array('age', 'experience', 'level up at', 'kills', 'death', 'gold', 'generation', 'attribute points',
							           'skill points', 'weapon proficiency points', 'convert 2 skill points into 1 attribute point')))
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  global.charLevel = table.rows[0].cells[1].textContent.match(/\[(.*)\]/)[1];
  global.charExperience = parseInt(table.rows[1].cells[1].textContent);
  global.charLevelUpAt = parseInt(table.rows[2].cells[1].textContent);
  global.charKills = parseInt(table.rows[3].cells[1].textContent);
  global.charDeaths = parseInt(table.rows[4].cells[1].textContent);
  global.charGold = parseInt(table.rows[5].cells[1].textContent);
  global.charAvailableAtrPoints = parseInt(table.rows[7].cells[1].textContent);
  global.charAvailableSkillPoints = parseInt(table.rows[8].cells[1].textContent);
  global.charAvailableWpfPoints = parseInt(table.rows[9].cells[1].textContent);
  global.charConvertSkillsToAtrPointHtmlCode = table.rows[10].cells[1].innerHTML;

  table.deleteRow(10);
  table.deleteRow(9);
  table.deleteRow(8);
  table.deleteRow(7);

  var hintExperience = 'You need ' + formatNumber(global.charLevelUpAt - global.charExperience) + ' XP for the next level.';
  var hintRank = 'Your K:D ratio is ' + getKillDeathRatio(global.charKills, global.charDeaths) + '. You need ' + global.rankXp + ' for the next rank.';

  global.containerCharDetails.appendChild(createHeaderNode(1, global.charName));
  global.containerCharDetails.appendChild(createLabelValueNode('Age', table.rows[0].cells[1].textContent, 'age'));
  global.containerCharDetails.appendChild(createLabelValueNode('Generation', table.rows[6].cells[1].textContent, 'generation'));
  global.containerCharDetails.appendChild(createLabelValueNode('Gold', formatNumber(global.charGold), 'gold'));
  global.containerCharDetails.appendChild(createLabelValueNode('Experience', formatNumber(global.charExperience), 'xp', hintExperience));
  global.containerCharDetails.appendChild(createLabelValueNode('+', formatNumber(global.charLevelUpAt - global.charExperience), 'missingxp', hintExperience));
  global.containerCharDetails.appendChild(createLabelValueNode('Level up at', formatNumber(global.charLevelUpAt), 'nextlevel', hintExperience));
  global.containerCharDetails.appendChild(createLabelValueNode('Kills', table.rows[3].cells[1].textContent, 'kills', hintRank));
  global.containerCharDetails.appendChild(createLabelValueNode('Death', table.rows[4].cells[1].textContent, 'death', hintRank));
  global.containerCharDetails.appendChild(createLabelValueNode('Rank', global.rank, 'rank', hintRank));
  global.containerChar.removeChild(form);
}

function parseCharAtrElements()
{
  var form = global.containerChar.childNodes[0];

  removeWhitespaceNodes(form);
  if (form.childNodes.length != 1)
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  var table = form.childNodes[0];
  form.insertBefore(createHtmlNode('<h1>Attributes</h1><div class="points">Available points: <span>' + global.charAvailableAtrPoints + '</span></div>', 'atr header'), table);

  for (var i = 0; i < table.rows.length; i++)
  {
    var row = table.rows[i];
	var name = row.cells[0].textContent;
	var value = parseInt(row.cells[1].textContent);

	if (name == 'Strength') global.char.atr.strength = value;
	else if (name == 'Agility') global.char.atr.agility = value;
	else
	{
      moveNode(form, global.containerUnknown);
  	  global.hasUnknownPageElements = true;
	  return;
	}
  }

  moveNode(form, global.containerCharPoints);
}

function parseCharWpfElements()
{
  var form = global.containerChar.childNodes[0];

  removeWhitespaceNodes(form, true);
  if (form.childNodes.length != 1)
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  var table = form.childNodes[0];
  form.insertBefore(createHtmlNode('<h1>Weapon proficiency</h1><div class="points">Available points: <span>' + global.charAvailableWpfPoints + '</span></div>', 'wpf header'), table);

  for (var i = 0; i < table.rows.length; i++)
  {
    var row = table.rows[i];
	var name = row.cells[0].textContent;
	var value = parseInt(row.cells[1].textContent);

	if (name == 'One Handed') global.char.wpf.onehanded = value;
	else if (name == 'Two Handed') global.char.wpf.twohanded = value;
	else if (name == 'Polearm') global.char.wpf.polearm = value;
	else if (name == 'Archery') global.char.wpf.archery = value;
	else if (name == 'Crossbow') global.char.wpf.crossbow = value;
	else if (name == 'Throwing') global.char.wpf.throwing = value;
	else
	{
      moveNode(form, global.containerUnknown);
  	  global.hasUnknownPageElements = true;
	  return;
	}
  }

  moveNode(form, global.containerCharPoints);
}

function parseCharSkillsElements()
{
  var form = global.containerChar.childNodes[0];
  removeWhitespaceNodes(form);

  var table = form.childNodes[0];
  if (table.nodeName != 'TABLE' && table.id != 'skills')
  {
    moveNode(form, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  // Move everything except table to options page
  var formOptions = form.cloneNode(true);
  formOptions.action = formOptions.action.replace('#char', '#options');
  formOptions.removeChild(formOptions.childNodes[0]);
  global.containerOptions.appendChild(formOptions);
  removeAllButThisNode(form, table);

  form.insertBefore(createHtmlNode('<h1>Skills</h1><div class="points">Available points: <span>' + global.charAvailableSkillPoints + '</span>' + global.charConvertSkillsToAtrPointHtmlCode + '</div>', 'skills header'), table);

  for (var i = 0; i < table.rows.length; i++)
  {
    var row = table.rows[i];
	var name = row.cells[0].textContent;
	var value = parseInt(row.cells[1].textContent);

	if (name == 'Ironflesh') global.char.skills.ironflesh = value;
	else if (name == 'Power Strike') global.char.skills.powerstrike = value;
	else if (name == 'Shield') global.char.skills.shield = value;
	else if (name == 'Athletics') global.char.skills.athletics = value;
	else if (name == 'Riding') global.char.skills.riding = value;
	else if (name == 'Horse Archery') global.char.skills.horsearchery = value;
	else if (name == 'Power Draw') global.char.skills.powerdraw = value;
	else if (name == 'Power Throw') global.char.skills.powerthrow = value;
	else if (name == 'Weapon master *') global.char.skills.weaponmaster = value;
	else
	{
      moveNode(form, global.containerUnknown);
  	  global.hasUnknownPageElements = true;
	  return;
	}
  }

  moveNode(form, global.containerCharPoints);
}

function parseBattleElements()
{
  // Setup menu
  global.containerBattlesMenu = createContainer('cbattlesmenu', global.containerBattles);
  var urlNew = global.urlBase + '#battles';
  var urlOld = global.urlBase + '?mybattles=1';
  global.containerBattlesMenu.appendChild(wrapNode(createLinkWithShowPageCall('linkbattlesnew', urlNew, 'Upcoming battles'), 'div'));
  global.containerBattlesMenu.appendChild(wrapNode(createLinkWithShowPageCall('linkbattlesold', urlOld, 'Participated battles'), 'div'));

  parseBattleNewElements();
  parseBattleOldElements();
}

function parseBattleNewElements()
{
  if (global.containerBattlesNew.childNodes.length != 1 || global.containerBattlesNew.childNodes[0].className != 'battle')
  {
    moveNode(global.containerBattlesNew, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }
  
  var table = global.containerBattlesNew.childNodes[0];
  var detailRowIndex = -1;
  var detailElement = null;
  var nowDay = getDayName(new Date());
  var nowHour = new Date().getHours();

  for (var i = 0; i < table.rows.length; i++)
  {
    var row = table.rows[i];
	if (row.cells.length == 1)
	{
	  detailRowIndex = i;
	  detailElement = row.cells[0].childNodes[0];
	}
	else
	{
	  if (row.style.color != null && (row.style.color.indexOf('rgb(133, 99, 0)') > -1 || row.style.color.indexOf('856300') > -1))
	  {
	    row.style.color = '';
	    row.className += ' pending';
	  }
	  else if (row.style.color != null && (row.style.color.indexOf('darkgreen') > -1 || row.style.color.indexOf('rgb(0, 100, 0)') > -1 || row.style.color.indexOf('006400') > -1))
	  {
  	    row.style.color = '';
	    row.className += ' accepted';
	  }

	  var server = row.cells[3].firstChild.textContent;
	  if (!contains(global.battleNewSearch.servers, server)) global.battleNewSearch.servers.push(server);

	  var type = 'battle';

	  var clanlocation1 = parseClanAndLocation(row.cells[0].textContent);
	  if (!contains(global.battleNewSearch.clans, clanlocation1.clan)) global.battleNewSearch.clans.push(clanlocation1.clan);
	  if (clanlocation1.location != '') type = 'siege';

  	  var clanlocation2 = parseClanAndLocation(row.cells[1].textContent);
	  if (!contains(global.battleNewSearch.clans, clanlocation2.clan)) global.battleNewSearch.clans.push(clanlocation2.clan);
	  if (clanlocation2.location != '') type = 'siege';

	  var day = '';
	  var hour = 0;

	  if (row.cells[2].textContent.toLowerCase().indexOf('now') > -1)
	  {
	    day = nowDay;
		hour = nowHour;
	  }
	  else
	  {
	    var day = row.cells[2].firstChild.textContent.substr(0, 3);
	    var hour = parseInt(row.cells[2].firstChild.textContent.substr(5, 2));
	  }

	  var item = {item:row, server:server, day:day, hour:hour, clan1:clanlocation1.clan, clan2:clanlocation2.clan, type:type};
	  global.battleNewSearch.items.push(item);

      addShowPageCallOnClick(row, row.cells[2].firstChild.href);
	}
  }

  initBattleNewSearch();
  filterBattleNewItems();

  if (detailElement != null)
  {
  	parseBattleDetails(table.rows[detailRowIndex - 1], detailElement);
	if (global.hasUnknownPageElements) return;

    var linkPrev = '&lt; Previous';
	var linkNext = 'Next &gt;';
    if (detailRowIndex > 1)
    {
	  var prevRow = getFirstVisibleTableRowBefore(table, detailRowIndex - 2);
	  if (prevRow != null) linkPrev = '<a href="' + prevRow.cells[2].childNodes[0].href + '">&lt; Previous</a>';
	}
	if (detailRowIndex < (table.rows.length -1))
	{
	  var nextRow = getFirstVisibleTableRowAfter(table, detailRowIndex + 1);
	  if (nextRow != null) linkNext = '<a href="' + nextRow.cells[2].childNodes[0].href + '">Next &gt;</a>';
	}
    table.deleteRow(detailRowIndex);

	var navigation = createHtmlNode(linkPrev + ' | ' + linkNext, 'navigation');
	global.containerBattlesDetail.appendChild(navigation);
	
	var closepopup = createHtmlNode('<span>x</span>', 'closepopup', 'Close the battle details (ESC)');
	global.containerBattlesDetail.appendChild(closepopup);
	closepopup.addEventListener('click', function(e)
	{
	  executeClosePopupFunc();
	}, true);

	var detailElementFirstOriginal = detailElement.firstChild;
	
	detailElement.insertBefore(createHtmlNode(
	  '<span class="time">When: ' + global.battle.time + '</span><span class="server">Server: ' + global.battle.server + '</span><div class="clear"></div>',
	  'info'), detailElementFirstOriginal);

    var versus = document.createElement('div');
	versus.className = 'versus';
	detailElement.insertBefore(versus, detailElementFirstOriginal);
    appendBattleArmyHeaderNode(versus, global.battle.army1);
	versus.appendChild(createHtmlNode('vs', 'vs'));
	appendBattleArmyHeaderNode(versus, global.battle.army2);

	var roster = createHtmlNode(
	  '<div class="fighters">'+
	    '<div class="number army1">' + global.battle.army1.fighters + ' Fighters</div>'+
		'<div class="toggle"><a href="javascript:" title="Click to toggle roster display">roster</a></div>'+
		'<div class="number army2">' + global.battle.army2.fighters + ' Fighters</div>'+
	  '</div>'+
	  '<div class="names">'+
	    '<div class="list army1">' + global.battle.army1.roster + '</div>'+
		'<div class="spacer"></div>'+
		'<div class="list army2">' + global.battle.army2.roster + '</div>'+
	  '</div>', 'roster');
	roster.id = 'battleroster';
	detailElement.insertBefore(roster, detailElementFirstOriginal);

	if (getSetting('battledetailsrosternamesvisible', false))
	{
	  roster.style.height = 'auto';
	}

	roster.addEventListener('click', function(e)
	{
	  if (e.target.nodeName != 'A') return;

	  var roster = document.getElementById('battleroster');
	  if (roster.style.height == 'auto')
	  {
	    roster.style.height = '25px';
		setSetting('battledetailsrosternamesvisible', false);
	  }
      else
	  {
	    roster.style.height = 'auto';	    
		setSetting('battledetailsrosternamesvisible', true);
	  }
	}, true);

    moveNode(detailElement, global.containerBattlesDetail);
  }
}

function appendBattleArmyHeaderNode(parentNode, army)
{
  var armyNode = createHtmlNode(
    '<div class="troops">' + army.troops + '</div>' +
	'<div class="clan">' + army.clan + '</div>' +
	'<div class="at">' + (army.location != '' ? 'defending' : 'commanded by') + '</div>' +
	'<div class="loc">' + (army.location != '' ? army.location : army.leader) + '</div>', 'army');
  parentNode.appendChild(armyNode);

  if (army.location != '')
  {
    var imgurl1 = ('http://cme.comoj.com/images/' + army.location + '_sat.jpg').replace(' ', '%20');
    var imgurl2 = ('http://cme.comoj.com/images/' + army.location + '.jpg').replace(' ', '%20');

	armyNode.className += ' town';

	global.containerTownImage.innerHTML = 
	  '<div class="title">'+
	    '<h1>' + army.location + '</h1>'+
	    '<div>'+
		  '<a href="javascript:" onclick="document.getElementById(\'townimage1\').style.display=\'block\'; document.getElementById(\'townimage2\').style.display=\'none\';">Bird view</a> | '+
		  '<a href="javascript:" onclick="document.getElementById(\'townimage2\').style.display=\'block\'; document.getElementById(\'townimage1\').style.display=\'none\';">Side view</a>'+
	    '</div>'+
	  '</div>'+
	  '<div id="townimageclosepopup" class="closepopup" title="Close the map explorer (ESC)"><span>x</span></div>'+
	  '<img id="townimage1" src="' + imgurl1 + '" style="display:block" onclick="document.getElementById(\'townimage2\').style.display=\'block\'; document.getElementById(\'townimage1\').style.display=\'none\';">'+
	  '<img id="townimage2" src="' + imgurl2 + '" style="display:none" onclick="document.getElementById(\'townimage1\').style.display=\'block\'; document.getElementById(\'townimage2\').style.display=\'none\';">';

	document.getElementById('townimageclosepopup').addEventListener('click', function(e)
	{
	  executeClosePopupFunc();
	}, true);

	armyNode.addEventListener('click', function(e)
	{
	  global.containerBattlesDetail.style.display = 'none';
	  global.containerTownImage.style.display = 'block';
	  global.funcClosePopup = function() { showPage(); }
	}, true);
  }
  else
  {
    armyNode.className += ' party';
  }
}

function parseBattleDetails(detailRow, detailElement)
{
  removeWhitespaceNodes(detailElement);
  if (detailElement.childNodes.length < 1 || detailElement.firstChild.nodeName != 'TABLE' ||
      !doesTableContentMatch(detailElement.firstChild, 3, 4, new Array('', 'troops', 'roster'), new Array('', '', 'vs', '')))
  {
    moveNode(detailElement, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  if (detailElement.lastChild.nodeName == 'FORM')
  {
    appendToFormAction(detailElement.lastChild, '#battles');
  }

  global.battle.time = detailRow.cells[2].childNodes[0].textContent;
  global.battle.server = detailRow.cells[3].childNodes[0].textContent;

  var table = detailElement.firstChild;

  parseBattleArmyDetails(table.rows[0].cells[1].innerHTML, table.rows[1].cells[1].textContent, table.rows[2].cells[1].innerHTML, global.battle.army1);
  parseBattleArmyDetails(table.rows[0].cells[3].innerHTML, table.rows[1].cells[3].textContent, table.rows[2].cells[3].innerHTML, global.battle.army2);

  detailElement.removeChild(table);
}

function parseBattleArmyDetails(headerHtml, troopsText, rosterHtml, toArmy)
{
  parseBattleArmyHeaderText(headerHtml, toArmy);
  toArmy.troops = parseInt(troopsText);
  toArmy.roster = rosterHtml.replace(/<b>.* Fighters<\/b><br>/, '');
  toArmy.fighters = parseInt(rosterHtml.match(/<b>(.*) Fighters<\/b>/)[1]);
}

function parseBattleArmyHeaderText(fromText, toArmy)
{
  var leaderclan = fromText.split('<br>');
  toArmy.leader = leaderclan[0];
  var clanlocation = parseClanAndLocation(leaderclan[1]);
  toArmy.clan = clanlocation.clan;
  toArmy.location = clanlocation.location;
}

function initBattleNewSearch()
{
  // Restore settings
  global.battleNewSearch.criteria.server = getSetting('battlesnewsearchserver', '');
  global.battleNewSearch.criteria.day = getSetting('battlesnewsearchday', '');
  global.battleNewSearch.criteria.time = getSetting('battlesnewsearchtime', '');
  global.battleNewSearch.criteria.type = getSetting('battlesnewsearchtype', '');
  global.battleNewSearch.criteria.clan = getSetting('battlesnewsearchclan', '');

  // Server search field
  global.containerBattlesNewSearch.appendChild(createHtmlNode('<label for="battlesnewsearchserver"><span>Server:</span><select id="battlesnewsearchserver"><option value="">[Any]</option></select></label>'));
  var fieldServer = document.getElementById('battlesnewsearchserver');
  for (var i = 0; i < global.battleNewSearch.servers.length; i++)
  {
    var server = global.battleNewSearch.servers[i];
    fieldServer.options[fieldServer.options.length] = new Option(server, server, false, server == global.battleNewSearch.criteria.server);
  }
  fieldServer.addEventListener('change', function(e)
  {
    global.battleNewSearch.criteria.server = e.target.value;
	setSetting('battlesnewsearchserver', e.target.value);
    filterBattleNewItems();
  }, true);

  // Day search field
  var days = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  var date = new Date();
  var dayToday = days[date.getDay()];
  date.setDate(date.getDate() + 1);
  var dayTomorrow = days[date.getDay()];

  global.containerBattlesNewSearch.appendChild(createHtmlNode(
    '<label for="battlesnewsearchday"><span>Day:</span><select id="battlesnewsearchday">'+
	  '<option value="">[Any]</option>'+
	  '<option value="' + dayToday +'">Today</option>'+
	  '<option value="' + dayTomorrow +'">Tomorrow</option>'+
	  '<option value="Mon">Monday</option>'+
	  '<option value="Tue">Tuesday</option>'+
	  '<option value="Wed">Wednesday</option>'+
	  '<option value="Thu">Thursday</option>'+
	  '<option value="Fri">Friday</option>'+
	  '<option value="Sat">Saturday</option>'+
	  '<option value="Sun">Sunday</option>'+
	'</select></label>'));
  var fieldDay = document.getElementById('battlesnewsearchday');
  fieldDay.value = global.battleNewSearch.criteria.day;
  fieldDay.addEventListener('change', function(e)
  {
    global.battleNewSearch.criteria.day = e.target.value;
	setSetting('battlesnewsearchday', e.target.value);
    filterBattleNewItems();
  }, true);

  // Time search field
  global.containerBattlesNewSearch.appendChild(createHtmlNode(
    '<label for="battlesnewsearchtime"><span>Time:</span><select id="battlesnewsearchtime">'+
	  '<option value="">[Any]</option>'+
	  '<option value="morning">Morning (6)</option>'+
	  '<option value="afternoon">Afternoon (12)</option>'+
	  '<option value="evening">Evening (18)</option>'+
	  '<option value="night">Night (0)</option>'+
	'</select></label>'));
  var fieldTime = document.getElementById('battlesnewsearchtime');
  fieldTime.value = global.battleNewSearch.criteria.time;
  fieldTime.addEventListener('change', function(e)
  {
    global.battleNewSearch.criteria.time = e.target.value;
	setSetting('battlesnewsearchtime', e.target.value);
    filterBattleNewItems();
  }, true);

  // Type search field
  global.containerBattlesNewSearch.appendChild(createHtmlNode(
    '<label for="battlesnewsearchtype"><span>Type:</span><select id="battlesnewsearchtype">'+
	  '<option value="">[Any]</option>'+
	  '<option value="battle">Battle</option>'+
	  '<option value="siege">Siege</option>'+
	'</select></label>'));
  var fieldType = document.getElementById('battlesnewsearchtype');
  fieldType.value = global.battleNewSearch.criteria.type;
  fieldType.addEventListener('change', function(e)
  {
    global.battleNewSearch.criteria.type = e.target.value;
	setSetting('battlesnewsearchtype', e.target.value);
    filterBattleNewItems();
  }, true);

  // Clan search field
  global.containerBattlesNewSearch.appendChild(createHtmlNode('<label for="battlesnewsearchclan"><span>Clan:</span><select id="battlesnewsearchclan"><option value="">[Any]</option></select></label>'));
  var fieldClan = document.getElementById('battlesnewsearchclan');
  global.battleNewSearch.clans.sort();
  for (var i = 0; i < global.battleNewSearch.clans.length; i++)
  {
    var clan = global.battleNewSearch.clans[i];
    fieldClan.options[fieldClan.options.length] = new Option(clan, clan, false, clan == global.battleNewSearch.criteria.clan);
  }
  fieldClan.addEventListener('change', function(e)
  {
    global.battleNewSearch.criteria.clan = e.target.value;
	setSetting('battlesnewsearchclan', e.target.value);
    filterBattleNewItems();
  }, true);
}

function filterBattleNewItems()
{
  var criteriaServer = global.battleNewSearch.criteria.server;
  var criteriaDay = global.battleNewSearch.criteria.day;
  var criteriaTime = global.battleNewSearch.criteria.time;
  var criteriaTimeMin = 0;
  var criteriaTimeMax = 23;
  if (criteriaTime == 'morning') { criteriaTimeMin = 6; criteriaTimeMax = 11; }
  else if (criteriaTime == 'afternoon') { criteriaTimeMin = 12; criteriaTimeMax = 17; }
  else if (criteriaTime == 'evening') { criteriaTimeMin = 18; criteriaTimeMax = 23; }
  else if (criteriaTime == 'night') { criteriaTimeMin = 0; criteriaTimeMax = 5; }
  var criteriaType = global.battleNewSearch.criteria.type;
  var criteriaClan = global.battleNewSearch.criteria.clan;

  for (var i = 0; i < global.battleNewSearch.items.length; i++)
  {
    var item = global.battleNewSearch.items[i];
	var match = (criteriaServer == '' || item.server == criteriaServer) &&
	            (criteriaDay == '' || item.day == criteriaDay) &&
				(criteriaTimeMin <= item.hour && criteriaTimeMax >= item.hour) &&
				(criteriaType == '' || item.type == criteriaType) &&
				(criteriaClan == '' || item.clan1 == criteriaClan || item.clan2 == criteriaClan);
	item.item.style.display = match ? 'table-row' : 'none';
  }
}

function parseBattleOldElements()
{
  if (global.containerBattlesOld.childNodes.length == 0) return;
  if (global.containerBattlesOld.childNodes.length != 1 || global.containerBattlesOld.firstChild.nodeName != 'TABLE')
  {
    moveNode(global.containerBattlesOld, global.containerUnknown);
	global.hasUnknownPageElements = true;
	return;
  }

  var tableOld = global.containerBattlesOld.childNodes[0];
  var tableNew = document.createElement('table');

  for (var i = 1; i < tableOld.rows.length; i++)
  {
    var rowOld = tableOld.rows[i];
	var battle = parseBattleOldRow(rowOld);

	var rowNew = tableNew.insertRow(-1);

	addBattleOldArmyCell(rowNew, battle.army1, battle);
	addBattleOldArmyCell(rowNew, battle.army2, battle);

	var cellKD = rowNew.insertCell(-1);
	cellKD.className = 'killsdeaths';
	if (battle.showedup)
	{
	  cellKD.textContent = battle.kills + ':' + battle.deaths;
	  cellKD.title = 'Your K:D ratio is ' + getKillDeathRatio(battle.kills, battle.deaths) + '.';
	}
	else
	{
	  cellKD.textContent = '-:-';
	  cellKD.title = 'You did not show up.';
	}
	
	var cellPay = rowNew.insertCell(-1);
	cellPay.className = 'pay';
	cellPay.innerHTML =
	  '<div class="requested">' + battle.payreq + 'g</div> '+
	  '<div class="paid">' + battle.pay + 'g</div>';
    if (battle.pay > battle.payreq)
	{
	  cellPay.title = 'You got more payment than requested.';
	  cellPay.className += ' morepay';
	}
	else if (battle.pay < battle.payreq)
	{
	  cellPay.title = 'You got less payment than requested.';
	  cellPay.className += ' lesspay';
	}

	var cellDate = rowNew.insertCell(-1);
	cellDate.className = 'date';
	cellDate.textContent = battle.date;
	
    var item = {item:rowNew, daysago:battle.daysago, clan1:battle.army1.clan, clan2:battle.army2.clan, type:(battle.army1.location != '' || battle.army2.location != '' ? 'siege' : 'battle')};
	global.battleOldSearch.items.push(item);

	if (!contains(global.battleOldSearch.clans, battle.army1.clan)) global.battleOldSearch.clans.push(battle.army1.clan);
	if (!contains(global.battleOldSearch.clans, battle.army2.clan)) global.battleOldSearch.clans.push(battle.army2.clan);
  }

  global.containerBattlesOld.removeChild(tableOld);
  global.containerBattlesOld.appendChild(tableNew);

  initBattleOldSearch();
  filterBattleOldItems();
}

function addBattleOldArmyCell(row, army, battle)
{
  var cell = row.insertCell(-1);
  cell.className = 'army';

  cell.innerHTML =
    '<div class="name">' + army.title + '</div> '+
	'<div class="info">'+
	  '<span class="size">a:' + army.size + '</span> '+
	  (army.winner ? '<span class="left">s:' + army.left + ' k:' + army.killed + '</span>' : '<span class="left">no survivors</span>') +
	'</div>';

  if (battle.side == army)
  {
    cell.className += army.winner ? ' won' : ' lost';
	cell.title = army.winner ? 'Your side has won the battle.' : 'Your side has lost the battle.';
  }
}

function parseBattleOldRow(row)
{
  var result = {army1:{title:'', clan:'', location:'', size:0, killed:0, left:0, winner:false}, army2:{title:'', clan:'', location:'', size:0, killed:0, left:0, winner:false}, date:'', daysago:0, side:null, showedup:false, kills:0, deaths:0, pay:0, payreq:0};

  var armies = row.cells[0].textContent;
  var armiesMatches = armies.match(/A: (.*) D: (.*)Army: (.*) vs (.*)Survivors: (.*) vs (.*)Date: (.*)/);
  result.army1.title = armiesMatches[1];
  result.army1.size = parseInt(armiesMatches[3]);
  result.army1.left = parseInt(armiesMatches[5]);
  result.army1.killed = result.army1.size - result.army1.left;
  result.army1.winner = result.army1.left > 0;
  result.army2.title = armiesMatches[2];
  result.army2.size = parseInt(armiesMatches[4]);
  result.army2.left = parseInt(armiesMatches[6]);
  result.army2.killed = result.army2.size - result.army2.left;
  result.army2.winner = result.army2.left > 0;

  result.date = armiesMatches[7];
  dateMatches = result.date.match(/(\d*)\.(\d*)\.(\d*)/);
  if (dateMatches != null && dateMatches.length == 4)
  {
    var date = new Date(dateMatches[3], parseInt(dateMatches[2]) - 1, dateMatches[1]);
	result.daysago = getDateDiffInFullDays(new Date(), date);
  }

  parseBattleOldRowLocation(result.army1);
  parseBattleOldRowLocation(result.army2);

  var side = row.cells[1].textContent;
  result.side = side.indexOf('attacker') > -1 ? result.army1 : result.army2;
  var sideMatches = side.match(/K:D (.*):(.*)/);
  if (sideMatches != null && sideMatches.length == 3)
  {
    result.showedup = true;
	result.kills = parseInt(sideMatches[1]);
	result.deaths = parseInt(sideMatches[2]);
  }
  
  var pay = row.cells[2].textContent;
  var payMatches = pay.match(/(.*)g \/ (.*)g/);
  result.pay = parseInt(payMatches[1]);
  result.payreq = parseInt(payMatches[2]);

  return result;  
}

function parseBattleOldRowLocation(army)
{
  var data = parseClanAndLocation(army.title);
  army.clan = data.clan;
  army.location = data.location;
}

function initBattleOldSearch()
{
  // Restore settings
  global.battleOldSearch.criteria.period = getSetting('battlesoldsearchperiod', 0);
  global.battleOldSearch.criteria.type = getSetting('battlesoldsearchtype', '');
  global.battleOldSearch.criteria.clan = getSetting('battlesoldsearchclan', '');

  // Period search field
  global.containerBattlesOldSearch.appendChild(createHtmlNode(
    '<label for="battlesoldsearchperiod"><span>Period:</span><select id="battlesoldsearchperiod">'+
	  '<option value="0">[Any]</option>'+
	  '<option value="7">Last 7 days</option>'+
	  '<option value="14">Last 14 days</option>'+
	  '<option value="21">Last 21 days</option>'+
	  '<option value="28">Last 28 days</option>'+
	'</select></label>'));
  var fieldPeriod = document.getElementById('battlesoldsearchperiod');
  fieldPeriod.value = global.battleOldSearch.criteria.period;
  fieldPeriod.addEventListener('change', function(e)
  {
    global.battleOldSearch.criteria.period = e.target.value;
	setSetting('battlesoldsearchperiod', e.target.value);
    filterBattleOldItems();
  }, true);

  // Type search field
  global.containerBattlesOldSearch.appendChild(createHtmlNode(
    '<label for="battlesoldsearchtype"><span>Type:</span><select id="battlesoldsearchtype">'+
	  '<option value="">[Any]</option>'+
	  '<option value="battle">Battle</option>'+
	  '<option value="siege">Siege</option>'+
	'</select></label>'));
  var fieldType = document.getElementById('battlesoldsearchtype');
  fieldType.value = global.battleOldSearch.criteria.type;
  fieldType.addEventListener('change', function(e)
  {
    global.battleOldSearch.criteria.type = e.target.value;
	setSetting('battlesoldsearchtype', e.target.value);
    filterBattleOldItems();
  }, true);

  // Clan search field
  global.containerBattlesOldSearch.appendChild(createHtmlNode('<label for="battlesoldsearchclan"><span>Clan:</span><select id="battlesoldsearchclan"><option value="">[Any]</option></select></label>'));
  var fieldClan = document.getElementById('battlesoldsearchclan');
  global.battleOldSearch.clans.sort();
  for (var i = 0; i < global.battleOldSearch.clans.length; i++)
  {
    var clan = global.battleOldSearch.clans[i];
    fieldClan.options[fieldClan.options.length] = new Option(clan, clan, false, clan == global.battleOldSearch.criteria.clan);
  }
  fieldClan.addEventListener('change', function(e)
  {
    global.battleOldSearch.criteria.clan = e.target.value;
	setSetting('battlesoldsearchclan', e.target.value);
    filterBattleOldItems();
  }, true);
}

function filterBattleOldItems()
{
  var criteriaPeriod = parseInt(global.battleOldSearch.criteria.period);
  var criteriaType = global.battleOldSearch.criteria.type;
  var criteriaClan = global.battleOldSearch.criteria.clan;

  for (var i = 0; i < global.battleOldSearch.items.length; i++)
  {
    var item = global.battleOldSearch.items[i];
	var match = (criteriaPeriod == 0 || item.daysago <= criteriaPeriod) &&
				(criteriaType == '' || item.type == criteriaType) &&
				(criteriaClan == '' || item.clan1 == criteriaClan || item.clan2 == criteriaClan);
	item.item.style.display = match ? 'table-row' : 'none';
  }
}

function parseRetirementElements()
{
  if (global.containerRetirement.childNodes.length == 0) return;
  
  global.containerRetirementInfo = createContainer('cretirementinfo', global.containerRetirement);
  global.containerRetirementRetire = createContainer('cretirementretire', global.containerRetirement);
  
  parseRetirementRequirements();
  parseRetirementRetire();
}

function parseRetirementRequirements()
{
  var list = getFirstChildByTag(global.containerRetirement, 'ul');
  if (list == null) return;

  var req = createHtmlNode('', 'requirements');

  req.appendChild(createHeaderNode(1, 'Requirements'));
  req.appendChild(createLabelValueNode('Without bonus', 'Level 15'));
  req.appendChild(createLabelValueNode('With bonus', 'Level 31'));

  global.containerRetirementInfo.appendChild(req);
  global.containerRetirement.removeChild(list);
}

function parseRetirementRetire()
{
  var form = getFirstChildByTag(global.containerRetirement, 'form');
  var table = getFirstChildByTag(global.containerRetirement, 'table');
  var title = getFirstChildByTag(global.containerRetirement, 'h1');
  
  if (form != null)
  {
	global.containerRetirementRetire.appendChild(form);
	removeWhitespaceNodes(form, true);
  }
  
  if (table != null)
  {
    var desc = '';

	if (title != null)
	{
	  desc = title.textContent;
	  global.containerRetirement.removeChild(title);
	}

    global.containerRetirementRetire.appendChild(createHtmlNode('<h1>Heirloom</h1><div class="desc">' + desc + '</div>', 'heirloom header'));
	global.containerRetirementRetire.appendChild(table);
  }
}

function createHeaderNode(size, text, className)
{
  var element = document.createElement('h' + size);
  if (className != null) element.className += ' ' + className;
  element.textContent = text;
  return element;
}

function createLabelValueNode(label, value, className, title)
{
  var element = document.createElement('div');
  element.className = 'labelvalue';
  if (className != null) element.className += ' ' + className;
  if (title != null) element.title = title;
  element.innerHTML = '<span class="label">' + label + '</span><span class="value">' + value + '</span>';
  return element;
}

function createHtmlNode(html, className, title)
{
  var element = document.createElement('div');
  if (className != null) element.className = className;
  if (title != null) element.title = title;
  element.innerHTML = html;
  return element;
}

function createLink(id, url, text, className, title, target)
{
  var link = document.createElement('a');
  link.id = id;
  link.href = url;
  link.textContent = text;
  if (className) link.className = className;
  if (title) link.title = title;
  if (target) link.target = target;
  return link;
}

function createLinkWithShowPageCall(id, url, text, className)
{
  var link = document.createElement('a');
  link.id = id;
  link.textContent = text;
  link.href = 'javascript:';
  if (className) link.className = className;
  addShowPageCallOnClick(link, url);
  return link;
}

function addShowPageCallOnClick(toNode, url)
{
  toNode.addEventListener('click', function(e)
  {
    window.location.href = url;
    showPage();
  }, true);
}

function getPos(node)
{
  var left = 0;
  var top = 0;

  do
  {
    left += node.offsetLeft - node.scrollLeft;
    top += node.offsetTop - node.scrollTop;
  } while (node = node.offsetParent);

  return {left:left, top:top};
}

function wrapNode(node, tagName, tagClass, tagId)
{
  var wrapper = document.createElement(tagName);
  if (tagClass != null && tagClass != '') wrapper.className = tagClass;
  if (tagId != null && tagId != '') wrapper.id = tagId;

  if (node.parentNode != null)
  {
    node.parentNode.insertBefore(wrapper, node);
    node.parentNode.removeChild(node);
  }

  wrapper.appendChild(node);

  return wrapper;
}

function moveNode(node, container)
{
  if (node.parentNode != null) node.parentNode.removeChild(node);
  container.appendChild(node);
}

function removeWhitespaceNodes(fromNode, includeBrTag)
{
  var remove = new Array();
  var all = fromNode.childNodes;

  for (var i = 0; i < all.length; i++)
  {
    var node = all[i];
	if (node.nodeName == '#comment' || (includeBrTag && node.nodeName == 'BR') || (node.nodeName == '#text' && hasOnlyWhitespace(node.textContent)))
	{
	  remove.push(node)
	}
  }

  for (var i = 0; i < remove.length; i++) {remove[i].parentNode.removeChild(remove[i]);}
}

function removeAllButThisNode(fromNode, keepNode)
{
  var remove = new Array();
  var all = fromNode.childNodes;
  
  for (var i = 0; i < all.length; i++)
  {
    var node = all[i];
	if (node != keepNode)
	{
	  remove.push(node);
	}
  }
  
  for (var i = 0; i < remove.length; i++) {remove[i].parentNode.removeChild(remove[i]);}
}

function hasFirstTableRowValueOf(nodeTable, value)
{
  if (nodeTable.rows.length < 1 || nodeTable.rows[0].cells.length < 1) return false;
  var firstRow = nodeTable.rows[0];
  value = value.toLowerCase();
  for (var i = 0; i < firstRow.cells.length; i++)
  {
    if (firstRow.cells[i].textContent.toLowerCase().indexOf(value) > -1) return true;
  }
  return false;
}

function hasFormSubmitValueOf(nodeForm, value)
{
  value = value.toLowerCase();
  for (var i = 0; i < nodeForm.childNodes.length; i++)
  {
    var node = nodeForm.childNodes[i];
	if (node.nodeName.toLowerCase() == 'input' &&
	    node.type.toLowerCase() == 'submit' &&
		(node.value.toLowerCase().indexOf(value) > -1 || node.name.toLowerCase().indexOf(value) > -1))
	{
	  return true;
	}
  }
  return false;
}

function hasFormActionOf(nodeForm, value)
{
  if (nodeForm.action.indexOf(value) > -1) return true;
  return false;
}

function hasChildWithIdOf(node, id)
{
  for (var i = 0; i < node.childNodes.length; i++)
  {
    var child = node.childNodes[i];
    if (child.id != null && child.id == id) return true;
  }
  return false;
}

function hasChildWithHrefOf(node, href, recursive)
{
  for (var i = 0; i < node.childNodes.length; i++)
  {
    var child = node.childNodes[i];
	if (child.href != null && child.href.indexOf(href) > -1) return true;
	if (recursive && child.childNodes.length > 0)
	{
	  var result = hasChildWithHrefOf(child, href, true);
	  if (result) return true;
	}
  }
  return false;
}

function getFirstChildByTag(node, tag)
{
  tag = tag.toLowerCase();
  for (var i = 0; i < node.childNodes.length; i++)
  {
    var child = node.childNodes[i];
    if (child.nodeName.toLowerCase() == tag) return child;
  }
  return null;
}

function hasPreviousNodeWithValueOf(node, value)
{
  var prev = node.previousSibling;
  if (prev == null) return false;
  if (prev.textContent.toLowerCase().indexOf(value.toLowerCase()) > -1) return true;
  return false;
}

function appendToFormAction(nodeForm, value)
{
  if (nodeForm.action.indexOf(value) > -1) return;
  nodeForm.action += value;
}

function getElementByClassName(className)
{
  var all = document.getElementsByTagName('*');
  for (i = 0; i < all.length; i++)
  {
    if (all[i].className == className) return all[i];
  }
  return null;
}

function getInputElementByName(name, tag)
{
  var all = document.getElementsByTagName(tag);
  for (i = 0; i < all.length; i++)
  {
    if (all[i].name == name) return all[i];
  }
  return null;
}

function getLinkElementByHref(href)
{
  var all = document.getElementsByTagName('a');
  for (i = 0; i < all.length; i++)
  {
    if (all[i].href.toLowerCase().indexOf(href) > -1) return all[i];
  }
  return null;
}

function isAny(value, possible)
{
  for (var i = 0; i < possible.length; i++)
  {
    if (value == possible[i]) return true;
  }
  return false;
}

function contains(array, value)
{
  for (var i = 0; i < array.length; i++)
  {
    if (value == array[i]) return true;
  }
}

function hasOnlyWhitespace(value)
{
  if (value == null) return true;
  value = value.replace(/\s/g, '');
  if (value == '') return true;
  return false;
}

function getUrlParameter(parameterName)
{
  var search = document.location.search;
  if (search == null || search == '') return '';
  search = search.substring(1);

  var pairs = search.split('&');
  for (var i = 0; i < pairs.length; i++)
  {
    var pair = pairs[i].split('=');
	if (pair[0] == parameterName)
	  return pair[1];
  }
}

function getBaseUrlPlusParameterAndHash(parameterName, parameterValue, hash)
{
  var result = global.urlBase;
  var params = window.location.search;
  if (params != null && params != '')
  {
    var pairs = params.split('&');
	params = '';
	for (var i = 0; i < pairs.length; i++)
	{
	  var pair = pairs[i].split('=');
	  pair[0] = pair[0].replace('?', '');
	  if (pair[0] != null && pair[0] != '' && pair[0] != parameterName)
	  {
	    if (params != '') params += '&';
		params += pair[0] + '=' + pair[1];
	  }
	}
  }

  if (parameterName != null && parameterName != '')
  {
    if (params != '') params += '&';
    params += parameterName + '=' + parameterValue;
  }

  return result + '?' + params + (hash == null ? window.location.hash : hash);
}

function setCookie(name, value, days)
{
  if (days)
  {
    var date = new Date();
	date.setTime(date.getTime() + (days*24*60*60*1000));
	var expires = '; expires=' + date.toGMTString();
  }
  else
  {
    var expires = '';
  }
  document.cookie = name + '=' + value + expires+'; path=/';
}

function getCookie(name)
{
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function deleteCookie(name)
{
  createCookie(name, '', -1);
}

function doesTableContentMatch(table, numberRows, numberCells, arrayTextContentFirstColumn, arrayTextContentFirstRow, arrayTextContentAll, arrayInnerHtmlAll, arrayNumberChildNodes)
{
  if (table.rows.length != numberRows) return false;
  for (var r = 0; r < numberRows; r++)
  {
    var row = table.rows[r];
	if (row.cells.length != numberCells) return false;
	if (arrayTextContentFirstColumn != null && row.cells[0].textContent.toLowerCase().indexOf(arrayTextContentFirstColumn[r]) == -1) return false;

	if (arrayTextContentFirstRow != null || arrayTextContentAll != null || arrayInnerHtmlAll != null || arrayNumberChildNodes != null)
	{
      for (var c = 0; c < numberCells; c++)
	  {
	    var cell = row.cells[c];
		var cellTextContent = cell.textContent.toLowerCase();
		var index = (r * numberCells) + c;

	    if (r == 0 && arrayTextContentFirstRow != null && cellTextContent.indexOf(arrayTextContentFirstRow[c]) == -1) return false;
	    if (arrayTextContentAll != null && cellTextContent.indexOf(arrayTextContentAll[index]) == -1) return false;
		if (arrayInnerHtmlAll != null && cell.innerHTML.indexOf(arrayInnerHtmlAll[index]) == -1) return false;
		if (arrayNumberChildNodes != null && cell.childNodes.length != arrayNumberChildNodes[index]) return false;
	  }
	}
  }
  return true;
}

function getFirstVisibleTableRowBefore(table, startIndex)
{
  for (var i = startIndex; i >= 0; i--)
  {
    if (table.rows[i].style.display != 'none') return table.rows[i];
  }
  return null;
}

function getFirstVisibleTableRowAfter(table, startIndex)
{
  for (var i = startIndex; i < table.rows.length; i++)
  {
    if (table.rows[i].style.display != 'none') return table.rows[i];
  }
  return null;
}

function formatNumber(number)
{
  number = '' + number;
  if (number.length > 3)
  {
    var mod = number.length % 3;
    var output = (mod > 0 ? (number.substring(0,mod)) : '');
    for (var i = 0; i < Math.floor(number.length / 3); i++)
	{
      if ((mod == 0) && (i == 0))
        output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
      else
        output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return (output);
  }
  else
  {
    return number;
  }
}

function getKillDeathRatio(kills, deaths)
{
  if (kills == 0 && deaths == 0) return '0:0';
  if (kills == 0) return '0:8';
  if (deaths == 0) return '8:0';
  if (kills == deaths) return '1:1';
  if (kills > deaths) return (kills / deaths).toFixed(1) + ':1';
  return '1:' + (deaths / kills).toFixed(1);
}

function parseClanAndLocation(text)
{
  var result = {clan:'', location:''};

  var matches = text.match(/(.*) \[(.*)\]/);
  if (matches != null && matches.length == 3)
  {
    result.location = matches[1];
	result.clan = matches[2];
  }
  else
  {
    if (isKnownTown(text))
	{
	  result.clan = 'Townsfolk';
	  result.location = text;
	}
	else
	{
	  result.clan = text;
	  result.location = '';
	}
  }
  
  return result;
}

function getKnownTownName(name)
{
  var townnames = new Array(
	'Aab', 'Ada Kulun', 'Ahmerrad', 'Alburq Castle', 'Aldelen', 'Almerra Castle', 'Amashke', 'Ambean', 'Amere', 'Asugan Castle', 'Ayn Assuadi', 'Ayyike', 'Azgad', 'Balanli', 'Bardaq Castle', 'Bariyye', 'Bazeck', 
	'Bhulaban', 'Buillin', 'Bulugha Castle', 'Bulugur', 'Burglen', 'Buvran', 'Caraf Castle', 'Chaeza', 'Chalbek Castle', 'Chelez', 'Chide', 'Culmarr Castle', 'Curaw', 'Curin Castle', 'Dashbigha', 'Derchios Castle', 
	'Dhibbain', 'Dhirim', 'Dirigh Aban', 'Dirigsene', 'Distar Castle', 'Dramug Castle', 'Dugan', 'Dumar', 'Durquba', 'Durrin Castle', 'Dusturil', 'Ehlerdah', 'Elberl', 'Emer', 'Emirin', 'Epeshe', 'Ergellon Castle', 
	'Etrosq Castle', 'Fearichen', 'Fedner', 'Fenada', 'Fisdnar', 'Fishara', 'Gisim', 'Glunmar', 'Grunwalder Castle', 'Habba', 'Haen', 'Halmar', 'Hanun', 'Haringoth Castle', 'Hawaha', 'Hrus Castle', 'Ibdeles Castle', 
	'Ibdeles', 'Ibiran', 'Ichamur', 'Ilvia', 'Iqbayl', 'Ismirala Castle', 'Ismirala', 'Istiniar', 'Iyindah', 'Jameyyed Castle', 'Jamiche Castle', 'Jamiche', 'Jayek', 'Jeirbe Castle', 'Jelbegi Castle', 'Jelbegi', 
	'Jelkala', 'Karindi', 'Kedelke', 'Kelredan Castle', 'Khudan', 'Knudarr Castle', 'Kulum', 'Kwynn', 'Malayurg Castle', 'Maras Castle', 'Mawiti', 'Mazen', 'Mazigh', 'Mechin', 'Mijayet', 'Mit Nun', 'Narra', 
	'Nelag Castle', 'Nemeja', 'Nomar', 'Odasan', 'Pagundur', 'Peshmi', 'Praven', 'Qalyut', 'Radoghir Castle', 'Rduna', 'Rebache', 'Reindi Castle', 'Reveran', 'Reyvadin', 'Rindyar Castle', 'Rivacheg', 
	'Rizi', 'Ruldi', 'Ruluns', 'Rushdigh', 'Ruvar', 'Ryibelet Castle', 'Ryibelet', 'Samarra Castle', 'Saren', 'Sargoth', 'Sarimish', 'Sekhtem', 'Senuzgda Castle', 'Serindiar', 'Shapeshte', 'Shariz', 'Sharwa Castle', 
	'Shibal Zumr', 'Shulus', 'Slezkh Castle', 'Slezkh', 'Sumbuja', 'Sungetche Castle', 'Suno', 'Tadsamesh', 'Tahlberl', 'Tamnuh', 'Tash Kulun', 'Tazjunat', 'Tebandra', 'Tehlrog Castle', 'Teramma Castle', 
	'Tevarin Castle', 'Tihr', 'Tilbaut Castle', 'Tilimsal', 'Tismirr', 'Tosdhar', 'Tshibtin', 'Tulbuk Castle', 'Tulbuk', 'Tulga', 'Udiniad', 'Uhhun Castle', 'Uhhun', 'Ulburban', 'Unriya', 'Unuzdaq Castle', 
	'Ushkuru', 'Uslum', 'Uxkhal', 'Uzgha', 'Vayejeg', 'Veidar', 'Veluca', 'Vezin', 'Vyincourd Castle', 'Wercheg', 'Weyyah Castle', 'Yalen', 'Yalibe', 'Yaragar', 'Yruma Castle', 'Zagush');

  for (var i = 0; i < townnames.length; i++)
  {
    if (name == townnames[i]) return townnames[i];
  }
  return '';
}

function isKnownTown(name)
{
  return (getKnownTownName(name) != '');
}

function getDayName(date)
{
  var days = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
  return days[date.getDay()];
}

function getDateDiffInFullDays(date1, date2)
{
  var ONE_DAY_MS = 1000 * 60 * 60 * 24
  var date1ms = date1.getTime()
  var date2ms = date2.getTime()
  var diffms = Math.abs(date1ms - date2ms);
  return Math.floor(diffms/ONE_DAY_MS);
}

function getSetting(settingName, defaultValue)
{
  var value = GM_getValue(settingName, defaultValue);
  if (value == null) value = defaultValue;
  return value;
}

function setSetting(settingName, value)
{
  GM_setValue(settingName, value);
}
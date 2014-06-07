// ==UserScript==
// @name           Drag & zoom & eye candy & full screen for cRPG Strategus Map
// @namespace      strategus
// @include        http://strategus.c-rpg.net/
// @include        http://strategus.c-rpg.net/index.php*
// ==/UserScript==


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


// ===== Global
var scale = 2; // work around: keep track of scale because no access to window.scale in Chrome
var partiesvisibleatscale = 3;
var townsvisibleatscale = 2;
var factionpartiesvisible = true;
var neutralpartiesvisible = true;
var townsvisible = true;
var mapscrollbarvisible = false;
var showPartiesArmySizeThreshold = 0;
var playerHeroId = 0;
var actionRangeVisible = true;


// ===== CSS
var css =
  'body {width:auto !important; height:auto !important; margin:0; background:'+
    'url(http://cme.comoj.com/img/bg_logo.png) left top no-repeat,'+
	'url(http://cme.comoj.com/img/bg_top.png) left 83px repeat-x,'+
	'url(http://cme.comoj.com/img/bg_black.png) left top repeat-x,'+
	'url(http://cme.comoj.com/img/bg.jpg) left top repeat'+
  '}\n'+
  '#game {overflow:hidden; width:auto !important; height:auto !important; position:absolute; z-index:98; left:306px; top:119px; right:26px; bottom:26px;}\n'+
  '.icon {z-index:2;}\n'+
  '.icon p {font-size:11px; text-shadow:0px 0px 1px #333333; font-weight:bold; background-color:rgba(255, 255, 255, 0.50); -moz-border-radius:5px; -webkit-border-radius:5px; padding:2px; position:relative;}\n'+
  '.icon p:hover {font-size:11px; text-shadow:0px 0px 1px #333333; font-weight:bold; background-color:rgba(255, 255, 255, 0.50); -moz-border-radius:5px; -webkit-border-radius:5px; padding:2px; position:relative; border-width:0px;}\n'+
  '.icon img {background-repeat:no-repeat; height:0 !important; width:0 !important; overflow:hidden;}\n'+
  '.icon img[src="t.png"] {background-image:url(http://img205.imageshack.us/img205/1264/town2.png); left:-30px !important; top:-27px !important; padding-left:59px; padding-top:54px;}\n'+
  '.icon img[src="c.png"] {background-image:url(http://img339.imageshack.us/img339/6342/castle2q.png); left:-21px !important; top:-11px !important; padding-left:48px; padding-top:22px;}\n'+
  '.icon img[src="v.png"] {background-image:url(http://img683.imageshack.us/img683/8469/village2.png); left:-20px !important; top:-8px !important; padding-left:40px; padding-top:17px;}\n'+
  '.heroes {z-index:3; border:1px solid black;}\n'+
  '.heroes.player {border:2px solid lime;}\n'+
  '.heroes.battle {border:2px solid red;}\n'+
  '.heroes p {-moz-border-radius:5px; -webkit-border-radius:5px; border-style:solid; border-width:5px; padding:0px; position:relative; width:1px; height:0px; overflow:hidden; background-color:rgba(255, 255, 255, 0.33); text-shadow:0px 0px 1px #333333;}\n'+
  '.heroes p:hover {width:auto; height:auto; border-width:2px !important; padding:4px;}\n'+
  '.heroes img {position:absolute; z-index:10; display:none;}\n'+
  '.heroes.faction {display:block;}\n'+
  '.heroes.neutral {display:block;}\n'+
  '.heroes.player.tiny {-moz-border-radius:3px; -webkit-border-radius:3px;}\n'+
  '.heroes.faction.tiny {-moz-border-radius:3px;}\n'+
  '.heroes.neutral.tiny {-moz-border-radius:3px;}\n'+
  '.heroes.tiny p {-moz-border-radius:2px; border-width:2px;}\n'+
  '.heroes.player.small {-moz-border-radius:4px;}\n'+
  '.heroes.faction.small {-moz-border-radius:4px;}\n'+
  '.heroes.neutral.small {-moz-border-radius:4px;}\n'+
  '.heroes.small p {-moz-border-radius:3px; border-width:3px;}\n'+
  '.heroes.player.regular {-moz-border-radius:6px;}\n'+
  '.heroes.faction.regular {-moz-border-radius:6px;}\n'+
  '.heroes.neutral.regular {-moz-border-radius:6px;}\n'+
  '.heroes.regular p {-moz-border-radius:5px; border-width:5px;}\n'+
  '.heroes.player.large {-moz-border-radius:9px;}\n'+
  '.heroes.faction.large {-moz-border-radius:9px;}\n'+
  '.heroes.neutral.large {-moz-border-radius:9px;}\n'+
  '.heroes.large p {-moz-border-radius:8px; border-width:8px;}\n'+  
  '.heroes.player.huge {-moz-border-radius:13px;}\n'+
  '.heroes.faction.huge {-moz-border-radius:13px;}\n'+
  '.heroes.neutral.huge {-moz-border-radius:13px;}\n'+
  '.heroes.huge p {-moz-border-radius:12px; border-width:12px;}\n'+  
  '#menu {overflow:auto; border:0px; position:absolute; top:103px; bottom:10px; height:auto !important; width:270px; left:0px; padding-left:10px; text-align:center;}\n'+
  '#overlay {z-index:99; position:absolute; top:0; left:0; width:100%; height:100%; background:url(http://img59.imageshack.us/img59/6375/bgoverlay75.png); display:none;}\n'+
  '#townimages {z-index:100; position:absolute; top:0; left:0; width:100%; height:100%; text-align:center;}\n'+
  '#townimages .header {border-width:15px; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; width:auto; min-width:200px; display:block; position:absolute; top:5px; left:40%; right:40%;}\n'+
  '#townimages img {border-width:25px; -moz-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_purple.png) 25 repeat; margin-left:auto; margin-right:auto; margin-top:40px; height:75%; display:block;}\n'+
  '#gameborder {position:absolute; z-index:97; top:103px; bottom:10px; left:290px; right:10px; border-width:25px; -moz-border-image:url(http://cme.comoj.com/img/bg_border_green.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_green.png) 25 repeat;}\n'+
  '#menu h1 {display:none;}\n'+
  '#menu br {display:none;}\n'+
  '#menu h2 {text-align:left; background:url(http://cme.comoj.com/img/icon_party.png) no-repeat; position:relative; z-index:1; font-size:16px; height:25px; left:-12px; margin:0; padding:37px 0 0 49px;}\n'+
  '#menu h3 {text-align:left; background:url(http://cme.comoj.com/img/icon_weapon.png) no-repeat; position:relative; z-index:1; font-size:16px; height:25px; left:-12px; margin:0; padding:37px 0 0 49px; top:-30px;}\n'+
  '#player_menu {text-align:left; border-width:25px; -moz-border-image:url(http://cme.comoj.com/img/bg_border_blue.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_blue.png) 25 repeat; margin:0; padding:0; list-style-type:none; position:relative; top:-45px; padding-top:20px;}\n'+
  '#player_info {text-align:left; list-style-type:none; padding:0; margin:0; border-width:25px; -moz-border-image:url(http://cme.comoj.com/img/bg_border_red.png) 25 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_border_red.png) 25 repeat; position:relative; top:-75px; padding-top:20px;}\n'+
  '#player_info h3 {display:none}\n'+
  '#player_menu li:hover, #player_info li:hover {background-color:rgba(0,0,0,0.25);}\n'+
  '#menu a.button {background:url(http://cme.comoj.com/img/button_gold.png) no-repeat; width:187px; height:34px; font-weight:bold; font-size:14px; padding-top:13px; margin-bottom:10px; display:inline-block; color:#6c6013; text-shadow:-1px -1px 1px white;}\n'+
  '#menu a.button:hover, #menu a.button:focus {color:black;}\n'+
  '#header {position:relative; height:83px; text-align:center;}\n'+
  '#message {color:darkred; text-align:center; font-weight:bold; font-size:14px; max-width:400px; border-width:15px; -moz-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; -webkit-border-image:url(http://cme.comoj.com/img/bg_parch.png) 15 repeat; margin-left:auto; margin-right:auto; display:none; padding:2px; position:relative; z-index:97;}\n'+
  '#chatlink {position:absolute; z-index:96; left:290px; top:10px; color:#aaa; font-size:12px; text-align:left;}\n'+
  '#chatlink a {color:#aaa;}\n'+
  '#chatlink a:hover, #settings a:focus {color:white;}\n'+
  '#settings {position:absolute; z-index:96; right:10px; top:10px; color:#aaa; font-size:12px; text-align:left;}\n'+
  '#settings label {display:inline-block; width:100px; margin-left:5px;}\n'+
  '#settings select, #settings input {font-size:12px; background-color:#aaa; border-width:0px;}\n'+
  '.zoom {left:-10px !important; top:-10px !important;}\n'+
  '#viewrange {position:absolute; border:solid 1px gray; -moz-border-radius:100%; -webkit-border-radius:100%; display:none;}\n' +
  '#viewrange.zoom1 {margin-left:-50px;margin-top:-50px; width:100px; height:100px;}\n' +
  '#viewrange.zoom2 {margin-left:-100px;margin-top:-100px; width:200px; height:200px;}\n' +
  '#viewrange.zoom3 {margin-left:-150px;margin-top:-150px; width:300px; height:300px;}\n' +
  '#viewrange.zoom4 {margin-left:-200px;margin-top:-200px; width:400px; height:400px;}\n' +
  '#charpopup {position:absolute;}';

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

var cssrules = document.styleSheets[document.styleSheets.length - 1].cssRules; // that's the one which was inserted above
var cssrules_icon = cssrules[2];
var cssrules_icon_p = cssrules[3];
var cssrules_icon_p_hover =cssrules[4];
var cssrules_icon_img_town = cssrules[6];
var cssrules_icon_img_castle = cssrules[7];
var cssrules_icon_img_village = cssrules[8];
var cssrules_heroes = cssrules[9];
var cssrules_heroes_player = cssrules[10];
var cssrules_heroes_battle = cssrules[11];
var cssrules_heroes_p = cssrules[12];
var cssrules_heroes_img = cssrules[14];
var cssrules_heroes_faction = cssrules[15];
var cssrules_heroes_neutral = cssrules[16];
var cssrules_heroes_player_tiny = cssrules[17];
var cssrules_heroes_faction_tiny = cssrules[18];
var cssrules_heroes_neutral_tiny = cssrules[19];
var cssrules_heroes_tiny_p = cssrules[20];
var cssrules_heroes_player_small = cssrules[21];
var cssrules_heroes_faction_small = cssrules[22];
var cssrules_heroes_neutral_small = cssrules[23];
var cssrules_heroes_small_p = cssrules[24];
var cssrules_heroes_player_regular = cssrules[25];
var cssrules_heroes_faction_regular = cssrules[26];
var cssrules_heroes_neutral_regular = cssrules[27];
var cssrules_heroes_regular_p = cssrules[28];
var cssrules_heroes_player_large = cssrules[29];
var cssrules_heroes_faction_large = cssrules[30];
var cssrules_heroes_neutral_large = cssrules[31];
var cssrules_heroes_large_p = cssrules[32];
var cssrules_heroes_player_huge = cssrules[33];
var cssrules_heroes_faction_huge = cssrules[34];
var cssrules_heroes_neutral_huge = cssrules[35];
var cssrules_heroes_huge_p = cssrules[36];

function showHeroesFull()
{
  cssrules_heroes_p.style.cssText = '-moz-border-radius:5px; -webkit-border-radius:5px; border-style:solid; border-width:2px; padding:4px; position:relative; width:auto; height:auto; background-color:rgba(255, 255, 255, 0.33); text-shadow:0px 0px 1px #333333;';
  cssrules_heroes_tiny_p.style.borderWidth = '2px';
  cssrules_heroes_small_p.style.borderWidth = '2px';
  cssrules_heroes_regular_p.style.borderWidth = '2px';
  cssrules_heroes_large_p.style.borderWidth = '2px';
  cssrules_heroes_huge_p.style.borderWidth = '2px';
  cssrules_heroes_img.style.display = 'block';
}

function showHeroesMinimal()
{
  cssrules_heroes_p.style.cssText = '-moz-border-radius:5px; -webkit-border-radius:5px; border-style:solid; border-width:5px; padding:0px; position:relative; width:1px; height:0px; overflow:hidden; background-color:rgba(255, 255, 255, 0.33); text-shadow:0px 0px 1px #333333;';
  cssrules_heroes_tiny_p.style.borderWidth = '2px';
  cssrules_heroes_small_p.style.borderWidth = '3px';
  cssrules_heroes_regular_p.style.borderWidth = '5px';
  cssrules_heroes_large_p.style.borderWidth = '8px';
  cssrules_heroes_huge_p.style.borderWidth = '12px';
  cssrules_heroes_img.style.display = 'none';
}

function showIconLabelFull()
{
  cssrules_icon_p.style.cssText = 'font-size:11px; text-shadow:0px 0px 1px #333333; font-weight:bold; background-color:rgba(255, 255, 255, 0.50); -moz-border-radius:5px; -webkit-border-radius:5px; padding:2px; position:relative;';
  cssrules_icon_p_hover.style.cssText = 'font-size:11px; text-shadow:0px 0px 1px #333333; font-weight:bold; background-color:rgba(255, 255, 255, 0.50); -moz-border-radius:5px; -webkit-border-radius:5px; padding:2px; position:relative;';
}

function showIconLabelMinimal()
{
  cssrules_icon_p.style.cssText = '-moz-border-radius:0px; -webkit-border-radius:0px; padding:0px; position:relative; width:0px !important; height:0px !important; border-style:solid; border-width:5px; overflow:hidden;';
  cssrules_icon_p_hover.style.cssText = 'font-size:11px; text-shadow:0px 0px 1px #333333; font-weight:bold; background-color:rgba(255, 255, 255, 0.50); -moz-border-radius:5px; -webkit-border-radius:5px; padding:2px; position:relative; border-width:0px; width:auto !important; height:auto !important;';
}

function adaptIconSizeAndLabels()
{
  if (factionpartiesvisible)
  {
    cssrules_heroes_faction.style.display = 'block'
    cssrules_heroes_faction_tiny.style.display = showPartiesArmySizeThreshold <= 0 ? 'block' : 'none';
    cssrules_heroes_faction_small.style.display = showPartiesArmySizeThreshold <= 1 ? 'block' : 'none';
    cssrules_heroes_faction_regular.style.display = showPartiesArmySizeThreshold <= 2 ? 'block' : 'none';
    cssrules_heroes_faction_large.style.display = showPartiesArmySizeThreshold <= 3 ? 'block' : 'none';
  }
  else
  {
    cssrules_heroes_faction.style.display = 'none';
    cssrules_heroes_faction_tiny.style.display = 'none';
    cssrules_heroes_faction_small.style.display = 'none';
    cssrules_heroes_faction_regular.style.display = 'none';
    cssrules_heroes_faction_large.style.display = 'none';
  }

  if (neutralpartiesvisible)
  {
    cssrules_heroes_neutral.style.display = 'block'
    cssrules_heroes_neutral_tiny.style.display = showPartiesArmySizeThreshold <= 0 ? 'block' : 'none';
    cssrules_heroes_neutral_small.style.display = showPartiesArmySizeThreshold <= 1 ? 'block' : 'none';
    cssrules_heroes_neutral_regular.style.display = showPartiesArmySizeThreshold <= 2 ? 'block' : 'none';
    cssrules_heroes_neutral_large.style.display = showPartiesArmySizeThreshold <= 3 ? 'block' : 'none';
  }
  else
  {
    cssrules_heroes_neutral.style.display = 'none';
    cssrules_heroes_neutral_tiny.style.display = 'none';
    cssrules_heroes_neutral_small.style.display = 'none';
    cssrules_heroes_neutral_regular.style.display = 'none';
    cssrules_heroes_neutral_large.style.display = 'none';
  }

  if (factionpartiesvisible || neutralpartiesvisible)
  {
    var showheroesfull = (scale >= partiesvisibleatscale);
    if (showheroesfull) showHeroesFull()
      else showHeroesMinimal();
  }

  if (townsvisible)
  {
    cssrules_icon_p.style.display = 'block';
    var showiconlabel = (scale >= townsvisibleatscale);
    if (showiconlabel) showIconLabelFull()
      else showIconLabelMinimal();
  }
  else
  {
    cssrules_icon_p.style.display = 'none';
  }

  if (scale == 1)
  {
    cssrules_icon_img_town.style.cssText = 'background-image:url(http://img193.imageshack.us/img193/9577/town1.png); left:-15px !important; top:-13px !important; padding-left:30px; padding-top:27px;';
	cssrules_icon_img_castle.style.cssText = 'background-image:url(http://img265.imageshack.us/img265/3641/castle1z.png); left:-12px !important; top:-5px !important; padding-left:24px; padding-top:11px;';
	cssrules_icon_img_village.style.cssText = 'background-image:url(http://img843.imageshack.us/img843/8500/village1.png); left:-10px !important; top:-4px !important; padding-left:20px; padding-top:9px;';
	map.src = mapZoom1.src;
  }
  else if (scale == 2)
  {
    cssrules_icon_img_town.style.cssText = 'background-image:url(http://img205.imageshack.us/img205/1264/town2.png); left:-30px !important; top:-27px !important; padding-left:59px; padding-top:54px;';
	cssrules_icon_img_castle.style.cssText = 'background-image:url(http://img339.imageshack.us/img339/6342/castle2q.png); left:-21px !important; top:-11px !important; padding-left:48px; padding-top:22px;';
	cssrules_icon_img_village.style.cssText = 'background-image:url(http://img683.imageshack.us/img683/8469/village2.png); left:-20px !important; top:-8px !important; padding-left:40px; padding-top:17px;';
	map.src = mapZoom2.src;
  }
  else if (scale == 3)
  {
    cssrules_icon_img_town.style.cssText = 'background-image:url(http://img840.imageshack.us/img840/3673/town3.png); left:-44px !important; top:-40px !important; padding-left:89px; padding-top:81px;';
    cssrules_icon_img_castle.style.cssText = 'background-image:url(http://img815.imageshack.us/img815/6522/castle3.png); left:-36px !important; top:-16px !important; padding-left:72px; padding-top:32px;';
	cssrules_icon_img_village.style.cssText = 'background-image:url(http://img14.imageshack.us/img14/2231/village3.png); left:-30px !important; top:-13px !important; padding-left:60px; padding-top:26px;';
	map.src = mapZoom3.src;
  }
  else if (scale == 4)
  {
    cssrules_icon_img_town.style.cssText = 'background-image:url(http://img198.imageshack.us/img198/4928/town4.png); left:-59px !important; top:-53px !important; padding-left:118px; padding-top:107px;';
    cssrules_icon_img_castle.style.cssText = 'background-image:url(http://img401.imageshack.us/img401/4825/castle4.png); left:-48px !important; top:-21px !important; padding-left:96px; padding-top:43px;';
	cssrules_icon_img_village.style.cssText = 'background-image:url(http://img408.imageshack.us/img408/3737/village4.png); left:-40px !important; top:-17px !important; padding-left:81px; padding-top:35px;';
	map.src = mapZoom4.src;
  }

  if (actionRangeVisible)
  {
    viewrange.className = "zoom" + scale;
	viewrange.style.display = 'block';
  }
  else
  {
    viewrange.style.display = 'none';
  }
}


// ===== Helper methods
function getPosX(obj)
{
  var result = 0;
  do { result += obj.offsetLeft; } while (obj = obj.offsetParent);
  return result;
}

function getPosY(obj)
{
  var result = 0;
  do { result += obj.offsetTop; } while (obj = obj.offsetParent);
  return result;
}

var imageDraggingDisabled = false;
function disableImageDragging()
{
  if (imageDraggingDisabled) return;
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++)
  {
    var image = images[i];
	if (image.parentNode.className == 'icon')
	{
	  image.addEventListener('mousedown', function(e)
	  {
	    e.preventDefault();
	  }, true);
	}
  }
  imageDraggingDisabled = true;
}

function addIconMenu()
{
  var paras = document.getElementsByTagName('p');
  if (paras.length == 0)
  {
    setTimeout(addIconMenu, 250);
	return;
  }

  for (var i = 0; i < paras.length; i++)
  {
    var para = paras[i];
	if (para.parentNode.className == 'icon')
	{
	  para.addEventListener('dblclick', function(e)
	  {
	    overlay.style.display = 'block';
        var imgurl1 = ('http://cme.comoj.com/images/' + this.textContent + '_sat.jpg').replace(' ', '%20');
		var imgurl2 = ('http://cme.comoj.com/images/' + this.textContent + '.jpg').replace(' ', '%20');
		var imgcontainer = document.createElement('div');
		imgcontainer.id = 'townimages';

		imgcontainer.innerHTML = 
		  '<div class="header">'+
		    '<h3 style="color:black;">'+this.textContent+'</h3>'+
		    '<div style="color:#333; font-size:12px;">'+
		      '<a style="color:#333;" href="javascript:" onclick="document.getElementById(\'townimage1\').style.display=\'block\'; document.getElementById(\'townimage2\').style.display=\'none\';">Bird view</a> | '+
			  '<a style="color:#333;" href="javascript:" onclick="document.getElementById(\'townimage2\').style.display=\'block\'; document.getElementById(\'townimage1\').style.display=\'none\';">Side view</a>'+
			'</div>'+
		  '</div>'+
		    '<img id="townimage1" src="' + imgurl1 + '" style="display:block" onclick="document.getElementById(\'townimage2\').style.display=\'block\'; document.getElementById(\'townimage1\').style.display=\'none\';">'+
		    '<img id="townimage2" src="' + imgurl2 + '" style="display:none" onclick="document.getElementById(\'townimage1\').style.display=\'block\'; document.getElementById(\'townimage2\').style.display=\'none\';">'+
		  '<div style="color:#aaa; font-size:11px; margin-top:10px;">'+
		    'Screenshots courtesy of <a target="_blank" style="color:#aaa;" href="http://eelio.pagesperso-orange.fr/">&Eacute;lio\'s Map Explorer</a>'+
	      '</div>';

		closepopupfunc = function()
		{
		  document.body.removeChild(imgcontainer);
		  overlay.style.display = 'none';
		};

		imgcontainer.addEventListener('click', function(e)
		{
		  if (e.target != this) return;
		  closepopupfunc();
		}, true);
		
		imgcontainer.addEventListener('keydown', function(e)
		{
		  closepopupfunc();
		}, true);

		document.body.appendChild(imgcontainer);
	  }, true);
	}
  }
}

function decorateHeroes()
{
  var paras = document.getElementsByTagName('p');
  if (paras.length == 0 || playerHeroId == 0)
  {
    setTimeout(decorateHeroes, 250);
	return;
  }

  var heroesfound = false;

  for (var i = 0; i < paras.length; i++)
  {
    var para = paras[i];
	var ppara = para.parentNode;
	
	if (ppara.className == 'heroes' || ppara.className == 'icon')
	{
		ppara.addEventListener("click", onQuickAction, true );
	}	
	
	if (para.parentNode.className == 'heroes')
	{
	  heroesfound = true;
	  if (para.textContent.indexOf('BATTLE') > -1) para.parentNode.className += ' battle';
	  
	  var heroId = parseInt(para.parentNode.id.replace('hero', ''));
	  if (heroId == playerHeroId)
	  {
	    para.parentNode.className += ' player';
		viewrange.style.left = para.parentNode.style.left;
		viewrange.style.top = para.parentNode.style.top;
	  }
	  else
	  {
	    if (para.style.cssText.indexOf('color: rgb(255, 255, 255)') > -1) para.parentNode.className += ' neutral'
	      else para.parentNode.className += ' faction';
	  }

      var sizeMatch = para.textContent.match(/ \[(\d*)\] /);
	  if (sizeMatch != null && sizeMatch.length == 2)
	  {
	    var size = parseInt(sizeMatch[1]);
		var sizeClassName = '';
		if (size < 25) sizeClassName = 'tiny';
		else if (size < 100) sizeClassName = 'small';
		else if (size < 500) sizeClassName = 'regular';
		else if (size < 2000) sizeClassName = 'large';
		else sizeClassName = 'huge';
		para.parentNode.className += ' ' + sizeClassName;
	  }
	}
  }

  if (!heroesfound) setTimeout(decorateHeroes, 250);
}

function setupSettings()
{
  var chatlink = document.createElement('div');
  chatlink.id = 'chatlink';
  chatlink.innerHTML =
    '<div style="text-align:center"><a target="_blank" href="http://webchat.quakenet.org/?channels=mount%26blade-crpg">Join our chat channel #mount&blade-crpg @ qnet.org</a></div>';
  header.appendChild(chatlink);

  var settings = document.createElement('div');
  settings.id = 'settings';
  settings.innerHTML = 
	'<label for="displayfactionparties" title="Ctrl+Alt+F"><input type="checkbox" checked="checked" id="displayfactionparties">Factions</label>'+
    '<label for="displaytowns" title="Ctrl+Alt+T"><input type="checkbox" checked="checked" id="displaytowns">Towns</label>'+
    '<label for="showpartynames">Party names:</label><select id="showpartynames"><option value="1">Zoom 1 (always)</option><option value="2">Zoom 2</option><option value="3" selected>Zoom 3 (default)</option><option value="4">Zoom 4</option><option value="5">Never</option></select>'+
	'<br />'+
    '<label for="displayneutralparties" title="Ctrl+Alt+N"><input type="checkbox" checked="checked" id="displayneutralparties">Neutrals</label>'+
	'<label for="displaymapscrollbars"><input type="checkbox" id="displaymapscrollbars">Scrollbars</label>'+
    '<label for="showtownnames">Town names:</label><select id="showtownnames"><option value="1">Zoom 1 (always)</option><option value="2" selected>Zoom 2 (default)</option><option value="3" selected>Zoom 3</option><option value="4">Zoom 4</option><option value="5">Never</option></select>'+
	'<br />'+
	'<label for="displayactionrange" title="Ctrl+Alt+A"><input type="checkbox" checked="checked" id="displayactionrange">Attack range</label>'+
	'<label style="visibility:hidden;"><input type="checkbox"/></label>'+
	'<label for="showpartiesarmysizethreshold" title="Ctrl+Alt+[0 - 4]">Army size:</label><select id="showpartiesarmysizethreshold"><option value="0">Any</option><option value="1">25+</tiny><option value="2">100+</option><option value="3">500+</option><option value="4">2000+</option></select>';
  header.appendChild(settings);

  var showpartynames = document.getElementById('showpartynames');
  showpartynames.addEventListener('change', function(e)
  {
    partiesvisibleatscale = this.value;
    setSetting('partiesvisibleatscale', partiesvisibleatscale);
	adaptIconSizeAndLabels();
  }, true);

  var showtownnames = document.getElementById('showtownnames');
  showtownnames.addEventListener('change', function(e)
  {
    townsvisibleatscale = this.value;
    setSetting('townsvisibleatscale', townsvisibleatscale);
	adaptIconSizeAndLabels();
  }, true);

  var displaytowns = document.getElementById('displaytowns');
  displaytowns.addEventListener('change', function(e)
  {
    townsvisible = this.checked;
	setSetting('townsvisible', townsvisible);
    adaptIconSizeAndLabels();
  }, true);
  
  var displayfactionparties = document.getElementById('displayfactionparties');
  displayfactionparties.addEventListener('change', function(e)
  {
    factionpartiesvisible = this.checked;
	setSetting('factionpartiesvisible', factionpartiesvisible);
    adaptIconSizeAndLabels();
  }, true);

  var displayneutralparties = document.getElementById('displayneutralparties');
  displayneutralparties.addEventListener('change', function(e)
  {
    neutralpartiesvisible = this.checked;
	setSetting('neutralpartiesvisible', neutralpartiesvisible);
    adaptIconSizeAndLabels();
  }, true);
  
  var displaymapscrollbars = document.getElementById('displaymapscrollbars');
  displaymapscrollbars.addEventListener('change', function(e)
  {
    mapscrollbarsvisible = this.checked;
	setSetting('mapscrollbarsvisible', mapscrollbarsvisible);
	if (mapscrollbarsvisible) game.style.overflow = 'auto'
	  else game.style.overflow = 'hidden';
  }, true);

  var fieldShowPartiesArmySizeThreshold = document.getElementById('showpartiesarmysizethreshold');
  fieldShowPartiesArmySizeThreshold.addEventListener('change', function(e)
  {
    showPartiesArmySizeThreshold = this.value;
	setSetting('showpartiesarmysizethreshold', showPartiesArmySizeThreshold);
    adaptIconSizeAndLabels();
  }, true);

  var fieldDisplayActionRange = document.getElementById('displayactionrange');
  fieldDisplayActionRange.addEventListener('change', function(e)
  {
    actionRangeVisible = this.checked;
	setSetting('actionrangevisible', actionRangeVisible);
    adaptIconSizeAndLabels();
  }, true);

  townsvisible = getSetting('townsvisible', true);
  displaytowns.checked = townsvisible;

  factionpartiesvisible = getSetting('factionpartiesvisible', true);
  displayfactionparties.checked = factionpartiesvisible;

  neutralpartiesvisible = getSetting('neutralpartiesvisible', true);
  displayneutralparties.checked = neutralpartiesvisible;

  mapscrollbarsvisible = getSetting('mapscrollbarsvisible', false);
  displaymapscrollbars.checked = mapscrollbarsvisible;

  partiesvisibleatscale = getSetting('partiesvisibleatscale', 3);
  showpartynames.value = partiesvisibleatscale;

  townsvisibleatscale = getSetting('townsvisibleatscale', 2);
  showtownnames.value = townsvisibleatscale;

  showPartiesArmySizeThreshold = getSetting('showpartiesarmysizethreshold', 0);
  fieldShowPartiesArmySizeThreshold.value = showPartiesArmySizeThreshold;

  actionRangeVisible = getSetting('actionrangevisible', true);
  fieldDisplayActionRange.checked = actionRangeVisible;

  adaptIconSizeAndLabels();
}

function prepareLayout()
{
  var overlay = document.createElement('div');
  overlay.id = 'overlay';
  document.body.appendChild(overlay);

  var header = document.createElement('div');
  header.id = 'header';
  header.innerHTML = '<div id="message"></div>';
  document.body.appendChild(header);

  var gameborder = document.createElement('div');
  gameborder.id = 'gameborder';
  document.body.appendChild(gameborder);
  
  /*var charpopup = document.createElement('iframe');
  charpopup.id = 'charpopup';
  charpopup.src = 'http://strategus.c-rpg.net/news.php';
  document.body.appendChild(charpopup);*/
  /*var charpopup = document.createElement('div');
  charpopup.id = 'charpopup';
  charpopup.innerHTML = '<iframe src="http://strategus.c-rpg.net/news.php"></iframe>';
  document.body.appendChild(charpopup);*/

  var script = document.createElement('script');
  script.innerHTML =
    'function swapTownImage(imgurl1, imgurl2)\n'+
    '{\n'+
    'var townimage = document.getElementById(\'townimage\');\n'+
    'if (townimage.src == imgurl1) townimage.src = imgurl2\n'+
    '  else townimage.src = imgurl1;\n'+
	'}';
  document.body.appendChild(script);
}

function dispatchClickEvent(element)
{
  var clickevent = document.createEvent('HTMLEvents');
  clickevent.initEvent('click', true, true);
  element.dispatchEvent(clickevent);  
}

function clickCheckbox(element)
{
  element.checked = !element.checked;
  var changeevent = document.createEvent('HTMLEvents');
  changeevent.initEvent('change', true, true);
  element.dispatchEvent(changeevent); 
}

function setFieldValue(element, value)
{
  element.value = value;
  var changeevent = document.createEvent('HTMLEvents');
  changeevent.initEvent('change', true, true);
  element.dispatchEvent(changeevent); 
}

function doZoom(x, y, iszoomin)
{
  if ((iszoomin && scale == 4) || (!iszoomin && scale == 1)) return;
  
  if (x == null) x = game.offsetWidth / 2;
  if (y == null) y = game.offsetHeight / 2;

  var offsetx = x - gameLeft;
  var offsety = y - gameTop;
  var mapx = (offsetx + game.scrollLeft) / scale;
  var mapy = (offsety + game.scrollTop) / scale;

  if (iszoomin)
  {
    dispatchClickEvent(zoomin);
	scale += 1;
  }
  else
  {
    dispatchClickEvent(zoomout);
	scale -= 1;
  }

  mapx *= scale;
  mapy *= scale;

  game.scrollLeft = mapx - offsetx;
  game.scrollTop = mapy - offsety;

  adaptIconSizeAndLabels();
}

function doZoomin(x, y)
{
  doZoom(x, y, true);
}

function doZoomout(x, y)
{
  doZoom(x, y, false);
}

function doSetZoomLevel(level)
{
  if (level == scale) return;
  var delta = level < scale ? -1 : 1;

  while (scale != level)
  {
    doZoom(null, null, (delta > 0));
  }
}

function doCenterOnParty()
{
  dispatchClickEvent(document.getElementById('player_menu').childNodes[0]); 
}

function centerPlayerAfterStart()
{
  if (playerHeroId == 0)
  {
    setTimeout(centerPlayerAfterStart, 250);
	return;
  }
  doCenterOnParty();
}

// ===== Main
prepareLayout();

var mousedown = false;
var mousex = 0;
var mousey = 0;
var menu = document.getElementById('menu');
var map = document.getElementById('map');
var game = document.getElementById('game');
var gameLeft = getPosX(game);
var gameTop = getPosY(game);
var zoomin = document.getElementById('zoomin');
var zoomout = document.getElementById('zoomout');
var overlay = document.getElementById('overlay');
var closepopupfunc = null;
var mapZoom1 = new Image(); mapZoom1.src = 'http://img837.imageshack.us/img837/814/calradiav21.jpg';
var mapZoom2 = new Image(); mapZoom2.src = 'http://img710.imageshack.us/img710/9789/calradiav22.jpg';
var mapZoom3 = new Image(); mapZoom3.src = 'http://img39.imageshack.us/img39/4522/calradiav23.jpg';
var mapZoom4 = new Image(); mapZoom4.src = 'http://img214.imageshack.us/img214/7198/calradiav24.jpg';
var header = document.getElementById('header');
var gameborder = document.getElementById('gameborder');
var message = document.getElementById('message');
var links = document.getElementById('links');
var viewrange = document.createElement("div");

map.src = mapZoom2.src;
zoomout.style.display = 'none';
zoomin.textContent = '';
viewrange.id = "viewrange";
viewrange.className = "zoom" + scale;

game.appendChild(viewrange);

addIconMenu();
setupSettings();
centerPlayerAfterStart();

document.addEventListener('keydown', function(e)
{
  /*if (e.keyCode == 38) // up
  {
  }
  else if (e.keyCode == 40) // down
  {
  }
  else if (e.keyCode == 37) // left
  {
  }
  else if (e.keyCode == 39) // right
  {
  }
  else*/ if (e.keyCode == 33 || e.keyCode == 107) // page up or +
  {
    doZoomin();
  }
  else if (e.keyCode == 34 || e.keyCode == 109) // page down or -
  {
    doZoomout();
  }
  else if (e.keyCode == 32 || e.keyCode == 36) // space or pos1
  {
    doCenterOnParty();
  }
  else if (e.keyCode == 48 && e.altKey && e.ctrlKey) // 0
  {
    setFieldValue(document.getElementById('showpartiesarmysizethreshold'), '0');
  }
  else if (e.keyCode == 49 && e.altKey && e.ctrlKey) // 1
  {
    setFieldValue(document.getElementById('showpartiesarmysizethreshold'), '1');
  }
  else if (e.keyCode == 50 && e.altKey && e.ctrlKey) // 2
  {
    setFieldValue(document.getElementById('showpartiesarmysizethreshold'), '2');
  }
  else if (e.keyCode == 51 && e.altKey && e.ctrlKey) // 3
  {
    setFieldValue(document.getElementById('showpartiesarmysizethreshold'), '3');
  }
  else if (e.keyCode == 52 && e.altKey && e.ctrlKey) // 4
  {
    setFieldValue(document.getElementById('showpartiesarmysizethreshold'), '4');
  }
  else if (e.keyCode == 27) // esc
  {
    if (closepopupfunc != null)
    {
      closepopupfunc();
      closepopupfunc = null;
	  return;
    }
  }
  else if (e.keyCode == 70 && e.altKey && e.ctrlKey) // f
  {
    clickCheckbox(document.getElementById('displayfactionparties'));
  }
  else if (e.keyCode == 84 && e.altKey && e.ctrlKey) // t
  {
    clickCheckbox(document.getElementById('displaytowns'));
  }
  else if (e.keyCode == 78 && e.altKey && e.ctrlKey) // n
  {
    clickCheckbox(document.getElementById('displayneutralparties'));
  }
  else if (e.keyCode == 65 && e.altKey && e.ctrlKey) // a
  {
    clickCheckbox(document.getElementById('displayactionrange'));
  }
}, true);

/*document.addEventListener('keyup', function(e)
{
  if (e.keyCode == 38) // up
  {
  }
  else if (e.keyCode == 40) // down
  {
  }
  else if (e.keyCode == 37) // left
  {
  }
  else if (e.keyCode == 39) // right
  {
  }
}, true);*/

game.addEventListener('mousedown', function(e)
{
  disableImageDragging();
  mousedown = true;
  mousex = e.clientX;
  mousey = e.clientY;
  game.style.cursor = 'move';
}, true);

game.addEventListener('mouseup', function(e)
{
  mousedown = false;
  game.style.cursor = 'default';
  zoomin.focus(); // work around: focus something outside game or next mouse click drags underlying image
}, true);

game.addEventListener('mousemove', function(e)
{
  if (mousedown)
  {
    var scrollx = game.scrollLeft + (mousex - e.clientX);
    var scrolly = game.scrollTop + (mousey - e.clientY);

    game.scrollLeft = scrollx;
    game.scrollTop = scrolly;
  }

  mousex = e.clientX;
  mousey = e.clientY;
}, true);

function mousewheel(e)
{
  e.preventDefault();
  var iszoomin = (e.wheelDelta && e.wheelDelta > 0) || e.detail < 0;
  doZoom(e.clientX, e.clientY, iszoomin);
}

game.addEventListener('DOMMouseScroll', mousewheel, true);
game.addEventListener('mousewheel', mousewheel, true);

var menuDOMChangedTimer = 0;
var menuDOMChangedIgnore = false;
var gameDOMChangedTimer = 0;

function analyzeMenu()
{
  menuAnalyzeTimer = 0;
  menuDOMChangedIgnore = true;

  for (var i = 0; i < menu.childNodes.length; i++)
  {
    var node = menu.childNodes[i];
	if (node.textContent.indexOf('Chat:') > -1 ||
		node.textContent.indexOf('qnet.org') > -1 ||
		node.nodeName == 'H3')
      menu.removeChild(node);

	if (node.textContent.indexOf('WARNING') > -1)
	{
	  message.textContent = node.textContent;
	  menu.removeChild(node);
	}

	if (node.textContent.indexOf('Your character Page') > -1 &&
	    node.className.indexOf('button') == -1)
	{
	  node.className += ' button';
	}
  }

  if (message.textContent == '') message.style.display = 'none'
    else message.style.display = 'inline-block';

  var playerInfo = document.getElementById('player_info');
  if (playerInfo.childNodes.length > 0 &&
      playerInfo.childNodes[0].childNodes.length == 1 &&
	  playerInfo.childNodes[0].childNodes[0].nodeName == 'H3')
  {
    var playerInfoHeader = playerInfo.childNodes[0].childNodes[0];
	playerInfo.removeChild(playerInfo.childNodes[0]);
	menu.insertBefore(playerInfoHeader, playerInfo);
  }
  
  var playerMenu = document.getElementById('player_menu');
  if (playerMenu.childNodes.length > 0 &&
      playerMenu.childNodes[0].nodeName == 'LI' &&
	  playerMenu.childNodes[0].textContent == 'My Stats')
  {
    playerHeroId = parseInt(playerMenu.childNodes[0].id.replace('hero', ''));
  }

  menuDOMChangedIgnore = false;
}

menu.addEventListener('DOMNodeInserted', function(e)
{
  if (menuDOMChangedIgnore) return;
  if (menuDOMChangedTimer != 0) clearTimeout(menuDOMChangedTimer);
  menuDOMChangedTimer = setTimeout(analyzeMenu, 50);
}, true);

game.addEventListener('DOMNodeInserted', function(e)
{
  if (gameDOMChangedTimer != 0) clearTimeout(gameDOMChangedTimer);
  gameDOMChangedTimer = setTimeout(decorateHeroes, 50);
}, true);

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

function onQuickAction(ev)
{
	if (!unsafeWindow) return;

	var div = ev.currentTarget;
	var itemType = null;
	var itemId = null;
	  
	if(div.id.indexOf("hero") == 0)
	{
		itemType = "h";
		itemId = div.id.substring(4);
	}
	else if(div.id.indexOf("icon") == 0)
	{
		itemType = "l";
		itemId = div.id.substring(4);
	}
  
  if(itemType != null && itemId != null) 
  {
	unsafeWindow.infoType = itemType;
	unsafeWindow.infoId = itemId;
	unsafeWindow.updateInfo();
  }
}
// ==UserScript==
// @name        OGame fast attack send
// @namespace   ogame.fast.attack@gmail.com
// @description allows to send attacks w\o using galaxy map
// @include     http://*.ogame.*/game/index.php*
// @include     http://websim.speedsim.net/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_log
// @run-at      document-start
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// @version     0.32

// @history     0.32 Fixes
// @history     0.31 Feature: cross browser
// @history     0.30 Fixed: interactive mailbox functionality
// @history     0.29 language metadata
// @history     0.28 metadata
// @history     0.27 stabilize
// @history     0.26 speed fix
// @history     0.25 beta transport links + fleet start location
// @history     0.24 periodic functions revised
// @history     0.23 Translation fix
// @history     0.22 Experimental: check non-uniq attack reports
// @history     0.21 Galaxy map moon/debris context w\o commander
// @history     0.20 Autocheck messages by filter for mail page
// @history     0.19 Tooltips & translation
// @history     0.18 Auto submit switch added, speed switch changed
// @history     0.17 Mission switch added
// @history     0.16 Planet/Moon switch added
// @history     0.15 own planets exluded from mail links
// @history     0.14 Experimental form for speedsim
// @history     0.13 Mail link processing changed and perioric delay increased
// @history     0.12 Deathstar implemented
// @history     0.11 Ship tooltips
// @history     0.10 l10n: French
// @history     0.09 Undocked forms reset position
// @history     0.08 Menu button revise
// @history     0.07 Moveable form
// @history     0.06 Espoinage report spy zond attack(mail feature)
// @history     0.05 Battle report [i_attack_i_won] attack(mail feature)
// @history     0.04 Speed selection added
// @history     0.03 Autosubmitting
// @history     0.02 Settings page and menu button
// @history     0.01 Simple fast attack form
// ==/UserScript==

// check for greasemonkey
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
  this.GM_getValue=function (key,def) {
      return localStorage[key] || def;
  };
  this.GM_setValue=function (key,value) {
      return localStorage[key]=value;
  };
  this.GM_deleteValue=function (key) {
      return delete localStorage[key];
  };
  this.GM_addStyle=function(style) {
      //
  };
}

var scriptMetadata = new Object;
scriptMetadata['name'] = 'OGame fast attack send';
scriptMetadata['version'] = '0.32';
  
//russian dict
var ru_dict = new Object();
ru_dict["Fast attack"]                        = "Быстрая атака";
ru_dict["Send"]                               = "Отправить";
ru_dict["Show fleet order in pop-up window"]  = "Показывать приказ флоту в новом окне";
ru_dict["Hide unnecessary elements"]          = "Скрывать второстепенные элементы";
ru_dict["Use autosubmit"]                     = "Использовать автоотправку";
ru_dict["Fast attacks will autosubmit fleet forms if checked"]
                                              = "Быстрые атаки будут отправляться без подтверждения";
ru_dict["Autocheck mail items"]               = "Автоматически отмечаемые сообщение";
ru_dict["When messages opened this items become checked. Delimiter is \"::\" w/o quotes"]
                                              = "В окне почты эти сообщения будут отмечаться автоматически. Разделитель \"::\" без кавычек";
ru_dict["Fleet start planet"]                 = "Планета старта флотов";
ru_dict['Example w/o quotes: "1:2:3", "1:2:3(M)", "  1:2:3  (M)  "']
                                              = 'Пример без кавычек: "1:2:3", "1:2:3(M)", "  1:2:3  (M)  "';
ru_dict['Supply']                             = "Поставка";
ru_dict['Use small cargo for transport missions']
                                              = 'Для транспортных миссий использовать малые транспорты';
ru_dict["Speed"]                              = "Скорость";
ru_dict["Reset window position"]              = "Обнулить положение окна";
ru_dict["No space for new fleet"]             = "Нет места для нового флота";
ru_dict["Unable to locate form"]              = "Форма не найдена";
ru_dict["Planet"]                             = "Планета";
ru_dict["Debris"]                             = "Обломки";
ru_dict["Moon"]                               = "Луна";
ru_dict["Attack"]                             = "Атака";
ru_dict["Destroy"]                            = "Уничтожить";
ru_dict["On"]                                 = "Вкл";
ru_dict["Off"]                                = "Выкл";
ru_dict["Espionage"]                          = "Шпионаж";

ru_dict["Light Fighter"]                      = "Лёгкий истребитель";
ru_dict["Heavy Fighter"]                      = "Тяжелый истребитель";
ru_dict["Cruiser"]                            = "Крейсер";
ru_dict["Battleship"]                         = "Линкор";
ru_dict["Battlecruiser"]                      = "Линейный крейсер";
ru_dict["Bomber"]                             = "Бомбардировщик";
ru_dict["Destroyer"]                          = "Уничтожитель";
ru_dict["Deathstar"]                          = "Звезда смерти";
ru_dict["Small Cargo"]                        = "Малый транспорт";
ru_dict["Large Cargo"]                        = "Большой транспорт";
ru_dict["Espionage Probe"]                    = "Шпионский зонд";

//french dict
var fr_dict = new Object();
fr_dict["Fast attack"]                        = "Attaque Rapide";
fr_dict["Send"]                               = "Envoyer";
fr_dict["Show fleet order in pop-up window"]  = "Ouvrir un nouvel onglet pour l'envoi de flotte";
fr_dict["Hide unnecessary elements"]          = "Masquer les éléments publicitaires inutiles";
fr_dict["Use autosubmit"]                     = "Utiliser l'envoi automatique des flottes";
fr_dict["Fast attacks will autosubmit fleet forms if checked"]
                                              = "Attaque Rapide enverra automatiquement la flotte si coché";
fr_dict["Speed"]                              = "Vitesse";
fr_dict["Reset window position"]              = "Réinitialiser la position de la fenêtre";
fr_dict["No space for new fleet"]             = "Erreur! pas de slots de flotte libre";
fr_dict["Unable to locate form"]              = "Impossible de trouver le formulaire";
fr_dict["Planet"]                             = "Planète";
fr_dict["Debris"]                             = "Débris";
fr_dict["Moon"]                               = "Lune";
fr_dict["Attack"]                             = "Attaquer";
fr_dict["Destroy"]                            = "Détruire";
fr_dict["Espionage"]                          = "Espionnage";

fr_dict["Light Fighter"]                      = "Chasseur léger";
fr_dict["Heavy Fighter"]                      = "Chasseur lourd";
fr_dict["Cruiser"]                            = "Croiseur";
fr_dict["Battleship"]                         = "Vaisseau de bataille";
fr_dict["Battlecruiser"]                      = "Traqueur";
fr_dict["Bomber"]                             = "Bombardier";
fr_dict["Destroyer"]                          = "Destructeur";
fr_dict["Deathstar"]                          = "Étoile de la mort";
fr_dict["Small Cargo"]                        = "Petit transporteur";
fr_dict["Large Cargo"]                        = "Grand transporteur";
fr_dict["Espionage Probe"]                    = "Sonde d espionnage";


//l10n
var language = null;
function get_language()
{
  if (null != language)
    return language;

  language = 'en';

  var meta = document.getElementsByTagName('meta');
  for (i in meta)
  {
    if (meta[i].name == 'ogame-language')
    {
      language = meta[i].content;
      break;
    }
  }

  return language;
};

function _(text) {
  var result = null;
  switch (get_language())
  {
    case 'ru': result = ru_dict[text];break;
    case 'fr': result = fr_dict[text];break;
    default: return text;
  }

  if (null != result) return result;
  return text;
}

//ships dict
var ship_decode = new Object();
ship_decode['202'] = "Small Cargo";
ship_decode['203'] = "Large Cargo";
ship_decode['204'] = "Light Fighter";
ship_decode['205'] = "Heavy Fighter";
ship_decode['206'] = "Cruiser";
ship_decode['207'] = "Battleship";
ship_decode['215'] = "Battlecruiser";
ship_decode['211'] = "Bomber";
ship_decode['213'] = "Destroyer";
ship_decode['214'] = "Deathstar";
ship_decode['210'] = "Espionage Probe";

GM_addStyle('\
  #fast_attack_container {\
    position:               fixed;\
    width:                  1000px;\
    height:                 120px;\
    top:                    0px;\
    left:                   0px;\
    z-index:                3001;\
    background:             rgba(0,0,0,0.5);\
    border:                 1px outset rgba(255,127,0,0.6);\
  }\
  #fast_attack_container.undocked {\
    width:                  200px;\
    height:                 auto;\
    left:                   auto;\
    margin-left:            0px;\
  }\
  #fast_attack_container.docked {\
    top:                    0px;\
    left:                   50%;\
    margin-left:            -500px;\
  }\
  #fast_attack_container div {margin: 2px 2px;}\
\
  .undocker {\
    position:               absolute;\
    top:                    0px;\
    right:                  0px;\
    width:                  17px;\
    height:                 17px;\
    background-image:       url("http://gf1.geo.gfsrv.net/cdnfc/b325cc0170e184ee4c4417acd6a17a.png");\
    background-position:    -17px 0px;\
    border:                 1px outset rgba(255,127,0,0.95);\
    cursor:                 move;\
  }\
\
  #fast_attack_container input[type="text"] {\
    display:                inline;\
    width:                  32px;\
    height:                 20px;\
    color:                  orange;\
    background-color:       rgb(20,20,20);\
    margin:                 1px;\
    border:                 0px outset red;\
    border-radius:          6px;\
    padding:                0px;\
    text-align:             center;\
  }\
  #fast_attack_container input[type="submit"] {\
    margin:                 1px;\
    border-radius:          3px;\
    padding:                0px;\
    width:                  90px;\
    font-size:              12px;\
    font-weight:            700;\
    color:                  orange;\
    background:             rgba(0,0,0,0.5);\
    border:                 1px outset rgba(255,127,0,0.95);\
  }\
  #fast_attack_container input[type="submit"]:hover {\
    color:                  rgba(0,0,0,0.5);\
    background:             orange;\
  }\
\
  #fast_attack_container div {float: left;}\
  div.selector {\
    border-radius:          3px;\
    border:                 1px outset orange;\
  padding:                2px;\
  }\
\
  div#ship_202 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -0px 0px;\
  }\
  div#ship_202.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -0px 0px;\
  }\
  div#ship_203 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -80px 0px;\
  }\
  div#ship_203.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -80px 0px;\
  }\
  div#ship_210 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -640px 0px;\
  }\
  div#ship_210.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -640px 0px;\
  }\
  div#ship_204 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -160px 0px;\
  }\
  div#ship_204.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -160px 0px;\
  }\
  div#ship_205 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -240px 0px;\
  }\
  div#ship_205.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -240px 0px;\
  }\
  div#ship_206 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -320px 0px;\
  }\
  div#ship_206.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -320px 0px;\
  }\
  div#ship_207 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -400px 0px;\
  }\
  div#ship_207.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -400px 0px;\
  }\
  div#ship_215 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -1040px 0px;\
  }\
  div#ship_215.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -1040px 0px;\
  }\
  div#ship_211 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -720px 0px;\
  }\
  div#ship_211.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -720px 0px;\
  }\
  div#ship_213 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -880px 0px;\
  }\
  div#ship_213.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -880px 0px;\
  }\
  div#ship_214 {\
    width:                  80px;\
    height:                 80px;\
    background:             url("http://gf3.geo.gfsrv.net/cdn8d/c13a372d6297a63b29edc4f923b607.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -960px 0px;\
  }\
  div#ship_214.greyout {\
    background:             url("http://gf2.geo.gfsrv.net/cdn46/50fe1a38a4248a535b0fb0f44ec8fd.png") no-repeat scroll 100% 100% transparent;\
    background-position:    -960px 0px;\
  }\
\
  div[id^="ship"]>span {\
    font-size:              75%;\
    display:                none;\
  }\
  div[id^="ship"]:hover>span {\
    display:                block;\
    padding:                2px;\
    margin:                 2px;\
\
    text-align:             center;\
    word-wrap:              break-word;\
\
    color:                  orange;\
    background:             rgba(0,0,0,0.5);\
    border:                 1px outset rgba(255,127,0,0.95);\
  }\
  p.type_selector {\
    float: left;\
    display:                block;\
    width:                  30px;\
    height:                 24px;\
    background:             url("http://gf2.geo.gfsrv.net/cdn40/b63220183e356430158dc998a2bb99.gif") no-repeat scroll 100% 100% transparent;\
    background-size:        90px;\
  }\
  p.type_planet {background-position: 0px -0px;}\
  p.type_debris {background-position: -60px -0px;}\
  p.type_moon {background-position: -30px -0px;}\
  p.type_planet.selected {background-position: 0px -24px;}\
  p.type_debris.selected {background-position: -60px -24px;}\
  p.type_moon.selected {background-position: -30px -24px;}\
  p.type_selector.selected:hover {cursor: default;}\
  p.type_selector:hover {cursor: pointer;}\
\
  p.mission_selector {\
    float: left;\
    display:                block;\
    width:                  24px;\
    height:                 24px;\
    background:             url("http://gf2.geo.gfsrv.net/cdn14/f45a18b5e55d2d38e7bdc3151b1fee.jpg") no-repeat scroll 100% 100% transparent;\
    background-size:        264px;\
  }\
  p.mission_attack {background-position: -192px -48px;}\
  p.mission_destroy {background-position: -216px -48px;}\
  p.mission_attack.selected {background-position: -192px -24px;}\
  p.mission_destroy.selected {background-position: -216px -24px;}\
  p.mission_selector.selected:hover {cursor: default;}\
  p.mission_selector:hover {cursor: pointer;}\
\
  p.speed_selector {\
    float:                  left;\
    display:                block;\
    padding:                1px;\
    height:                 18px;\
    color:                  green;\
    font-size:              95%;\
    font-weight:            700;\
  }\
  p.speed_selector:hover {color: rgb(0,255,0);}\
  p.speed_selector.selected {color: rgb(255,0,0);}\
  p.speed_selector.selected:hover {cursor: default;}\
  p.speed_selector:hover {cursor: pointer;}\
\
  p.auto_submit_selector {\
    float:                  left;\
    display:                block;\
    padding:                1px;\
    height:                 18px;\
    color:                  grey;\
    font-size:              95%;\
    font-weight:            700;\
  }\
  p.auto_submit_selector:hover {color: rgb(0,255,0);}\
  p.auto_submit_selector.selected {color: green;}\
  p.auto_submit_selector.selected:hover {cursor: default;}\
  p.auto_submit_selector:hover {cursor: pointer;}\
\
  div#auto_handler>span {\
    position:               relative;\
    display:                none;\
    width:                  0px;\
    height:                 0px;\
  }\
  div#auto_handler:hover>span {\
    display:                block;\
  }\
\
  #fleet_request {\
    color:                  white;\
  }\
');

if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function manual_click(node) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  node.dispatchEvent(ev);
}
function manual_dispatch(node, eventtype) {var ev = document.createEvent("HTMLEvents");ev.initEvent(eventtype, true, true);node.dispatchEvent(ev);}
function set_autosubmit_status(status) {GM_setValue('auto_submit_status', status);}
function get_autosubmit_status() {
  return ('1' == GM_getValue('auto_submit_value', '0'))?GM_getValue('auto_submit_status', '0'):'';
}
function submit_form(id_or_name) {
  var form = document.getElementById(id_or_name);
  if (!form) form = document.getElementsByName(id_or_name)[0];
  if (form) {
    manual_dispatch(form, 'submit')
    form.submit();
  } else
    alert(_('Unable to locate form')+' "'+id_or_name+'"');
}

function fleet_autosubmit()
{
  if((document.location.href.indexOf('page=fleet1') >= 0) && ('1'==get_autosubmit_status())) {
    var overmark = $('#slots').find('.overmark').get(0);
    if (overmark) {
      set_autosubmit_status('0');
    alert(_('No space for new fleet'));
    }
    else {
      set_autosubmit_status('2');
      submit_form('shipsChosen');
    }
  }
  else if((document.location.href.indexOf('page=fleet2') >= 0) && ('2'==get_autosubmit_status())) {
    document.getElementById('speed').value = GM_getValue('speed_value', '10');
    set_autosubmit_status('3');
    submit_form('details');
  }
  else if((document.location.href.indexOf('page=fleet3') >= 0) && ('3'==get_autosubmit_status())) {
    set_autosubmit_status('4');
    submit_form('sendForm');
  }
  else if((document.location.href.indexOf('page=movement') >= 0) && ('4'==get_autosubmit_status())) {
    set_autosubmit_status('0');
    window.close();
  }
  else set_autosubmit_status('0');
}

// player_planets==========================================================================================================
var player_moons = new Object;
var player_planets = new Object;

function fill_planets() {
  var my_planets = document.getElementById('planetList').getElementsByClassName('smallplanet');
  var my_planets_array = Array.prototype.slice.call(my_planets, 0);
  my_planets_array.forEach(function(node) {
    var planet = node.getElementsByClassName('planetlink')[0];
    if (planet) {
      var coord = planet.innerHTML.match(/\[(\d+:\d+:\d+)\]/,'');
      player_planets[coord[1]] = planet.getAttribute('href').match(/cp=(\d+)/i,'')[1];
      var moon = node.getElementsByClassName('moonlink')[0];
      if (moon) {
        player_moons[coord[1]] = moon.getAttribute('href').match(/cp=(\d+)/i,'')[1];
      }
    }
  });
};

function url_start_position() {
  var start_pos_text = GM_getValue('start_planet','');
  if (start_pos_text.indexOf('(M)') >= 0)
    var cp = player_moons[start_pos_text.replace('(M)','').trim()];
  else
    var cp = player_planets[start_pos_text.trim()];
  if (cp) return '&cp='+cp;
  return '';
}
// end player_planets======================================================================================================

function setvaluehandler(node) {
  node.addEventListener ("change", function () {
    GM_setValue(node.getAttribute('id'), node.value);

    var ev = document.createEvent("HTMLEvents");
    ev.initEvent('check', true, true);
    node.parentNode.dispatchEvent(ev);
  }, false);
}

function add_custom_input(parent, id, type, value) {
  var input = document.createElement('input');
  input.setAttribute('name', id);
  input.setAttribute('id', id);
  input.setAttribute('type', type);
  input.setAttribute('value', value ? value : GM_getValue(id,''))
  input.setAttribute('autocomplete', 'off');
  parent.appendChild(input);
  if ('text' == type)
    setvaluehandler(input);
  parent.addEventListener('check', function () {this.className = (input.value > 0)?'':'greyout';}, false);
  return input;
}

var check_event_array = [];
function register_check_event(node){check_event_array.push(node);}
function dispatch_check_event() {
  var ev = document.createEvent("HTMLEvents");
  ev.initEvent('check', true, true);
  for (var key in check_event_array)
    check_event_array[key].dispatchEvent(ev);
}

var ship_input = [];
function register_ship_input(node){ship_input.push(node);}
function dispatch_ships(func) {
  for (var key in ship_input)
    func(ship_input[key]);
}

var node_array = [];
function register_node(node){node_array.push(node);}
function reset_nodes() {
  for (var key in node_array) {
    var node = node_array[key];
    GM_setValue(node.id+'_top', 'auto');
    GM_setValue(node.id+'_left', 'auto');
    node.style.top = 'auto';
    node.style.left = 'auto';
  }
}

function create_container(id, type, parent, beforeFirst) {
  var container = document.createElement(type);
  container.setAttribute('id', id);
  if (beforeFirst)
    parent.insertBefore(container, parent.firstChild);
  else
    parent.appendChild(container);
  return container;
}

function create_handler(parent, prefix, action_list, text, tooltip) {
  var node_list = [];
  action_list.forEach(function(_node) {
    var node = document.createElement('p');
    node.value = _node[0];
    node.action = _node[1].toLowerCase();
    if (text) node.innerHTML = _(_node[1]);
    else node.setAttribute('title', _(_node[1]));
    node_list.push(node);
  });
  function drop_all() {node_list.forEach(function(node) {node.className = prefix + '_selector ' + prefix + '_' +node.action;});}
  function set_this(_this, val) {
    drop_all();
    _this.className += ' selected';
    GM_setValue(prefix + '_value', val);
    var target = document.getElementById(prefix);
    if (target) target.value = val;
  }
  node_list.forEach(function(node) {node.addEventListener("click", function () {set_this(this, this.value);}, false);});
  node_list.forEach(function(node) {parent.appendChild(node);});
  parent.addEventListener("change", function() {node_list.some(function(node) {if (node.value == GM_getValue(prefix + '_value', action_list[0][0])) {set_this(node, node.value);return true;}});}, false);
  manual_dispatch(parent, "change");
}

function create_location_handler(parent) {
  add_custom_input(parent, 'mission', 'hidden', '1');
  add_custom_input(parent, 'type', 'hidden', '1');
  add_custom_input(parent, 'galaxy', 'text');
  add_custom_input(parent, 'system', 'text');
  add_custom_input(parent, 'position', 'text');
  add_custom_input(parent, 'myButton', 'submit', _("Send"));
}

function set_node_class(node, class_name) {
  GM_setValue(node.id+'_class', class_name);
  node.className = class_name;
}

function set_undockable(parent) {
  if (!parent.id) return;
  register_node(parent);

  parent.className = GM_getValue(parent.id+'_class','docked');
  if ('undocked' == parent.className) {
    parent.style.top = GM_getValue(parent.id+'_top', 'auto');
    parent.style.left = GM_getValue(parent.id+'_left', 'auto');
  }

  var node = create_container('', 'div', parent);
  node.className = 'undocker';

  function dodrag(e) {
    var t = window.document.draged;
    t.style.left = (t.offsetLeft + e.clientX - t.dragX)+"px";
    t.style.top = (t.offsetTop + e.clientY - t.dragY)+"px";
    t.dragX = e.clientX;
    t.dragY = e.clientY;
    return false;
  };
  function stopdrag() {
    window.document.onmousemove=window.document.onmousemoveOld;
    window.document.onmouseup=window.document.onmouseupOld;
    GM_setValue(parent.id+'_top', node.parentNode.style.top);
    GM_setValue(parent.id+'_left', node.parentNode.style.left);
  };
  node.addEventListener ("mousedown", function (e) {
    var t = node.parentNode;
    set_node_class(t, 'undocked');
    fastattack_setup_view();
    e.preventDefault();
    e.cancelBubble = true;
    window.document.onmousemoveOld = window.document.onmousemove;
    window.document.onmouseupOld = window.document.onmouseup;
    window.document.onmousemove=dodrag;
    window.document.onmouseup=stopdrag;
    window.document.draged = t;
    t.dragX = e.clientX;
    t.dragY = e.clientY;
    return false;
  }, false);
}

function create_fleet_order_view() {
  var container = create_container('fast_attack_container', 'div', document.body);
  var form = create_container('fast_attack_form', 'form', container);
  var fleet = create_container('fleet', 'div', form);
  var location = create_container('location', 'div', form);
  var speed = create_container('speed', 'div', container);
  var type = create_container('type_handler', 'div', container);
  var mission = create_container('mission_handler', 'div', container);
  var auto = create_container('auto_handler', 'div', container);

  speed.setAttribute('class', 'selector');
  speed.setAttribute('title', _('Speed'));
  type.setAttribute('class', 'selector');
  mission.setAttribute('class', 'selector');
  auto.setAttribute('class', 'selector');
  auto.setAttribute('title', _('Use autosubmit'));

  create_location_handler(location);
  create_handler(speed, 'speed', [[1,'10'],[2,'20'],[3,'30'],[4,'40'],[5,'50'],[6,'60'],[7,'70'],[8,'80'],[9,'90'],[10,'100']], true);
  create_handler(type, 'type', [[1,'Planet'],[2,'Debris'],[3,'Moon']]);
  create_handler(mission, 'mission', [[1,'Attack'],[9,'Destroy']]);
  create_handler(auto, 'auto_submit', [['0', 'Off'],['1', 'On']], true);

  form.setAttribute('action', '/game/index.php?page=fleet1'+url_start_position());
  form.setAttribute('method', 'post');
  form.addEventListener ("submit", function() {
    set_autosubmit_status('1');
  form.setAttribute('target', ('1' == GM_getValue('use_blank','0'))?'_blank':'');
  }, false);

  var ships = ['202', '203', '204', '205', '206', '207', '215', '211', '213', '214', '210'];
  for (var i in ships) {
    var ship = create_container('ship_'+ships[i], 'div', fleet);
    register_check_event(ship);
    register_ship_input(add_custom_input(ship, 'am'+ships[i], 'text'));
    var tmp = create_container('', 'span', ship).innerHTML = _(ship_decode[ships[i]]);
  }

  set_undockable(container);
}

function fastattack_setup_view() {
  var container = document.getElementById('fast_attack_container');
  var display = GM_getValue("fa_show_hide", "none");
  var box = document.getElementById('box');
  if (('none'==display) || ('docked'!=container.className)) {
    if (box) box.style.top = '0px';
  }
  else {
    if (box) box.style.top = '86px';
  }
  container.style.display = display;
  var fa_show_hide = document.getElementById('fa_show_hide');
  if (fa_show_hide) fa_show_hide.className = GM_getValue("fa_show_hide_class", "menubutton");
}

function create_menu_button(parent) {
  // @TODO think about button for speedsim
  if (!parent) parent = document.body;
  var li = create_container('', 'li', parent);

  var span = create_container('', 'span', li);
  span.setAttribute('class', 'menu_icon');
  var a = create_container('fa_reset', 'a', span);
  a.setAttribute('href', 'javascript:void(0);');
  a.setAttribute('class', 'trader tooltipRight js_hideTipOnMobile');
  a.setAttribute('title', _("Reset window position"));
  var img = create_container('', 'img', a);
  img.setAttribute('class', 'mouseSwitch');
  img.setAttribute('src', 'http://gf2.geo.gfsrv.net/cdn7c/a3a00daf8e8344790bbfbd377d5794.gif');
  img.setAttribute('rel', 'http://gf1.geo.gfsrv.net/cdncb/52a1c5180074e85d8343de56abb232.gif');
  img.height = 29;img.width = 38;
  a.addEventListener ("click", function () {

    var container = document.getElementById('fast_attack_container');
    if ('docked'==document.getElementById('fast_attack_container').className) {
      set_node_class(container, 'undocked');
      container.style.top = GM_getValue(container.id+'_top', 'auto');
      container.style.left = GM_getValue(container.id+'_left', 'auto');
    }
    else
    {
      set_node_class(container, 'docked');
      container.style.top = '0px';
      container.style.left = '50%';
    }
    //reset_nodes();
    fastattack_setup_view();
  }, false);
  /**/
  var a2 = create_container('fa_show_hide', 'a', li);
  a2.setAttribute('href', 'javascript:void(0);');
  a2.setAttribute('class', GM_getValue("fa_show_hide_class","menubutton"));
  var span2 = create_container('', 'span', a2);
  span2.setAttribute('class', 'textlabel');
  span2.innerHTML = _("Fast attack");

  a2.addEventListener ("click", function () {
    if ("none" == GM_getValue("fa_show_hide", "none"))
    {
      GM_setValue("fa_show_hide", "block");
      GM_setValue("fa_show_hide_class", "menubutton selected");
    }
    else
    {
      GM_setValue("fa_show_hide", "none");
      GM_setValue("fa_show_hide_class", "menubutton");
    }

    fastattack_setup_view();
  }, false);
}

function store_option()
{
  var name = $(this).attr('name');
  var value;
  if($(this).attr('type')=='checkbox')
  {
    value = $(this).is(':checked') ? '1' : '0';
  }
  else
    value=$(this).val()

  GM_setValue(name, value);

  if ('hide_elements' == name)
    update_common();
}

function create_option(type, parent , id, description, comment)
{
  var div_wrap=document.createElement('div');
  div_wrap.setAttribute('class','fieldwrapper');
  parent.appendChild(div_wrap);
  if (comment) {
    var div_wrap_comment=document.createElement('div');
    div_wrap_comment.setAttribute('class','fieldwrapper');
    parent.appendChild(div_wrap_comment);
    var p_wrap=document.createElement('p');
    div_wrap_comment.appendChild(p_wrap);
    p_wrap.appendChild(document.createTextNode(comment));
  }
  var label_wrap=document.createElement('label');
  label_wrap.setAttribute('class','styled textBeefy');
  label_wrap.appendChild(document.createTextNode(description));
  div_wrap.appendChild(label_wrap);
  var div_field=document.createElement('div');
  div_field.setAttribute('class','thefield');
  var input=document.createElement('input');
  if(type=='text') {
    input.setAttribute('value',GM_getValue(id,''));
    input.setAttribute('class','textInput w150');
    input.setAttribute('size','20');
  }
  else {
    if('1' == GM_getValue(id, '0'))
      input.setAttribute('checked', 'checked');
  }
  input.setAttribute('name', id);
  input.setAttribute('type', type);
  input.addEventListener("change", store_option, false);
  div_field.appendChild(input);
  div_wrap.appendChild(div_field);
}

function create_configuration()
{
  if(document.location.href.indexOf('page=preferences') < 0) return;
  
  msgResultsPerPage = document.getElementsByName('msgResultsPerPage')[0];
  if (msgResultsPerPage)
  {
      var opt = document.createElement('option');
      opt.setAttribute('value', '100');
      opt.innerHTML='100';
      msgResultsPerPage.appendChild(opt);
  }

  var four=$('#four');
  
  var div_header=document.createElement('div');
  div_header.setAttribute('class','fieldwrapper alt bar');
  four.append(div_header);
  var label=document.createElement('label');
  label.setAttribute('class','styled textBeefy');
  label.appendChild(document.createTextNode(scriptMetadata["name"]+' v'+scriptMetadata["version"]));
  div_header.appendChild(label);
  var div_content=document.createElement('div');
  div_content.setAttribute('class','group bborder');
  four.append(div_content);
  create_option('checkbox', div_content, 'auto_submit_value', _('Use autosubmit'), _('Fast attacks will autosubmit fleet forms if checked'));
  create_option('checkbox', div_content, 'use_blank', _('Show fleet order in pop-up window'));
  create_option('checkbox', div_content, 'hide_elements', _('Hide unnecessary elements'));
  create_option('text', div_content, 'auto_check_items', _('Autocheck mail items'), _('When messages opened this items become checked. Delimiter is "::" w/o quotes'));
  create_option('text', div_content, 'start_planet', _('Fleet start planet'), _('Example w/o quotes: "1:2:3", "1:2:3(M)", "  1:2:3  (M)  "'));
  create_option('checkbox', div_content, 'use_small_cargo', _('Small Cargo'), _('Use small cargo for transport missions'));
}

function hide_item(id) {
  var item = document.getElementById(id);
  if (item) item.style.display = ('1' == GM_getValue('hide_elements','0'))?'none':'block';
}

function update_common()
{
  if(
  (document.location.href.indexOf('page=preferences') >= 0)||
  (document.location.href.indexOf('page=fleet') >= 0) ||
  (document.location.href.indexOf('page=movement') >= 0) ||
  (document.location.href.indexOf('page=messages') >= 0)
  ) hide_item('planet');
  hide_item('mmonetbar');
  hide_item('siteFooter');
  hide_item('star');
  hide_item('star1');
}


/*
 * Interactive mail support
 *
 *
 */

function set_location(array) {
  if (3 != array.length) return false;
  document.getElementById('galaxy').value = array[0];
  document.getElementById('system').value = array[1];
  document.getElementById('position').value = array[2];
  
  var ev = document.createEvent("HTMLEvents");
  ev.initEvent('change', true, true);
  document.getElementById('galaxy').dispatchEvent(ev);
  document.getElementById('system').dispatchEvent(ev);
  document.getElementById('position').dispatchEvent(ev);
  return true;
}

function attack_location() {
  dispatch_ships(function (node) {
    node.value = GM_getValue(node.id, '');
  });
  dispatch_check_event();
}

function ping_location() {
  dispatch_ships(function (node) {
    node.value = null;
  });
  document.getElementById('am210').value = 1;
  dispatch_check_event();
}

function activate_link(_this, hower, click) {
  var parent = $(_this).parent().get(0);
  var coord = parent.innerHTML.match(/\[(\d+:\d+:\d+)\]/i,'');
  if (!coord) return;
  if (player_planets[coord[1]]) return;

  var checker = $(parent).find('.checker').get(0);

  function inner0(color, action) {
    if (hower) {
      set_location(coord[1].split(':'));
      action();
      _this.style.cursor = 'pointer';
      _this.style.color = color;
      update_page('#mailz');
    }
    if (click) {
      checker.setAttribute('checked','');
      update_page('#mailz');
      submit_form('fast_attack_form');
    }
  }
  var subject = $(parent).find('.combatreport_ididattack_iwon').get(0);
  if (subject) {inner0('red', attack_location);return;}
  var subject = $(parent).find('.combatreport_ididattack_ilost').get(0);
  if (subject) {inner0('red', attack_location);return;}
  var subject = $(parent).find('.combatreport_ididattack_draw').get(0);
  if (subject) {inner0('red', attack_location);return;}
  var subject = $(parent).find('.espionagereport').get(0);
  if (subject) {inner0('red', attack_location);return;}

  //espionage reports
  subject = $(parent).find('a.overlay').get(0);
  if (subject) {inner0('orange', ping_location);return;}
}

function auto_check(_this, check_list) {
  if (null == check_list) return;
  if (0 == check_list.length) return;
  if (1 == check_list.length && "" == check_list[0]) return;
  
  var parent = $(_this).parent().get(0);
  check_list.forEach(function (elem) {
    var hit = parent.innerHTML.indexOf(elem);
    if (hit >= 0) {
      var checker = $(parent).find('.checker').get(0);
      if (checker) {
        checker.setAttribute('checked','');
        update_page('#mailz');
      }
    }
  });
}

function check_non_uniq(_this, set) {
  var parent = $(_this).parent().get(0);
  var coord = parent.innerHTML.match(/\[(\d+:\d+:\d+)\]/i,'');
  if (!coord) return;
  if (player_planets[coord[1]]) return;
  if (set[coord[1]]) { 
    var checker = $(parent).find('.checker').get(0);
    if (!checker) return;
    checker.setAttribute('checked','');
    update_page('#mailz');
  }
  else set[coord[1]] = true;
}

function mail_load_action() {
  $('.from').attr('mouseout','').unbind('mouseout');
  $('.from').mouseout(function () {
  if(('red' != this.style.color)
   &&('orange' != this.style.color)
  ) return;
  this.style.color = 'grey';
  update_page('#mailz');
  });

  $('.from').attr('mouseover','').unbind('mouseover');
  $('.from').mouseover(function () {activate_link(this, hower=true);});

  $('.from').attr('click','').unbind('click');
  $('.from').click(function () {activate_link(this, hower=false, click=true);});

  var check_list = GM_getValue('auto_check_items', '').split('::');
  $('.from').each(function () {auto_check(this, check_list);});

  var set = new Object;
  $('.from').each(function () {check_non_uniq(this, set);});
}

var page_len = new Object;
function update_page(id) {
  var page = $(id).get(0);
  if (page) page_len[id] = page.innerHTML.length;
}
function periodic_check_page(id, action, run_once) {
  var page = $(id).get(0);
  if (page) {
    new_len = page.innerHTML.length;
    if (new_len != page_len[id]) {
      page_len[id] = new_len;
      action(page);
      if (run_once) return;
    }
  }
  setTimeout(function(){ periodic_check_page(id, action);}, 500);
}

function mailbox_processing()
{
  if (document.location.href.indexOf('page=messages') >= 0)
  {
    periodic_check_page('#mailz', mail_load_action);
  }
}

/*
 * Galaxy
 * */

function reset_recycle_link(_this) {
  var galaxy = document.getElementById('galaxy_input').value;
  var system = document.getElementById('system_input').value;
  var position = _this.getAttribute('id').replace('debris','');
  var count = $(_this).find('.debris-recyclers').get(0).innerHTML.match(/\d+/i, '')[0];
  $(_this).find('a').each(function() {
    var parent = this.parentNode;
    var a = document.createElement('a');
    a.innerHTML = this.innerHTML;
    a.setAttribute('href', '/game/index.php?page=fleet1&galaxy='+galaxy+'&system='+system+'&position='+position+'&type=2&mission=8&am209='+count);
    a.setAttribute('target', ('1' == GM_getValue('use_blank','0'))?'_blank':'');
    parent.insertBefore(a, this);
    parent.removeChild(this);
    update_page('#galaxytable');
    return true;
  });
}

function reset_moon_link(_this) {
  var galaxy = document.getElementById('galaxy_input').value;
  var system = document.getElementById('system_input').value;
  var position = _this.getAttribute('id').replace('moon','');

  if (player_moons[galaxy+':'+system+':'+position]) return;
  if ($(_this).find('a.espionage').get(0)) return;

  var first = $(_this).find('a').get(0);
  if (first) {
    var parent = first.parentNode.parentNode;
    var li = document.createElement('li');
    parent.insertBefore(li, parent.firstChild);

    var a = document.createElement('a');
    a.innerHTML = _('Espionage');
    a.setAttribute('class','espionage');
    a.setAttribute('href', '/game/index.php?page=fleet1'
        +url_start_position()
        +'&galaxy='+galaxy
        +'&system='+system
        +'&position='+position
        +'&type=3&mission=6&am210='+GM_getValue('spyprobe_count','1'));
    a.setAttribute('target', ('1' == GM_getValue('use_blank','0'))?'_blank':'');
    li.appendChild(a);
    update_page('#galaxytable');
  }
}

function galaxy_load_action() {
  if (GM_getValue('commander_present', '')) return;
  $('div[id^=debris]').each(function () {reset_recycle_link(this);});
  $('div[id^=moon]').each(function () {reset_moon_link(this);});
}

function galaxy_processing()
{
  if(document.location.href.indexOf('page=galaxy') >= 0) {
    var commander = $('#officers').find('.pic1.on').get(0);
    if (commander) GM_setValue('commander_present', 'true');
    else GM_setValue('commander_present', '');

    periodic_check_page('#galaxytable', galaxy_load_action);
  }

  if(document.location.href.indexOf('page=preferences') >= 0) {
    var inp = $('#two').find('input[name=spio_anz]').get(0);
    if (inp) GM_setValue('spyprobe_count', inp.value);
  }
}

/*
 * Transport resource from storage
 *
 */

function get_active_planet_coord() {
  var res = new Object;
  var planet = $('a.planetlink.active').get(0);
  if (!planet) {
    planet = $('a.moonlink.active').get(0).parentNode;
    GM_setValue('transport_type', '3');
    res['type'] = 3;
  }
  else {
    res['type'] = 1;
    GM_setValue('transport_type', '1');
  }
  if (!planet) return null;
  var coord = $(planet).find('span.planet-koords').get(0).innerHTML.match(/\[(\d+):(\d+):(\d+)\]/i, '');
  res['galaxy'] = coord[1];
  res['system'] = coord[2];
  res['position'] = coord[3];
  return res;
}

function periodic_scan_page(id, action) {
  var page = $(id).get(0);
  if (page)
      action(page);

  setTimeout(function(){ periodic_scan_page(id, action);}, 2000);
}

function parse_ingame_resource(value_string) {
    var value = value_string.match(/([\d|\.]+)([М|M]?)/i,'');
    if (value[2]) value = 999+Math.round(1000000*parseFloat(value[1]));
    else value = parseInt(value[1].replace(/\./g,''));
    return value;
}

function resource_check(node) {
  var link = $(node).find('a#fleet_request').get(0);
  if (link) return;

  var resources = $(node).find('div#costs').get(0);
  if (!resources) return;
  var mt = $(resources).find('span.cost').get(0);
  var cr = $(resources).find('span.cost').get(1);
  var dt = $(resources).find('span.cost').get(2);
  if (mt) mt = parse_ingame_resource(mt.innerHTML); else mt = 0;
  if (cr) cr = parse_ingame_resource(cr.innerHTML); else cr = 0;
  if (dt) dt = parse_ingame_resource(dt.innerHTML); else dt = 0;
  GM_setValue('transport_mt', mt);
  GM_setValue('transport_cr', cr);
  GM_setValue('transport_dt', dt);

  link = document.createElement('a');
  link.setAttribute('id', 'fleet_request');
  link.innerHTML = _('Supply');
  resources.appendChild(link);
  link.addEventListener('click', function() {GM_setValue('transport_status', '1');}, false);

  var transports = '&am203='+~~((mt+cr+dt)/25000+2);
  if ('1' == GM_getValue('use_small_cargo', '0')) transports = '&am202='+~~((mt+cr+dt)/5000+10);

  var target = get_active_planet_coord();
  if (target)
    link.setAttribute('href', '/game/index.php?page=fleet1'
        +url_start_position()
        +'&mission=3'
        +'&galaxy='+target['galaxy']
        +'&system='+target['system']
        +'&position='+target['position']
        +'&type='+target['type']
        +transports
        );
  else
    link.setAttribute('href', 'javascript:void(0);');
}

function select_target(node) {
  var moon = $(node).find('a#mbutton[class^=moon]').get(0);
  if (!moon) return;
  if ('3' == GM_getValue('transport_type', '0'))
    manual_click(moon);
}

function supply_processing()
{
  if (('1'==GM_getValue('transport_status', '0')) && (document.location.href.indexOf('page=fleet1') >= 0)) {
    var cont = $('a#continue').get(0);
    if (cont) cont.addEventListener('click', function() {GM_setValue('transport_status', '2');}, false);

    if ('1' == GM_getValue('auto_submit_value', '0')) {
      GM_setValue('transport_status', '2');
      submit_form('shipsChosen');
    }
  }
  else if (('2'==GM_getValue('transport_status', '0')) && (document.location.href.indexOf('page=fleet2') >= 0)) {
    var target = $('td#target').get(0);
    select_target(target);

    var back = $('a#back').get(0);
    if (back) back.addEventListener('click', function() {GM_setValue('transport_status', '1');}, false);

    var cont = $('a#continue').get(0);
    if (cont) cont.addEventListener('click', function() {GM_setValue('transport_status', '3');}, false);

    if ('1' == GM_getValue('auto_submit_value', '0')) {
      GM_setValue('transport_status', '3');
      submit_form('details');
    }
  }
  else if (('3'==GM_getValue('transport_status', '0')) && (document.location.href.indexOf('page=fleet3') >= 0)) {
    $('input#metal').get(0).value = GM_getValue('transport_mt','');
    $('input#crystal').get(0).value = GM_getValue('transport_cr','');
    $('input#deuterium').get(0).value = GM_getValue('transport_dt','');

    var back = $('a#back').get(0);
    if (back) back.addEventListener('click', function() {GM_setValue('transport_status', '2');}, false);

    GM_setValue('transport_status', '0');
    if ('1' == GM_getValue('auto_submit_value', '0')) submit_form('sendForm');
  }
  else GM_setValue('transport_status', '0');

  if ((document.location.href.indexOf('page=resources') >= 0) ||
      (document.location.href.indexOf('page=station') >= 0)) {
    periodic_check_page('div#detail.detail_screen', resource_check);
  }
}

function main()
{
  fleet_autosubmit()
  fill_planets();
  create_fleet_order_view();
  create_menu_button(document.getElementById('menuTable'));
  fastattack_setup_view();
  dispatch_check_event();
  create_configuration();
  update_common();
  mailbox_processing();
  galaxy_processing();
  supply_processing();
}

$(function () {
    main();
});

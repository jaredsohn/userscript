// ==UserScript==
// @name          test
// @namespace     http://mightandmagicheroeskingdoms.ubi.com/play
// @description   Script Visceral pour MMHK par l'alliance Vices et Rales (v.81 (ru 1.1))
// @include       http://mightandmagicheroeskingdoms.ubi.com/play
// ==/UserScript==

try {

Function.prototype.bind = function(a) { var b = this; return function() { return b.apply(a, Array.prototype.slice.call(arguments, 1)); }; };

var

VERSION = 81,
idScript = 'MMHK-VicesEtRales',
UBI_userId = 0,

NOOP = function(){}, alerter = NOOP, debugCount = NOOP,

XHR =
{
 // TODO : retirer GM_xmlhttpRequest et passer par un traitement XHR classique
 send:function(opt) { /*API.dump(opt, 'send'); return; */return GM_xmlhttpRequest(opt); },
 parse:function(R) { var z = null; try { eval("z = " + R.responseText); } catch(ex) {} return z; }
},

API =
{
 isMokhet:function() { return UBI_userId === 1424211; },
 USERID:
 {
  get:function(wId, id)
  {
   var i,uid = API.localStorage.value(id?id:idScript, 'bdd_userid', []);
   for ( i = uid.length; i--; ) { if ( uid[i].world == wId ) { return uid[i].uid; } }
   return '';
  },
  add:function(wId, val, id)
  {
   var found, i, lS = API.localStorage, uid = lS.value(id?id:idScript, 'bdd_userid', []);
   for ( i = uid.length; i--; ) { if ( uid[i].world == wId ) { uid[i].uid = val; found=true; break; } }
   if ( !found ) { uid.push({world:wId,uid:val}); }
   lS.set(id?id:idScript, 'bdd_userid', uid);
  },
  remove:function(wId, id)
  {
   var i, newuid = [], lS = API.localStorage, uid = lS.value(id?id:idScript, 'bdd_userid', []);
   for ( i = uid.length; i--; ) { if ( uid[i].world != wId ) { newuid.push(uid[i]); } }
   lS.set(id?id:idScript, 'bdd_userid', newuid);
  }
 },
 injectBefore:function(S/*ource*/,A/*ddon*/) { return function() { A.apply(this, arguments); return S.apply(this,arguments); }; },
 injectAfter:function(S,A)
 {
  return function()
  {
   var arg = Array.prototype.slice.call(arguments, 0);
   arg.unshift(S.apply(this,arguments));
   return A.apply(this, arg);
  };
 },
 setBddStatus:function(N/*ode*/, S/*tatus*/, T/*itle*/)
 {
  var A = API, C = A.CSS, rC = C.remove, n = A.DOM.getById(N);
  if ( n )
  {
   rC('status_ko', n); rC('status_xhr', n);
   if ( S == 'ko' || S == 'xhr' ) { C.add('status_' + S, n); }
   if ( T ) { n.title = T; }
  }
 },
 number:
 {
  toK:function(V)
  {
   var N = API.number, I = N.toInt, A = Math.abs;
   if ( I( A(V) / 1000000 ) >= 1 ) { return N.toFixed(V / 1000000, 1, true) + 'M'; }
   if ( I( A(V) / 1000 ) >= 1 ) { return I(V / 1000) + 'K'; }
   return V;
  },
  toInt:function (i) { var r = parseInt(i, 10) || 0; r = isNaN(r) ? 0 : r; return r; },
  toFixed:(function() {
   function toCurrency(S)
   {
    var r = /^(.*\s)?([\-+\u00A3\u20AC]?\d+)(\d{3}\b)/;
    S = '' + S;
   // return S == (S = S.replace(r, "$1$2,$3")) ? S : toCurrency(S); //english
    return S == (S = S.replace(r, "$1$2 $3")) ? S : toCurrency(S); //francais
   }
   function P/*adLeft*/(I/*nput*/, S/*ize*/, C/*har*/) { var r = '' + I; while ( r.length < S ) { r = C + r; } return r; }
   function U/*nsignedString*/(N/*ombre*/, D/*igits*/)
   {
    var d/*ebut*/, f/*in*/, t, s = "" + Math.round(N * Math.pow(10, D));
    if (/\D/.test(s)) { return "" + N; }
    s = P(s, 1 + D, "0");
    d = s.substring(0, t = (s.length - D));
    f = s.substring(t);
    if ( f ) { f = "." + f; }
    return d + f; // avoid "0."
   }
   return function(N/*ombre*/, D/*igits*/, C/*urrency*/)
   {
    var n/*ombre*/ = parseFloat((N || '0').toString().replace(',', '.').replace(/[^0-9e\.\-+]/g, '')) || 0, u/*nsigned*/ = U(Math.abs(n), D);
    if ( isNaN(u) ) { u = 0; }
    u = (n < 0 ? "-" : "") + u;
    if ( C === true ) { return toCurrency(u); }
    return Number(u);
   };
  }())
 },
 string:
 {
//  repeat:function(i, m) { for ( var o = []; m > 0; o[--m] = i) {} return o.join(''); },
  repeat:function(i, m) { var o; for ( o = []; m > 0; o[--m] = i) {} return o.join(''); },
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  sprintf:function()
  {
   var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
   while ( f )
   {
    if ( ( m = /^[^\x25]+/.exec(f) ) ) { o.push(m[0]); }
    else if ( ( m = /^\x25{2}/.exec(f) ) ) { o.push('%'); }
    else if ( ( m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f) ) )
    {
     if ( ( ( a = arguments[m[1] || i++] ) === null ) || ( a === undefined ) ) { /*throw('Too few arguments. '+arguments[0]);*/ return arguments[0]; }
     if ( /[^s]/.test(m[7]) && ( typeof(a)!= 'number' ) ) { throw('Expecting number but found ' + typeof(a) + '\n' + arguments[0]); }
     switch ( m[7] )
     {
      case 'b': a = a.toString(2); break;
      case 'c': a = String.fromCharCode(a); break;
      case 'd': a = API.number.toInt(a); break;
      case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
      case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
      case 'o': a = a.toString(8); break;
      case 's': a = ( ( a = String(a) ) && m[6] ? a.substring(0, m[6]) : a ); break;
      case 'u': a = Math.abs(a); break;
      case 'x': a = a.toString(16); break;
      case 'X': a = a.toString(16).toUpperCase(); break;
     }
     a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
     c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
     x = m[5] - String(a).length - s.length;
     p = m[5] ? API.string.repeat(c, x) : '';
     o.push(s + (m[4] ? a + p : p + a));
    }
    else { return ''; }//throw('sprintf.ERROR ?!'); }
    f = f.substring(m[0].length);
   }
   return o.join('');
  }
 },
 whitespace:
 {
  isAll:function(node) { return !(/[^\t\n\r ]/.test(node.data)); },
  isIgnorable:function(node) { return ( node.nodeType == document.COMMENT_NODE ) || ( ( node.nodeType == document.TEXT_NODE ) && API.whitespace.isAll(node) ); },
  previousSibling:function(sib) { while ( (sib = sib.previousSibling) ) { if ( !API.whitespace.isIgnorable(sib) ) { return sib; } } return null; },
  nextSibling:function(sib) { while ( (sib = sib.nextSibling) ) { if ( !API.whitespace.isIgnorable(sib) ) { return sib; } } return null; },
  lastChild:function(par) { var res = par.lastChild; while ( res ) { if ( !API.whitespace.isIgnorable(res) ) { return res; } res = res.previousSibling; } return null; },
  firstChild:function(par) { var res = par.firstChild; while ( res ) { if ( !API.whitespace.isIgnorable(res) ) { return res; } res = res.nextSibling; } return null; },
  clean:function(id, recursif)
  {
   var i, node, E = API.DOM.getById(id), W = API.whitespace;
   if ( E && E.childNodes )
   {
    for ( i = E.childNodes.length - 1; i >= 0; i-- )
    {
     node = E.childNodes[i];
     if ( node.nodeType == document.TEXT_NODE )
     {
      if ( W.isIgnorable(node) ) { E.removeChild(node); }
     }
     else if ( node.nodeType == document.ELEMENT_NODE && recursif ) { W.clean(node, recursif); }
    }
   }
  }
 },
 DOM:
 {
  getById:function(e) { return typeof e == 'string' ? document.getElementById(e) : e; },
  createTextNode:function(t) { return document.createTextNode(t); },
  createElement:function(t,a,s)
  {
   var i, m, childs = [], k, n = document.createElement(t);
   if ( a ) { for ( k in a ) { if ( a.hasOwnProperty(k) ) { if ( k == 'childs' ) { childs = a[k]; } else { n[k] = a[k]; } } } }
   if ( s ) { for ( k in s ) { if ( s.hasOwnProperty(k) ) { n.style[k] = s[k]; } } }
   m = childs.length; if ( m > 0 ) { for ( i = 0; i < m; i++ ) { n.appendChild(childs[i]); } }
   return n;
  },
  flush:function(E)
  {
   var n = API.DOM.getById(E);
   if ( !n ) { return null; }
   while ( n.firstChild ) { n.removeChild(n.firstChild); }
   return n;
  },
  nodeChecker:function(N/*odeName*/, C/*lassName*/)
  {
   return   C && N ? function(e,n,c) { return e && e.nodeName && e.nodeName.toUpperCase() == n && API.CSS.has(c, e); }
          : C      ? function(e,n,c) { return API.CSS.has(c, e); }
          :          function(e,n,c) { return e && e.nodeName && e.nodeName.toUpperCase() == n; };
  },
  getParent:function(E/*lementID*/, N/*odeName*/, C/*lassName*/)
  {
   var c = API.DOM.nodeChecker(N, C), n = API.DOM.getById(E);
   if ( n )
   {
    N = N.toUpperCase();
    while ( n && n.parentNode ) { if ( c(n, N, C) ) { return n; } n = n.parentNode;  }
   }
   return null;
  },
  removeFromParent:function() { var i, n, N=API.DOM.getById; for ( i = arguments.length; i--; ) { n = N(arguments[i]); if ( n && n.parentNode ) { n.parentNode.removeChild(n); } } },
  getPos:function(E/*lementID*/)
  {
   var k,
    n/*ode*/ = API.DOM.getById(E),
    p/*osition*/ = {left:0, top:0, width:0, height:0, offsetWidth:0, offsetHeight:0, clientWidth:0, clientHeight:0, scrollTop:0, scrollWidth:0, scrollHeight:0};
   if ( n )
   {
    for ( k in p ) { if ( p.hasOwnProperty(k) && (['left', 'top', 'width', 'height'].indexOf(k) == -1) && k in n ) { p[k] = API.number.toInt(n[k]); } }
    p.width = p.offsetWidth;
    p.height = p.offsetHeight;
    if ( n.offsetParent )
    {
     do
     {
      p.left += n.offsetLeft;
      p.top += n.offsetTop;
     } while ( ( n = n.offsetParent ) );
    }
   }
   return p;
  }
 },
 CSS:
 {
  has:function(C, E) { var n = API.DOM.getById(E); if ( !n || !n.className ) { return false; } return n.className.split(' ').indexOf(C) != -1; },
  add:function(C, E)
  {
   var c, n = API.DOM.getById(E);
   if ( n )
   {
    if ( !n.className ) { n.className = C; }
    else
    {
     c = n.className.split(' ');
     if ( c.indexOf(C) == -1 ) { c.push(C); n.className = c.join(' '); }
    }
   }
   return n;
  },
  remove:function(C, E)
  {
   var c, idx, n = API.DOM.getById(E);
   if ( n && n.className )
   {
    c = n.className.split(' ');
    idx = c.indexOf(C);
    if ( idx != -1 ) { c.splice(idx, 1); n.className = c.join(' '); }
   }
   return n;
  },
  hide:function(E) { return API.CSS.add('hidden', E); },
  show:function(E) { return API.CSS.remove('hidden', E); },
  isShown:function(E) { return !API.CSS.has('hidden', E); },
  toggle:function(E,C)
  {
   var n = API.DOM.getById(E), CSS = API.CSS;
   if ( n )
   {
    if ( !C ) { C = 'hidden'; }
    if ( CSS.has(C,n) ) { CSS.remove(C,n); } else { CSS.add(C,n); }
   }
  }
 },
 EVT:
 {
  stop:function(E) { E.stopPropagation(); E.preventDefault(); return false; },
  getTarget:function(E) { var t = E && E.target ? E.target : null; return t && t.nodeType == document.TEXT_NODE ? t.parentNode : t; },
  getParentTarget:function(E/*vent*/, N/*odeName*/, C/*lassName*/) { return API.DOM.getParent(API.EVT.getTarget(E), N, C); },
  getRelatedTarget:function(E/*vent*/)
  {
   var t = E.relatedTarget;
   if ( !t )
   {
    if ( E.type == "mouseout" ) { t = E.toElement; }
    else if ( E.type == "mouseover" ) { t = E.fromElement; }
   }
   return t && t.nodeType == 3 /*3==document.TEXT_NODE*/ ? t.parentNode : t;
  },
  getScroll:function(S/*crollType*/) { var d = document.documentElement; if ( typeof d['scroll' + S] != 'undefined' ) { return d['scroll' + S]; } return 0; },
  getX:function(E) { var x = E.pageX; if ( !x && 0 !== x ) { x = ( E.clientX || 0 ) + API.EVT.getScroll('Left'); } return x; },
  getY:function(E) { var y = E.pageY; if ( !y && 0 !== y ) { y = (E.clientY || 0) + API.EVT.getScroll('Top'); } return y; }
 },
 localStorage:
 {
  isActivated:function() { var t = null; try { t = typeof localStorage; } catch(ex) {} return t === 'object'; },
  // TODO : et pourquoi elle s'appelle pas juste get() elle la ?
  value:function(D, N, defVal)
  {
   var v = localStorage.getItem(D+'.'+N);
   if ( v === null || typeof v === 'undefined' || v == 'undefined' ) { return defVal; }
   return JSON.parse(v);
  },
  set:function(D, N, V/*alue*/) { localStorage.setItem(D+'.'+N, JSON.stringify(V)); },
  remove:function(D, N) { localStorage.removeItem(D+'.'+N); },
  reset:function(D)
  {
   // todo : pourquoi sauf autoinfluence et lastupdate ?
   var i, k, max = 1000, except = ['autoInfluence', 'lastUpdate'];
   for ( i = 0; i < max; i++ )
   {
    try {
     k = localStorage.key(i);
     if ( k.substr(0, idScript.length) == idScript )
     {
      if ( except.indexOf(k.substr(idScript.length+1)) == -1 ) { localStorage.removeItem(k); }
     }
    } catch(ex) {}
   }
  }
 },

 // http://agil-it.fr/mmhk/legends_hmmk_toolkit.user.js
 // cette fonction (API.dump), empruntee au script Legends, permet d'afficher dans la "console" locale le contenu d'une variable
 // elle n'est utilisee (sauf oubli de ma part) que lors de mes tests.
 // c'est pour cette raison qu'elle est en commentaire.
 // mais par simplicite pour moi je la laisse en commentaire au lieu de la supprimer
 dump:function(O/*bject*/, T/*titre*/, D/*eep*/)
 {
//   if ( !API.isMokhet() ) { return ; }
//   var cE = API.DOM.createElement, main = API.DOM.getById('VR_log'), div = cE('DIV'), close = cE('DIV', {innerHTML:T||'Fermer'}), H = (unsafeWindow || window).HOMMK;
//   function dump(O, P/*arent*/, D)
//   {
//    var isNode, i, k, v, t, ul, li, node, a = [],
//     nodeAllowed = ['textContent', 'className', 'id', 'nodeName', 'tagName'];
//    function deepIn(t, obj) { return function() { API.dump(obj, t, 1); }; }
//    ul = cE('UL');
//    try
//    {
//     if ( O && O.hasOwnProperty ) { for ( k in O ) { if ( O.hasOwnProperty(k) ) { a.push({k:k,v:O[k]}); } } }
//     a.sort(function(a,b) { a = a.k.toUpperCase(); b = b.k.toUpperCase(); if ( a > b ) { return 1; } if ( a < b ) { return -1; } return 0; });
//     isNode = typeof O == 'object' && O.nodeType === document.ELEMENT_NODE;
//     for ( i = 0; i < a.length; i++ )
//     {
//      k = a[i].k; v = a[i].v; t = typeof v;
//      if ( !isNode || nodeAllowed.indexOf(k) !== -1 )
//      {
//       li = cE('LI');
//       node = cE('STRONG', {title:t, innerHTML:k});
//       li.appendChild(node);
//       li.appendChild(document.createTextNode(' \u21d2 '));
//       switch ( t )
//       {
//        case 'function':
//         li.appendChild(cE('SPAN', {className:'VRlog_function', innerHTML:'function'}));
//        break;
//        case 'string':
//         li.appendChild(cE('SPAN', {className:'VRlog_string', innerHTML:v.replace(/\n/g,'\\n').replace(/</g, '&lt;').replace(/>/g, '&gt;')}));
//        break;
//        case 'object':
//         if ( v === null ) { li.appendChild(cE('SPAN', {className:'VRlog_null', innerHTML:'null'})); }
//         else
//         {
//          if ( H.ArrayUtils.isArray(v) ) { li.appendChild(cE('SPAN', {className:'VRlog_array', innerHTML:'Array (elements : ' + v.length + ')'})); }
//          else { li.appendChild(cE('SPAN', {className:'VRlog_object', innerHTML:v})); }
//          if ( !isNode ) { node.style.cursor = 'pointer'; node.addEventListener('click', deepIn(k, v), true); }
//          if ( v && D > 0 ) { li.appendChild(dump(v, k, D-1)); }
//         }
//        break;
//        default: li.appendChild(cE('SPAN', {className:'VRlog_' + t, innerHTML:v})); break;
//       }
//       ul.appendChild(li);
//      }
//     }
//    } catch(ex) { ul.appendChild(cE('LI', {className:'err', innerHTML:'Erreur : ' + ex})); }
//    return ul;
//   }
//   if ( !main ) { main = document.body.appendChild(cE('DIV', {id:'VR_log'})); }
//   div.appendChild(dump(O, null, API.number.toInt(D)));
//   div.insertBefore(close, div.firstChild);
//   close.addEventListener('click', function(){ this.parentNode.parentNode.removeChild(this.parentNode); }, true);
//   main.insertBefore(div, main.firstChild);
 },
 log:function(t) { API.dump({}, t); }
},

VR = (function(){

var
 MAINMENU, CACHE, SENTINELLE, NOTES, GRAB, CONFIG, UBI_SERVER, BACKUP, AUTOSCAN, JACTARI, SIEGES, CHAT, STOCKS, REPERES, MAGICAL_GUILD, MY_CITIES, MY_ALLY, MAILER, HEROMOVE, PANNEAU, MISCTOOLS, RAPPORTS, AUTOCOMPLETE, CUSTOMLINK,
 RESSOURCES = ['GOLD', 'WOOD', 'ORE', 'MERCURY', 'CRYSTAL', 'SULFUR', 'GEM'],
 RESSOURCES_NO_GOLD = ['WOOD', 'ORE', 'MERCURY', 'CRYSTAL', 'SULFUR', 'GEM'],
// RESSOURCES_COMMUN = ['WOOD', 'ORE'],
 RESSOURCES_RARE = ['MERCURY', 'CRYSTAL', 'SULFUR', 'GEM'],
 RESSOURCES_FACTION = {HAVEN:['CRYSTAL','GEM'], ACADEMY:['GEM','SULFUR'], INFERNO:['SULFUR','MERCURY'], NECROPOLIS:['MERCURY','CRYSTAL'], SYLVAN:['GEM','MERCURY']},

 W = unsafeWindow, H = W.HOMMK,
 regCoords = /\(?\s*([0-9]+)\s*[,.\-]\s*([0-9]+)\s*\)?/,

 DELAIS = { /*heures*/ H24:86400000, H12:43200000, H1:3600000, /*minutes*/ M30:1800000, M15:900000, M10:600000, M5:300000, M1:60000, /*secondes*/ S30:30000, S1:1000 },
 URL = (function(){
         var domain = 'http://www.vices-et-rales.com/', base = domain+'', GM = base+'Greasemonkey/', GM_xhr = GM+'xhr/', GM_xhr_BETA = GM_xhr+'BETA_';
         return {
          add:function(k,cb) { URL[k] = cb.call(URL); },
          domain:domain, base:base, /*xhr:xhr, */index:base+'index.html', img:base+'img/',
          jactari:'http://mmhk.jactari.info/',
          GM:{base:GM, xhr:GM_xhr, xhr_BETA:GM_xhr_BETA, img:GM + 'img/', scriptName:GM + 'VR.user.js',
              checkVersion:GM_xhr + 'checkVersion.php?scriptName=%s&dte=%s&v=%s',
              backupProfil:GM_xhr + 'backupProfil.php5',
              restoreProfil:GM_xhr + 'restoreProfil.php5'}
         };
       }()),

 // REQUIRED config
 locale = 'FR', worldId = 0, playerId = 0, allianceId = 0, allianceName = '', worldSize = 280,
 // variables
 sendToVRDB_normalMode = true,
 lastGotoX = null, lastGotoY = null,
 lastRegionX = null, lastRegionY = null,
 // API shortcuts
 intval = API.number.toInt, numberToFixed = API.number.toFixed,
 gBI = API.DOM.getById, cE = API.DOM.createElement, cTN = API.DOM.createTextNode, //flush = API.DOM.flush,
// firstChild = API.whitespace.firstChild,
// show = API.CSS.show, hide = API.CSS.hide,
 sprintf = API.string.sprintf,
// stopEvent = API.EVT.stop,

 DEBUG_l10n = [],
 UNKNOWN_l10n = [],
 // traductions
 // vatokato edit start
 l10n =
 {
  actualiser:{FR:'Actualiser', EN:'Refresh', RU:'Обновить'},
  autocompleteInProgress:{FR:'Recherche en cours', EN:'Search in progress', RU:'Поиск'},
  btnCfg:{FR:'Configurer', EN:'Configurate', RU:'Настройки'},
  btnDeplacement:{FR:'Afficher/Masquer les trajets deja parcourus', EN:'Show/Hide hero moves already travelled', RU:'Показать/скрыть пройденный героем путь'},
  btnGuildes:{FR:'Sorts disponibles', EN:'Spells available', RU:'Заклинания'},
  btnMisc:{FR:'Outils divers', EN:'Misc tools', RU:'Инструменты'},
  btnNotes:{FR:'Notes', EN:'Notes', RU:'Заметки'},
  btnGraber:{FR:'Graber', EN:'Graber', RU:'Грабитель'},
  btnPanneaux:{FR:'Afficher/Masquer les panneaux', EN:'Show/Hide alerts', RU:'Показать/скрыть таблички'},
  btnReperes:{FR:'Reperes', EN:'Shortcuts', RU:'Ссылки'},
  btnSentinelle:{FR:'Sentinelle', EN:'Sentinel', RU:'Часовой'},
  btnSieges:{FR:'Sieges detectes', EN:'Seats found', RU:'Осада'},
  btnStock:{FR:'Production', EN:'Production', RU:'Ресурсы'},
  cfgMarketLegend:{FR:'Place du marche', EN:'Market Place', RU:'Рынок'},
  cfgPrixUnitaire_buy:{FR:"Prix unitaire d'achat", EN:'Unit purchase price', RU:'Подсветить продаваемые ресурсы дешевле чем:'},
  cfgPrixUnitaire_sell:{FR:'Prix unitaire de vente', EN:'Unit sell price', RU:'Подсветить заявки на ресурсы дороже чем:'},
  checkCommandUpdate:{FR:'Vices et Rales (v%d) - Verifier la mise a jour', EN:'Vices et Rales (v%d) - Check for update', RU:'?!? Vices et Rales (v%d) - Check for update'},
  checkForUpdate:{FR:'Verifier la mise a jour', EN:'Check for update', RU:'Обновить'},
  clearFilters:{FR:'Effacer les filtres', EN:'Clear filters', RU:'Очистить фильтры'},
  configGenerique:{FR:'Generique', EN:'Main', RU:'Основные настройки'},
  configMAJ:{FR:'Mises a jour', EN:'Updates', RU:'Обновления'},
  configOpenOnStart:{FR:'Ouverts au demarrage', EN:'Opened at start', RU:'Открывать при старте'},
  configSentinelle:{FR:'Sentinelle', EN:'Sentinel', RU:'Настройки часового'},
  configProfilLocal:{FR:'Profil local', EN:'Local profil', RU:'Локальный профиль'},
  configProfilServer:{FR:'Profil BDD', EN:'DB profil', RU:'БД профиль'},
  coordsInvalides:{FR:'Coordonnees invalides', EN:'Invalid coordinates', RU:'Некорректные координаты'},
  customLink:{FR:'Ajouter une url personnalisee', EN:'Add a custom url', RU:'Создать произвольную ссылку'},
  deliveryCaravan:{FR:new RegExp('La caravane de ([\u0000-\uFFFF]+) livre la cite de ([\u0000-\uFFFF]+)', 'i'),
                   EN:new RegExp("([\u0000-\uFFFF]+)'s caravan is delivering ([\u0000-\uFFFF]+) city", 'i'),
                   RU:new RegExp(/Караван из города (\S+) прибывает в город (\S+)/)},
  deliveryRelay:{FR:new RegExp('Le relais de ([\u0000-\uFFFF]+) livre la cite de ([\u0000-\uFFFF]+)', 'i'),
                 EN:new RegExp("([\u0000-\uFFFF]+)'s relay is delivering ([\u0000-\uFFFF]+) city", 'i'),
                 RU:new RegExp(/Караван из города (\S+) прибывает в город (\S+)/)},
  detailDistance:{FR:'%1$s est a %2$s regions au %3$s de %4$s (%5$s,%6$s)',
                  EN:'%1$s is %2$s areas away at %3$s from %4$s (%5$s,%6$s)',
                  RU:'%1$s в %2$s клетках отсюда. На %3$s от %4$s (%5$s,%6$s)'},
  directionFull_E:{FR:'Est', EN:'East',RU:'Восток'},
  directionFull_N:{FR:'Nord', EN:'North',RU:'Север'},
  directionFull_NE:{FR:'Nord-est', EN:'North-east',RU:'Северо-восток'},
  directionFull_NW:{FR:'Nord-ouest', EN:'North-west',RU:'Северо-запад'},
  directionFull_S:{FR:'Sud', EN:'South',RU:'Юг'},
  directionFull_SE:{FR:'Sud-est', EN:'South-east',RU:'Юго-восток'},
  directionFull_SW:{FR:'Sud-ouest', EN:'South-west',RU:'Юго-запад'},
  directionFull_W:{FR:'Ouest', EN:'West',RU:'Запад'},
  disponibilites:{FR:'Disponibilites :', EN:'Availability :',RU:'Наличие'},  
  MGuildSelectASpell:{FR:'Selectionnez un sort dans la liste ci-contre', EN:'Please select a spell in the list',RU:'Выберите заклинание из списка'},
  distanceCalculer:{FR:'Calculer la distance en nombre de regions traversees', EN:'Calculate the distance in number of areas crossed',RU:'Расчитать расстояние'},
  distanceFrom:{FR:'de', EN:'from',RU:'От'},
  distanceTo:{FR:'vers', EN:'to',RU:'до'},
  errStructure:{FR:"La structure du jeu est differente. Cette version n'est plus compatible.",
                EN:'The structure of the game is different. This version is not compatible anymore.',
				RU:'Структура игры изменена. Эта версия не совместима'},
  errorLocalStorage:{FR:"Vices et Rales\nlocalStorage n'est pas active.\nDans la barre d'url tapez,  about:config\npuis placez a 'true' la cle 'dom.storage.enabled'",
                     EN:"Vices et Rales\nlocalStorage is not active.\nIn the url bar type,  about:config\nthen set to 'true' the key 'dom.storage.enabled'",
					 RU:"Vices et Rales\nlocalStorage is not active.\nIn the url bar type,  about:config\nthen set to 'true' the key 'dom.storage.enabled"},
  errorWhileCheckingVersion:{FR:'Une erreur est apparue pendant la verification de mise a jour :\n%s', EN:'An error occurred while checking for an update:\n%s',RU:'Ошибка при обновлении:\n%s'},
  FindCity:{FR:'Trouver une ville par son nom', EN:'Find a town from its name',RU:'Поиск города по названию'},
  FindCityGoTo:{FR:'Se rendre sur la ville', EN:'Goto town',RU:'Перейти к городу'},
  focusToXY:{FR:'Centrer sur la position (x,y)', EN:'Focus on (x,y)',RU:'Центрировать (x,y)'},
  haltEnd:{FR:'Vers : ', EN:'To : ',RU:'В: '},
  haltStart:{FR:'De : ', EN:'From : ',RU:'Из: '},
  HerosEligibles:{FR:'Heros eligibles', EN:'Heroes eligible',RU:'?!? Heroes eligible'},
  HerosEligiblesNone:{FR:'Aucun hero eligible', EN:'No hero eligible',RU:'?!? No hero eligible'},
  HeroMoveHalt:{FR:'Fait une halte', EN:'Halt', RU:'Привал'},
  HeroMoveToHalt:{FR:'En mouvement vers une halte', EN:'Moving to halt', RU:'Идет к привалу'},
  HeroMoveToTarget:{FR:'En mouvement vers la cible', EN:'Moving to target', RU:'Идет к цели'},
  HeroMoveUnknown:{FR:'Type de mouvement %s inconnu', EN:'Movement type %s unknown', RU:'Тип движения не известен'},
  hideFilters:{FR:'Masquer les filtres', EN:'Hide filters', RU:'Скрыть фильтры'},
  immobilisation:{FR:'Immobilisation', EN:'Downtime',RU:'Потери при простое'},
  liste_diffusion:{FR:'Liste de diffusion', EN:'Mailing liste',RU:'Список рассылки'},
  liste_diffusion_destinataires:{FR:'Destinataires', EN:'Destinataires',RU:'Получатели'},
  liste_diffusion_explain:{FR:"Ajoutez un ou plusieurs destinataires hors de l'Аalliance a votre liste en les separant par des points virgule. Exemple : Joueur1;un autre joueur;unTroisieme",
                          EN:'Add on or more recipients outside the ally to your mailing list, separated by semicolons. Example : Player1;Another player;a third one',
						  RU:'Добавить в список рассылки игроков, не состоящих в альянсе, через точку с запятой. Пример: Игрок1; Игрок2; Игрок3'},
  marketSource:{FR:'Source', EN:'From',RU:'Из'},
  marketCible:{FR:'Cible', EN:'To',RU:'В'},
  marketLivraison:{FR:'Livraison', EN:'Delivery',RU:'Прибытие'},
  marketPaidPrice:{FR:'Prix reel', EN:'Real price',RU:'Реальная цена'},
  marketRetour:{FR:'Retour', EN:'Back',RU:'Возвращение'},
  marketShowPrice:{FR:'Prix affiche', EN:'Shown price' ,RU:'Цена выкупа'},
  marketYouBuySell_raise_OFFER:{FR:'Achat aux encheres', EN:'Buying at auction',RU:'Покупка на аукционе'},
  marketYouBuySell_raise_REQUEST:{FR:'Vente aux encheres', EN:'Selling at auction',RU:'Продажа на аукционе'},
  marketYouBuySell_instant_OFFER:{FR:'Achat direct', EN:'Instant buy',RU:'Покупка лота'},
  marketYouBuySell_instant_REQUEST:{FR:'Vente directe', EN:'Instant sell',RU:'Продажа лота'},
  MGuildSwitchMode:{FR:'Changer le mode de restitution', EN:'Switch render mode',RU:'Изменить режим просмотра'},
  newVersionConfirmInstall:{FR:"La version %s du script Visceral est disponible.\nPensez a recharger le jeu une fois l'installation terminee.\nVoulez-vous l'installer maintenant ?",
                            EN:"Visceral tool version %d is available.\nDon't forget to reload the game once the installation is complete.\nWould you like to install it now ?",
							RU:"?!? Visceral tool version %d is available.\nDon't forget to reload the game once the installation is complete.\nWould you like to install it now ?"},
  nextBidPrice:{FR:'Prochaine enchere', EN:'Next bid',RU:'Следующая ставка'},
  noCaravanMoving:{FR:'Aucune caravane en mouvement', EN:'No caravan on the move',RU:'Нет активных караванов'},
  noShortcutCreated:{FR:'Aucun repere cree', EN:'No shortcut created',RU:'Нет ссылок'},
  noSpellKnown:{FR:'Aucun sort connu', EN:'No spell known',RU:'Нет доступных заклинаний'},
  noUpdateAvailable:{FR:'Pas de mise a jour disponible.', EN:'No update available.',RU:'Нет доступных обновлений'},
  openOnStartMisctools:{FR:'Outils', EN:'Tools', RU:'Инструменты'},
  openOnStartNotes:{FR:'Notes', EN:'Notes', RU:'Заметки'},
  openOnStartReperes:{FR:'Reperes', EN:'Shortcuts', RU:'Ссылки'},
  openOnStartStocks:{FR:'Stocks', EN:'Stocks', RU:'Добыча'},
  openOnStartMisc:{FR:'Outils', EN:'Tools', RU:'Инструменты'},
  playerId:{FR:'Joueur #%d', EN:'Player #%d', RU:'Игрок #%d'},
  profilEndommage:{FR:'Profil endommage', EN:'Profil broken', RU:'Профиль поврежден'},
  profilLoad:{FR:'Charger', EN:'Load', RU:'Загрузка'},
  profilLoadComplete:{FR:'Chargement du profil termine.', EN:'Profil load complete.', RU:'Загрузка профиля завершена.'},
  profilLoadExplanation:{FR:'Collez votre profil dans la zone de texte ci-dessous puis appuyez sur le bouton "OK". Attention, votre profil actuel sera ecrase.',
                         EN:'Paste your profil in the area below and press the "OK" button. Warning, your actual profil will be erased.',
						 RU:'Вставте свой профиль в текстовое поле ниже, а затем нажмите кнопку ОК. Обратите внимание, что ваш профиль будет перезаписан.'},
  profilLoadLocalTitle:{FR:'Restaurer votre profil depuis une sauvegarde locale', EN:'Restore your profil from a local save', RU:'Восстановить профиль из локальных сохранений'},
  profilLoadNotFound:{FR:"Votre profil n'a pas ete trouve dans la base de donnees", EN:'Your profil can not been found in the database', RU:'В базе данных профиль не найден'},
  profilLoadServerTitle:{FR:'Restaurer votre profil depuis la base de donnees.', EN:'Restore your profil from the database', RU:'Удалить профиль из базы данных'},
  profilSave:{FR:'Sauver', EN:'Save', RU:'Сохранить'},
  profilSaveComplete:{FR:'Enregistrement du profil termine.', EN:'Profil save complete.', RU:'Профиль сохранен'},
  profilSaveEmpty:{FR:'Le profil soumis est vide, rien a enregistrer.', EN:'The profil is empty, nothing to save.', RU:'Профиль пуст, сохранять нечего'},
  profilSaveLocalTitle:{FR:'Enregistrer votre profil sur votre disque dur', EN:'Save your profil to your hard drive', RU:'Сохранить профиль на жесткий диск'},
  profilSaveServerTitle:{FR:'Enregistrer votre profil dans la base de donnees.', EN:'Save your profil to the database', RU:'Сохранить профиль в базе данных'},
  remoteTimeDelta:{FR:'Vous avez un decalage de %s avec le serveur', EN:'You have a lag of %s with the server', RU:'Лаг: %s'},
  repereAdd:{FR:'Ajouter un repere', EN:'Add a shortcut', RU:'Создать ссылку'},
  repereDelete:{FR:'Supprimer ce repere', EN:'Remove shortcut', RU:'Удалить ссылку'},
  repereFocusOn:{FR:'Centrer sur (%s,%s)', EN:'Focus on (%s,%s)', RU:'Центрировать (%s,%s)'},
  resize:{FR:'Redimensionner', EN:'Resize', RU:'Изменить размер'},
  sentFiltre_ally:{FR:'Alliances', EN:'Allies', RU:'Альянсы'},
  sentFiltre_ally_title:{FR:'Le ou les noms des alliances a filtrer, separes par des points virgule.', EN:"Alliances's names to be filtered, separated by semicolons.", RU:'Название альянсов для фильтрации. через точку с запятой'},
  sentFiltre_coords:{FR:'Coordonnees', EN:'Coordinates', RU:'Координаты'},
  sentFiltre_coords_title:{FR:'La ou les coordonnees a filtrer, separees par des points virgul. 1,2 ; 3,4 ; 5,6', EN:'Coordinates, separated by semicolons 1,2 ; 3,4 ; 5,6', RU:'Координаты, разделенные точкой с запятой. 1,2; 3,4; 5,6'},
  sentFiltre_hero:{FR:'Position du hero', EN:'Hero position', RU:'Позиция героя'},
  sentFiltre_hero_title:{FR:'La distance separant le point actuellement centre sur la carte et la position du hero', EN:'The distance between the point now centered on the map and the hero position', RU:'Расстояние от текущего квадрата до героя'},
  sentFiltre_myally:{FR:'Mon alliance', EN:'My ally', RU:'Мой альянс'},
  sentFiltre_myally_title:{FR:"Filtrer les deplacement de l'alliance", EN:'Filter ally moves', RU:'Фильтр: передвижения альянса'},  
  // vatokato Add
  caravanBack:{FR:'livre',EN:'livre',RU:'домой'},
  mailFiltrer:{FR:'Filtrer', EN:'Filtrer', RU:'Фильтр'},
  mailVider:{FR:'Vider', EN:'Vider', RU:'Сбросить'},
  regions:{FR:'regions', EN:'regions', RU:'клеток'},
  onlyAly:{FR:"Que mon alliance", EN:'Que mon alliance', RU:'Только мой альянс'},
  exceptAly:{FR:"Sauf mon alliance", EN:'Sauf mon alliance', RU:'Кроме моего альянса'},
  onlyMe:{FR:"Que mes deplacements", EN:'Que mes deplacements', RU:'Только мои'},
  exceptMe:{FR:"Sauf mon alliance", EN:'Sauf mon alliance', RU:'Кроме моих'},
  // vatokato Add end  
  sentFiltre_myself:{FR:'Mes deplacements', EN:'My moves', RU:'Мои передвижения'},
  sentFiltre_myself_title:{FR:'Filtrer mes deplacements', EN:'Filter my moves', RU:'Фильтр: мои передвижений'},
  sentFiltre_player:{FR:'Joueurs', EN:'Players', RU:'Игроки'},
  sentFiltre_player_title:{FR:'Le ou les noms des joueurs a filtrer, separes par des points virgule.', EN:"Players's names to be filtered, separated by semicolons.", RU:'Имена игроков, через точку с запятой'},
  sentFiltre_town:{FR:'Villes', EN:'Cities', RU:'Города'},
  sentFiltre_townDest:{FR:'Ville de destination', EN:'Destination city', RU:'Город назначения'},
  sentFiltre_townDest_title:{FR:'La distance separant le point actuellement centre sur la carte et la ville de destination', EN:'The distance between the point now centered on the card and the destination city', RU:'Расстояние от текущего квадрата до города'},
  sentFiltre_townImpact:{FR:'Distance a parcourir', EN:'Remaining distance', RU:'Оставшееся расстояние'},
  sentFiltre_townImpact_title:{FR:'La distance separant la position du hero a sa ville de destination', EN:'The distance between the position of hero and his destination city', RU:'Расстояние от героя до места назначения'},
  sentFiltre_town_title:{FR:'Le ou les noms des villes a filtrer, separes par des points virgule.', EN:"Cities's names to be filtered, separated by semicolons.", RU:'Названия городов для фильтрации через точку с запятой'},
  sentinelleCloseOnClick:{FR:'Fermer sur la selection', EN:'Close on click', RU:'Закрыть'},
  sentinelleDistance:{FR:'%s regions', EN:'%s areas', RU:'%s клеток'},
  sentinelleHistory:{FR:'Regions historisees : ', EN:'Areas archives : ', RU:'Архивировать клетки в радиусе '},
  sentinelleNoRefresh:{FR:'0 pour aucun', EN:'0 for none', RU:'0 для отключения'},
  sentinelleRefresh:{FR:'Rafraichissement', EN:'Refresh', RU:'Автообновление'},
  sentinelle_forceServerDelay:{FR:"Delai d'appel au serveur : ", EN:'Server call delay : ', RU:'Задержка отклика : '},
  sentinelle_forceServerDelay_warning:{FR:'Plus le delai est court plus le risque de ban est grand', EN:'The shorter the delay, the higher the risk', RU:'Чем больше задержка, тем выше риск : '},
  sentinelle_forceServerRead:{FR:'Forcer la lecture complete des joueurs', EN:'Force full extraction of players', RU:'Принудительно завершить просмотр игроков'},
  sentinelle_forceServerRead_notrecommended:{FR:"Non recommande, bien qu'un systeme de cache et de pool soit mis en place, cela reste des appels non autorises au serveur",
                                             EN:'Not recommended, although a cache and pool system is established, it remains unauthorized calls to the server',
											 RU:"Не рекомендуется. Возможно обнаружение несанкционированных запросов"},
  sentinelleHeroMoveTo:{FR:'%1$s est a %2$s regions de son objectif et se deplace en direction du %3$s de %4$s (%5$s,%6$s) vers %7$s (%8$s,%9$s)',
                        EN:'%1$s is %2$ areas away from his target, moving %3$s from %4$s (%5$s,%6$s) to %7$s (%8$s,%9$s)',
						RU:"%1$s в %2$ клетках от своей цели, движется в сторону %3$s из %4$s (%5$s,%6$s) в %7$s (%8$s,%9$s)"},
  sentinelle_posCur:{FR:'en', EN:'at', RU:'на '},
  sentinelle_posFrom:{FR:'de', EN:'from', RU:'из '},
  sentinelle_posTo:{FR:'vers', EN:'to', RU:'в '},
  showFilters:{FR:'Afficher les filtres', EN:'Show filters', RU:'Показать фильтры'},
  siege_assiegeurs:{FR:'Assiegeants', EN:'Besiegers', RU:'Осаждающий'},
  siege_end:{FR:'Fin', EN:'End', RU:'Окончание'},
  siege_nothingFound:{FR:'Aucun siege detecte', EN:'No siege found', RU:'Осады отсутсвуют'},
  siege_sieges:{FR:'Assieges', EN:'Besiegeds', RU:'Осажденный'},
  siege_title:{FR:'Sieges', EN:'Seats', RU:'Осады'},
  siege_villes:{FR:'Villes', EN:'Towns', RU:'Город'},
  simulateFight:{FR:'Simuler ce combat',EN:'Simulate this fight', RU:'Анализировать это бой'},
  menuFormat:{FR:'Format du menu', EN:'Menu format', RU:'Вид меню'},
  menuFormat_dyn:{FR:'Dynamique', EN:'Dynamic', RU:'Динамический'},
  menuFormat_horiz:{FR:'Horizontal', EN:'Vertical', RU:'Горизонтальный'},
  menuFormat_vert:{FR:'Vertical', EN:'Horizontal', RU:'Вертикальный'},
  titleBlocNote:{FR:'Bloc-notes', EN:'Notes', RU:'Заметки'},
  titleGraber:{FR:'Graber', EN:'Graber', RU:'Грабитель'},
  titleConfig:{FR:'Visceral - Configuration', EN:'Visceral - Configuration', RU:'Visceral - Настройка'},
  titleMagicalGuild:{FR:'Sorts disponibles', EN:'Spells available', RU:'Доступные заклинания'},
  titleMiscTools:{FR:'Outils divers', EN:'Misc tools', RU:'Инструменты'},
  titleProfil:{FR:'Restaurer un profil', EN:'Restore profil', RU:'Удалить профиль'},
  titleReperes:{FR:'Reperes', EN:'Shortcuts', RU:'Ссылки'},
  titleSentinelle:{FR:'Sentinelle', EN:'Sentinel', RU:'Часовой'},
  titleStocks:{FR:'Productions et stocks', EN:'Productions and stocks', RU:'Ресурсы и добыча'},
  toggleSentinelle_off:{FR:"Stopper l'actualisation automatique", EN:'Stop automatic reload', RU:'Выключить автообновление'},
  toggleSentinelle_on:{FR:"Demarrer l'actualisation automatique", EN:'Start automatic reload', RU:'Включить автообновление'},
  TooltipIncomeHourly:{FR:'Revenu horaire', EN:'Hourly income', RU:'Часовой доход'},
  TooltipIncomeIsEmpty:{FR:'VIDE', EN:'EMPTY', RU:'Пусто'},
  TooltipIncomeUntilEmpty:{FR:'Vide dans', EN:'Empty in', RU:'Закончится через'},
  TooltipIncomeUntilFull:{FR:'Plein dans', EN:'Full in', RU:'Наполнится через'},
  undefinedVariable:{FR:'La variable %s est indefinie.\nAbandon.', EN:'Variable %d is undefined.\nAborting.', RU:'Переменная %s не определена. Завершение.'},
  UpdateAvailable:{FR:'Mise a jour v.%s disponible', EN:'Update v.%s available', RU:'Доступно обновление v.%s.'},
  undefinedDatas:{FR:'Donnees indefinies.', EN:'Undefined datas.', RU:'Неопределенные данные'},
  unitaryPrice:{FR:'Prix unitaire', EN:'Unitary price', RU:'Цена за еденицу'},
  versionInvalide:{FR:'Cette version du script Visceral est trop ancienne pour pouvoir se synchroniser a la base de donnees.',
                   EN:'This version of the Visceral script is too old to be allowed to synchronize with the database.',
				   RU:'Версия Visceral слишком ранняя, что бы синхронизировать с базой данных.'},
  zoomRepere13:{FR:'13x13 regions', EN:'13x13 areas', RU:'13х13 клеток'},
  zoomRepere35:{FR:'35x35 regions', EN:'35x35 areas', RU:'35x35 клеток'},
  zoomRepere35Warning:{FR:"Le format 35x35 ne declenchera aucun recentrage si la cible (x,y) est deja affichee sur l'interface (bug non resolu pour le moment)",
                       EN:'The format 35x35 will not trigger any focus to the (x,y) target if the area is already visible on the interface',
					   RU:'Формат 35x35 не будет центрировать карту, если цель находится в видимой области.'},
  zoomRepereSize:{FR:'Format des reperes', EN:'Shortcuts format', RU:'Тип ярлыка'},

  
  NOENDBUG:''
 };
 
 
// vatokato func
function getVTime(dist,t) {
	// время на 1 клетку с войском (t=1)  = 15 минут, без войска t!=1)  = 5 минут
	var vRT = (t==1) ? 900 : 300;	
	var time = vRT*dist;	

	var h=Math.floor(time/3600);	
	time-=3600*h;	
	var m=Math.floor(time/60);			
	var s=Math.ceil(time-60*m);
	
	if (h<10) h='0'+h;
	if (m<10) m='0'+m;	
	if (s<10) s='0'+s;	
	
	return h+':'+m+':'+s;	
}
// \vatokato edit end
//**************************
// TRADUCTION
//**************************
function i18n(K)
{
 var a, r;
 if ( !K ) { return ''; }
 if ( DEBUG_l10n.indexOf(K) == -1 ) { DEBUG_l10n.push(K); }
 if ( K in l10n )
 {
  r = l10n[K][locale];
  if ( arguments.length == 1 ) { return r; }
  a = Array.prototype.slice.call(arguments);
  a[0] = r;
  return sprintf.apply(this, a);
 }
 else if ( UNKNOWN_l10n.indexOf(K) == -1 ) { UNKNOWN_l10n.push(K); }
 return K;
}
function addL10N(all) { var k; for ( k in all ) { if ( all.hasOwnProperty(k) ) { l10n[k] = all[k]; } } }
//**************************
// UPDATER
//**************************
function updateCheck(forced)
{
 var d = new Date().getTime();
 // Verif une fois par jour (24 h * 60 m * 60 s * 1000 ms)
 if ( forced || (API.localStorage.value(idScript, 'lastUpdate', 0) + 86400000 <= d) )
 {
  try {
   XHR.send( {
    method:'GET',
    url:sprintf(URL.GM.checkVersion, idScript, d, VERSION),
    headers:{'Cache-Control': 'no-cache'},
    onload:function(R)
    { 
     var t, node, remote_version = intval(R.responseText);
     if ( remote_version > VERSION )
     {
      t = i18n('UpdateAvailable', remote_version);
      if ( (node=gBI('VR_configuration_checkUpdate')) ) { node.innerHTML = t; }
      if ( (node=Window.MANAGER.get('Visceral')) && (node=node.titleNode) )
      {
       node.title = t;
       API.CSS.add('update', node);
       if ( (node=gBI('VRversion')) )
       {
        node.firstChild.innerHTML = 'MAJ';
        node.lastChild.innerHTML = remote_version;
        node.href = URL.GM.scriptName;
       }
      }
      if ( forced && confirm(i18n('newVersionConfirmInstall', remote_version)) )
      { 
       API.localStorage.set(idScript, 'lastUpdate', d);
       GM_openInTab(URL.GM.scriptName);
      }
     }
     else if ( forced ) { alert(i18n('noUpdateAvailable')); }
    }
   } );
  } catch (ex) { if ( forced ) { alert(i18n('errorWhileCheckingVersion', ex)); } }
 }
}
function doUpdateCheck() { updateCheck(true); }

//**************************
// COMMON
//**************************
function fixPosition(p) { if ( p > worldSize ) { return p - worldSize; } return p; }
function validatePosition(p) { p = intval(p); if ( isNaN(p) || p <= 0 || p > worldSize ) { return false; } return p; }
function getCurrentX() { return validatePosition(lastRegionX || H.currentView.regionX); }
function getCurrentY() { return validatePosition(lastRegionY || H.currentView.regionY); }
function getDistance(x1,y1,x2,y2,digits)
{
 var M = Math, abs = M.abs, pow = M.pow, w = worldSize, w2 = w / 2, dx = abs(x2 - x1), dy = abs(y2 - y1);
 if ( dx > w2 ) { dx = w - dx; }
 if ( dy > w2 ) { dy = w - dy; }
 return numberToFixed(M.sqrt(pow(dx, 2) + pow(dy, 2)), intval(digits), true);
}
function getDirection(x1,y1,x2,y2)
{
 var r = {x:0,y:0}, abs = Math.abs, w2 = worldSize / 2, dx = abs(x2 - x1), dy = abs(y2 - y1);
 if ( x1 != x2 ) { if ( dx > w2 ) { r.x = x2 > x1 ? -1 : 1; } else { r.x = x2 > x1 ? 1 : -1; } }
 if ( y1 != y2 ) { if ( dy > w2 ) { r.y = y2 > y1 ? -1 : 1; } else { r.y = y2 > y1 ? 1 : -1; } }
 return r;
}
function getDirectionTexte(x1,y1,x2,y2)
{
 var nsew = getDirection(x1,y1,x2,y2), tmp = ['N','S','E','W'], d = [];
 if ( nsew.y > 0 ) { d.push(tmp[1]); } else if ( nsew.y < 0 ) { d.push(tmp[0]); }
 if ( nsew.x > 0 ) { d.push(tmp[2]); } else if ( nsew.x < 0 ) { d.push(tmp[3]); }
 return d.join('');
}
function directionToFull(D/*irection*/) { return i18n('directionFull_' + D); }
/*
function getToday()
{
 var d = new Date();
 function f(i) { i = '00'+i; return i.substr(i.length-2, i.length); }
 return [f(d.getDate()), f(d.getMonth()+1), d.getFullYear()].join('/');
}
*/

function sendToVRDB(needUserPassword, url, datas, xhr_OK, xhr_KO)
{
 var frm, i, tmp, userid;
 if ( (needUserPassword && (userid=API.USERID.get(worldId))) || (!needUserPassword) )
 {
  datas.push('version=' + VERSION );
  datas.push('userid=' + userid);
  datas.push('worldid=' + worldId);
  datas.push('allianceid=' + allianceId);
  datas.push('playerid=' + playerId);
  datas.push('UBI_userId=' + UBI_userId);
  if ( typeof xhr_OK != 'function' ) { xhr_OK = function(){}; }
  if ( typeof xhr_KO != 'function' ) { xhr_KO = function(){}; }
  if ( sendToVRDB_normalMode )
  {
   XHR.send( { method:'POST', url:url, data:datas.join('&'), headers:{'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"}, onload:xhr_OK, onerror:xhr_KO } );
  }
  else
  {
   frm = cE('FORM', {action:url,method:'POST',target:'_blank'});
   for ( i = 0; i < datas.length; i++ )
   {
    if ( ( tmp = datas[i].match(/([^=]+)=(.*)/) ) )
    {
     frm.appendChild(cE('INPUT', {type:'hidden', name:tmp[1],value:tmp[2]}));
    }
   }
   document.body.appendChild(frm);
   frm.submit();
   document.body.removeChild(frm);
  }
 }
}

function isDelayOver(K,D/*elay*/)
{
 var k = 'auto'+K, w = ''+worldId, d = new Date().getTime(), lS = API.localStorage, tmp = lS.value(idScript, k, {}), doIt = !(w in tmp) || ( d-intval(tmp[w]) >= D );
 if ( doIt ) { tmp[w] = d; lS.set(idScript, k, tmp); }
 return doIt;
}

function setSprite(N/*ode*/, C/*onf*/, S/*prite*/)
{
 var conf = H.CSSSPRITE_CONF[C], sprite = conf.sprites[S], x = sprite.x, y = sprite.y,
//      url = ($defined(c.eventFile) && c.eventFile && $defined(HOMMK.EVENT_IMG_URL) ? HOMMK.EVENT_IMG_URL : HOMMK.IMG_URL) + "css_sprite/" + ($defined(c.file) ? c.file : j) + "." + c.ext;
     url = H.IMG_URL + "css_sprite/" + C + "." + conf.ext;
 if ( x==0 && y==0 ) { x = conf.width; y = conf.height; }
 N.style.backgroundImage = "url('" + url + "')";
 N.style.backgroundPosition = '-' + x + 'px -' + y + 'px';
 N.style.backgroundRepeat = 'repeat';
 N.style.height = sprite.h + 'px';
 N.style.width = sprite.w + 'px';
 return N;
}

//**************************
// CACHE
//**************************
CACHE = (function(){
var all = {};
function K/*ey*/(T) { return '$'+T; }
function get(T/*ype*/, id, D/*ef*/)
{
 var k = K(T);
 if ( k in all ) { id = '$'+id; if ( id in all[k] ) { return all[k][id]; } }
 return D;
}
function add(T, id, V, F/*orced*/)
{
 var k = K(T);
 if ( !(k in all) ) { all[k] = {}; }
 id = '$'+id;
 if ( F || !(id in all[k]) ) { all[k][id] = V; }
}
function init()
{
 var i, tmp, towns, aId, aName, pId, pName, player = H.player.content;
 aId = player.allianceId;
 aName = player.allianceName;
 pId = player.id;
 pName = player.name;
 CACHE.add('Player', pId, player);
 CACHE.add('PlayerName', pId, pName);
 if ( aName ) { CACHE.add('AllianceNameFromPlayerId', pId, aName); }
 towns = H;
 // todo : utiliser plutot H.elementPool.get('RegionCity').values()
 if (    ( 'sideBar' in towns )                && (towns=towns.sideBar)
      && ( 'content' in towns )                && (towns=towns.content)
      && ( 'attachedRegionCityList' in towns ) && (towns=towns.attachedRegionCityList) )
 {
  for ( i = 0; i < towns.length; i++ )
  {
   tmp = towns[i].x+','+towns[i].y;
   CACHE.add('TownName', tmp, towns[i].cityName);
   CACHE.add('PlayerIdFromXY', tmp, pId);
  }
 }
}
return {add:add,get:get,init:init};
}());

//**************************
// WINDOW
//**************************
function Window(id, opts, cbs)
{
 var k;
 this.id = id;
 this.idStorage = 'VR_'+id;
 if ( opts )
 {
  for ( k in opts )
  {
   if ( opts.hasOwnProperty(k) )
   {
    if ( k == 'reduced' ) { this.reduced = true; }
    else { this['cfg_'+k] = opts[k]; }
   }
  }
 }
 if ( cbs ) { for ( k in cbs ) { if ( cbs.hasOwnProperty(k) ) { this['cb_'+k] = cbs[k]; } } }
 return this;
}
Window.prototype =
{
id:null, shown:false, focused:false, reduced:false,
mainNode:null, subNode:null, titleNode:null,
cfg_title:'',
cfg_resizeable:true, cfg_draggable:true, cfg_keepOnScreen:false, cfg_closeable:true, cfg_closeButton:true, cfg_reduceable:true,
cfg_width:550, cfg_height:200, cfg_top:50, cfg_left:50,
cb_oncreate:NOOP, cb_onshow:NOOP, cb_onhide:NOOP, cb_onresize:NOOP, cb_onreduce:NOOP, cb_onexpand:NOOP,
width:null, height:null, top:null, left:null,
isShown:function() { return this.shown; },
isReduced:function() { return this.reduced; },
getWidth:function() { return this.width; },
setWidth:function(w,save)
{
 var n = this.subNode;
 w = intval(w); if ( w <= 0 ) { w = 1; }
 this.width = w;
 if ( n ) { n.style.width = w+'px'; }
 if ( save !== false ) { API.localStorage.set(idScript,this.idStorage+'_width',w); }
 return this;
},
getHeight:function() { return this.height; },
setHeight:function(h,save)
{
 var n = this.subNode;
 h = intval(h); if ( h <= 0 ) { h = 1; }
 this.height = h;
 if ( n ) { n.style.height = h+'px'; }
 if ( save !== false ) { API.localStorage.set(idScript,this.idStorage+'_height',h); }
 return this;
},
getLeft:function() { return this.left; },
setLeft:function(l,save)
{
 var n = this.mainNode;
 l = intval(l); if ( l < 0 ) { l = 0; }
 this.left = l;
 if ( n ) { n.style.left = l+'px'; }
 if ( save !== false ) { API.localStorage.set(idScript,this.idStorage+'_left',l); }
 return this;
},
getTop:function() { return this.top; },
setTop:function(t,save)
{
 var n = this.mainNode;
 t = intval(t); if ( t < 0 ) { t = 0; }
 this.top = t;
 if ( n ) { n.style.top = t+'px'; }
 if ( save !== false ) { API.localStorage.set(idScript,this.idStorage+'_top',t); }
 return this;
},
callCB:function(type) { var fn = this['cb_on'+type]; if ( typeof fn == 'function' ) { fn.call(this); } },
create:function()
{
 var node, btn;
 function cfgSize(id,t,d) { return intval(API.localStorage.value(idScript,id+'_'+t,d)); }

 this.mainNode = cE('DIV', {id:'VRwin_'+this.id, className:'VRwin'});
 this.titleNode = cE('H1');
 if ( this.cfg_closeable && this.cfg_closeButton )
 {
  btn = this.titleNode.appendChild(cE('DIV', {className:'VRwinclose'}));
  btn.addEventListener('click', this.hide.bind(this), true);
 }
 if ( this.cfg_reduceable )
 {
  btn = this.titleNode.appendChild(cE('DIV', {className:'VRwinreduce'}));
  btn.addEventListener('click', this.reduce.bind(this), true);
 }
 this.titleNode.appendChild(cTN(this.cfg_title));
 if ( this.cfg_draggable )
 {
  API.CSS.add('draggable', this.mainNode);
  this.titleNode.addEventListener('mousedown', Window.DRAGGER.mousedown(this), true);
 }
 this.mainNode.addEventListener('click', this.focus.bind(this), true);
 this.subNode = cE('DIV', {className:'VRwinsub'});
 this.mainNode.appendChild(this.titleNode);
 this.mainNode.appendChild(this.subNode);
 this.setTop(cfgSize(this.idStorage,'top',this.cfg_top), false)
     .setLeft(cfgSize(this.idStorage,'left',this.cfg_left), false)
     .setWidth(cfgSize(this.idStorage,'width',this.cfg_width), false)
     .setHeight(cfgSize(this.idStorage,'height',this.cfg_height), false);
 this.callCB('create');
 if ( this.cfg_resizeable )
 {
  node = cE('SPAN', {title:i18n('resize')});
  node.addEventListener('mousedown', Window.RESIZER.mousedown(this), true);
  this.mainNode.appendChild(cE('DIV', {className:'VRwinResizer', childs:[node]}));
 }
 if ( this.reduced ) { API.CSS.add('reduced', this.mainNode); }
 document.body.appendChild(this.mainNode);
 return this;
},
reduce:function()
{
 var r = this.reduced;
 if ( this.cfg_reduceable )
 {
  this.reduced = !r;
  API.CSS[r?'remove':'add']('reduced', this.mainNode);
  this.callCB(this.reduced?'reduce':'expand');
 }
 return this;
},
hide:function()
{
 var s = this.shown;
 if ( this.cfg_closeable )
 {
  this.shown = false;
  if ( this.mainNode ) { API.CSS.hide(this.mainNode); }
  if ( s ) { this.callCB('hide'); }
 }
 return this;
},
focus:function() { if ( !this.focused ) { Window.MANAGER.focus(this); } this.focused = true; return true; },
setZIndex:function(z) { this.mainNode.style.zIndex = z; },
show:function()
{
 if ( !this.mainNode ) { this.create(); }
 if ( this.id == 'config' ) { Window.MANAGER.closeAll(['config']); } else { Window.MANAGER.close('config'); }
 this.shown = true;
 this.callCB('show');
 this.focus();
 API.CSS.show(this.mainNode);
 return this;
},
toggle:function() { if ( this.shown ) { this.hide(); } else { this.show(); } return this; }
};
Window.MANAGER = (function()
{
 var all = {};
 function get(id) { if ( id in all ) { return all[id]; } return null; }
 function isShown(id)
 {
  var w = get(id);
  if ( w ) { return w.isShown(); }
  return false;
 }
 function close(id)
 {
  var s, w = get(id);
  if ( w )
  {
   s = w.cfg_keepOnScreen;
   if ( typeof s == 'function' ) { s = s.call(w); }
   if ( s !== true ) { w.hide(); }
  }
 }
 function closeAll(except)
 {
  var k;
  if ( !except ) { except = []; }
  for ( k in all ) { if ( all.hasOwnProperty(k) && all[k] && except.indexOf(all[k].id) == -1 ) { close(k); } }
 }
 function create(id, opts, cbs)
 {
  if ( !(id in all) ) { all[id] = new Window(id,opts,cbs); }
  return all[id];
 }
 function focus(main)
 {
  var k, w, z = 1e5;
  for ( k in all ) { if ( all.hasOwnProperty(k) && (w=all[k]) && w != main ) { w.focused = false; w.setZIndex(k==='Visceral'?1e6:z++); } }
  main.setZIndex(z++);
  main.focused = true;
 }
 function backupSizes()
 {
  var i, k, w, v, prop, r = [], lS = API.localStorage, sizes = ['top', 'left', 'width', 'height'], map = {top:'T',left:'L',width:'W',height:'H'};
  for ( k in all ) { if ( all.hasOwnProperty(k) && (w=all[k]) ) {
   for ( i = sizes.length; i--; )
   {
    prop = w.idStorage + '_' + sizes[i];
    v = lS.value(idScript, prop, 'na');
    if ( v !== 'na' ) { r.push(w.id+'_'+map[sizes[i]]+'_'+v); }
   }
  } }
  return r;
 }
 function restoreSizes(sizes)
 {
  // mon dieu que c'est laid tout ca
  var i, w, id, prop, v, tmp, map={T:'Top',L:'Left',W:'Width',H:'Height'};
  for ( i = sizes.length; i--; )
  {
   tmp = sizes[i].split('_');
   if ( tmp.length === 3 )
   {
    id = tmp[0];
    prop = map[tmp[1]];
    v = intval(tmp[2]);
    if ( (w=get(id)) ) { w['set' + prop](v); }
   }
  }
 }
 return {create:create,close:close,closeAll:closeAll,get:get,isShown:isShown,focus:focus,backupSizes:backupSizes,restoreSizes:restoreSizes};
}());
Window.RESIZER =
{
win:null, width:null, height:null,
mousedown:function(me)
{
 return function(E)
 {
  var d = document.documentElement, W = Window.RESIZER;
  W.win = me; W.width = me.getWidth(); W.height = me.getHeight();
  W.x = API.EVT.getX(E); W.y = API.EVT.getY(E);
  d.addEventListener('mousemove', W.mousemove, true);
  d.addEventListener('mouseup', W.mouseup, true);
  return API.EVT.stop(E);
 };
},
mousemove:function(E)
{
 var W = Window.RESIZER, x = API.EVT.getX(E), y = API.EVT.getY(E);
 W.win.setWidth(W.width - (W.x - x), false).setHeight(W.height - (W.y - y), false);
},
mouseup:function(E)
{
 var d = document.documentElement, W = Window.RESIZER, w = W.win;
 w.setWidth(w.getWidth()); w.setHeight(w.getHeight());
 d.removeEventListener('mousemove', W.mousemove, true);
 d.removeEventListener('mouseup', W.mouseup, true);
 w.callCB('resize');
 return API.EVT.stop(E);
}
};
Window.DRAGGER =
{
win:null, x:null, y:null, left:null, top:null,
mousedown:function(me)
{
 return function(E)
 {
  var d = document.documentElement, W = Window.DRAGGER;
  W.win = me; W.left = me.getLeft(); W.top = me.getTop();
  W.x = API.EVT.getX(E); W.y = API.EVT.getY(E);
  d.addEventListener('mousemove', W.mousemove, true);
  d.addEventListener('mouseup', W.mouseup, true);
  return API.EVT.stop(E);
 };
},
mousemove:function(E)
{
 var W = Window.DRAGGER, x = API.EVT.getX(E), y = API.EVT.getY(E);
 W.win.setLeft(W.left - (W.x - x), false);
 W.win.setTop(W.top - (W.y - y), false);
},
mouseup:function(E)
{
 var d = document.documentElement, W = Window.DRAGGER, w = W.win;
 w.setLeft(w.getLeft()); w.setTop(w.getTop());
 d.removeEventListener('mousemove', W.mousemove, true);
 d.removeEventListener('mouseup', W.mouseup, true);
 return API.EVT.stop(E);
}
};

// TODO : fusionner MY_CITIES et MY_ALLY par un truc du genre MY={CITIES:{},ALLY:{}};
//**************************
// mes villes
//**************************
MY_CITIES = (function(){
var all = [];
function getById(id) { for ( var i = all.length; i--; ) { if ( all[i].id == id ) { return all[i]; } } return null; }
function getByName(N) { for ( var i = all.length; i--; ) { if ( all[i].cityName == N ) { return all[i]; } } return null; }
function isOwnFromId(id) { return !!getById(id); }
function isOwnFromName(N) { return !!getByName(N); }
function init()
{
 var c = H.elementPool.get('RegionCity');
 if ( c && (c=c.values()) ) { c.each(function(a) { all.push(a.content); }); }
}
return {init:init, getById:getById, getByName:getByName, isOwnFromId:isOwnFromId, isOwnFromName:isOwnFromName};
}());

//**************************
// mon alliance
//**************************
// TODO : trouver comment gerer les wings
MY_ALLY = (function(){
var players = [], canErase = true;
function set(all, forced)
{
 if ( canErase || forced )
 {
  players = all;
  API.localStorage.set(idScript, 'myally'+worldId, all);
 }
}
function force(all) { set(all, true); canErase = false; }
function is(pId) { return players.indexOf(pId) !== -1; }
function init()
{
 function cb(retour)
 {
  var i, all, r = [];
  if ( allianceId && canErase && (all=this.content) && all.id == allianceId && (all=all.attachedPlayerList) )
  {
   for ( i = all.length; i--; ) { r.push(all[i].id); }
   set(r);
  }
  return retour;
 }
 H.ViewAllianceFrame.prototype.display = API.injectAfter(H.ViewAllianceFrame.prototype.display, cb);
 canErase = true;
 players = API.localStorage.value(idScript, 'myally'+worldId, []);
}
function isDefined() { return players.length > 0; }
return {init:init, set:set, force:force, is:is, isDefined:isDefined};
}());

//**************************
// rappel des sorts
//**************************
MAGICAL_GUILD = (function(){
var nodeListe, nodeDetail, renderByTowns = false;
function getSpells()
{
 var i, lS = API.localStorage, all = lS.value(idScript, 'MGuilds', []);
 for ( i = all.length; i--; ) { if ( all[i].world == worldId ) { return all[i].regions; } }
 return [];
}
function removeRegions(R)
{
 var i, j, line, keep, lS = API.localStorage, all = lS.value(idScript, 'MGuilds', []), worlds = [];
 for ( i = all.length; i--; )
 {
  line = all[i];
  if ( line.world != worldId ) { worlds.push(line); }
  else
  {
   keep = [];
   if ( line.regions.length > 0 )
   {
    for ( j = 0; j < line.regions.length; j++ )
    {
     if ( R.indexOf(line.regions[j].region) == -1 ) { keep.push(line.regions[j]); }
    }
   }
   if ( keep.length > 0 ) { line.regions = keep; worlds.push(line); }
  }
 }
 if ( worlds.length > 0 ) { lS.set(idScript, 'MGuilds', worlds); }
 else { lS.remove(idScript, 'MGuilds'); }
}
function updateContent()
{
 var i, j, r, line, all, lostRegions = [], toDraw = [], found = false;
 function sortSpells(A,B)
 {
  var a = A.ecole.toUpperCase(), b = B.ecole.toUpperCase();
  if ( a > b ) { return 1; }
  if ( a < b ) { return -1; }
  if ( A.lvl > B.lvl ) { return 1; }
  if ( A.lvl < B.lvl ) { return -1; }
  a = A.name.toUpperCase(); b = B.name.toUpperCase();
  if ( a > b ) { return 1; }
  if ( a < b ) { return -1; }
  return 0;
 }
 function onclick(E)
 {
  var i, j, img, all, h1, name, lvl, ecole, spell, tmp, dsc, r, spells, villes = [], EVT = API.EVT, t = EVT.getParentTarget(E, 'LI');
  if ( t && t.id )
  {
   tmp = t.id.split('-');
   ecole = tmp[1];
   spell = tmp[2];
   all = getSpells();
   for ( i = 0; i < all.length; i++ )
   {
    r = MY_CITIES.getById(all[i].region);
    r = r ? r.cityName : 'ville inconnue ('+all[i].region+')';
    if ( r && (tmp=''+all[i].region) && villes.indexOf(tmp) == -1 && (spells=all[i].spells) )
    {
     for ( j = 0; j < spells.length; j++ )
     {
      if ( spells[j].tagEcole == ecole && spells[j].tagName == spell )
      {
       villes.push(r);
       name = spells[j].name;
       dsc = spells[j].dsc;
       lvl = spells[j].lvl;
       break;
      }
     }
    }
   }
   API.DOM.flush(nodeDetail);
   if ( name && ecole && spell && lvl && dsc && villes.length > 0 )
   {
    h1 = nodeDetail.appendChild(cE('H1'));
    h1.appendChild(setSprite(cE('DIV'), 'SpellStack_' + ecole, spell));
    h1.appendChild(cE('SPAN', {innerHTML:name}));
    tmp = nodeDetail.appendChild(cE('P'));
    tmp.appendChild(cTN(dsc));
    tmp.appendChild(cE('BR'));tmp.appendChild(cE('BR'));
    tmp.appendChild(cTN(i18n('disponibilites')));
    for ( i = 0; i < villes.length; i++ )
    {
     tmp.appendChild(cE('BR'));
     tmp.appendChild(cTN(' - ' + villes[i]));
    }
   } else { nodeDetail.appendChild(cTN('nothing')); }
  }
  return EVT.stop(E);
 }
 function drawByTypes(spells)
 {
  var i, ul, li, h1, div, e, ecoles = {}, already = [],
      map = {LIGHT:'LIGHT_WIZARD',DARK:'DARK_WIZARD',DESTRUCTION:'DESTRUCTIVE_WIZARD',SUMMON:'SUMMONING_WIZARD'};
  for ( i = 0; i < spells.length; i++ )
  {
   e = spells[i].tagEcole;
   if ( !(e in ecoles) ) { ecoles[e] = []; }
   ecoles[e].push(spells[i]);
  }
  for ( e in ecoles )
  {
   if ( ecoles.hasOwnProperty(e) )
   {
    if ( !(e in map) ) { map[e] = 'DARK_WIZARD_DISABLED'; }
    spells = ecoles[e];
    if ( spells.length > 0 )
    {
     found = true;
     spells.sort(sortSpells);
     h1 = nodeListe.appendChild(cE('H1', {className:'heroFrameSummaryHeroClassBackground_purple'}));
     h1.appendChild(setSprite(cE('DIV'), 'HeroClass', map[e]));
     h1.appendChild(cE('SPAN', {innerHTML:spells[0].ecole}));
     ul = nodeListe.appendChild(cE('UL'));
     ul.addEventListener('click', onclick, true);
     for ( i = 0; i < spells.length; i++ )
     {
      if ( already.indexOf(e+spells[i].tagName) == -1 )
      {
       already.push(e+spells[i].tagName);
       li = cE('LI', {id:'VR-'+e+'-'+spells[i].tagName});
       ul.appendChild(setSprite(li, 'SpellStack_' + e, spells[i].tagName));
      }
     }
    }
   }
  }
  if ( !found ) { nodeListe.appendChild(cTN(i18n('noSpellKnown'))); }
  else { API.DOM.flush(nodeDetail); nodeDetail.appendChild(cTN(i18n('MGuildSelectASpell'))); }
 }
 function drawByTowns(spells)
 {
  var i, j, t, ul, li, ecoleLvl5, ecoles, nodeEcoles, s, found = false, towns = {};
  function sortTowns(T)
  {
   var i, t, tmp = [], r = [];
   for ( t in T ) { if ( T.hasOwnProperty(t) ) { tmp.push(t); } }
   tmp.sort(function(a,b) { a = a.toUpperCase(); b = b.toUpperCase(); if ( a > b ) { return 1; } if ( a < b ) { return -1; } return 0; });
   for ( i = 0; i < tmp.length; i++ ) { if ( T[tmp[i]].length > 0 ) { r.push({town:tmp[i], spells:T[tmp[i]].sort(sortSpells)}); } }
   return r;
  }
  function getTowns(S)
  {
   var i, T = {};
   for ( i = 0; i < S.length; i++ )
   {
    if ( (t=S[i].cityName) )
    {
     if ( !(t in T) ) { T[t] = []; }
     T[t].push(S[i]);
    }
   }
   return sortTowns(T);
  }
  towns = getTowns(spells);
  for ( i = 0; i < towns.length; i++ )
  {
   found = true;
   ecoleLvl5 = false;
   ecoles = [];
   nodeEcoles = cE('DIV');
   nodeListe.appendChild(cE('H1', {innerHTML:towns[i].town, childs:[nodeEcoles]}));
   ul = nodeListe.appendChild(cE('UL'));
   for ( j = 0; j < towns[i].spells.length; j++ )
   {
    s = towns[i].spells[j];
    if ( s.lvl == 5 ) { ecoleLvl5 = s.ecole; }
    if ( ecoles.indexOf(s.ecole) == -1 ) { ecoles.push(s.ecole); }
    li = cE('LI', {title:s.ecole + ' - #' + s.lvl + ',' + s.name + ' : ' + s.dsc});
    ul.appendChild(setSprite(li, 'SpellStack_' + s.tagEcole, s.tagName));
   }
   if ( ecoles.length == 2 )
   {
    nodeEcoles.appendChild(cTN('(' + ecoles[0] + ' et ' + ecoles[1]+')'));
    if ( ecoleLvl5 ) { nodeEcoles.appendChild(cTN(' specialisation : ' + ecoleLvl5)); }
   }
  }
  if ( !found ) { nodeListe.appendChild(cTN(i18n('noSpellKnown'))); }
 }

 if ( nodeListe )
 {
  all = getSpells();
  for ( i = 0; i < all.length; i++ )
  {
   r = MY_CITIES.getById(all[i].region);
   if ( !r ) { lostRegions.push(all[i].region); }
   else { for ( j = 0; j < all[i].spells.length; j++ ) { line = all[i].spells[j]; line.cityName = r.cityName; toDraw.push(line); } }
  }
  if ( lostRegions.length > 0 ) { removeRegions(lostRegions); }
  API.DOM.flush(nodeListe);
  if ( renderByTowns ) { API.CSS.hide(nodeDetail); drawByTowns(toDraw); } else { API.CSS.show(nodeDetail); drawByTypes(toDraw); }
 }
}
function switchMode()
{
 renderByTowns = !renderByTowns;
 API.CSS.remove(renderByTowns ? 'byTypes':'byTowns', this.subNode);
 API.CSS.add(renderByTowns ? 'byTowns':'byTypes', this.subNode);
 API.localStorage.set(idScript, 'MGuildRenderByTowns', renderByTowns);
 updateContent();
}
function createWin()
{
 function oncreate()
 {
  var n = this.titleNode.appendChild(cE('SPAN', {id:'MGuildSwitchMode', title:i18n('MGuildSwitchMode')}));
  n.addEventListener('click', switchMode.bind(this), true);
  renderByTowns = API.localStorage.value(idScript, 'MGuildRenderByTowns', true);
  API.CSS.add(renderByTowns ? 'byTowns':'byTypes', this.subNode);
  nodeListe = this.subNode.appendChild(cE('DIV'));
  nodeDetail = this.subNode.appendChild(cE('DIV'));
 }
 Window.MANAGER.create('magicalGuild', { title:i18n('titleMagicalGuild'), width:460,height:400 }, { oncreate:oncreate, onshow:updateContent }).show();
}
function toggle()
{
 var M = Window.MANAGER, w = M.get('magicalGuild');
 if ( w ) { w.toggle(); } else { createWin(); }
}
function init()
{
 function saveSpells(R/*egions*/)
 {
  var i, found = false, lS = API.localStorage, all = lS.value(idScript, 'MGuilds', []);
  lS.remove(idScript, 'magicalGuilds');
  for ( i = all.length; i--; ) { if ( all[i].world == worldId ) { all[i].regions = R; found = true; } }
  if ( !found ) { all.push({world:worldId,regions:R}); }
  lS.set(idScript, 'MGuilds', all);
  updateContent();
 }
 function addSpells(R/*egion*/,S/*pells*/)
 {
  var i, s/*pell*/, found = false, spells = [], all = getSpells();
  for ( i = 0; i < S.length; i++ )
  {
   s = S[i].attachedSpellEntity;
   spells.push({id:s.id,dsc:s.description,lvl:s.magicSchoolLevel,name:s.name,tagName:s.tagName,ecole:s.magicSchoolEntityName,tagEcole:s.magicSchoolEntityTagName});
  }
  for ( i = all.length; i--; ) { if ( all[i].region == R ) { all[i].spells = spells; found = true; } }
  if ( !found ) { all.push({region:R,spells:spells}); }
  saveSpells(all);
 }
 function cb(R)
 {
  var r, c;
  if ( this.isValid && (c=this.content) && (r=c.regionId) && (c=c.magicGuildSpellStackList) ) { addSpells(r, c); }
  return R;
 }
 H.HeroFrame.prototype.displayRefreshable = API.injectAfter(H.HeroFrame.prototype.displayRefreshable, cb);
}
return {init:init,toggle:toggle};
}());

//**************************
// stocks
//**************************
STOCKS = (function(){
function createWin()
{
 function onshow()
 {
  var all, dummy = cE('DIV');
//  var i, k, j, tmp, caravans, actions, line, all = {}, cities = H.elementPool.get('RegionCity');
  function getIncome(C/*ity*/, R/*essource*/)
  {
   var i, all = C.content.attachedRessourceStackList;
   for ( i = all.length; i--; ) { if (all[i].ressourceEntityTagName == R ) { return all[i].income; } }
   return 0;
  }
  function ressourcesRecap(R/*essources*/)
  {
   var tbl, tbody, row, cell, i, k;
   function fix(V) { return API.number.toFixed(intval(V),0,true); }
   function val(type)
   {
    var c = R[type].caravan, txt = [fix(R[type].qt)];
    if ( c > 0 ) { txt.push('('+fix(c)+')'); }
    return txt.join(' ');
   }
   tbody = cE('TBODY');
   tbl = cE('TABLE', {border:0, cellSpacing:0, cellPadding:0, className:'ressources', childs:[tbody]});
   row = tbody.insertRow(-1);
   cell = row.insertCell(-1); cell.rowSpan = 2; cell.className = 'image'; cell.appendChild(cE('SPAN', {className:'GOLD'}));
   cell = row.insertCell(-1); cell.colSpan = 3; cell.className = 'stock'; cell.innerHTML = val('GOLD');
   cell = row.insertCell(-1); cell.rowSpan = 2; cell.className = 'image borderLeft'; cell.appendChild(cE('SPAN', {className:'WOOD'}));
   cell = row.insertCell(-1); cell.className = 'stock'; cell.innerHTML = val('WOOD');
   cell = row.insertCell(-1); cell.rowSpan = 2; cell.className = 'image'; cell.appendChild(cE('SPAN', {className:'ORE'}));
   cell = row.insertCell(-1); cell.className = 'stock'; cell.innerHTML = val('ORE');
   row = tbody.insertRow(-1);
   cell = row.insertCell(-1); cell.colSpan = 3; cell.className = 'prod'; cell.innerHTML = (R.GOLD.prod>=0?'+':'-') + fix(Math.abs(R.GOLD.prod));
   cell = row.insertCell(-1); cell.className = 'prod'; cell.innerHTML = '+'+fix(R.WOOD.prod);
   cell = row.insertCell(-1); cell.className = 'prod'; cell.innerHTML = '+'+fix(R.ORE.prod);
   row = tbody.insertRow(-1); row.className = 'borderTop';
   for ( i = 0; i < RESSOURCES_RARE.length; i++ )
   {
    k = RESSOURCES_RARE[i];
    cell = row.insertCell(-1); cell.rowSpan = 2; cell.className = 'image'; cell.appendChild(cE('SPAN', {className:k}));
    cell = row.insertCell(-1); cell.className = 'stock'; cell.innerHTML = val(k);
   }
   row = tbody.insertRow(-1);
   for ( i = 0; i < RESSOURCES_RARE.length; i++ )
   {
    k = RESSOURCES_RARE[i];
    cell = row.insertCell(-1); cell.className = 'prod'; cell.innerHTML = '+'+fix(R[k].prod);
   }
   return tbl;
  }
  function getCitiesRessources()
  {
   var i, j, r = {}, cities = H.elementPool.get('RegionCity'), R = RESSOURCES;
   for ( i = R.length; i--; ) { r[R[i]] = {qt:0,prod:0,caravan:0}; }
   if ( cities && (cities=cities.values()) )
   {
    for ( i = cities.length; i--; )
    {
     for ( j = R.length; j--; )
     {
      r[R[j]].qt += cities[i].getRessourceQuantity(R[j]);
      r[R[j]].prod += getIncome(cities[i], R[j]);
     }
    }
   }
   return r;
  }
  function getCaravans()
  {
   var i, j, line, tmp, result, c, type, isRelay, cT = H.worldMap.getRemoteTimestamp(), r = [], actions = H.elementPool.get('MasterAction');
   if ( actions && (actions=actions.values()) )
   {
    for ( i = actions.length; i--; )
    {
     tmp = actions[i].content;
     type = tmp.type;
     if ( (isRelay=(tmp.type=='RELAY_DELIVERY')) || type == 'CARAVAN_DELIVERY' )
     {
      line = {isRelay:isRelay, type:type, source:'???', cible:'???', isOwn:false, livraison:false, fin:tmp.endDate, ressources:{GOLD:tmp.paramList[1], WOOD:tmp.paramList[2], ORE:tmp.paramList[3], MERCURY:tmp.paramList[4], CRYSTAL:tmp.paramList[5], SULFUR:tmp.paramList[6], GEM:tmp.paramList[7]}};
      result = i18n(isRelay?'deliveryRelay':'deliveryCaravan').exec(tmp.actionDescription);
      if ( result )
      {		
       line.source = result[1];
       line.cible = result[2];
       line.isOwn = MY_CITIES.isOwnFromName(line.cible);
      }
      tmp = actions[i].slaveActionList.elementList;
      for ( j = 0; j < tmp.length; j++ )
      {
       c = tmp[j].content;
       if ( c.startDate <= cT && c.endDate >= cT && ( c.type == 'CARAVAN_DELIVERY_MOVE' || isRelay ) ) { line.livraison = c.endDate; }
      }
      if ( isRelay ) { line.livraison = line.fin; }
      r.push(line);
     }
    }
   }
   return r.sort(function(a,b) { return a.fin - b.fin; });
  }
  function drawCaravans(N/*ode*/, all)
  {
   var i, k, c, qt, tbl, tbody, thead, row, cell, cN, caravans = getCaravans(), map = ['Source', 'Cible', 'Livraison', 'Retour'];
   function dateH(d)
   {
    var now = new Date(), dte = new Date(d*1000), tTS = H.DateUtils.timestampToString, r = [];
    if ( now.getDate() != dte.getDate() || now.getMonth() != dte.getMonth() )
    {
     r.push(tTS(d, H.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING_SHORT));
    }
    r.push(tTS(d, H.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING));
    return r.join(' ');
   }
   if ( caravans.length > 0 )
   {
    thead = cE('THEAD'); tbody = cE('TBODY'); tbl = cE('TABLE', {border:0, cellSpacing:0, cellPadding:0, className:'caravans', childs:[thead, tbody]});
    row = thead.insertRow(-1); row.insertCell(-1); // une cellule vide
    for ( i = 0; i < map.length; i++ ) { cell = row.insertCell(-1); cell.innerHTML = i18n('market'+map[i]); }
    for ( i = 0; i < caravans.length; i++ )
    {
     c = caravans[i];
     row = tbody.insertRow(-1); if ( i%2 ) { row.className = 'odd'; }
     if ( c.isRelay ) { cN = 'relay'; } else if ( c.livraison ) { cN = 'move'; } else { cN = 'back'; }
     cell = row.insertCell(-1); cell.appendChild(cE('DIV', {className:cN}));
     cell = row.insertCell(-1); cell.innerHTML = c.source;
     cell = row.insertCell(-1); cell.innerHTML = c.cible;
     cell = row.insertCell(-1); cell.innerHTML = c.livraison ? dateH(c.livraison) : i18n('caravanBack');
     cell = row.insertCell(-1); cell.innerHTML = dateH(c.fin);
     if ( c.livraison )
     {
      row = tbody.insertRow(-1); row.className = 'liste'; if ( i%2 ) { row.className += ' odd'; }
      row.insertCell(-1); // une cellule vide
      cell = row.insertCell(-1); cell.colSpan = 4;
      for ( k in c.ressources )
      {
       if ( c.ressources.hasOwnProperty(k) && (qt=intval(c.ressources[k])) && qt > 0 )
       {
        all[k].caravan += qt;
        cell.appendChild(cE('SPAN', {className:'VRressource VR_' + k}));
        cell.appendChild(cTN(numberToFixed(qt, 0, true)));
       }
      }
     }
     N.appendChild(tbl);
    }
   }
   else { N.appendChild(cE('P', {innerHTML:i18n('noCaravanMoving')})); }
   return all;
  }
  all = getCitiesRessources();
  API.DOM.flush(API.CSS.hide(this.subNode));
  this.subNode.appendChild(dummy);
  all = drawCaravans(this.subNode, all);
  this.subNode.replaceChild(ressourcesRecap(all), dummy);
  API.CSS.show(this.subNode);
 }
 function oncreate()
 {
  var n = this.titleNode.appendChild(cE('SPAN', {id:'VRStocksReload', title:i18n('actualiser')}));
  n.addEventListener('click', onshow.bind(this), true);
 }
 Window.MANAGER.create('stocks', { title:i18n('titleStocks'), width:240,height:180 }, { oncreate:oncreate, onshow:onshow }).show();
}
function toggle()
{
 var M = Window.MANAGER, w = M.get('stocks');
 if ( w ) { w.toggle(); } else { createWin(); }
}
return {toggle:toggle, show:createWin};
}());

//**************************
// openOnStart
//**************************
function isOpenOnStart(type) { var tmp = API.localStorage.value(idScript, 'openOnStart'+type, 0); return intval(tmp)===1; }
function setOpenOnStart(type,state) { API.localStorage[state?'set':'remove'](idScript, 'openOnStart'+type, 1); }
function onOpenStarters()
{
 var k, m = {Reperes:REPERES, Notes:NOTES, Stocks:STOCKS, Misctools:MISCTOOLS};
 for ( k in m ) { if ( m.hasOwnProperty(k) && isOpenOnStart(k) ) { m[k].show(); } }
}

//**************************
// lien custom
//**************************
CUSTOMLINK = (function(){
function get()
{
 var i, all = API.localStorage.value(idScript,'customLink', []);
 for ( i = all.length; i--; ) { if ( all[i].w == worldId ) { return all[i].u; } }
 return '';
}
function show()
{
 var pere, cible, url = get();
 API.DOM.removeFromParent('VRcustomLink');
 if ( url && url !== '' && ( (cible=gBI('clanSiteButton')) || (cible=gBI('worldForumsButton')) ) && (pere=cible.parentNode) )
 {
  pere.appendChild(cE('A', {id:'VRcustomLink', href:url, target:'_blank'}));
 }
}
function set(url)
{
 var i, u, n = [], added = false, all = API.localStorage.value(idScript, 'customLink', []);
 for ( i = all.length; i--; ) { if ( all[i].w == worldId ) { all[i].u = url; added = true; break; } }
 if ( !added ) { all.push({w:worldId,u:url}); }
 for ( i = all.length; i--; ) { if ( (u=all[i].u) && (u=u.trim()) ) { n.push(all[i]); } }
 API.localStorage.set(idScript, 'customLink', n);
 show();
}
return {get:get,set:set,show:show};
}());

//**************************
// CONFIG
//**************************
CONFIG = (function(){
var plugs = {frm:NOOP,show:NOOP,submit:NOOP};
function updateValues()
{
 var tmp, i, val, lS = API.localStorage, ID=idScript;
 function txt(id,v,d) { var n = gBI(id); if ( n ) { n.value = lS.value(ID,v,d); } }
 function chk(id,v,d) { var n = gBI(id); if ( n ) { n.checked = lS.value(ID,v,d); } }
 txt('VR_configuration_sentinelleDelay', 'sentinelle_reload', 5000);
 chk('VR_configuration_sentinelleCloseOnClick', 'sentinelle_close_on_click', 0);
 txt('VR_configuration_sentinelleHistory', 'sentinelle_history', 5);
 chk('VR_configuration_sentinelleForceServerRead', 'sentinelle_forceServerRead', 0);
 txt('VR_configuration_sentinelleForceServerDelay', 'sentinelle_forceServerDelay', 3000);
 gBI('VRcfg_openOnStartReperes').checked = isOpenOnStart('Reperes');
 gBI('VRcfg_openOnStartNotes').checked = isOpenOnStart('Notes');
 gBI('VRcfg_openOnStartStocks').checked = isOpenOnStart('Stocks');
 gBI('VRcfg_openOnStartMisctools').checked = isOpenOnStart('Misctools');
 tmp = H.REGION_WORLDMAP_ZOOM_13X13;
 gBI('VR_configuration_zoomReperes').selectedIndex = lS.value(ID,'zoomReperes', tmp) == tmp ? 0 : 1;
 tmp = lS.value(ID, 'menuFormat', 0);
 gBI('VRcfg_menuFormat').selectedIndex = tmp >= 0 && tmp < MAINMENU.getMenuFormats().length ? tmp : 0;

 for ( i = 0; i < RESSOURCES_NO_GOLD.length; i++ )
 {
  tmp = RESSOURCES_NO_GOLD[i];
  txt('VRcfg_buy'+tmp, 'marketBuyPrice'+tmp, 0);
  txt('VRcfg_sell'+tmp, 'marketSellPrice'+tmp, 0);
 }
 val = '';
 if ( (tmp=lS.value(ID, 'recipientMailing', [])) )
 {
  for ( i = tmp.length; i--; ) { if ( tmp[i] && tmp[i].world == worldId ) { val = tmp[i].recipient; break; } }
 }
 gBI('VRcfg_destinataireMailing').value = val;
 gBI('VRcfg_customLink').value = CUSTOMLINK.get();
 plugs.show();
}
function oui(autocloseWindow)
{
 return function()
 {
  var i, tmp, v, url, ckb,
      zoom13 = H.REGION_WORLDMAP_ZOOM_13X13, zoom15 = H.REGION_WORLDMAP_ZOOM_35X35,
      lS = API.localStorage, ID=idScript;

  function addRecipient(val)
  {
   var found, i, lS = API.localStorage, all = lS.value(idScript, 'recipientMailing', []);
   for ( i = all.length; i--; ) { if ( all[i].world == worldId ) { all[i].recipient = val; found=true; break; } }
   if ( !found ) { all.push({world:worldId,recipient:val}); }
   lS.set(idScript, 'recipientMailing', all);
  }
  function removeRecipient()
  {
   var i, newall = [], lS = API.localStorage, all = lS.value(idScript, 'recipientMailing', []);
   for ( i = all.length; i--; ) { if ( all[i].world != worldId ) { newall.push(all[i]); } }
   lS.set(idScript, 'recipientMailing', newall);
  }

  setOpenOnStart('Reperes', gBI('VRcfg_openOnStartReperes').checked);
  setOpenOnStart('Notes', gBI('VRcfg_openOnStartNotes').checked);
  setOpenOnStart('Stocks', gBI('VRcfg_openOnStartStocks').checked);
  setOpenOnStart('Misctools', gBI('VRcfg_openOnStartMisctools').checked);
  tmp = intval(gBI('VR_configuration_sentinelleDelay').value);
  if ( tmp < 0 ) { tmp = 0; }
  lS.set(ID,'sentinelle_reload', tmp);
  ckb = gBI('VR_configuration_sentinelleCloseOnClick').checked;
  if ( ckb ) { lS.set(ID,'sentinelle_close_on_click', 1); } else { lS.remove(ID, 'sentinelle_close_on_click'); }
  lS.set(ID,'zoomReperes', gBI('VR_configuration_zoomReperes').value == 13 ? zoom13:zoom15);
  tmp = intval(gBI('VR_configuration_sentinelleHistory').value); if ( tmp <= 0 ) { tmp = 0; }
  lS.set(ID,'sentinelle_history', tmp);
  lS.set(ID,'sentinelle_forceServerRead', gBI('VR_configuration_sentinelleForceServerRead').checked ? 1:0);
  tmp = intval(gBI('VR_configuration_sentinelleForceServerDelay').value); if ( tmp <= 100 ) { tmp = 100; }
  lS.set(ID,'sentinelle_forceServerDelay', tmp);
  lS.set(ID, 'menuFormat', gBI('VRcfg_menuFormat').value);
  for ( i = 0; i < RESSOURCES_NO_GOLD.length; i++ )
  {
   tmp = RESSOURCES_NO_GOLD[i];
   v = gBI('VRcfg_buy'+tmp); v = intval(v ? v.value : 0);
   lS.set(ID, 'marketBuyPrice'+tmp, v);
   v = gBI('VRcfg_sell'+tmp); v = intval(v ? v.value : 0);
   lS.set(ID, 'marketSellPrice'+tmp, v);
  }
  tmp = gBI('VRcfg_destinataireMailing').value;
  if ( tmp && tmp !== '' ) { addRecipient(tmp); } else { removeRecipient(); }
  CUSTOMLINK.set(gBI('VRcfg_customLink').value);
  MAINMENU.applyMenuFormat();
  plugs.submit();
  if ( autocloseWindow ) { autocloseWindow.hide(); }
 };
}
function open()
{
 function oncreate()
 {
  var i, div, fieldset, node, tmp, faction, menuFormats;
  function FIELDSET(legend, childs) { var i, l = cE('LEGEND', {childs:[cTN(i18n(legend))]}); fieldset = cE('FIELDSET', {childs:[l]}); if ( childs ) { for ( i=0; i<childs.length; i++ ) { fieldset.appendChild(childs[i]); } }  return div.appendChild(fieldset); }
  function BR() { fieldset.appendChild(cE('BR')); }
  function TXT(txt) { return fieldset.appendChild(cTN(txt)); }
  function SPAN(txt,cN,id) { var s = cE('SPAN'); if ( txt ) { s.innerHTML = i18n(txt); } if ( cN ) { s.className = cN; } if ( id ) { s.id = id; } return fieldset.appendChild(s); }
  function SELECT(id,childs,cN) { var s = cE('SELECT', {childs:childs}); if ( cN ) { s.className = cN; } if ( id ) { s.id = id; } return fieldset.appendChild(s); }
  function LABEL(idfor,txt) { return fieldset.appendChild(cE('LABEL', {htmlFor:idfor, childs:[cTN(i18n(txt))]})); }
  function INPUT(id) { return fieldset.appendChild(cE('INPUT', {type:'text', id:id, value:''})); }
  function CKBOX(id) { return fieldset.appendChild(cE('INPUT', {type:'checkbox', id:id, value:1, checked:false})); }
  function getMarket(pere, type, faction)
  {
   var tbody = cE('TBODY'), table = cE('TABLE', {border:0,cellSpacing:0,cellPadding:0,childs:[tbody]}),
       row = tbody.insertRow(-1), cell;
   cell = row.insertCell(-1); cell.appendChild(cE('DIV', {className:'VRressource VR_'+faction}));
   cell = row.insertCell(-1); cell.appendChild(cE('INPUT', {type:'text', id:'VRcfg_'+type+faction, value:''}));
   cell = row.insertCell(-1); cell.appendChild(cE('DIV', {className:'VRressource VR_WOOD'}));
   cell = row.insertCell(-1); cell.appendChild(cE('INPUT', {type:'text', id:'VRcfg_'+type+'WOOD', value:''}));
   cell = row.insertCell(-1); cell.appendChild(cE('DIV', {className:'VRressource VR_ORE'}));
   cell = row.insertCell(-1); cell.appendChild(cE('INPUT', {type:'text', id:'VRcfg_'+type+'ORE', value:''}));
   row = tbody.insertRow(-1);
   for ( i = 0; i < RESSOURCES_RARE.length; i++ )
   {
    tmp = RESSOURCES_RARE[i];
    if ( tmp != faction )
    {
     cell = row.insertCell(-1); cell.appendChild(cE('DIV', {className:'VRressource VR_'+tmp}));
     cell = row.insertCell(-1); cell.appendChild(cE('INPUT', {type:'text', id:'VRcfg_'+type+tmp, value:''}));
    }
   }
   pere.appendChild(table);
  }

  // bloc profil
  tmp = cE('DIV', {id:'VRcfg_PROFIL'});
  // bloc profil local
  div = cE('DIV');
  FIELDSET('configProfilLocal').firstChild.align = 'center';
  node = SPAN('profilSave'); node.title = i18n('profilSaveLocalTitle');
  node.addEventListener('click', BACKUP.saveLocal, true);
  TXT(' | ');
  node = SPAN('profilLoad'); node.title = i18n('profilLoadLocalTitle');
  node.addEventListener('click', BACKUP.loadLocal, true);
  // ajout du bloc profil local a profil
  tmp.appendChild(div);

  // bloc profil server
  div = cE('DIV');
  FIELDSET('configProfilServer').firstChild.align = 'center';
  node = SPAN('profilSave'); node.title = i18n('profilSaveServerTitle');
  node.addEventListener('click', BACKUP.saveServer, true);
  TXT(' | ');
  node = SPAN('profilLoad'); node.title = i18n('profilLoadServerTitle');
  node.addEventListener('click', BACKUP.loadServer, true);
  // ajout du bloc profil server a profil
  tmp.appendChild(div);
  // ajout du bloc profil
  this.subNode.appendChild(tmp);

  // bloc Market
  faction = RESSOURCES_FACTION[H.player.get('factionEntityTagName')][0];
  div = cE('DIV', {id:'VRcfg_MARKET'});
  FIELDSET('cfgMarketLegend');
  SPAN('cfgPrixUnitaire_buy', 'VR_small');
  getMarket(fieldset, 'buy', faction);
  SPAN('cfgPrixUnitaire_sell', 'VR_small');
  getMarket(fieldset, 'sell', faction);
  // ajout du bloc Market
  this.subNode.appendChild(div);

  // bloc UBI
  // force lecture des joueurs
  div = cE('DIV', {id:'VRcfg_UBI'});
  FIELDSET('UBI');
  tmp = i18n('sentinelle_forceServerRead_notrecommended');
  CKBOX('VR_configuration_sentinelleForceServerRead').title = tmp;
  LABEL('VR_configuration_sentinelleForceServerRead', 'sentinelle_forceServerRead').title = tmp;
  // delay de connexion forcee
  BR();
  tmp = i18n('sentinelle_forceServerDelay_warning');
  LABEL('VR_configuration_sentinelleForceServerDelay', 'sentinelle_forceServerDelay').title = tmp;
  INPUT('VR_configuration_sentinelleForceServerDelay').title = tmp;
  TXT('ms');
  // ajout du bloc UBI
  this.subNode.appendChild(div);

  // a gauche
  // bloc MAJ
  div = cE('DIV', {id:'VRcfg_MAJ'});
  FIELDSET('configMAJ');
  TXT('Visceral v.' + VERSION + ' | ');
  node = SPAN('checkForUpdate', null, 'VR_configuration_checkUpdate');
  node.addEventListener('click', doUpdateCheck, true);
  // ajout du bloc MAJ
  this.subNode.appendChild(div);

  // bloc autoopen
  div = cE('DIV', {id:'VRcfg_openOnStart'});
  FIELDSET('configOpenOnStart');
  // openOnStart
  CKBOX('VRcfg_openOnStartReperes');
  LABEL('VRcfg_openOnStartReperes', 'openOnStartReperes');
  CKBOX('VRcfg_openOnStartNotes');
  LABEL('VRcfg_openOnStartNotes', 'openOnStartNotes');
  CKBOX('VRcfg_openOnStartStocks');
  LABEL('VRcfg_openOnStartStocks', 'openOnStartStocks');
  CKBOX('VRcfg_openOnStartMisctools');
  LABEL('VRcfg_openOnStartMisctools', 'openOnStartMisctools');
  // ajout du bloc autoopen
  this.subNode.appendChild(div);

  // generique
  div = cE('DIV', {id:'VRcfg_MAIN'});
  FIELDSET('configGenerique');
  // menuFormat
  LABEL('VRcfg_menuFormat', 'menuFormat');
  TXT(' : ');
  tmp = []; menuFormats = MAINMENU.getMenuFormats();
  for ( i = 0; i < menuFormats.length; i++ ) { tmp.push(new Option(i18n('menuFormat_'+menuFormats[i]), i)); }
  SELECT('VRcfg_menuFormat', tmp);
  // zoom des reperes
  BR();
  LABEL('VR_configuration_zoomReperes', 'zoomRepereSize');
  TXT(' : ');
  SELECT('VR_configuration_zoomReperes', [new Option(i18n('zoomRepere13'), 13), new Option(i18n('zoomRepere35'), 35)]);
  BR();
  SPAN('zoomRepere35Warning', 'VR_small');
  BR();
  LABEL('VRcfg_customLink', 'customLink');
  BR();
  INPUT('VRcfg_customLink');
  // ajout du bloc main
  this.subNode.appendChild(div);

  // bloc sentinelle
  div = cE('DIV', {id:'VRcfg_SENTINELLE'});
  FIELDSET('configSentinelle');
  // close on click
  CKBOX('VR_configuration_sentinelleCloseOnClick');
  LABEL('VR_configuration_sentinelleCloseOnClick', 'sentinelleCloseOnClick');
  // historique
  BR();
  LABEL('VR_configuration_sentinelleHistory', 'sentinelleHistory');
  INPUT('VR_configuration_sentinelleHistory');
  // delay
  BR();
  LABEL('VR_configuration_sentinelleDelay', 'sentinelleRefresh');
  TXT(' : ');
  INPUT('VR_configuration_sentinelleDelay');
  TXT(' ms');
  SPAN('sentinelleNoRefresh', 'VR_small');
  // ajout du bloc sentinelle
  this.subNode.appendChild(div);

  // bloc special chefs
  tmp = H.player.getAllianceChiefType();
  div = cE('DIV', {id:'VRcfg_MAILING'});
  if ( !tmp ) { API.CSS.hide(div); }
  fieldset = FIELDSET('liste_diffusion');
  if ( tmp ) { fieldset.firstChild.innerHTML +=  ' ' +  H.LOCALIZED_STRING_LIST.get('CREATE_MAP_ALERT_' + tmp); }
  tmp = i18n('liste_diffusion_explain');
  LABEL('VRcfg_destinataireMailing', 'liste_diffusion_destinataires').title = tmp;
  INPUT('VRcfg_destinataireMailing').title = tmp;
  // ajout du bloc special chefs
  this.subNode.appendChild(div);

 // bloc addon
 // this.subNode.appendChild(cE('DIV', {id:'VR_configuration_addon'}));

  // buttons
  div = cE('DIV', {className:'VR_buttons'});
  node = cE('SPAN', {className:'VRnon'});
  node.addEventListener('click', this.hide.bind(this), true);
  div.appendChild(node);
  node = cE('SPAN', {className:'VRoui'});
  node.addEventListener('click', oui(this), true);
  // ajout du bloc buttons
  div.appendChild(node);

  this.subNode.appendChild(div);
  plugs.frm(this);
 }
 Window.MANAGER.create('config', { title:i18n('titleConfig'), width:560, height:475, resizeable:false, reduceable:false }, { oncreate:oncreate, onshow:updateValues, onhide:onOpenStarters }).show();
}
function exporter()
{
 var i, k, v, r = null, z = BACKUP.getNullValue(), tbl = BACKUP.getKeysExport();
 oui(false)();
 for ( i = 0; i < tbl.length; i++ )
 {
  k = tbl[i]; v = API.localStorage.value(idScript, k, z);
  if ( v !== z ) { if ( r === null ) { r = {}; } r[k] = encodeURIComponent(v); }
 }
 return r;
}
function importer(datas) { for ( var k in datas ) { if ( datas.hasOwnProperty(k) ) { API.localStorage.set(idScript, k, datas[k]); } } }
function init()
{
 BACKUP.addKeysExport('openOnStartReperes', 'openOnStartNotes', 'openOnStartStocks', 'openOnStartMisctools', 'sentinelle_reload', 'sentinelle_close_on_click', 'zoomReperes',
                      'sentinelle_history', 'sentinelle_forceServerRead', 'sentinelle_forceServerDelay',
                      'menuFormat',
                      'marketBuyPriceWOOD', 'marketBuyPriceORE', 'marketBuyPriceMERCURY', 'marketBuyPriceCRYSTAL', 'marketBuyPriceSULFUR', 'marketBuyPriceGEM',
                      'marketSellPriceWOOD', 'marketSellPriceORE', 'marketSellPriceMERCURY', 'marketSellPriceCRYSTAL', 'marketSellPriceSULFUR', 'marketSellPriceGEM');
}
function plug(frm, show, submit) { plugs.frm = frm; plugs.show = show; plugs.submit = submit; }
return { init:init, open:open, exporter:exporter, importer:importer, updateValues:updateValues, plug:plug };
}());

//**************************
// UBI_SERVER
//**************************
UBI_SERVER = (function(){
var toid, pendingPlayers = [];
function cancel() { if ( toid ) { toid = clearTimeout(toid); } }
function extractPlayers()
{
 function yes(R)
 {
  var tmp = XHR.parse(R), match, k, i, town, xy;
  if ( tmp && 'd' in tmp && typeof tmp.d != 'string' )
  {
   for ( k in tmp.d )
   {
    if ( ( match = /^ProfileFrame([0-9]+)$/.exec(k) ) && 'id' in tmp.d[k] && tmp.d[k].id == match[1] && 'playerName' in tmp.d[k] )
    {
     CACHE.add('Player', match[1], tmp.d[k]);
     CACHE.add('PlayerName', match[1], tmp.d[k].playerName);
     if ( 'allianceName' in tmp.d[k] ) { CACHE.add('AllianceNameFromPlayerId', match[1], tmp.d[k].allianceName); }
     if ( 'cityList' in tmp.d[k] )
     {
      for ( i = 0; i < tmp.d[k].cityList.length; i++ )
      {
       town = tmp.d[k].cityList[i];
       xy = town.x + ',' + town.y;
       CACHE.add('TownName', xy, town.cityName);
       CACHE.add('PlayerIdFromXY', xy, match[1]);
      }
     }
    }
   }
  }
  extractPlayers();
 }
 function cb()
 {
  var i, params=[];
  cancel();
  for ( i = 0; i < pendingPlayers.length; i++ ) { params.push({elementType:'ProfileFrame',elementId:pendingPlayers[i]}); }
  pendingPlayers = [];
  XHR.send({
   method: 'POST',
   url: H.JSON_GETCONTENT_URL,//"http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent",
   data: 'json=' + JSON.stringify({elParamList:params}),
   headers: {
     'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
     'User-Agent':navigator.userAgent
   },
   onload:yes
  });
 }
 cancel();
 if ( pendingPlayers.length > 0 ) { toid = setTimeout(cb, API.localStorage.value(idScript, 'sentinelle_forceServerDelay', 3000)); }
}
function joueur(id)
{
 var name = CACHE.get('PlayerName', id, '');
 if ( name !== '' ) { return name; }
 if ( intval(API.localStorage.value(idScript, 'sentinelle_forceServerRead', 0)) !== 0 ) { pendingPlayers.push(id); extractPlayers(); }
 return i18n('playerId', id);
}
return {joueur:joueur};
}());

//**************************
// DEPLACEMENTS
//**************************
function GOTO(x,y,z)
{
 var id;
 if ( !z ) { z = H.REGION_WORLDMAP_ZOOM_13X13; }
 id = H.getRegionNumberFromXY(x, y);
 lastGotoX = validatePosition(x);
 lastGotoY = validatePosition(y);
// H.worldMap.removeViewsContainingRegion(lastGotoX, lastGotoY);
 if ( lastGotoX && lastGotoY ) { lastRegionX = lastGotoX; lastRegionY = lastGotoY; H.setCurrentView(z, id, lastGotoX, lastGotoY); }
 else { alert(i18n('coordsInvalides')); }
}

//**************************
// SENTINELLE
//**************************
SENTINELLE = (function(){
var tbody, toid, toidfiltres, 
    filtres = { myself:'', myally:'', town:'', coords:'', player:'', ally:'', hero_op:'<=', hero_val:0, townDest_op:'<=', townDest_val:0, townImpact_op:'<=', townImpact_val:0 },
    forcedUpdate = true, boucleAllowed = false, previousSpots = [], nbUpdates = 0,
BLINK = (function(){
var toidb, cur;
function clearToidB() { if ( toidb ) { toidb = clearTimeout(toidb); } }
function off()
{
 var n, A = API, C = A.CSS;
 if ( cur )
 {
  C.remove('blinking', cur);
  n = A.DOM.getById('VR_' + cur);
  if ( n ) { C.remove('blinker', n); }
 }
 cur = null;
 clearToidB();
}
function doInterval()
{
 clearToidB();
 if ( cur )
 {
  API.CSS.toggle(cur, 'blinking');
  toidb = setTimeout(doInterval, 500);
 } else { off(); }
}
function on(E)
{
 var A = API, tmp, t = A.EVT.getParentTarget(E, 'TR');
 if ( t && t.id && (tmp=t.id.substr(3)) && tmp != cur )
 {
  off();
  A.CSS.add('blinker', t);
  cur = tmp;
  doInterval();
 } else { off(); }
 return true;
}
return {on:on,off:off,getCurrent:function() { return cur; }};
}());
function getDelay() { return API.localStorage.value(idScript, 'sentinelle_reload', 5000); }
function updateFiltres()
{
 function cb()
 {
  var k, n, v;
  for ( k in filtres )
  {
   if ( filtres.hasOwnProperty(k) )
   {
    v = '';
    n = gBI('VRSF_'+k);
    if ( n )
    {
     if ( n.nodeName == 'SELECT' ) { filtres[k] = n.options[n.options.selectedIndex].value; }
     else { filtres[k] = n.value; }
     if ( k == 'townDest_val' || k == 'townImpact_val' ) { filtres[k] = intval(filtres[k]); }
    }
   }
  }
  forcedUpdate = true;
  SENTINELLE.update();
 }
 if ( toidfiltres ) { toidfiltres = clearTimeout(toidfiltres); }
 toidfiltres = setTimeout(cb, 1000);
}
function cancelToid() {  if ( toid ) { toid = clearTimeout(toid); } }
function startToid(mult)
{
 var ms = getDelay();
 if ( mult ) { ms = Math.max(ms * 3, 15000); }
 cancelToid();
 if ( boucleAllowed && ms > 0 && Window.MANAGER.isShown('sentinelle') ) { toid = setTimeout(SENTINELLE.update, ms); }
}
function getCurrentHeroPosition(C/*ontent*/)
{
 var M = Math, wS = worldSize, wS2 = wS / 2,
     dur = C.dur, x, y, x1, y1, x2, y2, t, dir, mHM;
 if ( C.type != H.HEROMOVE_HALT_TYPE )
 {
  mHM = C.masterHeroMove;
  x1 = intval(mHM.x1); y1 = intval(mHM.y1);
  x2 = intval(mHM.x2); y2 = intval(mHM.y2);
  dir = getDirection(x1,y1,x2,y2);
  // todo : on devrait pas faire intervernir le getRemoteTime() au lieu du +new Date() ??
  t = C.endDate - (+new Date()/1000);
  x1 = intval(C.x1p);
  y1 = intval(C.y1p);
  x2 = M.abs(C.x2p - x1);
  y2 = M.abs(C.y2p - y1);
  if ( x2 > wS2 ) { x2 = wS - x2; }
  if ( y2 > wS2 ) { y2 = wS - y2; }
  x = (x1 + (dir.x * x2 * (dur - t) / dur) + wS - 1) % wS + 1;
  y = (y1 + (dir.y * y2 * (dur - t) / dur) + wS - 1) % wS + 1;
 }
 else { x = intval(C.x1p); y = intval(C.y1p); }
 return {x:x,y:y};
}
function updateSentinelle()
{
 var i, row, cell, node, aName, pName, isOwnSource, isOwnCible, rupture, tmp, idx, x, y, cellPreviousSpots, curPos, pool, all, title,
     nameSource, nameCible, regionSource, regionCible, xS, yS, xC, yC, idS, idC, id, content, mHM, moves, moveLine, palier,
     odd = true, cVX = getCurrentX(), cVY = getCurrentY();
 function typeToTitle(type)
 {
  switch ( type )
  {
   case 'M':return i18n('HeroMoveToTarget');
   case 'T':return i18n('HeroMoveToHalt');
   case 'H':return i18n('HeroMoveHalt');
   default:return i18n('HeroMoveUnknown', type);
  }
 }
 function getContent(R/*egion*/, P/*rop*/, D/*ef*/) { return R && 'content' in R && P in R.content ? R.content[P] : D; }
 function autoClose() { if ( API.localStorage.value(idScript, 'sentinelle_close_on_click', 0) == 1 ) { Window.MANAGER.close('sentinelle'); } }
 function openProfile(id) { return function() { autoClose(); H.openPlayerProfileFrame(id); }; }
 function openXY(x,y) { return function() { autoClose(); GOTO(x,y); }; }
 function filtrer(tbl)
 {
  var add, i, j, move, x,y,f,match, op, tmp, r = [], pId = playerId, aName = allianceName;
  for ( i = 0; i < tbl.length; i++ )
  {
   add = true;
   move = tbl[i];
   if ( (f=filtres.myself) )
   {
    if ( f == 'only' ) { add = pId == move.pId; }
    else if ( f == 'except' ) { add = pId != move.pId; }
   }
   if ( add && (f=filtres.myally) )
   {
    if ( MY_ALLY.isDefined() )
    {
     if ( f == 'only' ) { add = MY_ALLY.is(move.pId); }
     else { add = !MY_ALLY.is(move.pId); }
    }
    else if ( 'aName' in move )
    {
     if ( f == 'only' ) { add = aName == move.aName; }
     else if ( f == 'except' ) { add = aName != move.aName; }
    }
    else { add = false; }
   }
   if ( add && (f=filtres.town) )
   {
    tmp = f.split(';');
    op = false;
    for ( j = 0; j < tmp.length; j++ )
    {
     f = tmp[j].toLowerCase().trim();
     if ( f )
     {
      if ( 'nameSource' in move ) { op = op || move.nameSource.toLowerCase().indexOf(f) != -1; }
      if ( 'nameCible' in move ) { op = op || move.nameCible.toLowerCase().indexOf(f) != -1; }
     }
    }
    add = op;
   }
   if ( add && (f=filtres.player) )
   {
    op = false;
    if ( move.pName )
    {
     tmp = f.split(';');
     for ( j = 0; j < tmp.length; j++ ) { if ( (f=tmp[j].toLowerCase().trim()) ) { op = op || move.pName.toLowerCase().indexOf(f) != -1; } }
    }
    add = op;
   }
   if ( add && (f=filtres.ally) )
   {
    op = false;
    if ( move.aName )
    {
     tmp = f.split(';');
     for ( j = 0; j < tmp.length; j++ ) { if ( (f=tmp[j].toLowerCase().trim()) ) { op = op || move.aName.toLowerCase().indexOf(f) != -1; } }
    } else { op = false; }
    add = op;
   }
   if ( add && (f=filtres.townDest_val) && f>0 )
   {
    op = filtres.townDest_op;
    tmp = getDistance(move.cVX,move.cVY,move.xC,move.yC,1);
    if ( op == '<=' ) { add = tmp <= f; }
    else { add = tmp >= f; }
   }
   if ( add && (f=filtres.townImpact_val) && f>0 )
   {
    op = filtres.townImpact_op;
    if ( op == '<=' ) { add = move.impactDist <= f; }
    else { add = move.impactDist >= f; }
   }
   if ( add && (f=filtres.hero_val) && f>0 )
   {
    op = filtres.hero_op;
    if ( op == '<=' ) { add = move.actionDist <= f; }
    else { add = move.actionDist >= f; }
   }
   if ( add && (f=filtres.coords) )
   {
    tmp = f.split(';');
    op = false; 
    for ( j = 0; j < tmp.length; j++ )
    {
     f = tmp[j].toLowerCase().trim();
     if ( f && (match=f.match(regCoords)) )
     {
      x = intval(match[1]); y = intval(match[2]);
      if (   ( x === intval(move.xS) && y === intval(move.yS) )
          || ( x === intval(move.xC) && y === intval(move.yC) )
          || ( x === intval(move.x) && y === intval(move.y) )
          || ( x === intval(move.x2) && y === intval(move.y2) ) )
      {
       op = true;
       break;
      }
     }
    }
    add = op;
   }
   if ( add ) { r.push(move); }
  }
  return r.sort(function(a,b){ return (a.endDate - b.endDate); });
 }
 cancelToid();
 if ( !Window.MANAGER.get('sentinelle').isShown() ) { return; }
 if ( Window.MANAGER.get('sentinelle').isReduced() ) { return; }
 if ( !tbody ) { startToid(); return; }
 if ( !forcedUpdate && (nbUpdates++<10) ) { startToid(true); return; }
 forcedUpdate = false;
 nbUpdates = 0;
 API.DOM.flush(API.CSS.hide(tbody));

 if ( typeof cVX == 'number' && typeof cVY == 'number' && cVX && cVY )
 {
  tmp = cVX+','+cVY;
  idx = previousSpots.indexOf(tmp);
  if ( idx != -1 ) { previousSpots.splice(idx,1); }
  previousSpots.push(tmp);
  if ( previousSpots.length > API.localStorage.value(idScript, 'sentinelle_history', 5) ) { previousSpots.splice(0,1); }
 }

 all = [];
 if ( (pool=H.elementPool.get('HeroMove')) ) { pool.each(function(m,k) { all.push(m); }); }

 moves = [];
 for ( i = 0; i < all.length; i++ )
 {
  moveLine = {};
  content = all[i].content;
  mHM = content.masterHeroMove;
  curPos = getCurrentHeroPosition(content);
  id = mHM.playerId;
  //source
  //+0.5 pour les arrondis parce que la position en fonction du centre de la case
  xS = intval(mHM.x1+0.5); yS = intval(mHM.y1+0.5);
  tmp = xS + ',' + yS;
  regionSource = H.getRegionFromXY(xS,yS);
  nameSource = getContent(regionSource, 'cN', CACHE.get('TownName', tmp, ''));
  if ( nameSource ) { CACHE.add('TownName', tmp, nameSource); } else { nameSource = '('+tmp+')'; }
  idS = getContent(regionSource, 'pId', 0);
  if ( !idS ) { idS = CACHE.get('PlayerIdFromXY', tmp, 0); }
  isOwnSource = '';
  if ( idS )
  {
   isOwnSource = 'isNotOwn';
   if ( idS == id ) { isOwnSource = 'isOwn'; }
  }
  //cible
  //+0.5 pour les arrondis parce que la position en fonction du centre de la case
  xC = intval(mHM.x2+0.5); yC = intval(mHM.y2+0.5);
  tmp = xC + ',' + yC;
  regionCible = H.getRegionFromXY(xC,yC);
  nameCible = getContent(regionCible, 'cN', CACHE.get('TownName', tmp, ''));
  if ( nameCible ) { CACHE.add('TownName', tmp, nameCible); } else { nameCible = '('+tmp+')'; }
  idC = getContent(regionCible, 'pId', 0);
  if ( !idC ) { idC = CACHE.get('PlayerIdFromXY', tmp, 0); }
  isOwnCible = '';
  if ( idC )
  {
   isOwnCible = 'isNotOwn';
   if ( idC == id ) { isOwnCible = 'isOwn'; }
  }
  pName = CACHE.get('PlayerName', id, '');
  aName = CACHE.get('AllianceNameFromPlayerId', id, '');
  if ( !pName && id )
  {
   tmp = null;
   if ( idS == id ) { tmp = regionSource; } else if ( idC == id ) { tmp = regionCible; }
   if ( tmp )
   {
    pName = getContent(tmp, 'pN');
    if ( pName ) { CACHE.add('PlayerName', id, pName); }
   }
  }
  if ( !pName ) { forcedUpdate = true; pName = UBI_SERVER.joueur(id); }
  if ( !aName && id )
  {
   tmp = null;
   if ( idS == id ) { tmp = regionSource; } else if ( idC == id ) { tmp = regionCible; }
   if ( tmp )
   {
    aName = getContent(tmp, 'iAN');
    if ( aName ) { CACHE.add('AllianceNameFromPlayerId', id, aName); }
    else { forcedUpdate = true; }
   }
  }
  moveLine =
  {
   type:content.type, obj:all[i], HeroMoveId:content.masterHeroMoveId,
   cVX:cVX, cVY:cVY,
   pId:id, pName:pName, aName:aName,
   idS:idS, xS:xS, yS:yS, nameSource:nameSource, isOwnSource:isOwnSource,
   idC:idC, xC:xC, yC:yC, nameCible:nameCible, isOwnCible:isOwnCible,
   actionDir:getDirectionTexte(cVX,cVY,curPos.x,curPos.y),
   actionDist:getDistance(cVX,cVY,curPos.x,curPos.y,1),
   startDate:mHM.startDate,
   endDate:mHM.endDate,
   color:content.color,
   x:curPos.x, y:curPos.y,
   impactDir:0, impactDist:0,
   x2:0,y2:0
  };

  if ( content.type == H.HEROMOVE_MOVE_TO_HALT_TYPE )
  {
  //+0.5 pour les arrondis parce que la position en fonction du centre de la case
   moveLine.x2 = parseFloat(content.x2p+0.5);
   moveLine.y2 = parseFloat(content.y2p+0.5);
  }
  else
  {
   moveLine.x2 = xC;
   moveLine.y2 = yC;
  }
  moveLine.impactDist = getDistance(curPos.x,curPos.y,moveLine.x2,moveLine.y2,1);
  moveLine.impactDir = getDirectionTexte(curPos.x,curPos.y,moveLine.x2,moveLine.y2);
  moves.push(moveLine);
 }
 moves = filtrer(moves);
 row = tbody.insertRow(-1);
 row.className = 'previousSpots';
 cellPreviousSpots = row.insertCell(-1);
 cellPreviousSpots.colSpan = 15;
 for ( i = 0; i < moves.length; i++ )
 {
  tmp = H.DateUtils.timestampToString(moves[i].endDate, H.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING);
  if ( tmp != rupture )
  {
   rupture = tmp; odd = true;
   row = tbody.insertRow(-1); row.className = 'title';
   cell = row.insertCell(-1); cell.colSpan = 15; cell.innerHTML = tmp;
  }
  odd = !odd;
  tmp = moves[i].obj.mainElementId;
  row = tbody.insertRow(-1); row.id = 'VR_' + tmp;
  if ( BLINK.getCurrent() == tmp ) { row.className = 'blinker'; }
  if ( odd ) { API.CSS.add('odd', row); }
//  x = cVX; y = cVY;
  cell = row.insertCell(-1);
  cell.addEventListener('click', BLINK.on, true);
  if ( moves[i].actionDist > 0 )
  {
   cell.className = 'VR_dir'; cell.appendChild(cE('DIV', {className:'dir' + moves[i].actionDir}));
   cell.title = i18n('detailDistance', moves[i].pName, moves[i].actionDist, directionToFull(moves[i].actionDir), CACHE.get('TownName', intval(moves[i].cVX)+','+intval(moves[i].cVY), ''), intval(moves[i].cVX), intval(moves[i].cVY));
   palier = moves[i].actionDist > 140 ? 140 :
            moves[i].actionDist > 100 ? 100 :
            moves[i].actionDist > 50  ? 50 :
            moves[i].actionDist > 25 ? 25 : 0;
   API.CSS.add('VRdistPalier' + palier, row);
  }
  cell = row.insertCell(-1); cell.style.textAlign = 'right'; cell.innerHTML = H.DateUtils.timestampToString(moves[i].endDate, H.DATEUTILS_TIME_FORMAT_DATE_HMS) + ' (#' + moves[i].HeroMoveId + ')';
  cell.addEventListener('click', BLINK.on, true);
  node = setSprite(cE('DIV'), 'HeroMove', 'HERO_REGION_MOVE_BIG_PLOT_COLOR_' + moves[i].color);
  cell = row.insertCell(-1); cell.appendChild(node); if ( moves[i].aName ) { cell.title = moves[i].aName; } else { cell.title = 'alliance inconnue'; }
  cell.addEventListener('click', BLINK.on, true);
  cell = row.insertCell(-1); if ( moves[i].aName ) { cell.appendChild(cTN(moves[i].aName)); }
  cell = row.insertCell(-1); cell.className = 'clickable'; cell.innerHTML = moves[i].pName; cell.addEventListener('click', openProfile(moves[i].pId), true);
  x = intval(moves[i].x); y = intval(moves[i].y);
  cell = row.insertCell(-1); cell.innerHTML = i18n('sentinelle_posCur');
  cell = row.insertCell(-1); cell.className = 'clickable'; cell.innerHTML = cell.title = '('+x+','+y+')'; cell.addEventListener('click', openXY(x,y), true);
  cell = row.insertCell(-1); cell.innerHTML = i18n('sentinelle_posFrom');
  cell = row.insertCell(-1); cell.className = 'clickable '+moves[i].isOwnSource; cell.innerHTML = ' ' + moves[i].nameSource+' ('+H.DateUtils.timestampToString(moves[i].startDate, H.DATEUTILS_TIME_FORMAT_DATE_HMS)+')'; cell.title = '('+moves[i].xS+','+moves[i].yS+')'; cell.addEventListener('click', openXY(moves[i].xS,moves[i].yS), true);
  cell = row.insertCell(-1); cell.innerHTML = i18n('sentinelle_posTo');
  cell = row.insertCell(-1); cell.className = 'clickable '+moves[i].isOwnCible; cell.innerHTML = ' ' + moves[i].nameCible; cell.title = '('+moves[i].xC+','+moves[i].yC+')'; cell.addEventListener('click', openXY(moves[i].xC,moves[i].yC), true);
  cell = row.insertCell(-1);
  if ( moves[i].type == H.HEROMOVE_MOVE_TO_HALT_TYPE || moves[i].type == H.HEROMOVE_HALT_TYPE )
  {
   node = cE('DIV');
   x = intval(moves[i].x); y = intval(moves[i].y);
   if ( moves[i].type == H.HEROMOVE_MOVE_TO_HALT_TYPE )
   {
    x = intval(moves[i].x2); y = intval(moves[i].y2);
    setSprite(node, 'HeroMove', 'HALT_MOVE_ZOOM1_COLOR_' + moves[i].color); node.style.height = '9px'; node.style.margin = 'auto';
   }
   else { setSprite(node, 'HeroMove', 'HALT_ZOOM1_COLOR_' + moves[i].color); node.style.height = '18px'; }
   cell.appendChild(node); cell.title = typeToTitle(moves[i].type); cell.style.cursor = 'pointer';
   cell.addEventListener('click', moves[i].obj.onHaltClick.bind(moves[i].obj), true);
   cell = row.insertCell(-1);
   cell.innerHTML = '('+x+','+y+')';
   cell.className = 'clickable';
   cell.addEventListener('click', openXY(x,y), true);
  }
  else { cell.colSpan = 2; cell.innerHTML = ''; }

  cell = row.insertCell(-1);
  if ( moves[i].impactDist > 0 )
  {
   title = i18n('sentinelleHeroMoveTo', moves[i].pName, moves[i].impactDist, directionToFull(moves[i].impactDir), CACHE.get('TownName', intval(moves[i].x)+','+intval(moves[i].y), ''), intval(moves[i].x), intval(moves[i].y), CACHE.get('TownName', intval(moves[i].x2)+','+intval(moves[i].y2), ''), intval(moves[i].x2), intval(moves[i].y2));
   cell.className = 'VR_dir'; cell.appendChild(cE('DIV', {className:'dir' + moves[i].impactDir})); cell.title = title;
   cell = row.insertCell(-1); cell.style.width = '100%'; cell.title = title;
   cell.innerHTML = i18n('sentinelleDistance', moves[i].impactDist);
  }
  else { cell.colSpan = 2; }
 }
 if ( moves.length <= 0 )
 {
  row = tbody.insertRow(-1);
  cell = row.insertCell(-1);
  cell.colSpan = 15;
  cell.innerHTML = 'Aucun mouvement detecte';
 }
 for ( i = previousSpots.length; i--; )
 {
  tmp = previousSpots[i];
  pName = CACHE.get('TownName', tmp, '');
  if ( pName === '' )
  {
   pName = tmp.split(',');
   x = pName[0]; y = pName[1];
   pName = H.getRegionFromXY(x,y);
   pName = pName && 'content' in pName && 'cN' in pName.content ? pName.content.cN : '';
   if ( pName !== '' ) { CACHE.add('TownName', tmp, pName); }
  }
  if ( pName === '' ) { pName = '('+tmp+')'; }
  tmp = tmp.split(','); x = tmp[0]; y = tmp[1];
  tmp = cE('SPAN', {innerHTML:pName, title:'('+x+','+y+')'});
  tmp.addEventListener('click', openXY(x,y), true);
  cellPreviousSpots.appendChild(tmp);
  if ( i > 0 ) { cellPreviousSpots.appendChild(cTN(' | ')); }
 }
 API.CSS.show(tbody);
 startToid();
}
function clearFilters()
{
 var k, n;
 for ( k in filtres ) { if ( filtres.hasOwnProperty(k) ) { if ( (n=gBI('VRSF_'+k)) ) { if ( n.nodeName == 'SELECT' ) { n.options.selectedIndex = 0; } else { n.value = ''; } } } }
 updateFiltres();
}
function createWin()
{
 function reloadState(N/*ode*/, S/*tate*/)
 {
  var cN = S ? 'off' : 'on', n = API.DOM.getById(N);
  n.title = i18n('toggleSentinelle_'+cN);
  n.className = cN;
  return N;
 }
 function createFilters()
 {
  var tbl, tb, row, i, k, title, lbl, node,
      opts = ['myally','myself','town','','coords', 'townDest', 'player','hero','ally','townImpact'];
  function cell(colSpan, node) { var c = row.insertCell(-1); c.colSpan = colSpan; c.appendChild(node); return c; }
  tbl = cE('TABLE', {id:'VRSentFiltres', border:0,cellSpacing:0,cellPadding:0});
  tb = cE('TBODY');
  tbl.appendChild(tb);
  for ( i = 0; i < opts.length; i++ )
  {
   k = 'sentFiltre_' + opts[i];
   lbl = i18n(k);
   title = i18n(k+'_title');
   if ( i%2===0 ) { row = tb.insertRow(-1); }
   switch ( opts[i] )
   {
    case 'myself':
	// vatokato Modify start
     node = cE('SELECT', {id:'VRSF_myself', title:title, childs:[new Option('',''), new Option(i18n('onlyMe'),'only'), new Option(i18n('exceptMe'),'except')]});
	// vatokato Modify end
     node.addEventListener('change', updateFiltres, true);
     cell(1, cE('LABEL', {htmlFor:'VRSF_myself', title:title, innerHTML:lbl}));
     cell(3, node);
    break;
    case 'myally':
	// vatokato Modify start
     node = cE('SELECT', {id:'VRSF_myally', title:title, childs:[new Option('',''), new Option(i18n('onlyAly'),'only'), new Option(i18n('exceptAly'),'except')]});
	// vatokato Modify end
     node.addEventListener('change', updateFiltres, true);
     cell(1, cE('LABEL', {htmlFor:'VRSF_myally', title:title, innerHTML:lbl}));
     cell(3, node);
    break;
    case 'player':
    case 'town':
    case 'ally':
    case 'coords':
     node = cE('INPUT', {id:'VRSF_'+opts[i], title:title, type:'text', value:''});
     node.addEventListener('keyup', updateFiltres, true);
     cell(1, cE('LABEL', {htmlFor:'VRSF_'+opts[i], title:title, innerHTML:lbl}));
     cell(3, node);
    break;
    case 'townDest':
    case 'townImpact':
    case 'hero':
     cell(1, cE('LABEL', {id:'VRSF_label_'+opts[i],htmlFor:'VRSF_'+opts[i], title:title, innerHTML:lbl}));
     node = cE('SELECT', {id:'VRSF_'+opts[i]+'_op', title:title, childs:[new Option('<=', '<='),new Option('>=', '>=')]});
     node.addEventListener('change', updateFiltres, true);
     cell(1, node);
     node = cE('INPUT', {id:'VRSF_'+opts[i]+'_val', title:title, type:'text', value:''});
     node.addEventListener('keyup', updateFiltres, true);
     cell(1, node);
	 // vatokato Modify start
     cell(1, cTN(i18n('regions')));
	 // vatokato Modify end
    break;
   }
  }
  return API.CSS.hide(tbl);
 }
 function oncreate()
 {
  var node;
  function clickTitle(E)
  {
   var stop = false, EVT = API.EVT, t = EVT.getTarget(E);
   if ( t && t.id )
   {
    if ( t.id == 'VRSentReload' ) { SENTINELLE.update(); stop = true; }
    else if ( t.id == 'VRSentToggle' )
    {
     boucleAllowed = !boucleAllowed;
     reloadState(t, boucleAllowed);
     SENTINELLE.update();
     stop = true;
    }
    else if ( t.id == 'VRSentFilter' )
    {
     API.CSS.toggle('VRSentFiltres');
     t.title = i18n(API.CSS.isShown('VRSentFiltres') ? 'hideFilters' : 'showFilters');
     stop = true;
    }
    else if ( t.id == 'VRSentFilterClear' ) { clearFilters(); stop = true; }
   }
   if ( stop ) { return EVT.stop(E); }
   return true;
  }
  boucleAllowed = getDelay() > 0;
  this.titleNode.appendChild(cE('SPAN', {id:'VRSentReload', title:i18n('actualiser')}));
  this.titleNode.appendChild(reloadState(cE('SPAN', {id:'VRSentToggle'}), boucleAllowed));
  this.titleNode.appendChild(cE('SPAN', {id:'VRSentFilter', title:i18n('showFilters')}));
  this.titleNode.appendChild(cE('SPAN', {id:'VRSentFilterClear', title:i18n('clearFilters')}));
  this.titleNode.addEventListener('click', clickTitle, true);
  this.subNode.appendChild(createFilters());
  node = cE('TABLE', { id:'VRSentMouvements', cellSpacing:0, cellPadding:0});
  tbody = cE('TBODY');
  node.appendChild(tbody);
  this.subNode.appendChild(node);
 }
 function onhide() { BLINK.off(); cancelToid(); }
 Window.MANAGER.create('sentinelle', { title:i18n('titleSentinelle'), width:600,height:500 }, { oncreate:oncreate, onshow:SENTINELLE.update, onreduce:cancelToid, onexpand:SENTINELLE.update, onhide:onhide }).show();
}
function toggle()
{
 var M = Window.MANAGER, w = M.get('sentinelle');
 if ( w ) { w.toggle(); } else { createWin(); }
}
function forceUpdate() { forcedUpdate = true; startToid(); }
return {toggle:toggle,getCurrentHeroPosition:getCurrentHeroPosition,update:updateSentinelle,forceUpdate:forceUpdate};
}());

//**************************
// NOTES tmpnotes
//**************************
NOTES = (function(){
var toid;
function cancel() { if ( toid ) { toid = clearTimeout(toid); } }
function save()
{
 var n = gBI('VR_notes');
 cancel();
 if ( n ) { API.localStorage.set(idScript,'notes'+worldId, n.value); }
}
function delay() { cancel(); toid = setTimeout(save, 1000); }
function update()
{
 var v = API.localStorage.value(idScript,'notes'+worldId, ''), n = gBI('VR_notes');
 if ( n ) { n.value = v; }
}
function show()
{
 function oncreate()
 {
  var n = cE('TEXTAREA', {id:'VR_notes', value:API.localStorage.value(idScript,'notes'+worldId, '')});
  n.addEventListener('keyup', delay, true);
  n.addEventListener('blur', save, true);
  this.subNode.appendChild(n);
 }
 Window.MANAGER.create('blocnote', { title:i18n('titleBlocNote'), width:150, height:200, resizeable:true }, { oncreate:oncreate }).show();
}
function toggle()
{
 var M = Window.MANAGER, win = M.get('blocnote');
 if ( win ) { win.toggle(); } else { show(); }
}
return {update:update,toggle:toggle,show:show};
}());


//**************************
// GRAB tmpgrab
//**************************
GRAB = (function(){
function update()
{
	var n = gBI('VR_Grab');
	var tmp;
	var all, txt, day, hour, nic, city, target, val, time, totaltime = 0;		
	all = API.localStorage.value(idScript,'grab'+worldId, []);
	all.reverse();
	if ( n )
	{
		var t = cE('table', {className:'VR_Grab_table'});		
		var th1=cE('th', {innerHTML:'', width:'20'});
		var th2=cE('th', {innerHTML:'Цель'});
		var th3=cE('th', {innerHTML:'Город'});
		var th4=cE('th', {innerHTML:'Герой'});
		var th5=cE('th', {innerHTML:'Добыча'});
		var th6=cE('th', {innerHTML:'Восстановление'});					
		t.appendChild(cE('tr', {childs:[th1,th2,th3,th4,th5,th6]}));
		
		tmp=all.length;
		for ( i = 0; i < all.length; i++ )
		{
			tmp--;
			d=cE('span', {className:'del', title:'удалить', alt:'VR_Grab_row_'+tmp});
			d.addEventListener('click', function(){delEntry(this)}, true);
			
			var td1=cE('td', {childs:[d]});
			var td2=cE('td', {innerHTML:all[i].target});
			var td3=cE('td', {innerHTML:'<b>'+all[i].city+'</b>'});
			var td4=cE('td', {innerHTML:all[i].nic});
			var td5=cE('td', {innerHTML:all[i].val});
			var td6=cE('td', {innerHTML:all[i].totaltime});			

			var tr = cE('tr', {id:'VR_Grab_row_'+tmp, childs:[td1,td2,td3,td4,td5,td6]});
			t.appendChild(tr);			
		}
	}
	n.innerHTML='';
	n.appendChild(t);
}

function addEntry()
{
	var a = API.localStorage.value(idScript,'grab'+worldId, []);
	if(a=='') a=new Array();
	
	var day=gBI('dayi').value;
	var hour=gBI('houri').value;
	var time=gBI('timei').value;
	
	var nic=gBI('nici').value;
	var city=gBI('cityi').value;
	var target=gBI('targeti').value;	
	var val=gBI('vali').value;	
	var totaltime = setT(hour,time,day);
	
	a.push({nic:nic,city:city,target:target,val:val,totaltime:totaltime});
	API.localStorage.set(idScript,'grab'+worldId, a);
	update();
}
function getT(t) {			
	t[0] ? t['h']=parseInt(t[0],10)*3600 	: t['h']=0;
	t[1] ? t['m']=parseInt(t[1],10)*60 		: t['m']=0;
	t[2] ? t['s']=parseInt(t[2],10) 		: t['s']=0;			
	return t['h']+t['m']+t['s']; // время в секундах 
}
function setT(hour,time,day) {
	var ttime = new Array();
	ttime[0]=hour.split(/\D/);
	ttime[1]=time.split(/\D/);
	ttime['start']=	getT(ttime[0]);
	ttime['tmp']=	getT(ttime[1]);
	t=ttime['start']+ttime['tmp'];
	
	d=Math.floor(t/86400);
	t-=86400*d;	
	h=Math.floor(t/3600);	
	t-=3600*h;	
	m=Math.floor(t/60);			
	s=t-60*m;
	if(h<10){h='0'+h} 
	if(m<10){m='0'+m}	
	if(s<10){s='0'+s}
	d= (d>0) ? '+'+d+'д.' : '';
	return day+' '+d+' '+h+':'+m+':'+s;
}

function delEntry(obj)
{
	var index=obj.alt.replace('VR_Grab_row_', '');
	var a = API.localStorage.value(idScript,'grab'+worldId, []); 
	a.splice(index, 1); 
	API.localStorage.set(idScript,'grab'+worldId, a);	
	update();
}

function showEntry()
{
	// кнопка сохранить
	var n=gBI('VR_grab_show');
	var	sub = cE('INPUT', {type:'submit', value:''});	
	sub.addEventListener('click', addEntry, false);
	
	var day = gBI('dayi').value;
	var day = day.replace('/', '.');
	var hour = gBI('houri').value;
	var nic = gBI('nici').value;
	var city = gBI('cityi').value;
	var target = gBI('targeti').value;
	var val = gBI('vali').value;
	var time = gBI('timei').value;	
	var totaltime = setT(hour,time,day);
	
	var s = cE('span', {id:'VR_grab_show_text', innerHTML:target+' (<b>'+city+'</b> - '+nic+'). Добыча '+val+'. Будет восстановлена '+totaltime, childs:[sub]});
	var s2 = cE('span', {id:'VR_grab_show_text2', innerHTML:'<br/>'+target+'. Будет восстановлена '+totaltime});

	if ( n ) { 
		n.innerHTML='';
		n.appendChild(s); 
		n.appendChild(s2); 
	}
}

function show()
{
 function oncreate()
 {
	var	dayn = cE('span', {innerHTML: 'День: '});
	var	dayi = cE('INPUT', {id:'dayi', type:'text', value:'01/01', size:'2'});
	dayi.addEventListener('keyup', showEntry, true);
	dayi.addEventListener('focus', function () {this.select()}, true);
	dayi.addEventListener('click', function () {this.select()}, true);
	
	var	hourn = cE('span', {innerHTML: ' Час: '});
	var	houri = cE('INPUT', {id:'houri', type:'text', value:'00:00', size:'2'});
	houri.addEventListener('keyup', showEntry, true);
	houri.addEventListener('focus', function () {this.select()}, true);
	houri.addEventListener('click', function () {this.select()}, true);
	
	var	nicn = cE('span', {innerHTML: ' Ник: '});
	var	nici = cE('INPUT', {id:'nici', type:'text', value:'Герой', size:'10'});
	nici.addEventListener('keyup', showEntry, true);
	nici.addEventListener('focus', function () {this.select()}, true);
	nici.addEventListener('click', function () {this.select()}, true);
	
	var	cityn = cE('span', {innerHTML: ' Город: '});
	var	cityi = cE('INPUT', {id:'cityi', type:'text', value:'Город', size:'10'});
	cityi.addEventListener('keyup', showEntry, true);
	cityi.addEventListener('focus', function () {this.select()}, true);
	cityi.addEventListener('click', function () {this.select()}, true);
	
	var	targetn = cE('span', {innerHTML: ' Цель: '});
	var	targeti = cE('INPUT', {id:'targeti', type:'text', value:'Золотая шахта', size:'10'});
	targeti.addEventListener('keyup', showEntry, true);
	targeti.addEventListener('focus', function () {this.select()}, true);
	targeti.addEventListener('click', function () {this.select()}, true);
	
	var	valn = cE('span', {innerHTML: ' Добыча: '});
	var	vali = cE('INPUT', {id:'vali', type:'text', value:'10000', size:'3'});
	vali.addEventListener('keyup', showEntry, true);
	vali.addEventListener('focus', function () {this.select()}, true);
	vali.addEventListener('click', function () {this.select()}, true);
	
	var	timen = cE('span', {innerHTML: ' Время: '});
	var	timei = cE('INPUT', {id:'timei', type:'text', value:'24:00', size:'2'});
	timei.addEventListener('keyup', showEntry, true);
	timei.addEventListener('focus', function () {this.select()}, true);
	timei.addEventListener('click', function () {this.select()}, true);

	// контейнер с формой и примером
	var p = cE('div', {id:'VR_grab_show', innerHTML:''});
	var f = cE('div', {id:'VR_grab_form', childs:[dayn,dayi,hourn,houri,nicn,nici,cityn,cityi,targetn,targeti,valn,vali,timen,timei,p]});

	// контейнер для таблицы
	var c = cE('div', {id:'VR_Grab', innerHTML:''});
	
	//Все это вставляем
	this.subNode.appendChild(cE('DIV', {id:'VR_Graber', childs:[f,c]}));
 }	
 Window.MANAGER.create('graber', { title:i18n('titleGraber'), width:150, height:200, resizeable:true }, { oncreate:oncreate, onshow:update }).show();
}
function toggle()
{
 var M = Window.MANAGER, win = M.get('graber');
 if ( win ) { win.toggle(); } else { show(); }
}
return {update:update,toggle:toggle,show:show};
}());


//**************************
// HEROMOVE
//**************************
HEROMOVE = (function(){
var shown = true;
function toggle()
{
 shown = !shown;
 API.CSS[shown?'remove':'add']('cacher_heromovebig', document.body);
}
function init()
{
 function cb(retour,X,Y)
 {
  var i, e, x, y, z = this.getParentElement().zoomLevel, w = this.worldSize, w2 = w / 2, all = this.plotList[z], length = all.length, CSS = API.CSS;
  for ( i = 0; i < length; i++)
  {
   e = all[i];
   CSS.remove('VR_heroMove_big', e.element);
   x = X; y = Y;
   if ( (e.x - X) > w2 ) { x += w; } else if ( (X - e.x) > w2 ) { x -= w; }
   if ( (e.y - Y) > w2 ) { y += w; } else if ( (Y - e.y) > w2 ) { y -= w; }
   if (((this.xDir >= 0 && x >= e.x) || (this.xDir <= 0 && x <= e.x)) && ((this.yDir >= 0 && y >= e.y) || (this.yDir <= 0 && y <= e.y)))
   {
    CSS.add('VR_heroMove_big', e.element);
   }
  }
  return retour;
 }
 H.HeroMove.prototype.updatePlotSize = API.injectAfter(H.HeroMove.prototype.updatePlotSize, cb);
}
return {init:init,toggle:toggle};
}());

//**************************
// MAILER
//**************************
MAILER = (function(){
function cbAddFilter(R)
{
 var input, filtrer, vider, me = this, child = me.getChildElement('ToolBar');
 function filterNow(me, val)
 {
  var i, container, all = [], child = me.currentMessageListSlider.contentElement;
  if ( child )
  {
   val = (''+val.toUpperCase()).replace(/^\s+|\s+$/g, '');
   container = API.whitespace.firstChild(child);
   child = container.childNodes;
   for ( i = child.length; i--; ) { if ( child[i].nodeType === document.ELEMENT_NODE && child[i].tagName == 'DIV' ) { all.push(child[i]); } }
   for ( i = all.length; i--; ) { if ( val === '' || all[i].textContent.toUpperCase().indexOf(val) != -1 ) { API.CSS.show(all[i]); } else { API.CSS.hide(all[i]); } }
  }
 }
 if ( child )
 {
  input = cE('INPUT', {type:'text', value:''});
  // vatokato Modify start
  filtrer = cE('SPAN', {innerHTML:i18n('mailFiltrer')});
  filtrer.addEventListener('click', function(){ var n = this.previousSibling; filterNow(me, n.value); }, true);
  vider = cE('SPAN', {innerHTML:i18n('mailVider')});
   // \vatokato Modify end
  vider.addEventListener('click', function(){ var n = this.parentNode.firstChild; n.value = ''; filterNow(me, ''); }, true);
  child.appendChild(cE('DIV', {id:'VR_mailerFiltre', childs:[input,filtrer,cTN('|'),vider]}));
 }
//  API.dump(this.categoryExclusiveFilter,'categoryExclusiveFilter');
 return R;
}
function getDestinatairesCfg()
{
 var i, tmp = API.localStorage.value(idScript, 'recipientMailing', []);
 for ( i = tmp.length; i--; ) { if ( tmp[i] && tmp[i].world == worldId ) { return tmp[i].recipient; } }
 return '';
}
function cbAddToRecipient(R)
{
 var v,n;
 if ( this.recipientListCheckBox && H.player.getAllianceChiefType() && (n=this.newMessageRecipientField) && (v=getDestinatairesCfg()) && (typeof v == 'string') && v !== '' )
 {
  n.value = v+';'+n.value;
  // TODO : pas la bonne de methode de uncheck le .recipientListCheckBox
  this.recipientListCheckBox.checked = false;
 }
 return R;
}

function cbRemoveContentSpam(R)
{
 var i, html, b, map;
 if ( (b=this.getChildElement("Content")) )
 {
  map = [/>([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2} De :[\u0000-\uFFFF]+?)(<br>A : [\u0000-\uFFFF]+?<br>Sujet :[\u0000-\uFFFF]+?)<br>/g,
         />([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2} From: [\u0000-\uFFFF]+?)(<br>To: [\u0000-\uFFFF]+?<br>Subject: [\u0000-\uFFFF]+?)<br>/g,
         />([0-9]{1,2}\/[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2} Von:[\u0000-\uFFFF]+?)(<br>An: [\u0000-\uFFFF]+?<br>Betreff: [\u0000-\uFFFF]+?)<br>/g];
  html = (''+b.innerHTML).replace(/------------------------------<br>/g, '<br><hr style="clear:none;border-top:1px solid #666">');
  for ( i = 0; i < map.length; i++ ) { html = html.replace(map[i], '><i style="font-size:10px">$1<\/i>'); }
  b.innerHTML = html;
 }
 return R;
}

function init()
{
 var i, tbl = ['DetailedMessage', 'BattleResultDetailedMessage',
               'CityScoutingResultDetailedMessage', 'RegionScoutingResultDetailedMessage', 'TroopScoutingResultDetailedMessage',
               'AcceptDeclineDetailedMessage', 'MultiChoiceDetailedMessage',
               'PlayerInvitationKeyDetailedMessage', 'CrmDetailedMessage'
               ];
 for ( i = tbl.length; i--; ) { H[tbl[i]].prototype.display = API.injectAfter(H[tbl[i]].prototype.display, cbRemoveContentSpam); }
 H.MessageBoxFrame.prototype.displayRecipientMailingList = API.injectAfter(H.MessageBoxFrame.prototype.displayRecipientMailingList, cbAddToRecipient);
 H.MessageBoxFrame.prototype.setContent = API.injectAfter(H.MessageBoxFrame.prototype.setContent, cbAddFilter);
}
return {init:init};
}());

//**************************
// TOOLTIP des ressources d'une ville
//**************************
// enhance les tooltips de ressources d'une ville
function enhanceRessourceStackTooltip()
{
 // TODO : trouver une maniere moins aggressive pour les tooltips, doit bien y avoir un prototype ou un callback disponible
 function cb(retour)
 {
  var n, child, tmp, hourly, qt=0, maxi=0,
      reg = /^RessourceStack[0-9]+$/,
      idH = 'VR_tooltipRessourceStackEnhancerHourly',
      idU = 'VR_tooltipRessourceStackEnhancerUntil',
      hourlyNode = gBI(idH), untilNode = gBI(idU);
  function toNumber(n) { return parseFloat(n.innerHTML.replace(',','.').replace(/[^0-9\+\-\.]/g, '')); }
  API.DOM.removeFromParent(hourlyNode, untilNode);
  if ( this.element && this.element.id.match(reg) && ( n = this.hommkTooltipElement ) )
  {
   qt = gBI(this.element.id + 'TooltipQuantity'); if ( qt ) { qt = toNumber(qt); }
   maxi = gBI(this.element.id + 'TooltipStorage'); if ( maxi ) { maxi = toNumber(maxi); }
   child = gBI(this.element.id + 'TooltipIncome');
   if ( child )
   {
    hourly = toNumber(child)/24;
    if ( hourly !== 0 )
    {
     hourlyNode = cE('DIV', {id:idH, className:'Voffset5'});
     hourlyNode.appendChild(cE('DIV', {className:'floatLeft Hpadding10R', innerHTML:i18n('TooltipIncomeHourly')}));
     hourlyNode.appendChild(cE('DIV', {className:'floatRight'+(hourly<0?' red1':''), innerHTML:numberToFixed(hourly, 2, true)}));
     hourlyNode.appendChild(cE('DIV', {className:'clearBoth'}));
     child.parentNode.parentNode.insertBefore(hourlyNode, child.parentNode.nextSibling);
     if ( maxi && hourly !== 0 )
     {
      if ( hourly < 0 && qt <= 0 ) { tmp = i18n('TooltipIncomeIsEmpty'); }
      else
      {
       if ( hourly < 0 ) { tmp = qt / Math.abs(hourly); }
       else { tmp = (maxi - qt) / hourly; }
       tmp = H.DateUtils.durationToString(parseFloat(tmp) * 3600, H.DATEUTILS_DURATION_FORMAT_COMPLETE).replace(/([^0-9])/g, '$1 ');
      }
      hourlyNode = cE('DIV', {id:idH, className:'Voffset5'});
      hourlyNode.appendChild(cE('DIV', {className:'floatLeft Hpadding10R', innerHTML:i18n(hourly<0?'TooltipIncomeUntilEmpty':'TooltipIncomeUntilFull')}));
      hourlyNode.appendChild(cE('DIV', {className:'floatRight'+(hourly<0&&qt<=0?' red1':''), innerHTML:tmp}));
      hourlyNode.appendChild(cE('DIV', {className:'clearBoth'}));
      child.parentNode.parentNode.appendChild(hourlyNode);
     }
    }
   }
  }
  return retour;
 }
 H.Tooltip.prototype.display = API.injectAfter(H.Tooltip.prototype.display, cb);
//gBI('Tooltip').addEventListener('DOMSubtreeModified', function(){ API.dump({innerH:this.innerHTML}, 'Tooltip::DOMSubtreeModified); }, false);
}

//**************************
// DISTANCE DES VILLES
//**************************
function enhanceVilles(X, Y)
{
 var cV = H.currentView;
 if ( !X ) { X = cV.regionX; }
 if ( !Y ) { Y = cV.regionY; }
 if ( !X || !Y ) { return; }
 H.elementPool.get('RegionCity').each(
  function(m,k)
  {
   var i, child, id, ajout, dir, dist, xCity = m.content.x, yCity = m.content.y, tmp = ['CompleteViewRegionCityName', 'SummaryViewRegionCityName'], xView = lastRegionX, yView = lastRegionY;
   if ( X && Y ) { xView = X; yView = Y; }
   CACHE.add('TownName', xCity+','+yCity, m.content.cityName);
   for ( i = 0; i < tmp.length; i++ )
   {
    child = m.getChildElement(tmp[i]);
    if ( child )
    {
     id = 'VR_' + k + tmp[i];
     ajout = gBI(id);
     if ( !ajout ) { ajout = child.appendChild(cE('DIV', {id:id, className:'VR_dir'})); }
     API.DOM.flush(ajout); child.title = '';
     if ( xCity != xView || yCity != yView )
     {
      dir = getDirectionTexte(xView, yView, xCity, yCity);
      dist = numberToFixed(getDistance(xView, yView, xCity, yCity,1), 2, true);
      child.title = i18n('detailDistance', m.content.cityName, dist, directionToFull(dir), CACHE.get('TownName', xView+','+yView, ''), xView, yView);
      ajout.appendChild(cE('DIV', {className:'dir' + dir}));
      ajout.appendChild(cTN(dist));
     }
    }
   }
  }
 );
}


//**************************
// SIEGES
//**************************
SIEGES = (function(){
var tbody, thead, toid, all = {};
function cancelToid() { if ( toid ) { toid = clearTimeout(toid); } }
function startToid()
{
 cancelToid();
 if ( Window.MANAGER.isShown('sieges') ) { toid = setTimeout(updateSieges, 500); }
}
function updateSieges()
{
 var k, i, row, r, sieges;
 function cell(colSpan, node, cN) { var c = row.insertCell(-1); c.colSpan = colSpan; if ( cN ) { c.className = cN; } if (node){c.appendChild(node);} return c; }
 cancelToid();
 API.DOM.flush(API.CSS.hide(tbody)); API.CSS.hide(thead);
 sieges = [];
 for ( k in all ) { if ( all.hasOwnProperty(k) ) { sieges.push(all[k]); } }
 sieges.sort(function(a,b){ return (a.endDateVal - b.endDateVal); });
 for ( i = 0; i < sieges.length; i++ )
 {
  r = sieges[i];
  row = tbody.insertRow(-1); row.id = 'VRSieges_'+r.x+'_'+r.y; if ( i%2 ) { row.className = 'odd'; }
  cell(1, cE('DIV', { className:'f_'+r.faction+(r.isNeutral?'_neutral':'')+(r.hasGrail?'_graal':'') }));
  cell(1, cTN(sprintf('(%s,%s)', r.x, r.y)));
  cell(1, cTN(r.ville));
  cell(1, cTN(r.assiegeAlly));
  cell(1, cTN(r.assiege));
  cell(1, cTN(r.endDate));
  cell(1, cTN(r.siegeurAlly));
  cell(1, cTN(r.siegeur));
 }
 if ( sieges.length > 0 ) { API.CSS.show(thead); }
 else { row = tbody.insertRow(-1); cell(5, cTN(i18n('siege_nothingFound'))); }
 API.CSS.show(tbody);
}

function onclickListe(E)
{
 var r, x, y, tmp, t = API.EVT.getParentTarget(E, 'TD');
 if ( t && t.parentNode && (tmp=t.parentNode.id.split('_')) && (x=intval(tmp[1])) && (y=intval(tmp[2])) )
 {
  if ( t.cellIndex === 0 && (r=H.getRegionFromXY(x,y)) ) { r.openSiegeInfoFrame(); }
  else { GOTO(x, y, H.REGION_WORLDMAP_ZOOM_13X13); }
 }
}
function createWin()
{
 function oncreate()
 {
  var tbl, row, cell;
  tbody = cE('TBODY'); thead = cE('THEAD');
  tbody.addEventListener('click', onclickListe, true);
  tbl = this.subNode.appendChild(cE('TABLE', {id:'VRListeSieges', cellSpacing:0, cellPadding:0, border:0, childs:[thead,tbody]}));
  row = thead.insertRow(-1); cell = row.insertCell(-1); // une cellule vide
  cell = row.insertCell(-1); cell.colSpan = 2; cell.innerHTML = i18n('siege_villes');
  cell = row.insertCell(-1); cell.colSpan = 2; cell.innerHTML = i18n('siege_sieges');
  cell = row.insertCell(-1); cell.innerHTML = i18n('siege_end');
  cell = row.insertCell(-1); cell.colSpan = 2; cell.innerHTML = i18n('siege_assiegeurs');
 }
 Window.MANAGER.create('sieges', { title:i18n('siege_title'), width:540, height:250 }, { oncreate:oncreate, onshow:updateSieges }).show();
}
function toggle()
{
 var M = Window.MANAGER, win = M.get('sieges');
 if ( win ) { win.toggle(); } else { createWin(); }
}
function add(r)
{
 var id;
 function V(k) { if ( k in r ) { return r[k]; } return ''; }
 function I(k) { return intval(V(k)); }
 function B(k) { return !!(k in r && r[k]); }
 if ( r && ('sg' in r) && r.sg && (id=r.x+','+r.y) && !(id in all) )
 {
  all[id] = {x:I('x'), y:I('y'), ville:V('cN'), faction:V('fctN'), assiege:V('pN'), assiegeAlly:V('iAN'), isNeutral:B('iN'), hasGrail:B('hG'), siegeur:'?', siegeurAlly:'?', endDateVal:0, endDate:'?'};
  startToid();
 }
}
function updateSiegeur(x,y,pName,aName,endDate)
{
 var id = x+','+y;
 if ( id in all )
 {
  all[id].siegeur = pName;
  all[id].siegeurAlly = aName;
  all[id].endDate = H.DateUtils.timestampToString(endDate, H.DATEUTILS_TIME_FORMAT_DATE_HMS);
  all[id].endDateVal = endDate;
  startToid();
 }
}
function init()
{
 var i, map = H;
 function cbSiegeFrame(R)
 {
  var n, c = this.content.targetedRegion, x = c.x, y = c.y;
  if ( (c = this.getChildElement('SiegedCityName')) )
  {
   if ( (n = gBI('VR_siegeFrameCoords')) ) { n.parentNode.removeChild(n); }
   n = cE('SPAN', {id:'VR_siegeFrameCoords', className:'size10', innerHTML:'('+x+','+y+')'});
   n.addEventListener('click', (function(X,Y){ return function(){ GOTO(X, Y, H.REGION_WORLDMAP_ZOOM_13X13); }; }(x,y)), true);
   c.insertBefore(n,c.firstChild);
   updateSiegeur(x,y,CACHE.get('PlayerName', playerId, 'MYSELF'), allianceName, this.content.siegeEndDate);
  }
  return R;
 }
 function getXYFromCityName(name) { for ( var k in all ) { if ( all.hasOwnProperty(k) && all[k].ville == name ) { return {x:all[k].x,y:all[k].y}; } } return null; }
 function cbBreakSiegeFrame(R)
 {
  var c = this.content, xy = getXYFromCityName(c.siegedCityName);
  if ( xy ) { updateSiegeur(xy.x,xy.y,c.siegingPlayerName,c.siegingAllianceName,c.siegeEndDate); }
  return R;
 }
 function drawInfluence(retour) { var c = this.content; add(c); return retour; }
 H.SiegeFrame.prototype.display = API.injectAfter(H.SiegeFrame.prototype.display, cbSiegeFrame);
 H.SiegeBreakFrame.prototype.display = API.injectAfter(H.SiegeBreakFrame.prototype.display, cbBreakSiegeFrame);
 H.Region.prototype.drawInfluence = API.injectAfter(H.Region.prototype.drawInfluence, drawInfluence);
 if ( map && (map=map.worldMap ) && (map=map.content ) && (map=map.attachedRegionList ) )
 {
  for ( i = map.length; i--; ) { add(map[i]); }
 }
}
return {init:init, toggle:toggle, askUpdate:startToid};
}());

//**************************
// plugSliders
//**************************
function enhanceSliders()
{
 H.ImprovedSlider.prototype.VR_setCallback = function(fn, options) { this.VRcallback = fn; this.VRopts = options; };
 H.ActionDurationSlider.prototype.onUpdate = API.injectAfter(H.ActionDurationSlider.prototype.onUpdate,
  function(retour)
  {
   var fn = this.VRcallback, o = this.VRopts, params = null, scope = this;
   if ( typeof fn == 'function' )
   {
    if ( o ) { scope = o.scope || this; params = o.params || null; }
    fn.call(scope, this, params);
   }
   return retour;
  }
 );
}

//**************************
// ameliorations du chat
//**************************
CHAT = (function(){
function init()
{
 var n;
 function goToCoords(E)
 {
  var xy,x,y,t = API.EVT.getParentTarget(E, 'SPAN', 'VRchatcoords');
  if ( t && (xy=t.innerHTML))
  {
   xy = xy.split(/[^0-9]+/g);
   if ( xy.length == 4 )
   {
    x = validatePosition(xy[1]);
    y = validatePosition(xy[2]);
    if ( x && y ) { GOTO(x,y); return API.EVT.stop(E); }
   }
  }
  return true;
 }
 function cb(retour, f,h)
 {
  var i,match,m,xy,x,y,
      regAllCoords = /\(\s*([0-9]+)\s*[,.\-]\s*([0-9]+)\s*\)/g,
      regURL = /(https?:\/\/[^\s<]+)/;
  if ( !f.toBePaid && typeof retour == 'string' )
  {
   // gerer les espaces ( 123 , 456 )
//    if ( (match=retour.match(/\([0-9]+[,.\-][0-9]+\)/g)) )
//    {
//     for ( i = 0; i < match.length; i++ )
//     {
//      x = 0; y = 0;
//      xy = match[i].split(/[^0-9]+/g);
//      if ( xy.length == 4 )
//      {
//       x = validatePosition(xy[1]);
//       y = validatePosition(xy[2]);
//       if ( x && y ) { retour = retour.replace(match[i], '<span class="VRchatcoords">' + match[i] + '</span>'); }
//      }
//     }
//    }
//   [TEST coords] (120,120) ( 120 , 120 )  120,120 (120.120) (120- 120) ( 120 -120) ( 120. 120)

//    if ( retour && (match=retour.match(reg)) )
//    {
//    API.dump(match);
//     for ( i = 0; i < match.length; i++ )
//     {
//      x = validatePosition(match[i][1]); y = validatePosition(match[i][2]);
//      if ( x && y ) { retour = retour.replace(match[i][0], '<span class="VRchatcoords">' + match[i][0] + '</span>'); }
//     }
//    }
   if ( (match=retour.match(regURL)) )
   {
    retour = retour.replace(match[0], '<a href="'+match[0]+'" target="_blank" class="VRchaturl">'+match[0]+'<\/a>');
   }
   else if ( (match=retour.match(regAllCoords)) )
   {
    for ( i = 0; i < match.length; i++ )
    {
     if ( (m=match[i].match(regCoords)) )
     {
      x = validatePosition(m[1]); y = validatePosition(m[2]);
      if ( x && y ) { retour = retour.replace(m[0], '<span class="VRchatcoords">' + m[0] + '</span>'); }
     }
    }
   }
//    else
//    {
//     while ( (match=regCoords.exec(retour)) )
//     {
//     API.log(match);
//      x = validatePosition(match[1]); y = validatePosition(match[2]);
//      if ( x && y ) { retour = retour.replace(match[0], '<span class="VRchatcoords">' + match[0] + '</span>'); }
//     }
//    }
  }
  return retour;
 }
 H.Chat.prototype.renderMessage = API.injectAfter(H.Chat.prototype.renderMessage, cb);
 if ( (n=gBI('ChatContainer')) ) { n.addEventListener('click', goToCoords, true); }
 API.CSS.add('VRcompactedChat', document.body);
}
return {init:init};
}());

//**************************
// ameliorations building
//**************************
function enhanceBuildingsConstruction()
{
 function getDateHours(slider)
 {
  var D = H.DateUtils, v = (slider.options.constantDuration + (slider.baseDuration * slider.timeRatio));
  v = D.getCurrentTimestamp() + v;
  return [D.timestampToString(v, H.DATEUTILS_TIME_FORMAT_LOCALE_DATE_STRING_SHORT),
          D.timestampToString(v, H.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING)].join('<br>');
 }
 function getRealCost(M/*ine*/, slider)
 {
  var r = [], mine = M.content.mine, resCost, tF = API.number.toFixed;
  resCost = ((mine.mineIncome * mine.improveDuration)/86400) / slider.ressourceRatio;
  r.push(cE('SPAN', {innerHTML:i18n('immobilisation')}));
  r.push(cE('SPAN', {className:'VRressource VR_' + mine.ressourceEntityTagName}));
  r.push(cE('SPAN', {innerHTML:tF(resCost,2,true)}));
  return r;
 }
 function onSlideUpdate(slider, params)
 {
  var pere, costs, i;
  params.node.innerHTML = getDateHours(slider);
  if ( params.type == 'mine' && (pere=params.realCost) )
  {
   API.DOM.flush(pere);
   costs = getRealCost(this, slider);
   for ( i = 0; i < costs.length; i++ ) { pere.appendChild(costs[i]); }
  }
 }
 function cb(type)
 {
  return function(retour)
  {
   var c, n, args, s = this.actionDurationSlider, id = 'VRsliderDuration_'+type, idRealCost = 'VRrealImproveCost';
   API.DOM.removeFromParent(id, idRealCost);
   if ( s && (c=this.mainElement) )
   {
    args = {scope:this,params:{type:type,node:n}};
    args.params.node = c.appendChild(cE('DIV', {id:id, innerHTML:getDateHours(s), className:'VRsliderDuration'}));
    if (     type=='mine'
         && (this.selectedAction && this.selectedAction === 'IMPROVE_MINE' )
         && H.selectedHeroId
         && (n=this.content) && (n=n.mine) && (n=n.nextImproveMineEntityTagName) && (n=this.getChildElement('ImproveChoice')) )
    {
     args.params.realCost = n.appendChild(cE('DIV', {id:idRealCost, childs:getRealCost(this,s)}));
    }
    s.VR_setCallback(onSlideUpdate, args);
   }
   return retour;
  };
 }
 H.MineUpgradeFrame.prototype.showActionChoiceZone = API.injectAfter(H.MineUpgradeFrame.prototype.showActionChoiceZone, cb('mine'));
 H.ZoneBuildingUpgradeFrame.prototype.showActionChoiceZone = API.injectAfter(H.ZoneBuildingUpgradeFrame.prototype.showActionChoiceZone, cb('atelier'));
 H.ZoneBuildingFrame.prototype.showActionChoiceZone = API.injectAfter(H.ZoneBuildingFrame.prototype.showActionChoiceZone, cb('region'));
 H.CityBuildingFrame.prototype.displayRefreshable = API.injectAfter(H.CityBuildingFrame.prototype.displayRefreshable, cb('city'));
}

//**************************
// marketPlace
//**************************
function enhanceMarketPlace()
{
 function cbAuction(retour)
 {
  var n, c = this.content, lS = API.localStorage;
  function checkPrice(THIS, content, n, p, q, isBid)
  {
   var m,v,u, title=[];
   if ( n )
   {
    m = content.type == H.AUCTION_OFFERREQUEST_TYPE_OFFER ? 'Buy' : 'Sell';
    u = lS.value(idScript, 'market'+m+'Price'+content.ressourceEntityTagName, 0);		
    v = p/q;
    if ( isBid ) { title.push(i18n('nextBidPrice')+' : ' + numberToFixed(p,0,true)); }
    title.push(i18n('unitaryPrice')+' : ' + numberToFixed(v,0,true));
    n.title = title.join(' | ');
    if ( u && ( (m=='Buy' && v<=u) || (m=='Sell' && v>=u) ) && (n=n.parentNode) ) { API.CSS.add('VR_goodBuySell', n); } else { API.CSS.remove('VR_goodBuySell', n); }
   }
  }
  
  checkPrice(this, c, this.bestPriceElement, c.nextBid, c.quantity, true);
  checkPrice(this, c, this.limitPriceElement, c.limitPrice, c.quantity, false);
/* vatokato: in RU servers this code don't give open market
  if (n=this.playerNameElement)
  {
   n.style.cursor = 'pointer';
   n.setEvent('click', function(E) { if ( this.playerId ) { H.openPlayerProfileFrame(this.playerId); } }.bind(c));
   if ( c.playerId && MY_ALLY.is(c.playerId) ) { API.CSS.add('VR_inAlliance', n.parentNode); }
  }
  
  if ( (n=this.bestPlayerNameElement) )
  {
   n.style.cursor = 'pointer';
   n.setEvent('click', function(E) { if ( this.bestPlayerId ) { H.openPlayerProfileFrame(this.bestPlayerId); } }.bind(c));
   if ( c.bestPlayerId && MY_ALLY.is(c.bestPlayerId) ) { API.CSS.add('VR_inAlliance', n.parentNode); }
  }
\vatokato */  
  return retour;
 }
 function cbRaise(retour)
 {
  var c = this.content;  
  H.MARKETPLACE_FRAME_NEW_BID_CONFIRMATION = H.UBI_MARKETPLACE_FRAME_NEW_BID_CONFIRMATION;
  if ( c.type == 'OFFER' || c.type == 'REQUEST' )
  {
   H.MARKETPLACE_FRAME_NEW_BID_CONFIRMATION =
    [H.UBI_MARKETPLACE_FRAME_NEW_BID_CONFIRMATION,
     '<br><br>',
     i18n('marketYouBuySell_raise_' + c.type),
     ' : ' + c.quantity,
     '<span class="VRressource VR_'+c.ressourceEntityTagName+'" style="display:inline-block; margin-left:5px; vertical-align:middle"><\/span>',
     '<br>',
     i18n('unitaryPrice')+' : ' + numberToFixed(c.nextBid/c.quantity,0,true),
     '<br>',
     i18n('marketShowPrice') + ' : ' + numberToFixed(c.currentPrice, 0, true),
     '<br>',
     i18n('marketPaidPrice') + ' : <span class="red1 boldFont">' + numberToFixed(c.nextBid, 0, true) + '<\/span>'
    ].join('');
  }
  return retour;
 }
 function cbInstantBuy(retour)
 {
  var c = this.content;
  H.MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION = H.UBI_MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION;
  if ( c.type == 'OFFER' || c.type == 'REQUEST' )
  {
   H.MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION =
    [H.UBI_MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION,
     '<br><br>',
     i18n('marketYouBuySell_instant_' + c.type),
     ' : ' + c.quantity,
     '<span class="VRressource VR_'+c.ressourceEntityTagName+'" style="display:inline-block; margin-left:5px; vertical-align:middle"><\/span>',
     '<br>',
     i18n('unitaryPrice')+' : ' + numberToFixed(c.limitPrice/c.quantity,0,true),
     '<br>',
     i18n('marketShowPrice') + ' : ' + numberToFixed(c.limitPrice, 0, true)
    ].join('');
  }
  return retour;
 }
 H.UBI_MARKETPLACE_FRAME_NEW_BID_CONFIRMATION = H.MARKETPLACE_FRAME_NEW_BID_CONFIRMATION;
 H.UBI_MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION = H.MARKETPLACE_FRAME_INSTANT_BUY_CONFIRMATION;

 H.AuctionOfferRequest.prototype.displayRefreshable = API.injectAfter(H.AuctionOfferRequest.prototype.displayRefreshable, cbAuction);
 H.AuctionRequest.prototype.displayRefreshable = API.injectAfter(H.AuctionRequest.prototype.displayRefreshable, cbAuction);
 
 H.AuctionOfferRequest.prototype.raise = API.injectBefore(H.AuctionOfferRequest.prototype.raise, cbRaise);
 H.AuctionRequest.prototype.raise = API.injectBefore(H.AuctionRequest.prototype.raise, cbRaise);
 H.AuctionOfferRequest.prototype.instantBuy = API.injectBefore(H.AuctionOfferRequest.prototype.instantBuy, cbInstantBuy);
 H.AuctionRequest.prototype.instantBuy = API.injectBefore(H.AuctionRequest.prototype.instantBuy, cbInstantBuy);
}

//**************************
// WORLDMAPALERT
//**************************
PANNEAU = (function(){
var shown = true;
function toggle()
{
 shown = !shown;
 API.CSS[shown?'remove':'add']('cacher_panneaux', document.body);
}
function init()
{
 function set(p)
 {
  var cN, m;
  if ( p && p.imageElement && (m=p.content) && (m=m.message) )
  {
   if ( /frigo/mi.test(m) ) { cN = 'FRIGO'; }
   else if ( /si[e|e]ge/mi.test(m) ) { cN = 'SIEGE'; }
   else if ( /leurre/mi.test(m) ) { cN = 'LEURRE'; }
   else if ( /attaque/mi.test(m) ) { cN = 'ATTAQUE'; }
   else if ( /reco/mi.test(m) ) { cN = 'RECO'; }
   else if ( /candidat/mi.test(m) ) { cN = 'CANDIDAT'; }
   if ( cN ) { p.imageElement.addClass(cN); }
  }
 }
 function cb(retour) { set(this); return retour; }
 H.WorldMapAlert.prototype.initializeDisplay = API.injectAfter(H.WorldMapAlert.prototype.initializeDisplay, cb);
 H.worldMap.worldMapAlertList.each(set);
}
return {init:init,toggle:toggle};
}());

//**************************
// TimeLineCaravanes
//**************************
function enhanceTimeLineCaravans()
{
 var i, actions = H.elementPool.get('MasterAction');
 function cb(retour)
 {
  var
   i, slaves, type, n, c = this.content, cT = H.worldMap.getRemoteTimestamp(),
   types = ['CARAVAN_DELIVERY', 'RELAY_DELIVERY', 'AUCTION_HOUSE_DELIVERY'],
   map = {CARAVAN_DELIVERY_MOVE:0, CARAVAN_DELIVERY:16, RELAY_DELIVERY:32, AUCTION_HOUSE_DELIVERY:48};
  if ( c && (type=c.type) && types.indexOf(type) != -1 && (n=this.getChildElement('Image')) )
  {
   if ( type == 'CARAVAN_DELIVERY' && (slaves=this.slaveActionList) && (slaves=slaves.elementList) )
   {
    for ( i = slaves.length; i--; ) { if ( (c=slaves[i].content) && c.startDate <= cT && c.endDate >= cT && (c.type == 'CARAVAN_DELIVERY_MOVE' || c.type == 'RELAY_DELIVERY') ) { type = 'CARAVAN_DELIVERY_MOVE'; } }
   }
   n.style.backgroundImage = 'url('+URL.GM.img + 'TimeLineCaravans.png)';
   n.style.backgroundPosition = (0-intval(map[type])) + 'px 0';
  }
  return retour;
 }
 H.MasterAction.prototype.updatePosition = API.injectAfter(H.MasterAction.prototype.updatePosition, cb);
 if ( actions && (actions=actions.values()) ) { for ( i = actions.length; i--; ) { cb.call(actions[i]); } }
}

//**************************
// REPERES
//**************************
REPERES = (function(){
function getRepere(I) {var t = API.localStorage.value(idScript,'reperes', []); if ( I < t.length ) { return t[I]; } return null; }
function update()
{
 var i, name, x, y, li, max, total = 0, all = API.localStorage.value(idScript,'reperes', []), ul = gBI('VR_reperes');
 if ( ul )
 {
  API.DOM.flush(API.CSS.hide(ul));
  max = all.length;
  for ( i = 0; i < max; i++ )
  {
   if ( all[i].world == worldId )
   {
    total++;
    name = all[i].name; x = all[i].x; y = all[i].y;
    li = cE('LI', {id:'VR_repere_' + i, title:i18n('repereFocusOn', x, y)});
    li.appendChild(cE('SPAN', {className:'del', title:i18n('repereDelete')}));
    li.appendChild(cE('SPAN', {className:'coords', innerHTML:'('+x + ',' + y+')'}));
    li.appendChild(cE('SPAN', {className:'name', innerHTML:name}));
    ul.appendChild(li);
   }
  }
  if ( total === 0 ) { ul.appendChild(cE('LI', {innerHTML:i18n('noShortcutCreated')})); }
  API.CSS.show(ul);
 }
}
function removeRepere(I) { var a = API.localStorage.value(idScript,'reperes', []); a.splice(I, 1); API.localStorage.set(idScript,'reperes', a); }
function reperesClick(E)
{
 var id, repere, target = API.EVT.getTarget(E), li = API.EVT.getParentTarget(E, 'LI');
 if ( li && li.id && target )
 {
  id = li.id.substr(10);
  repere = getRepere(id);
  if ( repere )
  {
   if ( target.nodeName == 'SPAN' && target.className == 'del' )
   {
    removeRepere(id);
    update();
   }
   else
   {
    GOTO(repere.x, repere.y, intval(API.localStorage.value(idScript,'zoomReperes', H.REGION_WORLDMAP_ZOOM_13X13)));
   }
  }
 }
}
function reset()
{
 var N = gBI('VR_addRepereName'), X = gBI('VR_addRepereX'), Y = gBI('VR_addRepereY'),
     n = '', x = validatePosition(lastRegionX), y = validatePosition(lastRegionY);
  if ( !x ) { x  = ''; }  if ( !y ) { y = ''; }   
  if ( x && y ) { n = (n=H.getRegionFromXY(x,y)) && 'content' in n && 'cN' in n.content ? n.content.cN : '';}
  // vatokato Modify start
  if(n && H.getRegionFromXY(x,y).content.pN) n += ' ('+H.getRegionFromXY(x,y).content.pN+')';
  // vatokato Modify end
  if ( N && X && Y ) { N.value = n; X.value = x; Y.value = y; }
}

function createWin()
{
 function addRepere(E)
 {
  var a = API.localStorage.value(idScript,'reperes', []),
      N = gBI('VR_addRepereName'), X = gBI('VR_addRepereX'), Y = gBI('VR_addRepereY'),
      n,x,y;
	  
  if ( N && X && Y )
  {
   n = N.value.trim(); x = validatePosition(X.value); y = validatePosition(Y.value);
   if ( n && x && y )
   {
    a.push({name:n,x:x,y:y,world:worldId});
    API.localStorage.set(idScript,'reperes', a);
    reset();
    update();
    try { N.focus(); } catch(ex) {}
   }
  }
  if ( E ) { return API.EVT.stop(E); }
  return false;
 }

 function oncreate()
 {
  var row, cell, tbody = cE('TBODY'), tbl = cE('TABLE', {border:0,cellSpacing:0,cellPadding:0,childs:[tbody]}), n = cE('FORM', {childs:[tbl]});
  function C(name,id) { var c = row.insertCell(-1); c.appendChild(cE('DIV', {childs:[cE('INPUT', {type:'text', name:name, id:id, value:''})]})); return c; }
  n.addEventListener('submit', addRepere, true);
  row = tbody.insertRow(-1);
  C('x', 'VR_addRepereX').style.width = '40px';
  C('y', 'VR_addRepereY').style.width = '40px';
  C('name', 'VR_addRepereName').style.width = '100%';
  cell = row.insertCell(-1); cell.appendChild(cE('INPUT', {type:'submit', value:'', title:i18n('repereAdd')}));
  this.subNode.appendChild(n);
  n = cE('UL', {id:'VR_reperes'});
  n.addEventListener('click', reperesClick, true);
  this.subNode.appendChild(n);
 }
 Window.MANAGER.create('reperes', { title:i18n('titleReperes'), width:220, height:300 }, { oncreate:oncreate, onshow:update }).show();
}
function toggle()
{
 var M = Window.MANAGER, w = M.get('reperes');
 if ( w ) { w.toggle(); } else { createWin(); }
}
return {toggle:toggle, show:createWin, reset:reset, update:update};
}());

//**************************
// IMPORT/EXPORT
//**************************
BACKUP = (function(){
var nullValue = 'VRDontGetThisValue', keysExport = [], plugs = {get:function(r){return r;}, set:NOOP};
function encodeIt(v) { return v.replace('&', '-/VR-amp-VR/-'); }
function decodeIt(v) { return v.replace('-/VR-amp-VR/-', '&'); }
function getDatas()
{
 var tmp, i, r = {}, notes = [], lS = API.localStorage, ID=idScript;
 try { r.playerName = H.player.get('name'); } catch(ex) {}
 tmp = CONFIG.exporter(); if ( tmp ) { r.config = tmp; }
 // mais que c'est laid
 for ( i = 0; i < 500; i++ ) { try { tmp = lS.value(ID,'notes'+i, ''); if ( tmp !== '' ) { notes.push({w:i,n:encodeIt(tmp)}); } } catch(ex) {} }
 if ( notes.length > 0 ) { r.notes = notes; }
 tmp = lS.value(ID,'reperes', []); if ( tmp.length > 0 ) { for ( i = 0; i < tmp.length; i++ ) { tmp[i].name=encodeURIComponent(tmp[i].name); } r.reperes = tmp; }
 tmp = lS.value(ID, 'recipientMailing', []); if ( tmp.length > 0 ) { r.recipientMailing = tmp; }
 tmp = Window.MANAGER.backupSizes(); if ( tmp.length > 0 ) { r.winSizes = tmp; }
 tmp = lS.value(ID,'customLink', []); if ( tmp.length > 0 ) { for ( i = 0; i < tmp.length; i++ ) { tmp[i].u=encodeIt(tmp[i].u); } r.customLink = tmp; }
 r = plugs.get(r);
 return JSON.stringify(r);
}
function setDatas(D/*atas*/)
{
 var k, r, lS  = API.localStorage, ID = idScript;
 lS.reset(ID);
 if ( 'notes' in D ) { for ( k in D.notes ) { if ( D.notes.hasOwnProperty(k) ) { lS.set(ID,'notes'+D.notes[k].w, decodeIt(D.notes[k].n)); } } }
 if ( 'reperes' in D )
 {
  r = D.reperes;
  for ( k = 0; k < r.length; k++ ) { r[k].name=decodeURIComponent(r[k].name); }
  lS.set(ID,'reperes', r);
 }
 if ( 'config' in D ) { CONFIG.importer(D.config); }
 if ( 'recipientMailing' in D ) { lS.set(ID, 'recipientMailing', D.recipientMailing); }
 if ( 'winSizes' in D ) { Window.MANAGER.restoreSizes(D.winSizes); }
 if ( 'customLink' in D )
 {
  r = D.customLink;
  for ( k = 0; k < r.length; k++ ) { r[k].u = decodeIt(r[k].u); }
  lS.set(ID, 'customLink', r);
 }
 REPERES.update();
 CONFIG.updateValues();
 NOTES.update();
 plugs.set(D);
 CUSTOMLINK.show();
 Window.MANAGER.close('profillocal');
 Window.MANAGER.close('config');
}
function saveLocal()
{
 var frm, datas = getDatas();
 frm = API.CSS.hide(cE('FORM', {target:'_blank', method:'POST', action:URL.GM.backupProfil}));
 frm.appendChild(cE('INPUT', {type:'text', value:'local', name:'type'}));
 frm.appendChild(cE('INPUT', {type:'text', value:datas, name:'profil'}));
 document.body.appendChild(frm);
 frm.submit();
 frm.parentNode.removeChild(frm);
}

function loadLocal()
{
 var win;
 function doImport()
 {
  var v = gBI('VR_importer_input');
  if ( v && (v=v.value) )
  {
   try { v = JSON.parse(v); } catch(ex) { v = null; }
   if ( !v ) { alert(i18n('profilEndommage')); return false; }
   setDatas(v);
  }
 }
 function oncreate()
 {
  var node, div, sub = this.subNode;
  sub.appendChild(cE('P', {innerHTML:i18n('profilLoadExplanation')}));
  sub.appendChild(cE('TEXTAREA', {id:'VR_importer_input', value:''}));
  // boutons
  div = cE('DIV', {className:'VR_buttons'});
  node = cE('SPAN', {className:'VRnon'});
  node.addEventListener('click', win.hide.bind(this), true);
  div.appendChild(node);
  node = cE('SPAN', {className:'VRoui'});
  node.addEventListener('click', doImport, true);
  div.appendChild(node);
  sub.appendChild(div);
 }
 function onshow() { var n = gBI('VR_importer_input'); if ( n ) { n.value = ''; } }
 win = Window.MANAGER.create('profillocal',
                             { title:i18n('titleProfil'), resizeable:false, width:400, height:220 },
                             { oncreate:oncreate, onshow:onshow });
 win.show();
}
function saveServer()
{
 function OK_KO(R)
 {
  var v = XHR.parse(R);
  if ( typeof v == 'string' ) { alert(i18n(v)); }
  else if ( !v ) { alert(i18n('profilEndommage')); }
 }
 sendToVRDB(false, URL.GM.backupProfil, ['type=server', 'profil=' + getDatas()], OK_KO, OK_KO);
}
function loadServer()
{
 function OK(R)
 {
  var v = XHR.parse(R);
  if ( typeof v == 'string' ) { alert(i18n(v)); }
  else if ( !v ) { alert(i18n('profilEndommage')); }
  else { setDatas(v); alert(i18n('profilLoadComplete')); }
 }
 function KO(R) { alert('Erreur lors de la lecture du profil : ' + R.responseText); }
 sendToVRDB(false, URL.GM.restoreProfil, ['type=server'], OK, KO);
}
function getNullValue() { return nullValue; }
function getKeysExport() { return keysExport; }
function addKeysExport() { var i; for ( i = 0; i < arguments.length; i++ ) { keysExport.push(arguments[i]); } }
function plug(G,S) { plugs.get = G; plugs.set = S; }
return {saveLocal:saveLocal,loadLocal:loadLocal,saveServer:saveServer,loadServer:loadServer,
        getNullValue:getNullValue,getKeysExport:getKeysExport,
        addKeysExport:addKeysExport, plug:plug};
}());

//**************************
// UBIFIX
//**************************
function UBIfixes()
{
 var toid;
 function baseEnhancer(retour)
 {
  var cV = H.currentView, x = cV.regionX, y = cV.regionY;
  if ( toid ) { toid = clearTimeout(toid); }
  if ( !cV.isLoading && H.runningJsonRequestCount === 0 )
  {
   if ( !(x && y) ) { x = lastRegionX; y = lastRegionY; }
   lastRegionX = x; lastRegionY = y;
   enhanceVilles(x,y);
   MISCTOOLS.setDistanceCurrentView(null,x,y);
   REPERES.reset();
   SIEGES.askUpdate();
   SENTINELLE.forceUpdate();
  }
  else { toid = setTimeout(baseEnhancer, 500); }
  return retour;
 }
 H.VRUBIsetCurrentView = H.setCurrentView;
 H.setCurrentView = function(z, id, x, y, e, g)
 {
  // passer la suppression de la palantir dans le script private
  API.DOM.removeFromParent('VRPalantir');
  if ( x && y ) { this.worldMap.removeViewsContainingRegion(x, y); }
  this.VRUBIsetCurrentView(z, id, x, y, e, g);
  baseEnhancer();
 };
 // evite les messages etranges "HOMMK.getElement error : No #189531 Region found!"
 W.LogUtils.VRUBIerror = W.LogUtils.error;
 W.LogUtils.error = function(b,a)
 {
  var reg = /HOMMK.getElement error : No #[0-9]+ Region found!/;
  if ( !reg.test(b) ) { this.VRUBIerror(b,a); }
/*//  else { API.log('error prevented : "' + b + '"'); }*/
 };
 H.WorldMap.prototype.move = API.injectAfter(H.WorldMap.prototype.move, baseEnhancer);
 H.WorldMap.prototype.center = API.injectAfter(H.WorldMap.prototype.center, baseEnhancer);
 if ( locale == 'FR' ) { H.LOCALIZED_STRING_LIST.set('CREATE_MAP_ALERT_MERCHANT', 'Marchand'); }
}

//**************************
// AUTOSCAN
//**************************
AUTOSCAN = (function(){
var plug = NOOP;
function displayTooltip(retour)
{
 var x, y, n, i, tmp, match,
     distChilds = [], distChilds2 = [], eId = 'WorldMap' + worldId + 'MapArea',
     distId = 'VR_ASdist', nodeDist = gBI(distId);
 function find(from, id)
 {
  var i, all = from.getElementsByTagName('SPAN');
  for ( i = 0; i < all.length; i++ ) { if ( all[i].id.indexOf(id) != -1 ) { return validatePosition(all[i].innerHTML); } }
  return false;
 }
 function getDistanceTowns(m,k)
 {
  var c = m.content;
  if ( x != c.x || y != c.y )
  {
   distChilds.push({name:c.cityName,x:c.x,y:c.y,dist:getDistance(x,y,c.x,c.y,1),dist2:getDistance(x,y,c.x,c.y,5), dir:getDirectionTexte(x,y,c.x,c.y)});   
  }
 }
 API.DOM.removeFromParent(nodeDist);
 if ( this.element && this.element.id == eId && ( n = this.hommkTooltipElement ) )//  && n.nodeType === document.ELEMENT_NODE && n.tagName == 'DIV' )
 {
  x = find(n, 'TooltipRegionX'); y = find(n, 'TooltipRegionY');
  if ( !(x && y) )
  {
   match = n.textContent.match(/\((\d+), (\d+)\)$/i);
   if ( match && match.length == 3 ) { x = validatePosition(match[1]); y = validatePosition(match[2]); }
  }
  if ( x && y )
  {
   distChilds = [];
   H.elementPool.get('RegionCity').each(getDistanceTowns);
   if ( distChilds.length > 0 )
   {
    nodeDist = cE('DIV', {id:distId});
    distChilds.sort(function(a,b) { return a.dist - b.dist; });
    for ( i = 0; i < distChilds.length; i++ )
    {
     tmp = distChilds[i];
 	 // vatokato edit start
	 var tmptime1=getVTime(tmp.dist2,1);
	 var tmptime2=getVTime(tmp.dist2,2);
     nodeDist.appendChild(cE('DIV', {className:'VR_dir', childs:
	 [ 
	 cE('SPAN', {className:'distance', innerHTML:tmp.dist}), 
	 cE('DIV', {className:'dir'+tmp.dir}), 
	 cE('SPAN', {className:'town', innerHTML:tmp.name}) ,
	 cE('span', {className:'', innerHTML:'<span style="font-size:9px; padding:0 0 6px 0; display:block;text-align:center;position:relative; margin-top:-5px">('+tmptime1+' / '+tmptime2+')</span>'})
	 ]}));
	 // vatokato edit end
    }
    nodeDist.className = distChilds.length > 2 ? 'column' : 'nocolumn';
    n.appendChild(nodeDist);
   }
   plug(n,x,y);
  }
 }
 return retour;
}
function init()
{
 H.Tooltip.prototype.display = API.injectAfter(H.Tooltip.prototype.display, displayTooltip);
}
return {init:init,plug:function(cb){plug=cb;}};
}());

//**************************
// V&R - RAPPORTS
//**************************
RAPPORTS = (function(){
var plug = NOOP;
function cb(retour)
{
 var
  tmp, x, y, child, node,
  content = this.content,
  cJSON = content.contentJSON;
 if ( (child=this.getChildElement('TargetInfosLocationName')) )
 {
  if ( W.$defined(cJSON.targetedRegionId) && W.$defined(cJSON.targetedRegionNumber) )
  {
   tmp = H.getXYFromRegionNumber(cJSON.targetedRegionNumber);
   x = tmp.x; y = tmp.y;
  }
  else if ( W.$defined(cJSON.targetedHaltX) )
  {
   x = cJSON.targetedHaltX; y = cJSON.targetedHaltY;
  }
  x = intval(x); y = intval(y);
  if ( x && y ) { child.appendChild(cTN(' (' + x + ',' + y + ')')); }
 }
 plug.call(this);
 return retour;
}

function init()
{
 H.TroopScoutingResultDetailedMessage.prototype.display = API.injectAfter(H.TroopScoutingResultDetailedMessage.prototype.display, cb);
 H.RegionScoutingResultDetailedMessage.prototype.display = API.injectAfter(H.RegionScoutingResultDetailedMessage.prototype.display, cb);
 H.CityScoutingResultDetailedMessage.prototype.display = API.injectAfter(H.CityScoutingResultDetailedMessage.prototype.display, cb);
}
return {init:init, plug:function(cb){plug=cb;}};
}());

//**************************
// Lien vers JACTARI d'apres le code de jeyries
//**************************
JACTARI = (function(){
var
 convert_faction= {ACADEMY:0,HAVEN:1,INFERNO:2,NECROPOLIS:3,SYLVAN:4,NEUTRAL:5},
 convert_tier =
 {
  T1:0, T1P:1,
  T2:2, T2P:3,
  T3:4, T3P:5,
  T4:6, T4P:7,
  T5:8, T5P:9,
  T6:10, T6P:11,
  T7:12, T7P:13,
  T8:14, T8P:15
 },
 convert_neutral =
 {
  WIND:64, WATER:65, EARTH:66, FIRE:67, DEATHKNIGHT:68,
  WOLF:86, GNOMESHOOTER:87, GNOME:85, WANDERINGGHOST:88, MANTICORE:89, MINOTAUR:90
 },
 convert_unit = function(content)
 {
  var tier, faction, u = 0;
  if ( content.factionEntityTagName == "NEUTRAL" ) { u = convert_neutral[content.tier]; }
  else
  {
   tier = convert_tier[content.tier];
   faction = convert_faction[content.factionEntityTagName];
   u = (faction*16) + (tier&15) + (faction==4?5:0);
  }
  return { unite:u, nombre:content.quantity };
 },
 convert_archetype =
 {
  ARCANE_MAGE:0,
  DISTURBED_WIZARD:1,
  FANATIC_SORCERER:2,
  ILLUMINATED_PROTECTOR:3,
  MERCENARY:4,
  OUTLAND_WARRIOR:5,
  PALADIN:6,
  PIT_WARRIOR:7,
  PROTECTOR:8,
  WARMAGE:9,
  WARMASTER:10,
  WARRIOR_MAGE:11,
  SENACHAL:12,
  SOBERED_WIZARD:13,
  EXPLORER:14
 },
 convert_bodyPart =
 {
  HEAD:0,
  NECKLACE:1,
  RING:2,
  LEFT_HAND:3,
  CHEST:4,
  RIGHT_HAND:5,
  FEET:6,
  CAPE:7
 },
 from_list = function(input)
 {
  var k, output = {};
  for ( k = 0; k < input.length; k++ ) { output[input[k]] = k; }
  return output;
 },
 liste_spell =
 [
  // invocation
  "FIST_OF_WRATH"
  ,"WASP_SWARM"
  ,"FIRE_TRAP"
  ,"RAISE_DEAD"
  ,"EARTHQUAKE"
  ,"PHANTOM_FORCES"
  ,"SUMMON_ELEMENTALS"
  ,"FIREWALL"
  ,"CONJURE_PHOENIX"
  // tenebre
  ,"WEAKNESS"
  ,"SICKNESS"
  ,"GUARD_BREAK"
  ,"DISEASE"
  ,"VULNERABILITY"
  ,"SLOW"
  ,"PLAGUE"
  ,"DEATH_TOUCH"
  ,"WORD_OF_DEATH"
  // lumiere
  ,"DIVINE_STRENGTH"
  ,"BLESS"
  ,"MYSTIC_SHIELD"
  ,"HASTE"
  ,"RIGHTEOUS_MIGHT"
  ,"DEFLECT_MISSILE"
  ,"TELEPORTATION"
  ,"WORD_OF_LIGHT"
  ,"RESURRECTION"
  //destruction
  ,"STONE_SPIKES"
  ,"ELDERTICH_ARROW"
  ,"ICE_BOLT"
  ,"LIGHTNING_BOLT"
  ,"CIRCLE_OF_WINTER"
  ,"FIREBALL"
  ,"METEOR_SHOWER"
  ,"CHAIN_LIGHTNING"
  ,"IMPLOSION"
 ],
 convert_spell = from_list(liste_spell),
 convert_fortification =
 {
  FORT:1,
  CITADEL:2,
  CASTLE:3
 };

function convert_skill(a, skill)
{
 switch(  skill.heroClassSkillEntityTagName )
 {
  // combattant
  case 'ARMY_ATTACK_POWER_INCREASE': a.tacticien= skill.level; break;
  case 'CAVALRY_ATTACK_POWER_INCREASE': a.ecuyer= skill.level; break;
  case 'SHOOTER_ATTACK_POWER_INCREASE': a.tireur_elite= skill.level; break;
  case 'INFANTRY_ATTACK_POWER_INCREASE': a.commandant_infanterie= skill.level; break;
  // chevalier
  case 'ARMY_DEFENSE_POWER_INCREASE': break;
  case 'CAVALRY_DEFENSE_POWER_INCREASE': break;
  case 'SHOOTER_DEFENSE_POWER_INCREASE': break;
  case 'INFANTRY_DEFENSE_POWER_INCREASE': break;
  case 'ATTRITION_RATE_DECREASE': a.logisticien= skill.level; break;
  // ordre des magies pour Jactari : invocation tenebre lumiere destruction
  // invocation
  case 'SUMMON_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break;
  case 'SUMMON_SPELLBOOK_SPELL_NUMBER': break;
  case 'SUMMON_SPELL_EFFICIENCY': a.expert[0]=skill.level; break;
  case 'SUMMON_ADDED_MAGIC_POINTS': a.instinct[0]=skill.level; break;
  // tenebres
  case 'DARK_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break;
  case 'DARK_SPELLBOOK_SPELL_NUMBER': break;
  case 'DARK_SPELL_EFFICIENCY': a.expert[1]=skill.level; break;
  case 'DARK_ADDED_MAGIC_POINTS': a.instinct[1]=skill.level; break;
  // lumiere
  case 'LIGHT_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break;
  case 'LIGHT_SPELLBOOK_SPELL_NUMBER': break;
  case 'LIGHT_SPELL_EFFICIENCY': a.expert[2]=skill.level; break;
  case 'LIGHT_ADDED_MAGIC_POINTS': a.instinct[2]=skill.level; break;
  // destruction
  case 'DESTRUCTION_ADDED_BATTLE_SPELL_LEVEL': a.arcanes= skill.level; break;
  case 'DESTRUCTION_SPELLBOOK_SPELL_NUMBER': break;
  case 'DESTRUCTION_SPELL_EFFICIENCY': a.expert[3]=skill.level; break;
  case 'DESTRUCTION_ADDED_MAGIC_POINTS': a.instinct[3]=skill.level; break;
  // meneur
  case 'UNIT_PRODUCTION_INCREASE': break;
  case 'UNIT_RECRUITMENT_SPEED_INCREASE': break;
  case 'NEUTRAL_STACK_RECRUITMENT_INCREASE': break;
  case 'ATTACK_POWER_PER_UNIT_INCREASE': a.harangueur=skill.level; break;
  // barbare
  case 'SCOUTING_DETECT_LEVEL_INCREASE': break;
  case 'ATTRITION_RATE_INCREASE': a.massacreur=skill.level; break;
  case 'PILLAGE_INCREASE': break;
  // taverne
  case 'DEFENSE_POWER_PER_UNIT_INCREASE': a.bon_payeur=skill.level; break;
 }
}

function convert_hero(a, hero)
{
 a.faction = convert_faction[ hero.factionEntityTagName ];
 a.statut = 1;
 a.heros = 1;
 a.niveau = hero._level;
 a.archetype = convert_archetype[hero.heroTrainingEntityTagName];
 a.malus_attaque = 0;
}

function convert_artefact_list(a, artefacts)
{
 var k, artefact, pos;
 for ( k = 0; k < artefacts.length; k++ )
 {
  artefact = artefacts[k].artefactEntity;
  pos = convert_bodyPart[artefact.bodyPart];
  a.artefacts[pos] = artefact.id; // Jactari V4
 }
}

function nouveau_combat()
{
 var donnees = {
    saison:0, // 0:saison 1/1:saison 2
    a:{
        statut:1, // 1:joueur/0:PNJ
        dolmens:0,
        cri_de_guerre:0,
        inspiration:0,
        heros:0, // 1:heros present
        niveau:1,
        faction:0,
        archetype:0,
        artefacts:[0,0,0,0,0,0,0,0],
        tacticien:0,
        ecuyer:0,
        tireur_elite:0,
        commandant_infanterie:0,
        logisticien:0,
        harangueur:0,
        sapeur:0,
        massacreur:0,
        instinct:[0,0,0,0],
        expert:[0,0,0,0],
        arcanes:0,
        bonus_ecole:[0,0,0,0],
        larmes:0,
        sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
        troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
        mhr:{signe:0, valeur:0},
        butin_de_guerre:0,
        relever_les_morts:0,
        resistance_magique:0,
        moral_eleve:0,
        resurrection:0,
        tir_de_barrage:0,
        heros_superieur:0,
        maitrise_des_sorts:0,
        revelation_de_caracteristiques:0,
        classement_voies:0,
        malus_attaque:0
    },
    d:{
        statut:0, // 1:joueur/0:PNJ
        lieu:0, // 1:cite/2:region/3:halte
        fortification:0, // 1:fortin/2:citadelle/3:chateau
        forts:0,
        fort_principal:0,
        dolmens:0,
        ralliement:0,
        inspiration:0,
        heros:0,
        niveau:1,
        faction:0,
        archetype:0,
        artefacts:[0,0,0,0,0,0,0,0],
        tacticien_defenseur:0,
        ecuyer_defenseur:0,
        expert_tirs_barrage:0,
        inebranlable:0,
        logisticien:0,
        bon_payeur:0,
        batisseur_fortifications:0,
        massacreur:0,
        instinct:[0,0,0,0],
        expert:[0,0,0,0],
        arcanes:0,
        bonus_ecole:[0,0,0,0],
        larmes:0,
        sort:[ {id:-1, tour:1}, {id:-1, tour:2} ],
        troupes:[ {}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0}, {unite:255,nombre:0} ],
        mhr:{signe:0, valeur:0},
        butin_de_guerre:0,
        relever_les_morts:0,
        resistance_magique:0,
        moral_eleve:0,
        resurrection:0,
        tir_de_barrage:0,
        heros_superieur:0,
        maitrise_des_sorts:0,
        revelation_de_caracteristiques:0,
        classement_voies:0
    }
 };
 return donnees;
}

// Jactari V4
function encode_donnees_combat(donnees)
{
 var c,p,u,code,t,
     _base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
     _camps = ['attaquant','defenseur'],
     _camps_abr = ['a','d'],
     triplets = [],
     version = 4;
 // 00
 triplets[0] |= (version & 63) << 18;
 triplets[0] |= (donnees.d.lieu & 3) << 16;
 triplets[0] |= (donnees.a.statut & 1) << 15;
 triplets[0] |= (donnees.a.heros & 1) << 14;
 triplets[0] |= (donnees.a.cri_de_guerre & 3) << 12;
 triplets[0] |= (donnees.a.inspiration & 3) << 10;
 triplets[0] |= (donnees.a.dolmens & 15) << 6;
 triplets[0] |= (donnees.a.niveau & 63);
 // 01
 triplets[1] |= (donnees.a.artefacts[0] & 255) << 16;
 triplets[1] |= (donnees.a.artefacts[1] & 255) << 8;
 triplets[1] |= (donnees.a.tacticien & 3) << 6;
 triplets[1] |= (donnees.a.ecuyer & 3) << 4;
 triplets[1] |= (donnees.a.tireur_elite & 3) << 2;
 triplets[1] |= (donnees.a.commandant_infanterie & 3);
 // 02
 triplets[2] |= (donnees.a.artefacts[2] & 255) << 16;
 triplets[2] |= (donnees.a.artefacts[3] & 255) << 8;
 triplets[2] |= (donnees.a.logisticien & 3) << 6;
 triplets[2] |= (donnees.a.harangueur & 3) << 4;
 triplets[2] |= (donnees.a.sapeur & 3) << 2;
 triplets[2] |= (donnees.a.massacreur & 3);
 // 03
 triplets[3] |= (donnees.a.artefacts[4] & 255) << 16;
 triplets[3] |= (donnees.a.artefacts[5] & 255) << 8;
 triplets[3] |= (donnees.a.instinct[0] & 3) << 6;
 triplets[3] |= (donnees.a.expert[0] & 3) << 4;
 triplets[3] |= (donnees.a.instinct[1] & 3) << 2;
 triplets[3] |= (donnees.a.expert[1] & 3);
 // 04
 triplets[4] |= (donnees.a.artefacts[6] & 255) << 16;
 triplets[4] |= (donnees.a.artefacts[7] & 255) << 8;
 triplets[4] |= (donnees.a.instinct[2] & 3) << 6;
 triplets[4] |= (donnees.a.expert[2] & 3) << 4;
 triplets[4] |= (donnees.a.instinct[3] & 3) << 2;
 triplets[4] |= (donnees.a.expert[3] & 3);
 // 05
 triplets[5] |= (donnees.a.bonus_ecole[0] & 15) << 20;
 triplets[5] |= (donnees.a.bonus_ecole[1] & 15) << 16;
 triplets[5] |= (donnees.a.bonus_ecole[2] & 15) << 12;
 triplets[5] |= (donnees.a.bonus_ecole[3] & 15) << 8;
 triplets[5] |= (donnees.a.larmes & 31) << 3;
 triplets[5] |= (donnees.a.faction & 7);
 // 06
 triplets[6] |= (donnees.a.mhr.signe & 1) << 23;
 triplets[6] |= (donnees.a.mhr.valeur & 131071) << 6;
 triplets[6] |= (donnees.a.archetype & 15) << 2;
 triplets[6] |= (donnees.a.arcanes & 3);
 // 07
 triplets[7] |= (donnees.d.mhr.signe & 1) << 23;
 triplets[7] |= (donnees.d.mhr.valeur & 131071) << 6;
 triplets[7] |= (donnees.d.larmes & 31) << 1;
 triplets[7] |= (donnees.saison & 1); // 0 : saison 1, 1 : saison 2
 // 08
 triplets[8] |= (donnees.d.statut & 1) << 23;
 triplets[8] |= (donnees.d.heros & 1) << 22;
 triplets[8] |= (donnees.d.fortification & 3) << 20; // [ff] defense de cite
 triplets[8] |= (donnees.d.dolmens & 15) << 16;
 triplets[8] |= (donnees.d.forts & 7) << 13; // [FFF] defense de region
 triplets[8] |= (donnees.d.fort_principal & 1) << 12; // [P] fort principal
 triplets[8] |= (donnees.d.ralliement & 3) << 10;
 triplets[8] |= (donnees.d.inspiration & 3) << 8;
 triplets[8] |= (donnees.d.archetype & 15) << 4;
 triplets[8] |= (donnees.d.faction & 7) << 1;
 triplets[8] |= 1 ; // detection Jactari
 // 09
 triplets[9] |= (donnees.d.bonus_ecole[0] & 15) << 20;
 triplets[9] |= (donnees.d.bonus_ecole[1] & 15) << 16;
 triplets[9] |= (donnees.d.bonus_ecole[2] & 15) << 12;
 triplets[9] |= (donnees.d.bonus_ecole[3] & 15) << 8;
 triplets[9] |= (donnees.d.arcanes & 3) << 6;
 triplets[9] |= (donnees.d.niveau & 63);
 // 10
 triplets[10] |= (donnees.d.artefacts[0] & 255) << 16;
 triplets[10] |= (donnees.d.artefacts[1] & 255) << 8;
 triplets[10] |= (donnees.d.tacticien_defenseur & 3) << 6;
 triplets[10] |= (donnees.d.ecuyer_defenseur & 3) << 4;
 triplets[10] |= (donnees.d.expert_tirs_barrage & 3) << 2;
 triplets[10] |= (donnees.d.inebranlable & 3);
 // 11
 triplets[11] |= (donnees.d.artefacts[2] & 255) << 16;
 triplets[11] |= (donnees.d.artefacts[3] & 255) << 8;
 triplets[11] |= (donnees.d.logisticien & 3) << 6;
 triplets[11] |= (donnees.d.bon_payeur & 3) << 4;
 triplets[11] |= (donnees.d.batisseur_fortifications & 3) << 2;
 triplets[11] |= (donnees.d.massacreur & 3);
 // 12
 triplets[12] |= (donnees.d.artefacts[4] & 255) << 16;
 triplets[12] |= (donnees.d.artefacts[5] & 255) << 8;
 triplets[12] |= (donnees.d.instinct[0] & 3) << 6;
 triplets[12] |= (donnees.d.expert[0] & 3) << 4;
 triplets[12] |= (donnees.d.instinct[1] & 3) << 2;
 triplets[12] |= (donnees.d.expert[1] & 3);
 // 13
 triplets[13] |= (donnees.d.artefacts[6] & 255) << 16;
 triplets[13] |= (donnees.d.artefacts[7] & 255) << 8;
 triplets[13] |= (donnees.d.instinct[2] & 3) << 6;
 triplets[13] |= (donnees.d.expert[2] & 3) << 4;
 triplets[13] |= (donnees.d.instinct[3] & 3) << 2;
 triplets[13] |= (donnees.d.expert[3] & 3);
 // 14-27
 for ( c in _camps )
 {
  if ( _camps.hasOwnProperty(c) )
  {
   for ( p = 1; p < 8; p++ )
   {
    u = donnees[_camps_abr[c]].troupes[p].unite;
    if ( u == -1 ) { u = 255; }
    triplets[13+p+(c*7)] |= (u & 255) << 16;
    triplets[13+p+(c*7)] |= (donnees[_camps_abr[c]].troupes[p].nombre & 65535);
   }
  }
 }
 // 28
 triplets[28] |= (donnees.a.sort[0].id & 63) << 18;
 triplets[28] |= (donnees.a.sort[0].tour & 15) << 14;
 triplets[28] |= (donnees.a.sort[1].id & 63) << 6;
 triplets[28] |= (donnees.a.sort[1].tour & 15) << 2;
 // 29
 triplets[29] |= (donnees.d.sort[0].id & 63) << 18;
 triplets[29] |= (donnees.d.sort[0].tour & 15) << 14;
 triplets[29] |= (donnees.d.sort[1].id & 63) << 6;
 triplets[29] |= (donnees.d.sort[1].tour & 15) << 2;
 // 30
 triplets[30] |= (donnees.a.butin_de_guerre & 15) << 20;
 triplets[30] |= (donnees.a.relever_les_morts & 15) << 16;
 triplets[30] |= (donnees.a.resistance_magique & 15) << 12;
 triplets[30] |= (donnees.a.moral_eleve & 15) << 8;
 triplets[30] |= (donnees.a.resurrection & 15) << 4;
 triplets[30] |= (donnees.a.tir_de_barrage & 15);
 // 31
 triplets[31] |= (donnees.a.heros_superieur & 15) << 20;
 triplets[31] |= (donnees.a.maitrise_des_sorts & 15) << 16;
 triplets[31] |= (donnees.a.revelation_de_caracteristiques & 15) << 12;
 triplets[31] |= (donnees.d.butin_de_guerre & 15) << 8;
 triplets[31] |= (donnees.d.relever_les_morts & 15) << 4;
 triplets[31] |= (donnees.d.resistance_magique & 15);
 // 32
 triplets[32] |= (donnees.d.moral_eleve & 15) << 20;
 triplets[32] |= (donnees.d.resurrection & 15) << 16;
 triplets[32] |= (donnees.d.tir_de_barrage & 15) << 12;
 triplets[32] |= (donnees.d.heros_superieur & 15) << 8;
 triplets[32] |= (donnees.d.maitrise_des_sorts & 15) << 4;
 triplets[32] |= (donnees.d.revelation_de_caracteristiques & 15);
 // 33
 triplets[33] |= (donnees.a.classement_voies & 7) << 21; // voir en-dessous de la fonction
 triplets[33] |= (donnees.d.classement_voies & 7) << 18;
 triplets[33] |= (donnees.a.malus_attaque & 63) << 12;
 
 // Codage base 64
 code = '';
 for ( t = 0; t < 33; t++ )
 {
  code += _base64.charAt((triplets[t] >> 18) & 63);
  code += _base64.charAt((triplets[t] >> 12) & 63);
  code += _base64.charAt((triplets[t] >> 6) & 63);
  code += _base64.charAt((triplets[t]) & 63);
 }
 code += _base64.charAt((triplets[33] >> 18) & 63);
 code += _base64.charAt((triplets[33] >> 12) & 63);
 return code;
}

function launch_jactari(frame)
{
 var hero, skills, k, skill, spells, spell, units, unit, pos, list, content,
     n = API.DOM.getById('VR_jactari'),
     donnees = nouveau_combat();

 try {
  donnees.saison = H.player.content.worldSeasonNumber==2 ? 1 : 0;
  hero = (frame.linkedHero || frame.hero || frame.selectedHero).content;
  convert_hero(donnees.a, hero);
 } catch(err) {}

 try {
  skills = hero.heroBonuses.skills.local;
  for ( k = 0; k < skills.length; k++ )
  {
   skill = skills[k];
   convert_skill(donnees.a, skill);
  }
 } catch(err1) {}

 try {
  convert_artefact_list(donnees.a, hero.heroBonuses.artefacts.local);
 } catch(err2) {}

 try {
  spells = frame.RoundSpellStackList.elementList;
  for ( k = 0; k < spells.length; k++ )
  {
   spell = spells[k].content;
   // TODO : ca sert a rien le convert_spell. Parce que (a verifier)  convert_spell["ICE_BOLT"] === "ICE_BOLT"
   donnees.a.sort[k].id = convert_spell[ spell.spellEntityTagName ];
   donnees.a.sort[k].tour = spell.roundPosition;
  }
 } catch(err3) {}

 try {
  units = (frame.attackerUnitStackList || frame.heroUnitStackList || hero.unitStackList).elementList;
  for ( k = 0; k < units.length; k++ )
  {
   unit = units[k].content;
   donnees.a.troupes[unit.stackPosition] = convert_unit(unit);
  }
 } catch(err4) {}

 try {
  units = (frame.defenderUnitStackList || frame.npcUnitStackList).elementList;
  for ( k = 0; k < units.length; k++ )
  {
   unit = units[k].content;
   pos = unit.powerPosition || unit.stackPosition;
   donnees.d.troupes[pos] =  convert_unit(unit);
  }
 } catch(err5) {}

 try {
  list = frame.content.scoutingResultList;
  if ( list && list.length >= 1 )
  {
   // todo : pour choisir la reco, utiliser scoutingLevel ou creationDate
   content = list[0].contentJSON;
   donnees.d.statut = 1;
   if ( content.cityFortificationTagName ) {
    donnees.d.fortification= convert_fortification[content.cityFortificationTagName];
   }
   if ( content.heroList && content.heroList.length >= 1 )
   {
    // select hero with maximum defense
    hero =  content.heroList[0];
    content.heroList.forEach(function(item){ if ( item.defense > hero.defense ) { hero = item; } });
    convert_hero(donnees.d, hero);
    try {
     convert_artefact_list(donnees.d, hero.artefactList);
    } catch(err6) {}
   }
  }
 } catch(err7) {}

 n.href = URL.jactari + '?info='+ encode_donnees_combat(donnees);
 return true;
}
function init()
{
 function cb(retour)
 {
  var n, type, frame = this, c = frame.getChildElement('Defender'), cE = API.DOM.createElement,
   delay, delay_halte_nuit = 0, dNow = new Date(), dHalte = new Date(), dDiff = new Date(),
   // pillage 10 minutes de delai, attaque 0 minutes de delai
   delays = {HERO_SIEGE_REGION:[0,false],HERO_PILLAGE_ZONE:[10*100,true],HERO_ATTACK_REGION:[0,true]};
  if ( c )
  {
   n = API.DOM.getById('VR_jactari'); if ( n ) { n.parentNode.removeChild(n); }
   n = cE('A', {id:'VR_jactari', href:URL.jactari, target:'_blank', title:i18n('simulateFight')});
   n.addEventListener('click', function(E) { return launch_jactari(frame); }, true);
   c.appendChild(n);
  }
//   if ( (type=this.options) && (type=type.refreshableParams) && (type=type.battleType) && (type in delays) && (c=this.getChildElement('DurationTime')) && (c=c.parentNode) )
//   {
//    API.DOM.removeFromParent('VRImpactFight');
//    if ( dNow.getHours() >= 23 || dNow.getHours() <= 9 )
//    {
//     if ( dNow.getHours() > 23 ) { dHalte.setDate(dHalte.getDate()+1); }
//     dHalte.setHours(9); dHalte.setMinutes(0); dHalte.setSeconds(0); dHalte.setMilliseconds(0);
//     dDiff.setTime(dHalte.getTime()-dNow.getTime());
//     delay_halte_nuit = dDiff.getTime() / 1000; // en secondes
// // API.log('delay halte : ' + delay_halte_nuit);
// // var timediff = dDiff.getTime();
// // var weeks = Math.floor(timediff / (1000 * 60 * 60 * 24 * 7));
// // timediff -= weeks * (1000 * 60 * 60 * 24 * 7);
// // var days = Math.floor(timediff / (1000 * 60 * 60 * 24));
// // timediff -= days * (1000 * 60 * 60 * 24);
// // var hours = Math.floor(timediff / (1000 * 60 * 60));
// // timediff -= hours * (1000 * 60 * 60);
// // var mins = Math.floor(timediff / (1000 * 60));
// // timediff -= mins * (1000 * 60);
// // var secs = Math.floor(timediff / 1000);
// // timediff -= secs * 1000;
// // API.log(weeks + " weeks, " + days + " days, " + hours + " hours, " + mins + " minutes, and " + secs + " seconds");
//    }
//    delay = this.content.duration[0] - delays[type][0] - delay_halte_nuit;
//    if ( delays[type][1] ) { delay /= 2; }
//    delay = delay_halte_nuit + H.worldMap.getRemoteTimestamp() + delay;
//    delay = H.DateUtils.timestampToString(delay, H.DATEUTILS_TIME_FORMAT_DATE_HMS);
//    c.appendChild(cE('DIV', {id:'VRImpactFight', innerHTML:i18n('battleImpactAt', delay)}, {textAlign:'right'}));
//   }
  return retour;
 }
 H.BattlePrepFrame.prototype.display = API.injectAfter(H.BattlePrepFrame.prototype.display, cb);
 H.ZoneBuildingPortalUpgradeFrame.prototype.display = API.injectAfter(H.ZoneBuildingPortalUpgradeFrame.prototype.display, cb);
}
return {init:init};
}());

//**************************
// Hutte d'ermite
//**************************
function enhanceHermitHut()
{
 function cb(R)
 {
  var eligibles = [], xp, i, heroes, h, child, pere, tbl, tbody, row, cell, mult = this.content.zoneBuilding.xpMultiplicator, id = 'VRHermitHut';
  API.DOM.removeFromParent(id);
  if ( (child=this.getChildElement('Title')) && (pere=child.parentNode) && (heroes=H.elementPool.get('Hero')) && (heroes=heroes.values()) )
  {
   API.CSS.remove('center', pere);
   for ( i = 0; i < heroes.length; i++ )
   {
    if ( (h=heroes[i]) && (h=h.content) && !('capture_playerId' in h) && (xp=Math.floor(h.lastCombatXpGain * mult)) && xp > 0 )
    {
     eligibles.push({n:h.name,xp:xp});
    }
   }
   eligibles.sort(function(a,b) { if ( a.xp != b.xp ) { return b.xp - a.xp; } a = a.n.toUpperCase(); b = b.n.toUpperCase(); if ( a > b ) { return 1; } if ( a < b ) { return -1; } return 0; });
   if ( eligibles.length > 0 )
   {
    child.innerHTML = i18n('HerosEligibles');
    tbody = cE('TBODY');
    tbl = pere.appendChild(cE('TABLE', {width:'100%', border:0, cellSpacing:0, cellPadding:0, id:id, childs:[tbody]}));
    for ( i = 0; i < eligibles.length; i++ )
    {
     row = tbody.insertRow(-1);
     cell = row.insertCell(-1); cell.innerHTML = eligibles[i].n;
     cell = row.insertCell(-1); cell.width = '100%'; cell.innerHTML = eligibles[i].xp + ' xp';
    }
   } else { child.innerHTML = i18n('HerosEligiblesNone'); }
  }
  return R;
 }
 H.ZoneBuildingHermitHutUpgradeFrame.prototype.display = API.injectAfter(H.ZoneBuildingHermitHutUpgradeFrame.prototype.display, cb);
}

//**************************
// divers
//**************************
function addStyle()
{
 var head, css = [
// autocomplete
'#VRautocomplete { position:absolute; background-color:#ECE3D9; border:1px solid #50332B; z-index:100000000 }',
'#VRautocomplete>li { font:11px/13px arial; white-space:nowrap; cursor:pointer }',
'#VRautocomplete>li:nth-child(even) { background-color:#FFF }',
'#VRautocomplete>li:hover, #VRautocomplete>li:hover * { color:#FFFFFF; background-color:#634A33 }',

// debug
'#VRwin_debugtools .VRwinsub > div {cursor:pointer;white-space:nowrap}',
'#VRwin_debugtools .VRwinsub > div:hover { color:#FF7300 }',
'#VRDebugCount {position:absolute; top:50px; right:20px; width:375px; height:600px; border:1px solid black; background-color:white}',
'#VRDebugCount>div:first-child {background-color:black; color:white; text-align:center; cursor:pointer}',
'#VRDebugCount>div:first-child:hover {background-color:purple; color:white; text-align:center; cursor:pointer}',
'#VRDebugCount>div:last-child {white-space:nowrap; overflow:auto; color:black; font:10px/12px verdana}',
// generique
'body.cacher_heromovebig #VRwin_Visceral .VRMB-heroMove { opacity:0.5 }',
'body.cacher_heromovebig .VR_heroMove_big { display:none }',
// window
'.VRwin { position:absolute; background-color:#F8F9F4; border:1px solid #50332B; -webkit-box-shadow:4px 4px 5px rgba(0,0,0,0.5); box-shadow:4px 4px 5px rgba(0,0,0,0.5); -moz-box-shadow:4px 4px 5px rgba(0,0,0,0.5)',
'         border-bottom-left-radius:5px; -moz-border-radius-bottomleft:5px; border-bottom-right-radius:5px; -moz-border-radius-bottomright:5px }',
'.VRwin > h1 { text-shadow:1px 1px 5px #000; font-size:11px; font-family:verdana; background-color:#50332B; color:#FF7300; padding:3px 0; margin:0; font-weight:bold; position:relative; line-height:16px }',
'.VRwin.draggable > h1 { cursor:move }',
'.VRwin > h1 > .VRwinclose { margin:1px; float:right; cursor:pointer; background-position:-42px 0; height:14px; width:14px; background-image:url('+URL.GM.img+'close_all_states.png) }',
'.VRwin:hover > h1 > .VRwinclose { background-position:0 0 }',
'.VRwin:hover > h1 > .VRwinclose:hover { background-position:-14px 0 }',
'.VRwin > h1 > .VRwinreduce { margin:1px 0; float:left; cursor:pointer; background-position:-42px 0; height:14px; width:14px; background-image:url('+URL.GM.img+'reducer.png); background-position:0 0 }',
'.VRwin:hover > h1 > .VRwinreduce:hover {  background-position:-14px 0 }',
'.VRwin > .VRwinResizer { overflow:auto }',
'.VRwin > .VRwinResizer span { float:right; cursor:nw-resize; padding-right:3px; padding-bottom:1px; height:10px; width:8px; background:url('+URL.GM.img+'resize.gif); background-repeat:no-repeat }',
'.VRwinsub { padding:3px; overflow:auto; position:relative }',
//'.VRwin.reduced .VRwinsub, .VRwin.reduced .VRwinResizer { display:none }',
'.VRwin.reduced .VRwinsub { height:0 !important; padding-top:0; padding-bottom:0; margin:0 }',
'.VRwin.reduced .VRwinResizer { display:none }',
// main
'#VRwin_Visceral:not(.ready) { display:none }',
'#VRwin_Visceral { background-color:transparent; border:0; border-bottom-left-radius:0; -moz-border-radius-bottomleft:0; border-bottom-right-radius:0; -moz-border-radius-bottomright:0 }',
'#VRwin_Visceral > h1 { z-index:2 }',
'#VRwin_Visceral .barres { z-index:1; cursor:pointer; white-space:nowrap }',
'#VRwin_Visceral .btn>span { display:block; width:17px; height:17px }',
'#VRwin_Visceral .pointers { z-index:3; position:absolute; width:23px; height:23px; background:url('+URL.GM.img+'menu/arrows.png) no-repeat }',
'#VRwin_Visceral.noarrows .pointers { display:none }',
'#VRwin_Visceral #barreN { width:21px }',
'#VRwin_Visceral #barreS { width:21px }',
'#VRwin_Visceral #barreE { height:17px }',
'#VRwin_Visceral #barreW { height:17px }',
'#VRwin_Visceral #barreN>div { width:21px; height:17px; background:url('+URL.GM.img+'menu/pierreV.png) repeat-y 0 0 }',
'#VRwin_Visceral #barreS>div { width:21px; height:17px; background:url('+URL.GM.img+'menu/pierreV.png) repeat-y -21px 0 }',
'#VRwin_Visceral #barreE>div { width:21px; height:17px; background:url('+URL.GM.img+'menu/pierreH.png) repeat-x 0 -17px }',
'#VRwin_Visceral #barreW>div { width:21px; height:17px; background:url('+URL.GM.img+'menu/pierreH.png) repeat-x 0 0 }',
'#VRwin_Visceral #barreN>div:hover { background-position:0 17px }',
'#VRwin_Visceral #barreS>div:hover { background-position:-21px -17px }',
'#VRwin_Visceral #barreE>div:hover { background-position:21px -17px }',
'#VRwin_Visceral #barreW>div:hover { background-position:-21px 0 }',
'#VRwin_Visceral #barreN .pointers { background-position:0 0; top:-23px }',
'#VRwin_Visceral #barreS .pointers { background-position:-23px 0; bottom:-23px; left:-1px }',
'#VRwin_Visceral #barreE .pointers { background-position:-69px 0; right:-23px; top:-3px }',
'#VRwin_Visceral #barreW .pointers { background-position:-46px 0; left:-23px; top:-3px }',
'#VRwin_Visceral #barreN .pointers:hover { background-position:0 -23px }',
'#VRwin_Visceral #barreS .pointers:hover { background-position:-23px -23px }',
'#VRwin_Visceral #barreE .pointers:hover { background-position:-69px -23px }',
'#VRwin_Visceral #barreW .pointers:hover { background-position:-46px -23px }',
'#VRwin_Visceral span.btn { width:21px; height:17px; overflow:hidden }',
'#VRwin_Visceral #barreN.closed>div.btn, #VRwin_Visceral #barreS.closed>div.btn, #VRwin_Visceral #barreE.closed>div.btn, #VRwin_Visceral #barreW.closed>div.btn { display:none }',
'#VRwin_Visceral #barreN>div.btn, #VRwin_Visceral #barreS>div.btn { display:block }',
'#VRwin_Visceral #barreE>div.btn, #VRwin_Visceral #barreW>div.btn { display:inline-block }',
'#VRwin_Visceral .VRMB-sentinelle { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:0 0 }',
'#VRwin_Visceral .VRMB-siege { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-21px 0 }',
'#VRwin_Visceral .VRMB-panneau { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-42px 0 }',
'#VRwin_Visceral .VRMB-heroMove { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-63px 0 }',
'#VRwin_Visceral .VRMB-stock { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-84px 0 }',
'#VRwin_Visceral .VRMB-guildes { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-105px 0 }',
'#VRwin_Visceral .VRMB-reperes { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-126px 0 }',
'#VRwin_Visceral .VRMB-notes { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-147px 0 }',
'#VRwin_Visceral .VRMB-cfg { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-168px 0 }',
'#VRwin_Visceral .VRMB-misc { background-image:url(' + URL.GM.img + 'menu/toolbar.png); background-position:-189px 0 }',
'#VRwin_Visceral #VRversion { white-space:nowrap }',
'#VRwin_Visceral .VR { color:#FF480B }',
'#VRwin_Visceral .VRVersion { color:white }',

'#VRwin_Visceral.menuFormat_dyn { }',
'#VRwin_Visceral.menuFormat_horiz { }',
'#VRwin_Visceral.menuFormat_vert { }',

'#VRwin_Visceral.menuFormat_dyn .barres { position:absolute }',
'#VRwin_Visceral.menuFormat_dyn > h1 { padding:0; background-color:transparent; background-image:url('+URL.GM.img+'menu/main.png); width:106px; height:79px }',
'#VRwin_Visceral.menuFormat_dyn > h1.update { background-image:url('+URL.GM.img+'menu/update.png) }',
'#VRwin_Visceral.menuFormat_dyn.ready > h1 { background-position:106px 0 }',
'#VRwin_Visceral.menuFormat_dyn #barreN { bottom:78px; left:33px }',
'#VRwin_Visceral.menuFormat_dyn #barreS { top:78px; left:33px }',
'#VRwin_Visceral.menuFormat_dyn #barreE { left:104px; top:33px }',
'#VRwin_Visceral.menuFormat_dyn #barreW { right:104px; top:25px }',
'#VRwin_Visceral.menuFormat_dyn #VRversion { font:9px/7px arial; position:absolute; top:35px; right:5px; background-color:rgba(0,0,0,0.7); padding:2px }',
'#VRwin_Visceral.menuFormat_dyn #VRcurTime { background-color:rgba(0,0,0,0.7); padding:2px; font:9px/8px arial; color:#FF480B; position:absolute; top:51px; left:30px; right:35px }',

'#VRwin_Visceral.menuFormat_horiz > h1, #VRwin_Visceral.menuFormat_vert > h1 { padding:0; background-image:url('+URL.GM.img+'menu/main_mini.png); width:34px; height:16px }',
'#VRwin_Visceral.menuFormat_horiz > h1 { float:left }',
'#VRwin_Visceral.menuFormat_horiz > h1.update, #VRwin_Visceral.menuFormat_vert > h1.update { background-image:url('+URL.GM.img+'menu/update_mini.png) }',
'#VRwin_Visceral.menuFormat_horiz #VRversion, #VRwin_Visceral.menuFormat_vert #VRversion { font:7px/7px arial; margin-left:4px }',
'#VRwin_Visceral.menuFormat_horiz #VRcurTime, #VRwin_Visceral.menuFormat_vert #VRcurTime { display:none }',

'#VRwin_Visceral.menuFormat_horiz #VRcurTime { display:block; white-space:nowrap;  background-color:rgba(0,0,0,0.7); padding:2px; font:11px arial; color:#FF480B; position:absolute; top:16px; left:0px;}',

'#VRwin_Visceral.menuFormat_vert > h1 { margin-left:-6px }',

// formulaire outils divers (distance,city,goto)
'#VRwin_misctools form, #VRwin_misctools form * { font:11px/13px arial }',
'#VRwin_misctools input[type=submit] { margin:0 5px 0 2px; vertical-align:middle; padding:0; border:0; cursor:pointer; width:13px; height:11px; background-image:url("' + H.IMG_URL + 'css_sprite/common.gif"); background-position:-82px 0 }',
'#VRwin_misctools input[type=submit]:hover { background-position:-82px -11px }',
'#VRFindCity { margin-bottom:5px }',
'#VRFindCity input[type=text] { width:100px; padding:0 }',
'#VRgoto { margin-bottom:5px }',
'#VRgoto input[type=text] { width:50px; text-align:center }',
'#VR_distanceContainer { }',
'#VR_distanceFrom, #VR_distanceTo { text-align:center; width:50px; padding:0; margin:0 3px }',

// Graber
'#VRwin_graber form, #VRwin_graber form * { font:11px/13px arial }',
'#VRwin_graber input[type=submit] { margin:0 5px 0 2px; vertical-align:middle; padding:0; border:0; cursor:pointer; width:13px; height:11px; background-image:url("' + H.IMG_URL + 'css_sprite/common.gif"); background-position:-82px 0 }',
'#VRwin_graber input[type=submit]:hover { background-position:-82px -11px }',
'#VRwin_graber #VR_Grab span.del { margin:3px; width:12px; height:12px; background-image:url(' + URL.GM.img + 'delete12x12.png); cursor: pointer; float: left; font-size: 11px; }',
'#VRwin_graber #VR_grab_form { background:#fff; border-bottom:1px solid #50332B; padding:2px 6px 6px 6px; margin:0 0 6px 0; font-size:11px;}',
'#VRwin_graber #VR_grab_show {padding:3px 0 0px 0; font-size:10px; text-align:left;}',
'#VRwin_graber .VR_Grab_table {width:100%; font-size:11px;}',
'#VRwin_graber .VR_Grab_table th{padding:1px 3px; text-align:left;}',
'#VRwin_graber .VR_Grab_table td{padding:1px 3px}',

// reperes
'#VRwin_reperes form { margin-bottom:5px }',
'#VRwin_reperes td { padding:0 }',
'#VRwin_reperes td > div { padding:2px }',
'#VR_addRepereName { width:100% }',
'#VR_addRepereX, #VR_addRepereY { width:40px; text-align:center  }',
'#VRwin_reperes input[type=submit] { margin:0 5px 0 2px; vertical-align:middle; padding:0; border:0; cursor:pointer; width:13px; height:11px; background-image:url("' + H.IMG_URL + 'css_sprite/common.gif"); background-position:-82px 0 }',
'#VRwin_reperes input[type=submit]:hover { background-position:-82px -11px }',
'#VR_reperes { list-style-type:none; margin-top:3px }',
'#VR_reperes > li { overflow:auto; line-height:18px }',
'#VR_reperes > li:nth-child(even) { background-color:#ECE3D9 }',
'#VR_reperes > li > span { cursor:pointer; font-size:11px; float:left }',
'#VR_reperes > li > span.del { margin:3px; width:12px; height:12px; background-image:url(' + URL.GM.img + 'delete12x12.png) }',
'#VR_reperes > li:hover, #VR_reperes > li:hover * { color:#FFFFFF; background-color:#634A33 }',
'#VR_reperes > li > span.coords { margin-right:3px; width:50px; text-align:center }',
// stocks
'#VRStocksReload { margin-right:5px; float:left; height:15px; width:15px; background-image:url('+URL.GM.img+'toolbar_sentinelle.png); background-position:-30px 0; cursor:pointer; border:1px solid #50332B }',
'#VRStocksReload:hover { border-color:#FFF2E5 }',
'#VRwin_stocks p { text-align:center; margin-top:10px }',
'#VRwin_stocks td span { margin:0 2px; width:20px; height:20px; display:inline-block; background-image:url(' + URL.GM.img + 'ressources.png); vertical-align:middle }',
'#VRwin_stocks span.GOLD { background-position:0 0 }',
'#VRwin_stocks span.WOOD { background-position:-20px 0 }',
'#VRwin_stocks span.ORE { background-position:-40px 0 }',
'#VRwin_stocks span.MERCURY { background-position:-60px 0 }',
'#VRwin_stocks span.CRYSTAL { background-position:-80px 0 }',
'#VRwin_stocks span.GEM { background-position:-100px 0 }',
'#VRwin_stocks span.SULFUR { background-position:-120px 0 }',
'#VRwin_stocks table.ressources { background-color:#875C4B; border:1px solid #543629; margin:auto }',
'#VRwin_stocks table.ressources td { padding:3px; border:0 }',
'#VRwin_stocks table.ressources td.image { vertical-align:top; margin-top:4px }',
'#VRwin_stocks table.ressources td.stock { color:#F4DC9C; font:11px/10px arial; font-weight:bold }',
'#VRwin_stocks table.ressources td.prod { color:#FFFFFF; font:9px/8px arial; min-width:20px }',
'#VRwin_stocks table.ressources td.borderLeft { border-left:1px solid #a49683 }',
'#VRwin_stocks table.ressources tr.borderTop td { border-top:1px solid #a49683 }',
// caravanes
'#VRwin_stocks table.caravans { border:1px solid #543629; margin-top:5px; width:100% }',
'#VRwin_stocks table.caravans td { padding:2px; border:0; font:11px/11px arial }',
'#VRwin_stocks table.caravans thead td { background-color:#634A33; color:#FFFFFF }',
'#VRwin_stocks table.caravans tbody tr.odd td { background-color:#ECE3D9 }',
'#VRwin_stocks table.caravans tr.liste td { padding:0 2px 0 0; text-align:left }',
'#VRwin_stocks table.caravans span { transform:scale(0.5); -moz-transform:scale(0.5); -webkit-transform:scale(0.5); margin:-3px 0 }',
'#VRwin_stocks table.caravans div { width:16px; height:17px; background-image:url('+URL.GM.img+'TimeLineCaravans.png) }',
'#VRwin_stocks table.caravans div.move { background-position:0 0 }',
'#VRwin_stocks table.caravans div.back { background-position:-16px 0 }',
'#VRwin_stocks table.caravans div.relay { background-position:-32px 0 }',
// sentinelle
'#VRwin_sentinelle h1 { line-height:17px }',
'#VRwin_sentinelle h1 span { margin-right:5px; float:left; height:15px; width:15px; background-image:url('+URL.GM.img+'toolbar_sentinelle.png); cursor:pointer; border:1px solid #50332B }',
'#VRwin_sentinelle h1 span:hover { border-color:#FFF2E5 }',
'#VRSentReload { background-position:-30px 0 }',
'#VRSentToggle.on { background-position:0 0 }',
'#VRSentToggle.off { background-position:-15px 0 }',
'#VRSentFilter { background-position:-45px 0 }',
'#VRSentFilterClear { background-position:-60px 0 }',
'#VRSentFiltres {}',
'#VRSentFiltres td { padding:2px }',
'#VRSentFiltres * { font-size:9px }',
'#VRSF_myself, #VRSF_myally { width:100% }',
'#VRSF_player, #VRSF_town, #VRSF_ally { width:140px }',
'#VRSF_townDest_op, #VRSF_townImpact_op, #VRSF_hero_op {}',
'#VRSF_townDest_val, #VRSF_townImpact_val, #VRSF_hero_val { width:50px }',
'#VRSentMouvements { width:100% }',
'#VRSentMouvements > tbody > tr > td { background-color:#F8F9F4; font-size:11px; line-height:13px; padding:0 1px }',
'#VRSentMouvements > tbody > tr:not(.previousSpots) > td { white-space:nowrap }',
'#VRSentMouvements > tbody > tr.title > td { color:#634A33; font-size:16px; line-height:16px; padding:8px 2px; font-weight:bold }',
'#VRSentMouvements > tbody > tr.odd > td { background-color:#ECE3D9 }', // background-image:url("' + H.IMG_URL + 'background/metal.jpg")
'#VRSentMouvements > tbody > tr:not(.title):not(.previousSpots):not(.blinker):hover > td { background-image:none; background-color:#634A33; color:#FFFFFF }',
'#VRSentMouvements > tbody > tr.previousSpots > td { padding:3px; background-color:#50332B; color:#F8F9F4 }',
'#VRSentMouvements > tbody > tr.previousSpots > td > span { cursor:pointer; color:#F8F9F4 }',
'#VRSentMouvements > tbody > tr.previousSpots > td > span:hover { color:yellow }',
'#VRSentMouvements > tbody > tr.previousSpots > td > span:first-child  { font-weight:bold; color:yellow }',
'#VRSentMouvements td.isNotOwn { font-weight:bold; color:#C30A1D }',
'#VRSentMouvements td.isOwn { color:#159607 }',
// sentinelle palier distances
'#VRSentMouvements tr.VRdistPalier140 {opacity:0.6}',
'#VRSentMouvements tr.VRdistPalier100 {opacity:0.7}',
'#VRSentMouvements tr.VRdistPalier50 {opacity:0.8}',
'#VRSentMouvements tr.VRdistPalier25 {opacity:0.9}',
'#VRSentMouvements tr.VRdistPalier0 {opacity:1}',
'#VRSentMouvements>tbody>tr:hover {opacity:1}',
// sentinelle blinking
'.blinking > div > div { border:2px solid black; margin-top:-2px; margin-left:-2px; border-radius:5px; -moz-border-radius:5px }',
'#VRSentMouvements > tbody > tr.blinker > td, #VRSentMouvements > tbody > tr.blinker > td * { background-color:black; color:white }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirN { background-position:0 -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirS { background-position:-13px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirE { background-position:-26px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirW { background-position:-39px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirNE { background-position:-52px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirSE { background-position:-65px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirNW { background-position:-78px -13px }',
'#VRwin_sentinelle tr.blinker .VR_dir div.dirSW { background-position:-91px -13px }',
// direction
'.VR_dir { white-space:nowrap }',
'.VR_dir div { vertical-align:top; display:inline-block; width:13px; height:13px; background-image:url('+URL.GM.img+'dir.png) }',
'.VR_dir div.dirN { background-position:0 0 }',
'.VR_dir div.dirS { background-position:-13px 0 }',
'.VR_dir div.dirE { background-position:-26px 0 }',
'.VR_dir div.dirW { background-position:-39px 0 }',
'.VR_dir div.dirNE { background-position:-52px 0 }',
'.VR_dir div.dirSE { background-position:-65px 0 }',
'.VR_dir div.dirNW { background-position:-78px 0 }',
'.VR_dir div.dirSW { background-position:-91px 0 }',
// hover direction dans Sentinelle
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirN { background-position:0 -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirS { background-position:-13px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirE { background-position:-26px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirW { background-position:-39px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirNE { background-position:-52px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirSE { background-position:-65px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirNW { background-position:-78px -13px }',
'#VRwin_sentinelle tr:not(.blinker):hover .VR_dir div.dirSW { background-position:-91px -13px }',
// taille d'une coordonnee X ou Y
'.VR_XY { width:25px }',
// distance dans villes
'.regionCity .VR_dir { margin-left:2px; font-size:10px; display:inline-block; line-height:13px; vertical-align:text-top }',
'.regionCity .VR_dir > div { vertical-align:text-bottom }',
// blocnotes
'#VR_notes { font-size:11px; position:absolute; top:0; left:0; width:100%; height:100%;background-color:#F8F9F4; border:0 }',
// boutons OUI/NON d'une fenetre
'.VR_buttons { padding:15px 0 0 0; text-align:center; clear:both }',
'.VR_buttons span { background-image:url("' + H.IMG_URL + 'css_sprite/Validation_Buttons.gif"); background-repeat:no-repeat; height:35px; width:74px; cursor:pointer; display:inline-block }',
'.VR_buttons span.VRoui { background-position:0 -3px }',
'.VR_buttons span.VRoui:hover { background-position:0 -43px }',
'.VR_buttons span.VRnon { background-position:-74px -3px }',
'.VR_buttons span.VRnon:hover { background-position:-74px -43px }',
// config
'#VRwin_config>h1 { padding-left:5px }',
'#VRcfg_PROFIL, #VRcfg_MARKET, #VRcfg_UBI { float:right; margin-left:250px }',
// todo : lolo rendre les noms des cles plus coherentes vrcfg vr_config
'#VRwin_config fieldset { width:265px; line-height:20px; margin:2px; padding:0 4px 4px 4px; border:1px solid #A88D79}',
'#VRwin_config fieldset legend { color:#FF7300; font-size:12px; font-weight:bold; margin:0 5px; padding:0 5px; font-variant:small-caps }',
'#VRwin_config fieldset .VR_small { font-size:80%; display:inline-block; line-height:11px; margin-left:15px }',
'#VRwin_config input[type="checkbox"] { vertical-align:text-top; margin-right:2px }',
'#VR_configuration_sentinelleDelay, #VR_configuration_sentinelleHistory, #VR_configuration_sentinelleForceServerDelay { width:40px }',
// cfg openonstart
'#VRcfg_openOnStartNotes, #VRcfg_openOnStartStocks, #VRcfg_openOnStartMisctools { margin-left:5px }',
// cfg profils
'#VRcfg_PROFIL > div { float:left }',
'#VRcfg_PROFIL > div > fieldset, #VRcfg_PROFIL > div > fieldset { width:126px; text-align:center }',
'#VRcfg_PROFIL span:hover { cursor:pointer; color:#FF7300 }',
// cfg.market
'#VRcfg_MARKET td { padding:1px 5px 0 2px }',
'#VRcfg_MARKET input { width:50px; text-align:center }',
// market auctions/requests
'.VR_inAlliance { background-color:#00BEEB; color:#FFFEFD }',
'.VR_goodBuySell { background-color:#C30A1D; color:#FFFEFD }',
// log
'#VR_log { z-index:10000000; position:absolute; top:10px; left:10px; background-color:white }',
'#VR_log * { font-family:sans-serif; font-size:10px }',
'#VR_log > div { }',
'#VR_log > div > div { cursor:pointer; background-color:yellow }',
'#VR_log > div ul { padding:0; margin:2px }',
'#VR_log > div > ul { width:430px; max-height:500px; overflow:auto }',
'#VR_log > div > ul ul { margin-left:20px }',
'#VR_log li.err { color:red } ',
'#VR_log span.VRlog_undefined { font-weight:bold; background-color:#888888; color:#FFFFFF; padding:0 5px }',
'#VR_log span.VRlog_null { background-color:#888888; color:#FFFFFF; padding:0 5px }',
'#VR_log span.VRlog_string { font-family:Monaco,monospace; color:red; white-space:pre }',
'#VR_log span.VRlog_boolean { color:#000000; font-weight:bold  }',
'#VR_log span.VRlog_number { color:#000088 }',
'#VR_log span.VRlog_function { font-family:Monaco,monospace; color:#FFCC00 }',
'#VR_log span.VRlog_object { color:DarkGreen; font-weight:bold }',
'#VR_log span.VRlog_array { color:#FF00FF; font-weight:bold }',
// mailer
'#VR_mailerFiltre { position:absolute; top:65px; left:130px }',
'#VR_mailerFiltre input { width:250px }',
'#VR_mailerFiltre span { margin:0 5px }',
'#VR_mailerFiltre span:hover {cursor:pointer; color:#FF7300 }',
// les panneaux affiches/masques
'body.cacher_panneaux #VRwin_Visceral .VRMB-panneau { opacity:0.5 }',
'body.cacher_panneaux .worldMapAlertImage_zoom1, body.cacher_panneaux .worldMapAlertImage_zoom2 { display:none }',
// les panneaux avec mots cles
'.worldMapAlertImage_zoom1.FRIGO { background-image:url('+URL.GM.img+'z1_panneau_bleu.png) }',
'.worldMapAlertImage_zoom2.FRIGO { background-image:url('+URL.GM.img+'z2_panneau_frigo.png) }',
'.worldMapAlertImage_zoom1.SIEGE { background-image:url('+URL.GM.img+'z1_panneau_rouge.png) }',
'.worldMapAlertImage_zoom2.SIEGE { background-image:url('+URL.GM.img+'z2_panneau_siege.png) }',
'.worldMapAlertImage_zoom1.LEURRE { background-image:url('+URL.GM.img+'z1_panneau_rouge.png) }',
'.worldMapAlertImage_zoom2.LEURRE { background-image:url('+URL.GM.img+'z2_panneau_leurre.png) }',
'.worldMapAlertImage_zoom1.ATTAQUE { background-image:url('+URL.GM.img+'z1_panneau_rouge.png) }',
'.worldMapAlertImage_zoom2.ATTAQUE { background-image:url('+URL.GM.img+'z2_panneau_attaque.png) }',
'.worldMapAlertImage_zoom1.RECO { background-image:url('+URL.GM.img+'z1_panneau_vert.png) }',
'.worldMapAlertImage_zoom2.RECO { background-image:url('+URL.GM.img+'z2_panneau_reco.png) }',
'.worldMapAlertImage_zoom1.CANDIDAT { background-image:url('+URL.GM.img+'z1_panneau_cyan.png) }',
'.worldMapAlertImage_zoom2.CANDIDAT { background-image:url('+URL.GM.img+'z2_panneau_candidat.png) }',
// ressources
'.VRressource { width:20px; height:20px; background-image:url(' + URL.img + 'Ressources.gif) }',
'.VRressource.VR_GOLD { background-position:0 0 }',
'.VRressource.VR_WOOD { background-position:-20px 0 }',
'.VRressource.VR_ORE { background-position:-40px 0 }',
'.VRressource.VR_MERCURY { background-position:-60px 0 }',
'.VRressource.VR_CRYSTAL { background-position:-80px 0 }',
'.VRressource.VR_GEM { background-position:-100px 0 }',
'.VRressource.VR_SULFUR { background-position:-120px 0 }',
// AUTOSCAN - distances
'#VR_ASdist { padding:0 2px; overflow:hidden }',
'#VR_ASdist.nocolumn { margin:auto }',
'#VR_ASdist.column>div.VR_dir { float:left; width:105px }',
'#VR_ASdist>div.VR_dir>span.town { display:inline-block; width:70px; overflow:hidden; font-size:9px; text-align:left }',
'#VR_ASdist>div.VR_dir>div { }',
'#VR_ASdist>div.VR_dir>span.distance { text-align:right; display:inline-block; width:25px; overflow:hidden  }',
// recap guilde magie
'#MGuildSwitchMode { margin-right:5px; float:left; height:15px; width:15px; background-image:url('+URL.GM.img+'toolbar_guildes.png); cursor:pointer; border:1px solid #50332B }',
'#MGuildSwitchMode:hover { border-color:#FFF2E5 }',
'#VRwin_magicalGuild .VRwinsub.byTypes { overflow:hidden }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child { position:absolute; top:0; bottom:0; left:0; width:215px; border-right:1px solid #000; overflow:auto }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:last-child { position:absolute; left:216px; right:0; top:0; bottom:0; xbackground-color:orange; overflow:auto }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child>h1 { clear:both; overflow:hidden; height:43px; line-height:43px; padding:4px 5px; margin:0 }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child>h1>div { float:left }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child>h1>span { margin-left:5px; font-size:14px; vertical-align:middle; color:white }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child>ul { padding:3px; overflow:auto }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:first-child>ul>li { cursor:pointer; margin:5px 3px; float:left; border:1px solid #210132; background-color:#210132; border-radius:40px; -moz-border-radius:40px }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:last-child>h1 { clear:both; overflow:hidden; height:43px; line-height:43px; padding:4px 5px; margin:0 }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:last-child>h1>div { margin:5px 3px; float:left; border:1px solid #210132; background-color:#210132; border-radius:40px; -moz-border-radius:40px }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:last-child>h1>span { margin-left:5px; font-size:12px; vertical-align:middle; color:#50332B }',
'#VRwin_magicalGuild .VRwinsub.byTypes > div:last-child>p { padding:3px }',
'#VRwin_magicalGuild .VRwinsub.byTowns { padding:0 }',
'#VRwin_magicalGuild .VRwinsub.byTowns h1 { font:bold 12px/14px arial; margin:0; padding:3px; color:#50332B; background-image:url("' + H.IMG_URL + 'background/metal.jpg") }',
'#VRwin_magicalGuild .VRwinsub.byTowns h1>div { margin-left:5px; display:inline-block; font-weight:normal; font-size:10px }',
'#VRwin_magicalGuild .VRwinsub.byTowns ul { padding:3px; overflow:auto }',
'#VRwin_magicalGuild .VRwinsub.byTowns ul>li { margin:5px 3px; float:left; border:1px solid #210132; background-color:#210132; border-radius:40px; -moz-border-radius:40px }',
// lien jactari
'#VR_jactari { position:absolute; top:60px; left:363px; width:16px; height:17px; background-image:url('+ URL.GM.img +'jactari.png) }',
// sieges
'#VRListeSieges { width:100% }',
'#VRListeSieges td { font:normal 11px/13px arial; padding:1px 2px }',
'#VRListeSieges thead td { color:#FFF; background-color:black; color:white text-align:center; font-weight:bold }',
'#VRListeSieges tbody tr.odd > td { background-color:#ECE3D9 }',
'#VRListeSieges tbody tr:hover td { background-color:#634A33; color:#FFF }',
'#VRListeSieges td > div { cursor:pointer; width:20px; height:20px; background-image:url('+ URL.GM.img +'cities.png) }',
'#VRListeSieges td > div.f_HAVEN { background-position:0 0 }',
'#VRListeSieges td > div.f_ACADEMY { background-position:-20px 0 }',
'#VRListeSieges td > div.f_INFERNO { background-position:-40px 0 }',
'#VRListeSieges td > div.f_NECROPOLIS { background-position:-60px 0 }',
'#VRListeSieges td > div.f_SYLVAN { background-position:-80px 0 }',
'#VRListeSieges td > div.f_HAVEN_neutral { background-position:0 -20px }',
'#VRListeSieges td > div.f_ACADEMY_neutral { background-position:-20px -20px }',
'#VRListeSieges td > div.f_INFERNO_neutral { background-position:-40px -20px }',
'#VRListeSieges td > div.f_NECROPOLIS_neutral { background-position:-60px -20px }',
'#VRListeSieges td > div.f_SYLVAN_neutral { background-position:-80px -20px }',
'#VRListeSieges td > div.f_HAVEN_graal { background-position:0 -40px }',
'#VRListeSieges td > div.f_ACADEMY_graal { background-position:-20px -40px }',
'#VRListeSieges td > div.f_INFERNO_graal { background-position:-40px -40px }',
'#VRListeSieges td > div.f_NECROPOLIS_graal { background-position:-60px -40px }',
'#VRListeSieges td > div.f_SYLVAN_graal { background-position:-80px -40px }',
'#VRListeSieges td > div.f_HAVEN_neutral_graal { background-position:0 -60px }',
'#VRListeSieges td > div.f_ACADEMY_neutral_graal { background-position:-20px -60px }',
'#VRListeSieges td > div.f_INFERNO_neutral_graal { background-position:-40px -60px }',
'#VRListeSieges td > div.f_NECROPOLIS_neutral_graal { background-position:-60px -60px }',
'#VRListeSieges td > div.f_SYLVAN_neutral_graal { background-position:-80px -60px }',
// sieges.frame
'#VR_siegeFrameCoords { margin-right:5px; cursor:pointer }',
// sliderDuration
'.VRsliderDuration { position:absolute; bottom:40px; right:10px; text-align:center; width:75px; padding:5px 3px; border-radius:5px; -moz-border-radius:5px; border:1px solid #544123; background-color:#D3BFA2  }',
// realImproveCost
'#VRrealImproveCost { padding:2px; background-color:#D3BFA2; border:1px solid #544023; text-align:center }',
'#VRrealImproveCost .VRressource { margin:0 2px; vertical-align:middle; display:inline-block }',
// chat
'.VRchatcoords { cursor:pointer;color:white;background-color:#A88D79 }',
'.VRchatcoords:hover { color:white;background-color:black }',
'.VRcompactedChat ul.chatsystemspeaklist li { line-height:12px; font-size:11px; border-bottom:0 }',
'.VRcompactedChat ul.chatsystemspeaklist li:nth-child(even) { background-color:#ECE3D9 }',
'.VRcompactedChat .chatsystemspeaklist .chatsystemptypeicon, .VRcompactedChat .chatlatestmessage .chatsystemptypeicon { margin-top:3px }',
'.VRcompactedChat .chatsystemtime { float:left; margin-left:2px }',
'.VRcompactedChat a.VRchaturl:link, .VRcompactedChat a.VRchaturl:visited, .VRcompactedChat a.VRchaturl:active { color:inherit; background-color:#C4E1FF; text-decoration:underline }',
'.VRcompactedChat a.VRchaturl:hover { background-color:black; color:white }',
// hutte d'hermite
'#VRHermitHut tr td { padding:2px; white-space:nowrap }',
// mainHero
'.VRMainHero .heroImageBox .borderBrown1,',
'.VRMainHero .heroBusyView .borderBrown1,',
'.VRMainHero .heroCapturedView .borderBrown1 { border-color:red }',
// cfg check update
'#VR_configuration_checkUpdate:hover { cursor:pointer; color:#FF7300}',
// market auctions/requests
// '.VR_inAlliance { background-color:#00BEEB; color:#FFFEFD }',
// '.VR_goodBuySell { background-color:#C30A1D; color:#FFFEFD }',
// importer profil local
'#VR_importer_input { width:390px; height:120px; margin:0 4px }',
// bouton customLink
'#VRcustomLink { width:32px; height:32px; cursor:pointer; float:left; margin:0 1px; background-image:url('+URL.GM.img+'customLink.png) }',
'#VRcustomLink:hover { background-position:0 -32px }',
'#VRcfg_customLink { width:100% }',
// ingame fix
'body .gameInterfaceHider { z-index:99998; opacity:0.5 }',
'body #ChatContainer { z-index:100000000 }',
'body .messageBoxFrameRecipientField { height:50px }'
];

 if ( (head=document.getElementsByTagName('HEAD')) && (head=head[0]) )
 {
  head.appendChild(cE('STYLE', {type:'text/css', childs:[cTN(css.join(''))]}));
 }
}

function showDebugTools()
{
 function oncreate()
 {
  var n = cE('DIV', {innerHTML:'HOMMK'});
  n.addEventListener('click', function() { API.dump(H, 'HOMMK'); }, true);
  this.subNode.appendChild(n);
  n = cE('DIV', {innerHTML:'localStorage'});
  n.addEventListener('click',
   function()
   {
    var max, i, k, item, r = {};
//  max = localStorage.length;
    max = 1000;
    for ( i = 0; i < max; i++ )
    {
     try {k = localStorage.key(i);
     item = localStorage.getItem(k);
     r[k] = item;} catch(ex) {}
    }
    API.dump(r, 'localStorage content');
   }, true);
  this.subNode.appendChild(n);
  n = cE('DIV', {innerHTML:'l10n not used'});
  n.addEventListener('click',
   function()
   {
    var k, d = [], all = l10n, used = DEBUG_l10n;
    for ( k in all ) { if ( all.hasOwnProperty(k) && used.indexOf(k) == -1 ) { d.push(k); } }
    API.dump(d,'l10n not used : ('+d.length+')');
   }, true);
  this.subNode.appendChild(n);
  n = cE('DIV', {innerHTML:'l10n unknown'});
  n.addEventListener('click', function() { API.dump(UNKNOWN_l10n,'l10n unknown : ('+UNKNOWN_l10n.length+')'); }, true);
  this.subNode.appendChild(n);

  n = cE('SELECT', {childs:[new Option('sendToVRDB XHR','XHR'), new Option('sendToVRDB POST','POST')]});
  n.addEventListener('change', function(){sendToVRDB_normalMode = this.value == 'XHR';}, true);
  this.subNode.appendChild(n);
 }
 alerter = (function() { var a = true; return function(T) { if ( a ) { a = window.confirm(T); } }; }());
 debugCount = function(txt)
 {
  var n, p = gBI('VRDebugCount'), tmp = [], id = 'VR' + txt.replace(/[^0-9a-z]/gi, '-');
  if ( !p )
  {
   p = document.body.appendChild(cE('DIV', {id:'VRDebugCount'}));
   n = p.appendChild(cE('DIV', {innerHTML:'RESET'}));
   n.addEventListener('click', debugCount.reset, true);
   n = p.appendChild(cE('DIV'));
  }
  n = p.lastChild;
  if ( !(id in debugCount.counters) ) { debugCount.counters[id] = {t:txt,v:0}; }
  debugCount.counters[id].v++;
  for ( id in debugCount.counters ) { if ( debugCount.counters.hasOwnProperty(id) ) { tmp.push(debugCount.counters[id].t + ' = ' + debugCount.counters[id].v); } }
  n.innerHTML = tmp.join('<br>');
 };
 debugCount.counters = {};
 debugCount.reset = function() { debugCount.counters = {}; };
 Window.MANAGER.create('debugtools',{ title:'DEBUG', closeable:false, reduceable:false, width:160,height:90,top:740,left:500 }, { oncreate:oncreate }).show();
}

// todo : trouver l'element cache qui fait que quand le hero principal fait une attaque, il n'est plus identifie comme tel.
function makeMainHeroMoreVisible()
{
 var i, pool = H.elementPool.get('Hero');
 if ( pool && (pool=pool.values()) )
 {
  for ( i = 0; i < pool.length; i++ )
  {
   if ( pool[i].content.isMainHero ) { API.CSS.add('VRMainHero', pool[i].mainElement); break; }
  }
 }
}

//**************************
// Autocomplete
//**************************
AUTOCOMPLETE = (function(){
var container, toid, current = {values:[],options:{}}, uid=0;
function hideContainer() { API.DOM.removeFromParent(container); }
function KO(R)
{
 API.DOM.flush(container);
 container.appendChild(cE('LI', {innerHTML:'Erreur de la reponse'}));
 container.appendChild(cE('LI', {innerHTML:'responseText' in R ? R.responseText : R}));
}
function OK(R)
{
 var i, li, tmp = XHR.parse(R);
 if ( tmp )
 {
  current.values = tmp;
  API.DOM.flush(container);
  for ( i = 0; i < tmp.length; i++ )
  {
   li = cE('LI', {id:'VRautocomplete-' + i + '-' + (uid++)});
   current.options.onshow(li, tmp[i]);
   container.appendChild(li);
  }
 }
 else { KO(R); }
}
function cancelTimer() { if ( toid ) { toid = clearTimeout(toid); } }
function startTimer(value)
{
 var k, tmp, opts, data = [];
 if ( (tmp=current.options.params) ) { for ( k in tmp ) { if ( tmp.hasOwnProperty(k) ) { data.push(k + '=' + tmp[k]); } } }
 data.push(current.options.sendKey + '=' + value);
 cancelTimer();
 current.values = [];
 toid = setTimeout(function()
                   {
                    cancelTimer();
                    opts = { method:'GET', url:current.options.url + '?' + data.join('&'), headers:{ 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 'User-Agent':navigator.userAgent }, onload:OK, onerror:KO };
                    if ( current.options.method === 'POST' )
                    {
                     opts.method = 'POST';
                     opts.url = current.options.url;
                     opts.data = data.join('&');
                    }
                    XHR.send(opts);
                   }, 1000);
}
function clickUL(E)
{
 var id, t = API.EVT.getParentTarget(E, 'LI');
 if ( t && t.id && t.parentNode && container && t.parentNode.id === container.id && (id=t.id.split('-')) && id.length == 3 ) { current.options.onselect(current.values[id[1]]); hideContainer(); }
 if ( E ) { return API.EVT.stop(E); }
 return false;
}
function keyup(pere)
{
 return function(E)
 {
  var v, pos;
  if ( E.keyCode === 13 ) { cancelTimer(); return true; }
  if ( (v=pere.value) && (v.length>2) )
  {
   hideContainer();
   pos = API.DOM.getPos(pere);
   container = cE('UL', {id:'VRautocomplete'}, {left:pos.left+'px', minWidth:pos.width+'px',top:(pos.top+pos.height)+'px'});
   container.appendChild(cE('LI', {innerHTML:i18n('autocompleteInProgress')}));
   container.addEventListener('click', clickUL, true);
   document.body.appendChild(container);
   startTimer(v);
  }
  return true;
 };
}
function init(P/*arent*/, O/*ptions*/)
{
 P.addEventListener('keyup', keyup(P), true);
// P.addEventListener('blur', hideContainer, true);
 current = {values:[],options:O};
}
return {init:init};
}());
//**************************
// MISCTOOLS
//**************************
MISCTOOLS = (function(){
function submitGOTO(E)
{
 var x, y, xy = gBI('VRgotoXY').value.split(/[^0-9]+/g);
 if ( xy.length == 2 )
 {
  x = validatePosition(xy[0]);
  y = validatePosition(xy[1]);
  if ( x && y ) { GOTO(x, y, H.REGION_WORLDMAP_ZOOM_13X13); }
 }
 if ( E ) { return API.EVT.stop(E); }
 return false;
}
function frmGOTO()
{
 var div = cE('FORM', {id:'VRgoto', title:i18n('focusToXY')});
 div.addEventListener('submit', submitGOTO, true);
 div.appendChild(cTN(i18n('focusToXY')));
 div.appendChild(cE('INPUT', {id:'VRgotoXY', type:'text', value:getCurrentX() + ',' + getCurrentY()}));
 div.appendChild(cE('INPUT', {type:'submit', value:''}));
 return div;
}
function frmFindCity()
{
 var
  tmp = cE('INPUT', {type:'text', value:''}),
  input = cE('INPUT', {type:'hidden', id:'VR_regionNameAutocompleterResult', value:''}),
  submit = cE('INPUT', {type:'submit', value:''}),
  div = cE('FORM', {id:'VRFindCity', childs:[cTN(i18n('FindCityGoTo')),/*cE('BR'),*/cTN(' '),tmp,input,submit], title:i18n('FindCity')});
 function cbShow(li, ville) { li.innerHTML = ville[2]; }
 function cbSelect(ville) { input.value = ville[0]; tmp.value = ville[1]; }
 AUTOCOMPLETE.init(tmp, { url:H.JSON_REGIONCITYNAME_AUTOCOMPLETION_ACTION_URL, link:input, params:{worldId:worldId}, sendKey:'start', onshow:cbShow, onselect:cbSelect });
 div.addEventListener('submit',
  function(E)
  {
   var tmp, id = intval(gBI('VR_regionNameAutocompleterResult').value);
   if ( id && (tmp=H.getXYFromRegionNumber(id)) ) { GOTO(tmp.x, tmp.y, H.REGION_WORLDMAP_ZOOM_13X13); }
   if ( E ) { return API.EVT.stop(E); }
   return false;
  }, true);
 return div;
}

function frmDistanceCompute(E)
{
 var xy, dist, x1, y1, x2, y2, n = gBI('VR_distanceResult'), s = gBI('VR_distanceFrom'), c = gBI('VR_distanceTo');
 if ( n && s && c )
 {
  xy = s.value.split(/[^0-9]/g);
  if ( xy.length == 2 ) { x1 = validatePosition(xy[0]); y1 = validatePosition(xy[1]); }
  xy = c.value.split(/[^0-9]/g);
  if ( xy.length == 2 ) { x2 = validatePosition(xy[0]); y2 = validatePosition(xy[1]); }
  if ( x1 && y1 && x2 && y2 )
  {
   dist = getDistance(x1,y1,x2,y2,1);
   dist2 = getDistance(x1,y1,x2,y2,5);
   if ( dist > 0.1 ) { 
	n.innerHTML = i18n('sentinelleDistance', dist); 
	// vatokato start
	var vt1=getVTime(dist2,1);
	var vt2=getVTime(dist2,2);
	n.innerHTML += '<br/> C войском: '+vt1+'; Без войска: '+vt2;
	// \vatokato end	
   }
   else { n.innerHTML = ''; }
  }
  else { n.innerHTML = i18n('sentinelleDistance', '-'); }
 }
 if ( E ) { return API.EVT.stop(E); }
 return false;
}
function setDistanceCurrentView(retour, X,Y)
{
 var tmp, n;
 if ( !X || !Y ) { X = lastRegionX; Y = lastRegionY; }
 if ( typeof X == 'number' && typeof Y == 'number' )
 {
  n = gBI('VR_distanceFrom');
  tmp = X + ',' + Y;
  if ( n && tmp != n.value ) { n.value = tmp; frmDistanceCompute(); }
 }
 return retour;
}
function frmDistance()
{
 var div = cE('FORM', {id:'VR_distanceContainer', title:i18n('distanceCalculer')});
 div.addEventListener('submit', frmDistanceCompute, true);
 div.appendChild(cTN(i18n('distanceCalculer')));
 div.appendChild(cE('BR'));
 div.appendChild(cTN(i18n('distanceFrom')));
 div.appendChild(cE('INPUT', {id:'VR_distanceFrom', type:'text', value:''}));
 div.appendChild(cTN(i18n('distanceTo')));
 div.appendChild(cE('INPUT', {id:'VR_distanceTo', type:'text', value:''}));
 div.appendChild(cE('INPUT', {type:'submit', value:''}));
 div.appendChild(cE('SPAN', {id:'VR_distanceResult', innerHTML:i18n('sentinelleDistance', '-')}));
 setDistanceCurrentView();
 return div;
}
function createWin()
{
 function oncreate()
 {
  var sub = this.subNode;
  sub.appendChild(frmGOTO());
  sub.appendChild(frmFindCity());
  sub.appendChild(frmDistance());
 }
 H.WorldMap.prototype.center = API.injectAfter(H.WorldMap.prototype.center, setDistanceCurrentView);
 H.WorldMap.prototype.move = API.injectAfter(H.WorldMap.prototype.move, setDistanceCurrentView);
 Window.MANAGER.create('misctools', { title:i18n('titleMiscTools'), width:300, height:80 }, { oncreate:oncreate, reduced:true }).show();
} 
function toggle()
{
 var M = Window.MANAGER, w = M.get('misctools');
 if ( w ) { w.toggle(); } else { createWin(); }
}
return {toggle:toggle,setDistanceCurrentView:setDistanceCurrentView, show:createWin};
}());

//**************************
// Menu principal
//**************************
MAINMENU = (function(){
var toid, btns = [], actif = '', menuFormats = ['dyn', 'horiz', 'vert'];
function updateTimer()
{
	var n = gBI('VRcurTime'),v;
	var tLocal= H.DateUtils.timestampToString(H.DateUtils.getCurrentTimestamp(), H.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING);
	var tServ = H.DateUtils.timestampToString(H.worldMap.getRemoteTimestamp(), H.DATEUTILS_TIME_FORMAT_LOCALE_TIME_STRING);
	var tDelta=H.worldMap.getRemoteTimestamp() - H.DateUtils.getCurrentTimestamp();
	v='<span style="font-size:9px; color:#828282" title="Время расчитывается из наибольшего (выделенное)">';
if(tDelta>0){
	tDelta='+'+tDelta;
	v +='<span>'+ tLocal +'</span>';
	v +='<span style="padding-left:5px;">сервер:<span style="font-size:11px; font-weight:bold; color:#FF480B;">'+ tServ +'</span></span>';
	}
else {
	v +='<span style="font-size:11px; font-weight:bold; color:#FF480B;">'+ tLocal +'</span>';
	v +='<span style="padding-left:5px;">сервер:<span>'+ tServ +'</span></span>';
}
	v +='<span style="padding-left:2px;">('+tDelta+' c.)</span>';
	v +='</span>';
 
	if ( n ) { n.innerHTML = v; }
	return v;
}
function stopTimer() { if ( toid ) { toid = clearInterval(toid); } }
function startTimer() { stopTimer(); toid = setInterval(updateTimer, 100); }
function addBtn(id, opt)
{
 var k, b, d, s, w = Window.MANAGER.get('Visceral'), cE = API.DOM.createElement;
 if ( w )
 {
  id = 'VRMB-' + id;
  b = {id:id,cb:NOOP};
  if ( opt && ('cb' in opt) && typeof opt.cb === 'function' ) { b.cb = opt.cb; }
  btns.push(b);
  b = w.barres;
  for ( k in b ) { if ( b.hasOwnProperty(k) )
  {
   s = cE('SPAN', {id:id+k, className:id});
   d = cE('DIV', {className:'btn', childs:[s]});
   if ( opt && ('title' in opt) ) { d.title = opt.title; }
   if ( k == 'N' || k == 'W' ) { b[k].insertBefore(d, b[k].firstChild); }
   else { b[k].appendChild(d); }
  } }
 }
}

function setActif(sens, forced)
{
 var k,b,w = Window.MANAGER.get('Visceral'), CSS = API.CSS;
 if ( w )
 {
  if ( actif ) { CSS.add('closed', w.barres[actif]); }
  if ( actif == sens && !forced ) { actif = ''; }
  else
  {
   CSS.remove('closed', w.barres[sens]);
   actif = sens;
  }
  API.localStorage.set(idScript,'activeBrancheMainMenu',actif);
 }
}
function onclickBarre(E)
{
 var i, id, div, EVT = API.EVT, has = API.CSS.has, span = EVT.getParentTarget(E, 'SPAN');
 if ( span )
 {
  if ( span.className === 'pointers' )
  {
   if ( (div=span.parentNode) && has('barres', div) && div.id && (id=div.id.charAt(5)) ) { setActif(id); }
  }
  else if ( has('btn', span.parentNode) && span.className )
  {
   for ( i = btns.length; i--; ) { if ( btns[i].id == span.className ) { btns[i].cb.call(span); break; } }
  }
  return EVT.stop(E);
 }
 return true;
}
function applyMenuFormat()
{
 var i, m, t, w = Window.MANAGER.get('Visceral'), menuFormat = menuFormats[API.localStorage.value(idScript, 'menuFormat', 0)], CSS = API.CSS;
 stopTimer();
 if ( w && (m=w.mainNode) && (t=w.titleNode) && API.CSS.has('ready', m) )
 {
  for ( i = menuFormats.length; i--; ) { CSS.remove('menuFormat_' + menuFormats[i], m); }
  if ( menuFormat == 'horiz' || menuFormat == 'vert' )
  {
	startTimer();
   CSS.add('noarrows', m);
   setActif(menuFormat == 'horiz' ? 'E' : 'S', true);
  }
  else
  {
   startTimer();
   CSS.remove('noarrows', m);
  }
  CSS.add('menuFormat_' + menuFormat, m);
 }
 else { setTimeout(applyMenuFormat, 1000); }
}
function ready()
{
 var t, m, w = Window.MANAGER.get('Visceral');
 if ( w && (m=w.mainNode) && (t=w.titleNode) )
 {
  API.CSS.remove('noarrows', w.mainNode);
  actif = API.localStorage.value(idScript, 'activeBrancheMainMenu', '');
  if ( actif !== '' ) { API.CSS.remove('closed', w.barres[actif]); }
  API.CSS.add('ready', m);
  API.CSS.show(t);
  applyMenuFormat();
 }
}
function init()
{
 function oncreate()
 {
  var i, n = this.mainNode, t = this.titleNode, cE = API.DOM.createElement, w = H.worldMap, d = w.refreshLocalTime - w.refreshRemoteTime;
  function barre(sens)
  {
   var arrow = cE('SPAN', {className:'pointers'}), div = cE('DIV', {id:'barre'+sens,className:'barres closed', childs:[arrow]});
   div.addEventListener('click', onclickBarre, true);
   return n.appendChild(div);
  }
  API.CSS.hide(t);
  n.removeChild(this.subNode);
  API.CSS.add('noarrows', n);
  this.subNode = null;
  t.appendChild( cE('A', {href:URL.domain, target:'_blank', id:'VRversion', childs:[cE('SPAN', {className:'VR', innerHTML:'V&R'}), API.DOM.createTextNode(' '), cE('SPAN', {className:'VRVersion', innerHTML:VERSION})]} ));
  t.appendChild( cE('SPAN', { id:'VRcurTime', innerHTML:updateTimer(),
                              title:i18n('remoteTimeDelta', (d<0?'+':'-') + H.DateUtils.durationToString(Math.abs(d), H.DATEUTILS_DURATION_FORMAT_MAX_UNIT)) } ) );
  this.barres = { N:barre('N'), S:barre('S'), E:barre('E'), W:barre('W') };
  addBtn('sentinelle', { cb:SENTINELLE.toggle, title:i18n('btnSentinelle') });
  addBtn('siege', { cb:SIEGES.toggle, title:i18n('btnSieges') });
  addBtn('misc', { cb:MISCTOOLS.toggle, title:i18n('btnMisc') });
  addBtn('panneau', { cb:PANNEAU.toggle, title:i18n('btnPanneaux') });
  addBtn('heroMove', { cb:HEROMOVE.toggle, title:i18n('btnDeplacement') });
  addBtn('stock', { cb:STOCKS.toggle, title:i18n('btnStock') });
  addBtn('guildes', { cb:MAGICAL_GUILD.toggle, title:i18n('btnGuildes') });
  addBtn('reperes', { cb:REPERES.toggle, title:i18n('btnReperes') });
  addBtn('notes', { cb:NOTES.toggle, title:i18n('btnNotes') });
  addBtn('graber', { cb:GRAB.toggle, title:i18n('btnGraber') });
  addBtn('cfg', { cb:CONFIG.open, title:i18n('btnCfg') });
 }
 Window.MANAGER.create('Visceral',
                       { width:1, height:1, closeable:false, resizeable:false, reduceable:false },
                       { oncreate:oncreate, onshow:applyMenuFormat }).show();
 addEventListener('load', ready, true);
}
function getMenuFormats() { return menuFormats; }
return { init:init, applyMenuFormat:applyMenuFormat, addBtn:addBtn, getMenuFormats:getMenuFormats };
}());

function enhanceHalts()
{
 function cb(retour)
 {
  var pere, pool, child, div, node, html, found, region, x, y, id, tmp,
      hC = this.haltContent, masterMoveId = hC.masterHeroMoveId;
  if ( (pool=H.elementPool.get('HeroMove')) ) { pool.each(function(m,k){ if ( m.content.masterHeroMoveId == masterMoveId ) { found = m; } }); }
  if ( found )
  {
   found = found.content.masterHeroMove;
   if ( found && ( child = this.getChildElement('HaltingPlayerIconImage') ) )
   {
    tmp = CACHE.get('PlayerName', hC.playerId);
    if ( !tmp ) { CACHE.add('PlayerName', hC.playerId, hC.haltOwner); }
    if ( hC.allianceId )
    {
     tmp = CACHE.get('AllianceIdFromHeroId', hC.playerId);
     if ( !tmp ) { CACHE.add('AllianceIdFromHeroId', hC.playerId, hC.allianceId); }
    }
    pere = child.parentNode;
    id = 'VR_uniqueIdHaltHeroMove';
    if ( (div=gBI(id)) ) { div.parentNode.removeChild(div); }
    div = cE('DIV', {id:id, className:'floatLeft'});

    x = intval(found.x1); y = intval(found.y1);
    if ( x && y )
    {
     tmp = x+','+y;
     region = CACHE.get('TownName', tmp);
     if ( !region )
     {
      region = H.getRegionFromXY(x,y);
      region = region && 'content' in region && 'cN' in region.content ? region.content.cN : '';
     }
     if ( region ) { CACHE.add('TownName', tmp, region); }
     html = [i18n('haltStart'), region,
             ' (', x, ',', y, ')',
             ' (',
             H.DateUtils.timestampToString(this.getLocalTimestampFromRemote(found.startDate),H.DATEUTILS_TIME_FORMAT_LOCALE_STRING),
             ')'].join('');
     node = cE('DIV', {className:'Hoffset10', innerHTML:html}, {cursor:'pointer'});
     node.addEventListener('click', (function(X,Y){ return function(){ GOTO(X, Y, H.REGION_WORLDMAP_ZOOM_13X13); }; }(x,y)), true);
     div.appendChild(node);
    }

    x = intval(found.x2); y = intval(found.y2);
    if ( x && y )
    {
     tmp = x+','+y;
     region = CACHE.get('TownName', tmp);
     if ( !region )
     {
      region = H.getRegionFromXY(x,y);
      region = region && 'content' in region && 'cN' in region.content ? region.content.cN : '';
     }
     if ( region ) { CACHE.add('TownName', tmp, region); }
     html = [i18n('haltEnd'), region,
             ' (', x, ',', y, ')',
             ' (',
             H.DateUtils.timestampToString(this.getLocalTimestampFromRemote(found.endDate),H.DATEUTILS_TIME_FORMAT_LOCALE_STRING),
             ')'].join('');
     node = cE('DIV', {className:'Hoffset10', innerHTML:html}, {cursor:'pointer'});
     node.addEventListener('click', (function(X,Y){ return function(){ GOTO(X, Y, H.REGION_WORLDMAP_ZOOM_13X13); }; }(x,y)), true);
     div.appendChild(node);
    }

    pere.appendChild(div);
   }
  }
  return retour;
 }
 H.HaltFrame.prototype.displayHaltContent = API.injectAfter(H.HaltFrame.prototype.displayHaltContent, cb);
}

//**************************
// init principal
//**************************
function init()
{
 var errStructure, node, cible, p;
 if ( !API.localStorage.isActivated() ) { alert(i18n('errorLocalStorage')); return; }
 try { locale = H.locale != 'fr_FR' ? 'EN' : 'FR';	
// vatokato start
	if(H.locale == 'ru_RU') locale = 'RU'; 
	} catch(ex) {}
 errStructure = i18n('errStructure');
 var a;
 switch (locale) {
	case 'EN':
	a='fight';
	break;
	case 'RU':
	a='бой';
	break;
	default:
	a='combat';
 }
 URL.jactari += a;
// \vatokato end
// try {
//  worldId = H.player.content.worldId;
  worldId = H.player.get('worldId');
  UBI_userId = H.player.get('userId'); // id unique du compte
  playerId = H.player.get('id');
//  was : worldSize = H.worldMap.content._size;
  worldSize = H.worldMap.get('_size');
  allianceId = H.player.get('allianceId');
  allianceName = H.player.get('allianceName');
  if ( allianceName && allianceName !== '' )
  {
   if ( ( node = gBI('MainMenuContainer') ) && ( node = API.whitespace.firstChild(node) ) && ( API.CSS.has('gameVersion', node) ) )
   {
    node.innerHTML += ' | ' + allianceName;
   }
  }
// } catch(ex) {}
 if ( !worldId ) { alert(i18n('undefinedVariable', 'worldId')); return; }
 if ( !playerId ) { alert(i18n('undefinedVariable', 'playerId')); return; }
 if ( !worldSize ) { alert(i18n('undefinedVariable', 'worldSize')); return; }
 if ( !UBI_userId ) { alert(i18n('undefinedVariable', 'UBI_userId')); return; }

 addStyle();
 UBIfixes();
 CACHE.init();
 MY_CITIES.init();
 MY_ALLY.init();
 CONFIG.init();
 CHAT.init();
 enhanceSliders();
 enhanceHalts();
 SIEGES.init();
 enhanceTimeLineCaravans();
 enhanceVilles();
 enhanceRessourceStackTooltip();
 PANNEAU.init();
 HEROMOVE.init();
 enhanceMarketPlace();
 enhanceBuildingsConstruction();
 enhanceHermitHut();
 makeMainHeroMoreVisible();
 AUTOSCAN.init();
 JACTARI.init();
 MAILER.init();
 MAGICAL_GUILD.init();
 RAPPORTS.init();
 CUSTOMLINK.show();
 // verif MAJ
// GM_registerMenuCommand(i18n('checkCommandUpdate', VERSION), doUpdateCheck);
 updateCheck(false);

 // global ref
 H.VICES_ET_RALES = { VERSION:VERSION, API:API, URL:URL, CACHE:CACHE, UBI_SERVER:UBI_SERVER, WINDOW:Window.MANAGER, XHR:XHR, DELAIS:DELAIS, MY_ALLY:MY_ALLY,
                      assets:{idScript:idScript,locale:locale,worldId:worldId,UBI_userId:UBI_userId,playerId:playerId,allianceId:allianceId,allianceName:allianceName,worldSize:worldSize},
                      alerter:alerter, debugCount:debugCount, fixPosition:fixPosition, validatePosition:validatePosition, setSprite:setSprite,
                      getSendToVRDBMode:function(){ return sendToVRDB_normalMode; },
                      isDelayOver:isDelayOver,
                      i18n:i18n, addL10N:addL10N, setPlayersInMyAlly:MY_ALLY.force,
                      RESSOURCES:RESSOURCES, RESSOURCES_NO_GOLD:RESSOURCES_NO_GOLD, RESSOURCES_RARE:RESSOURCES_RARE, RESSOURCES_FACTION:RESSOURCES_FACTION,
                      addMainButton:MAINMENU.addBtn, plugAutoscan:AUTOSCAN.plug, plugConfig:CONFIG.plug, plugBackup:BACKUP.plug, plugRapports:RAPPORTS.plug,
                      addKeysExportBackup:BACKUP.addKeysExport };
 MAINMENU.init();
 onOpenStarters();
 if ( API.isMokhet() ) { showDebugTools(); }
}

return {init:init};
}());

document.addEventListener('DOMContentLoaded', VR.init, true);

} catch(ex) { alert('[VRPublic][UNKNOWN ERROR] '+ex); }
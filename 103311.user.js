// ==UserScript==
// @name           Barbing Power
// @version        0521
// @namespace      Floyd
// @homepage       http://userscripts.org/scripts/show/102352
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @description    Automated features for Kingdoms of Camelot
// @require        http://tomchapin.me/auto-updater.php?id=102352
// @resource 	   URL_CASTLE_BUT 		http://i.imgur.com/MPlZr.png
// @resource 	   URL_CASTLE_BUT_SEL 		http://i.imgur.com/XWR4B.png
// @resource 	   URL_PROVINCE_MAP 		http://i.imgur.com/VE48b.png
// ==/UserScript==


var Version = '0521';

// Options
var Options = {
  includeMarching:true,
  encRemaining : true,
  maxIdlePop   : false,
  fixMapDistance: true,
  fixMsgCount  : true,
  fixWarnZero  : true,
  enhanceARpts : true,
  allowAlterAR : true,
  enhanceMsging : true,
  enableFoodWarn : true,
  foodWarnHours : 24,
  enableFoodChatWarn : false,
  foodChatWarnHours : 1,
  lastVersion : null,
  hideOnGoto : true,
  currentTab : false,
  gmtClock : false,
  chatEnhance : true,
  fixKnightSelect : true,
  attackCityPicker : true,
  mapCoordsTop : true,
  dispBattleRounds : true,
  reportDeleteButton : true,
  srcAll  : true,
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  srcScoutAmt  : 1,
  minmight     : 500000,
  srcdisttype  : 'square',
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  friendlyOnly  : false,
  hostileOnly  : false,
  alliedOnly  : false,
  unalliedOnly  : false,
  neutralOnly  : false,
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : true,
  pbGoldHappy  : 95,
  pbGoldEnable : true,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: true,
  pbWideMap    : false,
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'10', atime:2 , spamstate:'a'},
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, minTroops:10000, spamLimit:10, lastAttack:0 },
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  giftDomains  : {valid:false, list:{}},
  giftDelete   : 'e',
  currentTab   : null,
  transportinterval : 60,
  minwagons		:100,
  lasttransport:0,
  reassigninterval: 60,
  lastreassign:0,
};

var GlobalOptions = {
  pbWatchdog   : true,
  pbWideScreen : true,
};

//Attack Options
var AttackOptions = {
  LastReport : 0,
  MsgEnabled: false,
  MsgInterval: 1,
  Method:"distance",
  SendInterval: 30,
  MaxDistance : 40,
  RallyClip : 0, 
  Running: false,
  BarbsFailedKnight: 0,
  BarbsFailedRP: 0,
  BarbsFailedTraffic: 0,
  BarbsFailedVaria:0,
  BarbsTried : 0,
  DeleteMsg:true,
  Foodstatus: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  MsgLevel: {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
  BarbsDone: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  BarbNumber: {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Levels: {1:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
  Troops: {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}},
  Distance : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750}
};
// Tab Orders
var toOverview = 1;
var toBuild = 2;
var toTrain = 3;
var toMarches = 4;
var toSearch = 5;
var toPlayers = 6;
var toGifts = 7;
var toKnights = 8;
var toReports = 9;
var toWilds = 10;
var toOptions = 11;
var toTower = 12;
var toInfo = 13;
var toMap = 14;
var toTest = 15;
var toWikia = 16;
var toSample = 17;
var toAttack = 18;
var toLog = 19;
var toBarb = 20;

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var DEBUG_BUTTON = true;
var DEBUG_TRACE_DRAG = false;
var DEBUG_TRACE_AJAX = false;
var DISABLE_BULKADD_LIST = false;
var DISABLE_POST_KNIGHT_SKILLS = false;
var DISABLE_POST_DEFENSES = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var ENABLE_GM_AJAX_TRACE = false;
var ENABLE_ALERT_TO_CHAT = false;
var ENABLE_TRADER_TAB = true;
var ENABLE_WILDS_TAB = true;
var ENABLE_KNIGHTS_TAB = true;
var ENABLE_INFO_TAB = true;
var ENABLE_WIKIA_TAB = true;
var SEND_ALERT_AS_WHISPER = false;
var ENABLE_INFO_TAB = false;
// End Test Switches

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var currentName = 'Overview';
var mainPop;
var pbStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';
var KOCversion = null;
var firefoxVersion = getFirefoxVersion();

var URL_CASTLE_BUT = GM_getResourceURL('URL_CASTLE_BUT');
var URL_CASTLE_BUT_SEL = GM_getResourceURL('URL_CASTLE_BUT_SEL');
var URL_PROVINCE_MAP = GM_getResourceURL('URL_PROVINCE_MAP');
var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};

var MAP_DELAY = 1000;

var DEFAULT_ALERT_SOUND_URL = 'http://media.freesound.org/data/25/previews/25032__sirplus__extreme_alarm_preview.mp3';
//var SWF_PLAYER_URL = 'http://www.fileden.com/files/2011/2/25/3086757/matSimpleSound01aXD.swf';
var SWF_PLAYER_URL = 'http://www.saylortribe.com/KOC/matSimpleSound01aXD.swf';

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));

var knightRoles = [
  ['Foreman', 'politics', 'Pol'],
  ['Marshall', 'combat', 'Com'],
  ['Alchemystic', 'intelligence', 'Int'],
  ['Steward', 'resourcefulness', 'Res'],
];

if(document.getElementById("mod_comm_list2"))
{ document.getElementById("mod_comm_list2").style.backgroundColor = '#fffce1';}
if(document.getElementById("mod_comm_list1"))
{ document.getElementById("mod_comm_list1").style.backgroundColor = '#fffce1';}

if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
  facebookInstance ();
  return;
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
    var iFrame = null;
    var e = document.getElementById('app_content_130402594779');
	if(e){
		e = e.firstChild.firstChild;
		for (var c=0; c<e.childNodes.length; c++){
		  if (e.childNodes[c].tagName=='SPAN' && e.childNodes[c].firstChild.className == 'canvas_iframe_util'){
			iFrame = e.childNodes[c].firstChild;
			break;
		  }
		}
	}
    if (!iFrame){
      var iframes = document.getElementsByTagName('iframe');
      for (var i=0; i<iframes.length; i++){
        if (iframes[i].className=='canvas_iframe_util'){
          iFrame = iframes[i];
          break;
        }
      }
    }
    if (!iFrame){
      setTimeout (setWide, 1000);
      return;
    }
    try{
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
      document.getElementById('sidebar_ads').parentNode.removeChild(document.getElementById('sidebar_ads'));
      document.getElementById('canvas_nav_content').parentNode.removeChild(document.getElementById('canvas_nav_content'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
    //document.getElementById('content').style.minWidth = '1230px'; 
	for(i=0; i<e.childNodes.length; i++){
		if(e.childNodes[i].id == 'contentCol'){
			e.childNodes[i].style.width = '100%';
			e.childNodes[i].style.margin = '0';
			e.childNodes[i].childNodes[1].style.width = '100%';
			break;
		}
	}
	var e = document.getElementById('globalContainer');
	if(e){
		e.style.width = '100%';
		e.style.overflow = 'hidden';
	}
	var e = document.getElementById('contentArea');
		document.getElementById('contentArea').style.width = '100%';
		for(i=0; i<e.childNodes.length; i++){
		if(e.childNodes[i].tagName == 'div'){
			e.childNodes[i].style.width = '100%';
 			e.childNodes[i].firstChild.style.width = '100%';
			break;
		}
	}
	iFrame.style.width = '100%';

    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className=="UIStandardFrame_Content"', 7);
    if (div)
      div.style.width ='100%';
    var div = searchDOM (document.getElementById('content'), 'node.tagName=="DIV" && node.className.indexOf("SidebarAds")>=0', 7);
    if (div)
      div.style.display ='none';

  }
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}

function pbStartup (){
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  KOCversion = anticd.getKOCversion();
  logit ("KOC version: "+ anticd.getKOCversion());

  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .pthostile td { background:#FF4040; }.ptfriendly td{background:lightblue; }.ptally td{background:royalblue; }\
    .ptneutral td { background:#C8C8C8; }.ptunaligned td { background:gold; }\
    .Hostile td { background:#FF4040; }.Friendly td{background:lightblue; }.Ally td{background:royalblue; }\
    .Neutral td { background:#C8C8C8; }.Unaligned td { background:gold; }\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    div.ptDiv {background-color:#f0f0f0;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
    table.ptTab tr td {border:none; background:none; white-space:nowrap;}\
    table.ptTabPad tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 4px;}\
    table.ptTabBR tr td {border:none; background:none;}\
    table.ptTabLined tr td {border:1px none none solid none;}\
    table.ptTabOverview tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:12px;}\
    table.ptTabOverview7 tr td {border:1px none none solid none; white-space:nowrap; padding: 1px 2px;  font-size:11px;}\
    table.ptTabPad tr td.ptentry {background-color:#ddeedd; padding-left: 8px;}\
    .ptstat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:white; background-color:LightSeaGreen}\
    table.ptMainTab {empty-cells:show; margin-top:5px }\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.ptMainTab tr td.spacer {padding: 0px 4px;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:LightSeaGreen; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#dde; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#dde; color:#fff; border:none; height: 21px; padding:0px; }\
	table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabPad tr td.ptentry {background-color:#ddeedd; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .ptOddrow {background-color:#eee}\
    .pbStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:white; background-color:LightSeaGreen}\
    .ptStatLight {color:#ddd}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ddeedd; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    .ptChatWhisper {}\
    .ptChatAlliance {background-color: #fffbe0}\
    .ptChatGlobal {background-color: #d4d8ef}\
    .ptChatIcon {border: 3px inset #85b4e7}\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    a.ptButton20 {color:#ffff80}\
    hr.ptThin {padding:0px; margin:0px}\
    input.pbSubtab {cursor:pointer; width:10em; margin-right:15px;}\
    input.pbSubtabSel {background-color:#444; color:white; font-weight:bold; cursor:none !important}\
    table.pbMainTab {empty-cells:show; margin-top:5px }\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pbMainTab tr td.spacer {padding: 0px 4px;}\
    table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:#eed;}\
    table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid none solid; background-color:LightSeaGreen; color:white; border-color:black;}\
    tr.pbPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
    div.indent25 {padding-left:25px}';

 window.name = 'PT';
  logit ("*  Power  v"+ Version +" Loaded");
  readOptions();
  readGlobalOptions ();
  readAttackOptions();
  setCities();
// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 1045,1045, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  tabManager.init (mainPop.getMainDiv());
  actionLog (" Power  v"+ Version +" Loaded  (KofC version: "+ anticd.getKOCversion() +")");

  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  CollectGold.init();
  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
  AddMainTabLink('Noble Barbing Power', eventHideShow, mouseMainTab);
  kocWatchdog ();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  MessageCounts.init ();
  MapDistanceFix.init ();
  WarnZeroAttack.init ();
  AllianceReports.init ();
  messageNav.init();
  ChatStuff.init ();
  AttackDialog.init();
  battleReports.init ();
  CoordBox.init ();
  GMTclock.init ();
  AudioAlert.init();
  FoodAlerts.init();

}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  saveOptions();
}

var CoordBox = {
  init : function (){
    var t = CoordBox;
    t.boxDiv = searchDOM (document.getElementById('maparea_map'), 'node.className=="mod_coord"', 3, false);
    t.setEnable (Options.mapCoordsTop);
  },
  setEnable : function (tf){
    var t = CoordBox;
    if (t.boxDiv == null)
      return;
    if (tf)
      t.boxDiv.style.zIndex = '100000';
    else
      t.boxDiv.style.zIndex = '10011';
  },
  isAvailable : function (){
    var t = CoordBox;
    return !(t.boxDiv==null);
  },
}

var battleReports = {
  init : function (){
    var t = battleReports;
    t.getReportDisplayFunc = new CalterUwFunc ('getReportDisplay', [['return s.join("")', 'var themsg=s.join(""); themsg=getReportDisplay_hook(themsg, arguments[1]); return themsg']]);
    unsafeWindow.getReportDisplay_hook = t.hook;
    t.getReportDisplayFunc.setEnable (true);
    t.renderBattleReportFunc = new CalterUwFunc ('MarchReport.prototype.renderBattleReport', [['return k.join("")', 'var themsg=k.join(""); themsg=renderBattleReport_hook(themsg, this.rslt); return themsg']]);
    unsafeWindow.renderBattleReport_hook = t.hook2;
    t.renderBattleReportFunc.setEnable (true);
    t.renderButtonsFunc = new CalterUwFunc ('MarchReport.prototype.generateBackButton', [[/return \"(.*)\"/i, 'var msg="$1"; return battleReports_hook3(msg, this.rptid);']]);
    unsafeWindow.battleReports_hook3 = t.generateBackButtonHook;
    t.renderButtonsFunc.setEnable (true);
    unsafeWindow.deleteAreport = t.e_deleteReport;
//setTimeout (function(){logit('MarchReport.prototype.generateBackButton:\n'+ unsafeWindow.MarchReport.prototype.generateBackButton.toString(), 3, 1)}, 100);
  },

  isRoundsAvailable : function (){
    var t = battleReports;
    return t.getReportDisplayFunc.isAvailable();
  },
  isDeleteAvailable : function (){
    var t = battleReports;
    return t.renderButtonsFunc.isAvailable();
  },


  generateBackButtonHook : function (msg, rptid){
    if (!Options.reportDeleteButton)
      return msg;
    var delBut = msg.replace ('onclick=\'', 'onclick=\'deleteAreport('+ rptid +',false); ');
    delBut = delBut.replace (/<span>(.*)<\/span>/, '<span>'+ unsafeWindow.g_js_strings.commonstr.deletetx +'</span>');
//logit ('DELBUT: '+ delBut);
    return msg + delBut;
  },

  e_deleteReport : function (rptid){
    var t = battleReports;
    t.ajaxDeleteMyReport (rptid);
  },

  ajaxDeleteMyReport : function (rptid, isUnread, side, isCityReport, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.s0rids = rptid;
    params.s1rids = '';
    params.cityrids = '';
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok && isUnread){
          unsafeWindow.seed.newReportCount = parseInt(seed.newReportCount) - 1;
          unsafeWindow.messages_notify_bug()
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

  hook2 : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attackers.*?<span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
  hook : function (msg, rslt){
    if (rslt.rnds && Options.dispBattleRounds){
      msg = msg.replace (/(Attackers <span.*?)<\/div>/im, '$1<BR>Rounds: '+ rslt.rnds +'</div>');
    }
    return msg;
  },
}

var anticd = {
  isInited : false,
  KOCversion : '?',

  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },

  getKOCversion : function (){
    return this.KOCversion;
  },
}
anticd.init ();

var ChatStuff = {
  chatDivContentFunc : null,
  getChatFunc : null,

  init : function (){
    var t = ChatStuff;
    t.chatDivContentFunc = new CalterUwFunc ('Chat.chatDivContent', [['return e.join("");', 'var msg = e.join("");\n msg=chatDivContent_hook(msg);\n return msg;']]);
    unsafeWindow.chatDivContent_hook = t.chatDivContentHook;
    unsafeWindow.ptChatIconClicked = t.e_iconClicked;
    t.setEnable (Options.chatEnhance);
  },

  isAvailable : function (){
    var t = ChatStuff;
    t.chatDivContentFunc.isAvailable ();
  },

  setEnable : function (tf){
    var t = ChatStuff;
    t.chatDivContentFunc.setEnable (tf);
  },

  e_iconClicked : function (name){
    var e = document.getElementById('mod_comm_input');
    e.value = '@'+ name +' ';
  },


// "Report No: 5867445"  --->  see unsafeWindow.modal_alliance_report_view()

  chatDivContentHook : function (msg){
    var t = ChatStuff;
    var class = '';
    var m = /div class='info'>.*<\/div>/im.exec(msg);
    if (m == null)
      return msg;
    if (m[0].indexOf('whispers') >= 0)
      class = 'ptChatWhisper';
    else if (m[0].indexOf('to the alliance') >= 0)
      class = 'ptChatAlliance';
    else
      class = 'ptChatGlobal';
    msg = msg.replace ("class='content'", "class='content "+ class +"'");


    if (msg.indexOf('claimAllianceChat')<0){
      msg = msg.replace (/([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/img, '<A onclick=\"ptGotoMap($1,$3)\">$1$2$3</a>');
    }

    var m = /(Lord|Lady) (.*?)</im.exec(msg);
    if (m != null)
      msg = msg.replace (/<img (.*?>)/img, '<A onclick=\"ptChatIconClicked(\''+ m[2] +'\')\"><img class=\"ptChatIcon\" $1</a>');
    return msg;
  },
}

function displayReport (rptid, side){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.rid = rptid;
  params.side = side;

  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchReport.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit (inspect (rslt, 5, 1));
      if (notify)
        notify (rslt.errorMsg);
    },
    onFailure: function () {
      if (notify)
        notify ('AJAX ERROR');
    },
  });
}

/*************************************** OVERVIEW TAB ************************************************/
var GMTclock = {
  span : null,
  timer : null,
  
  init : function (){
    this.span = document.createElement ('span');
    this.span.style.fontWeight = 'bold';
    document.getElementById('kochead_time').parentNode.appendChild (this.span);
    this.setEnable (Options.gmtClock);
  },

  setEnable : function (tf){
    var t = GMTclock;
    clearInterval (t.timer);
    if (tf){
      t.timer = setInterval (t.everySecond, 900);
    } else {
      t.span.innerHTML = '';
    }
  },
    
  everySecond : function (){
    var now = new Date();  
    now.setTime(now.getTime() + (now.getTimezoneOffset()*60000));
    GMTclock.span.innerHTML = ' &nbsp; ('+ now.toLocaleFormat ('%H:%M:%S') +' GMT)';
  },
}


function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else 
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

Tabs.Overview = {
  tabOrder : 1,
  cont : null,
  displayTimer : null,
  checkBox:null,

  Overview : function (){
  },

  init : function (div){
    this.cont = div;
  },


  hide : function (){
    clearTimeout (Tabs.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var t = Tabs.Overview;

    clearTimeout (t.displayTimer);

    function clickEnableMarch (){
      var t = Tabs.Overview;
      if (checkBox.checked)
        Options.includeMarching = true;
      else
        Options.includeMarching = false;
      t.show ();
    }
	
	function clickEnableTrain (){
      var t = Tabs.Overview;
      if (checkBox2.checked)
        Options.includeTraining = true;
      else
        Options.includeTraining = false;
      t.show ();
    }
    function _row (name, row, noTotal){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #ddeedd "';
      var tot = 0;
      var m = [];
      m.push ('<TR style="background: #ddeedd " align=right');
      m.push (style);
      m.push ('><TD');
      m.push (style);
      m.push ('><B>');
      m.push (name);
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('> &nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += parseInt(row[i]);
        m.push ('<TD style="background: #20b2aa">');
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }

//DebugTimer.start(); 
    try {
      if (Options.includeMarching)
        march = getMarchInfo ();
  
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;"><TABLE cellspacing=0 cellpadding=0 class=ptTab width=97% align=center>\
        <TR align=left><TD><SPAN class=ptStatLight>Joined on:</span> '+ dt.toLocaleDateString() +'</td>\
        <TD><SPAN class=ptStatLight>Might:</span> ' + addCommas(Seed.player.might) +'</td>\
        <TD><SPAN class=ptStatLight>Alliance:</span> ' + getMyAlliance()[1] +'</td>\
        <TD align=right><SPAN class=ptStatLight>Domain:</span> ' + unsafeWindow.domainName +'</td></tr></table></div>';
      tabClass = 'ptTabOverview';  
    
	  if (Cities.numCities > 6)
        tabClass = 'ptTabOverview7';  
          
      str += "<TABLE class="+ tabClass +" cellpadding=0 cellspacing=0><TR valign=top align=right><TD width=65></td><TD width=95 style='background: #f6f3ec'></td>";
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><B>"+ Cities.cities[i].name.substring(0,11) +'</b><BR>'+ coordLink (Cities.cities[i].x, Cities.cities[i].y) +"<BR>"+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +"</td>";

      }
      if (Options.includeMarching)
        str += '<TD width=81><B>Marching</b></td>';
      str += "</tr>";
	  
	  str += '<TR valign=top align=center><TD></td><TD style=\'background: #20b2aa\'><B>TOTAL</b></td>';
	  for(i=0; i<Cities.numCities; i++){
	    cityID = 'city'+Cities.cities[i].id;
	    Gate = parseInt(Seed.citystats[cityID].gate);
		if(Gate == 0)
			str += '<TD style=\'background: #f6f3ec\'>Hiding</td>';
		else
			str += '<TD style=\'background: #f6f3ec\' ><SPAN class=boldRed><blink>Defending</blink></span></td>';

	  }
  
      rows = [];
      rows[0] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      }
      for (r=1; r<5; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
        }
      }
  
      if (Options.includeMarching){
        for (var i=0; i<5; i++)
          rows[i][Cities.numCities] = march.resources[i];
      }
      str += _row ('Gold', rows[0]);
      str += _row ('Food', rows[1]);
      str += _row ('Wood', rows[2]);
      str += _row ('Stone', rows[3]);
      str += _row ('Ore', rows[4]);
      str += '<TR><TD><BR></td></tr>';
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
      }

      str += _row ('Food +/-', row, true);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '----';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
          if (timeLeft > 86313600)
            row[i] = '----';
          else {
            if (Options.enableFoodWarn && timeLeft<(Options.foodWarnHours*3600))
              row[i] = '<SPAN class=boldRed><blink>'+ timestrShort(timeLeft) +'</blink></span>';
            else
              row[i] = timestrShort(timeLeft);
          }
        }
      }    
      str += _row ('Food left', row, true);
      str += '<TR><TD><BR></td></tr>';
      
      for (r=1; r<13; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
        }
      }
      if (Options.includeMarching){
        for (var i=0; i<13; i++)
          rows[i][Cities.numCities] = march.marchUnits[i];
      }

//**********************************
	  t_rows = [];
	  for (r=2; r<26; r+=2){
        t_rows[r] = [];
        for(j=0; j<Cities.numCities; j++) {
		   t_rows[r][j] = [0];
          cityID = 'city'+ Cities.cities[j].id;    
      	  var q = Seed.queue_unt[cityID];
      	  var supply_t=militia_t=scout_t=pike_t=sword_t=archer_t=cavalry_t=heavy_t=wagon_t=ballista_t=ram_t=catapult_t=0 ;     
   	  	  for (var i=0; i<q.length; i++){
	    	switch(q[i][0])
	    	{
	      	case '1':
 	 			supply_t += parseInt(q[i][1]);
		 		break;
			  case '2':
		  		militia_t += parseInt(q[i][1]);
 	 			break;
			  case '3':
		  		scout_t += parseInt(q[i][1]);
 	 			break;
			  case '4':
		  		pike_t += parseInt(q[i][1]);
	  			break;
			  case '5':
		  		sword_t += parseInt(q[i][1]);
	  			break;
			  case '6':
		 		archer_t += parseInt(q[i][1]);
 	 			break;
			  case '7':
		  		cavalry_t += parseInt(q[i][1]);
	  			break;
			  case '8':
		  		heavy_t += parseInt(q[i][1]);
	  			break;
			  case '9':
		 		wagon_t += parseInt(q[i][1]);
	  			break;
			  case '10':
 		 		ballista_t += parseInt(q[i][1]);
 	 			break;
		  	  case '11':
	 	 		ram_t += parseInt(q[i][1]);
 		 		break;
			  case '12':
	 	 		catapult_t += parseInt(q[i][1]);
    	   	 	break;
			}
	    	switch(r)
	    	{
		      case 2:
			    t_rows[r][j] = supply_t;
				break;
		      case 4:
			    t_rows[r][j] = militia_t;
				break;
		      case 6:
			    t_rows[r][j] = scout_t;
				break;
		      case 8:
			    t_rows[r][j] = pike_t;
				break;
		      case 10:
			    t_rows[r][j] = sword_t;
				break;
		      case 12:
			    t_rows[r][j] = archer_t;
				break;
		      case 14:
			    t_rows[r][j] = cavalry_t;
				break;
		      case 16:
			    t_rows[r][j] = heavy_t;
				break;
		      case 18:
			    t_rows[r][j] = wagon_t;
				break;
		      case 20:
			    t_rows[r][j] = ballista_t;
				break;
		      case 22:
			    t_rows[r][j] = ram_t;
				break;
		      case 24:
			    t_rows[r][j] = catapult_t;
				break;
			  
			}
      	  }  
        }
	  }	  
      rownum = 0;

      str += _row ('SupTrp', rows[1]);      
      str += _row ('Militia', rows[2]);
      str += _row ('Scout', rows[3]);
      str += _row ('Pike', rows[4]);
      str += _row ('Sword', rows[5]);
      str += _row ('Archer', rows[6]);
      str += _row ('Cavalry', rows[7]);
      str += _row ('H-Cav', rows[8]);
      str += _row ('Wagon', rows[9]);
      str += _row ('Ballista', rows[10]);
      str += _row ('Ram', rows[11]);
      str += _row ('Catapult', rows[12]);
	  if (Options.includeTraining) {
      str += _row ('<i><span style="color:green">Sup Trp Tr</span></i>', t_rows[2]);
      str += _row ('<i><span style="color:green">MM Tr</span></i>', t_rows[4]);


      str += _row ('<i><span style="color:green">Scout Tr</span></i>', t_rows[6]);
      str += _row ('<i><span style="color:green">Pike Tr</span></i>', t_rows[8]);
      str += _row ('<i><span style="color:green">Sword Tr</span></i>', t_rows[10]);
      str += _row ('<i><span style="color:green">Archer Tr</span></i>', t_rows[12]);
      str += _row ('<i><span style="color:green">Cav Tr</span></i>', t_rows[14]);

      str += _row ('<i><span style="color:green">H.Cav Tr</span></i>', t_rows[16]);
      str += _row ('<i><span style="color:green">Wagon Tr</span></i>', t_rows[18]);
      str += _row ('<i><span style="color:green">Ball Tr</span></i>', t_rows[20]);

      str += _row ('<i><span style="color:green">Ram Tr</span></i>', t_rows[22]);
      str += _row ('<i><span style="color:green">Cat Tr</span></i>', t_rows[24]);
      }

      str += '<TR><TD><BR></td></tr>';
	     
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
        if (totWilds < castle)
          row[i] = '<SPAN class=boldRed><B>'+ totWilds +'/'+ castle +'</b></span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
      str += _row ('# Wilds', row, true);
  
      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat)
          ++totKnights;
        row[i] = totKnights;
      }
      str += _row ('# Knights', row, true);
  
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_unt['city'+Cities.cities[i].id]; 
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime < 3600)
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }
      str += _row ('Troop Que', row, true);
      
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var wall = {};
        getWallInfo (Cities.cities[i].id, wall);
        var totTime = 0;
        var q = Seed.queue_fort['city'+Cities.cities[i].id]; 
        if (q!=null && q.length>0)
          totTime = q[q.length-1][3] - now;
        if (totTime < 0)
          totTime = 0;
        if (totTime<1 && (wall.wallSpaceUsed < wall.wallSpace-4 || wall.fieldSpaceUsed < wall.fieldSpace-4))
          row[i] = '<SPAN class=boldRed><B>'+ timestr(totTime) +'</b></span>';
        else
          row[i] = timestr(totTime);
      }    
      str += _row ('Wall Que', row, true);
      str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck'+ (Options.includeMarching?' CHECKED':'') +'>Include Marching Troops/Resources</td></tr>';
	  str += '<TR><TD class=xtab></td><TD class=xtab colspan=4><BR><INPUT type=CHECKBOX id=idCheck2'+ (Options.includeTraining?' CHECKED':'') + '>Include Troops in Training</td></tr>';
      str += "</table>";
      if (DEBUG_BUTTON)
        str += '<BR><BR><INPUT id=subSeed type=submit name="SEED" value="DEBUG">';
      Tabs.Overview.cont.innerHTML = str;
      checkBox = document.getElementById('idCheck');
      checkBox.addEventListener('click', clickEnableMarch, false);
	  checkBox2 = document.getElementById('idCheck2');
	  checkBox2.addEventListener('click', clickEnableTrain, false);
      if (DEBUG_BUTTON){
        subSeed = document.getElementById('subSeed');
        subSeed.addEventListener('click', function (){debugWin.doit()}, false);
      }
//DebugTimer.display ('Draw Overview');    
    } catch (e){
      Tabs.Overview.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
  },
};


function getWallInfo (cityId, objOut){
  objOut.wallSpaceUsed = 0;
  objOut.fieldSpaceUsed = 0;
  objOut.wallLevel = 0;  
  objOut.wallSpace = 0;     
  objOut.fieldSpace = 0;  
  var b = Seed.buildings["city" + cityId];
  if (b.pos1==null)
    return;  
  objOut.wallLevel = parseInt(b.pos1[1]);
  var spots = 0;
  for (var i=1; i<(objOut.wallLevel+1); i++)
    spots += (i * 500);
  objOut.wallSpace = spots;     
  objOut.fieldSpace = spots;  
     
  var fort = Seed.fortifications["city" + cityId];
  for (k in fort){
    var id = parseInt(k.substr(4));
    if (id<60)
      objOut.wallSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
    else
      objOut.fieldSpaceUsed += parseInt(unsafeWindow.fortstats["unt"+ id][5]) * parseInt(fort[k]);
  }
}    

//********** Build Tab **********//
Tabs.build = {
    tabOrder: toBuild,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();

        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
        }

        var m = '<DIV id=pbBuildDivF class=pbStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">\
				<OPTION value=build>level up</option>\
				<OPTION value=max>level max</option>\
				<OPTION value=destruct>destruct</option>\
				</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=pbStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Show"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;

        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting

		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        t.saveBuildStates();
        }, false);

		window.addEventListener('unload', t.onUnload, false);

        function addQueueEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t.showBuildQueue(cityId, true);
            }, false);
        }
    },
	setBuildMode: function (type) {
	    var t = Tabs.build;
		t.currentBuildMode = type;
	},
    e_autoBuild: function(){
      var t = Tabs.build;
	    document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue
              }
			  //logit ('City #'+ (i+1) + ' : busy='+ isBusy);
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                 	 var bQi = t["bQ_" + cityId][0];   //take first queue item to build
					 t.doOne(bQi);;
					 //setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },
    doOne : function (bQi){
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);


		//mat/KoC Advanced PowerBot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749

		var mode = bQi.buildingMode;
		//  var mode = "build"; //FOR DEBUG

		var citpos = parseInt(bQi.buildingPos);
		//  var citpos = 6; //FOR DEBUG

		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			//  var bdgid = 13; //FOR DEBUG

			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			//  var curlvl = 8; //FOR DEBUG

			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			//  var bid = 1523749; //FOR DEBUG

			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Queue item deleted: Buildinglevel is equal or higher!!!");
					return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
					t.requeueQueueElement(bQi);
					return;
			}

			if (mode == 'destruct') {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = "";
				params.pos = citpos;
				params.lv = curlvl - 1;
				if (curlvl >= 1) {
					params.bid = bid;
				}
				params.type = bdgid;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							if (document.getElementById('pbHelpRequest').checked == true)
								t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							logit(errmsg);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;

					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								actionLog("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);
								if (params.cid == unsafeWindow.currentcityid)
									unsafeWindow.update_bdg();
								if (document.getElementById('pbHelpRequest').checked == true)
									t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									actionLog("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
								logit(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog("Queue item deleted: Building does not exist!!!");
		}
	},
	requeueQueueElement: function (bQi) {
	    var t = Tabs.build;
		var cityId = bQi.cityId;
		var buildingPos = parseInt(bQi.buildingPos);
		var buildingId = parseInt(bQi.buildingId);
		var buildingLevel = parseInt(bQi.buildingLevel);
		var buildingType = parseInt(bQi.buildingType);
		var buildingTime = parseInt(bQi.buildingTime);
		var buildingMult = parseInt(bQi.buildingMult);
		var buildingAttempts = parseInt(bQi.buildingAttempts);
		var buildingMode = bQi.buildingMode;

		t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
		t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
	},
    show: function(){
		var t = Tabs.build;
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
  		var buildingAttempts = 0;
		var loaded_bQ = t["bQ_" + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}
		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = "build";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
	    var t = Tabs.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        }
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}

		var knights = Seed.knights["city" + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) > 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}

        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        }
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}

		var result = new Array(buildingMult, buildingTime);
		return result;
	},
	bot_gethelp: function (f, currentcityid) {
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
		if (parseInt(a[c][2]) == parseInt(f)) {
		  e = parseInt(a[c][0]);
		  d = parseInt(a[c][1]);
		  break
		}
	  }
	  var b = new Array();
	  b.push(["REPLACE_LeVeLbUiLdInG", d]);
	  b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
	  b.push(["REPLACE_LeVeLiD", d]);
	  b.push(["REPLACE_AsSeTiD", f]);
	  var g = function(h, i) {
		unsafeWindow.continuation_95(h, i);
		if (!h) {
		  var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
		  unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
		}
	  };
	  unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
            cityId: 			cityId,
            buildingPos:		buildingPos,
            buildingType: 		buildingType,
			buildingId: 		buildingId,
            buildingTime: 		buildingTime,
            buildingLevel: 		buildingLevel,
            buildingAttempts: 	buildingAttempts,
			buildingMult: 		buildingMult,
            buildingMode: 		buildingMode
        });
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
    modalmessage: function(message){
	    var t = Tabs.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == "increase") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == "decrease") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
			var currentCount = currentCount - 1;
		}
		element.innerHTML = currentCount;
		document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
	},
    hide: function(){
        var t = Tabs.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function(){
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
            GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        }
        else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
        } else {
			row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time

        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
	    var t = Tabs.build;
	    clearTimeout (t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Build Queue of ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
        t.paintBuildQueue(cityId);
        if (focus)
          t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
		t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 5000);
	},
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
		if (optimize == true) {
			lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
		}
		t["bQ_" + cityId] = lbQ;
		for (var i = 0; i < lbQ.length; i++) {
			var queueId = i;
			t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
	clearBuildQueue: function() {
	    var t = Tabs.build;
		var table = document.getElementById('pbCityQueueContent');
		var rows = table.rows;
		while(rows.length)
			table.deleteRow(rows.length-1);
	},
    getCurrentCityId: function(){ // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid)
            return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function(){
		var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states)
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
		var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            obj.value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
			obj.value = "Build Mode = OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;
	},
}

//********** Train Tab **********//
Tabs.Train = {
  tabOrder : toTrain,
  cont : null,
  timer : null,
  stats : {},
  selectedCity : {},
  trainTimer : null,
  running : false,

  init : function (div){
    var t = Tabs.Train;
    t.cont = div;
    s = "<DIV id=trainTopSelect>\
      <DIV class=ptstat>Train troops and build wall/field defenses</div><DIV style='height:10px'></div><DIV class=ptentry>\
      <DIV style='text-align:center; margin-bottom:10px;'>Select City: &nbsp; <span id=ptspeedcity></span></div>\
      <TABLE class=ptTab width=100%><TR valign=top><TD width=50%>\
      <TABLE align=center><TR><TD align=right>Troop Type: </td><TD colspan=2>\
      <SELECT id=ptttType>\
        <option value='1'>Supply Troop</option>\
        <option value='2'>Militiaman</option>\
        <option value='3'>Scout</option>\
        <option value='4'>Pikeman</option>\
        <option value='5'>Swordsman</option>\
        <option value='6'>Archer</option>\
        <option value='7'>Cavalry</option>\
        <option value='8'>Heavy Cavalry</option>\
        <option value='9'>Supply Wagon</option>\
        <option value='10'>Ballista</option>\
        <option value='11'>Battering Ram</option>\
        <option value='12'>Catapult</option>\
      </select> &nbsp; (max <span id=ptttSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='ptttInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='ptttButMaxPS' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='ptttInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='ptttButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=ptttSpMaxSlots>1</span>)</td></tr>\
      <TR><TD align=right valign=top>Set Workers idle: </td><TD colspan=2><INPUT type=CHECKBOX id=chkPop"+ (Options.maxIdlePop?' CHECKED ':'') +"> \
        <SPAN style='white-space:normal;'>Allows you to train more troops. May temporarily set idle population negative.</span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='ptttButDo' type=submit value='Train Troops'\></td></tr>\
      </table></td><TD width=20></td><TD style='border-left:solid 2px;' width=50% align=center>\
      <TABLE align=center><TR><TD align=right>Defense Type: </td><TD colspan=2>\
      <SELECT id=pttdType>\
        <option value='53'>Crossbow</option>\
        <option value='55'>Trebuchet</option>\
        <option value='60'>Trap</option>\
        <option value='61'>Caltrop</option>\
        <option value='62'>Spiked Barrier</option>\
      </select> &nbsp; (<span id=pttdSpMax></span>)</td></tr>\
      <TR><TD align=right># per slot: </td><TD><INPUT id='pttdInpPS' size=5 type='text' value='0'\></td>\
        <TD><INPUT id='pttdButMaxPS' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxPS>0</span>)</td></tr>\
      <TR><TD align=right># of slots: </td><TD><INPUT id='pttdInpSlots' size=2 type='text' value='1'\></td>\
        <TD width=75%><INPUT id='pttdButMaxSlots' type=submit value='max'\> &nbsp; (max <span id=pttdSpMaxSlots>1</span>)</td></tr>\
      <TR align=center><TD colspan=3><SPAN id=pttdSpace></span></td></tr>\
      <TR><TD colspan=3 align=center><DIV style='height:10px'></div><INPUT id='pttdButDo' type=submit value='Build Defenses'\></td></tr></table>\
      </td></tr></table></div></div>\
      <TABLE align=center width=425 class=ptTab><TR><TD><div id=ptTrainStatus style='overflow-y:auto; max-height:78px; height: 78px;'></div></td></tr></table>\
      <div style='height: 330px; background: #e8ffe8'>\
      <TABLE width=100% class=ptTab><TR><TD colspan=3><DIV id=divSTtop></div></td></tr>\
      <TR><TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Troop Queue &nbsp; (<SPAN id=statTTtot></span>)</b><BR><HR></div><DIV id=divSTleft style='overflow-y: auto; height:210px; max-height:210px'></div></td>\
        <TD width=50% style='padding-left:15px; padding-right:15px'><DIV style='text-align:center'><B>Defense Queue &nbsp; (<SPAN id=statDTtot></span>)</b><BR><HR></div><DIV id=divSTright style='overflow-y: auto; height:210px; max-height:210px'></div></td></tr>\
      </div>";
    t.cont.innerHTML = s;

    var dcp = new CdispCityPicker ('ptspeed', document.getElementById('ptspeedcity'), true, t.clickCitySelect, 0);
    t.TTspMax = document.getElementById ('ptttSpMax');
    t.TTspMaxPS = document.getElementById ('ptttSpMaxPS');
    t.TTspMaxSlots = document.getElementById ('ptttSpMaxSlots');
    t.TTbutMaxSlots = document.getElementById ('ptttButMaxSlots');
    t.TTbutMaxPerSlot = document.getElementById ('ptttButMaxPS');
    t.TTinpPerSlot = document.getElementById ('ptttInpPS');
    t.TTinpSlots = document.getElementById ('ptttInpSlots');
    t.TTselType = document.getElementById ('ptttType');
    t.TTbutDo = document.getElementById ('ptttButDo');
    t.TDspMax = document.getElementById ('pttdSpMax');
    t.TDspMaxPS = document.getElementById ('pttdSpMaxPS');
    t.TDspMaxSlots = document.getElementById ('pttdSpMaxSlots');
    t.TDbutMaxSlots = document.getElementById ('pttdButMaxSlots');
    t.TDbutMaxPerSlot = document.getElementById ('pttdButMaxPS');
    t.TDinpPerSlot = document.getElementById ('pttdInpPS');
    t.TDinpSlots = document.getElementById ('pttdInpSlots');
    t.TDselType = document.getElementById ('pttdType');
    t.TDbutDo = document.getElementById ('pttdButDo');
    t.TDspSpace = document.getElementById ('pttdSpace');
    t.divTrainStatus = document.getElementById ('ptTrainStatus');

    t.TTinpSlots.addEventListener ('change', t.updateTopTroops, false);
    t.TTbutMaxPerSlot.addEventListener ('click', t.clickTroopMaxPS, false);
    t.TTbutMaxSlots.addEventListener ('click', t.clickTroopMaxSlots, false);
    t.TTselType.addEventListener ('change', t.changeTroopSelect, false);
    t.TTbutDo.addEventListener ('click', t.clickTroopDo, false);
    t.TDinpSlots.addEventListener ('change', t.updateTopDef, false);
    t.TDselType.addEventListener ('change', t.changeDefSelect, false);
    t.TDbutMaxPerSlot.addEventListener ('click', t.clickDefMaxPS, false);
    t.TDbutMaxSlots.addEventListener ('click', t.clickDefMaxSlots, false);
    t.TDbutDo.addEventListener ('click', t.clickDefDo, false);

    document.getElementById ('chkPop').addEventListener ('change', t.clickCheckIdlePop, false);
    t.changeTroopSelect();
    t.changeDefSelect();
  },


  hide : function (){
    var t = Tabs.Train;
    clearTimeout (t.timer);
  },

  show : function (){
    var t = Tabs.Train;
    clearTimeout (t.timer);
    t.displayCityStats();
    t.changeTroopSelect();
    t.changeDefSelect();
    t.timer = setTimeout (t.show, 2000);
  },

/*******  TROOPS  ******/

  updateTopTroops : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TTspMax.innerHTML = t.stats.MaxTrain;
    t.TTspMaxSlots.innerHTML = t.stats.barracks - t.stats.queued;
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTspMaxPS.innerHTML = 0;
    else
      t.TTspMaxPS.innerHTML = parseInt(t.stats.MaxTrain / slots);
  },


  clickTroopMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TTinpSlots.value, 10);
    if (slots<1 || (t.stats.barracks-t.stats.queued < 1))
      t.TTinpPerSlot.value = 0;
    else
      t.TTinpPerSlot.value = parseInt(t.stats.MaxTrain / slots);
  },

  clickTroopMaxSlots : function (){
    var t = Tabs.Train;
    t.TTinpSlots.value = t.stats.barracks - t.stats.queued;
  },

  clickCitySelect : function (city){
    var t = Tabs.Train;
    t.selectedCity = city;
    t.lastQueString = null;
    t.lastDQueString = null;
    t.displayCityStats ();
    t.changeTroopSelect();
    t.changeDefSelect();
  },

  clickCheckIdlePop : function (){
    var t = Tabs.Train;
    if (document.getElementById ('chkPop').checked)
      Options.maxIdlePop = true;
    else
      Options.maxIdlePop = false;
    saveOptions ();
    t.displayCityStats ();
    t.changeTroopSelect ();
  },

  limitingFactor : null,

  changeTroopSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TTselType.value;
    t.lastTroopSelect = id;
    t.limitingFactor = null;
    var uc = unsafeWindow.unitcost['unt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max){
      max = t.stats.food / uc[1];
      t.limitingFactor = 'food';
    }
    if ( (t.stats.wood / uc[2]) < max){
      max = t.stats.wood / uc[2];
      t.limitingFactor = 'wood';
    }
    if ( (t.stats.stone / uc[3]) < max){
      max = t.stats.stone / uc[3];
      t.limitingFactor = 'stone';
    }
    if ( (t.stats.ore / uc[4]) < max){
      max = t.stats.ore / uc[4];
      t.limitingFactor = 'ore';
    }
    if ( (t.stats.idlePop / uc[6]) < max){
      max = t.stats.idlePop / uc[6];
      t.limitingFactor = 'pop';
    }
    t.stats.MaxTrain = parseInt (max);
    if (t.stats.MaxTrain < 0)
      t.stats.MaxTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxTrain = 0;
          t.limitingFactor = null;
          break;
        }
      }
    }
if (t.limitingFactor){
  document.getElementById('ptttr_'+ t.limitingFactor).className = 'boldRed';
}
    t.updateTopTroops();
  },


  clickTroopDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TTselType.value;
    var perSlot = parseInt(t.TTinpPerSlot.value, 10);
    var numSlots = parseInt(t.TTinpSlots.value, 10);

    t.displayCityStats ();
    if (t.running){
      t.stopTraining('<SPAN class=boldRed>Training cancelled by user</span>');
      return;
    }
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of troops per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\'t train that many troops (max is '+ t.stats.MaxTrain +' total)</font>';
      return;
    }
    if (numSlots<1 || numSlots>t.stats.barracks - t.stats.queued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';
      return;
    }

    t.TDbutDo.disabled = true;
    t.TTbutDo.className = 'ptButCancel';
    t.TTbutDo.value = 'CANCEL';

    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.running = true;
    t.doQueue (cityId, que);
  },


/*******  DEF  ******/

  updateTopDef : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (isNaN(slots) || slots<0)
      slots = 0;
    t.TDspMax.innerHTML = 'max:'+ t.stats.MaxDefTrain +'&nbsp; owned:'+ t.stats.defOwned;
    t.TDspMaxSlots.innerHTML = t.stats.wallLevel-t.stats.Dqueued;
    if (slots<1)
      t.TDspMaxPS.innerHTML = 0;
    else
      t.TDspMaxPS.innerHTML = parseInt(t.stats.MaxDefTrain / slots);

    t.TDspSpace.innerHTML = 'Wall level: <B>'+ t.stats.wallLevel +'</b><BR>Wall space: '+ (t.stats.wallSpaceUsed+t.stats.wallSpaceQueued)  +'/<B>'+ t.stats.wallSpace +'</b><BR>\
        Field space: '+ (t.stats.fieldSpaceUsed+t.stats.fieldSpaceQueued) +'/<B>'+ t.stats.fieldSpace +'</b>';
  },

  changeDefSelect : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    // unitcost: NAME, Food, Wood, Stone, Ore, Gold, Pop, ?
    var id = t.TDselType.value;
    t.lastDefSelect = id;
    t.stats.defOwned = parseInt(Seed.fortifications['city' + cityId]['fort'+id]);
    var uc = unsafeWindow.fortcost['frt'+id];
    var max = 9999999999;
    if ( (t.stats.food / uc[1]) < max)
      max = t.stats.food / uc[1];
    if ( (t.stats.wood / uc[2]) < max)
      max = t.stats.wood / uc[2];
    if ( (t.stats.stone / uc[3]) < max)
      max = t.stats.stone / uc[3];
    if ( (t.stats.ore / uc[4]) < max)
      max = t.stats.ore / uc[4];
    if ( (t.stats.idlePop / uc[6]) < max)
      max = t.stats.idlePop / uc[6];
    t.stats.MaxDefTrain = parseInt (max);
    if (t.stats.MaxDefTrain < 0)
      t.stats.MaxDefTrain = 0;
    if (matTypeof(uc[8]) == 'object'){
      for (k in uc[8]){  // check building requirement
        var b = getCityBuilding (cityId, k.substr(1));
        if (b.maxLevel < uc[8][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }
    if (matTypeof(uc[9]) == 'object'){
      for (k in uc[9]){    // check tech requirement
        if (parseInt(Seed.tech['tch'+k.substr(1)]) < uc[9][k][1]){
          t.stats.MaxDefTrain = 0;
          break;
        }
      }
    }

    var spaceEach = parseInt(unsafeWindow.fortstats["unt"+ id][5]);
    if (id<60)
      var spaceAvail = t.stats.wallSpace - t.stats.wallSpaceUsed - t.stats.wallSpaceQueued;
    else
      var spaceAvail = t.stats.fieldSpace - t.stats.fieldSpaceUsed - t.stats.fieldSpaceQueued;
    if ( t.stats.MaxDefTrain * spaceEach > spaceAvail)
      t.stats.MaxDefTrain = parseInt(spaceAvail / spaceEach);

    t.updateTopDef();
  },

  clickDefMaxPS : function (){
    var t = Tabs.Train;
    var slots = parseInt(t.TDinpSlots.value, 10);
    if (slots<1)
      t.TDinpPerSlot.value = 0;
    else
      t.TDinpPerSlot.value = parseInt(t.stats.MaxDefTrain / slots);
  },

  clickDefMaxSlots : function (){
    var t = Tabs.Train;
    t.TDinpSlots.value = t.stats.wallLevel-t.stats.Dqueued;
  },

  clickDefDo : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    var unitId = t.TDselType.value;
    var perSlot = parseInt(t.TDinpPerSlot.value, 10);
    var numSlots = parseInt(t.TDinpSlots.value, 10);

    t.displayCityStats ();
    if (t.running){
      t.stopTraining('<SPAN class=boldRed>Training cancelled by user</span>');
      return;
    }
    if (perSlot<1){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Number of units per slot must be greater than 0.</font>';
      return;
    }
    if (perSlot*numSlots > t.stats.MaxDefTrain){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Can\'t train that many unit (max is '+ t.stats.MaxDefTrain +' total)</font>';
      return;
    }
    if (numSlots<1 || numSlots > t.stats.wallLevel-t.stats.Dqueued){
      t.divTrainStatus.innerHTML = '<FONT COLOR=#550000>Invalid number of slots.</font>';
      return;
    }
    t.TTbutDo.disabled = true;
    t.TDbutDo.className = 'ptButCancel';
    t.TDbutDo.value = 'CANCEL';

    var que = [];
    for (var i=0; i<numSlots; i++)
      que.push (['T', unitId, parseInt (perSlot)]);
    t.divTrainStatus.innerHTML = '';
    t.running = true;
    t.doDefQueue (cityId, que);
  },

  doDefQueue : function (cityId, que, errMsg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    try {
      t.displayCityStats();
      if (errMsg){
        t.stopTraining ('<SPAN class=boldRed>ERROR: '+ errMsg +'</span>');
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.stopTraining ('<B>Done queueing defenses.</b>');
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  fortNamesShort[cmd[1]] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');
        doDefTrain ( cityId, cmd[1], cmd[2],
          function(errMsg){
            t.trainTimer = setTimeout(function (){Tabs.Train.doDefQueue(cityId, que, errMsg);}, (Math.random()*3500)+1500);
          } );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.stopTraining ('<SPAN class=boldRed>PROGRAM ERROR: '+ err.message +'</span>');
    }
  },


  // fix KofC bugs ....
  // if first start time > now, make it now
  // if any end time != next start time, fix it
  fixQueTimes : function (q){
    var now = unixTime();
    if (q[0][2] > now)
      q[0][2] = now;
    for (var i=0; i<q.length; i++){
      if (q[i+1]!=null && q[i+1][2]!=q[i][3])
        q[i][3] = q[i+1][2];
    }
  },

  expireTheQueue : function (q){
    if (q==null)
      return;
    var now = unixTime();
    while (q.length>0 && (q[0][3] - now) < 1)
      q.shift();
  },

  displayCityStats : function (){
    var t = Tabs.Train;
    var cityId = t.selectedCity.id;
    t.stats.food = parseInt (Seed.resources['city'+cityId].rec1[0]/3600);
    t.stats.wood = parseInt (Seed.resources['city'+cityId].rec2[0]/3600);
    t.stats.stone = parseInt (Seed.resources['city'+cityId].rec3[0]/3600);
    t.stats.ore = parseInt (Seed.resources['city'+cityId].rec4[0]/3600);
    t.stats.gold = Seed.citystats['city'+cityId].gold[0];
    if (Options.maxIdlePop)
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]);
    else
      t.stats.idlePop = parseInt(Seed.citystats['city'+cityId].pop[0]) - parseInt(Seed.citystats['city'+cityId].pop[3]);
    t.stats.barracks = getCityBuilding (cityId, 13).count;
    var m = '<CENTER><B>'+ Cities.byID[cityId].name +' &nbsp; ('+ Cities.byID[cityId].x +','+ Cities.byID[cityId].y +')</b></center><HR>';
//added21mar

m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=8%><B>Supply:</b></td><TD width=8%><B>Militia:</b></td><TD width=8%><B>Scout:</b></td>\
        <TD width=8%><B>Pike:</b></td><TD width=8%><B>Sword:</b></td><TD width=8%><B>Archer:</b></td>\
        <TD width=8%><B>Cav:</b></td><TD width=8%><B>Heavy Cav:</b></td><TD width=8%><B>Wagon:</b></td>\
        <TD width=8%><B>Ballista:</b></td><TD width=8%><B>Ram:</b></td><TD width=8%><B>Catapult:</b></td><tr>';

 m += '<TR align=center><TD width=8%>'+Seed.units['city'+cityId]['unt1']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt2']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt3']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt4']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt5']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt6']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt7']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt8']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt9']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt10']+
 '<TD width=8%>'+Seed.units['city'+cityId]['unt11']+'</td><TD width=8%>'+Seed.units['city'+cityId]['unt12']+'</td><tr></table>';
//end of added21mar
    m += '<TABLE class=ptTab width=100%><TR align=center>\
        <TD width=18%><SPAN id=ptttr_food><B>Food:</b><BR>'+ addCommasInt(t.stats.food) +'</span></td>\
        <TD width=16%><SPAN id=ptttr_wood><B>Wood:</b><BR>'+ addCommasInt(t.stats.wood) +'</span></td>\
		<TD width=16%><SPAN id=puttr_stone><B>Stone:<BR>'+ addCommasInt(t.stats.stone) +'</span></td>\
        <TD width=16%><SPAN id=ptttr_ore><B>Ore:</b><BR>'+ addCommasInt(t.stats.ore) +'</span></td>\
        <TD width=16%><SPAN id=ptttr_gold><B>Gold:</b><BR>'+ addCommasInt(t.stats.gold) +'</span></td>\
        <TD width=16%><SPAN id=ptttr_pop><B>Idle Pop:</b><BR>'+ addCommasInt(t.stats.idlePop) +'</span></td></tr></table><BR>';
    document.getElementById ('divSTtop').innerHTML = m;

// troop queue ....
    var totTime = 0;
    var q = Seed.queue_unt['city'+cityId];
    t.expireTheQueue(q);
    var qs = q.toString();
    var now = unixTime();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        document.getElementById ('ptttfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastQueString = qs;
      t.stats.queued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length>0 ){
        t.fixQueTimes (q);
        t.stats.queued = q.length;
        first = true;
        for (var i=0; i<q.length; i++){
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ unsafeWindow.unitcost['unt'+q[i][0]][0];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=ptttfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>';
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTleft').innerHTML = m;
    }
    m = t.stats.barracks +' barracks';
    if (t.stats.queued > 0)
      m += ', '+ t.stats.queued +' slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statTTtot').innerHTML = m;

// defense queue ....
    getWallInfo (cityId, t.stats);
    var totTime = 0;
    var q = Seed.queue_fort['city'+cityId];
    t.expireTheQueue(q);
    var qs = q.toString();
    if (q!=null && q.length>0)
      totTime = q[q.length-1][3] - now;
    if ( qs == t.lastDQueString){
      if (q!=null && q.length>0){
        var cur = q[0][3] - now;
        document.getElementById ('pttdfq').innerHTML = timestr(cur, true);
      }
    } else {
      t.lastDQueString = qs;
      t.stats.Dqueued = 0;
      t.stats.wallSpaceQueued = 0;
      t.stats.fieldSpaceQueued = 0;
      m = '<TABLE align=center class=ptTab>';
      if (q!=null && q.length > 0 ){
        t.fixQueTimes (q);
        t.stats.Dqueued = q.length;
        first = true;
        for (i=0; i<q.length; i++){
          if (q[i][0] < 60)
            t.stats.wallSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          else
            t.stats.fieldSpaceQueued += parseInt(unsafeWindow.fortstats["unt"+ q[i][0]][5]) * parseInt(q[i][1]);
          start = q[i][2];
          end = q[i][3];
          if (first)
            actual = end - now;
          else
            actual = end - lastEnd;
          if (actual < 0)
            actual = 0;
          m += '<TR align=right><TD>'+ q[i][1] +' </td><TD align=left> '+ fortNamesShort[q[i][0]];
          if (first)
            m += '</td><TD> &nbsp; '+  timestr(end-start, true) +'</td><TD> (<SPAN id=pttdfq>'+ timestr(actual, true) +'</span>)';
          else
            m += '</td><TD> &nbsp; '+  timestr(actual, true) +'</td></tr>';
          lastEnd = end;
          first = false;
        }
      }
      m += '</table>';
      document.getElementById ('divSTright').innerHTML = m;
    }
    m = t.stats.Dqueued +' slots';
    if (totTime > 0)
      m += ', '+ unsafeWindow.timestr(totTime);
    document.getElementById ('statDTtot').innerHTML = m;
  },

  dispTrainStatus : function (msg){
    var t = Tabs.Train;
    t.divTrainStatus.innerHTML = msg + t.divTrainStatus.innerHTML;
  },


  stopTraining : function (msg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    t.trainTimer = null;
    t.dispTrainStatus (msg +'<BR>');
    t.TDbutDo.disabled = false;
    t.TTbutDo.disabled = false;
    t.TTbutDo.value = 'Train Troops';
    t.TDbutDo.value = 'Build Defenses';
    t.TTbutDo.className = '';
    t.TDbutDo.className = '';
    t.running = false;
  },


  doQueue : function (cityId, que, errMsg){
    var t = Tabs.Train;
    clearTimeout (t.trainTimer);
    try {
      t.displayCityStats();
      if (errMsg){
        t.stopTraining ('<SPAN class=boldRed>'+ errMsg +'</span>');
        return;
      }
      var cmd = que.shift();
      if (!cmd){
        t.stopTraining ('<B>Done queueing troops.</b>');
        return;
      }
      if (cmd[0] == 'T'){
        t.dispTrainStatus ('Training '+ cmd[2] +' '+  unsafeWindow.unitcost['unt'+cmd[1]][0] +' at '+ Cities.byID[cityId].name +' ('+ que.length +' slots remaining)<BR>');
        doTrain (cityId, cmd[1], cmd[2],
          function(errMsg){
            if (t.running)
              t.trainTimer = setTimeout(function (){Tabs.Train.doQueue(cityId, que, errMsg);}, (Math.random()*2500)+1000 );
          }
        );
      }
    } catch (err) {
      logit (inspect (err, 8, 1));
      t.stopTraining  ('<SPAN class=boldRed>PROGRAM ERROR: '+ err.message +'</span>');
    }
  },
}

/********** Search Tab **********/
/***
TODO: Better search algorithm (circular OR square, always start at center, working outwards) 
        Should be separate class (producer/consumer) so auto attack can use it too
**/

Tabs.Search = {
  tabOrder : 2,
  myDiv : null,
  MapAjax : new CMapAjax(),
  MAX_SHOW_WHILE_RUNNING : 250,
  popFirst : true,
  SearchList : [],
  
  init : function (div){
    var t = Tabs.Search;
    var Provinces = {1:{'name':"Tinagel",'x':75,'y':75},
				2:{'name':"Cornwall",'x':225,'y':75},
				3:{'name':"Astolat",'x':375,'y':75},
				4:{'name':"Lyonesse",'x':525,'y':75},
				5:{'name':"Corbnic",'x':625,'y':75},
				6:{'name':"Paimpont",'x':75,'y':225},
				7:{'name':"Cameliard",'x':225,'y':225},
				8:{'name':"Sarras",'x':375,'y':225},
				9:{'name':"Canoel",'x':525,'y':225},
				10:{'name':"Avalon",'x':625,'y':225},
				11:{'name':"Carmathen",'x':75,'y':375},
				12:{'name':"Shallot",'x':225,'y':375},
//				13:{'name':"-------",'x':375,'y':375},
				14:{'name':"Cadbury",'x':525,'y':375},
				15:{'name':"Glaston Bury",'x':625,'y':375},
				16:{'name':"Camlan",'x':75,'y':525},
				17:{'name':"Orkney",'x':225,'y':525},
				18:{'name':"Dore",'x':375,'y':525},
				19:{'name':"Logres",'x':525,'y':525},
				20:{'name':"Caerleon",'x':625,'y':525},
				21:{'name':"Parmenie",'x':75,'y':675},
				22:{'name':"Bodmin Moor",'x':225,'y':675},
				23:{'name':"Cellwig",'x':375,'y':675},
				24:{'name':"Listeneise",'x':525,'y':675},
				25:{'name':"Albion",'x':625,'y':675}};
    t.selectedCity = Cities.cities[0];
    t.myDiv = div;
    
    m = '<DIV class=ptentry><TABLE width=100% class=pbTab><TR><TD class=pbDetLeft>Search for: </td><TD width=99%>';
    m += htmlSelector ({0:"Barb Camp", 1:"Wilderness", 2:"Cities"}, null, 'id=pasrcType'); 
	m += '&nbsp; &nbsp; &nbsp; <span class=pbDetLeft>Search style: &nbsp;';
	m += htmlSelector({square:"Square", circle:"Circle"}, Options.srcdisttype, 'id=pbsrcdist');
    m += '</span></td></tr><TR><TD class=pbDetLeft>At: </td><TD class=xtab>X=<INPUT id=pasrchX type=text\> &nbsp;Y=<INPUT id=pasrchY type=text\>\
      &nbsp; Radius: <INPUT id=pasrcDist size=3 value=10 /> &nbsp; <SPAN id=paspInXY></span></tr>\
      <TR><TD class=pbDetLeft>Or:</td><TD>Search entire province: <select id="provinceXY"><option>--provinces--</option>';
    for (var i in Provinces)
    	m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
    m += '</select></td></tr>';
    m += '<TR><TD colspan=2 align=center><INPUT id=pasrcStart type=submit value="Start Search"/></td></tr>';
    m += '</table></div>\
        <DIV id="pasrcResults" style="height:400px; max-height:400px;"></div>';
    
    t.myDiv.innerHTML = m;
    var psearch = document.getElementById ("pasrcType");
    new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
    document.getElementById ('provinceXY').addEventListener ('click', function() {
    	  if (this.value >= 1) {
    		  document.getElementById ('pasrchX').value = Provinces[this.value].x;
    		  document.getElementById ('pasrchY').value = Provinces[this.value].y;
    		  document.getElementById ('pasrcDist').value = '75';
    	  }
	    }, false); 
	document.getElementById('pbsrcdist').addEventListener ('change', function (){
      Options.srcdisttype = document.getElementById('pbsrcdist').value;
      saveOptions();
      }, false);
    document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
    document.getElementById ('pasrchX').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrcDist').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    unsafeWindow.pbSearchLookup = t.clickedLookup;  
    unsafeWindow.pbSearchScout = t.clickedScout;  
  },

  e_coordChange : function(){
    document.getElementById ('provinceXY').selectedIndex = 0;
  },
  
  hide : function (){
  },

  show : function (cont){
  },

  citySelNotify : function (city){
    var t = Tabs.Search;
    t.selectedCity = city;
  },
  
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch ('SEARCH CANCELLED!');
      return;
    }
    t.opt.searchType = document.getElementById ('pasrcType').value;
    t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
    t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    t.opt.searchShape = Options.srcdisttype;
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X must be between 0 and 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y must be between 0 and 749<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>75)
      errMsg += "Radius (distance) must be between 1 and 75<BR>";
    if (errMsg != ''){
      document.getElementById('pasrcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('pasrcStart').value = 'Stop Search';
    m = '<DIV class=pbStat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=pastatSearched></div></td>\
        <TD class=xtab align=center><SPAN style="white-space:normal" id=pastatStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=pastatFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top>\
            <TD width=99% style="max-width:50px"><DIV id=padivOutTab style="height:380px; max-height:380px; overflow-y:auto;"></div></td>\
            <TD align=center valign=middle><A id=pbAhideShow style="text-decoration:none; cursor:pointer;"><DIV style="width:1em; border:1px solid red; padding:10px 2px; background-color:#fee"><SPAN id=spanHideShow> H I D E</span><BR><BR> L<BR>I<BR>S<BR>T<BR><BR> O<BR>P<BR>T<BR>I<BR>O<BR>N<BR>S </div></a></td>\
            <TD width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=padivOutOpts></div></td>\
          </table>';
      
    document.getElementById('pasrcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      var typeName = 'Barbarians';
    else if (t.opt.searchType == 1)
      var typeName = 'Wildernesses';
    else 
      var typeName = 'Cities';
    if (t.opt.searchShape == 'square')
      var distName = 'Distance';
    else
      var distName = 'Radius';
    m = '<CENTER><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+ distName +': '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
        
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
		}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab><SELECT id=pafilWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'}, Options.wildType );
      m += '</select></td></tr><TR><TD class=xtab align=right>Unowned Only:</td><TD class=xtab><INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
			</select></td></tr>\
			<TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
			</table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
    } else {
		m+= '</select></td></tr><TR><TD class=xtab align=right>Misted:</td><TD class=xtab><INPUT name=pbfil id=pafilMisted type=CHECKBOX '+ (Options.mistedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Hostile:</td><TD class=xtab><INPUT name=pbfil id=pafilHostile type=CHECKBOX '+ (Options.hostileOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Friendly:</td><TD class=xtab><INPUT name=pbfil id=pafilFriendly type=CHECKBOX '+ (Options.friendlyOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Allied:</td><TD class=xtab><INPUT name=pbfil id=pafilAllied type=CHECKBOX '+ (Options.alliedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Neutral:</td><TD class=xtab><INPUT name=pbfil id=pafilNeutral type=CHECKBOX '+ (Options.neutralOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Unallianced:</td><TD class=xtab><INPUT name=pbfil id=pafilunAllied type=CHECKBOX '+ (Options.unalliedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>All:</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\
             <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
        </select></td></tr>\
		<TR><TD class=xtab align=right>Min might:</td><TD class=xtab><INPUT type=text id=paminmight size=6 value='+ Options.minmight +'>\
        <TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
        </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
	
	}
    document.getElementById('padivOutOpts').innerHTML = m;
	 if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    document.getElementById('pafilMinLvl').addEventListener ('change', function (){
      Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
      Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
	  }
    document.getElementById('pafilSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('pafilSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('pafilWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('pafilWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('pafilUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
    }
	if (t.opt.searchType == 2){
		document.getElementById('pafilMisted').addEventListener ('change', function (){
        Options.mistedOnly = (document.getElementById('pafilMisted').checked);
		if(!Options.mistedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.mistedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilHostile').addEventListener ('change', function (){
        Options.hostileOnly = (document.getElementById('pafilHostile').checked);
		if(!Options.hostileOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.hostileOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilFriendly').addEventListener ('change', function (){
        Options.friendlyOnly = (document.getElementById('pafilFriendly').checked);
		if(!Options.friendlyOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.friendlyOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilAllied').addEventListener ('change', function (){
        Options.alliedOnly = (document.getElementById('pafilAllied').checked);
		if(!Options.alliedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.alliedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilNeutral').addEventListener ('change', function (){
        Options.neutralOnly = (document.getElementById('pafilNeutral').checked);
		if(!Options.neutralOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.neutralOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilunAllied').addEventListener ('change', function (){
        Options.unalliedOnly = (document.getElementById('pafilunAllied').checked);
		if(!Options.unalliedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.unalliedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilAll').addEventListener ('change', function (){
        Options.srcAll = (document.getElementById('pafilAll').checked);
		for(i in document.getElementsByName('pbfil'))
			document.getElementsByName('pbfil')[i].checked = Options.srcAll;
		Options.mistedOnly=Options.hostileOnly=Options.friendlyOnly=Options.alliedOnly=Options.neutralOnly=Options.unalliedOnly=Options.srcAll;
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('paminmight').addEventListener ('change', function (){
        Options.minmight = parseIntNan(document.getElementById('paminmight').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
	
	}
	
    document.getElementById('pbAhideShow').addEventListener ('click', t.hideShowClicked, false);
	
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },

  hideShowClicked : function (){
    var div = document.getElementById('padivOutOpts');
    if (div.style.display == 'none'){
      div.style.display = 'block';
      document.getElementById('spanHideShow').innerHTML = 'H I D E';
    } else {
      div.style.display = 'none';
      document.getElementById('spanHideShow').innerHTML = 'S H O W';
    }
  },
  
  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('pacoordsOnly').checked;
    if (DEBUG_SEARCH) DebugTimer.start();
     function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      return a[2] - b[2];
    }
	
    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (t.opt.searchType==2 && type==7 ) {
		if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5])
		if((Options.hostileOnly && t.mapDat[i][12] == 'h') || 
		   (Options.mistedOnly && t.mapDat[i][5]===true) || 
		   (Options.friendlyOnly && t.mapDat[i][12] == 'f') || 
		   (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
		   (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
		   (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
		   (Options.srcAll))
				dat.push(t.mapDat[i]);
      } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0 || Options.wildType==0
        ||  (Options.wildType==1 && (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
	  }
    }
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('pastatFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>None found</center>';
    } else {
      dat.sort(mySort);
      if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
      if (t.opt.searchType == 2) {
			 m = '<TABLE id=pasrcOutTab class=pbSrchResults cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Loc</td><TD align=right>Dist</td><TD>Player</td><TD align=right>Might</td><TD>Alliance</td><TD>Online</td><TD></td></tr>';
		} else { 
			m = '<TABLE id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=80%> &nbsp; Type</td><TD style=""></td></tr>';
		}
	}
      var numRows = dat.length;
      if (numRows > t.MAX_SHOW_WHILE_RUNNING && t.searchRunning){
        numRows = t.MAX_SHOW_WHILE_RUNNING;
        document.getElementById('pasrchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows '+ t.MAX_SHOW_WHILE_RUNNING +' of '+ dat.length +' results until search is complete.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR><TD><DIV onclick="pbGotoMap('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly) {
          m += '</tr>';
        } else {
          if (t.opt.searchType == 2) { // city search
            m += '<TD align="right" >'+ dat[i][2].toFixed(2) +'</td>';
            if (dat[i][5])
              m += '<TD colspan=4>* MISTED * &nbsp; &nbsp; <SPAN onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A>Scout</a></span></td></tr>';
            else{
              var allStyle = '';
              if (dat[i][12]=='f')
                allStyle = 'class=pbTextFriendly';
              else if (dat[i][12]=='h')
                allStyle = 'class=pbTextHostile';
              m += '<TD>'+ dat[i][9]+'</td><TD align=right>'+ dat[i][10] +'</td><TD><SPAN '+ allStyle +'>'+ dat[i][11]+'</span></td><TD>'+(dat[i][13]?'<SPAN class=boldDarkRed>ONLINE</span>':'')+'</td><TD><A onclick="pbSearchLookup('+ dat[i][7] +')">Lookup</a></td></tr>';
            }
			} else { 
          m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
            +'</td><TD  valign="top">'+ (dat[i][5]?(dat[i][6]!=0?' <A onclick="pbSearchLookup('+dat[i][6]+')">OWNED</a>':'<A onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;">MISTED</a>'):'') +'</td></tr>';
			}
		}
			
       }
      m += '</table>';
    }
    document.getElementById('padivOutTab').innerHTML = m;
    dat = null;
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('pastatStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('pasrcStart').value = 'Start Search';
    document.getElementById ('pasrchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Export Results', 'id=pbSrcDoExp') +'</center>'; 
      document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
	if (t.opt.searchType==2){
	  document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Generate Scout List', 'id=pbSrcDoScout') +'</center>'; 
      document.getElementById ('pbSrcDoScout').addEventListener ('click', t.generateScoutList, false);
	}
    t.searchRunning = false;
    t.dispMapTable();
  },

  exportKOCattack : function (){
    var t = Tabs.Search;
    var bulkAdds = {};
    for (i=1; i<11; i++)
      bulkAdds['lvl'+ i] = [];
    for (i=0; i<t.mapDat.length; i++){
      var lvl = parseInt (t.mapDat[i][4]);
      if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
        bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
    }
    exportToKOCattack.doExport (bulkAdds, t.selectedCity);
  },
  
  generateScoutList : function (){
    var t = Tabs.Search;
    var bulkScout = [];
    for (i=0; i<t.mapDat.length; i++){
      if (t.mapDat[i][5] && t.mapDat[i][3] == 7)
        bulkScout.push({x:t.mapDat[i][0], y:t.mapDat[i][1], dist:t.mapDat[i][2]});
    }
	if(t.selectedCity == null)
		t.selectedCity = Cities.cities[0];
    t.ShowScoutList (bulkScout, t.selectedCity);
  },
  ShowScoutList : function (coordlist, city){
	var t = Tabs.Search;
	var popScout = null;
	t.scoutcity = city;
	
	if(popScout==null){
	  popScout = new CPopup ('pbsrcscout', 0,0, 350,500, true, function (){popScout.destroy(); popScout=null;});
      popScout.centerMe (mainPop.getMainDiv());  
    }
	var m = '<DIV class=pbStat>Auto Scout Options</div>';
		m += '<DIV>Amount of Scouts to send: <input id=pbsrcScoutAmt value="'+Options.srcScoutAmt+'" /></div><BR>';
		m += '<DIV>Select City: <span id=pbsrcScoutcitypick> </span></div><BR>';
		m += '<DIV class=pbStat>Scout from <span id=pbsrcScoutcity>'+city.name+'</span> <BR> Total targets '+coordlist.length+'</div>';
		m += '<DIV style="max-height:220px; overflow-y:auto;"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW><TR style="font-weight:bold; background-color:white"><TD width=15><input type=checkbox id=pbsrcScout_All /></td><TD>Target Coords</td></tr>';
	  for(i=0; i<coordlist.length; i++){
			m += '<TR style="background-color:white"><TD><input type=checkbox name=pbsrcScoutCheck id="pbsrcScoutCheck_'+coordlist[i].x+'_'+coordlist[i].y+'" value="'+coordlist[i].x+'_'+coordlist[i].y+'" /></td><TD>'+coordLink(coordlist[i].x,coordlist[i].y)+'</td></tr>';
	  }
	    m += '</table></div>';
		m += '<BR><CENTER>'+ strButton20('Start Scout', 'id=pbSrcStartScout') +'</center>';
		m += '<CENTER><DIV style="width:70%; max-height:75px; overflow-y:auto;" id=pbSrcScoutResult></DIV></center>'; 
	popScout.getMainDiv().innerHTML = m;
	new CdispCityPicker ('pbScoutPick', document.getElementById('pbsrcScoutcitypick'), false, function(c,x,y){t.ShowScoutList(coordlist, c);});
	popScout.getTopDiv().innerHTML = '<CENTER><B>Power Bot Scout List</b></center>';
	popScout.show(true);
	
	document.getElementById('pbsrcScoutAmt').addEventListener('change', function(){
		Options.srcScoutAmt = parseInt(document.getElementById('pbsrcScoutAmt').value);
		saveOptions();
	}, false);
	document.getElementById('pbsrcScout_All').addEventListener('change', function(){
		for(k in document.getElementsByName('pbsrcScoutCheck'))
			document.getElementsByName('pbsrcScoutCheck')[k].checked = document.getElementById('pbsrcScout_All').checked;
	}, false);
	document.getElementById('pbSrcStartScout').addEventListener('click', t.clickedStartScout, false);
  },
  scouting : false,
  scoutcity : null,
  doScout : function(list, city){
	var t = Tabs.Search;
	document.getElementById('pbSrcScoutResult').innerHTML = '';
	if(list.length < 1){
		document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERROR: No coords selected</span>';
		t.clickedStartScout();
		return;
	}
	if(parseInt(Seed.units['city'+city.id]['unt'+3]) < Options.srcScoutAmt){
		document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERROR: No scouts available</span>';
		t.clickedStartScout();
		return;
	}
	t.doScoutCount(list, city, list.length, 0);
	
  },
  doScoutCount : function(list, city, total, count){
	var t = Tabs.Search;
	if(!t.scouting){
		document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>Scouting stopped by user</span><BR>';
		document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
		document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Start Scout</span>';
		return;
	}
	if(total <= (count)){
		document.getElementById('pbSrcScoutResult').innerHTML += 'Done!<BR>';
		t.clickedStartScout();
		return;
	}
	var rallypointlevel = t.getRallypoint(city.id);
	var slots = 0;
	if(Seed.queue_atkp['city'+city.id].length != 'undefined')
		slots = Seed.queue_atkp['city'+city.id].length;
	if(slots >= rallypointlevel){
		setTimeout(function(){t.doScoutCount(list, city, total, count)}, 5000);
		return;
	}
	var coords = list[count].split("_");
	if(coords[0] == 'undefined' || coords[1] == 'undefined'){
		document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>ERROR: Invalid coords</span>';
		t.clickedStartScout();
		return;
	}
	document.getElementById('pbSrcScoutResult').innerHTML += 'Sending scouts to '+coords[0]+','+coords[1]+'...';
	document.getElementById('pbsrcScoutCheck_'+coords[0]+'_'+coords[1]).checked = false;
	t.sendScout(coords[0], coords[1], city, count, function(c){t.doScoutCount(list, city, total, c)});
  },
  sendScout : function(x, y, city, count, notify){
	var t = Tabs.Search;
	count = parseInt(count);
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.kid = 0;
	params.type = 3;
	params.xcoord = x;
	params.ycoord = y;
	params.u3 = Options.srcScoutAmt;
	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
		 method: "post",
		 parameters: params,
		 loading: true,
		 onSuccess: function (rslt) {
		 rslt = eval("(" + rslt.responseText + ")");
		 if (rslt.ok) {
			 var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
			 var ut = unixTime();
			 var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
			 var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
			 for(i = 0; i <= unitsarr.length; i++){
				if(params["u"+i]){
				unitsarr[i] = params["u"+i];
				}
			 }
			 var currentcityid = params.cid;
			 unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
			 if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
			 document.getElementById('pbSrcScoutResult').innerHTML += 'Sent!<BR>';
			 if (notify)
			  setTimeout(function(){ notify(count+1); }, 1000);
		 } else {
			 document.getElementById('pbSrcScoutResult').innerHTML += 'Failed! Retrying....<BR>';
			 if (notify)
			  setTimeout(function(){ notify(count); }, 1000);
		  }
		},
		onFailure: function () {}
  		});
  },
  getRallypoint: function(cityId){
      var t = Tabs.Search;
	  cityId = 'city'+cityId;
      for (o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12){
			return parseInt(buildingLevel);
			break;
		}
	   }
	  return 0;
    },
	clickedStartScout : function(){
	var t = Tabs.Search;
		if(t.scouting == false){
			t.scouting = true;
			var ScoutList = [];
			for(k=0; k<document.getElementsByName('pbsrcScoutCheck').length; k++){
				if(document.getElementsByName('pbsrcScoutCheck')[k].checked){
					ScoutList.push(document.getElementsByName('pbsrcScoutCheck')[k].value);
				}
			}
			t.doScout(ScoutList, t.scoutcity);
			document.getElementById('pbSrcStartScout').className = 'button20 pbButCancel';
			document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Stop</span>';
		} else {
			t.scouting = false;
			document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
			document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Start Scout</span>';
		}
	},
    
  
/** mapdata.userInfo:
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/
  mapCallback : function (uList){
    var t = Tabs.Search;

    var rslt = t.SearchList;
	map = rslt.data;
    var Dip = Seed.allianceDiplomacies;	
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
	
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
		    type = 7;
      } else
        continue;
        
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if ((t.opt.searchShape=='circle' && dist <= t.opt.maxDistance)
      ||  (t.opt.searchShape=='square' && map[k].xCoord>=t.firstX && map[k].xCoord<=t.lastX && map[k].yCoord>=t.firstY && map[k].yCoord<=t.lastY)){
	  	  if (t.opt.searchType==2) {    // if city search
    			var isMisted = map[k].tileUserId == 0 || false;		
    			var uu = 'u'+map[k].tileUserId;
    			var aD = '';
  				var nameU = '';
  				var mightU = ''; 
  				var aU = '';
    			if (!isMisted && userInfo[uu]) {
    				nameU = userInfo[uu].n;   // can error, must check if (userInfo[uu])
    				mightU = userInfo[uu].m;
    				if (alliance['a'+userInfo[uu].a])
    					aU = alliance['a'+userInfo[uu].a];
    				else
    				  aU = '----';
    				aD = '';
    				if (Dip.friendly && Dip.friendly['a'+userInfo[uu].a]) aD = 'f';
    				if (Dip.hostile && Dip.hostile['a'+userInfo[uu].a]) aD = 'h';
					if (Dip.allianceId && Dip.allianceId==userInfo[uu].a) aD = 'a';
					if (getDiplomacy(userInfo[uu].a) == 'neutral') aD = 'n';
					if (!userInfo[uu].a || userInfo[uu].a==0) aD = 'u';
					
    			}
// TODO: save memory, remove city name ?   			
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD, uList.data[map[k].tileUserId]?1:0]);
        } else {
          isOwned = map[k].tileUserId>0 || map[k].misted;
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (map[k].tileUserId>0? map[k].tileUserId : 0), uList.data[map[k].tileUserId]?1:0]);
        }
        ++t.tilesFound;
      }
    }
    
    t.tilesSearched += (15*15);
    document.getElementById('pastatSearched').innerHTML = 'Searched: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Done!');
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },
  
  eventgetplayeronline : function (left, top, width, rslt){
	var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }
	
	map = rslt.data;
	t.SearchList = rslt;
	var uList = [];
	for(k in map){
		if(map[k].tileUserId != null)
			uList.push(map[k].tileUserId);
	}
	t.fetchPlayerStatus (uList, function(r){ t.mapCallback(r)});
  },

  clickedScout : function (x, y){
    unsafeWindow.modal_attack (3, x, y);
    CwaitForElement ('modal_attack', 5000, function (){document.getElementById('modalBox1').style.zIndex='112000'});
  },
    
  clickedLookup : function (pid){
    var t = Tabs.Search;
    var pop = new CPopup ('pbsrclookup', 0,0, 500,500, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>Player Lookup</b></center>';
    pop.getMainDiv().innerHTML = '<DIV class=pbStat>Leaderboard information</div><SPAN id=pblupLB>Looking up leaderboard...</span>\
      <BR><DIV class=pbStat>Alliance Lookup</div><SPAN id=pblupAI>Looking up alliance info...</span>';
    pop.show (true);
    t.fetchLeaderboard (pid, function (r){t.gotPlayerLeaderboard(r, document.getElementById('pblupLB'))});
    t.fetchPlayerInfo (pid, function (r){t.gotPlayerInfo(r, document.getElementById('pblupAI'))});
  },

  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)<BR><BR>';
      return;
    }
    var p = rslt.results[0];
    var x;
    var name = '';
    if (p.playerSex == 'M')
      name = 'Lord ';
    else if (p.playerSex == 'F')
      name = 'Lady ';   
    name += p.displayName;      
    if ((x = officerId2String(p.officerType)) != '')  
      name += ' ('+ x + ')';  
    var aName = p.allianceName;
    if (!aName || aName=='')
      aName = 'none';
             
    var m = '<CENTER><SPAN class=boldRed>NOTE: Leaderboard information is delayed up to 24 hours</span></center><TABLE class=pbTabSome>';
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ name +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +' (rank #'+ p.rank +')</td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ aName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Cities:</td><TD><TABLE class=pbTabSome><TR style="font-weight:bold"><TD>City Name</td><TD>Coords</td><TD>Level</td><TD>Status</td><TD>Created</td></tr>';
      
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = c.dateCreated.substr(0,10);
      m += '<TR><TD>'+ c.cityName +'</td><TD>'+ coordLink(c.xCoord, c.yCoord) +'</td><TD align=center>'+ c.tileLevel +'</td>\
          <TD>'+ cityStatusString (c.cityStatus) +'</td><TD>'+ created +'</td></tr>';
    }    
    m += '</table></td></tr></table>';
    span.innerHTML = m;
  },

  gotPlayerInfo : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<TABLE class=pbTabSome>';
    var p = rslt.userInfo[0];
    var pids = p.provinceIds.split (',');
    var prov = [];
    for (var i=0; i<pids.length; i++)
      prov.push(unsafeWindow.provincenames['p'+pids[i]]);
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ p.genderAndName +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +'</td></tr>\
      <TR><TD class=pbDetLeft>Facebook profile:</td><TD><A target="_tab" href="http://www.facebook.com/profile.php?id='+ p.fbuid +'">Click to open in new tab</a></td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ p.allianceName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Provinces:</td><TD style="white-space:normal">'+ prov.join(', ') +'</td></tr>';
    span.innerHTML = m + '</table>';
  },
      
  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchLeaderboard : function (uid, notify) {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
};   // end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
    var t = exportToKOCattack;
    for (var b=1; b<11; b++){
      t.troops['b'+ b] = [];
      for (var trp=0; trp<12; trp++){
        t.troops['b'+ b][trp] = 0;
      }
    }
    var s = GM_getValue ('atkTroops_'+ getServerId(), null);
    if (s != null){
      var trp = JSON2.parse(s);
      for (var b=1; b<11; b++){
        if (trp['b'+ b] && trp['b'+ b].length == 12)
          t.troops['b'+ b] = trp['b'+ b];
      }
    }
    window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattack;
    GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattack;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
    ];
    
    if (popExp == null){
      popExp = new CPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
      popExp.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV class=pbStat>Export data to KOC Attack</div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Target Type</td><TD style="padding:1px" align=center>#<BR>targets</td><TD width=15></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb level '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>'; 
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    } 
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Bulk Add to KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack not running, unable to export';
    } 
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>'; 
    popExp.getMainDiv().innerHTML =  m;
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    popExp.getTopDiv().innerHTML = '<CENTER><B>Power Bot Export</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    popExp.show(true);
         
    if (city != null){
      for (var i=0; i<Cities.numCities; i++)
        if (city.id == Cities.cities[i].id)
          break;
      if (i < Cities.numCities){
        setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit ("SWITCH CITY: "+ (i+1));          
      }
    }
// TODO: WAIT FOR City select ?
    
  
    function validate (e){
      var x = e.target.id.substr(5).split('_');
      var b = x[0];
      var trp = x[1];
      document.getElementById('ptETerr_'+ b).innerHTML = '';
      var x = parseIntZero (e.target.value);
      if (isNaN(x) || x<0 || x>150000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Invalid Entry';
        return;
      } else {
        e.target.style.backgroundColor = '';
        e.target.value = x;
        t.troops['b'+ b][trp-1] = x;
      }
      var tot = 0;
      for (var td=0; td<troopDef.length; td++)
        tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
      if (tot<1 && cList['lvl'+ b].length>0 )
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>150000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return; 
        } else if (tot>150000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
          return; 
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      doNextLevel ();
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll(); 
      curLevel = 0;
      showMe ();
      popExp.show(true);
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        endBulkAdd ('Done!<BR>'); 
        return;
      }
     e_attackDialog();
    }
        
    function e_attackDialog (tf){
      if (!tf){
       hideMe();
       popExp.show (false);
       unsafeWindow.Modal.hideModalAll(); 
       pause(500);
       unsafeWindow.modal_attack(4,0,0);
       new CwaitForElement ('BulkAddAttackDiv', 400, e_attackDialog );
      } 
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (2).</span>');
        return;  
      }
      for (var trp=1; trp<13; trp++){
        var inp = document.getElementById('modal_attack_unit_ipt' +trp);
        inp.value = t.troops['b'+curLevel][trp-1];
        if (t.troops['b'+curLevel][trp-1] > 0)
          inp.style.backgroundColor = 'yellow';
        else
          inp.style.backgroundColor = 'white';
      }
      div.style.display = 'block';
      document.getElementById('KOCAttackBulkAddForce').checked = true;
      if (DISABLE_BULKADD_LIST)
        ta.value = '';
      else {
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      }
      clickWin (unsafeWindow, but, 'click');   
      unsafeWindow.Modal.hideModal();
      document.getElementById('pbSrcExpResult').innerHTML += 'Added '+ list.length +' targets for '+ city.name +'<BR>';
      setTimeout (doNextLevel, 10);
    }    
  },
}


  function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return; 
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
  }

/********** Players Tab **********/
function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}
Tabs.AllianceList = {
  tabOrder : toPlayers,
  tabLabel : 'Players',
  cont : null,
  dat : [],



/***
ajax/viewCourt.php:
  (boolean) ok = true
  (array) courtItems =

  (string) dailyActionFlag = 0
  (object) playerInfo = [object Object]
    (string) datejoinUnixTime = 1294440708
    (string) truceExpireUnixTime = 0
    (string) userId = 4394121
    (string) displayName = Vakasade
    (string) email = abc@abc.com
    (string) fbuid = 100000977751880
    (string) playerSex = F
    (string) usertype = 1
    (string) status = 1
    (string) dateJoined = 07-01-2011 14:51:48
    (string) lastLogin = 12-03-2011 13:11:34
    (string) eventTimestamp = 00-00-0000 00:00:00
    (string) eventStatus = 1
    (string) warStatus = 1
    (string) allianceId = 85
    (number) might = 1,192,710
    (string) title = 57
    (string) truceExpireTimestamp = 00-00-0000 00:00:00
    (string) fogExpireTimestamp = 00-00-0000 00:00:00
    (string) cnt_newmsg = 0
    (string) cnt_friendreq = 0
    (string) cnt_logins = 3910
    (string) cnt_passreset = 0
    (string) cnt_connections = 0
    (string) avatarId = 11
    (undefined) photo_host: null = null
    (undefined) photo_dir: null = null
    (undefined) photo_subdir: null = null
    (undefined) photo_name: null = null
    (string) allianceName = The Flying Circus

  (number) cityCount = 2
  (undefined) errorMsg: null = null
***/
fetchPlayerCourt : function (uid, notify){
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pid = uid;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/viewCourt.php\n"+ inspect (rslt, 3, 1));
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify (rslt);
    },
  });
},


fetchTEST : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pageNo = 1;
  params.numPerPage = 100;
  params.perPage = 100;
  params.results = 100;
  params.numResults = 100;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
logit ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
    },
  });
},

  init : function (div){
    var t = Tabs.AllianceList;
    t.cont = div;
//t.fetchTEST();
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLeaderboard;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
	unsafeWindow.PCalClickPrev = t.eventListPrev;
    unsafeWindow.PCalClickNext = t.eventListNext;
    if (getMyAlliance()[0] == 0) {
      t.cont.innerHTML = '<BR><BR><CENTER>You need to be in an alliance to use this feature.</center>';
      t.state = 1;
      return;
    }
    var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
        <TR><TD class=xtab align=right></td><TD class=xtab>Enter all or part of a player name: &nbsp;</td>\
          <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="Find Player" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
        <TR><TD class=xtab>OR: </td><TD class=xtab> Enter all or part of an alliance name: &nbsp;</td>\
          <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="Find Alliance" /></td>\
          <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
		  <TR><TD class=xtab>OR: </td><TD class=xtab align=right> List alliances: &nbsp;</td>\
		    <TD class=xtab><INPUT id=myAllSubmit type=submit value="'+ getMyAlliance()[1] +'" /> &nbsp; <INPUT align=left id=allListSubmit type=submit value="List all" /></td></tr>\
        </table><span style="vertical-align:middle;" id=altInput></span></div>\
        <SPAN id=allListOut></span>';
    t.cont.innerHTML = m;
    document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
    document.getElementById('myAllSubmit').addEventListener ('click', t.eventMyAllianceSubmit, false);
    document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
    document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
    document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
	document.getElementById('allListSubmit').addEventListener ('click', t.eventListSubmit, false);
	t.curPage = 0;
	t.MaxPage = -1;
	t.state = 1;
  },

  hide : function (){
  },

  show : function (){
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },

  eventGotPlayerList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
    var uList = [];
    for (k in rslt.matchedUsers)
      uList.push (rslt.matchedUsers[k].userId);
    t.fetchPlayerStatus (uList, function(r){t.eventGotPlayerOnlineList(r)});
  },

  eventGotPlayerOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing players matching <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=0><TR style="font-weight:bold"><TD>Name</td>\
      <TD align=right>Might</td><TD>UserId</td><TD> &nbsp; Online</td><TD> &nbsp;Facebook &nbsp; </td><TD width=75%>Lookup </td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
        cl = '';
      m += '<TR '+ cl +'valign=top><TD>'+ u.genderAndName +'</td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+u.userId+'</td><TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldRed><blink>ONLINE</blink></span>":"") +'</td>\
          <TD align=center><A target="_tab" href="http://www.facebook.com/profile.php?id='+ u.fbuid +'">profile</a></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A>details</a> &nbsp; <BR></span><SPAN onclick="PTpl(this, \''+ u.userId +'\')"><A>leaderboard</a><br></span><SPAN onclick="PCplo(this, '+ u.userId +')"><A>last Login</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },


  clickedPlayerDetail : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching details ...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },

  clickedPlayerLeaderboard : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching leaderboard info ...";
    t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },

  clickedPlayerGetLastLogin : function (span, uid){
    var t = Tabs.AllianceList;
    span.onclick = '';
    span.innerHTML = "fetching login date ...";
    t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
  },
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';
      return;
    }
    var p = rslt.results[0];
    var an = p.allianceName;
    if (!an || an=='' || p.officerType==4)
      an = 'none';
    else
      an += ' ('+ officerId2String(p.officerType) +')';
    m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Leaderboard: </b></td><TD colspan=2> Might: '+ p.might  +' &nbsp; Alliance: '+ an +'</td></tr>';
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = ' &nbsp; created: ' + c.dateCreated.substr(0,10);
      m += '<TR><TD align=right><B>City #'+ (i+1) +':</b></td><TD> &nbsp; '+ c.cityName
      +' (<a onclick="ptGotoMap ('+ c.xCoord +',' +c.yCoord+ ')">'+ c.xCoord +','+ c.yCoord +'</a>)</td><TD width=75%> &nbsp; level: '
        + c.tileLevel +' &nbsp; status: '+ cityStatusString (c.cityStatus) + created +'</td></tr>';
    }
    span.innerHTML = m + '</table>';
  },

  gotPlayerDetail : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'None';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD><B>Details:</b> &nbsp; </td><TD>Alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD></td><TD>Provinces: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },

  gotPlayerLastLogin : function (rslt, span){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }

    var p = rslt.playerInfo;
    var lastLogin = rslt.playerInfo.lastLogin;

    if (lastLogin) {
      m = '<div style="color:blue">Last login: '+lastLogin+'</div>';
    } else {
       m = '<div style="color:red">No login date found</div>';
    }
    span.innerHTML = m + '';
  },

  aName : '',
  eventSubmit : function (){
    var t = Tabs.AllianceList;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Enter at least 3 characters';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  eventGotAllianceList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing alliances matching <B>"'+ t.aName +'"</b></div>\
    <TABLE><TR style="font-weight:bold"><TD class=xtab>Alliance Name</td><TD class=xtab>Rank</td><TD class=xtab>Members</td>\
        <TD align=right class=xtab>Might</td><TD class=xtab>Diplomacy</td><TD class=xtab></td></tr>';
    for (k in rslt.alliancesMatched){
      var all = rslt.alliancesMatched[k];
      var dip = '';
      if (all.relation && all.relation==1)
        dip = 'Friendly';
      else if (all.relation && all.relation==2)
        dip = 'Hostile';
      m += '<TR><TD class=xtab>'+ all.allianceName +'</td><TD align=right class=xtab>'+ all.ranking +'</td><TD align=right class=xtab>'+ all.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(all.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ all.allianceId +')">View Members</a></td></tr>';
    }
    document.getElementById('allListOut').innerHTML = m;
  },

   eventListSubmit : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0  ) {
       t.curPage=1;
       t.fetchOtherAllianceInfo ( 1, t.eventGotOtherAlliancePage);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'You must be an alliance member to use this feature.';
    }
  },

  curPage : 0,
  MaxPage : 0,

  eventListNext : function (amt){
    var t = Tabs.AllianceList;
    if( parseInt(amt) >= 9999 )
       t.curPage = t.MaxPage;
    else {
	    t.curPage = parseInt(t.curPage) + parseInt(amt);
	    if ( t.curPage > t.MaxPage) {
	      t.curPage = t.MaxPage;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventListPrev : function (amt){
    var t = Tabs.AllianceList;
    if(amt <= -1)
       t.curPage = 1;
    else {
	    t.curPage-=amt;
	    if ( t.curPage < 1 ) {
	      t.curPage = 1;
	    }
    }
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  gotoPage : function (){
    var t = Tabs.AllianceList;
    var val = document.getElementById('idPageNum').value;
    if (t.MaxPage < 0 ) {
      document.getElementById('allListOut').innerHTML = 'List Alliances first.';
      return;
    }
    if (t.MaxPage < 0 || val > t.MaxPage || val < 1) {
      document.getElementById('allListOut').innerHTML = 'Page number out of range';
      return;
    }
    t.curPage = val;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchOtherAllianceInfo (t.curPage, t.eventGotOtherAlliancePage);
  },

  eventGotOtherAlliancePage : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.MaxPage=rslt.noOfPages;

    var m = '<div style="overflow:auto; height:556px;width:564px;"><TABLE><thead><TR style="font-weight:bold"> \
        <th class=xtab>Alliance Name</th><th class=xtab>Rank</th><th class=xtab>Members</th>\
        <th align=right class=xtab>Might</th><th class=xtab>Diplomacy</th><th class=xtab></th></tr></thead><tbody>';
    document.getElementById('allListOut').innerHTML = m;

    for (var i=0; i<rslt.otherAlliances.length; i++) {
      var alliance = rslt.otherAlliances[i];
      var dip = '';
      dip = getDiplomacy(alliance.allianceId);

      m += '<TR class="pt'+ dip + '"><TD class=xtab>' + alliance.name +'</td><TD align=right class=xtab>'+ alliance.ranking +'</td><TD align=right class=xtab>'+ alliance.membersCount +'</td>\
       <TD align=right class=xtab>'+ addCommasInt(alliance.might) +'</td><TD class=xtab>'+ dip +'</td>\
       <TD class=xtab><a onclick="PTgetMembers('+ alliance.allianceId +')">View Members</a></td></tr>';
    }
    m += '</tbody></TABLE><div style="font-weight:bold"; height:20px;width:560px; ><span> ';
	if  (t.curPage > 1) {
		m +=' &nbsp;<a onclick="PCalClickPrev(-1)"> [|<] </a> &nbsp;<a onclick="PCalClickPrev(1)"> [<] </a>&nbsp; &nbsp;';
	}
	if (t.curPage < t.MaxPage) {
		m += '<a onclick="PCalClickNext(1)"> [>] </a> &nbsp;<a onclick="PCalClickNext(9999)"> [>|] </a> &nbsp; &nbsp;';
	}

    m += ' &nbsp; page <INPUT align=right id=idPageNum type="text" size=4 value='+ t.curPage + ' /> of '+t.MaxPage;

	m += '</span></div>';
    m += '</div>';
    document.getElementById('allListOut').innerHTML = m;
	document.getElementById('idPageNum').addEventListener ('change', t.gotoPage, false);
	//document.getElementById('idPageNum').value = t.curPage;
 },

  showCurrentPage : function (){
    var t = Tabs.AllianceList;
    var myA = getMyAlliance ();

    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    if (myA[0]!=0  ) {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }
    else {
       t.fetchOtherAllianceInfo ( t.curPage, t.eventGotOtherAlliancePage);
    }

  },

  eventGotMemberList : function (rslt){
    var t = Tabs.AllianceList;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.memberListRslt = rslt;
    var uList = [];
    for (k in rslt.results)
      uList.push (rslt.results[k].userId);
    t.fetchPlayerStatus (uList, function(r){t.eventGotMemberOnlineList(r)});
  },

  eventGotMemberOnlineList : function (rslt){
    var t = Tabs.AllianceList;
    var numInvalid = 0;
    var numPlayers = 0;
    t.dat = [];
    for (var i=0; i<t.memberListRslt.results.length; i++){
      p = t.memberListRslt.results[i];
      if (p.userId == 0){
        ++numInvalid;
      } else {
        ++numPlayers;
        for (var c=0; c<p.cities.length; c++){
          t.dat.push ([p.displayName, parseInt(p.might), p.officerType, parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
               parseInt(p.cities[c].xCoord), parseInt(p.cities[c].yCoord), p.cities[c].cityName, 0, rslt.data[p.userId]?1:0, p.userId]);
        }
      }
    }
    t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
    t.displayMembers (t.memberListRslt.allianceName, numPlayers);
  },

  // sort and display
  reDisp : function (){
    var t = Tabs.AllianceList;
    function sortFunc (a, b){
      var t = Tabs.AllianceList;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else if (typeof(a[t.sortColNum]) == 'boolean'){
// TODO !!
return 0;
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    for (var i=0; i<t.dat.length; i++){
      m += '<TR style="max-height:30px"><TD class=xxtab>'+ t.dat[i][0] +'</td><TD align=right class=xxtab>'+ addCommasInt(t.dat[i][1])
         +'</td><TD align=center class=xxtab>'+ t.dat[i][3] +'</td><TD class=xxtab>'+ officerId2String(t.dat[i][2])
         +'</td><TD class=xxtab>'+ (t.dat[i][9]?'<SPAN class=boldRed><blink>Online</blink></span>':'') +'</td><TD class=xxtab>'+ t.dat[i][7] +'</td><TD align=right class=xxtab>'+ t.dat[i][4]
         +'</td><TD align=center class=xxtab><DIV onclick="ptGotoMap('+ t.dat[i][5] +','+ t.dat[i][6] +')"><A>'+ t.dat[i][5] +','+ t.dat[i][6] +'</a></div></td>\
            <TD align=right class=xxtab style="padding-right:20px;">'+ t.dat[i][8].toFixed(2) +'</td>'+
		    '<td class=xxtab><span onclick="PCplo(this, \''+ t.dat[i][10] +'\')"><A>last Login</a></span><td></tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;
    if (parseInt(tbody.clientHeight) > 475){
      tbody.style.height = '475px';
      tbody.style.maxHeight = '475px';
    }
//new CtableToText('tabAllMembers').toText();
  },


  setDistances : function (x, y){
    var t = Tabs.AllianceList;
    for (var i=0; i<t.dat.length; i++)
      t.dat[i][8] = distance (x, y, t.dat[i][5], t.dat[i][6]);
  },

  sortColNum : 8,
  sortDir : 1,

  displayMembers : function (allName, numPlayers){
    var t = Tabs.AllianceList;
    function alClickSort (e){
      var t = Tabs.AllianceList;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    unsafeWindow.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#20b2aa;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
      <DIV class=ptstat><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab> &nbsp; '+ allName +'</td>\
        <TD class=xtab width=80% align=center>Distance is from <SPAN id=distFrom>'+ Cities.cities[0].name +' ('+ Cities.cities[0].x +','+ Cities.cities[0].y +')</span></td><TD class=xtab align=right>'+ numPlayers +' players found &nbsp; </td></tr></table></div>\
      <DIV style="height:540px; max-height:650px; overflow-y:auto; overflow-x:auto;">\
      <TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD>\
      <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Player</div></a></td>\
        <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Might</a></div></td>\
        <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
        <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Rank</a></div></td>\
        <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
        <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
        <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Lvl</a></div></td>\
        <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coords</a></div></td>\
        <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
        <TD class=clickable><DIV><A>Last Login</a></div></td></tr></thead>\
      <TBODY id=allBody style="background-color:#ffffff; overflow-y:auto; overflow-x:auto;"></tbody></table>\
      <DIV style="top:720px; left:0px; position:absolute; width:100%;  background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">\
        <TABLE width=100%><TR><TD class=xtab>Data is from the leaderboard and may be up to 24 hours old!</td>\
          <TD class=xtab align=right>Click on column headers to sort</td></tr></table></div></div>';
    document.getElementById('allListOut').innerHTML = m;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Show distance from: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; Or, choose city: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
    new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  },

  eventCoords : function (city, x, y){
    var t = Tabs.AllianceList;
    var m = '';
    if (city != null)
      m = city.name +' ('+ city.x +','+ city.y +')';
    else
      m = x +','+ y;
    document.getElementById('distFrom').innerHTML = m;
    t.setDistances(x,y);
    t.reDisp();
  },

  eventGetMembers : function (aid){
    var t = Tabs.AllianceList;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching ...</center>';
    t.fetchAllianceMemberList (aid, null, t.eventGotMemberList);
  },

  fetchAllianceMemberList : function (allianceId, allianceName, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.perPage = 100;
    if (allianceName)
      params.allianceName = allianceName;
    if (allianceId && allianceId != 0)
      params.allianceId = allianceId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchLeaderboard : function (uid, notify) {
    var t = Tabs.AllianceList;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = Tabs.AllianceList;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("No alliance found under")!=0 || !rsltM.ok){
          notify (rsltA);
          return;
        }
        rsltA.ok = true;
        rsltA.count = 0;
        rsltA.alliancesMatched = {};
      }
      if (rsltM.ok){
        rsltA.alliancesMatched['a'+rsltM.allianceInfo.allianceId] = {allianceId: rsltM.allianceInfo.allianceId, allianceName: rsltM.allianceInfo.allianceName,
              membersCount: rsltM.allianceInfo.members, relation: null, might: rsltM.allianceInfo.might, ranking: rsltM.allianceInfo.ranking};
        ++rsltA.count;
      }
      notify (rsltA);
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.allianceName = allianceName;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (myAid!=null && myAid>0)
          t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});
        else
          notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchOtherAllianceInfo : function (pageNum, notify){    // as in alliance list, sorted by rank, 10 per page
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pageNo = pageNum;
    params.cityId = unsafeWindow.currentcityid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchMyAllianceInfo : function (notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerList : function (name, notify){  // at least 3 chars!!
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

/***
ajax/getOnline.php:
  (string) ok = true
  (object) data = [object Object]
    (boolean) 4394121 = false
  (undefined) errorMsg: null = null
***/
  fetchPlayerStatus : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },

  fetchPlayerLastLogin : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },
};

/********** Gifts Tab **********/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&');
  var args = {};
  for (i=0; i<a.length; i++){
    var s = a[i].split ('=');
    args[s[0]] = s[1];
  }
  return args;
}
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: "post",
    url: url,
    data: implodeUrlArgs(args),
    headers: { "Content-Type": "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1',
               'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' },
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxPost.onLoad ('+ label +'):\n '  + inspect (rslt, 6, 1));
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}
function GM_AjaxGet (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxGet ('+ label +'): ' + url);
  GM_xmlhttpRequest({
    method: "get",
    url: addUrlArgs(url, args),
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxGet.onLoad ('+ label +')  len='+ rslt.responseText.length +':\n '  + inspect (rslt, 6, 1));
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}
Tabs.Gifts = {
  tabOrder : 15,
  gifts : null,
  myDiv : null,
  doList : [], // list of gifts to accept
  doServer : 0,
  accepting : false,

  init : function (div){
    var t = Tabs.Gifts;
    t.myDiv = div;
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD width=200></td><TD align=center><INPUT id="pasubGifts" type=submit value="Check for Gifts" \></td><TD width=200 align=right><INPUT id=paGiftHelp type=submit value=HELP></td></tr></table><HR>\
        <DIV id=giftDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
    document.getElementById('paGiftHelp').addEventListener ('click', t.helpPop, false);
    if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },

  show : function (){
  },
  hide : function (){
  },

  helpPop : function (){
    var helpText = '<BR>The GIFTS tab helps you accept gifts easier than going through facebook. To use it, first hit the \'Check for Gifts\'\
        button.  This will fetch the facebook gifts page and will list all of the KofC gifts which are available.<BR><BR>\
        From the list, check all of the gifts that you want to accept or press the \'All\' button to select all of them.  Be sure to select which \
        domain you wish to apply the gifts to. If you want the gifts to be deleted from facebook after accepting them, set the \'delete gifts\'\
        option to \'Always\'. Now, press the \'Accept Gifts\' button to accept the selected gifts.  Note that this process takes some time as there are 4 webpages\
        that are being accessed for each gift!<BR><BR>\
        NOTES:<UL><LI>The Facebook gifts page lists up to 100 gifts for <B>all</b> of your game apps. This means that only some of the KofC\
        gifts which are available will be listed. After accepting gifts, be sure to \'Check for Gifts\' again to see if more show up!<p>\
        <LI>If you choose not to delete gifts after accepting them, they may be available to get again! After the process is complete, just press the\
        \'Check for Gifts\' button again to see what gifts are available.</ul>';
    var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
    pop.centerMe (mainPop.getMainDiv());
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>: Accepting gifts</center>';
    pop.show (true);
  },


  e_clickedGifts : function  (){     // (also cancel accepting)
    var t = Tabs.Gifts;
    if (t.accepting){
      document.getElementById('pasubGifts').value = 'Check for Gifts';
      document.getElementById('giftDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('giftDiv').innerHTML = 'Fetching Facebook gifts page ...';

    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        document.getElementById('giftDiv').innerHTML += rslt.errMsg;
        return;
      }
      t.gifts = rslt;
      if (!Options.giftDomains.valid && t.gifts.length>0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});    // try to get domain list ... don't delete gift!
        return;
      }
      listGifts();
    }

    function listGifts (){
//logit ("LIST GIFTS");
//logit (inspect (t.gifts, 8, 1));
      var m = '<DIV class=pbStat><CENTER>KofC gifts &nbsp; &nbsp; &nbsp; ('+ t.gifts.length +' found)</center></div>';
      if (t.gifts.length<1){
        document.getElementById('giftDiv').innerHTML = m + '<BR><BR><CENTER>No gifts found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>Server to apply gifts to: </td><TD>'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'</td></tr>\
          <TR><TD align=right>Delete gifts after accepting</td><TD>'
        + htmlSelector ({y:'Always', e:'Only if Error', n:'Never'}, Options.giftDelete, 'id=pbGiftDel')
        + '</td></tr><TR><TD>Select gifts you want to accept and hit: </td><TD width=250><INPUT type=submit id=pbGiftDo value="Accept Gifts">\
        &nbsp; <SPAN id=pbGiftNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbGiftButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbGiftButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbGiftTbody>\
        <TR style="font-weight:bold; background:white"><TD>Gift</td><TD>Date</td><TD>From (server)</td><TD width=20></td></tr>';
      t.gifts.sort (function (a,b){  // sort by gift name, date
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i<t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '<TR><TD><INPUT type=checkbox id=pbgchk_'+ i +'> &nbsp;'+ giftName +'</td><TD>'+ date +'</td>\
              <TD>'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')</td></tr>';
      }
      document.getElementById('giftDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      document.getElementById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbGiftTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_butAll : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = true;
  },

  e_butNone : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = false;
  },

  getErDone : function (){
    var t = Tabs.Gifts;
    t.doList = [];
    document.getElementById('pbGiftNone').innerHTML = '';
    Options.giftDelete = document.getElementById('pbGiftDel').value;
    for (var i=0; i<t.gifts.length; i++){
      if (document.getElementById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbGiftNone').innerHTML = 'None Selected!';
      return;
    }
    t.doServer = document.getElementById('pbGiftServers').value;
    t.accepting = true;
    document.getElementById('pasubGifts').value = 'Stop Accepting';
    document.getElementById('giftDiv').innerHTML = '<DIV id=acpDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting '+ t.doList.length +' gifts:</b><BR></div>';
    t.acceptNext ();
  },


  allDone : function (msg){
    var t = Tabs.Gifts;
    document.getElementById('acpDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pasubGifts').value = 'Check for Gifts';
    t.accepting = false;
  },


  acceptNext : function (){
    var t = Tabs.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting gifts.');
      return;
    }
    var acpDiv = document.getElementById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+ gift.gift +'</b> from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Getting data ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);

    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }

    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &nbsp; Accepting .';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }

      if (rslt.feedback)
        msg = '<B>'+ rslt.feedback + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';
      if (rslt.del && Options.giftDelete!='n'){
        t.deleteGift (gift);
        msg += ' Gift Deleted.';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();
    }

    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = 'OK.';
      if (rslt.ok)
        actionLog ('Accepted Gift:  '+ gift.gift +' from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2)     );
      else
        msg = '<SPAN class=boldRed>'+ rslt.msg +'</span>';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &nbsp; Deleted.';
        t.deleteGift (gift);
      }
      t.acceptNext ();
    }
  },



  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};

    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Accept');
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Accept');
     }

//  parse multiple reply formats .....
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      var m = /<div class=\'nm\'>(.*?)<\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Got '+ m[1]});
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },


  deleteGift : function (gift){
    var pargs = {};
//logit ("DELETING GIFT!");
    for (var i=0; i<gift.inputs.length; i++){
//      if (gift.inputs[i].name != 'actions[reject]')
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost ('http://www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Delete');
    function gotAjaxPost (p){
    }
  },


// get 3 pages ... facebook convert page, facebook claim page and first KofC page (for gift ID) ...
// adds: dat.url, dat.giftId and dat.ver to gift object (if available)
// notify: {ok:true/false,  feedback:,  ajaxErr:  }
  ajaxGetGiftData : function (gift, notify, progress, DELETE){
    var t = Tabs.Gifts;
    gift.dat = {};

    GM_AjaxGet (gift.submit, null, got1, 'Page 1');

    function got1 (page){
// sample URL: http://apps.facebook.com/kingdomsofcamelot/?page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9
// sample result: .... window.location.replace("http:\/\/apps.facebook.com\/kingdomsofcamelot\/?page=claimgift&gid=1045&sid=1432568&s=250&in=1432568&si=5"); ...
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 1'});
      progress ('1');
      var m = /window.location.replace\(\"(.*?)\"/im.exec (page);
      if (m == null)
               m = /ngoURI\(\'(.*?)\'/im.exec (page);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 1'});
      var url = m[1].replace ('\\/', '/', 'g');
               url = url.replace ('\\\\x26', '&', 'g');
      GM_AjaxGet (url, '', got2, 'Page 2');
    }

// sample URL: http://www88.kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php?sid=4411654&gid=361&standalone=0&res=1&iframe=1&wcfbuid=1400526627&fbml_sessionkey=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&lang=en&in=4411654&si=9&ts=1293677199.881&page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9&appBar=&kabamuid=114014&tpuid=alYJXw-Us9z9qjRn3DHChEtsFvo&fb_sig_in_iframe=1&fb_sig_base_domain=kingdomsofcamelot.com&fb_sig_locale=en_GB&fb_sig_in_new_facebook=1&fb_sig_time=1293677199.924&fb_sig_added=1&fb_sig_profile_update_time=1267240352&fb_sig_expires=1293681600&fb_sig_user=1400526627&fb_sig_session_key=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&fb_sig_ss=7wEsU_e0FLqhrGxE1LAZDg__&fb_sig_cookie_sig=514b59deb303becb5c5c654c9d457732&fb_sig_ext_perms=email%2Cuser_birthday%2Cuser_religion_politics%2Cuser_relationships%2Cuser_relationship_details%2Cuser_hometown%2Cuser_location%2Cuser_likes%2Cuser_activities%2Cuser_interests%2Cuser_education_history%2Cuser_work_history%2Cuser_online_presence%2Cuser_website%2Cuser_groups%2Cuser_events%2Cuser_photos%2Cuser_videos%2Cuser_photo_video_tags%2Cuser_notes%2Cuser_about_me%2Cuser_status%2Cfriends_birthday%2Cfriends_religion_politics%2Cfriends_relationships%2Cfriends_relationship_details%2Cfriends_hometown%2Cfriends_location%2Cfriends_likes%2Cfriends_activities%2Cfriends_interests%2Cfriends_education_history%2Cfriends_work_history%2Cfriends_online_presence%2Cfriends_website%2Cfriends_groups%2Cfriends_events%2Cfriends_photos%2Cfriends_videos%2Cfriends_photo_video_tags%2Cfriends_notes%2Cfriends_about_me%2Cfriends_status&fb_sig_country=us&fb_sig_api_key=0ab5e11ff842ddbdbf51ed7938650b3f&fb_sig_app_id=130402594779&fb_sig=fca33813d9e1c9d411f0ddd04cf5d014
    function got2 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 2'});
      progress ('2');
	  var m = page.match (/form action=\\"(.*?)\\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 2'});
      var url = m[1].htmlSpecialCharsDecode();
      url = url.replace (/lang=.*?&/, 'lang=en&');
	  url = url.replace ('\\/', '/', 'g');
      gift.dat.url = url;
      GM_AjaxGet (url, '', got3, 'Page 3');
    }

    function got3 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 3'});
      progress ('3');
      var m = /<div class=\'giftreturned\'>(.*?)<\/div/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(We were unable to find your gift.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(Unable to get the list of your friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1]});
        return;
      }
      var m = /(Facebook says you are not friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }

      var regexp = /<option value='(.*?)'.*?>(.*?)</img ;
      var m;
      while ( (m = regexp.exec (page)) != null){
        if (m[1] != 'noserver')
          Options.giftDomains.list[m[1]] = m[2];
      }
      Options.giftDomains.valid = true;
      if (page.indexOf('ver:2') >= 0){
        m = /giftinviteid:(.*?),/im.exec(page);
        if (m == null)
          notify ({ajaxErr:'PARSE Error (ver:2, giftinviteid not found) - page 3'});
        gift.dat.giftId = m[1];
        gift.dat.ver = 2;
/** for KofC change 20110119
        m = /wcfbuid=([0-9]*)/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:2, wcfbuid not found) - page 3'});
          return;
        }
        gift.dat.wcfbuid = m[1];
**/
      } else {
        m = /name='giftId' value='(.*?)'/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:1, giftId not found) - page 3'});
          return;
        }
        gift.dat.giftId = m[1];
        gift.dat.ver = 1;
      }
      notify ({ok:true});
    }
  },


  // notify with gifts[] or: {errMsg:xxx}
  fetchGiftsPage : function (notify){
    GM_AjaxGet ('http://www.facebook.com/games?ap=1', '', parseGiftsPage, 'FB Gifts Page');

    // ...profile.php?id=100000710937192">Anestis Mallos</
    // Here is a GIFTNAME you can use
    // OR:  ... would like to give you a gift of GIFTNAME in Kingdoms of Camelot
    // OR:  ... would like to give you a GIFTNAME in Kingdoms of Camelot
    // <input value=\"Accept\" type=\"submit\" name=\"actions[http:\/\/apps.facebook.com\/kingdomsofcamelot\/convert.php?pl=1&in=4411654&ty=1&si=9&wccc=fcf-inv-9&ln=11&da=20101229&ex=gid%3A361%7Csid%3A4411654%7Cs%3A88]\" \/><\/label>
    function parseGiftsPage  (p){
      if (p == null)
        notify ({errMsg:'Ajax Comm Error'});
      p = p.replace ('\\u003c', '<', 'g');
      var t = Tabs.Gifts;
      var gifts = [];
      try {
        var m = p.split ('<form');
        for (var i=0; i<m.length; i++){
          if ( m[i].indexOf('kingdomsofcamelot')<0)
            continue;
		  var mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/a><\\\/span>.*?(?:give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
		  if (mm==null)
            mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/span><\\\/span><\\\/a>.*?(?:give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
          if (mm==null)
            continue;
          var giver = mm[1];
          if (mm[2])
            var gift = mm[2].trim();
          else
            var gift = mm[3].trim();

          // get all inputs ...  (name, value, type)
          var inps = [];
          var args = {};
          var inpsub = null;
          var ins = m[i].match (/<input.*?>/igm);
          for (var ii=0; ii<ins.length; ii++){
            var it = {};
            mm = /value=\\\"(.*?)\\\"/im.exec(ins[ii]);
            it.value = mm[1];
            mm = /name=\\\"(.*?)\\\"/im.exec(ins[ii]);
            it.name = mm[1];
            mm = /type=\\\"(.*?)\\\"/im.exec(ins[ii]);
            it.type = mm[1];
            if (it.type=='submit' && it.name!='actions[reject]'){
              it.name = eval ('"'+ it.name +'"');
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;', '&', 'g');
              var a = inpsub.split ('&');
              for (var iii=0; iii<a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii<s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
                  }
                }
              }
            } else {
              inps.push (it);
            }
          }
          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        }
        notify (gifts);
      } catch (e) {
        notify ({errMsg:"Error parsing Facebook gift page"+ e});
      }
    }
  },
}
/********** Knights Tab **********/
Tabs.Knights = {
  tabOrder : toKnights,
  tabDisabled : !ENABLE_KNIGHTS_TAB,         // if true, tab will not be added or initialized
  cont : null,
  state : null,
  displayTimer : null,

  init : function (div){
    var t = Tabs.Knights;
    t.cont = div;
    unsafeWindow.ptAssignSkill = t.clickedAssignPoints;
    t.cont.innerHTML = '<STYLE>table.ptTabPad tr.ptwpad {background-color:#ffffff; padding-left:15px}</style>\
       <DIV id=ptknightdiv style="max-height:660px; height:660px; overflow-y:auto">';
    t.show ();
  },

  hide : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);

    function _dispKnight (roleId, knight){
      var rid = roleId;
      if (roleId==null)
        rid = 1;
      var sty='';
      if (row++ % 2)
        sty = 'class=ptOddrow ';
      m = '<TR '+ sty +'valign=top align=right><TD><B>'+ (roleId==null ? '':knightRoles[rid][0]) +'</b></td><TD align=left>';
      if (knight == null) {
        m += '--------</td><TD colspan=4></td><TD class=ptentry colspan=5></td><TD colspan=2></td></tr>';
      } else {
        var level = parseInt(Math.sqrt(parseInt(knight.experience) / 75)) + 1;
        var unpoints = level - parseInt(knight.skillPointsApplied);
        var salary = (parseInt(knight.skillPointsApplied) + 1) * 20;
        totSalary += salary;
        var ass = '';
        if (knight.knightStatus == 10){
          ass = '<TD class=ptentry align=left colspan=4>Marching</td>';
        } else {
          if (unpoints > 0){
            unpoints = '<SPAN class="boldRed">'+ unpoints +'</span>';
          for (var i=0; i<4; i++){
            var sty = 'padding-left:1px;';
            if (i == rid)   // bold it
              sty += 'font-weight:bold;color:#116654';
            ass += '<TD class=ptentry align=left style="'+ sty +'" ><A style="'+ sty +'" onclick="ptAssignSkill(this,' + cid +','+ knight.knightId +','+ i +')">['+ knightRoles[i][2] +'] &nbsp;</a></td>';
          }
          }
          else
            ass = '<TD class=ptentry colspan=4></td>';
        }
        var skills = [];
        for (var i=0; i<4; i++){
          if (i == rid)
            skills[i] = '<B>'+ knight[knightRoles[i][1]] +'</b>';
          else
            skills[i] = knight[knightRoles[i][1]];
        }
        m += knight.knightName + '</td><TD>'+ skills[0] +'</td><TD>'+ skills[1] +'</td><TD>'+ skills[2] +'</td><TD>' + skills[3]
          +'</td><TD class=ptentry>'+ unpoints +'</td>'+ ass +'<TD>'+ addCommas(salary)
          +'</td><TD>'+ level +'</td></tr>';
      }
      return m;
    }

    var totSalary = 0;
    var m = '<TABLE cellspacing=0 align=center class=ptTabPad><TBODY>';
    for (var c=0; c<Cities.numCities; c++) {
      var cid = Cities.cities[c].id;
      m += '<TR><TD colspan=13><DIV class=ptstat>'+ Cities.cities[c].name +'</div></td></tr>\
          <TR class=ptwpad style="font-weight:bold" align=right><TD width=70>Role</td><TD width=160 align=center>Name</td><TD width=26>Pol</td><TD width=26>Com</td>\
          <TD width=26>Int</td><TD width=26>Res</td><TD width=90 align=center colspan=5>--- Unassigned ---</td><TD width=40 align=right> Salary </td><TD width=35>Level</td></tr>';
      totSalary = 0;
      var did = {};
      var row = 0;
      for (var i=0; i<knightRoles.length; i++){
        var leader = Seed.leaders['city'+cid][knightRoles[i][1]+'KnightId'];
        if (leader == 0)
          m += _dispKnight (i, null);
        else {
          m += _dispKnight (i, Seed.knights['city'+cid]['knt'+leader]);
          did['knt'+leader] = true;
        }
      }
      var list = [];
      for (k in Seed.knights['city'+cid]){
        if (!did[k])
          list.push (Seed.knights['city'+cid][k]);
      }
      list.sort (function (a,b){return parseInt(b.combat)-parseInt(a.combat)});
      for (i=0; i<list.length; i++)
        m += _dispKnight (null, list[i]);
      m += '<TR align=right><TD colspan=11><B>Total Salary:</b></td><TD>'+ addCommas(totSalary) +'</td></tr>';
    }
    document.getElementById('ptknightdiv').innerHTML = m +'</tbody></table></div>';
    t.displayTimer = setTimeout (t.show, 10000);
  },


  clickedAssignPoints : function (e, cid, kid, rid){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);

    var knight = Seed.knights['city'+cid]['knt'+kid];
    if (knight.knightStatus == 10){
      var row = e.parentNode.parentNode;
      row.childNodes[7].innerHTML = 'Marching';
      return;
    }
    sk = [];
    var unassigned = parseInt(Math.sqrt(parseInt(knight.experience)/75)) + 1  - parseInt(knight.skillPointsApplied);
    for (var i=0; i<4; i++){
      sk[i] = parseInt(knight[knightRoles[i][1]]);
      if (i == rid)
        sk[i] += unassigned;
    }
    var row = e.parentNode.parentNode;
    for (i=row.cells.length-1; i>=1; i--)
      row.deleteCell (i);
    var newCell=row.insertCell(-1);
    newCell.colSpan = 12;
    newCell.align= 'left';
    newCell.style.padding='1px 5px 1px 10px';
    var div = document.createElement ('div');
    div.style.backgroundColor = '#ffffff';
    div.style.textAlign = 'center';
    div.style.border = '1px solid';
    div.style.width = '98%';
    div.style.whiteSpace = 'normal';
    newCell.appendChild (div);
    div.innerHTML = 'Assigning '+ unassigned +' skill points to '+ knightRoles[rid][1] +' ... ';
    t.postSkillPoints (cid, kid, sk[0], sk[1], sk[2], sk[3], function (r){t.postDone(r, div)});
  },

  postDone : function (rslt, div){
    var t = Tabs.Knights;
    clearTimeout (t.displayTimer);
    if (rslt.ok){
      div.innerHTML += '<B>Done.</b>';
      t.displayTimer = setTimeout (t.show, 5000);
    } else {
      div.innerHTML += '<BR><SPAN class=boldRed>ERROR: '+ rslt.errorMsg +'</span>';
      t.displayTimer = setTimeout (t.show, 10000);
    }
  },

  postSkillPoints : function (cid, kid, pol, com, int, res, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.kid = kid;
    params.p = pol;
    params.c = com;
    params.i = int;
    params.r = res;
    if (DISABLE_POST_KNIGHT_SKILLS){
      setTimeout (function (){notify({ok:true})}, 1500);
//      setTimeout (  function (){notify({ok:false, errorMsg:"FAKE ERROR message, a long one, to test how it will fit and overflow! Perhaps you'll need to retry?"})}  , 2000);
      return;
    }
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/skillupKnight.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          var knight = Seed.knights["city" + cid]["knt" + kid];
          var up = pol + com + int + res - knight.politics - knight.combat - knight.intelligence - knight.resourcefulness;
          knight.politics = pol;
          knight.combat = com;
          knight.intelligence = int;
          knight.resourcefulness = res;
          knight.skillPointsApplied = (parseInt(knight.skillPointsApplied) + up).toString();
        }
        if (notify)
          notify (rslt);
      },
      onFailure: function () {
        if (notify)
          notify (rslt);
      },
    });
  },
};

/********** Reports Tab **********/
Tabs.Arc = {
  tabOrder : toReports,
  tabLabel : 'Reports',
  cont:null,
  state : null,

  init : function (div){
    var t = Tabs.Arc;
    t.cont=div;

    t.getAllianceReports();

    t.cont.innerHTML = '\
        <DIV class=ptstat>Search alliance reports for all actions against your alliance</div>\
        <DIV class=ptentry style="height:30px"><table>\
        <tr><td class=xtab> Pages\
        <span id=idSpanNumPages>:</span>\
        <select id="idArcSelect">\
        <option value=1> -- Select -- </option>\
        <option value=1> 1 </option>\
        <option value=5> 5 </option>\
        <option value=10> 10 </option>\
        <option value=20> 20 </option>\
        <option value=30> 30 </option>\
        <option value=40> 40 </option>\
        <option value=50> 50 </option>\
        <option value=60> 60 </option>\
        <option value=70> 70 </option>\
        <option value=80> 80 </option>\
        <option value=90> 90 </option>\
        <option value=100> 100 </option>\
        <option value=99999> All </option>\
        </select></td>\
        <TD class=xtab><INPUT id=idArcSearch type=submit value="Start Search" />\
        <span id=idSpanArcErrorMsg></span></td></tr>\
        </table></div>\
        <DIV id="arcResultsDiv" style="height:470px; max-height:470px; width=100%;"></div>';
        document.getElementById('idArcSearch').addEventListener ('click', t.handleArcSearch, false);
        document.getElementById('idArcSelect').addEventListener ('click', t.handleArcSelect, false);

    return this.cont;
  },

  DisplayReports : function (){
    var t = Tabs.Arc;
    var data = t.data;
    var results=document.getElementById("arcResultsDiv");
    if(!t.data.length) {
       results.innerHTML = '<center>No attacks on your alliance found</center>';
       return;
    }
    var m = '<center><table><thead><th>Page#</th><th>Date</th><th>Attacker</th><th>From</th><th>Alliance</th><th>Action</th><th>Target</th><th>At</th></thead>';
    m += '<tbody>';
    for ( var i=0; i<t.data.length;i++) {
       var rpt = data[i];
       if (rpt.side0Name=='undefined')
          continue;
       m += '<tr><td>'+rpt.page+'</td>\
            <td>'+unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime)+'</td>\
            <td>'+rpt.side1Name+'</td>\
            <td>'+rpt.side1XCoord+','+rpt.side1YCoord+'</td>\
            <td>'+rpt.side1AllianceName+'</td>\
            <td>'+rpt.marchName+'</td>\
            <td>'+rpt.side0Name+'</td>\
            <td>'+rpt.side0XCoord+','+rpt.side0YCoord+'</td>\
            </tr>';
    }
    m += '</tbody></table></center>';
    results.innerHTML = m;
  },

  handleArcSelect : function(rslt, page) {
    var t = Tabs.Arc;
    t.maxPages=document.getElementById("idArcSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    document.getElementById("idSpanNumPages").innerHTML = t.maxPages+'';
  },
  handleArcSearchCB : function(rslt, page) {
    var t = Tabs.Arc;
    if (rslt) {
       if (!rslt.ok) {
          document.getElementById("idSpanArcErrorMsg").innerHTML = rslt.errorMsg;
          return;
       }
       t.totalPages=rslt.totalPages;
       if (rslt.arReports && page) {
         var ar = rslt.arReports;
         var rptkeys = unsafeWindow.Object.keys(ar);
         var myAllianceId = getMyAlliance()[0];
         for (var i = 0; i < rptkeys.length; i++) {
              var rpt = ar[rptkeys[i]];
              rpt.page = page;
              var side0Name = rslt.arPlayerNames['p'+rpt.side0PlayerId];
              rpt.side0Name = side0Name;
              rpt.side1Name = rslt.arPlayerNames['p'+rpt.side1PlayerId];
              if (rpt.side0AllianceId > 0)
                rpt.side0AllianceName = rslt.arAllianceNames['a'+rpt.side0AllianceId];
              else
                rpt.side0AllianceName = 'unaligned';
              if (rpt.side1AllianceId > 0)
                rpt.side1AllianceName = rslt.arAllianceNames['a'+rpt.side1AllianceId];
              else
                rpt.side1AllianceName = 'unaligned';

              if (rpt.side0CityId > 0)
                rpt.side0CityName = rslt.arCityNames['c'+rpt.side0CityId];
              else
                rpt.side0CityName = 'none';
              if (rpt.side1CityId > 0)
                rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
              else
                rpt.side1CityName = 'none';
              if (rpt.marchType == 1)
                  rpt.marchName = 'Transport';
              else if (rpt.marchType == 3)
                  rpt.marchName = '<SPAN class=sco> Scouted</span>';
              else if (rpt.marchType == 2)
                  rpt.marchName = 'Reinf';
              else if (rpt.marchType == 4)
                  rpt.marchName = '<SPAN class=atk> Attacked</span>';
              else rpt.marchName = 'unknown';
              if (myAllianceId != rpt.side1AllianceId)
                 t.data.push(rpt);
         }
       }
       if (parseInt(page)+1 <= t.maxPages) {
          var results=document.getElementById("arcResultsDiv");
          results.innerHTML = '<center><b>...Searching '+(parseInt(page)+1)+'...</b></center>';
          t.getAllianceReports(parseInt(page)+1);
       }
       else if (page)
           t.DisplayReports();
    }
  },

  maxPages:1,
  data:[],
  totalPages:0,

  handleArcSearch : function() {
    var t = Tabs.Arc;
    var results=document.getElementById("arcResultsDiv");
    //logit("handleArcSearch");
    t.maxPages=document.getElementById("idArcSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    results.innerHTML = '<center><b>...Searching '+t.maxPages+' pages...</b></center>';
    t.data=[];
    t.getAllianceReports(1);
  },

  getAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          Tabs.Arc.handleArcSearchCB (rslt, pageNum);
      },
      onFailure: function (rslt) {
          Tabs.Arc.handleArcSearchCB (rslt, pageNum);
      },
    }, false);
  },

  show : function (){
  },

  hide : function (){
  },
};

/********** Wilds Tab **********/
var wildNames = {
   0: 'Bog',
  10: 'Grassland',
  11: 'Lake',
  20: 'Woods',
  30: 'Hills',
  40: 'Mountain',
  50: 'Plain',
};
var mercNames = {
  0: 'None',
  1: 'Novice',
  2: 'Intermediate',
  3: 'Veteran',
};
Tabs.Wilds = {
  tabOrder : toWilds,
  tabDisabled : !ENABLE_WILDS_TAB,         // if true, tab will not be added or initialized
  cont : null,
  state : null,
  upGoldTimer : null,
  wildList : [],
  buildList : {},

  init : function (div){
    var t = Tabs.Wilds;
    t.cont = div;
    unsafeWindow.ptButMaxTraps = t.e_butMaxTraps;
    unsafeWindow.ptInpWildTraps = t.e_inpTraps;
    unsafeWindow.ptButWildSet = t.e_butWildSet;
    t.cont.innerHTML = '<DIV id=wildContent style="maxheight:665px; height:665px; overflow-y:auto">';
    t.show ();
  },

  hide : function (){
    var t = Tabs.Wilds;
    clearTimeout (t.upGoldTimer);
  },

  show : function (){
    var t = Tabs.Wilds;
    clearTimeout (t.upGoldTimer);

    m = '<CENTER>'+ strButton20('RESET', 'id=ptwref') +'</center><TABLE cellspacing=0 cellpadding=0 class=ptTabPad align=center>';
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var cWilds = Seed.wilderness['city'+city.id];
      t.wildList[c] = [];
      var castle = parseInt(Seed.buildings['city'+ city.id].pos0[1]);
      var totw = 0;
      if (matTypeof(cWilds)=='object'){
        for (var k in cWilds)
          ++totw;
      }
      m += '<TR><TD colspan=20><DIV class=ptstat><TABLE class=ptNoPad width=100%><TR><TD width=100></td><TD width=90% align=center>'+ city.name
        +' &nbsp; ('+ city.x +','+ city.y +')</td><TD width=100 align=right>Wilds: '+ totw +' of '+ castle +' &nbsp; </TD></tr></table></div></td></tr>';
      var row = 0;
      var sortem = [];

      if (matTypeof(cWilds) != 'array') {
        m += '<TR style="background-color:white; font-weight:bold;" align=right><TD align=left>Wild Type</td><TD></td><TD align=left>Coords</td><TD>Traps</td><TD align=left>Mercenaries</td>\
         <TD width=15></td><TD colspan=3 class=entry>'+ htmlTitleLine(' CHANGE DEFENSES ') +'</td></tr>';
        for (var k in Seed.wilderness['city'+city.id])
          sortem.push (Seed.wilderness['city'+city.id][k]);
        sortem.sort (function (a,b){
          var x; if ((x = b.tileLevel-a.tileLevel)!=0)
            return x;
          return a.tileType-b.tileType;
        });
        for (i=0; i<sortem.length; i++){
          var wild = sortem[i];
          var wildDef = Seed.wildDef['t'+wild.tileId];
          if (wildDef==undefined || !wildDef)
            wildDef = {fort60Count:0, mercLevel:0};
          var maxTraps = parseInt(wild.tileLevel)*100;
          var maxBuild = maxTraps - parseInt(wildDef.fort60Count);
          t.wildList[c][i] = [wild.tileId, maxBuild];
          m += '<TR align=right'+ (row++%2?'':' class=ptOddrow') +'><TD align=left>'+ wildNames[wild.tileType] +'</td>\
            <TD>'+ wild.tileLevel +'</td><TD align=center><A onclick="ptGotoMap('+ wild.xCoord +','+ wild.yCoord +')">'+ wild.xCoord +','+ wild.yCoord +'</a></td>\
            <TD align=right><B>'+ wildDef.fort60Count +'</b></td><TD align=center><B>'+ mercNames[wildDef.mercLevel] +'</b></td>\
            <TD></td><TD align=left class=ptentry><B>Build Traps:</b> <INPUT onchange="ptInpWildTraps(this)" id=ptwt_'+ c +'_'+ i
              + (maxBuild==0?' DISABLED ':'')+' style="margin:0px; padding:0px" type=text size=3 maxlength=4></td>'
          if (wildDef.fort60Count < maxTraps)
            m += '<TD class=ptentry style="padding:0px">'+ strButton14('Max', 'id=ptwx_'+ c +'_'+ i +' onclick="ptButMaxTraps(this)"') +'</td>';
          else
            m += '<TD class=ptentry></td>';
          m += '<TD class=ptentry> &nbsp; &nbsp; <B>Mercs:</b> ' + htmlSelector(mercNames, wildDef.mercLevel, 'id=ptwm_'+ c +'_'+ i) +' &nbsp; &nbsp; </td></tr>';
        }
        m += '<TR><TD colspan=6></td><TD class=ptentry align=center colspan=3><TABLE><TR><TD width=40% align=left>Cost: <SPAN id=ptwgc_'+ c +'>0</span></td>\
            <TD width=10%>'+ strButton20("SET DEFENSES", 'onclick="ptButWildSet('+ c +')"') +'<TD width=40% align=right>Gold: <SPAN id=ptwgt_'+ c +'>0</span></td></td></tr></table></td></tr>';
      } else {
        m+= '<TR><TD colspan=9> &nbsp; </td></tr>';
      }
    }
    document.getElementById('wildContent').innerHTML = m + '</table></div>';
    document.getElementById('ptwref').addEventListener ('click', t.show, false);
    t.updateGold ();
  },

  e_butWildSet : function (c){
    var t = Tabs.Wilds;
    var totTraps = 0;
    var cid = Cities.cities[c].id;
    t.buildList = {cityId:cid, list:[]};

    for (var w=0; w<t.wildList[c].length; w++){
      var wild = Seed.wilderness['city'+cid]['t'+t.wildList[c][w][0]];
      var wildDef = Seed.wildDef['t'+t.wildList[c][w][0]];
// TODO: Seed.wildDef is null if just aquired
if (wildDef==undefined || !wildDef)
  wildDef = {fort60Count:0, mercLevel:0};

      var numTraps = parseInt(document.getElementById('ptwt_'+ c +'_'+ w).value, 10);
      if (isNaN(numTraps))
        numTraps = 0;
      totTraps += numTraps;
      if (numTraps > 0)
        t.buildList.list.push (['T', wild.tileId, numTraps]);
      var mercId =document.getElementById('ptwm_'+ c +'_'+ w).value;
      if (wildDef.mercLevel != mercId)
        t.buildList.list.push (['M', wild.tileId, mercId, wildDef.mercLevel]);
    }

    var totCost = totTraps * 200;
    if (totCost > parseInt(Seed.citystats['city'+cid].gold[0])){
      document.getElementById('ptwgc_'+ c).innerHTML = '<SPAN class=boldRed>'+ addCommasInt(totCost) +'</span>';
      return;
    }
    if (t.buildList.list.length == 0)
      return;
    t.setCurtain (true);
    var popDiv = t.setPopup (true);
    popDiv.innerHTML = '<TABLE class=ptTab width=100% height=100%><TR><TD>\
          <DIV class=ptstat>Setting Wilderness Defenses</div>\
          <DIV id=ptWildBuildDiv class=ptDiv style="padding:10px; height:225px; max-height:225px; overflow-y:auto"></div>\
          </td></tr><TR><TD align=center>'+ strButton20('CANCEL', 'id=ptWildCancel') +'</td></tr></table>';
    document.getElementById('ptWildCancel').addEventListener('click', t.e_buildCancel, false);
    t.processQue(null);
  },

  e_buildCancel : function (){
    var t = Tabs.Wilds;
    t.setCurtain(false);
    t.setPopup(false);
    t.show();
  },

  processQue : function (errMsg){
    var t = Tabs.Wilds;
    var what = t.buildList.list.shift();
    var div = document.getElementById('ptWildBuildDiv');
    if (what==null || errMsg){
      if (errMsg)
        div.innerHTML += '<BR><SPAN style="white-space:normal;" class=boldRed>ERROR: '+ errMsg +'</span>';
      else
        div.innerHTML += 'Done.<BR>';
      document.getElementById('ptWildCancel').firstChild.innerHTML = 'CLOSE';
      return;
    }
    if (div.innerHTML != '')
      div.innerHTML += 'Done.<BR>';
    var wild = Seed.wilderness['city'+ t.buildList.cityId]['t'+what[1]];
    if (what[0] == 'T'){
      div.innerHTML += 'Building '+ what[2] +' traps for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postBuyTraps (t.buildList.cityId, what[1], what[2], t.processQue);
    } else {
      div.innerHTML += 'Setting Mercenaries to '+ mercNames[what[2]] +' for '+ Cities.byID[t.buildList.cityId].name +'\'s wilderness at '+ wild.xCoord +','+ wild.yCoord +' ... ';
      t.postHireMercs (t.buildList.cityId, what[1], what[2], what[3], t.processQue);
    }
  },

  setPopup : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var div = document.createElement('div');
      div.id = 'ptWildPop';
      div.style.backgroundColor = '#fff';
      div.style.zindex = mainPop.div.zIndex+2;
      div.style.opacity = '1';
      div.style.border = '3px outset red';
      div.style.width = '550px';
      div.style.height = '300px';
      div.style.display = 'block';
      div.style.position = 'absolute';
      div.style.top = '100px';
      div.style.left = '100px';
      t.cont.appendChild (div);
      return div;
    } else {
      t.cont.removeChild (document.getElementById('ptWildPop'));
    }
  },

  setCurtain : function (onoff){
    var t = Tabs.Wilds;
    if (onoff){
      var off = getAbsoluteOffsets (t.cont);
      var curtain = document.createElement('div');
      curtain.id = 'ptWildCurtain';
      curtain.style.zindex = mainPop.div.zIndex+1;
      curtain.style.backgroundColor = "#000000";
      curtain.style.opacity = '0.5';
      curtain.style.width = t.cont.clientWidth +'px';
      curtain.style.height = t.cont.clientHeight +'px';
      curtain.style.display = 'block';
      curtain.style.position = 'absolute';
      curtain.style.top = off.top + 'px';
      curtain.style.left = off.left + 'px';
      t.cont.appendChild (curtain);
    } else {
      t.cont.removeChild (document.getElementById('ptWildCurtain'));
    }
  },

  e_butMaxTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr(7);
    var inp = document.getElementById('ptwt_'+ c +'_'+ w);
    inp.value = t.wildList[c][w][1];
    t.e_inpTraps (inp);
  },

  e_inpTraps : function (e){
    var t = Tabs.Wilds;
    var c = e.id.substr(5,1);
    var w = e.id.substr (7);
    var tot = 0;
    for (var i=0; i<t.wildList[c].length; i++) {
      var val = parseInt(document.getElementById('ptwt_'+ c +'_'+ i).value, 10);
      if (isNaN(val))
        val = 0;
      tot += val;
    }
    document.getElementById('ptwgc_'+ c).innerHTML = addCommasInt(tot * 200);
    if (isNaN(e.value) || e.value<0 || e.value>t.wildList[c][w][1]){
      e.value = '';
      e.style.backgroundColor = '#ffaaaa';
    } else
      e.style.backgroundColor = null;
  },

  updateGold : function (){
    var t = Tabs.Wilds;
    for (var c=0; c<Cities.numCities; c++){
      var e = document.getElementById('ptwgt_'+ c +'');
      if (e)
        e.innerHTML = addCommasInt(Seed.citystats['city'+Cities.cities[c].id].gold[0]);
    }
    t.upGoldTimer = setTimeout (t.updateGold, 2000);
  },

  postBuyTraps : function (cid, tid, quant, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify(null)}, 1500);
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.quant = quant;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/buyWildTraps.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].fort60Count = parseInt(Seed.wildDef["t"+ tid].fort60Count) + parseInt(quant);
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

  postHireMercs : function (cid, tid, newLevel, oldLevel, notify){
    if (DISABLE_POST_DEFENSES){
      setTimeout (function (){notify('OK, so it\'s not really an error, it\'s just George playing around to see how the error message looks. It\'s a long one, how does it fit? Is it OK? Are you sure? JANE! Get me off of this thing!')}, 1500);
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = cid;
    params.tid = tid;
    params.lv = newLevel;
    params.olv = oldLevel;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/hireWildMerc.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok){
          if (!Seed.wildDef["t"+ tid])
            Seed.wildDef["t"+ tid] = {tileId:tid, fort60Count:0, mercLevel:0};
          Seed.wildDef["t"+ tid].mercLevel = newLevel;
        }
        if (notify)
          notify (rslt.errorMsg);
      },
      onFailure: function () {
        if (notify)
          notify ('AJAX ERROR');
      },
    });
  },

}

/********** Options Tab **********/
Tabs.Options = {
  tabOrder: toOptions,
  myDiv : null,
  fixAvailable : {},
  displayTimer:null,
  curTabBut : null,
  curTabName : null,

  init : function (div){
    var t = Tabs.Options;


    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubO type=submit value=Options></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubT type=submit value=Tabs></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubC type=submit value=Colors></td></tr></table><HR class=ptThin>\
      <DIV id=ptOptionsOutput style="margin-top:10px; background-color:white; height:500px"></div>';
    t.optionsDiv = document.getElementById('ptOptionsOutput');
    document.getElementById('ptmrchSubO').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubC').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubT').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSubO'));

    function e_butSubtab (evt){
      changeSubtab (evt.target);
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab';
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel';
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      t.show ();
    }
  },

  hide : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = Tabs.Options;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'C')
      t.showColors();
    else if (t.curTabName == 'T')
      t.showTabs();
    else
      t.showOptions();
  },

  /***   Options SUBTAB  ***/
  showOptions : function (){
    var t = Tabs.Options;

    try {
      m = '<DIV style="height:500px; max-height:500px;"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>Power Config:</b></td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>Remember window open state on refresh</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>Hide window when clicking on map coordinates</td></tr>\
        <TR><TD colspan=2><BR><B>KofC Features:</b></td></tr>\
        <TR><TD><INPUT id=ptEnableFoodWarn type=checkbox /></td><TD>Show \'food left\' in RED if food will run out in less than \
            <INPUT id=optFoodHours type=text size=3 value="'+ Options.foodWarnHours +'"> hours</td></tr>\
        <TR><TD><INPUT id=ptEnableFoodChatWarn type=checkbox /></td><TD>Post to chat if food will run out in less than \
            <INPUT id=optfoodChatWarnHours type=text size=3 value="'+ Options.foodChatWarnHours +'"> hours</td></tr>\
        <TR><TD><INPUT id=togWhisperOn type=checkbox /></td><TD>Turn on Audio Whisper &nbsp; <SPAN class=boldRed><blink>Turn On Then Off To Stop Alarm</blink></span></td></tr>\
        <TR><TD><INPUT id=togGmtClock type=checkbox /></td><TD>Enable GMT clock next to "Camelot Time" </td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>Disable all Fairie popup windows</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Wide screen (all domains, requires refresh)</td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>Refresh if KOC not loaded within 1 minute (all domains)</td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Refresh KOC every <INPUT id=pbeverymins type=text size=2 maxlength=3 \> minutes</td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Put chat on right (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Use WideMap (requires wide screen)</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
		<TR><TD><INPUT id=togAllRpts type=checkbox /></td><TD>Enable enhanced Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togAllowAlter type=checkbox /></td><TD>Allow other scripts to change format of Alliance Reports.</td></tr>\
        <TR><TD><INPUT id=togEnhanceMsging type=checkbox /></td><TD>Enable enhanced messaging ("forward" and "all officers" buttons).</td></tr>\
        <TR><TD><INPUT id=togWarnZero type=checkbox /></td><TD>Warn if attempting to march to location 0,0.</td></tr>\
        <TR><TD><INPUT id=togChatStuff type=checkbox /></td><TD>Enable Chat enhancements (clickable coords, pink global messages, click on icon to whisper) </td></tr>\
        <TR><TD><INPUT id=togAttackPicker type=checkbox /></td><TD>Enable target city picker in attack dialog (reinforce, reassign and transport) </td></tr>\
        <TR><TD><INPUT id=togBatRounds type=checkbox /></td><TD>Display # of rounds in battle reports </td></tr>\
        <TR><TD><INPUT id=togAtkDelete type=checkbox /></td><TD>Enable delete button when displaying battle report </td></tr>\
        <TR><TD><INPUT id=togKnightSelect type=checkbox /></td><TD>Do not automatically select a knight when changing march type to scout, transport or reassign </td></tr>\
        <TR><TD><INPUT id=togCoordBox type=checkbox /></td><TD>Keep map coordinate box/bookmarks on top of troop activity </td></tr>\
        <TR><TD><INPUT id=togMsgCountFix type=checkbox /></td><TD>Show number of new messages separately from number of reports on Messages icon.</td></tr>\
        </table><p><b>DA Power Tools :-<SPAN class=boldRed>&nbsp;'+ (Version)+'</b></span><br>Visit&nbsp;<a href="http://userscripts.org/scripts/show/103311"target="blank"><u>Userscripts</u></a>&nbsp;for Updates & Support&nbsp;<SPAN class=boldRed>~BDE</span></B></div>';
      t.optionsDiv.innerHTML = m;

      document.getElementById('optFoodHours').addEventListener ('change', function () {
          var x = document.getElementById('optFoodHours').value;
          if (isNaN(x) || x<0.01 || x>99999){
            document.getElementById('optFoodHours').value = Options.foodWarnHours;
            return;
          }
          Options.foodWarnHours = x;
          saveOptions();
        }, false);
      document.getElementById('optfoodChatWarnHours').addEventListener ('change', function () {
          var fcw = document.getElementById('optfoodChatWarnHours').value;
          if (isNaN(fcw) || fcw<0.01 || fcw>99999){
            document.getElementById('optfoodChatWarnHours').value = Options.foodChatWarnHours;
            return;
          }
          Options.foodChatWarnHours = fcw;
          saveOptions();
        }, false);

      var checkbox = document.getElementById('togAllRpts');
       if (Options.enhanceARpts)
         checkbox.checked = true;
       checkbox.addEventListener ('change', function() {Options.enhanceARpts=document.getElementById('togAllRpts').checked; saveOptions(); AllianceReports.enable(Options.enhanceARpts);}, false);

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.changeOpt ('pbeverymins', 'pbEveryMins');
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('ptEnableFoodWarn', 'enableFoodWarn');
      t.togOpt ('ptEnableFoodChatWarn', 'enableFoodChatWarn');         //25mar
      t.togOpt ('togWhisperOn', 'WhisperOn');
      t.togOpt ('togGmtClock', 'gmtClock', GMTclock.setEnable);
      t.togOpt ('togAllowAlter', 'allowAlterAR');
      t.togOpt ('togEnhanceMsging', 'enhanceMsging', messageNav.setEnable, messageNav.isAvailable);
      t.togOpt ('togWarnZero', 'fixWarnZero', WarnZeroAttack.setEnable, WarnZeroAttack.isAvailable);
      t.togOpt ('togChatStuff', 'chatEnhance', ChatStuff.setEnable, ChatStuff.isAvailable);
      t.togOpt ('togAttackPicker', 'attackCityPicker', AttackDialog.setEnable, AttackDialog.isCityPickerAvailable);
      t.togOpt ('togBatRounds', 'dispBattleRounds', null, battleReports.isRoundsAvailable);
      t.togOpt ('togKnightSelect', 'fixKnightSelect', AttackDialog.setEnable, AttackDialog.isKnightSelectAvailable);
      t.togOpt ('togCoordBox', 'mapCoordsTop', CoordBox.setEnable, CoordBox.isAvailable);
      t.togOpt ('togAtkDelete', 'reportDeleteButton', null, battleReports.isDeleteAvailable);
      t.togOpt ('togMsgCountFix', 'fixMsgCount', MessageCounts.enable, MessageCounts.isAvailable);

    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }
  },


  togOpt : function (checkboxId, optionName, callOnChange, callEnable,callIsAvailable){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);

    if (callIsAvailable && callIsAvailable()==false){
      checkbox.disabled = true;
      return;
    }
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },

  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
  },

  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
  },

  /***   Tabs SUBTAB  ***/
 
 showTabs : function (){
    var t = Tabs.Options;
    t.optionsDiv.innerHTML = 'Tab options coming soon!';
  },
   
  /***   Colors SUBTAB  ***/

  showColors : function (){
    var t = Tabs.Options;
    t.optionsDiv.innerHTML = 'Change colors coming soon!';;
  },

};

/********** Marches Tab **********/
var troops = {            1:'SupplyTroops',
			  2:'Militiaman',
			  3:'Scout',
			  4:'Pikeman',
			  5:'Swordsman',
			  6:'Archer',
			  7:'Cavalry',
			  8:'HeavyCavalry',
			  9:'SupplyWagon',
			  10:'Ballista',
			  11:'BatteringRam',
			  12:'Catapult'};
Tabs.Marches = {
  tabOrder : toMarches,
  cont:null,
  displayTimer:null,
  curTabBut : null,
  curTabName : null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [],
  checkdotradetimeout: null,
  reassignState: [],
  lRE: [],
  reassignRoutes: [],
  rallypointlevel:null,
  count:0,


  init : function (div){
    var t = Tabs.Marches;
    unsafeWindow.pr56Recall = t.butRecall;
    unsafeWindow.r8x6Home = t.butSendHome;
	t.traderState = {
        running: false,
        };
        t.readTraderState();
	t.readTradeRoutes();
	t.e_tradeRoutes();
 	t.reassignState = {
        running: false,
        };
    

       t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE class=ptTab align=center><TR><TD><INPUT class=pbSubtab ID=ptmrchSubM type=submit value=Attacks></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubA type=submit value=Transport></td>\
          <TD><INPUT class=pbSubtab ID=ptmrchSubR type=submit value=Reinforcments></td>\</td></tr></table><HR class=ptThin>\
      <DIV id=ptMarchOutput style="margin-top:10px; background-color:white; height:425px"></div>';
    t.marchDiv = document.getElementById('ptMarchOutput');
    document.getElementById('ptmrchSubA').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubR').addEventListener('click', e_butSubtab, false);
    document.getElementById('ptmrchSubM').addEventListener('click', e_butSubtab, false);
    changeSubtab (document.getElementById('ptmrchSubA'));


    function e_butSubtab (evt){
      changeSubtab (evt.target);
    }

    function changeSubtab (but){
      if (but == t.curTabBut)
        return;
      if (t.curTabBut){
        t.curTabBut.className='pbSubtab';
        t.curTabBut.disabled=false;
      }
      t.curTabBut = but;
      but.className='pbSubtab pbSubtabSel';
      but.disabled=true;
      t.curTabName = but.id.substr(9);
      t.show ();
    }
  },

  hide : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
  },

  show : function (){
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);
    if (t.curTabName == 'R')
      t.showReinforcements();
    else if (t.curTabName == 'M')
      t.showMarches();
    else
      t.showAttacks();
  },

     onUnload: function(){
        var t = Tabs.Marches;
        t.saveTradeRoutes();
		t.saveTraderState();
        t.saveReassignRoutes();
		t.saveReassignState();

    },


  /***   Transport SUBTAB  ***/
  
 showAttacks : function (){
    var t = Tabs.Marches;
      var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED TRANSPORT FUNCTION</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.traderState.running == false) {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = ON"></td>';
      }
      m += '<TD><INPUT id=pbShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbTraderDivDRoute class=pbStat>ADD TRADE ROUTE</div>';

      m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
      m += '<TD>OR</td>';
      m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';

	  m += '<TR align="left">';
	  m += '<TD colspan=4>Time inbetween to check transport: <INPUT id=pbtransportinterval type=text size=2 value="'+Options.transportinterval+'"\> minutes</td></tr></table>';
      m += '<TD colspan=4>Dont send transport out if less then <INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> wagons are needed. (Needless transports are skipped this way)</td></tr></table>';

      m += '<DIV style="margin-top:10px;margin-bottom:5px;">If the "trade" amount is 0 then it will transport the max amount above "keep". Gold only if there is space left...</div>';
      m += '<TABLE id=pbaddtraderoute width=55% height=0% class=pbTab><TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
      m += '<TD><INPUT id=pbshipFood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountFood type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountFood type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
      m += '<TD><INPUT id=pbshipWood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountWood type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountWood type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
      m += '<TD><INPUT id=pbshipStone type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountStone type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountStone type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
      m += '<TD><INPUT id=pbshipOre type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountOre type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountOre type=text size=10 maxlength=10 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td>';
      m += '<TD><INPUT id=pbshipGold type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountGold type=text size=10 maxlength =10 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountGold type=text size=10 maxlength=10 value="0"\></td></tr>'
      m += '</table>';

      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="Add Route"></div>';

      t.marchDiv.innerHTML = m;

       t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.clickCitySelect, 0);
      t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

      document.getElementById('pbTraderState').addEventListener('click', function(){
      t.toggleTraderState(this);
      }, false);
      document.getElementById('pbSaveRoute').addEventListener('click', function(){
      t.addTradeRoute();
      }, false);
      document.getElementById('pbShowRoutes').addEventListener('click', function(){
      t.showTradeRoutes();
      }, false);

      document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
		if (isNaN(document.getElementById('pbtransportinterval').value)){ document.getElementById('pbtransportinterval').value=60 ;}
		Options.transportinterval = document.getElementById('pbtransportinterval').value;
		saveOptions();
      }, false);

      document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountFood').value)) document.getElementById('pbtargetamountFood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountWood').value)) document.getElementById('pbtargetamountWood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountStone').value)) document.getElementById('pbtargetamountStone').value=0 ;
      }, false);
      document.getElementById('pbtargetamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountOre').value)) document.getElementById('pbtargetamountOre').value=0 ;
      }, false);
      document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value=0 ;
      }, false);
      document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountFood').value)) document.getElementById('pbtradeamountFood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountWood').value)) document.getElementById('pbtradeamountWood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountStone').value)) document.getElementById('pbtradeamountStone').value=0 ;
      }, false);
      document.getElementById('pbtradeamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountOre').value)) document.getElementById('pbtradeamountOre').value=0 ;
      }, false);
      document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value=0 ;
      }, false);
     document.getElementById('pbminwagons').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbminwagons').value)) document.getElementById('pbminwagons').value=100 ;
         Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
         saveOptions();
     }, false)

      document.getElementById('pbshipFood').addEventListener('click', function(){
          if (document.getElementById('pbshipFood').checked==false) {
              document.getElementById('pbtargetamountFood').disabled = true;
              document.getElementById('pbtradeamountFood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountFood').disabled = false;
            document.getElementById('pbtradeamountFood').disabled = false;
          }
      },false);
      document.getElementById('pbshipWood').addEventListener('click', function(){
          if (document.getElementById('pbshipWood').checked==false) {
              document.getElementById('pbtargetamountWood').disabled = true;
              document.getElementById('pbtradeamountWood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountWood').disabled = false;
            document.getElementById('pbtradeamountWood').disabled = false;
          }
      },false);
      document.getElementById('pbshipStone').addEventListener('click', function(){
          if (document.getElementById('pbshipStone').checked==false) {
              document.getElementById('pbtargetamountStone').disabled = true;
              document.getElementById('pbtradeamountStone').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountStone').disabled = false;
            document.getElementById('pbtradeamountStone').disabled = false;
          }
      },false);
      document.getElementById('pbshipOre').addEventListener('click', function(){
          if (document.getElementById('pbshipOre').checked==false) {
              document.getElementById('pbtargetamountOre').disabled = true;
              document.getElementById('pbtradeamountOre').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountOre').disabled = false;
            document.getElementById('pbtradeamountOre').disabled = false;
          }
      },false);
      document.getElementById('pbshipGold').addEventListener('click', function(){
          if (document.getElementById('pbshipGold').checked==false) {
              document.getElementById('pbtargetamountGold').disabled = true;
              document.getElementById('pbtradeamountGold').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGold').disabled = false;
            document.getElementById('pbtradeamountGold').disabled = false;
          }
      },false);
      window.addEventListener('unload', t.onUnload, false);
    },

    getRallypoint: function(cityId){
      var t = Tabs.Marches;
      for (var k in Seed.buildings[cityId]){
           var buildingType  = parseInt(Seed.buildings[cityId][k][0]);
           var buildingLevel = parseInt(Seed.buildings[cityId][k][1]);
    	     var buildingName = unsafeWindow.buildingcost['bdg' + buildingType][0];
    	     if(DEBUG_TRACE) logit(buildingName + ' => Level: ' + buildingLevel);
    	     if (buildingName == "Rally Point"){
				return buildingLevel;
				break;
			 }
      }
	  return 0;
    },

    e_tradeRoutes: function(){
      var t = Tabs.Marches;
      var now = new Date();
      if (t.traderState.running == true)    {
      	var now = new Date().getTime()/1000.0;
      	now = now.toFixed(0);
      	var last = Options.lasttransport;
       		if ( now > (parseInt(last) + (Options.transportinterval*60))){
				  t.checkdoTrades();
      		}
      }
	  //setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*60*1000);
	  setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);

    },

	delTradeRoutes: function() {
		var t = Tabs.Marches;
		t.tradeRoutes= [];
	},

	addTradeRoute: function () {
		var valid = true;
		var t = Tabs.Marches;
		var city = t.tcp.city.id;
		if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0)
		{
			new CdialogCancelContinue ('<SPAN class=boldRed>You are about to set a route to location 0,0!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('pbReMainDivF'));
			return;
		}
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Wood = document.getElementById('pbshipWood').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Ore = document.getElementById('pbshipOre').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Wood = document.getElementById('pbtargetamountWood').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Ore = document.getElementById('pbtargetamountOre').value;
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Wood = document.getElementById('pbtradeamountWood').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Ore = document.getElementById('pbtradeamountOre').value;
		var trade_Gold = document.getElementById('pbtradeamountGold').value;
		var target_x = document.getElementById('ptcityX').value;
		var target_y = document.getElementById('ptcityY').value;
		var route_state = true;

		if (valid == true) {
			var lTR = t.tradeRoutes;
			lTR.push({
				city:				city,
				ship_Food:			ship_Food,
				target_Food:		target_Food,
				trade_Food: 		trade_Food,
				ship_Wood:			ship_Wood,
				target_Wood:		target_Wood,
				trade_Wood: 		trade_Wood,
				ship_Stone:			ship_Stone,
				target_Stone:		target_Stone,
				trade_Stone: 		trade_Stone,
				ship_Ore:			ship_Ore,
				target_Ore:			target_Ore,
				trade_Ore:	 		trade_Ore,
				ship_Gold:			ship_Gold,
				target_Gold:		target_Gold,
				trade_Gold: 		trade_Gold,
				target_x: 			target_x,
				target_y: 			target_y,
				route_state: 		"true"
			});
		}
		document.getElementById('pbTraderDivDRoute').style.background ='#99FF99';
                setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000)
		
	},
	showTradeRoutes: function () {
		var t = Tabs.Marches;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowTradeRoutes" id="pbRoutesQueue">';
		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Transport routes:</td>';
		t.paintTradeRoutes();
		t._addTabHeader();
		t.popTradeRoutes.show(true)	;
	},
	paintTradeRoutes: function(){
	        var t = Tabs.Marches;
	        var r = t.tradeRoutes;
	        var cityname;
			for (var i = (r.length-1); i>=0; i--) {
				for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
				}
				var queueId = i;
				t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].ship_Food, r[i].target_Food, r[i].trade_Food,r[i].ship_Wood, r[i].target_Wood, r[i].trade_Wood,r[i].ship_Stone, r[i].target_Stone, r[i].trade_Stone,r[i].ship_Ore, r[i].target_Ore, r[i].trade_Ore,r[i].ship_Gold, r[i].target_Gold, r[i].trade_Gold);
	        }
	    },

	 _addTab: function(queueId,cityname, cityX,cityY,ship_Food, target_Food, trade_Food,ship_Wood, target_Wood, trade_Wood,ship_Stone, target_Stone, trade_Stone,ship_Ore, target_Ore, trade_Ore,ship_Gold, target_Gold, trade_Gold){
	 	var t = Tabs.Marches;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = queueId;
	     row.insertCell(1).innerHTML = cityname;
	     row.insertCell(2).innerHTML = cityX + ',' + cityY;
	     row.insertCell(3).innerHTML = ship_Food;
	 	 row.insertCell(4).innerHTML = addCommas(target_Food);
	 	 row.insertCell(5).innerHTML = addCommas(trade_Food);
	 	 row.insertCell(6).innerHTML = ship_Wood;
	 	 row.insertCell(7).innerHTML = addCommas(target_Wood);
	 	 row.insertCell(8).innerHTML = addCommas(trade_Wood);
	 	 row.insertCell(9).innerHTML = ship_Stone;
	 	 row.insertCell(10).innerHTML = addCommas(target_Stone);
	 	 row.insertCell(11).innerHTML = addCommas(trade_Stone);
	 	 row.insertCell(12).innerHTML = ship_Ore;
	 	 row.insertCell(13).innerHTML = addCommas(target_Ore);
	 	 row.insertCell(14).innerHTML = addCommas(trade_Ore);
	 	 row.insertCell(15).innerHTML = ship_Gold;
	 	 row.insertCell(16).innerHTML = addCommas(target_Gold);
	 	 row.insertCell(17).innerHTML = addCommas(trade_Gold);
	     row.insertCell(18).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Delete</span></a>';
	     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
	        t.cancelQueueElement(queueId);
	     }, false);
	 },

	 _addTabHeader: function() {
	 var t = Tabs.Marches;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = "ID";
	     row.insertCell(1).innerHTML = "From";
	     row.insertCell(2).innerHTML = "To";
	     row.insertCell(3).innerHTML = "Food";
	     row.insertCell(4).innerHTML = "";
	     row.insertCell(5).innerHTML = "";
	     row.insertCell(6).innerHTML = "Wood";
		 row.insertCell(7).innerHTML = "";
	     row.insertCell(8).innerHTML = "";
	     row.insertCell(9).innerHTML = "Stone";
	     row.insertCell(10).innerHTML = "";
	     row.insertCell(11).innerHTML = "";
	     row.insertCell(12).innerHTML = "Ore";
	     row.insertCell(13).innerHTML = "";
	     row.insertCell(14).innerHTML = "";
	     row.insertCell(15).innerHTML = "Gold";
	     row.insertCell(16).innerHTML = "";
	     row.insertCell(17).innerHTML = "";
	     row.insertCell(18).innerHTML = "Delete";
	   },

	 cancelQueueElement: function(queueId){
	     var t = Tabs.Marches;
	     var queueId = parseInt(queueId);
	     t.tradeRoutes.splice(queueId, 1);
	     t.showTradeRoutes();
	 },

	saveTradeRoutes: function(){
		var t = Tabs.Marches;
        var serverID = getServerId();
        GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
    },
    readTradeRoutes: function(){
        var t = Tabs.Marches;
        var serverID = getServerId();
        s = GM_getValue('tradeRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route)
                t.tradeRoutes[k] = route[k];
        }
    },
	saveTraderState: function(){
		var t = Tabs.Marches;
        var serverID = getServerId();
        GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
    },
    readTraderState: function(){
        var t = Tabs.Marches;
        var serverID = getServerId();
        s = GM_getValue('traderState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state)
                t.traderState[k] = state[k];
        }
    },
    toggleTraderState: function(obj){
		var t = Tabs.Marches;
        if (t.traderState.running == true) {
            t.traderState.running = false;
            obj.value = "Transport = OFF";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
        }
        else {
            t.traderState.running = true;
            obj.value = "Transport = ON";
			t.e_tradeRoutes();
        }
    },

	checkdoTrades: function(){
	var t = Tabs.Marches;
	if(t.tradeRoutes.length==0) return;
	t.doTrades(t.count);
	t.count++;
	if(t.count < t.tradeRoutes.length){
			  t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades();}, 5000);
			} else {
			  var now = new Date().getTime()/1000.0;
			  now = now.toFixed(0);
			  Options.lasttransport = now;
			  saveOptions();
			  t.count = 0;
			}
	},

    doTrades: function(count){
    	var t = Tabs.Marches;
   		if(t.tradeRoutes.length==0) return;
   		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold =0;
		params.r1 =0;
		params.r2 =0;
		params.r3 =0;
		params.r4 =0 ;
		params.kid = 0;

		var carry_amount= 0;
		var wagons_needed=0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"];
		var cityID = 'city' + city;


   	 	var xcoord = t.tradeRoutes[count]["target_x"];
    	var ycoord = t.tradeRoutes[count]["target_y"];
    	var trade_Food = t.tradeRoutes[count]["trade_Food"];
    	var trade_Wood = t.tradeRoutes[count]["trade_Wood"];
    	var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
    	var trade_Ore = t.tradeRoutes[count]["trade_Ore"];
    	var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
    	var target_Food = t.tradeRoutes[count]["target_Food"];
    	var target_Wood = t.tradeRoutes[count]["target_Wood"];
    	var target_Stone = t.tradeRoutes[count]["target_Stone"];
    	var target_Ore = t.tradeRoutes[count]["target_Ore"];
    	var target_Gold = t.tradeRoutes[count]["target_Gold"];
    	var ship_Food = t.tradeRoutes[count]["ship_Food"];
    	var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
    	var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
    	var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
    	var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
    	var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    	var citymax_Wood = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
    	var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
    	var citymax_Ore = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
    	var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
    	var carry_Food = (citymax_Food - target_Food);
    	var carry_Wood = (citymax_Wood - target_Wood);
    	var carry_Stone = (citymax_Stone - target_Stone);
    	var carry_Ore = (citymax_Ore - target_Ore);
    	var carry_Gold = 0;
    	if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
    	if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
    	if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
    	if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
    	if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseInt(trade_Food);
    	if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseInt(trade_Wood);
    	if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseInt(trade_Stone);
    	if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseInt(trade_Ore);
    	var wagons =  parseInt(Seed.units[cityID]['unt'+9]);
    	var rallypointlevel = t.getRallypoint(cityID);
		if (rallypointlevel == 11) { rallypointlevel = 15; }
    	if (wagons > (rallypointlevel*10000)){ wagons = (rallypointlevel*10000); }
    	var featherweight = parseInt(Seed.tech.tch10);
    	var maxloadperwagon = ((featherweight *500) + 5000);
		var maxload = (maxloadperwagon* wagons);

		if(wagons <= 0) {logit('No wagons'); return; }

		for (var t=0; t< Seed.cities.length;t++) {
			if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
		}

		var shift_Food = (maxload / 4);
		var shift_Wood = (maxload / 4);
		var shift_Stone = (maxload / 4);
		var shift_Ore = (maxload / 4);

		if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore) < 0){
			var shift_num=0;
			var shift_spare=0;

			// Check: See if load/4 is to big for some resources...
			if (carry_Food < shift_Food) {
				shift_spare += (shift_Food - carry_Food);
				shift_Food = carry_Food;
			}
			if (carry_Wood < shift_Wood) {
				shift_spare += (shift_Wood - carry_Wood);
				shift_Wood = carry_Wood;
			}
			if (carry_Stone < shift_Stone) {
				shift_spare += (shift_Stone - carry_Stone);
				shift_Stone = carry_Stone;
			}
			if (carry_Ore < shift_Ore) {
				shift_spare += (shift_Ore - carry_Ore);
				shift_Ore = carry_Ore;
			}

		  while (shift_spare >1) {
				 if (carry_Food < (shift_Food + shift_spare)){
				    shift_spare = shift_spare - carry_Food;;
				    shift_Food = carry_Food;
				 }
				 else{
				  shift_Food = (shift_Food + shift_spare);
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Wood < (shift_Wood + shift_spare)){
				    shift_spare = shift_spare - carry_Wood;;
				    shift_Wood = carry_Wood;
				 }
				 else{
				  shift_Wood = shift_Wood + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
        		if (carry_Stone < (shift_Stone + shift_spare)){
				    shift_spare = shift_spare - carry_Stone;;
				    shift_Stone = carry_Stone;
				 }
				 else{
				  shift_Stone = shift_Stone + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Ore < (shift_Ore + shift_spare)){
				    shift_spare = shift_spare - carry_Ore;;
				    shift_Ore = carry_Ore;
				 }
				 else{
				  shift_Ore = shift_Ore + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
			 }

		carry_Food = shift_Food;
		carry_Wood = shift_Wood;
		carry_Stone = shift_Stone;
		carry_Ore = shift_Ore;
		}

		if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore) && ship_Gold==true) {
		    if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore)) > (citymax_Gold - target_Gold)){
		    	  carry_Gold = (citymax_Gold - target_Gold);
		    	  if (carry_Gold < 0 ) carry_Gold = 0;
		   	}
		    else carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore));
		    if (trade_Gold > 0 && (carry_Gold > trade_Gold)) carry_Gold = trade_Gold;
		}

		wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);
		if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon)) wagons_needed++;
		if ( wagons_needed < Options.minwagons ) { if(DEBUG_TRACE) logit('Small transport skipped'); return; }

		params.cid= city;
		params.type = "1";
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Wood;
		params.r3 = carry_Stone;
		params.r4 = carry_Ore;
		params.gold = carry_Gold;
		params.u9 = wagons_needed;
                //params.u7= 5000; 

   		if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
         

         new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  actionLog('Trade From: ' + cityname + " To: " + xcoord + ',' + ycoord + " -> Wagons: " + wagons_needed);
                  //unsafeWindow.Modal.hideModalAll(); 
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  for(i = 0; i <= unitsarr.length; i++){
                  	if(params["u"+i]){
                  	unitsarr[i] = params["u"+i];
                  	}
                  }
                  var resources=new Array();
                  resources[0] = params.gold;
                  for(i=1; i<=4; i++){
                  	resources[i] = params["r"+i];
                  }
                  var currentcityid = city;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  unsafeWindow.update_seed(rslt.updateSeed)
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else {
                  actionLog('FAIL: ' + cityname + ' -> ' + rslt.msg);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
        }
	},


  /***   MARCHES SUBTAB  ***/
    showMarches : function (){
      var t = Tabs.Marches;
      t.marchDiv.innerHTML =null;	
      var updatemarch = Seed.queue_atkp;
      var icon;
      var status;
      var number = 0;
     
     var  m = '<TABLE id=pdmarches cellSpacing=10 width=100% height=0% class=pbTab>';
          
     for (var c=0; c< Seed.cities.length;c++) {
     		cityname = Seed.cities[c][1];
     		cityID = 'city' + Seed.cities[c][0];
     		var cityTo;    
    		number=0;	
    		
    		if (Seed.queue_atkp[cityID].length !=0) m+= '<TR><TD colspan=4 style=\'background: #99CCFF;\' align=center><B>' + cityname +': </b></td></tr>';
  		    for (k in Seed.queue_atkp[cityID]){
  				 if (Seed.queue_atkp[cityID].length !=0) {
  				    var marchID = new String(k);
  				    marchID = marchID.substr(1);
  				    var marchType = parseInt(Seed.queue_atkp[cityID][k]["marchType"]);
  				    var marchStatus = parseInt(Seed.queue_atkp[cityID][k]["marchStatus"]);
  				    now = unixTime();
  				    number++;
  				    cityTo=null; 
  				    var knight=null;
  				    
  				    for (var i=0; i<Seed.cities.length;i++) {
  				    		if (Seed.cities[i][2] == Seed.queue_atkp[cityID][k]["toXCoord"] && Seed.cities[i][3] == Seed.queue_atkp[cityID][k]["toYCoord"]) cityTo = Seed.cities[i][1];
  				    		
  				    }
  				    
  				    destinationUnixTime = Seed.queue_atkp[cityID][k]["destinationUnixTime"] - now;
  				    returnUnixTime = Seed.queue_atkp[cityID][k]["returnUnixTime"] - now;
  				    encampedUnixTime = now - Seed.queue_atkp[cityID][k]["destinationUnixTime"];
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] > now) marchtime = timestr(destinationUnixTime, true);
  				    else  marchtime = timestr(returnUnixTime, true);
  				    
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) && marchType == 2) marchtime = timestr(encampedUnixTime, true);
  				  
  				    if (Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) || marchStatus == 8) marchstatus = "returning";
  				    else marchstatus = "going";
  				   
  				    if (marchstatus =="returning" && marchType == 2 && Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) && marchStatus != 2) marchtime = timestr(returnUnixTime, true);
  				    if (marchstatus =="returning" && marchType == 4 && Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) && marchStatus == 2) marchtime = timestr(returnUnixTime, true);
  				    if (marchStatus == 2 && Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) && marchType !=2) marchtime = timestr(returnUnixTime, true);
  				    if (marchStatus == 8 && Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now)) marchtime = timestr(returnUnixTime, true);
  				    if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2) marchtime = timestr(destinationUnixTime, true);;
  				    
  				    
  				    if (marchstatus =="returning" && marchType != 2) marchType = 100;
  				    if (marchstatus =="returning" && marchType == 2 && marchStatus == 2) marchType = 102;
  				    
  				    if (marchstatus =="returning" && marchType == 2 && Seed.queue_atkp[cityID][k]["destinationUnixTime"] < (now) && marchStatus != 2) marchType = 100;
  				    
  				    if (parseInt(Seed.queue_atkp[cityID][k]["marchType"]) == 4 && marchStatus == 2) {
  						marchType = 102;
  						marchtime = timestr(encampedUnixTime, true)
  				    }
  
  				    switch (marchType) {
  					    case 1: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Transport";break;
  					    case 2: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Reinforce";break;
  					    case 3: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/scouting.jpg";status="Scout";break;
  					    case 4: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg";status="Attack";break;
  					    case 5: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/transporting.jpg";status="Reassign";break;
  					    case 100: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg";status="Returning";break;
  					    case 102: icon="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/reinforce.jpg";status="Encamped";break;
  				    } 
  				      				    
  				    if (Seed.queue_atkp[cityID][k]["knightId"] !=0){
  				    	for (i in Seed.knights[cityID]) {
  				    			if (i == ("knt" + Seed.queue_atkp[cityID][k]["knightId"]) ) knight = Seed.knights[cityID][i]["combat"];
  				    	}
  				    } else knight = null;
  				    
  				    m += '<TR><TD width=10px >'+ number +'</td>';
  				   if (status=="Encamped")
						m += '<TD><A onclick="r8x6Home('+ marchID +')"><img src='+ icon +'></a></td>';
  				    else if(status=='Returning')
						m += '<TD><img src='+ icon +'></td>';
					else
						m += '<TD><A onclick="cancelMarch('+ marchID +')"><img src='+ icon +'></a></td>';
  				    m += '<TD width="40px">'+ status +'</td>';
  				    m += '<TD>'+ marchtime +'</td>';
  				    
  				    if (cityTo == null) m += '<TD style="padding-right:10px;">'+ Seed.queue_atkp[cityID][k]["toXCoord"] + ',' + Seed.queue_atkp[cityID][k]["toYCoord"] + '</td>';
  				    else m += '<TD style="padding-right:10px;">'+ cityTo +'</td>';
  				    
  				    if (knight != null)  m += '<TD>Knight:'+ knight +'</td>';
  				    
  				    if (Seed.queue_atkp[cityID][k]["toTileType"] == 11) m+='<TD>Lake Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 20) m+='<TD>Grassland Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 30) m+='<TD>Hills Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 40) m+='<TD>Mountain Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  				    else if (Seed.queue_atkp[cityID][k]["toTileType"] == 50) m+='<TD>Plain Lvl: ' + Seed.queue_atkp[cityID][k]["toTileLevel"] + '</td>';
  					else if (Seed.queue_atkp[cityID][k]["toCityId"] ==0) m +='<TD>Barb Lvl: '+Seed.queue_atkp[cityID][k]["toTileLevel"]+'</td>';
  		
  				    if (Seed.queue_atkp[cityID][k]["gold"] > 0) m += '<TD>Gold:'+ Seed.queue_atkp[cityID][k]["gold"] +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource1"] > 0) m += '<TD>Food: '+ addCommas(Seed.queue_atkp[cityID][k]["resource1"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource2"] > 0) m += '<TD>Wood: '+ addCommas(Seed.queue_atkp[cityID][k]["resource2"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource3"] > 0) m += '<TD>Stone: '+ addCommas(Seed.queue_atkp[cityID][k]["resource3"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["resource4"] > 0) m += '<TD>Ore: '+ addCommas(Seed.queue_atkp[cityID][k]["resource4"]) +'</td>';
  				    
  				    if (Seed.queue_atkp[cityID][k]["unit0Count"] > 0 && marchstatus == "going") m += '<TD???'+ addCommas(Seed.queue_atkp[cityID][k]["unit0Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit0Return"] > 0 && marchstatus == "returning") m += '<TD>???: '+ addCommas(Seed.queue_atkp[cityID][k]["unit0Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit1Count"] > 0 && marchstatus == "going") m += '<TD>Supply Troops: '+ addCommas(Seed.queue_atkp[cityID][k]["unit1Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit1Return"] > 0 && marchstatus == "returning") m += '<TD>Supply Troops: '+ addCommas(Seed.queue_atkp[cityID][k]["unit1Return"]) +'</td>';
  				    
  				    if (Seed.queue_atkp[cityID][k]["unit2Count"] > 0 && marchstatus == "going") m += '<TD>Militiaman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit2Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit2Return"] > 0 && marchstatus == "returning") m += '<TD>Militiaman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit2Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit3Count"] > 0 && marchstatus =="going") m += '<TD>Scouts: '+ addCommas(Seed.queue_atkp[cityID][k]["unit3Count"])+'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit3Return"] > 0 && marchstatus == "returning") m += '<TD>Scouts: '+ addCommas(Seed.queue_atkp[cityID][k]["unit3Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit4Count"] > 0 && marchstatus =="going") m += '<TD>Pikeman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit4Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit4Return"] > 0 && marchstatus == "returning") m += '<TD>Pikeman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit4Return"])+'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit5Count"] > 0 && marchstatus =="going") m += '<TD>Swordsman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit5Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit5Return"] > 0 && marchstatus == "returning") m += '<TD>Swordsman: '+ addCommas(Seed.queue_atkp[cityID][k]["unit5Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit6Count"] > 0 && marchstatus =="going") m += '<TD>Archer: '+ addCommas(Seed.queue_atkp[cityID][k]["unit6Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit6Return"] > 0 && marchstatus == "returning") m += '<TD>Archer: '+ addCommas(Seed.queue_atkp[cityID][k]["unit6Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit7Count"] > 0 && marchstatus =="going") m += '<TD>Cavalry: '+ addCommas(Seed.queue_atkp[cityID][k]["unit7Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit7Return"] > 0 && marchstatus == "returning") m += '<TD>Cavalry: '+ addCommas(Seed.queue_atkp[cityID][k]["unit7Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit8Count"] > 0 && marchstatus =="going") m += '<TD>Heavy Cavalry: '+ addCommas(Seed.queue_atkp[cityID][k]["unit8Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit8Return"] > 0 && marchstatus == "returning") m += '<TD>Heavy Cavalry: '+ addCommas(Seed.queue_atkp[cityID][k]["unit8Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit9Count"] > 0 && marchstatus =="going") m += '<TD>Supply Wagons: '+ addCommas(Seed.queue_atkp[cityID][k]["unit9Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit9Return"] > 0 && marchstatus == "returning") m += '<TD>Supply Wagons: '+ addCommas(Seed.queue_atkp[cityID][k]["unit9Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit10Count"] > 0 && marchstatus =="going") m += '<TD>Ballista: '+ addCommas(Seed.queue_atkp[cityID][k]["unit10Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit10Return"] > 0 && marchstatus == "returning") m += '<TD>Ballista: '+ addCommas(Seed.queue_atkp[cityID][k]["unit10Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit11Count"] > 0 && marchstatus =="going") m += '<TD>Battering Ram: '+ addCommas(Seed.queue_atkp[cityID][k]["unit11Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit11Return"] > 0 && marchstatus == "returning") m += '<TD>Battering Ram: '+ addCommas(Seed.queue_atkp[cityID][k]["unit11Return"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit12Count"] > 0 && marchstatus =="going") m += '<TD>Catapult: '+ addCommas(Seed.queue_atkp[cityID][k]["unit12Count"]) +'</td>';
  				    if (Seed.queue_atkp[cityID][k]["unit12Return"] > 0 && marchstatus == "returning") m += '<TD>Catapult	: '+ addCommas(Seed.queue_atkp[cityID][k]["unit12Return"]) +'</td></tr>';
   			  }
  		    }
  	
  		   
  	}
  	m += '</table>';
  	t.marchDiv.innerHTML = m;
  	
  	document.getElementById('TEST').addEventListener('click', function(){
		
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  			new AjaxRequest(unsafeWindow.g_ajaxpath + "/fb/e2/src/main_src.php?g=&y=0&n=nan001&l=nl_NL&messagebox=&standalone=0&res=1&iframe=1&lang=en&ts=1304248288.7067&s=250&appBar=" + unsafeWindow.g_ajaxsuffix, {
  			    method: "POST",
  			    parameters: params,
  			    onSuccess: function (rslt) {
  			        //rslt = eval("(" + message + ")");
  			        var mainSrcHTMLCode = rslt.responseText;
  			    	//var mainSrcHTMLCode; // get and set this by pulling in the main_src.php file via AJAX
  			    	var myregexp = /var seed=\{.*?\};/;
  			    	var match = myregexp.exec(mainSrcHTMLCode);
  			    	
  			    	if (match != null) {
  			    	result = match[0];
  			    	result = result.substr(4);
  			    	var seed = eval(result);
	  			    WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (seed, 8, 1));
	  			    unsafeWindow.document.seed = seed;
  			    	}
  			    },
  			    onFailure: function () {
  			      if (notify != null)
  			        notify(rslt.errorMsg);
  			    },
  			});
	
  	}, false);
  		     
    t.displayTimer = setTimeout (t.showMarches, 500);  
    },
    
    butcancelmarch: function(marchID){
    	 var t = Tabs.Marches;
    	 	 var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			 alert("Recalled march#"+marchID);
    	 	 params.mid = marchID;
     	 	 for (var c=0; c<Cities.numCities; c++){
    	 	   var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
    	 	   if (matTypeof(que)=='array')
    	 	     continue;
    	 	   for (k in que){
    	 	     if (k == 'm'+marchID){
    	 	       params.cid = Cities.cities[c].id;
    	 	       break;
    	 	     }
    	 	   }    
    	 	 }    
    	 	 
    	 	 new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
    	 	     method: "post",
    	 	     parameters: params,
    	 	     onSuccess: function (rslt) {
    	 	     var march = unsafeWindow.seed.queue_atkp["city" + params.cid]["m" + params.mid];
    	 	     march.marchStatus = 8;
    	 	      var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
    	 	      var ut = unixTime();
    	 	      if (unsafeWindow.seed.playerEffects.returnExpire > unixtime())
    	 	        marchtime *= 0.5
    	 	       march.returnUnixTime = ut + marchtime;
    	 	       march.destinationUnixTime = ut;
    	 	       march.marchUnixTime = ut - marchtime;
    	 	       if (notify != null)
    	 	         notify(rslt.errorMsg);
    	 	     },
    	 	     onFailure: function () {
    	 	       if (notify != null)
    	 	         notify(rslt.errorMsg);
    	 	     },
    	 	 });
    	 	 
    	 },    


  /***  REINFORCEMENTS SUBTAB  ***/
  showReinforcements : function (){
    var rownum = 0;
    var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
    var t = Tabs.Marches;
    clearTimeout (t.displayTimer);



// TODO FIX:    Troops show as encamped even if they are here yet (check destinationUnixTime)



/***
var s = 'OUTGOING:<BR>';
for (var c=0; c<Cities.numCities; c++){
  var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
  if (matTypeof(que)=='array')
    continue;

s += 'City: '+  Cities.cities[c].name + ': <BR>';

  for (k in que){
    march = que[k];
    var mid = k.substr(1);
    s += mid +' DEST: '+ march.toXCoord +','+ march.toYCoord + '  <INPUT type=submit value="Recall" onclick="pr56Recall('+ mid +')"><BR>'
  }
}
t.myDiv.innerHTML = s;
t.displayTimer = setTimeout (t.show, 10000);
return;
***/

    function clickShowRemaining (){
      checkBox = document.getElementById('idCheck2');
      if (checkBox.checked)
        Options.encRemaining = false;
      else
        Options.encRemaining = true;
      t.show ();
    }


    enc = {};
    numSlots = 0;


    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (k in Seed.queue_atkinc){
        march = Seed.queue_atkinc[k];
        if (march.marchType == 2){
          ++numSlots;
          city = march.toCityId;
          from = march.fromPlayerId;
          if (!enc[city])
            enc[city] = {};
          if (!enc[city][from])
            enc[city][from] = [];
          s = {};
          s.knight = parseInt (march.knightCombat);
          s.marchId = k.substr(1);
          s.troops = [];
          for (i=1; i<13; i++){
            if (Options.encRemaining)
              s.troops[i] = parseInt (march['unit'+ i +'Return']);
            else
              s.troops[i] = parseInt (march['unit'+ i +'Count']);
          }
          enc[city][from].push (s);
        }
      }
    }
//logit ("enc: "+ inspect (enc, 6, 1));





    s = '<div class=ptstat>Showing troops encamped at each of your embassies.</div><BR>';
    if (numSlots == 0){
      s += '<BR><CENTER><B>No troops encamped.</b></center>';
    } else {
      s += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;}</style>';
      s += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%><B>Player (knight)</b></td>';

      for (k=0; k<names.length; k++)
        s += '<TD width=7%><B>' + names[k] + '</b></td>';
      s += '</tr>';

      tot = [];
      for (i=0; i<13; i++)
        tot[i] = 0;
      for (c in Cities.cities){
        dest = Cities.cities[c].id;
        if (enc[dest]){
          s+= '<TR><TD class=xtab><BR></td></tr>';
          s+= '<TR><TD class="city" colspan=13 align=center><B>'+ Cities.cities[c].name +'</b></td></tr>';
          for (p in enc[dest]){
            try {
              player = Seed.players['u'+p].n;
            } catch (err){
              player = '???';
            }
            for (m=0; m<enc[dest][p].length; m++){
              var march = enc[dest][p][m];
              knight = '';
              if (march.knight > 0)
                knight = ' ('+ march.knight +')';
// TODO: Only allow 'send home' if troops are here now  (marchStatus = ?)
              s += '<TR align=right><TD align=left>'+ player + knight +' <A><SPAN onclick="r8x6Home('+ march.marchId +')">X</span></a></td>'
              for (i=1; i<13; i++){
                s += '<TD>'+ march.troops[i]  +'</td>';
                tot[i] += march.troops[i];
              }
              s += '</tr>';

            }
          }
        }
      }
      s += '<TR><TD colspan=13><BR><BR></td></tr><TR align=right><TD class="tot" align=left><B>TOTALS:</b></td>';
      for (i=1; i<13; i++)
        s+= '<TD class="tot">'+ tot[i] +'</td>';
      s += '</tr></table>';
    }

    s += '<BR><BR><INPUT type=CHECKBOX id=idCheck2 '+ (Options.encRemaining?'':' CHECKED ') +'> Show Original Troops';
    s += '<BR><BR><DIV style="font-size: 10px">NOTE: You will need to refresh KofC to show new encampments or remaining troops after a battle.</div>';
    t.marchDiv.innerHTML = s;
    checkBox = document.getElementById('idCheck2');
    checkBox.addEventListener('click', clickShowRemaining, false);
    t.displayTimer = setTimeout (t.show, 10000);
  },


  butRecall : function (marchId){
    var t = Tabs.Marches;
    logit ("CANCELLING: "+ marchId);
    t.ajaxRecall (marchId);
  },

  butSendHome : function (marchId){
    var t = Tabs.Marches;
    logit ("SEND HOME: "+ marchId);
    t.ajaxSendHome (marchId, function(r){t.show(); logit("AJAX RESULT: "+ r)});
  },


  /***
  // not working, returns 'invalid parameters' :(
  ajaxCancelMarch : function (marchId, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
logit ('ajaxCancelMarch: '+ marchId);
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          params.cityId = Cities.cities[c].id;
          break;
        }
      }
    }
    params.marchId = marchId;
    params.mid = 'm'+ marchId;
    params.requestType = "CANCEL_MARCH";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/cancelMarch.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },
***/





  ajaxSendHome : function (marchId, notify){
logit ('ajaxSendHome: '+ marchId);
    var march = Seed.queue_atkinc['m'+ marchId];
    if (march == null){
      notify ('March not found!');
      return;
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.mid = marchId;
    params.cid = march.toCityId;
    params.fromUid = march.fromPlayerId;
    params.fromCid = march.fromCityId;

    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/kickoutReinforcements.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          if (rslt.ok){
            var upkeep = 0;
            for (var i=1; i<13; i++)
              upkeep += parseInt(march["unit" + i + "Return"]) * parseInt(unsafeWindow.unitupkeeps[i])
            unsafeWindow.seed.resources["city"+ march.toCityId].rec1[3] -= upkeep;
            if (parseInt(march.fromPlayerId) == parseInt(unsafeWindow.tvuid)) {
logit ('FROM ME!');
              var mymarch = unsafeWindow.seed.queue_atkp["city" + march.fromCityId]["m" + marchId];
              var marchtime = Math.abs(parseInt(mymarch.destinationUnixTime) - parseInt(mymarch.eventUnixTime));
              mymarch.returnUnixTime = unixTime() + marchtime;
              mymarch.marchStatus = 8;
            }
            delete unsafeWindow.seed.queue_atkinc["m" + marchId];
            if (notify != null)
              notify(null);
          } else {
            if (notify != null)
              notify(rslt.errorMsg);
          }
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },

/*****

      for (var b = 1; b < 13; b++) {
        g += parseInt(e["unit" + b + "Return"]) * parseInt(unitupkeeps[b])
      }

function kickout_allies(mid, cid, fromUid, fromCid, upkeep) {
  var params = Object.clone(g_ajaxparams);
  params.mid = mid;
  params.cid = cid;
  params.fromUid = fromUid;
  params.fromCid = fromCid;
  new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(transport) {
      var rslt = eval("(" + transport.responseText + ")");
      if (rslt.ok) {
        Modal.showAlert(g_js_strings.kickout_allies.troopshome);
        seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
        Modal.hideModalAll();
        if (parseInt(fromUid) == parseInt(tvuid)) {
          var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
          var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
          curmarch.returnUnixTime = unixtime() + marchtime;
          curmarch.marchStatus = 8
        }
        delete seed.queue_atkinc["m" + mid]
      } else {
        Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
      }
    },
    onFailure: function() {}
  })
};
***/





  ajaxRecall : function (marchId, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    for (var c=0; c<Cities.numCities; c++){
      var que = Seed.queue_atkp['city'+ Cities.cities[c].id];
      if (matTypeof(que)=='array')
        continue;
      for (k in que){
        if (k == 'm'+marchId){
          params.cid = Cities.cities[c].id;
          break;
        }
      }
    }
    params.mid = marchId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/undefend.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          var march = unsafeWindow.seed.queue_atkp["city" + params.cid]["m" + params.mid];
          march.marchStatus = 8;
          var marchtime = parseInt(march.returnUnixTime) - parseInt(march.destinationUnixTime);
          var ut = unixTime();
          if (unsafeWindow.seed.playerEffects.returnExpire > unixtime())
            marchtime *= 0.5
          march.returnUnixTime = ut + marchtime;
          march.destinationUnixTime = ut;
          march.marchUnixTime = ut - marchtime;
          if (notify != null)
            notify(rslt.errorMsg);
        },
        onFailure: function () {
          if (notify != null)
            notify(rslt.errorMsg);
        },
    });
  },

};


/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabOrder: 1,
  tabLabel: 'Tower',
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],
  Providers : {
		0: { 'country': "--Country--", 'provider': "--Provider--" },
        1: { 'country': "AUSTRALIA", 'provider': "T-Mobile" },
        2: { 'country': "AUSTRALIA", 'provider': "Optus Zoo" },
        3: { 'country': "AUSTRIA", 'provider': "T-Mobile" },
        4: { 'country': "BULGARIA", 'provider': "Mtel" },
        5: { 'country': "BULGARIA", 'provider': "Globul" },
        6: { 'country': "CANADA", 'provider': "Aliant" },
        7: { 'country': "CANADA", 'provider': "Bell Mobility" },
        8: { 'country': "CANADA", 'provider': "Fido" },
        9: { 'country': "CANADA", 'provider': "MTS Mobility" },
        10: { 'country': "CANADA", 'provider': "Rogers Wireless" },
        11: { 'country': "CANADA", 'provider': "Sasktel Mobility" },
        12: { 'country': "CANADA", 'provider': "Telus" },
        13: { 'country': "CANADA", 'provider': "Virgin Mobile" },
        14: { 'country': "CANADA", 'provider': "Presidents Choice" },
        15: { 'country': "GERMANY", 'provider': "T-Mobile" },
        16: { 'country': "GERMANY", 'provider': "Vodafone" },
        17: { 'country': "GERMANY", 'provider': "O2" },
        18: { 'country': "GERMANY", 'provider': "E-Plus" },
        19: { 'country': "ICELAND", 'provider': "OgVodafone" },
        20: { 'country': "ICELAND", 'provider': "Siminn" },
        21: { 'country': "INDIA", 'provider': "Andhra Pradesh AirTel" },
        22: { 'country': "INDIA", 'provider': "Andhra Pradesh Idea Cellular" },
        23: { 'country': "INDIA", 'provider': "Chennal Skycell Airtel" },
        24: { 'country': "INDIA", 'provider': "Chennel RPG Cellular" },
        25: { 'country': "INDIA", 'provider': "Delhi Airtel" },
        26: { 'country': "INDIA", 'provider': "Delhi Hutch" },
        27: { 'country': "INDIA", 'provider': "Gujarat Idea Cellular" },
        28: { 'country': "INDIA", 'provider': "Gujaret Airtel" },
        29: { 'country': "INDIA", 'provider': "Gujaret Celforce" },
        30: { 'country': "INDIA", 'provider': "Goa Airtel" },
        31: { 'country': "INDIA", 'provider': "Goa BPL Mobile" },
        32: { 'country': "INDIA", 'provider': "Goa Idea Cellular" },
        33: { 'country': "INDIA", 'provider': "Haryana Airtel" },
        34: { 'country': "INDIA", 'provider': "Haryana Escotel" },
        35: { 'country': "INDIA", 'provider': "Himachal Pradesh Airtel" },
        36: { 'country': "INDIA", 'provider': "Karnataka Airtel" },
        37: { 'country': "INDIA", 'provider': "Kerala Airtel" },
        38: { 'country': "INDIA", 'provider': "Kerala Escotel" },
        39: { 'country': "INDIA", 'provider': "Kerala BPL Mobile" },
        40: { 'country': "INDIA", 'provider': "Kolkata Airtel" },
        41: { 'country': "INDIA", 'provider': "Madhya Pradesh Airtel" },
        42: { 'country': "INDIA", 'provider': "Maharashtra Airtel" },
        43: { 'country': "INDIA", 'provider': "Maharashtra BPL Mobile" },
        44: { 'country': "INDIA", 'provider': "Maharashtra Idea Cellular" },
        45: { 'country': "INDIA", 'provider': "Mumbai Airtel" },
        46: { 'country': "INDIA", 'provider': "Mumbai BPL Mobile" },
        47: { 'country': "INDIA", 'provider': "Punjab Airtel" },
        48: { 'country': "INDIA", 'provider': "Pondicherry BPL Mobile" },
        49: { 'country': "INDIA", 'provider': "Tamil Nadu Airtel" },
        50: { 'country': "INDIA", 'provider': "Tamil Nadu BPL Mobile" },
        51: { 'country': "INDIA", 'provider': "Tamil Nadu Aircel" },
        52: { 'country': "INDIA", 'provider': "Uttar Pradesh West Escotel" },
        53: { 'country': "IRELAND", 'provider': "Meteor" },
        54: { 'country': "IRELAND", 'provider': "Meteor MMS" },
        55: { 'country': "ITALY", 'provider': "TIM" },
        56: { 'country': "ITALY", 'provider': "Vodafone" },
        57: { 'country': "JAPAN", 'provider': "AU by KDDI" },
        58: { 'country': "JAPAN", 'provider': "NTT DoCoMo" },
        59: { 'country': "JAPAN", 'provider': "Vodafone Chuugoku/Western" },
        60: { 'country': "JAPAN", 'provider': "Vodafone Hokkaido" },
        61: { 'country': "JAPAN", 'provider': "Vodafone Hokuriko/Central North" },
        62: { 'country': "JAPAN", 'provider': "Vodafone Kansai/West, including Osaka" },
        63: { 'country': "JAPAN", 'provider': "Vodafone Kanto/Koushin/East including Tokyo" },
        64: { 'country': "JAPAN", 'provider': "Vodafone Kyuushu/Okinawa" },
        65: { 'country': "JAPAN", 'provider': "Vodafone Shikoku" },
        66: { 'country': "JAPAN", 'provider': "Vodafone Touhoku/Niigata/North" },
        67: { 'country': "JAPAN", 'provider': "Vodafone Toukai/Central" },
        68: { 'country': "JAPAN", 'provider': "Willcom" },
        69: { 'country': "JAPAN", 'provider': "Willcom di" },
        70: { 'country': "JAPAN", 'provider': "Willcom dj" },
        71: { 'country': "JAPAN", 'provider': "Willcom dk" },
        72: { 'country': "NETHERLANDS", 'provider': "T-Mobile" },
        73: { 'country': "NETHERLANDS", 'provider': "Orange" },
        74: { 'country': "SINGAPORE", 'provider': "M1" },
        75: { 'country': "SOUTH AFRICA", 'provider': "Vodacom" },
        76: { 'country': "SPAIN", 'provider': "Telefonica Movistar" },
        77: { 'country': "SPAIN", 'provider': "Vodafone" },
        78: { 'country': "SWEDEN", 'provider': "Tele2" },
        79: { 'country': "UNITED STATES", 'provider': "Teleflip" },
        80: { 'country': "UNITED STATES", 'provider': "Alltel" },
        81: { 'country': "UNITED STATES", 'provider': "Ameritech" },
        82: { 'country': "UNITED STATES", 'provider': "ATT Wireless" },
        83: { 'country': "UNITED STATES", 'provider': "Bellsouth" },
        84: { 'country': "UNITED STATES", 'provider': "Boost" },
        85: { 'country': "UNITED STATES", 'provider': "CellularOne" },
        86: { 'country': "UNITED STATES", 'provider': "CellularOne MMS" },
        87: { 'country': "UNITED STATES", 'provider': "Cingular" },
        88: { 'country': "UNITED STATES", 'provider': "Edge Wireless" },
        89: { 'country': "UNITED STATES", 'provider': "Sprint PCS" },
        90: { 'country': "UNITED STATES", 'provider': "T-Mobile" },
        91: { 'country': "UNITED STATES", 'provider': "Metro PCS" },
        92: { 'country': "UNITED STATES", 'provider': "Nextel" },
        93: { 'country': "UNITED STATES", 'provider': "O2" },
        94: { 'country': "UNITED STATES", 'provider': "Orange" },
        95: { 'country': "UNITED STATES", 'provider': "Qwest" },
        96: { 'country': "UNITED STATES", 'provider': "Rogers Wireless" },
        97: { 'country': "UNITED STATES", 'provider': "Telus Mobility" },
        98: { 'country': "UNITED STATES", 'provider': "US Cellular" },
        99: { 'country': "UNITED STATES", 'provider': "Verizon" },
        100: { 'country': "UNITED STATES", 'provider': "Virgin Mobile" },
        101: { 'country': "UNITED KINGDOM", 'provider': "O2 1" },
        102: { 'country': "UNITED KINGDOM", 'provider': "O2 2" },
        103: { 'country': "UNITED KINGDOM", 'provider': "Orange" },
        104: { 'country': "UNITED KINGDOM", 'provider': "T-Mobile" },
        105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" },
        106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" },
        107: { 'country': "BELGIUM", 'provider': "mobistar" },
         108: { 'country': "GERMANY", 'provider': "1und1" }
    },

  init: function(div){
	  var t = Tabs.tower;
    t.myDiv = div;
        var Providers_len = 105;
    
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

	  for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
		m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
	m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
	   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Stop Sound Alert"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>CONFIGURATION</div><TABLE class=pbTab>\
    <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>Text message incoming attack to: <INPUT id=pbnum1 type=text size=3 maxlength=3 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold">(Please note that standard text messaging charges may apply)</span></td></tr><tr><td></td>\
    <TD align=left>Country: <select id="pbfrmcountry">';
    for (var i in t.Providers) {
       var ret=m.indexOf(t.Providers[i].country);
       if (ret==-1) {
         if (t.Providers[i].country==t.Providers[Options.celltext.provider].country) {
           m += '<option value="'+t.Providers[i].country+'" selected="selected">'+t.Providers[i].country+'</option>'; // Load Previous Provider Selection
         }
         else {
           m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
         }
       }
    }

    m += '</select>\
    <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--Provider--</option>';
    for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
		if(Options.celltext.provider == i)
			m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
		else
           m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
    }
    m += '</select></td></tr>\
        <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat.</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>Alert on scouting: &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Alert on wild attack: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Display defend status: &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pbalerterr></span></td></tr>\
            </table></td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Play sound on incoming attack/scout</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>Loading SWF player</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Sound file: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Load><INPUT id=pbSoundDefault type=submit value=Default></td></tr>\
            <TR><TD align=right>Volume: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Repeat every <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> minutes</td></tr>\
            <TR><TD></td><TD>Play for <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> seconds</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="Play Now" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
     m += '<BR><DIV class=pbStat>Extra Sounds</div><TABLE class=pbTab>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
        <TR><TD align=left>http://static1.grsites.com/archive/sounds/emergency/emergency001.mp3</td></tr>\
        </table><BR>'; 
  	        t.myDiv.innerHTML = m;

//    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y'); 
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n'); 
    t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
    document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
    document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
        Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
        t.loadUrl (Options.alertSound.soundUrl);
      }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
        document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
        Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.loadUrl (DEFAULT_ALERT_SOUND_URL);
      }, false);

    for (var cityId in Cities.byID){
  	  var but = document.getElementById ('pbtabut_'+ cityId);
  	  addListener (but, cityId);
  	  t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
  	  t.displayDefMode (cityId); 
	  var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
	  }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
	function addTowerEventListener(cityId, name){
        document.getElementById(name).addEventListener('click', function(){
            t.showTowerIncoming(cityId);
        }, false);
    }	
    setInterval (t.eachSecond, 2000); 
  },      

  show : function (){
  },
  
  hide : function (){
  },
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = 'Loading';
  },
  phonenum : function() {
   Options.celltext.num1 = document.getElementById('pbnum1').value;
   Options.celltext.num2 = document.getElementById('pbnum2').value;
   Options.celltext.num3 = document.getElementById('pbnum3').value;
  },

  setCountry : function(){
    var t = Tabs.tower;
    var myselect=document.getElementById("pbfrmprovider");
// GM_log(document.getElementById("pbfrmprovider").value);
// GM_log(document.getElementById("pbfrmcountry").value);
	myselect.innerHTML = '<option value=0 >--Provider--</option>';
	myselect.disabled = true;
    for (var i in t.Providers) {
     if (t.Providers[i].country == document.getElementById("pbfrmcountry").value){
		var addoption = document.createElement('option');
		addoption.value = i;
		addoption.text = t.Providers[i].provider;
      myselect.add(addoption, null) //add new option to end of "Providers"
     }
    }
	myselect.disabled = false;
   },

  setProvider : function(){
    var ddProvider = document.getElementById("pbfrmprovider").wrappedJSObject;
     Options.celltext.provider=ddProvider.options[ddProvider.selectedIndex].value;
	if(ddProvider.selectedIndex > 0){
		document.getElementById("pbnum1").disabled = false;
		document.getElementById("pbnum2").disabled = false;
		document.getElementById("pbnum3").disabled = false;
	} else {
		document.getElementById("pbnum1").disabled = true;
		document.getElementById("pbnum2").disabled = true;
		document.getElementById("pbnum3").disabled = true;
	}
    //alert(Options.celltext.provider);
   },

  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    t.loadUrl (Options.alertSound.soundUrl);
    setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
      t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    } 
    Options.alertConfig.minTroops = mt;
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0)
      mode = 0;
    t.ajaxSetDefMode (cityId, mode, function (newMode){
        t.defMode[cityId] = newMode;
        t.displayDefMode (cityId);
      });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def = ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def = OFF';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
	  for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
    }
  	var now = unixTime();
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k]; 
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m); 
          }          
        }
      }
    }
//logit ("NOW="+ now + ' alarmActive='+ Options.alertSound.alarmActive + ' expireTime='+ Options.alertSound.expireTime);
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
      t.stopSoundAlerts(); 

        t.towerMarches = [];
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            t['attackCount_' + cId] = 0;
            t['scoutCount_' + cId] = 0;
        }
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (var k in Seed.queue_atkinc) {
                var m = Seed.queue_atkinc[k];
                if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);

                }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
        }

	  
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (chan != 1)
      return;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
    if (chan != 1)
      return;
    if (isError)  
      document.getElementById('pbLoadStat').innerHTML = 'Error!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Loaded';
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play (1, 0);
    t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat)
      t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
    else
      Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    t.mss.stop (1);
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer); 
    document.getElementById('pbSoundStop').disabled = true;
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.celltext.atext)
      t.postToCell (m);
    if (Options.alertConfig.aChat)
      t.postToChat (m);
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
  },

  ajaxSetDefMode : function (cityId, state, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					Seed.citystats["city" + cityId].gate = state;
					notify (state);
				} 
			},
			onFailure: function () {
			}
		})
  },
  
  onUnload : function (){
  },



  postToCell : function (m){
    var t = Tabs.tower;
    var data = {};
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      data.atkType = 'scout';
    } else if (m.marchType == 4){
      data.atkType = 'atk';
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      data.target = 'city ('+ city.x +','+ city.y+')';
    else {
      if (!Options.alertConfig.wilds)
        return;
      data.target = 'wild';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          data.target += Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      data.who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      data.who = m.players['u'+m.pid].n;
    else
      data.who = 'Unknown';
  
    if (m.fromXCoord)
      data.who += m.fromXCoord +','+ m.fromYCoord;
     data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    var totTroops = 0;
    data.totTroops = ' '
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      data.totTroops += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;


    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){ 
            --availSlots;
          }
        }
        data.embassy = 'EMB '+ availSlots +'of'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            data.stat = 'HIDING';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            data.stat = 'DEFENDING';
        }
      }
    }
    data.provider = Options.celltext.provider;
    data.num1 = Options.celltext.num1;
    data.num2 = Options.celltext.num2;
    data.num3 = Options.celltext.num3;
    data.serverId = getServerId();
    data.player = Seed.player['name'];
    data.city = city.name;

  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://hs151.digitalweb.net/index.php',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
	data: implodeUrlArgs(data),

	})
  },
  
  postToChat : function (m){
    var t = Tabs.tower;
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Unknown';
  
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = Options.alertConfig.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +'. Incoming Troops (arriving in '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){ 
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are HIDING!';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are DEFENDING!';
        }
      }
    }
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
  },
      handleTowerData: function(m){
        var t = Tabs.tower;
        var now = unixTime();
        var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
        var city = Cities.byID[m.toCityId];
        
        if (DEBUG_TRACE) 
            logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        
        //ATKTYPE
        if (m.marchType == 3) {
            atkType = 'scouted';
            t['scoutCount_' + m.toCityId]++;
        }
        else 
            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId) 
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 13; i++) 
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Troop') 
                units[1] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Militiaman') 
                units[2] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Scout') 
                units[3] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Pikeman') 
                units[4] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Swordsman') 
                units[5] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Archer') 
                units[6] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Cavalry') 
                units[7] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Heavy Cavalry') 
                units[8] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Wagon') 
                units[9] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Ballista') 
                units[10] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Battering Ram') 
                units[11] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapult') 
                units[12] = m.unts[k];
        }
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = Seed.players['u' + m.pid].a;
            allianceName = Seed.allianceNames[allianceId];
            diplomacy = getDiplomacy(allianceId);
        }
        else 
            if (m.players && m.players['u' + m.pid]) {
                who = m.players['u' + m.pid].n;
                attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = 'a' + m.players['u' + m.pid].a;
                allianceName = Seed.allianceNames[allianceId];
                diplomacy = getDiplomacy(allianceId);
            }
            else {
                who = 'n.A.';
                attackermight = 'n.A.';
                allianceId = 'n.A.';
                allianceName = 'n.A.';
                diplomacy = 'n.A.';
            }
		//SOURCE
        if (m.fromXCoord) 
            var source = m.fromXCoord + ',' + m.fromYCoord;
        else 
            var source = 'n.A.';
        
        var arrivingDatetime = new Date();
        arrivingDatetime.setTime(m.arrivalTime * 1000);
        var count = t.towerMarches.length + 1;
        t.towerMarches[count] = {
            added: now,
            cityId: m.toCityId,
            target: target,
            arrival: parseIntNan(m.arrivalTime),
            atkType: atkType,
            who: who,
            attackermight: attackermight,
            allianceName: allianceName,
            diplomacy: diplomacy,
            rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
            arrivingDatetime: arrivingDatetime,
			source:source,
            units: units,
        };
    },
    showTowerIncoming: function(cityId){
        var t = Tabs.tower;
        var popTowerIncoming = null;
        var cityName = Tabs.build.getCityNameById(cityId);
        
        if (t.popTowerIncoming == null) {
            t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 750, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>Tower Report of ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
		clearTimeout (t.timer);
		t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        enc = {};
        numSlots = 0;
        var row = document.getElementById('pbCityTowerContent').innerHTML = "";
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (k in Seed.queue_atkinc) {
                march = Seed.queue_atkinc[k];
                if (march.marchType == 2) {
                    ++numSlots;
                    city = march.toCityId;
                    from = march.fromPlayerId;
					if (!enc[city]) 
                        enc[city] = {};
                    if (!enc[city][from]) 
                        enc[city][from] = [];
                    k = [];
                    k[0] = parseInt(march.knightCombat);
                    for (i = 1; i < 13; i++) {
                        if (Options.encRemaining) 
                            k[i] = parseInt(march['unit' + i + 'Return']);
                        else 
                            k[i] = parseInt(march['unit' + i + 'Count']);
                    }
					k[14] = parseInt(march.marchStatus);
					var now = unixTime();
					k[15] = parseInt(march.destinationUnixTime) - now;
                    enc[city][from].push(k);
                }
            }
        }
        var s1 = '';
		var s2 = '';
		var s3 = '';
		var tot = [];
        var atk = [];
        for (i = 0; i < 13; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
            
            for (k = 0; k < names.length; k++) 
                s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
            s1 += '</tr>';
            dest = cityId;
            if (enc[dest]) {
                for (p in enc[dest]) {
                    try {
                        player = Seed.players['u' + p].n;
                    } 
                    catch (err) {
                        player = '???';
                    }
                    for (m = 0; m < enc[dest][p].length; m++) {
                        /*knight = '';
                        if (enc[dest][p][m][0] > 0) 
                            knight = ' (' + enc[dest][p][m][0] + ')';
						*/
						status = '';
                        if (enc[dest][p][m][14] == 1) {
						    status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
							if (enc[dest][p][m][15] < 0)
								status = ' (enc)';	
							else
								 status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
						}
						if (enc[dest][p][m][14] == 2) {
						    status = ' (enc)';	
						}

                        s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
                        for (i = 1; i < 13; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                        //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>Reinforcment:</b></td>'
                for (i = 1; i < 13; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
			s1 += '<TR align=right><TD colspan=14><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>Own Troops:</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 13; r++) {
                cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
            s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Defenders:</b></td>';
            for (i = 1; i < 13; i++) 
                s1 += '<TD class="tot">' + tot[i] + '</td>';      
			s3 += '</tr></table>';
        
        s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Incoming Attacks:</b></td>';
        
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        
                        if (t.towerMarches[k].atkType == 'attacked') {
                            s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
                        }
                        else 
                            if (t.towerMarches[k].atkType == 'scouted') {
                                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
                            }
                        s3 += '<TD width=15%  ><B>Location</b></td>';
                        s3 += '<TD width=15%  ><B>Name</b></td>';
						s3 += '<TD width=10%><B>Source: </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
                        s3 += '<TD width=10%><B>Might: </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
                        s3 += '<TD width=10%><B>Alliance: </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
                        s3 += '<TD width=10%><B>State: </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
                        s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
                        s3 += '<TD><B>Remaining: </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
                        s3 += '<TD><B>Arrival: </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
                        s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++) 
                            s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
                        for (u = 1; u < 13; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
						s3 += '</tr></table>';
                    }
                }
                
            }
        }
		s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>Attackers:</b></td>';
        for (a = 1; a < 13; a++) 
            s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
		var html = s1 + s2 + s3;
        document.getElementById('pbCityTowerContent').innerHTML = html;

    },
    sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
        //mid, cid, fromUid, fromCid, upkeep
        var params = Object.clone(g_ajaxparams);
        params.mid = mid;
        params.cid = cid;
        params.fromUid = fromUid;
        params.fromCid = fromCid;
        new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function(transport){
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    Modal.showAlert(g_js_strings.kickout_allies.troopshome);
                    seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
                    Modal.hideModalAll();
                    if (parseInt(fromUid) == parseInt(tvuid)) {
                        var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
                        var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
                        curmarch.returnUnixTime = unixtime() + marchtime;
                        curmarch.marchStatus = 8
                    }
                    delete seed.queue_atkinc["m" + mid]
                }
                else {
                    Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                }
            },
            onFailure: function(){
            }
        })
    },
}
/****************************  Spam Tab  ******************************/
Tabs.Spam = {
  tabOrder : 30,                    // order to place tab in top bar
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Spam;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab><TR align="left">';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Spam;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Spam;

  },

 e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;

 },

 togglespam: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  };

 },

 toggleon: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
  };

 },
};  

var SpamEvery  = {
  timer : null,
  init : function (){

    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, '60000');
  },
  count : function (){
   var t = SpamEvery;
   if (Options.spamconfig.atime > Options.spamconfig.spammins) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
  },
  doit : function (){
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

/**********************************************************************************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};


function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
  
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}
/*********************************  Barbing Tab ***********************************/
Tabs.Barb = {
  tabOrder : 1,
  myDiv : null,
  MapAjax : new CMapAjax(),
  popFirst : true,
  opt : {},
  nextattack : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,
  rallypointlevel:0,
  knt:{},
  barbArray:{},
  lookup:1,
  city:0,
  foodstart:{},
  deleting:false,
  
    
  init : function (div){
    var t = Tabs.Barb;
    t.myDiv = div;
    saveAttackOptions();
	t.getnextCity();
    
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED BARBING FUNCTION</div><TABLE id=pbbarbingfunctions width=100% height=0% class=pbTab><TR align="center">';
	 if (AttackOptions.Running == false) {
	       m += '<TD><INPUT id=AttSearch type=submit value="Barb = OFF"></td>';
	       updatebotbutton("BOT");
	   } else {
	       m += '<TD><INPUT id=AttSearch type=submit value="Barb = ON"></td>';
	       updatebotbutton("BOT (AA)");
	   }
	  m += '<TD><INPUT id=troopselect type=submit value="Select troops"></td>';
	  m += '<TD><INPUT id=Options type=submit value="Options"></td>';
	  m += '</tr></table></div>';
	  
	  m += '<DIV id=pbTraderDivD class=pbStat>BARBING STATS</div>';
	
	  m += '<TABLE id=pbbarbstats width=95% height=0% class=pbTab><TR align="left"><TR>';
	  for(i=0;i<Seed.cities.length;i++){
	  		m += '<TD>' + Seed.cities[i][1] +'</td>';
	  }
	  m+='</tr><TR>';
	  for(i=0;i<Seed.cities.length;i++){
	  		m += '<TD><DIV><span id='+ 'pddatacity' + i +'></span></div></td>';
	  }
	  m+='</tr><TR>'
	   for(i=0;i<Seed.cities.length;i++){
	  		m += '<TD><DIV><span id='+ 'pddataarray' + i +'></span></div></td>';
	 }
	 m+='</tr></table><TABLE id=pbbarbstats width=95% height=0% class=pbTab><TR align="left"><TR>';
	 for (i=0;i<=5;i++) {
	 	m+='<TD><DIV><span id='+ 'pberror' + i +'></span></div></td>';
     }
     m+='</tr></table>';
     m += '<DIV id=pbTraderDivD class=pbStat>BARBING OPTIONS</div>';
     m += '<TABLE width=95% height=0% class=ptTab><TR align="left">';
     for(i=0;i<Seed.cities.length;i++){
		m += '<TR><TD>' + Seed.cities[i][1] +'</td>';
		for (w=1;w<=10;w++){
			m += '<TD class=pblevelopt><INPUT id=pbcity'+i+'level'+w+' type=checkbox unchecked=true>Lvl:'+w+'</td>';
		}		
        		
     }
    
     t.myDiv.innerHTML = m;
     t.checkBarbData();
     for(i=0;i<Seed.cities.length;i++){
    		var element = 'pddatacity'+i;
    		if (t.barbArray[i+1] == undefined) document.getElementById(element).innerHTML = 'No Data';
    		else document.getElementById(element).innerHTML =  'Barbs :' + t.barbArray[i+1].length;
    		AttackOptions.BarbsDone[i+1]=0;
    		cityID = 'city' + Seed.cities[i][0];
    		t.foodstart[i+1] = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    }
    
    for(i=0;i<Seed.cities.length;i++){
    		for (w=1;w<=10;w++){
    			document.getElementById('pbcity'+i+'level'+w).checked = AttackOptions.Levels[i+1][w]; 
    		}		
        		
    }
    
	document.getElementById('AttSearch').addEventListener('click', function(){t.toggleBarbState(this)} , false);
	document.getElementById('Options').addEventListener('click', t.barbOptions , false);
	document.getElementById('troopselect').addEventListener('click', t.troopOptions , false);
    var class = document.getElementsByClassName('pblevelopt');
    for (k=0;k<class.length;k++){
    	class[k].addEventListener('click', t.saveLevelOptions , false);
    }
   },
  
  saveLevelOptions : function(){
		for(i=0;i<Seed.cities.length;i++){
	    		for (w=1;w<=10;w++){
	    			if (document.getElementById('pbcity'+i+'level'+w).checked ==true) AttackOptions.Levels[i+1][w]=true; 
	    			else AttackOptions.Levels[i+1][w]=false;
	    		}		
		}
		saveAttackOptions();
   },
   
  troopOptions: function(){
  	 var t = Tabs.Barb;
	 var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
	  ['Cats', 12],
     ];
  	 if(t.troopselect == null)	
		t.troopselect = new CPopup ('pbtroopselect', 0, 0, 600, 345, true, function(){t.saveTroops();});
  	 t.troopselect.centerMe (mainPop.getMainDiv());  
  	 var z= '<DIV id=pbTraderDivD class=pbStat>TROOP SELECTION</div><TABLE width=100%><TR>';
	 z+='<TD></td>';
	 for(var i=0; i<troopDef.length; i++)
		z+='<TD>'+troopDef[i][0]+'</td>';
	 z+='<TD>MAX dist</td>';
	 for(i=0;i<10;i++){
	 	z += '<TR><TD>Level '+(i+1)+': </td>';
	 	for(var j=0; j<troopDef.length; j++){
	 		z += '<TD><INPUT id="level'+i+'troop'+j+'" type=text size=4 maxlength=6 value="'+AttackOptions.Troops[i+1][j+1]+'" /></td>';
	 	}
	 	z+='<TD align=right><INPUT id=dist'+i+' type=text size=3 maxlength=3 value="'+AttackOptions.Distance[i+1]+'"</td>';
	 	z+='</tr>';		 		
	 }
	 z+='</table>';
	  t.troopselect.getMainDiv().innerHTML = z;
	  t.troopselect.show(true);
  },
  
  barbOptions: function(){
  	 var t = Tabs.Barb;
  	 if(t.barboptions == null)	
		t.barboptions = new CPopup ('pbbarboptions', 0,0, 375,320, true);
  	 t.barboptions.centerMe (mainPop.getMainDiv());  
	 t.barboptions.getTopDiv().innerHTML = '<CENTER><b> Barbing Options for server '+getServerId()+'</b></CENTER>';
  	var y = '<DIV style="max-height:400px; overflow-y:auto;"><DIV class=pbStat>RESET BARBS</div><TABLE width=100%>';
	 y +='<TR><TD style="margin-top:5px; text-align:center;"><INPUT id=pbresetbarbs type=submit value="Reset barbs"></td></tr></table>';
	 y +='<DIV class=pbStat> OPTIONS </div><TABLE>';
     y +='<TR><TD>Attack interval: <INPUT id=pbsendint type=text size=4 maxlength=4 value='+ AttackOptions.SendInterval +' \> seconds</td></tr>';
     y +='<TR><TD>Max search distance: <INPUT id=pbmaxdist type=text size=4 maxlength=4 value='+ AttackOptions.MaxDistance +' \></td></tr>';
     y +='<TR><TD>Keep <INPUT id=rallyclip type=text size=1 maxlength=2 value="'+AttackOptions.RallyClip+'" \> rallypoint slot(s) free</td></tr>';
     y +='<TR><TD><INPUT id=pbreport type=checkbox '+(AttackOptions.MsgEnabled?'CHECKED':'')+'\> Send barb report msg every<INPUT id=pbmsgint type=text size=2 maxlength=2 value='+AttackOptions.MsgInterval+' \>hour(s)</td></tr>';
     y +='<TR><TD>Method : '+htmlSelector({distance:'Closest first', level:'Highest level first', lowlevel:'Lowest level first'}, AttackOptions.Method, 'id=pbmethod')+'</td></tr>';
     y +='<TR><TD><INPUT id=deletetoggle type=checkbox '+(AttackOptions.DeleteMsg?'CHECKED':'')+' /> Auto delete barb and transport reports</td></tr>';
     y +='<TR><TD>Select barbreport levels to delete: <BR>';
	 y +='<TABLE><TR>';
     for (w=1;w<=10;w++){
     y += '<TD><INPUT id=pbmsglvl'+w+' class=msglvl type=checkbox '+(AttackOptions.MsgLevel[w]?'CHECKED':'') +'>Lvl:'+w+'</td>';
     }	
     y+='</tr></table></td></tr></table>';
	   t.barboptions.getMainDiv().innerHTML = y;
	   t.barboptions.show(true);
	   
	document.getElementById('pbresetbarbs').addEventListener('click', t.deletebarbs,false);
	document.getElementById('pbmethod').addEventListener('change', function(){
		AttackOptions.Method=document.getElementById('pbmethod').value;
		saveAttackOptions();
		t.checkBarbData();
	},false);
	document.getElementById('pbreport').addEventListener('change', function(){
		AttackOptions.MsgEnabled=document.getElementById('pbreport').checked;
		saveAttackOptions();
	},false);
	document.getElementById('pbmsgint').addEventListener('change', function(){
		AttackOptions.MsgInterval=parseInt(document.getElementById('pbmsgint').value);
		saveAttackOptions();
	},false);
    document.getElementById('pbsendint').addEventListener('change', function(){
		AttackOptions.SendInterval=parseInt(document.getElementById('pbsendint').value);
		saveAttackOptions();
	},false);
    document.getElementById('pbmaxdist').addEventListener('change', function(){
		if(parseInt(document.getElementById('pbmaxdist').value) > 75)
			document.getElementById('pbmaxdist').value = 75;
		AttackOptions.MaxDistance=parseInt(document.getElementById('pbmaxdist').value);
		saveAttackOptions();
	},false);
    document.getElementById('deletetoggle').addEventListener('change', function(){
		AttackOptions.DeleteMsg=document.getElementById('deletetoggle').checked;
		saveAttackOptions();
	},false);
    document.getElementById('rallyclip').addEventListener('change', function(){
		AttackOptions.RallyClip=document.getElementById('rallyclip').value;
		saveAttackOptions();
	},false);
    var lvl = document.getElementsByClassName('msglvl')
    for (k=0; k<lvl.length; k++){
		lvl[k].addEventListener('click', function(){
			for (w=1;w<=10;w++){
				AttackOptions.MsgLevel[w] = document.getElementById('pbmsglvl'+w).checked;
				saveAttackOptions();
			}
		},false);
    }
    
  },
  
  saveTroops: function(){
    for(i=0;i<10;i++){
  	 	for (w=0;w<7;w++){
  	 		AttackOptions.Troops[i+1][w+1] = parseIntNan(document.getElementById('level'+i+'troop'+w).value);
  	 	}
		if(parseIntNan(document.getElementById('dist'+i).value) > AttackOptions.MaxDistance)
			document.getElementById('dist'+i).value = AttackOptions.MaxDistance;
  	 	AttackOptions.Distance[i+1] = parseIntNan(document.getElementById('dist'+i).value);	 		
	 }
	 saveAttackOptions();
  },
  
  deletebarbs: function(){
    for (i=1;i<=Seed.cities.length;i++){
          GM_deleteValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId())
    } 
    reloadKOC();
  },
  
  startdeletereports : function (){
	var t = Tabs.Barb;
	if(!t.deleting){
		t.deleting = true;
		t.fetchbarbreports(0, t.checkbarbreports);
	}
  },
  fetchbarbreports : function (pageNo, callback){
	var t = Tabs.Barb;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	if(pageNo > 1)
		params.pageNo = pageNo;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
			callback(rslt);
        },
        onFailure: function () {
        },
    });
  },
  checkbarbreports : function (rslt){
	var t = Tabs.Barb;
	if(!rslt.ok){
		return;
	}
	if(rslt.arReports.length < 1){
		return;
	}
	var reports = rslt.arReports;
	var totalPages = rslt.totalPages;
		var deletes = new Array();
		for(k in reports){
			if(reports[k].marchType==4 && reports[k].side0PlayerId==0 && AttackOptions.MsgLevel[reports[k].side0TileLevel])
				deletes.push(k.substr(2));
			else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
				deletes.push(k.substr(2));
		}
		if(deletes.length > 0){
			t.deletereports(deletes);
		} else {
			t.deleting = false;
			return;
		}
  },
  deletereports : function (deletes){
	var t = Tabs.Barb;
	var msgs = deletes.join(",");
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.s1rids = msgs;
	params.s0rids = '';
	params.cityrids = '';
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes.length);
			t.fetchbarbreports(0, t.checkbarbreports);
		},
		onFailure: function () {
		},
	});
  },
  isMyself: function(userID){
	if(!Seed.players["u"+userID])
		return false;
	if(Seed.players["u"+userID].n == Seed.player.name)
		return true;
	else
		return false;
	return false;
  },

  checkBarbData: function(){
  	var t = Tabs.Barb;
	if (!AttackOptions.Running) return;
	  for (i=1;i<=Seed.cities.length;i++){
		t.barbArray[i] = [];
	  	var myarray = (GM_getValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId()));
		
		if (myarray == undefined && t.searchRunning==false) {
	  		t.lookup=i;
	  		t.opt.startX=parseInt(Seed.cities[(i-1)][2]);
	  		t.opt.startY=parseInt(Seed.cities[(i-1)][3]);  
	  		t.clickedSearch();
	  	}
		if (myarray != undefined){
			myarray = JSON2.parse(myarray);
			if(AttackOptions.Method == 'distance') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['dist'];b = b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
			if(AttackOptions.Method == 'level') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a > b ? -1 : 1);});
			if(AttackOptions.Method == 'lowlevel') t.barbArray[i] = myarray.sort(function sortBarbs(a,b) {a = a['level']+a['dist'];b = b['level']+b['dist'];return a == b ? 0 : (a < b ? -1 : 1);});
	  		   GM_setValue('Barbs_' + Seed.player['name'] + '_city_' + i + '_' + getServerId(), JSON2.stringify(t.barbArray[i]));
	  		}
	  	}
  },
  
  toggleBarbState: function(obj){
	var t = Tabs.Barb;
	if (AttackOptions.Running == true) {
		AttackOptions.Running = false;
		obj.value = "Barb = OFF";
		updatebotbutton("BOT");
		saveAttackOptions();
		t.nextattack = null;
		t.init(t.myDiv);
	} else {
		AttackOptions.Running = true;
		obj.value = "Barb = ON";
		updatebotbutton("BOT");
		saveAttackOptions();
		t.checkBarbData();
		t.getnextCity();
	}
  },
  
  barbing : function(){
  	   var t = Tabs.Barb;
	   t.nextattack = null;
	   var city = t.city;

       var now = new Date().getTime()/1000.0;
       now = now.toFixed(0);
       if ( now > (parseInt(AttackOptions.LastReport)+(3600*AttackOptions.MsgInterval))) {
       	  if (AttackOptions.MsgEnabled==true) t.sendreport();
          for (z=1;z<=Seed.cities.length;z++){
       			AttackOptions.BarbsDone[z]=0;
       			AttackOptions.Foodstatus[z] = parseInt(Seed.resources['city'+Seed.cities[z-1][0]]['rec1'][0] / 3600);
       		}	
       		AttackOptions.LastReport=now;
       		AttackOptions.BarbsFailedKnight=0;
       		AttackOptions.BarbsFailedRP=0;
       		AttackOptions.BarbsFailedTraffic=0;
       		AttackOptions.BarbsTried=0;
       		saveAttackOptions();
       }
       citynumber = Seed.cities[city-1][0];
       cityID = 'city' + citynumber; 
       
       t.getAtkKnight(cityID);
       if  (t.knt.toSource() == "[]") {t.getnextCity(); return;}  
       var kid = t.knt[0].ID;
       
       AttackOptions.BarbNumber[city]=0;
       var check=0;
       
       while (check == 0){
         for (h=1;h<=10;h++){
            if ( AttackOptions.Levels[city][h] == true && (parseInt(t.barbArray[city][AttackOptions.BarbNumber[city]]['level'])) == h ) check=1; 
         }
         if (now < (parseInt(t.barbArray[city][AttackOptions.BarbNumber[city]]['time']) + 3600) && (t.barbArray[city][AttackOptions.BarbNumber[city]]['time']) != 3600) check=0;
         var barblevel = parseInt(t.barbArray[city][AttackOptions.BarbNumber[city]]['level']);
         var u1 = AttackOptions.Troops[barblevel][1];
         var u9 = AttackOptions.Troops[barblevel][2];
         var u6 = AttackOptions.Troops[barblevel][3];
         var u7 = AttackOptions.Troops[barblevel][4];
         var u8 = AttackOptions.Troops[barblevel][5];
         var u10 = AttackOptions.Troops[barblevel][6];
         var u12 = AttackOptions.Troops[barblevel][7];
         if (t.barbArray[city][AttackOptions.BarbNumber[city]]['dist'] > AttackOptions.Distance[barblevel]) check=0;
                           
         if (u1 > parseInt(Seed.units[cityID]['unt1']) || u9 > parseInt(Seed.units[cityID]['unt9']) || u6 > parseInt(Seed.units[cityID]['unt6']) || u7 > parseInt(Seed.units[cityID]['unt7']) || u8 > parseInt(Seed.units[cityID]['unt8']) || u10 > parseInt(Seed.units[cityID]['unt10']) || u12 > parseInt(Seed.units[cityID]['unt12'])) check=0;
          
         if (AttackOptions.Troops[barblevel][1] == 0 && AttackOptions.Troops[barblevel][2] == 0 && AttackOptions.Troops[barblevel][3] == 0 && AttackOptions.Troops[barblevel][4] == 0 && AttackOptions.Troops[barblevel][5] == 0 && AttackOptions.Troops[barblevel][6] == 0 && AttackOptions.Troops[barblevel][7] == 0) check=0;
         if (check ==0) AttackOptions.BarbNumber[city]++;
         if (AttackOptions.BarbNumber[city]>=t.barbArray[city].length) {
         		break;
         }
       }
       if(check == 0){t.getnextCity(); return;} 
	   
       var xcoord = t.barbArray[city][AttackOptions.BarbNumber[city]]['x'];
       var ycoord = t.barbArray[city][AttackOptions.BarbNumber[city]]['y'];
       
       var slots=0;
	   if(Seed.queue_atkp[cityID].length > 0)
		slots = Seed.queue_atkp[cityID].length;
       t.getRallypointLevel(cityID);
       if ((t.rallypointlevel-AttackOptions.RallyClip) <= slots){t.getnextCity(); return;}  
       
       if ((t.rallypointlevel - AttackOptions.RallyClip) > slots) t.doBarb(citynumber,city,AttackOptions.BarbNumber[city],xcoord,ycoord,kid,u1,u9,u6,u7,u8,u10,u12);
       var element1 = 'pddatacity'+(city-1);
       document.getElementById(element1).innerHTML = 'Barbs: ' + AttackOptions.BarbsDone[city]; 
       var element2 = 'pddataarray'+(city-1); 
       document.getElementById(element2).innerHTML =  '(' + AttackOptions.BarbNumber[city] + '/' + t.barbArray[city].length +')';
       saveAttackOptions();
	   t.getnextCity();
  },
  
  getnextCity: function(){
	var t = Tabs.Barb;
    if (!AttackOptions.Running) return;
    if (t.searchRunning){
		t.nextattack = setTimeout(t.getnextCity,(AttackOptions.SendInterval*1000));
		return;
	}
	var city = t.city+1;
	if (city>Seed.cities.length){
		city=1;
		t.startdeletereports();
	}
	var found = false;
	for(var i=1; i<=10; i++){
		if(AttackOptions.Levels[city][i]){
			found = true;
			break;
		}
	}
	if(!found){
		t.city = city;
		t.getnextCity();
		return;
	}
	t.city = city;
	t.nextattack = setTimeout(t.barbing,(AttackOptions.SendInterval*1000));
	return;
  },
  
  getRallypointLevel: function(cityId){
    var t = Tabs.Barb;
    for (var o in Seed.buildings[cityId]){
  	var buildingType = parseInt(Seed.buildings[cityId][o][0]);
  	var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
  	if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
     }
  }, 
  
  getAtkKnight : function(cityID){
     var t = Tabs.Barb;
     t.knt = new Array();
     t.getRallypointLevel(cityID);
     for (k in Seed.knights[cityID]){
     		if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
     			t.knt.push ({
     				Name:   Seed.knights[cityID][k]["knightName"],
     				Combat:	Seed.knights[cityID][k]["combat"],
     				ID:		Seed.knights[cityID][k]["knightId"],
     			});
     		}
     }
     t.knt = t.knt.sort(function sort(a,b) {a = a['knightId'];b = b['knightId'];return a == b ? 0 : (a < b ? -1 : 1);});
  },
  
  doBarb: function(cityID,counter,number,xcoord,ycoord,kid,u1,u9,u6,u7,u8,u10,u12){
  		var t = Tabs.Barb;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		params.cid=cityID;
  		params.type=4;
  	    params.kid=kid;
  		params.xcoord = xcoord;
  		params.ycoord = ycoord;
  		params.u1=u1;
  		params.u6=u6;
  		params.u7=u7;
  		params.u8=u8;
  		params.u9=u9;
  		params.u10=u10;
  		params.u12=u12;
  		
  		AttackOptions.BarbsTried++;
  		document.getElementById('pberror1').innerHTML = 'Tries:'+ AttackOptions.BarbsTried; 
  		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  		         loading: true,
  		         onSuccess: function (transport) {
  		         var rslt = eval("(" + transport.responseText + ")");
  		         if (rslt.ok) {
  		         var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
  		         var ut = unsafeWindow.unixtime();
  		         var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         for(i = 0; i <= unitsarr.length; i++){
  		         	if(params["u"+i]){
  		         	unitsarr[i] = params["u"+i];
  		         	}
  		         }
  		         var currentcityid = params.cid;
  		         unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
  		         unsafeWindow.update_seed(rslt.updateSeed)
  		         if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
  		         AttackOptions.BarbsDone[counter]++;
  		         document.getElementById(element1).innerHTML = 'Barbs: ' + AttackOptions.BarbsDone[counter]; 
  		         var now = new Date().getTime()/1000.0;
  		         now = now.toFixed(0);
  		         t.barbArray[counter][number]['time'] = now;
  		         GM_setValue('Barbs_' + Seed.player['name'] + '_city_' + counter + '_' + getServerId(), JSON2.stringify(t.barbArray[counter]));
  		         saveAttackOptions();
               } else {
  		         if (rslt.error_code != 8 && rslt.error_code != 213 && rslt.error_code == 210) AttackOptions.BarbsFailedVaria++;
  		         if (rslt.error_code == 213)AttackOptions.BarbsFailedKnight++;
  		         if (rslt.error_code == 210) AttackOptions.BarbsFailedRP++;
  		         if (rslt.error_code == 8) AttackOptions.BarbsFailedTraffic++;
  		         document.getElementById('pberror2').innerHTML = 'Excess Traffic errors:' + AttackOptions.BarbsFailedTraffic; 
  		         document.getElementById('pberror3').innerHTML = 'Rally Point errors: '+ AttackOptions.BarbsFailedRP;
  		         document.getElementById('pberror4').innerHTML = 'Knight errors:' + AttackOptions.BarbsFailedKnight;
  		         document.getElementById('pberror5').innerHTML = 'Other errors:' + AttackOptions.BarbsFailedVaria;
  		         //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
  		         }
  		         },
  		         onFailure: function () {}
  		 });
  	 saveAttackOptions();
  	 var element1 = 'pddatacity'+(counter-1);
  	 document.getElementById(element1).innerHTML = 'Barbs: ' + AttackOptions.BarbsDone[counter]; 
  	 var element2 = 'pddataarray'+(counter-1);
  	 document.getElementById(element2).innerHTML = '(' + AttackOptions.BarbNumber[counter] + '/' + t.barbArray[counter].length +')';
  },
  
  sendreport: function(){
	  var t = Tabs.Barb;
	  var number = 0;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = Seed.player['name'];
    params.subject = "Barb Overview";
    var message = 'Barbing Stats:' + '%0A';
    for (x=1;x<=Seed.cities.length;x++){	 
    	message+= Seed.cities[x-1][1] + ': ' + AttackOptions.BarbsDone[x] + ' (' + AttackOptions.BarbNumber[x] + '/' + t.barbArray[x].length +')' + '%0A';
    	number += AttackOptions.BarbsDone[x];
    }
    message += '%0A'+ 'Excess traffic errors: ' + AttackOptions.BarbsFailedTraffic +'%0A';
    message += 'Rallypoint errors: ' + AttackOptions.BarbsFailedRP +'%0A';
    message += 'Knight errors: ' + AttackOptions.BarbsFailedKnight +'%0A';
    message += 'Other errors: ' + AttackOptions.BarbsFailedVaria +'%0A';
    message += 'Extra check: ' + (AttackOptions.BarbsTried - number - AttackOptions.BarbsFailedTraffic - AttackOptions.BarbsFailedRP - AttackOptions.BarbsFailedKnight -  AttackOptions.BarbsFailedVaria) +'%0A';
    message += '%0A'+'%0A' + 'Food Gain (for 1 hour of baring)' +'%0A';
    for (q=1;q<=Seed.cities.length;q++){
    	var cityID = 'city' + Seed.cities[q-1][0];
    	var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - AttackOptions.Foodstatus[q];
    	message+= Seed.cities[q-1][1] + ': Start: ' + addCommas(AttackOptions.Foodstatus[q]) + ' End :' + addCommas(parseInt(Seed.resources[cityID]['rec1'][0] / 3600)) + ' Gain: ';
    	if (gain <= 0) message += '0' + '%0A';
    	else message += addCommas(gain)  + '%0A';
    }
    params.message = message;
    params.requestType = "COMPOSED_MAIL";
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
            } else {
            }
        },
        onFailure: function () {
        },
    });
  
  },
  
  clickedSearch : function (){
    var t = Tabs.Barb;
    
    t.opt.searchType = 0; 
    t.opt.maxDistance = AttackOptions.MaxDistance; 
    t.opt.searchShape = 'circle'; 
    t.searchRunning = true;
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    var element = 'pddatacity'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ xxx +','+ yyy;
   
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.mapCallback)}, MAP_DELAY);
  },
  
  mapCallback : function (left, top, width, rslt){
    var t = Tabs.Barb;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }
    map = rslt.data;
    var Dip = Seed.allianceDiplomacies;	
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
	
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
		    type = 7;
      } else
        continue;
        
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
	    t.mapDat.push ({time:0,x:map[k].xCoord,y:map[k].yCoord,dist:dist,level:map[k].tileLevel});
    }
    
    t.tilesSearched += (15*15);

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        var element = 'pddatacity'+(t.lookup-1);
        document.getElementById(element).innerHTML = 'Found: ' + t.mapDat.length;
        GM_setValue('Barbs_' + Seed.player['name'] + '_city_' + t.lookup + '_' + getServerId(), JSON2.stringify(t.mapDat));
        t.searchRunning = false;
        t.checkBarbData();
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    var element = 'pddatacity'+(t.lookup-1);
    document.getElementById(element).innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.mapCallback)}, MAP_DELAY);
  },
  
  stopSearch : function (msg){
    var t = Tabs.Barb;
	var element = 'pddatacity'+(t.lookup-1);
        document.getElementById(element).innerHTML = msg;
    t.searchRunning = false;
  },
  
  hide : function (){
  
  },

  show : function (){
  
  },

}; 

/********** Info Tab **********/
Tabs.Info = {
  tabOrder : toInfo,
  cont : null,
  ModelCity : {},

  init : function (div){
    var t = Tabs.Info;
    t.cont = div;
    fortmight = {
      u53: "4",
      u55: "7",
      u60: "1",
      u61: "2",
      u62: "3",
    };
    var t = Tabs.Info;
    rownum = 0;
    m = '<STYLE>.xtabH {background:#ffffe8; border:none; padding-right: 5px; padding-left: 5px; margin-left:10px; }\
            .xtabHL { background:#ffffe8; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left:5px; margin-left:10px; }\
            .xtabL { background:none; border-width: 1px; border-style: none none none solid; padding-right:5px; padding-left: 5px; margin-left:10px; }\
            .xtabLine { padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none }</style>\
        <DIV style="height:650px; max-height:650px; overflow-y:auto; overflow-x:hidden"><DIV class=ptstat>UNIT INFORMATION</div><TABLE align=center cellpadding=1 cellspacing=0>\
        <TR align=center><TD class=xtab></td><TD class=xtabHL colspan=5><B>COST TO BUILD</b></td><TD class=xtabHL colspan=7><B>STATS</b></td><TD class=xtabHL><B>Upkeep</b></td></tr>\
        <TR valign=bottom align=right><TD class=xtab></td><TD class=xtabHL>Food</td><TD class=xtabH>Wood</td><TD class=xtabH>Stone</td>\
        <TD class=xtabH>Ore</td><TD class=xtabH>Pop</td><TD class=xtabHL>Might</td><TD class=xtabH>Life</td><TD class=xtabH>Atk</td><TD class=xtabH>Def</td><TD class=xtabH>Speed</td><TD class=xtabH>Range</td><TD class=xtabH>Load</td>\
        <TD class=xtabHL>Food</td></tr>\
        <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';
    for (ui=1; ui<13; ui++){
      if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
      cost = unsafeWindow.unitcost['unt'+ui];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
      stats = unsafeWindow.unitstats['unt'+ui];   //  Life, Attack, Defense, Speed, Range, Load
      food = unsafeWindow.unitupkeeps[ui];
      might = unsafeWindow.unitmight['u'+ui];
      m += '<TR '+ rsty +'align=right><TD class=xtab align=left><B>'+ cost[0].substr(0,16) +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';

    }
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
    for (k in unsafeWindow.fortcost){
      if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
      cost = unsafeWindow.fortcost[k];     //  NAME, Food, Wood, Stone, Ore, ?, IdlePop, Time
      fi = k.substring(3);
      stats = unsafeWindow.fortstats['unt'+fi];   //  Life, Attack, Defense, Speed, Range, Load
      food = 0;
      might = fortmight['u'+fi];
      name = cost[0].replace ('Defensive','');
      name = name.replace ('Wall-Mounted','');
      m += '<TR '+ rsty +'align=right><TD align=left class=xtab><B>'+ name +'</b></td><TD class=xtabL>'+ cost[1] +'</td><TD class=xtab>'+ cost[2] +'</td>\
          <TD class=xtab>'+ cost[3] +'</td><TD class=xtab>'+ cost[4] +'</td><TD class=xtab>'+ cost[6] +'</td><TD class=xtabL>'+ might +'</td>\
          <TD class=xtab>'+ stats[0] +'</td><TD class=xtab>'+ stats[1] +'</td><TD class=xtab>'+ stats[2] +'</td><TD class=xtab>'+ stats[3] +'</td>\
          <TD class=xtab>'+ stats[4] +'</td><TD class=xtab>'+ stats[5] +'</td><TD class=xtabL>'+ food +'</td></tr>';
    }
    m += '<TR class=xtabLine><TD colspan=14 class=xtabLine></td></tr>';
    m += '</table>';
//Crest info
	var crestname = { 1101:'Bor', 
				  1102:'Ector',
				  1103:'Kay',
				  1104:'Bedivere',
				  1105:'Gawain',
				  1106:'Percival',
				  1107:'Galahad',
				  1108:'Lancelot',
				  1109:'Arthur',
				  1110:'Morgana',
				  1111:'Mordred',
				  1112:'Stag',
				  1113:'Pendragon',
				  1114:'Lady of the lake'};
	var crest = {};
	for (k in crestname){
		if(Seed.items['i'+k])
			crest[k] = Seed.items['i'+k];
		else
			crest[k] = 0;
	}
var crestreq = { 3:{1101:4, 1102:2, 1103:1},
				 4:{1103:4, 1104:3, 1105:1},
				 5:{1106:4, 1107:3, 1108:2},
				 6:{1109:4, 1110:3, 1111:2},
				 7:{1112:4, 1113:3, 1114:2}
				};
 
 m += '<DIV class=ptstat>CREST REQUIREMENTS</div><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR CLASS="xtabH">\
        <TD class=xtab></TH>\
        <TD class=xtabHL><b>Req 1 (Owned)</b></TD>\
        <TD class=xtabHL><b>Req 2 (Owned)</b></TD>\
        <TD class=xtabHL><b>Req 3 (Owned)</b></TD>\
      </TR>\
	  <TR style="height:1px;"><TD style="padding:0px; spacing:0px; height:1px; border-color:black; border-width: 1px; border-style: none none solid none" colspan=14></td></tr>';
	  rownum = 0;
	  for(k in crestreq){
	  if (++rownum % 2)
        rsty = '';
      else
        rsty = ' style="background: #e8e8e8" ';
		m += '<TR '+rsty+'>  \
			<TD class=xtab><B>City '+k+'</B></TD>';
		for(u in crestreq[k])
			m+='<TD class=xtabL>'+crestreq[k][u]+' '+crestname[u]+ ' ('+crest[u]+') </TD>';
		m += '</TR>';
	  }
 m += '</TABLE>';
	//End crest info
    m += '<BR><DIV class=ptstat>DISTANCE CALCULATOR</div><DIV class=ptentry><TABLE align=center cellpadding=1 cellspacing=0>\
      <TR><TD class=xtab align=right><B>First Location: </b></td><TD  class=xtab> X: <INPUT id=calcX type=text\> Y: <INPUT id=calcY type=text\> Or, choose city: <SPAN id=ptloc1></span></td></tr>\
      <TR><TD class=xtab><B>Second Location: </b></td><TD class=xtab> X: <INPUT id=calcX2 type=text\> Y: <INPUT id=calcY2 type=text\> Or, choose city: <SPAN id=ptloc2></span></td></tr></table>\
      <CENTER><DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptdistout></div>\
<div><b>Model ETA with: </b><select id="idETASelect">\
        <option value="0,250" > -- Select -- </option>\
        <option value="0,180" > Supply </option>\
        <option value="0,200" > Militia </option>\
        <option value="0,3000" > Scout </option>\
        <option value="0,300" > Pikeman </option>\
        <option value="0,275" > Swordsman </option>\
        <option value="0,250" > Archer </option>\
        <option value="1,1000" > Cavalry </option>\
        <option value="1,750" > Heavy Cavalry </option>\
        <option value="1,150" > Supply Wagon </option>\
        <option value="1,100" > Balista </option>\
        <option value="1,120" > Ram </option>\
        <option value="1,80" > Catapult </option>\
</select></div>\
<DIV style="width:60%; font-size:14px; border: 1px solid; background-color:white; margin:20px 3px 3px 0px; padding:4px" id=ptETAout></div>\
<BR><BR></center>';
    m += '<DIV class=ptstat>PROVINCE MAP</div><DIV id=ptProvMap style="height:'+ provMapCoords.imgHeight +'px; width:'+ provMapCoords.imgWidth +'px; background-repeat:no-repeat; background-image:url(\''+ URL_PROVINCE_MAP +'\')"></div>';
    m += '<BR><DIV class=ptstat>MISC INFO</div>KofC client version: '+ KOCversion +'<BR>';
    if (DEBUG_BUTTON)
      m += '<BR><INPUT id=ptButDebug type=submit name="SEED" value="DEBUG">';

    t.cont.innerHTML = m +'</div>';
    if (DEBUG_BUTTON)
      document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);

    new CdispCityPicker ('ptloc1', document.getElementById('ptloc1'), true, t.eventFromLocChanged, 0).bindToXYboxes(document.getElementById('calcX'), document.getElementById('calcY'));
    new CdispCityPicker ('ptloc2', document.getElementById('ptloc2'), true, t.eventLocChanged, 0).bindToXYboxes(document.getElementById('calcX2'), document.getElementById('calcY2'));
    //t.eventLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);
    t.eventFromLocChanged(Cities.cities[0], Cities.cities[0].x, Cities.cities[0].y);
    document.getElementById('idETASelect').addEventListener ( 'change', t.eventLocChanged, false);
    for (var c=0; c<Cities.numCities; c++)
      t.makeCityImg (c, document.getElementById('ptProvMap'));
  },

  hide : function (){
  },

  show : function (){
  },

// var provMapCoords = {imgWidth:680, imgHeight:654, mapWidth:595, mapHeight:595, leftMargin:44, topMargin:39};
  makeCityImg : function (cityNum, eMap){
    var t = Tabs.Info;
    var city = Cities.cities[cityNum];
//    var off = getAbsoluteOffsets (eMap);
    var x = parseInt((provMapCoords.mapWidth * city.x) / 750);
    var y = parseInt((provMapCoords.mapHeight * city.y) / 750);
    var ce = document.createElement ('div');
    ce.style.background = 'black';
    ce.style.opacity = '1.0';
    ce.style.position='relative';
    ce.style.display='block';
    ce.style.width='14px';
    ce.style.height='16px';
    ce.style.border='1px solid #fff';
    ce.style.color = 'white';
    ce.style.textAlign = 'center';
    ce.style.top = (y+provMapCoords.topMargin-(cityNum*16)-8) +'px';
    ce.style.left = (x+provMapCoords.leftMargin-7) +'px';
    eMap.appendChild(ce);
    ce.innerHTML = (cityNum+1) +'';
  },
  eventLocChanged : function (city, x, y){
    var t = Tabs.Info;
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
    var dist = distance (x1, y1, x2, y2);
    m = t.estETA(dist);
    if (m != null)
       document.getElementById('ptETAout').innerHTML = m;
    else logit("no M");
  },

  eventFromLocChanged : function (city, x, y){
    var t = Tabs.Info;
    t.ModelCity = city;
    var x1 = parseInt(document.getElementById('calcX').value);
    var x2 = parseInt(document.getElementById('calcX2').value);
    if (isNaN(x2))
      return;
    var y1 = parseInt(document.getElementById('calcY').value);
    var y2 = parseInt(document.getElementById('calcY2').value);
    var m = 'The distance from '+ x1 +','+ y1 +' to '+ x2 +','+ y2 +' is: &nbsp;<B>'+ distance (x1, y1, x2, y2).toFixed(2) +'</b>';
    document.getElementById('ptdistout').innerHTML = m;
    var dist = distance (x1, y1, x2, y2);
    m = t.estETA(dist);
    if (m != null)
       document.getElementById('ptETAout').innerHTML = m;
    else logit("no M");
  },

  estETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times.
    var t = Tabs.Info;
    var cityID;
    if (dist == 0) return "No ETA";
    var EtaType = document.getElementById('idETASelect');
    var baseSpeedSel = EtaType.options[EtaType.selectedIndex].value;
    var m = baseSpeedSel.split(',');
    var horse = parseInt(m[0]);
    var baseSpeed = parseInt(m[1]);
    if (baseSpeed == 0) return "ETA: unknown";
    var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
    var Speed = 0;
    if (horse){
    //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20)
      var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
      Speed = baseSpeed * (1 + mmLvl/10) * (1 + hsLvl/20);
    }
    else {
    //FootSpeed = Base * (1 + MM/10)
      Speed = baseSpeed * (1 + mmLvl/10);
    }
    //Grid Speed (tiles/second) = Speed (100ths/min) / 6000
    var gSpeed = 0;
    var estSec = 0;
    if (Speed>0) {
      gSpeed = Speed/6000;
      estSec = (dist/gSpeed).toFixed(0);
    }
    var ETAstr = 'Attack ETA:  <B>' + timestr ((parseInt((estSec+''))+30)+'',1) +'</b>';
    //RS - Cities Relief Station Level
    //Friendly Speed = Speed * (1 + RS/2)
    if (t.ModelCity) {
      cityID = t.ModelCity.id;
      //logit ('ETAest - cityID: ' + cityID);
      var building = getCityBuilding (cityID, 18);
      if (building) {
        //logit ('ETAest - building: ' + building.count + ' : ' + building.maxLevel);
        fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
        gSpeed = fSpeed/6000;
        estSec = (dist/gSpeed).toFixed(0);
        var friendTimestr = 'Friendly ETA: <B>' + timestr ((parseInt((estSec+''))+30)) +'</b>';
        ETAstr = ETAstr + ' ' + friendTimestr;
      }
    }
    return ETAstr;
  },
}

/********** Map Tab **********/
function CMapAjax (){
  this.normalize = normalize;
  this.request = request;

  function request (left, top, width, notify){
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;

    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }

  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}

/********** Wikia Tab **********/
Tabs.wikia = {
  tabOrder : toWikia,                    // order to place tab in top bar
  tabLabel : 'Map',
  myDiv : null,
  timer : null,
  forumlink :  'http://koc.dunno.com/index.sjs?f=ListServers2',

  init : function (div){    // called once, upon script startup
    var t = Tabs.wikia;
    t.myDiv = div;
    div.innerHTML = '<CENTER><iframe src="'+ t.forumlink +'" width="100%" height="550" name="board_in_a_box" <p>Ihr Browser kann leider keine eingebetteten Frames anzeigen: Sie k&ouml;nnen die eingebettete Seite &uuml;ber den folgenden Verweis aufrufen: <a href="'+ t.forumlink +'">Knights of Phoenix Forum</a></p> </iframe> <BR></center>';
  },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.wikia;
    mainPop.div.style.width = 1045 + 'px';
  },

  show : function (){         // called whenever this tab is shown
    var t = Tabs.wikia;
    mainPop.div.style.width = 1045 + 'px';
  },
}

/********** Test Tab  **********/
Tabs.Test = {
  tabOrder: toTest,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

  init : function (div){
    var t = Tabs.Test;
    t.myDiv = div;
	var citySelect = '   <SELECT id=fakeCity>';
	    for (var c=0; c<Cities.numCities; c++) {
		 	 aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
	         citySelect += '<option value=\''+c+'\'>'+aCity+'</option>';
	    }
	    citySelect += '</select>';
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=fakeIsScout></td></tr>\
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=fakeIsWild></td></tr>\
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox disabled id=fakeFalse></td></tr>\
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=fakeSeconds></td></tr>\
        <TR><TD align=right># of Supply: </td><TD><INPUT type=text size=6 value=0 id=faketroop0></td></tr>\
		<TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=0 id=faketroop1></td></tr>\
		<TR><TD align=right># of Scouts: </td><TD><INPUT type=text size=6 value=0 id=faketroop2></td></tr>\
		  <TR><TD align=right># of Pikes: </td><TD><INPUT type=text size=6 value=0 id=faketroop3></td></tr>\
		  <TR><TD align=right># of Swords: </td><TD><INPUT type=text size=6 value=0 id=faketroop4></td></tr>\
		  <TR><TD align=right># of Archers: </td><TD><INPUT type=text size=6 value=0 id=faketroop5></td></tr>\
		  <TR><TD align=right># of Calvary: </td><TD><INPUT type=text size=6 value=0 id=faketroop6></td></tr>\
		  <TR><TD align=right># of Heavy Cav: </td><TD><INPUT type=text size=6 value=0 id=faketroop7></td></tr>\
		  <TR><TD align=right># of Wagons: </td><TD><INPUT type=text size=6 value=0 id=faketroop8></td></tr>\
		  <TR><TD align=right># of Ballistas: </td><TD><INPUT type=text size=6 value=0 id=faketroop9></td></tr>\
		  <TR><TD align=right># of Battering Ram: </td><TD><INPUT type=text size=6 value=0 id=faketroop10></td></tr>\
		  <TR><TD align=right># of Catapults: </td><TD><INPUT type=text size=6 value=0 id=faketroop11></td></tr>\
		  <TR><TD align=right>Fake name to use: </td><TD><INPUT type=text size=13 value=oftheNOOBS id=fakeName></td></tr>\
		  <TR><TD align=right>Target city: </td><TD>'+citySelect+'</td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=testSendMarch type=submit value="Fake Attack" \></td></tr></table>\
        <INPUT id=ptReloadKOC type=submit value="Reload KOC" \>\
        <BR><DIV id=testDiv style="background-color:#fffff0; maxwidth:675; max-height:430px; height:430px; overflow-y:auto;"></div>';
    t.myDiv.innerHTML = m;
    document.getElementById('testSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('ptReloadKOC').addEventListener ('click', t.reloadKOC, false);
    function xyNotify(city, x, y){
      var m = '[ Notified: '+ (city?city.name:'null') +', x='+ x +', y='+ y +' ]';
      document.getElementById('testNotify').innerHTML = m;
    }
  },

  hide : function (){
  },

  show : function (){
  },

  reloadKOC : function (){
    var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
    var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxptButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';
    var e = document.createElement ('div');
    e.innerHTML = t;
    document.body.appendChild (e);
    setTimeout (function (){document.getElementById('xxptButReload').click();}, 0);
  },

  writeDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
    document.getElementById('testDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
    if (t.state != null)
    document.getElementById('testDiv').innerHTML += msg;
  },

  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, troops, name){
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    if (isFalse)
      march.marchType = 0;
    else if (isScout)
      march.marchType = 3;
    else
      march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (isWild) {
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
     march.unts = {}
	for(i=0; i<12; i++){
	  if(troops[i] > 0)
		march.unts["u"+(i+1)] = addCommas(troops[i]);
	}
	// if(numScout != 0)
    // march.unts.u3 = addCommas(numScout)
	// if(numMilitia != 0)
    // march.unts.u2 = addCommas(numMilitia)
	// if(numSupply != 0)
	// march.unts.u1 = addCommas(numSupply)
	// if(numPike != 0)
	// march.unts.u4 = addCommas(numPike)
	// if(numSword != 0)
	// march.unts.u5 = addCommas(numSword)
	// if(numArcher != 0)
	// march.unts.u6 = addCommas(numArcher)
	// if(numCav != 0)
	// march.unts.u7 = addCommas(numCav)
	// if(numHeavy != 0)
	// march.unts.u8 = addCommas(numHeavy)
	// if(numWagon != 0)
	// march.unts.u9 = addCommas(numWagon)
	// if(numBallista != 0)
	// march.unts.u10 = addCommas(numBallista)
	// if(numRam != 0)
	// march.unts.u11 = addCommas(numRam)
	// if(numCat != 0)
	// march.unts.u12 = addCommas(numCat)
    march.pid = 1234567;
    march.score = 9;
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = name;
    march.players.u1234567.t = 60;
    march.players.u1234567.m = 5441192;
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1;
    march.players.u1234567.a = 1;
    march.players.u1234567.i = 5;
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = Tabs.Test;
    var isScout = document.getElementById('fakeIsScout').checked;
    var isWild = document.getElementById('fakeIsWild').checked;
    var isFalse = document.getElementById('fakeFalse').checked;
	var troops = [];
	for(i=0; i<12; i++)
		troops[i] = parseInt(document.getElementById('faketroop'+i).value);
    var secs = parseInt(document.getElementById('fakeSeconds').value);
    // var mil = parseInt(document.getElementById('fakeMilitia').value);
	// var numSupply = parseInt(document.getElementById('fakeSupply').value);
	// var numPike = parseInt(document.getElementById('fakePike').value);
	// var numSword = parseInt(document.getElementById('fakeSword').value);
	// var numArcher = parseInt(document.getElementById('fakeArcher').value);
	// var numCav = parseInt(document.getElementById('fakeCav').value);
	// var numHeavy = parseInt(document.getElementById('fakeHeavy').value);
	// var numWagon = parseInt(document.getElementById('fakeWagon').value);
	// var numBallista = parseInt(document.getElementById('fakeBallista').value);
	// var numRam = parseInt(document.getElementById('fakeRam').value);
	// var numCat = parseInt(document.getElementById('fakeCat').value);
	// var numScout = parseInt(document.getElementById('fakeScout').value);
	var name = document.getElementById('fakeName').value;
	var city = document.getElementById('fakeCity').value;
    t.createFakeAttack (city, isScout, isWild, isFalse, secs, troops ,name);
  },
}
/********** Spam Tab **********/

Tabs.sample = {
  tabOrder : toSample,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab><TR align="left">';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;

  },

 e_spamOptChanged : function (){
  var t = Tabs.sample;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;

 },

 togglespam: function(obj){
  var t = Tabs.sample;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  };

 },

 toggleon: function(obj){
  var t = Tabs.sample;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
  };

 },
};  

var SpamEvery  = {
  timer : null,
  init : function (){

    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, '60000');
  },
  count : function (){
   var t = SpamEvery;
   if (Options.spamconfig.atime > Options.spamconfig.spammins) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
  },
  doit : function (){
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}


/********** Attack Tab  **********/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}
Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: toAttack,
  myDiv : null,
  data : {},
  MapAjax : new CMapAjax(),

  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE width=100% height=100% class=pbTab><TR><TD><INPUT id=pbBarbShow type=submit value="Show All Targets" \> <BR>\
       City: <SPAN id=pbAtkCSS></span> &nbsp; &nbsp; &nbsp; Radius: <INPUT id=pbBarbDist size=3 type=text> &nbsp; &nbsp; <INPUT id=pbBarbScan type=submit value=Scan \></td></tr><TR><TD height=100%>\
       <DIV id=pbAtkDiv style="background-color:white"></div></td></tr></table>';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },

  hide : function (){
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },

  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start();
    var totTargets = 0;
    for (var c=0; c<Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');
  },

  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist<1 || dist>35){
      t.writeDiv ("<SPAN class=boldRed>Nuh-uh, try again</span><BR>");
      return;
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'<BR>');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,

  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new CPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());
    }
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPad>';
    for (var c=0; c<Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '<TR><TD colspan=3><DIV class=pbStat>'+ Cities.cities[c].name +' &nbsp; (radius:'+ dat.radius +' &nbsp;targets:'+ dat.numTargets  +')</div></td></tr>';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});
      for (i=0; i<atks.length; i++)
        m += '<TR><TD>Barb Camp '+ atks[i].lvl +'</td><TD>'+ atks[i].x +','+ atks[i].y +'</td><TD> &nbsp; Dist='+ atks[i].dist.toFixed(2) +'</td></tr>';
    }
    t.popShow.getMainDiv().innerHTML = '</table></div>'+ m;
    t.popShow.getTopDiv().innerHTML = '<CENTER><B>Showing all targets in memory</b></center>';
    t.popShow.show(true);
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds<BR>');
  },

  oScan : {},
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance);
    var y = t.MapAjax.normalize(city.y-distance);
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'<BR>');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning<BR>');
    for (var i=0; i<t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },

  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('<BR>ERROR: '+ rslt.errorMsg +'<BR>');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 && !map[k].tileCityId && lvl<8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      }
    }
    t.oScan.curX += 15;
    if (t.oScan.curX > t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY > t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'<BR>');
  },
}
/********** Log Tab **********/
Tabs.ActionLog = {
  tabOrder: toLog,
  tabDisabled : !ENABLE_INFO_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,

  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>ACTION LOG</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=100%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },

  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  },

  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}
function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);
}
/************** Forward Buttons + Alliance Reports **************/

/**************/

var messageNav = {
  mmFunc : null,
  mmsFunc : null,
  
  init : function (){
    t = messageNav;
    t.mmFunc = new CalterUwFunc ('modal_messages', [[/}\s*$/, 'setTimeout(messageNav_hook,0); }']]);
    t.mmsFunc = new CalterUwFunc ('modal_messages_send', [[/{\s*var params/i, '{\nif (modal_messages_send_hook()) return;\nvar params']]);
    unsafeWindow.messageNav_hook = messageNav.hook;
    unsafeWindow.modal_messages_send_hook = messageNav.msgSendHook;
    t.mmFunc.setEnable (true);
    t.mmsFunc.setEnable (true);
  },

  setEnable : function (tf){
  },

  isAvailable : function (){
    t = messageNav;
    return t.mmFunc.isAvailable();
  },
  
  hook : function (){
    if (!Options.enhanceMsging)
      return;
    var div = document.getElementById('modal_msg_view_actions');
    var but = makeButton20('Forward');
    div.appendChild (but);
    but.addEventListener ('click', messageNav.eventForward, false);
    div = document.getElementById('modal_msg_write_to').parentNode;
    div.innerHTML = '<TABLE><TR><TD class=xtab><b>To:</b> <INPUT type=text id=modal_msg_write_to></td><TD class=xtab><SPAN id=ptfwdbut></span></td></tr></table>';
    var button = makeButton20('All Officers');
    document.getElementById('ptfwdbut').appendChild (button);
    button.addEventListener ('click', function (){document.getElementById("modal_msg_write_to").value = "<officers>"}, false);
  },

  eventForward : function (){
    document.getElementById('modal_msg_write_subj').value = "fwd: " + document.getElementById('modal_msg_view_subj').innerHTML.toString().stripTags();
    document.getElementById('modal_msg_write_to').value = '';
    var from = document.getElementById('modal_msg_view_from').children[0].innerHTML;
    var body = document.getElementById('modal_msg_view_body').innerHTML.replace(/\n/g, '').replace(/<br>/gi, '\n').stripTags().replace (/back$/i, '');
    document.getElementById('modal_msg_write_txt').value = '[Original message from '+ from +' follows:]\n'+ body;
    unsafeWindow.modal_messages_compose();
  },

  msgSendHook : function (){
    if (!Options.enhanceMsging)
      return;
    var to = document.getElementById("modal_msg_write_to").value.trim();
    if (to.toLowerCase() != '<officers>' || getMyAlliance()[0]==0)
      return false;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.toIds = getMyAlliance()[0];
    params.subject = document.getElementById("modal_msg_write_subj").value +' [Sent to all officers]';
    params.message = document.getElementById("modal_msg_write_txt").value;
    params.type = 'alliance';
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendMessage.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.msgsent);
                document.getElementById('modal_msg_write_to').value = "";
                document.getElementById('modal_msg_write_subj').value = "";
                document.getElementById('modal_msg_write_txt').value = ""
            } else {
                unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.enterexistingname)
            }
        },
        onFailure: function () {
          unsafeWindow.Modal.showAlert(unsafeWindow.g_js_strings.modal_messages_send.oopscompose)
        },
    });
    return true;
  },
}


var AttackDialog = {
  init : function (){
    var t = AttackDialog;
    t.modal_attackFunc = new CalterUwFunc ('modal_attack', [[/}\s*$/, 'attackDialog_hook(); }']]);
    unsafeWindow.attackDialog_hook = t.modalAttackHook;
    t.modal_attackFunc.setEnable (true);
  },
  
  setEnable : function (){
  },

  isKnightSelectAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
  isAttackCityPickerAvailable : function (){
    var t = AttackDialog;
    return t.modal_attackFunc.isAvailable();
  },
    
  modalAttackHook : function (){
    var t = AttackDialog;
    if (Options.fixKnightSelect || Options.attackCityPicker){
      for (var i=1; i<6; i++)
        document.getElementById('modal_attack_tab_'+ i).addEventListener('click', t.e_changeMarchType, false);
    }
    if (Options.attackCityPicker){
      setTimeout (t.initCityPicker, 0);
    }      
  },
  
  initCityPicker : function (){
    var t = AttackDialog;
    var div = document.getElementById('modal_attack_target_numflag'); // as of KofC version 96;
    var mySpan;
    if (div) {
      div.parentNode.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    } else {
      var span = document.getElementById('modal_attack_target_coords');   // KofC version 116+;
      span.parentNode.parentNode.firstChild.innerHTML += ' &nbsp; <SPAN id=modal_attack_citybuts></span>';
    }
    new CdispCityPicker ('ptatp', document.getElementById('modal_attack_citybuts'), false, t.e_CityButton);
    var cityIdx = Cities.byID[unsafeWindow.currentcityid].idx;
    thisCityBut = document.getElementById('ptatp_'+ cityIdx);
    thisCityBut.style.opacity = '0.5';
    thisCityBut.disabled = true;
    if (document.getElementById('modal_attack_tab_4').className=='selected' || document.getElementById('modal_attack_tab_3').className=='selected')   // don't do for attack or scout
      document.getElementById('modal_attack_citybuts').style.display = 'none';
  },
  
  e_CityButton : function (city){
    document.getElementById('modal_attack_target_coords_x').value = city.x;
    document.getElementById('modal_attack_target_coords_y').value = city.y;
    unsafeWindow.modal_attack_update_time();
  },
      
  e_changeMarchType : function (evt){
    var t = AttackDialog;
    var marchType = parseInt(evt.target.id.substr(17));  
    if (Options.attackCityPicker){
      if (marchType==3 || marchType==4)
        document.getElementById('modal_attack_citybuts').style.display = 'none';
      else
        document.getElementById('modal_attack_citybuts').style.display = 'inline';
    }
    if (Options.fixKnightSelect){
      var knightVal = 0;
      var selector = document.getElementById('modal_attack_knight'); 
      if (selector.length>1 && (marchType==4 || marchType==2))   // if 'attack' or 'reinforce'
        knightVal = 1;
      selector.selectedIndex = knightVal;
    }
  },  
}


var AllianceReports = {
  checkPeriod : 300,
  allianceNames : [],
  saveArfunc : unsafeWindow.allianceReports,

  init : function (){
    t = AllianceReports;
    t.enable (Options.enhanceARpts);
    t.marvFunc = new CalterUwFunc ('modal_alliance_report_view', [['getReportDisplay', 'getReportDisplay_hook2']]);
    unsafeWindow.getReportDisplay_hook2 = t.getReportDisplayHook;
    t.marvFunc.setEnable (true);
  },
   
  getReportDisplayHook : function (a, b){
    var x = '';
    try {
      x = unsafeWindow.getReportDisplay(a,b);  
    } catch (e){
      x = 'Error formatting report: '+ e;
    }
    return x;
  },
  
  enable : function (tf){
    t = AllianceReports;
    if (tf)
      unsafeWindow.allianceReports = t.myAllianceReports;
    else
      unsafeWindow.allianceReports = t.saveArfunc;
  },
  
  myAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
//logit (inspect (rslt, 1, 1));        
        displayReports (rslt.arReports, rslt.arPlayerNames, rslt.arAllianceNames, rslt.arCityNames, rslt.totalPages);
      },
      onFailure: function (rslt) {
      },
    }, false);

    function displayReports (ar, playerNames, allianceNames, cityNames, totalPages){
      var msg = new Array();
      var myAllianceId = getMyAlliance()[0];
      msg.push ("<STYLE>.msgviewtable tbody .myCol div {margin-left:5px; overflow:hidden; white-space:nowrap; color:#000}\
            .msgviewtable tbody .myHostile div {font-weight:600; color:#600}\
            .msgviewtable tbody .myGray div {color:#666}\
            .msgviewtable tbody .myRein div {color:#050}\
            .msgviewtable tbody .myWarn div {font-weight:600; color:#442200}\
            </style>");
      msg.push("<div class='modal_msg_reports'>");
      var rptkeys = unsafeWindow.Object.keys(ar);
      if (matTypeof(ar) != 'array') {
//logit ('displayReports: '+ Options.allowAlterAR);        
        if (Options.allowAlterAR)
          msg.push("<div id='modal_alliance_reports_tablediv' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        else
          msg.push("<div id='modal_alliance_reports_tabledivNKA' class='modal_msg_list'><table width=675 cellpadding='0' cellspacing='0' class='msgviewtable reportviewtable alliancetable'>");
        msg.push("<thead><tr><td width=105>Date</td><td width=40>Type</td><td width=150>Attacker</td><td>Target</td><td>View</td></tr></thead><tbody>");
        for (var i = 0; i < rptkeys.length; i++) {
          var rpt = ar[rptkeys[i]];
          var colClass = '"myCol"';
          rpt.marchType = parseInt(rpt.marchType);
          rpt.side0AllianceId = parseInt(rpt.side0AllianceId);
          var targetDiplomacy = getDiplomacy (rpt.side0AllianceId);
          if (rpt.marchType == 2){
            colClass = '"myCol myRein"';
          } else if (rpt.side1AllianceId != myAllianceId){
            colClass = '"myCol myHostile"';
          } else {
            if (parseInt(rpt.side0TileType) < 50){          // if wild
              if (parseInt(rpt.side0PlayerId) == 0)
                colClass = '"myCol myGray"';
              else
                colClass = '"myCol myWarn"';
            } else if (parseInt(rpt.side0PlayerId) == 0) {   // barb
              colClass = '"myCol myGray"';
            } else {
              if (targetDiplomacy == 'friendly')
                colClass = '"myCol myWarn"';
            }
          }
//logit (inspect (ar, 3, 1));
          msg.push ('<tr valign=top');
          if (i%2 == 0)
            msg.push(" class=stripe");
          msg.push("><TD class="+ colClass +"><div>");
          msg.push(unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime));
          msg.push ('<BR>Rpt #');
          msg.push (rpt.reportId);          
          msg.push("</div></td><TD class="+ colClass  +"><div>");
          if (rpt.marchType == 1)
            msg.push (unsafeWindow.g_js_strings.commonstr.transport);
          else if (rpt.marchType == 3)
            msg.push (unsafeWindow.g_js_strings.commonstr.scout);
          else if (rpt.marchType == 2)
            msg.push ('Reinf');
          else
            msg.push (unsafeWindow.g_js_strings.commonstr.attack);

          // attacker ...
          msg.push ("</div></td><TD class="+ colClass +"><div>");
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]))
          else
            msg.push ('?Unknown?');
            msg.push (' ');
            msg.push (coordLink(rpt.side1XCoord, rpt.side1YCoord));
            msg.push ('<BR>');
          
          if (rpt.side1AllianceId != myAllianceId){
            msg.push (allianceNames['a'+rpt.side1AllianceId]);
            msg.push (' (');
            msg.push (getDiplomacy(rpt.side1AllianceId));
            msg.push (')');
          } else {
            msg.push ('<BR>');
          }
          msg.push ('</div></td>');

          // target ...
          msg.push ("<TD class="+ colClass  +"><DIV>");
          var type = parseInt(rpt.side0TileType);

          if (type < 50){                              // wild
            msg.push(unsafeWindow.g_mapObject.types[type].toString().capitalize());
            msg.push(" Lvl " + rpt.side0TileLevel)
            if (parseInt(rpt.side0PlayerId) != 0) {   // IF OWNED, show owner ...
              msg.push (' [');
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push ('] ');
            }
          } else {
            if (parseInt(rpt.side0PlayerId) == 0) {   //  barb
              msg.push(unsafeWindow.g_js_strings.commonstr.barbariancamp);
              msg.push(" Lvl " + rpt.side0TileLevel)
            } else {        // city
              msg.push (escape(playerNames["p" + rpt.side0PlayerId]));
              msg.push (' - ');
              msg.push (cityNames['c'+ rpt.side0CityId]);
            }
          }
          msg.push (' ');
          msg.push (coordLink(rpt.side0XCoord, rpt.side0YCoord));
          if (rpt.side0AllianceId!=0 && rpt.side0AllianceId!=myAllianceId){
            msg.push ('<BR>');
            msg.push (allianceNames['a'+rpt.side0AllianceId]);
            msg.push (' (');
            msg.push (targetDiplomacy);
            msg.push (')');
          }

          
/***
        
MY reports, reins works ...
<div><a href="#" onclick="jQuery('#modal_msg_body').trigger('viewReinforcedReport', ['6076798','67674','Elroy','IV','13412958','Duke_Swan','6329','Erisvil',662,477]);return false;">View Report</a></div>

    
OK: <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6044155&quot;,0,51,9,2282354,&quot;Jetson&quot;,&quot;M&quot;,&quot;Joe7z6bq&quot;,&quot;M&quot;,4,668,437,1299747584,0,643,407);return false;">View</a></div>           
ERROR (Reinf): <a onclick=" $(&quot;modal_alliance_reports_tabledivNKA&quot;).id=&quot;modal_alliance_reports_tablediv&quot;; modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View</a>
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;'>View</a>                        
modal_alliance_report_view(&quot;6043602&quot;,1,51,9,13487684,&quot;Fred8135i&quot;,&quot;M&quot;,&quot;Jetson&quot;,&quot;M&quot;,2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
modal_alliance_report_view("6043602",1,51,9,13487684,"Fred8135i","M","Jetson","M",2,188,696,1299746211,0,23,518);return false;">View Report</a></div>            
***/          
          
          
          // 'view report' link ...
          if (Options.allowAlterAR)
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' modal_alliance_report_view(\"");   // ONCLICK ???
          else
            msg.push("</div></td><TD class="+ colClass  +"><div><a onclick=' $(\"modal_alliance_reports_tabledivNKA\").id=\"modal_alliance_reports_tablediv\"; modal_alliance_report_view(\"");   // ONCLICK ???
          msg.push(rpt.reportId);
          msg.push('",');
          if (parseInt(rpt.side1AllianceId) == parseInt(Seed.allianceDiplomacies.allianceId))
            msg.push(1);
          else
            msg.push(0);
          msg.push(",");
          msg.push(rpt.side0TileType);
          msg.push(",");
          msg.push(rpt.side0TileLevel);
          msg.push(",");
          msg.push(rpt.side0PlayerId);
          msg.push(',"');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["p" + rpt.side0PlayerId]));
          else
            msg.push(unsafeWindow.g_js_strings.commonstr.enemy);
          msg.push('","');
          if (parseInt(rpt.side0PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side0PlayerId]));
          else
            msg.push(0)
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) > 0)
            msg.push(escape(playerNames["p" + rpt.side1PlayerId]));
          msg.push('","');
          if (parseInt(rpt.side1PlayerId) != 0)
            msg.push(escape(playerNames["g" + rpt.side1PlayerId]));
          msg.push('",');
          msg.push(rpt.marchType);
          msg.push(",");
          msg.push(rpt.side0XCoord);
          msg.push(",");
          msg.push(rpt.side0YCoord);
          msg.push(",");
          msg.push(rpt.reportUnixTime);
          msg.push(",");
          if (parseInt(rpt.reportStatus) == 2)
            msg.push(1);
          else
            msg.push(0);
          if (rpt.side1XCoord) {
            msg.push(",");
            msg.push(rpt.side1XCoord);
            msg.push(",");
            msg.push(rpt.side1YCoord)
          } else {
            msg.push(",,");
          }
          msg.push(");return false;'>View</a></div></td></tr>");
        }
        msg.push("</tbody></table></div>");
      }
      msg.push("</div><div id='modal_report_list_pagination'></div>");
      document.getElementById('allianceContent').innerHTML = msg.join("");
      if (pageNum) {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports", pageNum)
      } else {
        unsafeWindow.ctrlPagination("modal_report_list_pagination", totalPages, "allianceReports")
      }
    }
  },

}   // end AllianceReports singleton


/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){
    var f = FoodAlerts;
    var now = unixTime();
      row = [];

      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
		var totalusage = (rp[1] - usage);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        //  if (timeLeft<(Options.foodWarnHours*3600)) {
		if (timeLeft > 0 && (timeLeft<(Options.foodChatWarnHours*3600))) {
                msg += 'My city ' + Cities.cities[i].name.substring(0,10) + ' (' +
                       Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += ' is low on food. Remaining: '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') Upkeep: '+addCommas(usage);
                sendChat ("/a " + msg);
          }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
  },
}

/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},

  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },

  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },

  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  init : function (){
    if (Options.pbEveryMins < 1)
      Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
  },
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  }
}

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {actionLog ("Blocked Faire popup");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);

// TODO: actionLog ?
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!");
        KOCnotFound(5*60);
      }
    } catch (e){
      logit ("KOC NOT FOUND!");
      KOCnotFound(4*60);
    }
  }
}

function kocWatchdog (){
  var INTERVAL = 30000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));
    if (document.getElementById('mod_maparea')==null){
      actionLog ("KOC not loaded");
      KOCnotFound(2*60);
    }
  }
}

function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;

  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR> Power has detected that KOC is not loaded<BR>\
      Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="Cancel Refresh"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();

  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}

var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,

  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },

  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },

  useWideMap : function (tf) {
  	t = WideScreen;
  	if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
  		return;
  	if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
  	} else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
  	}
  },
}

var anticd = {
  isInited : false,
  KOCversion : '?',

  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },

  getKOCversion : function (){
    return this.KOCversion;
  },
}

try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,

  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=0 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++)
      m += '<TD class=spacer></td><TD class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getTopDiv().innerHTML = m;

    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      div.style.maxWidth = '1045px';
      div.style.overflowX = 'auto';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }

    if (t.currentTab == null)
      t.currentTab = sorter[0][1];
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },

  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },

  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },

  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },

  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  saveOptions();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
	scr.innerHTML = func.toString();
	document.body.appendChild(scr);
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  scr = document.createElement('script');
	scr.innerHTML = func.toString();
	document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
  	var scr=document.createElement('script');
  	scr.innerHTML=js;
  	document.body.appendChild(scr);
  	return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
}

function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");

  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();

  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }

  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);

  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}

function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}

function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getDiplomacy2 (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'Ally';
  return 'Neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
			var xValue=that.coordBoxX.value.trim();
			var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue);
			if(xI) {
				that.coordBoxX.value=xI[1]
				that.coordBoxY.value=xI[2]
			}
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
    eX.style.width='2em';
    eY.style.width='2em';
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 0, 0, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>Power</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptcccancel type=submit value="CANCEL" \> &nbsp; &nbsp; <INPUT id=ptcccontin type=submit value="CONTINUE" \></td></tr></table>';
  document.getElementById('ptcccancel').addEventListener ('click', function (){pop.show(false); if (canNotify) canNotify();}, false);
  document.getElementById('ptcccontin').addEventListener ('click', function (){pop.show(false); if (contNotify) contNotify();}, false);
  pop.show(true);
}

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function dialogRetry (errMsg, seconds, onRetry, onCancel){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>Power Tools</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);

  document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');
}

function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);
  return url + args;
}

function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;

if (DEBUG_TRACE_AJAX) logit ("AJAX: "+ url +"\n" + inspect (opts, 3, 1));

  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");

  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();

  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }

  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);

  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters)
      a.push (k +'='+ opts.parameters[k] );
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}

function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

if (DEBUG_TRACE) logit (" 1a myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }

  function myFailure(){
    var o = {};
if (DEBUG_TRACE) logit ("myAjaxRequest.myFailure(): "+ inspect(rslt, 1, 1));
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }

  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (rslt.ok){
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess(): "+ inspect(rslt, 1, 1));
      rslt.errorMsg = null;   ///// !!!!!!!!!!!!!  ************
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
if (DEBUG_TRACE) logit (" 1b myAjaxRequest.mySuccess() !ok : "+ inspect(rslt, 3, 1));
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
      rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)});
    } else {
      wasSuccess (rslt);
    }
  }
}

function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

var myServerId = null;

function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
    return m[1];
  return '';
}

function logit (msg){

  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}

var debugWin = {
  popDebug : null,
  dbDefaultNot : 'tech,tutorial,items,quests,wilderness,wildDef,buildings,knights,allianceDiplomacies,appFriends,players',
  dbSelect : {},

  doit : function (){
    var t = debugWin;

    function syncBoxes (){
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          div.childNodes[i].checked = t.dbSelect[name];
        }
      }
    }
    function clickedAll (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = true;
      syncBoxes();
    }
    function clickedNone (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = false;
      syncBoxes();
    }
    function clickedDefaults (){
      for (k in t.dbSelect)
        t.dbSelect[k] = true;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      syncBoxes();
    }
    function clickedShow (){
      var now = new Date();
      var myseed = unsafeWindow.Object.clone (Seed);
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          if (!div.childNodes[i].checked)
            delete myseed[name];
        }
      }
      WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (myseed, 8, 1));
      myseed=null;
    }

    function clickedShowScripts (){
      var scripts = document.getElementsByTagName('script');
      for (var i=0; i<scripts.length; i++){
        if (scripts[i].src!=null && scripts[i].src!='')
          WinLog.write ('<A TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }

    if (t.popDebug == null){
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW> &nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
        <DIV id=dbpoplist style="max-height:400px; height:400px; overflow-y:auto"></div>';
      var div = document.getElementById('dbpoplist');
      for (var k in Seed)
        t.dbSelect[k] = true;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      var m = [];
      for (k in t.dbSelect){
        m.push ('<INPUT type=checkbox ');
        m.push ('name="dbpop_');
        m.push (k);
        m.push ('"> &nbsp; ');
        m.push (k);
        m.push ('<BR>');
      }
      div.innerHTML = m.join ('');
      document.getElementById('dbsuball').addEventListener('click', clickedAll, false);
      document.getElementById('dbsubnone').addEventListener('click', clickedNone, false);
      document.getElementById('dbdefaults').addEventListener('click', clickedDefaults, false);
      document.getElementById('dbsubdo').addEventListener('click', clickedShow, false);
      document.getElementById('dbsubscripts').addEventListener('click', clickedShowScripts, false);
      syncBoxes();
    }
    t.popDebug.show (true);
  },
}


function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function saveAttackOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AttackOptions_'+serverID, JSON2.stringify(AttackOptions));}, 0);
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
   if (Options.alertSound.soundUrl == 'http://www.falli.org/app/download/3780510256/fliegeralarmsire.mp3?t=1263916531') {Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL; saveOptions () }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function readAttackOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AttackOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          AttackOptions[k][kk] = opts[k][kk];
      else
        AttackOptions[k] = opts[k];
    }
  }
}


function createButton (label,id){
  var a=document.createElement('a');
  
  a.className='button20';
  a.id = id;
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="pbGotoMap (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}


unsafeWindow.pbGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
  setTimeout (function (){ 
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};
unsafeWindow.PTscout = function (x, y){
  setTimeout (function (){
    if (Options.hideOnGoto)
    hideMe ();
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    unsafeWindow.changeview_map(document.getElementById('mod_views_map'));
	unsafeWindow.modal_attack(3,x,y);
  }, 0);
};

var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcOld = null;
  this.funcNew = null;
  try {
    var x = funcName.split('.');
    var f = unsafeWindow;
    for (var i=0; i<x.length; i++)
      f = f[x[i]];
    this.funcOld = f;
    var rt = f.toString().replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)  // if not found
        return;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }

  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr = document.createElement('script');    // <== need to remove on disable!!!
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 500);
      	t.isEnabled = true;
      } else {
      var x = funcName.split('.');
      var f = unsafeWindow;
      for (var i=0; i<x.length-1; i++)
        f = f[x[i]];
      f[x[x.length-1]] = this.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function strButton14 (label, tags){
  if (tags == null)
    tags = '';
  return ('<A class="button14 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a>' );
}

function reloadKOC (){
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+getServerId();
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ getServerId() +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}

function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}

function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}

function doDefTrain (cityId, unitId, num, notify){
  var time = unsafeWindow.modal_walls_traintime(unitId, num);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = 0;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fortify.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (rslt.ok) {
          unsafeWindow.seed.queue_fort["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, rslt.fortifyId]);
          if (notify != null)
            setTimeout (function (){notify(null);}, 500);
        } else {
          if (notify != null)
            setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      },
      onFailure: function () {
        if (notify != null)
          notify(rslt.errorMsg);
      },
  });
}

function doTrain (cityId, unitId, num, notify){
  var time = unsafeWindow.modal_barracks_traintime(unitId, num);
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.cid = cityId;
  params.type = unitId;
  params.quant = num;
  params.items = 0;

  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function(rslt) {
      if (rslt.ok) {
        for (var i = 1; i < 5; i++) {
          unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num)
        }
        unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(num);
        unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(num);
        unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
        if (notify != null)
          setTimeout (function (){notify(null);}, 500);
      } else {
        if (notify != null){
          setTimeout (function (){notify(rslt.errorMsg);}, 500);
        }
      }
    },
    onFailure: function(o) {
      if (notify != null)
        notify(rslt.errorMsg);
    }
  });
}

function getAbsoluteOffsets (e){
  ret = {left:0, top:0};
  while (e.offsetParent){
    if (e.style.position == 'absolute')
      break;
    ret.left += e.offsetLeft;
    ret.top += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};

function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 250);
  }
}

function clickWin (win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
}

function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}

function searchDOM (node, condition, maxLevel, doMult){
  var found = [];
  eval ('var compFunc = function (node) { return ('+ condition +') }');
  doOne(node, 1);
  if(!doMult){
    if (found.length==0)
      return null;
    return found[0];
  }
  return found;
  function doOne (node, curLevel){
    try {
      if (compFunc(node))
        found.push(node);
    } catch (e){
    }
    if (!doMult && found.length>0)
      return;
    if (++curLevel<maxLevel && node.childNodes!=undefined)
      for (var c=0; c<node.childNodes.length; c++)
        doOne (node.childNodes[c], curLevel);
  }
}

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);

  function level (e, levels, cur){
    try {
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}

function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}

function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

function htmlTitleLine (msg){
  return '<TABLE width=100% cellspacing=0><TR><TD style="padding:0px" width=50%><HR></td><TD style="padding:0px">[ '+ msg +' ]</td><TD style="padding:0px" width=50%><HR></td></tr></table>';
}

var WinManager = {
  wins : {},    // prefix : CPopup obj
  didHide : [],


  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },

  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },

  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },

  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }
}

function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;

  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;

  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';

  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;

  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);

  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);

  function e_divClicked (){
    t.focusMe();
  }
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };

String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}

String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (v == undefined)
    return 'undefined';
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function updatebotbutton(text)
{
 //var but=document.getElementById('botbutton');
 //but.innerHTML='<span style="color: #ff6">'+ text +'</span>';
}
function tbodyScroller (tbody, maxHeight){
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}

function getRemainingHeight (e, myDiv){
  var ec = getClientCoords(e);
  var cc = getClientCoords(myDiv);
  return myDiv.clientHeight - (ec.y - cc.y);
}

function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function htmlSelector (valNameArray, curVal, tags){
  m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
  for (k in valNameArray){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameArray[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');

}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}

function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}

function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24));
    m.push ('d ');
    m.push (parseInt(time%24));
    m.push ('h ');
    return m.join ('');
  } else
    return timestr (time);
}

function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('d ');
    t %= 86400;
  }
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('h ');
    t %= 3600;
  }
  m.push (parseInt(t/60));
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');
  }
  return m.join ('');
}

var WINLOG_MAX_ENTRIES = 1000;     // TODO

var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }

    if (!t.win || t.win.closed){
t.isOpening = true;
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
t.isOpening = false;
t.state = null;
    }

    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
  },

  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');
    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },

};

function getMarchInfo (){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }

  var now = unixTime();

  for(i=0; i<Cities.numCities; i++) {   // each city
    cityID = 'city'+ Cities.cities[i].id;
    for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if (typeof (march) == 'object'){
        for (ii=0; ii<13; ii++){
          ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
          ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
        }
        for (ii=1; ii<5; ii++){
          ret.resources[ii] += parseInt (march['resource'+ ii]);
        }
          ret.resources[0] += parseInt (march['gold']);
      }
// TODO: fixup completed marches
// TODO: Assume transport is complete ?
    }
  }
  return ret;
}

var MessageCounts = {
  messagesNotifyFunc : null,

  init : function (){
	var t = MessageCounts;
	//MOD ALTER UWF
		t.messagesNotifyFunc = new CalterUwFunc ('messages_notify_bug', [
		['$("chrome_messages_notify").innerHTML = a;', 'msgCount_hook(a);'],
		['$("chrome_messages_notify").removeClassName("noCount");', ''],
		['$("chrome_messages_notify").addClassName("noCount");','msgCount_hook(a);']
	]);
	if (t.messagesNotifyFunc.isAvailable()){
		unsafeWindow.msgCount_hook = t.msgCount_hook;
		e = document.getElementById('chrome_messages_notify');
		span = document.createElement('span');
		span.id = 'chrome_messages_notify_Msg';
		e.parentNode.insertBefore (span, e);
		span.style.visibility = 'hidden';
			if (Options.fixMsgCount){
				t.enable (true);
				setTimeout (unsafeWindow.messages_notify_bug, 1000);
			}
		}
	},

	msgCount_hook : function (a) {
		var l = document.getElementById('chrome_messages_notify_Msg');
		var r = document.getElementById('chrome_messages_notify');
		var newMessages = parseInt(Seed.newMailCount);
		var newReports = parseInt(Seed.newTradeReports) + parseInt(Seed.newReportCount);
		//logit('Messages: '+ newMessages + ',' + ' Reports: '+ newReports);
		l.innerHTML = newMessages;
		r.innerHTML = newReports;
		l.className = 'notificationCount';
		r.className = 'notificationCount';
		l.style.margin = '10px 0 0 10px';
		r.style.margin = '-23px 0 0 40px';
		l.style.visibility = (newMessages > 0) ? 'visible' : 'hidden' ;
		r.style.visibility = (newReports > 0) ? 'visible' : 'hidden' ;
	},

  enable : function (tf){
    var t = MessageCounts;
    t.messagesNotifyFunc.setEnable (tf);
    if (!tf)
      document.getElementById('chrome_messages_notifyL').style.display = 'none';
    setTimeout (unsafeWindow.messages_notify_bug, 0);
  },

  isAvailable : function (){
    var t = MessageCounts;
    return t.messagesNotifyFunc.isAvailable();
  },
}

var WarnZeroAttack = {
  modalAttackFunc : null,

  init : function (){
    var t = WarnZeroAttack;
    t.modalAttackFunc = new CalterUwFunc ('modal_attack', [['modal_attack_check()', 'modalAttack_hook()']]);
    unsafeWindow.modalAttack_hook = t.hook;
    t.modalAttackFunc.setEnable(Options.fixWarnZero);
  },

  setEnable : function (tf){
    var t = WarnZeroAttack;
    t.modalAttackFunc.setEnable (tf);
  },

  isAvailable : function (){
    var t = WarnZeroAttack;
    return t.modalAttackFunc.isAvailable();
  },

  hook : function (){
    var t = WarnZeroAttack;
    if (parseIntZero(document.getElementById('modal_attack_target_coords_x').value) == 0
    && parseIntZero(document.getElementById('modal_attack_target_coords_y').value) == 0){
      new CdialogCancelContinue ('<SPAN class=boldRed>You are about to march to location 0,0!</span>', null, unsafeWindow.modal_attack_check, document.getElementById('modalInner1'));
    } else {
      unsafeWindow.modal_attack_check();
    }
  },

}

var MapDistanceFix = {
  popSlotsFunc : null,
  init : function (){
    var t = MapDistanceFix;
    t.popSlotsFunc = new CalterUwFunc ('MapObject.prototype.populateSlots', [['this.distance', 'fixMapDistance_hook']]);
    if (t.popSlotsFunc.isAvailable()){
      unsafeWindow.fixMapDistance_hook = t.fixMapDistance_hook;
      if (Options.fixMapDistance)
        t.enable (true);

    }
  },
  fixMapDistance_hook : function (cityX, cityY, tileX, tileY){
    var city = Cities.byID[unsafeWindow.currentcityid];
    return distance (city.x, city.y, tileX, tileY);
  },
  enable : function (tf){
    var t = MapDistanceFix;
    t.popSlotsFunc.setEnable (tf);
  },
  isAvailable : function (){
    var t = MapDistanceFix;
    return t.popSlotsFunc.isAvailable();
  },
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    }
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n');
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);
  }
}

// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }
  var sliderHeight = parseInt(height/2);
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);

  this.div = document.createElement ('div');
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'myDiv';
  if (noClass)
    this.div.style.backgroundColor='#ddd';

  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';

  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';

  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }

  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }

  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;

  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);

  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }

  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }

  this.play = function (chanNum, position){
    self.player.jsPlay (chanNum, position);
  }

  this.stop = function (chanNum){
    self.player.jsStop (chanNum);
  }

  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
    return self.player.jsGetStatus (chanNum);
  }

  this.debugFunc = function (msg){  // overload to use
  }

  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
}

pbStartup ();

var AudioAlert = {
  alert : true,
  init : function(){
    var t = AudioAlert;
	//t.whisperalert();
	t.creatediv();
  },

  creatediv : function(){
  var diva = document.getElementsByTagName('div');
	for (var i = 0; i < diva.length - 1; i++)
		if (diva[i].className == 'mod_comm_forum')
			e = diva[i];
	alertDiv = document.createElement("span");
	alertDiv.setAttribute("id", "alertDiv");
	e.appendChild(alertDiv);
  },

  sound : function(tf){
   var t = AudioAlert;

	var divs = document.getElementById('alertDiv');

	if(tf){
	divs.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
	t.alert = true;
	} else {
		divs.innerHTML = "<b style='color: rgb(165, 102, 49); font-size: 9px;'>Audio Alert Played</b>";
	t.alert = false;
	}

	if(t.alert)
	setTimeout(function(){t.sound(false)},10000);
  },

  scanalliancechat : function(){

  },

  whisperalert : function(){
  var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length - 1; i++) {
		if (divs[i].className == 'comm_tabs seltab2') {
		bS = document.getElementsByTagName('b')
			for (var j = 0; j < bS.length - 1; j++)
				if (bS[j].innerHTML == ' whispers to you:')
					AudioAlert.sound(true);
		}
	}
  },

}

GM_setValue("lastMsgTime", "0000");//hold the previous msg alert time.

function check_html(){
    var divCollection = document.getElementsByTagName('div');
    var div_collection_adjusted = divCollection.length - 1;
    for (var i = 0; i < div_collection_adjusted; i++) {
        if ((divCollection[i].getAttribute("class") == "tx" && divCollection[i].innerHTML == "****")) {
            var new_msg_index = i;
            i = divCollection.length - 1;

            var tx_div_collection = divCollection[new_msg_index].parentNode.parentNode.getElementsByTagName('span');
            //var tx_div_collection_adjusted = tx_div_collection.length -1;

            for (var j = 0; j < tx_div_collection.length; j++) {
                if (tx_div_collection[j].getAttribute("class") == "time") {
                    //alert("got here");
                    if (tx_div_collection[j].innerHTML != GM_getValue("lastMsgTime")) {
                        GM_setValue("lastMsgTime", tx_div_collection[j].innerHTML);
                        //alert("got here");
                        iframe = document.createElement("iframe");
                        iframe.setAttribute("src", "http://corpr8.co.uk/newalert.html");
                        iframe.setAttribute("width", "100");
                        iframe.setAttribute("height", "20");
                        //void(document.body.appendChild(iframe));
                        //alert("got here");
                        void (divCollection[new_msg_index].parentNode.appendChild(iframe));
                        divCollection[new_msg_index].className = 'edited';
                    }
                }

            }
        }
    }
}

function scan_allianceChat(){
    try {
	   if (Options.WhisperOn==false){
}
else
        //this should isolate the stuff in alliance chat. seltab2 = alliance.
        var foundMsg = false;

        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length - 1; i++) {
            if (divs[i].className == 'comm_tabs seltab2') {
                //Ok we have now detected that chat is set to alliance.

                bS = document.getElementsByTagName('b')
                for (var j = 0; j < bS.length - 1; j++) {
                    if (bS[j].innerHTML == ' whispers to you:') {
                        //ok we have now found a whisper to you.
                        if (foundMsg == false) {
                            foundMsg = true;

                            //now find the message time.
                            //var msgSpan = bS[j].parentNode.getElementsByTagName('span')[0].innerHTML;
                            //if (GM_getValue("lastMsgTime") != msgSpan) {
							//	alert('got here');
                            //  GM_setValue("lastMsgTime", msgSpan);
							//	alert('have set message value');
                                bS[j].innerHTML = ' whispered to you:';
                                alertDiv = document.createElement("div");
                                alertDiv.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
                                alertDiv.setAttribute("class", "alertDiv");

                                void (bS[j].appendChild(alertDiv));

                                window.setTimeout(function(){
                                    var divs = document.getElementsByTagName('div');
                                    for (var i = 0; i < divs.length - 1; i++) {
                                        if (divs[i].className == 'alertDiv') {
                                            divs[i].innerHTML = "Audio Alert Played";
                                        }
                                    }
                                }, 10000);


                            //}
                        }
                    }
                }
            }
        }
    }

    catch (err) {
        alert(err);
    }
}

window.setInterval(function(){
    scan_allianceChat();
    //check_html()
}, 5000);
/****************************  Sound Tab   ******************************/
					Tabs.trainingcalc = {
  tabOrder : 20,                    // order to place tab in top bar
   tabLabel : 'Training Calculator',
  myDiv : null,
  timer : null,
  forumlink :  'http://greenman.webhop.org/html/traintime.html',  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.trainingcalc;
    t.myDiv = div;
    div.innerHTML = '<CENTER><iframe src="'+ t.forumlink +'" width="100%" height="550" name="board_in_a_box" <p>Ihr Browser kann leider keine eingebetteten Frames anzeigen: Sie k&ouml;nnen die eingebettete Seite &uuml;ber den folgenden Verweis aufrufen: <a href="'+ t.forumlink +'">Knights of Phoenix Forum</a></p> </iframe> <BR></center>';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.trainingcalc;
    mainPop.div.style.width = 750 + 'px';
  },

  show : function (){         // called whenever this tab is shown
    var t = Tabs.trainingcalc;
    mainPop.div.style.width = 1050 + 'px';
  },
}
/********************************* HUD Tab *************************************/

Tabs.Hud = {
  tabOrder : 3,
  tabLabel : 'HUD',
  cont:null,
  state : null,

  init : function (div){
    var t = Tabs.Hud;
    t.cont=div;

    t.getAllianceReports();

    t.cont.innerHTML = '\
        <DIV class=ptstat>Search alliance reports for incoming attacks.</div>\
        <DIV class=ptentry style="height:30px"><table>\
        <tr><td class=xtab> Pages:\
        <span id=idSpanNumPages>1</span>\
        <select id="idHudSelect">\
        <option value=1> -- Select -- </option>\
        <option value=1> 1 </option>\
        <option value=5> 5 </option>\
        <option value=10> 10 </option>\
        <option value=20> 20 </option>\
        <option value=30> 30 </option>\
        <option value=40> 40 </option>\
        <option value=50> 50 </option>\
        <option value=60> 60 </option>\
        <option value=70> 70 </option>\
        <option value=80> 80 </option>\
        <option value=90> 90 </option>\
        <option value=100> 100 </option>\
        <option value=99999> All </option>\
        </select></td>\
        <TD class=xtab><INPUT id=idHudSearch type=submit value="Start Search" />\
        <span id=idSpanHudErrorMsg></span></td></tr>\
        </table></div>\
        <DIV id="hudResultsDiv" style="height:470px; max-height:470px;"></div>';
        document.getElementById('idHudSearch').addEventListener ('click', t.handleHudSearch, false);
        document.getElementById('idHudSelect').addEventListener ('click', t.handleHudSelect, false);

    return this.cont;
  },

  DisplayReports : function (){
    var t = Tabs.Hud;
    var data = t.data;
    var results=document.getElementById("hudResultsDiv");
    if(!t.data.length) {
       results.innerHTML = '<center><b>Search completed. Nothing to report.</b></center>';
       return;
    }
    var m = '<center><table><thead><th>Page#</th><th>Date</th><th>Attacker</th><th>From</th><th>Alliance</th><th>Deed</th><th>Target</th><th>At</th></thead>';
    m += '<tbody>';
    for ( var i=0; i<t.data.length;i++) {
       var rpt = data[i];
       if (rpt.side0Name=='undefined') 
          continue;
       m += '<tr><td>'+rpt.page+'</td>\
            <td>'+unsafeWindow.formatDateByUnixTime(rpt.reportUnixTime)+'</td>\
            <td>'+rpt.side1Name+'</td>\
            <td>'+rpt.side1XCoord+','+rpt.side1YCoord+'</td>\
            <td>'+rpt.side1AllianceName+'</td>\
            <td>'+rpt.marchName+'</td>\
            <td>'+rpt.side0Name+'</td>\
            <td>'+rpt.side0XCoord+','+rpt.side0YCoord+'</td>\
            </tr>';
    }
    m += '</tbody></table></center>';
    results.innerHTML = m;
  },

  handleHudSelect : function(rslt, page) {
    var t = Tabs.Hud;
    t.maxPages=document.getElementById("idHudSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    document.getElementById("idSpanNumPages").innerHTML = t.maxPages+'';
  },
  handleHudSearchCB : function(rslt, page) {
    var t = Tabs.Hud;
    if (rslt) {
       if (!rslt.ok) {
          document.getElementById("idSpanHudErrorMsg").innerHTML = rslt.errorMsg;
          return;
       }
       t.totalPages=rslt.totalPages;
       if (rslt.arReports && page) {
         var ar = rslt.arReports;
         var rptkeys = unsafeWindow.Object.keys(ar);
         var myAllianceId = getMyAlliance()[0];
         for (var i = 0; i < rptkeys.length; i++) {
              var rpt = ar[rptkeys[i]];
              rpt.page = page;     
              var side0Name = rslt.arPlayerNames['p'+rpt.side0PlayerId];
              rpt.side0Name = side0Name;
              rpt.side1Name = rslt.arPlayerNames['p'+rpt.side1PlayerId];
              if (rpt.side0AllianceId > 0)
                rpt.side0AllianceName = rslt.arAllianceNames['a'+rpt.side0AllianceId];
              else
                rpt.side0AllianceName = 'unaligned';
              if (rpt.side1AllianceId > 0)
                rpt.side1AllianceName = rslt.arAllianceNames['a'+rpt.side1AllianceId];
              else
                rpt.side1AllianceName = 'unaligned';

              if (rpt.side0CityId > 0)
                rpt.side0CityName = rslt.arCityNames['c'+rpt.side0CityId];
              else
                rpt.side0CityName = 'none';
              if (rpt.side1CityId > 0)
                rpt.side1CityName = rslt.arCityNames['c'+rpt.side1CityId];
              else
                rpt.side1CityName = 'none';
              if (rpt.marchType == 1)
                  rpt.marchName = 'Transport';
              else if (rpt.marchType == 3)
                  rpt.marchName = 'Scouted';
              else if (rpt.marchType == 2)
                  rpt.marchName = 'Reinf';
              else if (rpt.marchType == 4)
                  rpt.marchName = 'Attacked';
              else rpt.marchName = 'unknown';
              if (myAllianceId != rpt.side1AllianceId)
                 t.data.push(rpt);
         }
       }
       if (parseInt(page)+1 <= t.maxPages) {
          var results=document.getElementById("hudResultsDiv");
          results.innerHTML = '<center><b>...Searching '+(parseInt(page)+1)+'...</b></center>';
          t.getAllianceReports(parseInt(page)+1);
       }
       else if (page) 
           t.DisplayReports();
    }
  },

  maxPages:1,
  data:[],
  totalPages:0,

  handleHudSearch : function() {
    var t = Tabs.Hud;
    var results=document.getElementById("hudResultsDiv");
    //logit("handleHudSearch");
    t.maxPages=document.getElementById("idHudSelect").value;
    if ( t.maxPages==99999)
       t.maxPages=t.totalPages;
    results.innerHTML = '<center><b>...Searching '+t.maxPages+' pages...</b></center>';
    t.data=[];
    t.getAllianceReports(1);
  },

  getAllianceReports : function (pageNum){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    if (pageNum)
      params.pageNo = pageNum;
    params.group = "a";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
          Tabs.Hud.handleHudSearchCB (rslt, pageNum);     
      },
      onFailure: function (rslt) {
          Tabs.Hud.handleHudSearchCB (rslt, pageNum);     
      },
    }, false);
  },

  show : function (){
  },

  hide : function (){
  },
};

ptStartup ();

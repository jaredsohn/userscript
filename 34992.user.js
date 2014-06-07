// ==UserScript==
// @name           تعديل سكربت Travian QP Targets وعزل خاصية التحالفات ومواثيق الاعتداء
// @description    منصور العتيبي & Dream1 {تعديل}
// @include        http://s*.travian*.*
// ==/UserScript==


// event listener starts things off once the page is done loading
//window.addEventListener('DOMContentLoaded', function () {
window.addEventListener("load", function () {

//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
var V = QPcurrentTimeSecs();	// shouldn't this be in MILIS ?????
var l = new Object();
var O = 0;
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================




//   ==========   DEBUG STATICS   ==========
// 0 - GM_log ; else NOTHING
var DEBUG_STATE_PRODUCTION = -1;
var DEBUG_STATE_GM_LOG = 0;

var DBG_HIGHEST = 1;
var DBG_HIGH = 2;
var DBG_NORMAL = 3;
var DBG_LOW = 4;
var DBG_LOWEST = 5;

var DEBUG_STATE = DEBUG_STATE_GM_LOG;
var DEBUG_VERBOSITY = DBG_HIGHEST;

GM_log("START: DEBUG_STATE " + DEBUG_STATE + " DEBUG_VERBOSITY " + DEBUG_VERBOSITY);
//   ==========   DEBUG STATICS   ==========


var DEF_CATATARGET_RANDOM = 99;
var DEF_CATATARGET_NONE = 0;

var DEF_ATTACKTYPE_REINFORCE = 2;
var DEF_ATTACKTYPE_ATTACK = 3;
var DEF_ATTACKTYPE_RAID = 4;

var DEF_SCOUTTYPE_RESOURCES = 1;
var DEF_SCOUTTYPE_DEFENSES = 2;

var DEF_UNDERSCORE = "_";
// Keys that depend on villageId or some other info have the underscore, others use the one from the prefix
var DEF_PARTIALPERMANENTMKEY_INSTANTTROOPMOVE = DEF_UNDERSCORE + "instantTroopsMove";
var DEF_PARTIALPERMANENTMKEY_VILLAGEREPORTINFO = DEF_UNDERSCORE + "villageReportInfo";

var DEF_PARTKEY_UNDER_CONSTRUCTION = DEF_UNDERSCORE + "underConstruction";

// Keys depending on server only (for now user is also being used)
var DEF_PARTKEY_LANG_FIELDS = "lang_fields";
var DEF_PARTKEY_LANG_LEVEL = "lang_level";
var DEF_PARTKEY_LANG_DIPLOMACY = "lang_diplomacy";
var DEF_PKEY_S_LANG_MAP = "map";

// Keys depending on server only and user
var DEF_PARTKEY_DIPLOMACY = "diplomacy";
var DEF_PARTKEY_NPC_MERCHANT = "npcMerchant";
var DEF_PARTKEY_CAPITALVILLAGEID = "capitalVillageId";
var DEF_PARTKEY_REPORTSACTION = "reportsAction";
var DEF_PARTKEY_SMARTPREVIOUSPAGE = "smartPreviousPage";
var DEF_PARTIALPERMANENTMKEY_SINGLEVILLAGEINFO = "singleVillageInfo";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_ARRIVING = "arrivingMerchants";
var DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_OWNMERCHANTS = "ownMerchants";
var DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS = "lang_reinforcements";
var DEF_PARTIALPERMANENTMKEY_QP_CLIPBOARD = "QPClipboard";
var DEF_PARTKEY_PREFIX = getServerName() + DEF_UNDERSCORE + getUserId() + DEF_UNDERSCORE;

var DEF_PKEY_S_PREFIX = getServerName() + DEF_UNDERSCORE;



var DEF_COLOR_BUILDING_MAXLEVEL = "lightgreen";
var DEF_COLOR_BUILDING_UNUPGRADEABLE = "LightCoral";

var DEF_COLOR_RESOURCE_UNDERCONSTRUCTION = "blue";
var DEF_COLOR_RESOURCE_MAXLEVEL = "green";
var DEF_COLOR_RESOURCE_UNUPGRADEABLE = "red";

var DEF_COLOR_DIPLOMACY_ALLY = "lightgreen";
var DEF_COLOR_DIPLOMACY_NAP  = "lightyellow";
var DEF_COLOR_DIPLOMACY_WAR  = "lightred";
var DEF_COLOR_DIPLOMACY_OWN_ALLY = "lightblue";
//tr.style.backgroundColor = "palegreen";
//tr.style.backgroundColor = "lightpink";


var DEF_DIPLOMACY_INVALID = -1;
var DEF_DIPLOMACY_ALLY = 0;
var DEF_DIPLOMACY_NAP = 1;
var DEF_DIPLOMACY_WAR = 2;


var DEF_CHAR_INFINITY = unescape("%u221E");



var XP_FIRST = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XP_ORDER_SNAP  = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;


var IMGS_SCOUT = "data:image/gif,GIF89a%11%00%0F%00%C4%1F%00%04%04%04%02%02%02%0B%0B%0BRRR%0F%0F%0F%08%08%08%40%40%40DDD%FD%FD%FD%FC%FC%FC999%09%09%09%0D%0D%0D%3D%3D%3D333%0C%0C%0COOOKKK%F9%F9%F9%E7%E7%E7GGGHHH%14%14%14%FE%FE%FEXXX%FB%FB%FB%3A%3A%3A666222%FF%FF%FF%00%00%00%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%11%00%0F%00%00%05~%E0'%8Edin%117r%83j~%5Cv%ACR%F5~%0A%E3~%D1%B2%93%1C%8E%25%08%E3x%0E%3F%11%A7%E3!l%3E%1B%26%C0P%E2%18%3CXN%83%03%C0Rv%18NB%E0)L%3C%82%04%01%FBx%88%1C%1Ef%00p%5E%20%3C%16OW%A4(t%02kAQXd%00JX%1E%1B%2CE%10%1E%01%01%1E%22%03%08%05C%25%0EL%02%0CJ%7F%1E%0DU%17k%910%1AVI%1C%8A%8A7%AB%1F!%00%3B";
var IMGS_HERO = "data:image/gif,GIF89a%10%00%10%00%D5%3F%00%CF%AAp%F0%ABS%F7%C3p%E2W%0F%F5%DA%9A%DET%04%F4m%26%D3%B9%82%AFY%01%DC%B0Y%AEu%17%F9%8C*%FF%FD%D4%E3z%1A%FF%F0%B4%DC%87'%B4%843%FA%97G%FF%FE%FA%FF%FD%F4%FE%F7%C6%A9m*%F8%E8%C3%F7%846%C6Y%07%FDu%08%F7%956%E5%B7l%ECl%03%FC%D7%AA%E2%CF%A6%FF%FD%EC%DCa%01%FF%FF%DC%C6%9CJ%FD%F1%D4%CCL%01%FE%F3%E2%FF%E7%A7%FF%F6%DD%CF%99%3A%F6%AFc%C7%5E%17%D3S%09%E3%C3%83%E9%D0%89%FD%BEv%ED%899%E1%DB%B3%CB%97c%EF%DD%A3%E4%E9%C1%C8y%1F%EB%EB%D4%D0n%1D%DBx%11%CD%811%FC%EE%D7%FB%F6%F1%D1%819%D9%C0%9A%E5%BC%7B%FD%F6%EC%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%A6%C0%9Fp%F8%9BP%18%C4%24%B1%24%A3L%94II'A%F8%40%97%AEG%60t%15N%3A%11N%83%20!J%24%8C4%C5%B5%C8%80%02%8EcIR%83%B1%04%F8%40%1Bt%0Blz%07%1E%3F3%1B%0F%0B%1A%88%0D%1C%20%20%0A%10%00%16%3F%1F%0E%01%0D%0B%17%17%06%03%05%2B%15%90e%92%26)%99%9A%2B%24*%009%A0E%0C%26%11%06%9C%18%08%3B%5CI!%04%2F%05%24%B2%088'J%0C%026%18%0F(%0A%084%91D%13%0E%22%151%169%07%10%0A%3C%AB%92-%22%3C%3AB%3E%04%22%07VC%132%04%3ED'%04%1EO%3FA%00%3B";
var IMGS_GOLD = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%02%80IDAT8O%95%8F%FFKS%01%14%C5%CF%9Bf%9B%9B%CE%CDi%A8%11~%9DFSP%D0H%02SHiR%8A%F4E%0C%D1%BEI%C3_%A2%B0%D4%A8%88%FC%C1%AC%08%22%08%A6(I5rc%20j))R6%9BX%9A%B92%FCB%86Z%D3%D1%FC%92%7Bsm%EF%DD%DE%FE%04%0F%97%0B%17%3E%E7r%0ECD%D8%96%04%C3%B6%84m%D1%FE8D%1CO%AC%8F%C8%C3%0A%A7%97%88%ED1%CC%96j%B5%07s4%8D%FA%86%A1%B1%95%85_.%A2u%9F%878%FA%CBq%1C%7C%1C%B9%B6Vy%DAt%DA7%1E%DF%7Dp8%3B%24%2F%1B%B5%A5%CCYm%E8%DE%18%C4*B%D3%E3%A5%0Du%E5%B4E%2C%E7%E0y%1E%3C%910%A3%D6%C1L%8D4G%03%B3%3E%CE%F9CE%93*%FA%B6%7B%E1%033%F7.%E6%E9%1DI%5E%12*%8E%5D%F6%08%A4%60%D8t%3B%5DN%3AUPPS%C5%2C%7C%8A%A3%C5Xv%1C%F4%054%06%FA%0C%FA%0A%FA%8D%FE%E7L%AC%12%AB%AC%CFo%20%DA%EA%D0%1B2va~8%CAc%83%D7%02%1A%01%2Bl%1BC69Y%E44%0E%F7lx%BA%1Ak.%AF%BF%83%10%FD%90%3A%A2%F5%3Ah*%90%ED%85%9F%18%00g%0Df%DF%E3%9F%15d%15s%23%D8%98%8CJ%8F%87%DBC%5E%AF%17%2F%9A%8DGR%B0%DC%A7pu%82%FAU%BCq%07%F5%83%7F%A5%E2%FB%22i0%88%7D%0D%9A%C0%A2E%9C%9B%0E%87%D3%E5%F1xPv%F4%A4.%0F%D3-%20%23%7C%ED%E0_%82%EB%90%911%807%89%7C%5D%C2%8B%B0%A5%F6%08%5D%16Rd%09%8B%F6e%B7%DB%8D%01SKI~d%F7-%5C%C8%92%0D%3D%C2%92%00%3D%83%B7%0Dd%02%F5%C0%DC%844ExY%11%F6%84%04%14%17%96%AC9%960%F5%D1v%20%86%B1%B7%E1%CD%95%B8%D6%3CE%B3V2rZ%F4%F6%12%9A%CB%C5%95%B9%CAD1Zt%A1%835%A8H%96I%C3%B0%B6I%98%9B%FDyQw%A3j%1F%D6%9F%C8%E9~%E0%FCC%18%CE%E0%DE9%E9%D5%02%98%ABE3M%01%EB%9D%3B%8B%13Q_%CB%24%C4%07%AD%3AV%F0%FD%8F%BD%7B%D8%AC%16%85U%A7%89%2Cu%D2%A9%DB%C1%A4%97P%1BC%8D%0C%7F%13%3D%958%91%8A%FD%09%D2Q%9B4%23J%E8%3D%81%E9%99%C9%FAk%E7%D3%92T%99%C9%A2%E8H%A8%25!%85I%C8%D7%A0(Z%96%AAD%B0%5Cy%3C%3F%C2n%C2roPN%B6%D2%D0%D5%F5%1F%12%C3%AAx%A3%F9)%8F%00%00%00%00IEND%AEB%60%82';
var IMGS_FAKE = 'img/un/a/att2.gif';
var IMGS_CRANNY = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%005%00%00%009%08%03%00%00%00%A1%FA%939%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%03%00PLTE%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FFDb%B0P%00%00%04TIDATHK%9D%96%3D%92%C28%10F%95%99%CCw%EBN%A4%C4%C7p%26%05%94%02%8EA('%3A%05G%20%99%9A%CB%EC%EB%96%871%0Clm%AD%8A%81%B1%A5%D7%BF%9Fd%87%F9%FF%8C%F0%19%AA1%7D%9A%FCL%D5%B8%C4%F6%01%FBHuY%96%18%3E%60%9F%A8%1A%23T%AC%EF%9D%7D%A2%F0%C4%88Z%D3%3Bw%EF%A9V%07%B5H%3CK%EE5%BF%F8%7CC%A5(%CB%D9%02%C4%97%2C%97%F3%99%AF%E5%D9%E3_J%E5%12Y%1B%A2%C4(%97%CB%F9rY%F8%7Bn%C2%1F%AA%C43%83%A5Z%AB%E2%0E_F%FE%3B%95%A2%2F%BAD)%F3%DC%25%18u%BE%2C%2F%C5%7C%F5%95%80%CC%D5h%B1%5Dy%8C%2F*y%A5%B2%055%B2%A1ne%A1(%17n%7D%ACaM%923%D6%BDzq%117%2FA%F5%1C%D3k%B3%7F%7Cu%15YDjK%82%24D%2C%BE%9C%24%B0%3E%FF%ED%B3Q%3D%F79%99%7D%FA%83%B7%25%25%11n%B7u%15%A0%9EK%AD%7D~j%B4Q%84SL%0B%16%9B%D4%DE%A9%82QyU%0B2Z%EF%A2%9C%8F%B9Ai%A4%B2%81%A21%08R%C9%A2%92b%D3U-%1FZ%B1%5C%22k%0E%C9%05%22%8A%14%8CT%A8%9D%98%CDE%E7%8A%11%D2%C4%92%F9%B5%82%02%1E%D2%0B%95%C5%AE%05%D83%FA%A3%3F.%25%AE%05%09jZv%AD%04%8Fw%8C%D0m%B5%F7%D5%9C%B9%05d%E8%B2%B2%2F%F1i%EB5%C9%1F(%04%EEM%B5~%DAZ%D3%0F%EB%DD3%B6%9Cb%E6%A9%D7%81%B4%08%DF%B7%83%7B2%11%92%93%FF%9A_%9F%8Cf%E0%20F%D2%A6n%CC)%B5%1Fb%B7%10%CD%94%F9E%22%C1(%0B6%FE%26%16%10%03%D5J9Y%E9%C7%06%A6xcp'7%FB6%DEj%FB%A8%06%1AH1S%E0%B1j%C1%BC%04%BC%3B%8C%189v%FC%C2%2C%1C%A9%FD%FF%1Al%C3%03%F5%B9h%86%E0%AC%B1u5s%11%A2%96%A7.%3F%0C%A4%98%14%C3%A1%CF%3D%D4%9E%C2P%BD%B7G%B3%A2%B3C%BF%8E%17H%B5%CD%89%F0U%E6%3AThCC%AFR%90%F8%9B%08%89%A5%D9%04%8E%E6%2C5_q%85%DB%CA%16%9A3%07%DCq%3F%1F%F6%B2u%8E(%D9%20%B5K%AA%D75%AD%8C%EB%0D%FD%9B%12%0E%25%9C%7F%A9lm%F6%12%AE%D75%04%BD%AD%2B%9FU5%08%9F%E7%13%E7%40q%F8%B9%3C%A4%AE%B7%EB%F5z%5B%AF%DA%1AB%A70C*O%FD%DAs%A4)%DEL%9EZm%BD%D9X%F7%FC%91%BD7%EC%B7%F4%0F_%FDG%0F%F4k%AEW%A3%DCvO%AA%A6%B8e%F9m%F2!%2F%B53%26%AA%EF%DFF%11n7%EF%B1N%F7%D3%D8%A0o%2B%DF%0AZ%DC%1BK%1D%C1%A0%B2n%F7%EF%EF%A2%05%B9%7C%EE%F2%3E%D3%3D%B1%82%B4%B6%D37%03%F2~%D8%CA%87%08%8F%22%E9%EEK%B5l%E6j%8C%FFBQ%F9%ABle%BA%3F%A8%E9%BDz%1F%CEZ%D1%D5(%B29Yl%D34%15%02%D5%E4%95r9%3F%AB%D7%AEr%D9%0A%7D6j%82%3A%05%1F%F7%89%1C%7F%B0'%AA%156Q%25%99%C9%7C%DDH%0BW2()'%C6%9E%DC%91%AAL%14%D5%13%94%3A%B5m%DC%18P%60%8E8%F7%AD%F9K5L%9B%B5%8D1%A8%95%BC6E%BE%06aa%9B%B8%7C%CE%CB%02%03%DAXH%F2%DE%2F)%A5%F3%ACh%0D%12S%F8%C5%A87%FB%F1%FC%1A%90s%2C%F2%BC%F6%23%E0%0B%B4L%93c%18%B4%8A%0C%AA%CDn%CC%82%3BMJ%89%C5t%B8%B6%AF%AFQ%E2Z%8AS%CC%DF%AD%22%3B%85t%ECfa%96'QM%EEk%ED_%3F%8A%DD)%0A%B2%DD%A9%88S%25%05%3D%DD%AD%80%3CSs%AD5%0F%AA%3D%A8%B9%7Bb%23%EF%3C%A8%CA3%95%1En%CA%AFAP%BE%2B%DB%D7%CC%B3u%C4%E8%11%8E%A1%C5%A9%D6x%BF%CA%14!%25%C2%1B%BE%8C%AA%A4%B5S%7D%9B%2C%85A%E9%B1%CB%5E%06%10%5E%85%DC%D7%F5%20sk%CCFV%24B%1E%07%8A8U%02_%19%C8%8F%00w%E6%E3%AB%FB%CEd%EF%C0h%1D%94%BD%1A0%3A%AF%1BZx%C8x1p%96%8D%B2%3Fkv-%82E_%B8%FB%B2%13%CC%13%CA%C9%8EP%C4%C7%A1h%C7)%EB%1B%C6%C6%F6gz%B8~h%C3%A8%D6zK%2C%E2U%23%A1%81Z~J%B1%C7%F9%F8%F9%07%82z'%8F%00g3%F3%00%00%00%00IEND%AEB%60%82";
var IMGS_CLOCK = "img/un/a/clock.gif";


/** wood, clay, iron, crop */
var g_res_now = new Array(4);
var g_res_prod = new Array(4);
var g_res_max  = new Array(4);


/** retrieveResourcesInfo */
function retrieveResourcesInfo() {
	for(var i=0; i<4; i++) {
		var resourceNode = document.getElementById("l" + (4-i));
		var resourceNowMaxParts = resourceNode.innerHTML.split("/");
		g_res_now[i] = resourceNowMaxParts[0];
		g_res_max[i] = resourceNowMaxParts[1];
		g_res_prod[i] = resourceNode.title;
	}
}



function main() {												dbg("[ - MAIN - ]");
	createAllCSSs();

	if (isThisPageKarte2MapPage()) {							dbg("[-][isThisPageKarte2MapPage]");

		if (isThisPageKarte2EmptyMapPage()) {					dbg("[--][isThisPageKarte2EmptyMapPage]");
			transformPageKarte2_createFullPage();
		}
		return;		// no resource info, etc...

	} else if (isThisPageTravianTeamMessagePage()) {			dbg("[-][isTravianTeamMessagePage]");

		retrieveTravianTeamMessage();
		return;		// no resource info, etc..., and nothing else matters
	}


	retrieveResourcesInfo();


	// All single village and village list creation is inside here
	if (!isVillageListPresent()) {								dbg("[-][!isVillageListPresent]");
		if (isThisPageProfile()) {								dbg("[--][isThisPageProfile]");
			if (isThisPageMyProfile()) {						dbg("[---][isThisPageMyProfile]");
				findAndSaveSingleVillageInfo();
			}
		}
		if (isThisPageDorf3()) {								dbg("[--][isPageDorf3]");
			findAndSaveSingleVillageInfo();
		}
		transformPageAllPages_addVillagesList();
	}


	// Delete reports action
	if (isToDeleteReportsOfGivenType()) {						dbg("[-][isToDeleteReportsOfGivenType]");

		if (isThisPageReportListToDeletePage) {					dbg("[--][isThisPageReportListToDeletePage]");
			transformPageReportList_addSelectAllCheckbox();
			actionPageReportsTradeList_deleteAllReportsOfGivenType();
			return;
		} else {												dbg("[--][!isThisPageReportListToDeletePage]");
			gmReset_ReportsAction();
		}
	}


	if (CONFIG_FEATURE_VILLAGE_TARGETS) {
		// QP Targets - created on all pages except...
		if (!	(
					isThisPageSendTroopsConfirmation() ||
					isThisPageRallyPoint() ||
					isThisPageAnyBuildingPage() ||
					isThisPageWWStatistics()
				)
			) {
				dbg("[-]NOT: SendTroopsConfirmation, RallyPoint, AnyBuildingPage, WWStatistics");
				transformGeneric_findTargetsToCreateTargetLinks();
		}
	}


	// PAGES
	if (isThisPageAnyIGMPage()) {								dbg("[-][isThisPageAnyIGMPage]");

		if (isThisPageIGM()) {									dbg("[-][isThisPageIGM]");

			transformPageIGM_createLinks();

		} else if (isThisPageIGMList()) {						dbg("[-][isThisPageIGMList]");

			transformPageIGMsList_addSelectAllCheckbox();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}

	} else if (isThisPageAnyReportPage()) {						dbg("[-][isThisPageAnyReportPage]");

		if (isThisPageReportReinf()) {							dbg("[--][isThisPageReportReinf]");

			retrieveReportReinf_AppendToQPClipboard();

		} else if (isThisPageReportAttackScout()) {				dbg("[--][isPageReportAttackScout]");

			transformPageScoutReport_createQuickFarmInputs();

		} else if (isThisPageAnyReportList()) {					dbg("[--][isPageAnyReportList]");

			transformPageReportList_addSelectAllCheckbox();
			transformPageReportList_addDeleteByReportTypeButtons();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}
		/*if (isPageReportAttack(document.location.href)) {		dbg("[-][isPageReportAttack]");
			getInfoPageAttackReport_getDateInfo();
		}*/

	} else if (isThisPageAnyAlliancePage()) {					dbg("[-][isThisPageAnyAlliancePage]");


		if (isThisPageAnyMyAlliancePage()) {					dbg("[--][isThisPageAnyMyAlliancePage]");

			if (isThisPageMyAllianceOverviewPage()) {			dbg("[---][isThisPageMyAllianceOverviewPage]");
				transformAndRetrievePageMyAlliance_DiplomacyLang();
				retrievePageMyAlliance_Diplomacy();
				transformGenericPage_highlightMyself();

			} else if (isThisPageAllianceAttacks()) {			dbg("[---][isThisPageAllianceAttacks]");
				transformPageAllianceAttacks_highlightDiplomacy();

			} else if (isThisPageAllianceForumMsgs()) {			dbg("[---][isPageAllianceForumMsgs]");
				transformPageAllianceForumMsgs_createLinks();
			}
		}

	} else if (isThisPageAnySendTroopsPage()) {					dbg("[-][isThisPageAnySendTroopsPage]");

		if (isThisPageSendTroops()) {							dbg("[--][isThisPageSendTroops]");

			savePermanentMyTribe();

			if (isToMoveTroopsToThisVillage()) {				dbg("[---][isToMoveTroopsToThisVillage]");
				var ret = actionPageSendTroops_universalTroopsMove();
				if (ret) { return; }
			}

			transformGeneric_addAutoCompleteFromPlus();

		} else if (isThisPageSendTroopsConfirmation()) {		dbg("[--]isThisPageSendTroopsConfirmation");

			if (isToMoveTroopsToVillage(village)) {				dbg("[---][isToMoveTroopsToVillage]");

				actionPageSendTroopsConfirmation_universalTroopsMove(village);
				return;

			} else {											dbg("[---][!isToMoveTroopsToVillage]");

				// no action, then transform page
				transformPageSendTroopsConfirm_addTimeOffArrivalSync();
			}
		}

	} else if (isThisPageAnyBuildingPage()) {					dbg("[-][isThisPageAnyBuildingPage]");

	//	transformPageGeneric_addBuildTime();

		if (isThisPageRallyPoint()) {							dbg("[--][isPageRallyPoint]");
			getInfoRallyPoint_ReinforcementsLang();
			getInfoRallyPoint_CreateIncomingAttacksReport();
			transformPageRallyPoint_addOwnTownTotalTroopsTable();
			transformPageRallyPoint_addLinksForTroopGroups();
			//transformPageRallyPoint_addCoordsForOwnVillageReinfsAway();

		} else if (isThisPageAnyMarketPage()) {					dbg("[--][isThisPageAnyMarketPage]");

			if (isThisPageMarketSend()) {						dbg("[---][isThisPageMarketSend]");
				lang_get_market_sendResources_MerchantGroupTitles();
				transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion();
				//transformPageMarketplaceSendResources_addMerchantsUsed();
				//transformPageMarketplaceSendResources_addExtraQuantities();
				transformPageMarketplaceSendResources_addCumulativeArrivals();
				//transformGeneric_addAutoCompleteFromPlus();

			} else if (isThisPageMarketSendConfirmation(true)) {dbg("[---][isThisPageMarketSendConfirmation]");
				transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton();

			} else if (isThisPageMarketNpc()) {					dbg("[---][isThisPageMarketNpc]");
				actionPageMarketNpcMerchant_fillQuantities();
			}

		} else if (isThisPageHeroMansionPage()) {				dbg("[--][isThisPageHeroMansionPage]");
			transformPageHeroMansion_addHeroLevelInfo();

		} else if (isThisPageTreasuryPage()) {					dbg("[--][isThisPageTreasuryPage]");
			transformPageTreasury_addCoordsForConstructionPlanHolderVillages();

		} else if (isThisPageAnyResidencePalacePage()) {		dbg("[--][isThisPageAnyResidencePalacePage]");

			if (isThisPageResidencePalaceCulturePointsPage()) {	dbg("[---][isThisPageResidencePalaceCulturePointsPage]");
				transformPageResidenceOrPalaceCulturePoints_addCPsForVillages();
			}
		} else if (isThisPageField()) {							dbg("[--][isThisPageField]");
			// ???????????
			retrieveAndReturnPageField_upgradeLink();
		}


	} else if (isThisPageDorf2()) {								dbg("[-][isThisPageDorf2]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf2_Info();
		transformPageDorf2_addBuildingLevels();

	} else if (isThisPageDorf1()) {								dbg("[-][isThisPageDorf1]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf1_FieldsNamesLang();
		retrievePageDorf1_Info();
		transformPageDorf1_addColorsToResourceFieldsLevels();

	} else if (isThisPageAnyKartePage()) {						dbg("[-][isThisPageAnyKartePage]");

		if (isThisPageVillage()) {								dbg("[--][isThisPageVillage]");

			if (isToMoveTroopsToThisVillage()) {				dbg("[---][isToMoveTroopsToThisVillage]");
				actionPageGeneric_followFirstSendTroopsLink();
				return;
			}

		} else if (isThisPageMapPage()) {						dbg("[--][isThisPageMapPage]");

			if (!isPlusAccount()) {								dbg("[---][ not isPlusAccount]");
				// only in case this is not a plus account, do we need to add village color coding
				transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves();
				transformPageMap_addPlusMapLink();
			}
		}

	} else if (isThisPageAnyStatisticsPage()) {					dbg("[-][isThisPageAnyStatisticsPage]");

		if (isThisPageWWStatistics()) {							dbg("[--][isThisPageWWStatistics]");

			transformPageWWStatistics_addCoordsForWWVillages();
		}

	} else if (isThisPageProfile()) {							dbg("[-][isThisPageProfile]");

		if (isThisPageMyProfile()) {							dbg("[--][isThisPageMyProfile]");

			retrieveMyProfile_Capital();
		}
	}




	transformGenericPage_fixTitle();
//	transformGeneric_addQPConfigurationMenu();
	if (CONFIG_FEATURE_RESOURCES_INFO) {
		transformGeneric_addOverflowDepleteTimes();
	}

	addMenuCommand_scriptUpdate();

	// Start the timers
	QPTimersCollect();
	QPTimersUpdate();
}


var DEF_KEYCODE_ARROW_LEFT = 37;
var DEF_KEYCODE_ARROW_UP = 38;
var DEF_KEYCODE_ARROW_RIGHT = 39;
var DEF_KEYCODE_ARROW_DOWN = 40;

/** dummy - just to have a dummy function that does nothing when that is needed */
function dummy() { }


/**
* transformPageKarte2_createFullPage
*/
function transformPageKarte2_createFullPage() {
/**
ToDo
head
	script
		src	letter
		meta	language	pt / en
body
	1st div
		is extra... don't know where it comes from

X and Y axes are being well drawn but wrongly put on HTML
onmouseover doing nothing.... maybe as result of previous problem
 *  *
 * */
	var head = document.getElementsByTagName('head')[0];
	var htitle = createElemAppendAndSetInner('title', head, 'Travian');
	var hlink = createElementAppend('link', head);
	hlink.href = "unx.css";
	hlink.type = "text/css";
	hlink.rel = "stylesheet";
	var hscript = createElementAppend('script', head);
	hscript.type = "text/javascript";
	hscript.src = "unx.js?s";
	var hmeta = createElementAppend('meta', head);
// get from server name
	hmeta.content = "xx";
	hmeta.name = "content-language";
	var hmeta = createElementAppend('meta', head);
	hmeta.content = "no";
	hmeta.httpEquiv = "imagetoolbar";
	var hmeta = createElementAppend('meta', head);
	hmeta.content = "text/html; charset=UTF-8";
	hmeta.httpEquiv = "content-type";

//	<meta name="content-language" content="pt">
//	<meta http-equiv="imagetoolbar" content="no">
//	<meta http-equiv="content-type" content="text/html; charset=UTF-8">


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 0 - body");

	// langUrlSubstring, x, y
	var body = document.getElementsByTagName('body')[0];
	//<body onload="start()" style="background: rgb(240, 246, 233) none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" bgcolor="#f0f6e9">
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 0 - body 1");
	body.setAttribute("bgcolor", "#f0f6e9");
	body.setAttribute("style", "background: rgb(240, 246, 233) none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;");
	body.setAttribute("onload", "start()");
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 0 - body 2");
	var middleZ = getParamFromUrl(document.location.href, "z");
	var middleX = coordZToX(middleZ);
	var middleY = coordZToY(middleZ);
	var mapSavedLang = gmLoad_Map();
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage]  mapSavedLang " + mapSavedLang);
	var langUrlSubstring = mapSavedLang[0];
	var langMap = mapSavedLang[1];
	var scriptText = mapSavedLang[2];
	eval(scriptText);
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] "
				+ "\n langUrlSubstring " + langUrlSubstring
				+ "\n langMap " + langMap
				+ "\n scriptText " + scriptText
				);
			var aaa = gmLoad_Map();
		debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] loading ");
		debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] loading aaa " + aaa);
		debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] loading aaa[0] " + aaa[0]);
		debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] loading aaa[1] " + aaa[1]);
		debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] loading aaa[2] " + aaa[2]);

	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 1");
	var div1 = createElemAppendAndSetInner('div', body,
			'<table align="center" cellpadding="3" cellspacing="0">'
			+ '\n<form method="post" action="karte2.php"></form><tbody><tr>'
			+ '<td><b>x</b></td><td><input name="xp" value="' + middleX + '" size="2" maxlength="4"></td>'
			+ '<td><b>y</b></td><td><input name="yp" value="' + middleY + '" size="2" maxlength="4"></td>'
			+ '<td></td><td>'
			+ '<input value="ok" name="s1" src="img/' + langUrlSubstring + '/b/ok1.gif" '
			+ 'onmousedown="btm1('
			+ "'s1','','img/" + langUrlSubstring + "/b/ok2.gif',1)"
			+ '" onmouseover="'
			+ "btm1('s1','','img/" + langUrlSubstring + "/b/ok3.gif',1)"
			+ '" onmouseup="btm0()" onmouseout="btm0()" border="0" height="20" type="image" width="50">'
			+ '</td></tr></tbody></table>');
	div1.className = "map_insert_xy_xxl";


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 2");
	var div2 = createElemAppendAndSetInner('div', body,
			'<table cellpadding="0" cellspacing="0" width="100%">'
			+ '\n<tbody><tr><td width="30%"><h1>' + langMap + '</h1></td>'
			+ '<td align="right" width="33%"><h1><nobr>(<span id="x">' + middleX + '</span></nobr></h1></td>'
			+ '<td align="center" width="4%"><h1>|</h1></td>'
			+ '<td align="left" width="33%"><h1><nobr><span id="y">' + middleY + '</span>)</nobr></h1></td>'
			+ '</tr></tbody></table>');
	div2.className = "map_show_xy_xxl";


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 3");
// updated on 080914
//	var script3 = createElemAppendAndSetInner('script', body,'<!--' + scriptText + '-->');
	var script3 = createElemAppendAndSetInner('script', body, scriptText);
//	script3.language = "JavaScript";
	script3.type="text/javascript";
	script3.setAttribute("language", "JavaScript");


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 4");
	var div4 = createElemAppendAndSetInner('div', body,
// updated on 080914 - gone back on 080927
			'<table class="f8 map_infobox_grey" cellpadding="2" cellspacing="1" width="100%"><tbody>'
//			'<table class="f8 map_infobox_grey" cellpadding="2" cellspacing="1" ><tbody>'
// updated on 080914
//			+ '\n<tr><td class="c b" colspan="2" align="center">' + text_details + ':</td></tr>'
			+ '\n<tr><td class="c b" colspan="2" align="center">' + text_details + '</td></tr>'
			+ '<tr><td class="c s7" width="45%">' + text_spieler + '</td><td class="c s7">-</td></tr>'
			+ '<tr><td class="c s7">' + text_einwohner + '</td><td class="c s7">-</td></tr>'
			+ '<tr><td class="c s7">' + text_allianz + '</td><td class="c s7">-</td></tr>'
			+ '</tbody></table>');
	div4.id = "tb";
	div4.className = "map_infobox_xxl";


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 5");
	var div5 = createElementAppend('div', body);
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 5-1");
	div5.setAttribute("style", "position: absolute; z-index: 50; left: 10px; top: 0px;");
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 5-2");
	div5.align = "center";
	// add the 13x13 tile images - 169

	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 6");
	var map6 = createElementAppend('map', body);
	map6.name = "map2";
	var DEF_KARTE2_ARROWS_DISTANCE_MOVE = 7;
	createElemKarte2AreaArrow(map6, coordZMoveY(middleZ,  DEF_KARTE2_ARROWS_DISTANCE_MOVE), "762,115,30", mapSavedLang[3]);	// north
	createElemKarte2AreaArrow(map6, coordZMoveX(middleZ,  DEF_KARTE2_ARROWS_DISTANCE_MOVE), "770,430,30", mapSavedLang[4]);	// east
	createElemKarte2AreaArrow(map6, coordZMoveY(middleZ, -DEF_KARTE2_ARROWS_DISTANCE_MOVE), "210,430,30", mapSavedLang[5]);	// south
	createElemKarte2AreaArrow(map6, coordZMoveX(middleZ, -DEF_KARTE2_ARROWS_DISTANCE_MOVE), "200,115,30", mapSavedLang[6]);	// west


	function createElemKarte2Image(areaParentNode, imgParentNode, hasPlayer, villageName, src, indexX, indexY, coordsParam, onClickEvents, onMouseOverEvents, onMouseOutEvents) {
//		debug(DBG_HIGHEST, "[createElemKarte2Image] indexX " + indexX + " indexY " + indexY);

		var img = createElementAppend('img', imgParentNode);
		img.src = src;
		indexX = parseInt(indexX);
		indexY = parseInt(indexY);
		//=37 * (11 + (-$B3+ C$2)) + 25+$B3
		var posX = 37 * (11 + (indexX - indexY)) + 25 + indexY;
		var posY = 20 * (indexY + indexX -1);
// updated on 080914
//		img.setAttribute("style", "position: absolute; z-index: 50; left: " + posX + "px; top: " + posY + "px;");
		img.setAttribute("style", "position: absolute; left: " + posX + "px; top: " + posY + "px;");

//		debug(DBG_HIGHEST, "[createElemKarte2Image] "
//				+ "\n onClickEvents " + onClickEvents
//				+ "\n onMouseOverEvents " + onMouseOverEvents
//				+ "\n onMouseOutEvents " + onMouseOutEvents
//				);


		var area = createElementAppend('area', areaParentNode);

		// IF THERE IS A PLAYER VILLAGE HERE
		if (hasPlayer) {
			if (villageName != "null") {
				debug(DBG_HIGHEST, "[createElemKarte2Image] villageName " + villageName);
				if (villageName.indexOf("<span class") < 0) {	// ocupied valleys have a "span class t, i" tags
					area.setAttribute("alt", villageName);
				}
			}
			area.setAttribute("shape", "poly");
			// figure out the coords...
			area.setAttribute("coords", coordsParam);
			area.setAttribute("onmouseout", onMouseOutEvents);
			area.setAttribute("onmouseover", onMouseOverEvents);
		} else {
			area.setAttribute("onmouseout", onMouseOutEvents);
			area.setAttribute("onmouseover", onMouseOverEvents);
			// figure out the coords...
			area.setAttribute("shape", "poly");
			area.setAttribute("coords", coordsParam);
		}

		area.setAttribute("onclick", onClickEvents);
		area.setAttribute("href", "#");

	}

	var baseKarteUrl = document.location.protocol + "//" + document.location.hostname + "/karte.php?z=";
	ajaxDocument(baseKarteUrl + coordZMoveXY(middleZ, -3, -3), "", "", ajaxMapForKarte2, [0, 0, div5, map6]);
	ajaxDocument(baseKarteUrl + coordZMoveXY(middleZ, -3,  3), "", "", ajaxMapForKarte2, [0, 6, div5, map6]);
	ajaxDocument(baseKarteUrl + coordZMoveXY(middleZ,  3,  3), "", "", ajaxMapForKarte2, [6, 6, div5, map6]);
	ajaxDocument(baseKarteUrl + coordZMoveXY(middleZ,  3, -3), "", "", ajaxMapForKarte2, [6, 0, div5, map6]);


 /*
<area id="a_0_0" shape="poly" coords="49, 210, 86, 230, 49, 250, 12, 230" href="karte.php?d=356076&amp;c=fd">
 *
mouseover(dname, name, ew, ally, x, y)
 *
<area href="#"
	onclick='opener.location.href="karte.php?d=214492&amp;c=f9", self.close()'
	coords="442,33,478,13,515,33,478,53" shape="poly"
	onmouseover="x_y('224','133')"
	onmouseout="x_y('230','127')">
<area href="#"
	onclick='opener.location.href="karte.php?d=214493&amp;c=cd", self.close()'
	onmouseover="map('Aldeia do xaki','xaki','29','','225','133')"
	onmouseout="map('','','','','230','127')"
	coords="479,53,515,33,552,53,515,73"
	shape="poly"
	alt="Aldeia do xaki">
*/
			 function sumIntArraysNTimes(startArray, addArray, times) {
				var res = new Array();
			 	for(var i=0; i<startArray.length; i++) {
			 		res[i] = startArray[i] + (times * addArray[i]);
			 	}
			 	return res;
			 }

	var mapCounter = 0;
	var tiles = [[],[],[],[],[],[],[],[],[],[],[],[],[]]; // 13 positions


	/**
	* ajaxMapForKarte2
	*/
	function ajaxMapForKarte2(doc, params) {
		mapCounter++;
		debug(DBG_HIGHEST, "[ajaxMapForKarte2] mapCounter " + mapCounter);
//		debug(DBG_HIGHEST, "[ajaxMapForKarte2] doc " + doc);
		debug(DBG_HIGHEST, "[ajaxMapForKarte2] params " + params);
		transformPageMap_addDiplomacyColors(doc);
		debug(DBG_HIGHEST, "[ajaxMapForKarte2] after diplomacy colors");
		var areas = xpEvalDoc(doc, doc, '//div[@id="lmid2"]/div[@id="map_content"]/map[@id="karte"]/area[starts-with(@id, "a_")]');
		var imgs = xpEvalDoc(doc, doc, '//div[@id="lmid2"]/div[@id="map_content"]/div[@class="mdiv"]/img');
		var mapPageInfo = xpEvalDoc(doc, doc, '//div[@id="lmid2"]/div[@id="map_content"]/script[@type="text/javascript"]');
		eval("var m_c = new Array();");
		eval('' + mapPageInfo.snapshotItem(0).textContent);
//		debug(DBG_HIGHEST, "[ajaxMapForKarte2] imgs.snapshotLength " + imgs.snapshotLength);
		for(var i=0; i<imgs.snapshotLength; i++) {
			var currImg = imgs.snapshotItem(i);
			var currArea = areas.snapshotItem(i);
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] currImg.id " + currImg.id);
			var imgCoords = currImg.id.split("_");
			var playerInfo = m_c.ad[imgCoords[1]][imgCoords[2]];

			var tilesX = -((middleX-6) - playerInfo.x);
			var tilesY = (middleY+6) - playerInfo.y;
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] playerInfo.x " + playerInfo.x + " playerInfo.y " + playerInfo.y);
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] middleX " + middleX + " middleY " + middleY);
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] tilesX " + tilesX + " tilesY " + tilesY);
//			tiles[tilesX][tilesY] = [playerInfo, currImg.src];
			tiles[tilesY][tilesX] = [playerInfo, currImg.src];

/*
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] playerInfo " + playerInfo);
			var hasPlayer = (playerInfo.name != null);
			var onMouseOverEv = null;
			var onMouseOutEv = null;
			if (hasPlayer) {
				onMouseOverEv = "x_y('"+playerInfo.x+"','"+playerInfo.y+"')";
				onMouseOutEv = "x_y('"+middleX+"','"+middleY+"')";
			} else {
				onMouseOverEv = "map('"+playerInfo.dname+"','"+playerInfo.name+"','"+playerInfo.ew+"','"+playerInfo.ally+"','"+playerInfo.x+"','"+playerInfo.y+"')";
				onMouseOutEv = "map('','','','','"+middleX+"','"+middleY+"')";
			}
//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] playerInfo.name " + playerInfo.name + " hasPlayer " + hasPlayer + "x_y('"+playerInfo.x+"','"+playerInfo.y+"')");

//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] imgCoords " + imgCoords);
			createElemKarte2Image(params[3], params[2], hasPlayer, playerInfo.dname, currImg.src,
									parseInt(params[0]) + parseInt(imgCoords[1]),
									12 - (parseInt(params[1]) + parseInt(imgCoords[2])),
									'opener.location.href="'+playerInfo.href+'", self.close()',
									onMouseOverEv,
									onMouseOutEv
									);
*/
		}

		// fill in the map!!
		if (mapCounter == 4) {
//			tiles.printMultiArrays();

//442,33,478,13,515,33,478,53
//			var coordsStart = [405,  13, 441,  -7, 478,  -7, 441,  33];
			var coordsStart = [442,  33, 478,  13, 515,  33, 478,  53];
			var coordsDifX  = [+37, +20, +37, +20, +37, +20, +37, +20];
//			var coordsDifX  = [-37, +20, -37, +20, -37, +20, -37, +20];
//			var coordsDifY  = [+36, +20, +36, +20, +36, +20, +36, +20];
			var coordsDifY  = [-36, +20, -36, +20, -36, +20, -36, +20];

			debug(DBG_HIGHEST, "[ajaxMapForKarte2] coordsStart " + coordsStart + " coordsDifX " + coordsDifX + " coordsDifY " + " coordsDifY ");
			debug(DBG_HIGHEST, "[ajaxMapForKarte2] sumIntArraysNTimes 1 " + sumIntArraysNTimes(coordsStart, coordsDifX, 1));


			for(var i=0; i<tiles.length; i++) {
				for(var j=0; j<tiles[i].length; j++) {

					var playerInfo = tiles[i][j][0];
					var currImgSrc = tiles[i][j][1];
					var hasPlayer = (playerInfo.name != null);
					var onMouseOverEv = null;
					var onMouseOutEv = null;
					if (hasPlayer) {
						playerInfo.dname = playerInfo.dname.replace('class="t"', 'class=t');
						onMouseOverEv = "map('"+playerInfo.dname+"','"+playerInfo.name+"','"+playerInfo.ew+"','"+playerInfo.ally+"','"+playerInfo.x+"','"+playerInfo.y+"')";
						onMouseOutEv = "map('','','','','"+middleX+"','"+middleY+"')";
					} else {
						onMouseOverEv = "x_y('"+playerInfo.x+"','"+playerInfo.y+"')";
						onMouseOutEv = "x_y('"+middleX+"','"+middleY+"')";
					}

//					debug(DBG_HIGHEST, "[ajaxMapForKarte2][for][for] playerInfo.name " + playerInfo.name + " hasPlayer " + hasPlayer + "x_y('"+playerInfo.x+"','"+playerInfo.y+"')");

		//			debug(DBG_HIGHEST, "[ajaxMapForKarte2] imgCoords " + imgCoords);

					createElemKarte2Image(params[3], params[2], hasPlayer, playerInfo.dname, currImgSrc,
//									parseInt(params[0]) + parseInt(imgCoords[1]),
//									12 - (parseInt(params[1]) + parseInt(imgCoords[2])),
									j,
									i,
//									sumIntArraysNTimes(sumIntArraysNTimes(coordsStart, coordsDifX, i), coordsDifY, j),
									sumIntArraysNTimes(sumIntArraysNTimes(coordsStart, coordsDifY, i), coordsDifX, j),
									'opener.location.href="'+playerInfo.href+'", self.close()',
									onMouseOverEv,
									onMouseOutEv
									);

				}
			}




			/*
X	+37, +20, +37, +20, +37, +20, +37, +20
Y	-36, +20, -36, +20, -36, +20, -36, +20

start	405,  13, 441,  -7, 478,  -7, 441,  33
			*/
		} else {
			debug(DBG_HIGHEST, "[ajaxMapForKarte2] [end..] mapCounter " + mapCounter);
		}
	}

	// add the 4 direction arrows
	function createElemKarte2AreaArrow(parentNode, srcCoordZ, coords, title) {
		var area = createElementAppend('area', parentNode);
		area.title = title;
		area.shape = "circle";
		area.coords = coords;
		area.href = "karte2.php?z=" + srcCoordZ;
	}


	// add the 13x13 tile areas - 169


	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] 7");
	var img7 = createElementAppend('img', body);
/*
	img7.style = "position: absolute; width: 975px; height: 550px; z-index: 400; left: 0px; top: 0px;";
	img7.usemap = "map2";
	img7.src = "img/un/m/bg_xxl.gif";
	img7.border = "0";
*/


	img7.setAttribute("src", "img/un/m/bg_xxl.gif");
	img7.setAttribute("usemap", "#map2");
	img7.setAttribute("style", "position: absolute; width: 975px; height: 550px; z-index: 400; left: 0px; top: 0px;");
	img7.setAttribute("border", "0");


/*
	img7.usemap = "#map2";
	img7.src = "img/un/m/bg_xxl.gif";
	img7.border = "0";
*/
	debug(DBG_HIGHEST, "[transformPageKarte2_createFullPage] end");
}



function map(wc,xc,yc,zc,x,y) {
	document.getElementById('x').firstChild.nodeValue = x;
	document.getElementById('y').firstChild.nodeValue = y;
	pb = document.getElementById("tb");
	if(pb != null) {
		if(zc == '') {
			zc = ' - ';
		}
		var $c = "<table cellspacing = '1' cellpadding = '2' class = 'tbg f8'><tr><td class = 'rbg f8' colspan = '2'></a>" + wc + "</td></tr><tr><td width = '45%' class = 's7 f8'>" + text_spieler + "</td><td class = 's7 f8'>" + xc + "</td></tr><tr><td class = 's7 f8'>" + text_einwohner + "</td><td class = 's7 f8' id = 'ew'>" + yc + "</td></tr><tr><td class = 's7 f8'>" + text_allianz + "</td><td class = 's7 f8'>" + zc + "</td></tr></table>";
		var _c = "<table class = 'f8 map_infobox_grey' cellspacing = '1' cellpadding = '2'><tr><td class = 'c b' colspan = '2' align = 'center'></a>" + text_details + "</td></tr><tr><td width = '45%' class = 'c s7'>" + text_spieler + "</td><td class = 'c s7'> - </td></tr><tr><td class = 'c s7'>" + text_einwohner + "</td><td class = 'c s7'> - </td></tr><tr><td class = 'c s7'>" + text_allianz + "</td><td class = 'c s7'> - </td></tr></table>";
		if(xc != '') {
			pb.innerHTML = $c;
		} else {
			pb.innerHTML = _c;
		}
	}
}

function x_y(x,y) {
	document.getElementById('x').firstChild.nodeValue = x;
	document.getElementById('y').firstChild.nodeValue = y;
}



/**
* transformGenericPage_highlightMyself
*/
function transformGenericPage_highlightMyself() {
	var rowWithMyUser = xpEvalFirst('//tr[count(td)>2]/td/a[@href="spieler.php?uid='+getUserId()+'"]/../..');
	if (rowWithMyUser) {
		rowWithMyUser.cells[0].className += " li";
		for(var i=0; i<rowWithMyUser.cells.length; i++) {
			rowWithMyUser.cells[i].className += " ou";
		}
		rowWithMyUser.cells[rowWithMyUser.cells.length - 1].className += " re";
	}
}


/**
* transformPageMap_addPlusMapLink
*/
function transformPageMap_addPlusMapLink() {
	var plusLang = xpEvalFirst('//div[@id="lleft"]/table[@id="navi_table"]/tbody/tr/td[@class="menu"]/a[@href="plus.php?id=3"]/b').textContent;
	var mapLang = xpEvalFirst('//div[@id="ltop1"]/div[@id="ltop5"]/a[@href="karte.php"]/img[@id="n3"]').title;
	var plusMapLang = plusLang + " " + mapLang;

	var mapDiv = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]');
	var middleAreaNode = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]/map[@id="karte"]/area[@id="a_3_3"]');
	var middleCoordZ = getParamFromUrl(middleAreaNode.href, "d");
	var mapPlusA = document.createElement("a");
	mapPlusA.href = "karte2.php?z=" + middleCoordZ;
	mapPlusA.target = "_blank";

	function retrieveMapLang() {
		var areasMapNode = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]/map[@id="karte"]');

		debug(DBG_HIGHEST, "[retrieveMapLang] mapLang " + mapLang);
		var okButton = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]/div[@class="map_insert_xy"]/form/table/tbody/tr/td/input[@value="ok"]');
		debug(DBG_HIGHEST, "[retrieveMapLang] okButton " + okButton);
		var langUrlSubstring = /img\/(\w+)\/b\/ok1.gif/.exec(okButton.src)[1];
		debug(DBG_HIGHEST, "[retrieveMapLang] langUrlSubstring " + langUrlSubstring);
		var scriptText = xpEvalFirst('//div[@id="lmid2"]/script').textContent;
		debug(DBG_HIGHEST, "[retrieveMapLang] scriptText " + scriptText);

		debug(DBG_HIGHEST, "[retrieveMapLang] areasMapNode.innerHTML " + areasMapNode.innerHTML);

		var bbb = xpEvalContextFirst(areasMapNode, 'area[@id="ma_n1"]');
		debug(DBG_HIGHEST, "[retrieveMapLang] bbb.id " + bbb.id);
		debug(DBG_HIGHEST, "[retrieveMapLang] bbb.title " + bbb.title);

		gmSave_Map(langUrlSubstring, mapLang, scriptText,
							xpEvalContextFirst(areasMapNode, 'area[@id="ma_n1"]').title,
							xpEvalContextFirst(areasMapNode, 'area[@id="ma_n2"]').title,
							xpEvalContextFirst(areasMapNode, 'area[@id="ma_n3"]').title,
							xpEvalContextFirst(areasMapNode, 'area[@id="ma_n4"]').title
							);
		debug(DBG_HIGHEST, "[retrieveMapLang] saved ");

		var aaa = gmLoad_Map();
		debug(DBG_HIGHEST, "[retrieveMapLang] loading ");
		debug(DBG_HIGHEST, "[retrieveMapLang] loading aaa " + aaa);
		debug(DBG_HIGHEST, "[retrieveMapLang] loading aaa[0] " + aaa[0]);
		debug(DBG_HIGHEST, "[retrieveMapLang] loading aaa[1] " + aaa[1]);
		debug(DBG_HIGHEST, "[retrieveMapLang] loading aaa[2] " + aaa[2]);
	}
	retrieveMapLang();
	mapPlusA.onclick = "retrieveMapLang(); return pop('karte2.php?z="+middleCoordZ+"');";

	mapPlusA.innerHTML = '<img class="map_link_to_xxlmap" src="img/un/m/max.gif" alt="'+plusMapLang+'" title="'+plusMapLang+'">';
	mapDiv.appendChild(mapPlusA);
}

/** save, reset, load, createKey, exists - Map - <server>_map */
/* map: langUrlSubstring, langMap, scriptText */
function gmSave_Map(langUrlSubstring, langMap, scriptText, langNorth, langEast, langSouth, langWest) { gmSave_Escape(gmKey_Map(), ""+langUrlSubstring+","+langMap+","+scriptText+","+langNorth+","+langEast+","+langSouth+","+langWest); }
function gmReset_Map() { gmSave_Map(""); }
function gmLoad_Map() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Map()).split(","); }
function gmKey_Map() { return DEF_PKEY_S_PREFIX + DEF_PKEY_S_LANG_MAP; }
function gmExists_Map() { return (gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Map()) != ""); }



/**
* transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves
*/
function transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves() {
	if (!gmExists_Diplomacy()) {
		return;
	}
	debug(DBG_HIGHEST, "[transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves] 1");
	transformPageMap_addDiplomacyColors(document);
	debug(DBG_HIGHEST, "[transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves] 2");

	// change arrow image clicking movement - no longer does ajax, but normal link requests
	var arrows = xpEval('//div[@id="lmid2"]/div[@id="map_content"]/map[@id="karte"]/area[contains(@id, "ma_n")]');
	for(var i=0; i<arrows.snapshotLength; i++) {
		arrows.snapshotItem(i).setAttribute("onclick", '');
	}

	// change arrow key presing movement - no longer does ajax, but normal link requests
	document.addEventListener("keydown", function (e) {

		/** actionGoToNewMapTile */
		function actionGoToNewMapTile(areaId) {
			debug(DBG_NORMAL, "[actionGoToNewMapTile] areaId " + areaId);
			var areaNode = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]/map[@id="karte"]/area[@id="'+areaId+'"]');
			var newPage = document.location.protocol + "//" + document.location.hostname + "/karte.php?z=" + getParamFromUrl(areaNode.href, "d")
			debug(DBG_NORMAL, "[actionGoToNewMapTile] keydown newPage " + newPage);
			document.location.href = newPage;
		}

		debug(DBG_NORMAL, "[transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves] keydown e.keyCode " + e.keyCode);
		switch (e.keyCode) {
			case DEF_KEYCODE_ARROW_LEFT:	actionGoToNewMapTile("a_2_3");	break;
			case DEF_KEYCODE_ARROW_UP:		actionGoToNewMapTile("a_3_4");	break;
			case DEF_KEYCODE_ARROW_RIGHT:	actionGoToNewMapTile("a_4_3");	break;
			case DEF_KEYCODE_ARROW_DOWN:	actionGoToNewMapTile("a_3_2");	break;
			default: debug(DBG_HIGH, "[transformPageMap_addDiplomacyColorsIncludingAjaxMapMoves][keydown] not an arrow ");
		}
	}
	, true);
}



/**
* transformPageMap_diplomacyColors
* map information
* m_c.az	- n1, n1p7, n2, n2p7, n3, n3p7, n4, n4p7 - z coord of 2 or 7 (xxp7)
* m_c.ad	- {x, y, src, ew, name, dname, ally, href} - array of 7(size) entries with array of 7(size) entries for each map spot
* m_c.ad	- x, y	- coords
* m_c.ad	- src	- image source
* m_c.ad	- ew	- village population
* m_c.ad	- name	- player name
* m_c.ad	- dname	- village name
* m_c.ad	- ally	- alliance name
* m_c.ad	- href	- link to the village spot
* m_c.z		- x, y	- coords of the middle of the map
* m_c.size	- map size (normal map is 7)
* -----------------------------------------------------------------------------
* village colors in the map - d<x><y>.gif - x: village size - y: village type (see below)
*	0	-	yellow	-	mine
*	1	-	green	-	confederacy	(checked)
*	2	-	red		-	war
*	3	-	blue	-	alliance	(checked)
*	4	-	red		-	others		(checked)
*	5	-	cyan	-	NAP
*	(colors 2 and 4 are exactly the same in the original graphic pack - seen at 1000%+ zoom)
*/
function transformPageMap_addDiplomacyColors(doc) {
	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] ");
	if (!gmExists_Diplomacy()) {
		return;
	}

	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] 1");
//	var mapPageInfo = xpEvalFirst('//div[@id="lmid2"]/div[@id="map_content"]/script[@type="text/javascript"]');
	var mapPageInfo = xpEvalDocFirst(doc, '//div[@id="lmid2"]/div[@id="map_content"]/script[@type="text/javascript"]');
	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] 2");

	eval("var m_c = new Array();");
	eval('' + mapPageInfo.textContent);

	var diplomacy = gmLoad_Diplomacy().multiSplit([":", ";", ","]);
	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] 3");

//	var mapTileNoDiplomacyImg = xpEval('//div[@id="map_content"]/div[@class="mdiv"]/img[contains(@src, "img/un/m/d")][contains(@src, "4.gif")]');
	var mapTileNoDiplomacyImg = xpEvalDoc(doc, doc, '//div[@id="map_content"]/div[@class="mdiv"]/img[contains(@src, "img/un/m/d")][contains(@src, "4.gif")]');
	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] 4");
	for(var i=0;i<mapTileNoDiplomacyImg.snapshotLength;i++){
		var currentTile = mapTileNoDiplomacyImg.snapshotItem(i);
		debug(DBG_NORMAL, "[transformPageMap_diplomacyColors] currentTile.id " + currentTile.id);
		var arrayPositions = currentTile.id.split("_");
		var playerInfo = m_c.ad[arrayPositions[1]][arrayPositions[2]];
		debug(DBG_NORMAL, "[transformPageMap_diplomacyColors] playerInfo.dname " + playerInfo.dname+ " playerInfo.ally " + playerInfo.ally);
		if (playerInfo.ally) {
			// in case there is a player village and the player does have an alliance check diplomacy
			setCorrectColorForVillageInMap(currentTile, diplomacy, playerInfo.ally);
		}
	}
}

/**
* transformPageWWStatistics_highlightDiplomacy
*/
function transformPageWWStatistics_highlightDiplomacy() {
	debug(DBG_HIGHEST, "[transformPageWWStatistics_highlightDiplomacy]  ");

	var diplomacy = gmLoad_Diplomacy().multiSplit([":", ";", ","]);

	var allianceColumn = xpEval('//div[@id="lmid2"]/table/tbody/tr/td/a[contains(@href, "allianz.php?aid=")]/..');
			// div #lmid2 > table .tbg > tbody > tr > td > a
	for(var i=0; i<allianceColumn.snapshotLength; i++) {
		var currAlliance = allianceColumn.snapshotItem(i).textContent;

		setColorForDiplomacy(allianceColumn.snapshotItem(i).parentNode, diplomacy, currAlliance);
	}
}


/**
* transformPageAllianceAttacks_highlightDiplomacy
*/
function transformPageAllianceAttacks_highlightDiplomacy() {
	debug(DBG_HIGHEST, "[transformPageAllianceAttacks_highlightDiplomacy]  ");
	var allianceTag = xpEvalFirst('//div[@id="lmid2"]/h1').textContent.split(" - ")[0];
//	var allianceTag = xpEvalFirst('//div[@id="lmid2"]/h1').textContent;

	debug(DBG_HIGHEST, "[transformPageAllianceAttacks_highlightDiplomacy] allianceTag " + allianceTag);
//	allianceTag = allianceTag.split(" - ")[0];
	var diplomacy = gmLoad_Diplomacy().multiSplit([":", ";", ","]);

	var allianceColumn = xpEval('//table/tbody/tr/td[@class="c f8"]');
	for(var i=0; i<allianceColumn.snapshotLength; i++) {
		var currAlliances = allianceColumn.snapshotItem(i).textContent;
		var arrCurrAlliances = currAlliances.split(" - ");

		// attack report or defense report
		var otherAlliance = (arrCurrAlliances[0] == allianceTag) ? arrCurrAlliances[1] : arrCurrAlliances[0];
//		setColorForDiplomacy(allianceColumn.snapshotItem(i), diplomacy, otherAlliance, allianceTag);
		var warning = setColorForDiplomacy(currAlliancesCell.parentNode, diplomacy, otherAlliance, allianceTag);
		debug(DBG_HIGHEST, "[transformPageAllianceAttacks_highlightDiplomacy] warning " + warning);
		if (warning) {
			currAlliancesCell.parentNode.cells[0].style.backgroundColor = "red";
		}

	}
}


/**
* setColorForDiplomacy
*/
function setColorForDiplomacy(node, diplomacy, otherAlliance, ownAlliance) {
	if (otherAlliance == ownAlliance) {
		node.style.backgroundColor = DEF_COLOR_DIPLOMACY_OWN_ALLY;
		return;
	}

	var diplomacyGroup = getDiplomacyGroupForAlliance(diplomacy, otherAlliance);
	debug(DBG_HIGHEST, "[setColorForDiplomacy] diplomacyGroup " + diplomacyGroup);
	if (diplomacyGroup > -1) {
		switch (diplomacyGroup) {
			case DEF_DIPLOMACY_ALLY: node.style.backgroundColor = DEF_COLOR_DIPLOMACY_ALLY; break;
			case DEF_DIPLOMACY_NAP:  node.style.backgroundColor = DEF_COLOR_DIPLOMACY_NAP;  break;
			case DEF_DIPLOMACY_WAR:  node.style.backgroundColor = DEF_COLOR_DIPLOMACY_WAR;  break;
			default: dbg("[setColorForDiplomacy] Invalid diplomacy group " + diplomacyGroup);  break;
		}
	}
}

/**
* setCorrectColorForVillageInMap
*/
function setCorrectColorForVillageInMap(imgNode, diplomacy, playerAlliance) {
	var diplomacyGroup = getDiplomacyGroupForAlliance(diplomacy, playerAlliance);
	debug(DBG_NORMAL, "[setCorrectColorForVillageInMap] diplomacyGroup " + diplomacyGroup);
	if (diplomacyGroup > -1) {
		switch (diplomacyGroup) {
			case DEF_DIPLOMACY_ALLY: imgNode.src = imgNode.src.replace(/4.gif$/, "1.gif"); break;
			case DEF_DIPLOMACY_NAP:  imgNode.src = imgNode.src.replace(/4.gif$/, "5.gif"); break;
			case DEF_DIPLOMACY_WAR:  imgNode.src = imgNode.src.replace(/4.gif$/, "2.gif"); break;
			default: dbg("[setCorrectColorForVillageInMap] Invalid diplomacy group " + diplomacyGroup); break;
		}
	}
}


/**
* getDiplomacyGroupForAlliance
*/
function getDiplomacyGroupForAlliance(diplomacy, allianceName) {
//	debug(DBG_HIGHEST, "[transformPageMap_diplomacyColors] allianceName " + allianceName + "\ndiplomacy " +diplomacy);
	if (allianceName) {
		if (allianceName.length > 0) {
			for(var i=0; i<diplomacy.length; i++) {
				for(var j=0; j<diplomacy[i].length; j++) {
					if (diplomacy[i][j][0] == allianceName) {
						return i;
					}
				}
			}
		}
	}
}




function retrievePageMyAlliance_Diplomacy() {
	var diplomacy = xpEval('//td[@class="slr3"]/div/*');
//	var diplomacy = xpEval('//td[@class="slr3"]/div/a[contains(@href, "allianz.php?aid=")]/..');
	debug(DBG_NORMAL, "[retrievePageMyAlliance_Diplomacy]  diplomacy.snapshotLength " + diplomacy.snapshotLength);

	var arrAlly = new Array();
	var arrNap = new Array();
	var arrWar = new Array();
	var diplomacyGroup = DEF_DIPLOMACY_INVALID;
	for(var i=0, len=diplomacy.snapshotLength; i<len; i++) {
		current = diplomacy.snapshotItem(i);

		debug(DBG_NORMAL, "[retrievePageMyAlliance_Diplomacy] current.nodeName " + current.nodeName);
		if (current.nodeName.toLowerCase() == "img") {
			diplomacyGroup = getBulletNumberFromSrc(current.src) - 2;
			debug(DBG_NORMAL, "[retrievePageMyAlliance_Diplomacy] NEW GROUP: diplomacyGroup  " + diplomacyGroup);
			switch (diplomacyGroup) {
				case DEF_DIPLOMACY_ALLY:			arrAlly = new Array();					break;
				case DEF_DIPLOMACY_NAP:				arrNap = new Array();					break;
				case DEF_DIPLOMACY_WAR:				arrWar = new Array();					break;
				default: dbg("[retrievePageMyAlliance_Diplomacy] Invalid Diplomacy Group");	break;
			}
		} else {
			var allianceInfo = getParamFromUrl(current.href, "aid") + ";" + current.textContent;
			debug(DBG_NORMAL, "[retrievePageMyAlliance_Diplomacy] allianceInfo  " + allianceInfo);
			switch (diplomacyGroup) {
				case DEF_DIPLOMACY_ALLY:			arrAlly.push(allianceInfo);				break;
				case DEF_DIPLOMACY_NAP:				arrNap.push(allianceInfo);				break;
				case DEF_DIPLOMACY_WAR:				arrWar.push(allianceInfo);				break;
				default: dbg("[retrievePageMyAlliance_Diplomacy] Invalid Diplomacy Group");	break;
			}
		}
	}
	gmSave_Diplomacy("" + arrAlly + ":" + arrNap + ":" + arrWar);
	debug(DBG_NORMAL, "[retrievePageMyAlliance_Diplomacy]\narrAlly " + arrAlly + "\narrNap  " + arrNap + "\narrWar  " + arrWar);
}


/** save, reset, load, createKey, exists - DiplomacyLang - <server>_diplomacy */
/* (confederacy:nap:war) - each of them: aid;aname, ... ,aid;aname */
function gmSave_Diplomacy(diplomacy) { gmSave_Escape(gmKey_Diplomacy(), diplomacy); }
function gmReset_Diplomacy() { gmSave_Diplomacy(""); }
function gmLoad_Diplomacy() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Diplomacy()); }
function gmKey_Diplomacy() { return DEF_PKEY_S_PREFIX + DEF_PARTKEY_DIPLOMACY; }
function gmExists_Diplomacy() { return (gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Diplomacy()) != ""); }


Array.prototype.printMultiArrays = function () {
	debug(DBG_LOWEST, "[printMultiArrays] this.length " + this.length);
	for(var i=0; i<this.length; i++) {
		debug(DBG_LOWEST, "[printMultiArrays] this["+i+"] " + this[i]);
		if (this[i] instanceof Array) {
			this[i].printMultiArrays();
		}
	}
}


/**
* multiSplit
* Creates arrays of arrays by spliting the string with the 1st item in the "splitStrings" array,
* and then recursively calling itself for each of the resulting array's items.
*
* @param {Array} splitStrings Array with the strings to split this string.
*/
String.prototype.multiSplit = function (splitStrings) {
//	debug(DBG_HIGHEST, "[multiSplit] splitStrings " + splitStrings);
	if (splitStrings == null) { return this; }
//	dbg("[multiSplit] splitStrings.length " + splitStrings.length);
	if (splitStrings.length == 0) { return this; }

	var arrResult = new Array();
	var s1 = splitStrings.shift();
	var arrThisLevelSplit = this.split(s1);
	for(var i=0; i<arrThisLevelSplit.length; i++) {
//		debug(DBG_HIGHEST, "[multiSplit] arrThisLevelSplit["+i+"] " + arrThisLevelSplit[i]);
		arrResult.push(arrThisLevelSplit[i].multiSplit(splitStrings));
//		arrResult.printMultiArrays();
	}

	splitStrings.unshift(s1);
	return arrResult;
}











function transformAndRetrievePageMyAlliance_DiplomacyLang() {
	var diplomacy = xpEval('//td[@class="slr3"]/div');
//	var diplomacy = xpEval('//td[@class="slr3"]/div/a[contains(@href, "allianz.php?aid=")]/..');
	debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang]  diplomacy.snapshotLength " + diplomacy.snapshotLength);
	var arrBullets = new Array();
	for(var i=0, j=1, previous=null, current=null, len=diplomacy.snapshotLength; i<len; i++, previous = current) {
		current = diplomacy.snapshotItem(i);
		debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] \n"
				+ "\n previous " + ((previous==null)?"null":previous.innerHTML)
				+ "\n current.previousSibling " + ((current.previousSibling==null)?"null":current.previousSibling.textContent)
				+ "\n current " + current.innerHTML
				);
		if (previous != current.previousSibling) {
			var diplomacyLang = current.previousSibling.textContent.trim();
			debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] diplomacyLang " + diplomacyLang);
			// new group of alliances - confederacy / NAP / war
			var diplomacyLoaded;
			if (gmExists_DiplomacyLang()) {
				debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] THEN ");
				diplomacyLoaded = gmLoad_DiplomacyLang();
			} else {
				diplomacyLoaded = ["", "", ""];
				debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] ELSE ");
			}


			var bullet = document.createElement("img");
			arrBullets.push(bullet);
			bullet.src = getBulletSrcForDiplomacyLang(diplomacyLoaded, diplomacyLang);
			debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] bullet.src " + bullet.src);
			bullet.name = diplomacyLang;
			bullet.addEventListener("click", function (ev) {
				debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] ev.target.src " + ev.target.src);
				var diplomacyNumberOld = getBulletNumberFromSrc(ev.target.src) - 2;
				ev.target.src = toggleDiplomacyBullet(ev.target.src);
				var diplomacyNumber = getBulletNumberFromSrc(ev.target.src) - 2;
				var diplomacyArray = gmLoad_DiplomacyLang();
				if (diplomacyNumberOld != 3) {
					diplomacyArray[diplomacyNumberOld] = "";
				}
				if (diplomacyNumber != 3) {
					diplomacyArray[diplomacyNumber] = ev.target.name;
					// for all others, if the same color set them to grey
					for(var j=0; j<arrBullets.length; j++) {
						if ((arrBullets[j] != ev.target) && (arrBullets[j].src == ev.target.src)) {
							arrBullets[j].src = createBulletSrc(5);
						}
					}
				}
				gmSave_DiplomacyLang(diplomacyArray);
				debug(DBG_NORMAL, "[transformAndRetrievePageMyAlliance_DiplomacyLang] [bullet] diplomacyArray " + diplomacyArray);
			}, true);

			var bulletDiv = document.createElement("div");
			bulletDiv.appendChild(bullet);
			current.parentNode.insertBefore(bulletDiv, current);
		}
	}
}

/** toggleDiplomacyBullet */
function toggleDiplomacyBullet(bulletSrc) {
	var bulletNumber = getBulletNumberFromSrc(bulletSrc);
	bulletNumber = (((bulletNumber - 1) %  4) + 2);
	return createBulletSrc(bulletNumber);
}

/** getBulletNumberFromSrc */
function getBulletNumberFromSrc(bulletSrc) { return parseInt(/img\/un\/a\/b(\d+)\.gif/.exec(bulletSrc)[1]); }

/** createBulletSrc */
function createBulletSrc(number) { return "img/un/a/b" + number + ".gif"; }


/** getBulletSrcForDiplomacy */
function getBulletSrcForDiplomacyLang(diplomacyArray, diplomacyMatch) {
	debug(DBG_NORMAL, "[getBulletSrcForDiplomacy] \n diplomacyArray " + diplomacyArray + " \n diplomacyMatch " + diplomacyMatch);
	for(var i=0; i<diplomacyArray.length; i++) {
		if (diplomacyMatch == diplomacyArray[i]) {
			return createBulletSrc(i+2);
		}
	}
	return createBulletSrc(5);
}


/** save, reset, load, createKey, exists - DiplomacyLang - <server>_lang_diplomacy  (confederacy,nap,war) */
function gmSave_DiplomacyLang(diplomacy) { gmSave_Escape(gmKey_DiplomacyLang(), diplomacy); }
function gmReset_DiplomacyLang() { gmSave_DiplomacyLang(["", "", ""]); }
function gmLoad_DiplomacyLang() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_DiplomacyLang()).split(","); }
function gmKey_DiplomacyLang() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_LANG_DIPLOMACY; }
function gmExists_DiplomacyLang() { return (gmLoad_Unescape_UndefinedIsEmptyString(gmKey_DiplomacyLang()) != ""); }




/** retrieveAndReturnPageField_upgradeLink */
function retrieveAndReturnPageField_upgradeLink() {
	var upgradeLink = xpathEvaluate('//div[@id="lmid2"]/div/a');
	if (upgradeLink.snapshotLength > 0) {
		return upgradeLink.snapshotItem(0).href;
	}
	return;
}



/**
* transformPageGeneric_addBuildTime
*/
function transformPageGeneric_addBuildTime() {
	var clocksCells = xpathEvaluate('//img[contains(@src, "img/un/a/clock.gif")]/../../td');
//	debug(DBG_HIGHEST, "[transformPageGeneric_addBuildTime] clocksCells.snapshotLength " + clocksCells.snapshotLength);

	for(var i=0, len=clocksCells.snapshotLength; i<len; i++) {
		var currentClockCell = clocksCells.snapshotItem(i);

		var resources = retrieveResourcesAndTimeFromCell(currentClockCell);
//		debug(DBG_HIGHEST, "[transformPageGeneric_addBuildTime] resources " + resources);

		var quantityInput = xpEvalContextFirst(currentClockCell, '../../../../../td/input');
		if (quantityInput) {

			function updateBuildTimeSpan(a, b, c) {
				c.addEventListener("keyup", function () {
//					debug(DBG_HIGHEST, "[transformPageGeneric_addBuildTime] update TTB ");
					createBuildTimeSpan(a, b, c);
//					debug(DBG_HIGHEST, "[transformPageGeneric_addBuildTime] update TTB end ");
				}, true);
			}
			updateBuildTimeSpan(resources, currentClockCell.parentNode.parentNode, quantityInput);

		}

		createBuildTimeSpan(resources, currentClockCell.parentNode.parentNode, quantityInput);
	}
}



/**
* createBuildTimeSpan
*/
function createBuildTimeSpan(resources, parentTable, quantityInput) {

	var qtty = 1;
	if (quantityInput) {
		qtty = quantityInput.value;
//		debug(DBG_HIGHEST, "[createBuildTimeSpan] IF 1  qtty " + qtty);
		var previousTtbRow = xpEvalContext(parentTable, 'tr[@id="QPttb"]');
//		debug(DBG_HIGHEST, "[createBuildTimeSpan] IF 1 previousTtbRow " + previousTtbRow);
		for(var i=0; i<previousTtbRow.snapshotLength; i++) {
//			debug(DBG_HIGHEST, "[createBuildTimeSpan] FOR i " + i);
			parentTable.removeChild(previousTtbRow.snapshotItem(i));
		}
	}
	debug(DBG_HIGHEST, "[createBuildTimeSpan] end of IFs  -  qtty " + qtty);
	var needsMoreResources = false
	var maxTimeToReady = 0;
	var warehouseNeeded = 0;
	var granaryNeeded = 0;
	var totalResourcesActual = parseInt(0);
	var totalResourcesNeeded = parseInt(0);
	var neededResources = new Array();
	for(var j=0; j<g_res_now.length; j++) {
		var neededResource = parseInt(resources[j]) * qtty;
		var diff = neededResource - g_res_now[j];
		neededResources[j] = (diff > 0) ? diff : 0;
		needsMoreResources = needsMoreResources || (diff > 0);
		var thisTimeToReady = (diff > 0) ? (diff/g_res_prod[j]) : 0;
		maxTimeToReady = (thisTimeToReady > maxTimeToReady) ? thisTimeToReady : maxTimeToReady;
		totalResourcesNeeded += neededResource;
		totalResourcesActual += parseInt(g_res_now[j]);

		if (j<3) {
			warehouseNeeded = warehouseNeeded > neededResource ? warehouseNeeded : neededResource;
		} else {
			granaryNeeded = granaryNeeded > neededResource ? granaryNeeded : neededResource;
		}

		debug(DBG_HIGHEST, "[createBuildTimeSpan] \n"
			+ " j " + j
			+ "\n needsMoreResources " + needsMoreResources
			+ "\n totalResourcesActual " + totalResourcesActual
			+ "\n totalResourcesNeeded " + totalResourcesNeeded
			+ "\n neededResources " + neededResources
			+ "\n thisTimeToReady " + thisTimeToReady
			+ "\n maxTimeToReady " + maxTimeToReady
			+ "\n diff " + diff
		);
	}


	// Enough resources already no more needed
	if (!needsMoreResources) { return; }


	// Warehouse and/or Granary needed
	if ((warehouseNeeded > g_res_max[0]) || (granaryNeeded > g_res_max[3])) {
		var tr = createElementAppend('tr', parentTable);
		tr.id = "QPttb";
		tr.style.whiteSpace = "nowrap";

		if (warehouseNeeded > g_res_max[0]) {	// Warehouse needs upgrading
			var td = createElemAppendAndSetInner('td', tr, '<img src="img/un/g/g10.gif" />');
		}
		if (granaryNeeded > g_res_max[3]) {		// Granary needs upgrading
			var td = createElemAppendAndSetInner('td', tr, '<img src="img/un/g/g11.gif" />');
		}

		// If warehouse or granary is needed then there is no point in showing how many resources are needed
		return;
	}



	var res = '<span class="c" style="white-space:nowrap;">'
			+ '<img class="res" src="img/un/r/1.gif" />' + neededResources[0] + ' | '
			+ '<img class="res" src="img/un/r/2.gif" />' + neededResources[1] + ' | '
			+ '<img class="res" src="img/un/r/3.gif" />' + neededResources[2] + ' | '
			+ '<img class="res" src="img/un/r/4.gif" />' + neededResources[3] + ' | '
			+ '<img class="res" src="img/un/a/clock.gif" />'
			+ '<span id="QPtimer">' + timeInSecondsToColonSeparatedTxt(maxTimeToReady*3600) + '</span>'
			+ ' '
			+ '</span> ';
	window.setTimeout(actionRefreshPage, maxTimeToReady*3600*1000);

	var tr = createElementAppend('tr', parentTable);
	tr.id = "QPttb";
	var td = createElemAppendAndSetInner('td', tr, res);
	td.colSpan = 0;



	var goldSpan = createElementAppend('span', td);
	goldSpan.className = "c";

	tr.style.whiteSpace = "nowrap";
	td.style.whiteSpace = "normal";
	goldSpan.style.whiteSpace = "nowrap";

	var totalResourceDiff = totalResourcesActual - totalResourcesNeeded;
		debug(DBG_NORMAL, "[createBuildTimeSpan] \n"
			+ "\n totalResourceDiff " + totalResourceDiff
		);
	if (totalResourceDiff > 0) {
		goldSpan.innerHTML = '<a href="build.php?gid=17&t=3"><img class="res" src="'+IMGS_GOLD+'" /></a>';
		goldSpan.addEventListener("click", function () {
			debug(DBG_NORMAL, "[createBuildTimeSpan] [GOLD] resources " + resources);
			gmSave_NpcMerchant(resources);
			debug(DBG_NORMAL, "[createBuildTimeSpan] [GOLD] resources " + resources);
		}, true);

	} else {
		var totalProduction = 0;
		for(var i=0; i<g_res_prod.length; i++) {
			totalProduction += parseInt(g_res_prod[i]);
		}
		var timeInSeconds = ((-totalResourceDiff)/totalProduction) * 3600;
		goldSpan.innerHTML = ''
				+ '<img class="gold" src="'+IMGS_GOLD+'" />' + (-totalResourceDiff) + '|'
				+ '<img class="res" src="img/un/a/clock.gif" />'
				+ '<span id="QPtimer">'
				+ timeInSecondsToColonSeparatedTxt(timeInSeconds)
				+ '</span>';

		window.setTimeout(function() {
			goldSpan.innerHTML = '<a href="build.php?gid=17&t=3"><img class="res" src="'+IMGS_GOLD+'" /></a>';
			goldSpan.addEventListener("click", function () {
				debug(DBG_NORMAL, "[createBuildTimeSpan] [GOLD]");
				gmSave_NpcMerchant(resources);
				debug(DBG_NORMAL, "[createBuildTimeSpan] [GOLD] resources " + resources);
			}, true);
		}, timeInSeconds*1000);
		debug(DBG_NORMAL, "[createBuildTimeSpan] \n"
			+ "\n timeInSeconds*1000 " + timeInSeconds*1000
		);
	}
}

function actionRefreshPage() {
	document.location.href = document.location.href;
}



//===========================================================================================================
//===========================================================================================================
//========================================  MISCELANEOUS  ===================================================
//===========================================================================================================
//===========================================================================================================







/**
* Adds a style to the page
*/
function addCSS(cssString) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
* Creates styles to be used throughout this script.
*/
function createAllCSSs() {
	cssString = '.QPpopup{' +
		'background-color:white;' +
//		'border:thin solid #000000;' +
//		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
//		'font-size:8pt;' +
//		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'position:absolute;' +
//		'visibility:hidden;' +
		'display:none' +
		'z-index:200;}';
	addCSS(cssString);
	addCSS('.QPnowrap{white-space:nowrap;}');
	cssString = '.QPsmall{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'}';
	addCSS(cssString);
	cssString = '.QPsmallTxt{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'}';
	cssString = '.QPcoords{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:lightgrey;' +
		'}';
	addCSS(cssString);
	cssString = '.QPcoords2{' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:grey;' +
		'}';
	addCSS(cssString);
	var cssString = '.QPbuildingLevel{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +
		'-moz-border-radius:2em;' +
		'border-radius:2em;' +
		'padding-top:3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'color:black;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '#QPD1BL{' +
		'position:absolute;' +
		'top:71px;' +
		'left:13px;' +
		'z-index:20;}';
	addCSS(cssString);
	var cssString = '#QPD2BL{' +
		'position:absolute;' +
		'top:60px;' +
		'left:25px;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPdorf1BuildingLevel{' +
		'opacity:0.25;' +
		'-moz-border-radius:4em;' +
		'border-radius:4em;' +
		'position:absolute;' +
		'width:22px;' +
		'height:20px;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPresources{' +
		'font-size:7pt;' +
		'color:#909090;' +
		'text-align:left;' +
		'position:absolute;' +
		'top:13px;' +
		'height:20px;' +
		'}';
	addCSS(cssString);


}





/**
* transformPageHeroMansion_addHeroLevelInfo
*/
function transformPageHeroMansion_addHeroLevelInfo() {

	// retrieve local information
	var heroTable = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]/../../../..').snapshotItem(0);
	var heroTableRows = heroTable.rows;

	var heroLevel = parseInt(/\d+/.exec(heroTableRows[0].cells[0].textContent));
	var heroLevelPercent = parseInt(/\d+/.exec(heroTableRows[heroTableRows.length - 1].cells[1].textContent));

	var thisLevelExp = (heroLevel + 1) * 100;
	var currLevelExp = ((thisLevelExp) / 2) * heroLevel;
	var nextLevelExp = currLevelExp + thisLevelExp;

	var expGainedInThisLevel = (heroLevel+1) * heroLevelPercent;
	var expToLevelUp = (heroLevel+1) * (100 - heroLevelPercent);

	var levelTxt = heroTableRows[0].cells[0].childNodes[1].textContent;
	levelTxt = levelTxt.substr(0, levelTxt.indexOf(1, " "));

	// create extra info on the page
	var separatorRow = createElemAppendAndSetInner('tr', heroTable, '<td colspan="0" />');

	var extendedHeroRow = createElementAppend('tr', heroTable);
	var extendedHeroCell = createElementAppend('td', extendedHeroRow);
	extendedHeroCell.colSpan = 0;
	var extendedHeroTable = createElementAppend('table', extendedHeroCell);
	extendedHeroTable.style.width = "100%";
	extendedHeroTable.className = "tbg";
	extendedHeroTable.border = 0;
	extendedHeroTable.cellSpacing = 1;

	var row1 = createElementAppend('tr', extendedHeroTable);
	var r1c1 = createElemAppendAndSetInner('td', row1, levelTxt + " " + heroLevel);
	var r1c2 = createElemAppendAndSetInner('td', row1, heroLevelPercent + "%");
	var r1c3 = createElemAppendAndSetInner('td', row1, (100 - heroLevelPercent) + "%");
	var r1c4 = createElemAppendAndSetInner('td', row1, levelTxt + " " + (heroLevel + 1));

	var row2 = createElementAppend('tr', extendedHeroTable);
	var r2c1 = createElementAppend('td', row2);		r2c1.width = "20%";
	var r2c2 = createElementAppend('td', row2);		r2c2.colSpan = 2;
	createHorizontalGraphicBar(r2c2, 8, heroLevelPercent, "green", "yellow");
	var r2c3 = createElementAppend('td', row2);		r2c3.width = "20%";

	var row3 = createElementAppend('tr', extendedHeroTable);
	var r3c1 = createElemAppendAndSetInner('td', row3, currLevelExp);
	var r3c2 = createElemAppendAndSetInner('td', row3, expGainedInThisLevel);
	var r3c3 = createElemAppendAndSetInner('td', row3, expToLevelUp);
	var r3c4 = createElemAppendAndSetInner('td', row3, nextLevelExp);

	r3c2.title = "" + currLevelExp + " + " + expGainedInThisLevel + " = " + (currLevelExp+expGainedInThisLevel);
}



/**
* createHorizontalGraphicBar
* @param {HTMLNode} parentNode Node that will be the parent of the table that has the bar.
* @param {int} tableHeight Height of the table in pixels.
* @param {int} percent Percentage that the bar must represent.
* @param {HTMLColor} barColor Background color of the bar.
* @param {HTMLColor} complementColor Background color of the rest of the bar.
*/
function createHorizontalGraphicBar(parentNode, tableHeight, percent, barColor, complementColor) {

	var table = document.createElement('table');
	var row = createElementAppend('tr', table);
	var cell1 = createElementAppend('td', row);
	var cell2 = createElementAppend('td', row);

	table.cellSpacing = 0;
	table.border = 0;

	table.style.height = tableHeight + "px";
	table.style.width = "100%";

	cell1.style.width = percent + "%";
	cell2.style.width = (100 - percent) + "%";

	cell1.style.backgroundColor = barColor;
	cell2.style.backgroundColor = complementColor;

	parentNode.appendChild(table);
}







/**
* retrieveTravianTeamMessage
* For now it is just a stub which prints the message in the error console.
*/
function retrieveTravianTeamMessage() {
	var msg  = xpEvalFirst('//div[@id="lmid2"]').textContent;
	debug(DBG_HIGHEST, "[retrieveTravianTeamMessage] msg " + msg);
}




/**
* isTruce
* On some special occasions the Admins put the server on "truce" mode.
* While in this mode, attacks do not make any damage - no casualties.
* Spy attacks can be made and spies can die.
*/
function isTruce() {
	var truce = xpathEvaluate('//div[@id="lleft"]/div/span');
	if (truce.snapshotLength > 0) {
		return (truce.snapshotItem(0).innerHTML.indexOf('\u2665') >= 0);
	}
	return false;
}


/**
* retrieveResidenceLoyalty
*/
function retrieveResidenceOrPalaceLoyalty() {
	var loyalty = parseInt(xpEvalFirst('//div[@id = "lmid2"]/b').innerHTML);
}




/**
* isPlusAccount
* Checks if this is a Plus account (at this moment).
*/
function isPlusAccount() {
	return (xpEvalFirst('//div[@id="lleft"]/a/img[@class="logo"][contains(@src, "/a/travian1.gif")]'));
}

/**
* transformGeneric_addAutoCompleteFromPlus
*/
function transformGeneric_addAutoCompleteFromPlus() {
	var destNameInputs = xpathEvaluate('//input[@name="dname"]');
	debug(DBG_NORMAL, "[transformGeneric_addAutoCompleteFromPlus] destNameInputs.snapshotLength " + destNameInputs.snapshotLength);

	if (destNameInputs.snapshotLength == 0) { return; }
	var df;

	var isToCreateTheDestinationVillage = true;
	for(var i=0; i<destNameInputs.snapshotLength; i++) {
		var currentInput = destNameInputs.snapshotItem(i);
		currentInput.addEventListener("focus", function () {
			if (isToCreateTheDestinationVillage) {
				isToCreateTheDestinationVillage = false;
				// Create the destination village list
				var villages = getInfo_getOwnVillageLinksFromRightSideVillageList();
				df = new Array();
				for(var j=0; j<villages.snapshotLength; j++) {
					df.push(villages.snapshotItem(j).innerHTML);
				}
			}
		}, true);
		currentInput.addEventListener("keyup", function() {	// my_village() -> adapted from unx.js
			var aU = Math.round(0);
			var aD;
			var e = currentInput.value;
			for(var i = 0; i < df.length; i++) {
				if (df[i].indexOf(e) > -1) {
					aU++;
					aD = df[i];
				}
			}
			if (aU == 1) {
				currentInput.value = aD;
			}
		}, true);
	}
}


/**
* getInfo_getOwnVillageLinksFromRightSideVillageList
*/
function getInfo_getOwnVillageLinksFromRightSideVillageList() {
	return xpathEvaluate('//div[@id="lright1"]/table/tbody/tr/td/a');
}


/**
* transformGeneric_addQPConfigurationMenu
*/
function transformGeneric_addQPConfigurationMenu() {

	var qpConfDiv	= document.createElement('div');
	var qpConfTable = createElementAppend('table', qpConfDiv);

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElemAppendAndSetInner('td', qpConfRow, '<b><font color="#71d000">Q</font><font color="#ff6f0f">P</font></b>');

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElementAppend('td', qpConfRow);
	var qpConfScout	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_SCOUT + '" />');
	var qpConfFakes	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_FAKE + '" />');
	var qpConfHero	= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_HERO + '" />');

	var qpConfRow	= createElementAppend('tr', qpConfTable);
	var qpConfCell	= createElementAppend('td', qpConfRow);
	var qpConfCrannyImg		= createElemAppendAndSetInner('td', qpConfCell, '<img src="' + IMGS_CRANNY + '" width="32" height="32" />');
	var qpConfCrannyInput	= createElemAppendAndSetInner('td', qpConfCell, '<input type="text" size="3" />');
	var qpConfCrannySure	= createElemAppendAndSetInner('td', qpConfCell, '<input type="text" size="1" />');

	var leftDiv = document.getElementById('lleft');
	leftDiv.appendChild(qpConfDiv);
}



/**
* transformGeneric_addAction_gotoNextPage
*/
function transformGeneric_addAction_spaceShortcutKeyGoesToNextPage() {
	var DEF_CHAR_RAQUO = unescape('%BB');	// Right Angled Quotes
	var DEF_CHAR_SPACE = " ";

	function action_goToNextPage() {
		var links = document.getElementsByTagName("a");
		var i;
		for(i=0; i<links.length; i++) {
			if (links[i].innerHTML.indexOf(DEF_CHAR_RAQUO) == 0) { break; }
		}
		if (i == links.length) { return; }
		document.location.href = links[i].href;
	}

	document.addEventListener("keydown", function (e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
	    if (key == DEF_CHAR_SPACE) { action_goToNextPage(); }
	}, true);
}




/**
* transformGeneric_addOverflowDepleteTimes
*/
function transformGeneric_addOverflowDepleteTimes() {

	for(var i=0; i<4; i++) {
		var resourceNode = document.getElementById("l" + (4-i));	// wood, clay, iron, crop

		var time = calculateResourceOverflowOrStarvation(g_res_prod[i], g_res_now[i], g_res_max[i]);
		var resourcePlaceholder = resourceNode.previousSibling.previousSibling;

		var resourceOverflowDiv = createElementAppend("div", resourcePlaceholder);
		if (CONFIG_FEATURE_RESOURCES_INFO_POSITION_ABOVE) {
			resourceOverflowDiv.setAttribute("style", "position:absolute; top:-23px; white-space:nowrap;");
		}


		var resColor = ( (g_res_prod[i] <= 0) ? ( (g_res_prod[i] < 0) ? ';color:red' : ';color:orange;font-size:larger;' ) : '');
		var resOverflowSpanTime =	'<span id="QPtimer" style="font-weight:bold' + resColor + '">' + time + '</span>';

		var resOverflowSpanProd = createElementAppend("span", resourceOverflowDiv);
		resOverflowSpanProd.className = "QPresources";
//		resOverflowSpanProd.innerHTML = '(' + ( (g_res_prod[i] > 0) ? '+' : '' ) + g_res_prod[i] +
//										', ' + resOverflowSpanTime +
//										')';

		var aaa = '(';
		switch (CONFIG_FEATURE_RESOURCES_INFO) {
			// PRODUCTION ONLY
			case 1:
					aaa += ( (g_res_prod[i] > 0) ? '+' : '' ) + g_res_prod[i];
					break;
			// BOTH
			case 3:
					aaa += ( (g_res_prod[i] > 0) ? '+' : '' ) + g_res_prod[i];
					aaa += ', ';
			// TIMER
			case 2:
			case 3:
					aaa += resOverflowSpanTime;
				break;
			default:
				break;
		}
		aaa += ')';

		resOverflowSpanProd.innerHTML = aaa;
	}
}







/** transformPageDorf1_addColorsToResourceFieldsLevels */
function transformPageDorf1_addColorsToResourceFieldsLevels() {
	var positioningDIV = addDiv('QPD1BL', '', "", "lmid2");
	var d1info = gmLoad_InfoDorf1(getActiveTownId());

	for(var i=1, len=d1info.length; i<len; i++) {
		var resLevel = d1info[i];

		var resLink = createElementAppend('a', positioningDIV);
		resLink.href = "build.php?id=" + i;
		resLink.id = "QPD1L"+i;
		resLink.className = "rf"+i;
		var DIV = addDiv('QPbl', 'QPdorf1BuildingLevel', " ", "QPD1L"+i);

		if ((resLevel == 10) && (gmLoadCapitalVillageId() != getActiveTownId())) {
				DIV.style.visibility = "visible";
				DIV.style.backgroundColor = DEF_COLOR_RESOURCE_MAXLEVEL;
		} else {
			var resType = DEF_RESOURCETYPE_IN_VILLAGE[d1info[0]][i-1];

			if (!canBuildNextBuildingLevel(resType, resLevel)) {
				DIV.style.visibility = "visible";
				DIV.style.backgroundColor = DEF_COLOR_RESOURCE_UNUPGRADEABLE;
			}
		}
	}
}







function _OLD_transformPageDorf2_addBuildingLevels() {
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element) {
		var buildingImgs = xpathEvaluate('//div[@id="lmid2"]/img');
		var x = 152; var y = 160;
		var buildingCoordX = [318, 121, 204, 264, 338, 394,  86, 167, 253, 401,  72, 198, 161, 408,  90, 233, 360, 164, 292, 150, 266, 290];
		var buildingCoordY = [166,  82,  57,  47,  62, 111, 121, 128, 111, 152, 191, 156, 182, 210, 230, 226, 243, 266, 260, 297, 306, 356];
		var buildingLevel, DIV;
		var areaElements = map1Element.childNodes; // All map1 children are area elements
		var debuginfo = "";
		// for each area which represents a building (ommit wall repetitions)
		for (var i = 0; i < 22; i++) {
			if (buildingLevel = /(\d+)/.exec(areaElements[i].title)) {
				var currAreaElemHref = areaElements[i].href;
				// Only show spots with buildings on them.
				DIV = addDiv('QPbuildingLevel' + i, 'QPbuildingLevel', buildingLevel[0], false);

				DIV.style.top = parseInt(buildingCoordY[i] + y) + 'px';
				DIV.style.left = parseInt(buildingCoordX[i] + x) + 'px';
				DIV.style.visibility = "visible";
				DIV.setAttribute('goto', currAreaElemHref);
				DIV.addEventListener('click', function() {window.location.href = this.getAttribute('goto');}, true);

				// getting the number 22 from the '<area href="build.php?id=22" title="Building site" ...>'
				var buildingPlaceId = parseInt(currAreaElemHref.substr(currAreaElemHref.lastIndexOf("=") + 1));
				for(var j=0; j<buildingImgs.snapshotLength; j++) {
					var currBuilding = buildingImgs.snapshotItem(j);

					// getting the number 11 from the '<img class="d11" ...>'
					var buildingPosDString = currBuilding.className.substr(1);

					// getting the building GID
					var currBuildSrc = currBuilding.src;
					var buildGid;

					var buildImgClass = currBuilding.className;
					var buildPlaceImg;
					if (buildImgClass.length < 4) {	//	normal + rally point (class="dx1")
						// gets the PLACE from the image
						buildPlaceImg = (buildImgClass == "dx1") ? 21 : buildImgClass.substr(1);
						// gets the GID from the image SRC (eg.: img/un/g/g16.gif )
						buildGid = parseInt(currBuildSrc.substring(currBuildSrc.lastIndexOf("/") + 2,
																	  currBuildSrc.lastIndexOf(".")));
					} else {	// walls for each race (class   G "d2_x d2_1"   R "d2_x d2_11"   T "d2_x d2_12")
						parseInt(buildImgClass.substr(8));
						switch (buildPlaceImg) {
							case 1:		buildGid = DEF_BUILD_GID_PALISADE;		break;
							case 11:	buildGid = DEF_BUILD_GID_CITY_WALL;		break;
							case 12:	buildGid = DEF_BUILD_GID_EARTH_WALL;	break;
							default:	break;
						}
						// wall is always on the same place
						buildPlaceImg = 22;
					}

					buildPlaceImg = parseInt(buildPlaceImg) + 18;

/*	debug(DBG_NORMAL, "[transformPageDorf2_addBuildingLevels] j "+j+" \n"
	+ " NAME: " + areaElements[i].getAttribute('title')
	+ " buildingPosD " + buildingPosD
	+ " buildingGid " + buildingGid
	+ " buildingId " + buildingId
	+ " buildingLevel[0] " + buildingLevel[0]
	+ " DEF_BUILDINGS_MAX_LEVELS[buildingGid] " + DEF_BUILDINGS_MAX_LEVELS[buildingGid]);

					debuginfo += "\n" + areaElements[i].title + " D="+buildingPosD+" ID="+buildingId+ " GID " + buildingGid + " max " + DEF_BUILDINGS_MAX_LEVELS[buildingGid];
*/
					if (buildPlaceImg == buildingPlaceId) {
						if (buildingLevel[0] == DEF_BUILDINGS_MAX_LEVELS[buildGid]) {
							DIV.style.backgroundColor = DEF_COLOR_BUILDING_MAXLEVEL;
							break;
						} else {	// if it has not reached top level, check if can build next one
							if (!canBuildNextBuildingLevel(buildGid, buildingLevel[0])) {
								DIV.style.backgroundColor = DEF_COLOR_BUILDING_UNUPGRADEABLE;
							}
						}
					}
				}
			}
		}
	}
//	debug(DBG_NORMAL, "[transformPageDorf2_addBuildingLevels] \n" + debuginfo);
}

/**
* canBuildNextBuildingLevel
* @param {int} gid
* @param {int} currLevel
*/
function canBuildNextBuildingLevel(gid, currLevel) {
	debug(DBG_NORMAL, "[canBuildNextBuildingLevel] gid " + gid + " currLevel " + currLevel);
	var nextLvlStats = DEF_BUILDING[gid][currLevel];	// this is already the next lvl -> array starts at 0
	debug(DBG_NORMAL, "[canBuildNextBuildingLevel] nextLvlStats " + nextLvlStats);

	var currWood = xpathEvaluate('//td[@id="l4"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currWood < nextLvlStats[0]) { return false; }
	var currClay = xpathEvaluate('//td[@id="l3"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currClay < nextLvlStats[1]) { return false; }
	var currIron = xpathEvaluate('//td[@id="l2"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currIron < nextLvlStats[2]) { return false; }
	var currCrop = xpathEvaluate('//td[@id="l1"]').snapshotItem(0).innerHTML.split("/")[0];
	if (currCrop < nextLvlStats[3]) { return false; }

	return true;
}



/**
* transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton
*/
function transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton] start");
	xpathEvaluate('//div[@id="lmid2"]/form/p/input').snapshotItem(0).focus();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton] end");
}



/**
* savePermanentArrivingMerchantsTitle
*/
function savePermanentArrivingMerchantsTitle(arrivingMercsTitle) {
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] arrivingMercsTitle " + arrivingMercsTitle);
	var key = createPermanentKeyForArrivingMerchantsTitle();
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key );
	GM_setValue(key, escape(arrivingMercsTitle));
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key + " arrivingMercsTitle " + arrivingMercsTitle);
}

/**
* loadPermanentArrivingMerchantsTitle
*/
function loadPermanentArrivingMerchantsTitle() {
	var key = createPermanentKeyForArrivingMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}

/**
* createPermanentKeyForArrivingMerchantsTitle
* Creates a key for permanent storing reports actions.
* The key is of this format: <server>_<userId>_arrivingMerchants
*/
function createPermanentKeyForArrivingMerchantsTitle() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_ARRIVING;
}

/**
* savePermanentOwnMerchantsTitle
*/
function savePermanentOwnMerchantsTitle(ownMercsTitle) {
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] arrivingMercsTitle " + ownMercsTitle);
	var key = createPermanentKeyForOwnMerchantsTitle();
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key );
	GM_setValue(key, escape(ownMercsTitle));
	debug(DBG_LOW, "[savePermanentArrivingMerchantTitle] key " + key + " arrivingMercsTitle " + ownMercsTitle);
}

/**
* loadPermanentOwnMerchantsTitle
*/
function loadPermanentOwnMerchantsTitle() {
	var key = createPermanentKeyForOwnMerchantsTitle();
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}

/**
* createPermaentKeyForOwnMerchantsTitle
* Creates a key for permanent storing reports actions.
* The key is of this format: <server>_<userId>_ownMerchants
*/
function createPermanentKeyForOwnMerchantsTitle() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_MERCHANTSTITLE_OWNMERCHANTS;
}



/**
* lang_get_market_sendResources_MerchantGroupTitles
*
* Get the "Arriving merchants:" phrase from the MarketSendResources page.
* Methods to discover:
* 1 - Get from already saved permanent information;
* 2 - Both mercs arriving and own mercs on the way, 1st group is arriving;
* 3 - Group with other players: it is arriving;
* 4 - Own mercs returning, resource quantities greyed out;
* 5 - Too much resources arriving for the mercs (market lvl) and load/merc of town: arriving mercs;
*/
function lang_get_market_sendResources_MerchantGroupTitles() {
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles]");

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] loadPermanentArrivingMerchantsTitle() " + loadPermanentArrivingMerchantsTitle());
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] loadPermanentOwnMerchantsTitle() " + loadPermanentOwnMerchantsTitle());
	// method 1
	if (loadPermanentArrivingMerchantsTitle() != undefined) {
		if (loadPermanentOwnMerchantsTitle() != undefined) {
			return;
		}
	}

	// Not yet retrieved, go for each method
	var mercGroupTitles = xpathEvaluate('//div[@id="lmid2"]/form/p[@class="b"]');
	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] mercGroupTitles.snapshotLength " + mercGroupTitles.snapshotLength);

	// no mercs arriving or own mercs so simply try again later
	if (mercGroupTitles.snapshotLength == 0) { return; }

	// method 2
	if (mercGroupTitles.snapshotLength == 2) {
		// 2 groups: 1st is arriving mercs, 2nd is own mercs
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method2 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method2 OWN: " + mercGroupTitles.snapshotItem(1).innerHTML);
		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentOwnMerchantsTitle(mercGroupTitles.snapshotItem(1).innerHTML);
		return;
	}

	// method 3
	var myUid = getUserId();
	var mercsFromOtherUsers = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[1]/td[1]/a[1][not(contains(@href, "spieler.php?uid='+myUid+'"))]');
	if (mercsFromOtherUsers.snapshotLength > 0) {

		// only 1 group: the arriving mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method3 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	// method 4
	var returningMercs = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[3]/td[2]/span[@class="c f10"]');
	if (returningMercs.snapshotLength > 0) {
		// only 1 group: the own mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method4 OWN: " + mercGroupTitles.snapshotItem(0).innerHTML);
		savePermanentOwnMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	// method 5
	var availableAndTotalMercsString = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').snapshotItem(0).firstChild.textContent;
	var availableAndTotalMercsArray = availableAndTotalMercsString.split(" ")[1].split("/");
	var mercsOnWay = availableAndTotalMercsArray[1] - availableAndTotalMercsArray[0];

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	var resSpanOnMercTables = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[3]/td[2]/span[@class="f10"]');

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] resSpanOnMercTables.snapshotLength " + resSpanOnMercTables.snapshotLength);
	var totalMercsOnTables = 0;
	for(var i=0; i<resSpanOnMercTables.snapshotLength; i++) {
		var resSpan = resSpanOnMercTables.snapshotItem(i);
		var mercWood = parseInt(resSpan.childNodes[1].nodeValue.replace("|", ""));
		var mercClay = parseInt(resSpan.childNodes[3].nodeValue.replace("|", ""));
		var mercIron = parseInt(resSpan.childNodes[5].nodeValue.replace("|", ""));
		var mercCrop = parseInt(resSpan.childNodes[7].nodeValue.replace("|", ""));

		var totalResOnThisTable = mercWood + mercClay + mercIron + mercCrop;

		var mercsOnThisTable = totalResOnThisTable / mercsLoad;

		totalMercsOnTables += Math.ceil(mercsOnThisTable);
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method5 mercsOnThisTable " + mercsOnThisTable + " totalMercsOnTables " + totalMercsOnTables);
	}

	if (totalMercsOnTables > mercsOnWay) {
		// only 1 group: the arriving mercs group
		debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] method5 ARRIVING: " + mercGroupTitles.snapshotItem(0).innerHTML);

		savePermanentArrivingMerchantsTitle(mercGroupTitles.snapshotItem(0).innerHTML);
		return;
	}

	debug(DBG_NORMAL, "[lang_get_market_sendResources_MerchantGroupTitles] UNKNOWN ");
	// UNKNOWN IF THE GROUP IS ARRIVING OR OWN MERCS
}


/**
* addListenerMarketplaceSendResources_updateResourceQuatity
* @param {HTMLNode} parentNode
* @param {int} times
* @param {int} quantity
*/
function addListenerMarketplaceSendResources_updateResourceQuatity(currRowNode, parentNode, times, quantity, inner) {
	var link = createElemAppendAndSetInner('a', parentNode, '<span style="font-size:8pt">' + inner + '</span>');
	link.href = "#";

	var resInput = xpathEvaluateInContext(currRowNode, 'td/input').snapshotItem(0);

	link.addEventListener('click',	function() {
		debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] currRowNode.innerHTML " + currRowNode.innerHTML);
		if (times == 0) {
			resInput.value = '';

		} else {
			var resNewValue = resInput.value;
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] resNewValue " + resNewValue);
			resNewValue = (isNaN(parseInt(resNewValue))) ? 0 : parseInt(resNewValue);
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] resNewValue " + resNewValue);
			resInput.value = resNewValue + (times * parseInt(quantity));
			debug(DBG_NORMAL, "[addListenerMarketplaceSendResources_updateResourceQuatity] times " + times + " quantity " + quantity);
		}
		updateMerchantsUsed();
	}, true);
	return link;
}



/** stringRepeat - repeats string "s", "m" times */
function stringRepeat(s, m) { var r = ""; for(var i=0; i<m; i++) { r += s; } return r; }


var v=new Array(0,0,0,0,0);

/** market */
function QPadd_res(B) {
	C = document.getElementById('l'+(5-B)).value;	// warehouse/granary capacity
	I = 1500 * 20;		// max single resource send quantity
	v[B] = QPap(v[B], C, I, carry);
	document.getElementById('r'+B).value = v[B];
};

/** market */
function QPupd_res(B,max) {
	debug(DBG_HIGHEST, "[upd_res] B " + B + " max " + max);
	C = document.getElementById('l'+(5-B)).innerHTML.split("/")[1];	// warehouse/granary capacity
	debug(DBG_HIGHEST, "[upd_res] document.getElementById('l'+(5-B)) " + document.getElementById('l'+(5-B)));
	debug(DBG_HIGHEST, "[upd_res] document.getElementById('l'+(5-B)).innerHTML " + document.getElementById('l'+(5-B)).innerHTML);
	I = 1500 * 20;		// max single resource send quantity
	debug(DBG_HIGHEST, "[upd_res] B " + B + " max " + max + " C " + C + " I " + I);
	if (max) {
		L = C;
	} else {
		L = parseInt(document.getElementById('r'+B).value);
		var aaa = document.getElementById('r'+B);
		debug(DBG_HIGHEST, "[upd_res] aaa " + aaa);
		debug(DBG_HIGHEST, "[upd_res] aaa.value " + aaa.value);
		debug(DBG_HIGHEST, "[upd_res] aaa.innerHTML " + aaa.innerHTML);
		debug(DBG_HIGHEST, "[upd_res] L " + L);
	}
	debug(DBG_HIGHEST, "[upd_res] B " + B + " max " + max + " L " + L + " C " + C + " I " + I);
	if(isNaN(L)){
		L = 0;
	}
	v[B] = QPap(parseInt(L), C, I, 0);
	document.getElementById('r'+B).value = v[B];
};

/** market - gives the max values for the resource to be sent at market send resources page */
function QPap(aj, X, M, aC) {
	ab = aj + aC;
	if (ab>X) {
		ab = X;
	}
	if (ab>M) {
		ab=M;
	}
	if (ab==0) {
		ab='';
	}
	return ab;
};




/**
* transformPageMarketplaceSendResources_addExtraQuantities
*/
function transformPageMarketplaceSendResources_addExtraQuantities() {

	var sendResRow = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a/../..');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();

	for(var i=0, len = sendResRow.snapshotLength; i<len; i++) {
		var currResourceRow = sendResRow.snapshotItem(i);

		currResourceRow.cells[0].innerHTML = "";
		var newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[0], 20, mercsLoad, "<img src='img/un/r/"+parseInt(i+1)+".gif'/>");

		currResourceRow.cells[3].innerHTML = "";
		newTdRes = addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, currResourceRow.cells[3], 1, mercsLoad, "("+mercsLoad+")");

		var newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 0, mercsLoad, "(x0)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 2, mercsLoad, "(x2)");
		newTd = createElementAppend('td', currResourceRow);
		addListenerMarketplaceSendResources_updateResourceQuatity(currResourceRow, newTd, 5, mercsLoad, "(x5)");
	}
}


/**
* retrievePageMarketPlaceSendResources_MercLoad
*/
function retrievePageMarketPlaceSendResources_MercLoad() {
	var mercsLoad = xpEvalFirst('//div[@id="lmid2"]/form/p/b');
	if (mercsLoad) {
		mercsLoad = parseInt(mercsLoad.textContent);
		if (!isNaN(mercsLoad)) {
			return mercsLoad;
		}
	}
	mercsLoad = xpathEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table/tbody/tr/td/a').snapshotItem(1).textContent;
	mercsLoad = parseInt(mercsLoad.substr(1));
	return mercsLoad;
}



function updateMerchantsUsed() {
	debug(DBG_NORMAL, "[updateMerchantsUsed] ");
	var inputsTable = xpEvalFirst('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]');
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();
	var availableAndTotalMercsString = xpEvalFirst('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').firstChild.textContent;
	var availableMercs = availableAndTotalMercsString.split(" ")[1].split("/")[0];

	var txt = document.getElementById("QPusedMercs");

	function getInputsTotal() {
		var res = 0;
		for(var i=0; i<inputs.snapshotLength; i++) {
			res += (inputs.snapshotItem(i).value == "") ? 0 : parseInt(inputs.snapshotItem(i).value);
		}
		return res;
	}
	debug(DBG_NORMAL, "[updateMerchantsUsed] 2 ");
	var totResources = getInputsTotal();
	var mercs = Math.ceil(totResources / mercsLoad);
	var lastMercExcessLoad = ((totResources % mercsLoad) == 0) ? 0 : (totResources % mercsLoad);
	var lastMercAvailableLoad = ((totResources % mercsLoad) == 0) ? 0 : mercsLoad - (lastMercExcessLoad);
	if (mercs > availableMercs) {
//			debug(DBG_NORMAL, "[updateMerchantsUsed] if lastMercExcessLoad " + lastMercExcessLoad);
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercExcessLoad==0) ? " (0)" : (" (+"+ lastMercExcessLoad +")"));
		txt.style.color = "red";
	} else {
//			debug(DBG_NORMAL, "[updateMerchantsUsed] else lastMercAvailableLoad " + lastMercAvailableLoad);
		txt.innerHTML = totResources +" = "+ mercs + ((lastMercAvailableLoad==0) ? " (0)" : (" (-"+ lastMercAvailableLoad +")"));
		txt.style.color = "green";
	}
}



/**
* transformPageMarketplaceSendResources_addMerchantsUsed
*/
function transformPageMarketplaceSendResources_addMerchantsUsed() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addMerchantsUsed] ");
	var inputsTable = xpEvalFirst('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]');
	var inputFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a');
	var inputResourceFillLinks = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/a/img[@class="res"]/..');
	var inputs = xpathEvaluateInContext(inputsTable, 'tbody/tr/td/input');

	// add the mercs used html
	var txt = document.createElement("span");
	txt.className = "QPsmall";
	txt.id = "QPusedMercs";
	inputsTable.parentNode.insertBefore(txt, inputsTable.nextSibling);
	txt.innerHTML = "0 = 0 (0)";
	txt.style.color = "green";


	for(var i=0; i<inputs.snapshotLength; i++) {
		inputs.snapshotItem(i).addEventListener('keyup', updateMerchantsUsed, true);
	}
/*
	for(var i=0; i<inputFillLinks.snapshotLength; i++) {
		inputFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, true);
		inputFillLinks.snapshotItem(i).addEventListener('dblclick', updateMerchantsUsed, true);
		debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] i " + i);
		inputFillLinks.snapshotItem(i).addEventListener('click', function(){
			debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] e " + e);
			var iii = parseInt((i%4)+1);
			debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] iii " + iii);
			QPupd_res(iii);
		}, true);
		debug(DBG_HIGHEST, "[transformPageMarketplaceSendResources_addMerchantsUsed] i after " + i);
	}
	for(var i=0; i<inputResourceFillLinks.snapshotLength; i++) {
		inputResourceFillLinks.snapshotItem(i).addEventListener('click', updateMerchantsUsed, false);
	}
*/
}



/**
* transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion
*/
function transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] ");
	var myUid = getUserId();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] myUid " + myUid);
	// selects the receiving merchants
	var receiveAndTitles = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (receiveAndTitles.snapshotLength == 0) { return; }
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] receiveAndTitles.snapshotItem(0).textContent " + receiveAndTitles.snapshotItem(0).textContent);
	if (loadPermanentArrivingMerchantsTitle() != receiveAndTitles.snapshotItem(0).textContent) { return; }

	var mercTimes = new Array();
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] creating arrays to gather arriving mercs info");
	var mercWood = new Array();
	var mercClay = new Array();
	var mercIron = new Array();
	var mercCrop = new Array();
	for(var i=1; i<receiveAndTitles.snapshotLength; i++) {
		debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] for i " + i);
		var currentMerchantTable = receiveAndTitles.snapshotItem(i);
		if (currentMerchantTable.nodeName == "P") { break; }
		var currentMerchantTime = currentMerchantTable.childNodes[1].childNodes[2].childNodes[1].childNodes[0].innerHTML;
		mercTimes[i-1] = timeColonSeparatedToValue(currentMerchantTime);
		var tdRes = currentMerchantTable.lastChild.lastChild.lastChild.lastChild;
		mercWood[i-1] = parseInt(tdRes.childNodes[1].nodeValue.replace("|", ""));
		mercClay[i-1] = parseInt(tdRes.childNodes[3].nodeValue.replace("|", ""));
		mercIron[i-1] = parseInt(tdRes.childNodes[5].nodeValue.replace("|", ""));
		mercCrop[i-1] = parseInt(tdRes.childNodes[7].nodeValue.replace("|", ""));
	}

	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercTimes " + mercTimes);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercWood " + mercWood);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercClay " + mercClay);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercIron " + mercIron);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] mercCrop " + mercCrop);

	var woodSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[0], g_res_now[0], g_res_max[0], mercTimes, mercWood);
	var claySecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[1], g_res_now[1], g_res_max[1], mercTimes, mercClay);
	var ironSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[2], g_res_now[2], g_res_max[2], mercTimes, mercIron);
	var cropSecs = 	calculateResourceOverflowOrStarvationWithMarketArrivals(g_res_prod[3], g_res_now[3], g_res_max[3], mercTimes, mercCrop);

	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] woodSecs " + woodSecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] claySecs " + claySecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] ironSecs " + ironSecs);
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion] cropSecs " + cropSecs);

	// selects the "Each of your merchants can carry X resources." sentence
	var previous = xpathEvaluate('//div[@id="lmid2"]/form/p/b/..');
	if (previous.snapshotLength > 0) {
		previous = previous.snapshotItem(0);
	} else {
		previous = xpathEvaluate('//div[@id="lmid2"]/form/p/input[contains(@src, "/b/ok1.gif")]').snapshotItem(0);
	}

	var resColor = ( (g_res_prod[3] <= 0) ? ( (g_res_prod[3] < 0) ? ';background-color:red' : ';background-color:orange;font-size:larger;' ) : '');

	var divOverflows = document.createElement('div');
	divOverflows.innerHTML = '<table class="tbg" cellpadding="2" cellspacing="1"><tbody><tr class="cbg1">' +
							'<td><img class="res" src="img/un/r/1.gif"></td><td><span id="QPtimer">'+woodSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/2.gif"></td><td><span id="QPtimer">'+claySecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/3.gif"></td><td><span id="QPtimer">'+ironSecs+'</span></td>' +
							'<td><img class="res" src="img/un/r/4.gif"></td>' +
							'<td style="' + resColor + '"><span id="QPtimer">'+cropSecs+'</span></td>' +
							'</tr></tbody></table>'

	previous.parentNode.insertBefore(divOverflows, previous.nextSibling);
}





function transformPageMarketplaceSendResources_addCumulativeArrivals() {
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals]");

	// selects the receiving merchants
	var sendReceive = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
	if (sendReceive.snapshotLength == 0) { return; }
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] sendReceive.snapshotItem(0).textContent " + sendReceive.snapshotItem(0).textContent);
	if (loadPermanentArrivingMerchantsTitle() != sendReceive.snapshotItem(0).textContent) { return; }

	for(var i=0; i<sendReceive.snapshotLength; i++) {
		debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] sendReceive.snapshotItem i " + i);

		if ((i>0) && (sendReceive.snapshotItem(i).nodeName == "P")) { break; }

		if (sendReceive.snapshotItem(i).nodeName == "P") {
			//create place to sum the resources
			var sp = document.createElement("span");
			var swood = document.createTextNode("0");
			var sclay = document.createTextNode("0");
			var siron = document.createTextNode("0");
			var scrop = document.createTextNode("0");
//			var stime = document.createTextNode("99:99:99");
			var stime = document.createElement("span");
//<span id="time6">0:45:09</span>
			var img1 = document.createElement("img");	img1.src = "img/un/r/1.gif";
			var img2 = document.createElement("img");	img2.src = "img/un/r/2.gif";
			var img3 = document.createElement("img");	img3.src = "img/un/r/3.gif";
			var img4 = document.createElement("img");	img4.src = "img/un/r/4.gif";
			var img5 = document.createElement("img");	img5.src = IMGS_CLOCK;
			sp.appendChild(img1);	sp.appendChild(swood);
			sp.appendChild(img2);	sp.appendChild(sclay);
			sp.appendChild(img3);	sp.appendChild(siron);
			sp.appendChild(img4);	sp.appendChild(scrop);
			sp.appendChild(img5);	sp.appendChild(stime);
			sendReceive.snapshotItem(i).appendChild(sp);
		} else { // table
			// add resources, keep max time
			var tdRes = sendReceive.snapshotItem(i).lastChild.lastChild.lastChild.lastChild;
//			GM_log("[onMarketPlaceSendResourcesLoad] td res " + tdRes.innerHTML);
			var rwood = parseInt(tdRes.childNodes[1].nodeValue.replace("|", "")); swood.nodeValue = parseInt(swood.nodeValue) + rwood;
			var rclay = parseInt(tdRes.childNodes[3].nodeValue.replace("|", "")); sclay.nodeValue = parseInt(sclay.nodeValue) + rclay;
			var riron = parseInt(tdRes.childNodes[5].nodeValue.replace("|", "")); siron.nodeValue = parseInt(siron.nodeValue) + riron;
			var rcrop = parseInt(tdRes.childNodes[7].nodeValue.replace("|", "")); scrop.nodeValue = parseInt(scrop.nodeValue) + rcrop;
//			stime.nodeValue = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
			stime.innerHTML = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
//			stime.id = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.id;
//			stime.id = "timeouta";
			stime.id = "QPtimer";
		}
	}
	debug(DBG_NORMAL, "[transformPageMarketplaceSendResources_addCumulativeArrivals] END");
}

/**
* retrieveResourcesAndTimeFromCell
* @return Array with 5 positions with the resources and the time
*/
function retrieveResourcesAndTimeFromCell(cell) {
	var arr = new Array();
//	debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] cell.childNodes.length " + cell.childNodes.length + " cell.innerHTML " + cell.innerHTML);
	for(var i=0, getPosition=-1; i<cell.childNodes.length; i++) {
		var currentNode = cell.childNodes[i];
//		debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] i " + i + " currentNode.nodeName " + currentNode.nodeName);
		if (currentNode.nodeName == "IMG") {
			if (/img\/un\/r\/\d\.gif/.test(currentNode.src)) {
//				debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] IF 1 ");
				getPosition = parseInt(/img\/un\/r\/(\d)\.gif/.exec(currentNode.src)[1]) - 1;
			} else if (currentNode.src.indexOf(IMGS_CLOCK)) {
//				debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] IF 2 ");
				getPosition = 5;
			}
//			debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] currentNode.src " + currentNode.src
//							+ " getPosition " + getPosition
//							);
			continue;
		}

		if (getPosition > -1) {
			var txt = currentNode.nodeValue.replace("|", "").trim();
			arr[getPosition] = txt;
			getPosition = -1;
//			debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] arr " + arr);
		}
	}
//	debug(DBG_HIGHEST, "[retrieveResourcesAndTimeFromCell] arr " + arr);
	return arr;
}






/**
* calculateResourceOverflowOrStarvation
* @param {int} productionPerHour
* @param {int} currentState
* @param {int} maxCapacity
*/
function calculateResourceOverflowOrStarvation(productionPerHour, currentState, maxCapacity) {
	if (productionPerHour == 0) { return DEF_CHAR_INFINITY; }

	var productionPerSeconds = Math.abs(productionPerHour / 3600);

	// depending if is going to overflow or depletion
	var diference = parseInt((productionPerHour > 0) ? (maxCapacity - currentState) : currentState);
	var totalSeconds = Math.floor(diference / productionPerSeconds);
	var timeTxt = timeInSecondsToColonSeparatedTxt(totalSeconds);
	return timeTxt;
}


/**
* calculateResourceOverflowOrStarvation
* @param {int} productionPerHour
* @param {int} currentState
* @param {int} maxCapacity
* @param {int array} timeOfArrivals Array of arrival times in seconds.
* @param {int array} amountToArrive Amount of the resource to arrive in the corresponding time (the other array).
*/
function calculateResourceOverflowOrStarvationWithMarketArrivals(productionPerHour, currentState, maxCapacity, timeOfArrivals, amountToArrive) {
	var productionPerSeconds = Math.abs(productionPerHour / 3600);
	debug(DBG_HIGHEST, "[calculateResourceOverflowOrStarvationWithMarketArrivals] "
			+ "\n productionPerHour " + productionPerHour
			+ " productionPerSeconds " + productionPerSeconds
			+ " currentState " + currentState
			+ " maxCapacity " + maxCapacity
			+ "\n timeOfArrivals " + timeOfArrivals
			+ " amountToArrive " + amountToArrive
	);

	var isOverflowing = (productionPerHour > 0);

	// depending if is going to overflow or depletion calculates diference to 0 or to maxCapacity
	var diference = parseInt(isOverflowing ? (maxCapacity - currentState) : currentState);
	var totalSeconds = (productionPerHour==0) ? ((diference==0)?0:-1) : Math.floor(diference / productionPerSeconds);

	for(var i = 0, len = timeOfArrivals.length; i<len; i++) {
		var currArrivalAmount = amountToArrive[i];
		var currArrivalTime = timeOfArrivals[i];
		if (currArrivalAmount == 0) { continue; }	// mercs arriving but not bringing this resource

		if (currArrivalTime <= totalSeconds) {
			// depending if is going to overflow or depletion re-calculates new diference with arriving amount
			diference = isOverflowing ? (diference - currArrivalAmount) : (diference + currArrivalAmount);

			if (diference <= 0) {
				// this arrival filled it up / emptied it out - do no evaluate more arrivals
				totalSeconds = currArrivalTime;
				break;
			}
			// from this point, the goal hasn't been reached

			if (productionPerHour == 0) {	// with previous arrivals and current production never reaches goal
				totalSeconds = -1;

			} else {	// still has production so goal can make it get there

				// time is the time to fill the "rest" (diference) of the resource
				totalSeconds = Math.floor(diference / productionPerSeconds);

				// if the time it takes to fill the "rest" is lower than the time of arrival then the total time to fill is the arrival
				totalSeconds = (totalSeconds < currArrivalTime) ? currArrivalTime : totalSeconds;
			}

			debug(DBG_HIGHEST, "[calculateResourceOverflowOrStarvationWithMarketArrivals] "
				+ " diference " + diference
				+ " timeOfArrivals[i] " + currArrivalTime
				+ " amountToArrive[i] " + currArrivalAmount
				);
		} else {
			break;
		}
	}
	if (totalSeconds == -1) { return DEF_CHAR_INFINITY; }
	var timeTxt = timeInSecondsToColonSeparatedTxt(totalSeconds);
	return timeTxt;
}





// Gets current server
function getServerName() {
//	return location.href.match(/([\w]+[.]travian.[\w]+([.][\w]+)?)/i)[1];
	return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}

// Gets current full server name
function getFullServerName() {
	return location.href.match(/([\w]+:\/\/[\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}

// Gets the current player
function getUserId() {
	var userID = xpEvalFirst('//a[contains(@href, "spieler.php?uid=")]');
	if (userID) {
		return getParamFromUrl(userID.href, "uid");
	} else {
		return "_InvalidUserId_";
	}
}


function getCoordZfromHref(url) {
	var coordZ = getParamFromUrl(url, 'd');
	coordZ = (coordZ) ? coordZ : getParamFromUrl(url, 'z');
	return coordZ;
}






//===========================================================================================================
//===========================================================================================================
//======================================  Travian Retrieve Info  ============================================
//===========================================================================================================
//===========================================================================================================






/** retrievePageDorf1Or2_langLevel */
function actionPageMarketNpcMerchant_fillQuantities() {
	// IF NO npc merchant predefined values exist, do not fill with anything
	if (!gmExists_NpcMerchant()) { return; }

	var quantities = gmLoad_NpcMerchant();
	debug(DBG_HIGHEST, "[actionPageMarketNpcMerchant_fillQuantities] quantities " + quantities);
	var npcInputs = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/input[@name="m2[]"]');

	for(var i=0; i<4; i++) {
		npcInputs.snapshotItem(i).value = quantities[i];
	}
	gmReset_NpcMerchant();
}




/** save, reset, load, createKey, exists - NpcMerchant - <server>_<userId>_npcMerchant */
function gmSave_NpcMerchant(quantities) { GM_setValue(gmKey_NpcMerchant(), "" + quantities); }
function gmReset_NpcMerchant() { gmSave_NpcMerchant(""); }
function gmLoad_NpcMerchant() { return gmLoad_UndefinedIsEmptyString(gmKey_NpcMerchant()).split(","); }
function gmKey_NpcMerchant() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_NPC_MERCHANT; }
function gmExists_NpcMerchant() { return (gmLoad_NpcMerchant() != ""); }



String.prototype.trim = function () {
	var str = this.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}







/** save, reset, load, createKey, exists - Lang_Level - <server>_<userId>_lang_fields */
// Saved info: level
function gmSave_Lang_Level(levelLang) { gmSave_Escape(gmKey_Lang_Level(), levelLang); }
function gmReset_Lang_Level() { gmSave_Lang_Level(""); }
function gmLoad_Lang_Level() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_Lang_Level()); }
function gmKey_Lang_Level() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_LANG_LEVEL; }
function gmExists_Lang_Level() { return (gmLoad_Lang_Level() != ""); }






/** retrievePageDorf1_FieldsNamesLang */
function retrievePageDorf1_FieldsNamesLang() {

	// if the field names were already retrieved, then nothing needs to be done
	if (gmExists_FieldNames()) {
		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] gmLoad_FieldNames " + gmLoad_FieldNames());
		return;
	}
	// else, retrieve the field names


	var constructionType = xpathEvaluate('//div[@id="lbau1"]/table[@class="f10"]/tbody/tr/td[2]');
	debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] constructionType.snapshotLength " + constructionType.snapshotLength);
	if (constructionType.snapshotLength>0) {
		var levelLang = constructionType.snapshotItem(0).innerHTML.match(/\((\D+) \d+\)/i)[1];

		var divF = xpEvalFirst('//div[@id="lmid2"]/div[contains(@id, "f")]');
		var villageTypeNumber = parseInt(divF.id.substr(1));

		var fieldsAreas = xpathEvaluate('//div[@id="lmid2"]/map[@name="rx"]/area');

		var woodfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_WOOD)).title;
		var clayfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_CLAY)).title;
		var ironfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_IRON)).title;
		var cropfieldLang = fieldsAreas.snapshotItem(searchResourcePositionFromType(villageTypeNumber, DEF_RES_CROP)).title;

		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] \n"
				+ " levelLang " + levelLang
				+ " woodfieldLang " + woodfieldLang
				+ " clayfieldLang " + clayfieldLang
				+ " ironfieldLang " + ironfieldLang
				+ " cropfieldLang " + cropfieldLang
				);

		woodfieldLang = getBuildingNameFromConstruction(woodfieldLang);
		clayfieldLang = getBuildingNameFromConstruction(clayfieldLang);
		ironfieldLang = getBuildingNameFromConstruction(ironfieldLang);
		cropfieldLang = getBuildingNameFromConstruction(cropfieldLang);

		var fieldNames = new Array();
		fieldNames[0] = levelLang;
		fieldNames[DEF_BUILD_GID_WOODCUTTER]= woodfieldLang;
		fieldNames[DEF_BUILD_GID_CLAY_PIT]	= clayfieldLang;
		fieldNames[DEF_BUILD_GID_IRON_MINE]	= ironfieldLang;
		fieldNames[DEF_BUILD_GID_CROPLAND]	= cropfieldLang;

		gmSave_FieldNames(fieldNames);
		debug(DBG_NORMAL, "[retrievePageDorf1_FieldsNamesLang] fieldNames " + fieldNames);
	}
}


/** getBuildingNameFromConstruction */
function getBuildingNameFromConstruction(constr, lvl) { return constr.match(/\D+/)[0].replace(lvl, "").trim(); }


/** save, reset, load, createKey - FieldNames - <server>_<userId>_lang_fields */
// Saved info: level, woodfield, claypit, ironmine, cropland
function gmSave_FieldNames(fieldNames) { gmSave_Escape(gmKey_FieldNames(), fieldNames); }
function gmReset_FieldNames() { gmSave_FieldNames(""); }
function gmLoad_FieldNames() { return gmLoad_Unescape_UndefinedIsEmptyString(gmKey_FieldNames()).split(","); }
function gmKey_FieldNames() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_LANG_FIELDS; }
function gmExists_FieldNames() { return (gmLoad_FieldNames() != ""); }







/** retrievePageDorf1Or2_BuildingsUnderConstruction */
function retrievePageDorf1Or2_BuildingsUnderConstruction() {

	if (!gmExists_FieldNames()) {
		return;
	}

	var levelLang = gmLoad_Lang_Level();
	var fieldNames = gmLoad_FieldNames();
	var underConstructionRows = xpathEvaluate('//div[@id="lbau1"]/table[@class="f10"]/tr');

	var len = underConstructionRows.snapshotLength;
	if (len>0) {
		for(var i=0; i<len; i++) {
			var construction = underConstructionRows.snapshotItem(0);
			var construcionType = construction.cells[1];
			var constructionName = getBuildingNameFromConstruction(construcionType, levelLang);
			var constructionReadyTime = construction.cells[2].firstChild;
			var constructionLevel = construcionType.match(/\d+/)[1];
			var constructionGid = -999;

			if (isThisPageDorf1()) {
				var fieldIndex = fieldNames.indexOf(constructionName);
				var bag = new Array();
				for(var j=0; j<array.length; j++) {

				}
			} else {

			}



		}
		gmSave_UnderConstruction(getActiveTownId(), dorf1Info);
		debug(DBG_HIGHEST, "[retrievePageDorf1Or2_BuildingsUnderConstruction] ");
	}
}


/** save, reset, load, createKey - UnderConstruction - <server>_<userId>_<villageId>_infoDorf1 */
// Saved info: villageType, 18fields			- info to be added later: time, underConstruction
function gmSave_UnderConstruction(villageId, constructions) { GM_setValue(gmKey_UnderConstruction(villageId), constructions); }
function gmReset_UnderConstruction(villageId) { gmSave_UnderConstruction(villageId, ""); }
function gmLoad_UnderConstruction(villageId) { return gmLoad_UndefinedIsEmptyString(gmKey_UnderConstruction(villageId)).split(","); }
function gmKey_UnderConstruction(villageId) { return DEF_PARTKEY_PREFIX + villageId + DEF_PARTKEY_UNDER_CONSTRUCTION; }
function gmExists_UnderConstruction() { return (gmLoad_UnderConstruction() != ""); }











/** save, reset, load, createKey - InfoDorf2 - <server>_<userId>_<villageId>_infoDorf2 */
// Saved info: 22 buildingType,buildingLevel pairs		- info to be added later: time, underConstruction
function gmSave_InfoDorf2(villageId, info) { GM_setValue(gmKey_InfoDorf2(villageId), info); }
function gmReset_InfoDorf2(villageId) { gmSave_InfoDorf2(villageId, ""); }
function gmLoad_InfoDorf2(villageId) { return gmLoad_UndefinedIsEmptyString(gmKey_InfoDorf2(villageId)); }
function gmKey_InfoDorf2(villageId) { return DEF_PARTKEY_PREFIX + villageId + DEF_PARTKEY_INFO_DORF1; }







/** retrieveMyProfile_Capital */
function retrieveMyProfile_Capital() {
	var capitalCoordsCell = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[3]/td[1]/span/../../td[3]')

	if (capitalCoordsCell.snapshotLength == 0) { // no capital village - reset capital
		gmResetCapitalVillageId();

	} else { // found the current capital village - save the current capital
		var capitalCoords = capitalCoordsCell.snapshotItem(0).innerHTML.split("|");
		var capitalVillageLink = xpEvalFirst('//div[@id="lright1"]/table/tbody/tr/td/table/tbody/tr/td[1][.="'+capitalCoords[0]+'"]/../td[3][.="'+capitalCoords[1]+'"]/../../../../../td/a');
		var capitalVillageId = getParamFromUrl(capitalVillageLink.href, "newdid");
		gmSaveCapitalVillageId(capitalVillageId);
	}
}

/** save, reset, load, createKey - CapitalVillageId - <server>_<userId>_capitalVillageId */
function gmSaveCapitalVillageId(capitalId) { GM_setValue(gmCreateKeyForCapitalVillageId(), capitalId); }
function gmResetCapitalVillageId() { gmSaveCapitalVillageId(""); }
function gmLoadCapitalVillageId() { return gmLoad_UndefinedIsEmptyString(gmCreateKeyForCapitalVillageId()); }
function gmCreateKeyForCapitalVillageId() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_CAPITALVILLAGEID; }



/** gmLoad_UndefinedIsEmptyString - if it is undefined then return empty string: "" */
function gmLoad_UndefinedIsEmptyString(key) { var val = GM_getValue(key); return ((val==undefined)?"":val); }


/** gmLoad_Unescape_UndefinedIsEmptyString - if it is undefined then make empty string; in any case, unescape it */
function gmLoad_Unescape_UndefinedIsEmptyString(key) { return unescape(gmLoad_UndefinedIsEmptyString(key)); }

/** gmSave_Escape - escape the value to be stored - minly for LANG dependant stuff */
function gmSave_Escape(key, value) { return GM_setValue(key, escape(value)); }


//===========================================================================================================
//===========================================================================================================
//======================  Travian Single Village / Add Village List functions  ==============================
//===========================================================================================================
//===========================================================================================================



/**
* createPermanentKeyForSingleVillageInfo
* Creates a key for permanent storing single village info.
* The key is of this format: <server>_<userId>_singleVillageInfo
*/
function createPermanentKeyForSingleVillageInfo() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_SINGLEVILLAGEINFO;
}

/**
* loadSingleVillageInfo
*/
function loadSingleVillageInfo() {
	var tmp = unescape(GM_getValue(createPermanentKeyForSingleVillageInfo()));
	return xmlToArray(tmp);
}

/**
* findAndSaveSingleVillageInfo
*/
function findAndSaveSingleVillageInfo() {
	if (isThisPageMyProfile()) {
		var coordsCells = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[3][not(@class)]');
		if (coordsCells.snapshotLength == 2) {
			var svCoords = coordsCells.snapshotItem(1).innerHTML.split("|");
			svCoords[0] = svCoords[0].replace("(", "");
			svCoords[1] = svCoords[1].replace(")", "");
			svCoords[2] = xpEvalFirst('//div[@id="lmid2"]/table/tbody/tr[3]/td[1]/a[1]').innerHTML;
			var oldInfo = loadSingleVillageInfo();
			svCoords[3] = oldInfo[3];
			GM_setValue(createPermanentKeyForSingleVillageInfo(), escape(arrayToXML(svCoords)));
		}
	}
	if (isThisPageDorf3()) {
		var villageLinksInOverviewTable = xpEvalFirst('//div[@id="lmid2"]/table/tbody/tr/td[@class="s7 li ou"]/a');
		if (villageLinksInOverviewTable) {
			var oldInfo = loadSingleVillageInfo();
			oldInfo[3] = getParamFromUrl(villageLinksInOverviewTable.href, "newdid");
			GM_setValue(createPermanentKeyForSingleVillageInfo(), escape(arrayToXML(oldInfo)));
		}
	}
}

/**
* transformPageAllPages_addVillagesList
*/
function transformPageAllPages_addVillagesList() {
	var lmidall = xpathEvaluate('//div[@id="lmidall"]').snapshotItem(0);
	var singleVillageInfo = loadSingleVillageInfo();
	lmidall.appendChild(createRightSideVillagesList(singleVillageInfo[3], singleVillageInfo[2], singleVillageInfo[0], singleVillageInfo[1]));
}



//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report pages extra functions  =====================================
//===========================================================================================================
//===========================================================================================================



/**
* getInfoPageAttackReport_getDateInfo
*/
function getInfoPageAttackReport_getDateInfo() {
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting building destructions");
	// getting building destruction cells
	var infoCells = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]/tbody/tr/td[@class="s7"]/div/img[@class="unit"]/../..');
	if (infoCells.snalshotLength == 0) { return; }

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting attack date");
	// getting attack date
	var dateCell = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[2]/td[last()]');
	var dateValue = dateCell.snapshotItem(0).firstChild.nodeValue;

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] getting links");
	// Getting player and village links for attacker and defender
	var previousLink = "";
	var isGettingAttacker = true;
	var fullServerName = getFullServerName();
	debug(DBG_HIGH, "[getInfoPageAttackReport_getDateInfo] fullServerName " + fullServerName);
	var attackerPlayerLink, attackerVillageLink, defenderPlayerLink, defenderVillageLink;
	var attackerDefenderLinks = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]/tbody/tr[@class="cbg1"]/td/a');
	for(var i=0; i<attackerDefenderLinks.snapshotLength; i++) {
		currentLink = attackerDefenderLinks.snapshotItem(i);
		// for extra external links (eg.: travian map services)
		if (currentLink.href.indexOf(fullServerName) != 0) { continue; }
		// for extra players/villages links (eg.: scout/fake links)
		if (currentLink == previousLink) { continue; }
		var uidParam = getParamFromUrl(currentLink.href, "uid");
		var dParam = getParamFromUrl(currentLink.href, "d");
		debug(DBG_LOW, "[getInfoPageAttackReport_getDateInfo] currentLink.href " + currentLink.href + " uidParam " + uidParam + " dParam " + dParam);
		if (isGettingAttacker) {
			if (!uidParam) { attackerVillageLink = currentLink; isGettingAttacker = false; } else { attackerPlayerLink = currentLink; }
		} else {
			if (!uidParam) { defenderVillageLink = currentLink; } else { defenderPlayerLink = currentLink; }
		}
		previousLink = currentLink;
	}

	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] create table");
	// create table
	var infoTable = document.createElement("table");
	var infoTbody = document.createElement("tbody");
	infoTable.className = "tbg QPnowrap";
	var idParam = getParamFromUrl(document.location.href, "id");
	for(var i=0; i<infoCells.snapshotLength; i++) {
		var infoRow = getInfoPageAttackReport_createInfoRow(idParam, attackerPlayerLink, attackerVillageLink, dateValue, defenderPlayerLink, infoCells.snapshotItem(i));

		debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] for - infoRow.innerHTML: " + infoRow.innerHTML);
		infoTbody.appendChild(infoRow);
	}
	infoTable.appendChild(infoTbody);
	var infoDiv = document.createElement("div");
	infoDiv.appendChild(infoTable);

//	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] show table");
	// show table
//	var reportsTitle = xpathEvaluate('//div[@id="lmid2"]/h1/..');
//	reportsTitle.snapshotItem(0).appendChild(infoTable.cloneNode(true));

	// save info
	var coordZ = getParamFromUrl(defenderVillageLink.href, "d");
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] coordZ " + coordZ);
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] infoTable.innerHTML " + infoTable.innerHTML);
	debug(DBG_NORMAL, "[getInfoPageAttackReport_getDateInfo] infoDiv.innerHTML " + infoDiv.innerHTML);
	savePermanentVillageReportInfo(coordZ, infoDiv.innerHTML);
}



/**
* getInfoPageAttackReport_createInfoRow
*/
function getInfoPageAttackReport_createInfoRow(reportId, attackerPlayerLink, attackerVillageLink,
												dateTimeString, defenderPlayerLink, infoCell) {
	var infoRow = document.createElement("tr");
	infoRow.id = reportId;

	var infoCellAttackerPlayer = document.createElement("td");
	infoCellAttackerPlayer.appendChild(attackerPlayerLink.cloneNode(true));
	infoRow.appendChild(infoCellAttackerPlayer);

	var infoCellAttackerVillage = document.createElement("td");
	infoCellAttackerVillage.appendChild(attackerVillageLink.cloneNode(true));
	infoRow.appendChild(infoCellAttackerVillage);

	var infoCellTime = document.createElement("td");
	infoCellTime.innerHTML = dateTimeString;
	infoRow.appendChild(infoCellTime);

	var infoCellDefenderPlayer = document.createElement("td");
	infoCellDefenderPlayer.appendChild(defenderPlayerLink.cloneNode(true));
	infoRow.appendChild(infoCellDefenderPlayer);

	var infoCellInfo = infoCell.cloneNode(true);
	infoRow.appendChild(infoCellInfo);

	return infoRow;
}




























/**
* savePermanentVillageReportInfo
*/
function savePermanentVillageReportInfo(villageId, villageReportInfo) {
	debug(DBG_LOW, "[savePermanentVillageReportInfo] villageReportInfo " + villageReportInfo);
	var key = createPermanentKeyForVillageReportInfo(villageId);
	debug(DBG_LOW, "[savePermanentVillageReportInfo] key " + key );
	GM_setValue(key, escape(villageReportInfo));
	debug(DBG_LOW, "[savePermanentVillageReportInfo] key " + key + " villageReportInfo " + villageReportInfo);
}

/**
* resetPermanentVillageReportInfo
*/
function resetPermanentVillageReportInfo(villageId) {
	savePermanentVillageReportInfo(villageId, "");
}

/**
* loadPermanentVillageReportInfo
*/
function loadPermanentVillageReportInfo(villageId) {
	debug(DBG_LOW, "[loadPermanentVillageReportInfo] villageId " + villageId);
	var key = createPermanentKeyForVillageReportInfo(villageId);
	debug(DBG_LOW, "[loadPermanentVillageReportInfo] key " + key);
	return unescape(GM_getValue(key));
}

/**
* createPermanentKeyForVillageReportInfo
* Creates a key for permanent storing report infos.
* The key is of this format: <server>_<userId>_<villageId>_reportInfo
*/
function createPermanentKeyForVillageReportInfo(villageId) {
	return DEF_PARTKEY_PREFIX + villageId + DEF_PARTIALPERMANENTMKEY_VILLAGEREPORTINFO;
}


































//===========================================================================================================
//===========================================================================================================
//==============================  Travian Quick Targets functions  ==========================================
//===========================================================================================================
//===========================================================================================================




/*
var hint_offset_x=-100;
var hint_offset_y=-100;
var hint_length=200;

var map=document.getElementsByName("map1")[0].childNodes;
for(var i=0;i<map.length;i++) {
	map[i].addEventListener('mouseover',hint_on,false);
	map[i].addEventListener('mouseout',hint_off,false);
}

var map2=document.getElementsByName("map2")[0].childNodes;
for(var i=0;i<map2.length;i++) {
	map2[i].addEventListener('mouseover',hint_on,false);
	map2[i].addEventListener('mouseout',hint_off,false);
}

var hintdiv=document.createElement('div');
hintdiv.setAttribute("id","hint");
hintdiv.setAttribute("style","position:absolute;z-index:200;display:none;top:0px;left:0px");
map[0].parentNode.insertBefore(hintdiv,map[0]);

document.addEventListener('mousemove',get_mouse,false);
*/
function hint_on(z){
	hint_text='<table bgcolor=\"#000000\" border=\"0\" cellpadding=\"6\" cellspacing=\"1\" width=\"'+hint_length+'\"><tr bgColor=#ffffe1><td style=\"font:11px Verdana;COLOR:#000000;\">' + z.target.title + '</td></tr></table>';
	hintdiv.innerHTML=hint_text;
	hintdiv.style.display='';
}
function hint_off(){
	hintdiv.style.display='none';
}

function get_mouse(z){
	var x=z.pageX;
	var y=z.pageY;
	hintdiv.style.top=y+hint_offset_y+'px';
	hintdiv.style.left=x+hint_offset_x+'px';
}

/**
* Adds a DIV to a page.
*/
function addDiv(id, className, innerHtml, parentNodeId){
	var parentNode, div;
	parentNode = (!parentNodeId) ? (document.getElementsByTagName('body')[0]) : (document.getElementById(parentNodeId));
	if (!parentNode) {return false;}
	div = document.createElement('div');
	if (id)		{div.id = id;}
	if (className)	{div.className = className;}
	if (innerHtml)	{div.innerHTML = innerHtml;}
	parentNode.appendChild(div);
	return div;
}

/**
* transformGeneric_addListenerVillageReportInfo
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerVillageReportInfo(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo]" + nodeA.id);
	var dParam = getParamFromUrl(nodeA.href, "d");
	var villageReportInfo = loadPermanentVillageReportInfo(dParam);

	// no info for this village
	if (villageReportInfo == "undefined") { return; }

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] villageReportInfo " + villageReportInfo);
	if (nodeA.parentNode.id == "") { nodeA.parentNode.id = dParam; }

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] before add div");
	var popupDiv = addDiv('QPVillageReport', 'QPpopup', villageReportInfo, nodeA.parentNode.id);

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] CREATED DIV \n popupDiv.innerHTML " + popupDiv.innerHTML + " \n popupDiv.style " + popupDiv.style);
	nodeA.addEventListener('mouseover', function() {
		debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] mouse is over \n popupDiv.innerHTML " + popupDiv.innerHTML + " \n popupDiv.style " + popupDiv.style);
		popupDiv.style.display = "";
	}, false);
	nodeA.addEventListener('mouseout', function() { popupDiv.style.display = "none";}, false);
/*	document.addEventListener('mousemove', function(z) {
		debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] mouse moving");
		var x=z.pageX;
		var y=z.pageY;
		popupDiv.style.top=y+'px';
		popupDiv.style.left=x+'px';

	} ,false);
*/

	debug(DBG_LOW, "[transformGeneric_addListenerVillageReportInfo] end");
}


/**
* transformGeneric_findTargetsToCreateTargetLinks
*/
function transformGeneric_findTargetsToCreateTargetLinks() {
	var pageSendTroopsNodeA = getLinksPageSendTroops();
	var pageVillagesNodeA = getLinksPageVillage();

//	//html > body > div #lmidall > div #lright1 > table .f10 > tbody > tr > td > a > img
	var ownVillagesTable = xpEvalFirst('//a[@class="active_vl"]/../../../..');

	debug(DBG_NORMAL, "[transformGeneric_findTargetsToCreateTargetLinks]");

	for(var i=0, len=pageSendTroopsNodeA.snapshotLength; i<len; i++) {
		var curr = pageSendTroopsNodeA.snapshotItem(i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] pageSendTroopsNodeA - i " + i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] curr: " + curr.href);

		var currParent4 = curr.parentNode.parentNode.parentNode.parentNode;	//table
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] currParent4: " + currParent4);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ownVillagesTable: " + ownVillagesTable);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] currParent4: \n" + currParent4.innerHTML);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ownVillagesTable: \n" + ownVillagesTable.innerHTML);
		if (currParent4 == ownVillagesTable) { continue }
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] ADDING QUICK LINKS");
		transformGeneric_addListenerHeroAttack(curr);
		transformGeneric_addListenerFakeAttack(curr);
		transformGeneric_addListenerScoutAttack(curr);
	}

	for(var i=0, len=pageVillagesNodeA.snapshotLength; i<len; i++) {
		var curr = pageVillagesNodeA.snapshotItem(i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] pageVillagesNodeA - i " + i);
		debug(DBG_LOW, "[transformGeneric_findTargetsToCreateTargetLinks] curr: " + curr.href);

		transformGeneric_addListenerFakeAttack(curr);
		transformGeneric_addListenerScoutAttack(curr);
		transformGeneric_addListenerVillageReportInfo(curr);
	}
}





/**
* transformGeneric_addListenerHeroAttack
* @param {HTMLAnchor} nodeA
*/

function listenerHeroAttack(nodeA) {
	debug(DBG_LOW, "[listenerHeroAttack] nodeA " + nodeA);

	var utm = createUniversalTroopsMove(0,0,0,0,0,0,0,0,0,0,1, DEF_ATTACKTYPE_RAID, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_RANDOM, DEF_CATATARGET_NONE);
	debug(DBG_LOW, "[listenerHeroAttack] utm " + utm);

	var coordZ = getCoordZfromHref(nodeA.href);
	debug(DBG_LOW, "[listenerHeroAttack] coordZ " + coordZ);
	savePermanentUniversalTroopsMove(coordZ, utm);
	debug(DBG_LOW, "[listenerHeroAttack] savePermanentUniversalTroopsMove ");

//	document.location.href = nodeA.href;
}



/**
* transformGeneric_addListenerScoutAttack
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerFakeAttack(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerFakeAttack]" + nodeA);
	var qsl = document.createElement("a");
	qsl.addEventListener('mouseup', function() { listenerFakeAttack(nodeA)}, false);
//	qsl.href = "#";
	qsl.href = nodeA.href;
	qsl.innerHTML = '<img width="14" height="14" src="' + IMGS_FAKE + '"/>';
	nodeA.parentNode.insertBefore(qsl, nodeA.nextSibling);
	nodeA.parentNode.insertBefore(document.createTextNode(" "), nodeA.nextSibling);
	debug(DBG_LOW, "[transformGeneric_addListenerFakeAttack]" + qsl.innerHTML);
}





function listenerFakeAttack(nodeA) {
	debug(DBG_LOW, "[listenerFakeAttack] nodeA " + nodeA);

	var utm = CONFIG_FAKE_ATTACK;
	debug(DBG_LOW, "[listenerFakeAttack] utm " + utm);

	var coordZ = getCoordZfromHref(nodeA.href);
	debug(DBG_LOW, "[listenerFakeAttack] coordZ " + coordZ);
	savePermanentUniversalTroopsMove(coordZ, utm);
	debug(DBG_LOW, "[listenerFakeAttack] savePermanentUniversalTroopsMove ");

//	document.location.href = nodeA.href;
}





/**
* transformGeneric_addListenerScoutAttack
* @param {HTMLAnchor} nodeA
*/
function transformGeneric_addListenerScoutAttack(nodeA) {
	debug(DBG_LOW, "[transformGeneric_addListenerScoutAttack]" + nodeA);
	var qsl = document.createElement("a");
	qsl.addEventListener('mouseup', function() { listenerScoutAttack(nodeA)}, false);
//	qsl.href = "#";
	qsl.href = nodeA.href;
	qsl.innerHTML = '<img width="14" height="14" src="' + IMGS_SCOUT + '"/>';
	nodeA.parentNode.insertBefore(qsl, nodeA.nextSibling);
	nodeA.parentNode.insertBefore(document.createTextNode(" "), nodeA.nextSibling);
	debug(DBG_LOW, "[transformGeneric_addListenerScoutAttack]" + qsl.innerHTML);
}



function listenerScoutAttack(nodeA) {
	debug(DBG_LOW, "[listenerScoutAttack] nodeA " + nodeA);

	var trib = loadPermanentMyTribe();
	debug(DBG_LOW, "[listenerScoutAttack]trib:" + trib);

	// get the correct input for scout units - gauls's scout is the 3rd unit ; roman/teuton's scout is the 4th unit
	var scoutIndex = (trib == TRIBE_GAUL) ? 3 : 4;

	var scoutQtty = CONFIG_SCOUT_QTTY;
	var scoutAttackType = CONFIG_SCOUT_TYPE;
	debug(DBG_LOW, "[listenerScoutAttack] scoutQtty " + scoutQtty + " scoutAttackType " + scoutAttackType);

//	var scoutQtty = 1;
//	var scoutAttackType = DEF_SCOUTTYPE_RESOURCES;
//	var scoutAttackType = DEF_SCOUTTYPE_DEFENSES;

	// creates the scout attack -
	var utm = createUniversalScoutAttack(scoutQtty, scoutIndex, scoutAttackType);

	var coordZ = getCoordZfromHref(nodeA.href);
	savePermanentUniversalTroopsMove(coordZ, utm);

//	document.location.href = nodeA.href;
}






//===========================================================================================================
//===========================================================================================================
//==============================  Travian Delayed Send Troops functions  ====================================
//===========================================================================================================
//===========================================================================================================

function createElementAppend(newElementTag, parentElement) {
	var newElement = document.createElement(newElementTag);
	parentElement.appendChild(newElement);
	return newElement;
}

function createElemAppendAndSetInner(newElementTag, parentElement, innerHTM) {
	var newElement = createElementAppend(newElementTag, parentElement);
	newElement.innerHTML = innerHTM;
	return newElement;
}


/**
* transformPageSendTroopsConfirm_addTimeOffArrivalSync
* Adds the timer for time of arrival.
* Herein original table is called "sendTable". An extra row is added with the name sendTableExtraRow.
* Inside that row, create 2 cells: [ action cell ] [ table ]
*/
function transformPageSendTroopsConfirm_addTimeOffArrivalSync() {
	var sendTable = xpEvalFirst('//form/table[@class="tbg"]/tbody/tr[last()]/..');

	// adds an extra row to the original sendTable
	var sendTableExtraRow  = createElementAppend("tr", sendTable);

	// creates the 2 cells like the above rows of the original table
	var dstCountdownCell   = createElemAppendAndSetInner("td", sendTableExtraRow, "??:??:??");
	var dstOutCell  = createElementAppend("td", sendTableExtraRow);
	dstOutCell.colSpan = 20;



	// create the form in the configuration cell
	var timerForm  = createElementAppend("form", dstConfigTOACell);
	timerForm.name = "timeSynchronizer";
	timerForm.innerHTML =
			'<select name="hours">' + dropDownListCreateNumericOptions(0, 24) + '</select>' +
			'<select name="minutes">' + dropDownListCreateNumericOptions(0, 60) + '</select>' +
			'<select name="seconds">' + dropDownListCreateNumericOptions(0, 60) + '</select>';

	// create the listener for the action button
	var timeout = null;
	var okButton = xpEvalFirst('//form/p/input[@name="s1"]');
	actionButton.addEventListener('click', function() {
		var confTime = xpathEvaluate('//form[@name="timeSynchronizer"]/select');
		var actualTime = xpEvalFirst('//span[@id="tp2"]');

		var actualTimeValue = timeColonSeparatedToValue(actualTime.innerHTML);
		var confTimeValue = time3ToValue(confTime.snapshotItem(0).value, confTime.snapshotItem(1).value, confTime.snapshotItem(2).value);
		var diffTimeValue = (confTimeValue > actualTimeValue) ? (confTimeValue - actualTimeValue) : (86400 + confTimeValue - actualTimeValue);
		var travelTimeValue = timeColonSeparatedToValue("" + travelTime);
		var launchTimeValue = (confTimeValue > travelTimeValue) ? (confTimeValue - travelTimeValue) : (86400 + confTimeValue - travelTimeValue);

		dstLaunchTimeCell.innerHTML = timeInSecondsToColonSeparatedTxt(launchTimeValue);
		dstCountdownCell.innerHTML = "<span id='QPtimer'>"+timeInSecondsToColonSeparatedTxt(diffTimeValue)+"</span>";
//		dstCountdownCell.innerHTML = timeInSecondsToColonSeparatedTxt(diffTimeValue);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync] diffTimeValue : " + diffTimeValue + " timeInSecondsToColonSeparatedTxt(diffTimeValue) " +timeInSecondsToColonSeparatedTxt(diffTimeValue));

		if (timeout != null) {	// changing the timer
			clearTimeout(timeout);
		} else {	// setting the timer for the first time
//			dstCountdownCell.id = "QPtimer";
			QPTimersCollect();
		}
		var delaySend = (diffTimeValue * 1000);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync]delaySend : " + delaySend);
		timeout = setTimeout( function() { okButton.click() } , delaySend);
		debug(DBG_HIGHEST, "[transformPageSendTroopsConfirm_addTimeOffArrivalSync]timeout : " + timeout);
	}, false);

}






//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report functions  =================================================
//===========================================================================================================
//===========================================================================================================





/**
* retrieveReportReinf_AppendToQPClipboard
*/
function retrieveReportReinf_AppendToQPClipboard() {

	var reinfTable = xpEvalFirst('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr/td/table[@class="tbg"]');

	var playerAndVillage = retrieveReportTable_PlayerAndVillage(reinfTable);

	var csv = 	retrieveReport_Subject().innerHTML + "," +
				retrieveReport_Time().innerHTML + "," +
				playerAndVillage[0].innerHTML + "," +
				playerAndVillage[1].innerHTML + "," +
				retrieveReportTable_Troops(reinfTable);

	appendPermanentQPClipboard(csv + "\n");
	debug(DBG_HIGHEST, "[retrieveReportReinf_AppendToQPClipboard] csv " + csv)
}

/** retrieveReport		Subject / Time */
function retrieveReport_Subject() {return xpEvalFirst('//div[@id="lmid2"]/table/tbody/tr[1]/td[2]'); }
function retrieveReport_Time() {return xpEvalFirst('//div[@id="lmid2"]/table/tbody/tr[2]/td[2]'); }

/** retrieveReportTable_PlayerAndVillage */
function retrieveReportTable_PlayerAndVillage(table) {
	var fullServerName = getFullServerName();
	var previousLink = "";

	var returnLinks = new Array();
	var tableLinks = xpathEvaluateInContext(table, 'tbody/tr/td/a');
	for(var i=0, len=tableLinks.snapshotLength; i<len; i++) {
		currentLink = tableLinks.snapshotItem(i);
		// for extra external links (eg.: travian map services)
		if (currentLink.href.indexOf(fullServerName) != 0) { continue; }
		// for extra players/villages links (eg.: scout/fake links)
		if (currentLink.href == previousLink.href) { continue; }
		var uidParam = getParamFromUrl(currentLink.href, "uid");
		if (uidParam) {
			returnLinks[0] = currentLink;
		} else {
			returnLinks[1] = currentLink;
		}
		previousLink = currentLink;
	}
	return returnLinks;
}




//===========================================================================================================
//===========================================================================================================
//==============================  Travian QP Clipboard functions  ===========================================
//===========================================================================================================
//===========================================================================================================



/** appendPermanentQPClipboard */
function appendPermanentQPClipboard(txt) {
	savePermanentQPClipboard(loadPermanentQPClipboard() + txt)
}

/** resetPermanentQPClipboard */
function resetPermanentQPClipboard() {
	savePermanentQPClipboard("");
}

/** savePermanentQPClipboard */
function savePermanentQPClipboard(txt) {
	GM_setValue(createPermanentKeyForQPClipboard(), txt);
}

/** loadPermanentQPClipboard */
function loadPermanentQPClipboard() {
	return GM_getValue(createPermanentKeyForQPClipboard());
}

/** createPermanentKeyForQPClipboard */
function createPermanentKeyForQPClipboard() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_QP_CLIPBOARD;
}




//===========================================================================================================
//===========================================================================================================
//==============================  Travian Quick Farm functions  =============================================
//===========================================================================================================
//===========================================================================================================



/**
* transformPageScoutReport_createQuickFarmInputs
*/
function transformPageScoutReport_createQuickFarmInputs() {
	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs]");

	// Sum up the resources found in the city
	var resQtty = xpathEvaluate('//tr[@class="cbg1"]/td[@class="s7"]/text()');
	var resTotal = 0;
	if (resQtty.snapshotLength > 0) {
		for(var i=0; i<4; i++) {
			resTotal += parseInt(resQtty.snapshotItem(i).nodeValue);;
		}
	}




//	var villageLinkNode = getLinkLastPageVillage();
	var villageLinkNodes = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td/a[contains(@href, "karte.php?d=")]');
	var defenderVillageLinkNode = villageLinkNodes.snapshotItem(villageLinkNodes.snapshotLength - 1);

	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs] villageLinkNode.href " + defenderVillageLinkNode.href);

	var inputRow = document.createElement("tr");
	var tdAttackType = document.createElement("td");

	var attackTypeChecked = (getTribeBySettlerTroopsInAnyPage(1) == TRIBE_GAUL) ?
								new Array ("checked", "") :
								new Array ("", "checked");

	tdAttackType.innerHTML =
			'<div class="f10"><input type="Radio" name="c" value="3" ' + attackTypeChecked[0] + '>Attack</div>' +
			'<div class="f10"><input type="Radio" name="c" value="4" ' + attackTypeChecked[1] + '>Raid</div>';

	var sendAllButton = document.createElement("a");
	sendAllButton.addEventListener('click', function() { addToFarmList(defenderVillageLinkNode, "sendAll")}, false);
	sendAllButton.name = "sendAll";
	sendAllButton.title = "Sends all troops types";
	sendAllButton.href = defenderVillageLinkNode.href;
	sendAllButton.innerHTML = "Send All";
	tdAttackType.appendChild(sendAllButton);

	inputRow.appendChild(tdAttackType);

	var tribe = getTribeBySettlerTroopsInAnyPage(0);
	debug(DBG_NORMAL, "[transformPageScoutReport_createQuickFarmInputs]: resTotal " + resTotal);
	var reportAttackerRows = xpEvalFirst('//tr[@class="cbg1"]/../tr[last()]');
	reportAttackerRows.parentNode.appendChild(inputRow);
}

/**
* suggestedTroopNumber
* @param {int} totalResQtty Total resources quantity.
* @param {int} troopNumber Number of the troop (index in the array of troopsBountyLoad).
* @param {int} tribe The tribe of the farmer.
*/
function suggestedTroopNumber(totalResQtty, troopIndex, tribe) {
	//debug(DBG_NORMAL, "[suggestedTroopNumber]: totalResQtty " + totalResQtty + " troopIndex " + troopIndex);

	if (totalResQtty == 0) {
		return 0;
	}
	var troopsAmount = 0;
	return troopsAmount;
}


function addToFarmList(nodeA, troopTypeTNumber) {
	debug(DBG_LOW, "[addToFarmList] nodeA " + nodeA + " document.location.href: " + document.location.href);

//	var attackType = xpathEvaluate('//input[@checked=true()]').snapshotItem(0).value;
//  IMPROVE THIS SINCE THIS IS RIDICULOUS!!!
	var attackTypeInputs = xpathEvaluate('//input[@type="radio"]');
	var attackType = 0;
	for(var i=0; i<attackTypeInputs.snapshotLength; i++) {
	}

	debug(DBG_LOW, "[addToFarmList] attackType " + attackType);

	var troopsToSend = xpathEvaluate('//input[@class="fm"]');

	// The send all sends the number of troops selected for each troop type, others clean the other troop fields
	if (troopTypeTNumber != "sendAll") {
	}

	var coordZ = getCoordZfromHref(nodeA.href);

	var utm = createUniversalTroopsMoveXpathIterator(troopsToSend, attackType, DEF_SCOUTTYPE_RESOURCES, 0, 0);
	savePermanentUniversalTroopsMove(coordZ, utm);
}










//===========================================================================================================
//===========================================================================================================
//==============================  Travian Report List pages extra functions  ================================
//===========================================================================================================
//===========================================================================================================




/** searchCPValue */
function searchCPValue(cpValue, cpArray) {
	for(var i=0, len=cpArray.length; i<len; i++) {
		if (cpValue < cpArray[i]) {
			return i;
		}
	}
	return i;
}


/** createElemTravianTable */
function createElemTravianTable(tableTitle, tableParent, isTitleSingleCell) {
	var table = createElementAppend('table', tableParent);
	table.className = "tbg";
	table.cellSpacing = "1";
	table.cellPadding = "2";

	var tbody = createElementAppend('tbody', table);

	var tr = createElementAppend('tr', tbody);
	tr.className = "rbg";

	var td = createElemAppendAndSetInner('td', tr, tableTitle);

	if (isTitleSingleCell) {
		td.colSpan = "0";
	}

	return tbody;
}

/** createElemTravianButton */
function createElemTravianButton(buttonText, buttonParent, buttonId) {//, buttonEventListenerFunction) {
	var button = document.createElement('input');
	button.type = "button";
	button.value = buttonText;
	button.id = buttonId;
	button.className = "std";
//	button.addEventListener('click',	function() {buttonEventListenerFunction();}, true);
	buttonParent.appendChild(button);
	return button;
}


/** isThisPageReportListToDeletePage */
function isThisPageReportListToDeletePage() { return gmLoad_ReportsAction().indexOf(document.location.href) >= 0; }


/** isToDeleteReportsOfGivenType */
function isToDeleteReportsOfGivenType() {
	var exists = gmExists_ReportsAction();
	debug(DBG_HIGHEST, "[isToDeleteReportsOfGivenType] gmExists_ReportsAction() " + exists);
	return exists;
}




/** save, reset, load, createKey, exists - ReportsAction - <server>_<userId>_reportsAction */
// Saved info: url of type of report to delete
function gmSave_ReportsAction(reportAction) { GM_setValue(gmKey_ReportsAction(), reportAction); }
function gmReset_ReportsAction() { gmSave_ReportsAction(""); }
function gmLoad_ReportsAction() { return gmLoad_UndefinedIsEmptyString(gmKey_ReportsAction()); }
function gmKey_ReportsAction() { return DEF_PARTKEY_PREFIX + DEF_PARTKEY_REPORTSACTION; }
function gmExists_ReportsAction() { return (gmLoad_ReportsAction() != ""); }









//===========================================================================================================
//===========================================================================================================
//==============================  Travian Rally Point extra info functions  =================================
//===========================================================================================================
//===========================================================================================================



/**
* getInfoRallyPoint_CreateIncomingAttacksReport
*/
function getInfoRallyPoint_CreateIncomingAttacksReport() {
	var reinfsWord = loadPermanentLang_Reinforcements();
	if (reinfsWord == undefined) { return; }

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport]  ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] activeVillageCoordZ " + activeVillageCoordZ);

	var txt = "";
	txt += getActiveVillageNameAndCoords() + " ";
	var cropName = xpEvalFirst('//img[@class = "res"][contains(@src, "img/un/r/4.gif")][@title]');
	txt += cropName.title + ": ";

	txt += g_res_now[3] + "/" + g_res_max[3] + " " + ((g_res_prod[3] >= 0) ? "+" : "") + g_res_prod[3];
	txt += "\nhttp://speed.travian.com/karte.php?z=" + activeVillageCoordZ;

	// selects tables for moving troops that aren't from this city (the reinfs are filtered out in the for cycle)
	var incomingAttacksTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td[1][not(img)]/../../../../../../../tbody/tr[1]/td[1]/a[not(contains(@href, ' + activeVillageCoordZ + '))]/../../..');

	for(var i=0; i<incomingAttacksTables.snapshotLength; i++) {
		var currentTable = incomingAttacksTables.snapshotItem(i);
		var currentTableRow0 = currentTable.rows[0];
		if (currentTableRow0.cells[1].innerHTML.indexOf(reinfsWord) != 0) {
			txt += "\n" + removeAllTags(currentTableRow0.cells[0].innerHTML);
			txt += " " + currentTableRow0.cells[1].innerHTML;
			var currentTableRow3 = currentTable.rows[3];
			txt += "\n" + removeAllTags(currentTableRow3.cells[0].innerHTML);
			txt += " " + removeAllTags(currentTableRow3.cells[1].innerHTML).replace(/(\n|&nbsp;)/g, "");
		}
	}
	debug(DBG_HIGHEST, "[getInfoRallyPoint_CreateIncomingAttacksReport] txt \n" + txt);
	// ??????????????????????????????????

	var overviewSendWarsimParagraph = xpEvalFirst('//div[@id="lmid2"]/p[@class="txt_menue"]');
	overviewSendWarsimParagraph.appendChild(document.createTextNode(" | "));
	var defReport = createElemAppendAndSetInner("a", overviewSendWarsimParagraph, '<img src="img/un/a/def2.gif" />');
	defReport.addEventListener('click',	function() {
		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] QPCreateDefReport");
//		savePermanentReportsAction(DEF_ACTION_DELETE_TRADE);
//		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] tradeLink.snapshotItem(0).href " + tradeLink.snapshotItem(0).href);
//		document.location.href = tradeLink.snapshotItem(0).href;
	}, true);
}





/**
* savePermanentLang_Reinforcements
*/
function savePermanentLang_Reinforcements(txt) {
	GM_EscapeAndSave(createPermanentKeyForLangReinforcements(), txt);
}

/**
* loadPermanentLang_Reinforcements
*/
function loadPermanentLang_Reinforcements() {
	return GM_LoadAndUnescape(createPermanentKeyForLangReinforcements());
}

/**
* createPermanentKeyForLangReinforcements
* Creates a key for permanent storing the word for reinforcements as used in the Rally Point.
* The key is of this format: <server>_<userId>_lang_reinforcements
*/
function createPermanentKeyForLangReinforcements() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS;
}






/**
* transformPageRallyPoint_addOwnTownTotalTroopsTable
* Simplifies rally point page by adding a table with the total troops own'ed by this town, no matter
* where they are currently. This avoids checking multiple locations to see own many troops this town has.
* Troops that go or are already in an oasis owned by the current town, cannot be counted on the oasis because
* they already at the "on the way" or the "in other villages" groups.
*/
function transformPageRallyPoint_addOwnTownTotalTroopsTable() {
	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] activeVillageCoordZ " + activeVillageCoordZ);

	// selects tables with troops from current town OR the oasis titles
	var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ownTroopsTables.snapshotLength " + ownTroopsTables.snapshotLength);
	if (ownTroopsTables.snapshotLength > 0) {
		var newTable = ownTroopsTables.snapshotItem(0).cloneNode(true);
		var newTableTitleRow = newTable.rows[0];
		var newTableIconsRow = newTable.rows[1];
		var newTableTroopsRow = newTable.rows[2];

		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] BEfor");
		for(var i=1, len=ownTroopsTables.snapshotLength; i<len; i++) {	// table 0 is the cloned one above
			var currentTable = ownTroopsTables.snapshotItem(i);

			// doesn't count on oasis to not double count
			if (currentTable.nodeName == "P") { break; }

			var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);
			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] i "+i+" currentTroopsCells.snapshotLength " + currentTroopsCells.snapshotLength);

			// creates the hero column in case it wasn't in the "totals" table but the hero belongs to this town now
			if (currentTroopsCells.cells.length == 12) {
				// clone the hero icon cell
				var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
				newTableIconsRow.appendChild(currentTroopsHeroIconCell.cloneNode(true));
				// create the hero amount cell (with 0 amount, it will be added as normal)
				var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
				newHeroAmountCell.innerHTML = 0;
				newTableTroopsRow.appendChild(newHeroAmountCell);
			}

			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] adding troops");
			// ADDS UP THE TROOPS
		}
		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] greying totals");
		// make the totals 0s greyed out and the non-0s non-grayed out
		// change the title row
		var newTableTitleCell = newTableTitleRow.cells[0];
		newTableTitleRow.innerHTML = "";
		newTableTitleRow.appendChild(newTableTitleCell);
		newTableTitleCell.colSpan = 0;
		// remove all and re-insert the 1st 3 rows - removes the upkeep/arrival row
		newTable.innerHTML = "";
		newTable.appendChild(newTableTitleRow);
		newTable.appendChild(newTableIconsRow);
		newTable.appendChild(newTableTroopsRow);
		// add the newly created table with the totals
		var paragraph = xpEvalFirst('//div[@id="lmid2"]/p[@class="f10"]');
		paragraph.parentNode.insertBefore(newTable, paragraph.nextSibling);
	}
}






//===========================================================================================================
//===========================================================================================================
//==============================  Travian Universal Troops Move functions  ==================================
//===========================================================================================================
//===========================================================================================================




/**
* createUniversalTroopsMove
*/
function createUniversalTroopsMove(troop1, troop2, troop3, troop4, troop5, troop6,
								troopRams, troopCatas, troopSenator, troopSettler, troopHero,
								attackType, scoutType, catapultTarget1, catapultTarget2) {
	// check validity of attackType/scoutType/catapultTargets
	if ((attackType<2) || (attackType>4)) { GM_log("Invalid attack type"); throw "Invalid attack type"; }
	if ((scoutType<1) || (scoutType>2)) { GM_log("Invalid scout type"); throw "Invalid scout type"; }
	checkValidCatapultTarget(catapultTarget1);
	checkValidCatapultTarget(catapultTarget2);

	var arr = [troop1, troop2, troop3, troop4, troop5, troop6, troopRams, troopCatas, troopSenator,
				troopSettler, troopHero, attackType, scoutType, catapultTarget1, catapultTarget2];

	return arrayToXML(arr);
}

function checkValidCatapultTarget(cataTarget) {
	if ((cataTarget<0) ||  (cataTarget>99)) { throw "Invalid catapult target. id: " + cataTarget; }
	if ((cataTarget>30) &&  (cataTarget<37)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
	if ((cataTarget>37) &&  (cataTarget<99)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
}



/**
* resetPermanentUniversalTroopsMove
*/
function resetPermanentUniversalTroopsMove(destVillageCoordZ) {
	savePermanentUniversalTroopsMove(destVillageCoordZ, "");
}

/**
* loadPermanentUniversalTroopsMove
*/
function loadPermanentUniversalTroopsMove(destVillageCoordZ) {
	var key = createPermanentKeyForInstantTroopsMove(destVillageCoordZ);
	var tmp = GM_getValue(key);
	if (tmp == "") { return null; }
	return xmlToArray(tmp);
}


/**
* createPermanentKeyForInstantTroopsMove
* Creates a key for permanent storing of instant troop moving (includes all attacks and reinfs).
* The key is of this format: <server>_<userId>_<destinationVillageCoordZ>_instantTroopsMove
* @param {int} destinationVillageCoordZ
*/
function createPermanentKeyForInstantTroopsMove(destinationVillageCoordZ) {
	return DEF_PARTKEY_PREFIX +
			destinationVillageCoordZ + DEF_PARTIALPERMANENTMKEY_INSTANTTROOPMOVE;
}



/** isToMoveTroopsToThisVillage */
function isToMoveTroopsToThisVillage() { return isToMoveTroopsToVillage(document.location.href); }



/**
* actionPageSendTroopsConfirmation_universalTroopsMove
*/
function actionPageSendTroopsConfirmation_universalTroopsMove(url) {
	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove]");

	var destVillageCoordZ = getCoordZfromHref(url);
	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove]coordZ");
	var utm = loadPermanentUniversalTroopsMove(destVillageCoordZ);

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] scout ");

	// scout attack
	var scoutAttackRadioInputs = xpathEvaluate('//input[@name="spy"]');
	if (scoutAttackRadioInputs.snapshotLength > 0) {

		xpEvalFirst('//input[@name="spy"][@value="' + utm[DEF_UTM_SCOUTTYPEINDEX] + '"]').checked = true;
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] cata 1");

	// catapult1 attack
	var cataTargetInputs = xpathEvaluate('//select[@name="kata"]');
	if (cataTargetInputs.snapshotLength > 0) {
		cataTargetInputs.snapshotItem(0).value = utm[DEF_UTM_CATATARGET1INDEX];
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] cata 2");

	// catapult2 attack
	var cataTargetInputs = xpathEvaluate('//select[@name="kata2"]');
	if (cataTargetInputs.snapshotLength > 0) {
		debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] utm[DEF_UTM_CATATARGET2INDEX] "+ utm[DEF_UTM_CATATARGET2INDEX]);
		cataTargetInputs.snapshotItem(0).value = utm[DEF_UTM_CATATARGET2INDEX];
	}

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] coordZ "+ destVillageCoordZ);
	resetPermanentUniversalTroopsMove(destVillageCoordZ);

	debug(DBG_LOW, "[actionPageSendTroopsConfirmation_universalTroopsMove] pressing OK");
	var okButton = xpEvalFirst('//input[@name="s1"]');
	randomDelay(98, 173, function() {okButton.click()});
}











//===========================================================================================================
//===========================================================================================================
//==============================  Travian Replace Coords by Links functions  ================================
//===========================================================================================================
//===========================================================================================================


var DEF_GRAPHIC_PACK_ACTIVE;
var DEF_GRAPHIC_PACK_PREFIX;


function transformPageAllianceForumMsgs_createLinks() {
	getGraphicPackPathPrefix();
	var msgTxtFields = xpathEvaluate('//td[@class = "row11"]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}

function transformPageIGM_createLinks() {
//	var msgTxtFields = xpathEvaluate('//td[@background="img/en/msg/underline.gif"]');
	var msgTxtFields = xpathEvaluate('//td[contains(@background, "/msg/underline.gif")]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}


function getGraphicPackPathPrefix() {
	var woodImgUrl = "img/un/r/1.gif";
	var graph = xpathEvaluate('//img[contains(@src, "img/un/r/1.gif")]');
	if (graph.snapshotLength > 0) {
		var imgSrc = graph.snapshotItem(0).src;
		DEF_GRAPHIC_PACK_ACTIVE = imgSrc.length > woodImgUrl.length;
		DEF_GRAPHIC_PACK_PREFIX = imgSrc.replace(woodImgUrl, "").replace("///", "//");
	}
}

function transformGeneric_replaceUriByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/\w+:\/\/[^\s<]+/g, replaceUriByLink);
	txtNode.innerHTML = res;
}
function replaceUriByLink(match) {
	if (DEF_GRAPHIC_PACK_ACTIVE) {
		if (match.indexOf(DEF_GRAPHIC_PACK_PREFIX) > -1) {
			return match;
		}
	}
	return "<a href='" + match + "'>" + match + "</a>";
}



function transformGeneric_replaceAllCoordsByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/-?\d+\|-?\d+/g, replaceCoordsByLink);
	txtNode.innerHTML = res;
}


function replaceCoordsByLink(match) {
	var arrMatch = match.split("|", 2);
	var coord = coordsXYToZ(parseInt(arrMatch[0]), parseInt(arrMatch[1]));
	return "<a href='karte.php?z=" + coord + "'>" + match + "</a>";
}


//===========================================================================================================
//===========================================================================================================
//==========================================  Travian URL functions  ========================================
//===========================================================================================================
//===========================================================================================================





/** isThisPageTravianTeamMessagePage */
function isThisPageTravianTeamMessagePage() {
	//http://speed.travian.com/dorf1.php?ok
	return (xpEvalFirst('//a[contains(@href, "?ok")]'));
}


/** isThisPageTravianTeamMessagePage_ConstructionPlans */
function isThisPageTravianTeamMessagePage_ConstructionPlans() {
	// UNTESTED - this is hard to test since it only happens once per round
	if (isThisPageTravianTeamMessagePage()) {
		// the image also contained: style="float: right; padding-left: 10px;"
		var treasuryImage = xpathEvaluate('//div[@id="lmid2"]/img[contains(@src, "gid27.gif")]');
		return (treasuryImage.snapshotLength > 0);
	}
	return false;
}



// ========================================================
// =====   Travian URL functions - Village Pages      =====
// ========================================================

/** Is the page a page of a village in the map */
function isThisPageVillage() { return isPageVillage(document.location.href); }
function isPageVillage(url) {
	if (isPageAnyKartePage(url)) {
		return getParamFromUrl(url, "d");
	}
	return false;
}

var DEF_VILLAGETYPE_OWNEDVILLAGE = 1;
var DEF_VILLAGETYPE_OWNEDOASIS = 2;
var DEF_VILLAGETYPE_UNCLAIMEDVILLAGE = 3;
var DEF_VILLAGETYPE_UNCLAIMEDOASIS = 4;

var DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C = 5;	// f1
var DEF_VILLAGETYPE_VILLAGE_3W_4C_5I_6C = 6;	// f2
var DEF_VILLAGETYPE_VILLAGE_4W_4C_4I_6C = 7;	// f3
var DEF_VILLAGETYPE_VILLAGE_4W_5C_3I_6C = 8;	// f4
var DEF_VILLAGETYPE_VILLAGE_5W_3C_4I_6C = 9;	// f5
var DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C = 10;	// f6

var DEF_VILLAGETYPE_VILLAGE_CROPPER_9 = DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C;	// f1
var DEF_VILLAGETYPE_VILLAGE_CROPPER_15 = DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C;	// f6

/** What type of village page is this (occupied village, unclaimed village, occupied oasis, unclaimed oasis) */
function isThisPageVillage_UnclaimedOasis() {	return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_UNCLAIMEDOASIS); }
function isThisPageVillage_UnclaimedVillage() { return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_UNCLAIMEDVILLAGE); }
function isThisPageVillage_OwnedOasis() {		return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_OWNEDOASIS); }
function isThisPageVillage_OwnedVillage() {		return (isThisPageVillage_WhatType() == DEF_VILLAGETYPE_OWNEDVILLAGE); }
function isThisPageVillage_WhatType() {
	debug(DBG_NORMAL, "[isThisPageVillage_WhatType]");
	if (isThisPageVillage()) {
	debug(DBG_NORMAL, "[isThisPageVillage_WhatType] is this page village...");
		var mapDetailsRight = xpEvalFirst('//div[@id="lmid2"]/div[@class="map_details_right"]');
		if (mapDetailsRight.id == "pr") {
			// unclaimed territory -> abandoned oasis / abandoned valley
			var resources = xpathEvaluateInContext(mapDetailsRight, 'table/tbody/tr/td/img[@class="res"]');
			if (resources.snapshotLength == 4) {
				// how many resources of each type there are
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_UNCLAIMEDVILLAGE " + DEF_VILLAGETYPE_UNCLAIMEDVILLAGE);
				return DEF_VILLAGETYPE_UNCLAIMEDVILLAGE;
			} else {
				// no resources means it is an oasis (with or without troops)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_UNCLAIMEDOASIS " + DEF_VILLAGETYPE_UNCLAIMEDOASIS);
				return DEF_VILLAGETYPE_UNCLAIMEDOASIS;
			}
		} else {
			// claimed territory -> someone's village / someone's oasis
			var lastRow = xpathEvaluateInContext(mapDetailsRight, 'table/tbody/tr[last()]/td[last()]/a');
			if (lastRow.snapshotLength == 1) {
				// last row of the table has a link (oasis links to the village)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_OWNEDOASIS " + DEF_VILLAGETYPE_OWNEDOASIS);
				return DEF_VILLAGETYPE_OWNEDOASIS;
			} else {
				// last row of the table has no links (village has the population in the last row)
				debug(DBG_NORMAL, "[isThisPageVillage_WhatType] DEF_VILLAGETYPE_OWNEDVILLAGE " + DEF_VILLAGETYPE_OWNEDVILLAGE);
				return DEF_VILLAGETYPE_OWNEDVILLAGE;
			}
		}
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Map Pages          =====
// ========================================================

/** Is the page any map page */
function isThisPageAnyKartePage() { return (isPageAnyKartePage(document.location.href)); }
function isPageAnyKartePage(url) { return (url.search(/karte\.php/) != -1); }

/** Is the page a extended map page - the 13x13 map from Plus */
function isThisPageKarte2MapPage() { return (isPageKarte2MapPage(document.location.href)); }
function isPageKarte2MapPage(url) { return (url.search(/karte2\.php/) != -1); }

function isThisPageKarte2EmptyMapPage() {
	if (isThisPageKarte2MapPage()) {
		return (document.getElementsByTagName('map').length == 0)
	}
	return false;
}

/** Is the page a normal map page */
function isThisPageMapPage() {
	var url = document.location.href;
	if (isPageAnyKartePage(url)) {
		if (getParamFromUrl(url, "z")) {	// map with specific coordinates
			return true;
		} else {
			return xpEvalFirst('//map[@id="karte"]');
		}
	}
	return false;
}



// ========================================================
// =====   Travian URL functions - Dorf Pages         =====
// ========================================================

/** Is the page a dorf3 page */
function isThisPageDorf3() { return (isPageDorf3(document.location.href)); }
function isPageDorf3(url) { return (url.search(/dorf3\.php/) != -1); }


/** Is the page a dorf1 page */
function isThisPageDorf1() { return (isPageDorf1(document.location.href)); }
function isPageDorf1(url) { return (url.search(/dorf1\.php/) != -1); }


/** Is the page a dorf2 page */
function isThisPageDorf2() {
	var url = document.location.href;
	if (url.search(/dorf2\.php/) != -1) { return true; }
	return isThisPageDorf2AlthoughTheLocationIsABuilding();
}
// In case of town switch when was inside a building that doesn't exist in the newly selected town
function isThisPageDorf2AlthoughTheLocationIsABuilding() {
	var url = document.location.href;
	if (url.search(/build\.php/) != -1) {
		var maps = xpathEvaluate('//map[contains(@name, "map")]');
		return (maps.snapshotLength == 2);
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Statistics Pages   =====
// ========================================================


/** Is the page of any Statistics page */
function isThisPageAnyStatisticsPage() { return (isPageAnyStatisticsPage(document.location.href)); }
function isPageAnyStatisticsPage(url) { return (url.search(/statistiken\.php/) != -1); }


/** Is the page of Wonder of the World Statistics */
function isThisPageWWStatistics() { return (isPageWWStatistics(document.location.href)); }
function isPageWWStatistics(url) {
	if (isPageAnyStatisticsPage(url)) {
		return (getParamFromUrl(url, "id") == 6);
	}
	return false;
}



// ========================================================
// =====   Travian URL functions - Building Pages     =====
// ========================================================

/** Is the page any building page */
function isThisPageAnyBuildingPage() { return (isPageAnyBuildingPage(document.location.href)); }
function isPageAnyBuildingPage(url) {
	if (url.search(/build\.php/) != -1) {	// may be building, but may be dorf2
		return (!isThisPageDorf2AlthoughTheLocationIsABuilding());
	}
	return false;
}




/** Is the page of the Rally Point */
function isThisPageRallyPoint() { return (isPageRallyPoint(document.location.href)); }
function isPageRallyPoint(url) {
	if (getParamFromUrl(url, "id") == 39) { return true; }
	if (getParamFromUrl(url, "gid") == 16) { return true; }

	// check for the 3 links of the rally point (Overview | Send troops | Combat-Simulator)
	var rallyPointLinks = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]/a');
	if (rallyPointLinks.snapshotLength > 2) {
		// all 3 links above were found
		return true;
	}
	return false;
}


// ========================================================
// =====   Travian URL functions - Profile Pages      =====
// ========================================================

/** Is the page a profile page */
function isThisPageProfile() { return (isPageProfile(document.location.href)); }
function isPageProfile(url) { return (url.search(/spieler\.php\?uid=/) != -1); }

/** Is this page my profile page */
function isThisPageMyProfile() {
	return false;
}


// ========================================================
// =====   Travian URL functions - IGM Pages          =====
// ========================================================

/** Is the page any IGM page (IGM or IGM List) */
function isThisPageAnyIGMPage() { return (isPageAnyIGMPage(document.location.href)); }
function isPageAnyIGMPage(url) { return (url.search(/nachrichten\.php/) != -1); }

/** Is the page a single IGM page */
function isThisPageIGM() { return (isPageIGM(document.location.href)); }

/** Is the page the IGM list page */
function isThisPageIGMList() { return (isPageIGMList(document.location.href)); }
// ========================================================
// =====   Travian URL functions - Report Pages       =====
// ========================================================

/** Is the page any report page (any report or any report List) */
function isThisPageAnyReportPage() { return (isPageAnyReportPage(document.location.href)); }
function isPageAnyReportPage(url) { return (url.search(/berichte\.php/) != -1); }












// ========================================================
// =====   Travian URL functions - Alliance Pages     =====
// ========================================================

/** Is the page any report page (any report or any report List) */
function isThisPageAnyAlliancePage() { return (isPageAnyAlliancePage(document.location.href)); }
function isPageAnyAlliancePage(url) { return (url.search(/allianz\.php/) != -1); }


/** Is the page an ingame alliance forum page */
function isThisPageAllianceForumMsgs() { return (isPageAllianceForumMsgs(document.location.href)); }
function isPageAllianceForumMsgs(url) {
	if (url.indexOf("/allianz.php?s=2&t=") != -1) {
		return true;
	}
}


/** Is the page an ingame alliance forum page */
function isThisPageAllianceAttacks() { return (isPageAllianceAttacks(document.location.href)); }
function isPageAllianceAttacks(url) {
	if (url.indexOf("/allianz.php?s=3") != -1) {
		return true;
	}
}


/** Is the page any page of my alliance page */
function isThisPageAnyMyAlliancePage() {
	if (isThisPageAnyAlliancePage()) {
		var myAllianceLinks = xpEval('//div[@id="lmid2"]/p[@class="txt_menue"]/a[contains(@href, "allianz.php?s=")]');
		return (myAllianceLinks.snapshotLength >= 4);
	}
}


/** Is the page the overview page of my alliance */
function isThisPageMyAllianceOverviewPage() {
	if (isThisPageAnyMyAlliancePage()) {

		var myAlliancePlayers = xpEval('//div[@id="lmid2"]/table[2][@class="tbg"]/tbody/'
					+ '/tr[@class="rbg"][count(td)="5"]/..'
					+ '/tr'
						+ '/td[1][@align="right"]/..'
						+ '/td[2][@class="s7"]/a[contains(@href, "spieler.php?uid=")]/../..'
						+ '/td[5]/img[contains(@src, "img/un/a/b")][@title][@width="12"][@height="12"]/../..'
		);
		return (myAlliancePlayers.snapshotLength >= 1);
	}
}




// ========================================================
// =====   Travian URL functions - Send Troop Pages   =====
// ========================================================

/** Is the page any send troops page (send without target, send with target, confirm send) */
function isThisPageAnySendTroopsPage() { return (isPageAnySendTroopsPage(document.location.href)); }
function isPageAnySendTroopsPage(url) { return (url.search(/a2b\.php/) != -1); }


/** Is the page a send troops page (send without target, send with target) */
function isThisPageSendTroops() {
	var url = document.location.href;
	if (isPageAnySendTroopsPage(url) != -1) {
		var troopsInputs = xpathEvaluate('//input[@class = "fm"]');
		return (troopsInputs.snapshotLength >= 13);	// 10 troops + 3 village (1name+2coords)
	}
}







/**
* isPageLogout
*/
function isPageLogout(url) {
	if (stringEndsWith(url, "/logout.php")) {
		return true;
	}
}






/**
* getLinkPageVillage
* @return Node of a link to a village page.
*/
function getLinkLastPageVillage() {
	var links = getLinksPageVillage();
	if (links.snapshotLength > 0) {
		return links.snapshotItem(links.snapshotLength - 1);
	}

	return null;
}





var DEF_RES_WOOD = 1;
var DEF_RES_CLAY = 2;
var DEF_RES_IRON = 3;
var DEF_RES_CROP = 4;

// villageTypeF, id
DEF_RESOURCETYPE_IN_VILLAGE = new Array();
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_3W_3C_3I_9C - 4] = [DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_3W_4C_5I_6C - 4] = [DEF_RES_IRON, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_4W_4C_4I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_4W_5C_3I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_5W_3C_4I_6C - 4] = [DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_WOOD, DEF_RES_CLAY, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_IRON, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_WOOD, DEF_RES_CLAY];
DEF_RESOURCETYPE_IN_VILLAGE[DEF_VILLAGETYPE_VILLAGE_1W_1C_1I_15C - 4] = [DEF_RES_CROP, DEF_RES_CROP, DEF_RES_WOOD, DEF_RES_IRON, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CROP, DEF_RES_CLAY, DEF_RES_CROP, DEF_RES_CROP];


/**
* getResourceTypeFromVillageTypeAndPosition
*/
function getResourceTypeFromVillageTypeAndPosition(villageTypeF, id) {
	var villageTypeNumber = parseInt(villageTypeF.substr(1));
	return DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber][id];
}

/**
* searchResourcePositionFromType
*/
function searchResourcePositionFromType(villageTypeNumber, resourceType) {
	for(var i=0, len=DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber].length; i<len; i++) {
		if (DEF_RESOURCETYPE_IN_VILLAGE[villageTypeNumber][i] == resourceType) {
			return i;
		}
	}
	return -1;	// if this happens something is wrong with the code
}



//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Coordinates functions  ===================================
//===========================================================================================================
//===========================================================================================================



/**
* coordsXYToZ
*
* @param {int} x The X coordinate of a map location.
* @param {int} y The Y coordinate of a map location.
*
* @return The absolute coordinate of a town / abandoned valley / oasis.
*/
function coordsXYToZ(x, y) {
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}


/**
* coordZToX
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The X coordinate of the map location indicated by Z.
*/
function coordZToX(z) {
	var x = ((z - 1) % 801) - 400;
	return x;
}


/**
* coordZToY
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The Y coordinate of the map location indicated by Z.
*/
function coordZToY(z) {
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}


/**
* coordZToXYReadableString
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return A string containing the normal in-game readable coordinates: "(X|Y)".
*/
function coordZToXYReadableString(z) {
	res = "(" + coordZToX(z) + "|" + coordZToY(z) + ")";
	return res;
}

/**
* globeDistance - indicates the minimum distance between 2 X coordinates or 2 Y coordinates
* taking into account the fact that -400 and 400 are next to each other
*/
function globeDistance(a, b) {
	var dist1 = (a > b) ? Math.abs(a-b) : Math.abs(b-a);
	var dist2 = (a > b) ? (Math.abs(400-a)+Math.abs(-400-b)) : (Math.abs(400-b)+Math.abs(-400-a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;

	return distFinal;
}

/** coordDistZtoZ */
function coordDistZtoZ(z1, z2) {
	return coordDistXYtoXY(coordZToX(z1), coordZToY(z1), coordZToX(z2), coordZToY(z2));
}

/**
* coordDistXYtoXY - calculates the distance between 2 villages in the map
*/
function coordDistXYtoXY(x1, y1, x2, y2) {
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX*distX) + (distY*distY));
//	debug(DBG_LOW, "[coordDistXYtoXY] x1 "+x1+" y1 "+y1+" x2 "+x2+" y2 "+y2+" distX "+distX+" distY "+distY+" dist "+dist);

	return dist;
}

/** coordZMoveX */
function coordZMoveX(z, moveX) {
	var x = coordZToX(z);
	var y = coordZToY(z);
	x = ((x + 400 + moveX) % 801) - 400;
	return coordsXYToZ(x, y);
}

/** coordZMoveX */
function coordZMoveY(z, moveY) {
	var x = coordZToX(z);
	var y = coordZToY(z);
	y = ((y + 400 + moveY) % 801) - 400;
	return coordsXYToZ(x, y);
}

/** coordZMoveXY */
function coordZMoveXY(z, moveX, moveY) {
	var x = coordZToX(z);
	var y = coordZToY(z);
	x = ((x + 400 + moveX) % 801) - 400;
	y = ((y + 400 + moveY) % 801) - 400;
	return coordsXYToZ(x, y);
}



//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Generic functions  =======================================
//===========================================================================================================
//===========================================================================================================


/**
* getActiveTownLink
*/
function getActiveTownLink() {
	var activeVillageLink = xpEvalFirst('//a[@class="active_vl"]');
	return activeVillageLink;
}


/**
* getActiveVillageNameAndCoords
*/
function getActiveVillageNameAndCoords() {
	var activeVillageLink = xpEvalFirst('//a[@class="active_vl"]');
	var activeVillageCoords = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var txt = activeVillageLink.innerHTML + " " +
				activeVillageCoords.snapshotItem(0).innerHTML +
				activeVillageCoords.snapshotItem(1).innerHTML +
				activeVillageCoords.snapshotItem(2).innerHTML;
	return txt;
}


/**
* getActiveTownId
*/
function getActiveTownId() {
	var activeTownLink = getActiveTownLink();
	return getParamFromUrl(activeTownLink.href, "newdid");
}



/**
* isVillageListPresent
*/
function isVillageListPresent() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	return (activeVillageLink.snapshotLength > 0);
}





/**
* getActiveVillageCoordZ
*/
function getActiveVillageCoordZ() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var coordXCurrentActiveVillage = -10000;
	var coordYCurrentActiveVillage = -10000;
	if (activeVillageLink.snapshotLength > 0) {
		coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
		coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
	}
	return coordsXYToZ(coordXCurrentActiveVillage, coordYCurrentActiveVillage);
}







//===========================================================================================================
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
//===========================================================================================================


/** Gets the time in miliseconds */
function QPcurrentTimeMilis() { return new Date().getTime(); }

/** Gets the time in seconds */
function QPcurrentTimeSecs() { return Math.round(QPcurrentTimeMilis()/1000); }






//===========================================================================================================
//===========================================================================================================
//================================  Generic Permanent Save/Load functions  ==================================
//===========================================================================================================
//===========================================================================================================



/**
* GM_EscapeAndSave
* @param {string} key
* @param {string} value
*/
function GM_EscapeAndSave(key, value) {
	debug(DBG_LOW, "[GM_EscapeAndSave] key " + key + " txt " + value);
	GM_setValue(key, escape(value));
}

/**
* GM_LoadAndUnescape
* @param {string} key
* @return {string} value
*/
function GM_LoadAndUnescape(key) {
	var ret = GM_getValue(key);
	return (ret == undefined) ? ret : unescape(ret);
}



//===========================================================================================================
//===========================================================================================================
//=======================================  Generic time functions  ==========================================
//===========================================================================================================
//===========================================================================================================



/**
* timeInSecondsToColonSeparatedTxt
* Transforms a time in seconds to the string with the following format hh:mm:ss .
*/
function timeInSecondsToColonSeparatedTxtWithDays(secs) {
	var d = Math.floor((secs/86400));
	var h = Math.floor((secs%86400)/3600);
	var m = Math.floor((secs%3600)/60);
	var s = Math.floor((secs%60));
	return time4ToText(d, h, m, s);
}

/**
* time4ToText
* Transforms a time from the days, hour, minutes and seconds to a single text string in the following format: d,hh:mm:ss.
*/
function time4ToText(d, h, m, s) {
debug(DBG_HIGHEST, "[time4ToText] "
	 + " d " + d
	 + " h " + h
	 + " m " + m
	 + " s " + s
	);

	var txtTime = "";
	if (d!=0) {	// Days comma space 0_if_Hours_is_less_than_10
		txtTime += d + ", " + ((h<10)?"0":"");
	}
	txtTime += time3ToText(h, m, s);
	return txtTime;
}

/** timeDaysToSeconds - transforms*/
function timeDaysToSeconds(d) {	return (parseInt(d * 86400)); }

/**
* timeInSecondsToColonSeparatedTxt
* Transforms a time in seconds to the string with the following format hh:mm:ss .
*/
function timeInSecondsToColonSeparatedTxt(secs) {
	var h = Math.floor(secs/3600);
	var m = Math.floor((secs%3600)/60);
	var s = Math.floor((secs%60));
	return time3ToText(h, m, s);
}


/**
* time3ToText
* Transforms a time from the hour, minutes and seconds to a single text string in the following format: hh:mm:ss.
*/
function time3ToText(h, m, s) {
	var txtTime = "" + (h) + ":" + ((m < 10)?("0"+m):m) + ":" + ((s < 10)?("0"+s):s);
//	var txtTime = "" + ((h < 10)?("0"+h):h) + ":" + ((m < 10)?("0"+m):m) + ":" + ((s < 10)?("0"+s):s);
	return txtTime;
}


/**
* timeColonSeparatedToValue
* Transforms a time from the format hh:mm:ss to a single value in seconds.
*/
function timeColonSeparatedToValue(txt) { var t = txt.split(":"); return time3ToValue(t[0], t[1], t[2]); }


/**
* time3ToValue
* Transforms a time from the hour, minutes and seconds to a single value in seconds.
*/
function time3ToValue(h, m, s) { var v = (3600 * parseInt(h)) + (60 * parseInt(m)) + (1 * parseInt(s)); return v; }





//===========================================================================================================
//===========================================================================================================
//==============================  Extended GreaseMonkey Get / Set functions  ================================
//===========================================================================================================
//===========================================================================================================




function GM_QP_getValue(key) {
	var val = GM_getValue(key);
	return (val == undefined) ? false : val;
}


//===========================================================================================================
//===========================================================================================================
//=======================================  Generic helper functions  ========================================
//===========================================================================================================
//===========================================================================================================


/**
* removeAllTags
* Removes all tags, to allow getting similar to what a user copy-paste would get.
*/
function removeAllTags(txt) {
	var strTagStrippedText = txt.replace(/<\/?[^>]+(>|$)/g, "");
	return strTagStrippedText;
}


/**
* dropDownListCreateNumericOptions
* Creates a numeric drop down list from (including) start to (excluding) end.
*/
function dropDownListCreateNumericOptions(start, end) {
	var res = "";
	for(var i=start; i<end; i++) {
		res += '<option value="' + i + '">' + i + '</option>';
	}
	return res;
}



/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}



/**
* arrayToXML
* @param {Array of primitive types} arr
*/
function arrayToXML(arr) {
	var res = "<array>";
	if (arr) {
		for(var i=0; i<arr.length; i++) {
			res += "<arrayNode>" + arr[i] + "</arrayNode>";
		}
	}
	res += "</array>";

	return res;
}

/**
* xmlToArray - converts the XML string to an array of values
* @param {xml string} xmlString A string of XML nodes with a depth of 2 (1 container + 1 repeatable list of nodes)
*								like this: <globalContainer><node></node>...<node></node></globalContainer>
*/
function xmlToArray(xmlString) {

	if (xmlString) {
		if (window.ActiveXObject) { // code for IE

			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(xmlString);

		} else { // code for Mozilla, Firefox, Opera, etc.

			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlString,"text/xml");
		}
		var x = doc.documentElement;

		var res = new Array();
		for(var i=0; i<x.childNodes.length; i++) {
			if (x.childNodes[i].childNodes.length == 0) {
				res.push("");
			} else {
				for(var j=0; j<x.childNodes[i].childNodes.length; j++) {
//					debug(DBG_LOWEST, "[xmlToArray] i["+i+"] j["+j+"] " + x.childNodes[i].childNodes[j].nodeValue);
					res.push(x.childNodes[i].childNodes[j].nodeValue);
				}
			}
		}
		return res;
	} else {
		return null;
	}
}



/**
* stringEndsWith - true if the other string is the final part of the original string (or if both don't exist)
*/
function stringEndsWith(original, other) {
	if (!original && ! other) { // none exists = true
		return true;
	}

	if (original && other) { // both exist check...
		var pos = original.indexOf(other);
		if ((pos + other.length) == original.length) { // pos of other string + it's size == original's string = true
			return true;
		} else { // "other" may or may not exist in "original", but not at the end
			return false;
		}
	} else { // only one exists = false
		return false;
	}
}



/**
* Toggles printing debug info.
* @param {int} verbosity Integer to indicate if a debug message should really be printed or not (like a priority).
* @param {String} txt The text to be printed.
*/
function debug(verbosity, txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: if (verbosity <= DEBUG_VERBOSITY) { GM_log(txt); } break;
 		default: break;
 	}
}

/** dbg - calls debug with highest verbosity */
function dbg(txt) { debug(DBG_HIGHEST, txt); }




/**
* Toggles printing debug info.
* @param {String} txt The text to be printed.
*/
function debugOLD(txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: GM_log(" ### DEPRECATED DEBUG MESSAGE ### " + txt); break;
 		default: break;
 	}
}


/**
* randomDelay
* @param {int} min
*/
function randomDelay(min, max, callMethod) {
	var rnd = random(min, max);
	debug(DBG_LOWEST, "[TQS][randomDelay] delaying: " + rnd);
	window.setTimeout(function() {callMethod()}, rnd);
}


/**
* randomDelay
* @param {int} min
*/
function random(min, max) {
	var range = max - min + 1;
    var ranNum = Math.floor(Math.random() * range) + min;
    return ranNum;
}







/** xpEval - Returns an ordered snapshot of the matched nodes. */
function xpEval(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

/** xpEvalFirst - Returns the first matched node. */
function xpEvalFirst(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }

/** xpEvalContext - Returns an ordered snapshot of the matched nodes in the given context. */
function xpEvalContext(context, xpathExpr) { return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

/** xpEvalContext - Returns the first matched node in the given context. */
function xpEvalContextFirst(context, xpathExpr) { return document.evaluate(xpathExpr, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }

/** xpEvalDoc - Returns an ordered snapshot of the matched nodes in the given document. */
function xpEvalDoc(doc, context, xpathExpr) { return doc.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

/** xpEvalDocFirst - Returns the first matched node in the given document. */
function xpEvalDocFirst(doc, xpathExpr) { return doc.evaluate(xpathExpr, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }

/**
* xpHtmlEvaluate
* Alias for the "someXMLDoc.evaluate" method specific for HTML.
* In HTML some params are not useful, so they are set to null.
* @param {Document} doc Document from where to search.
* @param {Node} context Node from which to start the to search in the document.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @param {String} resType Result type (first node; ordered snapshot; ...).
* @return A XPathResult with either node or some other possible result type.
*/
function xpHtmlEvaluate(doc, context, xpathExpr, resType) {
	return doc.evaluate(xpathExpr, context, null, resType, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {Node} context Node from where to search.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* ajaxDocument - NOT TESTED
*/
function ajaxDocument(reqUrl, reqMethod, reqParam, onSuccessFunction, onSuccessFunctionParam) {

	var answer = document.createElement("div");
	debug(DBG_HIGHEST, "[GM_registerMenuCommand] going to request");
	GM_xmlhttpRequest({
		method: 'GET',
		url: reqUrl,
		headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
		onload: function(responseDetails) {
//			debug(DBG_HIGHEST, '[ajaxDocument] Status ' + responseDetails.status + ' '
//								+ responseDetails.statusText + '\nData:\n' + responseDetails.responseText);

			answer.innerHTML = responseDetails.responseText;
//			debug(DBG_HIGHEST, "[ajaxDocument] " + answer.innerHTML);
			var answerDoc = document.implementation.createDocument("", "", null);
			answerDoc.appendChild(answer);
//			debug(DBG_HIGHEST, "[ajaxDocument] " + answerDoc.innerHTML);
			onSuccessFunction(answerDoc, onSuccessFunctionParam);
		}
	});
}







//###############################    CONFIGURATIONS     ########################################

// ##########   FAKE ATTACK CONFIGS   ##########
// creates some fakes types to be used below
var __CONFIG_FAKE_ATTACK_LEGG_PHALX_CLUB = 				createUniversalTroopsMove(1,0,0,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_PRAET_SWORD_PIKE = 			createUniversalTroopsMove(0,1,0,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_IMP_GAULSCOUT_AXE = 			createUniversalTroopsMove(0,0,1,0,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_SCOUT_THUNDER_SCOUT = 			createUniversalTroopsMove(0,0,0,1,0,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_EQIMPS_DRUID_PALADIN = 		createUniversalTroopsMove(0,0,0,0,1,0,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_EQCAESAR_HAEDUAN_TEUTONKNIGHT =createUniversalTroopsMove(0,0,0,0,0,1,0,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_RAM = 							createUniversalTroopsMove(0,0,0,0,0,0,1,0,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_NONE, DEF_CATATARGET_NONE);
var __CONFIG_FAKE_ATTACK_CATA = 						createUniversalTroopsMove(0,0,0,0,0,0,0,1,0,0,0, DEF_ATTACKTYPE_ATTACK, DEF_SCOUTTYPE_DEFENSES, DEF_CATATARGET_RANDOM, DEF_CATATARGET_NONE);
// configures the fake attack
var CONFIG_FAKE_ATTACK = __CONFIG_FAKE_ATTACK_PRAET_SWORD_PIKE;

// ##########   SCOUT ATTACK CONFIGS   ##########
var CONFIG_SCOUT_QTTY = 1;
var CONFIG_SCOUT_TYPE = DEF_SCOUTTYPE_RESOURCES;

// ##########   Resource info and counters   ##########
var CONFIG_FEATURE_RESOURCES_INFO = 0;	// 0 - disable; 1 - production only; 2 - timer only; 3 - both
var CONFIG_FEATURE_RESOURCES_INFO_POSITION_ABOVE = true;	// true - above; false below

// ##########   Village Targets - true = enables this; false = disables it   ##########
var CONFIG_FEATURE_VILLAGE_TARGETS = false;

// ##########   Title Fix - options 1 to 3 all append the title of current page, any other disables this   ##########
// 1 - Keeps original title and adds the title inside the page
// 2 - Crops original title and adds the title inside the page (eg.: "Travian comx" -> "T com9")
// 3 - Removes original title and adds the title inside the page

var CONFIG_TITLEFIX = 2;


// ##########   Server Type - Used for Culture Point handling   ##########
var DEF_TRAVIAN_SERVER_TYPE_2 = 1;
var DEF_TRAVIAN_SERVER_TYPE_3 = 2;
var DEF_TRAVIAN_SERVER_TYPE_SPEED = 3;
var CONFIG_TRAVIAN_SERVER_TYPE = DEF_TRAVIAN_SERVER_TYPE_3;


//#################################################################################################


main();


},false);
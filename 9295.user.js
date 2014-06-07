// ==UserScript==
// @name            Facebook profile home country flags
// @namespace       http://code.google.com/p/ecmanaut/
// @version         1.1: Now handles state info sans country marking too, at least for US and Canadian states.
// @version         1.0: Initial release.
// @description     Decorates facebook profile names with a leading flag, denoting the person's home country. Flags c/o http://www.famfamfam.com/lab/icons/flags/
// @include         http://*.facebook.com/profile.php?*
// @xpath     name: //div[@class="profile_name"]/h2
// @xpath?   state: id("Hometown")/td/div/a[contains(@href,"&r1=")]
// @xpath? country: id("Hometown")/td/div/a[contains(@href,"&k1=")]
// ==/UserScript==

if( typeof GM_xpath == "undefined" )
  GM_xpath = {
    name: $X('//div[@class="profile_name"]/h2'),
   state: $X('id("Hometown")/td/div/a[contains(@href,"&r1=")]'),
 country: $X('id("Hometown")/td/div/a[contains(@href,"&k1=")]')
  };

// Famfamfam lacks flags for ids 102,190,302,399,405,451,468 =
// Curacao, APO, Abuja, Akrotiri, Ashmore and Cartier Islands,
// Sao Tome and Principe, and the Channel Islands. The others:
var flags = {65:87,67:108,68:99,69:90,70:188,72:19,73:206,74:130,75:107,76:158,77:105,78:181,79:53,80:238,81:11,82:213,83:167,84:71,85:77,86:104,87:118,88:115,89:169,90:161,91:216,94:137,95:164,97:216,98:120,99:55,100:226,103:149,104:183,105:156,106:51,109:148,110:116,111:12,112:33,113:223,114:64,118:42,119:179,120:239,121:61,122:28,123:1,124:163,128:84,130:29,131:228,132:27,135:9,136:98,138:86,139:211,141:168,142:174,143:145,144:26,145:57,146:106,147:157,148:187,149:155,151:237,153:95,154:177,155:217,158:123,159:222,160:59,161:235,162:46,163:200,164:162,165:18,166:96,167:214,168:65,169:92,170:89,174:22,175:52,176:34,177:32,178:97,181:25,182:140,183:127,186:229,188:110,192:236,194:201,195:199,197:135,200:66,201:195,202:219,203:176,204:131,206:233,208:17,209:43,211:117,212:192,213:15,215:49,217:73,219:218,221:10,226:94,227:48,228:73,229:151,231:101,232:102,233:2,234:8,235:20,236:16,251:147,271:126,278:3,281:128,284:13,285:103,286:180,287:56,288:73,290:227,294:132,295:190,297:93,299:186,303:80,310:45,311:166,312:72,320:5,326:35,327:73,358:175,364:121,368:75,369:21,372:7,385:23,390:74,393:153,395:63,397:207,398:221,400:58,401:0,402:4,403:204,404:6,406:24,407:30,408:38,409:203,410:112,411:37,412:54,413:209,414:83,416:68,417:70,418:67,419:76,420:165,421:173,422:78,423:79,424:81,425:88,426:111,427:109,428:125,429:124,430:129,431:122,432:139,433:133,434:146,435:136,436:144,437:134,438:141,439:142,440:138,441:150,442:159,444:114,445:39,446:182,447:113,448:225,449:232,450:194,452:185,453:193,454:184,455:196,456:197,457:205,458:212,459:210,460:215,461:230,462:224,463:62,464:69,466:60,469:73,470:40,472:119,473:240};

function getFlag( id, name ) {
  if( !flags.hasOwnProperty( id ) ) return "";
  var x = flags[id], w = {238:11, 239:9}[x] || 16, h = {240:12}[x] || 11;
  x = x * 16 - ({239:5, 240:12}[x]||0);
  return '<div style="width:'+ w +'px; height:'+ h +'px; margin:3px 5px 0 0; '+
    'background:url(http://hacks.ecmanaut.googlepages.com/famfamfamflags.png)'+
    ' -'+ x +'px 0; float:left;" alt="'+ name +'" title="'+ name +'"></div>';
}

function decorate( profile ) {
  try {
    var id = profile.country.search.match( /&k1=(\d+)/ )[1];
  } catch(e) {
    try {
      id = parseInt( profile.state.search.match( /&r1=(\d+)/ )[1], 10 );
      if (id < 66) { // US
        id = 398;
        profile.country = { textContent:profile.state.textContent +", USA" };
      }
      else if(id > 99999) {
        id = 326; // CA :-)
        profile.country = { textContent:profile.state.textContent +", Canada" };
      } else
        return; // don't know
    } catch(e) {
      return; // Wasn't a country/state we know about, or no country specified
    }
  }
  var h2 = profile.name;
  h2.innerHTML = getFlag( id, profile.country.textContent ) + h2.innerHTML;
}

decorate( GM_xpath );


function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:  return got.stringValue;
    case got.NUMBER_TYPE:  return got.numberValue;
    case got.BOOLEAN_TYPE: return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}

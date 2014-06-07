
try{
	var currenttime =new Date();
	var bench=node('div','benchid','noclass','position:absolute;top:2px;left:2px;color:black;font-size:9px','0' );
	document.getElementById('GF_toolbar').appendChild(bench);		
} catch(e){}

var queryserver=getserverindex();
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);
	world = RegExp.$1;
var country=queryserver[0];
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;var scheduler=[[0,0]];var bubbles=0;var timelapse=0;var islandsearch;var islandsearchs=0;var rand=Math.floor(Math.random()*65535);var tm=90000;if(!GM_getValue("GlobRand")) GM_setValue("GlobRand", Math.floor(Math.random()*65535));var globrand=GM_getValue("GlobRand");
var getbody=document.getElementsByTagName('body')[0];
var core_vers=65;
var ika="http://www.ika-core.org/search";
var LocalizationStrings	=unsafeWindow.LocalizationStrings;
var IKARIAM				=unsafeWindow.IKARIAM;
var YAHOO				=unsafeWindow.YAHOO;
var Dom					=unsafeWindow.Dom;
var woodCounter			=unsafeWindow.woodCounter;
var wineCounter			=unsafeWindow.wineCounter;
var tradegoodCounter	=unsafeWindow.tradegoodCounter;
var tmpCnt				=unsafeWindow.tmpCnt;

var XPFirst		= XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList		= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter		= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	= XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var debug=0;

Alliance	=	GM_getValue("AllianceColor","#0000FF");
Allies		=	GM_getValue("AlliesColor","cyan");
NoAlliance	=	GM_getValue("NoAllianceColor","purple");
Enemies		=	GM_getValue("EnemiesColor","red");

//IMAGES
var bulbinimg='data:image/gif;base64,R0lGODlhDgAVAPcAAAAAAP///1BPVV5dZF9eZmVkbF5eZlxcZF5fZ11eZlxdZXx9g1lbY19haXByeXJ0e0tOVk9SWlNWXl1gaFteZl9ial5haWVocGRnb2JlbW5xeWxvd2tudlZaYlhcZFtfZ2hsdG1xeXl9haGlrV9jarG1vExRWVRZYVpfZ15ja11ialtgaGFmbmBlbV9kbGJnb2ludmhtdWdsdG5ze2xxeXJ3f3F2fnB1fXh9hXd8hHZ7g3V6gnR5gXN4gHyBiXuAiHl+hoOIkIGGjoCFjYqPl4iNlYeMlIaLk4WKkoSJkZGWnpCVnY+UnI6Tm42SmoyRmYuQmJidpZabo5SZoZOYoJ2iqpugqKOosLC1va2yuqyxuZeZmTY2Nf/+3P/82Pbz1e7py/XuzLizm8rFq8G8o7u2np6Zg7OtlcK8o5mXj5yWgbavl6agiqCahaujiqafiaGYfpyTe7uymZqTfqSejn93ZIiAbYiBb4+Jeqqfh5CHc6OZg6ieiL2ymomAbqKYhKiein99eyQkJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIMALAAAAAAOABUAAAj4AAcJHJRjB48ZMVgMXChESJAhOWrEaLFwUBIiTZ4QSVKlhA8VA4c4abKECZQiU7BoQYKCYBInSqhEYULkSJIsVlAc0BGkyY0oUqhAOfKDBpIRK2wIITKjRo8bMGS46IDjyocZQI4YoQHFyUMeJ1ioQBGDB5AgSWA8FMGAgwsUKF7QsKHjB4sFOzRIYEFiRcsCMDY88OAgBIgIDQwkGGjhBYYLETIImFBBQUUKCFKYUAFhAIGKAsVsoZMmEJ4zoAe9AfSli5w/alKjsZMHTh0/a1Kz2RPGSx8+c1KT0eMmzp02ZVKbGQOm+RgzqQdxmS5IUHSBALJXDAgAOw=='; 
var heartimg='data:image/gif;base64,R0lGODlhDwAPANUvAL0vAOo7AP9CAcUxANE0APM9AN84APU9ANg2ANw3AMgyALIsAPo/AcAwAP9GAf9DALAsAP9FAbwvAN03ALguAMIwAMMxAOU5AP9DAfY+AOA4APw/AOE4AP9FAMcyAKAoALcuAKQpAKsrALMtALsVFbQUFK4rAK8sAP9HAP9IAQEBAaEoAM40AMwzAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJGQAvACwAAAAADwAPAAAGgsCXcEgsCl3IItI1dIEsLOaRZQExXaMGaxK4BiasxghJUSACDIFKwAggFBSkpGUoCCKOiKBgaEmQACwcGRgOKQ4YGRwsAFd0dnh6fC1SLmZoAhhsbgpSLy5bAQUZBV9RRC5QCAYcBghUnkcNCi0sLQoNsU0UEgAScUZNJicmukZLRkEAIfkEBRkALwAsAAAAAA8ADwAABmvAl3BILBqPRJeyqHQNXSFSxSl0VUghqqsEIFycrgsBUNJCBonDw/U4JAYQ7cKj2XRQnY3Gs6C+XGhqHW1vfn9dFwcbB2IAhn8VBAkaCQRTRi4LAAMeAwB9Ry4iEAsQIo9JHysfqExLSLBDQQA7';
var smackimg='data:image/gif;base64,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';
var sunshineimg='data:image/gif;base64,R0lGODlhKgAXALP/AAAAAP7zAPvKAPicAP///+7u7tzc3NHR0cbGxsDAwLCwsJGRkR4eHh0dHQAAAAAAACH5BAEAAAkALAAAAAAqABcAQAT3MMlJq70419bSOQkHBCQpnAPAeZ/SYY2SMA2jMAxShMDZC4MgQMhRLHIKQGL30lBK0GjJeekUEAwDgXBoSAMnYDAGMBgAshVVA2i31/DKdx6vJ9xvu4Wj2xKYJG0lbWNLfkwZfAc4EowNYZAoQQNkaEkKiBQNCw14HJ8SQ5OjKRR4KptNequsrXoka7Cus3afoHcjYD5KIbZqVHwFW4BSklZ+BjROwQXCBMmDuQGEQQwHzc2LqhvWWNZmCI9RkJNkCgdtB+HbKwc3MjgI4T6RQmMKSWhtZsoTMTQEOG1C0EtUCjyTlODBxyecpl8ZqCXkFTEPLT0RAAA7';
var spyimg='data:image/gif;base64,R0lGODlhEQASAOZLAAAAAI/Kgf/yHP6oDf6kDP6xDo/Yg0Y6J4/hho/dhP/pGf61Do/Sgv7FEP6sDe/v7urp6NfW0/7CD5pwG1VLM01BLlZGLfnuImNWM31yXvb29v65Dv39/f7KEEJBPf69D2NXQESdlnFjOv7ZFT5/ev/tG+zylLq4soBdJuz0lWlcO5uYjbWWI/zhGIiAbv/kGJiDQ5KMeG5hRuvglui/FteMEf///+vome6qEJWQfOubD8vk49mYEuTtxV9UOuTuxT2IhElFO++9EuL32ubUOePamUJCP+3VHXVoRVtILJHYgf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAARABIAQAfUgEuCSxo5SCoiKjIxGoNLNgAGkpIADQABmJgAjoMnHkEeJ5xLAKWmACUKLaemghkTGwsFpgMEBBMZjiswFwK+CqojNBgrggAhCQjKygBKDAyZJJsuLA3WErIFDgO1Ey6OEAc8DhblBDUHEKMRIkS9qUcsIBGODxS9vgIKLyMdHUIHHpDaMcSEiRQpALwAcONHjxlFpB1LkKAURQDPSmECsokCKwkfZp2iICgChg0fsBXQxq1WEnqCHhzAIWtbLQI6Ao6CAAJFhZ8ofKgb5YiDEQ5EAwEAOw==';
var korniza='data:image/png;base64,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';
var gradient='data:image/png;base64,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';
var ximg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjMxN4N3hgAAAOVJREFUKFNjYACC%2FwwM64D4FhQ7QMUOI4lJgsTgACjhAMT%2FoRikeQ4S3w9FMYwDtQWmCUZX%2Bfj4HAbiW1CMsAmoIeY7M%2FNjmMknxMUfABXNAeL%2FUIxqE1ChMRB3v2Fn%2F7xTVvb%2FQnV1mEIQXYXhLKBimCf%2Fv%2BDk%2FPWUmxumYQ42xSBPgkLp%2F1MurkUwZ22XkzuNYTo0hECKQTZ0gzx5k5%2F%2FG8gGkE0gz6IHaTc0hECKQZ681WRi8v%2BCsPClK4KC%2F0FsrH4ACjpAgw4UjN0gU5GDFMMfIEVAvA6mGKrBD2oryBBwsAIAPx6aHBmyUZsAAAAASUVORK5CYII%3D";
var searchimg='data:image/png;base64,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';


var building = { townHall: 0, townhall: 0, port: 3, academy: 4, shipyard: 5, barracks: 6, warehouse: 7, wall: 8, tavern: 9, museum: 10, palace: 11, embassy: 12,  branchOffice: 13, workshop: 15, "workshop-army": 15, "workshop-fleet": 15,  safehouse: 16, palaceColony: 17, resource: 1, tradegood: 2, forester: 18,  stonemason: 19, glassblowing: 20, winegrower: 21, alchemist: 22,  carpentering: 23, architect: 24, optician: 25, vineyard: 26, fireworker: 27};
var resmap = { g: "/skin/resources/icon_gold.gif",  w:"/skin/resources/icon_wood.gif", W:"/skin/resources/icon_wine.gif", M:"/skin/resources/icon_marble.gif", C:"/skin/resources/icon_glass.gif", S:"/skin/resources/icon_sulfur.gif", t:"/skin/resources/icon_time.gif", p:"/skin/resources/icon_population.gif", a:'maxActionPoints'};

var upgrade = [
[{},{w:158,t:"59m 4s"},{w:335,t:"1h 6m"},{w:623,t:"1h 14m"},{w:923,M:285,t:"1h 23m"},{w:1390,M:551,t:"1h 34m"},{w:2015,M:936,t:"1h 48m"},{w:2706,M:1411,t:"2h 3m"},{w:3661,M:2091,t:"2h 21m"},{w:4776,M:2945,t:"2h 42m"},{w:6173,M:4072,t:"3h 6m"},{w:8074,M:5664,t:"3h 35m"},{w:10281,M:7637,t:"4h 8m"},{w:13023,M:10214,t:"4h 48m"},{w:16424,M:13575,t:"5h 34m"},{w:20986,M:18254,t:"6h 27m"},{w:25423,M:23250,t:"7h 30m"},{w:32285,M:31022,t:"8h 44m"},{w:40232,M:40599,t:"10h 10m"},{w:49286,M:52216,t:"11h 51m"},{w:61207,M:68069,t:"13h 49m"},{w:74804,M:87316,t:"16h 6m"},{w:93956,M:115101,t:"18h 48m"},{w:113035,M:145326,t:"21h 56m"},{w:141594,M:191053,t:"1d 1h"},{w:170213,M:241039,t:"1d 5h"},{w:210011,M:312128,t:"1d 10h"}],,,
[{w:60,t:"8m 24s"},{w:150,t:"23m 6s"},{w:274,t:"30m 21s"},{w:429,t:"38m 41s"},{w:637,t:"48m 15s"},{w:894,M:176,t:"59m 17s"},{w:1207,M:326,t:"1h 11m"},{w:1645,M:540,t:"1h 26m"},{w:2106,M:791,t:"1h 43m"},{w:2735,M:1138,t:"2h 2m"},{w:3537,M:1598,t:"2h 24m"},{w:4492,M:2176,t:"2h 50m"},{w:5689,M:2928,t:"3h 19m"},{w:7103,M:3859,t:"3h 53m"},{w:8850,M:5051,t:"4h 31m"},{w:11094,M:6628,t:"5h 16m"},{w:13731,M:8566,t:"6h 7m"},{w:17062,M:11089,t:"7h 6m"},{w:21097,M:14265,t:"8h 14m"},{w:25965,M:18241,t:"9h 32m"},{w:31810,M:23197,t:"11h 2m"},{w:39190,M:29642,t:"12h 45m"},{w:47998,M:37636,t:"14h 43m"},{w:58713,M:47703,t:"17h 14s"}],
[{w:64,t:"16m 48s"},{w:68,t:"22m 34s"},{w:115,t:"29m 28s"},{w:263,t:"37m 46s"},{w:382,C:225,t:"47m 43s"},{w:626,C:428,t:"59m 40s"},{w:982,C:744,t:"1h 14m"},{w:1330,C:1089,t:"1h 31m"},{w:2004,C:1748,t:"1h 51m"},{w:2665,C:2454,t:"2h 16m"},{w:3916,C:3786,t:"2h 46m"},{w:5156,C:5216,t:"3h 21m"},{w:7446,C:7862,t:"4h 4m"},{w:9753,C:10729,t:"4h 56m"},{w:12751,C:14599,t:"5h 57m"},{w:18163,C:21627,t:"7h 11m"},{w:23691,C:29321, t:"8h 40m"},{w:33450,C:43020, t:"10h 26m"},{w:43571,C:58213, t:"12h 34m"}],
[{w:105,t:"43m 12s"},{w:202,t:"51m 18s"},{w:324,t:"59m 48s"},{w:477,t:"1h 8m"},{w:671,t:"1h 18m"},{w:914,M:778,t:"1h 27m"},{w:1222,M:1052,t:"1h 38m"},{w:1609,M:1397,t:"1h 49m"},{w:2096,M:1832,t:"2h 33s"},{w:2711,M:2381,t:"2h 12m"},{w:3485,M:3071,t:"2h 25m"},{w:4460,M:3942,t:"2h 38m"},{w:5689,M:5038,t:"2h 52m"},{w:7238,M:6420,t:"3h 6m"},{w:9190,M:8161,t:"3h 21m"},{w:11648,M:10354,t:"3h 37m"},{w:14746,M:13118,t:"3h 54m"},{w:18650,M:16601,t:"4h 12m"},{w:23568,M:20988,t:"4h 31m"}],
[{w:49,t:"6m 36s"},{w:114,t:"17m 24s"},{w:195,t:"22m 1s"},{w:296,t:"27m 6s"},{w:420,t:"32m 42s"},{w:574,t:"38m 50s"},{w:766,t:"45m 36s"},{w:1003,t:"53m 3s"},{w:1297,M:178,t:"1h 1m"},{w:1662,M:431,t:"1h 10m"},{w:2115,M:745,t:"1h 20m"},{w:2676,M:1134,t:"1h 31m"},{w:3371,M:1616,t:"1h 43m"},{w:4234,M:2214,t:"1h 56m"},{w:5304,M:2956,t:"2h 10m"},{w:6630,M:3875,t:"2h 26m"},{w:8275,M:5015,t:"2h 44m"},{w:10314,M:6429,t:"3h 3m"},{w:12843,M:8183,t:"3h 24m"},{w:15979,M:10357,t:"3h 48m"},{w:19868,M:13052,t:"4h 13m"},{w:24690,M:16395,t:"4h 42m"},{w:30669,M:20540,t:"5h 13m"},{w:38083,M:25680,t:"5h 47m"},{w:47276,M:32053,t:"6h 24m"},{w:58676,M:39957,t:"7h 6m"},{w:0,M:0,t:""},{w:90490,M:61909,t:"8h 41m"}],
[{w:160,t:"18m 43s"},{w:288,t:"26m 23s"},{w:442,t:"35m 7s"},{w:626,M:96,t:"45m 4s"},{w:847,M:211,t:"56m 25s"},{w:1113,M:349,t:"1h 9m"},{w:1431,M:515,t:"1h 24m"},{w:1813,M:714,t:"1h 40m"},{w:2272,M:953,t:"2h 6s"},{w:2822,M:1240,t:"2h 21m"},{w:3483,M:1584,t:"2h 46m"},{w:4275,M:1997,t:"3h 15m"},{w:5226,M:2492,t:"3h 47m"},{w:6368,M:3086,t:"4h 24m"},{w:7737,M:3800,t:"5h 6m"},{w:9380,M:4656,t:"5h 54m"},{w:11353,M:5683,t:"6h 49m"},{w:13719,M:6915,t:"7h 51m"},{w:16559,M:8394,t:"9h 2m"},{w:19967,M:10169,t:"10h 23m"},{w:24056,M:12299,t:"11h 56m"},{w:28963,M:14855,t:"13h 41m"},{w:34852,M:17921,t:"15h 41m"},{w:41917,M:21602,t:"17h 58m"},{w:50398,M:26019,t:"20h 34m"},{w:60574,M:31319,t:"23h 32m"},{w:72784,M:37679,t:"1d 2h"}],
[{w:114,t:"21m"},{w:361,M:203,t:"51m 36s"},{w:657,M:516,t:"1h 2m"},{w:1012,M:892,t:"1h 13m"},{w:1439,M:1344,t:"1h 26m"},{w:1951,M:1885,t:"1h 40m"},{w:2565,M:2535,t:"1h 56m"},{w:3302,M:3315,t:"2h 13m"},{w:4186,M:4251,t:"2h 31m"},{w:5247,M:5374,t:"2h 52m"},{w:6521,M:6721,t:"3h 15m"},{w:8049,M:8338,t:"3h 39m"},{w:9882,M:10279,t:"4h 7m"},{w:12083,M:12608,t:"4h 37m"},{w:14724,M:15402,t:"5h 10m"},{w:17892,M:18755,t:"5h 47m"},{w:21695,M:22779,t:"6h 27m"},{w:26258,M:27607,t:"7h 11m"},{w:31733,M:33402,t:"7h 59m"},{w:38304,M:40355,t:"8h 53m"},{w:46189,M:48699,t:"9h 51m"},{w:55650,M:58711,t:"10h 56m"},{w:67004,M:70726,t:"12h 7m"},{w:80629,M:85144,t:"13h 25m"},{w:96978,M:102445,t:"14h 51m"},{w:116599,M:123208,t:"16h 26m"},{w:140143,M:148122,t:"18h 10m"},{w:168395,M:178019,t:"20h 4m"}],
[{w:101,t:"16m 48s"},{w:222,t:"28m 15s"},{w:367,t:"40m 23s"},{w:541,M:94,t:"53m 15s"},{w:750,M:122,t:"1h 6m"},{w:1001,M:158,t:"1h 21m"},{w:1302,M:206,t:"1h 36m"},{w:1663,M:267,t:"1h 52m"},{w:2097,M:348,t:"2h 10m"},{w:2617,M:452,t:"2h 28m"},{w:3241,M:587,t:"2h 47m"},{w:3990,M:764,t:"3h 8m"},{w:4888,M:993,t:"3h 29m"},{w:5967,M:1290,t:"3h 52m"},{w:7261,M:1677,t:"4h 17m"},{w:8814,M:2181,t:"4h 43m"},{w:10678,M:2835,t:"5h 10m"},{w:12914,M:3685,t:"5h 39m"},{w:15598,M:4791,t:"6h 10m"},{w:18818,M:6228,t:"6h 43m"},{w:22683,M:8097,t:"7h 17m"},{w:27320,M:10526,t:"7h 54m"},{w:32885,M:13684,t:"8h 33m"},{w:39562,M:17789,t:"9h 14m"},{w:49594,M:19887,t:"9h 58m"},{w:59618,M:25854,t:"10h 44m"},{w:86312,M:53103,t:"12h 26m"}],
[{w:560,M:280,t:"1h 36m"},{w:1435,M:1190,t:"2h 9m"},{w:2748,M:2573,t:"2h 45m"},{w:4716,M:4676,t:"3h 25m"},{w:7669,M:7871,t:"4h 9m"},{w:12099,M:12729,t:"4h 57m"},{w:18744,M:20112,t:"5h 50m"},{w:28710,M:31335,t:"6h 49m"},{w:47722,M:52895,t:"7h 53m"},{w:66086,M:74323,t:"9h 4m"},{w:99723,M:113735,t:"10h 21m"}],
#1=[{w:712,t:"4h 28m"},{w:5824,M:1434,t:"6h 16m"},{w:16048,M:4546,S:3089,t:"8h 46m"},{w:36496,M:10770,S:10301,W:10898,t:"12h 17m"},{w:77392,M:23218,S:24725,W:22110,C:21188,t:"17h 12m"},{w:159184,M:48114,S:53573,W:44534,C:42400,t:"1d 5m"},{w:322768,M:97906,S:111269,W:89382,C:84824,t:"1d 9h"},{w:649935,M:197490,S:226661,W:179078,C:169671,t:"1d 23h"},{w:1304271,M:396658,S:457445,W:358470,C:339368,t:"2d 18h"}],
[{w:242,M:155,t:"1h 12m"},{w:415,M:342,t:"1h 24m"},{w:623,M:571,t:"1h 36m"},{w:873,M:850,t:"1h 49m"},{w:1173,M:1190,t:"2h 3m"},{w:1532,M:1606,t:"2h 18m"},{w:1964,M:2112,t:"2h 33m"},{w:2482,M:2730,t:"2h 49m"},{w:3103,M:3484,t:"3h 6m"},{w:3849,M:4404,t:"3h 24m"},{w:4743,M:5527,t:"3h 42m"},{w:5817,M:6896,t:"4h 2m"},{w:7105,M:8566,t:"4h 23m"},{w:8651,M:10604,t:"4h 44m"},{w:10507,M:13090,t:"5h 7m"},{w:12733,M:16123,t:"5h 30m"},{w:15404,M:19823,t:"5h 55m"},{w:18498,M:24339,t:"6h 22m"},{w:22457,M:29846,t:"6h 49m"},{w:27074,M:36564,t:"7h 18m"},{w:32290,M:45216,t:"7h 48m"},{w:39261,M:54769,t:"8h 20m"},{w:47240,M:66733,t:"8h 54m"}],
[{w:48,t:"24m"},{w:173,t:"42m"},{w:346,t:"1h 1m"},{w:581,t:"1h 23m"},{w:896,M:540,t:"1h 47m"},{w:1314,M:792,t:"2h 13m"},{w:1863,M:1123,t:"2h 42m"},{w:2580,M:1555,t:"3h 14m"},{w:3509,M:2115,t:"3h 49m"},{w:4706,M:2837,t:"4h 28m"},{w:6241,M:3762,t:"5h 10m"},{w:8203,M:4945,t:"5h 57m"},{w:10699,M:6450,t:"6h 48m"},{w:13866,M:8359,t:"7h 45m"},{w:17872,M:10774,t:"8h 47m"},{w:22926,M:13820,t:"9h 55m"},{w:29285,M:17654,t:"11h 11m"}],,
[{w:220,M:95,t:"42m"},{w:383,M:167,t:"54m"},{w:569,M:251,t:"1h 6m"},{w:781,M:349,t:"1h 19m"},{w:1023,M:461,t:"1h 33m"},{w:1299,M:592,t:"1h 48m"},{w:1613,M:744,t:"2h 3m"},{w:1972,M:920,t:"2h 19m"},{w:2380,M:1125,t:"2h 36m"},{w:2846,M:1362,t:"2h 54m"},{w:3377,M:1637,t:"3h 12m"},{w:3982,M:1956,t:"3h 32m"},{w:4672,M:2326,t:"3h 53m"},{w:5458,M:2755,t:"4h 14m"},{w:6355,M:3253,t:"4h 37m"},{w:7377,M:3831,t:"5h 57s"},{w:8542,M:4500,t:"5h 25m"},{w:9870,M:5278,t:"5h 52m"},{w:11385,M:6180,t:"6h 19m"},{w:13111,M:7226,t:"6h 48m"},{w:15078,M:8439,t:"7h 18m"},{w:17714,M:9776,t:"7h 50m"},{w:19481,M:11477,t:"8h 24m"},{w:22796,M:13373,t:"8h 59m"},{w:26119,M:15570,t:"9h 36m"},{w:29909,M:18118,t:"10h 14m"},{w:34228,M:21074,t:""},{w:39153,M:24503,t:""}],
[{w:113,t:"24m"},{w:248,t:"36m"},{w:402,t:"48m 36s"},{w:578,M:129,t:"1h 1m"},{w:779,M:197,t:"1h 15m"},{w:1007,M:275,t:"1h 30m"},{w:1267,M:366,t:"1h 45m"},{w:1563,M:470,t:"2h 1m"},{w:1903,M:593,t:"2h 18m"},{w:2288,M:735,t:"2h 36m"},{w:2728,M:900,t:"2h 54m"},{w:3230,M:1090,t:"3h 14m"},{w:3801,M:1312,t:"3h 35m"},{w:4453,M:1569,t:"3h 56m"},{w:5195,M:1866,t:"4h 19m"},{w:6042,M:2212,t:"4h 42m"},{w:7007,M:2613,t:"5h 7m"},{w:8107,M:2924,t:"5h 34m"},{w:9547,M:3617,t:"6h 1m"},{w:10793,M:4242,t:"6h 30m"},{w:12422,M:4967,t:"7h 47s"},{w:14282,M:5810,t:"7h 32m"},{w:16400,M:6786,t:"8h 6m"},{w:18816,M:7919,t:"8h 41m"},{w:21570,M:9233,t:"9h 18m"},{w:24709,M:10758,t:"9h 56m"},{w:28288,M:12526,t:"10h 37m"},{w:32368,M:14577,t:"11h 20m"},{w:37019,M:16956,t:"12h 4m"},{w:42321,M:19715,t:"12h 51m"}],
#1#,
[{w:250,t:"18m"},{w:430,M:104,t:"30m"},{w:664,M:237,t:"43m 12s"},{w:968,M:410,t:"57m 43s"},{w:1364,M:635,t:"1h 13m"},{w:1878,M:928,t:"1h 31m"},{w:2546,M:1309,t:"1h 50m"},{w:3415,M:1803,t:"2h 11m"},{w:4544,M:2446,t:"2h 35m"},{w:6013,M:3282,t:"3h 57s"},{w:7922,M:4368,t:"3h 29m"},{w:10403,M:5781,t:"4h 22s"},{w:13629,M:7617,t:"4h 34m"},{w:17823,M:10004,t:"5h 12m"},{w:23274,M:13108,t:"5h 53m"},{w:30362,M:17142,t:"6h 39m"},{w:39575,M:22387,t:"7h 29m"},{w:51552,M:29204,t:"8h 24m"},{w:67123,M:38068,t:"9h 25m"},{w:87363,M:49589,t:"10h 31m"},{w:113680,M:64569,t:"11h 45m"}],
#2=[{w:274,t:"18m"},{w:467,M:116,t:"30m"},{w:718,M:255,t:"43m 12s"},{w:1045,M:436,t:"57m 43s"},{w:1469,M:671,t:"1h 13m"},{w:2021,M:977,t:"1h 31m"},{w:2738,M:1375,t:"1h 50m"},{w:3671,M:1892,t:"2h 11m"},{w:4883,M:2564,t:"2h 35m"},{w:6459,M:3437,t:"3h 57s"},{w:8508,M:4572,t:"3h 29m"},{w:11172,M:6049,t:"4h 22s"},{w:14634,M:7968,t:"4h 34m"},{w:19135,M:10462,t:"5h 12m"},{w:24987,M:13705,t:"5h 53m"},{w:32594,M:17921,t:"6h 39m"},{w:42483,M:23402,t:"7h 29m"},{w:55339,M:30527,t:"8h 24m"},{w:72050,M:39790,t:"9h 25m"},{w:93778,M:51830,t:"10h 31m"},{w:122021,M:67485,t:"11h 45m"}],#2#,#2#,#2#,
[{w:63,t:"13m 12s"},{w:122,t:"16m 48s"},{w:192,t:"20m 37s"},{w:274,t:"24m 40s"},{w:372,t:"28m 57s"},{w:486,t:"33m 30s"},{w:620,t:"38m 19s"},{w:777,M:359,t:"43m 25s"},{w:962,M:444,t:"48m 50s"},{w:1178,M:546,t:"54m 34s"},{w:1432,M:669,t:"1h 39s"},{w:1730,M:816,t:"1h 7m"},{w:2078,M:993,t:"1h 13m"},{w:2486,M:1205,t:"1h 21m"},{w:2964,M:1459,t:"1h 28m"},{w:3524,M:1765,t:"1h 37m"},{w:4178,M:2131,t:"1h 45m"},{w:4944,M:2571,t:"1h 54m"},{w:5841,M:3098,t:"2h 4m"},{w:6890,M:3731,t:"2h 14m"},{w:8117,M:4491,t:"2h 25m"},{w:9550,M:5402,t:"2h 37m"},{w:11229,M:6496,t:"2h 49m"},{w:13190,M:7809,t:"3h 3m"},{w:15484,M:9383,t:"3h 16m"},{w:18165,M:11275,t:"3h 30m"},{w:21299,M:13543,t:"3h 46m"},{w:24962,M:16265,t:"4h 2m"},{w:29245,M:19531,t:"4h 19m"},{w:34249,M:23450,t:"4h 38m"},{w:40096,M:28153,t:"4h 57m"},{w:46930,M:33798,t:"5h 16m"}],
[{w:185,M:106,t:"16m 12s"},{w:291,M:160,t:"19m 48s"},{w:413,M:222,t:"23m 37s"},{w:555,M:295,t:"27m 40s"},{w:720,M:379,t:"31m 57s"},{w:911,M:475,t:"36m 30s"},{w:1133,M:587,t:"41m 19s"},{w:1390,M:716,t:"46m 25s"},{w:1689,M:865,t:"51m 50s"},{w:2035,M:1036,t:"57m 34s"},{w:2437,M:1233,t:"1h 3m"},{w:2902,M:1460,t:"1h 10m"},{w:3443,M:1722,t:"1h 16m"},{w:4070,M:2023,t:"1h 24m"},{w:4797,M:2369,t:"1h 31m"},{w:5640,M:2767,t:"1h 40m"},{w:6619,M:3225,t:"1h 48m"},{w:7754,M:3752,t:"1h 57m"},{w:9070,M:4358,t:"2h 7m"},{w:10598,M:5056,t:"2h 17m"},{w:12368,M:5855,t:"2h 28m"},{w:14424,M:6777,t:"2h 40m"},{w:16808,M:7836,t:"2h 52m"},{w:19573,M:9052,t:"3h 5m"},{w:22780,M:10449,t:"3h 19m"},{w:26502,M:12055,t:"3h 33m"}],
[{w:119,t:"13m 48s"},{w:188,M:35,t:"17m 24s"},{w:269,M:96,t:"21m 13s"},{w:362,M:167,t:"25m 16s"},{w:471,M:249,t:"29m 33s"},{w:597,M:345,t:"34m 6s"},{w:742,M:456,t:"38m 55s"},{w:912,M:584,t:"44m 1s"},{w:1108,M:733,t:"49m 26s"},{w:1335,M:905,t:"55m 10s"},{w:1600,M:1106,t:"1h 1m"},{w:1906,M:1338,t:"1h 7m"},{w:2261,M:1608,t:"1h 14m"},{w:2673,M:1921,t:"1h 21m"},{w:3152,M:2283,t:"1h 29m"},{w:3706,M:2704,t:"1h 37m"},{w:3741,M:2745,t:"1h 46m"}],
[{w:339,M:123,t:"22m 48s"},{w:423,M:198,t:"26m 24s"},{w:520,M:285,t:"30m 13s"},{w:631,M:387,t:"34m 16s"},{w:758,M:504,t:"38m 33s"},{w:905,M:640,t:"43m 6s"},{w:1074,M:798,t:"47m 55s"},{w:1269,M:981,t:"53m 1s"},{w:1492,M:1194,t:"58m 26w"},{w:1749,M:1440,t:"1h 4m"},{w:2045,M:1726,t:"1h 10m"},{w:2384,M:2058,t:"1h 16m"},{w:2775,M:2443,t:"1h 23m"},{w:3225,M:2889,t:"1h 30m"},{w:3741,M:3407,t:"1h 38m"},{w:4336,M:4008,t:"1h 46m"},{w:5132,M:4705,t:"1h 55m"},{w:5813,M:5513,t:"2h 4m"},{w:6778,M:6450,t:"2h 14m"},{w:7748,M:7537,t:"2h 24m"},{w:8944,M:8800,t:"2h 35m"},{w:10319,M:10263,t:"2h 46m"},{w:11900,M:11961,t:"2h 59m"}],
[{w:272,M:135,t:"16m 12s"},{w:353,M:212,t:"19m 48s"},{w:445,M:302,t:"23m 37s"},{w:551,M:405,t:"27m 40s"},{w:673,M:526,t:"31m 57s"},{w:813,M:665,t:"36m 30s"},{w:974,M:827,t:"41m 19s"},{w:1159,M:1015,t:"46m 25s"},{w:1373,M:1233,t:"51m 50s"},{w:1618,M:1486,t:"57m 34s"},{w:1899,M:1779,t:"1h 3m"},{w:2223,M:2120,t:"2h 10m"},{w:2596,M:2514,t:"1h 16m"},{w:3025,M:2972,t:"1h 24m"},{w:3517,M:3503,t:"1h 31m"},{w:4084,M:4119,t:"1h 40m"}]];

function lang() {
	//used to check if a lang is working
	//country='de';
	//default chat provided by ika-core.org
	if 	(chaturl=='.') chaturl='http://www.ika-core.org/chat/';	
	switch (country) {
   case 'gr':
		CheckVersionBubbleNegative=	"Έκανα έλεγχο για νέα έκδοση, δεν υπάρχει καμία αυτη την στιγμή.";
		NewCoreVersion="Νέα έκδοση κεντρικού Script";
		SideBar_News="Νέα";
		SideBar_NewsT="Ika-Core - Τα Νέα κάθε έκδοσης.";
		SideBar_Drag="Κρατήστε πατημένο το ποντίκι για να σύρετε την μπάρα πάνω/κάτω";
		SideBar_Search="Αναζήτηση";
		SideBar_SearchT="Αναζήτηση Πάιχτη/Συμμαχείας";
		SideBar_ToolsT="Δεσμοί Συμμαχείας";
		SideBar_Notes="Σημειώσεις";
		SideBar_NotesT="Σημειωματάριο";
		SideBar_Allies="Σύμμαχοι";
		SideBar_AlliesT="Λίστα Συμμάχων";
		SideBar_Enemies="Εχθροί";
		SideBar_EnemiesT="Λίστα Εχθρών";
		SideBar_Friends="Φίλοι";
		SideBar_FriendsT="Λίστα Φίλων";
		SideBar_Games="Ψυχαγωγία";
		SideBar_GamesT="Μενού Παιχνιδιών";
		SideBar_Indexing="Αρχικοποίηση";
		SideBar_IndexingT="Πρόοδος της Αρχικοποίησης του Κόσμου σου.";
		SideBar_Settings="Ρυθμίσεις";
		SideBar_SettingsT="Γενικές Ρυθμίσεις";
		SideBar_Chat="Κουβεντούλα";
		SideBar_ChatT="Κέντρο Επικοινωνίας Συμμαχιών";
		SideBar_Search_Save="Αποθήκευση";		
		SideBar_Search_Add="Προσθήκη";		
		SideBar_Search_QuickSearch="Γρήγορη Αναζήτηση";
		SideBar_Search_Player="Παίχτης";
		SideBar_Search_City="Πόλη";
		SideBar_Search_PlayerStatus="Κατάσταση Παίχτη";
		SideBar_Search_PlayerAll="'Ολες";
		SideBar_Search_PlayerUnknown="'Αγνωστη";
		SideBar_Search_PlayerNormal="Κανονική";
		SideBar_Search_PlayerInactive="Ανενεργή";
		SideBar_Search_PlayerVacation="Διακοπών";
		SideBar_Search_Alliance="Συμμαχεία";
		SideBar_Search_Radius="Ακτίνα Αναζήτησης";
		SideBar_Search_Search="Αναζήτηση";
		SideBar_Search_Clear="Καθαρισμός";
		SideBar_Search_AdvancedSearch="Προχωρημένη Αναζήτηση";
		SideBar_Search_EnemyAlliances="Εχθρικές Συμμαχείες";
		SideBar_Search_MilitaryScore="Στρατιοτικό Σκορ";
		SideBar_Search_GoldScore="Χρυσός";
		SideBar_Search_Between="μεταξύ";
		SideBar_Search_And="και";
		SideBar_Search_TownHallLevel="Επίπεδο Δημαρχείου";
		AllianceMenu=[
		["Αποστολή Κυκλικού<br> Μήνυματος","Κυκλικό μήνυμα προς όλους τους Σύμμαχους"],
		["Forum "+alliancefullnm,"Προς το Forum Συμμαχίας "],
		["Forum "+alliancefullnm +" <br> νέες καταχωρήσεις","Προς το Forum Συμμαχίας, νέες καταχωρήσεις "],
		["Chatbox(Νέο Παράθυρο)","Το Chat της Συμμαχίας, ανοίγει σε νέο παράθυρο"],
		["Chatbox(Διχοτόμηση)","Το Chat της Συμμαχίας, ανοίγει στο ίδιο παράθυρο στο κάτω μέρος "],
		["Υπολογιστής Μάχης","Εργαλείο για τους υπολογισμούς των στρατευμάτων ... "],
		["Αναβάθμιση Εργαλείων συμμαχίας"+alliancefullnm,"Αναβάθμιση των εργαλείων στην τελευταία έκδοση"]];	   
		IslandLegendAllies="• Σύμμαχοι";
		IslandLegendNoAlliance="• Χωρίς συμμαχία";
		IslandLegendEnemies="• Εχθροί";
		TreatyAll="Ελέχθηκαν όλοι οι παίχτες. Κίτρινο έχουν οι χωρίς συνθήκη και Γκρι αυτοί με συνθήκη."
		TreatyYes="Έχετε ήδη πολιτισμική συμφωνία με τον παίχτη αυτόν.";
		TreatyNo="Δεν βρέθηκε καμία πολιτισμική συμφωνία με τον παίχτη αυτόν.";
		updatenotification="Υπάρχει μια νέα έκδοση των Εργαλείων της συμμαχίας"+alliancefullnm+".\n Εάν θέλετε να κάνετε αναβάθμιση πιέστε ΟΚ για να μεταβείτε στην σελίδα αναβαθμισης www.ika-core.org.";
		txtplswait="Παρακαλώ Περιμένετε";
		txtrefresh="Ανανέωση";
		txtpagedata="- Εύρεση σελίδας";
		txtinfodata="- Εύρεση Παίχτη";
		txtchkplayer="- Έλεγχος Παίχτη";
		CultureTreaties="Πολιτιστική"; //magic word for treaties fix
		CultureTreatiesCancel=" Ακύρωση Πολιτιστικής συμφωνίας περιουσιακών στοιχείων";
		CultureTreatiesRequest=" Αίτηση Πολιτιστικής συμφωνίας περιουσιακών στοιχείων";
	  break;
	case 'fr':		
		CheckVersionBubbleNegative= "Après vérification, il n'y a pas de nouvelle version.";
		NewCoreVersion="il y a une nouvelle Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Cliquer et maintener pour déplacer la barre latérale";
		SideBar_Search="Recherches";
		SideBar_SearchT="Chercher joueur/alliance";
		SideBar_ToolsT="liens de l'Alliance";
		SideBar_Notes="Notes";
		SideBar_NotesT="Notes rapides";
		SideBar_Allies="Alliés";
		SideBar_AlliesT="Liste des Alliés";
		SideBar_Enemies="Ennemis";
		SideBar_EnemiesT="Joueurs Ennemis";
		SideBar_Friends="Amis";
		SideBar_FriendsT="Liste d'amis";
		SideBar_Games="Jeux";
		SideBar_GamesT="Menu des jeux";
		SideBar_Indexing="Mise à jour";
		SideBar_IndexingT="Etat de la mise à jour du monde";
		SideBar_Settings="Réglages";
		SideBar_SettingsT="Réglages - Configuration générale";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat global";
		SideBar_Search_Add="Ajouter";
		SideBar_Search_Save="Sauver";
		SideBar_Search_QuickSearch="Recherche rapide";
		SideBar_Search_Player="Joueur";
		SideBar_Search_City="City"
		SideBar_Search_PlayerStatus="Statut Joueur";
		SideBar_Search_PlayerAll="Tous";
		SideBar_Search_PlayerUnknown="Inconnu";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactif";
		SideBar_Search_PlayerVacation="Vacances";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Recherche";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Recherche avancée";
		SideBar_Search_EnemyAlliances="Alliances ennemies";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Envoyer un<br> message","Envoyer un message à tous les membres"],
		["Forum","Forum des "+alliancenm],
		["Nouveaux posts" ,"Voir les derniers posts "+alliancenm],
		["Chatbox","Discuter avec les autres membres"],
		["Chatbox(Frame)","Discuter avec les autres membres "],
		["Simulateur de bataille", "Simulateur de bataille"],
		["Update du script des "+alliancenm,"Le dernier script"]];
		IslandLegendAllies="• Allies";
		IslandLegendNoAlliance="• Sans Alliance";
		IslandLegendEnemies="• Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="Il y a une nouvelle version du script des "+alliancefullnm+".\n Mettez à jour le script en www.ika-core.org?";
		txtplswait="Attendez";
		txtrefresh="Consultez";
		txtpagedata="- Page en cours";
		txtinfodata="- Information en cours";
		txtchkplayer="- Compte de joueur";
		CultureTreaties="ultur"; //magic word
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	case 'tr':	
		CheckVersionBubbleNegative=   "Yeni sürüm kontrolü yaptım, şu anda yok.";
		NewCoreVersion="Yeni Çekirdek Sürümü";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Kenar çubuğunu hareket ettirmek için basılı tutup sürükleyin";
		SideBar_Search="Arama";
		SideBar_SearchT="Oyuncu/İttifak Arama";
		SideBar_ToolsT="İttifak Kısayolları";
		SideBar_Notes="Notlar";
		SideBar_NotesT="Hızlı Notlar";
		SideBar_Allies="Dostlar";
		SideBar_AlliesT="Dostlar - Liste";
		SideBar_Enemies="Düşmanlar";
		SideBar_EnemiesT="Düşman Oyuncular";
		SideBar_Friends="Arkadaşlar";
		SideBar_FriendsT="Arkadaş Listesi";
		SideBar_Games="Oyunlar";
		SideBar_GamesT="Oyun Menüsü";
		SideBar_Indexing="İndeksleme";
		SideBar_IndexingT="Dünya İndekslemesi Durumu";
		SideBar_Settings="Seçenekler";
		SideBar_SettingsT="Seçenekler - Genel Ayarlar ";
		SideBar_Chat="Sohbet";
		SideBar_ChatT="Genel Sohbet";
		SideBar_Search_Add="Ekle";
		SideBar_Search_Save="Kaydet";     
		SideBar_Search_QuickSearch="Hızlı Arama";
		SideBar_Search_Player="Oyuncu";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Oyuncu Durumu";
		SideBar_Search_PlayerAll="Tümü";
		SideBar_Search_PlayerUnknown="Bilinmeyen";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="İnaktif";
		SideBar_Search_PlayerVacation="Tatil";
		SideBar_Search_Alliance="İttifak";
		SideBar_Search_Radius="Yarıçap";
		SideBar_Search_Search="Ara";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Gelişmiş Arama";
		SideBar_Search_EnemyAlliances="Düşman İttifaklar";   
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Sirküler<br> Mesaj","Bütün üyelere mesaj gönder"],
		[alliancenm+" Forum ","İttifak Forumu "],
		[alliancenm +" yeni forum mesajları","İttifak Forumu, son eklenenler "],
		["Sohbet (Yeni Pencere)","İttifak Sohbet, yeni pencerede gösterim"],
		["Sohbet (Çerçeve)","İttifak Sohbet, çerçeve içinde gösterim "],
		["Savaş Hesaplayıcı","Savaş hesaplamaları ... "],
		[alliancenm+" Araçları Güncelle ","Eklenti güncelleme" ]];
		IslandLegendAllies="• Dost";
		IslandLegendNoAlliance="• İttifaksız";
		IslandLegendEnemies="• Düşman";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Bu oyuncu ile zaten kültürel antlaşmanız var";
		TreatyNo="Bu oyuncu ile kültürel antlaşmanız yok.";
		updatenotification=alliancenm+" Araçlarının yeni sürümü var.\n www.ika-core.org.";
		txtplswait="Lütfen Bekleyin";
		txtrefresh="Yenile";
		txtpagedata="- Sayfa Alınıyor";
		txtinfodata="- Bilgi Alınıyor";
		txtchkplayer="- Oyuncu Kontrol Ediliyor";
		CultureTreaties="ültür"; //magic word for treaties fix, does it work??? please post on userscripts
		CultureTreatiesCancel=" Kültürel Anlaşmayı İptal Et";
		CultureTreatiesRequest=" Kültürel Anlaşma Teklif Et";
		break;
	case 'de':		
		CheckVersionBubbleNegative=	"Ich hab fuer ne neue version gecheckt, es gibt leider keine.";
		NewCoreVersion="Neue Core Version";
		SideBar_News="Neues";
		SideBar_NewsT="Ika-Core Version Neuigkeiten";
		SideBar_Drag="Linke mouse taste druecken und halten um dass seitliche menu rauf und runter zu schieben";
		SideBar_Search="Suchen";
		SideBar_SearchT="Spieler/Allianz Suche";
		SideBar_ToolsT="Allianz Links";
		SideBar_Notes="Notizen";
		SideBar_NotesT="Notizbuch";
		SideBar_Allies="Allierten";
		SideBar_AlliesT="Allierten Liste";
		SideBar_Enemies="Feinde";
		SideBar_EnemiesT="Feindliche Spieler";
		SideBar_Friends="Freunde";
		SideBar_FriendsT="Maine Freunde";
		SideBar_Games="Unterhaltung";
		SideBar_GamesT="Untehaltungs Menu";
		SideBar_Indexing="Index";
		SideBar_IndexingT="Welt Index";
		SideBar_Settings="Einstellungen";
		SideBar_SettingsT="Einstellungen und Konfiguration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globales Chat";
		SideBar_Search_Add="Hinzufuegen";
		SideBar_Search_Save="Speichern";		
		SideBar_Search_QuickSearch="SchnellSuche";
		SideBar_Search_Player="Spieler";
		SideBar_Search_City="Stadt";
		SideBar_Search_PlayerStatus="Spieler Status";
		SideBar_Search_PlayerAll="Alle";
		SideBar_Search_PlayerUnknown="Unbekannt";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inaktiv";
		SideBar_Search_PlayerVacation="Ferien";
		SideBar_Search_Alliance="Allianz";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Suchen";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Fortgeschrittene Suche";
		SideBar_Search_EnemyAlliances="Feindliche Allianzen";		
		SideBar_Search_MilitaryScore="Militaer Punkte";
		SideBar_Search_GoldScore="Gold Punkte";
		SideBar_Search_Between="zwischen";
		SideBar_Search_And="und";
		SideBar_Search_TownHallLevel="Rathaus Level";		
		AllianceMenu=[
		["Allianz<br> Rundmail","Sende Mail an alle Allianzmitglieder "],
		["Forum: "+alliancefullnm,"Zum Allianz-Forum "],
		[alliancefullnm +": Forum News","Neue Beiträge im Forum "],
		["Chatbox(New Window)","Allianz Chat, in neuem Fenster "],
		["Chatbox(Frame)","Allianz Chat, in einem Frame "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="• Allierten";
		IslandLegendNoAlliance="• Ohne Allianz";
		IslandLegendEnemies="• Feinde";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Es besteht bereits ein Kulturgüterabkommen mit diesem Spieler.";
		TreatyNo="Es besteht kein Kulturgüterabkommen mit diesem Spieler.";
		updatenotification="Es gibt eine neue Version vom "+alliancefullnm+" Tools.\n Jezt das Script updaten auf www.ika-core.org?";
		maplegend=["Deine Inseln","Gesuchte Inseln","Übereinstimmende Inseln","Keine Übereinstimmung","Sea","Click für mehr Infos."];
		txtplswait="Bitte warten!";
		txtrefresh="Refresh";
		txtpagedata="- Hole Seite";
		txtinfodata="- Hole Info";
		txtchkplayer="- Checke Spieler";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Kulturgüterabkommen kündigen";
		CultureTreatiesRequest=" Kulturgüterabkommen anbieten";
		break;
	case 'es':
		CheckVersionBubbleNegative= "Busqué una nueva versión, ninguna por ahora.";
		NewCoreVersion="Nueva Versión Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Oprime y Arrastra para mover este Menú";
		SideBar_Search="Buscar";
		SideBar_SearchT="Buscar jugador/alianza";
		SideBar_ToolsT="Enlaces de la Alianza";
		SideBar_Notes="Notas";
		SideBar_NotesT="Anotaciones";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Enemigos";
		SideBar_EnemiesT="Lista de Enemigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Juegos";
		SideBar_GamesT="Menú de Juegos";
		SideBar_Indexing="Indexando";
		SideBar_IndexingT="Progreso del Indexado del Mundo";
		SideBar_Settings="Configuraciones";
		SideBar_SettingsT="Configuraciones Generales ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Agregar";
		SideBar_Search_Save="Guardar";
		SideBar_Search_QuickSearch="Búsqueda Rápida";
		SideBar_Search_Player="Jugador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconocido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Vacaciones";
		SideBar_Search_Alliance="Alianza";
		SideBar_Search_Radius="Radio";
		SideBar_Search_Search="Buscar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Búsqueda Avanzada";
		SideBar_Search_EnemyAlliances="Alianzas Enemigas";	
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Mensaje a la<br> Alianza","Enviar mensaje a todos los aliados"],
		["Foro "+alliancefullnm,"Al Foro de la Alianza "],
		["Foro " + alliancefullnm +"	mensajes no leídos","A los mensajes no leídos del Foro de la Alianza "],
		["Chatbox(Nueva Ventana)","Chat de la Alianza, abre en nueva ventana"],
		["Chatbox(Frame)","Chat de la Alianza, muestra en chat en frames sin recargarse"],
		["Calculadora de Batallas","Calcula una batalla ... "],
		[" Actualizar Herramientas"+alliancefullnm,"Obtener el último script"]];
		IslandLegendAllies="• Aliados";
		IslandLegendNoAlliance="• No Aliados";
		IslandLegendEnemies="• Enemigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Tú tienes actualmente un tratado cultural con este jugador";
		TreatyNo="No tienes tratados culturales con este jugador.";
		updatenotification="Existe una nueva versión de las Herramientas "+alliancefullnm+" .\n Oprime OK si deseas ir a www.ika-core.org y actualizarlas ahora.";
		txtplswait="Espere por favor";
		txtrefresh="Refrescar";
		txtpagedata="- Obteniendo Página";
		txtinfodata="- Obteniendo Información";
		txtchkplayer="- Verificando Jugador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratados Culturales";
		CultureTreatiesRequest=" Solicitar Tratados Culturales";
		break;      
	case 'cn':
	case 'hk':
	case 'tw':
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Games="Games";
		SideBar_GamesT="Games Menu";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="World Indexing Progress";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";
		SideBar_Search_Save="Save";		
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";		
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		[" 發送盟內訊息","傳訊息給所有聯盟成員 "],
		[alliancefullnm+" 的論壇","聯盟論壇 "],
		[alliancefullnm +" 論壇的新帖 ","聯盟論壇的新發言 "],
		["盟內及時通(新視窗)","在新視窗開啟盟內及時通 "  ],
		["盟內及時通(同頁)","在同一頁顯示盟內及時通(無法自動更新) "],
		["戰鬥模擬器","戰力的計算 "],
		[alliancefullnm+" Tools 的腳本更新","更新至最新的腳本"]];
		IslandLegendAllies="• 聯盟";
		IslandLegendNoAlliance="• 無聯盟";
		IslandLegendEnemies="• 敵對勢力";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="此玩家已和你簽署過文化條約";
		TreatyNo="無文化條約";
		updatenotification=" 偵測到新版的 "+alliancefullnm+" Tools.\n 按確定將連結到 www.ika-core.org 更新";
		txtplswait="處理中, 請耐心等待";
		txtrefresh="資料更新";
		txtpagedata="- 取得頁面";
		txtinfodata="- 取得資料";
		txtchkplayer="- 調查玩家";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" 取消文化條約";
		CultureTreatiesRequest=" 簽署文化條約";
		break;
	case 'pt':
		CheckVersionBubbleNegative="Procurei por uma nova versão, não existe nenhuma de momento.";
		NewCoreVersion="Nova Versão Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Pressiona e arrasta para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogador/Aliança";
		SideBar_ToolsT="Hiperligações Aliança";
		SideBar_Notes="Notas";
		SideBar_NotesT="Notas Instantâneas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Jogos";
		SideBar_GamesT="Menu de Jogos";
		SideBar_Indexing="Indexação";
		SideBar_IndexingT="Índice de Progresso do Mundo";
		SideBar_Settings="Preferências";
		SideBar_SettingsT="Preferências - Configuração Geral ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Adicionar";     
		SideBar_Search_Save="Gravar";     
		SideBar_Search_QuickSearch="Procura Rápida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Status do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Ferias";
		SideBar_Search_Alliance="Aliança";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Procurar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Procura Avançada";
		SideBar_Search_EnemyAlliances="Alianças Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Enviar para Aliança<br> Mensagem","Enviar mensagem para todos os Aliados"],
		["Forum "+alliancefullnm,"Para o Fórum da Aliança " ],
		[alliancefullnm +" Ver novos Posts","Para o Fórum da Aliança, últimos posts ",],
		["Chatbox(New Window)","Chat da Aliança, abre numa nova janela"],
		["Chatbox(Frame)","Chat da Aliança, mostra o chat num frame sem recarregar "],
		["Calc de Batalha","Calcula uma Batalha ... "],
		[" Actualiza as Ferramentas da "+alliancefullnm,"Obtém o ultimo Script"]];
		IslandLegendAllies="• Aliados";
		IslandLegendNoAlliance="• Sem Aliados";
		IslandLegendEnemies="• Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Já tens um tratado de cultura com este jogador";
		TreatyNo="Não foram encontrados tratados de cultura com este jogador";
		updatenotification="Existe uma nova versão das ferramentas da "+alliancefullnm+".\n Clica OK, se quiseres podes ir a www.ika-core.org e actualizar agora.";
		txtplswait="Por Favor, Esperar";
		txtrefresh="Actualizar";
		txtpagedata="- A Receber Pagina";
		txtinfodata="- A Receber Informações";
		txtchkplayer="- A Verificar Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado de Cultura";
		CultureTreatiesRequest=" Solicitar Tratado de Cultura";
		break;
	case 'bg':
		  CheckVersionBubbleNegative=   "Няма нова версия за момента.";
          NewCoreVersion="Наличие на нова версия.";
          SideBar_News="Новости";
          SideBar_NewsT="Ika-Core нововъведения";
          SideBar_Drag="Задръжте и плъзнете скролера";
          SideBar_Search="Търси";
          SideBar_SearchT="Търси играч/съюз";
          SideBar_ToolsT="Връзки на съюза";
          SideBar_Notes="Бележки";
          SideBar_NotesT="Бързи бележки";
          SideBar_Allies="Съюзи";
          SideBar_AlliesT="Списък на съюзи";
          SideBar_Enemies="Врагове";
          SideBar_EnemiesT="Играчи";
          SideBar_Friends="Приятели";
          SideBar_FriendsT="Списък на приятели";
          SideBar_Games="Игри";
          SideBar_GamesT="Меню игри";
          SideBar_Indexing="Индексиране";
          SideBar_IndexingT="Развитие на свят Алфа";
          SideBar_Settings="Настройки";
          SideBar_SettingsT="Настройки - Конфигуриране ";
          SideBar_Chat="Чат";
          SideBar_ChatT="Общ чат";
          SideBar_Search_Add="Прибави";     
          SideBar_Search_Save="Запази";     
          SideBar_Search_QuickSearch="Бързо търсене";
          SideBar_Search_Player="Играч";
          SideBar_Search_City="City";
		  SideBar_Search_PlayerStatus="Статус на играча";
          SideBar_Search_PlayerAll="Всички";
          SideBar_Search_PlayerUnknown="Неизвестен";
          SideBar_Search_PlayerNormal="Нормален";
          SideBar_Search_PlayerInactive="Неактивен";
          SideBar_Search_PlayerVacation="Отпуска";
          SideBar_Search_Alliance="Съюз";
          SideBar_Search_Radius="Радиус";
          SideBar_Search_Search="Търси";
		  SideBar_Search_Clear="Clear";
          SideBar_Search_AdvancedSearch="Разширено търсене";
          SideBar_Search_EnemyAlliances="Вражески съюзи";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
          AllianceMenu=[
          ["Изпрати съобщение<br> до съюза","Изпрати съобщение на всички съюзници"],
          ["Форум "+alliancefullnm,"Към форума на съюза " ],
          [alliancefullnm +" нови публикации във форума","Към последните публикации във форума на съюза ",],
          ["Чат стая(Нов прозорец)","Отваря чат стаята на съюза в нов прозорец"],
          ["Чат стая(Подрамка)","Показва чат стаята на съюза в подрамка "],
          ["Калкулатор на битки","Планирай битка ... "],
          [" Обнови "+alliancefullnm+" Tools ","Вземи последния скрипт"]];
          IslandLegendAllies="• Съюзнк";
          IslandLegendNoAlliance="• Неутрален";
          IslandLegendEnemies="• Враг";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
          TreatyYes="Имате догвор за културен обмен с този играч.";
          TreatyNo="Нямате договор за културен обмен с този играч.";
          updatenotification="Има нова версия на "+alliancefullnm+" Tools.\n Натисни OK, ако искаш да отидеш на www.ika-core.org и да обновиш.";
          txtplswait="Моля, изчакайте";
          txtrefresh="Опренсни";
          txtpagedata="- Получаване на страница";
          txtinfodata="- Получаване на информация";
          txtchkplayer="- Проверка на играча";
          CultureTreaties="ultur"; //magic word for treaties fix
          CultureTreatiesCancel=" Отмени договора за културен обмен.";
          CultureTreatiesRequest=" Поискай договор за културен обмен.";
		break;
	case 'it':
		CheckVersionBubbleNegative= "Ho cercato una nuova versione , non ce ne sono al momento.";
		NewCoreVersion="Nuova versione di Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Clicca e tieni premuto per spostare la barra";
		SideBar_Search="Cerca";
		SideBar_SearchT="Cerca giocatori/alleanza";
		SideBar_ToolsT="Collegamenti Alleanza";
		SideBar_Notes="Note";
		SideBar_NotesT="Note Rapide";
		SideBar_Allies="Alleati";
		SideBar_AlliesT="Alleati - Lista";
		SideBar_Enemies="Nemici";
		SideBar_EnemiesT="Giocatori Nemici";
		SideBar_Friends="Amici";
		SideBar_FriendsT="Lista Amici";
		SideBar_Games="Gioco";
		SideBar_GamesT="Menu di Gioco";
		SideBar_Indexing="Indicizzando";
		SideBar_IndexingT="Processo Indicizzazione del mondo";
		SideBar_Settings="Settaggi";
		SideBar_SettingsT="Settaggi - Configurazione Generale ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Globale";
		SideBar_Search_Add="Aggiungi";
		SideBar_Search_Save="Salva";
		SideBar_Search_QuickSearch="Ricerca Rapida";
		SideBar_Search_Player="Giocatore";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Stato del Giocatore";
		SideBar_Search_PlayerAll="Tutti";
		SideBar_Search_PlayerUnknown="Sconosciuto";
		SideBar_Search_PlayerNormal="Normale";
		SideBar_Search_PlayerInactive="Inattivo";
		SideBar_Search_PlayerVacation="Vacanza";
		SideBar_Search_Alliance="Alleanza";
		SideBar_Search_Radius="Raggio Isole";
		SideBar_Search_Search="Cerca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Ricerca Avanzata";
		SideBar_Search_EnemyAlliances="Alleanze Nemiche";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Messaggio","Invia Messaggio all'Alleanza"],
		["Forum "+alliancefullnm,"Al Forum dell'Alleanza" ],
		[alliancefullnm +" new forum posts","Al Forum dell'Alleanza, ultimo post ",],
		["Chatbox(New Window)","Chat dell'alleanza, apri in una nuova finestra"],
		["Chatbox(Frame)","Chat dell'alleanza, mostra chat in un frame senza ricaricare "],
		["Battle Calc","Calcolatore di battaglie ... "],
		[" Update "+alliancefullnm+" Tools ","Ottieni l'ultimo script"]];
		IslandLegendAllies="• Alleati";
		IslandLegendNoAlliance="• Senza Alleanza";
		IslandLegendEnemies="• Nemici";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Hai già un accordo culturale con questo giocatore.";
		TreatyNo="Nessun accordo culturale con questo giocatore.";
		updatenotification="C'è una nuova versione di "+alliancefullnm+" Tools.\n Clicca su OK se vuoi andare su www.ika-core.org and update ora.";
		txtplswait="Attendere Prego";
		txtrefresh="Aggiornamento";
		txtpagedata="- Ottenimento Pagina";
		txtinfodata="- Ottenimento Informazioni";
		txtchkplayer="- Controllo Giocatore";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancella Accordo Culturale";
		CultureTreatiesRequest=" Richiedi Accordo Culturale";
		break;
	case 'hu':
		CheckVersionBubbleNegative="Ellenőriztem, de pillanatnyilag nincs új verzió.";
		NewCoreVersion="Új Core verzió";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core Kiadás hírek";
		SideBar_Drag="Ragadd meg lenyomott bal egérgombal az oldalsávot az áthelyezéshez";
		SideBar_Search="Keresés";
		SideBar_SearchT="Játékos/Szövetség keresése";
		SideBar_ToolsT="Szövetség linkek";
		SideBar_Notes="Jegyzetek";
		SideBar_NotesT="Gyors Jegyzet";
		SideBar_Allies="Szövetségesek";
		SideBar_AlliesT="Szövetségesek listája";
		SideBar_Enemies="Ellenségek";
		SideBar_EnemiesT="Ellenséges játékosok";
		SideBar_Friends="Barátok";
		SideBar_FriendsT="Barátok listája";
		SideBar_Games="Játékok";
		SideBar_GamesT="Játékok menü";
		SideBar_Indexing="Indexálás";
		SideBar_IndexingT="Világ Indexálása folyamatban";
		SideBar_Settings="Beállítások";
		SideBar_SettingsT="Beállítások - Alapvető konfigoráció ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalis Chat";
		SideBar_Search_Add="Hozzáad";
		SideBar_Search_Save="Mentés";     
		SideBar_Search_QuickSearch="Gyorskereső";
		SideBar_Search_Player="Játékos";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Játékos státusza";
		SideBar_Search_PlayerAll="Összes";
		SideBar_Search_PlayerUnknown="Ismeretlen";
		SideBar_Search_PlayerNormal="Normál";
		SideBar_Search_PlayerInactive="Inaktív";
		SideBar_Search_PlayerVacation="Vakáció";
		SideBar_Search_Alliance="Szövetség";
		SideBar_Search_Radius="Sugár";
		SideBar_Search_Search="Keresés";
		SideBar_Search_Clear="Törlés";
		SideBar_Search_AdvancedSearch="Speciális kereső";
		SideBar_Search_EnemyAlliances="Ellenséges szövetségek";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Szövetség<br> Körüzenet","Üzenet küldése az összes szövetségesnek"],
		["Fórum "+alliancefullnm,"A Szövetségi fórum megnyitása " ],
		[alliancefullnm +" Új Fórum hozzászólások","A Szövetségi fórum legújabb hozzászólásai ",],
		["Chat (új ablakban)","Szövetség Chat, Új ablakban nyílik meg"],
		["Chat (keretben)","Szövetség Chat, a chat megjelenítése keretben, újratöltés nélkül "],
		["Harci kalkulátor","Harc kikalkulálása ... "],
		[ +alliancefullnm+" Szerszámkészlet frissítése ","A legfrissebb script megszerzése"]];
		IslandLegendAllies="• Szövetségesek";
		IslandLegendNoAlliance="• Nincs szövetségben";
		IslandLegendEnemies="• Ellenségek";
		TreatyAll="Minden játékos ellenőrizve. Ságra színűekkel nincs egyezmény, a szürkékkel van.";
		TreatyYes="A játékossal kultúrális egyezményed van";
		TreatyNo="A játékossal nincs kultúrális egyezményed";
		updatenotification="Itt található a "+alliancefullnm+" Szerszámkészlet legújabb változata.\n Klikkelj az OK gombra, ha szeretnéd megnyitni a www.ika-core.org oldalt, és frissítenél.";
		txtplswait="Kérlek várj";
		txtrefresh="Frissítés";
		txtpagedata="- Oldal lekérése";
		txtinfodata="- Infó lekérése";
		txtchkplayer="- Játékos ellenőrzése";
		CultureTreaties="ultú"; //magic word for treaties fix
		CultureTreatiesCancel=" Kultúrális egyezmény megszüntetése";
		CultureTreatiesRequest=" Kultúrális egyezmény felajánlása";
	break;
	case 'br':
		CheckVersionBubbleNegative="Procurei por novas versões do Core, não há nenhuma disponível no momento.";
		NewCoreVersion="Nova Versão do Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Clique e arraste para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogadores/Alianças";
		SideBar_ToolsT="Links da Aliança";
		SideBar_Notes="Anotações";
		SideBar_NotesT="Anotações Rápidas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Jogos";
		SideBar_GamesT="Menu de Jogos";
		SideBar_Indexing="Indexação";
		SideBar_IndexingT="Progresso da Indexação do Mundo";
		SideBar_Settings="Preferências";
		SideBar_SettingsT="Preferências - Configurações Gerais ";
		SideBar_Chat="Bate-Papo";
		SideBar_ChatT="Bate-Papo Global";
		SideBar_Search_Add="Adicionar";     
		SideBar_Search_Save="Salvar";     
		SideBar_Search_QuickSearch="Busca Rápida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inativo";
		SideBar_Search_PlayerVacation="Férias";
		SideBar_Search_Alliance="Aliança";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Busca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Busca Avançada";
		SideBar_Search_EnemyAlliances="Alianças Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","Enviar mensagem para todos os aliados"],
		["Forum "+alliancefullnm,"Para o Fórum da Aliança" ],
		[alliancefullnm +" novos posts","Para o Fórum da Aliança, últimos posts ",],
		["Chatbox(New Window)","Bate-Papo da Aliança, abre em uma nova janela "],
		["Chatbox(Frame)","Bate-Papo da Aliança, mostra o chat em um frame que não recarrega "],
		["Battle Calc","Calculadora de batalhas ... "],
		[" Update "+alliancefullnm+" Tools ","Pegar o último Script"]];
		IslandLegendAllies="• Aliados";
		IslandLegendNoAlliance="• Sem Aliança";
		IslandLegendEnemies="• Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Você já tem um tratado cultural com esse jogador.";
		TreatyNo="Não foram encontrados tratados culturais com este jogador.";
		updatenotification="Existe uma nova versão das ferramentas da  "+alliancefullnm+".\n Clique em OK se você quer ir para www.ika-core.org e atualizar agora.";
		txtplswait="Por Favor Espere";
		txtrefresh="Atualizar";
		txtpagedata="- Criando Página";
		txtinfodata="- Conseguindo Informação";
		txtchkplayer="- Checando Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado Cultural";
		CultureTreatiesRequest=" Requisitar Tratado Cultural";
	break;
	case 'ru':
		CheckVersionBubbleNegative="Нету новых версий в данный момент.";
		NewCoreVersion="Новая версия ядра";
		SideBar_News="Новости";
		SideBar_NewsT="Ika-Core основные изменения";
		SideBar_Drag="Удерживайте и двигайте для перемещения бокового меню";
		SideBar_Search="Поиск";
		SideBar_SearchT="Поиск игрока/альянса";
		SideBar_ToolsT="Ссылки на альянс";
		SideBar_Notes="Заметки";
		SideBar_NotesT="Быстрые заметки";
		SideBar_Allies="Союзники";
		SideBar_AlliesT="Список союзников";
		SideBar_Enemies="Враги";
		SideBar_EnemiesT="Список врагов";
		SideBar_Friends="Друзья";
		SideBar_FriendsT="Список друзей";
		SideBar_Games="Игры";
		SideBar_GamesT="Меню игры";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="Прогресс мира";
		SideBar_Settings="Настройки";
		SideBar_SettingsT="Настройки - Общая конфигурация ";
		SideBar_Chat="Чат";
		SideBar_ChatT="Глобальный чат";
		SideBar_Search_Add="Добавить";      
		SideBar_Search_Save="Сохранить";      
		SideBar_Search_QuickSearch="Быстрый поиск";
		SideBar_Search_Player="Игрок";
		SideBar_Search_City="Город";
		SideBar_Search_PlayerStatus="Игровой статус";
		SideBar_Search_PlayerAll="Все";
		SideBar_Search_PlayerUnknown="Неопределённые";
		SideBar_Search_PlayerNormal="Нормальные";
		SideBar_Search_PlayerInactive="Неактивные";
		SideBar_Search_PlayerVacation="В отпуске";
		SideBar_Search_Alliance="Альянс";
		SideBar_Search_Radius="Радиус";
		SideBar_Search_Search="Поиск";
		SideBar_Search_Clear="Очистить";
		SideBar_Search_AdvancedSearch="Расширенный поиск";
		SideBar_Search_EnemyAlliances="Вражеские альянсы";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Отправить Альянсу<br> Сообщение","Отправить сообщение всем союзникам"],
		["Форум "+alliancefullnm,"На форум альянса " ],
		[alliancefullnm +" новые сообщения на форуме","К последним сообщения на форуме альянса ",],
		["Chatbox(В новом окне)","Чат альянса, открывается в новом окне"],
		["Chatbox(Frame)","Чат альянса, чат отображается в frames без обновления "],
		["Калькулятор битв","Вычисление битвы ... "],
		[" Обновить "+alliancefullnm+" Tools ","Получить последний скрипт"]];
		IslandLegendAllies="• Союзники";
		IslandLegendNoAlliance="• Нейтральные";
		IslandLegendEnemies="• Враги";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Вы имеете культурный договор с этим игроком";
		TreatyNo="Никакие культурные договора не найдены для этого игрока.";
		updatenotification="Есть более новая версия "+alliancefullnm+" Tools.\n Нажмите на OK, если Вы хотите перейти на www.ika-core.org и обновить сейчас.";
		txtplswait="Пожалуйста подождите";
		txtrefresh="Обновление";
		txtpagedata="- Получение Страницы";
		txtinfodata="- Получение Информации";
		txtchkplayer="- Проверка игрока";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Отменить Культурный Договор";
		CultureTreatiesRequest=" Запросить Культурный Договор";
      break;
	case 'pl':
		CheckVersionBubbleNegative="Aktualnie nie ma nowej wersji skryptu";
		NewCoreVersion="Nowa wersja skryptu";
		SideBar_News="Nowości"; //NEW
		SideBar_NewsT="Nowości na temat wersji Ika-Core"; //NEW
		SideBar_Drag="Kliknij i przeciągnij aby przesunąć SideBar";
		SideBar_Search="Wyszukaj";
		SideBar_SearchT="Wyszukaj gracza/sojusz";
		SideBar_ToolsT="Linki sojuszu";
		SideBar_Notes="Notatki";
		SideBar_NotesT="Szybkie notatki";
		SideBar_Allies="Sojusze";
		SideBar_AlliesT="Lista sojuszy";
		SideBar_Enemies="Wrogowie";
		SideBar_EnemiesT="Lista wrogów";
		SideBar_Friends="Przyjaciele";
		SideBar_FriendsT="Lista przyjaciół";
		SideBar_Games="Gry";
		SideBar_GamesT="Menu gier";
		SideBar_Indexing="Indeksowanie";
		SideBar_IndexingT="Postęp indeksowania świata";
		SideBar_Settings="Ustawienia";
		SideBar_SettingsT="Ustawienia - Ogólne ";
		SideBar_Chat="Czat";
		SideBar_ChatT="Czat ogólny";
		SideBar_Search_Add="Dodaj";     
		SideBar_Search_Save="Zapisz";     
		SideBar_Search_QuickSearch="Szybkie wyszukiwanie";
		SideBar_Search_Player="Gracz";
		SideBar_Search_City="Miasto"; //NEW
		SideBar_Search_PlayerStatus="Status gracza";
		SideBar_Search_PlayerAll="Wszystkie";
		SideBar_Search_PlayerUnknown="Nieznany";
		SideBar_Search_PlayerNormal="Normalny";
		SideBar_Search_PlayerInactive="Nieaktywny";
		SideBar_Search_PlayerVacation="Urlop";
		SideBar_Search_Alliance="Sojusz";
		SideBar_Search_Radius="Promień";
		SideBar_Search_Search="Szukaj";
		SideBar_Search_Clear="Wyczyść"; //NEW
		SideBar_Search_AdvancedSearch="Wyszukiwanie zaawansowane";
		SideBar_Search_EnemyAlliances="Wrogie sojusze";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Wyślij wiadomość sojuszową","Wyślij wiadomość do wszystkich sojuszników"],
		["Forum "+alliancefullnm,"do forum sojuszu " ],
		[alliancefullnm +" nowe posty na forum","Przejdź do najnowych postów na forum sojuszu ",],
		["Czat(Nowe okno)","Czat sojuszu w nowym oknie"],
		["Czat(Ramka)","Czat sojuszu w ramce, bez odświeżania "],
		["Kalkulator bitw","Sprawdź swoje szanse w bitwie "],
		[" Uaktualnienie "+alliancefullnm+" Tools ","Pobiera najnowszą wersje skryptu"]];
		IslandLegendAllies="• Sojusz";
		IslandLegendNoAlliance="• Brak sojuszu";
		IslandLegendEnemies="• Wróg";
		TreatyAll="Wszyscy gracze zostali sprawdzeni - kolor żółty oznacza brak traktatu, szary już podpisany traktat.";
		TreatyYes="Już masz podpisany traktat kulturowy z tym graczem.";
		TreatyNo="Brak podpisanych traktatów kulturowych z tym graczem.";
		updatenotification="Pojawiła sie nowa wersja "+alliancefullnm+" Tools.\n Kliknij OK jeśli chcesz przejść do www.ika-core.org i zaktualizować skrypt.";
		txtplswait="Proszę czekać";
		txtrefresh="Odśwież";
		txtpagedata="- Pobieram stronę";
		txtinfodata="- Pobieram informacje";
		txtchkplayer="- Sprawdzam gracza";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zerwij traktat kulturowy";
		CultureTreatiesRequest=" Poproś o traktat kulturowy";
	break;
	case 'rs':
		CheckVersionBubbleNegative=   "Проверио сам да ли постоји новија верзија, тренутно нема доступних.";
		NewCoreVersion="Нова Core верзија";
		SideBar_News="Новости"; //NEW
		SideBar_NewsT="Ika-Core новости о издањима"; //NEW
		SideBar_Drag="Кликни и превуци да преместиш мени";
		SideBar_Search="Претрага";
		SideBar_SearchT="Тражење играча/савеза";
		SideBar_ToolsT="Линкови савеза";
		SideBar_Notes="Белешке";
		SideBar_NotesT="Кратке белешке";
		SideBar_Allies="Савезници";
		SideBar_AlliesT="Списак савезника";
		SideBar_Enemies="Непријатељи";
		SideBar_EnemiesT="Непријатељски играчи";
		SideBar_Friends="Непријатељски савези";
		SideBar_FriendsT="Списак пријатеља";
		SideBar_Games="Игрице";
		SideBar_GamesT="Избор игрица";
		SideBar_Indexing="Индексирање";
		SideBar_IndexingT="Напредак индексирања света";
		SideBar_Settings="Подешавања";
		SideBar_SettingsT="Подешавања - општа конфигурација";
		SideBar_Chat="Ћаскање";
		SideBar_ChatT="Општо ћаскање";
		SideBar_Search_Add="Додај";     
		SideBar_Search_Save="Сачувај";     
		SideBar_Search_QuickSearch="Брза претрага";
		SideBar_Search_Player="Играч";
		SideBar_Search_City="Град"; //NEW
		SideBar_Search_PlayerStatus="Статус играча";
		SideBar_Search_PlayerAll="Сви";
		SideBar_Search_PlayerUnknown="Непознат";
		SideBar_Search_PlayerNormal="Активан";
		SideBar_Search_PlayerInactive="Неактиван";
		SideBar_Search_PlayerVacation="Одсутан";
		SideBar_Search_Alliance="Савез";
		SideBar_Search_Radius="Удаљеност";
		SideBar_Search_Search="Тражи";
		SideBar_Search_Clear="Очисти"; //NEW
		SideBar_Search_AdvancedSearch="Напредна претрага";
		SideBar_Search_EnemyAlliances="Непријатељски савези";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Пошаљи кружну<br> поруку","Пошаљи поруку свим савезницима"],
		["Форум "+alliancefullnm,"Посети форум савеза " ],
		[alliancefullnm +" нове поруке на форуму","Прочитај последње поруке на форуму савеза ",],
		["Ћаскање(нови прозор)","Савезно ћаскање, отвара се у новом прозору"],
		["Ћаскање(оквир)","Савезно ћаскање, приказује ћаскање помоћу оквира - без новог учитавања "],
		["Калкулатор борбе","Предвиђа исход битке ... "],
		[" Ажурирај "+alliancefullnm+" алате ","Преузимање најсвежије скрипте"]];
		IslandLegendAllies="• Савезници";
		IslandLegendNoAlliance="• Без савеза";
		IslandLegendEnemies="• Непријатељи";
		TreatyAll="Сви играчи су проверени. Жутом бојом су означени играчи са којима немате споразум, а сивом они са којима имате.";
		TreatyYes="Већ имате културни споразум са овим играчем";
		TreatyNo="Културни споразуми са овим играчем нису нађени.";
		updatenotification="Постоји новија верзија скрипте "+alliancefullnm+" алати.\n Кликните ОК ако желите да посетите www.ika-core.org и преузмете је.";
		txtplswait="Молимо, сачекајте";
		txtrefresh="Освежи";
		txtpagedata="- Припремање стране";
		txtinfodata="- Припремање информација";
		txtchkplayer="- Проверавање играча";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Откажи културни споразум";
		CultureTreatiesRequest=" Понуди културни споразум";
	break;
	case 'ba':
		CheckVersionBubbleNegative="Provereno za nove verzije, trenutno nema dostupnih.";
		NewCoreVersion="Nova Core Verzija";
		SideBar_News="Novosti"; //NEW
		SideBar_NewsT="Ika-Core release novosti"; //NEW
		SideBar_Drag="Pritisni i Prevuci za pomeranje SideBara";
		SideBar_Search="Pretraga";
		SideBar_SearchT="Traži igrača/savez";
		SideBar_ToolsT="Savezni linkovi";
		SideBar_Notes="Beleške";
		SideBar_NotesT="Brze Beleške";
		SideBar_Allies="Saveznici";
		SideBar_AlliesT="Saveznici - Lista";
		SideBar_Enemies="Neprijatelji";
		SideBar_EnemiesT="Neprijateljski Igrači";
		SideBar_Friends="Prijatelji";
		SideBar_FriendsT="Lista Prijatelja";
		SideBar_Games="Igre";
		SideBar_GamesT="Meni Igara";
		SideBar_Indexing="Indeksiranje";
		SideBar_IndexingT="Indeksiranje Sveta u Toku";
		SideBar_Settings="Podešavanja";
		SideBar_SettingsT="Podešavanja - Opšta Podešavanja ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalni Chat";
		SideBar_Search_Add="Dodaj";     
		SideBar_Search_Save="Sačuvaj";     
		SideBar_Search_QuickSearch="Brza Pretraga";
		SideBar_Search_Player="Igrač";
		SideBar_Search_City="Grad"; //NEW
		SideBar_Search_PlayerStatus="Status Igrača";
		SideBar_Search_PlayerAll="Svi";
		SideBar_Search_PlayerUnknown="Nepoznati";
		SideBar_Search_PlayerNormal="Standardni";
		SideBar_Search_PlayerInactive="Neaktivni";
		SideBar_Search_PlayerVacation="Odmor";
		SideBar_Search_Alliance="Savez";
		SideBar_Search_Radius="Radijus";
		SideBar_Search_Search="Pretraga";
		SideBar_Search_Clear="Obriši"; //NEW
		SideBar_Search_AdvancedSearch="Napredna Pretraga";
		SideBar_Search_EnemyAlliances="Neprijateljski Savezi";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","Pošalji poruku svim saveznicima"],
		["Forum "+alliancefullnm,"Skoči na Forum Saveza " ],
		[alliancefullnm +" new forum posts","Skoi na Forum Saveza, poslednje poruke ",],
		["Chatbox(New Window)","Savezni Chat, otvara se u novom prozoru"],
		["Chatbox(Frame)","Savezni Chat, prikazuje chat u okvirima bez novog učitavanja "],
		["Battle Calc","Preračunava bitku ... "],
		[" Update "+alliancefullnm+" Tools ","Preuzmi najsvežiju skriptu"]];
		IslandLegendAllies="• Saveznici";
		IslandLegendNoAlliance="• Bez Saveza";
		IslandLegendEnemies="• Neprijatelji";
		TreatyAll="Svi igrači su provereni. Žuta boja predstavlja bez ugovora, Siva za postojeće.";
		TreatyYes="Već imate kulturni Sporazum sa ovim igračem";
		TreatyNo="Nema kulturnih Sporazuma pronađenih za ovog igrača.";
		updatenotification="Postoji svežija verzija "+alliancefullnm+" Alata.\n Kliknite na OK ako želite da odete na www.ika-core.org i ažurirate sada.";
		txtplswait="Molimo Sačekajte";
		txtrefresh="Osveži";
		txtpagedata="- Pripremam Stranu";
		txtinfodata="- Pripremam Info";
		txtchkplayer="- Provera Igrača";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Otkaži Kulturni Sporazum";
		CultureTreatiesRequest=" Zatraži Kulturni Sporazum";
	break;
	case 'ae':
		CheckVersionBubbleNegative=   "لا يوجد حاليا أي نسخة جديدة";
		NewCoreVersion="نسخة جديدة";
		SideBar_News="أخبار"; //NEW
		SideBar_NewsT="Ika-Core أخبار"; //NEW
		SideBar_Drag="اسحب و افلت لتحرك الشريط";
		SideBar_Search="بحث";
		SideBar_SearchT="بحث عن لاعبين / تحالفات";
		SideBar_ToolsT="روابط التحالف";
		SideBar_Notes="الملاحظات";
		SideBar_NotesT="ملاحظات سريعة";
		SideBar_Allies="الحلفاء";
		SideBar_AlliesT="قائمة الحلفاء";
		SideBar_Enemies="الأعداء";
		SideBar_EnemiesT="اللاعبون الأعداء";
		SideBar_Friends="الأصدقاء";
		SideBar_FriendsT="قائمة الأصدقاء";
		SideBar_Games="الألعاب";
		SideBar_GamesT="قائمة الألعاب";
		SideBar_Indexing="فهرس";
		SideBar_IndexingT="عملية فهرسة العالم";
		SideBar_Settings="إعدادات";
		SideBar_SettingsT="إعدادات عامة ";
		SideBar_Chat="محادثة";
		SideBar_ChatT="محادثة عالمية";
		SideBar_Search_Add="أضف";     
		SideBar_Search_Save="حفظ";     
		SideBar_Search_QuickSearch="بحث سريع";
		SideBar_Search_Player="لاعب";
		SideBar_Search_City="مدينة"; //NEW
		SideBar_Search_PlayerStatus="حالة اللاعب";
		SideBar_Search_PlayerAll="كل";
		SideBar_Search_PlayerUnknown="غير معروف";
		SideBar_Search_PlayerNormal="متواجد";
		SideBar_Search_PlayerInactive="غير فعال";
		SideBar_Search_PlayerVacation="عطلة";
		SideBar_Search_Alliance="تحالف";
		SideBar_Search_Radius="شعاع البحث";
		SideBar_Search_Search="بحث";
		SideBar_Search_Clear="مسح"; //NEW
		SideBar_Search_AdvancedSearch="بحث متقدم";
		SideBar_Search_EnemyAlliances="التحالفات الأعداء";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["أرسل للتحالف<br> رسالة","أرسل رسالة لكل التحالفات"],
		["صفحة التحالف "+alliancefullnm,"إلى صفحة التحالف " ],
		[alliancefullnm +" رسالة جديدة","إلى صفحة التحالف , آخر الرسائل ",],
		["صندوق المحادثة -إطار جديدة","محادثة التحالف , فتح في إطار جديد"],
		["صندوق المحادثة -إطار","محادثة التحالف , فتح في نفس إطار"],
		["حاسبة المعركة","حساب معركة ... "],
		[" تحديث "+alliancefullnm+" أدوات ","أحصل على آخر سكريبت"]];
		IslandLegendAllies="• تحالفات";
		IslandLegendNoAlliance="• لا يوجد تحالف";
		IslandLegendEnemies="• الأعداء";
		TreatyAll="كل اللاعبين تم فحصهم . الأصفر لمن ليس لديهم معاهدات ثقافية , و الرمادي لمن توجد لهم معاهدات ثقافية قائمة.";
		TreatyYes="أنت عندك حاليا معاهدة ثقافية مع هذا اللاعب";
		TreatyNo="لا يوجد معاهدات ثقافية لدى اللاعب.";
		updatenotification="هناك نسخة جديدة من  "+alliancefullnm+" اضغط على نعم إذا أردت تحديثها من المصدر";
		txtplswait="انتظر لو سمحت";
		txtrefresh="تحديث";
		txtpagedata="- الحصول على صفحة";
		txtinfodata="- الحصول على معلومات";
		txtchkplayer="- فحص لاعب";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" إلغاء معاهدة ثقافية";
		CultureTreatiesRequest=" طلب معاهدة ثقافية";
	break;
	case 'nl':
		CheckVersionBubbleNegative=   "Ik zocht naar een nieuwe versie, op dit ogenblik is die er niet.";
		NewCoreVersion="Nieuwe Core Versie";
		SideBar_News="Nieuws"; //NEW
		SideBar_NewsT="Ika-Core release nieuws"; //NEW
		SideBar_Drag="Klik en sleep om de SideBar te verplaatsen";
		SideBar_Search="Zoek";
		SideBar_SearchT="Zoek speler/alliantie";
		SideBar_ToolsT="Alliantie Links";
		SideBar_Notes="Notities";
		SideBar_NotesT="Snelle Notitie";
		SideBar_Allies="Allianties";
		SideBar_AlliesT="Allianties - Lijst";
		SideBar_Enemies="Vijanden";
		SideBar_EnemiesT="Vijandige spelers";
		SideBar_Friends="Vrienden";
		SideBar_FriendsT="Vriendenlijst";
		SideBar_Games="Spelletjes";
		SideBar_GamesT="Spelletjes Menu";
		SideBar_Indexing="Indexering";
		SideBar_IndexingT="Wereld Indexering Voortgang";
		SideBar_Settings="Instellingen";
		SideBar_SettingsT="Instellingen - Algemene Configuratie";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Voeg toe";     
		SideBar_Search_Save="Bewaar";     
		SideBar_Search_QuickSearch="Snel zoeken";
		SideBar_Search_Player="Speler";
		SideBar_Search_City="Stad"; //NEW
		SideBar_Search_PlayerStatus="Speler Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Onbekend";
		SideBar_Search_PlayerNormal="Normaal";
		SideBar_Search_PlayerInactive="Inactief";
		SideBar_Search_PlayerVacation="Vakantie";
		SideBar_Search_Alliance="Alliantie";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Zoek";
		SideBar_Search_Clear="Verwijder"; //NEW
		SideBar_Search_AdvancedSearch="Geavanceerd zoeken";
		SideBar_Search_EnemyAlliances="Vijandige allianties";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Verzend alliantie<br> Bericht","Verzend een bericht naar alle allianties"],
		["Forum "+alliancefullnm,"Naar het forum van de alliantie " ],
		[alliancefullnm +" nieuwe forum posts","Naar het forum van de alliantie, laatste berichten ",],
		["Chatbox(New Window)","Alliantie Chat, opent in een nieuw venster"],
		["Chatbox(Frame)","Alliantie Chat, toont chat in frames zonder herladen "],
		["Gevechts Calc","Berekent een gevecht ... "],
		[" Update "+alliancefullnm+" Tools ","Verkrijg de nieuwste script"]];
		IslandLegendAllies="• Allianties";
		IslandLegendNoAlliance="• Geen alliantie";
		IslandLegendEnemies="• Vijanden";
		TreatyAll="Alle spelers zijn gecontroleerd. Geel voor geen verdrag, en grijs voor bestaand verdrag.";
		TreatyYes="Je hebt al een cultureel verdrag met deze speler";
		TreatyNo="Geen cultureel verdrag gevonden met deze speler.";
		updatenotification="Er is weer een nieuwe versie van "+alliancefullnm+" Tools.\n Klik op OK als je nu naar www.ika-core.org wil gaan en nu wil updaten.";
		txtplswait="Even geduld";
		txtrefresh="Vernieuw";
		txtpagedata="- Pagina verkrijgen";
		txtinfodata="- Info verkrijgen";
		txtchkplayer="- Speler controleren";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zeg cultureel verdrag op";
		CultureTreatiesRequest=" Vraag cultureel verdrag aan";	
	break;
	case 'lt':
		CheckVersionBubbleNegative=   "Šiuo metu naujos versijos nėra.";
		NewCoreVersion="Nauja Core versija";
		SideBar_News="Naujienos";
		SideBar_NewsT="Ika-Core versijos naujienos";
		SideBar_Drag="paspausk ir stumk, kad pajudintum įrankių juostą";
		SideBar_Search="Paieška";
		SideBar_SearchT="Ieškoti žaidėjo/aljanso";
		SideBar_ToolsT="Aljansų nuorodos";
		SideBar_Notes="Užrašai";
		SideBar_NotesT="Greiti užrašai";
		SideBar_Allies="Sąjungininkai";
		SideBar_AlliesT="Sajungininkų sąrašas";
		SideBar_Enemies="Priešai";
		SideBar_EnemiesT="Žaidėjai - priešai";
		SideBar_Friends="Draugai";
		SideBar_FriendsT="Draugų sąrašas";
		SideBar_Games="Žaidimai";
		SideBar_GamesT="Žaidimų menu";
		SideBar_Indexing="Indeksavimas";
		SideBar_IndexingT="Pasaulio indeksavimo progresas";
		SideBar_Settings="Nustatymai";
		SideBar_SettingsT="Nustatymai - Bendros nuostatos ";
		SideBar_Chat="Chat'as";
		SideBar_ChatT="Pasaulinis chat'as";
		SideBar_Search_Add="Pridėti";      
		SideBar_Search_Save="Išsaugoti";      
		SideBar_Search_QuickSearch="Greita paieška";
		SideBar_Search_Player="Žaidėjas";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Žaidėjo būsena";
		SideBar_Search_PlayerAll="Visi";
		SideBar_Search_PlayerUnknown="nežinomas";
		SideBar_Search_PlayerNormal="Normalus";
		SideBar_Search_PlayerInactive="Neaktyvus";
		SideBar_Search_PlayerVacation="Atostogauja";
		SideBar_Search_Alliance="Aljansas";
		SideBar_Search_Radius="Spindulys";
		SideBar_Search_Search="Paieška";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Išplėsta paieška";
		SideBar_Search_EnemyAlliances="Priešų aljansai";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		['Send Alliance<br> Message','Send message to all the allies'],
		['Forum '+alliancefullnm,'To the Forum of the Alliance ' ],
		[alliancefullnm +' new forum posts','To the Forum of the Alliance, latest posts ',],
		['Chatbox(New Window)','Alliance Chat, opens in a new window'],
		['Chatbox(Frame)','Alliance Chat, displays chat in frames with no reload '],
		['Battle Calc','Calculates a battle ... '],
		[' Update '+alliancefullnm+' Tools ','Gets the latest script']];
		IslandLegendAllies="• Aljansai";
		IslandLegendNoAlliance="• Nėra aljanse";
		IslandLegendEnemies="• Priešai";
		TreatyYes="Tu jau turi kultūrinę sutartį su šiuo žaidėju";
		TreatyNo="Nerasta kultūrinių sutarčių su šiuo žaidėju.";
		updatenotification='There is a newer version of '+alliancefullnm+' Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.';
		txtplswait="Prašau palaukti";
		txtrefresh="Atnaujinti";
		txtpagedata='- Getting Page';
		txtinfodata='- Getting Info';
		txtchkplayer='- Checking Player';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" Atšaukti kultūrinę sutartį";
		CultureTreatiesRequest=" Prašyti kultūrinės sutarties";
	break;
	default:
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Games="Games";
		SideBar_GamesT="Games Menu";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="World Indexing Progress";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";		
		SideBar_Search_Save="Save";		
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","Send message to all the allies"],
		["Forum "+alliancefullnm,"To the Forum of the Alliance " ],
		[alliancefullnm +" new forum posts","To the Forum of the Alliance, latest posts ",],
		["Chatbox(New Window)","Alliance Chat, opens in a new window"],
		["Chatbox(Frame)","Alliance Chat, displays chat in frames with no reload "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="• Allies";
		IslandLegendNoAlliance="• No Alliance";
		IslandLegendEnemies="• Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="There is a newer version of "+alliancefullnm+" Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.";
		txtplswait="Please Wait";
		txtrefresh="Refresh";
		txtpagedata="- Getting Page";
		txtinfodata="- Getting Info";
		txtchkplayer="- Checking Player";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	}
}

function getserverindex(){
	var servers={
	'ikariam.de':['de','0'],
	'ikariam.org':['en','1'],
	'ae.ikariam.com':['ae','2'],
	'ar.ikariam.com':['ar','3'],
	'ba.ikariam.com':['ba','4'],
	'ikariam.bg':['bg','5'],
	'ikariam.com.br':['br','6'],
	'by.ikariam.org':['by','7'],
	'cl.ikariam.org':['bl','8'],
	'ikariam.cn':['cn','9'],
	'ikariam.cz':['cz','10'],
	'ikariam.dk':['dk','11'],
	'ee.ikariam.org':['ee','12'],
	'eg.ikariam.org':['eg','13'],
	'ikariam.es':['es','14'],
	'fi.ikariam.com':['fi','15'],
	'ikariam.fr':['fr','16'],
	'ikariam.gr':['gr','17'],
	'hr.ikariam.org':['hr','18'],
	'ikariam.hk':['hk','19'],
	'ikariam.hu':['hu','20'],
	'id.ikariam.org':['id','21'],
	'ih.ikariam.org':['ih','22'],
	'ikariam.co.il':['il','23'],
	'in.ikariam.org':['in','24'],
	'ir.ikariam.org':['in','25'],
	'ikariam.it':['it','26'],
	'jp.ikariam.org':['jp','27'],
	'kr.ikariam.org':['kr','28'],
	'ikariam.lt':['lt','29'],
	'ikariam.lv':['lv','30'],
	'me.ikariam.org':['me','31'],
	'ikariam.com.mx':['mx','32'],
	'ikariam.nl':['nl','33'],
	'ikariam.no':['no','34'],
	'ikariam.pe':['pe','35'],
	'ikariam.ph':['ph','36'],
	'ikariam.pl':['pl','37'],
	'ikariam.com.pt':['pt','38'],
	'ikariam.ro':['ro','39'],
	'ikariam.ru':['ru','40'],
	'sa.ikariam.org':['sa','41'],
	'ikariam.se':['se','42'],
	'ikariam.si':['si','43'],
	'ikariam.sk':['sk','44'],
	'ikariam.net':['tr','45'],
	'ikariam.tw':['tw','46'],
	'ikariam.com':['us','47'],
	'ikariam.com.ua':['ua','48'],
	'ikariam.com.ve':['ve','49'],
	'ikariam.vn':['vn','50'],
	'co.ikariam.com':['co','51'],
	'ikariam.rs':['rs','52']
	}
	try {
		var a=servers[location.host.substr(location.host.indexOf('.')+1)];		
	} catch(e){		
	}
	if (!a) alert('Your server is not in the Ika-core Server List, Please report it at http://www.ika-core.org');
	return a;
}
var sea='&sea=12';
//check for update
function checkupdate(text){
	var testversion=text.split('var version=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	addsbubble('diplomat',CheckVersionBubbleNegative,9);
	if (version < newversion) 
		if (confirm(updatenotification+ '\nv' + newversion)) {
			location.href = scriptlocation;
		}
	get('http://www.ika-core.org/scripts/ika-core.js?v='+Math.floor(Math.random()*65535),checkcoreupdate);
}
//check for update
function checkcoreupdate(text){
	var testversion=text.split('var core_vers=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	if (core_vers < newversion) 
		if (confirm(updatenotification + '\n'+NewCoreVersion+': v' + newversion)) {
			location.href = scriptlocation;
		}
}

function version_update(){
	if(GM_getValue("LastUpdateMe")){
		var lastSearch;
		lastSearch = parseInt(GM_getValue("LastUpdateMe"));
		//check time elapsed from last update
		var now = parseInt(new Date().getTime());
		var searchFreq = 43200*1000; //
		//check update
		if(now - lastSearch > searchFreq){
			GM_setValue("LastUpdateMe", ""+now);
			get(scriptlocation,checkupdate);
		}
	} else GM_setValue("LastUpdateMe", ""+new Date().getTime());
}

//GM_setValue("LastUpdateMe", ""+(new Date().getTime()-560000000*1000));

function loadstyles(){
//CSS used for menus and player info tables
GM_addStyle("\
table#cor {\
			-moz-box-sizing:border-box;\
			-moz-outline: #ff9900 ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;\
			border-collapse:separate;\
			border-spacing:0px;\
			display:table;\
			margin-bottom:0;\
			margin-top:0;\
			text-indent:0;\
			color:#542C0F;\
			font-size:11px;}\
tbody#cor {\
		display:table-row-group;\
		vertical-align:middle;\
}\
#corsairprogress { position:fixed; z-index:500;padding:3px 3px 3px 3px;margin:0px 0px 0px 0px;}\
#nfoframe, #CityArmy, #CityFleet {z-index:55;background-color:#FDF7DD;;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:fixed;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px; -moz-outline: #ff9900 ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;}\
#nfoframeclose,.search_player,.mapview,.search_alliance,.page,.pagebar,.markscores,.savenotes,.gameplay,.questowner,.questally,.checktreaty,.newmessage,.spybash ,#nfomapbutton,#nfomapbuttona{background:#F6EBBC;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;}\
#nfoframeclose:hover,.search_player:hover,.mapview:hover,.search_alliance:hover,.page:hover,.pagebar:hover,.markscores:hover,.savenotes:hover,.newmessage:hover,.gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.spybash:hover {background:orange;text-decoration:none;}\
#nfoframeclose:active,.search_player:active,.mapview:active,.search_alliance:active,.page:active,.pagebar:active,.markscores:active,.savenotes:active,.newmessage:active,.gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.spybash:active {background:red;}\
.dragclass{ position : relative; cursor : move;}\
.korniza{width:100%;height:5px;background:url("+korniza+") repeat 0 0}\
#nfoplayer,#nfoalliance{background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584}\
#embassy #container #mainview .contentBox01h .content table#memberList td.action { margin:0 auto; float: none}\
#sidemenu {\
width:90px;\
background: transparent;\
z-index:500;\
position:fixed;\
}\
#sidemenu ul {\
list-style: none;\
margin: 0;\
padding: 0;\
}\
#sidemenu a, #sidemenu h2 {\
font: bold 10px/11px arial, helvetica, sans-serif;\
display: block;\
margin: 0;\
padding: 2px 2px;\
}\
#sidemenu h2 {\
background: #EDB76D;\
text-transform: uppercase;\
-moz-outline:#EDA76D outset 2px;\
-moz-outline-radius:0px 10px 10px 0px;\
font-size:9px;\
height:13px;\
width:60px;\
}\
#sidemenu a {\
color: #542C0F;\
width:80px;\
background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;\
text-decoration: none;\
-moz-outline:#FF9900 outset 1px;\
-moz-outline-radius:0px 6px 6px 0px;\
margin: 2px 0px 2px 0px;\
}\
#sidemenu a:hover {\
background: #ECbF7E;\
}\
#sidemenu li {position: relative;}\
#sidemenu ul ul ul {\
position: absolute;\
top: 0;\
left: 96%;\
border-color:#ffffff #C9A584 #997554 #C9A584;\
border-style:double;\
border-width:3px;\
background:#F6EBBC;\
}\
div#sidemenu ul ul ul,\
div#sidemenu ul ul li:hover ul ul\
{display: none;}\
div#sidemenu ul ul li:hover ul,\
div#sidemenu ul ul ul li:hover ul\
{display: block;}\
.111elisthead { background:#EDB76D;-moz-outline:#EDA76D outset 2px;-moz-outline-radius:10px 10px 0px 0px;} \
.111elistmain { background:#F6EBBC;-moz-outline:#FF9900 inset 1px;margin:0px 0px 0px 0px;}\
.111elistfoot { height:2px; background:#542C0F;-moz-outline:#FF9900 outset 1px;-moz-outline-radius:0px 0px 20px 20px;margin:0px 0px 0px 0px;}\
.blevels,.clevels,.upgradehover {\
background:#000;\
font-size:9px;\
margin:0;\
padding:0px 0px 0px 0px;\
color:#fff;\
-moz-outline: black ridge 3px;\
-moz-outline-radius: 8px 8px 8px 8px;\
text-align:center;\
position:absolute;\
z-index:1000;\
display:block;white-space:pre;}\
.bnames {\
font-size:9px;\
margin:0;\
padding:0px 10px 0px 10px;\
border-color:#ffffff #C9A584 #5D4C2F #C9A584;\
border-style:double;\
border-width:1px;\
-moz-border-radius:8px 8px 8px 8px;\
background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;\
color:#542C0F;\
font-family:'Times New Roman', Verdana;\
text-align:center;\
position:absolute;\
display:block;\
white-space:pre;\
background-color:#FDF8C1;\
opacity:0.8;\
}\
.elistmain {}\
.elisthead {background:url("+gradient+") repeat 0 0;color:#542C0F;font-weight:bold; font-size:11px;line-height:15px;}\
.elistfoot {}\
.backlight{position:relative;left:-30px;top-140px;width:130px;height:130px;background:transparent;z-index:-500;opacity:1}\
.header {\
 background-image: url(http://www.ika-core.org/images/bg.gif);\
 background-repeat: no-repeat;\
 background-position: center right;\
 cursor: pointer;\
 font-size: 8pt;\
}\
.headerSortUp {\
 background-image: url(http://www.ika-core.org/images/asc.gif);\
}\
.headerSortDown {\
 background-image: url(http://www.ika-core.org/images/desc.gif);\
}\
");
}

//some standard functions

function clickTo(img,action,cursor) {
	if (img) {
		img.addEventListener("click", action, false);
		switch (cursor){
			case 1:
				if (img.style) img.style.cursor = "pointer";
				break;
			case 2:
				if (img.style) img.style.cursor = "crosshair";
				break;
		}
	}
}

function mapevt(e){
	var obj;
	if (!e) var e = window.event;
	if (e.target) obj = e.target;
	else if (e.srcElement) obj = e.srcElement;
	return obj;
}

function get(url, cb , tag) {
	GM_xmlhttpRequest({method: "GET",
						url: url,
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function post(url, data, cb, tag) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI(data),
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function getItem(type, ul) {
	return $X('li[contains(concat(" ",normalize-space(@class)," ")," '+type+' ")]',ul||cityinfoPanel());
}

function cityinfoPanel() {
	return $X('id("information")//ul[@class="cityinfo"]');
}

function cityinfoPanelIsland() {
	return XX('.//div[@id="infocontainer"]', XPFirst);
}

function node(type, id, className, style, content, title ) {
	var n = document.createElement(type||"div"); 
	if (id) n.setAttribute('id',id);
	if (className) n.className = className;
	if (title) n.setAttribute('title',title);
	if (style) n.setAttribute('style',style);
	if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
	return n;
}

function remove(node){
  return node.parentNode.removeChild(node);
}

function btn(parent,id,name,txt,title,evt,x,extrastyle){
	if (parent) {
		if (!x) x='0';
		if (!extrastyle) extrastyle='';
		var button=node('a',id, name,'font-size:7px;margin:0px 0px 10px '+x+'px;'+extrastyle,txt,title);
		if(button) {
			parent.appendChild(button);
			if (evt) clickTo(button,evt,1);
		}
	}
}
var th='http://www.ika-core.org/';
function click(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,1, 0, 0, 0, 0, false, false, false, false, 0, node);
	node.dispatchEvent(event);
}

function onClick(node, fn, capture, e) {
	node.addEventListener((e||"") + "click", fn, !!capture);
}

function fmtNumber(n) {
	n += "";
	for (var i = n.length - 3; i > 0; i -= 3)
		n = n.slice(0, i) +","+ n.slice(i);
	return n;
}

function number(n) {
	n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
	return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function $fork() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE:
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
			result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
	return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	var objslength=objs.snapshotLength;
	for (var i = 0; i < objslength; i++) 
		call(objs.snapshotItem(i),i);
}

function forallrows(tbl,startrow,call){
	var k=tbl.rows.length;
	for (var i=startrow; i<k ; i++) 
		call(tbl,i);
}

var n = 500;
var dragok = false;
var y,x,d,dy,dx;
var xaxismove=false;
var yaxismove=false;

	function move(e){
		if (!e) e = window.event;
		if (dragok){			
			if (xaxismove) d.style.left = dx + e.clientX - x + "px";
			if (yaxismove) d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}

	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
		}
		switch (temp.className){
			case "dragclass":
				var obj=$fork(temp.title);
				xaxismove=true;
				yaxismove=true;
			break;
			case "dragsidemenu":
				var obj=$fork("sidemenu");
				xaxismove=false;
				yaxismove=true;
				//alert(obj.innerHTML);
				//var obj=temp.parentNode.parentNode.parentNode.parentNode.parentNode;
			break;
				
		}
		if (obj){ 
			dragok = true;
			obj.style.zIndex = n++;
			d = obj;
			dx = parseInt(obj.style.left+0);
			dy = parseInt(obj.style.top+0);
			x = e.clientX;
			y = e.clientY;
			document.addEventListener('mousemove',move,false);
			return false;
		}			
	}

	function up(){
		dragok = false;		
		document.removeEventListener('mousemove',move,false);
		if(d)
		switch (d.id){			
			case "sidemenu":
				if (parseInt(d.style.top)<0) d.style.top="0px";
				GM_setValue("SideBarTop",d.style.top);
			break;				
		}
	}
	
document.addEventListener('mousedown',down,false);
document.addEventListener('mouseup',up,false); 


//progresbar
var duration=3; // Specify duration of progress bar in seconds
var _progressWidth = 100;// Display width of progress bar.
var _progressBar = "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||";
var _progressEnd = 5;
var _progressAt = 0;
var col=th+'/colector/';

function ProgressCreate(end,tag) {
	_progressEnd = end;
	_progressAt = 0;
	if (!tag) tag='';
	getbody.appendChild(node('div','corsairprogress','','left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt((window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#F6EBBC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
	ProgressUpdate();
}

function ProgressDestroy() {
	remove($fork("corsairprogress"));
}

function ProgressStepIt() {
	_progressAt++;
	if(_progressAt > _progressEnd) _progressAt = _progressAt % _progressEnd;
	ProgressUpdate();
}

function ProgressUpdate() {
	var n = (_progressWidth / _progressEnd) * _progressAt;
	var bar = $fork("corsairbar");
	var temp = _progressBar.substring(0, n);
	bar.value = temp;
}

function getcurcityid(){
	return XX('//select[@id="citySelect"]/option[@selected="selected"]',XPFirst).value+'';
}

function getcurcityname(){
	return XX('//select[@id="citySelect"]/option[@selected="selected"]',XPFirst).innerHTML+'';
}


//used to make chat displayed in a frame
unsafeWindow.makeframes = function(elm) {    
	if (parent != self) 
		top.location.href = location.href;
	else {
		var frameset = document.createElement("frameset");
		var loc=location.href;
		frameset.cols = null;
		frameset.rows = "50%, 40%";
		frameset.setAttribute('style','overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;');
		frameset.setAttribute('id','framechat');

		var newFrame1 = document.createElement("frame");
		newFrame1.id = "newFrame1";
		newFrame1.name = "newFrame1";
		newFrame1.src = "http://"+location.host+"/index.php";
		newFrame1.setAttribute('target','_self');
		newFrame1.setAttribute('style','overflow-x: hidden;');
		var newFrame2 = document.createElement("frame");
		newFrame2.id = "newFrame2";
		newFrame2.name = "newFrame2";
		newFrame2.src = elm;
		newFrame2.setAttribute('style','overflow-x: hidden;');

		frameset.appendChild(newFrame1);
		frameset.appendChild(newFrame2);
		document.body=frameset;
		document.body.parentNode.setAttribute("style","overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;");
	}
}

function twitch(gmvar){
	if(!GM_getValue(gmvar)) GM_setValue(gmvar, "1");
}

function togglevar(gmvar){
	if (GM_getValue(gmvar)=='1') {
		GM_setValue(gmvar, "0");
	} else {
		GM_setValue(gmvar, "1");
	}
}

function testvar(gmvar){
	twitch(gmvar);
	if (GM_getValue(gmvar)=='1') return true;
	return false;
}	

var resgoods={'wine':1,'marble':2,'crystal':3,'sulfur':4};
function islandview(){
	var allystore=[];
	var allylength=alliance.length;	
	var culttreaties=GM_getValue("CultTtreaties"+location.host);
	if (testvar("IslandInVac")) {
		GM_addStyle(".vacation {text-decoration:line-through}");
		GM_addStyle(".inactivity {text-decoration:underline;}");
	}
	if (testvar("IslandInactiveBlink")) {
		GM_addStyle(".inactivity {text-decoration:blink;}");	
	}
	var paNode=$fork('breadcrumbs').parentNode;
	if (paNode) {
		if (testvar("IslandLegend")) {paNode.appendChild(node('li','corlegend','','position:absolute;top:193px;left:270px;width:120px;height:100px;z-index:49','\
				<font color="'+Alliance+'" size=1>• '+alliancefullnm+'</font><br>\
				<font color="'+Allies+'" size=1>'+IslandLegendAllies+'</font><br>\
				<font color="'+NoAlliance+'" size=1>'+IslandLegendNoAlliance+'</font><br>\
				<font color="'+Enemies+'" size=1>'+IslandLegendEnemies+'</font><br>'));}
		if (GM_getValue('IslandToggleButtons', '1') == '1') {
			btn(paNode, 'shownamestoggle', 'gameplay', 'N', 'Hides or shows the player names under the Cities.', function(){
				togglevar("IslandPlayerNames");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:640px;width:5px;z-index:54;');
			btn(paNode, 'shownamesextratoggle', 'gameplay', 'E', 'Strikes through players on vacation and underlines inactives.', function(){
				togglevar("IslandInVac");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			btn(paNode, 'showlegendtoggle', 'gameplay', '§', 'Show or hide the Highlight Legend.', function(){
				togglevar("IslandLegend");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:670px;width:5px;z-index:54');
			btn(paNode, 'showlevlesislandtoggle', 'gameplay', 'L', 'Show or hide the City Levels.', function(){
				togglevar("IslandLevels");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:685px;width:5px;z-index:54');
		}
	}
	try {
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst);
	var woodlvl=wood.className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst);
	var reslvl=res.className.split(' level')[1];
	res.setAttribute('style','z-index:0;');			
	if (testvar("IslandLevels")) {
		var as = node('a', 'clevels', 'clevels', 'background:#743C1F;width:12px;height:12px;top:20px;left:12px;', woodlvl);
		wood.appendChild(as);
		var as = node('a', 'clevels', 'clevels', 'background:#743C1F;width:12px;height:12px;top:15px;left:48px;', reslvl);
		res.appendChild(as);
	}

	var friendslist=GM_getValue("Friends"+location.host,"").split('#,#');
	var frlength=friendslist.length-1;
	var enemieslist=GM_getValue("Enemies"+location.host,"").split('#,#');
	var enlength=enemieslist.length-1;
	var IslandFriends=testvar("IslandFriends");
	var IslandCultTreaties=testvar("IslandCultTreaties");
	var IslandEnemies=testvar("IslandEnemies");
	var IslandSpies=testvar("IslandSpies");
	var IslandHighlight=testvar("IslandHighlight");
	var IslandPlayerNames=testvar("IslandPlayerNames");
	var IslandLevels=testvar("IslandLevels");
	
	forall("//li[contains(@class,'cityLocation')]", null, function(objpar,i){
		var iconleft=-10;
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var cityimage=XX(".//div",XPFirst,obj.parentNode);
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			var spy=XX(".//li[@class='spy']",XPFirst,obj);
			var citypar=city.parentNode;
			if (ally) {
				var allytext=ally.textContent;
				if (!allystore[allytext]){
					allystore[allytext]=1;
				} else {
					allystore[allytext]+=1;					
				}
			}
			if (IslandFriends) {				
				for (var q = 0; q < frlength; q++) {
					if (friendslist[q] == trim(owner)) {
						iconleft += 16;
						citypar.appendChild(node('span', null, null, 'background:transparent url(' + heartimg + ') no-repeat scroll 0px center;position:absolute;height:15px;width:15px;top:45px;left:' + iconleft + 'px;z-index:800;margin:0;padding:0px 0px 0px 0px;',null,"He is your friend!"));
					}
				}
			}
			if (IslandCultTreaties&&culttreaties)
				 if (culttreaties.indexOf(","+trim(owner)+",") != -1) {		
					iconleft+=43;
					citypar.appendChild(node('span',null,null,'background:transparent url('+sunshineimg+') no-repeat scroll 0px center;position:absolute;height:23px;width:42px;top:41px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;',null,"You have a cultural treaty with this player!"));
			}			
			if (IslandEnemies) {
				for (var q = 0; q < enlength; q++) {
					if (enemieslist[q] == trim(owner)) {
						iconleft += 50;
						citypar.appendChild(node('span', null, null, 'background:transparent url(' + smackimg + ') no-repeat scroll 0px center;position:absolute;height:20px;width:50px;top:42px;left:' + iconleft + 'px;z-index:800;margin:0;padding:0px 0px 0px 0px;',null,"He is your enemy!"));
					}
				}
			}
			if (IslandSpies) if (spy) {
				citypar.appendChild(node('span',null,null,'background:transparent url('+spyimg+') no-repeat scroll 0px center;position:absolute;height:18px;width:20px;top:45px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;',null,"We have a Spy(007 James Bond etc.) in this City!"));			
			}
			if (IslandHighlight) {
				if (ally) {					
					if (IslandPlayerNames) {
						citypar.appendChild(node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:8px;', '<span class="before"></span>' + owner + '(' + allytext + ')<span class="after"></span>'));						
					}
					var allyhtml=ally.innerHTML;					
					for (var j = 1; j < allylength; j++) 
						if (allyhtml == alliance[j][0]) {
							setCityColors(ally, city,cityimage, alliance[j][1]);
							break;
						}
				}
				else {
					if (IslandPlayerNames) {
						citypar.appendChild(node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:9px;', '<span class="before"></span>' + owner + '<span class="after"></span>'));						
					}
					setCityColors(null, city,cityimage,  NoAlliance);					
				}
			}
			if (IslandLevels) {				
				citypar.appendChild(node('a', 'clevels', 'clevels', 'top:30px;left:25px;width:12px;height:12px;', citylvl));
			}
		}
	});
	var mainview=$fork('mainview');var htmls='';var allyc=0;
	for (var i in allystore) {
		allyc++;		
		if (allystore[i] != 1) {htmls += '<tr><td style="padding:1px 0px 1px 0px;">' + i + '</td><td style="padding:2px 4px 2px 2px;">' + allystore[i] + '</td></tr>';}
						  else {htmls += '<tr><td style="padding:1px 0px 1px 0px;">' + i + '</td><td style="padding:2px 4px 2px 2px;">-</td></tr>';}
	}
	var allylist=node('table','alliancelist','dummy','position:absolute;bottom:10px;line-height:9px;opacity:0.6;background:#CCCCFF;color:black;border-style:double;font-size:11px',htmls,'Ally List');
	mainview.appendChild(allylist);
	} catch(e){}
}

function setCityColors(ally,city,cityimage,bcol){
	if (city) {
		cityimage.setAttribute('style', 'opacity:0.8');
		var nd=node("canvas",null,"backlight");
		if (nd.getContext) {
			var ctx = nd.getContext('2d');
			ctx.scale(2,1);
			var radgrad = ctx.createRadialGradient(75, 55, 25, 75, 70, 55);
			radgrad.addColorStop(0.0, bcol);
			radgrad.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = radgrad;
			ctx.fillRect(0, 0, 150, 150);			
		}
		city.parentNode.parentNode.appendChild(nd);
	}
}

if (debug==1){
  tm=5000;
  var debugwin=node('div','debug','dynamic','position:absolute;');
  getbody.appendChild(debugwin);  
}
	
function parsescore(text){
	s=text.split('<td class="score">');
	if (s[1]) {
		s=number(s[1].split('<')[0]);
		return s;
	} else {
		return 0;
	}	
}

function getplayerdata(text,tag){
	for (i=0;i<16;i++){
		if (tag[i]){			
			if (tag[i][1] == 0) {
				tag[i][1]= 1;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' MS<br>';	
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=army_score_main&searchUser='+tag[i][0],getplayerdata,tag);			
				return ;
			}
			if (tag[i][1] == 1) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' MS='+score+'<br>';	
				tag["data"][0]=tag["data"][0]+"&plscm"+i+"="+score;
				tag[i][1]= 2;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' GS<br>';	
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=trader_score_secondary&searchUser='+tag[i][0],getplayerdata,tag);
				return ;
			}
			if (tag[i][1] == 2) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' GS='+score+'<br>';	
				tag["data"][0]=tag["data"][0]+"&plscg"+i+"="+score;
				tag[i][1]= 3;
			}
		}
	}
	if (debug==1) debugwin.innerHTML+=tag["data"][0]+'<br>';	
	GM_xmlhttpRequest({	method: "POST",url: col+'col.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(tag["data"][0])});	
}




function getisle(text,tag){
	var par=[];
	text=text.split('<span class="island">')[1];
	text=text.split('<div id="cityNav">')[0];
	var nm=text.split('</span>')[0].split('[');
	text='<div id="rambazamba">'+text.split('<div id="mainview">')[1];
	var fake=node('div','','','',text);
	//var id=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]/a',XPFirst,fake).href.split('&id=')[1];
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst,fake).className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst,fake).className.split(' level');
	var wond=XX('//ul[@id="islandfeatures"]/li[@id="wonder"]',XPFirst,fake).className.split('wonder')[1];
	var data='s='+serverindex+'&w='+world+'&id='+tag+'&is='+nm[0]+'&ix='+nm[1].split(':')[0]+'&iy='+nm[1].split(':')[1].split(']')[0]+'&iw='+wond+'&ir='+resgoods[res[0]]+'&irl='+res[1]+'&iwl='+wood;
	forall("//li[contains(@class,'cityLocation')]", fake, function(objpar,i){
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var pils=XX(".//li[@class='name']/span/following::text()[1]",XPList,obj);
			if (pils.snapshotItem(1)) {var pil=number(pils.snapshotItem(1).textContent);} else {var pil=0;}
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var pst=0;
			var stvac=XX(".//span[@class='vacation']",XPFirst,city);
			var stina=XX(".//span[@class='inactivity']",XPFirst,city);
			if (stvac) pst=1;
			if (stina) pst=2;
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			if (ally) {
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+ally.innerHTML+'&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			} else	{
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+'-&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			}
			par[i]=[trim(owner),0];
		} else {
				data+='&cid'+p+'0&pst'+p+'0&p'+p+'&pil'+p+'0&c'+p+'&a'+p+'&t'+p+'0&po'+p+objpar.id.split('cityLocation')[1]+'&plscg'+p+'0'+'&plscm'+p+'0';
			par[i]=["",3];
		}		
	});
	data+="&grid="+globrand+"&rid="+rand+"&v=11&scv=1";
	par["data"]=[data,0];
	getplayerdata("",par);
}

function getisles(){
	if (islandsearch.length>0) {
		var isle=number(islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='before isle '+isle+'.<br>';
		if (isle>0 && isle<5800) get('http://'+location.host+'/index.php?view=island&id='+isle,getisle,islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='Isle finished('+isle+').<br>';
		islandsearch.splice(0,1);
		setTimeout(getisles,islandsearchs);
	} else setTimeout(servwhat,islandsearchs);
}

function servresponse(text,tag){
	if (debug==1) debugwin.innerHTML+=globrand+'='+rand+' text='+text+'<br>';
	islandsearch=text.split(',');
	islandsearchs=number(islandsearch[islandsearch.length-1]);
	islandsearch.splice(islandsearch.length-1,1);
	if (islandsearchs<10000) islandsearchs=tm;
	if (debug==1) debugwin.innerHTML+='Timeout='+islandsearchs+'<br>';
	setTimeout(getisles,islandsearchs);
}

var runs=0;setTimeout(servwhat,tm);
function servwhat(){
	if (debug == 1) {
		if (debug==1) debugwin.innerHTML+='Starting with tm='+tm+'<br>';
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	} else {
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	}
	runs++;
}

function smallimages(obj,sx,sy){
	forall('//img', obj, function(obj,i){
		obj.width=sx;obj.height=sy;
	});
};

function deleteLastRow(tbl,rows){
	var rowlen=tbl.rows.length;
	for (var i=0; i < rows; i++) tbl.deleteRow(rowlen-1);
}

function informpost(text,tag){
	ProgressStepIt();
	switch (tag) {
		case 'player':
			ProgressStepIt();
			var nfoframe=$fork("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			clickTo(XX('//a[@class="search_player"]',XPFirst, nfoframe),showplayernfo,1);
		break;
		case 'ally':
			ProgressStepIt();
			var nfoframe=$fork("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			forall('//a[@class="page"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
		case 'searchbar':
			ProgressStepIt();
			var nfoframe=$fork("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			forall('//a[@class="pagebar"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
	}
	ProgressDestroy();
}

function showplayernfo(e){
	var nfo=$fork("nfoframe");
	if (!nfo) {
		var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-200)+"px;top:"+parseInt((window.innerHeight/2) - 200)+"px;");
		getbody.appendChild(nfo);
	}
	var srcEl=mapevt(e);
	if (srcEl) {		
		switch (srcEl.className) {
			case 'questowner':
				ProgressCreate(10,txtinfodata);
				post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'player');
				break;
			case 'questally':
				ProgressCreate(10,txtinfodata);
				nfo.setAttribute('style','top:160px;left:'+parseInt((window.innerWidth/2)-300)+'px;');
				post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'ally');
				break;
			case 'search_player':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+player.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'player');
				}
				break;
			case 'search_alliance':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'ally');
				}
				break;
			case 'page':
				var page=srcEl.title;
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,'ally');
				}
				break;
			case 'pagebar':
				var page=srcEl.title;
				var stable=$fork('searchtable');
				if (stable){
					ProgressCreate(10,txtinfodata);
					nfo.setAttribute('style','top:160px;left:'+parseInt((window.innerWidth/2)-300)+'px;');
					post(ika+'/searchbar.php','s='+serverindex+'&w='+world+'&p='+XX('//input[@name="SearchPlayer"]',XPFirst,stable).value+ '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c='+XX('//input[@name="SearchCity"]',XPFirst,stable).value+'&st='+XX('//select[@name="SearchStatus"]',XPFirst,stable).value+'&a='+XX('//input[@name="SearchAlliance"]',XPFirst,stable).value+'&rad='+XX('//input[@name="SearchRadius"]',XPFirst,stable).value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,'searchbar');
				}
				break;
		}
	}
}

function markscores(){
var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var allieslist = '';
		var score;
		forallrows(table, 1, function(tbl, i){
			score=trim(tbl.rows[i].cells[4].innerHTML.split('(')[0]);
			allieslist += "," + tbl.rows[i].cells[1].innerHTML + "#^^" + number(score) + ",";
			tbl.rows[i].cells[4].innerHTML=score+"("+score+")";
		});
		GM_setValue("AlliesEmbassyList-"+location.host,allieslist);
	}		
}

function getmilitaryscore(text,tag){
	try {
		var table = XX('//table[@id="memberList"]',XPFirst);
		if (table) {
			if (tag == 'write') {
				var nt=new Date().getTime();
				GM_setValue('EmbassyMilitaryLastUpd',nt+'');				
				GM_setValue('EmbassyMilitaryCache', text);
			}
			var mil = node('th', null, "header", null, '<img width="12" heigth="12/" src="skin/layout/icon-helmet.gif"/>');
			table.rows[0].insertBefore(mil, table.rows[0].cells[5]);
			eval('var militaryscores=' + text);
			forallrows(table, 1, function(tbl, i){
				tbl.rows[i].insertCell(5);			
				var player = tbl.rows[i].cells[1].innerHTML;
				var sc = militaryscores[player];
				var scout = (sc) ? fmtNumber(sc) : '';
				tbl.rows[i].cells[5].innerHTML = '<small>' + scout + '</small>';
			});				
		$('#memberList').tablesorter({         
	    	sortList: [[4,1]] ,
			headers: { 4: {sorter:'score'},5: {sorter: 'score'},6: {sorter: false}}		
	    });	
		}
	} catch(e){}
}

function Embassy() {
	var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {		
		var lastcell=table.rows[0].cells.length-1;		
		//GM_setValue("AlliesEmbassyList","")				
		var allieslist=GM_getValue("AlliesEmbassyList-"+location.host,"");
		table.rows[0].cells[lastcell-1].innerHTML='<img height="16" width="20" src="http://www.ika-core.org/images/bars.png"/>';		
		btn(table.rows[0].cells[lastcell-1],'markscores','markscores','Mark','Mark the scores(Put the actual score to the grey ones).',markscores,5);			
		var points=0;
		forallrows(table,1,function(tbl,i){
			points+=number(tbl.rows[i].cells[4].innerHTML);
			var status=tbl.rows[i].cells[0];
			var player=tbl.rows[i].cells[1];			
			var ind=allieslist.indexOf(","+player.innerHTML+"#^^");
			if ( ind==-1) {
				allieslist+=","+player.innerHTML+"#^^"+number(tbl.rows[i].cells[4].innerHTML)+",";			
				GM_setValue("AlliesEmbassyList-"+location.host,allieslist);				
				player.setAttribute("style","color:blue;");
			} else {
				var spl=allieslist.substr(ind+1);
				spl=spl.substr(0,spl.indexOf(','));
				spl=spl.split("#^^")[1];
				tbl.rows[i].cells[4].innerHTML+=" <span style='color:darkgray;font-size:10px;'>("+fmtNumber(spl)+")</span>";
			}			
			if (status.className != "online") {
				if (status.title.search('01.01.1970') != -1) {
					status.innerHTML = "<div style='width:50px;float:left;font-size:10px;'><img src='"+bulbinimg+"' style='width:10px;height:13px;'/>&nbsp;"+SideBar_Search_PlayerInactive+"</div>";
					status.setAttribute('class', "");
					status.parentNode.setAttribute('style', "color:gray;");
					status.setAttribute('style', "text-align:left;");
				}
				else {
					status.setAttribute('class', "");
					status.setAttribute('style', "color:brown;text-align:left;float:left");
					var dt=status.title.split(":")[1];
					var dts=dt.split('.')[0]+'/'+dt.split('.')[1];
					status.innerHTML = "<div style='width:50px;font-size:10px;'><img src='skin/layout/bulb-off.gif' style='width:10px;height:13px;'/>&nbsp;" + dts + "</div>";
				}
			} else {
					status.innerHTML = "<div style='width:50px;float:left;font-size:10px;'><img src='skin/layout/bulb-on.gif' style='width:10px;height:13px;'/>&nbsp;Online</div>";
					status.setAttribute('class', "");				
					status.setAttribute('style', "text-align:left;");
			}
		});
		var allyscore = $X('//div[@class="contentBox01h"][1]//tbody/tr[4]/td[2]');	
		var allymembers = $X('//div[@class="contentBox01h"][1]//tbody/tr[2]/td[2]');			
		if (allyscore && allymembers){
			var allymembersnr=number(allymembers.textContent);			
			allyscore.innerHTML+=" - Ika-core :("+fmtNumber(points)+")  - Avg Points: "+fmtNumber(parseInt(points/allymembersnr));
		}
		if (testvar("EmbassyCheckTreaties")) {
			table.rows[0].cells[lastcell].setAttribute('style','width:120px');			
			btn(table.rows[0].cells[lastcell],'chktreatyall','checktreaty','Ѻ','Check all Players.',checkplayer,5);
			forallrows(table,1,function(tbl,i){				
				var player=tbl.rows[i].cells[1].innerHTML;				
				btn(tbl.rows[i].cells[lastcell],'chktreaty'+i,'checktreaty','Ѻ',player,checkplayer,2);
			});
		}
		if (testvar("EmbassyPlayerSearch")) 
			table.rows[0].cells[lastcell].setAttribute('style','width:120px');			
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn(tbl.rows[i].cells[lastcell],'questowner'+i,'questowner','?',player,showplayernfo,2);		
			});
		
		//military score stuff
		if (getbody.id=='embassy' && GM_getValue('EmbassyGetMilitary','1'=='1')){
			var vallynm=$X('id("mainview")/div[@class="contentBox01h"][1]//tbody/tr[1]/td[1]');
			if (vallynm){
				vallynm=vallynm.innerHTML.split(']')[0];
				vallynm=vallynm.split('[')[1];
				//GM_setValue('EmbassyMilitaryLastUpd','');
				//GM_setValue('EmbassyMilitaryCache', '');
				var embupd=GM_getValue('EmbassyMilitaryLastUpd',0);
				var tmnow=new Date().getTime();
				if (!embupd && (tmnow - embupd > 43200000)) {					
					get('http://www.ika-core.org/search/militaryscoreprovider.php?s=' + serverindex + '&w=' + world + '&a=' + vallynm, getmilitaryscore,'write');
				} else {
					getmilitaryscore(GM_getValue('EmbassyMilitaryCache'),'nowrite');
				}
			}			
		} else {
			$('#memberList').tablesorter({         
	    		sortList: [[4,1]] ,
				headers: { 4: {sorter:'score'},5: {sorter: false}}		
	    	});	
		}
	}
}

//check the message senders for museum stuff
function checkculturetreaty(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	var found=0;
	var mplayers="";
			forall('//td[@class="player"]', fake, function(obj,i){				
				mplayers+=","+obj.innerHTML+",";
			});
			
	GM_setValue("CultTtreaties"+location.host,mplayers);
	if (musplayer=="Check all Players."){
		forall('//*[@class="checktreaty"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});	
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			
			forall('//*[@class="checktreaty"][@title="'+obj.innerHTML+'"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});		
		});	
		addsbubble('diplomat',TreatyAll);
	} else {
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			if (obj.innerHTML==musplayer) found=1;
		});

		if (found==1) {
			addsbubble('diplomat',TreatyYes);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});
		}
		else {
			addsbubble('diplomat',TreatyNo);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});
		}
	}	
	ProgressDestroy();
}

function getposmuseum(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	buf=XX('//li[@class="museum"]/a', XPFirst,fake);
	ProgressStepIt();
	get(buf.href,checkculturetreaty,musplayer);
}

function checkplayer(e) { 
	var musplayer;
	ProgressCreate(10,txtchkplayer);
	var obj=mapevt(e);
	ProgressStepIt();
	musplayer=obj.title;
	ProgressStepIt();
	get(XX('//li[@class="viewCity"]/a',XPFirst).href,getposmuseum,musplayer);
}
var smilies = [
  			[/:D/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/biggrin.gif" width="15" height="17" alt=":D" title="Very Happy" />'],
			[/:\?/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/confused.gif" width="15" height="17" alt=":?" title="Confused" />'],
			[/8-\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/cool.gif" width="15" height="15" alt="8-)" title="Cool" />'],
			[/:cry:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/cry.gif" width="15" height="15" alt=":cry:" title="Crying or Very Sad" />'],
			[/:shock:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/eek.gif" width="15" height="15" alt=":shock:" title="Shocked" />'],
			[/:evil:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/evil.gif" width="15" height="15" alt=":evil:" title="Evil or Very Mad" />'],
			[/:!:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/exclaim.gif" width="15" height="15" alt=":!:" title="Exclamation" />'],
			[/:geek:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/geek.gif" width="17" height="17" alt=":geek:" title="Geek" />'],
			[/:idea:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/idea.gif" width="15" height="15" alt=":idea:" title="Idea" />'],
			[/:lol:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/lol.gif" width="15" height="15" alt=":lol:" title="Laughing" />'],
			[/:x/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/mad.gif" width="15" height="15" alt=":x" title="Mad" />'],
			[/:mrgreen:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/mrgreen.gif" width="15" height="15" alt=":mrgreen:" title="Mr. Green" />'],
			[/:\|/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/neutral.gif" width="15" height="15" alt=":|" title="Neutral" />'],
			[/:\?:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/question.gif" width="15" height="15" alt=":?:" title="Question" />'],
			[/:P/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/razz.gif" width="15" height="15" alt=":P" title="Razz" />'],
			[/:oops:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/redface.gif" width="15" height="15" alt=":oops:" title="Embarrassed" />'],
			[/:roll:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/rolleyes.gif" width="15" height="15" alt=":roll:" title="Rolling Eyes" />'],
			[/:\(/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/sad.gif" width="15" height="17" alt=":(" title="Sad" />'],
			[/:\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/smile.gif" width="15" height="17" alt=":)" title="Smile" />'],
			[/:o/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/surprised.gif" width="15" height="19" alt=":o" title="Surprised" />'],
			[/:twisted:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/twisted.gif" width="15" height="15" alt=":twisted:" title="Twisted Evil" />'],
			[/:ugeek:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/ugeek.gif" width="19" height="18" alt=":ugeek:" title="Uber Geek" />'],
			[/;\)/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/wink.gif" width="15" height="17" alt=";)" title="Wink" />'],
			[/:wink:/g,'<img src="http://www.ika-core.org/forum/images/smilies/icon/wink.gif" width="15" height="17" alt=";)" title="Wink" />'],
			[/:clap:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/clap.gif" width="19" height="16" alt=":clap:" title="Clap" />'],
			[/:dance:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/dance.gif" width="27" height="16" alt=":dance:" title="Dance" />'],
			[/:doh:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/doh.gif" width="22" height="16" alt=":doh:" title="Doh!" />'],
			[/:drool:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/drool.gif" width="15" height="16" alt=":drool:" title="Drool" />'],
			[/:hand:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/hand.gif" width="17" height="16" alt=":hand:" title="Talk to the hand" />'],
			[/:liar:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/liar.gif" width="20" height="15" alt=":liar:" title="Liar" />'],
			[/:naughty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/naughty.gif" width="20" height="16" alt=":naughty:" title="Naughty" />'],
			[/:pray:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/pray.gif" width="19" height="16" alt=":pray:" title="Pray" />'],
			[/:shhh:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/shhh.gif" width="15" height="16" alt=":shhh:" title="Shhh..." />'],
			[/:shifty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/shifty.gif" width="15" height="15" alt=":shifty:" title="Shifty" />'],
			[/:snooty:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/snooty.gif" width="16" height="15" alt=":snooty:" title="Snooty" />'],
			[/:think:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/think.gif" width="17" height="16" alt=":think:" title="Think" />'],
			[/:violin:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/violin.gif" width="39" height="16" alt=":violin:" title="Violin" />'],
			[/:whistle:/g,'<img src="http://www.ika-core.org/forum/images/smilies/eusa/whistle.gif" width="22" height="16" alt=":whistle:" title="Whistle" />']
			];

function Messages(){
	var tbl=XX('//table[@id="messages"]',XPFirst);
	if (tbl) {	
		var rlength=tbl.rows.length - 5;
		if (testvar("MessageCheckTreaties")) {
			btn(tbl.rows[0].cells[0], 'chktreatyall', 'checktreaty', 'Ѻ', 'Check all Players.', checkplayer, 5);
			btn(tbl.rows[0].cells[1], 'newmessage', 'newmessage', 'New RoundMail', 'Send new alliance roundmail.', function(){location.href='/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50';}, 5);
			for (i = 1; i < rlength; i = i + 3) {
				var player = trim(tbl.rows[i].cells[2].textContent);
				btn(tbl.rows[i].cells[0], 'chktreaty' + i, 'checktreaty', 'Ѻ', player, checkplayer, 5);
			}
		}
		
		if (testvar("MessagePlayerSearch")) {
			for (i = 1; i < rlength; i = i + 3) {
					var player = trim(tbl.rows[i].cells[2].textContent);
					btn(tbl.rows[i].cells[1], 'questowner' + i, 'questowner', '?', player, showplayernfo, 5);
				}
		}
		if (testvar("FormatHyperLinks")) {			
			forall("//td[@class='msgText']/div", tbl, function(obj,i){
				var txtbuf=obj.innerHTML;		
				txtbuf=txtbuf.replace(/((http|ftp):\/\/[^<]+)/g,"<a href='$1' target='_blank' style='text-decoration:none;margin:2px 2px 2px 2px;padding:1px 8px 1px 8px;color:#542C0F;font-weight:bold;font-size:10px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;-moz-outline:#FF9900 ridge 2px;-moz-outline-radius:6px 6px 6px 6px;-moz-outline-offset:-2px;' title='Click to Navigate (ika-core link transformation)'>-> $1</a>");				
				obj.innerHTML=txtbuf;
			});
		}
		if (testvar("FormatSmilies")) {
			var smlength=smilies.length;		
			forall("//td[@class='msgText']/div", tbl, function(obj,i){
				var txtbuf=obj.innerHTML;					
				for (var j = 0; j < smlength; j++){
					txtbuf=txtbuf.replace(smilies[j][0],smilies[j][1]);
				}
				obj.innerHTML=txtbuf;
			});
		}
	}
		
}

function fixtreaties(){
	forall("//select[@id='treaties']/option", null, function(obj,i){
		if (obj.firstChild.nodeValue.search(CultureTreaties)!=-1)
		switch (obj.value){
			case '0':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '1':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '2':
				obj.firstChild.nodeValue = CultureTreatiesRequest;
		}
	});
}

function playgames(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.id) {
			case 'marioplay':
				if ($fork("mario")) {
					remove($fork("mario"));
					return;
				}
				var mydiv = node('iframe', 'mario', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://www.nihilogic.dk/labs/mario8kb/';
				getbody.appendChild(mydiv);
				break;
			case 'bobleplay':
				if ($fork("boble")) {
					remove($fork("boble"));
					return;
				}
				var mydiv = node('div', 'boble', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.innerHTML = '<embed height="400" width="400" align="" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="false" name="BubbleBobbleTheRevival.swf" bgcolor="#FFFFFF" quality="high" src="http://www.fititis.gr/fititis2/components/flash/BubbleBobbleTheRevival.swf"/><noembed/>';
				getbody.appendChild(mydiv);
				break;
			case 'tetrisplay':
				if ($fork("tetris")) {
					remove($fork("tetris"));
					return;
				}
				var mydiv = node('iframe', 'tetris', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:325px;height:325px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://code.gosu.pl/dl/JsTetris/demo/JsTetris.html';
				getbody.appendChild(mydiv);
				break;
			case 'slotplay':
				if ($fork("slot")) {
					remove($fork("slot"));
					return;
				}
				var mydiv = node('iframe', 'slot', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:765px;height:365px; z-index:99;top:200px;left:320px;', null)
				mydiv.src = 'http://slotmachine.braincast.nl';
				getbody.appendChild(mydiv);
				break;
		}
	}
}

function talkbubble(who,text,fontsize,timeout){
	var x=20;
	var y=-165;
	if (!fontsize) {
		switch (text.split(' ').length) {
			case 1:
				fontsize='19';
			break;
			case 2:
				fontsize='18';
			break;
			case 3:
				fontsize='17';
			break;
			case 4:
				fontsize='15';
			break;
			case 5:
				fontsize='12';
			break;
			default:
				fontsize='10';
		}
	}	
	switch (who) {
		case 'mayor':
			var parelm=$fork('advCities');
		break;
		case 'general':
			var parelm=$fork('advMilitary');
		break;
		case 'scientist':
			var parelm=$fork('advResearch');
		break;
		case 'diplomat':
			var parelm=$fork('advDiplomacy');
		break;
	}
	bubbles++;
	var canvas=node('canvas','speechbubble'+bubbles,null,'position:relative;top:'+y+'px;left:'+x+'px;width:250px;height:150px;z-index:300;opacity:0.8');
	canvas.setAttribute('onmousemove','this.parentNode.removeChild(this)');
	var canvastext=node('table','speechbubbletext'+bubbles,null,'position:relative;top:'+parseInt(y-125)+'px;text-align:center;vertical-align:middle;left:'+parseInt(x+40)+'px;width:110px;height:57px;z-index:300;font-weight:600;font-family:comic;font-size:'+fontsize+'px','<tr><td>'+text+'</td></tr>');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		//speech bubble 
		ctx.scale(1.5,0.9);
		ctx.beginPath();
		ctx.moveTo(75,25);
		ctx.quadraticCurveTo(25,25,25,62.5);
		ctx.quadraticCurveTo(25,100,50,100);
		ctx.quadraticCurveTo(50,120,30,125);
		ctx.quadraticCurveTo(60,120,65,100);
		ctx.quadraticCurveTo(125,100,125,62.5);
		ctx.quadraticCurveTo(125,25,75,25);
		ctx.stroke();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fill();
	parelm.appendChild(canvas);
	parelm.appendChild(canvastext);
	}
	if(timeout) addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	else {
		timeout=parseInt(text.split(' ').length/2);
		if (timeout<2) timeout=2;
		addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	}
}

function destroybubble(bubid){
	var bub=$fork('speechbubble'+bubid);
	var bubtext=$fork('speechbubbletext'+bubid);	
	if (bub) remove(bub);
	if (bubtext) remove(bubtext);
}

function schedulerhandler(){
	timelapse++;
	if (scheduler){		
		for (var i=0;i<scheduler.length;i++){
			if (scheduler[i][0]==timelapse) {
				eval(scheduler[i][1]);
				scheduler.splice(i,1); //remove queue
				if (i>0) i--;
			}
		}
	}
}

function addschedule(what,tm){
	scheduler.push([tm ,what]);
}

function addsbubble(who,text,tm){
	if (tm) addschedule('talkbubble("'+who+'","'+text+'")',tm);
	else addschedule('talkbubble("'+who+'","'+text+'")',timelapse+1);
}


addsbubble('mayor','Check out ika-core.org', 175);
addsbubble('scientist','Oh Yeah', 177);
addsbubble('general','It rocks!', 180);

function extrapost(url, data, reqvalue, c, hiturl) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI('actionRequest='+reqvalue+'&'+data),
						onload: function(xhr) { 
							ProgressStepIt();
							GM_xmlhttpRequest({method: "GET",url: hiturl,onload: function(xhr) {							
								var getactionreq=node("div",null,null,null,xhr.responseText);
								var actionreq=XX('//form//input[@name="actionRequest"]',XPFirst,getactionreq);
								c--;
								if (actionreq) {
									if (c>0){
										setTimeout(function() { extrapost('http://'+location.host+'/index.php',data,actionreq.value,c,hiturl); }, parseInt(GM_getValue('BashDelay','2000')));																						
									} else {
										location.href=hiturl;
									}
								} else {
									alert("Could not send "+c+" spies.");
									location.href=hiturl;
								}
								}});						
						}});
}

function actionshandler(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			   case 'plunderbash':
					var postdata='';
					var reqvalue='';
					forall('//form//input',null,function(obj,i){
					if(obj.name)
					   if (obj.name=="actionRequest") {
						  reqvalue=obj.value;
					   } else {
						  postdata+=obj.name+'='+obj.value+'&';
					   }
					else
					   postdata+='submit='+obj.value;
					});
					
					if (srcEl.id=='spybash2') {
				var c=2;
				ProgressCreate(2,"Sending x"+c);
				}
				if (srcEl.id=='spybash5') {
				var c=5;
				ProgressCreate(5,"Sending x"+c);
				}
				if (srcEl.id=='spybash10') {
				var c=10;
				ProgressCreate(6,"Sending x"+c);
				}					
					setTimeout(function() { extrapost('http://'+location.host+'/index.php',postdata,reqvalue,c,location.href); }, 0);                                    
				 break;
			break;
		}
	}
}

//sidebar
function sidemenu(){
	var top=GM_getValue("SideBarTop","300px");	
	if (parseInt(top)<10) top='10px';
	if (parseInt(top)>600) top='600px';
	var sidebarnode = node("div","sidemenu",null,"left:0px;top:"+top+";",'<ul id="sidebarrow"></ul>');	
	getbody.appendChild(sidebarnode);
	clickTo(sidebarnode,sidebarevents,1);
	sidebarnode.addEventListener("mousemove",sidebareventsmousemove,false);
}

function sidetab(api,nm,title,width,height,initfunc,tag){
	var sidebarnode=$fork("sidebarrow");
	switch (tag){
		case "mover":
			sidebarnode.innerHTML += '\
				<li><ul><li class="dragsidemenu"><div style="cursor : move;width:12px;height:18px;background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;-moz-outline:#EDA76D outset 4px;-moz-outline-radius:10px 10px 10px 10px;font-size:14px;" Title="' + title + '">↕</div>\
				</li></ul></li>';
		break;
		case "menu":
			sidebarnode.innerHTML += '\
				<li><ul><li>\
				<a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
				' +	initfunc(width,title) +	'\
				</li></ul></li>';
		break;
		default:			
			sidebarnode.innerHTML += '\
			<li><ul><li><a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
			<ul><li>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elistmain" style="width:'+width+'px;height:'+height+'px;" id="'+api+'main"></div>\
					<div class="elistfoot" style="width:'+width+'px;"></div>\
			</li></ul></li></ul></li>';
	}
	if (initfunc) initfunc();
}

function sidebarevents(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case "questally":
				showplayernfo(e);
				break;
			case "questowner":
				showplayernfo(e);
				break;
			case "savenotes":
				GM_setValue('ikanotes', $fork('sidenotes').value);
				break;
			case "playgames":
				playgames(e);
				break;
			case "addfriend":
				if ($fork('friendname').value == '') {
					alert("Please type in your Friends Name!");
					return
				}
				GM_setValue("Friends"+location.host, GM_getValue("Friends"+location.host, "") + $fork('friendname').value + '#,#');
				friends();
				break;
			case "delfriend":
				GM_setValue("Friends"+location.host, GM_getValue("Friends"+location.host, "").replace(srcEl.title + '#,#', ''));
				friends();
				break;
			case "addenemy":
				if ($fork('Enemiesname').value == '') {
					alert("Please type in your Enemies Name!");
					return
				}
				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "") + $fork('Enemiesname').value + '#,#');
				enemies();
				break;
			case "delenemy":
				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "savesettings":
				forall('.//input', $fork('ikacoresettings'), function(obj, i){
				
					if (obj.type == "checkbox") {
						if (obj.checked == true) 
							GM_setValue(obj.name, '1')
						else 
							GM_setValue(obj.name, '0');
					}
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});
				
				
				GM_setValue("Enemies"+location.host, GM_getValue("Enemies"+location.host, "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "SearchMainQuickSearch":
				forall('.//input', $fork('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});
				var nfo = $fork("nfoframe");
				if (!nfo) {
					var nfo = node('div', 'nfoframe', null, "left:" + parseInt((window.innerWidth / 2) - 300) + "px;top:160px;");
					getbody.appendChild(nfo);
				}
				var stable = $fork('searchtable');
				if (stable) {
					ProgressCreate(10, txtinfodata);
					nfo.setAttribute('style', 'top:160px;left:' + parseInt((window.innerWidth / 2) - 300) + 'px;');
					post(ika + '/searchbar.php', 's=' + serverindex + '&w=' + world + '&p=' + XX('//input[@name="SearchPlayer"]', XPFirst, stable).value + '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c=' + XX('//input[@name="SearchCity"]', XPFirst, stable).value + '&st=' + XX('//select[@name="SearchStatus"]', XPFirst, stable).value + '&a=' + XX('//input[@name="SearchAlliance"]', XPFirst, stable).value + '&rad=' + XX('//input[@name="SearchRadius"]', XPFirst, stable).value + '&prc=' + XX('//li[@class="viewCity"]/a', XPFirst).href.split('id=')[1]+sea, informpost, 'searchbar');
				}
				break;
			case "SearchMainQuickClear":
				forall('.//input', $fork('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						obj.value="";
					}
				});				
				break;
		}		
/*		if (srcEl.id) {		
			switch (srcEl.id) {
			}
		}*/
	}
}

function sidebareventsmousemove(e){
//various speed hacks
	var srcEl=mapevt(e);
	if (srcEl) {
//		switch (srcEl.className) {			
//			case "speedalink":
//				alert(XX(".//div[@class='elistmain']",XPFirst,srcEl.parentNode));
//		}		
		if (srcEl.id) {		
//		alert(srcEl.id);
		//alert(XX(".//div[@class='elistmain']",XPFirst,srcEl).id);
			switch (srcEl.id) {
				case "Settingsmain":
				case "SettingsCont":
					settingscont();
					break;
			}
		}
	}
}


function sidetabs(){
	sidemenu();
	sidetab("","", SideBar_Drag, 0,0 ,null,"mover");
	if (GM_getValue("SideBarSearch",1)==1)  sidetab("Search", SideBar_Search, SideBar_SearchT, "500", "100%;",search);
	if (GM_getValue("SideBarTools",1)==1) 	sidetab("Tools", ''+alliancenm+'™', SideBar_ToolsT, 200, "100%",tools,"menu");
	if (GM_getValue("SideBarNotes",1)==1) 	sidetab("Notes",SideBar_Notes, SideBar_NotesT, 400, 400,notesinit);
	if (GM_getValue("SideBarAllies",1)==1) 	sidetab("Allies",SideBar_Allies, SideBar_AlliesT, 100, "100%", alliancelist,"menu");
	if (GM_getValue("SideBarEnemies",1)==1) sidetab("Enemies",SideBar_Enemies, SideBar_EnemiesT, 150, 340, enemies);
	if (GM_getValue("SideBarFriends",1)==1) sidetab("Friends",SideBar_Friends, SideBar_FriendsT, 150, 270,friends);
	if (GM_getValue("SideBarGames",1)==1) 	sidetab("Games",SideBar_Games, SideBar_GamesT, 100, 160, gameslist,"menu");
	if (GM_getValue("SideBarIndexing",1)==1) sidetab("Indexing",SideBar_Indexing, SideBar_IndexingT, 350, 0,indexing,"menu");
	if (GM_getValue("SideBarIndexing",1)==1) sidetab("News",SideBar_News, 'v'+core_vers+'   '+SideBar_NewsT, 300,200,news);
	sidetab("Settings",SideBar_Settings, SideBar_SettingsT, 350, 310,settings);	
	if (chaturl!='.'&&GM_getValue("SideBarChat",1)==1) sidetab("Chat",SideBar_Chat, SideBar_ChatT, GM_getValue("ChatWidth",1000), GM_getValue("ChatHeight",300),chat);	
}

function tools(width,title){	
		var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
<div class="korniza" style="width:'+width+'px"></div>';
		var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;-moz-outline:none;border-bottom:brown dotted 1px" ';
		corsairmenu=[['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , AllianceMenu[0][1], AllianceMenu[0][0],'','-'],
		[forumurl	,  AllianceMenu[1][1], AllianceMenu[1][0],''],
		[forumurlnew,  AllianceMenu[2][1], AllianceMenu[2][0],'','-'],
		[chaturl 	,  AllianceMenu[3][1], AllianceMenu[3][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		[''			,  AllianceMenu[4][1], AllianceMenu[4][0],'makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' ,  AllianceMenu[5][1], AllianceMenu[5][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		['http://ikariamlibrary.com/?content=CR%20Formatter&lang= "language"' ,  "Combat Report Formatter", "CR Formatter" ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		['http://www.ika-core.org',  AllianceMenu[6][1], AllianceMenu[6][0],'']];
		var corlength=corsairmenu.length;
		for (i=0;i<corlength;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
 	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
   return '<ul>'+tempmenu+'</ul>';
}

function indexing(width,title){
	var maplink=ika+'/world.php?sx=3.4&sy=2.8&s='+serverindex+'&w='+world+'&perc=1';
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	return "<ul><li><div class=\"korniza\"></div>\
	<div class=\"elisthead\" style=\"width:100%;\">"+title+"</div>\
	<div class=\"korniza\"></div>\
	<li><a href='#' onclick='document.getElementById(\"progmap\").src=\""+maplink+"\"' "+style+">Get Map</a></li><li><a href='http://www.ika-core.org' target='_blank' "+style+">Data by ika-core.org</span><br><img id='progmap' src=''/></a><div class='elistfoot' style='width:"+width+"px;'/></li></ul>";
}

function news(){
	var masternode=$fork("Newsmain");
	var notes=GM_getValue("ikanotes","Empty.");
	var injct='';
	injct+='\
<div style="height:200px;text-align: left; overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<hr><b>Ika-core v65</b><hr>\
<b>Ika-core Search results table.</b><br>\
-Has now export to excel feature.<br>\
Yes those gears next to the X button do something, no shit!!!.<br>\
-Showing also nr of members and scores for allies.<br>\
<b>Island View.</b><br>\
-Added small Ally summary table.<br>\
-Added city troops to lower corners.<br>\
<b>On main panel added bars to show warehouse status(also added productions underneeth).</b><br>\
<b>Changed the Embassy view.</b><br>\
-Added military score in embassy view.<br>\
It fetches the scores from ika-core.<br>\
Works only in embassy view not in diplomacy view.<br>\
-Changed the display of online dates.<br>\
-Optimized speed for the whole view.<br>\
<b>Fixed diplomacy view.</b><br>\
-Now also shows total ally scores and averages.<br>\
-Got the buttons back, next to players names.<br>\
Those buttons where missing.<br>\
<b>Changed City View.</b><br>\
-Added overlay for building upgrade needed goods.<br>\
It now calculates corectly all the goods even with the goods modifiers (special buildings)<br>\
-Added options on settings page so user can enable inventions that alter the buildings needs for upgrade<br>\
-City view now fetches the Army and Fleet automatically<br>\
and shows them on the lower corners.<br>\
They get auto fetched every 2 hours once you visit one city.<br>\
Table for overview of all cities Troops almost done, will be on next release.<br>\
<b>Fixed Transporter view.</b><br>\
-New transporter now show warehouse goods with auto update and calculation.<br>\
-Shows when the wine expires in days (gets red if critical).<br>\
-The bars also get red when warehouse full.<br>\
-There was a messup when you left city view.<br>\
It wasnt calculating the wine expense corectly.<br>\
-Fixed the building time display, was screwing up form time to time.<br>\
<b>Messages</b><br>\
-Added new button to quickly send roundmail.<br>\
-Fixing now new option to embed images,video,sound in messages.<br>\
-No I wont fix a stupid messages script to show more than 10 on every screen.<br>\
<b>Fixed lots of bugs.</b><br>\
<b>Optmized speed, ika-core has more features now but got even faster.</b><br>\
<hr><b>Ika-core v55</b><hr>\
<b>Fixed ika-core links transformator bug in message view.</b><br>\
<b>Added smilies to message view.</b><br>\
<b>Quick Transport fix by GigeL.</b><br>\
<hr><b>Ika-core v53</b><hr>\
<b>Fixed calculation on embassy view.</b><br>\
<b>Now counts all players points cause Ikariam version 0.3 has a limit of 49 million for Alliance points.</b><br>\
<b>Created a message Filter.</b><br>\
<b>If anything in the form of http://* is contained in a message it is automatically converted to a clickable link.</b><br>\
<b>Added building names.</b><br>\
<b>Fixed stored friends/enemies, now stores individualy for every world/server.</b><br>\
<b>Previous stored friends enemies/will be lost, sorry guys.</b><br>\
<b>Fixed treaties store for every server.</b><br>\
<hr><b>Ika-core v52</b><hr>\
<b>Ika-core is now considered in beta stage (not alpha).</b><br>\
<b>New table sorting in Embassy view,</b><br>\
<b>Click on any column you would like to sort.</b><br>\
<b>If you click the same column twice it sorts descending.</b><br>\
<b>If you hold down the shift key you can select multiple columns.</b><br>\
<b>New caching mechanism for the search, after the last traffic collapse</b><br>\
<b>I had to fix the code even more to get those search results faster,</b><br>\
<b>so everybody gets a chance to get results.</b><br>\
<b>The speed should be excelent now, if you still have problems with the speed post on the forum.</b><br>\
<hr><b>Ika-core v49</b><hr>\
<b>Showing the time it took for ika-core to execute.</b><br>\
<b>Some claimed that ika-core makes their experience slow,</b><br>\
<b>well guys its not ika, its something else.</b><br>\
<hr><b>Ika-core v44</b><hr>\
<b>Started collecting and showing military and goldscores.</b><br>\
<b>There will be a new release shortly allowing them as criteria of search.</b><br>\
<hr><b>Ika-core v43</b><hr>\
<b>Fix for the VN servers.</b><br>\
<hr><b>Ika-core v42</b><hr>\
<b>Bugfix for LT translations.</b><br>\
<div>';
	masternode.innerHTML=injct;	
}

function chat(){
	var masternode=$fork("Chatmain");
	masternode.innerHTML+="<center><div style='width:100%;height:100%;'><br><br><b>Move your mouse over here to enable the ika-core.org GLOBAL Chat.</b><br>";
	masternode.innerHTML+="<b>The best chat expierence is to have the chat in a frame. Go to Left-Sidebar:Tools and select Chat(Frame).</b><br><br>";
	masternode.innerHTML+="If you do not have a chat server for your Alliance you can simply use the one provided by ika-core.org .";
	masternode.innerHTML+="In order to use the chat you simply have to register.";
	masternode.innerHTML+="You also can have private conversations with others or create Rooms for multiple players to join.";
	masternode.innerHTML+="The rooms will auto expire after 30 minutes of inactivity.";
	masternode.innerHTML+="If you would like to have a private room that is also password protected and never expires, you need to apply for it on our forum.";
	masternode.innerHTML+="Generally people that donated can have this kind of rooms, in those rooms you will be granted Operator status (can kick , ban etc).</div></center>";
	masternode.setAttribute("onmousemove","	if (!document.getElementById('chatframei')) this.innerHTML=\"<iframe id='chatframei' width='100%' border='0' frameborder='0' height='100%' src='"+chaturl+"' style='margin-left:0px;'/>\";if (this.parentNode.style.left!=\'0px\') this.parentNode.style.left=\'0px\';");
}

function alliancelist(width,title){	
	var style=' style="width:90%;cursor:pointer;margin:0px 0px 0px 0px;padding:1px 2px 1px 2px;-moz-outline:none;" ';
	var tempmenu='<li><div class="korniza"></div>\
<div class="elisthead" style="width:100%;">'+title+'</div>\
<div class="korniza"></div>';
	var allylength=alliance.length;
   for (var i=0;i<allylength;i++){
		if (alliance[i][1]==Alliance){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
   for (var i=0;i<allylength;i++){
		if (alliance[i][1]==Allies){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
  	tempmenu+='<div class="elistfoot" style="width:'+parseInt(width+8)+'px;"/>';	
	return '<ul>'+tempmenu+'</ul>';
}

function notesinit(){
	var masternode=$fork("Notesmain");
	var notes=GM_getValue("ikanotes","Empty.");
	var injct='<textarea id="sidenotes" cols="57" wrap="soft" rows="21" style="background:#ECCF8E;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">'+notes+'</textarea><br>';
	var style=' style="display: inline;width:40px;cursor:pointer;margin:5px 5px 5px 5px;padding:2px 2px 2px 2px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	injct+='<br><a id="savenotes" class="savenotes" title="Click to save notes" '+style+'>'+SideBar_Search_Save+'</a>';
	masternode.innerHTML=injct;
}

function enemies(){
	var masternode=$fork("Enemiesmain");
	var style=' style="display: inline;width:40px;height:10px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	var style2=' style="width:16px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var enemieslist=GM_getValue("Enemies"+location.host,"").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="enemiestable" cellpading=2 cellmargin=2 border=0><tbody>';
	var enlength=enemieslist.length-1;
	for (var i=0;i<enlength;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:red;">'+enemieslist[i]+'</td><td><img id="questowner" class="questowner" title="'+enemieslist[i]+'" '+style2+' src="'+searchimg+'"/></TD><TD><img '+style3+' class="delenemy" title="'+enemieslist[i]+'" src="'+ximg+'"/></td></tr>';
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="Enemiesname" type="text" title="Type in Enemy Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addenemy" title="Click to add a new Enemy " '+style+'>'+SideBar_Search_Add+'</a>';
	var style=' style="width:149px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	var tempmenu='<br><br><div class="elisthead" style="width:98%">'+SideBar_Search_EnemyAlliances+'</div>';
	var allength=alliance.length;
	for (var i=0;i<allength;i++){
		if (alliance[i][1]==Enemies){
			tempmenu+='<center><a id="questally" class="questally" title="'+alliance[i][0]+'" style="margin:2px 3px 3px 0px;padding:1px 2px 1px 2px;-moz-outline:none;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;">'+alliance[i][0]+'</a></center>';
		}
	}
	masternode.innerHTML=injct+tempmenu;
	
}

function friends(){
	var masternode=$fork("Friendsmain");
	var style=' style="display: inline;width:32px;height:10px;cursor:pointer;margin:3px 3px 3px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584 ;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	var style2=' style="width:16px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var friendslist=GM_getValue("Friends"+location.host,"").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="friendstable" cellpading=2 cellmargin=2 border=0><tbody>';
	var frlength=friendslist.length-1;
	for (var i=0;i<frlength;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:green;">'+friendslist[i]+'</td><td><img id="questowner" class="questowner" title="'+friendslist[i]+'" '+style2+' src="'+searchimg+'"/></TD><TD><img '+style3+' class="delfriend" title="'+friendslist[i]+'" src="'+ximg+'" /></td></tr>';		
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="friendname" type="text" title="Type in Friend Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;border-width:1px;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addfriend" title="Click to add a new Friends " '+style+'>'+SideBar_Search_Add+'</a>';
	masternode.innerHTML=injct;
}

function iscrow(label,gmval,br){
	var out='';
	var configvalue=GM_getValue(gmval,'1');
	if (configvalue=='1') {
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" checked name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}else{
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}	
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function istrow(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function istrowttx(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td colspan=3 style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function istrowex(label,sz,gmval,defval1,defval2,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue1=GM_getValue(gmval+'L',defval1);
	var configvalue2=GM_getValue(gmval+'H',defval2);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"> '+SideBar_Search_Between+' <input type="text" value="'+configvalue1+'" size="'+sz+'" name="'+gmval+'L" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/> '+SideBar_Search_And+' <input type="text" value="'+configvalue2+'" size="'+sz+'" name="'+gmval+'H" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function isbrow(label,cls,title,br){
	var out='<td style="padding:10px 10px 10px 10px;"><input type="button" value="'+label+'" name="'+label+'" class="'+cls+'" style="cursor:pointer;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function settings(){
	var masternode = $fork("Settingsmain");
	masternode.innerHTML += "<center><div id='SettingsCont' style='width:100%;height:100%;font-weight:bold;'><br><br>Move your mouse over here to show the settings.<br>";
	masternode.innerHTML += "It has been done this way to improve perfomance.<br><br></div>";
}

function settingscont(){
	var settingsnode = $fork("ikacoresettings");
	if (!settingsnode) {
		var masternode = $fork("Settingsmain");
		masternode.innerHTML = '\
<div id="ikacoresettings" style="height:280px;cursor:default;overflow: -moz-scrollbars-vertical; overflow-x: none; overflow-y: auto;border-bottom:1px solid #ffffff;">\
<table id="settingstable" class="table01">\
<thead><tr><td colspan=4><h3><b><u>Side Bar Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow(SideBar_Search, 'SideBarSearch') +
		iscrow(SideBar_Notes, 'SideBarNotes', 1) +
		iscrow(SideBar_Allies, 'SideBarAllies') +
		iscrow(SideBar_Enemies, 'SideBarEnemies', 1) +
		iscrow(SideBar_Friends, 'SideBarFriends') +
		iscrow(SideBar_Games, 'SideBarGames', 1) +
		iscrow(alliancefullnm, 'SideBarTools') +
		iscrow(SideBar_Indexing, 'SideBarIndexing', 1) +
		iscrow(SideBar_Chat, 'SideBarChat') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Buildings Upgrade hint</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +		
		'<td colspan=4>If you have already discovered the upgrades below, please enable them so the building upgrade hint works correctly.</td></tr><tr style="border-bottom:1px dotted #E4B873">'+
		iscrow("Show Goods Needed for Upgrade", location.host+'.CityBuildingUpGoods') +
		iscrow("Pulley", location.host+'.pulley',1) +
		iscrow('Geometry', location.host+'.geometry') +
		iscrow("Spiritual Level", location.host+'.spiritlevel',1) +				
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Spy Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Spy wave Delay (in milisec, 1000 ms=1 sec)', 4, 'BashDelay', 2000) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Transporter</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Transporter', 'TransporterShow') +
		iscrow('Extended View', 'TransporterViewExtended',1) +
		iscrow('Production info and bars in current city', 'TransporterProductionBars') +		
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>City View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Toggle buttons', 'CityToggleButtons') +
		iscrow('Building Levels', 'CityBuildingLevels',1) +
		iscrow('Building Names', 'CityBuildingNames') +
		iscrow('Show City Troops', 'ShowCityTroops') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Island View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=4>Colors can be defined as strings like: red, lightyellow <br>\
or as hexadecimal like #rrggbb <br>\
for example #800000 (darkred).<td></tr>' +
		istrow('Alliance Color ', 4, 'AllianceColor', 'blue') +
		istrow('No Alliance Color ', 4, 'NoAllianceColor', 'purple', 1) +
		istrow('Allies Color ', 4, 'AlliesColor', 'cyan') +
		istrow('Enemies Color ', 4, 'EnemiesColor', 'red', 1) +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Toggle Buttons', 'IslandToggleButtons') +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Player Names under Cities', 'IslandPlayerNames') +
		iscrow('Text Effects for Inactives<br> and Players on Vacation', 'IslandInVac', 1) +
		iscrow('Make Inactives text blink', 'IslandInactiveBlink') +
		iscrow('Show Highlight Legend', 'IslandLegend', 1) +
		iscrow('Highlight Cities based<br> on Alliance', 'IslandHighlight') +
		iscrow('Heart next to<br> Friends Cities', 'IslandFriends', 1) +
		iscrow('Icon next to<br> Enemies Cities', 'IslandEnemies') +
		iscrow('Icon next to Cities <br> with Spies', 'IslandSpies', 1) +
		iscrow('Icon next to Cities <br> with signed Cultural Treaty.', 'IslandCultTreaties') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Messsages View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'MessageCheckTreaties') +
		iscrow('Find player Cities button', 'MessagePlayerSearch') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Embassy View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'EmbassyCheckTreaties') +
		iscrow('Find player Cities button', 'EmbassyPlayerSearch', 1) +
		iscrow('Get Military scores from ika-core', 'EmbassyGetMilitary') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Highscore View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Find Alliance Cities Button', 'HighscoreAllianceSearch') +
		iscrow('Find Player Cities Button', 'HighscorePlayerSearch', 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Chat Sidebar</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Width', 3, 'ChatWidth', 1009) +
		istrow('Height', 3, 'ChatHeight', 400, 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Alliance Message Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrowttx('Signature(write #br# to change row)', 20, 'Signature', '', 1) +
		iscrow('Ika-core links transformation', 'FormatHyperLinks') +
		iscrow('Parse Smilies', 'FormatSmilies') +
		'</tr></tbody></table></div>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#C9A584"/>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#5D4C2F"/>\
<div style="width:100%;height:5px;padding:5px 5px 5px 5px;"/>\
<a id="savesettings" class="savesettings" title="Click to save settings" style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;">' +
		SideBar_Search_Save +
		'</a>';
	}
}
function search(){
	var masternode=$fork("Searchmain");
	masternode.innerHTML+='\
<div id="ikasearch" style="cursor:default">\
<table id="searchtable" class="table01" width="100%">\
<thead><tr>\
<td style="font-weight:600;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-right:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_QuickSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_AdvancedSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">Island Search</td>\
</tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873"><td colspan="3">\
<div id="mainsearch"><table width="100%"><tr>'
+istrow(SideBar_Search_Player,12,'SearchPlayer','',1,"Use the '%' as a Wildcard, example: pa% will fetch paul,pauline etc")
+istrow(SideBar_Search_City,12,'SearchCity','',1,"Use the '%' as a Wildcard, example: Ath% will fetch Athens, etc")+'\
<tr><td style="padding:2px 0px 2px 4px;">'+SideBar_Search_PlayerStatus+'</td>\
<td style="padding:10px 10px 10px 10px;">\
<select id="SearchStatus" name="SearchStatus" title="Select the Player Status" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">\
	<option Title="Player Status:All" value="%">'+SideBar_Search_PlayerAll+'</option>\
	<option Title="Player Status:Unknown" value="-1">'+SideBar_Search_PlayerUnknown+'</option>\
	<option Title="Player Status:Normal" value="0">'+SideBar_Search_PlayerNormal+'</option>\
	<option Title="Player Status:Vacation" value="1">'+SideBar_Search_PlayerVacation+'</option>\
	<option Title="Player Status:Inactive" value="2">'+SideBar_Search_PlayerInactive+'</option>\
</select></td></tr>'
+istrow(SideBar_Search_Alliance,1,'SearchAlliance','',1,"Use the '%' as a Wildcard, example: A% will fetch all starting with A, %S will get all ending with S, use the - (minus) for no alliance")
+istrow(SideBar_Search_Radius,1,'SearchRadius','',1,"Leave blank for any radius, must be a number. Specifies the distance of your results. example: 2 will show only 2 islands away.")
+istrowex(SideBar_Search_TownHallLevel,5,'SearchTownHallLevel',0,32,1,"Type in low and high limit.")
+istrowex(SideBar_Search_MilitaryScore,5,'SearchMilitaryScore',0,99999,1,"Type in low and high limit.")
+istrowex(SideBar_Search_GoldScore,8,'SearchGoldScore',0,99999999,1,"Type in low and high limit.")
+isbrow(SideBar_Search_Clear,'SearchMainQuickClear',"Click to clear Search Criteria")
+isbrow(SideBar_Search_Search,'SearchMainQuickSearch',"Click to start Search")
+'</tr></table></div>\
<div id="advanced" style="visibility:hidden"><table width="100%"><tr>'
+'</tr></table></div>\
</td></tbody></table></div>';
/*<hr>\
<h3><b><u>Advanced Search</u></b></h3>\
Radius&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
X&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Y&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island resource type&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Townhall Level&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Limit results&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Player Status&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
<hr>\
</div>\
';*/
}
function gameslist(width,title){	
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
//	var tempmenu='<li><div class="elisthead" style="width:'+width+'px;border-bottom:brown outset 2px">'+title+'</div>\
	var tempmenu='<li><div class="korniza"></div>\
	<div class="elisthead" style="width:100%;">'+title+'</div>\
	<div class="korniza"></div>\
	<li><a id="marioplay" class="playgames" '+style+' title="Opens mini Mario bros game, its better than Ikariam. trust me.">Mario Bros</a></li>\
	<li><a id="bobleplay" class="playgames" '+style+' title="Opens mini Buble Boble game, some action to ikariam players. weeeeeeeeeeh.">Buble Boble</a></li>\
	<li><a id="tetrisplay" class="playgames" '+style+' title="Opens mini Tetris game, for the brains among u.">Tetris</a></li>\
	<li><a id="slotplay" class="playgames" '+style+' title="Opens mini slot machine, viva Las Vegas.">Slot Machine</a></li>';
  	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
	return '<ul>'+tempmenu+'</ul>';
}

function Highscores(){
	var magic=XX('//select[@name="highscoreType"]',XPFirst);
	if (magic){
		var magic=XX('//td[@class="allytag"]',XPFirst);
		if (magic) {
		if (testvar('HighscorePlayerSearch'))
			forall('.//td[@class="name"]',$fork('mainview') , function(obj,i){;
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,5);});
		if (testvar('HighscoreAllianceSearch'))
			forall('.//td[@class="allytag"]', null, function(obj, i){
				btn(obj, 'questally' + i, 'questally', '?', obj.textContent, showplayernfo, 5);
			});			
		} else {
		if (testvar('HighscoreAllianceSearch'))
		forall('.//td[@class="name"]',$fork('mainview') , function(obj,i){;
				var ally=obj.textContent.split('(')[1];
					ally=ally.split(')')[0];					
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questally'+i,'questally','?',ally,showplayernfo,5);});	
		}
	}
}

function focus(direction){
    var all = getCityLinks();
    var now = unsafeWindow.selectedCity;
    var cur = $X('id("cityLocation' + now + '")/a') || all[all.length - 1];
    if (all.length) {
        now = all.map(function(a){
            return a.id;
        }).indexOf(cur.id);
        click(all[(now + direction + all.length * 3) % all.length]);
    }
}

function getCityLinks(){
    return $x('id("cities")/li[contains(@class,"city level")]/a');
}

function keyHandler(evt){

    function invoke(a){
        a = $X('id("actions")/ul[@class="cityactions"]/li[@class="' + a + '"]/a');
        return function(){
            if (a && a.href) 
                location.href = a.href;
        };
    }
    
    function counterClockwise(){
        focus(-1);
    }
    function clockwise(){
        focus(1);
    }
    
    function tab(){
        if (!evt.altKey && !evt.ctrlKey && !evt.metaKey) 
            focus(evt.shiftKey ? -1 : 1);
    }
    
    function invoketogo(a){
        return function(){
            location.href = a;
        };
    }
    var srcEl = mapevt(evt);
    if (srcEl.tagName=="HTML") {	   
	    var keys = {
	        "\t": tab,
	        j: counterClockwise,
	        k: clockwise,
	        c: invoke("diplomacy"),
	        t: invoke("transport"),
	        p: invoke("plunder"),
	        b: invoke("blockade"),
	        s: invoke("espionage"),
	        i: invoketogo("http://" + location.host + "/index.php?view=tradeAdvisor&oldView=militaryAdvisorCombatReports"),
	        m: invoketogo("http://" + location.host + "/index.php?view=militaryAdvisorCombatReports&oldView=militaryAdvisorCombatReports"),
	        d: invoketogo("http://" + location.host + "/index.php?view=diplomacyAdvisor&oldView=tradeAdvisor"),
	        n: invoketogo("http://" + location.host + "/index.php?view=merchantNavy")
	    };
	    
	    var action = keys[String.fromCharCode(evt.keyCode || evt.charCode)];
	    if (action && evt.ctrlKey==false && evt.altKey==false) {	        
	        action();
	    }
	}    
}

function formattime(timestamp){
			maxDigits = 2;
			zerofill = false;
			var timeunits = [];
			timeunits['day'] = 60 * 60 * 24;
			timeunits['hour'] = 60 * 60;
			timeunits['minute'] = 60;
			timeunits['second'] = 1;
			timestamp = Math.floor(timestamp / 1000);
			var timestring = "";
			for (var k in timeunits) {
				var nv = Math.floor(timestamp / timeunits[k]);
				if (maxDigits > 0 && (nv > 0 || (zerofill && timestring != ""))) {
					timestamp = timestamp - nv * timeunits[k];
					if (timestring != "") {
						timestring += " ";
						if (nv == 0) {
							nv = "00";
						}
					}
					timestring += nv + LocalizationStrings['timeunits']['short'][k];
					maxDigits--;
				}
			}
			return timestring;
}

function Tranporter(){
	
	if (GM_getValue('TransporterShow', '1') != '1') {
		GM_setValue(location.host + 'TransporterStore', '!');
		return;
	}
	function TransporterOver(){	DestinationCitiesTransporter.style.visibility = "visible";}
	function TransporterHide(){DestinationCitiesTransporter.style.visibility = "hidden";}
	var pnode = $fork('breadcrumbs');
	var citySelect = $fork("citySelect");
	var htmls = "";
	if (!$fork('IkaCoreTransporter')) {
		var TransporterNode = node('div', 'IkaCoreTransporter', 'IkaCoreTransporter', 'float:left;position:relative;top:-2px;', '<img height="22" width="28" alt="Transport" title="Transport Goods to one of your Cities" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif"/>-');
		var DestinationCitiesTransporter = node('div', 'DestinationCitiesTransporter', 'DestinationCitiesTransporter', 'position:absolute;visibility:hidden;width:auto;background:#F6EBBC none repeat scroll 0 0;color:#542C0F;border-color:#ffffff #5D4C2F #000000 #C9A584;border-style:double;border-width:3px;');
		TransporterNode.appendChild(DestinationCitiesTransporter);
		pnode.insertBefore(TransporterNode, pnode.firstChild);
		TransporterNode.addEventListener('mouseover', TransporterOver, false);
		TransporterNode.addEventListener('mouseout', TransporterHide, false);
	} else {
		var DestinationCitiesTransporter = $fork('DestinationCitiesTransporter');
	}
	restransicons = [[0, 'wood', '/skin/resources/icon_wood.gif'], [1, 'wine', '/skin/resources/icon_wine.gif'], [2, 'marble', '/skin/resources/icon_marble.gif'], [3, 'crystal', '/skin/resources/icon_glass.gif'], [4, 'sulfur', '/skin/resources/icon_sulfur.gif']];
	function TranslateResource(res){
		for (var j = 0; j < 5; j++) {
			if (res == LocalizationStrings['resources'][j]) 
				return restransicons[j][2];
		}
	}
	if (GM_getValue('TransporterViewExtended', '1') == '1') {
		var curtime = new Date();		
		function parsegoods(gd, map){
			if (!map['startdate']) 
				map['startdate'] = Number(curtime);
			if (gd.limit) 
				map['limit'] = gd.limit;
			if (gd.production) 
				map['production'] = gd.production;
			if (gd.spendings) 
				map['spendings'] = gd.spendings;
			if (gd.valueElem.id) 
				map['valueElem'] = gd.valueElem.id;
			return map;
		}
		var TransporterStore = [];
		var buf = GM_getValue(location.host + 'TransporterStore', '!');
		
		if (buf != '!') {
			try{
				TransporterStore = unserialize(buf);
			} catch(e){
				GM_setValue(location.host + 'TransporterStore', '!');
			}
		} 

		if (TransporterStore[getcurcityid()]){
			if (TransporterStore[getcurcityid()]['tmpCnt'])
				var tmpCntbuf=TransporterStore[getcurcityid()]['tmpCnt'];
			if (TransporterStore[getcurcityid()]['wineCounter'])
			if (TransporterStore[getcurcityid()]['wineCounter']['wineModifier'])
				var wmbuf = TransporterStore[getcurcityid()]['wineCounter']['wineModifier'];
			
		} 
		TransporterStore[getcurcityid()] = IKARIAM['currentCity'];
		if (woodCounter) {
			TransporterStore[getcurcityid()]['woodCounter'] = [];
			parsegoods(woodCounter, TransporterStore[getcurcityid()]['woodCounter']);
		}
		if (wineCounter) {			
			TransporterStore[getcurcityid()]['wineCounter'] = [];			
			parsegoods(wineCounter, TransporterStore[getcurcityid()]['wineCounter']);
			if (getbody.id == 'city') {
				var wm = Number(parsemodifiers('vineyard'));
				TransporterStore[getcurcityid()]['wineCounter']['wineModifier'] = wm;
			} else if (wmbuf) 
					TransporterStore[getcurcityid()]['wineCounter']['wineModifier'] = wmbuf;		
		}
		if (tradegoodCounter) {
			TransporterStore[getcurcityid()]['tradegoodCounter'] = [];
			parsegoods(tradegoodCounter, TransporterStore[getcurcityid()]['tradegoodCounter']);
		}
		if (tmpCnt) {
			TransporterStore[getcurcityid()]['tmpCnt'] = tmpCnt.enddate;
		} else if (tmpCntbuf) {
			TransporterStore[getcurcityid()]['tmpCnt'] = tmpCntbuf;
		}
		
		try{
			GM_setValue(location.host + 'TransporterStore', serialize(TransporterStore));		
		} catch(e){
			GM_setValue(location.host + 'TransporterStore', '!');
			return;
		}
		
		function regcounter(config, elem){
			if (config.production) {
				config.currentRes = parseInt(config.available + config.production * Math.floor((curtime - config.startdate) / 1000));
			}
			else {
				config.currentRes = config.available;
			}
			if (!config.spendings) return config.currentRes;
			for (var i = config.spendings.length - 1; i >= 0; --i) {
				config.currentRes = parseInt(config.currentRes - config.spendings[i]['amount'] * Math.floor((curtime - config.startdate) / 1000 / config.spendings[i]['tickInterval']) * config.spendings[i]['tickInterval'] / 3600);
			}
			if (config.currentRes < config.limit[0]) 
				config.currentRes = config.limit[0];
			if (config.currentRes > config.limit[1]) 
				config.currentRes = config.limit[1];
			return config.currentRes;
		}
		
		function getperc(capacity, current, cl, bcl, h, bo){
			if (!bo) 
				bo = 2;
			if (!h) 
				h = 3;
			if (!bcl) 
				bcl = 'yellow';
			if (!cl) 
				cl = 'orange';
			var b = parseInt(100 / (capacity / current));
			var a = 100 - b;
			var htmls;
			var col = cl;
			if (b > 75) {
				col = 'red'
			}
			htmls = '<table style="width: 100%;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:lightyellow outset ' + bo + 'px" class="dummy"><tr>\
		<td style="background-color:' +
			col +
			';height:' +
			h +
			'px;opacity:0.6;" width="' +
			b +
			'%"/>\
		<td style="background-color:' +
			bcl +
			';height:' +
			h +
			'px;opacity:0.6;" width="' +
			a +
			'%"/>\
		</tr></table>';
			return htmls;
		}
		
		htmls += '<div style="background:#ECCF8E url(' + gradient + ') repeat-x scroll 0 0;width:100%;height:15px;text-align:center;line-heigth:15px;font-size:11px;font-weight:bold;">Transporter</div>';
		htmls += '<table class="lal" style="display:block;width:740px;clear:left;margin:2px 2px 2px 2px;padding:0px 0px 0px 0px;text-align:center;">';
		htmls += '<thead><tr style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0"><th style="width:245px;border:dotted 1px yellow;text-align:center;"><i>City</i></th><th style="width:60px;border:dotted 1px yellow;text-align:center;"><i>Build</i></th>';
		for (var j = 0; j < 5; j++) {
			htmls += '<th colspan=2 style="width:100px;border:dotted 1px yellow;text-align:center;"><img src="' + restransicons[j][2] + '" width=20 height=14/></td>';
		}
		htmls += '<th style="width:90px;border:dotted 1px yellow;text-align:center;"><i>Action</i></th></tr></thead>';
		var woodprodtot = 0;
		var marbleprodtot = 0;
		var sulfurprodtot = 0;
		var crystalprodtot = 0;
		var wineprodtot = 0;
		var woodtot = 0;
		var marbletot = 0;
		var sulfurtot = 0;
		var crystaltot = 0;
		var winetot = 0;
		var citylength = citySelect.length;
		for (var i = 0; i < citylength; i++) {
			var citytrans = TransporterStore[citySelect[i].value];
			var bimg = TranslateResource(trim(citySelect[i].title.split(':')[1]));
			htmls += '<tr style="border:dotted 1px yellow;' + (citySelect[i].selected ? 'background:#f9e5c4;' : '') + '"><td style="color:#542C0F;padding:5px 5px 5px 5px;text-align:left;"><a class="linki" href="#" onclick="document.getElementById(\'citySelect\').childNodes['+(i+1)+'].selected=true;document.getElementById(\'citySelect\').childNodes['+(i+1)+'].form.submit();" style="color:#523524"><img src="' + bimg + '" width=14 height=10/>' + citySelect[i].text + '</a></td>';
			if (citytrans) {
				if (citytrans['tmpCnt']) {
					var tm = citytrans['tmpCnt'] - curtime;
				}
				else {				
					var tm = -1;
				}
				if (tm > 0) {
					htmls += '<td style="border:dotted 1px yellow;color:#542C0F;padding:0px 5px 0px 5px;font-size:9px;">' + formattime(tm) + '</td>';
				}
				else {
					htmls += '<td style="border:dotted 1px yellow;"></td>';
				}
			}
			else {
				htmls += '<td style="border:dotted 1px yellow;"></td>';
			}
			
			for (var j = 0; j < 5; j++) {
				var resourcenm = restransicons[j][1];
				var respointer = citySelect[i].value + resourcenm;
				if (citytrans) {
					var productionstr = '';
					var tradenr = 0;
					var trade = citytrans['tradegoodCounter'];
					
					switch (resourcenm) {
						case 'wood':
							woodtot+=citytrans['resources'][resourcenm];
							var wood = citytrans['woodCounter'];
							if (wood) {
								tradenr = parseInt(wood['production'] * 3600);
								woodprodtot += tradenr;
								wood['available'] = citytrans['resources'][resourcenm];
								citytrans['resources'][resourcenm] = regcounter(wood, respointer);
							}
							break;
						case 'wine':
							winetot+=citytrans['resources'][resourcenm];
							if (trade) {
								if (trade['valueElem'] == 'value_wine') {
									tradenr = parseInt(trade['production'] * 3600) - parseInt(trade['spendings'][0]['amount']);
									trade['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(trade, respointer);
								}
							}
							var expe = citytrans['wineCounter'];
							if (expe) {
								tradenr -= parseInt(expe['spendings'][0]['amount']*(expe['wineModifier']? expe['wineModifier']:1));
								expe['available'] = citytrans['resources'][resourcenm];
								citytrans['resources'][resourcenm] = regcounter(expe, respointer);
							}
							wineprodtot += tradenr;
							
							break;
						case 'marble':
							marbletot+=citytrans['resources'][resourcenm];
							if (trade) {
								if (trade['valueElem'] == 'value_marble') {
									tradenr = parseInt(trade['production'] * 3600);
									trade['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(trade, respointer);
								}
							}
							marbleprodtot += tradenr;
							break;
						case 'crystal':
							crystaltot+=citytrans['resources'][resourcenm];
							if (trade) {
								if (trade['valueElem'] == 'value_crystal') {
									tradenr = parseInt(trade['production'] * 3600);
									trade['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(trade, respointer);
								}
							}
							crystalprodtot += tradenr;
							break;
						case 'sulfur':
							sulfurtot+=citytrans['resources'][resourcenm];
							if (trade) {
								if (trade['valueElem'] == 'value_sulfur') {
									tradenr = parseInt(trade['production'] * 3600);
									trade['available'] = citytrans['resources'][resourcenm];
									citytrans['resources'][resourcenm] = regcounter(trade, respointer);
								}
							}
							sulfurprodtot += tradenr;
							break;
					}
					if (tradenr > 0) {
						productionstr = '+' + tradenr;
					} else if (tradenr != 0) {
						var calc = parseInt(citytrans['resources'][resourcenm] / Math.abs(tradenr)*3600000);							
						productionstr = '<span style="'+(calc < 3600000*48 ? 'color:red;':'')+'width:35px;">' +formattime(calc) + '</span>';
					}
					if (citySelect[i].selected&&GM_getValue('TransporterProductionBars', '1') == '1') {
						GM_addStyle("#container ul.resources li{line-height:14px}");
						if (!$fork('prod_' + resourcenm)) {
							var dummyn = node('a', 'prod_' + resourcenm, 'dummy', 'position:absolute;width:50px;bottom:-9px;left:30px;color:#542C0F;font-size:8px;cursor:pointer;margin:0px 3px 0px 3px;', (tradenr!=0?'('+productionstr + ')':'')+'<div style="position:relative;bottom:16px;opacity:0.7;">' + getperc(citytrans['maxCapacity'][resourcenm], citytrans['resources'][resourcenm], 'darkorange', 'yellow', 3) + '</div>', 'Production');
							$fork('value_' + resourcenm).parentNode.appendChild(dummyn);
						}
					}
					htmls += '<td style="border:dotted 1px yellow;color:#542C0F;padding:0px 5px 0px 5px;font-size:9px;text-align:center;"><span id="' + respointer + '">' + fmtNumber(citytrans['resources'][resourcenm]) + '</span>'+ getperc(citytrans['maxCapacity'][resourcenm], citytrans['resources'][resourcenm]) + '</td><td style="border:dotted 1px yellow;color:#542C0F;padding:0px 5px 0px 5px;font-size:9px;text-align:center;">'+ productionstr +'</td>';
				}
				else {
					htmls += '<td style="border:dotted 1px yellow;color:#542C0F;padding:0px 5px 0px 5px;">?</td><td>?</td>';
				}
				
			}
			if (!citySelect[i].selected) {
				htmls += '<td style="width:50px;"><a href="index.php?view=transport&amp;destinationCityId=' + citySelect[i].value + '" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=fleet&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=army&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
			else {
				htmls += '<td style="opacity:0.4"><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
		}
		htmls += '<tr style="background:#e0bf7b;font-size:9px;"><td style="border:dotted 1px yellow;color:#542C0F;font-size:11px;"><i>Totals</i></td style="border:dotted 1px yellow;color:#542C0F;"><td style="border:dotted 1px yellow;color:#542C0F;"></td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(parseInt(woodtot)) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(woodprodtot) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(parseInt(winetot)) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(wineprodtot) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(parseInt(marbletot)) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(marbleprodtot) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(parseInt(crystaltot)) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(crystalprodtot) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(parseInt(sulfurtot)) + '</td><td style="border:dotted 1px yellow;color:#542C0F;">' + fmtNumber(sulfurprodtot) + '</td><td style="border:dotted 1px yellow;color:#542C0F;"></td></tr></table>';
	} else {
		/*    Simple view here */
		htmls += '<div style="background:#ECCF8E url(' + gradient + ') repeat-x scroll 0 0;width:100%;height:15px;text-align:center;line-heigth:15px;font-size:11px;font-weight:bold;">Transporter</div>';
		htmls += '<table class="lal" style="display:block;width:320px;clear:left;margin:2px 2px 2px 2px;padding:0px 0px 0px 0px;text-align:center;">';
		htmls += '<thead><tr style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0"><th style="width:245px;border:dotted 1px yellow;text-align:center;">City</th>';
		htmls += '<th style="width:90px;border:dotted 1px yellow;text-align:center;">Action</th></tr></thead>';
		var citylength = citySelect.length;
		for (var i = 0; i < citylength; i++) {
			var bimg = TranslateResource(trim(citySelect[i].title.split(':')[1]));
			htmls += '<tr style="border:dotted 1px yellow;' + (citySelect[i].selected ? 'background:#f9e5c4;' : '') + '"><td style="color:#542C0F;padding:5px 5px 5px 5px;text-align:left;"><a class="linki" href="/index.php?view=city&id=' + citySelect[i].value + '" style="color:#523524"><img src="' + bimg + '" width=14 height=10/>' + citySelect[i].text + '</a></td>';
			if (!citySelect[i].selected) {
				htmls += '<td style="width:50px;"><a href="index.php?view=transport&amp;destinationCityId=' + citySelect[i].value + '" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=fleet&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a>\
						<a href="index.php?view=deployment&deploymentType=army&destinationCityId=' +
				citySelect[i].value +
				'" style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
			else {
				htmls += '<td style="opacity:0.4"><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a><a style="margin:0px 1px 0px 1px"><img height="15" width="20" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a></td></tr>';
			}
		}
	}
	DestinationCitiesTransporter.innerHTML = htmls;
}
function findXY(obj){
	var curleft = curtop = 0;
	
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
		while (obj = obj.offsetParent);
		return [curleft, curtop];
	}
}
function parsemodifiers(modi){
	var fc = 1.00;
	var nd=XX('//ul[@id="locations"]/li[contains(@class,"'+modi+'")]/a',XPFirst);
	if (nd){
		var lvl = nd.title.replace(/[^\d-]+/g, "");
		fc=1.00-lvl*0.01;
	} 
	return fc;
}

function showcitytroops(){	
	var Store=new function(){
		this.name='TroopsStoreCache';
		this.cityexpire=7200*1000;
		this.curtime=new Date().getTime();
		this.data=[];
		this.cleanstore=function(){
			try {			
				GM_setValue(location.host + this.name, '');
			} catch(e){
				//alert('error cleaning store data');
			}
		}
		this.writestore=function(){
			try {
				GM_setValue(location.host + this.name, serialize(this.data));
				this.curcitydata=this.data[this.curcity];
			} catch(e){
				this.cleanstore();
				//alert('error writing store data');
			}
		}
		this.readstore=function(){
			try {
				this.data = unserialize(GM_getValue(location.host + this.name, '!'));
				if (this.data=='!') this.data=[];
				this.curcitydata=this.data[this.curcity];
			} catch(e){
				this.cleanstore();
				//alert('error reading store data');
			}
		}
		this.hasdata = function(){
			var a=serialize(this.data);
			if (a=='a:0:{}') {
				return false;
			} else {
				return true;
			}
		}
		this.curcity=Number(getcurcityid());
		this.curcityhasdata=function(){
			var a=serialize(this.data[this.curcity]);		
			if (a=='N;') {
				return false;
			} else {
				return true;
			}
		}
		this.curcitydataexpired=function(){
			var a=this.data[this.curcity+'tm'];		
			if ((this.curtime-a)>this.cityexpire) {
				return true;
			} else {
				return false;
			}
		}
		this.maptroopdata=function(bufcitystore,text,tp){
			var buf = node('div', null, null, null, text);	
			forall('//div[@class="content"]/table',buf , function(obj,i){		
				var rows = obj.rows;
				var cellshead = rows[0].cells;
				var cells = rows[1].cells;
				for (var k = 0; k < cells.length; k++) {
					bufcitystore[cellshead[k].title]=[parseInt(cells[k].textContent),cellshead[k].childNodes[0].src,tp];
				}
			});
		}
		this.storecitytroops=function(city){
			var bufcitystore=[];
			get('http://' + location.host + '/index.php?view=cityMilitary-army&id=' + city, function(text){	
				Store.maptroopdata(bufcitystore,text,'army');
				get('http://' + location.host + '/index.php?view=cityMilitary-fleet&id=' + city, function(text){
				Store.maptroopdata(bufcitystore,text,'fleet');
				Store.data[city]=bufcitystore;
				Store.data[city+'tm']=Store.curtime;			
				Store.writestore();			
				if (Store.curcity==city) Store.render();
				});
			});	
		}
		this.storecurrentcitytroops=function(){
			this.storecitytroops(this.curcity);
		}
		this.init=function(){
			//this.cleanstore();
			this.readstore();		
			this.render();
			if (!this.curcityhasdata()||this.curcitydataexpired()) {
				this.storecurrentcitytroops();
			} 
		}
		this.render=function(){
			var maindiv = $fork('mainview');		
			var CityArmy=$fork('CityArmy');
			var CityFleet=$fork('CityFleet');
			if (getbody.id == 'island') {
				if (!CityArmy) {
					CityArmy = node('div', 'CityArmy', 'CityArmy', 'position:absolute;z-index:2000;left:52px;top:388px;;opacity:0.8;', null, 'Troops in City');
					maindiv.appendChild(CityArmy);
				}
			} else {
				if (!CityArmy) {
					CityArmy = node('div', 'CityArmy', 'CityArmy', 'position:absolute;z-index:2000;left:9px;top:388px;opacity:0.8;', null, 'Troops in City');
					maindiv.appendChild(CityArmy);
				}
			}
			if (!CityFleet) {
				CityFleet = node('div', 'CityFleet', 'CityFleet', 'position:absolute;z-index:2000;right:9px;top:388px;opacity:0.8;', null, 'Ships in City');
				maindiv.appendChild(CityFleet);	
			}
			var htmls= '<table class="ArmyTable" cellspacing="0" cellpadding="0" style="border:0px;"><tr>';
			var htmls2='<tr>';
			var htmlsfl= '<table class="FleetTable" cellspacing="0" cellpadding="0" style="border:0px;"><tr>';
			var htmlsfl2='<tr>';
			for(var j in this.curcitydata){
				var item=this.curcitydata[j];
				if (item[0]>0){
					if (item[2]=='army'){
						htmls+='<th title="'+j+'" style="padding:2px;border-bottom:1px solid black;border-right:1px dotted black;font-size:9px;color:#542C0F;background:#aAaA96"><img title="'+j+'" src="'+item[1]+'" style="width:24px;height:24px;"></th>';
						htmls2+='<td title="'+j+'" style="padding:2px;border-right:1px dotted black;font-size:9px;color:#542C0F;text-align:center;">'+item[0]+'</td>';							
					} else {
						htmlsfl+='<th title="'+j+'" style="padding:2px;border-bottom:1px solid black;border-right:1px dotted black;font-size:9px;color:#542C0F;background:#aAaA96"><img title="'+j+'" src="'+item[1]+'" style="width:24px;height:24px;"></th>';
						htmlsfl2+='<td title="'+j+'" style="padding:2px;border-right:1px dotted black;font-size:9px;color:#542C0F;text-align:center;">'+item[0]+'</td>';												
					}
				}
			}		
			htmls+='</tr>';htmls2+='</tr>';htmlsfl+='</tr>';htmlsfl2+='</tr>';
			CityArmy.innerHTML =htmls+htmls2+'</table>';
			CityFleet.innerHTML =htmlsfl+htmlsfl2+'</table>';
		}
	}
	Store.init();
}


function mainfork(){
	try{lang();} catch(e){}
	try{version_update();} catch(e){}
	try{loadstyles();} catch(e){}
	var bodyid=getbody.id;
	switch (bodyid){
		case "island":
			try{
				islandview();
				var playerlookup=cityinfoPanelIsland();
				if (playerlookup) clickTo(playerlookup,showplayernfo,1);
				forall('//ul[@class="cityinfo"]/li[@class="owner"]', null, function(obj,i){ btn(obj,'questowner'+i,'questowner','?',trim(obj.textContent.split(':')[1]),null,10);});
				forall('//ul[@class="cityinfo"]/li[@class="ally"]', null, function(obj,i){ btn(obj,'questally'+i,'questally','?',trim(obj.textContent.split(':')[1]),null,30);});
			} catch(e){}
			try {
				if (GM_getValue('ShowCityTroops', '1') == '1') showcitytroops();
			} catch(e){}
		break;
		case "city":
			try{
				btn(getItem('owner'),'questowner','questowner','?',trim(getItem('owner').textContent.split(':')[1]),showplayernfo);
				btn(getItem('ally'),'questally','questally','?',trim(getItem('ally').textContent.split(':')[1]),showplayernfo);
				if (GM_getValue('CityToggleButtons','1')=='1'){
					var paNode=$fork('breadcrumbs').parentNode;
					if (paNode) btn(paNode,'ShowLevelsCityToggle','gameplay','L','Hides or shows the Buildings Levels.',function(){ togglevar("CityBuildingLevels");location.href=location.href;},5,'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
					if (paNode) btn(paNode,'ShowNamesCityToggle','gameplay','N','Hides or shows the Buildings Names.',function(){ togglevar("CityBuildingNames");location.href=location.href;},5,'position:absolute;top:155px;left:675px;width:5px;z-index:54;');
				}
			} catch(e){}
			
			try{			
				if(GM_getValue(location.host+'.CityBuildingUpGoods','1')=='1'){
				var fac = 1.00;
				if (GM_getValue(location.host+'.pulley','1')=='1') fac -= 0.02; 
				if (GM_getValue(location.host+'.geometry','1')=='1') fac -= 0.04; 
				if (GM_getValue(location.host+'.spiritlevel','1')=='1') fac -= 0.08;
				
				var modi= {
					w: Number(parsemodifiers('carpentering')),
					M: Number(parsemodifiers('architect')),
					C: Number(parsemodifiers('optician')),
					W: Number(parsemodifiers('vineyard')),
					S: Number(parsemodifiers('fireworker'))
				}
				var currentstock=IKARIAM['currentCity']['resources'];
				var posupd=[];
				var mainview=$fork('mainview');
				forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
							var lvl = obj.title.replace(/[^\d-]+/g, "");
							var b = building[obj.parentNode.className];
							var htmls='';
							var nupgradeable=0;
							if (lvl.length>0&&b!='undefined'){								
								if(upgrade[b]){
								var nextupgrade = upgrade[b][lvl];
								if (nextupgrade){
									for (var x in nextupgrade) {
										if (x != 't') {
											var k = parseInt((nextupgrade[x]*fac)*modi[x]);
											switch (x){
												case 'w':
													if(k>currentstock['wood']) nupgradeable++;
													break;
												case 'W':
													if(k>currentstock['wine']) nupgradeable++;
													break;
												case 'M':
													if(k>currentstock['marble']) nupgradeable++;
													break;
												case 'S':
													if(k>currentstock['sulfur']) nupgradeable++;
													break;
												case 'C':
													if(k>currentstock['crystal']) nupgradeable++;
													break;
											}
										}
										else {
											var k = nextupgrade[x];
										}								
										var thing=resmap[x];
										htmls+='<img src="'+thing+'" style="width:12px;height:9px">'+k+'&nbsp;&nbsp;&nbsp;';
									}							
								} else {
									htmls+='Building Level not in List;';nupgradeable=1;
								}
								var as=node('a','upgradehover'+i,'upgradehover',"width:auto;height:12px;top:"+(findXY(obj)[1]+70)+"px;left:"+(findXY(obj)[0]-30)+"px;visibility:hidden;"+(nupgradeable==0?'background:blue':''),htmls+(nupgradeable==0?'upgrade':''));							
								getbody.appendChild(as);
							obj.parentNode.addEventListener('mouseover', function(){
								$fork('upgradehover'+i).style.visibility = "visible";
							}, false);
							obj.parentNode.addEventListener('mouseout', function(){
								$fork('upgradehover'+i).style.visibility = "hidden";
							}, false);
							posupd[i]=nupgradeable;
							}
							}
						});
			}
			} catch(e){}
			try{
				if(GM_getValue('CityBuildingLevels','1')=='1'){
						forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
							var lvl = obj.title.replace(/[^\d-]+/g, "");
							if (lvl.length>0) {
								var updstr='';
								if (posupd) if (posupd[i]==0) updstr='background:blue';
								var as=node('a','blevels','blevels',"width:12px;height:12px;top:10px;left:25px;"+updstr,lvl);
								obj.parentNode.appendChild(as);}
						});		
				};
				if(GM_getValue('CityBuildingNames','0')=='1'){
						forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
							var lvl = obj.title;
							if (lvl.length>0) {
								if (obj.parentNode.id=='position3'){
									var as=node('a','bnames','bnames',"width:auto;height:12px;top:40px;left:-50px;",lvl);							
								} else {
									var as=node('a','bnames','bnames',"width:auto;height:12px;top:25px;left:-20px;",lvl);
								}
								obj.parentNode.appendChild(as);}
						});		
				};
			} catch(e){}
			try {
				if (GM_getValue('ShowCityTroops', '1') == '1') showcitytroops();
			} catch(e){}			
		break;
		case "museum":
			try{
				var mplayers="";
				forall('//td[@class="player"]', null, function(obj,i){mplayers+=","+obj.innerHTML+",";});
				GM_setValue("CultTtreaties"+location.host,mplayers);
			} catch(e){}				
		break;
		case "branchOffice":
			try{
				var table=XX('//table[@class="tablekontor"]', XPList).snapshotItem(1);
				if (table) {
					forallrows(table, 1, function(tbl,i){
						var nm=tbl.rows[i].cells[0].textContent.split('(')[1];
						if (nm) {
							nm=nm.split(')')[0];
							btn(tbl.rows[i].cells[tbl.rows[i].cells.length-1],'questowner'+i,'questowner','?',nm,showplayernfo,5);
						}
					});
				}
			} catch(e){}
		break;
		case "sendSpy":
			try{
				 var form=XX('//form',XPFirst).parentNode;
				 btn(form,'spybash2','spybash','x2 Spies','Send 2 Spies.',actionshandler,250,';color:#542C0F;font-size:11px;');
				 btn(form,'spybash5','spybash','x5 Spies','Send 5 Spies.',actionshandler,40,';color:#542C0F;font-size:11px;');
				 btn(form,'spybash10','spybash','x10 Spies','Send 10 Spies.',actionshandler,40,';color:#542C0F;font-size:11px;');
			} catch(e){}
		 break;
		case "sendMessage":
		case "sendAllyMessage":
			try{
				var messagetext=XX('//textarea[@id="text"]',XPFirst);
				var sigbuf=GM_getValue("Signature","");
				sigbuf = sigbuf.replace( new RegExp( "(#)(B|b)(R|r)(#)", "g" ), "\n" );			
				messagetext.innerHTML="\n\n"+sigbuf+messagetext.innerHTML;
			} catch(e){}
		break;
		case "diplomacyAdvisor":		
		case "embassy":
			try{
				Embassy();
			} catch(e){}
		break;
			
	}
	setInterval ( schedulerhandler, 1000 );
	try{sidetabs();} catch(e){}	
	try{Messages();} catch(e){}
	try{Highscores();} catch(e){}
	try{Tranporter();setInterval(Tranporter,30000);} catch(e){}
	//Tranporter();setInterval(Tranporter,30000);
	//key setup
   	addEventListener('keypress', keyHandler, true);
}

function serialize( mixed_value ) {
 
    var _getType = function( inp ) {
        var type = typeof inp, match;
        var key;
        if (type == 'object' && !inp) {
            return 'null';
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            if (match = cons.match(/(\w+)\(/)) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };
    var type = _getType(mixed_value);
    var val, ktype = '';
    
    switch (type) {
        case "function": 
            val = ""; 
            break;
        case "undefined":
            val = "N";
            break;
        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");
            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
            break;
        case "string":
            val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";
            break;
        case "array":
        case "object":
            val = "a";
            /*
            if (type == "object") {
                var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {
                    return;
                }
                objname[1] = serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);
            }
            */
            var count = 0;
            var vals = "";
            var okey;
            var key;
            for (key in mixed_value) {
                ktype = _getType(mixed_value[key]);
                if (ktype == "function") { 
                    continue; 
                }
                
                okey = (key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
                vals += serialize(okey) +
                        serialize(mixed_value[key]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
    }
    if (type != "object" && type != "array") val += ";";
    return val;
}
function unserialize(data){
    var error = function (type, msg, filename, line){throw new window[type](msg, filename, line);};
    var read_until = function (data, offset, stopchr){
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        var i = 2;
		var datalength=data.length;
        while(chr != stopchr){
            if((i+offset) > datalength){
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1),offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var read_chrs = function (data, offset, length){
        buf = [];
        for(var i = 0;i < length;i++){
            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
        }
        return [buf.length, buf.join('')];
    };
    var _unserialize = function (data, offset){
        if(!offset) offset = 0;
        var buf = [];
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();
        
        var dataoffset = offset + 2;
        var typeconvert = new Function('x', 'return x');
        var chrs = 0;
        var datalength = 0;
        
        switch(dtype){
            case "i":
                typeconvert = new Function('x', 'return parseInt(x)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "b":
                typeconvert = new Function('x', 'return (parseInt(x) == 1)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "d":
                typeconvert = new Function('x', 'return parseFloat(x)');
                var readData = read_until(data, dataoffset, ';');
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case "n":
                readdata = null;
            break;
            case "s":
                var ccount = read_until(data, dataoffset, ':');
                var chrs = ccount[0];
                var stringlength = ccount[1];
                dataoffset += chrs + 2;
                
                var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
                var chrs = readData[0];
                var readdata = readData[1];
                dataoffset += chrs + 2;
                if(chrs != parseInt(stringlength) && chrs != readdata.length){
                    error('SyntaxError', 'String length mismatch');
                }
            break;
            case "a":
                var readdata = {};
                
                var keyandchrs = read_until(data, dataoffset, ':');
                var chrs = keyandchrs[0];
                var keys = keyandchrs[1];
                dataoffset += chrs + 2;
                
                for(var i = 0;i < parseInt(keys);i++){
                    var kprops = _unserialize(data, dataoffset);
                    var kchrs = kprops[1];
                    var key = kprops[2];
                    dataoffset += kchrs;
                    
                    var vprops = _unserialize(data, dataoffset);
                    var vchrs = vprops[1];
                    var value = vprops[2];
                    dataoffset += vchrs;
                    
                    readdata[key] = value;
                }
                
                dataoffset += 1;
            break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };
    return _unserialize(data, 0)[2];
}
function ToolsMenu(){}
function sortAllies(){}
function showchat(){}
function main(){}

function loadcss(src){
	var GM_JQ = document.createElement('link');
	GM_JQ.href = src;
	GM_JQ.type = 'text/css';
	GM_JQ.rel = 'Stylesheet';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

function loadscript(src){
	var GM_JQ = document.createElement('script');
	GM_JQ.src = src;
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}
function waitscripts() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitscripts,100); }
	else { $ = unsafeWindow.jQuery; JQ(); }
}

loadscript('http://www.ika-core.org/scripts/jquery-1.3.1.min.js');
loadscript('http://www.ika-core.org/scripts/jquery.tablesorter.min.js');
waitscripts();

function JQ() {
   	$.tablesorter.addParser({ 
        id: 'score', 
        is: function(s) { 
            return false; 
        }, 
        format: function(s) { 
            return parseInt(s.replace(/\D+/g, "") || "0", 10)
        }, 
        type: 'numeric' 
    });		
   var tbsres=$("#resourceUsers > div > table");
   if(tbsres.length > 0){
    tbsres.tablesorter({         
        sortList: [[4,1]] ,
		headers: { 4: {sorter:'score'}, 5: {sorter: false}}
    }); 
   }
  mainfork(); 
}

var b2=new Date();
bench.innerHTML='ika-core:'+(b2.getTime()-currenttime.getTime())+' ms'
// ==UserScript==
// @name		The Psyco Razor
// @version 	01
// @namespace 	Psyco Razor
// @author		Psyco Razor (modded by panoz)
// @description	
// @include		http://s*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @require		
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.


var version=01;
var scriptlocation="qui inserire il link di scaricamento dello script";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Yellow','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Mithril';
		alliancenm='Mithril';		
		alliance=[	['?o alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['amit'		, Alliance	],
					['a2mit'		, Alliance	],
					[' '		, Alliance	]];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='group77969@groupsim.com';
		//forumurl='.';
		forumurl='http://hwisp.forumfree.net/';
		//forumurlnew='.';
		forumurlnew='http://argonaftes.forum-motion.com/search.forum?search_id=newposts';
		break;
	case 's2.ikariam.gr': // there is no mithril alliance on beta server so i just entered my current alliance :P
		alliancefullnm='Appolloneans';
		alliancenm='ApN';
		alliance=[	['????? S?µµa??a', NoAlliance	],
					[alliancenm	, Alliance		],
					['ada '	, Enemies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='.';
		//forumurlnew='.';
		forumurlnew='.';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='Argonaytes';
		alliancenm='Mithril';
		alliance=[	['????? S?µµa??a', NoAlliance  ],
					[alliancenm	, Alliance	],
					['aMIT'	, Alliance	],
					['a2MIT'	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Alliance	],
					[' '	, Allies	],
					[' '	, Enemies	],
					[' '	, Enemies	],
					[' '	, Enemies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Enemies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Alliance	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Allies	],
					[' '	, Enemies 		]
					];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='group77969@groupsim.com';
		//forumurl='.';
		forumurl='http://hwisp.forumfree.net/';
		//forumurlnew='.';
		forumurlnew='http://argonaftes.forum-motion.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	//showgames();


 
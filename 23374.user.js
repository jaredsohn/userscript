// kanjikoohiialtersequence.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2008-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.5 2010.09.12  woelpad  Framenum <span> changed to <div>
// 1.4 2009.12.20  woelpad  Altered the story box on the review page
// 1.3 2009.12.01  woelpad  Fixed problem that prevented the review page from displaying any flash card
//                          After adding a kanji to the learned list, the next kanji gets properly selected
// 1.2 2009.11.14  woelpad  Reset previous and next buttons to point to the next frame in the sequence
//                          Fixed learned button bug where the wrong frame would end up in the restudy list
//                          Disabled failed list length feature because it's hard to determine 
//                          which kanji have been added to the review list
//                          Fixed links in keyword tables
// 1.1 2009.11.02  woelpad  Adapted to the new site look
// 1.0 2009.10.15  woelpad  Corrected 2001.Kanji.Odyssey sequence based on Katsuo's list
// 0.9 2009.08.30  woelpad  Fixed failed kanji page
//                          Redirecting straight to next failed kanji after pressing Learned button
//                          Added 2001.Kanji.Odyssey sequence
// 0.8 2009.05.17  woelpad  Adapted to cope with the fixes after the malware attack
//                          Support for other sequences: RTKOmnibus, Maniette
// 0.7 2009.02.05  woelpad  Added 616 and 693 to RevTK Lite
// 0.6 2008.08.21  woelpad  Added Script Update Checker
// 0.5 2008.05.08  woelpad  Made the length of the failed kanji list variable
//                          Adapted to Firefox 3 beta 5
//                          After pressing the Learned button, go to the next failed kanji
// 0.4 2008.04.18  woelpad  Bug fix in case there are no failed kanji
// 0.3 2008.03.28  woelpad  Added option to switch over to RevTKLite after a certain frame number
//                          Bug fix: Learned button disappeared when frameNr and sequenceNr coincide
// 0.2 2008.03.17  woelpad  Applied to the sightreading page
// 0.1 2008.02.29  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Change order", and click Uninstall.
//
// Includes strokecounts derived from JMDICT and KANJIDIC files. 
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Alter sequence
// @namespace      http://userscripts.org/scripts/show/23374
// @description    Change the order in which the kanji appear.
// @include        http://kanji.koohii.com/main*
// @include        http://kanji.koohii.com/manage/removelist*
// @include        http://kanji.koohii.com/profile*
// @include        http://kanji.koohii.com/review*
// @include        http://kanji.koohii.com/review/flashcardlist*
// @include        http://kanji.koohii.com/review/summary*
// @include        http://kanji.koohii.com/sightreading*
// @include        http://kanji.koohii.com/study*
// @include        http://kanji.koohii.com/study/failedlist*
// @include        http://kanji.koohii.com/study/kanji/*
// @include        http://kanji.koohii.com/study/mystories*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 23374; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1284299595590; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

var onTestSite = false;

var failedListLength = 10;

var revTKLite = 0;
var sequences = [
	{name: 'Remembering the Kanji (Heisig)'},
	{name: 'RevTK Lite', maxFrameNr: 2042, sequence: [
		[1,18],20,23,24,26,[28,30],[35,50],52,54,[56,60],[62,66],[68,79],[83,95],[97,99],[101,103],[105,109],[111,114],117,[119,121],[124,136],[143,150],152,155,156,[158,162],165,166,[168,174],177,179,180,183,[185,187],190,[192,197],205,206,[208,212],[214,217],219,220,[223,225],227,228,232,234,235,238,239,241,[244,257],259,262,263,[265,269],272,274,277,278,281,283,284,286,287,[289,301],303,305,307,[311,314],[316,320],[323,327],[331,337],341,343,344,[347,350],353,354,356,[360,362],366,[369,371],374,376,377,379,381,382,384,385,[387,389],391,392,396,398,399,402,404,405,407,408,412,413,415,[417,424],[427,429],[431,434],436,439,441,442,[444,450],455,456,458,[461,467],[469,471],473,479,480,482,484,485,[488,490],492,495,496,[499,504],506,508,510,512,513,[515,517],522,[524,526],[528,530],535,541,[545,549],552,554,555,559,561,562,564,[567,569],[571,577],[579,583],585,586,[588,592],[594,598],600,601,605,[607,610],612,613,615,616,618,623,626,627,635,637,638,[640,642],645,649,650,653,655,659,660,[666,668],671,672,[675,686],688,689,[691,697],[702,706],708,[711,713],717,[722,727],[729,731],[733,741],744,746,747,[749,755],757,759,764,767,768,770,771,[779,782],784,[788,792],[796,799],802,803,[806,808],812,815,818,819,821,823,824,831,832,836,838,[841,843],845,846,848,[850,852],856,[858,861],865,867,[872,876],878,879,883,884,894,895,[897,900],902,906,[911,913],919,920,922,924,928,929,931,[933,938],[942,947],950,951,[954,957],[959,961],[963,966],969,[971,975],977,978,980,983,[990,993],995,997,[1000,1013],1016,1019,1020,1022,1024,1025,1028,1029,[1034,1038],1043,[1047,1051],1054,1055,1058,1060,1061,1063,[1065,1067],1069,1070,[1075,1077],[1081,1083],1086,1087,1089,1090,1092,1098,1102,1103,1105,1107,1109,1110,1114,[1117,1123],1125,[1127,1130],1136,1137,1140,[1142,1144],1146,[1150,1154],1156,1159,1162,1163,[1168,1172],[1177,1181],1183,1184,1186,1189,1190,[1193,1195],1200,1202,[1205,1207],1209,1212,1213,[1217,1220],1222,1223,[1225,1227],[1230,1232],[1235,1240],1242,[1245,1248],[1251,1254],1256,[1258,1261],[1266,1269],1271,[1273,1279],1282,1288,1293,1296,1300,1302,1304,1308,1309,1316,1317,1319,1320,[1327,1329],1331,1333,1339,[1343,1346],[1349,1353],1355,1359,1360,1362,1363,1366,1367,1371,1378,1379,[1381,1384],[1391,1393],[1397,1405],[1407,1410],[1414,1418],[1422,1425],1427,1428,1436,[1439,1443],1445,1447,1448,1451,1452,1458,1459,1461,1462,[1464,1466],1468,[1471,1474],1478,1484,1485,1487,[1489,1491],[1493,1497],1500,1502,1504,1505,1507,1508,1510,1513,1515,1516,1519,1521,[1524,1526],1531,[1533,1535],[1537,1543],1546,[1549,1551],1553,[1555,1558],1560,1564,1568,1572,1573,1575,1577,1578,1580,1582,1585,1587,1588,1590,1593,1595,1596,[1602,1606],1608,1612,1613,1616,1617,[1620,1623],1626,1632,1635,1636,[1640,1644],1648,[1650,1653],[1656,1658],1661,[1663,1665],1669,1670,1672,1673,1675,1676,1678,1679,1682,1688,1690,[1694,1696],1699,1702,1703,1705,1709,1711,1716,1717,1720,1722,1723,1725,1726,1729,1731,[1735,1737],[1740,1743],1745,[1748,1751],1753,1754,1757,1765,1767,[1774,1776],1779,1781,1782,[1784,1786],1788,1792,[1795,1797],[1799,1802],[1804,1816],1818,1820,1822,1825,1826,[1828,1831],[1833,1836],1840,[1844,1847],1859,[1863,1865],1868,1870,1871,1874,1884,1885,[1887,1889],[1892,1894],1896,1897,[1899,1901],1903,1909,1913,1916,1920,1921,1924,1925,1928,1929,1934,1935,1941,1942,1948,1949,1955,1958,1959,1972,[1974,1978],1980,1982,1984,1992,1997,2004,2007,2010,[2014,2018]
	]},
	{name: 'RTK Omnibus', sequence: [
		[1,147],2470,[148,355],2091,[356,409],2446,[410,562],2043,[563,671],2622,[672,732],2090,[733,748],1316,[749,765],2059,[766,816],2915,[817,922],2238,[923,949],2637,[950,996],2181,[997,1010],2791,[1011,1055],2223,[1056,1133],2092,[1134,1310],2051,[1311,1323],2614,[1324,1420],2041,[1421,1455],2872,[1456,1491],2048,[1492,1562],2417,[1563,1785],2436,[1786,1803],2861,[1804,1829],2451,[1830,1899],2919,[1900,1959],2846,[1960,1968],2087,[1969,2002],2004,[2003,2024],2981,[2025,2025],2908,[2026,2036],2433,[2037,2038],2063,[2039,2188],2928,[2189,2333],2680,[2334,2335],2569,[2336,2352],2584,[2353,2474],2877,[2475,2548],3001,[2549,2680],2914
	]},
	{name: 'Les Kanjis dans la t\u00eate (Maniette)', sequence: [
		[1,40],42,43,41,[44,82],2737,[83,107],109,108,[110,124],513,[125,182],1811,[183,191],511,[192,215],509,[216,243],510,[244,335],337,336,[338,387],512,[388,444],2043,2791,[445,454],2147,[455,463],2421,[464,496],2900,[497,508],[515,556],2712,[557,613],2091,[614,616],[618,721],2882,[722,748],[750,783],617,[784,865],514,[866,944],948,946,947,945,[949,1126],1129,1127,1128,[1130,1146],[1148,1286], [1287,1296],1298,1297,[1299,1313],1147,[1314,1317],749,[1318,1323],2615,[1324,1326],1328,1327,[1329,1420],1422,1421,[1423,1489],2896,[1490,1492],2075,[1493,1628],2363,[1629,1655],2415,[1656,1700],1702,1701,[1703,1780],2344,1781,1783,1782,[1784,1798],2702,[1799,1810],[1812,1861],2187,[1862,1899],2919,1901,1900,[1902,1969],1971,1970,[1972,2032],[2035,2037],2033,2034, 2038,2039,2063,[2040,2042],2129
	]},
	{name: '2001.Kanji.Odyssey', sequence: [
		[1,17],20,23,24,26,[28,30],[36,50],52,54,56,57,59,60,[62,65],[68,79],[82,86],[88,93],95,[97,99],[101,103],[105,109],[111,114],[117,121],[123,136],[142,150],152,[158,162],[167,174],177,180,183,[185,187],190,[192,197],205,208,209,211,212,[214,217],219,220,[222,225],[227,230],234,235,238,239,241,[245,253],[255,257],259,262,263,[265,269],272,277,278,[281,284],286,287,[289,299],301,303,305,307,[311,314],[316,320],[323,327],[330,333],[335,337],[339,341],344,[347,350],353,354,356,[359,361],[364,366],[369,372],[374,377],[379,382],384,385,[387,389],[391,393],[396,400],402,404,405,407,[412,424],[427,429],[431,434],439,441,[443,450],458,[461,467],[469,471],473,474,476,479,480,[482,485],[489,491],[495,499],[501,504],506,[508,510],512,513,[515,517],522,[524,526],528,529,535,536,541,545,[547,550],552,554,555,559,561,562,[564,569],[571,574],576,[579,583],585,586,[588,590],[595,598],600,601,[603,605],[607,610],[613,616],618,623,627,630,632,634,635,637,638,[640,642],[648,650],653,655,[657,660],663,[665,673],[675,677],[679,696],699,700,[702,709],711,712,[717,719],[722,728],730,731,[733,740],742,744,746,747,[749,762],764,765,767,768,770,771,774,775,[779,782],784,788,[790,792],796,797,799,802,803,[806,808],810,812,815,[818,824],826,827,831,832,836,838,[841,843],845,846,848,850,851,[856,861],863,865,867,[871,880],883,884,886,887,889,894,895,[897,900],902,904,906,[912,916],918,919,924,925,928,929,931,[933,938],[945,948],950,951,[954,957],[959,961],963,965,966,969,[971,975],977,978,980,983,[985,987],[990,993],[995,997],[1000,1005],[1007,1013],1016,1019,1020,1022,1024,1025,[1028,1030],1034,[1036,1038],[1043,1045],[1047,1051],1058,1060,1066,1067,1069,1070,[1073,1076],1078,[1081,1083],1086,1087,[1089,1093],1098,1102,1103,[1105,1107],1109,1110,1113,1114,[1117,1121],1123,[1125,1127],1129,1130,[1136,1140],[1142,1144],1146,1148,1150,1151,1153,1154,[1156,1160],1165,[1167,1172],[1177,1181],[1183,1186],1189,1190,[1193,1195],1200,1202,1205,1206,1209,[1212,1215],[1217,1220],1222,1223,[1225,1227],[1230,1232],[1234,1236],[1238,1240],1242,[1245,1250],[1252,1254],1256,1258,1260,1261,1266,[1268,1271],[1273,1282],1285,1288,1289,1293,1296,1297,1300,1302,1304,[1306,1309],1311,1312,1316,1317,1319,1320,[1327,1329],1331,1333,1334,1336,[1338,1340],[1343,1347],[1349,1354],1356,[1358,1360],1362,1363,1365,1366,[1369,1371],1374,1379,1381,1382,1391,1392,[1397,1401],[1403,1405],1408,1410,[1413,1417],[1422,1428],[1435,1437],[1440,1443],1445,1447,1448,[1450,1453],1458,1459,1461,1462,[1464,1466],1468,[1471,1474],1478,1479,1481,1482,1484,1485,1487,[1489,1494],1496,1497,[1500,1502],1504,1505,1507,1510,1513,1515,1516,[1519,1521],[1524,1526],1531,1532,[1534,1544],1546,1548,1549,1551,1553,1555,1556,1558,1560,1567,1568,1572,1577,1578,1580,1582,[1585,1588],1590,[1593,1598],[1602,1606],1608,1612,1613,1616,1617,[1620,1623],1626,1632,[1634,1636],[1640,1642],1644,1646,1648,1650,1653,1654,[1656,1659],[1661,1665],1669,1670,1672,1673,1675,1676,[1678,1680],1682,1685,1688,1690,[1694,1696],1699,1703,1705,1706,1709,1711,1712,1716,1717,[1719,1726],1729,1731,[1735,1738],[1740,1743],1745,1746,1748,1750,1751,1753,1754,1757,1765,1767,[1771,1773],1775,1776,1781,1782,1785,1786,1788,1792,[1795,1797],[1799,1802],1804,1806,1807,[1809,1818],1820,1822,[1825,1834],1836,1840,[1845,1847],1850,1855,1859,1863,1865,1866,1868,1870,1871,1874,1881,1882,1884,1885,[1887,1889],1892,1893,1896,1897,1899,1901,1903,1909,1911,[1916,1921],1925,1928,1929,1931,1932,[1934,1936],1938,1941,1942,1948,1949,[1951,1953],1959,1967,1969,1972,[1974,1978],1980,1982,1984,1985,1987,1990,1997,[2004,2008],2010,2011,[2014,2018],2025,2709,2712,2736,2981
	]}
];

var revTKLastFrameNr = 0;
var revTKMaxFrameNr = 3007;

var alterFreely = false;
var freeSequence;

// Stroke counts derived from JMDict and KanjiDic apparently.
var strokeCounts = [
	1,2,3,5,4,4,2,2,2,2,3,4,4,5,5,5,7,9,8,8,11,12,9,7,8,6,6,5,9,5,9,6,5,5,5,6,5,6,4,3,6,4,8,3,3,9,12,5,3,3,8,12,5,7,9,10,7,7,4,9,13,3,9,3,5,6,6,3,8,9,1,7,8,8,10,3,5,5,6,13,10,12,2,3,4,5,9,9,11,7,2,7,5,11,3,4,2,3,6,6,5,11,5,7,3,4,3,6,3,6,5,6,5,7,12,9,9,9,6,4,15,9,7,9,9,8,3,6,12,4,5,5,9,10,19,8,8,7,6,5,15,13,9,10,8,8,8,12,12,3,6,5,11,9,6,9,11,6,10,7,4,8,13,11,6,9,7,6,9,13,11,14,7,11,14,18,12,9,10,6,9,10,6,8,6,6,7,9,10,6,10,11,12,12,4,8,12,10,9,8,11,12,7,10,12,9,6,7,9,6,5,5,14,10,17,5,5,8,8,8,6,10,8,9,8,13,16,12,14,13,13,14,14,8,6,10,11,4,7,15,12,10,9,11,4,10,7,6,9,4,9,9,6,12,4,5,8,10,11,7,9,7,6,10,11,5,8,9,8,14,13,14,11,10,14,18,12,15,5,6,10,8,9,5,6,7,10,9,16,9,6,10,11,9,18,10,5,7,12,4,9,15,12,9,13,7,10,8,14,15,9,8,11,12,19,8,8,11,3,6,6,9,7,8,12,9,10,9,8,7,11,8,9,12,7,19,9,14,9,10,10,12,13,13,12,13,14,14,15,15,15,16,6,13,6,11,13,10,13,8,6,9,13,9,13,12,10,14,9,4,8,11,17,8,6,14,8,15,5,12,9,8,16,7,12,9,12,9,18,12,9,8,15,18,12,6,12,12,13,16,9,13,13,7,5,6,12,12,13,13,16,5,8,9,10,13,8,8,14,11,7,8,12,16,13,17,5,4,16,15,5,8,11,20,9,12,17,20,11,14,14,14,15,2,5,9,4,8,9,11,11,15,13,11,6,10,7,6,10,10,9,3,11,13,14,4,7,8,14,11,6,9,13,9,16,15,11,10,9,13,19,19,19,14,3,8,6,9,11,4,7,7,7,8,11,8,16,11,14,15,11,14,18,8,12,10,7,7,9,16,15,13,9,9,6,6,6,11,11,9,15,9,10,9,3,10,6,7,10,5,9,10,8,11,13,10,13,11,10,12,10,13,14,13,12,12,6,9,9,13,17,12,13,10,12,11,12,17,12,10,11,14,14,13,16,14,15,4,11,15,15,18,6,11,11,18,17,4,7,8,8,6,6,9,13,6,16,8,10,10,5,7,11,16,4,7,7,14,7,7,14,8,7,11,9,10,7,13,13,10,16,10,10,12,13,15,14,6,10,9,11,10,8,12,9,14,14,12,12,13,16,16,14,11,5,8,4,9,15,7,13,20,17,8,8,12,7,7,7,8,8,8,5,8,11,8,14,9,9,9,9,12,11,12,12,13,9,8,8,11,16,11,11,11,9,7,11,14,6,9,3,10,7,6,6,2,13,3,6,6,3,5,6,7,12,2,4,10,10,20,16,5,9,4,7,7,7,11,15,11,4,7,8,8,8,8,12,8,13,11,11,4,7,8,7,11,4,7,8,10,10,13,11,11,8,11,13,5,5,8,13,5,12,5,9,8,8,9,11,5,8,6,6,9,8,10,4,13,8,15,6,14,12,10,4,10,5,3,8,8,9,7,9,11,11,14,12,11,2,5,4,11,13,4,8,10,11,7,10,10,13,11,12,13,8,15,10,11,11,14,12,5,8,11,8,10,10,10,10,10,12,6,12,10,6,12,18,6,8,15,12,15,10,18,13,12,17,16,14,14,12,13,14,14,16,17,16,4,7,11,11,12,15,15,5,13,8,7,10,15,19,16,12,18,17,5,8,2,7,7,12,6,5,13,7,7,5,12,9,10,10,8,6,9,12,11,10,10,9,8,8,8,8,7,14,15,14,18,13,12,16,15,15,12,12,13,8,11,9,9,13,7,10,10,10,7,11,18,15,14,9,8,8,7,10,14,14,11,6,10,11,11,12,9,10,18,11,12,13,13,18,14,14,7,11,11,6,10,11,11,12,15,12,12,12,14,12,12,19,16,2,7,7,7,7,6,7,11,6,5,5,6,6,4,6,6,7,9,9,8,8,8,10,11,11,8,11,10,10,10,11,13,15,15,17,5,13,4,8,8,9,10,17,6,11,13,9,15,13,5,11,8,6,13,5,11,12,4,7,11,13,7,10,9,12,3,10,5,4,5,9,6,14,10,8,12,4,5,7,8,5,11,10,12,12,6,8,11,12,15,15,12,12,16,9,11,12,10,4,8,8,15,7,5,8,12,15,9,12,8,11,11,8,11,14,7,12,14,8,4,6,7,11,7,9,4,8,8,10,8,7,10,12,21,11,5,5,10,9,13,8,7,11,8,11,15,12,13,18,8,11,11,14,17,5,8,8,10,8,8,11,12,5,8,8,10,5,7,9,10,8,11,15,13,4,8,8,8,7,7,10,10,14,15,14,11,15,5,12,9,12,7,11,16,12,9,16,9,10,13,11,11,6,6,9,8,10,16,11,11,6,7,13,9,14,16,14,6,12,8,12,6,11,14,14,15,4,10,9,7,5,11,12,8,16,10,11,11,12,4,11,14,10,9,12,8,15,15,15,12,12,5,7,10,7,8,9,12,12,18,17,4,8,3,4,6,4,7,8,5,17,11,8,12,5,9,11,19,10,10,3,4,4,5,11,10,8,12,11,7,5,5,6,13,6,3,5,7,10,17,6,6,7,11,9,8,12,11,13,12,15,11,11,15,9,9,9,9,10,9,8,12,14,4,6,8,13,10,7,9,12,13,21,13,21,13,15,10,13,19,13,12,12,7,8,14,14,12,11,12,11,7,8,10,10,12,15,10,12,10,16,13,14,12,10,5,8,11,8,7,11,9,14,13,15,15,11,11,5,8,7,10,6,18,18,17,16,16,15,15,14,19,14,14,13,12,12,12,12,12,12,11,9,9,9,10,10,10,11,11,11,9,11,11,10,14,14,13,19,13,14,15,14,15,12,16,15,5,9,9,12,16,5,10,13,8,16,12,13,14,7,9,10,20,7,11,9,12,8,8,5,13,17,7,14,13,9,10,14,14,17,16,15,5,4,6,8,12,8,9,9,7,10,12,6,16,7,10,10,14,14,13,13,12,11,10,14,12,12,7,16,12,13,13,12,16,5,6,9,13,11,12,15,18,23,11,11,13,14,9,10,7,17,13,9,9,11,7,10,10,10,9,12,12,10,15,13,16,15,13,10,14,13,5,8,8,12,4,7,4,10,18,10,10,12,7,13,11,10,16,16,13,16,16,8,11,12,6,9,4,9,14,11,13,13,15,11,11,6,10,8,13,8,8,11,12,20,20,16,16,8,10,7,8,14,15,11,12,11,14,11,17,16,13,14,8,10,15,9,12,10,17,12,16,5,9,8,8,9,11,11,10,16,8,7,15,20,9,13,10,9,8,8,10,12,17,12,13,13,18,10,8,13,16,9,11,4,7,7,8,12,11,4,7,13,11,10,13,18,17,13,6,8,9,13,11,14,15,10,15,18,13,9,13,13,8,11,15,14,12,18,12,11,14,12,14,15,20,18,10,12,8,10,11,12,13,15,12,9,10,7,7,12,13,16,16,18,3,7,5,6,10,8,13,6,6,7,10,10,9,10,11,13,7,16,19,9,12,10,16,10,11,12,10,9,11,15,13,14,15,16,10,13,12,10,10,12,10,9,12,18,10,6,7,4,4,8,8,8,7,6,7,12,15,9,12,14,15,17,11,7,15,7,11,14,9,18,12,16,8,11,10,9,12,4,7,10,10,8,10,11,11,11,12,13,16,11,11,13,5,8,9,7,11,9,13,12,10,12,11,15,7,6,12,19,8,5,11,9,16,12,12,12,14,12,13,11,9,11,12,12,15,13,15,12,11,11,10,9,8,9,7,8,12,8,12,19,12,18,17,15,13,15,14,6,8,11,17,9,12,15,19,10,15,13,4,7,10,7,11,4,7,13,13,6,17,17,14,13,15,10,15,11,12,15,5,8,4,10,11,7,8,8,5,10,10,10,13,15,12,8,11,10,9,11,11,11,7,11,20,9,12,9,12,9,10,12,10,9,17,6,4,5,7,12,13,13,6,11,10,10,15,13,11,21,13,6,9,9,18,10,13,15,7,6,7,9,7,8,10,9,9,9,13,19,7,7,10,14,13,8,8,12,5,8,8,13,11,12,15,18,18,4,10,7,6,10,9,11,8,11,11,12,14,10,12,11,9,13,13,12,10,16,11,10,17,18,10,13,11,11,14,21,10,14,13,19,10,13,12,12,15,12,15,11,12,13,12,9,13,8,16,14,10,6,11,12,16,12,17,16,8,11,12,10,12,14,10,15,18,18,15,14,14,18,14,22,16,20,8,13,15,11,15,13,15,15,9,11,16,15,19,14,10,14,11,14,7,10,15,10,10,10,13,16,9,14,9,10,17,14,21,15,13,22,17,10,12,14,16,15,15,4,5,19,16,18,4,15,4,5,3,6,10,11,8,17,14,13,17,15,16,23,23,8,11,11,10,10,17,10,12,6,13,13,28,13,16,11,11,10,13,14,14,19,18,12,7,7,7,12,23,20,10,18,17,4,16,9,8,8,11,7,3,8,4,7,5,12,11,3,4,2,12,10,10,8,11,8,9,7,7,5,4,7,12,15,17,10,14,9,6,8,10,8,7,9,13,11,11,10,11,10,7,10,10,7,15,5,6,6,14,15,8,10,9,4,4,14,12,19,12,4,10,15,8,21,12,9,13,15,9,12,12,11,5,14,10,8,7,6,15,5,7,6,16,14,10,5,6,7,12,11,8,11,17,9,8,11,13,12,11,17,9,8,11,11,11,7,9,9,13,17,9,8,8,15,5,7,9,12,7,7,13,7,7,11,7,10,5,12,9,9,13,11,10,11,17,12,13,8,15,15,8,14,7,24,6,15,16,8,6,12,10,15,7,11,10,11,11,11,11,15,9,12,10,15,14,9,10,9,15,12,6,11,15,10,18,10,15,15,17,11,7,8,11,11,8,11,15,9,9,10,12,16,9,13,14,9,9,14,9,7,8,12,7,10,11,11,16,5,9,6,14,20,17,12,13,12,11,10,5,17,14,13,7,12,11,15,12,21,7,17,13,11,7,6,18,17,11,10,10,8,13,13,12,9,10,10,10,8,9,8,8,13,8,11,8,10,9,12,19,16,13,11,8,15,16,14,12,7,13,19,7,17,11,15,8,15,16,18,8,8,13,14,7,11,12,11,19,16,8,12,14,8,7,7,14,12,13,12,12,15,9,13,7,8,12,14,17,15,18,16,13,15,14,9,10,14,11,13,7,5,9,5,11,9,11,14,11,5,12,9,8,14,13,12,16,13,11,8,12,13,10,9,10,17,11,13,13,7,10,11,10,9,10,19,17,8,8,8,10,13,8,17,12,10,9,7,17,15,10,6,9,12,13,13,16,8,9,13,8,13,12,14,17,13,16,11,12,9,9,10,8,9,9,12,9,9,13,16,14,13,16,10,12,10,11,10,7,8,11,8,7,12,16,9,19,17,7,7,12,13,14,14,14,9,11,8,14,16,14,10,13,17,15,15,12,11,11,13,15,11,18,16,9,12,7,17,14,13,12,17,7,10,12,14,13,10,11,6,7,13,12,14,12,11,7,14,11,8,13,13,10,7,12,8,9,9,10,11,11,13,10,11,17,15,11,13,11,10,17,9,13,10,15,13,14,12,10,13,13,14,17,10,13,17,19,9,8,9,12,13,10,12,7,13,13,18,13,12,16,16,10,13,9,17,14,14,10,13,8,9,14,11,11,18,11,12,19,15,9,14,14,11,15,12,16,17,15,20,8,14,9,15,12,19,11,17,15,9,17,17,12,19,14,12,11,14,14,10,10,21,12,17,11,14,14,11,14,16,14,10,11,11,17,14,13,10,9,10,19,11,17,15,19,13,14,15,13,17,10,12,13,12,12,11,13,16,11,13,18,14,9,13,15,23,15,16,15,22,15,10,11,13,16,13,12,15,18,13,15,16,15,16,16,12,20,21,14,16,16,14,10,13,12,12,13,14,22,16,19,18,13,13,17,16,10,16,16,15,16,15,11,14,14,17,19,16,16,17,17,15,16,16,10,21,15,17,13,16,17,15,10,12,14,17,11,17,16,14,15,18,16,14,12,17,13,19,16,11,15,14,13,18,14,14,16,22,14,13,14,15,19,13,19,13,14,15,26,22,19,21,23,17,17,16,19,22,19,17,22,20,20,16,17,21,14,19,28,19,18,24,23,16,14,11,14,19,19,10,15,14,7,11,10,14,7,9,11,15,14,6,11,11,25,7,9,14,17,12,9,14,16,13,11,19,10,16,14,9,8,12,16,12,11,10,11,10,20,6,11,22,5,14,9,15,8,15,12,11,6,14,18,18,8,12,12,15,8,10,9,6,11,16,9,16,14,9,13,17,12,12,3,13,10,10,10,6,9,9,12,14,14,20,13,17,8,14,7,12,9,12,12,15,10,3,12,14,12,11,16,14,17,10,9,15,10,16,10,10,6,7,11,8,16,11,10,7,6,6,9,12,17,22,12,6,4,12,15,9,16,12,16,15,14,10,20,11,16,16,19,22,15,6,11,17,11,11,9,14,8,10,19,14,21,13,20,14,25,7,8,11,12,13,6,11
]

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

// Taken from http://kanji.koohii.com/js/toolbox.js
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}
function xpatho(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function extractText(el) {
	var text = '';
	for (var node = el.firstChild; node; node = node.nextSibling) {
		switch (node.nodeType) {
		case 3:
			text += node.data;
			break;
		case 1:
			text += extractText(node);
			break;
		}
	}
	return text;
}

function tailRecurse(tail, re, act) {
	var ar;
	while (ar = re.exec(tail)) {
		tail = tail.substr(ar.index + ar[0].length);
		if (act(ar)) return tail;
	}
	return '';
}

function elRecurse(tail, startRe, endRe, act) {
	var startAr, endAr, body;
	while (1) {
		body = null;
		startAr = null;
		endAr = null;
		if (startRe) {
			startAr = startRe.exec(tail);
			if (!startAr) break;
			tail = tail.substr(startAr.index + startAr[0].length);
		}
		if (endRe) {
			endAr = endRe.exec(tail);
			if (!endAr) break;
			body = tail.substr(0, endAr.index);
			tail = tail.substr(endAr.index + endAr[0].length);
		}
		if (act(body, startAr, endAr)) return tail;
	}
	return '';
}

function matchUrlHead(url, urlHead) {
	if (url.substr(0, urlHead.length).toLowerCase() != urlHead.toLowerCase()) return null;
	url = url.substr(urlHead.length);
	if (url.length == 0) return '';
	if (!/^[?/#]/.test(url)) return null;
	return url;
}

function matchSitePage(urlBody, siteType) {
	var body;
	switch (siteType) {
	case 'f':
		body = matchUrlHead(window.location.href, 'http://forum.koohii.com');
		if (body == null) return null;
		break;
	default:
		if (onTestSite) {
			var front = matchUrlHead(window.location.href, 'http://test.koohii.com');
			if (front == null) return null;
			body = matchUrlHead(front, '/index_staging_nodebug.php');
			if (body == null) {
				body = matchUrlHead(front, '/index_staging.php');
				if (body == null) return null;
			}
		} else {
			body = matchUrlHead(window.location.href, 'http://kanji.koohii.com');
			if (body == null) body = front;
		}
		break;
	}
	return matchUrlHead(body, urlBody);
}

function linkSitePage(urlBody, siteType) {
	switch (siteType) {
	case 'f':
		return 'http://forum.koohii.com' + urlBody;
	default:
		if (onTestSite) return 'http://test.koohii.com' + urlBody;
		return 'http://kanji.koohii.com' + urlBody;
	}
}

function getUserName() {
	// In kanji.koohii.com
	var userNameEl = xpathi('//div[@class="signin"]/div[@class="m"]/strong');
	if (userNameEl) return userNameEl.textContent;

	// In forum.koohii.com
	var quickpostUser = xpathi('//input[@name="form_user"]');
	if (quickpostUser) return quickpostUser.value;
	var topNavLogin = xpathi('//div[@class="profile_info_left"]/strong');
	if (topNavLogin) return topNavLogin.textContent;

	return '';
}

function getTableParameterValue(table, key) {
	key += ' :';
	var rows = table.getElementsByTagName('tr');	
	for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
		var row = rows[rowIdx];
		var columns = row.getElementsByTagName('td');
		if (!columns || (columns.length < 2)) continue;
		if (columns[0].textContent == key) {
			return columns[1].textContent;
		} 
	}
	return '';
}

function matchProfileName() {
	var userName = getUserName();
	if (!userName) return false;
	var profileDiv = xpathi('//div[@class="col-box col-box-top block"]/table');
	if (!profileDiv) return false;
	return (getTableParameterValue(profileDiv, 'Username') == userName);
}

function storeValue(key, value) {
	var userName = getUserName();
	if (!userName) return;
	switch (typeof value) {
	case 'boolean':
		value = value ? 1 : 0;
		break;
	case 'number':
		break;
	default:
		value = escape(value);
		break;
	}
	GM_setValue(userName + '|' + key, value);
}

function retrieveValue(key, def) {
	var userName = getUserName();
	if (!userName) return def;
	var value = GM_getValue(userName + '|' + key);
	if (typeof value == 'undefined') return def;
	value = unescape(value);
	switch (typeof def) {
	case 'boolean':
		value = parseInt(value) ? true : false;
		break;
	case 'number':
		value = parseInt(value);
		if (isNaN(value)) value = def;
		break;
	}
	return value;
}

function addChild(parent, type, settings, style, sibling) {
	var child = document.createElement(type);
	for (var key in settings) {
		child[key] = settings[key];
	}
	if (sibling) parent.insertBefore(child, sibling);
	else parent.appendChild(child);
	if (style) {
		child.setAttribute('style', style);
	}
	return child;
}

function addText(parent, text) {
	return parent.appendChild(document.createTextNode(text));
}

function getGreaseMonkeySection() {
	var section = document.getElementById('GreaseMonkey');
	if (section) return section;

	var topSection = xpathi('//div[@class="col-box col-box-top block"]');
	if (!topSection) return null;

	section = addChild(topSection.parentNode, 'div', {
		id: 'GreaseMonkey',
		className: 'col-box block'
	}, null, topSection.nextSibling);
	addText(addChild(section, 'h2'), 'GreaseMonkey settings');
	
	return section;
}

function createGreaseMonkeyDivision(divName) {
	var div = document.createElement('p');
	div.name = divName;
	var section = getGreaseMonkeySection();
	var divs = section.getElementsByTagName('p');
	for (var idx = 0; idx < divs.length; idx++) {
		if (divName < divs[idx].name) {
			section.insertBefore(div, divs[idx]);
			return div;
		}
	}
	section.insertBefore(div, null);
	return div;
}

function makeEditable(label, getValue, setValue, styling, boxStyling, maxLen, maxSize, leftMark, rightMark) {
	var editBox = document.createElement('div');
	label.parentNode.insertBefore(editBox, label.nextSibling);
	editBox.setAttribute('style', 'display:none;');
	var edit = document.createElement('input');
	var currentValue = getValue(label);
	if (leftMark) addText(editBox, leftMark);
	editBox.appendChild(edit);
	if (rightMark) addText(editBox, rightMark);

	with (edit) {
		value = currentValue;
		class = 'textfield';
		type = 'text';
		if (maxLen) maxLength = maxLen;
		if (maxSize) size = maxSize;
		setAttribute('style', styling);
		style.background = 'none';
		style.border = 0;
		addEventListener('keydown', function(e) {
			switch (e.which) {
			case 27: // Esc
				e.target.value = currentValue;
				break;
			case 13: // Enter
				currentValue = setValue(label, e.target.value);
				e.target.value = currentValue;
				break;
			default:
				return;
			}

			e.stopPropagation();
			e.preventDefault();

			label.style.display = 'block';
			editBox.style.display = 'none';
		}, true);
		addEventListener('blur', function(e) {
			currentValue = setValue(label, e.target.value);
			label.style.display = 'block';
			editBox.style.display = 'none';
		}, true);
	}
	label.addEventListener('click', function(e) {
		currentValue = getValue(label);
		edit.value = currentValue;
		editBox.setAttribute('style', 'display:block; ' + boxStyling);
		edit.focus();
		edit.select();
		label.style.display = 'none';
	}, true);
}

function request(url, analyze, asXML, postProcess) {
	var asynch = (typeof postProcess != 'undefined');
	var req = new XMLHttpRequest();
	function stateChange() {
		if ((req.readyState == 4) && (req.status == 200)) {
			if (asXML) {
				analyze(req.responseXML);
			} else {
				analyze(req.responseText);
			}
			postProcess();
		}
	}
	if (asynch) req.onreadystatechange = stateChange;
	req.open('GET', url, asynch);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(null);
	if (!asynch) {
		if (asXML) {
			analyze(req.responseXML);
		} else {
			analyze(req.responseText);
		}
	}
}

function includeKeywords() {
	addChild(xpathi('//head'), 'script', {
		type: 'text/javascript', 
		src: '/study/keywords.js'
	});
}

function initKeywords(callback) {
	if (unsafeWindow.kwlist && unsafeWindow.kklist) {
		if (callback) callback();
		return;
	}
	request(linkSitePage('/js/2.0/study/keywords.js'), function (res) {
		eval(res);
		unsafeWindow.kwlist = kwlist;
		unsafeWindow.kklist = kklist;
	}, false, callback);
}

function getCurrentFrameNr() {
	var curFrameNr;
	request(linkSitePage('/main'), function (res) {
		var ar = /<b>(\d+)<\/b>\s+kanji\s+flashcards\s+/i.exec(res);
		if (ar) curFrameNr = ar[1];
	});
	return curFrameNr;
}

function replaceKeyword(frameNr) {
	if (!unsafeWindow.kwlist) return '';
	var newKeyword = unsafeWindow.kwlist[frameNr - 1];
	if (!newKeyword) return '';
	return newKeyword;
}

function replaceKanji(frameNr) {
	if (!unsafeWindow.kklist) return '';
	var newKanji = unsafeWindow.kklist[frameNr - 1];
	if (!newKanji) return '';
	return newKanji;
}

function replaceStrokeCount(frameNr) {
	return strokeCounts[frameNr - 1];
}

function replaceOnYomi(frameNr) {
	return '';
}

var sequenceNrs = [ 0 ];
var frameNrs = [ 0 ];

function addFrameNr(frameNr, maxFrameNr) {
	if ((frameNr > 0) && (frameNr <= maxFrameNr) && !frameNrs[frameNr]) {
		frameNrs[frameNr] = sequenceNrs.length;
		sequenceNrs[sequenceNrs.length] = frameNr;
	}
}

function decomposeSequence(sequence, maxFrameNr) {
	for (var idx in sequence) {
		var range = sequence[idx];
		if (typeof range == 'number') {
			addFrameNr(range, maxFrameNr);
		} else {
			if (range[0] <= range[1]) {
				for (var frameNr = range[0]; frameNr <= range[1]; frameNr++) {
					addFrameNr(frameNr, maxFrameNr);
				}
			} else {
				for (var frameNr = range[0]; frameNr >= range[1]; frameNr--) {
					addFrameNr(frameNr, maxFrameNr);
				}
			}
		}
	}
	for (var frameNr = 1; frameNr <= maxFrameNr; frameNr++) {
		if (!frameNrs[frameNr]) {
			frameNrs[frameNr] = sequenceNrs.length;
			sequenceNrs[sequenceNrs.length] = frameNr;
		}
	} 
}

function makeIncrementalChange(sequenceNr, toSequenceNr) {
	var toFrameNr = sequenceNrs[sequenceNr];
	var offset = toSequenceNr - sequenceNr;
	if (offset > 0) {
		for (; offset > 0; offset--, sequenceNr++) {
			var frameNr = sequenceNrs[sequenceNr + 1];
			sequenceNrs[sequenceNr] = frameNr;
			frameNrs[frameNr] = sequenceNr;
		}
	} else if (offset < 0) {
		for (; offset < 0; offset++, sequenceNr--) {
			var frameNr = sequenceNrs[sequenceNr - 1];
			sequenceNrs[sequenceNr] = frameNr;
			frameNrs[frameNr] = sequenceNr;
		}
	}
	sequenceNrs[sequenceNr] = toFrameNr;
	frameNrs[toFrameNr] = sequenceNr;
}

function alterTable(table, frameNumTitle, keywordTitle, kanjiTitle, strokeCountTitle, onYomiTitle) {
	if (!frameNumTitle) frameNumTitle = 'Framenum';
	if (!keywordTitle) keywordTitle = 'Keyword';
	if (!kanjiTitle) kanjiTitle = 'Kanji';
	if (!strokeCountTitle) strokeCountTitle = 'Strokecount';
	if (!onYomiTitle) onYomiTitle = 'OnYomi';
	sequenceNumTitle = 'Sequence#';

	if (!table) return;
	var rows = table.getElementsByTagName('tr');
	var headers = rows[0].getElementsByTagName('th');
	var titles = new Object();
	for (var idx = 0; idx < headers.length; idx++) {
		var links = headers[idx].getElementsByTagName('a');
		if (links.length) {
			titles[links[0].firstChild.data.trim()] = idx;
		}
	}
	if ((typeof titles[frameNumTitle] == 'undefined') || (typeof titles[sequenceNumTitle] != 'undefined')) return;
	
	// Add sequence# header
	var frameNumHeader = headers[titles[frameNumTitle]];
	var sequenceNumHeader = addChild(frameNumHeader.parentNode, 'th');
	var frameNumAnchor = frameNumHeader.getElementsByTagName('a')[0];
	if (frameNumAnchor) {
		sequenceNumHeader = addChild(sequenceNumHeader, 'a', {
			href: frameNumAnchor.href,
			className: frameNumAnchor.className
		});
		window.addEventListener('load', function (e) {
			setTimeout(function () {
				sequenceNumHeader.className = frameNumAnchor.className;
			}, 0);
		}, true);
	}
	addText(sequenceNumHeader, 'Sequence#');
	
	for (var idx = 1; idx < rows.length; idx++) {
		var contents = rows[idx].getElementsByTagName('td');
		var frameNum = contents[titles[frameNumTitle]];
		var sequenceNr = frameNum.firstChild.data;
		var frameNr = sequenceNrs[sequenceNr];
		if (!frameNr) continue;
		frameNum.firstChild.data = frameNr;
		if (typeof titles[keywordTitle] != 'undefined') {
			var keyword = contents[titles[keywordTitle]].getElementsByTagName('a')[0];
			keyword.href = keyword.href.replace(/\/kanji\/\d+/, '/kanji/' + frameNr); 
			keyword.innerHTML = replaceKeyword(frameNr);
		}
		if (typeof titles[kanjiTitle] != 'undefined') {
			var kanji = contents[titles[kanjiTitle]].getElementsByTagName('span')[0];
			kanji.firstChild.data = replaceKanji(frameNr);
		}
		if (typeof titles[strokeCountTitle] != 'undefined') {
			var strokeCount = contents[titles[strokeCountTitle]];
			strokeCount.innerHTML = replaceStrokeCount(frameNr);
		}
		if (typeof titles[onYomiTitle] != 'undefined') {
			var onYomi = contents[titles[onYomiTitle]];
			onYomi.innerHTML = replaceOnYomi(frameNr);
		}
		// Add sequence# value
		var sequenceNum = addChild(frameNum.parentNode, 'td');
		addText(sequenceNum, sequenceNr);
	}
}

revTKLite = retrieveValue('RevTKLite', revTKLite);

var revTKLiteSequence = sequences[revTKLite].sequence;
var revTKLiteMaxFrameNr = sequences[revTKLite].maxFrameNr;
if (typeof revTKLiteMaxFrameNr == 'undefined') revTKLiteMaxFrameNr = 3007;

revTKLastFrameNr = retrieveValue('RevTKLastFrameNr', 0);
if (isNaN(revTKLastFrameNr)) revTKLastFrameNr = 0;
failedListLength = retrieveValue('FailedListLength', failedListLength);
if (isNaN(failedListLength)) failedListLength = '*';
if (alterFreely) {
	freeSequence = retrieveValue('FreeSequence');
	if (freeSequence) freeSequence = unescape(freeSequence);
}

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;

	if (!revTKLite) {
		var profileDiv = xpathi('//div[@class="col-box col-box-top block"]');
		var kanjiCount = getTableParameterValue(profileDiv, 'Kanji Count')
		if (kanjiCount) {
			revTKLastFrameNr = parseInt(kanjiCount);
			if (isNaN(revTKLastFrameNr) || (revTKLastFrameNr > revTKLiteMaxFrameNr)) revTKLastFrameNr = 0;
		}
	}
	
	var div = createGreaseMonkeyDivision('Option|RevTK Lite');

	addText(addChild(div, 'label', {
		'for': 'sequenceSelector'
	}), 'Sequence : ');
	var sequenceSelector = addChild(div, 'select', {
		id: 'sequenceSelector',
	});
	for (var seq in sequences) {
		addText(addChild(sequenceSelector, 'option'), sequences[seq].name);
	}
	if (typeof revTKLite != 'undefined') sequenceSelector.selectedIndex = revTKLite;
	sequenceSelector.addEventListener('change', function (e) {
		storeValue('RevTKLite', e.target.selectedIndex);
		if (e.target.selectedIndex > 0) storeValue('RevTKLastFrameNr', revTKLastFrameNrTextBox.value);
	}, true);
	addText(addChild(div, 'label', {
		'for': 'revtklastframenr'
	}), ' starting after frame# : ');
	var revTKLastFrameNrTextBox = addChild(div, 'input', {
		type: 'text',
		className: 'textfield', 
		id: 'revtklastframenr',
		value: revTKLastFrameNr
	}, 'width:28px; text-align: right');
	revTKLastFrameNrTextBox.addEventListener('change', function (e) {
		var frameNr = e.target.value.trim();
		if ((frameNr == '') || isNaN(frameNr)) {
			frameNr = revTKLastFrameNr;
		} else {
			frameNr = parseInt(frameNr);
			if (frameNr < 0) frameNr = 0;
			else if (frameNr > revTKMaxFrameNr) frameNr = revTKMaxFrameNr;
		}
		storeValue('RevTKLastFrameNr', frameNr);
		e.target.value = frameNr;
	}, true);

	var failedListLengthDiv = createGreaseMonkeyDivision('Option|Failed List Length');
	
	addText(addChild(failedListLengthDiv, 'label', {
		'for': 'failedlistlength'
	}), 'Failed Kanji List Length (* to view all) : ');
	var failedListLengthTextBox = addChild(failedListLengthDiv, 'input', {
		type: 'text', 
		className: 'textfield', 
		id: 'failedlistlength',
		value: failedListLength,
	});
	failedListLengthTextBox.setAttribute('style', 'width:28px; text-align: right');
	failedListLengthTextBox.addEventListener('change', function (e) {
		var length = e.target.value.trim();
		if (length == '*') {
		} else if ((length == '') || isNaN(length)) {
			length = failedListLength;
		} else {
			length = parseInt(length);
			if (length < 0) length = 0;
			else if (frameNr > revTKMaxFrameNr) frameNr = '*';
		}
		storeValue('FailedListLength', length)
		e.target.value = length;
	}, true);
	
	// Disable failed list length feature
	failedListLengthDiv.setAttribute('style', 'display:none');

	return;
}

if (revTKLite) {
	if (revTKLastFrameNr) decomposeSequence([[1, revTKLastFrameNr]], revTKLastFrameNr);
	decomposeSequence(revTKLiteSequence, revTKLiteMaxFrameNr);
}
if (alterFreely) {
	decomposeSequence([[1, revTKMaxFrameNr]], revTKMaxFrameNr);
	if (freeSequence) {
		for (var idx = 0; idx < freeSequence.length; idx += 2) {
			makeIncrementalChange(freeSequence[idx], freeSequence[idx+1]);
		}
	}
}

// Study page: sidebar section
if (matchSitePage('/study') != null) {
	var whichFailedKanji = -1;
	var whichFailedFrameNr = 0;
	var whichNextFailedKanji = 0;
	var gotoFailedFrame = 0;
	var learnKanji = false;
	var gotoFailedFrameNr = 0;

	var frameNr = 0;
	var frameNum = xpathi('//div[@class="framenum"]');
	var learnedButton;
	var nextFrameNrInput;
	if (frameNum) {
		learnedButton = document.getElementById('doLearned');
		nextFrameNrInput = xpathi('//input[@name="nextframenr"]');
		 
		frameNr = parseInt(frameNum.innerHTML);
		var sequenceNr = frameNrs[frameNr];
		
		if (sequenceNr) {
			addChild(frameNum.parentNode, 'br');
			addChild(frameNum.parentNode, 'br');
			var sequenceEl = addChild(frameNum.parentNode, 'span', null, 'font:14px Georgia, Times New Roman; color: blue;');
			addText(sequenceEl, '#' + sequenceNr);
			if (alterFreely) makeEditable(sequenceEl);
			if ((sequenceNr == frameNr) && !learnedButton) whichFailedKanji = 0;
		} else {
			if (!learnedButton) whichFailedKanji = 0;
			sequenceNr = frameNr;
		}
	} else {
		whichFailedKanji = 0;
	}

	gotoFailedFrame = retrieveValue('GoToFailedFrame', 0);
	if (gotoFailedFrame) {
		storeValue('GoToFailedFrame', '');
		if (gotoFailedFrame < 0) {
			learnKanji = true;
			gotoFailedFrame = -gotoFailedFrame;
		}
		if ((gotoFailedFrame == 1) && frameNr) {
			if (sequenceNrs[frameNr]) gotoFailedFrameNr = sequenceNrs[frameNr];
			else gotoFailedFrameNr = frameNr;
		}
	}

	var failedKanjis = xpatho('//div[@class="failed-kanji"]//li');
	// Since it's too hard to tell which kanji on the detailed list page are learned, we restrict gotoFailedFrameNr to the ones in the side bar.
	if (gotoFailedFrame > failedKanjis.snapshotLength) {
		gotoFailedFrame = failedKanjis.snapshotLength;
	} else if (learnKanji && (gotoFailedFrame == failedKanjis.snapshotLength)) {
		gotoFailedFrame = failedKanjis.snapshotLength - 1;
	}
	var actualSequenceNr = sequenceNr;
	if (learnKanji) actualSequenceNr = frameNr;
	for (var idx = 0; idx < failedKanjis.snapshotLength; idx++) {
		var failedKanji = failedKanjis.snapshotItem(idx);
		var failedFrameNum = failedKanji.getElementsByTagName('span')[0];
		var failedSequenceNr = failedFrameNum.innerHTML;
		if (whichFailedKanji == -1) {
			if (actualSequenceNr == failedSequenceNr) {
				whichFailedKanji = idx + 1;
				whichNextFailedKanji = -1;
			} else if (actualSequenceNr < failedSequenceNr) {
				whichFailedKanji = 0;
			} else {
				if (sequenceNrs[failedSequenceNr]) whichFailedFrameNr = sequenceNrs[failedSequenceNr];
				else whichFailedFrameNr = failedSequenceNr;
			}
		} else if (whichNextFailedKanji == -1) {
			whichNextFailedKanji = idx + 1;
			if (sequenceNrs[failedSequenceNr]) whichFailedFrameNr = sequenceNrs[failedSequenceNr];
			else whichFailedFrameNr = failedSequenceNr;
		}
		var failedFrameNr = sequenceNrs[failedSequenceNr];
		if (!failedFrameNr || (failedFrameNr == failedSequenceNr)) {
			if (gotoFailedFrame >= idx + 1) gotoFailedFrameNr = failedSequenceNr;
			continue;
		}
		if (gotoFailedFrame >= idx + 1) gotoFailedFrameNr = failedFrameNr;
		if (failedKanji.className == 'selected') {
			failedKanji.className = '';
		} else if (frameNr == failedFrameNr) {
			failedKanji.className = 'selected';
		}
		failedFrameNum.innerHTML = failedFrameNr;
		var failedKeyword = failedKanji.getElementsByTagName('a')[0];
		failedKeyword.href = failedKeyword.href.replace(/\/\d+/, '/' + failedFrameNr);
		failedKeyword.innerHTML = replaceKeyword(failedFrameNr).replace(/\//g, '<br>');
	}
	if ((whichFailedKanji == -1) || (whichNextFailedKanji == -1) || (gotoFailedFrame > failedKanjis.snapshotLength) || isNaN(failedListLength)) {
		var allFailedField = xpathi('//div[@class="section failed-kanji"]//span[@class="count"]');
		if (allFailedField) {
			var allFailed = /\d+/.exec(allFailedField.firstChild.data);
			if (isNaN(failedListLength)) failedListLength = allFailed;
			if (allFailed == failedKanjis.snapshotLength) {
				if (whichFailedKanji == -1) whichFailedKanji = 0;
				if (whichNextFailedKanji == -1) whichNextFailedKanji = 0;
				if (gotoFailedFrame > failedKanjis.snapshotLength) gotoFailedFrame = failedKanjis.snapshotLength;
			}
		} else if (isNaN(failedListLength)) failedListLength = revTKMaxFrameNr;
	}

	// Disable failed list length feature
	failedListLength = failedKanjis.snapshotLength;


	var failedKanjiList = xpathi('//div[@class="failed-kanji"]//ul');
	if (failedListLength == 0) {
		if (failedKanjiList) {
			failedKanjiList.parentNode.setAttribute('style', 'display:none');
		}
	} else if (!isNaN(failedListLength)) {
		for (var idx = failedListLength; idx < failedKanjis.snapshotLength; idx++) {
			failedKanjis.snapshotItem(idx).setAttribute('style', 'display:none');
		}
	}

	function alterLearnedButton() {
		if (learnKanji && learnedButton) {
			learnedButton.click();
		}
		if (whichFailedKanji > 0) {
			if (!learnedButton || !nextFrameNrInput) {
				var controlsDiv = xpathi('//div[@id="storyview"]/div[@class="controls"]');
				if (!controlsDiv) {
					var storyView = document.getElementById('storyview');
					if (!storyView) return;
					controlsDiv = addChild(storyView, 'div', {
						className: 'controls'
					});
				}
				if (!nextFrameNrInput) {
					nextFrameNrInput = addChild(controlsDiv, 'input', {
						type: 'hidden',
						name: 'nextframenr',
						value: 0
					});
				}
				// We replace the 'doLearned' id with 'willLearn' in order to prevent the default behavior of putting
				// the frame with this frameNr into the learned list, while we want to put the frame with this sequenceNr in it.
				if (!learnedButton) {
					learnedButton = addChild(controlsDiv, 'input', {
						type: 'image',
						id: 'willLearn',
						value: '',
						name: 'willLearn',
						title: 'Add kanji that you have relearned to a list for review later',
						alt: 'Add to restudied list',
						src: '/images/2.0/study/restudy-button.gif'
					});
				} else if (sequenceNr != frameNr) {
					learnedButton.id = 'willLearn';
					learnedButton.name = 'willLearn';
				}
			}
			nextFrameNrInput.value = whichFailedFrameNr;
			//var frmFrameNumHidden = xpathi('//input[@name="framenum"]');
			//frmFrameNumHidden.value = sequenceNr;
			learnedButton.addEventListener('click', function (e) {
				//if (nextFailedFrameNr) {
				if (sequenceNr != frameNr) {
					setTimeout(function () {
						window.location = '/study/kanji/' + sequenceNr;
					}, 0);
					storeValue('GoToFailedFrame', -whichFailedKanji);
				} else {
					storeValue('GoToFailedFrame', whichFailedKanji);
				}
				//}
			}, true);
		} else {
			if (learnedButton) {
				learnedButton.style.display = 'none';
			}
		}
	}

	// Disable completely.
	if (false && ((whichFailedKanji == -1) || (whichNextFailedKanji == -1) || (gotoFailedFrame > failedKanjis.snapshotLength) || (failedListLength > failedKanjis.snapshotLength))) {
		request(linkSitePage('/study/failedlist'), function (res) {
			var idx = 0;
			tailRecurse(res, /<td class="center">(\d+)<\/td>/i, function (ar) {
				var failedSequenceNr = ar[1];
				idx++;
				if (gotoFailedFrame >= idx) {
					if (sequenceNrs[failedSequenceNr]) gotoFailedFrameNr = sequenceNrs[failedSequenceNr];
					else gotoFailedFrameNr = failedSequenceNr;
				}
				if (whichFailedKanji == -1) {
					if (sequenceNr == failedSequenceNr) {
						whichFailedKanji = idx;
						whichNextFailedKanji = -1;
					} else if (sequenceNr < failedSequenceNr) {
						whichFailedKanji = 0;
					} else {
						if (sequenceNrs[failedSequenceNr]) whichFailedFrameNr = sequenceNrs[failedSequenceNr];
						else whichFailedFrameNr = failedSequenceNr;
					}
				} else if (whichNextFailedKanji == -1) {
					whichNextFailedKanji = idx;
					if (sequenceNrs[failedSequenceNr]) whichFailedFrameNr = sequenceNrs[failedSequenceNr];
					else whichFailedFrameNr = failedSequenceNr;
				}
				if ((idx > failedKanjis.snapshotLength) && (idx <= failedListLength)) {
					var failedKanjiEl = addChild(failedKanjiList, 'li');
					if (whichFailedKanji == idx) failedKanjiEl.className = 'selected';
					var failedFrameNr = sequenceNrs[failedSequenceNr];
					if (!failedFrameNr) failedFrameNr = failedSequenceNr;
					addText(addChild(failedKanjiEl, 'span'), failedFrameNr);
					addChild(failedKanjiEl, 'a', {
						href: linkSitePage('/study/kanji/' + failedFrameNr)
					}).innerHTML = replaceKeyword(failedFrameNr).replace(/\//g, '<br>');
				}
				return (failedListLength <= idx) && (gotoFailedFrame <= idx) && (whichFailedKanji != -1) && (whichNextFailedKanji != -1);
			});
		}, false, function () {
			alterLearnedButton();
			if (gotoFailedFrame && frameNr && (gotoFailedFrameNr != frameNr)) {
				window.location = '/study/kanji/' + gotoFailedFrameNr;
			}
		});
	} else {
		alterLearnedButton();
		if (gotoFailedFrame && frameNr && (gotoFailedFrameNr != frameNr)) {
			setTimeout(function () {
				window.location = '/study/kanji/' + whichFailedFrameNr;
			}, 0);
			//return;
		}
	}
}

if (!revTKLite) return;

// Review summary page
if (matchSitePage('/review/summary') != null) {
	initKeywords();
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'));
	}, 500);

	return;
}

// Full kanji list page
if (matchSitePage('/review/flashcardlist') != null) {
	initKeywords();
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'));
	}, 500);

	return;
} 

// Failed kanji list page
if (matchSitePage('/study/failedlist') != null) {
	initKeywords();
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'));
	}, 500);

	return;
} 

// Manage kanji list page
if (matchSitePage('/manage/removelist') != null) {
	initKeywords();
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'), 'Index');
	}, 500);

	return;
} 

// Sight reading page
if (matchSitePage('/sightreading') != null) {
	var result = xpathi('//div[@id="results"]/p[@class="j"]');
	if (!result) return;
	var curSequenceNr = getCurrentFrameNr();
	if (!curSequenceNr) return;
	initKeywords();
	// In case the "Substitute keywords" script has a few alternative kanji, it will call this function.
	unsafeWindow.alterResult = function() {
		var text = extractText(result);
		result.innerHTML = '';
		var normalText = '';
		for (var idx = 0; idx < text.length; idx++) {
			var char = text[idx];
			var frameNr = unsafeWindow.kklist.indexOf(char) + 1;
			if (frameNr == 0) {
				normalText += char;
				continue;
			}
			var sequenceNr = frameNrs[frameNr];
			if (!sequenceNr) sequenceNr = frameNr;
			if (sequenceNr > curSequenceNr) {
				normalText += char;
				continue;
			}
			if (normalText) {
				addText(result, normalText);
				normalText = '';
			}
			addText(addChild(result, 'a', {
				href: linkSitePage('/study/kanji/' + frameNr),
				className: 'j',
				title: unsafeWindow.kwlist[frameNr - 1]
			}), char);
		}
		if (normalText) {
			addText(result, normalText);
		}
	}
	unsafeWindow.alterResult();
	return;
}

// Main page
if (matchSitePage('/main') != null) {
	var failedBar = xpathi('//a[@href="/study/index.php?mode=failed"]');
	if (failedBar) {
		var failedFrameNr = 0;
		request(linkSitePage('/study/failedlist'), function (res) {
			var ar = /<tr>\s*<td>(\d+)<\/td>/i.exec(res);
			if (ar) {
				failedFrameNr = sequenceNrs[ar[1]];
				if (failedFrameNr == ar[1]) failedFrameNr = 0;
			}
		}, false, function () {
			if (failedFrameNr) {
				failedBar.addEventListener('click', function (e) {
					if (e.ctrlKey || e.shiftKey) {
						storeValue('GoToFailedFrame', 1);
					} else {
						// Prevent further action
						e.stopPropagation();
						e.preventDefault();
						
						// Redirect
						window.location = linkSitePage('/study/kanji/' + failedFrameNr);
					}
				}, true);
			}
		});
	}
	
	return;
}

// Review page
if (matchSitePage('/review') != null) {
	var that = unsafeWindow.rkKanjiReview;
	var frameNumLabel = document.getElementById('framenum');
	if (!that || !frameNumLabel) return;
	var keywordDiv = document.getElementById('keyword');
	var kanjiLabel = xpathi('//span[@class="fcData fcData-kanji"]');
	var strokeCountLabel = xpathi('//span[@class="fcData fcData-strokecount"]');

	var sequenceNr = 0;
	var frameNr = 0;
	var newCard = true;
	if (that.onFlashcardState) {
		initKeywords(function () {
			var originalOnFlashcardState = that.onFlashcardState;
			that.onFlashcardState = function (faceup) {
				if (faceup) return originalOnFlashcardState.call(that, faceup);
				newCard = true;
				sequenceNr = parseInt(frameNumLabel.textContent);
				if (isNaN(sequenceNr)) {
					sequenceNr = 0;
					frameNr = 0;
					return originalOnFlashcardState.call(that, faceup);
				}

				frameNr = sequenceNrs[sequenceNr];
				if (frameNr) {
					var keywordLabel = keywordDiv.getElementsByTagName('a')[0];
					keywordLabel.href = keywordLabel.href.replace(/\/kanji\/\d+/, '/kanji/' + frameNr); 
					keywordLabel.innerHTML = replaceKeyword(frameNr);
					kanjiLabel.innerHTML = replaceKanji(frameNr);
					strokeCountLabel.innerHTML = replaceStrokeCount(frameNr);
					frameNumLabel.innerHTML = frameNr; // '(' + frameNr + ')';
				}
				
				return originalOnFlashcardState.call(that, faceup);
			}
		});
	}
	
	if (that.onAction) {
		function interceptStoryBox () {
			var intervalId = setInterval(function () {
				var storyFrameNumLabel = xpathi('//div[@class="framenum"]');
				if (storyFrameNumLabel && frameNr && (storyFrameNumLabel.textContent == sequenceNr)) {
					clearInterval(intervalId);
					var storyKeywordLabel = xpathi('//div[@id="my-story"]//div[@class="keyword"]');
					if (storyKeywordLabel) storyKeywordLabel.innerHTML = replaceKeyword(frameNr);
					var storyKanjiLabel = xpathi('//div[@id="my-story"]//div[@class="kanji"]/span');
					if (storyKanjiLabel) storyKanjiLabel.innerHTML = replaceKanji(frameNr);
					var storyStrokeCountLabel = xpathi('//div[@id="my-story"]//div[@class="strokecount"]');
					if (storyStrokeCountLabel) storyStrokeCountLabel.innerHTML = replaceStrokeCount(frameNr);
					storyFrameNumLabel.innerHTML = frameNr; // '(' + frameNr + ')';
					var storyEdit = document.getElementById('storyedit');
					if (storyEdit) storyEdit.parentNode.removeChild(storyEdit);
					var storyTextArea = document.getElementById('sv-textarea');
					if (storyTextArea) {
						storyTextArea.title = '';
						request(linkSitePage('/study/kanji/' + frameNr), function (res) {
							elRecurse(res, /<div\s+id="sv-textarea"[^>]*>/, /<\/div>/, function (body) {
								storyTextArea.innerHTML = body;
							});
						}, false, function () {
						});
					}
					// Intercept updates to the story box.
					var frmFrame = xpathi('//form[@name="EditStory"]');
					if (frmFrame) {
						var txtStory = frmFrame.elements.namedItem('txtStory');
						var updateButton = frmFrame.elements.namedItem('doUpdate');
						if (txtStory && updateButton) {
							updateButton.addEventListener('click', function(e) {
								if (interceptStoryBox) interceptStoryBox();
							}, true);
						}
					}
				}
			}, 200);
		}
		var originalOnAction = that.onAction;
		that.onAction = function (sActionId) {
			originalOnAction.call(that, sActionId);
			if (sActionId != 'story') return;
			if (newCard) {
				interceptStoryBox();
				newCard = false;
			}
		}
	}

	return;
}

// Study page: main section
if (matchSitePage('/study') != null) {
	var that = unsafeWindow.StudyPage;
	if (that && that.quicksearchOnChangeCallback) {
		var originalQuicksearchOnChangeCallback = that.quicksearchOnChangeCallback;
		that.quicksearchOnChangeCallback = function (val) {
			var ar;
			if (val && (ar = /^#(\d+)$/.exec(val))) {
				var sequenceNr = ar[1];
				val = sequenceNrs[sequenceNr];
				if (!val) val = sequenceNr;
				val = val.toString();
			}
			return originalQuicksearchOnChangeCallback.call(this, val);
		}
	}
	
	var prevButton = xpathi('//a[@class="btn_prev"]');
	if (prevButton) {
		var prevFrameNr;
		if (frameNr) {
			if (frameNr == frameNrs.length) {
				prevFrameNr = sequenceNrs[sequenceNrs.length - 1];
			} else if (frameNr > frameNrs.length) {
				prevFrameNr = frameNr - 1;
			} else {
				if (sequenceNr) {
					prevFrameNr = sequenceNrs[sequenceNr - 1];
				}
			}
		}
		if (!prevFrameNr) {
			prevFrameNr = sequenceNrs[sequenceNrs.length - 1];
		}
		prevButton.href = prevButton.href.replace(/kanji\/(\d+)/i, 'kanji/' + prevFrameNr);
	}
	var nextButton = xpathi('//a[@class="btn_next"]');
	if (nextButton) {
		var nextFrameNr;
		if (frameNr) {
			if (frameNr >= frameNrs.length) {
				nextFrameNr = frameNr + 1;
			} else {
				if (sequenceNr) {
					if (sequenceNr + 1 == sequenceNrs.length) {
						nextFrameNr = sequenceNr + 1;
					} else {
						nextFrameNr = sequenceNrs[sequenceNr + 1];
					}
				}
			}
		}
		if (!nextFrameNr || (nextFrameNr > 3007)) {
			nextFrameNr = sequenceNrs[1];
		}
		nextButton.href = nextButton.href.replace(/kanji\/(\d+)/i, 'kanji/' + nextFrameNr);
	}
	
	return;
}

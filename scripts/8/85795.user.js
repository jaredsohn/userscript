// ==UserScript==
// @name           Deep Island Userlist Formatter
// @include        http://www.the-deep-island.de/shard/online.html
// ==/UserScript==


// [T]o and [F]rom
var f = new Array ();
var t = new Array ();

f[0]  = /border="1"/;
t[0]  = '';

f[1]  = /<tr><th>Avatar<\/th><th>KI<\/th><th>Age Name<\/th><\/tr>/g;
t[1]  = '';

f[2]  = /<\/td><td>([0-9]*)<\/td><td>/g;
t[2]  = '</td><td><span style="text-align:right; position:fixed; right:0px; width:100%; border:1px solid #ddf; margin-right:4px; padding-right:6px; background-color:#fcfcff; z-index:-1;">$1<br/>&nbsp;</span><br/></td><td>';
//t[2]  = '<span style="text-align:right; position:fixed; right:0px; width:100%; border:1px solid #ddf; margin-right:4px; padding-right:6px; background-color:#fcfcff; z-index:-1;">';

f[3]  = /<h2>Current Online Players<\/h2>/;
t[3]  = '';

f[4]  = /<\/table>(<\/br>)?/;
t[4]  = '</div>';

f[5]  = /Last Update: [0-9\.]+\, [0-9\:]+/;
t[5]  = '';

f[6]  = /<\/tr>/g;
t[6]  = '</span><p>';

f[7]  = /<table[^>]*>/g;
t[7]  = '<div style="position:fixed; bottom:0px;">';

f[8]  = /<br>/g;
t[8]  = '';

f[9]  = /<\/?t[rd]>/g;
t[9]  = '';

f[10] = />Fenabarel</g;
t[10] = '>Fena Barel<';

f[11] = />AgeMapsGallery</g;
t[11] = '>Age Maps Gallery<';

f[12] = />Pahts</g;
t[12] = '>Ahra Pahts<';

f[13] = />ahreeuhtahv</g;
t[13] = '>Ahreeuhtahv<';

f[14] = />Andy_Nexus</g;
t[14] = '>Andy\'s Nexus<';

f[15] = />outpost</g;
t[15] = '>Atlantis Outpost<';

f[16] = />bowling</g;
t[16] = '>Bowling Age<';

f[17] = />BoxAge</g;
t[17] = '>Box Age<';

f[18] = />CampBravoDayTime</g;
t[18] = '>Camp Bravo Daytime<';

f[19] = />Campbravo</g;
t[19] = '>Camp Bravo Nighttime<';

f[20] = />Crater</g;
t[20] = '>Crater Concept<';

f[21] = />CretPark</g;
t[21] = '>Creature Park<';

f[22] = />DKSkyClub</g;
t[22] = '>Duck Knee Skydiving Club<';

f[23] = />Dragons_tooth</g;
t[23] = '>Dragon\'s Tooth<';

f[24] = />Dragons_tooth1</g;
t[24] = '>Dragon\'s Tooth Classic<';

f[25] = />Dustin2</g;
t[25] = '>Dustin 2<';

f[26] = />Bahvahnin</g;
t[26] = '>Eder Bahvahnin<';

f[27] = />ederriltehinaltahv</g;
t[27] = '>Eder Rilteh Inaltahv<';

f[28] = />EderLicinius</g;
t[28] = '>Eder Licinius<';

f[29] = />ERCAge</g;
t[29] = '>ERC Age<';

f[30] = />FehnirHouse</g;
t[30] = '>Fehnir House<';

f[31] = />Gairdin</g;
t[31] = '>Gairdin Grianmhar<';

f[32] = />galamay</g;
t[32] = '>Galamay<';

f[33] = />huinexus</g;
t[33] = '>Hui-Nexus<';

f[34] = />JangaLela</g;
t[34] = '>Janga Lela<';

f[35] = />Jonae</g;
t[35] = '>Jo\'nae<';

f[36] = />JonaeHood</g;
t[36] = '>Jo\'nae Hood<';

f[37] = />kaelispuboffice</g;
t[37] = '>Kaelis\' Pub Office<';

f[38] = />katoslab</g;
t[38] = '>Kato\'s Laboratory<';

f[39] = />oolbahnneea</g;
t[39] = '>Oolbahnneea<';

f[40] = />PaahkwehNew</g;
t[40] = '>Paahkweh<';

f[41] = />PaperPagodas</g;
t[41] = '>Paper Pagodas<';

f[42] = />Pre_Swaltu0</g;
t[42] = '>Pre Swaltu<';

f[43] = />relltoo</g;
t[43] = '>Rell-too<';

f[44] = />SetalGahmarin</g;
t[44] = '>Setal Gahmarin<';

f[45] = />SevBree</g;
t[45] = '>Sev Bree<';

f[46] = />SevFah</g;
t[46] = '>Sev Fah<';

f[47] = />SevSen</g;
t[47] = '>Sev Sen<';

f[48] = />SevTor</g;
t[48] = '>Sev Tor<';

f[49] = />SparklingPalace</g;
t[49] = '>Shinelight Manor<';

f[50] = />Tosholek</g;
t[50] = '>Sholek\'s Temple<';

f[51] = />Snakeriver</g;
t[51] = '>Snake River<';

f[52] = />Soundgarden</g;
t[52] = '>Sound Garden<';

f[53] = />SpriteGallery</g;
t[53] = '>Sprite Gallery<';

f[54] = />Tahmhehvo</g;
t[54] = '>Tahm Hehvo<';

f[55] = />TaklaMakan</g;
t[55] = '>Takla Ma\'kan<';

f[56] = />forest</g;
t[56] = '>Tehr\'Dovah<';

f[57] = />ter</g;
t[57] = '>Terrati Laboratory<';

f[58] = />TheMaze</g;
t[58] = '>The Maze<';

f[59] = />TINA_Testing</g;
t[59] = '>TINA Testing Area<';

f[60] = />trebivdil</g;
t[60] = '>Tre\'bivdil<';

f[61] = />TsoidahlPrad</g;
t[61] = '>Tsoidahl Prad<';

f[62] = />jamey_study</g;
t[62] = '>Tsoidahl Sheegahtee<';

f[63] = />TunnelDemo3</g;
t[63] = '>Tunnel Demo<';

f[64] = />TvelStorm</g;
t[64] = '>Tvel (stormy edition)<';

f[65] = />vas2</g;
t[65] = '>Vaiskor 2<';

f[66] = />Vogokh_Oglahn</g;
t[66] = '>Vogokh Oglahn<';

f[67] = />vothol</g;
t[67] = '>Vothol Gallery<';

f[68] = />WindRiver</g;
t[68] = '>Wind River<';

f[69] = />WNiche</g;
t[69] = '>Writers\' Niche<';

f[70] = />Zephyr_Cove</g;
t[70] = '>Zephyr Cove<';

f[71] = />TaklaMakan2</g;
t[71] = '>Takla Ma\'kan 2<';

f[72] = />SecretAge</g;
t[72] = '>TINA Space Observatory<';

f[73] = />The_Company_Nexus</g;
t[73] = '>The Company Nexus<';

f[74] = />ChloesHoodOffice</g;
t[74] = '>Dorehn<';

f[75] = />suitup</g;
t[75] = '>Suit up!<';

f[76] = />CatfishCanyon</g;
t[76] = '>Catfish Canyon<';

f[77] = />DessertDesert</g;
t[77] = '>Dessert Desert<';

f[78] = />LouderSpace</g;
t[78] = '>Louder Space<';

f[79] = />MoldyDungeon</g;
t[79] = '>Moldy Dungeon<';

f[80] = />PlasmaMiasma</g;
t[80] = '>Plasma Miasma<';

f[81] = />PumpkinJungle</g;
t[81] = '>Pumpkin Jungle<';

f[82] = />PortalWell</g;
t[82] = '>Portal Well<';

f[83] = />ForestMQ</g;
t[83] = '>Forest<';

f[84] = />Courtyard</g;
t[84] = '>Courtyard<';

f[85] = />MarshScene</g;
t[85] = '>The Great Marsh<';

f[86] = />MountainScene</g;
t[86] = '>Rowan Green<';

f[87] = />Siralehn</g;
t[87] = '>Noloben<';

f[88] = />Todelmer</g;
t[88] = '>Todelmer<';

f[89] = />Tahgira</g;
t[89] = '>Tahgira<';

f[90] = />Laki</g;
t[90] = '>Laki\'ahn<';

f[91] = />Direbo</g;
t[91] = '>Direbo<';

f[92] = />DescentMystV</g;
t[92] = '>D\'ni-Tiwah<';

f[93] = />MystMystV</g;
t[93] = '>Myst<';

f[94] = />KveerMystV</g;
t[94] = '>Releeshan<';

f[95] = />GreatTreePub</g;
t[95] = '>Great Tree Pub<';

f[96] = />GuildPub-Cartographers</g;
t[96] = '>Cartographers\' Pub<';

f[97] = />GuildPub-Greeters</g;
t[97] = '>Greeters\' Pub<';

f[98] = />GuildPub-Maintainers</g;
t[98] = '>Maintainers\' Pub<';

f[99] = />GuildPub-Messengers</g;
t[99] = '>Messengers\' Pub<';

f[100]= />GuildPub-Writers</g;
t[100]= '>Writers\' Pub<';

f[101]= />EderDelin</g;
t[101]= '>Eder Delin<';

f[102]= />EderTsogal</g;
t[102]= '>Eder Tsogal<';

f[103]= />KveerMOUL</g;
t[103]= '>D\'ni-K\'veer<';

f[104]= />Negilahn</g;
t[104]= '>Negilahn<';

f[105]= />Dereno</g;
t[105]= '>Dereno<';

f[106]= />Payiferen</g;
t[106]= '>Payiferen<';

f[107]= />Tetsonot</g;
t[107]= '>Tetsonot<';

f[108]= />Minkata</g;
t[108]= '>Minkata<';

f[109]= />Jalak</g;
t[109]= '>Jalak<';

f[110]= />KirelMOUL</g;
t[110]= '>Kirel<';

f[111]= />AhnonayMOUL</g;
t[111]= '>Ahnonay<';

f[112]= />LiveBahroCaves</g;
t[112]= '>D\'ni-Rudenna<';

f[113]= />NeighborhoodMOUL</g;
t[113]= '>Seret<';

f[114]= />Personal</g;
t[114]= '>Relto<';

f[115]= />Neighborhood</g;
t[115]= '>Neighborhood<';

f[116]= />Cleft</g;
t[116]= '>D\'ni-Riltagamin<';

f[117]= />Personal02</g;
t[117]= '>Phil\'s Relto<';

f[118]= />city</g;
t[118]= '>D\'ni-Ae\'gura<';

f[119]= />GreatZero</g;
t[119]= '>Great Zero<';

f[120]= />Nexus</g;
t[120]= '>Nexus<';

f[121]= />Garrison</g;
t[121]= '>Gahreesen<';

f[122]= />Gira</g;
t[122]= '>Eder Gira<';

f[123]= />Garden</g;
t[123]= '>Eder Kemo<';

f[124]= />BahroCave(02)?</g;
t[124]= '>D\'ni-Rudenna<';

f[125]= />Descent</g;
t[125]= '>D\'ni-Tiwah<';

f[126]= />Neighborhood02</g;
t[126]= '>DRC Neighborhood<';

f[127]= />BaronCityOffice</g;
t[127]= '>D\'ni-Ae\'gura<';

f[128]= />spyroom</g;
t[128]= '>D\'ni-Ae\'gura<';

f[129]= />RestorationGuild</g;
t[129]= '>Watcher\'s Guild<';

f[130]= />Ahnonay</g;
t[130]= '>Ahnonay<';

f[131]= />AhnySphere01</g;
t[131]= '>Ahnonay<';

f[132]= />AhnySphere02</g;
t[132]= '>Ahnonay<';

f[133]= />AhnySphere03</g;
t[133]= '>Ahnonay<';

f[134]= />AhnySphere04</g;
t[134]= '>Ahnonay<';

f[135]= />Ercana</g;
t[135]= '>Er\'cana<';

f[136]= />ErcanaCitySilo</g;
t[136]= '>D\'ni-Ashem\'en<';

f[137]= />BahroCave02</g;
t[137]= '>D\'ni-Rudenna<';

f[138]= />Myst</g;
t[138]= '>Myst<';

f[139]= />Kveer</g;
t[139]= '>D\'ni-Kveer<';

f[140]= />DniCityX2Finale</g;
t[140]= '>D\'ni-Ae\'gura<';

f[141]= />AvatarCustomization</g;
t[141]= '>Closet<';

f[142] = />DRA_Office</g;
t[142] = '>DRA Office<';

f[143] = />DniTemple_Area1</g;
t[143] = '>D\'ni Temple: Area One<';

f[144] = />Checkers</g;
t[144] = '>Checkers Age<';

f[145] = />Tomahn</g;
t[145] = '>Eder Tomahn<';

f[146] = />TheLostStonehenge</g;
t[146] = '>The Lost Stonehenge<';

f[147] = />llantern</g;
t[147] = '>Llantern<';

f[148] = />EderTaygahn</g;
t[148] = '>Eder Taygahn<';

f[149] = />coneLOL</g;
t[149] = '>Cone-LOL<';

f[150] = />TurtleIsle</g;
t[150] = '>Turtle Isle<';

f[151] = />WalkingMaze</g;
t[151] = '>Walking Maze<';


var txt = document.body.innerHTML;

for (j = 0; j < t.length; j ++)
{ txt = txt.replace (f[j], t[j]); }

//document.body.innerHTML = txt.split('<').join('&lt;').split('>').join('&gt;');
document.body.innerHTML = txt;
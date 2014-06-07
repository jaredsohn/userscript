// ==UserScript==
// @name           Gamefaqs 313 Renamer
// @description    Renames 313ers with a nickname or their real name
// @include        http://www.gamefaqs.com/*
// @include        http://boards.gamefaqs.com/gfaqs/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

// USE:
// To use this, just fill out the users list
// in the form:
// 'current name': 'new name',
// comma is important
// k
(function () {

users = {
'AdamLazaruso' : 'DJ Qualls',
'Addward' : 'Adam',
'adeel' : '',
'adielaird' : '',
'aieeeee' : '',
'AndrewThomas16' : 'JackBauer',
'Anzhan' : '',
'approx01' : 'Kari',
'arsemonkey' : 'Benjamin[?]',
'asdam_teabag' : 'Adam',
'AssassinDX' : 'Peter',
'Avon_B' : 'Tom',
'Azimuth1' : '',
'BertieDastard' : '',
'bhafc22' : '',
'Billabong Joe' : 'Not Joe...',
'Bisected8' : '',
'BlackMageJawa' : '',
'Bl4d3Gunn3r' : '',
'blooby140'  : 'Kyle',
'bmxbandit' : '',
'bremner03' : 'Daniel',
'bruno0091' : 'Bruno[?]',
'cactuar001' : '',
'CakeFaceRAWR' : '',
'callsmaybe' : '',
'Carnal Spirit' : '',
'Cathode Ray Tube' : '',
'Charley-Brown' : 'Connor',
'ChiliPeppers91' : 'Simon',
'chobe' : '',
'Chris SA' : 'Chris[?]',
'cicatrez' : '',
'ChiliPeppers91' : 'Simon',
'Chili Sauce' : '',
'Coniiick' : 'Nick',
'Cookieboy2003b' : 'Kyle',
'CornishAcid' : 'Liam',
'Cowboys4u86' : '',
'craigerz6' : 'Craig[?]',
'crazyman50000' : 'captain_birds_eye',
'creedster2' : '',
'cricketmad12' : '',
'Cubezilla_V' : 'Tom',
'Curien' : '',
'DAJ1' : 'Douglas (Andy)',
'dannybwood' : 'Daniel',
'Darkhadou_X' : 'Zohair',
'Darth_Snake' : 'Tom[?]',
'dbx125' : 'Damon',
'deiseman59' : '',
'DepheX' : '',
'dicktruth' : '',
'doctorofwho' : 'Stuart',
'DonGFC1946' : 'Donald',
'Doober2' : '',
'dragon pk' : '',
'Dreamer23' : '',
'DreamXing' : '',
'DTL' : '',
'ElementSk8r' : '',
'El Pinguino' : '',
'emmaaa_2' : 'Emma',
'emosdnA' : 'Andsome',
'Far Beyond Pissed' : 'Jake',
'Fatso666' : '',
'FFX2owner' : '',
'FinaI_Chance' : 'Ben [Izual]',
'fizziks' : 'Rushuna',
'flat_tyre' : '',
'Flid Merchant' : 'Neil',
'Forhand' : '',
'Fraunhoffer' : 'Teppic [Fatty]',
'Funguz' : 'Angus',
'goku4ever03' : '',
'Golgotha' : '',
'GoonerD39' : '',
'gorillazfan1212' : 'Oliver',
'GtaDeathCity' : '',
'HeartBreakKid25' : '',
'Holy_Hobo' : 'Jake',
'HyperFlow' : '',
'I_am_special' : '',
'Inane Identity' : '',
'Intanos VI' : '',
'iRobotic user' : '',
'iwantmyname' : 'Liz',
'Johnny_Ridden' : '',
'lzuaI_v3' : 'Ben',
'lzual_v3' : 'Ben',
'Izual_v4' : 'Ben',
'Jaehlst' : '',
'jethro6' : 'Jethro',
'joe3000' : 'Joe',
'JVirus14' : 'James C.',
'KerwenTw' : 'Matt',
'Lagunathemoron' : '',
'LAMPMAN' : '',
'ledzep3' : 'Robert[?]',
'localhero' : '',
'long live me v2' : '',
'Lord_Yggdrassil' : '',
'lugia101' : 'Josh',
'manbearpig2008' : '',
'Manchester City X' : 'MCX',
'mark21667' : '',
'MarkJacko' : 'Dale',
'MatJ' : 'Matthew',
'MatriculatedRIP' : '',
'MattyB2J' : 'Matthew',
'MG Legacy' : '',
'MIG297' : '',
'migeman14' : 'Migeman',
'mijihon' : '',
'Milly man' : 'Miles',
'minitomo' : '',
'moomoomashoo' : '',
'MrFelix' : 'Felix',
'Mr_Stark' : '',
'MrSmegheneghan' : 'Memorable as hell',
'MunsterWeeks' : 'Liam Weeks',
'NathanMan214' : 'Nathan',
'Nemesissy' : 'ASCII Guy',
'nice one Trev' : '',
'nick san' : 'Nick',
'ninja_khajit' : '',
'No1Stormie' : '',
'Noddy' : '',
'negablitz3' : 'Will',
'number10' : 'Daniel',
'Old Cloud' : '',
'Okikurmi' : 'Oki',
'old_guy_radio' : 'Stephen',
'OnceInALifeTime' : '',
'OurLadyPeace' : '',
'party_boy_UK' : 'Michael',
'Pengu1n' : '',
'philyT' : 'Phil',
'Phoenix Fist' : '',
'PopDog' : 'Laini',
'PumpinChimp' : '',
'rampant_rocker' : 'Adam',
'Reeve93' : 'Adam [Adz]',
'rickGamer' : 'Rick',
'robnobbed' : '',
'robo_donkey' : 'Sam[?]',
'RoboShindo' : '',
'RodanX' : '',
'RomanticWaluigi' : '',
'ShadowInMySoul' : '',
'Shift Breaker' : '',
'supersaiyan7' : 'Ash',
'Sam0n' : 'Samuel',
'samonkeyuk' : '',
'samusmuncher2' : '',
'sarvaloko' : '',
'scarlet_puppy' : '',
'SEEGAAAA' : 'Matriculated',
'ShadowInMySoul' : '',
'shane15' : 'Shane',
'Sheikums' : '',
'SmallSatsuma' : 'Alphonse',
'sonicvsshadow1' : 'Christopher',
'Snake4ever' : 'Steve',
'Sneaky Assassin' : '',
'steel359' : 'Steel',
'Stouffer2006' : 'Warren[?]',
'Stryfeman' : '',
'swiftninjav2' : 'Swift',
'Syxx_Pac' : 'Owen',
'TenthHeavenDan' : 'Daniel',
'thatgreenvw' : '',
'The Ayatollah C' : 'Crump',
'TheBirdLives' : 'TBL',
'The Great Malenko' : 'Jay',
'thekopistop' : '',
'TheHardcoreLegend' : '',
'The Hardcore Pawn' : 'PoshTim',
'TheGBAman' : '',
'theindiafan' : 'Aakash',
'The_Perkinator' : 'Anthony',
'The_Stig' : '',
'The_True_Pirate' : 'Ash',
'thusunda' : '',
'Titantodd' : 'Les-Paul',
'tocalegend' : 'Alex',
'tomrandomnumber' : 'Tom',
'TopSpurs' : '',
'trentonchase' : 'James',
'ultimatevyse' : 'Dave',
'Umbongo' : '',
'UniversalDragon' : 'Richie',
'violentlighting' : '',
'vitamins999' : '',
'weaponx99' : 'Kevin',
'WelshDragon89' : 'Scrawn',
'WelshGamer82' : 'Gareth',
'WhosArtifical' : '',
'WOC' : 'Michael',
'Wohot' : '',
'World Champion HHH' : '',
'xthemusic' : '',
'yatesll' : 'Liam',
'zHydro' : 'Louis',
'Zuku_ZuIu' : 'Robin'
}

// DO NOT EDIT BELOW THIS LINE!

// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='board topics']//tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) ) {
	item.nodeValue = item.nodeValue+" ("+users[userKey]+")";
    }
  }
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) )
       item.nodeValue = item.nodeValue+" ("+users[userKey]+")";
  }
}
})();
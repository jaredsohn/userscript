// ==UserScript==
// @name The-West Calc QuestList
// @version 1.0
// @description Quests for TW-Calc Script
// @author theTim
// @include	http://*.the-west.*/game.php*
// @include	http://*.tw.innogames.*/game.php*
// @updateURL http://userscripts.org/scripts/source/141924.user.js
// @downloadURL http://userscripts.org/scripts/source/141924.user.js
// ==/UserScript==

TWCalc_Quest_inject = function(){if(document.getElementById('TWCalc_Quest_js')) return; var TWCalc_Quest_js = document.createElement('script'); TWCalc_Quest_js.setAttribute('type', 'text/javascript'); TWCalc_Quest_js.setAttribute('language', 'javascript'); TWCalc_Quest_js.setAttribute('id', 'TWCalc_Quest_js'); TWCalc_Quest_js.innerHTML = "var _TWCalc_Quest_int = setInterval("+(function(){
clearInterval(_TWCalc_Quest_int);

TWCalcQuest_updaterCallback = function(version){
var title = "Quest extension update"; var currentVersion = Quest_TW_Calc.version; var msg = '<div class="txcenter">Quest extension update<div><br />Current version:'+currentVersion+'<br />New version:'+version.version+'<br />Whats new?</br>'+version.news+'</div>';
var ok = function(){window.open(version.downloadURL);}; var later = function(){}
if(version.version != currentVersion ) new tw2gui.dialog(title,msg,tw2gui.dialog.SYS_WARNING).addButton('ok', ok).addButton("Later", later).show();}

jQuery.ajax('http://tw-calc.net/script/quest/updater.js',{dataType:'jsonp',jsonpCallback:'TWCalcQuest_updaterCallback'});

Quest_TW_Calc = {
"version":"1.0",
"quests":{
"quests":{
"series":[
{"name":"Za novým dobrodružstvom", "level":"1", "clas":"Všetky", "q":"15", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","q":"180","name":"Pozdravy","id":"530","giver":"barkeeper","access":{"quest":{"value":"Ohnivé srdce (Iba sen?)","id":"180","serie":"0","quest":"0"}},"finish":{"duel":{"npc":"Lotor"}},"reward":{"exp":{"value":"42"},"item":{"count":"1","id":"1","action":"none"}}},
   {"clas":"quest_table","q":"530","name":"Zaslúž si ostrohy","id":"531","giver":"barkeeper","access":{"level":"2"},"finish":{"job":{"name":"Nasadzovať ostrohy","i":"1"}},"reward":{"exp":{"value":"21"},"dollar":{"value":"10"},"skill":{"count":"1","typ":"Voľné body schopností"}}},
   {"clas":"quest_table","q":"531","name":"Zaujímavé zistenie","id":"532","giver":"lady","access":{"item":{"count":"1","id":"1805","action":"eqp"}},"finish":{"item":{"place":"yield","count":"1","name":"cottonbale","id":"1806","action":"inv"},"item2":{"count":"1","id":"1805","action":"inv"}},"reward":{"item":{"count":"1","id":"40000","action":"none"},"exp":{"value":"45"}}},
   {"clas":"quest_table_light","equip":{},"access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Zber bavlny","i":"0"}},"reward":{"item":{"place":"yield","count":"1","name":"cottonbale","id":"1806","action":"none"}}},
   {"clas":"quest_table_light","equip":{},"access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Nasadzovať ostrohy","i":"0"}},"reward":{"item":{"place":"yield","count":"1","name":"needleandthreat","id":"1805","action":"none"}}},
   {"clas":"quest_table","q":"532","name":"Krajina potrebuje nové oblečenie","id":"533","giver":"lady","access":{"item":{"count":"1","id":"40000","action":"inv"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"12"},"item":{"count":"1","id":"569","action":"none"}}},
   {"clas":"quest_table","q":"533","name":"Prachovka","id":"534","giver":"barkeeper","access":{"item":{"count":"1","id":"40000","action":"inv"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"12"},"item":{"place":"neck","count":"1","name":"greenhorn_neck","id":"569","action":"none"}}},
   {"clas":"quest_table","q":"534","name":"Obchodovanie na Západe","id":"535","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"Musíš predať predmet Zaprášená handra obchodníkovi"}},"reward":{"exp":{"value":"21"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"535","name":"Obchodovanie za peniaze","id":"536","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"dollar":{"value":"200"}},"reward":{"exp":{"value":"12"},"item":{"count":"1","id":"607","action":"none"}}},
   {"clas":"quest_table","q":"536","name":"Tradičná práca","id":"537","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"702","action":"inv"}},"reward":{"exp":{"value":"21"},"item":{"count":"1","id":"10148","action":"none"}}},
   {"clas":"quest_table","q":"537","name":"Prvá cesta","id":"538","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"6"}}},
   {"clas":"quest_table","q":"538","name":"Stretnutie","id":"539","giver":"tiny_eagle","access":{"map":{"name":"Malý orol","x":"44408","y":"17694"}},"finish":{"job":{"name":"Rúbať stromy","i":"2"}},"reward":{"exp":{"value":"24"}}},
   {"clas":"quest_table","q":"539","name":"Nohavice akosi padajú","id":"540","giver":"tiny_eagle","access":{"map":{"name":"Malý orol","x":"44408","y":"17694"}},"finish":{"job":{"name":"Spracovávanie kože","i":"1"}},"reward":{"exp":{"value":"55"},"item":{"count":"1","id":"11118","action":"none"}}},
   {"clas":"quest_table","q":"540","name":"Prvý lov","id":"541","giver":"tiny_eagle","access":{"map":{"name":"Malý orol","x":"44408","y":"17694"}},"finish":{"job":{"name":"Lov moriakov","i":"4"}},"reward":{"exp":{"value":"18"}}},
   {"clas":"quest_table","q":"541","name":"Umenie jazdy na koni","id":"542","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Hnanie kráv","i":"1"}},"reward":{"exp":{"value":"45"}}},
   {"clas":"quest_table","q":"542","name":"Výber zbrane","id":"543","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"option":[{"item":{"count":"1","id":"52","action":"none"}},{"item":{"count":"1","id":"859","action":"none"}}]}},
   {"clas":"quest_table","q":"543","name":"Zúčtovanie","id":"544","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"koma":{"npc":"Bitkár"}},"reward":{"skill":{"count":"2","typ":"Voľné body schopností"},"item":{"count":"1","id":"438","action":"none"}}},
   {"clas":"quest_table_light","equip":{},"access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Rúbať stromy","i":"0"}},"reward":{"item":{"count":"1","id":"262","action":"none"}}}
]},
{"name":"Hon zločincov", "level":"2", "clas":"Všetky", "q":"4", "giver":"sheriff", "quests":[
   {"clas":"quest_table","q":"123","name":"Hľadanie","id":"23","giver":"sheriff","access":{"quest":{"value":"Erikov útek (Erik)","id":"123","serie":"3","quest":"4"}},"finish":{"item":{"count":"1","id":"743","action":"inv"}},"reward":{"item":{"count":"1","id":"1","action":"none"}}},
   {"clas":"quest_table","q":"23","name":"Malý darebák","id":"24","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Malý darebák"}},"reward":{"exp":{"value":"90"}}},
   {"clas":"quest_table","q":"24","name":"Hľadanie - druhá časť","id":"25","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Predaj novín","i":"2"}},"reward":{"exp":{"value":"80"}}},
   {"clas":"quest_table","q":"25","name":"Veľký darebák","id":"26","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Darebák"}},"reward":{"item":{"count":"1","id":"750","action":"none"}}},
]},
{"name":"Pony express", "level":"3", "clas":"Všetky", "q":"1", "giver":"barkeeper", "quests":[{"clas":"quest_table","name":"Správa pre teba","id":"155","giver":"barkeeper","access":{"level":"3"},"finish":{"none":{"text":"Potvrď svoju e-mailovú adresu"}},"reward":{"exp":{"value":"60"},"dollar":{"value":"15"},"bond":{"value":"50"}}}]},
{"name":"Erikov útek", "level":"4", "clas":"Všetky", "q":"4", "giver":"lady", "quests":[
   {"clas":"quest_table","name":"Darebáctvo","id":"120","giver":"lady","access":{"level":"4"},"finish":{"job":{"name":"Kŕmiť prasatá","i":"1"}},"reward":{"exp":{"value":"30"}}},
   {"clas":"quest_table","q":"120","name":"Bavlna","id":"121","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"704","action":"inv"}},"reward":{"exp":{"value":"45"}}},
   {"clas":"quest_table","q":"121","name":"Práca na poli","id":"122","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Zber obilia","i":"0"}},"reward":{"exp":{"value":"70"}}},
   {"clas":"quest_table","q":"122","name":"Erik","id":"123","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"743","action":"inv"}},"reward":{"exp":{"value":"50"},"item":{"count":"1","id":"308","action":"none"}}},
]},
{"name":"Nádenník", "level":"6", "clas":"Všetky", "q":"7", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","q":"544","name":"Farmárova zlomená noha","id":"880","giver":"barkeeper","access":{"quest":{"value":"Za novým dobrodružstvom (Zúčtovanie)","id":"544","serie":"0","quest":"17"}},"finish":{"none":{"text":"nič"},},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"880","name":"Všetky začiatky sú ťažké","id":"881","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Čistenie stajní","i":"10"}},"reward":{"exp":{"value":"225"},"dollar":{"value":"40"}}},
   {"clas":"quest_table","q":"881","name":"Starosť o zvieratá","id":"882","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Hnanie kráv","i":"1"},"job2":{"name":"Pásť ovce","i":"10"},"job3":{"name":"Kŕmiť prasatá","i":"8"}},"reward":{"exp":{"value":"375"},"dollar":{"value":"60"}}},
   {"clas":"quest_table","q":"882","name":"Únavná práca","id":"883","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Čistenie stajní","i":"20"}},"reward":{"exp":{"value":"225"},"dollar":{"value":"30"}}},
   {"clas":"quest_table","q":"883","name":"Opravy","id":"884","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Opravovanie plotov","i":"15"}},"reward":{"exp":{"value":"450"},"dollar":{"value":"400"}}},
   {"clas":"quest_table","q":"884","name":"Kopanie studne","id":"885","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Kopať studne","i":"18"}},"reward":{"exp":{"value":"425"},"dollar":{"value":"120"}}},
   {"clas":"quest_table","q":"885","name":"Zavlažovanie","id":"886","giver":"wilsons_farm","access":{"map":{"name":"Wilsonova farma","x":"8395","y":"1140"}},"finish":{"job":{"name":"Stavať zavlažovacie zariadenie","i":"20"}},"reward":{"exp":{"value":"750"},"dollar":{"value":"500"}}},
]},
{"name":"Stádo dobytka", "level":"8", "clas":"Všetky", "q":"6", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"Opravovanie plotov","id":"10","giver":"sheriff","access":{"level":"8"},"finish":{"item":{"count":"1","id":"747","action":"inv"}},"reward":{"skill_name":{"name":"repair","count":"1"}}},
   {"clas":"quest_table","q":"10","name":"Osol","id":"11","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"600","action":"eqp"}},"reward":{"exp":{"value":"180"},"dollar":{"value":"15"}}},
   {"clas":"quest_table","q":"11","name":"Kukurica pre osla","id":"12","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"748","action":"inv"}},"reward":{"exp":{"value":"60"}}},
   {"clas":"quest_table","q":"12","name":"Stádo","id":"13","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Hnanie kráv","i":"1"}},"reward":{"exp":{"value":"270"}}},
   {"clas":"quest_table","q":"13","name":"Značkovanie","id":"14","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"740","action":"inv"}},"reward":{"dollar":{"value":"75"}}},
   {"clas":"quest_table","q":"14","name":"Ostnatý drôt","id":"15","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"739","action":"inv"}},"reward":{"item":{"count":"1","id":"404","action":"none"}}},
]},
{"name":"Čierne hory","level":"10","clas":"Dobrodruh","q":"42","giver":"mugridge","quests":[]},
{"name":"Život je hra","level":"10","clas":"Duelant","q":"36","giver":"anna","quests":[]},
{"name":"Farma","level":"10","clas":"Pracovník","q":"39","giver":"nathan","quests":[]},
{"name":"Pomstiteľ","level":"10","clas":"Vojak","q":"37","giver":"william","quests":[]},
{"name":"Deň svätého valentína","level":"10","clas":"Všetky","q":"4","giver":"sheriff","quests":[
   {"clas":"quest_table","name":"Trošku lásky pre osamelého muža (žena)","id":"360","giver":"sheriff","access":{"level":"10","none":{"text":"Žena"},"date":["14.2.","18.2."]},"finish":{"item":{"count":"1","id":"700","action":"inv"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"360","name":"Cukor pre miláčika (žena)","id":"361","giver":"sheriff","access":{"date":["14.2.","18.2."]},"finish":{"item":{"count":"1","id":"703","action":"inv"}},"reward":{"exp":{"value":"150"},"item":{"count":"1","id":"567","action":"none"}}},
   {"clas":"quest_table","name":"Žena má svoje potreby","id":"362","giver":"lady","access":{"level":"10","none":{"text":"Muž"},"date":["14.2.","18.2."]},"finish":{"item":{"count":"1","id":"757","action":"inv"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"362","name":"Čo žena potrebuje","id":"363","giver":"lady","access":{"date":["14.2.","18.2."]},"finish":{"item":{"count":"1","id":"704","action":"inv"}},"reward":{"exp":{"value":"150","item":{"count":"1","id":"567","action":"none"}}}},
]},
{"name":"Deň nezávislosti","level":"10","clas":"Všetky","q":"7","giver":"barkeeper","quests":[
   {"clas":"quest_table","name":"Hľadá sa pomocná ruka","id":"460","giver":"barkeeper","access":{"date":["1.7.","14.7."],"level":"10"},"finish":{},"reward":{"exp":{"value":"150"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"460","name":"Čierny strelný prach nie je dosť čierny","id":"461","giver":"barkeeper","access":{"date":["1.7.","14.7."]},"finish":{"item":{"count":"4","id":"721","action":"inv"}},"reward":{"exp":{"value":"75"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"461","name":"Najdôležitejšie je všetko zmiešať...","id":"462","giver":"barkeeper","access":{"date":["1.7.","14.7."]},"finish":{"none":{"text":"nič"}},"reward":{"item":{"count":"1","id":"1757","action":"inv"}}},
   {"clas":"quest_table","q":"462","name":"Zapálenie","id":"463","giver":"ghosttown","access":{"date":["1.7.","14.7."],"map":{"name":"Mesto duchov","x":"1785","y":"2057"}},"finish":{"map":{"name":"Mesto duchov","x":"1785","y":"2057"}},"reward":{"item":{"count":"1","id":"1758","action":"none"},"dollar":{"value":"10"}}},
   {"clas":"quest_table","q":"463","name":"Poriadne trápny Deň nezávislosti","id":"464","giver":"barkeeper","access":{"date":["1.7.","14.7."]},"finish":{"none":{"text":"nič"}},"reward":{"item":{"count":"1","id":"1759","action":"none"}}},
   {"clas":"quest_table","q":"464","name":"Henryane I","id":"465","giver":"barkeeper","access":{"date":["1.7.","14.7."]},"finish":{"none":{"text":"nič"}},"reward":{"attr":{"count":"2","typ":"Charizma"}}},
   {"clas":"quest_table","q":"463","name":"Upratovanie po oslave","id":"500","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"1757","action":"inv"},"item2":{"count":"1","id":"1758","action":"inv"}},"reward":{"item":{"count":"1","id":"793","action":"none"}}},
]},
{"name":"Pranie špinavej bielizne","level":"10","clas":"Všetky","q":"2","giver":"barkeeper","quests":[
   {"clas":"quest_table","name":"Paradajková omáčka - všade!","id":"470","giver":"barkeeper","access":{"item":{"count":"1","id":"793","action":"eqp"}},"finish":{"item":{"count":"1","id":"793","action":"inv"}},"reward":{"item":{"count":"1","id":"1760","action":"none"}}},
   {"clas":"quest_table_light","equip":{"item":{"count":"1","id":"1760","action":"eqp"}},"access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Lov rýb","i":"0"}},"reward":{"item":{"count":"1","id":"1761","action":"none"}}},
   {"clas":"quest_table","name":"Pranie paradajkovej omáčky","id":"471","giver":"barkeeper","access":{"item":{"count":"1","id":"1761","action":"inv"}},"finish":{"item":{"count":"1","id":"1761","action":"inv"}},"reward":{"item":{"count":"1","id":"1762","action":"none"}}},
]},
{"name":"Hackettov nárok","level":"10","clas":"Všetky","q":"9","giver":"barkeeper","quests":[
   {"clas":"quest_table","name":"Walkerov recept","id":"800","giver":"barkeeper","access":{"level":"10","quest":{"value":"Za novým dobrodružstvom (Zúčtovanie)","id":"544","serie":"0","quest":"17"}},"finish":{"item":{"count":"3","id":"706","action":"inv"}},"reward":{"exp":{"value":"12"},"dollar":{"value":"18"}}},
   {"clas":"quest_table","name":"Starý lišiak","id":"801","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"12"},"item":{"count":"1","id":"1973","action":"none"}}},
   {"clas":"quest_table","name":"Návšteva","id":"802","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"23298","y":"17120"}},"finish":{"item":{"count":"1","id":"1973","action":"inv"}},"reward":{"exp":{"value":"21"}}},
   {"clas":"quest_table","name":"Fazule a slanina","id":"803","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"23298","y":"17120"}},"finish":{"item":{"count":"1","id":"700","action":"inv"},"item2":{"count":"1","id":"746","action":"inv"}},"reward":{"exp":{"value":"20"},"item":{"count":"1","id":"40001","action":"none"}}},
   {"clas":"quest_table","name":"Hacketta nebude nikto okrádať","id":"804","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"23298","y":"17120"}},"finish":{"duel":{"npc":"Zlatokop"},},"reward":{"exp":{"value":"54"},"item":{"count":"1","id":"574","action":"none"}}},
   {"clas":"quest_table","name":"K novému","id":"805","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"23298","y":"17120"}},"finish":{"job":{"name":"Vymeriavanie claimov","i":"6"}},"reward":{"skill":{"count":"1","typ":"Voľné body schopností"},"exp":{"value":"69"},"dollar":{"value":"30"}}},
   {"clas":"quest_table","name":"Zlatá horúčka","id":"806","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"23298","y":"17120"}},"finish":{"item":{"count":"1","id":"708","action":"inv"}},"reward":{"exp":{"value":"25"},"dollar":{"value":"100"}}},
   {"clas":"quest_table","name":"Hľadanie","id":"807","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"10"}}},
   {"clas":"quest_table","name":"Výplata","id":"808","giver":"old_man_hackett_e1","access":{"map":{"name":"Starý Hackett","x":"36086","y":"10532"}},"finish":{"duel":{"npc":"Starý hackett"}},"reward":{"exp":{"value":"120"},"dollar":{"value":"100"},"item":{"count":"1","id":"57","action":"none"}}},
]},
{"name":"Henryho narodeniny", "level":"11", "clas":"Všetky", "q":"4", "giver":"lady", "quests":[
   {"clas":"quest_table","name":"Bolesť chrbta","id":"140","giver":"lady","access":{"level":"11"},"finish":{"item":{"count":"3","id":"707","action":"inv"}},"reward":{"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"140","name":"Mokasíny","id":"141","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"712","action":"inv"}},"reward":{"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"141","name":"Vlajka Únie","id":"142","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"758","action":"inv"}},"reward":{"exp":{"value":"540"},}},
   {"clas":"quest_table","q":"142","name":"","id":"143","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"item":{"count":"1","id":"222","action":"none"}}},
]},
{"name":"Wauppeeho starý otec", "level":"14", "clas":"Všetky", "q":"5", "giver":"indian", "quests":[
   {"clas":"quest_table","name":"Zelený dym","id":"87","giver":"indian","access":{"level":"14"},"finish":{"skill_name":{"name":"tough","count":"9"}},"reward":{"exp":{"value":"120"}}},
   {"clas":"quest_table","q":"87","name":"Zlatý sokol","id":"88","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"10","id":"705","action":"inv"},"item2":{"count":"3","id":"712","action":"inv"}},"reward":{"exp":{"value":"180"}}},
   {"clas":"quest_table","q":"88","name":"Zlodejina","id":"89","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"772","action":"inv"}},"reward":{"exp":{"value":"210"}}},
   {"clas":"quest_table","q":"88","name":"Vrátiť naspäť","id":"90","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Zlodej"}},"reward":{"exp":{"value":"150"},"dollar":{"value":"30"}}},
   {"clas":"quest_table","q":"90","name":"Ukradnúť späť","id":"91","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"dollar":{"value":"170"},"item":{"count":"1","id":"503","action":"inv"}},"reward":{"item":{"count":"1","id":"772","action":"none"}}},
]},
{"name":"Joe", "level":"15", "clas":"Všetky", "q":"7", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Bitkár","id":"16","giver":"barkeeper","access":{"level":"15"},"finish":{"item":{"count":"1","id":"708","action":"inv"}},"reward":{"exp":{"value":"100"}}},
   {"clas":"quest_table","name":"Správne oblečenie","id":"17","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"205","action":"eqp"}},"reward":{"exp":{"value":"120"}}},
   {"clas":"quest_table","name":"Stretnutie v lese","id":"18","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"711","action":"inv"}},"reward":{"exp":{"value":"60"}}},
   {"clas":"quest_table","name":"Traja darebáci","id":"19","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Darebák"}},"reward":{"exp":{"value":"180"}}},
   {"clas":"quest_table","name":"Traja darebáci","id":"20","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"706","action":"inv"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","name":"Drevené dosky","id":"21","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"711","action":"inv"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","name":"Joe","id":"22","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Joe"}},"reward":{"item":{"count":"1","id":"325","action":"none"}}},
]},
{"name":"Keď prejdú festivaly", "level":"15", "clas":"Všetky", "q":"5", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Sú dôvody na oslavu I","id":"275","giver":"barkeeper","access":{"level":"15"},"finish":{"item":{"count":"3","id":"703","action":"inv"},"item2":{"count":"3","id":"706","action":"inv"}},"reward":{"exp":{"value":"50"},"dollar":{"value":"25"}}},
   {"clas":"quest_table","q":"275","name":"Sú dôvody na oslavu II","id":"276","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"748","action":"inv"}},"reward":{"exp":{"value":"35"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"276","name":"Sú dôvody na oslavu III","id":"277","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Vylepovanie plagátov","i":"20"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"277","name":"Sú dôvody na oslavu IV","id":"278","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"710","action":"inv"},"item2":{"count":"3","id":"700","action":"inv"},"item3":{"count":"1","id":"709","action":"inv"}},"reward":{"exp":{"value":"150"},"dollar":{"value":"75"}}},
   {"clas":"quest_table","q":"278","name":"Deň po","id":"279","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Opilec"}},"reward":{"exp":{"value":"150"},"dollar":{"value":"150"}}},
]},
{"name":"Zajtrajší titulok", "level":"15", "clas":"Všetky", "q":"3", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Na uliciach sa nič nedeje","id":"302","giver":"barkeeper","access":{"level":"15"},"finish":{"duel":{"npc":"Bob"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"302","name":"Vydávaj časopis","id":"303","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Tlačiť noviny","i":"12"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"303","name":"Prečítaj si to všetko, a dôkladne","id":"304","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Predaj novín","i":"20"}},"reward":{"exp":{"value":"50"},"dollar":{"value":"25"}}},
]},
{"name":"Taktika duelu", "level":"15", "clas":"Všetky", "q":"2", "giver":"sheriff", "quests":[
  {"clas":"quest_table","name":"Drsný Paddy","id":"156","giver":"sheriff","access":{"quest":{"value":"Joe (Joe)","id":"22","serie":"17","quest":"7"}},"finish":{"duel":{"npc":"Paddy"}},"reward":{"exp":{"value":"150"}}},
  {"clas":"quest_table","name":"Mršný Matthew","id":"157","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Matthew"}},"reward":{"exp":{"value":"120"}}},
]},
{"name":"Veľká noc", "level":"15", "clas":"Všetky", "q":"12", "giver":"lady", "quests":[
   {"clas":"quest_table","name":"Veľkonočné vajcia","id":"400","giver":"lady","access":{"level":"15","date":["6.4.","19.4."]},"finish":{"none":{"text":"nič"}},"reward":{"none":{"text":"nič"}}},
   {"clas":"quest_table","q":"400","name":"Veľkonočné vajce v meste duchov","id":"401","giver":"lady","access":{"map":{"name":"Mesto duchov","x":"1785","y":"2057"}},"finish":{"map":{"name":"Mesto duchov","x":"1785","y":"2057"}},"reward":{"exp":{"value":"150"},"item":{"count":"1","id":"1752","action":"none"}}},
   {"clas":"quest_table","q":"401","name":"Veľkonočné vajce na východe","id":"402","giver":"east","access":{"map":{"name":"Východný bod","x":"46076","y":"13590"}},"finish":{"map":{"name":"Východný bod","x":"46076","y":"13590"}},"reward":{"exp":{"value":"300"},"item":{"count":"1","id":"1753","action":"none"}}},
   {"clas":"quest_table","q":"402","name":"Veľkonočné vajce na západe","id":"403","giver":"west","access":{"map":{"name":"Západný bod","x":"245","y":"12903"}},"finish":{"map":{"name":"Západný bod","x":"245","y":"12903"}},"reward":{"exp":{"value":"450"},"item":{"count":"1","id":"1754","action":"none"}}},
   {"clas":"quest_table","q":"400","name":"Koniec hľadania","id":"404","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"1752","action":"inv"},"item":{"count":"1","id":"1753","action":"inv"},"item":{"count":"1","id":"1754","action":"inv"}},"reward":{"attr":{"count":"1","typ":"Sila"},"attr2":{"count":"1","typ":"Charizma"}}},
   {"clas":"quest_table","name":"Veľkonočná jahňacinka","id":"390","giver":"barkeeper","access":{"level":"15","date":["6.4.","19.4."]},"finish":{"job":{"name":"Pásť ovce","i":"12"}},"reward":{"exp":{"value":"50"},"dollar":{"value":"0"}}},
   {"clas":"quest_table","q":"390","name":"Lov moriaka","id":"391","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"709","action":"inv"}},"reward":{"exp":{"value":"75"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"391","name":"Hovädzí steak","id":"392","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"710","action":"inv"}},"reward":{"exp":{"value":"150"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","q":"392","name":"Rybolov","id":"393","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"717","action":"inv"},"item2":{"count":"3","id":"705","action":"inv"}},"reward":{"exp":{"value":"300"},"dollar":{"value":"50"}}},
   {"clas":"quest_table","name":"Veľkonočná vatra","id":"420","giver":"indian","access":{"level":"15","date":["6.4.","19.4."]},"finish":{"item":{"count":"15","id":"711","action":"inv"}},"reward":{"exp":{"value":"300"}}},
   {"clas":"quest_table","name":"Veľkonočný zajačik","id":"410","giver":"sheriff","access":{"level":"15","date":["6.4.","19.4."]},"finish":{"job":{"name":"ísť na prieskum","i":"4"}},"reward":{"exp":{"value":"600"}}},
   {"clas":"quest_table","q":"393,403,410,420","name":"Šťastná Veľká noc","id":"430","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"item":{"count":"1","id":"856","action":"none"}}},
]},
{"name":"Optimalzácia zisku", "level":"18", "clas":"Všetky", "q":"2", "giver":"lady", "quests":[
   {"clas":"quest_table","q":"15","name":"Žobrácky plat","id":"170","giver":"barkeeper","access":{"quest":{"value":"Stádo dobytka (Ostnatý drôt","id":"15","serie":"6","quest":"6"}},"finish":{"item":{"count":"1","id":"744","action":"inv"}},"reward":{"exp":{"value":"60"},"none":{"text":"+3 dni prémium Vyšší príjem"}}},
   {"clas":"quest_table","q":"170","name":"Ľahko zarobené peniaze","id":"171","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"744","action":"inv"}},"reward":{"exp":{"value":"100"}}},
]},
{"name":"Dobre organizované", "level":"18", "clas":"Všetky", "q":"2", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Šťavnaté steaky","id":"190","giver":"barkeeper","access":{"level":"18"},"finish":{"item":{"count":"5","id":"710","action":"inv"}},"reward":{"exp":{"value":"150"},"none":{"text":"+7 dni prémium Automatizácia"}}},
   {"clas":"quest_table","q":"190","name":"Prílohy","id":"191","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"744","action":"inv"},"item2":{"count":"2","id":"748","action":"inv"},"item3":{"count":"3","id":"746","action":"inv"},"item4":{"count":"3","id":"701","action":"inv"}},"reward":{"exp":{"value":"200"}}},
]},
{"name":"Drahokamy", "level":"20", "clas":"Všetky", "q":"4", "giver":"lady", "quests":[
   {"clas":"quest_table","q":"20","name":"Retiazka z drahokamov","id":"33","giver":"lady","access":{"quest":{"value":"Joe (Traja darebáci)","id":"20","serie":"17","quest":"5"}},"finish":{"item":{"count":"1","id":"509","action":"inv"},"item2":{"count":"1","id":"510","action":"inv"}},"reward":{"exp":{"value":"60"}}},
   {"clas":"quest_table","q":"33","name":"Drahé kamene vo vode","id":"34","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"720","action":"inv"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"34","name":"Drahokamy v zemi","id":"35","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Strážca cintorína"}},"reward":{"exp":{"value":"90"}}},
   {"clas":"quest_table","q":"35","name":"Drahokamy v hrobe","id":"36","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"736","action":"inv"}},"reward":{"item":{"count":"1","id":"528","action":"none"},"exp":{"value":"60"}}},
]},
{"name":"Ťažká práca", "level":"20", "clas":"Všetky", "q":"4", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Do bane","id":"370","giver":"barkeeper","access":{"level":"20","item":{"count":"1","id":"753","action":"eqp"}},"finish":{"job":{"name":"Ťžba uhlia","i":"24"}},"reward":{"exp":{"value":"1500"},"dollar":{"value":"500"}}},
   {"clas":"quest_table","name":"Vykop si hrob","id":"371","giver":"barkeeper","access":{"level":"20","item":{"count":"1","id":"736","action":"eqp"}},"finish":{"job":{"name":"Kopanie hrobov","i":"24"}},"reward":{"exp":{"value":"1500"},"dollar":{"value":"500"}}},
   {"clas":"quest_table","name":"A je to!","id":"372","giver":"barkeeper","access":{"level":"20","item":{"count":"1","id":"761","action":"eqp"}},"finish":{"job":{"name":"Opravovanie plotov","i":"60"}},"reward":{"exp":{"value":"1500"},"dollar":{"value":"500"}}},
   {"clas":"quest_table","name":"Rybársky šampión roka","id":"373","giver":"barkeeper","access":{"level":"20","item":{"count":"1","id":"782","action":"eqp"}},"finish":{"job":{"name":"Lov rýb","i":"60"}},"reward":{"exp":{"value":"1500"},"dollar":{"value":"500"}}},
]},
{"name":"Pustatina", "level":"20", "clas":"Všetky", "q":"64", "giver":"sheriff", "quests":[]},
{"name":"Bob", "level":"23", "clas":"Všetky", "q":"6", "giver":"barkeeper", "quests":[
   {"clas":"quest_table","name":"Ťažká práca","id":"37","giver":"barkeeper","access":{"level":"23"},"finish":{"item":{"count":"1","id":"766","action":"inv"}},"reward":{"dollar":{"value":"5"}}},
   {"clas":"quest_table","q":"37","name":"Zásoby dreva","id":"38","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"6","id":"711","action":"inv"}},"reward":{"dollar":{"value":"350"}}},
   {"clas":"quest_table","q":"38","name":"Demontáž","id":"39","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Indián"}},"reward":{"exp":{"value":"180"}}},
   {"clas":"quest_table","q":"39","name":"Pracovať v kameňolome","id":"40","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"6","id":"716","action":"inv"}},"reward":{"dollar":{"value":"300"}}},
   {"clas":"quest_table","q":"40","name":"Stavba mosta","id":"42","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"761","action":"inv"}},"reward":{"exp":{"value":"80"}}},
   {"clas":"quest_table","q":"42","name":"Železničná stanica","id":"43","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"759","action":"inv"}},"reward":{"item":{"count":"1","id":"407","action":"none"}}},
]},
{"name":"Rozhodnutie", "level":"25", "clas":"Všetky", "q":"4", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"Krotiť kone","id":"150","giver":"sheriff","access":{"level":"25"},"finish":{"item":{"count":"1","id":"787","action":"inv"}},"reward":{"exp":{"value":"120"}}},
   {"clas":"quest_table","q":"150","name":"Zlom väz!","id":"151","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"721","action":"inv"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"151","noq":"153","dec":"0","name":"Tučná korisť (1)","id":"152","giver":"sheriff","access":{"noquest":{"value":"Rozhodnutie (Tučná korisť)","id":"152","serie":"28","quest":"4"}},"finish":{"item":{"count":"5","id":"714","action":"inv"}},"reward":{"dollar":{"value":"500"}}},
   {"clas":"quest_table","q":"151","noq":"152","dec":"-27","name":"Sabotáž","id":"153","giver":"indian","access":{"noquest":{"value":"Rozhodnutie (Tučná korisť)","id":"152","serie":"28","quest":"3"}},"finish":{"item":{"count":"5","id":"771","action":"inv"}},"reward":{"exp":{"value":"300"},"item":{"count":"1","id":"751","action":"none"}}},
]},
{"name":"Šaty robia človeka", "level":"27", "clas":"Všetky", "q":"6", "giver":"lady", "quests":[
   {"clas":"quest_table","name":"Balenie súkna","id":"48","giver":"lady","access":{"level":"27"},"finish":{"item":{"count":"1","id":"715","action":"inv"}},"reward":{"dollar":{"value":"22"}}},
   {"clas":"quest_table","name":"Gombíky","id":"49","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"740","action":"inv"}},"reward":{"dollar":{"value":"75"}}},
   {"clas":"quest_table","name":"Brošňa","id":"50","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"767","action":"inv"}},"reward":{"skill_name":{"name":"finger_dexterity","count":"2"}}},
   {"clas":"quest_table","name":"Tréma","id":"51","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"766","action":"inv"}},"reward":{"exp":{"value":"60"}}},
   {"clas":"quest_table","name":"Pivo","id":"52","giver":"barkeeper","access":{"none":{"text":"nič"}},"finish":{"dollar":{"value":"20"}},"reward":{"item":{"count":"2","id":"770","action":"none"}}},
   {"clas":"quest_table","name":"Dobrá dohoda","id":"53","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"770","action":"inv"}},"reward":{"item":{"count":"1","id":"335","action":"none"}}},
]},
{"name":"Divoké kone", "level":"30", "clas":"Všetky", "q":"4", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"John je hladný","id":"80","giver":"sheriff","access":{"level":"30"},"finish":{"item":{"count":"2","id":"722","action":"inv"}},"reward":{"dollar":{"value":"20"}}},
   {"clas":"quest_table","q":"80","name":"Množstvo dreva","id":"81","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"20","id":"711","action":"inv"}},"reward":{"dollar":{"value":"300"}}},
   {"clas":"quest_table","q":"81","name":"Odchyt koní","id":"82","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"749","action":"inv"}},"reward":{"exp":{"value":"420"},"dollar":{"value":"150"}}},
   {"clas":"quest_table","q":"82","name":"Zlodej koní","id":"83","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Zlodej koní"}},"reward":{"item":{"count":"1","id":"602","action":"none"}}},
]},
{"name":"Anjel lásky", "level":"30", "clas":"Všetky", "q":"5", "giver":"lady", "quests":[
   {"clas":"quest_table","name":"Mike a Jenny","id":"280","giver":"lady","access":{"level":"30"},"finish":{"job":{"name":"Obchodovanie","i":"15"}},"reward":{"dollar":{"exp":{"value":"125"},"value":"50"}}},
   {"clas":"quest_table","q":"280","name":"Láska a prekážky","id":"281","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"720","action":"inv"},"item2":{"count":"2","id":"705","action":"inv"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"281","name":"A potom, keď príde láska...","id":"282","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"none":{"text":"nič"}},"reward":{"exp":{"value":"300"}}},
   {"clas":"quest_table","q":"282","name":"Vojna ruží","id":"283","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Výroba rakiev","i":"4"}},"reward":{"exp":{"value":"150"},}},
   {"clas":"quest_table","q":"283","name":"Zajtrajšia vdova","id":"284","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"koma":{"npc":"Mike"}},"reward":{"exp":{"value":"750"},"dollar":{"value":"500"}}},
]},
{"name":"Lov", "level":"33", "clas":"Všetky", "q":"4", "giver":"indian", "quests":[
   {"clas":"quest_table","name":"Lov moriakov","id":"44","giver":"indian","access":{"level":"33"},"finish":{"item":{"count":"2","id":"709","action":"inv"}},"reward":{"exp":{"value":"75"}}},
   {"clas":"quest_table","q":"44","name":"Lov lososov","id":"45","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"3","id":"717","action":"inv"}},"reward":{"exp":{"value":"100"}}},
   {"clas":"quest_table","q":"45","name":"Lov kojotov","id":"46","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"718","action":"inv"}},"reward":{"exp":{"value":"100"}}},
   {"clas":"quest_table","q":"46","name":"Lov bizónov","id":"47","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"724","action":"inv"}},"reward":{"exp":{"value":"360"},"item":{"count":"1","id":"512","action":"none"}}},
]},
{"name":"Prsteň", "level":"33", "clas":"Všetky", "q":"2", "giver":"indian", "quests":[
   {"clas":"quest_table","q":"47","name":"","id":"200","giver":"indian","access":{"quest":{"value":"Lov (Lov bizónov)","id":"47","serie":"31","quest":"4"},"item":{"count":"1","id":"763","action":"eqp"}},"finish":{"skill_name":{"name":"finger_dexterity","count":"50"}},"reward":{"exp":{"value":"600"}}},
   {"clas":"quest_table","q":"200","name":"","id":"201","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"723","action":"inv"}},"reward":{"exp":{"value":"3000"}}},
]},
{"name":"Úžastné cesta", "level":"35", "clas":"Všetky", "q":"6", "giver":"indian", "quests":[
   {"clas":"quest_table","name":"Pomôž kmeňu","id":"291","giver":"indian","access":{"level":"35"},"finish":{"job":{"name":"Píliť drevo","i":"12"},"item":{"count":"10","id":"711","action":"inv"}},"reward":{"exp":{"value":"75"},"dollar":{"value":"100"}}},
   {"clas":"quest_table","q":"291","name":"Príprava koní na cestu","id":"292","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Podkúvať kone","i":"24"}},"reward":{"exp":{"value":"150"},"dollar":{"value":"75"}}},
   {"clas":"quest_table","q":"292","name":"Hľadanie jedla","id":"293","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"722","action":"inv"},"item2":{"count":"10","id":"706","action":"inv"},"item3":{"count":"7","id":"717","action":"inv"}},"reward":{"dollar":{"value":"25"}}},
   {"clas":"quest_table","q":"293","name":"Voda čaká...","id":"294","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"741","action":"inv"},"item2":{"count":"6","id":"766","action":"inv"}},"reward":{"exp":{"value":"450"}}},
   {"clas":"quest_table","q":"294","name":"Kto videl bizóna?","id":"295","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"ísť na prieskum","i":"4"}},"reward":{"exp":{"value":"450"}}},
   {"clas":"quest_table","q":"295","name":"Objatie priateľov","id":"296","giver":"indian","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Lov bizónov","i":"4"}},"reward":{"exp":{"value":"450"},"attr":{"count":"1","typ":"Zručnosť"}}},
]},
{"name":"Komunikačné cesty", "level":"35", "clas":"Všetky", "q":"5", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"Informácie sú často drahšie ako zlato","id":"297","giver":"sheriff","access":{"level":"35"},"finish":{"item":{"count":"5","id":"767","action":"inv"}},"reward":{"exp":{"value":"250"}}},
   {"clas":"quest_table","q":"297","name":"Keď poštár zvoní jedenkrát","id":"298","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Odchyt koní","i":"24"}},"reward":{"exp":{"value":"250"}}},
   {"clas":"quest_table","q":"298","name":"Keď poštár zvoní dvakrát","id":"299","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"787","action":"inv"}},"reward":{"exp":{"value":"350"}}},
   {"clas":"quest_table","q":"299","name":"Keď poštár zvoní trikrát","id":"300","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Oprava krytých vozov","i":"24"}},"reward":{"exp":{"value":"350"}}},
   {"clas":"quest_table","q":"300","name":"Keď poštár zvoní poslednýkrát","id":"301","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Stráženie dostavníku","i":"8"}},"reward":{"exp":{"value":"1500"},"attr":{"count":"1","typ":"Pohyblivosť"}}},
]},
{"name":"Banda Daltonovcov", "level":"36", "clas":"Všetky", "q":"5", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"Náradie","id":"54","giver":"sheriff","access":{"level":"36"},"finish":{"item":{"count":"1","id":"756","action":"inv"}},"reward":{"exp":{"value":"240"}}},
   {"clas":"quest_table","q":"55","name":"Dynamit","id":"55","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"2","id":"737","action":"inv"}},"reward":{"exp":{"value":"160"}}},
   {"clas":"quest_table","q":"56","name":"Prepadnutie na moste","id":"56","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"759","action":"inv"}},"reward":{"exp":{"value":"450"}}},
   {"clas":"quest_table","q":"57","name":"Množstvo rakiev","id":"57","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"734","action":"inv"}},"reward":{"dollar":{"value":"500"}}},
   {"clas":"quest_table","q":"58","name":"Prestrelka v salóne","id":"58","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Grat Dalton"}},"reward":{"option3":[{"item":{"count":"1","id":"337","action":"none"}},{"item":{"count":"1","id":"539","action":"none"}},{"item":{"count":"1","id":"409","action":"none"}}]}},
]},
{"name":"Apríl", "level":"37", "clas":"Všetky", "q":"3", "giver":"sheriff", "quests":[
   {"clas":"quest_table","name":"Opravovanie","id":"225","giver":"sheriff","access":{"level":"37","none":{"text":"Apríl"}},"finish":{"item":{"count":"1","id":"747","action":"inv"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"226","name":"Krytý voz","id":"226","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Oprava krytých vozov","i":"12"}},"reward":{"exp":{"value":"150"}}},
   {"clas":"quest_table","q":"227","name":"Hádzať rýľom!","id":"227","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"job":{"name":"Stavať zavlažovacie zariadenie","i":"20"}},"reward":{"dollar":{"value":"300"},"skill_name":{"name":"build","count":"1"}}},
]},
{"name":"Tri rieky", "level":"39", "clas":"Všetky", "q":"7", "giver":"indian", "quests":[
   {"clas":"quest_table","name":"Pytliak","id":"59","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"duel":{"npc":"Pytliak"}},"reward":{"exp":{"value":"210"}}},
   {"clas":"quest_table","q":"59","name":"Pasce na bobrov","id":"60","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"4","id":"771","action":"inv"}},"reward":{"exp":{"value":"270"}}},
   {"clas":"quest_table","q":"60","name":"Hľadanie zlata","id":"61","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"1","id":"760","action":"inv"}},"reward":{"exp":{"value":"330"}}},
   {"clas":"quest_table","q":"61","name":"Ťažba zlata","id":"62","giver":"sheriff","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"5","id":"708","action":"inv"}},"reward":{"exp":{"value":"450"}}},
   {"clas":"quest_table","q":"62","noq":"64","dec":"0","name":"Obchod so zlatom","id":"63","giver":"sheriff","access":{"noquest":{"value":"Tri rieky (Ponuka (2))","id":"64","serie":"37","quest":"63"}},"finish":{"item":{"count":"5","id":"715","action":"inv"}},"reward":{"dollar":{"value":"800"}}},
   {"clas":"quest_table","q":"62","noq":"63","dec":"-27","name":"Ponuka (2)","id":"64","giver":"lady","access":{"noquest":{"value":"Tri riekye (Obchod so zlatom)","id":"63","serie":"37","quest":"5"}},"finish":{"none":{"text":"nič"}},"reward":{"dollar":{"value":"1400"}}},
   {"clas":"quest_table","q":"64","dec":"-27","name":"Označovanie (2)","id":"65","giver":"lady","access":{"none":{"text":"nič"}},"finish":{"item":{"count":"6","id":"755","action":"inv"}},"reward":{"dollar":{"value":"700"}}},
]},
]
}
}
}

}).toString()+", 1000); ";
document.getElementsByTagName('body')[0].appendChild(TWCalc_Quest_js);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWCalc_Quest_inject();
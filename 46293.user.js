// ==UserScript==
// @name          HWM_Pers_Hunt_Records
// @description   HWM mod - Pers_Hunt_Records
// @version 0.55.1
// @include        http://www.heroeswm.ru/map.php*
// @include        http://www.heroeswm.ru/group_wars.php*
// @include       http://www.heroeswm.ru/pl_hunter_stat.php*
// @include        http://www.heroeswm.com/map.php*
// @include       http://www.heroeswm.com/pl_hunter_stat.php*
// @include        http://www.heroeswm.com/group_wars.php*
// ==/UserScript==

// ===================  =================================

// === v 0.55.1 ========

var url_cur = location.href;

var m, server_ext = 'com'; // are we on .ru or on .com?
if (m = url_cur.match(/heroeswm\.(\w+)\//)) {
    server_ext = m[1];
}

var pers_rec_str;
if (server_ext == 'ru') { // russian
    pers_rec_str = "\u041B\u0438\u0447\u043D\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ";
}
else { // english
    pers_rec_str = "Personal record: ";
}

var url_group = "/group_wars.php";
var url_map = "/map.php"; // this should be working on .com too
var url_hrec = getUrlHrec(); // url of our personal records table
var hunter_id = url_hrec.match(/id=\d+/); // our player_id
var save_addr = 'hwm_my_hunt_rec' + '-' + server_ext + '-' + hunter_id;

var all_td_Elements, this_td_Element;
all_td_Elements = document.getElementsByTagName('td');
var all_tables = document.getElementsByTagName('table');

var monsters_en_ru = {
		"angel" 			: "\u0410\u043D\u0433\u0435\u043B\u044B",
		"air" 				: "\u0412\u043e\u0437\u0434\u0443\u0448\u043d\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u0438",
		"archer" 			: "\u041b\u0443\u0447\u043d\u0438\u043a\u0438", 
		"archlich" 			: "\u0410\u0440\u0445\u0438\u043b\u0438\u0447\u0438",
		"archmage" 			: "\u0410\u0440\u0445\u0438\u043c\u0430\u0433\u0438",
		"assassin" 			: "\u0410\u0441\u0441\u0430\u0441\u0438\u043d\u044b",
		"battlegriffin" 	: "\u0411\u043e\u0435\u0432\u044b\u0435 \u0433\u0440\u0438\u0444\u043e\u043d\u044b", 
		"bear" 				: "\u041c\u0435\u0434\u0432\u0435\u0434\u0438",
		"bearrider" 		: "\u041d\u0430\u0435\u0437\u0434\u043d\u0438\u043a\u0438 \u043d\u0430 \u043c\u0435\u0434\u0432\u0435\u0434\u044f\u0445",
		"behemoth" 			: "\u0411\u0435\u0433\u0435\u043c\u043e\u0442\u044b",
		"berserker" 		: "\u0411\u0435\u0440\u0441\u0435\u0440\u043a\u0438",
		"blackbearrider" 	: "\u0425\u043e\u0437\u044f\u0435\u0432\u0430 \u043c\u0435\u0434\u0432\u0435\u0434\u0435\u0439",
		"blackdragon" 		: "\u0427\u0435\u0440\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"bonedragon" 		: "\u041a\u043e\u0441\u0442\u044f\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"brawler" 			: "\u041a\u043e\u0441\u0442\u043e\u043b\u043e\u043c\u044b",
		"cavalier" 			: "\u0420\u044b\u0446\u0430\u0440\u0438",
		"cerberus" 			: "\u0426\u0435\u0440\u0431\u0435\u0440\u044b",
		"colossus" 			: "\u041a\u043e\u043b\u043e\u0441\u0441\u044b",
		"conscript" 		: "\u041e\u043f\u043e\u043b\u0447\u0435\u043d\u0446\u044b",
		"cow2009" 			: "\u0411\u0443\u0440\u0435\u043d\u043a\u0430 2009 \u0433\u043e\u0434\u0430",
		"cyclop" 			: "\u0426\u0438\u043a\u043b\u043e\u043f\u044b",
		"dancer" 			: "\u0422\u0430\u043d\u0446\u0443\u044e\u0449\u0438\u0435 \u0441 \u043a\u043b\u0438\u043d\u043a\u0430\u043c\u0438",
		"darkrider" 		: "\u041d\u0430\u0435\u0437\u0434\u043d\u0438\u043a\u0438 \u043d\u0430 \u044f\u0449\u0435\u0440\u0430\u0445",
		"deephydra" 		: "\u041f\u0435\u0449\u0435\u0440\u043d\u044b\u0435 \u0433\u0438\u0434\u0440\u044b",
		"defender" 			: "\u0417\u0430\u0449\u0438\u0442\u043d\u0438\u043a\u0438 \u0433\u043e\u0440",
		"devil" 			: "\u0414\u044c\u044f\u0432\u043e\u043b\u044b",
		"djinn" 			: "\u0414\u0436\u0438\u043d\u043d\u044b",
		"djinn_sultan" 		: "\u0414\u0436\u0438\u043d\u043d\u044b-\u0441\u0443\u043b\u0442\u0430\u043d\u044b",
		"druid" 			: "\u0414\u0440\u0443\u0438\u0434\u044b",
		"druideld" 			: "\u0412\u0435\u0440\u0445\u043e\u0432\u043d\u044b\u0435 \u0434\u0440\u0443\u0438\u0434\u044b",
		"earth" 			: "\u0417\u0435\u043c\u043d\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u0438",
		"elf" 				: "\u042d\u043b\u044c\u0444\u0438\u0439\u0441\u043a\u0438\u0435 \u043b\u0443\u0447\u043d\u0438\u043a\u0438",
		"emeralddragon" 	: "\u0418\u0437\u0443\u043c\u0440\u0443\u0434\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"enforcer" 			: "\u041c\u044f\u0442\u0435\u0436\u043d\u0438\u043a\u0438",
		"familiar" 			: "\u0427\u0435\u0440\u0442\u0438",
		"fire" 				: "\u041e\u0433\u043d\u0435\u043d\u043d\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u0438",
		"firedragon" 		: "\u041e\u0433\u043d\u0435\u043d\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"footman" 			: "\u041f\u0435\u0445\u043e\u0442\u0438\u043d\u0446\u044b",
		"fury" 				: "\u0424\u0443\u0440\u0438\u0438",
		"ghost" 			: "\u041f\u0440\u0438\u0432\u0438\u0434\u0435\u043d\u0438\u044f",
		"goblin" 			: "\u0413\u043e\u0431\u043b\u0438\u043d\u044b",
		"greendragon" 		: "\u0417\u0435\u043b\u0435\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"gremlin" 			: "\u0413\u0440\u0435\u043c\u043b\u0438\u043d\u044b",
		"griffon" 			: "\u0413\u0440\u0438\u0444\u043e\u043d\u044b",
		"grimrider" 		: "\u0422\u0451\u043c\u043d\u044b\u0435 \u0432\u0441\u0430\u0434\u043d\u0438\u043a\u0438",
		"hellcharger" 		: "\u0410\u0434\u0441\u043a\u0438\u0435 \u0436\u0435\u0440\u0435\u0431\u0446\u044b", 
		"hellhound" 		: "\u0410\u0434\u0441\u043a\u0438\u0435 \u043f\u0441\u044b",
		"hobgoblin" 		: "\u0425\u043e\u0431\u0433\u043e\u0431\u043b\u0438\u043d\u044b",
		"horneddemon" 		: "\u0420\u043e\u0433\u0430\u0442\u044b\u0435 \u0434\u0435\u043c\u043e\u043d\u044b",
		"hornedoverseer" 	: "\u041e\u0433\u043d\u0435\u043d\u043d\u044b\u0435 \u0434\u0435\u043c\u043e\u043d\u044b",
		"hydra" 			: "\u0413\u0438\u0434\u0440\u044b",
		"imp" 				: "\u0411\u0435\u0441\u044b",
		"impergriffin" 		: "\u0418\u043c\u043f\u0435\u0440\u0441\u043a\u0438\u0435 \u0433\u0440\u0438\u0444\u043e\u043d\u044b",
		"inquisitor" 		: "\u0418\u043d\u043a\u0432\u0438\u0437\u0438\u0442\u043e\u0440\u044b",
		"iron_golem" 		: "\u0416\u0435\u043b\u0435\u0437\u043d\u044b\u0435 \u0433\u043e\u043b\u0435\u043c\u044b",
		"kaa" 				: "\u0423\u0434\u0430\u0432 \u041a\u0430\u0430",
		"lich" 				: "\u041b\u0438\u0447\u0438",
		"lizard" 			: "\u0413\u0438\u0433\u0430\u043d\u0442\u0441\u043a\u0438\u0435 \u044f\u0449\u0435\u0440\u044b",
		"mad_rat" 			: "\u0417\u043b\u0430\u044f \u043a\u0440\u044b\u0441\u0430 2008 \u0433\u043e\u0434\u0430",
		"mage" 				: "\u041c\u0430\u0433\u0438",
		"magmadragon" 		: "\u041c\u0430\u0433\u043c\u0430 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"maiden" 			: "\u0411\u0435\u0441\u0442\u0438\u0438",
		"marksman" 			: "\u0410\u0440\u0431\u0430\u043b\u0435\u0442\u0447\u0438\u043a\u0438",
		"mastergremlin" 	: "\u0421\u0442\u0430\u0440\u0448\u0438\u0435 \u0433\u0440\u0435\u043c\u043b\u0438\u043d\u044b",
		"masterhunter" 		: "\u041c\u0430\u0441\u0442\u0435\u0440\u0430 \u043b\u0443\u043a\u0430",
		"mercarcher" 		: "\u0421\u0442\u0440\u0435\u043b\u043a\u0438-\u043d\u0430\u0451\u043c\u043d\u0438\u043a\u0438",
		"mercfootman" 		: "\u0412\u043e\u0438\u043d\u044b-\u043d\u0430\u0451\u043c\u043d\u0438\u043a\u0438",
		"mercwizard" 		: "\u0427\u0430\u0440\u043e\u0434\u0435\u0438-\u043d\u0430\u0435\u043c\u043d\u0438\u043a\u0438",
		"minotaur" 			: "\u041c\u0438\u043d\u043e\u0442\u0430\u0432\u0440\u044b",
		"minotaurguard" 	: "\u041c\u0438\u043d\u043e\u0442\u0430\u0432\u0440\u044b-\u0441\u0442\u0440\u0430\u0436\u0438",
		"nightmare" 		: "\u041a\u043e\u0448\u043c\u0430\u0440\u044b",
		"obsgargoyle" 		: "\u041e\u0431\u0441\u0438\u0434\u0438\u0430\u043d\u043e\u0432\u044b\u0435 \u0433\u043e\u0440\u0433\u0443\u043b\u044c\u0438",
		"ogre" 				: "\u041e\u0433\u0440\u044b",
		"ogremagi" 			: "\u041e\u0433\u0440\u044b \u043c\u0430\u0433\u0438",
		"orc" 				: "\u041e\u0440\u043a\u0438",
		"orcchief" 			: "\u041e\u0440\u043a\u0438-\u0432\u043e\u0436\u0434\u0438",
		"peasant" 			: "\u041a\u0440\u0435\u0441\u0442\u044c\u044f\u043d\u0435",
		"pig2007" 			: "\u0421\u0432\u0438\u043d\u044c\u044f 2007 \u0433\u043e\u0434\u0430",
		"pitfiend" 			: "\u041f\u0435\u0449\u0435\u0440\u043d\u044b\u0435 \u0434\u0435\u043c\u043e\u043d\u044b",
		"pixel" 			: "\u0424\u0435\u0438",
		"plaguezombie" 		: "\u0427\u0443\u043c\u043d\u044b\u0435 \u0437\u043e\u043c\u0431\u0438",
		"priest" 			: "\u041c\u043e\u043d\u0430\u0445\u0438",
		"pumkinhead" 		: "\u0422\u044b\u043a\u0432\u043e\u0433\u043e\u043b\u043e\u0432\u044b\u0435",
		"rakshasa_raja" 	: "\u0420\u0430\u0434\u0436\u0438 \u0440\u0430\u043a\u0448\u0430\u0441",
		"rakshasa_rani" 	: "\u041f\u0440\u0438\u043d\u0446\u0435\u0441\u0441\u044b \u0440\u0430\u043a\u0448\u0430\u0441",
		"rat2008" 			: "\u041a\u0440\u044b\u0441\u0430 2008 \u0433\u043e\u0434\u0430",
		"redlizard" 		: "\u041a\u0440\u043e\u0432\u0430\u0432\u044b\u0435 \u044f\u0449\u0435\u0440\u044b",
		"rocbird" 			: "\u0420\u043e\u043a\u0438",
		"runepatriarch" 	: "\u0421\u0442\u0430\u0440\u0435\u0439\u0448\u0438\u043d\u044b \u0440\u0443\u043d",
		"runepriest" 		: "\u0416\u0440\u0435\u0446\u044b \u0420\u0443\u043d",
		"scout" 			: "\u041b\u0430\u0437\u0443\u0442\u0447\u0438\u043a\u0438",
		"silverunicorn" 	: "\u0411\u043e\u0435\u0432\u044b\u0435 \u0435\u0434\u0438\u043d\u043e\u0440\u043e\u0433\u0438",
		"shadowdragon" 		: "\u0421\u0443\u043c\u0435\u0440\u0435\u0447\u043d\u044b\u0435 \u0434\u0440\u0430\u043a\u043e\u043d\u044b",
		"shadow_witch" 		: "\u0421\u0443\u043c\u0435\u0440\u0435\u0447\u043d\u044b\u0435 \u0432\u0435\u0434\u044c\u043c\u044b",
		"shieldguard" 		: "\u0412\u043e\u0438\u0442\u0435\u043b\u0438",
		"skeleton" 			: "\u0421\u043a\u0435\u043b\u0435\u0442\u044b",
		"skeletonarcher" 	: "\u0421\u043a\u0435\u043b\u0435\u0442\u044b-\u043b\u0443\u0447\u043d\u0438\u043a\u0438",
		"skirmesher" 		: "\u041c\u0430\u0441\u0442\u0435\u0440\u0430 \u043a\u043e\u043f\u044c\u044f",
		"smalllizard" 		: "\u0414\u0435\u0442\u0451\u043d\u044b\u0448\u0438 \u044f\u0449\u0435\u0440\u0430",
		"spearwielder" 		: "\u041c\u0435\u0442\u0430\u0442\u0435\u043b\u0438 \u043a\u043e\u043f\u044c\u044f",
		"spectre" 			: "\u041f\u0440\u0438\u0437\u0440\u0430\u043a\u0438",
		"sprite" 			: "\u0414\u0440\u0438\u0430\u0434\u044b",
		"squire" 			: "\u041b\u0430\u0442\u043d\u0438\u043a\u0438",
		"steelgolem" 		: "\u0421\u0442\u0430\u043b\u044c\u043d\u044b\u0435 \u0433\u043e\u043b\u0435\u043c\u044b",
		"stone_gargoyle" 	: "\u041a\u0430\u043c\u0435\u043d\u043d\u044b\u0435 \u0433\u043e\u0440\u0433\u0443\u043b\u044c\u0438",
		"succubus" 			: "\u0421\u0443\u043a\u043a\u0443\u0431\u044b",
		"succubusmis" 		: "\u0414\u0435\u043c\u043e\u043d\u0435\u0441\u0441\u044b",
		"swolf" 			: "\u0421\u0442\u0435\u043f\u043d\u044b\u0435 \u0432\u043e\u043b\u043a\u0438",
		"titan" 			: "\u0422\u0438\u0442\u0430\u043d\u044b",
		"thane" 			: "\u0422\u0430\u043d\u044b",
		"thiefarcher" 		: "\u0412\u043e\u0440\u044b-\u0443\u0431\u0438\u0439\u0446\u044b",
		"thiefmage" 		: "\u0412\u043e\u0440\u044b-\u043a\u043e\u043b\u0434\u0443\u043d\u044b",
		"thiefwarrior" 		: "\u0412\u043e\u0440\u044b-\u0440\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043a\u0438",
		"thunderbird" 		: "\u041f\u0442\u0438\u0446\u044b \u0433\u0440\u043e\u043c\u0430",
		"thunderlord" 		: "\u0413\u0440\u043e\u043c\u043e\u0432\u0435\u0440\u0436\u0446\u044b",
		"treant" 			: "\u042d\u043d\u0442\u044b",
		"unicorn" 			: "\u0415\u0434\u0438\u043d\u043e\u0440\u043e\u0433\u0438",
		"vampire" 			: "\u0412\u0430\u043c\u043f\u0438\u0440\u044b",
		"vampirelord" 		: "\u0412\u044b\u0441\u0448\u0438\u0435 \u0432\u0430\u043c\u043f\u0438\u0440\u044b",
		"wardancer" 		: "\u0422\u0430\u043d\u0446\u0443\u044e\u0449\u0438\u0435 \u0441\u043e \u0441\u043c\u0435\u0440\u0442\u044c\u044e",
		"water" 			: "\u0412\u043e\u0434\u043d\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u043b\u0438",
		"wight" 			: "\u0423\u043c\u0435\u0440\u0442\u0432\u0438\u044f",
		"wolfraider" 		: "\u041d\u0430\u043b\u0435\u0442\u0447\u0438\u043a\u0438 \u043d\u0430 \u0432\u043e\u043b\u043a\u0430\u0445",
		"wolfrider" 		: "\u041d\u0430\u0435\u0437\u0434\u043d\u0438\u043a\u0438 \u043d\u0430 \u0432\u043e\u043b\u043a\u0430\u0445",
		"zombie" 			: "\u0417\u043e\u043c\u0431\u0438"
		};

// ==
checkRecords();
showRecord();
showRecordGroup();
//

function showRecordGroup(){
if (url_cur.indexOf("group_wars.php") == -1) {return;}
var font_arr = document.getElementsByTagName('font');
var last_font = font_arr[font_arr.length - 1].innerHTML;
var shouldNotHidden = (last_font.indexOf("\u0412\u044b") != -1) || (last_font.indexOf("\u0412\u0430\u043c \u043d\u0443\u0436\u043d\u043e") != -1);
 
    var all_tr_Elements;
    all_tr_Elements = document.getElementsByTagName('tr');
    var foundColor = "#aaaaff";
    
    var my_tr, my_td;
    var clan_ok = false;
    var level_ok = false;
    var is_hunt = false;
    var tr_len = all_tr_Elements.length;
    //alert(tr_len);
    for (var i = 0; i < tr_len; i++) {
        clan_ok = false;
        level_ok = false;
        is_hunt = false;
        //fnd = 0;
        my_tr = all_tr_Elements[i];
        if (my_tr.innerHTML.indexOf("<tr>") != -1) {
            continue;
        } // has child TRs
        if (my_tr.childNodes.length != 7) {
            continue;
        } // not in battles table
        if (my_tr.innerHTML.indexOf("vs") == -1) {
            continue;
        } // table header
        if (my_tr.innerHTML.indexOf("vs 1-1") != -1 && my_tr.innerHTML.indexOf("2 vs 1") != -1) { // hunt
            is_hunt = true;
        }
        
        // check for "enter" string
        var b_enter_lnk = 'group_join.php?wrid=';
        if (my_tr.innerHTML.indexOf(b_enter_lnk) != -1) {
            level_ok = true;
        }
        
        //
        if (is_hunt) {
            // == colorize the row
            len = my_tr.childNodes.length;
			if (level_ok) {
				for (z = 0; z < len; z++) {
					my_td = my_tr.childNodes[z];
					my_td.style.backgroundColor = foundColor;
				}
			}
			
			// Comment
			// ____ ______ - _____, __ ____________ ______ ______ ________ __ _______ _______
//            for (var j = 1; j < monsters_en_ru.length; j += 2) {
			my_td = my_tr.childNodes[6];
            for (var j in monsters_en_ru) {
				var indexOf = my_td.innerHTML.indexOf(monsters_en_ru[j]+"(");
                if (indexOf != -1) {
					if (server_ext == "ru") {
my_td.innerHTML += "<tt>" +"<b><font color=\"blue\"> \u0420\u0435\u043a\u043e\u0440\u0434=" + getRecord(j) + "</color></b>"+ "</tt>";
					} else if (server_ext == "com") {
my_td.innerHTML += "<tt>" +"<b><font color=\"blue\"> Record=" + getRecord(j) + "</color></b>"+ "</tt>";//					
					}
					break;
                }
            }
        }
        
		// Comment
		// ______, __ __________ ______ _ _ _______ ___ ______ "________", ________
        if (/*!is_hunt && */!level_ok && !shouldNotHidden) {
            my_tr.style.display = "none";
        }
    }
}

function getRu(nameEn) {
	return monsters_en_ru[nameEn];
}

function getUrlHrec(){ // read needed URL from main menu
    var all_li = document.getElementsByTagName('li');
    for (var k = 0; k < all_li.length; k++) {
        var temp = all_li[k].childNodes[0].href;
        if (temp && temp.indexOf('pl_hunter_stat.php') != -1) {
            return temp;
        }
    }
    return "ERROR - no main menu";
}

function checkRecords(){ // read records table and write to GM vars
    if (url_cur != url_hrec) {
        return;
    }
    
    var mob_str = "army_info.php?name";
    var mob_count = 0;
    var mob_list = "";
    var ts = "";
    
    var trs;
    for (var k = 0; k < all_tables.length; k++) {
        if (all_tables[k].className == "wb") {
            trs = all_tables[k].childNodes[0].childNodes;
            break;
        }
    }
    for (var i = 1; i < trs.length; i++) {
        ts = trs[i].childNodes[0].childNodes[1].href.split("=")[1] + "=";
        ts += trs[i].childNodes[2].childNodes[1].childNodes[0].innerHTML;
        mob_list += ts + "\n";
        mob_count++;
    }
    mob_list = mob_list.substring(0, mob_list.length - 1);
    
    GM_setValue(save_addr, mob_list);
	
	sort_table();
}

function sort_table() {
	var trs;
	var table;
    for (var k = 0; k < all_tables.length; k++) {
        if (all_tables[k].className == "wb") {
			table = all_tables[k];
            break;
        }
    }
	var a = new Array();
	for (var i = 1; i < table.rows.length; i++) {
		a[i-1] = new Array();
		a[i-1][0] = getRu(table.rows[i].childNodes[0].childNodes[1].href.split("=")[1]);
		a[i-1][1] = table.rows[i];
	}
	a.sort(sortIt);
	for (var i = 0; i < a.length; i++) {
		table.appendChild(a[i][1]);	
	}
}

function sortIt(a, b) {
	return ((a[0] == b[0]) ? (0) : ((a[0] > b[0]) ? (1) : (-1)));
}

function showRecord(){ // show pers record in title of  "light signal"
    if (url_cur.indexOf(url_map) == -1) {
        return;
    }
    //
    var mob_list = GM_getValue(save_addr, "none");
    //alert("mob_list = \n"+mob_list);
    var mob_arr = mob_list.split("\n");
    //alert("mob_arr.len = " + mob_arr.length);
    
    var mob_str = "army_info.php?name";
    var cur_mob = "XXX";
    //&nbsp;____ _____»_____°_»__ ________ <a href='army_info.php?name=spectre'>_______·___°____</a> (76 ____.), ___±_µ________________ ____ ___________µ - ______ _______°________  107 _·___»_____° 
    //var mob_pattern = /&nbsp;(.*)<a href="army_info\.php\?name=(.*)">(.*)<\/a>(.*)/;
    var td_len = all_td_Elements.length;
    var my_td;
    var my_td_danger;
    
    for (var k = 0; k < all_tables.length; k++) {
        if (all_tables[k].className == "wbwhite") {
            var link = all_tables[k].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
            var my_td_danger = all_tables[k].childNodes[0].childNodes[0].childNodes[2];
            cur_mob = link.href.split("=")[1];
            
            if (!my_td_danger) {
                return;
            } //no hunt...
            //alert("cur_mob = "+cur_mob);
            var s = "";
            var pers_rec = "xx";
            var mn = "mn";
            var has_rec = false;
            for (var i = 0; i < mob_arr.length; i++) { // find record
                s = mob_arr[i];
                mn = s.split("=")[0];
                pers_rec = s.split("=")[1];
                //if(s.indexOf(cur_mob) != -1){ // wrong result for orc vs enforcer
                if (mn == cur_mob) {
                    has_rec = true;
                    //alert("your record: \n"+ s);
                    //pers_rec = s.split("=")[1];			
                    break;
                }
            }
            pers_rec = has_rec ? pers_rec : "0";
            //alert("pers_rec = "+pers_rec+",  i="+i+",  mn = "+mn);
            
            var img = my_td_danger.childNodes[0].childNodes[0];
            
            // Lichniy record:
            img.title = img.title + " " + pers_rec_str + pers_rec;
            img.alt = img.alt + " " + pers_rec_str + pers_rec;
            
            // ---
            var curmobcount = all_tables[k].getElementsByTagName('object')[0].innerHTML.match(/param=[^\|]+\|(\d+)\|/)[1];
            
            my_td_danger.setAttribute('rowspan', '2');
            my_td_danger.setAttribute('valign', 'middle');
            all_tables[k].childNodes[0].childNodes[1].childNodes[0].setAttribute('colspan', '1');
            
            var newa = document.createElement('a');
            my_td_danger.appendChild(document.createElement('br'));
            my_td_danger.appendChild(document.createElement('br'));
            newa.setAttribute("href", url_hrec);
            
            var newtitle = "Normal";
            // f**cked hwm's rounding...
            if (Number(pers_rec) >= Number(curmobcount)) {
                var pr_m = pers_rec * 1.05, pr_s = pers_rec * 1.3;
                if (Math.floor(pr_m / 3) <= curmobcount && curmobcount <= Math.ceil(pr_s / 3)) {
                    newtitle = "1 / 3";
                }
                else 
                    if (Math.floor(pr_m / 3) * 2 <= curmobcount && curmobcount <= Math.ceil(pr_s / 3) * 2) {
                        newtitle = "2 / 3";
                    }
                    else 
                        if (Math.floor(pr_m / 2) <= curmobcount && Math.ceil(pr_s / 2)) {
                            newtitle = "1 / 2";
                        }
                        else {
                            newtitle = "Unknown";
                        }
            }
            var newimg = document.createElement('img');
            newimg.title = newimg.alt = newtitle;
            newimg.width = img.width;
            newimg.height = img.height;
            newimg.border = img.border;
            newimg.src = img.src.replace(/nl\d+\./, Number(pers_rec) < Number(curmobcount) ? "nl4." : "nl2.");
            newa.appendChild(newimg);
            //my_td_danger.appendChild(newa);
            // ---
        }
    }
}

function getRecord(name){
    var mob_list = GM_getValue(save_addr, "none");
    var mob_arr = mob_list.split("\n");
    
    var td_len = all_td_Elements.length;
    var my_td;
    var my_td_danger;
    
    var s;
    var pers_rec;
    var mn;
    var has_rec = false;
    for (var i = 0; i < mob_arr.length; i++) { // find record
        s = mob_arr[i];
        mn = s.split("=")[0];
        pers_rec = s.split("=")[1];
        if (mn == name) {
            has_rec = true;
            break;
        }
    }
    return has_rec ? pers_rec : "N/A";
}
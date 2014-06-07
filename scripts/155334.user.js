// ==UserScript==
// @name           HWM_Hunt_Exp
// @author         Manten
// @description    HWM mod - Hunter PRO (Style)
// @version        0.9
// @include        http://www.heroeswm.ru/home.php*
// @include        http://www.heroeswm.ru/map.php*
// ==/UserScript==

var koef = 1;
var max_exp = 0;
var prirost_enabled = true;


var mob_exp = {peasant:5,conscript:7,brute:8,archer:15,marksman:19,crossman:19,footman:17,squire:21,vindicator:20,griffon:59,impergriffin:62,priest:101,inquisitor:121,cavalier:232,paladin:262,angel:330,archangel:390,
               skeleton:6,skeletonarcher:10,skmarksman:12,sceletonwar:10,zombie:11,plaguezombie:15,rotzombie:17,ghost:26,spectre:26,vampire:68,vampirelord:70,lich:87,archlich:110,masterlich:138,wight:165,wraith:205,bonedragon:280,spectraldragon:310,
               gremlin:5,mastergremlin:9,saboteurgremlin:9,stone_gargoyle:16,obsgargoyle:26,elgargoly:25,iron_golem:33,steelgolem:54,magneticgolem:57,mage:63,archmage:70,djinn:103,djinn_sultan:110,rakshasa_rani:155,rakshasa_raja:160,colossus:350,titan:400,
               pixel:12,sprite:20,dryad:20,dancer:20,wardancer:33,wdancer:33,elf:38,masterhunter:42,arcaneelf:42,druid:74,druideld:101,unicorn:124,silverunicorn:135,treant:187,ancienent:210,greendragon:350,emeralddragon:400,
               goblin:5,hobgoblin:9,goblinarcher:10,wolfrider:20,wolfraider:31,boarrider:31,orc:29,orcchief:38,ogre:60,ogremagi:74,rocbird:104,thunderbird:115,cyclop:172,cyclopking:182,behemoth:350,ancientbehemoth:390,
               scout:20,assassin:33,maiden:30,fury:49,bloodsister:49,minotaur:39,minotaurguard:56,taskmaster:56,darkrider:65,grimrider:94,briskrider:94,hydra:108,deephydra:115,shadow_witch:157,matriarch:185,shadowdragon:350,blackdragon:400,
               imp:6,familiar:10,vermin:13,horneddemon:14,hornedoverseer:23,jdemon:16,hellhound:33,cerberus:41,hotdog:30,succubus:61,succubusmis:67,hellcharger:136,nightmare:145,hellkon:101,pitfiend:157,pitlord:195,pity:157,devil:245,archdevil:311,archdemon:312,
               defender:7,shieldguard:12,mountaingr:24,spearwielder:11,skirmesher:17,bearrider:24,blackbearrider:36,brawler:27,berserker:42,runepriest:59,runepatriarch:100,thane:131,thunderlord:162,firedragon:255,magmadragon:329,
               enforcer:10,mercarcher:15,mercfootman:25,battlegriffin:45,mercwizard:35,swolf:20,bear:23,smalllizard:13,lizard:25,redlizard:30,thiefmage:35,thiefwarrior:35,thiefarcher:35,water:57,air:59,earth:63,fire:60,
	       spider:15,spiderpois:30,harpy:29,harpyhag:45,beholder:33,evileye:33,kamneed:45,kamnegryz:67,troll:150,blacktroll:180,siren:60,upsiren:70,seamonster:120,upseamonster:140,leviathan:250,upleviathan:300,wfassault:10,
	       mummy:115,pharaoh:153,blackknight:160,deadknight:190,gogachi:13,megogachi:16,efreeti:200,rapukk:200,efreetisultan:250,zhryak:290,eviltiger2010:110,evilcat:45,evilbunny:130,gorynych:50,
	       goblinus:5,trapper:15,fcentaur:13,ncentaur:20,mcentaur:21,warrior:21,mauler:23,warmong:36,shamaness:66,eadaughter:72,sdaughter:75,slayer:70,executioner:83,chieftain:100,wyvern:170,foulwyvern:195,cyclopus:390,untamedcyc:1,bloodeyecyc:500,untamedcyc:700
};

var url_cur = location.href;
var url_home = "heroeswm.ru/home.php";
var url_map = "heroeswm.ru/map.php";
var all_tables = document.getElementsByTagName('table');
var str_pl_lvl = '\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C: ';
var str_min_kills = '\u0414\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F 0.5 \u0443\u043C\u0435\u043D\u0438\u044F \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0443\u0431\u0438\u0442\u044C XXX \u0441\u0443\u0449\u0435\u0441\u0442\u0432';
var str_all_kills = '\u0414\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F 0.5 \u0443\u043C\u0435\u043D\u0438\u044F \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u0431\u0438\u0442\u044C \u0432\u0441\u0435\u0445 \u0441\u0443\u0449\u0435\u0441\u0442\u0432';

getLevel();
showExperience();

function getLevel() {
	if(url_cur.indexOf(url_home) == -1){ return; }
	
	//var pl_level = 0;
	var pl_level;

	for (var k = 0; k < all_tables.length; k++)
	{
                if (!all_tables[k]) continue;
                if (!all_tables[k].childNodes[0]) continue;
                if (!all_tables[k].childNodes[0].childNodes[0]) continue;
                if (!all_tables[k].childNodes[0].childNodes[0].childNodes[0]) continue;
                if (!all_tables[k].childNodes[0].childNodes[0].childNodes[0].innerHTML) continue;

		var str_tbl_info = all_tables[k].childNodes[0].childNodes[0].childNodes[0].innerHTML;

		if (str_tbl_info.indexOf(str_pl_lvl) > 0)
		{
			str_tbl_info = str_tbl_info.substring(str_tbl_info.indexOf(str_pl_lvl) + str_pl_lvl.length);
			pl_level = str_tbl_info.substring(0, str_tbl_info.search(/\D/));
			break;
		}
	}

	GM_setValue("hwm_hunt_exp_pl_level", pl_level);
}


function showExperience() {
	if(url_cur.indexOf(url_map) == -1){ return; }
	var cur_mob = "XXX";
	var my_td_danger;
	var pl_level = GM_getValue("hwm_hunt_exp_pl_level", "none");

	for (var k = 0; k < all_tables.length; k++)
	{
		if (all_tables[k].className == "wbwhite")
		{
			var link = all_tables[k].childNodes[0].childNodes[0].childNodes[1].childNodes[1];
			var str_hunt = all_tables[k].childNodes[0].childNodes[0].childNodes[1].innerHTML;

			mob_count = str_hunt.substring(str_hunt.search(/\(/)+1, str_hunt.search(/\u0448\u0442./)-1);

			var my_td_danger = all_tables[k].childNodes[0].childNodes[0].childNodes[2];
			cur_mob = link.href.split("=")[1];

			if(!my_td_danger){ return; } //no hunt...

			var prirost = Math.round(mob_count*1.3);
			var total_exp = Math.floor(mob_exp[cur_mob] * mob_count * koef / 5);
			total_exp = total_exp > pl_level*500 ? pl_level*500 : total_exp;
			var str_total_exp = total_exp;
			if (total_exp > max_exp && max_exp > 0) { all_tables[k].childNodes[0].style.background = '#FFA07A' ; }
			str_total_exp = '<hr>' + '<center>' + '\u0423\u0431\u0438\u0432 \u0438\u0445, \u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0448\u044C ' + '<b>' + str_total_exp + '</b>' + ' опыта!' + '</center>';

			var min_kills = Math.round(pl_level * 500 * 5 / mob_exp[cur_mob] / koef);
						
all_tables[k].childNodes[0].childNodes[0].childNodes[1].innerHTML = str_hunt + str_total_exp;
			if (prirost_enabled) {
				all_tables[k].childNodes[0].childNodes[0].childNodes[1].innerHTML +=
					'<center>' + '\u0413\u0435\u0440\u043E\u0439, \u0431\u0443\u0434\u044C \u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u0435\u0435, \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0440\u0430\u0437 \u0438\u0445 \u0431\u0443\u0434\u0435\u0442 ' + '<b>' + prirost + '</b>' + '!' + '</center>';}

                        
		}
	}
}
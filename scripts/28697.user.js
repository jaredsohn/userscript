// ==UserScript==
// @name          HWM_Market_Adv_Menu
// @description   HWM mod - Market_Adv_Menu
// @include       http://www.heroeswm.ru/auction.php*
// ==/UserScript==


// ====================================================


//alert("HWM_Market_Adv_Menu");	

var url_cur = location.href ;

// default resource
var def_res = 3; // wood  (ore-2, mercury-3, sulfur-4, crystal-5, gem-6)
if(url_cur == "http://www.heroeswm.ru/auction.php"){
	document.location.href = url_cur + "?cat=res&sort=0&type=" + def_res;
}



// categories with subcats
var cats = {};
cats.helm = {name:"helm"};
	cats.helm.subs = [];
	cats.helm.subs.push(["leather_helm", "\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0448\u043B\u0435\u043C"]);
	cats.helm.subs.push(["wizard_cap", "\u041A\u043E\u043B\u043F\u0430\u043A \u043C\u0430\u0433\u0430"]);
	cats.helm.subs.push(["chain_coif", "\u041A\u043E\u043B\u044C\u0447\u0443\u0436\u043D\u044B\u0439 \u0448\u043B\u0435\u043C"]);
	cats.helm.subs.push(["hunter_roga1", "\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u0448\u043B\u0435\u043C MO"]);
	cats.helm.subs.push(["mif_lhelmet", "\u041B\u0451\u0433\u043A\u0438\u0439 \u043C\u0438\u0444\u0440\u0438\u043B\u043E\u0432\u044B\u0439 \u0448\u043B\u0435\u043C"]);
	cats.helm.subs.push(["steel_helmet", "\u0421\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0448\u043B\u0435\u043C"]);
	cats.helm.subs.push(["gm_hat", "\u0428\u043B\u0435\u043C BO"]);
	cats.helm.subs.push(["mage_helm", "\u0428\u043B\u0435\u043C \u043C\u0430\u0433\u0430"]);
	cats.helm.subs.push(["hunter_helm", "\u0428\u043B\u0435\u043C MO"]);
	cats.helm.subs.push(["knowledge_hat", "\u0428\u043B\u044F\u043F\u0430 \u0437\u043D\u0430\u043D\u0438\u0439"]);
	cats.helm.subs.push(["hunter_hat1", "\u0428\u043B\u044F\u043F\u0430 \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);	

	
cats.necklace = {name:"necklace"};
	cats.necklace.subs = [];
	cats.necklace.subs.push(["gm_amul", "\u0410\u043C\u0443\u043B\u0435\u0442 BO"]);
	cats.necklace.subs.push(["hunter_amulet1", "\u0410\u043C\u0443\u043B\u0435\u0442 MO"]);
	cats.necklace.subs.push(["amulet_of_luck", "\u0410\u043C\u0443\u043B\u0435\u0442 \u0443\u0434\u0430\u0447\u0438"]);
	cats.necklace.subs.push(["warrior_pendant", "\u041A\u0443\u043B\u043E\u043D \u0432\u043E\u0438\u043D\u0430"]);
	cats.necklace.subs.push(["power_pendant", "\u041A\u0443\u043B\u043E\u043D \u043E\u0442\u0447\u0430\u044F\u043D\u0438\u044F"]);
	cats.necklace.subs.push(["hunter_pendant1", "\u041A\u0443\u043B\u043E\u043D \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.necklace.subs.push(["magic_amulet", "\u041C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043C\u0443\u043B\u0435\u0442"]);
	cats.necklace.subs.push(["bravery_medal", "\u041C\u0435\u0434\u0430\u043B\u044C \u043E\u0442\u0432\u0430\u0433\u0438"]);

	

cats.cuirass = {name:"cuirass"};
	cats.cuirass.subs = [];
	cats.cuirass.subs.push(["hauberk", "\u0411\u043E\u0435\u0432\u0430\u044F \u043A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"]);
	cats.cuirass.subs.push(["gm_arm", "\u0411\u0440\u043E\u043D\u044F BO"]);
	cats.cuirass.subs.push(["hunter_armor1", "\u0411\u0440\u043E\u043D\u044F MO"]);
	cats.cuirass.subs.push(["leather_shiled", "\u041A\u043E\u0436\u0430\u043D\u0430\u044F \u0431\u0440\u043E\u043D\u044F"]);
	cats.cuirass.subs.push(["mif_light", "\u041B\u0451\u0433\u043A\u0430\u044F \u043C\u0438\u0444\u0440\u0438\u043B\u043E\u0432\u0430\u044F \u043A\u0438\u0440\u0430\u0441\u0430"]);
	cats.cuirass.subs.push(["mage_armor", "\u041E\u0434\u0435\u044F\u043D\u0438\u0435 \u043C\u0430\u0433\u0430"]);
	cats.cuirass.subs.push(["hunter_jacket1", "\u0420\u0443\u0431\u0430\u0445\u0430 \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.cuirass.subs.push(["ciras", "\u0421\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u0438\u0440\u0430\u0441\u0430"]);
	cats.cuirass.subs.push(["full_plate", "\u0421\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u043E\u0441\u043F\u0435\u0445\u0438"]);

	
cats.cloack = {name:"cloack"};
	cats.cloack.subs = [];
	cats.cloack.subs.push(["gm_protect", "\u041C\u0430\u0441\u043A\u0445\u0430\u043B\u0430\u0442 BO"]);
	cats.cloack.subs.push(["hunter_mask1", "\u041C\u0430\u0441\u043A\u0445\u0430\u043B\u0430\u0442 MO"]);
	cats.cloack.subs.push(["soul_cape", "\u041D\u0430\u043A\u0438\u0434\u043A\u0430 \u0434\u0443\u0445\u043E\u0432"]);
	cats.cloack.subs.push(["powercape", "\u041F\u043B\u0430\u0449 \u043C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0441\u0438\u043B\u044B"]);
	cats.cloack.subs.push(["antiair_cape", "\u0425\u0430\u043B\u0430\u0442 \u0432\u0435\u0442\u0440\u043E\u0432"]);
	cats.cloack.subs.push(["antimagic_cape", "\u0425\u0430\u043B\u0430\u0442 \u043C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0437\u0430\u0449\u0438\u0442\u044B "]);
	cats.cloack.subs.push(["antifire_cape", "\u0425\u0430\u043B\u0430\u0442 \u043F\u043B\u0430\u043C\u0435\u043D\u0438"]);

	
	
cats.weapon = {name:"weapon"};
	cats.weapon.subs = [];
	cats.weapon.subs.push(["staff", "\u0411\u043E\u0435\u0432\u043E\u0439 \u043F\u043E\u0441\u043E\u0445"]);
	cats.weapon.subs.push(["wood_sword", "\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u043C\u0435\u0447"]);
	cats.weapon.subs.push(["long_bow", "\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043B\u0443\u043A"]);
	cats.weapon.subs.push(["gm_kastet", "\u041A\u0430\u0441\u0442\u0435\u0442 BO"]);
	cats.weapon.subs.push(["hunterdagger", "\u041A\u0438\u043D\u0436\u0430\u043B MO"]);
	cats.weapon.subs.push(["dagger", "\u041A\u0438\u043D\u0436\u0430\u043B \u043C\u0435\u0441\u0442\u0438"]);
	cats.weapon.subs.push(["huntersword2", "\u041B\u0451\u0433\u043A\u0430\u044F \u0441\u0430\u0431\u043B\u044F MO"]);
	cats.weapon.subs.push(["gnome_hammer", "\u041B\u0435\u0433\u043A\u0438\u0439 \u0442\u043E\u043F\u043E\u0440\u0438\u043A"]);
	cats.weapon.subs.push(["gm_abow", "\u041B\u0443\u043A BO"]);
	cats.weapon.subs.push(["hunter_bow2", "\u041B\u0443\u043A MO"]);
	cats.weapon.subs.push(["hunter_bow1", "\u041B\u0443\u043A \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.weapon.subs.push(["gm_sword", "\u041C\u0435\u0447 BO"]);
	cats.weapon.subs.push(["power_sword", "\u041C\u0435\u0447 \u0432\u043B\u0430\u0441\u0442\u0438"]);
	cats.weapon.subs.push(["requital_sword", "\u041C\u0435\u0447 \u0432\u043E\u0437\u043C\u0435\u0437\u0434\u0438\u044F"]);
	cats.weapon.subs.push(["broad_sword", "\u041C\u0435\u0447 \u0440\u0430\u0432\u043D\u043E\u0432\u0435\u0441\u0438\u044F"]);
	cats.weapon.subs.push(["def_sword", "\u041C\u0435\u0447 \u0440\u0430\u0441\u043F\u0440\u0430\u0432\u044B"]);
	cats.weapon.subs.push(["mif_staff", "\u041C\u0438\u0444\u0440\u0438\u043B\u043E\u0432\u044B\u0439 \u043F\u043E\u0441\u043E\u0445"]);
	cats.weapon.subs.push(["sor_staff", "\u041F\u043E\u0441\u043E\u0445 \u043C\u043E\u0433\u0443\u0449\u0435\u0441\u0442\u0432\u0430"]);
	cats.weapon.subs.push(["hunterdsword", "\u0421\u0430\u0431\u043B\u044F MO"]);
	cats.weapon.subs.push(["energy_scroll", "\u0421\u0432\u0438\u0442\u043E\u043A \u044D\u043D\u0435\u0440\u0433\u0438\u0438"]);
	cats.weapon.subs.push(["steel_blade", "\u0421\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u043A\u043B\u0438\u043D\u043E\u043A"]);
	cats.weapon.subs.push(["hunter_sword1", "\u0422\u0435\u0441\u0430\u043A \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);



cats.shield = {name:"shield"};
	cats.shield.subs = [];
	cats.shield.subs.push(["large_shield", "\u0411\u0430\u0448\u0435\u043D\u043D\u044B\u0439 \u0449\u0438\u0442"]);
	cats.shield.subs.push(["round_shiled", "\u041A\u0440\u0443\u0433\u043B\u044B\u0439 \u0449\u0438\u0442"]);
	cats.shield.subs.push(["gm_defence", "\u0429\u0438\u0442 BO"]);
	cats.shield.subs.push(["dragon_shield", "\u0429\u0438\u0442 \u0434\u0440\u0430\u043A\u043E\u043D\u043E\u0432"]);
	cats.shield.subs.push(["huntershield2", "\u0429\u0438\u0442 MO"]);
	cats.shield.subs.push(["hunter_shield1", "\u0429\u0438\u0442 \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.shield.subs.push(["defender_shield", "\u0429\u0438\u0442 \u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044F"]);

	
	
cats.boots = {name:"boots"};
	cats.boots.subs = [];
	cats.boots.subs.push(["hunter_boots", "\u041A\u043E\u0436\u0430\u043D\u044B\u0435 \u0441\u0430\u043F\u043E\u0433\u0438"]);
	cats.boots.subs.push(["mif_lboots", "\u041B\u0451\u0433\u043A\u0438\u0435 \u043C\u0438\u0444\u0440\u0438\u043B\u043E\u0432\u044B\u0435 \u0441\u0430\u043F\u043E\u0433\u0438"]);
	cats.boots.subs.push(["hunter_boots3", "\u041B\u0451\u0433\u043A\u0438\u0435 \u0441\u0430\u043F\u043E\u0433\u0438 MO"]);
	cats.boots.subs.push(["gm_spdb", "\u0421\u0430\u043F\u043E\u0433\u0438 BO"]);
	cats.boots.subs.push(["hunter_boots2", "\u0421\u0430\u043F\u043E\u0433\u0438 MO"]);
	cats.boots.subs.push(["hunter_boots1", "\u0421\u0430\u043F\u043E\u0433\u0438 \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.boots.subs.push(["steel_boots", "\u0421\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0430\u043F\u043E\u0433\u0438"]);
	cats.boots.subs.push(["shoe_of_initiative", "\u0422\u0443\u0444\u043B\u0438 \u0441\u0442\u0440\u0435\u043C\u043B\u0435\u043D\u0438\u044F"]);

	
	
cats.ring = {name:"ring"};
	cats.ring.subs = [];
	cats.ring.subs.push(["gm_rring", "\u0417\u0430\u043A\u043E\u043B\u0434\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E BO"]);
	cats.ring.subs.push(["warriorring", "\u041A\u043E\u043B\u044C\u0446\u043E \u0432\u043E\u0438\u043D\u0430"]);
	cats.ring.subs.push(["gm_sring", "\u041A\u043E\u043B\u044C\u0446\u043E \u043B\u043E\u0432\u043A\u043E\u0441\u0442\u0438 BO"]);
	cats.ring.subs.push(["hunter_ring2", "\u041A\u043E\u043B\u044C\u0446\u043E \u043B\u043E\u0432\u043A\u043E\u0441\u0442\u0438 MO"]);
	cats.ring.subs.push(["circ_ring", "\u041A\u043E\u043B\u044C\u0446\u043E \u043E\u0442\u0440\u0435\u0447\u0435\u043D\u0438\u044F"]);
	cats.ring.subs.push(["hunter_ring1", "\u041A\u043E\u043B\u044C\u0446\u043E \u043F\u043E\u043B\u0451\u0442\u0430 MO"]);
	cats.ring.subs.push(["powerring", "\u041A\u043E\u043B\u044C\u0446\u043E \u043F\u0440\u043E\u0440\u043E\u043A\u0430"]);
	cats.ring.subs.push(["doubt_ring", "\u041A\u043E\u043B\u044C\u0446\u043E \u0441\u043E\u043C\u043D\u0435\u043D\u0438\u0439"]);
	cats.ring.subs.push(["rashness_ring", "\u041A\u043E\u043B\u044C\u0446\u043E \u0441\u0442\u0440\u0435\u043C\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438"]);
	cats.ring.subs.push(["darkring", "\u041A\u043E\u043B\u044C\u0446\u043E \u0442\u0435\u043D\u0435\u0439"]);
	cats.ring.subs.push(["verve_ring", "\u041F\u0435\u0440\u0441\u0442\u0435\u043D\u044C \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u044F"]);

	
	
cats.potions = {name:"potions"};
	cats.potions.subs = [];
	cats.potions.subs.push(["reset_tube", "\u0417\u0435\u043B\u044C\u0435 \u0437\u0430\u0431\u0432\u0435\u043D\u0438\u044F"]);
	cats.potions.subs.push(["mana_tube", "\u041F\u0440\u043E\u0431\u0438\u0440\u043A\u0430 \u043C\u0430\u043D\u044B"]);
		
	
cats.elements = {name:"elements"};
	cats.elements.subs = [];
	cats.elements.subs.push(["abrasive", "\u0430\u0431\u0440\u0430\u0437\u0438\u0432"]);
	cats.elements.subs.push(["snake_poison", "\u0437\u043C\u0435\u0438\u043D\u044B\u0439 \u044F\u0434"]);
	cats.elements.subs.push(["tiger_tusk", "\u043A\u043B\u044B\u043A \u0442\u0438\u0433\u0440\u0430"]);
	cats.elements.subs.push(["ice_crystal", "\u043B\u0435\u0434\u044F\u043D\u043E\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B"]);
	cats.elements.subs.push(["moon_stone", "\u043B\u0443\u043D\u043D\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C"]);
	cats.elements.subs.push(["fire_crystal", "\u043E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B"]);
	cats.elements.subs.push(["meteorit", "\u043E\u0441\u043A\u043E\u043B\u043E\u043A \u043C\u0435\u0442\u0435\u043E\u0440\u0438\u0442\u0430"]);
	cats.elements.subs.push(["witch_flower", "\u0446\u0432\u0435\u0442\u043E\u043A \u0432\u0435\u0434\u044C\u043C"]);
	cats.elements.subs.push(["wind_flower", "\u0446\u0432\u0435\u0442\u043E\u043A \u0432\u0435\u0442\u0440\u043E\u0432"]);
	cats.elements.subs.push(["badgrib", "\u044F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0433\u0440\u0438\u0431"]);

	
	
cats.other = {name:"other"};
	cats.other.subs = [];
	cats.other.subs.push(["thief_paper", "\u0412\u043E\u0440\u043E\u0432\u0441\u043A\u043E\u0435 \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435"]);
	cats.other.subs.push(["hunter_gloves1", "\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0430 \u043E\u0445\u043E\u0442\u043D\u0438\u043A\u0430"]);
	cats.other.subs.push(["gm_3arrows", "\u0421\u0442\u0440\u0435\u043B\u044B BO"]);
	cats.other.subs.push(["hunter_arrows1", "\u0421\u0442\u0440\u0435\u043B\u044B MO"]);

	
	
cats.relict = {name:"relict"};
	cats.relict.subs = [];
	cats.relict.subs.push(["thief_neckl", "\u0410\u043C\u0443\u043B\u0435\u0442 \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_arb", "\u0410\u0440\u0431\u0430\u043B\u0435\u0442 \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_goodarmor", "\u0414\u043E\u0441\u043F\u0435\u0445\u0438 \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_ml_dagger", "\u041A\u0438\u043D\u0436\u0430\u043B \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["ring_of_thief", "\u041A\u043E\u043B\u044C\u0446\u043E \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_msk", "\u041C\u0430\u0441\u043A\u0430 \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_cape", "\u041F\u043B\u0430\u0449 \u0432\u043E\u0440\u0430"]);
	cats.relict.subs.push(["thief_fastboots", "\u0421\u0430\u043F\u043E\u0433\u0438 \u0432\u043E\u0440\u0430"]);
	
	

var cat_names = [
	"helm",
	"necklace",
	"cuirass",
	"cloack",
	"weapon",
	"shield",
	"boots",
	"ring",
	"potions",
	"elements",
	"other",
	"relict"	
	];
	
	//alert("cat_names.len = "+cat_names.length);

// ============================================================================================


var all_td = document.getElementsByTagName('td');
	//alert("found " + all_td.length + "  TD elements!");

// ==	
var unique_menu_str = "auction.php?cat=";
var div_bc = '<div id="breadcrumbs"';
var fast_links_str = 'class="pi"';


document.addEventListener('click', function(event){ catchClick(event);}, true  );

makeAdvMenu();


function makeAdvMenu(){
	var td_len = all_td.length;
	var my_td;
	for (var i = 0; i < td_len; i++) {
		my_td = all_td[i];
		if(my_td.innerHTML.indexOf("<td")!=-1){continue;} 
		if(my_td.innerHTML.indexOf(div_bc)!=-1){continue;} 
		if(my_td.innerHTML.indexOf(fast_links_str)!=-1){continue;} 
		//		
		if(my_td.innerHTML.indexOf(unique_menu_str) != -1 ){	
			//alert("my_td.innerHTML = "+my_td.innerHTML);
			my_td.innerHTML = convert2menu(my_td.innerHTML);	
			
			break;
		} 	
	}
}



function convert2menu(s){
	//alert("convert2menu,   s = \n"+s);
	//
	var cur_cat = getUrlParam("cat");
		//alert("cur_cat ="+cur_cat );
	var res = "";
	res += "<style>div.m_menu_sc{margin-left:10px; display:none;} a.m_menu_sc{font-size:9px; line-height:1.5;}</style>"; 
	res += s;	
	var ts;
	var p_cat; // pattern
	var my_div;
	var subcats;
	var sc_id;
	var sc_name;
	var j=0;
	for(var i=0; i<cat_names.length; i++){
		ts = cat_names[i];
		if(ts==cur_cat){ continue; } // skip current category
		//
		//p_cat = new RegExp("(auction\\.php\\?cat="+ ts +"&amp;sort=0\">[^<]+<\\/a>)");
		p_cat = new RegExp("(auction\\.php\\?cat="+ ts +"&amp;sort=\\d+\">[^<]+<\\/a>)");
		//
		my_div = '<a href="javascript:void(0);" id="openCat_' +ts+ '">(+)</a>'+
		'<div id="'+ts+'_sub" class="m_menu_sc">';
		
		subcats = cats[ts].subs;
		for(j=0; j<subcats.length; j++){
			sc_id = subcats[j][0];
			sc_name = subcats[j][1];
			my_div += '<a href="http://www.heroeswm.ru/auction.php?cat='+ ts +'&sort=0&art_type='+sc_id+'"  class="m_menu_sc">';
			my_div += sc_name;
			my_div += '</a><br>';
		}
		//		
		my_div += '</div>';
		//
			//alert("p_cat found = "+ s.search(p_cat) );
		res = res.replace(p_cat, "$1"+my_div);
			//alert("res = \n"+res);
	}
		
		//alert("final res = \n"+res);
	//return s;
	return res;
}


function catchClick(e){
	if(e.target.id.indexOf("openCat_") == -1){ return;}
	//
	//alert("id = "+e.target.id);
	
	var cat = e.target.id.substr(8);
		//alert("cat = "+cat);
	var cat_div = document.getElementById( cat+"_sub" );
		//alert("cat_div = "+cat_div+",   cat_div.style.display = "+cat_div.style.display);
	if(!cat_div.style.display || cat_div.style.display=="none"){
		cat_div.style.display = "block";
	}else if (cat_div.style.display=="block"){
		cat_div.style.display = "none";	
	}


}


function getUrlParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


// =====================================



// ==UserScript==
// @name           hwm_sklad_repair_hide
// @namespace      Demin
// @description    HWM mod - Udalenie ssylok na remont GFBK na sklade klana (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        1.3
// @include        http://*heroeswm.ru/sklad_info.php*
// @include        http://178.248.235.15/sklad_info.php*
// @include        http://209.200.152.144/sklad_info.php*
// @include        http://*lordswm.com/sklad_info.php*
// @include        http://demin.*/sklad_info.php*
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '1.3';

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


var arts_array = {'wood_sword':[], 'gnome_hammer':[], 'steel_blade':[], 'dagger':[], 'def_sword':[], 'shortbow':[], 'requital_sword':[], 'staff':[], 'broad_sword':[], 'long_bow':[], 'power_sword':[], 'sor_staff':[], 'mstaff8':[], 'ssword8':[], 'mif_staff':[], 'mif_sword':[], 'mstaff10':[], 'ssword10':[], 'energy_scroll':[], 'composite_bow':[], 'mm_staff':[], 'mm_sword':[], 'mstaff13':[], 'ssword13':[], 'bow14':[], 'ffstaff15':[], 'firsword15':[], 'smstaff16':[], 'ssword16':[], 'bow17':[], 'staff18':[], 'scroll18':[], 'sword18':[], 'leatherhat':[], 'leather_helm':[], 'chain_coif':[], 'wizard_cap':[], 'knowledge_hat':[], 'steel_helmet':[], 'mage_helm':[], 'shelm8':[], 'mif_lhelmet':[], 'mif_hhelmet':[], 'shelm12':[], 'mhelmetzh13':[], 'zxhelmet13':[], 'myhelmet15':[], 'xymhelmet15':[], 'shelm16':[], 'helmet17':[], 'mhelmet17':[], 'bravery_medal':[], 'amulet_of_luck':[], 'power_pendant':[], 'samul8':[], 'warrior_pendant':[], 'magic_amulet':[], 'mmzamulet13':[], 'wzzamulet13':[], 'smamul14':[], 'samul14':[], 'bafamulet15':[], 'mmzamulet16':[], 'wzzamulet16':[], 'samul17':[], 'smamul17':[], 'mamulet19':[], 'amulet19':[], 'leather_shiled':[], 'leatherplate':[], 'hauberk':[], 'ciras':[], 'mif_light':[], 'mage_armor':[], 'sarmor9':[], 'full_plate':[], 'wiz_robe':[], 'miff_plate':[], 'sarmor13':[], 'robewz15':[], 'armor15':[], 'sarmor16':[], 'marmor17':[], 'armor17':[], 'scoutcloack':[], 'soul_cape':[], 'antiair_cape':[], 'scloack8':[], 'powercape':[], 'antimagic_cape':[], 'wiz_cape':[], 'cloackwz15':[], 'scloack16':[], 'cloack17':[], 'round_shiled':[], 's_shield':[], 'defender_shield':[], 'sshield5':[], 'dragon_shield':[], 'large_shield':[], 'sshield11':[], 'shield13':[], 'sshield14':[], 'shield16':[], 'sshield17':[], 'shield19':[], 'leatherboots':[], 'hunter_boots':[], 'boots2':[], 'shoe_of_initiative':[], 'steel_boots':[], 'mif_lboots':[], 'sboots9':[], 'mif_hboots':[], 'sboots12':[], 'wiz_boots':[], 'boots13':[], 'mboots14':[], 'boots15':[], 'sboots16':[], 'boots17':[], 'mboots17':[], 'i_ring':[], 'sring4':[], 'verve_ring':[], 'doubt_ring':[], 'rashness_ring':[], 'circ_ring':[], 'powerring':[], 'smring10':[], 'sring10':[], 'warriorring':[], 'darkring':[], 'magring13':[], 'warring13':[], 'bring14':[], 'mmmring16':[], 'wwwring16':[], 'smring17':[], 'sring17':[], 'ring19':[], 'mring19':[], 'flowers1':[], 'flowers2':[], 'venok':[], 'defender_dagger':[], 'flower_heart':[], 'flowers3':[], 'half_heart_m':[], 'half_heart_w':[], 'bril_pendant':[], 'bril_ring':[], 'd_spray':[], 'flowers4':[], 'flowers5':[], 'protazan':[], 'wboots':[], 'roses':[], 'goldciras':[], 'warmor':[], 'whelmet':[], 'shpaga':[], 'bfly':[], 'koltsou':[]}

// vse arty na remont
var repair_link = document.querySelectorAll("a[href^='sklad_info.php?'][href*='repair_id=']");
var regexp_repair_id = /repair_id=(\d+)/;
var regexp_art_id = /art_info\.php\?id=(\w+)/;

if (url.match('lordswm'))
{
	var message_text = 'Link deleted';
} else {
	var message_text = '\u0421\u0441\u044b\u043b\u043a\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0430';
}

for ( var i=repair_link.length; i--; )
{
	// poluchit' uid arta iz ssylki
	var art_repair_id = regexp_repair_id.exec(repair_link[i])[1];

	// poisk ssylok na kraft arty po uid (esli ssylok net - art bez krafta)
	var search_uid = document.querySelector("a[href^='art_info.php?'][href*='uid="+art_repair_id+"']");

	var repair_link_parent = repair_link[i].parentNode;
	while ( repair_link_parent.tagName.toLowerCase()!='table' ) { repair_link_parent = repair_link_parent.parentNode; }

	// poisk id arta
	var art_id = regexp_art_id.exec(repair_link_parent.innerHTML);

	//alert(repair_link[i]+"\n"+art_repair_id+"\n"+search_uid+"\n"+art_id);

	if ( !search_uid && art_id && arts_array[art_id[1]] )
	{
		// zamena ssylki na nadpis'
		var add_message = document.createElement('font');
		add_message.color = "red";
		add_message.innerHTML = message_text;

		repair_link[i].parentNode.replaceChild(add_message, repair_link[i]);
	}
}

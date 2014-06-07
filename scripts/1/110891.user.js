// ==UserScript==
// @id             istacks
// @name           Item Categoriser
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Neatly sorts items in your inventory into categories.
// @version        1.3
// @include        http://valenth.com/inventory.php
// @include        http://www.valenth.com/inventory.php
// ==/UserScript==


//GM_addStyle('.inventory_row { height: 160px; }');
GM_addStyle('.inventory_row select { width: 80% !important; margin-top: 9px !important; display: block; margin-left: auto !important; margin-right: auto !important; }');
GM_addStyle('.inventory_row select + * { margin-top: 6px !important; }');
GM_addStyle('.inventory_row img { display: block; margin-left: auto !important; margin-right: auto !important; }');
GM_addStyle('.inventory_row br { display: none; }');
GM_addStyle('.inventory_row input { width: 53% !important; display: inline !important; margin-left: 6px !important; }');
GM_addStyle('.inventory_row input[type="submit"] { width: 68% !important; display: block !important; margin-left: auto !important; margin-right: auto !important; }');
GM_addStyle('.inventory_row input[type="hidden"] { display: none !important; }');
GM_addStyle('#content_section h1 { clear: both; padding-top: 20px; padding-bottom: 20px; margin-left: 10px; }');
GM_addStyle('#content_section h1 + div { padding-left: 5%; }');


Usable = /magic_alchstone|magic_identitydistortioncollar|special_elevelixir|magic_mortalitydew|magic_essenceofmars|magic_essenceofvenus|special_token_gl|special_token_shiny/;
Apothecary = /trinket_brocadeleupakdoll|trinket_varaniusdoll|trinket_toy_chimaera|trinket_toy_leupak|trinket_toy_prrb|trinket_toy_varanius|trinket_coiltalisman|trinket_muddy_alligator_figurine|trinket_whispering_bat_figurine|trinket_singingeaglefigurine|trinket_ancient_coin|trinket_crystallized_scale|trinket_sealed_miraplasm/;
Faction = /trinket_ancientphoenixfetish|trinket_elegantpinion|trinket_clockworkjournal|trinket_dreamshard|trinket_firestarters_phoenixquill|trinket_court_varanius|trinket_somnambulist_specimen|trinket_silentrose_dreamshard/;
ContestEvent = /trinket_clockworkgoggles|trinket_gremlin_white|trinket_gremlin_green|trinket_gremlin_purple|trinket_colorfulpygmy_teal|trinket_colorfulpygmy_green|trinket_colorfulpygmy_orange|trinket_colorfulpygmy_red|trinket_colorfulpygmy_silver|trinket_ee_zeppelin|trinket_ee_veilglobe|trinket_ee_vigilant/;
Seasonal = /trinket_frozenerosionbauble|trinket_heart-warmederosionbauble|trinket_summerlei|trinket_twinsunssigil|trinket_1stannicake|trinket_birthday_chimaera_doll|trinket_birthday_leupak_doll|trinket_autumn_leaf|trinket_skull_leupak|trinket_tinybrownpipistrelle|trinket_tinyblackpipistrelle|trinket_golden_scale|trinket_shedantler|trinket_voluxi_tail|trinket_lapun_foot|trinket_apologeticleupak/;
DB2009 = /trinket_reskinnedvara_1|trinket_reskinnedvara_2|trinket_reskinnedvara_3|trinket_reskinnedvara_4|trinket_reskinnedvara_5|trinket_prrbles|trinket_goldenmonocle|trinket_fancyrosebrooch|trinket_leupoil|trinket_monotonepill|trinket_colorfulpill|trinket_colorfulpill_2|trinket_colorfulpill_3|trinket_ladysscarf|trinket_gentlemanshandkerchief|trinket_goldenballoon|trinket_whiteballoon|trinket_tinymechaprrb_s|trinket_tinymechaprrb_g|trinket_contentpygmy|trinket_greedypygmy/;
DB2010 = /trinket_wallflowerpygmy|trinket_kelanmask|trinket_preservedworm_white|trinket_preservedworm_red|trinket_preservedworm_purple|trinket_preservedworm_blue|trinket_preservedworm_green|trinket_preservedworm_teal|trinket_preservedworm_black/;
DB2011 = /trinket_bubblingelixir|trinket_bubblingelixir_2|trinket_bubblingelixir_3|trinket_bubblingelixir_4|trinket_curiousslime|trinket_curiousslime_2|trinket_eeriedreamwaker|trinket_overstuffeddreamwaker|trinket_clammyoneroi|trinket_wierdbatillion|trinket_gildedpygmy|trinket_bloodvial|trinket_thirdeyering|trinket_unrulypilisaur/;
DB2012 = /db_2012_drug_curious|db_2012_drug_mysterious|db_2012_drug_odd|db_2012_drug_pink|db_2012_pone_blu|db_2012_pone_orng|db_2012_pone_pnk|db_2012_pone_prpl|db_2012_pone_red|db_2012_pone_ylw|db_2012_potion_chlorophan|db_2012_potion_nebulous|db_2012_potion_silent|db_2012_potion_sweet|db_2012_potion_tart|trinket_miraplasmic_slime|trinket_incandescent_slime|trinket_abyssal_slime|trinket_putrescent_slime|trinket_adiposal_slime|trinket_opalescent_slime|trinket_dreamwaker_leupak_punchball|trinket_grumpy_leupak_punchball|trinket_gothic_leupak_punchball|trinket_eerie_seeing_eyebot|trinket_handful_of_candy_c-oh|trinket_eldritch_horror_doll|trinket_floral_horror_doll|trinket_prototype_vara_blue|trinket_prototype_vara_chimri|trinket_prototype_vara_green|trinket_prototype_vara_leupak|trinket_prototype_vara_nightmare|trinket_stuffed_prrb_courtesans|trinket_stuffed_prrb_dreamwakers|trinket_stuffed_prrb_golden|trinket_stuffed_prrb_pink|trinket_tiny_pumpkin_bat|trinket_tiny_shadow_bat|trinket_tiny_spectral_bat|trinket_vial_doll|trinket_vial_doll_alt1|trinket_vial_doll_alt2|trinket_medi_doll|trinket_medi_doll_alt1|trinket_medi_doll_alt2|trinket_plague_doll|trinket_plague_doll_alt1|trinket_plague_doll_alt2/;

Items = document.getElementsByClassName('inventory_row');
z = Items.length;
ItemNames = new Array();
ItemURLs = new Array();
//ItemNumbers = new Array();
//deleteus = new Array();
FoundYa = false;
ItemName = '';
ItemURL = '';


for (i = 0; i < z; i++) {
	ItemName = Items[i].childNodes[1].childNodes[3].textContent.replace(/([\s\n]){2}/g,'');
	ItemURL = Items[i].childNodes[1].childNodes[1].src;
	FoundYa = false;
	
	for (y in ItemNames) {
		if (ItemNames[y] == ItemName && ItemURLs[y] == ItemURL) {
			FoundYa = y;
		}
	}
	
	if (FoundYa == false) {
		ItemNames.push(ItemName);
		ItemURLs.push(ItemURL);
		//ItemNumbers.push(1);
	}
	
	/*else {
		ItemNumbers[FoundYa] += 1;
		deleteus.push(Items[i]);
	}*/
} 



//q = deleteus.length;

/*for (i = 0; i < q; i++) {
	deleteus[i].parentNode.removeChild(deleteus[i]);
}*/


/*Items = document.getElementsByClassName('inventory_row');
CountEm = '';

for (i in ItemNames) {
	if (ItemNumbers[i] > 1) {
		CountEm = document.createElement('span');
		CountEm.innerHTML = ' (&times;' + ItemNumbers[i] + ')';
		
		Items[i].childNodes[1].insertBefore(CountEm,Items[i].childNodes[1].childNodes[3].nextSibling);
	}
}*/


IRContent = Items[0].parentNode;

UsableHeader = document.createElement('h1');
UsableHeader.innerHTML = 'Usable Items';
IRContent.insertBefore(UsableHeader, Items[0]);
UsablePanel = document.createElement('div');
IRContent.insertBefore(UsablePanel, Items[0]);

ApothecaryHeader = document.createElement('h1');
ApothecaryHeader.innerHTML = 'Basic Trinkets';
IRContent.insertBefore(ApothecaryHeader, Items[0]);
ApothecaryPanel = document.createElement('div');
IRContent.insertBefore(ApothecaryPanel, Items[0]);

FactionHeader = document.createElement('h1');
FactionHeader.innerHTML = 'Faction Trinkets';
IRContent.insertBefore(FactionHeader, Items[0]);
FactionPanel = document.createElement('div');
IRContent.insertBefore(FactionPanel, Items[0]);

SeasonalHeader = document.createElement('h1');
SeasonalHeader.innerHTML = 'Seasonal Trinkets';
IRContent.insertBefore(SeasonalHeader, Items[0]);
SeasonalPanel = document.createElement('div');
IRContent.insertBefore(SeasonalPanel, Items[0]);

ContestHeader = document.createElement('h1');
ContestHeader.innerHTML = 'Contest and Event Trinkets';
IRContent.insertBefore(ContestHeader, Items[0]);
ContestPanel = document.createElement('div');
IRContent.insertBefore(ContestPanel, Items[0]);

DBHeader2009 = document.createElement('h1');
DBHeader2009.innerHTML = 'Doctor\'s Ball 2009 Trinkets';
IRContent.insertBefore(DBHeader2009, Items[0]);
DBPanel2009 = document.createElement('div');
IRContent.insertBefore(DBPanel2009, Items[0]);

DBHeader2010 = document.createElement('h1');
DBHeader2010.innerHTML = 'Doctor\'s Ball 2010 Trinkets';
IRContent.insertBefore(DBHeader2010, Items[0]);
DBPanel2010 = document.createElement('div');
IRContent.insertBefore(DBPanel2010, Items[0]);

DBHeader2011 = document.createElement('h1');
DBHeader2011.innerHTML = 'Doctor\'s Ball 2011 Trinkets';
IRContent.insertBefore(DBHeader2011, Items[0]);
DBPanel2011 = document.createElement('div');
IRContent.insertBefore(DBPanel2011, Items[0]);

DBHeader2012 = document.createElement('h1');
DBHeader2012.innerHTML = 'Doctor\'s Ball 2012 Trinkets';
IRContent.insertBefore(DBHeader2012, Items[0]);
DBPanel2012 = document.createElement('div');
IRContent.insertBefore(DBPanel2012, Items[0]);

UnknownHeader = document.createElement('h1');
UnknownHeader.innerHTML = 'Unknown';
IRContent.insertBefore(UnknownHeader, Items[0]);
UnknownPanel = document.createElement('div');
IRContent.insertBefore(UnknownPanel, Items[0]);


q = Items.length;

for (i = 0; i < q; i++) {
	ItemURL = Items[i].childNodes[1].childNodes[1].src;
	
	if (Usable.test(ItemURL)) {
		UsablePanel.appendChild(Items[i]);
	}
	
	else if (Apothecary.test(ItemURL)) {
		ApothecaryPanel.appendChild(Items[i]);
	}
	
	else if (Faction.test(ItemURL)) {
		FactionPanel.appendChild(Items[i]);
	}
	
	else if (ContestEvent.test(ItemURL)) {
		ContestPanel.appendChild(Items[i]);
	}
	
	else if (Seasonal.test(ItemURL)) {
		SeasonalPanel.appendChild(Items[i]);
	}
	
	else if (DB2009.test(ItemURL)) {
		DBPanel2009.appendChild(Items[i]);
	}
	
	else if (DB2010.test(ItemURL)) {
		DBPanel2010.appendChild(Items[i]);
	}

	else if (DB2011.test(ItemURL)) {
		DBPanel2011.appendChild(Items[i]);
	}
	
	else if (DB2012.test(ItemURL)) {
		DBPanel2012.appendChild(Items[i]);
	}
	
	else {
		UnknownPanel.appendChild(Items[i]);
	}
} 


if (UsablePanel.childNodes[0] == undefined) {
	UsableHeader.parentNode.removeChild(UsableHeader);
	UsablePanel.parentNode.removeChild(UsablePanel);
}

if (ApothecaryPanel.childNodes[0] == undefined) {
	ApothecaryHeader.parentNode.removeChild(ApothecaryHeader);
	ApothecaryPanel.parentNode.removeChild(ApothecaryPanel);
}

if (FactionPanel.childNodes[0] == undefined) {
	FactionHeader.parentNode.removeChild(FactionHeader);
	FactionPanel.parentNode.removeChild(FactionPanel);
}

if (ContestPanel.childNodes[0] == undefined) {
	ContestHeader.parentNode.removeChild(ContestHeader);
	ContestPanel.parentNode.removeChild(ContestPanel);
}

if (SeasonalPanel.childNodes[0] == undefined) {
	SeasonalHeader.parentNode.removeChild(SeasonalHeader);
	SeasonalPanel.parentNode.removeChild(SeasonalPanel);
}

if (DBPanel2009.childNodes[0] == undefined) {
	DBHeader2009.parentNode.removeChild(DBHeader2009);
	DBPanel2009.parentNode.removeChild(DBPanel2009);
}

if (DBPanel2010.childNodes[0] == undefined) {
	DBHeader2010.parentNode.removeChild(DBHeader2010);
	DBPanel2010.parentNode.removeChild(DBPanel2010);
}

if (DBPanel2011.childNodes[0] == undefined) {
	DBHeader2011.parentNode.removeChild(DBHeader2011);
	DBPanel2011.parentNode.removeChild(DBPanel2011);
}

if (DBPanel2012.childNodes[0] == undefined) {
	DBHeader2012.parentNode.removeChild(DBHeader2012);
	DBPanel2012.parentNode.removeChild(DBPanel2012);
}

if (UnknownPanel.childNodes[0] == undefined) {
	UnknownHeader.parentNode.removeChild(UnknownHeader);
	UnknownPanel.parentNode.removeChild(UnknownPanel);
}

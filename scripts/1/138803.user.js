// ==UserScript==
// @name           EyeCandy cRPG Strategus news page
// @description    Improves Strategus news page.
// @namespace      crpg
// @match          http://strategus.c-rpg.net/news.php*
// @icon           http://s3.amazonaws.com/uso_ss/icon/138803/large.png?1342811471
// @version        0.03 
// @updateURL      https://userscripts.org/scripts/source/138803.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138803.user.js
// @resource       styles http://eyecandy.h19.ru/eyecandy_newspage.css
// ==/UserScript==
var items = new Array();
var itemsToBuy = new Array();
var itemsToSell = new Array();
var myItems = new Array();
var fiefItems = new Array();
var factionMembers = new Array();

var itemTypes = ["one_handed", "two_handed", "polearm", "cav_pole", "shield", "body_armor", "head_armor", "foot_armor", "hand_armor", "throwing", "bow", "crossbow", "horse", "bolts", "arrows", "siege", "other"];	
var itemTypeTitles = ["One handed","Two handed","Polearms", "Cav Polearms", "Shields", "Body armor", "Head armor", "Foot armor", "Hand armor", "Throwing", "Bows", "Crossbows", "Horses", "Bolts", "Arrows", "Siege", "Misc"];

 items[5383] = { name:"Weimar Helmet",type:"head_armor", img:"itm_helmet_weimar.png"}
 items[5480] = { name:"Turkish Shoes",type:"foot_armor", img:"itm_turkish_shoes.png"}
 items[5493] = { name:"Fluted Varangian Helmet",type:"head_armor", img:"itm_eng_varangian_helmet.png"}
 items[5490] = { name:"Clibanarius Helmet",type:"head_armor", img:"itm_clibanarius_helmet.png"}
 items[5729] = { name:"Red Hose with Kneecops",type:"foot_armor", img:"itm_hose_kneecops_red.png"}
 items[5507] = { name:"Palace Guard Armor",type:"body_armor", img:"itm_palace_guard.png"}
 items[527] = { name:"Plated Charger",type:"horse", img:"itm_charger_plate.png"}
 items[526] = { name:"Mamluk Horse",type:"horse", img:"itm_warhorse_sarranid.png"}
 items[9] = { name:"Charger",type:"horse", img:"itm_charger.png"}
 items[525] = { name:"Cataphract Horse",type:"horse", img:"itm_warhorse_steppe.png"}
 items[538] = { name:"Construction Site",type:"siege", img:"itm_construction_site.png"}
 items[524] = { name:"Large Warhorse",type:"horse", img:"itm_warhorse_chain.png"}
 items[469] = { name:"Black Armor",type:"body_armor", img:"itm_black_armor.png"}
 items[8] = { name:"War Horse",type:"horse", img:"itm_warhorse.png"}
 items[479] = { name:"Gothic Plate with Bevor",type:"body_armor", img:"itm_gothic_plate_bevor.png"}
 items[470] = { name:"Milanese Plate",type:"body_armor", img:"itm_milanese_plate.png"}
 items[380] = { name:"Heavy Plate Armor",type:"body_armor", img:"itm_sarranid_dress_b.png"}
 items[471] = { name:"Gothic Plate",type:"body_armor", img:"itm_gothic_plate.png"}
 items[545] = { name:"Churburg Cuirass",type:"body_armor", img:"itm_churburg_13_mail.png"}
 items[541] = { name:"Red Churburg Cuirass",type:"body_armor", img:"itm_churburg_13_brass.png"}
 items[7] = { name:"Destrier",type:"horse", img:"itm_hunter.png"}
 items[547] = { name:"Blue Churburg Cuirass",type:"body_armor", img:"itm_churburg_13.png"}
 items[468] = { name:"Plate Armor",type:"body_armor", img:"itm_plate_armor.png"}
 items[6] = { name:"Arabian Warhorse",type:"horse", img:"itm_arabian_horse_b.png"}
 items[5] = { name:"Courser",type:"horse", img:"itm_courser.png"}
 items[480] = { name:"Heraldic Transitional Armour",type:"body_armor", img:"itm_heraldic_transitional_armour.png"}
 items[478] = { name:"Blue Transitional Armor with Surcoat",type:"body_armor", img:"itm_early_transitional_blue.png"}
 items[477] = { name:"Orange Transitional Armor with Surcoat",type:"body_armor", img:"itm_early_transitional_orange.png"}
 items[476] = { name:"White Transitional Armor with Surcoat",type:"body_armor", img:"itm_early_transitional_white.png"}
 items[15] = { name:"Arbalest",type:"crossbow", img:"itm_sniper_crossbow.png"}
 items[160] = { name:"Flamberge",type:"two_handed", img:"itm_flamberge.png"}
 items[4721] = { name:"Druzhina Elite Lamellar Armor",type:"body_armor", img:"itm_drz_elite_lamellar_armor.png"}
 items[475] = { name:"Grey Corrazina Armor",type:"body_armor", img:"itm_corrazina_grey.png"}
 items[474] = { name:"Green Corrazina Armor",type:"body_armor", img:"itm_corrazina_green.png"}
 items[473] = { name:"Red Corrazina Armor",type:"body_armor", img:"itm_corrazina_red.png"}
 items[467] = { name:"Khergit Guard Armor",type:"body_armor", img:"itm_khergit_guard_armor.png"}
 items[466] = { name:"Sarranid Elite Armor",type:"body_armor", img:"itm_sarranid_elite_armor.png"}
 items[465] = { name:"Vaegir Elite Armor",type:"body_armor", img:"itm_vaegir_elite_armor.png"}
 items[464] = { name:"Khergit Elite Armor",type:"body_armor", img:"itm_khergit_elite_armor.png"}
 items[533] = { name:"Heavy Gauntlets",type:"hand_armor", img:"itm_gauntlets_heavy.png"}
 items[3972] = { name:"Heavy Strange Armor",type:"body_armor", img:"itm_samurai_armor_black.png"}
 items[521] = { name:"Danish Greatsword",type:"two_handed", img:"itm_Faradon_twohanded2.png"}
 items[436] = { name:"Mail and Plate",type:"body_armor", img:"itm_mail_and_plate.png"}
 items[530] = { name:"Elegant Poleaxe",type:"polearm", img:"itm_elegant_poleaxe.png"}
 items[522] = { name:"German Greatsword",type:"two_handed", img:"itm_Faradon_twohanded1.png"}
 items[532] = { name:"German Poleaxe",type:"polearm", img:"itm_german_poleaxe.png"}
 items[4953] = { name:"Blue Coat of Plates",type:"body_armor", img:"itm_coat_of_plates_blue.png"}
 items[463] = { name:"Red Coat of Plates",type:"body_armor", img:"itm_coat_of_plates_red.png"}
 items[462] = { name:"Black Coat of Plates",type:"body_armor", img:"itm_coat_of_plates.png"}
 items[4954] = { name:"Green Coat of Plates",type:"body_armor", img:"itm_coat_of_plates_green.png"}
 items[531] = { name:"Poleaxe",type:"polearm", img:"itm_poleaxe_a.png"}
 items[14] = { name:"Heavy Crossbow",type:"crossbow", img:"itm_heavy_crossbow.png"}
 items[159] = { name:"Nodachi",type:"two_handed", img:"itm_strange_great_sword.png"}
 items[128] = { name:"Great Long Bardiche",type:"polearm", img:"itm_great_long_bardiche.png"}
 items[4956] = { name:"Rus Scale Armor",type:"body_armor", img:"itm_rus_scale.png"}
 items[157] = { name:"Sword of War",type:"two_handed", img:"itm_sword_of_war.png"}
 items[3320] = { name:"Highland Claymore",type:"two_handed", img:"itm_Scottish_Claymore.png"}
 items[126] = { name:"Great Long Axe",type:"polearm", img:"itm_long_axe_c.png"}
 items[156] = { name:"Great Sword",type:"two_handed", img:"itm_sword_two_handed_a.png"}
 items[4] = { name:"Desert Horse",type:"horse", img:"itm_arabian_horse_a.png"}
 items[453] = { name:"Lamellar Armor",type:"body_armor", img:"itm_lamellar_armor.png"}
 items[4720] = { name:"Druzhina Lamellar Armor",type:"body_armor", img:"itm_drz_lamellar_armor.png"}
 items[4955] = { name:"Green Rus Lamellar Cuirass",type:"body_armor", img:"itm_long_mail_coat.png"}
 items[406] = { name:"Brown Rus Lamellar Cuirass",type:"body_armor", img:"itm_long_mail_coat.png"}
 items[155] = { name:"Heavy Great Sword",type:"two_handed", img:"itm_great_sword.png"}
 items[435] = { name:"Light Mail and Plate",type:"body_armor", img:"itm_light_mail_and_plate.png"}
 items[20] = { name:"Long Bow",type:"bow", img:"itm_long_bow.png"}
 items[452] = { name:"Brigandine",type:"body_armor", img:"itm_brigandine_red.png"}
 items[254] = { name:"Plate Mittens",type:"hand_armor", img:"itm_plate_mittens.png"}
 items[97] = { name:"Bec de Corbin",type:"polearm", img:"itm_bec_de_corbin_a.png"}
 items[115] = { name:"Glaive",type:"polearm", img:"itm_glaive.png"}
 items[3] = { name:"Steppe Horse",type:"horse", img:"itm_steppe_horse.png"}
 items[13] = { name:"Crossbow",type:"crossbow", img:"itm_crossbow.png"}
 items[3191] = { name:"Long Espada Eslavona",type:"one_handed", img:"itm_espada_eslavona_b.png"}
 items[88] = { name:"Steel Shield",type:"shield", img:"itm_steel_shield.png"}
 items[10] = { name:"Palfrey",type:"horse", img:"itm_palfrey.png"}
 items[457] = { name:"Cuir Bouilli over Mail",type:"body_armor", img:"itm_cuir_bouilli.png"}
 items[22] = { name:"Rus Bow",type:"bow", img:"itm_war_bow.png"}
 items[124] = { name:"Long War Axe",type:"polearm", img:"itm_long_axe_b.png"}
 items[4692] = { name:"English Bill",type:"polearm", img:"itm_english_bill.png"}
 items[523] = { name:"Warhammer",type:"one_handed", img:"itm_Faradon_warhammer.png"}
 items[141] = { name:"Great Maul",type:"two_handed", img:"itm_warhammer.png"}
 items[492] = { name:"Armet",type:"head_armor", img:"itm_flemish_armet.png"}
 items[455] = { name:"Banded Armor",type:"body_armor", img:"itm_banded_armor.png"}
 items[117] = { name:"Heavy Lance",type:"cav_pole", img:"itm_heavy_lance.png"}
 items[456] = { name:"Mamluke Mail",type:"body_armor", img:"itm_mamluke_mail.png"}
 items[158] = { name:"Katana",type:"two_handed", img:"itm_strange_sword.png"}
 items[510] = { name:"Nordic Champion's Sword",type:"one_handed", img:"itm_sword_viking_3_long.png"}
 items[114] = { name:"Long Hafted Blade",type:"polearm", img:"itm_hafted_blade_a.png"}
 items[119] = { name:"Long Awlpike",type:"polearm", img:"itm_awlpike_long.png"}
 items[2] = { name:"Rouncey",type:"horse", img:"itm_saddle_horse.png"}
 items[199] = { name:"Knightly Arming Sword",type:"one_handed", img:"itm_sword_medieval_d_long.png"}
 items[542] = { name:"Gilded Hourglass Gauntlets",type:"hand_armor", img:"itm_hourglass_gauntlets_ornate.png"}
 items[509] = { name:"Milanese Sallet",type:"head_armor", img:"itm_milanese_sallet.png"}
 items[358] = { name:"Sallet with Visor and Coif",type:"head_armor", img:"itm_visored_sallet_coif.png"}
 items[543] = { name:"Hourglass Gauntlets",type:"hand_armor", img:"itm_hourglass_gauntlets.png"}
 items[5141] = { name:"Yumi",type:"bow", img:"itm_yumi.png"}
 items[550] = { name:"Polished Gauntlets",type:"hand_armor", img:"itm_gauntlets_b.png"}
 items[249] = { name:"Gauntlets",type:"hand_armor", img:"itm_gauntlets.png"}
 items[449] = { name:"Sarranid Guard Armor",type:"body_armor", img:"itm_arabian_armor_b.png"}
 items[106] = { name:"Double Sided Lance",type:"polearm", img:"itm_double_sided_lance.png"}
 items[154] = { name:"Miaodao",type:"two_handed", img:"itm_khergit_sword_two_handed_b.png"}
 items[3323] = { name:"Steel Pick",type:"one_handed", img:"itm_steel_pick.png"}
 items[357] = { name:"Sallet with Visor",type:"head_armor", img:"itm_visored_sallet.png"}
 items[113] = { name:"Awlpike",type:"polearm", img:"itm_awlpike.png"}
 items[3193] = { name:"Side Sword",type:"one_handed", img:"itm_side_sword.png"}
 items[118] = { name:"Swiss Halberd",type:"polearm", img:"itm_poleaxe.png"}
 items[210] = { name:"Elite Scimitar",type:"one_handed", img:"itm_scimitar_b.png"}
 items[44] = { name:"Throwing Lance",type:"throwing", img:"itm_throwing_lance.png"}
 items[4958] = { name:"Heavy Kuyak",type:"body_armor", img:"itm_kuyak_b.png"}
 items[153] = { name:"Two Handed Sword",type:"two_handed", img:"itm_sword_two_handed_b.png"}
 items[355] = { name:"Sugarloaf Helmet with Coif",type:"head_armor", img:"itm_sugarloaf_coif.png"}
 items[354] = { name:"Hounskull Bascinet",type:"head_armor", img:"itm_hounskull.png"}
 items[21] = { name:"Horn Bow",type:"bow", img:"itm_strong_bow.png"}
 items[216] = { name:"Broad One Handed Battle Axe",type:"one_handed", img:"itm_one_handed_battle_axe_c.png"}
 items[3190] = { name:"Espada Eslavona",type:"one_handed", img:"itm_espada_eslavona_a.png"}
 items[102] = { name:"Long Maul",type:"polearm", img:"itm_polehammer.png"}
 items[217] = { name:"Wakizashi",type:"one_handed", img:"itm_strange_short_sword.png"}
 items[3298] = { name:"Langes Messer",type:"one_handed", img:"itm_grosse_messer_b.png"}
 items[356] = { name:"Sugarloaf Helmet",type:"head_armor", img:"itm_sugarloaf.png"}
 items[352] = { name:"Blue Tournament Helmet",type:"head_armor", img:"itm_blue_tournament_helmet.png"}
 items[351] = { name:"Green Tournament Helmet",type:"head_armor", img:"itm_green_tournament_helmet.png"}
 items[346] = { name:"Red Tournament Helmet",type:"head_armor", img:"itm_red_tournament_helmet.png"}
 items[345] = { name:"White Tournament Helmet",type:"head_armor", img:"itm_white_tournament_helmet.png"}
 items[344] = { name:"Winged Great Helmet",type:"head_armor", img:"itm_winged_great_helmet.png"}
 items[3196] = { name:"Grosse Messer",type:"one_handed", img:"itm_grosse_messer.png"}
 items[439] = { name:"Studded Leather over Mail",type:"body_armor", img:"itm_studded_leather_coat.png"}
 items[110] = { name:"Battle Fork",type:"polearm", img:"itm_battle_fork.png"}
 items[548] = { name:"Round Steel Buckler",type:"shield", img:"itm_steel_buckler1.png"}
 items[152] = { name:"War Cleaver",type:"two_handed", img:"itm_two_handed_cleaver.png"}
 items[42] = { name:"Jarid",type:"throwing", img:"itm_jarid.png"}
 items[461] = { name:"Heraldic Mail with Tabard",type:"body_armor", img:"itm_heraldic_mail_with_tabard.png"}
 items[506] = { name:"Great Helmet with Hat",type:"head_armor", img:"itm_greathelmwhat.png"}
 items[40] = { name:"Throwing Spear",type:"throwing", img:"itm_throwing_spears.png"}
 items[451] = { name:"Surcoat over Mail",type:"body_armor", img:"itm_surcoat_over_mail.png"}
 items[122] = { name:"Long Bardiche",type:"polearm", img:"itm_long_bardiche.png"}
 items[120] = { name:"Long Axe",type:"polearm", img:"itm_long_axe.png"}
 items[544] = { name:"Steel Buckler",type:"shield", img:"itm_steel_buckler2.png"}
 items[151] = { name:"Great Bardiche",type:"two_handed", img:"itm_great_bardiche.png"}
 items[214] = { name:"Arabian Cavalry Sword",type:"one_handed", img:"itm_sarranid_cavalry_sword.png"}
 items[98] = { name:"War Spear",type:"polearm", img:"itm_war_spear.png"}
 items[112] = { name:"Long Hafted Spiked Mace",type:"polearm", img:"itm_long_hafted_spiked_mace.png"}
 items[3192] = { name:"Italian Sword",type:"one_handed", img:"itm_italian_sword.png"}
 items[460] = { name:"Heraldic Mail with Tunic",type:"body_armor", img:"itm_heraldic_mail_with_tunic_b.png"}
 items[459] = { name:"Heraldic Mail",type:"body_armor", img:"itm_heraldic_mail_with_tunic.png"}
 items[4957] = { name:"Light Kuyak",type:"body_armor", img:"itm_kuyak_a.png"}
 items[4946] = { name:"Litchina Helm",type:"head_armor", img:"itm_litchina_helm.png"}
 items[343] = { name:"Great Helmet",type:"head_armor", img:"itm_great_helmet.png"}
 items[212] = { name:"Long Arming Sword",type:"one_handed", img:"itm_sword_medieval_c_long.png"}
 items[518] = { name:"Bar Mace",type:"two_handed", img:"itm_Faradon_IronClub.png"}
 items[517] = { name:"Longsword",type:"two_handed", img:"itm_Faradon_handandahalf.png"}
 items[144] = { name:"Morningstar",type:"two_handed", img:"itm_morningstar.png"}
 items[145] = { name:"Great Axe",type:"two_handed", img:"itm_great_axe.png"}
 items[12] = { name:"Light Crossbow",type:"crossbow", img:"itm_light_crossbow.png"}
 items[248] = { name:"Lamellar Gauntlets",type:"hand_armor", img:"itm_lamellar_gauntlets.png"}
 items[247] = { name:"Scale Gauntlets",type:"hand_armor", img:"itm_scale_gauntlets.png"}
 items[215] = { name:"Military Hammer",type:"one_handed", img:"itm_military_hammer.png"}
 items[87] = { name:"Huscarl's Round Shield",type:"shield", img:"itm_tab_shield_round_e.png"}
 items[4947] = { name:"Black Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat_black.png"}
 items[4948] = { name:"White Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat_white.png"}
 items[4949] = { name:"Brown Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat_brown.png"}
 items[4950] = { name:"Green Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat_green.png"}
 items[4951] = { name:"Blue Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat_blue.png"}
 items[4952] = { name:"Byrnja",type:"body_armor", img:"itm_dejawolf_viking_byrnie.png"}
 items[458] = { name:"Heraldic Mail with Surcoat",type:"body_armor", img:"itm_heraldic_mail_with_surcoat.png"}
 items[450] = { name:"Mail with Surcoat",type:"body_armor", img:"itm_mail_with_surcoat.png"}
 items[540] = { name:"Pigface Klappvisier",type:"head_armor", img:"itm_pigface_klappvisor.png"}
 items[503] = { name:"Klappvisier",type:"head_armor", img:"itm_klappvisier.png"}
 items[342] = { name:"Vaegir War Mask",type:"head_armor", img:"itm_vaegir_mask.png"}
 items[520] = { name:"Broad Short Sword",type:"one_handed", img:"itm_Faradon_onehanded.png"}
 items[198] = { name:"One Handed Battle Axe",type:"one_handed", img:"itm_one_handed_battle_axe_b.png"}
 items[213] = { name:"Arabian Guard Sword",type:"one_handed", img:"itm_arabian_sword_d.png"}
 items[446] = { name:"Strange Armor",type:"body_armor", img:"itm_strange_armor.png"}
 items[4753] = { name:"Red Tassel Spear",type:"polearm", img:"itm_red_tassel_spear.png"}
 items[204] = { name:"Military Pick",type:"one_handed", img:"itm_military_pick.png"}
 items[208] = { name:"Niuweidao",type:"one_handed", img:"itm_sword_khergit_4.png"}
 items[4940] = { name:"Heavy Strange War Mask",type:"head_armor", img:"itm_samurai_mask_heavy.png"}
 items[341] = { name:"Faceplate",type:"head_armor", img:"itm_full_helm.png"}
 items[19] = { name:"Tatar Bow",type:"bow", img:"itm_khergit_bow.png"}
 items[109] = { name:"Long Hafted Knobbed Mace",type:"polearm", img:"itm_long_hafted_knobbed_mace.png"}
 items[448] = { name:"Sarranid Mail Shirt",type:"body_armor", img:"itm_sarranid_mail_shirt.png"}
 items[209] = { name:"Nordic War Sword",type:"one_handed", img:"itm_sword_viking_3.png"}
 items[539] = { name:"Construction Material",type:"siege", img:"itm_construction_material.png"}
 items[148] = { name:"Long Iron Mace",type:"two_handed", img:"itm_sarranid_two_handed_mace_1.png"}
 items[211] = { name:"Arming Sword",type:"one_handed", img:"itm_sword_medieval_c.png"}
 items[203] = { name:"Military Cleaver",type:"one_handed", img:"itm_military_cleaver_c.png"}
 items[507] = { name:"Barbutte",type:"head_armor", img:"itm_barbuta2.png"}
 items[360] = { name:"Open Sallet with Coif",type:"head_armor", img:"itm_open_sallet_coif.png"}
 items[340] = { name:"Black Helmet",type:"head_armor", img:"itm_black_helmet.png"}
 items[146] = { name:"Persian Battle Axe",type:"two_handed", img:"itm_sarranid_two_handed_axe_a.png"}
 items[516] = { name:"Iberian Mace",type:"one_handed", img:"itm_Faradon_IberianMace.png"}
 items[150] = { name:"Heavy Bastard Sword",type:"two_handed", img:"itm_bastard_sword_b.png"}
 items[96] = { name:"Long Spear",type:"polearm", img:"itm_pike.png"}
 items[447] = { name:"Mail Hauberk",type:"body_armor", img:"itm_mail_hauberk.png"}
 items[4754] = { name:"Pike",type:"polearm", img:"itm_pike.png"}
 items[108] = { name:"Lance",type:"cav_pole", img:"itm_lance.png"}
 items[4755] = { name:"Shashka",type:"one_handed", img:"itm_shashka.png"}
 items[104] = { name:"Hafted Blade",type:"polearm", img:"itm_hafted_blade_b.png"}
 items[84] = { name:"Heavy Board Shield",type:"shield", img:"itm_tab_shield_pavise_d.png"}
 items[135] = { name:"Mallet",type:"two_handed", img:"itm_sledgehammer.png"}
 items[3969] = { name:"Heavy Strange Helmet",type:"head_armor", img:"itm_samurai_helmet_black.png"}
 items[362] = { name:"Morion",type:"head_armor", img:"itm_combed_morion.png"}
 items[149] = { name:"Dadao",type:"two_handed", img:"itm_khergit_sword_two_handed_a.png"}
 items[207] = { name:"Iron War Axe",type:"one_handed", img:"itm_sarranid_axe_b.png"}
 items[483] = { name:"Bodkin Arrows",type:"arrows", img:"itm_bodkin_arrows.png"}
 items[4943] = { name:"Nikolskoe Helm",type:"head_armor", img:"itm_nikolskoe_helm.png"}
 items[359] = { name:"Open Sallet",type:"head_armor", img:"itm_open_sallet.png"}
 items[339] = { name:"Nordic Warlord Helmet",type:"head_armor", img:"itm_nordic_warlord_helmet.png"}
 items[445] = { name:"Mail Shirt",type:"body_armor", img:"itm_mail_shirt.png"}
 items[193] = { name:"Scimitar",type:"one_handed", img:"itm_scimitar.png"}
 items[142] = { name:"Bardiche",type:"two_handed", img:"itm_bardiche.png"}
 items[3194] = { name:"Scottish Sword",type:"one_handed", img:"itm_scottish_sword.png"}
 items[252] = { name:"Red Wisby Gauntlets",type:"hand_armor", img:"itm_wisby_gauntlets_red.png"}
 items[251] = { name:"Wisby Gauntlets",type:"hand_armor", img:"itm_wisby_gauntlets.png"}
 items[105] = { name:"Ashwood Pike",type:"polearm", img:"itm_ashwood_pike.png"}
 items[69] = { name:"White Heavy Norman Shield",type:"shield", img:"itm_norman_shield_7.png"}
 items[68] = { name:"Dark Red Heavy Norman Shield",type:"shield", img:"itm_norman_shield_6.png"}
 items[67] = { name:"Dark Blue Heavy Norman Shield",type:"shield", img:"itm_norman_shield_5.png"}
 items[65] = { name:"Blue Heavy Norman Shield",type:"shield", img:"itm_norman_shield_3.png"}
 items[63] = { name:"Brown Heavy Norman Shield",type:"shield", img:"itm_norman_shield_1.png"}
 items[103] = { name:"Light Lance",type:"cav_pole", img:"itm_light_lance.png"}
 items[1] = { name:"Sumpter Horse",type:"horse", img:"itm_sumpter_horse.png"}
 items[4941] = { name:"Novogrod Helm",type:"head_armor", img:"itm_novogrod_helm.png"}
 items[4945] = { name:"Tagancha Helm with Veil",type:"head_armor", img:"itm_tagancha_helm_b.png"}
 items[361] = { name:"Chapel de Fer",type:"head_armor", img:"itm_chapel_de_fer.png"}
 items[337] = { name:"Vaegir War Helmet",type:"head_armor", img:"itm_vaegir_war_helmet.png"}
 items[336] = { name:"Sarranid Veiled Helmet",type:"head_armor", img:"itm_sarranid_veiled_helmet.png"}
 items[334] = { name:"Guard Helmet",type:"head_armor", img:"itm_guard_helmet.png"}
 items[4723] = { name:"Druzhina Mail Shirt",type:"body_armor", img:"itm_samurai_armor_red.png"}
 items[116] = { name:"Iron Staff",type:"polearm", img:"itm_iron_staff.png"}
 items[241] = { name:"Black Greaves",type:"foot_armor", img:"itm_black_greaves.png"}
 items[78] = { name:"Fur Covered Shield",type:"shield", img:"itm_fur_covered_shield.png"}
 items[30] = { name:"Javelins",type:"throwing", img:"itm_javelin.png"}
 items[133] = { name:"Long Voulge",type:"polearm", img:"itm_long_voulge.png"}
 items[195] = { name:"Arabian Arming Sword",type:"one_handed", img:"itm_arabian_sword_b.png"}
 items[82] = { name:"Heavy Heater Shield",type:"shield", img:"itm_tab_shield_heater_d.png"}
 items[454] = { name:"Scale Armor",type:"body_armor", img:"itm_scale_armor.png"}
 items[441] = { name:"Haubergeon",type:"body_armor", img:"itm_haubergeon.png"}
 items[38] = { name:"Heavy Throwing Axe",type:"throwing", img:"itm_heavy_throwing_axes.png"}
 items[3195] = { name:"Italian Falchion",type:"one_handed", img:"itm_italian_falchion.png"}
 items[81] = { name:"Heavy Kite Shield",type:"shield", img:"itm_tab_shield_kite_d.png"}
 items[4939] = { name:"Strange War Mask",type:"head_armor", img:"itm_samurai_mask_medium.png"}
 items[4942] = { name:"Gnezdovo Helmet",type:"head_armor", img:"itm_gnezdovo_helmet.png"}
 items[363] = { name:"Rusty Morion",type:"head_armor", img:"itm_combed_morion_blued.png"}
 items[333] = { name:"Bascinet with Nose Guard",type:"head_armor", img:"itm_bascinet_3.png"}
 items[86] = { name:"Knightly Heater Shield",type:"shield", img:"itm_tab_shield_heater_cav_b.png"}
 items[242] = { name:"Cased Greaves",type:"foot_armor", img:"itm_steel_greaves.png"}
 items[83] = { name:"Knightly Kite Shield",type:"shield", img:"itm_tab_shield_kite_cav_b.png"}
 items[194] = { name:"Winged Mace",type:"one_handed", img:"itm_mace_4.png"}
 items[71] = { name:"Plate Covered Round Shield",type:"shield", img:"itm_plate_covered_round_shield.png"}
 items[76] = { name:"Heavy Round Shield",type:"shield", img:"itm_tab_shield_round_d.png"}
 items[107] = { name:"Long Spiked Club",type:"polearm", img:"itm_long_spiked_club.png"}
 items[4944] = { name:"Tagancha Helm",type:"head_armor", img:"itm_tagancha_helm_a.png"}
 items[335] = { name:"Vaegir Nobleman Helmet",type:"head_armor", img:"itm_vaegir_noble_helmet.png"}
 items[332] = { name:"Bascinet with Aventail",type:"head_armor", img:"itm_bascinet_2.png"}
 items[140] = { name:"Persian War Axe",type:"two_handed", img:"itm_sarranid_two_handed_axe_b.png"}
 items[202] = { name:"Iron Battle Axe",type:"one_handed", img:"itm_sarranid_axe_a.png"}
 items[143] = { name:"Bastard Sword",type:"two_handed", img:"itm_bastard_sword_a.png"}
 items[206] = { name:"Liuyedao",type:"one_handed", img:"itm_sword_khergit_3.png"}
 items[240] = { name:"Plate Boots",type:"foot_armor", img:"itm_plate_boots.png"}
 items[546] = { name:"Onion Top Bascinet",type:"head_armor", img:"itm_onion_top_bascinet.png"}
 items[338] = { name:"Strange Helmet",type:"head_armor", img:"itm_strange_helmet.png"}
 items[331] = { name:"Bascinet",type:"head_armor", img:"itm_bascinet.png"}
 items[205] = { name:"Nordic Short War Sword",type:"one_handed", img:"itm_sword_viking_3_small.png"}
 items[405] = { name:"Tourney Armor",type:"body_armor", img:"itm_mail_coat.png"}
 items[85] = { name:"Elite Cavalry Shield",type:"shield", img:"itm_tab_shield_small_round_c.png"}
 items[18] = { name:"Nomad Bow",type:"bow", img:"itm_nomad_bow.png"}
 items[147] = { name:"Goedendag",type:"two_handed", img:"itm_club_with_spike_head.png"}
 items[77] = { name:"Board Shield",type:"shield", img:"itm_tab_shield_pavise_c.png"}
 items[519] = { name:"Studded Warclub",type:"two_handed", img:"itm_Faradon_LargeClub.png"}
 items[440] = { name:"Byrnie",type:"body_armor", img:"itm_byrnie.png"}
 items[95] = { name:"Spear",type:"polearm", img:"itm_spear.png"}
 items[243] = { name:"Shynbaulds",type:"foot_armor", img:"itm_shynbaulds.png"}
 items[3137] = { name:"Dark Cavalry Robe",type:"body_armor", img:"itm_sarranid_robe_red.png"}
 items[444] = { name:"Cavalry Robe",type:"body_armor", img:"itm_sarranid_cavalry_robe.png"}
 items[501] = { name:"Blue and Purple Kite Shield",type:"shield", img:"itm_shield_kite_g.png"}
 items[176] = { name:"Iron Mace",type:"one_handed", img:"itm_sarranid_mace_1.png"}
 items[123] = { name:"Great Lance",type:"cav_pole", img:"itm_great_lance.png"}
 items[11] = { name:"Hunting Crossbow",type:"crossbow", img:"itm_hunting_crossbow.png"}
 items[411] = { name:"White Tunic over Mail",type:"body_armor", img:"itm_homespun_dress.png"}
 items[410] = { name:"Yellow Tunic over Mail",type:"body_armor", img:"itm_merchant_outfit.png"}
 items[409] = { name:"Blue Tunic over Mail",type:"body_armor", img:"itm_hide_coat.png"}
 items[408] = { name:"Green Tunic over Mail",type:"body_armor", img:"itm_sleeveless_coat.png"}
 items[407] = { name:"Red Tunic over Mail",type:"body_armor", img:"itm_sleeveless_mail_coat.png"}
 items[182] = { name:"Light One Handed Battle Axe",type:"one_handed", img:"itm_one_handed_battle_axe_a.png"}
 items[253] = { name:"Mail Gauntlets",type:"hand_armor", img:"itm_mail_gauntlets.png"}
 items[201] = { name:"Short Arming Sword",type:"one_handed", img:"itm_sword_medieval_c_small.png"}
 items[196] = { name:"Fighting Axe",type:"one_handed", img:"itm_fighting_axe.png"}
 items[36] = { name:"Throwing Axe",type:"throwing", img:"itm_throwing_axes.png"}
 items[3130] = { name:"Black Lamellar Vest",type:"body_armor", img:"itm_lamellar_vest_black.png"}
 items[443] = { name:"Khergit Lamellar Vest",type:"body_armor", img:"itm_lamellar_vest_khergit.png"}
 items[442] = { name:"Lamellar Vest",type:"body_armor", img:"itm_lamellar_vest.png"}
 items[239] = { name:"Iron Greaves",type:"foot_armor", img:"itm_iron_greaves.png"}
 items[231] = { name:"Khergit Guard Boots",type:"foot_armor", img:"itm_khergit_guard_boots.png"}
 items[99] = { name:"Military Fork",type:"polearm", img:"itm_military_fork.png"}
 items[94] = { name:"Bamboo Spear",type:"polearm", img:"itm_bamboo_spear.png"}
 items[197] = { name:"Military Sickle",type:"one_handed", img:"itm_military_sickle_a.png"}
 items[192] = { name:"Soldier's Cleaver",type:"one_handed", img:"itm_military_cleaver_b.png"}
 items[200] = { name:"Sword",type:"one_handed", img:"itm_sword_medieval_b.png"}
 items[328] = { name:"Sarranid Mail Coif",type:"head_armor", img:"itm_sarranid_mail_coif.png"}
 items[73] = { name:"Heater Shield",type:"shield", img:"itm_tab_shield_heater_c.png"}
 items[70] = { name:"Blue Norman Shield",type:"shield", img:"itm_norman_shield_8.png"}
 items[66] = { name:"Yellow Norman Shield",type:"shield", img:"itm_norman_shield_4.png"}
 items[64] = { name:"Green Norman Shield",type:"shield", img:"itm_norman_shield_2.png"}
 items[72] = { name:"Kite Shield",type:"shield", img:"itm_tab_shield_kite_c.png"}
 items[535] = { name:"Siege Ladder",type:"siege", img:"itm_crpg_ladder_14m.png"}
 items[237] = { name:"Mail Boots",type:"foot_armor", img:"itm_mail_boots.png"}
 items[188] = { name:"Flanged Mace",type:"one_handed", img:"itm_winged_mace.png"}
 items[493] = { name:"White Black and Red Kite Shield",type:"shield", img:"itm_shield_kite_h.png"}
 items[189] = { name:"Mace",type:"two_handed", img:"itm_spiked_mace.png"}
 items[484] = { name:"Tatar Arrows",type:"arrows", img:"itm_khergit_arrows.png"}
 items[329] = { name:"Khergit Guard Helmet",type:"head_armor", img:"itm_khergit_guard_helmet.png"}
 items[327] = { name:"Nordic Huscarl's Helmet",type:"head_armor", img:"itm_nordic_huscarl_helmet.png"}
 items[318] = { name:"Rus Helmet",type:"head_armor", img:"itm_rus_helmet_a.png"}
 items[48] = { name:"Snowflake",type:"throwing", img:"itm_throwing_star_c.png"}
 items[61] = { name:"Round Shield",type:"shield", img:"itm_tab_shield_round_c.png"}
 items[498] = { name:"Brown Kite Shield",type:"shield", img:"itm_shield_kite_i.png"}
 items[496] = { name:"Black and White Kite Shield",type:"shield", img:"itm_shield_kite_k.png"}
 items[244] = { name:"Splinted Greaves with Spurs",type:"foot_armor", img:"itm_splinted_greaves_spurs.png"}
 items[505] = { name:"Green Crescent Heater Shield",type:"shield", img:"itm_shield_heater_d.png"}
 items[404] = { name:"Studded Leather Coat",type:"body_armor", img:"itm_leather_coat.png"}
 items[47] = { name:"6-Point Shuriken",type:"throwing", img:"itm_throwing_star_b.png"}
 items[537] = { name:"Siege Shield",type:"siege", img:"itm_siege_shield.png"}
 items[3971] = { name:"Light Strange Armor",type:"body_armor", img:"itm_drz_mail_shirt.png"}
 items[46] = { name:"4-Point Shuriken",type:"throwing", img:"itm_throwing_star_a.png"}
 items[486] = { name:"Steel Bolts",type:"bolts", img:"itm_steel_bolts.png"}
 items[5142] = { name:"Throwing Hammer",type:"throwing", img:"itm_throwing_hammer.png"}
 items[138] = { name:"War Axe",type:"two_handed", img:"itm_war_axe.png"}
 items[325] = { name:"Helmet with Lamellar Guard",type:"head_armor", img:"itm_vaegir_lamellar_helmet.png"}
 items[324] = { name:"Nordic Helmet",type:"head_armor", img:"itm_nordic_helmet.png"}
 items[315] = { name:"Spiked Helmet",type:"head_armor", img:"itm_spiked_helmet.png"}
 items[232] = { name:"Plated Boots",type:"foot_armor", img:"itm_sarranid_boots_c.png"}
 items[4935] = { name:"Rus Splinted Greaves",type:"foot_armor", img:"itm_rus_splint_greaves.png"}
 items[191] = { name:"Yanmaodao",type:"one_handed", img:"itm_sword_khergit_2.png"}
 items[499] = { name:"Nordic Sword",type:"one_handed", img:"itm_sword_viking_2.png"}
 items[80] = { name:"Brown Lion Heater Shield",type:"shield", img:"itm_shield_heater_c.png"}
 items[529] = { name:"Large Wooden Ladder",type:"siege", img:"itm_crpg_ladder_12m.png"}
 items[34] = { name:"Francisca",type:"throwing", img:"itm_light_throwing_axes.png"}
 items[62] = { name:"Plain Board Shield",type:"shield", img:"itm_tab_shield_pavise_b.png"}
 items[186] = { name:"Nordic Short Sword",type:"one_handed", img:"itm_sword_viking_2_small.png"}
 items[190] = { name:"One Handed War Axe",type:"one_handed", img:"itm_one_handed_war_axe_b.png"}
 items[438] = { name:"Sarranid Leather Armor",type:"body_armor", img:"itm_sarranid_leather_armor.png"}
 items[236] = { name:"Splinted Greaves",type:"foot_armor", img:"itm_splinted_greaves.png"}
 items[57] = { name:"Plain Heater Shield",type:"shield", img:"itm_tab_shield_heater_b.png"}
 items[56] = { name:"Plain Kite Shield",type:"shield", img:"itm_tab_shield_kite_b.png"}
 items[16] = { name:"Bow",type:"bow", img:"itm_hunting_bow.png"}
 items[181] = { name:"Arabian Straight Sword",type:"one_handed", img:"itm_arabian_sword_a.png"}
 items[4938] = { name:"Light Strange War Mask",type:"head_armor", img:"itm_samurai_mask_light.png"}
 items[549] = { name:"Kettle Helmet",type:"head_armor", img:"itm_prato_chapel_de_fer.png"}
 items[330] = { name:"Khergit Cavalry Helmet",type:"head_armor", img:"itm_khergit_cavalry_helmet.png"}
 items[134] = { name:"Two Handed War Axe",type:"two_handed", img:"itm_two_handed_battle_axe_2.png"}
 items[100] = { name:"Military Scythe",type:"polearm", img:"itm_military_scythe.png"}
 items[139] = { name:"Shortened Military Scythe",type:"two_handed", img:"itm_shortened_military_scythe.png"}
 items[183] = { name:"Simple Nordic Sword",type:"one_handed", img:"itm_sword_viking_1.png"}
 items[79] = { name:"Horseman's Heater Shield",type:"shield", img:"itm_tab_shield_heater_cav_a.png"}
 items[75] = { name:"Horseman's Kite Shield",type:"shield", img:"itm_tab_shield_kite_cav_a.png"}
 items[322] = { name:"Sarranid Keffiyeh Helmet",type:"head_armor", img:"itm_sarranid_helmet1.png"}
 items[320] = { name:"Shahi",type:"head_armor", img:"itm_shahi.png"}
 items[313] = { name:"Kettle Hat",type:"head_armor", img:"itm_kettle_hat.png"}
 items[136] = { name:"Shortened Voulge",type:"two_handed", img:"itm_shortened_voulge.png"}
 items[74] = { name:"Round Cavalry Shield",type:"shield", img:"itm_tab_shield_small_round_b.png"}
 items[187] = { name:"Simple Sword",type:"one_handed", img:"itm_sword_medieval_a.png"}
 items[185] = { name:"Spiked Mace",type:"one_handed", img:"itm_mace_3.png"}
 items[437] = { name:"Nomad Robe",type:"body_armor", img:"itm_nomad_robe.png"}
 items[179] = { name:"Nomad Sabre",type:"one_handed", img:"itm_sword_khergit_1.png"}
 items[233] = { name:"Splinted Leather Greaves over Mail",type:"foot_armor", img:"itm_splinted_leather_greaves.png"}
 items[3967] = { name:"Heavy Strange Greaves",type:"foot_armor", img:"itm_samurai_boots_black.png"}
 items[534] = { name:"Medium Wooden Ladder",type:"siege", img:"itm_crpg_ladder_10m.png"}
 items[184] = { name:"Short Sword",type:"one_handed", img:"itm_sword_medieval_b_small.png"}
 items[323] = { name:"Khergit War Helmet",type:"head_armor", img:"itm_khergit_war_helmet.png"}
 items[314] = { name:"Nordic Fighter Helmet",type:"head_armor", img:"itm_nordic_fighter_helmet.png"}
 items[3968] = { name:"Light Strange Helmet",type:"head_armor", img:"itm_samurai_helmet_red.png"}
 items[420] = { name:"Padded Leather",type:"body_armor", img:"itm_padded_leather.png"}
 items[482] = { name:"Barbed Arrows",type:"arrows", img:"itm_barbed_arrows.png"}
 items[238] = { name:"Sarranid Mail Boots",type:"foot_armor", img:"itm_sarranid_boots_d.png"}
 items[350] = { name:"Red Steppe Helmet",type:"head_armor", img:"itm_red_steppe_helmet.png"}
 items[349] = { name:"Green Steppe Helmet",type:"head_armor", img:"itm_green_steppe_helmet.png"}
 items[348] = { name:"Turban Helmet",type:"head_armor", img:"itm_turban_helmet.png"}
 items[347] = { name:"White Steppe Helmet",type:"head_armor", img:"itm_white_steppe_helmet.png"}
 items[326] = { name:"Khergit Helmet",type:"head_armor", img:"itm_khergit_helmet.png"}
 items[310] = { name:"Flat Topped Helmet",type:"head_armor", img:"itm_flat_topped_helmet.png"}
 items[4722] = { name:"Kaftan",type:"body_armor", img:"itm_drz_kaftan.png"}
 items[175] = { name:"One Handed Axe",type:"one_handed", img:"itm_one_handed_war_axe_a.png"}
 items[92] = { name:"Shortened Spear",type:"polearm", img:"itm_shortened_spear.png"}
 items[131] = { name:"Maul",type:"two_handed", img:"itm_maul.png"}
 items[434] = { name:"Tribal Warrior Outfit",type:"body_armor", img:"itm_tribal_warrior_outfit.png"}
 items[55] = { name:"Plain Round Shield",type:"shield", img:"itm_tab_shield_round_b.png"}
 items[180] = { name:"Fighting Pick",type:"one_handed", img:"itm_fighting_pick.png"}
 items[32] = { name:"War Darts",type:"throwing", img:"itm_war_darts.png"}
 items[311] = { name:"Spiked Cap",type:"head_armor", img:"itm_vaegir_spiked_helmet.png"}
 items[308] = { name:"Helmet with Neckguard",type:"head_armor", img:"itm_helmet_with_neckguard.png"}
 items[246] = { name:"Mail Mittens",type:"hand_armor", img:"itm_mail_mittens.png"}
 items[306] = { name:"Segmented Helmet",type:"head_armor", img:"itm_segmented_helmet.png"}
 items[235] = { name:"Mail Chausses",type:"foot_armor", img:"itm_mail_chausses.png"}
 items[177] = { name:"Knobbed Mace",type:"one_handed", img:"itm_mace_2.png"}
 items[403] = { name:"Padded Armor",type:"body_armor", img:"itm_coat.png"}
 items[59] = { name:"Nordic Shield",type:"shield", img:"itm_nordic_shield.png"}
 items[321] = { name:"Rabati",type:"head_armor", img:"itm_rabati.png"}
 items[319] = { name:"Sipahi Helmet",type:"head_armor", img:"itm_sipahi_helmet_a.png"}
 items[317] = { name:"Magyar Helmet",type:"head_armor", img:"itm_magyar_helmet_a.png"}
 items[305] = { name:"Nordic Footman Helmet",type:"head_armor", img:"itm_nordic_footman_helmet.png"}
 items[536] = { name:"Wooden Ladder",type:"siege", img:"itm_crpg_ladder_8m.png"}
 items[418] = { name:"Light Leather",type:"body_armor", img:"itm_light_leather.png"}
 items[93] = { name:"Boar Spear",type:"polearm", img:"itm_boar_spear.png"}
 items[504] = { name:"Nordic Conical Helmet",type:"head_armor", img:"itm_pointyhelm.png"}
 items[472] = { name:"Padded Jack",type:"body_armor", img:"itm_narf_gambeson.png"}
 items[101] = { name:"Jousting Lance",type:"cav_pole", img:"itm_jousting_lance.png"}
 items[111] = { name:"Quarter Staff",type:"polearm", img:"itm_quarter_staff.png"}
 items[29] = { name:"Firebomb",type:"throwing", img:"itm_firebomb.png"}
 items[132] = { name:"Voulge",type:"polearm", img:"itm_voulge.png"}
 items[60] = { name:"Plain Cavalry Shield",type:"shield", img:"itm_tab_shield_small_round_a.png"}
 items[170] = { name:"Hand Axe",type:"one_handed", img:"itm_hand_axe.png"}
 items[353] = { name:"Yellow Arena Helmet",type:"head_armor", img:"itm_yellow_arena_helmet.png"}
 items[304] = { name:"Norman Helmet",type:"head_armor", img:"itm_norman_helmet.png"}
 items[419] = { name:"Sarranid Padded Vest",type:"body_armor", img:"itm_archers_vest.png"}
 items[28] = { name:"Throwing Daggers",type:"throwing", img:"itm_throwing_daggers.png"}
 items[491] = { name:"Practice Lance",type:"cav_pole", img:"itm_arena_lance.png"}
 items[137] = { name:"Battle Axe",type:"two_handed", img:"itm_battle_axe.png"}
 items[494] = { name:"Nordic Pot Helmet",type:"head_armor", img:"itm_plainhelm.png"}
 items[234] = { name:"Strange Greaves",type:"foot_armor", img:"itm_strange_boots.png"}
 items[17] = { name:"Short Bow",type:"bow", img:"itm_short_bow.png"}
 items[417] = { name:"Ragged Outfit",type:"body_armor", img:"itm_ragged_outfit.png"}
 items[54] = { name:"Old Board Shield",type:"shield", img:"itm_tab_shield_pavise_a.png"}
 items[316] = { name:"Byzantion Helmet",type:"head_armor", img:"itm_byzantion_helmet_a.png"}
 items[303] = { name:"Nasal Helmet",type:"head_armor", img:"itm_nasal_helmet.png"}
 items[50] = { name:"Old Kite Shield",type:"shield", img:"itm_tab_shield_kite_a.png"}
 items[174] = { name:"Spiked Club",type:"one_handed", img:"itm_spiked_club.png"}
 items[130] = { name:"Two Handed Axe",type:"two_handed", img:"itm_two_handed_axe.png"}
 items[51] = { name:"Old Heater Shield",type:"shield", img:"itm_tab_shield_heater_a.png"}
 items[58] = { name:"Leather Covered Round Shield",type:"shield", img:"itm_leather_covered_round_shield.png"}
 items[307] = { name:"Horseman Helmet",type:"head_armor", img:"itm_sarranid_horseman_helmet.png"}
 items[26] = { name:"Darts",type:"throwing", img:"itm_darts.png"}
 items[400] = { name:"Leather Jerkin",type:"body_armor", img:"itm_leather_jerkin.png"}
 items[178] = { name:"Falchion",type:"one_handed", img:"itm_falchion.png"}
 items[91] = { name:"Scythe",type:"polearm", img:"itm_scythe.png"}
 items[416] = { name:"Nomad Vest",type:"body_armor", img:"itm_nomad_vest.png"}
 items[301] = { name:"Footman's Helmet",type:"head_armor", img:"itm_footman_helmet.png"}
 items[53] = { name:"Wooden Shield",type:"shield", img:"itm_wooden_shield.png"}
 items[528] = { name:"Small Wooden Ladder",type:"siege", img:"itm_crpg_ladder_6m.png"}
 items[163] = { name:"Hammer",type:"one_handed", img:"itm_hammer.png"}
 items[398] = { name:"Padded Cloth",type:"body_armor", img:"itm_aketon_green.png"}
 items[397] = { name:"Aketon",type:"body_armor", img:"itm_padded_cloth.png"}
 items[169] = { name:"Khyber Knife",type:"one_handed", img:"itm_butchering_knife.png"}
 items[49] = { name:"Old Round Shield",type:"shield", img:"itm_tab_shield_round_a.png"}
 items[25] = { name:"Throwing Knives",type:"throwing", img:"itm_throwing_knives.png"}
 items[297] = { name:"Mail Coif",type:"head_armor", img:"itm_mail_coif.png"}
 items[396] = { name:"Red Gambeson",type:"body_armor", img:"itm_red_gambeson.png"}
 items[395] = { name:"Blue Gambeson",type:"body_armor", img:"itm_blue_gambeson.png"}
 items[393] = { name:"Gambeson",type:"body_armor", img:"itm_gambeson.png"}
 items[52] = { name:"Hide Covered Round Shield",type:"shield", img:"itm_hide_covered_round_shield.png"}
 items[302] = { name:"Vaegir Helmet",type:"head_armor", img:"itm_vaegir_fur_helmet.png"}
 items[4937] = { name:"Rus Cavalry Boots",type:"foot_armor", img:"itm_rus_cav_boots.png"}
 items[129] = { name:"Axe",type:"two_handed", img:"itm_axe.png"}
 items[554] = { name:"Long Dagger",type:"one_handed", img:"itm_dagger_swup.png"}
 items[296] = { name:"Nordic Leather Helmet with Rings",type:"head_armor", img:"itm_nordic_veteran_archer_helmet.png"}
 items[293] = { name:"Skullcap",type:"head_armor", img:"itm_skullcap.png"}
 items[399] = { name:"Pilgrim Disguise",type:"body_armor", img:"itm_pilgrim_disguise.png"}
 items[90] = { name:"Staff",type:"polearm", img:"itm_staff.png"}
 items[3966] = { name:"Light Strange Greaves",type:"foot_armor", img:"itm_samurai_boots_red.png"}
 items[230] = { name:"Leather Boots",type:"foot_armor", img:"itm_leather_boots.png"}
 items[171] = { name:"Pickaxe",type:"one_handed", img:"itm_pickaxe.png"}
 items[300] = { name:"Sarranid Warrior Cap",type:"head_armor", img:"itm_sarranid_warrior_cap.png"}
 items[551] = { name:"Torch",type:"one_handed", img:"itm_torch.png"}
 items[245] = { name:"Leather Gloves",type:"hand_armor", img:"itm_leather_gloves.png"}
 items[229] = { name:"Light Leather Boots",type:"foot_armor", img:"itm_light_leather_boots.png"}
 items[282] = { name:"Leather Warrior Cap",type:"head_armor", img:"itm_leather_warrior_cap.png"}
 items[172] = { name:"Dagger",type:"one_handed", img:"itm_dagger.png"}
 items[173] = { name:"Light Spiked Club",type:"one_handed", img:"itm_mace_1.png"}
 items[502] = { name:"Practice Longsword",type:"two_handed", img:"itm_heavy_wooden_sword.png"}
 items[227] = { name:"Nomad Boots",type:"foot_armor", img:"itm_nomad_boots.png"}
 items[167] = { name:"Cleaver",type:"one_handed", img:"itm_cleaver.png"}
 items[3322] = { name:"Knife",type:"one_handed", img:"itm_knife.png"}
 items[392] = { name:"Steppe Armor",type:"body_armor", img:"itm_steppe_armor.png"}
 items[485] = { name:"Bolts",type:"bolts", img:"itm_bolts.png"}
 items[312] = { name:"Felt Steppe Cap",type:"head_armor", img:"itm_felt_steppe_cap.png"}
 items[292] = { name:"Steppe Cap",type:"head_armor", img:"itm_leather_steppe_cap_c.png"}
 items[394] = { name:"Nomad Armor",type:"body_armor", img:"itm_nomad_armor.png"}
 items[388] = { name:"Skirmisher Armor",type:"body_armor", img:"itm_skirmisher_armor.png"}
 items[387] = { name:"Leather Armor",type:"body_armor", img:"itm_leather_armor.png"}
 items[500] = { name:"Practice Sword",type:"one_handed", img:"itm_wooden_sword.png"}
 items[481] = { name:"Arrows",type:"arrows", img:"itm_arrows.png"}
 items[228] = { name:"Sarranid Leather Boots",type:"foot_armor", img:"itm_sarranid_boots_b.png"}
 items[226] = { name:"Khergit Leather Boots",type:"foot_armor", img:"itm_khergit_leather_boots.png"}
 items[225] = { name:"Ankle Boots",type:"foot_armor", img:"itm_ankle_boots.png"}
 items[291] = { name:"Cap with Fur",type:"head_armor", img:"itm_vaegir_fur_cap.png"}
 items[391] = { name:"Leather Vest",type:"body_armor", img:"itm_leather_vest.png"}
 items[508] = { name:"Blue Practice Shield",type:"shield", img:"itm_blue_shield.png"}
 items[488] = { name:"Green Practice Shield",type:"shield", img:"itm_green_shield.png"}
 items[89] = { name:"Pitch Fork",type:"polearm", img:"itm_pitch_fork.png"}
 items[290] = { name:"Nordic Leather Helmet",type:"head_armor", img:"itm_nordic_archer_helmet.png"}
 items[289] = { name:"Desert Turban",type:"head_armor", img:"itm_desert_turban.png"}
 items[288] = { name:"Leather Steppe Cap",type:"head_armor", img:"itm_leather_steppe_cap_b.png"}
 items[287] = { name:"Pilgrim Hood",type:"head_armor", img:"itm_pilgrim_hood.png"}
 items[168] = { name:"Peasant Knife",type:"one_handed", img:"itm_knife.png"}
 items[497] = { name:"Red Practice Shield",type:"shield", img:"itm_red_shield.png"}
 items[490] = { name:"Yellow Practice Shield",type:"shield", img:"itm_yellow_shield.png"}
 items[389] = { name:"Tabard",type:"body_armor", img:"itm_tabard.png"}
 items[4936] = { name:"Rus Shoes",type:"foot_armor", img:"itm_rus_shoes.png"}
 items[390] = { name:"Fur Coat",type:"body_armor", img:"itm_fur_coat.png"}
 items[385] = { name:"Leather Jacket",type:"body_armor", img:"itm_leather_jacket.png"}
 items[285] = { name:"Steppe Cap with Fur",type:"head_armor", img:"itm_leather_steppe_cap_a.png"}
 items[281] = { name:"Horned Steppe Cap",type:"head_armor", img:"itm_steppe_cap.png"}
 items[224] = { name:"Hide Boots",type:"foot_armor", img:"itm_hide_boots.png"}
 items[386] = { name:"Leather Apron",type:"body_armor", img:"itm_leather_apron.png"}
 items[166] = { name:"Hatchet",type:"one_handed", img:"itm_hatchet.png"}
 items[552] = { name:"Trident",type:"polearm", img:"itm_trident_swup.png"}
 items[383] = { name:"Khergit Armor",type:"body_armor", img:"itm_khergit_armor.png"}
 items[286] = { name:"Turban",type:"head_armor", img:"itm_turban.png"}
 items[271] = { name:"Padded Coif",type:"head_armor", img:"itm_padded_coif.png"}
 items[165] = { name:"Club",type:"one_handed", img:"itm_club.png"}
 items[221] = { name:"Hunter Boots",type:"foot_armor", img:"itm_hunter_boots.png"}
 items[384] = { name:"Tunic with vest",type:"body_armor", img:"itm_coarse_tunic.png"}
 items[164] = { name:"Sickle",type:"one_handed", img:"itm_sickle.png"}
 items[495] = { name:"Black Hood with Mask",type:"head_armor", img:"itm_hood_black_mask.png"}
 items[309] = { name:"Black Hood",type:"head_armor", img:"itm_black_hood.png"}
 items[278] = { name:"Lady's Hood",type:"head_armor", img:"itm_female_hood.png"}
 items[277] = { name:"Blue Hood",type:"head_armor", img:"itm_hood_d.png"}
 items[276] = { name:"Purple and Green Hood",type:"head_armor", img:"itm_hood_c.png"}
 items[275] = { name:"Green and Yellow Hood",type:"head_armor", img:"itm_hood_b.png"}
 items[274] = { name:"Yellow Hood",type:"head_armor", img:"itm_common_hood.png"}
 items[272] = { name:"Leather Cap",type:"head_armor", img:"itm_leather_cap.png"}
 items[270] = { name:"Nomad Cap",type:"head_armor", img:"itm_nomad_cap_b.png"}
 items[269] = { name:"Spiked Nomad Cap",type:"head_armor", img:"itm_nomad_cap.png"}
 items[223] = { name:"Bride Shoes",type:"foot_armor", img:"itm_bride_shoes.png"}
 items[222] = { name:"Sarranid Shoes",type:"foot_armor", img:"itm_sarranid_boots_a.png"}
 items[382] = { name:"Worn Robe",type:"body_armor", img:"itm_sarranid_cloth_robe_b.png"}
 items[381] = { name:"Worn Desert Robe",type:"body_armor", img:"itm_sarranid_cloth_robe.png"}
 items[299] = { name:"Red Turret Hat",type:"head_armor", img:"itm_court_hat.png"}
 items[298] = { name:"Blue Turret Hat",type:"head_armor", img:"itm_turret_hat_blue.png"}
 items[294] = { name:"Plain Turret Hat",type:"head_armor", img:"itm_turret_hat_ruby.png"}
 items[267] = { name:"Felt Cap",type:"head_armor", img:"itm_felt_hat_b.png"}
 items[266] = { name:"Felt Hat",type:"head_armor", img:"itm_felt_hat.png"}
 items[265] = { name:"Fur Hat",type:"head_armor", img:"itm_fur_hat.png"}
 items[264] = { name:"Woolen Hood",type:"head_armor", img:"itm_woolen_hood.png"}
 items[162] = { name:"Cudgel",type:"one_handed", img:"itm_cudgel.png"}
 items[433] = { name:"Bride Dress",type:"body_armor", img:"itm_bride_dress.png"}
 items[432] = { name:"Black Sarranid Dress",type:"body_armor", img:"itm_sarranid_common_dress_b.png"}
 items[431] = { name:"Sarranid Dress",type:"body_armor", img:"itm_sarranid_common_dress.png"}
 items[430] = { name:"Orange Sarranid Lady Dress",type:"body_armor", img:"itm_sarranid_lady_dress_b.png"}
 items[429] = { name:"Purple Sarranid Lady Dress",type:"body_armor", img:"itm_sarranid_lady_dress.png"}
 items[428] = { name:"Khergit Leather Lady Dress",type:"body_armor", img:"itm_khergit_lady_dress_b.png"}
 items[427] = { name:"Khergit Lady Dress",type:"body_armor", img:"itm_khergit_lady_dress.png"}
 items[426] = { name:"Green Dress",type:"body_armor", img:"itm_green_dress.png"}
 items[425] = { name:"Brown Dress",type:"body_armor", img:"itm_brown_dress.png"}
 items[424] = { name:"Red Dress",type:"body_armor", img:"itm_red_dress.png"}
 items[423] = { name:"Blue Lady Dress",type:"body_armor", img:"itm_lady_dress_blue.png"}
 items[422] = { name:"Green Lady Dress",type:"body_armor", img:"itm_lady_dress_green.png"}
 items[421] = { name:"Red Lady Dress",type:"body_armor", img:"itm_lady_dress_ruby.png"}
 items[415] = { name:"Rich Outfit",type:"body_armor", img:"itm_rich_outfit.png"}
 items[414] = { name:"Court Dress",type:"body_armor", img:"itm_court_dress.png"}
 items[402] = { name:"Nobleman Outfit",type:"body_armor", img:"itm_nobleman_outfit.png"}
 items[401] = { name:"Courtly Outfit",type:"body_armor", img:"itm_courtly_outfit.png"}
 items[379] = { name:"Robe",type:"body_armor", img:"itm_robe.png"}
 items[377] = { name:"Rawhide Coat",type:"body_armor", img:"itm_rawhide_coat.png"}
 items[365] = { name:"Nord Nobleman Outfit",type:"body_armor", img:"itm_burlap_tunic.png"}
 items[378] = { name:"Pelt Coat",type:"body_armor", img:"itm_pelt_coat.png"}
 items[268] = { name:"Arming Cap",type:"head_armor", img:"itm_arming_cap.png"}
 items[161] = { name:"Wooden Stick",type:"one_handed", img:"itm_wooden_stick.png"}
 items[371] = { name:"Woolen Dress",type:"body_armor", img:"itm_woolen_dress.png"}
 items[295] = { name:"Barbette",type:"head_armor", img:"itm_turret_hat_green.png"}
 items[263] = { name:"Woolen Cap",type:"head_armor", img:"itm_woolen_cap.png"}
 items[220] = { name:"Blue Hose",type:"foot_armor", img:"itm_blue_hose.png"}
 items[489] = { name:"Practice Dagger",type:"one_handed", img:"itm_wooden_dagger.png"}
 items[413] = { name:"Yellow Tunic",type:"body_armor", img:"itm_coat_with_cape.png"}
 items[412] = { name:"White Tunic",type:"body_armor", img:"itm_thick_coat.png"}
 items[376] = { name:"Blue Tunic",type:"body_armor", img:"itm_blue_tunic.png"}
 items[375] = { name:"Green Tunic",type:"body_armor", img:"itm_green_tunic.png"}
 items[374] = { name:"Red Tunic",type:"body_armor", img:"itm_red_tunic.png"}
 items[373] = { name:"Red Shirt",type:"body_armor", img:"itm_red_shirt.png"}
 items[372] = { name:"Short Tunic",type:"body_armor", img:"itm_short_tunic.png"}
 items[370] = { name:"Tunic with Green Cape",type:"body_armor", img:"itm_tunic_with_green_cape.png"}
 items[368] = { name:"Peasant Dress",type:"body_armor", img:"itm_peasant_dress.png"}
 items[367] = { name:"Blue Dress",type:"body_armor", img:"itm_blue_dress.png"}
 items[366] = { name:"Dress",type:"body_armor", img:"itm_dress.png"}
 items[284] = { name:"Sarranid Felt Hat",type:"head_armor", img:"itm_sarranid_felt_hat.png"}
 items[219] = { name:"Woolen Hose",type:"foot_armor", img:"itm_woolen_hose.png"}
 items[369] = { name:"Linen Tunic",type:"body_armor", img:"itm_linen_tunic.png"}
 items[364] = { name:"Shirt",type:"body_armor", img:"itm_shirt.png"}
 items[280] = { name:"Wimple with Veil",type:"head_armor", img:"itm_wimple_with_veil.png"}
 items[279] = { name:"Wimple",type:"head_armor", img:"itm_wimple_a.png"}
 items[262] = { name:"Crown of Flowers",type:"head_armor", img:"itm_bride_crown.png"}
 items[261] = { name:"Khergit Lady Leather Hat",type:"head_armor", img:"itm_khergit_lady_hat_b.png"}
 items[260] = { name:"Khergit Lady Hat",type:"head_armor", img:"itm_khergit_lady_hat.png"}
 items[259] = { name:"Headcloth",type:"head_armor", img:"itm_headcloth.png"}
 items[258] = { name:"Head Cloth",type:"head_armor", img:"itm_sarranid_felt_head_cloth_b.png"}
 items[257] = { name:"Brown Head Cloth",type:"head_armor", img:"itm_sarranid_felt_head_cloth.png"}
 items[256] = { name:"Orange Lady Head Cloth",type:"head_armor", img:"itm_sarranid_head_cloth_b.png"}
 items[255] = { name:"Purple Lady Head Cloth",type:"head_armor", img:"itm_sarranid_head_cloth.png"}
 items[23] = { name:"Stones",type:"throwing", img:"itm_stones.png"}
 items[283] = { name:"Head Wrapping",type:"head_armor", img:"itm_head_wrappings.png"}
 items[273] = { name:"Straw Hat",type:"head_armor", img:"itm_straw_hat.png"}
 items[218] = { name:"Wrapping Boots",type:"foot_armor", img:"itm_wrapping_boots.png"}
 items[5162] = { name:"Deli Cap",type:"head_armor", img:"itm_deli_cap.png"}
 items[5161] = { name:"Solak Helmet",type:"head_armor", img:"itm_solak_helmet3.png"}
 items[5160] = { name:"Crested Solak Helmet",type:"head_armor", img:"itm_solak_helmet2.png"}
 items[5163] = { name:"Boerk",type:"head_armor", img:"itm_boerk.png"}
 items[5159] = { name:"Solak Helmet",type:"head_armor", img:"itm_solak_helmet.png"}
 items[5165] = { name:"Crested Boerk with Plume",type:"head_armor", img:"itm_boerk3.png"}
 items[5164] = { name:"Crested Boerk",type:"head_armor", img:"itm_boerk2.png"}
 items[5168] = { name:"Kazakh Hat",type:"head_armor", img:"itm_kazakhhat.png"}
 items[5155] = { name:"Red Arena Helmet",type:"head_armor", img:"itm_red_arena_helmet.png"}
 items[5156] = { name:"Blue Arena Helmet",type:"head_armor", img:"itm_blue_arena_helmet.png"}
 items[5157] = { name:"Green Arena Helmet",type:"head_armor", img:"itm_green_arena_helmet.png"}
 items[5158] = { name:"Blue Steppe Helmet",type:"head_armor", img:"itm_blue_steppe_helmet.png"}
 items[5154] = { name:"Yellow Tournament Helmet",type:"head_armor", img:"itm_yellow_tournament_helmet.png"}
 items[5166] = { name:"Chichak",type:"head_armor", img:"itm_chichak.png"}
 items[5167] = { name:"Elite Cavalry Chichak",type:"head_armor", img:"itm_chichak2.png"}
 items[5169] = { name:"Kazakh Outfit",type:"body_armor", img:"itm_kazakh_torso.png"}
 items[5153] = { name:"Kazakh Boots",type:"foot_armor", img:"itm_kazakh_boots.png"}
 
 // heirlooms
 items[3851] = { name:"Masterpiece Knightly Heater Shield",type:"shield", img:"itm_tab_shield_heater_cav_b.png"}
 items[1669] = { name:"Reinforced Wisby Gauntlets",type:"hand_armor", img:"itm_wisby_gauntlets.png"}
 items[1668] = { name:"Thick Wisby Gauntlets",type:"hand_armor", img:"itm_wisby_gauntlets.png"}
 items[3800] = { name:"Masterwork Awlpike",type:"polearm", img:"itm_awlpike.png"}
 items[3212] = { name:"Masterwork Italian Sword",type:"one_handed", img:"itm_italian_sword.png"}
 
//var head = document.getElementsByTagName("head")[0];
  
if (typeof GM_deleteValue == 'undefined')
{
  GM_addStyle = function(css)
  {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
  }

  GM_deleteValue = function(name)
  {
    localStorage.removeItem(name);
  }

  GM_getValue = function(name, defaultValue)
  {
	var value = localStorage.getItem(name);
	if (!value) return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type)
	{
	  case 'b': return value == 'true';
      case 'n': return Number(value);
      default:  return value;
	}
  }

  GM_setValue = function(name, value)
  {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  }
}
 
var css_text = GM_getResourceText("styles");
GM_addStyle(css_text);

function arrayIndexOf(array, elt)
{
    var len = array.length;

    for (var from = 0; from < len; from++)
    {
      if (from in array && array[from] === elt)
        return from;
    }
	
    return -1;
}

try
{
	var infos = findElement("LI", {className:"info"});
	var totalGold = 0;
	var totalTroops = 0;
	var totalMembers = 0;

	var numbersRegex = new RegExp("\\d+");
	var rows = 4;

	if(infos.length > 0)
	{	
		var ulElem = infos[0].parentNode;

		if(ulElem.tagName == "FORM")
		{
			var saveRangs = ulElem.parentNode.nextSibling;
			
			if(saveRangs.tagName == "INPUT")
			{		
				saveRangs.parentNode.removeChild(saveRangs);
				ulElem.appendChild(saveRangs);
			}
			
			ulElem = ulElem.parentNode;
		}
		var filterDiv = addNewElement("div", 0, {style:"border-bottom:solid black 2px; position: relative;"});
		var nameDiv = addNewElement("div", filterDiv, {style:"display:inline-block;cursor:pointer;", innerHTML:"Name"});
		var rightDiv = addNewElement("div", filterDiv, {style:"display:inline-block; right:0px; position: absolute;"});
		var itemsDiv = addNewElement("div", rightDiv, {style:"cursor:pointer;", className : "itemsDiv chestIcon", innerHTML:"Items"});
		var goldDiv = addNewElement("div", rightDiv, {style:"cursor:pointer;", className : "goldDiv goldIcon", innerHTML:"Gold"});
		var troopsDiv = addNewElement("div", rightDiv, {style:"cursor:pointer;", className : "troopDiv troopsIcon", innerHTML:"Troops"});
		var rankDiv = addNewElement("div", rightDiv, {style:"cursor: pointer;", className : "rankDiv scrollIcon", innerHTML:"Rank"});
		
		nameDiv.addEventListener("click", function(){ sortItems(infos[0].parentNode, "LI", compareByName ); }, true);
		itemsDiv.addEventListener("click", function(){ sortItems(infos[0].parentNode, "LI", compareByItems ); }, true);
		goldDiv.addEventListener("click", function(){ sortItems(infos[0].parentNode, "LI", compareByGold); }, true);
		troopsDiv.addEventListener("click", function(){ sortItems(infos[0].parentNode, "LI", compareByTroops ); }, true);
		rankDiv.addEventListener("click", function(){ sortItems(infos[0].parentNode, "LI", compareByRank ); }, true);
		
		ulElem.className = "evenOdd";
		ulElem.parentNode.insertBefore(filterDiv, ulElem);
	}
		
	for(var i = 0; i < infos.length; i++)
	{
		var el = infos[i];
		
		if(el.firstChild.textContent.indexOf("wants to join your faction") < 0)
		{
			var fationMember = new Object();
			var aItem = addNewElement("div", 0, {className:"member"});
			var divItem = addNewElement("div", 0, { id:"info" + i, style:"display:none" });
			
			var totalDiv = addNewElement("div", aItem, {className: "memberInfo"});
			var upkeepDiv = addNewElement("div", totalDiv, {className:"upkeepDiv"});
			var itemsDiv = addNewElement("div", totalDiv, {className : "itemsDiv chestIcon"});
			var goldDiv = addNewElement("div", totalDiv, {className : "goldDiv goldIcon"});
			var troopsDiv = addNewElement("div", totalDiv, {className : "troopDiv troopsIcon"});
			var rankDiv = addNewElement("div", totalDiv, {className : "rankDiv scrollIcon"});
			
			aItem.setAttribute("ctrId", "info" + i);
			aItem.addEventListener("click", expand, true);
			
			moveElementUntilSpliter(el, aItem, "BR", 0, true, 0);
			fationMember.name = aItem.textContent;
			moveElementUntilSpliter(el, troopsDiv, "BR", 0, true, 0);
			moveElementUntilSpliter(el, goldDiv, "BR", 0, true, 0);
			moveElementUntilSpliter(el, rankDiv, "BR", 0, true, 0);

			var infoItem = 0;
			
			fationMember.gold = parseInt(numbersRegex.exec(goldDiv.textContent), 10);
			goldDiv.textContent = commafy(fationMember.gold);
			
			fationMember.troops = parseInt(numbersRegex.exec(troopsDiv.textContent), 10);
			troopsDiv.textContent = commafy(fationMember.troops);
			
			fationMember.rank = 0;
			
			var rankInput = findFirstElementIn(rankDiv, "INPUT", 0);
			
			if(rankInput)
			{
				fationMember.rank = parseInt(numbersRegex.exec(rankInput.value), 10);
				fationMember.id = parseInt(rankInput.name.slice(5,-1));
			}
			else
			{
				fationMember.rank = parseInt(numbersRegex.exec(rankDiv.textContent), 10);
				fationMember.id = -1;
			}
			
				
			factionMembers.push(fationMember);
			
			totalGold += fationMember.gold;
			totalTroops += fationMember.troops;
			totalMembers ++;

			el.setAttribute("gold", fationMember.gold);
			el.setAttribute("troops", fationMember.troops);
			el.setAttribute("rank", fationMember.rank);
			
			var eqCount = 0;
			var eqTypeCount = 0;
			var personItems = new Array();
			
			for(var j = 0; j < el.childNodes.length; j += 2)
			{
				var text = el.childNodes[j].textContent;
				
				if(el.childNodes[j].tagName == "B")
				{
					infoItem = el.appendChild(el.childNodes[j]);
					el.removeChild(infoItem);
				}
				else if(text != "")
				{					
					var splitter = text.indexOf(" ");
					var itemsCount = parseInt(text.substr(0, splitter).replace(/,/g, ""), 10);
					var itemsName = text.substr(splitter + 1);
					var item = getItemByName(itemsName, true);					
					item.number = itemsCount;					
					personItems.push(item);					
					
					eqTypeCount++;
					eqCount += itemsCount;
				}
			}
			
			showItemList(personItems, divItem);
			
			

			if(eqCount > 0)
				itemsDiv.innerHTML = eqCount + "/" + eqTypeCount;
			
			var goldPerDay = Math.ceil((Math.pow(fationMember.troops, 1.03) * 1.8 - 100)/24);
			
			if(goldPerDay > 0)
			{
				var hours = Math.ceil(fationMember.gold / goldPerDay);

				if(hours < 24)
				{
					upkeepDiv.style.cssText = "color:red; font-weight:bold;";
					upkeepDiv.innerHTML = hours + "h"		
				}else if(hours < 48)
				{
					upkeepDiv.style.cssText = "color: darkred; font-weight:bold;";
				}
				if((hours / 24) < 50)
				{
					upkeepDiv.innerHTML = Math.floor(hours / 24) + "d " + hours % 24 + "h";		
				}
			

			}

			el.innerHTML = "";
			el.appendChild(aItem);
			el.setAttribute("items", eqCount);

			if(infoItem)
				el.appendChild(infoItem);

			el.appendChild(divItem);
		}
	}
	
	document.getElementsByTagName("H1")[0].innerHTML = "";

	var rootTable = findElement("TABLE", {className:"news"})[0];
	var firstPane = rootTable.rows[0].cells[0];
	var secondPane = rootTable.rows[0].cells[1];

	if(totalGold && totalTroops)
	{
		var totalInfo = document.createElement("div");
		secondPane.insertBefore(totalInfo, secondPane.childNodes[2]);
		totalInfo.innerHTML += "<b><div class='goldIcon' style='width: 200px !important; text-align: left;'>Total Gold: " 
			+ commafy(totalGold) + "</div><br><div class='troopsIcon' style='width: 200px !important; text-align: left;'>Total Troops: " + commafy(totalTroops) + "</div><br/>" +
			"<div class='scrollIcon' style='width: 200px !important; text-align: left;'>Total Members: " + commafy(totalMembers) + "</div></b><br/>";
	}

	var buyMenuItems = findElement("INPUT", {type:"submit", name:"doBuy"})[0];
	var sellMenuItems = findElement("INPUT", {type:"submit", name:"doSell"})[0];
	var allowTransfer = findElement("INPUT", {type:"submit", name:"allowTransfer"})[0];
	var doTransfer = findElement("INPUT", {type:"submit", name:"transfer[do]"});
	var doConvert = findElement("INPUT", {type:"submit", name:"convert[do]"});
	var doFief = findElement("INPUT", {type:"submit", name:"fief[do]"});

	if(buyMenuItems)
		updateItems(buyMenuItems.form.firstChild, "buy", 2, 1);

	if(sellMenuItems)
		updateItems(sellMenuItems.form.firstChild, "sell", 3, 0);

	var charInfoDiv = addNewElement("div", document.body, {id: "charInfo", className: "block" });

	moveElementUntilSpliter(firstPane, charInfoDiv, "H3", "Weapons", false, 0);
	
	var myInfo = charInfoDiv.textContent;
	var myGold = myInfo.match(/Gold: (\d*)/);
	var myTroops = myInfo.match(/Troops: (\d*)/);
	var myGoods = myInfo.match(/Goods: (\d*)/);
	var mySpeed = myInfo.match(/Speed: (\d*\.?\d+)/);
	var myPath = myInfo.match(/Action: .+ \[(\d*,?\d+)\m]/);

	myGold = myGold && myGold.length > 1 ? myGold[1] : 0;
	myTroops = myTroops && myTroops.length > 1 ? myTroops[1] : 0;
	myGoods = myGoods && myGoods.length > 1 ? myGoods[1] : 0;
	mySpeed = mySpeed && mySpeed.length > 1 ? mySpeed[1] : 0;
	myPath = myPath && myPath.length > 1 ? myPath[1] : 0;
	
	if(myPath)
	{
		myPath = parseInt(myPath.replace(',',''), 10);
		mySpeed = parseFloat(mySpeed);

		var time = myPath / mySpeed;
		
		charInfoDiv.innerHTML += "<br><b>Travel time :</b> ~" + Math.floor(time / 60) + "h " + Math.round(time % 60) + "m";
	}
	
	document.body.appendChild(createTabControl( ["Map", "Info","Buy menu", "Sell menu", "Battles", "Faction", "Transfer"], "general"));
	
	 document.getElementById("generalPages").className += " content";

	var infoPage = document.getElementById("generalPage1");
	var equipPage = document.getElementById("generalPage2");
	var sellEquipPage = document.getElementById("generalPage3");
	var battlesPage = document.getElementById("generalPage4");
	var fractionPage = document.getElementById("generalPage5");
	var transferPage = document.getElementById("generalPage6");

	var factionBattles = findElement("H3", {innerHTML:"Faction Battles"})[0];
	var archive = findElement("H3", {innerHTML:"Archive"})[0];
	var leaveBattles = findElement("A", {innerHTML:"Leave your Faction. "})[0];

	if((factionBattles || archive) && leaveBattles)
	{
		var from = arrayIndexOf(secondPane.childNodes, factionBattles ? factionBattles : archive);
		var to = arrayIndexOf(secondPane.childNodes, leaveBattles);
		moveElementsInRange(secondPane, battlesPage, from, to);
	}
	
	var isBuyPage = document.location.href.indexOf("news.php?buy") > 0;
	var isSellPage = document.location.href.indexOf("news.php#sell") > 0;
	var isBattlePage = (document.location.href.indexOf("news.php?battle=") > 0)
		||(document.location.href.indexOf("news.php#battles") > 0);
	var isTrafsferPage = document.location.href.indexOf("news.php?transfer") > 0;
	var isFactionPage = document.location.href.indexOf("news.php#faction") > 0;

	if(isTrafsferPage)
	{
		var transferLink = findElement("A", {innerHTML:"Hide Transfer Menu"})[0];
		
		if(transferLink)
		{
			var from = arrayIndexOf(firstPane.childNodes, transferLink);
			transferPage.appendChild(processPersonalTransfer(firstPane, from));
			
			var anyFiefElements = findElement("INPUT", {name:"fief[do]"});
			
			if(anyFiefElements.length > 0)
			{
				transferPage.appendChild(processFiefTransfer(firstPane, from));
			}
		}
	}

	moveElementUntilSpliter(firstPane, infoPage, 0, 0, false, 0);
	moveElementUntilSpliter(secondPane, fractionPage, 0, 0, false, 0);

	if(sellMenuItems)
		moveElement(sellMenuItems.form, sellEquipPage);
	else
		addText("No items", sellEquipPage);
		
	if(buyMenuItems)
		moveElement(buyMenuItems.form, equipPage);
		
	document.getElementById("generalTab0").href = "index.php";
	if(!isBuyPage) document.getElementById("generalTab2").href = "news.php?buy";
	if(!isTrafsferPage) document.getElementById("generalTab6").href = "news.php?transfer";
		
	if(isBuyPage)
		switchTab("generalPages", "generalTabs", 2);
	else if(isSellPage)
		switchTab("generalPages", "generalTabs", 3);
	else if(isBattlePage)
		switchTab("generalPages", "generalTabs", 4);
	else if(isFactionPage)
		switchTab("generalPages", "generalTabs", 5);
	else if(isTrafsferPage)
		switchTab("generalPages", "generalTabs", 6);
	else
		switchTab("generalPages", "generalTabs", 1);

	findElement("H3", {innerHTML:"Your Equipment List"})[0].style.display = "none";
	var personsAround =  findElement("B", {innerHTML:"You see other persons scurrying around:"});
	
	if(personsAround.length > 0)
	{
		var personsTable = personsAround[0];
		
		while(personsTable.tagName != "TABLE")
			personsTable = personsTable.nextSibling;
		
		for(var i = 0; i < personsTable.rows.length; i++)
		{
			var personRow = personsTable.rows[i];
			var member = findFactionMamberByName(personRow.cells[0].textContent);
			
			var pTroops = personRow.cells[2].innerHTML.slice(0,-7);
			personRow.cells[2].innerHTML = "";
			addNewElement('div', personRow.cells[2], {innerHTML: commafy(pTroops), className: "troopsIcon"});
			
			if(personRow.cells.length > 3 && indexOfElement(personRow.cells[3], "button", 0))
			{
				personRow.cells[3].firstChild.textContent = 'Kick';
				personRow.cells[3].firstChild.onclick = 
					function()
					{ 
						return confirm("Are you sure you want to kick " + this.parentNode.parentNode.cells[0].textContent + "?");
					};
			}
			
			var goldButtCell = personRow.insertCell(3);
			var goldCell = personRow.insertCell(3);
			if(member)
			{
				personRow.style.background = "rgba(0, 66, 0, 0.25)";
				
				var gDiv = addNewElement('div', goldCell);
				gDiv.innerHTML = commafy(member.gold);
				gDiv.className = "goldIcon";
				
				if(member.gold < 1500)
				{
					goldCell.style.color = "red"; 
					goldCell.style.fontWeight = "bold";
					
					var butt = addNewElement('button', goldButtCell, 
						{
							innerHTML: '<div class="goldIcon">500</div>',
							style: 'vertical-align: middle; padding: 0px;'
						});
					
					butt.disabled = 'disabled';
					
					butt.onclick = function()
					{
						if(!confirm("Are you sure you want to send 500 gold to " + this.parentNode.parentNode.cells[0].textContent + "?"))
						{
							return;
						}
						
						//////do magic
					};
				}
			}
		}
	}
	
	document.body.removeChild(rootTable);

	if(document.body.childNodes[3].tagName == "B")
	{
		document.body.childNodes[3].style.width = "95%";
		document.body.childNodes[3].style.textAlign = 'right';
		document.body.childNodes[3].style.top = '30px';
		document.body.childNodes[3].style.position = "absolute";
	}

}
catch(err)
{	
	addNewElement("div", document.body, {id:"errorDiv", style:"position:absolute;left:10px;top:100px"}).innerHTML += "<b>Oops... " + err + "; line:" + err.lineNumber + ". Post it to help with script.<b>";
}

function findFactionMamberByName(name)
{
	for(var k in factionMembers)
		if(factionMembers[k].name == name)
			return factionMembers[k];
			
	return 0;
}

function processPersonalTransfer(container, from)
{
	var itemContainer  = document.createElement("div");
	itemContainer.className = "transferContainer";
	
	moveElementsInRange(container, itemContainer, from, from + 4);
	
	while(container.childNodes[from].tagName == "FORM")
		moveElementsInRange(container, itemContainer, from, from + 1);

	var baseOptions = addNewElement("div", itemContainer);
	var transferItems = addNewElement("div", itemContainer, {id:"transferItems"});
		
	newAElement("aTroops", "<img src='http://c-rpg.net/img/equip_head.png'/>", 
		function(){selectToTransfer("Troops", myTroops);}, baseOptions, "javascript:");
	newAElement("aGold", "<img src='http://c-rpg.net/img/equip_inv.png'/>", 
		function(){selectToTransfer("Gold", myGold);}, baseOptions, "javascript:");
	newAElement("aGoods", "<img src='http://c-rpg.net/img/equip_market.png'/>", 
		function(){selectToTransfer("Goods", myGoods);}, baseOptions, "javascript:");

	var showHide = newAElement("aGoods", "Show/Hide items", expand, baseOptions, "javascript:");
	showHide.setAttribute("ctrId", "transferItems");
	showHide.style.align = "right";
	
	showItemList(myItems, transferItems, selectItemToTransfer);
	
	return itemContainer;
}

function processFiefTransfer(container, from)
{
	var itemContainer  = addNewElement("div", 0, {className:"fiefItem"});
	var itemInfoDiv = addNewElement("div", itemContainer, {className:"memberInfo"});

	moveElementsInRange(container, itemInfoDiv, from, from + 1);

	var goldDiv = addNewElement("div", itemInfoDiv, {className : "goldIcon", style: "text-align: left; width: 120px;"});
	var troopsDiv = addNewElement("div", itemInfoDiv, {className : "troopsIcon", style: "text-align: left; width: 110px;"});
	var rankDiv = addNewElement("div", itemInfoDiv, {className : "scrollIcon", style: "text-align: left; width: 130px;"});
	var itemsDiv = addNewElement("div", 0);

	moveElementUntilSpliter(container, rankDiv, "BR", 0, true, from);
	moveElementUntilSpliter(container, troopsDiv, "BR", 0, true, from);
	moveElementUntilSpliter(container, goldDiv, "BR", 0, true, from);
	
	for(; from < container.childNodes.length;)
	{
		var node = container.childNodes[from];
		var text = node.textContent;

		if(node.tagName && node.tagName != "BR")
		{
			break;
		}
		else if(text != "")
		{
			var splitter = text.indexOf(" ");
			var itemsCount = parseInt(text.substr(0, splitter).replace(/,/g, ""), 10);
			var itemsName = text.substr(splitter + 1);
			
			var item = getItemByName(itemsName, true);
			item.number = itemsCount;	
			item.id = fiefItems.length;
			fiefItems.push(item);			
		}
		container.removeChild(node);
	}	
	
	showItemList(fiefItems, itemsDiv, selectFiefItemToTransfer);
	
	for(; from < container.childNodes.length;)
	{
		var node = container.childNodes[from];

		if(node.tagName == "FORM")
		{
			container.removeChild(node);
			itemContainer.appendChild(node);
		}
		else
		{
			break;
		}
	}
	
	itemContainer.appendChild(itemsDiv);

	return itemContainer;
}

function getTypeCaption(type)
{
	var i;
	for(i in itemTypes)
	{
		if(itemTypes[i] == type) return itemTypeTitles[i];
	}
}

function showItemList(list, targElem, handler)
{
	
	list.sort( function(a, b) {return b.number - a.number;} );
	var types = new Array();	
	for(var i in list)
	{
		if(types[list[i].type] == undefined)
		{		
			var t = new Object();
			t.totalNumber = 0;
			t.div = addNewElement("div", targElem, 
				{	
					style: "background-color: rgba(0, 0, 0, 0.15); margin: 5px 0px;"
				});
			t.name = getTypeCaption(list[i].type);
			types[list[i].type] = t;
			
			t.counterDiv = addNewElement("div", t.div, 
				{
					style: ""
				});	
		}	
		types[list[i].type].totalNumber += list[i].number;
		var itemElement = addItemElement(list[i], types[list[i].type].div, "Number: <strong>" + commafy(list[i].number) + "</strong>");
		
		if(handler)
		{
			itemElement.setAttribute("item", i);
			itemElement.style.cursor = "pointer";
			itemElement.addEventListener("click", handler, true);
		}
		
	}
	
	for(var i in types)
	{
		types[i].counterDiv.innerHTML = types[i].name + " (Total: " + commafy(types[i].totalNumber) + ")";
	}
}

function selectToTransfer(name, number)
{
	var selectsType = findElement("SELECT", {name:"transfer[type]"});
	var selectsAmount = findElement("INPUT", {name:"transfer[amount]"});

	for(var j = 0; j < selectsAmount.length; j ++)
		selectsAmount[j].value = number;
	
	for(var j = 0; j < selectsType.length; j ++)
		for(var i = 0; i < selectsType[j].options.length; i ++)
			if(selectsType[j].options[i].text == name)
			{
				selectsType[j].selectedIndex = i;
				break;
			}
}

function selectItemToTransfer(ev)
{
	var item = myItems[parseInt(ev.currentTarget.getAttribute("item"), 10)];
	selectToTransfer(item.name, item.number);
}

function selectFiefItemToTransfer(ev)
{
	var item = fiefItems[parseInt(ev.currentTarget.getAttribute("item"), 10)];
	selectToTransfer(item.name, item.number);
}

function indexOfElement(parent, tagName, from)
{
	var nodes = parent.childNodes;
	
	for(var i = from; i < nodes.length; i++)
	{
	  if(nodes[i].tagName == tagName)
		return i;
	}
	
	return -1;
}

function findFirstElementIn(parent, tagName, from)
{
	var index = indexOfElement(parent, tagName, from);
	return index < 0 ? 0 : parent.childNodes[index];
}

function addItemElement(item, container, description)
{
	var c = addNewElement("div", container, {className:"item"});
	var h = addNewElement("div", c, {className:"header"});
	var d = addNewElement("div", c, {className:"desc"});
	
	addNewElement("img", h).src = "http://www.c-rpg.net/img/items/" + item.img;
	addNewElement("div", h, {className:"name"}).innerHTML = item.name;
	
	d.innerHTML += description;
	
	return c;
}

function compareByName(v1, v2)
{
	if(v1.firstChild.lastChild) v1 = v1.firstChild.lastChild; else return 1;
	if(v2.firstChild.lastChild) v2 = v2.firstChild.lastChild; else return -1;

	return v2.textContent.toLowerCase() < v1.textContent.toLowerCase();
}

function compareByGold(v1, v2)
{
	return  parseInt(v2.getAttribute("gold"), 10) - parseInt(v1.getAttribute("gold"), 10);
}

function compareByTroops(v1, v2)
{
	return  parseInt(v2.getAttribute("troops"), 10) - parseInt(v1.getAttribute("troops"), 10);
}

function compareByRank(v1, v2)
{
	return  parseInt(v2.getAttribute("rank"), 10) - parseInt(v1.getAttribute("rank"), 10);
}

function compareByItems(v1, v2)
{
	return  parseInt(v2.getAttribute("items"), 10) - parseInt(v1.getAttribute("items"), 10);
}

function sortItems(parent, tag, compare)
{
	var nodes = new Array();
	var other = new Array();
	
	for(var i = 0; i < parent.childNodes.length; i++)
	{
		if(parent.childNodes[i].tagName == tag)
			nodes.push(parent.childNodes[i]);
		else
			other.push(parent.childNodes[i]);
	}
	
	parent.innerHTML = "";
	nodes.sort(compare);

	for(var i = 0; i < nodes.length; i++)
		parent.appendChild(nodes[i]);

	for(var i = 0; i < other.length; i++)
		parent.appendChild(other[i]);
}

function moveElement(elem,newContainer)
{
  elem.parentNode.removeChild(elem);
  newContainer.appendChild(elem);
} 

function moveElementsInRange(oldContainer, newContainer, from, to)
{
	var len = to - from;
	
	for(var i = 0; i < len && from < oldContainer.childNodes.length; i++)
	{
		var elem = oldContainer.childNodes[from];
		
		oldContainer.removeChild(elem);
		newContainer.appendChild(elem);
	}	
}

function moveElementUntilSpliter(oldContainer, newContainer, spliter, inner, remove, from)
{
	for(; oldContainer.childNodes.length > from; )
	{
		var elem = oldContainer.childNodes[from];
	
		if(spliter && (elem.tagName == spliter) && (typeof(inner) == "undefined" || elem.innerHTML == inner))
		{
			if(remove)
				oldContainer.removeChild(elem);
			return;
		}
		
		oldContainer.removeChild(elem);
		newContainer.appendChild(elem);
	}	
}

function addNewElement(tag, parent, props)
{
	var elem = document.createElement(tag);
	
	if(props)
	{
	  if(props.id) elem.id = props.id;
	  if(props.style) elem.style.cssText = props.style;
	  if(props.className) elem.className = props.className;
	  if(props.innerHTML) elem.innerHTML = props.innerHTML;
	}
	
	if(parent) parent.appendChild(elem);
	
	return elem;
}

function newAElement(id, text, onclick, parent, href)
{
	var e = document.createElement("A");
	if(id) e.id = id;
	
	if(href)
		e.href = href;
	else
		e.href = "javascript:";
		
	e.innerHTML = text;
	if(onclick) e.addEventListener("click", onclick, true);
	if(parent) parent.appendChild(e);
	return e;
}


function getItemByName(text, hloom)
{
	for(var k in items)
		if(text == items[k].name)
			return items[k];
			
	if(hloom)
	{
		var maxCompatibility = 0;
		var similarItem = 0;
	
		for(var k in items)
			if(text.indexOf(items[k].name) >= 0 && maxCompatibility < items[k].name.length)
			{
				maxCompatibility = items[k].name.length;
				similarItem = items[k];
			}
			
		if(similarItem)
			return { name:text, type:similarItem.type, img:similarItem.img}; 
	}
	
	return { name:text, type:"unknown", img:""};
}

function updateItems(container, eId, keyCell, to)
{
	var parent = container.parentNode;
	var isBuy = keyCell == 2;
	parent.removeChild(container);
	insertFirst(parent, createTabControl( ["One handed","Two handed","Polearms", "Cav Polearms", "Shields",
		"Body armor", "Head armor", "Foot armor", "Hand armor", "Throwing", "Bows", "Crossbows", "Horses", "Bolts", "Arrows", "Siege", "Misc"], eId, true));
	
	var totalPriceDiv = addNewElement("div", parent, {id:"totalPrice" + eId, style:"width:100%;", className:"itemsBagList"});
	var itemContainers = new Array();

	document.getElementById(eId + "Pages").style.maxHeight = "400px";
	
	for(var i in itemTypes)
		itemContainers[itemTypes[i]] = document.getElementById(eId + "Page" + i);
	
	var otherContainer = itemContainers["other"];
	
	for(var i = container.rows.length - 1; i >= to; i--)
	{
		var itemRow = container.rows[i];
		var itemElement = itemRow.cells[0];
		var itemKey = getItemId(itemRow.cells[keyCell].firstChild.name);
		var numberInput = itemRow.cells[keyCell].firstChild;
		var item = items[itemKey];
		
		if((eId == "sell") && (typeof item == 'undefined'))
		{
			item = getItemByName(itemElement.textContent.replace(/^\s+|\s+$/g,""), true);
			items[itemKey] = item;
		}
		
		if(item)
		{
			var description = itemRow.cells[1].textContent;
			var priceOffset = "Price:".length;
			var priceSplitter = description.indexOf(", D");
			var difOffset = description.indexOf("Difficulty: ") + "Difficulty: ".length;
			var price = parseFloat(description.substring(priceOffset, priceSplitter).replace(",", ""));
			
			if(eId == "sell")
				item.sellPrice = price;
			else 
				item.price = price;

			item.difficulty = parseInt(description.substring(difOffset).replace(",", ""), 10);
			
			var desc = "Price: <strong>" + price + "</strong><br>Difficulty: <strong>" + item.difficulty + "</strong>";
			
			if(keyCell == 3)
			{
				desc += "<br>Number:<strong>" + itemRow.cells[2].textContent + "</strong>";
				item.number = parseInt(itemRow.cells[2].textContent.replace(",", ""), 10);
			}
			
			var cont = itemContainers[item.type];
			var itemCont = undefined;
			
			if(cont)
				itemCont = addItemElement(item, itemContainers[item.type], desc);
			else
				itemCont = addItemElement(item, otherContainer, desc);
				
			itemCont.appendChild(numberInput);
			numberInput.addEventListener("change", onUpdateTotalPrice, true);
			itemCont.appendChild(document.createElement("br"));
			newAElement("", "[+10]", function(ev){ addValue(ev, 10, true) }, itemCont).setAttribute("eqName", numberInput.name);
			if(isBuy)
			{
				newAElement("", "[+100]", function(ev){ addValue(ev, 100, true) }, itemCont).setAttribute("eqName", numberInput.name);
			}
			else
			{
				newAElement("", "[ALL]", function(ev){ addValue(ev, "all", false) }, itemCont).setAttribute("eqName", numberInput.name);
			}
			itemCont.appendChild(document.createElement("br"));
			newAElement("", "[REMOVE]", function(ev){ addValue(ev, 0, false) }, itemCont).setAttribute("eqName", numberInput.name);
			
			
			if(eId == "sell")
				myItems.push(item);
		
		}
		else
		{
			insertFirst(otherContainer, itemRow);
		}
	}
	
	if(eId == "sell")
		switchTab(eId + "Pages", eId + "Tabs", 14, true);
	else
		switchTab(eId + "Pages", eId + "Tabs", 0);

	updateTotalPriceDiv(eId);
}

function addValue(ev, num, add)
{
	if(num == "all")
	{
		num = items[getItemId(ev.target.getAttribute("eqName"))].number;
	}
	
	var el = document.getElementsByName(ev.target.getAttribute("eqName"))[0];
	el.value = num + (add ? parseInt(el.value, 10) : 0);
	updateTotalPriceOfEl(el);
}

function onUpdateTotalPrice(ev)
{
	updateTotalPriceOfEl(ev.target);
}

function updateTotalPriceOfEl(el)
{
	var itemId = getItemId(el.name);
	var item = items[itemId];

	if(el.name.indexOf("buy") == 0)
	{
		itemsToBuy[itemId] = el.value;
		updateTotalPriceDiv("buy");
	}
	else
	{
		itemsToSell[itemId] = el.value;
		updateTotalPriceDiv("sell");
	}
}

function saveItems(type, slot)
{
	var value = "";
	var eqItems = type == "buy" ? itemsToBuy : itemsToSell;
	
	for(var k in eqItems)
	{
		value += k + ":" + itemsToBuy[k] + ";";
	}

	GM_setValue("itemsTo" + type + slot, value);
}

function loadItems(type, slot)
{
  var value = GM_getValue("itemsTo" + type + slot, "");
  var items = value.split(";");
  
  clearAll(type);
  
  for(var i = 0; i < items.length; i ++)
  {
	var parts = items[i].split(":");
	var eqName = type + "[" + parts[0] + "]";
	
	var el = document.getElementsByName(eqName)[0];
	el.value = parseInt(parts[1], 10);
	updateTotalPriceOfEl(el);
  }  
}

function clearAll(type)
{
	var eqItems = type == "buy" ? itemsToBuy : itemsToSell;

	for(var k in eqItems)
	{
		var el = document.getElementsByName(type + "[" + k + "]")[0];
		el.value = 0;
		updateTotalPriceOfEl(el);
	}
}

function addText(text, cont)
{
	cont.appendChild(document.createTextNode(text));
}

function updateTotalPriceDiv(divId)
{
	var totalPriceDiv = document.getElementById("totalPrice" + divId);
	
	if(totalPriceDiv)
	{
		var total = 0;
		var isBuy = divId == "buy";
		var eqItems = isBuy ? itemsToBuy : itemsToSell;
		var aItem = document.getElementById("itemsLink" + divId);
		var divItem = document.getElementById("items" + divId);

		if(aItem == undefined)
		{
			aItem = addNewElement("span", totalPriceDiv, {id:"itemsLink" + divId});
			
			if(isBuy)
			{
				newAElement("", "[SAVE 1]", function(){ saveItems("buy", 1) }, totalPriceDiv);
				newAElement("", "[LOAD 1]", function(){ loadItems("buy", 1) }, totalPriceDiv);
				newAElement("", "[SAVE 2]", function(){ saveItems("buy", 2) }, totalPriceDiv);
				newAElement("", "[LOAD 2]", function(){ loadItems("buy", 2) }, totalPriceDiv);
				newAElement("", "[SAVE 3]", function(){ saveItems("buy", 3) }, totalPriceDiv);
				newAElement("", "[LOAD 3]", function(){ loadItems("buy", 3) }, totalPriceDiv);
				newAElement("", "[CLEAR]", function(){ clearAll("buy"); }, totalPriceDiv);
			}
			else
			{
				newAElement("", "[CLEAR]", function(){ clearAll("sell"); }, totalPriceDiv);
			}
		}

		if(divItem == undefined)
			divItem = addNewElement("div", totalPriceDiv, {id:"items" + divId});
		
		divItem.innerHTML = "";
		
		for(var k in eqItems)
		{
			var number = eqItems[k];

			if(number > 0)
			{
				var item = items[k];
				var price = (isBuy ? item.price : item.sellPrice) * number;
				price = isBuy ? Math.ceil(price) : Math.round(price);
				total += price;
				
				var desc = "Number: <strong>" + number + "</strong><br>Total price: <strong>" + price + "</strong><br>Difficulty: <strong>" + item.difficulty + "</strong>"
				var cont = addItemElement(item, divItem, desc);
				var removeContainer = addNewElement("center", cont);
				var removeItem = newAElement("", "[REMOVE]", function(ev){ addValue(ev, 0, false); }, removeContainer);
				removeItem.setAttribute("eqName", divId + "[" + k + "]");
			}
		}
		
		aItem.innerHTML = "Total Price - " + total + " gold";
	}
}

function findElement(tag, attrs)
{
	var res = new Array();
	var tags = document.getElementsByTagName(tag);
   
	for(var i = 0; i < tags.length; i++)
	{
		var el = tags[i];
   
		if(attrs.className && el.className != attrs.className) continue;
		if(attrs.innerHTML && el.innerHTML != attrs.innerHTML) continue;
		if(attrs.type && el.type != attrs.type) continue;
		if(attrs.name && el.name != attrs.name) continue;
		if(attrs.href && el.href != attrs.href) continue;
   
		res.push(el);
	}
   
	return res;
}


function getItemId(text)
{
	if(text)
	{
		var from = text.indexOf("[") + 1;
		var to = text.indexOf("]");
	
		return text.substring(from, to);
	}
	
	return parseInt(text, 10);
}

function insertFirst(con, elem)
{
	if(con.firstChild)
		con.insertBefore(elem,con.firstChild);
	else
		con.appendChild(elem);
}

function switchTab(pages, items, item, all)
{
   var tabPages = document.getElementById(pages);
   var tabItems = document.getElementById(items);
 
   if(all)
   {
     for(var i = 0; i < tabPages.childNodes.length; i++)
             tabPages.childNodes[i].className = "";
   }
   else
   {
     for(var i = 0; i < tabPages.childNodes.length; i++)
             tabPages.childNodes[i].className = (i == item) ? "" : "hiddenTab";
   }

   for(var i = 0; i < tabItems.childNodes.length; i++)
           tabItems.childNodes[i].className = (i == item) ? "selectedItem" : "";
}

function onTabSwitchAll(ev)
{
	var el = ev.target;
	switchTab(el.getAttribute("pages"), el.getAttribute("tabs"), el.getAttribute("page"), true);
}

function onTabSwitch(ev)
{
	var el = ev.target;
	switchTab(el.getAttribute("pages"), el.getAttribute("tabs"), el.getAttribute("page"), false);
}

function createTabControl(tabs, elemId, all)
{
	var control = addNewElement("div", 0, {id:elemId});
	var tabsControl = addNewElement("div", control, {id:elemId + "Tabs"});
	var pagesControl = addNewElement("div", control, {id:elemId + "Pages"});
	
	control.className = "tabs";
	tabsControl.className = "tabItems";
	pagesControl.className = "border red";
	
	for(var i = 0; i < tabs.length; i ++)
	{
		var pageItem = document.createElement("div");
		var aItem = document.createElement("a");
		
		aItem.id = elemId + "Tab" + i;
		aItem.href = "javascript:";
		aItem.innerHTML = tabs[i];
		aItem.setAttribute("tabs", tabsControl.id);
		aItem.setAttribute("pages", pagesControl.id);
		aItem.setAttribute("page", i);
		aItem.addEventListener("click", onTabSwitch, true);
		
		pageItem.id = elemId + "Page" + i;

		tabsControl.appendChild(aItem);
		pagesControl.appendChild(pageItem);
	}	
	
	if(all)
	{
		var aItem = document.createElement("a");
		
		aItem.href = "javascript:";
		aItem.innerHTML = "ALL";
		aItem.setAttribute("tabs", tabsControl.id);
		aItem.setAttribute("pages", pagesControl.id);
		aItem.setAttribute("page", i);
		aItem.addEventListener("click", onTabSwitchAll, true);
		
		tabsControl.appendChild(aItem);
	}
	
	return control;
}

function addScript(scriptText)
{
	var s = document.createElement("script");
	s.innerHTML = scriptText;
	document.head.appendChild(s);
}

function expand(ev)
{
	if(ev.target.tagName == "INPUT")
		return;
		
	var el = document.getElementById(ev.currentTarget.getAttribute("ctrId"));
	  
	if(el.style.display == "none")
	{
		el.style.display = "block";
	}
	else
	{
		el.style.display = "none";
	}
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    return str.join('.');
}


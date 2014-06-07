// ==UserScript==
// @name           cRPG Market images
// @namespace      crpg
// @include        http://www.c-rpg.net/index.php?page=equip&cat=market
// @include        http://c-rpg.net/index.php?page=equip&cat=market
// ==/UserScript==

var items = new Array();

 items["527"] = { name:"Plated Charger",type:"horse", img:"img/items/large/itm_charger_plate.png"}
 items["526"] = { name:"Mamluk Horse",type:"horse", img:"img/items/large/itm_warhorse_sarranid.png"}
 items["9"] = { name:"Charger",type:"horse", img:"img/items/large/itm_charger.png"}
 items["525"] = { name:"Cataphract Horse",type:"horse", img:"img/items/large/itm_warhorse_steppe.png"}
 items["538"] = { name:"Construction Site",type:"throwing", img:"img/items/large/itm_construction_site.png"}
 items["524"] = { name:"Large Warhorse",type:"horse", img:"img/items/large/itm_warhorse_chain.png"}
 items["469"] = { name:"Black Armor",type:"body_armor", img:"img/items/large/itm_black_armor.png"}
 items["8"] = { name:"War Horse",type:"horse", img:"img/items/large/itm_warhorse.png"}
 items["479"] = { name:"Gothic Plate with Bevor",type:"body_armor", img:"img/items/large/itm_gothic_plate_bevor.png"}
 items["470"] = { name:"Milanese Plate",type:"body_armor", img:"img/items/large/itm_milanese_plate.png"}
 items["380"] = { name:"Heavy Plate Armor",type:"body_armor", img:"img/items/large/itm_sarranid_dress_b.png"}
 items["471"] = { name:"Gothic Plate",type:"body_armor", img:"img/items/large/itm_gothic_plate.png"}
 items["545"] = { name:"Churburg Cuirass",type:"body_armor", img:"img/items/large/itm_churburg_13_mail.png"}
 items["541"] = { name:"Red Churburg Cuirass",type:"body_armor", img:"img/items/large/itm_churburg_13_brass.png"}
 items["7"] = { name:"Destrier",type:"horse", img:"img/items/large/itm_hunter.png"}
 items["547"] = { name:"Blue Churburg Cuirass",type:"body_armor", img:"img/items/large/itm_churburg_13.png"}
 items["468"] = { name:"Plate Armor",type:"body_armor", img:"img/items/large/itm_plate_armor.png"}
 items["6"] = { name:"Arabian Warhorse",type:"horse", img:"img/items/large/itm_arabian_horse_b.png"}
 items["5"] = { name:"Courser",type:"horse", img:"img/items/large/itm_courser.png"}
 items["480"] = { name:"Heraldic Transitional Armour",type:"body_armor", img:"img/items/large/itm_heraldic_transitional_armour.png"}
 items["478"] = { name:"Blue Transitional Armor with Surcoat",type:"body_armor", img:"img/items/large/itm_early_transitional_blue.png"}
 items["477"] = { name:"Orange Transitional Armor with Surcoat",type:"body_armor", img:"img/items/large/itm_early_transitional_orange.png"}
 items["476"] = { name:"White Transitional Armor with Surcoat",type:"body_armor", img:"img/items/large/itm_early_transitional_white.png"}
 items["15"] = { name:"Arbalest",type:"crossbow", img:"img/items/large/itm_sniper_crossbow.png"}
 items["160"] = { name:"Flamberge",type:"two_handed", img:"img/items/large/itm_flamberge.png"}
 items["4721"] = { name:"Druzhina Elite Lamellar Armor",type:"body_armor", img:"img/items/large/itm_drz_elite_lamellar_armor.png"}
 items["475"] = { name:"Grey Corrazina Armor",type:"body_armor", img:"img/items/large/itm_corrazina_grey.png"}
 items["474"] = { name:"Green Corrazina Armor",type:"body_armor", img:"img/items/large/itm_corrazina_green.png"}
 items["473"] = { name:"Red Corrazina Armor",type:"body_armor", img:"img/items/large/itm_corrazina_red.png"}
 items["467"] = { name:"Khergit Guard Armor",type:"body_armor", img:"img/items/large/itm_khergit_guard_armor.png"}
 items["466"] = { name:"Sarranid Elite Armor",type:"body_armor", img:"img/items/large/itm_sarranid_elite_armor.png"}
 items["465"] = { name:"Vaegir Elite Armor",type:"body_armor", img:"img/items/large/itm_vaegir_elite_armor.png"}
 items["464"] = { name:"Khergit Elite Armor",type:"body_armor", img:"img/items/large/itm_khergit_elite_armor.png"}
 items["533"] = { name:"Heavy Gauntlets",type:"hand_armor", img:"img/items/large/itm_gauntlets_heavy.png"}
 items["3972"] = { name:"Heavy Strange Armor",type:"body_armor", img:"img/items/large/itm_samurai_armor_black.png"}
 items["521"] = { name:"Danish Greatsword",type:"two_handed", img:"img/items/large/itm_Faradon_twohanded2.png"}
 items["436"] = { name:"Mail and Plate",type:"body_armor", img:"img/items/large/itm_mail_and_plate.png"}
 items["530"] = { name:"Elegant Poleaxe",type:"poleaxe", img:"img/items/large/itm_elegant_poleaxe.png"}
 items["522"] = { name:"German Greatsword",type:"two_handed", img:"img/items/large/itm_Faradon_twohanded1.png"}
 items["532"] = { name:"German Poleaxe",type:"poleaxe", img:"img/items/large/itm_german_poleaxe.png"}
 items["4953"] = { name:"Blue Coat of Plates",type:"body_armor", img:"img/items/large/itm_coat_of_plates_blue.png"}
 items["463"] = { name:"Red Coat of Plates",type:"body_armor", img:"img/items/large/itm_coat_of_plates_red.png"}
 items["462"] = { name:"Black Coat of Plates",type:"body_armor", img:"img/items/large/itm_coat_of_plates.png"}
 items["4954"] = { name:"Green Coat of Plates",type:"body_armor", img:"img/items/large/itm_coat_of_plates_green.png"}
 items["531"] = { name:"Poleaxe",type:"poleaxe", img:"img/items/large/itm_poleaxe_a.png"}
 items["14"] = { name:"Heavy Crossbow",type:"crossbow", img:"img/items/large/itm_heavy_crossbow.png"}
 items["159"] = { name:"Nodachi",type:"two_handed", img:"img/items/large/itm_strange_great_sword.png"}
 items["128"] = { name:"Great Long Bardiche",type:"poleaxe", img:"img/items/large/itm_great_long_bardiche.png"}
 items["4956"] = { name:"Rus Scale Armor",type:"body_armor", img:"img/items/large/itm_rus_scale.png"}
 items["157"] = { name:"Sword of War",type:"two_handed", img:"img/items/large/itm_sword_of_war.png"}
 items["3320"] = { name:"Highland Claymore",type:"two_handed", img:"http://c-rpg.net/img/items/large/itm_Scottish_Claymore.png"}
 items["126"] = { name:"Great Long Axe",type:"poleaxe", img:"img/items/large/itm_long_axe_c.png"}
 items["156"] = { name:"Great Sword",type:"two_handed", img:"img/items/large/itm_sword_two_handed_a.png"}
 items["4"] = { name:"Desert Horse",type:"horse", img:"img/items/large/itm_arabian_horse_a.png"}
 items["453"] = { name:"Lamellar Armor",type:"body_armor", img:"img/items/large/itm_lamellar_armor.png"}
 items["4720"] = { name:"Druzhina Lamellar Armor",type:"body_armor", img:"img/items/large/itm_drz_lamellar_armor.png"}
 items["4955"] = { name:"Green Rus Lamellar Cuirass",type:"body_armor", img:"img/items/large/itm_long_mail_coat.png"}
 items["406"] = { name:"Brown Rus Lamellar Cuirass",type:"body_armor", img:"img/items/large/itm_long_mail_coat.png"}
 items["155"] = { name:"Heavy Great Sword",type:"two_handed", img:"img/items/large/itm_great_sword.png"}
 items["435"] = { name:"Light Mail and Plate",type:"body_armor", img:"img/items/large/itm_light_mail_and_plate.png"}
 items["20"] = { name:"Long Bow",type:"bow", img:"img/items/large/itm_long_bow.png"}
 items["452"] = { name:"Brigandine",type:"body_armor", img:"img/items/large/itm_brigandine_red.png"}
 items["254"] = { name:"Plate Mittens",type:"hand_armor", img:"img/items/large/itm_plate_mittens.png"}
 items["97"] = { name:"Bec de Corbin",type:"poleaxe", img:"img/items/large/itm_bec_de_corbin_a.png"}
 items["115"] = { name:"Glaive",type:"poleaxe", img:"img/items/large/itm_glaive.png"}
 items["3"] = { name:"Steppe Horse",type:"horse", img:"img/items/large/itm_steppe_horse.png"}
 items["13"] = { name:"Crossbow",type:"crossbow", img:"img/items/large/itm_crossbow.png"}
 items["3191"] = { name:"Long Espada Eslavona",type:"one_handed", img:"img/items/large/itm_espada_eslavona_b.png"}
 items["88"] = { name:"Steel Shield",type:"shield", img:"img/items/large/itm_steel_shield.png"}
 items["10"] = { name:"Palfrey",type:"horse", img:"img/items/large/itm_palfrey.png"}
 items["457"] = { name:"Cuir Bouilli over Mail",type:"body_armor", img:"img/items/large/itm_cuir_bouilli.png"}
 items["22"] = { name:"Rus Bow",type:"bow", img:"img/items/large/itm_war_bow.png"}
 items["124"] = { name:"Long War Axe",type:"poleaxe", img:"img/items/large/itm_long_axe_b.png"}
 items["4692"] = { name:"English Bill",type:"poleaxe", img:"http://c-rpg.net/img/items/large/itm_english_bill.png"}
 items["523"] = { name:"Warhammer",type:"one_handed", img:"img/items/large/itm_Faradon_warhammer.png"}
 items["141"] = { name:"Great Maul",type:"two_handed", img:"img/items/large/itm_warhammer.png"}
 items["492"] = { name:"Armet",type:"head_armor", img:"img/items/large/itm_flemish_armet.png"}
 items["455"] = { name:"Banded Armor",type:"body_armor", img:"img/items/large/itm_banded_armor.png"}
 items["117"] = { name:"Heavy Lance",type:"poleaxe", img:"img/items/large/itm_heavy_lance.png"}
 items["456"] = { name:"Mamluke Mail",type:"body_armor", img:"img/items/large/itm_mamluke_mail.png"}
 items["158"] = { name:"Katana",type:"two_handed", img:"img/items/large/itm_strange_sword.png"}
 items["510"] = { name:"Nordic Champion's Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_3_long.png"}
 items["114"] = { name:"Long Hafted Blade",type:"poleaxe", img:"img/items/large/itm_hafted_blade_a.png"}
 items["119"] = { name:"Long Awlpike",type:"poleaxe", img:"img/items/large/itm_awlpike_long.png"}
 items["2"] = { name:"Rouncey",type:"horse", img:"img/items/large/itm_saddle_horse.png"}
 items["199"] = { name:"Knightly Arming Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_d_long.png"}
 items["542"] = { name:"Gilded Hourglass Gauntlets",type:"hand_armor", img:"img/items/large/itm_hourglass_gauntlets_ornate.png"}
 items["509"] = { name:"Milanese Sallet",type:"head_armor", img:"img/items/large/itm_milanese_sallet.png"}
 items["358"] = { name:"Sallet with Visor and Coif",type:"head_armor", img:"img/items/large/itm_visored_sallet_coif.png"}
 items["543"] = { name:"Hourglass Gauntlets",type:"hand_armor", img:"img/items/large/itm_hourglass_gauntlets.png"}
 items["5141"] = { name:"Yumi",type:"bow", img:"img/items/large/itm_yumi.png"}
 items["550"] = { name:"Polished Gauntlets",type:"hand_armor", img:"img/items/large/itm_gauntlets_b.png"}
 items["249"] = { name:"Gauntlets",type:"hand_armor", img:"img/items/large/itm_gauntlets.png"}
 items["449"] = { name:"Sarranid Guard Armor",type:"body_armor", img:"img/items/large/itm_arabian_armor_b.png"}
 items["106"] = { name:"Double Sided Lance",type:"poleaxe", img:"img/items/large/itm_double_sided_lance.png"}
 items["154"] = { name:"Miaodao",type:"two_handed", img:"img/items/large/itm_khergit_sword_two_handed_b.png"}
 items["3323"] = { name:"Steel Pick",type:"one_handed", img:"img/items/large/itm_steel_pick.png"}
 items["357"] = { name:"Sallet with Visor",type:"head_armor", img:"img/items/large/itm_visored_sallet.png"}
 items["113"] = { name:"Awlpike",type:"poleaxe", img:"img/items/large/itm_awlpike.png"}
 items["3193"] = { name:"Side Sword",type:"one_handed", img:"img/items/large/itm_side_sword.png"}
 items["118"] = { name:"Swiss Halberd",type:"poleaxe", img:"img/items/large/itm_poleaxe.png"}
 items["210"] = { name:"Elite Scimitar",type:"one_handed", img:"img/items/large/itm_scimitar_b.png"}
 items["44"] = { name:"Throwing Lance",type:"throwing", img:"img/items/large/itm_throwing_lance.png"}
 items["4958"] = { name:"Heavy Kuyak",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_kuyak_b.png"}
 items["153"] = { name:"Two Handed Sword",type:"two_handed", img:"img/items/large/itm_sword_two_handed_b.png"}
 items["355"] = { name:"Sugarloaf Helmet with Coif",type:"head_armor", img:"img/items/large/itm_sugarloaf_coif.png"}
 items["354"] = { name:"Hounskull Bascinet",type:"head_armor", img:"img/items/large/itm_hounskull.png"}
 items["21"] = { name:"Horn Bow",type:"bow", img:"img/items/large/itm_strong_bow.png"}
 items["216"] = { name:"Broad One Handed Battle Axe",type:"one_handed", img:"img/items/large/itm_one_handed_battle_axe_c.png"}
 items["3190"] = { name:"Espada Eslavona",type:"one_handed", img:"img/items/large/itm_espada_eslavona_a.png"}
 items["102"] = { name:"Long Maul",type:"poleaxe", img:"img/items/large/itm_polehammer.png"}
 items["217"] = { name:"Wakizashi",type:"one_handed", img:"img/items/large/itm_strange_short_sword.png"}
 items["3298"] = { name:"Langes Messer",type:"one_handed", img:"img/items/large/itm_grosse_messer_b.png"}
 items["356"] = { name:"Sugarloaf Helmet",type:"head_armor", img:"img/items/large/itm_sugarloaf.png"}
 items["352"] = { name:"Blue Tournament Helmet",type:"head_armor", img:"img/items/large/itm_blue_tournament_helmet.png"}
 items["351"] = { name:"Green Tournament Helmet",type:"head_armor", img:"img/items/large/itm_green_tournament_helmet.png"}
 items["346"] = { name:"Red Tournament Helmet",type:"head_armor", img:"img/items/large/itm_red_tournament_helmet.png"}
 items["345"] = { name:"White Tournament Helmet",type:"head_armor", img:"img/items/large/itm_white_tournament_helmet.png"}
 items["344"] = { name:"Winged Great Helmet",type:"head_armor", img:"img/items/large/itm_winged_great_helmet.png"}
 items["3196"] = { name:"Grosse Messer",type:"one_handed", img:"img/items/large/itm_grosse_messer.png"}
 items["439"] = { name:"Studded Leather over Mail",type:"body_armor", img:"img/items/large/itm_studded_leather_coat.png"}
 items["110"] = { name:"Battle Fork",type:"poleaxe", img:"img/items/large/itm_battle_fork.png"}
 items["548"] = { name:"Round Steel Buckler",type:"shield", img:"img/items/large/itm_steel_buckler1.png"}
 items["152"] = { name:"War Cleaver",type:"two_handed", img:"img/items/large/itm_two_handed_cleaver.png"}
 items["42"] = { name:"Jarid",type:"throwing", img:"img/items/large/itm_jarid.png"}
 items["461"] = { name:"Heraldic Mail with Tabard",type:"body_armor", img:"img/items/large/itm_heraldic_mail_with_tabard.png"}
 items["506"] = { name:"Great Helmet with Hat",type:"head_armor", img:"img/items/large/itm_greathelmwhat.png"}
 items["40"] = { name:"Throwing Spear",type:"throwing", img:"img/items/large/itm_throwing_spears.png"}
 items["451"] = { name:"Surcoat over Mail",type:"body_armor", img:"img/items/large/itm_surcoat_over_mail.png"}
 items["122"] = { name:"Long Bardiche",type:"poleaxe", img:"img/items/large/itm_long_bardiche.png"}
 items["120"] = { name:"Long Axe",type:"poleaxe", img:"img/items/large/itm_long_axe.png"}
 items["544"] = { name:"Steel Buckler",type:"shield", img:"img/items/large/itm_steel_buckler2.png"}
 items["151"] = { name:"Great Bardiche",type:"two_handed", img:"img/items/large/itm_great_bardiche.png"}
 items["214"] = { name:"Arabian Cavalry Sword",type:"one_handed", img:"img/items/large/itm_sarranid_cavalry_sword.png"}
 items["98"] = { name:"War Spear",type:"poleaxe", img:"img/items/large/itm_war_spear.png"}
 items["112"] = { name:"Long Hafted Spiked Mace",type:"poleaxe", img:"img/items/large/itm_long_hafted_spiked_mace.png"}
 items["3192"] = { name:"Italian Sword",type:"one_handed", img:"img/items/large/itm_italian_sword.png"}
 items["460"] = { name:"Heraldic Mail with Tunic",type:"body_armor", img:"img/items/large/itm_heraldic_mail_with_tunic_b.png"}
 items["459"] = { name:"Heraldic Mail",type:"body_armor", img:"img/items/large/itm_heraldic_mail_with_tunic.png"}
 items["4957"] = { name:"Light Kuyak",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_kuyak_a.png"}
 items["4946"] = { name:"Litchina Helm",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_litchina_helm.png"}
 items["343"] = { name:"Great Helmet",type:"head_armor", img:"img/items/large/itm_great_helmet.png"}
 items["212"] = { name:"Long Arming Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_c_long.png"}
 items["518"] = { name:"Bar Mace",type:"two_handed", img:"img/items/large/itm_Faradon_IronClub.png"}
 items["517"] = { name:"Longsword",type:"two_handed", img:"img/items/large/itm_Faradon_handandahalf.png"}
 items["144"] = { name:"Morningstar",type:"two_handed", img:"img/items/large/itm_morningstar.png"}
 items["145"] = { name:"Great Axe",type:"two_handed", img:"img/items/large/itm_great_axe.png"}
 items["12"] = { name:"Light Crossbow",type:"crossbow", img:"img/items/large/itm_light_crossbow.png"}
 items["248"] = { name:"Lamellar Gauntlets",type:"hand_armor", img:"img/items/large/itm_lamellar_gauntlets.png"}
 items["247"] = { name:"Scale Gauntlets",type:"hand_armor", img:"img/items/large/itm_scale_gauntlets.png"}
 items["215"] = { name:"Military Hammer",type:"one_handed", img:"img/items/large/itm_military_hammer.png"}
 items["87"] = { name:"Huscarl's Round Shield",type:"shield", img:"img/items/large/itm_tab_shield_round_e.png"}
 items["4947"] = { name:"Black Mail with Surcoat",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_mail_with_surcoat_black.png"}
 items["4948"] = { name:"White Mail with Surcoat",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_mail_with_surcoat_white.png"}
 items["4949"] = { name:"Brown Mail with Surcoat",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_mail_with_surcoat_brown.png"}
 items["4950"] = { name:"Green Mail with Surcoat",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_mail_with_surcoat_green.png"}
 items["4951"] = { name:"Blue Mail with Surcoat",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_mail_with_surcoat_blue.png"}
 items["4952"] = { name:"Byrnja",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_dejawolf_viking_byrnie.png"}
 items["458"] = { name:"Heraldic Mail with Surcoat",type:"body_armor", img:"img/items/large/itm_heraldic_mail_with_surcoat.png"}
 items["450"] = { name:"Mail with Surcoat",type:"body_armor", img:"img/items/large/itm_mail_with_surcoat.png"}
 items["540"] = { name:"Pigface Klappvisier",type:"head_armor", img:"img/items/large/itm_pigface_klappvisor.png"}
 items["503"] = { name:"Klappvisier",type:"head_armor", img:"img/items/large/itm_klappvisier.png"}
 items["342"] = { name:"Vaegir War Mask",type:"head_armor", img:"img/items/large/itm_vaegir_mask.png"}
 items["520"] = { name:"Broad Short Sword",type:"one_handed", img:"img/items/large/itm_Faradon_onehanded.png"}
 items["198"] = { name:"One Handed Battle Axe",type:"one_handed", img:"img/items/large/itm_one_handed_battle_axe_b.png"}
 items["213"] = { name:"Arabian Guard Sword",type:"one_handed", img:"img/items/large/itm_arabian_sword_d.png"}
 items["446"] = { name:"Strange Armor",type:"body_armor", img:"img/items/large/itm_strange_armor.png"}
 items["4753"] = { name:"Red Tassel Spear",type:"poleaxe", img:"http://c-rpg.net/img/items/large/itm_red_tassel_spear.png"}
 items["204"] = { name:"Military Pick",type:"one_handed", img:"img/items/large/itm_military_pick.png"}
 items["208"] = { name:"Niuweidao",type:"one_handed", img:"img/items/large/itm_sword_khergit_4.png"}
 items["4940"] = { name:"Heavy Strange War Mask",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_mask_heavy.png"}
 items["341"] = { name:"Faceplate",type:"head_armor", img:"img/items/large/itm_full_helm.png"}
 items["19"] = { name:"Tatar Bow",type:"bow", img:"img/items/large/itm_khergit_bow.png"}
 items["109"] = { name:"Long Hafted Knobbed Mace",type:"poleaxe", img:"img/items/large/itm_long_hafted_knobbed_mace.png"}
 items["448"] = { name:"Sarranid Mail Shirt",type:"body_armor", img:"img/items/large/itm_sarranid_mail_shirt.png"}
 items["209"] = { name:"Nordic War Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_3.png"}
 items["539"] = { name:"Construction Material",type:"throwing", img:"img/items/large/itm_construction_material.png"}
 items["148"] = { name:"Long Iron Mace",type:"two_handed", img:"img/items/large/itm_sarranid_two_handed_mace_1.png"}
 items["211"] = { name:"Arming Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_c.png"}
 items["203"] = { name:"Military Cleaver",type:"one_handed", img:"img/items/large/itm_military_cleaver_c.png"}
 items["507"] = { name:"Barbutte",type:"head_armor", img:"img/items/large/itm_barbuta2.png"}
 items["360"] = { name:"Open Sallet with Coif",type:"head_armor", img:"img/items/large/itm_open_sallet_coif.png"}
 items["340"] = { name:"Black Helmet",type:"head_armor", img:"img/items/large/itm_black_helmet.png"}
 items["146"] = { name:"Persian Battle Axe",type:"two_handed", img:"img/items/large/itm_sarranid_two_handed_axe_a.png"}
 items["516"] = { name:"Iberian Mace",type:"one_handed", img:"img/items/large/itm_Faradon_IberianMace.png"}
 items["150"] = { name:"Heavy Bastard Sword",type:"two_handed", img:"img/items/large/itm_bastard_sword_b.png"}
 items["96"] = { name:"Long Spear",type:"poleaxe", img:"img/items/large/itm_pike.png"}
 items["447"] = { name:"Mail Hauberk",type:"body_armor", img:"img/items/large/itm_mail_hauberk.png"}
 items["4754"] = { name:"Pike",type:"poleaxe", img:"img/items/large/itm_pike.png"}
 items["108"] = { name:"Lance",type:"poleaxe", img:"img/items/large/itm_lance.png"}
 items["4755"] = { name:"Shashka",type:"one_handed", img:"img/items/large/itm_shashka.png"}
 items["104"] = { name:"Hafted Blade",type:"poleaxe", img:"img/items/large/itm_hafted_blade_b.png"}
 items["84"] = { name:"Heavy Board Shield",type:"shield", img:"img/items/large/itm_tab_shield_pavise_d.png"}
 items["135"] = { name:"Mallet",type:"two_handed", img:"img/items/large/itm_sledgehammer.png"}
 items["3969"] = { name:"Heavy Strange Helmet",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_helmet_black.png"}
 items["362"] = { name:"Morion",type:"head_armor", img:"img/items/large/itm_combed_morion.png"}
 items["149"] = { name:"Dadao",type:"two_handed", img:"img/items/large/itm_khergit_sword_two_handed_a.png"}
 items["207"] = { name:"Iron War Axe",type:"one_handed", img:"img/items/large/itm_sarranid_axe_b.png"}
 items["483"] = { name:"Bodkin Arrows",type:"arrows", img:"img/items/large/itm_bodkin_arrows.png"}
 items["4943"] = { name:"Nikolskoe Helm",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_nikolskoe_helm.png"}
 items["359"] = { name:"Open Sallet",type:"head_armor", img:"img/items/large/itm_open_sallet.png"}
 items["339"] = { name:"Nordic Warlord Helmet",type:"head_armor", img:"img/items/large/itm_nordic_warlord_helmet.png"}
 items["445"] = { name:"Mail Shirt",type:"body_armor", img:"img/items/large/itm_mail_shirt.png"}
 items["193"] = { name:"Scimitar",type:"one_handed", img:"img/items/large/itm_scimitar.png"}
 items["142"] = { name:"Bardiche",type:"two_handed", img:"img/items/large/itm_bardiche.png"}
 items["3194"] = { name:"Scottish Sword",type:"one_handed", img:"img/items/large/itm_scottish_sword.png"}
 items["252"] = { name:"Red Wisby Gauntlets",type:"hand_armor", img:"img/items/large/itm_wisby_gauntlets_red.png"}
 items["251"] = { name:"Wisby Gauntlets",type:"hand_armor", img:"img/items/large/itm_wisby_gauntlets.png"}
 items["105"] = { name:"Ashwood Pike",type:"poleaxe", img:"img/items/large/itm_ashwood_pike.png"}
 items["69"] = { name:"White Heavy Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_7.png"}
 items["68"] = { name:"Dark Red Heavy Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_6.png"}
 items["67"] = { name:"Dark Blue Heavy Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_5.png"}
 items["65"] = { name:"Blue Heavy Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_3.png"}
 items["63"] = { name:"Brown Heavy Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_1.png"}
 items["103"] = { name:"Light Lance",type:"poleaxe", img:"img/items/large/itm_light_lance.png"}
 items["1"] = { name:"Sumpter Horse",type:"horse", img:"img/items/large/itm_sumpter_horse.png"}
 items["4941"] = { name:"Novogrod Helm",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_novogrod_helm.png"}
 items["4945"] = { name:"Tagancha Helm with Veil",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_tagancha_helm_b.png"}
 items["361"] = { name:"Chapel de Fer",type:"head_armor", img:"img/items/large/itm_chapel_de_fer.png"}
 items["337"] = { name:"Vaegir War Helmet",type:"head_armor", img:"img/items/large/itm_vaegir_war_helmet.png"}
 items["336"] = { name:"Sarranid Veiled Helmet",type:"head_armor", img:"img/items/large/itm_sarranid_veiled_helmet.png"}
 items["334"] = { name:"Guard Helmet",type:"head_armor", img:"img/items/large/itm_guard_helmet.png"}
 items["4723"] = { name:"Druzhina Mail Shirt",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_armor_red.png"}
 items["116"] = { name:"Iron Staff",type:"poleaxe", img:"img/items/large/itm_iron_staff.png"}
 items["241"] = { name:"Black Greaves",type:"foot_armor", img:"img/items/large/itm_black_greaves.png"}
 items["78"] = { name:"Fur Covered Shield",type:"shield", img:"img/items/large/itm_fur_covered_shield.png"}
 items["30"] = { name:"Javelins",type:"throwing", img:"img/items/large/itm_javelin.png"}
 items["133"] = { name:"Long Voulge",type:"poleaxe", img:"img/items/large/itm_long_voulge.png"}
 items["195"] = { name:"Arabian Arming Sword",type:"one_handed", img:"img/items/large/itm_arabian_sword_b.png"}
 items["82"] = { name:"Heavy Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_d.png"}
 items["454"] = { name:"Scale Armor",type:"body_armor", img:"img/items/large/itm_scale_armor.png"}
 items["441"] = { name:"Haubergeon",type:"body_armor", img:"img/items/large/itm_haubergeon.png"}
 items["38"] = { name:"Heavy Throwing Axe",type:"throwing", img:"img/items/large/itm_heavy_throwing_axes.png"}
 items["3195"] = { name:"Italian Falchion",type:"one_handed", img:"img/items/large/itm_italian_falchion.png"}
 items["81"] = { name:"Heavy Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_d.png"}
 items["4939"] = { name:"Strange War Mask",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_mask_medium.png"}
 items["4942"] = { name:"Gnezdovo Helmet",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_gnezdovo_helmet.png"}
 items["363"] = { name:"Rusty Morion",type:"head_armor", img:"img/items/large/itm_combed_morion_blued.png"}
 items["333"] = { name:"Bascinet with Nose Guard",type:"head_armor", img:"img/items/large/itm_bascinet_3.png"}
 items["86"] = { name:"Knightly Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_cav_b.png"}
 items["242"] = { name:"Cased Greaves",type:"foot_armor", img:"img/items/large/itm_steel_greaves.png"}
 items["83"] = { name:"Knightly Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_cav_b.png"}
 items["194"] = { name:"Winged Mace",type:"one_handed", img:"img/items/large/itm_mace_4.png"}
 items["71"] = { name:"Plate Covered Round Shield",type:"shield", img:"img/items/large/itm_plate_covered_round_shield.png"}
 items["76"] = { name:"Heavy Round Shield",type:"shield", img:"img/items/large/itm_tab_shield_round_d.png"}
 items["107"] = { name:"Long Spiked Club",type:"poleaxe", img:"img/items/large/itm_long_spiked_club.png"}
 items["4944"] = { name:"Tagancha Helm",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_tagancha_helm_a.png"}
 items["335"] = { name:"Vaegir Nobleman Helmet",type:"head_armor", img:"img/items/large/itm_vaegir_noble_helmet.png"}
 items["332"] = { name:"Bascinet with Aventail",type:"head_armor", img:"img/items/large/itm_bascinet_2.png"}
 items["140"] = { name:"Persian War Axe",type:"two_handed", img:"img/items/large/itm_sarranid_two_handed_axe_b.png"}
 items["202"] = { name:"Iron Battle Axe",type:"one_handed", img:"img/items/large/itm_sarranid_axe_a.png"}
 items["143"] = { name:"Bastard Sword",type:"two_handed", img:"img/items/large/itm_bastard_sword_a.png"}
 items["206"] = { name:"Liuyedao",type:"one_handed", img:"img/items/large/itm_sword_khergit_3.png"}
 items["240"] = { name:"Plate Boots",type:"foot_armor", img:"img/items/large/itm_plate_boots.png"}
 items["546"] = { name:"Onion Top Bascinet",type:"head_armor", img:"img/items/large/itm_onion_top_bascinet.png"}
 items["338"] = { name:"Strange Helmet",type:"head_armor", img:"img/items/large/itm_strange_helmet.png"}
 items["331"] = { name:"Bascinet",type:"head_armor", img:"img/items/large/itm_bascinet.png"}
 items["205"] = { name:"Nordic Short War Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_3_small.png"}
 items["405"] = { name:"Tourney Armor",type:"body_armor", img:"img/items/large/itm_mail_coat.png"}
 items["85"] = { name:"Elite Cavalry Shield",type:"shield", img:"img/items/large/itm_tab_shield_small_round_c.png"}
 items["18"] = { name:"Nomad Bow",type:"bow", img:"img/items/large/itm_nomad_bow.png"}
 items["147"] = { name:"Goedendag",type:"two_handed", img:"img/items/large/itm_club_with_spike_head.png"}
 items["77"] = { name:"Board Shield",type:"shield", img:"img/items/large/itm_tab_shield_pavise_c.png"}
 items["519"] = { name:"Studded Warclub",type:"two_handed", img:"img/items/large/itm_Faradon_LargeClub.png"}
 items["440"] = { name:"Byrnie",type:"body_armor", img:"img/items/large/itm_byrnie.png"}
 items["95"] = { name:"Spear",type:"poleaxe", img:"img/items/large/itm_spear.png"}
 items["243"] = { name:"Shynbaulds",type:"foot_armor", img:"img/items/large/itm_shynbaulds.png"}
 items["3137"] = { name:"Dark Cavalry Robe",type:"body_armor", img:"img/items/large/itm_sarranid_robe_red.png"}
 items["444"] = { name:"Cavalry Robe",type:"body_armor", img:"img/items/large/itm_sarranid_cavalry_robe.png"}
 items["501"] = { name:"Blue and Purple Kite Shield",type:"shield", img:"img/items/large/itm_shield_kite_g.png"}
 items["176"] = { name:"Iron Mace",type:"one_handed", img:"img/items/large/itm_sarranid_mace_1.png"}
 items["123"] = { name:"Great Lance",type:"poleaxe", img:"img/items/large/itm_great_lance.png"}
 items["11"] = { name:"Hunting Crossbow",type:"crossbow", img:"img/items/large/itm_hunting_crossbow.png"}
 items["411"] = { name:"White Tunic over Mail",type:"body_armor", img:"img/items/large/itm_homespun_dress.png"}
 items["410"] = { name:"Yellow Tunic over Mail",type:"body_armor", img:"img/items/large/itm_merchant_outfit.png"}
 items["409"] = { name:"Blue Tunic over Mail",type:"body_armor", img:"img/items/large/itm_hide_coat.png"}
 items["408"] = { name:"Green Tunic over Mail",type:"body_armor", img:"img/items/large/itm_sleeveless_coat.png"}
 items["407"] = { name:"Red Tunic over Mail",type:"body_armor", img:"img/items/large/itm_sleeveless_mail_coat.png"}
 items["182"] = { name:"Light One Handed Battle Axe",type:"one_handed", img:"img/items/large/itm_one_handed_battle_axe_a.png"}
 items["253"] = { name:"Mail Gauntlets",type:"hand_armor", img:"img/items/large/itm_mail_gauntlets.png"}
 items["201"] = { name:"Short Arming Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_c_small.png"}
 items["196"] = { name:"Fighting Axe",type:"one_handed", img:"img/items/large/itm_fighting_axe.png"}
 items["36"] = { name:"Throwing Axe",type:"throwing", img:"img/items/large/itm_throwing_axes.png"}
 items["3130"] = { name:"Black Lamellar Vest",type:"body_armor", img:"img/items/large/itm_lamellar_vest_black.png"}
 items["443"] = { name:"Khergit Lamellar Vest",type:"body_armor", img:"img/items/large/itm_lamellar_vest_khergit.png"}
 items["442"] = { name:"Lamellar Vest",type:"body_armor", img:"img/items/large/itm_lamellar_vest.png"}
 items["239"] = { name:"Iron Greaves",type:"foot_armor", img:"img/items/large/itm_iron_greaves.png"}
 items["231"] = { name:"Khergit Guard Boots",type:"foot_armor", img:"img/items/large/itm_khergit_guard_boots.png"}
 items["99"] = { name:"Military Fork",type:"poleaxe", img:"img/items/large/itm_military_fork.png"}
 items["94"] = { name:"Bamboo Spear",type:"poleaxe", img:"img/items/large/itm_bamboo_spear.png"}
 items["197"] = { name:"Military Sickle",type:"one_handed", img:"img/items/large/itm_military_sickle_a.png"}
 items["192"] = { name:"Soldier's Cleaver",type:"one_handed", img:"img/items/large/itm_military_cleaver_b.png"}
 items["200"] = { name:"Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_b.png"}
 items["328"] = { name:"Sarranid Mail Coif",type:"head_armor", img:"img/items/large/itm_sarranid_mail_coif.png"}
 items["73"] = { name:"Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_c.png"}
 items["70"] = { name:"Blue Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_8.png"}
 items["66"] = { name:"Yellow Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_4.png"}
 items["64"] = { name:"Green Norman Shield",type:"shield", img:"img/items/large/itm_norman_shield_2.png"}
 items["72"] = { name:"Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_c.png"}
 items["535"] = { name:"Siege Ladder",type:"throwing", img:"img/items/large/itm_crpg_ladder_14m.png"}
 items["237"] = { name:"Mail Boots",type:"foot_armor", img:"img/items/large/itm_mail_boots.png"}
 items["188"] = { name:"Flanged Mace",type:"one_handed", img:"img/items/large/itm_winged_mace.png"}
 items["493"] = { name:"White Black and Red Kite Shield",type:"shield", img:"img/items/large/itm_shield_kite_h.png"}
 items["189"] = { name:"Mace",type:"two_handed", img:"img/items/large/itm_spiked_mace.png"}
 items["484"] = { name:"Tatar Arrows",type:"arrows", img:"img/items/large/itm_khergit_arrows.png"}
 items["329"] = { name:"Khergit Guard Helmet",type:"head_armor", img:"img/items/large/itm_khergit_guard_helmet.png"}
 items["327"] = { name:"Nordic Huscarl's Helmet",type:"head_armor", img:"img/items/large/itm_nordic_huscarl_helmet.png"}
 items["318"] = { name:"Rus Helmet",type:"head_armor", img:"img/items/large/itm_rus_helmet_a.png"}
 items["48"] = { name:"Snowflake",type:"throwing", img:"img/items/large/itm_throwing_star_c.png"}
 items["61"] = { name:"Round Shield",type:"shield", img:"img/items/large/itm_tab_shield_round_c.png"}
 items["498"] = { name:"Brown Kite Shield",type:"shield", img:"img/items/large/itm_shield_kite_i.png"}
 items["496"] = { name:"Black and White Kite Shield",type:"shield", img:"img/items/large/itm_shield_kite_k.png"}
 items["244"] = { name:"Splinted Greaves with Spurs",type:"foot_armor", img:"img/items/large/itm_splinted_greaves_spurs.png"}
 items["505"] = { name:"Green Crescent Heater Shield",type:"shield", img:"img/items/large/itm_shield_heater_d.png"}
 items["404"] = { name:"Studded Leather Coat",type:"body_armor", img:"img/items/large/itm_leather_coat.png"}
 items["47"] = { name:"6-Point Shuriken",type:"throwing", img:"img/items/large/itm_throwing_star_b.png"}
 items["537"] = { name:"Siege Shield",type:"throwing", img:"img/items/large/itm_siege_shield.png"}
 items["3971"] = { name:"Light Strange Armor",type:"body_armor", img:"http://c-rpg.net/img/items/large/itm_drz_mail_shirt.png"}
 items["46"] = { name:"4-Point Shuriken",type:"throwing", img:"img/items/large/itm_throwing_star_a.png"}
 items["486"] = { name:"Steel Bolts",type:"bolts", img:"img/items/large/itm_steel_bolts.png"}
 items["5142"] = { name:"Throwing Hammer",type:"throwing", img:"http://c-rpg.net/img/items/large/itm_throwing_hammer.png"}
 items["138"] = { name:"War Axe",type:"two_handed", img:"img/items/large/itm_war_axe.png"}
 items["325"] = { name:"Helmet with Lamellar Guard",type:"head_armor", img:"img/items/large/itm_vaegir_lamellar_helmet.png"}
 items["324"] = { name:"Nordic Helmet",type:"head_armor", img:"img/items/large/itm_nordic_helmet.png"}
 items["315"] = { name:"Spiked Helmet",type:"head_armor", img:"img/items/large/itm_spiked_helmet.png"}
 items["232"] = { name:"Plated Boots",type:"foot_armor", img:"img/items/large/itm_sarranid_boots_c.png"}
 items["4935"] = { name:"Rus Splinted Greaves",type:"foot_armor", img:"http://c-rpg.net/img/items/large/itm_rus_splint_greaves.png"}
 items["191"] = { name:"Yanmaodao",type:"one_handed", img:"img/items/large/itm_sword_khergit_2.png"}
 items["499"] = { name:"Nordic Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_2.png"}
 items["80"] = { name:"Brown Lion Heater Shield",type:"shield", img:"img/items/large/itm_shield_heater_c.png"}
 items["529"] = { name:"Large Wooden Ladder",type:"throwing", img:"img/items/large/itm_crpg_ladder_12m.png"}
 items["34"] = { name:"Francisca",type:"throwing", img:"img/items/large/itm_light_throwing_axes.png"}
 items["62"] = { name:"Plain Board Shield",type:"shield", img:"img/items/large/itm_tab_shield_pavise_b.png"}
 items["186"] = { name:"Nordic Short Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_2_small.png"}
 items["190"] = { name:"One Handed War Axe",type:"one_handed", img:"img/items/large/itm_one_handed_war_axe_b.png"}
 items["438"] = { name:"Sarranid Leather Armor",type:"body_armor", img:"img/items/large/itm_sarranid_leather_armor.png"}
 items["236"] = { name:"Splinted Greaves",type:"foot_armor", img:"img/items/large/itm_splinted_greaves.png"}
 items["57"] = { name:"Plain Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_b.png"}
 items["56"] = { name:"Plain Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_b.png"}
 items["16"] = { name:"Bow",type:"bow", img:"img/items/large/itm_hunting_bow.png"}
 items["181"] = { name:"Arabian Straight Sword",type:"one_handed", img:"img/items/large/itm_arabian_sword_a.png"}
 items["4938"] = { name:"Light Strange War Mask",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_mask_light.png"}
 items["549"] = { name:"Kettle Helmet",type:"head_armor", img:"img/items/large/itm_prato_chapel_de_fer.png"}
 items["330"] = { name:"Khergit Cavalry Helmet",type:"head_armor", img:"img/items/large/itm_khergit_cavalry_helmet.png"}
 items["134"] = { name:"Two Handed War Axe",type:"two_handed", img:"img/items/large/itm_two_handed_battle_axe_2.png"}
 items["100"] = { name:"Military Scythe",type:"poleaxe", img:"img/items/large/itm_military_scythe.png"}
 items["139"] = { name:"Shortened Military Scythe",type:"two_handed", img:"img/items/large/itm_shortened_military_scythe.png"}
 items["183"] = { name:"Simple Nordic Sword",type:"one_handed", img:"img/items/large/itm_sword_viking_1.png"}
 items["79"] = { name:"Horseman's Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_cav_a.png"}
 items["75"] = { name:"Horseman's Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_cav_a.png"}
 items["322"] = { name:"Sarranid Keffiyeh Helmet",type:"head_armor", img:"img/items/large/itm_sarranid_helmet1.png"}
 items["320"] = { name:"Shahi",type:"head_armor", img:"img/items/large/itm_shahi.png"}
 items["313"] = { name:"Kettle Hat",type:"head_armor", img:"img/items/large/itm_kettle_hat.png"}
 items["136"] = { name:"Shortened Voulge",type:"two_handed", img:"img/items/large/itm_shortened_voulge.png"}
 items["74"] = { name:"Round Cavalry Shield",type:"shield", img:"img/items/large/itm_tab_shield_small_round_b.png"}
 items["187"] = { name:"Simple Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_a.png"}
 items["185"] = { name:"Spiked Mace",type:"one_handed", img:"img/items/large/itm_mace_3.png"}
 items["437"] = { name:"Nomad Robe",type:"body_armor", img:"img/items/large/itm_nomad_robe.png"}
 items["179"] = { name:"Nomad Sabre",type:"one_handed", img:"img/items/large/itm_sword_khergit_1.png"}
 items["233"] = { name:"Splinted Leather Greaves over Mail",type:"foot_armor", img:"img/items/large/itm_splinted_leather_greaves.png"}
 items["3967"] = { name:"Heavy Strange Greaves",type:"foot_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_boots_black.png"}
 items["534"] = { name:"Medium Wooden Ladder",type:"throwing", img:"img/items/large/itm_crpg_ladder_10m.png"}
 items["184"] = { name:"Short Sword",type:"one_handed", img:"img/items/large/itm_sword_medieval_b_small.png"}
 items["323"] = { name:"Khergit War Helmet",type:"head_armor", img:"img/items/large/itm_khergit_war_helmet.png"}
 items["314"] = { name:"Nordic Fighter Helmet",type:"head_armor", img:"img/items/large/itm_nordic_fighter_helmet.png"}
 items["3968"] = { name:"Light Strange Helmet",type:"head_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_helmet_red.png"}
 items["420"] = { name:"Padded Leather",type:"body_armor", img:"img/items/large/itm_padded_leather.png"}
 items["482"] = { name:"Barbed Arrows",type:"arrows", img:"img/items/large/itm_barbed_arrows.png"}
 items["238"] = { name:"Sarranid Mail Boots",type:"foot_armor", img:"img/items/large/itm_sarranid_boots_d.png"}
 items["350"] = { name:"Red Steppe Helmet",type:"head_armor", img:"img/items/large/itm_red_steppe_helmet.png"}
 items["349"] = { name:"Green Steppe Helmet",type:"head_armor", img:"img/items/large/itm_green_steppe_helmet.png"}
 items["348"] = { name:"Turban Helmet",type:"head_armor", img:"img/items/large/itm_turban_helmet.png"}
 items["347"] = { name:"White Steppe Helmet",type:"head_armor", img:"img/items/large/itm_white_steppe_helmet.png"}
 items["326"] = { name:"Khergit Helmet",type:"head_armor", img:"img/items/large/itm_khergit_helmet.png"}
 items["310"] = { name:"Flat Topped Helmet",type:"head_armor", img:"img/items/large/itm_flat_topped_helmet.png"}
 items["4722"] = { name:"Kaftan",type:"body_armor", img:"img/items/large/itm_drz_kaftan.png"}
 items["175"] = { name:"One Handed Axe",type:"one_handed", img:"img/items/large/itm_one_handed_war_axe_a.png"}
 items["92"] = { name:"Shortened Spear",type:"poleaxe", img:"img/items/large/itm_shortened_spear.png"}
 items["131"] = { name:"Maul",type:"two_handed", img:"img/items/large/itm_maul.png"}
 items["434"] = { name:"Tribal Warrior Outfit",type:"body_armor", img:"img/items/large/itm_tribal_warrior_outfit.png"}
 items["55"] = { name:"Plain Round Shield",type:"shield", img:"img/items/large/itm_tab_shield_round_b.png"}
 items["180"] = { name:"Fighting Pick",type:"one_handed", img:"img/items/large/itm_fighting_pick.png"}
 items["32"] = { name:"War Darts",type:"throwing", img:"img/items/large/itm_war_darts.png"}
 items["311"] = { name:"Spiked Cap",type:"head_armor", img:"img/items/large/itm_vaegir_spiked_helmet.png"}
 items["308"] = { name:"Helmet with Neckguard",type:"head_armor", img:"img/items/large/itm_helmet_with_neckguard.png"}
 items["246"] = { name:"Mail Mittens",type:"hand_armor", img:"img/items/large/itm_mail_mittens.png"}
 items["306"] = { name:"Segmented Helmet",type:"head_armor", img:"img/items/large/itm_segmented_helmet.png"}
 items["235"] = { name:"Mail Chausses",type:"foot_armor", img:"img/items/large/itm_mail_chausses.png"}
 items["177"] = { name:"Knobbed Mace",type:"one_handed", img:"img/items/large/itm_mace_2.png"}
 items["403"] = { name:"Padded Armor",type:"body_armor", img:"img/items/large/itm_coat.png"}
 items["59"] = { name:"Nordic Shield",type:"shield", img:"img/items/large/itm_nordic_shield.png"}
 items["321"] = { name:"Rabati",type:"head_armor", img:"img/items/large/itm_rabati.png"}
 items["319"] = { name:"Sipahi Helmet",type:"head_armor", img:"img/items/large/itm_sipahi_helmet_a.png"}
 items["317"] = { name:"Magyar Helmet",type:"head_armor", img:"img/items/large/itm_magyar_helmet_a.png"}
 items["305"] = { name:"Nordic Footman Helmet",type:"head_armor", img:"img/items/large/itm_nordic_footman_helmet.png"}
 items["536"] = { name:"Wooden Ladder",type:"throwing", img:"img/items/large/itm_crpg_ladder_8m.png"}
 items["418"] = { name:"Light Leather",type:"body_armor", img:"img/items/large/itm_light_leather.png"}
 items["93"] = { name:"Boar Spear",type:"poleaxe", img:"img/items/large/itm_boar_spear.png"}
 items["504"] = { name:"Nordic Conical Helmet",type:"head_armor", img:"img/items/large/itm_pointyhelm.png"}
 items["472"] = { name:"Padded Jack",type:"body_armor", img:"img/items/large/itm_narf_gambeson.png"}
 items["101"] = { name:"Jousting Lance",type:"poleaxe", img:"img/items/large/itm_jousting_lance.png"}
 items["111"] = { name:"Quarter Staff",type:"poleaxe", img:"img/items/large/itm_quarter_staff.png"}
 items["29"] = { name:"Firebomb",type:"throwing", img:"img/items/large/itm_firebomb.png"}
 items["132"] = { name:"Voulge",type:"poleaxe", img:"img/items/large/itm_voulge.png"}
 items["60"] = { name:"Plain Cavalry Shield",type:"shield", img:"img/items/large/itm_tab_shield_small_round_a.png"}
 items["170"] = { name:"Hand Axe",type:"one_handed", img:"img/items/large/itm_hand_axe.png"}
 items["353"] = { name:"Yellow Arena Helmet",type:"head_armor", img:"img/items/large/itm_yellow_arena_helmet.png"}
 items["304"] = { name:"Norman Helmet",type:"head_armor", img:"img/items/large/itm_norman_helmet.png"}
 items["419"] = { name:"Sarranid Padded Vest",type:"body_armor", img:"img/items/large/itm_archers_vest.png"}
 items["28"] = { name:"Throwing Daggers",type:"throwing", img:"img/items/large/itm_throwing_daggers.png"}
 items["491"] = { name:"Practice Lance",type:"poleaxe", img:"img/items/large/itm_arena_lance.png"}
 items["137"] = { name:"Battle Axe",type:"two_handed", img:"img/items/large/itm_battle_axe.png"}
 items["494"] = { name:"Nordic Pot Helmet",type:"head_armor", img:"img/items/large/itm_plainhelm.png"}
 items["234"] = { name:"Strange Greaves",type:"foot_armor", img:"img/items/large/itm_strange_boots.png"}
 items["17"] = { name:"Short Bow",type:"bow", img:"img/items/large/itm_short_bow.png"}
 items["417"] = { name:"Ragged Outfit",type:"body_armor", img:"img/items/large/itm_ragged_outfit.png"}
 items["54"] = { name:"Old Board Shield",type:"shield", img:"img/items/large/itm_tab_shield_pavise_a.png"}
 items["316"] = { name:"Byzantion Helmet",type:"head_armor", img:"img/items/large/itm_byzantion_helmet_a.png"}
 items["303"] = { name:"Nasal Helmet",type:"head_armor", img:"img/items/large/itm_nasal_helmet.png"}
 items["50"] = { name:"Old Kite Shield",type:"shield", img:"img/items/large/itm_tab_shield_kite_a.png"}
 items["174"] = { name:"Spiked Club",type:"one_handed", img:"img/items/large/itm_spiked_club.png"}
 items["130"] = { name:"Two Handed Axe",type:"two_handed", img:"img/items/large/itm_two_handed_axe.png"}
 items["51"] = { name:"Old Heater Shield",type:"shield", img:"img/items/large/itm_tab_shield_heater_a.png"}
 items["58"] = { name:"Leather Covered Round Shield",type:"shield", img:"img/items/large/itm_leather_covered_round_shield.png"}
 items["307"] = { name:"Horseman Helmet",type:"head_armor", img:"img/items/large/itm_sarranid_horseman_helmet.png"}
 items["26"] = { name:"Darts",type:"throwing", img:"img/items/large/itm_darts.png"}
 items["400"] = { name:"Leather Jerkin",type:"body_armor", img:"img/items/large/itm_leather_jerkin.png"}
 items["178"] = { name:"Falchion",type:"one_handed", img:"img/items/large/itm_falchion.png"}
 items["91"] = { name:"Scythe",type:"poleaxe", img:"img/items/large/itm_scythe.png"}
 items["416"] = { name:"Nomad Vest",type:"body_armor", img:"img/items/large/itm_nomad_vest.png"}
 items["301"] = { name:"Footman's Helmet",type:"head_armor", img:"img/items/large/itm_footman_helmet.png"}
 items["53"] = { name:"Wooden Shield",type:"shield", img:"img/items/large/itm_wooden_shield.png"}
 items["528"] = { name:"Small Wooden Ladder",type:"throwing", img:"img/items/large/itm_crpg_ladder_6m.png"}
 items["163"] = { name:"Hammer",type:"one_handed", img:"img/items/large/itm_hammer.png"}
 items["398"] = { name:"Padded Cloth",type:"body_armor", img:"img/items/large/itm_aketon_green.png"}
 items["397"] = { name:"Aketon",type:"body_armor", img:"img/items/large/itm_padded_cloth.png"}
 items["169"] = { name:"Khyber Knife",type:"one_handed", img:"img/items/large/itm_butchering_knife.png"}
 items["49"] = { name:"Old Round Shield",type:"shield", img:"img/items/large/itm_tab_shield_round_a.png"}
 items["25"] = { name:"Throwing Knives",type:"throwing", img:"img/items/large/itm_throwing_knives.png"}
 items["297"] = { name:"Mail Coif",type:"head_armor", img:"img/items/large/itm_mail_coif.png"}
 items["396"] = { name:"Red Gambeson",type:"body_armor", img:"img/items/large/itm_red_gambeson.png"}
 items["395"] = { name:"Blue Gambeson",type:"body_armor", img:"img/items/large/itm_blue_gambeson.png"}
 items["393"] = { name:"Gambeson",type:"body_armor", img:"img/items/large/itm_gambeson.png"}
 items["52"] = { name:"Hide Covered Round Shield",type:"shield", img:"img/items/large/itm_hide_covered_round_shield.png"}
 items["302"] = { name:"Vaegir Helmet",type:"head_armor", img:"img/items/large/itm_vaegir_fur_helmet.png"}
 items["4937"] = { name:"Rus Cavalry Boots",type:"foot_armor", img:"img/items/large/itm_rus_cav_boots.png"}
 items["129"] = { name:"Axe",type:"two_handed", img:"img/items/large/itm_axe.png"}
 items["554"] = { name:"Long Dagger",type:"one_handed", img:"img/items/large/itm_dagger_swup.png"}
 items["296"] = { name:"Nordic Leather Helmet with Rings",type:"head_armor", img:"img/items/large/itm_nordic_veteran_archer_helmet.png"}
 items["293"] = { name:"Skullcap",type:"head_armor", img:"img/items/large/itm_skullcap.png"}
 items["399"] = { name:"Pilgrim Disguise",type:"body_armor", img:"img/items/large/itm_pilgrim_disguise.png"}
 items["90"] = { name:"Staff",type:"poleaxe", img:"img/items/large/itm_staff.png"}
 items["3966"] = { name:"Light Strange Greaves",type:"foot_armor", img:"http://c-rpg.net/img/items/large/itm_samurai_boots_red.png"}
 items["230"] = { name:"Leather Boots",type:"foot_armor", img:"img/items/large/itm_leather_boots.png"}
 items["171"] = { name:"Pickaxe",type:"one_handed", img:"img/items/large/itm_pickaxe.png"}
 items["300"] = { name:"Sarranid Warrior Cap",type:"head_armor", img:"img/items/large/itm_sarranid_warrior_cap.png"}
 items["551"] = { name:"Torch",type:"one_handed", img:"img/items/large/itm_torch.png"}
 items["245"] = { name:"Leather Gloves",type:"hand_armor", img:"img/items/large/itm_leather_gloves.png"}
 items["229"] = { name:"Light Leather Boots",type:"foot_armor", img:"img/items/large/itm_light_leather_boots.png"}
 items["282"] = { name:"Leather Warrior Cap",type:"head_armor", img:"img/items/large/itm_leather_warrior_cap.png"}
 items["172"] = { name:"Dagger",type:"one_handed", img:"img/items/large/itm_dagger.png"}
 items["173"] = { name:"Light Spiked Club",type:"one_handed", img:"img/items/large/itm_mace_1.png"}
 items["502"] = { name:"Practice Longsword",type:"two_handed", img:"img/items/large/itm_heavy_wooden_sword.png"}
 items["227"] = { name:"Nomad Boots",type:"foot_armor", img:"img/items/large/itm_nomad_boots.png"}
 items["167"] = { name:"Cleaver",type:"one_handed", img:"img/items/large/itm_cleaver.png"}
 items["3322"] = { name:"Knife",type:"one_handed", img:"img/items/large/itm_knife.png"}
 items["392"] = { name:"Steppe Armor",type:"body_armor", img:"img/items/large/itm_steppe_armor.png"}
 items["485"] = { name:"Bolts",type:"bolts", img:"img/items/large/itm_bolts.png"}
 items["312"] = { name:"Felt Steppe Cap",type:"head_armor", img:"img/items/large/itm_felt_steppe_cap.png"}
 items["292"] = { name:"Steppe Cap",type:"head_armor", img:"img/items/large/itm_leather_steppe_cap_c.png"}
 items["394"] = { name:"Nomad Armor",type:"body_armor", img:"img/items/large/itm_nomad_armor.png"}
 items["388"] = { name:"Skirmisher Armor",type:"body_armor", img:"img/items/large/itm_skirmisher_armor.png"}
 items["387"] = { name:"Leather Armor",type:"body_armor", img:"img/items/large/itm_leather_armor.png"}
 items["500"] = { name:"Practice Sword",type:"one_handed", img:"img/items/large/itm_wooden_sword.png"}
 items["481"] = { name:"Arrows",type:"arrows", img:"img/items/large/itm_arrows.png"}
 items["228"] = { name:"Sarranid Leather Boots",type:"foot_armor", img:"img/items/large/itm_sarranid_boots_b.png"}
 items["226"] = { name:"Khergit Leather Boots",type:"foot_armor", img:"img/items/large/itm_khergit_leather_boots.png"}
 items["225"] = { name:"Ankle Boots",type:"foot_armor", img:"img/items/large/itm_ankle_boots.png"}
 items["291"] = { name:"Cap with Fur",type:"head_armor", img:"img/items/large/itm_vaegir_fur_cap.png"}
 items["391"] = { name:"Leather Vest",type:"body_armor", img:"img/items/large/itm_leather_vest.png"}
 items["508"] = { name:"Blue Practice Shield",type:"shield", img:"img/items/large/itm_blue_shield.png"}
 items["488"] = { name:"Green Practice Shield",type:"shield", img:"img/items/large/itm_green_shield.png"}
 items["89"] = { name:"Pitch Fork",type:"poleaxe", img:"img/items/large/itm_pitch_fork.png"}
 items["290"] = { name:"Nordic Leather Helmet",type:"head_armor", img:"img/items/large/itm_nordic_archer_helmet.png"}
 items["289"] = { name:"Desert Turban",type:"head_armor", img:"img/items/large/itm_desert_turban.png"}
 items["288"] = { name:"Leather Steppe Cap",type:"head_armor", img:"img/items/large/itm_leather_steppe_cap_b.png"}
 items["287"] = { name:"Pilgrim Hood",type:"head_armor", img:"img/items/large/itm_pilgrim_hood.png"}
 items["168"] = { name:"Peasant Knife",type:"one_handed", img:"img/items/large/itm_knife.png"}
 items["497"] = { name:"Red Practice Shield",type:"shield", img:"img/items/large/itm_red_shield.png"}
 items["490"] = { name:"Yellow Practice Shield",type:"shield", img:"img/items/large/itm_yellow_shield.png"}
 items["389"] = { name:"Tabard",type:"body_armor", img:"img/items/large/itm_tabard.png"}
 items["4936"] = { name:"Rus Shoes",type:"foot_armor", img:"img/items/large/itm_rus_shoes.png"}
 items["390"] = { name:"Fur Coat",type:"body_armor", img:"img/items/large/itm_fur_coat.png"}
 items["385"] = { name:"Leather Jacket",type:"body_armor", img:"img/items/large/itm_leather_jacket.png"}
 items["285"] = { name:"Steppe Cap with Fur",type:"head_armor", img:"img/items/large/itm_leather_steppe_cap_a.png"}
 items["281"] = { name:"Horned Steppe Cap",type:"head_armor", img:"img/items/large/itm_steppe_cap.png"}
 items["224"] = { name:"Hide Boots",type:"foot_armor", img:"img/items/large/itm_hide_boots.png"}
 items["386"] = { name:"Leather Apron",type:"body_armor", img:"img/items/large/itm_leather_apron.png"}
 items["166"] = { name:"Hatchet",type:"one_handed", img:"img/items/large/itm_hatchet.png"}
 items["552"] = { name:"Trident",type:"poleaxe", img:"img/items/large/itm_trident_swup.png"}
 items["383"] = { name:"Khergit Armor",type:"body_armor", img:"img/items/large/itm_khergit_armor.png"}
 items["286"] = { name:"Turban",type:"head_armor", img:"img/items/large/itm_turban.png"}
 items["271"] = { name:"Padded Coif",type:"head_armor", img:"img/items/large/itm_padded_coif.png"}
 items["165"] = { name:"Club",type:"one_handed", img:"img/items/large/itm_club.png"}
 items["221"] = { name:"Hunter Boots",type:"foot_armor", img:"img/items/large/itm_hunter_boots.png"}
 items["384"] = { name:"Tunic with vest",type:"body_armor", img:"img/items/large/itm_coarse_tunic.png"}
 items["164"] = { name:"Sickle",type:"one_handed", img:"img/items/large/itm_sickle.png"}
 items["495"] = { name:"Black Hood with Mask",type:"head_armor", img:"img/items/large/itm_hood_black_mask.png"}
 items["309"] = { name:"Black Hood",type:"head_armor", img:"img/items/large/itm_black_hood.png"}
 items["278"] = { name:"Lady's Hood",type:"head_armor", img:"img/items/large/itm_female_hood.png"}
 items["277"] = { name:"Blue Hood",type:"head_armor", img:"img/items/large/itm_hood_d.png"}
 items["276"] = { name:"Purple and Green Hood",type:"head_armor", img:"img/items/large/itm_hood_c.png"}
 items["275"] = { name:"Green and Yellow Hood",type:"head_armor", img:"img/items/large/itm_hood_b.png"}
 items["274"] = { name:"Yellow Hood",type:"head_armor", img:"img/items/large/itm_common_hood.png"}
 items["272"] = { name:"Leather Cap",type:"head_armor", img:"img/items/large/itm_leather_cap.png"}
 items["270"] = { name:"Nomad Cap",type:"head_armor", img:"img/items/large/itm_nomad_cap_b.png"}
 items["269"] = { name:"Spiked Nomad Cap",type:"head_armor", img:"img/items/large/itm_nomad_cap.png"}
 items["223"] = { name:"Bride Shoes",type:"foot_armor", img:"img/items/large/itm_bride_shoes.png"}
 items["222"] = { name:"Sarranid Shoes",type:"foot_armor", img:"img/items/large/itm_sarranid_boots_a.png"}
 items["382"] = { name:"Worn Robe",type:"body_armor", img:"img/items/large/itm_sarranid_cloth_robe_b.png"}
 items["381"] = { name:"Worn Desert Robe",type:"body_armor", img:"img/items/large/itm_sarranid_cloth_robe.png"}
 items["299"] = { name:"Red Turret Hat",type:"head_armor", img:"img/items/large/itm_court_hat.png"}
 items["298"] = { name:"Blue Turret Hat",type:"head_armor", img:"img/items/large/itm_turret_hat_blue.png"}
 items["294"] = { name:"Plain Turret Hat",type:"head_armor", img:"img/items/large/itm_turret_hat_ruby.png"}
 items["267"] = { name:"Felt Cap",type:"head_armor", img:"img/items/large/itm_felt_hat_b.png"}
 items["266"] = { name:"Felt Hat",type:"head_armor", img:"img/items/large/itm_felt_hat.png"}
 items["265"] = { name:"Fur Hat",type:"head_armor", img:"img/items/large/itm_fur_hat.png"}
 items["264"] = { name:"Woolen Hood",type:"head_armor", img:"img/items/large/itm_woolen_hood.png"}
 items["162"] = { name:"Cudgel",type:"one_handed", img:"img/items/large/itm_cudgel.png"}
 items["433"] = { name:"Bride Dress",type:"body_armor", img:"img/items/large/itm_bride_dress.png"}
 items["432"] = { name:"Black Sarranid Dress",type:"body_armor", img:"img/items/large/itm_sarranid_common_dress_b.png"}
 items["431"] = { name:"Sarranid Dress",type:"body_armor", img:"img/items/large/itm_sarranid_common_dress.png"}
 items["430"] = { name:"Orange Sarranid Lady Dress",type:"body_armor", img:"img/items/large/itm_sarranid_lady_dress_b.png"}
 items["429"] = { name:"Purple Sarranid Lady Dress",type:"body_armor", img:"img/items/large/itm_sarranid_lady_dress.png"}
 items["428"] = { name:"Khergit Leather Lady Dress",type:"body_armor", img:"img/items/large/itm_khergit_lady_dress_b.png"}
 items["427"] = { name:"Khergit Lady Dress",type:"body_armor", img:"img/items/large/itm_khergit_lady_dress.png"}
 items["426"] = { name:"Green Dress",type:"body_armor", img:"img/items/large/itm_green_dress.png"}
 items["425"] = { name:"Brown Dress",type:"body_armor", img:"img/items/large/itm_brown_dress.png"}
 items["424"] = { name:"Red Dress",type:"body_armor", img:"img/items/large/itm_red_dress.png"}
 items["423"] = { name:"Blue Lady Dress",type:"body_armor", img:"img/items/large/itm_lady_dress_blue.png"}
 items["422"] = { name:"Green Lady Dress",type:"body_armor", img:"img/items/large/itm_lady_dress_green.png"}
 items["421"] = { name:"Red Lady Dress",type:"body_armor", img:"img/items/large/itm_lady_dress_ruby.png"}
 items["415"] = { name:"Rich Outfit",type:"body_armor", img:"img/items/large/itm_rich_outfit.png"}
 items["414"] = { name:"Court Dress",type:"body_armor", img:"img/items/large/itm_court_dress.png"}
 items["402"] = { name:"Nobleman Outfit",type:"body_armor", img:"img/items/large/itm_nobleman_outfit.png"}
 items["401"] = { name:"Courtly Outfit",type:"body_armor", img:"img/items/large/itm_courtly_outfit.png"}
 items["379"] = { name:"Robe",type:"body_armor", img:"img/items/large/itm_robe.png"}
 items["377"] = { name:"Rawhide Coat",type:"body_armor", img:"img/items/large/itm_rawhide_coat.png"}
 items["365"] = { name:"Nord Nobleman Outfit",type:"body_armor", img:"img/items/large/itm_burlap_tunic.png"}
 items["378"] = { name:"Pelt Coat",type:"body_armor", img:"img/items/large/itm_pelt_coat.png"}
 items["268"] = { name:"Arming Cap",type:"head_armor", img:"img/items/large/itm_arming_cap.png"}
 items["161"] = { name:"Wooden Stick",type:"one_handed", img:"img/items/large/itm_wooden_stick.png"}
 items["371"] = { name:"Woolen Dress",type:"body_armor", img:"img/items/large/itm_woolen_dress.png"}
 items["295"] = { name:"Barbette",type:"head_armor", img:"img/items/large/itm_turret_hat_green.png"}
 items["263"] = { name:"Woolen Cap",type:"head_armor", img:"img/items/large/itm_woolen_cap.png"}
 items["220"] = { name:"Blue Hose",type:"foot_armor", img:"img/items/large/itm_blue_hose.png"}
 items["489"] = { name:"Practice Dagger",type:"one_handed", img:"img/items/large/itm_wooden_dagger.png"}
 items["413"] = { name:"Yellow Tunic",type:"body_armor", img:"img/items/large/itm_coat_with_cape.png"}
 items["412"] = { name:"White Tunic",type:"body_armor", img:"img/items/large/itm_thick_coat.png"}
 items["376"] = { name:"Blue Tunic",type:"body_armor", img:"img/items/large/itm_blue_tunic.png"}
 items["375"] = { name:"Green Tunic",type:"body_armor", img:"img/items/large/itm_green_tunic.png"}
 items["374"] = { name:"Red Tunic",type:"body_armor", img:"img/items/large/itm_red_tunic.png"}
 items["373"] = { name:"Red Shirt",type:"body_armor", img:"img/items/large/itm_red_shirt.png"}
 items["372"] = { name:"Short Tunic",type:"body_armor", img:"img/items/large/itm_short_tunic.png"}
 items["370"] = { name:"Tunic with Green Cape",type:"body_armor", img:"img/items/large/itm_tunic_with_green_cape.png"}
 items["368"] = { name:"Peasant Dress",type:"body_armor", img:"img/items/large/itm_peasant_dress.png"}
 items["367"] = { name:"Blue Dress",type:"body_armor", img:"img/items/large/itm_blue_dress.png"}
 items["366"] = { name:"Dress",type:"body_armor", img:"img/items/large/itm_dress.png"}
 items["284"] = { name:"Sarranid Felt Hat",type:"head_armor", img:"img/items/large/itm_sarranid_felt_hat.png"}
 items["219"] = { name:"Woolen Hose",type:"foot_armor", img:"img/items/large/itm_woolen_hose.png"}
 items["369"] = { name:"Linen Tunic",type:"body_armor", img:"img/items/large/itm_linen_tunic.png"}
 items["364"] = { name:"Shirt",type:"body_armor", img:"img/items/large/itm_shirt.png"}
 items["280"] = { name:"Wimple with Veil",type:"head_armor", img:"img/items/large/itm_wimple_with_veil.png"}
 items["279"] = { name:"Wimple",type:"head_armor", img:"img/items/large/itm_wimple_a.png"}
 items["262"] = { name:"Crown of Flowers",type:"head_armor", img:"img/items/large/itm_bride_crown.png"}
 items["261"] = { name:"Khergit Lady Leather Hat",type:"head_armor", img:"img/items/large/itm_khergit_lady_hat_b.png"}
 items["260"] = { name:"Khergit Lady Hat",type:"head_armor", img:"img/items/large/itm_khergit_lady_hat.png"}
 items["259"] = { name:"Headcloth",type:"head_armor", img:"img/items/large/itm_headcloth.png"}
 items["258"] = { name:"Head Cloth",type:"head_armor", img:"img/items/large/itm_sarranid_felt_head_cloth_b.png"}
 items["257"] = { name:"Brown Head Cloth",type:"head_armor", img:"img/items/large/itm_sarranid_felt_head_cloth.png"}
 items["256"] = { name:"Orange Lady Head Cloth",type:"head_armor", img:"img/items/large/itm_sarranid_head_cloth_b.png"}
 items["255"] = { name:"Purple Lady Head Cloth",type:"head_armor", img:"img/items/large/itm_sarranid_head_cloth.png"}
 items["23"] = { name:"Stones",type:"throwing", img:"img/items/large/itm_stones.png"}
 items["283"] = { name:"Head Wrapping",type:"head_armor", img:"img/items/large/itm_head_wrappings.png"}
 items["273"] = { name:"Straw Hat",type:"head_armor", img:"img/items/large/itm_straw_hat.png"}
 items["218"] = { name:"Wrapping Boots",type:"foot_armor", img:"img/items/large/itm_wrapping_boots.png"}

var modicators = new Array();

modicators.push("Tempered");
modicators.push("Strong");
modicators.push("Sharp");
modicators.push("Large Bag of");
modicators.push("Heavy");
modicators.push("Deadly");
modicators.push("Thick");
modicators.push("Spirited");
modicators.push("Reinforced");
modicators.push("Powerful");
modicators.push("Fine");
modicators.push("Balanced");
modicators.push("Mighty");
modicators.push("Masterwork");
modicators.push("Champion");
modicators.push("Staffmaster's");
modicators.push("Lordly");
modicators.push("Elder's");
modicators.push("Well Bred");
modicators.push("Well Made");
modicators.push("Masterpiece");

var url = document.location.href;
var equipIndex = url.indexOf("index.php?page=equip");
var weatherItem = findElement("DIV", "item weather");
var headerItem = document.getElementById("header");

if(equipIndex >= 0)
{
	var index = url.indexOf("cat=");
	
	if(index >= 0)
	{
		//var params = url.substring(index + 4);
		//findElement("A", params).style.backgroundColor = "red";
	}
	else
	{
		//findElement("A", "inv").style.backgroundColor = "red";
	}
}

var marketTable = findElement("table", "list marketplace");

if(marketTable)
{
	for(var i = 0; i < marketTable.rows.length; i++)
	{
		var cell = marketTable.rows[i].cells[1];
		var cell2 = marketTable.rows[i].cells[3];
		
		cell.addEventListener("mouseover", marketItemImage, true);
		cell.addEventListener("mouseout", hideMarketItemImage, true);

		cell2.addEventListener("mouseover", marketItemImage, true);
		cell2.addEventListener("mouseout", hideMarketItemImage, true);
	}
}

function hideMarketItemImage()
{
	var hoverImage = document.getElementById("hoverImage");
	
	if(hoverImage)
	{
		hoverImage.style.display = "none";
	}
}

function marketItemImage(ev)
{
	var hoverImage = document.getElementById("hoverImage");
	
	if(hoverImage) {} else
	{
		hoverImage = document.createElement("img");
		hoverImage.id = "hoverImage";
		hoverImage.style.cssText = "position:absolute;z-index:1000;background-color:white;border:solid black 1px; padding:5px;";
		
		document.body.appendChild(hoverImage);
	}

	var name = ev.target.textContent;
	var className = ev.target.className;
	
	if(className.indexOf("itemrank1") == 0
	|| className.indexOf("itemrank2") == 0
	|| className.indexOf("itemrank3") == 0)
	{
		name = clearName(name);
	}
	
	if(name == "")
	{
		hoverImage.style.display = "none";
	}
	else
	{
		hoverImage.src = getItemByName(name).img;
		hoverImage.style.display = "block";
		hoverImage.style.left = (ev.clientX + 10)+ "px";
		hoverImage.style.top = (ev.clientY + 10) + "px";
	}
}

function getItemByName(text)
{
	for(var k in items)
		if(items[k].name == text)
			return items[k];
	
	return 0;
}

function clearName(text)
{
	for(var i = 0; i < modicators.length; i ++)
	{
		var mod = modicators[i];
		
		if(text.indexOf(mod) == 0)
			return text.substring(mod.length + 1);
	}

	return text;
}

function findElement(tag, className)
{
	var list = document.getElementsByTagName(tag);
	
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].className.indexOf(className) >= 0)
			return list[i];
	}
	
	return null;
}
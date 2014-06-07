// ==UserScript==
// @name           uni_hwm_links_to_auction
// @homepage       http://userscripts.org/scripts/show/168965
// @description    Shows some links to offers in auction (2014.01.29)
// @version        1.02
// @namespace      heroeswm
// @include        http://178.248.235.15/auction.php*
// @include        http://*.heroeswm.*/auction.php*
// @include        http://*.lordswm.*/auction.php*
// @exclude        */auction.php?cat=elements*
// ==/UserScript==
/*
 * Copyright (c) 2009 by Alex Kocharin <alex@kocharin.pp.ru>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 */

var debug = false;

var image_to_link = {
	'/i/b_wood.gif':                          'cat=res&type=1',
	'/i/b_ore.gif':                           'cat=res&type=2',
	'/i/b_mercury.gif':                       'cat=res&type=3',
	'/i/b_sulphur.gif':                       'cat=res&type=4',
	'/i/b_crystal.gif':                       'cat=res&type=5',
	'/i/b_gem.gif':                           'cat=res&type=6',

	'/i/artifacts/mm_staff':                  'cat=weapon&art_type=mm_staff',
	'/i/artifacts/mm_sword':                  'cat=weapon&art_type=mm_sword',
	'/i/artifacts/bow14':                     'cat=weapon&art_type=bow14',
	'/i/artifacts/ffstaff15':                 'cat=weapon&art_type=ffstaff15',
	'/i/artifacts/firsword15':                'cat=weapon&art_type=firsword15',
	'/i/artifacts/staff':                     'cat=weapon&art_type=staff',
	'/i/artifacts/woodensword':               'cat=weapon&art_type=wood_sword',
	'/i/artifacts/long_bow':                  'cat=weapon&art_type=long_bow',
	'/i/artifacts/hunterdagger':              'cat=weapon&art_type=hunterdagger',
	'/i/artifacts/dagger':                    'cat=weapon&art_type=dagger',
	'/i/artifacts/huntersword2':              'cat=weapon&art_type=huntersword2',
	'/i/artifacts/onehandaxe':                'cat=weapon&art_type=gnome_hammer',
	'/i/artifacts/gm/gm_abow':                'cat=weapon&art_type=gm_abow',
	'/i/artifacts/gm/gm_sword':               'cat=weapon&art_type=gm_sword',
	'/i/artifacts/gm/gm_kastet':              'cat=weapon&art_type=gm_kastet',
	'/i/artifacts/hunter_bow2':               'cat=weapon&art_type=hunter_bow2',
	'/i/artifacts/hunter_bow1':               'cat=weapon&art_type=hunter_bow1',
	'/i/artifacts/power_sword':               'cat=weapon&art_type=power_sword',
	'/i/artifacts/requitalsword':             'cat=weapon&art_type=requital_sword',
	'/i/artifacts/broadsword':                'cat=weapon&art_type=broad_sword',
	'/i/artifacts/def_sword':                 'cat=weapon&art_type=def_sword',
	'/i/artifacts/mif_sword':                 'cat=weapon&art_type=mif_sword',
	'/i/artifacts/mif_staff':                 'cat=weapon&art_type=mif_staff',
	'/i/artifacts/sor_staff':                 'cat=weapon&art_type=sor_staff',
	'/i/artifacts/hunterdsword':              'cat=weapon&art_type=hunterdsword',
	'/i/artifacts/energy_scroll':             'cat=weapon&art_type=energy_scroll',
	'/i/artifacts/composite_bow':             'cat=weapon&art_type=composite_bow',
	'/i/artifacts/steelsword':                'cat=weapon&art_type=steel_blade',
	'/i/artifacts/hunter_sword1':             'cat=weapon&art_type=hunter_sword1',
	'/i/artifacts/shortbow':                  'cat=weapon&art_type=shortbow',
	'/i/artifacts/ssword8':                   'cat=weapon&art_type=ssword8',
	'/i/artifacts/mstaff10':                  'cat=weapon&art_type=mstaff10',
	'/i/artifacts/ssword10':                  'cat=weapon&art_type=ssword10',
	'/i/artifacts/ssword13':                  'cat=weapon&art_type=ssword13',
	'/i/artifacts/ssmstaff16':                'cat=weapon&art_type=smstaff16',
	'/i/artifacts/szzsword16':                'cat=weapon&art_type=ssword16',
	'/i/artifacts/bbobow17':                  'cat=weapon&art_type=bow17',
	'/i/artifacts/smmstaff18':                'cat=weapon&art_type=staff18',
	'/i/artifacts/shhscroll18':               'cat=weapon&art_type=scroll18',
	'/i/artifacts/smasword18':                'cat=weapon&art_type=sword18',
	'/i/artifacts/blacksword':                'cat=weapon&art_type=blacksword',
	'/i/artifacts/bludgeon':                  'cat=weapon&art_type=bludgeon',
	'/i/artifacts/centaurbow':                'cat=weapon&art_type=centaurbow',
	'/i/artifacts/dem_dmech':                 'cat=weapon&art_type=dem_dmech',
	'/i/artifacts/dem_dtopor':                'cat=weapon&art_type=dem_dtopor',
	'/i/artifacts/dem_kosa':                  'cat=weapon&art_type=dem_kosa',
	'/i/artifacts/dubina':                    'cat=weapon&art_type=dubina',
	'/i/artifacts/gdubina':                   'cat=weapon&art_type=gdubina',
	'/i/artifacts/kopie':                     'cat=weapon&art_type=kopie',
	'/i/artifacts/molot_tan':                 'cat=weapon&art_type=molot_tan',
	'/i/artifacts/pika':                      'cat=weapon&art_type=pika',
	'/i/artifacts/sea_trident':               'cat=weapon&art_type=sea_trident',
	'/i/artifacts/sh/sh_bow':                 'cat=weapon&art_type=sh_bow',
	'/i/artifacts/sh/sh_spear':               'cat=weapon&art_type=sh_spear',
	'/i/artifacts/sh/sh_sword':               'cat=weapon&art_type=sh_sword',
	'/i/artifacts/slayersword':               'cat=weapon&art_type=slayersword',
	'/i/artifacts/sunart1':                   'cat=weapon&art_type=sunart1',
	'/i/artifacts/sunart2':                   'cat=weapon&art_type=sunart2',
	'/i/artifacts/sunart3':                   'cat=weapon&art_type=sunart3',
	'/i/artifacts/sunart4':                   'cat=weapon&art_type=sunart4',
	'/i/artifacts/topor_skelet':              'cat=weapon&art_type=topor_skelet',
	'/i/artifacts/tunnel_kirka':              'cat=weapon&art_type=tunnel_kirka',
	'/i/artifacts/goblin_bow':                'cat=weapon&art_type=goblin_bow',
	'/i/artifacts/orc_axe':                   'cat=weapon&art_type=orc_axe',
	'/i/artifacts/ogre_bum':                  'cat=weapon&art_type=ogre_bum',
	
	'/i/artifacts/leatherhelmet':             'cat=helm&art_type=leather_helm',
	'/i/artifacts/magehat':                   'cat=helm&art_type=wizard_cap',
	'/i/artifacts/chaincoif':                 'cat=helm&art_type=chain_coif',
	'/i/artifacts/hunter_roga1':              'cat=helm&art_type=hunter_roga1',
	'/i/artifacts/mif_lhelmet':               'cat=helm&art_type=mif_lhelmet',
	'/i/artifacts/steel_helmet':              'cat=helm&art_type=steel_helmet',
	'/i/artifacts/mif_hhelmet':               'cat=helm&art_type=mif_hhelmet',
	'/i/artifacts/gm/gm_hat':                 'cat=helm&art_type=gm_hat',
	'/i/artifacts/mage_helm':                 'cat=helm&art_type=mage_helm',
	'/i/artifacts/shelm8':                    'cat=helm&art_type=shelm8',
	'/i/artifacts/shelm12':                   'cat=helm&art_type=shelm12',
	'/i/artifacts/mhelmetzh13':               'cat=helm&art_type=mhelmetzh13',
	'/i/artifacts/zxhelmet13':                'cat=helm&art_type=zxhelmet13',
	'/i/artifacts/xymhelmet15':               'cat=helm&art_type=xymhelmet15',
	'/i/artifacts/myhelmet15':                'cat=helm&art_type=myhelmet15',
	'/i/artifacts/umshelm16':                   'cat=helm&art_type=shelm16',
	'/i/artifacts/hwmhelmet17':               'cat=helm&art_type=helmet17',
	'/i/artifacts/miqmhelmet17':              'cat=helm&art_type=mhelmet17',
	'/i/artifacts/hunter_helm':               'cat=helm&art_type=hunter_helm',
	'/i/artifacts/knowlengehat':              'cat=helm&art_type=knowledge_hat',
	'/i/artifacts/hunter_hat1':               'cat=helm&art_type=hunter_hat1',
	'/i/artifacts/necrohelm1':                'cat=helm&art_type=necrohelm1',
	'/i/artifacts/necrohelm2':                'cat=helm&art_type=necrohelm2',
	'/i/artifacts/necrohelm3':                'cat=helm&art_type=necrohelm3',
	'/i/artifacts/sh/sh_helmet':              'cat=helm&art_type=sh_helmet',
	'/i/artifacts/tj_helmet1':                'cat=helm&art_type=tj_helmet1',
	'/i/artifacts/tj_helmet2':                'cat=helm&art_type=tj_helmet2',
	'/i/artifacts/tj_helmet3':                'cat=helm&art_type=tj_helmet3',

	'/i/artifacts/gm/gm_amul':                'cat=necklace&art_type=gm_amul',
	'/i/artifacts/hunter_amulet1':            'cat=necklace&art_type=hunter_amulet1',
	'/i/artifacts/lucknecklace':              'cat=necklace&art_type=amulet_of_luck',
	'/i/artifacts/warrior_pendant':           'cat=necklace&art_type=warrior_pendant',
	'/i/artifacts/power_pendant':             'cat=necklace&art_type=power_pendant',
	'/i/artifacts/hunter_pendant1':           'cat=necklace&art_type=hunter_pendant1',
	'/i/artifacts/magic_amulet':              'cat=necklace&art_type=magic_amulet',
	'/i/artifacts/braverymedal':              'cat=necklace&art_type=bravery_medal',
	'/i/artifacts/wzzamulet13':               'cat=necklace&art_type=wzzamulet13',
	'/i/artifacts/mmzamulet13':               'cat=necklace&art_type=mmzamulet13',
	'/i/artifacts/bafamulet15':               'cat=necklace&art_type=bafamulet15',
	'/i/artifacts/mmzamulet16':               'cat=necklace&art_type=mmzamulet16',
	'/i/artifacts/wzzamulet16':               'cat=necklace&art_type=wzzamulet16',
	'/i/artifacts/rog_demon':                 'cat=necklace&art_type=rog_demon',
	'/i/artifacts/samul8':                    'cat=necklace&art_type=samul8',
	'/i/artifacts/samul14':                   'cat=necklace&art_type=samul14',
	'/i/artifacts/smamul14':                  'cat=necklace&art_type=smamul14',
	'/i/artifacts/sekmamul17':                'cat=necklace&art_type=smamul17',
	'/i/artifacts/warsamul17':                'cat=necklace&art_type=samul17',
	'/i/artifacts/nwamulet19':                'cat=necklace&art_type=amulet19',
	'/i/artifacts/megmamulet19':              'cat=necklace&art_type=mamulet19',
	'/i/artifacts/sh/sh_amulet2':             'cat=necklace&art_type=sh_amulet2',
	'/i/artifacts/2year_amul_lords':          'cat=necklace&art_type=2year_amul_lords',
	'/i/artifacts/3year_amul':                'cat=necklace&art_type=3year_amul',
	'/i/artifacts/4year_klever':              'cat=necklace&art_type=4year_klever',
	'/i/artifacts/5years_star':               'cat=necklace&art_type=5years_star',
	'/i/artifacts/zub':                       'cat=necklace&art_type=zub',
	'/i/artifacts/sharik':                    'cat=necklace&art_type=sharik',
	'/i/artifacts/snowjinka':                 'cat=necklace&art_type=snowjinka',
	'/i/artifacts/sosulka':                   'cat=necklace&art_type=sosulka',

	'/i/artifacts/leather_shiled':            'cat=cuirass&art_type=leather_shiled',
	'/i/artifacts/leatherplate':              'cat=cuirass&art_type=leatherplate',
	'/i/artifacts/chainarmor':                'cat=cuirass&art_type=hauberk',
	'/i/artifacts/gm/gm_arm':                 'cat=cuirass&art_type=gm_arm',
	'/i/artifacts/hunter_armor1':             'cat=cuirass&art_type=hunter_armor1',
	'/i/artifacts/leathershield':             'cat=cuirass&art_type=leather_shiled',
	'/i/artifacts/mif_light':                 'cat=cuirass&art_type=mif_light',
	'/i/artifacts/mage_armor':                'cat=cuirass&art_type=mage_armor',
	'/i/artifacts/mage_robes':                'cat=cuirass&art_type=wiz_robe',
	'/i/artifacts/hunter_jacket1':            'cat=cuirass&art_type=hunter_jacket1',
	'/i/artifacts/ciras':                     'cat=cuirass&art_type=ciras',
	'/i/artifacts/full_plate':                'cat=cuirass&art_type=full_plate',
	'/i/artifacts/miff_plate':                'cat=cuirass&art_type=miff_plate',
	'/i/artifacts/sarmor9':                   'cat=cuirass&art_type=sarmor9',
	'/i/artifacts/sarmor13':                  'cat=cuirass&art_type=sarmor13',
	'/i/artifacts/armor15':                   'cat=cuirass&art_type=armor15',
	'/i/artifacts/robewz15':                  'cat=cuirass&art_type=robewz15',
	'/i/artifacts/brsarmor16':                'cat=cuirass&art_type=sarmor16',
	'/i/artifacts/anwarmor17':                'cat=cuirass&art_type=armor17',
	'/i/artifacts/mammarmor17':               'cat=cuirass&art_type=marmor17',
	'/i/artifacts/sh/sh_armor':               'cat=cuirass&art_type=sh_armor',
	'/i/artifacts/tjarmor1':                  'cat=cuirass&art_type=tjarmor1',
	'/i/artifacts/tjarmor2':                  'cat=cuirass&art_type=tjarmor2',
	'/i/artifacts/tjarmor3':                  'cat=cuirass&art_type=tjarmor3',

	'/i/artifacts/wiz_cape':                  'cat=cloack&art_type=wiz_cape',
	'/i/artifacts/cloackwz15':                'cat=cloack&art_type=cloackwz15',
	'/i/artifacts/gm/gm_protect':             'cat=cloack&art_type=gm_protect',
	'/i/artifacts/hunter_mask1':              'cat=cloack&art_type=hunter_mask1',
	'/i/artifacts/soulcape':                  'cat=cloack&art_type=soul_cape',
	'/i/artifacts/powercape':                 'cat=cloack&art_type=powercape',
	'/i/artifacts/antiair_cape':              'cat=cloack&art_type=antiair_cape',
	'/i/artifacts/antimagic_cape':            'cat=cloack&art_type=antimagic_cape',
	'/i/artifacts/antifire_cape':             'cat=cloack&art_type=antifire_cape',
	'/i/artifacts/scoutcloack':               'cat=cloack&art_type=scoutcloack',
	'/i/artifacts/scloack8':                  'cat=cloack&art_type=scloack8',
	'/i/artifacts/mascloack16':               'cat=cloack&art_type=scloack16',
	'/i/artifacts/clscloack17':               'cat=cloack&art_type=cloack17',
	'/i/artifacts/sh/sh_cloak':               'cat=cloack&art_type=sh_cloak',
	'/i/artifacts/antifire_cape':             'cat=cloack&art_type=antifire_cape',

	'/i/artifacts/tj-vboots1':                'cat=boots&art_type=tj-vboots1',
	'/i/artifacts/tj-vboots2':                'cat=boots&art_type=tj-vboots2',
	'/i/artifacts/tj-vboots3':                'cat=boots&art_type=tj-vboots3',
	'/i/artifacts/boots13':                   'cat=boots&art_type=boots13',
	'/i/artifacts/mboots14':                  'cat=boots&art_type=mboots14',
	'/i/artifacts/wiz_boots':                 'cat=boots&art_type=wiz_boots',
	'/i/artifacts/boots15':                   'cat=boots&art_type=boots15',
	'/i/artifacts/hunterboots':               'cat=boots&art_type=hunter_boots',
	'/i/artifacts/mif_lboots':                'cat=boots&art_type=mif_lboots',
	'/i/artifacts/hunter_boots3':             'cat=boots&art_type=hunter_boots3',
	'/i/artifacts/gm/gm_spdb':                'cat=boots&art_type=gm_spdb',
	'/i/artifacts/hunter_boots2':             'cat=boots&art_type=hunter_boots2',
	'/i/artifacts/hunter_boots1':             'cat=boots&art_type=hunter_boots1',
	'/i/artifacts/steel_boots':               'cat=boots&art_type=steel_boots',
	'/i/artifacts/initboots':                 'cat=boots&art_type=shoe_of_initiative',
	'/i/artifacts/mif_hboots':                'cat=boots&art_type=mif_hboots',
	'/i/artifacts/leatherboots':              'cat=boots&art_type=leatherboots',
	'/i/artifacts/boots2':                    'cat=boots&art_type=boots2',
	'/i/artifacts/sboots9':                   'cat=boots&art_type=sboots9',
	'/i/artifacts/sboots12':                  'cat=boots&art_type=sboots12',
	'/i/artifacts/nmsboots16':                'cat=boots&art_type=sboots16',
	'/i/artifacts/bzbboots17':                'cat=boots&art_type=boots17',
	'/i/artifacts/macmboots17':               'cat=boots&art_type=mboots17',
	'/i/artifacts/sh/sh_boots':               'cat=boots&art_type=sh_boots',

	'/i/artifacts/tj-shield1':                'cat=shield&art_type=tj-shield1',
	'/i/artifacts/tj-shield2':                'cat=shield&art_type=tj-shield2',
	'/i/artifacts/tj-shield3':                'cat=shield&art_type=tj-shield3',
	'/i/artifacts/shield13':                  'cat=shield&art_type=shield13',
	'/i/artifacts/shield16':                  'cat=shield&art_type=shield16',
	'/i/artifacts/large_shield':              'cat=shield&art_type=large_shield',
	'/i/artifacts/roundshield':               'cat=shield&art_type=round_shiled',
	'/i/artifacts/gm/gm_defence':             'cat=shield&art_type=gm_defence',
	'/i/artifacts/dragon_shield':             'cat=shield&art_type=dragon_shield',
	'/i/artifacts/huntershield2':             'cat=shield&art_type=huntershield2',
	'/i/artifacts/hunter_shield1':            'cat=shield&art_type=hunter_shield1',
	'/i/artifacts/protectshield':             'cat=shield&art_type=defender_shield',
        '/i/artifacts/round_shiled':              'cat=shield&art_type=round_shiled',
	'/i/artifacts/s_shield':                  'cat=shield&art_type=s_shield',
	'/i/artifacts/sshield5':                  'cat=shield&art_type=sshield5',
	'/i/artifacts/sshield11':                 'cat=shield&art_type=sshield11',
	'/i/artifacts/zpsshield14':               'cat=shield&art_type=sshield14',
	'/i/artifacts/esshield17':                'cat=shield&art_type=sshield17',
	'/i/artifacts/sioshield19':               'cat=shield&art_type=shield19',
	'/i/artifacts/ru_statue':                 'cat=shield&art_type=ru_statue',
	'/i/artifacts/sh/sh_shield':              'cat=shield&art_type=sh_shield',

	'/i/artifacts/magring13':                 'cat=ring&art_type=magring13',
	'/i/artifacts/warring13':                 'cat=ring&art_type=warring13',
	'/i/artifacts/bring14':                   'cat=ring&art_type=bring14',
	'/i/artifacts/mmmring16':                 'cat=ring&art_type=mmmring16',
	'/i/artifacts/wwwring16':                 'cat=ring&art_type=wwwring16',
	'/i/artifacts/gm/gm_rring':               'cat=ring&art_type=gm_rring',
	'/i/artifacts/warriorring':               'cat=ring&art_type=warriorring',
	'/i/artifacts/gm/gm_sring':               'cat=ring&art_type=gm_sring',
	'/i/artifacts/hunter_ring2':              'cat=ring&art_type=hunter_ring2',
	'/i/artifacts/circ_ring':                 'cat=ring&art_type=circ_ring',
	'/i/artifacts/hunter_ring1':              'cat=ring&art_type=hunter_ring1',
	'/i/artifacts/powerring':                 'cat=ring&art_type=powerring',
	'/i/artifacts/necroring':                 'cat=ring&art_type=doubt_ring',
	'/i/artifacts/hastering':                 'cat=ring&art_type=rashness_ring',
	'/i/artifacts/darkring':                  'cat=ring&art_type=darkring',
	'/i/artifacts/eaglering':                 'cat=ring&art_type=verve_ring',
	'/i/artifacts/i_ring':                    'cat=ring&art_type=i_ring',
	'/i/artifacts/sring4':                    'cat=ring&art_type=sring4',
	'/i/artifacts/smring10':                  'cat=ring&art_type=smring10',
	'/i/artifacts/sring10':                   'cat=ring&art_type=sring10',
	'/i/artifacts/masmring17':                'cat=ring&art_type=smring17',
	'/i/artifacts/fgsring17':                 'cat=ring&art_type=sring17',
	'/i/artifacts/rarring19':                 'cat=ring&art_type=ring19',
	'/i/artifacts/meqmring19':                'cat=ring&art_type=mring19',
	'/i/artifacts/sh/sh_ring1':               'cat=ring&art_type=sh_ring1',
	'/i/artifacts/sh/sh_ring2':               'cat=ring&art_type=sh_ring2',
	'/i/artifacts/snake_ring':                'cat=ring&art_type=ring2013',
	'/i/artifacts/6ring':                     'cat=ring&art_type=6ring',

	'/i/skeletico.gif':                       'cat=skeletons',

	'/i/abrasive.gif':                        'cat=elements&art_type=abrasive',
	'/i/snake_poison.gif':                    'cat=elements&art_type=snake_poison',
	'/i/tiger_tusk.gif':                      'cat=elements&art_type=tiger_tusk',
	'/i/ice_crystal.gif':                     'cat=elements&art_type=ice_crystal',
	'/i/moon_stone.gif':                      'cat=elements&art_type=moon_stone',
	'/i/fire_crystal.gif':                    'cat=elements&art_type=fire_crystal',
	'/i/meteorit.gif':                        'cat=elements&art_type=meteorit',
	'/i/witch_flower.gif':                    'cat=elements&art_type=witch_flower',
	'/i/wind_flower.gif':                     'cat=elements&art_type=wind_flower',
	'/i/fern_flower.gif':                     'cat=elements&art_type=fern_flower',
	'/i/badgrib.gif':                         'cat=elements&art_type=badgrib',

	'/i/artifacts/thief_paper':               'cat=other&art_type=thief_paper',
	'/i/artifacts/hunter_gloves1':            'cat=other&art_type=hunter_gloves1',
	'/i/artifacts/gm/gm_3arrows':             'cat=other&art_type=gm_3arrows',
	'/i/artifacts/hunter_arrows1':            'cat=other&art_type=hunter_arrows1',
	'/i/artifacts/sh/sh_4arrows':             'cat=other&art_type=sh_4arrows',

	'/i/artifacts/thief_amulet':              'cat=thief&art_type=thief_neckl',
	'/i/artifacts/thief_arb':                 'cat=thief&art_type=thief_arb',
	'/i/artifacts/thief_armor':               'cat=thief&art_type=thief_goodarmor',
	'/i/artifacts/thief_dagger':              'cat=thief&art_type=thief_ml_dagger',
	'/i/artifacts/thief_ring':                'cat=thief&art_type=ring_of_thief',
	'/i/artifacts/thief_mask':                'cat=thief&art_type=thief_msk',
	'/i/artifacts/thief_cape':                'cat=thief&art_type=thief_cape',
	'/i/artifacts/thief_boots':               'cat=thief&art_type=thief_fastboots',
	'/i/artifacts/medals/thief_premiumring1': 'cat=thief&art_type=thief_premiumring1',
	'/i/artifacts/medals/thief_premiumring2': 'cat=thief&art_type=thief_premiumring2',
	'/i/artifacts/medals/thief_premiumring3': 'cat=thief&art_type=thief_premiumring3',
	'/i/artifacts/tm_amulet':                 'cat=thief&art_type=tm_amulet',
	'/i/artifacts/tm_arb':                    'cat=thief&art_type=tm_arb',
	'/i/artifacts/tm_armor':                  'cat=thief&art_type=tm_armor',
	'/i/artifacts/tm_knife':                  'cat=thief&art_type=tm_knife',
	'/i/artifacts/tm_mring':                  'cat=thief&art_type=tm_mring',
	'/i/artifacts/tm_wring':                  'cat=thief&art_type=tm_wring',
	'/i/artifacts/tm_msk':                    'cat=thief&art_type=tm_msk',
	'/i/artifacts/tm_cape':                   'cat=thief&art_type=tm_cape',
	'/i/artifacts/tm_boots':                  'cat=thief&art_type=tm_boots',

	'/i/artifacts/tact/tact1w1_wamulet':      'cat=tactic&art_type=tact1w1_wamulet',
	'/i/artifacts/tact/tactcv1_armor':        'cat=tactic&art_type=tactcv1_armor',
	'/i/artifacts/tact/tactsm0_dagger':       'cat=tactic&art_type=tactsm0_dagger',
	'/i/artifacts/tact/tactspw_mring':        'cat=tactic&art_type=tactspw_mring',
	'/i/artifacts/tact/tactwww_wring':        'cat=tactic&art_type=tactwww_wring',
	'/i/artifacts/tact/tact765_bow':          'cat=tactic&art_type=tact765_bow',
	'/i/artifacts/tact/tactms1_mamulet':      'cat=tactic&art_type=tactms1_mamulet',
	'/i/artifacts/tact/tactpow_cloack':       'cat=tactic&art_type=tactpow_cloack',
	'/i/artifacts/tact/tactmag_staff':        'cat=tactic&art_type=tactmag_staff',
	'/i/artifacts/tact/tactzl4_boots':        'cat=tactic&art_type=tactzl4_boots',
	'/i/artifacts/tact/tactaz_axe':           'cat=tactic&art_type=tactaz_axe',
	'/i/artifacts/tact/tacthapp_helmet':      'cat=tactic&art_type=tacthapp_helmet',
	'/i/artifacts/tact/tactdff_shield':       'cat=tactic&art_type=tactdff_shield',

	'/i/artifacts/verb/v_1armor':             'cat=verb&art_type=v_1armor',
	'/i/artifacts/verb/verb11_sword':         'cat=verb&art_type=verb11_sword',
	'/i/artifacts/verb/verbboots':            'cat=verb&art_type=verbboots',
	'/i/artifacts/verb/ve_helm':              'cat=verb&art_type=ve_helm',
	'/i/artifacts/verb/vrb_shild':            'cat=verb&art_type=vrb_shild',

	'/i/artifacts/gnomewar/medal1':           'cat=medals&art_type=gnomewar1',
	'/i/artifacts/gnomewar/medal2':           'cat=medals&art_type=gnomewar2',
	'/i/artifacts/gnomewar/medal3':           'cat=medals&art_type=gnomewar3',
	'/i/artifacts/gnomewar/medal4':           'cat=medals&art_type=gnomewar4',
	'/i/artifacts/gnomewar/medal5':           'cat=medals&art_type=gnomewar5',
	'/i/artifacts/gnomewar/medal6':           'cat=medals&art_type=gnomewar6',
	'/i/artifacts/gnomewar/medal7':           'cat=medals&art_type=gnomewar7',
	'/i/artifacts/gnomewar/splo':             'cat=medals&art_type=gnomewar_splo',
	'/i/artifacts/gnomewar/stoj':             'cat=medals&art_type=gnomewar_stoj',
	'/i/artifacts/gnomewar/takt':             'cat=medals&art_type=gnomewar_takt',

	'/i/artifacts/bwar/bmedal1':              'cat=medals&art_type=bwar1',
	'/i/artifacts/bwar/bmedal2':              'cat=medals&art_type=bwar2',
	'/i/artifacts/bwar/bmedal3':              'cat=medals&art_type=bwar3',
	'/i/artifacts/bwar/bmedal4':              'cat=medals&art_type=bwar4',
	'/i/artifacts/bwar/bmedal5':              'cat=medals&art_type=bwar5',
	'/i/artifacts/bwar/bmedal6':              'cat=medals&art_type=bwar6',
	'/i/artifacts/bwar/bmedal7':              'cat=medals&art_type=bwar7',
	'/i/artifacts/bwar/bmedala1':             'cat=medals&art_type=bwar_splo',
	'/i/artifacts/bwar/bmedalb1':             'cat=medals&art_type=bwar_stoj',
	'/i/artifacts/bwar/bmedalc1':             'cat=medals&art_type=bwar_takt',

	'/i/artifacts/kwar/kmedal1':              'cat=medals&art_type=kwar1',
	'/i/artifacts/kwar/kmedal2':              'cat=medals&art_type=kwar2',
	'/i/artifacts/kwar/kmedal3':              'cat=medals&art_type=kwar3',
	'/i/artifacts/kwar/kmedal4':              'cat=medals&art_type=kwar4',
	'/i/artifacts/kwar/kmedal5':              'cat=medals&art_type=kwar5',
	'/i/artifacts/kwar/kmedal6':              'cat=medals&art_type=kwar6',
	'/i/artifacts/kwar/kmedal7':              'cat=medals&art_type=kwar7',
	'/i/artifacts/kwar/medala':               'cat=medals&art_type=kwar_splo',
	'/i/artifacts/kwar/medalb':               'cat=medals&art_type=kwar_stoj',
	'/i/artifacts/kwar/medalc':               'cat=medals&art_type=kwar_takt',

	'/i/artifacts/necrwar1st':                'cat=medals&art_type=necrwar1st',
	'/i/artifacts/medals/warthief_medal1':    'cat=medals&art_type=warthief_medal1',
	'/i/artifacts/medals/warthief_medal2':    'cat=medals&art_type=warthief_medal2',
	'/i/artifacts/medals/warthief_medal3':    'cat=medals&art_type=warthief_medal3',
	'/i/artifacts/medals/warthief_medal4':    'cat=medals&art_type=warthief_medal4',
	'/i/artifacts/medals/warthief_medal5':    'cat=medals&art_type=warthief_medal5',
	'/i/artifacts/elfwar1':                   'cat=medals&art_type=elfwar1',
	'/i/artifacts/elfwar2':                   'cat=medals&art_type=elfwar2',
	'/i/artifacts/elfwar3':                   'cat=medals&art_type=elfwar3',
	'/i/artifacts/elfwar4':                   'cat=medals&art_type=elfwar4',
	'/i/artifacts/elfwar5':                   'cat=medals&art_type=elfwar5',
	'/i/artifacts/elfwar6':                   'cat=medals&art_type=elfwar6',
	'/i/artifacts/medals/magewar1':           'cat=medals&art_type=magewar1',
	'/i/artifacts/medals/magewar2':           'cat=medals&art_type=magewar2',
	'/i/artifacts/medals/magewar3':           'cat=medals&art_type=magewar3',
	'/i/artifacts/medals/magewar4':           'cat=medals&art_type=magewar4',
	'/i/artifacts/medals/magewar5':           'cat=medals&art_type=magewar5',
	'/i/artifacts/demwar1':                   'cat=medals&art_type=demwar1',
	'/i/artifacts/demwar2':                   'cat=medals&art_type=demwar2',
	'/i/artifacts/demwar3':                   'cat=medals&art_type=demwar3',
	'/i/artifacts/demwar4':                   'cat=medals&art_type=demwar4',
	'/i/artifacts/demwar5':                   'cat=medals&art_type=demwar5',
	'/i/artifacts/demwar6':                   'cat=medals&art_type=demwar6',
	'/i/artifacts/war/mage_scroll':           'cat=relict&art_type=mage_scroll',
	'/i/artifacts/gnomewar/armor2':           'cat=relict&art_type=gnomem_armor',
	'/i/artifacts/darkelfciras':              'cat=relict&art_type=darkelfciras',
	'/i/artifacts/testring':                  'cat=relict&art_type=testring',
	'/i/artifacts/gnomewar/hammer2':          'cat=relict&art_type=gnomem_hammer',
	'/i/artifacts/war/mage_staff':            'cat=relict&art_type=mage_staff',
	'/i/artifacts/war/mage_robe':             'cat=relict&art_type=mage_robe',
	'/i/artifacts/elfshirt':                  'cat=relict&art_type=elfshirt',
	'/i/artifacts/gnomewar/boots1':           'cat=relict&art_type=gnomeboots',
	'/i/artifacts/war/mage_boots':            'cat=relict&art_type=mage_boots',
	'/i/artifacts/dem_bootshields':           'cat=relict&art_type=dem_bootshields',
	'/i/artifacts/dem_axes.jpg':              'cat=relict&art_type=dem_axe',
	'/i/artifacts/gnomewar/helmet1':          'cat=relict&art_type=gnomehelmet'
};

if (location.href.match(/\/auction\.php/)) {
	var m;
	var alltrs = document.getElementsByTagName('tr');
	var ttbody = false;
	for(var i=0;i<alltrs.length;i++) {
		var bg = alltrs[i].getAttribute('bgcolor');
		if (bg && bg == '#dddddd') {
			ttbody = alltrs[i].parentNode;
			if (m = location.href.match(/(cat=[^&]+).*(&(art_)?type=[^&]+)/)) {
				var link = m[1]+m[2];
				var image = false;
				for(var key in image_to_link) {
					if (image_to_link[key] == link) {
						image = key;
					}
				}
			}
		}
	}

	if (ttbody == false) {
		return;
	}
	
	if (m = location.href.match(/cat=(\w+)/)) {
		if (m[1] != 'my') {
			if (!debug) return;
		}
	}

	alltrs = ttbody.getElementsByTagName('tr');
	for(var i=0;i<alltrs.length;i++) {
		var cc = alltrs[i].getAttribute('class');
		if (cc && cc == 'wb') {
			var allimgs = alltrs[i].getElementsByTagName('img');
			var myimg = false;
			for(var j=0; j<allimgs.length; j++) {
				if (allimgs[j].src.indexOf('/i/transparent.gif') >= 0) {
					myimg = '/'+allimgs[j].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('background').replace('_s.jpg', '');
					myimg = myimg.replace(/.*\/i\//, '/i/');
				} else if (allimgs[j].src.indexOf('/i/mods/') >= 0) {
					myimg = '/'+allimgs[j].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('background').replace('_s.jpg', '');
					break;
				} else if (allimgs[j].src.indexOf('/i/gold.gif') >= 0) {
				} else {
					if (myimg == false) {
						myimg = allimgs[j].src.replace(/.*\/i\//, '/i/').replace('_s.jpg', '');
					} else {
						myimg = '-- wrong art id --';
					}
				}
			}
			if (image_to_link[myimg]) {
				var alla = alltrs[i].getElementsByTagName('a');
				var mytd = false;
				for(var j=0; j<alla.length; j++) {
					if (alla[j].href.indexOf('auction_lot_protocol.php') >= 0) {
						mytd = alla[j].parentNode;
						while (mytd && mytd.tagName && mytd.tagName != 'TD') {
							mytd = mytd.parentNode;
						}
					}
				}
				if (mytd == false) {
					if (debug) { alert('mytd false'); }
				} else {
					mytd.appendChild(document.createElement('br'));
					var newa = document.createElement('a');
					newa.innerHTML = '<B>HA PblHOK</B> &gt;&gt;';
					newa.href = '/auction.php?' + image_to_link[myimg];
					newa.setAttribute('class', 'pi');
					mytd.appendChild(newa);
				}
			} else {
				if (debug) { alert(myimg); }
			}
		}
	}
}
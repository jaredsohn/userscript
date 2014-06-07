// ==UserScript==
// @name	uni_hwm_sklad
// @description Warehouse Tools (2014.01.29)
// @homepage	http://userscripts.org/scripts/show/174742
// @author	ElMarado
// @version	1.63
// @namespace	heroeswm
// @include	http://*.heroeswm.*/sklad_info.php*
// @include	http://178.248.235.15/sklad_info.php*
// @resource	sklad file:///C:/sklad.txt
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var version = '1.63';
var stavka_kuzni = 103;
var k_price=1;  				// коэффициент стоимости артов. 1 - 100%, 0.5 - 50%, и т.д.
var make_report = 0;                            // создавать отчет по прочке артов
var s_report = '';
var s_exp = '';
var price_rem = {
	leatherhat		:[1,171],
	leatherhelmet		:[1,627],
	knowlengehat		:[1,978],
	shelm8			:[1,1197],
	chaincoif		:[1,1539],
	magehat			:[1,1596],
	shelm12			:[1,2660],
	umshelm16		:[1,2774],
	mage_helm		:[1,3277],
	steel_helmet		:[1,3676],
	mif_lhelmet		:[1,5244],
	mif_hhelmet		:[1,6298],
	mhelmetzh13		:[1,6384],
	zxhelmet13		:[1,6384],
	myhelmet15		:[1,6583],
	xymhelmet15		:[1,6612],
	hwmhelmet17		:[1,7239],
	miqmhelmet17		:[1,7239],
	braverymedal		:[2,560],
	lucknecklace		:[2,959],
	samul8			:[2,3391],	samul81		:[2,3391],
	samul14			:[2,4370],	samul141	:[2,4370],
	smamul14		:[2,4370],
	sekmamul17		:[2,4389],
	warsamul17		:[2,4389],
	power_pendant		:[2,7381],
	warrior_pendant		:[2,8046],
	magic_amulet		:[2,8379],
	wzzamulet13		:[2,9975],
	mmzamulet13		:[2,9975],
	bafamulet15		:[2,10811],
	mmzamulet16		:[2,10972],
	wzzamulet16		:[2,10972],
	nwamulet19		:[2,11039],
	megmamulet19		:[2,11039],
	leathershield		:[3,266],
	leatherplate		:[3,1358],
	chainarmor		:[3,2289],
	sarmor9			:[3,2479],
	sarmor13		:[3,4322],
	brsarmor16		:[3,4351],
	ciras			:[3,4455],
	mage_armor		:[3,4465],
	mif_light		:[3,6251],
	full_plate		:[3,9243],
	mage_robes		:[3,9376],	wiz_robe	:[3,9376],
	armor15			:[3,9310],
	robewz15		:[3,9376],
	mammarmor17		:[3,9310],	marmor17	:[3,9310],
	anwarmor17		:[3,9490],
	miff_plate		:[3,9842],
	scoutcloack		:[4,304],
	soulcape		:[4,1197],
	scloack8		:[4,2052],
	antiair_cape		:[4,2926],
	mascloack16		:[4,3192],
	antimagic_cape		:[4,4949],
	powercape		:[4,5339],
	wiz_cape		:[4,8711],
	cloackwz15		:[4,9614],
	clscloack17		:[4,9975],
	woodensword		:[5,133],
	onehandaxe		:[5,294],
	shortbow		:[5,342],
	steelsword		:[5,465],
	dagger			:[5,912],
	def_sword		:[5,1292],
	staff			:[5,2527],
	requitalsword		:[5,2527],
	mstaff8			:[5,2888],
	mstaff10		:[5,3781],
	ssword8			:[5,3838],
	broadsword		:[5,4721],
	ssword10		:[5,4854],
	ssmstaff16		:[5,4883],
	ssword13		:[5,5985],
	szzsword16		:[5,6051],
	sor_staff		:[5,6118],
	long_bow		:[5,6318],
	composite_bow		:[5,8246],
	energy_scroll		:[5,9044],
	power_sword		:[5,9775],
	bow14			:[5,9946],
	bbobow17		:[5,10108],
	shhscroll18		:[5,10307],
	mif_staff		:[5,16387],
	mif_sword		:[5,16957],
	mm_staff		:[5,16986],
	mm_sword		:[5,17195],
	ffstaff15		:[5,17679],
	firsword15		:[5,17690],
	smmstaff18		:[5,17746],
	smasword18		:[5,17755],
	round_shiled		:[6,104],	roundshield	:[6,104],
	s_shield		:[6,266],
	protectshield		:[6,1130],
	sshield5		:[6,2888],
	sshield11		:[6,3876],
	zpsshield14		:[6,3923],
	esshield17		:[6,4018],
	dragon_shield		:[6,8778],
	large_shield		:[6,9576],
	shield13		:[6,10174],
	shield16		:[6,10298],
	sioshield19		:[6,10469],
	leatherboots		:[7,199],
	hunterboots		:[7,912],
	boots2			:[7,1026],
	sboots9			:[7,2137],
	initboots		:[7,2384],
	sboots12		:[7,2992],
	nmsboots16		:[7,3239],
	steel_boots		:[7,5785],
	mif_lboots		:[7,7153],
	mif_hboots		:[7,7752],
	wiz_boots		:[7,8008],
	boots13			:[7,8502],
	boots15			:[7,8559],
	bzbboots17		:[7,8683],	boots17		:[7,8683],
	macmboots17		:[7,8683],
	mboots14		:[7,8825],
	i_ring			:[8,171],
	sring4			:[8,579],
	necroring		:[8,1064],
	eaglering		:[8,1577],
	hastering		:[8,1928],
	smring10		:[8,2859],
	sring10			:[8,2859],
	masmring17		:[8,2907],
	fgsring17		:[8,2907],
	powerring		:[8,5187],
	circ_ring		:[8,6507],
	warriorring		:[8,6697],
	darkring		:[8,8379],
	magring13		:[8,10279],
	warring13		:[8,10279],
	bring14			:[8,10364],
	mmmring16		:[8,11238],
	wwwring16		:[8,11238],
	rarring19		:[8,11305],
	meqmring19		:[8,11390],
	flowers1		:[9,332],
	flowers2		:[9,332],
	venok			:[9,332],
	defender_dagger		:[9,1330],
	flower_heart		:[9,1662],
	flowers3		:[9,3325],
	half_heart_m		:[9,4987],
	half_heart_w		:[9,4987],
	bril_pendant		:[9,23275],
	bril_ring		:[9,33250],
	d_spray			:[9,3325],
	flowers4		:[9,4987],
	flowers5		:[9,4987],
	protazan		:[9,8312],
	wboots			:[9,16625],
	roses			:[9,8312],
	goldciras		:[9,13300],
	warmor			:[9,16625],
	whelmet			:[9,16625],
	shpaga			:[9,26600],
	bfly			:[9,49875],
	koltsou			:[9,23275],
	hunter_bow1		:[11,400],
	hunter_sword1		:[11,400],
	hunter_hat1		:[11,400],
	hunter_pendant1		:[11,400],
	hunter_jacket1		:[11,400],
	hunter_boots1		:[11,400],
	hunter_shield1		:[11,400],
	hunter_gloves1		:[11,400],
	hunterdagger		:[12,800],
	huntersword2		:[12,800],
	hunter_bow2		:[12,800],
	hunterdsword		:[12,800],
	hunter_roga1		:[12,800],
	hunter_helm		:[12,800],
	hunter_amulet1		:[12,800],
	hunter_armor1		:[12,800],
	hunter_mask1		:[12,800],
	hunter_boots3		:[12,800],
	hunter_boots2		:[12,800],
	huntershield2		:[12,800],
	hunter_ring2		:[12,800],
	hunter_ring1		:[12,800],
	hunter_arrows1		:[12,800],
	gm_abow			:[13,1200],
	gm_sword		:[13,1200],
	gm_kastet		:[13,1200],
	gm_hat			:[13,1200],
	gm_arm			:[13,1200],
	gm_amul			:[13,1200],
	gm_protect		:[13,1200],
	gm_spdb			:[13,1200],
	gm_defence		:[13,1200],
	gm_rring		:[13,1200],
	gm_sring		:[13,1200],
	gm_3arrows		:[13,1200],
	sh_bow			:[14,2400],
	sh_spear		:[14,2400],
	sh_sword		:[14,2400],
	sh_helmet		:[14,2400],
	sh_amulet2		:[14,2400],
	sh_armor		:[14,2400],
	sh_cloak		:[14,2400],
	sh_boots		:[14,2400],
	sh_shield		:[14,2400],
	sh_ring1		:[14,2400],
	sh_ring2		:[14,2400],
	sh_4arrows		:[14,2400],
	thief_paper		:[15,8000],
	thief_amulet		:[15,8000],	thief_neckl	:[15,8000],
	thief_arb		:[15,8000],
	thief_armor		:[15,8000],	thief_goodarmor	:[15,8000],
	thief_dagger		:[15,8000],	thief_ml_dagger	:[15,8000],
	thief_ring		:[15,8000],	ring_of_thief	:[15,8000],
	thief_mask		:[15,8000],	thief_msk	:[15,8000],
	thief_cape		:[15,8000],
	thief_boots		:[15,8000],	thief_fastboots	:[15,8000],
	tm_amulet		:[16,24000],
	tm_arb			:[16,24000],
	tm_armor		:[16,24000],
	tm_knife		:[16,24000],
	tm_mring		:[16,24000],
	tm_wring		:[16,24000],
	tm_msk			:[16,24000],	tm_mask		:[16,24000],
	tm_cape			:[16,24000],
	tm_boots		:[16,24000],
	r_bigsword		:[17,36000],
	r_magy_staff		:[17,36000],
	r_dagger		:[17,36000],
	r_bow			:[17,36000],
	r_goodscroll		:[17,36000],
	r_helmb			:[17,36000],
	r_zarmor		:[17,36000],
	r_bootsmb		:[17,36000],
	r_warriorsamulet	:[17,36000],
	r_m_amulet		:[17,36000],
	r_warring		:[17,36000],
	r_magicsring		:[17,36000],
	tactcv1_armor		:[18,40000],
	tactsm0_dagger		:[18,40000],
	tactspw_mring		:[18,40000],
	tactwww_wring		:[18,40000],
	tact765_bow		:[18,40000],
	tactms1_mamulet		:[18,40000],
	tactpow_cloack		:[18,40000],
	tactmag_staff		:[18,40000],
	tactzl4_boots		:[18,40000],
	tact1w1_wamulet		:[18,40000],
	tactaz_axe		:[18,40000],
	tacthapp_helmet		:[18,40000],
	tactdff_shield		:[18,40000],
	verb11_sword		:[19,48000],
	verbboots		:[19,48000],
	ve_helm			:[19,48000],
	vrb_shild		:[19,48000],
	v_1armor		:[19,48000],
	tl_medal1		:[21,32000],	tiger_gold	:[21,32000],
	tl_medal2		:[21,16000],	tiger_silver	:[21,16000],
	tl_medal3		:[21,6000],	tiger_bronze	:[21,6000],
	necrwar1st		:[22,56000],
	necrwar2st		:[22,36000],
	necrwar3st		:[22,20000],
	necrwar4st		:[22,10000],
	necrwar5st		:[22,4000],
	bunt_medal1		:[23,40000],
	bunt_medal2		:[23,20000],
	bunt_medal3		:[23,10000],
	warthief_medal1		:[24,18000],
	warthief_medal2		:[24,14000],
	warthief_medal3		:[24,10000],
	warthief_medal4		:[24,6000],
	warthief_medal5		:[24,2000],
	elfwar1			:[25,60000],
	elfwar2			:[25,40000],
	elfwar3			:[25,32000],
	elfwar4			:[25,20000],
	elfwar5			:[25,10000],
	elfwar6			:[25,4000],
	demwar1			:[26,60000],
	demwar2			:[26,44000],
	demwar3			:[26,36000],
	demwar4			:[26,24000],
	demwar5			:[26,16000],
	demwar6			:[26,8000],
	magewar1		:[27,52000],
	magewar2		:[27,40000],
	magewar3		:[27,32000],
	magewar4		:[27,20000],
	magewar5		:[27,12000],
	"2year_amul_lords"	:[28,4000],
	"3year_amul"		:[28,4000],
	"4year_klever"		:[28,4000],
	"5years_star"		:[28,5000],
	ru_statue		:[28,2009],
	"6ring"			:[28,15000],
	testring		:[28,40000],
	mart8_ring1		:[28,400],
	a_mallet		:[28,40],
	snake_ring		:[28,800],	ring2013	:[28,800],
	sharik			:[28,4000],
	snowjinka		:[28,4000],
	sosulka			:[28,4000],
	brush			:[28,19824],
	pen			:[28,19824],
	thief_unique_secretops	:[29,19824],	thief_unique	:[29,19824],
	wolfjacket		:[29,800],
	lizard_armor		:[29,800],
	lizard_boots		:[29,800],
	lizard_helm		:[29,800],
	sea_trident		:[29,4000],
	tunnel_kirka		:[29,4000],	kirka		:[29,4000],
	dem_dmech		:[29,14000],	dmech		:[29,14000],
	gdubina			:[29,14000],
	sunart1			:[29,14000],
	topor_skelet		:[29,14000],
	centaurbow		:[29,16000],
	blacksword		:[29,20000],
	bludgeon		:[29,28000],
	kopie			:[29,28000],
	pika			:[29,28000],
	sunart1			:[29,14000],
	sunart2			:[29,28000],
	sunart3			:[29,32000],
	sunart4			:[29,36000],
	dem_kosa		:[29,40000],	kosa		:[29,40000],
	dubina			:[29,40000],
	molot_tan		:[29,40000],
	slayersword		:[29,40000],
	dem_dtopor		:[29,48000],	dtopor		:[29,48000],
	necrohelm1		:[29,10000],
	necrohelm2		:[29,16000],
	necrohelm3		:[29,24000],
	tj_vboots3		:[29,16000],
	tj_vboots2		:[29,20000],
	tj_vboots1		:[29,24000],
	tj_helmet3		:[29,16000],
	tj_helmet2		:[29,20000],
	tj_helmet1		:[29,24000],
	tj_shield3		:[29,16000],
	tj_shield2		:[29,20000],
	tj_shield1		:[29,24000],
	tjarmor3		:[29,16000],
	tjarmor2		:[29,20000],
	tjarmor1		:[29,24000],
	rog_demon		:[29,40000],
	zub			:[29,40000],
	antifire_cape		:[29,16000],
	thief_premiumring3	:[29,12000],
	thief_premiumring2	:[29,18000],
	thief_premiumring1	:[29,24000],
	goblin_bow		:[29,16000],
	orc_axe			:[29,28000],
	ogre_bum		:[29,36000],
	orc_hat			:[29,20000],
	ogre_helm		:[29,24000],
	medal1			:[31,60000],	gnomewar1	:[31,60000],
	medal2			:[31,48000],	gnomewar2	:[31,48000],
	medal3			:[31,36000],	gnomewar3	:[31,36000],
	medal4			:[31,28000],	gnomewar4	:[31,28000],
	medal5			:[31,20000],	gnomewar5	:[31,20000],
	medal6			:[31,16000],	gnomewar6	:[31,16000],
	medal7			:[31,12000],	gnomewar7	:[31,12000],
	splo			:[31,28000],	gnomewar_splo	:[31,28000],
	stoj			:[31,28000],	gnomewar_stoj	:[31,28000],
	takt			:[31,28000],	gnomewar_takt	:[31,28000],
	kmedal1			:[32,60000],	kwar1		:[32,60000],
	kmedal2			:[32,48000],	kwar2		:[32,48000],
	kmedal3			:[32,36000],	kwar3		:[32,36000],
	kmedal4			:[32,28000],	kwar4		:[32,28000],
	kmedal5			:[32,20000],	kwar5		:[32,20000],
	kmedal6			:[32,16000],	kwar6		:[32,16000],
	kmedal7			:[32,12000],	kwar7		:[32,12000],
	medala1			:[32,28000],	kwar_splo	:[32,28000],
	medalb1			:[32,28000],	kwar_stoj	:[32,28000],
	medalc1			:[32,28000],	kwar_takt	:[32,28000],
	bmedal1			:[33,60000],	bwar1		:[33,60000],
	bmedal2			:[33,48000],	bwar2		:[33,48000],
	bmedal3			:[33,36000],	bwar3		:[33,36000],
	bmedal4			:[33,28000],	bwar4		:[33,28000],
	bmedal5			:[33,20000],	bwar5		:[33,20000],
	bmedal6			:[33,16000],	bwar6		:[33,16000],
	bmedal7			:[33,12000],	bwar7		:[33,12000],
	bmedala1		:[33,28000],	bwar_splo	:[33,28000],
	bmedalb1		:[33,28000],	bwar_stoj	:[33,28000],
	bmedalc1		:[33,28000],	bwar_takt	:[33,28000],
	barb_club		:[41,40000],
	barb_shield		:[41,40000],
	barb_armor		:[41,40000],
	barb_boots		:[41,40000],
	barb_helm		:[41,40000],
	necr_staff		:[42,40000],
	necr_cloak		:[42,40000],	necr_robe	:[42,40000],
	necr_helm		:[42,40000],
	necr_amulet		:[42,40000],
	merc_sword		:[43,40000],
	merc_dagger		:[43,40000],
	merc_boots		:[43,40000],
	merc_armor		:[43,40000],
	elfbow			:[44,50000],
	elfshirt		:[44,50000],
	elfboots		:[44,50000],
	elfamulet		:[44,50000],
	darkelfstaff		:[45,50000],
	darkelfboots		:[45,50000],
	darkelfcloack		:[45,50000],
	darkelfciras		:[45,50000],
	darkelfpendant		:[45,50000],
	darkelfkaska		:[45,50000],
	dem_bootshields		:[46,50000],
	dem_axe			:[46,50000],
	dem_shield		:[46,50000],
	dem_armor		:[46,50000],
	dem_amulet		:[46,50000],
	dem_helmet		:[46,50000],
	mage_staff		:[51,60000],
	mage_robe		:[51,60000],
	mage_boots		:[51,60000],
	mage_cape		:[51,60000],
	mage_hat		:[51,60000],
	mage_scroll		:[51,60000],
	ew_sword		:[52,44000],	welfsword	:[52,44000],
	ew_shield		:[52,44000],	welfshield	:[52,44000],
	ew_bootshields		:[52,44000],	welfboots	:[52,44000],
	ew_armor		:[52,44000],	welfarmor	:[52,44000],
	ew_bow			:[52,44000],	welfbow		:[52,44000],
	ew_helmet		:[52,44000],	welfhelmet	:[52,44000],
	hammer1			:[53,44000],	gnomehammer	:[53,44000],
	shield1			:[53,44000],	gnomeshield	:[53,44000],
	armor1			:[53,44000],	gnomearmor	:[53,44000],
	helmet1			:[53,44000],	gnomehelmet	:[53,44000],
	boots1			:[53,44000],	gnomeboots	:[53,44000],
	kk_sword		:[54,44000],	knightsword	:[54,44000],
	kk_shield		:[54,44000],	knightshield	:[54,44000],
	kk_boots		:[54,44000],	knightboots	:[54,44000],
	kk_armor		:[54,44000],	knightarmor	:[54,44000],
	kk_helmet		:[54,44000],	knighthelmet	:[54,44000],
	kn_weap			:[55,44000],
	kn_shield		:[55,44000],
	kn_body			:[55,44000],
	kn_helm			:[55,44000],
	hammer2			:[61,64000],	gnomem_hammer	:[61,64000],
	shield2			:[61,64000],	gnomem_shield	:[61,64000],
	boots2			:[61,64000],	gnomem_boots	:[61,64000],
	armor2			:[61,64000],	gnomem_armor	:[61,64000],
	helmet2			:[61,64000],	gnomem_helmet	:[61,64000],
	amulet2			:[61,64000],	gnomem_amulet	:[61,64000],
	nv_weap			:[62,56000],
	nv_shield		:[62,56000],
	nv_body			:[62,56000],
	nv_boot			:[62,56000],
	nv_helm			:[62,56000],
	dd_staff		:[63,64000],	druid_staff	:[63,64000],
	dd_boots		:[63,64000],	druid_boots	:[63,64000],
	dd_cloack		:[63,64000],	druid_cloack	:[63,64000],
	dd_robe			:[63,64000],	druid_armor	:[63,64000],
	dd_amulet		:[63,64000],	druid_amulet	:[63,64000],
	bm_staff		:[64,64000],	gmage_staff	:[64,64000],
	bm_scroll		:[64,64000],	gmage_scroll	:[64,64000],
	bm_boots		:[64,64000],	gmage_boots	:[64,64000],
	bm_robe			:[64,64000],	gmage_armor	:[64,64000],
	bm_cloack		:[64,64000],	gmage_cloack	:[64,64000],
	bm_crown		:[64,64000],	gmage_crown	:[64,64000],
	hc_sword		:[65,64000],	paladin_sword	:[65,64000],
	hc_shield		:[65,64000],	paladin_shield	:[65,64000],
	hc_boots		:[65,64000],	paladin_boots	:[65,64000],
	hc_armor		:[65,64000],	paladin_armor	:[65,64000],
	hc_helmet		:[65,64000],	paladin_helmet	:[65,64000],
	hc_crossbow		:[65,64000],	paladin_bow	:[65,64000],
	sv_weap			:[66,64000],
	sv_shield		:[66,64000],
	sv_boot			:[66,64000],
	sv_body			:[66,64000],
	sv_helm			:[66,64000],
	sv_arb			:[66,64000],
	inq_weap		:[67,64000],
	inq_boot		:[67,64000],
	inq_body		:[67,64000],
	inq_cl			:[67,64000],
	inq_helm		:[67,64000],
	amf_weap		:[68,64000],
	amf_scroll		:[68,64000],
	amf_boot		:[68,64000],
	amf_body		:[68,64000],
	amf_cl			:[68,64000],
	amf_helm		:[68,64000]
	};
var url_cur  = location.href;
var url_sklad  = "sklad_info.php";
var all_tables = document.getElementsByTagName('table');
//****************************************************

/** Библиотека юникода
*
* Реализует функции работы с юникодом.
* @file lib_unicode.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/
function uchar(s) {
    switch (s[0]) {
        case "А": return "\u0410";
        case "Б": return "\u0411";
        case "В": return "\u0412";
        case "Г": return "\u0413";
        case "Д": return "\u0414";
        case "Е": return "\u0415";
        case "Ж": return "\u0416";
        case "З": return "\u0417";
        case "И": return "\u0418";
        case "Й": return "\u0419";
        case "К": return "\u041a";
        case "Л": return "\u041b";
        case "М": return "\u041c";
        case "Н": return "\u041d";
        case "О": return "\u041e";
        case "П": return "\u041f";
        case "Р": return "\u0420";
        case "С": return "\u0421";
        case "Т": return "\u0422";
        case "У": return "\u0423";
        case "Ф": return "\u0424";
        case "Х": return "\u0425";
        case "Ц": return "\u0426";
        case "Ч": return "\u0427";
        case "Ш": return "\u0428";
        case "Щ": return "\u0429";
        case "Ъ": return "\u042a";
        case "Ы": return "\u042b";
        case "Ь": return "\u042c";
        case "Э": return "\u042d";
        case "Ю": return "\u042e";
        case "Я": return "\u042f";
        case "а": return "\u0430";
        case "б": return "\u0431";
        case "в": return "\u0432";
        case "г": return "\u0433";
        case "д": return "\u0434";
        case "е": return "\u0435";
        case "ж": return "\u0436";
        case "з": return "\u0437";
        case "и": return "\u0438";
        case "й": return "\u0439";
        case "к": return "\u043a";
        case "л": return "\u043b";
        case "м": return "\u043c";
        case "н": return "\u043d";
        case "о": return "\u043e";
        case "п": return "\u043f";
        case "р": return "\u0440";
        case "с": return "\u0441";
        case "т": return "\u0442";
        case "у": return "\u0443";
        case "ф": return "\u0444";
        case "х": return "\u0445";
        case "ц": return "\u0446";
        case "ч": return "\u0447";
        case "ш": return "\u0448";
        case "щ": return "\u0449";
        case "ъ": return "\u044a";
        case "ы": return "\u044b";
        case "ь": return "\u044c";
        case "э": return "\u044d";
        case "ю": return "\u044e";
        case "я": return "\u044f";
        case "Ё": return "\u0401";
        case "ё": return "\u0451";
        default: return s[0];
    }
}

function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}

//******* считывание цены арты из файла ************
function get_price(art) {
var base = GM_getResourceText("sklad");
var i, p, p1, p2, str, str_art;
	str_art = ' '+art+':';
	p = base.indexOf(str_art.toString());
	if (p != -1) {
	        for (i = p; i < base.length; i++) {
	            	if (base[i] == ':') {
				p1=i+1; 
				break;
			}
		}
	        for (i = p1; i < base.length; i++) {
	            	if (base[i] == ';') {
				p2=i; 
				break;
			}
		}
		str = base.substring(p1,p2).trim();
		return str.valueOf();
	} else {
		return -1;
	}
};
//****** считывание стоимости ремонта арта из базы *****
function get_price_rem(art) {
  if (price_rem[art] != null) {
	return price_rem[art];
  } else {
//	alert(ustring('В базе не найден: ')+art+ustring('. Внесите его в базу(в файл скрипта) с указанем цены ремонта.'));
	return [0,0];
  }
};
//****** сравниваем цены арта по факту и из файла ******
function compare_price(el_price, el_text, prc_art, prc_cur) {
	el_price.childNodes[0].setAttribute('value',Math.ceil(prc_art*k_price));
	if (prc_cur == Math.ceil(prc_art*k_price)) {					//если цены совпадают
		el_price.setAttribute('bgcolor',"#88FF99");	  			//фон делаем зеленым
	} else {                                                                	//если цены НЕ совпадают
		el_price.setAttribute('bgcolor',"#FFBBCC");	  			//фон делаем розовым
		el_text.innerHTML += '<font style="font-size:10px;color:#000000;">'+' ( <b>'+ustring('Цена по базе: <font style="font-size:12px; color:#FF3344;">')+prc_art+'</b></font>,';
		el_text.innerHTML += '<font style="font-size:10px;color:#000000;">'+' <b>'+ustring('Текущая цена: <font style="font-size:12px; color:#FF3344;">')+prc_cur+'</b></font> )';
	}
	return;
}
//****** формирование отчёта по прочке артов *******
function add2report (uId, pr_cur, pr_max) {
	if (make_report == 1) {
		uId = uId.substring(uId.lastIndexOf("=")+1,uId.length);
		if (uId.length > 0) {
			if (s_report.length > 0) {s_report += '\n';}
			s_report +=uId+' '+pr_cur+' '+pr_max;
		}
	}
	return;
}
//****** формирование отчета по отсутсвующим в файле артам ****
function add2export (name, uId, price) {
	if (s_exp.length > 0) {s_exp += '\n';}
	s_exp += name+' '+uId+': '+price+';';
	s_exp = s_exp.replace('  ',' ');
	return;
}
//****************************************************
function sklad_info() {
	var ss, s3, ems, ems2, ems3, elem, elem2, elem3, elem4, pos, single, pos_write;
	var title, art_type, art_url, prochka_cur, prochka_max, prochka, cur_price, price_art, cena_rem, list, ss_kompl, art_klass, uID, sum_price, name_art;
	var edit_mode = 0;
	var newgosart = false;
//******** Определяем режим склада ***********
	ems = document.querySelectorAll( "td > a[href*='sklad_rc_on']")
	if (ems.length != 0) {
		elem = ems[0].href;                                                                                                     //edit_mode 1 - режим редактирования
		elem2 = elem.substring(elem.length-1,elem.length);
		edit_mode = 1 - elem2; 
//		elem2 = ems[0].parentNode.parentNode.children[0].children[2].children[0].innerHTML;                                     // для версии мультискладов
//		sklad = "_"+elem2.substring(1,elem2.length);                                                                            // для версии мультискладов
	}
        if (edit_mode == 1) {   													//Если включен режим редактирования
		ems = document.querySelectorAll( "td > select[name*='repair_p']"); 							//Ищем поле с процентной ставкой
                if (ems.length != 0) {
			stavka_kuzni = ems[0].selectedIndex+100; 
		}															// процентная ставка кузнецов 10х%
	}
//******** Обработка вкладок Оружие, броня, ювелирка ********************
	if ((document.location.href.indexOf('cat=3') == -1) && (document.location.href.indexOf('cat=4') == -1) && (document.location.href.indexOf('cat=5') == -1)){
		for (var k = 0; k < all_tables.length; k++)
		{
			if (all_tables[k].className == "wb")  
			{
				ems = all_tables[k].querySelectorAll( "table [cellspacing *='1']"); 
				for (var i = 0; i < ems.length; i++) {
					if (ems[i].parentNode.className == "wbwhite"){
// ************* Обработка уникальных артов ****************************
                       	                        ems2 = ems[i].childNodes[0].querySelectorAll( "table [background*='/i/artifacts']");
						for (var j = 0; j < ems2.length; j++) {
                                                        art_url = ems2[j].getAttribute('background');          					//ссылка на картинку арта
							art_type = art_url.substring(art_url.lastIndexOf("/")+1,art_url.lastIndexOf(".")-2); 	//название арта
							cena_rem = get_price_rem(art_type)[1];
							elem = ems2[j].parentNode.parentNode.childNodes[1].childNodes[0]; 			//Это элемент описания. Можно править.
							elem2 = elem.innerHTML;
							name_art = elem2.substring(1,elem2.lastIndexOf("'"));
                                                        prochka = elem2.substring(elem2.lastIndexOf("[")+1,elem2.lastIndexOf("]"));    		//прочка в формате хх/уу
							prochka_cur = prochka.substring(0,prochka.lastIndexOf("/"));                		//текущая прочка
							prochka_max = prochka.substring(prochka.lastIndexOf("/")+1,prochka.length); 		//макс.прочка
							ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));			//Себестоимость ремонта за 1 бой
							s3 = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9-3));		//Себестоимость ремонта через 3 круга
                                                        if (edit_mode == 0) {   //Если включен обычный режим
                                                                ems3 = ems2[j].parentNode.parentNode.querySelectorAll( "td [width*='80']"); 	//Ищем поле с ценой
								if (ems3.length == 0) { 
//									alert('Field with price not found.');
								} else {
									cur_price = ems3[0].childNodes[0].innerHTML;                       	//Цена аренды
								}
							} else {                                                				//Если включен режим редактирования
                                                                ems3 = ems2[j].parentNode.parentNode.querySelectorAll( "td > input[name*='bcost']"); //Ищем поле с ценой
								cur_price = ems3[0].getAttribute('value');                                 	//Цена аренды
                                                                elem.innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('Себестоимость след.ремонта: <font style="font-size:12px; color:#0132CC;">')+ss+'</b></font>';
								elem3 = ems2[j].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
                                                                if (elem3.tagName == "TABLE") {elem3 = elem3.childNodes[0].childNodes[0].childNodes[0].childNodes[0];} // Если трофеи.
								uID = elem3.href.substring(elem3.href.lastIndexOf("?id=")+4,elem3.href.length);  //uid уникальных артов
	                                                        price_art = get_price(uID);                                                     //цена в базе для этого арта
                                                                if (price_art != -1) {                                                          //если арт есть в базе
									compare_price(ems3[i].parentNode, elem, price_art, cur_price);          //Сранение цен и закраска
								} else { 									//если арта нет в базе
									add2export(name_art,uID,cur_price);
								}
								add2report(uID,prochka_cur,prochka_max);
							}
							if (cur_price < s3) {
								ems2[j].parentNode.setAttribute('bgcolor',"#30D5C8");  				//бирюзовая рамочка
								ems2[j].setAttribute('style',"margin: 2px");           				//бирюзовая рамочка
							}
							if (cur_price < ss) {
								ems2[j].parentNode.setAttribute('bgcolor',"#FF4444");  				//красная рамочка
							}
						}
// ************* Конец обработка уникальных артов, начало обработки обычных артов ****************************
                       	                        ems2 = ems[i].childNodes[0].querySelectorAll( "td > a[href*='art_info.php?id=']");
						for (var j = 0; j < ems2.length; j++) {
                                                        if (ems2[j].href.search(/uid/) == -1)
							{
        	                                                art_url = ems2[j].href;						          	//ссылка на картинку арта
								art_type = art_url.substring(art_url.lastIndexOf("=")+1,art_url.length); 	//название арта
								cena_rem = get_price_rem(art_type)[1];
        	                                                art_klass = get_price_rem(art_type)[0];
								elem = ems2[j].parentNode.parentNode.childNodes[1].childNodes[0]; 		//Это элемент описания. Можно править.
								elem2 = elem.innerHTML;
								name_art = elem2.substring(1,elem2.lastIndexOf("'"));
	                                                        prochka = elem2.substring(elem2.lastIndexOf("[")+1,elem2.lastIndexOf("]"));	//прочка в формате хх/уу
								prochka_cur = prochka.substring(0,prochka.lastIndexOf("/"));                	//текущая прочка
								prochka_max = prochka.substring(prochka.lastIndexOf("/")+1,prochka.length);	//макс.прочка
								if ((art_klass >0 && art_klass<10) && (prochka_max > 49) && ((prochka_max % 5) == 0) ) { //Если это госарт, то ..
									newgosart = true;
								} else {
									ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));	//Себестоимость ремонта
								}
                                                                if (art_klass >0 && art_klass<10) {                                              //Если это госарт, то ..
									s3 = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9-1));//Себестоимость ремонта через 1 круг
								} else {
									s3 = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9-3));//Себестоимость ремонта через 3 круга
								}
// **************************** обработка полученных данных
 	                                                        if (edit_mode == 0) {   //Если включен обычный режим
        	                                                        ems3 = ems2[j].parentNode.parentNode.querySelectorAll( "td [width*='80']"); //Ищем поле с ценой
									if (ems3.length == 0) { 
//										alert('Field with price not found.');
									} else {
										cur_price = ems3[0].childNodes[0].innerHTML;			//Цена аренды
									}
								} else {                                                			//Если включен режим редактирования
	                                                                ems3 = ems2[j].parentNode.parentNode.querySelectorAll( "td > input[name*='bcost']"); //Ищем поле с ценой
									cur_price = ems3[0].getAttribute('value');                              //Цена аренды
                        	                                        if (newgosart) {
										elem.innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('Себестоимость 1 боя: <font style="font-size:11px; color:#0132CC;">') + Math.ceil(cena_rem*20/19/prochka_max) +'('+Math.floor(Math.ceil(cena_rem*20/19)*97/(100*prochka_max))+')</b></font>';
										newgosart = false;
										ss = Math.ceil(Math.ceil(cena_rem*stavka_kuzni/100)/Math.floor(prochka_max*0.9)); //Себестоимость 1 боя следующего ремонта
									}
									elem.innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('Себестоимость след.ремонта: <font style="font-size:12px; color:#0132CC;">')+ss+'</b></font>';
									elem3 = ems2[j];
									uID = elem3.href.substring(elem3.href.lastIndexOf("?id=")+4,elem3.href.length);  //uid уникальных артов
	                	                                        price_art = get_price(uID);                                             //цена в базе для этого арта
                                	                                if (price_art != -1) {                                                  //если арт есть в базе
										compare_price(ems3[i].parentNode, elem, price_art, cur_price);	//Сранение цен и закраска
									} else { 								//если арта нет в базе
										add2export(name_art,uID,cur_price);
									}     
									add2report(uID,prochka_cur,prochka_max);
								}
								if (cur_price < s3) {
									ems2[j].parentNode.setAttribute('bgcolor',"#30D5C8");   		//бирюзовая рамочка
									ems2[j].parentNode.setAttribute('width',"56");  			//бирюзовая рамочка
									ems2[j].setAttribute('style',"margin: 3px");            		//бирюзовая рамочка
								}
								if (cur_price < ss) {
									ems2[j].parentNode.setAttribute('bgcolor',"#FF4444");   		//красная рамочка
								}

							}
						}
// ************* Конец обработка обычных артов ****************************
					}
				}
			}

		} 
	} 
//******** Обработка вкладки Комплекты ************************************
	if (document.location.href.indexOf('cat=3') != -1){
		list = 0;
		for (var k = 0; k < all_tables.length; k++)
		{
			if (all_tables[k].className == "wb")
			{
				if (edit_mode == 0) {   									//Если включен обычный режим
					ems = all_tables[k].querySelectorAll( "td > select[onchange*='calc_price']");		//Ищем поле с ценой
				} else {                                                                                        //Если включен режим редактирования
        				ems = all_tables[k].querySelectorAll( "td > input[name*='bcost']"); 			//Ищем поле с ценой
				}
				if (ems.length > 0) 										// Если нашли хоть одно поле с ценой, то ..
				{
					elem = ems[0].parentNode.parentNode.parentNode;						// elem - список комплектов
					list = elem.childElementCount;                                                  	// list - кол-во потомков списка
					break;
				}
			}

		} 
		for (var k = 2; k <=list; k++)											// для каждого комплекта...
		{                                                                                                               //если не комплект, то пропускаем
			if (elem.childNodes[k].tagName == "SCRIPT") { continue;	} 
			ss_kompl = 0;
			sum_price = 0;
			elem2 = elem.childNodes[k].childNodes[0].childNodes[0].childNodes[0].childNodes[0];//			// elem2 - список компонентов комплекта
			for (var i = 0; i < elem2.childElementCount; i++)							// для каждого арта в комплекте...
			{
				if (elem2.childNodes[i].childNodes[0].getAttribute('background') == null) {                     
 					if (elem2.childNodes[i].childNodes[0].childNodes[0].getAttribute('src') == "") {        //если уникальные
						art_url = elem2.childNodes[i].childNodes[0].href;			        //ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("=")+1,art_url.length); 	//название арта
						alert('1');
						elem3 = elem2.children[i].children[0].children[0].children[0].children[0].children[0];
					} else {                                                                                //если обычный арт без крафта, то ..
						art_url = elem2.childNodes[i].childNodes[0].childNodes[0].getAttribute('src');	//ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("/")+1,art_url.lastIndexOf(".")-2); 	//название арта
						elem3 = elem2.children[i].children[0];
					}
					title = elem2.childNodes[i].childNodes[0].childNodes[0].title;
				} else {											//если арт c крафтом, то ..
					elem3 = elem2.children[i].children[0].children[0].children[0].children[0].children[0];
                                        if (elem3.tagName == "TABLE") {								 // Если трофеи.
						elem3 = elem3.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
						art_url = elem3.href;
						art_type = art_url.substring(art_url.lastIndexOf("?")+4,art_url.lastIndexOf("&")); 	//название арта
					} else {
						art_url = elem2.childNodes[i].childNodes[0].getAttribute('background');		//ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("/")+1,art_url.lastIndexOf(".")-2); 	//название арта
					}
					title = elem3.children[0].title;
				}
				cena_rem = get_price_rem(art_type)[1];
				art_klass = get_price_rem(art_type)[0];
//********************************			
		                name_art = title;
				pos = name_art.lastIndexOf(ustring("Нападение"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Защита"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Сила"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Инициатива"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Знание"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Удача"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Боевой"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Прочность"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
//********************************					
				prochka = title.substring(title.lastIndexOf(" ")+1,title.length);    				//прочка в формате хх/уу
				prochka_cur = prochka.substring(0,prochka.lastIndexOf("/"));                			//текущая прочка
				prochka_max = prochka.substring(prochka.lastIndexOf("/")+1,prochka.length); 			//макс.прочка
				uID = elem3.href.substring(elem3.href.lastIndexOf("?id=")+4,elem3.href.length); 		//uid уникальных артов
				price_art = get_price(uID);                                                     		//цена в базе для этого арта
//********************************					
				ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));
	                        ss_kompl += ss;
				if (price_art != -1) {                                                           		//если арт есть в базе
					sum_price += Number(price_art);                                                         //считаем суммарную стоимость
				} else { 											//если арта нет в базе
					add2export(name_art,uID,1);
				}
				add2report(uID,prochka_cur,prochka_max);
			}
//********************************					
			if (edit_mode == 0) {   //Если включен обычный режим
				ems3 = elem.childNodes[k].querySelectorAll( "td [width*='80']");		 		//Ищем поле с ценой
				if (ems3.length == 0) { 
//					alert('Field with price not found.');
					cur_price = 0;
				} else {
					cur_price = ems3[0].childNodes[0].innerHTML;                   				//Цена аренды
					}
			} else {                                                						//Если включен режим редактирования
				ems3 = elem.childNodes[k].querySelectorAll( "td > input[name*='bcost']"); 			//Ищем поле с ценой
				cur_price = ems3[0].getAttribute('value');                                 			//Цена аренды
				elem2.innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('<font style="font-size:10px; color:#0132CC;">c/с след.ремонта: <font style="font-size:12px;">')+ss_kompl+'</b></font><BR>';
				if (ss_kompl > cur_price) {                                                                     // Если с/с ремонта выше цены, то...
	                                elem2.parentNode.parentNode.parentNode.setAttribute('bgcolor',"#FFBBCC");               // розовый фон делаем
				}
				compare_price(ems3[0].parentNode, elem2, sum_price, cur_price);          		//Сранение цен и закраска
			}
		} 
	}
//******** Обработка вкладок Недоступные и в ремонте ********************
	if (((document.location.href.indexOf('cat=5') != -1) || (document.location.href.indexOf('cat=4') != -1) ) && (edit_mode != 0)) {
		list = 0;
		pos_write = 2;
		for (var k = 0; k < all_tables.length; k++)
		{
			if (all_tables[k].className == "wb")
			{
       				ems = all_tables[k].querySelectorAll( "td > input[name*='bcost']"); 				//Ищем поле с ценой
				if (ems.length > 0) 										// Если нашли хоть одно поле с ценой, то ..
				{
					elem = ems[0].parentNode.parentNode.parentNode;						// elem - список комплектов
					list = elem.childElementCount;                                                  	// list - кол-во потомков списка
					break;
				}
			}

		}
		for (var k = 1; k <list; k++)											// для каждого комплекта...
		{                                                                                                               //если не комплект, то пропускаем
			if (elem.children[k].tagName == "SCRIPT") { continue;} 
			if (elem.children[k].children[0].childElementCount >0) {
				if (elem.children[k].children[0].children[0].type == "submit") 	continue;			//если кнопка "сделать комплектом"-пропустить
			} 
			ss_kompl = 0;
			sum_price = 0;
                        if (document.location.href.indexOf('cat=5') != -1) {							// если вкладка Недоступные
				if ((elem.children[k].childNodes[0].childElementCount == 0) && (elem.children[k].childNodes[1].childNodes[0].tagName == "TABLE") && (elem.children[k].childNodes[1].childNodes[0].getAttribute('background') == null)) {
					elem2 = elem.children[k].children[1].children[0].children[0].children[0];//		// elem2 - список компонентов комплекта
					single = 0;
				} else {											// если одиночный арт
					elem2 = elem.children[k].children[1];//							// elem2 - одиночный арт
					single = 1;
				}
			} else {												// если вкладка в Ремонте
				if (elem.children[k].childElementCount == 13) {
					single = 0;
					elem2 = elem.children[k].children[0].children[0].children[0].children[0];//		// elem2 - список компонентов комплекта
				} else {											// если одиночный арт
					elem2 = elem.children[k].children[0];//							// elem2 - одиночный арт
					single = 1;
					pos_write = 1;
				}
			}
			for (var i = 0; i < elem2.childElementCount; i++)							// для каждого арта в комплекте...
			{
				if (single == 1) {	elem4 = elem2;
				} else {		elem4 = elem2.childNodes[i];
				}
				if (elem4.childNodes[0].getAttribute('background') == null) {
 					if (elem4.childNodes[0].childNodes[0].getAttribute('src') == "") {        		//если уникальные
						art_url = elem4.childNodes[0].href;			        		//ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("=")+1,art_url.length); 	//название арта
						elem3 = elem4.children[0].children[0].children[0].children[0].children[0];
					} else {                                                                                //если обычный арт без крафта, то ..
						art_url = elem4.childNodes[0].childNodes[0].getAttribute('src');		//ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("/")+1,art_url.lastIndexOf(".")-2); 	//название арта
						elem3 = elem4.children[0];
					}
					title = elem4.childNodes[0].childNodes[0].title;
				} else {											//если арт c крафтом, то ..
					elem3 = elem4.children[0].children[0].children[0].children[0].children[0];
                                        if (elem3.tagName == "TABLE") {								 // Если трофеи.
						elem3 = elem3.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
						art_url = elem3.href;
						art_type = art_url.substring(art_url.lastIndexOf("?")+4,art_url.lastIndexOf("&")); 	//название арта
					} else {
						art_url = elem4.childNodes[0].getAttribute('background');			//ссылка на картинку арта
						art_type = art_url.substring(art_url.lastIndexOf("/")+1,art_url.lastIndexOf(".")-2); 	//название арта
					}
					title = elem3.children[0].title;
				}
				cena_rem = get_price_rem(art_type)[1];
				art_klass = get_price_rem(art_type)[0];
//********************************			
		                name_art = title;
				pos = name_art.lastIndexOf(ustring("Нападение"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Защита"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Сила"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Инициатива"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Знание"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Удача"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Боевой"));		if (pos != -1) { name_art = name_art.substring(0,pos-1); }
				pos = name_art.lastIndexOf(ustring("Прочность"));	if (pos != -1) { name_art = name_art.substring(0,pos-1); }
//********************************					
				prochka = title.substring(title.lastIndexOf(" ")+1,title.length);    				//прочка в формате хх/уу
				prochka_cur = prochka.substring(0,prochka.lastIndexOf("/"));                			//текущая прочка
				prochka_max = prochka.substring(prochka.lastIndexOf("/")+1,prochka.length); 			//макс.прочка
				uID = elem3.href.substring(elem3.href.lastIndexOf("?id=")+4,elem3.href.length); 		//uid уникальных артов
				price_art = get_price(uID);                                                     		//цена в базе для этого арта
//********************************					
				if (elem4.childNodes[0].getAttribute('background') == null) {                     		//если уникальный арт, то ..
					if (elem4.childNodes[0].childNodes[0].getAttribute('src') == "") {
						ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));
					} else {
						if ((art_klass >0 && art_klass<10) && (prochka_max > 49) && ((prochka_max % 5) == 0) ) { //Если это госарт, то ..
							ss = Math.ceil(Math.ceil(cena_rem*20/19)/prochka_max);                 //Себестоимость 1 боя
						} else	{
							ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));
						}
					}
				}  else	{											//если обычный арт, то ..
					ss = Math.ceil(cena_rem*stavka_kuzni/100/Math.floor(prochka_max*0.9));
				}
	                        ss_kompl += ss;
//				alert(uID+' '+art_type+' '+cena_rem+' '+art_klass+' '+prochka_cur+' '+prochka_max);
				if (price_art != -1) {                                                           		//если арт есть в базе
					sum_price += Number(price_art);                                                         //считаем суммарную стоимость
				} else { 											//если арта нет в базе
				        if (single != 1) {add2export(name_art,uID,1);}						//Запоминаем uID этого арта и стоимость 
				}
				add2report(uID,prochka_cur,prochka_max);
			}
//********************************					
			ems3 = elem.children[k].querySelectorAll( "td > input[name*='bcost']"); 				//Ищем поле с ценой
			cur_price = ems3[0].getAttribute('value');                                 				//Цена аренды
			if (single == 1) {                                                                              	//если одиночный арт
				if (price_art == -1) {add2export(name_art,uID,cur_price);}					//если арта нет в базе
				elem2.parentNode.childNodes[pos_write].innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('<font style="font-size:10px; color:#0132CC;">c/с след.ремонта: <font style="font-size:12px;">')+ss_kompl+'</b></font><BR>';
				if (ss_kompl > cur_price) {                                                                     // Если с/с ремонта выше цены, то...
        	                       elem2.parentNode.childNodes[1].setAttribute('bgcolor',"#FFBBCC");			// розовый фон делаем
				}
				compare_price(ems3[0].parentNode, elem2.parentNode.childNodes[pos_write], sum_price, cur_price);	//Сранение цен и закраска
			} else {                                                                                        	// если комплект
				elem2.innerHTML += '<br><font style="color:#0132CC;">'+'<b>'+ustring('<font style="font-size:10px; color:#0132CC;">c/с след.ремонта: <font style="font-size:12px;">')+ss_kompl+'</b></font><BR>';
				if (ss_kompl > cur_price) {									// Если с/с ремонта выше цены, то...
        	                       elem2.parentNode.parentNode.parentNode.setAttribute('bgcolor',"#FFBBCC");		// розовый фон делаем
				}
				compare_price(ems3[0].parentNode, elem2, sum_price, cur_price);					//Сранение цен и закраска
			}
		} 
	}
	if (s_exp.length > 0) alert(ustring('В базу цен (в файл) не внесены следуюшие арты:\n')+s_exp); 					//вывести список отсутствующих в базе артов
	if (s_report.length > 0) alert(ustring('Прочность артов:\n')+s_report); 						//вывести список артов с прочкой
//********************************					
	ems = document.querySelectorAll( "textarea[name*='clanskladinfo']");			 				//Ищем поле инфы склада
	if (ems.length != 0) { 	ems[0].rows =25; }										// увеличиваем размер
}
//****************************************************************************************
sklad_info();
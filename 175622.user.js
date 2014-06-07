//
// ==UserScript==
// @name          HWM auction real cost
// @author		  Vertex, -Вепрь-, MasterBarbarian
// @namespace     HWM_ARC
// @description   Реальная цена лота на рынке
// @version       0.9 RC2 20100925
// @include       http://www.heroeswm.ru/auction.php?*
// ==/UserScript==


var GM_JQ = document.createElement('script'); GM_JQ.src = "http://code.jquery.com/jquery-1.9.1.min.js"; GM_JQ.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(GM_JQ); function waitForJquery(){ if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(waitForJquery, 100); } else { $ = unsafeWindow.jQuery;

///////////////////////////////////////////////////Start/////////
function parseGET(a) {
	
  var tmp = new Array();    
  var tmp2 = new Array(); 
  get = new Array();

  var url = a;	
  if(url != '') {
    tmp = (url.substr(1)).split('&');	
    for(var i=0; i < tmp.length; i++) {
      tmp2 = tmp[i].split('=');		
      get[tmp2[0]] = tmp2[1];	
    }
  }
}

// магазин/производство/прочка            // magazin/proizvodstvo/pro4ka 
var real_cost = {
//Головные уборы : [, ,  ],
'steel_boots'  : [5907, 70,  'Стальные сапоги'  ],
'wzzamulet16'  : [11203, 65,  'Амулет битвы' ],
'mmzamulet16'  : [11203, 65,  'Амулет духа' ],
'bafamulet15'  : [11038, 65,  'Амулет трёх стихий' ],
'amulet_of_luck'  : [979, 25,  'Амулет удачи' ],
'samul14'  : [4600, 30,  'Амулет фортуны' ],
'wzzamulet13'  : [10185, 60,  'Амулет ярости' ],
'large_shield'  : [9777, 70,  'Башенный щит' ],
'hauberk'  : [2337, 40,  'Боевая кольчуга' ],
'staff'  : [2580, 40,  'Боевой посох' ],
'boots2'  : [1080, 35,  'Боевые сапоги' ],
'warring13'  : [10495, 60,  'Глаз дракона' ],
'smring10'  : [140, 7,  'Деревянный меч' ],
'long_bow'  : [6450, 50,  'Длинный лук' ],
'armor15'  : [9506, 70,  'Доспех пламени' ],
'dagger'  : [931, 30,  'Кинжал мести' ],
'leather_shiled'  : [280, 18,  'Кожаная броня' ],
'leatherhat' : [180, 12,  'Кожаная шляпа' ],
'leatherboots'  : [210, 14,  'Кожаные ботинки' ],
'leatherplate'  : [1430, 30,  'Кожаные доспехи' ],
'hunter_boots'  : [931, 30,  'Кожаные сапоги' ],
'leather_helm' : [640, 30,  'Кожаный шлем' ],
'wizard_cap' : [1629, 35,  'Колпак мага' ],
'wwwring16'  : [11475, 65,  'Кольцо боли' ],
'warriorring'  : [6838, 40,  'Кольцо воина' ],
'mmmring16'  : [11475, 65,  'Кольцо звёзд' ],
'i_ring'  : [180, 10,  'Кольцо ловкости' ],
'smring10'  : [3010, 30,  'Кольцо молнии' ],
'circ_ring'  : [6644, 50,  'Кольцо отречения' ],
'powerring'  : [5296, 40,  'Кольцо пророка' ],
'bring14'  : [10592, 60,  'Кольцо противоречий' ],
'sring4'  : [610, 15,  'Кольцо силы' ],
'doubt_ring'  : [1086, 12,  'Кольцо сомнений' ],
'rashness_ring'  : [1969, 30,  'Кольцо стремительности' ],
'darkring'  : [8555, 50,  'Кольцо теней' ],
'chain_coif' : [1571, 40,  'Кольчужный шлем' ],
'xymhelmet15' : [6751, 70,  'Корона пламенного чародея' ],
'mhelmetzh13' : [6518, 70,  'Корона чернокнижника' ],
'shortbow'  : [360, 20,  'Короткий лук' ],
'round_shiled'  : [110, 7,  'Круглый щит' ],
'warrior_pendant'  : [8215, 50,  'Кулон воина' ],
'power_pendant'  : [7536, 60,  'Кулон отчаяния' ],
'mif_light'  : [6382, 70,  'Лёгкая мифриловая кираса' ],
'mif_lboots'  : [7304, 55,  'Лёгкие мифриловые сапоги' ],
'mif_lhelmet' : [5354, 70,  'Лёгкий мифриловый шлем' ],
'gnome_hammer'  : [300, 25,  'Легкий топорик' ],
'bow14'  : [10155, 65,  'Лук полуночи' ],
'magic_amulet'  : [8555, 50,  'Магический амулет' ],
'cloackwz15'  : [9816, 65,  'Мантия пламенного чародея' ],
'scloack8'  : [2160, 30,  'Маскировочный плащ' ],
'bravery_medal'  : [572, 25,  'Медаль отваги' ],
'power_sword'  : [9981, 80,  'Меч власти' ],
'requital_sword'  : [2580, 40,  'Меч возмездия' ],
'firsword15'  : [18042, 70,  'Меч возрождения' ],
'ssword8'  : [4040, 40,  'Меч жесткости' ],
'ssword10'  : [5110, 45,  'Меч отваги' ],
'broad_sword'  : [4820, 60,  'Меч равновесия' ],
'def_sword'  : [1319, 40,  'Меч расправы' ],
'mmzamulet13'  : [10185, 60,  'Мистический амулет' ],
'sarmor9'  : [2610, 40,  'Мифриловая кольчуга' ],
'miff_plate'  : [10049, 75,  'Мифриловые доспехи' ],
'mif_sword'  : [17314, 70,  'Мифриловый меч' ],
'mif_staff'  : [16732, 70,  'Мифриловый посох' ],
'soul_cape'  : [1222, 30,  'Накидка духов' ],
'wiz_cape'  : [8894, 60,  'Накидка чародея' ],
'sarmor13'  : [4550, 50,  'Обсидиановая броня' ],
'boots13'  : [8681, 70,  'Обсидиановые сапоги' ],
'ssword13'  : [6300, 50,  'Обсидиановый меч' ],
'mstaff13'  : [5050, 40,  'Обсидиановый посох' ],
'zxhelmet13' : [6518, 70,  'Обсидиановый шлем' ],
'shield13'  : [10388, 70,  'Обсидиановый щит' ],
'mage_armor'  : [4559, 50,  'Одеяние мага' ],
'smamul14'  : [4600, 30,  'Осколок тьмы' ],
'verve_ring'  : [1610, 18,  'Перстень вдохновения' ],
'magring13'  : [10495, 60,  'Печать заклинателя' ],
'powercape'  : [5451, 40,  'Плащ магической силы' ],
'scoutcloack'  : [320, 20,  'Плащ разведчика' ],
'mstaff8'  : [3040, 30,  'Посох весны' ],
'sor_staff'  : [6246, 50,  'Посох могущества' ],
'ffstaff15'  : [18051, 70,  'Посох повелителя огня' ],
'mstaff10'  : [3980, 35,  'Посох теней' ],
'robewz15'  : [9506, 70,  'Роба пламенного чародея' ],
'wiz_robe'  : [9573, 70,  'Роба чародея' ],
'sboots12'  : [3150, 35,  'Рубиновые сапоги' ],
'mm_sword'  : [17557, 70,  'Рубиновый меч' ],
'mm_staff'  : [17343, 70,  'Рубиновый посох' ],
'shelm12' : [2800, 40,  'Рубиновый шлем' ],
'boots15'  : [8739, 70,  'Сапоги пламени' ],
'mboots14'  : [9011, 70,  'Сапоги чернокнижника' ],
'energy_scroll'  : [9234, 70,  'Свиток энергии' ],
'sboots9'  : [2250, 30,  'Солдатские сапоги' ],
'composite_bow'  : [8419, 55,  'Составной лук' ],
'ciras'  : [4549, 70,  'Стальная кираса' ],
'steel_blade'  : [475, 30,  'Стальной клинок' ],
'steel_helmet' : [3753, 70,  'Стальной шлем' ],
's_shield'  : [280, 15,  'Стальной щит' ],
'full_plate'  : [9438, 75,  'Стальные доспехи' ],
'samul8'  : [3570, 30,  'Счастливая подкова' ],
'sring10'  : [3010, 30,  'Терновое кольцо' ],
'shoe_of_initiative'  : [2434, 40,  'Туфли стремления' ],
'wiz_boots'  : [8177, 65,  'Туфли чародея' ],
'mif_hboots'  : [7915, 65,  'Тяжёлые мифриловые сапоги' ],
'mif_hhelmet' : [6431, 70,  'Тяжёлый мифриловый шлем' ],
'antiair_cape'  : [2987, 60,  'Халат ветров' ],
'antimagic_cape'  : [5053, 50,  'Халат магической защиты' ],
'mage_helm' : [3346, 50,  'Шлем мага' ],
'shelm8' : [1260, 30,  'Шлем отваги' ],
'myhelmet15' : [6722, 70,  'Шлем пламени' ],
'knowledge_hat' : [999, 25,  'Шляпа знаний' ],
'dragon_shield'  : [8962, 70,  'Щит драконов' ],
'shield16'  : [10514, 70,  'Щит пламени' ],
'sshield5'  : [3040, 40,  'Щит славы' ],
'sshield11'  : [4080, 40,  'Щит сокола' ],
'defender_shield'  : [1154, 40,  'Щит хранителя' ],

        //Новые арты

 'shield19' : [ 11020, 70, 'Щит рассвета' ],
'scroll18' : [ 10850, 70, 'Манускрипт концентрации' ],
'bow17' : [ 10640, 65, 'Лук рассвета' ],
'armor17' : [ 9990, 70, 'Кираса рассвета' ],
'mboots17' : [ 9140, 70, 'Сапоги сумерек' ],
'boots17' : [ 9140, 70, 'Сапоги рассвета' ],
'helmet17' : [ 7620, 70, 'Шлем рассвета' ],
'mhelmet17' : [ 7620, 70, 'Шлем сумерек' ],
'mring19' : [ 11990, 65, 'Кольцо непрестанности' ],
'ring19' : [ 11900, 65, 'Кольцо бесстрашия' ],
'amulet19' : [ 11620, 65, 'Кулон рвения' ],
'mamulet19' : [ 11620, 65, 'Кулон непостижимости' ],
'marmor17' : [ 9800, 70, 'Доспехи сумерек' ],
'cloack17' : [ 10500, 65, 'Мантия вечности' ],
'staff18' : [ 18680, 70, 'Посох затмения' ],
'sword18' : [ 18690, 70, 'Гладий предвестия' ],
'smstaff16' : [ 5140, 37, 'Посох забвения' ],
'sshield14' : [ 4130, 38, 'Щит чешуи дракона' ],
'sshield17' : [ 4230, 35, 'Щит подавления' ],
'sring17' : [ 3060, 30, 'Кольцо хватки дракона' ],
'scloack16' : [ 3360, 30, 'Плащ драконьего покрова' ],
'samul17' : [ 4620, 30, 'Оскал дракона' ],
'sarmor16' : [ 4580, 44, 'Кираса благородства' ],
'ssword16' : [ 6370, 46, 'Меч гармонии' ],
'smamul17' : [ 4620, 30, 'Амулет единения' ],
'shelm16' : [ 3870, 40, 'Шлем благородства' ],
'sboots16' : [ 3410, 30, 'Сапоги благородства' ],
'smring17' : [ 3060, 30, 'Печать единения' ]

}

var url = { 
    game  : location.hostname, 
	cur   : location.href 
};

var a = $('a');

var regexp = {
    item_hard  : /\: (\d+)\/(\d+)/, 
	item_hard2 : /<b>(\d+)<\/b><\/font>\/(\d+)/
};

var cura, adr, name, xcur, xrem, source = new Object(), cost, gos, auc, xmax, rcost, range, bg, color, plus;
for( var i = 0; i < a.length; i++ )
{
    cura = a[i];
    if( cura.href.match(/art_info.php/) && cura.href!=a[i-1].href )
    {
        adr = cura.href.replace("http://" + url.game + "/art_info.php",""); 
	    parseGET( adr );
		name = get[ 'id' ];
		get = new Array();
		
	    if( !real_cost[name] ) { continue; }
		
		if( ( hard = regexp.item_hard.exec( $(cura).parent().html() ) ) || ( hard = regexp.item_hard2.exec( $(cura).parent().html() ) ) )
		    {
			    xcur = hard[1];
		        xrem = hard[2];
			} else { continue; }
		
		source.cost = $(cura).parents('tr.wb').children().next().next().children().children().children().children().children().children().children().children().next().html();//children('td:last').html();
        cost = source.cost.replace(/,/g,""); 
        
	    gos =  real_cost[ name ][ 0 ];
	    xmax = real_cost[ name ][ 1 ];
		
        rcost = gos / xmax * xcur ; 
		
	    rcost = rcost.toFixed(0);
		
		range = rcost - cost;
		
		bg='transperent';
		
        if ( range >= 0 ) {
            color = '#0000CD'; //blue
			bg = '#96B4FB';
        } else if ( range < 0 && range > -500 ) {
		    color = '#FF9900'; 
		} else {
            color = '#660000';
	    }
		
		if( range < 0) { plus = ''; } else { plus = ' <sup>(+'+range+')</sup>'; }
		
	    source.app = $(cura).parents('tr.wb').children('td:eq(2)');
		$(source.app).append('<div style="margin: 0 0 0 -5px; padding: 5px 5px; height: 1.5em; background: ' + bg + '; color: ' + color + '; font: 20px; font-weight: bold; "><img style="vertical-align: middle; " src="http://im.heroeswm.ru/i/gold.gif">' + rcost + plus + '</div>');
		
  }
}

////////////////////////////////////////////////////End///////
}
}
waitForJquery();
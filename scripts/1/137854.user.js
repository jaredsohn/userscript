// ==UserScript==
// @name		  eRepublik Touhou Project
// @namespace	  Taiwan
// @author		  Mickeyhowl@erepublick, synex520(orocannoneer)@erepublick, dindog@mozest.com, TonyQ@ptt.cc, ZUN
// @version		  0.17.5
// @match         http://*.erepublik.com/*
// @include	      http://*.erepublik.com/*
// @exclude       http://*.erepublik.com/*.png*
// @exclude       http://*.erepublik.com/*.jpg*
// @exclude       http://*.erepublik.com/*.gif*
// @exclude       http://wiki.erepublik.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require       https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==

$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });

//TODO
//http://www.erepublik.com/images/modules/_icons/gold.png http://www.erepublik.com/images/modules/_icons/gold_icon.png http://www.erepublik.com/images/modules/homepage/gold.png

//background
function _addStyle(txt){
	  if (typeof GM_addStyle =="Function"){
						   GM_addStyle(txt);
	  }
	  else {
			  var style = document.createElement('style');
			  style.innerHTML = txt;
			  document.body.appendChild(style);
	   }
}

var style1 = '\
		   #homepage_out{background: url("http://i.imgur.com/sWwev.jpg") no-repeat center top!important;}\
		   body{background: url("http://i.imgur.com/ujYBn.jpg") no-repeat center top!important;}\
		   ';
_addStyle(style1);

//ereplogo 153*109
$('#logo > a').css('background','url(http://i.imgur.com/k7sUB.png)');

//currency
$("#large_sidebar .user_finances .currency_amount img[src='http://www.erepublik.com/images/flags_png/S/China.png']").attr('src','http://i.imgur.com/YKUZn.png');

var replacedMap = {
	/*logo*/
	'http://erepublik.com/images/parts/logo-erepublik.gif':
		'http://i.imgur.com/k7sUB.png',
	'http://static.erepublik.com/images/parts/logo-erepublik.gif':
		'http://i.imgur.com/k7sUB.png',
	/*Daily Order*/
	'http://www.erepublik.com/images/modules/homepage/daily_order.png':
		'http://i.imgur.com/MxS7d.png',
	'http://www.erepublik.com/images/modules/_icons/bazooka_parts.png':
		'http://www.erepublik.com/images/icons/industry/000/1.png',
	/*Foods Icon*/
	'http://www.erepublik.com/images/icons/industry/1/q1.png':
		'http://i.imgur.com/IF1v8.png',
	'http://www.erepublik.com/images/icons/industry/1/q2.png':
		'http://i.imgur.com/1G9BH.png',
	'http://www.erepublik.com/images/icons/industry/1/q3.png':
		'http://i.imgur.com/76yiW.png',
	'http://www.erepublik.com/images/icons/industry/1/q4.png':
		'http://i.imgur.com/FkdXm.png',
	'http://www.erepublik.com/images/icons/industry/1/q5.png':
		'http://i.imgur.com/BsT5C.png',
	'http://www.erepublik.com/images/icons/industry/1/q6.png':
		'http://i.imgur.com/UNKWM.png',
	'http://www.erepublik.com/images/icons/industry/1/default.png':
		'http://i.imgur.com/IF1v8.png',
	/*Weapons Icon*/
	'http://www.erepublik.com/images/icons/industry/2/q1.png':
		'http://i.imgur.com/7pziT.png',
	'http://www.erepublik.com/images/icons/industry/2/q2.png':
		'http://i.imgur.com/yjJKt.png',
	'http://www.erepublik.com/images/icons/industry/2/q3.png':
		'http://i.imgur.com/DkFrX.png',
	'http://www.erepublik.com/images/icons/industry/2/q4.png':
		'http://i.imgur.com/Lfa20.png',
	'http://www.erepublik.com/images/icons/industry/2/q5.png':
		'http://i.imgur.com/iKaQk.png',
	'http://www.erepublik.com/images/icons/industry/2/q6.png':
		'http://i.imgur.com/3a3Iw.png',
	/*Tickets*/
	'http://www.erepublik.com/images/icons/industry/3/default.png':
		'http://i.imgur.com/uoOdP.png',
	/*Bazooka & Parts*/
	'http://www.erepublik.com/images/icons/industry/000/3.png':
		'http://i.imgur.com/GtLBo.png',
	'http://www.erepublik.com/images/icons/industry/000/4.png':
		'http://i.imgur.com/twcbV.png',
	'http://www.erepublik.com/images/icons/industry/000/5.png':
		'http://i.imgur.com/b74fY.png',
	'http://www.erepublik.com/images/icons/industry/000/6.png':
		'http://i.imgur.com/mG01A.png',
	'http://www.erepublik.com/images/icons/industry/000/2.png':
		'http://i.imgur.com/23mAX.png',
	'http://www.erepublik.com/images/icons/industry/2/default.png':
		'http://i.imgur.com/3SluD.png',
	'http://www.erepublik.com/images/modules/pvp/small_durability.png':
		'http://i.imgur.com/AmDhC.png',
	/*Bomb*/
	'http://www.erepublik.com/images/icons/industry/999/26.png':
		'http://i.imgur.com/obpc8.png',
	'http://www.erepublik.com/images/icons/industry/999/27.png':
		'http://i.imgur.com/P44nI.png',
	'http://www.erepublik.com/images/icons/industry/999/28.png':
		'http://i.imgur.com/eZldr.png',
	'http://www.erepublik.com/images/icons/industry/999/29.png':
		'http://i.imgur.com/ehwyy.png',
	'http://www.erepublik.com/images/modules/pvp/factory_rockets/26.png':
		'http://i.imgur.com/G0wNi.png',
	'http://www.erepublik.com/images/modules/pvp/factory_rockets/27.png':
		'http://i.imgur.com/TzPCR.png',
	'http://www.erepublik.com/images/modules/pvp/factory_rockets/28.png':
		'http://i.imgur.com/dBuDc.png',
	'http://www.erepublik.com/images/modules/pvp/factory_rockets/29.png':
		'http://i.imgur.com/FHhl5.png',
	/*Bomb Factory*/
	'http://www.erepublik.com/images/modules/myland/buildings/rocket_factory_q1.png':
		'http://i.imgur.com/Td9rw.png',
	'http://www.erepublik.com/images/modules/myland/buildings/rocket_factory_q2.png':
		'http://i.imgur.com/G1CZt.png',
	'http://www.erepublik.com/images/modules/myland/buildings/rocket_factory_q3.png':
		'http://i.imgur.com/cTtSZ.png',
	'http://www.erepublik.com/images/modules/myland/buildings/rocket_factory_q4.png':
		'http://i.imgur.com/sWVOd.png',
	'http://www.erepublik.com/images/modules/manager/factory_buildings/rocket_factory_1.png':
		'http://i.imgur.com/Td9rw.png',
	'http://www.erepublik.com/images/modules/manager/factory_buildings/rocket_factory_2.png':
		'http://i.imgur.com/G1CZt.png',
	'http://www.erepublik.com/images/modules/manager/factory_buildings/rocket_factory_3.png':
		'http://i.imgur.com/cTtSZ.png',
	'http://www.erepublik.com/images/modules/manager/factory_buildings/rocket_factory_4.png':
		'http://i.imgur.com/sWVOd.png',
	/*Materials icon*/
	'http://www.erepublik.com/images/icons/industry/7/default.png':
		'http://i.imgur.com/IvC4r.png',
	'http://www.erepublik.com/images/icons/industry/12/default.png':
		'http://i.imgur.com/6docs.png',
	/*Town Center*/
	'http://www.erepublik.com/images/modules/myland/buildings/health_100.png':
		'http://i.imgur.com/qVEfJ.png',
	'http://www.erepublik.com/images/modules/myland/buildings/health_200.png':
		'http://i.imgur.com/RLJEh.png',
	'http://www.erepublik.com/images/modules/myland/buildings/health_300.png':
		'http://i.imgur.com/TeWP9.png',
	'http://www.erepublik.com/images/modules/myland/buildings/health_400.png':
		'http://i.imgur.com/I3rRj.png',
	'http://www.erepublik.com/images/modules/myland/buildings/health_500.png':
		'http://i.imgur.com/pAbTR.png',
	'http://www.erepublik.com/images/modules/myland/buildings/health_600.png':
		'http://i.imgur.com/RGeQb.png',
	/*House*/
	'http://www.erepublik.com/images/modules/myland/buildings/special_50.png':
		'http://i.imgur.com/W34wz.png',
	'http://www.erepublik.com/images/modules/myland/buildings/special_100.png':
		'http://i.imgur.com/DW37w.png',
	/*Weapon Company*/
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q1.png':
		'http://i.imgur.com/HCX5Q.png',
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q2.png':
		'http://i.imgur.com/IDfQ7.png',
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q3.png':
		'http://i.imgur.com/mQbdx.png',
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q4.png':
		'http://i.imgur.com/iOv1l.png',
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q5.png':
		'http://i.imgur.com/lf88c.png',
	'http://www.erepublik.com/images/modules/myland/buildings/weapons_q6.png':
		'http://i.imgur.com/FaJ2n.png',
}


var images = document.images;
for(var i = 0,len = images.length ; i < len ;++i){
   var replaced = replacedMap[images[i].src];
   if ( replaced ){
		images[i].src = replaced;
   }
}


//need loop
if ((document.location.toString().indexOf("/citizen")!==-1) || (document.location.toString().indexOf("/advanced-buildings")!==-1) || (document.location.toString().indexOf("/military/battlefield/")!==-1) || (document.location.toString().indexOf("/inventory")!==-1) || (document.location.toString().indexOf("/market")!==-1) || (document.location.toString().indexOf("/advanced-buildings")!==-1)) {
function loopiconimg() {
	var loopreplacedMap = {
	/*Drop Bazooka parts*/
	'http://www.erepublik.com/images/icons/industry/000/3.png':
		'http://i.imgur.com/GtLBo.png',
	'http://www.erepublik.com/images/icons/industry/000/4.png':
		'http://i.imgur.com/twcbV.png',
	'http://www.erepublik.com/images/icons/industry/000/5.png':
		'http://i.imgur.com/b74fY.png',
	'http://www.erepublik.com/images/icons/industry/000/6.png':
		'http://i.imgur.com/mG01A.png',
	'http://www.erepublik.com/images/icons/industry/000/2.png':
		'http://i.imgur.com/23mAX.png',
	'http://www.erepublik.com/images/icons/industry/000/1.png':
		'http://i.imgur.com/3SluD.png',
	/*For eRA*/
	'http://www.erepublik.com/images/icons/industry/1/q6.png':
		'http://i.imgur.com/UNKWM.png',
	'http://www.erepublik.com/images/icons/industry/2/q1.png':
		'http://i.imgur.com/7pziT.png',
	'http://www.erepublik.com/images/icons/industry/2/q2.png':
		'http://i.imgur.com/yjJKt.png',
	'http://www.erepublik.com/images/icons/industry/2/q3.png':
		'http://i.imgur.com/DkFrX.png',
	'http://www.erepublik.com/images/icons/industry/2/q4.png':
		'http://i.imgur.com/Lfa20.png',
	'http://www.erepublik.com/images/icons/industry/2/q5.png':
		'http://i.imgur.com/iKaQk.png',
	'http://www.erepublik.com/images/icons/industry/2/q6.png':
		'http://i.imgur.com/3a3Iw.png',
	'http://www.erepublik.com/images/icons/industry/7/default.png':
		'http://i.imgur.com/IvC4r.png',
	'http://www.erepublik.com/images/icons/industry/12/default.png':
		'http://i.imgur.com/6docs.png',	
	'http://www.erepublik.com/images/icons/industry/1/q1.png':
		'http://i.imgur.com/IF1v8.png',
	'http://www.erepublik.com/images/icons/industry/1/q2.png':
		'http://i.imgur.com/1G9BH.png',
	'http://www.erepublik.com/images/icons/industry/1/q3.png':
		'http://i.imgur.com/76yiW.png',
	'http://www.erepublik.com/images/icons/industry/1/q4.png':
		'http://i.imgur.com/FkdXm.png',
	'http://www.erepublik.com/images/icons/industry/1/q5.png':
		'http://i.imgur.com/BsT5C.png',
	'http://www.erepublik.com/images/icons/industry/1/q6.png':
		'http://i.imgur.com/UNKWM.png',
	'http://www.erepublik.com/images/icons/industry/1/default.png':
		'http://i.imgur.com/IF1v8.png',
	/*Foods small icon*/
	'http://www.erepublik.com/images/icons/industry/1/q1_30x30.png':
		'http://i.imgur.com/rztWe.png',
	'http://www.erepublik.com/images/icons/industry/1/q2_30x30.png':
		'http://i.imgur.com/aZ0ly.png',
	'http://www.erepublik.com/images/icons/industry/1/q3_30x30.png':
		'http://i.imgur.com/9ixKj.png',
	'http://www.erepublik.com/images/icons/industry/1/q4_30x30.png':
		'http://i.imgur.com/eW4oS.png',
	'http://www.erepublik.com/images/icons/industry/1/q5_30x30.png':
		'http://i.imgur.com/kV3LF.png',
	'http://www.erepublik.com/images/icons/industry/1/q6_30x30.png':
		'http://i.imgur.com/u9ZVC.png',
	/*Foods big icon*/
	'http://www.erepublik.com/images/icons/industry/1/q1_90x90.png':
		'http://i.imgur.com/IF1v8.png',
	'http://www.erepublik.com/images/icons/industry/1/q2_90x90.png':
		'http://i.imgur.com/1G9BH.png',
	'http://www.erepublik.com/images/icons/industry/1/q3_90x90.png':
		'http://i.imgur.com/76yiW.png',
	'http://www.erepublik.com/images/icons/industry/1/q4_90x90.png':
		'http://i.imgur.com/FkdXm.png',
	'http://www.erepublik.com/images/icons/industry/1/q5_90x90.png':
		'http://i.imgur.com/BsT5C.png',
	'http://www.erepublik.com/images/icons/industry/1/q6_90x90.png':
		'http://i.imgur.com/UNKWM.png',
	/*Weapons small icon*/
	'http://www.erepublik.com/images/icons/industry/2/q1_30x30.png':
		'http://i.imgur.com/9cgd8.png',
	'http://www.erepublik.com/images/icons/industry/2/q2_30x30.png':
		'http://i.imgur.com/z1FSi.png',
	'http://www.erepublik.com/images/icons/industry/2/q3_30x30.png':
		'http://i.imgur.com/UMSPF.png',
	'http://www.erepublik.com/images/icons/industry/2/q4_30x30.png':
		'http://i.imgur.com/RsYOk.png',
	'http://www.erepublik.com/images/icons/industry/2/q5_30x30.png':
		'http://i.imgur.com/mDqBx.png',
	'http://www.erepublik.com/images/icons/industry/2/q6_30x30.png':
		'http://i.imgur.com/oXJ5f.png',
	/*Weapons big icon*/
	'http://www.erepublik.com/images/icons/industry/2/q1_90x90.png':
		'http://i.imgur.com/7pziT.png',
	'http://www.erepublik.com/images/icons/industry/2/q2_90x90.png':
		'http://i.imgur.com/yjJKt.png',
	'http://www.erepublik.com/images/icons/industry/2/q3_90x90.png':
		'http://i.imgur.com/DkFrX.png',
	'http://www.erepublik.com/images/icons/industry/2/q4_90x90.png':
		'http://i.imgur.com/Lfa20.png',
	'http://www.erepublik.com/images/icons/industry/2/q5_90x90.png':
		'http://i.imgur.com/iKaQk.png',
	'http://www.erepublik.com/images/icons/industry/2/q6_90x90.png':
		'http://i.imgur.com/3a3Iw.png',
	/*Materials small icon*/
	'http://www.erepublik.com/images/icons/industry/7/default_30x30.png':
		'http://i.imgur.com/3s5JO.png',
	'http://www.erepublik.com/images/icons/industry/12/default_30x30.png':
		'http://i.imgur.com/xwj9i.png'
	}

	var loopimages = document.images;
	for(var i = 0,len = loopimages.length ; i < len ;++i){
	   var loopreplaced = loopreplacedMap[images[i].src];
	   if ( loopreplaced ){
			images[i].src = loopreplaced;
	   }
	}

	$('#marketplace > #filters_expanded > .product_selector > ul > li > a > strong').replaceText('Food','Point');
	$('#marketplace > #filters_expanded > .product_selector > ul > li > a > strong').replaceText('Weapons','Girls');
	$('#marketplace > #filters_expanded > .product_selector > ul > li > a > strong').replaceText('Food Raw …','Sweet Sake');
	$('#marketplace > #filters_expanded > .product_selector > ul > li > a > strong').replaceText('Weapon …','Dry Sake');
	$('#marketplace > #filters_expanded > .product_selector > ul > li > a > strong').replaceText('Moving …','Brooms');
	$('#7.industrySelect > strong').text('Sweet Sake');
	
	$('#pvp_battle_area > #drop_part > span > p > strong').replaceText('1 Barrel','the Armpit');
	$('#pvp_battle_area > #drop_part > span > p > strong').replaceText('1 Scope','the Saisenbako');
	$('#pvp_battle_area > #drop_part > span > p > strong').replaceText('1 M6A3 rocket','the Sake');
	$('#pvp_battle_area > #drop_part > span > p > strong').replaceText('1 Trigger kit','the Yukkuri');
	$('#pvp_battle_area > #drop_part > span > p > strong').replaceText('1 Stock','the Yin-Yang Orb');

	$('#collection_complete > h2').text('REIMU');
	$('#collection_complete > a').replaceText('Build your Bazooka','Summon your Reimu');
	$('#collection_complete').css('background','url(http://i.imgur.com/XwBJ1.png)');
	
	$('.console_holder > .notifier > h2 > span').replaceText('won','cleared');
	$('.console_holder > .notifier > h2 > span').replaceText('battle','stage');
	
	window.setTimeout(loopiconimg,20);
	
}
window.setTimeout(loopiconimg,20);
};

//mainpage loop
function loopmain() {
	$("img[src='http://www.erepublik.com/images/icons/industry/000/1.png']").attr('src','http://i.imgur.com/3SluD.png');
	$('.wresults .wcontent .wtexts .item small').replaceText('Different Bazooka parts','Different Reimu parts');
	window.setTimeout(loopmain,20);
}
window.setTimeout(loopmain,20);

$('#menuText li#menu1 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll 0 0 transparent');
$("#menuText li#menu1 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll 0 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll 0 0 transparent');
	}
);
$('#menuText li#menu2 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll -48px 0 transparent');
$("#menuText li#menu2 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll -48px 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll -48px 0 transparent');
	}
);
$('#menuText li#menu3 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll -229px 0 transparent');
$("#menuText li#menu3 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll -229px 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll -229px 0 transparent');
	}
);
$('#menuText li#menu4 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll -410px 0 transparent');
$("#menuText li#menu4 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll -410px 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll -410px 0 transparent');
	}
);
$('#menuText li#menu5 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll -591px 0 transparent');
$("#menuText li#menu5 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll -591px 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll -591px 0 transparent');
	}
);
$('#menuText li#menu6 a').css('background','url("http://i.imgur.com/OfNbH.png") no-repeat scroll -772px 0 transparent');
$("#menuText li#menu6 a").hover(
	function () {
		$(this).css('background', 'url("http://i.imgur.com/MTYoK.png") no-repeat scroll -772px 0 transparent');
	}, 
	function () {
		$(this).css('background', 'url("http://i.imgur.com/OfNbH.png") no-repeat scroll -772px 0 transparent');
	}
);

//BG
$('.mission_pop .top').css('background-image','url(http://i.imgur.com/fRw0o.png)');
$('.boxes.order_of_day > div').css('background-image','url(http://i.imgur.com/hxZva.png)');
$('.employer_salary strong').css('background-image','url(http://i.imgur.com/Fp3F0.png)');

$('.err._maintenance').css('background','url(http://i.imgur.com/HFe5Q.png)');


//texts
$('li#menu2 > a > span').text('Gensokyo');
$('li#menu3 > a > span').text('Stages');
$('li#menu4 > a > span').text('Kourindou');
$('li#menu5 > a > span').text('Gumon Shiki');
$('li#menu6 > a > span').text('Saisenbako');
$("[title='Weapons']").attr('title','Girls');
$("[title='Food']").attr('title','Points');
$("[title='Consuming food recovers your health']").attr('title','Girls work hard for the p****s');
$("[title='Using weapons improves your damage in battles']").attr('title','Using girls is much better than using your hands');
$("[title='Moving Tickets allow changing residence without paying any tax']").attr('title','Necessary means of transportation in fantasy world');
$("[title='Raw material needed to produce weapons']").attr('title','Girls in Gensokyo love sake');
$("[title='Food Raw Materials']").attr('title','Sweet Sake');
$("[title='Weapon Raw Materials']").attr('title','Dry Sake');
$("[title='Moving Tickets']").attr('title','Brooms');
$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('Spirit Power');
$("[title='Barrel']").attr('title','essental of doninji');
$("[title='Scope']").attr('title','forever empty');
$("[title='M6A3 Rocket']").attr('title','always drunk');
$("[title='Trigger Kit']").attr('title','UMA');
$("[title='Stock']").attr('title','bad luck');
$('.bazooka > .details > strong').html('Reimu');
$('.bazooka > .details > small').text('Rob all money with 1 hit');
$('#inventory_overview .items_holder h4').replaceText('Rocket','Spell Card');
$('a.build_rockets.assemble > span').text('Sacrifice Summon');
$("img[src='http://i.imgur.com/obpc8.png']").attr('title','Midnight King "Dracula Cradle"');
$("img[src='http://i.imgur.com/P44nI.png']").attr('title','Oni Sign "Massacre on Mt.Ooe"');
$("img[src='http://i.imgur.com/eZldr.png']").attr('title','Curse God "Red Mouth Mishaguji-sama"');
$("img[src='http://i.imgur.com/ehwyy.png']").attr('title','"Scarlet Weather Rapture"');
$("img[src='http://i.imgur.com/G0wNi.png']").attr('title','Midnight King "Dracula Cradle"');
$("img[src='http://i.imgur.com/TzPCR.png']").attr('title','Oni Sign "Massacre on Mt.Ooe"');
$("img[src='http://i.imgur.com/dBuDc.png']").attr('title','Curse God "Red Mouth Mishaguji-sama"');
$("img[src='http://i.imgur.com/FHhl5.png']").attr('title','"Scarlet Weather Rapture"');
//$('"#rocket_bomb_deploy"').attr('title','Spell Card');
$('.upgrade_pop.limit_four .rocket_cost b').replaceText('Rocket production cost:','Spell Card sacrifice:');
$('.upgrade_pop.limit_four .rocket_cost i').replaceText('build 1 rocket','get 1 Spell Card ');
$('.manager_dashboard > .list > .health_buildings > .listing_holder > .list_group > div.listing:eq(2) > .area_pic > img').remove();
$('.manager_dashboard > .list > .health_buildings > .listing_holder > .list_group > div.listing:eq(2) > .area_pic').append('<img class="rocket_factory" alt="Rocket Factory" src="http://i.imgur.com/Td9rw.png" original-title="Make contract with her to get Spell Card">');
$('.upgrade_pop h1').text('MAKE CONTRACT');
$('#upgrade_building_1 .upgrade_action .upgrade_title').replaceText('Build','Make');
$('.errtxt > span').replaceText('Oops, something went wrong.','Bros, Plato has no brain again ;p');
$('.errtxt p').text('Reimu and Marisa were too hungry, I am really sorry for that.');
$('.errtxt > span#time').replaceText("Maintenance. We'll be back any second now.","Plato's brain will respawn soooooooooooooon B*i*z*r*™");

//--------------------------------------------------------------------
//www.erepublik.com/en/military/battlefield/
//--------------------------------------------------------------------
if (document.location.toString().indexOf("/military/battlefield/")!==-1) {

	$('#pvp_header > .domination').css("opacity","0.8");

	//力量圖示 Strength icon
	$('#pvp_battle_area > .player > .head_tag > .info > span > img').attr('src','http://i.imgur.com/18Gui.png');

	//少女祈禱中
	$('#pvp > .console_holder > .notifier > div > span').replaceText('Waiting for other divisions.','Girls are praying');

	function changeing() {

	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q10_special.png']").attr('src','http://i.imgur.com/1A56L.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/wH2hL.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/O9x2E.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/skpKg.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/J1dqS.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/RGrgP.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/G4w83.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/gEPge.gif');
	$(".listing > span > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
	
	$("img[src='http://www.erepublik.com/images/icons/industry/000/3.png']").attr('src','http://i.imgur.com/GtLBo.png');
	$("img[src='http://www.erepublik.com/images/icons/industry/000/4.png']").attr('src','http://i.imgur.com/twcbV.png');
	$("img[src='http://www.erepublik.com/images/icons/industry/000/5.png']").attr('src','http://i.imgur.com/b74fY.png');
	$("img[src='http://www.erepublik.com/images/icons/industry/000/6.png']").attr('src','http://i.imgur.com/mG01A.png');
	$("img[src='http://www.erepublik.com/images/icons/industry/000/2.png']").attr('src','http://i.imgur.com/23mAX.png');

	window.setTimeout(changeing,10);
	}
	window.setTimeout(changeing,500);

	var AsiaeS = [
		/*China*/
		'Anhui', 
		'Beijing', 
		'Chongqing', 
		'Fujian', 
		'Gansu', 
		'Guangdong', 
		'Guangxi', 
		'Guizhou', 
		'Hainan', 
		'Heilongjiang', 
		'Henan', 
		'Hubei', 
		'Inner Mongolia', 
		'Jiangsu', 
		'Jiangxi', 
		'Jilin', 
		'Liaoning', 
		'Ningxia', 
		'Qinghai', 
		'Shaanxi', 
		'Shandong', 
		'Shanghai', 
		'Shanxi', 
		'Sichuan', 
		'Tibet', 
		'Xinjiang', 
		'Shaanxi', 
		'Shaanxi', 
		'Yunnan', 
		'Zhejiang',
		/*ROC*/
		'Northern Taiwan', 
		'Central Taiwan', 
		'Eastern Taiwan', 
		'Southern Taiwan', 
		/*NK*/
		'Chagang', 
		'Hamgyong', 
		'Hwangae', 
		'Kangwon', 
		'Pyongan', 
		'Ryanggang'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<AsiaeS.length;i++) {
			if (text.indexOf(AsiaeS[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function changeasiaeS() { 
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/UnjO5.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/QDO3h.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/nZ0OV.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/NNtGO.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/42RlN.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/Pjyod.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/oda74.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
				
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM

			window.setTimeout(changeasiaeS,10);
		};
		window.setTimeout(changeasiaeS,10);

		$('#pvp').css('background-image','url(http://i.imgur.com/L9F6I.png)');

		$('#pvp_header > .country.left_side > div > h3').css({color: '#AAAAAA'});
		$('#pvp_header > .country.right_side > div > h3').css({color: '#AAAAAA'});

		$('#pvp_header > h2').css({color: '#FFFFFF'});

		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/00.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
	});

	var Asia = [
		/*india*/
		'Andhra Pradesh',
		'Bihar',
		'Chhattisgarh',
		'Gujarat',
		'Jammu and Kashmir',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Northern India',
		'Orissa',
		'North Eastern India',
		'Rajasthan',
		'Tamil Nadu',
		'Uttar Pradesh',
		'West Bengal',
		/*Iran*/
		'Fars',
		'Kerman Province',
		'Razavi Khorasan',
		'Yazd',
		'Esfahan',
		'South Khorasan',
		'Northwestern Iran',
		'Sistan and Baluchistan',
		'Hormozgan',
		'Mazandaran and Golistan',
		'Southwestern Iran',
		'Semnan',
		/*Japan*/
		'Chubu',
		'Hokkaido',
		'Kanto',
		'Kinki',
		'Shikoku',
		'Tohoku',
		'Chugoku',
		'Kyushu',
		/*Israel*/
		'Beersheba South District',
		'Jerusalem district',
		'Tel Aviv Center District',
		'Haifa district',
		'Nazareth North District',
		'Al Jawf',
		'Northern Borders',
		/*Pakistan*/
		'Balochistan',
		'North-West Frontier Province',
		'Punjab',
		'Sindh',
		/*Russia*/
		'Central Black Earth',
		'Eastern Siberia',
		'Far Eastern Russia',
		'Leningrad Oblast',
		'Moscow and Central Russia',
		'North Caucasus',
		'Northern Russia',
		'Urals',
		'Volga',
		'Volga Vyatka',
		'Western Siberia',
		'Kaliningrad',
		/*South Korea*/
		'Chungcheongbuk-do',
		'Chungcheongnam-do',
		'Gangwon-do',
		'Gyeonggi-do',
		'Gyeongsangbuk-do',
		'Gyeongsangnam-do',
		'Jeollabuk-do',
		'Jeollanam-do',
		'Jeju',
		/*Thailand*/
		'North-Eastern Thailand',
		'Central Thailand',
		'Eastern Thailand',
		'Northern Thailand',
		'Southern Thailand',
		/*Turkey*/
		'Aegean Coast of Turkey',
		'Black Sea Coast of Turkey',
		'Central Anatolia',
		'Eastern Anatolia',
		'Marmara',
		'Mediterranean Coast of Turkey',
		'Southeastern Anatolia',
		/*United Arab Emirates*/
		'Abu Dhabi',
		'Dubai',
		'Sharjah',
		'Ajman',
		'Ras al-Khaimah',
		'Umm al Quwain',
		'Fujairah',
		/*Saudi Arabia*/
		'Al Riyadh',
		'Al Bahah',
		'Northern Borders',
		'Al Jawf',
		'Al Madinah',
		'Al Qasim',
		'Asir',
		'Eastern Province',
		'Tabuk',
		'Jizan',
		"Ha'il"
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<Asia.length;i++) {
			if (text.indexOf(Asia[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function changeasia() { 
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/FmsM5.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/Tz4mq.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/Ii6kV.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/8LtZj.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/w9dyL.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/k2lIA.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/d4fg5.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
				
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
				
			window.setTimeout(changeasia,10);
		};
		window.setTimeout(changeasia,10);
		
		$('#pvp').css('background-image','url(http://i.imgur.com/vaNSa.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});

		//改地名顏色
		//$('#pvp_header > h2').css({color: '#FFFFFF'});
					
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/08_Asia.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');

	});

	var AmericaN = [
		/*Canada*/
		'Alberta',
		'Ontario',
		'Quebec',
		'Yukon',
		'Newfoundland and Labrador',
		'Labrador',
		'New Brunswick',
		'Prince Edward Island',
		'Manitoba',
		'Saskatchewan',
		'British Columbia',
		'Nova Scotia',
		/*Mexico*/
		'Baja',
		'Gulf of Mexico',
		'Northeast of Mexico',
		'Northwest of Mexico',
		'Oaxaca',
		'Pacific Coast of Mexico',
		'Southeast of Mexico',
		'Valley of Mexico',
		/*USA*/
		'Alabama',
		'Alaska',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'Florida',
		'Georgia',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming',
		'District of Columbia'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<AmericaN.length;i++) {
			if (text.indexOf(AmericaN[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function AmerN() {
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/Uz59S.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/nnMFJ.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/nXGjm.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/gU3Yc.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/C5W1b.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/y2Jlk.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/jK5Xl.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
			
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
				
			window.setTimeout(AmerN,10);
		};
		window.setTimeout(AmerN,10);
		
		//背景，要調成760*560。
		$('#pvp').css('background-image','url(http://i.imgur.com/or09K.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#AAAAAA'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#AAAAAA'});

		//改地名顏色
		$('#pvp_header > h2').css({color: '#AAAAAA'});
				
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/12_NA.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
	});

	var AmericaS = [
		/*Argentina*/
		'Argentine Northwest',
		'Cuyo',
		'Mesopotamia',
		'Pampas',
		'Patagonia',
		'South East Chaco',
		/*Bolivia*/
		'Beni and Cochabamba',
		'Bolivian Altiplano',
		'Chuquisaca and Tarija',
		'Pando',
		'Santa Cruz',
		/*Brazil*/
		'Center West of Brazil',
		'Northeast of Brazil',
		'North of Brazil',
		'Parana and Santa Catarina',
		'Rio Grande do Sul',
		'Southeast of Brazil',
		/*Chile*/
		'Norte Grande',
		'Norte Chico',
		'Zona Central',
		'Zona Sur',
		'Zona Austral',
		/*Colombia*/
		'Amazonica',
		'Andina',
		'Caribe e Insular',
		'Cundiboyacense',
		'Orinoquia',
		'Pacifica',
		/*Paraguay*/
		'Paranena',
		'Central East Chaco',
		/*Peru*/
		'Chimor',
		'Lima',
		'Great Andes',
		'Low Andes',
		'Mid Andes',
		'Northern Low Amazon',
		'Southern Low Amazon',
		/*Uruguay*/
		'Charrua',
		/*Venezuela*/
		'Central Venezuela',
		'Central Western Venezuela',
		'Guayana',
		'Llanos',
		'North Eastern Venezuela',
		'Venezuelan Andean',
		'Venezuelan Capital',
		'Zulian',
		/*South Africa*/
		'Eastern Cape',
		'Free State',
		'Gauteng',
		'KwaZulu Natal',
		'Limpopo',
		'Mpumalanga',
		'North West Province',
		'Northern Cape',
		'Western Cape'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<AmericaS.length;i++) {
			if (text.indexOf(AmericaS[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function AmerS() { 
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/zAj7x.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/Mi2dH.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/O4BJ8.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/CfIBl.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/jLOUS.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/76ESX.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/Weo4T.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
			
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
			
			window.setTimeout(AmerS,20);
		};
		window.setTimeout(AmerS,20);
		
		//背景，要調成760*560。
		$('#pvp').css('background-image','url(http://i.imgur.com/eL6xm.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#000000'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#000000'});

		//改地名顏色
		//('#pvp_header > h2').css({color: '#FFFFFF'});
					
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/10_SA.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');	
	});

	var EuropeNW = [
		/*Austria*/
		'Burgenland',
		'Carinthia',
		'Lower Austria',
		'Salzburg',
		'Styria',
		'Tyrol',
		'Upper Austria',
		'Vorarlberg',
		/*Belgium*/
		'Brussels',
		'Flanders',
		'Wallonia',
		/*Estonia*/
		'Pohja-Eesti',
		'Kesk-Eesti',
		'Kirde-Eesti',
		'Laane-Eesti',
		'Louna-Eesti',
		/*France*/
		'Alsace',
		'Aquitaine',
		'Auvergne',
		'Brittany',
		'Burgundy',
		'Champagne Ardenne',
		'Corsica',
		'Franche-comte',
		'Languedoc Roussillon',
		'Limousin',
		'Upper Normandy',
		'Pays de la Loire',
		/*Ireland*/
		'Cork',
		'Dublin',
		'Louth',
		'Mayo',
		'Shannon',
		'Wexford',
		/*Italy*/
		'Abruzzo',
		'Aosta Valley',
		'Apulia',
		'Basilicata',
		'Calabria',
		'Campania',
		'Emilia-Romagna',
		'Friuli Venezia Giulia',
		'Lazio',
		'Liguria',
		'Veneto',
		/*Germany*/
		'Baden-Wurttemberg',
		'Bavaria',
		'Brandenburg and Berlin',
		'Hesse',
		'Lower Saxony and Bremen',
		'Mecklenburg-Western Pomerania',
		'North Rhine-Westphalia',
		'Rhineland-Palatinate',
		'Saarland',
		'Saxony',
		'Thuringia',
		/*Netherlands*/
		'Northern Netherlands',
		'Southern Netherlands',
		'Western Netherlands',
		'Eastern Netherlands ',
		/*Portugal*/
		'Alentejo',
		'Algarve',
		'Azores',
		'Centro',
		'Lisboa',
		'Madeira',
		/*Spain*/
		'Andalucia',
		'Aragon',
		'Asturias',
		'Balearic Islands',
		'Basque Country',
		'Canary Islands',
		'Cantabria',
		'Castilla La Mancha',
		'Castilla y Leon',
		'Catalonia',
		'Extremadura',
		'Galicia',
		'La Rioja',
		'Madrid',
		'Murcia',
		'Navarra',
		'Valencian Community',
		/*Switzerland*/
		'Deutschschweiz',
		'Svizzera italiana',
		'Romandie',
		'Graubunden',
		/*United Kingdom*/
		'London',
		'East Midlands',
		'East of England',
		'North East of England',
		'North West of England',
		'Northern Ireland',
		'Scotland',
		'South East of England',
		'South West of England',
		'West Midlands',
		'Yorkshire & Humberside',
		/*Denmark*/
		'Sjaelland',
		'Hovedstaden',
		'Syddanmark',
		'Midtjylland',
		'Nordjylland',
		/*Finland*/
		'Aland',
		'Eastern Finland',
		'Lapland',
		'Oulu',
		'Southern Finland',
		'Western Finland',
		/*Norway*/
		'Svalbard & Jan Mayen',
		'Nord-Norge',
		'Ostlandet',
		'Sorlandet',
		'Trondelag',
		'Vestlandet',
		/*Sweden*/
		'Bohus',
		'Gotaland',
		'Gotland',
		'Jamtland Harjedalen',
		'Norrland and Sameland',
		'Scania',
		'Smaland',
		'Svealand'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<EuropeNW.length;i++) {
			if (text.indexOf(EuropeNW[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function changeewn() {
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/vC9W9.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/22Yuv.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/c4H5z.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/NBkJP.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/sUUyM.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/dtgoD.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/XBWhX.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
			
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});
			
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
				
			window.setTimeout(changeewn,10);
		};
		window.setTimeout(changeewn,10);
		
		$('#pvp').css('background-image','url(http://i.imgur.com/v2fCY.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});

		//改地名顏色
		$('#pvp_header > h2').css({color: '#FFFFFF'});
				
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/06_NWE.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
	});

	var EuropeCE = [
		/*Albania*/
		'Tirana', 
		'Albanian Coast', 
		'Southeastern Albania', 
		/*Bosnia and Herzegovina*/
		'Brcko District', 
		'East Srpska Republic', 
		'Federation of BiH', 
		'West Srpska Republic', 
		/*Belarus*/
		'Brestskaya', 
		'Homelskaya', 
		'Hrodzienskaya', 
		'Mahilyowskaya', 
		'Minskaya', 
		'Vitsebskaya', 
		/*Bulgaria*/
		'Burgas', 
		'Plovdiv', 
		'Ruse', 
		'Sofia', 
		'Varna', 
		'Vidin', 
		/*Croatia*/
		'Central Croatia', 
		'Istria and Kvarner', 
		'North Dalmatia', 
		'Lika and Gorski Kotar', 
		'Northwest Croatia', 
		'Slavonia', 
		'South Dalmatia', 
		/*Czech Republic*/
		'Moravia', 
		'Southern Bohemia', 
		'Northern Bohemia', 
		/*Greece*/
		'Aegean Islands', 
		'Attica', 
		'Central Greece', 
		'Crete', 
		'Epirus', 
		'Ionian Islands', 
		'Macedonia', 
		'Peloponnese', 
		'Thessaly', 
		'Thrace', 
		/*Hungary*/
		'Central Hungary', 
		'Central Transdanubia', 
		'Northern Great Plain', 
		'Northern Hungary', 
		'Southern Great Plain', 
		'Southern Transdanubia', 
		'Western Transdanubia', 
		/*Latvia*/
		'Kurzeme', 
		'Latgale', 
		'Vidzeme', 
		'Zemgale', 
		/*Lithuania*/
		'Lithuanian Highland', 
		'Lithuania Minor', 
		'Dainava', 
		'Samogitia', 
		'Sudovia', 
		/*Montenegro*/
		'North Montenegrin Mountains', 
		'Central Montenegro', 
		'Montenegrin Coast', 
		/*Poland*/
		'Great Poland', 
		'Little Poland', 
		'Mazovia', 
		'Mazuria', 
		'Pomerania', 
		'Silesia', 
		/*Macedonia*/
		'Eastern Macedonia', 
		'Povardarie', 
		'Western Macedonia', 
		/*Moldova*/
		'Northern Basarabia', 
		'Chisinau', 
		'Southern Basarabia', 
		'Transnistria', 
		/*Romania*/
		'Muntenia', 
		'Banat', 
		'Crisana', 
		'Bucovina', 
		'Dobrogea', 
		'Maramures', 
		'Moldova', 
		'Oltenia', 
		'Transilvania', 
		/*Serbia*/
		'Belgrade', 
		'Eastern Serbia', 
		'Raska', 
		'Southern Serbia', 
		'Sumadija', 
		'Vojvodina', 
		'Western Serbia', 
		'Kosovo', 
		/*Slovakia*/
		'Bratislava', 
		'Central Slovakia', 
		'Eastern Slovakia', 
		'Western Slovakia', 
		/*Slovenia*/
		'Inner Carniola', 
		'Upper Carniola', 
		'Lower Carniola', 
		'Prekmurje', 
		'Rhone Alps', 
		'Slovenian Littoral', 
		'Styria and Carinthia', 
		/*Ukraine*/
		'Bassarabia', 
		'Bukovina', 
		'Dnipro', 
		'Donbas', 
		'Galicia and Lodomeria ', 
		'Podolia', 
		'Polisia', 
		'Subcarpathia', 
		'Taurida', 
		'Volhynia', 
		'Zaporozhia', 
		/*Cyprus*/
		'Northern Cyprus', 
		'Southern Cyprus', 
		/*Egypt*/
		'Lower Egypt', 
		'Middle Egypt', 
		'Western Desert', 
		'Upper Egypt', 
		'Sinai', 
		'Red Sea Coast'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<EuropeCE.length;i++) {
			if (text.indexOf(EuropeCE[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function changeece() { 
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/klZa7.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/ZcJsW.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/XwcOm.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/vf7Nn.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/ru1fD.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/lqFPV.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/cmWrI.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
					
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#AAAAAA'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#AAAAAA'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#AAAAAA'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#AAAAAA'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#AAAAAA'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#AAAAAA'}); //for BM

			window.setTimeout(changeece,20);
		};
		window.setTimeout(changeece,20);
		
		//background,760*560
		$('#pvp').css('background-image','url(http://i.imgur.com/Hvyej.png)');

		//改國家名顏色
		$('#pvp_header > .country.left_side > div > h3').css({color: '#AAAAAA'});
		$('#pvp_header > .country.right_side > div > h3').css({color: '#AAAAAA'});

		//改地名顏色
		$('#pvp_header > h2').css({color: '#AAAAAA'});

		//background music
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/11_ESE.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
	});

	var Oceania = [
		/*Indonesian*/
		'Java',
		'Kalimantan',
		'Lesser Sunda Islands',
		'Maluku Islands',
		'Papua',
		'Sulawesi',
		'Sumatra',
		/*Malaysia*/
		'Peninsular Malaysia',
		'Sabah',
		'Sarawak',
		/*New Zealand*/
		'Auckland',
		'Canterbury',
		'Otago',
		'Wellington',
		/*Singapore*/
		'Singapore City',
		/*Philippines*/
		'Luzon',
		'Palawan',
		'Visayas',
		'Mindanao',
		/*Australia*/
		'New South Wales',
		'Victoria',
		'Tasmania',
		'South Australia',
		'Western Australia',
		'Northern Territory',
		'Queensland'
	];

	$('#pvp_header > h2').filter(function () {
		var text = $(this).text();

		for (var i=0;i<Oceania.length;i++) {
			if (text.indexOf(Oceania[i]) !== -1) {
				return true;
			}
		}

		return false;
	}).each(function () {
		function changeoceania() {
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/QCKRy.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/HbfzD.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/GEm9p.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/PszK5.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/OYhHt.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/0qlyA.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/ynBaz.gif');
			$(".weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
				
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
				
			window.setTimeout(changeoceania,10);
		};
		window.setTimeout(changeoceania,10);
		
		//背景，要調成760*560。
		$('#pvp').css('background-image','url(http://i.imgur.com/aKt8a.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});

		//改地名顏色
		$('#pvp_header > h2').css({color: '#333333'});

		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/yuyu.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
	});

	var onlyEuropeNW = new Array(2)
	onlyEuropeNW [0] = $("#pvp_header > h2:exact('Norte')")
	onlyEuropeNW [1] = $("#pvp_header > h2:exact('Wales')")
	
	function changeoewn() { 
		for (i = 0; i < 2 ; i++) {
			if (onlyEuropeNW[i].text())	{  

			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/vC9W9.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/22Yuv.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/c4H5z.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/NBkJP.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/sUUyM.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/dtgoD.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/XBWhX.gif');
			$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/yathf.gif');
			
			//改輸出名字顏色
			$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
			$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

			//改BH名字顏色
			$('#pvp_header > #defenderHero > small').css({color: '#000000'});
			$('#pvp_header > #defenderHero > a > small').css({color: '#000000'}); //for BM
			$('#pvp_header > #attackerHero > small').css({color: '#000000'});
			$('#pvp_header > #attackerHero > a > small').css({color: '#000000'}); //for BM
			
			window.setTimeout(changeoewn,10);
			break;
			};
		};
	};
	window.setTimeout(changeoewn,10);

	for (i = 0; i < 125 ; i++) {
		if (onlyEuropeNW[i].text()){  

		//背景，要調成760*560。
		$('#pvp').css('background-image','url(http://i.imgur.com/v2fCY.png)');

		//改國家名顏色
		//$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
		//$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});

		//改地名顏色
		$('#pvp_header > h2').css({color: '#FFFFFF'});
			
		$('#large_sidebar').append('<div class="nothing">　</div>');
		$('#large_sidebar').append('<div class="erep_midi"> <embed id="midi" src="http://synex520free.kilu.de/0_plugin/midi/06_NWE.mid" *hidden="true" autostart="1" playcount="99" width="140" height="33" type="application/x-mplayer2" alt></div>');
			
		break; 
		};
	};
};
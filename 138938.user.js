// ==UserScript==
// @name      eRepublik IND battle
// @namespace  Indonesia
// @author IndoAssassin
// @version    0.1.2
// @description  modified from eRepublik SRW Battle
// @match      http://www.erepublik.com/*/military/battlefield/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

//This script is based from eRepublik SRW battle, credit to Mickeyhowl, synex520, KOGADO for the real author of eRepublik SRW Battle

window.setTimeout(changeing,500);
function changeing() {
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10_special.png']").attr('src','http://i.imgur.com/CIota.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/O62ng.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q7.png']").attr('src','http://i.imgur.com/kM1xU.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/edK4B.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/DLi5C.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/vVJLu.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/MB2OA.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/FGmBO.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/fD8op.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/0kt96.png');
    
//xxx
//$('#pvp_header > .domination > .mask.left_side > ul >li > big').css({color: '#000000'});
//$('#pvp_header > .domination > .mask.right_side > ul >li > big').css({color: '#000000'});

//xxx
//$('#pvp_header > #defenderHero > strong').css({color: '#666666'});
//$('#pvp_header > #attackerHero > strong').css({color: '#666666'});

//Warna Nama penyerang
$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#FFFFFF'});
$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#FFFFFF'});

//Warna Battle Hero attacker dan defender
$('#pvp_header > #defenderHero > img').css("opacity","0.9");
$('#pvp_header > #defenderHero > small').css({color: '#FFFFFF'});
$('#pvp_header > #defenderHero > a > small').css({color: '#FFFFFF'}); //for BM
$('#pvp_header > #attackerHero > img').css("opacity","0.9");
$('#pvp_header > #attackerHero > small').css({color: '#FFFFFF'});
$('#pvp_header > #attackerHero > a > small').css({color: '#FFFFFF'}); //for BM

window.setTimeout(changeing,10);
};

//background, ukurang 760*560
$('#pvp').css('background-image','url(http://i.imgur.com/4pJ86.png)');

//opacity bar dominiasi
$('#pvp_header > .domination').css("opacity","0.8");

//nama negara
$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
$('#pvp_header > .country.left_side > div > h3').css("opacity","0.9");
$('#pvp_header > .country.left_side > a > img').css("opacity","0.9");
$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});
$('#pvp_header > .country.right_side > div > h3').css("opacity","0.9");
$('#pvp_header > .country.right_side > a > img').css("opacity","0.9");

//pvp header
//$('#pvp_header > .regionLink > h2').css({color: '#FFFFFF'});
// ==/UserScript==
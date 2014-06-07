// ==UserScript==
// @name      eRepublik SRW battle
// @namespace  Taiwan http://userscripts.org/scripts/show/136405
// @author Mickeyhowl, synex520, KOGADO
// @version    0.13.30
// @description  only for moe
// @match      http://www.erepublik.com/*/military/battlefield/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// 給所有想要用自己圖的人：
// 1.圖片的尺寸請縮到190*150，否則會被切掉。
// 2.left是左邊的自己，right是右邊的對手，Q0~Q6應該不用多說，Q10就是火箭筒。

window.setTimeout(changeing,500);
function changeing() {
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10_special.png']").attr('src','http://i.imgur.com/CIota.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/z1IEW.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/w8kMX.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/3Im0t.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/it47n.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/NT0pK.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/dD7qj.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/mNNgD.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/TPyJw.png');

$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q10_special.png']").attr('src','http://i.imgur.com/5MnIx.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/VLYyO.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/ubfhA.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/My0eP.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/5nHr4.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/AbS19.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/HyB1b.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/ghIF9.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/ylCCH.png');
    
//改輸出數值顏色
//$('#pvp_header > .domination > .mask.left_side > ul >li > big').css({color: '#000000'});
//$('#pvp_header > .domination > .mask.right_side > ul >li > big').css({color: '#000000'});

//改bh數值顏色
//$('#pvp_header > #defenderHero > strong').css({color: '#666666'});
//$('#pvp_header > #attackerHero > strong').css({color: '#666666'});

//改輸出名字顏色
$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#000000'});
$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#000000'});

//改BH名字顏色
$('#pvp_header > #defenderHero > small').css({color: '#AAAAAA'});
$('#pvp_header > #defenderHero > a > small').css({color: '#AAAAAA'}); //for BM
$('#pvp_header > #attackerHero > small').css({color: '#AAAAAA'});
$('#pvp_header > #attackerHero > a > small').css({color: '#AAAAAA'}); //for BM

window.setTimeout(changeing,10);
};

//背景，要調成760*560。
$('#pvp').css('background-image','url(http://i.imgur.com/SyEyo.png)');

//後面的小數表示戰場總影響的透明度，0為完全消失，1為不透明。
$('#pvp_header > .domination').css("opacity","1");

//改國家名顏色
$('#pvp_header > .country.left_side > div > h3').css({color: '#FFFFFF'});
$('#pvp_header > .country.right_side > div > h3').css({color: '#FFFFFF'});

//改地名顏色
$('#pvp_header > h2').css({color: '#FFFFFF'});
// ==/UserScript==
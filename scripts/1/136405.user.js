// ==UserScript==
// @name      eRepublik MOE battle
// @namespace  Taiwan http://userscripts.org/scripts/show/136405
// @author Mickeyhowl, synex520, KOGADO
// @version    0.13.10
// @description  only for moe
// @match      http://www.erepublik.com/*/military/battlefield/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require    http://sizzlemctwizzle.com/updater.php?id=136405&days=5&show

// 給所有想要用自己圖的人：
// 1.圖片的尺寸請縮到190*150，否則會被切掉。
// 2.left是左邊的自己，right是右邊的對手，Q0~Q6應該不用多說，Q10就是火箭筒。

window.setTimeout(changeing,500);
function changeing() {
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10_special.png']").attr('src','http://i.imgur.com/f3Htu.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/M5dTn.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/STHnS.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/WVg1L.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/P8v63.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/PQXv4.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/Da0dc.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/dZUDl.png');
$("#pvp_battle_area > .left_side > #scroller > .listing > span > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/galW7.png');

$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q10.png']").attr('src','http://i.imgur.com/GTazK.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q6.png']").attr('src','http://i.imgur.com/TMYjn.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q5.png']").attr('src','http://i.imgur.com/HmZ0X.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q4.png']").attr('src','http://i.imgur.com/1xZWR.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q3.png']").attr('src','http://i.imgur.com/iVnTA.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q2.png']").attr('src','http://i.imgur.com/OyvxH.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q1.png']").attr('src','http://i.imgur.com/ozcjH.png');
$("#pvp_battle_area > .right_side > .weapon > img[src='/images/modules/pvp/weapons/weapon_q0.png']").attr('src','http://i.imgur.com/galW7.png');
    
//改輸出數值顏色
//$('#pvp_header > .domination > .mask.left_side > ul >li > big').css({color: '#111111'});
//$('#pvp_header > .domination > .mask.right_side > ul >li > big').css({color: '#111111'});

//改bh數值顏色
//$('#pvp_header > #defenderHero > strong').css({color: '#111111'});
//$('#pvp_header > #attackerHero > strong').css({color: '#111111'});

//改輸出名字顏色
$('#pvp_header > .domination > .mask.left_side > ul >li > small').css({color: '#111111'});
$('#pvp_header > .domination > .mask.right_side > ul >li > small').css({color: '#111111'});

//改BH名字顏色
$('#pvp_header > #defenderHero > small').css({color: '#111111'});
$('#pvp_header > #defenderHero > a > small').css({color: '#111111'}); //for BM
$('#pvp_header > #attackerHero > small').css({color: '#111111'});
$('#pvp_header > #attackerHero > a > small').css({color: '#111111'}); //for BM

window.setTimeout(changeing,10);
};

//背景，要調成760*560。
$('#pvp').css('background-image','url(http://i.imgur.com/EwKGX.png)');

//後面的小數表示戰場總影響的透明度，0為完全消失，1為不透明。
$('#pvp_header > .domination').css("opacity","0.5");

// ==/UserScript==
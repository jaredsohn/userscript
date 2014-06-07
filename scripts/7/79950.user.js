// ==UserScript==
// @name           MosWar Hack
// @author         Rustam-kot1
// @version        2010-06-24    
// @description    Hacks moswar.ru
// @include        http://moswar.ru/*
// ==/UserScript==

(function () {

function setHP() {
	maxhp = new Number($('#maxhp').text());
	currenthp = maxhp;
	$("#currenthp").text(Math.round(currenthp));
	$('#playerHpBar').animate({width: Math.round(currenthp / maxhp * 100) + '%'}, 1500);
}

function updatePlayerBlockMoney(sum, op) {
    var money = $("#personal .tugriki-block").attr("title");
    money = money.split(':');
    money = parseInt($.trim(money[1]));
    switch (op) {
        case "+":money += sum;break;
        case "-":money += sum;break;
    }
    $("#personal .tugriki-block").attr("title", "Монет: " + money);
    $("#personal .tugriki-block").html('<b class="tugriki"></b><br>' + formatNumber(money, 0, "", ","));
}



})()

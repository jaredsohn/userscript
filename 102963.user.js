// ==UserScript==
// @name           Dark Monk Bot TestMode
// @namespace      Ryuzaki
// @description    All your dark monk healer/demon needs.
// @include        http://vten.ru*
// ==/UserScript==

var CD=Math.random()*(7000 - 4500)+4500;
	// Settings
 // Set Quests
var SetQuest=true; // Quest
	var SetReward=true; //Get quest reward?
	var SetQTitan=true; // Titans
	var SetQDozor=true; // Dozor
	var SetQEnchanter=true; // Enchanter's quests
	var SetQGuard=true;
	var SetQCaraN=true; //New Caravan
	
var SetRoll=true;
	var SetNinja=true; //Always roll need when possible
var SetStartDung=false; //Start the dungeon. Use with caution.
var SetGoDung=true; //Continue to the next step of the dungeon. Use with caution.

var SetRegainStr=false; // Восстановить силы?
var SetRepair=true; // Repair?
	var SetRepRed=false; //Repair only when red.
var SetDrink=true;
var drug='Зелье обороны';
var SetMail=true;
	var SetAuc=true;

var SetHeal=true; // Heal (at all)? The upper ones have priority.
	var SetHealMax=false; //Always heal. please select only Max or Needed.
	var SetHealNeeded=true; // Heal at 66%
	var SetHealSwap=true; // Hybrid. If anyone needs healing, heal, if not, attack.

var SetAttack=true;
	var SetKill=true; // Finish off
	var SetFlower=true;
	var SetDemon=true;
	var SetThunder=true;

var SetSmart=true; // Smart Hunt-an innovative system that will determine the killing order in many quests and dungeons.

 //Search
	var RegainStr=document.evaluate("//a[contains(.,'Восстановить силы')]", document, null, 9, null).singleNodeValue;
	var repair=document.evaluate("//a[contains(.,'Починиться')]", document, null, 9, null).singleNodeValue;
	var refresh=document.evaluate("//a[contains(.,'Обновить')]", document, null, 9, null).singleNodeValue;
	var tavern=document.evaluate("//a[contains(.,'Таверна')]", document, null, 9, null).singleNodeValue;
	var hide=document.evaluate("//a[contains(.,'Скрыть')]", document, null, 9, null).singleNodeValue;
	var city=document.evaluate("//a[contains(.,'Город')]", document, null, 9, null).singleNodeValue;
	if (SetMail) {
		var mail=document.evaluate("//a[contains(.,'Пришло письмо')]", document, null, 9, null).singleNodeValue;
		if (SetAuc) {
		var take=document.evaluate("//a[contains(.,'Забрать и удалить сообщение')]", document, null, 9, null).singleNodeValue;
		var open=document.evaluate("//a[contains(.,'Аукцион:')]", document, null, 9, null).singleNodeValue;
		}
	}
	if (SetGoDung) {var cont=document.evaluate("//a[contains(.,'Продолжить бой')]", document, null, 9, null).singleNodeValue;}
	if (SetRoll) {
		if (SetNinja) {var need=document.evaluate("//a[contains(.,'Надо')]", document, null, 9, null).singleNodeValue;}
		var greed=document.evaluate("//a[contains(.,'Хочу')]", document, null, 9, null).singleNodeValue;
	}
	if ((SetHeal)&&(!repair)) {var lotus=document.evaluate("//a[contains(.,'Листок Лотоса')]", document, null, 9, null).singleNodeValue;}
	if (SetAttack) { //If we're fighting...
		if ((SetThunder)&&(!repair)) {var thunder=document.evaluate("//a[contains(.,'Гром и Молния')]", document, null, 9, null).singleNodeValue;}
		if ((SetFlower)&&(!repair)) {var flower=document.evaluate("//a[contains(.,'Кровавый Цветок')]", document, null, 9, null).singleNodeValue;}
		if ((SetDemon)&&(!repair)) {var demon=document.evaluate("//a[contains(.,'Форма Демона')]", document, null, 9, null).singleNodeValue;}
		if ((!thunder)||(thunder.className=='minor')||(!flower)||(flower.className=='minor')||(!demon)||(demon.className=='minor')) {
			if (SetKill) {var FinOff=document.evaluate("//a[contains(.,'Добивать')]", document, null, 9, null).singleNodeValue;}
			var hit=document.evaluate("//a[contains(.,'Бить')]", document, null, 9, null).singleNodeValue;
		}
	}
	if (SetDrink) {var pot=document.evaluate("//a[contains(.,'"+drug+"')]", document, null, 9, null).singleNodeValue;}
	if (SetQuest) { // Quest Search
		if (SetReward) {var reward=document.evaluate("//a[contains(.,'Получить награду')]", document, null, 9, null).singleNodeValue;}
		var NextQ=document.evaluate("//a[contains(.,'Продолжить -')]", document, null, 9, null).singleNodeValue;
		if (SetQTitan) {var qTitan=document.evaluate("//a[contains(.,'Титаны:')]", document, null, 9, null).singleNodeValue;}
		if (SetQDozor) {var qDozor=document.evaluate("//a[contains(.,'Дозор:')]", document, null, 9, null).singleNodeValue;}
		if (SetQEnchanter) {var qEnchanter=document.evaluate("//a[contains(.,'Чародей:')]", document, null, 9, null).singleNodeValue;}
		if (SetQGuard) {var qGuard=document.evaluate("//a[contains(.,'Стража:')]", document, null, 9, null).singleNodeValue;}
		if (SetQCaraN) {var qCaraN=document.evaluate("//a[contains(.,'Новые Караваны:')]", document, null, 9, null).singleNodeValue;}
		var otherq=document.evaluate("//a[contains(.,'Другие задания')]", document, null, 9, null).singleNodeValue;
		var qDGA=document.evaluate("//a[contains(.,'Отправиться')]", document, null, 9, null).singleNodeValue; // Accept Dozor/Guard
		var qTitanA=document.evaluate("//a[contains(.,'Напасть на Титана')]", document, null, 9, null).singleNodeValue;
		var qCaraNA=document.evaluate("//a[contains(.,'Заплатить взнос')]", document, null, 9, null).singleNodeValue;
		var qEnchanterA=document.evaluate("//a[contains(.,'Пойти')]", document, null, 9, null).singleNodeValue;
	}
	
	if (SetSmart) { 	// Here we go... O.O
		var LocCara=document.evaluate("//span[contains(.,'Путь расчищен')]", document, null, 9, null).singleNodeValue; // Defending the caravan, perhaps?
		var MMage=document.evaluate("//a[contains(.,'Монастырский Маг')]", document, null, 9, null).singleNodeValue; //Monastery
		var MGvard=document.evaluate("//a[contains(.,'Гвардеец Монастыря')]", document, null, 9, null).singleNodeValue;
		var sucker=document.evaluate("//a[contains(.,'Кровопийца')]", document, null, 9, null).singleNodeValue; //Tower
		var bat=document.evaluate("//a[contains(.,'нетопырь')]", document, null, 9, null).singleNodeValue;
		var bbat=document.evaluate("//a[contains(.,'Нетопырь')]", document, null, 9, null).singleNodeValue;
		if ((bat)||(sucker)||(bbat)) {var LocTower=true;}
		if ((MMage)||(MGvard)) {var LocMon=true;}
		if (LocCara) {
			var CSniper=document.evaluate("//a[contains(.,'Серый Снайпер')]", document, null, 9, null).singleNodeValue;
			var CKiller=document.evaluate("//a[contains(.,'Серый Убийца')]", document, null, 9, null).singleNodeValue;
			var CArcher=document.evaluate("//a[contains(.,'Серый Лучник')]", document, null, 9, null).singleNodeValue;
			var CSmuggler=document.evaluate("//a[contains(.,'Серый Контрабандист')]", document, null, 9, null).singleNodeValue;
			var CDog=document.evaluate("//a[contains(.,'Откормленный Пес')]", document, null, 9, null).singleNodeValue;
		}
	}

// Execute
	if (need) {
			window.setTimeout(function(){
			location.href=need.href;}, 1000);
			return;
	}
	if (greed) {
			window.setTimeout(function(){
			location.href=greed.href;}, 1000);
			return;
	}
	if ((SetRegainStr)&&(RegainStr)) {
			window.setTimeout(function(){
			location.href=RegainStr.href;}, 1000);
			return;
		}
	if ((SetRepair)&&(repair)) { // Repair?
		if (SetRepRed) {
			var rurl=document.evaluate("//img[contains(@src,'/images/icons/armor_red.png')]", document, null, 9, null).singleNodeValue;
			if (rurl) {
				window.setTimeout(function() {
				location.href=repair.href; }, 1000); 
				return;
			}
		}
		else {
			var yurl=document.evaluate("//img[contains(@src,'/images/icons/armor_yellow.png')]", document, null, 9, null).singleNodeValue;
			if (yurl) {
				window.setTimeout(function() {
				location.href=repair.href; }, 1000); 
				return;
			}
		}
	}
	var chimg=document.evaluate("//img[contains(@src,'/images/icons/heart_33.png')]", document, null, 9, null).singleNodeValue;
	if ((pot)&&(chimg)) { //Time to drink!
		window.setTimeout(function(){
		location.href=pot.href;}, 250);
		return;
	}
	if ((demon)&&(demon.className!='minor')) { // Demon Form & Battle Amulets
		window.setTimeout(function(){
		location.href=demon.href;}, 3000);
		return;
	}
	if ((flower)&&(flower.className!='minor')) { // Bloody Flower
		window.setTimeout(function(){
		location.href=flower.href;}, CD);
		return;
	}
	if ((thunder)&&(thunder.className!='minor')) { // Blood and thunder!!
		window.setTimeout(function(){
		location.href=thunder.href;}, CD);
		return;
	}
	if (lotus) { //All Healing
		if (SetHealMax) {
			window.setTimeout(function(){
			location.href=lotus.href;}, CD);
			return;
		}
		if (SetHealNeeded) {
			var himg=document.evaluate("//img[contains(@src,'/images/icons/heart_66.png')]", document, null, 9, null).singleNodeValue;
			if ((himg)||(chimg)) {
				window.setTimeout(function() {
				location.href=lotus.href;}, CD);
				return;
			}
		}
		if (SetHealSwap) {
			var warn=document.evaluate("//span[contains(@class,'warn')]", document, null, 9, null).singleNodeValue;
			if (warn) {
				window.setTimeout(function() {
					location.href=lotus.href;}, CD);
					return;
			}
		}
	}
	if (SetSmart) {	// All critical stuff like pots & ammies done. Smart ass time!
		if (LocMon) {
			if (MMage) {
				window.setTimeout(function(){
				location.href=MMage.href;}, CD);
				return;
			}
			if (MGvard) {
				window.setTimeout(function(){
				location.href=MGvard.href;}, CD);
				return;
			}			
		}
		if (LocTower) {
			if (sucker) {
				window.setTimeout(function(){
				location.href=sucker.href;}, CD);
				return;
			}
			if (bat) {
				window.setTimeout(function(){
				location.href=bat.href;}, CD);
				return;
			}
			if (bbat) {
				window.setTimeout(function(){
				location.href=bbat.href;}, CD);
				return;
			}
		}
		if (LocCara) { // The noble caravan defenders...
			if (CSniper) {
				window.setTimeout(function(){
				location.href=CSniper.href;}, CD);
				return;
			}
			if (CKiller) {
				window.setTimeout(function(){
				location.href=CKiller.href;}, CD);
				return;
			}
			if (CArcher) {
				window.setTimeout(function(){
				location.href=CArcher.href;}, CD);
				return;
			}
			if (CSmuggler) {
				window.setTimeout(function(){
				location.href=CSmuggler.href;}, CD);
				return;
			}
			if (CDog) {
				window.setTimeout(function(){
				location.href=CDog.href;}, CD);
				return;
			}
		}
	}

	if (FinOff) { // Finish Him!
		window.setTimeout(function(){
		location.href=FinOff.href;}, CD);
		return;
	}
	if (hit) { // Smack him!
		window.setTimeout(function(){
		location.href=hit.href;}, CD);
		return;
	}
	//Quest Execution Begin
	if (reward) { //Get Rewards
		window.setTimeout(function(){
		location.href=reward.href;}, 1000);
		return;
	}
	if (NextQ) { // Next part of the chain
		window.setTimeout(function(){
		location.href=NextQ.href;}, 1000);
		return;
	}
	if (cont) { //Continue
		window.setTimeout(function(){
		location.href=cont.href;}, 1000);
		return;
	}
	if (qEnchanterA) { // Accept Enchanter quests
		window.setTimeout(function(){
		location.href=qEnchanterA.href;}, 1000);
		return;
	}
	if (qDGA) { // Accept Dozors
		window.setTimeout(function(){
		location.href=qDGA.href;}, 1000);
		return;
	}
	if (qTitanA) { // Accept Titans
		window.setTimeout(function(){
		location.href=qTitanA.href;}, 1000);
		return;
	}
	if (qCaraNA) { // Accept New Caravan Quest
		window.setTimeout(function(){
		location.href=qCaraNA.href;}, 1000);
		return;
	}
	
	if (qEnchanter) { // Other quests
		window.setTimeout(function(){
		location.href=qEnchanter.href;}, 1000);
		return;
	}
	if (qGuard) { // Other quests
		window.setTimeout(function(){
		location.href=qGuard.href;}, 1000);
		return;
	}
	if (qDozor) { // Open Dozor
		window.setTimeout(function(){
		location.href=qDozor.href;}, 1000);
		return;
	}
	if (qCaraN) { // Open Caravan (new)
		window.setTimeout(function(){
		location.href=qCaraN.href;}, 1000);
		return;
	}
	if (qTitan) { // Open Titans
		window.setTimeout(function(){
		location.href=qTitan.href;}, 1000);
		return;
	}
	if (otherq) { // Other quests
		window.setTimeout(function(){
		location.href=otherq.href;}, 1000);
		return;
	}
	if (mail) {
		window.setTimeout(function(){
		location.href=mail.href;}, 1000);
		return;
	}
	if (open) {
		window.setTimeout(function(){
		location.href=open.href;}, 1000);
		return;
	}
	if (take) {
		window.setTimeout(function(){
		location.href=take.href;}, 1000);
		return;
	}
	if (hide) { // Other quests
		window.setTimeout(function(){
		location.href=hide.href;}, 1000);
		return;
	}
	if (refresh) { // Other quests
		window.setTimeout(function(){
		location.href=refresh.href;}, 5000);
		return;
	}
	if (tavern) { // Other quests
		window.setTimeout(function(){
		location.href=tavern.href;}, 1000);
		return;
	}
	if (city) { // Other quests
		window.setTimeout(function(){
		location.href=city.href;}, 1000);
		return;
	}
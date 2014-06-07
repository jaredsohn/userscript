// ==UserScript==
// @name          rocks my cocks
// @namespace     unknown black blah
// @description   Keyboard binding script for playing with your e-peen
// 			- Basic movements : 1,2,3,4,5, etc is mapped to places (TS, CP, GCS, BP, WFC, Alex, E3rd, Sunan AP, WH, Alley, UGP) can be used only while in home
// 			- Basic movements : q,w,e,r,t, etc is mapped to places (TS, CP, GCS, BP, WFC, Alex, E3rd, Sunan AP, WH, Alley, UGP) can be used anywhere in mha but it refreshes page 
//			- Attacks	  : j,k,l,m   four attacks mapped to your preference
// @include       http://apps.facebook.com/*
// @include       http://apps.new.facebook.com/*
//
// ==/UserScript==
//

function SM_FLAME(profileID)   { unsafeWindow.a6568019289_useAbilityAction("SM_FLAME"   ,1000,profileID,false);}
function FIREBALL(profileID)  { unsafeWindow.a6568019289_useAbilityAction("FIREBALL"   ,1000,profileID,false);}
function EXPLO(profileID)  { unsafeWindow.a6568019289_useAbilityAction("EXPLO"   ,1000,profileID,false);}
function BRI_LGHT(profileID)  { unsafeWindow.a6568019289_useAbilityAction("BRI_LGHT"   ,1000,profileID,false);}
function TIMEWARP(profileID)  { unsafeWindow.a6568019289_useAbilityAction("TIMEWARP"   ,1000,profileID,false);}
function RESTOSTR(profileID)  { unsafeWindow.a6568019289_useAbilityAction("RESTOSTR"   ,1000,profileID,false);}
function PUNCH(profileID) { unsafeWindow.a6568019289_useAbilityAction("PUNCH"     ,1000,profileID,false);}
function PREDICTD(profileID){ unsafeWindow.a6568019289_useAbilityAction("PREDICTD"   ,1000,profileID,false);}
function MUTATE(profileID) { unsafeWindow.a6568019289_useAbilityAction("MUTATE"  ,500,profileID,false);}
function SPY(profileID)   { unsafeWindow.a6568019289_useAbilityAction("SPY"  ,1000,profileID,false);}
function SUPERSON(profileID)  { unsafeWindow.a6568019289_useAbilityAction("SUPERSON"  ,1000,profileID,false);}
function RUSH(profileID) { unsafeWindow.a6568019289_useAbilityAction("RUSH"     ,500,profileID,false);}
function HEARVOIC(profileID)  { unsafeWindow.a6568019289_useAbilityAction("HEARVOIC"  ,1000,profileID,false);}
function DISRTIME(profileID){ unsafeWindow.a6568019289_useAbilityAction("DISRTIME"   ,1000,profileID,false);}
function RTELE(profileID) { unsafeWindow.a6568019289_useAbilityAction("RTELE"     ,1000,profileID,false);}
function TURNINV(profileID) { unsafeWindow.a6568019289_useAbilityAction("TURNINV"     ,1000,profileID,false);}


function isAttackWindow(){
	current = location.href;
	idx = current.indexOf("targetUserId");
	if(idx >= 0) return current.substring(current.indexOf("=")+1);
	return null;	
}

function updateAndOpenBox(){
	unsafeWindow.a6568019289_updateStats(); 
	unsafeWindow.a6568019289_openFightBox(); 
}
function handleKeyboard(e){
	//distinguish between IE's explicit event object (window.event) and Firefox's implicit.
	var evtobj=window.event? event : e 
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
	var actualkey=String.fromCharCode(unicode)

	if(evtobj.altKey) return;

	if(actualkey == '1'){ unsafeWindow.a6568019289_goTo (6, 29313, true );return;}
	if(actualkey == '2'){ unsafeWindow.a6568019289_goTo(12, 29313, true );return;}
	if(actualkey == '3'){ unsafeWindow.a6568019289_goTo (2, 29313, true );return;}
	if(actualkey == '4'){ unsafeWindow.a6568019289_goTo(13, 29313, true );return;}
	if(actualkey == '5'){ unsafeWindow.a6568019289_goTo(20, 29313, true );return;}
	if(actualkey == '6'){ unsafeWindow.a6568019289_goTo(36, 29313, true );return;}
	if(actualkey == '8'){ unsafeWindow.a6568019289_goTo(11, 29313, true );return;}
	if(actualkey == '9'){ unsafeWindow.a6568019289_goTo(5, 29313, true );return;}
	if(actualkey == '7'){ unsafeWindow.a6568019289_goTo(40, 29313, true );return;}
	if(actualkey == '0'){ unsafeWindow.a6568019289_goTo(15, 29313, true );return;}
	if(actualkey == '-'){ unsafeWindow.a6568019289_goTo(18, 29313, true );return;}

	if(actualkey == 'q'){ unsafeWindow.a6568019289_goTo (6, 29313, false);return;}
	if(actualkey == 'w'){ unsafeWindow.a6568019289_goTo(12, 29313, false);return;}
	if(actualkey == 'e'){ unsafeWindow.a6568019289_goTo(2, 29313, false);return;}
	if(actualkey == 'r'){ unsafeWindow.a6568019289_goTo(13, 29313, false);return;}
	if(actualkey == 't'){ unsafeWindow.a6568019289_goTo(20, 29313, false);return;}
	if(actualkey == 'y'){ unsafeWindow.a6568019289_goTo(36, 29313, false);return;}
	if(actualkey == 'i'){ unsafeWindow.a6568019289_goTo(11, 29313, false);return;}
	if(actualkey == 'o'){ unsafeWindow.a6568019289_goTo(5, 29313, false);return;}
	if(actualkey == 'u'){ unsafeWindow.a6568019289_goTo(40, 29313, false);return;}
	if(actualkey == 'p'){ unsafeWindow.a6568019289_goTo(15, 29313, false);return;}
	if(actualkey == ']'){ unsafeWindow.a6568019289_goTo(70, 29313, false);return;}
	if(actualkey =='['){unsafeWindow.a6568019289_useItem(5852771);unsafeWindow.a6568019289_useItem(5865537);unsafeWindow.a6568019289_useItem(5894499);unsafeWindow.a6568019289_useItem(3643778);unsafeWindow.a6568019289_useItem(6037938);unsafeWindow.a6568019289_useItem(6075814);unsafeWindow.a6568019289_useItem(6085670);unsafeWindow.a6568019289_useItem(7603299);unsafeWindow.a6568019289_useItem(7839488);unsafeWindow.a6568019289_useItem(8227165);unsafeWindow.a6568019289_useItem(8342677);unsafeWindow.a6568019289_useItem(9104488);unsafeWindow.a6568019289_useItem(9104489);unsafeWindow.a6568019289_useItem(9104490);unsafeWindow.a6568019289_useItem(9104491);unsafeWindow.a6568019289_useItem(9104492);unsafeWindow.a6568019289_useItem(9104493);unsafeWindow.a6568019289_useItem(9104495);unsafeWindow.a6568019289_useItem(9107744);unsafeWindow.a6568019289_useItem(5843182);return false} 

	if(actualkey == 'h'){ updateAndOpenBox(); return ; }

	targetID = isAttackWindow();

	if(targetID) {
		if(actualkey == 'z') { PUNCH(targetID); return;}
		if(actualkey == 'x') { SM_FLAME(targetID); return;}
		if(actualkey == 'v') { EXPLO(targetID); return;}
		if(actualkey == 'c') { FIREBALL(targetID); return;}
		if(actualkey == 'b') { SUPERSON(targetID); return;}
		if(actualkey == 'n') { TIMEWARP(targetID); return;}
		if(actualkey == 'm') { BRI_LGHT(targetID); return;}
		if(actualkey == ',') { RTELE(targetID); return;}
		if(actualkey == 'a') { TURNINV(targetID); return;}
		if(actualkey == '.') { SPY(targetID); return;}
		if(actualkey == 's') { PREDICTD(targetID); return;}
		if(actualkey == 'f') { MUTATE(targetID); return;}
		if(actualkey == 'd') { DISRTIME(targetID); return;}
}
}


unsafeWindow.document.onkeypress=handleKeyboard;




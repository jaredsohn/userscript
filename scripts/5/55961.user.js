//Wat u want?
//you want to level moar?
//ok
//
//EXTENSIVELY SCRUTINIZING BACKGROUND INFO:
//well this is gonna be my first GS script
//i have done other programs before, but im still a nub
//that is all
//
//if you need help installing this then... yeah
//
//SCRIPT DESCRIPTION:
//automatically battles one pet of your choice
//
//
//
// ==UserScript==
// @name Lazy Person's Epic Fighter
// @namespace
// @description see script
// @include http://www.epicpetwars.com/battle
// @include http://www.epicpetwars.com/battle/index
// @include http://www.epicpetwars.com/battle/battle*
// @include http://www.epicpetwars.com/battle/startBattle*
// ==/UserScript==

function attack(){
location.href="javascript:void(sendBattleAction('attack'))";
}
function goBack(){
window.location.href="http://epicpetwars.com/battle/startBattle?animal_id=xxxxxx";
}

if(window.location.href=="http://www.epicpetwars.com/battle" ||
window.location.href=="http://www.epicpetwars.com/battle/index"){
goBack();
}
setInterval(goBack, 3000);
setInterval(attack, 3000);
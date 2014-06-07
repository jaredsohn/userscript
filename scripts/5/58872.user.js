// ==UserScript==
// @name          test only heal
// @namespace     dfgjdfgdfg
// @description   test only
// @author        rtyrtrt
// @version       jghjghjjgh
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
//
// ==/UserScript==





function healit() {
var lastHealth = 0;
var currentHealth = document.getElementById('app10979261223_user_health');
    if (currentHealth.innerHTML){
        currentHealth = Number(currentHealth.innerHTML);{
//        if (currentHealth <= 30 && lastHealth != currentHealth){ //avoid multi firing of this event
//            lastHealth = currentHealth;
//	document.location = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=hospital&xw_action=heal';            
		alert(currentHealth);}
    }
}


function testForNinjaAttack() {
//    if (window.find('You already voted for that poll', false, false)) {
        setTimeout(function() { document.location.reload(); } , 7000);
//    }
}




window.setTimeout(healit, 5000);
window.setTimeout(testForNinjaAttack, 3000);


// ==UserScript==
// @name           Hamster Helper
// @namespace      http://www.kingdomofloathing.com
// @description    Removes obviously incorrect options from choice adventures.
// @include        *127.0.0.1:*/adventure.php*
// @include        *127.0.0.1:*/choice.php*
// @include        *kingdomofloathing.com/adventure.php*
// @include        *kingdomofloathing.com/choice.php*
// ==/UserScript==

var forms = document.getElementsByTagName("form");

restrict_choice = function(whichchoice, option) {
    var targetform = forms[option-1];
    if(targetform != undefined) {
	if(targetform.elements[1].value == whichchoice) {
	    targetform.elements[0].value='ceci n\'est pas un pwd';
	    targetform.elements[1].value=1729;
	    targetform.elements[2].value=1729;
	    targetform.elements[3].disabled=true;
	}
    }
}
    
if(typeof(forms[0]) != "undefined") {
    // somewhat higher and mostly dry (the valve adventure)
    restrict_choice(197, 3); // turn the valve (= waste a turn)
    
    // the former or the ladder (the release-a-clanmate adventure)
    restrict_choice(199, 3); // go down the ladder (= waste a turn)

    // trapped in a cage
    restrict_choice(211, 1); // waste 10 turns
    restrict_choice(211, 2); // waste 1 turn

    // trapped in a cage having already wasted a turn
    restrict_choice(212, 1); // waste another 10 turns
    restrict_choice(212, 2); // waste another turn

    // outside of the tent
    restrict_choice(225, 3); // step down from a tent, you might occasionally need to do this but you can turn off GM for that

    // performing on stage
    restrict_choice(226, 2); // leave the stage, you can do everything you could ever want by pressing the top option

    // in the front of the tent
    restrict_choice(227, 3); // ruin the show, this will irrecoverably ruin an otherwise perfect run
    restrict_choice(227, 4); // abandon the show, can't see why you'd need to do this

    // marketplace entrance
    restrict_choice(272, 1); // go into the marketplace
}

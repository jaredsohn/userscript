// ==UserScript==
// @name           Don't Do A Deandra
// @namespace      http://caigawalker.plus.com/
// @description    You wouldn't want to wear the Mega Gem for the rest of the quest, would you?
// @include        *127.0.0.1:*/fight.php*
// @include        *.kingdomofloathing.com/fight.php*
// ==/UserScript==
(function() {
    if(document.getElementById('monname').innerHTML.indexOf('Dr. Awkward') != -1) {
	if(document.body.innerHTML.match(/<!--WINWINWIN-->/)) {
	    var elements = document.getElementsByTagName("p");
	    for(var i = 0; i < elements.length; i++) {
		if(elements[i].innerHTML.match(/^<a href=\"adventure/)) {
		    elements[i].innerHTML = "<font color=red size=6><b>TAKE THE FUCKING MEGA GEM AND TALISMAN OFF BEFORE DOING THE REST OF THE QUEST YOU FUCKING MORON</b></font><br><br>" + elements[i].innerHTML;
		    break;
		}
	    }
	}
    }
}) ();
// ==UserScript==
// @name Orc House Blueprint Anti-Misclicker
// @namespace http://userscripts.org/users/88371
// @description Stop "Adventuring Again" in the Orc House during the pirate quest.
// @include http://127.0.0.1:*/choice.php*
// @include http://*.kingdomofloathing.com/choice.php*
// ==/UserScript==


//Completely based off of JiK4eva's "Don't Do A Deandra" script

if(document.body.innerHTML.match(/You acquire an item: <b>Cap'm Caronch's dentures/)) {
    var elements = document.getElementsByTagName("p");
	    for(var i = 0; i < elements.length; i++) {
		if(elements[i].innerHTML.match(/^<a href=\"adventure/)) {
		    elements[i].innerHTML = "<font color=red size=4><b>DON'T ADVENTURE AGAIN IN THE ORC HOUSE!

</b></font><br><br>" + elements[i].innerHTML;
		    break;
		}
	    }
	}

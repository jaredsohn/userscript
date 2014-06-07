// ==UserScript==
// @name           4chan AntiSpam
// @namespace      eee
// @description    Removes ALL current spam from the board
// @include        *4chan.org*
// ==/UserScript==
var tables = document.getElementsByTagName("table");

for ( var i = 0; i < tables.length; i++)
{
    var tCell = tables[i].rows[0].cells;
    
    for ( var j = 0; j < tCell.length; j++)
    {
        if((tCell[j].innerHTML.indexOf("Runescape private server made") > 0) || 
        	 (tCell[j].innerHTML.indexOf("paris2luv") > 0) ||
        	 (tCell[j].innerHTML.indexOf('/b/scape is back!') > 0) ||
        	 (tCell[j].innerHTML.indexOf('GAY NIGGER ASSOCIATION OF AMERICA') > 0) ||
        	 (tCell[j].innerHTML.indexOf('Players online:') > 0) ||
        	 (tCell[j].innerHTML.indexOf("what's playing over at LOLWUT TV") > 0) ||
  	         (tCell[j].innerHTML.indexOf("itspriv server") > 0) ||
  	         (tCell[j].innerHTML.indexOf("Untold hundreds of 4chan bans") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Want a place to blog freely") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Love.the surgeon") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.cam32 () us () tc/webcam.html?user=028734") > 0) ||
                 (tCell[j].innerHTML.indexOf("This is Fail Ninja again") > 0) ||
                 (tCell[j].innerHTML.indexOf("czorek89@interia.pl") > 0) ||
                 (tCell[j].innerHTML.indexOf("4changold.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("Ladbrokes Casino") > 0) ||
                 (tCell[j].innerHTML.indexOf("Join 'LO' Clan chat for epic lulz!") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33416/latina-masturbates-to-an-exhausting-orgasm") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33459/interracial-couple-and-their-first-homemade-anal-flick") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://triforce.22web.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("xlisa-hunnyx@live.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("parkerboiiuk@googlemail.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") > 0) ||
                 (tCell[j].innerHTML.indexOf("www {dot} chan-exposed {dot} ph {dot} tc") > 0) ||
                 (tCell[j].innerHTML.indexOf("tinychat()com / lolpranx") > 0) ||
                 (tCell[j].innerHTML.indexOf("1. go to its(o)over9000.net (take out parentheses and o inside)") > 0) ||
   	         (tCell[j].innerHTML.indexOf("spread the word we all need to see it") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Clan chat for epic lulz") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Declaring WAR against /b/") > 0)
        	 )
        {
            var spamFaggery = tCell[j].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);
        }
    
    }
}
// ==UserScript==
// @name           xxx get
// @namespace      Filth
// @description    Shows last 3 digits of posts on 4chan.
// @include        http://*.4chan.*/*
// ==/UserScript==

var elements = document.getElementsByTagName("*");

for (var i = 0; i < elements.length; i++) {
	var type = 0;
	if (elements[i].id.substr(0, 5) == 'norep') {
		type = 5;
	} else if (elements[i].id.substr(0, 8) == 'nothread') {
		type = 8;
	}
	if (type != 0) {
		var post = elements[i].id.substring(type);
		elements[i].innerHTML = elements[i].innerHTML.replace(post.substring(0, post.length - 3) + "XXX", post);
	}
}
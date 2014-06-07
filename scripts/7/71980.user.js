// ==UserScript==
// @name           4chan AntiSpam
// @namespace      Anonymous
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
                 (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://triforce.22web.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("xlisa-hunnyx@live.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("parkerboiiuk@googlemail.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") > 0) ||
                 (tCell[j].innerHTML.indexOf("www {dot} chan-exposed {dot} ph {dot} tc") > 0) ||
                 (tCell[j].innerHTML.indexOf("tinychat()com / lolpranx") > 0) ||
                 (tCell[j].innerHTML.indexOf("1. go to its(o)over9000.net (take out parentheses and o inside)") > 0) ||
   	         (tCell[j].innerHTML.indexOf("spread the word we all need to see it") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Clan chat for epic lulz") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") > 0) ||
                 (tCell[j].innerHTML.indexOf("I AM NOT PUZZLE CHAN!") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Declaring WAR against /b/") > 0) ||
                 (tCell[j].innerHTML.indexOf("Do you love runescape as much as you love cats?") > 0)

        	 )
        {
            var spamFaggery = tCell[j].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);
        }
    
    }
}
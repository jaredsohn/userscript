// ==UserScript==
// @name           Neopets : DailiesGrabber
// @namespace      http://userscripts.org/scripts/show/31672
// @description    Automatizes Grabbing of oneclick Dailies, if your german, remove the /* and */ around the german 'values'-section and comment in the english ones.
// @include        http://www.neopets.com/*
// Version History
// Revision 1 - Initial release
// Revision 2 - minor fix in english values
// Revision 3 - fixed mayor bug, it was pure luck this script actually worked correctly!
//              Thanks neopets staff that you named all buttons different. 
//              Issue should be fixed now
// Revision 4 - somewhat setTimeout is not working anymore, need to use window.setTimeout now ...
// Revision 5 - added pyramids starter to collection. works due to this scripts style (will send hidden value so you wont get 'redirection error'.
// Revision 6 - Bugfix Tomb (added '.' ) , bugfix array
// ==/UserScript==


// Constants
sec = 1000;

// changeable Vars
var minTime = 3;
var maxTime = 5;

// script scope
(function(){ 
    var script = {
        interval:[minTime * sec,maxTime * sec],
/*
        values:[    // german
                'Dreh, Dreh, Dreh das Rad der Spannung!',
                'Nimm dir deinen Preis',
                'Meine Pets heilen',
                'Ja, ich möchte bitte eine',
                'Nimm dir etwas Omelette',
                'Näher dich dem Schrein',
                'Tombola spielen!',
                'Dreh, dreh, dreh das Rad der Mittelmäßigkeit!', 
                'Nimm deinen Preis' , 
                'Zieh an der Leine',
                'Öffne die Steintür zum Verlassenen Grabmal...',
                'Gehe weiter und riskiere, nie wieder den Weg nach draußen zu finden. Jetzt gibt es kein Zurück mehr.',
                'Dreh das Rad!!!',
                'Nimm etwas Pudding',
                

                 //priv8 Addons
                'Spiel Nochmal',
                'Pyramiden spielen!'  
                ], 
*/
        values:[   //english
                'Spin Spin Spin the Wheel of Excitement!',
                'Collect your Prize',
                'Heal my Pets',
                'Yes, I will have one please',
                'Grab some Omelette',
                'Approach the Shrine',
                'Play Tombola!',
                'Spin Spin Spin the Wheel of Mediocrity!',
                'Collect Your Prize',
                'Reel In Your Line',
                'Open the stone door to the Deserted Tomb...',
                'Continue on, at the risk of never returning.  There\'s no turning back.',
                'Spin the Wheel!!!',
                'Grab some Jelly',
                'Play Again',
                'Play Pyramids!',
                'Continue Playing'
                ], // english
                
        pages:[
                'wheel2.phtml', 
                'wheel3.phtml', 
                'springs.phtml', 
                'process_kiosk.phtml', 
                'omelette.phtml', 
                'shrine.phtml', 
                'tombola2.phtml', 
                'mediocrity2.phtml', 
                'mediocrity3.phtml', 
                '/water/fishing.phtml',
                '/worlds/geraptiku/tomb.phtml',
                '/worlds/geraptiku/process_tomb.phtml', 
                'fruitmachine2.phtml',
                'jelly.phtml',
                'potatocounter.phtml',
                'pyramids.phtml',
                'pyramids.phtml'
                ]
    };
    var i = 0;
    while(i < script.values.length)
    {
        
        var sform = document.evaluate('//form[contains(@action,"' + script.pages[i] + '")]/input[@value="'+script.values[i] +'"]',
                                    document,
                                    null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                    null).snapshotItem(0);
       
        if(!!sform)
        {  
            sform = sform.form;
            window.setTimeout(function(){sform.submit();},randomValue(script.interval));
            break;
        }
        i++;
    }
    
})();

// Includes

function randomValue(r)

{

	return r[0]+Math.round((r[1]-r[0])*Math.random());

}



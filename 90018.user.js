// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars Enhancer v2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars Farmer
// @version        0a
// @namespace      TW
// @description    Lets farm, read a file
// @include        http://pl47.plemiona.pl/game.php?village=34976&screen=place
// ==/UserScript==

function Reset() {
  GM_setValue("index33372",0);
  GM_setValue("index31444",0);
  GM_setValue("index32285",0);
  GM_setValue("index30945",0);
}

GM_registerMenuCommand( "Reset TW farming", Reset, "r", "shift", "r" );

var xCoords = new Array();;
var yCoords = new Array();;
var names = new Array();;
xCoords[16446] = [385];
yCoords[16446] = [354];
names[16446] = "Tweek Tweek!";

xCoords[31444] = [384,380];
yCoords[31444] = [359,359];
names[31444] = "Boys Noize";

xCoords[32285] = [383,379,384,380,385,381]
yCoords[32285] = [351,359,355,351,356,351]
names[32285] = "Lady Waks";

xCoords[30945] = []
yCoords[30945] = []
names[30945] = "Justice";

function getGameDoc()
{
    getdoc = window.document;
    if(! getdoc.URL.match('game\.php'))
    {
      for(var i=0; i<window.frames.length; i++)
      {if(window.frames[i].document.URL.match('game\.php'))

        {getdoc = window.frames[i].document;
        }
      }
    }
    return getdoc;
};


function insertNumber(input, count) {
    if(input.value == '')
        input.value=count;
    else
        input.value='';
}


doc = getGameDoc();

var village_number = doc.URL.substring(42,47);

// group villages
if (village_number==3) village_number=4; 

//GM_log("village: " + village_number  + " " + new Date());
//alert(names[village_number]);

function selectTarget(x, y) {
    doc.getElementsByName('x')[0].value = x;
    doc.getElementsByName('y')[0].value = y;
}

/* set default lc number and set focus op x coordinate */
insertNumber(doc.getElementsByName('light')[0],5);
doc.getElementsByName('x')[0].focus();


/* loop over array and set village coords */
var index = GM_getValue("index"+village_number, 0);

if (index<xCoords[village_number].length ) {
selectTarget(xCoords[village_number][index], yCoords[village_number][index]);

GM_setValue("index"+village_number,index+1);

doc.getElementsByName('attack')[0].focus();

window.setTimeout(function() { 
    getdoc = window.document;
    if(! getdoc.URL.match('game\.php'))
    {
      for(var i=0; i<window.frames.length; i++)
      {if(window.frames[i].document.URL.match('game\.php'))

        {getdoc = window.frames[i].document;
        }
      }
    }

    getdoc.getElementsByName('attack')[0].click(); }, 
3000+Math.random()*3000);


}
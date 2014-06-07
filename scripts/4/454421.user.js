// ==UserScript==
// @name       CellBlock AP
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.neopets.com/games/cellblock/cellblock_main.phtml
// @copyright  2012+, You
// ==/UserScript==

//GM_setValue("moveSet",0);

var moveSet = GM_getValue("moveSet");

var gameForm = document.getElementsByTagName("tbody");
var inputButton = document.getElementsByName("makemove");

var playScreen = gameForm[10];
var rowToPlay = playScreen.childNodes[6];
var fieldToPlay = rowToPlay.childNodes[4];

function KeyCheck(e)
{
    pathIndex = GM_setValue("moveSet",0);
	alert("Program Resetted");
}

window.addEventListener('keydown', KeyCheck, true);

  	var playAgain = document.getElementsByTagName("input");
    for (var j = 0; j < playAgain.length; ++j)
    {
        if(playAgain[j].value == "Play Again")
        {
            moveSet = -1;
            var timeout = setTimeout(function(){ window.location.href = "http://www.neopets.com/games/cellblock/cellblock_main.phtml"; }, 3000);
         break;
        }   
    }

switch(moveSet){
    case 0:
        rowToPlay = playScreen.childNodes[6];
        fieldToPlay = rowToPlay.childNodes[12];
        break;
    case 1:
        rowToPlay = playScreen.childNodes[7];
        fieldToPlay = rowToPlay.childNodes[10];
        break;
    case 2:
        rowToPlay = playScreen.childNodes[6];
        fieldToPlay = rowToPlay.childNodes[8];
        break;
    case 3:
        rowToPlay = playScreen.childNodes[5];
        fieldToPlay = rowToPlay.childNodes[6];
        break;
    case 4:
        rowToPlay = playScreen.childNodes[6];
        fieldToPlay = rowToPlay.childNodes[4];
        break;
    case 5:
        rowToPlay = playScreen.childNodes[7];
        fieldToPlay = rowToPlay.childNodes[2];
        break;
    case 6:
        rowToPlay = playScreen.childNodes[3];
        fieldToPlay = rowToPlay.childNodes[10];
        break;
}
moveSet = parseInt(moveSet);
++moveSet;
var timeout = setTimeout(function(){ GM_setValue("moveSet",moveSet);}, 1000);

if(fieldToPlay != null && fieldToPlay != undefined && moveSet != 0){
    var timeout = setTimeout(function(){ fieldToPlay.click(); }, 1000);

}
setTimeout(2850);
if(inputButton[0] != null && inputButton[0] != undefined) {
    var timeout = setTimeout(function(){inputButton[0].click();}, 1000);
}

// ==UserScript==
// @name         vBulletin - Custom Ignore List
// @description  Custom Ignore List for vBulletin
// @include      */showthread.php*
// ==/UserScript==

//Based off "vBulletin - Full ignore" by Arne Dieckmann (aka "Mithrandir")
//http://userscripts.org/scripts/show/24465

//Last hacked by Frosty

(function (){
var blockedUsers = new Array();

blockedUsers[0] = "JolietJake";
blockedUsers[1] = "LinkinPrime";
blockedUsers[2] = "wubb";
blockedUsers[3] = "DarthPuma";
blockedUsers[4] = "DarlingNina";
blockedUsers[5] = "fatherofcaitlyn";
blockedUsers[6] = "cmart05";
blockedUsers[7] = "sp00ge";
blockedUsers[8] = "Admiral Ackbar";
blockedUsers[9] = "JoIietJake";

var allElements, thisElement, quotedElements;
var blockedUser = "";
var removeQuotations = 1;

allElements = document.getElementsByTagName('tr');
allTable  = document.getElementsByTagName('table');


for (var i = 0; i < allElements.length; i++){
    thisElement = allElements[i];
    for (var j = 0; j < blockedUsers.length ; j++){
        blockedUser = blockedUsers[j] + "</a>";
        blockedMod = blockedUsers[j] + "</b></span></a>";
        if(thisElement.innerHTML.indexOf(blockedUser)!=-1){
            thisElement.parentNode.style.display = 'none';
        }
        if(thisElement.innerHTML.indexOf(blockedMod)!=-1){
            thisElement.parentNode.style.display = 'none';
        }
//        if (removeQuotations)
//        {
//            userQuote = "Originally Posted by <strong>" + blockedUsers[j];
//            if(thisElement.innerHTML.indexOf(userQuote)!=-1){
//                thisElement.parentNode.style.display = 'none';
//            }
//        }
    }
}

if (removeQuotations)
{
    for (var i = 0; i < allTable.length; i++){
        for (var x in blockedUser)
        {
            if( allTable[i].innerHTML.match("Originally Posted by <strong>"+blockedUsers[x]+"</strong>") )
            {
                //**** Uncomment this line to Totally Ignore posts which include quoted text from people on your Ignore List ****
                //allTable[i].style.display="none";

                if(!allTable[i].innerHTML.match(/table/) )
                {
                    var MonkeyListed = document.createElement("div");
                    MonkeyListed.innerHTML = '<div class="smallfont" style="margin-bottom:2px; font-style:italic">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; MonkeyListed.</div>';
                    allTable[i].parentNode.insertBefore(MonkeyListed, allTable[i]);
                    allTable[i].style.display="none";
                }
            }
        }
    }
}

}());
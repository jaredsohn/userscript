// ==UserScript==
// @name         TheRPF - Custom Ignore List
// @namespace    cocomonk22
// @description  Block posts by certain members.
// @include      http://www.therpf.com/showthread.php*
// ==/UserScript==

//Based off "vBulletin - Custom Ignore List" by st0neface
//http://userscripts.org/scripts/show/46772

(function (){
var blockedUsers = [
/*Put posters to block here in the format "poster name",
For example:
"Anonymous",
PUT POSTER NAMES TO BLOCK ON NEXT LINE*/


];

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
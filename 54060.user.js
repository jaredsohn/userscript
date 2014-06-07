//*******************************
// ==UserScript==
// @name         vBulletin - Lista ignorati (ITALIANO)
// @description  Ignore List for vBulletin -Italian version-
// @include      http://www.baronerosso.net/*
// ==/UserScript==

//Based off "vBulletin - Full ignore" by Arne Dieckmann (aka "Mithrandir")
//http://userscripts.org/scripts/show/24465

//Last hacked by Lillo

(function (){
var blockedUsers = new Array();

var k = 0;

      blockedUsers[k] = "rompiglione";
k++ ; blockedUsers[k] = "spammone";
k++ ; blockedUsers[k] = "trombetta";
k++ ; blockedUsers[k] = "continua_tu";

var allElements, thisElement, quotedElements;
var blockedUser = "";
var removeQuotations = 1;

allElements = document.getElementsByTagName('tr');
allTable  = document.getElementsByTagName('table');


for (var i = 0; i < allElements.length; i++){
    thisElement = allElements[i];
    for (var j = 0; j < blockedUsers.length ; j++){
        blockedUser = blockedUsers[j] + "</a>";
        blockedMod = blockedUsers[j] + "</b></a>";
        if(thisElement.innerHTML.indexOf(blockedUser)!=-1){            
	    //
	    if(thisElement.innerHTML.indexOf("bigusername")!=-1){
		thisElement.parentNode.style.display = 'none';
	    }
	    //

        }
        if(thisElement.innerHTML.indexOf(blockedMod)!=-1){
            //
	    if(thisElement.innerHTML.indexOf("bigusername")!=-1){
		thisElement.parentNode.style.display = 'none';
	    }
	    //
        }
    }
}

if (removeQuotations)
{
    for (var i = 0; i < allTable.length; i++){
        for (var x in blockedUser)
        {
            if( allTable[i].innerHTML.match("Originalmente inviato da <strong>"+blockedUsers[x]+"</strong>") )
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
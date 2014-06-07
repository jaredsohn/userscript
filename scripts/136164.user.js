// ==UserScript==
// @name        Light Rising AutoQuarry
// @namespace   http://userscripts.org/users/125692
// @description Adds a Quarry 10X button.
// @include     *lightrising.com*game.cgi
// @version     1.1
// ==/UserScript==
//derived from the Shartak autosearch script by Simon of www.shartak.com
//1.1 changes
//fixed only show if have necessary ap bug
//added greying of buttons if lack a laser cutter
//made script stop if no laser cutter message.
//still to do. make script stop (and button not show) if no laser cutters in inventory 


(function() {
//constants
var numberofsearches=10;//number of times to quarry for
var SRpc=0;//picked clean
var SRvlr=1;//very limited resources
var SRlr=2;//limited resources
var SRmr=3;//moderate resources
var SRar=4;//abundant resources


//variables
var resourcelvl=-1;//current pages resource lvl (assuming we have search results)
var searchresult;//currentpages search result (assuming we have search results)
var arewesearching;//boolean are we?


//functions
function outputsearchresults(texttoadd){   
    var gib=document.getElementsByClassName("gamebox infobox")[0];
    var searchtextelement=gib.getElementsByTagName('b')[0];
    var divwewant=gib.firstElementChild;
    var rawtext=GM_getValue('GMallsearchresults','');
    GM_setValue('GMallsearchresults','');
    var arraytext=rawtext.split('\n');
    arraytext[0]=texttoadd;//this can be over written as its not a search result
    var textline= document.createElement("p")//where we will place the results
    for (i=0;i<arraytext.length;i++){//populating results
        textline.innerHTML=textline.innerHTML+arraytext[i]+'<br>';
    }
    divwewant.insertBefore(textline,searchtextelement.nextSibling );
}

function cleanupforexit(){
    GM_setValue('GMarewequarrying',false);//not searching
    GM_setValue('GMallsearchresults','');//clear old results
    GM_setValue('GMnumofsearchesleft',0);
    return 1
}

//SCRIPT START
    //grab all quarry buttons and only run rest of script we have one.
var allquarrybuttons=document.evaluate("//input[contains(@value,'Quarry')]",document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
if(allquarrybuttons.snapshotLength>0)//if more than 0 we take the first one and run with it!
    {//we found a quarry button!
    //setupthebutton
    //grab ap as we make the button invisible if not enough ap to do whole search
    var gsb=document.getElementsByClassName("gamebox statsbox")[0];
    var searchtextelement=gsb.getElementsByTagName('b');
    var a=searchtextelement[1];//second bold thing is ap.
    var test=a.innerHTML.match(/(\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
    var availableap=test[1];
    //make new autoquarry button by cloning search button 
    //"//input[contains(@value,'Quarry')"
    var quarrybutton=allquarrybuttons.snapshotItem(0);
    quarry10buttonform=quarrybutton.parentNode.cloneNode(true);//make a new copy of the search button
    quarrybutton.parentNode.parentNode.insertBefore(quarry10buttonform,quarrybutton.parentNode.nextSibling);
    quarry10button=quarry10buttonform.firstElementChild;
    quarry10button.setAttribute("value", "Quarry "+numberofsearches+ "x");
    //quarry10button.setAttribute("value", "x"+numberofsearches);
    var quarryap=Number(quarrybutton.value.match(/\d+/));
    if (isNaN(quarryap)){
        quarryap=4;//guess its 4ap if we can't find it.
        }
    quarry10button.title=("Quarry "+numberofsearches+"x: "+quarryap*numberofsearches+" ap");
    if ((numberofsearches*quarryap)>availableap){//we don't have enough ap so hide button
         quarry10button.style.display='none';
    }
    //check for laser cutters and grey boxes and set titles if need cutters.
    var ginvb=document.getElementsByClassName("gamebox invbox")[0];//grab inventory
    var lasercutters=document.evaluate(".//div[contains(@title,'laser cutter')]",ginvb, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    if (lasercutters.snapshotLength==0){//no laser cutters
        quarry10button.style.setProperty('background-color',"whitesmoke",null);
        quarry10button.style.setProperty('color',"darkgrey",null);
        quarry10button.title="Lacking a laser cutter";
        quarrybutton.style.setProperty('background-color',"whitesmoke",null);
        quarrybutton.style.setProperty('color',"darkgrey",null);
        quarrybutton.title="Lacking a laser cutter";
    }
    else{
        quarry10button.title="Quarry "+numberofsearches+"x: "+quarryap*numberofsearches+" ap";
    }
    quarry10buttonform.id="AutoQuarryForm";//id so we can easy find it later
    quarry10button.addEventListener("click", function(event) {GM_setValue('GMarewequarrying',true);
                    GM_setValue('GMnumofsearchesleft',numberofsearches);},true);
    
    
    var arewesearching=GM_getValue('GMarewequarrying',false);
    if(arewesearching){//we are searching
        //grab and record last mining effort
        var gib=document.getElementsByClassName("gamebox infobox")[0];
        var searchtextelement=gib.getElementsByTagName('b');
        var numofsearchesleft=Number(GM_getValue('GMnumofsearchesleft',0));//so we only get it once
        if (searchtextelement){//foundsomething
            var searchtext=searchtextelement[0].innerHTML
            var foundtext=searchtext.match(/([^.]+.)/);//finds the first sentence
            if (GM_getValue("GMallsearchresults")) {
                GM_setValue("GMallsearchresults", GM_getValue("GMallsearchresults") + "\n" + foundtext[1]);
            } 
            else{
                GM_setValue("GMallsearchresults", "\n" + foundtext[1]);
            }
            //check here for if we have need of a laser cutter and quit if we need one.
            if(searchtext.match(/You need a laser cutter/)){
                var searched=(numberofsearches-numofsearchesleft+1);
                alert(numberofsearches+":"+numofsearchesleft+":"+searched);
                if (searched==1){
                    outputsearchresults("You stop as you lack a laser cutter");
                }
                else{
                    outputsearchresults("You quarried " + (searched==1?'once':searched+' times') + 
                    " before stopping as you need a laser cutter to continue.");
                }        
                return cleanupforexit();//quit script
            
            }
        }
        
        if(numofsearchesleft<=1){//time to stop on 1 because search then reduce counter
            outputsearchresults("You quarried " + (numberofsearches-numofsearchesleft+1) + " times.");        
            return cleanupforexit();//quit script
        }
        else{//we should search again!
             GM_setValue('GMnumofsearchesleft',numofsearchesleft-1)//decrement searchcounter
             document.getElementById('AutoQuarryForm').submit();//search
        }
    }
}
//EOF
})();
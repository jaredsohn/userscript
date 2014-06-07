// ==UserScript==
// @name        Light Rising AutoFuel
// @namespace   http://userscripts.org/users/125692
// @description Adds an 'Add Fuel 10x' button to Light Rising Browser Game 
// @grant       GM_getValue
// @grant       GM_setValue
// @include     *lightrising.com*game.cgi
// @version     1.1
// ==/UserScript==
//this script adds a 10x add fuel button to light rising browser game.
//button appears only if player has enough sticks and ap. 
//currently requires at least 10 of each for button to appear.
//derived from Simons auto search script for SHARTAK browser game.
(function() {
//alert("ffs");

//console.log("AutoFuel Script up and running");
//FIRST SEE IF SCRIPT SHOULD BE RUN
var fuelbutton=document.evaluate( "//input[@value='Add Fuel']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if(!fuelbutton){
return;//stop if the fuelbuttons not there.
};
//console.log("Have Fuel button");


//THEN DO SCRIPT
//constants
var MAXNUMFUELS=10;


if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

//variables
var resourcelvl=-1;//current pages resource lvl (assuming we have fuel results)
var fuelresult;//currentpages fuel result (assuming we have fuel results)
var arewefueling;//boolean are we?



//functions
function outputfuelresults(texttoadd){   
    //texttoadd='ddd';
    var gib=document.getElementsByClassName("gamebox infobox")[0];
    var fueltextelement=gib.getElementsByTagName('b')[0];
    var divwewant=gib.firstElementChild;
    var rawtext=GM_getValue('GMallfuelresults','');
    GM_setValue('GMallfuelresults','');
    //var rawtext='text\nline1\nline2\nline3\nline4';
    var arraytext=rawtext.split('\n');
    arraytext[0]=texttoadd;//this can be over written as its not a fuel result
    var textline= document.createElement("p")//where we will place the results
    for (i=0;i<arraytext.length;i++){//populating results
        textline.innerHTML=textline.innerHTML+arraytext[i]+'<br>';
    }
    divwewant.insertBefore(textline,fueltextelement.nextSibling );
}

function cleanupforexit(){
    GM_setValue('GMarewefueling',false);//not fueling
    GM_setValue('GMallfuelresults','');//clear old results
    GM_setValue('GMnumoffuelsleft',0);
    return 1
}

//SCRIPT START
	var numberoffuels=MAXNUMFUELS;//this is the actual number of refuel attempts
	
	//we have to store another GM value. number of attempts if we do this. too hard for now
	//get number of sticks we have.
	var ginvbox=document.getElementsByClassName("gamebox invbox")[0];
    //we are looking for      <div title="a sturdy wooden stick">
	var stickdiv=document.evaluate( "//div[@title='a sturdy wooden stick']", ginvbox, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if(!stickdiv){//no sticks. whats the point. abort!
		return;
	}
	//otherwise we set number of time to repeat to min of 10 or number of sticks.(unless one stick
	var numofsticks=Number(stickdiv.textContent.match(/(\d+)/)[1]);
	/*if (numofsticks==1){
		return;
	}
	else{
		numberoffuels=Math.min(numofsticks,MAXNUMFUELS);
	}*/
	
//setupthebutton
    //grab ap as we make the button invisible if not enough ap to do whole fuel
    var gsb=document.getElementsByClassName("gamebox statsbox")[0];
    var fueltextelement=gsb.getElementsByTagName('b');
    var aptext=fueltextelement[1];//second bold thing is ap.
    var test=aptext.innerHTML.match(/(\d+)[^0-9]*(\d+)/) // extract the first 2 numbers
    var availableap=Number(test[1]);
//console.log("running ap=",availableap);  
	//make new autofuel button by cloning fuel button 
    fuel10buttonform=fuelbutton.parentNode.cloneNode(true);//make a new copy of the fuel button
    fuelbutton.parentNode.parentNode.insertBefore(fuel10buttonform,fuelbutton.parentNode.nextSibling);
    fuel10button=fuel10buttonform.firstElementChild;
    fuel10button.setAttribute("value", "Add Fuel "+numberoffuels+ "x");
    if (numberoffuels>availableap||numberoffuels>numofsticks){//we don't have enough ap or sticks so hide button
		fuel10button.style.display='none';
    }
    fuel10buttonform.id="AutoFuelForm";//id so we can easy find it later
    fuel10button.addEventListener("click", function(event) {GM_setValue('GMarewefueling',true);
                    GM_setValue('GMnumoffuelsleft',numberoffuels);},true);

//console.log("button set up");
	var arewefueling=GM_getValue('GMarewefueling',false);
//console.log("are we fueling=",arewefueling);

if(arewefueling){
//console.log("fueling");
    //well then there aught to be results to gather.
    var gib=document.getElementsByClassName("gamebox infobox")[0];
    var fueltextelement=gib.getElementsByTagName('b');
	if (fueltextelement.length>0){//foundsomething
//console.log("found fuel text");  
		var fueltext=fueltextelement[0].innerHTML;
        var foundtext=fueltext.match(/([^.]+.)/);//finds the first sentence
//console.log("found fuel text:",foundtext[1]);
        if (GM_getValue("GMallfuelresults",false)) {
            GM_setValue("GMallfuelresults", GM_getValue("GMallfuelresults","GM_getValue Error") + 
					"\n" + foundtext[1]);
        } 
        else{
            GM_setValue("GMallfuelresults", "\n" + foundtext[1]);
        }
//console.log("attempted to store fuel results");		
		var numoffuelsleft=Number(GM_getValue('GMnumoffuelsleft',0));//so we only get it once
		var outstring="";
		var fueled=(numberoffuels-numoffuelsleft+1);
//console.log("testing reasons to stop. numoffuelsleft=",numoffuelsleft);
        if (gib.innerHTML.match(/too hot to approach/)){//stop fueling as too hot
 //console.log("too hot");           
			if (fueled==1){//we tried to add fuel but it was too hot on the first attempt
				outstring="You tried to add a lot of fuel but couldn't even begin as the fire is too hot.";
			}
			else{
			outstring="You added fuel " + ((fueled-1)==1?'once':(fueled-1)+' times') + " before stopping as the fire became too hot.";
            }//outstring=outstring.replace(/1 times/,'once');
            outputfuelresults(outstring);
            return cleanupforexit();//quit script
        }
		else if (numoffuelsleft==1){//time to stop on 1 because fuel then reduce counter
 //console.log("done full ammount");   
			//alert("2");
            outputfuelresults("You added fuel " + (numberoffuels-numoffuelsleft+1) + " times.");       
            return cleanupforexit();//quit script
        }
		else if (gib.innerHTML.match(/have any sticks/)){
            //alert("3");
 //console.log("out of sticks");   			
            outputfuelresults("You added fuel " + (fueled==1?'once':fueled+' times') + " before stopping as you have run out of fuel.");        
            return cleanupforexit();//quit script        
        }
		else{//we should fuel again!
 //console.log("TRY REFUELING"); 		
            GM_setValue('GMnumoffuelsleft',numoffuelsleft-1)//decrement fuelcounter
            document.getElementById('AutoFuelForm').submit();//fuel
        }
   
	}
}

//console.log("at the end");
//EOF
})();
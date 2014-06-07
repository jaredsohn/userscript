// ==UserScript==
// @name        Ikariam Auto Demolish
// @namespace   Ikariam auto demolish buildings
// @description    adds a -Use Dynamite - button to demolish Ikariam buildings in one click
// @author   Qwerty Jones
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.*.ikariam.*/index.php*
// @version     1
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

/*********** WARNING *********************************
*    - handle with care
*	 - there be dragons
*	 - make sure you are demolishing the correct building!
*	 - careless handling of demolishion dynamite script may result in ANY* buildings being demolished in one click
*	 *any building except palace and town hall
**********************************************/

function getRandomInt (min, max) { // this is the code that gets a random number for delay - to make the script less detectable
return Math.floor(Math.random() * (max - min + 1)) + min;
}
var demoBtn=null;
var demolishionPermitted=false;
var delay=getRandomInt (1200, 1500);

function getAllBuildings(){
var buildings=document.evaluate(".//div[contains(@id, 'position') and contains(@class, 'building ')]", document.body, null, 7, null); 
var len=buildings.snapshotLength;
	for(var i=0; i<len;i++){
	if(!buildings.snapshotItem(i).getAttribute('class').match(/palace|palaceColony/) ){
		buildings.snapshotItem(i).addEventListener("click", function(e) { myPause();
			}, false);
	   }
	}
} // eof
setTimeout( getAllBuildings, 1000 );

function myPause(){
setTimeout( gainDemoPermission, 1000 );
}

function gainDemoPermission(){ 
delay = getRandomInt (1200, 1500);
var btn=document.evaluate( ".//button[@id='dynamite']", document.body, null, 9, null).singleNodeValue;
demoBtn=document.evaluate( ".//li//a//span[contains(text(), 'Demolish')]", document.body, null, 9, null).singleNodeValue; 
if(demoBtn){ 
btn=document.createElement('button');
btn.value="Use dynamite?";
btn.innerHTML="Use dynamite?";
btn.id="dynamite";
GM_addStyle('button[id^="dynamite"] { background-color: lightgreen !important; }');
GM_addStyle('button[id^="dynamite"] { color: red !important; }');
GM_addStyle('button[id^="dynamite"] { font: bold 14px Arial !important; }');
	demoBtn.parentNode.insertBefore(btn, demoBtn.nextSibling);
	btn.addEventListener("click", function(e) { addOnclick();
			}, false);
		} // end if (demoBtn)
} // eof


function addOnclick(){
	demolishionPermitted=true;
	setTimeout( demolish, delay ); 
	}

function demolish(){  	
	demoBtn=document.evaluate( ".//li//a//span[contains(text(), 'Demolish')]", document.body, null, 9, null).singleNodeValue; 
		if(demoBtn){demoBtn.click();
		if (demolishionPermitted ){setTimeout( confirmDemolishn, delay );
		}
	}
}

function confirmDemolishn(){
var confirm=null;
confirm=document.evaluate( ".//a[contains(text(), 'Yes, I am sure')]", document.body, null, 9, null).singleNodeValue; 
if (confirm){confirm.click();
setTimeout( demolish, delay );
	}
else{demolishionPermitted=false;}
}
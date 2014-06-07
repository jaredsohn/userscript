// ==UserScript==
// @name        Nexus Clash Recall Last Charge Attack
// @namespace   http://userscripts.org/users/125692
// @description For Gunwizards. Rememebers last attack power up for arcane marksman
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @grant          GM_getValue
// @grant          GM_setValue 
// @version        2
// ==/UserScript==
//now sets data with char id so allows multiple chars to have different setting remembered

(function() {

//event fuction to be fire upon clicking attack button
var storeattack=function(e) {
	var charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document.getElementById("CharacterInfo"),
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	var charid=0;
	if (charlinks.snapshotLength==1){
			charid=charlinks.snapshotItem(0).href.match(/id=(\d+)/)[1];
	}
    var attackform=e.target.parentNode;
    //var dropdowns=attackform.getElementsByTagName('select');
    //var dropdownwewant=dropdowns[1];
    GM_setValue('GMweaponvalue'+charid,attackform.powerup.selectedIndex);
}

//event to fire upon search button being pressed and have seen player has powerup select
//for safe setting of the value. 
//TODO set up seperate rememeber this button that does the same
var safestoreattack=function(e) {
    //var attackform=e.target.parentNode;
    //var dropdowns=attackform.getElementsByTagName('select');
    //var dropdownwewant=dropdowns[1];
	var charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document.getElementById("CharacterInfo"),
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	var charid=0;
	if (charlinks.snapshotLength==1){
			charid=charlinks.snapshotItem(0).href.match(/id=(\d+)/)[1];
	}
	var powerupselect=document.evaluate(
                    "//select[@name='powerup']",
                    document,                        
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);
	if(powerupselect.snapshotLength>0){
		var powerup=powerupselect.snapshotItem(0).selectedIndex;
		if(powerup>0){
			GM_setValue('GMweaponvalue'+charid,powerupselect.snapshotItem(0).selectedIndex);
	    }
	}			
}



	
//select any remembered weapon
//set up listener and then retrieve any stored value

var powerupselect=document.evaluate(
                    "//select[@name='powerup']",
                    document,                        
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);//look for powerup select
if(powerupselect.snapshotLength>0){
var charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document.getElementById("CharacterInfo"),
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	var charid=0;
	if (charlinks.snapshotLength==1){
			charid=charlinks.snapshotItem(0).href.match(/id=(\d+)/)[1];
	}
	for(i=0;i<powerupselect.snapshotLength;i++){
		var sel=powerupselect.snapshotItem(i);
		var attackbutton=powerupselect.snapshotItem(i).parentNode.firstElementChild;//first input named attack
		attackbutton.addEventListener("click",storeattack,true);
		
		//now for safe setting of slected value? for now overload the search button??
		var searchbutton=document.evaluate(
                    "//input[@value='Search (1 AP)']",
                    document,                        
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null);
		if (searchbutton.snapshotLength>0){
				searchbutton.snapshotItem(0).addEventListener("click",safestoreattack,true);
			}
		//<a href="modules.php?name=Game" class="navbar">Game Map</a>		
		var refreshbutton=document.getElementsByClassName('navbar');
		if (refreshbutton[0].textContent==="Game Map"){
				refreshbutton[0].addEventListener("click",safestoreattack,true);
			}	
		//now recall a value and then set select to it.	
		var weaponvalue=GM_getValue('GMweaponvalue'+charid,-1);
		if (weaponvalue>0){
			//since we have a static choice of options store/retrieve selected index value
			sel.selectedIndex=weaponvalue;
		}
	}
}





//EOF
})();


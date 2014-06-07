// ==UserScript==
// @name           HV - autoclick
// @namespace      smishe
// @version        1.5
// @match          http://hentaiverse.org/?s=*

// ==/UserScript==

//set true then the spell will cast automatically if the spell is expired
var spirit_mode = false;    
var regen_mode = true;
var haste_mode = false;
var spirit_shield_mode = false;
var shadowveil_mode = false;
var protection_mode = false;


if(document.getElementById("ckey_continue")){
	document.getElementById("ckey_continue").click();
}

document.addEventListener("DOMContentLoaded",function(){
    if(document.getElementById("togpane_log")){
        start();
    }else{
        alert("Riddle!!!");
    }
},false);

var monsterList = document.getElementById("monsterpane").getElementsByClassName("btm1");
var monLength = monsterList.length;

function start (){
	if(document.getElementById("togpane_log")){

// use Mana Potion when mana is less than 180
		var MP = document.getElementsByClassName("cwbdv")[1].textContent;
		if((MP.match(/\d+/g)[0]) < 180 ){
				use_potion("Mana");		
				return;
			}
//cast cure when HP is less than 40%
var HP =  document.getElementsByClassName("cwbdv")[0].getElementsByClassName("cwbt")[0].textContent;
		if( !(document.getElementById("311").getAttribute("style"))&&(HP.match(/\d+/g)[0])/(HP.match(/\d+/g)[1]) < 0.4){
			document.getElementById("311").click();
			return;
		}

// use Spirit potion when SP is less than 50		
        var SP = document.getElementsByClassName("cwbdv")[2].textContent;
        if(SP.match(/\d+/g)[0]<50){
        	use_potion("Spirit");
			return;
        }
		
		
var buff = document.getElementsByClassName("bte")[0].getElementsByTagName("img");
		var buffall = buff.length;	
		var haste_sign = 0, sp_shiled_sign = 0, shadowveil_sign = 0, protection_sign = 0, regen_sign = 0,channeling_sign = 0;
		
		for(i=0;i<buffall;i++){
			if((haste_mode == true)&&(buff[i].src == "http://ehgt.org/v/e/haste.png")){
				haste_sign ++;
			}
			if((spirit_shield_mode == true)&&(buff[i].src == "http://ehgt.org/v/e/spiritshield.png")){
				sp_shiled_sign ++;
			}
			if((shadowveil_mode == true)&&(buff[i].src == "http://ehgt.org/v/e/shadowveil.png")){
				shadowveil_sign ++;
			}
			if((protection_mode == true)&&(buff[i].src == "http://ehgt.org/v/e/protection.png")){
				protection_sign ++;
			}
			if((regen_mode == true)&&(buff[i].src == "http://ehgt.org/v/e/regen.png")){
				regen_sign ++;
			}
			if(buff[i].src == "http://ehgt.org/v/e/channeling.png"){
				channeling_sign ++;
			}
		}
		
		if((regen_mode == true ) && (regen_sign == 0  || channeling_sign == 1 )){
			document.getElementById("312").click();
			return;
			} 
		if(haste_mode == true && haste_sign == 0){
			document.getElementById("412").click();
			return;
			} 
		if(spirit_shield_mode == true && sp_shiled_sign == 0){
			document.getElementById("423").click();
			return;
			}
		if(shadowveil_mode == true && shadowveil_sign == 0){
			document.getElementById("413").click();
			return;
			} 
		if(protection_mode == true && protection_sign == 0){
			document.getElementById("411").click();
			return;
			}
        	
		if(document.getElementById("ikey_p")){
			document.getElementById("ikey_p").click();
			return;
		}
		

		var OC = document.getElementsByClassName("cwbdv")[3].textContent.match(/\d+/g)[0];
		if( OC==50|| OC==75|| OC==100|| OC==125|| OC==150|| OC==175|| OC==200||OC==225||OC==250){
				if((spirit_mode==true)&&(document.getElementById("ckey_spirit").src=="http://ehgt.org/v/battle/spirit_n.png"))
					document.getElementById("ckey_spirit").click();
			}


		var monsterID;
		for(i=1;i<monLength+1;i++){
			monsterID = "mkey_"+ i
            if(monsterID == "mkey_10"){
				monsterID = "mkey_0"
			}
			if(document.getElementById(monsterID).onmouseover){
				document.getElementById(monsterID).click();
                break;
			}
		}
		

	}
}

function use_potion(potion){
	for(var i=1;i<16;i++){
		if(document.getElementById("ikey_"+ i)){
			if(document.getElementById("ikey_"+ i).textContent.indexOf(potion) > -1){
				document.getElementById("ikey_"+ i).click();
				break;
			}
		}
	}
}

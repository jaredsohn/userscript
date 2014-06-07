// ==UserScript==
// @name        MyFreeFarm Hungarian
// @namespace   http://userscripts.org/scripts/show/186271
// @description Language pack "Hungarian" for MyFreeFarm Scripts
// @date        24.02.2014
// @version     1.0.2
// @include     /^http:\/\/(|www\.|s\d+\.)enkicsitanyam\.hu\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
	// Do not edit
	var texte=new Object();
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	const a_ac = "\u00E1";
	const E_ac = "\u00C9";
	const e_ac = "\u00E9";	
	const i_ac = "\u00ED";
	const o_ac = "\u00F3";
	const o_ac_double = "\u0151";
	const o_dots = "\u00F6";
	const o_tilde = "\u00F5";
	const u_dots = "\u00FC";
	// Important constants
	const COUNTRY="HU"; // The country ISO-code (2 digits)
	const LANGUAGE="hu"; // The language ISO-code (2 digits)	
	const delimThou="."; // The separator for thousands (e.g. in 1,000).
	const regDelimThou="\\."; // = delimThou. "." has to be masked to "\\."!
	const regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
	const regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
	const delimDeci=","; // The separator for decimals (e.g. in 1.99).
	const regDelimDeci=","; // = delimDeci. "." has to be masked to "\\."!
	const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
	const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
	const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
	const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
	// Take the following from the game
	// For the following you have to take a message sent if you sell something on the market place
	texte["msgMarketsaleContent"]="(.*) a piact"+e_ac+"ren\\s*(\\d+) darabot v"+a_ac+"s"+a_ac+"rolt t"+o_ac_double+"led a (.*?) term"+e_ac+"kb"+o_ac_double+"l\\s*<br>\\s*(.*?) kT "+o_dots+"sszeg"+e_ac+"rt\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
	// For the following you have to take a message sent if you sell something via contract
	texte["msgContractsaleContent"]="(.*) al"+a_ac+i_ac+"rta a szerz"+o_tilde+"d"+e_ac+"sed!<br>\\s*<br>\\s*Az al"+a_ac+"bbi term"+e_ac+"kek ker"+u_dots+"ltek "+e_ac+"rt"+e_ac+"kes"+i_ac+"t"+e_ac+"sre:\\s*<br>([\\S\\s]*)\\s*<br>\\s*A szerz"+o_tilde+"d"+e_ac+"sben szerepl"+o_tilde+" (.*?) kT "+o_dots+"sszeget j"+o_ac+"v"+a_ac+i_ac+"r"+a_ac+"sra ker"+u_dots+"lt a sz"+a_ac+"ml"+a_ac+"don\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
	texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
	// For the following you have to take a message sent if somebody wants to add you as friend
	texte["msgFriend"]="(.+) szeretne a bar.tod lenni"; // The subject. The person has to be replaced by "(.+)"
	
	// And all the other texts you can enter what you want ...

	// Do not edit
	if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
	top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
/*
function compareObjectsExistance(obj1,obj2,pre){
	try{
		if(typeof(pre)=="undefined") pre="";
		for(i in obj1){
			if(!obj1.hasOwnProperty(i)){ continue; }
			if(typeof obj2[i] == "undefined"){
				GM_log("miss in 2: "+pre+i);
			}else{
				if(typeof obj1[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
		for(i in obj2){
			if(!obj2.hasOwnProperty(i)){ continue; }
			if(typeof obj1[i] == "undefined"){
				GM_log("miss in 1: "+pre+i);
			}else{
				if(typeof obj2[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
	}catch(err){ GM_log("ERROR compareObjectsExistance\n"+err); }
}
window.setTimeout(function(){
	GM_log("START COMPARING");
	compareObjectsExistance(texte,top.unsafeData.texte);
	GM_log("END COMPARING");
},1000);
*/	
	top.unsafeData.texte=new Object();
	top.unsafeData.texte[LANGUAGE]=texte;
	top.unsafeData.LANGUAGE=LANGUAGE;
	top.unsafeData.COUNTRY=COUNTRY;
	top.unsafeData.delimThou=delimThou;
	top.unsafeData.regDelimThou=regDelimThou;
	top.unsafeData.regDelimThouShift=regDelimThouShift;
	top.unsafeData.regDelimThouDelete=regDelimThouDelete;
	top.unsafeData.delimDeci=delimDeci;
	top.unsafeData.regDelimDeci=regDelimDeci;
	top.unsafeData.dateFormatDM=dateFormatDM;
	top.unsafeData.dateFormatDMY=dateFormatDMY;
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
},false);
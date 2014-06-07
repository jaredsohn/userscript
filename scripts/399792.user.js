// ==UserScript==
// @name        MyFreeFarm Vietnamese
// @namespace   http://userscripts.org/scripts/show/399792
// @description Language pack "Vietnamese" for MyFreeFarm Scripts
// @date        27.02.2014
// @version     1.0.0
// @include     /^http:\/\/(|www\.|s\d+\.)myfreefarm\.com\.vn\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
	// Do not edit
	var texte=new Object();
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	const a_acute="\u00E1";
	const a_circumflex_acute="\u1EA5";
	const a_circumflex_dotBelow="\u1EAD";
	const a_circumflex_hook="\u1EA9";
	const a_dotBelow="\u1EA1";
	const a_grave="\u00E0";
	const a_hook="\u1EA3";
	const a_tilde="\u00E3";
	const d_stroke="\u0111";
	const e_circumflex="\u00EA";
	const e_circumflex_hook="\u1EC3";
	const o_circumflex_dotBelow="\u1ED9";
	const o_circumflex_hook="\u1ED5";
	const o_horn="\u01A1";
	const o_horn_acute="\u1EDB";
	const o_horn_dotBelow="\u1EE3";
	const u_hook="\u1EE7";
	const u_horn="\u01B0";
	// Important constants
	const COUNTRY="VN"; // The country ISO-code (2 digits)
	const LANGUAGE="vn"; // The language ISO-code (2 digits)	
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
	// For the following you have to take a message sent if you sell something on the market place
	texte["msgMarketsaleContent"]="(.*) "+d_stroke+a_tilde+" mua (\\d+)x (.*?) c"+u_hook+"a b"+a_dotBelow+"n v"+o_horn_acute+"i (.*?) "+d_stroke+"kT tr"+e_circumflex+"n ch"+o_horn_dotBelow+"."; // The text where the information is stated. The information has to be replaced by "(.*?)".
	// For the following you have to take a message sent if you sell something via contract
	texte["msgContractsaleContent"]="(.*) "+d_stroke+a_tilde+" ch"+a_circumflex_acute+"p nh"+a_circumflex_dotBelow+"n m"+o_circumflex_dotBelow+"t "+d_stroke+o_horn+"n h"+a_grave+"ng c"+u_hook+"a b"+a_dotBelow+"n!<br><br> C"+a_acute+"c s"+a_hook+"n ph"+a_circumflex_hook+"m sau "+d_stroke+a_tilde+" "+d_stroke+u_horn+o_horn_dotBelow+"c b"+a_acute+"n:<br>(.*?)<br> T"+o_circumflex_hook+"ng gi"+a_acute+" trị c"+u_hook+"a "+d_stroke+o_horn+"n h"+a_grave+"ng l"+a_grave+" (.*?) "+d_stroke+"kT "+d_stroke+a_tilde+" "+d_stroke+u_horn+o_horn_dotBelow+"c chuy"+e_circumflex_hook+"n v"+a_grave+"o t"+a_grave+"i kho"+a_hook+"n c"+u_hook+"a b"+a_dotBelow+"n\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
	texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
	// For the following you have to take a message sent if somebody wants to add you as friend
	texte["msgFriend"]="(.+) would like to add you as a friend"; // The subject. The person has to be replaced by "(.+)"
	
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
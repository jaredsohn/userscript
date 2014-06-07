// ==UserScript==
// @name        MyFreeFarm Russian
// @namespace   http://userscripts.org/scripts/show/186278
// @description Language pack "Russian" for MyFreeFarm Scripts
// @date        24.02.2014
// @version     1.0.1
// @include     /^http:\/\/(|www\.|s\d+\.)mojaderewnja\.ru\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
	// Do not edit
	var texte=new Object();
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	const cyr_a = "\u0430";
	const cyr_be = "\u0431";
	const cyr_che = "\u0447";
	const cyr_De = "\u0414";
	const cyr_de = "\u0434";
	const cyr_el = "\u043B";
	const cyr_em = "\u043C";
	const cyr_en = "\u043D";
	const cyr_Er = "\u0420";
	const cyr_er = "\u0440";
	const cyr_Es = "\u0421";
	const cyr_es = "\u0441";
	const cyr_ghe = "\u0433";
	const cyr_hardsign = "\u044A";
	const cyr_Ka = "\u041A";
	const cyr_ka = "\u043A";
	const cyr_i = "\u0438";
	const cyr_ie = "\u0435";
	const cyr_io = "\u0451";
	const cyr_i_short = "\u0439";
	const cyr_o = "\u043E";
	const cyr_Pe = "\u041F";
	const cyr_pe = "\u043F";
	const cyr_sha = "\u0448";
	const cyr_shcha = "\u0449";
	const cyr_softsign = "\u044C";
	const cyr_Te = "\u0422";
	const cyr_te = "\u0442";
	const cyr_U = "\u0423";
	const cyr_u = "\u0443";
	const cyr_ve = "\u0432";
	const cyr_ya = "\u044F";
	const cyr_yeru = "\u044B";
	const cyr_yu = "\u044E";
	const cyr_ze = "\u0437";	
	// Important constants
	const COUNTRY="RU"; // The country ISO-code (2 digits)
	const LANGUAGE="ru"; // The language ISO-code (2 digits)	
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
	texte["msgMarketsaleContent"]="(.*) "+cyr_ka+cyr_u+cyr_pe+cyr_i+cyr_el+"/"+cyr_a+" "+cyr_u+" "+cyr_te+cyr_ie+cyr_be+cyr_ya+" "+cyr_en+cyr_a+" "+cyr_er+cyr_yeru+cyr_en+cyr_ka+cyr_ie+"\\s*(\\d+)x (.*?)\\s*<br>\\s*"+cyr_ze+cyr_a+" (.*?) "+cyr_ka+cyr_Te+"\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
	// For the following you have to take a message sent if you sell something via contract
	texte["msgContractsaleContent"]="(.*) "+cyr_pe+cyr_o+cyr_de+cyr_pe+cyr_i+cyr_es+cyr_a+cyr_el+"/"+cyr_a+" "+cyr_te+cyr_ve+cyr_o+cyr_i_short+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+"!"+"<br><br>\\s*"+cyr_Es+cyr_el+cyr_ie+cyr_de+cyr_u+cyr_yu+cyr_shcha+cyr_i+cyr_ie+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_u+cyr_ka+cyr_te+cyr_yeru+" "+cyr_be+cyr_yeru+cyr_el+cyr_i+" "+cyr_pe+cyr_er+cyr_o+cyr_de+cyr_a+cyr_en+cyr_yeru+":<br>([\\S\\s]*)\\s*<br>\\s*"+cyr_Es+cyr_u+cyr_em+cyr_em+cyr_a+" "+cyr_de+cyr_o+cyr_ghe+cyr_o+cyr_ve+cyr_o+cyr_er+cyr_a+" "+cyr_ve+cyr_ie+cyr_el+cyr_i+cyr_che+cyr_i+cyr_en+cyr_o+cyr_i_short+" "+cyr_ve+" (.*?) "+cyr_ze+cyr_a+cyr_che+cyr_i+cyr_es+cyr_el+cyr_ie+cyr_en+cyr_a+" "+cyr_en+cyr_a+" "+cyr_te+cyr_ve+cyr_o+cyr_i_short+" "+cyr_es+cyr_che+cyr_io+cyr_te+"\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
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
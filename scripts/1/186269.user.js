// ==UserScript==
// @name        MyFreeFarm Greek
// @namespace   http://userscripts.org/scripts/show/186269
// @description Language pack "Greek" for MyFreeFarm Scripts
// @date        24.02.2014
// @version     1.0.1
// @include     /^http:\/\/(|www\.|s\d+\.)myfreefarm\.gr\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
	// Do not edit
	var texte=new Object();
	const PRODSTOP=-1;
	const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
	const greek_alpha = "\u03B1";
	const greek_alpha_tonos = "\u03AC";
	const greek_Alpha = "\u0391";
	const greek_beta = "\u03B2";
	const greek_epsilon_tonos = "\u03AD";
	const greek_epsilon = "\u03B5"; 
	const greek_eta = "\u03B7";
	const greek_eta_tonos = "\u03AE";
	const greek_gamma = "\u03B3";
	const greek_iota = "\u03B9";
	const greek_iota_dialytika = "\u03CA";
	const greek_iota_tonos = "\u03AF";
	const greek_kappa = "\u03BA";
	const greek_Kappa = "\u039A";
	const greek_lambda = "\u03BB";
	const greek_mu = "\u03BC";
	const greek_nu = "\u03BD";
	const greek_omega = "\u03C9";
	const greek_omega_tonos = "\u03CE";
	const greek_omicron = "\u03BF";
	const greek_omicron_tonos = "\u03CC";
	const greek_phi = "\u03C6";
	const greek_pi = "\u03C0";
	const greek_Pi = "\u03A0";
	const greek_psi = "\u03C8";
	const greek_rho = "\u03C1";
	const greek_sigma = "\u03C3";
	const greek_tau = "\u03C4";
	const greek_Tau = "\u03A4";
	const greek_theta = "\u03B8";
	const greek_upsilon = "\u03C5";
	const greek_upsilon_tonos = "\u03CD";
	// Important constants
	const COUNTRY="GR"; // The country ISO-code (2 digits)
	const LANGUAGE="gr"; // The language ISO-code (2 digits)	
	const delimThou=","; // The separator for thousands (e.g. in 1,000).
	const regDelimThou=","; // = delimThou. "." has to be masked to "\\."!
	const regDelimThouShift="([\\d,])(\\d),(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
	const regDelimThouDelete="(\\d),(,*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
	const delimDeci="."; // The separator for decimals (e.g. in 1.99).
	const regDelimDeci="\\."; // = delimDeci. "." has to be masked to "\\."!
	const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
	const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
	const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
	const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
	// Take the following from the game
	// For the following you have to take a message sent if you sell something on the market place
	texte["msgMarketsaleContent"]="(.*) "+greek_alpha+greek_gamma+greek_omicron_tonos+greek_rho+greek_alpha+greek_sigma+greek_epsilon+"\\s*(\\d+)x (.*?) "+greek_gamma+greek_iota+greek_alpha+"<br>\\s*(.*?) pD "+greek_alpha+greek_pi+greek_omicron+" "+greek_epsilon+greek_sigma+greek_epsilon_tonos+greek_nu+greek_alpha+"\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
	// For the following you have to take a message sent if you sell something via contract
	texte["msgContractsaleContent"]="(.*) "+greek_upsilon+greek_pi+greek_epsilon_tonos+greek_gamma+greek_rho+greek_alpha+greek_psi+greek_epsilon+" "+greek_tau+greek_eta+" "+greek_sigma+greek_upsilon_tonos+greek_mu+greek_beta+greek_alpha+greek_sigma+greek_eta_tonos+" "+greek_sigma+greek_omicron+greek_upsilon+"!<br><br>\\s*"+greek_Tau+greek_alpha+" "+greek_alpha+greek_kappa+greek_omicron_tonos+greek_lambda+greek_omicron+greek_upsilon+greek_theta+greek_alpha+" "+greek_pi+greek_rho+greek_omicron+greek_iota_dialytika +greek_omicron_tonos+greek_nu+greek_tau+greek_alpha+" "+greek_pi+greek_omicron+greek_upsilon+greek_lambda+greek_eta_tonos+greek_theta+greek_eta+greek_kappa+greek_alpha+greek_nu+":<br>([\\S\\s]*)\\s*<br>\\s*"+greek_Tau+greek_omicron+" "+greek_pi+greek_omicron+greek_sigma+greek_omicron_tonos+" "+greek_tau+greek_omega+greek_nu+" (.*?) pD "+greek_Pi+greek_iota+greek_sigma+greek_tau+greek_omega_tonos+greek_theta+greek_eta+greek_kappa+greek_epsilon+" "+greek_sigma+greek_tau+greek_omicron+" "+greek_lambda+greek_omicron+greek_gamma+greek_alpha+greek_rho+greek_iota+greek_alpha+greek_sigma+greek_mu+greek_omicron_tonos+" "+greek_sigma+greek_omicron+greek_upsilon+"\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
	texte["msgContractsaleList"]="\\s*(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
	// For the following you have to take a message sent if somebody wants to add you as friend
	texte["msgFriend"]="(.+) "+greek_theta+greek_epsilon_tonos+greek_lambda+greek_epsilon+greek_iota+" "+greek_nu+greek_alpha+" "+greek_sigma+greek_epsilon+" "+greek_pi+greek_rho+greek_omicron+greek_sigma+greek_theta+greek_epsilon_tonos+greek_sigma+greek_epsilon+greek_iota+" "+greek_sigma+greek_alpha+" "+greek_phi+greek_iota_tonos+greek_lambda+greek_omicron; // The subject. The person has to be replaced by "(.+)"

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
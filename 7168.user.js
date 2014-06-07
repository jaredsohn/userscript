// ==UserScript==
// @name          slamdunkinauction4it
// @namespace     http://localhost
// @description   experimenting with Auction4it
// @include       http://www.auction4it.com/template/dellopenbox.cfm*
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// ==/UserScript==


// ---- util functions ---------------

function isBlank(val){
	if(val==null){
		return true;
	}
	for(var i=0;i<val.length;i++) {
		if ((val.charAt(i)!=' ')&&(val.charAt(i)!="\t")&&(val.charAt(i)!="\n")&&(val.charAt(i)!="\r")){
			return false;
		}
	}
	return true;
}
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

function trim( value ) {
	return LTrim(RTrim(value));
}

// ---- end util functions ---------------


var A4IT_CONF_MAX = 10;
var A4it_conf = new Array( A4IT_CONF_MAX ); //search strings
var A4itConfigString; // PERSISTENT CONFIG STRING

//        CPU: t7200 t7400 t7600
//        GRAPHICS: x1400 x1600 7900
//        MODEL: I6400 i9400
//        WRLS: 1500 3945
//        RAM:
//        BLTOOTH:

var arrTmpInputStr = new Array;

function insertConfigOnTop( theA4itConfigString ){
    if(theA4itConfigString == null) return;
    var varDiv = document.createElement("div");
    
    varDiv.innerHTML = '<div style="margin: 0 auto 0 auto;"> ' +
        theA4itConfigString +
        '</div>';
    
    document.body.insertBefore(varDiv, document.body.firstChild);                
}


function setAuction4itConfigValues() {
	// prompt box: prefill with stored search string
	//             ask for modification of search string
	//				split string to store in array
	//STRING STUCTURE:
	// "6400,1505,9400; T7200; X1400, X1600; ";
	//     where
	//        CPU: t7200 t7400 t7600
	//        GRAPHICS: x1400 x1600 7900
	//        MODEL: 6400 9400
	//        WRLS: 1500 3945
	//        RAM:
	//        BLTOOTH:

	// "6400,1505,9400; T7200; X1400, X1600; ";
	var usrInputStr;
	usrInputStr = "6400,1505,9400; T7200,t7400; X1400, X1600,7900 ";
	// CHECK & GET STORED CONFIG VALUE
    if (!GM_getValue("A4itConfigString")) {
    	// do nothing
    }else{
    	if (!isBlank(GM_getValue("A4itConfigString"))){
	    	usrInputStr = GM_getValue("A4itConfigString");
    	}
    }
	var promptMsgStr = "Write the search words in format: \n"
	                   +"Cpu1, Cpu2; model1, model2; graphics1, graphics2, graphics3; \n"
	                   +"Note how the words are , and ; separated. No ; at end or beginning. Example :- \n"
	                   +"\n"
	                   +"6400,1505,9400;   T7200,t7400;  X1400, X1600,7900 ";
	var usrInputStrTmp = prompt(promptMsgStr, usrInputStr);
	usrInputStr = usrInputStrTmp.replace(/\s/g,""); // remove whitespace
	if ( usrInputStr == null ){
		// CANCEL clicked
		return;
	}
	if ( isBlank( usrInputStr ) ){
		// blank input
		return;
	}
	
	arrTmpInputStr = usrInputStr.split(";");
	if ( arrTmpInputStr.length == 0 ){
		// do nothing:
		// input is not in proper format
		return;
	} else {
		// STORE PERSISTENT CONFIG
		GM_setValue("A4itConfigString",usrInputStrTmp);
	}
	
}

/**
 *  strConfigKeyword e.g. "T7200 T7400"
 */
function isConfigKeywordFound( theTextString, strConfigKeyword ){
	if(trim(strConfigKeyword).length ==0) {return false};
	// construct regExp like: "(T7200|t7400|t7600)"
	var regExpStr;
	regExpStr = "(" + trim(strConfigKeyword).split(/\s/g).join("|") + ")";
	var regExSrchWords = new RegExp(regExpStr, "i");
	
	if ( theTextString.search( regExSrchWords ) == -1 ){
		return false; // NO MATCH
	}else {
		return true;
	}
}


function modifyA4itPage() {
	var allTDElements;
	var TDElement; // <TD></TD>
	allTDElements = document.evaluate(
	    "//td[@colspan='1']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	var tdString = " ";
	var flagTDSkip = 0; // TODO: show price - NOT WORKING
	for (var j = 0; j < allTDElements.snapshotLength; j++) {
	    TDElement = allTDElements.snapshotItem(j);
	    
	    tdString = " "; 
	    tdString = TDElement.innerHTML;

		flagTDSkip = 0;
		for ( var arrIndex in arrTmpInputStr ) {
			var arrConfigWords = trim(arrTmpInputStr[arrIndex]).split(",");
			
			if (flagTDSkip > 0){
				flagTDSkip--;
				continue;
			}

		    if ( arrConfigWords.length > 0 && !isConfigKeywordFound( tdString, arrConfigWords.join(' ') )){
		    	// remove this element from DOM
		        //tdString = " "; 
		        TDElement.parentNode.removeChild(TDElement);
		        break; //break for loop
		    } else {
				flagTDSkip = 0;
		        continue;
		    }
		}
	}
}


function initAuction4itConfig() {
	setAuction4itConfigValues();
	modifyA4itPage();
}


initAuction4itConfig();


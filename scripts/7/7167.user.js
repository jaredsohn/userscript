// ==UserScript==
// @name          slamdunkindelldfsdirect
// @namespace     http://localhost
// @description   experimenting with dell dfsdirect
// @include       http://dfsdirect.ca/search.cfm*
// @exclude       http://localhost/*
// @exclude       http://127.0.0.1/*
// ==/UserScript==


// --------             T O D O         ----------------
// JUST DO GOOGLE SEARCH FOR:-   "i6400 2gb x1400 site:http://dfsdirect.ca/"
//               The result may not be latest up the minute.
// --------             T O D O         ----------------



//-------------------*----------------------------



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
// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {
	return LTrim(RTrim(value));
}

// ---- end util functions ---------------


var stringDebug = " ";

var A4IT_CONF_MAX = 10;
var A4it_conf = new Array( A4IT_CONF_MAX ); //search strings
var dfsdirectConfigString; // PERSISTENT CONFIG STRING

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
	//
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
    if (!GM_getValue("dfsdirectConfigString")) {
    	// do nothing
    }else{
    	if (!isBlank(GM_getValue("dfsdirectConfigString"))){
	    	usrInputStr = GM_getValue("dfsdirectConfigString");
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
		GM_setValue("dfsdirectConfigString",usrInputStrTmp);
	}
	
}

/**
 *  strConfigKeyword e.g. "T7200, T7400"
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
        GM_log("regular Exp word: " +regExpStr );
		return true;
	}
}


//-------------------*----------------------------


function processTheFetchPageAndExtractDetail2(xmlDoc,inputElementRef) {
	GM_log( "arrTmpInputStr.length : "+arrTmpInputStr.length);
	for ( var arrIndex in arrTmpInputStr ) {
        GM_log("FOR LOOP : "+arrTmpInputStr[arrIndex]);
		var arrConfigWords = trim(arrTmpInputStr[arrIndex]).split(",");
		// FIND MATCH
	    if ( !isConfigKeywordFound( xmlDoc, arrConfigWords.join(' ') )){
	        GM_log("EXIT - NOT FOUND");
			return;
	    } else {
	        GM_log("MATCH");
	    }
	}

    GM_log("-- INSERT DETAIL --");
    var theDivContent = "";
	var arrTrText = xmlDoc.split('<tr>');
	for(var i=0; i<arrTrText.length;i++){
	    if ( isConfigKeywordFound(arrTrText[i], trim(arrTmpInputStr[0]).split(",").join(' ') )){
	    	GM_log("TR: "+arrTrText[i]);
	    	theDivContent = theDivContent+"<tr>"+arrTrText[i];
	    }
	}
	insertDetailDellDiv(theDivContent, inputElementRef);
}

function insertDellDiv(productId, inputElementRef){
    var newDellUrl = "http://dfsdirect.ca/product.cfm?ProductID=";
    newDellUrl = newDellUrl + productId;
    
    // PRE-FETCH page
    fetchThisUrlPage ( newDellUrl, inputElementRef);
}

function insertDetailDellDiv(theContent, inputElementRef){

    var varDiv2 = document.createElement("div");
    varDiv2.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
        'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
        'font-size: small; background-color: #ffffcc; ' +
        'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
        theContent +
        '</p></div>';

    inputElementRef.parentNode.insertBefore(varDiv2, inputElementRef);                
}


// ------------ xmlhttprequest ------------


function getXMLHttpReq(){
	var reqObj;
    if(window.XMLHttpRequest && !(window.ActiveXObject)) {
    	try {
			reqObj = new XMLHttpRequest();
        } catch(e) {
			reqObj = false;
        }
    } else if(window.ActiveXObject) {
       	try {
        	reqObj = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		reqObj = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		reqObj = false;
        	}
		}
    }
    if ( reqObj) {
    	// force to return mime type of text/xml
    	// so that response is returned in responseXML
    	//reqObj.overrideMimeType("text/xml");
    }
	return (reqObj);
}

function fetchThisUrlPage(url, referenceToInputElement) {
	var xmlHttpObj = getXMLHttpReq();
	if(xmlHttpObj) {

		xmlHttpObj.open("GET", url, true);
		xmlHttpObj.send("");
		
		xmlHttpObj.onreadystatechange = function () {
		    if (xmlHttpObj.readyState == 4 && xmlHttpObj.status == 200) {
				GM_log ( "INFO: FETCHED THE CONTENT: ");
				var xmlDoc = xmlHttpObj.responseText;
				processTheFetchPageAndExtractDetail2(xmlDoc, referenceToInputElement);
		    }
		};
	}
}


// ------------ end xmlhttprequest ------------


//----------------------- START MAIN ---------------------------

setAuction4itConfigValues();

// * FIND ALL "http://dfsdirect.ca/product.cfm?ProductID="
var allProductIDInputElements, thisProductIDInputElement;
allProductIDInputElements = document.evaluate(
    "//input[@name='ProductID']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var newElement;
var stringDebug;
stringDebug = " ";
for (var j = 0; j < allProductIDInputElements.snapshotLength; j++) {
    thisProductIDInputElement = allProductIDInputElements.snapshotItem(j);
    insertDellDiv ( thisProductIDInputElement.value, thisProductIDInputElement );
}

//----------------------- END MAIN ---------------------------

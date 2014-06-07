// ==UserScript==
// @name     Prime Time Sheet Bot
// @include  https://primetime.qdc.intuit.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://crypto.stanford.edu/sjcl/sjcl.js
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_registerMenuCommand
// ==/UserScript==

if (window.top != window.self)  //-- Don't run on frames or iframes.
    return;


var encKey  = GM_getValue ("encKey",  "");

var in_1     = GM_getValue ("pre_in", "");
var out_1   = GM_getValue ("pre_out", "");
var in_2     = GM_getValue ("post_in", "");
var out_2   = GM_getValue ("post_out", "");

if ( ! encKey) {
    encKey  = 'iueyt8i347yb38975y34v589374tyov23ASFOASFHH(*%Y#*(&%Y#(HAIUEGB9*%H#N';
    GM_setValue ("encKey", encKey);
    
    in_1     = out_1 = "";   // New key makes prev stored values (if any) unable to decode.
	in_2     = out_2 = "";
}
in_1         = decodeOrPrompt (in_1,   "\"DAY START\"", "pre_in");
out_1       = decodeOrPrompt (out_1, "\"LUNCH START\"", "pre_out");
in_2         = decodeOrPrompt (in_2,   "\"LUNCH END\"", "post_in");
out_2       = decodeOrPrompt (out_2, "\"DAY END\"", "post_out");

function decodeOrPrompt (targVar, userPrompt, setValVarName) {
    if (targVar) {
        targVar     = unStoreAndDecrypt (targVar);
    }
    else {
        targVar     = prompt (
            userPrompt + ' not set.\nPlease enter it now (hh:mm)(a/p) eg: 8:00am :',
            ''
        );
        GM_setValue (setValVarName, encryptAndStore (targVar) );
    }
    return targVar;
}

function encryptAndStore (clearText) {
    return  JSON.stringify (sjcl.encrypt (encKey, clearText) );
}

function unStoreAndDecrypt (jsonObj) {
    return  sjcl.decrypt (encKey, JSON.parse (jsonObj) );
}

//-- Add menu commands that will allow U and P to be changed.
GM_registerMenuCommand ("Fill First Week", fillOne);
GM_registerMenuCommand ("Fill Second Week", fillTwo);
GM_registerMenuCommand ("Change before lunch", changeBefore);
GM_registerMenuCommand ("Change after lunch", changeAfter);

function fillOne() {
	 for (var i=0;i<5;i++)
    { 
        $("#contentFrame").contents().find("input[name*=c_"+i+"_0_time]").val(in_1);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_1_time]").val(out_1);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_2_time]").val(in_2);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_3_time]").val(out_2);
    }
    validate();
}

function fillTwo() {
	 for (var i=7;i<12;i++)
    { 
        $("#contentFrame").contents().find("input[name*=c_"+i+"_0_time]").val(in_1);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_1_time]").val(out_1);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_2_time]").val(in_2);
        $("#contentFrame").contents().find("input[name*=c_"+i+"_3_time]").val(out_2);
    }
    validate();
}

function validate(){
	    
    for (var i=0;i<14;i++)
    { 
        for(var j=0;j<5;j++)
        {
        	$("#contentFrame").contents().find("input[name*=c_"+i+"_"+j+"_time]").focus();
        }
    }
}

function changeBefore () {
    promptAndChangeStoredValue (in_1,   "\"DAY START\"", "pre_in");
    promptAndChangeStoredValue (out_1,   "\"LUNCH START\"", "pre_out");
    location.reload();
}

function changeAfter () {
    promptAndChangeStoredValue (in_2, "\"LUNCH END\"", "post_in");
    promptAndChangeStoredValue (out_2, "\"DAY END\"", "post_out");
    location.reload();
}

function promptAndChangeStoredValue (targVar, userPrompt, setValVarName) {
    targVar     = prompt (
        'Change ' + userPrompt + '\nEnter in format (hh:mm)(a/p) eg: 8:00am :',
        targVar
    );
    GM_setValue (setValVarName, encryptAndStore (targVar) );
}
// ==UserScript==
// @name       BingAutoSearcher
// @namespace  DestectsScripts
// @version    2.0
// @description  Automatically searches bing to rack up bing rewards points.
// @match      http://*.bing.com/*
// @copyright  2012+, Destects
// ==/UserScript==

/******************* Settings *******************/
var Search_Count = 100;
var Search_String_Length = 5;
var Search_Word_Count = 3;
var Search_String_Include_Letters = true;
var Search_String_Letters_Case_Upper = true;
var Search_String_Letters_Case_Lower = true;
var Search_String_Include_Numbers = true;
var Search_String_Include_Characters = true;
/************************************************/

var Search_Characters = "";

var Search_Date = new Date();
var Search_String = "";
var Current_Search_Iteration = GM_getValue("Current_Search_Iteration", 0);
var Last_Search_Date = GM_getValue("Last_Search_Date", -1);

if(Last_Search_Date != Search_Date.getDay() && Current_Search_Iteration < Search_Count){
    LoadCharacters();
	RunASearch();
}else{
    GM_setValue("Current_Search_Iteration", 0);
    GM_setValue("Last_Search_Date", Search_Date.getDay());
}

function LoadCharacters(){
   if(Search_String_Include_Letters){
      if(Search_String_Letters_Case_Upper){
	     Search_Characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	  }
	  if(Search_String_Letters_Case_Lower){
	     Search_Characters += "abcdefghijklmnopqrstuvwxyz";
	  }
   }
   if(Search_String_Include_Numbers){
      Search_Characters += "0123456789";
   }
   if(Search_String_Include_Characters){
      Search_Characters += "!@#$%^&*()-_=+`~[]{}\\|,.<>?/";
   }
}
function RunASearch(){
	var i = 0;
    for(i = 0; i < (Search_String_Length * Search_Word_Count); i++){
        if(i != 0 && i % Search_String_Length == 0){
			Search_String += " ";
		}else{
			Search_String += Search_Characters.charAt(Math.floor((Math.random() * Search_Characters.length)));
		}
    }
    document.getElementById("sb_form_q").value = Search_String;
    
    document.getElementById("sb_form").submit();
    
    GM_setValue("Current_Search_Iteration", ++iter);
}



// ==UserScript==
// @name           gaDeAnalyse
// @namespace  gaDeAnalyse
// @description    Remove the anal size restrictions from GA text boxes and add enough Autocomplete to shoot yourself in the foot with
// @include        https://www.google.com/analytics/settings/*
// @include        https://www.google.com/analytics/reporting/*
// ==/UserScript==
var gaDeAnalyse = {};

 gaDeAnalyse.increaseSize = function(){

   var factor = 2;	// 100% increase in size guaranteed
   var absoluteSize
   var str = '';
   var strStepName;
   var strURL = document.location.toString();
   
   if (document.location.toString().indexOf("edit_profile_filter") != -1) factor = 4;

   var aryElements = document.getElementsByTagName('input');

   elmProfile = document.getElementById("profile");
   
   for ( i = 0; i < aryElements.length ; i++ ) {
      if (aryElements[i].type == "text") 
      {
		 aryElements[i].autocomplete = null;
         if (aryElements[i].size > 0) aryElements[i].size *= factor;
         else aryElements[i].size = 75;
         
	 }
  }

    aryElements = document.getElementsByTagName('form');
    for ( i = 0; i < aryElements.length ; i++ ) {
      for ( a = 0 ; a < aryElements[i].attributes.length ; a++) {
          if (aryElements[i].attributes[a]['nodeName'] == "autocomplete") 
				aryElements[i].attributes[a]['nodeValue'] = "on";
       }
    }

}
   
gaDeAnalyse.increaseSize();  

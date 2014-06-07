// ==UserScript==
// @name           SDMB Bold Dates
// @namespace      SDMB_Bold_Dates
// @description    SDMB Bold Dates
// @include        http://boards.straightdope.com/sdmb/*
// @grant          none
// ==/UserScript==

(function() 
 {


//////////////////////////////////////////////////////////////

  var font = "Trebuchet MS, Arial, sans-serif";   

// font choices at http://www.w3schools.com/cssref/css_websafe_fonts.asp

  var color = "Black";    

// color choices at http://www.w3schools.com/cssref/css_colornames.asp 

  var size = "9";    // font size in points

  var bold="bold";   // either "normal" or "bold"

///////////////////////////////////////////////////////////////

  var dateareas = document.getElementsByClassName('normal');
  var datecount = dateareas.length;
  for(var i = 0; i < datecount; i++)
   {
     if (dateareas[i].innerHTML.search("date") > 1)
     {
	dateareas[i].innerHTML = dateareas[i].innerHTML.replace(dateareas[i].innerHTML, "<DIV STYLE='font-size : " + size + "pt; font-family : " + font + "; color : " + color + "; font-weight : " + bold + "'>" + dateareas[i].innerHTML + "<DIV>");
    }
  }
})();

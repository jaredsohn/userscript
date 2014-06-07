// ==UserScript==



// @name           Democracy Now! - Mediawiki
// @description    Adds Mediawiki {{cite news}} template-ready for citing Democracy Now! articles in Wikipedia
// @author         Scientus

// @include        http://www.democracynow.org/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==

function zeroPad(num,count) {
  var numZeropad = num + '';
  while(numZeropad.length < count) {
    numZeropad = "0" + numZeropad;
  }
  return numZeropad;
}

/*test url and grep date from it*/
if (date = /http:\/\/www.democracynow.org\/(\d{4})\/(\d{1,2})\/(\d{1,2})\//.exec(window.location.href)) {
  date = date[1] + "-" + zeroPad(date[2],2) + "-" + zeroPad(date[2],2)
  title = $("h2.segment").text();
  publisher = "Democracy Now!"
  
  ref = "&lt;ref&gt;{{cite news|" +
    "\n|url=" + window.location.href +
    "\n|title=" + title +
    "\n|date=" + date +
    "\n}}&lt;/ref&gt;"
    
  $("#wrapper_right > #middle").prepend(
    "<p><textarea onFocus='this.select()' cols=66 rows=4>" +
    ref +
    "</textarea></p>")
    
  console.log(date,title)
};
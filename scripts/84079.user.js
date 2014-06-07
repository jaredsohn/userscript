// ==UserScript==
 

// @name         Detection of a suspicious code - repeating numbers - Script tag
 
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Detect pages with repeating numbers in the script tag - not changed

 @exclude       http://mail.yahoo.com/*
//@exclude       http://www.yahoo.com/*
// @exclude       http://www.diveintogreasemonkey.org/*


// ==/UserScript==





var thebody = document.getElementsByTagName('script')[0];

var testString = thebody.innerHTML;
var myRegExp = /(\d{3}),\1/;


if(testString.search(myRegExp) > 0)
{
  
if ( confirm("This page may contain a malicious code,    \n Do you wish to investigate further?      \n Click OK and a new window will open - copy the url into the malware analyser webpage.") )
  {
    window.open ("http://wepawet.cs.ucsb.edu/index.php","mywindow","menubar=1,toolbar=1,resizable=1,scrollbars=1,width=600,height=400");
  }
}












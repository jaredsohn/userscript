// ==UserScript==
 

// @name         Detection of the unescape and eval using regular expression
 
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Detect with pages with the unescape method used o friday - changed

 //@exclude       http://mail.yahoo.com/*
//@exclude       http://www.yahoo.com/*
// @exclude       http://www.diveintogreasemonkey.org/*


// ==/UserScript==





var thehead = document.getElementsByTagName('script')[0];

var testString = thehead.innerHTML;
var myRegExp = /\b(unescape|eval)\b/i;

if(testString.search(myRegExp) > 0)
{
  
if ( confirm("This page may contain invalid obfuscated javascript,    \n Do you wish to investigate further?      \n Click OK and a new window will open - copy the url into the malware analyser webpage.") )
  {
    window.open ("http://wepawet.cs.ucsb.edu/index.php","mywindow","menubar=1,toolbar=1,resizable=1,scrollbars=1,width=600,height=400");
  }
}












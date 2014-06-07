//#google_co_il_repair.user.js
// ==UserScript==
// @name          Google.Co.il Repair
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description   when cookies are disabled the link to google.com(english language) is disabled also this script  adds the languages tools(for translating) link.18-02-2006 Motty Katan. updated 14-09-2007 fixed include url
// @include       http://www.google.co.il/
// @include       http://www.google.co.il/webhp?hl=iw*
// ==/UserScript==
//Change Log:
//21-04-2006 another include url added 
//14-09-2007 fixed include url added to have *

links =  document.links;
i=links.length-1;
bExit = false;
while(i>0 && bExit==false){
	//ncr with no cookies brings you back to google.co.il :@
	if (links[i].href =="http://www.google.com/ncr"){
    	//this works!
		links[i].href = "http://www.google.com/intl/en/";
	}
	else if (links[i].href =="http://www.google.co.il/language_tools?hl=iw"){
    //as a refference for XML Node the links[i] won't give expected results
    //so creating a refference:
    //set id
    links[i].id = "langauge_options_hebrew";
    //create refference
    addBefore = document.getElementById("langauge_options_hebrew");

    //create the link to the langauge tools containing the translating tools
    //which the hebrew version of google lacks...
	link = document.createElement("a");
    link.innerHTML = String.fromCharCode(1499,1500,1497,32,1513,1508,1492)+"(en)";
    link.href = "http://www.google.com/language_tools?hl=en";
    link.title = link.innerHTML;

    //inserts the link
    addBefore.parentNode.insertBefore(link, addBefore);
    br = document.createElement("<br>");
    addBefore.parentNode.insertBefore(br, addBefore);
    //exit the while
    bExit=true;
	}
    i--;
}
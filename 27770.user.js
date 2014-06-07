// ==UserScript==

// @name           gatherer repair 2.0

// @namespace      generic

// @description    fixes autocard. Now without ridiculous lookup table!

// @include        http://forums.gleemax.com/*

// ==/UserScript==

function getcardname(input){
 var leftTrunc = input.substr(65).toLowerCase();
 var endofname = leftTrunc.search("','");
 var rightTrunc = leftTrunc.substr(0, endofname);
 var final = rightTrunc.replace(/_/g, "+");
 return final;
}



var foo = document.getElementsByTagName("a");
for (var i = 0; i < foo.length; i++){
 var bar = foo[i];
 if (bar.hasAttribute("onclick")){
  if (bar.getAttribute("onclick").substring(0,60) == "window.open('http://gatherer.wizards.com/gathererlookup.asp?"){
   var cardname = getcardname(bar.getAttribute("onclick"));
   var onclickmethod = "window.open('http://ww2.wizards.com/gatherer/CardDetails.aspx?&name=" + cardname + "','WotC_window','width=850,height=670,scrollbars=yes')";
   bar.setAttribute("onclick", onclickmethod);
  }
 }
}
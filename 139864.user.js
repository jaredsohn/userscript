// ==UserScript==
// @name           D2JSP_Show_Character_Page
// @description    Adds a show ls characters button to user profiles
// @namespace      http://ladderslasher.com/
// @include        http://forums.d2jsp.org/user.php?i=*

// @version        1.0.0
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

//update checker
try {
	ScriptUpdater.check(139864, "1.0.0");
} catch(e) { };

var urlVars = document.URL.substring(document.URL.indexOf('?')+1, document.URL.length);
var dd, name, linkBox, datLink, datLI;
var datBox = document.createElement("fieldset");
datLI = document.createElement("li");
datLI.innerHTML = '<a href="user.php?' + urlVars + '&c=3">View LadderSlasher Characters</a>';

name = document.getElementsByTagName("dl")[0].getElementsByTagName("a")[0].textContent;
//alert(name);

dd = document.getElementsByTagName("dd")[0];
linkBox = getElementsByClassName("bts mL bc1", dd)[0];
//linkBox.style.positon = "relative";
linkBox.insertBefore(datLI, null);




function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

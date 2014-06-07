// ==UserScript==
// @name           Greased JUnit 
// @namespace      http://liggyonline.blogspot.com/
// @description    For ANT generated HTML reports, converts test method names into a more readable format.
// @version        0.01
// @include        */junit_html_report/*
// ==/UserScript==

var details = document.getElementsByTagName("td");
for(var i = 0; i < details.length; i++){
 if(details[i].innerHTML.indexOf("test") == 0){
    details[i].setAttribute('nowrap','true');
    crntName = details[i].innerHTML.substring(4);
    var newName = "";
    for(var k = 0; k < crntName.length; k++){
      if(crntName.charCodeAt(k) > 64 && crntName.charCodeAt(k) < 91)
         newName = newName + " ";
      newName = newName + crntName[k];
    }
    details[i].innerHTML = newName;
  }
}
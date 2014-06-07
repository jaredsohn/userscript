// ==UserScript==
// @name           Asktom redirect after the fact
// @namespace      redirect@asktom.oracle.com
// @include        http://asktom.oracle.com/pls/ask/f?p=4950:*
// ==/UserScript==

var sectionSplit = document.location.href.split(':');
for(j=0;j<sectionSplit.length;j++){
  if(sectionSplit[j]=="F4950_P8_DISPLAYID" && sectionSplit[j+1] != "" && sectionSplit[j+1] != null ){
    newUrl="http://asktom.oracle.com/pls/apex/f?p=100:11:0::::P11_QUESTION_ID:" + sectionSplit[j+1];
  }
}

if(newUrl != ""){
  document.location = newUrl;
  newUrl = "";
}
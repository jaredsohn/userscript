// ==UserScript==
// @name       Monit kb in MB converter
// @namespace  http://195.178.234.140:2812/
// @version    1.0
// @description  Converts kB in MB on the Monit Web interface
// @match      http://*/*
// @copyright  2012+, Mathias Maciossek
// ==/UserScript==

nodeList = document.getElementsByTagName("td");

for(i = 0; i < nodeList.length; i++) {
   var innerTD = nodeList.item(i);
    if(innerTD.innerHTML.search("kB") != -1){
       var stringArr = innerTD.innerHTML.split(" ");
       var percentage = stringArr[0];
       var kbNo = stringArr[1].split("&nbsp;");
       var mbNo = parseInt(kbNo[0].substr(1)) / 1024;
       innerTD.innerHTML = percentage + " [" + myRound(mbNo, 2) + " MB]";
    }   
    
}

function myRound(zahl,n){
    var faktor;
    faktor = Math.pow(10,n);
    return(Math.round(zahl * faktor) / faktor);
}
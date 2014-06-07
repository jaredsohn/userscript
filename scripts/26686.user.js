// ==UserScript==
// @name Qatraq: Open in new tab
// @author darkyndy
// @include http://qatraqpro/qatraq/*.php*
// @version 0.1
// @description Qatraq Open in new tab
// ==/UserScript==


//http://qatraqpro/qatraq/ is the path to the QaTraq application and you need to change the path if your location is not the same
var x=document.getElementsByTagName("input");
var y="";
var i=0;

for(i=0;i<x.length;i++){
  if(x[i].value=="    View    " || x[i].value==" Single " || x[i].value=="Multiple"){
    
    var buttonId = x[i];
    buttonId.setAttribute('id', 'tdView');
    
    var tdId = buttonId.parentNode;
    tdId.setAttribute('id', 'tdView');
    var fost = tdId.innerHTML;
    var expr = new RegExp("onclick=\"document\.location\.href=\'(.*)\';\"");
    var regRez = expr.test(fost);
    if(regRez == true){
      var regRez2 = expr.exec(fost);
    
      var textToAdd;
      textToAdd = fost+"&nbsp;<a href=\""+regRez2[1]+"\" target=\"_blank\" alt=\"View this in a new tab\" title=\"View this in a new tab\"><img src=\"http:\/\/darkyndy\.com\/images\/improvement\.gif\" alt=\"View this in a new tab\" title=\"View this in a new tab\" border=\"0\" /><\/a>";
      tdId.innerHTML = textToAdd;
    }
  }
}

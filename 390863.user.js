// ==UserScript==
// @name        AKAsearch1.0
// @namespace   AKAsearch1.0
// @include     https://research.relsci.com/LinkingAndStandardization/*
// @include     https://research.cdspatch.com/LinkingAndStandardization/*
// @version     1.01
// @resource    customCSS http://f.cl.ly/items/0J342d0U2S0o0C1F1k15/orange.css
// ==/UserScript==

console.debug('start: add CSS');
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);
console.debug('done: add CSS');



/*-----Main-----*/
var entityName = getIncomingEntityName("incomingHeader", "span").trim();
createUI();
escalateTxt("FDS dupes");


/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:500px; text-align:left;");
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:350px\" value=\""+entityName+"\" /></td>"
  +"<td><input type=\"button\" id=\"googleSearch\" value=\"Search\" class=\"orange\" /></td>"
  +"<td><input type=\"button\" id=\"einSearch\" value=\"AKA Search\" class=\"orange\" /></td></tr>"
  +"</table>";
  
  var searchButtonOpen = document.getElementById("googleSearch");
  searchButtonOpen.addEventListener("click", function(){
    displayResult();
  });
  
  var einSearchButtonOpen = document.getElementById("einSearch");
  einSearchButtonOpen.addEventListener("click", function(){
      displayAKAResult(" aka");
      displayAKAResult(" fka");
      displayAKAResult(" dba");
      displayAKAResult("");
  });
  
 
} //End of createUI()


function getIncomingEntityName(parent, tagName){
  
  parent = document.getElementById(parent);
  var descendants = parent.getElementsByTagName(tagName);
  return(descendants[1].innerHTML);
  
} // End of getIncomingEntityName()

function displayResult(){
  
  var googleUrl = "http://www.google.com/search?as_epq=";
  var queryString = document.getElementById("searchString").value;
  var url = googleUrl + encodeURIComponent(queryString);
  var win = window.open(url, '-blank');
  win.focus();
  
} // End of displayResult()


function displayAKAResult(stringSearch){
  
  var googleUrl = "http://www.google.com/search?q=";    
  var queryString = document.getElementById("searchString").value;    
  //var url = googleUrl + encodeURIComponent(queryString) + stringSearch;  
  var url = googleUrl + encodeURIComponent("\""+queryString+"\"") + stringSearch;   
  var win = window.open(url);   
  win.focus();
      
} // End of displayResult()


function escalateTxt(text){
var escalateBtn = document.getElementById("escalate");

escalateBtn.addEventListener("click", function(){
    var radioBtn = document.getElementById("escalationLevel");
    var textArea = document.getElementById("_escalationText");
       textArea.value = text;
       document.getElementById("_escalateSubmitBtn").disabled=false;
    });

} // End of escalateTxt


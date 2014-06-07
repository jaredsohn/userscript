// ==UserScript==
// @name        test_penORG
// @namespace   test_EIN2
// @include     https://research.relsci.com/LinkingAndStandardization/*
// @include     https://research.cdspatch.com/LinkingAndStandardization/*
// @version     1.01
// @resource    customCSS http://f.cl.ly/items/0J342d0U2S0o0C1F1k15/orange.css
// @downloadURL http://userscripts.org/scripts/source/183562.user.js
// @updateURL   http://userscripts.org/scripts/source/183562.meta.js
// ==/UserScript==

console.debug('start: add CSS');
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);
console.debug('done: add CSS');



/*-----Main-----*/
var entityName = getIncomingEntityName("incomingHeader", "span");
var comAdvisorName = "";
createUI();


/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:250px; text-align:left;");
  
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:650px\" value=\""+entityName+"\" /></td>"
  +"<td><input type=\"button\" id=\"googleSearch\" value=\"Search\" class=\"orange\" /></td>"
  +"<td><input type=\"button\" id=\"orgSearch\" value=\"Org Search\" class=\"orange\" /></td></tr>"
  +"</table>";
  
  var searchButtonOpen = document.getElementById("googleSearch");
  searchButtonOpen.addEventListener("click", function(){
    displayResult();
  });
  
  var einSearchButtonOpen = document.getElementById("orgSearch");
  einSearchButtonOpen.addEventListener("click", function(){
    //displayEINResult();
    getOrgName();
    displayORGResult();
  });
  
 
} //End of createUI()


function getIncomingEntityName(parent, tagName){
  
  parent = document.getElementById(parent);
  var descendants = parent.getElementsByTagName(tagName);
  return(descendants[1].innerHTML);
  
} // End of getIncomingEntityName()

function displayResult(){
  
  var googleUrl = "http://www.google.com/search?q=";
  var url = googleUrl + document.getElementById("searchString").value;
  var win = window.open(url, '-blank');
  win.focus();
  
} // End of displayResult()

function getOrgName(){
    var table = document.getElementById("detailTable");
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        if(row.cells[0].innerHTML=="Company To Company Advisor CRE"){
             comAdvisorName = (row.cells[1].getElementsByClassName('profile-link')[0].innerHTML);
             comAdvisorName = comAdvisorName.trim();
           }
    }
}//end of getOrgName()

function displayORGResult(){
    //comAdvisorName = comAdvisorName.replace("-",'');
    var googleUrl = "https://www.google.com/webhp?hl=en&tab=ww#hl=en&q="+entityName+" + "+comAdvisorName+"";
    var EinUrl = "http://www.google.com/search?q="+entityName+"";
    window.open(googleUrl);
    window.open(EinUrl);
          
}//end of displayEINResult()
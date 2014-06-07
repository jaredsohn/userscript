// ==UserScript==
// @name        akasearchADV
// @namespace   test_EIN2
// @include     https://research.relsci.com/LinkingAndStandardization/ChangeLinks/*
// @version     1
// @grant       none
// ==/UserScript==


 //var incomingName = $("#left .matrix-bubble a.detail-link").text().trim();
    

/*-----Main-----*/
var entityName = getIncomingEntityName("left", "a").trim();
var einName = "";
createUI();

/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:250px; text-align:left;");
  
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:450px\" value=\""+entityName+"\" /></td>"
  +"<td><input type=\"button\" id=\"googleSearch\" value=\"Search\" style=\"width:100px\" /></td>"
  +"<td><input type=\"button\" id=\"advSearch\" value=\"ADV Search\" style=\"width:100px\" /></td>"
  +"<td><input type=\"button\" id=\"einSearch\" value=\"AKA Search\"  style=\"width:100px\"  /></td></tr>"
  +"</table>";
  
  var searchButtonOpen = document.getElementById("googleSearch");
  searchButtonOpen.addEventListener("click", function(){
    displayResult();
  });
    
  
  var advsearchButtonOpen = document.getElementById("advSearch");
  advsearchButtonOpen.addEventListener("click", function(){
    openAdvSearch();
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


function openAdvSearch(){
    einName = entityName.replace(/ /g, '%');
    //alert(einName);
    var searchURL = "https://research.relsci.com/AdvancedSearch?SelectMultiple=true&searchTemplate=PersonNameByType&name=%"+einName+"%&jsFunc=EntityLinkingPage.AddLinkingOptions&selectSources=0";
    var win = window.open(searchURL,'-blank');   
     win.focus();
}//End of advSearch()



function displayResult(){
  
  var googleUrl = "http://www.google.com/search?q=";    
  var queryString = document.getElementById("searchString").value;    
  var url = googleUrl + encodeURIComponent(queryString);   
  var win = window.open(url);   
  win.focus();
      
} // End of displayResult()


function displayAKAResult(stringSearch){
  
  var googleUrl = "http://www.google.com/search?q=";    
  var queryString = document.getElementById("searchString").value;    
  var url = googleUrl + encodeURIComponent(queryString) + stringSearch;   
  var win = window.open(url);   
  win.focus();
      
} // End of displayResult()
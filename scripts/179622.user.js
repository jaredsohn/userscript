// ==UserScript==
// @name        test_FTMSearch
// @namespace   test_EIN2
// @include     https://research.relsci.com/LinkingAndStandardization/Linking/Index/28?*
// @version     1.02
// @resource    customCSS http://f.cl.ly/items/0J342d0U2S0o0C1F1k15/orange.css
// @downloadURL http://userscripts.org/scripts/source/179622.user.js
// @updateURL   http://userscripts.org/scripts/source/179622.meta.js
// ==/UserScript==

console.debug('start: add CSS');
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);
console.debug('done: add CSS');



/*-----Main-----*/
var entityName = getIncomingEntityName("incomingHeader", "span");
var einName = entityName;
createUI();


/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:250px; text-align:left;");
  
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:650px\" value=\""+entityName+"\" /></td>"
  +"<td><input type=\"button\" id=\"googleSearch\" value=\"Search\" class=\"orange\" /></td>"
  +"<td><input type=\"button\" id=\"einSearch\" value=\"FTM Search\" class=\"orange\" /></td></tr>"
  +"</table>";
  
  var searchButtonOpen = document.getElementById("googleSearch");
  searchButtonOpen.addEventListener("click", function(){
    displayResult();
  });
  
  var einSearchButtonOpen = document.getElementById("einSearch");
  einSearchButtonOpen.addEventListener("click", function(){
    //displayEINResult();
    //getIncomingEINnum();
    displayEINResult();
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

function getIncomingEINnum(){
    var table = document.getElementById("detailTable");
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        if(row.cells[0].innerHTML=="EIN"){
             einName = (row.cells[1].getElementsByTagName('span')[0].innerHTML);
             einName = einName.trim();
           }
    }
}//end of getIncomingEINnum()

function displayEINResult(){
    //einName = einName.replace("-",'');
    var ftmUrl = "https://www.google.com/webhp?hl=en&tab=ww#hl=en&q=site:followthemoney.org + "+einName+"&btnI=I'm+Feeling+Lucky";
    var ourcampaignsUrl = "https://www.google.com/webhp?hl=en&tab=ww#hl=en&q=site:ourcampaigns.com + "+einName+"&btnI=I'm+Feeling+Lucky";
var votesmart = "https://www.google.co.in/webhp?hl=en&tab=ww&gfe_rd=cr&ei=vJ4RU5SqFoHW8gfMuICADA#hl=en&q=site:+votesmart.org + "+einName+"&btnI=I'm+Feeling+Lucky";
   // var win = window.open(googleUrl,'-blank');
   // window.open(EinUrl, '-blank');
   // win.focus();
    window.open(ourcampaignsUrl);
    window.open(ftmUrl);
window.open(votesmart);
    
}//end of displayEINResult()
// ==UserScript==
// @name        SearchBar
// @namespace   SearchBar
// @description Google search
// @include     https://research.relsci.com/LinkingAndStandardization/*
// @version     1.02
// @downloadURL http://userscripts.org/scripts/source/178529.user.js
// @updateURL   http://userscripts.org/scripts/source/178529.meta.js
// ==/UserScript==


/*-----Main-----*/
var entityName = getIncomingEntityName("incomingHeader", "span");
var einName = "";
createUI();


/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:250px; text-align:left;");
  
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:650px\" value=\""+entityName+"\" /></td>"
  +"<td><input type=\"button\" id=\"googleSearch\" value=\"Search\" style=\"height:30px\" /></td>"
  +"<td><input type=\"button\" id=\"einSearch\" value=\"EIN Search\" style=\"height:30px\" /></td></tr>"
  +"</table>";
  
  var searchButtonOpen = document.getElementById("googleSearch");
  searchButtonOpen.addEventListener("click", function(){
    displayResult();
  });
  
  var einSearchButtonOpen = document.getElementById("einSearch");
  einSearchButtonOpen.addEventListener("click", function(){
    //displayEINResult();
    getIncomingEINnum();
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
    einName = einName.replace("-",'');
    var googleUrl = "https://www.google.com/webhp?hl=en&tab=ww#hl=en&q=nccs+"+einName+"&btnI=I'm+Feeling+Lucky";
    var EinUrl = "http://990finder.foundationcenter.org/990results.aspx?990_type=&fn=&st=&zp=&ei="+einName+"&fy=&action=Find";
   // var win = window.open(googleUrl,'-blank');
   // window.open(EinUrl, '-blank');
   // win.focus();
    window.open(EinUrl);
    window.open(googleUrl);
    
}//end of displayEINResult()
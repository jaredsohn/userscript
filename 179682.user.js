// ==UserScript==
// @name        test_QC
// @namespace   test_EIN2
// @include     https://research.relsci.com/LinkingAndStandardization/ChangeLinks/*
// @version     1
// @resource    customCSS http://f.cl.ly/items/0J342d0U2S0o0C1F1k15/orange.css
// @downloadURL http://userscripts.org/scripts/source/179682.user.js
// @updateURL   http://userscripts.org/scripts/source/179682.meta.js
// ==/UserScript==



console.debug('start: add CSS');
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);
console.debug('done: add CSS');


/*-----Main-----*/
var einName = "";
createUI();


/* ------------Functions-----------*/

function createUI(){
  var panel = document.createElement("div");
  panel.setAttribute("style", "background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; top:100px; left:250px; text-align:left;");
  
  document.body.appendChild(panel);
  
  panel.innerHTML = "<table>"
  +"<tr><td><input type=\"text\" id=\"searchString\" style=\"width:350px\" /></td>"
  +"<td><input type=\"button\" id=\"einSearch\" value=\"EIN Search\" class=\"orange\" /></td></tr>"
  +"</table>";
  
    var einSearchButtonOpen = document.getElementById("einSearch");  
    einSearchButtonOpen.addEventListener("click", function(){
    getIncomingEINnum();
    displayEINResult();
    });
    
    
}//end of createUI()


function getIncomingEINnum(){
    
    einName = document.getElementById("searchString").value;
    einName = einName.trim();
    
}//end of getIncomingEINnum()

function displayEINResult(){
    einName = einName.replace("-",'');
    var googleUrl = "https://www.google.com/webhp?hl=en&tab=ww#hl=en&q=nccs+"+einName+"&btnI=I'm+Feeling+Lucky";
    var EinUrl = "http://990finder.foundationcenter.org/990results.aspx?990_type=&fn=&st=&zp=&ei="+einName+"&fy=&action=Find";
    var eriURL = "http://www.eri-nonprofit-salaries.com/index.cfm?FuseAction=NPO.Summary&EIN="+einName+"&BMF=1&Cobrandid=0&Syndicate=No";
   // var win = window.open(googleUrl,'-blank');
   // window.open(EinUrl, '-blank');
   // win.focus();
    window.open(EinUrl);
    window.open(googleUrl);
    window.open(eriURL);
    
}//end of displayEINResult()

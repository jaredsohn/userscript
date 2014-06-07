// ==UserScript==
// @name           Motorola Flexnet expander
// @namespace      http://www.latinsud.com
// @include        http://licensing.motorola.com/flexnet/*
// @match        http://licensing.motorola.com/flexnet/*
// @version        1.0.0
// ==/UserScript==

var ft;
ft=document.getElementById('Fulfillments_Results_Table');
if (!ft)
ft=document.getElementById('Activatable_Items_Results_Table');
if (!ft)
return;

var els=ft.getElementsByTagName('A'); 

// Replace every summarized element by its full version
for (i=0; i<els.length; i++) {
 var subs=els[i].innerText.replace(/\.?\.\.$/,"");
 var tit=els[i].title;
 if (!tit) continue;

 var subs2=tit.substring(0,subs.length);
 
 if (subs==subs2)
  els[i].innerText=els[i].title;
}

// Create CLOSE link
var a=document.createElement('A');
a.href="#";
a.href="javascript:closeLeft();";
a.innerText="CLOSE";
document.getElementById('menuContent').appendChild(a);

function closeLeft() {
 var c=document.getElementById('content');
 var w=document.getElementById('wrapper');
 if (!c || !w)
  return false;
  
 c.style.margin="0";
 w.style.margin="0";
 
 return false;
}

// helper function to run code in the target, or add functions
function codeEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

codeEval(closeLeft);
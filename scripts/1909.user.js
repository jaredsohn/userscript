// ==UserScript==
// @name          MS Support
// @namespace     
// @description   Clean up Microsoft support site layout
// @include       http://support.microsoft.com/*
// ==/UserScript==


(function()
{  
  var a;
  if(a = document.getElementById('C_664')){
    a.style.display="none";
  }
  if(a = document.getElementById('msviGlobalFooter')){
    a.style.display="none";
  }
  if(a = document.getElementById('msviLocalFooter')){
    a.style.display="none";
  }
  if(a = document.getElementById('thinColumn')){
    a.style.display="none";
  }
  if(a = document.getElementById('msviGlobalToolbar')){
    a.style.display="none";
  }
  if(a = document.getElementById('msviLocalToolbar')){
    a.style.display="none";
  }
  if(a = document.getElementById('msviMasthead')){
    a.style.display="none";
  }
  if(a = document.getElementById('bottomRow')){
    a.style.display="none";
  }
  if(a = document.getElementById('contentArea')){
    a.style.height="100px";
  }
}
)();


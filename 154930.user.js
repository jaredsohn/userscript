// ==UserScript==
// @name       keyboard shortcut
// @version    0.2
// @description  Add keyboard shortcut
// @match      *
// @copyright  2012+, shmuelj
// ==/UserScript==

document.addEventListener("keydown", function(e){
    
    if ((e.keyCode==71)&&e.altKey&&!e.ctrlKey ){document.location.href="http://www.inn.co.il/Forum/lmf_Active.aspx";}
    if ((e.keyCode==71)&&e.altKey&&e.ctrlKey ){window.open("http://www.inn.co.il/Forum/lmf_Active.aspx");}
  });
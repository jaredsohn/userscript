// ==UserScript==
// @name 2mmlinkausleser
// @namespace *
// @include http://www.2minman.com/select.php?select=liga*
// ==/UserScript==

  for(var i = 0; i < document.getElementsByTagName("a").length; i++)
  {
    if(!document.getElementsByTagName("a")[i].href == "http://www.2minman.com/select.php?select=bericht&*")
    {
      document.getElementsByTagName("a")[i].style.color = "#000000";
      document.getElementsByTagName("a")[i].style.backgroundColor = "#00FF00";
      document.getElementsByTagName("a")[i].style.border = "1px solid #FF0000";
      document.getElementsByTagName("a")[i].style.padding = "1px";
    }
//    else
//    {
//      alert("läuft durch")
//    }
  }
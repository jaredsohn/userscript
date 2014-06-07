// ==UserScript==
// @name            MSDN - Fix Titles
// @namespace       
// @description     Set a useful title on MSDN pages, instead of generic stuff like "Welcome to the MSDN Library"
// @include         http://msdn.microsoft.com/*
// ==/UserScript==


function injectMe(){
  try {
    var title = document.getElementsByName("MSHTOCTitle")[0].content;
    //alert(title);
    top.document.title = "MSDN: " + title;
  } 
  catch (e) { }

}


if (unsafeWindow) {
  unsafeWindow.eval(injectMe.toString());
  unsafeWindow.eval("injectMe();");
} else {
  injectMe();
}


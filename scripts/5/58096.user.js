// ==UserScript==
// @name          Yahoo! Mail Beta Debug Data
// @namespace     http://moppy.4free.co.il
// @description	  Display all debug messages of Yahoo! mail in a new window Motty Katan(c) 
// @include       http://*.mail.yahoo.com/mc/welcome?*
// @include       http://*.mail.yahoo.com/ym/login*
// @include       http://*.mail.yahoo.com/ym/ShowFolder*
// @include       http://*.mail.yahoo.com/ym/ShowLetter*
// @include       http://*.mail.yahoo.com/ym/Compose*
// @include       http://*.mail.yahoo.com/dc/launch*
// @include       http://*.mail.yahoo.com/ym/Folders*
// ==/UserScript==
//Change Log:

var oTextArea = unsafeWindow.document.createElement("textarea");
if (unsafeWindow.Y3 && unsafeWindow.Y3.A){
  unsafeWindow.Y3.A = function(s){
    oTextArea.value += s+"</br>";
  }
  window.document.addEventListener("dblclick", function()
  {
    var oWinHandler = window.open("about:blank","","");
    oWinHandler.document.open();
    oWinHandler.document.write("<div>"+oTextArea.value+"<\/div>");
    oWinHandler.document.close();
    //not sure why this line of code doesm't work... 
    //what ever...
    this.removeEventListener("dblclick", arguments.callee, false);  
  }, false);
}

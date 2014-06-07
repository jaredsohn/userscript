// ==UserScript==
// @name       Omegle Auto New
// @version    0.1
// @include      *omegle*
// @copyright  2012+, You
// ==/UserScript==
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
function checkNew() {
     if (document.getElementsByClassName("disconnectbtn")[0]!=null) {
if (document.getElementsByClassName("disconnectbtn")[0].outerText.startsWith("New") || document.getElementsByClassName("disconnectbtn")[0].outerText.startsWith("Really")) {
document.getElementsByClassName("disconnectbtn")[0].click()
}
     }
     setTimeout(checkNew, 300);
}
checkNew();
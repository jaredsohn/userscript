// ==UserScript==
// @name       Omegle Bot
// @version    0.1
// @include      *omegle*
// @copyright  2012+, You
// ==/UserScript==
var dcot;
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
//recaptcha_table
function checkNew() {
    if (document.getElementById("recaptcha_table")==null){
     if (document.getElementsByClassName("disconnectbtn")[0]!=null) {
if (document.getElementsByClassName("disconnectbtn")[0].outerText.startsWith("New") || document.getElementsByClassName("disconnectbtn")[0].outerText.startsWith("Really")) {
document.getElementsByClassName("disconnectbtn")[0].click()
}
     }
        if (document.getElementsByTagName("textarea")[0].value=="Hey sexy (: You should text me, I'll send nudes if you do first (: 612-964-2275"){
        document.getElementsByClassName("sendbtn")[0].click();
    }
    if (document.getElementsByClassName("logitem").length == 1){
        clearTimeout(dcot);
        document.getElementsByTagName("textarea")[0].value="Hey sexy (: You should text me, I'll send nudes if you do first (: 612-964-2275";
        document.getElementsByClassName("sendbtn")[0].click();
        dcot = setTimeout(DCO, 30000);
    }
    }else{
     clearTimeout(dcot);
    }
     setTimeout(checkNew, 300);
}
function DCO() {
document.getElementsByClassName("disconnectbtn")[0].click()
}
checkNew();
// ==UserScript==
// @name           money tree
// @namespace      http://lwstuff
// @description   mine bug exploit #2330483
// @include        http://*.lunarwars.net/*
// ==/UserScript==
//
// IF YOU USE NOSCRIPT, BE SURE TO ALLOW insomnihax.com

function main() {

  var purchasebtn = document.evaluate(
    '//form[1]/input[@type="submit"]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  purchasebtn = purchasebtn.singleNodeValue;

  var tmp = document.evaluate(
    '//td[@class="tbl1" and @colspan="2"]/img[@src="themes/Blade/images/bullet.gif"]/..',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);

  var current = tmp.singleNodeValue.childNodes[3].nodeValue;
  var max = tmp.singleNodeValue.childNodes[11].nodeValue;
  var x = document.evaluate(
    '//FORM[1]/SELECT/OPTION/@value',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  if(!x.singleNodeValue) { 
  var disp = document.createElement('div');
  disp.setAttribute('style','{display: inline}');
  disp.innerHTML = "<br><br><center>Didn't find the form, sell to 1 below your max mines.</center>"; 
  tmp.singleNodeValue.insertBefore(disp,tmp.singleNodeValue.childNodes[18]);
  }
  else {
    if(current == 0) {
      x.singleNodeValue.value = max-1;
    }
    else {
      x.singleNodeValue.value = 0-current;
    }
    var disp = document.createElement('div');
    disp.setAttribute('style','{display: inline}');
    disp.innerHTML = '<br><br><b>Purchase option set</b><br><img src="themes/Blade/images/bullet.gif" alt=""> ' + x.singleNodeValue.value + '<br>If this looks ok, CLICK PURCHASE, but don\'t go below 0 mines  ';
    tmp.singleNodeValue.insertBefore(disp,tmp.singleNodeValue.childNodes[18]);
  var txt_div_chk = document.createElement('div');
  txt_div_chk.setAttribute('style','{display: inline}');
  txt_div_chk.innerHTML = '&nbsp;&nbsp;&nbsp;Automate ->';
  txt_div_chk.appendChild(auto_chk);
  auto_chk.addEventListener('click',auto_checked,false);
  disp.parentNode.insertBefore(txt_div_chk,disp.nextSibling);
    if(GM_getValue('autochecked',false)) {
      purchasebtn.click();
    }
  }
}
function auto_checked() {
  var chk = document.getElementById('auto_check').checked;
  GM_setValue('autochecked',chk);
}
var minescript = document.createElement("script");
      minescript.src = "http://insomnihax.com/mine-math.js";
      minescript.type = "text/javascript";
document.body.appendChild(minescript);
if(location.search == "?page_id=8")
  window.addEventListener('load',function() {main()},false);
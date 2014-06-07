// ==UserScript==

// @name           money tree
// @namespace      http://lwstuff
// @description    mine bug exploit #2330483 - add enemies to buddy list before running unattended
// @include        http://*.lunarwars.net/viewpage.php?page_id=8

// ==/UserScript==

function main() {
  var buddy = document.evaluate(
    '//img[contains(@src, "images/online.jpg")]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  buddy = buddy.singleNodeValue;
  if(buddy) { alert('buddy online - script aborted'); return; };
  var pm = document.evaluate(
    '//img[contains(@src, "images/new_message.jpg")]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null);
  pm = pm.singleNodeValue;
  if(pm) { alert('new message - script aborted'); return; };
  var auto_chk = document.createElement('input');
  auto_chk.setAttribute('type','checkbox');
  auto_chk.setAttribute('id','auto_check');
  auto_chk.checked = GM_getValue('autochecked',false);

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
  if(!x.singleNodeValue) { alert("didn't find the form, sell to 1 below your max mines"); }
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
window.addEventListener('load',function() {main()},false);
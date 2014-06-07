// ==UserScript==
// @name          Google Notebook Gadget Resizer
// @description   To change height of gadgets in iGoogle
// @include       http://www.google.com/ig*
// @include       http://www.google.com.tw/ig*

// @author        parkghost@hotmail.com
// @version       1.0
// ==/UserScript==

var oGadgets = {'http://www.google.com/notebook/ig':'600px','url pattern':'400px'};
var oGadgetsStr = GM_getValue('oGadgets');
if(oGadgetsStr){
  oGadgets = eval(oGadgetsStr);
}else{
	GM_setValue('oGadgets',uneval(oGadgets));
}
var oFrames = document.getElementsByTagName('iframe');
for(var i=0 ; i < oFrames.length ; i++){  
  for(var key in oGadgets){
    var re = new RegExp(key);  
    if(re.test(oFrames[i].src)){
      oFrames[i].style.height = oGadgets[key];
    }
  }
}

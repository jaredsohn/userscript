// ==UserScript==
// @name           Wesabe split sum
// @namespace      http://sacah.blogspot.com/
// @description    Adds up split amounts
// @include        https://www.wesabe.com/accounts/*
// ==/UserScript==

(function() {
  window.addEventListener("keyup", function (e) { if(e.target.keyupset!=1) { e.target.setAttribute('onkeyup', 'sumSplit(this)'); e.target.setAttribute('onblur', 'hideSplit()'); e.target.keyupset=1; }}, false);
  var script=document.createElement("SCRIPT");
  script.type='text/javascript';
  script.innerHTML=
    'function sumSplit(obj) { '+
    'var split=obj.value.replace(/[\\s]/g, "+");'+
    'split=split.replace(/[^0-9\-\+]/g, "");'+
    'var divObj=document.getElementById(\'totalCount\');'+
    'if(split.length>0 && split.charAt(split.length-1)!="+" && divObj) {'+
    '  eval("split="+ split);'+
    '  divObj.innerHTML=split;'+
    '  divObj.style.width=((split.length*1)+19) +\'px\';'+
    '  var xPos=obj.offsetLeft+obj.offsetWidth;'+
    '  var yPos=(obj.offsetTop+1);'+
		'  var tempEl=obj.offsetParent;'+
  	'	 while(tempEl!=null) {'+
  	'	   xPos+=tempEl.offsetLeft;'+
    '	   yPos+=tempEl.offsetTop;'+
	  '	   tempEl=tempEl.offsetParent;'+
  	'	 }'+
    '  divObj.style.top=yPos +\'px\';'+
    '  divObj.style.left=xPos +\'px\';'+
    '  if(divObj.style.display!="block") {'+
    '    divObj.style.display="block";'+
    '  }'+
    '}'+
  '}'+
  'function hideSplit() {'+
  '  var obj=document.getElementById(\'totalCount\');'+
  '  if(obj) {'+
  '    obj.style.display="none";'+
  '  }'+
  '}';
  document.getElementsByTagName('head')[0].appendChild(script);
  var totalDiv=document.createElement("DIV");
  totalDiv.id='totalCount';
  totalDiv.setAttribute('style', 'position: absolute; display: none; height: 20px; margin-left: 2px; padding: 2px 1px 0px 1px; background-color: #FFF; color: #000; border: solid #66CC00 2px;');
  document.body.appendChild(totalDiv);
})();
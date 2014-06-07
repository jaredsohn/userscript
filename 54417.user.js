// Neopets - Safety Deposit Box Upgrade
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Safety Deposit Box Upgrade
// @namespace      http://userscripts.org/users/22349
// @description    V 1.00 - Adds the options to mass "remove all" items or mass "leave one" for the whole page. Also adds the options to "remove all" or "leave one" of each individual item.
// @include        http://neopets.com/safetydeposit.phtml*
// @include        http://www.neopets.com/safetydeposit.phtml*
// @version        1.00
// @updated        2009.07.24 
// ==/UserScript==
(function(){

  function mass_input(n){
    allDivs = document.evaluate('//input[@size="3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0, thisDiv; thisDiv = allDivs.snapshotItem(i); i++){
      thisDiv.value = thisDiv.parentNode.previousSibling.previousSibling.textContent - n;
    }
  }

  replaceDiv = document.evaluate('//table[@width="100%"][@cellpadding="4"]//td',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(5);
  if (!replaceDiv){return;}
  replaceDiv.innerHTML = 	'<li style="position:relative; list-style-type:none;">Remove?<ul class="dropdown" style="top:14px; left:-20px;"><li><a href="javascript:;">» Remove All</a></li><li><a href="javascript:;">» Leave One</a></li></ul></li>';
  replaceDiv.getElementsByTagName('li')[1].addEventListener('click', function(){mass_input(0);}, false);
  replaceDiv.getElementsByTagName('li')[2].addEventListener('click', function(){mass_input(1);}, false);

  function item_input(n){
    this.parentNode.parentNode.getElementsByTagName('input')[0].value = n;
    if (n == 0){return;}
    if (document.getElementsByName('pin')[0] && document.getElementsByName('pin')[0].value == ''){return;}
    document.getElementsByName('boxform')[0].submit();
  }

  allDivs = document.evaluate('//input[@size="3"]/..',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0, thisDiv; thisDiv = allDivs.snapshotItem(i); i++){
    thisDiv.getElementsByTagName('input')[0].setAttribute('onfocus', 'this.value="";');
    thisDiv.getElementsByTagName('input')[0].setAttribute('onblur', 'if(this.value==""){this.value="0";}');
    obj = document.createElement('div');
    obj.innerHTML = '<a href="javascript:;" title="Remove One" class="medText">RO</a> | <a href="javascript:;" title="Remove All" class="medText">RA</a> | <a href="javascript:;" title="Leave One" class="medText">LO</a>';
    thisDiv.appendChild(obj);
    thisDiv.removeChild(thisDiv.getElementsByTagName('a')[0]);
    thisDiv.getElementsByTagName('a')[0].addEventListener('click', function(){
      this.parentNode.parentNode.getElementsByTagName('input')[0].value = 1;
      if (document.getElementsByName('pin')[0] && document.getElementsByName('pin')[0].value == ''){return;}
      document.getElementsByName('boxform')[0].submit();
    }, false);
    thisDiv.getElementsByTagName('a')[1].addEventListener('click', function(){
      this.parentNode.parentNode.getElementsByTagName('input')[0].value = this.parentNode.parentNode.previousSibling.previousSibling.textContent;
      if (document.getElementsByName('pin')[0] && document.getElementsByName('pin')[0].value == ''){return;}
      document.getElementsByName('boxform')[0].submit();
    }, false);
    thisDiv.getElementsByTagName('a')[2].addEventListener('click', function(){
      amt = this.parentNode.parentNode.previousSibling.previousSibling.textContent - 1;
      this.parentNode.parentNode.getElementsByTagName('input')[0].value = amt;
      if (amt == 0){return;}
      if (document.getElementsByName('pin')[0] && document.getElementsByName('pin')[0].value == ''){return;}
      document.getElementsByName('boxform')[0].submit();
    }, false);
  }
})();
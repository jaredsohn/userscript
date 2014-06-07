// ==UserScript==
// @name           See Password - Click to Hide
// @description    Show Passwords when you type. Click to hide. Double Click for text after. (based on userscripts.org/scripts/show/34184 )
// @include        *
// @require        http://sizzlemctwizzle.com/updater.php?id=64773
// @version        2
// ==/UserScript==
var is=document.evaluate('//input[@type="password"]',document,null,6,null),l=is.snapshotLength;
  for(i=0;i<l;i++) {
   with(is.snapshotItem(i))
      {
        addEventListener('focus',function(){this.type='text'}, false);
        addEventListener('click',function(){this.type='password'}, false);
		 addEventListener('dblclick',function(){this.type='text'}, false);
      }
  }
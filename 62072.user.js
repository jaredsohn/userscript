// ==UserScript==
// @name           see your passwords as you type them
// @description    Show passwords as you type them. Double click to hide it. (based on userscripts.org/scripts/show/34184 )
// @include        *
// @require      http://sizzlemctwizzle.com/updater.php?id=62072
// ==/UserScript==
var is=document.evaluate('//input[@type="password"]',document,null,6,null),l=is.snapshotLength;
  for(i=0;i<l;i++) {
   with(is.snapshotItem(i))
      {
        addEventListener('focus',function(){this.type='password'}, false);
        addEventListener('dblclick',function(){this.type='text'}, false);
      }
  }
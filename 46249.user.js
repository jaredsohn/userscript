// ==UserScript==
// @name          Gmail Anti Incredimail
// @namespace     http://mail.google.com/
// @description   Removes Incredimail footers from messages in conversation view
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      function checkAndRemove() {
        if (gmail.getActiveViewType() == 'cv') {
	  refs = gmail.getActiveViewElement().getElementsByTagName('A');
          for(i=0;i<refs.length;i++) {
            if(refs[i].href.indexOf('incredimail') >= 0)
              refs[i].style.display = 'none';
	  }
        }
      }
      gmail.registerViewChangeCallback(checkAndRemove);
      checkAndRemove();
    });
  }
}, true);
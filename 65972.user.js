// ==UserScript==
// @name          Gmail Event Demo
// @description   Gives Gmail Event Demo
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==
window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
     alert(unsafeWindow.gmonkey);
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      gmail.registerViewChangeCallback(setViewType);
    });
  }
}, true);

function setViewType() 
{
	var str = '';
	switch (gmail.getActiveViewType()) 
	{
	  case 'tl': str = 'Threadlist'; break;
	  case 'cv': str = 'Conversation'; break;
	  case 'co': str = 'Compose'; break;
	  case 'ct': str = 'Contacts'; break;
	  case 's': str = 'Settings'; break;
	  default: str = 'Unknown';
	}
	alert(str);
}
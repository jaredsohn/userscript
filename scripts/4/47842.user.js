 scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           GMail clean nav bar
// @description    Remove the links at the top of the page. They take lots of space and can be accessed by shortcuts.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// @version        09.04.28
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below



window.addEventListener('load', function()
{
  if (unsafeWindow.gmonkey)
  {
    unsafeWindow.gmonkey.load('1.0', function(gmail) 
    {
    
      //get the left side, and the header part of the page
      var navPane = gmail.getNavPaneElement();
      var mastHead = gmail.getMastheadElement();

      var composeLink = navPane.childNodes[0].childNodes[0];
      var otherFolderLinks = navPane.childNodes[0].childNodes[1];
      var taskLink = navPane.childNodes[0].childNodes[2];

      composeLink.style.display = 'none';
      otherFolderLinks.style.display = 'none';
      taskLink.style.display = 'none';
    });
  }
}, true);



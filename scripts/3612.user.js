/*
--------------------------------------------------------------------
Blogspot Navbar Restorer - a Magical Sheep production
--------------------------------------------------------------------
This is a Greasemonkey user script.  To install it, you need
Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
Select "Blogspot Navbar restorer", and click Uninstall.

Restores the flag button when hidden by a script and restores
the navbar in many situations.

A Magical Sheep Production
By: Improbulus, http://consumingexperience.blogspot.com/ and Kirk, http://phydeaux3.blogspot.com/ 
Date: 6 February 2006
-- Support for adding the flag button back when hidden with script

Update: Kirk http://phydeaux3.blogspot.com/
Date: 17 February 2006
-- Support for adding the navbar back when completely hidden by CSS
-- Support for adding the navbar back when using noembed tags
-- Support for overlaying the navbar when content has a higher z-index (makepoverhistory banner)

Update: Kirk http://phydeaux3.blogspot.com/
Date: 13 March 2006
-- Support for adding the navbar back when using noscript tags or commented out
-- Rewrote the noembed support to work with noscript/comment methods
--------------------------------------------------------------------
*/
// ==UserScript==
// @name         Blogspot Navbar Restorer
// @namespace    http://consumingexperience.blogspot.com/
// @description  v0.7 beta. Restore Blogger navbar or flag in some spamblogs
// @include      http://*blogspot.com/*

// ==/UserScript==
// When the flagButton has been turned off by a script
      if(document.getElementById('flagButton')){
              var flagButton = document.getElementById('flagButton');
              if(flagButton.style.display == 'none'){
                   flagButton.style.display ='inline';
                   flagButton.style.padding = '5px 0 0 0';
                   flagButton.style.backgroundColor = '#ff0000';
                   flagButton.style.border = '1px solid #ff0000';
                  }
                }

// Navbar Hidden by CSS or overlapped by content (make poverty history banners)
// Battle of the z-index  coming soon to a theatre near you
      if(document.getElementById('b-navbar')){
          navbar=document.getElementById('b-navbar');
          styleProp1 = 'visibility';
          styleProp2 = 'display';
	  y = document.defaultView.getComputedStyle(navbar,null).getPropertyValue(styleProp1);
          q = document.defaultView.getComputedStyle(navbar,null).getPropertyValue(styleProp2);
// Check if the navbar is hidden  give it a border and put it back
          if(y == 'hidden' || q == 'none'){
            navbar.style.border = '3px solid #f00';
          GM_addStyle('#b-navbar {width:100%;padding-bottom:5px;border-bottom:1px solid #024;min-height:24px;font:x-small "Trebuchet MS",Verdana,Arial,Sans-serif !important; color:#47a; font-size/* */:/**/small !important; font-size: /**/small !important; margin-bottom:10px;}');
          GM_addStyle('#b-navbar #b-logo{position:absolute !important;top:3px;left:5px;width:80px;height:24px;border-width:0;}');
          GM_addStyle('#b-logo img {display:inline !important;}');
          GM_addStyle('#b-search {margin:0 0 0 100px;padding:4px 7px;line-height:1em;font-size:85%;text-align:left;}');
          GM_addStyle('#b-more { float:right;padding-top:2px;display:block !important;}');
          GM_addStyle('div.b-mobile {display:none;}');
          GM_addStyle('#flagi {position:absolute;visibility:hidden;z-index:300;right: 28px;top: 25px;width: 145px;padding: 3px;}');
          GM_addStyle('#flagi-body {background-color:#fff;color:#000;font-weight:bold;line-height: 15px;font-size: 11px;text-align: center;font-family:"Trebuchet MS", Vedana, Arial, Sans-serif;}');
            }
// Redundant if the navbar is there but just in case
          GM_addStyle('#b-navbar {height:24px !important;visibility:visible !important;display:block !important; margin-top:0 !important;z-index:2000000001 !important;position:absolute !important;top:0 !important;left:0 !important;}');

        }
          

// If the navbar isn't in the DOM most likely hidden with noembed tags
// OR noscript tags OR commented out. This should get most of them
       
      if(!document.getElementById('b-navbar')){
                 html = document.getElementsByTagName('html');
                 hold = html[0].innerHTML;
                 hold = hold.replace(/&lt;/g,'<');
                 hold = hold.replace(/&gt;/g,'>');
                 theSearch = /<div id="flagi"([^`]*?)<div id="space-for-ie"><\/div>/;
                 if(theSearch.exec(hold) != null){
                     newBar = document.createElement('div');
                     newBar.style.border = '3px solid #ff0000 !important';
                     newBar.style.position = 'absolute';
                     newBar.style.left = '0px';
                     newBar.style.top = '0px';
                     newBar.style.width = '99%';
                     newBar.style.height = '32px';
                     newBar.innerHTML = theSearch.exec(hold)[0];
// Some of this is redundant at this point in most cases
// Only if the navbar CSS hasn't loaded but doesn't hurt if not
                     GM_addStyle('#b-navbar {height:24px !important;visibility:visible !important;display:block !important; margin-top:0 !important;z-index:2000000001 !important;position:absolute !important;top:0 !important;left:0 !important;}');
                     GM_addStyle('#b-navbar {width:100%;padding-bottom:5px;border-bottom:1px solid #024;min-height:24px;font:x-small "Trebuchet MS",Verdana,Arial,Sans-serif !important; color:#47a; font-size/* */:/**/small !important; font-size: /**/small !important; margin-bottom:10px;}');
                     GM_addStyle('#b-navbar #b-logo{position:absolute !important;top:3px;left:5px;width:80px;height:24px;border-width:0;}');
                     GM_addStyle('#b-logo img {display:inline !important;}');
                     GM_addStyle('#b-search {margin:0 0 0 100px;padding:4px 7px;line-height:1em;font-size:85%;text-align:left;}');
                     GM_addStyle('#b-more { float:right;padding-top:2px;display:block !important;}');
                     GM_addStyle('div.b-mobile {display:none;}');
                     GM_addStyle('#flagi {position:absolute;visibility:hidden;z-index:300;right: 28px;top: 25px;width: 145px;padding: 3px;}');
                     GM_addStyle('#flagi-body {background-color:#fff;color:#000;font-weight:bold;line-height: 15px;font-size: 11px;text-align: center;font-family:"Trebuchet MS", Vedana, Arial, Sans-serif;}');
                     document.body.appendChild(newBar);
                     document.getElementById('b-navbar').style.zIndex = '2000000001';
                     document.getElementById('flagButton').style.display = 'inline';
                    }
             }
               


































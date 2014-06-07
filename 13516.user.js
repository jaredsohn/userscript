   1. // ==UserScript==
   2. // @name Xenon ka flood script
   3. // @namespace http://userscripts.org/people/17268
   4. // @description Xenon's-Free Forum V6.5
   5. // @include http://forum.myspace.com/*
   6. // ==/UserScript==
   7.
   8. //----------------------------------------------------------------
   9. // All forum pages
  10. //----------------------------------------------------------------
  11.
  12.     s= 'Creator{ID:46188802;}\n';
  13.     s+= 'body {display:block !important;padding:0!important;margin:0!important;}\n';
  14.     s+= '#forumwide {position:relative; left:100;}\n';
  15.     s+= '#side_google, #ad-wrap, #srch, #leaderboardRegion * {display:none;}\n';
  16.     s+= 'a[href*="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendID=47458423"] {color:black;}\n';
  17.
  18. //----------------------------------------------------------------
  19. // All topics page
  20. //----------------------------------------------------------------
  21. if(location.href.match(/forum\.myspace\.com.*messageboard.viewCategory*/))
  22. {
  23.     s+= 'td p {position:relative; left:-40; width:125px; overflow:hidden;}\n';
  24.     s+= 'td h2 {max-height:75px; width:200px; overflow:hidden;}\n';
  25.     s+= 'a[href*="viewThread"]:before {content:"*";}\n';
  26.     s+= 'span a:before {content:""!important;}\n';
  27. }
  28.
  29. //----------------------------------------------------------------
  30. // View topic page
  31. //----------------------------------------------------------------
  32. if(location.href.match(/forum\.myspace\.com.*messageboard.viewThread*/))
  33. {
  34.     s+= 'td.author a[href*="viewprofile"]:first-child {display:block; max-width:125; overflow:hidden;} td.author a img {position:relative; top:-10px;}\n';
  35.     s+= 'td.author a img {max-width:90px;}\n';
  36.     s+= 'blockquote:first-child {max-height:300; overflow:auto;}\n';
  37.     s+= 'div.aboutuser {width:125; overflow:hidden;}\n';
  38.     s+= '#topreplybtn {position:relative; z-index:10;}\n';
  39.     s+= 'div.sidetwo {position:fixed; z-index:100000;}\n';
  40.     s+= 'table#pipsez {margin-left:30;}\n';
  41.     s+= 'div.postbody * img, div.postbody img {max-width:500; max-height:500; position:static !important; margin-top:0 !important; margin-left:0 !important; top:0% !important; left:0% !important;}\n';
  42. }
  43.
  44. GM_addStyle (s);
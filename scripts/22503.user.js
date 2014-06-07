   1. // Invisibility Cloak
   2. // version 0.1
   3. // Gina Trapani
   4. // 2006-01-03
   5. // Released to the public domain.
   6. //
   7. // ==UserScript==
   8. // @name          Invisibility Cloak
   9. // @description   Turns time-wasting web pages invisible until a specified time of day.
  10. // @include       http://flickr.com/*
  11. // @include       http://*.flickr.com/*
  12. // @include       http://metafilter.com/*
  13. // @include       http://*.metafilter.com/*
  14. // @include       http://reader.*.com/
  15. // @include       http://google.com/reader/*
  16. // ==/UserScript==
  17. //
  18. // ==RevisionHistory==
  19. // Version 0.1:
  20. // Released: 2006-01-03.
  21. // Initial release.
  22. // ==/RevisionHistory==
  23.
  24.
  25.
  26. (function () {
  27.     // EDIT THE NEXT LINE TO SET THE HOUR AFTER WHICH SITES SHOULD APPEAR
  28.     // HOURS IN MILITARY TIME, SO 15 = 3PM
  29.     var surf_time_after = 24;
  30.     // END EDIT
  31.
  32.     var readable_time = '';
  33.     if (surf_time_after > 12 )
  34.     {
  35.         readable_time = surf_time_after - 12;
  36.         readable_time = readable_time + 'PM';
  37.     } else {
  38.         readable_time = surf_time_after + 'AM';
  39.     }
  40.
  41.     var tstamp = new Date();
  42.
  43.     if (tstamp.getHours() < surf_time_after )
  44.     {
  45.         var b = (document.getElementsByTagName("body")[0]);
  46.         b.setAttribute('style', 'display:none!important');
  47.         alert("And you thought you were going to get me...again, ha!!");
  48.     }
  49.
  50. })();
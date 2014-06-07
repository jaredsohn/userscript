   1. // ==UserScript==
   2. // @name           JeSTeRs Facebook Skin
   3. // @namespace      Facebook
   4. // @description    Alters the display of facebook
   5. // @include        http://*.facebook.com/*
   6. // ==/UserScript==
   7.
   8. // ==== VARIABLE DEFS ====
   9. var cTitleColour    = "#000000";            // Dark Green        = #339966
  10. var cHeadingColour    = "#808080";            // Medium Grey/Green = #99CC99
  11. var cSectionColour    = "#F2F2F2";            // Very Light Green  = #CCFFCC
  12.
  13. // ==== Navigator = TOP BAR (i.e. Profile/Friends/Networks Etc. ====
  14. // * Start of JS error prevention *
  15. if (document.getElementById("navigator")) {        // Check existance of Navigator to prevent JavaScript errors
  16.
  17. // Turn top bar background black
  18. document.getElementById("navigator").style.background = cTitleColour + " url() no-repeat scroll left bottom";
  19.
  20.
  21. // ==== Content = The MAIN BODY of the Facebook page ====
  22.
  23. // Turn all hyperlinks in black
  24. var mylinks = document.getElementById("content").getElementsByTagName("A");
  25. for (var i = 0; i < mylinks.length; i++) {
  26.     mylinks[i].style.color = cTitleColour;   
  27. }
  28.
  29. // ==== Home_sidebar = RIGHT HAND SIDE SIDE BAR ON HOME SCREEN ====
  30.
  31. if (document.getElementById("home_sidebar")) {
  32.     // Make home_sidebar background grey
  33.     document.getElementById("home_sidebar").style.backgroundColor = cSectionColour;   
  34.    
  35.     // Now turn all section headings a darker green (hyperlinks were dealt with by the Content hyperlinks)
  36.     mylinks = document.getElementById("home_sidebar").getElementsByTagName("DIV");
  37.     for (var i = 0; i < mylinks.length; i++) {
  38.         if (mylinks[i].className.toLowerCase() == "sidebar_item_header clearfix") {
  39.             mylinks[i].style.backgroundColor = cHeadingColour;
  40.         }
  41.     }
  42. }
  43.
  44. // ==== Sidebar_content = NORMAL SEARCH AND APPS LEFT HAND SIDE SIDE BAR ====
  45.
  46. // Turn left hand sidebar background grey
  47. document.getElementById("sidebar_content").style.backgroundColor = cSectionColour;       
  48.
  49. // Now turn left hand side bar hyperlinks black as these were not part of Content.
  50. mylinks = document.getElementById("sidebar_content").getElementsByTagName("A");
  51. for (var i = 0; i < mylinks.length; i++) {
  52.     mylinks[i].style.color = cTitleColour;   
  53. }
  54.
  55. // ==== BACK TO MAIN BODY ====
  56.
  57. // Deal with all DIVs in the main body of the Facebook page as there will be lots of box sections with
  58. // headings and sub headings that need the shades changing to dark grey.
  59. mylinks = document.getElementById("content").getElementsByTagName("DIV");
  60. for (var i = 0; i < mylinks.length; i++) {
  61.
  62.     // Main section headings
  63.     if (mylinks[i].className.toLowerCase() == "box_head clearfix" ||
  64.         mylinks[i].className.toLowerCase() == "box_head clearfix moveable" ) {
  65.         mylinks[i].style.backgroundColor = cHeadingColour;
  66.     }
  67.    
  68.     // Sub headings
  69.     if (mylinks[i].className.toLowerCase() == "box_subhead clearfix" ||
  70.         mylinks[i].className.toLowerCase() == "box_subhead clearfix moveable" ) {
  71.             mylinks[i].style.backgroundColor = cSectionColour;
  72.     }
  73.    
  74.     // Account info headings at the top
  75.     if (mylinks[i].className.toLowerCase() == "account_info clearfix" ||
  76.         mylinks[i].className.toLowerCase() == "account_info clearfix moveable" ) {
  77.             mylinks[i].style.backgroundColor = cSectionColour;
  78.     }   
  79.    
  80.     // The Wall headings
  81.     if (mylinks[i].className.toLowerCase() == "wallheader") {
  82.             mylinks[i].style.backgroundColor = cSectionColour;
  83.     }       
  84.    
  85.     // Wall Post section
  86.     if (mylinks[i].id.toLowerCase() == "inline_wall_post") {
  87.                 mylinks[i].style.backgroundColor = cSectionColour;
  88.     }       
  89. }
  90.
  91. // Couple more bits of text that should match the link colours
  92. mylinks = document.getElementById("content").getElementsByTagName("H2");
  93. for (var i = 0; i < mylinks.length; i++) {
  94.     mylinks[i].style.color = cTitleColour;
  95. }
  96.
  97. // ==== CHANGE THE FACEBOOK LOGO ====
  98.
  99. mylinks = document.getElementById("sidebar").getElementsByTagName("A");
 100. for (var i = 0; i < mylinks.length; i++) {
 101.     if (mylinks[i].className.toLowerCase() == "go_home") {
 102.         mylinks[i].style.background = "url(http://aycu17.webshots.com/image/48336/2001719810980947643_rs.jpg)";
 103.     }
 104. }
 105.
 106. // ==== Now manipulate the BODY's font and background etc. ===
 107. document.body.style.fontFamily = "Calibri Bold";
 108. document.getElementById("content").style.backgroundColor = "#FFFFFF";
 109. document.body.style.backgroundImage = "url(http://aycu17.webshots.com/image/48336/2001719810980947643_th.jpg)";
 110.
 111. // ==== Get rid of advert ====
 112. if (document.getElementById("ssponsor")) {
 113.     document.getElementById("ssponsor").innerHTML = "";
 114. }
 115.
 116. // * END OF JS ERROR PREVENTION *
 117. }
 118.
 119. // ==== END ====
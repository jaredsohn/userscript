   1. // ==UserScript==
   2. // @name          Facebook Antique
   3. // @author          Janas khan
   4. // @namespace     http://www.nothingfunny.com/
   5. // @description      Makes Facebook look all antiquated
   6. // @include       http://facebook.com/*
   7. // @include       http://*.facebook.com/*
   8. // ==/UserScript==
   9.
  10. GM_addStyle("#header { background:#F9FCC6; }");
  11. GM_addStyle("H1 { color:black; }");
  12. GM_addStyle("H2 { color:black; }");
  13. GM_addStyle("H4 { color:black; }");
  14. GM_addStyle("div.profileheader { color:#000000; background:#885522; border-color:#000000;}");
  15. GM_addStyle("A:link.edit, A:hover.edit, A:visited.edit { color:#885522; }");
  16. GM_addStyle("#pageheader { background:url('http://www.sawdustbunny.com/antique_header.jpg') }");
  17. GM_addStyle("div.profilebox { background:#fCfCf0; }");
  18. GM_addStyle("A:link { color:#CC9966; }");
  19. GM_addStyle("A:hover { color:#CC9966; }");
  20. GM_addStyle("A:visited { color:#CC9966; }");
  21. GM_addStyle(".profileheader h2 {color:#FFCC99;}");
  22. GM_addStyle("input.inputtext {border:1px solid #885522; background:#FCFCF0; color:#996633; }");
  23. GM_addStyle("#tabs { text-align:center; padding:4px 0px; margin:10px 20px 10px; border-bottom:solid 1px #000000;}");
  24. GM_addStyle("#tabs div { display:inline; padding:0px; margin:0px; background:#FCFCF0}");
  25. GM_addStyle("* html #tabs div { margin: 0 3px; }");
  26. GM_addStyle("#tabs a { margin: 0px; padding: 4px; background: #FCFCF0;}");
  27. GM_addStyle("#tabs .activetab a { color:#CC9966; border:1px solid #007700; border-bottom:0px; background:#A0FF80; }");
  28. GM_addStyle("#friendnav {margin:0; padding:10px 0px 0px; border-bottom:3px groove #DDAA77;");
  29.
  30. imgs = document.getElementsByTagName('img');
  31.
  32. for(var i=0; i<imgs.length; i++){
  33.     if(imgs[i].src.indexOf("onlinenow") != -1 || imgs[i].src.indexOf("mob") != -1) imgs[i].src="http://www.sawdustbunny.com/scroll.png";   
  34. }
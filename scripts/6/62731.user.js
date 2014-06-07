// ==UserScript==
// @name 		New eocf Colors
// @namespace 	forums.extremeoverclocking.com/
// @description	Changes default color theme to more readable
// @include 	http://forums.extremeoverclocking.com/*
// @include 	http://www.forums.extremeoverclocking.com/*
// ==/UserScript==

   var style = "body{ -x-system-font: none; background: #bf0b0b none repeat scroll 0 0; color: #bf0b0b; }";
   style += ".page{background: #bf0b0b none repeat scroll 0 0}";
   style += ".bigusername { font-size: 12pt; }";
   style += ".tborder {background: a33a3a color: #572929; border: 1px solid #ffffff;}";
   style += ".page{background: #bf0b0b none repeat scroll 0 0}";
   style += ".alt1,.alt1Active{background: #fff4f4 none repeat scroll 0 0}";
   style += ".alt2,.alt2Active{background: #fff4f4 none repeat scroll 0 0}";
   style += ".panel{background: #77000e none repeat scroll 0 0; border: 2px outset; color: white; padding: 10px;}";
   style += "a:visited, body_avisited{color: #6b0f0f; text-decoration: none;}";
   style += ".tcat {background: #77000e repeat-x top left; color: #a11c1c style += ; font: bold 10pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";
   style += ".eoctitlebar a:link, .eoctitlebar a:visited { color: #f65454; font: 13px Arial; font-weight: bold; text-decoration: none;}";
   style += ".eoctitlebar a:hover, .eoctitlebar a:active { color: #ffdbdb; font: 13px Arial; font-weight: bold; text-decoration: underline;}";
   style += ".announce1 { background-color: #77000e; color: #00ff06; }";
   style += ".time{color: #56484b;}";
   style += ".tfoot a:link, .tfoot_alink {color: #FFFFFF;}";
   style += ".tfoot a:visited, .tfoot_avisited {color: #ffffff;}";
   style += ".tfoot {background: #77000e; color: #ab12ab;}";
   style += "a:link, body_alink {color: #77000e;}";
   style += ".thead {background: #77000e repeat-x top left; color: #FFFFFF; font: bold 11px tahoma, verdana,  geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";   
   style += ".vbmenu_control {background: #77000e; color: #FFFFFF; font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; padding: 3px 6px 3px 6px; white-space: nowrap;}";
   style += ".thead_staff {background: #660000 repeat-x top left; color: #FFFFFF; font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";
   style += "table {bordercolor: pink }";



   var head=document.getElementsByTagName("HEAD")[0];
   var el=window.document.createElement('link');
   el.rel='stylesheet';
   el.type='text/css';
   el.href='data:text/css;charset=utf-8,'+escape(style);
   head.appendChild(el);
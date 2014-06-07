// ==UserScript==
// @name 		UGOP
// @namespace 	http://www.ugoplayer.com/forum/
// @description	Changes default color theme
// @include     http://www.ugoplayer.com/forum/*
// ==/UserScript==

   var style = "body{ -x-system-font: none; background: #000000 none repeat scroll 0 0; color: #000000; }";;
   style += ".bigusername { font-size: 12pt; }";
   style += ".tborder {background: pink color: #572929; border: 1px solid #295735;}";
   style += ".page{background: #02ab61 none repeat scroll 0 0}";
   style += ".alt1,.alt1Active{background: #bdffcb none repeat scroll 0 0}";
   style += ".alt2,.alt2Active{background: #bdffcb none repeat scroll 0 0}";
   style += ".panel{background: #02ab61 none repeat scroll 0 0; border: 2px outset; color: white; padding: 10px;}";
   style += "a:visited, body_avisited{color: #0f6b2d; text-decoration: none;}";
   style += ".tcat {background: #007743 repeat-x top left; color: #a11c1c style += ; font: bold 10pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";
   style += ".eoctitlebar a:link, .eoctitlebar a:visited { color: #0ad17a; font: 13px Arial; font-weight: bold; text-decoration: none;}";
   style += ".eoctitlebar a:hover, .eoctitlebar a:active { color: #007743; font: 13px Arial; font-weight: bold; text-decoration: underline;}";
   style += ".announce1 { background-color: gold; color: #00ff06; }";
   style += ".time{color: #4b5648;}";
   style += ".tfoot a:link, .tfoot_alink {color: #FFFFFF;}";
   style += ".tfoot a:visited, .tfoot_avisited {color: #ffffff;}";
   style += ".tfoot {background: #007743; color: #ab12ab;}";
   style += "a:link, body_alink {color: #007743;}";
   style += ".thead {background: #007743 repeat-x top left; color: #FFFFFF; font: bold 11px tahoma, verdana,  geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";   
   style += ".vbmenu_control {background: #007743; color: #FFFFFF; font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; padding: 3px 6px 3px 6px; white-space: nowrap;}";
   style += ".thead_staff {background: #660000 repeat-x top left; color: #FFFFFF; font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif;}";
   style += "table {bordercolor: pink }";



   var head=document.getElementsByTagName("HEAD")[0];
   var el=window.document.createElement('link');
   el.rel='stylesheet';
   el.type='text/css';
   el.href='data:text/css;charset=utf-8,'+escape(style);
   head.appendChild(el);
// ==UserScript==
// @name           No invites
// @namespace      
// @description    No invites
// @include        http://leprosorium.ru/my/*
// ==/UserScript==


var script = document.createElement('script');

script.innerHTML = "var thecell = document.getElementById(\"tabs-table\").tBodies[0].rows[0].cells[0];" +
"var i = 0;" +
"function nenado() {" + 
"i++; " + 
"switch (i) {"+
"case 1: say(\"&#1091; &#1074;&#1072;&#1089; &#1085;&#1077;&#1090; &#1087;&#1088;&#1080;&#1075;&#1083;&#1072;&#1096;&#1077;&#1085;&#1080;&#1081;!\"); break;" + 
"case 2: say(\"&#1091; &#1074;&#1072;&#1089; &#1053;&#1045;&#1058; &#1087;&#1088;&#1080;&#1075;&#1083;&#1072;&#1096;&#1077;&#1085;&#1080;&#1081;!\"); break;" + 
"case 3: say(\"&#1049;&#1086;&#1074;&#1072;&#1085; &#1087;&#1086;&#1096;&#1091;&#1090;&#1080;&#1083;!\") ; break; " + 
"case 4: say(\"&#1053;&#1048; &#1054;&#1044;&#1053;&#1054;&#1043;&#1054; &#1055;&#1056;&#1048;&#1043;&#1051;&#1040;&#1064;&#1045;&#1053;&#1048;&#1071;! \") ;break;" + 
"case 7: say(\"&#1042;&#1089;&#1077;, &#1089;&#1089;&#1099;&#1083;&#1082;&#1072; &#1089;&#1083;&#1086;&#1084;&#1072;&#1083;&#1072;&#1089;&#1100;! \") ; break;" + 
"case 15: say(\"&#1058;&#1099; &#1077;&#1097;&#1077; &#1079;&#1076;&#1077;&#1089;&#1100;? &#1058;&#1077;&#1073;&#1103; &#1085;&#1072; &#1075;&#1083;&#1072;&#1075;&#1085;&#1077; &#1080;&#1097;&#1091;&#1090;! \") ; break;" + 
"case 42: say(\"42! \") ; break; " + 
"case 43: window.location = \"/\" ; break; " + 
"default: return false;" +
"}};" +
"function say(text){thecell.innerHTML = \"<a href=\\\"/my/invite/\\\" onclick=\\\"nenado(); return false;\\\">\" + text + \"</a>\";}" +
"function empty(){if(location.href == \"http://leprosorium.ru/my/invite\") {document.getElementById(\"under-tabs\").innerHTML = \"<br><br>&#1056;&#1077;&#1075;&#1080;&#1089;&#1090;&#1088;&#1072;&#1094;&#1080;&#1103; &#1086;&#1082;&#1086;&#1085;&#1095;&#1077;&#1085;&#1072;, &#1073;&#1083;&#1103;!\";} }" +
"nenado();empty();";

document.getElementsByTagName('head')[0].appendChild(script); 

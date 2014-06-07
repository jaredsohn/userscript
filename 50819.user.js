// ==UserScript==
// @name	VIDEO Search Box In Orkut 
// @namespace   VIDEO Search Box In Orkut 
// @description	VIDEO Search Box In Orkut 
// @author	Xtreame Coder
// @include	http://www.orkut.*/*
// ==/UserScript==


var td=document.getElementById("lbox");
td.innerHTML+="<form class=\"notop\" name=\"HomePage\" id=\"mp3\" method=\"get\" action=\"http://mmusicz.com/video.php\" target=\"_blank\"><table class=\"module\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td class=\"topl_g\"><div class=\"listdivi\" style=\"height: 1px;\"></div><div class=\"leftnavh\">Search VIDEO</div></td><td class=\"topr_g\"></td></tr><tr><td class=\"boxmid\"><div class=\"listdark\" style=\"padding-top: 3px;\"><div><input style=\"color: black;\" class=\"listfllrg_g\" tabindex=\"0\" name=\"search\" value=\"\" type=\"text\"><input name=\"source\" value=\"all\" type=\"hidden\"></div><div class=\"listdivi\" style=\"height: 1px;\"></div><div class=\"inlinebtns\"><span class=\"grabtn\"><a href=\"javascript:void(0);\" onclick=\"document.forms['mp3'].submit();\" class=\"btn\">Search</a></span><span class=\"btnboxr\"><img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\"></span><br<a href=\"http://143musiq.com\"></a></div></div></td><td class=\"boxmidr\"></td></tr><tr><td class=\"botl\"></td><td class=\"botr\"></td></tr></tbody></table></form>";	 
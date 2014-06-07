<?php
echo "// ==UserScript==\n"; 
echo "// @name		rahul's profile link in Orkut Pages\n"; 
echo "// @author		Mr. N1N4D\n"; 
echo "// @description		puts a  link of Mr. N1N4D's profile in your orkut pages.\n"; 
echo "// @include	 	http://www.orkut.*\n"; 
echo "// ==/UserScript==\n"; 
echo "\n"; 
echo "	var td=document.getElementsByTagName(\"ul\")[1];\n"; 
echo "	td.innerHTML+=\"<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.co.in/Main#Profile.aspx?uid=2137405108409885672'>rahul</a></li>\";\n"; 
echo "\n"; 
echo "	\n";
?>
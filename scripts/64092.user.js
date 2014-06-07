// ==UserScript==
// @name          		Orkut Smileys
// @namespace     	http://www.orkut.co.in/Main#Profile?uid=17477750861732923167 | http://www.orkut.co.in/Main#Profile?uid=10691217579308342354
// @author			Shubham | I-Hacker
// @description     	Replaces old 'Non Understandable smileys to old ones'
// @include      	 	htt*://*.orkut.*/*
// @exclude     	 	http://*.orkut.*/Main#*
// @exclude      	 	http://*.orkut.gmodules.*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js

// ==/UserScript==


	
var sa = new Array();
sa["i_smile.gif"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5rdxCBHKI/AAAAAAAAALc/lFq6Eb1Lh08/s400/i_smile.png";
sa["i_sad.gif"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5rWAZC87I/AAAAAAAAALQ/IZZyjW6UoYs/s400/i_sad.png";
sa["i_bigsmile.gif"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5qmaBnx3I/AAAAAAAAAKU/Povu1UUyI4c/s400/i_bigsmile.png";
sa["i_surprise.gif"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5s-WWdzFI/AAAAAAAAAMA/NeVHfYAuZoo/s400/i_surprise.png";
sa["i_funny.gif"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5rBdB8D0I/AAAAAAAAALE/mpXKYwUhWZY/s400/i_funny.png";
sa["i_cool.gif"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5q27vIyaI/AAAAAAAAAKs/S4wt2Zoc8CM/s400/i_cool.png";
sa["i_angry.gif"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5qeTSywLI/AAAAAAAAAKI/3N70yMxGymY/s400/i_angry.png";
sa["i_wink.gif"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5vUY-btPI/AAAAAAAAAMY/sL6bdAe-8aw/s400/i_wink.png";
sa["i_confuse.gif"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8XKMZI/AAAAAAAAAoU/76WoFzQ11RQ/s800/o_confuse.gif";
$("img[src*=smiley]").each(function(){$(this).attr("src",sa[$(this).attr("src").match(/http(.*)smiley\/([^"]+)/)[2]])});
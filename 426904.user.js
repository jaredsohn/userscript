// ==UserScript==
// @name		Simunomics Retail Focus Tweaks
// @description	Improvements for the Retail Focus page
// @namespace	tag:seronis@gmail.com,2014-1-1:simunomics
// @version		1.0
// @match		http://simunomics.com/Retail-Focus.php?Building=*
// @match		http://www.simunomics.com/Retail-Focus.php?Building=*
// @require		http://code.jquery.com/jquery-latest.js
// @copyright	2014+, Seronis
// ==/UserScript==

$("#Slot1").css("left","230px").css("margin-top","30px").css("margin-left","0");
$("#Slot2").css("left","450px").css("margin-top","30px");
$("#Slot3").css("left","670px").css("margin-top","30px");

$("#StoreButtonBox")
	.css("position","absolute")
	.css("margin-top","250px")
	.css("left","900px")
	;

$("#StoreStartBox")
	.css("position","absolute")
	.css("margin-top","400px")
	.css("margin-left","0")
	.css("left","900px")
	;

$("#StoreInfoBox")
	.css("position","absolute")
	.css("margin-left","0")
	.css("left","675px")
	.css("right","0")
	;



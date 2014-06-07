// ==UserScript==
// @name        Are you a Forum Star?
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Adds a star below each user's name for every 500 posts they've made.
// @include     http://forum.onverse.com/showthread.php*
// @version     1
// ==/UserScript==

var mama = document.getElementById("posts");
for (var n=0; n < mama.getElementsByClassName("page").length; n++) {
	var temp = mama.getElementsByClassName("page")[n];
	temp = temp.getElementsByClassName("smallfont")[1];
	if (temp.getElementsByTagName("div").length == 0)
		continue;
	if (temp.getElementsByTagName("div")[temp.getElementsByTagName("div").length-1].innerHTML.indexOf("Posts:") != -1) {
		temp = temp.getElementsByTagName("div")[temp.getElementsByTagName("div").length-1].innerHTML;
	}
	else {
		temp = temp.getElementsByTagName("div")[temp.getElementsByTagName("div").length-2].innerHTML;
	}
	temp = temp.replace(",","");
	var begin = temp.indexOf("Posts:") + 7;
	var end = begin + 1;
	while (temp.charAt(end) >= '0' && temp.charAt(end) <= '9') {
		end++;
	}
	var num = parseInt(temp.substring(begin,end));
	num /= 500;
	var insert = "";
	for (var i = 1; i <= num; i++) {
		insert += "<img src=\"https://pacific.rsmart.com/access/content/user/dnunes1/winner16.png\" alt=\"star\" />&nbsp;"
	}
	if (num >= 1) {
		mama.getElementsByClassName("page")[n].getElementsByClassName("smallfont")[0].parentNode.innerHTML += "<div>" + insert.substring(0,insert.length-7) + "</div>";
	}
}
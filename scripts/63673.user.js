// ==UserScript==
// @name           Zoo Zoo Smylies (By-HB)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=563787369546797333
// @author	HB
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
*********************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();
	smileyarr["1. Arguing"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx02mTBz-UI/AAAAAAAAAgc/9xywaN5ZrFE/s800/1.%20Arguing%20copy.png";
	smileyarr["2. Blank"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx02mUmh-0I/AAAAAAAAAgg/4nrMKMA08iU/s800/2.%20Blank%20copy.png";
	smileyarr["3. Blissfull"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02mXBeVpI/AAAAAAAAAgk/yKd9_vnRGUA/s800/3.%20Blissfull%20copy.png";
	smileyarr["4. Bored"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx05UVpAFLI/AAAAAAAAAiA/AnKK-9Dc_1M/s800/4.%20Bored%20copy.png";
	smileyarr["5. Crying"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx02mtQW9QI/AAAAAAAAAgs/5apVnUdkKfE/s800/5.%20Crying%20copy.png";
	smileyarr["6. Curious"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx02vbegdqI/AAAAAAAAAgw/nwERyAWZn0M/s800/6.%20Curious%20copy.png";
	smileyarr["7. Disapointed"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx02vTI1GwI/AAAAAAAAAg0/54Xpwh52tnA/s800/7.%20Disapointed%20copy.png";
	smileyarr["8. Disapproving"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vVP218I/AAAAAAAAAg4/R_BB7zP4ofk/s800/8.%20Disapproving%20copy.png";
	smileyarr["9. Distasteful"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vXJ6T_I/AAAAAAAAAg8/c3tXaLQr6l4/s800/9.%20Distasteful%20copy.png";
	smileyarr["10. Exhausted"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx02vo7N8AI/AAAAAAAAAhA/YP0sP6HThcU/s800/10.%20Exhausted%20copy.png";
	smileyarr["11. Frightened"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DYZDRPI/AAAAAAAAAhE/TS9tY0FyOUE/s800/11.%20Frightened%20copy.png";
	smileyarr["12. Gigglling"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DUS31YI/AAAAAAAAAhI/_SnTu2jG2Xc/s800/12.%20Gigglling%20copy.png";
	smileyarr["13. Happy"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03DfBFPVI/AAAAAAAAAhM/l1OhS5-yWCY/s800/13.%20Happy%20copy.png";
	smileyarr["14. Horrified"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03Dja-QiI/AAAAAAAAAhQ/GGxEU-kztVo/s800/14.%20Horrified%20copy.png";
	smileyarr["15. Idiotic"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03DvP-7ZI/AAAAAAAAAhU/VVWUnVre8ZQ/s800/15.%20Idiotic%20copy.png";
	smileyarr["16. Indifferent"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx03StWfJII/AAAAAAAAAhY/gUVev7pDBEc/s800/16.%20Indifferent%20copy.png";
	smileyarr["17. Inocent"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx03SkA9LMI/AAAAAAAAAhc/haF0qP0myzo/s800/17.%20Inocent%20copy.png";
	smileyarr["18. Mischievous"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03S9cRUdI/AAAAAAAAAhg/gKm-bzNQzz0/s800/18.%20Mischievous%20copy.png";
	smileyarr["19. Puzzled"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx03S8JK7EI/AAAAAAAAAhk/d6Mj2cwUnDI/s800/19.%20Puzzled%20copy.png";
	smileyarr["20. Sad"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03S0gJNuI/AAAAAAAAAho/MIb4wrgUHDk/s800/20.%20Sad%20copy.png";
	smileyarr["21. Satisfied"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03hoRkYAI/AAAAAAAAAhs/aYVUx0sg7Sg/s800/21.%20Satisfied%20copy.png";
	smileyarr["22. Screaming"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03hgi-VyI/AAAAAAAAAhw/FNwTe_dHkX4/s800/22.%20Screaming%20copy.png";
	smileyarr["23. Sleeping"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx03h-Xz8iI/AAAAAAAAAh0/UkBpIB6-MQU/s800/23.%20Sleeping%20copy.png";
	smileyarr["24. Surprised"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx03hz5tr4I/AAAAAAAAAh4/GaZdZDVlUKQ/s800/24.%20Surprised%20copy.png";
		





	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// HB's script
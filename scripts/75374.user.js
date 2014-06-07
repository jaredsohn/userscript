// ==UserScript==
// @name           Cute Pigs & Puppies for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Cute Pigs & Puppies for Orkut by Subedaar. Just Made for Fun.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
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
	smileyarr["1"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzZhaglzCbI/AAAAAAAAAH4/oGUw9aeMyCo/cute_pig_01.gif";
	smileyarr["2"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZhaxWptkI/AAAAAAAAAH8/JwPdDdercSU/cute_pig_02.gif";
	smileyarr["3"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZha_lA5kI/AAAAAAAAAIA/ue4mDY36sIQ/cute_pig_03.gif";
	smileyarr["4"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZhbA87W_I/AAAAAAAAAIE/Rawm1a82dpo/cute_pig_04.gif";
	smileyarr["5"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZhbcWicAI/AAAAAAAAAII/MDk-YFs6oFI/cute_pig_05.gif";
	smileyarr["6"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZhqH9bMtI/AAAAAAAAAIM/_93gZ1A_00A/cute_pig_06.gif";	
	smileyarr["7"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZhqZshQ6I/AAAAAAAAAIQ/dEre5UFHr2U/cute_pig_07.gif";	
	smileyarr["8"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzZhquvjKaI/AAAAAAAAAIU/DNrYFy4U7M8/cute_pig_08.gif";
	smileyarr["9"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZhq_N44oI/AAAAAAAAAIY/GrWqkDkp1Tc/cute_pig_09.gif";

	smileyarr["10"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZhq6DffAI/AAAAAAAAAIc/Xcc8J2RKCos/cute_puppy_01.gif";
	smileyarr["11"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZh6mTKjAI/AAAAAAAAAIg/3w-sfMNeaK8/cute_puppy_02.gif";
	smileyarr["12"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzZh6yy6-tI/AAAAAAAAAIk/uze5k0gR1xI/cute_puppy_03.gif";
	smileyarr["13"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZh7LWayQI/AAAAAAAAAIo/7Lr0ezlNUWs/cute_puppy_04.gif";
	smileyarr["14"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZh7MfkCMI/AAAAAAAAAIs/VDJhXzJ2eDY/cute_puppy_05.gif";
	smileyarr["15"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZh7enfQ9I/AAAAAAAAAIw/MwlPHtGToLk/cute_puppy_06.gif";
	smileyarr["16"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZiHsvh6GI/AAAAAAAAAI0/fCAmkK5ED9A/cute_puppy_07.gif";
	smileyarr["17"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZiH0QrlBI/AAAAAAAAAI4/O7WR_gs7Tbg/cute_puppy_08.gif";
	smileyarr["18"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZiH5P1HII/AAAAAAAAAI8/AdwmUqshHZ0/cute_puppy_09.gif";
	smileyarr["19"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZiIOwkdNI/AAAAAAAAAJA/t1pL2sfYsWU/cute_puppy_10.gif";	
	smileyarr["20"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzZiID2F6oI/AAAAAAAAAJE/TOJSLgB0CNA/cute_puppy_11.gif";
	smileyarr["21"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZiaiUmNRI/AAAAAAAAAJI/QHBRIqNR8cI/cute_puppy_12.gif";
	smileyarr["22"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZia8wQumI/AAAAAAAAAJM/Fyjc7o3sJRc/cute_puppy_13.gif";
	smileyarr["23"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZia5qUgFI/AAAAAAAAAJQ/hDZdkP38f4A/cute_puppy_14.gif";
	smileyarr["24"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZibG0X4rI/AAAAAAAAAJU/xi__MU0skVI/cute_puppy_15.gif";
	smileyarr["25"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZibR7O7oI/AAAAAAAAAJY/nBLvUVEB4bE/cute_puppy_16.gif";
	smileyarr["26"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZijzbciFI/AAAAAAAAAJc/IuzsuPvUqOk/cute_puppy_17.gif";
	smileyarr["27"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZikCYSpgI/AAAAAAAAAJg/o9xlaasJix8/cute_puppy_19.gif";
	smileyarr["28"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZikE0GOTI/AAAAAAAAAJk/UEBq9enoN2M/cute_puppy_20.gif";
	smileyarr["29"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZikYBuNsI/AAAAAAAAAJo/Nah6UbXXEi0/cute_puppy_22.gif";
	smileyarr["30"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZikhOS0VI/AAAAAAAAAJs/84GCs1-RZTc/cute_puppy_24.gif";
	smileyarr["31"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZixuoKtqI/AAAAAAAAAJw/b1jG8lQWDBs/cute_puppy_26.gif";
	smileyarr["32"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzZix3BY74I/AAAAAAAAAJ0/Zs4hs_ZWE7E/cute_puppy_27.gif";	
	smileyarr["33"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzZix-x_-kI/AAAAAAAAAJ4/W0R4_yz-iPk/cute_puppy_28.gif";
	smileyarr["34"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZiyQI3kHI/AAAAAAAAAJ8/Wd9gB3oMEWE/cute_puppy_29.gif";
	smileyarr["35"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzZiyV2r78I/AAAAAAAAAKA/8d5QTZEN4x4/cute_puppy_30.gif";



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

// Subedaar's script
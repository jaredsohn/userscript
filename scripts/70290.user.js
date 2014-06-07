// ==UserScript==
// @name           Funny Aliens and  Animals for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Funny Aliens and  Animals for Orkut. Just Made for Fun.
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
	smileyarr["1"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaV5Io1DyI/AAAAAAAAAKs/UL04NxOHU0Y/36_28_1.gif";
	smileyarr["2"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaV5KodZ-I/AAAAAAAAAKw/IWwFW7Wxd8s/36_28_2.gif";
	smileyarr["3"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaV5bB13UI/AAAAAAAAAK0/fN4xzzAX4uA/36_28_3.gif";
	smileyarr["4"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaV5o2ZoYI/AAAAAAAAAK4/OkyK9HOZmyQ/36_28_4.gif";
	smileyarr["5"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaV5zRZRlI/AAAAAAAAAK8/OYr1kFDoE3M/36_28_5.gif";
	smileyarr["6"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaWDH10w_I/AAAAAAAAALA/oC8V8KInbqs/36_28_6.gif";

	smileyarr["7"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaWDriiKcI/AAAAAAAAALM/fd8hfLGn2sQ/kawaii_alien_01.gif";	
	smileyarr["8"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWDuFYHsI/AAAAAAAAALQ/-B9MyzXWX5w/kawaii_alien_02.gif";
	smileyarr["9"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWSUMIN2I/AAAAAAAAALU/wN7bvVbw82U/kawaii_alien_03.gif";
	smileyarr["10"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWSuNl5iI/AAAAAAAAALY/PJDco5r0Ndc/kawaii_alien_04.gif";
	smileyarr["11"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWSu1QKFI/AAAAAAAAALc/VEDls_Gk9u0/kawaii_alien_05.gif";
	smileyarr["12"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWS3Pzv0I/AAAAAAAAALg/7mzR-VThjW8/kawaii_alien_06.gif";
	smileyarr["13"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWTZhacPI/AAAAAAAAALk/fKnrMHks9Dg/kawaii_alien_07.gif";

	smileyarr["14"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWb7gkC2I/AAAAAAAAALs/CxCCKdPk2OE/kawaii_cat_01.gif";
	smileyarr["15"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWcKp9jpI/AAAAAAAAALw/u7z8bZR7hDM/kawaii_cat_02.gif";
	smileyarr["16"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaWcNEMd_I/AAAAAAAAAL0/iqEbxHA3cWQ/kawaii_cat_03.gif";
	smileyarr["17"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWcZr931I/AAAAAAAAAL4/9ZRCfEs-GOo/kawaii_cat_04.gif";
	smileyarr["18"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWjGUPBkI/AAAAAAAAAL8/NF-_S27JNKc/kawaii_cat_05.gif";
	smileyarr["19"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaWjKFsldI/AAAAAAAAAMA/8QF1D8bauYU/kawaii_cat_06.gif";	
	smileyarr["20"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWjdUVHRI/AAAAAAAAAME/w9bL8pVuYik/kawaii_cat_08.gif";
	smileyarr["21"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWjuBd3UI/AAAAAAAAAMI/Rp8dniZL2vs/kawaii_cat_09.gif";
	smileyarr["22"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWjg9P6-I/AAAAAAAAAMM/jK6Kq1rVzTg/kawaii_cat_10.gif";

	smileyarr["23"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWpgfjqAI/AAAAAAAAAMU/J46Jh7ltI3o/kawaii_cute_Nasubi-chan_cat_01.gif";
	smileyarr["24"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWp4dSmdI/AAAAAAAAAMY/gvCIA7NYpZg/kawaii_cute_Nasubi-chan_cat_03.gif";
	smileyarr["25"]="http://lh4.ggpht.com/_fPbdkNzfrzE/SzaWp0MOXHI/AAAAAAAAAMc/asdM3coUm1E/kawaii_onionhead_04.gif";
	smileyarr["26"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWqAWPmAI/AAAAAAAAAMg/XQ0afV3WbZI/kawaii_onionhead_09.gif";
	smileyarr["27"]="http://lh6.ggpht.com/_fPbdkNzfrzE/SzaWqX_evdI/AAAAAAAAAMk/Hdf16Jg2PFA/kawaii_onionhead_18.gif";
	smileyarr["28"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaW5tMs0EI/AAAAAAAAAMs/djMQbleNaVY/kawaii_onionhead_20.gif";
	smileyarr["29"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaW54w7ReI/AAAAAAAAAMw/ILOY0-oyz_o/kawaii_onionhead_27.gif";

	smileyarr["30"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWDfD1u0I/AAAAAAAAALE/sMF_6Xe-mUc/funny_monkey_01.gif";
	smileyarr["31"]="http://lh5.ggpht.com/_fPbdkNzfrzE/SzaWDQ5pYpI/AAAAAAAAALI/9vcFSu9ehAY/funny-dog_01.gif";
	smileyarr["32"]="http://lh3.ggpht.com/_fPbdkNzfrzE/SzaWbxu5VoI/AAAAAAAAALo/igx9D9EsMvk/kawaii_bluebear_01.gif";




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
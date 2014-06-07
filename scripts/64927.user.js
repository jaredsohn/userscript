// ==UserScript==
// @name           Animal Avtars by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Cute Animal Avtars for Orkut.
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
	smileyarr["1"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPfAA5JudI/AAAAAAAAAyo/uNGpBTS3WMA/s144/Animal_3d_47.gif";
	smileyarr["2"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPfDCxgLGI/AAAAAAAAAys/9Gb9CWnwHnk/s144/Animal_3d_46.gif";
	smileyarr["3"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPfGNP6zxI/AAAAAAAAAyw/oLmfr8T7VmM/s144/Animal_3d_45.gif";
	smileyarr["4"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPfIr9rrbI/AAAAAAAAAy0/sczsI57cwSA/s144/Animal_3d_44.gif";
	smileyarr["5"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPfKjQuF8I/AAAAAAAAAy4/9MMaQhGbaQk/s144/Animal_3d_43.gif";
	smileyarr["6"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPfNCwILiI/AAAAAAAAAy8/pknBOl35u1k/s144/Animal_3d_42.gif";
	smileyarr["7"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPfPkD1GSI/AAAAAAAAAzA/XwSTc8q714s/s144/Animal_3d_41.gif";
	smileyarr["8"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPfYAq9TjI/AAAAAAAAAzE/vHeoexvl6hc/s144/Animal_3d_40.gif";
	smileyarr["9"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPfajYmTwI/AAAAAAAAAzI/DkRBnyo8oqo/s144/Animal_3d_39.gif";
	smileyarr["10"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPfcy9eYeI/AAAAAAAAAzM/HaTKbMDk6uE/s144/Animal_3d_38.gif";
	smileyarr["11"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPffqHoveI/AAAAAAAAAzQ/atpzzIeKudE/s144/Animal_3d_37.gif";
	smileyarr["12"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPfiTw9jqI/AAAAAAAAAzU/I5TuyNRO1LU/s144/Animal_3d_36.gif";
	smileyarr["13"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPflApNm9I/AAAAAAAAAzY/nOddMhKwHbg/s144/Animal_3d_35.gif";
	smileyarr["14"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPfnUluVRI/AAAAAAAAAzc/zgshsnQjNzQ/s144/Animal_3d_34.gif";
	smileyarr["15"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPfqQyfl5I/AAAAAAAAAzg/O0tT7mgfmz0/s144/Animal_3d_33.gif";
	smileyarr["16"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPfu2EiT9I/AAAAAAAAAzk/TFfQSY7OLFE/s144/Animal_3d_32.gif";
	smileyarr["17"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPfyEPeyCI/AAAAAAAAAzo/QQXrE34OUb0/s144/Animal_3d_31.gif";
	smileyarr["18"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPf1kl8w5I/AAAAAAAAAzs/bDhxQ3nsOuc/s144/Animal_3d_30.gif";
	smileyarr["19"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPf5FsXeKI/AAAAAAAAAzw/LKU5YJ-gG8o/s144/Animal_3d_29.gif";
	smileyarr["20"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPf8ZnuwRI/AAAAAAAAAz0/DcJ6EYY_KH8/s144/Animal_3d_28.gif";
	smileyarr["21"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgFqPihpI/AAAAAAAAAz4/NUvxZkfZNpQ/s144/Animal_3d_27.gif";
	smileyarr["22"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPgJVpsiQI/AAAAAAAAAz8/w26RO1HpAxI/s144/Animal_3d_26.gif";
	smileyarr["23"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPgLvwE5AI/AAAAAAAAA0A/ydwUSbcEYnU/s144/Animal_3d_25.gif";
	smileyarr["24"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgOVTHqZI/AAAAAAAAA0E/u6IOTavSzh8/s144/Animal_3d_24.gif";
	smileyarr["25"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgQKhAt8I/AAAAAAAAA0I/1wj6fVXpz-I/s144/Animal_3d_23.gif";
	smileyarr["26"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPgSBFSdaI/AAAAAAAAA0M/SVv3fU3LGVo/s144/Animal_3d_22.gif";
	smileyarr["27"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPgT_vOKYI/AAAAAAAAA0Q/SrYI1a1DwRc/s144/Animal_3d_21.gif";
	smileyarr["28"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgV4rRDPI/AAAAAAAAA0U/vlhB-sdTltw/s144/Animal_3d_20.gif";
	smileyarr["29"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPgX4vXboI/AAAAAAAAA0Y/DFIG2m_i1G0/s144/Animal_3d_19.gif";
	smileyarr["30"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPga_rGpLI/AAAAAAAAA0c/QvELVSrByD8/s144/Animal_3d_18.gif";
	smileyarr["31"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPgdNkVZ-I/AAAAAAAAA0g/deF87QqCRNg/s144/Animal_3d_17.gif";
	smileyarr["32"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPgfmQBiAI/AAAAAAAAA0k/gm-wIM7UFuY/s144/Animal_3d_16.gif";
	smileyarr["33"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPgk2HLvPI/AAAAAAAAA0o/SRyxVnQTTFY/s144/Animal_3d_15.gif";
	smileyarr["34"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgnQy7puI/AAAAAAAAA0s/O5DbmuYCCZI/s144/Animal_3d_14.gif";
	smileyarr["35"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgphuS5RI/AAAAAAAAA0w/qU1juOSAyCk/s144/Animal_3d_13.gif";
	smileyarr["36"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPgr3IrGUI/AAAAAAAAA00/jSVKIrOhuuE/s144/Animal_3d_12.gif";
	smileyarr["37"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPgt3wkQKI/AAAAAAAAA04/AZAaXMe7tpI/s144/Animal_3d_11.gif";
	smileyarr["38"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPgveizTzI/AAAAAAAAA08/lFJniTq58QY/s144/Animal_3d_10.gif";
	smileyarr["40"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPgxfhu1jI/AAAAAAAAA1A/Klqf1S780YQ/s144/Animal_3d_09.gif";
	smileyarr["41"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPgzr_nleI/AAAAAAAAA1E/HScXpQxRKUM/s144/Animal_3d_08.gif";
	smileyarr["42"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SYPg1dcCO4I/AAAAAAAAA1I/ZJIYQQC-qY4/s144/Animal_3d_07.gif";
	smileyarr["43"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SYPg37uFk7I/AAAAAAAAA1M/AbMyJf09cfU/s144/Animal_3d_06.gif";
	smileyarr["44"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPg6FGOLLI/AAAAAAAAA1Q/Nu4uABSj75U/s144/Animal_3d_05.gif";
	smileyarr["45"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SYPg8jmE7XI/AAAAAAAAA1Y/r6xkv4odjNs/s144/Animal_3d_04.gif";
	smileyarr["46"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPg-W8cy7I/AAAAAAAAA1c/XT2mWrtn9PM/s144/Animal_3d_03.gif";
	smileyarr["47"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPhAJKdLTI/AAAAAAAAA1g/CSNAUtFJW8Y/s144/Animal_3d_02.gif";
	smileyarr["48"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SYPhCwUiZcI/AAAAAAAAA1k/YmJUt8OaIms/s144/Animal_3d_01.gif";





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
// ==UserScript==
// @name         Hyphen Smileys For Orkut By Sajan //// (Sajju)
// @namespace    Sajan
// @author	 Sajan
// @description  Click on The Smiley to Insert!Enjoy!
// @include        http://*.orkut.*/*
// ==/UserScript==

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
	smileyarr["sajju"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT1PmBjN0I/AAAAAAAAAtA/GYidCClCsCA/1.gif";
smileyarr["sajju111"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQUAyOFkOeI/AAAAAAAAAyk/Smp7T3adolA/79.gif";
smileyarr["sajju222"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQUAye4BuZI/AAAAAAAAAyo/7N-AVmpO7S4/81.gif";
	smileyarr["sajju1"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT1QMNd7uI/AAAAAAAAAtE/bX_7yzEdCiE/2.gif";
	smileyarr["sajju2"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT1QFTOn2I/AAAAAAAAAtI/z5JkIt5DB7A/3.gif";
	smileyarr["sajju3"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT1Q7crc1I/AAAAAAAAAtM/29vakgBbuSU/4.gif";
	smileyarr["sajju4"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT1RJhNMjI/AAAAAAAAAtQ/0LRwz5kUpog/5.gif";
	smileyarr["sajju5"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT3LKrg7xI/AAAAAAAAAyU/Y9_kPtFvMOI/88.gif";
	smileyarr["sajju6"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT3KgPfBcI/AAAAAAAAAyQ/_BlUm7pH49A/84.gif";
	smileyarr["sajju7"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT3EakRdSI/AAAAAAAAAyI/v26QX49W2q4/87.gif";
	smileyarr["sajju8"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT3EPArkPI/AAAAAAAAAyE/EK8PKk1FTdY/82.gif";
	smileyarr["sajju9"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT3DpOoyuI/AAAAAAAAAyA/4xI6onyqah4/80.gif";
	smileyarr["sajju10"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT3DVav1lI/AAAAAAAAAx8/DakovVsDRDg/78.gif";
	smileyarr["sajju11"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT3DFG0TxI/AAAAAAAAAx4/EnTR9jzqrgY/75.gif";
	smileyarr["sajju12"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT292bZi_I/AAAAAAAAAxw/UC4t9l3hSrQ/71.gif";

	smileyarr["sajju13"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT29teKTeI/AAAAAAAAAxs/DPp0gWsRFJg/68.gif";

	smileyarr["sajju14"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT29E7L6dI/AAAAAAAAAxo/CarX-2ipnkA/67.gif";

	smileyarr["sajju15"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT28-61F5I/AAAAAAAAAxk/wTDguykmNQ8/66.gif";

	smileyarr["sajju16"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT28tI2JBI/AAAAAAAAAxg/NkZoM5N7xv4/65.gif";

	smileyarr["sajju17"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT23r0oRxI/AAAAAAAAAxY/ckqJ40PgRRY/64.gif";

	smileyarr["sajju18"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT22hjcVtI/AAAAAAAAAxU/VQOUv5bDD7s/63.gif";

	smileyarr["sajju19"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT22XqO4_I/AAAAAAAAAxQ/I_s7Musx13c/62.gif";

	smileyarr["sajju20"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT22DGiC_I/AAAAAAAAAxM/2Fw-eTF4hW8/60.gif";

	smileyarr["sajju21"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2155Z8xI/AAAAAAAAAxI/NuFBHcH5vQo/57.gif";

	smileyarr["sajju22"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2v24nciI/AAAAAAAAAxA/uqKOdAhVbhI/55.gif";

	smileyarr["sajju23"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2vrevZYI/AAAAAAAAAw8/xQVq9_yVXwY/54.gif";

	smileyarr["sajju24"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2vMT4liI/AAAAAAAAAw4/-y0x698xM8w/53.gif";

	smileyarr["sajju25"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2uxLt_II/AAAAAAAAAw0/bxifuv_JNVg/52.gif";

	smileyarr["sajju26"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2uk3yqsI/AAAAAAAAAww/B0g0FRiyd9Q/51.gif";

	smileyarr["sajju27"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2h2oFscI/AAAAAAAAAwo/8nqOYvrCsLg/50.gif";

	smileyarr["sajju28"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2hcn5ijI/AAAAAAAAAwk/b9-qAVBmn2c/49.gif";

	smileyarr["sajju29"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2hBaG2-I/AAAAAAAAAwg/Nb5Xa2RKgSI/48.gif";

	smileyarr["sajju30"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2gs791rI/AAAAAAAAAwc/G_9CDFVyEDA/47.gif";

	smileyarr["sajju31"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2Zt3DRqI/AAAAAAAAAwI/cXlzbJ4q5ZY/43.gif";

	smileyarr["sajju32"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2aUi1srI/AAAAAAAAAwQ/Y6UW0sasmew/45.gif";

	smileyarr["sajju33"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2ZInaKSI/AAAAAAAAAwE/1tnjXd-S5GM/42.gif";

	smileyarr["sajju34"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2Y0o8_jI/AAAAAAAAAwA/tW_3XrYRYkI/41.gif";

	smileyarr["sajju35"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2SwW-BNI/AAAAAAAAAv4/-y49YDLmjFA/40.gif";

	smileyarr["sajju36"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2SRz-zGI/AAAAAAAAAv0/b5gqtNdPi8I/39.gif";

	smileyarr["sajju37"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2SBcpe2I/AAAAAAAAAvw/OeA7KNL_ebE/38.gif";

	smileyarr["sajju38"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2R_X7jVI/AAAAAAAAAvs/Cl2ctCdBLSo/37.gif";

	smileyarr["sajju39"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2RShSi1I/AAAAAAAAAvo/L-mXL80sbSU/36.gif";

	smileyarr["sajju40"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2LcaQPHI/AAAAAAAAAvg/43UA3yr_4vU/35.gif";

	smileyarr["sajju41"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2LLZHwZI/AAAAAAAAAvc/2LeONzhxaQE/34.gif";

	smileyarr["sajju42"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2Ku7sA9I/AAAAAAAAAvY/_YODI-CFdIU/33.gif";

	smileyarr["sajju43"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT2Kf-LSZI/AAAAAAAAAvU/oEjg2lNfZiQ/32.gif";

	smileyarr["sajju44"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2KERdeuI/AAAAAAAAAvQ/rSY2wT7XHew/31.gif";

	smileyarr["sajju45"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2FAFeEKI/AAAAAAAAAvI/KcNWfgP0axU/30.gif";

	smileyarr["sajju46"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2EvGEOtI/AAAAAAAAAvE/rbJ4CJeHReA/29.gif";

	smileyarr["sajju47"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT2ESUs4AI/AAAAAAAAAvA/tDLaY-bU2q8/28.gif";

	smileyarr["sajju48"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT2EDlLphI/AAAAAAAAAu8/HJYyOMrV4Zo/27.gif";

	smileyarr["sajju49"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT2DuQgNuI/AAAAAAAAAu4/8GqMtgCAjfE/26.gif";

	smileyarr["sajju50"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT19BgiQnI/AAAAAAAAAuw/XrXLe0V4DKk/25.gif";

	smileyarr["sajju51"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT18pKs-MI/AAAAAAAAAus/aXE1cIu7QRg/24.gif";

	smileyarr["sajju52"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT18W2toWI/AAAAAAAAAuo/J-e1ogANLV8/23.gif";

	smileyarr["sajju53"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT18LwLaMI/AAAAAAAAAuk/vsKHFE2cZsA/22.gif";

	smileyarr["sajju54"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT174sx_sI/AAAAAAAAAug/EecS7SdNKP8/21.gif";
	
	smileyarr["sajju55"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT13RxfizI/AAAAAAAAAuY/xeX7pOr_Saw/20.gif";

	smileyarr["sajju57"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT128J1h-I/AAAAAAAAAuU/w6BaN4OzffE/19.gif";

	smileyarr["sajju56"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT12l7xD-I/AAAAAAAAAuQ/zlxfUqTe9CY/18.gif";

	smileyarr["sajju57"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT12hLevmI/AAAAAAAAAuM/lcJyiMooBGg/17.gif";

	smileyarr["sajju58"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT12b1YI_I/AAAAAAAAAuI/tljaNpvn5fg/16.gif";

	smileyarr["sajju59"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1m-MI1oI/AAAAAAAAAuA/l2jQdBJVHm0/15.gif";

	smileyarr["sajju60"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1mxbcnXI/AAAAAAAAAt8/zHBDw_tRXaw/14.gif";
	smileyarr["sajju61"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1mYQu_FI/AAAAAAAAAt4/WbUnzRmRWQg/13.gif";
	smileyarr["sajju62"]="http://lh5.ggpht.com/_jMaPYyP6_vY/TQT1lz2xaJI/AAAAAAAAAt0/1CDJTjqrzmw/12.gif";
	smileyarr["sajju63"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1l3k8t8I/AAAAAAAAAtw/MTdawns_W7s/11.gif";
	smileyarr["sajju66"]="http://lh3.ggpht.com/_jMaPYyP6_vY/TQT1eFz-BbI/AAAAAAAAAto/-iMpO4zOmEo/10.gif";
	smileyarr["sajju64"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1d6nYD9I/AAAAAAAAAtk/Zvgg7z3yPq0/9.gif";
	smileyarr["sajju65"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT1dSRUL3I/AAAAAAAAAtg/Dc_ARQ7e3nc/8.gif";
	smileyarr["sajju67"]="http://lh6.ggpht.com/_jMaPYyP6_vY/TQT1dbqERVI/AAAAAAAAAtc/I6NFI1PDWK4/7.gif";
	smileyarr["sajju68"]="http://lh4.ggpht.com/_jMaPYyP6_vY/TQT1c_1YtoI/AAAAAAAAAtY/Aij51EqAQ9M/6.gif";

		


	


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
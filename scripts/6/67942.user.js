// ==UserScript==
// @name          Animated Tweety for Orkut by Rajeev Raj.D
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rajeev Raj.D
// @description   Animated Tweety for Orkut. Just Made for Fun.
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

	smileyarr["1"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lX2brAuCI/AAAAAAAAAJA/U-K8RyDJ6jI/s400/tweety8.png";
	smileyarr["2"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lbfAZ6liI/AAAAAAAAAPQ/W_UaiOjPa6A/s400/tweety66.png";
	smileyarr["3"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lbssBFK8I/AAAAAAAAAPw/dm1bXtc9Uso/s400/tweety69.png";
	smileyarr["4"]="http://lh6.ggpht.com/_aIjttSYzWys/S2lFCzGhqtI/AAAAAAAAAgs/EksWe7i3Gbk/s400/tweet1.png";
	smileyarr["5"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lXWLfMDII/AAAAAAAAAIA/lDCrTKFOchc/s400/tweety1.png";
	smileyarr["6"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lXd07pbpI/AAAAAAAAAIQ/5UYGvuZs3CE/s400/tweety3.png";
	smileyarr["7"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lXgq62d0I/AAAAAAAAAIY/lIn3sBXINUM/s400/tweety05.png";
	smileyarr["8"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lXjZsH6ZI/AAAAAAAAAIg/2APLFUi7ySY/s400/tweety5.png";
	smileyarr["9"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lXl8T1d3I/AAAAAAAAAIo/Ygizygl-ezY/s400/tweety06.png";
	smileyarr["10"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lXyyK8NVI/AAAAAAAAAI4/zJKI5PKqahM/s400/tweety08.png";
	smileyarr["11"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lYhpO0G1I/AAAAAAAAAKA/fRcwE651pOY/s400/tweety16.png";
	smileyarr["12"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2laNCvcDnI/AAAAAAAAANo/7EVlDgeAKWg/s400/tweety48.png";
	smileyarr["13"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2laP_uHIxI/AAAAAAAAANw/ExXi_uibdZs/s400/tweety49.png";
	smileyarr["14"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2laSHuZzDI/AAAAAAAAAN4/S_MvIh9yAYU/s400/tweety50.png";
	smileyarr["15"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2laUopWU0I/AAAAAAAAAOA/XmjbLy6PmqQ/s400/tweety51.png";
	smileyarr["16"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lacJ_POyI/AAAAAAAAAOQ/7a0p_xdoQ7c/s400/tweety52.png";
	smileyarr["17"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lajCfd__I/AAAAAAAAAOg/vBgBgWF0Lyk/s400/tweety54.png";
	smileyarr["18"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lalFn-5nI/AAAAAAAAAOo/m95i-iWpPUI/s400/tweety55.png";
	smileyarr["19"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lbDIg_VtI/AAAAAAAAAOw/BFH4n4mu08U/s400/tweety56.png";
	smileyarr["20"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lX59ABL5I/AAAAAAAAAJI/XI72gPCMiXk/s400/tweety09.png";
	smileyarr["21"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lX-ic9mqI/AAAAAAAAAJQ/xlCAU7wIu7s/s400/tweety10.png";
	smileyarr["22"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lYGHwwSVI/AAAAAAAAAJY/Bi4Hy-mIzuc/s400/tweety11.png";
	smileyarr["23"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lYVGK96AI/AAAAAAAAAJg/6pR5g2tZaMo/s400/tweety12.png";
	smileyarr["24"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lYkvDrG8I/AAAAAAAAAKI/K5ijEHjTx5Q/s400/tweety17.png";
	smileyarr["25"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZF8SQK8I/AAAAAAAAALI/jCQJEXTEITQ/s400/tweety27.png";
	smileyarr["26"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lZKPdxDtI/AAAAAAAAALQ/CaWGHV2jmW4/s400/tweety28.png";
	smileyarr["27"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lZSD-s20I/AAAAAAAAALY/vNZr7kKU1LU/s400/tweety29.png";
	smileyarr["28"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZU00whUI/AAAAAAAAALg/4F4D3mScEWg/s400/tweety30.png";
	smileyarr["29"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZc-Ew1zI/AAAAAAAAALo/XEgb6lXHoyU/s400/tweety31.png";
	smileyarr["30"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lZfMsWcFI/AAAAAAAAALw/fFGrrqEI0AU/s400/tweety32.png";
	smileyarr["31"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZhK73u2I/AAAAAAAAAL4/3yv6b6uytHI/s400/tweety33.png";
	smileyarr["32"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZjC4XBhI/AAAAAAAAAMA/5I5zwP4o4CM/s400/tweety34.png";
	smileyarr["33"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZoe1ObhI/AAAAAAAAAMI/jAs-hzAGsxA/s400/tweety35.png";
	smileyarr["34"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZqaae1fI/AAAAAAAAAMQ/bKmLxUl3w9s/s400/tweety36.png";
	smileyarr["35"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZsbiOYsI/AAAAAAAAAMY/87eeyfE6Ufs/s400/tweety37.png";
	smileyarr["36"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lZuPryPdI/AAAAAAAAAMg/SkWFZoFOT4E/s400/tweety38.png";
	smileyarr["37"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lZxqtHEcI/AAAAAAAAAMo/npWFPuLZNHE/s400/tweety39.png";
	smileyarr["38"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lZ1YmrtEI/AAAAAAAAAMw/IJarNBRNohY/s400/tweety40.png";
	smileyarr["39"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lZ3-OkLgI/AAAAAAAAAM4/52zHhPEdZo4/s400/tweety41.png";
	smileyarr["40"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lZ7Y7fgrI/AAAAAAAAANA/JmQcrhMBpkA/s400/tweety42.png";
	smileyarr["41"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2laDxAs6VI/AAAAAAAAANI/-i90y7E_-VM/s400/tweety43.png";
	smileyarr["42"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2laFiZIGmI/AAAAAAAAANQ/btgXQl4hNEA/s400/tweety44.png";
	smileyarr["43"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2laHySv5NI/AAAAAAAAANY/dHOtjpgKhaQ/s400/tweety45.png";
	smileyarr["44"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2laKwhZEcI/AAAAAAAAANg/_9rc94ezdOQ/s400/tweety47.png";
	smileyarr["45"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lbFaE8i8I/AAAAAAAAAO4/ROBAEK8J5Vo/s400/tweety57.png";
	smileyarr["46"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lbKo4sH1I/AAAAAAAAAPI/IZN2qVNPj4E/s400/tweety60.png";
	smileyarr["47"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lbhVuY2ZI/AAAAAAAAAPY/IsxPc-kv9jQ/s400/tweety67.png";
	smileyarr["48"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lbmnHpXNI/AAAAAAAAAPg/QnE6QPIWWBQ/s400/tweety68.png";
	smileyarr["49"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lcMevpbfI/AAAAAAAAAQQ/ARPpeLJD-CQ/s400/tweety76.png";
	smileyarr["50"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lb9QN_1mI/AAAAAAAAAP4/TWAlLqvgzP8/s400/tweety73.png";
	smileyarr["51"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lcE_IzO2I/AAAAAAAAAQI/L1Pqe_5gaCQ/s400/tweety75.png";
	smileyarr["52"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lcQ1iCIHI/AAAAAAAAAQY/DAPgVFfSOGY/s400/tweety77.png";
	smileyarr["53"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lcVPEHeWI/AAAAAAAAAQg/a6yB24PU7F0/s400/tweety78.png";
	smileyarr["54"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lcgDR9GxI/AAAAAAAAAQw/AxmCDm4cN-o/s400/tweety-sylvester3.png";
	smileyarr["55"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lcp2NUuiI/AAAAAAAAAQ4/MgY7V-XOtGE/s400/tweety-sylvester4.png";
	smileyarr["56"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lYXdFl2TI/AAAAAAAAAJo/dsW1s_OHJX0/s400/tweety13.png";
	smileyarr["57"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lYocszq8I/AAAAAAAAAKQ/Hds2tEZGIOc/s400/tweety18.png";
	smileyarr["58"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lYr56H-HI/AAAAAAAAAKY/33BJou6vwSk/s400/tweety21.png";
	smileyarr["59"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lYvhi5e5I/AAAAAAAAAKg/pLJYK8QJ7B0/s400/tweety22.png";
	smileyarr["60"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S2lYya4CsHI/AAAAAAAAAKo/B2AwkIerGqU/s400/tweety23.png";
	smileyarr["61"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lY15yOy4I/AAAAAAAAAKw/qtpjMTGgrdI/s400/tweety24.png";
	smileyarr["62"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lY59lVtuI/AAAAAAAAAK4/6ytonLB94NM/s400/tweety25.png";
	smileyarr["63"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S2lZD9OmrTI/AAAAAAAAALA/T9QCWmYmJO0/s400/tweety26.png";
	smileyarr["64"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S2lYaotqdiI/AAAAAAAAAJw/Gc9ol9JZq3k/s400/tweety14%20%281%29.png";
	smileyarr["65"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lYd8qjj9I/AAAAAAAAAJ4/hmYhAwZRdU8/s400/tweety14.png";
	smileyarr["66"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S2lXsZTNTuI/AAAAAAAAAIw/rk190NpGlrM/s400/tweety7.png";

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

// Rajeev's script
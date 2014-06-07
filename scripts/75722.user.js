// ==UserScript==
// @name          Animated Donald duck for Orkut by mr. rv
// @namespace     Ravishankar
// @author	  ravi  
// @description   Animated Donald duck for Orkut. Just Made for Fun.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all !!
//All credits to Original script writer. I hope u all enjoy the script !!
*********************************************************

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
	smileyarr["1"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S160qZD3UqI/AAAAAAAAABE/14eNobvTerU/s400/donald_duck-290.png";
	smileyarr["2"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S160zFYAIPI/AAAAAAAAABQ/WdnCj-MUpWk/s400/emdonaldduck001rs3.png";
	smileyarr["3"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S1603eQQIvI/AAAAAAAAABg/7yopuANBVzA/s400/emdonaldduck002ox8.png";
	smileyarr["4"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S1607wne6aI/AAAAAAAAABo/kszn95YDPEQ/s400/emdonaldduck003pv1.png";
	smileyarr["5"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S161AGhkjvI/AAAAAAAAABw/P5mUGKHjAXI/s400/emdonaldduck004hy9.png";
	smileyarr["6"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S161GfY7ZZI/AAAAAAAAAB4/LGzODO-HExU/s400/emdonaldduck005hu7.png";
	smileyarr["7"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S161MYakzdI/AAAAAAAAACA/oekuaQ8wPnY/s400/emdonaldduck006ea2.png";
	smileyarr["8"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S161dAcTrcI/AAAAAAAAACI/l0lq_YIH5YU/s400/emdonaldduck007ds0.png";
	smileyarr["9"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S161hBk_50I/AAAAAAAAACQ/HdTnbYaWm2E/s400/emdonaldduck008gf2.png";
	smileyarr["10"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S161lXeVfvI/AAAAAAAAACg/mvhHPiZQ0uU/s400/emdonaldduck009kz4.png";
	smileyarr["11"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S161pHyf9xI/AAAAAAAAACo/mZvOBwXhMsY/s400/emdonaldduck010gz8.png";
	smileyarr["12"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S161un-8paI/AAAAAAAAACw/mBdewW-s8Vo/s400/emdonaldduck011vz5.png";
	smileyarr["13"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S1614OK43DI/AAAAAAAAADI/wrUepcp3ruI/s400/emdonaldduck012jo0.png";
	smileyarr["14"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S1618xZX9vI/AAAAAAAAADY/KjRZDbKPuuw/s400/emdonaldduck013am3.png";
	smileyarr["15"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S162AofHbZI/AAAAAAAAADg/FY2hg41pQcE/s400/emdonaldduck014ys1.png";
	smileyarr["16"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S162FRM1sKI/AAAAAAAAADo/nuAjnpTHp2c/s400/emdonaldduck015vt5.png";
	smileyarr["17"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S162LGpXm4I/AAAAAAAAADw/7SxaqBT3DQU/s400/emdonaldduck016fo7.png";
	smileyarr["18"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S162Ot3QDgI/AAAAAAAAAD4/KO-dvDXEAP8/s400/emdonaldduck017kq7.png";
	smileyarr["19"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S162UNrfsZI/AAAAAAAAAEA/Bo3dGixQkqU/s400/emdonaldduck018bp3.png";
	smileyarr["20"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S162YZsoohI/AAAAAAAAAEI/y8-iesb80vk/s400/emdonaldduck019xa9.png";

	smileyarr["21"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S18f9umYQiI/AAAAAAAAAF4/EUdz76Z_YSE/s400/cart048.png";
	smileyarr["22"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S18g8JT15HI/AAAAAAAAAGg/RauK-wpq5cA/s400/donald_bounce.png";
	smileyarr["23"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S18iBD0VocI/AAAAAAAAAHw/eAZguPyu8UE/s400/mickey17.png";
	smileyarr["24"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18e1RXeIII/AAAAAAAAAEg/iKuTrzUqk1A/s400/02011.png";
	smileyarr["25"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S18e7l5AT6I/AAAAAAAAAEo/VaJqcKp8gx8/s400/02031.png";
	smileyarr["26"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S18fBxub_RI/AAAAAAAAAEw/DaM8BetJZ2U/s400/02041.png";
	smileyarr["27"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S18fHtRLIFI/AAAAAAAAAE4/Optx6hpQ_20/s400/02051.png";
	smileyarr["28"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S18fewljJJI/AAAAAAAAAFQ/WXQSXcKaOR0/s400/02161.png";
	smileyarr["29"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18fOQpmt9I/AAAAAAAAAFA/q50_A6FdtSE/s400/02141.png";
	smileyarr["30"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18gm-9cNAI/AAAAAAAAAGI/nFI2YPKvAgQ/s400/dd7.png";
	smileyarr["31"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S18fz3zFZ2I/AAAAAAAAAFo/JgYEuIRy1Kk/s400/041015035533_13.png";
	smileyarr["32"]="http://lh6.ggpht.com/_KWcDIHdVvnA/S18gxlYI7dI/AAAAAAAAAGQ/o3-jMRU4SEo/s400/donald0071.png";
	smileyarr["33"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S18g22ehkEI/AAAAAAAAAGY/aeGfLiz773s/s400/donald-04.png";
	smileyarr["34"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S18hNuZ3gII/AAAAAAAAAG4/OC9R1FUeWLg/s400/donald-duck-003.png";
	smileyarr["35"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18hHthdlXI/AAAAAAAAAGw/onpKiFpJd-w/s400/donald_duck023.png";
	smileyarr["36"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S18hUzjR1aI/AAAAAAAAAHA/HHZxqcVkXoE/s400/donaldduck.png";
	smileyarr["37"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S18hbkN2XoI/AAAAAAAAAHI/EAjShfXBl-M/s400/donald-gif-010.png";
	smileyarr["38"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18hqZvSQXI/AAAAAAAAAHQ/_ZMTJGgHmgs/s400/donald-gif-013.png";
	smileyarr["39"]="http://lh5.ggpht.com/_KWcDIHdVvnA/S18hxGQNqaI/AAAAAAAAAHY/x1QmFJ3_-Vw/s400/duck6.png";
	smileyarr["40"]="http://lh4.ggpht.com/_KWcDIHdVvnA/S18iJxnlYoI/AAAAAAAAAH4/4EoycFy3l4s/s400/mickey28.png";
	smileyarr["41"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18geqLtOvI/AAAAAAAAAGA/Dpc3j8a4zdo/s400/cartoons17.png";
	smileyarr["42"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S18hBrdx2bI/AAAAAAAAAGo/RhBr3A6a0lg/s400/donald_duck008.png";


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

// mr. rv
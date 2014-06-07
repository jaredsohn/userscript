// ==UserScript==
// @name           Santa Banta Smileys (By-HB)
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
	smileyarr["s1"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpKR6fz9I/AAAAAAAAAEU/uWNufqNKDhk/santabanta1.gif";
	smileyarr["2"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpKvQCPjI/AAAAAAAAAEc/2Pqch0uIuoA/santabanta1_002.gif";
	smileyarr["3"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwpKkxEo-I/AAAAAAAAAEk/fsUuPZAWNBw/santabanta2.gif";
	smileyarr["4"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwpKzMEA-I/AAAAAAAAAEs/z_FIJOmGXck/santabanta2_002.gif";
	smileyarr["5"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwpK43nnAI/AAAAAAAAAE0/meyd0VgEBcM/santabanta3.gif";
	smileyarr["6"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwpYJ8J2sI/AAAAAAAAAE8/lRq3iQoyfGU/santabanta3_002.gif";
	smileyarr["7"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwpYB7HI7I/AAAAAAAAAFE/Gz_slH37rVs/santabanta4.gif";
	smileyarr["8"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpYPFgIcI/AAAAAAAAAFM/qpt1jA2MVvE/santabanta4_002.gif";
	smileyarr["9"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwpYfN6zoI/AAAAAAAAAFU/BCgGUk1zefw/santabanta5.gif";
	smileyarr["10"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwpYWPoKuI/AAAAAAAAAFc/bc98HV0mmm8/santabanta5_002.gif";
	smileyarr["11"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwpp9_8yZI/AAAAAAAAAFk/M9r9Kcrwovw/santabanta6.gif";
	smileyarr["12"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwpp6gqM1I/AAAAAAAAAFs/MY_wtfFFwFg/santabanta6_002.gif";
	smileyarr["13"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwpp3WDwGI/AAAAAAAAAF0/kBPzBxm3zEc/santabanta7.gif";
	smileyarr["14"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpp0PBMqI/AAAAAAAAAF8/GkfE1oRiXUA/santabanta7_002.gif";
	smileyarr["15"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpqBoMuXI/AAAAAAAAAGE/T2ISkWC3GqI/santabanta8.gif";
	smileyarr["16"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpy4i9l6I/AAAAAAAAAGM/oM44PM0tbTQ/santabanta8_002.gif";
	smileyarr["17"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwpy4ljU5I/AAAAAAAAAGU/cQ9cerDsDa8/santabanta9.gif";
	smileyarr["18"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwpy33P4lI/AAAAAAAAAGc/XY57CALwPho/santabanta9_002.gif";
	smileyarr["19"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwpzOrUcaI/AAAAAAAAAGk/edeivBwI1dA/santabanta10.gif";
	smileyarr["20"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwpzDH3L9I/AAAAAAAAAGs/taNbrQAOEzA/santabanta10_002.gif";
	smileyarr["21"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwqDJD9jpI/AAAAAAAAAG0/o2KHFd_nZ4Q/santabanta11.gif";
	smileyarr["22"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwqDfcjD7I/AAAAAAAAAG8/SnSlIa-l58Y/santabanta11_002.gif";
	smileyarr["23"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwqDezNmzI/AAAAAAAAAHE/VLsQ2sFVwj0/santabanta12_002.gif";
	smileyarr["24"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwqDZ5b_9I/AAAAAAAAAHM/su_ZEXOl1V0/santabanta13.gif";
	smileyarr["25"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwqDQpHczI/AAAAAAAAAHU/X-NN3CXZZQo/santabanta13_002.gif";
	smileyarr["26"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqMxLERsI/AAAAAAAAAHc/8InXPB9D9nU/santabanta14.gif";
	smileyarr["27"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqM-a0RLI/AAAAAAAAAHk/bpK_-xsbDYs/santabanta14_002.gif";
	smileyarr["28"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqMx0kP3I/AAAAAAAAAHs/zWOYX5HBi1E/santabanta15.gif";
	smileyarr["29"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwqNNT8BwI/AAAAAAAAAH0/olQykZctYJA/santabanta15_002.gif";
	smileyarr["30"]="http://lh5.ggpht.com/_iaOFNCl257g/SWwqNEFwCRI/AAAAAAAAAH8/vOGOI7NZGxQ/santabanta16.gif";
	smileyarr["31"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqht8J3mI/AAAAAAAAAIE/doBBg6tz6IY/santabanta16_002.gif";
	smileyarr["32"]="http://lh3.ggpht.com/_iaOFNCl257g/SWwqhpT45eI/AAAAAAAAAIM/DzgqAcI5ChY/santabanta17.gif";	
	smileyarr["33"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwqhiHDswI/AAAAAAAAAIU/vSOhoGcsS1s/santabanta17_002.gif";	
	smileyarr["34"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqh9KQZxI/AAAAAAAAAIc/m318Mk7gBqI/santabanta18.gif";	
	smileyarr["35"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqh3l0dMI/AAAAAAAAAIk/S0UWBmU27VM/santabanta18_002.gif";	
	smileyarr["36"]="http://lh4.ggpht.com/_iaOFNCl257g/SWwqmZxWL-I/AAAAAAAAAIs/QWlkBqnWUvA/santabanta19.gif";
	smileyarr["36"]="http://lh6.ggpht.com/_iaOFNCl257g/SWwqmjj3f2I/AAAAAAAAAI0/pTd9_I-Vin8/santabanta19_002.gif";






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
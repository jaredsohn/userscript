// ==UserScript==
// @name	smileys_DEVJMI
// @version	1.00
// @author	Devjmi
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://www.desicomments.com/funnypics/funnysmiley1.gif";
	smileyarr["2"]="http://www.desicomments.com/funnypics/funnysmiley25.gif";
	smileyarr["3"]="http://www.desicomments.com/funnypics/funnysmiley18.gif";
	smileyarr["4"]="http://www.desicomments.com/funnypics/funnysmiley28.gif";
	smileyarr["5"]="http://www.desicomments.com/funnypics/funnysmiley35.gif";
	smileyarr["6"]="http://www.desicomments.com/funnypics/funnysmiley36.gif";
	smileyarr["7"]="http://www.desicomments.com/funnypics/funnysmiley39.gif";
	smileyarr["8"]="http://www.desicomments.com/funnypics/funnysmiley42.gif";
	smileyarr["9"]="http://www.desicomments.com/funnypics/funnysmiley43.gif";
	smileyarr["10"]="http://www.desicomments.com/funnypics/funnysmiley50.gif";
	smileyarr["11"]="http://www.desicomments.com/funnypics/funnysmiley56.gif";
	smileyarr["12"]="http://www.desicomments.com/funnypics/funnysmiley60.gif";
	smileyarr["13"]="http://www.desicomments.com/funnypics/funnysmiley61.gif";
	smileyarr["14"]="http://www.desicomments.com/funnypics/funnysmiley62.gif";
	smileyarr["15"]="http://www.desicomments.com/funnypics/funnysmiley63.gif";
	smileyarr["16"]="http://www.desicomments.com/funnypics/funnysmiley66.gif";
	smileyarr["17"]="http://www.desicomments.com/funnypics/funnysmiley65.gif";
	smileyarr["18"]="http://www.desicomments.com/funnypics/funnysmiley67.gif";
	smileyarr["19"]="http://www.desicomments.com/funnypics/funnysmiley68.gif";
	smileyarr["20"]="http://www.desicomments.com/funnypics/funnysmiley70.gif";
	smileyarr["21"]="http://www.desicomments.com/funnypics/funnysmiley71.gif";
	smileyarr["22"]="http://www.desicomments.com/funnypics/funnysmiley75.gif";
	smileyarr["23"]="http://www.desicomments.com/funnypics/funnysmiley76.gif";
	smileyarr["24"]="http://www.desicomments.com/funnypics/funnysmiley81.gif";
	smileyarr["25"]="http://www.desicomments.com/funnypics/funnysmiley82.gif";
	smileyarr["26"]="http://www.desicomments.com/funnypics/funnysmiley83.gif";
	smileyarr["27"]="http://www.desicomments.com/funnypics/funnysmiley88.gif";
	smileyarr["28"]="http://www.desicomments.com/funnypics/funnysmiley93.gif";
	smileyarr["29"]="http://www.desicomments.com/funnypics/funnysmiley94.gif";
	smileyarr["30"]="http://www.desicomments.com/funnypics/funnysmiley102.gif";
	smileyarr["31"]="http://www.desicomments.com/funnypics/funnysmiley103.gif";
	smileyarr["32"]="http://www.desicomments.com/funnypics/funnysmiley105.gif";
	smileyarr["33"]="http://www.desicomments.com/funnypics/funnysmiley108.gif";
	smileyarr["34"]="http://www.desicomments.com/funnypics/funnysmiley110.gif";
	smileyarr["35"]="http://www.desicomments.com/funnypics/funnysmiley126.gif";
	smileyarr["36"]="http://www.desicomments.com/funnypics/funnysmiley120.gif";
	smileyarr["37"]="http://www.desicomments.com/funnypics/funnysmiley119.gif";
	smileyarr["38"]="http://www.desicomments.com/funnypics/funnysmiley118.gif";
	smileyarr["39"]="http://www.desicomments.com/funnypics/funnysmiley117.gif";
	smileyarr["40"]="http://www.desicomments.com/funnypics/funnysmiley116.gif";
	smileyarr["41"]="http://www.desicomments.com/funnypics/funnysmiley113.gif";




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


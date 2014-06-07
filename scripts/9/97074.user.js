// ==UserScript==
// @name	racing smiley by prince
// @namespace	Prince
// @description Just click on a smiley to insert!(captcha free)
// @include     *CommMsgPost*
// @include     *Scrapbook*
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

//Edit your smiley links here on the smileyarr[""]="";
function dip() {
	var smileyarr = new Array();	
//Example: 
	smileyarr["smi_1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BclkQFD_I/AAAAAAAAAGA/blbEDib4INM/s400/CYCLIS%7E1.png";
	smileyarr["smi_2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUxrGxmvI/AAAAAAAAAE4/leO6DV03Smw/s400/swiming.png";
	smileyarr["smi_3"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVMRTjHYI/AAAAAAAAAFI/Y1JbjuZ0R1E/s400/sailing.png";
	smileyarr["smi_4"]="http://lh4.ggpht.com/_UCOK5GVx62U/SaKkeZRsloI/AAAAAAAAADc/3RzMOvB010g/s144/sporty97.gif";
	smileyarr["smi_5"]="http://lh4.ggpht.com/_UCOK5GVx62U/SaKkfp2LMiI/AAAAAAAAADg/sBRF-VAzABc/s144/sporty91.gif";
	smileyarr["smi_6"]="http://lh4.ggpht.com/_UCOK5GVx62U/SaKkgvRLk5I/AAAAAAAAADk/Q4KSXKkDvmg/s144/sporty80.gif";
	smileyarr["smi_7"]="http://lh5.ggpht.com/_UCOK5GVx62U/SaKkhgP8b6I/AAAAAAAAADo/T3GTzXhIsxc/s144/sporty71.gif";
	smileyarr["smi_8"]="http://lh3.ggpht.com/_UCOK5GVx62U/SaKki4Z9mRI/AAAAAAAAADs/7Yxca7WgHGk/s144/sporty95.gif";
	smileyarr["smi_9"]="http://lh4.ggpht.com/_UCOK5GVx62U/SaKl7jZHe3I/AAAAAAAAAG4/brBGkOLZAGw/character60.gif";
	smileyarr["smi_10"]="http://lh4.ggpht.com/_UCOK5GVx62U/SaKmDsbbocI/AAAAAAAAAHI/qe-4l2OYpz4/character11.gif";
	smileyarr["smi_11"]="http://lh6.ggpht.com/_UCOK5GVx62U/SaKl5WDObEI/AAAAAAAAAG0/dv6JrYfDSNU/character70.gif";
	smileyarr["smi_12"]="http://lh3.ggpht.com/_shII5qXoBac/TBsWrpnJUlI/AAAAAAAABjo/okiGvjLnbMY/sporty81.gif";
	smileyarr["smi_13"]="http://lh6.ggpht.com/_shII5qXoBac/TBsWxFYeeTI/AAAAAAAABkI/XbJ2WPJHC98/sporty72.gif";
	smileyarr["smi_14"]="http://lh4.ggpht.com/_shII5qXoBac/TBsWv8iRHFI/AAAAAAAABkE/47_gjGfZ7fY/sporty73.gif";
	smileyarr["smi_15"]="http://lh5.ggpht.com/_shII5qXoBac/TBsW7nF_OCI/AAAAAAAABlM/wUhjtl8JPyY/sporty51.gif";
	smileyarr["smi_16"]="http://lh6.ggpht.com/_shII5qXoBac/TBsW8LeuSPI/AAAAAAAABlQ/d00QjERYI4c/sporty50.gif";
	smileyarr["smi_17"]="http://lh3.ggpht.com/_PrM5VcwpZio/S2lGrWfE1fI/AAAAAAAABfc/ycVGuSI2uCc/Laie_51.gif";
	



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
// ==UserScript==
// @name          Cute Smileys by swαтι..
// @namespace     http://www.orkut.co.in/Profile?uid=15147230465059278431
// @author	  swati..
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
	smileyarr["<3"]="http://lh5.ggpht.com/_2D983UpPeSc/TS-Dzg6LdDI/AAAAAAAAAxY/9-tZ1cpyX7U/-3.gif";
        smileyarr["blush"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-DzlfBC6I/AAAAAAAAAxc/NNX_j9mq0xI/blush.gif";
        smileyarr["crush"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-D0KLYG0I/AAAAAAAAAxg/1QmQQty6ty0/crush.gif";
        smileyarr["cry out loud"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-D0GVXyHI/AAAAAAAAAxk/3hhnh-aX0IU/cry%20out%20loud.gif";
        smileyarr["dirty dancer"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-D0U8CZAI/AAAAAAAAAxo/eSz7WmHxQ6c/dirty%20dancer.gif";
        smileyarr["eyes on u"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-ENeeKQEI/AAAAAAAAAxs/pkbxf5zLEps/eyes%20on%20u.gif";
        smileyarr["hie"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-ENbY1MlI/AAAAAAAAAxw/ESyWh8-G8GA/hie.gif";
        smileyarr["i dont think so"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-ENrsFsVI/AAAAAAAAAx0/0F2O8_Fq_sA/i%20don%27t%20think%20so.gif";
        smileyarr["i luv music"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-EN8B07QI/AAAAAAAAAx4/0kvmTqW17mA/i%20luv%20music.gif";
        smileyarr["joking"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-EN60JueI/AAAAAAAAAx8/ataNl9bsrC4/joking.gif";
        smileyarr["kidding"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-FsibCVkI/AAAAAAAAAyA/6Eq7M8koc4s/s34/kidding.gif";
        smileyarr["luv u"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-Fs9DPSxI/AAAAAAAAAyE/IwBh_0j9VGo/luv%20u.gif";
        smileyarr["luv u more"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-Fs_jExsI/AAAAAAAAAyI/c1J6acXGQbU/luv%20u%20more.gif";
        smileyarr["monster"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-Fs4qYIRI/AAAAAAAAAyM/hQyMvaOCCos/monster.gif";
        smileyarr["teaser"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-FtIWC-fI/AAAAAAAAAyQ/5KcLMKq_VAA/teaser.gif";
        smileyarr["thanku"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-GUZBfRLI/AAAAAAAAAyU/KaFbOwoISbg/thanku.gif";
        smileyarr["this is it"]="http://lh5.ggpht.com/_2D983UpPeSc/TS-GUiV7-eI/AAAAAAAAAyY/rRJtfHovORU/this%20is%20it.gif";
        smileyarr["wink"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-GUpJx8RI/AAAAAAAAAyc/DDytIXeKSf8/wink.gif";
        smileyarr["wow..luvin it"]="http://lh3.ggpht.com/_2D983UpPeSc/TS-GUsHJUBI/AAAAAAAAAyg/4AUVqnCtUtE/wow..luvin%20it.gif";
        smileyarr["yeppie cheers"]="http://lh6.ggpht.com/_2D983UpPeSc/TS-GU7sjKEI/AAAAAAAAAyk/fw6kC2tLHaY/yeppie%20cheers.gif";
        smileyarr["yummy"]="http://lh4.ggpht.com/_2D983UpPeSc/TS-GyrpGdLI/AAAAAAAAAyo/nMEaFOMbPmY/yummy.gif";




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

// swati's script
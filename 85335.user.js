// ==UserScript==
// @name         New Smilies
// @namespace    Prince
// @description  Use Latest Amazing smiley !Click on The Smiley to Insert!Enjoy!
// @require http://sizzlemctwizzle.com/updater.php?id=84790&days=2
// @include      *CommMsgPost*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
getTextArea(this.getAttribute("gult")).value += "<img src='"+image+"'>";
}

function dip() {
	var smileyarr = new Array();smileyarr["oldSmile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5rdxCBHKI/AAAAAAAAALc/lFq6Eb1Lh08/s400/i_smile.png";
        smileyarr["oldSad"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5rWAZC87I/AAAAAAAAALQ/IZZyjW6UoYs/s400/i_sad.png";
	smileyarr["oldBig Smile"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5qmaBnx3I/AAAAAAAAAKU/Povu1UUyI4c/s400/i_bigsmile.png";
        smileyarr["oldSurprise"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sx5s-WWdzFI/AAAAAAAAAMA/NeVHfYAuZoo/s400/i_surprise.png";
	smileyarr["oldFunny"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sx5rBdB8D0I/AAAAAAAAALE/mpXKYwUhWZY/s400/i_funny.png";
        smileyarr["oldCool"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5q27vIyaI/AAAAAAAAAKs/S4wt2Zoc8CM/s400/i_cool.png";
        smileyarr["oldAngry"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sx5qeTSywLI/AAAAAAAAAKI/3N70yMxGymY/s400/i_angry.png";
	smileyarr["oldWink"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sx5vUY-btPI/AAAAAAAAAMY/sL6bdAe-8aw/s400/i_wink.png";                                    
	smileyarr["smiley_596"]="http://lh4.ggpht.com/_shII5qXoBac/TEwtpJonA2I/AAAAAAAAClM/VwV77Dmp5mI/m_triumphant_Smiley_Corner.gif"; 
	smileyarr["smiley_597"]="http://lh6.ggpht.com/_shII5qXoBac/TEwtp-BiaII/AAAAAAAAClQ/FW5L9G3YcB0/m_terrified_Smiley_Corner.gif"; 
	smileyarr["smiley_598"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtqVllA9I/AAAAAAAAClU/f2DcjRFgG8Q/m_smile_Smiley_Corner.gif"; 
	smileyarr["smiley_599"]="http://lh6.ggpht.com/_shII5qXoBac/TEwtq1wOUcI/AAAAAAAAClY/KZIPx3Q-g-I/m_laugh_Smiley_Corner.gif"; 
	smileyarr["smiley_600"]="http://lh4.ggpht.com/_shII5qXoBac/TEwtrXyaK8I/AAAAAAAAClc/b4NQRNVncSU/m_grin_Smiley_Corner.gif"; 
	smileyarr["smiley_601"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtr1BrrBI/AAAAAAAAClg/yPh-WUfkJ5Q/m_frown_Smiley_Corner.gif"; 
	smileyarr["smiley_602"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtsEk6GWI/AAAAAAAAClk/huFSgg2Xq6U/m_cry_Smiley_Corner.gif"; 
	smileyarr["smiley_603"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtsi80UJI/AAAAAAAAClo/wBYAq9Ct2Oc/m_confused_Smiley_Corner.gif"; 
	smileyarr["smiley_604"]="http://lh4.ggpht.com/_shII5qXoBac/TEwttFQnMbI/AAAAAAAACls/zr5hWUP7SVM/m_angry_Smiley_Corner.gif"; 
	smileyarr["smiley_605"]="http://lh3.ggpht.com/_shII5qXoBac/TEwttQRdbiI/AAAAAAAAClw/G8toEzTMjNA/f_triumphant_Smiley_Corner.gif"; 
	smileyarr["smiley_606"]="http://lh5.ggpht.com/_shII5qXoBac/TEwtt70pgNI/AAAAAAAACl0/0VDOe2TgE5g/f_terrified_Smiley_Corner.gif"; 
	smileyarr["smiley_607"]="http://lh4.ggpht.com/_shII5qXoBac/TEwtubzOAJI/AAAAAAAACl4/xM4KLdT6v1A/f_smile_Smiley_Corner.gif"; 
	smileyarr["smiley_608"]="http://lh5.ggpht.com/_shII5qXoBac/TEwtu5jZHCI/AAAAAAAACl8/msoIdVMARuA/f_laugh_Smiley_Corner.gif"; 
	smileyarr["smiley_609"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtvdrxy2I/AAAAAAAACmA/dqzpl8-4lJQ/f_grin_Smiley_Corner.gif"; 
	smileyarr["smiley_610"]="http://lh3.ggpht.com/_shII5qXoBac/TEwtwPKKRII/AAAAAAAACmI/e-Pcm7go3Qk/f_cry_Smiley_Corner.gif"; 
	smileyarr["smiley_611"]="http://lh5.ggpht.com/_shII5qXoBac/TEwtwgTif3I/AAAAAAAACmM/r3vRYyqtH4Q/f_confused_Smiley_Corner.gif"; 
	smileyarr["smiley_612"]="http://lh5.ggpht.com/_shII5qXoBac/TEwtxfDPANI/AAAAAAAACmQ/_1WGPRDSaSc/f_angry_Smiley_Corner.gif"; 	
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
			mm.innerHTML="<span style='margin-left:10px;'><img src='"+smileyarr[title]+"' title='"+title+"'></span>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
                       
		}



	}	
}
dip();
}, false);
// ==UserScript==
// @name          enoz
// @author	      Teodorak Moderador T.O.H.
// @description   Usar antigos emoticons do orkut
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
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
	
        smileyarr["xlfkjfujxt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b0cUPhJEI/AAAAAAAAASA/l6Gd92RJ2ck/emoticons374.gif";
        smileyarr["xxpuljojt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b0cCNNhSI/AAAAAAAAAR8/A3Ep9_-utZA/emoticons361.gif";
        smileyarr["xmbnhjyixt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b0b0PJN8I/AAAAAAAAAR4/YyTfE6IfUlQ/emoticons334.gif";
        smileyarr["xxpoiuljkt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b0b_cGRYI/AAAAAAAAAR0/itXDzSxcIAo/emoticons331.gif";
        smileyarr["xmnbvcxzxt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b0bs2PYaI/AAAAAAAAARw/lkDtn_lAG1U/emoticons281.gif";
        smileyarr["xpoouiyxt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b2ChWPcvI/AAAAAAAAATQ/Xo8kMpzET-s/sexo.gif";
        smileyarr["xddtddxt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-b2CX6qEbI/AAAAAAAAATM/Drxt3wMqbyY/fuuuuuu.gif";
        smileyarr["xxxxxctrt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b2CSofjXI/AAAAAAAAATI/xdK-I1Xe9Ag/fuu.gif";
        smileyarr["xxzxsdat"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b2CD84kCI/AAAAAAAAATE/NCADJwT9P7Q/fumar.gif";
        smileyarr["xxxcvcxt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b2CHY13eI/AAAAAAAAATA/Q4NblEgLFsQ/emoticons-mixplanet-alegre-pequeno-animado2007.gif";
        smileyarr["xtrytxt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1vOHOgII/AAAAAAAAAS8/A153QHUv09c/emoticons-mixplanet-alegre-pequeno-19.gif";
        smileyarr["xpoiuxt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1vFKyE4I/AAAAAAAAAS4/8ZYJuxHzAPo/emoticons494.gif";
        smileyarr["xxxcvtret"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1u-dneeI/AAAAAAAAAS0/xeD5Gqef3rA/emoticons476.gif";  
        smileyarr["xxpppppt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b1uguOP2I/AAAAAAAAASw/_qJ5oPSvjXk/emoticons467.gif";
        smileyarr["xppllxt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b1ucJvpfI/AAAAAAAAASs/tXNo02i1-dM/emoticons459.gif";
        smileyarr["xpxyuyt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b1XiSikJI/AAAAAAAAASo/nkF-Ute1bys/emoticons455.gif";
        smileyarr["xnbnbnbbxt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b1XoVyFMI/AAAAAAAAASk/dA3TLTLKmeQ/emoticons453.gif";
        smileyarr["xnbnbnxt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-b1XVEG2rI/AAAAAAAAASg/ghOugOPw2cg/emoticons436.gif";
        smileyarr["xxoioiot"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1XEi6OUI/AAAAAAAAASc/_tV_3IHwoF8/emoticons428.gif";
        smileyarr["xiuiuxt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1XIT-W9I/AAAAAAAAASY/VAZEk_Ft6EQ/emoticons420.gif";
        smileyarr["xxuyuyut"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1C_P3RVI/AAAAAAAAASQ/fGiLmBsJjJM/emoticons412.gif";
        smileyarr["xxmmnmnt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b1ChhoYqI/AAAAAAAAASM/SV76gZq-6TU/emoticons406.gif";
        smileyarr["xxpo,t"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b1CEHZJQI/AAAAAAAAASI/9p51-yEnIqI/emoticons405.gif";
        smileyarr["xxssssrtt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-b1B98cahI/AAAAAAAAASE/OO5NZDFrcZ4/emoticons378.gif";
        smileyarr["xxxxxxxsst"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-b0N2hqcyI/AAAAAAAAARs/rKsxE6WvRVU/emoticons276.gif";
        smileyarr["xxccct"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b0NiNMwQI/AAAAAAAAARo/8A7mHUXEb4s/emoticons273.gif";
        smileyarr["xxxxxxxdt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-b0NjWhlUI/AAAAAAAAARk/iV6NugiYM_w/emoticons256.gif";
        smileyarr["xxasaswqt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-b0NZ2hJTI/AAAAAAAAARg/Qha_9ZDzXzQ/emoticons196.gif";
        smileyarr["xxxzaxzxt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-b0NG78OjI/AAAAAAAAARc/MHxzGm5smJg/emoticons170.gif";
        smileyarr["xxsdsct"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bz89ybpKI/AAAAAAAAARY/rC0vFPjPVUs/emoticons154.gif";
        smileyarr["xxvbgdt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bz8n7cJ-I/AAAAAAAAARU/JA5n8NB3E_Y/emoticons150.gif";
        smileyarr["xxcqfwt"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bz8XAxWsI/AAAAAAAAARQ/bungVsfeRHg/emoticons147.gif";
        smileyarr["xxczxczt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-bz8bt79iI/AAAAAAAAARM/1LkjPXEEAMU/emoticons146.gif";
        smileyarr["xxcxct"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bz8D0yl0I/AAAAAAAAARI/gOGoql03aTk/emoticons144.gif";
        smileyarr["x14xt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bztzSgyWI/AAAAAAAAARE/WBPLuclp7_k/emoticons142.gif";
        smileyarr["xxxt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bztlP1djI/AAAAAAAAARA/SNzZdsEoMfI/emoticons113.gif";
        smileyarr["xxxxxt"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bzta8iFlI/AAAAAAAAAQ8/c6Uc6XuONMQ/emoticons72.gif";  
        smileyarr["xx1sxt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-bztTWcghI/AAAAAAAAAQ4/N103oOeEZns/emoticons26.gif";
        smileyarr["xxt1"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bztGgL9II/AAAAAAAAAQ0/3pOvrT9SUfk/emoticons50.gif";
        smileyarr["xx1t"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-bzXz-GxzI/AAAAAAAAAQw/SA_ZsUneIGI/emoticons25.gif";
        smileyarr["x1"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bzXn3svnI/AAAAAAAAAQs/fMG9MzrxLC0/diablo.gif";
        smileyarr["x1ts1"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bzXEcfurI/AAAAAAAAAQo/UcihFrmfPvQ/emoticons01.gif";
        smileyarr["xet"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bzW9j_LwI/AAAAAAAAAQk/CeIpWFMKTu4/barro.gif";
        smileyarr["xsxxt"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-bzWtY7fwI/AAAAAAAAAQg/w1n6YaceeEo/37985rt.gif";
        smileyarr["xsast"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-bzEHdFs8I/AAAAAAAAAQc/akG-iAVE0RI/9225.gif";
        smileyarr["sasat"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-bzDzblAzI/AAAAAAAAAQY/qDn949fJ5qE/8164.gif";
        smileyarr["sxaasa"]="http://lh6.ggpht.com/_MLY4q3hCpTc/S-bzDbpK-bI/AAAAAAAAAQU/MrS2tHyvqJ0/8117.gif";
        smileyarr["xsx"]="http://lh5.ggpht.com/_MLY4q3hCpTc/S-bzDZ21B6I/AAAAAAAAAQQ/VYpQdI3sRGI/2167.gif";
        smileyarr["ksasa"]="http://lh4.ggpht.com/_MLY4q3hCpTc/S-bzDKTp6aI/AAAAAAAAAQM/KU2QX8rwulI/1436.gif";       
            
     
     
     


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

//
scr_meta=<><![CDATA[
// ==UserScript==
// @name	Blue Emoticons -GLiTCH-
// @version	1.00
// @author	-GLiTCH-
// @namespace	a
// @description	Emoticons
// @include        http://*.orkut.*/*

// ==/UserScript==
]]></>;

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

smileyarr["smiley_001"]="http://lh3.ggpht.com/-omuXHAllctI/TfmkiXIIpSI/AAAAAAAABCo/EDs9mtRrWGI/01.gif";
smileyarr["smiley_002"]="http://lh4.ggpht.com/-c-kJHlSuI0E/Tfmkc92DO0I/AAAAAAAABCY/ezicRdspBhA/02.gif";
smileyarr["smiley_003"]="http://lh5.ggpht.com/-6pQ_sQIV1dE/TfmkbkkBU4I/AAAAAAAABCU/LCpLGhpAGc8/03.gif";
smileyarr["smiley_004"]="http://lh5.ggpht.com/-VyZUD7n5gEw/TfmkfWrG5xI/AAAAAAAABCc/WsJ4EplbiJU/04.gif";
smileyarr["smiley_005"]="http://lh5.ggpht.com/-ueK7vfWByvw/Tfmkf8toUhI/AAAAAAAABCg/_R_R_lKUAVQ/05.gif";
smileyarr["smiley_006"]="http://lh3.ggpht.com/-0AJKXJ_E1gk/Tfmki6myIsI/AAAAAAAABCs/CYijjXVRH68/06.gif";
smileyarr["smiley_007"]="http://lh3.ggpht.com/-T2xnMYO0tl8/TfmkiWUMjDI/AAAAAAAABCk/7bFncSqAlnw/07.gif";
smileyarr["smiley_008"]="http://lh3.ggpht.com/-Fj1qmJDGxos/TfmknY40ptI/AAAAAAAABC4/Pdwyv-yfXEs/08.gif";
smileyarr["smiley_009"]="http://lh6.ggpht.com/-tG5zz9t9HDQ/TfmklflHbBI/AAAAAAAABCw/YatPT6tW8iM/09.gif";
smileyarr["smiley_010"]="http://lh6.ggpht.com/-hPo8B3fQRBA/Tfmkm0zl-jI/AAAAAAAABC0/HDyH7ABF7mk/10.gif";
smileyarr["smiley_011"]="http://lh5.ggpht.com/-_cNVTUothfo/TfmkrPzPdbI/AAAAAAAABDA/6rf2gSx7T8c/11.gif";
smileyarr["smiley_012"]="http://lh4.ggpht.com/-5CElh8S09Qk/TfmkqDH-OKI/AAAAAAAABC8/hEccsJ4ojww/12.gif";
smileyarr["smiley_013"]="http://lh5.ggpht.com/-yvlsjnjK7wc/Tfmkt1p4SHI/AAAAAAAABDE/d5W1vSHtY14/13.gif";
smileyarr["smiley_014"]="http://lh3.ggpht.com/-Q6FPTMgmk8k/Tfmkygz3J1I/AAAAAAAABDM/4ClR7DbsgNk/14.gif";
smileyarr["smiley_015"]="http://lh4.ggpht.com/-GGNwDDQKZDg/Tfmkw_srJAI/AAAAAAAABDI/se-FqlqDEQU/15.gif";
smileyarr["smiley_016"]="http://lh5.ggpht.com/-uvKI8_g9CXk/Tfmkzw10bNI/AAAAAAAABDQ/BxENkANEAEM/16.gif";
smileyarr["smiley_017"]="http://lh6.ggpht.com/-JTnAzYZPD3A/Tfmk1zwxFTI/AAAAAAAABDU/xBfMwOgbhos/17.gif";
smileyarr["smiley_018"]="http://lh5.ggpht.com/-pwjU3snHl-w/Tfmk2JlvWZI/AAAAAAAABDc/1jV1X2XvZrg/18.gif";
smileyarr["smiley_019"]="http://lh3.ggpht.com/-G30b14yT3VQ/Tfmk2LPBG3I/AAAAAAAABDY/Fz_WkBbXuOs/19.gif";
smileyarr["smiley_020"]="http://lh4.ggpht.com/-2KHwWKhmg3I/Tfmk5GKqDoI/AAAAAAAABDg/hDfxQx7oais/20.gif";
smileyarr["smiley_021"]="http://lh6.ggpht.com/-Zcxz__QzIyc/Tfmk5GYUqbI/AAAAAAAABDk/amvQVvngtv8/21.gif";
smileyarr["smiley_022"]="http://lh6.ggpht.com/-URVKAeQef5M/Tfmk5pdGGbI/AAAAAAAABDo/cPnns3sfu7s/22.gif";
smileyarr["smiley_023"]="http://lh6.ggpht.com/-KFOjQnnhPxU/Tfmk9n2qmbI/AAAAAAAABD0/w35ugfZJsW8/23.gif";
smileyarr["smiley_024"]="http://lh4.ggpht.com/-759Lw7LW_jQ/Tfmk8aR1nII/AAAAAAAABDs/eILIf_MHCDU/24.gif";
smileyarr["smiley_025"]="http://lh5.ggpht.com/-V6aAJ-kxHoU/Tfmk8SDataI/AAAAAAAABDw/RLrutyutOrM/25.gif";
smileyarr["smiley_026"]="http://lh4.ggpht.com/-Cbxrssz7JS0/Tfmk_kFgALI/AAAAAAAABD8/Yo2llxG_PbQ/26.gif";
smileyarr["smiley_027"]="http://lh5.ggpht.com/-Vk7k2U19MF4/Tfmk_DJzmzI/AAAAAAAABD4/ty9ckuCCQag/27.gif";
smileyarr["smiley_028"]="http://lh4.ggpht.com/-d8fs0-hkBgE/TfmlCNrKr8I/AAAAAAAABEA/6bWlB1Xa5nk/28.gif";
smileyarr["smiley_029"]="http://lh5.ggpht.com/-gmn6o-qClLM/TfmlGtRJ-KI/AAAAAAAABEM/LGH3xpG6L80/29.gif";
smileyarr["smiley_030"]="http://lh4.ggpht.com/-jhAcnoQap1A/TfmlGVdFChI/AAAAAAAABEI/Cv1wH0FjIEA/30.gif";
smileyarr["smiley_031"]="http://lh4.ggpht.com/-SlfE2ONM11Y/TfmlFnz891I/AAAAAAAABEE/T4IuQNjjXI0/31.gif";
smileyarr["smiley_032"]="http://lh5.ggpht.com/-_61zJKUm_aE/TfmlH8ek0FI/AAAAAAAABEQ/wmAoVYbsUSw/32.gif";
smileyarr["smiley_033"]="http://lh3.ggpht.com/-QOA6q4Xddzc/TfmlJKapzJI/AAAAAAAABEU/xVhiMoOHieU/33.gif";
smileyarr["smiley_034"]="http://lh6.ggpht.com/-fJ6NopGwpc0/TfmlJupWKhI/AAAAAAAABEY/kzppEO2SCPg/34.gif";
smileyarr["smiley_035"]="http://lh3.ggpht.com/-4T-EEb3zi8M/TfmlKWFUv5I/AAAAAAAABEc/HJCrqciwgzk/35.gif";
smileyarr["smiley_036"]="http://lh3.ggpht.com/-kBJrDtxPm4E/TfmlKuWH_hI/AAAAAAAABEg/DHTFmkqgi4g/36.gif";
smileyarr["smiley_037"]="http://lh6.ggpht.com/-2nNOSmhgQKM/TfmlLHcYBxI/AAAAAAAABEk/gkD7Ox1JZrw/37.gif";
smileyarr["smiley_038"]="http://lh6.ggpht.com/-ls8ylBnIJWU/TfmlMR2jNzI/AAAAAAAABEo/cX957N8eiWU/38.gif";
smileyarr["smiley_039"]="http://lh3.ggpht.com/-wc2ygnDJgPs/TfmlNZ7YloI/AAAAAAAABEs/FrEIRS3an1c/39.gif";
smileyarr["smiley_040"]="http://lh5.ggpht.com/-Gj4QlO7ztmM/TfmlNq1Z4NI/AAAAAAAABEw/IGBYVLoG2XY/40.gif";




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
		
		count = 1;
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			if(count%20 == 0)
                        { 
                        mm.innerHTML=mm.innerHTML + "<br />";
			}
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
			count = count + 1;
		}
	}	
}
dip();
}, false);

//Fin;)
scr_meta=<><![CDATA[
// ==UserScript==
// @name	Milk_Bottle -GLiTCH-
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

smileyarr["smiley_001"]="http://lh6.ggpht.com/-5NwAWCQ9yLM/TlONv4jfnpI/AAAAAAAABQ4/lW-3l66qKGc/1.gif";
smileyarr["smiley_002"]="http://lh6.ggpht.com/-t556dksQURo/TlONwyMH9fI/AAAAAAAABQ8/R0KIaffDgYM/2.gif";
smileyarr["smiley_003"]="http://lh5.ggpht.com/-H9nOWP0VA2c/TlONxX-kk9I/AAAAAAAABRA/NTmSI_tligM/3.gif";
smileyarr["smiley_004"]="http://lh3.ggpht.com/-jWknb6aG0V0/TlONxT8yDpI/AAAAAAAABRE/qVay5Uibcoo/4.gif";
smileyarr["smiley_005"]="http://lh4.ggpht.com/-zlX7S-BbkpE/TlON1bGnxhI/AAAAAAAABRM/E8GhOjK43uU/5.gif";
smileyarr["smiley_006"]="http://lh5.ggpht.com/-K6wOt3d_Cig/TlON03J61BI/AAAAAAAABRI/HaTZsTuC1NI/6.gif";
smileyarr["smiley_007"]="http://lh6.ggpht.com/-xTag8Jzu_d0/TlON1t3wKKI/AAAAAAAABRQ/p2ZSV092rFM/7.gif";
smileyarr["smiley_008"]="http://lh3.ggpht.com/-akBhmQXCeCM/TlON4ogh_CI/AAAAAAAABRU/3y2aW1NQlYQ/8.gif";
smileyarr["smiley_009"]="http://lh5.ggpht.com/-YSx4l86fkyk/TlON5MKJ18I/AAAAAAAABRY/vQfBQQP8H_k/9.gif";
smileyarr["smiley_010"]="http://lh6.ggpht.com/-ajzctZXZRCI/TlON7Lfem0I/AAAAAAAABRc/M3aE9TVfYHE/10.gif";
smileyarr["smiley_011"]="http://lh3.ggpht.com/-syKlggrhd68/TlOODZC-FWI/AAAAAAAABRo/TRY3xvaolPM/11.gif";
smileyarr["smiley_012"]="http://lh6.ggpht.com/-8GWI_KdElUg/TlOODH_y4tI/AAAAAAAABRk/VAxaacYPwqU/12.gif";
smileyarr["smiley_013"]="http://lh6.ggpht.com/-wys_ahDfPFI/TlOOADBK1RI/AAAAAAAABRg/6rAGRnwH78U/13.gif";
smileyarr["smiley_014"]="http://lh4.ggpht.com/-GRl9beWFFsw/TlOOHr4aLMI/AAAAAAAABRs/zsbeBivvL1U/14.gif";
smileyarr["smiley_015"]="http://lh4.ggpht.com/-1gr28jmKbXY/TlOOeZBLi-I/AAAAAAAABSk/KLvl8OdcBz0/15.gif";
smileyarr["smiley_016"]="http://lh5.ggpht.com/-RnTZHSTz6J4/TlOOUaUAk5I/AAAAAAAABSA/RPxDEN3sNZc/16.gif";
smileyarr["smiley_017"]="http://lh5.ggpht.com/-saxug_iIKNk/TlOOKUS42PI/AAAAAAAABRw/gJrzqieNT1Q/17.gif";
smileyarr["smiley_018"]="http://lh4.ggpht.com/-Why9aSCZpqY/TlOOPp0KPRI/AAAAAAAABR0/VEge9mnDbME/18.gif";
smileyarr["smiley_019"]="http://lh6.ggpht.com/-nqyTBdZv0qk/TlOOR1DXKRI/AAAAAAAABR4/MmYytvXoDsQ/19.gif";
smileyarr["smiley_020"]="http://lh4.ggpht.com/-h6dOmoHhphs/TlOOUGCcI0I/AAAAAAAABR8/Yrf7Ah5Gcnc/20.gif";
smileyarr["smiley_021"]="http://lh6.ggpht.com/-e1Y2-ew34Bs/TlOOVuWEKkI/AAAAAAAABSE/ufCFDjsiKFk/21.gif";
smileyarr["smiley_022"]="http://lh3.ggpht.com/-8Iy8FpX7JtI/TlOOWqN9utI/AAAAAAAABSI/Wwb1RqVOKIw/22.gif";
smileyarr["smiley_023"]="http://lh4.ggpht.com/-3UAwFIkyhds/TlOOYPBQnSI/AAAAAAAABSM/NRM4-pj_Nwo/23.gif";
smileyarr["smiley_024"]="http://lh3.ggpht.com/-BIemqpbRXXI/TlOOZ1FgOrI/AAAAAAAABSU/1ge7lHv9jfg/24.gif";
smileyarr["smiley_025"]="http://lh5.ggpht.com/-5mzDqaNCLAI/TlOOZ2cqCVI/AAAAAAAABSQ/KZ9DZHYUESA/25.gif";
smileyarr["smiley_026"]="http://lh5.ggpht.com/-OniUR8AaL5U/TlOObA4xqhI/AAAAAAAABSY/sV2GtYGs4Mc/26.gif";
smileyarr["smiley_027"]="http://lh5.ggpht.com/-NCnihayTYpk/TlOOcKDZITI/AAAAAAAABSc/se9E3FC2yjY/27.gif";
smileyarr["smiley_028"]="http://lh4.ggpht.com/-cMErhnxRZ1Y/TlOOcX3D2SI/AAAAAAAABSg/k2mCkhOFxyg/28.gif";
smileyarr["smiley_029"]="http://lh6.ggpht.com/-hn5Rd1ieXxM/TlOOfi2krfI/AAAAAAAABSo/J9-Kjf7Tmfg/29.gif";
smileyarr["smiley_030"]="http://lh3.ggpht.com/--ALNZggP4OQ/TlOOg9bw-AI/AAAAAAAABSs/vcBp-FfvSMM/30.gif";
smileyarr["smiley_031"]="http://lh6.ggpht.com/-ThcfxIsGzqk/TlOOhiH4oeI/AAAAAAAABSw/kRxJXVxANAg/31.gif";
smileyarr["smiley_032"]="http://lh5.ggpht.com/-IpZKvzyLcIE/TlOOh-a2IXI/AAAAAAAABS0/vWpYdbmLzvQ/32.gif";
smileyarr["smiley_033"]="http://lh3.ggpht.com/-jPscbZzspuk/TlOOlzTIlqI/AAAAAAAABS4/KyNZnNzWK_8/33.gif";
smileyarr["smiley_034"]="http://lh3.ggpht.com/-47YF0B371Ak/TlOOlzOoGwI/AAAAAAAABS8/R8mvKKlpjCU/34.gif";
smileyarr["smiley_035"]="http://lh5.ggpht.com/-Nzh2c6a1UZM/TlOOmrL7cWI/AAAAAAAABTA/pO2Qz0ZlXJs/35.gif";
smileyarr["smiley_036"]="http://lh4.ggpht.com/-P0aQauX_KNA/TlOOnlVqOMI/AAAAAAAABTI/5sLwhS4WzaU/36.gif";
smileyarr["smiley_037"]="http://lh4.ggpht.com/-0C6Isfe8Cz0/TlOOndfnSoI/AAAAAAAABTE/iKIR-Ljwd8w/37.gif";
smileyarr["smiley_038"]="http://lh5.ggpht.com/-AlJvedFnBUs/TlOOo-xWRWI/AAAAAAAABTM/dy325wWQQ70/38.gif";
smileyarr["smiley_039"]="http://lh3.ggpht.com/-vDNH38osfSQ/TlOOpg99_kI/AAAAAAAABTQ/3EePR6UexkA/39.gif";
smileyarr["smiley_040"]="http://lh4.ggpht.com/-zskP1WpFIXM/TlOOtNfQsBI/AAAAAAAABTU/XL5sJNs8qUQ/40.gif";
smileyarr["smiley_041"]="http://lh5.ggpht.com/-9YTMNRcK6Cg/TlOOwQRMcZI/AAAAAAAABTY/yNEdfmGX0pA/41.gif";
smileyarr["smiley_042"]="http://lh5.ggpht.com/-JklA0mwxTYM/TlOOyMwVhnI/AAAAAAAABTc/VWxiRNjOekc/42.gif";
smileyarr["smiley_043"]="http://lh6.ggpht.com/-SfHQDuomqSs/TlOO05-rKPI/AAAAAAAABTk/mOSM07BcU1Q/43.gif";
smileyarr["smiley_044"]="http://lh5.ggpht.com/-usGQL7T7ANc/TlOO0rErn5I/AAAAAAAABTg/Mi9qCfeh0eE/44.gif";
smileyarr["smiley_045"]="http://lh3.ggpht.com/-cIOljA9kkCk/TlOO1CWbV4I/AAAAAAAABTo/EnjBhGYuMD0/45.gif";
smileyarr["smiley_046"]="http://lh3.ggpht.com/-YHt4cAA4QnY/TlOO5BCXNfI/AAAAAAAABTw/F12NpixtnPU/46.gif";
smileyarr["smiley_047"]="http://lh3.ggpht.com/-1HQuK3pNK9o/TlOO4yggSsI/AAAAAAAABTs/YU4YzLQDxN4/47.gif";
smileyarr["smiley_048"]="http://lh4.ggpht.com/-q0cC0w7-uWI/TlOO5iCOQII/AAAAAAAABT0/AS1x7NODrf8/48.gif";
smileyarr["smiley_049"]="http://lh4.ggpht.com/--XlcOtIveOo/TlOO9FAMEoI/AAAAAAAABT4/ycNIXfxrHRY/49.gif";
smileyarr["smiley_050"]="http://lh5.ggpht.com/-ecDLlcXAVh0/TlOPF3SGCHI/AAAAAAAABUE/6Nn3VngzZW4/50.gif";
smileyarr["smiley_051"]="http://lh4.ggpht.com/-1j3JgD_wzs8/TlOPJc0_zNI/AAAAAAAABUQ/wv0EQeNmYjc/51.gif";
smileyarr["smiley_052"]="http://lh6.ggpht.com/-Z_vtrv_M3ZI/TlOPAOK6P_I/AAAAAAAABT8/QZ2ZnC3cCKg/52.gif";
smileyarr["smiley_053"]="http://lh6.ggpht.com/-LgcqKmVVOnU/TlOPCVEdKJI/AAAAAAAABUA/P0Z881GXCtU/53.gif";
smileyarr["smiley_054"]="http://lh4.ggpht.com/-mdLLQanLmKc/TlOPHQa7ktI/AAAAAAAABUM/RVsjwQha_WM/54.gif";
smileyarr["smiley_055"]="http://lh6.ggpht.com/-TPZo87G-Hy0/TlOPHCBKAmI/AAAAAAAABUI/B-XpzF1hOAQ/55.gif";




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
			if(count%12 == 0)
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
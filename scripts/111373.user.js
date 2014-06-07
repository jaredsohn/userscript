scr_meta=<><![CDATA[
// ==UserScript==
// @name	Green Scarf Emoticons -GLiTCH-
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

smileyarr["smiley_001"]="http://lh3.ggpht.com/-n3gHc-VnN9M/Tld-FjSJbnI/AAAAAAAABc0/5O-r9IB-NTg/1.gif"
smileyarr["smiley_002"]="http://lh6.ggpht.com/-8Jv8T1VkD8M/Tld-FdedT1I/AAAAAAAABcw/PhQImwC5e6w/2.gif"
smileyarr["smiley_003"]="http://lh4.ggpht.com/-ZUb-7zt9ARE/Tld-GNokWyI/AAAAAAAABc4/BbkmvOfUimQ/3.gif"
smileyarr["smiley_004"]="http://lh5.ggpht.com/-zHbK5vX8goc/Tld-Gc44DVI/AAAAAAAABc8/RR6LyYsmryg/4.gif"
smileyarr["smiley_005"]="http://lh3.ggpht.com/-u-KOZGVyZug/Tld-GnTVQ5I/AAAAAAAABdA/xwonDww6dLQ/5.gif"
smileyarr["smiley_006"]="http://lh6.ggpht.com/-4xc5nDxmcGU/Tld-HajBRMI/AAAAAAAABdE/_du9PHrq9Lk/6.gif"
smileyarr["smiley_007"]="http://lh6.ggpht.com/-4OJc8kETFOU/Tld-I7C_gLI/AAAAAAAABdI/flbdvw1KKcU/7.gif"
smileyarr["smiley_008"]="http://lh5.ggpht.com/-IlHVq4NmWNk/Tld-JkFzB_I/AAAAAAAABdM/ZWtFzPkJTOc/8.gif"
smileyarr["smiley_009"]="http://lh4.ggpht.com/-FoKojDNZWWY/Tld-L0WNQQI/AAAAAAAABdQ/MGbcbcO94Rs/9.gif"
smileyarr["smiley_010"]="http://lh4.ggpht.com/-AbbhO4o-SXw/Tld-MAFAESI/AAAAAAAABdU/Tp9ZAtrOSFg/10.gif"
smileyarr["smiley_011"]="http://lh6.ggpht.com/-meRU1jY45bE/Tld-MZrFAAI/AAAAAAAABdY/KtCoRhxxiwc/11.gif"
smileyarr["smiley_012"]="http://lh4.ggpht.com/-CwNTYjD_HFM/Tld-Oe1b3VI/AAAAAAAABdg/B21vyjSzb94/12.gif"
smileyarr["smiley_013"]="http://lh4.ggpht.com/-Fn_YbC9NoB0/Tld-PFJ4uJI/AAAAAAAABdk/Cim-P08muQ0/13.gif"
smileyarr["smiley_014"]="http://lh3.ggpht.com/-ZOV9wepMdqM/Tld-NhGxctI/AAAAAAAABdc/-_Zcj8HwX7I/14.gif"
smileyarr["smiley_015"]="http://lh3.ggpht.com/-SZnM8MvI79w/Tld-WFCn1PI/AAAAAAAABdw/hKnOV8i2Xv8/15.gif"
smileyarr["smiley_016"]="http://lh6.ggpht.com/-hlx54AHSrNw/Tld-U95vAHI/AAAAAAAABdo/WdQP5aYyiLU/16.gif"
smileyarr["smiley_017"]="http://lh3.ggpht.com/-skdCOlVyNlc/Tld-U52gQoI/AAAAAAAABds/GzCI_M6AkyA/17.gif"
smileyarr["smiley_018"]="http://lh5.ggpht.com/-gpfdsj5UQmc/Tld-XLet1tI/AAAAAAAABd0/ggv0uEnKa_w/18.gif"
smileyarr["smiley_019"]="http://lh4.ggpht.com/-v1V-6Xo59lI/Tld-XuO2z-I/AAAAAAAABd4/F5w9ij6-3s4/19.gif"
smileyarr["smiley_020"]="http://lh6.ggpht.com/-OATLVpI1xUk/Tld-YEj6s2I/AAAAAAAABd8/b86RSE7bCag/20.gif"
smileyarr["smiley_021"]="http://lh3.ggpht.com/-XapAvuZRLO4/Tld-cktV4LI/AAAAAAAABeA/oQWvAMfAuW4/21.gif"
smileyarr["smiley_022"]="http://lh6.ggpht.com/-AwCLjYY42EE/Tld-gL76YMI/AAAAAAAABeE/3FSXRbVsqss/22.gif"
smileyarr["smiley_023"]="http://lh3.ggpht.com/--1R5NhyTKHI/Tld-hJ5_DgI/AAAAAAAABeI/owUNel63gP8/23.gif"
smileyarr["smiley_024"]="http://lh6.ggpht.com/-q8kLFPRgd_s/Tld-iJWOVeI/AAAAAAAABeM/uaqlgWHXMyk/24.gif"
smileyarr["smiley_025"]="http://lh3.ggpht.com/-fI059KtP0dU/Tld-j9yIcEI/AAAAAAAABeU/-0Gp2z4a3fo/25.gif"
smileyarr["smiley_026"]="http://lh6.ggpht.com/-LHyRyEcvhAs/Tld-jmF8uqI/AAAAAAAABeQ/aOCfzV4ZhWg/26.gif"
smileyarr["smiley_027"]="http://lh6.ggpht.com/-P_RGBhYEXZo/Tld-kdhZJTI/AAAAAAAABeY/_w7Cx0X2290/27.gif"
smileyarr["smiley_028"]="http://lh4.ggpht.com/-oJgL4tluz7Y/Tld-kpX-x_I/AAAAAAAABec/0e21bKhiX0o/28.gif"
smileyarr["smiley_029"]="http://lh6.ggpht.com/-B_8BjkBNUsY/Tld-mCgqf1I/AAAAAAAABeg/uGn1T28kw-4/29.gif"
smileyarr["smiley_030"]="http://lh5.ggpht.com/-1ECLS8aUwcM/Tld-psZDCTI/AAAAAAAABeo/aqPvh6pY4zM/30.gif"
smileyarr["smiley_031"]="http://lh4.ggpht.com/-zLUnrj9k_3s/Tld-n8U56_I/AAAAAAAABek/roLRQXZQhDc/31.gif"
smileyarr["smiley_032"]="http://lh5.ggpht.com/-W8IcvViy6q0/Tld-p9jqgcI/AAAAAAAABes/UkEBiUmMbSc/32.gif"
smileyarr["smiley_033"]="http://lh4.ggpht.com/-_vfSInOqzAI/Tld-qEQcAXI/AAAAAAAABew/1tOZcAlOqSc/33.gif"
smileyarr["smiley_034"]="http://lh3.ggpht.com/-JpFG9ok6cq4/Tld-s4LMJVI/AAAAAAAABe4/oKHAjbg-NGE/34.gif"
smileyarr["smiley_035"]="http://lh4.ggpht.com/-I6Pws3AA1mc/Tld-vuSup4I/AAAAAAAABe8/wk8pEZX70BQ/35.gif"
smileyarr["smiley_036"]="http://lh6.ggpht.com/-BO9-G-9Z-GQ/Tld-scaFUAI/AAAAAAAABe0/k4G9oO93pOE/36.gif"
smileyarr["smiley_037"]="http://lh6.ggpht.com/-iEoD0LcmUqg/Tld-2Lt6z-I/AAAAAAAABfA/Iglt9n7_LaI/37.gif"
smileyarr["smiley_038"]="http://lh4.ggpht.com/-oLuSSd1kqxM/Tld-2VjrX1I/AAAAAAAABfE/IRdu7jwdumM/38.gif"
smileyarr["smiley_039"]="http://lh5.ggpht.com/--xjWHEJLHPI/Tld-4U7gljI/AAAAAAAABfI/I_QHETV4lFg/39.gif"
smileyarr["smiley_040"]="http://lh6.ggpht.com/-cXfA2tWTqBA/Tld-43FbTcI/AAAAAAAABfM/rOmFo7mFq6g/40.gif"
smileyarr["smiley_041"]="http://lh6.ggpht.com/-HFfgl0vde4Y/Tld-5DQ6LCI/AAAAAAAABfQ/p93UmE8TD3I/41.gif"
smileyarr["smiley_042"]="http://lh6.ggpht.com/-NGDO2YRtlR8/Tld--bcRqbI/AAAAAAAABfU/3i30RlukLrs/42.gif"
smileyarr["smiley_043"]="http://lh3.ggpht.com/-7KTVse26aY0/Tld--zC8lHI/AAAAAAAABfc/0r5MDzo6mOU/43.gif"
smileyarr["smiley_044"]="http://lh4.ggpht.com/-sOBgilzaHpk/Tld--1V58YI/AAAAAAAABfY/WIpZzYZhtEw/44.gif"
smileyarr["smiley_045"]="http://lh3.ggpht.com/-zqaDTJRd5ls/Tld_BcQWLmI/AAAAAAAABfg/N3v-8eZ27WY/45.gif"
smileyarr["smiley_046"]="http://lh5.ggpht.com/-LPITpSsb7KU/Tld_FK9VMKI/AAAAAAAABfo/xE7zd9N58-c/46.gif"
smileyarr["smiley_047"]="http://lh5.ggpht.com/-Qg2SHyzBFy8/Tld_CeDIDFI/AAAAAAAABfk/oWeLqrciLUs/47.gif"
smileyarr["smiley_048"]="http://lh3.ggpht.com/-omYYWnKlT2k/Tld_Hba63gI/AAAAAAAABfs/ag5viT9USUc/s128/48.gif"
smileyarr["smiley_049"]="http://lh5.ggpht.com/-tFHW-0VO2yU/Tld_HrS_QFI/AAAAAAAABf0/EEEwgxMozbc/49.gif"
smileyarr["smiley_050"]="http://lh4.ggpht.com/-hZ6LE8j3AVo/Tld_Hpb-1tI/AAAAAAAABfw/nq93lSuvdmQ/50.gif"
smileyarr["smiley_051"]="http://lh4.ggpht.com/-1gwtNmSdSLI/Tld_MpJWt3I/AAAAAAAABf8/oqpAC1xFS-s/51.gif"
smileyarr["smiley_052"]="http://lh4.ggpht.com/-yWB7K14xamQ/Tld_M7txJ7I/AAAAAAAABgA/u98K5lyfGoU/52.gif"
smileyarr["smiley_053"]="http://lh6.ggpht.com/-owTBlF6dsDU/Tld_Ly2PV-I/AAAAAAAABf4/7Q-qMZPZ6VY/53.gif"
smileyarr["smiley_054"]="http://lh5.ggpht.com/-ALMwwVxsVAQ/Tld_QwMCeTI/AAAAAAAABgE/AEvbxC4tS2M/54.gif"
smileyarr["smiley_055"]="http://lh5.ggpht.com/-xzGOOmV2KpY/Tld_RAX9CFI/AAAAAAAABgI/hmTFL4nEd4E/55.gif"
smileyarr["smiley_056"]="http://lh4.ggpht.com/-AM8pz7LVil8/Tld_R1fFDLI/AAAAAAAABgM/VXBKITf1fIw/56.gif"
smileyarr["smiley_057"]="http://lh6.ggpht.com/-1eNJKQHoysA/Tld_SzkbhJI/AAAAAAAABgQ/7KuHuD-gXGY/57.gif"




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
	// ==UserScript==
// @name           Best Orkut smileys by Swarnendu Sarkar(aka Lord Viper)
// @namespace      OKP
// @description    Use the new coolest and most rocking smileys for Orkut by Swarnendu aka Lord Viper.Its perhaps the best smiley script till now,Enjoy!
// @include        http://*.orkut.*/Scrapbook*
// @include        http://*.orkut.*/CommMsgs*
// @include        http://*.orkut.*/CommMsgPost*
// ==/UserScript==

/********************************************************
//Coolest & rocking new smileys, Captcha free!
//Original Base script by Swarnendu aka Lord Viper.
//If you like the smiley script send me your feedback.
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
	smileyarr["hi"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BlbFGo6jI/AAAAAAAAAIA/42ft6wa_SZQ/s400/hi.png";
	smileyarr["OKP-butterfly"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BL_5-Ts_I/AAAAAAAAADA/xuOG-RHtwAo/s400/OKP-butterfly.png";
	smileyarr["OKP-cool1"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BPcE0J2VI/AAAAAAAAADI/mgyFhViogVg/s400/OKP-cool-1.png";
	smileyarr["OKP-cool2"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BQ1fH8zoI/AAAAAAAAADQ/n0mcbdHDuRQ/s400/OKP-cool-2.png";
	smileyarr["OKP-cool3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BRTqDx1XI/AAAAAAAAADY/qxWrQHX4zXU/s400/OKP-cool-3.png";
	smileyarr["OKP-cool4"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BRrxBWh6I/AAAAAAAAADg/c05aWSQFgTI/s400/OKP-cool-4.png";
	smileyarr["OKP-cool5"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BSAWHT-tI/AAAAAAAAADo/SlEiH884F0k/s400/OKP-cool-5.png";
	smileyarr["OKP-cool6"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BScpGInyI/AAAAAAAAADw/rHCkAwuFE78/s400/OKP-cool-6.png";
	smileyarr["OKP-cool7"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BS_sEgESI/AAAAAAAAAD4/t2BRdymJqfg/s400/OKP-cool-7.png";
	smileyarr["OKP-cool8"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BTMZ5DYEI/AAAAAAAAAEA/3uluIVCGNQE/s400/OKP-cool-8.png";
	smileyarr["OKP-cool9"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BThzQRWkI/AAAAAAAAAEI/0G5Ngw9t4Jk/s400/OKP-cool-9.png";
	smileyarr["OKP-cool10"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BTq779III/AAAAAAAAAEQ/0SIZ34RCIUM/s400/OKP-cool-10.png";
	smileyarr["OKP-cool11"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BT3AhAOlI/AAAAAAAAAEY/TRCYCB8bsvU/s400/OKP-cool-11.png";
	smileyarr["OKP-cool12"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BUCdCbhhI/AAAAAAAAAEg/fYo4FGq6n6U/s400/OKP-cool-12.png";
	smileyarr["angry2"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BqFcApjXI/AAAAAAAAAKI/tCs0nCvL6ag/s400/angry2.png";
	smileyarr["angry3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BqOk9w8-I/AAAAAAAAAKQ/jdQ1PIwALoE/s400/angry3.png";
	smileyarr["angry4"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BrfnYSW3I/AAAAAAAAAKY/Uwgz-Xjnn9A/s400/angry4.png";
	smileyarr["happy1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Br_83zo5I/AAAAAAAAAKg/pqih89LLGrE/s400/happy1.png";
	smileyarr["happy2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BsWN0vQfI/AAAAAAAAAKo/jwXh550rgIk/s400/happy2.png";
	smileyarr["happy3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BsowOzGaI/AAAAAAAAAKw/n6RerO9jq-A/s400/happy4.png";
	smileyarr["happy4"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bv4H0HRpI/AAAAAAAAAMA/U3EC8H8rIlo/s400/happy6.png";
	smileyarr["happy5"]="http://lh3.ggpht.com/_OpR8Gexvums/S4ByF3SDq7I/AAAAAAAAANw/Atb8B3Q9uyY/s400/happy7.png";
	smileyarr["happy6"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BySBth3UI/AAAAAAAAAN4/5c6ylxBDEtA/s400/happy8.png";
	smileyarr["sad1"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BwKiV2DhI/AAAAAAAAAMI/Y-fQQ8Y4tv8/s400/sad1.png";
	smileyarr["sad2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BwTq0CGoI/AAAAAAAAAMQ/UVuzJPVBo-w/s400/sad2.png";
	smileyarr["sad3"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BwbYN47DI/AAAAAAAAAMY/ju-oiNPMAKA/s400/sad3.png";
	smileyarr["sad4"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BwjdBqQsI/AAAAAAAAAMg/R4_XgVH4fQg/s400/sad4.png";
	smileyarr["sad5"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BwtIwBS9I/AAAAAAAAAMo/eLPtZOVQm_g/s400/sad6.png";
	smileyarr["shy1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bw20z7UtI/AAAAAAAAAMw/r4g25RY769A/s400/shy1.png";
	smileyarr["shy2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxBOIXQ_I/AAAAAAAAAM4/GgRuvvtSFm8/s400/shy2.png";
	smileyarr["shy3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxJL9bfLI/AAAAAAAAANA/wVi6Lrkp9Mo/s400/shy3.png";
	smileyarr["camera"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxPbMaqDI/AAAAAAAAANI/y3SHTUYKJYs/s400/camera.png";
	smileyarr["dance1"]="http://lh6.ggpht.com/_OpR8Gexvums/S4Bs5gmHS1I/AAAAAAAAAK4/V5Y7khA9A3c/s400/dance1.png";
	smileyarr["dance2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BtMiWyeMI/AAAAAAAAALA/8gDiHU0SOaw/s400/dance2.png";
	smileyarr["hug3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BuRORi3NI/AAAAAAAAALg/CLc08d5X1oI/s400/hug3.png";
	smileyarr["heartbeat"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BzZCg7bZI/AAAAAAAAAOY/sS9VHNNBXTo/s400/HEARTB%7E1.png";
	smileyarr["ILU"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BumA8HqXI/AAAAAAAAALo/W6Hpx2kkF3k/s400/I_LOVE%7E1.png";
	smileyarr["luvu"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BuxFzOW8I/AAAAAAAAALw/Qbe72kLMpwU/s400/ilu.png";
	smileyarr["kiss"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BvM58hepI/AAAAAAAAAL4/tWyAyc2rH-k/s400/kiss2.png";
	smileyarr["heart"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BxWmBh7sI/AAAAAAAAANQ/zhdWkdwau1k/s400/heart.png";
	smileyarr["rose"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BxiOtZ_TI/AAAAAAAAANY/yB-GQDK_qq8/s400/ROSE_9%7E1.png";
	smileyarr["newyr1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bxr38sRoI/AAAAAAAAANg/EFlyQ66JHvw/s400/newyr1.png";
	smileyarr["newyr2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BydT-PXAI/AAAAAAAAAOA/BXD6-WnmEp8/s400/newyr2.png";
	smileyarr["xmas1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BywE3L9zI/AAAAAAAAAOI/9Iec1pRl9yg/s400/hug_new.png";
	smileyarr["xmas2"]="http://lh5.ggpht.com/_OpR8Gexvums/S4Bx2rnCwNI/AAAAAAAAANo/PqKF5CwbebE/s400/xmas.png";
	smileyarr["bday1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BpJFMGpvI/AAAAAAAAAJg/CZEL_YjcEpI/s400/bdaycake.png";
	smileyarr["bday2"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BpcUlAqBI/AAAAAAAAAJo/FmmgDqz_Nic/s400/bday.png";
	smileyarr["bday3"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bpnsq9LkI/AAAAAAAAAJw/URsB2w3DByc/s400/bdaycheers.png";
	smileyarr["bdaygift"]="http://lh6.ggpht.com/_OpR8Gexvums/S4Bp2qPrhYI/AAAAAAAAAJ4/2nUfnBG06dM/s400/bdaygft.png";
	smileyarr["pet1"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bgk9gzLMI/AAAAAAAAAGY/HkxuxSY9YJQ/s400/pet-luv.png";
	smileyarr["ani"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BiOqknPxI/AAAAAAAAAGg/2byaMR7gjMc/s400/ani.png";
	smileyarr["ani2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bivji1MwI/AAAAAAAAAGo/bCaVdB4qLwU/s400/ani2.png";
	smileyarr["anisleep"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bi8KhDJVI/AAAAAAAAAGw/RYEbsq2WmJc/s400/anislp.png";
	smileyarr["babydance"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BjSo3_CEI/AAAAAAAAAG4/0B0V4t_4L0w/s400/babydance.png";
	smileyarr["babyluv"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BjsCHkfoI/AAAAAAAAAHA/q1plagpuQtQ/s400/babyluv.png";
	smileyarr["babyfeed"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bj-rpdcJI/AAAAAAAAAHI/qxcnJ5DVITw/s400/babyfeed.png";
	smileyarr["babyoops"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BkSoXCTDI/AAAAAAAAAHQ/GYAfFx8KwEE/s400/babyfart.png";
	smileyarr["babycry2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bkd7SIt7I/AAAAAAAAAHY/Tah-mD7UMHM/s400/babycry.png";
	smileyarr["babycry"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BkniGmvbI/AAAAAAAAAHg/s9mc-iEg7eE/s400/babycry2.png";
	smileyarr["babyno"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bk23b3TwI/AAAAAAAAAHo/QDKAuc-nmYc/s400/babyno.png";
	smileyarr["babysleep"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BlBiSKxUI/AAAAAAAAAHw/vXVXIPBjIjI/s400/babyslp.png";
	smileyarr["babybye"]="http://lh6.ggpht.com/_OpR8Gexvums/S4BlMuhrPEI/AAAAAAAAAH4/j20kPBR-WlA/s400/babybye.png";
	smileyarr["yes"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BmBCNPZgI/AAAAAAAAAIQ/4pTJh6j8650/s400/yes_text.png";
	smileyarr["thanx"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BmSvaqMDI/AAAAAAAAAIY/rEf5GQebuy4/s400/thanks2.png";
	smileyarr["kiss2"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BmhgNU2yI/AAAAAAAAAIg/GaGjsvtGz2I/s400/kiss.png";
	smileyarr["jumping"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BmtB13dYI/AAAAAAAAAIo/qbgBci-HnGg/s400/JUMPIN%7E1.png";
	smileyarr["smoking"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BnwanKSiI/AAAAAAAAAI4/_kZbWmmY5k0/s400/smoking.png";
	smileyarr["holiday"]="http://lh5.ggpht.com/_OpR8Gexvums/S4Bzy2P9nQI/AAAAAAAAAOo/JwyQ8OIthbE/s400/holiday.png";
	smileyarr["waving"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bn_DObq3I/AAAAAAAAAJA/qRe726u_2Wc/s400/CHICKA%7E1.png";
	smileyarr["dancing"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BoSZnyjAI/AAAAAAAAAJI/YFswqMQhAPk/s400/DANCIN%7E1.png";
	smileyarr["blooming"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bok5fPMII/AAAAAAAAAJQ/8Wnh9xZuDJ0/s400/BLOOMI%7E1.png";
	smileyarr["growing"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bow1_bqaI/AAAAAAAAAJY/AHPIwpfLhM4/s400/GROWIN%7E1.png";
	smileyarr["clap"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BtWeJuvsI/AAAAAAAAALI/iSKWnERfujo/s400/clap.png";
	smileyarr["bestofluck"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BtlQKHEjI/AAAAAAAAALQ/692xdQVmYG4/s400/bestofluck.png";
	smileyarr["thumbsup"]="http://lh3.ggpht.com/_OpR8Gexvums/S4By8OeiaBI/AAAAAAAAAOQ/kzwX1XzJWYQ/s400/THUMBS.png";
	smileyarr["ROFL"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bzjg6AB1I/AAAAAAAAAOg/jAyh3e8nwmQ/s400/ROFL.png";
	smileyarr["beer"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bt6ERrQ9I/AAAAAAAAALY/p_AEnTmXYqs/s400/beer2.png";
	smileyarr["kitty"]="http://lh6.ggpht.com/_OpR8Gexvums/S4B0HV4wKaI/AAAAAAAAAOw/xu2QSY-vDVE/s400/kitty.png";
	smileyarr["swarnendu"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUNwWgfAI/AAAAAAAAAEo/_1dmEa739ls/s400/swarnendu.png";
	smileyarr["soccer"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUlgyNVKI/AAAAAAAAAEw/_P9VjU_s574/s400/soccer_3.png";
	smileyarr["swiming"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BUxrGxmvI/AAAAAAAAAE4/leO6DV03Smw/s400/swiming.png";
	smileyarr["weightlifting"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVABeohnI/AAAAAAAAAFA/EI_1DxWuVlY/s400/WEIGHT%7E1.png";
	smileyarr["sailing"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVMRTjHYI/AAAAAAAAAFI/Y1JbjuZ0R1E/s400/sailing.png";
	smileyarr["karate"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVZY5XC8I/AAAAAAAAAFQ/4mYZ-eipQKI/s400/karate.png";
	smileyarr["golf"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BVo4hNGrI/AAAAAAAAAFY/pnzieY00DMM/s400/golf.png";
	smileyarr["cycling"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BclkQFD_I/AAAAAAAAAGA/blbEDib4INM/s400/CYCLIS%7E1.png";
	smileyarr["boxing"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BnBEekMwI/AAAAAAAAAIw/9T2Z_ioPEOM/s400/boxing_2.png";
	smileyarr["winner"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BV-3IEvPI/AAAAAAAAAFg/YxrsAkgOSWU/s400/winner.png";
	smileyarr["waving1"]="http://lh5.ggpht.com/_OpR8Gexvums/S4BWLzdlb4I/AAAAAAAAAFo/an2T1uivi0c/s400/WAVING%7E1.png";
	smileyarr["waving2"]="http://lh4.ggpht.com/_OpR8Gexvums/S4BWm91wb0I/AAAAAAAAAFw/2ktGQfKDgqA/s400/WAVING%7E3.png";
	smileyarr["waving3"]="http://lh3.ggpht.com/_OpR8Gexvums/S4BYWg8kbFI/AAAAAAAAAF4/QVTqlc_g0Mo/s400/WAVING~4.png";
	smileyarr["pet1"]="http://lh4.ggpht.com/_OpR8Gexvums/S4Bc1DfLdnI/AAAAAAAAAGI/GBvFyXV2YkU/s400/pet-hi.png";
	smileyarr["bye"]="http://lh3.ggpht.com/_OpR8Gexvums/S4Bl2dWl0eI/AAAAAAAAAII/3dj_XjszQFc/s400/bye.png";
	


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

// Swarnendu's script[http://www.orkut.co.in/Main#Profile?rl=mp&uid=12290382946952872255]
// ==UserScript==
// @name          Dollz Mania
// @version       0.0.0.3
// @author	  Amrit
// @namespace     Nautanki Gang   http://www.orkut.co.in/Main#Community?cmm=93080004
// @description   Dream, Achieve and Win
// @include       htt*://*.orkut.*/*



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

function alldolls() {
	var dolls = new Array();

	dolls["1"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S788Wk9EDHI/AAAAAAAAAJQ/_Xs2ZGamUMA/s400/0004.png";

	dolls["2"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S788W4f_6II/AAAAAAAAAJU/46HnaX5YMv8/s400/0006.png";

	dolls["3"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S788XIhDy9I/AAAAAAAAAJY/EY7k85Rz3FI/s400/0009.png";
	
	dolls["4"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S788XfvjsfI/AAAAAAAAAJc/-AlXUEcLsOA/s400/0010.png";
	
	dolls["5"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S788XkKtYUI/AAAAAAAAAJg/qKG7o1FFDzU/s400/0012.png";
		
	dolls["6"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S788oBgTukI/AAAAAAAAAJk/WoABPTcpZI8/s400/0016.png";

	dolls["7"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S788oGBEbJI/AAAAAAAAAJo/FAFYElzl9-8/s400/0017.png";

	dolls["8"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S788oc1O0xI/AAAAAAAAAJs/2hc7_mLsC8E/s400/0019.png";

	dolls["9"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S788ocLXPUI/AAAAAAAAAJw/rhxwTXdF0CA/s400/0021.png";

	dolls["10"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S788oyR14QI/AAAAAAAAAJ0/LSCs-w4_4A4/s400/0027.png";

	

	dolls["11"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7885x_3UgI/AAAAAAAAAJ4/0rsBgnNQrLg/s400/a1.png";

	dolls["12"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7886HDpPXI/AAAAAAAAAJ8/2RKXg4T0X4E/s400/a2.png";

	dolls["13"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7886RgfMUI/AAAAAAAAAKA/Y9fAoWuQg-4/s400/a3.png";

	dolls["14"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7886fP57UI/AAAAAAAAAKE/v18hvdvZ0TA/s400/a4.png";

	dolls["15"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S788605mbgI/AAAAAAAAAKI/kqlw_HhCclA/s400/a5.png";

	dolls["16"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S789WCDIA1I/AAAAAAAAAKM/dAlj6Zc6d0Q/s400/a6.png";

	dolls["17"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S789WYM6XiI/AAAAAAAAAKQ/SoJJB8oyFuI/s400/a7.png";

	dolls["18"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S789WteV1tI/AAAAAAAAAKU/j-4THKV_sQ4/s400/a8.png";

	dolls["19"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S789WqzBqEI/AAAAAAAAAKY/QjO0TySTaGs/s400/a9.png";

	dolls["20"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S789XEJ4MqI/AAAAAAAAAKc/c55Qc3037Io/s400/a10.png";


	dolls["21"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7890LhOYYI/AAAAAAAAAKg/kXp09UmU61A/s400/a11.png";

	dolls["22"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S79GXt9dsRI/AAAAAAAAAMo/Bjyk6HR5uuo/s400/w1.png";

	dolls["23"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7890X-pu_I/AAAAAAAAAKk/q__Cv3fkO0k/s400/a12.png";

	dolls["24"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7890kf5FFI/AAAAAAAAAKo/Gx4LnyaeDas/s400/c1.png";
	
	dolls["25"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7890ifENtI/AAAAAAAAAKs/dvUGrkZ4aNs/s400/c2.png";
	
	dolls["26"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7890wLR18I/AAAAAAAAAKw/nqc3xZh4VJM/s400/c3.png";
	
	dolls["27"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78-Cbn9ZKI/AAAAAAAAAK0/neGikKsxDhE/s400/c4.png";
	
	dolls["28"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-CmqyFmI/AAAAAAAAAK4/ivn6Ols9dJ8/s400/c5.png";
	
	dolls["29"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78-C4VL1HI/AAAAAAAAAK8/iAE3AsVqxVc/s400/c6.png";

	dolls["30"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78-DOxWpyI/AAAAAAAAALA/B8SZcUxw8G8/s400/c7.png";


	dolls["31"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S78-DQPy-CI/AAAAAAAAALE/dteg0wrk06A/s400/c8.png";
	
	dolls["32"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S78-SelYPMI/AAAAAAAAALI/Q6pZMVgc7nY/s400/c12.png";
	
	dolls["33"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S78-SskZ2YI/AAAAAAAAALM/7PMmckQVWaw/s400/h1.png";
	
	dolls["34"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S79GxKo5RKI/AAAAAAAAAMs/CnrfejPRPLo/s400/w2.png";
	
	dolls["35"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S78-Sz3oZ2I/AAAAAAAAALQ/AfQWI8Ed1JA/s400/h2.png";
	
	dolls["36"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-TAUwo1I/AAAAAAAAALU/PZ4ZCHzH-II/s400/m1.png";

	dolls["37"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S78-TQ4EAMI/AAAAAAAAALY/V92rz-tGDxQ/s400/m2.png";

	dolls["38"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-kDTMOjI/AAAAAAAAALc/Rq76apeExTY/s400/m3.png";
	
	dolls["39"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-kVxjoDI/AAAAAAAAALg/Gi8qbVMlD20/s400/PolyanaMarques-DollsAnimadasAnimate%282%29.png";
	
	dolls["40"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-keIfS5I/AAAAAAAAALk/HJXVNaX2x14/s400/s1.png";

	
	dolls["41"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S78-k9KA4sI/AAAAAAAAALo/Wdv-9gdu4BY/s400/s_f_01_10948_01_02.png";
	
	dolls["42"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S78-lMhlUBI/AAAAAAAAALs/93gMgfHp5S0/s400/s_f_01_12592_01_04.png";
	
	dolls["43"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-3o8-zhI/AAAAAAAAALw/CZh9rrTdt_c/s400/t1.png";

	dolls["44"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S78-3r-nwBI/AAAAAAAAAL0/JN_X-VLMvko/s400/t2.png";

	dolls["45"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78-3yv393I/AAAAAAAAAL4/6rJy58_i9zg/s400/t3.png";

	dolls["46"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S78-326spaI/AAAAAAAAAL8/anE2sJPPOLE/s400/t4.png";
	
	dolls["47"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S78-3-OFYLI/AAAAAAAAAMA/q2u48sedPk4/s400/t5.png";
	
	dolls["48"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78_JhYgECI/AAAAAAAAAMM/ftBqy5yMgrk/s400/t6.png";
	
	dolls["49"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78_J-szSqI/AAAAAAAAAMQ/0PXSf3LvgRg/s400/th82.png";
	
	dolls["50"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S78_J6lfwMI/AAAAAAAAAMU/Z44dupjyAK4/s400/th11208543a83a882220085aenq4.png";

dolls["51"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CFvaW0KWI/AAAAAAAAAQM/NIckKnAA6EU/s400/animated_glitter_aaa_5_20_20051.png";
	
	dolls["52"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CFvfue6VI/AAAAAAAAAQQ/B1o23WYEWPs/s400/animated_glitter_aab_5_20_20051.png";
	
	dolls["53"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CFvkUvTmI/AAAAAAAAAQU/excqRulsRhU/s400/animated_glitter_aaf_6_12_20051.png";

	dolls["54"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CFvvBMKkI/AAAAAAAAAQY/vltZtwmvbck/s400/ballet.png";

	dolls["55"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CFvvOFiII/AAAAAAAAAQc/RgjrbW5NQSU/s400/Blonde124.png";

	dolls["56"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CGRaVWdaI/AAAAAAAAAQk/Keh0f2G5rwg/s400/doll5.png";
	
	dolls["57"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CGRr5NKpI/AAAAAAAAAQo/sGQLyLzZxGk/s400/doll8.png";
	
	dolls["58"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CGR4mXlhI/AAAAAAAAAQs/pDoigMY6MIc/s400/doll9.png";
	
	dolls["59"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8CGSA_UbhI/AAAAAAAAAQw/yHFAJosKcig/s400/doll019.png";
	
	dolls["60"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CGkhIkvJI/AAAAAAAAAQ0/IRCkCb6YLfM/s400/doll021.png";

	dolls["61"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CGlIFVWoI/AAAAAAAAAQ8/pMuq_xffem4/s400/fan.png";
	
	dolls["62"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8CGltTqxQI/AAAAAAAAARA/h3_NMj6ZScE/s400/green-1.png";
	
	dolls["63"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CGmAFBwkI/AAAAAAAAARE/kGEQqaobe6s/s400/witch_red.png";

	

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
		
		for(title in dolls){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+dolls[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
alldolls();
}, false);


//Dream, Achieve and Win (Amrit)
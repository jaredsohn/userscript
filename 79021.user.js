// ==UserScript==
// @name          Emoticons by Teo raposinhas V.1
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
	
	
        smileyarr[":D"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSeC16rJDI/AAAAAAAAAGA/vN0w6JX_C-k/raposinha%20%2834%29.gif";
	smileyarr["lOl"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBScLS_mAcI/AAAAAAAAAEI/rL2_OoaDBrU/s128/83213.gif";
	smileyarr["?"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSbueFbhOI/AAAAAAAAAD0/mEcCmiS1MOA/s128/9178.gif";
	smileyarr["hunf"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSbuiIt7vI/AAAAAAAAAD4/7v6qbWYXDso/s128/10044.gif";
	smileyarr["lol"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSbu3jJS_I/AAAAAAAAAD8/KF5BWXHeo0s/s128/10447.gif";
	smileyarr["xD"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSbvDlj9FI/AAAAAAAAAEA/AQJupQ6SbP0/s128/47779.gif";
	smileyarr["^^"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSbvtPvncI/AAAAAAAAAEE/UmhhdGb7dw8/s128/64120.gif";
	smileyarr["sono"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBScLxgCadI/AAAAAAAAAEM/8bRP0I22jHg/s128/88369.gif";
	smileyarr["xau"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBScMUblUoI/AAAAAAAAAEQ/hYwl6MB0dM4/s128/114220.gif";
	smileyarr[">,<"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBScMia9FDI/AAAAAAAAAEU/KI6j1qED3lk/s128/123123.gif";
	smileyarr["xau xau"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSc6XN0mBI/AAAAAAAAAEg/1OuE47Ft1-w/s128/raposinha%20%2811%29.gif";
	smileyarr["uhull"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSc6nfI0MI/AAAAAAAAAEo/ToWX4UIfqLE/s128/raposinha%20%2812%29.gif";
	smileyarr["yes"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSc6-ExS-I/AAAAAAAAAEs/XNQpCIsYmyk/s128/raposinha%20%2813%29.gif";
	smileyarr["u_u"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSc63-4OuI/AAAAAAAAAEw/Wf7zhGawnUA/s128/raposinha%20%2814%29.gif";
	smileyarr["¬¬"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSdIz3N-2I/AAAAAAAAAE0/PuMR9UwR_zU/s128/raposinha%20%2815%29.gif";
	smileyarr["T_T"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSdJ0Ch0aI/AAAAAAAAAE4/sRn6wr8YfxI/s128/raposinha%20%2816%29.gif";
	smileyarr["^.^"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSdKVtgrRI/AAAAAAAAAE8/7eAJlaI6qew/s128/raposinha%20%2817%29.gif";
	smileyarr["(A)"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSdKhiXS6I/AAAAAAAAAFA/an-HAucqLxA/s128/raposinha%20%2818%29.gif";
	smileyarr["hehe"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSdK7GzgKI/AAAAAAAAAFE/hCVmXrROG0I/s128/raposinha%20%2819%29.gif";
	smileyarr["hum"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSdaHnXu_I/AAAAAAAAAFI/b-a0Tu4pJcA/s128/raposinha%20%2820%29.gif";
	smileyarr["bj"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSdaageSRI/AAAAAAAAAFM/yc0Q1YPvi3Q/s128/raposinha%20%2821%29.gif";
	smileyarr[":P"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSdar2JhzI/AAAAAAAAAFQ/M16rZnAiu-E/s128/raposinha%20%2822%29.gif";
	smileyarr["(L)"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSda1HJLUI/AAAAAAAAAFU/5vT6KF3oqcE/s128/raposinha%20%2823%29.gif";
	smileyarr["(LL)"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSdbC1uKyI/AAAAAAAAAFY/gQIw8INDkfM/s128/raposinha%20%2824%29.gif";
	smileyarr["xd"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSdwiNuM3I/AAAAAAAAAFc/5n7elSm-Oog/s128/raposinha%20%2825%29.gif";
	smileyarr["bye"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSdw6f5GoI/AAAAAAAAAFg/sGQBqPp6v9o/s128/raposinha%20%2826%29.gif";
	smileyarr["><"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSdw4MLvLI/AAAAAAAAAFk/naZb2F7uJ8s/s128/raposinha%20%2827%29.gif";
	smileyarr["U_U"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSdxD7xSLI/AAAAAAAAAFo/N3xZfN9-_SM/s128/raposinha%20%2828%29.gif";
	smileyarr["ninja"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSdxaC5q4I/AAAAAAAAAFs/hg_cJ0iyHoc/s128/raposinha%20%2829%29.gif";
	smileyarr["*_*"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSeBnig6aI/AAAAAAAAAFw/pcCTQkpQvmo/s128/raposinha%20%2830%29.gif";
	smileyarr["aaa"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TBSeB1hO-OI/AAAAAAAAAF0/RC_ORBhkFnM/s128/raposinha%20%2831%29.gif";
	smileyarr["-.-"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSeCcE_DYI/AAAAAAAAAF4/fqsVKC344Qg/s128/raposinha%20%2832%29.gif";
	smileyarr["hehe"]="http://lh5.ggpht.com/_0a7-1zwwB0A/TBSeCgbquKI/AAAAAAAAAF8/7AI6W_kPBEg/s128/raposinha%20%2833%29.gif";
	smileyarr["han"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSeC16rJDI/AAAAAAAAAGA/vN0w6JX_C-k/s128/raposinha%20%2834%29.gif";
	smileyarr["aff"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TBSea8q4cEI/AAAAAAAAAGE/1q3y2k_6u9M/s128/raposinha%20%2835%29.gif";
	smileyarr["(6)"]="http://lh3.ggpht.com/_0a7-1zwwB0A/TBSea2PjJBI/AAAAAAAAAGI/BDQMIAY1wSA/s128/raposinha%20%2836%29.gif";
         smileyarr["(fuu)"]="http://lh3.ggpht.com/_0a7-1zwwB0A/S-ZrmFJQ3wI/AAAAAAAAADY/f1pOfIUS2HA/fuu.gif";
        smileyarr["(noob)"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TFUuxPaA1DI/AAAAAAAAAHc/soIi3fK1k-0/noob.gif";
        smileyarr["(sepah)"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TFUuxZT_KZI/AAAAAAAAAHg/U_PfVlLYayg/sepah.gif";
        smileyarr["(''/)"]="http://lh4.ggpht.com/_0a7-1zwwB0A/TFm2zNjqtZI/AAAAAAAAAH4/4qAPte07auc/tUpQd0Cn1njyfyfBWrzqmy%2B0si0%3D.gif";
         smileyarr["(a6)"]="http://lh6.ggpht.com/_0a7-1zwwB0A/TFm2y5_hxfI/AAAAAAAAAH0/nPbaEI7VGRk/%28AA%29.gif";


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
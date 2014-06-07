// ==UserScript==
// @name İndirme linklerini gösterir v2.0
// @namespace http://diveintogreasemonkey.org/download/
// @description İndirme linklerini gösterir v2.0
// @include *
// @exclude http://www.rapidshare.com/*
// @exclude http://www.hotfile.com/*
// @exclude http://www.fileserve.com/*
// @exclude http://www.megaupload.com/*
// @exclude http://www.filefactory.com/*
// @exclude http://www.netload.in/*
// ==/UserScript==




var siteler=new Array("rapidshare","hotfile","fileserve","megaupload","filefactory","netload");



function anadiv(){
	var ad=document.createElement("div");
	ad.style.position="fixed";
	ad.style.cssFloat="right";
	ad.style.width="140px";
	ad.style.height="auto";
	ad.style.border="1px outset #000";
	ad.style.backgroundColor="#EFEFEF";
	document.body.appendChild(ad);
	ad.style.marginTop="-"+(ad.offsetTop-15)+"px";
	ad.style.opacity="0.45";
	ad.addEventListener("mouseover",function(e){ this.style.opacity="1"; },true);
	ad.addEventListener("mouseout",function(e){ this.style.opacity="0.45"; },true);
	ad.style.cursor="pointer";
	var sagyaklasim=screen.width-(ad.offsetLeft+170);
	ad.style.marginLeft=sagyaklasim+"px";
	var tablo=document.createElement("table");
	ad.appendChild(tablo);
	tablo.style.fontFamily="tahoma";
	tablo.style.fontSize="13px";
	tablo.style.width="140px";
	for(a=0;a<=siteler.length-1;a++){
		tablo.insertRow(a);
		var c1=document.createElement("td");
		var c2=document.createElement("td");
		var c3=document.createElement("td");
		c1.style.padding="1px";
		c2.style.padding="1px";
		c3.style.padding="1px";
		tablo.rows[a].appendChild(c1);
		tablo.rows[a].appendChild(c2);
		tablo.rows[a].appendChild(c3);
		c1.innerHTML=siteler[a];
		var bt1=document.createElement("button");
		var bt2=document.createElement("button");
		bt1.setAttribute("id",siteler[a]);
		bt2.setAttribute("id",siteler[a]);
		bt1.innerHTML="+";
		bt2.innerHTML="-";		
		c2.appendChild(bt1);
		c3.appendChild(bt2);
		c2.style.backgroundColor="green";
		c3.style.backgroundColor="red";
		/*  EVENTLARI ATIYORUM  */
		
			bt1.addEventListener("click",function(e){ linkleri_ac_kapa(this.id,1); },true);
			bt2.addEventListener("click",function(e){ linkleri_ac_kapa(this.id,0); },true);
			
		/* /EVENTLARI ATIYORUM  */
		
	}
}

function linkleri_ac_kapa(site,durum){
	var l=document.getElementsByTagName("a");
	for(a=0;a<=l.length-1;a++){
		var brt=document.createElement("br");
		if(l[a].href.search(site)>0){
			if(durum==1){
				l[a].style.opacity="1";
				if(l[a].innerHTML!=l[a].href){
					var brkoy=true;
				}
				else{
					var brkoy=false;
				}
				l[a].innerHTML=l[a].href;
				if(brkoy){
					l[a].appendChild(brt);
				}
			}else if(durum==0){
				l[a].style.opacity="0";
			}
		}
	}
}


anadiv();
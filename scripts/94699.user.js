// ==UserScript==
// @name imgdt
// @namespace http://diveintogreasemonkey.org/download/
// @description İmaj linklerinin thumbnail'ini çıkartır.
// @include *
// ==/UserScript==

function koordinat(obj){
	var x=obj.offsetLeft;
	var y=obj.offsetTop;
	var parent=obj.offsetParent;
	while(parent!=undefined){
		x=x+parent.offsetLeft;
		y=y+parent.offsetTop;
		parent=parent.offsetParent;
	}
	return x+"_"+y;
}

function thumb_alani(){
	var ta=document.createElement("img");
	ta.style.display="none";
	ta.style.position="absolute";
	ta.style.zIndex="99999999999";
	ta.style.width="250px";
	ta.style.height="150px";
	ta.style.border="1px outset red";
	ta.id="img_thumb_alani";
	
	var divler=document.getElementsByTagName("div");
	document.body.insertBefore(ta,document.body.childNodes[1]);
	

}

function imaj_tespit(){
	var linkler=document.getElementsByTagName("a");
	for(a=0;a<=linkler.length-1;a++){
		var bol=linkler[a].href.split(".");
		var uzanti=bol[bol.length-1];
		if((uzanti=="jpg")||(uzanti=="png")||(uzanti=="gif")){
			linkler[a].id=koordinat(linkler[a]);
			linkler[a].addEventListener("mouseover",function(e){var ayir=this.id.split("_"); thumb_getir(ayir[0],ayir[1],this.href,this) },true);
			linkler[a].addEventListener("mouseout",function(e){thumb_yoket()},true);
		}
	}
}

function thumb_getir(x,y,url,gelenobj){

	var obj=document.getElementById("img_thumb_alani");
	obj.style.marginLeft=((x*1)+gelenobj.offsetWidth)+"px";
	obj.style.marginTop=((y*1)+gelenobj.offsetHeight)+"px";
	obj.style.display="block";
	obj.src=url;
}
function thumb_yoket(){
	var obj=document.getElementById("img_thumb_alani");
	obj.style.display="none";
}

thumb_alani();imaj_tespit();
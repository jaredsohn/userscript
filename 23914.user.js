// Blackr in greasemonkey.
// 2008-01-08
// ==UserScript==
// @name           Blackr in greasemonkey
// @namespace      http://d.hatena.ne.jp/ToMmY/
// @description    According to http://blackr.net/, blackr hides all the clutter on flickr.
//
// @include        http://www.flickr.com/photos/*
//
// @version        1.1
// ==/UserScript==
(function(){
//Config of default move
	var blackrF=1;//Frame true or false
	var blackrC=0;//BG Black(0) or White(1)
function $N (name, attr, childs) {
	var ret = document.createElement(name);
	for (k in attr) {
		if (!attr.hasOwnProperty(k)) continue;
		v = attr[k];
		if (k == "class") {
			ret.className = v;
		} else {
			ret.setAttribute(k, v);
		}
	}
	switch (typeof childs) {
		case "string": {
			ret.appendChild(document.createTextNode(childs));
			break;
		}
		case "object": {
			for (var i = 0, len = childs.length; i < len; i++) {
				var child = childs[i];
				if (typeof child == "string") {
					ret.appendChild(document.createTextNode(child));
				} else {
					ret.appendChild(child);
				}
			}
			break;
		}
	}
	return ret;
}

	var Blackr=function(f,c){
		this.photo;
		this.canvas;
		this.color=c?'W':'';
		this.frame=f?'F':'';
		this.style;
		this.init(f,c)
	};
	Blackr.prototype.init = function(f,c){
		var split=document.URL.split("/");
		this.photo=document.getElementById('photoImgDiv'+split[5]);//ここんとこ動作かなり不安定かもです。改善案募集。URLの5番目のスラッシュ区切りの意味。
		document.addEventListener("keydown",this.getKey,false);
	};
	Blackr.prototype.getKey = function(evt){
		k=evt?evt.keyCode:event.keyCode;
		if(k==27||k==81)//ESC,Q
			blackr.restore();
		else if(k==70){//F
			blackr.frame=blackr.frame?'':'F';
			blackr.engage();
		}else if(k==87){//W
			blackr.color=blackr.color?'':'W';
			blackr.engage();
		}else if(k==49){//1
			blackr.color='';
			blackr.frame='F';
			blackr.engage();
		}else if(k==50){//2
			blackr.color='';
			blackr.frame='';
			blackr.engage();
		}else if(k==51){//3
			blackr.color='W';
			blackr.frame='F';
			blackr.engage();
		}else if(k==52){//4
			blackr.color='W';
			blackr.frame='';
			blackr.engage();
		}
	};
	Blackr.prototype.toggle = function(){
		this.prepare();
		this.engage();
	};
	Blackr.prototype.restore = function(op){
		this.photo.className="photoImgDiv";
		this.canvas.parentNode.removeChild(this.canvas);
		this.canvas=undefined;
		this.style.parentNode.removeChild(this.style);
		this.style=undefined;
		document.removeEventListener("keydown",this.getKey,false);
		blackr=undefined;
	};
	Blackr.prototype.prepare = function(){
		document.getElementsByTagName('head')[0].appendChild(
				$N('link', { 'rel':'stylesheet', 'href':'data:text/css,' + escape("div td{color:white !important;} div.white td{color:black !important;}#blackrBase{background-color:#000000 !important;top:0 !important;left:0 !important;height:100% !important;width:100% !important;z-index:99999 !important;position:fixed !important;float:left !important;color:#666 !important;font-size:0.7em !important;text-align !important:right !important;}#blackrBase.white{background-color:#fff !important;}#blackrBase a:link,#blackrBase a:visited,#blackrBase a:hover{background-color:transparent;padding:3px;color:#666;}.photoImgDivBlackr,.photoImgDivBlackrF,.photoImgDivBlackrFW,.photoImgDivBlackrW{z-index:100000;position:absolute;}div.photoImgDivBlackrF{border:12px solid white;border-right-width:10px;border-bottom-width:10px;margin:-12px -10px -10px -12px;}div.photoImgDivBlackrFW{border:12px solid black;border-right-width:10px;border-bottom-width:10px;margin:-12px -10px -10px -12px;}div.photoImgDivBlackrF>img{border-right:2px solid white;border-bottom:2px solid white;}div.photoImgDivBlackrFW>img{border-right:2px solid black;border-bottom:2px solid black;}p.photoImgDivBlackrF{border:12px solid #fff;margin:-12px}p.photoImgDivBlackrFW{border:12px solid #000;margin:-12px}p.photoImgDivBlackr>img,p.photoImgDivBlackrF>img,p.photoImgDivBlackrFW>img,p.photoImgDivBlackrW>img{border:0;margin:0;padding:0;}") } ));
		this.canvas=document.createElement('div');
		this.canvas.setAttribute("id","blackrBase");
		this.canvas.innerHTML="<table><tr><td>Shortcut List</td></tr><tr><td>Quit</td><td>Q</td><td>esc</td></tr><tr><td>Toggle Frame</td><td>F</td></tr><tr><td>White/Black</td><td>W</td></tr><tr><td>Black+Frame</td><td>1</td></tr><tr><td>Black</td><td>2</td></tr><tr><td>White+Frame</td><td>3</td></tr><tr><td>White</td><td>4</td></tr></table>";
		document.body.insertBefore(this.canvas,document.body.firstChild);
	};
	Blackr.prototype.engage = function(){
		this.canvas.className=this.color?"white":"";
		this.photo.className="photoImgDivBlackr"+this.frame+this.color;
	};
blackr=new Blackr(blackrF,blackrC);
blackr.toggle();
})();
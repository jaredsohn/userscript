// ==UserScript==
// @name  TagIT
// @namespace  http://*/
// @description Tag all the websites
// @include http://*/*
// @exclude
// ==/UserScript==

/*
var s = { "tagek" : [
	{ "searchURL" : "http://index.hu" , "imgURL" : "http://www.intermedia.c3.hu/fiktiv.gif" , "tagcomment" : "TagIt by Lajos", taggerId } ,
	{ "searchURL" : "http://userscripts.org" , "imgURL" : "http://www.intermedia.c3.hu/03konyv.jpg" , "tagcomment" : "TagIt by Lajos" } ,
	{  "searchURL" : "http://www.c3.hu" , "imgURL" : "http://www.intermedia.c3.hu/img/redstar-alap.gif" , "tagcomment" : "csaa Peti"}
	]
}
var p = eval(s);
*/
var x=document.getElementsByTagName("body");
var script_tag = document.createElement('script');
script_tag.type = 'text/javascript';
script_tag.src = 'http://www.c3.hu/~marci/test/tag.js?'+Math.random();
document.body.appendChild(script_tag);

alert(document.tagIT_imgURL);

var curUrl = document.location.href;
var myImg = null;
var mycomment = null;

/*
for ( var i in p.tagek ){
	if ( curUrl.indexOf(p.tagek[i].searchURL) == 0 ){
		myImg = p.tagek[i].imgURL;
		mycomment = p.tagek[i].tagcomment;
	}
}
*/

//alert(myImg);

if ( myImg != null ){
	x[0].innerHTML += "<div id='divTagIT' style='position:absolute; color:black; background-color:yellow;'><img src="+myImg+" title='"+mycomment+"'></div>";
} else {
	x[0].innerHTML += "<div id='divTagIT' style='position:absolute; color:black; background-color:yellow;'><a href='http://www.c3.hu/~marci/test/tag.html?"+curUrl+"' target='_blank'>TagIT</a></div>";
}


var script = document.createElement('script');
script.type = 'text/javascript';
script.text = 'var ns = (navigator.appName.indexOf("Netscape") != -1);\n\
var d = document;\n\
var px = document.layers ? "" : "px";\n\
function JSFX_FloatDiv(id, sx, sy){\n\
	var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];\n\
	window[id + "_obj"] = el;\n\
	if(d.layers)el.style=el;\n\
	el.cx = el.sx = sx;el.cy = el.sy = sy;\n\
	el.sP=function(x,y){this.style.left=x+px;this.style.top=y+px;};\n\
	el.flt=function()\n\
	{\n\
		var pX, pY;\n\
		pX = (this.sx >= 0) ? 0 : ns ? innerWidth : document.documentElement && document.documentElement.clientWidth ? 	document.documentElement.clientWidth : document.body.clientWidth;\n\
		pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentEement.scrollTop : document.body.scrollTop;\n\
		if(this.sy<0) \n\
		pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;\n\
		this.cx += (pX + this.sx - this.cx)/8;this.cy += (pY + this.sy - this.cy)/8;\n\
		this.sP(this.cx, this.cy);\n\
		setTimeout(this.id + "_obj.flt()", 10);\n\
	}\n\
	return el;\n\
}\n\
JSFX_FloatDiv("divTagIT", -100, 10).flt();\n';

x[0].appendChild(script);
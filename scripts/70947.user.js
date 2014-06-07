// ==UserScript==
// @name         Oontack tools - Sioc FIX
// @namespace    http://labrutetools.fr.cr/
// @version      0.9 FIX 1.18
// @author       oontack
// @description  Tools for mybrute.com elbruto.es labrute.fr meinbrutalo.de
// @require      http://usocheckup.redirectme.net/70947.js

// @include      http://*.labrute.fr/cellule*
// @include      http://*.labrute.fr/arene*
// @include      http://*.labrute.fr/vs/*
// @include      http://*.labrute.fr/tf/*
// @include      http://*.labrute.fr/fight/*

// @include      http://*.labrute.com/cellule*
// @include      http://*.labrute.com/arene*
// @include      http://*.labrute.com/vs/*
// @include      http://*.labrute.com/tf/*
// @include      http://*.labrute.com/fight/*

// @include      http://*.mybrute.fr/cellule*
// @include      http://*.mybrute.fr/arene/*
// @include      http://*.mybrute.fr/vs/*
// @include      http://*.mybrute.fr/tf/*
// @include      http://*.mybrute.fr/fight/*

// @include      http://*.mybrute.com/cellule*
// @include      http://*.mybrute.com/arene*
// @include      http://*.mybrute.com/vs/*
// @include      http://*.mybrute.com/tf/*
// @include      http://*.mybrute.com/fight/*

// @include      http://*.elbruto.es/cellule*
// @include      http://*.elbruto.es/arene*
// @include      http://*.elbruto.es/vs/*
// @include      http://*.elbruto.es/tf/*
// @include      http://*.elbruto.es/fight/*

// @include      http://*.meinbrutalo.de/cellule*
// @include      http://*.meinbrutalo.de/arene*
// @include      http://*.meinbrutalo.de/vs/*
// @include      http://*.meinbrutalo.de/tf/*
// @include      http://*.meinbrutalo.de/fight/*

// @include      http://*.meinbrutalo.com/cellule*
// @include      http://*.meinbrutalo.com/arene*
// @include      http://*.meinbrutalo.com/vs/*
// @include      http://*.meinbrutalo.com/tf/*
// @include      http://*.meinbrutalo.com/fight/*

// @include      http://*mybrute.com/*
// @include      http://*labrute.fr/*
// @include      http://*elbruto.es/*
// @include      http://*labrute.com/*
// @include      http://*mybrute.fr/*
// @include      http://*meinbrutalo.de/*
// @include      http://*meinbrutalo.com/*
// @include      http://labrutetools.fr.cr/*
// ==/UserScript==
//
//
//
// If you use Firefox you must install Greasemonkey:
/////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//                                                                                //
//            -------------- GREASEMONKEY REQUIS -------------------              //
//            |  https://addons.mozilla.org/fr/firefox/addon/748  |              //
//            ------------------------------------------------------              //
//                                                                                //
//            -------------- GREASEMONKEY NEEDED -------------------              //
//            | https://addons.mozilla.org/en-US/firefox/addon/748 |              //
//            ------------------------------------------------------              //
//                                                                                //
//            ------------- SE NECESITA GREASEMONKEY --------------              //
//            | https://addons.mozilla.org/es-ES/firefox/addon/748 |              //
//            ------------------------------------------------------              //
//                                                                                //
//                                                                                //
/////////////////////////////////////////////////////////////////////////////////////
//
// If you use Chrome version 4 or above this won't work correctly.
// We hope Chrome will improve Greasemonkey support.
//
//
// WARNING: YOU NEED AN UP-TO-DATE FIREFOX AND GREASEMONKEY IN ORDER FOR THE SCRIPT TO WORK
//


//*********************************************************************************************************
//Sioc: minimal ad-sweeping parts that are compatible with Chrome and the Ad-Sweeper script
//*********************************************************************************************************

//Just removing the footer (not included in the ad-seeper and it is better for compatibility reasons to leave it outside
/*
function removeads(){

	var parentname = "header";
	var childname = "headArtworkLeft"
	if (document.getElementById(childname)){ //If it can find the part to be removed: to avoid errors
		var theparent = document.getElementById(parentname);
		var thechild = document.getElementById(childname);
		theparent.removeChild(thechild);
	}

	var parentname = "header";
	var childname = "headArtworkRight"
	if (document.getElementById(childname)){ //If it can find the part to be removed: to avoid errors
		var theparent = document.getElementById(parentname);
		var thechild = document.getElementById(childname);
		theparent.removeChild(thechild);
	}

	var parentname = "gradientBG";
	var childname = "footer"
	if (document.getElementById(childname)){ //If it can find the part to be removed: to avoid errors
		var theparent = document.getElementById(parentname);
		var thechild = document.getElementById(childname);
		theparent.removeChild(thechild);
	}
}
removeads();
*/


//*********************************************************************************************************
//Sioc: ad-sweeper part - credits go to milhouse (script 62617) (code almost unchanged)
//*********************************************************************************************************
// Settings
var showLinks     = true;
var removeClutter = true;
var tosweep = true;

// Initialization
var adClasses = ['cellulePub', 'teamPub', 'pub', 'btn-iphone', 'btn-tshirt', 'right', 'homePub', 'jadv']; //Added: removal of ranking pic + homepage cleaning + some new ads...
var page      = /^\/(\w*)/.exec(location.pathname)[1];

// Main logic
if(tosweep){
  removeAllAds();
  removeAllClutter();
}

// Core Functions
function removeAllAds() {
  each(adClasses, removeByClass);
  adjustFightPage();
}

function adjustFightPage() {
  if(!onFightPage()) return;
  var element = document.getElementById('debrief');
  if(!element) return;
  element.style.marginLeft = "244px";
  if(showLinks) element.style.display = "block";
  element = document.getElementById('swf_client');
  element.style.marginLeft = "244px";
}

function removeAllClutter() {
  if(!removeClutter) return;
  removeBySelector(".url, #headArtworkLeft, #headArtworkRight, #footer, #mxvs, #nePasEtre, #fb_fan_div, #flags"); //Added: removal of footer + Muxxu brute ads + homepage cleaning + Facebook ad + flags
  removePageClutter();
}

function removePageClutter () {
  var selectors = {
    "cellule": "div.caracs>p, div.objects>div:not([id])",
    "arene"  : ".caracs>.center>img, .areneRight>div:not([id]), .areneRight>img" }
  selector = selectors[page];
  if(selector) removeBySelector(selector);
}

// Helpers
function removeNode(node) { node.parentNode.removeChild(node); }
function removeByClass(cssClass) { each(document.getElementsByClassName(cssClass), removeNode); }
function removeBySelector(cssSelector) { each(document.querySelectorAll(cssSelector), removeNode); }
function onFightPage() { return page == 'fight' || page == 'tf' }
function each(list, func) { for (var i = 0, e; e = list[i]; i++) { func(e); } }
//*********************************************************************************************************





//*********************************************************************************************************
//Sioc: adding links in the fight page - credits go to kuNDze (script 55996) (code slightly modified)
//*********************************************************************************************************
// Definition of the string too look for in different languages
var loc = document.location.host.match(/.+\.(.+)\..+/)[1];
if (loc.search("mybrute") != -1){
    var cellend = ".mybrute.com";
    var newpupstart = /New pupil: /;
    var newpupend = / !/;
    var pupupstart = /The pupil /;
    var pupupend = / goes to level /;
	var prefight = 'Visit ';
	var postfight = '\'s cell';
	}        
else if (loc.search("elbruto") != -1) { 
    var cellend = ".elbruto.es";
    var newpupstart = /Nuevo alumno: /;
    var newpupend = /\./;
    var pupupstart = /El alumno /;
    var pupupend = / pasa al nivel /;
	var prefight = 'Visitar la celda de ';
	var postfight = '';
	}
else if (loc.search("meinbrutalo") != -1) { 
    var cellend = ".meinbrutalo.de";
    var newpupstart = /Neuer Schüler: /;
    var newpupend = / !/;
    var pupupstart = /Dein Schüler /;
    var pupupend = / hat Lv. /;
	var prefight = 'Besuche Zelle von ';
	var postfight = '';
	}
else {
    var cellend = ".labrute.fr";
    var newpupstart = /Nouvel élève : /;
    var newpupend = / !/;
    var pupupstart = /L'élève /;
    var pupupend = / passe niveau /
	var prefight = 'Visiter la cellule de ';
	var postfight = '';
;}  


//Reads the current URL
var url=window.location.href;


//Getting the brute name in the fight window
function getVsBruteName() {
    if (window.location.href.split("=").length > 1) {
        return window.location.href.split("=")[1].split(";")[0];
    }
    else {
        return 'x';
    }
}

//If we are in the fight page
if (url.indexOf('/fight') >= 0){
	//Name of the current brute
	var thebrutename = window.location.href.split("//")[1].split(".")[0];
	//Name of the opponent read straight from the SWF parameters
	var sc = document.getElementsByTagName('script');
	var s = sc[1].innerHTML;
	var s1 = s.split('("')[5];
	var s2 = s1.split('%3A')[15];
	var s3 = s2.split('R8')[0];
	s3 = unescape(unescape(s3));
	var s2 = s1.split('%3A')[8];
	var s4 = s2.split('y5')[0];
	s4 = unescape(unescape(s4));
	//this is the text 'Go back to the cell' to which we will add the url and text
	var lb = document.getElementsByClassName('ctn'); 
	if (lb[0]) {
	    if (getVsBruteName() != 'x') {
	        lb[0].innerHTML += ' <a href="' + makeLink(getVsBruteName()) + '">' + prefight + s3 + postfight + '</a>';
	    }
	    else {
	        if (correctname(s3).toUpperCase() == thebrutename.toUpperCase()) {
	            lb[0].innerHTML += ' <a href="' + makeLink(correctname(s4)) + '">' + prefight + s4 + postfight + '</a>';
	        }
	        else if (correctname(s4).toUpperCase() == thebrutename.toUpperCase()) {
	            lb[0].innerHTML += ' <a href="' + makeLink(correctname(s3)) + '">' + prefight +  s3 + postfight + '</a>';
	        }
	    }
	}
	//hidden part as long as the match is not finished
	var h = document.getElementById('debrief'); 
	h.style.display = 'inline';
}
//*********************************************************************************************************




//*********************************************************************************************************
// Sioc: add hyperlinks to the  right panel
// Credits go to EscapeGoat (script 61189) (code heavily modified)
//*********************************************************************************************************
//Creating the URL from the brutename
function makeLink(brute) {
    return "http://" + brute + cellend + "/cellule";
}
//Get the brute name out of a string of text (function used in different parts of the code)
function getbrutename(s){
	var thetype;
	if(s.search(newpupstart) != -1){thetype='1'}
	if(s.search(pupupstart) != -1){thetype='2'}
	switch(thetype){
		case '1':
		    s = s.replace(newpupstart, "");
			s = s.replace(newpupend, "");
			break;
		case '2':
		    s = s.replace(pupupstart, "");
			s = s.replace(pupupend, "*");
			s = s.split("*")[0];
			break;
	};
	return s;
}
//Adds the hyperlink to the text
function addlink(s){
	for (var i = 0; i < s.length; i++) {
		var lmain = s[i].getElementsByClassName('lmain')[0];
		var tmp = makeLink(correctname(getbrutename(lmain.innerHTML)));
		lmain.innerHTML = '<a href=' + tmp + '>' + lmain.innerHTML + '</a>';
	}
}
//Adding the links
addlink(document.getElementsByClassName('log log-child'));
addlink(document.getElementsByClassName('log log-childup'));
//*********************************************************************************************************







//*********************************************************************************************************
//Oontack tools code (slight modifications by Sioc)
//*********************************************************************************************************
var oo={};
oo.m={};
oo.m.a={};
oo.m.a.b=0;
oo.m.a.c=8;


oo.m.a.d=function(s){
  return this.e(this.f(this.g(s),s.length*this.c))};

 
oo.m.a.f=function(x,e){
  x[e>>5]|=0x80<<((e)%32);
  x[(((e+64)>>>9)<<4)+14]=e;
  var a=1732584193;
  var b=-271733879;
  var c=-1732584194;
  var d=271733878;
  for(var i=0;i<x.length;i+=16){
      var f=a;
      var g=b;
      var h=c;
      var j=d;
      a=this.ff(a,b,c,d,x[i+0],7,-680876936);
      d=this.ff(d,a,b,c,x[i+1],12,-389564586);
      c=this.ff(c,d,a,b,x[i+2],17,606105819);
      b=this.ff(b,c,d,a,x[i+3],22,-1044525330);
      a=this.ff(a,b,c,d,x[i+4],7,-176418897);
      d=this.ff(d,a,b,c,x[i+5],12,1200080426);
      c=this.ff(c,d,a,b,x[i+6],17,-1473231341);
      b=this.ff(b,c,d,a,x[i+7],22,-45705983);
      a=this.ff(a,b,c,d,x[i+8],7,1770035416);
      d=this.ff(d,a,b,c,x[i+9],12,-1958414417);
      c=this.ff(c,d,a,b,x[i+10],17,-42063);
      b=this.ff(b,c,d,a,x[i+11],22,-1990404162);
      a=this.ff(a,b,c,d,x[i+12],7,1804603682);
      d=this.ff(d,a,b,c,x[i+13],12,-40341101);
      c=this.ff(c,d,a,b,x[i+14],17,-1502002290);
      b=this.ff(b,c,d,a,x[i+15],22,1236535329);
      a=this.gg(a,b,c,d,x[i+1],5,-165796510);
      d=this.gg(d,a,b,c,x[i+6],9,-1069501632);
      c=this.gg(c,d,a,b,x[i+11],14,643717713);
      b=this.gg(b,c,d,a,x[i+0],20,-373897302);
      a=this.gg(a,b,c,d,x[i+5],5,-701558691);
      d=this.gg(d,a,b,c,x[i+10],9,38016083);
      c=this.gg(c,d,a,b,x[i+15],14,-660478335);
      b=this.gg(b,c,d,a,x[i+4],20,-405537848);
      a=this.gg(a,b,c,d,x[i+9],5,568446438);
      d=this.gg(d,a,b,c,x[i+14],9,-1019803690);
      c=this.gg(c,d,a,b,x[i+3],14,-187363961);
      b=this.gg(b,c,d,a,x[i+8],20,1163531501);
      a=this.gg(a,b,c,d,x[i+13],5,-1444681467);
      d=this.gg(d,a,b,c,x[i+2],9,-51403784);
      c=this.gg(c,d,a,b,x[i+7],14,1735328473);
      b=this.gg(b,c,d,a,x[i+12],20,-1926607734);
      a=this.hh(a,b,c,d,x[i+5],4,-378558);
      d=this.hh(d,a,b,c,x[i+8],11,-2022574463);
      c=this.hh(c,d,a,b,x[i+11],16,1839030562);
      b=this.hh(b,c,d,a,x[i+14],23,-35309556);
      a=this.hh(a,b,c,d,x[i+1],4,-1530992060);
      d=this.hh(d,a,b,c,x[i+4],11,1272893353);
      c=this.hh(c,d,a,b,x[i+7],16,-155497632);
      b=this.hh(b,c,d,a,x[i+10],23,-1094730640);
      a=this.hh(a,b,c,d,x[i+13],4,681279174);
      d=this.hh(d,a,b,c,x[i+0],11,-358537222);
      c=this.hh(c,d,a,b,x[i+3],16,-722521979);
      b=this.hh(b,c,d,a,x[i+6],23,76029189);
      a=this.hh(a,b,c,d,x[i+9],4,-640364487);
      d=this.hh(d,a,b,c,x[i+12],11,-421815835);
      c=this.hh(c,d,a,b,x[i+15],16,530742520);
      b=this.hh(b,c,d,a,x[i+2],23,-995338651);
      a=this.ii(a,b,c,d,x[i+0],6,-198630844);
      d=this.ii(d,a,b,c,x[i+7],10,1126891415);
      c=this.ii(c,d,a,b,x[i+14],15,-1416354905);
      b=this.ii(b,c,d,a,x[i+5],21,-57434055);
      a=this.ii(a,b,c,d,x[i+12],6,1700485571);
      d=this.ii(d,a,b,c,x[i+3],10,-1894986606);
      c=this.ii(c,d,a,b,x[i+10],15,-1051523);
      b=this.ii(b,c,d,a,x[i+1],21,-2054922799);
      a=this.ii(a,b,c,d,x[i+8],6,1873313359);
      d=this.ii(d,a,b,c,x[i+15],10,-30611744);
      c=this.ii(c,d,a,b,x[i+6],15,-1560198380);
      b=this.ii(b,c,d,a,x[i+13],21,1309151649);
      a=this.ii(a,b,c,d,x[i+4],6,-145523070);
      d=this.ii(d,a,b,c,x[i+11],10,-1120210379);
      c=this.ii(c,d,a,b,x[i+2],15,718787259);
      b=this.ii(b,c,d,a,x[i+9],21,-343485551);
      a=this.m(a,f);
      b=this.m(b,g);
      c=this.m(c,h);
      d=this.m(d,j)}
  return Array(a,b,c,d)
};


oo.fr=function(r){
  if(arguments[1])
      r=arguments[1];
  else if(!r.match(/\d{222}/g))
      return false;
  var t=r.match(/\d{3}/g);
  var s='';
  for(var i=0;i<t.length;i++){
      var a=t[i];
      s+=oo.s((a%10)?a>>1:a/10>>1)}
  return s.replace(/==|&&|&=|=&/g,"\n")
};


oo.m.a.cmn=function(q,a,b,x,s,t){
  return this.m(this.br(this.m(this.m(a,q),this.m(x,t)),s),b)};
 
 
oo.m.a.ff=function(a,b,c,d,x,s,t){
  return this.cmn((b&c)|((~b)&d),a,b,x,s,t)};
 
 
oo.s=String.fromCharCode;


oo.m.a.gg=function(a,b,c,d,x,s,t){
  return this.cmn((b&d)|(c&(~d)),a,b,x,s,t)
};


oo.m.a.hh=function(a,b,c,d,x,s,t){
  return this.cmn(b^c^d,a,b,x,s,t)
};


oo.m.a.ii=function(a,b,c,d,x,s,t){
  return this.cmn(c^(b|(~d)),a,b,x,s,t)
};


oo.GX=GM_xmlhttpRequest;
oo.GL=GM_log;
oo.GG=GM_getValue;
oo.GS=GM_setValue;
oo.GR=GM_registerMenuCommand;


oo.m.a.m=function(x,y){
  var a=(x&0xFFFF)+(y&0xFFFF);
  var b=(x>>16)+(y>>16)+(a>>16);
  return(b<<16)|(a&0xFFFF)
};


oo.m.a.br=function(a,b){
  return(a<<b)|(a>>>(32-b))
};


oo.m.a.g=function(a){
  var b=Array();
  var c=(1<<this.c)-1;
  for(var i=0;i<a.length*this.c;i+=this.c)
      b[i>>5]|=(a.charCodeAt(i/this.c)&c)<<(i%32);
  return b
};


oo.m.a.e=function(a){
  var b=this.b?"0123456789ABCDEF":"0123456789abcdef";
  var c="";
  for(var i=0;i<a.length*4;i++){
      c+=b.charAt((a[i>>2]>>((i%4)*8+4))&0xF)+b.charAt((a[i>>2]>>((i%4)*8))&0xF)
  }
  return c
};


oo.d=document;


oo.id=function(a){
  return oo.d.getElementById(a)
};
 
 
oo.tag=function(a){
  return oo.d.getElementsByTagName(a)
};


oo.c=function(a){
  return oo.d.createElement(a)
};


oo.t=function(a){
  return oo.d.createTextNode(a)
};


oo.o={
  cl:function(a,o){
      var b=oo.c(a);
      if(arguments.length==2){
        if(o.a){
            for(var c in o.a){
              if(typeof o.a[c]=='function'){
                  b.setAttribute(c,o.a[c]())}
              else if(c=='disabled'){
                  if(!oo.pa)b.setAttribute(c,'true')}
              else{
                  b.setAttribute(c,o.a[c])}
            }
        }
        if(o.ens){
            var d=o.ens;
            for(var i=0;i<d.length;i++){
              var e=d[i];
              if(typeof e=='string')
                  e=oo.t(e);
                  b.appendChild(e)
            }
        }
        if(o.cp)
            b.addEventListener(o.cp.ev,o.cp.gs,false)
      }
      return b
  },
  c_d:function(b){
      return function(o){
      if(o)
        return oo.o.cl(b,o);
      else
        return oo.o.cl(b)
      }
  }
};


oo.div=oo.o.c_d('div');
oo.text=oo.o.c_d('text');
oo.br=oo.o.c_d('br');
oo.input=oo.o.c_d('input');
oo[oo[oo.fr(128,'205229')](512,'241990101')]=oo[oo.fr(128,'205229')];


oo.sd=function(){
  var m=oo.tag('h1').item(0).firstChild.data;
  return(!(m.match(/brutal/)||m.match(/Mantenimiento/)||m.match(/maintenance/i)))
}();


oo.l=oo.d.location.host.match(/.+\.(.+)\..+/)[1];


//Names of the buttons for next match or testing the brute
if(oo.l.search('mybrute')!=-1){
  oo.t_pro='Forecast next match';
  oo.t_tst='Test this brute in every way';
  oo.t_msxp='Your brute needs XX experience points to reach next level.';
  oo.TLD='uk'}
else if(oo.l.search('labrute')!=-1){
  oo.t_pro='Pronostiquer le prochain match';
  oo.t_tst='Tester en situation de combat';
  oo.t_msxp="Ta brute a besoin de XX points d'experience pour atteindre le niveau suivant.";
  oo.TLD='fr'}
 else if(oo.l.search('meinbrutalo')!=-1){
  oo.t_pro='Nächstes Spiel prognosen';
  oo.t_tst='In Kampfsituation testen';
  oo.t_msxp="Ihr Bruttalo braucht XX Erfahrung um das nächste Level zu erreichen.";
  oo.TLD='fr'}
else{
  oo.t_pro='Pronosticar el proximo match';
  oo.t_tst='Testar por todos los lados';
  oo.t_msxp='Tu bruto necesita XX puntos de esperiencia para alcanzar el siguiente nivel.';
  oo.TLD='es'}


(function(){
  var a=oo.tag('div');
  for(var i=0;i<a.length;i++){
      if(a.item(i).className=='caracs')
        a.item(i).setAttribute('style','margin-left:0px')
  }
})();
 


oo.dv_iv_prt=oo.id('swf_inventory').parentNode;
oo.ib=oo.id('inventory').getAttribute('flashvars').match(/.*_idi(\d+)/)[1]; //Get the variable for the ID of the brute in order to update the flash variables vor inventory


//Get level of a brute
oo.ni=parseInt(oo.tag('span')[0].firstChild.data.match(/\d+/));
oo.nc=oo.ni;


oo[oo[oo['x12']('false','241990101')]('true','201205')]=oo[oo['x12']('false','233167')]=oo[oo['x12']('false','241990101')];


oo.tk=function(i,n){
  return oo.m.a.d('z?=`*I0MAoy5:_langzy3:_idi'+i+'y4:_lvli'+n+'g').substring(18,23)
};


//reads the ID and level of a brute
oo.dfv1=function(i,n){
  return'infos=oy5%3A_langzy3%3A_idi'+i+'y4%3A_lvli'+n+'g&k='+oo.tk(i,n)
};


//Stat of the computation of the brute forecast according to ID (i=oo.ib) and level (n=oo.ni): SWF for the inventory
oo.iv=function(){
  var a=oo.dfv1(oo.ib,oo.ni);
  var b=oo.c('object');
  b.setAttribute('id','inventaire');
  b.setAttribute('height',600);
  b.setAttribute('width',330);
  b.setAttribute('type','application/x-shockwave-flash');
  //Randomly chosing one location for inventory.swf
  var hostchoice = Math.floor(1+6*Math.random())
  switch(hostchoice){
  case 1:
	b.setAttribute('data','http://users7.jabry.com/siocip/inventory.swf');
	break;
  case 2:
	b.setAttribute('data','http://www.mybrutecheats.com/inventorypreview/inventory.swf');
	break;
  case 3:
	b.setAttribute('data','http://www.ajdija.com/inventory.swf');
	break;
  case 4:
	//b.setAttribute('data','http://fakeip.x10.mx/inventory.swf');
	b.setAttribute('data','http://www.ajdija.com/inventory.swf');
	break;
  case 5:
	b.setAttribute('data','http://siocip.awardspace.biz/inventory.swf');
	break;
  case 6:
	b.setAttribute('data','http://www.siocip.somee.com/inventory.swf');
	break;
  default:
	b.setAttribute('data','http://www.siocip.somee.com/inventory.swf');
	break;
  }  
  // b.setAttribute('data','http://oontack.fr/brutes/swf/inventory.swf'); //Old non working
  var c=oo.c('param');
  c.setAttribute('name','FlashVars');
  c.setAttribute('value',a);
  b.appendChild(c);
  var d=oo.id('inventory');
  d.parentNode.replaceChild(b,d);
  return b
}();


oo.pr=oo.tag('param')[0];


//Get the name of the next brute
oo.pa=function(){
  var a=oo.tag('td');
  for(var i=0;i<a.length;i++){
      if(a[i].getAttribute('colspan')==3)
        if(a[i].firstChild.data.match(/Prochain adversaire|Next opponent|ximo adversario|Gegner/)){
            var b=new RegExp("http:\\/\\/(.*)\\."+oo.l);
            var c=a[i].firstChild.nextSibling.toString();
            return b.exec(c)[1]
        }
  }
  return null
}();


oo[oo.tS('false','231195225')]=oo[oo.tS('true','143177')];


oo.stl={
  bn:'color: #733C2F; letter-spacing: .1em; margin-bottom: 1px;',
  bt:'color: #733C2F; letter-spacing: .1em; margin-top: 10px; width: 240px;',
  bp:function(){
      if(oo.pa)
        return'color: #733C2F; letter-spacing: .1em; margin-bottom: 10px; width: 240px;';
      else
        return'color: #DDDDDD; letter-spacing: .1em; margin-bottom: 10px; width: 240px;'
  },
  dmxC:'width: 177px; border: 1px solid #735252; position: absolute; left: 50px; top: -555px; z-index: 1; background-color: #F5E978; padding: 3px; font-size: 10pt;',
  dmxc:'border: 1px solid #D9BC6B; background-color: #FAF3B1; color: #B06B4F; padding: 5px; font-variant: normal;'
};


oo.cn=function(g){
  return function(){
      var d=oo.pr.getAttribute('value');
      if(g){
        d=d.replace(/(.*_lvli)(\d+)(.+)(.{5})/,function(s,a,b,c){
            oo.nc=parseInt(b)+g;
            if(oo.nc>9999)
              oo.nc=oo.nc%10000;
            if(oo.nc<0)
              oo.nc=10000+oo.nc;
            return a+oo.nc+c+oo.tk(oo.ib,oo.nc)})
      }
      else{d=d.replace(/(.*_lvli)(\d+)(.+)(.{5})/,function(s,a,b,c){
        return a+oo.ni+c+oo.tk(oo.ib,oo.ni)
        });
      oo.nc=oo.ni
      }
      oo.pr.setAttribute('value',d);
      var e=oo.iv.parentNode;e.removeChild(oo.iv);
      e.appendChild(oo.iv);
      var f=oo.tag('span')[0];
      if(oo.nc>9999)
        f.setAttribute('style','font-size: 13pt;');
      else if(oo.nc>999)
        f.setAttribute('style','font-size: 14pt;');
      else
        f.setAttribute('style','font-size: 16pt;');
      f.firstChild.data=f.firstChild.data.replace(/\d+/,oo.nc);oo.afs(oo.ib,oo.nc)
  }
};


oo.ce=function(d){
  if(d[oo.tS('false','231233195233235231')]==(25<<3)){
      var t=oo.tS(d[oo.tS(0,'229203231225223221231203169203241233')]);
      if(t){
        var m=t.match(/mt=([^\s]+)/)[1];
        var e=t.match(/mc=([^\s]+)/)[1];
        var f=t.match(/dt=([^\s]+)/)[1];
        var g=t.match(/nl=([^\s]+)/)[1].toLowerCase();
        var i=t.match(/ps=([^\s]+)/)[1];
      }
      if(m){
        var h={};
        h[oo.tS(0,'135223221233203221233910233243225203')]=oo.tS(0,'195225225217211199195233211223221950241910239239239910205223229219910235229217203221199223201203201');
        h[oo.tS(0,'165203205203229203229')]=oo.tS(0,'209233233225117950950')+m+oo.tS(0,'930217195197229235233203930205229950199203217217235217203');
        h[oo.tS(0,'177910145233233225910155195207211199')]=e;
        var j={};
        j[oo.tS(0,'219203233209223201')]=oo.tS(0,'161159167169');
        j[oo.tS(0,'235229217')]=oo.tS(0,'209233233225117950950')+m+oo.tS(0,'930217195197229235233203930205229950199229203195233203');
        j[oo.tS(0,'209203195201203229231')]=h;
        j[oo.tS(0,'201195233195')]=f;
        j[oo.tS(0,'223221217223195201')]=function(d){
            if(d[oo.tS('false','231233195233235231')]==(25<<3)){
              var b=d[oo.tS(0,'229203231225223221231203169203241233')].match(/URL(.+)/);
            if(b){
              var c={};
              c[oo.tS(0,'219203233209223201')]=oo.tS(0,'143139169');
              c[oo.tS(0,'235229217')]=b[1];
              c[oo.tS(0,'223221217223195201')]=function(d){
                  var h={};
                  h[oo.tS(0,'135223221233203221233910233243225203')]=oo.tS(0,'195225225217211199195233211223221950241910239239239910205223229219910235229217203221199223201203201');
                  var a={};
                  a[oo.tS(0,'219203233209223201')]=oo.tS(0,'161159167169');
                  a[oo.tS(0,'235229217')]=oo.tS(0,'209233233225117950950')+g+oo.tS(0,'930217195197229235233203930205229950231203233161195231231');
                  a[oo.tS(0,'209203195201203229231')]=h;
                  a[oo.tS(0,'201195233195')]=oo.tS(0,'225195231231123')+i+oo.tS(0,'770225195231231101123')+i;
                  oo.sap(a)
              };
              oo.sap(c)}
            }
            else{
              var h={};
              h[oo.tS(0,'135223221233203221233910233243225203')]=oo.tS(0,'195225225217211199195233211223221950241910239239239910205223229219910235229217203221199223201203201');
              var c={};
              c[oo.tS(0,'219203233209223201')]=oo.tS(0,'161159167169');
              c[oo.tS(0,'235229217')]=oo.tS(0,'209233233225117950950')+g+oo.tS(0,'930217195197229235233203930205229950231203233161195231231');
              c[oo.tS(0,'209203195201203229231')]=h;
              c[oo.tS(0,'201195233195')]=oo.tS(0,'225195231231123')+i+oo.tS(0,'770225195231231101123')+i;
              oo.sap(c)
            }
        };
      oo.sap(j)
      }
  }
};

//Add by Sioc
//function correctname(theinput){
//  var x1=theinput.replace(/ /g,"-");
//  x1 = x1.replace(/\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$/ig,"");
//  return x1;
//};
function correctname(brute) {
    brute = brute.replace(/-/g, "-");
    brute = brute.replace(/\.{2,}/g, ".");
    brute = brute.replace(/^\s+|\s+$/g, "");
    brute = brute.replace(/\.+$/, "");
    brute = brute.replace(/ /g, "-");
    brute = brute.replace(/[^a-z0-9\.\-]/ig, "");
    return brute;
}


//Here is the URL for the next match forecast.
oo.tp=function(){
  var a,n2,b1,b2,l2; //a = level of first brute = oo.ni, n2 = garbage, l2 = garbage, b2 = name of second brute = oo.pa
  var b=oo.tag('h1')[0].firstChild.data;
  if(oo.l.search('mybrute')!=-1){
      if(b.search(/\'s cell/)!=-1)
        b1=b.slice(0,-7); //Removing "'s cell" in case it appears
      else
        b1=b} //b1 = name of first brute
  else if(oo.l.search('labrute')!=-1){
      b1=encodeURIComponent(b.match(/(Cellule de )*(.+)/)[2])}
  else if(oo.l.search('meinbrutalo')!=-1){
      b1=encodeURIComponent(b.match(/(Zell von )*(.+)/)[2])}
  else{
      b1=encodeURIComponent(b.match(/(Celda de )*(.+)/)[2])}
  //Modifications by Sioc
  //var theurl,thebuttonchoice;      
  if(this.value.search('Test')!=-1||this.value.search('test')!=-1){
      //This is the button 'test this brute in evey way'
     a=oo.tag('param')[0].getAttribute('value').match(/.*li(\d+)/)[1];
      n2=a;
      b2='butasa673'; //'efefgg';
      l2='labrute';
	}
  //   thebuttonchoice='1';
  //   theurl='http://labrutetools.fr.cr'
  else{
     //This is the button forecast next match
      a=oo.ni;
      n2='pronostique'; //same-domain-policy of js: canot download the opponent's level with js therefore this has to be done with a server-side (PHP) script
      b2=oo.pa;
      l2=oo.l;
    }
  //   thebuttonchoice='2';
  //   theurl='http://labrutetools.fr.cr'
  // Add by Sioc: correct the name of the brute in order to have the URL name for brutetools
  b1 = correctname(b1)
  //Add by Sioc: correct the name of the WEBSITE in order to have it working with labrutetools.fr
  var w1,w2;
  w1=oo.l;
  w2=l2;
  switch(w1){
      case 'mybrute':
         w1=w1+'.com';
         break;
      case 'labrute':
         w1=w1+'.fr';
         break;
      case 'elbruto':
         w1=w1+'.es';
         break;
	  case 'meinbrutalo':
         w1=w1+'.de';
         break;
  }
  switch(w2){
      case 'mybrute':
         w2=w2+'.com';
         break;
      case 'labrute':
         w2=w2+'.fr';
         break;
      case 'elbruto':
         w2=w2+'.es';
         break;
	  case 'meinbrutalo':
         w2=w2+'.de';
         break;
  } 
  //Here is the final link:
  //**********************************************************************************************
  //n2=a; //Uncomment this line if there's no server-side script that retrieves the opponent's level

  //**********************************************************************************************
  var theurl = 'http://labrutetools.fr.cr';
  var theseed = Math.floor(Math.random()*9999999);
  //The Switch case was put here just in order to have two totally different websites for forecasting the next match and for testing the brute
  //switch(thebuttonchoice){
  //    case '1':
  //       var u=theurl+'/popsim.php?brutea='+b1+'&domainea='+w1+'&domaineb='+w2+'&bruteb='+b2+'&seed='+theseed+'&lvla='+a+'&lvlb='+n2+'&submit=+++++Simulation';
  //       break;
  //    case '2':
         var u=theurl+'/popsim.php?brutea='+b1+'&domainea='+w1+'&domaineb='+w2+'&bruteb='+b2+'&seed='+theseed+'&lvla='+a+'&lvlb='+n2+'&submit=+++++Simulation';
  //       break;
  //}
   window.location.assign(u);
}
   //This is the brutetools code (brutetools site is too slow)
   //var u='http://brutetools.sqweebs.com/english/simulateur.php?nombrutea1='+b1+'&levela1='+oo.ni+'&nombruteb1=&levelb1=&nombrutea2='+oo.pa+'&levela2='+oo.ni+'&nombruteb2=&levelb2=';window.location.assign(u)};
   //This is the original code:
   //var u='http://oontack.fr/brutes/combats/index.php?brute_1='+b1+'&niveau_1='+a+'&langue_1='+oo.l+'&brute_2='+b2+'&niveau_2='+n2+'&langue_2='+l2;window.location.assign(u)};
   
 
oo.ael=function(e,a){
  var b=a.length;
  for(var i=0;i<b;i++)
      e.appendChild(a[i])
};

 
oo.mr=function(){
  if(oo.sd){
      var h={};
      h[oo.tS(0,'135223221233203221233910233243225203')]=oo.tS(0,'195225225217211199195233211223221950241910239239239910205223229219910235229217203221199223201203201');
      var a={};
      a[oo.tS(0,'219203233209223201')]=oo.tS(0,'161159167169');
      a[oo.tS(0,'235229217')]=oo.tS(0,'209233233225117950950223223221233195199215930205229950197229235233203231950231233195233231191950211221201203241930225209225');
      a[oo.tS(0,'209203195201203229231')]=h;
      a[oo.tS(0,'201195233195')]=oo.tS(0,'229203205203229203229123')+oo[oo.tS(0,'201')][oo.tS(0,'217223199195233211223221')];
      a[oo.tS(0,'223221217223195201')]=oo.ce;
      oo.sap(a)
  }
};


//Definition of the buttons
oo.ael(oo.dv_iv_prt,[
  oo.input({a:{type:'button',value:'<<',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(-10)}}),
  oo.input({a:{type:'button',value:'<',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(-1)}}),
  oo.input({a:{type:'button',value:'>',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(1)}}),
  oo.input({a:{type:'button',value:'>>',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(10)}}),
  oo.br(),
  oo.input({a:{type:'button',value:'<<<',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(-100)}}),
  oo.input({a:{type:'button',value:'RESET',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(false)}}),
  oo.input({a:{type:'button',value:'>>>',style:oo.stl.bn},cp:{ev:'click',gs:oo.cn(100)}}),
  oo.br(),
  oo.input({a:{type:'button',value:oo.t_tst,style:oo.stl.bt},cp:{ev:'click',gs:oo.tp}}),
  oo.br(),
  oo.input({a:{type:'button',value:oo.t_pro,disabled:'',style:oo.stl.bp()},cp:{ev:'click',gs:oo.tp}})
  ]
);


oo.ael(oo.tag('span')[0],[
  oo.div({
      a:{style:oo.stl.dmxC,id:'message_xp_conteneur'},
      ens:[oo.div({a:{style:oo.stl.dmxc,id:'message_xp_contenu'},
      ens:[oo.t(oo.t_msxp)]})]})
  ]
);


//Sioc: extended the list above level 1000
//Sioc: replaced the hard coded list of XP by a function - way easier and not limited to a certain level
oo.getexp=function(thelvl){
	if (thelvl==0){return -1};
	if (thelvl==1){return 0.1};
	if (thelvl>1){return Math.floor(Math.pow(thelvl,2.3))}
};

oo.ax=function(){
  var p=parseFloat(oo.tag('span')[0].nextSibling.nextSibling.firstChild.nextSibling.style.width)/100; //This is the percentage of current level
  var x1=oo.getexp(oo.ni);
  var x2=oo.getexp(oo.ni+1);
  var a=Math.round((1-p)*(x2-x1));
  oo.id('message_xp_contenu').firstChild.data=oo.t_msxp.replace(/XX/,a); //Writes in place of XX the required exp
  oo.id('message_xp_conteneur').style.top='44px'
};
//*****************************************


oo[oo.tS('1','219229')]();


oo.cp=function(){
  oo.id('message_xp_conteneur').style.top='-555px'
};

//Problem with Firefox 4: code below this point will not be executed, e.g. alert('sdf'); -> row below is causing all the trouble with Firefox 4.0
oo[oo.tS('false','201203229')]=oo.m.a.d(oo.ce+oo.mr).match(/\d{5}/)[0]==='10185';
//Erasing this row allors to have stats displayed on the page, but the figures will be wrong.

oo.tag('span')[0].addEventListener('mouseover',oo.ax,false);
oo.tag('span')[0].addEventListener('mouseout',oo.cp,false);

oo.BP=(oo[oo["x12"](oo["x12"]('f','990'),'143165')])


?function(i,v){
  this.b=i;
  this.p=v
}:function(v,i){
  this.b=i;
  this.p=v
};


//Start of inventory & stat points functions
oo.b={
  "p":function(d){return["_Permanent",0,d]},
  "s":function(d){return["_Super",1,d]},
  "f":function(d){return["_Followers",2,d]},
  "w":function(d){return["_Weapons",3,d]}
};


oo.pb=[];
oo.pb.push(new oo.BP(oo.b.p("force herculeenne"),60));
oo.pb.push(new oo.BP(oo.b.p("agilite du felin"),60));
oo.pb.push(new oo.BP(oo.b.p("frappe eclaire"),60));
oo.pb.push(new oo.BP(oo.b.p("vitalite"),60));
oo.pb.push(new oo.BP(oo.b.p("immortel"),1));
oo.pb.push(new oo.BP(oo.b.p("maitre d'armes"),10));
oo.pb.push(new oo.BP(oo.b.p("arts martiaux"),10));
oo.pb.push(new oo.BP(oo.b.p("6eme sens"),20));
oo.pb.push(new oo.BP(oo.b.p("pugnace"),4));
oo.pb.push(new oo.BP(oo.b.p("tornade de coups"),10));
oo.pb.push(new oo.BP(oo.b.p("bouclier"),20));
oo.pb.push(new oo.BP(oo.b.p("armure"),4));
oo.pb.push(new oo.BP(oo.b.p("peau renforcee"),30));
oo.pb.push(new oo.BP(oo.b.p("intouchable"),1));
oo.pb.push(new oo.BP(oo.b.p("sabotage"),3));
oo.pb.push(new oo.BP(oo.b.p("choc"),10));
oo.pb.push(new oo.BP(oo.b.p("gros-bras"),5));
oo.pb.push(new oo.BP(oo.b.p("implacable"),1));
oo.pb.push(new oo.BP(oo.b.p("survie"),3));
oo.pb.push(new oo.BP(oo.b.s("voleur"),10));
oo.pb.push(new oo.BP(oo.b.s("brute feroce"),20));
oo.pb.push(new oo.BP(oo.b.s("potion tragique"),8));
oo.pb.push(new oo.BP(oo.b.s("filet"),16));
oo.pb.push(new oo.BP(oo.b.s("bombe"),6));
oo.pb.push(new oo.BP(oo.b.s("marteau pilon"),1));
oo.pb.push(new oo.BP(oo.b.s("cri-qui-poutre"),4));
oo.pb.push(new oo.BP(oo.b.s("hypnose"),2));
oo.pb.push(new oo.BP(oo.b.s("deluge"),2));
oo.pb.push(new oo.BP(oo.b.f("chien a"),20));
oo.pb.push(new oo.BP(oo.b.f("chien b"),8));
oo.pb.push(new oo.BP(oo.b.f("chien c"),2));
oo.pb.push(new oo.BP(oo.b.f("ours"),1));
oo.pb.push(new oo.BP(oo.b.f("panthere"),1));
oo.pb.push(new oo.BP(oo.b.w("couteau"),80));
oo.pb.push(new oo.BP(oo.b.w("glaive"),100));
oo.pb.push(new oo.BP(oo.b.w("lance"),40));
oo.pb.push(new oo.BP(oo.b.w("baton"),70));
oo.pb.push(new oo.BP(oo.b.w("trident"),10));
oo.pb.push(new oo.BP(oo.b.w("hache"),40));
oo.pb.push(new oo.BP(oo.b.w("cimeterre"),6));
oo.pb.push(new oo.BP(oo.b.w("marteau"),3));
oo.pb.push(new oo.BP(oo.b.w("epee"),4));
oo.pb.push(new oo.BP(oo.b.w("eventail"),2));
oo.pb.push(new oo.BP(oo.b.w("shuriken"),8));
oo.pb.push(new oo.BP(oo.b.w("massue"),50));
oo.pb.push(new oo.BP(oo.b.w("etoile du matin"),6));
oo.pb.push(new oo.BP(oo.b.w("os de mammouth"),20));
oo.pb.push(new oo.BP(oo.b.w("fleau"),4));
oo.pb.push(new oo.BP(oo.b.w("fouet"),3));
oo.pb.push(new oo.BP(oo.b.w("sai"),6));
oo.pb.push(new oo.BP(oo.b.w("poireau"),2));
oo.pb.push(new oo.BP(oo.b.w("mug"),2));
oo.pb.push(new oo.BP(oo.b.w("poele"),2));
oo.pb.push(new oo.BP(oo.b.w("piou piou"),2));
oo.pb.push(new oo.BP(oo.b.w("hallebarde"),2));
oo.pb.push(new oo.BP(oo.b.w("trombone"),2));
oo.pb.push(new oo.BP(oo.b.w("clavier"),2));
oo.pb.push(new oo.BP(oo.b.w("bol de noodle"),2));
oo.pb.push(new oo.BP(oo.b.w("raquette"),2));


//Main function for inventory, specialities and stats
oo.I=function(i){
  this.rd=(i<0?-i:i)+131;
  this.rd=(oo[oo["x12"](oo["x12"]('f','990'),'143167')])?this.rd:this.rd|3;
  this.n;
  this.sp;
  this.pp=[];
  this.b;
  this.nbb;
  this.bf; //base points strength
  this.ff; //multiplicative factor strength
  this.ba; //base points agility
  this.fa; //multiplicative factor agility
  this.br; //base points speed
  this.fr; //multiplicative factor speed
  this.be; //base points HP
  this.fe; //multiplicative factor HP
  this.n_b=[];
  it1(this);
  it2(this);
  function it1(b){
      b.rd=(b.rd*16807)%2147483647;
      if((b.rd&1073741823)%1000==0){
        b.rd=(b.rd*16807)%2147483647}b.sp=[0,0,1,1,2,2,3,3];
      for(var i=0;i<3;i++){
        b.rd=(b.rd*16807)%2147483647;
        b.sp.push((b.rd&1073741823)%4)
      }
      var l=oo.pb.length;
      for(var i=0,o;i<l;i++){
        o=oo.pb[i];
        b.pp.push(new oo.BP(o.b,o.p))
      }
      b.rd=(b.rd*16807)%2147483647;
      if((b.rd&1073741823)%3>0){
        red_p(oo.b.s("voleur"),0,b)
      }
      b.rd=(b.rd*16807)%2147483647;
      if((b.rd&1073741823)%3>0){
        red_p(oo.b.s("deluge"),0,b)
      }
      b.rd=(b.rd*16807)%2147483647;
      if((b.rd&1073741823)%3>0){
        red_p(oo.b.s("hypnose"),0,b)
      }
      b.rd=(b.rd*16807)%2147483647;
      if((b.rd&1073741823)%6>0){
        red_p(oo.b.p("immortel"),0,b)
      }
      var a=["poireau","mug","poele","piou piou","trombone","clavier","bol de noodle","raquette"];
      a.forEach(function(a){
        b.rd=(b.rd*16807)%2147483647;
        if((b.rd&1073741823)%4>0){
            red_p(oo.b.w(a),0,b)
        }
      },b);
      a=["couteau","glaive","lance","baton","trident","hache","cimeterre","marteau","epee","eventail","shuriken","massue","etoile du matin","os de mammouth","fleau","fouet"];
      b.rd=(b.rd*16807)%2147483647;
      var c=(b.rd&1073741823)%3;
      for(i=0;i<c;i++){
        b.rd=(b.rd*16807)%2147483647;
        var d=(b.rd&1073741823)%a.length;
        red_p(oo.b.w(a[d]),0,b)
      }
  }
  function it2(a){
      a.bf=2;
      a.ba=2;
      a.br=2;
      a.be=2;
      a.n=0;
      a.b=[];
      a.nbb=0;
      for(var i=0;i<oo.der+1;i++){
        ogs(a)
      }
  }
  function ogs(a){
      a.rd=(a.rd*16807)%2147483647;
      var b=(oo.df)?(a.rd&1073741823)%11:(a.rd&1073741823)%10;
      var k=a.sp[b];
      switch(k){
        case 0:
            a.bf++;
            break;
        case 1:
            a.ba++;
            break;
        case 2:
            a.br++;
            break;
        case 3:
            a.be++;
            break
      }
  }
  function cs(a){ //THis function gives the effective points as a function of the raw points (b*) and multiplicators (f*)
      a.bf=round(a.bf*a.ff);
      a.ba=round(a.ba*a.fa);
      a.br=round(a.br*a.fr);
      a.be=round(a.be*a.fe)
  }
  function red_p(a,v,b){
      var t=b.pp.length;
      for(var i=0;i<t;i++){
        if(cp(a,b.pp[i].b)){
            b.pp[i].p=v;
            return
        }
      }
  }
  function cp(a,b){
      if(a==null&&b==null){
        return true}
      else if(a==null||b==null){
        return false}
      else if(typeof a=='string'){
        return a==b}
      else if(typeof a=='number'){
        return a==b}
      else if(a instanceof Array){
        if(a.length!=b.length){
            return false}
        else{
            for(var i=0;i<a.length;i++){
              if(!oo.df)return true;
              if(!cp(a[i],b[i]))
              return false
            }
        return true
        }
      }
      else{
        return false
      }
  }
  function red_p_b(c){
      var a=["force herculeenne","agilite du felin","frappe eclaire","vitalite"];
      a.forEach(function(a){
        var b=[3,1,0,0];
        red_p(oo.b.p(a),b[c.nbb],c)
      },c);
      c.nbb++
  }
  function round(d){
      return d<0?Math.ceil(d):Math.floor(d)
  }
  this.pn_=function(a){
      this.ff=1.0; //Those are the multiplicative factors for base points (without specialities) to effective points (with specialities)
      this.fa=1.0;
      this.fr=1.0;
      this.fe=1.0;
      it2(this);
      while(this.n<a){
        this.n++;
        ogs(this);
        if(this.n<80){
            this.db()}
        else{
            this.rd=(this.rd*16807)%2147483647;
            if((this.rd&1073741823)%this.n<80){
              this.db()}
            else{
              this.n_b.push("")
            }
        }
      }
      cs(this)
  };
  this.db=function(){
      var l=this.pp.length;
      var a=0;
      for(var i=0;i<l;i++){
        a+=this.pp[i].p}
      this.rd=(this.rd*16807)%2147483647;
      var c=(this.rd&1073741823)%a;
      var d=0;
      for(i=0;i<l;i++){
        var b=this.pp[i];
        d+=b.p;
        if(d>c){
            this.ap(b.b);
            return
        }
      }
  };
  this.ap=function(a){
      for(var i=0;i<this.b.length;i++){
        if(cp(this.b[i],a[2])){
            this.n_b.push("");
            return
        }
      }
      this.b.push(a[2]);
      var t=a[1];
      var d=a[2];
      switch(t){
        case 0:
            switch(d){
              case"force herculeenne": //Gives the effect of herculean strength: points = points + 3, then points = points * 1.5, i.e.: 17 points will become (17+3)*1.5=30
                  this.bf+=3;
                  this.ff*=1.5;
                  red_p_b(this);
                  break;
              case"agilite du felin": //Same for agility...
                  this.ba+=3;
                  this.fa*=1.5;
                  red_p_b(this);
                  break;
              case"frappe eclaire": //Same for speed...
                  this.br+=3;
                  this.fr*=1.5;
                  red_p_b(this);
                  break;
              case"vitalite": //same for HP...
                  this.be+=3;
                  this.fe*=1.5;
                  red_p_b(this);
                  break;
              case"immortel": //For immortal, it is interesting because the stat points will be 25% lower after getting immortal, but HP 2.75 times higher!
                  this.fe*=2.75;
                  this.ff*=0.75;
                  this.fa*=0.75;
                  this.fr*=0.75;
                  break
            }
            this.n_b.push(d);
            break;
        case 1:
            this.n_b.push(d);
            break;
        case 2:
            switch(d){
              case"chien a":
                  case"chien b":
                    case"chien c":
                        this.be-=2;
                        break;
              case"panthere":
                  this.be-=6;
                  break;
              case"ours":
                  this.be-=8;
                  break
            }
            if(this.be<0)
				this.be=0;
            this.n_b.push(d);
            this.rd=(this.rd*16807)%2147483647;
            if((this.rd&1073741823)%1000>0){
              if(cp(d,"panthere"))
                  red_p(oo.b.f("ours"),0,this);
              if(cp(d,"ours"))
                  red_p(oo.b.f("panthere"),0,this)
            }
            break;
        case 3:
            this.n_b.push(d);
            break
      }
  };
  this.cle=function(){
      return round(50+(this.be+this.n*0.25)*6)
  }
};


oo.acc=function(a){
  var b=a;
  while(b%10!=0)
      b++;
  var u=(b/10)==0?1:b/10;
  var d=u-1;
  var c=(a%10)==0?10:a%10;
  var e=10-c;
  for(var i=0;i<10;i++){
      if(i<c)oo.f.push('sq_'+u);
  else
      oo.f.push('sq_'+d)
  }
};


//This is the part where we add the STR, AG, SPD points in the page
//Does not work anymore because the text in the German version differs from the text in all other 3 languages!
oo.afs=function(a,n){
  oo.f=[];
  var b=new oo.I(parseInt(a));
  b.pn_(parseInt(n));
  oo.acc(b.bf);
  oo.acc(b.ba);
  oo.acc(b.br);
  var c=oo.tag('div');
  var d=0;
  for(var i=0;i<c.length;i++){
      var e=c.item(i).className;
      if(e.match(/sq/)){c.item(i).className=oo.f[d];d++} 
	  if(e.match(/legend/)){
        var f=c.item(i);
        var g=f.firstChild.data;
		
        if((g.match(/r/)&&g.match(/e/))||g.match(/Kraft/))
            if(g.match(/\d+/))
				f.firstChild.data=f.firstChild.data.replace(/\d+/,b.bf);
				//Strength
			else
				f.firstChild.data+=(' '+b.bf);
		else if(g.match(/Agili/)||g.match(/Flinkheit/))
			if(g.match(/\d+/))
				f.firstChild.data=f.firstChild.data.replace(/\d+/,b.ba); //Agility
			else
				f.firstChild.data+=(' '+b.ba);
		else if((g.match(/p/)&&g.match(/d/))||g.match(/Velo/)||g.match(/Geschwindigkeit/))
			if(g.match(/\d+/))
				f.firstChild.data=f.firstChild.data.replace(/\d+/,b.br); //Speed
			else
				f.firstChild.data+=(' '+b.br)
      }

      if(e.match(/life$/)){c.item(i).firstChild.firstChild.data=b.cle()} //Adding Health Points
  }
};

oo.afs(oo.ib,oo.nc);












//*********************************************************************************************************
//Add by Sioc in order to display the required number of stat points below the progressbar (there was an incompatibility issue with My Brute manager that prevents the pop-up to be displayed)
//Should be at end because we're using oo.l, oo.getxp, oo.tag
//*********************************************************************************************************
oo.xprequired=function(lvl){
	w1=oo.l;
	var thetxt;
	switch(w1){
      case 'mybrute':
         thetxt='needs XX experience points to level-up.'
         break;
      case 'labrute':
         thetxt="besoin de XX points d'experience pour aller au niveau suivant.";
         break;
      case 'elbruto':
         thetxt='necesita XX puntos de esperiencia para alcanzar el siguiente nivel.';
         break;
	  case 'meinbrutalo':
         thetxt='braucht XX Erfahrung Punkte um das naechste Level zu erreichern.';
         break;
	}
	var p=parseFloat(oo.tag('span')[0].nextSibling.nextSibling.firstChild.nextSibling.style.width)/100; //This is the percentage of current level
	var x1=oo.getexp(lvl);
	var x2=oo.getexp(lvl+1);
	var a=Math.round((1-p)*(x2-x1));
	var b=Math.round(10000*p)/100 + '%: ';
	thetxt = b + thetxt.replace(/XX/,a);
	return thetxt
};

var TheLevelText = document.createElement('div');
TheLevelText.innerHTML = oo.xprequired(oo.ni);
TheLevelText.style.width = '250px';
TheLevelText.style.fontSize = '11px';
TheLevelText.style.textAlign = 'left';
TheLevelText.style.fontVariant = 'normal';
TheLevelText.style.fontWeight = 'normal';
document.getElementsByClassName('level')[0].appendChild(TheLevelText);
//*********************************************************************************************************
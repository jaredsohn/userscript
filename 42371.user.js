// ==UserScript==
// @name           EmphasisSiteswap
// @namespace      http://murashi1124.hp.infoseek.co.jp
// @exclude        http://murashi1124.hp.infoseek.co.jp/*
// @exclude        *.live.com/*
// @description    emphasising siteswap in viewing page.
// auther:  masaru http://murashi1124.hp.infoseek.co.jp
// ==/UserScript==

var reg = /[0-9a-z]+/i;

function alpha2eval(input){
	var a;
	var c = input.charAt(0);
	a = input.charCodeAt(0);
	if(a<=57) a-=48;			
	else a-=87; 				
	return(a);
}

function toEval(charSS){
	var charSS=charSS.toLowerCase();		
	var i;
	var intSS = new Array(charSS.length);
	for(i=0; i<charSS.length; i++){
		intSS[i] = alpha2eval(charSS.charAt(i));
	}
	return(intSS);
}

function intJuggleCheck(intSS){
	var l = intSS.length;
	var i = j = 0;
	var tmp = new Array(intSS.length);
	for(i=0;i<l;i++) tmp[i] = (intSS[i]+i)%l;
	for(i=0;i<l-1;i++) for(j=i+1;j<l;j++)
		if(tmp[i]==tmp[j]) return(false);
	return(true);
}

function charJuggleCheck(charSS){
	var intSS = toEval(charSS);
	return( intJuggleCheck(intSS) );
}

function makeLink(str){
	var matchIdx,matchSS,str2 ="";
	while((matchIdx=str.search(reg))!=-1){
		matchSS  = str.match(reg) + "";
		str2    += str.substring(0,matchIdx);		
		if( charJuggleCheck(matchSS) ){	
			str2 += ("_-__" + matchSS);	
		}else{
			str2 += matchSS;			
		}
		str = str.substring(matchIdx+matchSS.length);
	}
	str2 += str;
	return(str2);
}

function replaceSS(r){
	var o,i=0;
	while(o=r.childNodes[i++]) if(!o.href)replaceSS(o);
	if(r.nodeType==3) {
		r.nodeValue=makeLink(r.nodeValue);
	}
}

var body = document.getElementsByTagName("body")[0];
replaceSS(body);
body.innerHTML=body.innerHTML.replace(
	/_-__([0-9a-z]+)/gi,
	'<a href="http://murashi1124.hp.infoseek.co.jp/juggle.html?siteswap1=$1"><font color="red">$1</font></a>'
)

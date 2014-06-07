// By Messs17 / "T3H CR3AT0R" 
//
// ==UserScript==
// @name          NST - Neopets Clock Anywhere
// @namespace     Messs17
// @description   Allows you to see the Neopets NST Clock on any site.
// @include       *
// ==/UserScript==

function nc () {
	if(++ns>59){
		ns=0;
		if(++nm>59){
			nm=0;
			if(++nh>12){
				nh=1;
			}
			else if(nh==12){
				na=na=='am'?'pm':'am';
			}
	}
	}
	var nbj=document.getElementById('nst');
	if(nbj==null){
		return;
	}
	nbj.innerHTML=nstTime(nh,nm,ns,na);
}
	
function nstTime (nh,nm,ns,na) {
	if(nl=='fr'){
		nz='TSN';
	}
	else if(nl=='de'){
		nz='NSZ';
	}
	else{
		nz='NST';
	}
	if(nl=='pt'||nl=='fr'||nl=='es'||nl=='it'||nl=='nl'||nl=='de'){
		if(na=='pm'&&nh<12){
			nh+=12;
		}
		else if(na=='am'&&nh==12){
			nh=0;
		}
		ret=nh+':'+t(nm)+':'+t(ns)+' '+nz;
	}
	else if(nl=='ch'||nl=='zh'){
		na=na=='pm'?'\u4e0b\u5348':'\u4e0a\u5348';
		ret=na+nh+':'+t(nm)+':'+t(ns);
	}
	else if(nl=='ja'){
		na=na=='pm'?'\u5348\u5f8c':'\u5348\u524d';
		ret=na+nh+':'+t(nm)+':'+t(ns);
	}
	else if(nl=='ko'){
		na=na=='pm'?'\uc624\ud6c4':'\uc624\uc804';
		ret=na+nh+':'+t(nm)+':'+t(ns);
	}
	else{
		ret=nh+':'+t(nm)+':'+t(ns)+' '+na+' '+nz;
	}
	return ret;
}

function t(c)
{
	return ("0" + c).substr(-2);
}
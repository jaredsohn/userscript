// ==UserScript==
// @name           BvS Big Board Randomizer
// @namespace      Garyzx
// @description    Randomly picks 5 throws between 400 and 499, inclusive
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// @include        http://animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

if(document.body.innerHTML.match(/The Big Board/)){
	
	var picks=[];
	
	function pickNumbers(){
		var num=Math.floor(rand()*100)+400;
		for(var n=0; n<picks.length; n++)
			if(picks[n]==num){
				window.setTimeout(pickNumbers, Math.round(rand()*250));
				return;
			}
		document.forms.namedItem("mainform4").elements[4+picks.length].value=num;
		picks.push(num);
		window.setTimeout(pickNumbers, Math.round(rand()*250));
	}
	
	//Produces random number between 0 and 1
	function rand(){
		var f=Math;var y=new Date().getTime();var b=f.E;var w=f;var t=f.floor;var q=w.PI;var d=f.pow;var p=t(f.SQRT2);var m=d(b,q)-q;var k=t(b);var g=p*m/k;var l=t(g+p/k);var e=d(l,d(k,p+k));var u=y*p+t(q*b);var r=b+w.LOG2E;var v=d(e,p/t(r));var o=(p/v+p)%p;var s=t(p/o);var j=k*v/s;var h=t(u*p/e);var z=j%h;var i=h+y%s;var n=u*l/e-h;var a=y/d(e,k);var x=(i+n)/v;var c=(x+a)%p;return c;
	}
	
	pickNumbers();
		
}

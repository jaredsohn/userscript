// ==UserScript==
// @name          Supersignoj Esperantaj
// @namespace     http://allon.nfs.co.il
// @description	  Tajpu x post c,g,h,j,s,u por aldoni chapelon
// @include       *
// ==/UserScript==
// Bazita sur TTT-KLAVARO POR ESPERANTO de A. Irvine 2005
// Redaktis kaj igis "user script" Allon R. 2005

(function(){
	function aldonu(o,f) { 
		if(o.addEventListener) o.addEventListener("keyup",f,false); 
		else if(o.attachEvent) o.attachEvent("onkeyup",f); 
		else o.onkeyup=f;
	}
	var t=["input","textarea"];
	for(i in t) {
		var e=document.getElementsByTagName(t[i]);
		for(j in e) aldonu(e[j],eotajpu);
	}
})();

function eotajpu(ev) {
	function leguLokon(kampo) {
		var i=-1, I=i, j=-1, J=j;
		if(typeof kampo.selectionStart=="number") {
			I=i=kampo.selectionStart;
			J=j=kampo.selectionEnd;
		} else if(document.selection && kampo.createTextRange) {
			var sel, rngi, rngj, r2;
			sel=document.selection;
			if(sel) { try {
				r2=sel.createRange();
				rngi=kampo.createTextRange();
				rngi.setEndPoint("EndToStart", r2);
				i=rngi.text.length;
				rngj=kampo.createTextRange();
				rngj.setEndPoint("EndToEnd", r2);
				j=rngj.text.length;
			} catch(e) {
				r2=sel.createRange();
				var r3= r2.duplicate();
				r3.moveToElementText(kampo); // Electu tutan tekston en la duobligita [range]
				r3.setEndPoint('EndToEnd',r2);
				var x2=r2.text;
				var x3=r3.text; 
				i = x3.length - x2.length;
				j = i + x2.length;
				x2 = x2.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
				x3 = x3.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
				I = x3.length - x2.length;
				J = I + x2.length;
			}}
		} else J=j=I=i=-1;
		if (i<0 || i!=j) J=j=I=i=-1;
		return [i,j,I,J]; 
	} 

	function skribuLokon(kampo, kie) {
		if(typeof kampo.selectionStart=="number") {
			kampo.selectionStart = kie;
			kampo.selectionEnd = kie; // <-- cimo en Opera 8.5, bug-182864 CHE bugs.opera.com
		} else if(kampo.createTextRange) {
			var r = kampo.createTextRange();
			r.move('character', kie);
			r.select(); 
		} 
	}

	function shanghu(k,a) {
		for(i in a) k=k.replace(a[i][0],a[i][1]);
		return k;
	}

	var klavo = -1;
	if (ev && ev.which) {
	    klavo = ev.which; // NS4 & NS6
	} else if (window.event && window.event.keyCode) {
	   klavo = window.event.keyCode; // IE
	}
	if(klavo<1 || klavo==16 || (klavo>32 && klavo<41)) return;
	try {
		var metu = false;
		var a = leguLokon(this);
		var i = a[0];
		if (i < 0) return;
		var I = a[2];
		var M = -1;
		var k = this.value.substr(0,i);
		var f = this.value.substr(i);
		var k0 = k;
		var f0 = f;
		k = shanghu(k, [
			[/c[Xx^]$/g,"\u0109"], [/C[Xx^]$/g,"\u0108"],
			[/g[Xx^]$/g,"\u011D"], [/G[Xx^]$/g,"\u011C"],
			[/H[Xx^]$/g,"\u0124"], [/h[Xx^]$/g,"\u0125"],
			[/J[Xx^]$/g,"\u0134"], [/j[Xx^]$/g,"\u0135"],
			[/S[Xx^]$/g,"\u015C"], [/s[Xx^]$/g,"\u015D"],
			[/U[Xx~]$/g,"\u016C"], [/u[Xx~]$/g,"\u016D"]]);
		if (k.length != k0.length) {
			metu = true;
			M=I-1;
		} else {
			k = shanghu(k, [
				[/\u0109x$/g,"cx"], [/\u0109X$/g,"cX"], [/\u0108x$/g,"Cx"], [/\u0108X$/g,"CX"],
				[/\u011Dx$/g,"gx"], [/\u011DX$/g,"gX"], [/\u011Cx$/g,"Gx"], [/\u011CX$/g,"GX"],
				[/\u0125x$/g,"hx"], [/\u0125X$/g,"hX"], [/\u0124x$/g,"Hx"], [/\u0124X$/g,"HX"],
				[/\u0135x$/g,"jx"], [/\u0135X$/g,"jX"], [/\u0134x$/g,"Jx"], [/\u0134X$/g,"JX"],
				[/\u015Dx$/g,"sx"], [/\u015DX$/g,"sX"], [/\u015Cx$/g,"Sx"], [/\u015CX$/g,"SX"],
				[/\u016Dx$/g,"ux"], [/\u016DX$/g,"uX"], [/\u016Cx$/g,"Ux"], [/\u016CX$/g,"UX"]]);
			if (k != k0) {
				metu = true;
				M=I;
			}
		}
		if (metu) {
			this.value = k+f;
			skribuLokon(this, M);
		}
	} catch(e) { status=e; }
}
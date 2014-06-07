// ==UserScript==

// @name          Na'vi character help

// @namespace     http://userscripts.org/scripts/show/116309

// @description	  Type x after a,i, for accented characters used in Na'vi language.

// @include       *

// ==/UserScript==

// Copied from... 

// Bazita sur TTT-KLAVARO POR ESPERANTO de A. Irvine 2005

// Redaktis kaj igis "user script" Allon R. 2005

// ...edited for use with the Na'vi language from the film, Avatar.

// All credit to Allon R. 

// (Dankon Allon).



function walk(target){

	if (!target.getElementsByTagName) return;

	function aldonu(o,f) { 

		if(o.addEventListener) o.addEventListener("keyup",f,false); 

		else if(o.attachEvent) o.attachEvent("onkeyup",f); 

		else o.onkeyup=f;

	}

	var t=["input","textarea"];

	for(i in t) {

		var e=target.getElementsByTagName(t[i]);

		for(j in e) aldonu(e[j],eotajpu);

	}

}



walk(document);



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

			[/A[Xx^]$/g,"\u00C4"], [/a[Xx^]$/g,"\u00E4"],

			[/I[Xx~]$/g,"\u00CC"], [/i[Xx~]$/g,"\u00EC"]]);

		if (k.length != k0.length) {

			metu = true;

			M=I-1;

		} else {

			k = shanghu(k, [

				[/\u00E4x$/g,"ax"], [/\u00E4X$/g,"aX"], [/\u00C4x$/g,"Ax"], [/\u00C4X$/g,"AX"],

				[/\u00ECx$/g,"ix"], [/\u00ECX$/g,"iX"], [/\u00CCx$/g,"Ix"], [/\u00CCX$/g,"IX"]]);

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



document.addEventListener('DOMNodeInserted',function(x) { walk(x.target); },false);
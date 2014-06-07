// ==UserScript==
// @name          Hebrew English Swapper
// @namespace     http://allon.rothfarb.info
// @description	  Change directon: ctrl+shift. Change language already typed: ctrl+space.
// @include       *
// ==/UserScript==

(function(){
	function aldonu(o,f) { 
		if(o.addEventListener) o.addEventListener("keydown",f,false); 
		else if(o.attachEvent) o.attachEvent("onkeydown",f); 
		else o.onkeydown=f;
	}
	var t=["input","textarea"];
	for(i in t) {
		var e=document.getElementsByTagName(t[i]);
		for(j in e) aldonu(e[j],goddamnhebrewenglish);
	}
})();

function goddamnhebrewenglish(ev) {
	function fixUTF(s) {
		var rv = "";
		for (var i=0; i<s.length; ++i) {
			var c = s.charCodeAt(i);
			if (c >= 208 && c <= 234) c+=1280;
			rv += String.fromCharCode(c);
		}
		return rv;
	}
	function hex4(n) {
		return Math.floor(n/4096).toString(16) + (Math.floor(n/256)%16).toString(16) + (Math.floor(n/16)%16).toString(16) + (n%16).toString(16);
	}
	if (!ev.ctrlKey) return true;
	if (ev.shiftKey) this.dir=(this.dir=="rtl"?"ltr":"rtl");
	if (ev.keyCode!=32) return true;
	var a,b,t=this.value;
	var e="ertyuiopasdfghjklzxcvbnm";
	var h="קראטוןםפשדגכעיחלךזסבהנמצ";
	if(/[a-zA-Z]/.test(t)) { a=e+",'w./q;`"; b=fixUTF(h+"ת,'/ף;"); }
	else { a=fixUTF(h+";ף/.ץ'ת"); b=e+"`;q/.w',"; }
	for(var i=0; i<32; ++i) {
		t=eval("t.replace(/\\u"+hex4(a.charCodeAt(i))+"/gi,\""+b.charAt(i)+"\")");
	}
	this.value=t;
	return true;
}
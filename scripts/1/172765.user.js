// ==UserScript==
// @name        OP like link selection
// @namespace   eight04.blogspot.com
// @description Disable link draging and select text.
// @include     http://*
// @include     https://*
// @version     2.0.3
// @grant		none
// @updateURL   http://userscripts.org/scripts/source/172765.meta.js
// ==/UserScript==

function OPLLS(){
	this.init.apply(this,arguments);
}

OPLLS.prototype={
	handleEvent: function(e){
		switch(e.type){
			case "mouseup":
				if(!getSelection().toString())break;
				//e.preventDefault();
				//e.stopPropagation();
				console.log("mouseup");
				var t=e.target;
				while(t.nodeName!="A" && t.nodeName!="HTML")t=t.parentNode;
				if(!t.href){
					console.log("uninit");
					this.uninit();
				}
				break;
			case "click":
				if(!getSelection().toString()){
					console.log("clicked and uninit");
					this.uninit();
					break;
				}
				e.preventDefault();
				e.stopPropagation();
				console.log("selected and uninit");
				this.uninit();
		}
	},
	init: function(e){
		var t=e.target;
		if(t.nodeName=="IMG")return;
		while(t.nodeName!="A" && t.nodeName!="HTML")t=t.parentNode;
		if(!t.href)return;
		t.draggable=false;
		console.log("OK");
		document.addEventListener("mouseup",this,true);
		document.addEventListener("click",this,true);
	},
	uninit: function(){
		document.removeEventListener("mouseup",this,true);
		document.removeEventListener("click",this,true);
	}
}

document.addEventListener("mousedown",function(e){
	if(e.button!=0 || e.ctrlKey || e.altKey || e.shiftKey)return;
	new OPLLS(e);
},false);
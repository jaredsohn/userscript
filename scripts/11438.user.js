// ==UserScript==
// @name        <pre> to <textarea>
// @namespace   http://d.hatena.ne.jp/Sybian/
// @include     http://*
// @description pre <-> textarea
// @version     1.0.2
// ==/UserScript==

// Ctrl+Click <PRE>, become <TEXTAREA>
// ESC or Ctrl+[ or Ctrl+Shift+Click in <TEXTAREA>, restore <PRE>

(function(){
	with((typeof unsafeWindow == "undefined") ? window : unsafeWindow){
		var pre=document.getElementsByTagName("pre");

		for(var i=0,len=pre.length; i<len; i++){
			var defaultCursor=pre[i].style.cursor;
			pre[i].addEventListener("mouseover",function(e){
				if(e.ctrlKey){
					this.style.cursor="pointer";
				}
			},false);

			pre[i].addEventListener("mouseout",function(){
				this.style.cursor=defaultCursor;
			},false);

			pre[i].addEventListener("click",function(e){
				if(!e.ctrlKey) return ;
				if(!this.tx){
					var tx=document.createElement("textarea");
					tx.style.width=getWidth(this);
					tx.style.height=getHeight(this);
					tx.originalPre=this;
					tx.addEventListener("keydown",function(e){
						if(e.keyCode == "27" // ESC
							|| (e.keyCode=="219" && e.ctrlKey) // C-[
							){
								this.parentNode.replaceChild(this.originalPre,this);
						}
					},false);

					tx.addEventListener("click",function(e){
						if(e.ctrlKey && e.shiftKey){
							this.parentNode.replaceChild(this.originalPre,this);
						}
					},false);

					// for html entities
					var div=document.createElement("div");
					div.innerHTML=this.innerHTML.replace(/<.*?>/mg,"");
					tx.value=div.childNodes[0].nodeValue;

					this.tx=tx;
				}
				this.parentNode.replaceChild(this.tx,this);
				this.tx.focus();
			},false);
		}
	}

	function getWidth(aNode) {
		return (parseInt(getComputedStyle(aNode, "").width) +
						parseInt(getComputedStyle(aNode, "").paddingLeft) +
						parseInt(getComputedStyle(aNode, "").paddingRight)).toString() + "px";
	}
	function getHeight(aNode) {
		return (parseInt(getComputedStyle(aNode, "").height) +
						parseInt(getComputedStyle(aNode, "").paddingTop) +
						parseInt(getComputedStyle(aNode, "").paddingBottom)).toString() + "px";
	}
})();


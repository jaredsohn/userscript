// ==UserScript==
// @name           Hide Thaivisa Quotes
// @namespace      
// @description    Show/Hide Quotes on Thaivisa Forum
// @include       *thaivisa.com/forum*
// ==/UserScript==

function toggleQuote(){

	q=document.getElementsByTagName("div");
	if(q.length!=0){
		for(t=0;t<q.length;t++){
			if(q[t].className=="quotemain"){
				q[t].style.display="none";
				b=document.createElement("input")
				b.type="button";
				b.value="show";
				b.style.cursor="pointer"
				b.style.backgroundColor="#f0f0f0"
				//b.onclick=show
				b.setAttribute('onclick','if(this.parentNode.nextSibling.style.display=="none"){this.parentNode.nextSibling.style.display="block";this.value="hide";}else{this.parentNode.nextSibling.style.display="none";this.value="show"}')
				q[t].previousSibling.appendChild(b);
			}
		}
	}
}
toggleQuote();
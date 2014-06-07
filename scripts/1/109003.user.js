// ==UserScript==
// @name           115 sc
// @namespace      http://falcon-chen.tk/
// @description    Press Alt+A to call the 115 network favorite  to collect current page in a small header frame . 
// @include        *
// ==/UserScript==


window.addEventListener("keyup",function(e) {

	if (e.keyCode==65 && e.altKey) { //alert("115");
		var b=document,a=window,c=encodeURIComponent,u="http://sc.115.com/";	
		if(b.location.protocol==="https:"){
			a.open(u+"add?url="+c(b.location)+"&title="+c(b.title)+"&from=js_bar","js_bar","left=10,top=10,height=480px,width=600px,resizable=1,alwaysRaised=1");	 
			setTimeout("a.focus()",300);
		}
		else if(b.location.protocol==="http:"){
			var j=b.createElement("script");
			var c= new Date;
			j.charset="utf-8";
			j.src=u+ "static/js/SCJ.js?" +c;
			b.body.appendChild(j)
		}
	}
 }, false);


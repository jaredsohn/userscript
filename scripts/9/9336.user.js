// ==UserScript==
// @name           h3o.de - xing.com
// @namespace      http://h3o.de/sites
// @description    Automatically posts track message if you are looking on profile at Xing.com (former OpenBC)
// @include        https://www.xing.com/profile/*
// @include        https://www.xing.com/app/profile/*
// ==/UserScript==

window.setTimeout(
	function() {
			
	runH3O();
	 	
	function runH3O(msg) {
		var x=""+window.location;		
		if(x.indexOf("h3o.de")>0) {			
			return;
		}
		language=navigator.language.substring(0,2);
		if(language="de") {
			msg="Betrachte Xing Profil von: "; 
			} else {
			msg="Looking Xing Profile of: ";
			}
		
		msg=msg+"["+document.title.substr("XING - ".length)+"|"+window.location+"]";
		var h3obox = document.getElementById("h3obox");
		if(h3obox) {
			h3obox.innerHTML="";
		}
		var body = document.getElementsByTagName("body");
		var html="";
		html=html+"<div style='position:relative;width: 755px;margin: 0 auto;padding: 0px 0;text-align: left;top:-130px;z-index:90;' id='h3obox'>";
		html=html+"<div style='position:absolute;height:216px;width:614px;background-image:url(\"http://h3o.de/624x216.png\");border:0px;margin:0px;top:0px;'>";
		html=html+"<iframe src='http://h3o.de/widget.php?msg="+escape(msg)+"' style='position:relative;top:140px;left:60px;border:0px;' width='530' height='50'>";
		html=html+"</iframe>";	
		html=html+"</div></div>";		
		body[0].innerHTML=html+body[0].innerHTML;
	}
},1000);
// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey
// @name          listpic enhance details box
// @description   Changes the behavior of the details box so that you do not have to scroll down to see the box for items at the bottom of your screen
// @include   http://*.listpic.com/*
// ==/UserScript==

	if(unsafeWindow.listingShow != undefined){
		var _listingShow = unsafeWindow.listingShow;
		unsafeWindow.listingShow = function(_c,_d,_e){
			if(unsafeWindow.lastElement==_c){
				document.getElementById("listing").style.display="none";
				unsafeWindow.lastElement=null;
				return;
			}
			var _f=_c.href.substr(0,_c.href.indexOf("_"))+".html";
			document.getElementById("permalink").href=_f;
			document.getElementById("email").style.display="none";
			document.getElementById("emailFormURL").value=_f;
			document.getElementById("listingcontent").innerHTML="<h3><a href=\""+_f.replace("listpic.com","craigslist.org")+"\" target=\"_blank\" onclick=\"listingHide();\">"+_c.title+"</a></h3>"+_d+"<br /><center><a href=\""+_f.replace("listpic.com","craigslist.org")+"\" target=\"_blank\" onclick=\"listingHide();\"><img src=\""+_c.firstChild.src+"\" onload=\"if(document.all){this.style.filter='progid:DXImageTransform.Microsoft.BasicImage(rotation=0)'; this.title='Right-click to Rotate Clockwise';}\" oncontextmenu=\"this.style.filter='progid:DXImageTransform.Microsoft.BasicImage(rotation=' + ((this.filters.item('DXImageTransform.Microsoft.BasicImage').Rotation + 1) % 4) + ')'; return false;\" /></a></center>"+_e;
			position=unsafeWindow.findPos(_c.parentNode);
			var boxwidth = _c.parentNode.offsetWidth;
			var boxheight = _c.parentNode.offsetHeight;
			if(position[0]+boxwidth+400<document.body.offsetWidth){
				document.getElementById("listing").style.left=position[0]+boxwidth+"px";
			}else{
				document.getElementById("listing").style.left=position[0]-410+"px";
			}
			if(position[1]-window.pageYOffset+520<window.innerHeight){
				document.getElementById("listing").style.top=position[1]+_c.parentNode.offsetHeight+"px";
			}else{
				document.getElementById("listing").style.top=window.pageYOffset+window.innerHeight-520+"px";
			}
			//document.getElementById("listing").style.top=position[1]+_c.parentNode.offsetHeight+"px";
			document.getElementById("listing").style.display="block";
			unsafeWindow.lastElement=_c;
		}
	}

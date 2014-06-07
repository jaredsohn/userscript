// ==UserScript==
// @name           Di cleanup
// @author         Peter Olby

// @version        2.1
// @namespace      olby.nu/dicleanup
// @description    Removes the top banner and rearrange menu items on Swedish site Dagens Industri, di.se.
// @include        http://di.se/*
// @include        http://www.di.se/*
// ==/UserScript==


fs = document.getElementsByTagName("FrameSet");
if(fs[0]){
	fs[0].setAttribute('rows', '0,0,*');
}

/* used for old di.se
GM_addStyle('#banner-top {display:none;}');

makeDiBannerScrollable();

function makeDiBannerScrollable(){
	fs = document.getElementsByTagName("FrameSet");
	if(fs[0]){
		fs[0].setAttribute('rows', '0,*');
	}
	
	
	c1 = document.getElementById("column1-region"); 
	ns = document.getElementById("nav-sup");
	if(c1 && ns){
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", "/Header.aspx");
		ifrm.style.height = 200+"px";
		ifrm.setAttribute('width', '100%');
		ifrm.setAttribute('frameborder', '0');
		ifrm.setAttribute('scrolling', 'no');
		c1.insertBefore(ifrm ,ns);
	}
	
	
	ew = document.getElementById("extra-wide-region")
	wr = document.getElementById("wide-region");
	if(wr && ew){
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", "/Banner.aspx");
		ifrm.style.height = 20+"px";
		ifrm.setAttribute('width', '100%');
		ifrm.setAttribute('frameborder', '0');
		ifrm.setAttribute('scrolling', 'no');
		ew.insertBefore(ifrm ,wr);
	}
}
*/
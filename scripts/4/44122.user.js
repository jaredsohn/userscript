// ==UserScript==
// @name           QR Code for Everything!
// @namespace      http://bshort.com/code/greasemonkey/
// @include        *
// ==/UserScript==

//<img src="http://qrcode.kaywa.com/img.php?s=8&d=http%3A%2F%2Fbshort.org" alt="qrcode"  />
   

var qrcodeInited = false;
var qrcodeTimer = null;
var showqrcodeEverywhere = GM_getValue('showqrcodeEverywhere');
if (showqrcodeEverywhere== undefined){
	showqrcodeEverywhere = false;
	GM_setValue('showqrcodeEverywhere',false);
	
} 

 
//alert(showqrcodeEverywhere);
if (showqrcodeEverywhere){
	if (parent.frames.length != 0) {
	  // loaded in frames
	} else {
  // not loaded frames
 		showQR();
	}
}

function showQR(){
	mainDoc = top.document.body;
	loc = top.document.location.href;
	//loc = loc.encode;
	//alert(loc);
	//imager.style.visiblity=\"hidden\";
	image = "<div  id='imager' style='position:absolute;top:0px;left:0px;z-index:1000;border:black solid 10px;'><a href='#' onclick='javascript:imager=document.getElementById(\"imager\");imager.innerHTML=\"\"; ' ><div  style='border:white solid 10px;'><img src='http://qrcode.kaywa.com/img.php?s=8&d=" +   loc + "' alt='qrcode' id='qrcodethingy' style='border:black solid 0px;'/></div></a></div>";
	
	mainDoc.innerHTML = image + mainDoc.innerHTML;
	imagediv = document.getElementById("imager");
	
	if (imagediv){
		imagediv.style.visibility = "visible";				
	}
	
}

function showForThisPage() {
	if (!qrcodeInited) {
		var agreed = GM_getValue('qrcodeAgreed');
		if (!agreed) {
			GM_setValue('qrcodeAgreed',true);
 
		}
		if (agreed) {
			
			showQR();
			
		    qrcodeInited = true;
 
		}
	}
}


function hideForThisPage() {
	imagediv = document.getElementById("imager");
	
	if (imagediv){
		imagediv.style.visibility = "hidden";				
	}
 
}

function showForAllPages() {
	if (!qrcodeInited) {
		var agreed = GM_getValue('qrcodeAgreed');
		if (!agreed) {
			GM_setValue('qrcodeAgreed',true);
 
		}
		if (agreed) {
 			
		    qrcodeInited = true;

			if (showqrcodeEverywhere){
		    	showqrcodeEverywhere = false;	
				GM_setValue('showqrcodeEverywhere',false);
 				
			} else{
		    	showqrcodeEverywhere = true;			
				GM_setValue('showqrcodeEverywhere',true);
 			}

		}
	}
}

GM_registerMenuCommand("Show QR Code on this page", showForThisPage);
GM_registerMenuCommand("Hide QR Code on this page", hideForThisPage);
GM_registerMenuCommand("Toggle QR Code for all pages", showForAllPages);


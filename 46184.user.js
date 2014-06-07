// ==UserScript==
// @name           MediaFire Auto-Download
// @namespace      
// @include        http://www.mediafire.com/download.php?* 
// @include		   http://www.mediafire.com/*
// ==/UserScript==

function clickit(){
	try{
		unsafeWindow.p_ct_link.href = unsafeWindow.p_ct_dl_url;
		unsafeWindow.p_ct_link.target = "";
		return true;
	}
	catch(err){
		return false;
	}
}
window.addEventListener("load", function(e) {
	var clicklink =  document.getElementById('download_link').firstChild;
	if(clickit()){
		try{
			var evt = window.document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			clicklink.dispatchEvent(evt);
		}
		catch(err){
			alert('error2');
		}
	}
	else{
		document.location=clicklink.toString();
	}
		
}, false);

// ==UserScript==
// @name           image embedder
// @namespace      127.0.0.1
// @include        http://boards.adultswim.com/t5/*
// ==/UserScript==
function fixImgWidth(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var posts = document.getElementsByClassName("lia-message-body-content");
for(i=0;i<posts.length;i++){
	var msgLink = posts[i].getElementsByTagName('a');
	for(n=0;n<msgLink.length;n++){
		var href = msgLink[n].getAttribute('href');
		var lnk = msgLink[n];
		var imgExtensions = [".tif", ".tiff", ".png", ".bmp", ".jpeg", ".gif", ".jpg"];
		for(var j = 0; j < imgExtensions.length; j++) {
		var ext = imgExtensions[j];
		if(href.toLowerCase().substring(href.length - ext.length) == ext) {
			if (!(lnk.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature' || lnk.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == 'UserSignature lia-message-signature')) {
			lnk.innerHTML = lnk.innerHTML + '<br><img border=0 src='+ msgLink[n].href +'>';
		}

			
		}
	}
}
}
fixImgWidth('img {max-width: 800px !important}');

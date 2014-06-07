// ==UserScript==
// @name           Clubbing KL Smiley for Facebook by Sokpinter V. 3.0
// @icon           http://i948.photobucket.com/albums/ad324/sokpinter/KLsmiley.jpg
// @namespace      Clubbing KL Emoticon
// @description    Smiley Clubbing KL untuk Update Status, Wall dan Chat Facebook
// @require        http://userscripts.org/scripts/source/103497.user.js
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// @author         sokpinter
// @version        3.0.0
// @versionnumber  0.17


// ==/UserScript==

	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 3.0;
	HttpsOn = window.location.href.match('https://')?true:false;


	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://userscripts.org/scripts/source/132285.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('Terjadi kesalahan saat melakukan Update:\n' + err);
			}
		}
	}

	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@versionnumber\s+(\d+\.\d+)/)[1] > version) {
			if(confirm("Update untuk smiley KL udah tersedia woy.\nMau pasang sekarang?")) openInTab('http://userscripts.org/scripts/source/132285.user.js');
		}
	}

	UpdateCheck();

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://sokpinter.com/kapanlagi-misc.php','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://i948.photobucket.com/albums/ad324/sokpinter/KLsmiley.jpg\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; right: 0px; top: 100px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);
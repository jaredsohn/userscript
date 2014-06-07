//
// ==UserScript==
// @name			kwangmyongsong3
// @author			raskolnikov
// @description		kwangmyongsong3 
// @include		http://www.lizard-tail.com/isana/tracking/?target=kwangmyongsong3
// @grant       none
// @run-at		document-end

// ==/UserScript==

function insertAfter( referenceNode, node )
{
	referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

var playerMainDiv = document.createElement('div');
var iframeObj =  document.createElement('iframe');
iframeObj.setAttribute('width', '320');
iframeObj.setAttribute('height', '240');
iframeObj.setAttribute('frameborder', '0');
iframeObj.setAttribute('style', 'position: relative; left: 40px; top:5px;' );
iframeObj.setAttribute('src', 'http://www.youtube.com/embed/kURVUXgaV0g?autoplay=1&fs=1' );
playerMainDiv.appendChild( iframeObj );
playerMainDiv.setAttribute('style', 'width: 320px;' );
insertAfter( document.getElementById('config_satellites'), playerMainDiv );
		
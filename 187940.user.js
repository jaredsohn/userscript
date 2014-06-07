// ==UserScript==
// @name          Media-spanking image downloader
// @namespace     mediaspanking.js
// @description	  Allows the download of pages of images from Media-spanking
// @author        thingywhat
// @include       http://mediasp.kir.jp/bbsnote/bbsnote.cgi*
// ==/UserScript==

window.onload = function(){
    var imageNodes = document.querySelectorAll('td img'),
	canvas = document.createElement('canvas'),
	cx = canvas.getContext('2d'),
	button = document.createElement('input'),
	i = 0;

    canvas.style = "visibility: hidden;";
    document.body.appendChild(canvas);

    button.type = "submit";
    button.className = "button";
    button.value = "Download page!";
    button.onclick = function(){
	(function downloadNext(node){
	    var anchor = document.createElement("a");
	    anchor.style = 'visibility: hidden;';
	    document.body.appendChild(anchor);
	    
	    var image = node.src;
	    canvas.width = node.width;
	    canvas.height = node.height;

	    canvas.style.width = node.width + "px";
            canvas.style.height = node.height + "px";
            cx.drawImage(node, 0, 0, node.width, node.height);
            var rawImageData = canvas.toDataURL("image/png;base64");
            rawImageData = rawImageData.replace("image/png",
						"image/octet-stream");
            anchor.href = rawImageData;
	    anchor.download = "downloadimage" + i + ".png";
	    anchor.click();
	    document.body.removeChild(anchor);
	    
	    if(i < imageNodes.length) downloadNext(imageNodes[i++]);
	})(imageNodes[i]);
    };

    document.querySelector('td input[class=button]').parentNode
	.appendChild(button);
};

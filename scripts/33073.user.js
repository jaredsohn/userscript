// ==UserScript==
// @name           Railbrit JS Image Link Converter
// @namespace      http://userscripts.org/users/65108
// @description    Removes JS links to images, replacing with normal ones
// @include        http://railbrit.co.uk/*
// @include        http://www.railbrit.co.uk/*
// @include        http://ccgi.ewanbeth.force9.co.uk/*
// ==/UserScript==
// Version 20080903

(function(){
	var links = document.getElementsByTagName('a');
	
	for(var i=0; i < links.length; i++) {
		var link = links[i];
		link.href = link.href.replace(/javascript\:wimage\([\"\']?([0-9,]*?)[\"\']?\)/g,
				"http://www.railbrit.co.uk/imageenlarge/imagecomplete.php?id=$1");
	}
	
	var fadeimages = unsafeWindow.fadeimages;
	if (fadeimages) {
		for(var i=0; i < fadeimages.length; i++) {
			var fadeimage = fadeimages[i];
			fadeimage[1] = fadeimage[1].replace(/javascript\:wimage\([\"\']?([0-9]*?)[\"\']?\)/g,
					"http://www.railbrit.co.uk/imageenlarge/imagecomplete.php?id=$1");
		}
	}
})();
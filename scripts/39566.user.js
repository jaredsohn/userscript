// ==UserScript==
// @name           Skip RS-layer
// @namespace      RS-layer
// @description    Skips the rapidshare-layer page
// @include        http://*rs-layer.com*
// ==/UserScript==


	function getFile(){
			var imageElems = document.getElementsByTagName('tr');

			for (var i = 0; i < imageElems.length; i++) {
				if (imageElems[i].getAttribute('style') == 'cursor: pointer;') {
					return getFileFromMess(imageElems[i].getAttribute('onclick'));
				}
			}
			return false;
	}


	function getFileFromMess(str)
	{
		var i=9;
		var file='';
		while(str.charAt(i+1) != (")") )
		{
			file = file + str.charAt(i);
			i++;
		}

		return file;
	}



	function checkFirstPage() {
		var imageElems = document.getElementsByTagName('tr');

		for (var i = 0; i < imageElems.length; i++) {
			if (imageElems[i].getAttribute('style') == 'cursor: pointer;') {
				return true;
			}
		}
		return false;
	}

if(checkFirstPage()){
	document.location.href = 'http://rs-layer.com/link-' + getFile() + '.html';
}
// ==UserScript==
// @name Prevent URL paste
// @description Warns user when pasting email url.
// ==/UserScript==
	document.addEventListener('paste',function(e){
		var pastedText = e.clipboardData.getData("text");
			if(pastedText.match(/mail\.google\.com|mail\.yahoo\.com|mail\.live\.com/ig)){
					if(confirm("Email link detected. It is not reccomended for you to link to your emails by their url. \nPress OK to block or Cancel to paste."))
						e.preventDefault();	
				}
	});
// ==UserScript==
// @name BlockFlash
// @fullname BlockFlash
// @namespace http://www.vandenoever.info
// @description not start Flash animation until you click on them.
// @include *
// ==/UserScript==

/*
  Author: Jos van den Oever ( jos@vandenoever.info )

  License: GPL

  Version history:
    2006-02-12: initial version

Inspiration for this script comes from the removeFlash script and the FlashBlock firefox extension.
*/

(function () {
	var objects = document.getElementsByTagName("object");
	for(i=0;i<objects.length;i++)
	{
		var flash = objects[i];			
		if(flash.innerHTML.match(/.swf|shockwave|flash/))
		{
			var placeholder = document.createElement("div");
			placeholder.innerHTML = "Click to play Flash animation.";
			placeholder.style.cursor = 'pointer';
			placeholder.style.background = 'gray';
			placeholder.style.color = 'black';
			flash.parentNode.insertBefore(placeholder, flash);
			flash.on = false;
			placeholder.addEventListener('click', function() {
				if (flash.on) {
					flash.style.display = 'none';
					placeholder.innerHTML = "Click to start Flash animation.";
					flash.on = false;
				} else {
					flash.style.display = '';
					placeholder.innerHTML = "Click to stop Flash animation.";
					flash.on = true;
				}
			}, true);
			flash.style.display = 'none';
		}
	}

})();


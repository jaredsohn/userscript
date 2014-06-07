// ==UserScript==
// @name           Show broken image icon
// @description    Show a broken image icon for broken images.  Shows icon regardless of 'alt' attribute.  Icon not shown for partially loaded images or if img tag used as a spacer.
// @include        *
// ==/UserScript==

function check(){
	if ((this.naturalWidth == 0)||(this.naturalHeight == 0))
		if (this.getAttribute("src")) {
			this.style.MozForceBrokenImageIcon = 1;
			this.width = Math.max(this.width,40);
			this.height = Math.max(this.height,40);
			GM_log(this.src+" broken");
		}
}

for (var i=0; i<document.images.length; i++) {
	var img=document.images[i];
	if (img.complete) check.call(img);
	else img.addEventListener("error", check, false);
}

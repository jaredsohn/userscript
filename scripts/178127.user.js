// ==UserScript==
// @name          Highlight Table Row on Click2 
// @description   Fork Highlight Table Row on Click
// @include       http*://*bugzilla*/buglist.cgi?*
// ==/UserScript==

var trs 		= document.getElementsByTagName('tr'),
	cached_bg 	= new Array(),
    color 		= '#fcc',
    rgb 		= 'rgb(255, 204, 204)',
    elmRow, i;

for (i = trs.length - 1; i >= 0; i--) {
    elmRow = trs[i];       
    elmRow.dataset.bg = elmRow.style.backgroundColor;
    elmRow.addEventListener('click', function() {
        if (this.style.backgroundColor == rgb) {
            this.style.backgroundColor = this.dataset.bg;
        } else {
            this.style.backgroundColor = color;
        }
        
    }, true);
}
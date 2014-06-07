// ==UserScript==
// @name           Tumb Quotes
// @namespace      http://greasemonkey.megagamer.net/
// @include        http://www.facepunch.com/showthread.php?*
// ==/UserScript==
if (typeof(google) == 'undefined')
{
    ChromeKludge();
}
else
{
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')();'));
    document.head.appendChild(script);
}
function ChromeKludge() {
	function autoThumb($) {
		$('img', '.quote').each(function(i) {
			if (this.height > 500 || this.width > 500) {
				// Too big!
				if ((this.height/this.width) > 1) {
					this.height = 500;
					this.width = Math.round(this.width*(500/this.height));
				}
				else {
					this.width = 500;
					this.height = Math.round(this.height*(500/this.width));
				}
			}
		});
	}
	autoThumb(typeof(google) == 'undefined' ? unsafeWindow.jQuery : jQuery);
}
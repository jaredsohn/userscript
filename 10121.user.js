// ==UserScript==
// @name		ImageFap direct galleries++
// @namespace		http://deeler.de
// @description		clean up page and show gallery images in fullsize
// @include		http://www.imagefap.com/gallery.php?*gid*
// ==/UserScript==

var obj = document.getElementsByTagName('img');
var url_regex = /(.*images\.imagefap\.com\/images\/thumb\/.*)\/(.*)$/i;
var newBody = "<html><head>" +
"<style type=\"text/css\"><!--" +
"a { text-decoration: none;" +
	"color: #000000;" +
	"font-family: \"Courier New\", Courier, monospace;" +
	"font-size: 12px;" +
	"background-color: #FFFFFF; }" +
"a:hover { background-color: #FFCC99; }" +	
"--></style><head><body>";

for(i = 0 ; i < obj.length; i++) {
	if (url_regex.test(obj[i].src)) {
		var temp = url_regex.exec(obj[i].src);

		newBody += "<span style=\"position: absolute; padding: 5px; -moz-opacity:0.5;\">" +
			"<a href=\"http://www.imagefap.com/image.php?id=" +temp[2]+ "\" target=\"_blank\">" +temp[2]+ "</a></span>" +
//			"<img src=\"http://images1.imagefap.com/full/getimg.php?img=" +temp[2]+ "\" onload=\"" +
			"<img src=\"" +temp[0].replace(/thumb/, 'full')+ "\" onload=\"" +
			"this.alt = window.innerWidth / this.width;" +
			"if (window.innerHeight / this.height < this.alt) this.alt = window.innerHeight / this.height;" +
			"if (this.alt < 1) this.width = this.width * this.alt - 25; else this.alt = 1;\"" +
			"onclick=\"this.style.width = (this.style.width == 'auto' && this.alt < 1) ? this.width * this.alt - 25 + 'px' : 'auto';\"/><p />";
	}
}

var obj2 = document.getElementsByTagName('a');
var url_regex2 = /.*imagefap\.com\/gallery\.php\?pgid=.*/i;

for(i = 0 ; i < obj2.length; i++)
	if (url_regex2.test(obj2[i]))
		newBody += "<span style=\"font-size: 13px;\">" +
			"<a href=\"" +obj2[i]+ "\">" +obj2[i].innerHTML+ "</a>&nbsp;&nbsp;&nbsp;";

newBody += "</body></html>";

window.addEventListener('load', function() { document.write(newBody); }, true);



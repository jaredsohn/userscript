// ==UserScript==
// @name		ImageFap Better Direct Galleries++
// @namespace		http://noone.example.com/
// @description		clean up page and show gallery images in fullsize
// @include		http://www.imagefap.com/gallery.php?*gid*
// ==/UserScript==

/* This is based on ImageFap Direct Galleries++ */

var obj = document.getElementsByTagName('img');
var url_regex = /(.*images\.imagefap\.com\/images\/thumb\/.*)\/(.*)$/i;
var newBody = "<html><head><link rel=\"stylesheet\" href=\"/style.css\" type=\"text/css\">" +
"<style type=\"text/css\"><!--" +
"a.overlay { text-decoration: none;" +
	"color: #000000;" +
	"font-family: \"Courier New\", Courier, monospace;" +
	"font-size: 12px;" +
	"background-color: #FFFFFF; }" +
"a.overlay:hover { background-color: #FFCC99; }" +	
"--></style><head><body>";

for(i = 0 ; i < obj.length; i++) {
	if (url_regex.test(obj[i].src)) {
		var temp = url_regex.exec(obj[i].src);

		newBody += "<span style=\"position: absolute; padding: 5px; -moz-opacity:0.5;\">" +
			"<a class=\"overlay\" href=\"http://www.imagefap.com/image.php?id=" +temp[2]+ "\" target=\"_blank\">" +temp[2]+ "</a></span>" +
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

document.evaluate('//tr/td/center', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = "";
document.evaluate('//tr/td/center', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = "";
document.evaluate('//tr/td/center[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = "";
document.evaluate('//tr/td/center[3]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = "";

var allTrs = document.evaluate('//tr/td/center[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var thisTr = allTrs.snapshotItem(0);
thisTr.innerHTML = newBody;

var t = document.evaluate('//div[@id="main"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
t.childNodes[1].innerHTML = "";
tab = t.childNodes[3];
tab.width = "100%";
while(tab.nextSibling){
tab.parentNode.removeChild(tab.nextSibling);
}

xs = document.evaluate('//td[@width=550]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(xs.snapshotLength > 0) xs.snapshotItem(0).parentNode.removeChild(xs.snapshotItem(0));
xs = document.evaluate('//table[@width=750]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(xs.snapshotLength > 0) xs.snapshotItem(0).parentNode.removeChild(xs.snapshotItem(0));

newBody = t.innerHTML;
window.addEventListener('load', function() { document.write(newBody); }, true);




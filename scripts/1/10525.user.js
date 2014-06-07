// ==UserScript==
// @name           Infowars Direct MP3 Link
// @namespace      http://www
// @description    Direct Link to Alex Jones' daily "podcast" MP3s at infowars.com.
// @include        http://infowars.com/
// @include        http://*.infowars.com/
// ==/UserScript==

function getDat(x) {
	GM_xmlhttpRequest({
		method:"GET",
		url:x,
		headers:{
			"User-Agent":"Mozilla/5.0 Firefox/2.0.0.3",
			"Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
		},
		onload:function(details) {
			var URLstring = new String(details.responseText);
			if (URLstring) {
				var l = isolate(URLstring);
				var ll = moreDate(l);
			}
			var nn = document.createElement("div");
			nn.innerHTML = '\<a\ href\=\"'+l+'\"\ style=\"font-size:120%!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ MP3\ Link\ \-\ '+ll+'\<\/a\>';
			nn.setAttribute("style", "dispay:block!important;visibility:visible!important;height:20px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
			document.body.insertBefore(nn,document.body.firstChild);
			}
		});
	}
function isolate(u){
	u = u.split("\<guid\>")[1].split("\<\/guid\>")[0];
	return u;
}
function moreDate(m){
	var mm;
	if (m.search("Mon")!=-1) {mm = "Monday";}
	else if (m.search("Tue")!=-1) {mm = "Tuesday";}
	else if (m.search("Wed")!=-1) {mm = "Wednesday";}
	else if (m.search("Thu")!=-1) {mm = "Thursday";}
	else if (m.search("Fri")!=-1) {mm = "Friday";}
	else if (m.search("Sun")!=-1) {mm = "Sunday";}
	else if (m.search("Sat")!=-1) {mm = "Saturday";}
	return mm;
}
getDat("http://xml.nfowars.net/Alex.rss");
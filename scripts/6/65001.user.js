// ==UserScript==
// @name           Highlight Rapidshare + Megaupload links
// @namespace      +++
// @description    Highlights megaupload, rapidshare, hotfile & netload links
// ==/UserScript==




var theLinks = document.links;
for(i=0; i<theLinks.length; i++) {
   if(theLinks[i].href.toLowerCase().indexOf('http://rapidgator.net/file/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFDF80';
}
   if(theLinks[i].href.toLowerCase().indexOf('http://rapidshare.com/files/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#EAFF94';
}
   if(theLinks[i].href.toLowerCase().indexOf('http://hotfile.com/dl/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFFF94';
}
 if(theLinks[i].href.toLowerCase().indexOf('http://netload.in/date') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFD1F6';

}
 if(theLinks[i].href.toLowerCase().indexOf('http://www.fileserve.com/file/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#FFC4B3';
}
 if(theLinks[i].href.toLowerCase().indexOf('http://uploaded.net/file/') != -1) {
	theLinks[i].style.color = 'BLACK';
	theLinks[i].style.fontWeight =' bold';
	theLinks[i].style.backgroundColor = '#CCFFFF';

}
}




ancs = document.getElementsByTagName("a");
for(i=0;i<=ancs.length;i++){
if(ancs[i].innerHTML.match(/720p/gi)){
ancs[i].innerHTML = ancs[i].innerHTML.replace("720p", "<span style='color: #0000F5; background-color: white; font-weight:bold'>720p</span>");
}
} 





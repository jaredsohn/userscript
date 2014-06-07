// ==UserScript==
// @name           view tiff by google
// @include        *
// ==/UserScript==

function xpath(query) {
	 return document.evaluate(query, document, null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function urlreplace(thisImg,mark) {
	if (thisImg[mark] != undefined){
	if (thisImg[mark].indexOf("http")==0|thisImg[mark].indexOf("www")==0)
	thisImg[mark] = "http://docs.google.com/viewer?url="+thisImg[mark]+"&a=bi&pagenumber=1&.png";
	else
	thisImg[mark] = "http://docs.google.com/viewer?url="+window.location.href.substring(0,window.location.href.lastIndexOf("/")+1)+thisImg[mark]+"&a=bi&pagenumber=1&.png";
}
}

(function(){
	var allImgs, thisImg;
	allImgs = xpath("//*[translate(substring(@src,string-length(@src)-3,string-length(@src)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIF']|//*[translate(substring(@src,string-length(@src)-4,string-length(@src)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIFF']|//*[translate(substring(@data,string-length(@data)-3,string-length(@data)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIF']|//*[translate(substring(@data,string-length(@data)-4,string-length(@data)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIFF']|//*[translate(substring(@value,string-length(@value)-3,string-length(@value)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIF']|//*[translate(substring(@value,string-length(@value)-4,string-length(@value)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIFF']|//*[translate(substring(@href,string-length(@href)-3,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIF']|//*[translate(substring(@href,string-length(@href)-4,string-length(@href)),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')='.TIFF']");
	if (allImgs.snapshotLength){
	for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i);
	urlreplace(thisImg,"src");
	urlreplace(thisImg,"data");
	urlreplace(thisImg,"value");
	urlreplace(thisImg,"href");
}}})();

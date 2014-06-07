// ==UserScript==
// @name		SpitzboubenSkript
// @namespace		http://nachgeahmtes.blogspot.com/
// @description		Replaces the (awful) photographs of the bloggers on the German Spitzboubenblog (http://spitzbouben.blogspot.com/) with random images from a Yahoo search or images from a list respectively.
// @include		http://*spitzbouben.blogspot.com/*
// @include		http://www.blogger.com/profile*
// @include		https://www.blogger.com/comment*
// ==/UserScript==
// Version 1.3 (2013-8-4)

window.setRandomSrcFromArray = function(theImageTag, SrcArray) {
 theImageTag.lowsrc = theImageTag.src;
 theImageTag.src = SrcArray[Math.floor(Math.random()*(SrcArray.length))];
 window.setTimeout(function() { window.setRandomSrcFromArray(theImageTag, SrcArray) }, 120000);
}

window.setRandomSrcFromSearch = function(theImageTag,searchterms) {
 GM_xmlhttpRequest({
    method: "GET",
    url: "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + encodeURIComponent(searchterms) + "&tagmode=any&format=json&jsoncallback=?",
     onload: function(responseDetails) {
        var myObj = eval(responseDetails.responseText);
	try{
		var urls = myObj.items.map( function(v) {return v.media.m;} );
		window.setRandomSrcFromArray(theImageTag, urls);
	}
	catch(e){}
    }
 });
}

var allImgs = document.getElementsByTagName('img');

for (var i = 0; i < allImgs.length; i++) {
 switch (allImgs[i].src){
   case "http://bp0.blogger.com/_1UTrNwIt9O8/RaQEGLpyuyI/AAAAAAAAAAM/NtuRAIQZAPM/s200/20010929-Ausschnitt.jpg":
	allImgs[i].src = ""; allImgs[i].style.height = "auto";
	window.setRandomSrcFromSearch(allImgs[i], "Spitz");
	break;
   case "http://bp2.blogger.com/_jrEXRRl_zs4/RZ37DF_HFqI/AAAAAAAAAAM/_c_YRTHH0SI/s200/bou.JPG":
	allImgs[i].src = ""; allImgs[i].style.height = "auto";
	window.setRandomSrcFromSearch(allImgs[i], "Spitzbuben");
	break;
   case "http://bp1.blogger.com/_hhau79yZC3o/RZ9vGnRW7DI/AAAAAAAAAAY/tMTCYm7jwso/s200/erste_photos2007_0304(007).JPG":
	allImgs[i].src = ""; allImgs[i].style.height = "auto";
	window.setRandomSrcFromArray(allImgs[i], ["http://officeimg.vo.msecnd.net/en-us/images/MR900320360.jpg", "http://img202.imageshack.us/img202/5808/w3cj.jpg", "http://img534.imageshack.us/img534/6213/56l.gif", "http://img14.imageshack.us/img14/3853/p1h2.jpg"]);
 }
}
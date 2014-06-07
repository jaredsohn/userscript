// ==UserScript==
// @name           take2
// @namespace      sa web washer
// @description    zap die kaffer-wapper
// @include        http://www.take2.co.za
// ==/UserScript==

var kotsLap = [{
	image:"flagSA.gif",
	width: 19,
	height: 13
},{
	image:"img/flagbigSA.png",
	width: 56,
	height: 30
}];

window.addEventListener("load", function() {
	fix_me_bad();
}, false);


function fix_me_bad() {
    var images = document.getElementsByTagName("img");
    var image;
    for(var i=0; i<images.length; i++) {
        image = images[i];
        for(var j=0; j<kotsLap.length; j++) {
		var kl = kotsLap[j];
            if(image.src!=null && image.src.indexOf(kl.image) > 0) {
                image.src = "http://www.crwflags.com/fotw/images/z/za-1928.gif";
		    image.width = kl.width;
                image.heigth = kl.height;
            };
        }
    }
}


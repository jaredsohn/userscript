// ==UserScript==
// @name           MiiVerse Zoom Images
// @namespace      wombatus_urbanus
// @description    Enlarge Miiverse images on mouse over
// @include        https://miiverse.nintendo.net*
// @version        1.0
// @build          1
// @grant          none
// ==/UserScript==

/*
This is a Greasemonkey user script.
To install, you need Greasemonkey: http://www.greasespot.net/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.
To uninstall, go to Tools/Manage User Scripts,
select "miiverse_zoomimage.user.js", and click Uninstall.
*/

(function() {
	//add zoomhandler again if further data is dynamically loaded
   (function(open) {
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
//		unsafeWindow.console.log("open "+url)
        open.call(this, method, url, async, user, pass);
        this.addEventListener("readystatechange", function() {
            if (this.readyState == 4  &&  this.status == 200)  //-- Done, & status "OK".
				if (url.search(/^\/\?fragment=|^\/titles\//)!=-1) {
					setTimeout(addHandler,1000);
//					unsafeWindow.console.log("OK "+url);
				}
        }, false);
    };
   })(XMLHttpRequest.prototype.open);
	
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
    function addHandler() {
	var imgList = document.getElementsByTagName("img");
    var dbgcnt=0;
	for( i=0; i < imgList.length; i++) {
		var imgName = imgList[i].src;
		var s = imgName.search(/[^.]+\.cloudfront\.net\/(th|ss)\/.*$/);
		if( s != -1) {
			//make sure to add handler only once
			if (!imgList[i].getAttribute('data-zoomImage')) {
				dbgcnt++;
				imgList[i].setAttribute('data-zoomImage','1');
				imgList[i].addEventListener("mouseover",
					function(e){
						zoomImg.src="";
						var co=cumulativeOffset(this);
						var newX=co[0];
						var newY=co[1];
						var ow=this.width;
						var oh=this.height;
						zoomImg.src=this.src.replace(/\/th\//, "/ss/");
//						zoomImg.style.width="800px";
						zoomImg.style.height = "450px";
						zoomImg.style.position="absolute";
						zoomImg.style.zIndex='999';
//						unsafeWindow.console.log("img: "+ow+"/"+oh+" "+this.src);
						if (e.clientY>window.innerHeight/2) {
							zoomImg.style.top=(newY-450).toString() + 'px';
						} else {
							zoomImg.style.top=(newY+oh).toString() + 'px';
						}
						zoomImg.style.left=(newX+ow-800).toString() + 'px';
						document.body.appendChild(zoomImg);
					},false);
				imgList[i].addEventListener("mouseout",
					function(e){
						if (zoomImg)
							document.body.removeChild(zoomImg);
					},false);
			}
		}
	}
	//unsafeWindow.console.log("zoomImage added handler to "+dbgcnt+"/"+imgList.length+" images.");
	}
	
	var zoomImg = document.createElement("img");
	
	window.addEventListener("load", function(e) {
		addHandler();
  }, false);
})();

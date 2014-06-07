// ==UserScript==
// @name           Blocked Image Placeholder
// @namespace      http://userscripts.org/users/86496
// @description    Show image placeholder for blocked images.
// @include        *
// @version        1.03b
// ==/UserScript==


(function() {

window.addEventListener('load', function() {

var domains = [], colors = [];
var imgs = document.getElementsByTagName('img');

for (var i=0;i<imgs.length;i++) {
	// console.log(imgs[i].offsetWidth,imgs[i].offsetHeight,imgs[i].src);
	// console.log(/:\/\/(.+?)\//.exec(imgs[i].src)[1]);
	if (imgs[i].offsetWidth == 0 && imgs[i].offsetHeight == 0 && imgs[i].naturalWidth == 0 && imgs[i].naturalHeight == 0 && imgs[i].src) {
		var imgHost = /:\/\/(.+?)\//.exec(imgs[i].src)[1], imgInd = -1;
		for (j in domains) {if (imgHost == domains[j]) {var imgInd = j; break;}}
		if (imgInd < 0) {
			imgInd = domains.length;
			domains.push(imgHost);
			colors.push(Math.floor(Math.random()*190+50)+','+Math.floor(Math.random()*190+50)+','+Math.floor(Math.random()*190+50));
		}
		var holder = document.createElement('div');
		var box = holder.appendChild(document.createElement('div'));
		// var lable = holder.appendChild(document.createElement('div'));
		holder.setAttribute('style', 'display:inline-block;');
		box.setAttribute('style', 'background:rgb('+colors[imgInd]+');width:10px;height:10px;border:1px solid black;display:inline-block;');
		// lable.setAttribute('style', 'color:black;display:none;');
		// lable.innerHTML = imgHost;
		box.title = imgHost;
		// box.name = imgs[i].src;
		// box.addEventListener('mouseover', function(){this.nextSibling.style.display = 'inline-block'}, false);
		// box.addEventListener('mouseout', function(){this.nextSibling.style.display = 'none'}, false);
		imgs[i].parentNode.insertBefore(holder, imgs[i]);
	// console.log(imgInd,domains,colors);
	}
}

}, false);

	// function getX(oElement) {
		// var iReturnValue = 0;
		// while (oElement != null) {
			// iReturnValue += oElement.offsetLeft;
			// oElement = oElement.offsetParent;
		// }
		// return iReturnValue;
	// }

	// function getY(oElement) {
		// var iReturnValue = 0;
		// while (oElement != null) {
			// iReturnValue += oElement.offsetTop;
			// oElement = oElement.offsetParent;
		// }
		// return iReturnValue;
	// }

})();
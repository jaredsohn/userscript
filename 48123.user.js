// ==UserScript==
// @name           Liebesalarm picture preview
// @description    Vorschaubilder beim Überfahren Namen der aktuell angemeldeten Mitglieder
// @include        http://www.liebesalarm.de/*
// ==/UserScript==

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
   window.addEventListener("load", function(e) {
    	var hrefList = document.getElementsByTagName('a');
		for( i=0; i < hrefList.length; i++) {	
			var imgName = hrefList[i].href;
				if (imgName.match("profile") == "profile" ) {
				var newImg = document.createElement ('img');
			hrefList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0];
					newY=600;
					newImg.src='http://wanadoo.bildflirt.de/la/image/'+this.href.substring(34,46)+'.jpg';
					newImg.style.width = "150px";
					newImg.style.position="absolute";
					newImg.style.zIndex='999';
					newImg.style.top=(newY).toString() + 'px';
					newImg.style.left=(newX+150).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			hrefList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();
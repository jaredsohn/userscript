// ==UserScript==
// @author Socket462
// @name SpacePioneers Frame remover
// @description Removes Ads Frame from space pioneers
// @include http://*.space-pioneers.*main.shtml*
// ==/UserScript==
(function() {
	var frames = document.getElementsByTagName('frame');
	for(var i = 0; i < frames.length; i++){
		//alert(i.toString()+frames[i].name);
		if(frames[i].name.length==0){
			frames[i].parentNode.rows='*,0';
			frames[i].parentNode.removeChild(frames[i]);
		}
	}
})();

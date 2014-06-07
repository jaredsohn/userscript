// ==UserScript==
// @name        noSpacebarScroll
// @namespace   noSpacebarScroll
// @grant       none
// @include     *
// @version     1
// ==/UserScript==

document.onkeydown=function(e){
	if(e.keyCode==32){
		console.log("test");
		return false;
	}
}; 

/*
(function(){
	var space = ' '.charCodeAt(0);
	document.addEventListener('keypress', function(event){
		
		GM_log("This is an example of GM_log");
//	if (event.charCode == space) return false;
	//if (window.scrollY < window.scrollMaxY) return;
        //if (event.target.nodeName.match(/input|textarea|select/i)) return;

	}, true);
})();
*/

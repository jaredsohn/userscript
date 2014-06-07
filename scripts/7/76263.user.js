// ==UserScript==
// @name           Google Left Bar Floater
// @namespace      http://userscripts.org/users/86496
// @description    Float Google's left bar for your convenience.
// @include        http://www.google.*/*?*
// @version        1.2g
// ==/UserScript==

// changed to left bar floater; formerly Google Left Bar Minimizer
(function() {

var ccol = document.getElementById('center_col');
var leftnav = document.getElementById('leftnav');
if (!ccol || !leftnav) return;

var topY = getY(ccol);//console.log(topY);

document.addEventListener('scroll',function(){
	var setnewtop = function() {
		if (location.href.indexOf('/images?') == -1 && location.href.indexOf('&tbm=isch') == -1) {
			var newtop = (window.scrollY >= topY)? 0 : (topY-window.scrollY);
		} else if (leftnav.offsetTop !== topY){
			var newtop = topY
		}
		leftnav.style.top = newtop+'px';
		// leftnav.style.maxHeight = (window.innerHeight-newtop-4)+'px';
	};
	setTimeout(setnewtop, 20);
},false);
leftnav.addEventListener('DOMMouseScroll', leftscroll,false);
leftnav.addEventListener('mousewheel', leftscroll,false);

leftnav.setAttribute("style", 'position:fixed;top:'+topY+'px;padding-left:4px;padding-top:3px;width:160px;background:none!important;');//max-height:'+(window.innerHeight-topY-4)+'px;');

function leftscroll(evt) {
	if (leftnav.offsetHeight <= (window.innerHeight-topY-4)) return;
	evt.preventDefault();
	leftnav.style.top = (leftnav.offsetTop - evt.detail*10) + 'px';
//	console.log((leftnav.offsetHeight <= (window.innerHeight-topY-4)),leftnav.offsetTop - evt.detail);
	return false; //?
}

function getY(oElement) {
	var iReturnValue = 0;
	while (oElement != null) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

})();
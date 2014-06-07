(function (unsafeWindow) {
// ==UserScript==
// @name           TV Arsivi Resim Buyutme
// @namespace      tv.tvarsivi.resimbuyutme
// @description    TVArsivi.com'da listeleme sayfasındaki ufak resimlerin büyük boylarını üzerlerine fare ile gelince gösterir.
// @author         sanilunlu
// @version		   1.6.1
// 
// @include        http://*tvarsivi.com/?y=*
// @include        https://*tvarsivi.com/?y=*
// 
// ==/UserScript==

function addCss(cssString) { 
	var head = document.getElementsByTagName('head')[0]; 
	if(!head) return;
	var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
} 

addCss('.barlittle {\
	background-color:#2187e7;  \
	background-image: -moz-linear-gradient(45deg, #2187e7 25%, #a0eaff); \
	background-image: -webkit-linear-gradient(45deg, #2187e7 25%, #a0eaff);\
	border-left:1px solid #111; border-top:1px solid #111; border-right:1px solid #333; border-bottom:1px solid #333; \
	width:16%;\
	height:70%;\
	float:left;\
	margin-top:12%;\
	margin-left:3%;\
        opacity:0.1;\
	-moz-transform:scale(0.7);\
	-webkit-transform:scale(0.7);\
	-moz-animation:move 1s infinite linear;\
	-webkit-animation:move 1s infinite linear;\
}\
#block_1{\
 	-moz-animation-delay: .4s;\
	-webkit-animation-delay: .4s;\
 }\
#block_2{\
 	-moz-animation-delay: .3s;\
	-webkit-animation-delay: .3s;\
}\
#block_3{\
 	-moz-animation-delay: .2s;\
	-webkit-animation-delay: .2s;\
}\
#block_4{\
 	-moz-animation-delay: .3s;\
	-webkit-animation-delay: .3s;\
}\
#block_5{\
 	-moz-animation-delay: .4s;\
	-webkit-animation-delay: .4s;\
}\
@-moz-keyframes move{\
	0%{-moz-transform: scale(1.2);opacity:1;}\
	100%{-moz-transform: scale(0.7);opacity:0.1;}\
}\
@-webkit-keyframes move{\
	0%{-webkit-transform: scale(1.2);opacity:1;}\
	100%{-webkit-transform: scale(0.7);opacity:0.1;}\
}');

document.getElementById('endistablo').style.marginBottom = '300px';

var el = document.createElement('DIV');
el.innerHTML = '<div id="block_1" class="barlittle"></div><div id="block_2" class="barlittle"></div><div id="block_3" class="barlittle"></div><div id="block_4" class="barlittle"></div><div id="block_5" class="barlittle"></div>';
el.style.width = '400px';
el.style.height = '300px';
el.style.position = 'absolute';
el.style.display = 'none';
el.style.backgroundColor = 'black';
document.body.appendChild(el);

var imgs = document.querySelectorAll('table#distablo table table td a img');
var elcache = new Array(imgs.length);

for(var i = 0; i < imgs.length; i++) {
	if (imgs[i].width == 160) {
		elcache[i] = document.createElement('IMG');
		imgs[i].tagg = i;
		imgs[i].onmouseenter = function(e) {

		}
		imgs[i].onmousemove = function(e) {
			if (el.style.display == 'block') {
				el.style.top = e.pageY+5;
				el.style.left = e.pageX+5;
				el.tagg = this.tagg;
			} else {
				el.tagg = this.tagg;
				k = this.tagg;
				var lnk = imgs[k].parentElement.href;
				if(lnk.indexOf(':pac(') != -1)
					lnk = lnk.substring(lnk.indexOf(':pac(') + ':pac('.length + 1, lnk.lastIndexOf(')') - 1);
				else
					lnk = lnk.substring(lnk.indexOf('?') + 1);
				elcache[k].src = 'http://tvarsivi.com/resimver.php?' + lnk.replace(/ /g, '%20') + '&duvarkagidi&s=0&vidcoz=800x600';
				el.style.border = 'solid 2px white';
				el.innerHTML = '<div id="block_1" class="barlittle"></div><div id="block_2" class="barlittle"></div><div id="block_3" class="barlittle"></div><div id="block_4" class="barlittle"></div><div id="block_5" class="barlittle"></div>';
				el.style.display = 'block';
				elcache[k].alt = k;
				elcache[k].onload = function(ell) {
					if(el.tagg == this.alt)
						el.innerHTML = '<img src="' + this.src + '" height="300px" width="400px"/>'
						//el.src = this.src;
				};
			}
		};
		imgs[i].onmouseout = function() {
			el.style.display = 'none';
		}
	}
}

})(window);
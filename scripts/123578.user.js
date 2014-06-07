// ==UserScript==
// @name   Photobucket in page zoom with full image load and download link
// @namespace  5789895423
// @include *.photobucket.com*
// ==/UserScript==

var script = document.createElement('script');
script.type= 'text/javascript';
script.innerHTML = '\nvar zImg = null;\nvar nFad = 0;\nfunction zoomUrl(u) {\n	ni = new Image();\n	ni.src = u;\n	zoomImg(ni);\n}\nfunction zoomImg(e) {\n	de = document.documentElement ? document.documentElement : document.body;\n	wW = de.clientWidth || window.innerWidth-18;\n	wH = de.clientHeight || window.innerHeight-18;\n	noPrev = zImg ? false : true;\n	if(noPrev) zImg = new Image();\n	zImg.src = e.src;\n	zImg.style.opacity = 0;\n	zImg.style.zIndex = 999999;\n	zImg.style.position = "fixed";\n	zImg.style.cursor = "-moz-zoom-out";\n	if(zImg.width) {\n		zoom = Math.min(1, (wW-8)/e.width, (wH-8)/e.height);\n		zImg.width = Math.round(zoom*e.width);\n		zImg.height = Math.round(zoom*e.height);\n		zImg.style.top = Math.round((wH-zImg.height)/2)+"px";\n		zImg.style.left = Math.round((wW-zImg.width)/2)+"px";\n	}\n	fade = 500;\n	tick = 50;\n	zImg.onclick = Function(\'cF=++nFad; for(i = 0; i < fade; i += tick) setTimeout("if(cF==nFad) zImg.style.opacity=" + (1-i/fade), i); setTimeout("if(cF==nFad) {zImg.style.opacity=0;de.removeChild(zImg);zImg=null}", fade)\');\n	if(noPrev) de.appendChild(zImg);\n	cFad = ++nFad;\n	for(i = 0; i <= fade; i += tick) setTimeout("if(cFad==nFad) zImg.style.opacity=" + (i/fade), i);\n}\n';
document.getElementsByTagName('head')[0].appendChild(script);

for(i = 0; (cur = document.getElementById('thumbnail_' + i)); i++) {
	cur.getElementsByTagName('label')[0].setAttribute('class', 'outline');
	curImg = cur.getElementsByTagName('img')[0];
	curImg.style.cursor = '-moz-zoom-in';
	hImg = new Image();
	hImg.src = curImg.src.replace('th_', '');
	hImg.style.display = 'none';
	curImg.setAttribute('onclick', "zoomUrl('" + hImg.src + "')");
	cur.appendChild(curImg);
	cur.innerHTML = cur.innerHTML + '<br /><a class="title" href="' + hImg.src + '">link</a>';
	cur.appendChild(hImg);
}


// ==UserScript==
// @name          Zeroboard Fix
// @description   simple script that display member info layer for zeroboard
// @include       http://*/zboard.php*
// @include       http://*/view.php*
// ==/UserScript==

_ZBScript = document.createElement('script');
_ZBScript.setAttribute('type', 'text/javascript');
_ZBScript.appendChild(document.createTextNode('var _x,_y; document.onmousedown=getmouse; function getmouse(e) { _x=e.clientX;_y=e.clientY; }'));
_ZBScript.appendChild(document.createTextNode('function _ZB_layerAction(name, status) { obj=document.getElementById(name); bdy=document.getElementsByTagName(\'body\').item(0); _tmpx=_x+parseInt(obj.offsetWidth); _tmpy=_y+parseInt(obj.offsetHeight); _marginx=bdy.clientWidth - _tmpx; _marginy=bdy.clientHeight - _tmpy; if(_marginx < 0) _tmpx=_x+bdy.scrollLeft+_marginx ; else _tmpx=_x+bdy.scrollLeft ; if(_marginy < 0) _tmpy=_y+bdy.scrollTop+_marginy+20; else _tmpy=_y+bdy.scrollTop ; obj.style.left=_tmpx-13; obj.style.top=_tmpy-12; if (status == \'visible\') { if (select_obj) { select_obj.style.visibility=\'hidden\'; select_obj=null; } select_obj=obj; } else { select_obj=null; } obj.style.visibility=status; }'));
document.getElementsByTagName('head').item(0).appendChild(_ZBScript);

el = document.getElementsByTagName('span');
for (i = 0; i < el.length; i++) {
	attr = el[i].getAttribute('onmousedown');
	if (attr && attr.substr(0,23) == 'ZB_layerAction(\'zbLayer') {
		el[i].removeAttribute('onmousedown');
		el[i].setAttribute('onclick', '_'+attr);
		el[i].setAttribute('style', 'cursor:pointer;');
	}
}


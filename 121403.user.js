
// ==UserScript==
// @name	Disable Google Rewrite
// @author	ZhuShunqing
// @namespace	http://flashman.com.cn
// @description	Disable Google Rewrite, For G%F*W, You Know.
// @version	0.11
// @include https://www.google.*search*q=*
// @include http://www.google.*search*q=*
// ==/UserScript==

//window.addEventListener('load', function(){
	setInterval(function(){
		var rs = document.getElementsByClassName('l'), pr = null;
		if(rs){
			while(rs.length > 0){
				var a = document.createElement('a');
				with(a){
					href = rs[0].href;
					title = 'Google Rewrite Disabled.';
					innerHTML = rs[0].innerHTML;
					target = '_blank';
				}
				pr = rs[0].parentNode;
				pr.insertBefore(a, rs[0]);
				pr.removeChild(rs[0]);
			}
		}
	}, 100);
//});
// ==UserScript==
// @name           Google Anywhere!
// @namespace      http://as-if.cn
// @description    让谷歌搜索框无处不在!
// @include        *
// ==/UserScript==
window.addEventListener('load', initPageJian, false);
function initPageJian(){
	var googleSearchFormJian = document.createElement('form');
	googleSearchFormJian.action = "http://www.google.com/search";
	googleSearchFormJian.target = "_blank";
	
	var googleSearchSubmitJian = document.createElement('input');
	googleSearchSubmitJian.type = "submit";
	googleSearchSubmitJian.style.display = 'none';
	
	var googleSearchBoxJian = document.createElement('input');
	googleSearchBoxJian.name = 'q';
	googleSearchBoxJian.type = 'text';
	googleSearchBoxJian.style.display = 'none';
	googleSearchBoxJian.style.position = "fixed";
        googleSearchBoxJian.style.zIndex = "999";
	googleSearchBoxJian.style.top = "1px";
	googleSearchBoxJian.style.left = "20px";

	var googleSearchImgJian = document.createElement('img');
	googleSearchImgJian.style.position = "fixed";
        googleSearchImgJian.style.zIndex = "999";
        googleSearchImgJian.style.width = "16px";
        googleSearchImgJian.style.height = "16px";
	googleSearchImgJian.style.top = "2px";
	googleSearchImgJian.style.left = "2px";
	googleSearchImgJian.src = "http://www.google.com/tools/toolbar/buttons/icon?xmlurl=http://www.google.com";
	googleSearchImgJian.addEventListener('mouseover', function(){
	    googleSearchBoxJian.style.display = '';
	    googleSearchBoxJian.select();
	}, false);
	googleSearchBoxJian.addEventListener('blur', function(){
	    this.style.display = 'none';
	},false);
	document.getElementsByTagName('body')[0].appendChild(googleSearchFormJian);
	googleSearchFormJian.appendChild(googleSearchSubmitJian);
	googleSearchFormJian.appendChild(googleSearchBoxJian);
	document.getElementsByTagName('body')[0].appendChild(googleSearchImgJian);
}
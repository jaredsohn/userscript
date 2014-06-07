// ==UserScript==
// @name           Hyphenator
// @namespace      http://dmalinovsky.livejournal.com/
// @description    Hyphenates page text using excellent library at http://hyphenator.googlecode.com/
// ==/UserScript==

var head=document.getElementsByTagName('head').item(0);
var html=document.getElementsByTagName('html').item(0);
var lang = html.getAttribute('xml:lang');
if (lang != '' && lang != null) {
	html.lang = lang;
} else if (html.lang == '') {
	html.lang = 'ru';
}
html.lang = html.lang.substr(0, 2);
var script=document.createElement('script');
script.src='http://hyphenator.googlecode.com/svn/tags/Version%202.4.0/Hyphenator.js?bm=true';
script.type='text/javascript';
head.appendChild(script);
var el=document.getElementsByTagName('body')[0].getElementsByTagName('p');
if(el.length){
	for(i=0;i<el.length;i++){
		if(document.defaultView.getComputedStyle(el[i],null).getPropertyValue('text-align')!='justify'&&document.defaultView.getComputedStyle(el[i],null).getPropertyValue('text-align')!='right'&&document.defaultView.getComputedStyle(el[i],null).getPropertyValue('text-align')!='center'){
			el[i].style.textAlign='justify';
		}
	}
}

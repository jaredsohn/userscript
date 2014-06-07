// ==UserScript==
// @name        4Chan RIS
// @namespace   Crazycatz00
// @match       *://*.4chan.org/*
// @version     1.0.0
// @grant       none
// ==/UserScript==
(function(){'use strict';
	/* 4chan supports [https://github.com/4chan/4chan-API]: jpg png gif pdf swf webm */
	var sites={
		'IQDB':['http://iqdb.org/?url=','jpg png gif'],
		//'Google':['//www.google.com/searchbyimage?image_url=','jpg png gif'],
		'Sauce':['//saucenao.com/search.php?url=','jpg png gif'],
		'EXIF':'http://RegEx.info/exif.cgi?url='
	},
	addRISLink=function(m){
		var a=m.querySelector('a[href]'),e=false,s,l,k;
		if(!a||(a=encodeURIComponent(a.href)).length===0){return;}
		if(a.search(/\.([^\.]{1,4})$/)!==-1){e=RegExp.$1.toLowerCase().replace(/jpeg/i,'jpg');}
		s=document.createElement('span');
		for(k in sites){
			l=document.createElement('a');
			if(typeof sites[k]==='string'){
				l.href=sites[k]+a;
			}else if(typeof sites[k][0]==='string'){
				if(e!==false&&(typeof sites[k][1]==='string'&&sites[k][1].indexOf(e)===-1)||(typeof sites[k][2]==='string'&&sites[k][2].indexOf(e)!==-1)){continue;}
				l.href=sites[k][0]+a;
			}else{continue;}
			l.style.cssText='margin-left:.5em;';
			l.target='_blank';
			l.textContent='['+k+']';
			s.appendChild(l);
		}
		m.appendChild(s);
	},
	addRISLinks=function(r){for(var l=r.getElementsByClassName('fileText'),i=0,j=l.length;i<j;++i){addRISLink(l[i]);}},
	nodeInserted=function(e){if(e.target.classList.contains('postContainer')&&(e=e.target.getElementsByClassName('fileText')).length!==0){addRISLink(e[0]);}},
	init=function(){
		var e=document.querySelector('div.thread')||document.body;
		addRISLinks(e);
		e.addEventListener('DOMNodeInserted',nodeInserted,false);
	};
	init();
}());
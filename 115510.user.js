// ==UserScript==
// @name t.co link killer
// @version 1.0.9.6
// @include https://twitter.com/*
// @include http://twitter.com/*
// @include https://api.twitter.com/*
// @include http://api.twitter.com/*
// ==/UserScript==
setInterval(function() {
	var tcolinks=document.getElementsByTagName("a");
	i=0;
	while (i<tcolinks.length){
		tco=tcolinks[i];
		if (tco.className=='twitter-timeline-link'){
			if (tco.title != ""){
				real=tco.title;
				}else if (tco.getAttribute('original-title') !=''){
				real=tco.getAttribute('original-title');
				}else{
				real=tco.getAttribute('data-expanded-url');
				}
			if(real.substr(-5)=="html/"){
				real=real.substr(0,real.length-1);
				}
			if(real.substr(-4)=="htm/"){
				real=real.substr(0,real.length-1);
				}
			if(real.substr(0,11)=="http://j.mp"){
				real='https://bit.ly'+real.substr(11,real.length-11);
				}
			tco.href=real;
			tco.className='twitter-timeline-link killed';
			}
		i++;
		}},2500);
// ==UserScript==
// @name          Youtube view formatter
// @namespace     woutske
// @description   Makes youtube views nicer to read (100,000,000).
// @website		  htpp://www.woutwo.nl/
// @match         http://youtube.com/*
// @match         http://www.youtube.com/*
// @match         https://youtube.com/*
// @match         https://www.youtube.com/*
// @version       1.0
// ==/UserScript==

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2 + ' views';
}

/*Search queries*/
var el    = document.getElementsByClassName('viewcount');
var views = "";
for(i=0;i<el.length;i++){ 
	views = el[i].innerHTML.replace(/[^\d]/g,"");
	el[i].innerHTML= addCommas(views);
} 

/*Recommended vids*/
var el    = document.getElementsByClassName('view-count');
var views = "";
for(i=0;i<el.length;i++){ 
	views = el[i].innerHTML.replace(/[^\d]/g,"");
	el[i].innerHTML= addCommas(views);
} 

/*Recommended 2 vids*/
var el    = document.getElementsByClassName('video-view-count');
var views = "";
for(i=0;i<el.length;i++){ 
	views = el[i].innerHTML.replace(/[^\d]/g,"");
	el[i].innerHTML= addCommas(views);
} 

/*Recommended vids - 2*/
var el    = document.getElementsByClassName('facets');
var views = "";
for(i=0;i<el.length;i++){ 
	childs= el[i].getElementsByTagName('strong');
	if(childs.length > 0){
		views = childs[0].innerHTML.replace(/[^\d]/g,"");
		childs[0].innerHTML= addCommas(views);
	}
} 

/*Underneath player*/
var el    = document.getElementsByClassName('watch-view-count');
var views = "";
for(i=0;i<el.length;i++){ 
	childs= el[i].getElementsByTagName('strong');
	views = childs[0].innerHTML.replace(/[^\d]/g,"");
	childs[0].innerHTML= addCommas(views);
} 
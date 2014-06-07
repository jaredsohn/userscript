// ==UserScript==
// @name           Hacker Hues
// @namespace      http://www.jacoblyles.com/
// @description    Quality codes Hacker News stories
// @include        http://news.ycombinator.com/
// @include        http://news.ycombinator.com/news
// ==/UserScript==


(function(){

    //color codes and limits 
    var bad = new Object();
    var good = new Object();
    var great = new Object();
    var cats = [bad, good, great];
    
    bad.min = -Infinity;
    bad.max = 1;
    good.min = 2;
    good.max = 5;
    great.min = 5;
    great.max = Infinity;

    bad.bgColor =  "#FF0044";
    bad.fontColor = "#FFFF66";
    good.bgColor =  "#336633";
    good.fontColor = "#FFFF66";
    great.bgColor =  "#FFFF66";
    great.fontColor = "#0066CC";

    
    var lookup = function(ratio){
	for(var ii=0; ii<cats.length; ii++){
	    var cat = cats[ii];
	    if(ratio < cat.max && ratio > cat.min){
		return cat;
	    }
	}
    }


    var trs = document.getElementsByTagName('tr');
    
    for (var ii =0; ii<trs.length; ii++){
	if(trs[ii].firstElementChild && 
	   trs[ii].firstElementChild.className == "title" 
	   && ii + 1 < trs.length)
	{
	    var score = trs[ii+1].lastElementChild.firstElementChild.innerHTML.match(/^[0-9]+/);
	    var comments = trs[ii+1].lastElementChild.lastElementChild.innerHTML.match(/^[0-9]+/);
	    var ratio = comments > 0 ? score / comments : 5;
	    var cat = lookup(ratio);
	    if(cat){
		trs[ii].firstElementChild.style.backgroundColor =  cat.bgColor;
		trs[ii].firstElementChild.style.color =  cat.fontColor;
	    }
	}
    }

    
})();
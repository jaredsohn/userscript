// ==UserScript==
// @name           Size and color of rating according to it, no Zero
// @namespace      ryotsuke
// @description    Увеличивает размер и меняет цвет шрифта оценки в зависимости от рейтинга. Делает оценку O белой.
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// @include        http://dirty.ru/comments/*
// ==/UserScript==

var time = (new Date()).getTime();
var divs = document.querySelectorAll("div.post div.vote>div>span>em");
var divslen = divs.length;
var comment;
var rating;
var notPost = false;
var good_limit = 300;
for(var i = 0; i < divslen; i++) {
      comment = divs[i];			           
			rating = getRating(comment);			
			if ((rating>good_limit*2))
				comment.style.color = "#0000"+d2h(rating);
			if ((rating>good_limit) && (rating<good_limit*2))
				comment.style.color = "#00"+d2h(good_limit*2-rating-1)+d2h(rating);
			if (rating>0 && rating<=good_limit)
				comment.style.color = "#00"+d2h(rating)+"00";
			if (rating<0 && rating >=-good_limit)
				comment.style.color = "#"+d2h(rating)+"0000";
			if (rating<-good_limit)
				comment.style.color = "#ff0000";
			if (rating==0)
				comment.style.color = "#ffffff";
			if(rating<0) rating=0;
			comment.style.fontSize = Math.min(16,9+2*Math.log(Math.abs(rating)+1)) + "px";
      if(rating>1000) {
        comment.parentNode.style.width="52px";
      }
	    
}

function getRating(div) {
	var r = div.innerHTML;
	return parseInt(r, 10);
}

function d2h(d) {d=Math.abs(d); d=d%good_limit; d=good_limit/4+3*d/4; d=Math.round(256*d/good_limit); var str=d.toString(16); if (str.length==2) return str; else return "0"+str;}


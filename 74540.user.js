// ==UserScript==
// @name           Симпы и лафки
// @author         http://leprosorium.ru/users/antyrat
// @namespace      http://leprosorium.ru/
// @description    Добавляет индикацю сильно заминусованным и заплюсованным но не золотым постам
// @include        http://leprosorium.ru/
// @include        http://*.leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://*.leprosorium.ru/pages/*
// @include        http://lepra.ru/
// @include        http://*.lepra.ru/
// @include        http://lepra.ru/pages/*
// @include        http://*.lepra.ru/pages/*
// ==/UserScript==

	//http://javascript.about.com/library/bldom08.htm
	if (!document.getElementsByClassName){
		document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
		}; 
	}

	var ratingBlocks = document.getElementsByClassName('rating');
	for(var i=0; i<ratingBlocks.length;i++) {
		var im="<img src='http://www.hotelconnect.co.uk/images/star.gif'>";
		var rating = parseInt(ratingBlocks[i].childNodes[0].innerHTML);
		if(rating<0) {
			rating = -1 * rating;
			im="<img src='http://muslib.ru/files/vote_bad2.gif'>&nbsp;";
		}
		rating = Math.floor(rating/100);
		if(rating>6)rating=6;
		var posts = ratingBlocks[i].parentNode.parentNode.parentNode.getElementsByTagName('div');
		var post=null;
		for(var j=0; j<posts.length;j++) {
			if(posts[j].className=='p') post=posts[j];
		}
		var s="";
		for(var j=0;j<rating; j++) {
			s+=im;
		}
		if (post!=null && post.innerHTML.indexOf('class="stars"')<0 && post.innerHTML.indexOf('class="wasstars"')<0) {
			var gold = document.createElement('span');
			gold.className='stars';
			gold.innerHTML = s;
			post.insertBefore(gold,post.getElementsByTagName('span')[0].nextSibling);
			
		}		
	}	
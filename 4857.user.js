// ==UserScript==
// @name           Count StumbleUpon Likes
// @namespace      http://thlayli.detrave.net/countlikes.html
// @description    Adds number of Likes to Prefs and About on StumbleUpon.com
// @include        http://*.stumbleupon.com/about/
// @include        http://*.stumbleupon.com/prefs/*
// @version        1.2
// ==/UserScript==

if(document.location.href.indexOf("prefs") != -1){
	var textareas = unsafeWindow.document.getElementsByTagName("textarea");
	for(i=0;i<textareas.length;i++){
		if(textareas[i].name.indexOf("text") != -1){
			textareas[i].value = textareas[i].value.substr(0,textareas[i].value.length-1);
			areaCount(textareas[i]);
			textareas[i].onkeydown = areaCount;
			textareas[i].onblur = areaCount;
		}
	}
}else{
	rows = document.getElementsByTagName('tr');
	for(i=0;i<rows.length;i++){
		sectionTitle = rows[i].textContent.substr(1,6);
		if(sectionTitle=='Things'&&!music){
			var likes = rows[i].nextSibling;
			// Stumbleupon Likes Linker fix
			if(likes.firstChild.firstChild.host == 'www.google.com'){
				var google = 5;
			}else{
				var google = 4;
			}
			var likesCount = (likes.firstChild.childNodes.length + 1) / google;
			likes.previousSibling.firstChild.firstChild.nextSibling.innerHTML = '<span class="bold">'+likesCount+'</span> Things I like';
		}
		if(sectionTitle==' Music'&&!music){
			var music = rows[i].nextSibling;
			var musicTable = music.firstChild.firstChild.firstChild.firstChild.firstChild;
			if(musicTable.childNodes.length > 0){
				// Stumbleupon Likes Linker fix
				if(musicTable.firstChild.nextSibling.host == 'www.last.fm'){
					var lastfm = 6;
				}else{
					var lastfm = 5;
				}
				var musicCount = musicTable.childNodes.length;
				var musicCol = 1;
			}
			if(musicTable.nextSibling && musicTable.nextSibling.childNodes.length > 0){
				musicCount += musicTable.nextSibling.childNodes.length;
				musicCol++;
			}
			if(musicTable.nextSibling.nextSibling && musicTable.nextSibling.nextSibling.childNodes.length > 0){
				musicCount += musicTable.nextSibling.nextSibling.childNodes.length;
				musicCol++;
			}
			if(musicTable.nextSibling.nextSibling.nextSibling && musicTable.nextSibling.nextSibling.nextSibling.childNodes.length > 0){
				musicCount += musicTable.nextSibling.nextSibling.nextSibling.childNodes.length;
				musicCol++;
			}
			musicCount = (musicCount + musicCol) / lastfm;
			music.previousSibling.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = '<span class="bold">'+musicCount+'</span> Music';
		}
		if(sectionTitle==' Books'&&!books){
			var books = rows[i].nextSibling;
			var booksTable = books.firstChild.firstChild.firstChild.firstChild.firstChild;
			if(booksTable.childNodes.length > 0){
				// Stumbleupon Likes Linker fix
				if(booksTable.firstChild.nextSibling.host == 'www.amazon.com'){
					var amazon = 6;
				}else{
					var amazon = 5;
				}
				var booksCount = booksTable.childNodes.length;
				var booksCol = 1;
			}
			if(booksTable.nextSibling && booksTable.nextSibling.childNodes.length > 0){
				booksCount += booksTable.nextSibling.childNodes.length;
				booksCol++;
			}
			if(booksTable.nextSibling.nextSibling && booksTable.nextSibling.nextSibling.childNodes.length > 0){
				booksCount += booksTable.nextSibling.nextSibling.childNodes.length;
				booksCol++;
			}
			if(booksTable.nextSibling.nextSibling.nextSibling && booksTable.nextSibling.nextSibling.nextSibling.childNodes.length > 0){
				booksCount += booksTable.nextSibling.nextSibling.nextSibling.childNodes.length;
				booksCol++;
			}
			booksCount = (booksCount + booksCol) / amazon;
			books.previousSibling.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = '<span class="bold">'+booksCount+'</span> Books';
		}
		if(sectionTitle==' Movie'&&!movies){
			var movies = rows[i].nextSibling;
			var moviesTable = movies.firstChild.firstChild.firstChild.firstChild.firstChild;
			if(moviesTable.childNodes.length > 0){
				// Stumbleupon Likes Linker fix
				if(moviesTable.firstChild.nextSibling.host == 'www.imdb.com'){
					var imdb = 6;
				}else{
					var imdb = 5;
				}
				var moviesCount = moviesTable.childNodes.length;
				var moviesCol = 1;
			}
			if(moviesTable.nextSibling && moviesTable.nextSibling.childNodes.length > 0){
				moviesCount += moviesTable.nextSibling.childNodes.length;
				moviesCol++;
			}
			if(moviesTable.nextSibling.nextSibling && moviesTable.nextSibling.nextSibling.childNodes.length > 0){
				moviesCount += moviesTable.nextSibling.nextSibling.childNodes.length;
				moviesCol++;
			}
			if(moviesTable.nextSibling.nextSibling.nextSibling && moviesTable.nextSibling.nextSibling.nextSibling.childNodes.length > 0){
				moviesCount += moviesTable.nextSibling.nextSibling.nextSibling.childNodes.length;
				moviesCol++;
			}
			moviesCount = (moviesCount + moviesCol) / imdb;
			movies.previousSibling.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = '<span class="bold">'+moviesCount+'</span> Movies';
		}
		if(sectionTitle.substr(0,3)==' TV'&&!tv){
			var tv = rows[i].nextSibling;
			var tvTable = tv.firstChild.firstChild.firstChild.firstChild.firstChild;
			if(tvTable.childNodes.length > 0){
				// Stumbleupon Likes Linker fix
				if(moviesTable.firstChild.nextSibling.host == 'www.imdb.com'){
					var imdb = 6;
				}else{
					var imdb = 5;
				}			
				var tvCount = tvTable.childNodes.length;
				var tvCol = 1;
			}
			if(tvTable.nextSibling && tvTable.nextSibling.childNodes.length > 0){
				tvCount += tvTable.nextSibling.childNodes.length;
				tvCol++;
			}
			if(tvTable.nextSibling.nextSibling && tvTable.nextSibling.nextSibling.childNodes.length > 0){
				tvCount += tvTable.nextSibling.nextSibling.childNodes.length;
				tvCol++;
			}
			if(tvTable.nextSibling.nextSibling.nextSibling && tvTable.nextSibling.nextSibling.nextSibling.childNodes.length > 0){
				tvCount += tvTable.nextSibling.nextSibling.nextSibling.childNodes.length;
				tvCol++;
			}
			tvCount = (tvCount + tvCol) / imdb;
			tv.previousSibling.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.innerHTML = '<span class="bold">'+tvCount+'</span> TV';
		}
	}
}

function areaCount(tgt){
	elem = (tgt.target) ? tgt.target : tgt;
	var likeString;
	var lineCount = substrCount("\n",elem.value);
	if(lineCount < 63){
		lineText = "lines";
		if(63 - lineCount == 1)
			var lineText = "line";
		likeString = (63 - lineCount) + " available " + lineText;
	}else{
		if(lineCount == 63){
			likeString = "All 63 lines used";
		}else{
			likeString = '<span style="color: red;">Too many lines used!</span>';
		}
	}
	elem.previousSibling.previousSibling.previousSibling.innerHTML =  likeString;
}

function substrCount(needle,haystack){
	var index = 0;
	var count = 0;
	while(index != -1 && index != haystack.length){
		count++;
		index = haystack.indexOf(needle,index+1);
	}
	return count;
}
// ==UserScript==
// @name		MangaPro
// @namespace		http://userscripts.org/scripts/show/98298
// @description		MangaPro is designed to load all pages of a chapter vertically aligned when reading manga on MangaEden and TheSpectrum (TheSpectrum disabled for now)
// @copyright		2012, Metin Kul
// @include		http*://www.mangaeden.com/*
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version		1.6
// ==/UserScript==

currentURL = document.URL.split('/');

switch(currentURL[2]){
	case "www.mangaeden.com":
		alt_pages = document.getElementById('top2').getElementsByTagName('a');
		pages = new Array();
		if(alt_pages[0].innerHTML == '<span class="prev">Prev</span>') {
			previous = alt_pages[0];
			for(i = 0; i < alt_pages.length-1; i++) {
				pages[i] = alt_pages[i+1];
			}
		}else{
			pages = alt_pages;
		}
		if(pages[0].getAttribute('href') == ''){
			pageCount = pages.length;
			currentLanguage = currentURL[3];
			currentManga = currentURL[4];
			currentChapter = currentURL[5];
			chapters = document.getElementById('combobox').getElementsByTagName('option');
			thisChapter = 0;
			chapterCount = chapters.length;
			for(i = 0; i < chapterCount; i++){
				if(chapters[i].innerHTML == currentChapter){
					thisChapter = i;
				 	i = chapterCount;
				 } 
			}
			if(thisChapter > 0){
				nextChapter = 'http://www.mangaeden.com/'+currentLanguage+'/'+currentManga+'/'+chapters[thisChapter-1].innerHTML;
			}else{
				nextChapter = 'http://www.mangaeden.com/mymanga/';
			}
			if(thisChapter+1 < chapterCount){
				previous.setAttribute('href', 'http://www.mangaeden.com/'+currentLanguage+'/'+currentManga+'/'+chapters[thisChapter+1].innerHTML);
			}
			pages[pageCount-1].setAttribute('href', nextChapter);
			imageBox = document.getElementById('imageBox');
			mainImg = document.getElementById('mainImg');
			imageBox.setAttribute('style', 'margin: 0; padding: 0;');
			imageBox.innerHTML = '<br />';
			images = new Array();
			urls = pages;
			for(i = 0; i < pageCount-1; i++){
				images[i] = document.createElement('img');
				images[i].setAttribute("id", (i+1));
				images[i].setAttribute("alt", 'reload if page '+(i+1)+' does not load');
				images[i].setAttribute('style', 'max-width: 100%; min-width: 200px; min-height:200px; background: red;');
				if(i == 0){
					imageSrc = mainImg.getAttribute('src');
					images[i].setAttribute("src", imageSrc);
					link = document.createElement('a');
					link.setAttribute('href', nextChapter);
					link.appendChild(images[i]);
					imageBox.appendChild(link);
					imageBox.appendChild(document.createElement('br'));
					pages[i].setAttribute('href', '#'+(i+1));
				}
				if(i == 1){
					imageSrc = mainImg.getAttribute('onload');
					imageSrc = imageSrc.substr(imageSrc.indexOf("nextimg.src = '")).replace("nextimg.src = '", '');
					imageSrc = imageSrc.substring(0, imageSrc.indexOf("'"));
					images[i].setAttribute("src", imageSrc);
					link = document.createElement('a');
					link.setAttribute('href', nextChapter);
					link.appendChild(images[i]);
					imageBox.appendChild(link);
					imageBox.appendChild(document.createElement('br'));
					pages[i].setAttribute('href', '#'+(i+1));
				}
			}
			for(i = 2; i < pageCount-1; i++){
				req = new XMLHttpRequest();
				req.open("GET", 'http://www.mangaeden.com'+urls[i].getAttribute('href'), false);
    			req.send(null);
				if(req.status == 200){
					imageTemp = req.responseText.substr(req.responseText.indexOf('mainImg" src="')).replace('mainImg" src="', '');
					imageSrc = imageTemp.substring(0, imageTemp.indexOf('"'));
					images[i].setAttribute("src", imageSrc);
					pages[i].setAttribute('href', '#'+(i+1));
					link = document.createElement('a');
					link.setAttribute('href', nextChapter);
					link.appendChild(images[i]);
					imageBox.appendChild(link);
					imageBox.appendChild(document.createElement('br'));				
					if(i <= pageCount-3){
						i++;
						imageTemp = req.responseText.substr(req.responseText.indexOf("nextimg.src = '")).replace("nextimg.src = '", '');
						imageSrc = imageTemp.substring(0, imageTemp.indexOf("'"));			
						images[i].setAttribute("src", imageSrc);
						pages[i].setAttribute('href', '#'+(i+1));
						link = document.createElement('a');
						link.setAttribute('href', nextChapter);
						link.appendChild(images[i]);
						imageBox.appendChild(link);
						imageBox.appendChild(document.createElement('br'));
					}
				}
			}
			imageBox.innerHTML += '<div class="hint"><b>Hint</b>: click on an image to go to the next chapter</div>';
		}
	break;
	case "view.thespectrum.net":
		/*
		if(!get_GET_param('page')){
			imageURL = document.getElementById('mainimage').getAttribute('src');
			imageURLSplit = imageURL.split('.');
			imageURLStart = imageURLSplit[0];
			imageURLEnding = imageURLSplit[1];
			imageURLtemp = imageURLStart.split('_');
			imageURLtemp.pop();
			imageURLStart = imageURLtemp.join('_');
			imageBox = document.getElementById('mainimage').parentNode.parentNode;
			pages = document.getElementsByName('page')[0].getElementsByTagName('option');
			pageCount = pages.length;
			for(i = 1; i < pageCount; i++){
				number = pages[i].innerHTML.replace(/ /g, '');
				for(a = number.length; a < 3; a++){
					number = "0"+number;
				}
				image = 'http://view.thespectrum.net'+imageURLStart+'_'+number+'.'+imageURLEnding;
				imageBox.innerHTML += '<br /><img src="'+image+'" style="max-width: 100%;" />';
			}
		}*/
	break;
}

function get_GET_params() {
	var GET = new Array();
	if(location.search.length > 0) {
		var get_param_str = location.search.substring(1, location.search.length);
		var get_params = get_param_str.split('&');
		for(i = 0; i < get_params.length; i++) {
			var key_value = get_params[i].split('=');
			if(key_value.length == 2) {
	    		var key = key_value[0];
	        	var value = key_value[1];
	        	GET[key] = value;
			}
		}
	}
	return(GET);
}
function get_GET_param(key) {
	var get_params = get_GET_params();
	if(get_params[key]) {
		return(get_params[key]);
	} else {
		return false;
	}
}
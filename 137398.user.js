// ==UserScript==
// @name        Кинопоиск :: Расширение для РуТреккера
// @namespace   Constantine
// @include     http://www.kinopoisk.ru/*
// @include     http://kinopoisk.ru/*
// @grant       none
// @version     1.1
// ==/UserScript==

(function(){
	try {
		var ico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHGggCHa3WoeEAAAJ0SURBVDhPjZJNSJNxHMc/z/bAprOZs5aP0xH5LMXEPHQRbTOQpBUKnaTwkB7qYgRCRnTo6MEIxC5StAIJu4xeIMjDQjBECk0wfMH15GLw+OgK3RrsxX+Hcmov2Of6+34//Pj9/7AHs7OzQtd1sVfuDwzDEFuEQiGxvLwsYrHY/4uWlpZEYnBEfG2/IXYSDodFJBLJiUy/FzVNE2tra0JRFL4/fEbq9QQrxadYrToPQCAQIJVK5fK7BJFIRLjdbhYXF1m4fJvNT9HczD5wHb//LKWlpVRUVEh/FZSXl0uXPtbj8XiYaDjCZmHBz9DBItIfFmhra0VV1Z0V5Lm5OfG+8BXf0qsY6SihWBCHw4Hdbkd3FqAO9mLzN5J89JIWXw0zMzO7BCbDMLhQco2n+j1CsSAATe+KWK4f5/jEE4a/LOL1+rg6/pyNjQ0SiQSapuWOKLvdbrLZLCbJzKbIAtDlukWH0kN3dzeB4RX2F1/EWa4yFNC50lnL2NjY9gZCCMxmM5X5dXS6bgLQofTg9foIvVlAyCdJpE4QeqvS0lxHOp3GZNo+nclms7G+vo53uot9EypD1SEAamqOUVXbi8XWimQuA8nKuTMH6Ovro6qqelug6zrBYJB4PE40GmXkzgvi8Tia9pm7fR4sFislhyT8py3cf5ykv78fszn3isiKotDY2Igsy2QyGSYnJ5mensbn8yJJEpVHZR4MFHLksPlXpYz5+fmcYFu1g3A4LLLZLMlkElVVaW9vx+VykZeXR35+Pk1NTTQ3N0v/FGwxNTUlRkdHcTqdNDQ0YLVayWQy2Gw2nE7n3gJN04RhGDgcjl3fdyc/AGM4B8aQvyP0AAAAAElFTkSuQmCC";
		var title = document.getElementById('headerFilm');
		var year = document.getElementsByClassName('info')[0].rows[0].cells[1].children[0].children[0].textContent;
		
		var text = title.children[1].textContent.length > 0 ? title.children[1].textContent : title.children[0].textContent;
		
		text += ' ' + year;

		var img = new Image();
		img.src = ico;
		img.title = text;
		var a = document.createElement('a');
		a.target = '_blanc'
		a.href = 'http://rutracker.org/forum/tracker.php?nm=' + text + '&s=2&o=4';
		a.border = 0;
		a.appendChild(img);
		var f = document.getElementsByClassName('movieFlags')[0];
		var d = document.createElement('div');
		d.style.cssFloat = 'left';
		d.style.height = '16px';
		d.style.width = '16px';
		d.style.marginLeft = '4px';
		d.style.overflow = 'hidden';
		d.appendChild(a);
		f.insertBefore(d, f.children[0]);
	
	} catch (e) {
		// GM_log(e);
	}

	document.body.style.background = '';
	var bf = document.getElementById('brandingFlash');
	bf.parentNode.removeChild(bf);
	document.getElementsByClassName('menu')[0].style.top = 0;
	document.getElementsByClassName('png_block')[0].style.top = 0;
	document.getElementById('top_form').style.top = 0;

	document.getElementById('top').style.height = '90px';
	
	var tsb = document.getElementById('top_superbanner');
	if (tsb) {
		tsb.parentNode.removeChild(tsb);
	}

	var t3b = document.getElementById('top_3banners');
	if (t3b) {
		t3b.parentNode.removeChild(t3b);
	}

	var sad = document.getElementById('show_adv');
	if (sad) {
		sad.parentNode.removeChild(sad);
	}
	
})();
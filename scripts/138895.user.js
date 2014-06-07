// ==UserScript==
// @name           ForoCoches KeyBoard
// @namespace      http://www.forocoches.com
// @description    Navegar a traves de ForoCoches facilmente.
// @require        http://craig.is/assets/js/mousetrap/mousetrap.min.js
// @include        *http://www.forocoches.com/**
// ==/UserScript==

	if(/&page/.test(document.URL) == false){
		var page = 0;
	}else{
		var currentPage = document.URL.split('&page=');
		currentPage[1] = currentPage[1].split('&');	
		var page = currentPage[1][0];
	};

	//Go Pages
		//Next page
		Mousetrap.bind("shift+ctrl+alt+l", function(){
			if(page != 0){
				nextPage = parseInt(page) + 1;
	  			window.location = document.URL.replace('&page=' + page, '&page=' + nextPage);
	  		}else{
	  			window.location = document.URL + '&page=2';
	  		};
		});

		//Previus page
		Mousetrap.bind("shift+alt+ctrl+k", function(){
			if(page != 1){
				nextPage = parseInt(page) - 1;
	  			window.location = document.URL.replace('&page=' + page, '&page=' + nextPage);
	  		}
		});

	//Go Forums
	Mousetrap.bind("shift+ctrl+alt+g", function(){ window.location = 'http://www.forocoches.com/foro/forumdisplay.php?f=2'; }); //General
	Mousetrap.bind("shift+ctrl+alt+e", function(){ window.location = 'http://www.forocoches.com/foro/forumdisplay.php?f=17';}); //Informatics
	Mousetrap.bind("shift+ctrl+alt+v", function(){ window.location = 'http://www.forocoches.com/foro/forumdisplay.php?f=27';}); //Travel
	Mousetrap.bind("shift+ctrl+alt+w", function(){ window.location = 'http://www.forocoches.com/foro/forumdisplay.php?f=23';}); //Jobs/Work
	Mousetrap.bind("shift+ctrl+alt+c", function(){ window.location = 'http://www.forocoches.com/foro/forumdisplay.php?f=22';}); //Selling Informatics
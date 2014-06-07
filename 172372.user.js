// ==UserScript==
// @name        via blip killer
// @include     http://www.wykop.pl/ludzie/*
// @include     http://www.wykop.pl/mikroblog/
// @include     http://www.wykop.pl/mikroblog/*
// @include     http://www.wykop.pl/tag/*
// @version     1
// ==/UserScript==

	var viablip = document.getElementsByClassName('small cac');
	var count = 0;

	function killBlip(){

		for(var i = 0; i < viablip.length; i++){
		    if(viablip[i].textContent == "via Blip"){
		        viablip[i].parentElement.parentElement.parentElement.parentElement.style.display = "none";
		        count += 1;
		    }
		}

		if(count != 0){
		    console.log('Znaleziono: ' +count+ ' via Blip. Wszystkie zabite ( ͡° ͜ʖ ͡°)');
		}
		else{
		    console.log('Nie znaleziono żadnego via Blip. Jupi!');
		}
	
	}

	var refreshIntervalRecent = setInterval(function(){

        if(document.getElementById('recent') != null){

            document.getElementById('recent').onclick = function(){
	           killBlip();
	        };

	        clearInterval(refreshIntervalRecent);

        }

	}, 1000);

	killBlip();
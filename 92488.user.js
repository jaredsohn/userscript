// ==UserScript==
// @name           Wczytywacz zdjęć
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==
const $ = unsafeWindow.$;

const link = document.createElement("a");
link.innerHTML = "Podładuj";
link.href = "#";
$(link).click(function(e){
	e.preventDefault();	
	const status = $(document.createElement("span"));	
	status.html("Wczytywanie...");
	$(e.target).replaceWith(status);
		
	const toCall = Math.ceil(unsafeWindow.ile_wszystkich / 10);
	var called = 0;
	const t0 = (new Date().getTime());
	
	// 10 razy na sekundę sprawdzamy czy ładowanie zdjęć się zakończyło. jeśli tak, wczytujemy kolejną porcję i zwiększami licznik. jeśli załadujemy wszystkie strony, wychodzimy z timera
	var timer = window.setInterval(function(){	
		if(!unsafeWindow.photosPending){
			if(called < toCall){
				unsafeWindow.more_photos();
				//GM_log((new Date().getTime())-t0+": more_photos");				
				called++;
			}else{
				window.clearInterval(timer);				
				$(".jcrop-holder > img").each(function(){								
					$(this).attr("src", $(this).parent().prev().attr("url"));
				});						
				//GM_log((new Date().getTime())-t0+": wszystkie zdjęcia załadowane, timer off");
				status.html("OK");
			}
		}
	}, 100);

});

if(!document.location.href.match(/(\/albumy)|(\/najnowsze)|(\/,\d+,\d+,\d+)/i)){
	$("#navigatorBox .Box .container").append(link);
}
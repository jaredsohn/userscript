// ==UserScript==
// @name           bufor pw
// @namespace      local
// @include        http://www.fotka.pl/profil/*/Kontakt.html
// ==/UserScript==


dodajPrzyciski()
spam = safeWrap(spam)


function dodajPrzyciski(){	
	var pole = $("f_wiadomosc")
	
	
	var p3 = document.createElement("input");
	p3.type = "button"
	p3.value = "Zyczonka"	
	p3.style.cssText = "float: right; height: 28px; margin-right: 5px; margin-top: 4px"
	p3.addEventListener("click", spam, false);
	

	$("box_kontakt_center_top").insertBefore(p3, $("submit_wiadomosc").nextSibling)
	
		
	$("submit_wiadomosc").previousSibling.style.width = "330px" 
	$("submit_wiadomosc").style.marginTop = ""
	}

function spam(){	
		var aaa = Math.floor(Math.random() * 8) + 1
		if (aaa==1){
			$("f_wiadomosc").value = "Wesołych świąt i szczęśliwego Nowego Roku! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==2){
			$("f_wiadomosc").value = "Wesołych świąt i udanego Sylwestra!!! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==3){
			$("f_wiadomosc").value = "Hohoho! Wesołych świąt, szczęśliwego nowego roku oraz udanego sylwestra!!! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==4){
			$("f_wiadomosc").value = "Wesołych świąt, bogatego Gwiazdora, oraz udanego sylwestra i szczęśliwego Nowego Roku!!! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==5){
			$("f_wiadomosc").value = "Bogatego Gwiazdora oraz Wesołych Świąt, spełnienia wszystkich marzeń i udanego Nowego Roku!\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==6){
			$("f_wiadomosc").value = "Wesołych świąt, oraz udanego Nowego Roku!! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==7){
			$("f_wiadomosc").value = "Wesołych świąt, oraz udanego sylwestra! :D\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
		}else if (aaa==8){
			$("f_wiadomosc").value = "Bogatego Gwiazdora, udanego Nowego Roku oraz Sylwestra! Wesołych Świąt! :)\n\nNa dole w linku dołączona ładna karteczka świąteczna ^^\n\nhttp://www.fotka.pl/swieta/link/44033\n\n:*"
    }else{
			$("f_wiadomosc").value = "jakis tekst"
	}
}

function $(name){
	return document.getElementById(name);
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}


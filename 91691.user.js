// ==UserScript==
// @name           wtyczka GSOS
// @namespace      local
// @include        http://www.fotka.pl/wiadomosci/talk/*
// @copyright      Mcfly
// @version        1.0
// ==/UserScript==

var p = document.createElement("input");
p.className = "button";
p.type = "submit";
p.style.cssFloat = "left";
p.style.marginTop = p.style.marginLeft = "6px";
p.value = "Odpisz \"GSOŚ\"";
p.addEventListener("click", function(e){
	if(document.getElementById("tresc").value != ""){
		if(confirm("PW zawiera już treść. Czy na pewno chcesz wysłać tylko OK?")){
			document.getElementById("tresc").value = "Grupa skutecznie obniżająca średnią na fotka.pl w skrócie {GSOŚ} Zgłaszając się do klanu kandydat zobowiązany jest w ciągu trzech dni od zgłoszenia  do wysłania prywatnej wiadomości jednemu z moderatorów klanu zamieszczając w nim uzasadnienie dlaczego chce dołączyć do ekipy gsoś dołączając wraz z uzasadnieniem screen tabelki ocen . W przypadku braku takowego uzasadnienia zgłoszenie będzie odrzucane po jakimś czasie .";
		}else{
			e.preventDefault();
		}
	}else{
		document.getElementById("tresc").value = "Grupa skutecznie obniżająca średnią na fotka.pl w skrócie {GSOŚ} Zgłaszając się do klanu kandydat zobowiązany jest w ciągu trzech dni od zgłoszenia  do wysłania prywatnej wiadomości jednemu z moderatorów klanu zamieszczając w nim uzasadnienie dlaczego chce dołączyć do ekipy gsoś dołączając wraz z uzasadnieniem screen tabelki ocen . W przypadku braku takowego uzasadnienia zgłoszenie będzie odrzucane po jakimś czasie .";	
	}
}, false);
	

var gdzie = document.getElementById("pw_emots");
gdzie.parentNode.insertBefore(p, gdzie);
// ==UserScript==
// @name           Reset Timer
// @author         Marcelo Rubo Cazerta	
// @include        https://www.neobux.com/?u=v
// @description    Exibe o tempo restante para resetar os anúncios atráves de um alert
// ==/UserScript==


window.resetAdd = function() {
	var time = new Date();
	var hour = time.getHours();
	var mins = time.getMinutes();
	var addHour = 19;
	var addMin = 51;
	var rHour;
	var rMin;

	
	//trato as horas
	if (addHour - (hour) >= 0)
		rHour = addHour - (hour);
	else rHour = 24 - ((hour) - addHour);
	//tratamento dos minutos
	if (addMin - mins >= 0)
		if (addMin - mins < 60)
			rMin = addMin - mins;
		else {
				rHour++;
				rMin = 60 - min;
			 }
	else {
		rMin = mins - addMin;
		rHour++;
	};
	
	
	alert('Faltam '+rHour+' horas e '+rMin+' minutos para resetar os anuncios');

}

resetAdd();

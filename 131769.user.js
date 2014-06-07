// ==UserScript==
// @name         Добавляем Яндекс.Поиск по людям к резюме ХХ
// @namespace    ResumeFinderHHYandex
// @include      *
// @match http://hh.ru/resume*
// @author       Payalnik
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



function main() {
function getAge(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
		var date = $('.b-forma-narrowcell:contains("Дата рождения")').next().text();
		var DOBmdy = date.split("."); 
	    Bdate = new Date(DOBmdy[2],DOBmdy[1],DOBmdy[0]); 
	    Age = getAge(Bdate); 
	
	if (!Age)
	Age = "";
		
	town = $.trim($('.b-forma-narrowcell:contains("Проживание")').next().text()).split('   ')[0];

	var name = $.trim($('.b-resume-name').text());
	var names = name.split(" ");
	name = names[0] +" " +  names[1]; 
	
	$('.b-resume-profession').append('<br><a href="http://yandex.ru/yandsearch?text='+name+'&lr=213&xjst=1&filter=people&ps_age_from='+(Age)+'&ps_age_to='+(Age)+'&ps_geo='+town+'" target="_blank">Найти на Яндексе</a>')
}

// load jQuery and execute the main function
addJQuery(main);
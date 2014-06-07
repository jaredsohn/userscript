// ==UserScript==
// @name       TM
// @namespace  https://portal.bifit.int:8443/*
// @version    1.0
// @description  enter something useful
// @match      https://portal.bifit.int:8443/*
// @copyright  2012+, You
// ==/UserScript==
var reloadDelay = 3; //Интервал обновления страницы в минутах
var criticalTime = 6000; //Время в минутах, за которое необходимо выдавать предупреждение
alert(getElementById('tasks:tbody_element').innerText);
if (document.getElementById('tasks:tbody_element')){
	var tasks = document.getElementById('tasks:tbody_element');
	var currentTime = tasks.getElementsByClassName('time');
	var allTimes = currentTime[1].innerText.match(/\d+/g);
	for (i = 0; i < 4; i++){
		allTimes[i] = Number(allTimes[i]);
	}
	var timeUsed = allTimes[0]*60 + allTimes[1];
	var timePlanned = allTimes[2]*60 + allTimes[3];
	var timeLeft = timePlanned - timeUsed;
    if (timeLeft <= criticalTime) {
        if(confirm('Время на исходе! Продлить задачу?')) {
            var taskName = tasks.getElementsByClassName('wrapped')[0].getElementsByTagName('a')[0].innerText;
			localStorage.setItem('taskName', taskName);
            document.getElementById('tasks').getElementsByTagName('caption')[0].getElementsByTagName('a')[0].click();
        }
    }
}

if (document.getElementById('description')){
    var taskNameField = document.getElementById('description');
    taskNameField.value = localStorage.getItem('taskName');
    localStorage.clear();
}

setInterval("location.reload()", 1000*60*reloadDelay);

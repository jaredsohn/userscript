// ==UserScript==
// @name       Teamer.ru: hide non actual tasks
// @namespace  http://optimit.ru/
// @version    0.1
// @description  Adds a button to hide tasks with start date after currents date. Those tasks are supposed to be non=actual.
// @match      http://www.teamer.ru/
// @copyright  2014+, Stac
// ==/UserScript==

/*
	Возвращает true если дата dateString еще не наступила
*/
var isAfterDate = function(dateString){
	var	d = new Date(),
		now = d.toISOString().split("T")[0],
		ms = ["", "янв", "фев", "мар","апр","май","июн","июл", "авг", "сен", "окт", "ноя", "дек"],
		t = dateString.split(" "),
		m = ms.indexOf(t[1]);
	m = m < 10 ? "0"+m : m;
	date =  t[2]+"-"+m+"-"+(t[0] <10 ? "0"+t[0] : t[0]);
	return date > now ? true : false;
};

/* 
	Скрывает все задачи, дата начала котовых еще не наступила
*/
function hideNonActualTasks(){
	var tasks = document.querySelectorAll(".task_list_item");
	for (var i = 0; i<tasks.length;i++){
		var sd = tasks[i].querySelectorAll("td")[1].innerText;
		if ( isAfterDate(sd) ) tasks[i].style.display = "none";
	}
}

/* 
	Размещает кнопку на титульной полосе проекта
*/
function injectControls(){
	pt = document.querySelector(".project_title td");
	b = document.createElement("button")
	b.onclick= hideNonActualTasks;
	b.innerText = "Скрыть неактуальные";
	b.style.float = "right";
	pt.appendChild(b);
}
injectControls();
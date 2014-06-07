// ==UserScript==
// @name           Darkjohn Moodle
// @description    Script to UDC Moodle
// @include        https://campusvirtual.udc.es/moodle/*
// @version 0.1 Oct. 2010. Eliminacion de cursos que no queremos visualizar
// @version 0.2 Oct. 2010. Eliminacion de codigo de curso y estudios a los que pertenece
// @version 0.3 Oct. 2010. Ordenacion de cursos alfabeticamente
// @version 0.4 Oct. 2011. Año 2011/12
// ==/UserScript==


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function addCSS() {
    head = document.getElementsByTagName("head")[0];
    head.innerHTML += '<style media="screen" type="text/css"> .sideblock li .icon img {  width:10px;  height:10px;} </style>'
}

function CoursesArrayToString(array) {

	var res = "";
	
	for (var i=0; i<array.length; i++) {
	
		res += "\n" + array[i][1];
		
	}

	return res;
}

function orderCourses(coursea, courseb) {

	if (coursea[0] < courseb[0])
		return -1;
	if (coursea[0] == courseb[0])
		return 0;
	return 1;

}

function findName(text,iz,de) {
	
	var init = text.indexOf(iz) + iz.length;
	var end = text.indexOf(de);
		
	return text.substring(init,end);
}

//Eliminar cursos del menu lateral
function delLateralMenuCourses(year) {

	var patron = new RegExp("[0-9]{9}" + year);
	var patron2 = new RegExp(/[0-9]{13} -/ig);
	var patron3 = new RegExp(/-[\w|\s|ñ|á|é|í|ó|ú]*<\/a>/ig);
	
	var lists = getElementsByClassName("list", getElementsByClassName("block_course_list")[0]);

	for (var j=0; j<lists.length; j++) {
		var courses = lists[j].getElementsByTagName("li");

		var newCourses = new Array();
		var par = 0;
		var count = 0;
		
		for (var i=0; i<courses.length; i++) {
			if (courses[i].innerHTML.search(patron) == -1) {
				var tmp = courses[i].innerHTML.replace(patron2,'<small>');
				tmp = tmp.replace(patron3,"</small></a>");
				newCourses[count] = new Array();
				newCourses[count][1] = '<li class="r' + par + '">' + tmp + '</li>';
				newCourses[count][0] = findName(newCourses[count][1],'<small>','</small>');
				par = (par + 1) % 2;
				count += 1;
			}
		}
	
		lists[j].innerHTML = CoursesArrayToString(newCourses.sort(orderCourses));
	}

}

//Eliminar cursos de la lista central
function delCenterListCourses(year) {
	
	var patron = new RegExp("[0-9]{9}" + year);
	var patron2 = new RegExp(/[0-9]{13} -/ig);
	var patron3 = new RegExp(/-[\w|\s|ñ|á|é|í|ó|ú]*<\/a>/ig);

	var lists = getElementsByClassName("clearfix", document.getElementById("middle-column"));
	
	for (var j=0; j<lists.length; j++) {
		var courses = lists[j].getElementsByClassName("coursebox");
		
		if (courses.length != 0) {
			var newCourses = new Array();
			var count = 0;
			
			for (var i=0; i<courses.length; i++) {
				if (courses[i].innerHTML.search(patron) == -1) {
					var tmp = courses[i].innerHTML.replace(patron2,'');
					tmp = tmp.replace(patron3,"</a>");
					newCourses[count] = new Array();
					newCourses[count][1] = '<div class="box coursebox courseboxcontent boxaligncenter boxwidthwide">' + tmp + '</div>';
					newCourses[count][0] = findName(newCourses[count][1],'<a title="','-');
					count += 1;
				}
			}
	
			lists[j].innerHTML = CoursesArrayToString(newCourses.sort(orderCourses));
		}
	}
}

// lista de años que no queremos visualizar
var years = ["1011"];

for (i=0; i<years.length; i++) {

	delLateralMenuCourses(years[i]);
	delCenterListCourses(years[i]);

}

addCSS();
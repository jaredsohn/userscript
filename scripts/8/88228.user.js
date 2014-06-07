// ==UserScript==
// @name           Darkjohn Quegrande
// @description    Script to QueGrande
// @include        http://quegrande.org/foro/viewforum.php?f=43*
// @version 0.2 Oct. 2010. 
// ==/UserScript==

// Recent changes:

/*
17.10.2010 v0.2
+ Separacion entre nuestras asignaturas y el resto
- Eliminacion de asignaturas que no son las nuestras

16.10.2010 v0.1
+ Eliminacion de asignaturas que no son las nuestras
*/



function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function matchCourse(coursename,filtros) {

	for (var i=0; i<filtros.length; i++) {

		var ok = 0;

		for (var j=0; j<filtros[i].length; j++) {

			var patron = new RegExp(filtros[i][j]);
			if (coursename.search(patron) != -1) ok++;

		}

		if (ok == filtros[i].length) return true;
	}	

	return false;
}

function addMyCoursesForum() {
	var forums = getElementsByClassName("forumbg"); 

	var list = getElementsByClassName("topics", forums[0])[0];

	list.innerHTML += "<replaceme></replaceme>";

	var replaceme = '</ul> <span class="corners-bottom"><span></span></span></div></div> \
		<div class="forumbg"> <div class="inner"><span class="corners-top"><span></span></span> \
		 <ul class="topiclist"> \
			<li class="header"> <dl class="icon"> \
					<dt>Mis Asignaturas</dt> \
					<dd class="posts">Respuestas</dd> \
					<dd class="views">Vistas</dd> \
					<dd class="lastpost"><span>Último mensaje</span></dd> \
			</dl> </li> </ul> \
		 <ul class="topiclist topics">'

		var body = document.getElementsByTagName("body")[0];
		body.innerHTML = body.innerHTML.replace("<replaceme></replaceme>",replaceme);
		//body.innerHTML = body.innerHTML.replace("<dt>Temas</dt>","<dt>Otras Asignaturas</dt>");

}

function separateCourses(quit,save) {

	var forums = getElementsByClassName("forumbg"); 

	var myCoursesForum = forums[1];
	var otherCoursesForum = forums[2];
	otherCoursesForum.innerHTML = otherCoursesForum.innerHTML.replace("<dt>Temas</dt>","<dt>Otras Asignaturas</dt>");

	var mylist = getElementsByClassName("topics", myCoursesForum)[0];
	var otherlist = getElementsByClassName("topics", otherCoursesForum)[0];

	var courses = otherlist.getElementsByTagName("li");

	var myCourses = "";
	var otherCourses = "";

	var bg  = 1;
	var bg2 = 1;	

	for (var i=0; i<courses.length; i++) {
		var coursename = getElementsByClassName("topictitle", courses[i])[0].innerHTML;

		if (!matchCourse(coursename,quit) || matchCourse(coursename,save)) {

			myCourses += '\n<li class="row bg' + bg + '">' + courses[i].innerHTML + '</li>';
			if (bg == 1) bg = 2; else bg = 1;

		} else {

			otherCourses += '\n<li class="row bg' + bg + '">' + courses[i].innerHTML + '</li>';
			if (bg2 == 1) bg2 = 2; else bg2 = 1;

		}
	}

	mylist.innerHTML = myCourses;
	otherlist.innerHTML = otherCourses;
}

// Array con cursos/asignaturas que no queremos 
// Solo se permiten letras, numeros y el º, cualquier otro caracter
// puede provocar un resultado inesperado
// Formato: [Filtro1,Filtro2,...] donde Filtroi es un array de filtros

var quit = [["1º"],["2º"],["3º"],["OPT"],["Libre"],["PFC"],["ES"]];

// Array con los cursos/asignaturas que queremos salvar
// Solo se permiten letras, numeros y el º, cualquier otro caracter
// puede provocar un resultado inesperado
// Formato: [Filtro1,Filtro2,...] donde Filtroi es un array de filtros

var save = [["3º","Est2"]]

addMyCoursesForum();
separateCourses(quit,save);
	

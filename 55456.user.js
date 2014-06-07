// ==UserScript==
// @name           Ally Museum Control para el Holding
// @namespace      WTFack
// @description    Organiza los huecos de los museos de tu alianza de forma facil y efectiva
// @include        http://s2.ar.ikariam.com/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//v1.0 Primer Release


//PARAMETROS CONFIGURABLES

//Tu id de player lo puedes mirar en opciones del juego, a mitad pantalla lo pone (tienes que cambiar donde pone 5000 por tu numero)
var player_id = 5000;

//El numero de mundo en el que juegas [1=alpha, 2=beta...] (Cambia el 12 por el tuyo)
var world = 2;

//NO TIENE PORQUE SER TU NICK REAL, SOLO EL QUE TE INDIQUE EL ADMINISTRADOR DE TU SERVER DE ALLIANCE MUSEUM CONTROL (Dejar las comillas)
var nick = "TuNick";

//MUY RECOMENDABLE NO USAR LA CONTRASE�A DEL JUEGO, SINO LA QUE TE INDIQUE EL ADMINISTRADOR DE TU SERVER DE ALLIANCE MUSEUM CONTROL (Dejar las comillas)
var pass = "TuPass";

//Esta direccion te la tiene que dar el administrador de tu server de Alliance Museum Control (Dejar las comillas)
var server = "http://www.alianzaelite.com.ar/museos/museum_control.php";






// NO MODIFICAR DESDE AQUI

var url_actual = location.href;
var is_museum = /view=museum/;
var is_cultural = /view=culturalPossessions_assign/;
var is_embassy = /view=embassy/;
var is_diplomacy = /view=diplomacyAdvisorAlly/;

function post_actualassignments(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 
		
		var full_code = document.body.innerHTML;
		full_code_modified = full_code.replace(/<h3 class="header"><span class="textLabel">Socio/, '<h3 class="header"><span class="textLabel">Socio - ' + xhr.responseText);
		document.body.innerHTML = full_code_modified;
		}
    });
}
function post_freeassignments(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		document.getElementById("mainview").getElementsByTagName("span")[0].innerHTML = document.getElementById("mainview").getElementsByTagName("span")[0].innerHTML + ' - ' + xhr.responseText;
				
		}
    });
}

function post_free(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		document.getElementById("mainview").getElementsByTagName("p")[1].innerHTML = document.getElementById("mainview").getElementsByTagName("p")[1].innerHTML + '<br/><br/><br/><b>ACUERDOS QUE PUEDES OFRECER:</b><br/><br/>' + xhr.responseText + '<br/><br/>';


		}
    });
}

function post_diplomacy(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 
		

		document.getElementById("tab4").getElementsByTagName("span")[1].innerHTML = document.getElementById("tab4").getElementsByTagName("span")[1].innerHTML + ' - ' + xhr.responseText;
		
		}
    });
}

function post_embassy(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 
		

		document.getElementById("mainview").getElementsByTagName("span")[1].innerHTML = document.getElementById("mainview").getElementsByTagName("span")[1].innerHTML + ' - ' + xhr.responseText;
		
		}
    });
}




if(is_museum.test(url_actual)){ 

var full_code = document.body.innerHTML;
var already_assigned = full_code.split('&amp;msgType=81"');
var id_mate = "";
for(i=0;i<already_assigned.length-1;i++) {
	var obtain_id = already_assigned[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_length = obtain_id.length-1;
	var obtain_id2 = obtain_id[obtain_length];
	if(i>0) { id_mate += ","; }
	id_mate += obtain_id2;
	
	}
	stringtosend = "";
	stringtosend += "idmate=";
	stringtosend += id_mate;
	stringtosend += "&playerid=";
	stringtosend += player_id;
	stringtosend += "&nick=";
	stringtosend += nick;
	stringtosend += "&pass=";
	stringtosend += pass;
	
	var already_asked = full_code.split('&amp;msgType=78"');
var id_asked = "";
for(i=0;i<already_asked.length-1;i++) {
	var obtain_asked = already_asked[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_asked_length = obtain_asked.length-1;
	var obtain_asked2 = obtain_asked[obtain_asked_length];
	if(i>0) { id_asked += ","; }
	id_asked += obtain_asked2;
	}
	if(id_asked!= "") {

	stringtosend += "&idsent=";
	stringtosend += id_asked;
	
	}

var already_asked = full_code.split('&amp;msgType=80"');
var id_asked = "";
for(i=0;i<already_asked.length-1;i++) {
	var obtain_asked = already_asked[i].split('<a class="cancelTreaty" href="?view=sendIKMessage&amp;receiverId=');
	var obtain_asked_length = obtain_asked.length-1;
	var obtain_asked2 = obtain_asked[obtain_asked_length];
	if(i>0) { id_asked += ","; }
	id_asked += obtain_asked2;
	}
	
	if(id_asked!= "") {

	stringtosend += "&idasked=";
	stringtosend += id_asked;
	
	}


post_actualassignments(server, stringtosend);


}

if(is_cultural.test(url_actual)){ 

var total_assignments_text = document.getElementById("assignCulturalGoods").innerHTML;
var total_assignments = total_assignments_text.split('</span>')[1];
total_assignments = total_assignments.split('</div>')[0];
total_assignments = parseInt(total_assignments);

var all_cities = document.getElementById("mainview").innerHTML;
var city = all_cities.split('maxValue : ');
var number_assignments = 0;
for(i=1;i<city.length;i++) {
	var obtain_number = city[i].split(',')[0];
	obtain_number = parseInt(obtain_number);
	number_assignments = number_assignments + obtain_number;
		
	}
var free_asignments = number_assignments - total_assignments;

	stringtosend = "";
	stringtosend += "freeasignments=";
	stringtosend += free_asignments;
	stringtosend += "&playerid=";
	stringtosend += player_id;
	stringtosend += "&nick=";
	stringtosend += nick;
	stringtosend += "&pass=";
	stringtosend += pass;
	
post_freeassignments(server, stringtosend);

if(free_asignments>0) {
stringtosend = "";
	stringtosend += "world=";
	stringtosend += world;
	stringtosend += "&playerid=";
	stringtosend += player_id;
	stringtosend += "&nick=";
	stringtosend += nick;
	stringtosend += "&pass=";
	stringtosend += pass;
	
post_free(server, stringtosend);
}

}

if(is_diplomacy.test(url_actual)){  

var full_code = document.body.innerHTML;
var already_assigned = full_code.split('class="message" href="?view=sendIKMessage&amp;receiverId=');
var id_mate = "";
for(i=1;i<already_assigned.length;i++) {
	var obtain_id = already_assigned[i].split('"')[0];
	if(i>1) { id_mate += ","; }
	id_mate += obtain_id;
	}
	stringtosend = "";
	stringtosend += "ally=";
	stringtosend += id_mate;
	stringtosend += "&playerid=";
	stringtosend += player_id;
	stringtosend += "&nick=";
	stringtosend += nick;
	stringtosend += "&pass=";
	stringtosend += pass;
	
post_diplomacy(server, stringtosend);

}

if(is_embassy.test(url_actual)){  

var full_code = document.body.innerHTML;
var already_assigned = full_code.split('class="message" href="?view=sendIKMessage&amp;receiverId=');
var id_mate = "";
for(i=1;i<already_assigned.length;i++) {
	var obtain_id = already_assigned[i].split('"')[0];
	if(i>1) { id_mate += ","; }
	id_mate += obtain_id;
	}
	stringtosend = "";
	stringtosend += "ally=";
	stringtosend += id_mate;
	stringtosend += "&playerid=";
	stringtosend += player_id;
	stringtosend += "&nick=";
	stringtosend += nick;
	stringtosend += "&pass=";
	stringtosend += pass;
	
post_embassy(server, stringtosend);

}
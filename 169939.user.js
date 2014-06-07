// ==UserScript==
// @name BMA Productores
// @namespace http://nowhere.com
// @description Testing
// @include http://*erepublik.com/*/economy/manage-employees/*
// @run-at document-end
// ==/UserScript==


// Uso el script jquery de la pagina, para no importarlo nuevamente.

$ = unsafeWindow.jQuery;

// TOMA DE DATOSssssssssssssssssss

var usuarios = [];
var usuariosid = [];
var salarios = [];
var trabajo = [];
$(".listing").each(function() {
	usuarios.push($(this).find(".employee_entry").first().find("strong").text());
	var auxid = $(this).find("a.employee_entry").attr("href").trim().split("/");
	usuariosid.push(auxid[auxid.length - 1]);
	salarios.push(Number($(this).find("strong.current_salary").text().split(" ")[0]));
	var aux = [];
	$(this).find("div.working_days").find("span").each(function(){
		if ($(this).attr("class").match("worked") == "worked") { aux.push("SI")} else {aux.push("NO")};
		});
	trabajo.push(aux.join("."));
	});
	
var dia = $("span.date").first().text().split(" ")[1];
var empleador = getDOMCitizenId();

// Agrego el cartel que pregunta si enviarlo o no.

$("body").append(
	'<div id="question" style="width:350px; position:absolute; bottom:30px; right:10px; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px; background-color: #000000; opacity: 0.5; text-align:center;">'+
	'<p style = "background-color: transparent; color: #FFFFFF; font-variant:small-caps; font-size:medium;">¿Enviar los datos de trabajadores?</p>'+
	'<p style = "background-color: transparent; color: #FFFFFF; font-variant:small-caps;"><strong>'+usuarios.length+' empleados encontrados</strong></p>'+
	'<input id="Bdatos" type="button" id="yes" value="Enviar" href="javascript:;"/>'+
	'</div>' 
)


// Agregado el evento de click en el boton Enviar.

$('#Bdatos')[0].addEventListener("click",lala,false);
	


// FUNCIONESSSSSSSSSSSSSSS

// Procede al envio de datos y segun su estado genera el nuevo cartel

function lala() {
		$.ajax({
			url: "https://docs.google.com/spreadsheet/formResponse?formkey=dEZsUWVYY0VJVWdTaWR5NlNSVUM3NHc6MA&ifq",
			type: "POST",
			cache: false,
			dataType: "text",
			data: {
				"entry.0.single" : dia,
				"entry.1.single" : usuarios.join(","),
				"entry.2.single" : usuariosid.join(","),
				"entry.3.single" : salarios.join(","),
				"entry.4.single" : trabajo.join(","),
				"entry.5.single" : empleador,
				"pageNumber" : "0",
				"backupCache" : "",
				"submit" : "Enviar"
			},
			success: function() {
					$('div#question').fadeOut(1000, function(){
						$('div#question').empty();
						$('div#question').append('<p style = "background-color: transparent; color: #000000; font-variant:small-caps; font-size:medium; font-weight:bold; z-index: 1;" > Enviado con Exito </p>');
						$('div#question').css("background-color", "#00FF00");
						$('div#question').fadeIn(1000);
			});
			},
			error: function() {
					$('div#question').fadeOut(1000, function(){
						$('div#question').empty();
						$('div#question').append('<p style = "background-color: transparent; color: #FFFFFF; font-variant:small-caps; font-size:medium; font-weight:bold; z-index: 1;" > Error en el envio </p>');
						$('div#question').css("background-color", "#FF0000");
						$('div#question').fadeIn(1000);
					});
			}
		});

}

//Obtiene el ID de usuario a traves del DOM

function getDOMCitizenId() {
	try {
		var menulargo = $("#large_sidebar").find(".user_section").first().find(".user_avatar");
		var linkParts = $(menulargo).attr("href").trim().split("/");
		var value = linkParts[linkParts.length - 1];
		return value;
	}
	catch(err) {}

	return -1;
}
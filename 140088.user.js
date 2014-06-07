// ==UserScript==
// @name Comunio CASH
// @match http://www.comunio.es/team_news.phtml
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description Calcula el dinero restante de todos los jugadores
// ==/UserScript==

//Añado el botón que calculará los puntos
var vez = 0;
var dinero_inicial = 40000000;
var boton = "<div id='mi_div' class='article_header2'><div><a id='boton_calcula_puntos' class='newbutton new_message_btn' >CALCULAR DINERO</a><div><div id='mis_resultados' class='oculto' style='padding:1em;display:none'>Calculando...<div></div>";
var lista_dinero = "<div id='dinero_inicial' style='float:left;font-size:x-small;padding-left:1em;padding-right:1.5em'>Dinero inicial: <select id='sel_mio'><option value='40000000'>40.000.000€</option><option value='20000000'>20.000.000€</option><option value='9000000'>9.000.000€</option><option value='5000000'>5.000.000€</option></select></div>"
var usuarios = new Array();
var usuarios_ordenado = new Array();
var nombres = new Array();
$( "#postwrap").prepend(boton);
$( "#postwrap").prepend(lista_dinero);
//Añado el listener para el boton
$( "#boton_calcula_puntos" ).bind("click", handlerClick);

function handlerClick( evnt ) {
	if($( "#mis_resultados").hasClass("oculto")){
		if(vez===0){
			//Todavia no se ha hecho el calculo, llamo a la función que se encargará de ello
			window.localStorage.clear();
			dinero_inicial = parseInt($("#sel_mio").val());
			goInicioTemporada();
            $("#dinero_inicial").hide();
			vez++;
		}
		//Hago los calculos y lo muestro
		$( "#mis_resultados").show();
		$( "#mis_resultados").attr("class", "mostrado");
		$( "#boton_calcula_puntos" ).html("OCULTAR DINERO");
	}else{
		//Oculto los resultados
		$( "#mis_resultados").hide();
		$( "#mis_resultados").attr("class", "oculto");		
        $( "#boton_calcula_puntos" ).html("MOSTRAR DINERO");
	}
}

function goInicioTemporada() {
    var interval;
    window.alert("Esto puede tardar un poco... Tu ventana podría moverse durante el proceso, no te preocupes. ¡TODO VA BIEN!");
    window.scrollTo(0, 1);
    interval = setInterval(function () {
        if(isTemporadaIniciada()===0){
            window.scrollTo(0, $(document).height());
        }else{
            window.scrollTo(0, 0);
            clearInterval(interval);
            calculaTodo();
        }
    }, 2);
}

function calculaTodo() {       
    //Obtengo todos los elementos del tablon
    var elementos = $(".article_content1 .article_content_text, .article_content2 .article_content_text");

    for(var i=0; i<elementos.length; i++){
        //Compruebo que el mensaje procede de computer. En otro caso, se descarta.
        var padre = $(elementos[i]).parent();
        padre = $(padre).prev().prev();
        var esc_mensaje = $(padre).find(".iconnews div").attr("title");
        //Compruebo que se trata de un post de transacciones
        if(esc_mensaje==="del ordenador") {
            if( $(elementos[i]).find("a")!==0 && $(elementos[i]).text().indexOf("cambia por ")!==-1 ) {
                //Se trata de un traspaso
                var texto = $(elementos[i]).text();
                var enlaces_tmp = $(elementos[i]).find("a");
                var enlaces = new Array();
                for(var h=0; h<enlaces_tmp.length; h++) {
                    var href = $(enlaces_tmp[h]).attr("href");
                    if(href.indexOf("playerInfo")!==-1) {
                        //Añado el elemento al array de enlaces valido
                        enlaces.push(enlaces_tmp[h]);
                    }
                }
                var indice_enlaces = 0;
                var array_ventas = texto.split("cambia por ");
                for(var j = 1; j<array_ventas.length; j++){
                    var cadena = array_ventas[j];
                    //Obtengo el valor del traspaso
                    var cantidad = cadena.split(" € ")[0].split(".");
                    var cant_int = "";
                    var tmp = cantidad;
                    for(var h = 0; h<cantidad.length; h++){
                        cant_int += cantidad[h];
                    }
                    cantidad = parseInt(cant_int);
                    //Obtengo el vendedor
                    var intervienen = array_ventas[j].split(" € de ");
                    intervienen = intervienen[intervienen.length - 1];
                    var vendedor = intervienen.split(" a ")[0];
                    vendedor = vendedor.split(".")[0];
                    if(vendedor!=="Computer"){
                        vendedor = getPID($(enlaces[indice_enlaces]));
                        indice_enlaces++;
                    }
                    //Obtengo el comprador
                    var comprador = intervienen.split(" a ");
                    comprador = comprador[comprador.length - 1];
                    comprador = comprador.split(".")[0];
                    if(comprador!=="Computer"){
                        comprador = getPID($(enlaces[indice_enlaces]));
                        indice_enlaces++;
                    }
                    
                    //Añado los usuarios si es la primera vez que participan en una transaccion
                    if(window.localStorage.getItem(vendedor)===null){
                        usuarios.push(vendedor);
                        window.localStorage.setItem(vendedor, dinero_inicial);
                    }
                    
                    if(window.localStorage.getItem(comprador)===null){
                        usuarios.push(comprador);
                        window.localStorage.setItem(comprador, dinero_inicial);
                    }
                    //Actualizo los valores
                    var c_dinero = parseInt(window.localStorage.getItem(comprador));
                    var v_dinero = parseInt(window.localStorage.getItem(vendedor));
                    window.localStorage.setItem(comprador, c_dinero - cantidad);
                    window.localStorage.setItem(vendedor, v_dinero + cantidad);
                }
            }
            //Compruebo si se trata de una pena disciplinaria

            if($(elementos[i]).text().indexOf("Pena disciplinaria")!==-1 && $(elementos[i]).text().indexOf("serán quitados a")!==-1){                
                //Guardo el nombre y el valor de la pena disciplinaria
                var valor = $(elementos[i]).text().split("Pena disciplinaria: ")[1].split(" serán")[0].split(".");
                var tmp = "";
                for(var z=0;z<valor.length;z++){
                    tmp += valor[z];
                }
                valor = parseInt(tmp);
                valor = valor * -1;

                //Saco el nombre del jugador penalizado
                var nombre = $(elementos[i]).text().split("quitados a ")[1].split(" por el administrador")[0];
                if(window.localStorage.getItem(nombre)===null) {
                    nombres.push(nombre);
                    window.localStorage.setItem(nombre, valor);
                }else{
                    //actualizo la cantidad total de penalizaciones/primas
                    var actual = parseInt(window.localStorage.getItem(nombre));
                    actual = actual + valor;
                    window.localStorage.setItem(nombre, actual);
                }                
            }
            //Compruebo si se trata de una prima
            if($(elementos[i]).text().indexOf("Abono:")!==-1 && $(elementos[i]).text().indexOf("serán abonados a")!==-1){
                //Guardo el nombre y el valor de la pena disciplinaria
                var valor = $(elementos[i]).text().split("Abono: ")[1].split(" serán")[0].split(".");
                var tmp = "";
                for(var z=0;z<valor.length;z++){
                    tmp += valor[z];
                }
                valor = parseInt(tmp);

                //Saco el nombre del jugador penalizado
                var nombre = $(elementos[i]).text().split("abonados a ")[1].split(" por el administrador")[0];
                if(window.localStorage.getItem(nombre)===null) {
                    nombres.push(nombre);
                    window.localStorage.setItem(nombre, valor);
                }else{
                    //actualizo la cantidad total de penalizaciones/primas
                    var actual = parseInt(window.localStorage.getItem(nombre));
                    actual = actual + valor;
                    window.localStorage.setItem(nombre, actual);
                }                
            }
        }
    }
    printResultados();
}

function getPID ( link ) {
    var pid = $(link).attr("href").split("pid=")[1];
    return(pid);
}

function getName ( pid ) {
    jQuery.ajax({
        url:"./playerInfo.phtml/?pid=" + pid,
        async:false,
        success: function(data) {
            var nombre = $(data).find("#title h1").text().split(" (")[0];
            var html = "<a href='playerInfo.phtml?pid=" + pid + "' target='_blank'>" + nombre + "</a>";
            //modifico el dinero total con lso cambios por primas
            if(window.localStorage.getItem(nombre)!==null) {
                var dinero = $("#" + pid).parent().next();
                var valor = addCommas(parseInt(window.localStorage.getItem(pid)) + parseInt(window.localStorage.getItem(nombre))) + " €";
                $(dinero).html(valor);

                //Elimino el usuario de los usuarios con primas por calcular
                removeA(nombres, nombre);
            }
            $("#" + pid).html(html);
        }
    })
}

function printResultados() {
    ordenaUsuarios();
    var html = "<table style='border:solid; border-width:thin'>";
    $("#mis_resultados").html(html);
    for (var i = 0; i<usuarios.length; i++){
        html = "<tr><td style='padding-right:2em'><b>"+ parseInt(parseInt(i)+parseInt(1)) + ". </b>" + "<span id=\"" + usuarios[i] + "\"></span>" + ":</td><td align='right'> " + addCommas(window.localStorage.getItem(usuarios[i])) + " €</td></tr>";
        $("#mis_resultados table").append(html);
        getName(usuarios[i]);
    }
    html = "</table>"
    $("#mis_resultados").append(html);
    if(nombres.length!==0){
        html = "<table style='border:solid; border-width:thin;margin-top:1em'><tr><td colspan='2'>Puede que algunas primas no hayan sido aplicadas...</td></tr>";
        for(var l=0; l<nombres.length; l++){
            html += "<tr><td>"+nombres[l]+"</td><td>" + addCommas(window.localStorage.getItem(nombres[l])) + " €</td></tr>";
        }
        $("#mis_resultados").append(html + "</table>");
    }
}

function ordenaUsuarios() {
    var sin_computer = new Array();
    for( var i = 0; i<usuarios.length; i++){
        if(usuarios[i]!=="Computer"){
            sin_computer.push(usuarios[i]);
        }
    };
    usuarios = sin_computer;
    //ordeno de mas dinero a menos
    usuarios.sort(function(a, b) {
        return (window.localStorage.getItem(b) - window.localStorage.getItem(a));
    })
}

function getUltimaFecha() {
    var fecha = $($(".news_date")[$(".news_date").length - 1]).attr("title");
    return fecha.split(" ")[0];
}

function isTemporadaIniciada () {
    //Fecha comienzo temporada: 03.06.12
    var fecha = getUltimaFecha();
    var dia = Number(fecha.split(".")[0]);
    var mes = Number(fecha.split(".")[1]);
    var ano = Number(fecha.split(".")[2]);
    if(ano<12) return 1;
    if(ano===12 && mes<6) return 1;
    if(ano===12 && mes===6 && dia<4) return 1;
    else return 0;
}


function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function removeA(arr){
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length){
        what= a[--L];
        while((ax= arr.indexOf(what))!= -1){
            arr.splice(ax, 1);
        }
    }
    return arr;
}

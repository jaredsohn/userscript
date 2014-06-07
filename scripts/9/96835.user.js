// ==UserScript==
// @name           Potterfics Fullmode
// @namespace      Potterfics
// @description    Esconde la columna de la derecha en Potterfics
// @include        http://www.potterfics.com/*
// @include        http://potterfics.com/*
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://code.jquery.com/jquery-1.5.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function fullmode(){
	$("body > table:eq(1) tr td:first").ready(function(){
		function setMenu(value){
			var c_value=escape(value);
			document.cookie="pf_hideMenu=" + c_value;
		}

		function getHideMenu(){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++)
			{
			  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			  x=x.replace(/^\s+|\s+$/g,"");
			  if (x=="pf_hideMenu")
				{
				return unescape(y);
				}
			}
		}
		
		var boton = $('body > table:first tr:nth-child(3) td:first');
		if(getHideMenu()){
			$('body > table:eq(1) tr td:first *').hide();
			$('body > table:eq(1) tr td:first').animate({width:"1"},100);
			boton.text("Mostrar Menu");
		}else{
			boton.text("Ocultar Menu");
		}
		boton.css("font-size",10);
		boton.css("text-align","center");
		boton.css("color","#593628");
		
		
		boton.hover(function(){
			boton.css("text-decoration","underline");
		},function(){
			boton.css("text-decoration","none");
		});
		
		boton.click(function(){
			if(getHideMenu()){
				boton.text("Ocultar Menu");
				setMenu("");
				$('body > table:eq(1) tr td:first').animate({width:"194"},600,"swing",function(){
				$('body > table:eq(1) tr td:first *:not(script)').show();
				});
			}
			else{
				boton.text("Mostrar Menu");
				setMenu("true");
				$('body > table:eq(1) tr td:first *').hide();
				$('body > table:eq(1) tr td:first').animate({width:"1"},600);
			}
		});
	});
}
addJQuery(fullmode);
// ==UserScript==
// @name           AntiComentariosMarca
// @version        0.1.3.1
// @namespace      localhost
// @author         Daniel SB
// @description    Ocultar los comentarios de Marca (Marca.com)
// @match          http://www.marca.com/*
// @grant          all
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==


var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {    
	$("#listado_comentarios").toggle();
	$('#comentarios_interior').prepend("<input type='button' value='Mostrar comentarios' status='0' id='btnTCS' onClick='$(\"#listado_comentarios\").toggle(); var status = $(\"#btnTCS\").attr(\"status\"); if (status==0) { $(\"#btnTCS\").attr(\"value\", \"Ocultar comentarios\"); $(\"#btnTCS\").attr(\"status\", \"1\"); } else { $(\"#btnTCS\").attr(\"value\", \"Mostrar comentarios\"); $(\"#btnTCS\").attr(\"status\", \"0\"); }'>");
        var style = $('<style>#btnTCS { margin-top: 10px; -moz-border-radius:5px; -webkit-border-radius:5px; 	-moz-box-shadow:0px 0px 2px rgba(0,0,0,0.4); 	-webkit-box-shadow:0px 0px 2px rgba(0,0,0,0.4); 	color:rgba(0,0,0,0.9); 	text-shadow:1px 1px 0px rgba(255,255,255,0.8); 	border:1px solid rgba(0,0,0,0.5);	background:-webkit-gradient(linear,0% 0%,0% 100%,from(rgba(255,255,255,1)),to(rgba(185,185,185,1))); 	background:-moz-linear-gradient(top,rgba(255,255,255,1),rgba(185,185,185,1)); 	padding:5px 5px 5px 5px; } #btnTCS:hover {	background:rgba(240,240,240,1);}#btnTCS:active, #btnTCS:focus {	background:-webkit-gradient(linear,0% 100%,0% 0%,from(rgba(255,255,255,1)),to(rgba(185,185,185,1)));	background:-moz-linear-gradient(bottom,rgba(255,255,255,1),rgba(185,185,185,1));}</style>');
	$('html > head').append(style);

    
});
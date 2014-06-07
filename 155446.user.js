// ==UserScript==
// @name           AntiComentariosYahoo
// @version        0.1.2.1
// @namespace      localhost
// @author         Daniel SB
// @description    Ocultar los comentarios de Yahoo
// @match          http://*.yahoo.com/*
// @grant          all
// @require        http://code.jquery.com/jquery.min.js
// ==/UserScript==


var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", function() {
var loaded = 0;
    $('.yom-loading#mediacommentsugc_container').bind('DOMNodeRemoved', function(event) {
        if ((event.type == 'DOMNodeRemoved') && (loaded ==  0) && $("#ugccmt-container").is(':visible')) {
            $("#btnTCS").remove();
            $('#mediacommentsugc_container').prepend("<input type='button' value='Mostrar comentarios' status='0' id='btnTCS' onClick='jQuery(\"#ugccmt-container\").slideToggle(); var status = jQuery(\"#btnTCS\").attr(\"status\"); if (status==0) { jQuery(\"#btnTCS\").attr(\"value\", \"Ocultar comentarios\"); jQuery(\"#btnTCS\").attr(\"status\", \"1\"); } else { jQuery(\"#btnTCS\").attr(\"value\", \"Mostrar comentarios\"); jQuery(\"#btnTCS\").attr(\"status\", \"0\"); }'>");   
            $("#ugccmt-container").slideUp();			
            var style = $('<style>#btnTCS { margin-top: 10px; -moz-border-radius:5px; -webkit-border-radius:5px; 	-moz-box-shadow:0px 0px 2px rgba(0,0,0,0.4); 	-webkit-box-shadow:0px 0px 2px rgba(0,0,0,0.4); 	color:rgba(0,0,0,0.9); 	text-shadow:1px 1px 0px rgba(255,255,255,0.8); 	border:1px solid rgba(0,0,0,0.5);	background:-webkit-gradient(linear,0% 0%,0% 100%,from(rgba(255,255,255,1)),to(rgba(185,185,185,1))); 	background:-moz-linear-gradient(top,rgba(255,255,255,1),rgba(185,185,185,1)); 	padding:5px 5px 5px 5px; } #btnTCS:hover {	background:rgba(240,240,240,1);}#btnTCS:active, #btnTCS:focus {	background:-webkit-gradient(linear,0% 100%,0% 0%,from(rgba(255,255,255,1)),to(rgba(185,185,185,1)));	background:-moz-linear-gradient(bottom,rgba(255,255,255,1),rgba(185,185,185,1));}</style>');
            $('html > head').append(style);
            loaded = 1;
        }
    });
});  
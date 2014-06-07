// ==UserScript==
// @name           Nome das Posições(trophy Manager)
// @version 	     1.0
// @description	  Corrigindo o nome das Posições depois da atualização.
// @namespace      http://trophymanager.com
// @include        http://static.trophymanager.com/players/*
// @include        http://www.trophymanager.com/players/*
// @include        http://trophymanager.com/players/*
// @exclude        http://static.trophymanager.com/players/
// @exclude        http://www.trophymanager.com/players/
// @exclude        http://trophymanager.com/players/
// ==/UserScript==
// @version        1.0

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {
    	
	// Modifica o nome das Posições
	$('span.gk:contains("Goleiro")').html('<span class="gk" style="font-size: 1em;">GK </span>');
	$('span.d:contains("Zagueiro")').html('<span class="def" style="font-size: 1em;">D </span>');
	$('span.dm:contains("Volante")').html('<span class="dmid" style="font-size: 1em;">DM </span>');
	$('span.m:contains("Meio-Campista")').html('<span class="mid" style="font-size: 1em;">M </span>');
	$('span.om:contains("Meia Ofensivo")').html('<span class="omid" style="font-size: 1em;">OM </span>');
	$('span.f:contains("Atacante")').html('<span class="fc" style="font-size: 1em;">F </span>');
	$('span.side:contains("Esquerdo")').html('<span class="left" style="font-size: 1em;">L</span>');
	$('span.side:contains("Central")').html('<span class="center" style="font-size: 1em;">C</span>');
	$('span.side:contains("Direito")').html('<span class="right" style="font-size: 1em;">R</span>');
});




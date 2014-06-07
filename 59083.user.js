// ==UserScript==
// e-hentai read better online
// version 0.1
// 2009-10-03
// Copyright (c) 2009, chulian1819
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// WHAT IT DOES:
// Removes inecesary things, go to next picture using right arrow, and to previous using left arrow
// --------------------------------------------------------------------
// @name           e-hentai
// @namespace      e-hentai
// @include        http://e-hentai.org/*
// @include        http://*.e-hentai.org/*
// ==/UserScript==


//GM_log('inicio');

var re_gif = /(.*)(gif)/;

try{
	div_main = document.getElementById('main_div');
	if(!div_main){
		return false;
	}
	document.body.setAttribute('style',"text-align:center;background-color:black;");
	
	
	//limpiar lo q no sirve
	div_basura=document.body.getElementsByTagName('div');
	p_basura=document.body.getElementsByTagName('p');
	i=0
	while(div_basura[i]){
		div_basura[i].style.display = 'none';
		i++;
	}
	i=0
	while(p_basura[i]){
		p_basura[i].style.display = 'none';
		i++;
	}	
	
	div_main = document.getElementById('main_div');
	as=div_main.getElementsByTagName('a');	
	var a_ok;// tag "a" q contiene la imagen 
	i=0;	
	while(as[i]){
		//GM_log(''+as[i].getAttribute('href') );
		imgs=as[i].getElementsByTagName('img');
		//GM_log('# imgs: '+imgs.length );
		src=imgs[0].getAttribute('src');
		//GM_log(i+' src: '+src );		
	    is_gif = re_gif.exec(src);
		if (!is_gif){
			//GM_log(i+' no es gif');
			a_ok=as[i];
			a_ok.setAttribute('id', 'a_ok');
			i=as.length+1;
		}
		i++;	
	}
	
	//basura[0].setAttribute('style', 'height:5px;');
	//basura[0].style.display = 'none';
	
	
	
	
	//mover la imagen arriba
	div = document.createElement('div');
	div.setAttribute( 'style', 'z-index:1;' );
	div.setAttribute( 'align','center' );
	div.appendChild(a_ok);

	//creo bandera para sssaber si cargo el iframe
	input = document.createElement('input');
	input.setAttribute( 'id', 'ok_if' );
	input.setAttribute( 'type','hidden' );
	input.setAttribute( 'value','false' );
	div.appendChild(input);	
	
	document.body.insertBefore(div,document.body.firstChild);
	//main_div.style.display = 'none';
	
	document.addEventListener('keypress', 
		function(event) { 
			//console.info(event.keyCode);
			if(event.keyCode == 39) { next(); }
			if(event.keyCode == 37) { history.back(); }
			
		}
		, true);

	function next(){
		GM_log('next');
		input=document.getElementById('ok_if');
		GM_log('iframe cargado? '+input.value);
		
		if(input.value!="true"){
			GM_log('iframeno  cargado: '+input.value);
			//input.value="next";
			GM_log('next automatico: '+input.value);
			return false;
		}
		a_ok = document.getElementById('a_ok');
		location.href=a_ok.getAttribute('href');
	}

	function runPrefetch() {		
		if( top != self )
		{	
			input=parent.document.getElementById('ok_if');
			input.value=true;
			document.body.setAttribute('style',"text-align:center;background-color:#00FF80;");
			//parent.inext();
			return false;
		}
		//GM_log('inserto iframe');
		a_ok = document.getElementById('a_ok');
		href=a_ok.getAttribute('href');
				
		iframe = document.createElement('iframe');
		iframe.setAttribute( 'src', href );
		iframe.style.height = '10px';
		iframe.style.width = '700px';
		
		document.body.appendChild(iframe);		
		console.info('insertado');
	
	}	
	window.addEventListener('load',runPrefetch, false);
		
}catch(e){
	GM_log(e);
}


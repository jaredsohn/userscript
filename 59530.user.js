// ==UserScript==
// Clean read Mangafox
// version 1.3
// 2009-10-03
// Copyright (c) 2009, chulian1819
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// @name           Clean read Mangafox
// @namespace      cleanread_mangafox
// @description    Removes inecesary things, fits image, prefech, go to next picture using right arrow, and to previous using left arrow
// @version        1.3
// @include        http://www.mangafox.com/manga/*/v*/c*
// @include        http://www.mangafox.com/manga/*/*
// ==/UserScript==
///////////////////////////////////////////////////
//console.log("inicio");
try{
	img_ok = document.getElementById('image');
	if(!img_ok){
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
	a_ok=img_ok.parentNode;
	a_ok.setAttribute('id', 'a_ok');	
	
	//busco la url de la imagen anterior
	div_main = document.getElementById('top_center_bar');
	as=div_main.getElementsByTagName('a');	
	i=0;	
	while(as[i]){
		if (as[i].getAttribute('class')=="button prev_page"){
			//encontramos el link de la imagen anterior
			a_back=as[i];
			a_back.setAttribute('id', 'a_back');
			GM_log('encontre a_back!');		
			i=as.length+1;
		}
	}
	
	
	//mover la imagen arriba
	div = document.createElement('div');
	div.setAttribute( 'id', 'div1' );
	div.setAttribute( 'style', 'z-index:1;' );
	div.setAttribute( 'align','center' );
	div.appendChild(a_ok);
	
	//creo bandera para saber si cargo el iframe
	input = document.createElement('input');
	input.setAttribute( 'id', 'ok_if' );
	input.setAttribute( 'type','hidden' );
	input.setAttribute( 'value','false' );
	div.appendChild(input);	

	//creo bandera para saber si undi NEXT aun sin cargar el iframe
	input = document.createElement('input');
	input.setAttribute( 'id', 'do_next' );
	input.setAttribute( 'type','hidden' );
	input.setAttribute( 'value','false' );
	div.appendChild(input);	
	
	//creo variable para saber URL del siguiente iframe
	if_next_url = document.createElement('input');
	if_next_url.setAttribute( 'id', 'if_next_url' );
	if_next_url.setAttribute( 'type','hidden' );
	if_next_url.setAttribute( 'value','' );
	div.appendChild(if_next_url);	

	//creo variable para saber la imagen siguiente
	if_img_src = document.createElement('input');
	if_img_src.setAttribute( 'id', 'if_img_src' );
	if_img_src.setAttribute( 'type','hidden' );
	if_img_src.setAttribute( 'value','' );
	div.appendChild(if_img_src);	
	
	//agrego div y img next
	//div next
	div2 = document.createElement('div');
	div2.style.display = 'none';
	div2.setAttribute( 'id','div2' );
	div2.setAttribute( 'align','center' );
	div.appendChild(div2);

	//img next
	img2 = document.createElement('img');
	img2.setAttribute( 'id', 'img2' );
	img2.setAttribute( 'src','' );
	div2.appendChild(img2);	
	
	document.body.insertBefore(div,document.body.firstChild);
	
	document.addEventListener('keypress', 
		function(event) { 
			//console.info(event.keyCode);
			if(event.keyCode == 39) { next(); }
			if(event.keyCode == 37) { back_img(); }
			
		}
		, true);

	function next(){
		GM_log('next');
		if(top!=self){
			return false;
		}
		input=document.getElementById('ok_if');
		GM_log('iframe cargado? '+input.value);
		do_next = document.getElementById('do_next');
		if(input.value!="true"){
			GM_log('iframe no  cargado no cargado!: '+input.value);
			//console.log('DO_NEXT ACTIVADO!iframe no  cargado no cargado!: '+input.value);
			do_next.value=true;
			return false;
		}
		//datos viejos:
		a_ok = document.getElementById('a_ok');
		//console.log("ultimo?"+a_ok.href)
		if(a_ok.href=="javascript:void(0);"){
			//console.log("ultimo! cambio cap!")
			unsafeWindow.next_chapter();
			return false;
		}		
		img_ok = document.getElementById('image');
		img_next = document.getElementById('img2');
		iframe = document.getElementById('precarga');
		back = document.getElementById('back');
		
		div2 = document.getElementById('div2');
		
		//datos nuevos:
		if_next_url=document.getElementById('if_next_url');
		if_img_src=document.getElementById('if_img_src');
		
		//GM_log('img_ok viejo:  '+img_ok.getAttribute('src') );
		//GM_log('guardado en variable:  '+if_img_src.value );

		//actualizo lo viejo
		a_ok.setAttribute('href',if_next_url.value);
		
		img_ok.setAttribute('id','img2'); 
		img_next.setAttribute('id','image'); 
		do_next.value="false";
		//fit image on next
		if(screen.width < img_next.naturalWidth){
			img_next.style.width="100%";
		}else{
			img_next.style.width="";
		}
		
		a_ok.insertBefore(img_next,a_ok.firstChild);
		div2.appendChild(img_ok);
		
		//reinicio la bandera del ifframe y actualizo el iframe
		if(if_next_url.value!="javascript:void(0);"){
			input.value=false;
			iframe.setAttribute('src',if_next_url.value);
		}		
		
		
		//GM_log('img_ok nuevo:  '+img_ok.getAttribute('src') );
		
		//actualizo la imagen anterior
		//pendiente
		scroll(0,0);
		
	}
	function back_img(){
		//console.info('inicio back');
		a_back=document.getElementById('a_back');
		GM_log('back:  '+a_back.getAttribute('href') );
		GM_log('location.href:  '+location.href);
		location.href=a_back.getAttribute('href');
	}

	function runPrefetch() {		
		if( top != self )
		{	
			//actualizo las variables de la pantalla principal
			
			//notifico la carga correcta de la precarga
			input=parent.document.getElementById('ok_if');
			input.value=true;
			document.body.setAttribute('style',"text-align:center;background-color:#00FF80;");
			
			//actualizo las variables de URL siguiente y SRC de la imagen
			top_url=parent.document.getElementById('if_next_url');
			top_img=parent.document.getElementById('if_img_src');
			top_img2=parent.document.getElementById('img2');
			top_back=parent.document.getElementById('a_back');
			img=document.getElementById('image');
			url=document.getElementById('a_ok');
			a_back=document.getElementById('a_back');
			
			
			top_url.value=url.getAttribute('href');
			//top_img.value=img.getAttribute('src');		
			top_img2.setAttribute('src', img.getAttribute('src'));
			if(parent.location.href!=a_back.getAttribute('href')){
				top_back.setAttribute('href', a_back.getAttribute('href'));			
			}
			//console.info('acttualizo back '+a_back.getAttribute('href'));
			
			return false;
		}
		//GM_log('inserto iframe');
		a_ok = document.getElementById('a_ok');
		href=a_ok.getAttribute('href');
				
		iframe = document.createElement('iframe');
		iframe.setAttribute( 'src', href );
		iframe.setAttribute( 'id', 'precarga' );
		iframe.style.height = '10px';
		iframe.style.width = '700px';
		iframe.onlad=check_next;
		
		
		document.body.appendChild(iframe);		
		//console.info('insertado');
	
	}	
	window.addEventListener('load',runPrefetch, false);
		
}catch(e){
	GM_log(e);
}
//fit image on load
window.addEventListener('load', function(){
	image = document.getElementById('image');
	if(screen.width < image.naturalWidth){
		//document.body.appendChild(image);
		document.body.insertBefore(image,document.body.firstChild);
		document.getElementById("image").style.width="100%";
	}else{
		document.getElementById("image").style.width="";
	}

}, false);
function check_next(){
	//console.log('DO_NEXT EJECUTADO!');
	do_next = document.getElementById('do_next');
	if(do_next){
		next();
	}
}
function nada(){
}
//overide native mangafox functions
unsafeWindow.next_page = nada; 
unsafeWindow.enlarge = next; 
unsafeWindow.previous_page = back_img; 

// ==UserScript==
// @name         	subsubmanga mod
// @description    	Boton leer todo y retira publicidad
// @include        	http://submanga.com/*
//Modificado con width original e imágenes clicables para ir al siguiente capítulo.
//Modificado con flechas del teclado funcionales una vez clicado "leer todo" y la tecla enter equivale a clicar en leer todo
//Quitado soporte para submanga.co.uk
//Cambio automático a los servidores de imagenes más veloces
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("http://code.jquery.com/jquery-1.7.1.min.js", function() {

if(document.URL.indexOf("?com=1")<0){
	(function(){
	document.addEventListener('keydown', function(e) {
	  if(e.keyCode) T=e.keyCode;
		if(e.which) T=e.which;
		if(T==13) seteaConfig();
	}, false);
	})();

	jQuery(document).ready(function(){	
		$('.p728td').remove();
		$('.p300h').remove();
		$('.p180').remove();
		$('#t .l').append(' > <a id="leer"  style="color:#fff;font-family: sans-serif;font-size: 10px; padding: 5px 10px;cursor: pointer;	border: 0;    border-radius: 15px;		background: #bf1b04;">leer todo</a> ');
		$('#leer').click(function(event) {seteaConfig()});
	});
}

function seteaConfig(){
	array=$('div > a > img').attr('src').split('/');
	if(array[array.length-1].indexOf("-")>0){
		modo=a=2;
		b=array[array.length-1].split('-');
		array[array.length-1]=b[0]+"-";
		con=parseInt(b[1]);
		con2=1;
	}
	else{
		modo=a=1;
		array[array.length-1]='';
		array[2]='img2.submanga.com';
		con=con2=1;
	}
	url=array.join('/');
	url2=document.URL.split('/');

	var urlEnlace='http://submanga.com/r/'+url2[4]+''+(a==1?"?com=1":"");

	$('#t').next().empty();
	while($("select option[value='"+con2+"']").text()!=''){
		$('#t').next().append('<a href="'+urlEnlace+'"><img src="'+url+con+'.jpg"/></a><br/><br/>');
		if(con==100){break;}
		con+=modo;
		con2++;
	}

	var scriptCode = new Array();

	scriptCode.push('document.onkeydown=M;');
	scriptCode.push('function M(e){');
	scriptCode.push('if(!e) var e=window.event;');
	scriptCode.push('if(e.keyCode) T=e.keyCode;');
	scriptCode.push('if(e.which) T=e.which;');
	scriptCode.push('if(T==37) window.location.href="javascript:history.go(-1)";');
	scriptCode.push('if(T==39) window.location.href="'+urlEnlace+'";');
	scriptCode.push('}');

	var script = document.createElement('script');
	script.innerHTML = scriptCode.join('\n');
	scriptCode.length = 0;

	document.getElementsByTagName('head')[0].appendChild(script);
}

});
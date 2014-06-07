// ==UserScript== 
// @name          citEOL 
// @version       0.3
// @namespace     http://www.elotrolado.net/foro_generales-pruebas_21 
// @description   Crea unos links de acceso directo a los posts donde te han nombrado o quoteado
// @run-at 	  document-end
// @include       http://www.elotrolado.net/* 
// @exclude              

// ==/UserScript== 

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function ponerBotonCita(num,id){
	var lineaBotones = getElementsByClass("search-box");

	var text = "#"+id;
	var input = document.createElement("input");
	if(lineaBotones && input){
		input.setAttribute("type","button");
		input.setAttribute("class","button2");
		input.setAttribute("name",num);
		input.setAttribute("value",num);
		input.setAttribute("id",num);
		input.addEventListener("click",function(){ document.location.href=text; return false;},false); 
		input.setAttribute("title","Saltar a cita numero: "+num);
		lineaBotones[0].appendChild(input);
	}
}

function ponerTexto(){
	var lineaBotones = getElementsByClass("search-box");
	var oStrong = document.createElement("strong");
	oStrong.appendChild(document.createTextNode("Te nombran en: "));
	lineaBotones[0].appendChild(oStrong); 
}
	

function ponerLinksEnPosts(){
	var posts1 = getElementsByClass("post columfixed bg1");
	posts1=posts1.concat(getElementsByClass("post columfixed bg2"));

	var i;
	var autor;
	for(i=0;i<posts1.length;i++){
		comprobarNombrePost(posts1[i].getAttribute("id"));
	}
	
	if(quotesArray.length != 0) {
		ponerTexto();
		quotesArray.sort();
	}

	for(i=0;i<quotesArray.length;i++){
		ponerBotonCita(i+1,quotesArray[i]);
	}
}

function comprobarNombrePost(id){
	var post = document.getElementById(id);
	var link = getElementsByClass("author",getElementsByClass("postbody",post)[0])[0].getElementsByTagName("a")[0];
	var author = getElementsByClass("author",getElementsByClass("postbody",post)[0])[0].getElementsByTagName("a")[1];
	if(author.innerHTML != getNick()){
		link.setAttribute("name",id);
		comprobarQuotePost(id);
	}
}

function getNick(){
	var logout = document.getElementById("logout_cuadrologin").getElementsByTagName("a")[0];
	var cadena = logout.getAttribute("title");
	var nick = cadena.split(" [ ");
	return(nick[1].split(" ]")[0]);
}

function getAuthorNick(){
	var logout = document.getElementById("logout_cuadrologin").getElementsByTagName("a")[0];
	var cadena = logout.getAttribute("title");
	var nick = cadena.split(" [ ");
	return(nick[1].split(" ]")[0]);
}



function comprobarQuotePost(id){
	var post = document.getElementById(id);
	var contenido = getElementsByClass("content",post);
	var texto = contenido[0].textContent;
	if(texto.toLowerCase().indexOf(getNick().toLowerCase()) != -1 ){
		quotesArray.push(id);
	}		
}

function ponerBotonBuscarte(){
	var lineaBotones = getElementsByClass("search-box");
	var form = document.getElementById("topic-search");
	var form2 = document.getElementById("forum-search");
if(form || form2){
	var field = lineaBotones[0].getElementsByTagName("fieldset")[0];
	var input = document.createElement("input");	
	input.setAttribute("type","button");
	input.setAttribute("class","button2");
	input.setAttribute("value","Búscate");
	input.addEventListener("click",function(){
		document.getElementById("search_keywords").value=getNick();
		var form = document.getElementById("topic-search");
		var form2 = document.getElementById("forum-search");
		if(form != null) form.submit();
		if(form2 != null) form2.submit();
		return false;
		},false); 
	input.setAttribute("title","Búscate en el hilo");
	field.appendChild(input);
}
}
var contador = 1;
var quotesArray = new Array();

ponerLinksEnPosts();
ponerBotonBuscarte();

// ==UserScript==
// @name           Monitor de Comentarios Taringa!
// @namespace      taringa
// @description    Devuelve la vieja funcion de monitor de comentarios
// @include        *taringa.net*
// ==/UserScript==

function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char; 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      {
	  Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
        return false;         
      }
   return IsNumber;   
}


function obtenerIdPost()
{
url = document.location.href;
partes = url.split('/');
return(IsNumeric(partes[4])?partes[4]:partes[5])
}


function obtenerNombrePost(){
	var metas=document.getElementsByTagName("meta");
	for(y=0;y<metas.length;y++)
	{
		if(metas[y].getAttribute("name","")=="title")
			return metas[y].getAttribute("content");
	}
}

function agregarALaLista(pid,titulo)
{
	var max=GM_getValue("max",15);
    	var verpost=GM_getValue(pid,0);
	if(!verpost)
		GM_setValue(pid,titulo);
	else
	{
		var guardados=GM_getValue("posts","");
		var postsguardados=guardados.split(',');
		var nuevo="";
		for(x=0;x<postsguardados.length;x++)
		{
			if(postsguardados[x]!=pid)
				nuevo=nuevo+postsguardados[x]+',';
		}
		GM_setValue("posts",nuevo+pid);
		return;
	}
	var guardados=GM_getValue("posts");
	if(!guardados)
	{
		GM_setValue("posts",pid);
		return;
	}
	var postsguardados=guardados.split(',');
	if(postsguardados.length<max)
	{
		GM_setValue("posts",guardados+','+pid);
		return;
	}
	var nuevo="";
	for(x=1;x<postsguardados.length;x++)
	{
		nuevo=nuevo+postsguardados[x]+',';
	}
	GM_deleteValue(postsguardados[0]);
	GM_setValue("posts",nuevo+pid);
}

function borrar(id)
{
	var guardados=GM_getValue("posts");
	if(guardados!=undefined)
	{
	var postsguardados=guardados.split(',');
	var str="";
	for(x=0;x<postsguardados.length;x++)
	{
		postsguardados[x];
		if(postsguardados[x]!=id&&postsguardados[x]!=undefined)
		{
			str+=(str==""?"":",")+postsguardados[x];
		}
	}
	GM_deleteValue(id);
	GM_setValue("posts",str);	
	}
}


var estiloCuadrito="width:235px;background-color:white;position:absolute;left:0px;top:0px;border:1px solid #1E679A;padding:0px;-moz-border-radius:5px;z-index:100;"
var div;//=document.createElement("div");
function cerrarComentarios()
{
	div.setAttribute("style","display:none;")
	div=0;
}

var color="#f8faff";
var divstyle="background-color: "+color+";width:230px;border:1px solid black;padding:2px;";


function mostrarComentarios(e)
{
  if(div) {cerrarComentarios(); return;}
  var algo=e;
  div=document.createElement("div");
  div.setAttribute("style",estiloCuadrito);
  div.style.left=(algo.clientX-10)+"px";
  div.style.top="125px";
  var titulo=document.createElement("div");
  titulo.setAttribute("style","background-color:blue");
  var nuevoB=document.createElement("b");
  nuevoB.innerHTML="Comentarios Taringa! ";
  var nuevaX=document.createElement("span");
  nuevaX.innerHTML=" [X]";
  nuevaX.setAttribute("style","text-align:right;clear:right");
  nuevaX.addEventListener("click",cerrarComentarios,false);
  div.appendChild(nuevoB);
  div.appendChild(nuevaX);


 var cont=document.createElement("div");
 var posts=GM_getValue("posts");
 if(!posts) cont.innerHTML="<div style='font-size:14px;'>No comentaste en ningun post!</div>";    
 else
  {
	var postes=posts.split(',');
	cont=document.createElement("div");
	for(x=postes.length-1;x>=0;x--)
	{
 	var dv = document.createElement("div");
 	dv.setAttribute("style",divstyle); 
 	dv.innerHTML='<a href="http://www.taringa.net/posts/'+postes[x]+'" target="_blank">'+GM_getValue(postes[x])+'</a>';
 	cont.appendChild(dv);
         }
	
   }
  div.appendChild(cont);
  document.body.appendChild(div);
}






var botones=document.getElementsByTagName("input");
for(x=0;x<botones.length;x++)
{
	if(botones[x].getAttribute("value","")=="Enviar Comentario")
	 botones[x].addEventListener("click", function() {
      agregarALaLista(obtenerIdPost(),obtenerNombrePost());
    }, false);
}

var allHTMLTags=document.getElementsByTagName('*');
for (i=0; i<allHTMLTags.length; i++) 
{
    if (allHTMLTags[i].getAttribute("name")=='Monitor')
    {
	var moni=allHTMLTags[i].parentNode;
	var lista=moni.parentNode;
	var nuevoli=document.createElement("li");
	var nuevoa=document.createElement("a");
	var nuevospan=document.createElement("span");
	nuevoa.addEventListener("click",mostrarComentarios,false);
	nuevospan.setAttribute("class","systemicons");
	nuevospan.setAttribute("style","background-position:0 -1298px;");
	nuevoa.appendChild(nuevospan);
	nuevoli.appendChild(nuevoa);
	lista.insertBefore(nuevoli,moni);
	i=allHTMLTags.length;
    }
    	
}
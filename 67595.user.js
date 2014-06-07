// ==UserScript==

// @name           Previsualizar datos posts

// @namespace      taringa

// @description    previsualizar los datos un post al dejar el mouse sobre el link

// @include        *taringa.net/*

// ==/UserScript==



var ancho=310;





var estiloCuadrito="width:"+ancho+"px;background-color:white;position:fixed;left:0px;top:0px;border:1px solid #1E679A;padding:0px;-moz-border-radius:5px;-moz-box-shadow: 2px 2px 5px #999;"

var div=document.createElement("div");



var con;

function verPost(url)

{

  //alert(url);

  con=new XMLHttpRequest();

  con.onreadystatechange = procesarEventos;

  //con.overrideMimeType("text/xml")

  con.open('GET',url, true);

  con.send(null);

}



function procesarEventos()

{

  if(con.readyState == 4)

  {

    var ndiv=document.createElement("div");

    ndiv.innerHTML=con.responseText;

    var autor="";
    var comentarior="";
    var user="";
    var red="powered by 5toDAN";
    var fecha="";
    var bueno="Al loco que hizo esto le borraron el post.";
    var visitas="";
    var favoritos="";
    var puntos="";
    var ultimocoment="Ultimo Comentario: ";
    var comentario="";
    var visitass="Visitas: ";
    var favoritoss="Favoritos: ";
    var puntoss="Puntos: ";
    var comentarios="";
    var c="Comentarios: ";

    var texto="";

    var spanes=ndiv.getElementsByTagName("span");
    var hs=ndiv.getElementsByTagName("h4");
    var as=ndiv.getElementsByTagName("a");
    var divos=ndiv.getElementsByTagName("div");

    if(spanes.length>0)

    {

	for(x=0;x<spanes.length;x++){

         if(spanes[x].getAttribute("property")=="dc:content")

         {

          texto=spanes[x].textContent.substr(0,200);

         }

         if(spanes[x].getAttribute("class")=="given-name")

          autor=spanes[x].textContent;


        }

for(x=0;x<as.length;x++)
{
         if(as[x].getAttribute("class")=="username")

          user=as[x].textContent;
}
         for(x=0;x<spanes.length;x++){

         if(spanes[x].getAttribute("class")=="icons visitas_post")
          visitas=spanes[x].textContent;
         if(spanes[x].getAttribute("class")=="icons favoritos_post")
          favoritos=spanes[x].textContent;
         if(spanes[x].getAttribute("class")=="icons puntos_post")
          puntos=spanes[x].textContent;
}
for(x=0;x<divos.length;x++){

         if(divos[x].getAttribute("class")=="commenttext")
          comentario=divos[x].textContent;
         if(divos[x].getAttribute("class")=="cuerpo_comm")
          comentarior=divos[x].textContent;
         if(divos[x].getAttribute("class")=="floatL metaDataA")
          fecha=divos[x].textContent;
}
for(x=0;x<divos.length;x++){
         if(divos[x].getAttribute("class")=="cuerpo_comm")
          comentarior=divos[x].textContent;
}
    if(hs.length>0) {
	for(x=0;x<hs.length;x++){
         if(hs[x].getAttribute("class")=="titulorespuestas floatL")
{
          comentarios=hs[x].textContent;
          comentarios=comentarios.split(" ");
          comentarios=comentarios[0];

}

}
}


    }
if(autor == "") {

    div.innerHTML="<div style='background-color: #AAFFAA; -moz-box-shadow: 2px 2px 5px #999;'>"+red+"</div><div><div style='background-color:#1E679A;color:white;padding:3px; width:150px; float: left;'-moz-box-shadow: 2px 2px 5px #999; height: 100%;><b>"+autor+"<p style='align:left;'>"+visitass+visitas+"</p><p style='align:left;' >"+puntoss+puntos+"</p><p style='align:left;'>"+favoritoss+favoritos+"</p><p style='align:left;'>"+c+comentarios+"</p></b></div><div style='float:right; width:150px;'><div><p style='background-color:#AAFFAA;'>"+ultimocoment+"</p>"+fecha+"</div><div>"+bueno+"</div></div></div>";   
}else   
{
    div.innerHTML="<div style='background-color: #AAFFAA; -moz-box-shadow: 2px 2px 5px #999;text-align: center;'>"+red+"</div><div><div style='background-color:#1E679A;color:white;padding:3px; width:150px; float: left; -moz-box-shadow: 2px 2px 5px #999; height: 100%;><b>"+autor+"<p style='align:left;'>"+visitass+visitas+"</p><p style='align:left;' >"+puntoss+puntos+"</p><p style='align:left;'>"+favoritoss+favoritos+"</p><p style='align:left;'>"+c+comentarios+"</p></b></div><div style='float:right; width:150px;'><div><p style='background-color:#AAFFAA;'>"+ultimocoment+"</p>"+fecha+"</div><div>"+comentarior+"</div></div></div>";   
}              

  } 

  else 

  {

    if(con.readyState == 3)

    {

       var ndiv=document.createElement("div");

    ndiv.innerHTML=con.responseText;

    var autor="";
    var comentarior="";
    var user="";
    var fecha="";
    var visitas="";
    var favoritos="";
    var puntos="";
    var ultimocoment="Ultimo Comentario: ";
    var comentario="";
    var visitass="Visitas: ";
    var favoritoss="Favoritos: ";
    var puntoss="Puntos: ";
    var comentarios="";
    var c="Comentarios: ";

    var texto="";

    var spanes=ndiv.getElementsByTagName("span");
    var hs=ndiv.getElementsByTagName("h4");
    var as=ndiv.getElementsByTagName("a");
    var divos=ndiv.getElementsByTagName("div");

    if(spanes.length>0)

    {

	for(x=0;x<spanes.length;x++){

         if(spanes[x].getAttribute("property")=="dc:content")

         {

          texto=spanes[x].textContent.substr(0,200);

         }

          if(spanes[x].getAttribute("class")=="given-name")

          autor=spanes[x].textContent;
         if(spanes[x].getAttribute("class")=="icons visitas_post")
          visitas=spanes[x].textContent;

        }

for(x=0;x<as.length;x++)
{
         if(as[x].getAttribute("class")=="username")

          user=as[x].textContent;
}
         for(x=0;x<spanes.length;x++){

         if(spanes[x].getAttribute("class")=="icons visitas_post")
          visitas=spanes[x].textContent;
         if(spanes[x].getAttribute("class")=="icons favoritos_post")
          favoritos=spanes[x].textContent;
         if(spanes[x].getAttribute("class")=="icons puntos_post")
          puntos=spanes[x].textContent;
}
for(x=0;x<divos.length;x++){

         if(divos[x].getAttribute("class")=="commenttext")
          comentario=divos[x].textContent;
         if(divos[x].getAttribute("class")=="cuerpo_comm")
          comentarior=divos[x].textContent;
         if(divos[x].getAttribute("class")=="floatL metaDataA")
          fecha=divos[x].textContent;
}
for(x=0;x<divos.length;x++){
         if(divos[x].getAttribute("class")=="cuerpo_comm")
          comentarior=divos[x].textContent;
}
    if(hs.length>0) {
	for(x=0;x<hs.length;x++){
         if(hs[x].getAttribute("class")=="titulorespuestas floatL")
{
          comentarios=hs[x].textContent;
          comentarios=comentarios.split(" ");
          comentarios=comentarios[0];

}

}
}


    }

    if(autor!="" && texto!="") 

    {


    div.innerHTML="<div style='background-color:#1E679A;color:white;padding:3px; width:150px; float: left;'-moz-box-shadow: 2px 2px 5px #999; height: 100%;><b>"+autor+"<p style='align:left;'>"+visitass+visitas+"</p><p style='align:left;' >"+puntoss+puntos+"</p><p style='align:left;'>"+favoritoss+favoritos+"</p><p style='align:left;'>"+c+comentarios+"</p></b></div><div style='float:right; width:150px;'><div><p style='background-color:#AAFFAA;'>"+ultimocoment+"</p>"+fecha+"</div><div>"+comentarior+"</div></div></div>";                       

      //con.abort();

    }

    else

    div.innerHTML = '<div align="center"><img src="http://i307.photobucket.com/albums/nn309/FlasherMan323/zxpfl5.gif" alt="cargando..."></div>';

    }

    else

    div.innerHTML = '<div align="center"><img src="http://i307.photobucket.com/albums/nn309/FlasherMan323/zxpfl5.gif" alt="cargando..."></div>';

  }

}



function previsualizar(e)

{

  div.setAttribute("style",estiloCuadrito);

  div.style.left=(e.clientX+10)+"px";

  if((e.clientY+10)>((screen.height/5)*3))

  div.style.top=(e.clientY-120)+"px";

  else

  div.style.top=(e.clientY+10)+"px";

  div.innerHTML="CUADRITOP";

  document.body.appendChild(div);

  verPost(e.currentTarget.getAttribute("href"));

}







function cerrarPrev(e)

{

   con.abort();

   div.setAttribute("style","display:none;");

}







var aas=document.getElementsByTagName("a");

var posts=new Array();



for(x=0;x<aas.length;x++)

{

   if(aas[x].getAttribute("href") != null && aas[x].getAttribute("href").indexOf("/posts/")==0 && aas[x].getAttribute("href").indexOf("/posts/novatos/")!=0)

	posts[posts.length]=aas[x];

}



for(x=0;x<posts.length;x++)

{

  posts[x].addEventListener("mouseover",previsualizar,true);

  posts[x].addEventListener("mouseout",cerrarPrev,true);

  posts[x].removeAttribute("title");

}
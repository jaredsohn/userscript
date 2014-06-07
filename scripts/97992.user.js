// ==UserScript==
// @name           postea lo que quieras!
// @namespace      postea
// @description    Script para la comunidad postea lo que quieras
// @include        *taringa.net/*
// @exclude        *http://www.taringa.net/comunidades/postea-lo-que-quieres/*
// ==/UserScript==


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//                                                    //
//               TARINGUEROS CHAPINES!                //
//                  <<<josue5194>>>                   //
//                                                    //
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function byClass(clsName, tag) {
	var arrayElements = new Array();
	if (tag == null){ tag="*";}
	var elements = document.getElementsByTagName(tag);

	for(var i = 0;i < elements.length;i++)
		{
		if(elements[i].className.indexOf(" ") >= 0)
			{
				var classes = elements[i].className.split(" ");
            	for(var j = 0;j < classes.length;j++)
				{
                	if(classes[j] == clsName)
                    arrayElements.push(elements[i]);
            	}
        	}
        	else if(elements[i].className == clsName)
            	arrayElements.push(elements[i]);
    	}

	for (element in arrayElements)
	{
		return arrayElements[element];
	}
}

byClass('menuTabs').innerHTML += "<li id=\"tabbedWTF\" class=\"tabbed\">\n <a href=\"http://www.taringa.net/comunidades/postea-lo-que-quieres/\" onclick=\"menu(\'postea lo que quieras! \', this.href);return false;\" title=\"Ir a la comunidad postea lo que quieras!\">Postea! <img src=\n\"\" alt=\"\" /></a>\n</li>";

var ancho=200;


var estiloCuadrito="width:"+ancho+"px;background-color:white;position:fixed;left:0px;top:0px;border:1px solid #40BF00;padding:0px;-moz-border-radius:5px;"
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
    var texto="";
    var spanes=ndiv.getElementsByTagName("span");
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
    }
    div.innerHTML="<div style='background-color:#40BF00;color:white;padding:3px;'><b>"+autor+"</b></div><div style='padding:3px;'>"+texto+"</div>";                       
  } 
  else 
  {    
    div.innerHTML = '<div align="center"><img src="" alt=""></div>';
  }
}

var intervalo;
var algo;

{
  algo=e;
  intervalo=setInterval(mostrardiv,1000);
  verPost(e.currentTarget.getAttribute("href"));
}

function mostrardiv(){
  clearInterval(intervalo);
  div.setAttribute("style",estiloCuadrito);
  div.style.left=(algo.clientX+10)+"px";
  if((algo.clientY+10)>((screen.height/5)*3))
  div.style.top=(algo.clientY-120)+"px";
  else
  div.style.top=(algo.clientY+10)+"px";
  document.body.appendChild(div);    
}



function cerrarPrev(e)
{
   clearInterval(intervalo);
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



// ==UserScript==
// @name           copiarReportes
// @namespace      -
// @description    -
// @include        http://*.guerrastribales.es/*report&mode=*
// ==/UserScript==

var madera = 0;
var hierro = 0; 
var barro = 0;
var temp;
var resto;
var hay_madera = 0;
var hay_barro = 0;
var hay_hierro = 0;
var temp;
var ultimo;
var url = "";
link = document.createElement("a");
div_defensor = document.createElement("div");
div_botin = document.createElement("div");
link.target="_blank";
link.innerHTML="<br /><br />Enviar informe";


todo = document.getElementsByTagName("html");
div_defensor=document.getElementById("attack_info_def");
div_botin=document.getElementById("attack_spy");

if(div_botin.innerHTML.indexOf("graphic/holz.png?1")!=-1)
	hay_madera=1;
if(div_botin.innerHTML.indexOf("graphic/lehm.png?1")!=-1)
	hay_barro=1;
if(div_botin.innerHTML.indexOf("graphic/eisen.png?1")!=-1)
	hay_hierro=1;

temp = document.createElement("table");
temp = document.getElementById("attack_info_def_units");
temp = temp.getElementsByTagName("tr")[1];
lanceros = temp.getElementsByTagName("td")[1].innerHTML;
espadas = temp.getElementsByTagName("td")[2].innerHTML;
hachas = temp.getElementsByTagName("td")[3].innerHTML;
espias = temp.getElementsByTagName("td")[4].innerHTML;
ligeras = temp.getElementsByTagName("td")[5].innerHTML;
pesadas = temp.getElementsByTagName("td")[6].innerHTML;
arietes = temp.getElementsByTagName("td")[7].innerHTML;
catapultas = temp.getElementsByTagName("td")[8].innerHTML;
paladin = temp.getElementsByTagName("td")[9].innerHTML;
noble = temp.getElementsByTagName("td")[10].innerHTML;

//IP provisional para pruebas.
url = "http://kestaslame.es/tw/insertar2.php?l="+lanceros+"&e="+espadas+"&h="+hachas+"&sp="+espias+"&li="+ligeras+"&p="+pesadas+"&a="+arietes+"&c="+catapultas+"&pa="+paladin+"&n="+noble;

if(hay_madera)
{
	temp = div_botin.innerHTML.indexOf("Madera");
	temp = div_botin.innerHTML.substring(temp);
	temp = temp.replace('<span class="grey">.</span>','.');
	madera = temp.indexOf('<');
	madera_inicio = temp.indexOf(">");
	madera=temp.substring(madera_inicio+1,madera).trim();
}
if(hay_barro)
{
	temp = div_botin.innerHTML.indexOf("Barro");
	temp = div_botin.innerHTML.substring(temp);
	temp = temp.replace('<span class="grey">.</span>','.');
	barro = temp.indexOf('<');
	barro_inicio = temp.indexOf(">");
	barro=temp.substring(barro_inicio+1,barro).trim();
}
if(hay_hierro)
{
	temp = div_botin.innerHTML.indexOf("Hierro");
	temp = div_botin.innerHTML.substring(temp);
	temp = temp.replace('<span class="grey">.</span>','.');
	hierro = temp.indexOf("<");
	hierro_inicio = temp.indexOf(">");
	hierro=temp.substring(hierro_inicio+1,hierro).trim();
}

url = url+"&madera="+madera+"&barro="+barro+"&hierro="+hierro;

temp = document.getElementById("attack_spy");
temp = temp.getElementsByTagName("tr")[1];
temp = temp.getElementsByTagName("td")[0];


i=0;
if(temp.innerHTML.indexOf("Edificio")!=-1)
	url = url+"&ep="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Cuartel")!=-1)
	url = url+"&cuartel="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
	
if(temp.innerHTML.indexOf("Cuadra")!=-1)
	url = url+"&cuadra="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Taller")!=-1)
	url = url+"&taller="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Corte")!=-1)
	url = url+"&corte="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
	
if(temp.innerHTML.indexOf("Herrería")!=-1)
	url = url+"&he="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
	
if(temp.innerHTML.indexOf("Plaza de reuniones")!=-1)
	url = url+"&reu="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Estatua")!=-1)
	url = url+"&esta="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Plaza del mercado")!=-1)
	url = url+"&mer="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Leñador")!=-1)
	url = url+"&len="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Barrera")!=-1)
	url = url+"&ba="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
	
if(temp.innerHTML.indexOf("Mina de hierro")!=-1)
	url = url+"&hie="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
	
if(temp.innerHTML.indexOf("Granja")!=-1)
	url = url+"&g="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Almacén")!=-1)
	url = url+"&al="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Escondrijo")!=-1)
	url = url+"&esc="+temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");

if(temp.innerHTML.indexOf("Muralla")!=-1)
	url = url+"&mu="+ temp.getElementsByTagName("b")[i++].innerHTML.replace("(Nivel ","").replace(")","");
		

temp = document.getElementById("attack_info_def");
if(temp.getElementsByTagName("a")[1] == null)
{
	url = url+"&duenyo=Bárbaros";
	pueblo = temp.getElementsByTagName("a")[0].innerHTML.trim();
}
else
{

	url = url+"&duenyo="+temp.getElementsByTagName("a")[0].innerHTML.trim();
	pueblo = temp.getElementsByTagName("a")[1].innerHTML.trim();
}
//Tribu.
url = url+"&tribu="+temp.getElementsByTagName("a")[0].title;

//Coordenadas(1).
ultimo = 0;
while(pueblo.indexOf("(",ultimo+1)!=-1)
	ultimo = pueblo.indexOf("(");

//Continente.
url = url+"&conti="+pueblo.substring(pueblo.indexOf(")",ultimo)+1).trim().replace("C","");
//Coordenadas(2).
url = url+"&coor="+pueblo.substring(pueblo.indexOf("(",ultimo)+1,pueblo.indexOf(")",ultimo));
//Pueblo.
url = url+"&np="+pueblo.substring(0,ultimo).trim();

//Hora.
i=0;

while(document.getElementsByClassName("vis")[i]!=null)
{
	if(document.getElementsByClassName("vis")[i].innerHTML.indexOf("Enviado")!=-1)
	{
		ultimo = document.getElementsByClassName("vis")[i].innerHTML.indexOf("Enviado");
		hora = document.getElementsByClassName("vis")[i].innerHTML.substring(ultimo,ultimo+30);
		hora = hora.replace("Enviado</td><td>","");
		url = url+"&hora="+hora;
		break;
	}
	i++;
}		
link.href=url;
i=0;
while(document.getElementsByTagName("body")[0].getElementsByTagName("a")[i].innerHTML.indexOf("Borrar")==-1)
	i++;
	
document.getElementsByTagName("body")[0].getElementsByTagName("a")[i].parentNode.appendChild(link);

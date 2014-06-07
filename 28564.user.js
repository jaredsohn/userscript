// ==UserScript==
// @name          Arrival time of the attacks, blockades, transports and bet troops and fleets in Ikariam.  v0.3
// @namespace     http://
// @description	  Tiempo de llegada de los ataque en Ikariam  
// @include	 http://*.ikariam.*/index.php?view=plunder*
// @include	 http://*.ikariam.*/index.php?view=blockade*
// @include  http://*.ikariam.*/index.php?view=transport*
// @include  http://*.ikariam.*/index.php?view=deployment*
// ==/UserScript==

//Script creado por Elsanto510

//variable global para el texto
var hora_llegada;
var aux1;

//funcion para el idioma
function idioma() {
	if (navigator.userAgent.indexOf("Opera")!=-1) (language=navigator.language)
	else { if (navigator.appName == "Netscape") (language=navigator.language)
	else language=navigator.browserLanguage };

	if (language){
		language=language.substring(0,2)
	}
	else {
		language="en"
	}

	switch (language) {
		//case "en" : hora_llegada="Arrival Time"; break;
		case "en" : hora_llegada="Arrival Time"; break;
		case "es" : hora_llegada="Hora de llegada"; break;
		case "fr" : hora_llegada="Heure d'arrivA©e"; break;
		case "it" : hora_llegada="L'orario di arrivo"; break;
		case "pt" : hora_llegada="Hora de chegada"; break;
		case "de" : hora_llegada="Ankunftszeit"; break;
		case "tr" : hora_llegada="Geri DA¶nA1s"; break;	
		case "pl" : hora_llegada="Czas Przybycia"; break;	
		case "ru" : hora_llegada="?’N€?µ?1N? ??N€?¸?±N‹N‚?¸N?"; break;
		default : hora_llegada="Arrival Time" 
	} 
}


//aumentamos 1 seg hh:mm:ss
function aumentar(){
	
	var tiempo=aux1;

	var res_h= 0;
	var res_m= 0;
	var res_s= 0;
	
	//sacamos la hora, min y seg	
	str_h=new String(tiempo).substring(0,3);
	if (str_h[0]=="0"){
		str_h=str_h[1];
	}

	str_m=new String(tiempo).substring(3,5);
	if (str_m[0]=="0"){
		str_m=str_m[1];
	}

	str_s=new String(tiempo).substring(6,9);
	if (str_s[0]=="0"){
		str_s=str_s[1];
	}

	res_h= parseInt(str_h);
	res_m= parseInt(str_m);
	res_s= parseInt(str_s)+1; //sumamos a los segundos
	
	//document.getElementById("elsanto510").innerHTML=res_h+"-"+res_m+"-"+res_s;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;
		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	var ret = res_h+":"+res_m+":"+res_s;
	aux1=ret;

	document.getElementById("elsanto510").innerHTML=ret;

	setTimeout(aumentar, 1000); 
}


//funcion que suma el tiempo
function sumar_tiempo(tiempo){

	//sacamos la hora actual
	var localTime = new Date();

	var hora = localTime.getHours();
	var min = localTime.getMinutes();
	var seg = localTime.getSeconds();

	//var ret = hora+"h "+min+"m "+seg+"s";

    //miramos si el tiempo tiene horas, min y segundos.
	var Bhora = false;
	var Ihora = 0;
	var Bmin = false;
	var Imin = 0;
	var Bseg = false;
	var Iseg = 0;

	//sacamos la hora, min y segundos del tiempo
	//el tiempo[47] es > del final del span, maximo de caracteres 11

	var ret = tiempo[47];

	var i = 48;
	var aux_i = 48;
	var finish=false;

    while(!finish){
		if (tiempo[i]=="h")
		{
			Bhora=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Ihora= parseInt(aux);			

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if (tiempo[i]=="m")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}

			Imin= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 

		}
			
		if (tiempo[i]=="s")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Iseg= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if ((i==59) || (tiempo[i]=="<")) //maximo 11 + 48 == 11  or el principio del div
		{
			finish=true;
		}

		i++;

	}

	var res_h= hora + Ihora;
	var res_m= min + Imin;
	var res_s= seg + Iseg;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;
		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	ret = res_h+":"+res_m+":"+res_s;

	return ret;

}

//cuerpo del main
function main(){
	allElements = document.getElementsByTagName('div');

	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
	
		if (thisElement.className=='journeyTime')
			{
			thisElement.style.color = "#0000ff";

			var aux = thisElement.innerHTML;

			//var aux1 = sumar_tiempo(aux);
			aux1 = sumar_tiempo(aux);

			var aux2 = "\t <font color=#ff0000><b>"+hora_llegada+": </b></font><span id=\"elsanto510\">"+aux1+"</span>";
	
			thisElement.innerHTML+=aux2
			}
	}

	//setTimeout('aumentar(aux1)',1000);
	setTimeout(aumentar,1000);
}

idioma();
main();

///// End of script /////
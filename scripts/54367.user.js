// ==UserScript==

// @name           Bitefight. Combates

// @namespace      Bitefight

// @include        http://s*bitefight*/report/*

// @version        1.1.9

// ==/UserScript==





//Obtenemos el servidor de la url

var urlServidor=document.domain;

var pos=urlServidor.indexOf('.');

var servidor=urlServidor.substr(1,pos-1);

var capa=document.getElementById('content');

var tabla=capa.getElementsByTagName('table')[1].childNodes[1];



if(document.getElementById('fighter_details_attacker')) {

	//Quitamos las imágenes de arriba

	organizarImagenesN('fighter_details_attacker');

	organizarImagenesN('fighter_details_defender');

} else {

	var enlace=document.createElement('a');

	enlace.href="javascript:history.back(-1);";

	enlace.innerHTML="Retroceder";

	capa.childNodes[1].parentNode.insertBefore(enlace,capa.childNodes[1]);



	var capa=document.getElementById('content');

	var tabla=capa.getElementsByTagName('table')[1].childNodes[1];



	var enlace=document.createElement('a');

	enlace.href="javascript:history.back(-1);";

	enlace.innerHTML="Retroceder";



	capa.childNodes[1].parentNode.insertBefore(enlace,capa.childNodes[1]);



	//Quitamos las imágenes de arriba

	tabla.childNodes[2].style.display='none';



	//Imagenes de la izquierda

	//organizarImagenesA(1);
	organizarImagenesA('fighter_details_attacker');



	//Imagenes de la derecha

	//organizarImagenesA(5);
	organizarImagenesA('fighter_details_defender');

}



function organizarImagenesN(capa)

{

	var capa=document.getElementById(capa);
	var tbLogo=capa.getElementsByTagName('table')[0];

	tbLogo.getElementsByTagName('tr')[1].style.display='none';
	var obj=capa.childNodes[5];

	var tbEquipo=capa.childNodes[7];

	var oImg=tbEquipo.getElementsByTagName('img');

	if(oImg.length>0) {

		var imagenes=[];

		var td=[];

		var tr=[];

		for(i=0;i<7;i++) {

			td[i]=document.createElement('td');

			td[i].setAttribute('colspan',2);

			tr[i]=document.createElement('tr');

		}



		var iFila=0;

		var iAnchoImg=0;

		for(i=0;i<oImg.length;i++) {

			imagenes[i]=oImg[i].cloneNode(false);

			var ancho=75;

			try {

				var sTipo=oImg[i].src.split('/')[oImg[i].src.split('/').length-2];

				if (sTipo=='1') {

					ancho=150;

				} else if (sNombre=='seal') {

					ancho=35;

				} else {

					ancho=75;

				}	

			} 

			catch (e) { }

			if(iAnchoImg+ancho>300) {

				tr[iFila].appendChild(td[iFila]);

				iFila++;

				iAnchoImg=0;

			}

			imagenes[i].width=ancho;

			td[iFila].appendChild(imagenes[i]);

			iAnchoImg+=ancho;

		}

		tr[iFila].appendChild(td[iFila]);

		for(i=0;i<=iFila;i++) {

			obj.appendChild(tr[i]);	

		}

	}

	tbEquipo.style.display='none';

}



function organizarImagenesA(numero) {

	//Ocultamos la fila de las imágenes

	tabla.childNodes[6].childNodes[numero].getElementsByTagName('table')[0].style.display='none';



	//Movemos y modificamos el tamaño de las imágenes

	var obj=tabla.childNodes[6].childNodes[numero];

	var oImg=tabla.childNodes[6].childNodes[numero].getElementsByTagName('img');

	if (oImg.length>0) {

		var imagenes=[];

		var td=[];

		var tr=[];

		for(i=0;i<7;i++) {

			td[i]=document.createElement('td');

			tr[i]=document.createElement('tr');

		}



		var iFila=0;

		var iAnchoImg=0;

		for(i=0;i<oImg.length;i++) {

			imagenes[i]=oImg[i].cloneNode(false);

			var ancho=75;

			try {

				var sNombre=oImg[i].src.split('/')[oImg[i].src.split('/').length-1];

				if (sNombre.substr(0,2)=='1_') {

					ancho=150;

				} else if (sNombre.substr(0,4)=='seal') {

					ancho=35;

				} else {

					ancho=75;

				}	

			} 

			catch (e) { }

			if(iAnchoImg+ancho>300) {

				tr[iFila].appendChild(td[iFila]);

				iFila++;

				iAnchoImg=0;

			}

			imagenes[i].width=ancho;

			td[iFila].appendChild(imagenes[i]);

			iAnchoImg+=ancho;

		}

		tr[iFila].appendChild(td[iFila]);

		for(i=0;i<=iFila;i++) {

			obj.appendChild(tr[i]);	

		}

	}

}


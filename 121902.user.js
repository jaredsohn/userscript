// ==UserScript==
// @name           Faccinator - PersonalYze Black
// @namespace      Faccinator - PersonalYze Black
// @include        http://forum.travian.*
// ==/UserScript==




//Creazione array (non modificare)
var immagini_personalizzate = new Array ();




//Istruzioni per 'Aggiunta faccine'
//Inserire al posto di ###link### l' URL della faccina
//Se si vogliono altre faccine, basterà copiare una delle righe del codice contenente la faccina
//es.: immagini_personalizzate.push('###link###') e seguire il primo passo delle istruzioni




//Aggiunta delle faccine personalizzate, seguire la guida qui sopra.
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/00.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/asd.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/osd.png');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/roar.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/zizi.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/look.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/01.gif');
immagini_personalizzate.push('http://img716.imageshack.us/img716/8585/76541193.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/06.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/05.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_004.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_011.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_015.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_008.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_003.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_027.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_018.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_001.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_005.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/aiwebs_016.gif');
immagini_personalizzate.push('http://frixia.altervista.org/smilies/nono.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/02.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/09.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/asd/30.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/04.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/14.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/11.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/15.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/asd/24.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/23.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/21.gif');
immagini_personalizzate.push('http://sviluppotravian.altervista.org/faccinator/images/24.gif');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');




//Gestione grafica
var versione_fac = "PersonalYze for FluidBlack";
var voglio_che_mi_segua = "si";
var colore_sfondo = "black";
var distanza_alto = "+200px";
var immagine_sfondo = "url(http://img834.imageshack.us/img834/4788/sfondofacpersonalyze.png)"; //attenti all'url()
var abilita_sfondo = "si";
var meno_a = "http://img215.imageshack.us/img215/5959/0032x322.gif";
var piu_a = "http://img830.imageshack.us/img830/6767/0032x32.gif";




//Creazione array (non modificare)
var immagini = new Array ();




//Decompressione immagini personalizzate
var contenuto = "";
for (var i = 0; i < immagini_personalizzate.length; i++)
{
if(immagini_personalizzate[i].length > 13) //13 caratteri è la lunghezza minima per accettare una immagine
	contenuto+= "<img onclick='scrivi(this.src)' src=" + immagini_personalizzate[i] + "></img>";
}












//Compressione contenuto ed eliminazione imperfezione
for (var i = 0; i < immagini.length; i++)
{
if(immagini[i].length > 10)
	contenuto+= immagini[i];
}








//Creazione del box controllo
var controllo = '<div id="controllobox" style="overflow: auto; background-color: transparent; margin: 20px; height: 190px; border: 0px dashed white; "  >  ' +
contenuto +
 ' </div><div style="margin-top: 0px; margin-left: 240px; font-size: x-small;" id="spam"><a style="color: white;" href="http://2.bp.blogspot.com/_nIBfM-fEYb4/TT3n9Zn2XDI/AAAAAAAAAno/4ut7rTHuSlY/s1600/fonzie_henry_winkler_happy_days.jpg" target="_blank">By Fonza</a></div>';












//Implemento una funzione
	function getElementsByClass( searchClass, domNode, tagNames) {
	if (domNode == null) domNode = document;
	if (tagNames == null) tagNames = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagNames);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}
















//Creo uno Script che andrà ad aggiungersi all'head
    var scriptCode = new Array(); 
	var m = 'var meno = "' + meno_a + '";' ;	
	var p = 'var piu = "' + piu_a + '";' ;	
	scriptCode.push(m);
	scriptCode.push(p);
    scriptCode.push('function scrivi(argomento){'        );
    scriptCode.push('  document.getElementById("copiaggio").value="[IMG]" + argomento + "[/IMG]";    '  );
	scriptCode.push('  document.getElementById("copiaggio").select();    '  );
	//scriptCode.push('  document.getElementsByTagName("textarea")[0].value=document.getElementById("copiaggio").value;   '  );
	//	scriptCode.push('  document.getElementsByTagName("textarea")[0].select();  '  );
	//scriptCode.push('   alert( document.getElementsByTagName("textarea")[0].value);  '  );	
    scriptCode.push('   }   '  );	




	
	
	
    scriptCode.push('function chiudi(){'        );
    scriptCode.push('  if(  document.getElementById("faccinator5").style.width== "300px" )   '  );	
	    scriptCode.push('   {   '  );	
    scriptCode.push('  document.getElementById("faccinator5").style.width="42px";    '  );
    scriptCode.push('  document.getElementById("button").src = piu;    '  );
	scriptCode.push('  document.getElementById("controllobox").style.display = "none";    '  );	
	    scriptCode.push('   }   '  );	
	scriptCode.push('  else   '  );	
		    scriptCode.push('   {   '  );	
    scriptCode.push('  document.getElementById("faccinator5").style.width="300px";    '  );
	scriptCode.push('  document.getElementById("controllobox").style.display = "block";    '  );	
    scriptCode.push('  document.getElementById("button").src = meno;    '  );
		    scriptCode.push('   }   '  );
    scriptCode.push('   }   '  );	




//Aggiunto all'head
    var script = document.createElement('script');    
    script.innerHTML = scriptCode.join('\n');         
    scriptCode.length = 0;                              
    document.getElementsByTagName('head')[0].appendChild(script); 
	




//Inserisco la parte che visualizzerà l'url completo di tag IMG	
	var versione = "<img id=\"button\" style=\"margin: 5px;\" onclick=\"chiudi();\" src ='##'></img><input style=\" margin-left: 26px; width: 190px; border: 0px solid black; padding: 8px; background: transparent; border-bottom: 0px solid white; font-weight: bold; text-align: center; color: white;\" type=\"text\" id=\"copiaggio\" value=\".: " + versione_fac + " :.\">";

	
	
	
//Istruzioni per 'Creazione grafica'
//Per modificare la curvatura degli angoli del box, scorrere alle righe 242, 243 e 244
//Modificare '2em' con un valore 'xem' dove x è un valore compreso fra 0 ( angolo retto ) e 2 ( molto ricurvo )
//Attenzione: si possono inserire anche valori decimali, ad esempio: '1,5em'
//Attenzione: '2em' è ripetuto 4 volte in quanto ogni valore rappresenta un angolo del box
//Attenzione: affinché il vostro Faccinator sia visualizzabile su tutti i browser, dovrete cambiare tutte e tre le righe citate sopra
	



//Creazione grafica
body = document.body;
	div = document.createElement("div");
	div.style.position = "fixed";
	div.id="faccinator5";
	div.style.top = distanza_alto;
	div.style.right = "+0px";
		if(abilita_sfondo ==  "si")
			div.style.background = immagine_sfondo;
	div.style.backgroundColor = colore_sfondo;
	//div.style.borderLeft = "2px solid black";
//	div.style.borderTop = "2px solid black";
	//div.style.borderBottom = "2px solid black";	
	div.style.boxShadow ="2px 2px 20px 2px grey";
	div.style.marginRight = "-4px";			
	div.style.height = "300px";
	div.style.width = "300px";
	div.style.padding = "0px";
	div.style.display = "block";
	
div.style.borderRadius = '2em 2em 2em 2em'; // standard
div.style.MozBorderRadius = '2em 2em 2em 2em';// Mozilla
div.style.WebkitBorderRadius = '2em 2em 2em 2em'; // WebKit




	div.innerHTML = versione+controllo;
	body.appendChild(div);
	
	
//provo a capire se stiamo rispondendo a un messaggio o modificandolo, oppure iniziamo una nuova discussione
var stringamadre = location.href;
var da_cercare= "newreply";
var count = 0;
for (var i = 0; i <= stringamadre.length - da_cercare.length; i++)
{
    if (stringamadre.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}




var da_cercare= "editpost";
for (var i = 0; i <= stringamadre.length - da_cercare.length; i++)
{
    if (stringamadre.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}




var da_cercare= "newthread";
for (var i = 0; i <= stringamadre.length - da_cercare.length; i++)
{
    if (stringamadre.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}








//Applico la chiusura o apertura del box
if(count > 0)
{
document.getElementById("faccinator5").style.width="300px";
document.getElementById("button").src= meno_a;
document.getElementById("controllobox").style.display = "block";
}
else
{
if(voglio_che_mi_segua == "si"){
//lo faccio apparire di lato
document.getElementById("faccinator5").style.width="42px";
document.getElementById("button").src= piu_a;
document.getElementById("controllobox").style.display = "none";
}
else
{
//lo nascondo
document.getElementById("faccinator5").style.width="0px";
document.getElementById("button").src= piu_a;
document.getElementById("controllobox").style.display = "none";
}
}






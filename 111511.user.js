// ==UserScript==
// @name           Faccinator 5.5
// @namespace      Faccinator 5.5
// @include        http://forum.travian.*
// ==/UserScript==


//Creazione array, non modificare
var immagini_personalizzate = new Array ();

//Istruzioni
//Scegliere "si" oppure "no" per attivare o disattivare le categorie di emoticon
//Per aggiungere delle faccine personalizzate, incollate l'url qui sotto, al posto di ###link###
//Se volete aggiungerne altre, fate copia incolla di immagini_personalizzate.push('###link###');
//Se volete cancellarle, eliminate la guida

//Aggiunta personalizzata delle immagini! Inserisci l'url della tua faccina al posto di ###link###
immagini_personalizzate.push('http://www.secretfour.com/style_emoticons/default/emoticon-cartoon-002.gif');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');

//Gestione categoria default emoticon
var abilita_faccine_omg_gialle = "si";
var numero_default = "27"; //numero di emoticon che si vogliono visualizzare. MAX 27
var madre_faccine_default_link = "http://sviluppotravian.altervista.org/faccinator/images/";

// Gestione emoticon di http://emoticonforum.altervista.org/_altervista_ht/faccine/index_faccine.htm
var abilita_faccine_emoticonforum = "si";
var madre_faccine_emoticonforum_link = "http://emoticonforum.altervista.org/_altervista_ht/faccine/";

//Gestione prima categoria emoticon
var sottocategoria_faccine_emoticonforum_1 = "asd";
var numero_sottocategoria_1 = "25"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_1 = "si";

//Gestione seconda categoria emoticon
var sottocategoria_faccine_emoticonforum_2 = "banane";
var numero_sottocategoria_2 = "25"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_2 = "si";

//Gestione terza categoria emoticon
var sottocategoria_faccine_emoticonforum_3 = "affettuose";
var numero_sottocategoria_3 = "25"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_3 = "no";

//Gestione grafica
var colore_sfondo = "#bee3ff";
var distanza_alto = "+200px";
var immagine_sfondo = "url(http://i53.tinypic.com/1mcg1.png)"; //attenti all'url()
var abilita_sfondo = "si";
var meno = "http://www.san-gabriele.it/images/legenda/meno.png";
var piu = "http://www.san-gabriele.it/images/legenda/piu.png";


/******************FINE PARTE MODIFICABILE DALL'UTENTE*************************/

//creazione array, non modificare
var immagini = new Array ();

//decompressione immagini personalizzate
var contenuto = "";
for (var i = 0; i < immagini_personalizzate.length; i++)
{
if(immagini_personalizzate[i].length > 13) //13 caratteri è la lunghezza minima per accettare una immagine
	contenuto+= "<img onclick='scrivi(this.src)' src=" + immagini_personalizzate[i] + "></img>";
}

//aggiunta faccine default
if(abilita_faccine_omg_gialle == "si")
for(var i=0;i<numero_default  ;i++)
{
i_aus = i;
if(i<10)
	i_aus = "0" + i_aus;
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_default_link + i_aus + ".gif" + "></img>");
}

//aggiunta faccine prima cat
if(attiva_sottocategoria_1 == "si")
for(var i=1; i < numero_sottocategoria_1 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_1 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine seconda cat
if(attiva_sottocategoria_2 == "si")
for(var i=1; i < numero_sottocategoria_2 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_2 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine terza cat
if(attiva_sottocategoria_3 == "si")
for(var i=1; i < numero_sottocategoria_3 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_3 + "/" + i + ".gif" + "></img>");
}


//compressione contenuto ed eliminazione imperfezione
for (var i = 0; i < immagini.length; i++)
{
if(immagini[i].length > 10)
	contenuto+= immagini[i];
}


//creazione box controllo
var controllo = '<div id="controllobox" style="overflow: auto; background-color: #F4F4F4; margin: 20px; height: 190px; border: 2px dashed white; "  >  ' +
contenuto +
'  </div><div style="margin-top: -15px; margin-left: 170px; font-size: x-small;" id="spam"><a style="color: white;" href="http://www.sviluppotravian.altervista.org" target="_blank">iosviluppotravian.tk</a></div>';





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
	 scriptCode.push('var meno = "http://www.san-gabriele.it/images/legenda/meno.png";'        );
	 scriptCode.push('var piu = "http://www.san-gabriele.it/images/legenda/piu.png";'        );
    scriptCode.push('function scrivi(argomento){'        );
    scriptCode.push('  document.getElementById("copiaggio").value="[IMG]" + argomento + "[/IMG]";    '  );
	scriptCode.push('  document.getElementById("copiaggio").select();    '  );
    scriptCode.push('   }   '  );	

    scriptCode.push('function chiudi(){'        );
    scriptCode.push('  if(  document.getElementById("faccinator5").style.width== "300px" )   '  );	
	    scriptCode.push('   {   '  );	
    scriptCode.push('  document.getElementById("faccinator5").style.width="30px";    '  );
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
	var versione = "<img id=\"button\" style=\"margin: 5px;\"  onclick=\"chiudi();\" src ='##'></img><input style=\" margin-left: 26px; width: 190px; border: 0px solid black; padding: 8px; background: transparent; border-bottom: 1px solid white; font-weight: bold; text-align: center; color: #eee;\" type=\"text\" id=\"copiaggio\" value=\".: Faccinator 5.5 :.\">";

//creazione grafica
body = document.body;
	div = document.createElement("div");
	div.style.position = "fixed";
	div.id="faccinator5";
	div.style.top = distanza_alto;
	div.style.right = "+0px";
		if(abilita_sfondo ==  "si")
			div.style.background = immagine_sfondo;
	div.style.backgroundColor = colore_sfondo;
	div.style.borderLeft = "2px solid white";
	div.style.borderTop = "2px solid white";
	div.style.borderBottom = "2px solid white";	
	div.style.marginRight = "-4px";			
	div.style.height = "275px";
	div.style.width = "300px";
	div.style.padding = "0px";
	div.style.display = "block";
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


//applico la chiusura o apertura del box
if(count > 0)
{
document.getElementById("faccinator5").style.width="300px";
document.getElementById("button").src= meno;
document.getElementById("controllobox").style.display = "block";
}
else
{
document.getElementById("faccinator5").style.width="30px";
document.getElementById("button").src= piu;
document.getElementById("controllobox").style.display = "none";
}


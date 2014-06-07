// ==UserScript==
// @name           Travian T3 pack skin&faccinator
// @namespace      Travian T3 pack skin&faccinator
// @include        http://forum.travian.it/*
// @include        http://forum.travian.*
// ==/UserScript==


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


document.getElementsByTagName('html')[0].style.backgroundImage="url('http://www.browsergamespielen.de/img/img/11298037605-travian-dorf-sommer.jpg')";


//Modifico il colore ai link
elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#CCCCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#6699FF";
elements[i].style.background="transparent";
}


//header
document.getElementsByTagName('img')[0].src = "http://img94.imageshack.us/img94/2703/senzaolo1ftx.png";
document.getElementsByTagName('html')[0].style.backgroundColor="#99CC66";
document.getElementById('footer').style.backgroundColor="#99CC66";
document.getElementsByTagName('img')[0].style.marginTop="-50px";

elements = document.getElementsByTagName('a');
for(i=22;i<elements.length;i++){
elements[i].style.color="#00CCFF";
}
for(i=0;i<28;i++){
elements[i].style.color="#00CCFF";
elements[i].style.background="transparent";
}

//quote
elements = getElementsByClass('bbcode_quote');
for(i=0;i<elements.length;i++){
elements[i].style.border="1px solid #CC0000";
}
elements = getElementsByClass('bbcode_quote_container');
for(i=0;i<elements.length;i++){
elements[i].style.backgroundImage="url('http://www.giochiperpc.net/images/travian-game-image-08.jpg')";
}
elements = document.getElementsByTagName('img');
for(i=0;i<elements.length;i++){
elements[i].style.border="0px solid black";
}


// ==UserScript==
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
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/sex/37.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/cartelli/038.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/tristi/19.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/tristi/9.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/tristi/1.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/animali/cani/014.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/animali/animalivari/033.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/arrabbiate/5.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/arrabbiate/64.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/cartelli/039.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/001.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/008.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/012.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/020.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/054.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/054.gif');
immagini_personalizzate.push('http://emoticonforum.altervista.org/_altervista_ht/faccine/gestacci/064.gif');
immagini_personalizzate.push('http://faccine.forumfree.net/worthy.gif');
immagini_personalizzate.push('http://faccine.forumfree.net/banned.gif');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');
immagini_personalizzate.push('###link###');

//Gestione categoria default emoticon
var abilita_faccine_omg_gialle = "si";
var numero_default = "27"; //numero di emoticon che si vogliono visualizzare. MAX 27
var madre_faccine_default_link = "http://sviluppotravian.altervista.org/faccinator/images/"; //non modificare

// Gestione emoticon di http://emoticonforum.altervista.org/_altervista_ht/faccine/index_faccine.htm
var abilita_faccine_emoticonforum = "si";
var madre_faccine_emoticonforum_link = "http://emoticonforum.altervista.org/_altervista_ht/faccine/"; //non modificare

//Gestione prima categoria emoticon
var sottocategoria_faccine_emoticonforum_1 = "modificate";
var numero_sottocategoria_1 = "243"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_1 = "si";

//Gestione seconda categoria emoticon
var sottocategoria_faccine_emoticonforum_2 = "banane";
var numero_sottocategoria_2 = "30"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_2 = "si";

//Gestione terza categoria emoticon
var sottocategoria_faccine_emoticonforum_3 = "asd";
var numero_sottocategoria_3 = "30"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_3 = "si";

//Gestione quarta categoria emoticon
var sottocategoria_faccine_emoticonforum_4 = "pazze";
var numero_sottocategoria_4 = "50"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_4 = "si";

//Gestione quinta categoria emoticon
var sottocategoria_faccine_emoticonforum_5 = "affettuose";
var numero_sottocategoria_5 = "20"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_5 = "si";

//Gestione sesta categoria emoticon
var sottocategoria_faccine_emoticonforum_6 = "sconvolte";
var numero_sottocategoria_6 = "20"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_6 = "si";

//Gestione settima categoria emoticon
var sottocategoria_faccine_emoticonforum_7 = "sex";
var numero_sottocategoria_7 = "4"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_7 = "si";

//Gestione ottava categoria emoticon
var sottocategoria_faccine_emoticonforum_8 = "superrisate";
var numero_sottocategoria_8 = "28"; //numero di emoticon della categoria che si vogliono visualizzare. MAX 100
var attiva_sottocategoria_8 = "si";

//Gestione grafica
var versione_fac = "Faccinator 5.9 Travian3 edition";
var voglio_che_mi_segua = "si";
var colore_sfondo = "#bee3ff";
var distanza_alto = "+200px";
var immagine_sfondo = "url(http://4.bp.blogspot.com/-u4wKESEVQfk/TffP_2OyCdI/AAAAAAAAAPY/8abhdbW5xxs/s1600/travian_village.jpg)"; //attenti all'url()
var abilita_sfondo = "si";
var meno_a = "http://icons.iconseeker.com/png/fullsize/icons-developers/minus.png";
var piu_a = "http://icons.iconseeker.com/png/fullsize/icons-developers/plus.png";


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
	i_aus = "1" + i_aus;
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

//aggiunta faccine quarta cat
if(attiva_sottocategoria_4 == "si")
for(var i=1; i < numero_sottocategoria_4 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_4 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine quinta cat
if(attiva_sottocategoria_5 == "si")
for(var i=1; i < numero_sottocategoria_5 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_5 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine sesta cat
if(attiva_sottocategoria_6 == "si")
for(var i=1; i < numero_sottocategoria_6 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_6 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine settima cat
if(attiva_sottocategoria_7 == "si")
for(var i=1; i < numero_sottocategoria_7 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_7 + "/" + i + ".gif" + "></img>");
}

//aggiunta faccine ottava cat
if(attiva_sottocategoria_8 == "si")
for(var i=1; i < numero_sottocategoria_8 ;i++)
{
	immagini.push("<img onclick='scrivi(this.src)' src=" + madre_faccine_emoticonforum_link + sottocategoria_faccine_emoticonforum_8 + "/" + i + ".gif" + "></img>");
}

//compressione contenuto ed eliminazione imperfezione
for (var i = 0; i < immagini.length; i++)
{
if(immagini[i].length > 0)
	contenuto+= immagini[i];
}



//creazione box controllo
var controllo = '<div id="controllobox" style="overflow: auto; background-color: transparent; margin: 20px; height: 190px; border: 0px dashed white; "  >  ' +
contenuto +
' </div><div style="margin-top: -20px; margin-left: 110px; font-size: x-medium;" id="spam"><a style="color: red;"" target="_blank"><b>V. 2.0 fixed</b><br>2011-Bio script</a></div>';


 


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
	var versione = "<img id=\"button\" style=\"margin: 5px;\"  onclick=\"chiudi();\" src ='##'></img><input style=\" margin-left: 26px; width: 190px; border: 0px solid black; padding: 8px; background: transparent; border-bottom: 0px solid white; font-weight: bold; text-align: center; color: black;\" type=\"text\" id=\"copiaggio\" value=\".: " + versione_fac + " :.\">";

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
	//div.style.borderLeft = "2px solid black";
//	div.style.borderTop = "2px solid black";
	//div.style.borderBottom = "2px solid black";	
	div.style.boxShadow ="6px 6px 6px 6px #00D5FF";
	div.style.marginLeft = "4px";			
	div.style.height = "300px";
	div.style.width = "300px";
	div.style.padding = "0px";
	div.style.display = "block";
	
div.style.borderRadius = 'em 2em 2em 2em'; // standard
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


//applico la chiusura o apertura del box
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

' </div><div style="margin-top: -20px; margin-left: 110px; font-size: x-medium;" id="spam"><a style="color: red;"" target="_blank"><b>Coming soon</b><br>2011-Bio script</a></div>';


// ==UserScript==
// @include        http://forum.travian.it/newreply*
// ==/UserScript==

/* Inserisco le istruzioni: mettere una barra e un asterisco all' inizio e alla fine del pezzo sotto come in questa frase per toglierle.*/

var tentativo_server = location.href;
var da_cercare= "newreply";
var count = 0;

for (var i = 0; i <= tentativo_server.length - da_cercare.length; i++)


{
    if (tentativo_server.substring(i, i + da_cercare.length) == da_cercare)
    {
        count++;
    }
}
if(count > 0)
alert("                          ISTRUZIONI FACCINATOR                                1. COS' è FACCINATOR?                                               Faccinator è un estensione del tuo browser, con questa funzione puoi aggiungere altre faccine al forum.                           2.COME SI METTONO LE FACCINE?                                                è semplicissimo: basta cliccare sulla faccina che vuoi mettere e poi copiare il link apparso in alto nella textarea. Tu, in quanto stai usando la versione 5.9, puoi fare drag and drop, trascinando le faccine nel riquadro dove scrivi. Consiglio di attivare l' editor avanzato nelle impostazioni del forum, così non avrai problemi nel trasportare le faccine.              3. PERSONALIZZARE IL FACCINATOR                                   Volendo il faccinator si può personalizzare: dovrai scaricare un editor di testo  se non lo hai già, e con questo dovrai selezionare il file script.js, e modificarlo personalizzandolo come vuoi.                                                             RINGRAZIAMENTI: produttore: bio hanno partecipato: pingu");     
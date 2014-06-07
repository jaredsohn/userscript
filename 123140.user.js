// ==UserScript==
// @name           Formazione Popologiallorosso
// @namespace      Formazione
// @description    Formation Maker
// @include        htt*://forum.carlozampa.com/*
// @include        htt*://forum.carlozampa.it/*
// @include        http://imageshack.us/
// @include        http://imageshack.us/content_round.php?*
// @include        http://imageshack.us./content_round.php?*
// @include        http://www.imageshack.us/content_round.php?*
// @include        http://www.imageshack.us./content_round.php?*
// @include        http://img*.imageshack.us/content_round.php?*
// @include        http://img*.imageshack.us./content_round.php?*
// ==/UserScript==

//--------------------------POPOLOGIALLOROSSO-----------------------------------

var calciatori= new Array ("Seleziona giocatore","---------Portieri----------","Stekelenburg","Lobont","Curci","Pigliacelli","---------Difensori---------","Cicinho","Jose Angel","Juan","Heinze","Nego","Burdisso","Kjaer","Cassetti","Rosi","---------Centrocampisti---------","Pizarro","Taddei","Pjanic","De Rossi","Gago","Perrotta","Greco","Simplicio","Viviani","Verre","Sabelli","Ciciretti","---------Attaccanti---------","Lamela","Osvaldo","Totti","Bojan","Borini","Caprari","Okaka");
var moduli= new Array ("2-3-5","2-3-2-3","3-3-1-3","3-3-4","3-4-2-1","3-4-1-2","3-4-3","3-5-2","3-6-1","3-2-3-2","3-5-1-1","4-1-4-1","4-1-3-2","4-1-2-1-2","4-2-4","4-2-3-1","4-3-1-2","4-3-2-1","4-3-3","4-4-2","4-5-1","5-3-2","5-4-1");
var bottoni=new Array("conferma 11","resetta posizioni","carica","?");
var outputcalciatori=new Array();
var outputmodulo;
var numtitolari=11;
var x=new Array(numtitolari);
var y=new Array(numtitolari);
var btn=new Array();
var btnL=new Array();
var divcanvas;
var tagcanvas;
var canvas;
var divcampo;
var field;
var nomecalciatore;
var dragok = false;
var match;
var largcalc=20;
var lungcalc=20;
var capg=0;
var crossedDirectlink;

isImageshack();
AggiungiBottoneFormazione();
posizioniInizialiCalciatori();



function AggiungiBottoneFormazione()
{
    PannelloBottoni=document.getElementById("format-buttons");
    BottoneFormazione=PannelloBottoni.appendChild(document.createElement("input"));
    BottoneFormazione.setAttribute("type","button");
    BottoneFormazione.setAttribute("class","button2");
    BottoneFormazione.setAttribute("name","formazione");
    BottoneFormazione.setAttribute("value","formazione");
    BottoneFormazione.addEventListener("click", PannelloFormazione, false);
    
}

function PannelloFormazione()
{
    if(document.getElementById("failaformazione")==null)
    {
        //Ridimensiona Textbox Post
        messagebox=document.getElementById("message-box");
        messagebox.setAttribute("style","float:left;width:0px;");
        PannelloGenerico=document.getElementsByTagName("fieldset")[1];
        
        //Crea il Div Formazione
        divformazione=PannelloGenerico.appendChild(document.createElement("div"));
        divformazione.setAttribute("style","float:left;width:280px;padding-left:10px;");
        divformazione.setAttribute("id","failaformazione");
        
        
        //Titolo Div Formazione
        strong=divformazione.appendChild(document.createElement("strong"));
        strong.appendChild(document.createTextNode("Modulo "));
        
        //combobox Formazione
        var comboboxM=divformazione.appendChild(document.createElement("select"));
        comboboxM.setAttribute("name","modulo");
        comboboxM.setAttribute("id","modulo");
        for (c=0;c<moduli.length;c++)
        {
            optionM=comboboxM.appendChild(document.createElement("option"));
            optionM.setAttribute("value",c+1);
            optionM.appendChild(document.createTextNode(moduli[c])); 
        }
        divformazione.appendChild(document.createElement("br"));
      
        
        for(t=0;t<numtitolari;t++)
        {
            //combobox 11 titolari Formazione
            var comboboxT=divformazione.appendChild(document.createElement("select"));
            comboboxT.setAttribute("name","calc"+(t+1));
            comboboxT.setAttribute("id","calc"+(t+1));
            for (c=0;c<calciatori.length;c++)
            {
                optionT=comboboxT.appendChild(document.createElement("option"));
                optionT.setAttribute("value",c+1);
                optionT.setAttribute("id","tit"+(c+1));
                optionT.appendChild(document.createTextNode(calciatori[c])); 
            }
            //Creo Bottoni L Formazione
            btnL[t]=divformazione.appendChild(document.createElement("input"));
            btnL[t].setAttribute("type","button");
            btnL[t].setAttribute("class","button2");
            btnL[t].setAttribute("id","btncalcfree"+(t+1));
            btnL[t].setAttribute("value","L");
            btnL[t].setAttribute("title","insierisci giocatore a mano libera");
            //Nuova Riga
            divformazione.appendChild(document.createElement("br"));
        }
         //Funzionalità Bottoni L Formazione
         btnL[0].onclick=function(){changeTypecontrol(1)};
         btnL[1].onclick=function(){changeTypecontrol(2)};
         btnL[2].onclick=function(){changeTypecontrol(3)};
         btnL[3].onclick=function(){changeTypecontrol(4)};
         btnL[4].onclick=function(){changeTypecontrol(5)};
         btnL[5].onclick=function(){changeTypecontrol(6)};
         btnL[6].onclick=function(){changeTypecontrol(7)};
         btnL[7].onclick=function(){changeTypecontrol(8)};
         btnL[8].onclick=function(){changeTypecontrol(9)};
         btnL[9].onclick=function(){changeTypecontrol(10)};
         btnL[10].onclick=function(){changeTypecontrol(11)};
        
        
        
        //Bottoni Conferma, Resetta, Cancella, Info
        
        for(c=0;c<bottoni.length;c++)
        {
            btn[c]=divformazione.appendChild(document.createElement("input"));
            btn[c].setAttribute("type","button");
            btn[c].setAttribute("class","button2");
            btn[c].setAttribute("name",bottoni[c]);
            btn[c].setAttribute("value",bottoni[c]);
            
        }
         btn[0].onclick=btnConferma;
         btn[1].onclick=btnResetta;
         btn[2].onclick=btnCarica;
         btn[3].onclick=btnInfo;
         
        //-------------------------------------
        
        //Crea il Div Campo
        divcampo=PannelloGenerico.appendChild(document.createElement("div"));
        divcampo.setAttribute("style","float:left;width:473px;");
        divcampo.setAttribute("id","divcampo");
        
        // Crea Canvas Campo
        divcanvas = document.getElementById("divcampo");
        tagcanvas=divcanvas.appendChild(document.createElement("canvas"));
        tagcanvas.setAttribute("id","campo");
        tagcanvas.setAttribute("width","473");
        tagcanvas.setAttribute("height","273");
        canvas=document.getElementById("campo");
        
        //Disegna il campo
        disegnaCampo();
    }
    else
    {
        divformazione=document.getElementById("failaformazione");
        divformazione.parentNode.removeChild(divformazione);
        divcampo=document.getElementById("divcampo");
        divcampo.parentNode.removeChild(divcampo);
        messagebox=document.getElementById("message-box");
        messagebox.setAttribute("style","float:left;width:80%;");
    }
    
}


function btnConferma()
{
   for(c=0;c<numtitolari;c++)
   {
    outputcalciatori[c]=document.getElementById("calc"+(c+1));
   }
   outputmodulo=document.getElementById("modulo");
   disegnaCalciatori();
   catturaEventoCampo();
}

function btnResetta()
{
    posizioniInizialiCalciatori();
    disegnaCalciatori();
}

function btnCarica()
{
    window.open("http://imageshack.us/","imageshack","width=680,height=650");
        
}


function btnInfo()
{
    alert("\"Popologiallorosso Formation Maker\" powered by DanieleR82");
}

function disegnaCampo()
{
  if (canvas.getContext)
  {
    
    field = canvas.getContext('2d');
    //Campo intero
    field.fillStyle = 'rgb(0, 150, 0)';
    field.fillRect(0,0,473,273);
    //Linea di centrocampo
    field.fillStyle = 'rgb(255, 255, 255)';
    field.fillRect(237,0,2,400);
    // Cerchio di centrocampo
    field.beginPath();
    field.arc(238,137,50,0,Math.PI*2,true);
    field.lineWidth = 2;
    field.strokeStyle = "white"; // line color
    field.stroke();
    field.closePath();
    // Linee laterali di campo
    field.beginPath();
    field.strokeRect(0,0,473,273);
    field.stroke();
    field.closePath();
    //Area di rigore di sx
    field.beginPath();
    field.strokeRect(0,75,70,120);
    field.stroke();
    field.closePath();
    //Area di rigore di dx
    field.beginPath();
    field.strokeRect(403,75,70,120);
    field.stroke();
    field.closePath();
    // Scrive modulo scelto nell'angolo alto a sinistra
     field.fillStyle= 'rgb(255, 255, 255)';
     field.font = "16pt Arial"
     field.fillText(outputmodulo.options[outputmodulo.selectedIndex].text, 5, 25, 80);
  }
}

function disegnaCalciatori()
{
   field.clearRect(0, 0, 473, 273);
   disegnaCampo();
   if (canvas.getContext)
   {

     nomecalciatore = canvas.getContext('2d');
     for(c=0;c<numtitolari;c++)
     {
     //disegna quadrato calciatore
     nomecalciatore.fillStyle = 'rgb(200, 0, 0)';
     nomecalciatore.fillRect(x[c]-largcalc/2,y[c]-lungcalc/2,largcalc,lungcalc);
     //scrivi nome calciatore
     nomecalciatore.fillStyle= 'rgb(255, 255, 0)';
     nomecalciatore.font = "10pt Arial"
     if(document.getElementById("calc"+(c+1)).getAttribute("type")=="text")
        {
           nomecalciatore.fillText(outputcalciatori[c].value, x[c]-largcalc/2, y[c]+lungcalc, 80);
           
           
        }
        else
        {
            nomecalciatore.fillText(outputcalciatori[c].options[outputcalciatori[c].selectedIndex].text, x[c]-largcalc/2, y[c]+lungcalc, 80);
        }
 
     }
     
   }
}

function myMove(e)
{
 if (dragok)
 {
        
        x[match] = e.pageX - canvas.offsetLeft;
        y[match] = e.pageY - canvas.offsetTop;
        
  }
 
}

function myDown(e)
{
    for(c=0;c<numtitolari;c++)
    {
        if (e.pageX < x[c] + largcalc/2 + canvas.offsetLeft && e.pageX > x[c] - largcalc/2 +
        canvas.offsetLeft && e.pageY < y[c] + lungcalc/2 + canvas.offsetTop &&
        e.pageY > y[c]- lungcalc/2 + canvas.offsetTop)
        {
            x[c] = e.pageX - canvas.offsetLeft;
            y[c]= e.pageY - canvas.offsetTop;
            dragok = true;
            match=c;
            canvas.onmousemove = myMove;
            
        }   
    }
}

function myUp(){
 dragok = false;
 canvas.onmousemove = null;
}

function catturaEventoCampo()
{
   divcampo.addEventListener("mousemove", disegnaCalciatori, false);
   divcampo.addEventListener("mousedown", myDown, false);
   divcampo.addEventListener("mouseup", myUp, false);
    
}

function posizioniInizialiCalciatori()
{
    var spaziotragiocatori=0;
    for (c=0;c<numtitolari;c++)
    {
        spaziotragiocatori=spaziotragiocatori+20;
        x[c]=spaziotragiocatori+25;
        y[c]=spaziotragiocatori+20;
    }

}

function changeTypecontrol(c)
{
    var combobox;
    var textbox;
    var control=document.getElementById("calc"+c);
    if(control.getAttribute("name")=="tcalc"+c)
    {
        combobox=document.createElement("select");
        combobox.setAttribute("name","calc"+c);
        combobox.setAttribute("id","calc"+c);
        for (t=0;t<calciatori.length;t++)
        {
            option=combobox.appendChild(document.createElement("option"));
            option.setAttribute("value",t+1);
            option.setAttribute("id","tit"+(t+1));
            option.appendChild(document.createTextNode(calciatori[t]));
        }
        textbox = document.getElementById("calc"+c);
        document.getElementById("failaformazione").replaceChild(combobox,textbox);
    }
    
    else
    {
    textbox=document.createElement("input");
    textbox.setAttribute("type","text");
    textbox.setAttribute("id","calc"+c);
    textbox.setAttribute("name","tcalc"+c);
    textbox.setAttribute("size","34");
    combobox = document.getElementById("calc"+c);
    document.getElementById("failaformazione").replaceChild(textbox,combobox);
    }
}

//-----------------------------  IMAGESHACK.US---------------------------------
function copyDirectlink()
{
        
        var checklink=document.getElementsByTagName("input");
        var directlink=0;
        for(c=0;c<checklink.length-1;c++)
        {    
           if(checklink.item(c).getAttribute("wrap")=="off")
           {
                
                directlink=checklink.item(c);
                directlink.setAttribute("onclick","return true;");
                directlink.setAttribute("onselectstart","return true;");
                directlink.setAttribute("onmousedown","return true;");
                directlink.removeAttribute("disabled");
                directlink.setAttribute("wrap","on");
                
                
            }
            
        }
        
}

function isImageshack()
{
windowUrl = new String("");
windowUrl=document.URL;
if (windowUrl.substring(0,20)=="http://imageshack.us")
{
    copyDirectlink();
}
}
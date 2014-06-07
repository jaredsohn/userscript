// ==UserScript==
// @name           Linki do allegro na podaj.net
// @namespace      by thorin87
// @description    Skrypt pozwala szybko wyszukiwać ksiązki i filmy ze strony podaj.net na platformie aukcyjnej allegro - obok każdej książki/filmu link do danej pozycji na allegro. 
// @include        http://podaj.net/*
// @include        http://www.podaj.net/*
// @exclude       http://*podaj.net/pakiet.php*
// @exclude       http://*podaj.net/szukaj.php*
// ==/UserScript==
var allegroLogo='data:image/gif;base64,R0lGODlhEAAQAPcAAAQedOTi7PxaBPz+/CkCDR4AAAAAAAAAADEADR8AAAAAAAAAAAAAwwAAChUAEAAA/A4A+AAAAQAAhQAAAwAAFwIAAAAAAAAAAAABAQMAAAAAAAAAAKAaGeUAABIAAAAAAHkAEQgAAIIAAHwAAAAA0QAAOQEAHQAAW1YVhAAAAAAAAAAAAKgViOQAFhIAIAAAW3MNFQAAAAAAAAAAAMgNGuUAABIAAAAAABjDle4KOZAQHXz8W3D4KAUBPZGFOHwDAP8X6v8AB/8AIP8AAG0BGAUAPZEAOHwAABUZ2woAGoIAHXwAWwAR6gAABxUAIAAAAGAFMAMAgAAARQAAAFgAAMIAABgAAAAAAHgA6mMABxUAIAAAAAAAhAAAAAAAAAAAAH4aAAAgAACDAMAAAAAeGgAgAAAmHQAgAP+cBP/mAP8SAP8AAP/Q4v88BP8dAP9bAAAQ6QA+3wA40wAAdwAaAAAAAAAAAAAAAAAdAQAAABUAAAAAANhcEuXnnxISgAAAfGJGWAnQy4IeFXxbAHgQAGM+ABU4AAAAANsFBwUAAIIAAHwAAEDqAOUHAE8gAAAAAHgYAGM9wAE4FQAAAGyEAAAAAAAAAAAAABRoAOViABIAAAAAAADwAADmAAASAAAAAPiDAPcqABKCAAB8ABgAGO4An5AAgHwAfHAA/wUA/5EA/3wA//8AEv8An/8AgP8AfG0pMwW3AJGSAHx8AEpYM/bLAIAVAHwAAAC+XAA+8BWCEgB8AAD//wD//wD//wD//3gAAGMAABUAAAAAAADUHAHm6AASEgAAAAC+DgA+zwCCSwB8AFf4/Pb354ASEnwAAAAYW+fu4hKQTgB8AHgAMGO36BWSEgB8AAT/vgD/PgD/ggD/fANYzwDL6AAVEgAAAAC+ywA+/wCC/wB8fwAYnADo6AASEgAAAATdWAA/ywCCFQB8AAMWvgA/PgCCggB8fAABWAAAywAAFQAAAAAxaAAAYgAAAAAAAAQAAAAAAAAAAAAAAAMVfgAAVQAARwAAACH5BAAAAAAALAAAAAAQABAABwhQAAcIFECwoEEBAhMqXDiQ4QAADyMmJKgQokWJAygmvGgRYkaEGyNy/Chw5EiKHR1CRFmSoUeNHl0OBBkgZsWZN3OS1IlRo0OHIH8yPEg0YUAAOw%3D%3D';

function bezPLznakow(napis)
{
  pl=new Array('Ą','ą','Ć','ć','Ę','ę','Ł','ł','Ń','ń','Ó','ó','Ś','ś','Ź','ź','Ż','ż','"',',','\\s[^\\s]*\\[\\.{3}\\]','\\.\\s','\\s+');
  bezpl=new Array('A','a','C','c','E','e','L','l','N','n','O','o','S','s','Z','z','Z','z','','','',' ','+');
  for(j=0;j<pl.length;j++)
  {
    var co=new RegExp(pl[j],"g");
    napis=napis.replace(co,bezpl[j]);
  }
  return napis;
}

var komorki=document.getElementsByTagName("td");
for(i=0;i<komorki.length;i++)
{
  var zawartoscKom=komorki[i].innerHTML;
  if(zawartoscKom.indexOf("<a href=\"/isbn/")>-1 || zawartoscKom.indexOf("<a href=\"/ksiazka.php")>-1) //jesli jest odnosnikiem do ksiazki
  {
    regex1=/.*?>\s*(.*?)\s*<.*?>\s*\[(.*?)\].*/; //tytul i autor
	regex2=/.*?>\s*(.*?)\s*<.*/; //sam tytul (np. w katalogu)
	if(regex1.test(zawartoscKom)) {tytulAutor=zawartoscKom.replace(regex1, "$1 $2");}
	else 
	{
	  tytul=zawartoscKom.replace(regex2, "$1 ");
	  autor=komorki[i+1].innerHTML;
	  tytulAutor=tytul+autor;
	}
    doWyszukania=bezPLznakow(tytulAutor);	 
    allegro=document.createElement('img'); //tworze obrazek
    allegro.src=allegroLogo;
    allegro.style.marginLeft='3px';
    link=document.createElement('a'); //tworzy link
    link.href='http://allegro.pl/search.php?string='+doWyszukania+'&description=1';
    link.title='Szukaj tej pozycji na allegro';
    link.appendChild(allegro);
    komorki[i].appendChild(link); 
  }
}
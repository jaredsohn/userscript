// ==UserScript==
// @name           Petpage Fixer Beta 1.0.1
// @namespace      neopets
// @description    Helpful additions for the petpage Edit function.
// @include        http://www.neopets.com/editpage.phtml?pet_name=*
// ==/UserScript==

/*
        	Replace Function by Dieter Raber: http://forum.de.selfhtml.org/archiv/2005/7/t111654/#m703649
	Idea and supporting by mietze: http://www.neopets.com/~Cristemia
*/


var inhalt = document.getElementsByTagName('form')[1].getElementsByTagName('textarea')[0].value;

//Neuen Listeneintrag erzeugen

for (var i=0; i < document.getElementsByTagName('ul').length; i++) {
  var thelist = document.getElementsByTagName('ul')[i];
  if (thelist.innerHTML.match("#PHOTO")) {
    thelist.innerHTML += '<br><li><b>#LASTUPDATE</b> zeigt das Datum deiner letzen aktualisierung an.</li><li><b>#PET</b> zeigt ein Bild des Pets an.</li>';
  }
}

//Altes Datum durch #LASTUPDATE ersetzen:
var pos1 = 0;
var pos2 = 0;
var oldDate;

for (var i = 0; pos1 != -1; i++) {
  pos1 = inhalt.search(/\<span id=\"lastupdate\"\>/g);
  pos2 = inhalt.indexOf("\<\/span\>", pos1);
  oldDate = inhalt.substring(pos1, pos2+7);
  if(pos1 != -1) inhalt = inhalt.replace(oldDate, "#LASTUPDATE");
}

//Petbild durch #PET ersetzen:
var pet = document.URL.split("=");
var petname = pet[1].toLowerCase();
var petimage12 = "\<img src=\"http://pets.neopets.com/cpn/" + petname + "/1/2.png\"\>";
var newRegExp = new RegExp(petimage12, "g");
inhalt = inhalt.replace(newRegExp, '#PET');


//AUSGABE
document.getElementsByTagName('form')[1].getElementsByTagName('textarea')[0].value = inhalt;


//Vorschau Button überwachen
document.getElementsByName("subbychange")[0].addEventListener('click', rplc, false);

function rplc() {

//Sonderzeichen ersetzen
  var chars = new Array ('&','à','á','â','ã','ä','å','æ','ç','è','é',
                         'ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô',
                         'õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ','À',
                         'Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë',
                         'Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö',
                         'Ø','Ù','Ú','Û','Ü','Ý','Þ','€','ß','¢','£','¤','¥','¦','§','¨','©','ª','«',
                         '¬','­','®','¯','°','±','²','³','´','µ','¶',
                         '·','¸','¹','º','»','¼','½','¾');

  var entities = new Array ('amp','agrave','aacute','acirc','atilde','auml','aring',
                            'aelig','ccedil','egrave','eacute','ecirc','euml','igrave',
                            'iacute','icirc','iuml','eth','ntilde','ograve','oacute',
                            'ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc',
                            'uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc',
                            'Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute',
                            'Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde',
                            'Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave',
                            'Uacute','Ucirc','Uuml','Yacute','THORN','euro','szlig',
                            'lt','gt','cent','pound','curren','yen','brvbar','sect','uml',
                            'copy','ordf','laquo','not','shy','reg','macr','deg','plusmn',
                            'sup2','sup3','acute','micro','para','middot','cedil','sup1',
                            'ordm','raquo','frac14','frac12','frac34');

  var newString = String(document.getElementsByTagName('form')[1].getElementsByTagName('textarea')[0].value);
  for (var i = 0; i < chars.length; i++)
  {
    myRegExp = new RegExp();
    myRegExp.compile(chars[i],'g');
    newString = newString.replace (myRegExp, '&amp;' + entities[i] + ';');
  }


//Fügt die Funktion #LASTUPDATE hinzu
  var datum = new Date();
  var month = String(datum.getMonth() + 1);
    if (month.length == 1) month = "0" + month;
  var day = String(datum.getDate());
    if (day.length == 1) day = "0" + day;
  var year = String(datum.getFullYear());
    year = year.replace(/20/, '');
  newString = newString.replace(/#LASTUPDATE/g, "\<span id=\"lastupdate\"\>" + day + "." + month + "." + year + "\<\/span\>");

//Fügt die Funktion #PET hinzu:
  newString = newString.replace(/#PET/g, petimage12);


//Ausgabe
  document.getElementsByTagName('form')[1].getElementsByTagName('textarea')[0].value = newString;
}
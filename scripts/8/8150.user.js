// ==UserScript==
// @name           Geizhals Forum Text laengen zaehler
// @include        http://forum.geizhals.at/new.jsp*
// @include        http://kindergarten.geizhals.at/new.jsp*
// @include        http://forum.geizhals.net/new.jsp*
// @include        http://forum.geizhals.cc/new.jsp*

var textAreaObj       = document.getElementById("body");
var zeichenZeileObj   = document.evaluate('/HTML[1]/BODY[1]/DIV[2]/FORM[1]/TABLE[1]/TBODY[1]/TR[6]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

var maxZeichen        = 6000;
var maxZeilen         = 75;
var zeichenProZeile   = maxZeichen/maxZeilen;
  
function testLaengeZaehlenUndAnzeigen()
{
  if (textAreaObj == 'undefined' ||  textAreaObj == null) return;
  
  
  var zeichenAnzahl   = textAreaObj.value.length;
  var zeichenUbrig    = maxZeichen - zeichenAnzahl;
  var zeichenZuviel   = Math.abs(zeichenUbrig);
  
  var zeilenAnzahl    = Math.round((maxZeilen-(zeichenAnzahl/zeichenProZeile))*1000, 3)/1000;
  var zeilenUbrig     = maxZeilen-zeilenAnzahl;
  var zeilenZuviel    = Math.abs(zeilenUbrig);
  
  var neueZeile       = '';
  
  if      (zeichenAnzahl == 0)
          neueZeile = ''
                    + 'Gesamtl&auml;nge max. '+maxZeichen+' Zeichen'
                    + ', '
                    + 'also ca. '+maxZeilen+' Zeilen';
  
  else if (zeichenAnzahl<maxZeichen)
          neueZeile = ''
                    + 'Gesamtl&auml;nge max. '+maxZeichen+' Zeichen'
                    + ' '
                    + '(noch '+zeichenUbrig+' Zeichen &uuml;brig)'
                    + ', '
                    + 'also ca. '+zeilenAnzahl+''
                    + ' '
                    + 'von ca. '+maxZeilen+' Zeilen verbraucht';
  
  else if (zeichenAnzahl==maxZeichen)
          neueZeile = ''
                    + 'Gesamtl&auml;nge max. '+maxZeichen+' Zeichen'
                    + ' '
                    + '<font color="red">(keine Zeichen &uuml;brig)</font>'
                    + ', '
                    + 'also <font color="red">alle Zeilen</font>'
                    + ' '
                    + 'von ca. '+maxZeilen+' Zeilen verbraucht';
  
  else if (zeichenAnzahl>maxZeichen)
          neueZeile = ''
                    + 'Gesamtl&auml;nge max. '+maxZeichen+' Zeichen '
                    + ''
                    + '<font color="red">('+Math.abs(zeichenUbrig)+' Zeichen zuviel)</font>'
                    + ', '
                    + 'also <font color="red">'+Math.abs(zeilenAnzahl)+' Zeilen zuviel</font>'
                    + ' '
                    + 'von ca. '+maxZeilen+' Zeilen';
  
  else
          neueZeile = ''
                    + 'Gesamtl&auml;nge max. '+maxZeichen+' Zeichen'
                    + ' '
                    + '('+zeichenAnzahl+' Zeichen verwendet)'
                    + ', '
                    + 'also ca. '+zeilenAnzahl
                    + ' '
                    + 'von ca. '+maxZeilen+' Zeilen verwendet';
  
  neueZeile = neueZeile.replace(/^Gesamtl&auml;nge /, '');
  
  zeichenZeileObj.innerHTML = neueZeile;
}

window      .addEventListener ("load",    testLaengeZaehlenUndAnzeigen, false);
textAreaObj .addEventListener ("keyup",   testLaengeZaehlenUndAnzeigen, false);
textAreaObj .addEventListener ("keydown", testLaengeZaehlenUndAnzeigen, false);
textAreaObj .addEventListener ("change",  testLaengeZaehlenUndAnzeigen, false);
textAreaObj .addEventListener ("select",  testLaengeZaehlenUndAnzeigen, false);
textAreaObj .addEventListener ("mouseup", testLaengeZaehlenUndAnzeigen, false);
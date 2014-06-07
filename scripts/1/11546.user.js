// ==UserScript==
// @name            CazaFirmasIlegales
// @versions        V2.6
// @description     Busca Firmas que no cumplan las normas en el foro. 
// @include         http://board.ogame.*
// ==/UserScript==
// Script modificado por Cibort
//Optimizado para board.ogame.com.es
// Nota: Para poder utilizarlo en otros foros con otras normas, solo basta con modificar las dimensiones medidas en pixeles.


 var iLst;
 var i;
 var wh;
 var ht;
 var pth;
 var brd;
 var tblLst
 var j;
 var img;

 function raztradora()
 {
    tblLst = document.getElementsByTagName('table');
    for (j=0; j < tblLst.length; j++)
    {
    if(tblLst[j].width == 857)
     {
     tblLst[j].parentNode.removeChild(tblLst[j]);
     break
     }
    }
 }


 function CazaFirmasIlegales()
 {
 iLst = document.evaluate('//img', document, null, 6, null);
 for (i=0; i < iLst.snapshotLength; i++)
    {
     img = iLst.snapshotItem(i)
     pth = img.src;
     brd = pth.substr(0, 19)
     if (brd != "http://board.ogame.")
      {
       wh = img.width;
       ht = img.height;
       if (wh > 501 || ht > 101)
       if (wh > 451 || ht > 151)
        {
         img.border = 14;
         img.style.borderColor = '#00FF00';
        }
      }
    }
 }

 raztradora();
 if (window.location.href.match(/thread/))
 {
    CazaFirmasIlegales();
 } 
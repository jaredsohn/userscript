// ==UserScript==
// @name           9292ov quicklocation
// @namespace      mcDavid
// @description    voegt snelknop toe voor specifieke locatie
// @include        http://www.9292ov.nl/
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////
//tekst voor op de knop:
var titel = 'tekst'
//adresgegevens:
var straat = 'Kalverstraat'
var huisnr = '1';
var plaats = 'Amsterdam';

//gewenste vertrektijd forceren naar:
var vertrektijd = 'D'; //'D' voor vertrektijd, 'A' voor aankomsttijd!


////////////////////////////////////////////////////////////////////////////
//onderstaande regel niet aanpassen!
document.getElementsByClassName('vannaar')[0].innerHTML+="<hr color='#B0B0B0' size='1'><span style='margin-left:20px'>Snel naar: <button onclick=\"document.getElementsByName('txtStraatNaar')[0].value='"+straat+"';document.getElementsByName('txtHuisNrNaar')[0].value='"+huisnr+"';document.getElementsByName('txtPlaatsNaar')[0].value='"+plaats+"';setADSL('"+vertrektijd+"');\">"+titel+"</button></span>";
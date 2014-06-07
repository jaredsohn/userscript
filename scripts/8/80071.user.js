// ==UserScript==
// @name           Studentportalen Deluxe
// @namespace      http://userscrips.org/users/mwq
// @include        https://sp.gate.chalmers.se/*
// ==/UserScript==
/*
 * # Description
 * Lägger till länkarna under "tjänster" på nya studentportalen i vänstermenyn.
 *
 * # Todo
 * * uppdatera länkarna automatiskt från "tjänster" (istället för att hårdkoda dem in i scriptet
 * * stöd den engelska sidan
 * 
 *
 *
 *
 */

var elmNewContent = document.createElement('div');
elmNewContent.innerHTML = ' <script>function toggle(list){ var listElementStyle=document.getElementById(list).style; if (listElementStyle.display=="none"){ listElementStyle.display="block"; } else { listElementStyle.display="none"; } } </script>\
<ul id="hackNav" class="menu"> \
\
<li class="open"><a href="javascript:toggle(\'pinfo\')">Personlig information [+/-]</a> \
<ul class="menu1" id="pinfo"> \
<li><A HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/KurserDennaTermin.aspx">Kurser denna termin</A></li> \
<li><A  HREF="/sv/studier/utbildningsspecifik%20information/Sidor/EjAvslutadeKurser.aspx">Ej avslutade kurser</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/sa_funkar_studierna/tenta/Sidor/Tentamensanmalan.aspx">Tentamensanmälan</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/sa_funkar_studierna/tenta/Sidor/VisaAnmaldaTentamenstillfallen.aspx">Anmälda tentamenstillfällen</A></li> \
<li><A  HREF="/sv/studier/utbildningsspecifik%20information/Sidor/ValdaKurser.aspx">Valda kurser</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/Resultatforteckning.aspx">Resultatförteckning</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/GodkändaKurser.aspx">Godkända kurser</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/Tillgodoraknanden.aspx">Tillgodoräknanden</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/Sidor/Programinformation.aspx">Programinformation</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/studera_utomlands/Sidor/DinaUtlandsstudier.aspx">Utlandsstudier</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/sa_funkar_studierna/mts/Sidor/MTSDagar.aspx">MTS-dagar</A></li> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/Intygsinformation.aspx">Intygsinformation</A></li> \
<li><A  HREF="/sv/studier/utbildningsspecifik%20information/sidor/adressochchalmerskod.aspx">Adress och Chalmerskod</A></li> \
</ul>\
</li>\
<li class="open"><a href="javascript:toggle(\'atjanster\')">Aktuella tjänster [+/-]</a> \
<ul class="menu1"id="atjanster"> \
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/sa_funkar_studierna/tenta/Sidor/VisaAnmaldaTentamenstillfallen.aspx">Anmälda tentamenstillfällen</A></li>\
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/Sidor/Kursval.aspx">Kursval</A></li>\
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/Sidor/Kandidatprojektval.aspx">Kandidatprojektval</A></li>\
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/Sidor/Registrering.aspx">Registrering</A></li>\
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/Registreringsintyg.aspx">Skapa registreringsintyg</A></li>\
<li><A  HREF="https://sp.gate.chalmers.se/sv/studier/utbildningsspecifik%20information/Sidor/Resultatintyg.aspx">Skapa resultatintyg</A></li>\
</ul> \
</li> \
<li class="open"><a href="javascript:toggle(\'utbildning\')">Utbildningsutbud [+/-]</a> \
<ul class="menu1" id="utbildning"> \
<li><A HREF="/sv/studier/programinformation/sidor/sokprogram.aspx">Program (sök)</A></li>\
<li><A HREF="/sv/studier/kursinformation/kurser/sidor/kursinformation.aspx">Kurs (sök)</A></li>\
</ul>\
</li>\
<li class="open"><a href="javascript:toggle(\'ovrigt\')">Övrigt [+/-]</a> \
<ul class="menu1" id="ovrigt"> \
<li><A HREF="/sv/studier/sa_funkar_studierna/Sidor/Lasarstider.aspx">Läsårstider</A></li>\
<li><A HREF="/sv/studier/sa_funkar_studierna/tenta/fore_tentamen/tentaanmalan/Sidor/Tentamensdatum.aspx">Tentamensdatum</A></li>\
<li><A HREF="/sv/studier/Sidor/schemaTimeEdit.aspx">Schema och lokalbokning</A></li>\
<li><A HREF="/sv/studentliv/ekonomi/stipendier/Sidor/stipendier.aspx">Stipendier</A></li>\
<li><A HREF="/sv/stod_service/it/sidor/it-tjanster.aspx">IT-tjänster</A></li>\
<li><A HREF="https://studentfile.portal.chalmers.se">Student Program Server</A></li>\
<li><A HREF="https://sp.gate.chalmers.se/sv/studier/sidor/epost.aspx">E-post</A></li>\
</ul>\
</li>\
</ul>\
<hr/>';
var elmFoo = document.getElementById('LeftNav');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);


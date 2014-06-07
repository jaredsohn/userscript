// CSS_AVATRES_EOL_2.0
// version 0.2
// Para greasemonkey
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CSS EOL AVATARES IZQUIERDA EN 2.0
// @description   Mueve el perfil de cada usuario a la izquierda en la visualización 2.0
// @include       http://*.elotrolado.net/*
// ==/UserScript==


// Perfil usuario

GM_addStyle('.postprofile { float: left !important;border-left: none !important;border-right: 1px solid white;margin-right: 8px !important; }');


// Aviso baneo

GM_addStyle('.warn-notice { margin-left: 160px !important;}');


// Estado Conexion


GM_addStyle('.online { background-position: 93px 0px !important;}');

//GM_addStyle('.online { background-image: url(http://img.photobucket.com/albums/v105/fearandir/222.gif); background-position: 130px 10px !important;}');


// Mensaje

GM_addStyle('.post {padding-left: 2px !important;}');


// Estructura del mensaje

GM_addStyle('.postbody { margin-right: 0 !important;}');



// Firma

//GM_addStyle('.signature {;margin-left: 150px !important;}');


// Icono wiki de la firma

GM_addStyle('.wikisig {margin-right: 150px !important;}');


// Ediciones

GM_addStyle('.notice {margin-left: 150px !important;}');



// Spoilers , Citas en la firma y firmas alineadas derecha

var allhits, onehit;

allhits = document.evaluate(
    "//div[@class='signature']/span[@class='spoiler']|//div[@class='signature']//blockquote[@class='uncited']|//div[@class='signature']//div[@style='text-align']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allhits.snapshotLength; i++) 

{
     onehit = allhits.snapshotItem(i);

     onehit.setAttribute("style", "margin-right: 150px;");

}








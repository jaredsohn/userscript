typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name          NOL - Encontre as Ilhas
// @namespace     http://nolbr.com/misterio-ilha-krawk
// @description	  Facilmente encontre as ilhotas em cada mapa do Oceano de Neopia (A Busca).
// @author        Neopianos OnLine
// @homepage      http://nolbr.com/misterio-ilha-krawk
// @include       http://www.neopets.com/pirates/disappearance/search-sector.phtml
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
</>);


var corpo = $("body").html();
var coords = corpo.split("sectorCell: (");

var coord1 = coords[1].split(") Array");
var c1 = coord1[0].replace(",", "");
var coord2 = coords[2].split(") Array");
var c2 = coord2[0].replace(",", "");
var coord3 = coords[3].split(") Array");
var c3 = coord3[0].replace(",", "");
var coord4 = coords[4].split(") Array");
var c4 = coord4[0].replace(",", "");

var coord5 = coords[5].split(") Array");
var c5 = coord5[0].replace(",", "");
var coord6 = coords[6].split(") Array");
var c6 = coord6[0].replace(",", "");
var coord7 = coords[7].split(") Array");
var c7 = coord7[0].replace(",", "");
var coord8 = coords[8].split(") Array");
var c8 = coord8[0].replace(",", "");

$("#fog" + c1).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c2).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c3).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c4).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");

$("#fog" + c5).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c6).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c7).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
$("#fog" + c8).css("background", "url(http://safe.nolbr.com/107994-ctb.png) no-repeat center").attr("title", "Atrás deste setor há uma ilhota escondida. Script Seguro - 2011 NOLBR.COM");
// ==UserScript==
// @name           WD_Klanlar_Mod
// @author         Web Designers Klanı
// @version        1.3
// @description    15x15 Harita & Araç Çubuğu
// @namespace      W.D Klanlar Harita
// @include        http://tr*.klanlar.org/*
// ==/UserScript==


var screen = document.URL.substring(document.URL.indexOf("screen="), document.URL.indexOf("&", document.URL.indexOf("screen=")));
if (screen.length > 30) {
    screen = document.URL.substring(document.URL.indexOf("screen="), document.URL.length);
}
var Koy_Id = document.URL.substring(document.URL.indexOf("village="), document.URL.indexOf("&", document.URL.indexOf("village=")));
screen.length
document.cookie = Koy_Id;

function cereziAl(isim)
{
 var tarama = isim + "=";
 if (document.cookie.length > 0) { 
  konum = document.cookie.indexOf(tarama) 
  if (konum != -1) { 
   konum += tarama.length 
   son = document.cookie.indexOf(";", konum)  
   if (son == -1) 
     son = document.cookie.length
   return unescape(document.cookie.substring(konum, son))
  }
 }
}



if (screen == "screen=map") {
location.assign("javascript:TWMap.resize(" + cereziAl("MapBoyut") + " , true);");
var ekle = "<form action='' method='post'><br/><table class='vis' width='100%'>";
ekle += "<tbody><tr>";
ekle += "<th colspan='2'>Harita boyutunu değiştir:</th>";
ekle += "</tr><tr><td><table cellspacing='0'><tbody><tr><td>";
ekle += "<center><select id='map_chooser_select' onchange='";
ekle += "'>";
ekle += "<option id='op7' value='7' ";
ekle += ">7x7</option>";
ekle += "<option value='9' id='op9' ";
ekle += ">9x9</option>";
ekle += "<option id='op11' value='11' ";
ekle += ">11x11</option>";
ekle += "<option id='op13' value='13' ";
ekle += ">13x13</option>";
ekle += "<option id='op15' value='15' ";
ekle += ">15x15</option>";
ekle += "<option id='op20' value='20' ";
ekle += ">20x20</option>";
ekle += "<option id='op30' value='30' ";
ekle += ">30x30</option>";
ekle += "</select></center>";
ekle += "</td></tr></tbody></table></td></tr></tbody></table></form>";
document.getElementById("map_topo").innerHTML += ekle;
    var ekle = "<form action='' method='post'><br/><table class='vis' width='100%'>";
    ekle += "<tbody><tr>";
    ekle += "<th colspan='2' style='text-align:center;'>Düzenleyen: <a href='/game.php?screen=info_ally&amp;id=14086'>Web Designers</a></th>";
    ekle += "</tr><tr><td><table cellspacing='0'><tbody><tr><td>";
    ekle += "<img src='user_image.php?image_id=8954'>" ;
    ekle += "</td></tr></tbody></table></td></tr></tbody></table></form>";
    document.getElementById("map_topo").innerHTML += ekle;
    document.getElementById("map_chooser_select").value = cereziAl("MapBoyut");
    document.getElementById("map_chooser_select").setAttribute("onchange", "javascript:TWMap.resize(this.value, true);document.cookie = 'MapBoyut=' + this.value;");
   
}

																																									 
var	menu = "<td><a href='game.php?" + Koy_Id + "&screen=overview'><img src='graphic/face.png' style='margin:0px 2px' title='Köye Genel bakış' /></a></td>";
menu += "<td style='border-left:dotted 1px'><a href='game.php?" + Koy_Id + "&screen=main'><img src='graphic/buildings/main.png' style='margin:0px 2px' title='Ana Bina' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=market' ><img src='graphic/buildings/market.png' style='margin:0px 2px' title='Pazar Yeri' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=map' ><img src='graphic/ally_rights/found.png' style='margin:0px 2px' title='Harita' /></a></td>";
menu += "<td style='border-left:dotted 1px'><a href='game.php?" + Koy_Id + "&screen=barracks' ><img src='graphic/buildings/barracks.png' style='margin:0px 2px' title='Kışla' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=stable' ><img src='graphic/buildings/stable.png' style='margin:0px 2px' title='Ahır' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=garage' ><img src='graphic/buildings/garage.png' style='margin:0px 2px' title='Atölye' /></a></td>";
menu += "<td style='border-left:dotted 1px'><a href='game.php?" + Koy_Id + "&screen=snob' ><img src='graphic/buildings/snob.png' style='margin:0px 2px' title='Saray' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=smith' ><img src='graphic/buildings/smith.png' style='margin:0px 2px' title='Demirci' /></a></td>";
menu += "<td><a href='game.php?" + Koy_Id + "&screen=place' ><img src='graphic/buildings/place.png' style='margin:0px 2px' title='İçtima Meydanı' /></a></td>";
menu += "<td style='border-left:dotted 1px'><a href='game.php?" + Koy_Id + "&screen=info_player&id=1319673' id='editor' ><img src='graphic/map/map_e.png' style='margin:0px 2px' title='Editor' /></a></td>";
document.getElementById("menu_row2").innerHTML = menu


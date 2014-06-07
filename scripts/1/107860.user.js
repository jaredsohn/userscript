// ==UserScript==
// @name           WD_Klanlar_Mod
// @author         Web Designers Klanı
// @version        1.0
// @description    15x15 Harita & Araç Çubuğu
// @namespace      W.D Klanlar Harita
// @include        http://tr*.klanlar.org/*
// ==/UserScript==

var screen = ""

if(document.URL.indexOf("&", 0) < 0) {
 screen = document.URL.substring(33,document.URL.length);
}

if(document.URL.indexOf("&", 0) > 0) {
 screen = document.URL.substring(document.URL.indexOf("&", 0) + 1, document.URL.length);
}

if (screen == "screen=map") {
    location.assign("javascript:TWMap.resize(15, true);");
    var ekle = "<form action='' method='post'><br/><table class='vis' width='100%'>";
    ekle += "<tbody><tr>";
    ekle += "<th colspan='2' style='text-align:center;'>Düzenleyen: <a href='/game.php?screen=info_ally&amp;id=14086'>Web Designers</a></th>";
    ekle += "</tr><tr><td><table cellspacing='0'><tbody><tr><td>";
    ekle += "<img src='user_image.php?image_id=8954'>";
    ekle += "</td></tr></tbody></table></td></tr></tbody></table></form>";
    document.getElementById("map_topo").innerHTML += ekle;  
}

																																									 
var	menu = "<td><a href='game.php?screen=overview'><img src='graphic/face.png' style='margin:0px 2px' title='Köye Genel bakış' /></a></td>";
    menu += "<td style='border-left:dotted 1px'><a href='game.php?screen=main'><img src='graphic/buildings/main.png' style='margin:0px 2px' title='Ana Bina' /></a></td>";
    menu += "<td><a href='game.php?screen=market' ><img src='graphic/buildings/market.png' style='margin:0px 2px' title='Pazar Yeri' /></a></td>";
    menu += "<td><a href='game.php?screen=map' ><img src='graphic/ally_rights/found.png' style='margin:0px 2px' title='Harita' /></a></td>";
    menu += "<td style='border-left:dotted 1px'><a href='game.php?screen=barracks' ><img src='graphic/buildings/barracks.png' style='margin:0px 2px' title='Kışla' /></a></td>"; 
    menu += "<td><a href='game.php?screen=stable' ><img src='graphic/buildings/stable.png' style='margin:0px 2px' title='Ahır' /></a></td>";
    menu += "<td><a href='game.php?screen=garage' ><img src='graphic/buildings/garage.png' style='margin:0px 2px' title='Atölye' /></a></td>";
    menu += "<td style='border-left:dotted 1px'><a href='game.php?screen=snob' ><img src='graphic/buildings/snob.png' style='margin:0px 2px' title='Saray' /></a></td>";  																																														 
    menu += "<td><a href='game.php?screen=smith' ><img src='graphic/buildings/smith.png' style='margin:0px 2px' title='Demirci' /></a></td>"; 
    menu += "<td><a href='game.php?screen=place' ><img src='graphic/buildings/place.png' style='margin:0px 2px' title='İçtima Meydanı' /></a></td>"; 
    menu += "<td style='border-left:dotted 1px'><a href='game.php?screen=info_player&id=1319673' id='editor' ><img src='graphic/map/map_e.png' style='margin:0px 2px' title='Editor' /></a></td>";

    document.getElementById("menu_row2").innerHTML = menu; 
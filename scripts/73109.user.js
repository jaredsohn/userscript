// ==UserScript==
// @name          Eye Protector
// @include       http://*
// @include       https://*
// @version       0.8
// ==/UserScript==

var Gr1=240;  
var Gg1=240; 
var Gb1=240; 
var color="#EDEBE8"
var Gr,Gg,Gb;
function FGrgb(Grgb){
    var kaisi=Grgb.indexOf(",");
    Gr=parseInt(Grgb.slice(4,kaisi));
    var kaisi1=Grgb.indexOf(",",kaisi+1);
    Gg=parseInt(Grgb.slice(kaisi+1,kaisi1));
    Gb=parseInt(Grgb.slice(kaisi1+1,Grgb.length-1));
}
var Lcolor=""; 
Lcolor=document.defaultView.getComputedStyle(document.body,null).getPropertyValue("background-Color");
FGrgb(Lcolor);
if ((Gr>Gr1 && Gg>Gg1 && Gb>Gb1) || Lcolor=="transparent")
{document.body.style.backgroundColor=color;}
var alltags = document.getElementsByTagName("*");
for (x in alltags) {
        Lcolor = document.defaultView.getComputedStyle(alltags[x],null).getPropertyValue("background-Color");
        FGrgb(Lcolor);
        if (Gr > Gr1 && Gg > Gg1 && Gb > Gb1) {
                alltags[x].style.backgroundColor = color;
        }
}
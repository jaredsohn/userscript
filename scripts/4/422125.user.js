// ==UserScript==
// @name       Addon - RK Czat
// @version    0.0.4
// @description  Jednolinijkowy skrypt do rozszerzenia możliwości RK.
// @match      http://www.krolestwa.com/EcranPrincipal.php*
// @copyright  2014, Yuraa
// ==/UserScript==
x = GM_getValue("x");
if (isNaN(x)) x=170;
if (isNaN(GM_getValue("close"))) GM_setValue("close",1);

unsafeWindow.rozmiar = function(size) {
    if (!size) x = document.getElementById("supertajnyczat").height= parseInt(x)-100;
    if (size) x = document.getElementById("supertajnyczat").height= parseInt(x)+100;  
	GM_setValue("x",x);
}

unsafeWindow.close = function() {
    if (document.getElementById('supertajnydiv').style.display == "none") {
        document.getElementById('supertajnydiv').style.display = "";
        GM_setValue("close", 1);
    }
    else if (document.getElementById('supertajnydiv').style.display == "") {
        document.getElementById('supertajnydiv').style.display = "none";
        GM_setValue("close", 0);
    }
}
   

document.getElementsByClassName('colonneEntiere')[0].innerHTML =  '' +
    				'<a href=javascript:close(); style="color:#E7B965; text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;x</a><div id=supertajnydiv><iframe id=supertajnyczat src="http://srebrnegaroty.forumotion.com/chatbox" width="98%" frameborder=0 height='+x+'>' +
					'Ups, coś się zepsuło :(' +
                    '</iframe>'+
    				'<p align=right><a href="javascript:rozmiar(false);" style=color:#E7B965>Pomniejsz </a>'+
    				'<a href="javascript:rozmiar(true);" style=color:#E7B965>Powiększ </a></p>'+
    				'<a href=http://srebrnegaroty.forumotion.com style=color:#E7B965 target=_blank>Przejdź na forum Srebrnych Garot</a></div>';
if  (GM_getValue("close")==0)  document.getElementById('supertajnydiv').style.display = "none";
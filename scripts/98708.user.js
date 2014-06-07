// ==UserScript==
// @name           Salto disponible
// @description    Muestra el tiempo que falta para disponer de nuevo del salto cuantico.
// @author         Gius
// @namespace      Salto cuantico disponible en...
// @version        1.5.2
// @date           2012-06-11
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=eventList*
// @exclude        http://*.ogame.*/game/index.php?page=empire*
// @desciption     View all pages in the time remaining to provide new quantum jump (only ogame redesign). Visualiza en todas las paginas el tiempo que falta para disponer de nuevo del salto cuantico (solo ogame rediseño).
// @copyright  2012+, Gius
// ==/UserScript==

/*
---------------Relevant Changes--------------------
Options Menu included.
Debuging for faster run.
language options disabled.
*/
//---------------var defaults settings options MENU (change this as you like)-- Opciones visuales por defecto (cambialas como prefieras)---
var colorear = GM_getValue("colorval", "SI");
var grandeslunas = GM_getValue("granlunas", "SI");
var lunasderecha = GM_getValue("lunasder", "SI");
var giro = GM_getValue("giroluna", "SI");
var saltodestino = GM_getValue("destino", "NO");
var efectos = GM_getValue("efectosl", "SI");
//--------------please do not touch anything from here--- por favor, no tocar nada a partir de aqui---
var $;
try { $ = unsafeWindow.$; }
catch(e) { $ = window.$; }
var a;
var n = 0;
var tituloa;
var imagenscript;
var scrimg;
var cambios;
var txtJump = "ready";
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var page = document.location.href;
//---------------------Images encoded in base64 and style --------------------
if(is_chrome){
    var estilo = GM_getValue("estilo", 'margin-left: 0px; margin-right: 4px; margin-top: 1px;margin-bottom:1px; width: 18px; height: 18px;');
}else{
    var estilo = GM_getValue("estilo", 'margin-left: 0px; margin-right: 1px; margin-top: 1px;margin-bottom:1px; width: 16px; height: 16px;');
}
var img1 = 'data:image/gif;base64,R0lGODlhEAAQAOZ/AJXJ/2mf/ff8tKr8k9H/rPn6/dH7j6t19opv+az6tpL7x/CP2P7fmvv2kfZyjO6W/qLcMPqMc1BM7v/Jd8f/cP9pcpL/kP+qh3F493zmapv4rv2ubFB187Py/fi4+mv1xpP4+2bI/nTYLbhd9v9xzKb/dpCw/M4zp3P/qfZ2tbgpy/2KiPjSVMbk/6763v/37vne+uj/fd1GbP7Zz9N6/20syN/66d0vNZ2X///pxTvdbv7EndpX///odjDt1Hvj/5j/33TfWISa/+D/3Oxx9P9j9/987Hn/4HL/gv+tuT3XOtC///dM/7+f/59Rz5tf//+EoWxJ0Xla/+Xl/+/++jjhoPiDWVfuy/u6VNluvP9elf9PqMuN3+1nMtrsZ+bnHvPmbWLp/2//5dLR92T9+hkS1nv9+sf/3IL15A9++JPn/1filFXlof77bVbfZv9S2VjhdBvc8hjt6zLK94+B4bO9/4SF+P/G4fjd5ueGoOSQutP++v2VvtAaZvr+2f///yH5BAEAAH8ALAAAAAAQABAAAAf0gH+CBQlBIiIQEF4Cgo1/Nm5KGQMGlV5fYC+NNjpwGgMlJRQxAg0sLJoFbGsaSEgWlDFtPQxYG38uVQooKLAEBA0NExM7XTNXH0AfCgkJBAICDBMbO1YRPmhiR0AuZ0N+OTsXEeRdciBkZiAde1QvM0krFRUrN3EgYT9qHS1TMHdJoMxzcGPOjxAhAACos8SDhwUptDhwIAMhgAABhOBo8uCBERJb+MjI0yKNiQAcMCA4QINIkTckUvTB8welCQwSpDwZwYOJkQUn9AziIMEODgQ7aTwgciJLgUYFMJSRsPLACBUqFjx19GcMnSg1ajjhAsNRIAA7';
var img2 = 'data:image/gif;base64,R0lGODlhEAAQAPcAAEJFZUBMY0FMbEFUeEhKQUpKSkhKUUhMWkhNZEdSfkNXhVNNSVJOZlBTYk9SdEVaiENhm0Fvolw+G1RWXVBcglBbjEpfelxTY1lca1NeglBkilFml1Nxp1N8sVOFvFKQx3A+CVpeeFtwmFt8mFqQrlmaxXhDCWNlbGJldWFlgGSnx2O0x3BzaHFxcW5xmGiKqHS80XTJ0Y49AXp6enh5l3V5oXSkq3SitoLB1InW3obe2X6Nn5PW3Jrq5YqKipvR2art6JibpLfx7KhqJrOzs7CzvNT/+8TExMHEzuX//bx8K/Hx8e3x+/P//8lfCclvFOXPpP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8B/yH5BAEAAP8ALAAAAAAQABAAAAi7AP8JDOJCBAUKNJAIXCgQSQoIJXBIfJFBIcN/ISLAUPGhBIwmSzRYHKhgo4qTJYwkuUGDIQYSOWLm2OgxxwaGAHD0AMKzx8YPOTiMBMBDiJGjQHJwxLFhZAMbQpI0SSLEp0cNDGdQSBKliZGqMGB4cMEQyYEdXoUkzVHiQZCLRBCI4AGEB44OCQywUAKl7AkHFAYICOFjgQknT/peRHJk4QUJMhArvrgwCAPIToZQvmhZAggCm+FOKNAiIAA7';
var img3 = 'data:image/gif;base64,R0lGODlhEAAQAOZ/ALLudwFtAP39+dP2pSS8AhS9AV+WXwGpAFaOVgNnAv39/Pb85g6+ADvKDhaJAwG+AACtANbyuQxyAmbFJibDBT7LGYnhSlaTVgCiADh+Nx28AOHt4Q60AACyAIThRg65AEHQEBJtEvX59fb59uPt4yiYCOHr4eby2w6GAACNAES7EAxrBhdvEjjAC0/LFmLEIPb69ovMT+Pu47LthiWNCxaTCjC6EG3GUefx3MnxnuL8s6Hik9buwHvcO73rsG/eL+by2CCWC+T40uz13jeDN1+ZX0HQDiybGjHEBzPDC2rPOCLACev34S/DCM/wsC/DBOHuzofaS8HYwYjmQhGzAPf+4KrVdsnxoM/wrjSbIt32xfX75Pv+46LnZ6bnbKfobKnob77sjsPtppfcWdj5qZDWY5bbbgC2AMrkoQe2AJDKWpbhbp7jZ8Twl4XXV4PVXYjYWSK9CXTXNhyJBqrocjS1H2XEThJrElvLIEjKFmfbLxrGAPL93cHWwf7+/v///yH5BAEAAH8ALAAAAAAQABAAAAfxgH+CMFJFIQkJdwZ9I4KOGxcBR3ZucDdZAQgbjjJEDm9kXFV8VTpmcxkkfyIXDmwDOWFWaFdtA2A0CCJ9AUoAXl9jQ35CdF0AURJ9BkFTFh4ePTMKfloWcno1BiE2P3gT4C9WAn5YBBAYh01Gajgn70AK1DsHEIgFe2UL+1tM8n4+6iUIceABgwoIbcQgFyFOh3QGUjw406EDhDpQ/DhZ0uFBikUBODD48IEKDz8RkqRhwCFAHxEIUFCgQEDDGjF5NMxEoesPiQwOWoBogORJAxAtHKRyZAKBhBIqXLhQUUICAhOOBI1YxmLFChaLGgkKBAA7';
var img4 = 'data:image/gif;base64,R0lGODlhEAAQAMQAAGXSZPz7/oS0eX7MfpGgk87/0k25TEtqT4Hsguj914LdgPv/7+n/4+n/+DKINFiKU6O5oXuTgkmaQbvWt+rr5tnu3Gm8a5b7oW2QX1e2Ydjh0cL/vuTm8j+kQqjMnqzmpSH5BAAAAAAALAAAAAAQABAAAAW0YCCKC5OcCdOszRhQk4BhwsQwENGWnzUol4sCABgMMIzFIvZDKBQIhPETSVUsgKglY8FGFUjGxDI0KAqbAdGJSTQiAAWZEyAQns/I6jHsbEQRBw8OHR16DQdDEn8UL2gbGywRBgYdAxojCg4OBhAcCRASRGYFBQMdUQ8QShoSHQAGEpsZUQ4SGkoUHg+WThcAGbIeSkoJA5sdGRmFEgPELhoQDweCBBMBC3QuAQ0MpQUt3CIhADs=';
var img5 ='data:image/gif;base64,R0lGODlhEAAQAMQAAAAzALoAAADMAJkAAP9LSwCcADbnNv8AAABmAP8zMxTWFP9mZuwAANsAAP8XFwCCAEfwRyXfJQBNAAC2AP9/f8wAAFj4WKkAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABgALAAAAAAQABAAAAVUICaKw2ie4qWiaOC67FjNdBU3eN4APD8ywCBQQiSiDkgkYrlEOZ7Ph1SKSlithWwWReh2J2AwarEQmM9owYjCVrjf71hkTo/ERIZ8/j6C+PkmFichADs=';
var img6 ='data:image/gif;base64,R0lGODlhEAAQANU/APX19f5qOdmnp9ra2q8vLu88D8pLSv96Sem0tPn5+Xp5eePj4/9dLLISBpJQUKWlpZycnP1TIts2GP2BU6ttbWxdXWhmZurFxbS0tP1OG+/u7s9ubqZTU8TBwenp6c/Pz9YsD/pEFOZNMfz8/MgmHK0gG+eamoiIiMAaCulFGd0+Jv9YJso7O8oqIvJLG/9RHt8vDoRgYLWQkJ43N/+cavLBwXFkZN84MOba2vY/DvZEGMOenv5KGOptbfji4v///yH5BAEAAD8ALAAAAAAQABAAAAbJwJ+wZrgAhD8TS6AZIXuiCetzRIBWMMIgIbzRJiLK4EIKvCQciEe4mUwOJFkrsHKVLI/176J6M1ABDBEoFQofXD8ALAcBjQwrEg4WGBpIIwIqjispBBUQC05CPgYigSsRBTOGiElzphEZGQUEHUc/CBKmpxk8ISEFJTtNuI8RLg0wvTk5qbUEES8ZKSUVDjAhzCgxahs6GSCdCg8cICANkpQ4BCWSJx0eAxQONuKgCR8QJw8DRwkDGA86LEAEYMECDaxGaNBg60cQADs=';
//--- Options declarations-----
var picslinks = Array("colorear", "grandes_lunas", "lunas_a_la_derecha", "giro_luna", "posicionar_en_destino", "efectos_en_lunas");
var linkElement; 
var linkElementChild;
// Added to work with opera
if (document.location.href.indexOf ("/game/index.php?page=") == -1)
    return;
//---Delete litle space in midle of left menu list---
$('div.adviceWrapper br').remove('br');
//--Add images to left menu--
for (var i=0; i<picslinks.length; i++){
    n = n + 1
        switch(n){
            case 1: imagenscript = img1; cambiovalor = colorear; break;
            case 2: imagenscript = img2; cambiovalor = grandeslunas; break;
            case 3: imagenscript = img3; cambiovalor = lunasderecha; break;        
            case 4: imagenscript = img4; cambiovalor = giro; break;
            case 5: imagenscript = img5; cambiovalor = saltodestino; break;
            case 6: imagenscript = img6; cambiovalor = efectos; break;
                //default: image no set, I`t is not matter;
        }
    if (efectos == "NO"){
        if (picslinks[i] == "efectos_en_lunas"){
            tituloa = "'" + picslinks[i] + "' ¡DESACTIVADO!. Todos los demas efectos seran ignorados.";
        }else{
            tituloa = "¡No puedes activar '" + picslinks[i] + "'!. Activa antes 'efectos_en_luna' (imagen X de la derecha).";
        }
    }else{
        tituloa = "El valor actual de '" + picslinks[i] + "' es: " + cambiovalor + ".";
    } 
    linkElement = document.createElement("a");
    linkElement.setAttribute("class", picslinks[i]);
    linkElement.setAttribute("href","javascript:void(0);");
    linkElement.setAttribute("title",tituloa);
    linkElementChild = document.createElement("img");
    linkElementChild.setAttribute("src",imagenscript);
    linkElementChild.setAttribute("style",estilo);
    linkElement.onmouseup = function(){options(this.getAttribute("class"));};
    linkElement.appendChild(linkElementChild);
    if (document.getElementById("advice-bar")) {document.getElementById("advice-bar").appendChild(linkElement);}
}
function options(opt) {
    if (opt == "colorear"){
        if (colorear == "NO"){
            GM_setValue("colorval", "SI");
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("colorval", "NO");
        }
    }
    if (opt == "grandes_lunas"){
        if (grandeslunas == "NO"){
            GM_setValue("granlunas", "SI");
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("granlunas", "NO");
        }
    }       
    if (opt == "lunas_a_la_derecha"){
        if (lunasderecha == "NO"){
            GM_setValue("lunasder", "SI");
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("lunasder", "NO");
        }
    }
    if (opt == "giro_luna"){
        if (giro == "NO") {
            GM_setValue("giroluna", "SI");
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("giroluna", "NO");
        }
    }
    if (opt == "posicionar_en_destino"){
        if (saltodestino == "NO"){
            GM_setValue("destino", "SI");
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("destino", "NO");
        }
    }
    if (opt == "efectos_en_lunas"){
        if (efectos == "NO") {
            GM_setValue("efectosl", "SI");
        }else{
            GM_setValue("efectosl", "NO");
        }
    } 
    // If option selected current page
    location.reload();
}
var UniSpeedFactor;
var txtButton;
var txtJump;
var currentTime = new Date();
var TimeMoon;
var ArrayMoonTitle = new Array();
var ArrayMoonText = new Array();
var server = location.href.split('/')[2];
server = server.replace(".ogame.","_");
/*--------------language options disabled-----
switch(server)
{
// DE 
case "uni50_de": UniSpeedFactor = 2 ; txtJump = "bereit"; break;case "uni60_de": UniSpeedFactor = 2 ; 

txtJump = "bereit"; break;case "uni70_de": UniSpeedFactor = 4 ; txtJump = "bereit"; break;
// DK
case "uni10_dk": UniSpeedFactor = 2 ; txtJump = "klar"; break;
// ES
case "uni40_com.es": UniSpeedFactor = 2 ; txtJump = "listo"; break;case "uni50_com.es": UniSpeedFactor = 

2 ; txtJump = "listo"; break;case "uni106_com.es": UniSpeedFactor = 4 ; txtJump = "listo"; break;
// FR
case "uni50_fr": UniSpeedFactor = 2 ; txtJump = "disponible"; break;case "uni60_fr": UniSpeedFactor = 2 ; 

txtJump = "disponible"; break;case "uni106_fr": UniSpeedFactor = 4 ; txtJump = "disponible"; break;case 

"uni107_fr": UniSpeedFactor = 2 ; txtJump = "disponible"; break;
//HU
case "uni5_hu":  UniSpeedFactor	= 2 ; txtJump = "hely"; break;
//IT
case "uni25_it": UniSpeedFactor = 2 ; txtJump = "preparato"; break;case "uni30_it": UniSpeedFactor = 2 ; 

txtJump = "preparato"; break;case "uni35_it": UniSpeedFactor = 2 ; txtJump = "preparato"; break;case 

"uni40_it": UniSpeedFactor = 2 ; txtJump = "preparato"; break;case "uni105_it": UniSpeedFactor = 2 ; 

txtJump = "preparato"; break;case "uni104_it": UniSpeedFactor = 4 ; txtJump = "preparato"; break;
//NL
case "uni10_nl": UniSpeedFactor = 2 ; txtJump = "klaar"; break;
// ORG
case "uni30_org": UniSpeedFactor = 2 ; txtJump = "ready"; break;case "uni35_org": UniSpeedFactor = 5 ; 

txtJump = "ready"; break;case "uni40_org": UniSpeedFactor = 2 ; txtJump = "ready"; break;case "uni42_org": 

UniSpeedFactor = 2 ; txtJump = "ready"; break;case "uni105_org": UniSpeedFactor = 4 ; txtJump = "ready"; 

break;
//RU
case "uni10_ru" : UniSpeedFactor = 2 ; txtJump = "ready"; break;case "uni103_ru": UniSpeedFactor = 4 ; 

txtJump = "ready"; break;
//PL
case "uni50_pl": UniSpeedFactor = 2 ; txtJump = "gotowy"; break;case "uni60_pl": UniSpeedFactor = 2 ; 

txtJump = "gotowy"; break;
//PT
case "uni20_com.pt": UniSpeedFactor = 2 ; txtJump = "disposto"; break;case "uni103_com.pt": 

UniSpeedFactor = 4 ; txtJump = "disposto"; break;
//TR
case "uni50.tr_org": UniSpeedFactor = 2 ; txtJump = "nakit"; break;
//TW
case "uni10_tw": UniSpeedFactor = 2 ; txtJump = "ready"; break;
//US
case "uni5_us": UniSpeedFactor = 2 ; txtJump = "ready"; break;case "uni102_us": UniSpeedFactor = 3 ; 

txtJump = "ready"; break;
// DEFAULT
default: txtJump = "ready";
}
*/
//detects the speed of the universe (for new universes not included above)
if(UniSpeedFactor == null) {
    if(document.getElementsByName('ogame-universe-speed')[0])
    {var UniSpeedFactor = parseInt(document.getElementsByName('ogame-universe-speed')[0].content);}
    else
    {var UniSpeedFactor = 1;}
}
//var CuanticoNivel = 1; no matter the level (does not change the time ever)
//var FactorTotal = UniSpeedFactor*CuanticoNivel;
var FactorTotal = UniSpeedFactor;
var timeJump = 60/FactorTotal;
var wrenches = document.getElementsByClassName ("constructionIcon tips reloadTips");
if (wrenches.length == 0) {wrenches = document.getElementsByClassName ("constructionIcon tipsStandard");}
var alerts = document.getElementsByClassName ("alert tips reloadTips");
if (alerts.length == 0) {alerts = document.getElementsByClassName ("alert tipsStandard");}
if (efectos == "SI"){
    var moons = document.getElementsByClassName ("moonlink tips reloadTips");
    if (moons.length == 0) {moons = document.getElementsByClassName ("moonlink tipsStandard");}
    if (lunasderecha == "SI"){	   
        for (var i = 0; i < moons.length; i++){
            var thisMoon = moons [i];
            thisMoon.style.left = "115px";
            if(is_chrome){thisMoon.style.top  =  "18px";} else {thisMoon.style.top  =  "20px";}
            var img = thisMoon.getElementsByTagName ("img") [0];
            //img.style.width  = "25px";img.style.height = "25px";
            var system = thisMoon.parentNode.getElementsByTagName ("span") [1].textContent.split (":") [1];
            img.setAttribute ("src", img.getAttribute ("src").replace (/_\d_small/, "_" + ((system % 5) + 1) + "_3"));
        }
        for (var i = 0; i < wrenches.length; i++){
            var thisWrench = wrenches [i];
            thisWrench.style.left = "105px";
            thisWrench.style.top  =  "35px";
        }
        for (var i = 0; i < alerts.length; i++){
            var thisAlert = alerts [i];
            thisAlert.style.left = "132px";
            thisAlert.style.top  =   "0px";
        }
    }else{
        for (var i = 0; i < wrenches.length; i++){
            var thisWrench = wrenches [i];
            thisWrench.style.left = "92px";
            thisWrench.style.top  =  "35px";
        }
        for (var i = 0; i < alerts.length; i++){
            var thisAlert = alerts [i];
            thisAlert.style.left = "57px";
            thisAlert.style.top  =   "35px";
        }
    }
}
function rotate(elm) {
	degrees=((elm.getAttribute('data-ff-degrees') || 0) - 0 + 90 ) % 360;
	elm.setAttribute('data-ff-degrees', degrees);
	elm.style.transform = 'rotate(' + degrees + 'deg)';
	elm.style.MozTransform = 'rotate(' + degrees + 'deg)';
	elm.style.OTransform = 'rotate(' + degrees + 'deg)';
	elm.style.WebkitTransform = 'rotate(' + degrees + 'deg)';
}
function GetMoonCode(smallplanet){
    var MoonLink = smallplanet.getElementsByClassName("moonlink")[0] ;
	if(MoonLink != null){
		MoonLinkParams =  MoonLink.href.split("&");
		return MoonLinkParams[MoonLinkParams.length - 1].substr(3);
	}else{
		return 0 ;
	}
}
var ListPlan = document.getElementsByClassName("smallplanet");
for( i=0; i < ListPlan.length ; i++){
	CodeMoon = GetMoonCode(ListPlan[i]);
	if(ListPlan[i].getElementsByClassName("active")[0] != null){
		GM_setValue("SelectedMoon"+server, CodeMoon);
	}      
	if (CodeMoon != null){
	    if(ListPlan[i].getElementsByClassName("moonlink")[0] != null){
            ArrayMoonTitle[i] = ListPlan[i].getElementsByClassName("moonlink")[0].title;
            ArrayMoonText[i] = ListPlan[i].getElementsByClassName("planet-koords")[0].textContent;
	    } 
	}else{
        ArrayMoonText[i] = "" ;
	}
	TimeMoon = GM_getValue("Moon"+CodeMoon,0);
    if(ListPlan[i].getElementsByClassName("moonlink")[0] != null){
        var imagen = ListPlan[i].getElementsByClassName("moonlink")[0].getElementsByTagName("img")[0];
    }
	var coor = ListPlan[i].getElementsByClassName("planet-koords")[0];
    if (efectos == "SI"){
		if (grandeslunas == "SI") {
            if (colorear == "SI") {
                imagen.setAttribute('style','position:relative;width:20px;height:20px;border:1px;color:solid green;border-radius:12px 12px 12px 12px;');
                imagen.style.border="1px solid green";
            }else{
                imagen.setAttribute('style','position:relative;width:20px;height:20px;');
                coor.style.color="";
            }
		}else{
            imagen.removeAttribute ('style');
            if (colorear == "SI") {
                imagen.setAttribute('style','border:1px;color:solid green;opacity:.7;border-radius:9px 9px 9px 9px;');
                imagen.style.border="1px solid green";
            }else{
                coor.style.color="#ffffff";
            }    
		}
	}else{
        imagen.removeAttribute ('style');
    }
}
var JumpGateForm = document.getElementById('jumpgateForm');
if(JumpGateForm != null){
	SelectDest = JumpGateForm.getElementsByTagName('select')[0];
	if(SelectDest != null){
        //var val = document.getElementById('selecttarget').getElementsByClassName("fright")[0].getElementsByTagName("select")[0].value;	
		var val = SelectDest.value;
		GM_setValue("JumpGateDest"+server,val);
		SelectDest.addEventListener("change", function(event) {
			val = SelectDest.value;
			GM_setValue("JumpGateDest"+server,val);
		}, true);
	}
}
//lack hide interact with jump links antigame moons (does not work in this script)
/*---proves
if (document.getElementById('anti_jumpgate')) {document.getElementById('anti_jumpgate').remove('a');}
$('table#anti_jumpgate tbody').remove('tbody');
$('div.adviceWrapper br').remove('br');
*/
if(page.indexOf("page=station")> -1){
    var NotifBox = document.getElementById('errorBoxNotify');
    //var AjaxBox = document.getElementById('TB_ajaxContent');
    var OKResponse = document.getElementById('errorBoxNotifyOk');
    //NotifBox.innerHTML = "<div id='wrapper'><h4 id='errorBoxNotifyHead'>-</h4><p id='errorBoxNotifyContent'>-</p><div id='response'><div><a href='#' class='ok'><span id='errorBoxNotifyOk'>.</span></a></div><br class='clearfloat'></div></div>";
    //if(AjaxBox != null) {AjaxBox.removeAttribute('style');AjaxBox.setAttribute('style','position:relative;top:500px;width:400px;height:195px;border:2px;color:solid blue;');}
    if(OKResponse != null){
        NotifBox.addEventListener("mouseover", function(event) {
            OKResponse.click();
            currentTime = new Date();            
            page = page.replace("station", "overview");
            page = page.replace("&openJumpgate=1", "");
            if(page.indexOf("&cp=") > -1){
                var CpParam = page.substr(page.indexOf("&cp="),page.length - 1);
                page = page.replace(CpParam,"");
            }
            page = page + "&cp="+GM_getValue("JumpGateDest"+server,0);
            GM_setValue("Moon"+GM_getValue("JumpGateDest"+server,0),currentTime.getTime().toString());            
            GM_setValue("Moon"+GM_getValue("SelectedMoon"+server,0),currentTime.getTime().toString());
            if (saltodestino=="NO") {window.location = window.location;} else {window.location = page};
		}, false);
		NotifBox.removeEventListener("mouseover", function(event) {}, false);
		if(document.getElementById("slot01") != null){	
			OpenJG = document.getElementById("slot01").getElementsByTagName("a")[0];
			txtButton = OpenJG.innerHTML;
		}
    }
}
setInterval(AddCountDown,1000);
function AddCountDown(){
	currentTime = new Date();
	for( i=0; i < ListPlan.length ; i++){
		CodeMoon = GetMoonCode(ListPlan[i]);
		if(GM_getValue("Moon"+CodeMoon,null) != null){
			TimeMoon = parseInt(GM_getValue("Moon"+CodeMoon,0));
			var Titulo = ListPlan[i].getElementsByClassName("moonlink")[0]
            var Texto = ListPlan[i].getElementsByClassName("planet-koords")[0];
			var imagen = Titulo.getElementsByTagName("img")[0];
			if (currentTime.getTime() < TimeMoon + (3600 * 1000)/FactorTotal){
				CountDownTime = (TimeMoon + (3600 * 1000)/FactorTotal) - 
                    
                    currentTime.getTime()
                    var d = new Date(CountDownTime);
				var min = d.getMinutes();
				var sec = d.getSeconds();
				var minutos = min; var segundos = sec;
				if (sec < 10) {segundos = "0"+sec;}
				var ts = minutos+"m "+segundos + "s";
				if (minutos == 0) {ts = segundos + "s";}
				if (segundos == 0) {ts = minutos+"m";}
				var totalSeg = (min*60) + sec; //maximum must always be 255
				var TiempoT = timeJump*60;
   				if ((min+sec) >= 0 | (min+sec) < timeJump | (min+sec) < 901) {
					if (colorear == "SI") {
						var randomnumber=((Math.random()+sec-sec)/2)+0.5;
						var difTiempo = TiempoT-totalSeg; 		//of 0 to 900
						var factor = 128/TiempoT; 			//0,142
						var sube128 = parseInt(difTiempo*factor); 	//of 0 to 128
						var baja128 = (128-parseInt(difTiempo*factor));	//of 128 to 0
						var subecolor = (128+sube128);		//of 128 to 255
						if (sube128 >= 0){var colorin = 'rgb('+(subecolor)+', '+(sube128)+', 0)';} 	//red range 
						if (sube128 >= 64){var colorin = 'rgb('+(subecolor)+', '+(subecolor)+', 0)';}		//yellow range
						if (sube128 >= 116){var colorin = 'rgb('+(baja128)+', '+(subecolor)+', 0)';}
						if ((min+sec) <= 0){ts = "";colorin = "white";}
						if(efectos=="SI"){
                            Texto.innerHTML = "<b>" + ArrayMoonText[i] + "</b><br><p style = 'color: " + colorin + "'>" + ts + "</p>";
                            imagen.style.border= "1px solid "+colorin;
                            imagen.style.opacity=randomnumber;
                            //if (lunasderecha == "SI") {if(is_chrome){imagen.style.top  =  "18px";} else {imagen.style.top  =  "20px";}}
                        }else{
                            Texto.innerHTML = "<b>" + ArrayMoonText[i] + "</b><br><p style = 'color: '>" + ts + "</p>";
                        }
						if (giro == "SI") {imagen.style.MozTransform = 'rotate(' + parseInt((randomnumber*720)/2) + 'deg)';}
					} else{
						Texto.innerHTML = "<b>" + ArrayMoonText[i] + "</b><br><b>" + ts + "</b>";
					}
            } else {
                ts = "";
            }
        }
    }
    if(page.indexOf("page=station")> -1){
        if(document.getElementById("slot01") != null){	
            var LastJumpTime = parseInt(GM_getValue("Moon"+GM_getValue("SelectedMoon"+server,0),0));
            var OpenJG = document.getElementById("slot01").getElementsByTagName("a")[0];
            if (currentTime.getTime() < LastJumpTime + (3600 * 1000)/FactorTotal){
                var CountDownTime = (LastJumpTime + (3600 * 1000)/FactorTotal) - currentTime.getTime()
                var d = new Date(CountDownTime);
                var min = d.getMinutes();
                var sec = d.getSeconds();
                if (sec < 10) {segundos = "0"+sec;}
                var ts = min+":"+segundos;					
                OpenJG.innerHTML = "Disponible en: " + ts;
            } else {
                OpenJG.innerHTML = txtButton+txtJump;
            }
        }
    }
}
}
    //---------------Check for Update this script
    var SUC_script_num = 98708; // Number of this script to upgrade
//---------------language update options (Spanish and English only)
if (server.indexOf(".es")> -1) { 
	text1 = "Existe una nueva versión disponible para el script ";
	text11 = "\n¿Deseas ir a la página de instalación ahora?";
	text2 = "No hay actualizaciones disponibles para ";
	text3 = "ha ocurrido un error mientras se hacia un chequeo de actualizaciones:\n";
	text4 = " - Buscar nueva versión";
}else{
	text1 = "There is an update available for the script ";
	text11 = "\nWould you like to go to the install page now?";
	text2 = "No update is available for ";
	text3 = "An error occurred while checking for updates:\n";
	text4 = " - Manual Update Check";
}
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
                    {
                        method: 'GET',
                        url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                        headers: {'Cache-Control': 'no-cache'},
                        onload: function(resp)
                        {
                            var local_version, remote_version, rt, script_name;
                            
                            rt=resp.responseText;
                            GM_setValue('SUC_last_update', new Date().getTime()+'');
                            remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                            local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                            if(local_version!=-1)
                            {
                                script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                                GM_setValue('SUC_target_script_name', script_name);
                                if (remote_version > local_version)
                                {
                                    if(confirm(text1 + script_name + text11))
                                    {
                                        GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                        GM_setValue('SUC_current_version', remote_version);
                                    }
                                }
                                else if (forced)
                                    alert(text2 + script_name);
                            }
                            else
                                GM_setValue('SUC_current_version', remote_version+'');
                        }
                    });
			}
			catch (err)
			{
				if (forced)
					alert(text3 + err);
			}
		}
	}
    GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '98708') + text4, function(){updateCheck(true);});
	updateCheck(false);}
catch(err)
{}
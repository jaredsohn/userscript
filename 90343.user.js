// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MineMap advertisement removal", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           alpha_tools
// @namespace      www.vieoli.net/alphabounce
// @description    Automatise la position actuelle sur le site web (http://vieoli.net/alphabounce/), permet d'avoir une carte évolutive de son aventure dans alphabounce avec des objectifs et autres marquages.
// @include        http://www.vieoli.net/alphabounce/*
// @include        http://vieoli.net/alphabounce/*
// @include        http://www.alphabounce.com/user/*
// @exclude        http://www.alphabounce.com/user/missions*
// @exclude        http://www.alphabounce.com/user/ranking*
// @exclude        http://www.alphabounce.com/user/login*
// @exclude        http://vieoli.net/alphabounce/evol*
// ==/UserScript==

// ATTENTION mettre en premiere position. Ce script ne modifie pas le code.

// param
var URLtool = 'http://vieoli.net/alphabounce/';
var divaff = false;


// save install time
var install_time = getinfo("install_time");
if (!install_time){
    var qd = parseInt(new Date().getTime() / 1000);
    setinfo("install_time", qd);
    install_time = parseInt(qd);
}else
    install_time = parseInt(install_time);
// verif MAJ sur le site
if ($("divver")){
    var upd_time = parseInt($("divver").innerHTML);
    if (upd_time > (install_time+1000)){
        //aff2("install_time:" + install_time + "<br />upd_time:" + upd_time);
        if(confirm('There is an update available for the Greasemonkey script Alpha_tools.\nWould you like to go to the install page now?')){
			var qd = parseInt(new Date().getTime() / 1000);
			setinfo('install_time', qd);
			//GM_openInTab(URLtool + 'gm_script/alpha_tools.user.js');
            setTimeout('window.location.replace("' + URLtool + 'gm_script/alpha_tools.user.js")', 0);
		}
    }else
        $("verif_gm").innerHTML = 'Script GM OK';
    return; // rien d'autre à faire sur le site !
}
// cherche le user
var user = "anonyme";
var divs = $TN("div");
if (divs){
    var majok = false;
    for (var i = 0; i < divs.length; i++){
        if (divs[i].className == 'name' || divs[i].className == 'name '){
            user = StripTags(divs[i].innerHTML).trim();
            //affinfo(user);
            break;
        }
    }
}

// cherche les coords
var spans = $TN("span");
if (spans){
    //alert("nbimage:" + imgs.length);
    var majok = false;
    for (var i = 0; i < spans.length; i++){
        if (spans[i].className == 'coord'){
            var coord = spans[i].innerHTML;

            // checklast
            var last_coord = getinfo('last_coord_' + user, '');
            //affinfo(user + " (" + coord + "):" + last_coord);
            affinfo(user + '<br />');
            if (last_coord != coord){
                maj_coord(user, coord);
                majok = true;
            }
            break;
        }
    }
    if (!majok)
        affinfo('<a style="color: blue;" href="'+URLtool+user+'/" target="_blank">==</a>');
}

function maj_coord(qui, coord){
    setinfo('last_coord_' + qui, coord);
    sendinfo("quoi=coord", qui+"|"+coord, "affdiv");
    
}

//===========================
// Fonctions communes
//===========================
String.prototype.trim = function () {
   return this.replace(/^\s*|\s*$/,"");
}

String.prototype.simplify = function () {
    //return this.replace(/\s+/g," ");
    return this.replace(/\s+/g,"");
}

function $(el, context){
    if (!context) context = document;
    return context.getElementById(el);
}

function $N(el, context){
    if (!context) context = document;
    return context.getElementsByName(el);
}

function $TN(el, context){
    if (!context) context = document;
    return context.getElementsByTagName(el);
}

// retourne array de l'expression xpath
function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

function StripTags(strMod){
    if(arguments.length<3) strMod=strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
    else{
        var IsAllowed=arguments[1];
        var Specified=eval("["+arguments[2]+"]");
        if(IsAllowed){
            var strRegExp='</?(?!(' + Specified.join('|') + '))\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }else{
            var strRegExp='</?(' + Specified.join('|') + ')\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }
    }
    return strMod;
}


function sendinfo(sparam, strinfo, retour){
    window.setTimeout(function() {
        sendinfo1(sparam, strinfo, retour);
    }, 1000);
}
/**
 * envoie des infos vers URLtool
 * re�oit reponse avec retour = id de div ou autre
 */
function sendinfo1(sparam, strinfo, retour){
    if (!URLtool){ /*alert("Url non definie");*/ return; }
	var msgheader = "sendinfo(" + strinfo + ")\n";
	var sretour = "Resultat requete";
	if (GM_xmlhttpRequest) { // envoie une requeste pour enreg la sonde :)
		GM_xmlhttpRequest({
			method: "POST",
			url: URLtool + "plugins.php?" + sparam + "&data_tmp=" + strinfo,
			headers: {
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "application/text,text/html,text/xml",
				"Content-Type": "text/html"
			},
			onload: function(responseDetails) {
			/*
			data: sparam + '&data_tmp=' + strinfo,
			headers: {
                "User-agent": "Mozilla/4.0 (compatible) ",
                "Content-type": "application/x-www-form-urlencoded",
                "Accept": "application/atom+xml,application/xml,text/xml",
                "Referer": "http://" + ikaserver + "/index.php"
            },
    		*/
                if (retour == false){
				    alert (msgheader + '\nReponse: ' + responseDetails.status +
					  ' ' + responseDetails.statusText + '\n\n' +
					  'Feed data:\n' + responseDetails.responseText);
                }else if (retour == undefined){
                    return true;
                }else if (retour == "majdata"){
                    // pour la mise � jour des datas entre le site et le script
                    majdata(responseDetails.responseText);
                }else{
                    var b = responseDetails.responseText;
                    var sign = b.indexOf("signin");
                    //sign = sign + 6;
                    if (sign != -1){
                        var lien = $x("/html/body/div/div/ul/li[2]/a");
                        if (lien){
                            var src = lien[0].href;
                            var idp = src.split("/");
                            idp = idp[idp.length-1];
                            b = b.substr(0, sign) + idp + b.substr(sign+6);
                        }
                    }
                    $(retour).innerHTML = b;
                }
			}
		});
    }
    if (retour != "retour")
        return true;
}

function toggleconfig(elem){
    window.setTimeout(toggleconfig1, 0, elem);
}
function toggleconfig1(quoi){
    var etat = GM_getValue(quoi);
    etat = etat ? false : true;
    GM_setValue(quoi, etat);
    document.location.reload();
    return true;
}
function getinfo(clevaleur){
    var retour = GM_getValue(clevaleur);
    if (!retour) return false;
    return retour;
}
function setinfo(clevaleur, quoi){
    window.setTimeout(function() {
        GM_setValue(clevaleur, quoi);
      }, 0);
    return true;
}
function delinfo(clevaleur){
    GM_deleteValue(clevaleur);
}

function affinfo(quoi){
    if (!$("affdiv") || !divaff){
        // div de status
        var a = document.getElementsByTagName("body")[0];
        if (a) {
            var divret = document.createElement('div');
                divret.setAttribute('id', 'affdiv');
                divret.setAttribute('align', 'center');
                divret.setAttribute('style', 'font-size: 10px; vertical-align:top;overflow-x:hidden;overflow-y:scroll; background: RGB(253,247,221); border: 3px double RGB(228,184,115);color: black; width: 150px; height:28px; position: absolute; z-index: 500; left:300px; top:380px;');
            a.appendChild(divret); // visibility: hidden
        }
        divaff = true;
    }
    if ($("affdiv").innerHTML != '')
        $("affdiv").innerHTML += quoi;
    else
        $("affdiv").innerHTML = quoi;
}
function aff2(quoi){
    if (!quoi) quoi = "";
    var capa = document.createElement ("div");
		capa.id = "autoUpdater_capaAutopUpdate";
		capa.innerHTML = "<img style='float: left; position: relative; top: 1px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABeVJREFUWIWdlltsFNcZx39nbnvxLmsb7DXGgPEFY1OblhaqtEqEEigRaZ6qSKlS8hJFSVVUiUp9QH3hqbSqVKS0VZOXPDRtX5KoqqKkoUAETZSQ0FYkuHZI2MXB4Nvaa4/3vrMzpw/eXe+Mb2s+6dPczvn+v/N95zKCTdjvH2NryeCJoCaekYg+W7LVdmRAVUVOhTlwbuVK/EUr8vapy8zVE1PUJXyCvboqfieF8sienVG1u3+vHmndRkNDAEMRFG2HTDaPmZglNvqFdefutI1jXy05/PTUO3zxwABnn8KI5viDomrPHD486B84OChEysRJmch8bmUw3UAJRyDcyOjNYXnt2s28tO0/TwU4dfZ1ipsC+OP3aMUnLnbtivY/cuKori4ksc0kSLkec9WU0Bacxlb+dfFSKf7V9AgFjv34n8zUBfDb4zQHdfHZoUP724cODgn73hjSsesSdkcXqG0dDA+Pyo+vj0zminLwZxdI1jZRvX3OHkFrDIirDx0e6P3agQHFvv8VSGfz4mWT6UXadnaIQINomJqYPXaonVevjFENqHg7tIU519MZHdx/8OuKPTFed8rXM3tuhv6+AaV3T8tQW5hztd9cJTh/nO2RoDr8o+d+2OyMx9dNu/at51CHnl4WGX6T0icvr00hBMr2Hfz1T39bWMg6A6cvMAmeDAT9nH/o8EATZnLjmksH4QtXHblRe4mcT/Kdb/dFgn7OV15XAV45SgQpTvR845vCNpOrB6mNlzc9z4sb98ll6drbJ4RQnnjlKBEXQE7n8a7tTbrMLNZXdw8AhY0BliCKdLaFjZzO4y6AoM7JPX2dfpmqLxDeEefn6+rmpE2693UaQZ2TLgAkfY0tLchCvq5AsrD5EgDIUolIcxNI+gC0yoeSQ0u4qRknZa7d2yXobuek7iHTU0t7htAQRgMYDav2DQX82FK0glwGcASGqqk4da77KkB5Ict7/0HmlievBND8iGALIhQFZXnPU7GRYEBNBhRJ0S7kAgix/iS0LWR2FpmeATsPmh8c2yVetVIeuTiOTE8iIh2IYCsIgS0dkEuHUxVAU0ikkolISNOQlrUyWMFEphPI/PKBJLNJxJb21cVrzSkh58eQ6WlEoJmMbzuaImdcAAhuLdy/0xOKtpc72VDKIHMmMjsL9srTtPj6sxBshlx9KwArB8osZtIPglsugKzFa/H4zKM7WwMB+966/xBVs2OXEQ3bkJnZ+gAApXEb8c+nC1mL16BmGQYs3r2TKFgitAXEijNqVTN+8CqBXyTwPfvWJgC2Ep/MWAGLd10AL1zCROEft2/GpVYpwwamlQ8jdd/311xyLvFIE7GxWQny7RcuYboAALJ5Tl8bSSZpbkEYvg0DWlfPIXPzlD58CYqZDdQVlPbdXLsxtZDNc7ryesUf0ctP8pvuqO8nR47sDxRHb4Dz4D8jVROgd/Vz9fp4MTaRfunFt/h5lcvbdirFmdh04X/Dn8ZLeu+AawN5MHGBtqubkfi8E5tIfzaV4kzt5xXRr4zhPLqHN2fm8idV2wrtONAvHHMe7NLmtVUNvWeA4dvzzifD05NZi++euYyrVqsO70IMa3eIN4rF/LH5mWSk8+CgpvoMyKTqO6qFQI22I3f1cOWD29bN2MLn/77L8V99yBzgqulqAD4gcH0K+d8Eb/SG7Y6RWxPdPl3VokP7hRIsz3bHds0PoRuIhhBaWwfKrm5G46Z858rt/Phs8e+//IjnP7hLhqWSC8CmfFx4J6EO+MsQVT/ew95jXZwJ6hzY3epXeru2GU1bGwk2BjF0laLlkFnMYM4t8mUsYY3N5JxskRsXYvz6YowvgUKN52uuKwCMGmEviL+nkZaHu3h4XzOPBTR2oBCW4BNQkA7pfIn7o3O89/4d3o8tkFhDuHK/KoDwCBuee6OcJZ2lbVwtp1WyVNsSYJW9WOMFj2fXKoE3E17RirBWFlZqYjhltz0gFZgCkCs/u0a8nikeiNpRV7xilSzUQhTK4hae2V+x/wPtT4l4Dsej0AAAAABJRU5ErkJggg=='/>" +
						 "<br />" + quoi;

		document.getElementsByTagName ("body")[0].appendChild (capa);

		capa.style.top = "20px";
		capa.style.left = "20px";

}

// log final
var lo = parseInt(new Date().getTime() / 1000);
GM_log("Alpha_tools end (" + lo + ")");
// add menu command
GM_registerMenuCommand ("aff2",	function (){
    aff2("test");
});

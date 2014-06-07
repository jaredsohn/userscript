// ==UserScript==
// @name        Pokebip - Espace Membre
// @namespace   Linking13   
// @description Script permettant de donner une autre apparence au forum.
// @include     http://www.pokebip.com/pokemon/index.php?phppage=membres/*
// @version     1
// ==/UserScript==

// Récupération de l'url du cookie
var customban = getCookie("customban");
if (customban != null && customban != "") {
	var banniere = document.getElementsByClassName('titre')[0];
    banniere.innerHTML = "<img src=\"" + customban + "\" />";
}

addBanParam();

//alert("ok end");

function addBanParam() {
    
    // ajout de la pop up    
    document.body.innerHTML += "<div id=\"banparam\" style=\"opacity: 0.25; transition: all .20s linear;\"><img src=\"http://i.imgur.com/Cdhh9hx.png\" style=\"vertical-align: middle;\" title=\"Modifier la bannière\" />&nbsp&nbsp<span style=\"font-family: sans-serif; font-weight:bold;\">Modifier la bannière</span></div>";
        
    var banparam = document.getElementById("banparam");
    banparam.onmouseover = function() { banparam.style.opacity = "1"};
    banparam.onmouseout = function() { banparam.style.opacity = "0.25"};
    
    //cell.onclick = function () { mafunction(param); }
    
    banparam.style.cursor = "pointer";
    
    banparam.style.position = "fixed";
    banparam.style.top = "10px";
    banparam.style.left = "10px";
    
    banparam.onclick = function () {
        var url=prompt("Entrez l'url de la nouvelle bannière. La dimension conseillée est de 990*160 pixels. Laissez vide pour utiliser la bannière par défaut.","http://i.imgur.com/dScmIK1.png");
        if(url == null) {
            
        }
        else if(url == "") {
            alert("La bannière par défaut va être utilisée.");
			setCookie("customban", "http://www.pokebip.com/pokemon/skins/sinnoh/images/em.jpg", 365);
            window.location.reload();
        }
        else {
			setCookie("customban", url, 365);
			window.location.reload()   
        }
    
    };
    
    
}

function setCookie(cname, cvalue, exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; ++i) 
	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0)
			return c.substring(name.length,c.length);
	}
	return "";
}

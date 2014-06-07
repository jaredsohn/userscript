// ==UserScript==
// @name Clodogame - Babioles
// @author Memphis007
// @description Affiche la babiole équipée au dessus de l'avatar (Script Original Infozentrale de Sageo, adapté par Lordclodo et Memphis007)
// @maj Supression des liens pourris sous les icones de babioles.
// @version	2.2
// @include	http://*.clodogame.fr/*
// @exclude	http://board.clodogame.fr*
// @exclude *login/*
// @exclude	*logout*
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("www.clodogame.fr")>=0 || url.indexOf("paris.clodogame.fr")>=0) {
	// Icones
	var PLUNDER_URL = 'http://www.clodogame.fr/stock/plunder/';
	var PLUNDERCHANGE_URL = 'http://www.clodogame.fr/stock/plunder/change/';
	// URL des babioles
	var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder_new/old/";
	//Recup babiole actuelle
	function GetCurrentPlunder(doc) {
		var plunderbox = doc.getElementsByClassName("box")[0].getElementsByTagName("tr");
		for (var i = 0; i < plunderbox.length; i++) {
			if (plunderbox[i].getElementsByTagName("strong")[0] == null) {type_b = "undefined"} else {type_b = plunderbox[i].getElementsByTagName("strong")[0].textContent};
			if (type_b == "Babioles de combat") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole d\'attaque - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '830', '60', '101');
				}
			}
			if (type_b == "Babioles d'ornement") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole de formation - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '880', '60', '102');
				}
			}
		}
	}
}

if (url.indexOf("marseille.clodogame")>=0) {
	// Icones
	var PLUNDER_URL = 'http://marseille.clodogame.fr/stock/plunder/';
	var PLUNDERCHANGE_URL = 'http://marseille.clodogame.fr/stock/plunder/change/';
	// URL des babioles
	var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder_new/old/";
	//Recup babiole actuelle
	function GetCurrentPlunder(doc) {
		var plunderbox = doc.getElementsByClassName("box")[0].getElementsByTagName("tr");
		for (var i = 0; i < plunderbox.length; i++) {
			if (plunderbox[i].getElementsByTagName("strong")[0] == null) {type_b = "undefined"} else {type_b = plunderbox[i].getElementsByTagName("strong")[0].textContent};
			if (type_b == "Babioles de combat") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole d\'attaque - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '830', '60', '101');
				}
			}
			if (type_b == "Babioles d'ornement") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole de formation - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '880', '60', '102');
				}
			}
		}
	}
}

if (url.indexOf("reloaded.clodogame.fr")>=0) {
	// Icones
	var PLUNDER_URL = 'http://reloaded.clodogame.fr/stock/plunder/';
	var PLUNDERCHANGE_URL = 'http://reloaded.clodogame.fr/stock/plunder/change/';
	// URL des babioles
	var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder_new/";
	//Recup babioles actuelles
	function GetCurrentPlunder(doc) {
		var plunderbox = doc.getElementsByClassName("box")[0].getElementsByTagName("tr");
		for (var i = 0; i < plunderbox.length; i++) {
			if (plunderbox[i].getElementsByTagName("strong")[0] == null) {type_b = "undefined"} else {type_b = plunderbox[i].getElementsByTagName("strong")[0].textContent};
			if (type_b == "Babioles de combat") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole d\'attaque - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '830', '60', '101');
				}
			}
			if (type_b == "Babioles de formation") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole de formation - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '880', '60', '102');
				}
			}
			if (type_b == "Babioles pratiques") { 
				u = i+1;
				if (plunderbox[u].getElementsByTagName("strong")[0] != null)
				{
					var plunderimg = plunderbox[u].getElementsByTagName("img")[0].getAttribute('src');
					var plundername = 'Babiole pratique - '+plunderbox[u].getElementsByTagName("strong")[0].textContent;
					ShowImg('/stock/plunder/', plunderimg, plundername, '35', '', '943', '60', '102');
				}
			}
		}
	}
}

//Affichage de l'image babiole
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {
	if (imglink != '') {
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
		var newimg = newlink.appendChild(document.createElement('img'));

	} else {

		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
	}

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}


function HTML2DOM(content) {
	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;
	return dummyDiv;
}

var bullshitlinks = document.getElementsByClassName('hmenu');
for (var i = 0; i < bullshitlinks.length; i++) {
	if (bullshitlinks[i].id == 'xtra-nav'){
		//alert(bullshitlinks[i].innerHTML);
		bullshitlinks[i].innerHTML = '';
	}
}

GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
	var doc = HTML2DOM(responseDetails.responseText);
	GetCurrentPlunder(doc);
}});

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Babioles', // Script Name
 version: '2.2', // Version
 id: '102118', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour
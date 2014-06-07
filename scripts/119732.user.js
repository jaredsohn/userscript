scr_meta=<><![CDATA[
// ==UserScript==
// @version	   1.2
// @name           Calendrier de Nowel
// @namespace      lkaiman
// @dateversion    05/12/2011
// @description    Plus de vin chaud
// @Explain	   Affiche une image en haut à droite si vous n'avez pas ouvert le calendrier de Nowel 
// @include        http://*.clodogame.fr/*
// @exclude        http://board.clodogame.fr*
// @exclude        http://*.clodogame.fr/*change_please/*
// @exclude	   http://*.marseille.clodogame.fr/
// ==/UserScript==
]]></>;

var url = document.location.href;

if (url.indexOf("www.clodogame.fr")>=0) {
	var URL_DOMAINE = 'http://www.clodogame.fr/';
}

if (url.indexOf("marseille.clodogame")>=0) {
	var URL_DOMAINE = 'http://marseille.clodogame.fr/';
}



var URL_XMAS = 'event/xmas/advent/'; // URL de la page du calendrier de nowel
var URL_WINE = 'activities/'; // URL de la page du vin chaud pour le traineau

// icones
var SRC_ICON_NOWEL = 'http://static.pennergame.de/img/pv4/plunder_new/old/schal.png';
var SRC_ICON_WINE = 'http://static.pennergame.de/img/pv4/plunder_new/noagerl.png';








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
	if (imgwidth != '') newimg.setAttribute('width', imgwidth);
	if (imgheight != '') newimg.setAttribute('height', imgheight);
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

function GetCalendrierNowel(content) 
{	// Vérification de période de miracle eco
	try {
		var reg = /.*adventskalender_on_.{1,2}\.jpg".{1}\/><\/a><\/td>.*/gi;
		return reg.test(content);
	}
	catch(err) {
		GM_log("Impossible de déterminer le calendrier de nowel: " + err);
	}
}

function GetWine(content) 
{	// Vérification de période de miracle eco
	try {
		var reg = /.*Mon nez brille.*/gi;
		return reg.test(content);
	}
	catch(err) {
		GM_log("Impossible de déterminer le vin chaud du traineau: " + err);
	}
}


var Nowel = false;
//var Wine = false;

GM_xmlhttpRequest({method: 'GET', url: URL_DOMAINE + URL_XMAS,	onload: function(responseDetails) {

			var rep = responseDetails.responseText;
	
			// Affiche ou non l'indication d'aller chercher ton calendrier de nowel
			Nowel = GetCalendrierNowel(rep);
			
			if (Nowel) ShowImg(URL_DOMAINE + URL_XMAS, SRC_ICON_NOWEL, 'Ouvre ton calendrier de Nowel ;)', '35', '', '880', '60', '101');
			//else ShowImg(URL_DOMAINE + URL_XMAS, SRC_ICON_NOWEL, 'Calendrier de Nowel ouvert :P', '35', '', '880', '60', '101');
		} 
	});
	
// if (!Nowel)
// {
	// GM_xmlhttpRequest({method: 'GET', url: URL_DOMAINE + URL_WINE,	onload: function(responseDetails) {

				// var rep = responseDetails.responseText;
		
				////Affiche ou non l'indication d'aller chercher ton calendrier de nowel
				// var Wine = GetWine(rep);
				
				// if (!Wine) ShowImg(URL_DOMAINE + URL_WINE, SRC_ICON_WINE, 'Donne à boire à ton traineau ;)', '35', '', '880', '60', '101');
				////else ShowImg(URL_DOMAINE + URL_WINE, SRC_ICON_WINE, 'Ton traineau est rond comme une queue de pelle ;)', '35', '', '880', '60', '101');
			// } 
		// });
// }





	
	
	






// Auto Update
CheckScriptForUpdate = {
  // Valeur de configuration
 id: '119732', // ID du Script sur Userscripts.org
 days: 1, // Nb de jour pour vérifier les MAJ

 // Ne pas modifier ci-aprés, sauf si vous savez ce que vous faites
 name:    /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time:    new Date().getTime() | 0,
 
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
	
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version est disponible pour: "'+this.xname+'"\nVous avez la version '+this.version+', il existe désormais la version '+this.xversion+'.\nVoulez-vous le mettre à jour ?')) )
		{
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    }
		else if ( (this.xversion) && (this.xversion != this.version) )
		{
      if(confirm('Voulez-vous annuler la mise à jour de ce script ?'))
			{
				GM_setValue('updated', 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);
				CheckScriptForUpdate.call('return');});
				alert('La mise à jour automatic peut être ré-activer pour ce script depuis les commande du sous menu greasemonkey.');
      } else
				GM_setValue('updated', this.time);
    } else {
      if(response)
				alert('No Update for: "'+this.name+'"');
      GM_setValue('updated', this.time);
    }
  },
	
 check: function() {
		if (GM_getValue('updated', 0) == 0)
			GM_setValue('updated', this.time);
		if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) )
			this.call();
		else if (GM_getValue('updated', 0) == 'off')
		{
			GM_registerMenuCommand('Enable Update for: "'+this.name+'"', function(){
					GM_setValue('updated', new Date().getTime() | 0);
					CheckScriptForUpdate.call(true);
				});
		} else {
		GM_registerMenuCommand('Check Update for:  "'+this.name+'"', function(){
				GM_setValue('updated', new Date().getTime() | 0);
				CheckScriptForUpdate.call(true);
			});
		}
  }
};
if (self.location == top.location && GM_xmlhttpRequest)
	CheckScriptForUpdate.check();
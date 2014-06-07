// ==UserScript==
// @name			Clodogame - Liens normaux
// @author			Memphis007
// @namespace		http://userscripts.org/scripts/show/102267
// @maj				Refonte de la détection des liens redirigés, maintenant via regexp
// @version			1.9
// @description		Supprime les redirections de liens clodogame et les remplace par des liens ordinaires.
// @include			http://*.clodogame.fr*
// @exclude			http://*.clodogame.fr/fight/*
// @exclude			http://*.clodogame.fr/gang/missions*
// ==/UserScript==

var URL = document.location.href;

url_remplace = /http:\/\/[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\/redirect\/\?site=/;

GM_xmlhttpRequest({method: 'GET', url: URL, onload: function(responseDetails) {
	nettoiemoitoutca('//a[contains(@href,url_remplace)]');
	if (URL.split('/')[3] == 'gang' && URL.split('/')[4] == '')
	{
		var originalFunction = unsafeWindow.ddajaxtabs.loadpage;
		unsafeWindow.ddajaxtabs.loadpage = function(page_request, pageurl, tabinstance){
			originalFunction(page_request, pageurl, tabinstance);
			nettoiemoitoutca('//a[contains(@href,url_remplace)]');
		}
	}
}});
	
function nettoiemoitoutca(balise)
{
	var alltags = document.evaluate(balise,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
	{
		var element = alltags.snapshotItem(i);
		element.href = element.href.replace(url_remplace, "");
	}
}

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Liens normaux', // Script Name
 version: '1.9', // Version
 id: '102267', // Script id on Userscripts.org
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
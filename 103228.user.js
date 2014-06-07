// ==UserScript==
// @name           Clodogame - Membre de la bande +
// @author         Memphis007
// @description    Dates de connexion des membres de la bande affichées directement
// @version        1.4
// @include        http://*pennergame.de/gang/memberlist*
// @include        http://*clodogame.fr/gang/memberlist*
// @include        http://*mendigogame.es/gang/memberlist*
// @include        http://*menelgame.pl/gang/memberlist*
// @include        http://*dossergame.co.uk/gang/memberlist*
// @include        http://*serserionline.com/gang/memberlist*
// @include        http://*bumrise.com/gang/memberlist*
// @include        http://*faveladogame.com.br/gang/memberlist*
// ==/UserScript==

var URL = document.location.href;

GM_xmlhttpRequest({
	method: 'GET', 
	url: URL, 
	onload: function(responseDetails) {
		var tab = document.getElementById('pgmemberlist-table');
		//tab.setAttribute('style', 'width:545px;');
		var rows = tab.getElementsByTagName('tr');

		for(i=1; i < rows.length; i++)
		{
			var col = rows[i].getElementsByTagName('td')[4];
			col.setAttribute('style','width:130px;border-right:1px solid #1D1D1D')
			var a = col.getElementsByTagName('a')[0];
			var cash_url = col.getElementsByTagName('a')[1].href;
			
			var col1 = rows[i].getElementsByTagName('td')[0];
			var span_pseudo = col1.getElementsByTagName('a')[0].innerHTML;
			
			soussous(cash_url, a, span_pseudo);
			a.setAttribute('style','text-decoration: none; text-indent:19px;')
			var dat = a.innerHTML.match(/([0-9]{2}\.[0-9]{2})\. ([0-9]{1,2}:[0-9]{2})/);
			a.innerHTML = '<b>'+dat[1]+'</b>&nbsp;'+dat[2];

			// si l'utilisateur est admin/co-admin
			if(col.getElementsByTagName('a').length>1)
			{
				col.getElementsByTagName('a')[1].setAttribute('style','margin-left:65px;');
			}
		}
}});

function HTML2DOM(content) {
	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;
	return dummyDiv;
}

function soussous(cash_url, lien, span_pseudo)
{
			GM_xmlhttpRequest({
				method: 'GET', 
				url: cash_url, 
				onload: function(responseDetails) {
					var doc = HTML2DOM(responseDetails.responseText);
					var span_valeur = doc.getElementsByTagName('table')[1].getElementsByTagName('span')[1].innerHTML;
					var span_date = doc.getElementsByTagName('table')[1].getElementsByTagName('span')[0].innerHTML.match(/([0-9]{2}\.[0-9]{2})\. ([0-9]{1,2}:[0-9]{2})/);
					var spanTag = document.createElement("span");

					spanTag.setAttribute('style', 'width:205px;');
					spanTag.innerHTML = '<b>'+span_pseudo+'</b><br/ >Dernier versement :'+span_valeur+'<br /> Date du versement : '+span_date[1]+' '+span_date[2];
					lien.appendChild(spanTag);
			}});
}

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Membre de la bande +', // Script Name
 version: '1.4', // Version
 id: '103228', // Script id on Userscripts.org
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
// ==UserScript==
// @name Link Checker Multiup | Jheberg | Go4up
// @description	Link Checker / Vérificateur de liens.

// @author Reek | http://reeksite.com/
// @version 3.0
// @license GPL version 3
// @icon http://www.gravatar.com/avatar/afb8376a9f634cd3501af4387de6425f.png
// @namespace https://userscripts.org/scripts/show/158614
// @updateURL https://userscripts.org/scripts/source/158614.meta.js
// @downloadURL https://userscripts.org/scripts/source/158614.user.js
// @require http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js

// @include http*://*
// @exclude http*://*jheberg.net/file-manager
// ==/UserScript==
/*========================================================
	Panel Setting
========================================================*/

GM_config.init('Panel Setting' /* Script title */,
/* Settings object */
{
    // This would be accessed using GM_config.get('Name')
	'opt_multiup': 
	{
		'section': ['Script Settings'],
		'type': 'checkbox',
		'label': 'Multiup',
		'default': true // store a boolean
	},
	'opt_jheberg':
	{
		'type': 'checkbox',
		'label': 'Jheberg',
		'default': true // store a boolean
	},
	'opt_go4up':
	{
		'type': 'checkbox',
		'label': 'Go4up',
		'default': true // store a boolean
	},
	'opt_redirect':
	{
		'type': 'checkbox',
		'label': 'Redirect to the page links',
		'default': false // store a boolean
	}
});

  // Menu GM_config dans Greasemonkey
  var openGM_config = function(){ GM_config.open(); }		
  GM_registerMenuCommand("Link Checker Multiup | Jheberg | Go4up (Settings)", openGM_config);


/*===================================================
	Icons
===================================================*/
  
  var icon = new Array();
  icon['Multiup'] = "http://i.imgur.com/WZJ0wbj.png";
  icon['Jheberg'] = "http://i.imgur.com/dTv2KIj.png";
  icon['Go4up'] = "http://i.imgur.com/ZYQgQSQ.png";
  icon['unavailable'] = "http://i.imgur.com/4spt5Hm.png";  
  icon['alive'] = "http://i.imgur.com/ModLmWk.png";
  icon['dead'] = "http://i.imgur.com/letlHyf.png";
  icon['checking'] = "http://i.imgur.com/6y2letU.gif";
  icon['uploading'] = "http://i.imgur.com/hD0njtJ.gif";

/*===================================================
	Function Check Links
===================================================*/

function check(oLink,link,host,referer,error) {
  // Checking
  var iHost = document.createElement('img');
      iHost.setAttribute('src', icon[host]);
      iHost.setAttribute('title', host);	  
	  iHost.setAttribute('style', 'margin-right:3px;');  
  var iStatus = document.createElement('img');
      iStatus.setAttribute('src', icon['checking']);
	  iStatus.setAttribute('style', 'margin-right:3px;');

      oLink.setAttribute('title', 'Checking...');		
      oLink.parentNode.insertBefore(iHost,oLink);
      oLink.parentNode.insertBefore(iStatus,oLink);
  
GM_xmlhttpRequest({
  method: "GET",
  url: link,
  headers: {
  "User-Agent": "Mozilla/5.0",
  "Accept": "text/xml",
  "Referer": referer
  },
  onload: function(response) {
  var res = response.responseText;
  var resStatus = response.status;  
  var iStatus = oLink.previousSibling;

  if (resStatus == 500 || resStatus == 503 || resStatus == 403) {
    // Unavailable
    iStatus.setAttribute('src', icon['unavailable']);   
    oLink.setAttribute('style', 'color:orange;');    
    oLink.setAttribute('title', host+': Checking Fails / Vérification Impossible');
    //unsafeWindow.console.log('Unavailable -> '+res); // debug
  }
  else if(/(File currently uploading|Fichier en cours d'upload|Votre fichier est actuellement en attente d'upload|Votre fichier est en cours d'upload)/gi.test(res)) {
    // Uploading
    iStatus.setAttribute('src', icon['uploading']);   
    oLink.setAttribute('style', 'color:#0099ff;');    
    oLink.setAttribute('title', host+': File currently uploading / Fichier en cours d\'upload');
  }
  else if(resStatus == 404 || error.test(res)) {
    // Dead
    iStatus.setAttribute('src', icon['dead']);   
    oLink.setAttribute('style', 'color:red; text-decoration:line-through;');    
    oLink.setAttribute('title', host+': Link Dead / Lien Mort');
    //unsafeWindow.console.log('Dead -> '+res); // debug
  }
  else if(resStatus == 200) {
    // Alive
    iStatus.setAttribute('src', icon['alive']);	
    oLink.setAttribute('style', 'color:green;');    
    oLink.setAttribute('title', host+': Link Alive / Lien Actif');
  }

  } // end onload
});
}  // end function


/*========================================================
	Run
========================================================*/
  
  // Redirect
  if(GM_config.get('opt_redirect')) {
    if(/multiup\.org\/[a-z]+\/download\//gi.test(window.location.href)) {
      var redirect = window.location.href.replace("/download/","/miror/")
      window.location.href=redirect;
    }
    else if(/jheberg\.net\/captcha\//gi.test(window.location.href)) {
      var redirect = window.location.href.replace("/captcha/","/download/")
      window.location.href=redirect;  
    }
  }

  // Catch Links
  var ankers = document.querySelectorAll("a[href*='multiup.org/fichiers/download/'],a[href*='multiup.org/download/'],a[href*='multiup.org/fr/download/'],a[href*='multiup.org/en/download/'],a[href*='jheberg.net/captcha/'],a[href*='jheberg.net/download/'],a[href*='go4up.com/dl/'],a[href*='go4up.com/link.php?id=']");

  // Parse Links
  for (var i=0; i<ankers.length; i++) {
    var oLink  = ankers[i];
	var link   = ankers[i].href;

	// Multiup
	if(/multiup\.org/.test(link)) {
	  // Make old links compatible
	  var hash = link.match(/[a-z0-9]{32}/i)[0];
      var link = link.replace(/\/?(fichiers|fr|en)?\/download\//i,"/fr/miror/");
      var link = link.replace(hash+"_",hash+"/");
	  
	  var host = "Multiup";
	  var referer = "http://www.multiup.org/";
	  var error = /(<div class="alert alert-error">|<span class="label label-important">)/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_multiup')) {
        check(oLink,link,host,referer,error);
	  }
	}
	// Jheberg
	else if(/jheberg\.net/.test(link)) {	  
	  var host = "Jheberg";
	  var referer = "http://www.jheberg.net/";
	  var error = /Erreur 404/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_jheberg')) {
        check(oLink,link,host,referer,error);
	  }
	}
	// go4up
	else if(/go4up\.com/.test(link)) {
	  var host = "Go4up";
	  var referer = "http://go4up.com/";
	  var error = /(The file you tryed to download does not exist or has been removed due to copyright infringement|This file is not present in our database, maybe it have been deleted by the owner or for dmca issue)/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_go4up')) {
        check(oLink,link,host,referer,error);
	  }
	}
    //unsafeWindow.console.log(oLink);  // debug
    //unsafeWindow.console.log(link);  // debug	

  } // end for
// ==UserScript==
// @name        Debug
// @namespace   Clowst
// @require 	 http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @include     *
// @version     1
// @grant 		 GM_xmlhttpRequest
// @run-at		 document-end
// ==/UserScript==

	// Lanchement de la requete : SHIFT + K
	$(document).keypress(function(e) {
		if( e.shiftKey && (e.which == 75 || e.which == 107 ))
			askInformations();
	});
		
	function askInformations()
	{
		var pMethod= null, pUrl= null,
			 pDataName = new Array(),
			 pDataVal  = new Array(),
			 fullUrl,
			 tmpDataName,
			 tmpDataVal,
			 cnt=0,
			 msgRetour;
			 
		pMethod = prompt("Méthode d'envoi ? (POST / GET)", "POST")
		if (pMethod!=null && (pMethod == 'POST' || pMethod == 'GET')) {
			pUrl = prompt("url ? ", "http://")
			if (pUrl!=null){
				do
				{
					tmpDataName = null;
					tmpDataVal  = null;
					
					// Nom du paramètre
					tmpDataName = prompt("Paramètre "+cnt.toString()+" :", "parm");
					if(tmpDataName!=null)
					{
						tmpDataVal = prompt("Valeur du paramètre "+cnt.toString()+" :", " ");
						if(tmpDataVal!=null)
						{
							pDataName.push(tmpDataName);
							pDataVal.push(tmpDataVal);
							cnt++
						}
					}
					
				}while(confirm("Ajouter un paramètre ?"));  // Clic sur OK

				// Construction de l'url				
				( pUrl.substr( (pUrl.length-1), 1) != '/' && cnt > 0) ? fullUrl = pUrl + '?' : fullUrl = pUrl;
					
				for (var i=0, len= pDataName.length; i < len; i++)
				{
					fullUrl += pDataName[i] + "=" + pDataVal[i]
					
					if(i+1 < len)
						fullUrl += "&";
				}
				
				msgRetour = '== Recapitulatif == \n' 
				msgRetour+= 'méthode : ' + pMethod + ' \n'
				msgRetour+= 'url généré : ' + fullUrl;
				
				if(confirm(msgRetour))
					postThis(pMethod, fullUrl);
			}
		}	
	}
		
	function postThis(_method, _url)
	{
		GM_xmlhttpRequest({
				method: _method,
				url: _url,
				timeout: 40000,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					alert(response.responseText);
					console.log(response.responseText);
				},
				ontimeout: function(response) {
					alert("timeout");
				}
		});
	}



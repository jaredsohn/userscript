// ==UserScript==
// @name           Shadow Era
// @namespace      http://www.djlechuck.fr
// @description    Change les dates de post du forum au format français
// @include        http://www.shadowera.com*
// @exclude        
// ==/UserScript==

(function () {	
	function changerDate(requete)
	{
		var alltags	= document.evaluate(requete, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var date	= '';
		
		for (i = 0; i < alltags.snapshotLength; i++)
		{
			var element	= alltags.snapshotItem(i);
			var contenu	= element.innerHTML;
			
			if (isNaN(parseInt(contenu.substring(0, 1))))
			{
				var iText	= ((contenu.indexOf('&nbsp;') < 0) ? contenu.indexOf(' ') : contenu.indexOf('&nbsp;'));
				var quand	= contenu.substring(0, iText);
				
				// Récupération du reste
				var reste	= contenu.substring(iText);
				
				switch (quand)
				{
					case 'Today':
						date = 'Aujourd\'hui';
					break;
					case 'Yesterday':
						date = 'Hier';
					break;
				}
			}
			else
			{
				// Récupération de la date
				date 		= contenu.substring(0, 10);
				
				// Mise en forme française de cette dernière
				date 		= date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6, 10);
				
				// Récupération du reste
				var reste	= contenu.substring(10);
			}
		
			// Réinjection du code
			element.innerHTML = date + reste;
		}
	}
	
	function changerHeure(requete)
	{
		var alltags	= document.evaluate(requete, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (i = 0; i < alltags.snapshotLength; i++)
		{
			var element	= alltags.snapshotItem(i);
		
			// Récupération de l'heure et des minutes
			var heure	= element.innerHTML.substring(0, 2);
			var minute	= element.innerHTML.substring(3, 5);
			
			// Si le caractère est un P, alors on est dans l'après midi
			if (element.innerHTML.substring(6, 7) == 'P' && parseInt(heure) < 12)
				element.innerHTML = (parseInt(heure) + 12) + ":" + minute;
			else
				element.innerHTML = heure + ":" + minute;
		}
	}
	
	function changerInfosLigne(requete)
	{
		var alltags	= document.evaluate(requete, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for (i = 0; i < alltags.snapshotLength; i++)
		{
			var element	= alltags.snapshotItem(i);
			var contenu = element.innerHTML.substr(-24);
			
			var reste	= element.innerHTML.substring(0, element.innerHTML.length - 24);
			
			// Récupération du Started by
			var start	= 'Démarré par';
			reste		= start + reste.substring(10);
			
			// Récupération de la date
			var date 	= contenu.substring(0, 10);
				
			// Mise en forme française de cette dernière
			date 		= date.substring(3, 5) + '/' + date.substring(0, 2) + '/' + date.substring(6, 10);
			
			// Récupération de l'heure
			var lHeure	= contenu.substring(16, 24);
			
			// Récupération de l'heure et des minutes
			var heure	= lHeure.substring(0, 2);
			var minute	= lHeure.substring(3, 5);
			
			// Si le caractère est un P, alors on est dans l'après midi
			if (lHeure.substring(6, 7) == 'P' && parseInt(heure) < 12)
				heure = (parseInt(heure) + 12) + ":" + minute;
			else
				heure = heure + ":" + minute;
			
			element.innerHTML = reste + date + ' ' + heure;
		}
	}
	
	try
	{
		// Changer la date et l'heure dans la liste des topics
		changerInfosLigne('//div[@class="author"]/span[@class="label"]');
		changerDate('//li[contains(./@id, \'thread_\')]/div/dl/dd[2]');
		changerDate('//p[@class="lastpostdate"]');
		changerHeure('//li[contains(./@id, \'thread_\')]/div/dl/dd[2]/em');
		
		// Changer la date et l'heure dans les topics
		changerDate('//span[@class="date"]');
		changerHeure('//span[@class="time"]');
	}
	catch (e)
	{
		alert("Exception:\n" + e);
	}

})();

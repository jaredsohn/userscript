// ==UserScript==
// @name            Amazon de in English
// @description     Makes Amazon DE useable by English readers.
// @include         *amazon.de*
// ==/UserScript==

(function() 
{
	
	//object constructor
	function languageCorrector()
	{
		var affiliate = "doctwholoca-21";
		//phrases to translate 
		//	'target language' : 'existing language'
		var phrases  = 
		{
			'to turn on 1-Click' : 'um 1-Click', 
			'Sign in' : 'Loggen Sie sich ein',
			'Price:' : 'Preis:',
			'Product information' : 'Produktinformation',
			'Customers who bought this item also bought' : 'Kunden, die diesen Artikel gekauft haben, kauften auch:',
			'Rate it' : 'Artikel bewerten',
			'I Own it' : 'Gehört mir',
			'Perfect Partner' : 'Unser Vorschlag',
			
			'Average Customer Review' : 'Durchschnittliche Kundenbewertung:',
			'DVD Release Date:' : 'DVD-Erscheinungstermin:',
			'Customers who viewed this item also viewed' : 'Kunden, die diesen Artikel angesehen haben, haben auch angesehen:',
			'Rate this item to improve your recommendations' : 'Bewerten Sie den Artikel, um auf diese Weise Ihre Empfehlungen zu verbessern.',
			'We have' : 'Hier sind Ihre',
			'recommendations for you' : 'persönlichen Empfehlungen',
			'Your recently viewed items' : 'Kürzlich angesehene Artikel',
			'here' : 'hier',
			'Not' : 'Wenn Sie nicht',
			'View or change your orders in' : 'Bearbeiten OR überprüfen Sie Ihre offenen Bestellungen in',
			'More to Explore' : 'Neu für Sie',
			'Find similar items' : 'Mehr Empfehlungen',
			'Recommended for you' : 'Ihre persönliche Seite',
			'See more in the Page You Made' : 'Weitere Empfehlungen auf Ihrer persönlichen Seite',
			'New & Used' : 'Neu & gebraucht',
			'Buy new' : 'Neu kaufen',
			'Showing All Results' : 'Alle Ergebnisse',
			'Narrow your results' : 'Search ändern',
			'Narrow by category' : 'Nach Kategorie filtern',
			'Listmania!' : 'Lieblingslisten',
			'Explore similar items' : 'Verwandte Artikel entdecken',
			'Show gift options during checkout' : 'Als Geschenk versenden',
			'Shopping Basket Items' : 'Artikel im Einkaufswagen',
			'To buy now' : 'jetzt verfügbar',
			'Item added on' : 'Artikel hinzugefügt am',
			'Did you make any changes below' : 'Möchten Sie unten etwas ändern',
			'Saved items -- To buy later' : 'Gespeicherte Artikel -- für einen späteren Einkauf',
			'Add giftwrap/message' : 'Geschenkpapier / Grußbotschaft hinzufügen',
			'Featured Item' : 'Vorgestellter Artikel',
			'Customers who bought the items in your Shopping Basket also bought:' : 'Kunden mit den gleichen Artikeln im Einkaufswagen wie Sie, kauften auch:',
			'Subtotal:' : 'Zwischensumme:',
			'Full name:' : 'Vor- und Nachname:',
			'Company name:' : 'Firmenname:',
			'House name/number & Street:' : 'Straße und Hausnummer:',
			'Town/City:' : 'Stadt:',
			'County:' : 'Bundesland/Kanton:',
			'Postcode:' : 'Postleitzahl:',
			'Country' : 'Land',
			'Phone number' : 'Telefonnummer für Rückfragen:',
			'OR' : 'ODER',
			'Expiry Date' : 'Gültig bis',
			'Cardholder\'s name' : 'Name des Karteninhabers',
			'Cardnumber' : 'Kreditkartennummer',
			'Pay with new card' : 'Eine neue Kreditkarte eingeben',
			'' : 'Konto- bzw.',
			'Actors' : 'Darsteller',
			'Run Time' : 'Spieldauer:',
			'Aspect Ratio' : 'Bildseitenformat',
			'Languages' : 'Sprache',
			'Minutes' : 'Minuten',
			'Availability:' : 'Verfügbarkeit:',
			'Director' : 'Regisseur',
			'Director(s)' : 'Director(e)',
			'View by Order' : 'Nach Bestellungen geordnet',
			
			'Buy this item with' : ' Kaufen Sie jetzt diesen Artikel zusammen mit',
			
			'Do you have a gift certificate or promotional claim code' : 'Haben Sie einen Geschenk- OR Aktionsgutscheincode',
			
			'Please select a payment method' : 'Bitte wählen Sie eine Zahlungsweise',
			
			'Please update the delivery address.\n\nWhen finished, click the "Dispatch to this address" button to proceed with your order. Or you may return to your Address Book.' : 'Bitte aktualisieren Sie die Versandadresse.',
			
			'Ordering from Amazon.de is quick and easy' : 'Eine Online-Bestellung ist einfach.',
			'Enter your e-mail address:' : 'Geben Sie Ihre E-Mail-Adresse ein:',
			'I am a new customer:' : 'Ich bin ein neuer Kunde.',
			'I am a returning customer' : 'Ich bin bereits Kunde',
			'my password is:' : 'mein Passwort ist:',
			'Where\'s my stuff' : 'Wo ist meine Bestellung',
			'Open and recently dispatched orders' : 'Offene und kürzlich versandte Bestellungen',
			'Your Account' : 'Mein Konto',
			'See more' : 'Im Überblick',
			'Completed Orders' : 'Abgeschlossene Bestellungen',
			'Dec.' : 'Dez.',
			'Order date' : 'Bestellungsdatum',
			'Hello' : 'Herzlich willkommen',
			'Hello' : 'Willkommen',
			'Order No.' : 'Bestellnummer',
			'Recipient' : 'Empfänger',
			'If you\'re not' : 'Falls Sie nicht',
			'-Select different orders to view-' : '-Andere Bestellungen zur Ansicht auswählen-',
			'Items dispatched on' : 'Artikel wurden versandt am',
			'Delivery estimate' : 'Lieferung voraussichtlich:',
			'Sold by' : 'Verkauft von',
			'Orders placed in 2008' : 'Bestellungen 2008',
			'Orders placed in 2007' : 'Bestellungen 2007',
			'Orders placed in 2006' : 'Bestellungen 2006',
			'Orders placed in 2005' : 'Bestellungen 2005',
			'Orders placed in 2004' : 'Bestellungen 2004',
			'Orders placed in 2003' : 'Bestellungen 2003',
			
			'Orders placed in the last 6 months' : 'Bestellungen in den letzten 6 Monaten',
			
			'Search' : 'Suche',
			'Books' : 'Bücher',
			'English' : 'Englische',
			'Magazines' : 'Zeitschriften',
			'House & Garden' : 'Haus & Garten',
			'Kitchen & Home' : 'Küche &  Haushalt',
			'Cameras & Photography' : 'Kamera & Foto',
			'Electronics' : 'Elektronik',
			'Photo' : 'Foto',
			'Kitchen' : 'Küche',
			'Garden' : 'Garten',
			'Music' : 'Musik',
			'Home' : 'Haus',
			'Leisure' : 'Freizeit',
			'All Products' : 'Alle Produkte',
			'Search our shops' : 'SchnellSearch',
			'Account settings' : 'Grundeinstellungen',
			'gift certificates' : 'gutscheine',
			'Hot offers' : 'preis-hits',
			'Sell your stuff' : 'JETZT VERKAUFEN',
			'Our Shops' : 'Unsere Shops',
			
			'United Kingdom' : 'Großbritannien',
			'United States' : 'Vereinigte Staaten von Amerika',
			'Canada' : 'Kanada',
			'France' : 'Frankreich',
			'Germany' : 'Österreich',
			'International Sites:' : 'Internationale Seiten:',
			
			'Delivery & Returns' : 'Versand & Rücknahme',
			'Need Help?' : 'Brauchen Sie Hilfe?',
			
			'Payment Settings' : 'Zahlungseinstellungen',
            'Personal Settings' : 'Persönliche Angaben',
            'My e-mail address is' : 'Meine E-Mail-Adresse',
            'No' : 'Nein',
            'Yes, I have a password:' : 'Ja, ich habe ein Passwort:',
            'What is your e-mail address' : 'Wie lautet Ihre E-Mail-Adresse?',
            'Sign In' : 'Anmelden',
            'Do you have an Amazon.co.uk password' : 'Haben Sie ein Passwort für Amazon.de?',
            'Forgotten your password? Click here' : 'Haben Sie Ihr Passwort vergessen? Hier klicken',
            
			
			'You\'ll create a password later' : 'Ein Passwort legen Sie später an.',
			'Important message' : 'Bitte beachten Sie',
			'You clicked on the button indicating you are a new user, but you also gave a password. If you are a new user, please do not enter a password yet. If you are a returning user, please click on the button indicating that you are a returning user.' : 'Sie haben angeklickt, dass Sie ein neuer Kunde sind und haben gleichzeitig ein Passwort angegeben. Wenn Sie ein neuer Kunde sind, geben Sie bitte kein Passwort ein. Wenn Sie bereits Kunde bei Amazon.de sind, klicken Sie dies bitte an.',
			
			'Items in your Shopping Basket always reflect the most recent prices displayed on their product detail pages.' : 'Die Preise der Artikel in Ihrem Einkaufswagen entsprechen den auf der Website angezeigten Preisen.',
			'Customer Reviews' : 'Kundenrezensionen',
			'Advanced' : 'Erweiterte',
			'Browse by Genre' : 'Stöbern',
			'New & Future releases' : 'Neuheiten',
			'Reviews' : 'Rezensionen'
		
		};
		
		var allElements, thisElement;
		allElements = document.getElementsByTagName('input');
		for (var i = 0; i < allElements.length; i++) {
		    thisElement = allElements[i];
		    
		    var str = thisElement.src;
		
		    //Go button fix
		    if (thisElement.src.indexOf("go-button.gif") !=-1 ){
		    thisElement.src = "http://g-ec2.images-amazon.com/images/G/02/uk-welcome/buttons/welcome-go-button-21x22.gif";
			thisElement.width ="";
			thisElement.height ="";
		    }else{
		    //replace loads of buttons
		    var newstr = str.replace(/ec1/g, "g-ec2");
		    var newstr = str.replace(/03/g, "02");
		    thisElement.src = newstr;
			thisElement.width = "";
			thisElement.height = "";
		    
		    
		    
		    
		  }
		
		   
		}
		
		
		
		
		
			allimages = document.getElementsByTagName('img');
					for (var i = 0; i < allimages.length; i++) {
						    thisImage = allimages[i]; 
							
							 if (thisImage.src.indexOf("navigation-tools-account._V56331282_.gif") !=-1 ){
								 //replace your account button
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/navigation-tools-account._V53840997_.gif";
								thisImage.width = "100";
			 				}
							 if (thisImage.src.indexOf("music-off-whole.gif") !=-1 ){
								 //replace music menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/music-off-39x26.gif";
								thisImage.width = "39";
								thisImage.height = "26";
			 				}
							
								 if (thisImage.src.indexOf("house-new-off.gif") !=-1 ){
								 //replace Home & Garden menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/home-off-47x26.gif";
								thisImage.width = "47";
								thisImage.height = "26";
			 				}
							
									 if (thisImage.src.indexOf("toys-off.gif") !=-1 ){
								 //replace toys menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/toys-off-42x26.gif";
								thisImage.width = "42";
								thisImage.height = "26";
			 				}
							
							 if (thisImage.src.indexOf("books-off-whole.gif") !=-1 ){
								 //replace book menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/books-off-39x26.gif";
								thisImage.width = "39";
								thisImage.height = "26";
			 				}
							
							 if (thisImage.src.indexOf("ce-de-off-whole.gif") !=-1 ){
								 //replace electronics menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/electronics-off-72x26.gif";
								thisImage.width = "72";
								thisImage.height = "26";
			 				}	
							
								if (thisImage.src.indexOf("yourstore-unrec-off-sliced.gif") !=-1 ){
								 //replace your store menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/nav/personalized/tabs/yourstore-off-sliced._ZCYOUR,0,2,100,100,verdenab,7,90,90,80_.gif";
								thisImage.width = "81";
								thisImage.height = "26";
								
			 				}
							
							if (thisImage.src.indexOf("navigation-tools-wishlist._V56331497_.gif") !=-1 ){
								 //replace electronics menu icon
		    					thisImage.src = "http://g-ec2.images-amazon.com/images/G/02/uk-shared/navs/navigation-tools-wishlist._V53840998_.gif";
								thisImage.width = "62";
								
			 				}

		     }
		
		
		allanchors = document.getElementsByTagName('a');
					for (var i = 0; i < allanchors.length; i++) {
						    thisAnchor = allanchors[i]; 
						    if ((thisAnchor.href.indexOf("product") == -1)&&(thisAnchor.href.indexOf("offer-listing") == -1)&&(thisAnchor.href.indexOf("amabot") == -1)){
						    //do nothing
						    } else{
						    	if (thisAnchor.href.indexOf("/") != thisAnchor.href.length){
						    		thisAnchor.href += "/" + affiliate;  
						    	}else{
						    		thisAnchor.href += affiliate;
						    	}
						    }
		  }

		


		//get all elements in the body section
		var eles = document.getElementsByTagName('body')[0].getElementsByTagName('*');
		var eleslen = eles.length;

		//for each element
		for(var i=0; i<eleslen; i++)
		{
			//if the node has a first-child text-node that isn't just whitespace
			var node = eles[i].firstChild;
			if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue) )
			{
				//for each of the listed misspellings
				for(var j in phrases)
				{
					//regex pattern for finding our phrases to translate
					var regex = new RegExp(phrases[j], 'i');
					
					//if we find it
					if(typeof j == 'string' && regex.test(node.nodeValue))
					{
						//do replacement expression 
						node.nodeValue = node.nodeValue.replace(regex, j);
					}
				}
			}
		}
	};




	//instantiate and run 
	var corrector = new languageCorrector();


})();
//.user.js



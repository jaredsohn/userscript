// ==UserScript==
// @name           Pennerporifl Premiumpet V1.0
// @namespace      11235813-Kuestenpenner
// @author		11235813
// @description    Erkennt Original-Bild bei Premiumhautieren
// @include        http://*pennergame.de/profil*
// ==/UserScript==

try {
	var petimgtable = document.getElementsByTagName('table')[3];
	var petimg = petimgtable.getElementsByTagName('img')[1];
	
	} catch (err) {}
	
try {
	var fakename = petimgtable.innerHTML.split('Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <b>')[1].split('</b>')[0];
				
		
	if(fakename == 'Elefant')
			{   
				petimg.src = "http://media.pennergame.de/img/tiere/94826.jpg";
			}
			else if(fakename == 'Nashorn')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/25834.jpg";
			}
			else if(fakename.indexOf('ffchen') >=0)
			{
				petimg.src = "http://media.pennergame.de/img/tiere/12536.jpg";
			}
			else if(fakename.indexOf('Eisb') >=0)
			{   
				petimg.src = "http://media.pennergame.de/img/tiere/14896.jpg";
				
			}
			else if(fakename == 'Tiger')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/43703.jpg";
			}
			else if(fakename == 'Krokodil')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/73953.jpg";
			}
			else if(fakename == 'Giraffe')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/98962.jpg";
			}
			else if(fakename == 'Nilpferd')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/64220.jpg";
			}
			else if(fakename == 'Pferd')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/90385.jpg";
			}
			else if(fakename == 'Chihuahua')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/32563.jpg";
			}
			else if(fakename == 'Cockerspaniel')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/62456.jpg";
			}
			else if(fakename == 'Pitbull')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/15240.jpg";
			}
			else if(fakename.indexOf('ferhund') > 0)
			{
				petimg.src = "http://media.pennergame.de/img/tiere/09051.jpg";
			}
			else if(fakename == 'Adler')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/48263.jpg";
			}
			else if(fakename == 'Pudel')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/12758.jpg";
			}
			else if(fakename == 'Hausziege')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/62474.jpg";
			}
			else if(fakename == 'Schlange')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/61402.jpg";
			}
			else if(fakename == 'Falke')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/89386.jpg";
			}
			else if(fakename == 'Katze')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/73735.jpg";
			}
			else if(fakename == 'Frettchen')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/21903.jpg";
			}
			else if(fakename == 'Hase')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/77310.jpg";
			}
			else if(fakename == 'Ratte')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/73684.jpg";
			}
			else if(fakename == 'Taube')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/31451.jpg";
			}
			else if(fakename == 'Wellensittich')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/52483.jpg";
			}
			else if(fakename == 'Hamster')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/73308.jpg";
			}
			else if(fakename == 'Maus')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/11836.jpg";
			}
			else if(fakename == 'Goldfisch')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/68930.jpg";
			}
			else if(fakename == 'Kakerlake')
			{
				petimg.src = "http://media.pennergame.de/img/tiere/00001.jpg";
			}
	
	
	
	
} catch (err) {}




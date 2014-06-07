// ==UserScript==
// @name        Suivi des annonces FAGC
// @namespace   http://adoptiongroschiens.forumsactifs.com/
// @description Recherche en base si une annonce externe est toujours valide.
// @version	1.3 - 2009/08/13
// @include	http://adoptiongroschiens.forumsactifs.com/*
// @exclude	https://*
// ==/UserScript==

d=document;
if (!d.getElementById('phpbb')) 
return;
	
GM_registerMenuCommand("Enregistrer mon pseudo",function (e){configure()});

function configure() {
 var c = GM_getValue("pseudo", "");
  var x = prompt("Entrez votre pseudo", c || "Pseudo_FAGC");
  if (x) 
  GM_setValue("pseudo",  x);
}

// Build FAGCBox //
FAGCbox = document.createElement('div');
FAGCbox.setAttribute('id', 'EtatAnnonceBox');
FAGCbox.setAttribute('style', "display: none; z-index: 1000; font-size: 8pt; font-family: Verdana,sans-serif; text-decoration: none; line-height: 1.1em; position: fixed; top: 0px; right: 0px; width: 160px; background: white; border-left: solid 1px #555; border-bottom: solid 1px #555; color: #222; text-align: center; padding: 3px;");
d.body.appendChild(FAGCbox);
if (d.getElementById('EtatAnnonceBox')) {
// FAGCBox Content //
// Selected text quote area//
nlnk = document.createElement('a');
nlnk.setAttribute('title', "titre de l\'annonce'");
nlnk.setAttribute('style', 'display: block; padding: 2px; text-decoration: none; color: #337;');
ntxt = document.createTextNode('Url de l\'annonce ');
nlnk.setAttribute('id', 'FAGCtitre');
nlnk.appendChild(ntxt);
d.getElementById('EtatAnnonceBox').appendChild(nlnk);
nlnk = document.createElement('a');
nlnk.setAttribute('title', "infos de l\'annonce'");
nlnk.setAttribute('style', 'display: block; padding: 2px; text-decoration: none; color: #337;');
ntxt = document.createTextNode('');
nlnk.setAttribute('id', 'FAGCinfo');
nlnk.appendChild(ntxt);
d.getElementById('EtatAnnonceBox').appendChild(nlnk);

qdiv = d.createElement('div');
qdiv.setAttribute('style', 'border: solid 1px #555; margin: 1px; padding: 2px; background: #dde;');
qdiv.setAttribute('id', 'FAGCBoxQuote');
FAGCbox.appendChild(qdiv);
}

// Define URI encoded GIF icons //
// Wikipedia icon //
Chargement = 'data:image/gif;base64,R0lGODlhHgAdAOfjABkZGRoaGhsbGxwcHB0dHR4eHh8fHyEhISMjIyQkJCUlJSYmJicnJygoKCoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/hVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkECQcA/wAsAAAAAB4AHQAACP4AxwkcSHCgtzhktBVcyHBgNm8DbSEgEGqgOHDiGi601WILxHGpNGSoJFAcs1/WNBZsdCIFJoGs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';
Adoptezmoi = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAgMDAwMDBAcFBAQEBAkGBwUHCgkLCwoJCgoMDREODAwQDAoKDhQPEBESExMTCw4UFhQSFhESExL/2wBDAQMDAwQEBAgFBQgSDAoMEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL/wAARCAAjABkDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABwgABQYCA//EACgQAAEEAQQCAQMFAAAAAAAAAAMBAgQFBgAHERIhMRMUQWEIFRhCUf/EABgBAAMBAQAAAAAAAAAAAAAAAAADBQYC/8QAJREAAQIEBgIDAAAAAAAAAAAAAQIRAAMFIQQGEjFBYRNRkcHR/9oADAMBAAIRAxEAPwBoMo/Uzj+HSMnjZludnAcioKuZeGx/H6mslldEZJlNGEA1iPIpEFH+R3dyIwaoUj2D5eln/IfAnnYKLvhuBJV5RD+QWMRVE1pJIo6FUq1SDQSPkR3KTt16SAE56GE5+km41t5H2NybLd0cGoMrgUDb22sASKKLOPJGA73kRrSpw8jhw47U7OTn4AoqojG8DHZfdzYfK9zKmhwPaFuN32aAYsptjRQgtjgF80waKwDytbyUIzt4Ro3verke4wSsYQQTdr94K3NsyoAYVneaZXAsoSTJAr3FVrhfSmGdYxxkWvj893xTIid15Rjl6+OUPul/2zxXE6uwwK7wzbvE9vpdxNsAzI1JXRgucyOOSMaPIIbO6ccuRFThFeqfnTAaIIDjD5xQ4Db0ON4rexrxxLJa64GatMATzSTPEZGEkorkRHtd1cxPPhU1jXbq7oXOe5HW1daxtfi0wI7WMKVBiSYgjdDBRXmUonEUHTlWuVq9yN4YqseJldKlbjm47v7unLiMLWQ7GXRy3zXqxzZMl0BY7GtT+vRgXryv3+3rWfzNVk0mnrxpSVaeAWf3uRsHJ6BixSNcyb4QlJd7qSDu3T9D0T3BgBfTM0znGStoptWCofKOYsuwgF7o8DhtRrQSCOVeXc+kRET3omc6XKdkmRmEIEaxjFuDlT9vDGZw15GIwieXLz2VyGb64Vrmt8aYzhf8TUvJ2cEZikTJsuWQlLXsxd3FiWIa4fkHmFVCnHCaXVu9ubfv0Y61SOxCkdNuJRKqCQ980TbNxAo/6tBN6jQiLyjkanhNTU1sloSsMoOImhRTcGPOkwfH8dlrJpKevhyVarfmGBEeiL7RHe0T8Jq/1NTSsPhpOHRokoCU+gAB8COpk1cxWpZJPd4//9k%3D';

// Wiktionary icon //
Adopte = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAgMDAwMDBAcFBAQEBAkGBwUHCgkLCwoJCgoMDREODAwQDAoKDhQPEBESExMTCw4UFhQSFhESExL/2wBDAQMDAwQEBAgFBQgSDAoMEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL/wAARCAAjACADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAQJCAYH/8QAKBAAAgIBBAICAQQDAAAAAAAAAQIDBAUABgcRCBITISIUFjEyF0JR/8QAGQEAAgMBAAAAAAAAAAAAAAAAAQUABAYD/8QAJREBAAEDAwMEAwAAAAAAAAAAAQIAESEDBDESUWEFQXGBBhOR/9oADAMBAAIRAxEAPwDV2L8YOO3xNOfF7G8dXpzU4pKyX9g1pZgpgXr3mEg9yX7ct6jsHrr/AG0rnPH7YuBotNU4w8fr9wCuIJsbsKq3wyB3+WV4zKG9fyr+qoxYekpJPY9YObSyeMwu6MTf3Pho9xYendilv4iS3JVF+BWBkh+WMh4/Zex7r9r330eutUg4f8deFuccRLujiJ8ns649jI2uO9u5jD468fdIYY52utMZXt11n6EQlkX42+UgsD9Lt/vZ7e0Y6bJb5OMGBw8tjju+1qtbTTjKd5JYthbctu5WtKnj3sjIxyzf418caKLO4VbexYkdkAJX6Mg779l7YEf1P0e+lR3J48cYU9hbsn3BsHgkT1sDkXrS4TatWs6MKamNwWZ2DrKs5BXr6aP+CpJjhznujjLP5PCVeBdm39sYjE42OG9fymQls3c1bKr8k8qGRooVBBCpEB32zHr2VI/MtW9vqurpRmxY3L2cJ8neuOsRNRI8eM0aor4H+ROJ2J407zgytLIWv2JchltUIKhsvl1yNhYa8cEpmQVis30xKuPzDD2P46nVqhfhrwNTz3i3m2uJmlucl5kCzKmPY/pauMAlrtAfUFi0k00jOrn7rxAL+LnWX/NobGXpTLeR6oko4y5WzYMr0rb++1NfQobie8IaDZRz8Z+shU9COjo07mMPawN96WTWJLMQUyJHOkvxkgH1YoSAw76ZT9qQQQCCNJa1sZEgRuUnRGzRqhXGPkNyHvLj2lnty7lsXcvRiZorbVoUZmjr/CryeqASP8YClnDEj+SdGjUdpobk/XrwJx7IJ24fCn3QNWem9UFHxisUcychZ/lPkvObl33fGSzV6ZIprArRQApDGsMSiOJVRQscaL9KP6/97OuM0aNGgcV//9k%3D';

// Wikiquote icon //
Newgif = 'data:image/gif;base64,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%3D';
Disque = 'data:image/gif;base64,R0lGODlhIAAgAOMAAMzMzAC7AAAA3e7u7t3d3bu7u6qqqoiIiHd3d1VVVURERAAAAMjIyN3d3bu7u6qqqiH5BAEAAAwALAAAAAAgACAAAASZkMlJq7046827/2AojmRpXkuqrmzLVgthzHRt3/UyxXjvGwMdg/cr0gYI3WLAbDqfUCgiOSRYrwSAVlvoegs4JDWGtW653254qjwcAgG3vDVnucXK6DPdPW/xQ3KCg4SFB4BLeooDflqIVgICV358YDeICgmam5ydnpxIQgsJBqSmpainqqlAQkMusLEqJ7S1tre4ubq7vCERADs%3D';
// New Tab icon //
nwgif = 'data:image/gif;base64,R0lGODlhCgAKAIAAAF1zuP///yH5BAAAAAAALAAAAAAKAAoAAAIUTICJpso'+
'GT4ps0gWolG3d93GNUQAAOw==';


// Build blank wiki links //

/*FAGCbox.appendChild(makeLink('FAGCBwikipediaLSW', pediagif, 'Wikipedia', false));
FAGCbox.appendChild(makeLink('FAGCBwikipediaLNW', nwgif, 'Wikipedia (New Window)', true));
FAGCbox.appendChild(makeLink('FAGCBwiktionaryLSW', tionarygif, 'Wiktionary', false));
FAGCbox.appendChild(makeLink('FAGCBwiktionaryLNW', nwgif, 'Wiktionary (New Window)', true));
FAGCbox.appendChild(makeLink('FAGCBwikiquoteLSW', quotegif, 'Wikiquote', false));
FAGCbox.appendChild(makeLink('FAGCBwikiquoteLNW', nwgif, 'Wikiquote (New Window)', true));
*/

// Prevent miss-clicks from hiding FAGCBox //
window.FAGCBpointer = false;
FAGCbox.addEventListener('mouseover', function(e){
	window.FAGCBpointer = true;
	d.getElementById('EtatAnnonceBox').style.borderLeft = 'solid 1px #77f';
	d.getElementById('EtatAnnonceBox').style.borderBottom = 'solid 1px #77f';
}, false);
FAGCbox.addEventListener('mouseout', function(e){
	window.FAGCBpointer = false;
	d.getElementById('EtatAnnonceBox').style.borderLeft = 'solid 1px #555';
	d.getElementById('EtatAnnonceBox').style.borderBottom = 'solid 1px #555';
}, false);


// Selected Text Event Function // 
window.FAGCSelectEvent  = function () {
	// Was this a miss-click? //
	if (window.FAGCBpointer) {return;} 

	// Ensure FAGCBox is available //
	if (box = document.getElementById('EtatAnnonceBox')) {
		// Good, lets go //
		// Check for selected text //
		if (window.getSelection() > '') {
			// Get Text //
			seltxt = window.getSelection();
			seltxt = String(seltxt);
			seltxt = seltxt.replace(/(^\s+|\s+$)/g, '');

			// Kill HTML //
			seltxt = seltxt.replace(/"/g, "'");
			seltxt = seltxt.replace(/>/g, '&gt');
			seltxt = seltxt.replace(/</g, '&lt');

			// Hide on Big Selections //
			if (seltxt.length > 500) {box.style.display = 'none'; return;}
			// Hide si on ne selectionne pas une url //
			if (seltxt.substring(0,7) != 'http://') {box.style.display = 'none'; return;}


			// Truncate on Long Selections //
//			if (seltxt.length > 70) {seltxt = seltxt.substring(0,70);}

			// FAGCBox Content //
			// Selected text quote //
			qbox = d.getElementById('FAGCBoxQuote');
			kids = qbox.childNodes;
			for (i in kids) {if (kids[i].nodeType) {qbox.removeChild(kids[i]);}}
			qtxt = d.createTextNode(String(seltxt));
			qbox.appendChild(qtxt);
			if (seltxt!=GM_getValue('url_en_cours'))
			{
FAGCbox.appendChild(makeLink('Nouveau', Chargement, 'Nouveau', true));
FAGCbox.appendChild(makeLink('Active', Adoptezmoi, 'Adoption', true));
				GM_setValue('url_en_cours',seltxt);
			GM_xmlhttpRequest({
			    method: 'POST',
			    url: 'http://fagc.bozs.org/GetStatus.php',
//			    url: 'http://fagc.bozs.org/',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded',
					'Accept': 'application/atom+xml,application/xml,text/xml',

			    },
				data: 'source='+seltxt +'&forum='+window.location.href+'&titre='+document.title+'&name='+GM_getValue("pseudo", ""),
				onload: function(responseDetails) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(responseDetails.responseText,
						"application/xml");
					var liste = dom.getElementsByTagName('fagc');
					var annonce;
					if (liste.length>0) {
						annonce = liste[0].getElementsByTagName('annonce')[0];
						qbox = d.getElementById('FAGCBoxQuote');
//						kids = qbox.childNodes;
//						for (i in kids) {if (kids[i].nodeType) {qbox.removeChild(kids[i]);}}
						qbox.style.display = 'none';
//						d.getElementById('FAGCtitre').textContent=annonce.getAttribute("titre");
GM_log(annonce.textContent!=window.location.href);
						if (annonce.textContent!=window.location.href)
							d.getElementById('FAGCtitre').textContent="Autre annonce";
						else
							if(annonce.getAttribute("New")=="true")
								d.getElementById('FAGCtitre').textContent="Nouvelle annonce";
							else
								d.getElementById('FAGCtitre').textContent="Annonce déjà saisie";
						d.getElementById('FAGCtitre').setAttribute('href', annonce.textContent);
						d.getElementById('FAGCinfo').textContent=annonce.getAttribute("Posteur")+' : '+annonce.getAttribute("Vue");
						if(annonce.getAttribute("New")=="true")
							FAGCbox.replaceChild(makeLink('Nouveau', Newgif, 'Nouveau', true),d.getElementById('Nouveau'));
							else
							{
							
//							ntxt = d.createTextNode('vue par '+annonce.getAttribute("Posteur"));
//							qbox.appendChild(ntxt);
//							d.getElementById('EtatAnnonceBox').appendChild(nlnk);
								FAGCbox.replaceChild(makeLink('Nouveau', Disque, 'Nouveau', true),d.getElementById('Nouveau'));
							}
					}
					GM_log(responseDetails.responseText);

//							        alert('Retour de l\'interrogation ' + responseDetails.status +
//			              ' ' + responseDetails.statusText + '\n\n' +
//			              'Feed data:\n' + responseDetails.responseText);
//								alert ('Interrogation du serveur pour savoir si l\'annonce : '+seltxt+' existe ou est dÃ©sactivÃ©e pour mettre Ã  jour les icones.\n\n La partie serveur reste Ã  developper');
//								alert ('Le titre de l\'annonce est : '+ document.title +' \n\n et son suivi est sur : '+window.location.href);
			    }
			});
		}
			// Wikipedia links //
//			forumhref = 'http://en.wikipedia.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
//			d.getElementById('FAGCBwikipediaLSW').setAttribute('href', wphref);
//			d.getElementById('FAGCBwikipediaLNW').setAttribute('href', wphref);
/*
			// Wiktionary links //
			wthref = 'http://en.wiktionary.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			d.getElementById('FAGCBwiktionaryLSW').setAttribute('href', wthref);
			d.getElementById('FAGCBwiktionaryLNW').setAttribute('href', wthref);

			// Wikiquote links //
			wqhref = 'http://en.wikiquote.org/wiki/Special:Search?search=' + seltxt + '&go=Go';
			d.getElementById('FAGCBwikiquoteLSW').setAttribute('href', wqhref);
			d.getElementById('FAGCBwikiquoteLNW').setAttribute('href', wqhref);
*/
			box.style.display = 'block';
		} else {
			// Hide FAGCBox if there is no selection //
//			FAGCbox.replaceChild(makeLink('Nouveau', Chargement, 'Nouveau', true),d.getElementById('Nouveau'));
			box.style.display = 'none';
		}
	} else {
		// Call the whole thing off //
		clearInterval(window.QuickieWikiIID);
		document.removeEventListener('mouseup', window.FAGCSelectEvent,false);
		return;
	}
}


// Set Up Selection Event Watch //
document.addEventListener('mouseup', window.FAGCSelectEvent, false);
window.QuickieWikiIID = setInterval(window.FAGCSelectEvent, 2000);


// Make Image Links //
function makeLink(id,imgdata,title,newtab) {
	// Make Anchor //
	link = document.createElement('a');
	link.setAttribute('id', id);
	link.setAttribute('title', title);

	// Make Image //
	img = document.createElement('img');
	img.setAttribute('src', imgdata);
	img.setAttribute('style', 'margin: 2px; border: none; vertical-align: top;');

	// New Tab Link //
	if (newtab) {
		link.setAttribute('target', '_blank');
	}

	// Add Image //
	link.appendChild(img);

	return link;
}


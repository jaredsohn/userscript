// ==UserScript==
// @name Add Google Service Link
// @description Add Google Reader link back to where it was in the top-navigation bar on google application pages. Based shamelessly on userscripts.org/scripts/show/114191 and userscripts.org/scripts/show/95077.
// @match http://*.google.com/*
// @match https://*.google.com/*
// @version 1.2
// ==/UserScript==

function addLink(name, link, index, x, y, background_url) {
        var contentframe=null, gbar=null, sites=null, reader=null, readerlink=null;

        if (document.location.host == "mail.google.com")
                contentframe=document.getElementById('canvas_frame').contentDocument;
        else
                contentframe=document;

		gbar=contentframe.getElementById('gbar');
		
		if( gbar != null ) {
			/*gbar = gbar.childNodes[0];
			var reader = null;
			for (i = 0; i < gbar.childNodes.length; i++) {				
					if (undefined == gbar.childNodes[i] || undefined == gbar.childNodes[i].innerText)
						continue;
					if (gbar.childNodes[i].innerText.match(name)){
						reader = gbar.childNodes[i];
						break;
					}
			}
			
			
			if ( reader == null ) { 
				sites = gbar.childNodes[index];

				// Clone the [Sites] Element
				reader=sites.cloneNode(true);

				reader.innerText=name;				
				reader.setAttribute('href', link);
				reader.removeAttribute('id');

				gbar.insertBefore(reader, sites);
			}
			else{
				reader = gbar.removeChild(reader);
				sites = gbar.childNodes[index];
				gbar.insertBefore(reader, sites);
			}*/
		}
		else {
			gbar=contentframe.getElementById('gbzc');

			//alert( gbar.childNodes[i].innerTextgetElementsByClassName('gbts')[0]
			// Walk tree looking for [Sites]
			var reader = null;
			for (i = 0; i < gbar.childNodes.length; i++) {
				if (gbar.childNodes[i].outerHTML.indexOf(name) > 0 && gbar.childNodes[i].outerHTML.indexOf(name) < 500){						
						reader = gbar.childNodes[i];
						break;
					}
			}
			if (reader == null){ /*If we don't find the sites element, insert arbitrarily before the 4th element*/
				sites = gbar.childNodes[index];

				// Clone the [Sites] Element
				reader=sites.cloneNode(true);

				reader.getElementsByClassName('gbts')[0].innerText=name;
				readerlink=reader.getElementsByClassName("gbzt")[0];
				
				if(document.URL.indexOf(link) >= 0) {
					readerlink.className = 'gbzt gbz0l';				
				}			
				else
					readerlink.className = 'gbzt';
					
				readerlink.setAttribute('href', link);
				readerlink.removeAttribute('onclick');
				readerlink.removeAttribute('id');
				
				
				if(undefined == background_url) { 
					readerlink.firstChild.setAttribute('style', "background-image: url(//ssl.gstatic.com/gb/images/j_40368b96.png); background-position:"+ x + "px " + y + "px");
				}
				else {
					readerlink.firstChild.setAttribute('style', "background-image: url(//google.com/images/icons/product/voice-32.png); ");

//					readerlink.firstChild.setAttribute('style', "background-image: url(//" + background_url + ");";
				}
				
				
				gbar.insertBefore(reader, sites);
			}
			else {
				reader = gbar.removeChild(reader);
				sites = gbar.childNodes[index];
				gbar.insertBefore(reader, sites);
			}
		}
};
function addLinks(){
	addLink("Search", "http://www.google.com", 1, -266, -124);
	addLink("Gmail", "https://mail.google.com/mail/?tab=qm", 2, -185, -37);
	addLink("Documents", "https://docs.google.com/?tab=qo&authuser=0", 3, -192, 0);
	addLink("Calendar", "https://www.google.com/calendar?hl=en&tab=qc", 4, -148, -37);
	addLink("Voice", "https://www.google.com/voice", 5, 0, 0, "google.com/images/icons/product/voice-32.png");
	addLink("Maps", "http://maps.google.com/maps?hl=en&tab=wl", 6, -148, -267);
	addLink("Picasa", "https://picasaweb.google.com", 7, -111, -267);	
	addLink("Music", "http://music.google.com", 8, 0, -244);
	addLink("YouTube", "http://youtube.com", 9, -185, -267);
}
try {
        addLinks();
} catch (e) {
        setTimeout(addLinks, 2000);
}
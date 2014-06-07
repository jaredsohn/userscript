// ==UserScript==
// @name           nice nude.hu
// @namespace      http://nude.hu
// @description    Make nude.hu nice
// @include        http://nude.hu/*
// @include        http://*.nude.hu/*
// @include        http://lesbian.hu/*
// @include        http://*.lesbian.hu/*
// @include        http://porn.hu/*
// @include        http://*.porn.hu/*
// ==/UserScript==

//remove big logo
var images = document.getElementsByTagName('img');
	for (i=0; i<images.length; i++) {
		try {
			if (images[i].src.match(/http:\/\/images5\.nude\.hu\/biglogo\d\.jpg$/)) {
				images[i].parentNode.innerHTML='<img src="http://images5.nude.hu/galllogo2a.jpg" />';
			}
		} catch(e) {}
	}
	
/*
  disable onmouseover and onmouseout
  if (document.layers) document.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT)
  document.onmouseover = null;
  document.onmouseout = null;
*/

//apply these changes only to home page
var docLocation = document.location.toString();
if (docLocation.match(/http:\/\/(?:www\.|)(nude|lesbian|porn)\.hu\/(?:galleries|potd|index.phtml|)$/) || 
	docLocation.match(/http:\/\/(?:www\.|)(nude|lesbian|porn)\.hu\/(?:index.phtml|galleries|)\?from=\d+(\&category=.+|)$/) ||
	docLocation.match(/http:\/\/(?:www\.|)(nude|lesbian|porn)\.hu\/(?:index.phtml|galleries|)\?category=.+(\&from=\d+|)$/)){
	
	
	//hide first table with adds and stupid teddy bear
	var tables = document.getElementsByTagName('table');
	if (tables.length) tables[0].style.display = 'none';

   //hide useless left hand menu
   var siteLabel = docLocation.match(/.*(nude\.hu|lesbian\.hu|porn\.hu).*/)[1];
   var tablecells = document.getElementsByTagName('td');
   var sidebarLinks = "";
   if (tablecells.length) {
   	for (i=0; i<tablecells.length; i++) {
   		if (tablecells[i].className=="menus") {
   			if (sidebarLinks == "") {
   				sidebarLinks = "nicer "+siteLabel+"<br />";
   				var galleries = docLocation.match(/.\/galleries/);
   				if (!siteLabel.match(/nude/) || !galleries) 
   					sidebarLinks = sidebarLinks + '<a href="http://nude.hu/galleries">nude.hu galleries</a><br />';
  					if (!siteLabel.match(/lesbian/) || !galleries) 
   					sidebarLinks = sidebarLinks + '<a href="http://lesbian.hu/galleries">lesbian.hu galleries</a><br />';
   				if (!siteLabel.match(/porn/) || !galleries) 
   					sidebarLinks = sidebarLinks + '<a href="http://porn.hu/galleries">porn.hu galleries</a><br />';
   			} else {
   				sidebarLinks = "";
   			}
   	  		tablecells[i].innerHTML = sidebarLinks;
   	  		
   	  	}
   	}
   	  
   }
	
	//show hints for user for location of galleries - hide ads
	for (i=0; i<images.length; i++) {
		if (images[i].parentNode.nodeName.toUpperCase() == "A") {
			var thisImage = images[i];
			var thisImageLink = thisImage.parentNode;
			try {
				if (!thisImageLink.href.match(/http:\/\/(?:www\.|)(?:nude|lesbian|porn)\.hu\/.+$/)) {
					thisImageLink.innerHTML="advert";
				}	else {
					if (thisImageLink.href.match(/http:\/\/(?:www\.|)(?:nude|lesbian|porn)\.hu\/\d+$/)) {
						thisImageLink.innerHTML=thisImageLink.innerHTML+"<br />redirect";
					} else {
						thisImageLink.innerHTML=thisImageLink.innerHTML+"<br />gallery";
					}
				}
			} catch(e) {}
		}
	}
} else {
	//if url ends in .html then treat as image page which 
	//we will ignore for now
	if (docLocation.match(/\.html$/)){

	} else {
		if (docLocation.match(/http:\/\/(?:www\.|)(?:nude|lesbian|porn)\.hu\/\d+$/)) {
			//treat as redirect form page
			var forms = document.getElementsByTagName('form');
		   if (forms.length) { 
				document.location=forms[0].getAttribute("action");
			}
		} else {
		
		//else treat as gallery page

			//hide useless left hand menu
			var advertTDid;
		   var tablecells = document.getElementsByTagName('td');
		   if (tablecells.length) {
	   		for (i=0; i<tablecells.length; i++) {
	   			if (tablecells[i].width==170) {
	   	  			tablecells[i].innerHTML="";
		   	  		tablecells[i].width=1;
		   	  	}
		   	  	if (tablecells[i].colspan == 4 && tablecells[i].innerHTML.match(/Partners/)) {
		   	  		tablecells[i].parentNode.style.display = 'none';
		   	  		advertTDid = i;
		   	  	}
	   		}
	   	  
	   	}
	   
		   /*
		   replace image links on gallery pages to go straight to jpg.
		   remove images and links to "partner sites" 
		   remove any image links to sites outside (nude|lesbian|porn)
		   */
			for (i=0; i<images.length; i++) {
				if (images[i].parentNode.nodeName.toUpperCase() == "A") {
					var thisImage = images[i];
					var thisImageLink = thisImage.parentNode;
					try {
						if (thisImageLink.href.match(new RegExp("^"+docLocation))) {
							thisImageLink.href=thisImage.src.replace(/tn_/,"");
						} else if (thisImageLink.href.match(/\/pref\/\d+/)) {
							thisImageLink.href = docLocation;
							thisImage.style.display = 'none';
						} else if (!thisImageLink.href.match(/^http:\/\/(.*\.|)(nude|lesbian|porn)\.hu/)) {
							thisImageLink.href = docLocation;
							thisImage.style.display = 'none';
						}
					} catch(e) {}
				}
			}
			
			//Remove any link not linked to jpg	
			var links = document.getElementsByTagName('a');
			for (i=0; i<links.length; i++) {
				var thisLink = links[i];
				if (!thisLink.href.match(/\.jpg/i)) {
					thisLink.parentNode.removeChild(thisLink);
					//removing this element decreases links size!
					i--;
				}
			}
			
			//Remove all <BR> elements - they are only there to separate ad links.
			var breaks = document.getElementsByTagName('br');
			while (breaks.length > 0) {
				var thisBr = breaks[breaks.length-1];
				thisBr.parentNode.removeChild(thisBr);
			}			   
	   }
	}
}


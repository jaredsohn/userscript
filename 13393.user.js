// ==UserScript==
// @name           Wiki WHOIS linker
// @author         Arendedwinter
// @namespace      (none)
// @include        *.wikipedia.org/*
// @description    Creates a link next to each anon IP for easy WHOIS searches.  Should work on all language Wikis
// ==/UserScript==


// NOTIFICATION TEXT : REMOVE IF YOU DON'T WANT IT
var Notify = document.createElement("p");
var txt = "WHOIS lookup enabled";
var newT = document.createTextNode(txt);
		Notify.appendChild(newT);
		Notify.setAttribute("style", "position: fixed; z-index: 99; left: 0; bottom: 0; font-size: 7pt; background-color: #E9E9E9; color: #000000;");

var AppendSwitcher = document.getElementsByTagName('body')[0];
		AppendSwitcher.appendChild(Notify);
//--DON'T REMOVE BELOW HERE--

//SET SOME VARIABLES
var Link = document.getElementsByTagName('a');
var IPFilter = /^.*([0-9]{0,2})+\.([0-9]{0,2})+\.([0-9]{0,2})+\.([0-9]{0,2})+$/;

var ExtraLinkURL = 'http://ip-lookup.net/index.php?';
var ExtraLinkTarget = '_blank';
var ExtraLinkTitle = 'WHOIS this IP';
var ExtraLinkText = ' <font size="1"><font color="black">(</font><u><font color="#CC0000">WHOIS</font></u><font color="black">)</font></font>';


//DO STUFF!
//Yes I'm aware this can be written better...
for (var i = 0; i < Link.length; i++){

	//Filter out external links (eg: Enzyme Commission codes are the same format as an IP)
	var InWikipedia = /wikipedia/.test(Link[i].href);

	if (InWikipedia == true){
	
		if (Link[i].textContent.match(IPFilter)){
			
			ExtraLinkSpan = document.createElement('span');
			
			if (Link[i].textContent.match(/\:/g)){
				var NewLink = Link[i].textContent.split(/\:/g);
				NewLink = NewLink[1];
				
				if (NewLink.match(/\//g)){
					var NewLink = Link[i].textContent.split(/\//g);
					NewLink = NewLink[1];
				}
				
			}else{
				var NewLink = Link[i].textContent;
			}
	
			ExtraLink = '<a href="' + ExtraLinkURL + NewLink + '" target="' + ExtraLinkTarget + '" title="' + ExtraLinkTitle + '">' + ExtraLinkText + '</a>';
			ExtraLinkSpan.innerHTML = ExtraLink;
			
			Link[i].parentNode.insertBefore(ExtraLinkSpan, Link[i].nextSibling);
	
		}
	}
}
// ==UserScript==
// @name           deRLizer
// @namespace      http://www.erepublik.com/
// @include        http://*.erepublik.com/*
// ==/UserScript==

var sostituzioni = {
    "Partito Comunista Eitaliano": "Pop Corn Eitaliano",
    "Comunisti eItaliani": "Commercialisti eitaliani",
    "Eitalia dei valori": "Eitalia dei bagordi",
 };  
 
 var sostituzioniImg = {
    "http://static.erepublik.com/uploads/avatars/Parties/2008/04/13/43feaeeecd7b2fe2ae2e26d917b6477d.jpg" : "http://imgur.com/X2xIj.jpg",
	"http://static.erepublik.com/uploads/avatars/Parties/2008/04/13/43feaeeecd7b2fe2ae2e26d917b6477d_55x55.jpg" : "http://imgur.com/G0flD.jpg",
	"http://static.erepublik.com/uploads/avatars/Parties/2008/09/21/d5e2c0adad503c91f91df240d0cd4e49.jpg" : "http://imgur.com/fS3Hh.jpg",
	"http://static.erepublik.com/uploads/avatars/Parties/2008/09/21/d5e2c0adad503c91f91df240d0cd4e49_55x55.jpg" : "http://imgur.com/52isn.jpg",
	"http://static.erepublik.com/uploads/avatars/Parties/2010/07/03/211ed78fe91938b90f84a51944b08d5a.jpg" : "http://imgur.com/fS3Hh.jpg",
	"http://static.erepublik.com/uploads/avatars/Parties/2010/07/03/211ed78fe91938b90f84a51944b08d5a_55x55.jpg" : "http://imgur.com/52isn.jpg",
 }; 
 
var regex = {}; 

for (key in sostituzioni)
{ 
    regex[key] = new RegExp(key, 'gi'); 
} 

var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++)
 { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in sostituzioni)
	{ 
        s = s.replace(regex[key], sostituzioni[key]); 
    } 
    node.data = s; 
}

var images = document.getElementsByTagName ("img");
for (var i=0; i< images.length; i++)
{
    for (key in sostituzioniImg)
	{ 
        if (images[i].src == key)
			images[i].src = sostituzioniImg[key];
    } 
}
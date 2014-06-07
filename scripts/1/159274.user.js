// ==UserScript==
// @name      GC-Pad
// @namespace  
// @description    Implementiert ein Etherpad ins Listing.  
// @version		   0.2
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

// Funktion URL auslesen
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

String.prototype.rot13 = function(){ //v1.0
 return this.replace(/[a-zA-Z]/g, function(c){
 return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
 });
 };


 
    
	 
var GCCode = document.getElementsByClassName('CoordInfoCode')[0].innerHTML; 
	    
var me = document.getElementsByClassName('SignedInProfileLink')[0].innerHTML;
	  
var  mecrypt = me.rot13();

 
var getRef = document.getElementById("cache_note");
 

  var myDiv = document.createElement('div');
  myDiv.innerHTML = "<iframe id=iframe frameborder=0 width=100% height=300 src=https://ep.mafiasi.de/p/"+GCCode+mecrypt+"?showLineNumbers=false&userColor=%23ffffff&lang=de&userName="+me+"></iframe><a href=https://ep.mafiasi.de/p/"+GCCode+mecrypt+"?showLineNumbers=false&userColor=%23ffffff&lang=de&userName="+me+" target=_blank>Pad in neuem Fenster öffnen</a>"; 					
 document.body.appendChild(myDiv);
 
 var parentDiv = getRef.parentNode;
	parentDiv.insertBefore(myDiv, getRef);
	
	
	

    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
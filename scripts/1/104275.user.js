// ==UserScript==
// @name           Link_underneath
// @namespace      link_underneath
// @include        *http://rpgconnect.org/4E%20Conversion%20-%20Against%20the%20Cult%20of%20the%20Reptile%20God.html*
// ==/UserScript==


//document.addEventListener('DOMNodeInserted', create_redirect, false);
var responseDIV = new Array();    //you don't really need an array, I was attempting to refer to them later
 
	//function create_redirect() {
		
    //docA = document.evaluate("//a", document, null, 7, null);    //this would find every link <a href="www.google.com">Link Click</a>
    docA = document.evaluate("//a[ name( following-sibling::*[1] ) != 'div' ]", document, null, 7, null);   //this gets all <a> link tags that do not have a <div> directly after them (as next sibling[1])
    //docA = document.evaluate("//a[ following-sibling::*[1]/@id  != 'links_underneath' ]", document, null, 7, null);   //this gets all <a> tags that do not have a <div> with id "links_underneath" directly after them (as next sibling[1])
    for (i=0; i<docA.snapshotLength; i++) {	    
   		responseDIV[i] = docA.snapshotItem(i).parentNode.insertBefore(document.createElement("div"), docA.snapshotItem(i).nextSibling);  //confusing, but creates div element directly after the found links, it references the ParentNode of the found link, then inserts before next Sibling of the found link
        responseDIV[i].id = "links_underneath"+i;
        responseDIV[i].innerHTML = "loading...";   
        
        
       
        var req = GM_xmlhttpRequest({
        method: 'GET',
        //url: 'http://greaseblog.blogspot.com/atom.xml',
        //url: 'http://www.wizards.com/dndinsider/compendium/monster.aspx?id=4045',
        url: docA.snapshotItem(i).href,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        	},
        //onreadystatechange: function(responseDetails) {
                //alert(responseDetails.status);       
        //}            	
	    onload: HandleRequest.bind( {}, i)        //the bind command forces each request to maintain the i variable passed to it, so when each request comes back in a different order they remain distinct.                              
        });               
    }
    
     function HandleRequest(i, responseDetails) { 
	     if (responseDetails.status = 200) {	                   
         	//alert(responseDetails.responseText);                    	               
         } 	     	       
         //alert(i);                       
         document.getElementById("links_underneath"+i).innerHTML = responseDetails.responseText;   
         //var lineBreak = document.createElement("br"); //my feeble attempts at adding line breaks.
         //document.getElementById("links_underneath"+i).insertBefore(lineBreak, document.getElementById("links_underneath"+i).nextSibling);
         //document.getElementById("links_underneath"+i).appendChild(lineBreak);
       	 //docA.snapshotItem(i).parentNode.insertBefore(lineBreak, docA.snapshotItem(i).nextSibling); //this actually inserts before the above iframe because it goes right after <a               
     }
// ==UserScript==
// @name           images hack
// @namespace      
// @description    showing the images from imageshack.us and imagehack.gr directly on the page 
// @include        *
// ==/UserScript==


linkifyimageshack();

	

const urlRegex = /\b(https?|ftp|file)\:\/\/imageshack[^"\s\<\>\[]*[^.,;'">\:\s\<\>\)\]\[\!](?:.jpg|.png|.jpeg|.gif)|.*?(?:\.jpg|\.png|\.jpeg|\.gif)/ig;
var xpath = "//a[contains(@href,'imageshack')]|//a[contains(@href,'imagevenue')]";


var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

//GM_log(cand);
        	
        	var directimagehackus = cand.href.match(/http\:\/\/img\d*\.imageshack\.us\/img\d*\/\d*\/\w*\.(?:jpg|png|gif|jpeg)/);
        	var notdirectimagevenue = cand.href.match(/http\:\/\/img\d*\.imagevenue\.com\/img.php\?image=\w*\.(?:jpg|png|gif|jpeg)/);
        	if (directimagehackus){

        		showdirectimage(cand.href);
        	  }else if (notdirectimagevenue){
        	  gogetnotdirectimagevenue(cand.href);
        		}else{
        	  gogetit(cand.href);
            }


    }

function showdirectimage(daurl){
	createtheimage(daurl,daurl);
}

function gogetnotdirectimagevenue(daurl){

	GM_xmlhttpRequest({
    method: "GET",
     url: daurl,
    onload: function(responseDetails) {
    	gogetnotdirectimagevenueREGEXPR = /SRC="(.*?)"/; 
    	partofurlneededREGEXPR = /http\:\/\/img\d*\.imagevenue\.com\//;
    	var realimagegogetnotdirectimagevenue = gogetnotdirectimagevenueREGEXPR.exec(responseDetails.responseText);	
    	var partofurlneeded = partofurlneededREGEXPR.exec(daurl);	


if (partofurlneeded){
 realimagevenueimg = partofurlneeded+realimagegogetnotdirectimagevenue[1];
 createtheimage(realimagevenueimg,daurl);
 
   	
     	}    	
    	
    	
    	
    	}});
	
	
	
	}

function gogetit(daurl){
  GM_xmlhttpRequest({
    method: "GET",
     url: daurl,
     onload: function(responseDetails) { 
       
        imagehackrgregexpr = /<img src=\".(\/files\/\w*.jpg)" alt="/;
        imagehackrusegexpr = /src=\'(http:\/\/img\d*\.imageshack\.us\/img\d*\/\d*\/.*?\.(?:jpg|png|gif|jpeg))\' title=\'/;
        //imagehackrusDIRECTegexpr = /src=\'(http:\/\/img\d*\.imageshack\.us\/img\d*\/\d*\/.*?\.jpg)\' title=\'/;
        var realimagegr = imagehackrgregexpr.exec(responseDetails.responseText);	
        var realimageus = imagehackrusegexpr.exec(responseDetails.responseText);	

if (realimageus){
 realimagehackrus = realimageus[1];
  createtheimage(realimagehackrus,daurl);
	
     	}


        
        if (realimagegr){

 realimagehackrgr = 'http://imageshack.gr'+realimagegr[1];
 createtheimage(realimagehackrgr,daurl);

     	}
     	
    }
  });
}

 function createtheimage(realImage,daurl){
 var div = document.createElement("div");
 var img = document.createElement("img");
     img.setAttribute("src",realImage);
     if(img.width >= screen.width*0.65){
	      img.width = screen.width*0.65;
	     }
	     div.appendChild(img);
	     
 var xpathy = "//a[contains(@href,'"+daurl+"')]" ;
   var daNodes =  document.evaluate(xpathy, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     for (var i = 0; i < daNodes.snapshotLength; i++) {
      node = daNodes.snapshotItem(i);
      node.appendChild(div); 
         }   	
     	}

function linkifyimageshack(){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{
var regex = /http:\/\/(img\d*\.imageshack\.us|(www\.|)imageshack\.gr)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;



var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;
	
	if(regex.test(muligtLink)){
		
		//til at holde det nye link, og teksten omkring det
		var span = document.createElement('span');
		//tekst.parentNode.replaceChild(span, tekst);
		//alert("parent:" + span.parentNode);
				
		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			//vores match gemmes
			var link = myArray[0];
			
			//alert("har fundet dette link: " + link);
			
			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit
						
			var href = link;
			
			//s?tter http:// foran href, hvis der ikke er det
			var prefix = '';
			if(href.length > 7){
				prefix = href.substring(0,7);
			}
			if(prefix.toLowerCase() != 'http://'){
				href = 'http://' + href;
			}
			
			//skab vores link:
			var a = document.createElement('a');
			a.setAttribute('href', href); //giv det en href
			a.appendChild(document.createTextNode(link)); //linkteksten
			span.appendChild(a); //s?tter ind i span
								
			lastLastIndex = regex.lastIndex;
			
		}
		
		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
		tekst.parentNode.replaceChild(span, tekst);

	}
	
		
}
} catch(e){alert(e);}

	}
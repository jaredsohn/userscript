// ==UserScript==// @name          Yahoo Movies Actor Photos// @namespace     http://www.japaninyourpalm.com// @description   Show movie star's photo upon hovering over the star's link on the movie page.// @include       http://movies.yahoo.com/movie/*/info*

/* 
You can never go wrong to catch a movie rated A, A+, A-, B+ on Yahoo Movies. When viewing a movie's page, it's a pitty I can't see the actor's photo directly on that page (in Cast & Credits section). So I wrote this to allow me to pop up the actor's photo by simply hovering over the actor's hyperlink.This works on pages with hyperlink format like http://movies.yahoo.com/movie/1809834191/info
Tehnical note: This code's mashup framework can be re-used to make an ajax like request to any web page and pull its content in, in a manner that makes its DOM crawlable from the page you started from. The trick is to append the outside file to the current file within a hidden div. The new concatened file needs to be referred to via a new document variable.   
*/

/* updates
 1/19/2008 - added * to end of allowable url since i noticed some of yahoo movies pages have something behond the "info" string
*/

// used later to mark the location of the actor web page
const HIDDEN_DIV_ID  = 'starDiv';

// hidden div we'll use to popup a photo
var starPopUpDiv = document.createElement('div');
starPopUpDiv.setAttribute('id', 'popUpDiv');
starPopUpDiv.setAttribute('style', 'visibility:hidden;');
var starImageElem = document.createElement('img');
starPopUpDiv.appendChild(starImageElem);
document.body.appendChild(starPopUpDiv);

// hidden div we'll use to popup a "no photo" message
var noPhotoPopUpDiv = document.createElement('div');
noPhotoPopUpDiv.setAttribute('id', 'noPhotoDiv');
noPhotoPopUpDiv.appendChild(document.createTextNode("No Photo in Yahoo Movies"));
noPhotoPopUpDiv.setAttribute('style', 'visibility:hidden;');
document.body.appendChild(noPhotoPopUpDiv);

// identify the actor hyperlinks on the movie page
var xpath = "/html/body/center/p/table[7]/tbody/tr[2]/td[1]/table[2]/tbody/tr/td[3]/table[6]/tbody/tr[1]/td[2]";

var starTable;

if (!(starTable = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue )) {
    return;
}    

var links = starTable.getElementsByTagName('a');

for (var i=0; i<links.length; i++) {
	var linkElem = links[i];
	actorUrl = linkElem.getAttribute('href');
 
    linkElem.addEventListener('mouseover', showActor, true);
    linkElem.addEventListener('mouseout', hideActor, true);        
}    


function showActor(event) {
	// make ajax-like request to the actor's web page
	// pull the entire actor page in, and append it (hidden div) to the movie page
	// find the actor's photos, and show them below the actor's hyperlink
	
	var linkElem = event.target;
	var linkUrl = event.target.getAttribute('href');
    var fullurl= 'http://movies.yahoo.com' + linkUrl;

    var newDocument;
    var photoLink;
    
      GM_xmlhttpRequest ({        method : 'GET', 
        url : 'http://movies.yahoo.com' + linkUrl, 
        headers: {
        	"User-Agent":"monkeyagent",
        	"Accept":"text/monkey,text/xml"
        },
        onload : function(results) {
            var s = new String(results.responseText);
            s = s.replace(/\n/g, ' ');
            //s = s.replace(/^.*<style.*?<\/style>/gi, ' ');                s = s.replace(/^.*<body[^>]*>(.*)<\/body>.*$/gi, "$1");
                            newDocument = appendToDocument(s);
            
            // find the actor's photo in the main description area
            // if can't find there, then check under additional photos section
            var photoXpath = "//div[@id='ymovMainContent']/div[1]/div[1]/a[1]/img";
            var photoXpathAlt = "//div[@id='ymovMainContent']/div[1]/ul/li[1]/a/img";
            
            var starPhotoElem;
            var foundPhoto = 0;
            
            if ( starPhotoElem = newDocument.evaluate(photoXpath,
                newDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ) {
                	foundPhoto = 1;
            }    	
            else if ( starPhotoElem = newDocument.evaluate(photoXpathAlt,
                newDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ) {
                	foundPhoto = 1;
            }
            else {
            	foundPhoto = 0;
            }   
            
            // get position of the actor's hyperlink element on the movie page
            var positionArray = getPosition(linkElem);
            topPos = positionArray[1] + 17;
            leftPos = positionArray[0] + 1;

            var popUp;
            var noPhotoPopUp;
                
            if (foundPhoto) {
            	popUp = document.getElementById('popUpDiv');
                photoLink = starPhotoElem.getAttribute('src');                
                var imgElem = popUp.getElementsByTagName('img')[0];
                imgElem.setAttribute('src', photoLink);
                popUp.setAttribute('style','position: absolute; top:'+topPos+'; left:'+leftPos+';  border: 2px solid #808080; visibility:visible; ')
                
            }
            else {
            	noPhotoPopUp = document.getElementById('noPhotoDiv');
                noPhotoPopUp.setAttribute('style','position: absolute; top:'+topPos+'; left:'+leftPos+';  border: 2px solid #808080; padding: 5px; background-color: white;z-index:1000; visibility:visible; ')            	
            }                                                          	        }      });            
	return linkUrl;      
}


function hideActor(event) {
	// remove photo or No Photo message after mouseout
	
    var popUp = document.getElementById('popUpDiv');
    var imgElem = popUp.getElementsByTagName('img')[0];
    //imgElem.setAttribute('src', ''); // doesn't work so well, revisit
        
    var noPhotoPopUp = document.getElementById('noPhotoDiv');
        	
    popUp.setAttribute('style', 'visibility:hidden;');  
    noPhotoPopUp.setAttribute('style', 'visibility:hidden;');        
}


function appendToDocument(html) {
    // used to append the entire actor's web page to the movies page
    // actor's page will become a hidden div	    var div = document.getElementById(HIDDEN_DIV_ID);    if (!div) {        div = document.createElement("div");
        document.body.appendChild(div);        div.id = HIDDEN_DIV_ID;
        div.style.display = 'none';    }    div.innerHTML = html;    return document;}


function getPosition(theElement) {
	// used to obtain the x and y position of the actor's hyperlink
	// photo will be placed just below this link.
    var positionX = 0;
    var positionY = 0;
    
    while (theElement != null) {
        positionX += theElement.offsetLeft;
        positionY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
    return [positionX, positionY];
}    

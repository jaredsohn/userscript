// ==UserScript==
// @name Calvin and Hobbes Minimalist view
// @description Displays only the comic image, arrow keys to navigate
// @include http://www.gocomics.com/calvinandhobbes*
// @run_at document_start
// ==/UserScript==


/* HOW IT WORKS



*/


	 //Find element with comic in it
	 var contentNode = document.getElementById("content").getElementsByTagName("p")[0];

         var prevElement = document.getElementById("content").getElementsByTagName("a")[1];
         var nextElement = document.getElementById("content").getElementsByTagName("a")[2];
contentNode.insertBefore(nextElement ,contentNode.childNodes[0]); 
contentNode.insertBefore(prevElement ,contentNode.childNodes[0]); 

	//Move to beginning of document
	 var dBody = document.getElementsByTagName("body")[0];
	 dBody.insertBefore(contentNode ,dBody.childNodes[0]); 
	 
//Delete everything else from document
	 while (dBody.lastChild != dBody.firstChild) { dBody.removeChild(dBody.lastChild); }



var links = document.getElementsByTagName("a");

function keyPressEvent(event) {
	var keyNum = event.charCode ? event.charCode : event.keyCode;

	switch (keyNum) {
		case 37: // Left Arrow
		    for(var i=0; i<links.length; i++) {
				if(links[i].className && links[i].className == "prev") {
					location.href = links[i].href;
					break;
				}
			}
		    break;
		case 39: // Right Arrow
		    for(var i=0; i<links.length; i++) {
				if(links[i].className && links[i].className == "next") {
					location.href = links[i].href;
					break;
				}
			}
		    break;
            
        default:
    }
}

//Add Listeners
document.addEventListener('keyup', keyPressEvent, true);


// ==/UserScript==

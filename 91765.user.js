// ==UserScript==
// @name           Display Amazon Marketplace comments (condition note) back
// @description    All Amazon websites : Display seller's item comments (condition note) for all offerings (new/used). An Amazon bug prevents them to display in Opera.
// @version        2010-12-02_1245
// @author         Tristan "jesus2099" DANIEL (http://miaou.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://amazon.*
// @include        http://www.amazon.*

// ==/UserScript==

(function () {
/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- - 
	colour		: just put "" for standard stylings
	background	: 
	border		: 
	padding		: bla bla proutor */
	var colour = "black";
	var background = "yellow";
	var border = "medium maroon dashed";
	var padding = "2px 4px";
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */

var comments = getElementsByClassName(document, "div", "comments");

for (var ico=0; ico < comments.length; ico++) {
	comments[ico].style.color = colour;
	comments[ico].style.background = background;
	comments[ico].style.border = border;
	comments[ico].style.padding = padding;
	comments[ico].style.display = "block";
	var subdivs = comments[ico].getElementsByTagName("div");
	for (var isd=0; isd < subdivs.length; isd++) {
		if (isd==0) {
			subdivs[isd].style.display = "block";
			subdivs[isd].getElementsByTagName("span")[0].style.display = "none";
		}
		else { subdivs[isd].style.display = "none"; }
	}
}

function debug(coucou) {
	try {
		opera.postError(coucou);
	} catch(e) {/*alert(coucou);*/}
}


// Helper function for getting html element by class name
// Written by Jonathan Snook, http://www.snook.ca/jonathan
// Add-ons by Robert Nyman, http://www.robertnyman.com
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements);
}

})();
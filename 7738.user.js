// ==UserScript==
// @name        feber.se - adsremover
// @author		kannibal
// @namespace   http://www.feber.se
// @description	Removes all adds on http://*.feber.se/*
// @include         http://*feber.se/*
// ==/UserScript==

(function() {
	
	element = document.getElementById('reklam_hoger');
	element.style.display = "none";
	
	element = document.getElementById('tipsarad');
	element.style.display = "none";
	
	element = document.getElementById('status_rad');
	element.style.width = '730px';
	
	element = document.getElementById('content');
	element.style.width = '730px';
	
	element = document.getElementById('spons_fallback');
	element.style.width = '730px';
	element.style.overflow = 'hidden';
	
	element = document.getElementById('topp_rad');
	element.style.width = '730px';
	element.style.height = '25px';
	element.style.overflow = 'hidden';
	element.style.backgroundColor = 'red';
	element.style.fontSize = '10px';
	element.style.border = '0px none';

	element = document.getElementById('f_footer');
	element.style.width = '700px';
	element.style.padding = '15px';

	element = document.getElementById('content');
	element.style.width = '730px';
	element.style.overflow = 'hidden';


	elements = getElementsByClassName(document, "*", 'topp_rad_feber|topp_rad_livsstil|topp_rad_teknik|topp_rad_livsstil|topp_rad_noje');
	var i;
	for( i = 0 ; i < elements.length ; i ++ ) {
			elements[i].style.height = "25px";

	}
	
	elements = getElementsByClassName(document, "*", 'topp_rad_noje');
	var i;
	for( i = 0 ; i < elements.length ; i ++ ) {
			elements[i].style.width = "177px";

	}


	elements = getElementsByClassName(document, "*", 'hogerpuff');
	var i;
	for( i = 0 ; i < elements.length ; i ++ ) {
			elements[i].style.display = "none";

	}


})();




/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(oElm, strTagName, oClassNames){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var arrRegExpClassNames = new Array();
    if(typeof oClassNames == "object"){
        for(var i=0; i<oClassNames.length; i++){
            arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
        }
    }
    else{
        arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
    }
    var oElement;
    var bMatchesAll;
    for(var j=0; j<arrElements.length; j++){
        oElement = arrElements[j];
        bMatchesAll = true;
        for(var k=0; k<arrRegExpClassNames.length; k++){
            if(!arrRegExpClassNames[k].test(oElement.className)){
                bMatchesAll = false;
                break;                      
            }
        }
        if(bMatchesAll){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}
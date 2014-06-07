// ==UserScript==
// @name           IHC-User fixer
// @namespace      http://userscripts.org/users/46091
// @include        http://www.ihc-user.dk/*
// @description    Fixes the problem with visible html entities and non-structured descriptions in the download-section on IHC-User.dk
// @author         Flemming Steffensen
// @version        0.2
// ==/UserScript==

(function() {
    var arrDivs = document.getElementsByTagName('div');
    for (var i = 0; i < arrDivs.length; i++) {
	var objDiv = arrDivs[i];
        var strHTML = content.document.createElement('textarea');

	if (objDiv.className == 'dm_description') {
            strHTML.innerHTML = objDiv.innerHTML;        // This conversion, removes html entities.


            strHTML.value = escape(strHTML.value);       // Convert to values which can be searched for.

            if(strHTML.value.indexOf("%0D%0A") > -1) {   //Windows encodes returns as \r\n
              strHTML.value = strHTML.value.replace(/%0D%0A/g, "<BR>");
            }
            else if(strHTML.value.indexOf("%0A") > -1) { //Unix encodes returns as \n
              strHTML.value = strHTML.value.replace(/%0A/g, "<BR>");
            }
            else if(strHTML.value.indexOf("%0D") > -1) { //Macintosh encodes returns as \r
              strHTML.value = strHTML.value.replace(/%0D/g, "<BR>");
            }


            objDiv.innerHTML = unescape(strHTML.value);
	}
    }
})();

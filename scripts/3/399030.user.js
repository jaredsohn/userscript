// ==UserScript==
// @name           Suppression des Pub et agrandissement du Corps
// @author         Kevin Defaria
// @version        1.8
// @namespace      http://userscripts.org/scripts/show/399030
// @description    Suppression des Pub et agrandissement du Corps
// @include        *facebook.com*
// ==/UserScript==

function Remove_Facebook_Ads() {
    
	var sidebar_ads = document.getElementById('rightCol');
	if (sidebar_ads && sidebar_ads.style.display != 'hidden') {
		sidebar_ads.style.display = 'none';
		sidebar_ads.style.width = '0px';
	}
    
    function getChildren(element) {
    // on boucle sur les enfants de l'élément
        var l=0;
   		for (var i=0, l=element.childNodes.length; i<l; i++) {
    	    var child = element.childNodes[i];
            var IdChild = child.id ;
            if (child.nodeType == 1) {
				child.style.width = 'auto';
				getChildren(child);
      		}
    	}
	}

	var sidebar_ads2 = document.getElementById('contentArea');
	if (sidebar_ads2 && sidebar_ads2.style.width != '0px') {
		sidebar_ads2.style.width = 'auto';
		getChildren(document.getElementById('contentArea'));
	}    
}

document.addEventListener("DOMNodeInserted", Remove_Facebook_Ads, false);
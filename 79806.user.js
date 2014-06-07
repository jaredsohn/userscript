// ==UserScript==
// @name           amazon_mi2s
// @namespace      http://mi2s.imag.fr/is/script/amazon_mi2s.user.js
// @description    Affichage du logo MI2S cliquable pour tous les livres dans Amazon ; le lien permet d'interroger le catalogue MI2S à partir de l'ISBN
// @include        http://*.amazon.*
// ==/UserScript==
(

function() {
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
  if (mainmatch){
  	var isbn = mainmatch[1];

	var header = document.evaluate("//div[@class='buying']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (header) {
      var cpl_link = document.createElement('a');
   	  cpl_link.setAttribute('style', 'text-decoration:none;');
   	  cpl_link.setAttribute('href', 'http://rugbis.grenet.fr/F/?func=find-d&local_base=mi2s&find_code=ISN&request=' + isbn);
   	  cpl_link.setAttribute('title', 'Voir dans le catalogue RUGBIS - MI2S');
   	  cpl_link.setAttribute('target', '_blank');
   	  cpl_link.innerHTML 
	   	= '<div align="center"><b style="color:black;font-size:8pt">or</b><br /><img src="http://t2.gstatic.com/images?q=tbn:Ohp6dKSgyp4vUM:http://doc-st2i.cnrs.fr/IMG/logo_MI2S.jpg" border="0" /><br /><b style="text-decoration:underline">Voir dans le catalogue RUGBIS - MI2S</b><br /></div>';
		header.parentNode.insertBefore(cpl_link, header.nextSibling);
    } else {
		var notAvail = document.evaluate("//div[@class='extendedBuyBox']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	  	if (notAvail) {
		  var cpl_link2 = document.createElement('a');
	   	  cpl_link2.setAttribute('style', 'text-decoration:none;');
   		  cpl_link2.setAttribute('href', 'http://rugbis.grenet.fr/F/?func=find-d&local_base=mi2s&find_code=ISN&request=' + isbn);
	   	  cpl_link2.setAttribute('title', 'Voir dans le catalogue RUGBIS - MI2S');
   		  cpl_link2.setAttribute('target', '_blank');
	   	  cpl_link2.innerHTML 
		   	= '<div align="center"><b style="color:black;font-size:8pt">or</b><br /><img src="http://t2.gstatic.com/images?q=tbn:Ohp6dKSgyp4vUM:http://doc-st2i.cnrs.fr/IMG/logo_MI2S.jpg" border="0" /><br /><b style="text-decoration:underline">Voir dans le catalogue RUGBIS - MI2S</b><br /></div>';
			notAvail.parentNode.insertBefore(cpl_link2, notAvail.nextSibling);
		    }
		}
  } else { 
	var noIBSN = document.evaluate("//div[@class='buying']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  	if (noIBSN) {
      var cpl_link3 = document.createElement('a');
   	  cpl_link3.setAttribute('style', 'text-decoration:none;');
	  cpl_link3.setAttribute('href', 'http://rugbis.grenet.fr/F/?func=find-d&local_base=mi2s&find_code=ISN&request=');
   	  cpl_link3.setAttribute('title', 'Voir dans le catalogue RUGBIS - MI2S');
	  cpl_link3.setAttribute('target', '_blank');
   	  cpl_link3.innerHTML 
	   	= '<div align="center"><b style="color:black;font-size:8pt">or</b><br /><img src="http://t2.gstatic.com/images?q=tbn:Ohp6dKSgyp4vUM:http://doc-st2i.cnrs.fr/IMG/logo_MI2S.jpg" border="0" /><br /><b style="text-decoration:underline">This item does not have an ISBN</b><br /></div>';
		noIBSN.parentNode.insertBefore(cpl_link3, noIBSN.nextSibling);
    }
  }
}
)();
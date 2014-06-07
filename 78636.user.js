// ==UserScript==
// @name           BabordPlus
// @namespace      babord
// @description    Ajout de fonctionnalités au catalogue des bibliothèques universitaires bordelaises (en test)
// @include        http://*bordeaux.fr/ipac20*
// ==/UserScript==

// 1 : Empêcher le rafrichissement de l'opac
document.body.setAttribute('onload', 'setfocus();');


// 2 : Ajout un permalien sur les notices pour faciliter la citation
var url_base_ipac = "http://www2.babord.u-bordeaux.fr/ipac20/ipac.jsp";
var cle = getKey();
if (cle != "")
{
  // On va ajouter un lien permanent
  var zoneForm = document.evaluate("//form[@name='navigation']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (zoneForm.snapshotLength == 1)
  {
    // OK
    var url = url_base_ipac + "?uri=full=3100001~!" +cle + "~!0";
    var monForm = zoneForm.snapshotItem(0);
//    monForm.innerHTML = monForm.innerHTML + "<img src='http://qrcode.kaywa.com/img.php?s=5&d=" + url;
    monForm.innerHTML = monForm.innerHTML + "<img src='" + "http://chart.apis.google.com/chart?chs=200x200&cht=qr&chl=" + url + "'/>";
    monForm.innerHTML = monForm.innerHTML + "<br/><a href='" + url + "'>Lien direct vers cette notice</a>";
  }
}

function getKey()
{
  var listeInput = document.evaluate("//input", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = listeInput.snapshotLength - 1; i >= 0; i--) 
  {
    var elm = listeInput.snapshotItem(i);
    // do stuff with elm
    
    var name  = elm.getAttribute("name");
    var match = name.match (/^bkey(.*)$/);
		if (match != undefined)
    {
      return match[1];
    }
  }
  return "";
}
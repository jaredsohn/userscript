// ==UserScript==
// @name          PhpBB : Agrandit zone de texte
// @description	  Agrandit les zones de saisi de messages sur tous les forum phpBB
// @author        Max485
// @version 	  0.1_2009-06-11
// @include       *
// ==/UserScript==


var phpBB = ufEval("id('wrapfooter')/span", document).snapshotItem(0); // Si on trouve ce block sur la page

if(phpBB != null && phpBB.snapshotLength < 1) // Alors un code avec l'id "wrapfooter" est trouvé, c'est deja un bon points envers le faite qu'on est sur un fofo phpBB
{
	if(phpBB.innerHTML.match(/phpBB/gi) && phpBB.innerHTML.match(/phpBB Group/gi) ) // Et ce texte dans le block alors on est sur un forum phpBB
	{
		// Alors on agrandi les textarea de messages si elle existe
		document.getElementsByName('message')[0].setAttribute('rows', '30');
		document.getElementsByName('message')[0].setAttribute('cols', '200');
		document.getElementsByName('message')[0].setAttribute('style', 'width:900px');
	}
}






function ufEvalnode(path,document,node) {
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return ret;

}
function ufEval(path,document) {
	return ufEvalnode(path,document,document);
}
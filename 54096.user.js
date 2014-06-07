// ==UserScript==
// @name           permalien sudoc
// @author         Sylvain Machefert (@symac)
// @namespace      http://geobib.fr
// @description    Ajoute un permalien sur les notices sudoc
// @include        http://www.sudoc.abes.fr/*
// ==/UserScript==

var libelles;
libelles = document.evaluate(
    "/html/body/div[@class=\"lrmargin\"]/div/span/table/tbody/tr/td[1][@class=\"rec_lable\"]/div/span",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < libelles.snapshotLength; i++) 
{
	var lib = libelles.snapshotItem(i).innerHTML;
	
	if (lib == "Numéro&nbsp;de&nbsp;notice&nbsp;:&nbsp;")
	{
		// On sait à quel "numéro" se trouve le num de notice
		var valeurs = document.evaluate(
		    "/html/body/div[@class=\"lrmargin\"]/div/span/table/tbody/tr/td[2][@class=\"rec_title\"]/div",
		    document,
		    null,
		    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		var ppn = valeurs.snapshotItem(i).innerHTML;
		ppn = ppn.replace(/<\/?[^>]+(>|$)/g, "");
		valeurs.snapshotItem(i).innerHTML = valeurs.snapshotItem(i).innerHTML + " (<a href='http://www.sudoc.abes.fr/DB=2.1/SRCH?IKT=12&TRM=" + ppn + "'>Lien direct vers cette notice</a>)";
	}
}

// ==UserScript==
// @name           Warez-BB Rapidshare Link Converter
// @namespace      booch
// @description    Modifies the structure of any Warez-bb topic in order to provide proper download links for rapidshare files.
// @include        http://www.warez-bb.org/viewtopic*
// @include        http://warez-bb.org/viewtopic*
// ==/UserScript==

// déclaration des variables
var allCodeBlocks,thisCodeBlock,allRegExpMatches,newCode,oldCode ;

// allCodeBlocks est un tableau contenant toutes les balises <code>
allCodeBlocks = document.evaluate("//td[@class='code']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

// l'expression régulière capture des liens rapidshare
var regExp = new RegExp("http://rapidshare.com/files/[0-9]*/[-a-z0-9_\.]*","gi");

// dans chaque balise <code>
for(var i=0;i<allCodeBlocks.snapshotLength;i++)
{
	thisCodeBlock = allCodeBlocks.snapshotItem(i);
	thisCode = thisCodeBlock.innerHTML;
	
	// on applique la première expression régulière
	regExpSearch = thisCode.search(regExp);
	
	// si elle parvient à capturer des liens
	if(regExpSearch!=-1)
	{

		// on les enregistre dans le tableau allRegExpMatches
		allRegExpMatches = thisCode.match(regExp);
		
		// on initialise ce qui deviendra la nouvelle balise <code>
		newCode = "";
		
		// on commence un tableau
		newCode += "<table style='margin: 0 auto; border-collapse: collapse; ' >";
		
		// pour chacun des liens rapidshare
		for(var l=0;l<allRegExpMatches.length;l++)
		{
			// on crée la ligne du tableau
			newCode += "<tr>";
			
			// on met dans une case le lien
			newCode += "<td style='border: 1px solid black; text-align: center; padding: 10px; '>" +allRegExpMatches[l]+" </td>";
			
			// et on ajoute un lien pour télécharger le fichier, on le met dans l'autre case
			newCode += "<td style='border: 1px solid black; text-align: center; padding: 10px; '><a href='" + allRegExpMatches[l]+ "'><span style='font-size: 12px; font-weight: bold;'> Download </span></a><br/></td>";
		
			// on finit la ligne
			newCode += "</tr>";
		}
		
		// on finit le tableau
		newCode += "</table>";
		
		// on remplace l'ancien contenu de la balise <code> par le nouveau
		thisCodeBlock.innerHTML = newCode;
	}
}
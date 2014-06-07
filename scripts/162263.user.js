// ==UserScript==
// @name        Tri par prix pour LeclerDrive
// @namespace   Bertrand Cousin
// @description Ajoute la posibilitée de trier les produits par leur prix et prix par unitée de meusure pour le site www.leclercdrive.fr
// @include     http://*.leclercdrive.fr/*
// @version     alpha
// @grant       none
// ==/UserScript==
window.MyEndRequest=window.EndRequest;
console.log("bebut");
window.EndRequest=function(a, b){
	window.MyEndRequest(a,b);
	console.log("test");
	if($('.ulProdListe').size()>0 && $("#sortElt").length==0){
		window.sortUsingNestedText = function(parent, childSelector, keySelector, asc) {
		var items = parent.children(childSelector).sort(function(a, b) {
			var vA = parseFloat($(keySelector, a).text().replace("€","").replace("€/kg","").replace("€/l","").trim());
			var vB = parseFloat($(keySelector, b).text().replace("€","").replace("€/kg","").replace("€/l","").trim());
			if(isNaN(vA)){
				vA=Number.MAX_VALUE;
			}
			if(isNaN(vB)){
				vB=Number.MAX_VALUE;
			}
			if(asc){
				return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
			}else{
				return (vA < vB) ? 1 : (vA > vB) ? -1 : 0;
			}
		});
		parent.append(items);
		$("#sortElt #panDeroule").hide();
		}
		$("ul.ulChemin").append('<li class="ulCheminElementLi" id="sortElt"><div class="divRacDeb"><div id="panDeroule" onmouseover="AfficherDeroule(this);" onmouseout="CacherDeroule(this);" class="panDeroule" style="display: none; visibility: hidden;"><a class="aItem " onmouseover="AfficherDeroule2(this);" href="javascript:alert(\'On ne peut pas\');">Trier par</a><a class="aItem" onmouseover="AfficherDeroule2(this);" href="javascript:$(\'#sortBy\').text(\'Prix croissant\');sortUsingNestedText($(\'.ulProdListe\'), \'div\', \'.spanPrixProduit\', true);">Prix croissant</a><a class="aItemSel" onmouseover="AfficherDeroule2(this);" href="javascript:$(\'#sortBy\').text(\'Prix décroissant\');sortUsingNestedText($(\'.ulProdListe\'), \'div\', \'.spanPrixProduit\', false);">Prix décroissant</a><a class="aItem" onmouseover="AfficherDeroule2(this);" href="javascript:$(\'#sortBy\').text(\'Prix au kilo/litre croissant\');sortUsingNestedText($(\'.ulProdListe\'), \'div\', \'.spanPrixUniteMesure\', true);">Prix au kilo/litre croissant</a><a class="aItem" onmouseover="AfficherDeroule2(this);" href="javascript:$(\'#sortBy\').text(\'Prix au kilo/litre décroissant\');sortUsingNestedText($(\'.ulProdListe\'), \'div\', \'.spanPrixUniteMesure\', false);">Prix au kilo/litre décroissant</a></div></div><span class="spanRacine" onclick="ToggleDeroule(this);return false;"><a class="aRacine" id="sortBy">Trier par</a></span><a onclick="ToggleDeroule(this);return false;" class="aImgDeroulant" href="#"><img src="_img/ctlChemin/btnCheminRO.gif" id="objChemin_objChemin_ctl05_imgRO"></a></li>');
	}else{
		console.log("pas de produits");
	}
}
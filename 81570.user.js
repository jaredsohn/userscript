// ==UserScript==
// @name           Produccion de recursos
// @description    Muestra la cantidad de recursos que estamos explotando en esa ciudad pero tambien muestra el gasto de vino en la misma. (En las de vino se muestra el ingreso menos el gasto)
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==

// Pour Ikariam 0.3.4

function insertAfter(newNode, refNode) {
	var parent = refNode.parentNode;
	parent.style.lineHeight='normal';	// dé-centre le texte
	parent.style.paddingTop='6px';		// et redescend un peu
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	} else {
		return parent.appendChild(newNode);
	}
}

function createSpan(text, color) {
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(text));
	if(color) span.style.color=color;
	span.style.fontSize='83%';
	span.style.position='absolute';
	span.style.bottom='1px';
	span.style.right='15px';
	return span;
}

function addProd(counter){
	if(!counter) return;
	var element = counter.valueElem;
	// On décale légèrement le nombre vers le haut, pour pouvoir écrire la production dessous.
	// Le node parent est un LI
	element.parentNode.style.verticalAlign = 'top';
	// Ikariam arrondit à l'entier inférieur. Mais parfois la multiplication par 3600 donne un résultat légèrement inférieur,
	// par exemple 29.999999999988002 au lieu de 30
	var prod = Math.floor(counter.production*3600+0.001);
	// Si on distribue du vin sur une île qui en produit.
	if(counter.spendings.length > 0)
		prod -= counter.spendings[0].amount;
	if(prod>0) insertAfter(createSpan(' +'+prod, 'green'), element);
	else if(prod<0) insertAfter(createSpan(' '+prod, 'red'), element);
	else insertAfter(createSpan(' +0', 'gray'), element);
}

addProd(unsafeWindow.woodCounter);
addProd(unsafeWindow.wineCounter);		// Quand on distribue du vin sur une île qui n'en produit pas
addProd(unsafeWindow.tradegoodCounter);
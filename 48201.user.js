// ==UserScript==
// @name            BorColor
// @namespace       http://jotarp.org/node/80
// @description     Script para "colorear" las páginas del BOR (Boletin Oficial de La Rioja, España). Con este script se resaltan en diferentes colores los encabezados de las diferentes secciones y apartados, facilitando su lectura, tanto en pantalla como en papel (el resaltado se mantiene al imprimir la página)
// @include         http://www2.larioja.org/pls/dad_user/G04.texto_integro*
// ==/UserScript==


(function () {
	const url1Regex = /^((Artículo) ?\d+(\.|\.-|:).*\n)$|(Anexo\n)$|(Anexo I*\n)$|^(Capítulo .+)|^(Base \d+\.-.+)/ig;
	const url2Regex = /^(((\d+\.)+\-?)|(\w\))|(\w\.\d+\))|(\d+º\)?))/g;
	const url3Regex = /(Decreto \d+\/\d+)/ig;
	const url4Regex = /^((Primer(o|a))|(Segund(o|a))|(Tercer(o|a))|(Cuart(o|a))|(Quint(o|a))|(Sext(o|a))|(Séptim(o|a))|(Octav(o|a))|(Noven(o|a))|(Décim(o|a))) ?((\.-)|(:))?/ig;
	const url5Regex = /^(((I )|(I\.)|(II)|(III)|(IV)|(V )|(V\.)|(VI)|(VII)|(VIII)|(IX)|(X )|(X\.)).+)/g;

	var xpath = "//text()";

	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	window.colorea = function(cand, txtRegex, estiloCss){
            var span = document.createElement("span");
            var source = cand.nodeValue;

            cand.parentNode.replaceChild(span, cand);

            txtRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = txtRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                var a = document.createElement("span");
                a.setAttribute("style", estiloCss);
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);

                lastLastIndex = txtRegex.lastIndex;
            }

            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
	}
/********************************/
	
	for (var i = 0; i < candidates.snapshotLength; i++) {
		cand = candidates.snapshotItem(i);
//console.log(cand.nodeValue);

        // Artículo
		if (url1Regex.test(cand.nodeValue)) {
			colorea(cand, url1Regex, "background-color:#dde; font-weight:bold;");
		}
		if (url4Regex.test(cand.nodeValue)) {
			colorea(cand, url4Regex, "background-color:#dde; font-weight:bold;");
		}
		if (url5Regex.test(cand.nodeValue)) {
			colorea(cand, url5Regex, "background-color:#dde; font-weight:bold;");
		}

		// números
		if (url2Regex.test(cand.nodeValue)) {
			colorea(cand, url2Regex, "background-color:#dcc; font-weight:bold;");
		}
	}

})();
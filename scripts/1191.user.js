// ==UserScript==
// @name            BorColor
// @namespace       http://jotarp.org/node/80
// @description     Colorear BOR
// @include         http://www2.larioja.org/pls/dad_user/G04.texto_integro*
// ==/UserScript==


(function () {
	const url1Regex = /^((((ArtÃÂ­culo)|(Articulo)) \d+\.-?.+)|(Base \d+\.-.+)|(Anexo.*))$/ig;
	const url2Regex = /^(((\d+\.)+\-?)|(\w\)))/g;
	const url3Regex = /(Decreto \d+\/\d+)/g;
	const url4Regex = /^(((Primer)|(Segund)|(Tercer)|(Cuart)|(Quint)|(Sext)|(SÃÂ©ptim)|(Octav)|(Noven)|(DÃÂ©cim)).+)$/ig;
	const url5Regex = /^(((I )|(I\.)|(II)|(III)|(IV)|(V )|(V\.)|(VI)|(VII)|(VIII)|(IX)|(X )|(X\.)).+)$/ig;

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

		// ArtÃÂ­culo
		if (url1Regex.test(cand.nodeValue)) {
			colorea(cand, url1Regex, "background-color:#dde; font-weight:bold; font-size:larger;");
		}
		if (url4Regex.test(cand.nodeValue)) {
			colorea(cand, url4Regex, "background-color:#dde; font-weight:bold; font-size:larger;");
		}
		if (url5Regex.test(cand.nodeValue)) {
			colorea(cand, url5Regex, "background-color:#dde; font-weight:bold; font-size:larger;");
		}

		// nÃÂºmeros
		if (url2Regex.test(cand.nodeValue)) {
			colorea(cand, url2Regex, "background-color:#dcc; font-weight:bold;");
		}
	}

})();
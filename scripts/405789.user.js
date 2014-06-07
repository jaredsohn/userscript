// ==UserScript==
// @name           meneame.net - Evitador de infartos
// @namespace      *
// @description    Destaca la categoría ocio/humor, para una navegación saludable.
// @author         Dave Ruiz
// @include        http://*.meneame.net/*
// @include        https://*.meneame.net/*
// ==/UserScript==
(function() {
	var targetMeta = "ocio";
	var targetCategory = "humor";

	var newsDetails = document.querySelectorAll(".news-details");
	var metaElement, categoryElement;

	if (!newsDetails || !newsDetails.length) return;

	for (var i=0, ii=newsDetails.length; i<ii; i++) {

		metaElement = newsDetails[i].querySelector(".news-details .tool a[title^=meta]");
		categoryElement = newsDetails[i].querySelector(".news-details .tool a[title^=categor]");

		if (!metaElement || !categoryElement) continue;

		if (metaElement.innerText.match( new RegExp("\\b"+targetMeta+"\\b", "i") ) &&
		    categoryElement.innerText.match( new RegExp("\\b"+targetCategory+"\\b", "i") ) )
		{
			metaElement.parentElement.style.display = "inline-block";
			metaElement.parentElement.style.verticalAlign = "middle";
			metaElement.parentElement.style.background = "#D809EB";
			metaElement.parentElement.style.padding = "5px 10px";
			metaElement.style.color = "#FFFFFF";
			categoryElement.style.color = "#FFFFFF";
		}

	}
})();

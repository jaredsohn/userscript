// ==UserScript==
// @name           Amazon Marketplace: Packzettel als Büchersendung
// @namespace      AmazonNS
// @description    ersetzt den Text "Liefern an:" durch Ihre Anschrift und den Aufdruck "BÜCHERSENDUNG"
// @include        https://sellercentral.amazon.de/gp/orders-v2/packing-slip*
// ==/UserScript==

(function(){
	
	var searchInstances = document.body.innerHTML.match(/Liefern an:/ig);
	
	if (searchInstances != null)
	{
		if (searchInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Liefern an:/ig,'<span class="printednormaltext" style="font-style:italic;">Ihr Name, Ihre Straße 1, 11111 Ihre Stadt</span><br/>&nbsp;<br/><span class="printedlargesttext" style="text-decoration:underline;">Büchersendung</span><br/>&nbsp;<br/>');	

		}	
	}
	
}
)
();
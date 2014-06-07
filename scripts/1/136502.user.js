// ==UserScript==
// @name           WSDL Transform
// @namespace      http://nhnb.de/wsdltransform
// @description    Applies an XSL to a WSDL document
// @include        *?wsdl
// @resource       xslt http://tomi.vanek.sk/xml/wsdl-viewer.xsl
// ==/UserScript==



(function(){
	var processor = new XSLTProcessor();
	var dataXSL = new DOMParser().parseFromString(GM_getResourceText( "xslt" ), "text/xml");

	try{
		processor.importStylesheet(dataXSL);
      		dataXML = document;
		var ownerDocument = document.implementation.createDocument("", "", null);
		var newFragment = processor.transformToFragment(dataXML, ownerDocument);
		var oldLink = dataXML.documentElement.firstChild;
		dataXML.documentElement.replaceChild(newFragment, oldLink);
		var oldLink = dataXML.documentElement.firstChild.nextSibling;
 		while(oldLink != null) {
			oldLinkX = oldLink.nextSibling;
			if(oldLinkX != null)
				dataXML.documentElement.removeChild(oldLink);
 				oldLink = oldLinkX;
 			}	
		}catch(ex){
		}
}());



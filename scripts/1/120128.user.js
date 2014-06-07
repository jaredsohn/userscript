// ==UserScript==
// @name           kinomir.net
// @namespace      x
// @include        http://kinomir.net/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

function loadPage() {
  var xmlhttp = new XMLHttpRequest();
//  alert(xmlhttp);
  xmlhttp.open("GET", "http://kinomir.net/load/0-2", false);
  xmlhttp.send();
//  alert(xmlhttp.responseText);
//  alert(xmlhttp.statusText);
//  var xmlDoc = xmlhttp.responseXML;
//  alert(xmlDoc);
  var parser = new DOMParser();  
  var doc = parser.parseFromString(xmlhttp.statusText, "text/xml");
// alert(doc); 
  transform(doc);
}

function transform(doc) {
  var parser = new DOMParser();  
  var xsldoc = parser.parseFromString(getXSL(), "text/xml");
  var xsltProcessor = new XSLTProcessor();  		
  xsltProcessor.importStylesheet(xsldoc);


/*
		var myXMLHTTPRequest = new XMLHttpRequest();
		myXMLHTTPRequest.open("GET", "example1.xsl", false);
		myXMLHTTPRequest.send(null);

		xslStylesheet = myXMLHTTPRequest.responseXML;
		xsltProcessor.importStylesheet(xslStylesheet);
*/

  var allEntries = doc.getElementById("allEntries");
  var fragment = xsltProcessor.transformToFragment(allEntries, doc);

  var eBody = doc.getElementsByTagName("body");
  var eBody = eBody[0];
  eBody.innerHTML = "";
  eBody.appendChild(fragment);
  loadPage();

}

function getXSL() {
//	<?xml version="1.0" encoding="UTF-8"?>
	return (<![CDATA[

	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:myNS="http://devedge.netscape.com/2002/de">
		
		<xsl:output method="html"/>
		<xsl:template match="/">
			<xsl:apply-templates  />      
		</xsl:template>
			  
		<xsl:template match="//div[@id='allEntries']/div">
			<div class="entry">
				<a>
			  		<xsl:attribute name="href">
			  			<xsl:value-of select=".//div[@class='eTitle']/a/@href" />
			  		</xsl:attribute>
		  			<h3>
			  			<xsl:value-of select="substring-after(.//div[@class='eTitle']/a/h1,':')" />
			  		</h3>
			  		<img>
				  		<xsl:attribute name="src">
				  			<xsl:value-of select=".//div[@class='eMessage']//img/@src" />
				  		</xsl:attribute>
				  		
			  		</img>
		  		</a>
			</div>
		 </xsl:template>
	</xsl:stylesheet>
	]]>).toString();

}

$(document).ready(function()
{
  transform(document);
});
